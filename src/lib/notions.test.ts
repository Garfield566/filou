import { describe, expect, it } from 'vitest';
import { notionState, ruleState } from './notions';

const DAY = 24 * 60 * 60 * 1000;
const now = 1000 * DAY;

const fresh = (halfLifeDays: number) => ({ halfLifeDays, lastSeen: now });
const expired = (halfLifeDays: number) => ({ halfLifeDays, lastSeen: now - 3 * halfLifeDays * DAY });

describe('notionState', () => {
  it('is grey without memory', () => {
    expect(notionState(undefined, now)).toBe('grise');
  });

  it('is in progress below seven days, mastered from seven days', () => {
    expect(notionState(fresh(6.9), now)).toBe('en_cours');
    expect(notionState(fresh(7), now)).toBe('maitrise');
  });

  it('cracks once due, whatever the half-life', () => {
    expect(notionState(expired(2), now)).toBe('fissure');
    expect(notionState(expired(30), now)).toBe('fissure');
  });
});

describe('ruleState', () => {
  const ids = ['q0', 'q1', 'q2', 'q3'];

  it('is grey when no question has been seen', () => {
    expect(ruleState(ids, {}, now)).toBe('grise');
    expect(ruleState(ids, { other: fresh(30) }, now)).toBe('grise');
    expect(ruleState([], {}, now)).toBe('grise');
  });

  it('is mastered when every seen question is strong, ignoring unseen ones', () => {
    expect(ruleState(ids, { q0: fresh(7), q1: fresh(30) }, now)).toBe('maitrise');
  });

  it('keeps mastery with a minority of strong questions due', () => {
    expect(ruleState(ids, { q0: fresh(7), q1: fresh(7), q2: expired(7) }, now)).toBe('maitrise');
  });

  it('is in progress as soon as one seen question is weak', () => {
    expect(ruleState(ids, { q0: fresh(7), q1: fresh(2) }, now)).toBe('en_cours');
  });

  it('cracks when strictly more than half of the seen questions are due', () => {
    expect(ruleState(ids, { q0: fresh(2), q1: expired(2), q2: expired(2) }, now)).toBe('fissure');
  });

  it('stays in progress at exactly half due', () => {
    expect(ruleState(ids, { q0: fresh(2), q1: expired(2) }, now)).toBe('en_cours');
  });

  it('cracks rather than reads as mastered when strong questions have expired', () => {
    expect(ruleState(ids, { q0: expired(30), q1: expired(30) }, now)).toBe('fissure');
  });
});
