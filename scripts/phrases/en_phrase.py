"""The English « complex sentences » track: from the simple sentence (word order, questions, a single negation) to
joining sentences (and, but, or, so, because) and the first subordinate clauses (when / if with the present, although,
before / after / until / while, that), then indirect questions, relative clauses, conditions, to or -ing and the passive. Linking words
and long real sentences come next."""
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

# ---------------------------------------------------------------- Unit 7: relative clauses
PERS = "à une personne : who (ou that)"
THING = "à une chose : which (ou that)"
OBJ_REL = "oui : il est complément (un sujet le suit)"
SUBJ_REL = "non : il est sujet (le verbe le suit)"
PREP_END2 = "la préposition, renvoyée à la fin"
WHERE_ = "where : un lieu (où)"
WHOSE = "whose : dont (à qui appartient…)"
ESSENTIAL = "sans virgules : elle dit de qui ou de quoi on parle"
EXTRA = "entre virgules : une information en plus"
WHOLE = "which : reprend toute la phrase (ce qui)"

unit7 = {
    "title": "Les relatives",
    "level": "B1",
    "hint": "Le « qui » et le « que » français deviennent who, which ou that ; le « que » disparaît souvent. La préposition, elle, part à la fin.",
    "lessons": [
        L(
            "who pour une personne, which pour une chose",
            R(
                "who renvoie à une personne, which à une chose. that peut remplacer les deux, surtout à l'oral.",
                [
                    "The woman who lives next door… (la femme qui…). The book which you gave me… (le livre que…).",
                    "Qui et que se disent pareil : who, which ou that, qu'ils soient sujet ou complément.",
                    "Pas de pronom en plus : the book which you gave me (pas which you gave it to me).",
                ],
                [["The woman who lives next door is a doctor.", "La femme qui habite à côté est médecin."], ["I lost the book which you gave me.", "J'ai perdu le livre que tu m'as donné."]],
            ),
            [
                S("The woman who lives next door is a doctor.", "La femme qui habite à côté est médecin.", ["the woman", "who", "lives", "next door", "is", "a doctor"], focus=("who", PERS, "Who renvoie à the woman."), blank=("lives", "live", ["live", "living"]), alt=["The woman that lives next door is a doctor."], meaning=["La femme du médecin habite à côté.", "Le médecin habite à côté de chez cette femme."], combine=(["The woman lives next door.", "She is a doctor."], "who")),
                S("I lost the book which you gave me.", "J'ai perdu le livre que tu m'as donné.", ["I", "lost", "the book", "which", "you", "gave", "me"], focus=("which", THING, "Which renvoie à the book."), blank=("gave", "give", ["give", "gived"]), alt=["I lost the book that you gave me.", "I lost the book you gave me.", "I've lost the book you gave me.", "I've lost the book that you gave me.", "I've lost the book which you gave me."], meaning=["Tu as perdu le livre que je t'ai donné.", "J'ai retrouvé le livre que tu m'as donné."], combine=(["I lost the book.", "You gave it to me."], "which")),
                S("Do you know the man who is talking to Anna over there?", "Tu connais l'homme qui parle à Anna, là-bas ?", ["do you know", "the man", "who", "is talking", "to Anna", "over there"], focus=("who", PERS, "Who renvoie à the man."), blank=("is talking", "talk", ["talks", "is talk"]), alt=["Do you know the man that is talking to Anna over there?"], meaning=["Tu connais l'homme dont Anna parle, là-bas ?", "Anna connaît l'homme qui te parle, là-bas ?"]),
                S("This is the train which goes to Oxford.", "C'est le train qui va à Oxford.", ["this is", "the train", "which", "goes", "to Oxford"], focus=("which", THING, "Which renvoie à the train."), blank=("goes", "go", ["go", "going"]), alt=["This is the train that goes to Oxford."]),
                S("The people who work here are very friendly.", "Les gens qui travaillent ici sont très sympathiques.", ["the people", "who", "work", "here", "are", "very friendly"], focus=("who", PERS, "Who renvoie à the people."), blank=("work", "work", ["works", "working"]), alt=["The people that work here are very friendly.", "The people who work here are very nice."], meaning=["Les gens sont très sympathiques, mais ils ne travaillent pas ici.", "Les gens qui travaillent ici ne sont pas aimables."], combine=(["The people work here.", "They are very friendly."], "who")),
                S("I need a bag which is big enough for my laptop.", "J'ai besoin d'un sac assez grand pour mon ordinateur.", ["I", "need", "a bag", "which", "is", "big enough", "for my laptop"], focus=("which", THING, "Which renvoie à a bag."), blank=("big enough", "assez grand", ["enough big", "big enought"]), alt=["I need a bag that is big enough for my laptop.", "I need a bag big enough for my laptop."]),
                S("She was the teacher who helped me the most.", "C'était la professeure qui m'a le plus aidé.", ["she was", "the teacher", "who", "helped", "me", "the most"], focus=("who", PERS, "Who renvoie à the teacher."), blank=("helped", "help", ["helping", "helps"]), alt=["She was the teacher that helped me the most.", "She was the teacher who helped me most."]),
            ],
            {"prompt": "À quoi renvoie le mot surligné ?", "options": [PERS, THING]},
        ),
        L(
            "The film we saw : sans that",
            R(
                "Quand who, which ou that est complément (un sujet le suit), on peut l'enlever : the film (that) we saw.",
                [
                    "C'est très courant à l'oral : the pizza we ordered, everything you said.",
                    "Quand il est sujet (le verbe le suit), on le garde : the man who called you.",
                    "Pour savoir : regarde le mot d'après. Un sujet (we, you, my sister…) ? On peut l'enlever. Un verbe ? On le garde.",
                ],
                [["The film that we saw was great.", "Le film que nous avons vu était génial."], ["The man who called you is here.", "L'homme qui t'a appelé est là."]],
            ),
            [
                S("The film that we saw was great.", "Le film que nous avons vu était génial.", ["the film", "that", "we", "saw", "was", "great"], focus=("that", OBJ_REL, "We le suit : on peut l'enlever."), blank=("saw", "see", ["seen", "have seen"]), alt=["The film we saw was great.", "The movie we saw was great.", "The film which we saw was great.", "The movie that we saw was great."], meaning=["Le film que nous allons voir a l'air génial.", "Nous avons vu un film qui n'était pas génial."]),
                S("The man who called you is here.", "L'homme qui t'a appelé est là.", ["the man", "who", "called", "you", "is", "here"], focus=("who", SUBJ_REL, "Called le suit : il est sujet, on le garde."), blank=("called", "call", ["call", "calling"]), alt=["The man that called you is here."], meaning=["L'homme que tu as appelé est là.", "L'homme qui t'appelle n'est pas là."]),
                S("Is this the key you were looking for?", "C'est la clé que tu cherchais ?", ["is this", "the key", "you", "were looking", "for"], focus=("you were looking for", OBJ_REL, "You suit the key : le that a déjà été enlevé."), blank=("were looking", "look", ["was looking", "are looking"]), alt=["Is this the key that you were looking for?", "Is this the key which you were looking for?"]),
                S("The girl who won the race is my cousin.", "La fille qui a gagné la course est ma cousine.", ["the girl", "who", "won", "the race", "is", "my cousin"], focus=("who", SUBJ_REL, "Won le suit : il est sujet, on le garde."), blank=("won", "win", ["winned", "wins"]), alt=["The girl that won the race is my cousin."], combine=(["The girl won the race.", "She is my cousin."], "who")),
                S("Everything you said is true.", "Tout ce que tu as dit est vrai.", ["everything", "you", "said", "is", "true"], focus=("you said", OBJ_REL, "You suit everything : le that a été enlevé."), blank=("is", "be", ["are", "be"]), alt=["Everything you've said is true.", "Everything that you said is true.", "All you said is true."], meaning=["Tout ce qu'on t'a dit est vrai.", "Rien de ce que tu as dit n'est vrai."]),
                S("I met someone who knows your brother.", "J'ai rencontré quelqu'un qui connaît ton frère.", ["I", "met", "someone", "who", "knows", "your brother"], focus=("who", SUBJ_REL, "Knows le suit : il est sujet, on le garde."), blank=("knows", "know", ["know", "is knowing"]), alt=["I met someone that knows your brother."], meaning=["J'ai rencontré quelqu'un que ton frère connaît.", "Ton frère m'a présenté quelqu'un."]),
                S("The pizza we ordered was cold.", "La pizza que nous avons commandée était froide.", ["the pizza", "we", "ordered", "was", "cold"], focus=("we ordered", OBJ_REL, "We suit the pizza : le that a été enlevé."), blank=("ordered", "order", ["have ordered", "order"]), alt=["The pizza that we ordered was cold.", "The pizza which we ordered was cold."]),
            ],
            {"prompt": "Peut-on enlever who / that ici ?", "options": [OBJ_REL, SUBJ_REL]},
        ),
        L(
            "The man I talked to, where, whose",
            R(
                "« L'homme à qui j'ai parlé » : la préposition part à la fin. The man (that) I talked to.",
                [
                    "where pour un lieu : the town where I was born (= the town I was born in).",
                    "whose = dont, pour ce qui appartient à quelqu'un : the woman whose car was stolen.",
                    "whose (dont) ≠ who's (who is / who has).",
                ],
                [["That's the man I talked to.", "C'est l'homme à qui j'ai parlé."], ["I have a friend whose father is a pilot.", "J'ai un ami dont le père est pilote."]],
            ),
            [
                S("That's the man I talked to.", "C'est l'homme à qui j'ai parlé.", ["that's", "the man", "I", "talked", "to"], focus=("to", PREP_END2, "À qui → … to, à la fin."), blank=("to", "à", ["at", "for"]), alt=["That's the man that I talked to.", "That's the man who I talked to.", "That's the man I spoke to.", "That's the man I was talking to."], meaning=["C'est l'homme qui m'a parlé.", "C'est l'homme dont je t'ai parlé."]),
                S("This is the town where I was born.", "C'est la ville où je suis né.", ["this is", "the town", "where", "I", "was born"], focus=("where", WHERE_, "Un lieu : where."), blank=("was born", "naître", ["am born", "born"]), alt=["This is the town that I was born in.", "This is the town I was born in.", "This is the city where I was born."], meaning=["C'est la ville où je vis.", "C'est la ville où ma mère est née."]),
                S("I have a friend whose father is a pilot.", "J'ai un ami dont le père est pilote.", ["I", "have", "a friend", "whose", "father", "is", "a pilot"], focus=("whose", WHOSE, "Le père de mon ami : whose."), blank=("whose", "dont", ["who's", "which"]), meaning=["Mon père a un ami pilote.", "J'ai un ami qui veut devenir pilote."]),
                S("The hotel we stayed at was near the beach.", "L'hôtel où nous avons logé était près de la plage.", ["the hotel", "we", "stayed", "at", "was", "near the beach"], focus=("at", PREP_END2, "Stay at : at reste à la fin."), blank=("stayed", "stay", ["have stayed", "stay"]), alt=["The hotel where we stayed was near the beach.", "The hotel that we stayed at was near the beach.", "The hotel we stayed in was near the beach."]),
                S("Do you remember the café where we first met?", "Tu te rappelles le café où on s'est rencontrés ?", ["do you remember", "the café", "where", "we", "first", "met"], focus=("where", WHERE_, "Un lieu : where."), blank=("met", "meet", ["have met", "meet"]), alt=["Do you remember the café where we met for the first time?", "Do you remember the café where we met?"]),
                S("She's the woman whose car was stolen last night.", "C'est la femme dont la voiture a été volée hier soir.", ["she's", "the woman", "whose", "car", "was stolen", "last night"], focus=("whose", WHOSE, "La voiture de cette femme : whose."), blank=("was stolen", "steal", ["was stealing", "stole"]), meaning=["C'est la femme qui a volé la voiture hier soir.", "C'est la femme dont la voiture est tombée en panne hier soir."]),
                S("Is that the music you were listening to?", "C'est la musique que tu écoutais ?", ["is that", "the music", "you", "were listening", "to"], focus=("to", PREP_END2, "Listen to : to reste à la fin."), blank=("were listening", "listen", ["was listening", "are listening"]), alt=["Is that the music that you were listening to?"]),
            ],
            {"prompt": "Que fait le mot surligné ?", "options": [PREP_END2, WHERE_, WHOSE]},
        ),
        L(
            "Entre virgules : une information en plus",
            R(
                "Sans virgules, la relative dit de qui on parle : the students who passed (seulement ceux-là). Entre virgules, elle ajoute une information : My brother, who lives in Paris, is a cook.",
                [
                    "Entre virgules, pas de that et on ne peut pas enlever who ou which.",
                    "which peut reprendre toute la phrase, comme « ce qui » : He didn't call me, which is strange.",
                    "where marche aussi entre virgules : We visited Oxford, where my sister studies.",
                ],
                [["My brother, who lives in Paris, is a cook.", "Mon frère, qui habite à Paris, est cuisinier."], ["He didn't call me, which is strange.", "Il ne m'a pas appelé, ce qui est bizarre."]],
            ),
            [
                S("My brother, who lives in Paris, is a cook.", "Mon frère, qui habite à Paris, est cuisinier.", ["my brother", "who", "lives", "in Paris", "is", "a cook"], focus=("who", EXTRA, "Une information en plus sur mon frère."), blank=("lives", "live", ["live", "living"]), meaning=["Mon frère habite à Paris chez un cuisinier.", "Mon frère cuisine pour des gens qui habitent à Paris."], combine=(["My brother lives in Paris.", "He is a cook."], "who")),
                S("He didn't call me, which is strange.", "Il ne m'a pas appelé, ce qui est bizarre.", ["he", "didn't", "call", "me", "which", "is", "strange"], focus=("which", WHOLE, "Which reprend toute la phrase : ce qui."), blank=("which", "ce qui", ["what", "that"]), alt=["He didn't call me, which is weird."], meaning=["Il ne m'a pas appelé, c'est normal.", "C'est bizarre qu'il m'ait appelé."]),
                S("The Eiffel Tower, which was built in 1889, is in Paris.", "La tour Eiffel, qui a été construite en 1889, est à Paris.", ["the Eiffel Tower", "which", "was built", "in 1889", "is", "in Paris"], focus=("which", EXTRA, "Une information en plus sur la tour Eiffel."), blank=("was built", "build", ["was build", "built"]), alt=["The Eiffel Tower, built in 1889, is in Paris."]),
                S("The students who passed the exam can go home.", "Les élèves qui ont réussi l'examen peuvent rentrer.", ["the students", "who", "passed", "the exam", "can", "go home"], focus=("who", ESSENTIAL, "Sans virgules : seulement ceux qui ont réussi."), blank=("can", "pouvoir", ["cans", "can to"]), alt=["The students who have passed the exam can go home.", "The students that passed the exam can go home."], meaning=["Tous les élèves ont réussi l'examen et peuvent rentrer.", "Les élèves peuvent rentrer avant l'examen."]),
                S("We visited Oxford, where my sister studies.", "Nous avons visité Oxford, où ma sœur fait ses études.", ["we", "visited", "Oxford", "where", "my sister", "studies"], focus=("where", EXTRA, "Une information en plus sur Oxford."), blank=("where", "où", ["which", "that"]), alt=["We visited Oxford, where my sister is studying."]),
                S("It rained all week, which ruined our holiday.", "Il a plu toute la semaine, ce qui a gâché nos vacances.", ["it", "rained", "all week", "which", "ruined", "our holiday"], focus=("which", WHOLE, "Which reprend toute la phrase : ce qui."), blank=("ruined", "ruin", ["ruins", "ruin"]), alt=["It rained all week, which ruined our vacation.", "It rained all week, which spoiled our holiday."], meaning=["Il a plu toute la semaine, mais nos vacances étaient réussies.", "Nos vacances ont été gâchées par une semaine de travail."], combine=(["It rained all week.", "That ruined our holiday."], "which")),
                S("The people who live upstairs are very noisy.", "Les gens qui habitent au-dessus sont très bruyants.", ["the people", "who", "live", "upstairs", "are", "very noisy"], focus=("who", ESSENTIAL, "Sans virgules : on dit de quels gens on parle."), blank=("live", "live", ["lives", "living"]), alt=["The people that live upstairs are very noisy."]),
            ],
            {"prompt": "Que fait la relative ?", "options": [ESSENTIAL, EXTRA, WHOLE]},
        ),
    ],
}

