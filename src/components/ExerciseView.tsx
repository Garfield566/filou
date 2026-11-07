import { useEffect, useRef, useState } from 'react';
import { play, playSequence } from '../lib/audio';
import { glossOf } from '../lib/gloss';
import { tokenize } from '../lib/grade';
import { shuffle } from '../lib/random';
import { formLabels, spokenVerb } from '../lib/verbs';
import type { Course, DialogueLesson, Exercise, GrammarLesson, Tip, VerbFamily } from '../types';

interface Props {
  course: Course;
  step: Exercise;
  draft: string;
  locked: boolean;
  onDraft: (value: string) => void;
  onSubmit: () => void;
  onPairsDone: () => void;
}

export function ExerciseView({ course, step, draft, locked, onDraft, onSubmit, onPairsDone }: Props) {
  switch (step.kind) {
    case 'intro':
      return <Intro course={course} step={step} />;
    case 'tip':
      return (
        <>
          <p className="eyebrow">Bon à savoir</p>
          <h1>{step.tip.title}</h1>
          <TipContent course={course} tip={step.tip} />
        </>
      );
    case 'rule':
      return (
        <>
          <p className="eyebrow">Grammaire · {step.lesson.level}</p>
          <h1>{step.lesson.title}</h1>
          <RuleContent course={course} lesson={step.lesson} />
        </>
      );
    case 'verbs':
      return (
        <>
          <p className="eyebrow">Famille de verbes</p>
          <h1>{step.family.title}</h1>
          <VerbFamilyContent course={course} family={step.family} />
        </>
      );
    case 'dialogue':
      return <Dialogue course={course} lesson={step.lesson} />;
    case 'choice':
      return <Choice course={course} step={step} draft={draft} locked={locked} onDraft={onDraft} />;
    case 'pairs':
      return <Pairs course={course} step={step} locked={locked} onDone={onPairsDone} />;
    case 'arrange':
      return <Arrange course={course} step={step} locked={locked} onDraft={onDraft} />;
    case 'type':
      return (
        <>
          <h1>{step.prompt}</h1>
          {step.shown ? <p className="sentence">{step.shown}</p> : <Listen course={course} text={step.audio} autoplay={step.autoplay} />}
          <TextAnswer course={course} draft={draft} locked={locked} onDraft={onDraft} onSubmit={onSubmit} />
        </>
      );
  }
}

function Speaker({ course, text }: { course: Course; text: string }) {
  return (
    <button className="speaker" onClick={() => play(course.id, text)} aria-label={`Écouter : ${text}`}>
      🔊
    </button>
  );
}

/** Target-language text whose known words can be tapped for their translation. */
function Glossed({ course, text }: { course: Course; text: string }) {
  const [selected, setSelected] = useState<string | null>(null);
  const translation = selected ? glossOf(course, selected) : undefined;

  return (
    <span className="glossed">
      <span lang={course.languageTag}>
        {text.split(' ').map((word, index) => {
          const clean = tokenize(word)[0] ?? word;
          return (
            <span key={index}>
              {index > 0 && ' '}
              {glossOf(course, clean) ? (
                <button className="gloss-word" onClick={() => setSelected(clean)}>
                  {word}
                </button>
              ) : (
                word
              )}
            </span>
          );
        })}
      </span>
      {translation && (
        <span className="gloss-line" role="status">
          {selected} : {translation}
        </span>
      )}
    </span>
  );
}

function Intro({ course, step }: { course: Course; step: Extract<Exercise, { kind: 'intro' }> }) {
  useEffect(() => play(course.id, step.item.target), [course, step]);
  return (
    <>
      <p className="eyebrow">Nouveau mot</p>
      <div className="intro">
        <Speaker course={course} text={step.item.target} />
        <strong lang={course.languageTag}>{step.item.target}</strong>
        <span>{step.item.fr}</span>
        {step.item.word?.plural && <small lang={course.languageTag}>{step.item.word.plural}</small>}
      </div>
      {step.item.word && step.item.word.sentences.length > 0 && (
        <div className="tip-example">
          <Speaker course={course} text={step.item.word.sentences[0].text} />
          <div>
            <strong lang={course.languageTag}>{step.item.word.sentences[0].text}</strong>
            <span>{step.item.word.sentences[0].fr}</span>
          </div>
        </div>
      )}
    </>
  );
}

