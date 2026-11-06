import { useEffect, useState } from 'react';
import { Home } from './components/Home';
import { LessonScreen } from './components/LessonScreen';
import { courseById, lessonsOf } from './data/courses';
import { completeLesson, loadProgress, loseHeart, refillHearts, saveProgress } from './lib/progress';

export function App() {
  const [progress, setProgress] = useState(() => refillHearts(loadProgress(Date.now()), Date.now()));
  const [lessonId, setLessonId] = useState<string | null>(null);

  useEffect(() => saveProgress(progress), [progress]);

  useEffect(() => {
    const timer = setInterval(() => setProgress((p) => refillHearts(p, Date.now())), 30_000);
    return () => clearInterval(timer);
  }, []);

  const course = courseById(progress.activeCourse);
  const lesson = lessonsOf(course).find((item) => item.id === lessonId);

  if (lesson) {
    return (
      <LessonScreen
        key={lesson.id}
        course={course}
        lesson={lesson}
        hearts={progress.hearts}
        onMistake={() => setProgress((p) => loseHeart(p, Date.now()))}
        onComplete={(perfect) => {
          const result = completeLesson(progress, lesson.id, perfect, Date.now());
          setProgress(result.progress);
          return result.xpGained;
        }}
        onExit={() => setLessonId(null)}
      />
    );
  }

  return (
    <Home
      course={course}
      progress={progress}
      onStart={setLessonId}
      onSwitchCourse={(id) => setProgress((p) => ({ ...p, activeCourse: id }))}
    />
  );
}
