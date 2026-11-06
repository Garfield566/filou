export type Exercise =
  | { kind: 'choice'; prompt: string; options: string[]; answer: string }
  | { kind: 'arrange'; sentence: string; answers: string[]; distractors: string[] }
  | { kind: 'type'; sentence: string; answers: string[] }
  | { kind: 'listen'; text: string; answers: string[] }
  | { kind: 'pairs'; pairs: [target: string, french: string][] };

export interface Lesson {
  id: string;
  title: string;
  exercises: Exercise[];
}

export interface Unit {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  /** Used inside a sentence: « Écris en anglais ». */
  name: string;
  /** Used on its own: the language switcher. */
  label: string;
  /** BCP 47 tag, for text-to-speech and the answer field. */
  languageTag: string;
  units: Unit[];
}
