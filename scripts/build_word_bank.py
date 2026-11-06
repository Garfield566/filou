"""Builds the German word bank from Tatoeba sentences, French Wiktionary and wordfreq.

Run from the project root: .tools/venv/Scripts/python.exe -I scripts/build_word_bank.py

Writes a candidate list to review in .tools/word-bank-candidates.tsv. Review decisions live in
scripts/word-bank-overrides.json, and the final bank goes to src/data/wordBankDe.json.
"""
import bz2
import gzip
import json
import math
import re
from collections import Counter, defaultdict
from pathlib import Path

from wordfreq import top_n_list, word_frequency

ROOT = Path.cwd()
TATOEBA = ROOT / ".tools/data/tatoeba"
WIKTIONARY = ROOT / ".tools/data/wiktionary/kaikki.org-dictionary-Allemand.jsonl.gz"
INDEX = ROOT / ".tools/data/wiktionary/de-index.json"
CANDIDATES = ROOT / ".tools/word-bank-candidates.tsv"
OVERRIDES = ROOT / "scripts/word-bank-overrides.json"
BANK = ROOT / "src/data/wordBankDe.json"
CREDITS = ROOT / "public/credits/tatoeba-de.tsv"

BANK_SIZE = 1000
CANDIDATE_SIZE = 1250
MIN_TOKENS, MAX_TOKENS = 4, 12
IDEAL_TOKENS = (5, 9)
MIN_SENTENCES, MAX_SENTENCES = 3, 5
KNOWN_SIZE = 4000
LOOKAHEAD = 300
CORE_WORDS = 150
MIN_CORPUS_COUNT = 15

TEACHABLE = {"noun", "verb", "adj", "adv", "prep", "conj", "intj", "num"}
NAMES = {"Tom", "Maria", "Mary", "John", "Ken", "Jim", "Bob", "Dan", "Layla", "Sami", "Yanni"}
BLOCKED = re.compile(
    r"töten|umbringen|mord|selbstmord|leiche|vergewalt|hure|sex|nackt|nazi|hitler|tuer|suicide|viol|pute|meurtre|"
    r"scheiß|fick|arsch|fous|fout|merde|putain|bordel|drogue|droge|waffe|krieg|guerre|gott|dieu|jesus|allah",
    re.IGNORECASE,
)
QUOTES = re.compile(r"[«»\"„“”]")
TOKEN = re.compile(r"[^\W\d_]+(?:-[^\W\d_]+)*")
ARTICLES = {"masculine": "der", "feminine": "die", "neuter": "das"}


def short_gloss(glosses):
    """Keeps the first plain meaning of a dictionary definition."""
    for gloss in glosses:
        text = re.sub(r"\([^)]*\)", "", gloss).strip(" :.;")
        text = re.split(r"[,;.]", text)[0].strip()
        if text and len(text) <= 40 and not re.match(r"(Variante|Relatif|Qui |Forme|Personne|Se dit|Pluriel)", text):
            return text[0].lower() + text[1:]
    return ""


def build_index():
    lemmas, form_of = {}, defaultdict(set)
    with gzip.open(WIKTIONARY, "rt", encoding="utf-8") as file:
        for row in file:
            entry = json.loads(row)
            word, pos = entry.get("word", ""), entry.get("pos")
            if not word:
                continue
            is_form = "form-of" in entry.get("tags", []) or str(entry.get("pos_title", "")).startswith("Forme")
            if is_form:
                for sense in entry.get("senses", []):
                    for target in sense.get("form_of", []):
                        if target.get("word"):
                            form_of[word].add(target["word"])
                continue
            if "Nom propre" in str(entry.get("pos_title", "")) or pos == "name":
                lemmas.setdefault(word, {"pos": "name"})
                continue
            glosses = [g for sense in entry.get("senses", []) for g in sense.get("glosses", [])[:1]]
            gender = next((ARTICLES[t] for t in entry.get("tags", []) if t in ARTICLES), None)
            plural = next(
                (
                    form["form"]
                    for form in entry.get("forms", [])
                    if {"plural", "nominative"} <= set(form.get("tags", [])) and str(form.get("form", "")).startswith("die ")
                ),
                None,
            )
            current = lemmas.get(word)
            if current is None or current["pos"] == "name" or (pos in TEACHABLE and current["pos"] not in TEACHABLE):
                lemmas[word] = {"pos": pos, "gender": gender, "plural": plural, "gloss": short_gloss(glosses), "glosses": glosses[:3]}
    data = {"lemmas": lemmas, "form_of": {form: sorted(targets) for form, targets in form_of.items()}}
    INDEX.write_text(json.dumps(data, ensure_ascii=False), encoding="utf-8")
    return data


