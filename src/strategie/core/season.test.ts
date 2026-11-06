import { describe, expect, it } from 'vitest';
import type { LetterTemplate } from '../content/schemas';
import type { GameAction, GameRules, GameState, RivalDecision } from '../types';
import { applyAction, createGame } from './game';
import { order, play, profile, rules, toCouncil, toMail, wholeSeason } from './testRules';

const treason: RivalDecision = { action: 'trahir', intention: 'perfide', scores: {} };

/** The rival betrays from season 2, with one letter and one audience each season. */
const scripted: GameRules = {
  ...rules,
  hooks: {
    decideRival: (state, rng) => ({
      decision: state.season >= 2 ? treason : { action: 'attendre', intention: 'honnete', scores: {} },
      rng,
    }),
    pickSeasonContent: (state, rng) => ({
      content: {
        letterIds: [state.rival.intention === 'perfide' ? 'lettre.perfide' : 'lettre.honnete'],
        audienceIds: ['audience.disette'],
      },
      rng,
    }),
  },
};

const start = createGame(5, profile, rules);
const build = (objet: string): GameAction => ({ type: 'order', order: order({ objet }), itemIds: [], ruleIds: [] });

/** Two farms and a fishery in season 1 reach the Village at the end of season 3. */
const toVillage: GameAction[] = [
  ...toCouncil,
  build('ferme'),
  build('ferme'),
  build('pecherie'),
  { type: 'nextPhase' },
  { type: 'endSeason' },
  ...wholeSeason,
  ...wholeSeason,
];

function flagging(segmentIndex: number): GameAction {
  return { type: 'flagPassage', letterId: 'lettre.perfide', segmentIndex };
}

describe('createGame', () => {
  it('starts with the provisional values', () => {
    expect(start).toMatchObject({ season: 1, phase: 'rapports', outcome: null, dictionaryLeft: 3 });
    expect(start.colony).toMatchObject({ level: 'hameau', deniers: 20, garrison: 4, defense: 0 });
    expect(Object.values(start.colony.groups).every((group) => group.loyalty === 50)).toBe(true);
  });

  it('brings the bailiff and the interpreter, not the wool merchant', () => {
    expect(start.npcs.map((npc) => npc.id)).toEqual(['bailli', 'interprete']);
    expect(start.npcs.every((npc) => npc.loyalty === 50 && npc.patience === 5)).toBe(true);
  });

  it('prepares a rival that has not decided anything', () => {
    expect(start.rival).toMatchObject({ intention: 'honnete', attackSeason: null, strength: 10, name: start.map.rival.name });
  });
});

describe('phases', () => {
  it('needs startSeason before leaving the reports', () => {
    expect(applyAction(start, { type: 'nextPhase' }, rules)).toBe(start);
  });

  it('takes startSeason only once a season', () => {
    const started = play(start, [{ type: 'startSeason', profile }]);
    expect(applyAction(started, { type: 'startSeason', profile }, rules)).toBe(started);
  });

  it('goes rapports, audience, conseil, courrier, and stops there', () => {
    const seen: string[] = [];
    let state = play(start, [{ type: 'startSeason', profile }]);
    for (let step = 0; step < 3; step++) {
      seen.push(state.phase);
      state = applyAction(state, { type: 'nextPhase' }, rules);
    }
    seen.push(state.phase);
    expect(seen).toEqual(['rapports', 'audience', 'conseil', 'courrier']);
    expect(applyAction(state, { type: 'nextPhase' }, rules)).toBe(state);
  });

  it('refuses endSeason before the mail', () => {
    const council = play(start, toCouncil);
    expect(applyAction(council, { type: 'endSeason' }, rules)).toBe(council);
  });

  it('opens the next season on its reports', () => {
    const state = play(start, wholeSeason);
    expect(state).toMatchObject({ season: 2, phase: 'rapports', seasonStarted: false });
    expect(state.reports.some((report) => report.textId === 'rapport.recolte' && report.values.deniers === 4)).toBe(true);
  });

  it('takes the new profile and refills the dictionary', () => {
    const fresh = { ...profile, rules: { 'en-g-will': 'maitrise' as const } };
    const used = play(start, [{ type: 'startSeason', profile }, { type: 'lookUp', itemId: 'en:wheat' }]);
    const state = play(used, [{ type: 'nextPhase' }, { type: 'nextPhase' }, { type: 'nextPhase' }, { type: 'endSeason' }, { type: 'startSeason', profile: fresh }]);
    expect(used.dictionaryLeft).toBe(2);
    expect(state.dictionaryLeft).toBe(3);
    expect(state.profile).toEqual(fresh);
  });
});

