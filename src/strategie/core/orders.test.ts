import { describe, expect, it } from 'vitest';
import type { GameAction, GameRules, GameState, OrderError, StructuredOrder, Tile, Trait } from '../types';
import { createGame } from './game';
import { order, play, profile, rules, toCouncil } from './testRules';

const toEnd: GameAction[] = [{ type: 'nextPhase' }, { type: 'endSeason' }];

function rulesWithBailiff(traits: [Trait, Trait]): GameRules {
  return { ...rules, npcs: rules.npcs.map((npc) => (npc.id === 'bailli' ? { ...npc, traits } : npc)) };
}

function error(gravite: OrderError['gravite']): OrderError {
  return { type: 'test', segment: 'x', gravite };
}

function give(fields: Partial<StructuredOrder> = {}, gameRules: GameRules = rules, words = ['en:farm'], grammar = ['en-g-be']) {
  const start = createGame(21, profile, gameRules);
  return play(start, [...toCouncil, { type: 'order', order: order(fields), itemIds: words, ruleIds: grammar }], gameRules);
}

function buildingsOf(state: GameState, id = 'ferme'): Tile[] {
  return state.map.tiles.filter((tile) => tile.building === id);
}

describe('giving an order', () => {
  it('only works during the council', () => {
    const start = createGame(21, profile, rules);
    const action: GameAction = { type: 'order', order: order(), itemIds: [], ruleIds: [] };
    expect(play(start, [action])).toBe(start);
  });

  it('refuses an unknown NPC', () => {
    expect(give({ destinataire: 'personne' }).orders).toHaveLength(0);
  });

  it('waits for the resolution', () => {
    const state = give();
    expect(state.orders[0].executed).toBe(false);
    expect(buildingsOf(state)).toHaveLength(0);
    expect(state.colony.deniers).toBe(20);
  });
});

describe('language events (GDD 10.2)', () => {
  it('a clean order passes every word and rule', () => {
    expect(give().languageEvents).toEqual([{ kind: 'ordre_compris', itemIds: ['en:farm', 'en-g-be'], grade: 'good' }]);
  });

  it('a harmless fault keeps the words and marks the rule hard', () => {
    expect(give({ erreurs: [error('sans_gene')] }).languageEvents).toEqual([
      { kind: 'faute_legere', itemIds: ['en:farm'], grade: 'good' },
      { kind: 'faute_legere', itemIds: ['en-g-be'], grade: 'hard' },
    ]);
  });

  it('a wrong register counts as a fault that leaves the sense intact', () => {
    expect(give({ erreurs: [error('mauvais_registre')] }).languageEvents.map((event) => event.kind)).toEqual([
      'faute_legere',
      'faute_legere',
    ]);
  });

  it('an imprecise or wrong order fails the notion', () => {
    for (const gravite of ['imprecision', 'sens_change'] as const) {
      expect(give({ erreurs: [error(gravite)] }).languageEvents).toEqual([
        { kind: 'ordre_rate', itemIds: ['en-g-be'], grade: 'again' },
      ]);
    }
  });
});

