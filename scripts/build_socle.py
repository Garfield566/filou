"""Builds the English base vocabulary of the Strategy mode from wordfreq and simplemma.

Run from the project root: .tools/venv/Scripts/python.exe -I scripts/build_socle.py

Reads the game lexicon and the hand-kept lists in scripts/en-faux-amis.json and scripts/en-transparents.json.
Writes src/data/en-vocabulary.json: the socle, both lists, and the inflected forms found, so that
the game resolves a form to its lemma with no network access.
"""
import json
import re
from collections import Counter
from pathlib import Path

from simplemma import lemmatize
from wordfreq import top_n_list, word_frequency

ROOT = Path.cwd()
LEXICON = ROOT / "src/data/enLexicon.json"
FALSE_FRIENDS = ROOT / "scripts/en-faux-amis.json"
TRANSPARENTS = ROOT / "scripts/en-transparents.json"
IRREGULAR_VERBS = ROOT / "src/data/irregularVerbs.ts"
SOCLE = ROOT / "src/data/en-vocabulary.json"

SOCLE_SIZE = 1500
VOCABULARY_SIZE = 50000
WORD = re.compile(r"[a-z]+")
ONE_LETTER_WORDS = {"a", "i"}
IRREGULAR_VERB = re.compile(r"en\('([a-z]+)', '[^']*', '([^']+)', '([^']+)'\)")
# Frequent in wordfreq's modern sources: names, abbreviations, chat words and swear words are no base vocabulary.
NOT_LEMMAS = set(
    """
    mr mrs dr st tv uk ok lol co de re la san al ii non pre pro anti gonna wanna gotta gan fuck shit damn ass dude
    john york david james michael george paul peter william smith jack robert thomas tom richard jesus obama trump
    texas chicago california washington london america england france germany china japan india russia europe
    africa australia canada facebook google americans louis paris chris bitch twitter http ed ex
    """.split()
)
# Stems simplemma leaves on "-ed" and "-ing" forms.
LEMMA_FIXES = {"playe": "play", "thinke": "think", "develope": "develop", "growe": "grow", "fixe": "fix"}


def lemma_of(word):
    lemma = lemmatize(word, lang="en").lower()
    return LEMMA_FIXES.get(lemma, lemma)


def regular_forms(lemma):
    """Every regular inflection, unverified: a form that does not exist is simply never met."""
    if lemma.endswith("e"):
        return {lemma + "s", lemma + "d", lemma[:-1] + "ing"}
    if re.search(r"[^aeiou]y$", lemma):
        return {lemma[:-1] + "ies", lemma[:-1] + "ied", lemma + "ing"}
    forms = {lemma + "ed", lemma + "ing", lemma + ("es" if re.search(r"(s|x|z|ch|sh)$", lemma) else "s")}
    if re.search(r"[^aeiou][aeiou][^aeiouwxy]$", lemma):
        forms |= {lemma + lemma[-1] + "ed", lemma + lemma[-1] + "ing"}
    return forms


def main():
    lexicon = json.loads(LEXICON.read_text(encoding="utf-8"))
    false_friends = sorted(json.loads(FALSE_FRIENDS.read_text(encoding="utf-8")))
    transparents = sorted(json.loads(TRANSPARENTS.read_text(encoding="utf-8")))
    targets = {entry["target"] for entry in lexicon}

    both = (set(false_friends) & set(transparents)) | (targets & set(transparents))
    if both:
        raise SystemExit(f"mots dans deux listes incompatibles : {sorted(both)}")

    frequency, lemma_by_form = Counter(), {}
    for word in top_n_list("en", VOCABULARY_SIZE):
        if WORD.fullmatch(word) and (len(word) > 1 or word in ONE_LETTER_WORDS):
            lemma = lemma_of(word)
            if WORD.fullmatch(lemma):
                lemma_by_form[word] = lemma
                frequency[lemma] += word_frequency(word, "en")

    excluded = targets | set(false_friends) | NOT_LEMMAS
    socle = [lemma for lemma, _ in frequency.most_common() if lemma not in excluded][:SOCLE_SIZE]

    hand_kept = targets | set(false_friends) | set(transparents)
    lemmas = hand_kept | set(socle)
    forms = {form: lemma for form, lemma in lemma_by_form.items() if form != lemma and lemma in lemmas}
    for lemma in hand_kept:
        for form in regular_forms(lemma):
            forms.setdefault(form, lemma)
    for entry in lexicon:
        if entry["plural"]:
            forms[entry["plural"]] = entry["target"]
    for verb, past, participle in IRREGULAR_VERB.findall(IRREGULAR_VERBS.read_text(encoding="utf-8")):
        if verb in lemmas:
            forms[past] = verb
            forms[participle] = verb
    # A word of a list stays itself: "building" is not "build", and a false friend never hides behind a lemma.
    forms = {form: forms[form] for form in sorted(forms) if form not in lemmas}

    SOCLE.write_text(
        json.dumps(
            {"socle": socle, "falseFriends": false_friends, "transparents": transparents, "forms": forms},
            ensure_ascii=False,
            separators=(",", ":"),
        ),
        encoding="utf-8",
    )
    print("socle", len(socle), "faux amis", len(false_friends), "transparents", len(transparents), "formes", len(forms))
    print("taille Ko", SOCLE.stat().st_size // 1024)


if __name__ == "__main__":
    main()
