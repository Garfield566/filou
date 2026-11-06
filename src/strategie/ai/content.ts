import { shuffle, type Rng } from '../../lib/random';
import type { AudienceTemplate, Clue, LetterTemplate } from '../content/schemas';
import { cursor, pick } from '../core/rng';
import type { GameRules, GameState, LanguageProfile, LetterIntention, NodeState, SeasonContent } from '../types';

/** Values accepted in the `condition` field of an audience. Any other is never picked. */
export const AUDIENCE_CONDITIONS = ['tous', 'disette', 'impot', 'querelle', 'abus'] as const;

export type AudienceCondition = (typeof AUDIENCE_CONDITIONS)[number];

export const AUDIENCE_THRESHOLDS = {
  /** Under this loyalty, peasants complain of taxes and an NPC of abuse. */
  lowLoyalty: 40,
  /** Loyalty gap between two groups that sets them quarrelling. */
  quarrelGap: 15,
};

const AUDIENCES_PER_SEASON = [2, 3] as const;

const READABLE_STATES: readonly NodeState[] = ['en_cours', 'maitrise'];

export type ContentRules = Pick<GameRules, 'balance' | 'letters' | 'audiences'>;

/** A clue no segment carries cannot be flagged, so it does not count. */
function spottableClues(letter: LetterTemplate): Clue[] {
  return letter.clues.filter((clue) => letter.text.segments.some((segment) => segment.clueId === clue.id));
}

/**
 * GDD 10.6: a clue is readable if the learner has the rule carrying it in
 * progress or mastered. False on a letter picked by the A2 fallback.
 */
export function clueIsReadable(letter: LetterTemplate, profile: LanguageProfile): boolean {
  return spottableClues(letter).some((clue) => {
    const state = profile.rules[clue.ruleId];
    return state !== undefined && READABLE_STATES.includes(state);
  });
}

function hasA2Clue(letter: LetterTemplate): boolean {
  return spottableClues(letter).some((clue) => clue.level === 'A2');
}

/** The A2 fallback still needs a learner who has met the rule: a `grise` rule hides its clue. */
function hasMetA2Clue(letter: LetterTemplate, profile: LanguageProfile): boolean {
  return spottableClues(letter).some((clue) => clue.level === 'A2' && (profile.rules[clue.ruleId] ?? 'grise') !== 'grise');
}

/** The closest to the learner's level among the letters left. */
function treasonCandidates(letters: LetterTemplate[], profile: LanguageProfile): LetterTemplate[] {
  const tiers = [
    letters.filter((letter) => clueIsReadable(letter, profile)),
    letters.filter((letter) => hasMetA2Clue(letter, profile)),
    letters.filter(hasA2Clue),
  ];
  return tiers.find((tier) => tier.length > 0) ?? letters;
}

function lettersLeft(state: GameState, rules: Pick<GameRules, 'letters'>, intention: LetterIntention): LetterTemplate[] {
  const received = new Set(state.letters.map((letter) => letter.letterId));
  return rules.letters.filter(
    (letter) => letter.from === state.rival.id && letter.intention === intention && !received.has(letter.id),
  );
}

/** GDD 10.6: a treason needs a perfidious letter the learner can see through. */
export function treasonLetterLeft(state: GameState, rules: Pick<GameRules, 'letters'>): boolean {
  return lettersLeft(state, rules, 'perfide').some(
    (letter) => clueIsReadable(letter, state.profile) || hasMetA2Clue(letter, state.profile),
  );
}

function pickLetter(state: GameState, rules: ContentRules, rng: Rng): LetterTemplate | undefined {
  const { intention } = state.rival;
  const left = lettersLeft(state, rules, intention);
  const candidates = intention === 'perfide' ? treasonCandidates(left, state.profile) : left;
  return candidates.length > 0 ? pick(candidates, rng) : undefined;
}

function loyaltyGap(state: GameState): number {
  const loyalties = Object.values(state.colony.groups).map((group) => group.loyalty);
  return Math.max(...loyalties) - Math.min(...loyalties);
}

const CONDITION_CHECKS: Record<AudienceCondition, (state: GameState, rules: ContentRules) => boolean> = {
  tous: () => true,
  disette: (state, rules) => state.colony.stocks.ble < rules.balance.villageNeeds.ble,
  impot: (state) => state.colony.groups.paysans.loyalty < AUDIENCE_THRESHOLDS.lowLoyalty,
  querelle: (state) => loyaltyGap(state) >= AUDIENCE_THRESHOLDS.quarrelGap,
  abus: (state) => state.npcs.some((npc) => npc.loyalty < AUDIENCE_THRESHOLDS.lowLoyalty),
};

export function audienceConditionHolds(condition: string, state: GameState, rules: ContentRules): boolean {
  return (AUDIENCE_CONDITIONS as readonly string[]).includes(condition)
    ? CONDITION_CHECKS[condition as AudienceCondition](state, rules)
    : false;
}

/** Complaints born of the state come first; `tous` only fills the remaining places. */
function pickAudiences(state: GameState, rules: ContentRules, rng: Rng): AudienceTemplate[] {
  const received = new Set(state.audiences.map((audience) => audience.audienceId));
  const open = rules.audiences.filter(
    (audience) => !received.has(audience.id) && audienceConditionHolds(audience.condition, state, rules),
  );
  const count = pick(AUDIENCES_PER_SEASON, rng);
  const urgent = shuffle(open.filter((audience) => audience.condition !== 'tous'), rng);
  const ordinary = shuffle(open.filter((audience) => audience.condition === 'tous'), rng);
  return [...urgent, ...ordinary].slice(0, count);
}

export function pickSeasonContent(
  state: GameState,
  rng: number,
  rules: ContentRules,
): { content: SeasonContent; rng: number } {
  const random = cursor(rng);
  const letter = pickLetter(state, rules, random.rng);
  const audiences = pickAudiences(state, rules, random.rng);
  return {
    content: { letterIds: letter ? [letter.id] : [], audienceIds: audiences.map((audience) => audience.id) },
    rng: random.state(),
  };
}
