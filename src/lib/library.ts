import type { BankWord, Course } from '../types';
import { normalize } from './grade';
import type { Memory } from './memory';
import { notionState } from './notions';
import type { Reading } from './progress';
import { itemsOfCourse } from './session';

export interface PassageMeta {
  id: string;
  title: string;
  author: string;
  work: string;
  url: string;
  license: string;
  retrieved: string;
  theme: string;
  level: string;
  words: number;
  source: string;
  /** Pairs of lemma index and count. Proper nouns are already left out. */
  lemmas: number[];
  /** Function-word usages asked about after the reading, as word:usage. */
  usages?: string[];
  /** For a simplified version (source "simplified"): the id of the original passage. */
  original?: string;
}

export interface LibraryIndex {
  lemmas: string[];
  ranks: number[];
  falseFriends: number[];
  passages: PassageMeta[];
}

export interface GlossaryWord {
  lemma: string;
  key: string;
  pos: string;
  rank: number;
  count: number;
  sentence: string;
  fr: string;
  gender: string | null;
}

export interface ReadingQuestion {
  kind: string;
  prompt: string;
  shown?: string;
  answer: string;
  wrong: string[];
}

export interface PassageBody {
  id: string;
  paragraphs: string[];
  glossary: GlossaryWord[];
  questions: ReadingQuestion[];
  /** Sentences of the text whose function word has a sure usage: graded questions after the reading. */
  usageQuestions?: { word: string; usage: string; sentence: string }[];
}

export interface RankTestItem {
  word: string;
  /** Frequency band of a real word; 0 for a made-up one. */
  band: number;
}

const indexes = new Map<string, Promise<LibraryIndex>>();
const libraryUrl = (path: string) => `${import.meta.env.BASE_URL}library/${path}`;

async function fetchJson<T>(path: string): Promise<T> {
  const response = await fetch(libraryUrl(path));
  if (!response.ok) throw new Error(`library: ${path}`);
  return (await response.json()) as T;
}

export function loadIndex(courseId: string): Promise<LibraryIndex> {
  let index = indexes.get(courseId);
  if (!index) {
    index = fetchJson<LibraryIndex>(`${courseId}/index.json`).catch((error: unknown) => {
      // A failure is not kept: the next visit tries again.
      indexes.delete(courseId);
      throw error;
    });
    indexes.set(courseId, index);
  }
  return index;
}

export const loadPassage = (courseId: string, id: string) => fetchJson<PassageBody>(`${courseId}/passages/${id}.json`);
export const loadRankTest = (courseId: string) => fetchJson<RankTestItem[]>(`${courseId}/rank-test.json`);

/** The word a course item teaches, without an article or `to`, in the form used by the index. */
export function lemmaOfTarget(target: string, course: Course): string | null {
  const parts = target.split(/\s+/).filter((part) => !course.articles.some((article) => normalize(article) === normalize(part)) && part !== 'to');
  return parts.length === 1 ? parts[0].toLowerCase() : null;
}

export type WordEvidence = Map<string, boolean>;

/** What the reviews say about each word: true if it is held, false if it is fading. Unseen words are absent. */
export function reviewedWords(course: Course, memory: Memory, now: number): WordEvidence {
  const evidence: WordEvidence = new Map();
  for (const item of itemsOfCourse(course)) {
    if ((item.type !== 'word' && item.type !== 'bank') || !memory[item.id]) continue;
    const lemma = lemmaOfTarget(item.target, course);
    if (!lemma) continue;
    const held = notionState(memory[item.id], now) !== 'fissure';
    evidence.set(lemma, held || evidence.get(lemma) === true);
  }
  return evidence;
}

export function isKnown(index: LibraryIndex, falseFriends: ReadonlySet<number>, lemmaId: number, rankLimit: number, evidence: WordEvidence): boolean {
  const seen = evidence.get(index.lemmas[lemmaId]);
  if (seen !== undefined) return seen;
  return !falseFriends.has(lemmaId) && index.ranks[lemmaId] < rankLimit;
}

