import { describe, expect, it } from 'vitest';
import { courseById } from '../data/courses';
import type { Exercise } from '../types';
import { audioFile } from './audioFile';
import { grade, tokenize } from './grade';
import type { Memory } from './memory';
import { buildReview, dueItems } from './session';
import { bankExercise, bankItems, buildBankSession, learnedBankWords } from './wordBank';

const german = courseById('de');
const now = new Date(2026, 2, 10, 12).getTime();
const DAY = 24 * 60 * 60 * 1000;

function expectSolvable(step: Exercise) {
  if (step.kind === 'choice') {
    expect(step.options).toContain(step.answer);
    expect(new Set(step.options).size).toBe(step.options.length);
    expect(step.options.length).toBeGreaterThanOrEqual(3);
  }
  if (step.kind === 'arrange') {
    for (const word of tokenize(step.answers[0])) expect(step.bank).toContain(word);
    expect(grade(step.answers, tokenize(step.answers[0]).join(' '))).toBe('correct');
  }
}

describe('word bank content', () => {
  const items = bankItems(german);

  it('holds 1,000 words, each with a meaning and at least three sentences', () => {
    expect(items).toHaveLength(1000);
    for (const item of items) {
      expect(item.fr, item.target).not.toBe('');
      expect(item.word!.sentences.length, item.target).toBeGreaterThanOrEqual(3);
    }
  });

  it('never repeats a word', () => {
    const names = items.map((item) => item.target);
    expect(new Set(names).size).toBe(names.length);
  });

  it('shows nouns with their article', () => {
    const nouns = items.filter((item) => item.word!.pos === 'noun');
    expect(nouns.length).toBeGreaterThan(300);
    expect(nouns.filter((item) => !/^(der|die|das) /.test(item.target))).toEqual([]);
  });

  it('gives every text its own audio file', () => {
    const texts = new Set(items.flatMap((item) => [item.target, ...item.word!.sentences.map((s) => s.de)]));
    expect(new Set([...texts].map(audioFile)).size).toBe(texts.size);
  });

  it('is empty for English until a bank exists', () => {
    expect(bankItems(courseById('en'))).toEqual([]);
  });
});

describe('word bank sessions', () => {
  it('introduces the next five words in rank order, then tests them', () => {
    const steps = buildBankSession(german, {}, new Set(), now);
    const intros = steps.flatMap((step) => (step.kind === 'intro' ? [step.item.id] : []));
    expect(intros).toEqual(bankItems(german).slice(0, 5).map((item) => item.id));
    expect(steps[0].kind).toBe('intro');
    steps.forEach(expectSolvable);
  });

  it('moves on to new words once earlier ones are seen', () => {
    const first = bankItems(german).slice(0, 5);
    const memory: Memory = Object.fromEntries(first.map((item) => [item.id, { halfLifeDays: 5, lastSeen: now }]));
    const steps = buildBankSession(german, memory, new Set(), now);
    const intro = steps.find((step) => step.kind === 'intro');
    expect(intro?.kind === 'intro' && intro.item.id).toBe(bankItems(german)[5].id);
    expect(learnedBankWords(german, memory)).toBe(5);
  });

  it('mixes in fading words', () => {
    const item = bankItems(german)[0];
    const memory: Memory = { [item.id]: { halfLifeDays: 1, lastSeen: now - 5 * DAY } };
    const steps = buildBankSession(german, memory, new Set(), now);
    expect(steps.at(-1)).toMatchObject({ itemIds: [item.id] });
  });

  it('never shows a sentence the learner rejected', () => {
    const item = bankItems(german)[0];
    const memory: Memory = { [item.id]: { halfLifeDays: 3, lastSeen: now } };
    const hidden = new Set(item.word!.sentences.slice(1).map((sentence) => sentence.id));
    for (let i = 0; i < 40; i++) {
      const step = bankExercise(german, item, memory, hidden);
      if ('sentenceId' in step && step.sentenceId) expect(step.sentenceId).toBe(item.word!.sentences[0].id);
    }
  });

  it('still works once every sentence of a word is rejected', () => {
    const item = bankItems(german)[0];
    const hidden = new Set(item.word!.sentences.map((sentence) => sentence.id));
    for (const halfLifeDays of [0.5, 3, 30]) {
      const step = bankExercise(german, item, { [item.id]: { halfLifeDays, lastSeen: now } }, hidden);
      expect('sentenceId' in step && step.sentenceId).toBeFalsy();
    }
  });

  it('raises difficulty with memory and stays solvable', () => {
    for (const item of bankItems(german).slice(0, 80)) {
      for (const halfLifeDays of [0.5, 3, 30]) {
        expectSolvable(bankExercise(german, item, { [item.id]: { halfLifeDays, lastSeen: now } }, new Set()));
      }
    }
  });

  it('feeds studied words into the main reviews', () => {
    const item = bankItems(german)[0];
    const memory: Memory = { [item.id]: { halfLifeDays: 1, lastSeen: now - 5 * DAY } };
    expect(dueItems(german, memory, now).map((due) => due.id)).toEqual([item.id]);
    expect(buildReview(german, memory, now, Math.random, new Set())).toHaveLength(1);
  });
});
