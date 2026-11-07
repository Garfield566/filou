"""Turns raw article or book text into clean paragraphs."""
import re

# Everything after one of these headings is apparatus, not prose.
TAIL_HEADINGS = {
    "references", "see also", "related pages", "other websites", "external links", "notes", "further reading",
    "sources", "bibliography", "gallery", "footnotes", "einzelnachweise", "weblinks", "literatur", "quellen",
    "anmerkungen", "siehe auch", "belege", "themenverwandte artikel",
}
HEADING = re.compile(r"^=+\s*(.+?)\s*=+$")
# A note of the edition inside the text, as in "[Footnote 3: …]" or "[Fußnote: …]".
NOTE = re.compile(r"\[\s*(?:Footnote|Fußnote|Illustration|Anmerkung|Note)[^\]]*\]", re.I | re.S)
GUTENBERG_START = re.compile(r"\*\*\*\s*START OF (?:THE|THIS) PROJECT GUTENBERG.*?\*\*\*", re.S | re.I)
GUTENBERG_END = re.compile(r"\*\*\*\s*END OF (?:THE|THIS) PROJECT GUTENBERG.*", re.S | re.I)
HEADER_LINE = re.compile(
    r"^\s*(?i:chapter|book|part|section|stave|kapitel|erstes|zweites|drittes|viertes|fünftes)\b.{0,70}$|^[IVXLC]+\.?\s*$|^[^a-zäöüß]{1,70}$"
)
# A chapter heading glued to the start of a paragraph, as in "Chapter XIV. The End. Life at the Three Chimneys".
GLUED_HEADING = re.compile(r"^(?i:chapter|kapitel)\s+[IVXLC0-9]+\.\s*(?:[^.!?]{1,40}\.\s+)?")


def clean_article(text: str) -> list[str]:
    paragraphs: list[str] = []
    for line in text.splitlines():
        line = line.strip()
        heading = HEADING.match(line)
        if heading:
            if heading.group(1).lower() in TAIL_HEADINGS:
                break
            continue
        if line:
            paragraphs.append(line)
    return tidy(paragraphs)


def clean_book(text: str) -> list[str]:
    """Removes Gutenberg's header and footer, then rejoins hard-wrapped lines and words split at line ends."""
    text = text.replace("\r\n", "\n")
    start = GUTENBERG_START.search(text)
    if start:
        text = text[start.end():]
    text = GUTENBERG_END.sub("", text)
    text = re.sub(r"(\w)-\n\s*(\w)", r"\1\2", text)
    text = re.sub(NOTE, "", text)
    text = re.sub(r"\[\d+\]", "", text)
    paragraphs = [" ".join(block.split()) for block in re.split(r"\n\s*\n", text)]
    return tidy(paragraphs)


def clean_wikisource(text: str) -> list[str]:
    """A rendered Wikisource page: blank lines part paragraphs, single line breaks are verse or page layout."""
    text = re.sub(NOTE, "", re.sub(r"\[\s*\d+\s*\]", "", text))
    paragraphs = [" ".join(block.split()) for block in re.split(r"\n\s*\n", text)]
    return tidy(paragraphs)


# Editorial matter of an edition, not the author's text.
EDITORIAL = re.compile(r"\b(?:transcriber|produced by|gutenberg|e-?text|e-?book|digiti[sz]ed|proofread|anmerkung des|inhaltsverzeichnis|table of contents)", re.I)


def tidy(paragraphs: list[str]) -> list[str]:
    """Short lines stay, since dialogue is made of them; headings, lists and editorial notes go."""
    kept = []
    for paragraph in paragraphs:
        paragraph = GLUED_HEADING.sub("", re.sub(r"\s+", " ", paragraph).replace("_", "").strip())
        words = paragraph.split()
        # Letters against every other visible character: spaces do not count, or a short reply looks like a list.
        visible = [c for c in paragraph if not c.isspace()]
        letters = sum(c.isalpha() for c in visible)
        exclamation = len(words) == 1 and paragraph[-1:] in "!?"
        if (len(words) < 2 and not exclamation) or HEADER_LINE.match(paragraph) or letters < 0.7 * len(visible) or EDITORIAL.search(paragraph):
            continue
        # German closing quotes are “ and ‘, English ones ” and ’.
        if not re.search(r"[.!?…»«\"”“’‘')\]—–\-,;:]$", paragraph):
            continue
        kept.append(paragraph)
    return kept
