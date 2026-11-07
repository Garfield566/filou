"""Checks the simplified versions and turns the accepted ones into library records.

A version is accepted when, measured with the same tools as the library:
- it has 300 to 600 words;
- the rules of level.py put it at its target level or below;
- few of its words lie beyond its level (share of words outside the most frequent ones, proper nouns left out).
Output: .tools/library/simplified/<lang>.json (read by build.py) and docs/revue/simplifications.md (every verdict,
plus one extract in full per language, original beside its three versions).
"""
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "library"))
import simplemma  # noqa: E402
import spacy  # noqa: E402
from collections import Counter  # noqa: E402

from build import MODELS, UNRANKED, analyse_doc, frequency_ranks  # noqa: E402
from common import ROOT, TODAY  # noqa: E402
from level import LEVELS, rule_level  # noqa: E402

LICENSE = "Domaine public (original) ; version simplifiée rédigée pour Filou"
WORDS = (300, 600)
# Words beyond the level: rank limit, and highest share allowed.
BEYOND = {"A2": (2000, 0.08), "B1": (4000, 0.12), "B2": (8000, 0.18)}
SAMPLE_PER_LANGUAGE = 1


# The reading screen teaches up to this many words before the text: those key words do not count against the level.
TAUGHT_BEFORE = 8


def rank_of(token, ranks: dict, language: str) -> int:
    """The best rank among the form, the spaCy lemma and the simplemma lemma: a missed lemma is not a rare word."""
    forms = {token.text.lower(), token.lemma_.lower(), simplemma.lemmatize(token.text, lang=language).lower()}
    return min(ranks.get(form, UNRANKED) for form in forms)


def verdict(measures: dict, tokens: list, ranks: dict, level: str, words: int, language: str) -> tuple[bool, list[str], float]:
    limit, allowed = BEYOND[level]
    beyond = Counter(simplemma.lemmatize(t.text, lang=language).lower() for t in tokens if rank_of(t, ranks, language) > limit)
    taught = sum(count for _, count in beyond.most_common(TAUGHT_BEFORE))
    share = (sum(beyond.values()) - taught) / max(1, len(tokens))
    reasons = []
    if not WORDS[0] <= words <= WORDS[1]:
        reasons.append(f"{words} mots")
    measured = rule_level(measures, language)
    if LEVELS.index(measured) > LEVELS.index(level):
        reasons.append(f"règles : {measured}")
    if share > allowed:
        reasons.append(f"{share:.0%} de mots au-delà du niveau")
    return not reasons, reasons, share


