import type { AudienceTemplate, Clue, LetterTemplate } from '../content/schemas';
import { createGame } from '../core/game';
import { play, profile, rules, wholeSeason } from '../core/testRules';
import type { GameAction, GameRules, GameState, LanguageProfile, LetterIntention, RivalDecision } from '../types';
import { createGameHooks } from './index';

/** Stand-ins for the texts of step 5, in the quantities a whole game needs. */
const [baseLetter] = rules.letters;
const [baseAudience] = rules.audiences;

export const WILL_CLUE: Clue = { id: 'indice.will', level: 'A2', ruleId: 'en-g-will', explanationFr: 'would' };
export const MAY_CLUE: Clue = { id: 'indice.may', level: 'B1', ruleId: 'en-g-may', explanationFr: 'may' };

/** Reads the A2 clues: without such a learner there is no treason. */
export const reader: LanguageProfile = { ...profile, rules: { [WILL_CLUE.ruleId]: 'en_cours' } };

export function letter(id: string, intention: LetterIntention, clues: Clue[] = [], from = 'rival'): LetterTemplate {
  const segments = [{ text: 'Dear friend, ' }, ...clues.map((clue) => ({ text: clue.id, clueId: clue.id }))];
  return { ...baseLetter, id, from, intention, clues, text: { ...baseLetter.text, id: `${id}.texte`, segments } };
}

export function audience(id: string, condition: string): AudienceTemplate {
  return { ...baseAudience, id, condition };
}

const numbered = (count: number) => Array.from({ length: count }, (_, index) => index + 1);

export const content = {
  balance: rules.balance,
  letters: [
    ...numbered(4).map((n) => letter(`honnete.${n}`, 'honnete')),
    ...numbered(4).map((n) => letter(`hesitante.${n}`, 'hesitante')),
    letter('perfide.a2.1', 'perfide', [WILL_CLUE]),
    letter('perfide.a2.2', 'perfide', [WILL_CLUE]),
    letter('perfide.b1', 'perfide', [MAY_CLUE]),
  ],
  audiences: [
    ...numbered(12).map((n) => audience(`tous.${n}`, 'tous')),
    audience('disette.1', 'disette'),
    audience('impot.1', 'impot'),
    audience('querelle.1', 'querelle'),
    audience('abus.1', 'abus'),
  ],
};

export const aiRules: GameRules = { ...rules, ...content, hooks: createGameHooks(content) };

export interface PlayedSeason {
  season: number;
  decision: RivalDecision;
  letterIds: string[];
  audienceIds: string[];
}

export interface PlayedGame {
  state: GameState;
  seasons: PlayedSeason[];
}

/** A colony left alone for the whole game, with what the hooks answered each season. */
export function playGame(seed: number, gameRules: GameRules = aiRules): PlayedGame {
  const seasons: PlayedSeason[] = [];
  const hooks = gameRules.hooks ?? {};
  const watched: GameRules = {
    ...gameRules,
    hooks: {
      ...hooks,
      decideRival: (state, rng) => {
        const result = hooks.decideRival!(state, rng);
        seasons.push({ season: state.season, decision: result.decision, letterIds: [], audienceIds: [] });
        return result;
      },
      pickSeasonContent: (state, rng) => {
        const result = hooks.pickSeasonContent!(state, rng);
        seasons[seasons.length - 1].letterIds = result.content.letterIds;
        seasons[seasons.length - 1].audienceIds = result.content.audienceIds;
        return result;
      },
    },
  };
  const season: GameAction[] = wholeSeason.map((action) => (action.type === 'startSeason' ? { ...action, profile: reader } : action));
  const state = numbered(gameRules.balance.seasons).reduce(
    (current) => play(current, season, watched),
    createGame(seed, reader, watched),
  );
  return { state, seasons };
}

export const hundredGames = (): PlayedGame[] => numbered(100).map((seed) => playGame(seed));
