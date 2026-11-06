import { lessonsOf } from '../../data/courses';
import type { Memory } from '../../lib/memory';
import { recordReview, type Progress } from '../../lib/progress';
import { itemsOfCourse } from '../../lib/session';
import type { Course, GrammarLesson, Item } from '../../types';
import { applyAction } from '../core/game';
import type { GameRules, GameState, LanguageEvent, LanguageProfile, NodeState } from '../types';
import { notionState, ruleState } from './nodes';

const questionIds = (items: Item[], lesson: GrammarLesson): string[] =>
  items.filter((item) => item.question && lesson.questions.includes(item.question)).map((item) => item.id);

/** Item ids of a grammar lesson's questions; empty if the id is not a grammar lesson of this course. */
export function ruleItemIds(course: Course, lessonId: string): string[] {
  const lesson = lessonsOf(course).find((candidate) => candidate.id === lessonId);
  return lesson?.kind === 'grammar' ? questionIds(itemsOfCourse(course), lesson) : [];
}

const STATES_BY_STRENGTH: readonly NodeState[] = ['maitrise', 'en_cours', 'fissure', 'grise'];

/** A game word can double a word of the lessons: `en:b:tax` and `en:tax` are one word for the learner. */
function bestState(...states: Array<NodeState | undefined>): NodeState | undefined {
  return STATES_BY_STRENGTH.find((state) => states.includes(state));
}

/** Snapshot of the learner for the core. Phase 1 is English only, as `LanguageProfile.language` says. */
export function buildProfile(course: Course, memory: Memory, now: number): LanguageProfile {
  const items = itemsOfCourse(course);
  const words: Record<string, NodeState> = {};
  for (const item of items) {
    if ((item.type === 'word' || item.type === 'bank') && memory[item.id]) {
      words[item.id] = notionState(memory[item.id], now);
    }
  }
  for (const item of items) {
    if (item.type !== 'bank') continue;
    const best = bestState(words[item.id], words[`${course.id}:${item.target}`]);
    if (best) words[item.id] = best;
  }
  const rules: Record<string, NodeState> = {};
  for (const lesson of lessonsOf(course)) {
    if (lesson.kind === 'grammar') rules[lesson.id] = ruleState(questionIds(items, lesson), memory, now);
  }
  return { language: 'en', words, rules };
}

/** The memory has no entry for a lesson: a grammar lesson id stands for its questions. */
function reviewedIds(course: Course, ids: string[]): string[] {
  return ids.flatMap((id) => {
    const questions = ruleItemIds(course, id);
    return questions.length > 0 ? questions : [id];
  });
}

/** Sends the game's events to Filou's review tables, each with its own grade. */
export function applyLanguageEvents(course: Course, progress: Progress, events: LanguageEvent[], now: number): Progress {
  return events.reduce((current, event) => recordReview(current, reviewedIds(course, event.itemIds), event.grade, now), progress);
}

/** Sends what the game is holding and takes it off the state, so a later call cannot send it again. */
export function sendLanguageEvents(
  course: Course,
  progress: Progress,
  state: GameState,
  rules: GameRules,
  now: number,
): { progress: Progress; state: GameState } {
  const events = state.languageEvents;
  return {
    progress: applyLanguageEvents(course, progress, events, now),
    state: applyAction(state, { type: 'ackLanguageEvents', count: events.length }, rules),
  };
}
