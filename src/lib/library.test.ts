import { describe, expect, it } from 'vitest';
import { courseById } from '../data/courses';
import type { Course } from '../types';
import {
  dailyReading,
  estimateRank,
  isKnown,
  knownShare,
  readingStats,
  readingWord,
  reviewedWords,
  withReadingWords,
  wordsBeforeReading,
  type GlossaryWord,
  type LibraryIndex,
  type PassageMeta,
  type RankTestItem,
} from './library';
import type { Reading } from './progress';
import { dueItems } from './session';
import { bankExercise, bankItems, buildBankSession } from './wordBank';

const now = new Date(2026, 10, 7, 12).getTime();
const DAY = 24 * 60 * 60 * 1000;

const index: LibraryIndex = {
  lemmas: ['the', 'house', 'actual', 'rare'],
  ranks: [1, 900, 950, 20000],
  falseFriends: [2],
  passages: [],
};

function passage(id: string, theme: string, lemmas: number[] = [0, 90, 1, 10]): PassageMeta {
  return { id, theme, lemmas, title: id, author: 'A', work: 'W', url: 'u', license: 'CC0', retrieved: '2026-11-07', level: 'B1', words: 500, source: 's' };
}

const reading = (passageId: string, theme: string): Reading => ({
  passageId,
  theme,
  courseId: 'en',
  level: 'B1',
  words: 100,
  readingMs: 60000,
  correct: 1,
  questions: 3,
  finishedAt: now,
});

describe('known words', () => {
  it('counts every occurrence', () => {
    expect(knownShare(passage('a', 'x', [0, 96, 3, 4]), index, 1000, new Map())).toBeCloseTo(0.96);
  });

  it('never counts an unreviewed false friend as known, however frequent', () => {
    expect(isKnown(index, new Set(index.falseFriends), 2, 5000, new Map())).toBe(false);
  });

  it('trusts the reviews over the frequency, both ways', () => {
    const friends = new Set(index.falseFriends);
    expect(isKnown(index, friends, 2, 5000, new Map([['actual', true]]))).toBe(true);
    expect(isKnown(index, friends, 3, 1000, new Map([['rare', true]]))).toBe(true);
    expect(isKnown(index, friends, 1, 5000, new Map([['house', false]]))).toBe(false);
  });

  it('reads the reviews without the article of a word', () => {
    const german = courseById('de');
    const noun = bankItems(german).find((item) => item.target.startsWith('der '))!;
    const fresh = reviewedWords(german, { [noun.id]: { halfLifeDays: 3, lastSeen: now } }, now);
    expect(fresh.get(noun.target.slice(4).toLowerCase())).toBe(true);
    const faded = reviewedWords(german, { [noun.id]: { halfLifeDays: 1, lastSeen: now - 9 * DAY } }, now);
    expect(faded.get(noun.target.slice(4).toLowerCase())).toBe(false);
  });
});

describe('dailyReading', () => {
  const inWindow = { passage: passage('fit', 'histoire'), share: 0.96 };
  const other = { passage: passage('fit2', 'sciences'), share: 0.97 };
  const hard = { passage: passage('hard', 'culture'), share: 0.8 };

  it('picks a text between 95 and 98 %', () => {
    expect(dailyReading([hard, inWindow], [], () => 0)).toMatchObject({ passage: inWindow.passage, inWindow: true });
  });

  it('avoids the theme of the last reading', () => {
    const choice = dailyReading([inWindow, other], [reading('old', 'histoire')], () => 0);
    expect(choice?.passage.id).toBe('fit2');
  });

  it('never proposes a text already read', () => {
    expect(dailyReading([inWindow, other], [reading('fit', 'culture')], () => 0)?.passage.id).toBe('fit2');
  });

  it('says so when nothing fits, and gives the closest text', () => {
    const closer = { passage: passage('near', 'histoire'), share: 0.93 };
    expect(dailyReading([hard, closer], [], () => 0)).toMatchObject({ passage: closer.passage, inWindow: false });
  });

  it('has nothing to offer once all is read', () => {
    expect(dailyReading([inWindow], [reading('fit', 'x')])).toBeNull();
  });
});

