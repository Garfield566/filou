import { describe, expect, it } from 'vitest';
import { courseById } from '../data/courses';
import type { Course } from '../types';
import { glossOf } from './gloss';

describe('glossOf', () => {
  const english = courseById('en');

  it('keeps the game lexicon out of the lessons', () => {
    expect(glossOf(english, 'fair')).not.toBe('foire');
    expect(glossOf(english, 'barley')).toBeUndefined();
  });

  it('still translates the words the lessons teach', () => {
    const word = english.units.flatMap((unit) => unit.lessons).flatMap((lesson) => (lesson.kind === 'vocab' ? lesson.words : []))[0];
    expect(glossOf(english, word.target)).toBe(word.fr);
  });

  it('still translates a bank word that is not a game word', () => {
    const plain: Course = {
      ...english,
      id: 'test-gloss',
      bank: [{ target: 'zzyzx', fr: 'mot de test', pos: 'noun', plural: null, sentences: [] }],
    };
    expect(glossOf(plain, 'zzyzx')).toBe('mot de test');
  });
});
