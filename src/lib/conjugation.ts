import { englishVerbs, germanVerbs, type EnglishVerb, type GermanVerb } from '../data/verbs';
import type { Course, Exercise } from '../types';
import { shuffle, type Rng } from './random';

export interface Tense {
  id: string;
  label: string;
}

export interface ConjugatedForm {
  pronoun: string;
  form: string;
}

const DRILL_SIZE = 10;

const ENGLISH_PRONOUNS = ['I', 'you', 'he', 'she', 'we', 'they'];
const GERMAN_PRONOUNS = ['ich', 'du', 'er', 'wir', 'ihr', 'sie'];

export const ENGLISH_TENSES: Tense[] = [
  { id: 'present', label: 'présent simple' },
  { id: 'continuous', label: 'présent continu' },
  { id: 'past', label: 'prétérit' },
  { id: 'perfect', label: 'present perfect' },
  { id: 'future', label: 'futur avec will' },
];

export const GERMAN_TENSES: Tense[] = [
  { id: 'present', label: 'Präsens' },
  { id: 'perfect', label: 'Perfekt' },
  { id: 'preterite', label: 'Präteritum' },
  { id: 'future', label: 'Futur I' },
];

const isThird = (pronoun: string) => pronoun === 'he' || pronoun === 'she';

function beForm(pronoun: string, past: boolean): string {
  if (past) return pronoun === 'I' || isThird(pronoun) ? 'was' : 'were';
  if (pronoun === 'I') return 'am';
  return isThird(pronoun) ? 'is' : 'are';
}

function conjugateEnglish(verb: EnglishVerb, tenseId: string, pronoun: string): string {
  switch (tenseId) {
    case 'present':
      if (verb.base === 'be') return beForm(pronoun, false);
      return isThird(pronoun) ? verb.third : verb.base;
    case 'continuous':
      return `${beForm(pronoun, false)} ${verb.ing}`;
    case 'past':
      return verb.base === 'be' ? beForm(pronoun, true) : verb.past;
    case 'perfect':
      return `${isThird(pronoun) ? 'has' : 'have'} ${verb.participle}`;
    default:
      return `will ${verb.base}`;
  }
}

function germanPreterite(verb: GermanVerb, index: number): string {
  const stem = verb.preterite;
  if (/[td]e$/.test(stem)) {
    return [stem, `${stem}st`, stem, `${stem}n`, `${stem}t`, `${stem}n`][index];
  }
  const du = /[sßdt]$/.test(stem) ? 'est' : 'st';
  const ihr = /[dt]$/.test(stem) ? 'et' : 't';
  return [stem, stem + du, stem, `${stem}en`, stem + ihr, `${stem}en`][index];
}

function germanVerb(infinitive: string): GermanVerb {
  return germanVerbs.find((verb) => verb.infinitive === infinitive)!;
}

function conjugateGerman(verb: GermanVerb, tenseId: string, index: number): string {
  switch (tenseId) {
    case 'present':
      return verb.present[index];
    case 'perfect':
      return `${germanVerb(verb.auxiliary).present[index]} ${verb.participle}`;
    case 'preterite':
      return germanPreterite(verb, index);
    default:
      return `${germanVerb('werden').present[index]} ${verb.infinitive}`;
  }
}

export function tensesOf(course: Course): Tense[] {
  return course.id === 'de' ? GERMAN_TENSES : ENGLISH_TENSES;
}

export function verbNames(course: Course): { name: string; fr: string }[] {
  return course.id === 'de'
    ? germanVerbs.map((verb) => ({ name: verb.infinitive, fr: verb.fr }))
    : englishVerbs.map((verb) => ({ name: verb.base, fr: verb.fr }));
}

export function conjugate(course: Course, verbName: string, tenseId: string): ConjugatedForm[] {
  if (course.id === 'de') {
    const verb = germanVerb(verbName);
    return GERMAN_PRONOUNS.map((pronoun, index) => ({ pronoun, form: conjugateGerman(verb, tenseId, index) }));
  }
  const verb = englishVerbs.find((item) => item.base === verbName)!;
  return ENGLISH_PRONOUNS.map((pronoun) => ({ pronoun, form: conjugateEnglish(verb, tenseId, pronoun) }));
}

/** The text read aloud, which is also what the audio generator produces. */
export function spokenForm({ pronoun, form }: ConjugatedForm): string {
  return `${pronoun[0].toUpperCase()}${pronoun.slice(1)} ${form}.`;
}

export function buildConjugationDrill(course: Course, tenseId: string, rng: Rng = Math.random): Exercise[] {
  const tense = tensesOf(course).find((item) => item.id === tenseId)!;
  const count = course.id === 'de' ? GERMAN_PRONOUNS.length : ENGLISH_PRONOUNS.length;

  return shuffle(verbNames(course), rng)
    .slice(0, DRILL_SIZE)
    .map(({ name, fr }) => {
      const entry = conjugate(course, name, tenseId)[Math.floor(rng() * count)];
      const label = course.id === 'de' && entry.pronoun === 'sie' ? 'sie (ils, elles)' : entry.pronoun;
      return {
        kind: 'type',
        itemIds: [],
        prompt: `Conjugue au ${tense.label}`,
        shown: `${name} (${fr}) : ${label}`,
        audio: spokenForm(entry),
        autoplay: false,
        answers: [entry.form, `${entry.pronoun} ${entry.form}`],
        strict: true,
      };
    });
}
