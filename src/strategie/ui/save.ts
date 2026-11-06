import { z } from 'zod';
import { groupSchema, resourceSchema } from '../content/schemas';
import type { GameState } from '../types';
import type { Touched } from './notions';
import type { OrderNote } from './orders';

export const SAVE_VERSION = 1;

/** The game, plus what only the screens keep. Filou's review tables are never in here. */
export interface SaveFile {
  version: typeof SAVE_VERSION;
  state: GameState;
  orderNotes: OrderNote[];
  touched: Touched;
}

const DATABASE = 'filou-strategie';
const STORE = 'saves';
const SLOT = 'en-cours';

const nodeState = z.enum(['grise', 'en_cours', 'maitrise', 'fissure']);
const severity = z.enum(['sans_gene', 'imprecision', 'sens_change', 'mauvais_registre']);
const place = z.looseObject({ name: z.string(), meaningFr: z.string(), x: z.number(), y: z.number() });
const tile = z.looseObject({
  x: z.number(),
  y: z.number(),
  terrain: z.string(),
  resource: resourceSchema.nullable(),
  building: z.string().nullable(),
  explored: z.boolean(),
});

/** What the screens and the rules read without checking. An import comes from outside the game. */
const stateSchema = z.looseObject({
  seed: z.number(),
  rng: z.number(),
  season: z.number().int().positive(),
  phase: z.enum(['rapports', 'audience', 'conseil', 'courrier', 'bilan']),
  seasonStarted: z.boolean(),
  map: z
    .looseObject({ size: z.number().int().positive(), tiles: z.array(tile), colony: place, rival: place })
    .refine((map) => map.tiles.length === map.size * map.size),
  colony: z.looseObject({
    level: z.enum(['hameau', 'village']),
    deniers: z.number(),
    garrison: z.number(),
    defense: z.number(),
    stocks: z.record(resourceSchema, z.number()),
    groups: z.record(groupSchema, z.looseObject({ size: z.number(), loyalty: z.number() })),
    pendingReward: z.boolean(),
    reward: z.enum(['marche', 'palissade']).nullable(),
    debtSeasons: z.number(),
  }),
  npcs: z.array(z.looseObject({ id: z.string(), name: z.string(), color: z.string(), loyalty: z.number() })),
  rival: z.looseObject({ id: z.string(), name: z.string(), attackSeason: z.number().nullable() }),
  technologies: z.array(z.string()),
  letters: z.array(
    z.looseObject({ letterId: z.string(), season: z.number(), replyId: z.string().nullable(), flagged: z.array(z.number()) }),
  ),
  audiences: z.array(z.looseObject({ audienceId: z.string(), season: z.number(), decisionId: z.string().nullable() })),
  orders: z.array(z.looseObject({ season: z.number(), order: z.looseObject({ destinataire: z.string() }) })),
  reports: z.array(
    z.looseObject({ season: z.number(), textId: z.string(), values: z.record(z.string(), z.union([z.string(), z.number()])) }),
  ),
  dictionaryLeft: z.number(),
  revealedWords: z.array(z.string()),
  translatedTexts: z.array(z.string()),
  profile: z.looseObject({
    language: z.literal('en'),
    words: z.record(z.string(), nodeState),
    rules: z.record(z.string(), nodeState),
  }),
  languageEvents: z.array(z.looseObject({ itemIds: z.array(z.string()), grade: z.enum(['good', 'hard', 'again']) })),
  outcome: z.looseObject({ result: z.string() }).nullable(),
});

const noteSchema = z.object({
  season: z.number(),
  templateId: z.string(),
  npcId: z.string(),
  said: z.string(),
  correct: z.string(),
  errors: z.array(z.object({ gravite: severity, explanationFr: z.string() })),
});

const saveSchema = z.object({
  version: z.literal(SAVE_VERSION),
  state: stateSchema,
  orderNotes: z.array(noteSchema),
  touched: z.record(z.string(), z.object({ before: nodeState, good: z.number(), hard: z.number(), again: z.number() })),
});

export function serializeSave(save: SaveFile): string {
  return JSON.stringify(save);
}

/** Null for anything that is not a save of this version. */
export function parseSave(json: string): SaveFile | null {
  try {
    const parsed = saveSchema.safeParse(JSON.parse(json));
    return parsed.success ? (parsed.data as unknown as SaveFile) : null;
  } catch {
    return null;
  }
}

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DATABASE, 1);
    request.onupgradeneeded = () => request.result.createObjectStore(STORE);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
    request.onblocked = () => reject(new Error('Base bloquée'));
  });
}

async function withStore<T>(mode: IDBTransactionMode, run: (store: IDBObjectStore) => IDBRequest<T>): Promise<T> {
  const database = await openDatabase();
  return new Promise<T>((resolve, reject) => {
    const transaction = database.transaction(STORE, mode);
    const request = run(transaction.objectStore(STORE));
    transaction.oncomplete = () => {
      database.close();
      resolve(request.result);
    };
    transaction.onerror = transaction.onabort = () => {
      database.close();
      reject(transaction.error);
    };
  });
}

/** Without IndexedDB, or with a corrupt save, there is simply nothing to resume. */
export async function readSave(): Promise<SaveFile | null> {
  try {
    const json = await withStore<unknown>('readonly', (store) => store.get(SLOT));
    return typeof json === 'string' ? parseSave(json) : null;
  } catch {
    return null;
  }
}

/** Says whether the save went through, so the page can warn; the game goes on either way. */
export async function writeSave(save: SaveFile): Promise<boolean> {
  try {
    await withStore('readwrite', (store) => store.put(serializeSave(save), SLOT));
    return true;
  } catch {
    return false;
  }
}

export function downloadSave(save: SaveFile): boolean {
  try {
    const url = URL.createObjectURL(new Blob([serializeSave(save)], { type: 'application/json' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = `filou-strategie-saison-${save.state.season}.json`;
    link.click();
    URL.revokeObjectURL(url);
    return true;
  } catch {
    return false;
  }
}