/** Share of a passage's words the learner knows, from 0 to 1, each occurrence counting. */
export function knownShare(passage: PassageMeta, index: LibraryIndex, rankLimit: number, evidence: WordEvidence): number {
  const falseFriends = new Set(index.falseFriends);
  let known = 0;
  let total = 0;
  for (let i = 0; i < passage.lemmas.length; i += 2) {
    const count = passage.lemmas[i + 1];
    total += count;
    if (isKnown(index, falseFriends, passage.lemmas[i], rankLimit, evidence)) known += count;
  }
  return total === 0 ? 0 : known / total;
}

export const DAILY_MIN = 0.95;
export const DAILY_MAX = 0.98;
const DAILY_MIDDLE = (DAILY_MIN + DAILY_MAX) / 2;

export interface DailyChoice {
  passage: PassageMeta;
  share: number;
  /** False when no text fits the 95 to 98 % window: this is the closest one. */
  inWindow: boolean;
}

/**
 * A text in the window, unread, whose theme differs from the last reading. Among those, a text that asks about a
 * function-word usage the learner has to review comes first.
 */
export function dailyReading(
  shares: { passage: PassageMeta; share: number }[],
  readings: Reading[],
  rng: () => number = Math.random,
  dueUsages: ReadonlySet<string> = new Set(),
): DailyChoice | null {
  const read = new Set(readings.map((reading) => reading.passageId));
  const lastTheme = readings.at(-1)?.theme;
  const unread = shares.filter(({ passage }) => !read.has(passage.id));
  const freshTheme = unread.filter(({ passage }) => passage.theme !== lastTheme);
  const pool = freshTheme.length > 0 ? freshTheme : unread;
  if (pool.length === 0) return null;
  const fitting = pool.filter(({ share }) => share >= DAILY_MIN && share <= DAILY_MAX);
  const reviewing = fitting.filter(({ passage }) => passage.usages?.some((usage) => dueUsages.has(usage)));
  const inWindow = reviewing.length > 0 ? reviewing : fitting;
  if (inWindow.length > 0) {
    const pick = inWindow[Math.floor(rng() * inWindow.length)];
    return { ...pick, inWindow: true };
  }
  const closest = [...pool].sort((a, b) => Math.abs(a.share - DAILY_MIDDLE) - Math.abs(b.share - DAILY_MIDDLE))[0];
  return { ...closest, inWindow: false };
}

/** Accepting two made-up words means the "yes" answers cannot be trusted as they stand. */
const MAX_FAKE_ACCEPTED = 1;
const HELD_SHARE = 0.7;
const SMALLEST_RANK = 500;

/** The largest frequency band mostly known. A band below a gap does not count. */
export function estimateRank(items: RankTestItem[], known: ReadonlySet<string>): number {
  const bands = [...new Set(items.map((item) => item.band))].filter((band) => band > 0).sort((a, b) => a - b);
  let rank = SMALLEST_RANK;
  for (const band of bands) {
    const inBand = items.filter((item) => item.band === band);
    if (inBand.filter((item) => known.has(item.word)).length / inBand.length < HELD_SHARE) break;
    rank = band;
  }
  const accepted = items.filter((item) => item.band === 0 && known.has(item.word)).length;
  if (accepted > MAX_FAKE_ACCEPTED) {
    const index = bands.indexOf(rank);
    return index > 0 ? bands[index - 1] : SMALLEST_RANK;
  }
  return rank;
}

const MIN_WORDS_BEFORE = 5;
const MAX_WORDS_BEFORE = 10;

/**
 * The unknown words most worth seeing first: repeated ones, then rarer ones. When fewer than five are unknown,
 * the rarest other words of the glossary complete the list, as long as the glossary has them.
 */
