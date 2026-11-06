import type { Rng } from '../../lib/random';

/**
 * Mulberry32: the whole generator fits in one number, so the state can live in
 * `GameState` and a save needs nothing else.
 */
export function next(state: number): [value: number, nextState: number] {
  const advanced = (state + 0x6d2b79f5) | 0;
  let t = Math.imul(advanced ^ (advanced >>> 15), 1 | advanced);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return [((t ^ (t >>> 14)) >>> 0) / 4294967296, advanced >>> 0];
}

export interface RngCursor {
  /** For `shuffle` and simplex-noise, which expect a plain function. */
  rng: Rng;
  /** Where the generator stands: write this back into the state afterwards. */
  state: () => number;
}

export function cursor(start: number): RngCursor {
  let current = start >>> 0;
  return {
    rng: () => {
      const [value, advanced] = next(current);
      current = advanced;
      return value;
    },
    state: () => current,
  };
}

export function pick<T>(items: readonly T[], rng: Rng): T {
  return items[Math.floor(rng() * items.length)];
}
