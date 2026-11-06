import type { Balance, BuildingDef } from '../content/schemas';
import { tileAt } from '../map/generate';
import type { Colony, GameMap, GameRules, GameState, PopulationGroup, Resource } from '../types';
import { hasEffect } from './technologies';

export const RESOURCES: readonly Resource[] = ['ble', 'poisson', 'laine', 'bois', 'sel', 'argent'];

export function clampLoyalty(value: number): number {
  return Math.min(100, Math.max(0, value));
}

export function changeLoyalty(colony: Colony, group: PopulationGroup, amount: number): void {
  colony.groups[group].loyalty = clampLoyalty(colony.groups[group].loyalty + amount);
}

/** GDD 7: the groups' loyalty, weighted by their size. */
export function globalLoyalty(colony: Colony): number {
  const groups = Object.values(colony.groups);
  const people = groups.reduce((sum, group) => sum + group.size, 0);
  return groups.reduce((sum, group) => sum + group.size * group.loyalty, 0) / people;
}

function exploits(building: BuildingDef): boolean {
  return building.produces !== null && building.terrain !== null;
}

/**
 * What the buildings yield in one season. A building tied to a terrain works
 * only on a tile holding its resource. One with no terrain, such as the mill,
 * adds its amount per working building of the same resource.
 */
export function seasonProduction(map: GameMap, buildings: BuildingDef[]): Record<Resource, number> {
  const yields = Object.fromEntries(RESOURCES.map((resource) => [resource, 0])) as Record<Resource, number>;
  const working = new Map<Resource, number>();
  const boosters: BuildingDef[] = [];

  for (const tile of map.tiles) {
    const building = buildings.find((def) => def.id === tile.building);
    if (!building?.produces) continue;
    if (!exploits(building)) boosters.push(building);
    else if (tile.resource === building.produces) {
      yields[building.produces] += building.amount;
      working.set(building.produces, (working.get(building.produces) ?? 0) + 1);
    }
  }
  for (const booster of boosters) {
    const resource = booster.produces as Resource;
    yields[resource] += booster.amount * (working.get(resource) ?? 0);
  }
  return yields;
}

export function seasonIncome(state: GameState, rules: GameRules): number {
  const { income, rewards, technologyEffects } = rules.balance;
  return (
    income[state.colony.level] +
    (state.colony.reward === 'marche' ? rewards.marcheDeniers : 0) +
    (hasEffect(state, rules, 'revenu') ? technologyEffects.foireDeniers : 0)
  );
}

export function villageNeedsMet(colony: Colony, balance: Balance): boolean {
  return colony.stocks.ble >= balance.villageNeeds.ble && colony.stocks.poisson >= balance.villageNeeds.poisson;
}

export function colonyTile(state: GameState) {
  return tileAt(state.map, state.map.colony.x, state.map.colony.y);
}