export function wordsBeforeReading(glossary: GlossaryWord[], index: LibraryIndex, rankLimit: number, evidence: WordEvidence): GlossaryWord[] {
  const falseFriends = new Set(index.falseFriends);
  const ids = new Map(index.lemmas.map((lemma, id) => [lemma, id]));
  const unknown = glossary.filter((word) => {
    const id = ids.get(word.key);
    return id !== undefined && !isKnown(index, falseFriends, id, rankLimit, evidence);
  });
  const rarest = glossary.filter((word) => !unknown.includes(word)).sort((a, b) => b.rank - a.rank);
  return [...unknown, ...rarest.slice(0, Math.max(0, MIN_WORDS_BEFORE - unknown.length))].slice(0, MAX_WORDS_BEFORE);
}

export interface WordsToReview {
  /** Words new to the course, to add to its bank. */
  added: BankWord[];
  /** Review items to start: the new words, and course words seen before the text but never studied. */
  itemIds: string[];
}

/** What the words shown before a text change in the reviews. A word already studied keeps its memory. */
export function wordsToReview(before: GlossaryWord[], passageId: string, course: Course, memory: Memory): WordsToReview {
  const byLemma = new Map<string, string>();
  for (const item of itemsOfCourse(course)) {
    if (item.type !== 'word' && item.type !== 'bank') continue;
    const lemma = lemmaOfTarget(item.target, course);
    if (lemma && !byLemma.has(lemma)) byLemma.set(lemma, item.id);
  }
  const added: BankWord[] = [];
  const itemIds: string[] = [];
  for (const word of before) {
    const existing = byLemma.get(word.key);
    if (existing) {
      if (!memory[existing]) itemIds.push(existing);
      continue;
    }
    const bankWord = readingWord(word, passageId);
    added.push(bankWord);
    itemIds.push(`${course.id}:b:${bankWord.target}`);
    byLemma.set(word.key, itemIds.at(-1)!);
  }
  return { added, itemIds: [...new Set(itemIds)] };
}

/** The same draw all day long for one course, so that the reading of the day stays put. */
export function dailyRng(courseId: string, day: string): () => number {
  let seed = 2166136261;
  for (const char of `${courseId}:${day}`) seed = Math.imul(seed ^ char.charCodeAt(0), 16777619);
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** A word met in a text, ready for the reviews, with its sentence as context. */
export function readingWord(word: GlossaryWord, passageId: string): BankWord {
  return {
    target: word.gender ? `${word.gender} ${word.lemma}` : word.lemma,
    fr: word.fr,
    pos: word.pos,
    plural: null,
    sentences: [],
    context: word.sentence,
    domain: undefined,
    ...{ passageId },
  };
}

/** Only the latest list of each course is kept: older ones are never asked for again. */
const extended = new WeakMap<Course, { words: BankWord[]; result: Course }>();

/** The course with the words met in texts added to its bank, so every review keeps working unchanged. */
export function withReadingWords(course: Course, words: BankWord[] | undefined): Course {
  if (!words || words.length === 0) return course;
  const cached = extended.get(course);
  if (cached?.words === words) return cached.result;
  const result = { ...course, bank: [...course.bank, ...words] };
  extended.set(course, { words, result });
  return result;
}

export interface ReadingStats {
  words: number;
  wordsPerMinute: number;
  byLevel: Record<string, number>;
}

export function readingStats(readings: Reading[], courseId: string): ReadingStats {
  const own = readings.filter((reading) => reading.courseId === courseId);
  const words = own.reduce((sum, reading) => sum + reading.words, 0);
  const ms = own.reduce((sum, reading) => sum + reading.readingMs, 0);
  const byLevel: Record<string, number> = {};
  for (const reading of own) byLevel[reading.level] = (byLevel[reading.level] ?? 0) + 1;
  return { words, wordsPerMinute: ms > 0 ? Math.round(words / (ms / 60000)) : 0, byLevel };
}
