import { useMemo } from 'react';
import { lessonsOf } from '../../data/courses';
import { buildProfile } from '../language/bridge';
import type { LexicalField } from '../content/schemas';
import type { NodeState } from '../types';
import { useGame } from './GameContext';

export const STATE_NAMES: Record<NodeState, string> = {
  grise: 'Grisé',
  en_cours: 'En cours',
  maitrise: 'Maîtrisé',
  fissure: 'Fissuré',
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

export function StateBadge({ state }: { state: NodeState }) {
  return <span className={`st-state st-state-${state}`}>{STATE_NAMES[state]}</span>;
}

export function TablesScreen() {
  const { course, progress } = useGame();
  // Fresher than the game's snapshot: a word used this season shows here at once.
  const profile = useMemo(() => buildProfile(course, progress.memory, Date.now()), [course, progress.memory]);
  const grammar = lessonsOf(course).flatMap((lesson) => (lesson.kind === 'grammar' ? [lesson] : []));

  return (
    <section aria-labelledby="st-tables-title">
      <h1 id="st-tables-title">Tableaux linguistiques</h1>
      <p className="st-hint">Ils te suivent de partie en partie, et progressent aussi avec les leçons de Filou.</p>
      <ul className="st-legend" aria-label="Les quatre états">
        {STATES.map((state) => (
          <li key={state}>
            <StateBadge state={state} />
          </li>
        ))}
      </ul>

      <h2>Vocabulaire</h2>
      {FIELDS.map((field) => {
        const words = course.bank
          .filter((word) => word.domain === field.id)
          .map((word) => ({ word, state: profile.words[`${course.id}:b:${word.target}`] ?? 'grise' }));
        return (
          <details className="st-group" key={field.id}>
            <summary>
              {field.name}
              <span className="st-counts">
                {STATES.map((state) => `${words.filter((item) => item.state === state).length} ${STATE_NAMES[state].toLowerCase()}`).join(' · ')}
              </span>
            </summary>
            <ul className="st-words">
              {words.map(({ word, state }) => (
                <li key={word.target}>
                  <span lang="en">{word.target}</span>
                  {state !== 'grise' && <span className="st-word-fr"> : {word.fr}</span>}
                  <StateBadge state={state} />
                </li>
              ))}
            </ul>
          </details>
        );
      })}

      <h2>Grammaire</h2>
      <ul className="st-words">
        {grammar.map((lesson) => (
          <li key={lesson.id}>
            <span>
              {lesson.title} <span className="st-hint">({lesson.level})</span>
            </span>
            <StateBadge state={profile.rules[lesson.id] ?? 'grise'} />
          </li>
        ))}
      </ul>
    </section>
  );
}
