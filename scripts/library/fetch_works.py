"""Fetches the full text of the reviewed works (scripts/library/works.json).

Project Gutenberg keeps its main site for people; robots are welcome on its mirrors, so the books come from the
PGLAF mirror, one at a time. Works that Gutenberg lacks come from Wikisource, through the official MediaWiki API.
"""
import json
import re
from difflib import SequenceMatcher
import sys
import urllib.error
from html import unescape
from html.parser import HTMLParser
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from common import ROOT, TODAY, fetch, media_wiki, write_records

MIRROR = "https://gutenberg.pglaf.org"
SITES = {"en": "en.wikisource.org", "de": "de.wikisource.org"}
GUTENBERG_LICENSE = "Domaine public"
WIKISOURCE_LICENSE = "Domaine public (transcription Wikisource, CC BY-SA 4.0)"
MIN_WORDS = 250
MAX_CHAPTERS = 10


def gutenberg_text(number: int) -> str | None:
    """The plain text of a book: UTF-8 first, then the older Latin-1 and ASCII files."""
    folder = "/".join(str(number)[:-1]) or "0"
    for name, encoding in ((f"{number}-0.txt", "utf-8-sig"), (f"{number}-8.txt", "latin-1"), (f"{number}.txt", "utf-8-sig")):
        try:
            return fetch(f"{MIRROR}/{folder}/{number}/{name}", pause=2.0).decode(encoding, errors="replace")
        except urllib.error.HTTPError as error:
            if error.code != 404:
                raise
    return None


class Prose(HTMLParser):
    """Keeps the paragraphs of a Wikisource page, without page numbers, notes, headers or navigation."""

    SKIP_TAGS = {"table", "style", "script", "sup", "math"}
    SKIP_CLASSES = ("pagenum", "ws-noexport", "noprint", "reference", "mw-editsection", "ws-pagenum", "wst-header", "ws-header")
    BLOCKS = {"p", "div", "br", "li", "dd", "h1", "h2", "h3", "h4", "h5", "h6"}

    def __init__(self) -> None:
        super().__init__()
        self.skipping: list[str] = []
        self.parts: list[str] = []

    def handle_starttag(self, tag, attrs):
        classes = (dict(attrs).get("class") or "").lower()
        if self.skipping or tag in self.SKIP_TAGS or any(name in classes for name in self.SKIP_CLASSES):
            self.skipping.append(tag)
            return
        if tag in self.BLOCKS:
            self.parts.append("\n\n" if tag != "br" else "\n")

    def handle_endtag(self, tag):
        if self.skipping:
            if self.skipping[-1] == tag:
                self.skipping.pop()
            return
        if tag in self.BLOCKS:
            self.parts.append("\n\n")

    def handle_data(self, data):
        if not self.skipping:
            self.parts.append(data)

    def text(self) -> str:
        return unescape("".join(self.parts))


def rendered(site: str, title: str) -> tuple[str, str, list[str]]:
    """Title after redirects, prose, and links to other main-namespace pages."""
    data = media_wiki(site, action="parse", page=title, prop="text|links", redirects=1)["parse"]
    reader = Prose()
    reader.feed(data["text"])
    links = [link["title"] for link in data.get("links", []) if link.get("ns") == 0 and link.get("exists", True)]
    return data["title"], reader.text(), links


def wikisource_texts(site: str, title: str) -> list[tuple[str, str]]:
    """(page, text) pairs. A short page is a table of contents or a list of editions: its chapters, or one edition, are taken."""
    name, text, links = rendered(site, title)
    if len(text.split()) >= MIN_WORDS:
        return [(name, text)]
    chapters = [link for link in links if link.startswith(f"{name}/")]
    if chapters:
        step = max(1, len(chapters) // MAX_CHAPTERS)
        pages = []
        for chapter in chapters[::step][:MAX_CHAPTERS]:
            chapter_name, chapter_text, _ = rendered(site, chapter)
            if len(chapter_text.split()) >= MIN_WORDS:
                pages.append((chapter_name, chapter_text))
        return pages
    # A list of editions, such as "Rothkäppchen (1857)", often in the old spelling: the latest is the most familiar text.
    editions = sorted((link for link in links if "/" not in link and re.search(r"\((?:18|19)\d\d\)$", link)), key=lambda link: link[-5:-1])
    if editions:
        edition_name, edition_text, _ = rendered(site, editions[-1])
        if len(edition_text.split()) >= MIN_WORDS:
            return [(edition_name, edition_text)]
    return []


def normalised(title: str) -> str:
    """Letters only, with old spellings folded: "Erzaehlungen" and "Erzählungen", "Schloss" and "Schloß" match."""
    title = title.lower()
    for old, new in (("ae", "ä"), ("oe", "ö"), ("ue", "ü"), ("ss", "ß"), ("the ", "")):
        title = title.replace(old, new)
    return re.sub(r"[^a-zäöüß]", "", title)


def same_work(ours: str, header: str) -> bool:
    ours, header = normalised(ours.split("(")[0]), normalised(header)
    return ours in header or header in ours or SequenceMatcher(None, ours, header).ratio() >= 0.8


def record(work: dict, source: str, url: str, license: str, text: str, book: bool) -> dict:
    return {
        "source": source,
        "language": work["language"],
        "theme": work["theme"],
        "title": work["title"],
        "author": work["author"],
        "work": work["title"],
        "levelGuess": work["levelGuess"],
        "url": url,
        "license": license,
        "retrieved": TODAY,
        "book": book,
        "text": text,
    }


def main() -> None:
    works = json.loads((ROOT / "scripts/library/works.json").read_text(encoding="utf-8"))
    languages = sys.argv[1:] or ["de", "en"]
    for language in languages:
        records, missing = [], []
        for work in (w for w in works if w["language"] == language):
            text = gutenberg_text(work["gutenberg"]) if work["gutenberg"] else None
            if text:
                url = f"https://www.gutenberg.org/ebooks/{work['gutenberg']}"
                book = record(work, "gutenberg", url, GUTENBERG_LICENSE, text, True)
                # A book that holds several works (Nachtstücke for Der Sandmann) is named after the book: its extracts
                # may come from any of them.
                header = re.search(r"^Title:\s*(.+)$", text[:3000], re.M)
                if header and not same_work(work["title"], header.group(1)):
                    book["title"] = book["work"] = f"{header.group(1).strip()} (recueil de {work['author']})"
                records.append(book)
            elif work["wikisource"]:
                site = SITES[language]
                pages = wikisource_texts(site, work["wikisource"])
                for page, page_text in pages:
                    url = f"https://{site}/wiki/{page.replace(' ', '_')}"
                    records.append(record(work, "wikisource", url, WIKISOURCE_LICENSE, page_text, False))
                if not pages:
                    missing.append(work["title"])
            else:
                missing.append(work["title"])
            print(f"{work['title']} : {'ok' if work['title'] not in missing else 'introuvable'}", flush=True)
            write_records(f"works-{language}", records)
        print(f"{language} : {len(records)} textes, introuvables : {missing}", flush=True)


if __name__ == "__main__":
    main()