describe('stranger strategies', () => {
  const lookUp = (itemId: string): GameAction => ({ type: 'lookUp', itemId });
  const started = play(start, [{ type: 'startSeason', profile }]);

  it('the dictionary fails the word, and runs out', () => {
    const state = play(started, [lookUp('en:wheat'), lookUp('en:rye'), lookUp('en:oats')]);
    expect(state.dictionaryLeft).toBe(0);
    expect(state.languageEvents[0]).toEqual({ kind: 'mot_consulte', itemIds: ['en:wheat'], grade: 'again' });
    expect(applyAction(state, lookUp('en:barley'), rules)).toBe(state);
  });

  it('the dictionary waits for the season to start', () => {
    expect(applyAction(start, lookUp('en:wheat'), rules)).toBe(start);
  });

  it('a word looked up stays revealed and is not charged again, even in a later season', () => {
    const once = play(started, [lookUp('en:wheat')]);
    expect(once.revealedWords).toEqual(['en:wheat']);
    expect(applyAction(once, lookUp('en:wheat'), rules)).toBe(once);

    const later = play(once, [{ type: 'nextPhase' }, { type: 'nextPhase' }, { type: 'nextPhase' }, { type: 'endSeason' }, { type: 'startSeason', profile }]);
    expect(later.revealedWords).toEqual(['en:wheat']);
    expect(applyAction(later, lookUp('en:wheat'), rules)).toBe(later);
  });

  it('the interpreter costs deniers', () => {
    expect(applyAction(start, { type: 'useInterpreter', textId: 'x' }, rules).colony.deniers).toBe(18);
  });

  it('a translated text stays translated, without a new fee', () => {
    const once = applyAction(start, { type: 'useInterpreter', textId: 'x' }, rules);
    expect(once.translatedTexts).toEqual(['x']);
    expect(applyAction(once, { type: 'useInterpreter', textId: 'x' }, rules)).toBe(once);
    expect(applyAction(once, { type: 'useInterpreter', textId: 'y' }, rules).colony.deniers).toBe(16);
  });

  it('the interpreter refuses to work on credit', () => {
    const poor = structuredClone(start);
    poor.colony.deniers = 1;
    expect(applyAction(poor, { type: 'useInterpreter', textId: 'x' }, rules)).toBe(poor);
  });
});

describe('the step to the Village', () => {
  const village = play(start, toVillage);

  it('comes at the end of the season the stocks are met', () => {
    expect(village.colony.level).toBe('village');
    expect(village.colony.stocks).toMatchObject({ ble: 8, poisson: 4 });
    expect(village.reports.some((report) => report.textId === 'rapport.village')).toBe(true);
  });

  it('offers no reward at the last season: nothing would be left to pick it in', () => {
    const shortRules: GameRules = { ...rules, balance: { ...rules.balance, seasons: 3 } };
    const state = play(createGame(5, profile, shortRules), toVillage, shortRules);
    expect(state.colony.level).toBe('village');
    expect(state.colony.pendingReward).toBe(false);
    expect(state.outcome).toEqual({ result: 'fin_de_tranche', cause: null });
  });

  it('does not come early', () => {
    expect(play(start, toVillage.slice(0, -wholeSeason.length)).colony.level).toBe('hameau');
  });

  it('brings the wool merchant and a reward to pick', () => {
    expect(village.npcs.map((npc) => npc.id)).toContain('marchand');
    expect(village.colony.pendingReward).toBe(true);
  });

  it('holds the season until the reward is picked', () => {
    const mail = play(village, toMail);
    expect(applyAction(mail, { type: 'endSeason' }, rules)).toBe(mail);
    expect(play(mail, [{ type: 'chooseReward', reward: 'marche' }, { type: 'endSeason' }]).outcome).not.toBeNull();
  });

  it('the market adds deniers, once', () => {
    const after = play(village, [{ type: 'chooseReward', reward: 'marche' }]);
    expect(after.colony).toMatchObject({ reward: 'marche', pendingReward: false, defense: 0 });
    expect(play(after, [{ type: 'chooseReward', reward: 'palissade' }])).toBe(after);
    expect(after.map.tiles.find((tile) => tile.building === 'marche')).toMatchObject({ x: after.map.colony.x, y: after.map.colony.y });
  });

  it('the palisade adds defense', () => {
    expect(play(village, [{ type: 'chooseReward', reward: 'palissade' }]).colony.defense).toBe(4);
  });

  it('cannot be picked without a new level', () => {
    expect(play(start, [{ type: 'chooseReward', reward: 'marche' }])).toBe(start);
  });

  it('opens the mill', () => {
    const state = play(village, [{ type: 'chooseReward', reward: 'marche' }, ...toCouncil, build('moulin'), { type: 'nextPhase' }, { type: 'endSeason' }]);
    expect(state.map.tiles.some((tile) => tile.building === 'moulin')).toBe(true);
  });
});

