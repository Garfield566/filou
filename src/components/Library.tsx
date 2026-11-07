import { useEffect, useMemo, useState, type Dispatch, type SetStateAction } from 'react';
import {
  DAILY_MAX,
  DAILY_MIN,
  dailyReading,
  dailyRng,
  estimateRank,
  knownShare,
  loadIndex,
  loadRankTest,
  readingStats,
  reviewedWords,
  type LibraryIndex,
  type PassageMeta,
  type RankTestItem,
} from '../lib/library';
import { dayKey, type Progress } from '../lib/progress';
import type { Course } from '../types';
import { Reader } from './Reader';

const THEMES: Record<string, string> = {
  contes: 'Contes et fables',
  jeunesse: 'Jeunesse',
  nouvelles: 'Nouvelles',
  romans: 'Romans',
  theatre: 'Théâtre',
  poesie: 'Poésie',
  essais: 'Essais',
};
const LEVELS = ['A2', 'B1', 'B2', 'C1', 'C2'];
const LENGTHS: Record<string, [number, number]> = { court: [0, 400], moyen: [400, 600], long: [600, 1000] };
const percent = (share: number) => `${Math.round(share * 100)} %`;

interface Props {
  course: Course;
  progress: Progress;
  setProgress: Dispatch<SetStateAction<Progress>>;
  onBack: () => void;
}

