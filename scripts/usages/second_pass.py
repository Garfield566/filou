"""Second pass for the usages with fewer than five sure examples: larger pools of sentences, searched for those usages only.

The first pass classified 80 random sentences per word, where rare usages hardly appear. Here, for each word that has
a short usage, a pool of up to 500 more sentences is drawn from the Tatoeba exports; a reader (an agent of the Claude
Code session, or classify.py) then looks in it for clear-cut examples of the short usages only.
Output: .tools/usages/lots/<lang>-p2-<k>.json, answered in <lang>-p2-<k>.out.json with the same shape as the first pass.
"""
import json
import random
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
import sentences as source  # noqa: E402  (same reading of the Tatoeba files as the first pass)
from examples import MIN_CONFIDENCE, MIN_EXAMPLES, classification  # noqa: E402

ROOT = source.ROOT
LOTS = source.OUT / "lots"
POOL = 500
LOTS_PER_LANGUAGE = 4


def main() -> None:
    french = {c[0]: (c[2], c[3]) for c in source.rows("fra_sentences_detailed.tsv.bz2") if len(c) > 3 and c[3] not in ("", "\\N")}
    for language in sys.argv[1:] or ["en", "de"]:
        inventory = json.loads((ROOT / f"src/data/usages/{language}.json").read_text(encoding="utf-8"))
        labels = classification(language)
        targets = {}
        for word in inventory["words"]:
            done = labels.get(word["word"], {})
            short = [u for u in word["usages"] if sum(1 for l in done.values() if l["usage"] == u["id"] and l["confidence"] >= MIN_CONFIDENCE) < MIN_EXAMPLES]
            if short:
                targets[word["word"]] = (word, short)
        code = source.CODES[language]
        links = {}
        for cells in source.rows(f"{code}-fra_links.tsv.bz2"):
            if cells[1] in french:
                links.setdefault(cells[0], cells[1])
        forms = {name: source.FORMS[language].get(name, [name]) for name in targets}
        lookup = {form.lower(): name for name, items in forms.items() for form in items}
        pools: dict[str, list[dict]] = {name: [] for name in targets}
        for cells in source.rows(f"{code}_sentences_detailed.tsv.bz2"):
            if len(cells) < 4 or cells[3] in ("", "\\N") or cells[0] not in links:
                continue
            tokens = source.re.findall(r"[\wäöüßÄÖÜ']+", cells[2].lower())
            if not source.MIN_WORDS <= len(tokens) <= source.MAX_WORDS:
                continue
            for name in {lookup[t] for t in tokens if t in lookup}:
                # Sentences already judged keep their verdict, except "other", which a new usage may now cover.
                if labels.get(name, {}).get(cells[0], {}).get("usage", "other") == "other":
                    pools[name].append({"id": cells[0], "text": cells[2], "author": cells[3], "frId": links[cells[0]], "fr": french[links[cells[0]]][0], "frAuthor": french[links[cells[0]]][1]})
        rng = random.Random(f"filou-second-{language}")
        candidates = json.loads((source.OUT / f"sentences-{language}.json").read_text(encoding="utf-8"))
        lots = [[] for _ in range(LOTS_PER_LANGUAGE)]
        for index, (name, (word, short)) in enumerate(sorted(targets.items())):
            pool = rng.sample(pools[name], min(POOL, len(pools[name])))
            # The pool joins the candidates, so that examples.py finds the text, the translation and the authors.
            known = {s["id"] for s in candidates.get(name, [])}
            candidates.setdefault(name, []).extend(s for s in pool if s["id"] not in known)
            lots[index % LOTS_PER_LANGUAGE].append({
                "word": name,
                "allUsages": [{"id": u["id"], "label": u["label"]} for u in word["usages"]],
                "lookFor": [{"id": u["id"], "label": u["label"], "explanation": u["explanation"], "pattern": u["pattern"]} for u in short],
                "sentences": [{"id": s["id"], "text": s["text"]} for s in pool],
            })
        (source.OUT / f"sentences-{language}.json").write_text(json.dumps(candidates, ensure_ascii=False, indent=0), encoding="utf-8")
        for k, lot in enumerate(lots, start=1):
            (LOTS / f"{language}-p2-{k}.json").write_text(json.dumps(lot, ensure_ascii=False, indent=1), encoding="utf-8")
            print(f"{language}-p2-{k} : {len(lot)} mots, {sum(len(x['lookFor']) for x in lot)} usages à compléter, {sum(len(x['sentences']) for x in lot)} phrases")


if __name__ == "__main__":
    main()
