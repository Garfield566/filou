import { describe, expect, it } from 'vitest';
import { z } from 'zod';

const LICENSES = ['Domaine public', 'Domaine public (transcription Wikisource, CC BY-SA 4.0)', 'Domaine public (original) ; version simplifiée rédigée pour Filou'];
// Recognised works only: a book on Project Gutenberg or a page on Wikisource, never an encyclopedia article.
const HOSTS = /^https:\/\/(?:www\.gutenberg\.org\/ebooks\/\d+|(?:en|de)\.wikisource\.org\/wiki\/.+)$/;

const Meta = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  author: z.string().min(1),
  work: z.string().min(1),
  url: z.string().regex(HOSTS),
  license: z.string().refine((license) => LICENSES.includes(license)),
  retrieved: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  theme: z.string().min(1),
  level: z.enum(['A2', 'B1', 'B2', 'C1', 'C2']),
  words: z.number().int().min(300).max(800),
  source: z.string().min(1),
  lemmas: z.array(z.number().int().nonnegative()),
});

const Question = z.object({ kind: z.string(), prompt: z.string().min(1), shown: z.string().optional(), answer: z.string().min(1), wrong: z.array(z.string().min(1)).min(1) });
const Body = z.object({
  id: z.string(),
  paragraphs: z.array(z.string().min(1)).min(1),
  glossary: z.array(z.object({ lemma: z.string(), key: z.string(), sentence: z.string().min(1), fr: z.string().min(1) })),
  questions: z.array(Question),
});

// Read through Vite, so that the type check needs no Node types.
const files = import.meta.glob<unknown>('/public/library/*/**/*.json', { eager: true, import: 'default' });
const fileOf = (path: string) => files[`/public/library/${path}`];

describe.each(['en', 'de'])('library %s', (language) => {
  const index = fileOf(`${language}/index.json`) as { passages: { id: string }[] } | undefined;

  it('has been built', () => {
    expect(index).toBeDefined();
  });

  it('links every simplified version to an original of the library, and says so in its title', () => {
    const passages = (index?.passages ?? []) as { id: string; source: string; title: string; original?: string }[];
    const ids = new Set(passages.map((passage) => passage.id));
    for (const passage of passages.filter((item) => item.source === 'simplified')) {
      expect(passage.original && ids.has(passage.original), passage.id).toBe(true);
      expect(passage.title, passage.id).toContain('version simplifiée');
    }
  });

  it('gives every passage its source, licence and date', () => {
    for (const passage of index?.passages ?? []) expect(Meta.safeParse(passage).error?.issues ?? []).toEqual([]);
  });

  it('has one readable file per passage, with no wrong option equal to the answer', () => {
    const bodies = Object.keys(files).filter((path) => path.startsWith(`/public/library/${language}/passages/`));
    expect(bodies).toHaveLength(index?.passages.length ?? 0);
    for (const { id } of index?.passages ?? []) {
      const body = Body.parse(fileOf(`${language}/passages/${id}.json`));
      for (const question of body.questions) {
        expect(question.wrong).not.toContain(question.answer);
        expect(question.shown?.toLowerCase() ?? '').not.toContain(question.answer.toLowerCase());
      }
    }
  });
});
