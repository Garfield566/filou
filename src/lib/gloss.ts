import { lessonsOf } from '../data/courses';
import type { Course } from '../types';
import { normalize, tokenize } from './grade';

const dictionaries = new Map<string, Map<string, string>>();

function dictionaryOf(course: Course): Map<string, string> {
  const cached = dictionaries.get(course.id);
  if (cached) return cached;

  const dictionary = new Map<string, string>();
  const articles = new Set(course.articles.map((word) => normalize(word)));
  for (const lesson of [...lessonsOf(course), ...course.foundation.flatMap((unit) => unit.lessons)]) {
    if (lesson.kind !== 'vocab') continue;
    for (const word of lesson.words) {
      const parts = tokenize(word.target);
      const key = parts.filter((part) => !articles.has(normalize(part))).join(' ');
      if (!dictionary.has(normalize(key))) dictionary.set(normalize(key), word.fr);
    }
  }
  for (const word of course.bank) {
    // A game word carries its meaning in the game: "fair" is a market there, not in a lesson.
    if (word.domain) continue;
    const key = tokenize(word.target).filter((part) => !articles.has(normalize(part))).join(' ');
    if (!dictionary.has(normalize(key))) dictionary.set(normalize(key), word.fr);
  }
  dictionaries.set(course.id, dictionary);
  return dictionary;
}

/** Translation of one word from a sentence, when the course teaches it. */
export function glossOf(course: Course, word: string): string | undefined {
  return dictionaryOf(course).get(normalize(word));
}
