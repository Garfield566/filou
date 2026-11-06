import { describe, expect, it } from 'vitest';
import { applyAction, createGame } from '../core/game';
import { play, profile, rules, toMail } from '../core/testRules';
import type { GameRules, TextSegment } from '../types';
import { createGameHooks, gameHooks } from './index';
import { aiRules, letter, playGame, reader, WILL_CLUE } from './testContent';

describe('hooks', () => {
  it('play the same game from the same seed', () => {
    expect(playGame(11)).toEqual(playGame(11));
  });

  it('gameHooks decides but brings no text', () => {
    const state = createGame(5, profile, aiRules);
    expect(gameHooks.decideRival?.(state, 1).decision.action).toBeDefined();
    expect(gameHooks.pickSeasonContent?.(state, 1).content).toEqual({ letterIds: [], audienceIds: [] });
  });

  it('gameHooks never betrays: it has no letter to do it with', () => {
    const state = structuredClone(createGame(5, reader, aiRules));
    state.season = 2;
    state.rival.temperament = 'opportuniste';
    state.rival.trust = 0;
    state.rival.fear = 0;
    state.colony.deniers = 0;
    state.colony.garrison = 0;
    for (let seed = 1; seed <= 50; seed++) expect(gameHooks.decideRival?.(state, seed).decision.action).not.toBe('trahir');
  });
});

describe('a blotted passage', () => {
  const WHEAT = 'en:b:wheat';
  const blotted: TextSegment[] = [{ text: 'We send ' }, { text: 'wheat', wordId: WHEAT, clueId: WILL_CLUE.id }];
  const template = { ...letter('tachee', 'perfide', [WILL_CLUE]), text: { ...letter('tachee', 'perfide').text, segments: blotted } };
  const content = { balance: rules.balance, letters: [template], audiences: [] };
  const withBlot: GameRules = {
    ...rules,
    ...content,
    hooks: {
      ...createGameHooks(content),
      pickSeasonContent: (_state, rng) => ({ content: { letterIds: ['tachee'], audienceIds: [] }, rng }),
    },
  };
  const flag = { type: 'flagPassage', letterId: 'tachee', segmentIndex: 1 } as const;
  const inMail = play(createGame(5, reader, withBlot), toMail, withBlot);

  it('cannot be flagged', () => {
    expect(applyAction(inMail, flag, withBlot)).toBe(inMail);
  });

  it('can be flagged once the dictionary has opened it', () => {
    const state = play(inMail, [{ type: 'lookUp', itemId: WHEAT }, flag], withBlot);
    expect(state.letters[0].flagged).toEqual([1]);
    expect(state.languageEvents.map((event) => event.kind)).toEqual(['mot_consulte', 'indice_repere']);
  });

  it('stays under its blot in the original, even translated', () => {
    const state = play(inMail, [{ type: 'useInterpreter', textId: template.text.id }], withBlot);
    expect(applyAction(state, flag, withBlot)).toBe(state);
  });
});
