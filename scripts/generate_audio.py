"""Generates one MP3 per course text with Piper. Already generated files are kept."""
import json
from pathlib import Path

import lameenc
from piper import PiperVoice

ROOT = Path(__file__).resolve().parent.parent
VOICES = {
    "en": ROOT / ".tools/voices/en_US-lessac-high.onnx",
    "de": ROOT / ".tools/voices/de_DE-thorsten-high.onnx",
}
BITRATE_KBPS = 64
PADDING_SECONDS = 0.12


def to_mp3(voice: PiperVoice, text: str) -> bytes:
    chunks = list(voice.synthesize(text))
    sample_rate = chunks[0].sample_rate
    padding = b"\x00\x00" * int(sample_rate * PADDING_SECONDS)
    pcm = padding + b"".join(chunk.audio_int16_bytes for chunk in chunks) + padding

    encoder = lameenc.Encoder()
    encoder.set_bit_rate(BITRATE_KBPS)
    encoder.set_in_sample_rate(sample_rate)
    encoder.set_channels(1)
    encoder.set_quality(2)
    return bytes(encoder.encode(pcm)) + bytes(encoder.flush())


def main() -> None:
    entries = json.loads((ROOT / ".tools/audio-list.json").read_text(encoding="utf-8"))
    voices = {course: PiperVoice.load(str(path)) for course, path in VOICES.items()}
    created = 0

    for entry in entries:
        path = ROOT / "public/audio" / entry["course"] / entry["file"]
        if path.exists():
            continue
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_bytes(to_mp3(voices[entry["course"]], entry["text"]))
        created += 1

    expected = {(e["course"], e["file"]) for e in entries}
    removed = 0
    for course in VOICES:
        for path in (ROOT / "public/audio" / course).glob("*.mp3"):
            if (course, path.name) not in expected:
                path.unlink()
                removed += 1

    print(f"{created} fichiers créés, {removed} retirés, {len(entries)} au total")


if __name__ == "__main__":
    main()
