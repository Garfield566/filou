# Filou

Appli web d'apprentissage de l'anglais et de l'allemand pour francophones, guidée par Filou le renard.
La progression est enregistrée dans le navigateur (localStorage), sans compte ni serveur.

```bash
npm install
npm run dev
```

- `npm test` lance les tests unitaires.
- `npm run build` vérifie les types et produit `dist/`.

## Méthode

- Chaque leçon présente les mots avant de les tester, puis passe aux phrases.
- La difficulté suit la mémoire : reconnaître, puis assembler, puis écrire sans aide.
- Chaque mot et phrase a une demi-vie (`src/lib/memory.ts`). Les révisions choisissent ce qui est le plus proche de l'oubli.
- Chaque unité enchaîne vocabulaire, leçons de grammaire et dialogue, du niveau A1 au niveau B1.
- Une leçon de grammaire présente la règle et ses tableaux, puis fait pratiquer : choisir, compléter, transformer, construire. Chaque correction explique pourquoi.
- Le carnet regroupe toutes les règles, ainsi que les tableaux de conjugaison et un entraînement par temps.

## Contenu

L'anglais va de B1 à C2, l'allemand de A2 à B2.

- Composition des parcours : `src/data/courses.ts`.
- Niveaux les plus hauts : `src/data/englishAdvanced.ts` et `src/data/germanAdvanced.ts`.
- Niveaux intermédiaires : `src/data/englishGrammar.ts` et `src/data/germanGrammar.ts`.
- Bases hors parcours, gardées pour traduire les mots au toucher : `src/data/english.ts` et `src/data/german.ts`.
- Verbes conjugués : `src/data/verbs.ts`.

## Audio

Les fichiers de `public/audio` sont générés à l'avance avec [Piper](https://github.com/OHF-Voice/piper1-gpl).
Après une modification du cours, relance la génération. Seuls les textes nouveaux sont produits.

```bash
python -m venv .tools/venv
.tools/venv/Scripts/python.exe -m pip install piper-tts lameenc
.tools/venv/Scripts/python.exe -m piper.download_voices --data-dir .tools/voices de_DE-thorsten-high en_US-lessac-high
npm run audio
```

Voix utilisées :

- Allemand : `de_DE-thorsten-high`, jeu de données Thorsten-Voice sous licence CC0.
- Anglais : `en_US-lessac-high`. Sa licence (Blizzard 2013) reste à vérifier avant tout usage commercial.
