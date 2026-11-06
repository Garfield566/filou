import { describe, expect, it } from 'vitest';
import { isCorrect, normalize } from './grade';
import type { Exercise } from '../types';

const exercise: Exercise = { kind: 'type', sentence: 'Je suis perdu.', answers: ['I am lost', "I'm lost"] };

describe('grading', () => {
  it('ignores case, punctuation, spacing and curly apostrophes', () => {
    expect(isCorrect(exercise, '  i  AM lost!')).toBe(true);
    expect(isCorrect(exercise, 'I’m lost.')).toBe(true);
  });

  it('rejects wrong and empty answers', () => {
    expect(isCorrect(exercise, 'I am last')).toBe(false);
    expect(isCorrect(exercise, '   ')).toBe(false);
  });

  it('removes accents', () => {
    expect(normalize('Léa')).toBe('lea');
  });

  it('accepts German spelled without umlauts or ß, which French keyboards lack', () => {
    expect(normalize('Für')).toBe('fur');
    expect(normalize('Ich heiße Tom')).toBe(normalize('ich heisse tom'));
  });
});
