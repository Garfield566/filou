import { createNoise2D } from 'simplex-noise';
import { shuffle, type Rng } from '../../lib/random';
import type { Balance } from '../content/schemas';
import { cursor, pick } from '../core/rng';
import type { GameMap, Place, Resource, Terrain, Tile } from '../types';

/** Share of the tiles given to each terrain. Ranks, not thresholds: every map has them all. */
const SEA_SHARE = 0.17;
const COAST_SHARE = 0.13;
const MARSH_SHARE = 0.07;
const MOUNTAIN_SHARE = 0.06;
const HILL_SHARE = 0.07;
const LOWLAND: readonly Terrain[] = ['foret', 'paturage', 'champ', 'prairie'];

const NOISE_SCALE = 0.17;
/** How strongly the land rises away from the shore picked for this map. */
const SHORE_SLOPE = 1.3;
const RESOURCE_CHANCE = 0.45;

/** What the colony can always exploit without exploring: its way to the Village. */
const STARTING_FIELDS = 2;
const STARTING_COASTS = 2;

const CITY_TERRAINS: readonly Terrain[] = ['prairie', 'champ', 'paturage', 'colline', 'foret'];

/** The GDD's resource table. Salt sits only in coastal marshes. */
const RESOURCE_TERRAIN: Record<Resource, Terrain> = {
  ble: 'champ',
  poisson: 'cote',
  laine: 'paturage',
  bois: 'foret',
  sel: 'marais',
  argent: 'montagne',
};
const RESOURCES = Object.keys(RESOURCE_TERRAIN) as Resource[];

/** The colony needs wheat and fish to grow: only these others may be missing from a camp. */
const SCARCE: readonly Resource[] = ['laine', 'bois', 'sel', 'argent'];

const NAME_STARTS = [
  { en: 'Ash', word: 'ash', fr: 'aux frênes', gloss: 'frêne' },
  { en: 'Oak', word: 'oak', fr: 'aux chênes', gloss: 'chêne' },
  { en: 'Elm', word: 'elm', fr: 'aux ormes', gloss: 'orme' },
  { en: 'Thorn', word: 'thorn', fr: 'aux épines', gloss: 'épine' },
  { en: 'Mill', word: 'mill', fr: 'du moulin', gloss: 'moulin' },
  { en: 'Salt', word: 'salt', fr: 'du sel', gloss: 'sel' },
  { en: 'Sand', word: 'sand', fr: 'de sable', gloss: 'sable' },
  { en: 'Clay', word: 'clay', fr: "d'argile", gloss: 'argile' },
  { en: 'Stan', word: 'stān, en vieil anglais', fr: 'de pierre', gloss: 'pierre' },
  { en: 'Ship', word: 'scēap, en vieil anglais', fr: 'aux moutons', gloss: 'mouton' },
];

const NAME_ENDS = [
  { en: 'ford', fr: 'Gué', gloss: 'gué' },
  { en: 'bury', fr: 'Place forte', gloss: 'place forte' },
  { en: 'ton', fr: 'Ferme', gloss: 'ferme' },
];

export type Camp = 'colony' | 'rival';

type Grid = Pick<GameMap, 'size' | 'tiles'>;
type Spot = { x: number; y: number };

export function tileAt(grid: Grid, x: number, y: number): Tile | undefined {
  if (x < 0 || y < 0 || x >= grid.size || y >= grid.size) return undefined;
  return grid.tiles[y * grid.size + x];
}

export function isLand(tile: Tile): boolean {
  return tile.terrain !== 'mer';
}

/** Distance counting diagonals as one step: the shape of the revealed square. */
export function reach(a: Spot, b: Spot): number {
  return Math.max(Math.abs(a.x - b.x), Math.abs(a.y - b.y));
}

