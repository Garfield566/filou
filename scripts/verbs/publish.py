"""Turns the reviewed lists (.tools/verbs/final-<lang>.json) into Filou's data, after checking them.

Checks: each verb has the right number of forms (English: past, participle; German: 3rd person, Präteritum, Perfekt
with hat or ist), no name twice, every verb Filou already taught is still there with the same forms (its reviews depend
on its name), and rare verbs come last. Output: src/data/verbs/<lang>.json and docs/revue/verbes.md.
"""
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
FORMS = {"en": 2, "de": 3}


def existing_verbs(language: str) -> dict[str, list[str]]:
    """The verbs of src/data/irregularVerbs.ts as they were before the complete lists."""
    source = (ROOT / "scripts/verbs/before.ts").read_text(encoding="utf-8")
    if language == "en":
        return {m[0]: [m[1], m[2]] for m in re.findall(r"en\('([^']+)', '(?:[^'\\]|\\.)*', '([^']+)', '([^']+)'\)", source)}
    return {m[0]: [m[1], m[2], m[3]] for m in re.findall(r"de\('([^']+)', '(?:[^'\\]|\\.)*', '([^']+)', '([^']+)', '([^']+)'\)", source)}


def check(language: str, data: dict) -> list[str]:
    problems, seen = [], set()
    for family in data["families"]:
        for verb in family["verbs"]:
            name = verb["name"]
            if name in seen:
                problems.append(f"{name} en double")
            seen.add(name)
            if len(verb["forms"]) != FORMS[language]:
                problems.append(f"{name} : {len(verb['forms'])} formes")
            if not verb.get("fr"):
                problems.append(f"{name} : sens manquant")
            if language == "de" and not re.match(r"^(hat|ist) ", verb["forms"][2]):
                problems.append(f"{name} : Perfekt sans auxiliaire ({verb['forms'][2]})")
            if len(verb.get("variants", [])) not in (0, FORMS[language]):
                problems.append(f"{name} : variantes mal formées")
    for name, forms in existing_verbs(language).items():
        found = next((v for f in data["families"] for v in f["verbs"] if v["name"] == name), None)
        if not found:
            problems.append(f"{name} : verbe déjà appris disparu")
        elif found["forms"] != forms:
            problems.append(f"{name} : formes changées {forms} → {found['forms']}")
    rare_seen = False
    for family in data["families"]:
        rare = all(v.get("rare") for v in family["verbs"])
        if rare_seen and not rare:
            problems.append(f"{family['id']} : famille courante après les rares")
        rare_seen |= rare
    return problems


def main() -> None:
    lines = ["# Verbes irréguliers : listes complètes", "",
             "Listes tirées du Wiktionnaire, triées et complétées par des agents IA, à relire. Les verbes déjà appris",
             "dans Filou sont gardés à l'identique ; « rare » marque les verbes archaïques, littéraires ou peu fréquents.", ""]
    for language in sys.argv[1:] or ["en", "de"]:
        data = json.loads((ROOT / f".tools/verbs/final-{language}.json").read_text(encoding="utf-8"))
        problems = check(language, data)
        if problems:
            print(f"{language} : {len(problems)} problèmes")
            for problem in problems[:40]:
                print("  -", problem)
            continue
        families = [{**f, "verbs": [{k: v for k, v in verb.items() if k in ("name", "fr", "forms", "variants", "rare") and v not in (None, [], [[]] * FORMS[language])} for verb in f["verbs"]]} for f in data["families"]]
        out = ROOT / "src/data/verbs"
        out.mkdir(parents=True, exist_ok=True)
        (out / f"{language}.json").write_text(json.dumps({"families": families}, ensure_ascii=False, indent=1), encoding="utf-8")
        verbs = [v for f in families for v in f["verbs"]]
        rare = sum(bool(v.get("rare")) for v in verbs)
        lines += [f"## {'Anglais' if language == 'en' else 'Allemand'} : {len(verbs)} verbes ({len(verbs) - rare} courants, {rare} rares)", ""]
        for family in families:
            lines.append(f"### {family['title']} ({len(family['verbs'])})")
            lines.append("")
            lines.append(f"_{family['hint']}_")
            lines.append("")
            for verb in family["verbs"]:
                variants = [", ".join(v) for v in verb.get("variants", []) if v]
                extra = f" (aussi : {' ; '.join(variants)})" if variants else ""
                lines.append(f"- **{verb['name']}**, {', '.join(verb['forms'])} : {verb['fr']}{extra}{' · rare' if verb.get('rare') else ''}")
            lines.append("")
        dropped = data.get("dropped", [])
        lines += [f"### Écartés ({len(dropped)})", "", *[f"- {d['verb']} : {d['reason']}" for d in dropped], ""]
        print(f"{language} : {len(verbs)} verbes ({rare} rares), {len(families)} familles, {len(dropped)} écartés")
    (ROOT / "docs/revue/verbes.md").write_text("\n".join(lines) + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()
