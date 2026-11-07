import { useState } from 'react';
import { play } from '../lib/audio';
import { grade, normalize, type Verdict } from '../lib/grade';
import type { Course, Exercise } from '../types';
import { ExerciseView } from './ExerciseView';
import { Mascot } from './Mascot';

interface Props {
  course: Course;
  steps: Exercise[];
  hearts: number;
  onAnswer: (itemIds: string[], correct: boolean) => void;
  /** Records the finished session and returns the XP it earned. */
  onComplete: (perfect: boolean) => number;
  onHideSentence: (sentenceId: string) => void;
  onExit: () => void;
}

const isCard = (step: Exercise) =>
  step.kind === 'intro' || step.kind === 'tip' || step.kind === 'rule' || step.kind === 'verbs' || step.kind === 'dialogue' || step.kind === 'usage';

function expectedAnswers(step: Exercise): string[] {
  if (step.kind === 'choice') return [step.answer];
  if (step.kind === 'arrange' || step.kind === 'type') return step.answers;
  return [];
}

export function SessionScreen({ course, steps, hearts, onAnswer, onComplete, onHideSentence, onExit }: Props) {
  // Missed exercises go back to the end of the queue until they are answered correctly.
  const [queue, setQueue] = useState(() => steps.map((_, index) => index));
  const [attempt, setAttempt] = useState(0);
  const [draft, setDraft] = useState('');
  const [verdict, setVerdict] = useState<Verdict | null>(null);
  const [mistakes, setMistakes] = useState(0);
  const [failed, setFailed] = useState(false);
  const [xpGained, setXpGained] = useState<number | null>(null);
  const [reported, setReported] = useState<string | null>(null);

  const step = steps[queue[0]];
  const solved = steps.length - queue.length;
  const graded = steps.filter((item) => !isCard(item)).length;
  const accuracy = Math.round((graded / (graded + mistakes)) * 100);

  const settle = (result: Verdict) => {
    const correct = result !== 'wrong';
    setVerdict(result);
    if ('itemIds' in step) onAnswer(step.itemIds, correct);
    if (!correct) setMistakes((count) => count + 1);
    if ('audio' in step && step.audio) play(course.id, step.audio);
  };

  const check = () => {
    if (!draft.trim()) return;
    const strict = step.kind === 'choice' || (step.kind === 'type' && step.strict);
    settle(grade(expectedAnswers(step), draft, { allowTypo: step.kind === 'type' && !strict, exactAccents: strict }));
  };

  const advance = (requeue: boolean) => {
    if (requeue && hearts === 0) {
      setFailed(true);
      return;
    }
    const remaining = requeue ? [...queue.slice(1), queue[0]] : queue.slice(1);
    if (remaining.length === 0) setXpGained(onComplete(mistakes === 0));
    setQueue(remaining);
    setDraft('');
    setVerdict(null);
    setAttempt((count) => count + 1);
  };

  if (xpGained !== null) {
    return (
      <div className="end">
        <Mascot size={140} />
        <h1>Séance terminée !</h1>
        <div className="end-stats">
          <div>
            <strong>+{xpGained}</strong> XP
          </div>
          <div>
            <strong>{accuracy} %</strong> de précision
          </div>
        </div>
        <button className="primary" autoFocus onClick={onExit}>
          Continuer
        </button>
      </div>
    );
  }

  if (failed) {
    return (
      <div className="end">
        <Mascot mood="sad" size={140} />
        <h1>Plus de vies</h1>
        <p>Tes vies reviennent une par une toutes les 30 minutes. Tu retenteras cette séance juste après.</p>
        <button className="primary" autoFocus onClick={onExit}>
          Retour au parcours
        </button>
      </div>
    );
  }

  const expected = expectedAnswers(step)[0];
  const showExpected =
    verdict === 'wrong' || verdict === 'typo' || (step.kind === 'type' && verdict === 'correct' && normalize(draft) !== normalize(expected));

  return (
    <div className="lesson">
      <header className="lesson-top">
        <button className="ghost" onClick={onExit} aria-label="Quitter la séance">
          ✕
        </button>
        <div
          className="meter"
          role="progressbar"
          aria-label="Progression de la séance"
          aria-valuenow={solved}
          aria-valuemin={0}
          aria-valuemax={steps.length}
        >
          <div style={{ width: `${(solved / steps.length) * 100}%` }} />
        </div>
        <span title="Vies">❤️ {hearts}</span>
      </header>

      <main className="lesson-body">
        <ExerciseView
          key={attempt}
          course={course}
          step={step}
          draft={draft}
          locked={verdict !== null}
          onDraft={setDraft}
          onSubmit={check}
          onPairsDone={() => settle('correct')}
        />
      </main>

      <footer className={`lesson-foot ${verdict === 'wrong' ? 'wrong' : verdict ? 'correct' : ''}`}>
        <div className="lesson-foot-inner">
          {verdict && (
            <div role="status">
              <strong>
                {verdict === 'correct' ? 'Bien joué !' : verdict === 'typo' ? 'Presque ! Attention à l’orthographe' : 'Pas tout à fait'}
              </strong>
              {showExpected && <p>Réponse : {expected}</p>}
              {'why' in step && step.why && <p className="why">{step.why}</p>}
              {'sentenceId' in step && step.sentenceId && (
                <button
                  className="report"
                  disabled={reported === step.sentenceId}
                  onClick={() => {
                    onHideSentence(step.sentenceId!);
                    setReported(step.sentenceId!);
                  }}
                >
                  {reported === step.sentenceId ? 'Phrase retirée' : 'Phrase bizarre ? La retirer'}
                </button>
              )}
            </div>
          )}
          {isCard(step) ? (
            <button className="primary" autoFocus onClick={() => advance(false)}>
              Continuer
            </button>
          ) : verdict ? (
            <button className="primary" autoFocus onClick={() => advance(verdict === 'wrong')}>
              Continuer
            </button>
          ) : (
            step.kind !== 'pairs' && (
              <button className="primary" disabled={!draft.trim()} onClick={check}>
                Vérifier
              </button>
            )
          )}
        </div>
      </footer>
    </div>
  );
}
