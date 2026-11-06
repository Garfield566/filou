import type { Clue, LetterTemplate } from '../content/schemas';
import type { GameRules, GameState, PopulationGroup, ReceivedLetter } from '../types';
import { changeLoyalty, clampLoyalty } from './economy';

function templateOf(letter: ReceivedLetter, rules: GameRules): LetterTemplate | undefined {
  return rules.letters.find((template) => template.id === letter.letterId);
}

function clueAt(template: LetterTemplate, segmentIndex: number): Clue | undefined {
  const clueId = template.text.segments[segmentIndex]?.clueId;
  return template.clues.find((clue) => clue.id === clueId);
}

function flaggedClues(letter: ReceivedLetter, template: LetterTemplate): Set<string> {
  const found = letter.flagged.map((index) => clueAt(template, index)?.id);
  return new Set(found.filter((id): id is string => id !== undefined));
}

/** A clue no segment carries cannot be flagged, so it counts neither as found nor as missed. */
function isCarried(clue: Clue, template: LetterTemplate): boolean {
  return template.text.segments.some((segment) => segment.clueId === clue.id);
}

function isBlotted(state: GameState, template: LetterTemplate, segmentIndex: number, rules: GameRules): boolean {
  return rules.hooks?.maskText?.(template.text, state)[segmentIndex]?.display === 'tache';
}

/** One flag per letter, and it is final: a wrong guess uses it up, so it costs the clue. */
export function flagPassage(draft: GameState, letterId: string, segmentIndex: number, rules: GameRules): boolean {
  const { attackSeason } = draft.rival;
  if (attackSeason !== null && draft.season > attackSeason) return false;

  // The same template can come back: the flag goes to the latest copy.
  const letter = [...draft.letters].reverse().find((received) => received.letterId === letterId);
  const template = letter && templateOf(letter, rules);
  if (!letter || !template || letter.flagged.length > 0) return false;
  if (template.text.segments[segmentIndex] === undefined || isBlotted(draft, template, segmentIndex, rules)) return false;

  letter.flagged.push(segmentIndex);

  const clue = clueAt(template, segmentIndex);
  if (clue && template.intention === 'perfide') {
    draft.languageEvents.push({ kind: 'indice_repere', itemIds: [clue.ruleId], grade: 'good' });
  }
  return true;
}

/** True once any clue of a treacherous letter has been flagged. */
export function isAlerted(state: GameState, rules: GameRules): boolean {
  return state.letters.some((letter) => {
    const template = templateOf(letter, rules);
    return template?.intention === 'perfide' && flaggedClues(letter, template).size > 0;
  });
}

/** Sent once, when the game ends: until then a clue can still be found. */
export function pushMissedClues(draft: GameState, rules: GameRules): void {
  for (const letter of draft.letters) {
    const template = templateOf(letter, rules);
    if (template?.intention !== 'perfide') continue;
    const found = flaggedClues(letter, template);
    for (const clue of template.clues) {
      if (isCarried(clue, template) && !found.has(clue.id)) draft.languageEvents.push({ kind: 'indice_manque', itemIds: [clue.ruleId], grade: 'again' });
    }
  }
}

const GROUPS: readonly string[] = ['paysans', 'marchands', 'clerge'];

/** Reply effects: `deniers`, `trust`, `fear`, or a group's name for its loyalty. */
function applyEffects(draft: GameState, effects: Record<string, number>): void {
  for (const [key, amount] of Object.entries(effects)) {
    if (key === 'deniers') draft.colony.deniers += amount;
    else if (key === 'trust') draft.rival.trust = clampLoyalty(draft.rival.trust + amount);
    else if (key === 'fear') draft.rival.fear = clampLoyalty(draft.rival.fear + amount);
    else if (GROUPS.includes(key)) changeLoyalty(draft.colony, key as PopulationGroup, amount);
  }
}

export function answerLetter(draft: GameState, letterId: string, replyId: string, rules: GameRules): boolean {
  const letter = draft.letters.find((received) => received.letterId === letterId && received.season === draft.season);
  const template = letter && templateOf(letter, rules);
  const reply = template?.replies.find((candidate) => candidate.id === replyId);
  if (!letter || !reply || letter.replyId !== null) return false;

  letter.replyId = replyId;
  applyEffects(draft, reply.effects);
  return true;
}

export function decideAudience(
  draft: GameState,
  audienceId: string,
  decisionId: string,
  understood: boolean,
  itemIds: string[],
  rules: GameRules,
): boolean {
  const audience = draft.audiences.find((received) => received.audienceId === audienceId && received.season === draft.season);
  const decision = rules.audiences
    .find((template) => template.id === audienceId)
    ?.decisions.find((candidate) => candidate.id === decisionId);
  if (!audience || !decision || audience.decisionId !== null) return false;

  audience.decisionId = decisionId;
  draft.colony.deniers += decision.deniers;
  for (const [group, amount] of Object.entries(decision.loyalty)) {
    changeLoyalty(draft.colony, group as PopulationGroup, amount);
  }
  if (understood) draft.languageEvents.push({ kind: 'plainte_comprise', itemIds, grade: 'good' });
  return true;
}
