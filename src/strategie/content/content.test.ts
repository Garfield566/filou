import { describe, expect, it } from 'vitest';
import { courses, lessonsOf } from '../../data/courses';
import { itemsOfCourse } from '../../lib/session';
import { AUDIENCE_CONDITIONS } from '../ai';
import { playGame } from '../ai/testContent';
import { ruleItemIds } from '../language/bridge';
import { checkTextVocabulary, lemmaOf, measureCoverage } from '../language/mask';
import type { GameText, LanguageProfile } from '../types';
import {
  allGameTexts,
  audiences,
  COURSE_WORD_IDS,
  gameRules,
  gameVocabulary,
  letters,
  npcs,
  orders,
  properNouns,
  reportLabels,
  reports,
} from './index';
import data from './en-socle.json';
import lexicon from './en-lexicon.json';

const course = courses.find((candidate) => candidate.id === 'en')!;
const items = itemsOfCourse(course);
const wordItemIds = new Set(items.filter((item) => item.type === 'word' || item.type === 'bank').map((item) => item.id));
const newPlayer: LanguageProfile = { language: 'en', words: {}, rules: {} };
const texts = allGameTexts();

const raw = (text: GameText): string => text.segments.map((segment) => segment.text).join('');
const slotsOf = (text: GameText): string[] => [...raw(text).matchAll(/\{([^}]*)\}/g)].map((match) => match[1]);
const WORD = /\p{L}+(?:['’]\p{L}+)*/gu;
const BUILDABLE = ['ferme', 'bergerie', 'pecherie', 'moulin'];

/** What the core puts in `Report.values`, read from `core/orders.ts` and `core/season.ts`. */
const ENGINE_REPORTS: Record<string, string[]> = {
  'rapport.recolte': ['ble', 'poisson', 'laine', 'deniers'],
  'rapport.village': [],
  'rapport.chantier.fini': ['batiment', 'x', 'y'],
  'rapport.chantier.detourne': ['batiment', 'surcout', 'x', 'y'],
  'rapport.chantier.mal_execute': ['batiment'],
  'rapport.chantier.impossible': ['batiment', 'raison'],
  'rapport.ordre.precision': ['pnj', 'verbe', 'objet'],
  'rapport.siege.tenu': ['attaque', 'defense'],
  'rapport.siege.perdu': ['attaque', 'defense'],
};
const ENGINE_REASONS = ['inconnu', 'verrouille', 'fonds', 'deja_construit', 'emplacement'];

const allRuleIds = [
  ...orders.map((order) => order.ruleId),
  ...letters.flatMap((letter) => letter.clues.map((clue) => clue.ruleId)),
];

describe('quantities', () => {
  it('has the three NPCs of phase 1, the merchant arriving with the village', () => {
    expect(npcs.map((npc) => npc.id)).toEqual(['bailli', 'interprete', 'marchand']);
    expect(npcs.map((npc) => npc.register)).toEqual(['ordre', 'ordre', 'requete']);
    expect(npcs.find((npc) => npc.id === 'marchand')?.arrivesAt).toBe('village');
  });

  it('has six build orders per building and two requests to the merchant', () => {
    for (const building of BUILDABLE) {
      const built = orders.filter((order) => order.verbe === 'construire' && order.objet === building);
      expect(built.length, building).toBeGreaterThanOrEqual(6);
      expect(built.every((order) => order.npcId === 'bailli')).toBe(true);
      expect(gameRules.buildings.some((def) => def.id === building), building).toBe(true);
    }
    expect(orders.filter((order) => order.npcId === 'marchand').length).toBeGreaterThanOrEqual(2);
  });

  it('has enough letters for each intention', () => {
    const count = (intention: string) => letters.filter((letter) => letter.intention === intention).length;
    expect(count('honnete')).toBeGreaterThanOrEqual(4);
    expect(count('hesitante')).toBeGreaterThanOrEqual(4);
    expect(count('perfide')).toBeGreaterThanOrEqual(3);
  });

  it('has enough audiences for each condition', () => {
    const count = (condition: string) => audiences.filter((audience) => audience.condition === condition).length;
    expect(count('tous')).toBeGreaterThanOrEqual(12);
    expect(count('disette')).toBeGreaterThanOrEqual(3);
    expect(count('impot')).toBeGreaterThanOrEqual(2);
    expect(count('querelle')).toBeGreaterThanOrEqual(2);
    expect(count('abus')).toBeGreaterThanOrEqual(2);
  });

  it('never uses the same text id twice', () => {
    const ids = texts.map((text) => text.id);
    expect(ids.filter((id, index) => ids.indexOf(id) !== index)).toEqual([]);
  });
});

describe('segmentation and vocabulary', () => {
  it('reports no unknown word in any text or option', () => {
    const faults = texts.flatMap((text) => checkTextVocabulary(text, gameVocabulary).map((word) => `${text.id}: ${word}`));
    expect(faults).toEqual([]);
  });

  it('gives each lexicon word its own segment, under the id of its lemma', () => {
    for (const text of texts) {
      for (const segment of text.segments.filter((candidate) => candidate.wordId)) {
        expect(segment.text, text.id).toMatch(/^\p{L}+$/u);
        expect(wordItemIds.has(segment.wordId!), segment.wordId).toBe(true);
        if (segment.wordId!.startsWith('en:b:')) expect(segment.wordId).toBe(`en:b:${lemmaOf(segment.text)}`);
      }
    }
  });

  it('points only to course words that exist', () => {
    for (const id of COURSE_WORD_IDS) expect(wordItemIds.has(id), id).toBe(true);
  });

  it('has no name that hides a word of the lists', () => {
    const lists = [data.socle, data.transparents, data.falseFriends, lexicon.map((word) => word.target)].flat();
    expect(properNouns.filter((name) => lists.includes(name.toLowerCase()))).toEqual([]);
  });

  it('builds orders only from words of the game, blocks included', () => {
    const known = new Set([...data.socle, ...data.transparents, ...lexicon.map((word) => word.target), ...['grateful']]);
    const blocks = orders.flatMap((order) => [...order.blocks, ...order.distractorBlocks]);
    expect(blocks.flatMap((block) => block.match(WORD) ?? []).filter((word) => !known.has(lemmaOf(word)))).toEqual([]);
  });
});

describe('calibration, GDD 10.9', () => {
  it('stays at 95 % or more for a new player in a text of 20 words or more', () => {
    for (const text of texts) {
      const { known, total } = measureCoverage(text, newPlayer, gameVocabulary);
      if (total >= 20) expect(known / total, text.id).toBeGreaterThanOrEqual(0.95);
    }
  });

  it('brings at most 3 new words into an A2 text', () => {
    for (const text of texts.filter((candidate) => candidate.level === 'A2')) {
      expect(measureCoverage(text, newPlayer, gameVocabulary).newWords, text.id).toBeLessThanOrEqual(3);
    }
  });

  it('writes at level A2 or B1 only', () => {
    expect(texts.filter((text) => !['A2', 'B1'].includes(text.level)).map((text) => text.id)).toEqual([]);
  });
});

describe('audio', () => {
  it('voices only texts without slots, with their exact wording', () => {
    for (const text of texts.filter((candidate) => candidate.audio !== undefined)) {
      expect(slotsOf(text), text.id).toEqual([]);
      expect(text.audio, text.id).toBe(raw(text));
    }
  });

  it('voices the complaints, the letters and the right wording of each order', () => {
    expect(audiences.every((audience) => audience.complaint.audio)).toBe(true);
    expect(letters.every((letter) => letter.text.audio)).toBe(true);
    for (const order of orders) {
      for (const option of order.options) expect(Boolean(option.text.audio), option.text.id).toBe(option.correct);
    }
  });
});

describe('grammar rules', () => {
  it('points only to real lessons with questions, so no review is lost', () => {
    const lessonIds = lessonsOf(course).map((lesson) => lesson.id);
    for (const ruleId of new Set(allRuleIds)) {
      expect(lessonIds, ruleId).toContain(ruleId);
      expect(ruleItemIds(course, ruleId).length, ruleId).toBeGreaterThan(0);
    }
  });
});

describe('orders', () => {
  it('has one right wording, and faults explained with their cost', () => {
    for (const order of orders) {
      expect(order.options.filter((option) => option.correct), order.id).toHaveLength(1);
      for (const option of order.options.filter((candidate) => !candidate.correct)) {
        expect(option.gravite, option.text.id).toBeDefined();
        expect(option.errorType, option.text.id).toBeTruthy();
        expect(option.explanationFr, option.text.id).toBeTruthy();
      }
    }
  });

  it('assembles the right wording from its blocks, without giving away a distractor', () => {
    for (const order of orders) {
      const right = order.options.find((option) => option.correct)!;
      expect(order.blocks.join(' '), order.id).toBe(raw(right.text));
      expect(order.distractorBlocks.length, order.id).toBeGreaterThan(0);
      expect(order.distractorBlocks.filter((block) => order.blocks.includes(block)), order.id).toEqual([]);
    }
  });

  it('asks of each NPC the register of GDD 10.5', () => {
    for (const order of orders) {
      const npc = npcs.find((candidate) => candidate.id === order.npcId)!;
      const right = raw(order.options.find((option) => option.correct)!.text);
      expect(order.acte, order.id).toBe(npc.register);
      if (npc.register === 'ordre') expect(right, order.id).not.toMatch(/\b(would|could|please)\b/i);
      else expect(right, order.id).toMatch(/\bwould\b/i);
    }
  });

  it('shows every kind of fault', () => {
    const kinds = new Set(orders.flatMap((order) => order.options.map((option) => option.gravite)));
    expect([...kinds].filter(Boolean).sort()).toEqual(['imprecision', 'mauvais_registre', 'sans_gene', 'sens_change']);
  });
});

describe('letters', () => {
  const treacherous = letters.filter((letter) => letter.intention === 'perfide');
  const others = letters.filter((letter) => letter.intention !== 'perfide');
  const clueText = (letterId: string, clueId: string) =>
    letters.find((letter) => letter.id === letterId)!.text.segments.find((segment) => segment.clueId === clueId)?.text ?? '';

  it('comes from the rival', () => {
    expect(letters.every((letter) => letter.from === 'rival')).toBe(true);
  });

  it('links every clue of a treacherous letter to a segment, both ways', () => {
    for (const letter of treacherous) {
      const carried = letter.text.segments.flatMap((segment) => segment.clueId ?? []);
      expect(letter.clues, letter.id).toHaveLength(1);
      expect(carried.sort(), letter.id).toEqual(letter.clues.map((clue) => clue.id).sort());
      for (const clue of letter.clues) expect(clue.explanationFr.length, clue.id).toBeGreaterThan(40);
    }
  });

  it('hides a conditional in at least two letters, and a vague modal or condition in at least one', () => {
    const levelled = (level: string, signal: RegExp) =>
      treacherous.filter((letter) =>
        letter.clues.some((clue) => clue.level === level && signal.test(clueText(letter.id, clue.id))),
      );
    expect(levelled('A2', /\bwould\b/i).length).toBeGreaterThanOrEqual(2);
    expect(levelled('B1', /\bmay\b|circumstances/i).length).toBeGreaterThanOrEqual(1);
  });

  it('keeps those signals out of honest and hesitant letters', () => {
    const signals = /\b(would|could|might|may|perhaps|maybe|consider|subject to|circumstances?)\b/i;
    for (const letter of others) {
      expect(raw(letter.text), letter.id).not.toMatch(signals);
      expect(letter.clues, letter.id).toEqual([]);
      expect(letter.text.segments.some((segment) => segment.clueId), letter.id).toBe(false);
    }
  });

  it('never makes a firm promise beside the clue of a treacherous letter', () => {
    for (const letter of treacherous) expect(raw(letter.text), letter.id).not.toMatch(/\bwill\b|'ll\b/i);
  });

  it('offers replies whose effects the core can apply', () => {
    const allowed = ['deniers', 'trust', 'fear', 'paysans', 'marchands', 'clerge'];
    for (const letter of letters) {
      expect(letter.replies.length, letter.id).toBeGreaterThanOrEqual(2);
      for (const reply of letter.replies) {
        expect(Object.keys(reply.effects).length, reply.id).toBeGreaterThan(0);
        expect(Object.keys(reply.effects).filter((key) => !allowed.includes(key)), reply.id).toEqual([]);
      }
    }
  });
});

describe('audiences', () => {
  it('uses only conditions the AI can pick', () => {
    const conditions: readonly string[] = AUDIENCE_CONDITIONS;
    expect(audiences.filter((audience) => !conditions.includes(audience.condition))).toEqual([]);
  });

  it('offers 2 or 3 summaries with a single right one', () => {
    for (const audience of audiences) {
      expect(audience.summaries.length, audience.id).toBeGreaterThanOrEqual(2);
      expect(audience.summaries.length, audience.id).toBeLessThanOrEqual(3);
      expect(audience.summaries.filter((summary) => summary.correct), audience.id).toHaveLength(1);
    }
  });

  it('offers 2 to 4 decisions, none of them free', () => {
    for (const audience of audiences) {
      expect(audience.decisions.length, audience.id).toBeGreaterThanOrEqual(2);
      expect(audience.decisions.length, audience.id).toBeLessThanOrEqual(4);
      for (const decision of audience.decisions) {
        const costs = [...Object.values(decision.loyalty), decision.deniers].some((amount) => amount < 0);
        expect(costs, `${audience.id}.${decision.id}`).toBe(true);
      }
    }
  });

  it('never accuses the merchant, who is not there before the village', () => {
    const abuses = audiences.filter((audience) => audience.condition === 'abus');
    expect(abuses.filter((audience) => /merchant/i.test(raw(audience.complaint)))).toEqual([]);
  });
});

describe('reports', () => {
  const files = import.meta.glob<string>(['../core/*.ts', '!../core/*.test.ts', '!../core/testRules.ts'], {
    query: '?raw',
    import: 'default',
    eager: true,
  });
  const sources = Object.values(files);
  const engineIds = [...new Set(sources.flatMap((source) => source.match(/rapport\.[a-z_.]+/g) ?? []))];

  it('knows every report of the engine', () => {
    expect(engineIds.sort()).toEqual(Object.keys(ENGINE_REPORTS).sort());
  });

  it('has one text for each report of the engine, and no other', () => {
    expect(reports.map((report) => report.textId).sort()).toEqual(engineIds.sort());
    for (const report of reports) expect(report.text.id).toBe(report.textId);
  });

  it('uses only slots the engine fills', () => {
    for (const report of reports) {
      const given = ENGINE_REPORTS[report.textId];
      expect(slotsOf(report.text).filter((slot) => !given.includes(slot)), report.textId).toEqual([]);
      expect(report.text.fr.match(/\{[^}]*\}/g)?.sort() ?? [], report.textId).toEqual(
        (raw(report.text).match(/\{[^}]*\}/g) ?? []).sort(),
      );
    }
  });

  it('has a word for every id the engine can put in a slot', () => {
    expect(Object.keys(reportLabels.batiment).sort()).toEqual(gameRules.buildings.map((building) => building.id).sort());
    expect(Object.keys(reportLabels.raison).sort()).toEqual([...ENGINE_REASONS].sort());
  });
});

describe('assembled rules', () => {
  it('plays whole games with these texts, each report finding its text', () => {
    const known = new Set(reports.map((report) => report.textId));
    for (const seed of [1, 2, 3, 4, 5, 6, 7, 8]) {
      const { state, seasons } = playGame(seed, gameRules);
      expect(seasons.every((season) => season.audienceIds.length >= 2), `graine ${seed}`).toBe(true);
      expect(state.reports.filter((report) => !known.has(report.textId))).toEqual([]);
      for (const report of state.reports) {
        const given = Object.keys(report.values);
        const text = reports.find((candidate) => candidate.textId === report.textId)!.text;
        expect(slotsOf(text).filter((slot) => !given.includes(slot)), report.textId).toEqual([]);
      }
    }
  });

  it('sends a letter for each intention of the rival', () => {
    const intentions = ['honnete', 'hesitante', 'perfide'];
    for (const seed of [1, 2, 3, 4, 5, 6, 7, 8]) {
      for (const season of playGame(seed, gameRules).seasons) {
        expect(intentions).toContain(season.decision.intention);
        expect(season.letterIds.length, `graine ${seed}`).toBe(1);
      }
    }
  });
});
