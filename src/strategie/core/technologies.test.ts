import { describe, expect, it } from 'vitest';
import { courseById, lessonsOf } from '../../data/courses';
import type { TechnologyDef } from '../content/schemas';
import type { GameState, LanguageProfile } from '../types';
import { applyAction, createGame } from './game';
import { dictionaryPerSeason, interpreterCost, technologyCost } from './technologies';
import { play, profile, rules, wholeSeason } from './testRules';

const { balance } = rules;

function tech(id: string): TechnologyDef {
  return rules.technologies.find((candidate) => candidate.id === id) as TechnologyDef;
}

function withRule(ruleId: string, state: LanguageProfile['rules'][string]): LanguageProfile {
  return { ...profile, rules: { [ruleId]: state } };
}

function buy(state: GameState, technologyId: string): GameState {
  return applyAction(state, { type: 'buyTechnology', technologyId }, rules);
}

describe('the tree', () => {
  it('has three branches of three: one tier 1 opening two tier 2', () => {
    for (const branch of ['commerce', 'diplomatie', 'savoir']) {
      const members = rules.technologies.filter((candidate) => candidate.branch === branch);
      const root = members.filter((candidate) => candidate.tier === 1);
      expect(members).toHaveLength(3);
      expect(root).toHaveLength(1);
      expect(root[0].requires).toBeNull();
      expect(members.filter((candidate) => candidate.requires === root[0].id)).toHaveLength(2);
    }
  });
});

describe('linked rules', () => {
  it('are grammar lessons the learner can reach, so a discount can really be earned', () => {
    const lessons = lessonsOf(courseById('en')).filter((lesson) => lesson.kind === 'grammar').map((lesson) => lesson.id);
    const linked = rules.technologies.flatMap((candidate) => candidate.discountRuleId ?? []);
    expect(linked.length).toBeGreaterThan(0);
    for (const ruleId of linked) expect(lessons, ruleId).toContain(ruleId);
  });
});

describe('technologyCost', () => {
  it('reads the base price from the tier', () => {
    expect(technologyCost(tech('foire'), profile, balance)).toBe(6);
    expect(technologyCost(tech('interpretes'), profile, balance)).toBe(9);
  });

  it('takes 25 %, rounded up, off when the linked rule is mastered', () => {
    expect(technologyCost(tech('foire'), withRule('en-g-compare', 'maitrise'), balance)).toBe(5);
    expect(technologyCost(tech('corporations'), withRule('en-g-causative', 'maitrise'), balance)).toBe(7);
  });

  it('gives no discount for a rule only in progress or fading', () => {
    expect(technologyCost(tech('foire'), withRule('en-g-compare', 'en_cours'), balance)).toBe(6);
    expect(technologyCost(tech('foire'), withRule('en-g-compare', 'fissure'), balance)).toBe(6);
  });

  it('gives no discount to a technology without a linked rule', () => {
    expect(technologyCost(tech('scriptorium'), withRule('en-g-compare', 'maitrise'), balance)).toBe(6);
  });

  it('grows with the number of cities', () => {
    expect(technologyCost(tech('foire'), profile, balance, 2)).toBeGreaterThan(technologyCost(tech('foire'), profile, balance, 1));
  });
});

describe('buying', () => {
  const start = createGame(3, profile, rules);

  it('takes the price and records the technology', () => {
    const after = buy(start, 'foire');
    expect(after.colony.deniers).toBe(14);
    expect(after.technologies).toEqual(['foire']);
  });

  it('uses the discount of the last profile', () => {
    const after = buy(createGame(3, withRule('en-g-compare', 'maitrise'), rules), 'foire');
    expect(after.colony.deniers).toBe(15);
  });

  it('refuses a technology already owned', () => {
    const owned = buy(start, 'foire');
    expect(buy(owned, 'foire')).toBe(owned);
  });

  it('refuses a tier 2 before its tier 1', () => {
    expect(buy(start, 'interpretes')).toBe(start);
  });

  it('refuses without the money', () => {
    const poor = structuredClone(start);
    poor.colony.deniers = 5;
    expect(buy(poor, 'foire')).toBe(poor);
  });

  it('refuses what waits for phase 2', () => {
    const rich = structuredClone(start);
    rich.colony.deniers = 100;
    const owned = buy(rich, 'foire');
    expect(buy(owned, 'corporations')).toBe(owned);
    expect(rules.technologies.filter((candidate) => !candidate.available).map((candidate) => candidate.id)).toEqual([
      'corporations',
      'routes_maritimes',
      'espions',
      'alliances_matrimoniales',
    ]);
  });
});

describe('effects', () => {
  const rich = structuredClone(createGame(3, profile, rules));
  rich.colony.deniers = 100;

  it('embassy raises the rival trust', () => {
    expect(buy(rich, 'ambassade').rival.trust).toBe(rich.rival.trust + 10);
  });

  it('scriptorium raises the clergy loyalty', () => {
    expect(buy(rich, 'scriptorium').colony.groups.clerge.loyalty).toBe(60);
  });

  it('interpreters lower the fee and raise the interpreter loyalty', () => {
    const after = buy(buy(rich, 'scriptorium'), 'interpretes');
    expect(interpreterCost(after, rules)).toBe(1);
    expect(after.npcs.find((npc) => npc.id === 'interprete')?.loyalty).toBe(60);
  });

  it('school adds a dictionary use from the next season', () => {
    const after = buy(buy(rich, 'scriptorium'), 'ecole');
    expect(after.dictionaryLeft).toBe(3);
    expect(dictionaryPerSeason(after, rules)).toBe(4);
    expect(play(after, [...wholeSeason, { type: 'startSeason', profile }]).dictionaryLeft).toBe(4);
  });
});
