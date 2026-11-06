import type { ColonyLevel, GameMap, Terrain, Tile } from '../types';

export type Shape =
  | { kind: 'poly'; points: number[]; color: number }
  | { kind: 'circle'; x: number; y: number; radius: number; color: number };

export const TILE_WIDTH = 64;
export const TILE_HEIGHT = 32;
const TOP_MARGIN = 44;
const BOTTOM_MARGIN = 10;
const THICKNESS = 6;

export const CAMP_COLORS = { colony: 0x0b7a75, rival: 0xc8324a } as const;
export const cssColor = (color: number): string => `#${color.toString(16).padStart(6, '0')}`;

export const TERRAIN_COLORS: Record<Terrain, number> = {
  mer: 0x4a90c2,
  cote: 0xe4d29b,
  prairie: 0xa5cf74,
  champ: 0xe6c95a,
  paturage: 0x7fc066,
  foret: 0x5a9a58,
  colline: 0xa9a765,
  montagne: 0x9a9088,
  marais: 0x7f9f83,
};
export const FOG_COLOR = 0x6f7480;

const FOG_SIDE = 0x585c66;
const WALL = 0xf3e6cf;
const WALL_SHADE = 0xd8c6a6;
const TIMBER = 0x7a5233;
const TREE = 0x2f6b3c;
const TREE_LIGHT = 0x3f8a4c;
const ROCK_LIGHT = 0xb5aca4;
const ROCK = 0x857b73;
const SNOW = 0xf6f6f6;

export function sceneSize(size: number): { width: number; height: number } {
  return { width: size * TILE_WIDTH, height: size * TILE_HEIGHT + TOP_MARGIN + BOTTOM_MARGIN + THICKNESS };
}

/** Middle of a tile's top face. */
export function tileCenter(x: number, y: number, size: number): { x: number; y: number } {
  return { x: ((x - y + size) * TILE_WIDTH) / 2, y: ((x + y + 1) * TILE_HEIGHT) / 2 + TOP_MARGIN };
}

function shade(color: number, factor: number): number {
  const channel = (shift: number) => Math.round(((color >> shift) & 0xff) * factor);
  return (channel(16) << 16) | (channel(8) << 8) | channel(0);
}

const poly = (points: number[], color: number): Shape => ({ kind: 'poly', points, color });
const circle = (x: number, y: number, radius: number, color: number): Shape => ({ kind: 'circle', x, y, radius, color });

function diamond(x: number, y: number, color: number, side: number, depth: number): Shape[] {
  const w = TILE_WIDTH / 2;
  const h = TILE_HEIGHT / 2;
  const edges =
    depth > 0
      ? [
          poly([x - w, y, x, y + h, x, y + h + depth, x - w, y + depth], side),
          poly([x + w, y, x, y + h, x, y + h + depth, x + w, y + depth], shade(side, 0.85)),
        ]
      : [];
  return [...edges, poly([x, y - h, x + w, y, x, y + h, x - w, y], color)];
}

/** A tree: the two halves of a cone. */
function cone(x: number, y: number, width: number, height: number): Shape[] {
  return [poly([x - width, y, x, y - height, x, y + 2], TREE_LIGHT), poly([x + width, y, x, y - height, x, y + 2], TREE)];
}

function mountain(x: number, y: number): Shape[] {
  return [
    poly([x - 22, y + 6, x, y - 32, x, y + 12], ROCK_LIGHT),
    poly([x + 22, y + 6, x, y - 32, x, y + 12], ROCK),
    poly([x - 7, y - 20, x, y - 32, x + 7, y - 20, x, y - 17], SNOW),
  ];
}

/** A cube with a roof. */
function house(x: number, y: number, width: number, height: number, roof: number, wall = WALL): Shape[] {
  const half = width / 2;
  const top = y - height;
  return [
    poly([x - width, y, x, y + half, x, top + half, x - width, top], wall),
    poly([x + width, y, x, y + half, x, top + half, x + width, top], shade(wall, 0.86)),
    poly([x - width, top, x, top + half, x, top - width * 1.1], roof),
    poly([x + width, top, x, top + half, x, top - width * 1.1], shade(roof, 0.8)),
  ];
}

function bellTower(x: number, y: number, roof: number): Shape[] {
  return [...house(x, y, 5, 24, roof, WALL_SHADE), circle(x - 2, y - 15, 1.6, TIMBER)];
}

function flag(x: number, y: number, color: number): Shape[] {
  return [
    poly([x - 1, y, x + 1, y, x + 1, y - 26, x - 1, y - 26], TIMBER),
    poly([x + 1, y - 26, x + 15, y - 21, x + 1, y - 16], color),
  ];
}

/** Stakes around a city, drawn in two rows so that the houses stand between them. */
function palisade(x: number, y: number, row: 'back' | 'front'): Shape[] {
  return [-26, -18, -10, -2, 6, 14, 22].map((dx) => {
    const offset = (14 - Math.abs(dx) / 2) * (row === 'back' ? -1 : 1);
    return poly([x + dx - 2, y + offset, x + dx + 2, y + offset, x + dx + 2, y + offset - 9, x + dx - 2, y + offset - 9], TIMBER);
  });
}

function stall(x: number, y: number, color: number): Shape[] {
  return [
    poly([x - 6, y, x - 5, y, x - 5, y - 8, x - 6, y - 8], TIMBER),
    poly([x + 5, y, x + 6, y, x + 6, y - 8, x + 5, y - 8], TIMBER),
    poly([x - 8, y - 8, x + 8, y - 8, x + 5, y - 13, x - 5, y - 13], color),
  ];
}

