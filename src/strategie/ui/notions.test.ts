import { describe, expect, it } from 'vitest';
import type { LanguageProfile } from '../types';
import { notionState, trackEvents } from './notions';

const profile: LanguageProfile = { language: 'en', words: { wool: 'en_cours' }, rules: { 'en-g-should': 'fissure' } };

describe('trackEvents', () => {
  it('counts each grade and keeps the first state seen', () => {
    const first = trackEvents({}, [{ kind: 'ordre_compris', itemIds: ['wool', 'en-g-should'], grade: 'good' }], profile);
    const later = { ...profile, words: { wool: 'maitrise' as const } };
    const second = trackEvents(first, [{ kind: 'ordre_rate', itemIds: ['wool'], grade: 'again' }], later);
    expect(second.wool).toEqual({ before: 'en_cours', good: 1, hard: 0, again: 1 });
    expect(second['en-g-should'].before).toBe('fissure');
  });

  it('calls an unknown notion grey', () => {
    expect(notionState(profile, 'unknown')).toBe('grise');
  });
});
