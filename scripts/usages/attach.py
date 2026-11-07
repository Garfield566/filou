"""Adds to the library passages the function-word questions that follow a reading.

Input: the usages of the text sentences (lots/<lang>-text-<k>.out.json), as sorted by a reader. For each passage, up
to three sentences whose usage is sure (confidence ≥ 0.9), with different words. Each passage file gets
"usageQuestions", and its row in index.json gets "usages" (the keys word:usage), so that the reading of the day can
favour texts with usages to review. build.py calls this after every build.
"""
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
LOTS = ROOT / ".tools/usages/lots"
MIN_CONFIDENCE = 0.9
PER_PASSAGE = 3


def sure_sentences(language: str) -> dict[str, list[dict]]:
    """Passage id → its sure sentences, from the lot files."""
    texts: dict[str, str] = {}
    for lot in LOTS.glob(f"{language}-text-?.json"):
        for word in json.loads(lot.read_text(encoding="utf-8")):
            for sentence in word["sentences"]:
                texts[sentence["id"]] = sentence["text"]
    found: dict[str, list[dict]] = {}
    for out in sorted(LOTS.glob(f"{language}-text-?.out.json")):
        for word, labels in json.loads(out.read_text(encoding="utf-8")).items():
            for sid, label in labels.items():
                if label["usage"] != "other" and label["confidence"] >= MIN_CONFIDENCE and sid in texts:
                    passage = sid.split("#")[0]
                    found.setdefault(passage, []).append({"word": word, "usage": label["usage"], "sentence": texts[sid], "confidence": label["confidence"]})
    return found


def attach(language: str) -> int:
    folder = ROOT / "public/library" / language
    found = sure_sentences(language)
    if not found:
        return 0
    index = json.loads((folder / "index.json").read_text(encoding="utf-8"))
    attached = 0
    for row in index["passages"]:
        chosen, words = [], set()
        for item in sorted(found.get(row["id"], []), key=lambda x: -x["confidence"]):
            if item["word"] not in words:
                words.add(item["word"])
                chosen.append({key: item[key] for key in ("word", "usage", "sentence")})
            if len(chosen) == PER_PASSAGE:
                break
        row["usages"] = [f"{item['word']}:{item['usage']}" for item in chosen]
        path = folder / "passages" / f"{row['id']}.json"
        body = json.loads(path.read_text(encoding="utf-8"))
        body["usageQuestions"] = chosen
        path.write_text(json.dumps(body, ensure_ascii=False), encoding="utf-8")
        attached += bool(chosen)
    (folder / "index.json").write_text(json.dumps(index, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    return attached


def main() -> None:
    for language in sys.argv[1:] or ["en", "de"]:
        print(f"{language} : {attach(language)} passages avec des questions sur les mots outils")


if __name__ == "__main__":
    main()
