import { useMemo, useState } from 'react';
import { play } from '../../lib/audio';
import { audiences, gameVocabulary } from '../content';
import type { AudienceTemplate } from '../content/schemas';
import { maskText } from '../language/mask';
import { useGame } from './GameContext';
import { MaskedText } from './MaskedText';
import { stableShuffle, visibleWordIds } from './text';

function AudienceCard({ audience, decided }: { audience: AudienceTemplate; decided: string | null }) {
  const { state, act, course } = useGame();
  const [summary, setSummary] = useState<number | null>(null);

  const summaries = useMemo(
    () => stableShuffle(audience.summaries, `${state.seed}:${audience.id}`),
    [audience, state.seed],
  );
  const chosen = summary === null ? null : summaries[summary];
  const { complaint } = audience;
  const audio = complaint.audio;

  const decide = (decisionId: string) => {
    const segments = maskText(complaint, state.profile, gameVocabulary, state.revealedWords);
    act({
      type: 'decide',
      audienceId: audience.id,
      decisionId,
      // GDD 10.2: a complaint counts as understood only without help.
      understood: chosen?.correct === true && !state.translatedTexts.includes(complaint.id),
      itemIds: visibleWordIds(segments),
    });
  };

  const decision = audience.decisions.find((candidate) => candidate.id === decided);

  return (
    <article className="st-card">
      <h2>{audience.petitioner}</h2>
      <MaskedText text={complaint} />
      {audio && (
        <button type="button" className="st-button st-button-small" onClick={() => play(course.id, audio)}>
          Écouter la plainte
        </button>
      )}

      {decision ? (
        <>
          <p className="st-label">Ta décision :</p>
          <MaskedText text={decision.announcement} interpreter={false} />
        </>
      ) : (
        <>
          <h3>Que demande cette personne ?</h3>
          <div className="st-choices">
            {summaries.map((item, index) => (
              <button
                key={item.fr}
                type="button"
                className={`st-button st-option${summary === index ? ' st-selected' : ''}`}
                aria-pressed={summary === index}
                disabled={summary !== null}
                onClick={() => setSummary(index)}
              >
                {item.fr}
              </button>
            ))}
          </div>
          {chosen && (
            <p className={chosen.correct ? 'st-good' : 'st-bad'} role="status">
              {chosen.correct ? 'Tu as bien compris.' : "Ce n'est pas ce que cette personne dit."}
            </p>
          )}
          {chosen && (
            <>
              <h3>Ta décision</h3>
              {stableShuffle(audience.decisions, `${state.seed}:${audience.id}:decisions`).map((item) => (
                <div className="st-choice" key={item.id}>
                  <MaskedText text={item.announcement} />
                  <button type="button" className="st-button" onClick={() => decide(item.id)}>
                    Annoncer cette décision
                  </button>
                </div>
              ))}
            </>
          )}
        </>
      )}
    </article>
  );
}

export function AudienceScreen({ onNext }: { onNext: () => void }) {
  const { state } = useGame();
  const received = state.audiences.filter((audience) => audience.season === state.season);
  const waiting = received.filter((audience) => audience.decisionId === null).length;

  return (
    <section aria-labelledby="st-audience-title">
      <h1 id="st-audience-title">Audience</h1>
      {received.length === 0 && <p>Personne ne se présente cette saison.</p>}
      {received.flatMap((item) => {
        const audience = audiences.find((template) => template.id === item.audienceId);
        return audience ? [<AudienceCard key={audience.id} audience={audience} decided={item.decisionId} />] : [];
      })}
      {waiting > 0 && <p className="st-hint">Sans décision, une plainte reste sans réponse.</p>}
      <button type="button" className="primary st-next" onClick={onNext}>
        Passer au conseil
      </button>
    </section>
  );
}