const HOUSE_SPOTS: Record<ColonyLevel, readonly (readonly [number, number])[]> = {
  hameau: [
    [10, -1],
    [-11, 2],
  ],
  village: [
    [-1, -7],
    [14, -2],
    [-16, 1],
    [3, 7],
  ],
};

function city(tile: Tile, center: { x: number; y: number }, level: ColonyLevel, color: number): Shape[] {
  const { x, y } = center;
  return [
    ...(tile.building === 'palissade' ? palisade(x, y, 'back') : []),
    ...flag(x - 2, y - 12, color),
    ...(level === 'village' ? bellTower(x + 4, y - 9, color) : []),
    ...HOUSE_SPOTS[level].flatMap(([dx, dy]) => house(x + dx, y + dy, 8, 8, color)),
    ...(tile.building === 'marche' ? stall(x + 18, y + 8, color) : []),
    ...(tile.building === 'palissade' ? palisade(x, y, 'front') : []),
  ];
}

function terrainFeature(tile: Tile, x: number, y: number): Shape[] {
  switch (tile.terrain) {
    case 'foret':
      return [...cone(x - 11, y - 1, 8, 20), ...cone(x + 11, y - 3, 8, 20), ...cone(x, y + 7, 9, 22)];
    case 'montagne':
      return mountain(x, y);
    case 'colline':
      return [poly([x - 20, y + 5, x - 7, y - 8, x + 7, y + 5], 0x8f8e54), poly([x - 2, y + 7, x + 9, y - 4, x + 20, y + 7], 0x989752)];
    case 'marais':
      return [circle(x - 10, y + 1, 3, 0x4f7f78), circle(x + 8, y - 4, 2.5, 0x4f7f78), circle(x + 5, y + 7, 2, 0x4f7f78)];
    default:
      return [];
  }
}

function sheaf(x: number, y: number): Shape {
  return poly([x - 3, y + 3, x, y - 8, x + 3, y + 3], 0xc99a2e);
}

function resourceFeature(tile: Tile, x: number, y: number): Shape[] {
  switch (tile.resource) {
    case 'ble':
      return [sheaf(x, y - 6), sheaf(x - 9, y), sheaf(x + 9, y), sheaf(x, y + 4)];
    case 'poisson':
      return [
        poly([x - 11, y + 1, x + 11, y + 1, x + 6, y + 7, x - 6, y + 7], TIMBER),
        poly([x, y + 1, x, y - 14, x + 9, y + 1], WALL),
      ];
    case 'laine':
      return [
        circle(x, y, 6, 0xffffff),
        circle(x + 6, y - 2, 4, 0xffffff),
        circle(x - 6, y - 1, 4, 0xffffff),
        circle(x + 10, y - 3, 2.5, 0x33302c),
      ];
    case 'sel':
      return [poly([x - 8, y + 5, x, y - 7, x + 8, y + 5], 0xfafafa)];
    case 'argent':
      return [
        poly([x - 6, y + 11, x - 6, y + 3, x, y - 1, x + 6, y + 3, x + 6, y + 11], 0x2f2a28),
        circle(x + 11, y + 8, 2.5, 0xd8dde3),
      ];
    default:
      return [];
  }
}

function buildingFeature(tile: Tile, x: number, y: number): Shape[] {
  switch (tile.building) {
    case 'ferme':
      return house(x + 10, y + 8, 8, 8, 0xa84a32);
    case 'bergerie':
      return house(x - 10, y + 8, 9, 6, 0x7a5233);
    case 'pecherie':
      return house(x - 12, y + 6, 7, 8, 0x3f6f8f);
    case 'moulin':
      return [
        ...house(x, y + 8, 7, 18, 0x7a5233),
        poly([x - 14, y - 11, x + 14, y - 15, x + 14, y - 13, x - 14, y - 9], TIMBER),
        poly([x - 1, y - 26, x + 1, y - 26, x + 1, y + 2, x - 1, y + 2], TIMBER),
      ];
    default:
      return [];
  }
}

/** Everything the map shows, back to front. Fog hides the terrain and whatever stands on it. */
export function mapScene(map: GameMap, level: ColonyLevel): Shape[] {
  const tiles = [...map.tiles].sort((a, b) => a.x + a.y - (b.x + b.y) || a.x - b.x);
  const isAt = (tile: Tile, place: { x: number; y: number }) => tile.x === place.x && tile.y === place.y;

  return tiles.flatMap((tile) => {
    const { x, y } = tileCenter(tile.x, tile.y, map.size);
    if (!tile.explored) return diamond(x, y, FOG_COLOR, FOG_SIDE, THICKNESS);

    const color = TERRAIN_COLORS[tile.terrain];
    const ground = diamond(x, y, color, shade(color, 0.72), tile.terrain === 'mer' ? 0 : THICKNESS);
    if (isAt(tile, map.colony)) return [...ground, ...city(tile, { x, y }, level, CAMP_COLORS.colony)];
    if (isAt(tile, map.rival)) return [...ground, ...city(tile, { x, y }, 'village', CAMP_COLORS.rival)];
    return [...ground, ...terrainFeature(tile, x, y), ...resourceFeature(tile, x, y), ...buildingFeature(tile, x, y)];
  });
}
