import type { BuildingDef } from '../content/schemas';
import { isLand, reach, tileAt } from '../map/generate';
import type {
  ErrorSeverity,
  GameRules,
  GameState,
  LanguageEvent,
  Npc,
  OrderRecord,
  StructuredOrder,
  Tile,
  Trait,
} from '../types';
import { clampLoyalty } from './economy';
import { cursor, pick } from './rng';

export const BUILD_VERB = 'construire';

/** How the NPC carries out what it heard (GDD 10.4). */
type Execution = 'fidele' | 'precision' | 'detournee' | 'erronee';

const IMPRECISION_BY_TRAIT: Partial<Record<Trait, Execution>> = {
  loyal: 'precision',
  cupide: 'detournee',
  maladroit: 'erronee',
};

const CHANGES_THE_SENSE: readonly ErrorSeverity[] = ['sens_change', 'imprecision'];

function has(order: StructuredOrder, gravity: ErrorSeverity): boolean {
  return order.erreurs.some((error) => error.gravite === gravity);
}

function executionOf(record: OrderRecord, npc: Npc): Execution {
  if (has(record.order, 'sens_change')) return 'erronee';
  if (!has(record.order, 'imprecision') || record.delayed) return 'fidele';
  // The GDD names three traits. The first one the NPC has decides; otherwise it asks.
  const trait = npc.traits.find((candidate) => candidate in IMPRECISION_BY_TRAIT);
  return trait ? (IMPRECISION_BY_TRAIT[trait] as Execution) : 'precision';
}

/**
 * GDD 10.2: a missing or wrong notion fails, a harmless fault leaves the words good.
 * An error naming its `notionIds` lands only on them. An order that fails without
 * saying where leaves its other notions unreviewed; once it says, they count as good.
 */
function orderEvents(order: StructuredOrder, itemIds: string[], ruleIds: string[]): LanguageEvent[] {
  const notions = [...itemIds, ...ruleIds];
  if (order.erreurs.length === 0) return [{ kind: 'ordre_compris', itemIds: notions, grade: 'good' }];

  const serious = order.erreurs.filter((error) => CHANGES_THE_SENSE.includes(error.gravite));
  const light = order.erreurs.filter((error) => !CHANGES_THE_SENSE.includes(error.gravite));
  const failed = new Set(serious.flatMap((error) => error.notionIds ?? (ruleIds.length > 0 ? ruleIds : itemIds)));
  const hard = new Set(light.flatMap((error) => error.notionIds ?? ruleIds).filter((id) => !failed.has(id)));
  const untouched = serious.some((error) => !error.notionIds);
  const good = untouched ? [] : notions.filter((id) => !failed.has(id) && !hard.has(id));

  const kind = serious.length > 0 ? 'ordre_rate' : 'faute_legere';
  const events: LanguageEvent[] = [
    { kind: 'ordre_rate', itemIds: [...failed], grade: 'again' },
    { kind, itemIds: good, grade: 'good' },
    { kind, itemIds: [...hard], grade: 'hard' },
  ];
  return events.filter((event) => event.itemIds.length > 0);
}

export function giveOrder(draft: GameState, order: StructuredOrder, itemIds: string[], ruleIds: string[], rules: GameRules): boolean {
  const npc = draft.npcs.find((candidate) => candidate.id === order.destinataire);
  if (!npc) return false;

  draft.orders.push({ season: draft.season, order, executed: false, delayed: false });
  if (has(order, 'mauvais_registre')) npc.loyalty = clampLoyalty(npc.loyalty - rules.balance.orders.registerLoyaltyLoss);
  draft.languageEvents.push(...orderEvents(order, itemIds, ruleIds));
  return true;
}

function isCity(state: GameState, tile: Tile): boolean {
  const { colony, rival } = state.map;
  return (tile.x === colony.x && tile.y === colony.y) || (tile.x === rival.x && tile.y === rival.y);
}

function isFree(state: GameState, tile: Tile): boolean {
  return tile.explored && tile.building === null && isLand(tile) && !isCity(state, tile);
}

