import { describe, expect, it } from 'vitest';
import {
  HEART_REGEN_MS,
  MAX_HEARTS,
  completeLesson,
  initialProgress,
  loseHeart,
  refillHearts,
  visibleDailyXp,
  visibleStreak,
} from './progress';

const DAY = 24 * 60 * 60 * 1000;
const noon = new Date(2026, 2, 10, 12).getTime();

describe('streak', () => {
  it('starts at 1, grows on consecutive days, and counts one lesson per day', () => {
    let { progress } = completeLesson(initialProgress(noon), 'a', true, noon);
    expect(progress.streak).toBe(1);
    ({ progress } = completeLesson(progress, 'b', true, noon + 1000));
    expect(progress.streak).toBe(1);
    ({ progress } = completeLesson(progress, 'c', true, noon + DAY));
    expect(progress.streak).toBe(2);
  });

  it('resets after a missed day', () => {
    const first = completeLesson(initialProgress(noon), 'a', true, noon).progress;
    expect(visibleStreak(first, noon + DAY)).toBe(1);
    expect(visibleStreak(first, noon + 2 * DAY)).toBe(0);
    expect(completeLesson(first, 'b', true, noon + 2 * DAY).progress.streak).toBe(1);
  });
});

describe('xp', () => {
  it('rewards a perfect first run and pays less for replays', () => {
    const first = completeLesson(initialProgress(noon), 'a', true, noon);
    expect(first.xpGained).toBe(15);
    expect(completeLesson(first.progress, 'a', true, noon).xpGained).toBe(5);
    expect(completeLesson(initialProgress(noon), 'a', false, noon).xpGained).toBe(10);
  });

  it('resets the daily goal on a new day', () => {
    const { progress } = completeLesson(initialProgress(noon), 'a', true, noon);
    expect(visibleDailyXp(progress, noon)).toBe(15);
    expect(visibleDailyXp(progress, noon + DAY)).toBe(0);
  });
});

describe('hearts', () => {
  it('never goes below zero', () => {
    let progress = { ...initialProgress(noon), hearts: 1 };
    progress = loseHeart(loseHeart(progress, noon), noon);
    expect(progress.hearts).toBe(0);
  });

  it('refills over time and keeps partial progress toward the next heart', () => {
    const empty = { ...initialProgress(noon), hearts: 0 };
    const later = refillHearts(empty, noon + 2.5 * HEART_REGEN_MS);
    expect(later.hearts).toBe(2);
    expect(later.heartsUpdatedAt).toBe(noon + 2 * HEART_REGEN_MS);
    expect(refillHearts(empty, noon + 100 * HEART_REGEN_MS).hearts).toBe(MAX_HEARTS);
  });
});
