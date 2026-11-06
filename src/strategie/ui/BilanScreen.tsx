import { useMemo } from 'react';
import { lessonsOf } from '../../data/courses';
import { gameRules, letters } from '../content';
import { buildProfile } from '../language/bridge';
import type { GameState } from '../types';
import { useGame } from './GameContext';
import { MaskedText } from './MaskedText';
import { notionState } from './notions';
import { OrderCorrections, SeasonReports } from './ReportsScreen';
import { StateBadge } from './TablesScreen';

function causeOf(state: GameState): string {
  const { map } = state;
  switch (state.outcome?.cause) {
    case 'ville_prise':
      return `${state.rival.name} a pris ${map.colony.name} : tes défenses n'ont pas suffi.`;
    case 'revolte':
      return `La population de ${map.colony.name} s'est révoltée : sa loyauté est tombée à zéro.`;
    case 'faillite':
      return `${map.colony.name} a fait faillite : le trésor est resté négatif ${gameRules.balance.bankruptcySeasons} saisons de suite.`;
    default:
      return `Tu as tenu les ${gameRules.balance.seasons} saisons de ton mandat à ${map.colony.name}.`;
  }
}

function MissedClues() {
  const { state } = useGame();
  const missed = state.letters.flatMap((letter) => {
    const template = letters.find((candidate) => candidate.id === letter.letterId);
    if (template?.intention !== 'perfide') return [];
    const flaggedClues = letter.flagged.map((index) => template.text.segments[index]?.clueId);
    return template.clues
      .filter((clue) => !flaggedClues.includes(clue.id))
      .flatMap((clue) => {
        const segment = template.text.segments.findIndex((candidate) => candidate.clueId === clue.id);
        return segment >= 0 ? [{ letter, template, clue, segment }] : [];
      });
  });

  if (missed.length === 0) return <p>Aucun indice de trahison ne t'a échappé.</p>;
  return (
    <>
      {missed.map(({ letter, template, clue, segment }) => (
        <article className="st-card" key={clue.id}>
          <p className="st-label">Lettre de la saison {letter.season}</p>
          <MaskedText text={template.text} interactive={false} highlight={[segment]} />
          <p>{clue.explanationFr}</p>
        </article>
      ))}
    </>
  );
}

function TouchedNotions() {
  const { touched, course, progress, wordInfo } = useGame();
  const now = useMemo(() => buildProfile(course, progress.memory, Date.now()), [course, progress.memory]);
  const lessons = lessonsOf(course);
  const ids = Object.keys(touched);

  if (ids.length === 0) return <p>Aucune notion n'a bougé pendant cette partie.</p>;
  return (
    <ul className="st-words">
      {ids.map((id) => {
        const lesson = lessons.find((candidate) => candidate.id === id);
        const word = wordInfo(id);
        const before = touched[id].before;
        const after = notionState(now, id);
        return (
          <li key={id}>
            {lesson ? <span>{lesson.title}</span> : <span lang="en">{word?.target ?? id}</span>}
            <span className="st-move">
              {before !== after && (
                <>
                  <StateBadge state={before} />
                  <span aria-label="devient"> → </span>
                </>
              )}
              <StateBadge state={after} />
            </span>
          </li>
        );
      })}
    </ul>
  );
}

export function BilanScreen({ onNewGame }: { onNewGame: () => void }) {
  const { state, orderNotes } = useGame();
  const misunderstood = orderNotes.filter((note) => note.errors.length > 0);

  return (
    <section aria-labelledby="st-bilan-title">
      <h1 id="st-bilan-title">Bilan</h1>
      <p className="st-cause">{causeOf(state)}</p>
      <SeasonReports season={state.season} interactive={false} />

      <h2>Indices manqués</h2>
      <MissedClues />

      <h2>Ordres mal compris</h2>
      {misunderstood.length === 0 ? <p>Tous tes ordres ont été compris.</p> : <OrderCorrections notes={misunderstood} />}

      <h2>Notions touchées</h2>
      <TouchedNotions />

      <button type="button" className="primary st-next" onClick={onNewGame}>
        Nouvelle partie
      </button>
    </section>
  );
}
