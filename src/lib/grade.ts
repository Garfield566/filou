import type { Exercise } from '../types';

/** Ignores case, accents, punctuation and extra spaces, which are not what a learner is tested on. */
export function normalize(text: string): string {
  return text
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .replace(/[’‘]/g, "'")
    .toLowerCase()
    .replace(/ß/g, 'ss')
    .replace(/[.,!?;:"«»]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function acceptedAnswers(exercise: Exercise): string[] {
  switch (exercise.kind) {
    case 'choice':
      return [exercise.answer];
    case 'pairs':
      return [];
    default:
      return exercise.answers;
  }
}

export function isCorrect(exercise: Exercise, draft: string): boolean {
  const given = normalize(draft);
  return given !== '' && acceptedAnswers(exercise).some((answer) => normalize(answer) === given);
}

export function shuffle<T>(items: readonly T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
