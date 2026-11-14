import { useState } from 'react';
import type { Progress } from '../lib/progress';
import { challengeOpen, nextVerbLesson, verbChallenges, verbLessons, verbPath } from '../lib/verbPath';
import { familyProgress } from '../lib/verbs';
import type { Course } from '../types';

interface Props {
  course: Course;
  progress: Progress;
  noHearts: boolean;
  onStartLesson: (lessonId: string) => void;
  onStartChallenge: (challengeId: string) => void;
  onReview: () => void;
}

/** The irregular verbs as a path: one unit per family, lessons unlocked one after the other as in the course. */
export function VerbPathTab({ course, progress, noHearts, onStartLesson, onStartChallenge, onReview }: Props) {
  const [mode, setMode] = useState<'learn' | 'practise'>('learn');
  const now = Date.now();
  const done = new Set(progress.completedLessons);
  const lessons = verbLessons(course);
  const next = nextVerbLesson(course, done);
  const nextIndex = next ? lessons.indexOf(next) : lessons.length;
  const units = verbPath(course);
  const total = units.reduce((sum, unit) => sum + unit.family.verbs.length, 0);
  const finished = lessons.filter((lesson) => done.has(lesson.id)).length;
  const word = course.id === 'de' ? 'verbes forts et irréguliers' : 'verbes irréguliers';

  const switcher = (
    <div className="path-tabs sub" role="tablist" aria-label="Verbes">
      <button role="tab" aria-selected={mode === 'learn'} className={mode === 'learn' ? 'active' : ''} onClick={() => setMode('learn')}>
        Apprendre
      </button>
      <button role="tab" aria-selected={mode === 'practise'} className={mode === 'practise' ? 'active' : ''} onClick={() => setMode('practise')}>
        Consolider
      </button>
    </div>
  );

  if (mode === 'practise') {
    const challenges = verbChallenges(course);
    const open = challenges.filter((challenge) => challengeOpen(challenge, done) || progress.testMode);
    const passed = challenges.filter((challenge) => done.has(challenge.id)).length;
    const nextChallenge = open.find((challenge) => !done.has(challenge.id));
    return (
      <>
        {switcher}
        <section className="hero verbs-hero">
          <div className="hero-text">
            <h1>
              {nextChallenge
                ? `Prochain défi : ${nextChallenge.verbs.length} verbes mélangés`
                : open.length === 0
                  ? 'Termine deux leçons pour ouvrir le premier défi'
                  : open.length === challenges.length
                    ? 'Tous les défis sont réussis, bravo !'
                    : 'Défis à jour : avance dans « Apprendre » pour ouvrir le suivant'}
            </h1>
            <p>
              Un défi toutes les deux leçons : les verbes que tu viens d'apprendre, mêlés à tous ceux d'avant. Plus tu
              avances, plus il y en a. {passed} / {challenges.length} réussis.
            </p>
          </div>
        </section>
        <section className="unit">
          <div className="tiles">
            {challenges.map((challenge) => {
              const isOpen = challengeOpen(challenge, done) || progress.testMode;
              const isDone = done.has(challenge.id);
              const last = challenge.lessons.at(-1)!;
              return (
                <button
                  key={challenge.id}
                  className={`tile${isDone ? ' done' : ''}${challenge === nextChallenge ? ' next' : ''}`}
                  disabled={!isOpen || noHearts}
                  onClick={() => onStartChallenge(challenge.id)}
                >
                  <span className="tile-mark" aria-hidden="true">
                    {isDone ? '✓' : isOpen ? '🏁' : '🔒'}
                  </span>
                  <span>
                    Défi {challenge.number} · {challenge.size} questions sur {challenge.verbs.length} verbes
                    {!isOpen && <small className="tile-note"> après « {last.title} »</small>}
                  </span>
                  {!isOpen && <span className="sr-only"> (verrouillé)</span>}
                  {isDone && <span className="sr-only"> (réussi)</span>}
                </button>
              );
            })}
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      {switcher}
      <section className="hero verbs-hero">
        <div className="hero-text">
          <h1>{next ? `Prochaine leçon : ${next.family.title}` : `Tous les ${word} sont vus, bravo !`}</h1>
          <p>
            {total} {word}, {lessons.length} leçons · {finished} terminées
          </p>
        </div>
      </section>

      <button className="review" disabled={noHearts} onClick={onReview}>
        <span>Réviser les verbes</span>
        <small>Un mélange des verbes déjà vus, en commençant par ceux qui s'effacent</small>
      </button>

      {units.map((unit, unitIndex) => (
        <section className={`unit${unit.rare ? ' rare' : ''}`} key={unit.family.id}>
          <h2>
            <span>
              Unité {unitIndex + 1} · {familyProgress(course, unit.family, progress.memory, now)} / {unit.family.verbs.length} verbes sus
              {unit.rare ? ' · rares' : ''}
            </span>
            {unit.family.title}
          </h2>
          <p>{unit.family.hint}</p>
          <div className="tiles">
            {unit.lessons.map((lesson) => {
              const index = lessons.indexOf(lesson);
              const isDone = done.has(lesson.id);
              const isNext = index === nextIndex;
              const locked = index > nextIndex && !progress.testMode;
              return (
                <button
                  key={lesson.id}
                  className={`tile${isDone ? ' done' : ''}${isNext ? ' next' : ''}`}
                  disabled={locked || noHearts}
                  onClick={() => onStartLesson(lesson.id)}
                >
                  <span className="tile-mark" aria-hidden="true">
                    {isDone ? '✓' : locked ? '🔒' : '▶'}
                  </span>
                  <span lang={course.languageTag}>{lesson.title}</span>
                  {locked && <span className="sr-only"> (verrouillée)</span>}
                  {isDone && <span className="sr-only"> (terminée)</span>}
                </button>
              );
            })}
          </div>
        </section>
      ))}
    </>
  );
}
