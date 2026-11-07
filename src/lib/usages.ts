import deExamples from '../data/usages/de-examples.json';
import deInventory from '../data/usages/de.json';
import enExamples from '../data/usages/en-examples.json';
import enInventory from '../data/usages/en.json';
import type { Course, Exercise, Item } from '../types';
import { normalize, tokenize } from './grade';
import { isDue, recall, type Memory } from './memory';
import { notionState, type NodeState } from './notions';
import { shuffle, type Rng } from './random';

export interface UsageDef {
  id: string;
  label: string;
  pos: string;
  explanation: string;
  pattern: string;
  level: string;
  examples: { text: string; fr: string }[];
  grammarRef: string;
}

export interface FunctionWord {
  word: string;
  rank: number | null;
  required: boolean;
  categories: string[];
  usages: UsageDef[];
}

export interface UsageExample {
  id: string;
  text: string;
  fr: string;
  /** Tatoeba authors of the sentence and of its translation; absent for a sentence written for Filou. */
  author?: string;
  frAuthor?: string;
  frId?: string;
}

export interface UsageRef {
  word: FunctionWord;
  usage: UsageDef;
}

interface Inventory {
  words: FunctionWord[];
  contrasts: { words: string[]; usages: string[]; note: string }[];
}

const DATA: Record<string, { inventory: Inventory; examples: Record<string, UsageExample[]> }> = {
  en: { inventory: enInventory as Inventory, examples: enExamples.examples },
  de: { inventory: deInventory as Inventory, examples: deExamples.examples },
};

/** Below this many Tatoeba examples, the sentences written in the inventory complete the list. */
const MIN_EXAMPLES = 5;
const NEW_USAGES = 3;
const REVIEWS_IN_SESSION = 3;
const WEAK_HALF_LIFE = 1;
const STRONG_HALF_LIFE = 7;

/** Inflected forms, as in scripts/usages/sentences.py; every other word of the inventory is invariable. */
const FORMS: Record<string, string[]> = {
  get: ['get', 'gets', 'got', 'gotten', 'getting'],
  like: ['like', 'likes', 'liked', 'liking'],
  would: ['would', "wouldn't"],
  werden: ['werde', 'wirst', 'wird', 'werden', 'werdet', 'wurde', 'wurdest', 'wurden', 'wurdet', 'würde', 'würdest', 'würden', 'würdet', 'geworden', 'worden'],
  lassen: ['lasse', 'lässt', 'lasst', 'lassen', 'ließ', 'ließest', 'ließen', 'ließt', 'gelassen', 'lass'],
};

export const usageKey = (word: string, usage: string) => `${word}:${usage}`;
export const usageItemId = (courseId: string, word: string, usage: string) => `${courseId}:u:${word}:${usage}`;

export function functionWords(courseId: string): FunctionWord[] {
  return DATA[courseId]?.inventory.words ?? [];
}

const itemsByCourse = new Map<string, Item[]>();

/** One review item per (word, usage): the ordinary memory and reviews then apply to them. */
export function usageItems(course: Course): Item[] {
  let items = itemsByCourse.get(course.id);
  if (!items) {
    items = functionWords(course.id).flatMap((word) =>
      word.usages.map((usage) => ({
        id: usageItemId(course.id, word.word, usage.id),
        type: 'usage' as const,
        target: word.word,
        fr: usage.label,
        alt: [],
        usage: { word, usage },
      })),
    );
    itemsByCourse.set(course.id, items);
  }
  return items;
}

/** Tatoeba examples first; written ones fill in a usage that Tatoeba covers poorly. */
export function examplesOf(courseId: string, word: string, usage: UsageDef): UsageExample[] {
  const found = DATA[courseId]?.examples[usageKey(word, usage.id)] ?? [];
  if (found.length >= MIN_EXAMPLES) return found;
  const written = usage.examples.map((example, index) => ({ id: `filou-${word}-${usage.id}-${index}`, ...example }));
  return [...found, ...written];
}

export function creditOf(example: UsageExample): string {
  if (!example.author) return 'Exemple rédigé pour Filou.';
  return `Phrase Tatoeba n° ${example.id} (${example.author}), traduction n° ${example.frId} (${example.frAuthor}), CC BY 2.0 FR.`;
}

const pick = <T,>(items: T[], rng: Rng): T => items[Math.floor(rng() * items.length)];

