import { lessonsOf } from '../data/courses';
import type {
  Course,
  DialogueLesson,
  Exercise,
  GrammarLesson,
  GrammarQuestion,
  Item,
  Lesson,
  Unit,
  VocabLesson,
} from '../types';
import { normalize, tokenize } from './grade';
import { isDue, recall, type Memory } from './memory';
import { shuffle, type Rng } from './random';
import { verbExercise, verbItems } from './verbs';
import { usageExercise, usageItems } from './usages';
import { bankExercise, bankItems } from './wordBank';

const REVIEW_SIZE = 12;
const REVIEWS_IN_LESSON = 3;
const WORD_CHUNK = 4;

const WEAK_HALF_LIFE = 1;
const STRONG_HALF_LIFE = 7;

export function wordItem(course: Course, word: VocabLesson['words'][number]): Item {
  return {
    id: `${course.id}:${word.target}`,
    type: 'word',
    target: word.target,
    fr: word.fr,
    alt: word.alt ?? [],
  };
}

export function sentenceItem(course: Course, sentence: VocabLesson['sentences'][number]): Item {
  return {
    id: `${course.id}:${sentence.target}`,
    type: 'sentence',
    target: sentence.target,
    fr: sentence.fr,
    alt: sentence.alt ?? [],
  };
}

/** The whole correct sentence, used for audio. */
export function grammarTarget(question: GrammarQuestion): string {
  switch (question.type) {
    case 'choose':
      return question.sentence.replace('___', question.answer);
    case 'complete':
      return question.sentence.replace('___', question.answers[0]);
    case 'transform':
      return question.answers[0];
    case 'order':
    case 'spot':
      return question.answer;
  }
}

function grammarItems(course: Course, lesson: GrammarLesson): Item[] {
  return lesson.questions.map((question, index) => ({
    id: `${course.id}:g:${lesson.id}:${index}`,
    type: 'grammar',
    target: grammarTarget(question),
    fr: '',
    alt: [],
    question,
  }));
}

/** Share of a grammar lesson's points the learner currently remembers, from 0 to 1. */
export function grammarMastery(course: Course, lesson: GrammarLesson, memory: Memory, now: number): number {
  const items = grammarItems(course, lesson);
  const held = items.filter((item) => memory[item.id] && !isDue(memory[item.id], now)).length;
  return held / items.length;
}

function grammarExercise(item: Item, strong: boolean, rng: Rng): Exercise {
  const question = item.question!;
  const common = { itemIds: [item.id], audio: item.target };
  const note = (fr: string) => `« ${fr} » ${question.why}`;

  switch (question.type) {
    case 'choose':
      if (strong) {
        return {
          ...common,
          kind: 'type',
          prompt: 'Complète la phrase',
          shown: question.sentence,
          autoplay: false,
          answers: [question.answer],
          why: note(question.fr),
          strict: true,
        };
      }
      return {
        ...common,
        kind: 'choice',
        prompt: 'Choisis la bonne forme',
        shown: question.sentence,
        shownIsTarget: false,
        options: shuffle([question.answer, ...question.wrong], rng),
        answer: question.answer,
        why: note(question.fr),
      };
    case 'complete':
      return {
        ...common,
        kind: 'type',
        prompt: 'Complète la phrase',
        shown: question.sentence,
        autoplay: false,
        answers: question.answers,
        why: note(question.fr),
        strict: true,
      };
    case 'transform':
      return {
        ...common,
        kind: 'type',
        prompt: question.instruction,
        shown: question.source,
        autoplay: false,
        answers: question.answers,
        why: note(question.fr),
        strict: true,
      };
    case 'order':
      return {
        ...common,
        kind: 'arrange',
        prompt: 'Construis la phrase',
        shown: question.fr,
        shownIsTarget: false,
        autoplay: false,
        bank: shuffle([...tokenize(question.answer), ...question.distractors], rng),
        answers: [question.answer],
        why: question.why,
      };
    case 'spot':
      return {
        ...common,
        kind: 'choice',
        prompt: 'Quelle phrase est correcte ?',
        shownIsTarget: false,
        options: shuffle([question.answer, ...question.wrong], rng),
        answer: question.answer,
        why: question.why,
      };
  }
}

function itemsOfLesson(course: Course, lesson: Lesson): Item[] {
  if (lesson.kind === 'grammar') return grammarItems(course, lesson);
  if (lesson.kind !== 'vocab') return [];
  return [
    ...lesson.words.map((word) => wordItem(course, word)),
    ...lesson.sentences.map((sentence) => sentenceItem(course, sentence)),
  ];
}

export function itemsOfCourse(course: Course): Item[] {
  return [
    ...lessonsOf(course).flatMap((lesson) => itemsOfLesson(course, lesson)),
    ...verbItems(course),
    ...bankItems(course),
    ...usageItems(course),
  ];
}

