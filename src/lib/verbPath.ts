import type { Course, Exercise, IrregularVerb, VerbFamily } from '../types';
import { shuffle, type Rng } from './random';
import { verbFamilies, verbItem, verbItems, verbLessonPractice } from './verbs';

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
