import { generateMap } from '../map/generate';
import type { Faction, GameAction, GameRules, GameState, LanguageProfile, SeasonPhase, VillageReward } from '../types';
import { colonyTile, RESOURCES } from './economy';
import { answerLetter, decideAudience, flagPassage } from './letters';
import { giveOrder } from './orders';
import { cursor, pick } from './rng';
import { endSeason, npcsArrivingAt, startSeason } from './season';
import { buyTechnology, interpreterCost } from './technologies';

const TEMPERAMENTS: readonly Faction['temperament'][] = ['loyal', 'opportuniste', 'orgueilleux', 'prudent'];

const NEXT_PHASE: Partial<Record<SeasonPhase, SeasonPhase>> = {
  rapports: 'audience',
  audience: 'conseil',
  conseil: 'courrier',
};

export function createGame(seed: number, profile: LanguageProfile, rules: GameRules): GameState {
  const { balance } = rules;
  const [map, afterMap] = generateMap(seed, balance);
  const { rng, state: rngState } = cursor(afterMap);
  const temperament = pick(TEMPERAMENTS, rng);
  const { deniers, garrison, loyalty, groupSizes } = balance.start;

  return {
    seed,
    rng: rngState(),
    season: 1,
    phase: 'rapports',
    seasonStarted: false,
    map,
    colony: {
      level: 'hameau',
      deniers,
      garrison,
      defense: 0,
      stocks: Object.fromEntries(RESOURCES.map((resource) => [resource, 0])) as GameState['colony']['stocks'],
      groups: {
        paysans: { size: groupSizes.paysans, loyalty },
        marchands: { size: groupSizes.marchands, loyalty },
        clerge: { size: groupSizes.clerge, loyalty },
      },
      pendingReward: false,
      reward: null,
      debtSeasons: 0,
    },
    npcs: npcsArrivingAt('hameau', rules),
    rival: {
      id: 'rival',
      name: map.rival.name,
      trust: loyalty,
      fear: loyalty,
      temperament,
      intention: 'honnete',
      attackSeason: null,
      strength: balance.betrayal.attackStrength,
    },
    technologies: [],
    letters: [],
    audiences: [],
    orders: [],
    reports: [],
    dictionaryLeft: balance.stranger.dictionary,
    revealedWords: [],
    translatedTexts: [],
    profile,
    languageEvents: [],
    outcome: null,
  };
}

function chooseReward(draft: GameState, reward: VillageReward, rules: GameRules): boolean {
  if (!draft.colony.pendingReward) return false;
  draft.colony.pendingReward = false;
  draft.colony.reward = reward;
  if (reward === 'palissade') draft.colony.defense += rules.balance.rewards.palissadeDefense;
  const tile = colonyTile(draft);
  if (tile) tile.building = reward;
  return true;
}

/** A word stays revealed for the whole game, so looking it up again has nothing to do. */
function lookUp(draft: GameState, itemId: string): boolean {
  if (!draft.seasonStarted || draft.dictionaryLeft <= 0 || draft.revealedWords.includes(itemId)) return false;
  draft.dictionaryLeft -= 1;
  draft.revealedWords.push(itemId);
  draft.languageEvents.push({ kind: 'mot_consulte', itemIds: [itemId], grade: 'again' });
  return true;
}

function useInterpreter(draft: GameState, textId: string, rules: GameRules): boolean {
  const cost = interpreterCost(draft, rules);
  if (draft.colony.deniers < cost || draft.translatedTexts.includes(textId)) return false;
  draft.colony.deniers -= cost;
  draft.translatedTexts.push(textId);
  return true;
}

function ackLanguageEvents(draft: GameState, count: number): boolean {
  if (!Number.isInteger(count) || count <= 0 || draft.languageEvents.length === 0) return false;
  draft.languageEvents.splice(0, count);
  return true;
}

function nextPhase(draft: GameState): boolean {
  const phase = NEXT_PHASE[draft.phase];
  if (!phase || !draft.seasonStarted) return false;
  draft.phase = phase;
  return true;
}

/** Works on a private copy. Says whether the action was allowed. */
function apply(draft: GameState, action: GameAction, rules: GameRules): boolean {
  switch (action.type) {
    case 'startSeason':
      return startSeason(draft, action.profile, rules);
    case 'nextPhase':
      return nextPhase(draft);
    case 'order':
      return draft.phase === 'conseil' && giveOrder(draft, action.order, action.itemIds, action.ruleIds, rules);
    case 'decide':
      return (
        draft.phase === 'audience' &&
        decideAudience(draft, action.audienceId, action.decisionId, action.understood, action.itemIds, rules)
      );
    case 'answerLetter':
      return draft.phase === 'courrier' && answerLetter(draft, action.letterId, action.replyId, rules);
    case 'flagPassage':
      return draft.phase === 'courrier' && flagPassage(draft, action.letterId, action.segmentIndex, rules);
    case 'lookUp':
      return lookUp(draft, action.itemId);
    case 'useInterpreter':
      return useInterpreter(draft, action.textId, rules);
    case 'buyTechnology':
      return buyTechnology(draft, action.technologyId, rules);
    case 'chooseReward':
      return chooseReward(draft, action.reward, rules);
    case 'endSeason':
      return endSeason(draft, rules);
    case 'ackLanguageEvents':
      return ackLanguageEvents(draft, action.count);
  }
}

/**
 * The only way a game moves on. Never touches `state`: an allowed action returns
 * a new state, a forbidden one returns `state` itself, so `next === state` means refused.
 */
export function applyAction(state: GameState, action: GameAction, rules: GameRules): GameState {
  if (state.outcome && action.type !== 'ackLanguageEvents') return state;
  const draft = structuredClone(state);
  return apply(draft, action, rules) ? draft : state;
}
