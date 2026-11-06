import enLexicon from '../strategie/content/en-lexicon.json';
import type { BankWord, Course, GrammarLesson, Level, Unit } from '../types';
import { englishUnits } from './english';
import { englishAdvancedUnits } from './englishAdvanced';
import { englishLaterUnits } from './englishGrammar';
import { germanUnits } from './german';
import { germanAdvancedUnits } from './germanAdvanced';
import { germanGrammar, germanLaterUnits } from './germanGrammar';
import wordBankDe from './wordBankDe.json';

const LEVELS: Level[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

/** A lesson is shown at its unit's level when it was written for a lower one. */
function raisedTo(unit: Unit, level: Level): Unit {
  const raise = (current: Level): Level => (LEVELS.indexOf(current) < LEVELS.indexOf(level) ? level : current);
  return {
    ...unit,
    level,
    lessons: unit.lessons.map((lesson) =>
      lesson.kind === 'grammar' ? { ...lesson, level: raise(lesson.level) } : lesson,
    ),
  };
}

/** Grammar comes after a unit's vocabulary and before its dialogue, which uses both. */
function withGrammar(unit: Unit, grammar: GrammarLesson[]): Unit {
  const dialogue = unit.lessons.at(-1)!;
  return { ...unit, lessons: [...unit.lessons.slice(0, -1), ...grammar, dialogue] };
}

const unitById = (units: Unit[], id: string): Unit => units.find((unit) => unit.id === id)!;

/** Irregular verbs open the first English unit: the perfect tenses that follow rely on them. */
function withIrregularVerbsFirst(unit: Unit): Unit {
  const irregular = unitById(englishLaterUnits, 'en-past').lessons.find((lesson) => lesson.id === 'en-g-past-irregular')!;
  const firstGrammar = unit.lessons.findIndex((lesson) => lesson.kind === 'grammar');
  return {
    ...unit,
    lessons: [...unit.lessons.slice(0, firstGrammar), irregular, ...unit.lessons.slice(firstGrammar)],
  };
}

const grammarById = (id: string): GrammarLesson =>
  Object.values(germanGrammar)
    .flat()
    .find((lesson) => lesson.id === id)!;

const german = (id: string, grammarIds: string[]): Unit =>
  raisedTo(withGrammar(unitById(germanUnits, id), grammarIds.map(grammarById)), 'A2');

export const courses: Course[] = [
  {
    id: 'en',
    name: 'anglais',
    label: 'Anglais',
    languageTag: 'en-US',
    specialKeys: [],
    articles: ['a', 'an', 'the', 'to'],
    foundation: [...englishUnits, ...englishLaterUnits.slice(0, 2)],
    bank: enLexicon as BankWord[],
    units: [
      raisedTo(withIrregularVerbsFirst(unitById(englishLaterUnits, 'en-experience')), 'B1'),
      raisedTo(unitById(englishLaterUnits, 'en-explain'), 'B1'),
      ...englishAdvancedUnits,
    ],
  },
  {
    id: 'de',
    name: 'allemand',
    label: 'Allemand',
    languageTag: 'de-DE',
    specialKeys: ['ä', 'ö', 'ü', 'ß'],
    articles: ['der', 'die', 'das', 'ein', 'eine'],
    foundation: germanUnits,
    bank: wordBankDe as BankWord[],
    units: [
      german('de-town', ['de-g-word-order', 'de-g-accusative', 'de-g-dative', 'de-g-separable']),
      german('de-travel', ['de-g-modals', 'de-g-two-way']),
      ...germanLaterUnits.map((unit) => raisedTo(unit, unit.level!)),
      ...germanAdvancedUnits,
    ],
  },
];

export const courseById = (id: string): Course => courses.find((c) => c.id === id) ?? courses[0];

export const lessonsOf = (course: Course) => course.units.flatMap((unit) => unit.lessons);
