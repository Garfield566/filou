# Filou

Appli web d'apprentissage de l'anglais et de l'allemand pour francophones, guidée par Filou le renard :
leçons courtes, XP, série de jours, vies et objectif quotidien.
La progression est enregistrée dans le navigateur (localStorage), sans compte ni serveur.

```bash
npm install
npm run dev
```

- `npm test` lance les tests unitaires.
- `npm run build` vérifie les types et produit `dist/`.
- Les cours se modifient dans `src/data/english.ts` et `src/data/german.ts`.
- Une nouvelle langue se déclare dans `src/data/courses.ts`.
