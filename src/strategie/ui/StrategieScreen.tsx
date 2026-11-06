import { useCallback, useEffect, useMemo, useRef, useState, type ChangeEvent } from 'react';
import { stopAudio } from '../../lib/audio';
import type { Progress } from '../../lib/progress';
import { itemsOfCourse } from '../../lib/session';
import type { Course } from '../../types';
import { gameRules } from '../content';
import { applyAction, createGame } from '../core/game';
import { buildProfile, sendLanguageEvents } from '../language/bridge';
import type { GameAction, GameState, SeasonPhase, VillageReward } from '../types';
import { AudienceScreen } from './AudienceScreen';
import { BilanScreen } from './BilanScreen';
import { CouncilScreen } from './CouncilScreen';
import { GameProvider, useGame, type GameView } from './GameContext';
import { MailScreen } from './MailScreen';
import { MapScreen } from './MapScreen';
import { trackEvents } from './notions';
import type { OrderNote } from './orders';
import { ReportsScreen } from './ReportsScreen';
import { downloadSave, parseSave, readSave, SAVE_VERSION, writeSave, type SaveFile } from './save';
import { LEVEL_NAMES, StatusBar } from './StatusBar';
import { TablesScreen } from './TablesScreen';
import { TechnologiesScreen } from './TechnologiesScreen';
import './strategie.css';

export interface StrategieProps {
  course: Course;
  progress: Progress;
  setProgress: (update: (progress: Progress) => Progress) => void;
  onExit: () => void;
}

type Tab = 'saison' | 'carte' | 'technologies' | 'tableaux' | 'partie';

const TABS: { id: Tab; label: string }[] = [
  { id: 'saison', label: 'Saison' },
  { id: 'carte', label: 'Carte' },
  { id: 'technologies', label: 'Technos' },
  { id: 'tableaux', label: 'Tableaux' },
  { id: 'partie', label: 'Partie' },
];

const STEPS: { phase: SeasonPhase; label: string }[] = [
  { phase: 'rapports', label: 'Rapports' },
  { phase: 'audience', label: 'Audience' },
  { phase: 'conseil', label: 'Conseil' },
  { phase: 'courrier', label: 'Courrier' },
];

const MAX_SEED = 0xffffffff;
const CONFIRM_NEW_GAME = 'Commencer une nouvelle partie ? Seuls tes tableaux linguistiques seront gardés.';

function Credits() {
  return (
    <p className="credits">
      Mots fréquents du mode Stratégie : <a href="https://github.com/rspeer/wordfreq">wordfreq</a> (données CC BY-SA 4.0).
    </p>
  );
}

function ImportButton({ onImport }: { onImport: (save: SaveFile) => void }) {
  const input = useRef<HTMLInputElement>(null);
  const [failed, setFailed] = useState(false);

  const read = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    const save = parseSave(await file.text().catch(() => ''));
    setFailed(save === null);
    if (save) onImport(save);
  };

  return (
    <>
      <button type="button" className="st-button" onClick={() => input.current?.click()}>
        Importer une sauvegarde
      </button>
      <input ref={input} type="file" accept="application/json,.json" hidden onChange={read} />
      {failed && (
        <p className="st-bad" role="status">
          Ce fichier n'est pas une sauvegarde lisible.
        </p>
      )}
    </>
  );
}

function RewardChoice() {
  const { state, act } = useGame();
  const { rewards } = gameRules.balance;
  if (!state.colony.pendingReward) return null;
  const choose = (reward: VillageReward) => act({ type: 'chooseReward', reward });
  return (
    <article className="st-card st-reward">
      <h2>{LEVEL_NAMES[state.colony.level]} : choisis ta récompense</h2>
      <button type="button" className="st-button st-option" onClick={() => choose('marche')}>
        Marché : +{rewards.marcheDeniers} deniers par saison
      </button>
      <button type="button" className="st-button st-option" onClick={() => choose('palissade')}>
        Palissade : +{rewards.palissadeDefense} de défense
      </button>
    </article>
  );
}

