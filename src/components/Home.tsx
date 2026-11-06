import { courses, lessonsOf } from '../data/courses';
import {
  DAILY_GOAL_XP,
  MAX_HEARTS,
  msUntilNextHeart,
  visibleDailyXp,
  visibleStreak,
  type Progress,
} from '../lib/progress';
import { useHasVoice } from '../lib/speech';
import type { Course } from '../types';
import { Mascot } from './Mascot';

interface Props {
  course: Course;
  progress: Progress;
  onStart: (lessonId: string) => void;
  onSwitchCourse: (courseId: string) => void;
}

export function Home({ course, progress, onStart, onSwitchCourse }: Props) {
  const now = Date.now();
  const allLessons = lessonsOf(course);
  const done = new Set(progress.completedLessons);
  const dailyXp = visibleDailyXp(progress, now);
  const goalPercent = Math.min(100, (dailyXp / DAILY_GOAL_XP) * 100);
  const nextLesson = allLessons.find((lesson) => !done.has(lesson.id));
  const nextIndex = nextLesson ? allLessons.indexOf(nextLesson) : allLessons.length;
  const noHearts = progress.hearts === 0;
  const voiceAvailable = useHasVoice(course.languageTag);

  return (
    <div className="home">
      <header className="stats">
        <span className="brand">Filou</span>
        <span title="Série de jours">🔥 {visibleStreak(progress, now)}</span>
        <span title="Points d'expérience">⭐ {progress.xp}</span>
        <span title={`Vies, sur ${MAX_HEARTS}`}>❤️ {progress.hearts}</span>
      </header>

      <div className="course-switch" role="group" aria-label="Langue à apprendre">
        {courses.map((item) => {
          const lessons = lessonsOf(item);
          const finished = lessons.filter((lesson) => done.has(lesson.id)).length;
          return (
            <button
              key={item.id}
              className={item.id === course.id ? 'active' : ''}
              aria-pressed={item.id === course.id}
              onClick={() => onSwitchCourse(item.id)}
            >
              {item.label}
              <small>
                {finished} / {lessons.length}
              </small>
            </button>
          );
        })}
      </div>

      <section className="hero">
        <Mascot size={92} />
        <div className="hero-text">
          <h1>{nextLesson ? `Prochaine étape : ${nextLesson.title}` : `Cours d'${course.name} terminé, bravo !`}</h1>
          <p>
            Objectif du jour : {Math.min(dailyXp, DAILY_GOAL_XP)} / {DAILY_GOAL_XP} XP
          </p>
          <div className="meter" role="progressbar" aria-valuenow={goalPercent} aria-valuemin={0} aria-valuemax={100}>
            <div style={{ width: `${goalPercent}%` }} />
          </div>
        </div>
      </section>

      {noHearts && (
        <p className="notice">
          Plus de vies ! La prochaine revient dans {Math.ceil(msUntilNextHeart(progress, now) / 60000)} min.
        </p>
      )}

      {!voiceAvailable && (
        <p className="hint">
          Aucune voix en {course.name} n'est disponible sur cet appareil, donc les dictées sont masquées.
          Ajoute cette voix dans les réglages de ton système, puis relance le navigateur.
        </p>
      )}

      {course.units.map((unit, unitIndex) => (
        <section className="unit" key={unit.id}>
          <h2>
            <span>Unité {unitIndex + 1}</span>
            {unit.title}
          </h2>
          <p>{unit.description}</p>
          <div className="tiles">
            {unit.lessons.map((lesson) => {
              const index = allLessons.indexOf(lesson);
              const isDone = done.has(lesson.id);
              const isNext = index === nextIndex;
              const locked = index > nextIndex;
              return (
                <button
                  key={lesson.id}
                  className={`tile${isDone ? ' done' : ''}${isNext ? ' next' : ''}`}
                  disabled={locked || noHearts}
                  onClick={() => onStart(lesson.id)}
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
    </div>
  );
}
