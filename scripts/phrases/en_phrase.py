"""The English « complex sentences » track: from the simple sentence (word order, questions, a single negation) to
joining sentences (and, but, or, so, because) and the first subordinate clauses (when / if with the present, although,
before / after / until / while, that), then indirect questions. Units 1 to 6 so far; relatives, conditionals,
the infinitive or -ing, the passive and long real sentences come next."""
from phrase_kit import L, R, S, T, make_track  # noqa: F401

SECOND = "Les deux ordres sont corrects."
SUB_FIRST = "Les deux ordres sont corrects ; quand la subordonnée vient en premier, on met une virgule."

# ---------------------------------------------------------------- Unit 1: word order
SUBJ = "le sujet"
VERB = "le verbe"
OBJ = "le complément (ce qu'on voit, aime, achète…)"
OTHER = "la manière ou le degré (comment ? combien ?)"
ROLE = {"prompt": "Quel est le rôle du groupe surligné ?", "options": [SUBJ, VERB, OBJ, OTHER]}

BEFORE_V = "avant le verbe"
AFTER_BE = "après be (am, is, are, was…)"
AFTER_AUX = "après l'auxiliaire (can, have, don't…)"

ADJ = "il décrit le nom : un adjectif"
NOUNMOD = "un nom qui précise le nom suivant"
HEAD = "le nom principal, en dernier"

PLACE = "le lieu (où ?)"
TIME = "le moment (quand ?)"
MANNER = "la manière (comment ?)"

unit1 = {
    "title": "L'ordre des mots",
    "level": "A1",
    "hint": "L'anglais tient à son ordre : sujet, verbe, complément, sans rien entre le verbe et le complément. Les petits mots (always, never) et les adjectifs ont leur place fixe.",
    "lessons": [
        L(
            "Sujet, verbe, complément : collés",
            R(
                "L'ordre de base est sujet, verbe, complément. Le complément colle au verbe : rien ne se glisse entre eux.",
                [
                    "Le français dit « Je parle très bien anglais » ; l'anglais dit I speak English very well.",
                    "Faux : I like very much chocolate. Juste : I like chocolate very much.",
                    "Les mots de manière et de degré vont en général après le complément. Slowly ou carefully peuvent aussi venir avant le verbe ; well et very much restent à la fin. Jamais entre le verbe et le complément.",
                ],
                [["I speak English very well.", "Je parle très bien anglais."], ["She likes chocolate very much.", "Elle aime beaucoup le chocolat."]],
            ),
            [
                S("I speak English very well.", "Je parle très bien anglais.", ["I", "speak", "English", "very well"], focus=("English", OBJ, "English colle au verbe : rien ne s'intercale."), blank=("very well", "très bien", ["very good", "well very"]), meaning=["Je parle très peu anglais.", "Il parle très bien anglais."], alt=["I speak very good English.", "I speak English really well."]),
                S("She likes chocolate very much.", "Elle aime beaucoup le chocolat.", ["she", "likes", "chocolate", "very much"], focus=("very much", OTHER, "Very much vient après le complément, jamais entre le verbe et lui."), blank=("likes", "like", ["like", "is liking"]), alt=["She really likes chocolate.", "She likes chocolate a lot."]),
                S("We watched the match on TV.", "Nous avons regardé le match à la télé.", ["we", "watched", "the match", "on TV"], focus=("the match", OBJ, "Ce qu'on regarde : le complément, juste après le verbe."), alt=["We watched the game on TV."]),
                S("My parents bought a new car.", "Mes parents ont acheté une nouvelle voiture.", ["my parents", "bought", "a new car"], focus=("my parents", SUBJ, "Ceux qui achètent : le sujet, en tête."), blank=("bought", "buy", ["buyed", "buy"]), meaning=["Mes parents ont vendu leur vieille voiture.", "J'ai acheté une nouvelle voiture à mes parents."]),
                S("He drinks his coffee slowly.", "Il boit son café lentement.", ["he", "drinks", "his coffee", "slowly"], ["He slowly drinks his coffee."], ("slowly", OTHER, "La manière vient après le complément."), why_order="Les deux sont corrects : slowly peut aussi venir avant le verbe, mais jamais entre le verbe et le complément.", meaning=["Il boit son café rapidement.", "Il prépare son café lentement."]),
                S("The children love this game.", "Les enfants adorent ce jeu.", ["the children", "love", "this game"], focus=("love", VERB, "Love : le verbe, entre le sujet et le complément."), blank=("love", "love", ["loves", "is loving"])),
                S("I read the letter carefully.", "J'ai lu la lettre attentivement.", ["I", "read", "the letter", "carefully"], ["I carefully read the letter."], ("carefully", OTHER, "La manière, après le complément."), why_order="Les deux sont corrects : carefully peut aussi venir avant le verbe, mais jamais entre read et the letter."),
            ],
            ROLE,
        ),
        L(
            "always, often, never : avant le verbe",
            R(
                "Les mots de fréquence (always, usually, often, sometimes, never) se placent avant le verbe.",
                [
                    "I always drink tea. Le français dit « je bois toujours » : l'anglais met always devant.",
                    "Avec be, ils viennent après : She is often late.",
                    "Avec un auxiliaire (can, have, don't…), ils se glissent juste après lui : I can never remember. I have never seen snow.",
                    "sometimes et usually peuvent aussi ouvrir la phrase : Sometimes he works at the weekend.",
                ],
                [["I always drink tea in the morning.", "Je bois toujours du thé le matin."], ["She is often late.", "Elle est souvent en retard."]],
            ),
            [
                S("I always drink tea in the morning.", "Je bois toujours du thé le matin.", ["I", "always", "drink", "tea", "in the morning"], ["In the morning I always drink tea."], ("always", BEFORE_V, "Always se place avant drink."), ("always", "toujours", ["never", "sometimes"]), SECOND, meaning=["Je bois parfois du thé le matin.", "Le matin, je ne bois jamais de thé."]),
                S("She is often late.", "Elle est souvent en retard.", ["she", "is", "often", "late"], focus=("often", AFTER_BE, "Avec be, often vient après is."), blank=("often", "souvent", ["always", "never"]), meaning=["Elle n'est jamais en retard.", "Elle est en retard aujourd'hui."]),
                S("We never eat meat.", "Nous ne mangeons jamais de viande.", ["we", "never", "eat", "meat"], focus=("never", BEFORE_V, "Never se place avant eat."), blank=("never", "jamais", ["ever", "always"]), meaning=["Nous mangeons rarement de la viande.", "Nous ne mangeons plus de viande."]),
                S("They are usually at home on Sundays.", "Ils sont généralement à la maison le dimanche.", ["they", "are", "usually", "at home", "on Sundays"], ["On Sundays they are usually at home."], ("usually", AFTER_BE, "Avec be, usually vient après are."), ("are", "be", ["is", "do"]), SECOND, alt=["They are usually home on Sundays."]),
                S("I can never remember his name.", "Je n'arrive jamais à me souvenir de son nom.", ["I", "can", "never", "remember", "his name"], focus=("never", AFTER_AUX, "Avec un auxiliaire, never vient juste après lui."), blank=("remember", "remember", ["to remember", "remembering"]), meaning=["J'ai oublié son nom pour toujours.", "Il ne se souvient jamais de mon nom."], alt=["I can never remember her name."]),
                S("He sometimes works at the weekend.", "Il travaille parfois le week-end.", ["he", "sometimes", "works", "at the weekend"], focus=("sometimes", BEFORE_V, "Sometimes se place avant works."), blank=("works", "work", ["work", "is working"]), alt=["He sometimes works at weekends.", "Sometimes he works at the weekend.", "He sometimes works on the weekend.", "He sometimes works on weekends."]),
                S("I have never seen snow.", "Je n'ai jamais vu de neige.", ["I", "have", "never", "seen", "snow"], focus=("never", AFTER_AUX, "Never se glisse entre have et seen."), blank=("seen", "see", ["saw", "seeing"]), meaning=["Je n'ai pas vu la neige cette année.", "Je n'aime pas la neige."]),
            ],
            {"prompt": "Où se place le mot surligné ?", "options": [BEFORE_V, AFTER_BE, AFTER_AUX]},
        ),
        L(
            "L'adjectif et le nom, devant le nom",
            R(
                "L'adjectif, et le nom qui en précise un autre, se placent devant le nom : a red car (une voiture rouge).",
                [
                    "L'adjectif ne prend jamais de -s : two new computers.",
                    "Un nom peut en préciser un autre, devant lui : a bus stop (un arrêt de bus), a tennis player (une joueuse de tennis).",
                    "Pour comprendre, lis le groupe en partant de la fin : le dernier nom est le nom principal.",
                    "interesting (intéressant) ≠ interested (intéressé) : an interesting book.",
                ],
                [["She has a red car.", "Elle a une voiture rouge."], ["I'm waiting at the bus stop.", "J'attends à l'arrêt de bus."]],
            ),
            [
                S("She has a red car.", "Elle a une voiture rouge.", ["she", "has", "a", "red", "car"], focus=("red", ADJ, "Red décrit car : il se place devant."), blank=("red", "rouge", ["reds", "read"])),
                S("We live in a big old house.", "Nous habitons une grande vieille maison.", ["we", "live", "in", "a", "big", "old", "house"], focus=("house", HEAD, "Le nom principal vient en dernier."), meaning=["Nous habitons une petite maison neuve.", "Nous habitons à côté d'une grande vieille maison."], alt=["We live in a large old house."]),
                S("I'm waiting at the bus stop.", "J'attends à l'arrêt de bus.", ["I'm waiting", "at", "the", "bus", "stop"], focus=("bus", NOUNMOD, "Bus précise stop : un arrêt de bus."), meaning=["J'attends dans le bus.", "J'attends le bus à la gare."]),
                S("They bought two new computers.", "Ils ont acheté deux nouveaux ordinateurs.", ["they", "bought", "two", "new", "computers"], focus=("new", ADJ, "L'adjectif ne prend jamais de -s."), blank=("new", "nouveau", ["news", "newly"])),
                S("Where is the train station?", "Où est la gare ?", ["where", "is", "the", "train", "station"], focus=("station", HEAD, "Station, le nom principal ; train le précise : la gare."), alt=["Where is the railway station?", "Where is the station?"]),
                S("It's a very interesting book.", "C'est un livre très intéressant.", ["it's", "a", "very", "interesting", "book"], focus=("interesting", ADJ, "Interesting décrit book : il se place devant."), blank=("interesting", "intéressant", ["interested", "interestings"])),
                S("She's a good tennis player.", "C'est une bonne joueuse de tennis.", ["she's", "a", "good", "tennis", "player"], focus=("tennis", NOUNMOD, "Tennis précise player : une joueuse de tennis."), meaning=["C'est une bonne entraîneuse de tennis.", "Elle regarde souvent le tennis."]),
            ],
            {"prompt": "Que fait le mot surligné ?", "options": [ADJ, NOUNMOD, HEAD]},
        ),
        L(
            "Le lieu, puis le moment",
            R(
                "En fin de phrase, le moment vient en dernier. En général : comment, où, quand (We played quietly in the garden all afternoon).",
                [
                    "Avec un verbe de mouvement (go, come, arrive…), le lieu passe d'abord : She goes to work by bike every day.",
                    "Le moment vient en dernier : I went to London last week.",
                    "On peut aussi ouvrir la phrase par le moment : Last week, I went to London.",
                    "Ne coupe jamais le verbe et son complément : I met my friends at the station (pas I met at the station my friends).",
                ],
                [["I went to London last week.", "Je suis allé à Londres la semaine dernière."], ["She goes to work by bike every day.", "Elle va au travail à vélo tous les jours."]],
            ),
            [
                S("I went to London last week.", "Je suis allé à Londres la semaine dernière.", ["I", "went", "to London", "last week"], ["Last week I went to London."], ("last week", TIME, "Le moment, en dernier ou en tête."), ("went", "go", ["go", "have gone"]), SECOND, meaning=["J'irai à Londres la semaine prochaine.", "Je suis rentré de Londres la semaine dernière."]),
                S("We met at the station at six.", "Nous nous sommes retrouvés à la gare à six heures.", ["we", "met", "at the station", "at six"], focus=("at the station", PLACE, "Le lieu d'abord, puis le moment."), alt=["We met at the station at six o'clock."]),
                S("She goes to work by bike every day.", "Elle va au travail à vélo tous les jours.", ["she", "goes", "to work", "by bike", "every day"], ["Every day she goes to work by bike."], ("by bike", MANNER, "Comment ? À vélo."), ("goes", "go", ["go", "is going"]), SECOND, meaning=["Elle va au travail en bus tous les jours.", "Aujourd'hui, elle va au travail à vélo."]),
                S("They arrived at the hotel late at night.", "Ils sont arrivés à l'hôtel tard dans la nuit.", ["they", "arrived", "at the hotel", "late at night"], focus=("late at night", TIME, "Le moment ferme la phrase."), blank=("at the hotel", "à l'hôtel", ["to the hotel", "at hotel"])),
                S("I'll see you at the café tomorrow.", "On se voit demain au café.", ["I'll see", "you", "at the café", "tomorrow"], ["Tomorrow I'll see you at the café."], ("at the café", PLACE, "Le lieu, puis le moment."), why_order=SECOND, alt=["See you at the café tomorrow."]),
                S("He was born in Italy in 1990.", "Il est né en Italie en 1990.", ["he", "was born", "in Italy", "in 1990"], focus=("in 1990", TIME, "Le moment vient après le lieu."), blank=("was born", "naître", ["is born", "born"])),
                S("We played quietly in the garden all afternoon.", "Nous avons joué tranquillement dans le jardin tout l'après-midi.", ["we", "played", "quietly", "in the garden", "all afternoon"], focus=("quietly", MANNER, "Comment ? Tranquillement : la manière avant le lieu."), meaning=["Nous avons travaillé dans le jardin tout l'après-midi.", "Nous avons joué bruyamment dans le jardin tout l'après-midi."]),
            ],
            {"prompt": "Que dit le groupe surligné ?", "options": [PLACE, TIME, MANNER]},
        ),
    ],
}

