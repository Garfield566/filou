import { describe, expect, it } from 'vitest';
import { courseById } from '../data/courses';
import { dailyRng, wordsBeforeReading, wordsToReview, type GlossaryWord, type LibraryIndex } from './library';
import { bankItems } from './wordBank';

// Bugs found in review, and the behaviour that fixes them.

const now = new Date(2026, 10, 7, 12).getTime();
const word = (key: string, rank = 9000): GlossaryWord => ({ key, lemma: key, pos: 'noun', rank, count: 1, sentence: `The ${key} is here today.`, fr: key, gender: null });

describe('words before reading (review)', () => {
  it('shows at least five words when the glossary has enough of them', () => {
    const keys = ['quay', 'wharf', 'jetty', 'cat', 'dog', 'house', 'tree', 'car'];
    const table: LibraryIndex = { lemmas: keys, ranks: [9000, 9000, 9000, 10, 20, 30, 40, 50], falseFriends: [], passages: [] };
    const before = wordsBeforeReading(keys.map((key, n) => word(key, table.ranks[n])), table, 1000, new Map());
    expect(before).toHaveLength(5);
    expect(before.slice(0, 3).map((item) => item.key)).toEqual(['quay', 'wharf', 'jetty']);
    // The rarest known words complete the list.
    expect(before.slice(3).map((item) => item.key)).toEqual(['car', 'tree']);
  });
});

describe('words sent to the reviews after a text (review)', () => {
  const german = courseById('de');
  const noun = bankItems(german).find((item) => item.target.startsWith('der '))!;
  const lemma = noun.target.slice(4);
  const fromText: GlossaryWord = { ...word(lemma.toLowerCase()), lemma, gender: null };

  it('starts the reviews of a course word that was never studied, without adding a copy', () => {
    const result = wordsToReview([fromText], 'de-1', german, {});
    expect(result.added).toEqual([]);
    expect(result.itemIds).toEqual([noun.id]);
  });

  it('leaves the memory of a word already studied alone', () => {
    const result = wordsToReview([fromText], 'de-1', german, { [noun.id]: { halfLifeDays: 3, lastSeen: now } });
    expect(result.itemIds).toEqual([]);
  });

  it('adds a word new to the course with its sentence, once', () => {
    const fresh = word('wharfage');
    const result = wordsToReview([fresh, fresh], 'en-1', courseById('en'), {});
    expect(result.added).toHaveLength(1);
    expect(result.added[0].context).toBe(fresh.sentence);
    expect(result.itemIds).toEqual(['en:b:wharfage']);
  });
});

describe('reading of the day (review)', () => {
  it('draws the same way all day, and differently another day', () => {
    const draw = (day: string) => Array.from({ length: 4 }, dailyRng('en', day));
    expect(draw('2026-11-07')).toEqual(draw('2026-11-07'));
    expect(draw('2026-11-07')).not.toEqual(draw('2026-11-08'));
  });
});
