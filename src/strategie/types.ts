import type { Level } from '../types';
import type { Act, GameText, PopulationGroup, Resource, TextSegment, Trait } from './content/schemas';

export type { Act, GameText, PopulationGroup, Resource, TextSegment, Trait };

/* ---------- Language: between Filou's review tables and the game ---------- */

export type NodeState = 'grise' | 'en_cours' | 'maitrise' | 'fissure';

/** Snapshot of the learner, taken outside the core at the start of each season. */
export interface LanguageProfile {
  language: 'en';
  /** Words the learner has met, by Filou item id. */
  words: Record<string, NodeState>;
  /** Grammar lessons, by lesson id. */
  rules: Record<string, NodeState>;
}

export type ReviewGrade = 'good' | 'hard' | 'again';

export interface LanguageEvent {
  kind:
    | 'ordre_compris'
    | 'faute_legere'
    | 'ordre_rate'
    | 'mot_consulte'
    | 'indice_repere'
    | 'indice_manque'
    | 'plainte_comprise';
  itemIds: string[];
  grade: ReviewGrade;
}

export type SegmentDisplay = 'clair' | 'transparent' | 'tache';
export type VisibleSegment = TextSegment & { display: SegmentDisplay };

export interface TextCoverage {
  known: number;
  newWords: number;
}

export type { Level };

/* ---------- Orders ---------- */

export type ErrorSeverity = 'sans_gene' | 'imprecision' | 'sens_change' | 'mauvais_registre';

export interface OrderError {
  type: string;
  segment: string;
  gravite: ErrorSeverity;
  /** Ids of the notions at fault, taken from the order's `itemIds` and `ruleIds`. Absent: the whole order answers for it. */
  notionIds?: string[];
}

/** The only form of order the core understands, whatever way it was written. */
export interface StructuredOrder {
  destinataire: string;
  acte: Act;
  verbe: string;
  objet: string | null;
  quantite: number | null;
  lieu: string | null;
  delai: string | null;
  condition: string | null;
  registre: string;
  erreurs: OrderError[];
}

/* ---------- World ---------- */

export type Terrain =
  | 'mer'
  | 'cote'
  | 'prairie'
  | 'champ'
  | 'paturage'
  | 'foret'
  | 'colline'
  | 'montagne'
  | 'marais';

export interface Tile {
  x: number;
  y: number;
  terrain: Terrain;
  resource: Resource | null;
  building: string | null;
  explored: boolean;
}

export interface Place {
  name: string;
  /** Meaning of the name, shown on click. */
  meaningFr: string;
  x: number;
  y: number;
}

export interface GameMap {
  size: number;
  tiles: Tile[];
  colony: Place;
  rival: Place;
}

export type ColonyLevel = 'hameau' | 'village';
export type VillageReward = 'marche' | 'palissade';

export interface Colony {
  level: ColonyLevel;
  deniers: number;
  garrison: number;
  defense: number;
  stocks: Record<Resource, number>;
  groups: Record<PopulationGroup, { size: number; loyalty: number }>;
  /** Waiting for the player's pick after reaching a new level. */
  pendingReward: boolean;
  reward: VillageReward | null;
  /** Consecutive seasons ending with a negative treasury. */
  debtSeasons: number;
}

export interface Npc {
  id: string;
  name: string;
  role: string;
  color: string;
  register: Act;
  traits: [Trait, Trait];
  loyalty: number;
  patience: number;
}

export type LetterIntention = 'honnete' | 'hesitante' | 'perfide';

export interface Faction {
  id: string;
  name: string;
  trust: number;
  fear: number;
  temperament: 'loyal' | 'opportuniste' | 'orgueilleux' | 'prudent';
  intention: LetterIntention;
  /** Season of the planned attack, once treason is decided. */
  attackSeason: number | null;
  strength: number;
}

export interface ReceivedLetter {
  letterId: string;
  season: number;
  replyId: string | null;
  /** The segment the player marked as suspicious: one at most, and final. */
  flagged: number[];
}

