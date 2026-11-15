import dePhrases from '../data/phrases/de.json';
import type { Course, Exercise, GrammarLesson, GrammarTable, Item, Level } from '../types';
import { normalize } from './grade';
import { recall, type Memory } from './memory';
import { shuffle, type Rng } from './random';

/**
 * The « Phrases » tab: long paths on how a sentence is built (cases, word order, tenses in use).
 * Each lesson teaches one notion through a handful of sentences; the notion is what is memorised and reviewed,
 * and every review draws another of its sentences, so that the rule is learnt rather than the sentence.
 */

/** A question asked about one group of the sentence, shown highlighted: « Quel est son cas ? ». */
export interface PhraseFocus {
  chunk: string;
  answer: string;
  why: string;
}

/** A group to fill in from its dictionary form: « ___ (der Mann) » gives « den Mann ». */
export interface PhraseBlank {
  chunk: string;
  base: string;
  wrong: string[];
}

export interface PhraseSentence {
  id: string;
  /** The sentence in its most natural order. */
  text: string;
  fr: string;
  /** The groups of the sentence, in the natural order, written as they stand inside a sentence (« der Hund »). */
  chunks: string[];
  /** Other correct orders of the same groups, as full sentences. */
  orders?: string[];
  /** Why the natural order is the most natural one, shown after a reordering. */
  orderWhy?: string;
  focus?: PhraseFocus;
  blank?: PhraseBlank;
}

export interface PhraseRule {
  intro: string;
  points: string[];
  tables: GrammarTable[];
  examples: [target: string, french: string][];
}

export interface PhraseLesson {
  id: string;
  title: string;
  rule: PhraseRule;
  /** The question asked about each sentence's focus, and its possible answers. */
  ask?: { prompt: string; options: string[] };
  sentences: PhraseSentence[];
}

export interface PhraseUnit {
  id: string;
  title: string;
  hint: string;
  level: Level;
  lessons: PhraseLesson[];
}

export interface PhraseTrack {
  id: string;
  title: string;
  hint: string;
  units: PhraseUnit[];
}

export interface PhraseRef {
  track: PhraseTrack;
  unit: PhraseUnit;
  lesson: PhraseLesson;
}

const DATA: Record<string, PhraseTrack[]> = {
  de: (dePhrases as { tracks: PhraseTrack[] }).tracks,
};

export const phraseTracks = (course: Course): PhraseTrack[] => DATA[course.id] ?? [];

export const phraseLessons = (track: PhraseTrack): PhraseLesson[] => track.units.flatMap((unit) => unit.lessons);

export const phraseItemId = (course: Course, lessonId: string) => `${course.id}:p:${lessonId}`;

const itemsByCourse = new Map<string, Item[]>();

/** One review item per lesson: its notion. */
export function phraseItems(course: Course): Item[] {
  let items = itemsByCourse.get(course.id);
  if (!items) {
    items = phraseTracks(course).flatMap((track) =>
      track.units.flatMap((unit) =>
        unit.lessons.map((lesson) => ({
          id: phraseItemId(course, lesson.id),
          type: 'phrase' as const,
          target: lesson.title,
          fr: lesson.title,
          alt: [],
          phrase: { track, unit, lesson },
        })),
      ),
    );
    itemsByCourse.set(course.id, items);
  }
  return items;
}

const itemOf = (course: Course, lessonId: string): Item => phraseItems(course).find((item) => item.id === phraseItemId(course, lessonId))!;

/** Every accepted way of writing the sentence: the natural order and the other correct ones. */
export const allOrders = (sentence: PhraseSentence): string[] => [sentence.text, ...(sentence.orders ?? [])];

/** The groups of a sentence: the first one is the start of the sentence once the chunks are joined. */
const firstChunk = (order: string, chunks: string[]): string | undefined => {
  const start = normalize(order);
  return [...chunks].sort((a, b) => b.length - a.length).find((chunk) => start === normalize(chunk) || start.startsWith(`${normalize(chunk)} `));
};

