import type { BankWord } from '../types';
import { remember, rememberHard, type Memory } from './memory';

export const MAX_HEARTS = 5;
export const HEART_REGEN_MS = 30 * 60 * 1000;
export const DAILY_GOAL_XP = 20;
export const LESSON_XP = 10;
export const PERFECT_BONUS_XP = 5;
export const REPLAY_XP = 5;
export const REVIEW_XP = 10;

const STORAGE_KEY = 'filou.progress.v2';

export interface Progress {
  xp: number;
  hearts: number;
  heartsUpdatedAt: number;
  streak: number;
  lastActiveDay: string | null;
  dailyXp: number;
  dailyXpDay: string | null;
  completedLessons: string[];
  activeCourse: string;
  memory: Memory;
  /** Opens every lesson and removes the hearts limit, to try the whole course. */
  testMode: boolean;
  /** Bank sentences the learner reported as bad, never shown again. */
  hiddenSentences: string[];
  /** Estimated vocabulary size per course, from the level test: more frequent words count as known. */
  vocabularyRank: Record<string, number>;
  /** Words met in a text, per course. They join the bank, so the usual reviews apply to them. */
  readingWords: Record<string, BankWord[]>;
  readings: Reading[];
}

/** One finished text. */
export interface Reading {
  passageId: string;
  courseId: string;
  level: string;
  theme: string;
  words: number;
  /** Time spent on the text itself, without the words before or the questions after. */
  readingMs: number;
  correct: number;
  questions: number;
  finishedAt: number;
}

export function initialProgress(now: number): Progress {
  return {
    xp: 0,
    hearts: MAX_HEARTS,
    heartsUpdatedAt: now,
    streak: 0,
    lastActiveDay: null,
    dailyXp: 0,
    dailyXpDay: null,
    completedLessons: [],
    activeCourse: 'en',
    memory: {},
    testMode: true,
    hiddenSentences: [],
    vocabularyRank: {},
    readingWords: {},
    readings: [],
  };
}

/** Local calendar day: a streak follows the learner's day, not UTC. */
export function dayKey(time: number): string {
  const d = new Date(time);
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${month}-${day}`;
}

function previousDayKey(time: number): string {
  const d = new Date(time);
  d.setDate(d.getDate() - 1);
  return dayKey(d.getTime());
}

export function refillHearts(progress: Progress, now: number): Progress {
  if (progress.hearts >= MAX_HEARTS) {
    return progress.heartsUpdatedAt === now ? progress : { ...progress, heartsUpdatedAt: now };
  }
  const gained = Math.floor((now - progress.heartsUpdatedAt) / HEART_REGEN_MS);
  if (gained <= 0) return progress;
  const hearts = Math.min(MAX_HEARTS, progress.hearts + gained);
  return {
    ...progress,
    hearts,
    heartsUpdatedAt: hearts === MAX_HEARTS ? now : progress.heartsUpdatedAt + gained * HEART_REGEN_MS,
  };
}

export function msUntilNextHeart(progress: Progress, now: number): number {
  if (progress.hearts >= MAX_HEARTS) return 0;
  return Math.max(0, progress.heartsUpdatedAt + HEART_REGEN_MS - now);
}

export function recordAnswer(progress: Progress, itemIds: string[], correct: boolean, now: number): Progress {
  const current = correct ? progress : refillHearts(progress, now);
  const memory = { ...current.memory };
  for (const id of itemIds) memory[id] = remember(memory[id], correct, now);
  return {
    ...current,
    memory,
    hearts: correct || current.testMode ? current.hearts : Math.max(0, current.hearts - 1),
  };
}

export type ReviewGrade = 'good' | 'hard' | 'again';

/** A review from outside the lessons, such as the strategy game: it only ever touches memory, never hearts. */
export function recordReview(progress: Progress, itemIds: string[], grade: ReviewGrade, now: number): Progress {
  const memory = { ...progress.memory };
  for (const id of new Set(itemIds)) {
    memory[id] = grade === 'hard' ? rememberHard(memory[id], now) : remember(memory[id], grade === 'good', now);
  }
  return { ...progress, memory };
}

export function completeSession(
  progress: Progress,
  lessonId: string | null,
  perfect: boolean,
  now: number,
): { progress: Progress; xpGained: number } {
  const alreadyDone = lessonId !== null && progress.completedLessons.includes(lessonId);
  let xpGained = REVIEW_XP;
  if (lessonId !== null) xpGained = alreadyDone ? REPLAY_XP : LESSON_XP + (perfect ? PERFECT_BONUS_XP : 0);
  const today = dayKey(now);

  let streak = progress.streak;
  if (progress.lastActiveDay !== today) {
    streak = progress.lastActiveDay === previousDayKey(now) ? streak + 1 : 1;
  }

  return {
    xpGained,
    progress: {
      ...progress,
      xp: progress.xp + xpGained,
      streak,
      lastActiveDay: today,
      dailyXp: visibleDailyXp(progress, now) + xpGained,
      dailyXpDay: today,
      completedLessons:
        lessonId === null || alreadyDone ? progress.completedLessons : [...progress.completedLessons, lessonId],
    },
  };
}

/** A streak is only broken once a whole day has passed, so it survives until tonight. */
export function visibleStreak(progress: Progress, now: number): number {
  const { lastActiveDay } = progress;
  return lastActiveDay === dayKey(now) || lastActiveDay === previousDayKey(now) ? progress.streak : 0;
}

export function visibleDailyXp(progress: Progress, now: number): number {
  return progress.dailyXpDay === dayKey(now) ? progress.dailyXp : 0;
}

export function loadProgress(now: number): Progress {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return { ...initialProgress(now), ...(JSON.parse(saved) as Partial<Progress>) };
  } catch {
    // Blocked or corrupted storage: start fresh rather than refuse to run.
  }
  return initialProgress(now);
}

export function saveProgress(progress: Progress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // Without storage, progress simply lasts for this visit.
  }
}