# ---------------------------------------------------------------- Unit 2: questions
QW = "le mot interrogatif"
AUX = "l'auxiliaire (do, does, did, is, can…)"
QS = "le sujet"
QV = "le verbe principal"
QROLE = {"prompt": "Quel est le rôle du groupe surligné ?", "options": [QW, AUX, QS, QV]}
SUBJQ = "on demande le sujet : pas de do"
OBJQ = "on demande le complément : avec do / did"
PREP_END = "la préposition, renvoyée à la fin"

unit2 = {
    "title": "Les questions",
    "level": "A1",
    "hint": "Pas de « est-ce que » : pour poser une question, l'anglais met un auxiliaire devant le sujet. Do, does, did servent quand il n'y en a pas.",
    "lessons": [
        L(
            "do, does, did : l'auxiliaire en tête",
            R(
                "Pour une question fermée (réponse oui ou non) : auxiliaire, sujet, verbe nu. Do you like jazz?",
                [
                    "do au présent, does avec he, she, it, did au passé.",
                    "Après do, does, did, le verbe reste nu : Does she live…? (pas lives). Did you see…? (pas saw).",
                    "Avec be, can et have auxiliaire (Have you seen…?), pas de do : on inverse. Are you ready? Can you swim? Mais have de possession prend do : Do you have a car?",
                ],
                [["Do you like jazz?", "Tu aimes le jazz ?"], ["Did you see the news?", "Tu as vu les infos ?"]],
            ),
            [
                S("Do you like jazz?", "Tu aimes le jazz ?", ["do", "you", "like", "jazz"], focus=("do", AUX, "Do ouvre la question ; like reste nu."), blank=("do", "do", ["does", "are"])),
                S("Does your brother live in Paris?", "Ton frère habite à Paris ?", ["does", "your brother", "live", "in Paris"], focus=("live", QV, "Après does, le verbe reste nu : live, sans -s."), blank=("live", "live", ["lives", "living"]), meaning=["Ton frère a habité à Paris ?", "Ton frère part pour Paris ?"]),
                S("Did you see the news?", "Tu as vu les infos ?", ["did", "you", "see", "the news"], focus=("did", AUX, "Did : une question au passé."), blank=("see", "see", ["saw", "seen"]), alt=["Have you seen the news?"], meaning=["Tu vas regarder les infos ?", "Tu as lu les infos ?"]),
                S("Are you ready?", "Tu es prêt ?", ["are", "you", "ready"], focus=("are", AUX, "Avec be, pas de do : on inverse."), blank=("are", "be", ["do", "is"])),
                S("Can your sister drive?", "Ta sœur sait conduire ?", ["can", "your sister", "drive"], focus=("your sister", QS, "Le sujet, juste après can."), blank=("drive", "drive", ["to drive", "drives"])),
                S("Did they enjoy the concert?", "Ils ont aimé le concert ?", ["did", "they", "enjoy", "the concert"], focus=("they", QS, "They, le sujet, suit did."), blank=("enjoy", "enjoy", ["enjoyed", "enjoying"]), alt=["Did they like the concert?"], meaning=["Ils vont aimer le concert ?", "Ils ont donné le concert ?"]),
                S("Does this bus go to the airport?", "Ce bus va à l'aéroport ?", ["does", "this bus", "go", "to the airport"], focus=("go", QV, "Après does, go reste nu."), blank=("does", "do", ["do", "is"])),
            ],
            QROLE,
        ),
        L(
            "Avec un mot interrogatif : where, when, why…",
            R(
                "Mot interrogatif, puis auxiliaire, sujet, verbe : Where do you live?",
                [
                    "what time, how often, how long, which… : le groupe entier ouvre la question. What time does the film start?",
                    "Avec be, toujours sans do : Where are you going?",
                    "Le français peut dire « Tu habites où ? » ; l'anglais met toujours le mot interrogatif en tête.",
                ],
                [["Where do you live?", "Où habites-tu ?"], ["What time does the film start?", "À quelle heure commence le film ?"]],
            ),
            [
                S("Where do you live?", "Où habites-tu ?", ["where", "do", "you", "live"], focus=("where", QW, "Where ouvre la question."), blank=("do", "do", ["does", "are"])),
                S("What time does the film start?", "À quelle heure commence le film ?", ["what time", "does", "the film", "start"], focus=("what time", QW, "Le groupe entier ouvre la question."), blank=("start", "start", ["starts", "starting"]), alt=["What time does the movie start?"], meaning=["À quelle heure finit le film ?", "Combien de temps dure le film ?"]),
                S("Why did you leave so early?", "Pourquoi es-tu parti si tôt ?", ["why", "did", "you", "leave", "so early"], focus=("did", AUX, "Did : une question au passé."), blank=("leave", "leave", ["left", "leaving"]), meaning=["Pourquoi pars-tu si tôt ?", "Pourquoi es-tu arrivé si tôt ?"]),
                S("How often do you go swimming?", "À quelle fréquence vas-tu nager ?", ["how often", "do", "you", "go swimming"], focus=("how often", QW, "How often : à quelle fréquence."), blank=("go swimming", "aller nager", ["go to swim", "going swimming"]), alt=["How often do you swim?"]),
                S("Where are you going?", "Où vas-tu ?", ["where", "are", "you", "going"], focus=("you", QS, "You, le sujet, suit are."), blank=("are", "be", ["do", "is"])),
                S("How long did you stay in Rome?", "Combien de temps es-tu resté à Rome ?", ["how long", "did", "you", "stay", "in Rome"], focus=("stay", QV, "Après did, le verbe reste nu."), blank=("stay", "stay", ["stayed", "staying"]), meaning=["Quand es-tu allé à Rome ?", "Combien de temps vas-tu rester à Rome ?"]),
                S("What does this word mean?", "Que veut dire ce mot ?", ["what", "does", "this word", "mean"], focus=("this word", QS, "This word, le sujet, entre does et mean."), blank=("mean", "mean", ["means", "meaning"])),
            ],
            QROLE,
        ),
        L(
            "Who called you? : quand on demande le sujet",
            R(
                "Quand who, what ou which demande le sujet (qui a fait ?), pas de do : Who called you? (qui t'a appelé ?).",
                [
                    "Quand il demande le complément (qui as-tu… ?), do revient : Who did you call? (qui as-tu appelé ?).",
                    "Pour savoir lequel : remplace who par une réponse. « Tom called you » : Tom est sujet → Who called you?",
                    "Même chose avec what : What happened? (qu'est-ce qui s'est passé ?) / What did she say?",
                ],
                [["Who called you?", "Qui t'a appelé ?"], ["Who did you call?", "Qui as-tu appelé ?"]],
            ),
            [
                S("Who called you?", "Qui t'a appelé ?", ["who", "called", "you"], focus=("who", SUBJQ, "Qui a appelé ? Who est le sujet : pas de did."), blank=("called", "call", ["did call", "call"]), meaning=["Qui as-tu appelé ?", "Qui va t'appeler ?"]),
                S("Who did you call?", "Qui as-tu appelé ?", ["who", "did", "you", "call"], focus=("who", OBJQ, "Tu as appelé quelqu'un : who est le complément, avec did."), blank=("call", "call", ["called", "calls"]), meaning=["Qui t'a appelé ?", "Qui vas-tu appeler ?"]),
                S("What happened?", "Que s'est-il passé ?", ["what", "happened"], focus=("what", SUBJQ, "Qu'est-ce qui s'est passé ? What est le sujet."), blank=("happened", "happen", ["did happen", "happens"])),
                S("Who lives in this house?", "Qui habite dans cette maison ?", ["who", "lives", "in this house"], focus=("who", SUBJQ, "Qui habite ? Who est le sujet : lives, sans does."), blank=("lives", "live", ["does live", "live"])),
                S("What did she say?", "Qu'est-ce qu'elle a dit ?", ["what", "did", "she", "say"], focus=("what", OBJQ, "Elle a dit quelque chose : what est le complément."), blank=("say", "say", ["said", "says"])),
                S("Which team won the match?", "Quelle équipe a gagné le match ?", ["which team", "won", "the match"], focus=("which team", SUBJQ, "Quelle équipe a gagné ? Le sujet : pas de did."), blank=("won", "win", ["did win", "win"]), alt=["Which team won the game?"]),
                S("Who did you meet at the party?", "Qui as-tu rencontré à la fête ?", ["who", "did", "you", "meet", "at the party"], focus=("who", OBJQ, "Tu as rencontré quelqu'un : who est le complément."), blank=("meet", "meet", ["met", "meeting"]), meaning=["Qui t'a invité à la fête ?", "Qui vas-tu rencontrer à la fête ?"]),
            ],
            {"prompt": "Que demande la question ?", "options": [SUBJQ, OBJQ]},
        ),
        L(
            "Where are you from? : la préposition à la fin",
            R(
                "Le français met la préposition devant (à qui, avec qui, d'où) ; l'anglais la laisse à la fin de la question.",
                [
                    "Who are you talking to? (à qui parles-tu ?)",
                    "Where are you from? (d'où viens-tu ?)",
                    "What are you thinking about? (à quoi penses-tu ?)",
                    "C'est la forme normale à l'oral comme à l'écrit courant.",
                ],
                [["Where are you from?", "D'où viens-tu ?"], ["Who are you talking to?", "À qui parles-tu ?"]],
            ),
            [
                S("Where are you from?", "D'où viens-tu ?", ["where", "are", "you", "from"], focus=("from", PREP_END, "D'où → where… from : from à la fin."), blank=("from", "de", ["of", "to"]), alt=["Where do you come from?"]),
                S("Who are you talking to?", "À qui parles-tu ?", ["who", "are", "you", "talking", "to"], focus=("to", PREP_END, "À qui → who… to."), blank=("talking", "talk", ["talk", "talks"]), meaning=["De qui parles-tu ?", "Qui te parle ?"], alt=["Who are you speaking to?"]),
                S("What are you looking at?", "Qu'est-ce que tu regardes ?", ["what", "are", "you", "looking", "at"], focus=("at", PREP_END, "Look at : at reste à la fin."), blank=("at", "regarder", ["for", "after"]), meaning=["Qu'est-ce que tu cherches ?", "Qu'est-ce que tu as vu ?"]),
                S("What is this box for?", "À quoi sert cette boîte ?", ["what", "is", "this box", "for"], focus=("for", PREP_END, "What… for : à quoi ça sert."), blank=("for", "pour", ["of", "to"])),
                S("Who did you go with?", "Avec qui y es-tu allé ?", ["who", "did", "you", "go", "with"], focus=("did", AUX, "Did : une question au passé."), blank=("with", "avec", ["by", "to"]), alt=["Who did you go there with?"], meaning=["Où es-tu allé ?", "Avec qui vas-tu y aller ?"]),
                S("What are you thinking about?", "À quoi penses-tu ?", ["what", "are", "you", "thinking", "about"], focus=("about", PREP_END, "Think about : about à la fin."), blank=("about", "à", ["to", "at"]), alt=["What are you thinking of?"]),
                S("Which hotel are you staying at?", "Dans quel hôtel loges-tu ?", ["which hotel", "are", "you", "staying", "at"], focus=("which hotel", QW, "Le groupe entier ouvre la question."), blank=("staying", "stay", ["stay", "stayed"]), alt=["Which hotel are you staying in?"]),
            ],
            {"prompt": "Quel est le rôle du mot surligné ?", "options": [QW, AUX, PREP_END]},
        ),
    ],
}