export interface ReceivedAudience {
  audienceId: string;
  season: number;
  decisionId: string | null;
}

export interface Report {
  season: number;
  textId: string;
  /** Slot values filled into the text. */
  values: Record<string, string | number>;
}

export interface OrderRecord {
  season: number;
  order: StructuredOrder;
  /** Fired during the season's resolution. */
  executed: boolean;
  /** The NPC asked for a clarification: `season` moved one on, the imprecision no longer counts. */
  delayed: boolean;
}

export type DefeatCause = 'revolte' | 'faillite' | 'ville_prise';

export interface Outcome {
  result: 'fin_de_tranche' | 'defaite';
  cause: DefeatCause | null;
}

export type SeasonPhase = 'rapports' | 'audience' | 'conseil' | 'courrier' | 'bilan';

export interface GameState {
  seed: number;
  /** Generator state: the only source of chance, advanced by pure functions. */
  rng: number;
  season: number;
  phase: SeasonPhase;
  /** Set by `startSeason`, which must come before the reports can be left. */
  seasonStarted: boolean;
  map: GameMap;
  colony: Colony;
  npcs: Npc[];
  rival: Faction;
  technologies: string[];
  letters: ReceivedLetter[];
  audiences: ReceivedAudience[];
  orders: OrderRecord[];
  reports: Report[];
  dictionaryLeft: number;
  /** Word ids looked up, shown in clear for the rest of the game. */
  revealedWords: string[];
  /** Text ids the interpreter has translated. */
  translatedTexts: string[];
  profile: LanguageProfile;
  /** Waiting to be sent to Filou's review tables by the code around the core. */
  languageEvents: LanguageEvent[];
  outcome: Outcome | null;
}

export type GameAction =
  | { type: 'startSeason'; profile: LanguageProfile }
  | { type: 'nextPhase' }
  | { type: 'order'; order: StructuredOrder; itemIds: string[]; ruleIds: string[] }
  | { type: 'decide'; audienceId: string; decisionId: string; understood: boolean; itemIds: string[] }
  | { type: 'answerLetter'; letterId: string; replyId: string }
  | { type: 'flagPassage'; letterId: string; segmentIndex: number }
  | { type: 'lookUp'; itemId: string }
  | { type: 'useInterpreter'; textId: string }
  | { type: 'buyTechnology'; technologyId: string }
  | { type: 'chooseReward'; reward: VillageReward }
  | { type: 'endSeason' }
  /** Drops the first `count` language events once sent. Still allowed after the outcome. */
  | { type: 'ackLanguageEvents'; count: number };

/** Filled from `content/` so the core stays free of JSON imports. */
export interface GameRules {
  balance: import('./content/schemas').Balance;
  buildings: import('./content/schemas').BuildingDef[];
  technologies: import('./content/schemas').TechnologyDef[];
  npcs: import('./content/schemas').NpcTemplate[];
  letters: import('./content/schemas').LetterTemplate[];
  audiences: import('./content/schemas').AudienceTemplate[];
  /** Plugged in by `ai/` and the assembly code. Without them: no treason, no letter, no audience. */
  hooks?: GameHooks;
}

export interface RivalDecision {
  action: 'commercer' | 'attendre' | 'menacer' | 'trahir';
  intention: LetterIntention;
  scores: Record<string, number>;
}

/** What reaches the colony this season, by template id. */
export interface SeasonContent {
  letterIds: string[];
  audienceIds: string[];
}

/**
 * `decideRival` and `pickSeasonContent` are called by `startSeason`, the rival first so
 * its letters can follow its intention. Each receives the generator state and hands back
 * the advanced one. No hook may change the state it reads.
 */
export interface GameHooks {
  decideRival?: (state: GameState, rng: number) => { decision: RivalDecision; rng: number };
  pickSeasonContent?: (state: GameState, rng: number) => { content: SeasonContent; rng: number };
  /** Shows a text as the learner reads it, so a blot cannot be flagged. Without it, nothing is blotted. */
  maskText?: (text: GameText, state: GameState) => VisibleSegment[];
}
