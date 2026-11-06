import data from '../data/en-vocabulary.json';

export const baseWords: ReadonlySet<string> = new Set(data.socle);
export const falseFriends: ReadonlySet<string> = new Set(data.falseFriends);
export const transparentWords: ReadonlySet<string> = new Set(data.transparents);

const FORMS: Readonly<Record<string, string>> = data.forms;
const NEGATIONS: Readonly<Record<string, string>> = { "won't": 'will', "can't": 'can', "shan't": 'shall', "ain't": 'be' };
const CLITIC = /(?:'s|'ll|'re|'ve|'d|'m|n't)$/;

/** The dictionary form of an English word, from the forms resolved by `scripts/build_socle.py`. */
export function lemmaOf(word: string): string {
  const lower = word.toLowerCase().replace(/’/g, "'");
  const bare = NEGATIONS[lower] ?? lower.replace(CLITIC, '');
  return FORMS[bare] ?? bare;
}
