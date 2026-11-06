import { describe, expect, it } from 'vitest';
import { createGame } from '../core/game';
import { deepFreeze, profile } from '../core/testRules';
import type { GameState, LanguageProfile, LetterIntention, NodeState } from '../types';
import { AUDIENCE_CONDITIONS, AUDIENCE_THRESHOLDS, audienceConditionHolds, clueIsReadable, pickSeasonContent } from './content';
import { aiRules, audience, content, hundredGames, letter, MAY_CLUE, WILL_CLUE } from './testContent';

function at(intention: LetterIntention, change: (state: GameState) => void = () => {}): GameState {
  const state = structuredClone(createGame(5, profile, aiRules));
  state.rival.intention = intention;
  change(state);
  return state;
}

const knowing = (ruleId: string, node: NodeState): LanguageProfile => ({ ...profile, rules: { [ruleId]: node } });
const templateOf = (id: string) => content.letters.find((template) => template.id === id);

const games = hundredGames();
const treasons = games.flatMap((game) => game.seasons).filter((season) => season.decision.action === 'trahir');

describe('letters', () => {
  it('follow the intention of the rival', () => {
    for (const { decision, letterIds } of games.flatMap((game) => game.seasons)) {
      expect(letterIds).toHaveLength(1);
      expect(templateOf(letterIds[0])?.intention).toBe(decision.intention);
    }
  });

  it('never come twice in a game', () => {
    for (const { seasons } of games) {
      const ids = seasons.flatMap((season) => season.letterIds);
      expect(new Set(ids).size).toBe(ids.length);
    }
  });

  it('skip a letter already received, even with nothing left to send', () => {
    const state = at('perfide', (draft) => {
      draft.letters = content.letters
        .filter((template) => template.intention === 'perfide')
        .map((template) => ({ letterId: template.id, season: 1, replyId: null, flagged: [] }));
    });
    expect(pickSeasonContent(state, 1, content).content.letterIds).toEqual([]);
  });

  it('come only from the rival', () => {
    const rules = { ...content, letters: [letter('autre', 'honnete', [], 'hanse')] };
    expect(pickSeasonContent(at('honnete'), 1, rules).content.letterIds).toEqual([]);
  });

  it('always bring a treason a perfidious letter with a clue to spot', () => {
    expect(treasons.length).toBeGreaterThan(0);
    for (const { letterIds } of treasons) {
      const template = templateOf(letterIds[0]);
      expect(template?.intention).toBe('perfide');
      expect(template?.text.segments.some((segment) => segment.clueId)).toBe(true);
    }
  });

  it('choose a clue whose rule the learner is working on', () => {
    for (const node of ['en_cours', 'maitrise'] as const) {
      const state = at('perfide', (draft) => void (draft.profile = knowing(MAY_CLUE.ruleId, node)));
      for (const seed of [1, 2, 3, 4, 5]) {
        const [id] = pickSeasonContent(state, seed, content).content.letterIds;
        expect(id).toBe('perfide.b1');
        expect(clueIsReadable(templateOf(id)!, state.profile)).toBe(true);
      }
    }
  });

  it('fall back on A2 clues, and say so', () => {
    for (const node of ['grise', 'fissure'] as const) {
      const state = at('perfide', (draft) => void (draft.profile = knowing(MAY_CLUE.ruleId, node)));
      for (const seed of [1, 2, 3, 4, 5]) {
        const [id] = pickSeasonContent(state, seed, content).content.letterIds;
        expect(templateOf(id)?.clues[0].level).toBe('A2');
        expect(clueIsReadable(templateOf(id)!, state.profile)).toBe(false);
      }
    }
  });

  it('do not count a clue that no segment carries', () => {
    const unmarked = { ...letter('muette', 'perfide', [WILL_CLUE]), text: letter('muette', 'perfide').text };
    expect(clueIsReadable(unmarked, knowing(WILL_CLUE.ruleId, 'maitrise'))).toBe(false);
  });
});

describe('audiences', () => {
  it('come two or three at a time', () => {
    for (const { audienceIds } of games.flatMap((game) => game.seasons)) {
      expect([2, 3]).toContain(audienceIds.length);
    }
  });

  it('never come twice in a game', () => {
    for (const { seasons } of games) {
      const ids = seasons.flatMap((season) => season.audienceIds);
      expect(new Set(ids).size).toBe(ids.length);
    }
  });

  it('list a check for every condition', () => {
    for (const condition of AUDIENCE_CONDITIONS) {
      expect(typeof audienceConditionHolds(condition, at('honnete'), content)).toBe('boolean');
    }
    expect(audienceConditionHolds('tous', at('honnete'), content)).toBe(true);
  });

  it('follow the state of the colony', () => {
    const { lowLoyalty, quarrelGap } = AUDIENCE_THRESHOLDS;
    const fed = at('honnete', (draft) => void (draft.colony.stocks.ble = content.balance.villageNeeds.ble));
    expect(audienceConditionHolds('disette', at('honnete'), content)).toBe(true);
    expect(audienceConditionHolds('disette', fed, content)).toBe(false);

    expect(audienceConditionHolds('impot', at('honnete'), content)).toBe(false);
    const taxed = at('honnete', (draft) => void (draft.colony.groups.paysans.loyalty = lowLoyalty - 1));
    expect(audienceConditionHolds('impot', taxed, content)).toBe(true);

    expect(audienceConditionHolds('querelle', at('honnete'), content)).toBe(false);
    const split = at('honnete', (draft) => void (draft.colony.groups.clerge.loyalty += quarrelGap));
    expect(audienceConditionHolds('querelle', split, content)).toBe(true);

    expect(audienceConditionHolds('abus', at('honnete'), content)).toBe(false);
    const abused = at('honnete', (draft) => void (draft.npcs[0].loyalty = lowLoyalty - 1));
    expect(audienceConditionHolds('abus', abused, content)).toBe(true);
  });

  it('put the complaints born of the state before the ordinary ones', () => {
    const { audienceIds } = pickSeasonContent(at('honnete'), 1, content).content;
    expect(audienceIds[0]).toBe('disette.1');
  });

  it('ignore a condition they do not know', () => {
    const rules = { ...content, audiences: [audience('inconnue', 'tempete')] };
    expect(pickSeasonContent(at('honnete'), 1, rules).content.audienceIds).toEqual([]);
  });
});

describe('pickSeasonContent', () => {
  it('is deterministic and leaves the state alone', () => {
    const state = deepFreeze(at('honnete'));
    const first = pickSeasonContent(state, 42, content);
    expect(pickSeasonContent(state, 42, content)).toEqual(first);
    expect(first.rng).not.toBe(42);
  });
});
