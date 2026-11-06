import { useMemo, useState } from 'react';
import { acceptedAnswers, isCorrect } from '../lib/grade';
import { hasVoice } from '../lib/speech';
import type { Course, Lesson } from '../types';
import { ExerciseView } from './ExerciseView';
import { Mascot } from './Mascot';

interface Props {
  course: Course;
  lesson: Lesson;
  hearts: number;
  onMistake: () => void;
  /** Records the finished lesson and returns the XP it earned. */
  onComplete: (perfect: boolean) => number;
  onExit: () => void;
}

type Feedback = 'correct' | 'wrong' | null;

export function LessonScreen({ course, lesson, hearts, onMistake, onComplete, onExit }: Props) {
  const exercises = useMemo(
    () => lesson.exercises.filter((exercise) => exercise.kind !== 'listen' || hasVoice(course.languageTag)),
    [lesson, course],
  );
  // Missed exercises go back to the end of the queue until they are answered correctly.
  const [queue, setQueue] = useState(() => exercises.map((_, index) => index));
  const [attempt, setAttempt] = useState(0);
  const [draft, setDraft] = useState('');
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [mistakes, setMistakes] = useState(0);
  const [failed, setFailed] = useState(false);
  const [xpGained, setXpGained] = useState<number | null>(null);

  const exercise = exercises[queue[0]];
  const solved = exercises.length - queue.length;
  const accuracy = Math.round((exercises.length / (exercises.length + mistakes)) * 100);

  const answer = (correct: boolean) => {
    setFeedback(correct ? 'correct' : 'wrong');
    if (!correct) {
      setMistakes((count) => count + 1);
      onMistake();
    }
  };

  const next = () => {
    if (feedback === 'wrong' && hearts === 0) {
      setFailed(true);
      return;
    }
    const remaining = feedback === 'correct' ? queue.slice(1) : [...queue.slice(1), queue[0]];
    if (remaining.length === 0) setXpGained(onComplete(mistakes === 0));
    setQueue(remaining);
    setDraft('');
    setFeedback(null);
    setAttempt((count) => count + 1);
  };

  if (xpGained !== null) {
    return (
      <div className="end">
        <Mascot size={140} />
        <h1>Leçon terminée !</h1>
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
        <p>Tes vies reviennent une par une toutes les 30 minutes. Tu retenteras cette leçon juste après.</p>
        <button className="primary" autoFocus onClick={onExit}>
          Retour au parcours
        </button>
      </div>
    );
  }

  return (
    <div className="lesson">
      <header className="lesson-top">
        <button className="ghost" onClick={onExit} aria-label="Quitter la leçon">
          ✕
        </button>
        <div
          className="meter"
          role="progressbar"
          aria-label="Progression de la leçon"
          aria-valuenow={solved}
          aria-valuemin={0}
          aria-valuemax={exercises.length}
        >
          <div style={{ width: `${(solved / exercises.length) * 100}%` }} />
        </div>
        <span title="Vies">❤️ {hearts}</span>
      </header>

      <main className="lesson-body">
        <ExerciseView
          key={attempt}
          course={course}
          exercise={exercise}
          draft={draft}
          locked={feedback !== null}
          onDraft={setDraft}
          onSubmit={() => draft.trim() && answer(isCorrect(exercise, draft))}
          onPairsDone={() => answer(true)}
        />
      </main>

      <footer className={`lesson-foot ${feedback ?? ''}`}>
        <div className="lesson-foot-inner">
          {feedback && (
            <div role="status">
              <strong>{feedback === 'correct' ? 'Bien joué !' : 'Pas tout à fait'}</strong>
              {feedback === 'wrong' && <p>Réponse attendue : {acceptedAnswers(exercise)[0]}</p>}
            </div>
          )}
          {feedback ? (
            <button className="primary" autoFocus onClick={next}>
              Continuer
            </button>
          ) : (
            exercise.kind !== 'pairs' && (
              <button className="primary" disabled={!draft.trim()} onClick={() => answer(isCorrect(exercise, draft))}>
                Vérifier
              </button>
            )
          )}
        </div>
      </footer>
    </div>
  );
}
