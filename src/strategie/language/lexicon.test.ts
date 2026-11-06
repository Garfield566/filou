import { describe, expect, it } from 'vitest';
import { englishVerbFamilies } from '../../data/irregularVerbs';
import type { BankWord } from '../../types';
import enLexicon from '../content/en-lexicon.json';
import data from '../content/en-socle.json';
import { lexiconEntrySchema } from '../content/schemas';
import type { GameText } from '../types';
import { checkTextVocabulary, englishVocabulary, lemmaOf } from './mask';

// Typed on purpose: `LexicalField` lives in two places, and this line stops them from drifting apart.
const lexicon: BankWord[] = lexiconEntrySchema.array().parse(enLexicon);
const targets = new Set(lexicon.map((word) => word.target));
const socle = new Set(data.socle);
const vocabulary = englishVocabulary();

const plain = (id: string, text: string): GameText => ({ id, level: 'A2', segments: [{ text }], fr: '-' });

describe('game lexicon', () => {
  it('holds about 200 distinct words, each with a stable sentence id', () => {
    expect(lexicon.length).toBeGreaterThanOrEqual(190);
    expect(lexicon.length).toBeLessThanOrEqual(230);
    expect(targets.size).toBe(lexicon.length);
    expect(lexicon.flatMap((word) => word.sentences.map((sentence) => sentence.id))).toEqual(
      lexicon.map((_, index) => `en-lex-${index + 1}`),
    );
  });

  it('keeps targets bare: one lower-case word, no article', () => {
    expect(lexicon.filter((word) => !/^[a-z]+$/.test(word.target)).map((word) => word.target)).toEqual([]);
  });

  it('never gives two words the same translation, so choices stay fair', () => {
    expect(new Set(lexicon.map((word) => word.fr)).size).toBe(lexicon.length);
  });

  it('covers every lexical field of GDD 10.1', () => {
    expect(new Set(lexicon.map((word) => word.domain)).size).toBe(7);
  });

  it('shows each word in its own sentence', () => {
    for (const word of lexicon) {
      const lemmas = word.sentences[0].text.split(/[^A-Za-z]+/).map(lemmaOf);
      expect(lemmas, word.target).toContain(word.target);
    }
  });

  it('writes each sentence with base words only, apart from the word it teaches', () => {
    for (const word of lexicon) {
      for (const sentence of word.sentences) {
        const unknown = checkTextVocabulary(plain(sentence.id, sentence.text), vocabulary);
        expect(unknown.filter((form) => lemmaOf(form) !== word.target), sentence.text).toEqual([]);
      }
    }
  });
});

describe('base vocabulary', () => {
  it('holds 1,500 lower-case lemmas, without the lexicon or the false friends', () => {
    expect(data.socle).toHaveLength(1500);
    expect(socle.size).toBe(1500);
    expect(data.socle.filter((word) => !/^[a-z]+$/.test(word))).toEqual([]);
    expect(data.socle.filter((word) => targets.has(word) || data.falseFriends.includes(word))).toEqual([]);
  });

  it('keeps common words, and drops names and inflected forms', () => {
    for (const word of ['the', 'be', 'winter', 'king', 'market']) expect(socle.has(word), word).toBe(true);
    for (const word of ['john', 'london', 'are', 'went', 'children']) expect(socle.has(word), word).toBe(false);
  });

  it('lists at least 40 false friends, among them those named by the GDD and the plan', () => {
    expect(data.falseFriends.length).toBeGreaterThanOrEqual(40);
    for (const word of ['actual', 'eventually', 'library', 'sensible', 'deception', 'attend', 'pretend']) {
      expect(data.falseFriends, word).toContain(word);
    }
  });

  it('lists the false friends found in review, and only real ones', () => {
    const found = ['large', 'sale', 'rest', 'stage', 'issue', 'realize', 'assume', 'support', 'figure', 'college', 'journal'];
    for (const word of found) {
      expect(data.falseFriends, word).toContain(word);
      expect(socle.has(word), word).toBe(false);
    }
    expect(data.falseFriends).not.toContain('money');
  });

  it('never takes a false friend or a lexicon word for a transparent one', () => {
    expect(data.transparents.filter((word) => data.falseFriends.includes(word) || targets.has(word))).toEqual([]);
  });
});

describe('lemmaOf', () => {
  it('resolves inflected forms to their lemma', () => {
    const forms = { was: 'be', went: 'go', children: 'child', Oxen: 'ox', thieves: 'thief', besieged: 'besiege', attended: 'attend' };
    for (const [form, lemma] of Object.entries(forms)) expect(lemmaOf(form), form).toBe(lemma);
  });

  it('resolves the plural of every lexicon noun', () => {
    for (const word of lexicon) if (word.plural) expect(lemmaOf(word.plural), word.plural).toBe(word.target);
  });

  it('keeps a lexicon word whole, even when it looks like a form of another one', () => {
    expect(lemmaOf('goods')).toBe('goods');
    expect(lemmaOf('scales')).toBe('scales');
  });

  it('removes the end of a contraction or a possessive', () => {
    const forms = { "don't": 'do', "won't": 'will', "can't": 'can', "we'll": 'we', "lord's": 'lord', 'king’s': 'king' };
    for (const [form, lemma] of Object.entries(forms)) expect(lemmaOf(form), form).toBe(lemma);
  });

  it('knows the irregular forms of the verbs taught in the course', () => {
    for (const verb of englishVerbFamilies.flatMap((family) => family.verbs)) {
      if (!socle.has(verb.name)) continue;
      for (const form of verb.forms) {
        const lemma = lemmaOf(form);
        expect(lemma === verb.name || socle.has(lemma) || targets.has(lemma), form).toBe(true);
      }
    }
  });
});