describe('errors naming their notions', () => {
  const targeted = (gravite: OrderError['gravite'], notionIds: string[]): OrderError => ({ ...error(gravite), notionIds });
  const words = ['en:farm', 'en:wheat'];
  const grammar = ['en-g-be', 'en-g-compare'];
  const eventsOf = (erreurs: OrderError[]) => give({ erreurs }, rules, words, grammar).languageEvents;

  it('a failure lands on them, the rest of the order is good', () => {
    expect(eventsOf([targeted('sens_change', ['en:farm'])])).toEqual([
      { kind: 'ordre_rate', itemIds: ['en:farm'], grade: 'again' },
      { kind: 'ordre_rate', itemIds: ['en:wheat', 'en-g-be', 'en-g-compare'], grade: 'good' },
    ]);
  });

  it('a harmless fault lands on them, the rest of the order is good', () => {
    expect(eventsOf([targeted('sans_gene', ['en-g-compare'])])).toEqual([
      { kind: 'faute_legere', itemIds: ['en:farm', 'en:wheat', 'en-g-be'], grade: 'good' },
      { kind: 'faute_legere', itemIds: ['en-g-compare'], grade: 'hard' },
    ]);
  });

  it('a notion both failed and faulted counts once, as failed', () => {
    expect(eventsOf([targeted('imprecision', ['en-g-be']), targeted('sans_gene', ['en-g-be', 'en:farm'])])).toEqual([
      { kind: 'ordre_rate', itemIds: ['en-g-be'], grade: 'again' },
      { kind: 'ordre_rate', itemIds: ['en:wheat', 'en-g-compare'], grade: 'good' },
      { kind: 'ordre_rate', itemIds: ['en:farm'], grade: 'hard' },
    ]);
  });

  it('without them, the whole order keeps answering for the error', () => {
    expect(eventsOf([error('sens_change')])).toEqual([{ kind: 'ordre_rate', itemIds: grammar, grade: 'again' }]);
    expect(eventsOf([error('sans_gene')])).toEqual([
      { kind: 'faute_legere', itemIds: words, grade: 'good' },
      { kind: 'faute_legere', itemIds: grammar, grade: 'hard' },
    ]);
  });
});

describe('consequences (GDD 10.4)', () => {
  it('a clean order builds on the nearest fitting tile and charges the price', () => {
    const state = play(give(), toEnd);
    const [tile] = buildingsOf(state);
    expect(tile.resource).toBe('ble');
    expect(tile.explored).toBe(true);
    expect(state.colony.deniers).toBe(20 + 4 - 5);
    expect(state.orders[0].executed).toBe(true);
  });

  it('builds on the tile named in the order', () => {
    const start = createGame(21, profile, rules);
    const fields = start.map.tiles.filter((tile) => tile.resource === 'ble' && tile.explored);
    const target = fields[fields.length - 1];
    const state = play(give({ lieu: `${target.x},${target.y}` }), toEnd);
    expect(buildingsOf(state)[0]).toMatchObject({ x: target.x, y: target.y });
  });

  it('sans_gene executes the order', () => {
    expect(buildingsOf(play(give({ erreurs: [error('sans_gene')] }), toEnd))).toHaveLength(1);
  });

  it('mauvais_registre executes the order and lowers the NPC loyalty', () => {
    const state = play(give({ erreurs: [error('mauvais_registre')] }), toEnd);
    expect(buildingsOf(state)).toHaveLength(1);
    expect(state.npcs.find((npc) => npc.id === 'bailli')?.loyalty).toBe(45);
  });

  it('sens_change spends the money on a farm that yields nothing', () => {
    const state = play(give({ erreurs: [error('sens_change')] }), toEnd);
    const [tile] = buildingsOf(state);
    expect(tile.resource).not.toBe('ble');
    expect(state.colony.deniers).toBe(19);
    expect(state.reports.some((report) => report.textId === 'rapport.chantier.mal_execute')).toBe(true);
  });

  it('sens_change takes the money for a mill and leaves nothing', () => {
    const start = structuredClone(createGame(21, profile, rules));
    start.colony.level = 'village';
    const state = play(
      start,
      [...toCouncil, { type: 'order', order: order({ objet: 'moulin', erreurs: [error('sens_change')] }), itemIds: [], ruleIds: [] }, ...toEnd],
    );
    expect(buildingsOf(state, 'moulin')).toHaveLength(0);
    expect(state.colony.deniers).toBe(20 + 7 - 8);
  });

  describe('imprecision by trait', () => {
    it('the loyal NPC asks and builds one season late', () => {
      const once = play(give({ erreurs: [error('imprecision')] }, rulesWithBailiff(['loyal', 'prudent'])), toEnd, rulesWithBailiff(['loyal', 'prudent']));
      expect(buildingsOf(once)).toHaveLength(0);
      expect(once.orders[0]).toMatchObject({ season: 2, delayed: true, executed: false });
      expect(once.reports.some((report) => report.textId === 'rapport.ordre.precision')).toBe(true);

      const twice = play(once, [...toCouncil, ...toEnd], rulesWithBailiff(['loyal', 'prudent']));
      expect(buildingsOf(twice)).toHaveLength(1);
      expect(twice.orders[0].executed).toBe(true);
    });

    it('the greedy NPC builds and pockets a surcharge', () => {
      const greedy = rulesWithBailiff(['cupide', 'ruse']);
      const state = play(give({ erreurs: [error('imprecision')] }, greedy), toEnd, greedy);
      expect(buildingsOf(state)[0].resource).toBe('ble');
      expect(state.colony.deniers).toBe(20 + 4 - 5 - 2);
    });

    it('the clumsy NPC gets it wrong', () => {
      const clumsy = rulesWithBailiff(['maladroit', 'pieux']);
      const state = play(give({ erreurs: [error('imprecision')] }, clumsy), toEnd, clumsy);
      expect(buildingsOf(state)[0].resource).not.toBe('ble');
    });

    it('the first listed trait decides', () => {
      const both = rulesWithBailiff(['cupide', 'loyal']);
      const state = play(give({ erreurs: [error('imprecision')] }, both), toEnd, both);
      expect(buildingsOf(state)).toHaveLength(1);
    });

    it('an NPC with none of the three traits asks', () => {
      const other = rulesWithBailiff(['pieux', 'prudent']);
      const state = play(give({ erreurs: [error('imprecision')] }, other), toEnd, other);
      expect(state.orders[0].delayed).toBe(true);
    });
  });
});

