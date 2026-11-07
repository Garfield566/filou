"""A rule-based estimate of the CEFR level of a passage. It orders texts by difficulty; it is not a certified grade.

Rules alone misread some texts: the short lines of a play or a poem look easy, the long "und" chains of a tale look hard.
So each passage stays within the range given for its work in the reviewed lists (docs/revue/oeuvres-*.md), which rest on
graded readers and on the judgment of a reader; the rules only place the passage inside that range, or one level above.
"""
import re

LEVELS = ["A2", "B1", "B2", "C1", "C2"]
# Upper score of each level; above the last one, the text is C1.
THRESHOLDS = {"en": [("A2", 17.0), ("B1", 22.0), ("B2", 28.0)], "de": [("A2", 15.0), ("B1", 20.0), ("B2", 26.0)]}


def difficulty(measures: dict) -> float:
    return (
        measures["sentenceLength"] * 0.55
        + measures["rareShare"] * 60
        + measures["clauses"] * 3
        + measures["passives"] * 3
        + measures["subjunctives"] * 4
    )


def rule_level(measures: dict, language: str) -> str:
    score = difficulty(measures)
    for level, ceiling in THRESHOLDS[language]:
        if score < ceiling:
            return level
    return "C1"


def guessed_range(guess: str) -> tuple[int, int] | None:
    """The levels written before any parenthesis, as in "**A2-B1** (LG A1 ; …)". A1 counts as A2, the lowest level here."""
    codes = re.findall(r"\b([ABC][12])\b", guess.split("(")[0])
    positions = [LEVELS.index(code) if code in LEVELS else 0 for code in codes]
    return (min(positions), max(positions)) if positions else None


def estimate_level(measures: dict, language: str, guess: str = "") -> str:
    level = LEVELS.index(rule_level(measures, language))
    bounds = guessed_range(guess)
    if bounds:
        low, high = bounds
        level = max(low, min(level, high + 1))
    return LEVELS[min(level, len(LEVELS) - 1)]
