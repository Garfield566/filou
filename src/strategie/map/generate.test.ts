import { describe, expect, it } from 'vitest';
import { rules } from '../core/testRules';
import type { GameMap, Resource, Terrain } from '../types';
import { campOf, campResources, generateMap, reach, tileAt } from './generate';

const { balance } = rules;
const seeds = Array.from({ length: 300 }, (_, index) => index * 7919 + 1);
const maps = seeds.map((seed) => generateMap(seed, balance)[0]);

const homeTerrain: Record<Resource, Terrain> = {
  ble: 'champ',
  poisson: 'cote',
  laine: 'paturage',
  bois: 'foret',
  sel: 'marais',
  argent: 'montagne',
};

function coastal(map: GameMap, x: number, y: number): boolean {
  return [[1, 0], [-1, 0], [0, 1], [0, -1]].some(([dx, dy]) => {
    const terrain = tileAt(map, x + dx, y + dy)?.terrain;
    return terrain === 'mer' || terrain === 'cote';
  });
}

describe('generateMap', () => {
  it('builds a 12 by 12 grid with tiles in reading order', () => {
    for (const map of maps) {
      expect(map.size).toBe(12);
      expect(map.tiles).toHaveLength(144);
      map.tiles.forEach((tile, index) => expect(tile.y * 12 + tile.x).toBe(index));
    }
  });

  it('gives the same map and generator state for the same seed', () => {
    expect(generateMap(1234, balance)).toEqual(generateMap(1234, balance));
  });

  it('gives different maps for different seeds', () => {
    const shapes = new Set(maps.map((map) => map.tiles.map((tile) => tile.terrain).join()));
    expect(shapes.size).toBe(maps.length);
  });

  it('uses sea, coast and every land type on a typical map', () => {
    const terrains = new Set(maps[0].tiles.map((tile) => tile.terrain));
    expect(terrains).toEqual(
      new Set(['mer', 'cote', 'prairie', 'champ', 'paturage', 'foret', 'colline', 'montagne', 'marais']),
    );
  });

  it('puts each resource on its own terrain, salt on coastal marsh only', () => {
    for (const map of maps) {
      for (const tile of map.tiles) {
        if (!tile.resource) continue;
        expect(tile.terrain).toBe(homeTerrain[tile.resource]);
        if (tile.resource === 'sel') expect(coastal(map, tile.x, tile.y)).toBe(true);
      }
    }
  });

  it('keeps the two cities apart, on land, with nothing on their tile', () => {
    for (const map of maps) {
      expect(reach(map.colony, map.rival)).toBeGreaterThanOrEqual(balance.map.citySeparation);
      for (const city of [map.colony, map.rival]) {
        const tile = tileAt(map, city.x, city.y)!;
        expect(tile.terrain).not.toBe('mer');
        expect(tile.resource).toBeNull();
      }
    }
  });

  it('lifts the fog around the colony and nowhere else', () => {
    for (const map of maps) {
      for (const tile of map.tiles) {
        expect(tile.explored).toBe(reach(tile, map.colony) <= balance.map.revealRadius);
      }
      expect(tileAt(map, map.rival.x, map.rival.y)!.explored).toBe(false);
    }
  });

  it('leaves each camp short of a resource the other one has', () => {
    for (const map of maps) {
      const colony = campResources(map, 'colony');
      const rival = campResources(map, 'rival');
      expect([...colony].some((resource) => !rival.has(resource))).toBe(true);
      expect([...rival].some((resource) => !colony.has(resource))).toBe(true);
    }
  });

  it('always shows the colony two wheat fields and two fishing spots', () => {
    for (const map of maps) {
      const inSight = map.tiles.filter((tile) => tile.explored);
      expect(inSight.filter((tile) => tile.resource === 'ble').length).toBeGreaterThanOrEqual(2);
      expect(inSight.filter((tile) => tile.resource === 'poisson').length).toBeGreaterThanOrEqual(2);
    }
  });

  it('gives each tile to the nearer city', () => {
    const map = maps[0];
    expect(campOf(map, map.colony)).toBe('colony');
    expect(campOf(map, map.rival)).toBe('rival');
  });

  it('names places from real pieces, with a meaning in French', () => {
    for (const map of maps) {
      expect(map.colony.name).not.toBe(map.rival.name);
      for (const place of [map.colony, map.rival]) {
        expect(place.name).toMatch(/^[A-Z][a-z]+(ford|bury|ton)$/);
        expect(place.meaningFr).toMatch(/^(Gué|Place forte|Ferme) /);
      }
    }
  });
});
