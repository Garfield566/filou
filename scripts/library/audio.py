"""Reads a selection of passages aloud with Piper, across levels and themes. Finished files are kept."""
import json
import sys
from collections import defaultdict
from pathlib import Path

import lameenc
from piper import PiperVoice

ROOT = Path(__file__).resolve().parent.parent.parent
VOICES = {
    "en": ROOT / ".tools/voices/en_US-lessac-high.onnx",
    "de": ROOT / ".tools/voices/de_DE-thorsten-high.onnx",
}
PER_LANGUAGE = 30
BITRATE_KBPS = 40


def selection(passages: list[dict]) -> list[dict]:
    """Takes the shortest texts in turn from each level, then each theme, so that no group fills the list."""
    groups: dict[tuple, list[dict]] = defaultdict(list)
    for passage in sorted(passages, key=lambda p: p["words"]):
        groups[(passage["level"], passage["theme"])].append(passage)
    chosen = []
    while len(chosen) < PER_LANGUAGE and any(groups.values()):
        for key in sorted(groups):
            if groups[key] and len(chosen) < PER_LANGUAGE:
                chosen.append(groups[key].pop(0))
    return chosen


def to_mp3(voice: PiperVoice, text: str) -> bytes:
    chunks = list(voice.synthesize(text))
    encoder = lameenc.Encoder()
    encoder.set_bit_rate(BITRATE_KBPS)
    encoder.set_in_sample_rate(chunks[0].sample_rate)
    encoder.set_channels(1)
    encoder.set_quality(2)
    pcm = b"".join(chunk.audio_int16_bytes for chunk in chunks)
    return bytes(encoder.encode(pcm)) + bytes(encoder.flush())


def main() -> None:
    for language in sys.argv[1:] or list(VOICES):
        folder = ROOT / "public/library" / language
        index = json.loads((folder / "index.json").read_text(encoding="utf-8"))
        voice = PiperVoice.load(str(VOICES[language]))
        (folder / "audio").mkdir(exist_ok=True)
        for passage in selection(index["passages"]):
            path = folder / "audio" / f"{passage['id']}.mp3"
            if path.exists():
                continue
            body = json.loads((folder / "passages" / f"{passage['id']}.json").read_text(encoding="utf-8"))
            path.write_bytes(to_mp3(voice, "\n\n".join(body["paragraphs"])))
            print(path.name, flush=True)


if __name__ == "__main__":
    main()
