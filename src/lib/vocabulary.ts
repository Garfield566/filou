import data from '../data/en-vocabulary.json';
import lexicon from '../data/enLexicon.json';
import { englishVerbFamilies } from '../data/irregularVerbs';

export const baseWords: ReadonlySet<string> = new Set(data.socle);
export const falseFriends: ReadonlySet<string> = new Set(data.falseFriends);
export const transparentWords: ReadonlySet<string> = new Set(data.transparents);

const FORMS: Readonly<Record<string, string>> = data.forms;
const LEXICON_WORDS: ReadonlySet<string> = new Set(lexicon.map((word) => word.target.toLowerCase()));
/**
 * Past forms and participles of every irregular verb taught (shod → shoe). The forms table above keeps the last word:
 * it already decides ambiguous forms such as saw (see, not saw).
 */
const VERB_FORMS: Readonly<Record<string, string>> = Object.fromEntries(
  englishVerbFamilies.flatMap((family) =>
    // A rare verb's old forms often spell an everyday word (rent, from rend): only common verbs count here.
    family.verbs.filter((verb) => !verb.rare || baseWords.has(verb.name)).flatMap((verb) =>
      [...verb.forms, ...(verb.variants ?? []).flat()]
        .map((form) => form.toLowerCase())
        // A form that is a word in its own right keeps its own sense: wound is « blessure », not wind.
        .filter((form) => !baseWords.has(form) && !LEXICON_WORDS.has(form))
        .map((form) => [form, verb.name]),
    ),
  ),
);
const NEGATIONS: Readonly<Record<string, string>> = { "won't": 'will', "can't": 'can', "shan't": 'shall', "ain't": 'be' };
const CLITIC = /(?:'s|'ll|'re|'ve|'d|'m|n't)$/;

/** The dictionary form of an English word, from the forms resolved by `scripts/build_socle.py`. */
export function lemmaOf(word: string): string {
  const lower = word.toLowerCase().replace(/’/g, "'");
  const bare = NEGATIONS[lower] ?? lower.replace(CLITIC, '');
  return FORMS[bare] ?? VERB_FORMS[bare] ?? bare;
}
