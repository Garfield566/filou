import type { Exercise } from '../types';

export const choice = (prompt: string, answer: string, wrong: string[]): Exercise => ({
  kind: 'choice',
  prompt,
  answer,
  options: [answer, ...wrong],
});

export const arrange = (
  sentence: string,
  answer: string,
  distractors: string[],
  others: string[] = [],
): Exercise => ({
  kind: 'arrange',
  sentence,
  answers: [answer, ...others],
  distractors,
});

export const write = (sentence: string, ...answers: string[]): Exercise => ({
  kind: 'type',
  sentence,
  answers,
});

export const listen = (text: string): Exercise => ({ kind: 'listen', text, answers: [text] });

export const pairs = (...items: [string, string][]): Exercise => ({ kind: 'pairs', pairs: items });
