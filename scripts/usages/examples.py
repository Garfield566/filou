"""Keeps, for each usage of each function word, the clearest Tatoeba examples, and writes a sample for review.

Input: the classification of the candidate sentences, either from scripts/usages/classify.py (classified-<lang>.json) or
from the lots sorted by the agents of a Claude Code session (lots/<lang>-<k>.out.json). Both have the same shape:
{word: {sentence id: {"usage": id or "other", "confidence": 0..1}}}.
Output: src/data/usages/<lang>-examples.json (read by Filou) and docs/revue/exemples-<lang>.md (one sentence in ten).
"""
import json
import random
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
WORK = ROOT / ".tools/usages"
MIN_CONFIDENCE = 0.9
MIN_EXAMPLES = 5
MAX_EXAMPLES = 12
SAMPLE = 0.10
LICENSE = "CC BY 2.0 FR"


def classification(language: str) -> dict:
    merged: dict = {}
    api = WORK / f"classified-{language}.json"
    if api.exists():
        for word, labels in json.loads(api.read_text(encoding="utf-8"))["words"].items():
            merged.setdefault(word, {}).update(labels)
    for lot in sorted((WORK / "lots").glob(f"{language}-*.out.json")):
        for word, labels in json.loads(lot.read_text(encoding="utf-8")).items():
            merged.setdefault(word, {}).update(labels)
    return merged


def main() -> None:
    for language in sys.argv[1:] or ["en", "de"]:
        inventory = json.loads((ROOT / f"src/data/usages/{language}.json").read_text(encoding="utf-8"))
        candidates = {word: {s["id"]: s for s in items} for word, items in json.loads((WORK / f"sentences-{language}.json").read_text(encoding="utf-8")).items()}
        labels = classification(language)
        # Sentences set aside by hand, each with its reason (scripts/usages/excluded.json).
        excluded = json.loads((ROOT / "scripts/usages/excluded.json").read_text(encoding="utf-8"))
        examples, short, review = {}, [], []
        for word in inventory["words"]:
            name = word["word"]
            for usage in word["usages"]:
                sure = sorted(
                    ((sid, label) for sid, label in labels.get(name, {}).items() if label["usage"] == usage["id"] and label["confidence"] >= MIN_CONFIDENCE and sid not in excluded),
                    key=lambda pair: (-pair[1]["confidence"], len(candidates[name][pair[0]]["text"])),
                )[:MAX_EXAMPLES]
                key = f"{name}:{usage['id']}"
                examples[key] = [
                    {
                        "id": sid,
                        "text": candidates[name][sid]["text"],
                        "fr": candidates[name][sid]["fr"],
                        "author": candidates[name][sid]["author"],
                        "frId": candidates[name][sid]["frId"],
                        "frAuthor": candidates[name][sid]["frAuthor"],
                        "confidence": label["confidence"],
                    }
                    for sid, label in sure
                ]
                if len(sure) < MIN_EXAMPLES:
                    short.append(f"{key} ({len(sure)})")
                review += [(key, usage["label"], example) for example in examples[key]]
        out = {"language": language, "source": "Tatoeba", "license": LICENSE, "minConfidence": MIN_CONFIDENCE, "examples": examples}
        (ROOT / f"src/data/usages/{language}-examples.json").write_text(json.dumps(out, ensure_ascii=False, indent=1), encoding="utf-8")

        rng = random.Random(f"revue-{language}")
        sample = sorted(rng.sample(review, max(1, round(len(review) * SAMPLE))), key=lambda row: row[0])
        rows = [f"| `{key}` | {label} | {e['text']} | {e['fr']} | {e['confidence']:.2f} | [{e['id']}](https://tatoeba.org/fr/sentences/show/{e['id']}) |" for key, label, e in sample]
        doc = [
            f"# Exemples classés par usage : échantillon de 10 % ({'anglais' if language == 'en' else 'allemand'})",
            "",
            f"{len(review)} exemples gardés (confiance ≥ {MIN_CONFIDENCE}), {len(sample)} tirés au hasard ici. Phrases de Tatoeba, licence {LICENSE}.",
            "Classement fait par des agents IA, à contrôler : une ligne fausse signale un usage à revoir.",
            "",
            f"**Usages avec moins de {MIN_EXAMPLES} exemples sûrs :** {', '.join(short) if short else 'aucun'}.",
            "",
            "| Usage | Libellé | Phrase | Traduction | Confiance | Source |",
            "| --- | --- | --- | --- | --- | --- |",
            *rows,
        ]
        (ROOT / f"docs/revue/exemples-{language}.md").write_text("\n".join(doc) + "\n", encoding="utf-8")
        print(f"{language} : {len(review)} exemples, {len(examples)} usages, {len(short)} sous le minimum : {short}")


if __name__ == "__main__":
    main()
