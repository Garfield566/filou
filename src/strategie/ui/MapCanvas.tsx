import { useEffect, useRef, useState } from 'react';
import type { Application, Graphics } from 'pixi.js';
import type { ColonyLevel, GameMap } from '../types';
import { mapScene, sceneSize } from './mapScene';

interface Props {
  map: GameMap;
  level: ColonyLevel;
  /** WebGL or the library is missing: the screen shows its plain version instead. */
  onFail: () => void;
}

interface Stage {
  app: Application;
  graphics: Graphics;
}

function draw({ app, graphics }: Stage, map: GameMap, level: ColonyLevel): void {
  graphics.clear();
  for (const shape of mapScene(map, level)) {
    if (shape.kind === 'poly') graphics.poly(shape.points, true).fill(shape.color);
    else graphics.circle(shape.x, shape.y, shape.radius).fill(shape.color);
  }
  app.render();
}

function destroy(app: Application): void {
  try {
    app.destroy(true, { children: true });
  } catch {
    // Pixi may already have lost its context: there is nothing left to free.
  }
}

/** A still picture: nothing moves on the map, so the ticker stays off. */
export function MapCanvas({ map, level, onFail }: Props) {
  const host = useRef<HTMLDivElement>(null);
  const stage = useRef<Stage | null>(null);
  const latest = useRef({ map, level, onFail });
  latest.current = { map, level, onFail };
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let mounted: Application | null = null;
    const lost = () => latest.current.onFail();

    const start = async () => {
      try {
        const pixi = await import('pixi.js');
        if (cancelled) return;
        const app = new pixi.Application();
        await app.init({
          ...sceneSize(latest.current.map.size),
          preference: 'webgl',
          backgroundAlpha: 0,
          antialias: true,
          autoStart: false,
          preserveDrawingBuffer: true,
          resolution: Math.min(window.devicePixelRatio || 1, 2),
        });
        if (cancelled || !host.current) {
          destroy(app);
          return;
        }
        mounted = app;
        app.canvas.removeAttribute('style');
        app.canvas.addEventListener('webglcontextlost', lost);
        host.current.appendChild(app.canvas);
        const graphics = new pixi.Graphics();
        app.stage.addChild(graphics);
        stage.current = { app, graphics };
        draw(stage.current, latest.current.map, latest.current.level);
        setReady(true);
      } catch {
        if (!cancelled) latest.current.onFail();
      }
    };
    void start();

    return () => {
      cancelled = true;
      stage.current = null;
      if (mounted) {
        mounted.canvas.removeEventListener('webglcontextlost', lost);
        destroy(mounted);
      }
    };
  }, []);

  useEffect(() => {
    if (!stage.current) return;
    try {
      draw(stage.current, map, level);
    } catch {
      latest.current.onFail();
    }
  }, [map, level]);

  return (
    <div className="st-map-canvas" ref={host}>
      {!ready && <p className="st-map-loading">Chargement de la carte…</p>}
    </div>
  );
}