function fits(state: GameState, def: BuildingDef, tile: Tile): boolean {
  if (!isFree(state, tile)) return false;
  return def.terrain === null || (tile.terrain === def.terrain && tile.resource === def.produces);
}

/** `lieu` is "x,y". Anything else leaves the choice to the NPC: the nearest suitable tile. */
function targetTile(state: GameState, def: BuildingDef, lieu: string | null): Tile | undefined {
  const spot = lieu?.match(/^(\d+),(\d+)$/);
  if (spot) {
    const tile = tileAt(state.map, Number(spot[1]), Number(spot[2]));
    return tile && fits(state, def, tile) ? tile : undefined;
  }
  return state.map.tiles
    .filter((tile) => fits(state, def, tile))
    .sort(
      (a, b) =>
        Number(a.resource !== null) - Number(b.resource !== null) ||
        reach(a, state.map.colony) - reach(b, state.map.colony) ||
        a.y - b.y ||
        a.x - b.x,
    )[0];
}

/** A tied building ends up where it cannot work; one that is not tied is simply lost. */
function wrongTile(draft: GameState, def: BuildingDef): Tile | undefined {
  if (def.terrain === null) return undefined;
  const options = draft.map.tiles.filter((tile) => isFree(draft, tile) && tile.resource !== def.produces);
  if (options.length === 0) return undefined;
  const { rng, state } = cursor(draft.rng);
  const tile = pick(options, rng);
  draft.rng = state();
  return tile;
}

function blockedReason(state: GameState, def: BuildingDef, price: number): string | null {
  if (def.requires !== null && def.requires !== state.colony.level) return 'verrouille';
  if (state.colony.deniers < price) return 'fonds';
  if (def.terrain === null && state.map.tiles.some((tile) => tile.building === def.id)) return 'deja_construit';
  return null;
}

function build(draft: GameState, record: OrderRecord, execution: Execution, rules: GameRules): void {
  const report = (textId: string, values: Record<string, string | number>) =>
    draft.reports.push({ season: draft.season, textId, values });
  const objet = record.order.objet ?? '';
  const def = rules.buildings.find((building) => building.id === objet);
  if (!def) {
    report('rapport.chantier.impossible', { batiment: objet, raison: 'inconnu' });
    return;
  }

  const surcharge = execution === 'detournee' ? rules.balance.orders.greedSurcharge : 0;
  const price = def.cost + surcharge;
  const blocked = blockedReason(draft, def, price);
  if (blocked) {
    report('rapport.chantier.impossible', { batiment: def.id, raison: blocked });
    return;
  }

  if (execution === 'erronee') {
    const tile = wrongTile(draft, def);
    if (tile) tile.building = def.id;
    draft.colony.deniers -= price;
    record.executed = true;
    report('rapport.chantier.mal_execute', { batiment: def.id });
    return;
  }

  const tile = targetTile(draft, def, record.order.lieu);
  if (!tile) {
    report('rapport.chantier.impossible', { batiment: def.id, raison: 'emplacement' });
    return;
  }
  tile.building = def.id;
  draft.colony.deniers -= price;
  record.executed = true;
  if (surcharge > 0) report('rapport.chantier.detourne', { batiment: def.id, surcout: surcharge, x: tile.x, y: tile.y });
  else report('rapport.chantier.fini', { batiment: def.id, x: tile.x, y: tile.y });
}

/** Fires the orders due this season. Only `construire` changes the world in phase 1. */
export function executeOrders(draft: GameState, rules: GameRules): void {
  const due = draft.orders.filter((record) => record.season === draft.season && !record.executed);
  for (const record of due) {
    const npc = draft.npcs.find((candidate) => candidate.id === record.order.destinataire) as Npc;
    const execution = executionOf(record, npc);
    if (execution === 'precision') {
      record.delayed = true;
      record.season += 1;
      draft.reports.push({
        season: draft.season,
        textId: 'rapport.ordre.precision',
        values: { pnj: npc.id, verbe: record.order.verbe, objet: record.order.objet ?? '' },
      });
    } else if (record.order.verbe === BUILD_VERB) {
      build(draft, record, execution, rules);
    } else {
      record.executed = true;
    }
  }
}
