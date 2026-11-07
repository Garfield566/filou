"""Picks the original passages to simplify, and splits them into lots for the writers (agents of a Claude Code session).

English: essays in economics and sociology (Smith, Veblen, Mill, Ricardo, Malthus, Keynes, Thoreau), C1-C2 in the
original. German: the easiest literary texts, plus Weber and Kant, so that German A2 gets texts of its own.
Output: .tools/simplify/<lang>-<k>.json, a list of {id, title, author, work, paragraphs}.
"""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / ".tools/simplify"
SOURCES = {
    "en": ["en-0598", "en-0604", "en-0622", "en-0623", "en-0583", "en-0584", "en-0606", "en-0614", "en-0630", "en-0536"],
    "de": None,  # chosen below
}
GERMAN_ESSAYS = ["de-0300", "de-0301", "de-0288"]
GERMAN_LITERARY = 22
LOTS = {"en": 2, "de": 4}


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    for language in ("en", "de"):
        index = {p["id"]: p for p in json.loads((ROOT / f"public/library/{language}/index.json").read_text(encoding="utf-8"))["passages"]}
        ids = SOURCES[language]
        if ids is None:
            # One extract per work first, the easiest genres first, so that the A2 versions cover many stories.
            easy = sorted((p for p in index.values() if p["theme"] in ("contes", "jeunesse", "nouvelles") and p["level"] in ("B1", "B2")),
                          key=lambda p: (p["theme"] != "contes", p["level"], p["id"]))
            seen, ids = set(), []
            for p in easy:
                if p["work"] not in seen:
                    seen.add(p["work"])
                    ids.append(p["id"])
            ids = ids[:GERMAN_LITERARY] + GERMAN_ESSAYS
        items = []
        for pid in ids:
            meta = index[pid]
            body = json.loads((ROOT / f"public/library/{language}/passages/{pid}.json").read_text(encoding="utf-8"))
            items.append({k: meta[k] for k in ("id", "title", "author", "work", "level")} | {"paragraphs": body["paragraphs"]})
        lots = [items[k::LOTS[language]] for k in range(LOTS[language])]
        for k, lot in enumerate(lots, start=1):
            (OUT / f"{language}-{k}.json").write_text(json.dumps(lot, ensure_ascii=False, indent=1), encoding="utf-8")
            print(f"{language}-{k} : {len(lot)} extraits : {', '.join(item['work'][:30] for item in lot)}")


if __name__ == "__main__":
    main()
