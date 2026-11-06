import { describe, expect, it } from 'vitest';
import { isDue, recall, remember } from './memory';

const DAY = 24 * 60 * 60 * 1000;

describe('memory', () => {
  it('halves recall after one half-life', () => {
    expect(recall({ halfLifeDays: 2, lastSeen: 0 }, 2 * DAY)).toBeCloseTo(0.5);
  });

  it('strengthens more after a long gap than right away', () => {
    const item = { halfLifeDays: 4, lastSeen: 0 };
    expect(remember(item, true, 8 * DAY).halfLifeDays).toBe(8);
    expect(remember(item, true, 1000).halfLifeDays).toBeLessThan(5.1);
  });

  it('weakens an item on a mistake, down to a floor', () => {
    expect(remember({ halfLifeDays: 4, lastSeen: 0 }, false, DAY).halfLifeDays).toBe(2);
    expect(remember({ halfLifeDays: 0.25, lastSeen: 0 }, false, DAY).halfLifeDays).toBe(0.25);
  });

  it('marks an item due once recall drops below one half', () => {
    const item = remember(undefined, true, 0);
    expect(isDue(item, DAY / 4)).toBe(false);
    expect(isDue(item, DAY)).toBe(true);
  });
});
