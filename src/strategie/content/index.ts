import { z } from 'zod';
import { createGameHooks } from '../ai';
import { englishVocabulary } from '../language/mask';
import type { GameRules } from '../types';
import audiencesJson from './audiences.json';
import balanceJson from './balance.json';
import buildingsJson from './buildings.json';
import lettersJson from './letters.json';
import npcsJson from './npcs.json';
import ordersJson from './orders.json';
import reportLabelsJson from './report-labels.json';
import reportsJson from './reports.json';
import {
  audienceSchema,
  balanceSchema,
  buildingSchema,
  type GameText,
  letterSchema,
  npcTemplateSchema,
  orderTemplateSchema,
  reportLabelsSchema,
  reportSchema,
  technologySchema,
} from './schemas';
import technologiesJson from './technologies.json';

export const npcs = z.array(npcTemplateSchema).parse(npcsJson);
export const orders = z.array(orderTemplateSchema).parse(ordersJson);
export const letters = z.array(letterSchema).parse(lettersJson);
export const audiences = z.array(audienceSchema).parse(audiencesJson);
export const reports = z.array(reportSchema).parse(reportsJson);
export const reportLabels = reportLabelsSchema.parse(reportLabelsJson);

const balance = balanceSchema.parse(balanceJson);

export const gameRules: GameRules = {
  balance,
  buildings: z.array(buildingSchema).parse(buildingsJson),
  technologies: z.array(technologySchema).parse(technologiesJson),
  npcs,
  letters,
  audiences,
  hooks: createGameHooks({ balance, letters, audiences }),
};

/** Course words the texts use beyond the game lexicon; `content.test.ts` checks they exist. */
export const COURSE_WORD_IDS = ['en:grateful'];

/** Names of the NPCs and of the petitioners, as they appear in the texts. */
export const properNouns = [...npcs.flatMap((npc) => npc.name.split(' ')), ...audiences.map((audience) => audience.petitioner)];

export const gameVocabulary = englishVocabulary(properNouns, COURSE_WORD_IDS);

/** Every text the player can meet, in any language form. */
export function allGameTexts(): GameText[] {
  return [
    ...npcs.map((npc) => npc.description),
    ...orders.flatMap((order) => order.options.map((option) => option.text)),
    ...letters.flatMap((letter) => [letter.text, ...letter.replies.map((reply) => reply.text)]),
    ...audiences.flatMap((audience) => [audience.complaint, ...audience.decisions.map((decision) => decision.announcement)]),
    ...reports.map((report) => report.text),
    ...Object.values(reportLabels).flatMap((labels) => Object.values(labels)),
  ];
}