const tokensOf = (text: string): string[] => text.toLowerCase().match(/[\p{L}']+/gu) ?? [];

function formsOf(word: string): string[] {
  return FORMS[word] ?? [word];
}

/** The sentence with every form of the word hidden, whatever its case. */
export function blanked(text: string, word: string): string {
  const forms = formsOf(word).map((form) => form.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  return text.replace(new RegExp(`(?<![\\p{L}'])(?:${forms.join('|')})(?![\\p{L}'])`, 'giu'), '_____');
}

function why(ref: UsageRef, example: UsageExample): string {
  return `${ref.word.word} : ${ref.usage.label}. ${ref.usage.explanation} « ${example.fr} » ${creditOf(example)}`;
}

/** Which usage is it? The options are the usages of the same word, so only the sense decides. */
function recognizeUsage(course: Course, item: Item, rng: Rng): Exercise {
  const ref = item.usage!;
  const example = pick(examplesOf(course.id, ref.word.word, ref.usage), rng);
  const others = shuffle(
    ref.word.usages.filter((usage) => usage.id !== ref.usage.id && normalize(usage.label) !== normalize(ref.usage.label)),
    rng,
  ).slice(0, 3);
  return {
    kind: 'choice',
    itemIds: [item.id],
    prompt: `Quel est le sens de « ${ref.word.word} » dans cette phrase ?`,
    shown: example.text,
    shownIsTarget: true,
    options: shuffle([ref.usage.label, ...others.map((usage) => usage.label)], rng),
    answer: ref.usage.label,
    why: why(ref, example),
  };
}

/** The French words of a label, before its explanation in brackets: « à, vers (direction) » gives à and vers. */
function renderings(label: string): string[] {
  return tokenize(label.split('(')[0].replace(/[;,/]/g, ' ')).filter((word) => !/[+…]/.test(word) && word === word.toLowerCase());
}

/**
 * Translate the sentence by putting French words in order. The extra tiles are the French renderings of the same
 * word's other usages (« pour » against « à »): only the sense of the word in this sentence tells which to use.
 */
function translateUsage(course: Course, item: Item, rng: Rng): Exercise {
  const ref = item.usage!;
  const example = pick(examplesOf(course.id, ref.word.word, ref.usage), rng);
  const answer = tokenize(example.fr);
  const taken = new Set(answer.map((word) => normalize(word)));
  const decoys: string[] = [];
  const add = (word: string) => {
    if (decoys.length < 4 && !taken.has(normalize(word))) {
      taken.add(normalize(word));
      decoys.push(word);
    }
  };
  for (const usage of shuffle(ref.word.usages.filter((other) => other.id !== ref.usage.id), rng)) renderings(usage.label).forEach(add);
  // A word with one usage (weil), or renderings already in the answer: words of other translations fill the bank.
  for (const other of shuffle(functionWords(course.id), rng)) {
    if (decoys.length >= 3) break;
    if (other.word !== ref.word.word) tokenize(pick(examplesOf(course.id, other.word, pick(other.usages, rng)), rng).fr).slice(0, 2).forEach(add);
  }
  return {
    kind: 'arrange',
    itemIds: [item.id],
    prompt: 'Traduis cette phrase',
    shown: example.text,
    // No recording exists for these sentences, so no speaker and no autoplay.
    shownIsTarget: false,
    audio: '',
    autoplay: false,
    bank: shuffle([...answer, ...decoys], rng),
    answers: [example.fr],
    why: why(ref, example),
  };
}

/** The group of close words this usage belongs to, such as as / like or als / wenn / wie. */
export function contrastOf(courseId: string, item: Item): string[] | null {
  const key = usageKey(item.usage!.word.word, item.usage!.usage.id);
  return DATA[courseId]?.inventory.contrasts.find((group) => group.usages.includes(key))?.words ?? null;
}

/** Which word fits? The word is hidden; a sentence holding another word of the group is left out, since two would fit. */
function contrastUsage(course: Course, item: Item, group: string[], rng: Rng): Exercise | null {
  const ref = item.usage!;
  const rivals = group.filter((word) => word !== ref.word.word).flatMap(formsOf);
  const usable = examplesOf(course.id, ref.word.word, ref.usage).filter((example) => !tokensOf(example.text).some((token) => rivals.includes(token)));
  if (usable.length === 0) return null;
  const example = pick(usable, rng);
  return {
    kind: 'choice',
    itemIds: [item.id],
    prompt: 'Quel mot complète la phrase ?',
    shown: blanked(example.text, ref.word.word),
    shownIsTarget: true,
    options: shuffle(group, rng),
    answer: ref.word.word,
    why: why(ref, example),
  };
}

/** Difficulty rises with memory: recognise the sense, then translate, then tell close words apart. */
export function usageExercise(course: Course, item: Item, memory: Memory, rng: Rng = Math.random): Exercise {
  const halfLife = memory[item.id]?.halfLifeDays ?? 0;
  const single = item.usage!.word.usages.length < 2;
  if (halfLife >= STRONG_HALF_LIFE || single) {
    const group = contrastOf(course.id, item);
    const exercise = group ? contrastUsage(course, item, group, rng) : null;
    if (exercise) return exercise;
  }
  if (single) return translateUsage(course, item, rng);
  return halfLife < WEAK_HALF_LIFE ? recognizeUsage(course, item, rng) : translateUsage(course, item, rng);
}

/** The next usages to learn: those of one word at a time, the most frequent words first. */
function nextUsages(course: Course, memory: Memory): Item[] {
  const fresh = usageItems(course).filter((item) => !memory[item.id]);
  const byRank = [...fresh].sort((a, b) => (a.usage!.word.rank ?? 1e9) - (b.usage!.word.rank ?? 1e9));
  const word = byRank[0]?.usage!.word.word;
  return word ? fresh.filter((item) => item.usage!.word.word === word).slice(0, NEW_USAGES) : [];
}

/** Introduces the usages of the next word, then mixes in the usages starting to fade. */
export function buildUsageSession(course: Course, memory: Memory, now: number, rng: Rng = Math.random): Exercise[] {
  const fresh = nextUsages(course, memory);
  const fading = usageItems(course)
    .filter((item) => memory[item.id] && isDue(memory[item.id], now))
    .sort((a, b) => recall(memory[a.id], now) - recall(memory[b.id], now))
    .slice(0, REVIEWS_IN_SESSION);
  const steps: Exercise[] = [];
  for (const item of fresh) {
    const ref = item.usage!;
    steps.push({ kind: 'usage', word: ref.word.word, usage: ref.usage, examples: examplesOf(course.id, ref.word.word, ref.usage).slice(0, 2) });
    steps.push(recognizeUsage(course, item, rng));
  }
  for (const item of shuffle(fresh, rng)) steps.push(translateUsage(course, item, rng));
  return [...steps, ...fading.map((item) => usageExercise(course, item, memory, rng))];
}

export interface UsageRow {
  word: FunctionWord;
  usages: { usage: UsageDef; state: NodeState }[];
}

/** The state of each usage, for the tables. */
export function usageRows(course: Course, memory: Memory, now: number): UsageRow[] {
  return functionWords(course.id).map((word) => ({
    word,
    usages: word.usages.map((usage) => ({ usage, state: notionState(memory[usageItemId(course.id, word.word, usage.id)], now) })),
  }));
}

/** The usages starting to fade, as word:usage, the form the library index uses. */
export function dueUsageKeys(course: Course, memory: Memory, now: number): Set<string> {
  return new Set(
    usageItems(course)
      .filter((item) => memory[item.id] && isDue(memory[item.id], now))
      .map((item) => usageKey(item.usage!.word.word, item.usage!.usage.id)),
  );
}

export interface ReadingUsageQuestion {
  itemId: string;
  prompt: string;
  shown: string;
  answer: string;
  wrong: string[];
  why: string;
}

/**
 * A graded question on a function word met in a text. The options are the usages of that word, so the answer depends
 * on the sense in this sentence. An unknown word or usage gives no question.
 */
export function readingUsageQuestion(course: Course, question: { word: string; usage: string; sentence: string }, rng: Rng = Math.random): ReadingUsageQuestion | null {
  const word = functionWords(course.id).find((item) => item.word === question.word);
  const usage = word?.usages.find((item) => item.id === question.usage);
  if (!word || !usage || word.usages.length < 2) return null;
  const others = shuffle(word.usages.filter((item) => item.id !== usage.id && normalize(item.label) !== normalize(usage.label)), rng).slice(0, 3);
  return {
    itemId: usageItemId(course.id, word.word, usage.id),
    prompt: `Dans cette phrase du texte, que veut dire « ${word.word} » ?`,
    shown: question.sentence,
    answer: usage.label,
    wrong: others.map((item) => item.label),
    why: `${word.word} : ${usage.label}. ${usage.explanation}`,
  };
}

export const learnedUsages =(course: Course, memory: Memory): number => usageItems(course).filter((item) => memory[item.id]).length;
