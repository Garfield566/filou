import { useMemo, useState } from 'react';
import { lessonsOf } from '../../data/courses';
import { gameRules, npcs as npcTemplates, orders } from '../content';
import type { OrderTemplate } from '../content/schemas';
import { ruleItemIds } from '../language/bridge';
import type { Npc, Trait } from '../types';
import { useGame } from './GameContext';
import { MaskedText } from './MaskedText';
import { assemblyBank, orderFromAssembly, orderFromOption, orderMode, ruleIsWeak, type BankBlock, type PreparedOrder } from './orders';
import { stableShuffle } from './text';

const TRAIT_NAMES: Record<Trait, string> = {
  loyal: 'loyal',
  ambitieux: 'ambitieux',
  cupide: 'cupide',
  pieux: 'pieux',
  orgueilleux: 'orgueilleux',
  prudent: 'prudent',
  maladroit: 'maladroit',
  ruse: 'rusé',
};

const GOODS: Record<string, string> = { laine: 'Laine', sel: 'Sel' };

function Pawn({ color }: { color: string }) {
  return (
    <svg className="st-pawn" viewBox="0 0 40 48" aria-hidden="true">
      <circle cx="20" cy="12" r="10" fill={color} />
      <path d="M20 18 L35 46 H5 Z" fill={color} />
    </svg>
  );
}

function groupLabel(objet: string | null): string {
  const building = gameRules.buildings.find((candidate) => candidate.id === objet);
  if (building) return `${building.name} · ${building.cost} deniers`;
  return (objet && GOODS[objet]) ?? 'Autres ordres';
}

function ChooseOrder({ template, onGive }: { template: OrderTemplate; onGive: (order: PreparedOrder) => void }) {
  const { state } = useGame();
  const options = useMemo(() => stableShuffle(template.options, `${state.seed}:${template.id}`), [template, state.seed]);
  return (
    <>
      <p className="st-hint">Choisis la bonne formulation.</p>
      {options.map((option) => (
        <div className="st-choice" key={option.text.id}>
          <MaskedText text={option.text} />
          <button type="button" className="st-button" onClick={() => onGive(orderFromOption(template, option, state.season))}>
            Donner cet ordre
          </button>
        </div>
      ))}
    </>
  );
}

function AssembleOrder({ template, onGive }: { template: OrderTemplate; onGive: (order: PreparedOrder) => void }) {
  const { state } = useGame();
  const bank = useMemo(() => assemblyBank(template), [template]);
  const [picked, setPicked] = useState<BankBlock[]>([]);

  return (
    <>
      <p className="st-hint">Assemble la phrase : certains blocs sont de trop.</p>
      <div className="st-assembly" aria-label="Ta phrase" role="group">
        {picked.length === 0 && <span className="st-hint">Touche les blocs dans l'ordre.</span>}
        {picked.map((block) => (
          <button
            key={block.key}
            type="button"
            className="st-block"
            lang="en"
            aria-label={`Retirer : ${block.text}`}
            onClick={() => setPicked(picked.filter((item) => item !== block))}
          >
            {block.text}
          </button>
        ))}
      </div>
      <div className="st-bank" aria-label="Blocs disponibles" role="group">
        {bank
          .filter((block) => !picked.includes(block))
          .map((block) => (
            <button key={block.key} type="button" className="st-block" lang="en" onClick={() => setPicked([...picked, block])}>
              {block.text}
            </button>
          ))}
      </div>
      <button
        type="button"
        className="st-button"
        disabled={picked.length === 0}
        onClick={() => onGive(orderFromAssembly(template, picked, state.season))}
      >
        Donner cet ordre
      </button>
    </>
  );
}

function OrderDesk({ template, npc, onDone }: { template: OrderTemplate; npc: Npc; onDone: () => void }) {
  const { state, act, course, progress } = useGame();
  const rule = lessonsOf(course).find((lesson) => lesson.id === template.ruleId);
  const mode = orderMode(state.profile.rules[template.ruleId], ruleIsWeak(ruleItemIds(course, template.ruleId), progress.memory));

  const give = ({ order, itemIds, ruleIds, note }: PreparedOrder) => {
    if (act({ type: 'order', order, itemIds, ruleIds }, note)) onDone();
  };

  return (
    <article className="st-card">
      <button type="button" className="st-button st-button-small" onClick={onDone}>
        Retour au conseil
      </button>
      <h2>Ordre à {npc.name}</h2>
      <p>{template.frenchIntent}</p>
      {rule && <p className="st-hint">Notion travaillée : {rule.title}</p>}
      {mode === 'choisir' ? <ChooseOrder template={template} onGive={give} /> : <AssembleOrder template={template} onGive={give} />}
    </article>
  );
}

export function CouncilScreen({ onNext }: { onNext: () => void }) {
  const { state, orderNotes } = useGame();
  const [openId, setOpenId] = useState<string | null>(null);

  const used = new Set(orderNotes.map((note) => note.templateId));
  const openTemplate = orders.find((template) => template.id === openId);
  const openNpc = state.npcs.find((npc) => npc.id === openTemplate?.npcId);

  if (openTemplate && openNpc) {
    return (
      <section aria-labelledby="st-council-title">
        <h1 id="st-council-title">Conseil</h1>
        <OrderDesk key={openTemplate.id} template={openTemplate} npc={openNpc} onDone={() => setOpenId(null)} />
      </section>
    );
  }

  const given = orderNotes.filter((note) => note.season === state.season);

  return (
    <section aria-labelledby="st-council-title">
      <h1 id="st-council-title">Conseil</h1>
      {state.npcs.map((npc) => {
        const template = npcTemplates.find((candidate) => candidate.id === npc.id);
        const open = orders.filter((order) => order.npcId === npc.id && !used.has(order.id));
        const objets = [...new Set(open.map((order) => order.objet))];
        return (
          <article className="st-card" key={npc.id}>
            <div className="st-npc">
              <Pawn color={npc.color} />
              <div>
                <h2>{npc.name}</h2>
                <p className="st-hint">
                  {npc.role} · {npc.traits.map((trait) => TRAIT_NAMES[trait]).join(', ')} · loyauté {npc.loyalty}
                </p>
              </div>
            </div>
            {template && <MaskedText text={template.description} />}
            {objets.map((objet) => (
              <details className="st-group" key={objet ?? 'autres'}>
                <summary>{groupLabel(objet)}</summary>
                {open
                  .filter((order) => order.objet === objet)
                  .map((order) => (
                    <button type="button" key={order.id} className="st-button st-option" onClick={() => setOpenId(order.id)}>
                      {order.frenchIntent}
                    </button>
                  ))}
              </details>
            ))}
            {objets.length === 0 && <p className="st-hint">Aucun ordre à lui donner.</p>}
          </article>
        );
      })}

      {given.length > 0 && (
        <>
          <h2>Ordres donnés cette saison</h2>
          <ul className="st-list">
            {given.map((note) => (
              <li key={note.templateId} lang="en">
                {note.said}
              </li>
            ))}
          </ul>
        </>
      )}

      <button type="button" className="primary st-next" onClick={onNext}>
        Passer au courrier
      </button>
    </section>
  );
}
