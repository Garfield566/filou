import type { GameText, TextSegment } from '../content/schemas';
import type { VisibleSegment } from '../types';

export interface Passage {
  /** A sentence of the letter, its segments cut at the sentence's edges. */
  segments: TextSegment[];
  /** Index, in the letter, of the segment each piece comes from. */
  sources: number[];
}

const SENTENCE_PIECE = /[^.!?]*[.!?]+["')’]*\s*|[^.!?]+$/g;
const ENDS_SENTENCE = /[.!?]["')’]*\s*$/;

/**
 * The player flags sentences, not segments. A letter is cut into segments only around its clues and
 * its words, so offering the segments would show where the clue lies, and that a letter has one.
 */
export function letterPassages(text: GameText): Passage[] {
  const passages: Passage[] = [];
  let current: Passage = { segments: [], sources: [] };
  const close = () => {
    if (current.segments.length > 0) passages.push(current);
    current = { segments: [], sources: [] };
  };
  text.segments.forEach((segment, index) => {
    for (const piece of segment.text.match(SENTENCE_PIECE) ?? []) {
      if (piece.trim() === '' && current.segments.length === 0) continue;
      current.segments.push({ ...segment, text: piece });
      current.sources.push(index);
      if (ENDS_SENTENCE.test(piece)) close();
    }
  });
  close();
  return passages;
}

/** The segment a flag on this sentence lands on: its clue if it has one. Null when that is blotted. */
export function flagTarget(passage: Passage, shown: VisibleSegment[]): number | null {
  const isReadable = (index: number) => shown[index]?.display !== 'tache';
  const clue = passage.segments.findIndex((segment) => segment.clueId !== undefined);
  if (clue >= 0) return isReadable(passage.sources[clue]) ? passage.sources[clue] : null;
  return passage.sources.find(isReadable) ?? null;
}
