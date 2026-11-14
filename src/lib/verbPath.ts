import type { Course, Exercise, IrregularVerb, Item, VerbFamily } from '../types';
import { recall, type Memory } from './memory';
import { shuffle, type Rng } from './random';
import { verbExercise, verbFamilies, verbItem, verbItems, verbLessonPractice } from './verbs';

/** About six verbs a lesson: enough to see a pattern, few enough to remember the forms. */
const LESSON_SIZE = 6;

export interface VerbLesson {
  id: string;
  family: VerbFamily;
  verbs: IrregularVerb[];
  /** The first verbs of the lesson, as a title: « bleiben, schreiben, steigen… ». */
  title: string;
}

export interface VerbUnit {
  family: VerbFamily;
  lessons: VerbLesson[];
  rare: boolean;
}

/** Cuts a family into lessons of nearly equal size: 14 verbs give 5, 5 and 4 rather than 6, 6 and 2. */
function chunks<T>(items: T[]): T[][] {
  const count = Math.max(1, Math.ceil(items.length / LESSON_SIZE));
  const base = Math.floor(items.length / count);
  const extra = items.length % count;
  const parts: T[][] = [];
  let start = 0;
  for (let index = 0; index < count; index++) {
    const size = base + (index < extra ? 1 : 0);
    parts.push(items.slice(start, start + size));
    start += size;
  }
  return parts.filter((part) => part.length > 0);
}

const pathCache = new Map<string, VerbUnit[]>();

/** The path of irregular verbs: one unit per family, in the order of the families, rare verbs last. */
export function verbPath(course: Course): VerbUnit[] {
  let units = pathCache.get(course.id);
  if (!units) {
    units = verbFamilies(course).map((family) => ({
      family,
      rare: family.verbs.length > 0 && family.verbs.every((verb) => verb.rare),
      lessons: chunks(family.verbs).map((verbs, index) => ({
        id: `${family.id}:${index + 1}`,
        family,
        verbs,
        title: verbs.length > 3 ? `${verbs.slice(0, 3).map((verb) => verb.name).join(', ')}…` : verbs.map((verb) => verb.name).join(', '),
      })),
    }));
    pathCache.set(course.id, units);
  }
  return units;
}

export const verbLessons = (course: Course): VerbLesson[] => verbPath(course).flatMap((unit) => unit.lessons);

/** The first lesson not finished yet: the ones after it stay locked, as in the course. */
export function nextVerbLesson(course: Course, completed: ReadonlySet<string>): VerbLesson | undefined {
  return verbLessons(course).find((lesson) => !completed.has(lesson.id));
}

/** A lesson: the table of its verbs, then each verb chosen and written, then all its forms for some of them. */
export function buildVerbLesson(course: Course, lessonId: string, rng: Rng = Math.random): Exercise[] {
  const lesson = verbLessons(course).find((item) => item.id === lessonId);
  if (!lesson) return [];
  const items = lesson.verbs.map((verb) => verbItem(course, verb));
  const table: Exercise = { kind: 'verbs', family: { ...lesson.family, verbs: lesson.verbs } };
  return [table, ...verbLessonPractice(course, shuffle(items, rng), verbItems(course), rng)];
}

/** A challenge comes every two lessons of the path. */
const LESSONS_PER_CHALLENGE = 2;
const FIRST_CHALLENGE_VERBS = 8;
const MAX_CHALLENGE_VERBS = 16;

export interface VerbChallenge {
  id: string;
  /** 1 for the first challenge. */
  number: number;
  /** The lessons that must be finished before it opens; the last one is the newest. */
  lessons: VerbLesson[];
  /** Every verb seen up to that point: the pool of the challenge, larger at each step. */
  verbs: IrregularVerb[];
  /** The verbs of its last lessons, always part of it. */
  newVerbs: IrregularVerb[];
  /** How many verbs one round asks: more as the path goes on. */
  size: number;
}

const challengeCache = new Map<string, VerbChallenge[]>();

/**
 * The consolidation path, beside the learning path: after every two lessons, a challenge mixes the verbs just learnt
 * with all those learnt before, so that each challenge holds more verbs than the last.
 */
export function verbChallenges(course: Course): VerbChallenge[] {
  let challenges = challengeCache.get(course.id);
  if (!challenges) {
    const lessons = verbLessons(course);
    challenges = [];
    for (let end = LESSONS_PER_CHALLENGE; end < lessons.length + LESSONS_PER_CHALLENGE; end += LESSONS_PER_CHALLENGE) {
      const upTo = lessons.slice(0, Math.min(end, lessons.length));
      const number = challenges.length + 1;
      const verbs = upTo.flatMap((lesson) => lesson.verbs);
      challenges.push({
        id: `${course.id}-verbes-defi:${number}`,
        number,
        lessons: upTo,
        verbs,
        newVerbs: upTo.slice(end - LESSONS_PER_CHALLENGE).flatMap((lesson) => lesson.verbs),
        size: Math.min(verbs.length, FIRST_CHALLENGE_VERBS + 2 * (number - 1), MAX_CHALLENGE_VERBS),
      });
    }
    challengeCache.set(course.id, challenges);
  }
  return challenges;
}

/** A challenge opens once its lessons are finished. */
export const challengeOpen = (challenge: VerbChallenge, completed: ReadonlySet<string>): boolean =>
  challenge.lessons.every((lesson) => completed.has(lesson.id));

/**
 * One round of a challenge: half the verbs from the last two lessons, the rest from the older ones, weakest first;
 * each asked at the level its memory allows (pick a form, write one, write them all).
 */
export function buildVerbChallenge(course: Course, challengeId: string, memory: Memory, now: number, rng: Rng = Math.random): Exercise[] {
  const challenge = verbChallenges(course).find((item) => item.id === challengeId);
  if (!challenge) return [];
  const fresh = new Set(challenge.newVerbs);
  const weakest = (verbs: IrregularVerb[]) =>
    shuffle(verbs.map((verb) => verbItem(course, verb)), rng).sort((a, b) => strength(memory, a, now) - strength(memory, b, now));
  const older = weakest(challenge.verbs.filter((verb) => !fresh.has(verb)));
  const newest = weakest(challenge.newVerbs).slice(0, Math.max(Math.ceil(challenge.size / 2), challenge.size - older.length));
  const picked = [...newest, ...older.slice(0, challenge.size - newest.length)];
  return shuffle(picked, rng).map((item) => verbExercise(course, item, memory, rng));
}

const strength = (memory: Memory, item: Item, now: number) => (memory[item.id] ? recall(memory[item.id], now) : -1);
