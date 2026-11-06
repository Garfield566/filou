/**
 * Half-life model of memory: an item's estimated recall halves every `halfLifeDays`.
 * Succeeding after a long gap strengthens memory more than succeeding right away.
 */
export interface ItemMemory {
  halfLifeDays: number;
  lastSeen: number;
}

export type Memory = Record<string, ItemMemory>;

const DAY_MS = 24 * 60 * 60 * 1000;
const INITIAL_HALF_LIFE = 0.5;
const MIN_HALF_LIFE = 0.25;
const MAX_HALF_LIFE = 180;
export const DUE_RECALL = 0.5;

export function recall(item: ItemMemory, now: number): number {
  const elapsedDays = Math.max(0, now - item.lastSeen) / DAY_MS;
  return 2 ** (-elapsedDays / item.halfLifeDays);
}

export function remember(previous: ItemMemory | undefined, correct: boolean, now: number): ItemMemory {
  if (!previous) {
    return { halfLifeDays: correct ? INITIAL_HALF_LIFE : MIN_HALF_LIFE, lastSeen: now };
  }
  const elapsedDays = Math.max(0, now - previous.lastSeen) / DAY_MS;
  const growth = 1.25 + 0.75 * Math.min(1, elapsedDays / previous.halfLifeDays);
  const halfLifeDays = correct
    ? Math.min(MAX_HALF_LIFE, previous.halfLifeDays * growth)
    : Math.max(MIN_HALF_LIFE, previous.halfLifeDays / 2);
  return { halfLifeDays, lastSeen: now };
}

export function isDue(item: ItemMemory, now: number): boolean {
  return recall(item, now) < DUE_RECALL;
}
