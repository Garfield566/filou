"""French meanings of English and German lemmas, from the French Wiktionary (kaikki.org extracts)."""
import gzip
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
DATA = ROOT / ".tools/data/wiktionary"
CACHE = ROOT / ".tools/library/dictionary-en-senses.json"
SKIPPED_GLOSS = re.compile(r"(Variante|Relatif|Qui |Forme|Personne|Se dit|Pluriel|Participe|Prétérit|Troisième)")
POS_OF_SPACY = {"NOUN": "noun", "VERB": "verb", "ADJ": "adj", "ADV": "adv", "AUX": "verb"}
ARTICLES = {"der", "die", "das"}


LABELS = re.compile(
    r"^(?:(?:bi|in)?transitif|pronominal|réfléchi|familier|vieilli|figuré|littéraire|péjoratif|soutenu|populaire|"
    r"régional|rare|absolument|ironique|poétique|archaïque|désuet|par extension|en particulier)\b[\s,]*",
    re.I,
)
SENSES = 3


def short_senses(glosses: list[str]) -> str:
    """Up to three short meanings, as « serrure ; culasse ; château »: the sentence of the text shows which one applies.

    A dictionary lists meanings in its own order, not by frequency, so the first meaning alone was often wrong in context.
    """
    found: list[str] = []
    for gloss in glosses:
        text = re.sub(r"\([^)]*\)", "", gloss).strip(" :.;")
        while LABELS.match(text):
            text = LABELS.sub("", text, count=1)
        text = re.split(r"[,;.]", text)[0].strip()
        if not text or len(text) > 30 or SKIPPED_GLOSS.match(text) or text.startswith("Dans "):
            continue
        text = text[0].lower() + text[1:]
        if text not in found:
            found.append(text)
        if len(found) == SENSES:
            break
    return " ; ".join(found)


def english_entries() -> dict:
    if CACHE.exists():
        return json.loads(CACHE.read_text(encoding="utf-8"))
    entries: dict[str, dict[str, str]] = {}
    with gzip.open(DATA / "kaikki.org-dictionary-Anglais.jsonl.gz", "rt", encoding="utf-8") as file:
        for row in file:
            entry = json.loads(row)
            word, pos = entry.get("word", ""), entry.get("pos")
            if not word or "form-of" in entry.get("tags", []) or str(entry.get("pos_title", "")).startswith("Forme"):
                continue
            gloss = short_senses([g for sense in entry.get("senses", []) for g in sense.get("glosses", [])[:1]])
            if gloss:
                entries.setdefault(word.lower(), {}).setdefault(pos, gloss)
    CACHE.parent.mkdir(parents=True, exist_ok=True)
    CACHE.write_text(json.dumps(entries, ensure_ascii=False), encoding="utf-8")
    return entries


class Dictionary:
    def __init__(self, language: str):
        self.language = language
        if language == "en":
            self.english = english_entries()
        else:
            self.german = json.loads((DATA / "de-index.json").read_text(encoding="utf-8"))["lemmas"]

    def look_up(self, lemma: str, spacy_pos: str) -> dict | None:
        """{fr, gender} or None. A word without a clear meaning stays out of the pre-reading list."""
        if self.language == "en":
            senses = self.english.get(lemma.lower())
            if not senses:
                return None
            fr = senses.get(POS_OF_SPACY.get(spacy_pos, ""))
            return {"fr": fr, "gender": None} if fr else None
        entry = self.german.get(lemma)
        if not entry or entry.get("pos") != POS_OF_SPACY.get(spacy_pos):
            return None
        fr = short_senses(entry.get("glosses") or [entry.get("gloss") or ""])
        if not fr:
            return None
        return {"fr": fr, "gender": entry.get("gender") if entry.get("gender") in ARTICLES else None}
