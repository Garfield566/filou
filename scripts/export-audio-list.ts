import { mkdirSync, writeFileSync } from 'node:fs';
import { courses, lessonsOf } from '../src/data/courses';
import { audioFile } from '../src/lib/audioFile';
import { conjugate, spokenForm, tensesOf, verbNames } from '../src/lib/conjugation';
import { grammarTarget } from '../src/lib/session';
import { spokenVerb, verbFamilies } from '../src/lib/verbs';

const entries = courses.flatMap((course) => {
  const texts = new Set<string>();
  for (const unit of course.units) {
    for (const [target] of unit.tip.examples) texts.add(target);
  }
  for (const lesson of lessonsOf(course)) {
    if (lesson.kind === 'vocab') {
      for (const word of lesson.words) texts.add(word.target);
      for (const sentence of lesson.sentences) texts.add(sentence.target);
    } else if (lesson.kind === 'grammar') {
      for (const [target] of lesson.examples) texts.add(target);
      for (const question of lesson.questions) texts.add(grammarTarget(question));
    } else {
      for (const line of lesson.lines) texts.add(line.target);
    }
  }
  for (const word of course.bank) {
    texts.add(word.target);
    for (const sentence of word.sentences) texts.add(sentence.text);
  }
  for (const family of verbFamilies(course)) {
    for (const verb of family.verbs) texts.add(spokenVerb(verb));
  }
  for (const tense of tensesOf(course)) {
    for (const verb of verbNames(course)) {
      for (const entry of conjugate(course, verb.name, tense.id)) texts.add(spokenForm(entry));
    }
  }
  return [...texts].map((text) => ({ course: course.id, text, file: audioFile(text) }));
});

mkdirSync('.tools', { recursive: true });
writeFileSync('.tools/audio-list.json', JSON.stringify(entries, null, 1));
console.log(`${entries.length} textes exportés`);
