import { describe, expect, it } from 'vitest';
import data from '../content/en-socle.json';
import type { GameText, LanguageProfile, NodeState, TextSegment } from '../types';
import { checkTextVocabulary, englishVocabulary, maskText, measureCoverage } from './mask';

const vocabulary = englishVocabulary(['Harold']);
const WHEAT = 'en:b:wheat';
const RENT = 'en:b:rent';

const profileWith = (words: Record<string, NodeState> = {}): LanguageProfile => ({ language: 'en', words, rules: {} });
const textOf = (...segments: TextSegment[]): GameText => ({ id: 't', level: 'A2', segments, fr: '-' });
const displayOf = (segment: TextSegment, words?: Record<string, NodeState>) =>
  maskText(textOf(segment), profileWith(words), vocabulary)[0].display;

describe('maskText', () => {
  it.each<[NodeState | undefined, string]>([
    ['en_cours', 'clair'],
    ['maitrise', 'clair'],
    ['grise', 'tache'],
    ['fissure', 'tache'],
    [undefined, 'tache'],
  ])('shows a word in state %s as %s', (state, display) => {
    expect(displayOf({ text: 'wheat', wordId: WHEAT }, state ? { [WHEAT]: state } : {})).toBe(display);
  });

  it('shows a plain segment in clear', () => {
    expect(displayOf({ text: 'We need more food, my lord.' })).toBe('clair');
    expect(displayOf({ text: ', ' })).toBe('clair');
  });

  it('underlines transparent words, even when they carry an id the learner has not met', () => {
    expect(displayOf({ text: 'colony' })).toBe('transparent');
    expect(displayOf({ text: 'colonies' })).toBe('transparent');
    expect(displayOf({ text: 'colony', wordId: 'en:colony' })).toBe('transparent');
    expect(displayOf({ text: 'colony', wordId: 'en:colony' }, { 'en:colony': 'maitrise' })).toBe('clair');
  });

  it('underlines proper nouns', () => {
    expect(displayOf({ text: 'Harold' })).toBe('transparent');
    expect(maskText(textOf({ text: 'I saw ' }, { text: 'Edmund' }), profileWith(), vocabulary)[1].display).toBe('transparent');
  });

  it('never takes a word of the course for a name because of its capital letter', () => {
    const text = textOf({ text: 'I saw the ' }, { text: 'Engineer', wordId: 'en:engineer' });
    expect(maskText(text, profileWith(), vocabulary)[1].display).toBe('tache');
  });

  it('never shows a false friend in clear unless the learner studies it', () => {
    for (const word of data.falseFriends) {
      const wordId = `en:${word}`;
      for (const state of [undefined, 'grise', 'fissure'] as const) {
        expect(displayOf({ text: word, wordId }, state ? { [wordId]: state } : {}), word).toBe('tache');
      }
      expect(displayOf({ text: word }), word).toBe('tache');
      expect(displayOf({ text: word, wordId }, { [wordId]: 'en_cours' }), word).toBe('clair');
      expect(displayOf({ text: word, wordId }, { [wordId]: 'maitrise' }), word).toBe('clair');
    }
  });

  it('finds a false friend behind an inflection, a capital letter or a name list', () => {
    expect(displayOf({ text: 'They attended the feast.' })).toBe('tache');
    expect(displayOf({ text: 'the rents', wordId: RENT })).toBe('tache');
    const text = textOf({ text: 'We saw the ' }, { text: 'Library' });
    expect(maskText(text, profileWith(), vocabulary)[1].display).toBe('tache');
    expect(maskText(text, profileWith(), englishVocabulary(['Library']))[1].display).toBe('tache');
  });

  it('shows a word revealed by the dictionary in clear, false friend or not', () => {
    const shown = (segment: TextSegment) => maskText(textOf(segment), profileWith(), vocabulary, [WHEAT, RENT])[0].display;
    expect(shown({ text: 'wheat', wordId: WHEAT })).toBe('clair');
    expect(shown({ text: 'rent', wordId: RENT })).toBe('clair');
    expect(shown({ text: 'barley', wordId: 'en:b:barley' })).toBe('tache');
  });

  it('keeps one entry per segment, with its clue, so a flagged index stays valid', () => {
    const text = textOf({ text: 'We ' }, { text: 'would', clueId: 'c1' }, { text: ' help.' });
    const shown = maskText(text, profileWith(), vocabulary);
    expect(shown.map((segment) => segment.text)).toEqual(text.segments.map((segment) => segment.text));
    expect(shown[1]).toEqual({ text: 'would', clueId: 'c1', display: 'clair' });
  });
});

