import type {
  DialogueLesson,
  DialogueLine,
  DialogueQuestion,
  GrammarLesson,
  GrammarQuestion,
  Level,
  Sentence,
  VocabLesson,
  Word,
} from '../types';

export const w = (target: string, fr: string, ...alt: string[]): Word => ({ target, fr, alt });

export const s = (target: string, fr: string, ...alt: string[]): Sentence => ({ target, fr, alt });

export const vocab = (id: string, title: string, words: Word[], sentences: Sentence[]): VocabLesson => ({
  kind: 'vocab',
  id,
  title,
  words,
  sentences,
});

export const line = (speaker: string, target: string, fr: string): DialogueLine => ({ speaker, target, fr });

export const q = (prompt: string, answer: string, ...wrong: string[]): DialogueQuestion => ({ prompt, answer, wrong });

export const dialogue = (
  id: string,
  title: string,
  context: string,
  lines: DialogueLine[],
  questions: DialogueQuestion[],
): DialogueLesson => ({ kind: 'dialogue', id, title, context, lines, questions });

export const grammar = (
  id: string,
  title: string,
  level: Level,
  content: Omit<GrammarLesson, 'kind' | 'id' | 'title' | 'level'>,
): GrammarLesson => ({ kind: 'grammar', id, title, level, ...content });

export const choose = (sentence: string, answer: string, wrong: string[], fr: string, why: string): GrammarQuestion => ({
  type: 'choose',
  sentence,
  answer,
  wrong,
  fr,
  why,
});

export const complete = (sentence: string, answers: string[], fr: string, why: string): GrammarQuestion => ({
  type: 'complete',
  sentence,
  answers,
  fr,
  why,
});

export const transform = (
  instruction: string,
  source: string,
  answers: string[],
  fr: string,
  why: string,
): GrammarQuestion => ({ type: 'transform', instruction, source, answers, fr, why });

export const order = (fr: string, answer: string, distractors: string[], why: string): GrammarQuestion => ({
  type: 'order',
  fr,
  answer,
  distractors,
  why,
});

export const spot = (answer: string, wrong: string[], why: string): GrammarQuestion => ({
  type: 'spot',
  answer,
  wrong,
  why,
});