# ---------------------------------------------------------------- Unit 3: one negation
NEG_DO = "avec do / does / did"
NEG_DIRECT = "not directement après be, can, have…"
ONE_NEG = "le mot négatif lui-même (nobody, nothing, never)"
WITH_NOT = "any- après une négation (not, never)"

unit3 = {
    "title": "La négation",
    "level": "A1",
    "hint": "Le français dit « ne… pas », « ne… personne » ; l'anglais n'a qu'un seul mot négatif par proposition.",
    "lessons": [
        L(
            "don't, doesn't, didn't + le verbe nu",
            R(
                "Pour nier, l'anglais ajoute do, does ou did + not, et le verbe reste nu : I don't like… She doesn't speak… We didn't go…",
                [
                    "doesn't avec he, she, it ; didn't au passé, pour toutes les personnes.",
                    "Après doesn't et didn't, plus de -s ni de -ed : She doesn't speak. It didn't rain.",
                    "Avec be, can, have (auxiliaire), not vient directement : He isn't at home. I can't find it.",
                    "have pour la possession prend do : They don't have a car.",
                ],
                [["She doesn't speak German.", "Elle ne parle pas allemand."], ["I can't find my phone.", "Je ne trouve pas mon téléphone."]],
            ),
            [
                S("I don't like horror films.", "Je n'aime pas les films d'horreur.", ["I", "don't", "like", "horror films"], focus=("don't", NEG_DO, "Like n'est pas un auxiliaire : don't."), blank=("like", "like", ["likes", "liking"]), alt=["I don't like horror movies."]),
                S("She doesn't speak German.", "Elle ne parle pas allemand.", ["she", "doesn't", "speak", "German"], focus=("doesn't", NEG_DO, "Avec she : doesn't, et speak reste nu."), blank=("speak", "speak", ["speaks", "speaking"]), meaning=["Elle parle un peu allemand.", "Elle n'apprend pas l'allemand."]),
                S("We didn't go out last night.", "Nous ne sommes pas sortis hier soir.", ["we", "didn't", "go out", "last night"], ["Last night we didn't go out."], ("didn't", NEG_DO, "Au passé : didn't, et go reste nu."), ("go out", "go out", ["went out", "going out"]), SECOND),
                S("He isn't at home.", "Il n'est pas à la maison.", ["he", "isn't", "at home"], focus=("isn't", NEG_DIRECT, "Avec be, pas de do : isn't."), blank=("isn't", "be", ["doesn't", "aren't"]), alt=["He isn't home."]),
                S("I can't find my phone.", "Je ne trouve pas mon téléphone.", ["I", "can't", "find", "my phone"], focus=("can't", NEG_DIRECT, "Can est un auxiliaire : can't."), blank=("find", "find", ["to find", "found"]), meaning=["J'ai perdu mon téléphone hier.", "Je ne peux pas utiliser mon téléphone."]),
                S("My parents don't have a car.", "Mes parents n'ont pas de voiture.", ["my parents", "don't", "have", "a car"], focus=("don't", NEG_DO, "Have, verbe de possession : avec do."), blank=("don't", "do", ["doesn't", "aren't"]), alt=["My parents haven't got a car."]),
                S("It didn't rain yesterday.", "Il n'a pas plu hier.", ["it", "didn't", "rain", "yesterday"], ["Yesterday it didn't rain."], ("didn't", NEG_DO, "Au passé : didn't, et rain reste nu."), ("rain", "rain", ["rained", "rains"]), SECOND, meaning=["Il a beaucoup plu hier.", "Il ne va pas pleuvoir demain."]),
            ],
            {"prompt": "Comment se fait la négation ici ?", "options": [NEG_DO, NEG_DIRECT]},
        ),
        L(
            "Une seule négation : nobody ou not… anybody",
            R(
                "« Je n'ai vu personne » a deux mots négatifs en français. En anglais, un seul : I saw nobody, ou I didn't see anybody.",
                [
                    "Faux : I didn't see nobody. Après not ou never, on prend anybody, anything, ever.",
                    "nobody, nothing, never portent déjà la négation : le verbe reste affirmatif. Nobody knows. Nothing happened.",
                    "anyone = anybody, no one = nobody.",
                ],
                [["I didn't see anybody.", "Je n'ai vu personne."], ["Nobody knows the answer.", "Personne ne connaît la réponse."]],
            ),
            [
                S("I didn't see anybody.", "Je n'ai vu personne.", ["I", "didn't", "see", "anybody"], focus=("anybody", WITH_NOT, "Après didn't, anybody : une seule négation."), blank=("anybody", "personne", ["nobody", "somebody"]), alt=["I saw nobody.", "I didn't see anyone.", "I saw no one."], meaning=["Personne ne m'a vu.", "Je n'ai vu personne d'autre que lui."]),
                S("Nobody knows the answer.", "Personne ne connaît la réponse.", ["nobody", "knows", "the answer"], focus=("nobody", ONE_NEG, "Nobody en sujet : le verbe reste affirmatif."), blank=("knows", "know", ["doesn't know", "know"]), alt=["No one knows the answer."]),
                S("She never says anything.", "Elle ne dit jamais rien.", ["she", "never", "says", "anything"], focus=("anything", WITH_NOT, "Never porte déjà la négation : anything, pas nothing."), blank=("anything", "rien", ["nothing", "something"]), meaning=["Elle dit toujours tout.", "Elle ne dit rien aujourd'hui."]),
                S("There's nothing in the fridge.", "Il n'y a rien dans le frigo.", ["there's", "nothing", "in the fridge"], focus=("nothing", ONE_NEG, "Nothing porte la négation : there's reste affirmatif."), alt=["There isn't anything in the fridge."]),
                S("I don't know anyone here.", "Je ne connais personne ici.", ["I", "don't", "know", "anyone", "here"], focus=("anyone", WITH_NOT, "Après don't, anyone."), blank=("anyone", "personne", ["no one", "someone"]), alt=["I know nobody here.", "I don't know anybody here.", "I know no one here."]),
                S("We have never been to Asia.", "Nous ne sommes jamais allés en Asie.", ["we", "have", "never", "been", "to Asia"], focus=("never", ONE_NEG, "Never suffit : pas de not."), blank=("never", "jamais", ["ever", "not never"])),
                S("Nothing happened.", "Il ne s'est rien passé.", ["nothing", "happened"], focus=("nothing", ONE_NEG, "Nothing en sujet : happened reste affirmatif."), blank=("happened", "happen", ["didn't happen", "happens"]), meaning=["Tout s'est bien passé.", "Quelque chose s'est passé."]),
            ],
            {"prompt": "Quel est le mot surligné ?", "options": [ONE_NEG, WITH_NOT]},
        ),
    ],
}

