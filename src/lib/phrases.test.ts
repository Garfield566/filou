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
  withContractions,
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
const english = courseById('en');
/** Every lesson of every language, with its course. */
const everyLesson = [course, english].flatMap((each) => phraseTracks(each).flatMap(phraseLessons).map((lesson) => ({ course: each, lesson })));
const everySentence = everyLesson.flatMap(({ lesson }) => lesson.sentences.map((sentence) => ({ lesson, sentence })));

describe('phrases data', () => {
  it('has the German cases track, with ids that never collide', () => {
    expect(tracks.map((track) => track.id)).toContain('de-cas');
    const ids = [...lessons.map((lesson) => lesson.id), ...verbLessons(course).map((lesson) => lesson.id)];
    expect(new Set(ids).size).toBe(ids.length);
    const sentenceIds = sentences.map(({ sentence }) => sentence.id);
    expect(new Set(sentenceIds).size).toBe(sentenceIds.length);
  });

  it.each(everySentence.map(({ lesson, sentence }) => [sentence.id, lesson, sentence] as const))('%s is well formed', (_, lesson, sentence) => {
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
    if (sentence.wrongMeanings) {
      expect(sentence.wrongMeanings.length).toBeGreaterThanOrEqual(2);
      expect(new Set([sentence.fr, ...sentence.wrongMeanings]).size, 'every meaning offered must differ').toBe(sentence.wrongMeanings.length + 1);
    }
    if (sentence.combine) {
      // The short sentences hold the same words as the joined one, give or take the linking word and repeated subjects.
      const words = new Set(normalize(sentence.text).split(' '));
      expect(words.has(normalize(sentence.combine.link)), 'the linking word is in the sentence').toBe(true);
      expect(sentence.combine.sentences.length).toBeGreaterThanOrEqual(2);
    }
  });

  it('finds a group only as whole words', () => {
    expect(findGroup('Peter sieht er nicht.', 'er')).toBe(12);
    expect(findGroup('Er kommt.', 'er')).toBe(0);
    expect(findGroup('Wir kommen.', 'er')).toBe(-1);
  });
});

describe('phrase lessons', () => {
  it.each(everyLesson.map(({ course: each, lesson }) => [lesson.id, each] as const))('%s opens with its rule, then goes from recognising to producing', (lessonId, each) => {
    const steps = buildPhraseLesson(each, lessonId, seeded(7));
    expect(steps[0].kind).toBe('rule');
    expect(steps.length).toBeGreaterThanOrEqual(9);
    const kinds = steps.map((step) => step.kind);
    expect(kinds.lastIndexOf('choice')).toBeLessThan(kinds.lastIndexOf('type'));
    for (const step of steps.slice(1)) {
      expect('itemIds' in step && step.itemIds).toEqual([phraseItemId(each, lessonId)]);
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

describe('understanding and joining', () => {
  const phraseTrack = tracks.find((track) => track.id === 'de-phrase')!;

  it('asks to pick the meaning of a complex sentence and to join short ones', () => {
    const kinds = new Set<string>();
    for (const lesson of phraseLessons(phraseTrack)) {
      for (const step of buildPhraseLesson(course, lesson.id, seeded(5))) {
        if (step.kind === 'choice' && step.prompt === 'Que veut dire cette phrase ?') {
          kinds.add('understand');
          expect(step.options).toContain(step.answer);
          expect(step.shownIsTarget).toBe(true);
        }
        if (step.kind === 'arrange' && step.prompt.startsWith('Fais une seule phrase')) {
          kinds.add('combine');
          // The joined sentence is never shown nor spoken before the answer.
          expect(step.shownIsTarget).toBe(false);
          for (const answer of step.answers) expect(normalize(step.shown!)).not.toBe(normalize(answer));
        }
      }
    }
    expect([...kinds].sort()).toEqual(['combine', 'understand']);
  });

  it('shows the French meaning when a form is to be filled in, so that only one tense fits', () => {
    for (const step of buildPhraseLesson(course, 'de-temps-4:1', seeded(2))) {
      if (step.kind === 'choice' && step.shown?.includes('___')) expect(step.prompt).toMatch(/« .+ »/);
    }
  });
});

describe('English contractions', () => {
  it('accepts the contracted « has » and « had » when translating', () => {
    const answers = withContractions(['She has already left.', 'I had forgotten.', 'He is tired.']);
    expect(grade(answers, "She's already left.")).toBe('correct');
    expect(grade(answers, "I'd forgotten.")).toBe('correct');
    expect(grade(answers, "He's tired.")).toBe('correct');
    expect(grade(answers, 'I would forgotten.')).toBe('correct'); // how the grader reads « I'd »: harmless
  });
});

describe('phrase reviews', () => {
  it('gives every notion an item reviewed with the others', () => {
    const items = phraseItems(course);
    expect(items).toHaveLength(lessons.length);
    const all = new Set(itemsOfCourse(course).map((item) => item.id));
    for (const item of items) expect(all.has(item.id)).toBe(true);
    expect(phraseItems(english).length).toBe(phraseTracks(english).flatMap(phraseLessons).length);
    expect(phraseItems(english).every((item) => item.id.startsWith('en:p:'))).toBe(true);
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
    // Another tense that says the same thing (Perfekt for a Präteritum) is accepted too.
    const item = phraseItems(course).find((candidate) => candidate.id === phraseItemId(course, 'de-temps-4:1'))!;
    const sentence = item.phrase!.lesson.sentences.find((candidate) => candidate.alt?.length)!;
    const only = { ...item, phrase: { ...item.phrase!, lesson: { ...item.phrase!.lesson, sentences: [sentence] } } };
    const known = { [item.id]: { halfLifeDays: 30, lastSeen: Date.now() } };
    const translations = Array.from({ length: 40 }, (_, seed) => phraseExercise(course, only, known, seeded(seed + 1))).filter(
      (step) => step.kind === 'type' && step.prompt.startsWith('Écris en'),
    );
    expect(translations.length).toBeGreaterThan(0);
    for (const step of translations) if (step.kind === 'type') expect(grade(step.answers, sentence.alt![0])).toBe('correct');
  });

  it('gives every track its own challenges', () => {
    expect(tracks.map((track) => track.id)).toEqual(['de-cas', 'de-temps', 'de-phrase']);
    const ids = tracks.flatMap(phraseChallenges).map((challenge) => challenge.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
