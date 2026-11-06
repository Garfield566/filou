import { useMemo } from 'react';
import { reportLabels, reports } from '../content';
import type { ErrorSeverity } from '../types';
import { useGame } from './GameContext';
import { MaskedText } from './MaskedText';
import type { OrderNote } from './orders';
import { fillReport } from './reports';

export const SEVERITY_NAMES: Record<ErrorSeverity, string> = {
  sans_gene: 'Faute sans gêne',
  imprecision: 'Imprécision',
  sens_change: 'Sens changé',
  mauvais_registre: 'Mauvais registre',
};

/** The reports written during one season. Only `interactive` while the game runs. */
export function SeasonReports({ season, interactive = true }: { season: number; interactive?: boolean }) {
  const { state } = useGame();
  const texts = useMemo(
    () =>
      state.reports
        .filter((report) => report.season === season)
        .flatMap((report, position) => {
          const template = reports.find((candidate) => candidate.textId === report.textId);
          return template ? [fillReport(report, position, template.text, { labels: reportLabels, npcs: state.npcs })] : [];
        }),
    [state.reports, state.npcs, season],
  );

  return (
    <>
      {texts.map((text) => (
        <article className="st-card" key={text.id}>
          <MaskedText text={text} interactive={interactive} />
        </article>
      ))}
    </>
  );
}

export function OrderCorrections({ notes }: { notes: OrderNote[] }) {
  const { state } = useGame();
  return (
    <>
      {notes.map((note) => (
        <article className="st-card" key={note.templateId}>
          <p className="st-label">Ordre à {state.npcs.find((npc) => npc.id === note.npcId)?.name ?? note.npcId}</p>
          <p lang="en" className="st-said">
            {note.said}
          </p>
          {note.errors.length === 0 && <p className="st-good">Ordre compris sans faute.</p>}
          {note.errors.map((error, index) => (
            <p key={index}>
              <strong>{SEVERITY_NAMES[error.gravite]} :</strong> {error.explanationFr}
            </p>
          ))}
          {note.errors.length > 0 && (
            <p>
              <span className="st-label">Formulation correcte :</span>{' '}
              <span lang="en" className="st-said">
                {note.correct}
              </span>
            </p>
          )}
        </article>
      ))}
    </>
  );
}

export function ReportsScreen({ onNext }: { onNext: () => void }) {
  const { state, orderNotes } = useGame();
  const previous = state.season - 1;
  const notes = orderNotes.filter((note) => note.season === previous);

  return (
    <section aria-labelledby="st-reports-title">
      <h1 id="st-reports-title">Rapports</h1>
      {previous === 0 ? (
        <p>Le roi de France t'a confié cette colonie. Aucun rapport pour l'instant : ton mandat commence.</p>
      ) : (
        <SeasonReports season={previous} />
      )}
      {notes.length > 0 && (
        <>
          <h2>Tes ordres de la saison passée</h2>
          <OrderCorrections notes={notes} />
        </>
      )}
      <button type="button" className="primary st-next" onClick={onNext}>
        Passer à l'audience
      </button>
    </section>
  );
}