def read_sentences(name):
    sentences = {}
    with bz2.open(TATOEBA / name, "rt", encoding="utf-8") as file:
        for row in file:
            parts = row.rstrip("\n").split("\t")
            if len(parts) >= 4:
                sentences[parts[0]] = (parts[2], parts[3])
    return sentences


def read_links(name):
    links = defaultdict(list)
    with bz2.open(TATOEBA / name, "rt", encoding="utf-8") as file:
        for row in file:
            left, right = row.split()[:2]
            links[left].append(right)
    return links


class Lemmatizer:
    def __init__(self, index):
        self.lemmas = index["lemmas"]
        self.form_of = index["form_of"]
        self.lower = defaultdict(set)
        for word in self.lemmas:
            self.lower[word.lower()].add(word)
        for form, targets in self.form_of.items():
            self.lower[form.lower()].update(targets)
        self.cache = {}

    def __call__(self, token, first):
        key = (token, first)
        if key not in self.cache:
            self.cache[key] = self.resolve(token, first)
        return self.cache[key]

    def resolve(self, token, first):
        capital = token[0].isupper()
        if token in self.lemmas and (capital and not first or not capital):
            return token
        if token in self.form_of and (capital and not first or not capital):
            return self.form_of[token][0]
        options = sorted(self.lower.get(token.lower(), ()))
        if not options:
            return None
        def score(word):
            info = self.lemmas.get(word, {})
            return (info.get("pos") == "name", word != token.lower(), info.get("pos") == "noun", word)
        return min(options, key=score)


def ranked_lemmas(index, lemmatize, corpus):
    general = Counter()
    for word in top_n_list("de", 40000):
        if word.isalpha():
            base = lemmatize(word, True)
            if base:
                general[base] += word_frequency(word, "de")
    total = sum(corpus.values())
    scores = {}
    for word, count in corpus.items():
        info = index["lemmas"].get(word, {})
        if count < MIN_CORPUS_COUNT or word in NAMES or info.get("pos") == "name" or not general[word]:
            continue
        scores[word] = (math.log10(general[word]) + math.log10(count / total)) / 2
    return sorted(scores, key=scores.get, reverse=True)


def target_form(word, info):
    return f"{info['gender']} {word}" if info.get("pos") == "noun" and info.get("gender") else word


