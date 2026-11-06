import { describe, expect, it } from 'vitest';
import {
  HEART_REGEN_MS,
  MAX_HEARTS,
  completeSession,
  initialProgress,
  recordAnswer,
  recordReview,
  refillHearts,
  visibleDailyXp,
  visibleStreak,
} from './progress';

const DAY = 24 * 60 * 60 * 1000;
const noon = new Date(2026, 2, 10, 12).getTime();

describe('streak', () => {
  it('starts at 1, grows on consecutive days, and counts one session per day', () => {
    let { progress } = completeSession(initialProgress(noon), 'a', true, noon);
    expect(progress.streak).toBe(1);
    ({ progress } = completeSession(progress, 'b', true, noon + 1000));
    expect(progress.streak).toBe(1);
    ({ progress } = completeSession(progress, null, true, noon + DAY));
    expect(progress.streak).toBe(2);
  });

  it('resets after a missed day', () => {
    const first = completeSession(initialProgress(noon), 'a', true, noon).progress;
    expect(visibleStreak(first, noon + DAY)).toBe(1);
    expect(visibleStreak(first, noon + 2 * DAY)).toBe(0);
    expect(completeSession(first, 'b', true, noon + 2 * DAY).progress.streak).toBe(1);
  });
});

describe('xp', () => {
  it('rewards a perfect first run, and pays less for replays', () => {
    const first = completeSession(initialProgress(noon), 'a', true, noon);
    expect(first.xpGained).toBe(15);
    expect(completeSession(first.progress, 'a', true, noon).xpGained).toBe(5);
    expect(completeSession(initialProgress(noon), 'a', false, noon).xpGained).toBe(10);
  });

  it('pays for a review without marking any lesson complete', () => {
    const review = completeSession(initialProgress(noon), null, true, noon);
    expect(review.xpGained).toBe(10);
    expect(review.progress.completedLessons).toEqual([]);
  });

  it('resets the daily goal on a new day', () => {
    const { progress } = completeSession(initialProgress(noon), 'a', true, noon);
    expect(visibleDailyXp(progress, noon)).toBe(15);
    expect(visibleDailyXp(progress, noon + DAY)).toBe(0);
  });
});

describe('answers', () => {
  it('costs a heart and records every item only on a mistake', () => {
    const wrong = recordAnswer({ ...initialProgress(noon), testMode: false }, ['a', 'b'], false, noon);
    expect(wrong.hearts).toBe(MAX_HEARTS - 1);
    expect(Object.keys(wrong.memory)).toEqual(['a', 'b']);
    expect(recordAnswer(initialProgress(noon), ['a'], true, noon).hearts).toBe(MAX_HEARTS);
  });

  it('opens everything by default, so the whole course can be tried', () => {
    expect(initialProgress(noon).testMode).toBe(true);
  });

  it('keeps every heart in test mode', () => {
    const progress = { ...initialProgress(noon), testMode: true };
    expect(recordAnswer(progress, ['a'], false, noon).hearts).toBe(MAX_HEARTS);
  });

  it('never goes below zero hearts', () => {
    const progress = { ...initialProgress(noon), hearts: 0, testMode: false };
    expect(recordAnswer(progress, ['a'], false, noon).hearts).toBe(0);
  });

  it('refills hearts over time and keeps partial progress toward the next one', () => {
    const empty = { ...initialProgress(noon), hearts: 0 };
    const later = refillHearts(empty, noon + 2.5 * HEART_REGEN_MS);
    expect(later.hearts).toBe(2);
    expect(later.heartsUpdatedAt).toBe(noon + 2 * HEART_REGEN_MS);
    expect(refillHearts(empty, noon + 100 * HEART_REGEN_MS).hearts).toBe(MAX_HEARTS);
  });
});

describe('game reviews', () => {
  const seen = { a: { halfLifeDays: 4, lastSeen: noon } };
  const later = noon + 8 * DAY;

  it('applies each grade to the half-life', () => {
    const progress = { ...initialProgress(noon), memory: seen };
    expect(recordReview(progress, ['a'], 'good', later).memory.a).toEqual({ halfLifeDays: 8, lastSeen: later });
    expect(recordReview(progress, ['a'], 'hard', later).memory.a).toEqual({ halfLifeDays: 4, lastSeen: later });
    expect(recordReview(progress, ['a'], 'again', later).memory.a).toEqual({ halfLifeDays: 2, lastSeen: later });
  });

  it('creates the items it has never seen', () => {
    const progress = initialProgress(noon);
    expect(recordReview(progress, ['a'], 'good', noon).memory.a.halfLifeDays).toBe(0.5);
    expect(recordReview(progress, ['a'], 'hard', noon).memory.a.halfLifeDays).toBe(0.5);
    expect(recordReview(progress, ['a'], 'again', noon).memory.a.halfLifeDays).toBe(0.25);
  });

  it('counts an item listed twice as one review', () => {
    const progress = { ...initialProgress(noon), memory: seen };
    expect(recordReview(progress, ['a', 'a'], 'again', later).memory.a.halfLifeDays).toBe(2);
  });

  it('changes nothing but memory, even on a failure outside test mode', () => {
    const progress = { ...initialProgress(noon), hearts: 2, testMode: false };
    const { memory, ...rest } = recordReview(progress, ['a'], 'again', noon + 4 * HEART_REGEN_MS);
    const { memory: before, ...expected } = progress;
    expect(rest).toEqual(expected);
    expect(Object.keys(memory)).toEqual(['a']);
    expect(before).toEqual({});
  });

  it('leaves the original progress untouched', () => {
    const progress = { ...initialProgress(noon), memory: seen };
    recordReview(progress, ['a', 'b'], 'again', later);
    expect(progress.memory).toEqual({ a: { halfLifeDays: 4, lastSeen: noon } });
  });
});
