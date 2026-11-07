"""Three questions per passage, built from the text alone, in the language of the text. No language model."""
import random

PROMPTS = {
    "en": {
        "blank": "Which word completes this sentence from the text?",
        "from_text": "Which sentence comes from the text?",
        "opening": "Which of these sentences comes first in the text?",
    },
    "de": {
        "blank": "Welches Wort passt in diesen Satz aus dem Text?",
        "from_text": "Welcher Satz steht im Text?",
        "opening": "Welcher dieser Sätze kommt im Text zuerst?",
    },
}
MIN_WORDS, MAX_WORDS = 7, 28
WRONG = 3


def usable(sentence: str) -> bool:
    # A sentence of dialogue ends with its closing quote; a fragment (lower case, or a paragraph break inside) is no sentence.
    if "\n" in sentence or not (sentence[:1].isupper() or sentence[:1] in "„“\"'‘«»—–"):
        return False
    return MIN_WORDS <= len(sentence.split()) <= MAX_WORDS and sentence.rstrip("”“’‘\"'»«")[-1:] in ".!?"


def blank_question(passage: dict, prompts: dict, rng: random.Random) -> dict | None:
    candidates = [(text, pos, sentence) for text, pos, sentence in passage["tokens"] if pos in {"NOUN", "VERB", "ADJ"} and len(text) >= 5 and usable(sentence)]
    rng.shuffle(candidates)
    # A sentence already shown with the words before the text would hand the blank over: those come last.
    glossary_sentences = {word["sentence"] for word in passage.get("glossary", [])}
    candidates.sort(key=lambda candidate: candidate[2] in glossary_sentences)
    for text, pos, sentence in candidates:
        # Once only, whatever the case: a capitalised copy would give the answer away.
        if sentence.lower().count(text.lower()) != 1:
            continue
        others = sorted({t for t, p, _ in passage["tokens"] if p == pos and t.lower() != text.lower() and len(t) >= 4})
        if len(others) >= WRONG:
            return {
                "kind": "blank",
                "prompt": prompts["blank"],
                "shown": sentence.replace(text, "_____"),
                "answer": text,
                "wrong": rng.sample(others, WRONG),
            }
    return None


def foreign_sentences(passage: dict, passages: list[dict], rng: random.Random) -> list[str]:
    same_theme = [other for other in passages if other["theme"] == passage["theme"] and other["work"] != passage["work"]]
    # Wrong options come from other works: another extract of the same book could hold the same sentence.
    pool = same_theme if len(same_theme) >= WRONG else [other for other in passages if other["work"] != passage["work"]]
    picked: list[str] = []
    for other in rng.sample(pool, min(30, len(pool))):
        sentences = [s for s in other["sentences"] if usable(s)]
        if sentences:
            picked.append(rng.choice(sentences))
        if len(picked) == WRONG:
            break
    return picked


def build_questions(passage: dict, passages: list[dict], language: str, rng: random.Random) -> list[dict]:
    prompts = PROMPTS[language]
    questions = []
    blank = blank_question(passage, prompts, rng)
    if blank:
        questions.append(blank)

    # The sentence of the blank is already on screen: no later question may use it as its answer.
    shown = blank["shown"] if blank else None
    seen = lambda sentence: shown is not None and sentence.replace(blank["answer"], "_____") == shown
    own = [sentence for sentence in passage["sentences"][1:] if usable(sentence) and not seen(sentence)]
    wrong = foreign_sentences(passage, passages, rng)
    if own and len(wrong) == WRONG:
        questions.append({"kind": "from_text", "prompt": prompts["from_text"], "answer": rng.choice(own), "wrong": wrong})
    used = {question["answer"] for question in questions}

    # The earliest usable sentence, against three that come later: a question on the order of the text.
    ordered = [sentence for sentence in passage["sentences"] if usable(sentence) and not seen(sentence) and sentence not in used]
    if len(ordered) > WRONG and ordered[0] in passage["sentences"][:4]:
        first, later = ordered[0], [s for s in ordered[len(ordered) // 3:] if s != ordered[0]]
        if len(later) >= WRONG:
            questions.append({"kind": "opening", "prompt": prompts["opening"], "answer": first, "wrong": rng.sample(later, WRONG)})
    return questions
