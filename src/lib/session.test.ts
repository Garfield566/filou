import { describe, expect, it } from 'vitest';
import { courses } from '../data/courses';
import type { Exercise } from '../types';
import { grade, normalize, tokenize } from './grade';
import { remember, type Memory } from './memory';
import { buildLesson, buildReview, dueItems, itemsOfCourse } from './session';

const DAY = 24 * 60 * 60 * 1000;
const now = new Date(2026, 2, 10, 12).getTime();

function seeded(seed: number) {
  let state = seed;
  return () => {
    state = (state * 16807) % 2147483647;
    return state / 2147483647;
  };
}

function expectSolvable(step: Exercise) {
  if (step.kind === 'choice') {
    expect(step.options).toContain(step.answer);
    expect(new Set(step.options).size).toBe(step.options.length);
    expect(step.options.length).toBeGreaterThanOrEqual(3);
    for (const wrong of step.options.filter((option) => option !== step.answer)) {
      expect(grade([step.answer], wrong, { exactAccents: true })).toBe('wrong');
    }
  }
  if (step.kind === 'arrange') {
    const words = tokenize(step.answers[0]);
    expect(grade(step.answers, words.join(' '))).toBe('correct');
    const bank = step.bank.map((word) => normalize(word));
    for (const word of words) {
      expect(bank).toContain(normalize(word));
      bank.splice(bank.indexOf(normalize(word)), 1);
    }
  }
  if (step.kind === 'type') expect(grade(step.answers, step.answers[0])).toBe('correct');
}

const seenMemory = (course: (typeof courses)[number], halfLifeDays: number): Memory =>
  Object.fromEntries(itemsOfCourse(course).map((item) => [item.id, { halfLifeDays, lastSeen: now - 30 * DAY }]));

describe.each(courses.map((course) => [course.label, course] as const))('%s sessions', (_, course) => {
  it('builds a solvable first run for every lesson', () => {
    for (const unit of course.units) {
      for (const lesson of unit.lessons) {
        for (const seed of [1, 2, 3]) {
          const steps = buildLesson(course, unit, lesson, false, {}, now, seeded(seed));
          expect(steps.length).toBeGreaterThan(0);
          steps.forEach(expectSolvable);
        }
      }
    }
  });

  it('teaches words before testing them and opens each unit with its tip', () => {
    const unit = course.units[0];
    const steps = buildLesson(course, unit, unit.lessons[0], false, {}, now, seeded(4));
    expect(steps[0].kind).toBe('tip');
    expect(steps[1].kind).toBe('intro');
    expect(buildLesson(course, unit, unit.lessons[1], false, {}, now, seeded(4))[0].kind).toBe('intro');
  });

  it('adds forgotten items from earlier lessons to a new lesson', () => {
    const unit = course.units[1];
    const lesson = unit.lessons[0];
    const without = buildLesson(course, unit, lesson, false, {}, now, seeded(5));
    const withReviews = buildLesson(course, unit, lesson, false, seenMemory(course, 1), now, seeded(5));
    expect(withReviews.length).toBe(without.length + 3);
  });

  it('builds solvable reviews at every memory strength', () => {
    for (const halfLife of [0.5, 3, 30]) {
      const steps = buildReview(course, seenMemory(course, halfLife), now, seeded(6));
      expect(steps).toHaveLength(12);
      steps.forEach(expectSolvable);
    }
  });

  it('asks for production only once an item is strong', () => {
    const weak = buildReview(course, seenMemory(course, 0.5), now, seeded(7));
    const strong = buildReview(course, seenMemory(course, 30), now, seeded(7));
    expect(weak.some((step) => step.kind === 'type')).toBe(false);
    expect(strong.every((step) => step.kind === 'type')).toBe(true);
  });

  it('ignores items never seen', () => {
    expect(buildReview(course, {}, now, seeded(8))).toEqual([]);
    expect(dueItems(course, {}, now)).toEqual([]);
  });

  it('lists an item as due once it fades', () => {
    const item = itemsOfCourse(course)[0];
    const memory = { [item.id]: remember(undefined, true, now) };
    expect(dueItems(course, memory, now)).toEqual([]);
    expect(dueItems(course, memory, now + 2 * DAY).map((due) => due.id)).toEqual([item.id]);
  });
});
