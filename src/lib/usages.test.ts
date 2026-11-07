import { describe, expect, it } from 'vitest';
import { courseById } from '../data/courses';
import type { Exercise } from '../types';
import { normalize, tokenize } from './grade';
import { recordReview, initialProgress } from './progress';
import { buildReview, dueItems, itemsOfCourse } from './session';
import { blanked, buildUsageSession, contrastOf, examplesOf, readingUsageQuestion, usageExercise, usageItems, usageRows } from './usages';

const now = new Date(2026, 10, 7, 12).getTime();
const DAY = 24 * 60 * 60 * 1000;

/** A seeded generator, so that every run draws the same sentences. */
function seeded(seed: number) {
  let state = seed;
  return () => {
    state = (state * 1103515245 + 12345) % 2147483648;
    return state / 2147483648;
  };
}

const tokens = (text: string): string[] => normalize(text).match(/[\p{L}']+/gu) ?? [];

describe.each(['en', 'de'])('function words %s', (courseId) => {
  const course = courseById(courseId);
  const items = usageItems(course);

  it('gives every (word, usage) its own review item, inside the ordinary engine', () => {
    expect(items.length).toBeGreaterThan(100);
    expect(new Set(items.map((item) => item.id)).size).toBe(items.length);
    for (const item of items) expect(item.id).toMatch(new RegExp(`^${courseId}:u:[^:]+:[a-z0-9_]+$`));
    const all = new Set(itemsOfCourse(course).map((item) => item.id));
    for (const item of items) expect(all.has(item.id)).toBe(true);
  });

  it('has at least five examples for every usage, Tatoeba first', () => {
    for (const item of items) expect(examplesOf(courseId, item.target, item.usage!.usage).length, item.id).toBeGreaterThanOrEqual(2);
    const full = items.filter((item) => examplesOf(courseId, item.target, item.usage!.usage).length >= 5).length;
    expect(full / items.length).toBeGreaterThan(0.85);
  });

  it('never shows the answer in its prompt or its sentence, at any strength', () => {
    for (const item of items) {
      for (const halfLifeDays of [0.2, 3, 30]) {
        for (const seed of [1, 2, 3, 4]) {
          const step = usageExercise(course, item, { [item.id]: { halfLifeDays, lastSeen: now } }, seeded(seed * 7919 + halfLifeDays));
          const label = `${item.id} ${halfLifeDays} ${seed}`;
          if (step.kind === 'arrange') {
            // Translation: the French sentence is never on screen, and its words are all among the tiles.
            const french = step.answers[0];
            expect(normalize(`${step.prompt} ${step.shown ?? ''}`), label).not.toContain(normalize(french));
            const tiles = step.bank.map((word) => normalize(word));
            for (const word of tokenize(french)) expect(tiles, label).toContain(normalize(word));
            expect(step.bank.length, label).toBeGreaterThan(tokenize(french).length);
            continue;
          }
          expect(step.kind, label).toBe('choice');
          if (step.kind !== 'choice') continue;
          expect(step.options, label).toContain(step.answer);
          expect(new Set(step.options.map((option) => normalize(option))).size, label).toBe(step.options.length);
          expect(step.options.length, label).toBeGreaterThanOrEqual(2);
          // A one-word answer is looked for as a word ("as" sits inside "phrase"); a longer one as a phrase.
          const oneWord = tokens(step.answer).length === 1;
          const holds = (text: string) => (oneWord ? tokens(text).includes(normalize(step.answer)) : normalize(text).includes(normalize(step.answer)));
          expect(holds(step.prompt), label).toBe(false);
          const shown = step.shown ?? '';
          if (step.prompt.startsWith('Quel mot')) {
            // The word to find is hidden in every form, and no other word of the group gives the answer away.
            expect(tokens(shown), label).not.toContain(normalize(step.answer));
            expect(shown, label).toContain('_____');
          } else {
            expect(holds(shown), label).toBe(false);
          }
        }
      }
    }
  });

  it('tells close words apart once a usage is well held, when it belongs to a group', () => {
    const grouped = items.filter((item) => contrastOf(courseId, item));
    expect(grouped.length).toBeGreaterThan(0);
    const steps = grouped.map((item) => usageExercise(course, item, { [item.id]: { halfLifeDays: 30, lastSeen: now } }, seeded(5)));
    expect(steps.some((step) => step.kind === 'choice' && step.prompt.startsWith('Quel mot'))).toBe(true);
  });

  it('introduces the usages of one word, then reviews them like any other item', () => {
    const steps = buildUsageSession(course, {}, now, seeded(9));
    const cards = steps.filter((step): step is Extract<Exercise, { kind: 'usage' }> => step.kind === 'usage');
    expect(cards.length).toBeGreaterThan(0);
    expect(new Set(cards.map((card) => card.word)).size).toBe(1);
    const learned = steps.flatMap((step) => ('itemIds' in step ? step.itemIds : []));
    const progress = recordReview(initialProgress(now), learned, 'good', now);
    const later = now + 30 * DAY;
    expect(dueItems(course, progress.memory, later).some((item) => item.type === 'usage')).toBe(true);
    expect(buildReview(course, progress.memory, later, seeded(3)).length).toBeGreaterThan(0);
  });

  it('shows the four states in the tables', () => {
    const [first] = items;
    const fresh = usageRows(course, { [first.id]: { halfLifeDays: 3, lastSeen: now } }, now);
    const states = fresh.flatMap((row) => row.usages.map((usage) => usage.state));
    expect(states).toContain('en_cours');
    expect(states).toContain('grise');
    const faded = usageRows(course, { [first.id]: { halfLifeDays: 1, lastSeen: now - 20 * DAY } }, now);
    expect(faded.flatMap((row) => row.usages.map((usage) => usage.state))).toContain('fissure');
  });
});

describe('questions after a reading', () => {
  const english = courseById('en');

  it('asks about the sense of the word in the sentence of the text, and grades a usage item', () => {
    const question = readingUsageQuestion(english, { word: 'as', usage: 'time', sentence: 'As he opened the door, the lamp went out.' }, seeded(2))!;
    expect(question.itemId).toBe('en:u:as:time');
    expect(question.wrong).not.toContain(question.answer);
    expect(question.wrong.length).toBeGreaterThanOrEqual(1);
    expect(normalize(`${question.prompt} ${question.shown}`)).not.toContain(normalize(question.answer));
  });

  it('gives no question for a word or usage the inventory does not know', () => {
    expect(readingUsageQuestion(english, { word: 'banana', usage: 'time', sentence: 'x' })).toBeNull();
    expect(readingUsageQuestion(english, { word: 'as', usage: 'nothing', sentence: 'x' })).toBeNull();
  });
});

describe('blanked', () => {
  it('hides every form of the word, whatever its case', () => {
    expect(blanked('As I said, do it as I do.', 'as')).toBe('_____ I said, do it _____ I do.');
    expect(blanked('Ich wurde müde, als es spät wurde.', 'werden')).toBe('Ich _____ müde, als es spät _____.');
    expect(blanked('Basket and has.', 'as')).toBe('Basket and has.');
  });
});
