import { useState } from 'react';
import { tileAt } from '../map/generate';
import type { GameMap, Place } from '../types';
import { useGame } from './GameContext';
import { MapCanvas } from './MapCanvas';
import { CAMP_COLORS, cssColor, FOG_COLOR, sceneSize, TERRAIN_COLORS, tileCenter } from './mapScene';

/** The label is wide: this keeps it inside the map, whose edges are cut off. */
const clampPercent = (value: number) => Math.min(84, Math.max(16, value));

function PlainMap({ map }: { map: GameMap }) {
  return (
    <>
      <p className="st-notice">La carte dessinée n'a pas pu s'afficher sur cet appareil. Voici une version simple, et le reste du jeu fonctionne.</p>
      <div className="st-map-plain" style={{ gridTemplateColumns: `repeat(${map.size}, 1fr)` }} aria-hidden="true">
        {map.tiles.map((tile) => (
          <span
            key={`${tile.x}-${tile.y}`}
            style={{ background: cssColor(tile.explored ? TERRAIN_COLORS[tile.terrain] : FOG_COLOR) }}
          />
        ))}
      </div>
    </>
  );
}

export function MapScreen() {
  const { state } = useGame();
  const { map } = state;
  const [failed, setFailed] = useState(false);
  const [selected, setSelected] = useState<Place | null>(null);

  const scene = sceneSize(map.size);
  const places = [
    { place: map.colony, color: CAMP_COLORS.colony, camp: 'Ta colonie' },
    { place: map.rival, color: CAMP_COLORS.rival, camp: 'Ville rivale' },
  ];
  const explored = map.tiles.filter((tile) => tile.explored).length;
  const onMap = (place: Place) => !failed && tileAt(map, place.x, place.y)?.explored === true;

  const placeButton = (place: Place, color: number) => (
    <button
      type="button"
      className="st-place"
      style={{ borderColor: cssColor(color) }}
      lang="en"
      aria-pressed={selected === place}
      onClick={() => setSelected(place)}
    >
      {place.name}
    </button>
  );

  return (
    <section aria-labelledby="st-map-title">
      <h1 id="st-map-title">Carte</h1>
      {failed ? (
        <PlainMap map={map} />
      ) : (
        <div
          className="st-map"
          style={{ aspectRatio: `${scene.width} / ${scene.height}` }}
          role="group"
          aria-label={`Carte de la colonie : ${explored} tuiles explorées sur ${map.tiles.length}, le reste sous le brouillard`}
        >
          <MapCanvas map={map} level={state.colony.level} onFail={() => setFailed(true)} />
          {places
            .filter(({ place }) => onMap(place))
            .map(({ place, color }) => {
              const center = tileCenter(place.x, place.y, map.size);
              return (
                <div
                  key={place.name}
                  className="st-place-spot"
                  style={{
                    left: `${clampPercent((center.x / scene.width) * 100)}%`,
                    top: `${(center.y / scene.height) * 100}%`,
                  }}
                >
                  {placeButton(place, color)}
                </div>
              );
            })}
        </div>
      )}

      <ul className="st-legend">
        {places.map(({ place, color, camp }) => (
          <li key={place.name}>
            <span className="st-swatch" style={{ background: cssColor(color) }} aria-hidden="true" />
            {camp} :{' '}
            {onMap(place) ? (
              <span lang="en">{place.name}</span>
            ) : (
              placeButton(place, color)
            )}
          </li>
        ))}
        <li>
          <span className="st-swatch" style={{ background: cssColor(FOG_COLOR) }} aria-hidden="true" />
          Brouillard : terres inexplorées
        </li>
      </ul>

      {selected ? (
        <p className="st-gloss" role="status">
          <span lang="en">{selected.name}</span> : {selected.meaningFr}
        </p>
      ) : (
        <p className="st-hint">Touche le nom d'un lieu pour en connaître le sens.</p>
      )}
    </section>
  );
}
