"""Picks candidate example sentences from the Tatoeba exports, for each function word of the inventory.

A candidate has a French translation, a named author on both sides (CC BY 2.0 FR asks for it), and a length a learner
can read. The usage of the word in each sentence is not known yet: scripts/usages/classify.py decides it.
Output: .tools/usages/sentences-<lang>.json.
"""
import bz2
import json
import random
import re
import sys
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
TATOEBA = ROOT / ".tools/data/tatoeba"
OUT = ROOT / ".tools/usages"
CODES = {"en": "eng", "de": "deu"}
PER_WORD = 80
MIN_WORDS, MAX_WORDS = 5, 16
# Inflected forms of the verbs of the inventory; every other word is invariable.
FORMS = {
    "en": {
        "get": ["get", "gets", "got", "gotten", "getting"],
        "like": ["like", "likes", "liked", "liking"],
        "would": ["would", "wouldn't"],
    },
    "de": {
        "werden": ["werde", "wirst", "wird", "werden", "werdet", "wurde", "wurdest", "wurden", "wurdet", "würde", "würdest", "würden", "würdet", "geworden", "worden"],
        "lassen": ["lasse", "lässt", "lasst", "lassen", "ließ", "ließest", "ließen", "ließt", "gelassen", "lass", "lass'"],
    },
}


def rows(name: str):
    with bz2.open(TATOEBA / name, "rt", encoding="utf-8") as file:
        for line in file:
            yield line.rstrip("\n").split("\t")


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    french = {cells[0]: (cells[2], cells[3]) for cells in rows("fra_sentences_detailed.tsv.bz2") if len(cells) > 3 and cells[3] not in ("", "\\N")}
    for language in sys.argv[1:] or ["en", "de"]:
        code = CODES[language]
        inventory = json.loads((ROOT / f"src/data/usages/{language}.json").read_text(encoding="utf-8"))
        forms = {word["word"]: FORMS[language].get(word["word"], [word["word"]]) for word in inventory["words"]}
        lookup = {form.lower(): word for word, items in forms.items() for form in items}
        links = defaultdict(list)
        for cells in rows(f"{code}-fra_links.tsv.bz2"):
            if cells[1] in french:
                links[cells[0]].append(cells[1])
        found: dict[str, list[dict]] = defaultdict(list)
        for cells in rows(f"{code}_sentences_detailed.tsv.bz2"):
            if len(cells) < 4 or cells[3] in ("", "\\N") or cells[0] not in links:
                continue
            sentence_id, text, author = cells[0], cells[2], cells[3]
            tokens = re.findall(r"[\wäöüßÄÖÜ']+", text.lower())
            if not MIN_WORDS <= len(tokens) <= MAX_WORDS:
                continue
            french_id = links[sentence_id][0]
            for word in {lookup[token] for token in tokens if token in lookup}:
                found[word].append({"id": sentence_id, "text": text, "author": author, "frId": french_id, "fr": french[french_id][0], "frAuthor": french[french_id][1]})
        rng = random.Random(f"filou-usages-{language}")
        chosen = {word: rng.sample(found[word], min(PER_WORD, len(found[word]))) for word in forms}
        (OUT / f"sentences-{language}.json").write_text(json.dumps(chosen, ensure_ascii=False, indent=0), encoding="utf-8")
        few = [word for word, items in chosen.items() if len(items) < PER_WORD]
        print(f"{language} : {sum(len(v) for v in chosen.values())} phrases pour {len(chosen)} mots ; moins de {PER_WORD} pour {few}")


if __name__ == "__main__":
    main()
