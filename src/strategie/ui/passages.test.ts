import { describe, expect, it } from 'vitest';
import { letters } from '../content';
import type { GameText } from '../content/schemas';
import type { VisibleSegment } from '../types';
import { flagTarget, letterPassages } from './passages';
import { plainText } from './text';

const shownClear = (text: GameText): VisibleSegment[] => text.segments.map((segment) => ({ ...segment, display: 'clair' }));

describe('letterPassages', () => {
  it('loses no text in any letter', () => {
    for (const { text } of letters) {
      expect(letterPassages(text).map(plainText).join('')).toBe(plainText(text));
    }
  });

  it('cuts by sentence, so a clue does not show in the shape of the letter', () => {
    const text = letters.find((letter) => letter.id === 'lettre.perfide.soldats')!.text;
    const clue = text.segments.find((segment) => segment.clueId)!;
    const passage = letterPassages(text).find((candidate) => candidate.segments.some((segment) => segment.clueId))!;
    expect(plainText(passage)).toContain(clue.text);
    expect(plainText(passage).trim()).toMatch(/[.!?]$/);
  });

  it('cuts a letter without clue the same way', () => {
    const text = letters.find((letter) => letter.id === 'lettre.honnete.commerce')!.text;
    expect(text.segments).toHaveLength(1);
    expect(letterPassages(text).length).toBeGreaterThan(1);
  });
});

describe('flagTarget', () => {
  const text = letters.find((letter) => letter.id === 'lettre.perfide.soldats')!.text;
  const clueIndex = text.segments.findIndex((segment) => segment.clueId);
  const passages = letterPassages(text);
  const sentence = passages.find((passage) => passage.segments.some((segment) => segment.clueId))!;
  const other = passages.find((passage) => passage !== sentence)!;

  it('lands on the clue of the sentence', () => {
    expect(flagTarget(sentence, shownClear(text))).toBe(clueIndex);
  });

  it('lands elsewhere from a sentence without clue', () => {
    expect(flagTarget(other, shownClear(text))).not.toBe(clueIndex);
  });

  it('refuses a blotted clue', () => {
    const shown = shownClear(text);
    shown[clueIndex] = { ...shown[clueIndex], display: 'tache' };
    expect(flagTarget(sentence, shown)).toBeNull();
  });

  it('skips a blotted word in a sentence without clue', () => {
    const passage = { segments: [{ text: 'dark' }, { text: ' night.' }], sources: [0, 1] };
    expect(
      flagTarget(passage, [
        { text: 'dark', display: 'tache' },
        { text: ' night.', display: 'clair' },
      ]),
    ).toBe(1);
  });
});
