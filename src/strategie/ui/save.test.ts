import { describe, expect, it } from 'vitest';
import { gameRules } from '../content';
import { applyAction, createGame } from '../core/game';
import type { LanguageProfile } from '../types';
import { parseSave, readSave, SAVE_VERSION, serializeSave, writeSave, type SaveFile } from './save';

const profile: LanguageProfile = { language: 'en', words: {}, rules: { 'en-g-conditional': 'en_cours' } };

function aSave(): SaveFile {
  let state = createGame(42, profile, gameRules);
  state = applyAction(state, { type: 'startSeason', profile }, gameRules);
  state = applyAction(state, { type: 'nextPhase' }, gameRules);
  return {
    version: SAVE_VERSION,
    state,
    orderNotes: [{ season: 1, templateId: 't', npcId: 'bailli', said: 'a', correct: 'b', errors: [{ gravite: 'sens_change', explanationFr: 'c' }] }],
    touched: { 'en:b:wheat': { before: 'grise', good: 1, hard: 0, again: 2 } },
  };
}

describe('save file', () => {
  it('comes back identical', () => {
    const save = aSave();
    expect(parseSave(serializeSave(save))).toEqual(save);
  });

  it('plays on after being reloaded exactly as without it', () => {
    const save = aSave();
    const reloaded = parseSave(serializeSave(save)) as SaveFile;
    const step = { type: 'nextPhase' } as const;
    expect(applyAction(reloaded.state, step, gameRules)).toEqual(applyAction(save.state, step, gameRules));
  });

  it('holds nothing from the review tables', () => {
    const json = serializeSave(aSave());
    expect(json).not.toContain('halfLifeDays');
    expect(json).not.toContain('lastSeen');
  });

  it('refuses what is not a save', () => {
    expect(parseSave('not json')).toBeNull();
    expect(parseSave('{}')).toBeNull();
    expect(parseSave('null')).toBeNull();
  });

  it('refuses another version', () => {
    expect(parseSave(JSON.stringify({ ...aSave(), version: 2 }))).toBeNull();
  });

  it('refuses a broken game', () => {
    const save = aSave();
    const shortMap = { ...save.state.map, tiles: save.state.map.tiles.slice(1) };
    expect(parseSave(JSON.stringify({ ...save, state: { ...save.state, map: shortMap } }))).toBeNull();
    expect(parseSave(JSON.stringify({ ...save, state: { ...save.state, phase: 'pause' } }))).toBeNull();
  });
});

describe('without IndexedDB', () => {
  it('finds nothing to resume and says the save failed', async () => {
    expect(typeof indexedDB).toBe('undefined');
    await expect(readSave()).resolves.toBeNull();
    await expect(writeSave(aSave())).resolves.toBe(false);
  });
});
