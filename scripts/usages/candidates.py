"""Lists the function words worth a module of their own: among the most frequent words, those with several grammatical uses.

Sources: wordfreq for frequency, the French Wiktionary (kaikki.org extracts) for parts of speech and senses. The output,
.tools/usages/candidates-<lang>.json, is a starting point: the uses themselves are then written and reviewed by hand.
"""
import gzip
import json
import sys
from pathlib import Path

from wordfreq import top_n_list

ROOT = Path(__file__).resolve().parents[2]
DATA = ROOT / ".tools/data/wiktionary"
OUT = ROOT / ".tools/usages"
TOP = 300
FUNCTION_POS = {"adv", "prep", "conj", "pron", "det", "article", "particle", "postp"}
# Asked for by name: kept whatever their part of speech, since some are verbs (would, get, lassen, werden).
REQUIRED = {
    "en": ["as", "like", "since", "for", "still", "yet", "even", "so", "that", "would", "get", "while", "though", "rather"],
    "de": ["als", "wie", "wenn", "doch", "schon", "noch", "erst", "da", "denn", "zu", "lassen", "werden", "ob", "ja", "mal", "eben"],
}
# Needed by the exercises that compare close words (denn / weil / da).
CONTRASTS = {"en": [], "de": ["weil"]}
FILES = {"en": "kaikki.org-dictionary-Anglais.jsonl.gz", "de": "kaikki.org-dictionary-Allemand.jsonl.gz"}


def entries(language: str, words: set[str]) -> dict[str, list[dict]]:
    found: dict[str, list[dict]] = {word: [] for word in words}
    with gzip.open(DATA / FILES[language], "rt", encoding="utf-8") as file:
        for row in file:
            entry = json.loads(row)
            word = entry.get("word")
            if word in found and "form-of" not in entry.get("tags", []) and not str(entry.get("pos_title", "")).startswith("Forme"):
                glosses = [gloss for sense in entry.get("senses", []) for gloss in sense.get("glosses", [])[:1]]
                found[word].append({"pos": entry.get("pos"), "title": entry.get("pos_title"), "glosses": glosses[:8]})
    return found


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    for language in sys.argv[1:] or ["en", "de"]:
        top = top_n_list(language, TOP)
        ranks = {word: rank for rank, word in enumerate(top, start=1)}
        wanted = set(top) | set(REQUIRED[language]) | set(CONTRASTS[language])
        # German nouns are capitalised in the dictionary; function words never are.
        found = entries(language, wanted)
        candidates = []
        for word in sorted(wanted, key=lambda w: ranks.get(w, 99999)):
            parts = [entry for entry in found[word] if entry["pos"] in FUNCTION_POS]
            senses = sum(len(entry["glosses"]) for entry in parts)
            required = word in REQUIRED[language] or word in CONTRASTS[language]
            if required or (senses >= 2 and parts):
                candidates.append({
                    "word": word,
                    "rank": ranks.get(word),
                    "required": required,
                    "functionSenses": senses,
                    "entries": found[word] if required else parts,
                })
        (OUT / f"candidates-{language}.json").write_text(json.dumps(candidates, ensure_ascii=False, indent=1), encoding="utf-8")
        print(f"{language} : {len(candidates)} mots retenus sur les {TOP} plus fréquents (+ mots imposés)")


if __name__ == "__main__":
    main()
