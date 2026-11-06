import { z } from 'zod';
import balance from '../content/balance.json';
import buildings from '../content/buildings.json';
import { balanceSchema, buildingSchema, type AudienceTemplate, type LetterTemplate, type NpcTemplate, technologySchema } from '../content/schemas';
import technologies from '../content/technologies.json';
import type { GameAction, GameRules, GameState, GameText, LanguageProfile, StructuredOrder, Trait } from '../types';
import { applyAction } from './game';

/** Stand-ins for the texts of step 5: only the rules read them here. */
function text(id: string, words: Array<{ text: string; clueId?: string }> = [{ text: id }]): GameText {
  return { id, level: 'A2', segments: words, fr: id };
}

function npc(id: string, traits: [Trait, Trait], arrivesAt?: 'village'): NpcTemplate {
  return {
    id,
    name: id,
    role: id,
    color: '#336699',
    register: 'ordre',
    traits,
    ambition: 'servir',
    ...(arrivesAt ? { arrivesAt } : {}),
    description: text(`npc.${id}`),
  };
}

const perfidious: LetterTemplate = {
  id: 'lettre.perfide',
  from: 'rival',
  intention: 'perfide',
  text: text('lettre.perfide.texte', [{ text: 'Dear friend, ' }, { text: 'we would help', clueId: 'indice.would' }, { text: ' you.' }]),
  clues: [{ id: 'indice.would', level: 'A2', ruleId: 'en-g-will', explanationFr: 'would au lieu de will' }],
  replies: [
    { id: 'poli', text: text('reponse.poli'), effects: { trust: 5, deniers: -1, paysans: 2 } },
    { id: 'sec', text: text('reponse.sec'), effects: { trust: -5 } },
  ],
};

const honest: LetterTemplate = {
  ...perfidious,
  id: 'lettre.honnete',
  intention: 'honnete',
  clues: [],
  text: text('lettre.honnete.texte', [{ text: 'We will help you.' }]),
};

const complaint: AudienceTemplate = {
  id: 'audience.disette',
  petitioner: 'paysan',
  condition: 'disette',
  complaint: text('audience.plainte'),
  summaries: [
    { fr: 'juste', correct: true },
    { fr: 'faux', correct: false },
  ],
  decisions: [
    { id: 'aider', announcement: text('audience.aider'), loyalty: { paysans: 10, marchands: -5 }, deniers: -30 },
    { id: 'ruine', announcement: text('audience.ruine'), loyalty: { paysans: -100, marchands: -100, clerge: -100 }, deniers: 0 },
  ],
};

export const rules: GameRules = {
  balance: balanceSchema.parse(balance),
  buildings: z.array(buildingSchema).parse(buildings),
  technologies: z.array(technologySchema).parse(technologies),
  npcs: [npc('bailli', ['loyal', 'prudent']), npc('interprete', ['ruse', 'cupide']), npc('marchand', ['cupide', 'ambitieux'], 'village')],
  letters: [perfidious, honest],
  audiences: [complaint],
};

export const profile: LanguageProfile = { language: 'en', words: {}, rules: {} };

export function order(fields: Partial<StructuredOrder> = {}): StructuredOrder {
  return {
    destinataire: 'bailli',
    acte: 'ordre',
    verbe: 'construire',
    objet: 'ferme',
    quantite: null,
    lieu: null,
    delai: null,
    condition: null,
    registre: 'imperatif',
    erreurs: [],
    ...fields,
  };
}

export function play(state: GameState, actions: GameAction[], gameRules: GameRules = rules): GameState {
  return actions.reduce((current, action) => applyAction(current, action, gameRules), state);
}

export const toCouncil: GameAction[] = [{ type: 'startSeason', profile }, { type: 'nextPhase' }, { type: 'nextPhase' }];
export const toMail: GameAction[] = [...toCouncil, { type: 'nextPhase' }];
export const wholeSeason: GameAction[] = [...toMail, { type: 'endSeason' }];

export function deepFreeze<T>(value: T): T {
  if (typeof value === 'object' && value !== null) {
    Object.values(value).forEach(deepFreeze);
    Object.freeze(value);
  }
  return value;
}
