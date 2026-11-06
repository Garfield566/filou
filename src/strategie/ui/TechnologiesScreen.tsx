import { lessonsOf } from '../../data/courses';
import { gameRules } from '../content';
import type { TechnologyDef } from '../content/schemas';
import { canBuy, technologyCost } from '../core/technologies';
import { useGame } from './GameContext';

const BRANCHES: { id: TechnologyDef['branch']; name: string }[] = [
  { id: 'commerce', name: 'Commerce' },
  { id: 'diplomatie', name: 'Diplomatie' },
  { id: 'savoir', name: 'Savoir' },
];

const { technologyEffects: effects } = gameRules.balance;

const EFFECTS: Record<string, string> = {
  revenu: `+${effects.foireDeniers} denier par saison`,
  confiance_rivale: `+${effects.ambassadeTrust} de confiance chez la ville rivale`,
  loyaute_clerge: `+${effects.scriptoriumClergeLoyalty} de loyauté du clergé`,
  interprete: `Interprète à ${effects.interpretesCost} denier, +${effects.interpretesLoyalty} de loyauté pour lui`,
  dictionnaire: `+${effects.ecoleDictionary} consultation du dictionnaire par saison`,
  atelier_drapier: 'Débloque l’atelier du drapier',
  saline_saloir: 'Débloque la saline et le saloir',
  interception_lettres: 'Permet d’intercepter des lettres',
  mariages: 'Permet d’arranger des mariages',
};

export function TechnologiesScreen() {
  const { state, act, course } = useGame();
  const over = state.outcome !== null;
  const baseProfile = { ...state.profile, rules: {} };
  const nameOf = (id: string) => gameRules.technologies.find((tech) => tech.id === id)?.name ?? id;

  const statusOf = (tech: TechnologyDef): string => {
    if (!tech.available) return 'Phase 2';
    if (state.technologies.includes(tech.id)) return 'Acquise';
    if (tech.requires !== null && !state.technologies.includes(tech.requires)) return `Demande : ${nameOf(tech.requires)}`;
    return canBuy(state, tech, gameRules) ? 'Disponible' : 'Deniers insuffisants';
  };

  return (
    <section aria-labelledby="st-tech-title">
      <h1 id="st-tech-title">Technologies</h1>
      {BRANCHES.map((branch) => (
        <div key={branch.id}>
          <h2>{branch.name}</h2>
          {gameRules.technologies
            .filter((tech) => tech.branch === branch.id)
            .map((tech) => {
              const cost = technologyCost(tech, state.profile, gameRules.balance);
              const base = technologyCost(tech, baseProfile, gameRules.balance);
              const rule = lessonsOf(course).find((lesson) => lesson.id === tech.discountRuleId);
              return (
                <article className={`st-card st-tech${tech.available ? '' : ' st-tech-later'}`} key={tech.id}>
                  <h3>{tech.name}</h3>
                  <p>{EFFECTS[tech.effect] ?? tech.effect}</p>
                  <p>
                    {cost < base ? (
                      <>
                        Coût : <s>{base}</s> {cost} deniers (notion maîtrisée)
                      </>
                    ) : (
                      <>Coût : {cost} deniers</>
                    )}
                  </p>
                  {rule && cost === base && <p className="st-hint">Moins cher si « {rule.title} » est maîtrisé.</p>}
                  <p className="st-label">{statusOf(tech)}</p>
                  {tech.available && !state.technologies.includes(tech.id) && (
                    <button
                      type="button"
                      className="st-button"
                      disabled={over || !canBuy(state, tech, gameRules)}
                      onClick={() => act({ type: 'buyTechnology', technologyId: tech.id })}
                    >
                      Acheter
                    </button>
                  )}
                </article>
              );
            })}
        </div>
      ))}
    </section>
  );
}