# ---------------------------------------------------------------- Unit 8: conditionals
GENERAL = "toujours vrai : if + présent, présent"
REAL = "possible : if + présent, will"
UNREAL = "imaginaire : if + prétérit, would"
PAST_UNREAL = "le passé qui n'a pas eu lieu : if + had + participe, would have"
UNLESS = "unless : sauf si (si… ne… pas)"
ASLONG = "as long as : à condition que"
INCASE = "in case : au cas où"

unit8 = {
    "title": "Les conditions",
    "level": "B1",
    "hint": "Le temps après if dit si la chose est possible, imaginaire ou déjà ratée. Pas de would juste après if pour imaginer.",
    "lessons": [
        L(
            "if + présent : toujours vrai, ou possible",
            R(
                "if + présent, puis présent : ce qui arrive à chaque fois. If you heat ice, it melts.",
                [
                    "if + présent, puis will : une chose possible, dans l'avenir. If it's sunny tomorrow, we'll go to the beach.",
                    "Jamais will juste après if (quand if pose une condition).",
                    "Le français fait pareil : si + présent, puis présent ou futur.",
                ],
                [["If you heat ice, it melts.", "Si on chauffe de la glace, elle fond."], ["If it's sunny tomorrow, we'll go to the beach.", "S'il fait beau demain, nous irons à la plage."]],
            ),
            [
                S("If you heat ice, it melts.", "Si on chauffe de la glace, elle fond.", ["if", "you", "heat", "ice", "it", "melts"], focus=("melts", GENERAL, "Ça arrive à chaque fois : présent des deux côtés."), blank=("heat", "heat", ["will heat", "heated"]), alt=["Ice melts if you heat it.", "If you heat ice, it will melt."]),
                S("If you press this button, the door opens.", "Si on appuie sur ce bouton, la porte s'ouvre.", ["if", "you", "press", "this button", "the door", "opens"], ["The door opens if you press this button."], ("opens", GENERAL, "À chaque fois : présent des deux côtés."), ("press", "press", ["will press", "pressed"]), SUB_FIRST, alt=["If you press this button, the door will open."]),
                S("If it's sunny tomorrow, we'll go to the beach.", "S'il fait beau demain, nous irons à la plage.", ["if", "it's", "sunny", "tomorrow", "we'll go", "to the beach"], ["We'll go to the beach if it's sunny tomorrow."], ("we'll go", REAL, "Une chose possible demain : will."), ("it's", "be", ["it will be", "it was"]), SUB_FIRST, alt=["If the weather is nice tomorrow, we'll go to the beach.", "If it's sunny tomorrow, we're going to go to the beach."], meaning=["S'il faisait beau demain, nous irions à la plage.", "Il fait beau, alors nous allons à la plage."]),
                S("If you mix blue and yellow, you get green.", "Si on mélange du bleu et du jaune, on obtient du vert.", ["if", "you", "mix", "blue and yellow", "you", "get", "green"], why_order=SUB_FIRST, focus=("get", GENERAL, "Toujours vrai : présent des deux côtés."), blank=("mix", "mix", ["will mix", "mixed"]), meaning=["Si on mélange du bleu et du vert, on obtient du jaune.", "Pour obtenir du bleu, on mélange du jaune et du vert."], alt=["You get green if you mix blue and yellow."]),
                S("If you don't eat, you'll be hungry later.", "Si tu ne manges pas, tu auras faim plus tard.", ["if", "you", "don't", "eat", "you'll be", "hungry", "later"], why_order=SUB_FIRST, focus=("you'll be", REAL, "Une chose possible plus tard : will."), blank=("eat", "eat", ["will eat", "ate"]), alt=["You'll be hungry later if you don't eat."]),
                S("If I miss the bus, I walk to work.", "Si je rate le bus, je vais au travail à pied.", ["if", "I", "miss", "the bus", "I", "walk", "to work"], why_order=SUB_FIRST, focus=("walk", GENERAL, "Chaque fois que ça arrive : présent des deux côtés."), blank=("miss", "miss", ["will miss", "missed"]), alt=["I walk to work if I miss the bus.", "When I miss the bus, I walk to work."], meaning=["Si je ratais le bus, j'irais au travail à pied.", "J'ai raté le bus, alors je suis allé au travail à pied."]),
                S("If he calls, I'll tell you.", "S'il appelle, je te le dirai.", ["if", "he", "calls", "I'll tell", "you"], ["I'll tell you if he calls."], ("I'll tell", REAL, "Une chose possible : will."), ("calls", "call", ["will call", "called"]), SUB_FIRST),
            ],
            {"prompt": "Que dit la phrase ?", "options": [GENERAL, REAL]},
        ),
        L(
            "if + prétérit, would : imaginer",
            R(
                "Pour imaginer : if + prétérit, puis would + verbe. If I had more time, I would learn Japanese.",
                [
                    "Le français dit « si j'avais… j'apprendrais » ; l'anglais met le prétérit après if, pas would (would après if ne sert que par politesse : if you would like…).",
                    "If I were you : si j'étais toi, pour donner un conseil (If I was you se dit aussi à l'oral).",
                    "would se contracte en 'd : I'd call her.",
                ],
                [["If I had more time, I would learn Japanese.", "Si j'avais plus de temps, j'apprendrais le japonais."], ["If I were you, I would call her.", "Si j'étais toi, je l'appellerais."]],
            ),
            [
                S("If I had more time, I would learn Japanese.", "Si j'avais plus de temps, j'apprendrais le japonais.", ["if", "I", "had", "more time", "I", "would learn", "Japanese"], ["I would learn Japanese if I had more time."], ("would learn", UNREAL, "On imagine : would."), ("had", "have", ["would have", "have"]), SUB_FIRST, meaning=["Si j'ai plus de temps, j'apprendrai le japonais.", "Si j'avais eu plus de temps, j'aurais appris le japonais."]),
                S("If I were you, I would call her.", "Si j'étais toi, je l'appellerais.", ["if", "I", "were", "you", "I", "would call", "her"], ["I would call her if I were you."], ("would call", UNREAL, "Un conseil, en imaginant : would."), ("would call", "call", ["will call", "called"]), SUB_FIRST, alt=["If I was you, I would call her."]),
                S("If we lived by the sea, we would go swimming every day.", "Si nous habitions au bord de la mer, nous irions nager tous les jours.", ["if", "we", "lived", "by the sea", "we", "would go", "swimming", "every day"], focus=("lived", UNREAL, "Nous n'y habitons pas : on imagine, prétérit après if."), blank=("lived", "live", ["would live", "live"]), alt=["If we lived near the sea, we would go swimming every day.", "We would go swimming every day if we lived by the sea."], meaning=["Nous habitons au bord de la mer, alors nous nageons tous les jours.", "Si nous habitons au bord de la mer, nous irons nager tous les jours."]),
                S("If you need money, I'll lend you some.", "Si tu as besoin d'argent, je t'en prêterai.", ["if", "you", "need", "money", "I'll lend", "you", "some"], why_order=SUB_FIRST, focus=("I'll lend", REAL, "Une chose possible : will."), blank=("need", "need", ["needed", "will need"]), alt=["I'll lend you some if you need money."]),
                S("What would you do if you won the lottery?", "Que ferais-tu si tu gagnais au loto ?", ["what", "would", "you", "do", "if", "you", "won", "the lottery"], focus=("won", UNREAL, "On imagine : prétérit après if."), blank=("won", "win", ["would win", "win"]), why_order=SUB_FIRST, alt=["If you won the lottery, what would you do?"], meaning=["Qu'as-tu fait quand tu as gagné au loto ?", "Que feras-tu si tu gagnes au loto ?"]),
                S("If it stops raining, we'll go out.", "S'il arrête de pleuvoir, nous sortirons.", ["if", "it", "stops", "raining", "we'll go out"], ["We'll go out if it stops raining."], ("we'll go out", REAL, "Une chose possible : will."), ("stops", "stop", ["will stop", "stopped"]), SUB_FIRST),
                S("She would be happier if she had a dog.", "Elle serait plus heureuse si elle avait un chien.", ["she", "would be", "happier", "if", "she", "had", "a dog"], focus=("would be", UNREAL, "Elle n'a pas de chien : on imagine, would."), blank=("had", "have", ["would have", "has"]), why_order=SUB_FIRST, alt=["If she had a dog, she would be happier."], meaning=["Elle est plus heureuse depuis qu'elle a un chien.", "Elle serait plus heureuse sans son chien."]),
            ],
            {"prompt": "Que dit la phrase ?", "options": [REAL, UNREAL]},
        ),
        L(
            "if + had + participe : le passé qui n'a pas eu lieu",
            R(
                "Pour un passé qu'on imagine autrement : if + had + participe, puis would have + participe. If I had known, I would have come.",
                [
                    "Le français dit « si j'avais su, je serais venu » : même logique, avec had et would have.",
                    "On s'en sert pour regretter ou reprocher : If you had told me, I would have helped you.",
                    "'d peut vouloir dire had ou would : If I'd known, I'd have come.",
                ],
                [["If I had known, I would have come.", "Si j'avais su, je serais venu."], ["She would have passed if she had studied.", "Elle aurait réussi si elle avait révisé."]],
            ),
            [
                S("If I had known, I would have come.", "Si j'avais su, je serais venu.", ["if", "I", "had known", "I", "would have come"], ["I would have come if I had known."], ("would have come", PAST_UNREAL, "Je ne suis pas venu : would have."), ("had known", "know", ["would have known", "knew"]), SUB_FIRST, meaning=["Si je savais, je viendrais.", "Je savais, mais je ne suis pas venu."]),
                S("If we had left earlier, we wouldn't have missed the train.", "Si nous étions partis plus tôt, nous n'aurions pas raté le train.", ["if", "we", "had left", "earlier", "we", "wouldn't have missed", "the train"], ["We wouldn't have missed the train if we had left earlier."], ("had left", PAST_UNREAL, "Nous ne sommes pas partis tôt : had left."), ("had left", "leave", ["left", "would have left"]), SUB_FIRST, meaning=["Nous sommes partis tôt, mais nous avons raté le train.", "Si nous partons plus tôt, nous ne raterons pas le train."]),
                S("If I had more money, I would buy a bigger flat.", "Si j'avais plus d'argent, j'achèterais un appartement plus grand.", ["if", "I", "had", "more money", "I", "would buy", "a bigger flat"], ["I would buy a bigger flat if I had more money."], ("would buy", UNREAL, "Aujourd'hui, en imaginant : would."), ("would buy", "buy", ["will buy", "would bought"]), SUB_FIRST, alt=["If I had more money, I would buy a bigger apartment."]),
                S("She would have passed if she had studied.", "Elle aurait réussi si elle avait révisé.", ["she", "would have passed", "if", "she", "had studied"], focus=("had studied", PAST_UNREAL, "Elle n'a pas révisé : had studied."), blank=("would have passed", "pass", ["will have passed", "would have pass"]), why_order=SUB_FIRST, alt=["If she had studied, she would have passed.", "She would have passed if she had revised."], meaning=["Elle a réussi parce qu'elle avait révisé.", "Elle réussira si elle révise."]),
                S("It would have been easier if you had helped me.", "Ça aurait été plus facile si tu m'avais aidé.", ["it", "would have been", "easier", "if", "you", "had helped", "me"], focus=("would have been", PAST_UNREAL, "Tu ne m'as pas aidé : would have been."), blank=("had helped", "help", ["helped", "would help"]), why_order=SUB_FIRST, alt=["If you had helped me, it would have been easier."]),
                S("If I had seen you, I would have said hello.", "Si je t'avais vu, je t'aurais dit bonjour.", ["if", "I", "had seen", "you", "I", "would have said", "hello"], ["I would have said hello if I had seen you."], ("had seen", PAST_UNREAL, "Je ne t'ai pas vu : had seen."), ("had seen", "see", ["saw", "would have seen"]), SUB_FIRST),
                S("If she spoke English, she would get the job.", "Si elle parlait anglais, elle aurait le poste.", ["if", "she", "spoke", "English", "she", "would get", "the job"], ["She would get the job if she spoke English."], ("spoke", UNREAL, "Aujourd'hui, en imaginant : prétérit après if."), ("spoke", "speak", ["would speak", "speaks"]), SUB_FIRST, meaning=["Si elle avait parlé anglais, elle aurait eu le poste.", "Elle parle anglais, alors elle a eu le poste."]),
            ],
            {"prompt": "Que dit la phrase ?", "options": [UNREAL, PAST_UNREAL]},
        ),
        L(
            "unless, as long as, in case",
            R(
                "D'autres mots posent une condition, toujours avec le présent pour le futur.",
                [
                    "unless = sauf si, si… ne… pas : We'll miss the bus unless we hurry (si nous ne nous dépêchons pas).",
                    "unless contient déjà la négation : unless we hurry = if we don't hurry (on ne dit pas unless we don't hurry dans ce sens).",
                    "as long as = à condition que : You can borrow my car as long as you're careful.",
                    "in case = au cas où, par précaution : Take an umbrella in case it rains. Ce n'est pas if : on le prend même s'il ne pleut pas.",
                ],
                [["We'll miss the bus unless we hurry.", "Nous allons rater le bus si nous ne nous dépêchons pas."], ["Take an umbrella in case it rains.", "Prends un parapluie au cas où il pleuvrait."]],
            ),
            [
                S("We'll miss the bus unless we hurry.", "Nous allons rater le bus si nous ne nous dépêchons pas.", ["we'll miss", "the bus", "unless", "we", "hurry"], focus=("unless", UNLESS, "Si nous ne nous dépêchons pas : unless."), blank=("hurry", "hurry", ["will hurry", "don't hurry"]), why_order=SUB_FIRST, alt=["Unless we hurry, we'll miss the bus.", "We'll miss the bus if we don't hurry."], meaning=["Nous allons rater le bus même si nous nous dépêchons.", "Nous avons raté le bus parce que nous ne nous sommes pas dépêchés."]),
                S("You can borrow my car as long as you're careful.", "Tu peux emprunter ma voiture à condition de faire attention.", ["you", "can borrow", "my car", "as long as", "you're", "careful"], why_order=SUB_FIRST, focus=("as long as", ASLONG, "À condition de : as long as."), blank=("can borrow", "borrow", ["can to borrow", "can borrowing"]), alt=["As long as you're careful, you can borrow my car.", "You can borrow my car if you're careful.", "You can borrow my car provided you're careful."], meaning=["Tu peux emprunter ma voiture aussi longtemps que tu veux.", "Fais attention, ma voiture est empruntée."]),
                S("Take an umbrella in case it rains.", "Prends un parapluie au cas où il pleuvrait.", ["take", "an umbrella", "in case", "it", "rains"], why_order=SUB_FIRST, focus=("in case", INCASE, "Par précaution : in case."), blank=("rains", "rain", ["will rain", "would rain"]), meaning=["Prends un parapluie s'il pleut.", "Il pleut : prends un parapluie."], alt=["In case it rains, take an umbrella."]),
                S("I won't go unless you come with me.", "Je n'irai pas si tu ne viens pas avec moi.", ["I", "won't go", "unless", "you", "come", "with me"], focus=("unless", UNLESS, "Si tu ne viens pas : unless."), blank=("come", "come", ["will come", "don't come"]), why_order=SUB_FIRST, alt=["Unless you come with me, I won't go.", "I won't go if you don't come with me."]),
                S("Write down my number in case you need help.", "Note mon numéro au cas où tu aurais besoin d'aide.", ["write down", "my number", "in case", "you", "need", "help"], focus=("in case", INCASE, "Par précaution : in case."), blank=("need", "need", ["will need", "would need"]), alt=["Write my number down in case you need help.", "Take my number in case you need help."]),
                S("I'll help you as long as you help me too.", "Je t'aiderai à condition que tu m'aides aussi.", ["I'll help", "you", "as long as", "you", "help", "me", "too"], focus=("as long as", ASLONG, "À condition que : as long as."), blank=("I'll help", "help", ["I help", "I'd help"]), alt=["I'll help you if you help me too."]),
                S("Don't call me unless it's urgent.", "Ne m'appelle pas sauf si c'est urgent.", ["don't call", "me", "unless", "it's", "urgent"], why_order=SUB_FIRST, focus=("unless", UNLESS, "Sauf si : unless."), blank=("it's", "be", ["it isn't", "it will be"]), alt=["Unless it's urgent, don't call me.", "Don't call me if it isn't urgent.", "Only call me if it's urgent."], meaning=["Appelle-moi seulement si ce n'est pas urgent.", "Ne m'appelle pas, c'est urgent."]),
            ],
            {"prompt": "Que dit le groupe surligné ?", "options": [UNLESS, ASLONG, INCASE]},
        ),
        L(
            "Tout ensemble : possible, imaginaire ou passé",
            R(
                "Trois façons de poser une condition, selon ce qu'on pense de la situation.",
                [
                    "Possible : If I find your keys, I'll call you.",
                    "Imaginaire : If I found a wallet, I would take it to the police.",
                    "Passé raté : If you had told me, I would have helped you.",
                ],
                [["If I find your keys, I'll call you.", "Si je trouve tes clés, je t'appellerai."], ["If you had told me, I would have helped you.", "Si tu me l'avais dit, je t'aurais aidé."]],
            ),
            [
                S("If I find your keys, I'll call you.", "Si je trouve tes clés, je t'appellerai.", ["if", "I", "find", "your keys", "I'll call", "you"], ["I'll call you if I find your keys."], ("I'll call", REAL, "Une chose possible : will."), ("find", "find", ["will find", "found"]), SUB_FIRST),
                S("If I found a wallet in the street, I would take it to the police.", "Si je trouvais un portefeuille dans la rue, je l'apporterais à la police.", ["if", "I", "found", "a wallet", "in the street", "I", "would take", "it", "to the police"], focus=("found", UNREAL, "On imagine : prétérit après if."), blank=("would take", "take", ["will take", "would took"]), meaning=["J'ai trouvé un portefeuille et je l'ai apporté à la police.", "Si j'avais trouvé un portefeuille, je l'aurais apporté à la police."]),
                S("If you had told me, I would have helped you.", "Si tu me l'avais dit, je t'aurais aidé.", ["if", "you", "had told", "me", "I", "would have helped", "you"], ["I would have helped you if you had told me."], ("had told", PAST_UNREAL, "Tu ne me l'as pas dit : had told."), ("had told", "tell", ["told", "would tell"]), SUB_FIRST, meaning=["Si tu me le dis, je t'aiderai.", "Tu me l'as dit, mais je ne t'ai pas aidé."]),
                S("If I were rich, I wouldn't work.", "Si j'étais riche, je ne travaillerais pas.", ["if", "I", "were", "rich", "I", "wouldn't work"], ["I wouldn't work if I were rich."], ("wouldn't work", UNREAL, "On imagine : would."), ("wouldn't work", "work", ["won't work", "wouldn't worked"]), SUB_FIRST, alt=["If I was rich, I wouldn't work."]),
                S("We would have won if our goalkeeper hadn't been injured.", "Nous aurions gagné si notre gardien n'avait pas été blessé.", ["we", "would have won", "if", "our goalkeeper", "hadn't been", "injured"], focus=("hadn't been", PAST_UNREAL, "Il a été blessé : hadn't been."), blank=("would have won", "win", ["will have won", "would have win"]), why_order=SUB_FIRST, alt=["If our goalkeeper hadn't been injured, we would have won."]),
                S("If the weather is bad, the match will be cancelled.", "S'il fait mauvais, le match sera annulé.", ["if", "the weather", "is", "bad", "the match", "will be cancelled"], focus=("will be cancelled", REAL, "Une chose possible : will."), blank=("is", "be", ["will be", "was"]), why_order=SUB_FIRST, alt=["The match will be cancelled if the weather is bad.", "If the weather is bad, the game will be canceled."]),
                S("I would have called you if I hadn't lost my phone.", "Je t'aurais appelé si je n'avais pas perdu mon téléphone.", ["I", "would have called", "you", "if", "I", "hadn't lost", "my phone"], focus=("hadn't lost", PAST_UNREAL, "J'ai perdu mon téléphone : hadn't lost."), blank=("hadn't lost", "lose", ["didn't lose", "wouldn't have lost"]), why_order=SUB_FIRST, alt=["If I hadn't lost my phone, I would have called you."], meaning=["Je t'ai appelé, mais j'ai perdu mon téléphone.", "Je t'appellerai si je retrouve mon téléphone."]),
            ],
            {"prompt": "Que dit la phrase ?", "options": [REAL, UNREAL, PAST_UNREAL]},
        ),
    ],
}