/** The sentence with its focus group marked, for the highlight. */
function focusExercise(course: Course, lesson: PhraseLesson, sentence: PhraseSentence, rng: Rng): Exercise {
  const focus = sentence.focus!;
  return {
    kind: 'choice',
    itemIds: [phraseItemId(course, lesson.id)],
    prompt: lesson.ask!.prompt,
    shown: sentence.text,
    highlight: focus.chunk,
    shownIsTarget: true,
    audio: sentence.text,
    options: shuffle(lesson.ask!.options, rng),
    answer: focus.answer,
    why: `${focus.why} (${sentence.fr})`,
  };
}

const isLetter = (char: string | undefined) => char !== undefined && /\p{L}/u.test(char);

/** Where a group stands in a sentence, as a whole word (« er » is not found inside « Peter »); -1 if absent. */
export function findGroup(text: string, group: string): number {
  const lower = text.toLowerCase();
  const target = group.toLowerCase();
  for (let index = lower.indexOf(target); index >= 0; index = lower.indexOf(target, index + 1)) {
    if (!isLetter(lower[index - 1]) && !isLetter(lower[index + target.length])) return index;
  }
  return -1;
}

const withBlank = (sentence: PhraseSentence): string => {
  const blank = sentence.blank!;
  const index = findGroup(sentence.text, blank.chunk);
  return `${sentence.text.slice(0, index)}___ (${blank.base})${sentence.text.slice(index + blank.chunk.length)}`;
};

function blankChoice(course: Course, lesson: PhraseLesson, sentence: PhraseSentence, rng: Rng): Exercise {
  const blank = sentence.blank!;
  return {
    kind: 'choice',
    itemIds: [phraseItemId(course, lesson.id)],
    prompt: 'Choisis la bonne forme',
    shown: withBlank(sentence),
    shownIsTarget: false,
    options: shuffle([blank.chunk, ...blank.wrong], rng),
    answer: blank.chunk,
    why: `${sentence.text} (${sentence.fr})`,
  };
}

function blankType(course: Course, lesson: PhraseLesson, sentence: PhraseSentence): Exercise {
  const blank = sentence.blank!;
  return {
    kind: 'type',
    itemIds: [phraseItemId(course, lesson.id)],
    prompt: 'Écris la forme qui manque',
    shown: withBlank(sentence),
    audio: sentence.text,
    autoplay: false,
    answers: [blank.chunk],
    why: `${sentence.text} (${sentence.fr})`,
    strict: true,
  };
}

/** Rebuild the sentence from its groups, from the French; a wrong form of a group sometimes slips into the bank. */
function buildExercise(course: Course, lesson: PhraseLesson, sentence: PhraseSentence, rng: Rng): Exercise {
  const decoy = sentence.blank && rng() < 0.6 ? [sentence.blank.wrong[0]] : [];
  return {
    kind: 'arrange',
    itemIds: [phraseItemId(course, lesson.id)],
    prompt: 'Construis la phrase',
    shown: sentence.fr,
    shownIsTarget: false,
    audio: sentence.text,
    autoplay: false,
    bank: shuffle([...sentence.chunks, ...decoy], rng),
    answers: allOrders(sentence),
    why: sentence.orderWhy ?? sentence.text,
  };
}

