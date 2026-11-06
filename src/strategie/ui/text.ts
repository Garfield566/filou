import { audioFile } from '../../lib/audioFile';
import { shuffle } from '../../lib/random';
import { cursor } from '../core/rng';
import type { GameText, VisibleSegment } from '../types';

export type InkPart = { ink: number } | { gap: string };

const WORD = /[\p{L}\p{N}'’-]+/gu;

export function plainText(text: Pick<GameText, 'segments'>): string {
  return text.segments.map((segment) => segment.text).join('');
}

export function wordIdsOf(text: Pick<GameText, 'segments'>): string[] {
  return [...new Set(text.segments.flatMap((segment) => segment.wordId ?? []))];
}

/** A blotted word cannot count as read: only what the learner saw may be reviewed. */
export function visibleWordIds(segments: VisibleSegment[]): string[] {
  return wordIdsOf({ segments: segments.filter((segment) => segment.display !== 'tache') });
}

/** One blot per word, each as long as its word; spaces and punctuation stay. */
export function inkParts(text: string): InkPart[] {
  const parts: InkPart[] = [];
  let end = 0;
  for (const match of text.matchAll(WORD)) {
    if (match.index > end) parts.push({ gap: text.slice(end, match.index) });
    parts.push({ ink: match[0].length });
    end = match.index + match[0].length;
  }
  if (end < text.length) parts.push({ gap: text.slice(end) });
  return parts;
}

/**
 * The content lists the right answer first. This mixes it, always the same way for the same key,
 * so that the order holds across renders and reloads.
 */
export function stableShuffle<T>(items: readonly T[], key: string): T[] {
  return shuffle(items, cursor(parseInt(audioFile(key), 16)).rng);
}
