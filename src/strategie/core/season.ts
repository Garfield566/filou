import type { DefeatCause, GameRules, GameState, LanguageProfile, Npc, Outcome, RivalDecision } from '../types';
import { globalLoyalty, RESOURCES, seasonIncome, seasonProduction, villageNeedsMet } from './economy';
import { isAlerted, pushMissedClues } from './letters';
import { executeOrders } from './orders';
import { dictionaryPerSeason } from './technologies';

export function npcsArrivingAt(level: 'hameau' | 'village', rules: GameRules): Npc[] {
  return rules.npcs
    .filter((template) => (template.arrivesAt ?? 'hameau') === level)
    .map((template) => ({
      id: template.id,
      name: template.name,
      role: template.role,
      color: template.color,
      register: template.register,
      traits: template.traits,
      loyalty: rules.balance.start.loyalty,
      patience: rules.balance.stranger.patience,
    }));
}

/** A treason is only taken up in the seasons the balance sets for its letter. */
function applyRivalDecision(draft: GameState, decision: RivalDecision, rules: GameRules): void {
  const { letterSeasons, attackSeason, attackStrength } = rules.balance.betrayal;
  if (decision.action === 'trahir') {
    if (!letterSeasons.includes(draft.season)) return;
    draft.rival.attackSeason ??= attackSeason;
    draft.rival.strength = attackStrength;
  }
  draft.rival.intention = decision.intention;
}

export function startSeason(draft: GameState, profile: LanguageProfile, rules: GameRules): boolean {
  if (draft.phase !== 'rapports' || draft.seasonStarted) return false;

  draft.seasonStarted = true;
  draft.profile = profile;
  draft.dictionaryLeft = dictionaryPerSeason(draft, rules);

  const { decideRival, pickSeasonContent } = rules.hooks ?? {};
  if (decideRival) {
    const { decision, rng } = decideRival(draft, draft.rng);
    draft.rng = rng;
    applyRivalDecision(draft, decision, rules);
  }
  if (pickSeasonContent) {
    const { content, rng } = pickSeasonContent(draft, draft.rng);
    draft.rng = rng;
    for (const letterId of content.letterIds) {
      if (rules.letters.some((letter) => letter.id === letterId)) {
        draft.letters.push({ letterId, season: draft.season, replyId: null, flagged: [] });
      }
    }
    for (const audienceId of content.audienceIds) {
      if (rules.audiences.some((audience) => audience.id === audienceId)) {
        draft.audiences.push({ audienceId, season: draft.season, decisionId: null });
      }
    }
  }
  return true;
}

function growColony(draft: GameState, rules: GameRules): void {
  if (draft.colony.level !== 'hameau' || !villageNeedsMet(draft.colony, rules.balance)) return;
  draft.colony.level = 'village';
  // No season is left to pick a reward in.
  draft.colony.pendingReward = draft.season < rules.balance.seasons;
  draft.npcs.push(...npcsArrivingAt('village', rules));
  draft.reports.push({ season: draft.season, textId: 'rapport.village', values: {} });
}

/** Attack against garrison and defense, a tie going to the defender. True if the city falls. */
function resolveSiege(draft: GameState, rules: GameRules): boolean {
  if (draft.rival.attackSeason !== draft.season) return false;
  const alerted = isAlerted(draft, rules);
  const defense = draft.colony.garrison + draft.colony.defense + (alerted ? rules.balance.betrayal.alertedDefense : 0);
  const falls = draft.rival.strength > defense;
  draft.reports.push({
    season: draft.season,
    textId: falls ? 'rapport.siege.perdu' : 'rapport.siege.tenu',
    values: { attaque: draft.rival.strength, defense },
  });
  return falls;
}

function defeatCause(draft: GameState, cityFell: boolean, rules: GameRules): DefeatCause | null {
  if (cityFell) return 'ville_prise';
  if (globalLoyalty(draft.colony) <= 0) return 'revolte';
  if (draft.colony.debtSeasons >= rules.balance.bankruptcySeasons) return 'faillite';
  return null;
}

function finish(draft: GameState, outcome: Outcome, rules: GameRules): void {
  draft.outcome = outcome;
  draft.phase = 'bilan';
  pushMissedClues(draft, rules);
}

/**
 * Resolves the season, in order: production, income, needs and the step to the
 * Village, orders, siege, then the defeat and end checks. A building ordered
 * this season therefore produces from the next one.
 */
export function endSeason(draft: GameState, rules: GameRules): boolean {
  if (draft.phase !== 'courrier' || draft.colony.pendingReward) return false;

  const yields = seasonProduction(draft.map, rules.buildings);
  for (const resource of RESOURCES) draft.colony.stocks[resource] += yields[resource];
  const income = seasonIncome(draft, rules);
  draft.colony.deniers += income;
  draft.reports.push({
    season: draft.season,
    textId: 'rapport.recolte',
    values: { ble: yields.ble, poisson: yields.poisson, laine: yields.laine, deniers: income },
  });

  growColony(draft, rules);
  executeOrders(draft, rules);
  const cityFell = resolveSiege(draft, rules);

  draft.colony.debtSeasons = draft.colony.deniers < 0 ? draft.colony.debtSeasons + 1 : 0;

  const cause = defeatCause(draft, cityFell, rules);
  if (cause) finish(draft, { result: 'defaite', cause }, rules);
  else if (draft.season >= rules.balance.seasons) finish(draft, { result: 'fin_de_tranche', cause: null }, rules);
  else {
    draft.season += 1;
    draft.phase = 'rapports';
    draft.seasonStarted = false;
  }
  return true;
}
