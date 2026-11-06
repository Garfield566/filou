export interface Word {
  target: string;
  fr: string;
  /** Other accepted spellings or synonyms in the target language. */
  alt?: string[];
}

export interface Sentence {
  target: string;
  fr: string;
  alt?: string[];
}

export interface Tip {
  title: string;
  points: string[];
  examples: [target: string, french: string][];
}

export interface VocabLesson {
  kind: 'vocab';
  id: string;
  title: string;
  words: Word[];
  sentences: Sentence[];
}

export interface DialogueLine {
  speaker: string;
  target: string;
  fr: string;
}

export interface DialogueQuestion {
  prompt: string;
  answer: string;
  wrong: string[];
}

export interface DialogueLesson {
  kind: 'dialogue';
  id: string;
  title: string;
  context: string;
  lines: DialogueLine[];
  questions: DialogueQuestion[];
}

export type Level = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export interface GrammarTable {
  title?: string;
  headers: string[];
  rows: string[][];
}

export type GrammarQuestion =
  | { type: 'choose'; sentence: string; answer: string; wrong: string[]; fr: string; why: string }
  | { type: 'complete'; sentence: string; answers: string[]; fr: string; why: string }
  | { type: 'transform'; instruction: string; source: string; answers: string[]; fr: string; why: string }
  | { type: 'order'; fr: string; answer: string; distractors: string[]; why: string }
  | { type: 'spot'; answer: string; wrong: string[]; why: string };

export interface GrammarLesson {
  kind: 'grammar';
  id: string;
  title: string;
  level: Level;
  intro: string;
  points: string[];
  tables: GrammarTable[];
  examples: [target: string, french: string][];
  questions: GrammarQuestion[];
}

export type Lesson = VocabLesson | GrammarLesson | DialogueLesson;

export interface Unit {
  id: string;
  title: string;
  description: string;
  level?: Level;
  tip: Tip;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  /** Used inside a sentence: « Écris en anglais ». */
  name: string;
  /** Used on its own: the language switcher. */
  label: string;
  languageTag: string;
  /** Letters missing from a French keyboard. */
  specialKeys: string[];
  /** Grammar words skipped when looking up a noun's translation, such as German articles. */
  articles: string[];
  units: Unit[];
  /** Lower-level units left out of the course, kept so their words still translate on tap. */
  foundation: Unit[];
  /** Frequency-ordered vocabulary built from open data. */
  bank: BankWord[];
}

export interface IrregularVerb {
  name: string;
  fr: string;
  /** English: past, participle. German: third person, Präteritum, Perfekt. */
  forms: string[];
}

export interface VerbFamily {
  id: string;
  title: string;
  hint: string;
  verbs: IrregularVerb[];
}

export interface BankSentence {
  /** Tatoeba id (`en-lex-<n>` for sentences written for the lexicon), used for credits and for hiding a bad sentence. */
  id: string;
  text: string;
  fr: string;
}

/** Theme of a bank word, used to group the vocabulary tables. */
export type LexicalField =
  | 'commerce'
  | 'guerre'
  | 'droit'
  | 'construction'
  | 'religion'
  | 'administration'
  | 'vie_quotidienne';

export interface BankWord {
  target: string;
  fr: string;
  pos: string;
  plural: string | null;
  domain?: LexicalField;
  sentences: BankSentence[];
}

/** A word, sentence, grammar point or verb the learner memorises and reviews. */
export interface Item {
  id: string;
  type: 'word' | 'sentence' | 'grammar' | 'verb' | 'bank';
  target: string;
  fr: string;
  alt: string[];
  question?: GrammarQuestion;
  verb?: IrregularVerb;
  word?: BankWord;
}

export type Exercise =
  | { kind: 'intro'; item: Item }
  | { kind: 'tip'; tip: Tip }
  | { kind: 'rule'; lesson: GrammarLesson }
  | { kind: 'verbs'; family: VerbFamily }
  | { kind: 'dialogue'; lesson: DialogueLesson }
  | {
      kind: 'choice';
      itemIds: string[];
      prompt: string;
      /** Shown above the options. */
      shown?: string;
      shownIsTarget: boolean;
      audio?: string;
      options: string[];
      answer: string;
      why?: string;
    }
  | { kind: 'pairs'; itemIds: string[]; pairs: [target: string, french: string][] }
  | {
      kind: 'arrange';
      itemIds: string[];
      prompt: string;
      shown?: string;
      shownIsTarget: boolean;
      audio: string;
      /** Plays as soon as the exercise opens. */
      autoplay: boolean;
      bank: string[];
      answers: string[];
      why?: string;
      sentenceId?: string;
    }
  | {
      kind: 'type';
      itemIds: string[];
      prompt: string;
      shown?: string;
      audio: string;
      autoplay: boolean;
      answers: string[];
      why?: string;
      /** Spelling is what is being tested, so typos are not forgiven. */
      strict?: boolean;
      sentenceId?: string;
    };

export type Card = Extract<Exercise, { kind: 'intro' | 'tip' | 'rule' | 'verbs' | 'dialogue' }>;