function RankTest({ course, onDone }: { course: Course; onDone: (rank: number) => void }) {
  const [items, setItems] = useState<RankTestItem[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [position, setPosition] = useState(0);
  const [known, setKnown] = useState<Set<string>>(new Set());

  useEffect(() => {
    loadRankTest(course.id).then(setItems, () => setFailed(true));
  }, [course.id]);

  if (failed) return <p className="notice">Le test n'a pas pu se charger.</p>;
  if (!items) return <p className="notice">Chargement…</p>;

  const answer = (yes: boolean) => {
    const next = new Set(known);
    if (yes) next.add(items[position].word);
    setKnown(next);
    if (position + 1 === items.length) onDone(estimateRank(items, next));
    else setPosition(position + 1);
  };

  return (
    <section className="rank-test">
      <h2>Ton vocabulaire en {course.name}</h2>
      <p>Réponds franchement : quelques mots sont inventés. Ce test sert seulement à choisir tes textes.</p>
      <p className="rank-word" lang={course.languageTag}>
        {items[position].word}
      </p>
      <div className="rank-buttons">
        <button className="primary" onClick={() => answer(true)}>
          Je connais
        </button>
        <button onClick={() => answer(false)}>Je ne connais pas</button>
      </div>
      <small>
        {position + 1} / {items.length}
      </small>
    </section>
  );
}

function PassageRow({ passage, share, read, onOpen }: { passage: PassageMeta; share: number; read: boolean; onOpen: () => void }) {
  return (
    <li>
      <button className="passage" onClick={onOpen}>
        <span>{passage.title}</span>
        <small>
          {passage.level} · {THEMES[passage.theme] ?? passage.theme} · {passage.words} mots · {percent(share)} connus
          {read ? ' · lu' : ''}
        </small>
      </button>
    </li>
  );
}

export function Library({ course, progress, setProgress, onBack }: Props) {
  const [index, setIndex] = useState<LibraryIndex | null>(null);
  const [failed, setFailed] = useState(false);
  const [open, setOpen] = useState<PassageMeta | null>(null);
  const [retest, setRetest] = useState(false);
  const [level, setLevel] = useState('');
  const [theme, setTheme] = useState('');
  const [length, setLength] = useState('');
  const [minKnown, setMinKnown] = useState(0);

  useEffect(() => {
    setIndex(null);
    setFailed(false);
    loadIndex(course.id).then(setIndex, () => setFailed(true));
  }, [course.id]);

  const rankLimit = progress.vocabularyRank[course.id];
  const evidence = useMemo(() => reviewedWords(course, progress.memory, Date.now()), [course, progress.memory]);
  const shares = useMemo(
    () => (index && rankLimit ? index.passages.map((passage) => ({ passage, share: knownShare(passage, index, rankLimit, evidence) })) : []),
    [index, rankLimit, evidence],
  );
  const own = useMemo(() => progress.readings.filter((reading) => reading.courseId === course.id), [progress.readings, course.id]);
  const today = dayKey(Date.now());
  const doneToday = own.find((reading) => dayKey(reading.finishedAt) === today);
  // The draw ignores today's reading, so the choice stays the same before and after it.
  const daily = useMemo(
    () => dailyReading(shares, doneToday ? own.filter((reading) => reading !== doneToday) : own, dailyRng(course.id, today)),
    [shares, own, doneToday, course.id, today],
  );
  const read = new Set(own.map((reading) => reading.passageId));
  const stats = readingStats(progress.readings, course.id);

  if (index && open) {
    return (
      <Reader
        key={open.id}
        course={course}
        meta={open}
        index={index}
        rankLimit={rankLimit}
        evidence={evidence}
        setProgress={setProgress}
        onExit={() => setOpen(null)}
      />
    );
  }

  const shown = shares
    .filter(({ passage }) => !level || passage.level === level)
    .filter(({ passage }) => !theme || passage.theme === theme)
    .filter(({ passage }) => !length || (passage.words >= LENGTHS[length][0] && passage.words < LENGTHS[length][1]))
    .filter(({ share }) => share * 100 >= minKnown)
    .sort((a, b) => b.share - a.share)
    .slice(0, 60);

  return (
    <div className="home library">
      <button className="back" onClick={onBack}>
        Retour
      </button>
      <h1>Bibliothèque : {course.label}</h1>
      {failed && <p className="notice">La bibliothèque n'a pas pu se charger.</p>}
      {!failed && !index && <p className="notice">Chargement…</p>}
      {index && (!rankLimit || retest) && (
        <RankTest
          course={course}
          onDone={(rank) => {
            setRetest(false);
            setProgress((p) => ({ ...p, vocabularyRank: { ...p.vocabularyRank, [course.id]: rank } }));
          }}
        />
      )}
      {index && rankLimit && !retest && (
        <>
          {doneToday && (
            <section className="daily">
              <h2>Lecture du jour</h2>
              <p>Faite. La prochaine sera proposée demain.</p>
            </section>
          )}
          {daily && !doneToday && (
            <section className="daily">
              <h2>Lecture du jour</h2>
              <p>
                {daily.inWindow
                  ? `Tu connais ${percent(daily.share)} des mots de ce texte.`
                  : `Aucun texte non lu entre ${percent(DAILY_MIN)} et ${percent(DAILY_MAX)} : voici le plus proche, à ${percent(daily.share)}.`}
              </p>
              <button className="primary" onClick={() => setOpen(daily.passage)}>
                {daily.passage.title}
              </button>
              <small>
                {daily.passage.level} · {THEMES[daily.passage.theme] ?? daily.passage.theme} · {daily.passage.words} mots
              </small>
            </section>
          )}

          <section className="reading-stats" aria-label="Statistiques de lecture">
            <span>{stats.words} mots lus</span>
            <span>{stats.wordsPerMinute ? `${stats.wordsPerMinute} mots par minute` : 'Vitesse : à venir'}</span>
            <span>{LEVELS.map((name) => `${name} : ${stats.byLevel[name] ?? 0}`).join(' · ')}</span>
          </section>

          <div className="filters">
            <label>
              Niveau
              <select value={level} onChange={(event) => setLevel(event.target.value)}>
                <option value="">Tous</option>
                {LEVELS.map((name) => (
                  <option key={name}>{name}</option>
                ))}
              </select>
            </label>
            <label>
              Thème
              <select value={theme} onChange={(event) => setTheme(event.target.value)}>
                <option value="">Tous</option>
                {Object.entries(THEMES).map(([id, name]) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Longueur
              <select value={length} onChange={(event) => setLength(event.target.value)}>
                <option value="">Toutes</option>
                <option value="court">Moins de 400 mots</option>
                <option value="moyen">400 à 600 mots</option>
                <option value="long">Plus de 600 mots</option>
              </select>
            </label>
            <label>
              Mots connus : {minKnown} % ou plus
              <input type="range" min={0} max={100} step={5} value={minKnown} onChange={(event) => setMinKnown(Number(event.target.value))} />
            </label>
          </div>

          <p className="count">
            {shown.length === 60 ? '60 premiers textes, les plus faciles pour toi' : `${shown.length} textes`}
          </p>
          <ul className="passages">
            {shown.map(({ passage, share }) => (
              <PassageRow key={passage.id} passage={passage} share={share} read={read.has(passage.id)} onOpen={() => setOpen(passage)} />
            ))}
          </ul>

          <button className="link" onClick={() => setRetest(true)}>
            Refaire le test de vocabulaire
          </button>
          <p className="credits">
            Textes : œuvres du domaine public, issues de Project Gutenberg et de Wikisource, créditées à chaque lecture. Fréquence des mots :{' '}
            <a href="https://github.com/rspeer/wordfreq">wordfreq</a> (CC BY-SA 4.0). Sens et genres :{' '}
            <a href="https://fr.wiktionary.org">Wiktionnaire</a> (CC BY-SA).
          </p>
        </>
      )}
    </div>
  );
}
