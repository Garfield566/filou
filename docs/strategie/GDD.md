# Filou — Mode stratégie : document de conception

### 1. Vision

Le joueur est un émissaire français qui gouverne une colonie anglaise vers 1300, entourée de villes anglaises, de cités de la Hanse et du duché d'Autriche. **La langue est l'interface du jeu** : construire, recruter, espionner, commercer et juger passent par des ordres, des lettres et des audiences en anglais ou en allemand.

### 2. Principes non négociables

1. **Chaque action est une parole adressée à quelqu'un.** Il n'y a pas de menu de construction : on demande un moulin au maître d'œuvre.
2. **Comprendre protège.** Le joueur qui lit mal se fait manipuler ; celui qui lit finement déjoue les trahisons.
3. **Roguelite.** Chaque partie repart de zéro : carte, colonie, technologies, PNJ. **Seuls les tableaux linguistiques persistent** et progressent d'une partie à l'autre.
4. **Le jeu nourrit les tableaux autant qu'il s'en sert.** Employer correctement un mot dans un ordre compte comme une révision réussie.
5. **L'erreur a des conséquences dans le monde, jamais de punition abstraite.** Pas de vies.
6. **Un débutant peut jouer et gagner**, mais un joueur avancé dispose de plus d'options pour moins cher.
7. **Le conflit armé reste abstrait** : pas d'unités à déplacer, la force militaire est un chiffre.

### 3. Inspirations

| Jeu | Ce qu'on reprend |
| --- | --- |
| Polytopia | Carte en tuiles isométriques, villes à niveaux avec récompense au choix, monnaie produite par tour, arbre technologique court, coût croissant avec le nombre de villes, style visuel en formes simples |
| Crusader Kings | Traits de caractère, opinions entre personnages, intrigues, conseil |
| Anno | Besoins de la population pour monter de niveau, chaînes de production |
| Chants of Sennaar | Le joueur étranger qui apprend à comprendre par l'usage |

On reprend des mécaniques, jamais du code, des graphismes ou des noms.

### 4. Cadre historique

Une ville anglaise fictive tenue par un seigneur français, inspirée de la domination normande sur l'Angleterre. On parle l'anglais et l'allemand modernes, par convention, comme dans un film historique.

### 5. Boucle de jeu

Une partie est un **mandat de 20 saisons** (cinq ans) confié par le roi de France. Une saison correspond à une session de 10 à 15 minutes.

**Déroulé d'une saison :**

