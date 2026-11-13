import type { Progress } from '../lib/progress';
import { nextVerbLesson, verbLessons, verbPath } from '../lib/verbPath';
import { familyProgress } from '../lib/verbs';
import type { Course } from '../types';

interface Props {
  course: Course;
  progress: Progress;
  noHearts: boolean;
  onStartLesson: (lessonId: string) => void;
  onReview: () => void;
}

/** The irregular verbs as a path: one unit per family, lessons unlocked one after the other as in the course. */
export function VerbPathTab({ course, progress, noHearts, onStartLesson, onReview }: Props) {
  const now = Date.now();
  const done = new Set(progress.completedLessons);
  const lessons = verbLessons(course);
  const next = nextVerbLesson(course, done);
  const nextIndex = next ? lessons.indexOf(next) : lessons.length;
  const units = verbPath(course);
  const total = units.reduce((sum, unit) => sum + unit.family.verbs.length, 0);
  const finished = lessons.filter((lesson) => done.has(lesson.id)).length;
  const word = course.id === 'de' ? 'verbes forts et irréguliers' : 'verbes irréguliers';

  return (
    <>
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
