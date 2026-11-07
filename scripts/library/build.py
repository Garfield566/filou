"""Builds public/library from the fetched records: clean, split, analyse, estimate a level, write, report."""
import json
import random
import re
import shutil
import sys
from collections import Counter
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
import simplemma
import spacy
from wordfreq import top_n_list, zipf_frequency

from clean import clean_book, clean_wikisource
from common import OUTPUT, ROOT, WORK
from dictionary import POS_OF_SPACY, Dictionary
from level import estimate_level
from questions import build_questions
from split import split_passages

MODELS = {"en": "en_core_web_sm", "de": "de_core_news_sm"}
FREQUENT_WORDS = 60000
UNRANKED = 99999
# Passages per Gutenberg book, and per Wikisource page (a tale, a story, or one chapter).
LIMIT_BOOK = 8
LIMIT_PAGE = 3
QUESTIONS = 3
GLOSSARY_SIZE = 25
GLOSSARY_FROM_RANK = 1200
RARE_FROM_RANK = 5000
WORDS = re.compile(r"^[^\W\d_]{2,}(?:[-'’][^\W\d_]+)*$")
TEST_BANDS = [1000, 2000, 3000, 5000, 8000, 12000, 20000]
WORDS_PER_BAND = 5
FAKE_WORDS = {
    "en": ["brindle", "plonter", "sturgle", "fendrick", "morvate", "glimpet"],
    "de": ["Brunkel", "verschlaften", "Tromsel", "kelpern", "Mirgung", "flondig"],
}


def frequency_ranks(language: str) -> dict[str, int]:
    ranks: dict[str, int] = {}
    for rank, word in enumerate(top_n_list(language, FREQUENT_WORDS), start=1):
        ranks.setdefault(word, rank)
        ranks.setdefault(simplemma.lemmatize(word, lang=language).lower(), rank)
    return ranks


def analyse_doc(doc, language: str, ranks: dict[str, int]) -> dict:
    # spaCy may run a sentence across two paragraphs: each paragraph keeps its own part.
    sentences = [part.strip() for sentence in doc.sents for part in sentence.text.split("\n\n") if len(part.split()) >= 3]
    lemmas: Counter = Counter()
    tokens = []
    passives = subjunctives = clauses = rare = 0
    for token in doc:
        if language == "en":
            passives += token.dep_ == "auxpass"
            clauses += token.dep_ in {"advcl", "ccomp", "relcl", "acl"}
        else:
            passives += token.tag_ == "VVPP" and token.head.lemma_ == "werden"
            subjunctives += "Sub" in token.morph.get("Mood")
            clauses += token.tag_ in {"KOUS", "PRELS"}
        if token.pos_ == "PROPN" or token.ent_type_ or not WORDS.match(token.text):
            continue
        lemma = token.lemma_.lower()
        lemmas[lemma] += 1
        rank = ranks.get(lemma, UNRANKED)
        rare += rank >= RARE_FROM_RANK
        tokens.append(token)
    count = max(1, len(tokens))
    measures = {
        "sentenceLength": round(len(tokens) / max(1, len(sentences)), 1),
        "rareShare": round(rare / count, 3),
        "passives": round(passives / max(1, len(sentences)), 2),
        "subjunctives": round(subjunctives / max(1, len(sentences)), 2),
        "clauses": round(clauses / max(1, len(sentences)), 2),
    }
    return {"sentences": sentences, "lemmas": lemmas, "tokens": tokens, "measures": measures}


def glossary_of(analysis: dict, ranks: dict[str, int], dictionary: Dictionary, false_friends: set[str]) -> list[dict]:
    seen: dict[str, dict] = {}
    for token in analysis["tokens"]:
        lemma = token.lemma_.lower()
        rank = ranks.get(lemma, UNRANKED)
        if token.pos_ not in {"NOUN", "VERB", "ADJ", "ADV"} or (rank < GLOSSARY_FROM_RANK and lemma not in false_friends):
            continue
        if lemma in seen:
            seen[lemma]["count"] += 1
            continue
        sentence = token.sent.text.strip()
        meaning = dictionary.look_up(token.lemma_, token.pos_)
        # For a false friend the hand-kept sense, which warns about the trap, beats the first dictionary sense.
        if meaning and isinstance(false_friends, dict) and lemma in false_friends:
            meaning = {**meaning, "fr": false_friends[lemma]}
        if meaning and 4 <= len(sentence.split()) <= 40:
            seen[lemma] = {"lemma": token.lemma_, "key": lemma, "pos": token.pos_.lower(), "rank": rank, "count": 1, "sentence": sentence, **meaning}
    return sorted(seen.values(), key=lambda word: (-word["count"], -min(word["rank"], FREQUENT_WORDS)))[:GLOSSARY_SIZE]


def load_records(language: str) -> list[dict]:
    records = []
    for file in sorted(WORK.glob("*.json")):
        records.extend(r for r in json.loads(file.read_text(encoding="utf-8")) if r["language"] == language)
    return records


def shown_as(word: str, language: str, dictionary: Dictionary) -> str:
    """wordfreq gives every word in lower case; a German noun is shown with its capital, like the made-up nouns."""
    if language != "de" or word in dictionary.german:
        return word
    entry = dictionary.german.get(word.capitalize())
    return word.capitalize() if entry and entry.get("pos") == POS_OF_SPACY["NOUN"] else word


