const CONTRACTIONS: [RegExp, string][] = [
  [/\bi'm\b/g, 'i am'],
  [/\b(you|we|they)'re\b/g, '$1 are'],
  [/\b(he|she|it|what|where|who|that|there|how)'s\b/g, '$1 is'],
  [/\b(i|you|we|they)'ve\b/g, '$1 have'],
  [/\b(i|you|he|she|we|they)'ll\b/g, '$1 will'],
  [/\b(i|you|he|she|we|they)'d\b/g, '$1 would'],
  [/\bcan't\b/g, 'cannot'],
  [/\bcan not\b/g, 'cannot'],
  [/\bwon't\b/g, 'will not'],
  [/\b(do|does|did|is|are|was|were|have|has|should|would|could)n't\b/g, '$1 not'],
];

/** Ignores what a learner is not tested on: case, punctuation, spacing, accents, contractions. */
export function normalize(text: string, keepAccents = false): string {
  const base = keepAccents ? text.normalize('NFC') : text.normalize('NFD').replace(/\p{M}/gu, '');
  let result = base
    .replace(/[’‘]/g, "'")
    .toLowerCase()
    .replace(/ß/g, 'ss')
    .replace(/[.,!?;:"«»…]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  for (const [pattern, replacement] of CONTRACTIONS) {
    result = result.replace(pattern, replacement);
  }
  return result;
}

function editDistanceIsOne(a: string, b: string): boolean {
  if (Math.abs(a.length - b.length) > 1 || a === b) return false;
  let i = 0;
  while (i < a.length && i < b.length && a[i] === b[i]) i++;
  const swapped =
    a.length === b.length && a[i] === b[i + 1] && a[i + 1] === b[i] && a.slice(i + 2) === b.slice(i + 2);
  return (
    swapped ||
    a.slice(i + 1) === b.slice(i + 1) ||
    a.slice(i + 1) === b.slice(i) ||
    a.slice(i) === b.slice(i + 1)
  );
}

/**
 * A slip inside one long word is forgiven. Short words and word endings are not:
 * he/she or German einen/einem are real mistakes, not typos.
 */
function isTypo(given: string, answer: string): boolean {
  const givenWords = given.split(' ');
  const answerWords = answer.split(' ');
  if (givenWords.length !== answerWords.length) return false;
  const different = answerWords.flatMap((word, index) =>
    word === givenWords[index] ? [] : [[givenWords[index], word] as const],
  );
  if (different.length !== 1) return false;
  const [typed, expected] = different[0];
  return expected.length >= 5 && typed.at(-1) === expected.at(-1) && editDistanceIsOne(typed, expected);
}

export type Verdict = 'correct' | 'typo' | 'wrong';

interface GradeOptions {
  allowTypo?: boolean;
  /** For grammar, where an umlaut changes the meaning: hatte is not hätte. */
  exactAccents?: boolean;
}

export function grade(answers: string[], draft: string, { allowTypo, exactAccents }: GradeOptions = {}): Verdict {
  const given = normalize(draft, exactAccents);
  if (given === '') return 'wrong';
  const normalized = answers.map((answer) => normalize(answer, exactAccents));
  if (normalized.includes(given)) return 'correct';
  return allowTypo && normalized.some((answer) => isTypo(given, answer)) ? 'typo' : 'wrong';
}

/** Splits a sentence into the words shown in a word bank. */
export function tokenize(sentence: string): string[] {
  return sentence
    .split(/\s+/)
    .map((word) => word.replace(/^[.,!?;:"«»…]+|[.,!?;:"«»…]+$/g, ''))
    .filter(Boolean);
}
