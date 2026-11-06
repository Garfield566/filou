import type { Memory } from '../../lib/memory';
import type { OrderTemplate } from '../content/schemas';
import type { ErrorSeverity, NodeState, OrderError, StructuredOrder } from '../types';
import { plainText, stableShuffle, wordIdsOf } from './text';

export type OrderMode = 'choisir' | 'assembler';
type OrderOption = OrderTemplate['options'][number];

/** Half-way, on a log scale, from a first success (half a day) to mastery (seven days). To be checked in play. */
const WEAK_HALF_LIFE = 2;

export const MISSING_EXPLANATION = 'La formulation attendue est rappelée ici.';
export const ASSEMBLY_EXPLANATION =
  "Les blocs ne forment pas la phrase attendue : il manque un élément, ou l'ordre des mots est faux.";

export interface OrderNote {
  season: number;
  templateId: string;
  npcId: string;
  said: string;
  correct: string;
  errors: { gravite: ErrorSeverity; explanationFr: string }[];
}

export interface PreparedOrder {
  order: StructuredOrder;
  itemIds: string[];
  ruleIds: string[];
  note: OrderNote;
}

export interface BankBlock {
  key: number;
  text: string;
  /** Rank in the correct sentence; null for a distractor. */
  rank: number | null;
}

/** An `en_cours` rule is weak while the questions already seen stay short-lived. */
export function ruleIsWeak(questionIds: string[], memory: Memory): boolean {
  const seen = questionIds.flatMap((id) => memory[id] ?? []);
  if (seen.length === 0) return true;
  return seen.reduce((sum, item) => sum + item.halfLifeDays, 0) / seen.length < WEAK_HALF_LIFE;
}

/** GDD 10.4: pick while the notion is being learnt, assemble once it is well on its way. */
export function orderMode(state: NodeState | undefined, weak: boolean): OrderMode {
  if (state === 'maitrise') return 'assembler';
  return state === 'en_cours' && !weak ? 'assembler' : 'choisir';
}

function correctOption(template: OrderTemplate): OrderOption {
  return template.options.find((option) => option.correct) ?? template.options[0];
}

export const correctSentence = (template: OrderTemplate): string => plainText(correctOption(template).text);

function errorOf(option: OrderOption, segment: string): OrderError {
  return { type: option.errorType ?? 'inconnu', segment, gravite: option.gravite ?? 'imprecision' };
}

function prepare(
  template: OrderTemplate,
  season: number,
  said: string,
  text: OrderOption['text'],
  erreurs: OrderError[],
  explanations: string[],
): PreparedOrder {
  return {
    order: {
      destinataire: template.npcId,
      acte: template.acte,
      verbe: template.verbe,
      objet: template.objet,
      quantite: null,
      lieu: null,
      delai: null,
      condition: null,
      registre: template.acte,
      erreurs,
    },
    itemIds: wordIdsOf(text),
    ruleIds: [template.ruleId],
    note: {
      season,
      templateId: template.id,
      npcId: template.npcId,
      said,
      correct: correctSentence(template),
      errors: erreurs.map((error, index) => ({ gravite: error.gravite, explanationFr: explanations[index] })),
    },
  };
}

export function orderFromOption(template: OrderTemplate, option: OrderOption, season: number): PreparedOrder {
  const said = plainText(option.text);
  return option.correct
    ? prepare(template, season, said, option.text, [], [])
    : prepare(template, season, said, option.text, [errorOf(option, said)], [option.explanationFr ?? MISSING_EXPLANATION]);
}

export function assemblyBank(template: OrderTemplate): BankBlock[] {
  const blocks = template.blocks.map((text, rank) => ({ text, rank }));
  const distractors = template.distractorBlocks.map((text) => ({ text, rank: null }));
  return stableShuffle(
    [...blocks, ...distractors].map((block, key) => ({ ...block, key })),
    template.id,
  );
}

const wrongOptions = (template: OrderTemplate) => template.options.filter((option) => !option.correct);

function isComplete(template: OrderTemplate, picked: BankBlock[]): boolean {
  const ranks = picked.flatMap((block) => block.rank ?? []);
  return picked.length === template.blocks.length && ranks.every((rank, index) => index === 0 || rank > ranks[index - 1]);
}

/**
 * The sentence says which fault it makes: a wrong wording of the template, or the wording a distractor
 * comes from. The content has no fault for blocks in the wrong order, for a missing one, or for a
 * distractor found in no option: these count as an imprecision, the GDD's "missing field".
 */
export function orderFromAssembly(template: OrderTemplate, picked: BankBlock[], season: number): PreparedOrder {
  const said = picked.map((block) => block.text).join(' ');
  const correct = correctOption(template);
  if (said === plainText(correct.text)) return prepare(template, season, said, correct.text, [], []);

  const sameAsOption = wrongOptions(template).find((option) => plainText(option.text) === said);
  if (sameAsOption) return orderFromOption(template, sameAsOption, season);

  const distractors = picked.filter((block) => block.rank === null);
  const sources = distractors.map((block) => wrongOptions(template).find((option) => plainText(option.text).includes(block.text)));
  const faulty = [...new Set(sources.flatMap((option) => option ?? []))];
  const errors = faulty.map((option) => errorOf(option, distractors[sources.indexOf(option)].text));
  const explanations = faulty.map((option) => option.explanationFr ?? MISSING_EXPLANATION);

  if (sources.includes(undefined) || distractors.length === 0 || !isComplete(template, picked)) {
    errors.push({ type: 'assemblage', segment: said, gravite: 'imprecision' });
    explanations.push(ASSEMBLY_EXPLANATION);
  }
  return prepare(template, season, said, correct.text, errors, explanations);
}
