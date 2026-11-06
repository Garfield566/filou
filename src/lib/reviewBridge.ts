import { lessonsOf } from '../data/courses';
import type { Course, GrammarLesson, Item } from '../types';
import type { Memory } from './memory';
import { notionState, ruleState, type NodeState } from './notions';
import { recordReview, type Progress, type ReviewGrade } from './progress';
import { itemsOfCourse } from './session';

/** The state of everything the learner has met, read from the review engine. */
export interface LearnerProfile {
  /** Words already met, by item id. */
  words: Record<string, NodeState>;
  /** Grammar lessons of the course, by lesson id. */
  rules: Record<string, NodeState>;
}

/** Something practised outside a lesson, such as a reading question. */
export interface ReviewEvent {
  itemIds: string[];
  grade: ReviewGrade;
}

const questionIds = (items: Item[], lesson: GrammarLesson): string[] =>
  items.filter((item) => item.question && lesson.questions.includes(item.question)).map((item) => item.id);

/** Item ids of a grammar lesson's questions; empty if the id is not a grammar lesson of this course. */
export function ruleItemIds(course: Course, lessonId: string): string[] {
  const lesson = lessonsOf(course).find((candidate) => candidate.id === lessonId);
  return lesson?.kind === 'grammar' ? questionIds(itemsOfCourse(course), lesson) : [];
}

const STATES_BY_STRENGTH: readonly NodeState[] = ['maitrise', 'en_cours', 'fissure', 'grise'];

/** A bank word can double a word of the lessons: `en:b:tax` and `en:tax` are one word for the learner. */
function bestState(...states: Array<NodeState | undefined>): NodeState | undefined {
  return STATES_BY_STRENGTH.find((state) => states.includes(state));
}

export function buildProfile(course: Course, memory: Memory, now: number): LearnerProfile {
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
  return { words, rules };
}

/** The memory has no entry for a lesson: a grammar lesson id stands for its questions. */
function reviewedIds(course: Course, ids: string[]): string[] {
  return ids.flatMap((id) => {
    const questions = ruleItemIds(course, id);
    return questions.length > 0 ? questions : [id];
  });
}

/** Records each event as a real review, with its own grade and without touching the hearts. */
export function applyReviewEvents(course: Course, progress: Progress, events: ReviewEvent[], now: number): Progress {
  return events.reduce((current, event) => recordReview(current, reviewedIds(course, event.itemIds), event.grade, now), progress);
}