def main() -> None:
    lines = ["# Versions simplifiées : contrôle automatique", "",
             "Chaque version est mesurée avec les outils de la bibliothèque. Elle est refusée si elle sort de 300 à 600 mots,",
             "si les règles de niveau la placent au-dessus de sa cible, ou si trop de ses mots dépassent le niveau, hors des 8 mots clés montrés avant la lecture",
             f"(A2 : plus de {BEYOND['A2'][1]:.0%} hors des {BEYOND['A2'][0]} mots les plus courants ; B1 : {BEYOND['B1'][1]:.0%} hors des {BEYOND['B1'][0]} ; B2 : {BEYOND['B2'][1]:.0%} hors des {BEYOND['B2'][0]}).",
             "Rédaction par des agents IA à partir d'œuvres du domaine public : sens non vérifié par un natif.", "",
             "**Points à relire.**",
             "- Ricardo (en-0606) est retiré de la bibliothèque, avec ses versions : les tableaux de l'original ont été perdus à la récupération.",
             "- 10 versions allemandes A2 ont été réécrites une seconde fois pour employer des mots plus courants : quelques détails sont perdus (par exemple « Essen » pour « Käse » et « Brot » dans Heidi).",
             "- Le Genévrier (Von dem Machandelboom, de-0027) est un conte cruel : un enfant y est tué ; les faits sont gardés.",
             "- Les versions A2 de Kant et de Weber résument fortement des idées difficiles : le sens est gardé, les nuances non.",
             "- Une version entre dans l'appli seulement si elle permet aussi trois questions de lecture : quelques-unes sont écartées pour cela.", ""]
    for language in sys.argv[1:] or ["en", "de"]:
        nlp = spacy.load(MODELS[language])
        ranks = frequency_ranks(language)
        originals = {p["id"]: p for p in json.loads((ROOT / f"public/library/{language}/index.json").read_text(encoding="utf-8"))["passages"]}
        versions = {}
        for out in sorted((ROOT / ".tools/simplify").glob(f"{language}-?.out.json")):
            versions.update(json.loads(out.read_text(encoding="utf-8")))
        # A correction round rewrites refused A2 versions: the rewrite replaces the first attempt.
        for fix in sorted((ROOT / ".tools/simplify").glob(f"{language}-a2-fix-?.out.json")):
            for original_id, paragraphs in json.loads(fix.read_text(encoding="utf-8")).items():
                versions[original_id]["A2"] = paragraphs
        records, rows, sample = [], [], []
        # An original set aside by hand (scripts/library/excluded-passages.json) takes its versions with it.
        excluded = json.loads((ROOT / "scripts/library/excluded-passages.json").read_text(encoding="utf-8"))
        for original_id, levels in sorted(versions.items()):
            if original_id in excluded or original_id not in originals:
                continue
            original = originals[original_id]
            for level in ("A2", "B1", "B2"):
                paragraphs = [p.strip() for p in levels.get(level, []) if p.strip()]
                text = "\n\n".join(paragraphs)
                words = len(text.split())
                analysis = analyse_doc(nlp(text), language, ranks)
                ok, reasons, beyond = verdict(analysis["measures"], analysis["tokens"], ranks, level, words, language)
                rows.append(f"| {original['work'][:40]} | {original_id} | {original['level']} | {level} | {words} | {analysis['measures']['sentenceLength']} | {beyond:.0%} | {'accepté' if ok else 'refusé : ' + ', '.join(reasons)} |")
                if ok:
                    records.append({
                        "source": "simplified",
                        "language": language,
                        "theme": original["theme"],
                        "title": f"{original['title']} (version simplifiée {level})",
                        "author": original["author"],
                        "work": original["work"],
                        "url": original["url"],
                        "license": LICENSE,
                        "retrieved": TODAY,
                        "book": False,
                        "level": level,
                        "original": original_id,
                        "text": text,
                    })
            if len(sample) < SAMPLE_PER_LANGUAGE and all(levels.get(l) for l in ("A2", "B1", "B2")):
                body = json.loads((ROOT / f"public/library/{language}/passages/{original_id}.json").read_text(encoding="utf-8"))
                sample.append((original, body["paragraphs"], levels))
        folder = ROOT / ".tools/library/simplified"
        folder.mkdir(parents=True, exist_ok=True)
        (folder / f"{language}.json").write_text(json.dumps(records, ensure_ascii=False, indent=1), encoding="utf-8")
        accepted = sum("accepté" in row for row in rows)
        lines += [f"## {'Anglais' if language == 'en' else 'Allemand'} : {accepted} versions acceptées sur {len(rows)}", "",
                  "| Œuvre | Original | Niveau original | Cible | Mots | Mots par phrase | Au-delà du niveau | Verdict |",
                  "| --- | --- | --- | --- | --- | --- | --- | --- |", *rows, ""]
        for original, paragraphs, levels in sample:
            lines += [f"### Échantillon : {original['title']} ({original['author']})", "", "**Original (début)**", "", " ".join(paragraphs)[:900] + "…", ""]
            for level in ("A2", "B1", "B2"):
                lines += [f"**Version {level}**", "", "\n\n".join(levels[level]), ""]
        print(f"{language} : {accepted} versions acceptées sur {len(rows)}")
    (ROOT / "docs/revue/simplifications.md").write_text("\n".join(lines) + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()