/** The same sentence, started from another group: every correct order beginning with it is accepted. */
function restartExercise(course: Course, lesson: PhraseLesson, sentence: PhraseSentence, rng: Rng): Exercise | undefined {
  const others = (sentence.orders ?? []).filter((order) => firstChunk(order, sentence.chunks) !== firstChunk(sentence.text, sentence.chunks));
  if (others.length === 0) return undefined;
  const start = firstChunk(others[Math.floor(rng() * others.length)], sentence.chunks)!;
  const answers = allOrders(sentence).filter((order) => firstChunk(order, sentence.chunks) === start);
  return {
    kind: 'arrange',
    itemIds: [phraseItemId(course, lesson.id)],
    prompt: `Même phrase, mais commence par « ${start} »`,
    shown: sentence.text,
    shownIsTarget: true,
    audio: sentence.text,
    autoplay: false,
    bank: shuffle(sentence.chunks, rng),
    answers,
    why: `${answers[0]} — ${sentence.orderWhy ?? `Le plus naturel reste : ${sentence.text}`}`,
  };
}

function translateExercise(course: Course, lesson: PhraseLesson, sentence: PhraseSentence): Exercise {
  return {
    kind: 'type',
    itemIds: [phraseItemId(course, lesson.id)],
    prompt: `Écris en ${course.name}`,
    shown: sentence.fr,
    audio: sentence.text,
    autoplay: false,
    answers: allOrders(sentence),
    why: sentence.text,
  };
}

/** The rule card of a lesson, shown with the grammar cards of the course. */
export function ruleCard(lesson: PhraseLesson, unit: PhraseUnit): Exercise {
  const card: GrammarLesson = { kind: 'grammar', id: lesson.id, title: lesson.title, level: unit.level, questions: [], ...lesson.rule };
  return { kind: 'rule', lesson: card };
}

type Stage = 'recognise' | 'complete' | 'build' | 'restart' | 'write' | 'translate';

function exerciseAt(course: Course, lesson: PhraseLesson, sentence: PhraseSentence, stage: Stage, rng: Rng): Exercise | undefined {
  switch (stage) {
    case 'recognise':
      return sentence.focus && lesson.ask ? focusExercise(course, lesson, sentence, rng) : undefined;
    case 'complete':
      return sentence.blank ? blankChoice(course, lesson, sentence, rng) : undefined;
    case 'write':
      return sentence.blank ? blankType(course, lesson, sentence) : undefined;
    case 'build':
      return buildExercise(course, lesson, sentence, rng);
    case 'restart':
      return restartExercise(course, lesson, sentence, rng);
    case 'translate':
      return translateExercise(course, lesson, sentence);
  }
}

/** The five steps of a lesson, from recognising to producing, with how many sentences each takes. */
const LESSON_STAGES: [Stage, number][] = [
  ['recognise', 3],
  ['complete', 3],
  ['build', 3],
  ['restart', 2],
  ['write', 1],
  ['translate', 2],
];

/** A lesson: its rule, then its sentences through the five steps; a step a sentence cannot take is skipped. */
export function buildPhraseLesson(course: Course, lessonId: string, rng: Rng = Math.random): Exercise[] {
  for (const track of phraseTracks(course)) {
    for (const unit of track.units) {
      const lesson = unit.lessons.find((item) => item.id === lessonId);
      if (!lesson) continue;
      const steps: Exercise[] = [ruleCard(lesson, unit)];
      for (const [stage, count] of LESSON_STAGES) {
        let added = 0;
        for (const sentence of shuffle(lesson.sentences, rng)) {
          if (added === count) break;
          const exercise = exerciseAt(course, lesson, sentence, stage, rng);
          if (exercise) {
            steps.push(exercise);
            added++;
          }
        }
      }
      return steps;
    }
  }
  return [];
}

const WEAK_HALF_LIFE = 1;
const STRONG_HALF_LIFE = 7;

/** A review: another sentence of the notion, harder as the notion is better known. */
export function phraseExercise(course: Course, item: Item, memory: Memory, rng: Rng = Math.random): Exercise {
  const lesson = item.phrase!.lesson;
  const halfLife = memory[item.id]?.halfLifeDays ?? 0;
  const stages: Stage[] =
    halfLife < WEAK_HALF_LIFE ? ['recognise', 'complete', 'build'] : halfLife < STRONG_HALF_LIFE ? ['build', 'restart', 'write'] : ['translate', 'restart', 'write'];
  for (const sentence of shuffle(lesson.sentences, rng)) {
    for (const stage of shuffle(stages, rng)) {
      const exercise = exerciseAt(course, lesson, sentence, stage, rng);
      if (exercise) return exercise;
    }
  }
  return translateExercise(course, lesson, lesson.sentences[0]);
}