# ---------------------------------------------------------------- Unit 4: joining two sentences
AND = "and : on ajoute"
BUT = "but : on oppose"
OR = "or : on choisit"
CAUSE = "because : la cause (parce que)"
CONS = "so : la conséquence (alors, donc)"

unit4 = {
    "title": "Relier deux phrases",
    "level": "A2",
    "hint": "and, but, or, so, because relient deux idées ; l'ordre des mots ne change pas après eux.",
    "lessons": [
        L(
            "and, but, or",
            R(
                "and ajoute, but oppose, or donne un choix. Après eux, l'ordre reste normal.",
                [
                    "Une virgule avant but quand deux phrases complètes se suivent : I called him, but he didn't answer.",
                    "Avec le même sujet, on peut ne pas le répéter : She opened the door and went in. Avec le même verbe aussi : The hotel was old but very clean.",
                    "We can take the bus or walk : or relie deux choix.",
                ],
                [["I called him, but he didn't answer.", "Je l'ai appelé, mais il n'a pas répondu."], ["She opened the door and went in.", "Elle a ouvert la porte et elle est entrée."]],
            ),
            [
                S("I called him, but he didn't answer.", "Je l'ai appelé, mais il n'a pas répondu.", ["I", "called", "him", "but", "he", "didn't", "answer"], focus=("but", BUT, "Une opposition : but."), blank=("but", "mais", ["and", "or"]), meaning=["Il m'a appelé, mais je n'ai pas répondu.", "Je l'ai appelé, et il a répondu."], combine=(["I called him.", "He didn't answer."], "but"), alt=["I phoned him, but he didn't answer."]),
                S("We can take the bus or walk.", "Nous pouvons prendre le bus ou marcher.", ["we", "can", "take", "the bus", "or", "walk"], focus=("or", OR, "Un choix : or."), blank=("or", "ou", ["and", "but"]), combine=(["We can take the bus.", "We can walk."], "or")),
                S("She opened the door and went in.", "Elle a ouvert la porte et elle est entrée.", ["she", "opened", "the door", "and", "went in"], focus=("and", AND, "Une action de plus : and."), blank=("went in", "go in", ["go in", "goes in"]), meaning=["Elle a ouvert la porte et elle est sortie.", "Elle est entrée sans ouvrir la porte."], combine=(["She opened the door.", "She went in."], "and"), alt=["She opened the door and went inside."]),
                S("The hotel was old but very clean.", "L'hôtel était vieux mais très propre.", ["the hotel", "was", "old", "but", "very clean"], focus=("but", BUT, "Une opposition : but."), blank=("but", "mais", ["or", "so"]), combine=(["The hotel was old.", "It was very clean."], "but")),
                S("Do you want tea or coffee?", "Tu veux du thé ou du café ?", ["do", "you", "want", "tea", "or", "coffee"], ["Do you want coffee or tea?"], ("or", OR, "Un choix : or."), ("or", "ou", ["and", "but"]), SECOND, alt=["Would you like tea or coffee?"]),
                S("I like the city, but I prefer the country.", "J'aime la ville, mais je préfère la campagne.", ["I", "like", "the city", "but", "I", "prefer", "the country"], focus=("but", BUT, "Une opposition : but."), blank=("prefer", "prefer", ["am preferring", "prefers"]), alt=["I like the city, but I prefer the countryside."], meaning=["J'aime la campagne, mais je préfère la ville.", "Je n'aime ni la ville ni la campagne."], combine=(["I like the city.", "I prefer the country."], "but")),
                S("He cooked dinner and I washed the dishes.", "Il a préparé le dîner et j'ai fait la vaisselle.", ["he", "cooked", "dinner", "and", "I", "washed", "the dishes"], focus=("and", AND, "On ajoute une action : and."), blank=("washed", "wash", ["wash", "washes"]), alt=["He made dinner and I did the dishes.", "He made dinner and I did the washing-up.", "He cooked dinner and I did the dishes.", "He made dinner and I washed the dishes."], combine=(["He cooked dinner.", "I washed the dishes."], "and")),
            ],
            {"prompt": "Que fait le mot surligné ?", "options": [AND, BUT, OR]},
        ),
        L(
            "so et because : la conséquence et la cause",
            R(
                "because donne la cause (parce que) ; so donne la conséquence (alors, donc).",
                [
                    "It was raining, so we stayed at home = We stayed at home because it was raining.",
                    "Une virgule avant so.",
                    "because peut ouvrir la phrase, avec une virgule : Because it was raining, we stayed at home.",
                    "Faux : Because it was raining, so we stayed. On garde un seul des deux.",
                ],
                [["It was raining, so we stayed at home.", "Il pleuvait, alors nous sommes restés à la maison."], ["I'm learning English because I want to travel.", "J'apprends l'anglais parce que je veux voyager."]],
            ),
            [
                S("It was raining, so we stayed at home.", "Il pleuvait, alors nous sommes restés à la maison.", ["it", "was raining", "so", "we", "stayed", "at home"], focus=("so", CONS, "Rester à la maison, c'est la conséquence : so."), blank=("so", "alors", ["because", "but"]), alt=["It was raining, so we stayed home.", "We stayed at home because it was raining.", "Because it was raining, we stayed at home."], meaning=["Il pleuvait, mais nous sommes sortis.", "Nous sommes restés à la maison jusqu'à ce qu'il pleuve."], combine=(["It was raining.", "We stayed at home."], "so")),
                S("I'm hungry because I didn't eat lunch.", "J'ai faim parce que je n'ai pas déjeuné.", ["I'm", "hungry", "because", "I", "didn't eat", "lunch"], focus=("because", CAUSE, "Ne pas avoir déjeuné, c'est la cause : because."), blank=("because", "parce que", ["so", "and"]), alt=["I'm hungry because I haven't had lunch.", "I'm hungry because I haven't eaten lunch.", "Because I didn't eat lunch, I'm hungry.", "I didn't eat lunch, so I'm hungry.", "I'm hungry because I didn't have lunch."], combine=(["I'm hungry.", "I didn't eat lunch."], "because")),
                S("She was tired, so she went to bed early.", "Elle était fatiguée, alors elle s'est couchée tôt.", ["she", "was", "tired", "so", "she", "went to bed", "early"], focus=("so", CONS, "Se coucher tôt, c'est la conséquence : so."), blank=("went to bed", "go to bed", ["goes to bed", "go to bed"]), alt=["She went to bed early because she was tired."], meaning=["Elle s'est couchée tôt, alors elle n'était pas fatiguée.", "Elle était fatiguée, mais elle s'est couchée tard."], combine=(["She was tired.", "She went to bed early."], "so")),
                S("I'm learning English because I want to travel.", "J'apprends l'anglais parce que je veux voyager.", ["I'm learning", "English", "because", "I", "want", "to travel"], focus=("because", CAUSE, "Vouloir voyager, c'est la cause : because."), blank=("to travel", "travel", ["travel", "travelling"]), alt=["Because I want to travel, I'm learning English.", "I want to travel, so I'm learning English."], combine=(["I'm learning English.", "I want to travel."], "because")),
                S("The shop was closed, so I went home.", "Le magasin était fermé, alors je suis rentré.", ["the shop", "was", "closed", "so", "I", "went", "home"], focus=("so", CONS, "Rentrer, c'est la conséquence : so."), blank=("so", "alors", ["because", "or"]), alt=["I went home because the shop was closed.", "The store was closed, so I went home."], meaning=["Le magasin était fermé parce que je suis rentré.", "Le magasin était ouvert, alors je suis entré."], combine=(["The shop was closed.", "I went home."], "so")),
                S("He didn't come because he was ill.", "Il n'est pas venu parce qu'il était malade.", ["he", "didn't", "come", "because", "he", "was", "ill"], focus=("because", CAUSE, "La maladie est la cause : because."), blank=("come", "come", ["came", "coming"]), alt=["Because he was ill, he didn't come.", "He didn't come because he was sick.", "He was ill, so he didn't come."], combine=(["He didn't come.", "He was ill."], "because")),
                S("I lost my keys, so I couldn't get in.", "J'ai perdu mes clés, alors je n'ai pas pu entrer.", ["I", "lost", "my keys", "so", "I", "couldn't", "get in"], focus=("so", CONS, "Ne pas pouvoir entrer, c'est la conséquence : so."), blank=("couldn't", "can", ["can't", "didn't can"]), alt=["I couldn't get in because I lost my keys.", "I couldn't get in because I had lost my keys."], combine=(["I lost my keys.", "I couldn't get in."], "so")),
            ],
            {"prompt": "Que donne le mot surligné ?", "options": [CAUSE, CONS]},
        ),
        L(
            "Tout ensemble : and, but, or, so, because",
            R(
                "Pour bien relier, demande-toi ce que la 2e idée apporte : un ajout (and), une opposition (but), un choix (or), une conséquence (so) ou une cause (because).",
                [
                    "I wanted to go out, but it was too cold : une opposition.",
                    "The film was boring, so we left early : une conséquence.",
                    "We missed the train because we woke up late : une cause.",
                ],
                [["I wanted to go out, but it was too cold.", "Je voulais sortir, mais il faisait trop froid."], ["We missed the train because we woke up late.", "Nous avons raté le train parce que nous nous sommes réveillés tard."]],
            ),
            [
                S("I wanted to go out, but it was too cold.", "Je voulais sortir, mais il faisait trop froid.", ["I", "wanted", "to go out", "but", "it", "was", "too cold"], focus=("but", BUT, "Une opposition : but."), blank=("but", "mais", ["so", "because"]), meaning=["Je suis sorti parce qu'il faisait froid.", "Je ne voulais pas sortir, car il faisait froid."], combine=(["I wanted to go out.", "It was too cold."], "but")),
                S("The film was boring, so we left early.", "Le film était ennuyeux, alors nous sommes partis tôt.", ["the film", "was", "boring", "so", "we", "left", "early"], focus=("so", CONS, "Partir tôt, c'est la conséquence : so."), blank=("boring", "ennuyeux", ["bored", "bores"]), alt=["The movie was boring, so we left early.", "We left early because the film was boring."], combine=(["The film was boring.", "We left early."], "so")),
                S("You can stay here or come with us.", "Tu peux rester ici ou venir avec nous.", ["you", "can", "stay", "here", "or", "come", "with us"], focus=("or", OR, "Un choix : or."), blank=("or", "ou", ["and", "but"]), combine=(["You can stay here.", "You can come with us."], "or")),
                S("She smiled because she was happy.", "Elle a souri parce qu'elle était contente.", ["she", "smiled", "because", "she", "was", "happy"], focus=("because", CAUSE, "Être contente, c'est la cause : because."), blank=("because", "parce que", ["so", "but"]), alt=["Because she was happy, she smiled.", "She was happy, so she smiled."], meaning=["Elle était contente parce qu'elle avait souri.", "Elle a souri, mais elle était triste."], combine=(["She smiled.", "She was happy."], "because")),
                S("He ate quickly and ran to the station.", "Il a mangé vite et il a couru jusqu'à la gare.", ["he", "ate", "quickly", "and", "ran", "to the station"], focus=("and", AND, "Une action de plus : and."), blank=("ran", "run", ["run", "runned"]), combine=(["He ate quickly.", "He ran to the station."], "and"), alt=["He ate fast and ran to the station."]),
                S("I don't like coffee, but I drink it every morning.", "Je n'aime pas le café, mais j'en bois tous les matins.", ["I", "don't", "like", "coffee", "but", "I", "drink", "it", "every morning"], focus=("but", BUT, "Une opposition : but."), blank=("drink", "drink", ["drinks", "am drinking"]), combine=(["I don't like coffee.", "I drink it every morning."], "but")),
                S("We missed the train because we woke up late.", "Nous avons raté le train parce que nous nous sommes réveillés tard.", ["we", "missed", "the train", "because", "we", "woke up", "late"], focus=("because", CAUSE, "Se réveiller tard, c'est la cause : because."), blank=("woke up", "wake up", ["woken up", "wakes up"]), alt=["Because we woke up late, we missed the train.", "We woke up late, so we missed the train."], meaning=["Nous nous sommes réveillés tard, mais nous avons eu le train.", "Nous avons raté le train, alors nous sommes rentrés tard."], combine=(["We missed the train.", "We woke up late."], "because")),
            ],
            {"prompt": "Que fait le mot surligné ?", "options": [AND, BUT, OR, CAUSE, CONS]},
        ),
    ],
}

