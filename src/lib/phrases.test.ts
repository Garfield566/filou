import { describe, expect, it } from 'vitest';
import { courseById } from '../data/courses';
import { grade, normalize } from './grade';
import {
  allOrders,
  buildPhraseChallenge,
  buildPhraseLesson,
  findGroup,
  phraseChallengeOpen,
  phraseChallenges,
  phraseExercise,
  phraseItemId,
  phraseItems,
  phraseLessons,
  phraseTracks,
} from './phrases';
import { itemsOfCourse } from './session';
import { verbLessons } from './verbPath';

function seeded(seed: number) {
  let state = seed;
  return () => {
    state = (state * 1103515245 + 12345) % 2147483648;
    return state / 2147483648;
  };
}

function permutations<T>(items: T[]): T[][] {
  if (items.length <= 1) return [items];
  return items.flatMap((item, index) => permutations([...items.slice(0, index), ...items.slice(index + 1)]).map((rest) => [item, ...rest]));
}

const course = courseById('de');
const tracks = phraseTracks(course);
const lessons = tracks.flatMap(phraseLessons);
const sentences = lessons.flatMap((lesson) => lesson.sentences.map((sentence) => ({ lesson, sentence })));

describe('phrases data', () => {
  it('has the German cases track, with ids that never collide', () => {
    expect(tracks.map((track) => track.id)).toContain('de-cas');
    const ids = [...lessons.map((lesson) => lesson.id), ...verbLessons(course).map((lesson) => lesson.id)];
    expect(new Set(ids).size).toBe(ids.length);
    const sentenceIds = sentences.map(({ sentence }) => sentence.id);
    expect(new Set(sentenceIds).size).toBe(sentenceIds.length);
  });

  it.each(sentences.map(({ lesson, sentence }) => [sentence.id, lesson, sentence] as const))('%s is well formed', (_, lesson, sentence) => {
    expect(normalize(sentence.chunks.join(' '))).toBe(normalize(sentence.text));
    const possible = new Set(permutations(sentence.chunks).map((order) => normalize(order.join(' '))));
    for (const order of sentence.orders ?? []) {
      expect(possible.has(normalize(order)), order).toBe(true);
      expect(normalize(order)).not.toBe(normalize(sentence.text));
    }
    if (sentence.focus) {
      expect(lesson.ask?.options).toContain(sentence.focus.answer);
      expect(findGroup(sentence.text, sentence.focus.chunk)).toBeGreaterThanOrEqual(0);
    }
    if (sentence.blank) {
      expect(sentence.chunks).toContain(sentence.blank.chunk);
      expect(findGroup(sentence.text, sentence.blank.chunk)).toBeGreaterThanOrEqual(0);
      expect(sentence.blank.wrong).not.toContain(sentence.blank.chunk);
      expect(new Set(sentence.blank.wrong).size).toBe(sentence.blank.wrong.length);
      const chunks = new Set(sentence.chunks.map((chunk) => normalize(chunk)));
      expect(chunks.has(normalize(sentence.blank.wrong[0])), 'the decoy of the word bank must not be one of the groups').toBe(false);
    }
  });

  it('finds a group only as whole words', () => {
    expect(findGroup('Peter sieht er nicht.', 'er')).toBe(12);
    expect(findGroup('Er kommt.', 'er')).toBe(0);
    expect(findGroup('Wir kommen.', 'er')).toBe(-1);
  });
});

