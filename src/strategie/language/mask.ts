import lexicon from '../content/en-lexicon.json';
import data from '../content/en-socle.json';
import type { GameText, LanguageProfile, NodeState, TextCoverage, VisibleSegment } from '../types';

/** What the game knows about the words of a language, whatever the learner has studied. */
export interface TextVocabulary {
  socle: ReadonlySet<string>;
  falseFriends: ReadonlySet<string>;
  transparents: ReadonlySet<string>;
  /** Lemmas of the game lexicon: every one of them must carry a `wordId` in a text. */
  lexicon: ReadonlySet<string>;
  /** Filou item ids that have a translation, the only ids an ink blot may hide. */
  wordIds: ReadonlySet<string>;
  /** Names of the game, in lower case. A name opening a sentence can only be recognised here. */
  properNouns: ReadonlySet<string>;
}

export interface MeasuredCoverage extends TextCoverage {
  /** Every word of the text; `known / total` is the coverage of GDD 10.9. */
  total: number;
}

const FORMS: Readonly<Record<string, string>> = data.forms;
const NEGATIONS: Readonly<Record<string, string>> = { "won't": 'will', "can't": 'can', "shan't": 'shall', "ain't": 'be' };
const CLITIC = /(?:'s|'ll|'re|'ve|'d|'m|n't)$/;
/** A `{slot}` stands for a word chosen elsewhere; numbers are not words. */
const TOKEN = /\{[^}]*\}|\p{N}[\p{L}\p{N}]*|\p{L}+(?:['’]\p{L}+)*|[.!?:\n]/gu;
const CLOSES_SENTENCE = /^[.!?:\n]$/;
const IS_WORD = /^\p{L}/u;
const KNOWN_STATES: readonly (NodeState | undefined)[] = ['en_cours', 'maitrise'];

/** The dictionary form of a word, from the forms resolved by `scripts/build_socle.py`. */
export function lemmaOf(word: string): string {
  const lower = word.toLowerCase().replace(/’/g, "'");
  const bare = NEGATIONS[lower] ?? lower.replace(CLITIC, '');
  return FORMS[bare] ?? bare;
}

/**
 * The English vocabulary of phase 1. `properNouns` are the names of the NPCs, places and factions of the
 * game; `itemIds` the course items a text may also point to, beyond the lexicon.
 */
export function englishVocabulary(properNouns: string[] = [], itemIds: string[] = []): TextVocabulary {
  return {
    socle: new Set(data.socle),
    falseFriends: new Set(data.falseFriends),
    transparents: new Set(data.transparents),
    lexicon: new Set(lexicon.map((word) => word.target)),
    wordIds: new Set([...lexicon.map((word) => `en:b:${word.target}`), ...itemIds]),
    properNouns: new Set(properNouns.map((name) => name.toLowerCase())),
  };
}

interface Word {
  text: string;
  lemma: string;
  opensSentence: boolean;
}

/** The words of each segment, in order. A sentence can run across segments, so they are read together. */
function wordsBySegment(text: GameText): Word[][] {
  let opensSentence = true;
  return text.segments.map((segment) =>
    [...segment.text.matchAll(TOKEN)].flatMap(([token]) => {
      if (CLOSES_SENTENCE.test(token)) {
        opensSentence = true;
        return [];
      }
      if (!IS_WORD.test(token)) return [];
      const word = { text: token, lemma: lemmaOf(token), opensSentence };
      opensSentence = false;
      return [word];
    }),
  );
}

const isFalseFriend = (word: Word, vocabulary: TextVocabulary): boolean =>
  vocabulary.falseFriends.has(word.lemma) || vocabulary.falseFriends.has(word.text.toLowerCase());

const isListedName = (word: Word, vocabulary: TextVocabulary): boolean =>
  vocabulary.properNouns.has(word.text.toLowerCase()) && !isFalseFriend(word, vocabulary);

/** A listed name, or a capitalised word inside a sentence that no list knows. A false friend is never a name. */
function isProperNoun(word: Word, vocabulary: TextVocabulary): boolean {
  if (isListedName(word, vocabulary)) return true;
  const capitalised = word.text[0] !== word.text[0].toLowerCase();
  const lists = [vocabulary.socle, vocabulary.lexicon, vocabulary.transparents, vocabulary.falseFriends];
  return capitalised && !word.opensSentence && !lists.some((list) => list.has(word.lemma));
}

/** A word with a `wordId` is a word of the course, so its capital letter proves nothing. */
const showsItself = (word: Word, hasId: boolean, vocabulary: TextVocabulary): boolean =>
  vocabulary.transparents.has(word.lemma) || (hasId ? isListedName : isProperNoun)(word, vocabulary);

/**
 * Shows a text as the learner can read it (GDD 10.3). The result has one entry per segment of the text,
 * so that an index still points to the same passage. A false friend without `wordId` is a content mistake
 * that `checkTextVocabulary` reports: its whole segment is blotted rather than shown in clear.
 * `revealedWords` are the ids the dictionary has opened in this game: they stay in clear.
 */
export function maskText(
  text: GameText,
  profile: LanguageProfile,
  vocabulary: TextVocabulary,
  revealedWords: readonly string[] = [],
): VisibleSegment[] {
  const words = wordsBySegment(text);
  return text.segments.map((segment, index) => {
    const hasId = segment.wordId !== undefined;
    const own = words[index];
    if (hasId && (KNOWN_STATES.includes(profile.words[segment.wordId!]) || revealedWords.includes(segment.wordId!))) {
      return { ...segment, display: 'clair' };
    }
    if (own.some((word) => isFalseFriend(word, vocabulary))) return { ...segment, display: 'tache' };
    if (own.length > 0 && own.every((word) => showsItself(word, hasId, vocabulary))) {
      return { ...segment, display: 'transparent' };
    }
    return { ...segment, display: hasId ? 'tache' : 'clair' };
  });
}

/**
 * `known` counts the words readable without help. `newWords` counts each hidden word once, like the limit
 * per letter of GDD 10.9, and leaves out fading words: they are hidden, but the learner has already met them.
 */
export function measureCoverage(text: GameText, profile: LanguageProfile, vocabulary: TextVocabulary): MeasuredCoverage {
  const words = wordsBySegment(text);
  const fresh = new Set<string>();
  let known = 0;
  let total = 0;
  maskText(text, profile, vocabulary).forEach((segment, index) => {
    total += words[index].length;
    if (segment.display !== 'tache') {
      known += words[index].length;
    } else if (!segment.wordId || (profile.words[segment.wordId] ?? 'grise') === 'grise') {
      for (const word of words[index]) fresh.add(segment.wordId ?? word.lemma);
    }
  });
  return { known, newWords: fresh.size, total };
}

/**
 * What a text may not contain, for the content tests: a word of a plain segment that nothing recognises,
 * or a whole segment whose `wordId` has no translation behind it.
 * A lexicon word or a false friend needs its `wordId`, so it is reported in a plain segment.
 */
export function checkTextVocabulary(text: GameText, vocabulary: TextVocabulary): string[] {
  const words = wordsBySegment(text);
  return text.segments.flatMap((segment, index) => {
    if (segment.wordId !== undefined) return vocabulary.wordIds.has(segment.wordId) ? [] : [segment.text];
    return words[index]
      .filter(
        (word) =>
          !vocabulary.socle.has(word.lemma) && !vocabulary.transparents.has(word.lemma) && !isProperNoun(word, vocabulary),
      )
      .map((word) => word.text);
  });
}
