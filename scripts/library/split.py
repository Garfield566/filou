"""Cuts paragraphs into passages of 300 to 800 words, at a paragraph boundary, or between sentences in a very long paragraph."""
import re

MIN_WORDS = 300
MAX_WORDS = 800
TARGET_WORDS = 500


SENTENCE_END = re.compile(r"(?<=[.!?;:])\s+(?=[A-ZÄÖÜ„“\"'])")


def shorter(paragraph: str) -> list[str]:
    """A paragraph too long for one passage, cut between sentences into parts of about the target size."""
    if len(paragraph.split()) <= MAX_WORDS:
        return [paragraph]
    parts, current = [], []
    for sentence in SENTENCE_END.split(paragraph):
        current.append(sentence)
        if sum(len(s.split()) for s in current) >= TARGET_WORDS:
            parts.append(" ".join(current))
            current = []
    if current:
        parts.append(" ".join(current))
    return [part for part in parts if len(part.split()) <= MAX_WORDS]


def split_passages(paragraphs: list[str], limit: int) -> list[list[str]]:
    """At most `limit` passages, spread across the text so that a book is not read only from its first page."""
    passages: list[list[str]] = []
    current: list[str] = []
    size = 0
    for paragraph in (part for whole in paragraphs for part in shorter(whole)):
        words = len(paragraph.split())
        if size + words > MAX_WORDS:
            if size >= MIN_WORDS:
                passages.append(current)
            current, size = [], 0
        current.append(paragraph)
        size += words
        if size >= TARGET_WORDS:
            passages.append(current)
            current, size = [], 0
    if size >= MIN_WORDS:
        passages.append(current)
    if len(passages) <= limit:
        return passages
    # Each pick sits in the middle of its stretch, which skips the opening pages (preface, notes) of a book.
    step = len(passages) / limit
    return [passages[int((index + 0.5) * step)] for index in range(limit)]
