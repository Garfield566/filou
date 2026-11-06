import { createContext, useContext } from 'react';
import type { Progress } from '../../lib/progress';
import type { Course } from '../../types';
import type { GameAction, GameState } from '../types';
import type { Touched } from './notions';
import type { OrderNote } from './orders';

export interface WordInfo {
  target: string;
  fr: string;
}

export interface GameView {
  state: GameState;
  orderNotes: OrderNote[];
  touched: Touched;
  progress: Progress;
  course: Course;
  /** Applies an action; false when the rules refuse it. A note goes with an order. */
  act: (action: GameAction, note?: OrderNote) => boolean;
  wordInfo: (id: string) => WordInfo | undefined;
}

const GameContext = createContext<GameView | null>(null);

export const GameProvider = GameContext.Provider;

export function useGame(): GameView {
  const view = useContext(GameContext);
  if (!view) throw new Error('useGame hors de GameProvider');
  return view;
}
