import { useMemo } from 'react';
import { lessonsOf } from '../data/courses';
import type { NodeState } from '../lib/notions';
import type { Progress } from '../lib/progress';
import { buildProfile } from '../lib/reviewBridge';
import type { Course, LexicalField } from '../types';

const STATE_NAMES: Record<NodeState, string> = {
  grise: 'Inconnu',
  en_cours: 'En cours',
  maitrise: 'Maîtrisé',
  fissure: 'À revoir',
};

const STATES = Object.keys(STATE_NAMES) as NodeState[];

const FIELDS: { id: LexicalField; name: string }[] = [
  { id: 'commerce', name: 'Commerce' },
  { id: 'guerre', name: 'Guerre' },
  { id: 'droit', name: 'Droit' },
  { id: 'construction', name: 'Construction' },
  { id: 'religion', name: 'Religion' },
  { id: 'administration', name: 'Administration' },
  { id: 'vie_quotidienne', name: 'Vie quotidienne' },
];

function StateBadge({ state }: { state: NodeState }) {
  return <span className={`state state-${state}`}>{STATE_NAMES[state]}</span>;
}

interface Props {
  course: Course;
  progress: Progress;
  onBack: () => void;
}

export function ProgressTables({ course, progress, onBack }: Props) {
  const profile = useMemo(() => buildProfile(course, progress.memory, Date.now()), [course, progress.memory]);
  const grammar = lessonsOf(course).flatMap((lesson) => (lesson.kind === 'grammar' ? [lesson] : []));
  const themed = FIELDS.map((field) => ({
    ...field,
    words: course.bank
      .filter((word) => word.domain === field.id)
      .map((word) => ({ word, state: profile.words[`${course.id}:b:${word.target}`] ?? ('grise' as NodeState) })),
  })).filter((field) => field.words.length > 0);

  return (
    <div className="home tables">
      <button className="back" onClick={onBack}>
        Retour
      </button>
      <h1>Mes tableaux : {course.label}</h1>
      <ul className="state-legend" aria-label="Les quatre états">
        {STATES.map((state) => (
          <li key={state}>
            <StateBadge state={state} />
          </li>
        ))}
      </ul>

      {themed.length > 0 && <h2>Vocabulaire</h2>}
      {themed.map((field) => (
        <details className="table-group" key={field.id}>
          <summary>
            {field.name}
            <small>
              {STATES.map((state) => `${field.words.filter((item) => item.state === state).length} ${STATE_NAMES[state].toLowerCase()}`).join(' · ')}
            </small>
          </summary>
          <ul className="table-rows">
            {field.words.map(({ word, state }) => (
              <li key={word.target}>
                <span lang={course.languageTag}>
                  {word.target}
                  {state !== 'grise' && <small> : {word.fr}</small>}
                </span>
                <StateBadge state={state} />
              </li>
            ))}
          </ul>
        </details>
      ))}

      <h2>Grammaire</h2>
      <ul className="table-rows">
        {grammar.map((lesson) => (
          <li key={lesson.id}>
            <span>
              {lesson.title} <small>({lesson.level})</small>
            </span>
            <StateBadge state={profile.rules[lesson.id] ?? 'grise'} />
          </li>
        ))}
      </ul>
    </div>
  );
}
