"""Lists every irregular verb of English and every strong, mixed or irregular verb of German, from the French Wiktionary.

A verb is kept when its forms are not the regular ones (English past in -ed; German Präteritum in -te and participle
ge-…-t). Verbs made of a prefix and another verb of the list (overcome, verstehen) are left out: they conjugate like
their base. Each verb gets its frequency rank (wordfreq) and is marked rare when it is infrequent or tagged archaic.
Output: .tools/verbs/inventory-<lang>.json, for review before it enters Filou.
"""
import gzip
import json
import re
import sys
from pathlib import Path

from wordfreq import zipf_frequency

ROOT = Path(__file__).resolve().parents[2]
DATA = ROOT / ".tools/data/wiktionary"
OUT = ROOT / ".tools/verbs"
FILES = {"en": "kaikki.org-dictionary-Anglais.jsonl.gz", "de": "kaikki.org-dictionary-Allemand.jsonl.gz"}
# Below this Zipf frequency (about once per 10 million words), a verb is marked rare.
RARE_ZIPF = 2.0
RARE_TAGS = {"archaic", "obsolete", "literary", "dated", "poetic", "rare"}
PREFIXES = {
    "en": ["under", "over", "out", "mis", "re", "un", "with", "fore", "up", "back", "by", "in", "off", "be", "for"],
    "de": ["ab", "an", "auf", "aus", "be", "bei", "dar", "durch", "ein", "ent", "emp", "er", "fort", "ge", "her", "hin",
           "hinter", "los", "mit", "miss", "nach", "über", "um", "unter", "ver", "voll", "vor", "weg", "wider", "wieder",
           "zer", "zu", "zurück", "zusammen", "fest", "frei", "hoch", "statt", "teil", "weiter", "wahr", "heim", "kennen"],
}


def alternatives(form: str) -> list[str]:
    """« abode ou abided » gives both forms; pronouns, « sich » and a separated particle (sah fern) go."""
    form = re.sub(r"^(ich|du|er/sie/es|wir|ihr|sie|to)\s+", "", form.strip())
    parts = [part.strip(" !,") for part in re.split(r"\s+ou\s+|,\s*", form) if part.strip(" !,")]
    return [part.split()[0] for part in parts if part.split()]


VOWELS = "aeiouy"


def english_regular_forms(base: str) -> set[str]:
    """The -ed forms a regular verb could have: stop → stopped, try → tried, love → loved."""
    forms = {base + "ed", base + "d"}
    if base.endswith("y") and base[-2:-1] not in VOWELS:
        forms.add(base[:-1] + "ied")
    if len(base) >= 3 and base[-1] not in VOWELS + "wx" and base[-2] in VOWELS and base[-3] not in VOWELS:
        forms.add(base + base[-1] + "ed")
    if base.endswith("c"):
        forms.add(base + "ked")
    return forms


def german_regular(infinitive: str, preterite: str, participle: str) -> bool:
    """Weak verb: Präteritum stem + (e)te, participle ending in (e)t with the same stem (gemacht, bezahlt, erinnert)."""
    stem = re.sub(r"(en|n)$", "", infinitive)
    weak_pret = {stem + "te", stem + "ete"}
    weak_part_end = (stem + "t", stem + "et")
    return preterite in weak_pret and participle.endswith(weak_part_end)


def headword(language: str, entry: dict) -> bool:
    """An infinitive, not one of its forms (knows, starting, bekam)."""
    if "form-of" in entry.get("tags", []) or str(entry.get("pos_title", "")).startswith("Forme"):
        return False
    if language == "en":
        infinitives = [f["form"] for f in entry.get("forms", []) if "infinitive" in f.get("tags", [])]
        return not infinitives or any(i.replace("to ", "").strip() == entry["word"] for i in infinitives)
    return entry["word"].endswith("n")


def read(language: str) -> dict[str, dict]:
    verbs: dict[str, dict] = {}
    with gzip.open(DATA / FILES[language], "rt", encoding="utf-8") as file:
        for row in file:
            entry = json.loads(row)
            word = entry.get("word", "")
            if entry.get("pos") != "verb" or not re.fullmatch(r"[a-zäöüß]+", word) or not headword(language, entry):
                continue
            forms: dict[str, list[str]] = {}
            for form in entry.get("forms", []):
                tags = set(form.get("tags", []))
                key = None
                if "preterite" in tags and ("first-person" in tags or language == "en"):
                    key = "past"
                elif {"participle", "past"} <= tags:
                    key = "participle"
                elif {"present", "third-person", "singular"} <= tags:
                    key = "third"
                elif "auxiliary" in tags:
                    key = "auxiliary"
                if key:
                    forms.setdefault(key, [])
                    for value in alternatives(form.get("form", "")):
                        if value not in forms[key]:
                            forms[key].append(value)
            if "past" not in forms or "participle" not in forms:
                continue
            glosses = [g for sense in entry.get("senses", []) for g in sense.get("glosses", [])[:1]]
            tags = set(entry.get("tags", [])) | {t for sense in entry.get("senses", []) for t in sense.get("tags", [])}
            known = verbs.setdefault(word, {"verb": word, **forms, "glosses": glosses[:3], "tags": sorted(tags)})
            for key, values in forms.items():
                known.setdefault(key, [])
                known[key] += [v for v in values if v not in known[key]]
    return verbs


def irregular(language: str, verb: dict) -> bool:
    """English: a form that does not end in -ed (sang, burnt, proven). German: not « stem + te » and « stem + t »."""
    if language == "en":
        return any(not form.endswith("ed") for form in verb["past"] + verb["participle"])
    stem = re.sub(r"(en|n)$", "", verb["verb"])
    for preterite in verb["past"]:
        weak_preterite = (stem + "te").endswith(preterite) or (stem + "ete").endswith(preterite)
        # A separable verb gives its preterite without the particle (stellte for vorstellen).
        if not weak_preterite or not preterite.endswith("te"):
            return True
        if not all(participle.endswith(preterite[:-2] + "t") for participle in verb["participle"]):
            return True
    return False


# Below this frequency, an entry is mostly a Wiktionary curiosity, not a verb a learner meets.
MIN_ZIPF = 0.8


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    for language in sys.argv[1:] or ["en", "de"]:
        everything = read(language)
        verbs = {word: verb for word, verb in everything.items() if irregular(language, verb) and not ("ss" in word and word.replace("ss", "ß") in everything)}
        base = set(verbs)
        kept = []
        for word, verb in sorted(verbs.items()):
            # Any verb ending in another verb of the list derives from it: ab|fahren, rad|fahren, over|come.
            prefixed = next((word[: len(word) - len(other)] for other in sorted(base, key=len, reverse=True)
                             if other != word and len(other) >= 3 and word.endswith(other)), None)
            zipf = zipf_frequency(word, language)
            rare = zipf < RARE_ZIPF or bool(RARE_TAGS & set(verb["tags"]))
            if zipf < MIN_ZIPF:
                continue
            kept.append({**verb, "zipf": round(zipf, 2), "rare": rare, "prefixOf": prefixed})
        bases = [v for v in kept if not v["prefixOf"]]
        (OUT / f"inventory-{language}.json").write_text(json.dumps(kept, ensure_ascii=False, indent=1), encoding="utf-8")
        print(f"{language} : {len(kept)} irréguliers, dont {len(bases)} verbes de base ({sum(v['rare'] for v in bases)} rares)")


if __name__ == "__main__":
    main()
