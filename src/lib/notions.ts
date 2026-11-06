import { isDue, type ItemMemory, type Memory } from './memory';

/** What the learner's tables show for a word or a rule. */
export type NodeState = 'grise' | 'en_cours' | 'maitrise' | 'fissure';

/** Same threshold as the "strong" exercises of the lessons (`STRONG_HALF_LIFE`). */
const MASTERED_HALF_LIFE = 7;

/** State of one word or one grammar question. Fading comes first: a strong memory can still run out. */
export function notionState(item: ItemMemory | undefined, now: number): NodeState {
  if (!item) return 'grise';
  if (isDue(item, now)) return 'fissure';
  return item.halfLifeDays >= MASTERED_HALF_LIFE ? 'maitrise' : 'en_cours';
}

/**
 * State of a grammar rule, from the ids of its lesson's questions. Only questions already seen count:
 * - none seen: `grise`;
 * - strictly more than half of those seen are due: `fissure`, checked before mastery as for a word,
 *   so a rule whose strong questions have all expired does not read as mastered;
 * - all of those seen have a half-life of at least 7 days: `maitrise`, even if the rest is still unseen;
 * - anything else, including exactly half due: `en_cours`.
 * `grammarMastery()` is not enough here: it cannot tell an unseen question from a fading one.
 */
export function ruleState(questionIds: string[], memory: Memory, now: number): NodeState {
  const seen = questionIds.flatMap((id) => memory[id] ?? []);
  if (seen.length === 0) return 'grise';
  const due = seen.filter((item) => isDue(item, now)).length;
  if (due * 2 > seen.length) return 'fissure';
  return seen.every((item) => item.halfLifeDays >= MASTERED_HALF_LIFE) ? 'maitrise' : 'en_cours';
}
