import { useEffect, useMemo, useState } from 'react';
import { Backup } from './components/Backup';
import { Home } from './components/Home';
import { Library } from './components/Library';
import { ProgressTables } from './components/ProgressTables';
import { Reference, type ReferenceTab } from './components/Reference';
import { SessionScreen } from './components/SessionScreen';
import { courseById } from './data/courses';
import { stopAudio } from './lib/audio';
import {
  MAX_HEARTS,
  completeSession,
  initialProgress,
  loadProgress,
  recordAnswer,
  refillHearts,
  saveProgress,
} from './lib/progress';
import { buildConjugationDrill } from './lib/conjugation';
import { withReadingWords } from './lib/library';
import { buildLesson, buildReview } from './lib/session';
import { buildVerbReview, buildVerbSession } from './lib/verbs';
import { buildUsageSession } from './lib/usages';
import { buildVerbLesson } from './lib/verbPath';
import { buildBankSession } from './lib/wordBank';
import type { Exercise } from './types';

interface ActiveSession {
  id: number;
  lessonId: string | null;
  steps: Exercise[];
}

export function App() {
  const [progress, setProgress] = useState(() => refillHearts(loadProgress(Date.now()), Date.now()));
  const [session, setSession] = useState<ActiveSession | null>(null);
  const [showReference, setShowReference] = useState(false);
  const [referenceTab, setReferenceTab] = useState<ReferenceTab>('rules');
  const [showTables, setShowTables] = useState(false);
  const [showLibrary, setShowLibrary] = useState(false);
  const [showBackup, setShowBackup] = useState(false);

  useEffect(() => saveProgress(progress), [progress]);

  useEffect(() => {
    const timer = setInterval(() => setProgress((p) => refillHearts(p, Date.now())), 30_000);
    return () => clearInterval(timer);
  }, []);

  const readingWords = progress.readingWords[progress.activeCourse];
  const course = useMemo(() => withReadingWords(courseById(progress.activeCourse), readingWords), [progress.activeCourse, readingWords]);
  const hiddenSentences = new Set(progress.hiddenSentences);

  const startLesson = (lessonId: string) => {
    const unit = course.units.find((item) => item.lessons.some((lesson) => lesson.id === lessonId));
    const lesson = unit?.lessons.find((item) => item.id === lessonId);
    if (!unit || !lesson) return;
    const done = progress.completedLessons.includes(lessonId);
    const steps = buildLesson(course, unit, lesson, done, progress.memory, Date.now(), Math.random, hiddenSentences);
    setSession({ id: Date.now(), lessonId, steps });
  };

  const startReview = () => {
    setSession({ id: Date.now(), lessonId: null, steps: buildReview(course, progress.memory, Date.now(), Math.random, hiddenSentences) });
  };

  const startBank = () => {
    setSession({ id: Date.now(), lessonId: null, steps: buildBankSession(course, progress.memory, hiddenSentences, Date.now()) });
  };

  const startUsages = () => {
    setSession({ id: Date.now(), lessonId: null, steps: buildUsageSession(course, progress.memory, Date.now()) });
  };

  const startVerbLesson = (lessonId: string) => {
    setSession({ id: Date.now(), lessonId, steps: buildVerbLesson(course, lessonId) });
  };

  const startDrill = (tenseId: string) => {
    setSession({ id: Date.now(), lessonId: null, steps: buildConjugationDrill(course, tenseId) });
  };

  const startVerbs = (familyId: string) => {
    setSession({ id: Date.now(), lessonId: null, steps: buildVerbSession(course, familyId, progress.memory, Date.now()) });
  };

  const startVerbReview = () => {
    setSession({ id: Date.now(), lessonId: null, steps: buildVerbReview(course, progress.memory, Date.now()) });
  };

  if (showBackup) {
    return <Backup progress={progress} setProgress={setProgress} onBack={() => setShowBackup(false)} />;
  }

  if (showLibrary) {
    return <Library course={course} progress={progress} setProgress={setProgress} onBack={() => setShowLibrary(false)} />;
  }

  if (showTables) {
    return <ProgressTables course={course} progress={progress} onBack={() => setShowTables(false)} />;
  }

  if (session) {
    return (
      <SessionScreen
        key={session.id}
        course={course}
        steps={session.steps}
        hearts={progress.testMode ? MAX_HEARTS : progress.hearts}
        onAnswer={(itemIds, correct) => setProgress((p) => recordAnswer(p, itemIds, correct, Date.now()))}
        onComplete={(perfect) => {
          const result = completeSession(progress, session.lessonId, perfect, Date.now());
          setProgress(result.progress);
          return result.xpGained;
        }}
        onHideSentence={(id) => setProgress((p) => ({ ...p, hiddenSentences: [...p.hiddenSentences, id] }))}
        onExit={() => {
          stopAudio();
          setSession(null);
        }}
      />
    );
  }

  if (showReference) {
    return (
      <Reference
        course={course}
        progress={progress}
        tab={referenceTab}
        onTabChange={setReferenceTab}
        onPractice={startLesson}
        onDrill={startDrill}
        onLearnVerbs={startVerbs}
        onReviewVerbs={startVerbReview}
        onBack={() => setShowReference(false)}
      />
    );
  }

  return (
    <Home
      course={course}
      progress={progress}
      onStart={startLesson}
      onReview={startReview}
      onBank={startBank}
      onUsages={startUsages}
      onStartVerbLesson={startVerbLesson}
      onReviewVerbs={startVerbReview}
      onOpenReference={() => setShowReference(true)}
      onOpenTables={() => setShowTables(true)}
      onOpenLibrary={() => setShowLibrary(true)}
      onOpenBackup={() => setShowBackup(true)}
      onToggleTestMode={() => setProgress((p) => ({ ...p, testMode: !p.testMode }))}
      onReset={() => setProgress((p) => ({ ...initialProgress(Date.now()), activeCourse: p.activeCourse, testMode: p.testMode }))}
      onSwitchCourse={(id) => setProgress((p) => ({ ...p, activeCourse: id }))}
    />
  );
}
