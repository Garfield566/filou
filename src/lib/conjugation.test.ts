import { describe, expect, it } from 'vitest';
import { courseById } from '../data/courses';
import { buildConjugationDrill, conjugate, spokenForm, tensesOf, verbNames } from './conjugation';
import { grade } from './grade';

const english = courseById('en');
const german = courseById('de');
const forms = (course: typeof english, verb: string, tense: string) =>
  conjugate(course, verb, tense).map((entry) => entry.form);

describe('English conjugation', () => {
  it('adds the third person ending only', () => {
    expect(forms(english, 'go', 'present')).toEqual(['go', 'go', 'goes', 'goes', 'go', 'go']);
  });

  it('handles every form of be', () => {
    expect(forms(english, 'be', 'present')).toEqual(['am', 'are', 'is', 'is', 'are', 'are']);
    expect(forms(english, 'be', 'past')).toEqual(['was', 'were', 'was', 'was', 'were', 'were']);
    expect(forms(english, 'be', 'perfect')[2]).toBe('has been');
  });

  it('builds compound tenses', () => {
    expect(forms(english, 'study', 'continuous')[0]).toBe('am studying');
    expect(forms(english, 'write', 'perfect')[2]).toBe('has written');
    expect(forms(english, 'eat', 'future')[3]).toBe('will eat');
  });
});

describe('German conjugation', () => {
  it('uses stem changes in the present', () => {
    expect(forms(german, 'fahren', 'present')).toEqual(['fahre', 'fährst', 'fährt', 'fahren', 'fahrt', 'fahren']);
  });

  it('chooses the right Perfekt auxiliary', () => {
    expect(forms(german, 'machen', 'perfect')[0]).toBe('habe gemacht');
    expect(forms(german, 'gehen', 'perfect')[0]).toBe('bin gegangen');
    expect(forms(german, 'sein', 'perfect')[1]).toBe('bist gewesen');
  });

  it('forms the Präteritum of weak, strong and irregular verbs', () => {
    expect(forms(german, 'machen', 'preterite')).toEqual(['machte', 'machtest', 'machte', 'machten', 'machtet', 'machten']);
    expect(forms(german, 'gehen', 'preterite')).toEqual(['ging', 'gingst', 'ging', 'gingen', 'gingt', 'gingen']);
    expect(forms(german, 'sein', 'preterite')).toEqual(['war', 'warst', 'war', 'waren', 'wart', 'waren']);
    expect(forms(german, 'essen', 'preterite')).toEqual(['aß', 'aßest', 'aß', 'aßen', 'aßt', 'aßen']);
    expect(forms(german, 'finden', 'preterite')).toEqual(['fand', 'fandest', 'fand', 'fanden', 'fandet', 'fanden']);
    expect(forms(german, 'werden', 'preterite')).toEqual(['wurde', 'wurdest', 'wurde', 'wurden', 'wurdet', 'wurden']);
  });

  it('builds the future with werden', () => {
    expect(forms(german, 'lernen', 'future')[1]).toBe('wirst lernen');
  });
});

describe.each([english, german].map((course) => [course.label, course] as const))('%s drills', (_, course) => {
  it('builds a solvable drill for every tense, with or without the pronoun', () => {
    for (const tense of tensesOf(course)) {
      const drill = buildConjugationDrill(course, tense.id);
      expect(drill).toHaveLength(10);
      for (const step of drill) {
        if (step.kind !== 'type') throw new Error('expected a typed exercise');
        expect(step.strict).toBe(true);
        expect(grade(step.answers, step.answers[1])).toBe('correct');
      }
    }
  });

  it('can speak every form', () => {
    const { name } = verbNames(course)[0];
    expect(spokenForm(conjugate(course, name, 'present')[0])).toMatch(/^[A-Z].+\.$/);
  });
});
