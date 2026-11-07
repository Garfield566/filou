"""Finds, in the library passages, sentences that hold a function word, to ask about its usage after the reading.

Up to six sentences per passage, each holding one word of the inventory once only, with as many different words as
possible. The usage itself is decided by a reader (agents of a Claude Code session, or classify.py), then
scripts/usages/attach.py adds the sure ones to the passages.
Output: .tools/usages/lots/<lang>-text-<k>.json, in the shape of the first pass.
"""
import json
import random
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from sentences import FORMS, MAX_WORDS, ROOT  # noqa: E402

PER_PASSAGE = 6
LOTS = 4
SENTENCE = re.compile(r"(?<=[.!?…])[\"”“»«’']?\s+(?=[\"„“«‘']?[A-ZÄÖÜ])")


def main() -> None:
    for language in sys.argv[1:] or ["en", "de"]:
        inventory = json.loads((ROOT / f"src/data/usages/{language}.json").read_text(encoding="utf-8"))
        words = {w["word"]: w for w in inventory["words"] if len(w["usages"]) >= 2}
        lookup = {form.lower(): name for name in words for form in FORMS[language].get(name, [name])}
        rng = random.Random(f"filou-texts-{language}")
        found: dict[str, list[dict]] = {name: [] for name in words}
        for path in sorted((ROOT / f"public/library/{language}/passages").glob("*.json")):
            body = json.loads(path.read_text(encoding="utf-8"))
            candidates = []
            for paragraph in body["paragraphs"]:
                for sentence in SENTENCE.split(paragraph):
                    tokens = re.findall(r"[\wäöüßÄÖÜ']+", sentence.lower())
                    if not 6 <= len(tokens) <= MAX_WORDS + 9:
                        continue
                    hits = [lookup[t] for t in tokens if t in lookup]
                    # One function word of the inventory, once: the question then points at it without doubt.
                    if len(hits) == 1:
                        candidates.append((hits[0], sentence.strip()))
            rng.shuffle(candidates)
            taken, used = 0, set()
            for word, sentence in candidates:
                if word in used:
                    continue
                used.add(word)
                found[word].append({"id": f"{body['id']}#{taken}", "text": sentence})
                taken += 1
                if taken == PER_PASSAGE:
                    break
        names = sorted((n for n in words if found[n]), key=lambda n: -len(found[n]))
        lots = [[] for _ in range(LOTS)]
        for index, name in enumerate(names):
            word = words[name]
            lots[index % LOTS].append({
                "word": name,
                "usages": [{"id": u["id"], "label": u["label"], "explanation": u["explanation"], "pattern": u["pattern"]} for u in word["usages"]],
                "sentences": found[name],
            })
        for k, lot in enumerate(lots, start=1):
            path = ROOT / f".tools/usages/lots/{language}-text-{k}.json"
            path.write_text(json.dumps(lot, ensure_ascii=False, indent=1), encoding="utf-8")
            print(f"{language}-text-{k} : {len(lot)} mots, {sum(len(x['sentences']) for x in lot)} phrases")


if __name__ == "__main__":
    main()