def main():
    overrides = json.loads(OVERRIDES.read_text(encoding="utf-8")) if OVERRIDES.exists() else {"exclude": [], "gloss": {}, "target": {}}
    index = json.loads(INDEX.read_text(encoding="utf-8")) if INDEX.exists() else build_index()
    print("lemmes", len(index["lemmas"]), "formes", len(index["form_of"]))

    lemmatize = Lemmatizer(index)
    german = read_sentences("deu_sentences_detailed.tsv.bz2")
    french = read_sentences("fra_sentences_detailed.tsv.bz2")
    links = read_links("deu-fra_links.tsv.bz2")

    def keys_of(text):
        tokens = TOKEN.findall(text)
        return tokens, [lemmatize(token, position == 0) for position, token in enumerate(tokens)]

    corpus = Counter()
    for text, _ in german.values():
        corpus.update(key for key in keys_of(text)[1] if key)

    order = ranked_lemmas(index, lemmatize, corpus)
    rank = {word: position for position, word in enumerate(order)}
    print("lemmes classés", len(order))

    pairs, seen = [], set()
    for sentence_id, targets in links.items():
        if sentence_id not in german:
            continue
        text, author = german[sentence_id]
        if text in seen or not text[0].isupper() or text[-1] not in ".!?" or QUOTES.search(text) or BLOCKED.search(text):
            continue
        tokens, keys = keys_of(text)
        if not MIN_TOKENS <= len(tokens) <= MAX_TOKENS or re.search(r"\d", text):
            continue
        linked = next((t for t in targets if t in french and not QUOTES.search(french[t][0])), None)
        if linked is None:
            continue
        translation, translator = french[linked]
        if BLOCKED.search(translation) or re.search(r"\d", translation) or not 0.4 <= len(translation) / len(text) <= 2.5:
            continue
        if any(key is None or (key not in NAMES and rank.get(key, KNOWN_SIZE) >= KNOWN_SIZE) for key in keys):
            continue
        seen.add(text)
        pairs.append(
            {
                "id": sentence_id,
                "frId": linked,
                "de": text,
                "fr": translation,
                "authors": [author, translator],
                "words": sorted({key for key in keys if key in rank}),
                "top": max((rank[key] for key in keys if key in rank), default=0),
                "tokens": len(tokens),
                "name": any(key in NAMES for key in keys),
            }
        )
    print("paires utilisables", len(pairs))

    by_word = defaultdict(list)
    for pair in pairs:
        for word in pair["words"]:
            by_word[word].append(pair)

    excluded = set(overrides["exclude"])
    bank, candidates = [], []
    used = Counter()
    for word in order:
        info = index["lemmas"].get(word)
        if not info or info.get("pos") not in TEACHABLE or word in excluded:
            continue
        gloss = overrides["gloss"].get(word) or info.get("gloss", "")
        position = rank[word]

        def quality(pair):
            stem = gloss.split(" ")[-1].lower()[:4]
            return (
                pair["top"] > max(position + LOOKAHEAD, CORE_WORDS),
                bool(stem) and stem not in pair["fr"].lower(),
                not IDEAL_TOKENS[0] <= pair["tokens"] <= IDEAL_TOKENS[1],
                pair["name"],
                used[pair["id"]],
                pair["top"],
            )

        chosen = sorted(by_word[word], key=quality)[:MAX_SENTENCES]
        if len(chosen) < MIN_SENTENCES:
            continue
        candidates.append((word, info, gloss, len(by_word[word])))
        if gloss and len(bank) < BANK_SIZE:
            for pair in chosen:
                used[pair["id"]] += 1
            bank.append(
                {
                    "target": overrides["target"].get(word) or target_form(word, info),
                    "fr": gloss,
                    "pos": info["pos"],
                    "plural": info.get("plural"),
                    "sentences": [{"id": p["id"], "text": p["de"], "fr": p["fr"]} for p in chosen],
                }
            )
        if len(candidates) >= CANDIDATE_SIZE:
            break

    CANDIDATES.write_text(
        "\n".join(f"{i + 1}\t{w}\t{d.get('pos')}\t{d.get('gender') or ''}\t{g}\t{n}" for i, (w, d, g, n) in enumerate(candidates)),
        encoding="utf-8",
    )
    print("candidats", len(candidates), "sans sens", sum(1 for c in candidates if not c[2]), "banque", len(bank))

    BANK.write_text(json.dumps(bank, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    pair_by_id = {pair["id"]: pair for pair in pairs}
    used_ids = sorted({s["id"] for entry in bank for s in entry["sentences"]}, key=int)
    CREDITS.parent.mkdir(parents=True, exist_ok=True)
    CREDITS.write_text(
        "phrase_allemande\tauteur_allemand\tphrase_francaise\tauteur_francais\n"
        + "\n".join(
            f"{i}\t{pair_by_id[i]['authors'][0]}\t{pair_by_id[i]['frId']}\t{pair_by_id[i]['authors'][1]}" for i in used_ids
        ),
        encoding="utf-8",
    )
    print("phrases distinctes", len(used_ids), "taille Ko", BANK.stat().st_size // 1024)


if __name__ == "__main__":
    main()