1. **Audience** : deux ou trois habitants viennent se plaindre ou demander quelque chose (voir 10.7).
2. **Conseil** : le joueur donne ses ordres aux PNJ de la colonie (construire, recruter, espionner, commercer, taxer).
3. **Courrier** : lettres des factions extérieures à lire et, si besoin, à qui répondre.
4. **Résolution** : le moteur applique les ordres, fait agir les factions et les PNJ, tire les événements.
5. **Rapports** : au début de la saison suivante, les résultats arrivent dans la langue cible (chantier, mission d'espion, récolte, mouvements des voisins).

**Conditions de défaite :**

- loyauté de la population à zéro (révolte) ;
- trésor négatif deux saisons de suite (faillite) ;
- ville principale prise ;
- faveur du roi à zéro (rappel en France) ;
- trahison majeure non détectée (assassinat ou coup d'État).

**Voies de victoire**, une seule suffit :

| Voie | Condition |
| --- | --- |
| Diplomatique | Alliance active avec au moins trois factions à la fin du mandat |
| Commerciale | Contrôle du commerce de la laine, ou privilèges de la Hanse obtenus |
| Politique | Colonie au niveau Ville franche avec charte obtenue |
| Survie | Tenir les 20 saisons ; score selon l'état de la colonie |

[À DÉCIDER] Les seuils exacts seront fixés après la simulation d'équilibrage (voir 15).

**Bilan de fin de partie** (élément pédagogique central) :

- la cause de la victoire ou de la défaite, racontée dans la langue cible ;
- **les lettres mal lues, avec l'indice manqué surligné et expliqué en français** ;
- les ordres mal compris par les PNJ, avec la formulation correcte ;
- les notions linguistiques qui ont progressé ou reculé pendant la partie.

### 6. Carte, ressources et économie

**La carte** est une grille de tuiles générée à chaque partie à partir d'une graine (simplex-noise + seedrandom), affichée en perspective isométrique.

- Taille : 12 × 12 tuiles en phase 1, 16 × 16 ensuite.
- Terrains : mer, côte, prairie, champ, pâturage, forêt, colline, montagne, marais.
- Brouillard de guerre sur les tuiles inexplorées ; les éclaireurs envoient des rapports écrits.
- Règle de génération : **chaque faction manque d'au moins une ressource que d'autres possèdent**, pour créer échanges, alliances et trahisons.
- Noms de lieux générés à partir de morceaux réels : *-ford*, *-bury*, *-ton* en anglais ; *-burg*, *-furt*, *-dorf*, *-hausen* en allemand. Un clic sur le nom en donne le sens.

**La monnaie** est le denier, produit à chaque tour par chaque ville selon son niveau, comme les étoiles de Polytopia.

**Les ressources :**

| Ressource | Terrain | Usage |
| --- | --- | --- |
| Blé | Champ | Nourrir la population |
| Poisson | Côte, rivière | Nourrir, commercer |
| Laine | Pâturage | Richesse principale, convoitée par la Hanse |
| Bois | Forêt | Construire, armer des navires |
| Sel | Marais côtier | Conserver le poisson |
| Argent | Montagne (mine) | Frapper monnaie |

**Deux chaînes de production seulement :** laine → drap (atelier du drapier) et poisson + sel → poisson salé.

**Les bâtiments**, commandés par la parole au maître d'œuvre :

| Bâtiment | Effet | Débloqué par |
| --- | --- | --- |
| Ferme, bergerie, pêcherie | Exploite la ressource de la tuile | Départ |
| Moulin | Augmente la production de blé | Niveau Village |
| Marché | Deniers supplémentaires, échanges | Récompense de niveau |
| Atelier du drapier | Laine → drap | Technologie Corporations |
| Saline, saloir | Poisson + sel → poisson salé | Technologie Routes maritimes |
| Port | Commerce maritime, interception de lettres | Récompense de niveau |
| Atelier monétaire | Frapper ou affaiblir la monnaie | Technologie Atelier monétaire |
| Palissade, muraille, château | Défense | Récompenses et technologies |
| Chapelle, abbaye | Loyauté du clergé, scribes | Technologie Scriptorium |

**Affaiblir la monnaie** rapporte des deniers immédiatement mais fait monter les prix et baisser la loyauté des marchands quelques saisons plus tard.

### 7. Colonie, population et PNJ

**Niveaux de la colonie.** La population grandit quand ses besoins sont satisfaits (Anno). À chaque niveau, le joueur choisit une récompense parmi deux (Polytopia) et de nouveaux PNJ arrivent.

| Niveau | Besoins | Récompense au choix | PNJ qui arrivent |
| --- | --- | --- | --- |
| Hameau | Départ | — | Bailli du village (anglais), interprète |
| Village | Blé, poisson | Marché ou palissade | Marchand de laine (anglais), chapelain |
| Bourg | + bois, sel | Foire ou garnison | Maître de guilde (anglais), capitaine (français) |
| Ville | + drap | Atelier monétaire ou port | Agent de la Hanse (allemand), maître espion |
| Ville franche | + poisson salé, argent | Charte de franchise ou château | Envoyé autrichien (allemand), chancelier |

**La population** est divisée en trois groupes, chacun avec sa loyauté de 0 à 100 : **paysans**, **marchands**, **clergé**. Chaque décision en favorise certains au détriment d'autres. La loyauté globale est leur moyenne pondérée par leur taille.

**Fiche d'un PNJ :**

- nom, rôle, langue parlée, **registre** attendu (voir 10.5) ;
- deux **traits** parmi : loyal, ambitieux, cupide, pieux, orgueilleux, prudent, maladroit, rusé ;
- **loyauté** envers le joueur (0 à 100) ;
- **opinion** envers chacun des autres PNJ (−100 à +100) ;
- une **ambition secrète** (devenir chancelier, s'enrichir, servir une faction étrangère…) ;
- un **niveau de langue** propre : vitesse, vocabulaire, patience envers un étranger ;
- une courte description dans la langue cible.

[À DÉCIDER] Représentation visuelle d'un PNJ : pion géométrique à la couleur de son rôle, ou seulement nom et description. Pas de portrait dessiné.

**Interactions (Crusader Kings) :**

- Des **seuils déclenchent des événements** : opinion entre deux PNJ sous −50 → querelle ; loyauté sous 30 + trait ambitieux → complot ; trait cupide → pot-de-vin proposé.
- **Actions du joueur** : accorder une faveur, confier un poste, enquêter, réprimander, renvoyer, arranger un mariage.
- Chaque action passe par une parole adressée au PNJ, dans le bon registre.
- Les conflits structurels sont écrits d'avance : le marchand de laine et l'agent de la Hanse se disputent le commerce, le capitaine méprise le bailli.

Les trahisons peuvent donc venir de l'intérieur de la colonie, pas seulement des villes rivales.

### 8. Factions, diplomatie, armée et espionnage

**Les factions extérieures :**

| Faction | Langue | Style écrit | Arrivée |
| --- | --- | --- | --- |
| Villes et barons anglais | Anglais | Bourgeois simples, barons en anglais soutenu | Phase 1 |
| Cités de la Hanse | Allemand | Allemand marchand, pratique et chiffré | Phase 2 |
| Duché d'Autriche | Allemand | Allemand de chancellerie, juridique et alambiqué | Phase 3 |
| Roi de France | Français (lu par le chancelier) | Ordres, demandes de tribut | Phase 2 |

**Variables de chaque faction :** intérêts (commerce, sécurité, prestige), confiance envers le joueur, crainte du joueur et des voisins, tempérament tiré au hasard (loyal, opportuniste, orgueilleux, prudent), objectif secret.

**Décision à chaque tour :** une IA par utilité. Chaque action possible (s'allier, commercer, menacer, trahir, attendre) reçoit un score calculé à partir des variables ; la faction choisit la meilleure, avec un peu de hasard reproductible par la graine. Une faction opportuniste qui voit le joueur affaibli voit monter le score de la trahison.

**Intention et lettres :** l'action choisie fixe l'intention des lettres de la faction : honnête, hésitante ou perfide. Une faction qui prépare une trahison écrit des lettres contenant des indices linguistiques calibrés sur le niveau du joueur (voir 10.6).

**Armée, en version abstraite :**

- chaque ville a une force de garnison chiffrée ;
- on recrute en donnant un ordre au capitaine, ce qui coûte des deniers et de la population ;
- les ordres peuvent être conditionnels (« si on nous attaque, repliez-vous dans le château ») ;
- un siège se règle par comparaison des forces, modifiée par les murailles, les alliances et un événement tiré au hasard.

**Espionnage :**

- le maître espion reçoit des missions précises : qui suivre, où, pendant combien de temps ;
- missions : intercepter des lettres dans un port, suivre un PNJ, corrompre, vérifier une rumeur ;
- les rapports arrivent **au discours indirect** dans la langue cible : subjonctif I en allemand (*er habe keine Schiffe mehr*), concordance des temps en anglais (*he said he would sail in spring*) ;
- les lettres interceptées ne s'adaptent pas au niveau du joueur : c'est de la lecture authentique.

### 9. Arbre technologique (remis à zéro à chaque partie)

Cinq branches courtes façon Polytopia : une technologie de niveau 1, qui en débloque deux, qui en débloquent chacune une autre. Elles s'achètent en deniers, avec un coût qui augmente avec le nombre de villes contrôlées.

| Branche | Niveau 1 | Niveau 2 | Niveau 3 |
| --- | --- | --- | --- |
| Commerce | Foire | Corporations · Routes maritimes | Lettres de change · Comptoir hanséatique |
| Diplomatie | Ambassade | Espions · Alliances matrimoniales | Chiffre secret · Ligue |
| Administration | Chancellerie | Impôt · Atelier monétaire | Cour de justice · Registres fonciers |
| Guerre | Milice | Château · Archers | Mercenaires · Flotte |
| Savoir | Scriptorium | Interprètes · École | Université · Bibliothèque |

Chaque technologie débloque une action, un bâtiment ou un interlocuteur. Exemples : **Espions** permet d'intercepter des lettres ; **Chiffre secret** protège les tiennes ; **Interprètes** rend l'interprète moins cher et plus loyal.

**Liens avec les tableaux linguistiques :**

- **Réductions** : une notion maîtrisée réduit le coût de la technologie liée (lexique du commerce → Foire et Corporations moins chères).
- **Prérequis stricts, rares et réservés à la diplomatie avancée** : la Ligue exige la maîtrise du conditionnel, car un traité d'alliance repose sur des clauses conditionnelles.
- **Compensation** : un débutant peut investir dans Interprètes pour s'en sortir, au prix de ressources et de fiabilité.

Phase 1 : trois branches seulement (Commerce, Diplomatie, Savoir), trois technologies chacune.

### 10. Système linguistique (cœur du jeu)

C'est la partie la plus importante. Toute règle de jeu doit pouvoir répondre à la question : quelle compétence linguistique cela fait-il travailler ?

#### 10.1 Les tableaux linguistiques persistants

Un tableau par langue (anglais, allemand), construit à partir du moteur de révisions existant de Filou. **C'est la seule chose qui survit d'une partie à l'autre**, et il progresse aussi bien par les leçons de Filou que par les parties.

- **Vocabulaire**, par champ lexical : commerce, guerre, droit, construction, religion, administration, vie quotidienne.
- **Grammaire**, règle par règle, reliée aux leçons de grammaire existantes de Filou.
- **Compétences** : compréhension écrite, compréhension orale, expression écrite, maîtrise des registres.

Chaque nœud a quatre états visibles : **grisé** (jamais vu), **en cours**, **maîtrisé**, **fissuré** (en train de s'effacer, à réviser). Les seuils viennent des données du moteur de révisions (stabilité et probabilité de rappel).

Une table de correspondance relie les termes français et allemands (COD ↔ *Akkusativobjekt*, complément du nom ↔ *Genitivattribut*), pour que l'appli et les grammaires papier parlent la même langue.

**Effets en jeu, exemples :**

| Notion maîtrisée | Effet dans toutes les parties |
| --- | --- |
| Registre soutenu | Les barons et la chancellerie ne perdent pas patience |
| Verbes de modalité | Les promesses floues deviennent repérables |
| Conditionnel (*Konjunktiv II*, *would*) | Offres conditionnelles possibles dans les traités |
| Subordonnées (*weil*, *obwohl*, *because*, *although*) | Nouvelles répliques pour argumenter |
| Nombres et dates | Vérification des montants dans les contrats |
| Lexique du commerce | Négociation à la foire sans interprète |
| Prépositions de lieu (accusatif / datif) | Placement précis des gardes et des bâtiments |

#### 10.2 Le jeu nourrit les tableaux

Chaque événement linguistique du jeu est envoyé au moteur de révisions comme une révision, avec la note correspondante du moteur existant.

| Événement en jeu | Effet sur les tableaux |
| --- | --- |
| Ordre compris sans faute | Réussite sur chaque mot et règle employés |
| Ordre avec une faute qui ne gêne pas le sens | Mots réussis, règle fautive notée « difficile » |
| Ordre ambigu ou mal compris | Échec sur la notion manquante ou fautive |
| Mot inconnu consulté | Échec sur ce mot ; ajout aux révisions s'il est nouveau |
| Indice de trahison repéré | Réussite sur la règle qui portait l'indice |
| Indice de trahison manqué | Échec sur cette règle, expliqué au bilan |
| Plainte comprise sans aide | Réussite en compréhension orale ou écrite |

Aucun second système de révision n'est créé : le jeu appelle l'interface du moteur existant.

#### 10.3 Comprendre : le brouillage

Dans tous les textes du jeu (répliques, lettres, rapports, plaintes), **les mots que le joueur ne maîtrise pas s'affichent comme des taches d'encre**.

- Mot maîtrisé ou en cours avancé : en clair.
- Mot inconnu : tache d'encre de la longueur du mot. Un clic consomme une utilisation du dictionnaire (voir 10.8).
- Noms propres et mots transparents (*Kapital*, *Organisation*) : en clair mais soulignés discrètement.
- **Faux amis** (*Rente*, *eventuell*, *actual*) : jamais affichés en clair automatiquement.
- Verbes à particule séparable (*fängt … an*) : reconnus comme un seul mot (*anfangen*) grâce à la lemmatisation.

Les mots composés allemands se décomposent au clic : *Zentralbankunabhängigkeit* = *Zentral* + *Bank* + *unabhängig* + *-keit*.

#### 10.4 Formuler : les ordres

La forme de l'exercice suit le niveau de maîtrise de la notion visée, comme le moteur d'exercices actuel de Filou :

1. **Notion en apprentissage** : choisir parmi trois ou quatre formulations, dont certaines fautives.
2. **Notion en cours avancé** : assembler l'ordre à partir de blocs (groupe nominal, verbe, complément, subordonnée). En allemand, les blocs se rangent dans les champs de la phrase (*Vorfeld*, partie gauche du verbe, *Mittelfeld*, partie droite du verbe, *Nachfeld*), ce qui rend la structure visible.
3. **Notion maîtrisée** : écriture libre, analysée par une IA de langage.

Tout ordre, quelle que soit sa forme, devient une **action structurée** :

```json
{
  "destinataire": "capitaine",
  "acte": "ordre",
  "verbe": "recruter",
  "objet": "archers",
  "quantite": 20,
  "lieu": "chateau",
  "delai": "avant_hiver",
  "condition": null,
  "registre": "imperatif",
  "erreurs": [
    { "type": "cas", "segment": "vor dem Tor", "gravite": "sens_change" }
  ]
}
```

**Gravité des erreurs et conséquences :**

| Gravité | Conséquence |
| --- | --- |
| Sans gêne | Ordre exécuté ; le PNJ répète la phrase correctement |
| Imprécision (champ manquant) | Le PNJ interprète selon son trait : le loyal demande une précision (un tour de retard), le cupide interprète à son avantage, le maladroit se trompe |
| Sens changé | L'ordre est exécuté tel qu'il a été compris, donc mal |
| Mauvais registre | Ordre exécuté, mais la loyauté du PNJ baisse |

**Rôle strict de l'IA de langage** : transformer la phrase libre en action structurée et repérer les fautes. Le résultat est ensuite décidé par les règles du jeu. Réponse au format JSON validé par un schéma ; en cas d'échec ou sans connexion, le jeu repasse au mode « assembler ».

[À DÉCIDER] Fournisseur de l'IA de langage : API Claude avec une clé personnelle, ou modèle local.

#### 10.5 Registres et hiérarchie

La position sociale de l'interlocuteur impose la forme de la phrase.

| Interlocuteur | Acte attendu | Allemand | Anglais |
| --- | --- | --- | --- |
| Subordonné (capitaine, bailli) | Ordre | Impératif | Impératif |
| Égal (agent de la Hanse, ville voisine) | Requête | Conditionnel de politesse (*Könnten Sie…*) | *Would you…*, *I would be grateful if…* |
| Supérieur (roi, duc) | Supplique | Formules de respect, conditionnel | *Your Grace*, formules de requête humble |

Donner un ordre à un égal l'offense ; supplier un subordonné fait perdre de l'autorité.

[À DÉCIDER] Forme de politesse en allemand : *Ihr* (historiquement juste pour 1300) ou *Sie* (utile dans la vraie vie). Recommandation : *Sie*, puisque l'objectif réel est d'étudier en Allemagne.

#### 10.6 Les lettres et les indices de trahison

Une faction qui prépare une trahison écrit des lettres contenant des indices. **Les indices sont grammaticaux ou lexicaux, et calibrés sur le niveau du joueur** : la règle qui porte l'indice doit être « en cours » ou « maîtrisée » dans son tableau, sinon l'indice ne serait pas repérable.

| Niveau | Type d'indice | Exemple allemand | Exemple anglais |
| --- | --- | --- | --- |
| A2 | Conditionnel au lieu du futur | *Wir würden gern helfen* au lieu de *Wir werden helfen* | *We would help* au lieu de *We will help* |
| B1 | Verbes de modalité, conditions vagues | *sofern die Umstände es erlauben* | *subject to circumstances*, *we may consider* |
| B2 | Passif sans agent, distance du discours indirect | *Es wurde beschlossen…*, *Man sagt, Lübeck sei bereit* | *It has been decided…*, *it is said that…* |
| C1 | Double négation, implicite, politesse excessive, changement de ton | *Es ist nicht ausgeschlossen, dass wir helfen* | *it is not impossible that we may assist*, ironie, formules soudain glaciales |

**Indices non linguistiques**, toujours exprimés par du texte : sceau de la mauvaise couleur, date incohérente, chiffres différents d'une lettre à l'autre.

**Réponses aux lettres** : selon le niveau, choisir, assembler ou rédiger (voir 10.4). Un traité mal rédigé peut être exploité : une condition oubliée devient une faille.

Le bilan de fin de partie montre chaque indice manqué, surligné, avec une explication en français.

#### 10.7 Les audiences

Une fois par saison, deux ou trois habitants se présentent. Leurs plaintes sont **générées à partir de l'état de la partie** (disette, impôt trop lourd, abus d'un PNJ, querelle de voisinage).

1. **Comprendre** : la plainte arrive en texte et en audio, dans un anglais simple mais familier. Vérification par un choix de résumé correct.
2. **Vérifier** : certains habitants mentent ou exagèrent. Le joueur peut interroger le bailli ou le chapelain, ce qui coûte une action.
3. **Décider** : deux à quatre décisions avec des compromis entre paysans, marchands et clergé.
4. **Annoncer** : la décision est formulée par le joueur (choisir, assembler ou écrire). La clarté et le registre de l'annonce influencent la loyauté.

#### 10.8 Les stratégies de l'étranger

Le joueur est un étranger. Les stratégies réelles des non-natifs sont des actions du jeu, chacune avec un coût en patience de l'interlocuteur :

| Action | Allemand | Anglais | Effet |
| --- | --- | --- | --- |
| Faire répéter | *Wie bitte?* | *Pardon?* | Réplique répétée |
| Faire ralentir | *Langsamer, bitte.* | *Slower, please.* | Audio à vitesse réduite |
| Demander le sens | *Was bedeutet …?* | *What does … mean?* | Le PNJ explique le mot en termes simples |
| Périphrase | — | — | Contourner un mot inconnu à l'écrit, compris si assez précis |
| Dictionnaire | — | — | Révèle un mot ; nombre limité par saison |
| Interprète | — | — | Traduit tout, contre des deniers |

**Patience** : chaque PNJ a une jauge selon son tempérament et sa relation au joueur. À zéro, il met fin à l'échange.

**L'interprète n'est pas neutre.** Sa fiabilité dépend de sa loyauté et des pots-de-vin reçus de factions étrangères. Il peut adoucir une menace, omettre une condition ou changer un chiffre. Sa traduction s'affiche à côté du texte original brouillé : plus le joueur comprend l'original, plus il peut repérer une déformation.

#### 10.9 Le calibrage des textes

Chaque texte généré est mesuré avant d'être montré :

- **couverture** : 95 à 98 % de mots connus du joueur ;
- **mots nouveaux** : au plus 3 par lettre en A2, 6 en B2 ;
- **longueur des phrases** et **règles présentes** compatibles avec le tableau du joueur, sauf la règle visée par l'indice ;
- **mots à réviser aujourd'hui** placés en priorité dans les répliques, les lettres et les rapports.

La difficulté suit les interlocuteurs : bourgeois anglais simples, barons en anglais soutenu, marchands hanséatiques en allemand pratique, chancellerie autrichienne en allemand juridique. Les factions difficiles n'arrivent que lorsque le niveau du joueur le permet.

#### 10.10 La production des contenus

- **Modèles avec emplacements** : une phrase modèle par intention, registre et niveau, avec des emplacements remplis par les mots à réviser. Exemple : *« Der Händler beklagt sich über den Preis von {ware}. »*
- **Génération par lots, hors jeu** : une IA rédige les variantes, puis une vérification automatique (couverture, règles présentes, longueur), puis l'agent de relecture linguistique, puis un échantillon relu par un natif.
- **Données réutilisées** : phrases Tatoeba, sens et genres du Wiktionnaire, fréquences wordfreq déjà présents dans Filou.
- **Audio** : voix Piper pré-générées pour les textes fixes.

[À DÉCIDER] Audio des textes générés dynamiquement : serveur Piper local à la volée, ou audio limité aux textes fixes en phase 1.

### 11. Interface et visuel

**Style inspiré de Polytopia, entièrement original et dessiné par le code**, sans aucun fichier image ni illustration.

- Carte en tuiles isométriques, rendue avec PixiJS.
- Formes géométriques simples et aplats de couleur : un arbre est un cône, une montagne un triangle, une maison un cube avec un toit.
- Villes qui grandissent visiblement selon leur niveau (quelques maisons, puis remparts et clocher).
- Une couleur par faction ; ressources visibles sur les tuiles (moutons, barques, entrée de mine).
- Brouillard sur les zones inexplorées.
- Typographie très lisible pour les textes, car le jeu repose sur la lecture.

**Écrans :**

| Écran | Contenu |
| --- | --- |
| Carte | La colonie, les villes voisines, les ressources, le brouillard |
| Audience | Les habitants, leurs plaintes, les décisions |
| Conseil | Les PNJ de la colonie et la construction des ordres |
| Courrier | Les lettres reçues, interceptées, et les réponses |
| Arbre technologique | Les cinq branches de la partie en cours |
| Tableaux linguistiques | Vocabulaire, grammaire, compétences, avec l'état de chaque nœud |
| Bilan | Fin de partie et indices manqués |

L'interface reste utilisable sur un écran de téléphone, en prévision d'une future version installable.

### 12. Architecture technique

&#91;embedded content: architecture · 8 modules\]

Le cœur du jeu ne dépend ni de l'interface ni de l'IA de langage : il se teste seul, sans écran ni connexion.

**Structure des dossiers proposée :**

```
src/strategie/
  core/      règles, état de la partie, résolution d'une saison
  map/       génération de carte à partir d'une graine
  ai/        décisions des factions et des PNJ
  language/  pont vers le moteur de révisions, brouillage, ordres, calibrage
  content/   modèles de textes (JSON) et leur validation
  parser/    appel à l'IA de langage et schéma de sortie
  ui/        écrans React et rendu PixiJS
  sim/       parties automatiques pour l'équilibrage
```

**Principes :**

- Le cœur est fait de fonctions pures : état + action → nouvel état. Aucun appel à l'heure système ni au hasard non initialisé ; le générateur aléatoire reçoit la graine.
- Tous les contenus (PNJ, bâtiments, technologies, modèles de textes) sont des fichiers JSON validés par des schémas, pas du code.
- La sauvegarde de partie (IndexedDB, avec export et import JSON) est séparée des tableaux linguistiques, qui restent dans le système existant de Filou.
- Bibliothèques envisagées : PixiJS (rendu), simplex-noise et seedrandom (carte), zod (schémas). boardgame.io est optionnel : Claude Code propose de l'utiliser ou non dans son plan.

### 13. Organisation multi-agents

Huit sous-agents, chacun défini dans un fichier `.claude/agents/<nom>.md` avec son rôle, les dossiers qu'il a le droit de modifier et sa définition de « terminé ».

| Agent | Responsabilité | Dossiers |
| --- | --- | --- |
| planificateur | Plan de chaque phase, interfaces TypeScript entre modules, découpage des tâches | `docs/`, types partagés |
| moteur | Règles, état, résolution des saisons, génération de carte | `core/`, `map/` |
| ia | Décisions des factions et des PNJ, événements | `ai/` |
| linguistique | Pont vers le moteur de révisions, brouillage, ordres, calibrage, appel à l'IA de langage | `language/`, `parser/` |
| interface | Écrans React, rendu PixiJS de la carte | `ui/` |
| contenus | Textes en anglais et en allemand : répliques, lettres, plaintes, rapports, avec leur niveau et leurs indices | `content/` |
| relecteur-langue | Relit chaque texte : grammaire, niveau visé, registre, présence et justesse des indices | lecture seule |
| testeur | Tests automatiques, simulation de parties, équilibrage | `tests/`, `sim/` |

**Règles de travail :**

1. Le planificateur écrit les interfaces TypeScript entre modules. **Tual les valide avant tout travail en parallèle.**
2. Un agent ne modifie que ses dossiers. Un changement d'interface repasse par le planificateur.
3. Chaque livraison est relue : par le testeur pour le code, par le relecteur-langue pour les textes.
4. Le moteur de révisions existant de Filou n'est modifié que par l'agent linguistique, et seulement après accord de Tual.
5. À la fin de chaque jalon, Claude Code s'arrête, présente le résultat et la liste des points [À DÉCIDER] rencontrés.

### 14. Phases et jalons

Chaque phase se termine par une validation de Tual. Aucune phase ne commence avant la validation de la précédente.

**Phase 0 — Sauvegarde et audit**

- Vérifier que tout est commité ; lancer les 87 tests existants.
- Décrire l'interface du moteur de révisions : comment lire l'état d'un mot ou d'une règle, comment enregistrer une révision.
- Livrable : un court rapport d'audit, le plan de la phase 1 et les interfaces TypeScript entre modules.
- Validation : Tual approuve le plan et les interfaces.

**Phase 1 — Tranche jouable (anglais seulement)**

- Carte 12 × 12 générée par graine, avec brouillard.
- Colonie du Hameau au Village ; une ville anglaise rivale.
- Trois PNJ : le bailli, l'interprète, le marchand de laine.
- Saison complète : audience, conseil, courrier, résolution, rapports.
- Brouillage des mots inconnus ; ordres en modes « choisir » et « assembler ».
- Une trahison possible, annoncée par un indice de niveau A2 ou B1.
- Arbre technologique réduit : Commerce, Diplomatie, Savoir, trois technologies chacune.
- Écran des tableaux linguistiques, mis à jour par le jeu.
- Bilan de fin de partie minimal, avec l'indice manqué.
- Validation : Tual joue quatre saisons d'affilée ; tous les tests passent ; une même graine donne la même partie.

**Phase 2 — Un mandat complet**

- 20 saisons, conditions de victoire et de défaite.
- Colonie jusqu'au Bourg ; arrivée de la Hanse (**allemand**) et du roi de France.
- Espionnage avec rapports au discours indirect ; interprète qui peut déformer.
- Audiences complètes, avec habitants menteurs et vérification.
- Arbre technologique complet à cinq branches.
- Simulation de 100 parties automatiques et premier équilibrage.

**Phase 3 — Profondeur**

- Niveaux Ville et Ville franche ; arrivée du duché d'Autriche.
- Écriture libre analysée par l'IA de langage.
- Intrigues entre PNJ (opinions, complots, mariages).
- Indices de trahison de niveau B2 et C1.

**Phase 4 — Finition**

- Équilibrage final ; relecture d'un échantillon de textes par un natif.
- Version utilisable sur téléphone.

### 15. Tests, critères d'acceptation et interdits

**Tests automatiques obligatoires :**

- **Règles** : chaque règle du cœur (production, besoins, montée de niveau, coût des technologies, sièges) a ses tests.
- **Déterminisme** : une même graine et une même suite d'actions donnent exactement le même état final.
- **Pont linguistique** : chaque type d'événement du tableau 10.2 envoie la bonne révision au moteur existant.
- **Calibrage** : chaque texte généré respecte la couverture (95 à 98 %) et le nombre maximal de mots nouveaux pour un profil de joueur donné.
- **Indices** : une lettre perfide contient toujours au moins un indice repérable au niveau du joueur.
- **Non-régression** : les 87 tests existants de Filou passent toujours.

**Simulation d'équilibrage :** 100 parties jouées par des joueurs automatiques aux stratégies différentes (commerce, diplomatie, prudence, hasard). Le rapport indique le taux de victoire par stratégie, les causes de défaite, les ressources et technologies jamais utilisées. Une stratégie qui gagne presque toujours, ou une ressource inutile, est un défaut à corriger.

**Interdits :**

- Copier du code, des graphismes, des icônes ou des noms de Polytopia, Crusader Kings ou Anno.
- Laisser l'IA de langage décider d'une conséquence de jeu.
- Créer un système de révision parallèle à celui de Filou.
- Ajouter une dépendance lourde ou à licence incompatible sans accord.
- Inventer une règle absente du GDD au lieu de poser la question.
- Afficher en clair un faux ami ou révéler la traduction complète d'une lettre sans action du joueur.
- Laisser le mode test de Filou actif dans une version destinée à l'usage réel.

### 16. Questions ouvertes et pistes linguistiques

**Décisions à prendre avant ou pendant la phase 1 :**

- [ ] Représentation des PNJ : pion géométrique coloré, ou nom et description seulement.
- [ ] Fournisseur de l'IA de langage pour l'écriture libre : API Claude ou modèle local.
- [ ] Politesse en allemand : *Sie* (recommandé) ou *Ihr*.
- [ ] Audio des textes générés : serveur Piper local, ou textes fixes uniquement au début.
- [ ] Seuils de victoire et de défaite, après la première simulation.

**Pistes linguistiques à approfondir ensuite :**

1. **Le PNJ Filou**, un escroc qui glisse un piège par saison : faux ami, mauvais genre, fausse règle. Le démasquer rapporte de la réputation.
2. **Les connecteurs logiques** (*jedoch*, *folglich*, *however*, *whereas*) comme compétence débloquant des arguments en négociation.
3. **Les expressions figées** (*eine Entscheidung treffen*, *conduct a policy*) révisées comme unités, et non mot par mot.
4. **Les familles de mots** (*-ung*, *-heit*, *-keit*, *-ization*) pour deviner le sens des mots nouveaux dans les lettres.
5. **Les textes de Tual dans le jeu** : un PDF importé dans Filou (par exemple un chapitre de Max Weber) peut apparaître comme un manuscrit trouvé à déchiffrer, avec les mêmes outils de brouillage.
6. **La pratique orale** : répondre à voix haute pendant les audiences, avec une transcription locale (Whisper) comparée à la phrase attendue.
7. **La compréhension orale sans texte** : les crieurs publics et les conversations surprises au port, en audio seul.
8. **Le bilan comme leçon** : transformer chaque indice manqué en exercice ciblé dans le parcours normal de Filou.
9. **Le niveau C1 universitaire** : une chancellerie autrichienne qui écrit dans un allemand proche de la langue académique (nominalisations, passif, subjonctif I), en lien avec l'objectif d'études en Allemagne.
