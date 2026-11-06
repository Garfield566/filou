import { describe, expect, it } from 'vitest';
import { rules } from '../core/testRules';
import { letterSchema, type LetterTemplate } from './schemas';

const [letter] = rules.letters;
const issuesOf = (candidate: LetterTemplate) => letterSchema.safeParse(candidate).error?.issues.map((issue) => issue.message) ?? [];

describe('letterSchema', () => {
  it('accepts a letter whose clues and segments match', () => {
    expect(issuesOf(letter)).toEqual([]);
  });

  it('refuses a segment pointing at a clue the letter does not list', () => {
    expect(issuesOf({ ...letter, clues: [] })).toEqual(['Indice inconnu dans un segment : indice.would']);
  });

  it('refuses a clue no segment carries', () => {
    const silent = { ...letter.clues[0], id: 'indice.muet' };
    expect(issuesOf({ ...letter, clues: [...letter.clues, silent] })).toEqual(['Indice porté par aucun segment : indice.muet']);
  });
});
