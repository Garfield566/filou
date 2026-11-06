import type { LanguageEvent, LanguageProfile, NodeState, ReviewGrade } from '../types';

export interface TouchedNotion extends Record<ReviewGrade, number> {
  /** State when the game first touched it, to tell what moved. */
  before: NodeState;
}

export type Touched = Record<string, TouchedNotion>;

export function notionState(profile: LanguageProfile, id: string): NodeState {
  return profile.rules[id] ?? profile.words[id] ?? 'grise';
}

export function trackEvents(touched: Touched, events: LanguageEvent[], profile: LanguageProfile): Touched {
  const next = { ...touched };
  for (const event of events) {
    for (const id of new Set(event.itemIds)) {
      const notion = next[id] ?? { before: notionState(profile, id), good: 0, hard: 0, again: 0 };
      next[id] = { ...notion, [event.grade]: notion[event.grade] + 1 };
    }
  }
  return next;
}
