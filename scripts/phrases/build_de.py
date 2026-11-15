"""Writes src/data/phrases/de.json from the German tracks.

Run: .tools/venv/Scripts/python.exe -I scripts/phrases/build_de.py src/data/phrases/de.json"""
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

import de_cas  # noqa: E402
import de_phrase  # noqa: E402
import de_temps  # noqa: E402

tracks = [de_cas.TRACK, de_temps.TRACK, de_phrase.TRACK]
Path(sys.argv[1]).write_text(json.dumps({"tracks": tracks}, ensure_ascii=False, indent=1), encoding="utf-8")
for track in tracks:
    lessons = [lesson for unit in track["units"] for lesson in unit["lessons"]]
    print(track["id"], len(lessons), "leçons,", sum(len(lesson["sentences"]) for lesson in lessons), "phrases")
