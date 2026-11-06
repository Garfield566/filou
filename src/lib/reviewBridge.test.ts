import { describe, expect, it } from 'vitest';
import { courseById, lessonsOf } from '../data/courses';
import { initialProgress, type Progress } from './progress';
import { dueItems, itemsOfCourse } from './session';
import type { GrammarLesson } from '../types';
import { applyReviewEvents, buildProfile, ruleItemIds, type ReviewEvent } from './reviewBridge';

const DAY = 24 * 60 * 60 * 1000;
const start = 1000 * DAY;
const now = start + 8 * DAY;

const course = courseById('en');
const words = itemsOfCourse(course).filter((item) => item.type === 'word');
const [wordA, wordB, unseenWord] = words.map((item) => item.id);
const lesson = lessonsOf(course).find(
  (candidate): candidate is GrammarLesson => candidate.kind === 'grammar' && candidate.questions.length >= 2,
)!;
const rule = ruleItemIds(course, lesson.id);

/** Hearts low and old enough for any refill to show, outside test mode. */
function player(): Progress {
  const memory = Object.fromEntries([wordA, wordB, ...rule].map((id) => [id, { halfLifeDays: 4, lastSeen: start }]));
  return { ...initialProgress(start), hearts: 2, testMode: false, memory };
}

function play(events: ReviewEvent[]): Progress {
  const before = player();
  const after = applyReviewEvents(course, before, events, now);
  expect(after.hearts).toBe(before.hearts);
  expect(after.heartsUpdatedAt).toBe(before.heartsUpdatedAt);
  return after;
}

const halfLives = (progress: Progress, ids: string[]) => ids.map((id) => progress.memory[id].halfLifeDays);
const each = (ids: string[], value: number) => ids.map(() => value);

describe('applyReviewEvents, one grade at a time', () => {
  it('good: success on each word and rule', () => {
    const ids = [wordA, wordB, ...rule];
    expect(halfLives(play([{ itemIds: ids, grade: 'good' }]), ids)).toEqual(each(ids, 8));
  });

  it('good and hard: words succeed, the faulty rule is hard', () => {
    const after = play([
      { itemIds: [wordA, wordB], grade: 'good' },
      { itemIds: rule, grade: 'hard' },
    ]);
    expect(halfLives(after, [wordA, wordB])).toEqual([8, 8]);
    expect(halfLives(after, rule)).toEqual(each(rule, 4));
    expect(after.memory[rule[0]].lastSeen).toBe(now);
  });

  it('again: failure on the faulty notion, other items untouched', () => {
    const after = play([{ itemIds: rule, grade: 'again' }]);
    expect(halfLives(after, rule)).toEqual(each(rule, 2));
    expect(after.memory[wordA]).toEqual({ halfLifeDays: 4, lastSeen: start });
  });

  it('again on a new word: it enters the reviews', () => {
    const after = play([
      { itemIds: [wordA], grade: 'again' },
      { itemIds: [unseenWord], grade: 'again' },
    ]);
    expect(after.memory[wordA].halfLifeDays).toBe(2);
    expect(after.memory[unseenWord].halfLifeDays).toBe(0.25);
    const dueIds = dueItems(course, after.memory, now + DAY).map((item) => item.id);
    expect(dueIds).toContain(unseenWord);
  });

  it('good on a rule alone', () => {
    const after = play([{ itemIds: rule, grade: 'good' }]);
    expect(halfLives(after, rule)).toEqual(each(rule, 8));
  });

  it('again on a rule alone', () => {
    const after = play([{ itemIds: rule, grade: 'again' }]);
    expect(halfLives(after, rule)).toEqual(each(rule, 2));
  });

  it('good on words alone', () => {
    const after = play([{ itemIds: [wordA, wordB], grade: 'good' }]);
    expect(halfLives(after, [wordA, wordB])).toEqual([8, 8]);
  });

  it('changes nothing for an empty list', () => {
    const before = player();
    expect(applyReviewEvents(course, before, [], now)).toEqual(player());
  });
});

describe('applyReviewEvents, on a lesson id', () => {
  it('reviews the questions of a grammar lesson', () => {
    const after = applyReviewEvents(course, initialProgress(start), [{ itemIds: [lesson.id], grade: 'good' }], now);
    expect(Object.keys(after.memory).sort()).toEqual([...rule].sort());
  });

  it('leaves the ids of words and questions as they are', () => {
    const ids = [wordA, rule[0]];
    const after = applyReviewEvents(course, initialProgress(start), [{ itemIds: ids, grade: 'good' }], now);
    expect(Object.keys(after.memory).sort()).toEqual([...ids].sort());
  });
});

