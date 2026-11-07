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
- Textes à lire : voir « Bibliothèque de lecture » ci-dessous.

## Bibliothèque de lecture

La bibliothèque propose des extraits d'œuvres reconnues, en anglais et en allemand : contes, romans, nouvelles,
théâtre, poésie et essais. Ce sont les textes des auteurs eux-mêmes, jamais des résumés ni des articles d'encyclopédie.
Ils sont préparés à l'avance, puis rangés dans `public/library`. L'appli les lit sans connexion.

### Quelles œuvres

Les œuvres viennent de deux listes relues et validées : `docs/revue/oeuvres-en.md` et `docs/revue/oeuvres-de.md`.
Chaque œuvre y est justifiée par une liste reconnue (Modern Library, BBC Big Read, ZEIT-Bibliothek, Kanon de Reich-Ranicki,
lectures graduées Oxford Bookworms ou CIDEB, etc.).

- **Droits :** l'auteur est mort depuis plus de 70 ans. Seulement des textes écrits dans la langue d'origine, sans traduction.
- **Textes :** Project Gutenberg, par son miroir officiel `gutenberg.pglaf.org` (le site principal est réservé aux humains),
  et Wikisource pour les œuvres que Gutenberg n'a pas, ou pour un conte précis d'un grand recueil.
- **Licences :** domaine public. Les transcriptions de Wikisource sont en plus sous CC BY-SA 4.0. Les mentions de Gutenberg
  sont retirées du texte, comme sa licence le demande. Chaque lecture affiche son crédit : auteur, œuvre, lien, licence et date.
- **Extraits :** au plus 8 par livre, répartis dans tout le livre, de 300 à 800 mots, coupés entre deux paragraphes.
  Un extrait qui ne permet pas trois questions est écarté.

Sources écartées : Wikipédia et Wikinews (pas des œuvres), Klexikon (refuse les robots), Standard Ebooks
(téléchargement réservé aux membres), Deutsches Textarchiv (conditions ambiguës).

### Comment l'appli choisit un texte

1. **Test de vocabulaire.** Une fois par langue, l'appli montre une quarantaine de mots, des plus courants aux plus rares.
   On répond « je connais » ou « je ne connais pas ». Quelques faux mots sont glissés pour repérer les réponses trop optimistes.
   Le test peut être refait à tout moment.
2. **Pourcentage de mots connus.** Pour chaque texte, l'appli calcule la part des mots que tu connais.
   - Un mot vu dans les révisions compte selon ce que disent les révisions.
   - Sinon, un mot compte comme connu s'il est plus courant que ton niveau au test.
   - Les noms propres (personnes, lieux) ne sont pas comptés.
   - Les faux amis comptent comme connus seulement s'ils ont été révisés.
3. **Lecture du jour.** L'appli propose un texte non lu, dont tu connais 95 à 98 % des mots.
   Son genre est différent de celui de la lecture précédente.
   Si aucun texte n'entre dans cette fourchette, elle propose le plus proche et le signale.

La liste complète peut aussi être filtrée par langue, niveau, thème, longueur et mots connus.

### Déroulé d'une lecture

- **Avant :** 5 à 10 mots importants que tu ne connais pas encore, avec leur sens en français, leur genre et la phrase du texte.
- **Pendant :** le texte seul. La taille du texte est réglable. Un bouton « Écouter » apparaît si l'audio existe.
  On ne peut pas cliquer sur les mots : le but est de lire sans s'arrêter.
- **Après :** trois questions automatiques, dans la langue du texte :
  trouver le mot manquant d'une phrase, reconnaître une phrase du texte, retrouver la phrase qui vient en premier.

**Les mots nouveaux entrent dans les révisions.** Les mots montrés avant la lecture sont ajoutés aux révisions habituelles.
Ils reviennent vite, comme tout mot fragile. Ces mots n'ont pas d'audio propre : leurs exercices évitent l'écoute.

### Reconstruire la bibliothèque

Ces commandes se lancent depuis le dossier du projet, dans cet ordre :

```bash
.toolsenv\Scripts\python.exe -I scripts/library/make_works.py
.toolsenv\Scripts\python.exe -I scripts/library/fetch_works.py
.toolsenv\Scripts\python.exe -I scripts/library/build.py
.toolsenv\Scripts\python.exe -I scripts/library/audio.py
```

1. `make_works.py` lit les deux listes validées et écrit `scripts/library/works.json`.
2. `fetch_works.py` récupère le texte intégral de chaque œuvre.
3. `build.py` découpe les textes en extraits, estime leur niveau, prépare les mots et les questions.
   Il écrit aussi un rapport dans `.tools/library/report.md`.
4. `audio.py` enregistre la lecture à voix haute d'une sélection de 30 extraits par langue.

Les téléchargements sont lents : une requête à la fois, avec une pause entre chaque.
Ils sont gardés en cache dans `.tools/library/`. Une seconde exécution ne retélécharge rien.

**Contact pour Wikimedia.** Wikimedia demande un moyen de contact dans chaque requête. Il n'est envoyé qu'aux sites Wikimedia.
Mets-le dans un fichier `.env.local`, à la racine du projet, sur une ligne de cette forme :

```
FILOU_CONTACT=ton-adresse-de-contact
```

Ce fichier n'est jamais commité. Sans lui, les scripts fonctionnent quand même, mais ils ne respectent plus tout à fait la politique de Wikimedia.

### Limites

- Les niveaux (A2 à C1) sont estimés par des règles : longueur des phrases, mots rares, passif, subordonnées.
  C'est une approximation, pas un classement validé par un enseignant.
- Les questions sont fabriquées mécaniquement à partir du texte, sans intelligence artificielle.
- Ni les textes ni les questions n'ont été relus par un locuteur natif.
- L'audio ne couvre qu'une sélection de 30 passages par langue, répartis entre niveaux et thèmes.

### Crédits

- Fréquence des mots : [wordfreq](https://github.com/rspeer/wordfreq) (CC BY-SA 4.0).
- Sens et genres en français : [Wiktionnaire](https://fr.wiktionary.org), via les extraits de [kaikki.org](https://kaikki.org) (CC BY-SA).
- Analyse des phrases : [spaCy](https://spacy.io).
- Voix : [Piper](https://github.com/OHF-Voice/piper1-gpl), avec les mêmes voix que les leçons (voir « Audio »).

## Audio

Les fichiers de `public/audio` sont générés à l'avance avec [Piper](https://github.com/OHF-Voice/piper1-gpl).
Après une modification du cours, relance la génération. Seuls les textes nouveaux sont produits.
L'audio de la bibliothèque de lecture est produit à part, par `scripts/library/audio.py`, dans `public/library/<langue>/audio`.

```bash
python -m venv .tools/venv
.tools/venv/Scripts/python.exe -m pip install piper-tts lameenc
.tools/venv/Scripts/python.exe -m piper.download_voices --data-dir .tools/voices de_DE-thorsten-high en_US-lessac-high
npm run audio
```

Voix utilisées :

- Allemand : `de_DE-thorsten-high`, jeu de données Thorsten-Voice sous licence CC0.
- Anglais : `en_US-lessac-high`. Sa licence (Blizzard 2013) reste à vérifier avant tout usage commercial.
