# Relecture d'un échantillon de la bibliothèque de lecture

Relecture faite le 2026-11-07 par l'agent `relecteur-langue`, en lecture seule (aucun fichier de données ni script modifié).

**Avertissement.** Cette relecture ne remplace pas celle d'un locuteur natif, ni celle d'un enseignant de FLE/DaF habitué aux niveaux du CECRL. Les niveaux « relus » sont des estimations d'apprenant avancé, pour un lecteur francophone.

## Méthode

- Échantillon déterministe : pour chaque langue et chaque niveau (A2, B1, B2, C1), le 1er, le passage du milieu (`L[len(L)//2]`) et le dernier de ce niveau dans `public/library/<lang>/index.json`. Ça fait 24 passages.
- Pour chacun : texte (`paragraphs`), glossaire complet (`glossary`) et les 3 questions (`questions`).
- Les défauts récurrents ont ensuite été comptés sur **toute** la bibliothèque (581 passages EN, 287 DE) par un petit script en lecture seule, pour estimer leur fréquence. Les chiffres « global » de la synthèse viennent de là.
- Les causes ont été cherchées dans `scripts/library/clean.py`, `split.py`, `build.py`, `questions.py`, `dictionary.py`, `level.py`, et confirmées dans les textes bruts de `.tools/library/work/`.

Légende : ✔ correct · ~ défauts mineurs · ✘ défaut qui gêne la lecture ou fausse la question.

## Anglais

