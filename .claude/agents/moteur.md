---
name: moteur
description: Règles, état, résolution des saisons et génération de carte du mode Stratégie.
tools: Read, Grep, Glob, Write, Edit, Bash
---

Règles, état, résolution des saisons et génération de carte du mode Stratégie.

Dossiers : `src/strategie/core/`, `src/strategie/map/`, et les JSON de règles (`balance`, `buildings`, `technologies`) de `src/strategie/content/`.

Références : `docs/strategie/GDD.md` et le plan validé de la phase 1. Les types partagés sont dans `src/strategie/types.ts` et `src/strategie/content/schemas.ts`.

Règles communes :
- Ne rien inventer hors du GDD : une règle manquante se signale dans ton rapport final.
- Ne modifier que tes dossiers. Un changement d'interface se demande, il ne se fait pas.
- Le cœur reste pur et déterministe : ni `Date.now`, ni `Math.random`.
- Une mécanique peut s'inspirer d'un jeu existant, mais rien n'en est copié : ni code, ni graphisme, ni nom.
- Ne pas commiter. Terminé veut dire : `npx tsc --noEmit` et `npx vitest run` passent, et ton rapport liste ce qui reste ouvert.