# ---------------------------------------------------------------- Unit 9: to or -ing
PURPOSE = "to + verbe : le but (pour)"
DEST = "to + lieu : la destination (où ?)"
DOER_SUBJ = "le sujet de la phrase"
DOER_OBJ = "la personne juste avant to"
ING_VERB = "-ing : après enjoy, finish, avoid, mind…"
ING_PREP = "-ing : après une préposition (without, before, in…)"
TO_V = "to : après want, decide, hope, need…"

unit9 = {
    "title": "To ou -ing",
    "level": "B1",
    "hint": "Quand un verbe en suit un autre, l'anglais choisit entre to + verbe et -ing. Et « pour + verbe » se dit to + verbe, jamais for + verbe (for + -ing dit seulement à quoi sert un objet).",
    "lessons": [
        L(
            "to : pour dire le but",
            R(
                "« Pour acheter » se dit to buy : I went to the bakery to buy bread.",
                [
                    "Faux : for buy, for to buy. Juste : to buy.",
                    "to + un lieu dit où on va ; to + un verbe dit pourquoi.",
                    "in order to (afin de) est plus soutenu : in order to learn.",
                    "for + -ing dit à quoi sert un objet : This knife is for cutting bread.",
                ],
                [["I went to the bakery to buy bread.", "Je suis allé à la boulangerie pour acheter du pain."], ["He's going to Spain to learn Spanish.", "Il va en Espagne pour apprendre l'espagnol."]],
            ),
            [
                S("I went to the bakery to buy bread.", "Je suis allé à la boulangerie pour acheter du pain.", ["I", "went", "to the bakery", "to buy", "bread"], focus=("to buy", PURPOSE, "Pour acheter : to buy."), blank=("to buy", "acheter", ["for buy", "for buying"]), alt=["I went to the baker's to buy bread.", "I went to the bakery to get bread."], meaning=["Je suis allé à la boulangerie, mais je n'ai pas acheté de pain.", "J'ai acheté du pain en allant au travail."]),
                S("She's saving money to buy a car.", "Elle économise pour acheter une voiture.", ["she's saving", "money", "to buy", "a car"], focus=("to buy", PURPOSE, "Pour acheter : to buy."), blank=("to buy", "acheter", ["for to buy", "for buying"]), alt=["She's saving up to buy a car.", "She's saving to buy a car."]),
                S("We went to the station to pick up my aunt.", "Nous sommes allés à la gare chercher ma tante.", ["we", "went", "to the station", "to pick up", "my aunt"], focus=("to the station", DEST, "Où ? À la gare."), blank=("to pick up", "pick up", ["for pick up", "for picking up"]), alt=["We went to the station to meet my aunt.", "We went to the station to get my aunt."], meaning=["Ma tante est venue nous chercher à la gare.", "Nous avons accompagné ma tante à la gare."]),
                S("I called him to say thank you.", "Je l'ai appelé pour lui dire merci.", ["I", "called", "him", "to say", "thank you"], focus=("to say", PURPOSE, "Pour dire : to say."), blank=("to say", "dire", ["for say", "for saying"]), alt=["I called him to thank him.", "I phoned him to say thank you."]),
                S("He's going to Spain to learn Spanish.", "Il va en Espagne pour apprendre l'espagnol.", ["he's going", "to Spain", "to learn", "Spanish"], focus=("to Spain", DEST, "Où ? En Espagne."), blank=("to learn", "apprendre", ["for learn", "for learning"]), meaning=["Il apprend l'espagnol pour aller en Espagne.", "Il revient d'Espagne, où il a appris l'espagnol."]),
                S("I use this knife to cut bread.", "J'utilise ce couteau pour couper le pain.", ["I", "use", "this knife", "to cut", "bread"], focus=("to cut", PURPOSE, "Pour couper : to cut."), blank=("to cut", "couper", ["for cut", "cut"]), alt=["I use this knife for cutting bread.", "I use this knife to cut the bread."]),
                S("They came to Paris to see the museums.", "Ils sont venus à Paris pour voir les musées.", ["they", "came", "to Paris", "to see", "the museums"], focus=("to Paris", DEST, "Où ? À Paris."), blank=("to see", "voir", ["for see", "for seeing"]), meaning=["Ils sont partis de Paris pour voir les musées.", "Ils ont vu les musées avant de venir à Paris."]),
            ],
            {"prompt": "Que dit le groupe surligné ?", "options": [PURPOSE, DEST]},
        ),
        L(
            "I want you to come : vouloir que…",
            R(
                "« Je veux que tu viennes » se dit I want you to come : want + la personne + to + verbe.",
                [
                    "Faux : I want that you come. L'anglais n'a pas de « que » ici.",
                    "Même tournure avec would like, ask, tell, expect : She asked me to help her.",
                    "Pour une interdiction : not to (plutôt que to not). The doctor told him not to smoke.",
                    "Sans personne, c'est le sujet qui fait l'action : I want to come (je veux venir).",
                ],
                [["I want you to come.", "Je veux que tu viennes."], ["She asked me to help her.", "Elle m'a demandé de l'aider."]],
            ),
            [
                S("I want you to come.", "Je veux que tu viennes.", ["I", "want", "you", "to come"], focus=("to come", DOER_OBJ, "C'est toi qui viens : you, juste avant to."), blank=("to come", "venir", ["coming", "come"]), meaning=["Je veux venir.", "Tu veux que je vienne."]),
                S("I want to come.", "Je veux venir.", ["I", "want", "to come"], focus=("to come", DOER_SUBJ, "C'est moi qui viens : le sujet."), blank=("to come", "venir", ["coming", "come"]), meaning=["Je veux que tu viennes.", "Je ne veux pas venir."]),
                S("My parents want me to study medicine.", "Mes parents veulent que je fasse médecine.", ["my parents", "want", "me", "to study", "medicine"], focus=("to study", DOER_OBJ, "C'est moi qui étudie : me, juste avant to."), blank=("me", "moi", ["I", "that I"]), meaning=["Je veux que mes parents fassent médecine.", "Mes parents ont fait médecine."]),
                S("She asked me to help her.", "Elle m'a demandé de l'aider.", ["she", "asked", "me", "to help", "her"], focus=("to help", DOER_OBJ, "C'est moi qui aide : me, juste avant to."), blank=("to help", "aider", ["helping", "help"]), meaning=["Je lui ai demandé de m'aider.", "Elle m'a aidé sans que je le demande."]),
                S("The doctor told him not to smoke.", "Le médecin lui a dit de ne pas fumer.", ["the doctor", "told", "him", "not to smoke"], focus=("not to smoke", DOER_OBJ, "C'est lui qui ne doit pas fumer : him, juste avant."), blank=("not to smoke", "ne pas fumer", ["don't smoke", "not smoke"]), meaning=["Le médecin lui a dit qu'il ne fumait pas.", "Il a dit au médecin de ne pas fumer."]),
                S("Would you like me to open the window?", "Tu veux que j'ouvre la fenêtre ?", ["would you like", "me", "to open", "the window"], focus=("to open", DOER_OBJ, "C'est moi qui ouvre : me, juste avant to."), blank=("me", "moi", ["I", "that I"]), alt=["Do you want me to open the window?", "Shall I open the window?"]),
                S("We decided to stay at home.", "Nous avons décidé de rester à la maison.", ["we", "decided", "to stay", "at home"], focus=("to stay", DOER_SUBJ, "C'est nous qui restons : le sujet."), blank=("to stay", "rester", ["staying", "stay"]), alt=["We decided to stay home."]),
            ],
            {"prompt": "Qui fait l'action du verbe surligné ?", "options": [DOER_SUBJ, DOER_OBJ]},
        ),
        L(
            "-ing après enjoy, finish, avoid… et après une préposition",
            R(
                "Certains verbes sont suivis de -ing : enjoy, finish, avoid, mind, keep, suggest. I enjoy cooking.",
                [
                    "Après une préposition (without, before, after, in, at, for…), toujours -ing : She left without saying goodbye.",
                    "Le français met l'infinitif (sans dire) ; l'anglais met -ing.",
                    "D'autres verbes prennent to : want, decide, hope, need, plan, forget. He hopes to find a job.",
                ],
                [["I enjoy cooking for my friends.", "J'aime cuisiner pour mes amis."], ["She left without saying goodbye.", "Elle est partie sans dire au revoir."]],
            ),
            [
                S("I enjoy cooking for my friends.", "J'aime cuisiner pour mes amis.", ["I", "enjoy", "cooking", "for my friends"], focus=("cooking", ING_VERB, "Après enjoy : -ing."), blank=("cooking", "cook", ["to cook", "cook"]), alt=["I like cooking for my friends.", "I love cooking for my friends.", "I like to cook for my friends.", "I love to cook for my friends."]),
                S("Have you finished eating?", "Tu as fini de manger ?", ["have", "you", "finished", "eating"], focus=("eating", ING_VERB, "Après finish : -ing."), blank=("eating", "eat", ["to eat", "eat"]), alt=["Are you done eating?", "Did you finish eating?"]),
                S("She left without saying goodbye.", "Elle est partie sans dire au revoir.", ["she", "left", "without", "saying", "goodbye"], focus=("saying", ING_PREP, "Après without : -ing."), blank=("saying", "say", ["say", "to say"]), meaning=["Elle est partie après avoir dit au revoir.", "Elle a dit au revoir sans partir."]),
                S("I'm interested in learning Chinese.", "Ça m'intéresse d'apprendre le chinois.", ["I'm", "interested", "in", "learning", "Chinese"], focus=("learning", ING_PREP, "Après in : -ing."), blank=("learning", "learn", ["learn", "to learn"]), alt=["I'm interested in studying Chinese."]),
                S("Do you mind waiting a few minutes?", "Ça te dérange d'attendre quelques minutes ?", ["do you mind", "waiting", "a few minutes"], focus=("waiting", ING_VERB, "Après mind : -ing."), blank=("waiting", "wait", ["to wait", "wait"]), alt=["Would you mind waiting a few minutes?"], meaning=["Tu veux bien que je t'attende quelques minutes ?", "Tu as attendu longtemps ?"]),
                S("He hopes to find a job soon.", "Il espère trouver un travail bientôt.", ["he", "hopes", "to find", "a job", "soon"], focus=("to find", TO_V, "Après hope : to."), blank=("to find", "find", ["finding", "find"]), alt=["He hopes he will find a job soon.", "He hopes to find work soon."]),
                S("Brush your teeth before going to bed.", "Brosse-toi les dents avant d'aller te coucher.", ["brush", "your teeth", "before", "going", "to bed"], focus=("going", ING_PREP, "Après before : -ing."), blank=("going", "go", ["go", "to go"]), alt=["Brush your teeth before you go to bed."], meaning=["Brosse-toi les dents après le dîner.", "Va te coucher avant de te brosser les dents."]),
            ],
            {"prompt": "Pourquoi cette forme ?", "options": [ING_VERB, ING_PREP, TO_V]},
        ),
        L(
            "to ou -ing : choisir",
            R(
                "Il faut retenir avec chaque verbe la forme qui le suit.",
                [
                    "+ to : want, decide, hope, need, plan, forget, try. Don't forget to lock the door.",
                    "+ -ing : enjoy, finish, avoid, mind, keep. He kept talking.",
                    "try et forget existent aussi avec -ing, mais le sens change : I'll never forget meeting you (je n'oublierai jamais notre rencontre).",
                    "Après une préposition : -ing. Thank you for helping me.",
                ],
                [["Don't forget to lock the door.", "N'oublie pas de fermer la porte à clé."], ["Thank you for helping me.", "Merci de m'avoir aidé."]],
            ),
            [
                S("Try to avoid eating late.", "Essaie d'éviter de manger tard.", ["try", "to avoid", "eating", "late"], focus=("eating", ING_VERB, "Après avoid : -ing."), blank=("eating", "eat", ["to eat", "eat"]), alt=["Try not to eat late."]),
                S("We've decided to move next year.", "Nous avons décidé de déménager l'année prochaine.", ["we've decided", "to move", "next year"], focus=("to move", TO_V, "Après decide : to."), blank=("to move", "move", ["moving", "move"]), alt=["We have decided to move next year.", "We decided to move next year."], meaning=["Nous avons déménagé l'année dernière.", "Nous avons décidé de ne pas déménager l'année prochaine."]),
                S("Don't forget to lock the door.", "N'oublie pas de fermer la porte à clé.", ["don't forget", "to lock", "the door"], focus=("to lock", TO_V, "Après forget : to, pour une chose à faire."), blank=("to lock", "lock", ["locking", "lock"])),
                S("She avoided answering my question.", "Elle a évité de répondre à ma question.", ["she", "avoided", "answering", "my question"], focus=("answering", ING_VERB, "Après avoid : -ing."), blank=("answering", "answer", ["to answer", "answer"]), meaning=["Elle a répondu à ma question.", "J'ai évité de répondre à sa question."]),
                S("I need to buy some milk.", "Je dois acheter du lait.", ["I", "need", "to buy", "some milk"], focus=("to buy", TO_V, "Après need : to."), blank=("to buy", "buy", ["buying", "buy"]), alt=["I need to get some milk.", "I have to buy some milk.", "I must buy some milk."]),
                S("Thank you for helping me.", "Merci de m'avoir aidé.", ["thank you", "for", "helping", "me"], focus=("helping", ING_PREP, "Après for : -ing."), blank=("helping", "help", ["help", "to help"]), alt=["Thanks for helping me.", "Thank you for your help."]),
                S("She's good at drawing.", "Elle est douée en dessin.", ["she's", "good", "at", "drawing"], focus=("drawing", ING_PREP, "Après at : -ing."), blank=("drawing", "draw", ["draw", "to draw"]), alt=["She draws well."]),
            ],
            {"prompt": "Pourquoi cette forme ?", "options": [ING_VERB, ING_PREP, TO_V]},
        ),
    ],
}