describe('letters and audiences', () => {
  it('nothing arrives without hooks', () => {
    const state = play(start, [{ type: 'startSeason', profile }]);
    expect(state.letters).toEqual([]);
    expect(state.audiences).toEqual([]);
  });

  it('a hook feeds the season and gives the generator back', () => {
    const moved: GameRules = {
      ...rules,
      hooks: { pickSeasonContent: () => ({ content: { letterIds: ['lettre.honnete', 'inconnue'], audienceIds: [] }, rng: 777 }) },
    };
    const state = applyAction(start, { type: 'startSeason', profile }, moved);
    expect(state.letters).toEqual([{ letterId: 'lettre.honnete', season: 1, replyId: null, flagged: [] }]);
    expect(state.rng).toBe(777);
  });

  it('a decision moves deniers and loyalty, once', () => {
    const decide: GameAction = { type: 'decide', audienceId: 'audience.disette', decisionId: 'aider', understood: true, itemIds: ['en:hunger'] };
    const state = play(createGame(5, profile, scripted), [{ type: 'startSeason', profile }, { type: 'nextPhase' }, decide], scripted);
    expect(state.colony.deniers).toBe(-10);
    expect(state.colony.groups.paysans.loyalty).toBe(60);
    expect(state.colony.groups.marchands.loyalty).toBe(45);
    expect(state.languageEvents).toEqual([{ kind: 'plainte_comprise', itemIds: ['en:hunger'], grade: 'good' }]);
    expect(applyAction(state, decide, scripted)).toBe(state);
  });

  it('a complaint not understood gives no event', () => {
    const state = play(
      createGame(5, profile, scripted),
      [{ type: 'startSeason', profile }, { type: 'nextPhase' }, { type: 'decide', audienceId: 'audience.disette', decisionId: 'aider', understood: false, itemIds: ['en:hunger'] }],
      scripted,
    );
    expect(state.languageEvents).toEqual([]);
  });

  it('a reply applies its effects, once', () => {
    const reply: GameAction = { type: 'answerLetter', letterId: 'lettre.honnete', replyId: 'poli' };
    const state = play(createGame(5, profile, scripted), [...toMail, reply], scripted);
    expect(state.letters[0].replyId).toBe('poli');
    expect(state.rival.trust).toBe(55);
    expect(state.colony.deniers).toBe(19);
    expect(state.colony.groups.paysans.loyalty).toBe(52);
    expect(applyAction(state, reply, scripted)).toBe(state);
  });
});

