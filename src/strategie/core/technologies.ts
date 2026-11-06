import type { Balance, TechnologyDef } from '../content/schemas';
import type { GameRules, GameState, LanguageProfile } from '../types';

/** The colony is the only city of phase 1. The price is ready for more. */
const CITIES_IN_PHASE_ONE = 1;

export function hasEffect(state: GameState, rules: GameRules, effect: string): boolean {
  return rules.technologies.some((tech) => tech.effect === effect && state.technologies.includes(tech.id));
}

/** The base price grows with each city; a mastered linked notion takes a share off, rounded up. */
export function technologyCost(
  tech: TechnologyDef,
  profile: LanguageProfile,
  balance: Balance,
  cities: number = CITIES_IN_PHASE_ONE,
): number {
  const { tier1, tier2, masteredDiscount } = balance.technology;
  const base = (tech.tier === 1 ? tier1 : tier2) * cities;
  const mastered = tech.discountRuleId !== null && profile.rules[tech.discountRuleId] === 'maitrise';
  return mastered ? Math.ceil(base * (1 - masteredDiscount)) : base;
}

export function canBuy(state: GameState, tech: TechnologyDef, rules: GameRules): boolean {
  return (
    tech.available &&
    !state.technologies.includes(tech.id) &&
    (tech.requires === null || state.technologies.includes(tech.requires)) &&
    state.colony.deniers >= technologyCost(tech, state.profile, rules.balance)
  );
}

/** Changes the draft; effects that act later are read through `hasEffect`. */
export function buyTechnology(draft: GameState, technologyId: string, rules: GameRules): boolean {
  const tech = rules.technologies.find((candidate) => candidate.id === technologyId);
  if (!tech || !canBuy(draft, tech, rules)) return false;

  const { ambassadeTrust, scriptoriumClergeLoyalty, interpretesLoyalty } = rules.balance.technologyEffects;
  draft.colony.deniers -= technologyCost(tech, draft.profile, rules.balance);
  draft.technologies.push(tech.id);

  if (tech.effect === 'confiance_rivale') draft.rival.trust = Math.min(100, draft.rival.trust + ambassadeTrust);
  if (tech.effect === 'loyaute_clerge') {
    const clerge = draft.colony.groups.clerge;
    clerge.loyalty = Math.min(100, clerge.loyalty + scriptoriumClergeLoyalty);
  }
  if (tech.effect === 'interprete') {
    const interpreter = draft.npcs.find((npc) => npc.id === 'interprete');
    if (interpreter) interpreter.loyalty = Math.min(100, interpreter.loyalty + interpretesLoyalty);
  }
  return true;
}

export function dictionaryPerSeason(state: GameState, rules: GameRules): number {
  const { stranger, technologyEffects } = rules.balance;
  return stranger.dictionary + (hasEffect(state, rules, 'dictionnaire') ? technologyEffects.ecoleDictionary : 0);
}

export function interpreterCost(state: GameState, rules: GameRules): number {
  const { stranger, technologyEffects } = rules.balance;
  return hasEffect(state, rules, 'interprete') ? technologyEffects.interpretesCost : stranger.interpreterCost;
}
