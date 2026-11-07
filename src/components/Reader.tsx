import { useEffect, useMemo, useRef, useState, type Dispatch, type SetStateAction } from 'react';
import { playFile, stopAudio } from '../lib/audio';
import {
  loadPassage,
  wordsBeforeReading,
  wordsToReview,
  type GlossaryWord,
  type LibraryIndex,
  type PassageBody,
  type PassageMeta,
  type WordEvidence,
} from '../lib/library';
import { shuffle } from '../lib/random';
import { recordReview, type Progress } from '../lib/progress';
import type { Course } from '../types';

const FONT_SIZES = [16, 18, 20, 23, 26];

interface Props {
  course: Course;
  meta: PassageMeta;
  index: LibraryIndex;
  rankLimit: number;
  evidence: WordEvidence;
  setProgress: Dispatch<SetStateAction<Progress>>;
  onExit: () => void;
}

type Step = 'before' | 'text' | 'questions' | 'done';

function Credit({ meta }: { meta: PassageMeta }) {
  return (
    <p className="credits">
      {meta.author},{' '}
      <a href={meta.url} target="_blank" rel="noopener noreferrer">{meta.work === meta.title ? meta.work : `${meta.title} (${meta.work})`}</a>. Licence : {meta.license}. Récupéré le{' '}
      {meta.retrieved}.
    </p>
  );
}

export function Reader({ course, meta, index, rankLimit, evidence, setProgress, onExit }: Props) {
  const [body, setBody] = useState<PassageBody | null>(null);
  // Chosen once, when the text arrives: the reviews it starts must not change the list on screen.
  const [before, setBefore] = useState<GlossaryWord[]>([]);
  const [joined, setJoined] = useState(0);
  const [failed, setFailed] = useState(false);
  const [step, setStep] = useState<Step>('before');
  const [fontSize, setFontSize] = useState(1);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [correct, setCorrect] = useState(0);
  const [hasAudio, setHasAudio] = useState(false);
  const started = useRef(0);
  const readingMs = useRef(0);

  useEffect(() => {
    let live = true;
    loadPassage(course.id, meta.id).then(
      (loaded) => {
        if (!live) return;
        setBefore(wordsBeforeReading(loaded.glossary, index, rankLimit, evidence));
        setBody(loaded);
      },
      () => live && setFailed(true),
    );
    return () => {
      live = false;
      stopAudio();
    };
    // The list of words is fixed at load time on purpose; later changes of the evidence must not redo it.
  }, [course.id, meta.id]);

  useEffect(() => {
    const audio = new Audio(`${import.meta.env.BASE_URL}library/${course.id}/audio/${meta.id}.mp3`);
    const yes = () => setHasAudio(true);
    audio.addEventListener('loadedmetadata', yes);
    audio.preload = 'metadata';
    return () => {
      audio.removeEventListener('loadedmetadata', yes);
      audio.removeAttribute('src');
      audio.load();
    };
  }, [course.id, meta.id]);

  const options = useMemo(
    () => (body ? body.questions.map((question) => shuffle([question.answer, ...question.wrong])) : []),
    [body],
  );

  if (failed) {
    return (
      <div className="home">
        <p className="notice">Ce texte n'a pas pu se charger.</p>
        <button className="primary" onClick={onExit}>
          Retour
        </button>
      </div>
    );
  }
  if (!body) return <p className="notice">Chargement…</p>;

  const question = body.questions[questionIndex];

  const finish = (right: number) => {
    setProgress((progress) => {
      const { added, itemIds } = wordsToReview(before, meta.id, course, progress.memory);
      setJoined(itemIds.length);
      // A word seen in a text starts weak, so that the first review tests it soon.
      const reviewed = recordReview(progress, itemIds, 'again', Date.now());
      return {
        ...reviewed,
        readingWords: { ...reviewed.readingWords, [course.id]: [...(reviewed.readingWords[course.id] ?? []), ...added] },
        readings: [
          ...reviewed.readings,
          {
            passageId: meta.id,
            courseId: course.id,
            level: meta.level,
            theme: meta.theme,
            words: meta.words,
            readingMs: readingMs.current,
            correct: right,
            questions: body.questions.length,
            finishedAt: Date.now(),
          },
        ],
      };
    });
    setCorrect(right);
    setStep('done');
  };

  return (
    <div className="home reader">
      <button className="back" onClick={onExit}>
        Retour
      </button>
      <h1 lang={course.languageTag}>{meta.title}</h1>

      {step === 'before' && (
        <>
          {before.length > 0 ? <h2>Avant de lire : {before.length} mots à connaître</h2> : <h2>Tu peux lire directement</h2>}
          <ul className="words-before">
            {before.map((word) => (
              <li key={word.key}>
                <strong lang={course.languageTag}>
                  {word.gender ? `${word.gender} ` : ''}
                  {word.lemma}
                </strong>
                <span>{word.fr}</span>
                <small lang={course.languageTag}>{word.sentence}</small>
              </li>
            ))}
          </ul>
          <button
            className="primary"
            onClick={() => {
              started.current = Date.now();
              setStep('text');
            }}
          >
            Commencer la lecture
          </button>
        </>
      )}

      {step === 'text' && (
        <>
          <div className="reader-tools">
            <button aria-label="Texte plus petit" disabled={fontSize === 0} onClick={() => setFontSize(fontSize - 1)}>
              A−
            </button>
            <button aria-label="Texte plus grand" disabled={fontSize === FONT_SIZES.length - 1} onClick={() => setFontSize(fontSize + 1)}>
              A+
            </button>
            {hasAudio && (
              <button onClick={() => playFile(`library/${course.id}/audio/${meta.id}.mp3`)}>Écouter</button>
            )}
          </div>
          <article lang={course.languageTag} style={{ fontSize: FONT_SIZES[fontSize] }}>
            {body.paragraphs.map((paragraph, position) => (
              <p key={position}>{paragraph}</p>
            ))}
          </article>
          <Credit meta={meta} />
          <button
            className="primary"
            onClick={() => {
              stopAudio();
              readingMs.current = Date.now() - started.current;
              if (body.questions.length > 0) setStep('questions');
              else finish(0);
            }}
          >
            J'ai fini de lire
          </button>
        </>
      )}

      {step === 'questions' && question && (
        <section className="reading-question" lang={course.languageTag}>
          <h2>{question.prompt}</h2>
          {question.shown && <p className="sentence">{question.shown}</p>}
          <div className="options">
            {options[questionIndex].map((option) => (
              <button
                key={option}
                disabled={picked !== null}
                className={picked === null ? '' : option === question.answer ? 'correct' : option === picked ? 'wrong' : ''}
                onClick={() => setPicked(option)}
              >
                {option}
              </button>
            ))}
          </div>
          {picked !== null && (
            <button
              className="primary"
              onClick={() => {
                const right = correct + (picked === question.answer ? 1 : 0);
                setPicked(null);
                if (questionIndex + 1 === body.questions.length) finish(right);
                else {
                  setCorrect(right);
                  setQuestionIndex(questionIndex + 1);
                }
              }}
            >
              Continuer
            </button>
          )}
        </section>
      )}

      {step === 'done' && (
        <>
          <h2>Lecture terminée</h2>
          <p>
            {body.questions.length > 0 ? `${correct} / ${body.questions.length} bonnes réponses. ` : ''}
            {joined > 0 ? `${joined} mots rejoignent tes révisions.` : ''}
          </p>
          <Credit meta={meta} />
          <button className="primary" onClick={onExit}>
            Retour à la bibliothèque
          </button>
        </>
      )}
    </div>
  );
}
