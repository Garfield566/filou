import { describe, expect, it } from 'vitest';
import { audioFile } from '../lib/audioFile';
import { normalize } from '../lib/grade';
import { courseById, courses, lessonsOf } from './courses';

const lessons = courses.flatMap(lessonsOf);

describe('course content', () => {
  it('has lesson ids unique across all courses, since progress is one shared list', () => {
    const ids = lessons.map((lesson) => lesson.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('starts and ends each course at the requested level', () => {
    const levels = (id: string) => courseById(id).units.map((unit) => unit.level);
    expect(levels('en')[0]).toBe('B1');
    expect(levels('en').at(-1)).toBe('C2');
    expect(levels('de')[0]).toBe('A2');
    expect(levels('de').at(-1)).toBe('B2');
  });

  it('keeps levels in rising order and never shows a lesson below its unit', () => {
    const order = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
    for (const course of courses) {
      const ranks = course.units.map((unit) => order.indexOf(unit.level!));
      expect(ranks).toEqual([...ranks].sort((a, b) => a - b));
      for (const unit of course.units) {
        for (const lesson of unit.lessons) {
          if (lesson.kind === 'grammar') {
            expect(order.indexOf(lesson.level), lesson.id).toBeGreaterThanOrEqual(order.indexOf(unit.level!));
          }
        }
      }
    }
  });

  it.each(courses.map((course) => [course.label, course] as const))('%s has a complete structure', (_, course) => {
    for (const unit of course.units) {
      const kinds = unit.lessons.map((lesson) => lesson.kind);
      expect(kinds.at(-1)).toBe('dialogue');
      expect(kinds.filter((kind) => kind === 'grammar').length).toBeGreaterThanOrEqual(2);
      expect(kinds.indexOf('grammar')).toBeGreaterThan(kinds.lastIndexOf('vocab'));
      expect(unit.tip.points.length).toBeGreaterThanOrEqual(3);
      expect(unit.tip.examples.length).toBeGreaterThanOrEqual(3);
    }
    for (const lesson of lessonsOf(course)) {
      if (lesson.kind === 'vocab') {
        expect(lesson.words).toHaveLength(8);
        expect(lesson.sentences).toHaveLength(6);
      }
      if (lesson.kind === 'grammar') {
        expect(lesson.questions).toHaveLength(6);
        expect(lesson.tables.length).toBeGreaterThanOrEqual(1);
        expect(lesson.examples.length).toBeGreaterThanOrEqual(2);
      }
    }
  });

  it.each(courses.map((course) => [course.label, course] as const))('%s grammar questions are well formed', (_, course) => {
    for (const lesson of lessonsOf(course)) {
      if (lesson.kind !== 'grammar') continue;
      for (const question of lesson.questions) {
        if (question.type === 'choose' || question.type === 'complete') {
          expect(question.sentence.split('___'), question.sentence).toHaveLength(2);
        }
        if (question.type === 'choose' || question.type === 'spot') {
          expect(question.wrong, question.answer).not.toContain(question.answer);
          expect(question.wrong.length).toBeGreaterThanOrEqual(2);
        }
        expect(question.why.length).toBeGreaterThan(5);
      }
    }
  });

  it.each(courses.map((course) => [course.label, course] as const))('%s teaches each word once', (_, course) => {
    const targets = lessonsOf(course).flatMap((lesson) =>
      lesson.kind === 'vocab' ? lesson.words.map((word) => word.target) : [],
    );
    expect(targets.filter((target, index) => targets.indexOf(target) !== index)).toEqual([]);
  });

  it('keeps French meanings distinct inside a lesson, so pairs have one solution', () => {
    for (const lesson of lessons) {
      if (lesson.kind !== 'vocab') continue;
      const meanings = lesson.words.map((word) => normalize(word.fr));
      expect(new Set(meanings).size, lesson.id).toBe(meanings.length);
    }
  });

  it('gives every text its own audio file', () => {
    for (const course of courses) {
      const texts = new Set(
        lessonsOf(course).flatMap((lesson) =>
          lesson.kind === 'vocab'
            ? [...lesson.words, ...lesson.sentences].map((item) => item.target)
            : lesson.kind === 'dialogue'
              ? lesson.lines.map((item) => item.target)
              : [],
        ),
      );
      expect(new Set([...texts].map(audioFile)).size).toBe(texts.size);
    }
  });

  it('falls back to the first course for an unknown id', () => {
    expect(courseById('nope')).toBe(courses[0]);
  });
});
