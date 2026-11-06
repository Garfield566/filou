import { z } from 'zod';

/**
 * Every piece of game content is plain JSON checked by these schemas.
 * Numbers and texts therefore change without touching the rules.
 */

export const resourceSchema = z.enum(['ble', 'poisson', 'laine', 'bois', 'sel', 'argent']);
export const groupSchema = z.enum(['paysans', 'marchands', 'clerge']);
export const actSchema = z.enum(['ordre', 'requete', 'supplique']);
export const levelSchema = z.enum(['A1', 'A2', 'B1', 'B2', 'C1', 'C2']);
export const traitSchema = z.enum([
  'loyal',
  'ambitieux',
  'cupide',
  'pieux',
  'orgueilleux',
  'prudent',
  'maladroit',
  'ruse',
]);
export const lexicalFieldSchema = z.enum([
  'commerce',
  'guerre',
  'droit',
  'construction',
  'religion',
  'administration',
  'vie_quotidienne',
]);

/** One run of a text. A word carrying `wordId` can be masked by an ink blot. */
export const textSegmentSchema = z.object({
  text: z.string().min(1),
  wordId: z.string().optional(),
  clueId: z.string().optional(),
});

export const gameTextSchema = z.object({
  id: z.string().min(1),
  level: levelSchema,
  segments: z.array(textSegmentSchema).min(1),
  fr: z.string().min(1),
  /** Set only for texts without variable slots: those have a pre-generated voice. */
  audio: z.string().optional(),
});

export const clueSchema = z.object({
  id: z.string().min(1),
  level: z.enum(['A2', 'B1']),
  /** Grammar lesson carrying the clue, such as `en-g-will`. */
  ruleId: z.string().min(1),
  explanationFr: z.string().min(1),
});

export const letterSchema = z.object({
  id: z.string().min(1),
  from: z.string().min(1),
  intention: z.enum(['honnete', 'hesitante', 'perfide']),
  text: gameTextSchema,
  clues: z.array(clueSchema),
  replies: z.array(z.object({ id: z.string().min(1), text: gameTextSchema, effects: z.record(z.string(), z.number()) })).min(2),
});

export const audienceSchema = z.object({
  id: z.string().min(1),
  petitioner: z.string().min(1),
  /** Rule state that triggers this complaint, such as `disette`. */
  condition: z.string().min(1),
  complaint: gameTextSchema,
  summaries: z.array(z.object({ fr: z.string().min(1), correct: z.boolean() })).min(2),
  decisions: z
    .array(
      z.object({
        id: z.string().min(1),
        announcement: gameTextSchema,
        loyalty: z.partialRecord(groupSchema, z.number()),
        deniers: z.number(),
      }),
    )
    .min(2),
});

export const orderOptionSchema = z.object({
  text: gameTextSchema,
  correct: z.boolean(),
  /** What the mistake costs when this wording is chosen. */
  gravite: z.enum(['sans_gene', 'imprecision', 'sens_change', 'mauvais_registre']).optional(),
  errorType: z.string().optional(),
  explanationFr: z.string().optional(),
});

export const orderTemplateSchema = z.object({
  id: z.string().min(1),
  npcId: z.string().min(1),
  acte: actSchema,
  verbe: z.string().min(1),
  objet: z.string().nullable(),
  /** Grammar lesson practised by this order. */
  ruleId: z.string().min(1),
  frenchIntent: z.string().min(1),
  options: z.array(orderOptionSchema).min(3),
  /** Blocks of the correct sentence, in order, for assemble mode. */
  blocks: z.array(z.string().min(1)).min(2),
  distractorBlocks: z.array(z.string().min(1)),
});

export const npcTemplateSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  role: z.string().min(1),
  /** Colour of the pawn. */
  color: z.string().regex(/^#[0-9a-f]{6}$/i),
  register: actSchema,
  traits: z.tuple([traitSchema, traitSchema]),
  ambition: z.string().min(1),
  description: gameTextSchema,
});

export const buildingSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  cost: z.number().int().positive(),
  terrain: z.string().nullable(),
  produces: resourceSchema.nullable(),
  amount: z.number(),
  requires: z.string().nullable(),
});

export const technologySchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  branch: z.enum(['commerce', 'diplomatie', 'savoir']),
  tier: z.union([z.literal(1), z.literal(2)]),
  requires: z.string().nullable(),
  /** Linguistic notion that lowers the price once mastered. */
  discountRuleId: z.string().nullable(),
  effect: z.string().min(1),
  /** Named but not playable until phase 2. */
  available: z.boolean(),
});

export const balanceSchema = z.object({
  seasons: z.number().int().positive(),
  mapSize: z.number().int().positive(),
  start: z.object({ deniers: z.number(), garrison: z.number(), loyalty: z.number() }),
  income: z.object({ hameau: z.number(), village: z.number() }),
  villageNeeds: z.object({ ble: z.number(), poisson: z.number() }),
  rewards: z.object({ marcheDeniers: z.number(), palissadeDefense: z.number() }),
  technology: z.object({ tier1: z.number(), tier2: z.number(), masteredDiscount: z.number() }),
  stranger: z.object({ dictionary: z.number(), interpreterCost: z.number(), patience: z.number() }),
  betrayal: z.object({ letterSeasons: z.array(z.number()), attackSeason: z.number(), attackStrength: z.number() }),
  bankruptcySeasons: z.number().int().positive(),
});

export const lexiconEntrySchema = z.object({
  target: z.string().min(1),
  fr: z.string().min(1),
  pos: z.string().min(1),
  plural: z.string().nullable(),
  domain: lexicalFieldSchema,
  sentences: z.array(z.object({ id: z.string().min(1), text: z.string().min(1), fr: z.string().min(1) })).min(1),
});

export type GameText = z.infer<typeof gameTextSchema>;
export type TextSegment = z.infer<typeof textSegmentSchema>;
export type Clue = z.infer<typeof clueSchema>;
export type LetterTemplate = z.infer<typeof letterSchema>;
export type AudienceTemplate = z.infer<typeof audienceSchema>;
export type OrderTemplate = z.infer<typeof orderTemplateSchema>;
export type NpcTemplate = z.infer<typeof npcTemplateSchema>;
export type BuildingDef = z.infer<typeof buildingSchema>;
export type TechnologyDef = z.infer<typeof technologySchema>;
export type Balance = z.infer<typeof balanceSchema>;
export type LexiconEntry = z.infer<typeof lexiconEntrySchema>;
export type Resource = z.infer<typeof resourceSchema>;
export type PopulationGroup = z.infer<typeof groupSchema>;
export type Act = z.infer<typeof actSchema>;
export type Trait = z.infer<typeof traitSchema>;
export type LexicalField = z.infer<typeof lexicalFieldSchema>;
