import { describe, expect, it } from 'vitest';
import type { VisibleSegment } from '../types';
import { inkParts, stableShuffle, visibleWordIds } from './text';

describe('inkParts', () => {
  it('gives each word a blot of its length and keeps the rest', () => {
    expect(inkParts('wheat')).toEqual([{ ink: 5 }]);
    expect(inkParts(' old mill, ')).toEqual([{ gap: ' ' }, { ink: 3 }, { gap: ' ' }, { ink: 4 }, { gap: ', ' }]);
  });
});

describe('visibleWordIds', () => {
  it('leaves out blotted words', () => {
    const segments: VisibleSegment[] = [
      { text: 'wheat', wordId: 'a', display: 'tache' },
      { text: 'wool', wordId: 'b', display: 'clair' },
      { text: 'wool', wordId: 'b', display: 'clair' },
      { text: 'and', display: 'clair' },
    ];
    expect(visibleWordIds(segments)).toEqual(['b']);
  });
});

describe('stableShuffle', () => {
  const items = ['a', 'b', 'c', 'd', 'e', 'f'];

  it('gives the same order for the same key, without losing anything', () => {
    expect(stableShuffle(items, 'k')).toEqual(stableShuffle(items, 'k'));
    expect([...stableShuffle(items, 'k')].sort()).toEqual(items);
  });

  it('moves the first answer for some keys', () => {
    const first = new Set(['1', '2', '3', '4', '5', '6', '7', '8'].map((key) => stableShuffle(items, key)[0]));
    expect(first.size).toBeGreaterThan(1);
  });
});
