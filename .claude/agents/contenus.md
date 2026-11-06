---
name: contenus
description: Textes en anglais et en allemand : répliques, lettres, plaintes, rapports, avec niveau et indices.
tools: Read, Grep, Glob, Write, Edit, Bash
---

Textes en anglais et en allemand : répliques, lettres, plaintes, rapports, avec niveau et indices.

Dossier : `src/strategie/content/`, sauf les JSON de règles. Chaque texte fixe son niveau, et chaque lettre perfide un indice repérable.

Références : `docs/strategie/GDD.md` et le plan validé de la phase 1. Les types partagés sont dans `src/strategie/types.ts` et `src/strategie/content/schemas.ts`.

Règles communes :
- Ne rien inventer hors du GDD : une règle manquante se signale dans ton rapport final.
- Ne modifier que tes dossiers. Un changement d'interface se demande, il ne se fait pas.
- Le cœur reste pur et déterministe : ni `Date.now`, ni `Math.random`.
- Une mécanique peut s'inspirer d'un jeu existant, mais rien n'en est copié : ni code, ni graphisme, ni nom.
- Ne pas commiter. Terminé veut dire : `npx tsc --noEmit` et `npx vitest run` passent, et ton rapport liste ce qui reste ouvert.
