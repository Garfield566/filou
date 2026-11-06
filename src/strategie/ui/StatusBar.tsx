import { gameRules } from '../content';
import { globalLoyalty, RESOURCES } from '../core/economy';
import type { GameState, PopulationGroup, Resource } from '../types';

const RESOURCE_NAMES: Record<Resource, string> = {
  ble: 'Blé',
  poisson: 'Poisson',
  laine: 'Laine',
  bois: 'Bois',
  sel: 'Sel',
  argent: 'Argent',
};

const GROUP_NAMES: Record<PopulationGroup, string> = { paysans: 'Paysans', marchands: 'Marchands', clerge: 'Clergé' };
const GROUPS = Object.keys(GROUP_NAMES) as PopulationGroup[];

export const LEVEL_NAMES = { hameau: 'Hameau', village: 'Village' } as const;

export function StatusBar({ state }: { state: GameState }) {
  const { colony } = state;
  return (
    <header className="st-bar">
      <dl className="st-bar-row st-bar-main">
        <div>
          <dt>Saison</dt>
          <dd>
            {state.season} / {gameRules.balance.seasons}
          </dd>
        </div>
        <div>
          <dt>{LEVEL_NAMES[colony.level]}</dt>
          <dd className="sr-only">niveau de la colonie</dd>
        </div>
        <div className={colony.deniers < 0 ? 'st-danger' : ''}>
          <dt>Deniers</dt>
          <dd>{colony.deniers}</dd>
        </div>
        <div>
          <dt>Dico</dt>
          <dd>{state.dictionaryLeft}</dd>
        </div>
        <div>
          <dt>Loyauté</dt>
          <dd>{Math.round(globalLoyalty(colony))}</dd>
        </div>
      </dl>
      <dl className="st-bar-row" aria-label="Stocks">
        {RESOURCES.map((resource) => (
          <div key={resource}>
            <dt>{RESOURCE_NAMES[resource]}</dt>
            <dd>{colony.stocks[resource]}</dd>
          </div>
        ))}
      </dl>
      <dl className="st-bar-row" aria-label="Loyauté par groupe">
        {GROUPS.map((group) => (
          <div key={group}>
            <dt>{GROUP_NAMES[group]}</dt>
            <dd>{colony.groups[group].loyalty}</dd>
          </div>
        ))}
      </dl>
    </header>
  );
}
