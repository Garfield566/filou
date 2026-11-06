export const MAX_HEARTS = 5;
export const HEART_REGEN_MS = 30 * 60 * 1000;
export const DAILY_GOAL_XP = 20;
export const LESSON_XP = 10;
export const PERFECT_BONUS_XP = 5;
export const REPLAY_XP = 5;

const STORAGE_KEY = 'filou.progress.v1';

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

export function loseHeart(progress: Progress, now: number): Progress {
  const current = refillHearts(progress, now);
  return { ...current, hearts: Math.max(0, current.hearts - 1) };
}

export function msUntilNextHeart(progress: Progress, now: number): number {
  if (progress.hearts >= MAX_HEARTS) return 0;
  return Math.max(0, progress.heartsUpdatedAt + HEART_REGEN_MS - now);
}

export function completeLesson(
  progress: Progress,
  lessonId: string,
  perfect: boolean,
  now: number,
): { progress: Progress; xpGained: number } {
  const alreadyDone = progress.completedLessons.includes(lessonId);
  const xpGained = alreadyDone ? REPLAY_XP : LESSON_XP + (perfect ? PERFECT_BONUS_XP : 0);
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
      completedLessons: alreadyDone
        ? progress.completedLessons
        : [...progress.completedLessons, lessonId],
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
