import { describe, expect, it } from 'vitest';
import { createGame } from '../core/game';
import { deepFreeze, profile } from '../core/testRules';
import type { Faction, GameState } from '../types';
import { treasonLetterLeft } from './content';
import { colonyWeakness, decideRival, rivalUtilities } from './rival';
import { aiRules, hundredGames, reader, WILL_CLUE } from './testContent';

function at(season: number, change: (state: GameState) => void = () => {}, temperament: Faction['temperament'] = 'opportuniste'): GameState {
  const state = structuredClone(createGame(5, reader, aiRules));
  state.season = season;
  state.rival.temperament = temperament;
  change(state);
  return state;
}

function weaken(state: GameState): void {
  state.colony.deniers = 0;
  state.colony.garrison = 0;
  for (const group of Object.values(state.colony.groups)) group.loyalty = 10;
}

function fortify(state: GameState): void {
  state.colony.deniers = 60;
  state.colony.garrison = 10;
  state.colony.defense = 4;
  for (const group of Object.values(state.colony.groups)) group.loyalty = 90;
}

const games = hundredGames();

describe('decideRival', () => {
  it('is deterministic and leaves the state alone', () => {
    const state = deepFreeze(at(2));
    const first = decideRival(state, 42, aiRules);
    expect(decideRival(state, 42, aiRules)).toEqual(first);
    expect(first.rng).not.toBe(42);
    expect(decideRival(state, 43, aiRules).decision.scores).not.toEqual(first.decision.scores);
  });

  it('gives a score to each of the four actions', () => {
    const { scores } = decideRival(at(2), 1, aiRules).decision;
    expect(Object.keys(scores).sort()).toEqual(['attendre', 'commercer', 'menacer', 'trahir']);
  });

  it('lets the action set the intention', () => {
    const expected = { commercer: 'honnete', attendre: 'hesitante', menacer: 'hesitante', trahir: 'perfide' };
    const decisions = games.flatMap((game) => game.seasons.map((season) => season.decision));
    for (const { action, intention } of decisions) expect(intention).toBe(expected[action]);
    expect(new Set(decisions.map((decision) => decision.action)).size).toBe(4);
  });

  it('picks the best score while no treason is planned', () => {
    for (const seed of [1, 2, 3, 4, 5]) {
      const { action, scores } = decideRival(at(2), seed, aiRules).decision;
      expect(scores[action]).toBe(Math.max(...Object.values(scores)));
    }
  });
});

describe('treason', () => {
  it('happens in 40 to 70 % of the games of a normal colony', () => {
    const betrayed = games.filter((game) => game.state.rival.attackSeason !== null).length;
    expect(betrayed).toBeGreaterThanOrEqual(40);
    expect(betrayed).toBeLessThanOrEqual(70);
  });

  it('never happens outside the letter seasons', () => {
    const { letterSeasons } = aiRules.balance.betrayal;
    const treasons = games.flatMap((game) => game.seasons).filter((season) => season.decision.action === 'trahir');
    expect(treasons.length).toBeGreaterThan(0);
    for (const { season } of treasons) expect(letterSeasons).toContain(season);
  });

  it('stays off the table outside the letter seasons, however tempting', () => {
    for (const season of [1, 4]) {
      const state = at(season, (draft) => {
        weaken(draft);
        draft.rival.trust = 0;
        draft.rival.fear = 0;
      });
      for (const seed of [1, 2, 3, 4, 5]) expect(decideRival(state, seed, aiRules).decision.action).not.toBe('trahir');
    }
  });

  it('tempts an opportunist more when the colony is weak', () => {
    const weak = at(2, weaken);
    const strong = at(2, fortify);
    expect(colonyWeakness(weak)).toBeGreaterThan(colonyWeakness(strong));
    expect(rivalUtilities(weak).trahir).toBeGreaterThan(rivalUtilities(strong).trahir);

    const gain = (temperament: Faction['temperament']) =>
      rivalUtilities(at(2, weaken, temperament)).trahir - rivalUtilities(at(2, fortify, temperament)).trahir;
    expect(gain('opportuniste')).toBeGreaterThan(gain('prudent'));
  });

  it('falls with trust and fear', () => {
    const base = rivalUtilities(at(2)).trahir;
    expect(rivalUtilities(at(2, (draft) => void (draft.rival.trust = 90))).trahir).toBeLessThan(base);
    expect(rivalUtilities(at(2, (draft) => void (draft.rival.fear = 90))).trahir).toBeLessThan(base);
  });

  it('holds once planned: perfidious in the letter seasons, then open threat', () => {
    const planned = (draft: GameState) => void (draft.rival.attackSeason = 4);
    expect(decideRival(at(3, planned, 'loyal'), 1, aiRules).decision.action).toBe('trahir');
    expect(decideRival(at(4, planned, 'loyal'), 1, aiRules).decision.action).toBe('menacer');
  });

  describe('needs a letter the learner can spot (GDD 10.6)', () => {
    const tempted = (draft: GameState) => {
      weaken(draft);
      draft.rival.trust = 0;
      draft.rival.fear = 0;
    };
    const actions = (state: GameState) => [1, 2, 3, 4, 5].map((seed) => decideRival(state, seed, aiRules).decision.action);

    it('tempts the rival when there is one', () => {
      expect(actions(at(2, tempted))).toContain('trahir');
    });

    it('is off the table when the rule of the A2 fallback is grey or unknown', () => {
      for (const rules of [{}, { [WILL_CLUE.ruleId]: 'grise' as const }]) {
        const state = at(2, (draft) => {
          tempted(draft);
          draft.profile = { ...profile, rules };
        });
        expect(treasonLetterLeft(state, aiRules)).toBe(false);
        expect(actions(state)).not.toContain('trahir');
      }
    });

    it('keeps the A2 fallback for a rule the learner has met and let fade', () => {
      const state = at(2, (draft) => {
        tempted(draft);
        draft.profile = { ...profile, rules: { [WILL_CLUE.ruleId]: 'fissure' } };
      });
      expect(treasonLetterLeft(state, aiRules)).toBe(true);
      expect(actions(state)).toContain('trahir');
    });

    it('stops once the spottable letters have all been sent, even when planned', () => {
      const spent = (draft: GameState) => {
        tempted(draft);
        draft.letters = aiRules.letters
          .filter((template) => template.intention === 'perfide')
          .map((template) => ({ letterId: template.id, season: 1, replyId: null, flagged: [] }));
      };
      expect(actions(at(2, spent))).not.toContain('trahir');
      const planned = at(3, (draft) => {
        spent(draft);
        draft.rival.attackSeason = 4;
      });
      expect(decideRival(planned, 1, aiRules).decision.action).toBe('menacer');
    });
  });
});
