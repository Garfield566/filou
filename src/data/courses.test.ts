import { describe, expect, it } from 'vitest';
import { courseById, courses, lessonsOf } from './courses';

const lessons = courses.flatMap(lessonsOf);
const exercises = lessons.flatMap((lesson) => lesson.exercises);

describe('course content', () => {
  it('has lesson ids unique across all courses, since progress is one shared list', () => {
    const ids = lessons.map((lesson) => lesson.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('never offers duplicate options or pair entries', () => {
    for (const exercise of exercises) {
      if (exercise.kind === 'choice') {
        expect(new Set(exercise.options).size).toBe(exercise.options.length);
      }
      if (exercise.kind === 'pairs') {
        expect(new Set(exercise.pairs.map(([target]) => target)).size).toBe(exercise.pairs.length);
        expect(new Set(exercise.pairs.map(([, fr]) => fr)).size).toBe(exercise.pairs.length);
      }
    }
  });

  it('falls back to the first course for an unknown id', () => {
    expect(courseById('nope')).toBe(courses[0]);
  });
});