export function dueItems(course: Course, memory: Memory, now: number): Item[] {
  return itemsOfCourse(course).filter((item) => memory[item.id] && isDue(memory[item.id], now));
}

function otherWords(item: Item, pool: Item[], side: 'target' | 'fr', count: number, rng: Rng): string[] {
  const seen = new Set([normalize(item[side]), normalize(item.fr)]);
  const picked: string[] = [];
  for (const candidate of shuffle(pool, rng)) {
    const key = normalize(candidate[side]);
    if (candidate.type === 'word' && candidate.id !== item.id && !seen.has(key) && !seen.has(normalize(candidate.fr))) {
      seen.add(key);
      seen.add(normalize(candidate.fr));
      picked.push(candidate[side]);
      if (picked.length === count) break;
    }
  }
  return picked;
}

function recognize(item: Item, pool: Item[], rng: Rng): Exercise {
  return {
    kind: 'choice',
    itemIds: [item.id],
    prompt: 'Que veut dire ce mot ?',
    shown: item.target,
    shownIsTarget: true,
    audio: item.target,
    options: shuffle([item.fr, ...otherWords(item, pool, 'fr', 3, rng)], rng),
    answer: item.fr,
  };
}

function produceChoice(item: Item, pool: Item[], rng: Rng): Exercise {
  return {
    kind: 'choice',
    itemIds: [item.id],
    prompt: `Comment dit-on « ${item.fr} » ?`,
    shownIsTarget: false,
    audio: item.target,
    options: shuffle([item.target, ...otherWords(item, pool, 'target', 3, rng)], rng),
    answer: item.target,
  };
}

function bankWords(answer: string, pool: string[], count: number, rng: Rng): string[] {
  const answerWords = tokenize(answer);
  const taken = new Set(answerWords.map((word) => normalize(word)));
  const distractors: string[] = [];
  for (const word of shuffle(pool.flatMap(tokenize), rng)) {
    const key = normalize(word);
    if (!taken.has(key)) {
      taken.add(key);
      distractors.push(word);
      if (distractors.length === count) break;
    }
  }
  return shuffle([...answerWords, ...distractors], rng);
}

type SentenceMode = 'build' | 'listenBuild' | 'toFrench' | 'write' | 'dictation';

function sentenceExercise(
  course: Course,
  item: Item,
  mode: SentenceMode,
  pool: Item[],
  rng: Rng,
  itemIds = [item.id],
): Exercise {
  const others = pool.filter((candidate) => candidate.id !== item.id && (candidate.type === 'word' || candidate.type === 'sentence'));
  const common = { itemIds, audio: item.target };
  const answers = [item.target, ...item.alt];
  switch (mode) {
    case 'build':
      return {
        ...common,
        kind: 'arrange',
        prompt: 'Traduis cette phrase',
        shown: item.fr,
        shownIsTarget: false,
        autoplay: false,
        bank: bankWords(item.target, others.map((other) => other.target), 3, rng),
        answers,
      };
    case 'listenBuild':
      return {
        ...common,
        kind: 'arrange',
        prompt: 'Écoute et reconstruis la phrase',
        shownIsTarget: false,
        autoplay: true,
        bank: bankWords(item.target, others.map((other) => other.target), 3, rng),
        answers,
      };
    case 'toFrench':
      return {
        ...common,
        kind: 'arrange',
        prompt: 'Que veut dire cette phrase ?',
        shown: item.target,
        shownIsTarget: true,
        autoplay: true,
        bank: bankWords(item.fr, others.map((other) => other.fr), 3, rng),
        answers: [item.fr],
      };
    case 'write':
      return {
        ...common,
        kind: 'type',
        prompt: `Écris en ${course.name}`,
        shown: item.fr,
        autoplay: false,
        answers,
      };
    case 'dictation':
      return { ...common, kind: 'type', prompt: 'Écris ce que tu entends', autoplay: true, answers };
  }
}

/** Difficulty rises with memory strength: recognise first, then assemble, then produce. */
function reviewExercise(
  course: Course,
  item: Item,
  memory: Memory,
  pool: Item[],
  rng: Rng,
  hidden: Set<string>,
): Exercise {
  const halfLife = memory[item.id]?.halfLifeDays ?? 0;
  if (item.type === 'grammar') return grammarExercise(item, halfLife >= STRONG_HALF_LIFE, rng);
  if (item.type === 'verb') return verbExercise(course, item, memory, rng);
  if (item.type === 'bank') return bankExercise(course, item, memory, hidden, rng);
  if (item.type === 'usage') return usageExercise(course, item, memory, rng);
  if (item.type === 'word') {
    if (halfLife < WEAK_HALF_LIFE) return recognize(item, pool, rng);
    if (halfLife < STRONG_HALF_LIFE) return produceChoice(item, pool, rng);
    return sentenceExercise(course, item, 'write', pool, rng);
  }
  if (halfLife < WEAK_HALF_LIFE) return sentenceExercise(course, item, 'toFrench', pool, rng);
  if (halfLife < STRONG_HALF_LIFE) return sentenceExercise(course, item, 'listenBuild', pool, rng);
  return sentenceExercise(course, item, rng() < 0.5 ? 'write' : 'dictation', pool, rng);
}