# ---------------------------------------------------------------- Unit 10: the passive
ACTIVE = "actif : le sujet fait l'action"
PASSIVE = "passif : le sujet subit l'action"
ON_ = "le passif traduit « on » : on ne dit pas qui"
BY_ = "by : dit qui a fait l'action"
P_NOW = "en ce moment : is being + participe"
P_PERF = "déjà fait : has been + participe"
P_FUT = "futur : will be + participe"
P_MOD = "avec can, must… : be + participe"

unit10 = {
    "title": "Le passif",
    "level": "B1",
    "hint": "be + participe : le sujet subit l'action. L'anglais s'en sert beaucoup, souvent là où le français dit « on ».",
    "lessons": [
        L(
            "be + participe : actif ou passif",
            R(
                "Le passif se forme avec be + participe : English is spoken all over the world. This bridge was built in 1890.",
                [
                    "be se met au temps voulu (is, was…) ; le participe ne bouge pas.",
                    "Actif : My grandfather built this house (le grand-père fait l'action). Passif : This house was built (la maison subit l'action : elle a été construite).",
                    "Attention aux participes irréguliers : built, spoken, stolen, written.",
                ],
                [["English is spoken all over the world.", "L'anglais est parlé dans le monde entier."], ["This bridge was built in 1890.", "Ce pont a été construit en 1890."]],
            ),
            [
                S("English is spoken all over the world.", "L'anglais est parlé dans le monde entier.", ["English", "is spoken", "all over the world"], focus=("is spoken", PASSIVE, "L'anglais ne parle pas : il est parlé."), blank=("is spoken", "speak", ["is speaking", "speaks"]), alt=["English is spoken around the world.", "People speak English all over the world."], meaning=["Le monde entier apprend l'anglais.", "On parle anglais dans ce pays seulement."]),
                S("This bridge was built in 1890.", "Ce pont a été construit en 1890.", ["this bridge", "was built", "in 1890"], focus=("was built", PASSIVE, "Le pont est construit : passif."), blank=("was built", "build", ["built", "was build"])),
                S("My grandfather built this house.", "Mon grand-père a construit cette maison.", ["my grandfather", "built", "this house"], focus=("built", ACTIVE, "Le grand-père construit : actif."), blank=("built", "build", ["was built", "builded"]), alt=["This house was built by my grandfather."], meaning=["Cette maison a été construite pour mon grand-père.", "Mon grand-père habite cette maison."]),
                S("The letters are delivered every morning.", "Les lettres sont distribuées tous les matins.", ["the letters", "are delivered", "every morning"], focus=("are delivered", PASSIVE, "Les lettres sont distribuées : passif."), blank=("are delivered", "deliver", ["are delivering", "deliver"])),
                S("Our car was stolen last night.", "Notre voiture a été volée cette nuit.", ["our car", "was stolen", "last night"], ["Last night our car was stolen."], ("was stolen", PASSIVE, "La voiture est volée : passif."), ("was stolen", "steal", ["was stealed", "stole"]), SECOND, alt=["Someone stole our car last night."], meaning=["Nous avons volé une voiture cette nuit.", "Notre voiture a été retrouvée cette nuit."]),
                S("Breakfast is served from seven to ten.", "Le petit-déjeuner est servi de sept à dix heures.", ["breakfast", "is served", "from seven to ten"], focus=("is served", PASSIVE, "Le petit-déjeuner est servi : passif."), blank=("is served", "serve", ["is serving", "serves"])),
                S("The children painted the walls.", "Les enfants ont peint les murs.", ["the children", "painted", "the walls"], focus=("painted", ACTIVE, "Les enfants peignent : actif."), blank=("painted", "paint", ["were painted", "paint"]), alt=["The walls were painted by the children."], meaning=["Les murs ont été peints pour les enfants.", "Les enfants ont dessiné sur les murs."]),
            ],
            {"prompt": "Le verbe surligné est-il actif ou passif ?", "options": [ACTIVE, PASSIVE]},
        ),
        L(
            "« On » et by",
            R(
                "Le français dit souvent « on » quand on ne sait pas qui fait l'action ; l'anglais met le passif. On m'a volé mon vélo → My bike was stolen.",
                [
                    "Pour dire qui a fait l'action, on ajoute by : This book was written by a teenager.",
                    "On m'a offert une montre → I was given a watch : la personne devient le sujet.",
                    "Ici, on parle français → French is spoken here.",
                ],
                [["My bike was stolen.", "On m'a volé mon vélo."], ["This book was written by a teenager.", "Ce livre a été écrit par une adolescente."]],
            ),
            [
                S("My bike was stolen yesterday.", "On m'a volé mon vélo hier.", ["my bike", "was stolen", "yesterday"], ["Yesterday my bike was stolen."], ("was stolen", ON_, "On ne dit pas qui l'a volé."), ("was stolen", "steal", ["has stole", "stole"]), SECOND, alt=["Someone stole my bike yesterday."], meaning=["J'ai volé un vélo hier.", "On m'a prêté un vélo hier."]),
                S("This book was written by a teenager.", "Ce livre a été écrit par une adolescente.", ["this book", "was written", "by a teenager"], focus=("by a teenager", BY_, "By dit qui l'a écrit."), blank=("was written", "write", ["was wrote", "wrote"]), alt=["A teenager wrote this book."], meaning=["Ce livre a été écrit pour les adolescents.", "Une adolescente lit ce livre."]),
                S("French is spoken here.", "Ici, on parle français.", ["French", "is spoken", "here"], focus=("is spoken", ON_, "On parle : le passif, sans dire qui."), blank=("is spoken", "speak", ["is speak", "speaks"]), alt=["We speak French here.", "They speak French here."]),
                S("I was given a watch for my birthday.", "On m'a offert une montre pour mon anniversaire.", ["I", "was given", "a watch", "for my birthday"], focus=("was given", ON_, "On m'a offert : I was given."), blank=("was given", "give", ["was gave", "gave"]), alt=["Someone gave me a watch for my birthday.", "They gave me a watch for my birthday.", "I got a watch for my birthday."], meaning=["J'ai offert une montre pour son anniversaire.", "On m'a volé ma montre le jour de mon anniversaire."]),
                S("The window was broken by the wind.", "La fenêtre a été cassée par le vent.", ["the window", "was broken", "by the wind"], focus=("by the wind", BY_, "By dit ce qui l'a cassée."), blank=("was broken", "break", ["was broke", "broke"]), alt=["The wind broke the window."]),
                S("We were invited to their wedding last year.", "On nous a invités à leur mariage l'année dernière.", ["we", "were invited", "to their wedding", "last year"], ["Last year we were invited to their wedding."], ("were invited", ON_, "On nous a invités : we were invited."), ("were invited", "invite", ["was invited", "invited"]), SECOND, alt=["They invited us to their wedding last year."], meaning=["Nous les avons invités à notre mariage l'année dernière.", "Nous nous sommes mariés l'année dernière."]),
                S("The song was written by John Lennon.", "La chanson a été écrite par John Lennon.", ["the song", "was written", "by John Lennon"], focus=("by John Lennon", BY_, "By dit qui l'a écrite."), blank=("was written", "write", ["was wrote", "wrote"]), alt=["John Lennon wrote the song."]),
            ],
            {"prompt": "Que fait le groupe surligné ?", "options": [ON_, BY_]},
        ),
        L(
            "Le passif à tous les temps",
            R(
                "be prend le temps voulu ; le participe reste le même.",
                [
                    "En ce moment : The road is being repaired.",
                    "Déjà fait : The house has been sold.",
                    "Au futur : The work will be finished tomorrow.",
                    "Avec can, must… : The castle can be seen from the road. Phones must be turned off.",
                ],
                [["The road is being repaired.", "On répare la route en ce moment."], ["The house has been sold.", "La maison a été vendue."]],
            ),
            [
                S("The road is being repaired.", "On répare la route en ce moment.", ["the road", "is being repaired"], focus=("is being repaired", P_NOW, "En ce moment : is being."), blank=("is being repaired", "repair", ["is repairing", "is been repaired"]), alt=["They are repairing the road.", "The road is being fixed."], meaning=["La route a été réparée.", "La route va être réparée."]),
                S("The house has just been sold.", "La maison vient d'être vendue.", ["the house", "has", "just", "been sold"], focus=("has just been sold", P_PERF, "C'est fait : has been."), blank=("been sold", "sell", ["being sold", "be sold"]), alt=["The house was just sold."], meaning=["La maison est à vendre.", "La maison va être vendue."]),
                S("The work will be finished tomorrow.", "Le travail sera terminé demain.", ["the work", "will be finished", "tomorrow"], ["Tomorrow the work will be finished."], ("will be finished", P_FUT, "Demain : will be."), ("will be finished", "finish", ["will finished", "will being finished"]), SECOND, alt=["The work will be done tomorrow."]),
                S("The castle can be seen from the road.", "On peut voir le château depuis la route.", ["the castle", "can be seen", "from the road"], focus=("can be seen", P_MOD, "Avec can : can be + participe."), blank=("can be seen", "see", ["can see", "can be saw"]), alt=["You can see the castle from the road."]),
                S("Your room is being cleaned.", "On est en train de nettoyer ta chambre.", ["your room", "is being cleaned"], focus=("is being cleaned", P_NOW, "En ce moment : is being."), blank=("is being cleaned", "clean", ["is cleaning", "is been cleaned"]), alt=["They are cleaning your room."]),
                S("The tickets have already been sold.", "Les billets ont déjà été vendus.", ["the tickets", "have", "already", "been sold"], focus=("have already been sold", P_PERF, "C'est fait : have been."), blank=("been sold", "sell", ["being sold", "be sold"]), alt=["The tickets have been sold already.", "The tickets were already sold."], meaning=["Les billets sont encore en vente.", "Nous avons déjà acheté les billets."]),
                S("Phones must be turned off.", "Les téléphones doivent être éteints.", ["phones", "must be turned off"], focus=("must be turned off", P_MOD, "Avec must : must be + participe."), blank=("must be turned off", "turn off", ["must turn off", "must be turn off"]), alt=["Phones must be switched off.", "Mobile phones must be turned off."], meaning=["Les téléphones doivent rester allumés.", "Il faut éteindre la lumière."]),
            ],
            {"prompt": "Quel temps a le passif ?", "options": [P_NOW, P_PERF, P_FUT, P_MOD]},
        ),
    ],
}

TRACK = make_track(
    "en-phrase",
    "Phrases complexes",
    "De la phrase simple aux longues phrases : l'ordre des mots, les questions, la négation, puis relier et emboîter les propositions. Construire et comprendre.",
    [unit1, unit2, unit3, unit4, unit5, unit6, unit7, unit8, unit9, unit10],
)
