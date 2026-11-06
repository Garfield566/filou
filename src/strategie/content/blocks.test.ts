import { describe, expect, it } from 'vitest';
import { lemmaOf } from '../language/mask';
import socle from './en-socle.json';
import { orders } from './index';

const falseFriends = new Set(socle.falseFriends);

/** Assembly blocks are plain text and always readable, so they must never show a false friend. */
function falseFriendsIn(text: string): string[] {
  const words = text.toLowerCase().match(/[a-z']+/g) ?? [];
  return words.filter((word) => falseFriends.has(word) || falseFriends.has(lemmaOf(word)));
}

describe('order blocks', () => {
  it('show no false friend in clear', () => {
    const found = orders.flatMap((order) =>
      [...order.blocks, ...order.distractorBlocks].flatMap((block) =>
        falseFriendsIn(block).map((word) => `${order.id}: ${word}`),
      ),
    );
    expect(found).toEqual([]);
  });
});