def rank_test(language: str, ranks: dict[str, int], false_friends: set[str], rng: random.Random, dictionary: Dictionary) -> list[dict]:
    pool: dict[int, list[str]] = {band: [] for band in TEST_BANDS}
    for word, rank in ranks.items():
        band = next((b for b in TEST_BANDS if rank <= b), None)
        if band and WORDS.match(word) and len(word) >= 4 and word not in false_friends and word.isascii():
            pool[band].append(word)
    previous = 0
    items = []
    for band in TEST_BANDS:
        words = [w for w in pool[band] if ranks[w] > previous]
        previous = band
        items += [{"word": shown_as(w, language, dictionary), "band": band} for w in rng.sample(sorted(words), WORDS_PER_BAND)]
    items += [{"word": word, "band": 0} for word in FAKE_WORDS[language]]
    rng.shuffle(items)
    return items


def build_language(language: str) -> tuple[list[dict], dict]:
    rng = random.Random(f"filou-{language}")
    nlp = spacy.load(MODELS[language])
    ranks = frequency_ranks(language)
    raw = json.loads((ROOT / ("scripts/en-faux-amis.json" if language == "en" else "scripts/de-faux-amis.json")).read_text(encoding="utf-8"))
    # The English list gives each word its true sense; the German one is a plain list.
    false_friends = raw if isinstance(raw, dict) else set(raw)
    dictionary = Dictionary(language)

    drafts = []
    for record in load_records(language):
        paragraphs = clean_book(record["text"]) if record.get("book") else clean_wikisource(record["text"])
        parts = split_passages(paragraphs, LIMIT_BOOK if record.get("book") else LIMIT_PAGE)
        for index, passage in enumerate(parts):
            title = record["title"] if len(parts) == 1 else f"{record['title']}, extrait {index + 1} sur {len(parts)}"
            drafts.append({**record, "title": title, "paragraphs": passage, "part": index + 1})

    docs = nlp.pipe(("\n\n".join(draft["paragraphs"]) for draft in drafts), batch_size=16)
    passages = []
    for number, (draft, doc) in enumerate(zip(drafts, docs), start=1):
        analysis = analyse_doc(doc, language, ranks)
        words = sum(len(p.split()) for p in draft["paragraphs"])
        record = {k: draft[k] for k in ("source", "title", "author", "work", "url", "license", "retrieved", "theme")}
        passages.append({
            **record,
            "id": f"{language}-{number:04d}",
            "language": language,
            "level": estimate_level(analysis["measures"], language, draft.get("levelGuess", "")),
            "words": words,
            "measures": analysis["measures"],
            "paragraphs": draft["paragraphs"],
            "glossary": glossary_of(analysis, ranks, dictionary, false_friends),
            "sentences": analysis["sentences"],
            "tokens": [(t.text, t.pos_, t.sent.text.strip()) for t in analysis["tokens"]],
            "lemmas": analysis["lemmas"],
        })

    table = sorted({lemma for passage in passages for lemma in passage["lemmas"]}, key=lambda lemma: (ranks.get(lemma, UNRANKED), lemma))
    ids = {lemma: index for index, lemma in enumerate(table)}
    folder = OUTPUT / language
    # The recordings in audio/ take long to make: they stay, since a passage keeps its id and its text between builds.
    shutil.rmtree(folder / "passages", ignore_errors=True)
    (folder / "passages").mkdir(parents=True)

    index_rows = []
    for passage in passages:
        passage["questions"] = build_questions(passage, passages, language, rng)
        # Every reading ends with three questions: a passage that cannot have them stays out.
        if len(passage["questions"]) < QUESTIONS:
            continue
        flat = [value for lemma, count in passage["lemmas"].items() for value in (ids[lemma], count)]
        keep = ("id", "title", "author", "work", "url", "license", "retrieved", "theme", "level", "words", "source", "measures")
        index_rows.append({**{key: passage[key] for key in keep}, "lemmas": flat})
        body = {key: passage[key] for key in ("id", "paragraphs", "glossary", "questions")}
        (folder / "passages" / f"{passage['id']}.json").write_text(json.dumps(body, ensure_ascii=False), encoding="utf-8")

    index = {
        "lemmas": table,
        "ranks": [ranks.get(lemma, UNRANKED) for lemma in table],
        "falseFriends": sorted(ids[lemma] for lemma in false_friends if lemma in ids),
        "passages": index_rows,
    }
    (folder / "index.json").write_text(json.dumps(index, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    (folder / "rank-test.json").write_text(json.dumps(rank_test(language, ranks, false_friends, rng, dictionary), ensure_ascii=False), encoding="utf-8")
    kept = {row["id"] for row in index_rows}
    return [passage for passage in passages if passage["id"] in kept], index


def report(language: str, passages: list[dict]) -> str:
    rows = [f"## {language} : {len(passages)} passages"]
    for field in ("level", "theme", "source"):
        counts = Counter(passage[field] for passage in passages)
        rows.append(f"- {field} : " + ", ".join(f"{key} {value}" for key, value in sorted(counts.items())))
    return "\n".join(rows)


def main() -> None:
    lines = ["# Rapport de la bibliothèque", ""]
    for language in sys.argv[1:] or ["en", "de"]:
        passages, index = build_language(language)
        # The function-word questions live in the passage files, which a build rewrites: they are added again.
        sys.path.insert(0, str(ROOT / "scripts/usages"))
        from attach import attach
        lines.append(f"- questions sur les mots outils : {attach(language)} passages")
        lines += [report(language, passages), f"- index : {len(json.dumps(index)) // 1024} Ko", ""]
    (ROOT / ".tools/library/report.md").write_text("\n".join(lines), encoding="utf-8")
    print("\n".join(lines))


if __name__ == "__main__":
    main()
