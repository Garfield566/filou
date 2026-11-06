import { describe, expect, it } from 'vitest';
import { orders } from '../content';
import type { OrderTemplate } from '../content/schemas';
import {
  ASSEMBLY_EXPLANATION,
  assemblyBank,
  correctSentence,
  orderFromAssembly,
  orderFromOption,
  orderMode,
  ruleIsWeak,
  type BankBlock,
} from './orders';
import { plainText } from './text';

const template = orders.find((order) => order.id === 'ordre.ferme.relatif') as OrderTemplate;

const blocksFor = (texts: string[]): BankBlock[] => {
  const bank = assemblyBank(template);
  return texts.map((text) => bank.find((block) => block.text === text) as BankBlock);
};

describe('orderMode', () => {
  it('asks to pick while the notion is being learnt', () => {
    expect(orderMode('grise', false)).toBe('choisir');
    expect(orderMode('fissure', false)).toBe('choisir');
    expect(orderMode(undefined, false)).toBe('choisir');
    expect(orderMode('en_cours', true)).toBe('choisir');
  });

  it('asks to assemble once the notion is well on its way', () => {
    expect(orderMode('en_cours', false)).toBe('assembler');
    expect(orderMode('maitrise', false)).toBe('assembler');
    expect(orderMode('maitrise', true)).toBe('assembler');
  });
});

describe('ruleIsWeak', () => {
  it('weighs only the questions already seen', () => {
    expect(ruleIsWeak(['a', 'b'], {})).toBe(true);
    expect(ruleIsWeak(['a', 'b'], { a: { halfLifeDays: 1, lastSeen: 0 } })).toBe(true);
    expect(ruleIsWeak(['a', 'b'], { a: { halfLifeDays: 3, lastSeen: 0 } })).toBe(false);
  });
});

describe('orderFromOption', () => {
  const season = 2;

  it('turns the right wording into an order without errors', () => {
    const option = template.options.find((candidate) => candidate.correct)!;
    const { order, ruleIds, note } = orderFromOption(template, option, season);
    expect(order).toMatchObject({ destinataire: 'bailli', acte: 'ordre', verbe: 'construire', objet: 'ferme', erreurs: [] });
    expect(ruleIds).toEqual([template.ruleId]);
    expect(note.errors).toEqual([]);
  });

  it('carries the fault of a wrong wording and its explanation', () => {
    const option = template.options.find((candidate) => candidate.gravite === 'sens_change')!;
    const { order, note } = orderFromOption(template, option, season);
    expect(order.erreurs).toEqual([{ type: option.errorType, segment: plainText(option.text), gravite: 'sens_change' }]);
    expect(note).toMatchObject({ season, said: plainText(option.text), correct: correctSentence(template) });
    expect(note.errors).toEqual([{ gravite: 'sens_change', explanationFr: option.explanationFr }]);
  });

  it('takes the word ids from the text of the order', () => {
    const withWords = orders.flatMap((order) => order.options.map((option) => ({ order, option }))).find(({ option }) =>
      option.text.segments.some((segment) => segment.wordId),
    )!;
    const expected = withWords.option.text.segments.flatMap((segment) => segment.wordId ?? []);
    expect(orderFromOption(withWords.order, withWords.option, 1).itemIds).toEqual([...new Set(expected)]);
  });
});

describe('assembly', () => {
  it('offers every block once, in a mixed order that does not change', () => {
    const bank = assemblyBank(template);
    expect(bank.map((block) => block.text).sort()).toEqual([...template.blocks, ...template.distractorBlocks].sort());
    expect(assemblyBank(template)).toEqual(bank);
    expect(bank.map((block) => block.text)).not.toEqual([...template.blocks, ...template.distractorBlocks]);
  });

  it('accepts the blocks in order', () => {
    const { order, note } = orderFromAssembly(template, blocksFor(template.blocks), 1);
    expect(order.erreurs).toEqual([]);
    expect(note.said).toBe(correctSentence(template));
  });

  it('gives a sentence equal to a wrong wording the fault of that wording', () => {
    const { order } = orderFromAssembly(template, blocksFor(['Build a firm', 'on the field', 'which is', 'near the river.']), 1);
    expect(order.erreurs).toHaveLength(1);
    expect(order.erreurs[0].gravite).toBe('sens_change');
  });

  it('traces a distractor to the wording it comes from', () => {
    const { order, note } = orderFromAssembly(template, blocksFor(['Build a firm', 'who is', 'on the field', 'near the river.']), 1);
    expect(order.erreurs.map((error) => error.segment)).toEqual(expect.arrayContaining(['Build a firm', 'who is']));
    expect(note.errors.length).toBe(order.erreurs.length);
  });

  it('treats blocks in the wrong order as an imprecision', () => {
    const { order, note } = orderFromAssembly(template, blocksFor([...template.blocks].reverse()), 1);
    expect(order.erreurs).toEqual([expect.objectContaining({ type: 'assemblage', gravite: 'imprecision' })]);
    expect(note.errors[0].explanationFr).toBe(ASSEMBLY_EXPLANATION);
  });

  it('treats a missing block as an imprecision', () => {
    const { order } = orderFromAssembly(template, blocksFor(template.blocks.slice(0, 2)), 1);
    expect(order.erreurs[0]).toMatchObject({ type: 'assemblage', gravite: 'imprecision' });
  });

  it('treats a distractor no wording explains as an imprecision', () => {
    const { order } = orderFromAssembly(template, blocksFor(['Build a farm', 'on the field', 'which is', 'near of the river']), 1);
    expect(order.erreurs).toEqual([expect.objectContaining({ gravite: 'imprecision' })]);
  });

  it('builds a correct order from every template', () => {
    for (const order of orders) {
      const bank = assemblyBank(order);
      const picked = order.blocks.map((text) => bank.find((block) => block.text === text && block.rank !== null) as BankBlock);
      expect(orderFromAssembly(order, picked, 1).order.erreurs).toEqual([]);
    }
  });
});
