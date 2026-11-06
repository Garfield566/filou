import { useEffect, useMemo, useState } from 'react';
import { shuffle } from '../lib/grade';
import { speak } from '../lib/speech';
import type { Course, Exercise } from '../types';

interface Props {
  course: Course;
  exercise: Exercise;
  draft: string;
  locked: boolean;
  onDraft: (value: string) => void;
  onSubmit: () => void;
  onPairsDone: () => void;
}

export function ExerciseView({ course, exercise, draft, locked, onDraft, onSubmit, onPairsDone }: Props) {
  const languageTag = course.languageTag;
  const textAnswer = (
    <TextAnswer languageTag={languageTag} draft={draft} locked={locked} onDraft={onDraft} onSubmit={onSubmit} />
  );

  switch (exercise.kind) {
    case 'choice':
      return <Choice exercise={exercise} draft={draft} locked={locked} onDraft={onDraft} />;
    case 'arrange':
      return <Arrange exercise={exercise} locked={locked} onDraft={onDraft} />;
    case 'pairs':
      return <Pairs exercise={exercise} languageTag={languageTag} locked={locked} onDone={onPairsDone} />;
    case 'type':
      return (
        <>
          <h1>Écris en {course.name}</h1>
          <p className="sentence">{exercise.sentence}</p>
          {textAnswer}
        </>
      );
    case 'listen':
      return (
        <>
          <h1>Écris ce que tu entends</h1>
          <Listen text={exercise.text} languageTag={languageTag} />
          {textAnswer}
        </>
      );
  }
}

function Choice({
  exercise,
  draft,
  locked,
  onDraft,
}: {
  exercise: Extract<Exercise, { kind: 'choice' }>;
  draft: string;
  locked: boolean;
  onDraft: (value: string) => void;
}) {
  const options = useMemo(() => shuffle(exercise.options), [exercise]);
  return (
    <>
      <h1>{exercise.prompt}</h1>
      <div className="options">
        {options.map((option) => (
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
  exercise,
  locked,
  onDraft,
}: {
  exercise: Extract<Exercise, { kind: 'arrange' }>;
  locked: boolean;
  onDraft: (value: string) => void;
}) {
  const words = useMemo(
    () => shuffle([...exercise.answers[0].split(' '), ...exercise.distractors]),
    [exercise],
  );
  // Positions, not words, so a word that appears twice stays selectable twice.
  const [picked, setPicked] = useState<number[]>([]);

  const update = (next: number[]) => {
    setPicked(next);
    onDraft(next.map((index) => words[index]).join(' '));
  };

  return (
    <>
      <h1>Traduis cette phrase</h1>
      <p className="sentence">{exercise.sentence}</p>
      <div className="answer-line">
        {picked.map((wordIndex) => (
          <button
            key={wordIndex}
            className="word"
            disabled={locked}
            onClick={() => update(picked.filter((item) => item !== wordIndex))}
          >
            {words[wordIndex]}
          </button>
        ))}
      </div>
      <div className="word-bank">
        {words.map((word, index) => (
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

function Pairs({
  exercise,
  languageTag,
  locked,
  onDone,
}: {
  exercise: Extract<Exercise, { kind: 'pairs' }>;
  languageTag: string;
  locked: boolean;
  onDone: () => void;
}) {
  const targets = useMemo(() => shuffle(exercise.pairs.map(([target]) => target)), [exercise]);
  const french = useMemo(() => shuffle(exercise.pairs.map(([, fr]) => fr)), [exercise]);
  const [selectedTarget, setSelectedTarget] = useState<string | null>(null);
  const [selectedFrench, setSelectedFrench] = useState<string | null>(null);
  const [matched, setMatched] = useState<string[]>([]);
  const [wrong, setWrong] = useState(false);

  useEffect(() => {
    if (selectedTarget === null || selectedFrench === null) return;
    const isMatch = exercise.pairs.some(([target, fr]) => target === selectedTarget && fr === selectedFrench);
    if (isMatch) {
      const next = [...matched, selectedTarget];
      setMatched(next);
      setSelectedTarget(null);
      setSelectedFrench(null);
      if (next.length === exercise.pairs.length) onDone();
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

  const frenchMatched = (word: string) =>
    exercise.pairs.some(([target, fr]) => fr === word && matched.includes(target));

  const stateClass = (selected: boolean) => (selected ? (wrong ? ' mismatch' : ' selected') : '');

  return (
    <>
      <h1>Associe les paires</h1>
      <div className="pairs">
        <div>
          {targets.map((word) => (
            <button
              key={word}
              className={`option${stateClass(selectedTarget === word)}${matched.includes(word) ? ' matched' : ''}`}
              disabled={locked || wrong || matched.includes(word)}
              onClick={() => {
                speak(word, languageTag);
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

function Listen({ text, languageTag }: { text: string; languageTag: string }) {
  useEffect(() => speak(text, languageTag), [text, languageTag]);
  return (
    <div className="listen">
      <button className="sound" onClick={() => speak(text, languageTag)} aria-label="Réécouter">
        🔊
      </button>
      <button className="sound slow" onClick={() => speak(text, languageTag, 0.6)} aria-label="Réécouter lentement">
        🐢
      </button>
    </div>
  );
}

function TextAnswer({
  languageTag,
  draft,
  locked,
  onDraft,
  onSubmit,
}: {
  languageTag: string;
  draft: string;
  locked: boolean;
  onDraft: (value: string) => void;
  onSubmit: () => void;
}) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (!locked) onSubmit();
      }}
    >
      <textarea
        className="text-answer"
        rows={3}
        autoFocus
        readOnly={locked}
        lang={languageTag}
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
    </form>
  );
}
