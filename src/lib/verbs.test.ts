import { describe, expect, it } from 'vitest';
import { courseById, courses } from '../data/courses';
import type { Exercise } from '../types';
import { grade } from './grade';
import type { Memory } from './memory';
import { buildReview, dueItems, itemsOfCourse } from './session';
import { buildVerbReview, buildVerbSession, familyProgress, verbExercise, verbFamilies, verbItems } from './verbs';

const now = new Date(2026, 2, 10, 12).getTime();
const DAY = 24 * 60 * 60 * 1000;

const memoryOf = (course: (typeof courses)[number], halfLifeDays: number, lastSeen = now - DAY / 10): Memory =>
  Object.fromEntries(verbItems(course).map((item) => [item.id, { halfLifeDays, lastSeen }]));

function expectSolvable(step: Exercise) {
  if (step.kind === 'choice') {
    expect(step.options).toContain(step.answer);
    expect(new Set(step.options).size, step.shown).toBe(step.options.length);
    expect(step.options.length, step.shown).toBeGreaterThanOrEqual(3);
  }
  if (step.kind === 'type') expect(grade(step.answers, step.answers[0], { exactAccents: true })).toBe('correct');
}

describe.each(courses.map((course) => [course.label, course] as const))('%s verbs', (_, course) => {
  it('teaches at least a hundred verbs, each exactly once', () => {
    const names = verbItems(course).map((item) => item.verb!.name);
    expect(names.length).toBeGreaterThanOrEqual(100);
    expect(names.filter((name, index) => names.indexOf(name) !== index)).toEqual([]);
  });

  it('gives every verb the same number of forms', () => {
    const counts = new Set(verbItems(course).map((item) => item.verb!.forms.length));
    expect(counts.size).toBe(1);
  });

  it('builds a solvable session for every family, starting with its table', () => {
    for (const family of verbFamilies(course)) {
      const steps = buildVerbSession(course, family.id, {}, now);
      expect(steps[0].kind).toBe('verbs');
      steps.forEach(expectSolvable);
    }
  });

  it('raises difficulty with memory', () => {
    const item = verbItems(course)[0];
    expect(verbExercise(course, item, {}).kind).toBe('choice');
    expect(verbExercise(course, item, memoryOf(course, 3)).kind).toBe('type');
    const strong = verbExercise(course, item, memoryOf(course, 30));
    if (strong.kind !== 'type') throw new Error('expected a typed exercise');
    expect(strong.answers[0]).toBe(item.verb!.forms.join(' '));
  });

  it('starts a mixed review with unseen verbs', () => {
    const steps = buildVerbReview(course, {}, now);
    expect(steps).toHaveLength(12);
    steps.forEach(expectSolvable);
  });

  it('feeds studied verbs into the main reviews, and ignores unseen ones', () => {
    const verb = verbItems(course)[0];
    const memory = { [verb.id]: { halfLifeDays: 1, lastSeen: now - 3 * DAY } };
    expect(itemsOfCourse(course).some((item) => item.id === verb.id)).toBe(true);
    expect(dueItems(course, memory, now).map((item) => item.id)).toEqual([verb.id]);
    expect(buildReview(course, memory, now)).toHaveLength(1);
    expect(dueItems(course, {}, now)).toEqual([]);
  });

  it('counts remembered verbs per family', () => {
    const family = verbFamilies(course)[0];
    expect(familyProgress(course, family, {}, now)).toBe(0);
    expect(familyProgress(course, family, memoryOf(course, 30), now)).toBe(family.verbs.length);
  });
});

describe('verb forms', () => {
  const find = (id: string, name: string) => verbItems(courseById(id)).find((item) => item.verb!.name === name)!;

  it('keeps the principal parts in order', () => {
    expect(find('en', 'go').target).toBe('go, went, gone');
    expect(find('de', 'fahren').target).toBe('fahren, fährt, fuhr, ist gefahren');
  });
});