/** A challenge comes every two lessons of a track. */
const LESSONS_PER_CHALLENGE = 2;
const FIRST_CHALLENGE_SIZE = 8;
const MAX_CHALLENGE_SIZE = 16;

export interface PhraseChallenge {
  id: string;
  number: number;
  track: PhraseTrack;
  /** Every lesson up to it: the newest two come last. */
  lessons: PhraseLesson[];
  newLessons: PhraseLesson[];
  size: number;
}

const challengeCache = new Map<string, PhraseChallenge[]>();

/** Every two lessons, a challenge mixes their notions with all the earlier ones of the track. */
export function phraseChallenges(track: PhraseTrack): PhraseChallenge[] {
  let challenges = challengeCache.get(track.id);
  if (!challenges) {
    const lessons = phraseLessons(track);
    challenges = [];
    for (let end = LESSONS_PER_CHALLENGE; end < lessons.length + LESSONS_PER_CHALLENGE; end += LESSONS_PER_CHALLENGE) {
      const upTo = lessons.slice(0, Math.min(end, lessons.length));
      const number = challenges.length + 1;
      challenges.push({
        id: `${track.id}-defi:${number}`,
        number,
        track,
        lessons: upTo,
        newLessons: upTo.slice(end - LESSONS_PER_CHALLENGE),
        size: Math.min(FIRST_CHALLENGE_SIZE + 2 * (number - 1), MAX_CHALLENGE_SIZE),
      });
    }
    challengeCache.set(track.id, challenges);
  }
  return challenges;
}

export const phraseChallengeOpen = (challenge: PhraseChallenge, completed: ReadonlySet<string>): boolean =>
  challenge.lessons.every((lesson) => completed.has(lesson.id));

/**
 * A round of a challenge: half of it on the two newest lessons, the rest on the older ones, the weakest notions
 * first; never the same sentence twice.
 */
export function buildPhraseChallenge(course: Course, challengeId: string, memory: Memory, now: number, rng: Rng = Math.random): Exercise[] {
  const challenge = phraseTracks(course)
    .flatMap(phraseChallenges)
    .find((item) => item.id === challengeId);
  if (!challenge) return [];
  const strength = (lesson: PhraseLesson) => {
    const known = memory[phraseItemId(course, lesson.id)];
    return known ? recall(known, now) : -1;
  };
  const fresh = new Set(challenge.newLessons);
  const older = shuffle(challenge.lessons.filter((lesson) => !fresh.has(lesson)), rng).sort((a, b) => strength(a) - strength(b));
  const newCount = older.length === 0 ? challenge.size : Math.ceil(challenge.size / 2);
  // Lessons in turn, weakest first, so that a round covers as many notions as it can.
  const turns = [
    ...Array.from({ length: newCount }, (_, index) => challenge.newLessons[index % challenge.newLessons.length]),
    ...Array.from({ length: challenge.size - newCount }, (_, index) => older[index % older.length]),
  ];
  const used = new Set<string>();
  const steps: Exercise[] = [];
  for (const lesson of turns) {
    const item = itemOf(course, lesson.id);
    const sentence = shuffle(lesson.sentences, rng).find((candidate) => !used.has(candidate.id));
    if (!sentence) continue;
    used.add(sentence.id);
    const exercise = phraseExercise(course, { ...item, phrase: { ...item.phrase!, lesson: { ...lesson, sentences: [sentence] } } }, memory, rng);
    steps.push(exercise);
  }
  return shuffle(steps, rng);
}
