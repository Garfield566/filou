import type { BankSentence, BankWord, Course, Exercise, Item } from '../types';
import { normalize, tokenize } from './grade';
import { isDue, recall, type Memory } from './memory';
import { shuffle, type Rng } from './random';

const NEW_WORDS = 5;
const REVIEWS_IN_SESSION = 3;
const WEAK_HALF_LIFE = 1;
const STRONG_HALF_LIFE = 7;

const itemsByCourse = new Map<string, Item[]>();

function itemOf(course: Course, word: BankWord): Item {
  return { id: `${course.id}:b:${word.target}`, type: 'bank', target: word.target, fr: word.fr, alt: [], word };
}

export function bankItems(course: Course): Item[] {
  let items = itemsByCourse.get(course.id);
  if (!items) {
    items = course.bank.map((word) => itemOf(course, word));
    itemsByCourse.set(course.id, items);
  }
  return items;
}

const visibleSentences = (item: Item, hidden: Set<string>): BankSentence[] =>
  item.word!.sentences.filter((sentence) => !hidden.has(sentence.id));

function otherValues(course: Course, item: Item, side: 'target' | 'fr', rng: Rng): string[] {
  const seen = new Set([normalize(item[side]), normalize(item.fr)]);
  const picked: string[] = [];
  for (const candidate of shuffle(bankItems(course), rng)) {
    const key = normalize(candidate[side]);
    if (!seen.has(key) && !seen.has(normalize(candidate.fr))) {
      seen.add(key);
      seen.add(normalize(candidate.fr));
      picked.push(candidate[side]);
      if (picked.length === 3) break;
    }
  }
  return picked;
}

function recognize(course: Course, item: Item, rng: Rng): Exercise {
  return {
    kind: 'choice',
    itemIds: [item.id],
    prompt: 'Que veut dire ce mot ?',
    shown: item.target,
    shownIsTarget: true,
    audio: item.target,
    options: shuffle([item.fr, ...otherValues(course, item, 'fr', rng)], rng),
    answer: item.fr,
  };
}

function produce(course: Course, item: Item, rng: Rng): Exercise {
  return {
    kind: 'choice',
    itemIds: [item.id],
    prompt: `Comment dit-on « ${item.fr} » ?`,
    shownIsTarget: false,
    audio: item.target,
    options: shuffle([item.target, ...otherValues(course, item, 'target', rng)], rng),
    answer: item.target,
  };
}

function wordBank(course: Course, item: Item, sentence: BankSentence, rng: Rng): string[] {
  const words = tokenize(sentence.de);
  const taken = new Set(words.map((word) => normalize(word)));
  const extras: string[] = [];
  for (const other of shuffle(bankItems(course), rng)) {
    if (other.id === item.id) continue;
    for (const word of tokenize(other.word!.sentences[0].de)) {
      if (extras.length < 3 && !taken.has(normalize(word))) {
        taken.add(normalize(word));
        extras.push(word);
      }
    }
    if (extras.length === 3) break;
  }
  return shuffle([...words, ...extras], rng);
}

function buildSentence(course: Course, item: Item, sentence: BankSentence, listen: boolean, rng: Rng): Exercise {
  return {
    kind: 'arrange',
    itemIds: [item.id],
    prompt: listen ? 'Écoute et reconstruis la phrase' : 'Traduis cette phrase',
    shown: listen ? undefined : sentence.fr,
    shownIsTarget: false,
    audio: sentence.de,
    autoplay: listen,
    bank: wordBank(course, item, sentence, rng),
    answers: [sentence.de],
    why: listen ? `« ${sentence.fr} »` : undefined,
    sentenceId: sentence.id,
  };
}

function writeWord(course: Course, item: Item): Exercise {
  return {
    kind: 'type',
    itemIds: [item.id],
    prompt: `Écris en ${course.name}`,
    shown: item.fr,
    audio: item.target,
    autoplay: false,
    answers: [item.target],
    strict: true,
  };
}

function dictation(item: Item, sentence: BankSentence): Exercise {
  return {
    kind: 'type',
    itemIds: [item.id],
    prompt: 'Écris ce que tu entends',
    audio: sentence.de,
    autoplay: true,
    answers: [sentence.de],
    why: `« ${sentence.fr} »`,
    sentenceId: sentence.id,
  };
}

/** Difficulty rises with memory: recognise the word, rebuild a sentence, then write it unaided. */
export function bankExercise(course: Course, item: Item, memory: Memory, hidden: Set<string>, rng: Rng = Math.random): Exercise {
  const halfLife = memory[item.id]?.halfLifeDays ?? 0;
  const sentences = visibleSentences(item, hidden);
  const sentence = sentences[Math.floor(rng() * sentences.length)];
  const firstOption = rng() < 0.5;

  if (halfLife >= STRONG_HALF_LIFE) return firstOption || !sentence ? writeWord(course, item) : dictation(item, sentence);
  if (halfLife >= WEAK_HALF_LIFE) {
    return firstOption || !sentence ? produce(course, item, rng) : buildSentence(course, item, sentence, false, rng);
  }
  return firstOption || !sentence ? recognize(course, item, rng) : buildSentence(course, item, sentence, true, rng);
}

export const learnedBankWords = (course: Course, memory: Memory): number =>
  bankItems(course).filter((item) => memory[item.id]).length;

/** Introduces the next most useful words, then mixes in those starting to fade. */
export function buildBankSession(
  course: Course,
  memory: Memory,
  hidden: Set<string>,
  now: number,
  rng: Rng = Math.random,
): Exercise[] {
  const items = bankItems(course);
  const fresh = items.filter((item) => !memory[item.id]).slice(0, NEW_WORDS);
  const fading = items
    .filter((item) => memory[item.id] && isDue(memory[item.id], now))
    .sort((a, b) => recall(memory[a.id], now) - recall(memory[b.id], now))
    .slice(0, REVIEWS_IN_SESSION);

  const steps: Exercise[] = [];
  for (const item of fresh) {
    steps.push({ kind: 'intro', item }, recognize(course, item, rng));
  }
  for (const item of shuffle(fresh, rng)) {
    const sentences = visibleSentences(item, hidden);
    const sentence = sentences[0];
    steps.push(sentence ? buildSentence(course, item, sentence, false, rng) : produce(course, item, rng));
  }
  return [...steps, ...fading.map((item) => bankExercise(course, item, memory, hidden, rng))];
}
