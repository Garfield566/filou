import { globalLoyalty } from '../core/economy';
import { cursor } from '../core/rng';
import type { Faction, GameRules, GameState, LetterIntention, RivalDecision } from '../types';
import { treasonLetterLeft } from './content';

type RivalAction = RivalDecision['action'];
type Temperament = Faction['temperament'];
type RivalRules = Pick<GameRules, 'balance' | 'letters'>;

/**
 * Every coefficient of the rival, in score points. They live here and not in
 * `balance.json`, which belongs to the content. Trust, fear and weakness count
 * from 0 to 1, so a coefficient is what that variable adds at its maximum.
 */
export const RIVAL_WEIGHTS = {
  /** Treasury at which the colony no longer looks poor. */
  safeTreasury: 40,
  /** Each action draws between 0 and this many points. */
  noise: 16,
  commercer: { base: 0, trust: 30, strength: 15 },
  attendre: { base: 20, fear: 10 },
  menacer: { base: 0, distrust: 20, weakness: 15, fear: -15 },
  trahir: { base: 8, distrust: 20, weakness: 20, fear: -10 },
  /** Added to the treason score of an opportunist, multiplied by the weakness. */
  opportunism: 30,
  temperament: {
    loyal: { commercer: 4, trahir: -3 },
    opportuniste: {},
    orgueilleux: { menacer: 12, trahir: 6 },
    prudent: { attendre: 3, trahir: -1 },
  } satisfies Record<Temperament, Partial<Record<RivalAction, number>>>,
};

const ACTIONS: readonly RivalAction[] = ['commercer', 'attendre', 'menacer', 'trahir'];

const INTENTIONS: Record<RivalAction, LetterIntention> = {
  commercer: 'honnete',
  attendre: 'hesitante',
  menacer: 'hesitante',
  trahir: 'perfide',
};

function clampUnit(value: number): number {
  return Math.min(1, Math.max(0, value));
}

/** How weak the colony looks, from 0 to 1: the mean of its treasury, defense and loyalty gaps. */
export function colonyWeakness(state: GameState): number {
  const { colony, rival } = state;
  const poverty = clampUnit(1 - colony.deniers / RIVAL_WEIGHTS.safeTreasury);
  const exposure = clampUnit(1 - (colony.garrison + colony.defense) / rival.strength);
  const unrest = clampUnit(1 - globalLoyalty(colony) / 100);
  return (poverty + exposure + unrest) / 3;
}

/** The scores before chance, by action. */
export function rivalUtilities(state: GameState): Record<RivalAction, number> {
  const { commercer, attendre, menacer, trahir, opportunism, temperament } = RIVAL_WEIGHTS;
  const trust = state.rival.trust / 100;
  const fear = state.rival.fear / 100;
  const weakness = colonyWeakness(state);
  const bonus: Partial<Record<RivalAction, number>> = temperament[state.rival.temperament];
  const greed = state.rival.temperament === 'opportuniste' ? opportunism * weakness : 0;

  return {
    commercer: commercer.base + commercer.trust * trust + commercer.strength * (1 - weakness) + (bonus.commercer ?? 0),
    attendre: attendre.base + attendre.fear * fear + (bonus.attendre ?? 0),
    menacer: menacer.base + menacer.distrust * (1 - trust) + menacer.weakness * weakness + menacer.fear * fear + (bonus.menacer ?? 0),
    trahir: trahir.base + trahir.distrust * (1 - trust) + trahir.weakness * weakness + trahir.fear * fear + (bonus.trahir ?? 0) + greed,
  };
}

function bestAction(actions: readonly RivalAction[], scores: Record<string, number>): RivalAction {
  return actions.reduce((best, action) => (scores[action] > scores[best] ? action : best));
}

/**
 * A treason needs a letter the learner can spot: outside the letter seasons, or
 * with no such letter left, it is not on offer. Once planned it holds: the rival
 * keeps writing perfidious letters while it can and shows its hand afterwards.
 */
function chooseAction(state: GameState, scores: Record<string, number>, rules: RivalRules): RivalAction {
  const canBetray = rules.balance.betrayal.letterSeasons.includes(state.season) && treasonLetterLeft(state, rules);
  if (state.rival.attackSeason !== null) return canBetray ? 'trahir' : 'menacer';
  return bestAction(canBetray ? ACTIONS : ACTIONS.filter((action) => action !== 'trahir'), scores);
}

export function decideRival(
  state: GameState,
  rng: number,
  rules: RivalRules,
): { decision: RivalDecision; rng: number } {
  const random = cursor(rng);
  const utilities = rivalUtilities(state);
  const scores = Object.fromEntries(ACTIONS.map((action) => [action, utilities[action] + random.rng() * RIVAL_WEIGHTS.noise]));
  const action = chooseAction(state, scores, rules);
  return { decision: { action, intention: INTENTIONS[action], scores }, rng: random.state() };
}