function SeasonScreen({ onNewGame }: { onNewGame: () => void }) {
  const { state, act } = useGame();
  const next = () => act({ type: 'nextPhase' });

  if (state.phase === 'bilan') return <BilanScreen onNewGame={onNewGame} />;
  return (
    <>
      <ol className="st-steps" aria-label="Étapes de la saison">
        {STEPS.map((step) => (
          <li key={step.phase} aria-current={step.phase === state.phase ? 'step' : undefined}>
            {step.label}
          </li>
        ))}
      </ol>
      <RewardChoice />
      {state.phase === 'rapports' && <ReportsScreen onNext={next} />}
      {state.phase === 'audience' && <AudienceScreen onNext={next} />}
      {state.phase === 'conseil' && <CouncilScreen onNext={next} />}
      {state.phase === 'courrier' && <MailScreen onEnd={() => act({ type: 'endSeason' })} />}
    </>
  );
}

interface PartyProps {
  save: SaveFile;
  saveFailed: boolean;
  onImport: (save: SaveFile) => void;
  onNewGame: () => void;
  onExit: () => void;
}

function PartyScreen({ save, saveFailed, onImport, onNewGame, onExit }: PartyProps) {
  const [exportFailed, setExportFailed] = useState(false);
  return (
    <section aria-labelledby="st-party-title">
      <h1 id="st-party-title">Partie</h1>
      <p>Graine de la carte : {save.state.seed}</p>
      <p className="st-hint">La sauvegarde reste à part : tes tableaux linguistiques vivent dans Filou et ne la suivent pas.</p>
      {saveFailed && (
        <p className="st-notice" role="status">
          Sauvegarde automatique impossible sur cet appareil. Exporte ta partie pour la garder.
        </p>
      )}
      <div className="st-stack">
        <button type="button" className="st-button" onClick={() => setExportFailed(!downloadSave(save))}>
          Exporter la partie
        </button>
        {exportFailed && (
          <p className="st-bad" role="status">
            L'export a échoué.
          </p>
        )}
        <ImportButton onImport={onImport} />
        <button
          type="button"
          className="st-button"
          onClick={() => {
            if (window.confirm(CONFIRM_NEW_GAME)) onNewGame();
          }}
        >
          Nouvelle partie
        </button>
        <button type="button" className="st-button" onClick={onExit}>
          Retour à Filou
        </button>
      </div>
      <Credits />
    </section>
  );
}

interface LandingProps {
  saved: SaveFile | null;
  loading: boolean;
  onResume: (save: SaveFile) => void;
  onNewGame: () => void;
  onExit: () => void;
}

function Landing({ saved, loading, onResume, onNewGame, onExit }: LandingProps) {
  return (
    <main className="st-screen st-landing">
      <h1>Mode Stratégie</h1>
      <p>
        Tu es un émissaire français à la tête d'une colonie anglaise, vers 1300. Ici, la langue est l'interface : les mots que tu ne
        connais pas sont des taches d'encre, et tes ordres, tes lettres et tes jugements passent par l'anglais.
      </p>
      <p className="st-hint">Chaque partie repart de zéro. Seuls tes tableaux linguistiques continuent de progresser.</p>
      {loading ? (
        <p>Recherche d'une partie en cours…</p>
      ) : (
        <div className="st-stack">
          {saved && (
            <button type="button" className="primary" onClick={() => onResume(saved)}>
              Reprendre la partie (saison {saved.state.season})
            </button>
          )}
          <button
            type="button"
            className={saved ? 'st-button' : 'primary'}
            onClick={() => {
              if (!saved || window.confirm(CONFIRM_NEW_GAME)) onNewGame();
            }}
          >
            Nouvelle partie
          </button>
          <ImportButton onImport={onResume} />
          <button type="button" className="st-button" onClick={onExit}>
            Retour à Filou
          </button>
        </div>
      )}
      <Credits />
    </main>
  );
}

