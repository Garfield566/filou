"""Sorts the Tatoeba candidate sentences by usage of the function word, with Claude. Offline script: Filou never calls it.

For each word, Claude gets the reviewed usages (src/data/usages/<lang>.json) and a numbered batch of sentences, and
returns for each sentence one usage id (or "other") with a confidence from 0 to 1. Results are saved after every batch
in .tools/usages/classified-<lang>.json, so a run can stop and resume without paying twice.

The key is read from .env.local (ANTHROPIC_API_KEY=…), a file git ignores.

    .tools\\venv\\Scripts\\python.exe -I scripts/usages/classify.py de --words doch,schon   # a small batch, to measure the cost
    .tools\\venv\\Scripts\\python.exe -I scripts/usages/classify.py en de                    # everything left
"""
import argparse
import json
import sys
from pathlib import Path

import anthropic

ROOT = Path(__file__).resolve().parents[2]
WORK = ROOT / ".tools/usages"
MODEL = "claude-opus-5-5"
# Per million tokens, Claude API, Claude Opus 5.5 (input, output; thinking counts as output).
PRICE = (4.00, 20.00)
BATCH = 40
LANGUAGE = {"en": "English", "de": "German"}

SYSTEM = """You sort example sentences for a language-learning app for French speakers.
You get one function word, the list of its usages (id, French label, explanation, pattern), and numbered sentences
that contain the word. For each sentence, say which usage the word has in that sentence.
- Use exactly one of the given usage ids, or "other" when none fits, when the word is part of a fixed expression
  outside the list, or when the sentence holds the word only inside another word.
- If the word appears twice with different usages, choose the usage of its first occurrence.
- confidence is your probability (0 to 1) that the usage is right. Be strict: a learner will see the sentence as a
  model of that usage, so give a high confidence only when the case is clear-cut."""


def api_key() -> str:
    env = ROOT / ".env.local"
    for line in env.read_text(encoding="utf-8").splitlines() if env.exists() else []:
        if line.startswith("ANTHROPIC_API_KEY="):
            return line.split("=", 1)[1].strip()
    sys.exit("Clé absente : ajoute une ligne ANTHROPIC_API_KEY=… dans .env.local.")


def schema(ids: list[str]) -> dict:
    return {
        "type": "object",
        "properties": {
            "items": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "n": {"type": "integer"},
                        "usage": {"type": "string", "enum": [*ids, "other"]},
                        "confidence": {"type": "number"},
                    },
                    "required": ["n", "usage", "confidence"],
                    "additionalProperties": False,
                },
            }
        },
        "required": ["items"],
        "additionalProperties": False,
    }


def prompt(language: str, word: dict, sentences: list[dict]) -> str:
    usages = "\n".join(f"- {u['id']}: {u['label']}. {u['explanation']} Pattern: {u['pattern']}" for u in word["usages"])
    numbered = "\n".join(f"{n}. {s['text']}" for n, s in enumerate(sentences, start=1))
    return f"Language: {LANGUAGE[language]}\nWord: {word['word']}\n\nUsages:\n{usages}\n\nSentences:\n{numbered}"


def classify(client: anthropic.Anthropic, language: str, word: dict, sentences: list[dict]) -> tuple[list[dict], dict]:
    response = client.beta.messages.create(
        model=MODEL,
        max_tokens=16000,
        betas=["server-side-fallback-2026-07-01"],
        fallbacks="default",
        system=SYSTEM,
        output_config={"effort": "medium", "format": {"type": "json_schema", "schema": schema([u["id"] for u in word["usages"]])}},
        messages=[{"role": "user", "content": prompt(language, word, sentences)}],
    )
    usage = {"input": response.usage.input_tokens, "output": response.usage.output_tokens}
    if response.stop_reason == "refusal":
        print(f"  refus pour {word['word']} : {getattr(response.stop_details, 'category', None)}", flush=True)
        return [], usage
    if response.stop_reason == "max_tokens":
        print(f"  réponse tronquée pour {word['word']}, lot ignoré", flush=True)
        return [], usage
    text = next(block.text for block in response.content if block.type == "text")
    return json.loads(text)["items"], usage


def cost(tokens: dict) -> float:
    return tokens["input"] / 1e6 * PRICE[0] + tokens["output"] / 1e6 * PRICE[1]


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("languages", nargs="*", default=["en", "de"])
    parser.add_argument("--words", default="", help="comma-separated words, to classify only these")
    args = parser.parse_args()
    client = anthropic.Anthropic(api_key=api_key())
    for language in args.languages:
        inventory = {word["word"]: word for word in json.loads((ROOT / f"src/data/usages/{language}.json").read_text(encoding="utf-8"))["words"]}
        candidates = json.loads((WORK / f"sentences-{language}.json").read_text(encoding="utf-8"))
        out = WORK / f"classified-{language}.json"
        done = json.loads(out.read_text(encoding="utf-8")) if out.exists() else {"tokens": {"input": 0, "output": 0}, "words": {}}
        chosen = [w for w in args.words.split(",") if w] or list(inventory)
        run = {"input": 0, "output": 0}
        for name in chosen:
            word, sentences = inventory[name], candidates.get(name, [])
            labels = done["words"].setdefault(name, {})
            todo = [s for s in sentences if s["id"] not in labels]
            for start in range(0, len(todo), BATCH):
                batch = todo[start:start + BATCH]
                try:
                    items, tokens = classify(client, language, word, batch)
                except anthropic.APIStatusError as error:
                    print(f"  erreur {error.status_code} pour {name}, lot ignoré : {error.message}", flush=True)
                    continue
                except anthropic.APIConnectionError:
                    print(f"  connexion perdue pour {name}, lot ignoré", flush=True)
                    continue
                for item in items:
                    if 1 <= item["n"] <= len(batch):
                        labels[batch[item["n"] - 1]["id"]] = {"usage": item["usage"], "confidence": item["confidence"]}
                for key in run:
                    run[key] += tokens[key]
                    done["tokens"][key] += tokens[key]
                out.write_text(json.dumps(done, ensure_ascii=False), encoding="utf-8")
            print(f"{language} {name} : {len(labels)} phrases classées", flush=True)
        print(f"{language} : ce passage {run['input']} jetons lus, {run['output']} écrits, soit {cost(run):.2f} $ ; "
              f"total {cost(done['tokens']):.2f} $", flush=True)


if __name__ == "__main__":
    main()
