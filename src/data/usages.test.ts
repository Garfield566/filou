import { describe, expect, it } from 'vitest';
import { z } from 'zod';
import de from './usages/de.json';
import en from './usages/en.json';

const Example = z.object({ text: z.string().min(1), fr: z.string().min(1) });
const Usage = z.object({
  id: z.string().regex(/^[a-z][a-z0-9_]*$/),
  label: z.string().min(1),
  pos: z.string().min(1),
  explanation: z.string().min(1),
  pattern: z.string().min(1),
  level: z.enum(['A1', 'A2', 'B1', 'B2', 'C1', 'C2']),
  examples: z.array(Example).min(2),
  // Left empty on purpose: the user fills it with his own grammar reference.
  grammarRef: z.string(),
});
const Word = z.object({
  word: z.string().min(1),
  rank: z.number().int().positive().nullable(),
  required: z.boolean(),
  categories: z.array(z.string()).min(1),
  usages: z.array(Usage).min(1),
});
const Inventory = z.object({
  language: z.enum(['en', 'de']),
  words: z.array(Word).min(1),
  contrasts: z.array(z.object({ words: z.array(z.string()).min(2), usages: z.array(z.string()).min(2), note: z.string() })),
  excluded: z.array(z.object({ word: z.string(), reason: z.string().min(1) })),
});

const REQUIRED = {
  en: ['as', 'like', 'since', 'for', 'still', 'yet', 'even', 'so', 'that', 'would', 'get', 'while', 'though', 'rather'],
  de: ['als', 'wie', 'wenn', 'doch', 'schon', 'noch', 'erst', 'da', 'denn', 'zu', 'lassen', 'werden', 'ob', 'ja', 'mal', 'eben'],
};
const CONTRASTS = {
  en: [['as', 'like'], ['since', 'for'], ['still', 'yet']],
  de: [['als', 'wenn', 'wie'], ['denn', 'weil', 'da'], ['schon', 'noch', 'erst'], ['ob', 'wenn']],
};
// A word kept only as the other side of a comparison may have a single use.
const COMPARISON_ONLY = new Set(['weil']);

describe.each([
  ['en', en],
  ['de', de],
] as const)('function words %s', (language, raw) => {
  const inventory = Inventory.parse(raw);
  const words = new Map(inventory.words.map((word) => [word.word, word]));

  it('keeps every required word', () => {
    for (const word of REQUIRED[language]) expect(words.has(word), word).toBe(true);
  });

  it('gives every word at least two uses, with distinct ids', () => {
    for (const word of inventory.words) {
      if (!COMPARISON_ONLY.has(word.word)) expect(word.usages.length, word.word).toBeGreaterThanOrEqual(2);
      const ids = word.usages.map((usage) => usage.id);
      expect(new Set(ids).size, word.word).toBe(ids.length);
    }
  });

  it('lists each word once, kept or excluded', () => {
    const all = [...inventory.words.map((word) => word.word), ...inventory.excluded.map((word) => word.word)];
    expect(new Set(all).size).toBe(all.length);
  });

  it('has the asked comparisons, pointing at uses that exist', () => {
    const groups = inventory.contrasts.map((group) => [...group.words].sort().join('/'));
    for (const group of CONTRASTS[language]) expect(groups, group.join('/')).toContain([...group].sort().join('/'));
    for (const group of inventory.contrasts) {
      for (const reference of group.usages) {
        const [word, usage] = reference.split(':');
        expect(words.get(word)?.usages.some((item) => item.id === usage), reference).toBe(true);
      }
    }
  });
});
