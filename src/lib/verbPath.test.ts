import { describe, expect, it } from 'vitest';
import { courseById } from '../data/courses';
import { grade } from './grade';
import { buildVerbChallenge, buildVerbLesson, challengeOpen, nextVerbLesson, verbChallenges, verbLessons, verbPath } from './verbPath';
import { verbFamilies, verbItem, verbItems } from './verbs';

/** A seeded generator, so that every run builds the same lesson. */
function seeded(seed: number) {
  let state = seed;
  return () => {
    state = (state * 1103515245 + 12345) % 2147483648;
    return state / 2147483648;
  };
}

describe.each(['en', 'de'])('verbs path %s', (courseId) => {
  const course = courseById(courseId);
  const lessons = verbLessons(course);

  it('puts every verb of every family in exactly one lesson', () => {
    const inLessons = lessons.flatMap((lesson) => lesson.verbs.map((verb) => verb.name));
    const all = verbFamilies(course).flatMap((family) => family.verbs.map((verb) => verb.name));
    expect(inLessons).toEqual(all);
    expect(new Set(all).size).toBe(all.length);
  });

  it('keeps lessons short and of even size, with ids that never collide', () => {
    for (const unit of verbPath(course)) {
      const sizes = unit.lessons.map((lesson) => lesson.verbs.length);
      expect(Math.max(...sizes), unit.family.id).toBeLessThanOrEqual(6);
      if (sizes.length > 1) expect(Math.max(...sizes) - Math.min(...sizes), unit.family.id).toBeLessThanOrEqual(1);
    }
    expect(new Set(lessons.map((lesson) => lesson.id)).size).toBe(lessons.length);
  });

  it('unlocks the lessons one after the other', () => {
    expect(nextVerbLesson(course, new Set())?.id).toBe(lessons[0].id);
    expect(nextVerbLesson(course, new Set([lessons[0].id]))?.id).toBe(lessons[1].id);
    expect(nextVerbLesson(course, new Set(lessons.map((lesson) => lesson.id)))).toBeUndefined();
  });

  it('opens a lesson with the table of its verbs, then practises each of them', () => {
    const lesson = lessons[1];
    const steps = buildVerbLesson(course, lesson.id, seeded(4));
    expect(steps[0]).toMatchObject({ kind: 'verbs' });
    if (steps[0].kind === 'verbs') expect(steps[0].family.verbs).toEqual(lesson.verbs);
    const practised = new Set(steps.flatMap((step) => ('itemIds' in step ? step.itemIds : [])));
    for (const verb of lesson.verbs) expect(practised.has(verbItem(course, verb).id)).toBe(true);
    expect(buildVerbLesson(course, 'nothing', seeded(1))).toEqual([]);
  });

  it('keeps the review ids of the verbs, so that what was learnt is not lost', () => {
    const ids = verbItems(course).map((item) => item.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const id of ids) expect(id).toMatch(new RegExp(`^${courseId}:v:[a-zäöüß]+$`));
  });
});

describe.each(['en', 'de'])('verbs challenges %s', (courseId) => {
  const course = courseById(courseId);
  const lessons = verbLessons(course);
  const challenges = verbChallenges(course);

  it('comes every two lessons and holds more verbs each time, up to all of them', () => {
    expect(challenges.length).toBe(Math.ceil(lessons.length / 2));
    for (let index = 1; index < challenges.length; index++) {
      expect(challenges[index].verbs.length).toBeGreaterThan(challenges[index - 1].verbs.length);
      expect(challenges[index].size).toBeGreaterThanOrEqual(challenges[index - 1].size);
    }
    expect(challenges.at(-1)!.verbs.length).toBe(lessons.flatMap((lesson) => lesson.verbs).length);
    expect(new Set(challenges.map((challenge) => challenge.id)).size).toBe(challenges.length);
    for (const challenge of challenges) expect(lessons.some((lesson) => lesson.id === challenge.id)).toBe(false);
  });

  it('opens once its lessons are finished', () => {
    expect(challengeOpen(challenges[0], new Set())).toBe(false);
    expect(challengeOpen(challenges[0], new Set([lessons[0].id]))).toBe(false);
    expect(challengeOpen(challenges[0], new Set([lessons[0].id, lessons[1].id]))).toBe(true);
    expect(challengeOpen(challenges[1], new Set([lessons[0].id, lessons[1].id]))).toBe(false);
  });

  it('mixes the newest verbs with older ones, without asking a verb twice', () => {
    const challenge = challenges[4];
    const steps = buildVerbChallenge(course, challenge.id, {}, Date.now(), seeded(3));
    const ids = steps.map((step) => ('itemIds' in step ? step.itemIds[0] : ''));
    expect(steps).toHaveLength(challenge.size);
    expect(new Set(ids).size).toBe(ids.length);
    const fresh = new Set(challenge.newVerbs.map((verb) => verbItem(course, verb).id));
    const allowed = new Set(challenge.verbs.map((verb) => verbItem(course, verb).id));
    const newCount = ids.filter((id) => fresh.has(id)).length;
    expect(ids.every((id) => allowed.has(id))).toBe(true);
    expect(newCount).toBeGreaterThanOrEqual(Math.ceil(challenge.size / 2));
    expect(newCount).toBeLessThan(challenge.size);
    expect(buildVerbChallenge(course, 'nothing', {}, Date.now())).toEqual([]);
  });

  it('starts with the verbs one has forgotten among the older ones', () => {
    const challenge = challenges[6];
    const now = Date.now();
    const fresh = new Set(challenge.newVerbs);
    const older = challenge.verbs.filter((verb) => !fresh.has(verb));
    const forgotten = verbItem(course, older[0]).id;
    const memory = Object.fromEntries(
      older.map((verb) => [verbItem(course, verb).id, { halfLifeDays: verbItem(course, verb).id === forgotten ? 0.01 : 30, lastSeen: now - 86400000 }]),
    );
    const steps = buildVerbChallenge(course, challenge.id, memory, now, seeded(5));
    expect(steps.some((step) => 'itemIds' in step && step.itemIds[0] === forgotten)).toBe(true);
  });
});

describe('spelling variants', () => {
  it('accepts another standard spelling of a form when the verb lists one', () => {
    const course = courseById('en');
    const withVariant = verbItems(course).find((item) => item.verb?.variants?.some((forms) => forms.length > 0));
    if (!withVariant) return;
    const index = withVariant.verb!.variants!.findIndex((forms) => forms.length > 0);
    const variant = withVariant.verb!.variants![index][0];
    const steps = buildVerbLesson(course, verbLessons(course).find((lesson) => lesson.verbs.includes(withVariant.verb!))!.id, seeded(2));
    const typed = steps.find((step) => step.kind === 'type' && step.itemIds[0] === withVariant.id && step.answers.some((answer) => answer.split(' ').includes(variant)));
    expect(typed).toBeDefined();
    if (typed?.kind === 'type') expect(grade(typed.answers, typed.answers.find((answer) => answer.includes(variant))!, { allowTypo: false, exactAccents: true })).toBe('correct');
  });
});