export function StrategieScreen({ course, progress, setProgress, onExit }: StrategieProps) {
  const [session, setSession] = useState<SaveFile | null>(null);
  const [saved, setSaved] = useState<SaveFile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saveFailed, setSaveFailed] = useState(false);
  const [tab, setTab] = useState<Tab>('saison');
  const main = useRef<HTMLElement>(null);

  // The handlers need the latest values at once, not those of the last render.
  const sessionRef = useRef<SaveFile | null>(null);
  const progressRef = useRef(progress);
  progressRef.current = progress;

  useEffect(() => {
    let cancelled = false;
    void readSave().then((found) => {
      if (cancelled) return;
      setSaved(found);
      setLoading(false);
    });
    return () => {
      cancelled = true;
      stopAudio();
    };
  }, []);

  useEffect(() => {
    if (!session) return;
    let cancelled = false;
    void writeSave(session).then((written) => {
      if (!cancelled) setSaveFailed(!written);
    });
    return () => {
      cancelled = true;
    };
  }, [session]);

  const profileNow = useCallback(() => buildProfile(course, progressRef.current.memory, Date.now()), [course]);

  /** Opens the season that is waiting, so that its reports read against today's tables. */
  const opened = useCallback(
    (state: GameState): GameState =>
      state.phase === 'rapports' && !state.seasonStarted && !state.outcome
        ? applyAction(state, { type: 'startSeason', profile: profileNow() }, gameRules)
        : state,
    [profileNow],
  );

  /** The one way a new state comes in: the season opens, Filou gets the events, and the page follows. */
  const commit = useCallback(
    (save: SaveFile) => {
      const state = opened(save.state);
      const now = Date.now();
      const events = state.languageEvents;
      const sent = sendLanguageEvents(course, progressRef.current, state, gameRules, now).state;
      if (events.length > 0) setProgress((current) => sendLanguageEvents(course, current, state, gameRules, now).progress);
      const next = { ...save, state: sent, touched: trackEvents(save.touched, events, state.profile) };
      sessionRef.current = next;
      setSession(next);
    },
    [course, opened, setProgress],
  );

  const act = useCallback(
    (action: GameAction, note?: OrderNote) => {
      const current = sessionRef.current;
      if (!current) return false;
      const state = applyAction(current.state, action, gameRules);
      if (state === current.state) return false;
      commit({ ...current, state, orderNotes: note ? [...current.orderNotes, note] : current.orderNotes });
      return true;
    },
    [commit],
  );

  const newGame = useCallback(() => {
    const seed = Math.floor(Math.random() * MAX_SEED);
    commit({ version: SAVE_VERSION, state: createGame(seed, profileNow(), gameRules), orderNotes: [], touched: {} });
    setTab('saison');
  }, [commit, profileNow]);

  const adopt = useCallback(
    (save: SaveFile) => {
      commit(save);
      setTab('saison');
    },
    [commit],
  );

  const words = useMemo(() => new Map(itemsOfCourse(course).map((item) => [item.id, item])), [course]);
  const view = useMemo<GameView | null>(
    () =>
      session && {
        state: session.state,
        orderNotes: session.orderNotes,
        touched: session.touched,
        progress,
        course,
        act,
        wordInfo: (id) => words.get(id),
      },
    [session, progress, course, act, words],
  );

  const place = `${tab}-${session?.state.phase}-${session?.state.season}`;
  useEffect(() => {
    window.scrollTo(0, 0);
    main.current?.focus({ preventScroll: true });
  }, [place]);

  if (!session || !view) {
    return <Landing saved={saved} loading={loading} onResume={adopt} onNewGame={newGame} onExit={onExit} />;
  }

  return (
    <GameProvider value={view}>
      <div className="st-screen">
        <StatusBar state={session.state} />
        <nav className="st-tabs" aria-label="Écrans du mode Stratégie">
          {TABS.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-current={tab === item.id ? 'page' : undefined}
              onClick={() => setTab(item.id)}
            >
              {item.id === 'saison' && session.state.outcome ? 'Bilan' : item.label}
            </button>
          ))}
        </nav>
        <main ref={main} tabIndex={-1} className="st-main">
          {tab === 'saison' && <SeasonScreen onNewGame={newGame} />}
          {tab === 'carte' && <MapScreen />}
          {tab === 'technologies' && <TechnologiesScreen />}
          {tab === 'tableaux' && <TablesScreen />}
          {tab === 'partie' && (
            <PartyScreen save={session} saveFailed={saveFailed} onImport={adopt} onNewGame={newGame} onExit={onExit} />
          )}
        </main>
      </div>
    </GameProvider>
  );
}
