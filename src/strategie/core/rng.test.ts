import { describe, expect, it } from 'vitest';
import { shuffle } from '../../lib/random';
import { cursor, next } from './rng';

describe('rng', () => {
  it('gives the same value and state from the same state', () => {
    expect(next(42)).toEqual(next(42));
  });

  it('stays between 0 and 1, with an integer state', () => {
    let state = 1;
    for (let i = 0; i < 1000; i++) {
      const [value, advanced] = next(state);
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThan(1);
      expect(Number.isInteger(advanced)).toBe(true);
      expect(advanced).toBeGreaterThanOrEqual(0);
      state = advanced;
    }
  });

  it('spreads values evenly enough', () => {
    let state = 7;
    let sum = 0;
    for (let i = 0; i < 10000; i++) {
      const [value, advanced] = next(state);
      sum += value;
      state = advanced;
    }
    expect(sum / 10000).toBeCloseTo(0.5, 1);
  });

  it('keeps the cursor in step with next', () => {
    const { rng, state } = cursor(99);
    const first = rng();
    const second = rng();
    const [expectedFirst, afterFirst] = next(99);
    const [expectedSecond, afterSecond] = next(afterFirst);
    expect([first, second]).toEqual([expectedFirst, expectedSecond]);
    expect(state()).toBe(afterSecond);
  });

  it('feeds the shared shuffle reproducibly', () => {
    const items = [1, 2, 3, 4, 5, 6, 7, 8];
    expect(shuffle(items, cursor(5).rng)).toEqual(shuffle(items, cursor(5).rng));
    expect(shuffle(items, cursor(5).rng)).not.toEqual(items);
  });
});
