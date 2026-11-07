import { describe, expect, it } from 'vitest';
import { z } from 'zod';
import excluded from '../../scripts/usages/excluded.json';
import deExamples from './usages/de-examples.json';
import de from './usages/de.json';
import enExamples from './usages/en-examples.json';
import en from './usages/en.json';

const Example = z.object({
  id: z.string().regex(/^\d+$/),
  text: z.string().min(1),
  fr: z.string().min(1),
  // CC BY 2.0 FR: each sentence and its translation keep the name of their author.
  author: z.string().min(1),
  frId: z.string().regex(/^\d+$/),
  frAuthor: z.string().min(1),
  confidence: z.number().min(0.9).max(1),
});
const Examples = z.object({
  language: z.enum(['en', 'de']),
  source: z.literal('Tatoeba'),
  license: z.literal('CC BY 2.0 FR'),
  minConfidence: z.literal(0.9),
  examples: z.record(z.string(), z.array(Example).max(12)),
});

// Inflected forms, as in scripts/usages/sentences.py.
const FORMS: Record<string, string[]> = {
  get: ['get', 'gets', 'got', 'gotten', 'getting'],
  like: ['like', 'likes', 'liked', 'liking'],
  would: ['would', "wouldn't"],
  werden: ['werde', 'wirst', 'wird', 'werden', 'werdet', 'wurde', 'wurdest', 'wurden', 'wurdet', 'würde', 'würdest', 'würden', 'würdet', 'geworden', 'worden'],
  lassen: ['lasse', 'lässt', 'lasst', 'lassen', 'ließ', 'ließest', 'ließen', 'ließt', 'gelassen', 'lass'],
};

describe.each([
  ['en', en, enExamples],
  ['de', de, deExamples],
] as const)('usage examples %s', (_language, inventory, raw) => {
  const data = Examples.parse(raw);
  const usages = new Set(inventory.words.flatMap((word) => word.usages.map((usage) => `${word.word}:${usage.id}`)));

  it('has one entry per usage of the inventory, and no other', () => {
    expect(new Set(Object.keys(data.examples))).toEqual(usages);
  });

  it('only keeps sentences that hold the word', () => {
    for (const [key, examples] of Object.entries(data.examples)) {
      const word = key.split(':')[0];
      const forms = FORMS[word] ?? [word];
      for (const example of examples) {
        const tokens: string[] = example.text.toLowerCase().match(/[\p{L}']+/gu) ?? [];
        expect(forms.some((form) => tokens.includes(form)), `${key} ${example.id}`).toBe(true);
      }
    }
  });

  it('never shows a sentence set aside by hand, nor the same sentence twice for one usage', () => {
    for (const examples of Object.values(data.examples)) {
      const ids = examples.map((example) => example.id);
      expect(new Set(ids).size).toBe(ids.length);
      for (const id of ids) expect(Object.keys(excluded)).not.toContain(id);
    }
  });
});