describe('ruleItemIds', () => {
  it('gives real course items for every question of every grammar lesson', () => {
    const known = new Set(itemsOfCourse(course).map((item) => item.id));
    for (const candidate of lessonsOf(course)) {
      if (candidate.kind !== 'grammar') continue;
      const ids = ruleItemIds(course, candidate.id);
      expect(ids).toHaveLength(candidate.questions.length);
      expect(ids.every((id) => known.has(id))).toBe(true);
    }
  });

  it('follows the id format of the engine', () => {
    expect(rule[0]).toBe(`en:g:${lesson.id}:0`);
  });

  it('is empty for an unknown lesson or one without grammar', () => {
    const vocab = lessonsOf(course).find((candidate) => candidate.kind === 'vocab')!;
    expect(ruleItemIds(course, 'nothing')).toEqual([]);
    expect(ruleItemIds(course, vocab.id)).toEqual([]);
  });
});

describe('buildProfile', () => {
  it('lists only the words already seen, and every grammar rule', () => {
    const profile = buildProfile(course, { [wordA]: { halfLifeDays: 2, lastSeen: now } }, now);
    expect(profile.words).toEqual({ [wordA]: 'en_cours' });
    expect(profile.rules[lesson.id]).toBe('grise');
    const grammarLessons = lessonsOf(course).filter((candidate) => candidate.kind === 'grammar');
    expect(Object.keys(profile.rules)).toHaveLength(grammarLessons.length);
  });

  it('reads the state of each kind of notion', () => {
    const memory = {
      [wordA]: { halfLifeDays: 7, lastSeen: now },
      [wordB]: { halfLifeDays: 1, lastSeen: start },
      ...Object.fromEntries(rule.map((id) => [id, { halfLifeDays: 7, lastSeen: now }])),
    };
    const profile = buildProfile(course, memory, now);
    expect(profile.words).toEqual({ [wordA]: 'maitrise', [wordB]: 'fissure' });
    expect(profile.rules[lesson.id]).toBe('maitrise');
  });

  it('keeps sentences and grammar questions out of the words', () => {
    const sentence = itemsOfCourse(course).find((item) => item.type === 'sentence')!;
    const memory = {
      [sentence.id]: { halfLifeDays: 2, lastSeen: now },
      [rule[0]]: { halfLifeDays: 2, lastSeen: now },
    };
    expect(buildProfile(course, memory, now).words).toEqual({});
  });

  it('includes words from the bank', () => {
    const german = courseById('de');
    const bankWord = itemsOfCourse(german).find((item) => item.type === 'bank')!;
    const memory = { [bankWord.id]: { halfLifeDays: 2, lastSeen: now } };
    expect(buildProfile(german, memory, now).words).toEqual({ [bankWord.id]: 'en_cours' });
  });

  describe('a bank word doubling a word of the lessons', () => {
    const fresh = { halfLifeDays: 7, lastSeen: now };
    const faded = { halfLifeDays: 1, lastSeen: start };

    it.each(['tax', 'rent', 'shortage'])('%s takes the best state of its two entries', (word) => {
      const [bank, lessons] = [`en:b:${word}`, `en:${word}`];
      expect(itemsOfCourse(course).map((item) => item.id)).toContain(lessons);
      expect(buildProfile(course, { [bank]: faded, [lessons]: fresh }, now).words).toEqual({ [bank]: 'maitrise', [lessons]: 'maitrise' });
      expect(buildProfile(course, { [bank]: fresh, [lessons]: faded }, now).words).toEqual({ [bank]: 'maitrise', [lessons]: 'fissure' });
    });

    it('is known from the lessons alone', () => {
      expect(buildProfile(course, { 'en:tax': { halfLifeDays: 2, lastSeen: now } }, now).words['en:b:tax']).toBe('en_cours');
    });
  });

  it('reflects a review in the next profile', () => {
    const after = play([{ itemIds: [unseenWord], grade: 'again' }]);
    expect(buildProfile(course, after.memory, now).words[unseenWord]).toBe('en_cours');
  });
});