describe('treason', () => {
  const inSeasonTwoMail = play(createGame(5, profile, scripted), [...wholeSeason, ...toMail], scripted);

  it('is set by the decision, for the balance season and strength', () => {
    expect(inSeasonTwoMail.rival).toMatchObject({ intention: 'perfide', attackSeason: 4, strength: 10 });
  });

  it('is ignored outside the letter seasons', () => {
    const early: GameRules = { ...rules, hooks: { decideRival: (_state, rng) => ({ decision: treason, rng }) } };
    const state = applyAction(createGame(5, profile, early), { type: 'startSeason', profile }, early);
    expect(state.rival).toMatchObject({ intention: 'honnete', attackSeason: null });
  });

  it('a correct flag passes the rule, once', () => {
    const state = play(inSeasonTwoMail, [flagging(1)], scripted);
    expect(state.languageEvents).toEqual([{ kind: 'indice_repere', itemIds: ['en-g-will'], grade: 'good' }]);
    expect(play(state, [flagging(1)], scripted)).toBe(state);
  });

  it('a wrong flag is kept and teaches nothing', () => {
    const state = play(inSeasonTwoMail, [flagging(0)], scripted);
    expect(state.letters.at(-1)?.flagged).toEqual([0]);
    expect(state.languageEvents).toEqual([]);
  });

  it('a letter takes one flag, and it is final', () => {
    const wrong = play(inSeasonTwoMail, [flagging(0)], scripted);
    expect(play(wrong, [flagging(1)], scripted)).toBe(wrong);
    expect(wrong.languageEvents).toEqual([]);
  });

  it('a flag outside the letter is refused', () => {
    expect(play(inSeasonTwoMail, [flagging(9)], scripted)).toBe(inSeasonTwoMail);
  });

  function toSiege(actions: GameAction[], gameRules = scripted): GameState {
    return play(createGame(5, profile, gameRules), [...wholeSeason, ...toMail, ...actions, { type: 'endSeason' }, ...wholeSeason, ...wholeSeason], gameRules);
  }

  it('unflagged, the city falls and the clue is missed', () => {
    const state = toSiege([]);
    expect(state.outcome).toEqual({ result: 'defaite', cause: 'ville_prise' });
    expect(state.phase).toBe('bilan');
    expect(state.languageEvents.filter((event) => event.kind === 'indice_manque')).toEqual([
      { kind: 'indice_manque', itemIds: ['en-g-will'], grade: 'again' },
      { kind: 'indice_manque', itemIds: ['en-g-will'], grade: 'again' },
      { kind: 'indice_manque', itemIds: ['en-g-will'], grade: 'again' },
    ]);
  });

  it('flagged in time, the alert holds the city to the end of the slice', () => {
    const state = toSiege([flagging(1)]);
    expect(state.outcome).toEqual({ result: 'fin_de_tranche', cause: null });
    expect(state.reports.find((report) => report.textId === 'rapport.siege.tenu')?.values).toEqual({ attaque: 10, defense: 12 });
  });

  it('a wrong flag gives no defense', () => {
    expect(toSiege([flagging(0)]).outcome?.cause).toBe('ville_prise');
  });

  it('a wrong flag misses the clue, exactly like no flag', () => {
    const missed = (state: GameState) => state.languageEvents.filter((event) => event.kind === 'indice_manque');
    expect(missed(toSiege([flagging(0)]))).toEqual(missed(toSiege([])));
    expect(toSiege([flagging(0)]).languageEvents.some((event) => event.kind === 'indice_repere')).toBe(false);
  });

  it('a clue no segment carries is neither missed nor found', () => {
    const [perfidious] = rules.letters;
    const ghost = { id: 'indice.fantome', level: 'A2' as const, ruleId: 'en-g-fantome', explanationFr: '-' };
    const withGhost = { ...perfidious, clues: [...perfidious.clues, ghost] };
    const ghostly: GameRules = { ...scripted, letters: [withGhost, ...rules.letters.slice(1)] };
    const reviewed = toSiege([], ghostly).languageEvents.flatMap((event) => event.itemIds);
    expect(reviewed).toContain('en-g-will');
    expect(reviewed).not.toContain('en-g-fantome');
  });

  it('a segment pointing at an unlisted clue finds nothing', () => {
    const [perfidious] = rules.letters;
    const segments = [{ ...perfidious.text.segments[0], clueId: 'indice.inconnu' }, ...perfidious.text.segments.slice(1)];
    const stray: LetterTemplate = { ...perfidious, text: { ...perfidious.text, segments } };
    const strayRules: GameRules = { ...scripted, letters: [stray, ...rules.letters.slice(1)] };
    expect(toSiege([flagging(0)], strayRules).outcome?.cause).toBe('ville_prise');
  });

  it('a tie goes to the defender', () => {
    const state = structuredClone(play(createGame(5, profile, scripted), [...wholeSeason, ...wholeSeason, ...wholeSeason, ...toMail], scripted));
    state.colony.garrison = 10;
    expect(applyAction(state, { type: 'endSeason' }, scripted).outcome?.result).toBe('fin_de_tranche');
    state.colony.garrison = 9;
    expect(applyAction(state, { type: 'endSeason' }, scripted).outcome?.cause).toBe('ville_prise');
  });

  it('defense counts in the comparison', () => {
    const state = structuredClone(play(createGame(5, profile, scripted), [...wholeSeason, ...wholeSeason, ...wholeSeason, ...toMail], scripted));
    state.colony.defense = 6;
    expect(applyAction(state, { type: 'endSeason' }, scripted).outcome?.result).toBe('fin_de_tranche');
  });
});

