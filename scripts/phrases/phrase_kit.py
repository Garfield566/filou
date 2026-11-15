"""Helpers shared by the scripts that write the « Phrases » tracks (src/data/phrases/<lang>.json)."""


def S(text, fr, chunks, orders=None, focus=None, blank=None, why_order=None, alt=None):
    """A sentence: its groups, its other correct orders, a question on one group, a group to fill in.

    alt: other correct sentences, not made of the same groups (another tense, say), accepted when translating."""
    sentence = {"text": text, "fr": fr, "chunks": chunks}
    if orders:
        sentence["orders"] = orders
    if why_order:
        sentence["orderWhy"] = why_order
    if focus:
        sentence["focus"] = {"chunk": focus[0], "answer": focus[1], "why": focus[2]}
    if blank:
        sentence["blank"] = {"chunk": blank[0], "base": blank[1], "wrong": blank[2]}
    if alt:
        sentence["alt"] = alt
    return sentence


def L(title, rule, sentences, ask=None):
    lesson = {"title": title, "rule": rule, "sentences": sentences}
    if ask:
        lesson["ask"] = ask
    return lesson


def R(intro, points, examples, tables=()):
    return {"intro": intro, "points": points, "tables": list(tables), "examples": examples}


def T(headers, rows, title=None):
    table = {"headers": headers, "rows": rows}
    if title:
        table["title"] = title
    return table


def make_track(track_id, title, hint, units):
    """Gives every unit, lesson and sentence its id: <track>-<unit>, <track>-<unit>:<lesson>, <track>-<unit>-<lesson>-NN."""
    track = {"id": track_id, "title": title, "hint": hint, "units": []}
    for unit_index, unit in enumerate(units, 1):
        unit_id = f"{track_id}-{unit_index}"
        lessons = []
        for lesson_index, lesson in enumerate(unit["lessons"], 1):
            for sentence_index, sentence in enumerate(lesson["sentences"], 1):
                sentence["id"] = f"{unit_id}-{lesson_index}-{sentence_index:02d}"
            lessons.append({"id": f"{unit_id}:{lesson_index}", **lesson})
        track["units"].append({"id": unit_id, "title": unit["title"], "hint": unit["hint"], "level": unit["level"], "lessons": lessons})
    return track
