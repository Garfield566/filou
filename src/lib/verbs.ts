import {
  ENGLISH_FORM_LABELS,
  GERMAN_FORM_LABELS,
  englishVerbFamilies,
  germanVerbFamilies,
} from '../data/irregularVerbs';
import type { Course, Exercise, IrregularVerb, Item, VerbFamily } from '../types';
import { recall, type Memory } from './memory';
import { shuffle, type Rng } from './random';

const SESSION_VERBS = 8;
const REVIEW_VERBS = 12;
const STRONG_HALF_LIFE = 7;
const WEAK_HALF_LIFE = 1;

export function verbFamilies(course: Course): VerbFamily[] {
  return course.id === 'de' ? germanVerbFamilies : englishVerbFamilies;
}

export function formLabels(course: Course): string[] {
  return course.id === 'de' ? GERMAN_FORM_LABELS : ENGLISH_FORM_LABELS;
}

/** All of a verb's principal parts, read aloud and shown as the full answer. */
export function spokenVerb(verb: IrregularVerb): string {
  return `${verb.name}, ${verb.forms.join(', ')}`;
}

export function verbItem(course: Course, verb: IrregularVerb): Item {
  return { id: `${course.id}:v:${verb.name}`, type: 'verb', target: spokenVerb(verb), fr: verb.fr, alt: [], verb };
}

export function verbItems(course: Course): Item[] {
  return verbFamilies(course).flatMap((family) => family.verbs.map((verb) => verbItem(course, verb)));
}

function otherForms(item: Item, index: number, pool: Item[], rng: Rng): string[] {
  const verb = item.verb!;
  const answer = verb.forms[index];
  const seen = new Set([answer]);
  const picked: string[] = [];
  const add = (form: string) => {
    if (!seen.has(form) && picked.length < 3) {
      seen.add(form);
      picked.push(form);
    }
  };
  verb.forms.forEach(add);
  add(verb.name);
  for (const other of shuffle(pool, rng)) add(other.verb!.forms[index]);
  return picked;
}

function chooseForm(course: Course, item: Item, index: number, pool: Item[], rng: Rng): Exercise {
  const verb = item.verb!;
  const answer = verb.forms[index];
  return {
    kind: 'choice',
    itemIds: [item.id],
    prompt: `Quel est le ${formLabels(course)[index]} de ce verbe ?`,
    shown: `${verb.name} (${verb.fr})`,
    shownIsTarget: false,
    audio: item.target,
    options: shuffle([answer, ...otherForms(item, index, pool, rng)], rng),
    answer,
    why: item.target,
  };
}

function typeForm(course: Course, item: Item, index: number): Exercise {
  const verb = item.verb!;
  return {
    kind: 'type',
    itemIds: [item.id],
    prompt: `Écris le ${formLabels(course)[index]}`,
    shown: `${verb.name} (${verb.fr})`,
    audio: item.target,
    autoplay: false,
    answers: [verb.forms[index], ...(verb.variants?.[index] ?? [])],
    why: item.target,
    strict: true,
  };
}

function typeAllForms(course: Course, item: Item): Exercise {
  const verb = item.verb!;
  return {
    kind: 'type',
    itemIds: [item.id],
    prompt: `Écris : ${formLabels(course).join(', ')}`,
    shown: `${verb.name} (${verb.fr})`,
    audio: item.target,
    autoplay: false,
    answers: allFormsAnswers(verb),
    why: item.target,
    strict: true,
  };
}

/** Every accepted way of writing all the forms: the usual ones, or one form in another standard spelling. */
function allFormsAnswers(verb: IrregularVerb): string[] {
  const answers = [verb.forms.join(' ')];
  verb.forms.forEach((_, index) => {
    for (const variant of verb.variants?.[index] ?? []) {
      answers.push(verb.forms.map((form, position) => (position === index ? variant : form)).join(' '));
    }
  });
  return answers;
}

/**
 * The practice of a lesson of the verbs path: each verb chosen then written, and, to close, all the forms of the
 * first two verbs. The lesson's table comes before it.
 */
export function verbLessonPractice(course: Course, items: Item[], pool: Item[], rng: Rng = Math.random): Exercise[] {
  const practice = items.flatMap((item) => {
    const last = item.verb!.forms.length - 1;
    return [chooseForm(course, item, Math.floor(rng() * item.verb!.forms.length), pool, rng), typeForm(course, item, last)];
  });
  return [...practice, ...items.slice(0, 2).map((item) => typeAllForms(course, item))];
}

/** Difficulty rises with memory: pick one form, then type one, then type them all. */
export function verbExercise(course: Course, item: Item, memory: Memory, rng: Rng = Math.random): Exercise {
  const halfLife = memory[item.id]?.halfLifeDays ?? 0;
  const pool = verbItems(course);
  const index = Math.floor(rng() * item.verb!.forms.length);
  if (halfLife >= STRONG_HALF_LIFE) return typeAllForms(course, item);
  if (halfLife >= WEAK_HALF_LIFE) return typeForm(course, item, index);
  return chooseForm(course, item, index, pool, rng);
}

const weakestFirst = (memory: Memory, now: number) => (a: Item, b: Item) => {
  const left = memory[a.id] ? recall(memory[a.id], now) : -1;
  const right = memory[b.id] ? recall(memory[b.id], now) : -1;
  return left - right;
};

/** Teaches a family's least known verbs: the table first, then every form in turn. */
export function buildVerbSession(
  course: Course,
  familyId: string,
  memory: Memory,
  now: number,
  rng: Rng = Math.random,
): Exercise[] {
  const family = verbFamilies(course).find((item) => item.id === familyId)!;
  const items = family.verbs
    .map((verb) => verbItem(course, verb))
    .sort(weakestFirst(memory, now))
    .slice(0, SESSION_VERBS);
  const pool = verbItems(course);

  const practice = shuffle(items, rng).flatMap((item) => {
    const last = item.verb!.forms.length - 1;
    return [chooseForm(course, item, 0, pool, rng), typeForm(course, item, last)];
  });
  return [{ kind: 'verbs', family }, ...practice];
}

/** Mixes verbs from every family, starting with the unseen and the fading. */
export function buildVerbReview(course: Course, memory: Memory, now: number, rng: Rng = Math.random): Exercise[] {
  return shuffle(verbItems(course), rng)
    .sort(weakestFirst(memory, now))
    .slice(0, REVIEW_VERBS)
    .map((item) => verbExercise(course, item, memory, rng));
}

/** How many of a family's verbs are currently remembered. */
export function familyProgress(course: Course, family: VerbFamily, memory: Memory, now: number): number {
  return family.verbs.filter((verb) => {
    const known = memory[verbItem(course, verb).id];
    return known !== undefined && recall(known, now) >= 0.5;
  }).length;
}