export function TipContent({ course, tip }: { course: Course; tip: Tip }) {
  return (
    <div className="tip">
      <ul>
        {tip.points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
      {tip.examples.map(([target, french]) => (
        <div className="tip-example" key={target}>
          <Speaker course={course} text={target} />
          <div>
            <strong lang={course.languageTag}>{target}</strong>
            <span>{french}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export function VerbFamilyContent({ course, family }: { course: Course; family: VerbFamily }) {
  return (
    <div className="tip">
      <p className="rule-intro">{family.hint}</p>
      <div className="table-scroll">
        <table className="grammar-table" lang={course.languageTag}>
          <thead>
            <tr>
              <th scope="col">Verbe</th>
              {formLabels(course).map((label) => (
                <th key={label} scope="col">
                  {label}
                </th>
              ))}
              <th scope="col">Sens</th>
              <th scope="col">Son</th>
            </tr>
          </thead>
          <tbody>
            {family.verbs.map((verb) => (
              <tr key={verb.name}>
                <th scope="row">{verb.name}</th>
                {verb.forms.map((form, index) => (
                  <td key={index}>{form}</td>
                ))}
                <td lang="fr">{verb.fr}</td>
                <td>
                  <Speaker course={course} text={spokenVerb(verb)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function RuleContent({ course, lesson }: { course: Course; lesson: GrammarLesson }) {
  return (
    <div className="tip">
      <p className="rule-intro">{lesson.intro}</p>
      <ul>
        {lesson.points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
      {lesson.tables.map((table, index) => (
        <div className="table-scroll" key={index}>
          <table className="grammar-table">
            {table.title && <caption>{table.title}</caption>}
            <thead>
              <tr>
                {table.headers.map((header) => (
                  <th key={header} scope="col">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {table.rows.map((row) => (
                <tr key={row.join('|')}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
      {lesson.examples.map(([target, french]) => (
        <div className="tip-example" key={target}>
          <Speaker course={course} text={target} />
          <div>
            <strong lang={course.languageTag}>{target}</strong>
            <span>{french}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function Dialogue({ course, lesson }: { course: Course; lesson: DialogueLesson }) {
  const [active, setActive] = useState<number | null>(null);
  const [showFrench, setShowFrench] = useState(false);

  const listen = () => {
    void playSequence(course.id, lesson.lines.map((line) => line.target), setActive).then(() => setActive(null));
  };

  return (
    <>
      <p className="eyebrow">Dialogue</p>
      <h1>{lesson.title}</h1>
      <p className="context">{lesson.context}</p>
      <div className="dialogue-actions">
        <button className="word" onClick={listen}>
          ▶ Tout écouter
        </button>
        <button className="word" aria-pressed={showFrench} onClick={() => setShowFrench((value) => !value)}>
          {showFrench ? 'Masquer le français' : 'Afficher le français'}
        </button>
      </div>
      <div className="dialogue">
        {lesson.lines.map((line, index) => (
          <div className={`line${active === index ? ' speaking' : ''}${index % 2 ? ' right' : ''}`} key={index}>
            <Speaker course={course} text={line.target} />
            <div>
              <small>{line.speaker}</small>
              <Glossed course={course} text={line.target} />
              {showFrench && <span className="line-french">{line.fr}</span>}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function Choice({
  course,
  step,
  draft,
  locked,
  onDraft,
}: {
  course: Course;
  step: Extract<Exercise, { kind: 'choice' }>;
  draft: string;
  locked: boolean;
  onDraft: (value: string) => void;
}) {
  useEffect(() => {
    if (step.shownIsTarget && step.audio) play(course.id, step.audio);
  }, [course, step]);

  return (
    <>
      <h1>{step.prompt}</h1>
      {step.shown && (
        <div className="sentence with-speaker">
          {step.shownIsTarget && step.audio && <Speaker course={course} text={step.audio} />}
          <span lang={course.languageTag}>{step.shown}</span>
        </div>
      )}
      <div className="options">
        {step.options.map((option) => (
          <button
            key={option}
            className={`option${draft === option ? ' selected' : ''}`}
            aria-pressed={draft === option}
            disabled={locked}
            onClick={() => onDraft(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </>
  );
}

function Arrange({
  course,
  step,
  locked,
  onDraft,
}: {
  course: Course;
  step: Extract<Exercise, { kind: 'arrange' }>;
  locked: boolean;
  onDraft: (value: string) => void;
}) {
  // Positions, not words, so a word that appears twice stays selectable twice.
  const [picked, setPicked] = useState<number[]>([]);

  const update = (next: number[]) => {
    setPicked(next);
    onDraft(next.map((index) => step.bank[index]).join(' '));
  };

  return (
    <>
      <h1>{step.prompt}</h1>
      {step.shown ? (
        <div className="sentence with-speaker">
          {step.shownIsTarget && <Speaker course={course} text={step.audio} />}
          {step.shownIsTarget ? <Glossed course={course} text={step.shown} /> : <span>{step.shown}</span>}
        </div>
      ) : (
        <Listen course={course} text={step.audio} autoplay={step.autoplay} />
      )}
      {step.shownIsTarget && step.autoplay && <AutoPlay course={course} text={step.audio} />}
      <div className="answer-line">
        {picked.map((wordIndex) => (
          <button
            key={wordIndex}
            className="word"
            disabled={locked}
            onClick={() => update(picked.filter((item) => item !== wordIndex))}
          >
            {step.bank[wordIndex]}
          </button>
        ))}
      </div>
      <div className="word-bank">
        {step.bank.map((word, index) => (
          <button
            key={index}
            className="word"
            disabled={locked || picked.includes(index)}
            onClick={() => update([...picked, index])}
          >
            {word}
          </button>
        ))}
      </div>
    </>
  );
}

function AutoPlay({ course, text }: { course: Course; text: string }) {
  useEffect(() => play(course.id, text), [course, text]);
  return null;
}

function Pairs({
  course,
  step,
  locked,
  onDone,
}: {
  course: Course;
  step: Extract<Exercise, { kind: 'pairs' }>;
  locked: boolean;
  onDone: () => void;
}) {
  const [targets] = useState(() => shuffle(step.pairs.map(([target]) => target)));
  const [french] = useState(() => shuffle(step.pairs.map(([, fr]) => fr)));
  const [selectedTarget, setSelectedTarget] = useState<string | null>(null);
  const [selectedFrench, setSelectedFrench] = useState<string | null>(null);
  const [matched, setMatched] = useState<string[]>([]);
  const [wrong, setWrong] = useState(false);

  useEffect(() => {
    if (selectedTarget === null || selectedFrench === null) return;
    const isMatch = step.pairs.some(([target, fr]) => target === selectedTarget && fr === selectedFrench);
    if (isMatch) {
      const next = [...matched, selectedTarget];
      setMatched(next);
      setSelectedTarget(null);
      setSelectedFrench(null);
      if (next.length === step.pairs.length) onDone();
      return;
    }
    setWrong(true);
    const timer = setTimeout(() => {
      setWrong(false);
      setSelectedTarget(null);
      setSelectedFrench(null);
    }, 500);
    return () => clearTimeout(timer);
    // Runs only when a new selection is made.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTarget, selectedFrench]);

  const frenchMatched = (word: string) => step.pairs.some(([target, fr]) => fr === word && matched.includes(target));
  const stateClass = (selected: boolean) => (selected ? (wrong ? ' mismatch' : ' selected') : '');

  return (
    <>
      <h1>Associe les paires</h1>
      <div className="pairs">
        <div>
          {targets.map((word) => (
            <button
              key={word}
              lang={course.languageTag}
              className={`option${stateClass(selectedTarget === word)}${matched.includes(word) ? ' matched' : ''}`}
              disabled={locked || wrong || matched.includes(word)}
              onClick={() => {
                play(course.id, word);
                setSelectedTarget(word);
              }}
            >
              {word}
            </button>
          ))}
        </div>
        <div>
          {french.map((word) => (
            <button
              key={word}
              className={`option${stateClass(selectedFrench === word)}${frenchMatched(word) ? ' matched' : ''}`}
              disabled={locked || wrong || frenchMatched(word)}
              onClick={() => setSelectedFrench(word)}
            >
              {word}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

function Listen({ course, text, autoplay }: { course: Course; text: string; autoplay: boolean }) {
  useEffect(() => {
    if (autoplay) play(course.id, text);
  }, [course, text, autoplay]);

  return (
    <div className="listen">
      <button className="sound" onClick={() => play(course.id, text)} aria-label="Réécouter">
        🔊
      </button>
      <button className="sound slow" onClick={() => play(course.id, text, 0.7)} aria-label="Réécouter lentement">
        🐢
      </button>
    </div>
  );
}

function TextAnswer({
  course,
  draft,
  locked,
  onDraft,
  onSubmit,
}: {
  course: Course;
  draft: string;
  locked: boolean;
  onDraft: (value: string) => void;
  onSubmit: () => void;
}) {
  const field = useRef<HTMLTextAreaElement>(null);

  const insert = (letter: string) => {
    const input = field.current;
    if (!input) return;
    const start = input.selectionStart;
    onDraft(draft.slice(0, start) + letter + draft.slice(input.selectionEnd));
    requestAnimationFrame(() => {
      input.focus();
      input.setSelectionRange(start + letter.length, start + letter.length);
    });
  };

  return (
    <>
      <textarea
        ref={field}
        className="text-answer"
        rows={3}
        autoFocus
        readOnly={locked}
        lang={course.languageTag}
        spellCheck={false}
        autoCapitalize="off"
        aria-label="Ta réponse"
        value={draft}
        onChange={(event) => onDraft(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            if (!locked) onSubmit();
          }
        }}
      />
      {course.specialKeys.length > 0 && (
        <div className="special-keys">
          {course.specialKeys.map((letter) => (
            <button key={letter} className="word" disabled={locked} onClick={() => insert(letter)}>
              {letter}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
