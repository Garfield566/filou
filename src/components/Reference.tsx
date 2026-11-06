import { useState } from 'react';
import { lessonsOf } from '../data/courses';
import { conjugate, tensesOf, verbNames } from '../lib/conjugation';
import type { Progress } from '../lib/progress';
import { grammarMastery } from '../lib/session';
import { familyProgress, verbFamilies } from '../lib/verbs';
import type { Course, GrammarLesson } from '../types';
import { RuleContent, VerbFamilyContent } from './ExerciseView';

interface Props {
  course: Course;
  progress: Progress;
  tab: ReferenceTab;
  onTabChange: (tab: ReferenceTab) => void;
  onPractice: (lessonId: string) => void;
  onDrill: (tenseId: string) => void;
  onLearnVerbs: (familyId: string) => void;
  onReviewVerbs: () => void;
  onBack: () => void;
}

export type ReferenceTab = 'rules' | 'verbs' | 'irregular';

export function Reference({
  course,
  progress,
  tab,
  onTabChange: setTab,
  onPractice,
  onDrill,
  onLearnVerbs,
  onReviewVerbs,
  onBack,
}: Props) {

  const lessons = lessonsOf(course).filter((lesson): lesson is GrammarLesson => lesson.kind === 'grammar');
  const done = new Set(progress.completedLessons);
  const now = Date.now();
  const noHearts = progress.hearts === 0 && !progress.testMode;

  return (
    <div className="home">
      <header className="stats">
        <button className="ghost" onClick={onBack} aria-label="Retour au parcours">
          ←
        </button>
        <span className="brand">Grammaire · {course.label}</span>
      </header>

      <div className="reference-tabs" role="group" aria-label="Rubrique">
        <button className={tab === 'rules' ? 'active' : ''} aria-pressed={tab === 'rules'} onClick={() => setTab('rules')}>
          Règles
        </button>
        <button className={tab === 'verbs' ? 'active' : ''} aria-pressed={tab === 'verbs'} onClick={() => setTab('verbs')}>
          Conjugaison
        </button>
        <button className={tab === 'irregular' ? 'active' : ''} aria-pressed={tab === 'irregular'} onClick={() => setTab('irregular')}>
          {course.id === 'de' ? 'Verbes forts' : 'Irréguliers'}
        </button>
      </div>

      {tab === 'irregular' && (
        <>
          <button className="primary verbs-mix" disabled={noHearts} onClick={onReviewVerbs}>
            12 verbes au hasard, les moins connus d'abord
          </button>
          {verbFamilies(course).map((family) => (
            <details className="rule-entry" key={family.id}>
              <summary>
                <span>{family.title}</span>
                <small>
                  {familyProgress(course, family, progress.memory, now)} / {family.verbs.length}
                </small>
              </summary>
              <VerbFamilyContent course={course} family={family} />
              <button className="primary" disabled={noHearts} onClick={() => onLearnVerbs(family.id)}>
                Apprendre cette famille
              </button>
            </details>
          ))}
        </>
      )}

      {tab === 'rules' &&
        lessons.map((lesson) => (
          <details className="rule-entry" key={lesson.id}>
            <summary>
              <span>{lesson.title}</span>
              <small>
                {lesson.level}
                {done.has(lesson.id) && ` · ${Math.round(grammarMastery(course, lesson, progress.memory, now) * 100)} %`}
              </small>
            </summary>
            <RuleContent course={course} lesson={lesson} />
            {(done.has(lesson.id) || progress.testMode) && (
              <button className="primary" disabled={noHearts} onClick={() => onPractice(lesson.id)}>
                M'entraîner sur cette règle
              </button>
            )}
          </details>
        ))}

      {tab === 'verbs' && <Conjugation course={course} noHearts={noHearts} onDrill={onDrill} />}
    </div>
  );
}

function Conjugation({
  course,
  noHearts,
  onDrill,
}: {
  course: Course;
  noHearts: boolean;
  onDrill: (tenseId: string) => void;
}) {
  const tenses = tensesOf(course);
  const verbs = verbNames(course);
  const [tenseId, setTenseId] = useState(tenses[0].id);
  const [verb, setVerb] = useState(verbs[0].name);
  const tense = tenses.find((item) => item.id === tenseId)!;

  return (
    <>
      <div className="tense-chips" role="group" aria-label="Temps">
        {tenses.map((item) => (
          <button
            key={item.id}
            className={item.id === tenseId ? 'active' : ''}
            aria-pressed={item.id === tenseId}
            onClick={() => setTenseId(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <select className="verb-select" aria-label="Verbe" value={verb} onChange={(event) => setVerb(event.target.value)}>
        {verbs.map((item) => (
          <option key={item.name} value={item.name}>
            {item.name} ({item.fr})
          </option>
        ))}
      </select>
      <div className="table-scroll">
        <table className="grammar-table" lang={course.languageTag}>
          <caption>
            {verb} au {tense.label}
          </caption>
          <tbody>
            {conjugate(course, verb, tenseId).map(({ pronoun, form }) => (
              <tr key={pronoun}>
                <th scope="row">{pronoun}</th>
                <td>{form}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="primary" disabled={noHearts} onClick={() => onDrill(tenseId)}>
        10 verbes au {tense.label}
      </button>
    </>
  );
}
