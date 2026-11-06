import { describe, expect, it } from 'vitest';
import { gameRules } from '../content';
import { generateMap } from '../map/generate';
import type { GameMap } from '../types';
import { CAMP_COLORS, FOG_COLOR, mapScene, sceneSize, tileCenter, type Shape } from './mapScene';

const [map] = generateMap(7, gameRules.balance);
const hasColor = (shapes: Shape[], color: number) => shapes.some((shape) => shape.color === color);

describe('mapScene', () => {
  it('stays inside the scene', () => {
    const { width, height } = sceneSize(map.size);
    const left = tileCenter(0, map.size - 1, map.size);
    const right = tileCenter(map.size - 1, 0, map.size);
    const bottom = tileCenter(map.size - 1, map.size - 1, map.size);
    expect(left.x).toBeGreaterThanOrEqual(32);
    expect(right.x).toBeLessThanOrEqual(width - 32);
    expect(bottom.y).toBeLessThan(height);
  });

  it('hides everything under the fog', () => {
    const fogged: GameMap = { ...map, tiles: map.tiles.map((tile) => ({ ...tile, explored: false })) };
    const shapes = mapScene(fogged, 'hameau');
    expect(hasColor(shapes, FOG_COLOR)).toBe(true);
    expect(hasColor(shapes, CAMP_COLORS.colony)).toBe(false);
    expect(hasColor(shapes, CAMP_COLORS.rival)).toBe(false);
    expect(shapes.every((shape) => shape.kind === 'poly')).toBe(true);
  });

  it('shows the colony in its colour, and the rival only once explored', () => {
    const shapes = mapScene(map, 'hameau');
    expect(hasColor(shapes, CAMP_COLORS.colony)).toBe(true);
    expect(hasColor(shapes, CAMP_COLORS.rival)).toBe(false);
    const open: GameMap = { ...map, tiles: map.tiles.map((tile) => ({ ...tile, explored: true })) };
    expect(hasColor(mapScene(open, 'hameau'), CAMP_COLORS.rival)).toBe(true);
  });

  it('grows the colony from hamlet to village', () => {
    expect(mapScene(map, 'village').length).toBeGreaterThan(mapScene(map, 'hameau').length);
  });

  it('shows a building', () => {
    const tile = map.tiles.find((candidate) => candidate.explored && candidate.terrain === 'prairie' && !candidate.resource);
    expect(tile).toBeDefined();
    const built: GameMap = {
      ...map,
      tiles: map.tiles.map((candidate) => (candidate === tile ? { ...candidate, building: 'moulin' } : candidate)),
    };
    expect(mapScene(built, 'hameau').length).toBeGreaterThan(mapScene(map, 'hameau').length);
  });
});