describe('defeats', () => {
  const decide = (decisionId: string): GameAction => ({ type: 'decide', audienceId: 'audience.disette', decisionId, understood: true, itemIds: [] });
  const audience: GameAction[] = [{ type: 'startSeason', profile }, { type: 'nextPhase' }];
  const rest: GameAction[] = [{ type: 'nextPhase' }, { type: 'nextPhase' }, { type: 'endSeason' }];
  const noTreason: GameRules = { ...scripted, hooks: { pickSeasonContent: scripted.hooks?.pickSeasonContent } };

  it('revolt: the global loyalty at zero ends the game', () => {
    const state = play(createGame(5, profile, noTreason), [...audience, decide('ruine'), ...rest], noTreason);
    expect(state.outcome).toEqual({ result: 'defaite', cause: 'revolte' });
    expect(state.phase).toBe('bilan');
  });

  it('bankruptcy: one negative season is a warning, two end the game', () => {
    const once = play(createGame(5, profile, noTreason), [...audience, decide('aider'), ...rest], noTreason);
    expect(once.colony.deniers).toBe(-6);
    expect(once.colony.debtSeasons).toBe(1);
    expect(once.outcome).toBeNull();

    const twice = play(once, [...audience, decide('aider'), ...rest], noTreason);
    expect(twice.outcome).toEqual({ result: 'defaite', cause: 'faillite' });
  });

  it('bankruptcy needs two seasons in a row', () => {
    const once = play(createGame(5, profile, noTreason), [...audience, decide('aider'), ...rest], noTreason);
    const paid = play(once, [...audience, ...rest], noTreason);
    expect(paid.colony.deniers).toBe(-2);
    const clear = structuredClone(once);
    clear.colony.deniers = 0;
    expect(play(clear, [...audience, ...rest], noTreason).colony.debtSeasons).toBe(0);
  });
});

describe('acknowledging language events', () => {
  const wordEvent = (state: GameState, itemId: string) => applyAction(state, { type: 'lookUp', itemId }, rules);
  const two = wordEvent(wordEvent(play(start, [{ type: 'startSeason', profile }]), 'en:wheat'), 'en:rye');

  it('removes the first ones only', () => {
    const after = applyAction(two, { type: 'ackLanguageEvents', count: 1 }, rules);
    expect(after.languageEvents.map((event) => event.itemIds)).toEqual([['en:rye']]);
  });

  it('is still allowed after the outcome', () => {
    const over = structuredClone(two);
    over.outcome = { result: 'fin_de_tranche', cause: null };
    expect(applyAction(over, { type: 'ackLanguageEvents', count: 2 }, rules).languageEvents).toEqual([]);
  });

  it('refuses a count that means nothing', () => {
    for (const count of [0, -1, 1.5]) expect(applyAction(two, { type: 'ackLanguageEvents', count }, rules)).toBe(two);
  });
});

describe('end of the slice', () => {
  const finished = play(start, [...wholeSeason, ...wholeSeason, ...wholeSeason, ...wholeSeason]);

  it('ends after the balance seasons, on the bilan', () => {
    expect(finished).toMatchObject({ season: 4, phase: 'bilan', outcome: { result: 'fin_de_tranche', cause: null } });
  });

  it('accepts nothing more', () => {
    expect(applyAction(finished, { type: 'lookUp', itemId: 'en:wheat' }, rules)).toBe(finished);
  });
});