| id | œuvre | niveau annoncé | ton niveau | texte propre ? | glossaire | questions | remarque |
|---|---|---|---|---|---|---|---|
| en-0001 | Baum, *The Wonderful Wizard of Oz* | A2 | B1 | ✔ | ✘ *wicked* → « vilain » (méchant) ; *rest* → « repos » (le reste) ; *gracious* (« Oh, gracious! ») → « gracieux » (Mon Dieu !) ; *sink her voice* → « couler » (baisser) ; *head bowed* → « faire une révérence » (tête baissée) | ~ trou « has never been ___ » : *powerful* ou *good* marchent aussi. Réponse de la question « opening » faite de deux phrases (`\n\n`) | Archaïsmes légers (*dwelt*, *but one*, *shall*) |
| en-0302 | Dickens, *A Tale of Two Cities* | A2 | C1 | ✘ la réplique « “Ah!” » a été supprimée, donc « It was a long, grieving sound » ne renvoie plus à rien | ✘ *weep* → « larmoyer » (pleurer) ; *grieving* → « troubler » (plaintif) ; *convey* → « apprendre à » (transmettre) ; *desolate* → « isolé » (désemparée) ; *careless* → « négligent » (indifférent) | ~ trou *attracted* : les mauvaises réponses (*sweep, touching, broken*) sont exclues par la grammaire seule | Niveau très sous-estimé : beaucoup de dialogue court, mais *elicit a word of remonstrance*, *contrived* |
| en-0524 | Douglass, *Narrative…* | A2 | C1 (B2+) | ✔ | ✘ *turbid* → « confus » (trouble, boueux) ; *fret* → « dévorer » (se tracasser) ; *bosom* → « poitrine de femme » (ici la surface de la baie) ; *gallant decks* → « galant » (fier) ; *bear* illustré par la phrase de *born* ; « a la dérive » sans accent | ✔ | Les exclamations courtes font baisser la longueur moyenne. Lexique : *stupor, ague, turbid, yoke, apostrophe* |
| en-0002 | Baum, *Oz* | B1 | B1 (bas) | ✘ 2 lignes manquent entre [9] et [10] : « “Why do you wish to see Oz?” he asked. » et « …Then he said: » (vérifié dans le texte brut) | ✘ *joint* → « joint » (articulation) ; *lean* → « s'incliner » (appuyer) ; *softly* → « tendrement » (doucement) | ~ réponse de la question « opening » = fragment « she inquired softly… » (phrase coupée après « ?” ») ; la phrase du trou (*brains*) est affichée telle quelle dans le glossaire | Niveau plausible |
| en-0252 | Stevenson, *Jekyll and Hyde* | B1 | C1 | ✔ | ✘ *cabinet* → « gouvernement » (cabinet de travail, laboratoire) ; *swing* → « balançoire » (balancement) ; *drew to an end* → « dessiner » ; *scud* → « galop » (nuages bas) ; *weep* → « larmoyer » ; *weep* et *weeping* en double | ✔ | *disinterred, baize, bated breath* : clairement au-delà de B1 |
| en-0633 | Keynes, *Economic Consequences of the Peace* | B1 | C1 | ✔ | ✘ *juncture* → « jonction » (moment, conjoncture) ; *rattled* → « cliqueter » (affolés) ; *cry* (slogan électoral) → « cri » | ~ trou *importance* : *authority* passe presque | Essai politique : niveau B1 invraisemblable |
| en-0006 | Baum, *Oz* | B2 | B1 | ~ commence au milieu d'un récit enchâssé (« “There lived here then… ») sans contexte | ✘ *handsome* → « adroit » (beau) ; *spoiled* → « abîmer » (gâté) ; *wedding* → « jour de la cérémonie » (mariage) ; *fellow* → « ami » (gaillard, type) | ✔ | Phrases longues mais vocabulaire simple, d'où un niveau surestimé |
| en-0284 | Hawthorne, *The Scarlet Letter* | B2 | C1 (C2) | ✔ | ✘ *lamp* → « ampoule électrique » (lampe, en 1640 !) ; *conceits* → « vanité » (idées fantasques) ; *forth* → « loin » (dehors, en avant) | ~ trou et « opening » sur un fragment en minuscule (« muttered the minister, ___ his face… ») | works.json annonce C2 |
| en-0637 | Keynes | B2 | C1 | ✔ | ✘ *limb* → « limbe » (membre) ; *scale* → « balance » (échelle) ; *nation* → « peuple » ; *internal* → « à l'intérieur » (intérieur) | ✘ la bonne réponse de « from_text » est **la phrase même du trou**, déjà vue ; une mauvaise réponse (« Before the Congress, February 11.--… ») vient du **même livre** de Keynes | |
| en-0040 | Carroll, *Alice in Wonderland* | C1 | B1 | ✔ | ✘ *lying under the table* → « mentir » ; *fancy* → « aimer » (imaginer) ; *advise* → « apprendre à » (conseiller) ; *crying* (= pleurer) → « crier » | ✘ les 3 mauvaises réponses de « from_text » viennent de *Alice* / *Through the Looking-Glass* (« said the Hatter », « the Gryphon ») : l'apprenant peut croire qu'elles sont « du texte » | Phrases longues reliées par des deux-points, mais langue simple |
| en-0536 | Thoreau, *Walden* | C1 | C1 | ✔ | ✘ *suit* → « poursuite judiciaire » (costume) ; *mortal coil* → « bobine » (dépouille mortelle) | ~ trou : *soirées* (mot français) proposé comme mauvaise réponse de type verbe | Niveau juste |
| en-0645 | Addams, *Twenty Years at Hull-House* | C1 | C1 | ✔ | ✘ *myriad* → « dix-mille » (multitude) ; *keen* → « enthousiaste » (vif) ; *neighboring* → verbe « avoisiner » ; *vivid* → « vivide » | ~ trou *experiences* : « its priests make vivid… » marche presque ; *raison* (de *raison d'être*) proposé comme leurre | Niveau juste |

Bilan EN : niveau plausible pour 3 passages sur 12. Texte propre pour 10 sur 12. Glossaire avec au moins 3 sens faux en contexte : 12 sur 12. Questions sans défaut : 4 sur 12.

## Allemand

| id | œuvre | niveau annoncé | ton niveau | texte propre ? | glossaire | questions | remarque |
|---|---|---|---|---|---|---|---|
| de-0079 | Goethe, *Reineke Fuchs* | A2 | C1 | ~ hexamètres mis bout à bout : majuscules de début de vers au milieu des phrases (« die Summe Lesen », « fehlte Nicht ») ; commence au milieu d'une confession | ✘ *Fuß* → « pied : base d'une montagne » ; *Schrift* → « traité » (inscription) ; *versetzte* → « déplacer » (répliqua) ; **genre** *Härchen* : « der », il faut **das** | ✔ | Le vers épique archaïque (*hub, von dannen, Oheim*) est classé A2 |
| de-0254 | Kleist, *Der zerbrochne Krug* | A2 | C1 | ✘ nom du personnage collé à la réplique (« Adam Wer Ihr seid! ») ; il manque une réplique de Walter entre [30] et [31] (« Adam Wieso? » puis « Adam Nein!… ») | ✘ *Krug* → « bac » (cruche ; c'est le mot du titre !) ; *verzeihen* → « bitransitif Pardonner » (étiquette du Wiktionnaire) ; *fangt … an* → « attraper » (verbe séparable *anfangen*) ; *Gnaden* (Ew. Gnaden = Votre Grâce) → « clémence » | ~ les phrases des questions contiennent les noms des personnages et des `\n\n` ; phrase coupée après l'abréviation « Ew. » | Comédie en vers, langue juridique : C1 |
| de-0281 | Goethe, *Faust I* | A2 | C1 | ~ deux scènes mêlées (« Garten » puis « Wald und Höhle », « Faust allein. ») sans titre de scène ; deux répliques dans un paragraphe en [8] | ✘ *Faust* (le personnage) → « poing » ; *tief* → « bas » (profond) ; *sich hinzugeben* → « ajouter » (s'abandonner) ; *aufgeflogen* → « être découvert » (s'envoler) ; *herein* → « entrez » ; **genre** *Fingerspitze* : « das », il faut **die** | ~ une mauvaise réponse commence en minuscule (« müssen Wie etwas… ») | |
| de-0003 | Grimm, *Rotkäppchen* | B1 | B1 (A2 en orthographe moderne) | ✔ (orthographe de 1857 : *Thier, gieng, Rothkäppchen*) | ~ *Haube* → « capot » (coiffe) ; *Klinke* → « clenche » (poignée) ; *aufstehen* → « se lever de sa chaise » (ici, du lit). *Dirne* (= jeune fille, aujourd'hui « prostituée ») absent du glossaire : à signaler | ✔ | L'orthographe ancienne gêne un A2 |
| de-0130 | Storm, *Immensee* | B1 | B2 | ✘ **note de l'éditeur dans le texte** : « [Fußnote: Oder Rathauskeller. …] » ; commence par la fin d'un poème ; saute à une lettre (« »Die schönen Zuckerbuchstaben… ») sans transition ni guillemet fermant | ✘ **« Fußnote » → « note de bas de page » dans le glossaire** ; *sündhaft* → « peccamineux » (rare ; « coupable, pécheur ») ; *taugen* → « convenir » (ne rien valoir) ; *rief* → « appeler » (s'écria) | ✘ trou « Auf deine ___ sündhaften Augen » : *goldnen* et *braunen* conviennent aussi ; une mauvaise réponse (« …im Brederholz verirrt ») vient d'*Immensee* | |
| de-0316 | Grimm, *Sneewittchen* | B1 | B1 | ✘ les vers du miroir ont perdu leur 1re ligne : [1] « wer ist die schönste im ganzen Land?“ » et [2] « aber die junge Königin… » seuls (la ligne « Spieglein, Spieglein an der Wand, » se termine par une virgule, donc tidy l'a retirée) ; la phrase d'introduction a disparu aussi | ✘ *stieß … einen Fluch aus* → « cogner » (proférer : *ausstoßen*) ; *Deckel* → « abattant » (couvercle) ; *herein* → « entrez » | ✘ réponse de « from_text » = le fragment « wer ist die schönste… » ; une mauvaise réponse de « opening » commence par « “\n\naber… » | Fin de conte incompréhensible sans les vers |
| de-0001 | Grimm, *Die Bremer Stadtmusikanten* | B2 | B1 | ~ titre laissé en 1er paragraphe (« Die Bremer Stadtmusikanten. ») | ✘ *lief fort* → « continuellement » (partit) ; *weißt* → lemme « weißen » → « blanchir » (c'est *wissen*) ; *durch Mark und Bein* → *Bein* « jambe » (os ; expression) ; *Nachtmusik* sans genre (die) | ~ trou *sprach* : *merkte* passe à la rigueur | works.json : A2 |
| de-0147 | Eichendorff, *Taugenichts* | B2 | B2/C1 | ~ tirets « -- » en début et fin de paragraphe | ✘ *Schloß* → « serrure » (château) ; *tiefes Kompliment* → « bas » ; *stieß vom Ufer* → « cogner » ; *schämen* → « ou Avoir honte » (étiquette) ; *fatal* → « fatal » (ici « fâcheuse ») | ✘ réponse de « from_text » = « --\n\nViele Tage… » : le « -- » la trahit | |
| de-0317 | Grimm, *Die Sterntaler* | B2 | A2/B1 | ~ titre laissé (« Die Sternthaler. ») | ~ *frieren* → « geler » (avoir froid) | ✔ | Conte entier, phrases longues mais faites de « und », donc surestimé |
| de-0016 | Grimm, *Deutsche Sagen* | C1 | C1 | ✘ titre (« Der Glockenguß zu Attendorn. ») **et référence de source** (« Simplicissimus, Rathstübel cap. 8. ») laissés en tête | ✘ *ehern* → « permanent » (d'airain) ; *hierauf* → « ici » (là-dessus) ; *abgeschlagen* → « frapper dans » (tranché) ; *Anstalten treffen* → « institution » (préparatifs) ; *ausgerichtet* → « rapporter des propos » (accompli) ; *Ritte* (verbe *reiten*) → nom « Ritt » ; *schicken* → « transitif Envoyer » ; *Schelm* → « farceur » (ici « scélérat ») | ✘ réponse de « from_text » **identique** à celle de « opening » ; mauvaise réponse commençant par « , gab sie ihnen… » (phrase coupée) | |
| de-0195 | Hoffmann, *Der Sandmann* | C1 | C1 | ✘ **ce n'est pas *Der Sandmann*** : c'est *Die Jesuiterkirche in G.* (même recueil *Nachtstücke*, Gutenberg 6341 ; le titre « Die Jesuiterkirche in G. » est dans le texte brut) | ✘ *vorziehen* → « tirer » (préférer) ; *hindurch* → « durch » (glose en allemand !) ; *erinnern* → « transitif Rappeler » ; *Gastlichkeit* → « convivialité » (hospitalité) | ~ réponse de « opening » = fragment en minuscule après un point-virgule | Attribution d'œuvre fausse |
| de-0319 | Grimm, *Der Hase und der Igel* | C1 | hors échelle (bas allemand) | ✘ le texte est en **plattdeutsch**, pas en allemand standard | ~ glossaire fait des mots expliqués entre parenthèses (*Furche* → « ornière », plutôt « sillon ») | ~ questions en dialecte ; une mauvaise réponse contient un titre de légende (« Magdeburger Nixen. ») | À retirer de la bibliothèque, ou à marquer « dialecte » (rareShare 0,476) |

Bilan DE : niveau plausible pour 5 passages sur 12. Texte propre pour 1 sur 12 (de-0003), et 5 autres n'ont que des défauts mineurs. Glossaire avec au moins 2 sens faux : 11 sur 12. Genre faux : 2 sur 12 (*Härchen*, *Fingerspitze*), sur environ 130 noms relus. Questions sans défaut : 3 sur 12.

## Synthèse : défauts récurrents, du plus fréquent au plus rare

### 1. Glossaire : le premier sens du Wiktionnaire, sans tenir compte du contexte (24/24 passages)

- Exemples : en-0284 *lamp* → « ampoule électrique » ; en-0536 *suit* → « poursuite judiciaire » ; en-0637 *limb* → « limbe » ; en-0252 *cabinet* → « gouvernement » ; de-0147 *Schloß* → « serrure » ; de-0254 *Krug* → « bac » ; *tief* → « bas » (de-0281, de-0147) ; *cry* → « crier » là où il faut « pleurer » (en-0040).
- Causes :
  - `short_gloss()` prend la 1re glose acceptable de la 1re entrée.
  - `english_entries()` garde `setdefault(pos, gloss)`, donc le premier sens rencontré.
  - Pour l'allemand, `de-index.json` ne donne qu'une glose par lemme.
- Corrections proposées (`dictionary.py`) :
  1. Sauter les sens qui portent un domaine (`topics`, `raw_tags`, `tags` dans les lignes kaikki : *Droit*, *Électricité*, *Politique*, *Vieilli*, *Rare*…) quand un sens sans domaine existe.
  2. Ajouter un fichier de corrections écrit à la main (comme `scripts/*-faux-amis.json`) pour les ~300 lemmes fréquents dont le 1er sens est trompeur : *lamp, suit, limb, scale, cabinet, lie, fancy, rest, draw, cry, Schloß, Krug, tief, Haube, Deckel, herein…*
  3. Garder le nombre de sens dans le cache. Dans `glossary_of()`, écarter les lemmes très polysémiques (plus de 4 sens) plutôt que d'afficher un sens au hasard, ou les marquer « sens fréquent, vérifier dans la phrase ».

### 2. Niveau estimé non plausible (16/24 passages ; l'échelle est même inversée en allemand)

- Allemand : 15 des 23 passages A2 sont du théâtre ou de la poésie (Kleist, *Faust*, *Nathan*, *Woyzeck*, *Reineke Fuchs* : de-0079, de-0254, de-0281). À l'inverse, les contes de Grimm sont en B1/B2 (de-0001, de-0317), alors que works.json les annonce A2.
- Anglais : le dialogue fait baisser le niveau (en-0302 Dickens, en-0524 Douglass, en A2) ; les longues phrases simples le font monter (en-0040 *Alice* C1, en-0006 *Oz* B2).
- Cause : `difficulty()` pèse surtout `sentenceLength` (0,55 par mot). Les répliques courtes, les vers et les noms de personnages, comptés comme phrases, l'écrasent. `rareShare` ne voit pas l'archaïsme syntaxique.
- Corrections proposées (`level.py`, avec un appel modifié dans `build.py`) :
  1. Utiliser `levelGuess` de works.json comme a priori : niveau final borné à ±1 cran autour de l'estimation de l'œuvre.
  2. Pour `theme in {"theatre", "poesie"}`, ne pas descendre sous B2.
  3. Calculer la longueur de phrase sur la médiane des phrases d'au moins 5 mots, pour que « Wie? » ou « “Ah!” » ne comptent pas.
  4. Donner plus de poids à `rareShare` (par exemple 90 au lieu de 60).
  5. Si `rareShare > 0.35` (dialecte, cas de de-0319), exclure le passage.

### 3. Questions : leurres pris dans la même œuvre (sample : en-0040, en-0637, de-0130 ; global : au moins 79 EN et 97 DE, soit environ 1 passage DE sur 3)

- Cause : dans `foreign_sentences()`, le test `other["title"] != passage["title"]` compare des titres du type « …, extrait 3 sur 8 ». Les autres extraits du même livre passent donc pour « étrangers ».
- Correction (`questions.py`) : comparer `other["work"]`, et de préférence aussi `other["author"]`, plutôt que `title`.

### 4. Questions : phrases mal découpées ou fragments (sample : en-0001, en-0002, en-0284, de-0254, de-0281, de-0316, de-0147, de-0016, de-0195, de-0319 ; global : 235 EN et 133 DE questions contiennent un `\n\n`, 25 EN et 90 DE réponses commencent par une minuscule ou une ponctuation)

- Causes :
  - Dans `build.py`, les paragraphes sont joints par `"\n\n"` avant spaCy, qui crée des « phrases » à cheval sur deux répliques.
  - spaCy coupe après « ?” », après « Ew. », sur « ; ».
  - `usable()` ne contrôle que la longueur et la ponctuation finale.
- Correction (`questions.py`) : dans `usable()`, refuser une phrase qui :
  - contient `"\n"` ;
  - commence par une minuscule, une virgule, `--` ou un guillemet fermant ;
  - commence par un nom de locuteur (mot en capitales suivi d'un point, ou nom de personnage vu en tête de ligne).
- Mieux encore (`build.py`) : passer chaque paragraphe séparément à spaCy (`nlp.pipe` sur les paragraphes), puis regrouper par passage.

### 5. Texte : répliques courtes et vers supprimés par `tidy()` (sample : en-0302, en-0002, de-0316, de-0254)

- Cause, vérifiée : `letters < 0.7 * len(paragraph)` compte les espaces et les guillemets comme des non-lettres. Une réplique comme « “Why do you wish to see Oz?” he asked. » a 26 lettres pour 38 caractères ; elle est supprimée. S'y ajoutent :
  - `len(words) < 2`, qui retire « “Ah!” » ;
  - la regex de fin de paragraphe, qui retire les vers finissant par une virgule (« Spieglein, Spieglein an der Wand, ») et les phrases finissant par « : » (« Then he said: »).
- Corrections (`clean.py`) :
  - calculer le ratio sur `len(paragraph.replace(" ", ""))` et abaisser le seuil à 0,6 ;
  - accepter 1 mot s'il se termine par `!` ou `?` ;
  - ajouter `,;:` aux fins de ligne admises dans `clean_wikisource()`. Pour les vers, une ligne qui finit par `,` ou `:` doit être recollée à la suivante plutôt que retirée.

### 6. Texte : titres, sources et notes d'éditeur laissés (sample : de-0001, de-0317, de-0016, de-0130 ; global : 4 notes « [Fußnote…] » en DE, 18 DE et 11 EN premiers paragraphes de 6 mots ou moins finissant par un point, probablement des titres)

- Causes :
  - La regex de notes de `clean_book()` connaît `Footnote|Illustration|Anmerkung`, pas `Fußnote`, et `clean_wikisource()` n'en a aucune.
  - `HEADER_LINE` exige l'absence de minuscules, donc un titre comme « Die Bremer Stadtmusikanten. » passe.
- Corrections (`clean.py`) :
  - une regex commune `\[\s*(?:Footnote|Fußnote|Anmerkung|Illustration|Note)[^\]]*\]`, appliquée dans les deux fonctions ;
  - retirer le 1er paragraphe s'il reprend `record["title"]` (comparaison sans casse ni ponctuation) ;
  - retirer les lignes de référence (`\bcap\.\s*\d+`, « Simplicissimus, … ») ;
  - ajouter `fußnote` aux mots refusés du glossaire.

### 7. Glossaire : lemme ou partie du discours faux (sample : de-0001 *weißt* → « weißen/blanchir », de-0016 *Ritte* → « Ritt », de-0281 *Faust* → « poing », en-0645 *neighboring* → « avoisiner », en-0524 *born* rangé sous *bear*, verbes séparables *stieß … aus*, *fangt … an* en de-0316, de-0147, de-0254)

- Corrections (`build.py`, `glossary_of()`, avec `dictionary.py`) :
  1. Recoller la particule séparable : si le token a un enfant `dep_ == "svp"`, le lemme devient `particule + lemme` (*ausstoßen*, *anfangen*).
  2. Si `simplemma.lemmatize(token.text)` ne donne pas le lemme de spaCy, écarter le mot.
  3. Écarter les noms qui servent de nom de locuteur ou de personnage (Faust, Adam). Les mots toujours en majuscule dans l'œuvre en anglais sont à traiter de la même façon.

### 8. Questions : réponse unique non garantie, ou leurre éliminable par la seule grammaire (sample : en-0001 *good/powerful*, de-0130 *goldnen/braunen*, en-0633 *authority*, en-0645 *priests* ; à l'inverse en-0302 et de-0003, où la forme fléchie suffit à trouver la réponse)

- Corrections (`questions.py`, `blank_question()`) :
  - choisir les leurres avec le même `tag_` / la même `morph` que la réponse (participe passé pour un participe passé, même désinence allemande) ;
  - éviter les adjectifs épithètes, souvent interchangeables, au profit des noms et des verbes ;
  - exclure les leurres déjà présents dans la phrase montrée et les mots étrangers (*soirées*, *raison*).

### 9. Questions en double, ou phrase du trou déjà montrée (sample : en-0637, de-0016, en-0002, de-0130 ; global : réponse « from_text » = phrase du trou pour 44 EN et 20 DE, = réponse « opening » pour 17 EN et 13 DE ; la phrase complète du trou figure dans le glossaire affiché avant la lecture pour 404 des 581 trous EN et 189 des 281 trous DE)

- Correction (`questions.py`) : tenir un ensemble `used` des phrases déjà prises.
  - Le trou choisit d'abord, puis « from_text » et « opening » excluent `used`.
  - Exclure aussi des candidats du trou les phrases d'exemple du glossaire, ou faire choisir au glossaire une autre phrase quand il y en a une.
- Si le texte reste visible pendant les questions, les trois types se résolvent par simple recherche dans le texte. Il faudrait le masquer, côté appli.

### 10. Glossaire : étiquettes et définitions brutes du Wiktionnaire (sample : de-0254 « bitransitif Pardonner », de-0147 « ou Avoir honte », de-0016 « transitif Envoyer », de-0079 « pied : base d'une montagne », de-0195 « durch » ; global : 16 EN et 57 DE étiquettes, 33 EN et 130 DE gloses « X : Y », 14 EN et 28 DE gloses avec article « le/la »)

- Correction (`dictionary.py`, `short_gloss()`) :
  - retirer `^(?:(?:bi|in)?transitif|pronominal|ou)\s+` puis remettre la 1re lettre en minuscule ;
  - couper à `" : "` et garder la 1re partie ;
  - retirer l'article initial `^(?:le|la|les|l['’])\s*` ;
  - refuser une glose qui est un mot allemand connu (`gloss in german`) ;
  - corriger « a la » en « à la ».

### 11. Texte : passages qui enjambent un changement de scène, de chapitre ou d'œuvre (sample : de-0195 étiqueté *Der Sandmann* alors que c'est *Die Jesuiterkirche in G.*, de-0281 deux scènes de *Faust*, de-0130 saut à une lettre)

- Cause : `HEADER_LINE` supprime les titres, puis `split_passages()` recolle ce qui était de part et d'autre. Pour *Der Sandmann*, le livre Gutenberg 6341 contient plusieurs nouvelles des *Nachtstücke*.
- Corrections :
  - dans `clean.py`, remplacer un titre par un marqueur (par exemple `"§"`) au lieu de le retirer ;
  - dans `split.py`, fermer le passage en cours à chaque marqueur ;
  - pour un recueil, couper le texte à la fin de l'œuvre visée (premier titre d'une autre nouvelle), ou passer par la page Wikisource de la seule nouvelle.

### 12. Théâtre : nom du personnage collé à la réplique (de-0254 ; aussi les noms en capitales dans les questions de de-0281)

- Correction (`clean.py`, `clean_wikisource()`) : une ligne seule de 1 à 3 mots en majuscule initiale, suivie d'une réplique, est un nom de locuteur. La sortir en « ADAM. — » ou en champ séparé, et l'ignorer dans la mesure du niveau et dans les questions.

### 13. Genre allemand (2 erreurs sur environ 130 noms relus : de-0079 *Härchen* « der », de-0281 *Fingerspitze* « das » ; global : 3 diminutifs mal genrés, 29 noms sans genre)

- Corrections (`dictionary.py`) :
  - pour un nom en `-chen` ou `-lein`, forcer `das` ;
  - pour un composé, prendre le genre du dernier élément s'il est dans l'index (*Spitze* → die) ;
  - pour les suffixes `-ung`, `-heit`, `-keit`, `-schaft`, `-ion`, prendre `die`.
- Le genre est par ailleurs juste dans l'immense majorité des cas.

### 14. Œuvre hors cible (de-0319 en plattdeutsch)

- Correction (`works.json` / `make_works.py`) : retirer *Der Hase und der Igel*, ou prendre une version en haut allemand. Le garde-fou `rareShare > 0.35` de `level.py` (point 2) écarterait aussi ce genre de texte automatiquement.

## Points positifs

- Aucun reste des en-têtes ou pieds de page Gutenberg, aucun numéro de page dans l'échantillon.
- Les coupures de début et de fin de passage tombent toujours entre deux phrases.
- Les essais anglais (Keynes, Thoreau, Addams) sont propres.
- La majorité des gloses de mots concrets et peu ambigus sont justes : *hache, cercueil, poulain, jument, braise, sanglot, voûte, cithare*…
- Les genres allemands sont presque tous corrects.
- Aucune question n'a deux bonnes réponses exactes « du texte » au sens strict ; les ambiguïtés relevées portent sur le sens.

*Rappel : relecture d'un non-natif sur 24 passages. Les corrections proposées sont à valider par un locuteur natif (et, pour les niveaux, par un enseignant) avant d'être généralisées.*
