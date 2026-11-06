import { courses, lessonsOf } from '../data/courses';
import {
  DAILY_GOAL_XP,
  MAX_HEARTS,
  msUntilNextHeart,
  visibleDailyXp,
  visibleStreak,
  type Progress,
} from '../lib/progress';
import { dueItems, itemsOfCourse } from '../lib/session';
import { learnedBankWords } from '../lib/wordBank';
import type { Course } from '../types';
import { Mascot } from './Mascot';
import { TipContent } from './ExerciseView';

interface Props {
  course: Course;
  progress: Progress;
  onStart: (lessonId: string) => void;
  onReview: () => void;
  onBank: () => void;
  onOpenReference: () => void;
  onToggleTestMode: () => void;
  onReset: () => void;
  onSwitchCourse: (courseId: string) => void;
}

export function Home({
  course,
  progress,
  onStart,
  onReview,
  onBank,
  onOpenReference,
  onToggleTestMode,
  onReset,
  onSwitchCourse,
}: Props) {
  const now = Date.now();
  const allLessons = lessonsOf(course);
  const done = new Set(progress.completedLessons);
  const dailyXp = visibleDailyXp(progress, now);
  const goalPercent = Math.min(100, (dailyXp / DAILY_GOAL_XP) * 100);
  const nextLesson = allLessons.find((lesson) => !done.has(lesson.id));
  const nextIndex = nextLesson ? allLessons.indexOf(nextLesson) : allLessons.length;
  const noHearts = progress.hearts === 0 && !progress.testMode;
  const learned = itemsOfCourse(course).filter((item) => progress.memory[item.id]).length;
  const due = dueItems(course, progress.memory, now).length;

  return (
    <div className="home">
      <header className="stats">
        <span className="brand">Filou</span>
        <span title="Série de jours">🔥 {visibleStreak(progress, now)}</span>
        <span title="Points d'expérience">⭐ {progress.xp}</span>
        <span title={`Vies, sur ${MAX_HEARTS}`}>❤️ {progress.testMode ? '∞' : progress.hearts}</span>
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
            Objectif du jour : {Math.min(dailyXp, DAILY_GOAL_XP)} / {DAILY_GOAL_XP} XP · {learned} mots et phrases vus
          </p>
          <div className="meter" role="progressbar" aria-valuenow={goalPercent} aria-valuemin={0} aria-valuemax={100}>
            <div style={{ width: `${goalPercent}%` }} />
          </div>
        </div>
      </section>

      {learned > 0 && (
        <button className="review" disabled={noHearts} onClick={onReview}>
          <span>{due > 0 ? 'Révisions à faire' : "S'entraîner"}</span>
          <small>{due > 0 ? `${due} à revoir avant de les oublier` : 'Rien à revoir pour le moment'}</small>
        </button>
      )}

      <div className="test-mode">
        <button aria-pressed={progress.testMode} className={progress.testMode ? 'active' : ''} onClick={onToggleTestMode}>
          {progress.testMode ? 'Mode test activé : tout est ouvert' : 'Activer le mode test : tout ouvrir'}
        </button>
        <button
          onClick={() => {
            if (window.confirm('Effacer toute ta progression dans les deux langues ?')) onReset();
          }}
        >
          Recommencer à zéro
        </button>
      </div>

      {course.bank.length > 0 && (
        <button className="review" disabled={noHearts} onClick={onBank}>
          <span>Banque de mots : 5 nouveaux mots</span>
          <small>
            {learnedBankWords(course, progress.memory)} / {course.bank.length} mots vus
          </small>
        </button>
      )}

      <button className="reference-link" onClick={onOpenReference}>
        <span>Carnet de grammaire et conjugaison</span>
        <small>Règles, tableaux, temps et verbes {course.id === 'de' ? 'forts' : 'irréguliers'}</small>
      </button>

      {noHearts && (
        <p className="notice">
          Plus de vies ! La prochaine revient dans {Math.ceil(msUntilNextHeart(progress, now) / 60000)} min.
        </p>
      )}

      {course.units.map((unit, unitIndex) => (
        <section className="unit" key={unit.id}>
          <h2>
            <span>
              Unité {unitIndex + 1} · {unit.level ?? 'A1'}
            </span>
            {unit.title}
          </h2>
          <p>{unit.description}</p>
          <details className="tip-details">
            <summary>Bon à savoir : {unit.tip.title}</summary>
            <TipContent course={course} tip={unit.tip} />
          </details>
          <div className="tiles">
            {unit.lessons.map((lesson) => {
              const index = allLessons.indexOf(lesson);
              const isDone = done.has(lesson.id);
              const isNext = index === nextIndex;
              const locked = index > nextIndex && !progress.testMode;
              const mark = isDone ? '✓' : locked ? '🔒' : lesson.kind === 'dialogue' ? '💬' : lesson.kind === 'grammar' ? '📘' : '▶';
              return (
                <button
                  key={lesson.id}
                  className={`tile${isDone ? ' done' : ''}${isNext ? ' next' : ''}`}
                  disabled={locked || noHearts}
                  onClick={() => onStart(lesson.id)}
                >
                  <span className="tile-mark" aria-hidden="true">
                    {mark}
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

      {course.id === 'de' && (
        <p className="credits">
          Phrases : <a href="https://tatoeba.org">Tatoeba</a> (CC BY 2.0 FR,{' '}
          <a href={`${import.meta.env.BASE_URL}credits/tatoeba-de.tsv`}>liste des auteurs</a>). Sens et genres :{' '}
          <a href="https://fr.wiktionary.org">Wiktionnaire</a> (CC BY-SA).
        </p>
      )}

      {course.id === 'en' && (
        <p className="credits">
          Mots fréquents du mode Stratégie : <a href="https://github.com/rspeer/wordfreq">wordfreq</a> (données CC BY-SA
          4.0).
        </p>
      )}
    </div>
  );
}