function walk(a: Spot, b: Spot): number {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

/** A tile belongs to the nearer city; the colony keeps ties. */
export function campOf(map: Pick<GameMap, 'colony' | 'rival'>, tile: Spot): Camp {
  return walk(tile, map.colony) <= walk(tile, map.rival) ? 'colony' : 'rival';
}

export function campResources(map: GameMap, camp: Camp): Set<Resource> {
  const found = new Set<Resource>();
  for (const tile of map.tiles) {
    if (tile.resource && campOf(map, tile) === camp) found.add(tile.resource);
  }
  return found;
}

function isCoastal(grid: Grid, tile: Tile): boolean {
  return [[1, 0], [-1, 0], [0, 1], [0, -1]].some(([dx, dy]) => {
    const terrain = tileAt(grid, tile.x + dx, tile.y + dy)?.terrain;
    return terrain === 'mer' || terrain === 'cote';
  });
}

function buildTerrain(size: number, rng: Rng): Tile[] {
  const height = createNoise2D(rng);
  const wetness = createNoise2D(rng);
  const shore = Math.floor(rng() * 4);
  const shoreDistance = (x: number, y: number) => [x, size - 1 - x, y, size - 1 - y][shore];

  const cells = Array.from({ length: size * size }, (_, index) => {
    const x = index % size;
    const y = Math.floor(index / size);
    return {
      x,
      y,
      index,
      height: height(x * NOISE_SCALE, y * NOISE_SCALE) + (SHORE_SLOPE * shoreDistance(x, y)) / size,
      wet: wetness(x * NOISE_SCALE, y * NOISE_SCALE),
    };
  });

  const total = cells.length;
  const sea = Math.round(total * SEA_SHARE);
  const coast = sea + Math.round(total * COAST_SHARE);
  const marsh = coast + Math.round(total * MARSH_SHARE);
  const mountain = total - Math.round(total * MOUNTAIN_SHARE);
  const hill = mountain - Math.round(total * HILL_SHARE);

  const terrains = new Array<Terrain | undefined>(total).fill(undefined);
  [...cells]
    .sort((a, b) => a.height - b.height || a.index - b.index)
    .forEach((cell, rank) => {
      if (rank < sea) terrains[cell.index] = 'mer';
      else if (rank < coast) terrains[cell.index] = 'cote';
      else if (rank < marsh) terrains[cell.index] = 'marais';
      else if (rank >= mountain) terrains[cell.index] = 'montagne';
      else if (rank >= hill) terrains[cell.index] = 'colline';
    });

  const lowland = cells.filter((cell) => !terrains[cell.index]).sort((a, b) => a.wet - b.wet || a.index - b.index);
  lowland.forEach((cell, rank) => {
    terrains[cell.index] = LOWLAND[Math.floor((rank * LOWLAND.length) / lowland.length)];
  });

  return cells.map((cell) => ({
    x: cell.x,
    y: cell.y,
    terrain: terrains[cell.index] as Terrain,
    resource: null,
    building: null,
    explored: false,
  }));
}

function placeResources(grid: Grid, rng: Rng): void {
  for (const tile of grid.tiles) {
    const resource = RESOURCES.find((item) => RESOURCE_TERRAIN[item] === tile.terrain);
    const lucky = rng() < RESOURCE_CHANCE;
    if (!resource || !lucky) continue;
    if (resource === 'sel' && !isCoastal(grid, tile)) continue;
    tile.resource = resource;
  }
}

function pickCities(grid: Grid, balance: Balance['map'], rng: Rng): { colony: Tile; rival: Tile } {
  const sites = grid.tiles.filter((tile) => CITY_TERRAINS.includes(tile.terrain));
  const nearby = (site: Tile, terrain: Terrain) =>
    grid.tiles.filter((tile) => tile.terrain === terrain && tile !== site && reach(tile, site) <= balance.revealRadius).length;
  const scored = sites
    .map((site) => ({
      site,
      value: Math.min(nearby(site, 'champ'), STARTING_FIELDS) + Math.min(nearby(site, 'cote'), STARTING_COASTS) + rng(),
    }))
    .sort((a, b) => b.value - a.value);

  const opponents = (site: Tile) => sites.filter((tile) => reach(tile, site) >= balance.citySeparation);
  const colony = (scored.find((entry) => opponents(entry.site).length > 0) ?? scored[0]).site;
  const distant = opponents(colony);
  const farthest = [...sites].sort((a, b) => reach(b, colony) - reach(a, colony))[0];
  return { colony, rival: distant.length > 0 ? pick(distant, rng) : farthest };
}

function makeNames(rng: Rng): [Pick<Place, 'name' | 'meaningFr'>, Pick<Place, 'name' | 'meaningFr'>] {
  const [first, second] = shuffle(NAME_STARTS, rng);
  const make = (start: (typeof NAME_STARTS)[number]) => {
    const end = pick(NAME_ENDS, rng);
    return {
      name: start.en + end.en,
      meaningFr: `${end.fr} ${start.fr} (${start.word} : ${start.gloss} ; -${end.en} : ${end.gloss})`,
    };
  };
  return [make(first), make(second)];
}

/**
 * Makes sure `count` tiles of the zone carry the resource, reshaping the land
 * if the noise did not. The coast stays, or a salt marsh could lose its shore.
 */
function ensure(zone: Tile[], resource: Resource, count: number, city: Place, fits: (tile: Tile) => boolean): void {
  for (let have = zone.filter((tile) => tile.resource === resource).length; have < count; have++) {
    const closest = zone
      .filter((tile) => tile.resource !== resource && (tile.terrain !== 'cote' || resource === 'poisson') && fits(tile))
      .sort((a, b) => walk(a, city) - walk(b, city) || a.y - b.y || a.x - b.x);
    const tile = closest.find((candidate) => candidate.resource === null) ?? closest[0];
    if (!tile) return;
    tile.terrain = RESOURCE_TERRAIN[resource];
    tile.resource = resource;
  }
}

function zones(map: GameMap) {
  const cities = [tileAt(map, map.colony.x, map.colony.y), tileAt(map, map.rival.x, map.rival.y)];
  const open = map.tiles.filter((tile) => isLand(tile) && !cities.includes(tile));
  return {
    camp: (camp: Camp) => open.filter((tile) => campOf(map, tile) === camp),
    start: (radius: number) => open.filter((tile) => reach(tile, map.colony) <= radius),
  };
}

/** The colony's way to the Village must be in sight, since nothing explores in phase 1. */
function secureStart(map: GameMap, radius: number): void {
  const near = zones(map).start(radius);
  ensure(near, 'ble', STARTING_FIELDS, map.colony, (tile) => tile.resource !== 'poisson');
  ensure(near, 'poisson', STARTING_COASTS, map.colony, (tile) => tile.resource !== 'ble');
}

/** Chooses what each camp lacks, then makes the land agree (GDD 6). */
function shareScarcity(map: GameMap, rng: Rng): void {
  const { camp } = zones(map);
  const fits = (resource: Resource) => (tile: Tile) =>
    tile.resource !== 'ble' && tile.resource !== 'poisson' && (resource !== 'sel' || isCoastal(map, tile));
  const canHost = (zone: Tile[], resource: Resource) => zone.some((tile) => tile.terrain !== 'cote' && fits(resource)(tile));

  const pool = shuffle(SCARCE, rng);
  const colonyLacks = pool.find((resource) => canHost(camp('rival'), resource)) as Resource;
  const rivalLacks = pool.find((resource) => resource !== colonyLacks && canHost(camp('colony'), resource)) as Resource;

  for (const tile of map.tiles) {
    const lacked = campOf(map, tile) === 'colony' ? colonyLacks : rivalLacks;
    if (tile.resource === lacked) tile.resource = null;
  }
  ensure(camp('rival'), colonyLacks, 1, map.rival, fits(colonyLacks));
  ensure(camp('colony'), rivalLacks, 1, map.colony, fits(rivalLacks));
}

/** Reads the generator state and hands back the advanced one with the map. */
export function generateMap(rngState: number, balance: Pick<Balance, 'mapSize' | 'map'>): [GameMap, number] {
  const { rng, state } = cursor(rngState);
  const size = balance.mapSize;
  const tiles = buildTerrain(size, rng);
  const grid = { size, tiles };
  placeResources(grid, rng);

  const sites = pickCities(grid, balance.map, rng);
  sites.colony.resource = null;
  sites.rival.resource = null;
  const [colonyName, rivalName] = makeNames(rng);
  const map: GameMap = {
    size,
    tiles,
    colony: { ...colonyName, x: sites.colony.x, y: sites.colony.y },
    rival: { ...rivalName, x: sites.rival.x, y: sites.rival.y },
  };

  secureStart(map, balance.map.revealRadius);
  shareScarcity(map, rng);

  for (const tile of tiles) tile.explored = reach(tile, map.colony) <= balance.map.revealRadius;
  return [map, state()];
}
