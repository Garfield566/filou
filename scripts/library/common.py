"""Shared helpers of the library pipeline: polite HTTP, a disk cache, and the paths."""
import hashlib
import re
import json
import time
import urllib.error
import urllib.parse
import urllib.request
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
RAW = ROOT / ".tools/library/raw"
WORK = ROOT / ".tools/library/work"
OUTPUT = ROOT / "public/library"


def contact() -> str:
    """The contact Wikimedia asks for, read from .env.local so that it never enters the code."""
    env = ROOT / ".env.local"
    for line in env.read_text(encoding="utf-8").splitlines() if env.exists() else []:
        if line.startswith("FILOU_CONTACT="):
            return "; " + line.split("=", 1)[1].strip()
    return ""


USER_AGENT = "FilouLibrary/0.1 (personal language-learning project) python-urllib"
# The contact was agreed for Wikimedia only, which asks for it; no other site receives it.
WIKIMEDIA_AGENT = f"FilouLibrary/0.1 (personal language-learning project{contact()}) python-urllib"
WIKIMEDIA_HOST = re.compile(r"^https://[a-z.-]+\.(?:wikipedia|wikisource|wikinews|wikimedia|wiktionary)\.org/")


def user_agent(url: str) -> str:
    return WIKIMEDIA_AGENT if WIKIMEDIA_HOST.match(url) else USER_AGENT
TODAY = date.today().isoformat()
MAX_ATTEMPTS = 5


def fetch(url: str, pause: float = 1.0, timeout: int = 60) -> bytes:
    """One request at a time. A cached answer never reaches the network."""
    cache = RAW / "http" / (hashlib.sha256(url.encode()).hexdigest() + ".bin")
    if cache.exists():
        return cache.read_bytes()
    request = urllib.request.Request(url, headers={"User-Agent": user_agent(url), "Accept-Encoding": "identity"})
    for attempt in range(MAX_ATTEMPTS):
        try:
            with urllib.request.urlopen(request, timeout=timeout) as response:
                body = response.read()
            break
        except urllib.error.HTTPError as error:
            if error.code not in (429, 503) or attempt == MAX_ATTEMPTS - 1:
                raise
            # The server asked us to slow down: wait as long as it says, and longer each time.
            asked = error.headers.get("Retry-After", "")
            wait = max(int(asked) if asked.isdigit() else 0, 60 * 2**attempt)
            print(f"ralenti par le serveur, pause de {wait} s", flush=True)
            time.sleep(wait)
    cache.parent.mkdir(parents=True, exist_ok=True)
    cache.write_bytes(body)
    time.sleep(pause)
    return body


def media_wiki(site: str, **params) -> dict:
    query = {"format": "json", "formatversion": 2, "maxlag": 5, **params}
    return json.loads(fetch(f"https://{site}/w/api.php?" + urllib.parse.urlencode(query), pause=2.0))


def write_records(name: str, records: list[dict]) -> None:
    WORK.mkdir(parents=True, exist_ok=True)
    (WORK / f"{name}.json").write_text(json.dumps(records, ensure_ascii=False), encoding="utf-8")
    print(name, len(records))
