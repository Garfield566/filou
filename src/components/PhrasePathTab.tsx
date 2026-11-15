import { useRemembered } from '../lib/remembered';
import { recall } from '../lib/memory';
import { phraseChallengeOpen, phraseChallenges, phraseItemId, phraseLessons, phraseTracks } from '../lib/phrases';
import type { Progress } from '../lib/progress';
import type { Course } from '../types';

interface Props {
  course: Course;
  progress: Progress;
  noHearts: boolean;
  onStartLesson: (lessonId: string) => void;
  onStartChallenge: (challengeId: string) => void;
}

/** How a sentence is built, as long paths: one per subject, lessons unlocked one after the other, and challenges. */
export function PhrasePathTab({ course, progress, noHearts, onStartLesson, onStartChallenge }: Props) {
  const tracks = phraseTracks(course);
  const [trackId, setTrackId] = useRemembered(`phrases.track.${course.id}`, tracks[0]?.id);
  const [mode, setMode] = useRemembered<'learn' | 'practise'>('phrases.mode', 'learn');
  const track = tracks.find((item) => item.id === trackId) ?? tracks[0];
  if (!track) {
    return (
      <section className="hero">
        <div className="hero-text">
          <h1>Bientôt ici</h1>
          <p>Les parcours sur la construction des phrases arrivent d'abord en allemand.</p>
        </div>
      </section>
    );
  }

  const now = Date.now();
  const done = new Set(progress.completedLessons);
  const lessons = phraseLessons(track);
  const next = lessons.find((lesson) => !done.has(lesson.id));
  const nextIndex = next ? lessons.indexOf(next) : lessons.length;
  const known = (lessonId: string) => {
    const memory = progress.memory[phraseItemId(course, lessonId)];
    return memory !== undefined && recall(memory, now) >= 0.5;
  };

  const picker = tracks.length > 1 && (
    <div className="path-tabs sub" role="tablist" aria-label="Parcours de phrases">
      {tracks.map((item) => (
        <button key={item.id} role="tab" aria-selected={item === track} className={item === track ? 'active' : ''} onClick={() => setTrackId(item.id)}>
          {item.title}
        </button>
      ))}
    </div>
  );

  const switcher = (
    <div className="path-tabs sub" role="tablist" aria-label="Apprendre ou consolider">
      <button role="tab" aria-selected={mode === 'learn'} className={mode === 'learn' ? 'active' : ''} onClick={() => setMode('learn')}>
        Apprendre
      </button>
      <button role="tab" aria-selected={mode === 'practise'} className={mode === 'practise' ? 'active' : ''} onClick={() => setMode('practise')}>
        Consolider
      </button>
    </div>
  );

  if (mode === 'practise') {
    const challenges = phraseChallenges(track);
    const isOpen = (challenge: (typeof challenges)[number]) => phraseChallengeOpen(challenge, done) || progress.testMode;
    const open = challenges.filter(isOpen);
    const nextChallenge = open.find((challenge) => !done.has(challenge.id));
    const passed = challenges.filter((challenge) => done.has(challenge.id)).length;
    return (
      <>
        {picker}
        {switcher}
        <section className="hero verbs-hero">
          <div className="hero-text">
            <h1>
              {nextChallenge
                ? `Prochain défi : ${nextChallenge.lessons.length} notions mélangées`
                : open.length === 0
                  ? 'Termine deux leçons pour ouvrir le premier défi'
                  : open.length === challenges.length
                    ? 'Tous les défis sont réussis, bravo !'
                    : 'Défis à jour : avance dans « Apprendre » pour ouvrir le suivant'}
            </h1>
            <p>
              Un défi toutes les deux leçons : les notions que tu viens d'apprendre, mêlées à toutes celles d'avant, avec
              d'autres phrases. {passed} / {challenges.length} réussis.
            </p>
          </div>
        </section>
        <section className="unit">
          <div className="tiles">
            {challenges.map((challenge) => {
              const opened = isOpen(challenge);
              const isDone = done.has(challenge.id);
              return (
                <button
                  key={challenge.id}
                  className={`tile${isDone ? ' done' : ''}${challenge === nextChallenge ? ' next' : ''}`}
                  disabled={!opened || noHearts}
                  onClick={() => onStartChallenge(challenge.id)}
                >
                  <span className="tile-mark" aria-hidden="true">
                    {isDone ? '✓' : opened ? '🏁' : '🔒'}
                  </span>
                  <span>
                    Défi {challenge.number} · {challenge.size} questions sur {challenge.lessons.length} notions
                    {!opened && <small className="tile-note"> après « {challenge.lessons.at(-1)!.title} »</small>}
                  </span>
                  {!opened && <span className="sr-only"> (verrouillé)</span>}
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
      {picker}
      {switcher}
      <section className="hero verbs-hero">
        <div className="hero-text">
          <h1>{next ? `Prochaine leçon : ${next.title}` : `${track.title} : parcours terminé, bravo !`}</h1>
          <p>
            {track.hint} {lessons.length} leçons · {lessons.filter((lesson) => done.has(lesson.id)).length} terminées
          </p>
        </div>
      </section>

      {track.units.map((unit, unitIndex) => (
        <section className="unit" key={unit.id}>
          <h2>
            <span>
              Unité {unitIndex + 1} · {unit.level} · {unit.lessons.filter((lesson) => known(lesson.id)).length} / {unit.lessons.length} notions sues
            </span>
            {unit.title}
          </h2>
          <p>{unit.hint}</p>
          <div className="tiles">
            {unit.lessons.map((lesson) => {
              const index = lessons.indexOf(lesson);
              const isDone = done.has(lesson.id);
              const locked = index > nextIndex && !progress.testMode;
              return (
                <button
                  key={lesson.id}
                  className={`tile${isDone ? ' done' : ''}${index === nextIndex ? ' next' : ''}`}
                  disabled={locked || noHearts}
                  onClick={() => onStartLesson(lesson.id)}
                >
                  <span className="tile-mark" aria-hidden="true">
                    {isDone ? '✓' : locked ? '🔒' : '▶'}
                  </span>
                  <span>{lesson.title}</span>
                  {locked && <span className="sr-only"> (verrouillée)</span>}
                  {isDone && <span className="sr-only"> (terminée)</span>}
                </button>
              );
            })}
          </div>
        </section>
      ))}

      <p className="credits">Phrases écrites pour Filou et relues par une IA, pas encore par un locuteur natif.</p>
    </>
  );
}
