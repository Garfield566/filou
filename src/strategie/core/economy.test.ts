import { describe, expect, it } from 'vitest';
import { isLand } from '../map/generate';
import type { GameState, Tile } from '../types';
import { globalLoyalty, seasonIncome, seasonProduction, villageNeedsMet } from './economy';
import { createGame } from './game';
import { profile, rules } from './testRules';

function game(): GameState {
  return structuredClone(createGame(11, profile, rules));
}

function tileWith(state: GameState, resource: Tile['resource']): Tile {
  return state.map.tiles.find((tile) => tile.resource === resource && tile.explored) as Tile;
}

describe('production', () => {
  it('is nothing without buildings', () => {
    expect(Object.values(seasonProduction(game().map, rules.buildings)).every((amount) => amount === 0)).toBe(true);
  });

  it('gives 2 per farm, fishery and sheepfold on their resource', () => {
    const state = game();
    tileWith(state, 'ble').building = 'ferme';
    tileWith(state, 'poisson').building = 'pecherie';
    const pasture = state.map.tiles.find((tile) => tile.resource === 'laine') as Tile;
    pasture.building = 'bergerie';
    expect(seasonProduction(state.map, rules.buildings)).toMatchObject({ ble: 2, poisson: 2, laine: 2 });
  });

  it('gives nothing for a building away from its resource', () => {
    const state = game();
    (state.map.tiles.find((tile) => isLand(tile) && tile.resource === null) as Tile).building = 'ferme';
    expect(seasonProduction(state.map, rules.buildings).ble).toBe(0);
  });

  it('adds 1 wheat per working farm with a mill', () => {
    const state = game();
    const fields = state.map.tiles.filter((tile) => tile.resource === 'ble');
    fields[0].building = 'ferme';
    fields[1].building = 'ferme';
    (state.map.tiles.find((tile) => isLand(tile) && tile.resource === null) as Tile).building = 'moulin';
    expect(seasonProduction(state.map, rules.buildings).ble).toBe(6);
  });

  it('does not count a misplaced farm for the mill', () => {
    const state = game();
    const empty = state.map.tiles.filter((tile) => isLand(tile) && tile.resource === null);
    empty[0].building = 'ferme';
    empty[1].building = 'moulin';
    expect(seasonProduction(state.map, rules.buildings).ble).toBe(0);
  });
});

describe('income', () => {
  it('follows the level', () => {
    const state = game();
    expect(seasonIncome(state, rules)).toBe(4);
    state.colony.level = 'village';
    expect(seasonIncome(state, rules)).toBe(7);
  });

  it('adds the market', () => {
    const state = game();
    state.colony.reward = 'marche';
    expect(seasonIncome(state, rules)).toBe(6);
  });

  it('does not add the palisade', () => {
    const state = game();
    state.colony.reward = 'palissade';
    expect(seasonIncome(state, rules)).toBe(4);
  });

  it('adds the fair technology', () => {
    const state = game();
    state.technologies.push('foire');
    expect(seasonIncome(state, rules)).toBe(5);
  });
});

describe('needs', () => {
  it('asks for 6 wheat and 4 fish together', () => {
    const { colony } = game();
    colony.stocks.ble = 6;
    expect(villageNeedsMet(colony, rules.balance)).toBe(false);
    colony.stocks.poisson = 3;
    expect(villageNeedsMet(colony, rules.balance)).toBe(false);
    colony.stocks.poisson = 4;
    expect(villageNeedsMet(colony, rules.balance)).toBe(true);
  });
});

describe('global loyalty', () => {
  it('weighs each group by its size', () => {
    const { colony } = game();
    colony.groups.paysans.loyalty = 100;
    colony.groups.marchands.loyalty = 0;
    colony.groups.clerge.loyalty = 50;
    expect(globalLoyalty(colony)).toBeCloseTo(70);
  });
});
