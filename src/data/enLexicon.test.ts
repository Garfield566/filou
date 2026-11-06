import { describe, expect, it } from 'vitest';
import { z } from 'zod';
import { lemmaOf, transparentWords } from '../lib/vocabulary';
import type { BankWord } from '../types';
import enLexicon from './en-vocabulary.json';
import lexiconData from './enLexicon.json';
import { englishVerbFamilies } from './irregularVerbs';

const data = enLexicon;
const lexiconEntrySchema = z.object({
  target: z.string().min(1),
  fr: z.string().min(1),
  pos: z.string().min(1),
  plural: z.string().nullable(),
  domain: z.enum(['commerce', 'guerre', 'droit', 'construction', 'religion', 'administration', 'vie_quotidienne']),
  sentences: z.array(z.object({ id: z.string().min(1), text: z.string().min(1), fr: z.string().min(1) })).min(1),
});

const lexicon: BankWord[] = lexiconEntrySchema.array().parse(lexiconData);
const targets = new Set(lexicon.map((word) => word.target));
const socle = new Set(data.socle);

/** Words of a sentence that the base list does not cover. A capital inside a sentence marks a name. */
function unknownWords(text: string): string[] {
  const words = text.match(/\p{L}+(?:['’]\p{L}+)*/gu) ?? [];
  return words.filter((word, index) => {
    const lemma = lemmaOf(word);
    const name = index > 0 && word[0] !== word[0].toLowerCase();
    return !socle.has(lemma) && !transparentWords.has(lemma) && !name;
  });
}

describe('lexicon of the English bank', () => {
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

  it('covers every lexical field', () => {
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
        expect(unknownWords(sentence.text).filter((form) => lemmaOf(form) !== word.target), sentence.text).toEqual([]);
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

  it('lists at least 40 false friends', () => {
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
