"""Turns the reviewed lists of works (docs/revue/oeuvres-*.md) into scripts/library/works.json.

The lists are the source of truth: a work enters the library only if it is in them. Rows without any source are left out.
"""
import json
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from common import ROOT

THEMES = [
    ("theatre", r"théâtre|comédie|tragédie"),
    ("poesie", r"ballade|poème|vers|épopée|lyrique"),
    ("romans", r"science-fiction|anticipation"),
    ("essais", r"essai|pamphlet|traité|récit de voyage|autobiograph|discours|conférence|politique|économie|sociologie"),
    ("contes", r"conte|fable|légende|sage"),
    ("jeunesse", r"jeunesse|enfant"),
    ("nouvelles", r"nouvelle|parabole|kalendergeschichte|récit|histoire"),
    ("romans", r"roman"),
]
# Lyric poems are too short for a passage of 300 words.
# Checked by hand: these Wikisource titles lead to another text (a student song, a poem by Busch), or the text is a few lines long.
WRONG_OR_TOO_SHORT = {"Krambambuli", "Das Brot", "Kleine Fabel ; Gibs auf! (petites proses)", "To the Lighthouse"}
# The Grimms wrote this tale in Low German (Plattdeutsch): it would teach a dialect, not German.
WRONG_OR_TOO_SHORT |= {"Der Hase und der Igel"}
SHORT_POEMS = {"Erlkönig", "Der Zauberlehrling", "Herr von Ribbeck auf Ribbeck im Havelland", "Die Lorelei (« Ich weiß nicht, was soll es bedeuten »)"}


def theme_of(genre: str) -> str:
    return next((theme for theme, pattern in THEMES if re.search(pattern, genre, re.I)), "romans")


def cells_of(line: str) -> list[str]:
    return [cell.strip() for cell in line.strip().strip("|").split("|")]


def rows(path: Path) -> list[list[str]]:
    """The rows of the tables of works, up to the section of excluded works."""
    found = []
    for line in path.read_text(encoding="utf-8").splitlines():
        if line.startswith("## Œuvres écartées") or line.startswith("## Remarques"):
            break
        if line.startswith("|") and not line.startswith("|---") and not line.startswith("| Titre") and not line.startswith("| #"):
            found.append(cells_of(line))
    return found


def wikisource_title(cell: str) -> str | None:
    quoted = re.findall(r"«\s*([^»]+?)\s*»", cell)
    if quoted:
        return quoted[0]
    match = re.match(r"^(?:[✔◐]\s*)?(?:V\s+|H\s+)?([^✘(]+?)(?:\s*\(.*)?$", cell)
    if not match or cell.startswith("✘") or cell.lower().startswith(("non trouvé", "à vérifier")):
        return None
    return match.group(1).strip() or None


def gutenberg_id(cell: str) -> int | None:
    if re.search(r"non trouvé|à vérifier", cell) and not re.match(r"^\d", cell):
        return None
    match = re.search(r"\d{2,6}", cell)
    return int(match.group()) if match else None


def main() -> None:
    works = []
    for language, file in (("en", "oeuvres-en.md"), ("de", "oeuvres-de.md")):
        for cells in rows(ROOT / "docs/revue" / file):
            if language == "de":
                cells = cells[1:]
            title, author, died, published, genre, recognised, level, wikisource, gutenberg = cells[:9]
            if title in SHORT_POEMS or title in WRONG_OR_TOO_SHORT:
                continue
            work = {
                "language": language,
                "title": title,
                "author": author,
                "died": died,
                "published": published,
                "genre": genre,
                "theme": theme_of(genre),
                "recognisedBy": recognised,
                "levelGuess": level,
                "gutenberg": gutenberg_id(gutenberg),
                "wikisource": wikisource_title(wikisource),
            }
            if work["gutenberg"] or work["wikisource"]:
                works.append(work)
            else:
                print(f"sans source : {title}")
    # A Gutenberg collection shared by several rows (Grimm, Hebel, Hauff, Kafka) would give the whole book to each row:
    # those rows take their own page on Wikisource instead.
    shared = {w["gutenberg"] for w in works if w["gutenberg"] and sum(o["gutenberg"] == w["gutenberg"] for o in works) > 1}
    for work in works:
        if work["gutenberg"] in shared and work["wikisource"]:
            work["gutenberg"] = None
    (ROOT / "scripts/library/works.json").write_text(json.dumps(works, ensure_ascii=False, indent=1), encoding="utf-8")
    for language in ("en", "de"):
        own = [w for w in works if w["language"] == language]
        print(language, len(own), "œuvres ;", sum(1 for w in own if w["gutenberg"]), "par Gutenberg")


if __name__ == "__main__":
    main()