describe('what stops a building', () => {
  function reasons(state: GameState) {
    return state.reports.filter((report) => report.textId === 'rapport.chantier.impossible').map((report) => report.values.raison);
  }

  it('money', () => {
    const start = structuredClone(createGame(21, profile, rules));
    start.colony.deniers = -3;
    const state = play(start, [...toCouncil, { type: 'order', order: order(), itemIds: [], ruleIds: [] }, ...toEnd]);
    expect(reasons(state)).toEqual(['fonds']);
    expect(state.orders[0].executed).toBe(false);
  });

  it('a mill before the Village', () => {
    expect(reasons(play(give({ objet: 'moulin' }), toEnd))).toEqual(['verrouille']);
  });

  it('a market, which only comes as a reward', () => {
    expect(reasons(play(give({ objet: 'marche' }), toEnd))).toEqual(['verrouille']);
  });

  it('a building nobody knows', () => {
    expect(reasons(play(give({ objet: 'cathedrale' }), toEnd))).toEqual(['inconnu']);
  });

  it('a tile that does not fit', () => {
    const start = createGame(21, profile, rules);
    const sea = start.map.tiles.find((tile) => tile.terrain === 'mer') as Tile;
    expect(reasons(play(give({ lieu: `${sea.x},${sea.y}` }), toEnd))).toEqual(['emplacement']);
  });

  it('a second mill', () => {
    const start = structuredClone(createGame(21, profile, rules));
    start.colony.level = 'village';
    start.colony.deniers = 50;
    const mill: GameAction = { type: 'order', order: order({ objet: 'moulin' }), itemIds: [], ruleIds: [] };
    const state = play(start, [...toCouncil, mill, mill, ...toEnd]);
    expect(reasons(state)).toEqual(['deja_construit']);
    expect(buildingsOf(state, 'moulin')).toHaveLength(1);
    expect(buildingsOf(state, 'moulin')[0].resource).toBeNull();
  });
});

describe('verbs without a rule yet', () => {
  it('are recorded as done and change nothing else', () => {
    const start = createGame(21, profile, rules);
    const talk: GameAction = { type: 'order', order: order({ verbe: 'taxer', objet: null }), itemIds: [], ruleIds: [] };
    const state = play(start, [...toCouncil, talk, ...toEnd]);
    expect(state.orders[0].executed).toBe(true);
    expect(state.colony.deniers).toBe(24);
  });
});