function firstRun(course: Course, unit: Unit, lesson: VocabLesson, rng: Rng): Exercise[] {
  const words = lesson.words.map((word) => wordItem(course, word));
  const sentences = lesson.sentences.map((sentence) => sentenceItem(course, sentence));
  const pool = [...words, ...sentences];
  const steps: Exercise[] = [];

  if (unit.lessons[0].id === lesson.id) steps.push({ kind: 'tip', tip: unit.tip });

  for (let start = 0; start < words.length; start += WORD_CHUNK) {
    const chunk = words.slice(start, start + WORD_CHUNK);
    steps.push(...chunk.map((item): Exercise => ({ kind: 'intro', item })));
    steps.push(recognize(chunk[0], pool, rng));
    if (chunk[1]) steps.push(produceChoice(chunk[1], pool, rng));
    if (chunk.length > 1) {
      steps.push({
        kind: 'pairs',
        itemIds: chunk.map((item) => item.id),
        pairs: chunk.map((item) => [item.target, item.fr]),
      });
    }
  }

  const modes: SentenceMode[] = ['build', 'listenBuild', 'toFrench', 'build', 'write', 'dictation'];
  sentences.forEach((item, index) => {
    steps.push(sentenceExercise(course, item, modes[index % modes.length], pool, rng));
  });
  return steps;
}

function dialogueRun(course: Course, lesson: DialogueLesson, rng: Rng): Exercise[] {
  const lineItems: Item[] = lesson.lines.map((line) => ({
    id: `${course.id}:${line.target}`,
    type: 'sentence',
    target: line.target,
    fr: line.fr,
    alt: [],
  }));
  const steps: Exercise[] = [{ kind: 'dialogue', lesson }];
  for (const question of lesson.questions) {
    steps.push({
      kind: 'choice',
      itemIds: [],
      prompt: question.prompt,
      shownIsTarget: false,
      options: shuffle([question.answer, ...question.wrong], rng),
      answer: question.answer,
    });
  }
  const longest = [...lineItems].sort((a, b) => tokenize(b.target).length - tokenize(a.target).length)[0];
  // Dialogue lines are practice material, not items scheduled for review.
  steps.push(sentenceExercise(course, longest, 'listenBuild', lineItems, rng, []));
  return steps;
}

function earlierItemsToReview(course: Course, lesson: Lesson, memory: Memory, now: number): Item[] {
  const current = new Set(itemsOfLesson(course, lesson).map((item) => item.id));
  return dueItems(course, memory, now)
    .filter((item) => !current.has(item.id))
    .sort((a, b) => recall(memory[a.id], now) - recall(memory[b.id], now))
    .slice(0, REVIEWS_IN_LESSON);
}

export function buildLesson(
  course: Course,
  unit: Unit,
  lesson: Lesson,
  alreadyDone: boolean,
  memory: Memory,
  now: number,
  rng: Rng = Math.random,
  hidden: Set<string> = new Set(),
): Exercise[] {
  if (lesson.kind === 'dialogue') return dialogueRun(course, lesson, rng);
  if (lesson.kind === 'grammar') {
    const items = grammarItems(course, lesson);
    const exercises = (alreadyDone ? shuffle(items, rng) : items).map((item) => grammarExercise(item, false, rng));
    return alreadyDone ? exercises : [{ kind: 'rule', lesson }, ...exercises];
  }

  const allItems = itemsOfCourse(course);
  const lessonItems = itemsOfLesson(course, lesson);

  if (alreadyDone) {
    // A replay practises at the learner's current level instead of repeating the introductions.
    return shuffle(lessonItems, rng)
      .slice(0, REVIEW_SIZE)
      .map((item) => reviewExercise(course, item, memory, lessonItems, rng, hidden));
  }

  const reviews = earlierItemsToReview(course, lesson, memory, now).map((item) =>
    reviewExercise(course, item, memory, allItems, rng, hidden),
  );
  return [...firstRun(course, unit, lesson, rng), ...reviews];
}

/** Picks what the learner is closest to forgetting, in any lesson already seen. */
export function buildReview(
  course: Course,
  memory: Memory,
  now: number,
  rng: Rng = Math.random,
  hidden: Set<string> = new Set(),
): Exercise[] {
  const allItems = itemsOfCourse(course);
  return allItems
    .filter((item) => memory[item.id])
    .sort((a, b) => recall(memory[a.id], now) - recall(memory[b.id], now))
    .slice(0, REVIEW_SIZE)
    .map((item) => reviewExercise(course, item, memory, allItems, rng, hidden));
}
