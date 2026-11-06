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
  /** Indexes of the segments the player marked as suspicious. */
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
  | { type: 'endSeason' };

/** Filled from `content/` so the core stays free of JSON imports. */
export interface GameRules {
  balance: import('./content/schemas').Balance;
  buildings: import('./content/schemas').BuildingDef[];
  technologies: import('./content/schemas').TechnologyDef[];
  npcs: import('./content/schemas').NpcTemplate[];
  letters: import('./content/schemas').LetterTemplate[];
  audiences: import('./content/schemas').AudienceTemplate[];
}

export interface RivalDecision {
  action: 'commercer' | 'attendre' | 'menacer' | 'trahir';
  intention: LetterIntention;
  scores: Record<string, number>;
}
