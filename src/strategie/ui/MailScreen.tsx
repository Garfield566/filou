import { useMemo, useState } from 'react';
import { gameVocabulary, letters } from '../content';
import type { LetterTemplate } from '../content/schemas';
import { maskText } from '../language/mask';
import type { ReceivedLetter } from '../types';
import { useGame } from './GameContext';
import { MaskedText } from './MaskedText';
import { flagTarget, letterPassages } from './passages';

function FlagPassage({ template, letter }: { template: LetterTemplate; letter: ReceivedLetter }) {
  const { state, act } = useGame();
  const [refused, setRefused] = useState(false);
  const passages = useMemo(() => letterPassages(template.text), [template]);
  const shown = maskText(template.text, state.profile, gameVocabulary, state.revealedWords);

  if (letter.flagged.length > 0) return <p className="st-hint">Passage signalé.</p>;

  return (
    <details className="st-group">
      <summary>Un passage te semble suspect ?</summary>
      <p className="st-hint">Un seul signalement par lettre, et il est définitif.</p>
      {refused && (
        <p className="st-bad" role="status">
          Ce passage ne peut pas être signalé.
        </p>
      )}
      {passages.map((passage, index) => {
        const target = flagTarget(passage, shown);
        return (
          <div className="st-choice" key={index}>
            <MaskedText
              text={{ id: `${template.text.id}#${index}`, level: template.text.level, segments: passage.segments, fr: '' }}
              interpreter={false}
            />
            <button
              type="button"
              className="st-button"
              disabled={target === null}
              onClick={() => {
                if (target !== null) setRefused(!act({ type: 'flagPassage', letterId: letter.letterId, segmentIndex: target }));
              }}
            >
              {target === null ? 'Illisible : impossible à signaler' : 'Signaler ce passage'}
            </button>
          </div>
        );
      })}
    </details>
  );
}

function LetterCard({ letter, template }: { letter: ReceivedLetter; template: LetterTemplate }) {
  const { state, act } = useGame();
  const reply = template.replies.find((candidate) => candidate.id === letter.replyId);
  const current = letter.season === state.season;

  return (
    <article className="st-card">
      <h2>
        Lettre de <span lang="en">{state.rival.name}</span>
      </h2>
      <p className="st-hint">Saison {letter.season}</p>
      <MaskedText text={template.text} />
      <FlagPassage template={template} letter={letter} />

      {reply ? (
        <>
          <p className="st-label">Ta réponse :</p>
          <MaskedText text={reply.text} interpreter={false} />
        </>
      ) : (
        current && (
          <>
            <h3>Répondre</h3>
            {template.replies.map((item) => (
              <div className="st-choice" key={item.id}>
                <MaskedText text={item.text} />
                <button
                  type="button"
                  className="st-button"
                  onClick={() => act({ type: 'answerLetter', letterId: letter.letterId, replyId: item.id })}
                >
                  Envoyer cette réponse
                </button>
              </div>
            ))}
          </>
        )
      )}
    </article>
  );
}

export function MailScreen({ onEnd }: { onEnd: () => void }) {
  const { state } = useGame();
  const known = state.letters.flatMap((letter) => {
    const template = letters.find((candidate) => candidate.id === letter.letterId);
    return template ? [{ letter, template }] : [];
  });
  const current = known.filter(({ letter }) => letter.season === state.season);
  const older = known.filter(({ letter }) => letter.season !== state.season);

  return (
    <section aria-labelledby="st-mail-title">
      <h1 id="st-mail-title">Courrier</h1>
      {current.length === 0 && <p>Aucune lettre cette saison.</p>}
      {current.map(({ letter, template }) => (
        <LetterCard key={letter.letterId} letter={letter} template={template} />
      ))}
      {older.length > 0 && (
        <details className="st-group">
          <summary>Lettres des saisons passées</summary>
          {older.map(({ letter, template }) => (
            <LetterCard key={letter.letterId} letter={letter} template={template} />
          ))}
        </details>
      )}
      {state.colony.pendingReward && <p className="st-hint">Choisis d'abord la récompense de la colonie.</p>}
      <button type="button" className="primary st-next" disabled={state.colony.pendingReward} onClick={onEnd}>
        Terminer la saison
      </button>
    </section>
  );
}