describe('phrase lessons', () => {
  it.each(lessons.map((lesson) => [lesson.id] as const))('%s opens with its rule, then goes from recognising to producing', (lessonId) => {
    const steps = buildPhraseLesson(course, lessonId, seeded(7));
    expect(steps[0].kind).toBe('rule');
    expect(steps.length).toBeGreaterThanOrEqual(9);
    const kinds = steps.map((step) => step.kind);
    expect(kinds.lastIndexOf('choice')).toBeLessThan(kinds.lastIndexOf('type'));
    for (const step of steps.slice(1)) {
      expect('itemIds' in step && step.itemIds).toEqual([phraseItemId(course, lessonId)]);
      if (step.kind === 'choice') {
        expect(step.options).toContain(step.answer);
        if (step.shown?.includes('___')) expect(normalize(step.shown)).not.toContain(` ${normalize(step.answer)} `);
      }
      if (step.kind === 'arrange') {
        for (const answer of step.answers) {
          const words = normalize(answer).split(' ');
          const bank = step.bank.flatMap((chunk) => normalize(chunk).split(' '));
          for (const word of words) expect(bank).toContain(word);
        }
      }
    }
    expect(buildPhraseLesson(course, 'nothing')).toEqual([]);
  });

  it('accepts every correct order, and only those starting as asked when restarting', () => {
    for (let seed = 1; seed < 40; seed++) {
      for (const step of buildPhraseLesson(course, 'de-cas-3:5', seeded(seed))) {
        if (step.kind !== 'arrange' || !step.prompt.startsWith('Même phrase')) continue;
        const start = normalize(step.prompt.split('« ')[1].split(' »')[0]);
        for (const answer of step.answers) expect(normalize(answer).startsWith(start)).toBe(true);
        expect(grade(step.answers, step.answers.at(-1)!)).toBe('correct');
      }
    }
  });
});

describe('phrase reviews', () => {
  it('gives every notion an item reviewed with the others', () => {
    const items = phraseItems(course);
    expect(items).toHaveLength(lessons.length);
    const all = new Set(itemsOfCourse(course).map((item) => item.id));
    for (const item of items) expect(all.has(item.id)).toBe(true);
    expect(phraseItems(courseById('en'))).toEqual([]);
  });

  it('asks harder questions about a notion once it is better known', () => {
    const item = phraseItems(course).find((candidate) => candidate.id === phraseItemId(course, 'de-cas-3:1'))!;
    const now = Date.now();
    const weak = phraseExercise(course, item, {}, seeded(3));
    const strong = phraseExercise(course, item, { [item.id]: { halfLifeDays: 30, lastSeen: now } }, seeded(3));
    expect(weak.kind === 'choice' || weak.kind === 'arrange').toBe(true);
    expect(strong.kind === 'type' || strong.kind === 'arrange').toBe(true);
  });
});

describe('phrase challenges', () => {
  const track = tracks[0];
  const trackLessons = phraseLessons(track);
  const challenges = phraseChallenges(track);

  it('comes every two lessons and covers more notions each time', () => {
    expect(challenges.length).toBe(Math.ceil(trackLessons.length / 2));
    for (let index = 1; index < challenges.length; index++) {
      expect(challenges[index].lessons.length).toBeGreaterThan(challenges[index - 1].lessons.length);
      expect(challenges[index].size).toBeGreaterThanOrEqual(challenges[index - 1].size);
    }
    expect(phraseChallengeOpen(challenges[0], new Set([trackLessons[0].id]))).toBe(false);
    expect(phraseChallengeOpen(challenges[0], new Set([trackLessons[0].id, trackLessons[1].id]))).toBe(true);
  });

  it('mixes the newest notions with the older ones, without repeating a notion more than needed', () => {
    const challenge = challenges[3];
    const steps = buildPhraseChallenge(course, challenge.id, {}, Date.now(), seeded(9));
    expect(steps).toHaveLength(challenge.size);
    const fresh = new Set(challenge.newLessons.map((lesson) => phraseItemId(course, lesson.id)));
    const ids = steps.map((step) => ('itemIds' in step ? step.itemIds[0] : ''));
    expect(ids.filter((id) => fresh.has(id)).length).toBe(Math.ceil(challenge.size / 2));
    expect(new Set(ids.filter((id) => !fresh.has(id))).size).toBeGreaterThan(1);
    expect(buildPhraseChallenge(course, 'nothing', {}, Date.now())).toEqual([]);
  });

  it('accepts every way of writing a sentence it asks to translate', () => {
    for (const { sentence } of sentences) expect(allOrders(sentence)[0]).toBe(sentence.text);
  });
});