describe('measureCoverage', () => {
  const text = textOf(
    { text: 'We need ' },
    { text: 'wheat', wordId: WHEAT },
    { text: ' and ' },
    { text: 'rent', wordId: RENT },
    { text: ', and 20 more ' },
    { text: 'wheat', wordId: WHEAT },
    { text: '.' },
  );

  it('counts every word and the known ones, leaving numbers out', () => {
    const profile = profileWith({ [WHEAT]: 'maitrise', [RENT]: 'en_cours' });
    expect(measureCoverage(text, profile, vocabulary)).toEqual({ known: 8, newWords: 0, total: 8 });
  });

  it('counts a new word once, however often it comes back', () => {
    const profile = profileWith({ [RENT]: 'maitrise' });
    expect(measureCoverage(text, profile, vocabulary)).toEqual({ known: 6, newWords: 1, total: 8 });
  });

  it('does not count a fading word as new, though it no longer helps coverage', () => {
    const profile = profileWith({ [WHEAT]: 'fissure', [RENT]: 'grise' });
    expect(measureCoverage(text, profile, vocabulary)).toEqual({ known: 5, newWords: 1, total: 8 });
  });
});

describe('checkTextVocabulary', () => {
  it('accepts base words, transparent words, names, numbers, punctuation and slots', () => {
    const text = textOf(
      { text: "Harold didn't bring the 20 fruits to Edmund's colony: {ware}!" },
      { text: 'wheat', wordId: WHEAT },
    );
    expect(checkTextVocabulary(text, vocabulary)).toEqual([]);
  });

  it('follows a sentence across segments', () => {
    expect(checkTextVocabulary(textOf({ text: 'The ' }, { text: 'Edmund' }, { text: ' king.' }), vocabulary)).toEqual([]);
  });

  it('reports a word nothing recognises', () => {
    expect(checkTextVocabulary(textOf({ text: 'The zzyzx came.' }), vocabulary)).toEqual(['zzyzx']);
  });

  it('reports a capitalised unknown word opening a sentence, unless it is a listed name', () => {
    expect(checkTextVocabulary(textOf({ text: 'Edmund came.' }), vocabulary)).toEqual(['Edmund']);
    expect(checkTextVocabulary(textOf({ text: 'Harold came.' }), vocabulary)).toEqual([]);
  });

  it('reports a lexicon word or a false friend left without its id', () => {
    expect(checkTextVocabulary(textOf({ text: 'The wheat is good.' }), vocabulary)).toEqual(['wheat']);
    expect(checkTextVocabulary(textOf({ text: 'The Wheat is good.' }), vocabulary)).toEqual(['Wheat']);
    expect(checkTextVocabulary(textOf({ text: 'He attended.' }), vocabulary)).toEqual(['attended']);
  });

  it('reports a segment whose id has no translation, since a blot would hide it', () => {
    expect(checkTextVocabulary(textOf({ text: 'wheat', wordId: 'en:b:nothing' }), vocabulary)).toEqual(['wheat']);
  });

  it('accepts the ids of the course passed along with the vocabulary', () => {
    const withItems = englishVocabulary([], ['en:actual']);
    expect(checkTextVocabulary(textOf({ text: 'actual', wordId: 'en:actual' }), withItems)).toEqual([]);
  });
});
