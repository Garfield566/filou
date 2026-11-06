import { describe, expect, it } from 'vitest';
import type { GameAction, GameRules, GameState } from '../types';
import { applyAction, createGame } from './game';
import { cursor } from './rng';
import { deepFreeze, order, profile, rules, toMail } from './testRules';

/** Draws from the generator at every season, as the real hooks will. */
const hooked: GameRules = {
  ...rules,
  hooks: {
    decideRival: (state, rngState) => {
      const { rng, state: after } = cursor(rngState);
      const treason = state.season === 2 && rng() < 0.5;
      return {
        decision: treason
          ? { action: 'trahir', intention: 'perfide', scores: {} }
          : { action: 'attendre', intention: 'honnete', scores: {} },
        rng: after(),
      };
    },
    pickSeasonContent: (state, rngState) => {
      const { rng, state: after } = cursor(rngState);
      rng();
      return {
        content: {
          letterIds: [state.rival.intention === 'perfide' ? 'lettre.perfide' : 'lettre.honnete'],
          audienceIds: ['audience.disette'],
        },
        rng: after(),
      };
    },
  },
};

const mistake = (gravite: 'sens_change' | 'imprecision' | 'mauvais_registre') => [{ type: 't', segment: 's', gravite }];

const script: GameAction[] = [
  ...toMail.slice(0, 3),
  { type: 'order', order: order(), itemIds: ['en:farm'], ruleIds: ['en-g-be'] },
  { type: 'order', order: order({ objet: 'pecherie', erreurs: mistake('imprecision') }), itemIds: [], ruleIds: ['en-g-be'] },
  { type: 'order', order: order({ erreurs: mistake('sens_change') }), itemIds: [], ruleIds: ['en-g-be'] },
  { type: 'lookUp', itemId: 'en:wheat' },
  { type: 'nextPhase' },
  { type: 'answerLetter', letterId: 'lettre.honnete', replyId: 'poli' },
  { type: 'endSeason' },

  { type: 'startSeason', profile },
  { type: 'nextPhase' },
  { type: 'decide', audienceId: 'audience.disette', decisionId: 'aider', understood: true, itemIds: ['en:hunger'] },
  { type: 'nextPhase' },
  { type: 'buyTechnology', technologyId: 'foire' },
  { type: 'order', order: order({ objet: 'bergerie', erreurs: mistake('mauvais_registre') }), itemIds: [], ruleIds: [] },
  { type: 'nextPhase' },
  { type: 'flagPassage', letterId: 'lettre.perfide', segmentIndex: 1 },
  { type: 'useInterpreter', textId: 'lettre' },
  { type: 'endSeason' },

  ...toMail,
  { type: 'chooseReward', reward: 'palissade' },
  { type: 'endSeason' },

  ...toMail,
  { type: 'chooseReward', reward: 'marche' },
  { type: 'endSeason' },
];

function run(seed: number): GameState {
  return script.reduce((state, action) => applyAction(state, action, hooked), createGame(seed, profile, hooked));
}

const seeds = Array.from({ length: 100 }, (_, index) => index * 104729 + 3);

describe('determinism', () => {
  it('gives the same final state on 100 seeds', () => {
    for (const seed of seeds) expect(JSON.stringify(run(seed))).toBe(JSON.stringify(run(seed)));
  });

  it('really depends on the seed', () => {
    expect(new Set(seeds.map((seed) => JSON.stringify(run(seed)))).size).toBe(seeds.length);
  });

  it('survives a save between two actions', () => {
    const middle = Math.floor(script.length / 2);
    for (const seed of seeds.slice(0, 10)) {
      const saved = JSON.stringify(script.slice(0, middle).reduce((state, action) => applyAction(state, action, hooked), createGame(seed, profile, hooked)));
      const resumed = script.slice(middle).reduce((state, action) => applyAction(state, action, hooked), JSON.parse(saved) as GameState);
      expect(JSON.stringify(resumed)).toBe(JSON.stringify(run(seed)));
    }
  });

  it('plays the script to the end', () => {
    const finished = seeds.map((seed) => run(seed).outcome);
    expect(finished.every((outcome) => outcome !== null)).toBe(true);
  });
});

describe('purity', () => {
  it('never changes its input, whatever the action', () => {
    for (const seed of seeds.slice(0, 20)) {
      let state = deepFreeze(createGame(seed, profile, hooked));
      for (const action of script) {
        const before = JSON.stringify(state);
        const after = applyAction(state, action, hooked);
        expect(JSON.stringify(state)).toBe(before);
        state = deepFreeze(after);
      }
    }
  });
});