# ---------------------------------------------------------------- Unit 5: the subordinate clause
PRES_SUB = "le présent : après when, if, as soon as"
WILL_MAIN = "will : dans la principale"
CAUSE2 = "because : la cause"
DESPITE = "although : malgré cela"
BEFORE_ = "before : avant"
AFTER_ = "after : après"
UNTIL = "until : jusqu'à ce que"
WHILE_ = "while : pendant que"
MAIN = "la principale"
THATW = "that (que), qu'on peut enlever"
SUBC = "la subordonnée"
COND = "if : une condition"
TIMEW = "when, while, before… : un moment"

unit5 = {
    "title": "La subordonnée",
    "level": "A2",
    "hint": "when, if, because, although, while… ouvrent une subordonnée. En anglais, l'ordre des mots ne change pas ; mais quand when et if disent un moment ou une condition, le futur se dit au présent.",
    "lessons": [
        L(
            "when et if : le présent pour le futur",
            R(
                "« Quand j'arriverai » se dit When I arrive : quand when, if, as soon as, before, after, until disent un moment ou une condition, pas de will, même pour le futur.",
                [
                    "I'll call you when I arrive. If it rains, we'll stay at home.",
                    "will reste dans l'autre partie de la phrase, la principale.",
                    "La subordonnée peut venir en premier : on met alors une virgule. When I arrive, I'll call you.",
                    "Faux : When I will arrive. C'est l'erreur la plus fréquente des francophones.",
                ],
                [["I'll call you when I arrive.", "Je t'appellerai quand j'arriverai."], ["If it rains, we'll stay at home.", "S'il pleut, nous resterons à la maison."]],
            ),
            [
                S("I'll call you when I arrive.", "Je t'appellerai quand j'arriverai.", ["I'll call", "you", "when", "I", "arrive"], focus=("arrive", PRES_SUB, "Après when, le présent, même pour le futur."), blank=("arrive", "arrive", ["will arrive", "arrived"]), why_order=SUB_FIRST, alt=["I'll call you when I get there.", "When I arrive, I'll call you."], meaning=["Je t'ai appelé quand je suis arrivé.", "Appelle-moi quand tu arriveras."], combine=(["I'll arrive.", "I'll call you."], "when")),
                S("If it rains, we'll stay at home.", "S'il pleut, nous resterons à la maison.", ["if", "it", "rains", "we'll stay", "at home"], ["We'll stay at home if it rains."], ("rains", PRES_SUB, "Après if, le présent : rains."), ("rains", "rain", ["will rain", "rained"]), SUB_FIRST, meaning=["S'il pleuvait, nous resterions à la maison.", "Quand il pleut, nous restons à la maison."], alt=["If it rains, we'll stay home."]),
                S("When she gets home, she'll be tired.", "Quand elle rentrera, elle sera fatiguée.", ["when", "she", "gets", "home", "she'll be", "tired"], ["She'll be tired when she gets home."], ("she'll be", WILL_MAIN, "Dans la principale, will."), ("gets", "get", ["will get", "got"]), SUB_FIRST),
                S("If you need help, call me.", "Si tu as besoin d'aide, appelle-moi.", ["if", "you", "need", "help", "call", "me"], ["Call me if you need help."], ("need", PRES_SUB, "Après if, le présent."), ("need", "need", ["will need", "needs"]), SUB_FIRST),
                S("We'll start as soon as everyone is here.", "Nous commencerons dès que tout le monde sera là.", ["we'll start", "as soon as", "everyone", "is", "here"], ["As soon as everyone is here, we'll start."], ("is", PRES_SUB, "Après as soon as, le présent : is, pas will be."), ("is", "be", ["will be", "are"]), SUB_FIRST, meaning=["Nous avons commencé dès que tout le monde était là.", "Nous commencerons même si tout le monde n'est pas là."]),
                S("If I see Tom, I'll tell him.", "Si je vois Tom, je le lui dirai.", ["if", "I", "see", "Tom", "I'll tell", "him"], ["I'll tell him if I see Tom."], focus=("I'll tell", WILL_MAIN, "Dans la principale, will."), blank=("see", "see", ["will see", "saw"]), why_order=SUB_FIRST),
                S("When I'm older, I'll travel around the world.", "Quand je serai plus grand, je ferai le tour du monde.", ["when", "I'm", "older", "I'll travel", "around the world"], ["I'll travel around the world when I'm older."], ("I'm", PRES_SUB, "Quand je serai → when I am."), ("I'm", "be", ["I'll be", "I was"]), SUB_FIRST, meaning=["Quand j'étais petit, je voyageais beaucoup.", "Si j'étais plus grand, je ferais le tour du monde."], alt=["When I grow up, I'll travel around the world."]),
            ],
            {"prompt": "Quelle forme a le groupe surligné ?", "options": [PRES_SUB, WILL_MAIN]},
        ),
        L(
            "although : même si, bien que",
            R(
                "although veut dire « bien que, même si ». Pas de subjonctif en anglais : l'ordre et le temps restent normaux.",
                [
                    "Although it was cold, we went swimming.",
                    "Faux : Although it was cold, but we went swimming. Avec although, pas de but.",
                    "even though dit la même chose, en plus fort : Even though he is rich, he isn't happy.",
                    "because (parce que) donne une cause ; although, une chose qui aurait dû empêcher.",
                ],
                [["Although it was cold, we went swimming.", "Même s'il faisait froid, nous sommes allés nager."], ["She went to work although she was ill.", "Elle est allée travailler même si elle était malade."]],
            ),
            [
                S("Although it was cold, we went swimming.", "Même s'il faisait froid, nous sommes allés nager.", ["although", "it", "was", "cold", "we", "went", "swimming"], ["We went swimming although it was cold."], ("although", DESPITE, "Le froid aurait dû empêcher : although."), ("went", "go", ["have gone", "go"]), SUB_FIRST, meaning=["Comme il faisait froid, nous ne sommes pas allés nager.", "Il faisait froid, alors nous sommes allés nager."], combine=(["It was cold.", "We went swimming."], "although"), alt=["Even though it was cold, we went swimming."]),
                S("She went to work although she was ill.", "Elle est allée travailler même si elle était malade.", ["she", "went", "to work", "although", "she", "was", "ill"], focus=("although", DESPITE, "Malade, et pourtant elle travaille : although."), blank=("was", "be", ["is", "were"]), why_order=SUB_FIRST, alt=["Although she was ill, she went to work.", "She went to work even though she was ill.", "She went to work although she was sick."], combine=(["She went to work.", "She was ill."], "although")),
                S("He failed the exam because he didn't study.", "Il a raté l'examen parce qu'il n'avait pas révisé.", ["he", "failed", "the exam", "because", "he", "didn't", "study"], focus=("because", CAUSE2, "Ne pas réviser, c'est la cause : because."), blank=("because", "parce que", ["although", "so"]), why_order=SUB_FIRST, alt=["Because he didn't study, he failed the exam.", "He failed the exam because he hadn't studied."], meaning=["Il a réussi l'examen même s'il n'avait pas révisé.", "Il n'a pas révisé parce qu'il avait raté l'examen."], combine=(["He failed the exam.", "He didn't study."], "because")),
                S("Even though he is rich, he isn't happy.", "Bien qu'il soit riche, il n'est pas heureux.", ["even though", "he", "is", "rich", "he", "isn't", "happy"], ["He isn't happy even though he is rich."], ("even though", DESPITE, "Riche, et pourtant malheureux : even though."), ("isn't", "be", ["doesn't", "aren't"]), SUB_FIRST, alt=["Though he is rich, he isn't happy.", "Although he is rich, he isn't happy.", "Even though he's rich, he isn't happy."], meaning=["Il est heureux parce qu'il est riche.", "Il n'est pas riche, mais il est heureux."]),
                S("I like him, although he talks too much.", "Je l'aime bien, même s'il parle trop.", ["I", "like", "him", "although", "he", "talks", "too much"], focus=("although", DESPITE, "Il parle trop, et pourtant je l'aime bien : although."), blank=("talks", "talk", ["talk", "is talking"]), why_order=SUB_FIRST, alt=["I like him even though he talks too much.", "Although he talks too much, I like him."], combine=(["I like him.", "He talks too much."], "although")),
                S("We stayed inside because it was too hot.", "Nous sommes restés à l'intérieur parce qu'il faisait trop chaud.", ["we", "stayed", "inside", "because", "it", "was", "too hot"], focus=("because", CAUSE2, "La chaleur est la cause : because."), blank=("because", "parce que", ["although", "but"]), why_order=SUB_FIRST, alt=["Because it was too hot, we stayed inside."], combine=(["We stayed inside.", "It was too hot."], "because")),
                S("Although the food was good, the service was slow.", "Même si la cuisine était bonne, le service était lent.", ["although", "the food", "was", "good", "the service", "was", "slow"], ["The service was slow although the food was good."], ("although", DESPITE, "Une chose bonne, une autre non : although."), ("slow", "lent", ["slowly", "slows"]), SUB_FIRST, meaning=["La cuisine était bonne parce que le service était lent.", "La cuisine et le service étaient lents."], combine=(["The food was good.", "The service was slow."], "although"), alt=["Even though the food was good, the service was slow."]),
            ],
            {"prompt": "Que dit le mot surligné ?", "options": [CAUSE2, DESPITE]},
        ),
        L(
            "before, after, until, while",
            R(
                "before (avant que), after (après que), until (jusqu'à ce que), while (pendant que) ouvrent une subordonnée de temps.",
                [
                    "Pas de subjonctif : Wait here until I come back (jusqu'à ce que je revienne).",
                    "Pour le futur, le présent, comme après when : We'll leave after we have lunch.",
                    "while + une action en cours : He fell asleep while he was watching TV.",
                    "Avec le même sujet, on peut aussi dire before eating, while watching…",
                ],
                [["Wash your hands before you eat.", "Lave-toi les mains avant de manger."], ["Someone called while you were out.", "Quelqu'un a appelé pendant que tu étais sorti."]],
            ),
            [
                S("Wash your hands before you eat.", "Lave-toi les mains avant de manger.", ["wash", "your hands", "before", "you", "eat"], ["Before you eat, wash your hands."], ("before", BEFORE_, "D'abord les mains, puis manger : before."), ("before", "avant", ["after", "until"]), SUB_FIRST, alt=["Wash your hands before eating."]),
                S("After the film ended, we went home.", "Après la fin du film, nous sommes rentrés.", ["after", "the film", "ended", "we", "went", "home"], ["We went home after the film ended."], ("after", AFTER_, "D'abord la fin du film, puis rentrer : after."), ("after", "après", ["before", "while"]), SUB_FIRST, alt=["After the movie ended, we went home.", "We went home after the movie ended."], meaning=["Nous sommes rentrés avant la fin du film.", "Après être rentrés, nous avons regardé un film."], combine=(["The film ended.", "We went home."], "after")),
                S("Wait here until I come back.", "Attends ici jusqu'à ce que je revienne.", ["wait", "here", "until", "I", "come back"], focus=("until", UNTIL, "Jusqu'à mon retour : until."), blank=("come back", "come back", ["will come back", "came back"]), meaning=["Attends ici jusqu'à ce que tu reviennes.", "Reviens ici dès que tu peux."], alt=["Wait here until I get back.", "Wait here till I come back."]),
                S("Someone called while you were out.", "Quelqu'un a appelé pendant que tu étais sorti.", ["someone", "called", "while", "you", "were", "out"], ["While you were out, someone called."], ("while", WHILE_, "Pendant ton absence : while."), ("while", "pendant que", ["until", "before"]), SUB_FIRST, combine=(["Someone called.", "You were out."], "while"), alt=["Someone phoned while you were out."]),
                S("She lived in Rome until she was twenty.", "Elle a vécu à Rome jusqu'à ses vingt ans.", ["she", "lived", "in Rome", "until", "she", "was", "twenty"], focus=("until", UNTIL, "Jusqu'à ses vingt ans : until."), blank=("lived", "live", ["has lived", "lives"]), meaning=["Elle s'est installée à Rome à vingt ans.", "Elle a vécu à Rome pendant vingt ans."]),
                S("We'll leave after we have lunch.", "Nous partirons après avoir déjeuné.", ["we'll leave", "after", "we", "have", "lunch"], ["After we have lunch, we'll leave."], ("after", AFTER_, "Après, et le présent derrière : after we have lunch."), ("have", "have", ["will have", "had"]), SUB_FIRST, alt=["We'll leave after lunch.", "We'll leave after we've had lunch.", "We'll leave after having lunch."]),
                S("He fell asleep while he was watching TV.", "Il s'est endormi pendant qu'il regardait la télé.", ["he", "fell asleep", "while", "he", "was watching", "TV"], ["While he was watching TV, he fell asleep."], ("while", WHILE_, "Pendant qu'il regardait : while."), ("was watching", "watch", ["is watching", "watches"]), SUB_FIRST, alt=["He fell asleep watching TV.", "He fell asleep while watching TV."], combine=(["He was watching TV.", "He fell asleep."], "while")),
            ],
            {"prompt": "Que dit le mot surligné ?", "options": [BEFORE_, AFTER_, UNTIL, WHILE_]},
        ),
        L(
            "that : rapporter ce qu'on dit ou pense",
            R(
                "Après think, know, hope, say, tell…, that veut dire « que ». Et on l'enlève très souvent : I think he is right.",
                [
                    "Pas de subjonctif : It's a pity that you can't come (que tu ne puisses pas venir).",
                    "say + ce qu'on dit : She said that she was tired.",
                    "tell + la personne : He told me that he was leaving. Faux : He said me.",
                    "Pour traduire, avec ou sans that, les deux sont justes.",
                ],
                [["I think that he is right.", "Je pense qu'il a raison."], ["He told me that he was leaving.", "Il m'a dit qu'il partait."]],
            ),
            [
                S("I think that he is right.", "Je pense qu'il a raison.", ["I", "think", "that", "he", "is", "right"], focus=("that", THATW, "Que → that, et on peut l'enlever : I think he is right."), blank=("is", "be", ["has", "are"]), alt=["I think he is right.", "I think he's right."], meaning=["Je pense qu'il a tort.", "Il pense que j'ai raison."]),
                S("She said that she was tired.", "Elle a dit qu'elle était fatiguée.", ["she", "said", "that", "she", "was", "tired"], focus=("she said", MAIN, "Avant that : la principale."), blank=("said", "say", ["told", "says"]), alt=["She said she was tired."]),
                S("He told me that he was leaving.", "Il m'a dit qu'il partait.", ["he", "told", "me", "that", "he", "was leaving"], focus=("he told me", MAIN, "Avant that : la principale (tell + la personne : told me)."), blank=("told", "tell", ["said", "says"]), alt=["He told me he was leaving."], meaning=["Je lui ai dit que je partais.", "Il m'a demandé si je partais."]),
                S("I hope that you feel better soon.", "J'espère que tu iras vite mieux.", ["I", "hope", "that", "you", "feel", "better", "soon"], focus=("that you feel better soon", SUBC, "De that jusqu'à la fin : la subordonnée."), blank=("feel", "feel", ["feels", "felt"]), alt=["I hope you feel better soon.", "I hope you get better soon.", "I hope you will feel better soon."]),
                S("We know that it isn't easy.", "Nous savons que ce n'est pas facile.", ["we", "know", "that", "it", "isn't", "easy"], focus=("that", THATW, "Que → that, qu'on peut enlever."), blank=("know", "know", ["knows", "are knowing"]), alt=["We know it isn't easy.", "We know it's not easy."]),
                S("Are you sure that the shop is open?", "Tu es sûr que le magasin est ouvert ?", ["are", "you", "sure", "that", "the shop", "is", "open"], focus=("that the shop is open", SUBC, "De that jusqu'à la fin : la subordonnée."), blank=("open", "ouvert", ["opened", "opening"]), alt=["Are you sure the shop is open?", "Are you sure the store is open?"], meaning=["Tu es sûr que le magasin est fermé ?", "Tu sais à quelle heure ouvre le magasin ?"]),
                S("It's a pity that you can't come.", "C'est dommage que tu ne puisses pas venir.", ["it's", "a pity", "that", "you", "can't", "come"], focus=("that", THATW, "Que → that, qu'on peut enlever (It's a pity you can't come) ; et pas de subjonctif."), blank=("can't", "can", ["don't can", "can't to"]), alt=["It's a pity you can't come.", "It's a shame that you can't come.", "It's a shame you can't come.", "It's too bad you can't come."]),
            ],
            {"prompt": "Quel est le groupe surligné ?", "options": [MAIN, THATW, SUBC]},
        ),
        L(
            "Tout ensemble : relier et emboîter",
            R(
                "Pour bien relier, demande-toi ce que dit la subordonnée : une condition (if), un moment (when, while, before…), une cause (because) ou un obstacle (although).",
                [
                    "If you're tired, go to bed : une condition.",
                    "Although I was tired, I finished my work : un obstacle.",
                    "Quand if, when, before… disent une condition ou un moment, le futur se dit au présent.",
                ],
                [["If you're tired, go to bed.", "Si tu es fatigué, va te coucher."], ["Although I was tired, I finished my work.", "Même si j'étais fatigué, j'ai fini mon travail."]],
            ),
            [
                S("If you're tired, go to bed.", "Si tu es fatigué, va te coucher.", ["if", "you're", "tired", "go to bed"], ["Go to bed if you're tired."], ("if", COND, "Une condition : if."), ("if", "si", ["although", "because"]), SUB_FIRST),
                S("When I was a child, I was afraid of the dark.", "Quand j'étais enfant, j'avais peur du noir.", ["when", "I", "was", "a child", "I", "was", "afraid of the dark"], ["I was afraid of the dark when I was a child."], ("when", TIMEW, "Un moment du passé : when."), ("afraid of the dark", "peur du noir", ["afraid from the dark", "afraid at the dark"]), SUB_FIRST, meaning=["Quand j'étais enfant, j'aimais le noir.", "Mon enfant a peur du noir."], combine=(["I was a child.", "I was afraid of the dark."], "when"), alt=["When I was little, I was afraid of the dark."]),
                S("Although I was tired, I finished my work.", "Même si j'étais fatigué, j'ai fini mon travail.", ["although", "I", "was", "tired", "I", "finished", "my work"], ["I finished my work although I was tired."], ("although", DESPITE, "La fatigue aurait dû empêcher : although."), ("finished", "finish", ["finishing", "finishes"]), SUB_FIRST, meaning=["J'étais fatigué parce que j'avais fini mon travail.", "J'étais fatigué, alors je n'ai pas fini mon travail."], combine=(["I was tired.", "I finished my work."], "although"), alt=["Even though I was tired, I finished my work."]),
                S("We stopped the car because we were lost.", "Nous nous sommes arrêtés parce que nous étions perdus.", ["we", "stopped", "the car", "because", "we", "were", "lost"], focus=("because", CAUSE2, "Être perdus, c'est la cause : because."), blank=("were", "be", ["was", "are"]), why_order=SUB_FIRST, alt=["We stopped because we were lost.", "Because we were lost, we stopped the car."], combine=(["We stopped the car.", "We were lost."], "because")),
                S("Turn off the lights before you leave.", "Éteins la lumière avant de partir.", ["turn off", "the lights", "before", "you", "leave"], ["Before you leave, turn off the lights."], ("before", TIMEW, "Un moment : avant de partir."), ("leave", "leave", ["will leave", "left"]), SUB_FIRST, alt=["Turn off the light before you leave.", "Turn the lights off before you leave.", "Switch off the lights before you leave.", "Turn off the lights before leaving."]),
                S("If we leave now, we'll catch the train.", "Si nous partons maintenant, nous aurons le train.", ["if", "we", "leave", "now", "we'll catch", "the train"], ["We'll catch the train if we leave now."], ("if", COND, "Une condition : if."), ("leave", "leave", ["will leave", "left"]), SUB_FIRST, meaning=["Si nous étions partis plus tôt, nous aurions eu le train.", "Nous partons maintenant, mais nous allons rater le train."]),
                S("She was singing while she was cooking.", "Elle chantait pendant qu'elle faisait la cuisine.", ["she", "was singing", "while", "she", "was cooking"], ["While she was cooking, she was singing."], ("while", TIMEW, "Deux actions en même temps : while."), ("was cooking", "cook", ["is cooking", "cooks"]), SUB_FIRST, alt=["She was singing while cooking.", "She sang while she was cooking."], combine=(["She was singing.", "She was cooking."], "while")),
            ],
            {"prompt": "Que dit la subordonnée ?", "options": [COND, TIMEW, CAUSE2, DESPITE]},
        ),
    ],
}