describe('estimateRank', () => {
  const items: RankTestItem[] = [1000, 2000, 3000, 5000].flatMap((band) =>
    [0, 1, 2, 3, 4].map((n) => ({ word: `w${band}-${n}`, band })),
  );
  const fake = ['fake1', 'fake2', 'fake3'].map((word) => ({ word, band: 0 }));
  const all = [...items, ...fake];
  const knownUpTo = (limit: number) => new Set(items.filter((item) => item.band <= limit).map((item) => item.word));

  it('stops at the last band mostly known', () => {
    expect(estimateRank(all, knownUpTo(3000))).toBe(3000);
  });

  it('gives the smallest size to someone who knows nothing', () => {
    expect(estimateRank(all, new Set())).toBe(500);
  });

  it('does not trust a learner who accepts made-up words', () => {
    expect(estimateRank(all, new Set([...knownUpTo(3000), 'fake1', 'fake2']))).toBe(2000);
    expect(estimateRank(all, new Set([...knownUpTo(3000), 'fake1']))).toBe(3000);
  });
});

describe('words before reading', () => {
  const word = (key: string): GlossaryWord => ({ key, lemma: key, pos: 'noun', rank: 1, count: 1, sentence: 's', fr: key, gender: null });

  it('keeps unknown words only, ten at most', () => {
    const table = { ...index, lemmas: ['the', ...Array.from({ length: 14 }, (_, n) => `w${n}`)], ranks: [1, ...Array(14).fill(9000)], falseFriends: [] };
    const glossary = [word('the'), ...Array.from({ length: 14 }, (_, n) => word(`w${n}`))];
    const before = wordsBeforeReading(glossary, table, 1000, new Map());
    expect(before).toHaveLength(10);
    expect(before.map((item) => item.key)).not.toContain('the');
  });
});

describe('words met in a text', () => {
  const english = courseById('en');
  const met = readingWord({ key: 'wharf', lemma: 'wharf', pos: 'noun', rank: 1, count: 2, sentence: 'The boat reached the wharf at dawn.', fr: 'quai', gender: null }, 'en-1');

  it('keep the article of a German noun', () => {
    const noun = readingWord({ key: 'hund', lemma: 'Hund', pos: 'noun', rank: 1, count: 1, sentence: 'Der Hund bellt laut.', fr: 'chien', gender: 'der' }, 'de-1');
    expect(noun.target).toBe('der Hund');
  });

  it('join the bank, and so the ordinary reviews', () => {
    const course = withReadingWords(english, [met]);
    expect(bankItems(course).at(-1)?.target).toBe('wharf');
    const memory = { 'en:b:wharf': { halfLifeDays: 0.25, lastSeen: now - 5 * DAY } };
    expect(dueItems(course, memory, now).map((item) => item.id)).toContain('en:b:wharf');
  });

  it('leave the course itself unchanged', () => {
    const size = english.bank.length;
    withReadingWords(english, [met]);
    expect(english.bank).toHaveLength(size);
    expect(withReadingWords(english, undefined)).toBe(english);
  });

  it('show their sentence as context, with no voice to play, at every strength', () => {
    const course: Course = withReadingWords(english, [met]);
    const item = bankItems(course).at(-1)!;
    for (const halfLifeDays of [0.25, 3, 30]) {
      const step = bankExercise(course, item, { [item.id]: { halfLifeDays, lastSeen: now } }, new Set());
      expect(step.kind).toBe('choice');
      if (step.kind === 'choice') {
        expect(step.audio).toBeUndefined();
        expect(`${step.shown ?? ''}${step.why ?? ''}`).toContain('wharf at dawn');
      }
    }
  });

  it('are not offered as new words, since the text already introduced them', () => {
    const course = withReadingWords({ ...english, bank: [] }, [met]);
    expect(buildBankSession(course, {}, new Set(), now)).toEqual([]);
  });
});

describe('readingStats', () => {
  it('sums words, speed and levels for one course', () => {
    const readings = [reading('a', 'x'), { ...reading('b', 'x'), courseId: 'de' }, { ...reading('c', 'x'), level: 'B2' }];
    expect(readingStats(readings, 'en')).toEqual({ words: 200, wordsPerMinute: 100, byLevel: { B1: 1, B2: 1 } });
  });
});
