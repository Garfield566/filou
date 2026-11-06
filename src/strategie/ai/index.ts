import balance from '../content/balance.json';
import { balanceSchema } from '../content/schemas';
import { englishVocabulary, maskText, type TextVocabulary } from '../language/mask';
import type { GameHooks } from '../types';
import { type ContentRules, pickSeasonContent } from './content';
import { decideRival } from './rival';

export { AUDIENCE_CONDITIONS, clueIsReadable } from './content';

/**
 * The hooks receive no rules from the core, yet they read the balance, the
 * letters and the audiences: they have to be bound to them here. `vocabulary`
 * should be built with the names of the game, so that the mask knows them.
 */
export function createGameHooks(rules: ContentRules, vocabulary: TextVocabulary = englishVocabulary()): GameHooks {
  return {
    decideRival: (state, rng) => decideRival(state, rng, rules),
    pickSeasonContent: (state, rng) => pickSeasonContent(state, rng, rules),
    maskText: (text, state) => maskText(text, state.profile, vocabulary, state.revealedWords),
  };
}

/**
 * Bound to the real balance but to no text: `content/` has no letters or
 * audiences yet. Until then this rival never betrays and nothing reaches the colony.
 * An assembly with texts must call `createGameHooks`.
 */
export const gameHooks: GameHooks = createGameHooks({ balance: balanceSchema.parse(balance), letters: [], audiences: [] });