# ---------------------------------------------------------------- Unit 6: indirect questions
DIRECT = "une question directe : l'auxiliaire avant le sujet"
INDIRECT = "une question indirecte : le sujet, puis le verbe"
ASKIF = "if / whether : une question (est-ce que…)"

unit6 = {
    "title": "Les questions indirectes",
    "level": "B1",
    "hint": "Une question glissée dans une phrase (Do you know where…?) perd son inversion et son do : on revient à l'ordre sujet, verbe.",
    "lessons": [
        L(
            "Do you know where…? : pas d'inversion",
            R(
                "Dans une question indirecte, l'ordre redevient sujet, verbe : Where is the station? → Can you tell me where the station is?",
                [
                    "Plus de do, does, did : Where does he live? → Do you know where he lives?",
                    "Faux : Can you tell me where is the station? C'est l'erreur à éviter.",
                    "Les questions indirectes sont plus polies : Could you tell me…? Do you know…? I wonder…",
                ],
                [["Can you tell me where the station is?", "Pouvez-vous me dire où est la gare ?"], ["Do you know where he lives?", "Tu sais où il habite ?"]],
            ),
            [
                S("Can you tell me where the station is?", "Pouvez-vous me dire où est la gare ?", ["can you tell me", "where", "the station", "is"], focus=("the station is", INDIRECT, "Question indirecte : the station, puis is."), alt=["Could you tell me where the station is?"], meaning=["Pouvez-vous me montrer la gare sur le plan ?", "Pouvez-vous me dire quand part le train ?"]),
                S("Do you know where he lives?", "Tu sais où il habite ?", ["do you know", "where", "he", "lives"], focus=("he lives", INDIRECT, "Pas de does dans la question indirecte : he lives."), blank=("lives", "live", ["does live", "live"])),
                S("Where does he live?", "Où habite-t-il ?", ["where", "does", "he", "live"], focus=("does", DIRECT, "Question directe : does avant he."), blank=("live", "live", ["lives", "living"])),
                S("I don't know what time it is.", "Je ne sais pas quelle heure il est.", ["I", "don't", "know", "what time", "it", "is"], focus=("it is", INDIRECT, "Question indirecte : it, puis is."), meaning=["Je ne sais pas à quelle heure il arrive.", "Je sais quelle heure il est."]),
                S("Could you tell me how much this costs?", "Pourriez-vous me dire combien ça coûte ?", ["could you tell me", "how much", "this", "costs"], focus=("this costs", INDIRECT, "Pas de does : this costs."), blank=("costs", "cost", ["does cost", "cost"]), alt=["Can you tell me how much this costs?", "Could you tell me how much it costs?"]),
                S("I wonder what she bought.", "Je me demande ce qu'elle a acheté.", ["I wonder", "what", "she", "bought"], focus=("she bought", INDIRECT, "Pas de did : she bought."), blank=("bought", "buy", ["did buy", "buyed"]), meaning=["Je me demande où elle l'a acheté.", "Je sais ce qu'elle a acheté."]),
                S("Do you remember where I put my keys?", "Tu te rappelles où j'ai mis mes clés ?", ["do you remember", "where", "I", "put", "my keys"], focus=("I put", INDIRECT, "Pas de did : I put."), blank=("put", "put", ["did put", "putted"])),
                S("Where are my keys?", "Où sont mes clés ?", ["where", "are", "my keys"], focus=("are", DIRECT, "Question directe : are avant my keys."), blank=("are", "be", ["is", "do"])),
            ],
            {"prompt": "Quelle sorte de question ?", "options": [DIRECT, INDIRECT]},
        ),
        L(
            "if et whether : je ne sais pas si…",
            R(
                "Pour une question oui / non glissée dans une phrase, on emploie if ou whether (si) : I don't know if he will come.",
                [
                    "Ce if-là pose une question : will y est permis. I don't know if he will come (s'il viendra).",
                    "L'autre if pose une condition : en général, pas de will. If he comes, I'll be happy (s'il vient).",
                    "whether = if dans une question, un peu plus soutenu : I wonder whether they're still together.",
                    "Toujours sans inversion : She asked me if I was hungry.",
                ],
                [["I don't know if he will come.", "Je ne sais pas s'il viendra."], ["If he comes, I'll be happy.", "S'il vient, je serai content."]],
            ),
            [
                S("I don't know if he will come.", "Je ne sais pas s'il viendra.", ["I", "don't", "know", "if", "he", "will", "come"], focus=("if", ASKIF, "Je ne sais pas si… : une question, will est permis."), blank=("will", "will", ["would", "does"]), alt=["I don't know whether he will come.", "I don't know if he is coming.", "I don't know whether he is coming."], meaning=["S'il vient, je ne le saurai pas.", "Je ne sais pas s'il est venu."]),
                S("If he comes, I'll be happy.", "S'il vient, je serai content.", ["if", "he", "comes", "I'll be", "happy"], ["I'll be happy if he comes."], ("if", COND, "Une condition : présent après if."), ("comes", "come", ["will come", "came"]), SUB_FIRST, meaning=["Je ne sais pas s'il viendra.", "S'il venait, je serais content."]),
                S("Can you ask her if she needs anything?", "Tu peux lui demander si elle a besoin de quelque chose ?", ["can you ask her", "if", "she", "needs", "anything"], focus=("if", ASKIF, "Demander si… : une question."), blank=("needs", "need", ["does need", "need"]), alt=["Could you ask her if she needs anything?", "Can you ask her whether she needs anything?"]),
                S("I wonder whether they're still together.", "Je me demande s'ils sont toujours ensemble.", ["I wonder", "whether", "they're", "still", "together"], focus=("whether", ASKIF, "Je me demande si… : whether."), blank=("still", "toujours", ["always", "yet"]), alt=["I wonder if they're still together."], meaning=["Je sais qu'ils sont toujours ensemble.", "Je me demande s'ils se sont mariés."]),
                S("If you don't hurry, you'll be late.", "Si tu ne te dépêches pas, tu seras en retard.", ["if", "you", "don't", "hurry", "you'll be", "late"], ["You'll be late if you don't hurry."], ("if", COND, "Une condition : présent après if."), ("hurry", "hurry", ["will hurry", "hurries"]), SUB_FIRST, alt=["Unless you hurry, you'll be late."]),
                S("Do you know if the museum is open on Mondays?", "Tu sais si le musée est ouvert le lundi ?", ["do you know", "if", "the museum", "is", "open", "on Mondays"], focus=("if", ASKIF, "Tu sais si… : une question."), blank=("is", "be", ["are", "does"]), alt=["Do you know whether the museum is open on Mondays?"]),
                S("She asked me if I was hungry.", "Elle m'a demandé si j'avais faim.", ["she", "asked", "me", "if", "I", "was", "hungry"], focus=("if", ASKIF, "Demander si… : une question, sans inversion."), blank=("was", "be", ["am", "had"]), alt=["She asked me whether I was hungry."], meaning=["Elle m'a dit qu'elle avait faim.", "Je lui ai demandé si elle avait faim."]),
            ],
            {"prompt": "Que fait if / whether ici ?", "options": [COND, ASKIF]},
        ),
    ],
}

TRACK = make_track(
    "en-phrase",
    "Phrases complexes",
    "De la phrase simple aux longues phrases : l'ordre des mots, les questions, la négation, puis relier et emboîter les propositions. Construire et comprendre.",
    [unit1, unit2, unit3, unit4, unit5, unit6],
)
