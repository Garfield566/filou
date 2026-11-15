"""The German « complex sentences » track: from the simple sentence (the verb in 2nd place, questions, the verb in two
pieces, nicht) to joining sentences (und, aber, denn) and the first subordinate clauses (weil, dass, wenn, ob, obwohl).
Units 1 to 6 so far; the next ones start with the subordinate clause, relatives, zu and long real sentences."""
from phrase_kit import L, R, S, T, make_track  # noqa: F401

SECOND = "Les deux ordres sont corrects : le verbe reste en 2e position."
HS = "haben ou sein"

# ---------------------------------------------------------------- Unit 1: the verb in 2nd place
P1 = "1re place"
P2 = "2e place : le verbe conjugué"
P3 = "après le verbe"
PLACE = {"prompt": "Quelle place a le groupe surligné ?", "options": [P1, P2, P3]}

unit1 = {
    "title": "Le verbe en 2e position",
    "level": "A1",
    "hint": "Une seule règle, partout : dans une phrase simple, le verbe conjugué est le 2e élément. Ce qui vient avant peut changer.",
    "lessons": [
        L(
            "Le sujet, puis le verbe",
            R(
                "Dans une phrase simple, le verbe conjugué occupe toujours la 2e place.",
                [
                    "La 1re place est souvent le sujet : Ich wohne in Lyon.",
                    "« 2e place » veut dire 2e élément, pas 2e mot : Meine kleine Schwester spielt Klavier.",
                    "Tout le reste vient après le verbe.",
                ],
                [["Ich wohne in Lyon.", "J'habite à Lyon."], ["Meine kleine Schwester spielt Klavier.", "Ma petite sœur joue du piano."]],
            ),
            [
                S("Ich wohne in Lyon.", "J'habite à Lyon.", ["ich", "wohne", "in Lyon"], ["In Lyon wohne ich."], focus=("wohne", P2, "Le verbe conjugué : 2e place."), why_order=SECOND),
                S("Meine kleine Schwester spielt Klavier.", "Ma petite sœur joue du piano.", ["meine kleine Schwester", "spielt", "Klavier"], focus=("meine kleine Schwester", P1, "Trois mots, mais un seul élément : la 1re place.")),
                S("Paul arbeitet heute im Garten.", "Paul travaille dans le jardin aujourd'hui.", ["Paul", "arbeitet", "heute", "im Garten"], ["Heute arbeitet Paul im Garten.", "Im Garten arbeitet Paul heute."], ("arbeitet", P2, "Le verbe conjugué : 2e place."), why_order=SECOND),
                S("Wir trinken jeden Morgen Kaffee.", "Nous buvons du café tous les matins.", ["wir", "trinken", "jeden Morgen", "Kaffee"], ["Jeden Morgen trinken wir Kaffee."], ("jeden Morgen", P3, "Ici, jeden Morgen vient après le verbe."), why_order=SECOND),
                S("Der Bus kommt um neun Uhr.", "Le bus arrive à neuf heures.", ["der Bus", "kommt", "um neun Uhr"], ["Um neun Uhr kommt der Bus."], ("der Bus", P1, "Le sujet ouvre la phrase."), why_order=SECOND),
                S("Die Kinder spielen im Park.", "Les enfants jouent dans le parc.", ["die Kinder", "spielen", "im Park"], ["Im Park spielen die Kinder."], ("im Park", P3, "Im Park vient ici après le verbe."), why_order=SECOND),
                S("Mein Freund aus Berlin heißt Jonas.", "Mon ami de Berlin s'appelle Jonas.", ["mein Freund aus Berlin", "heißt", "Jonas"], focus=("mein Freund aus Berlin", P1, "Un seul élément, même long : la 1re place.")),
            ],
            PLACE,
        ),
        L(
            "Le temps en tête : Heute gehe ich…",
            R(
                "On peut ouvrir la phrase par un mot de temps. Le verbe reste 2e ; le sujet passe juste après lui.",
                [
                    "Ich gehe heute ins Kino → Heute gehe ich ins Kino.",
                    "Le français dit « Aujourd'hui, je vais… » ; en allemand, pas de virgule, et le sujet passe après le verbe.",
                    "Le sens ne change pas : on met juste le moment en avant.",
                ],
                [["Heute gehe ich ins Kino.", "Aujourd'hui, je vais au cinéma."], ["Morgen besucht uns Anna.", "Demain, Anna nous rend visite."]],
            ),
            [
                S("Heute gehe ich ins Kino.", "Aujourd'hui, je vais au cinéma.", ["heute", "gehe", "ich", "ins Kino"], ["Ich gehe heute ins Kino."], ("ich", P3, "Heute prend la 1re place : le sujet passe après le verbe."), why_order=SECOND, meaning=["Hier, je suis allé au cinéma.", "Aujourd'hui, le cinéma est fermé."]),
                S("Morgen besucht uns Anna.", "Demain, Anna nous rend visite.", ["morgen", "besucht", "uns", "Anna"], ["Anna besucht uns morgen.", "Morgen besucht Anna uns."], ("Anna", P3, "Anna est le sujet, mais elle vient après le verbe."), why_order="Les deux sont corrects. Avec morgen en tête, uns (un pronom) passe d'habitude devant Anna.", meaning=["Demain, nous rendons visite à Anna.", "Demain, nous allons chez Anna."]),
                S("Am Sonntag schläft mein Vater lange.", "Le dimanche, mon père fait la grasse matinée.", ["am Sonntag", "schläft", "mein Vater", "lange"], ["Mein Vater schläft am Sonntag lange."], ("schläft", P2, "Le verbe reste 2e, même après am Sonntag."), why_order=SECOND, meaning=["Le dimanche, je dors chez mon père.", "Le dimanche, mon père dort peu."]),
                S("Jetzt regnet es.", "Maintenant, il pleut.", ["jetzt", "regnet", "es"], ["Es regnet jetzt."], ("jetzt", P1, "Jetzt ouvre la phrase."), why_order=SECOND),
                S("Nach dem Essen trinken wir einen Tee.", "Après le repas, nous buvons un thé.", ["nach dem Essen", "trinken", "wir", "einen Tee"], ["Wir trinken nach dem Essen einen Tee."], ("nach dem Essen", P1, "Trois mots, un seul élément : la 1re place."), why_order=SECOND, meaning=["Avant le repas, nous buvons un thé.", "Après le thé, nous mangeons."]),
                S("Gestern hat mich meine Oma angerufen.", "Hier, ma grand-mère m'a appelé.", ["gestern", "hat", "mich", "meine Oma", "angerufen"], ["Meine Oma hat mich gestern angerufen.", "Gestern hat meine Oma mich angerufen."], ("meine Oma", P3, "Meine Oma est le sujet, après le verbe."), why_order="Les deux sont corrects. Avec gestern en tête, mich (un pronom) passe d'habitude devant meine Oma.", meaning=["Hier, j'ai appelé ma grand-mère.", "Hier, ma grand-mère m'a rendu visite."]),
                S("Im Sommer fahren wir ans Meer.", "L'été, nous allons à la mer.", ["im Sommer", "fahren", "wir", "ans Meer"], ["Wir fahren im Sommer ans Meer."], ("fahren", P2, "Le verbe reste 2e."), why_order=SECOND),
            ],
            PLACE,
        ),
        L(
            "Un lieu ou un complément en tête",
            R(
                "La 1re place peut aussi être un lieu, une manière, ou même le complément.",
                [
                    "In Berlin wohnt meine Tante.",
                    "Den Film kenne ich schon : on met en tête ce dont on parle déjà.",
                    "Le verbe reste 2e, le sujet passe après.",
                    "Pour savoir qui fait quoi, regarde la forme (der, den, ich, mich…), pas la place.",
                ],
                [["In Berlin wohnt meine Tante.", "Ma tante habite à Berlin."], ["Den Hund füttert mein Sohn.", "C'est mon fils qui nourrit le chien."]],
            ),
            [
                S("In Berlin wohnt meine Tante.", "Ma tante habite à Berlin.", ["in Berlin", "wohnt", "meine Tante"], ["Meine Tante wohnt in Berlin."], ("in Berlin", P1, "Le lieu ouvre la phrase."), why_order=SECOND, meaning=["J'habite chez ma tante, à Berlin.", "Ma tante a quitté Berlin."]),
                S("Mit dem Fahrrad fahre ich zur Arbeit.", "Je vais au travail à vélo.", ["mit dem Fahrrad", "fahre", "ich", "zur Arbeit"], ["Ich fahre mit dem Fahrrad zur Arbeit.", "Zur Arbeit fahre ich mit dem Fahrrad."], ("ich", P3, "Mit dem Fahrrad prend la 1re place : ich passe après le verbe."), why_order=SECOND),
                S("Den Film kenne ich schon.", "Ce film, je le connais déjà.", ["den Film", "kenne", "ich", "schon"], ["Ich kenne den Film schon."], ("den Film", P1, "Le complément peut ouvrir la phrase ; den montre que ce n'est pas le sujet."), why_order="Les deux sont corrects ; on commence par « den Film » quand on vient d'en parler.", meaning=["Je vais voir ce film.", "Je ne connais pas encore ce film."]),
                S("Dieses Buch hat mir mein Bruder geschenkt.", "C'est mon frère qui m'a offert ce livre.", ["dieses Buch", "hat", "mir", "mein Bruder", "geschenkt"], ["Mein Bruder hat mir dieses Buch geschenkt."], ("mein Bruder", P3, "Mein Bruder est le sujet : c'est lui qui offre."), why_order="Les deux sont corrects ; « Dieses Buch… » met le livre en avant.", meaning=["J'ai offert ce livre à mon frère.", "Mon frère m'a prêté ce livre."]),
                S("Im Kühlschrank steht noch Milch.", "Il reste du lait dans le frigo.", ["im Kühlschrank", "steht", "noch", "Milch"], focus=("steht", P2, "Le verbe reste 2e."), meaning=["Il n'y a plus de lait dans le frigo.", "Le lait est sur le frigo."]),
                S("Zum Glück hat der Arzt sofort Zeit.", "Heureusement, le médecin a tout de suite du temps.", ["zum Glück", "hat", "der Arzt", "sofort", "Zeit"], ["Der Arzt hat zum Glück sofort Zeit."], ("zum Glück", P1, "Zum Glück ouvre la phrase à lui seul."), why_order=SECOND),
                S("Den Hund füttert mein Sohn.", "C'est mon fils qui nourrit le chien.", ["den Hund", "füttert", "mein Sohn"], ["Mein Sohn füttert den Hund."], ("mein Sohn", P3, "Mein Sohn est le sujet : il fait l'action, même après le verbe."), why_order="Même sens dans les deux ordres : seuls den et mein le disent.", meaning=["Le chien nourrit mon fils.", "Mon fils promène le chien."]),
            ],
            PLACE,
        ),
        L(
            "Un seul élément avant le verbe",
            R(
                "Avant le verbe, il n'y a qu'un seul élément. C'est le piège n° 1 des francophones.",
                [
                    "Le français dit « Demain, je pars » : deux éléments avant le verbe. L'allemand dit Morgen fahre ich.",
                    "Faux : Morgen ich fahre. Juste : Morgen fahre ich.",
                    "ja, nein, und, aber, oder ne comptent pas : Ja, ich komme. Aber heute bleibe ich zu Hause.",
                ],
                [["Morgen fahre ich nach Wien.", "Demain, je vais à Vienne."], ["Leider habe ich keine Zeit.", "Malheureusement, je n'ai pas le temps."]],
            ),
            [
                S("Morgen fahre ich nach Wien.", "Demain, je vais à Vienne.", ["morgen", "fahre", "ich", "nach Wien"], ["Ich fahre morgen nach Wien."], ("ich", P3, "Morgen prend la 1re place : ich passe après le verbe."), ("fahre", "fahren", ["fährt", "fährst"]), SECOND),
                S("Ja, ich komme gern.", "Oui, je viens volontiers.", ["ja", "ich", "komme", "gern"], focus=("komme", P2, "Ja ne compte pas : ich est 1er, komme 2e."), blank=("komme", "kommen", ["kommt", "kommst"])),
                S("Leider habe ich keine Zeit.", "Malheureusement, je n'ai pas le temps.", ["leider", "habe", "ich", "keine Zeit"], ["Ich habe leider keine Zeit."], ("leider", P1, "Leider occupe la 1re place à lui seul."), ("habe", "haben", ["hat", "hast"]), SECOND),
                S("Aber heute bleibe ich zu Hause.", "Mais aujourd'hui, je reste à la maison.", ["aber", "heute", "bleibe", "ich", "zu Hause"], ["Aber ich bleibe heute zu Hause."], ("heute", P1, "Aber ne compte pas : heute est 1er, bleibe 2e."), ("bleibe", "bleiben", ["bleibt", "bleibst"]), "Les deux sont corrects : aber ne compte pas, le verbe reste 2e."),
                S("Vielleicht kommt Tom auch.", "Tom vient peut-être aussi.", ["vielleicht", "kommt", "Tom", "auch"], ["Tom kommt vielleicht auch."], ("Tom", P3, "Vielleicht prend la 1re place : Tom passe après le verbe."), ("kommt", "kommen", ["kommst", "komme"]), SECOND),
                S("Nach der Schule macht sie ihre Hausaufgaben.", "Après l'école, elle fait ses devoirs.", ["nach der Schule", "macht", "sie", "ihre Hausaufgaben"], ["Sie macht nach der Schule ihre Hausaufgaben."], ("macht", P2, "Le verbe reste 2e."), ("macht", "machen", ["machst", "mache"]), SECOND, meaning=["Après ses devoirs, elle va à l'école.", "Avant l'école, elle fait ses devoirs."]),
                S("Natürlich hilft dir dein Vater.", "Bien sûr, ton père t'aide.", ["natürlich", "hilft", "dir", "dein Vater"], ["Dein Vater hilft dir natürlich.", "Natürlich hilft dein Vater dir."], ("dein Vater", P3, "Dein Vater est le sujet, après le verbe."), ("hilft", "helfen", ["helft", "hilfst"]), SECOND, meaning=["Bien sûr, tu aides ton père.", "Bien sûr, ton père t'appelle."]),
            ],
            PLACE,
        ),
    ],
}

# ---------------------------------------------------------------- Unit 2: questions and orders
QW = "le mot interrogatif"
QV = "le verbe conjugué"
QS = "le sujet"
QO = "autre chose"
QROLE = {"prompt": "Quel est le rôle du groupe surligné ?", "options": [QW, QV, QS, QO]}
DU = "à une personne qu'on tutoie (du)"
IHR = "à plusieurs personnes qu'on tutoie (ihr)"
SIE = "poliment (Sie)"

unit2 = {
    "title": "Les questions et l'impératif",
    "level": "A1",
    "hint": "Le mot interrogatif prend la 1re place ; sans lui, c'est le verbe qui passe devant.",
    "lessons": [
        L(
            "Avec un mot interrogatif : wo, wann, warum…",
            R(
                "wer, was, wo, wann, wie, warum, woher, wohin occupent la 1re place ; le verbe reste 2e, le sujet suit.",
                [
                    "Wo wohnst du? Wann kommt der Zug?",
                    "wie lange, wie viele, welcher… : le groupe entier est en 1re place : Wie viele Geschwister hast du?",
                    "Pas de « est-ce que » en allemand.",
                ],
                [["Wo wohnst du?", "Où habites-tu ?"], ["Wie viele Geschwister hast du?", "Combien de frères et sœurs as-tu ?"]],
            ),
            [
                S("Wo wohnst du?", "Où habites-tu ?", ["wo", "wohnst", "du"], focus=("wo", QW, "Wo ouvre la question."), blank=("wohnst", "wohnen", ["wohnt", "wohne"])),
                S("Wann kommt der Zug?", "Quand le train arrive-t-il ?", ["wann", "kommt", "der Zug"], focus=("der Zug", QS, "Der Zug est le sujet, après le verbe."), blank=("kommt", "kommen", ["kommen", "kommst"])),
                S("Warum lernst du Deutsch?", "Pourquoi apprends-tu l'allemand ?", ["warum", "lernst", "du", "Deutsch"], focus=("lernst", QV, "Le verbe reste 2e."), blank=("lernst", "lernen", ["lernt", "lerne"])),
                S("Wie viele Geschwister hast du?", "Combien de frères et sœurs as-tu ?", ["wie viele Geschwister", "hast", "du"], focus=("wie viele Geschwister", QW, "Le groupe entier occupe la 1re place."), blank=("hast", "haben", ["hat", "habt"])),
                S("Was macht ihr am Wochenende?", "Que faites-vous ce week-end ?", ["was", "macht", "ihr", "am Wochenende"], focus=("am Wochenende", QO, "Am Wochenende dit quand : ni question, ni verbe, ni sujet."), blank=("macht", "machen", ["machen", "machst"])),
                S("Wer hat das gesagt?", "Qui a dit ça ?", ["wer", "hat", "das", "gesagt"], focus=("wer", QW, "Wer est à la fois le mot interrogatif et le sujet."), blank=("hat", "haben", ["habt", "hast"]), meaning=["Qu'est-ce qu'il a dit ?", "À qui as-tu dit ça ?"]),
                S("Woher kommt deine Freundin?", "D'où vient ton amie ?", ["woher", "kommt", "deine Freundin"], focus=("deine Freundin", QS, "Deine Freundin est le sujet."), blank=("kommt", "kommen", ["kommst", "komme"]), meaning=["Où va ton amie ?", "Quand ton amie arrive-t-elle ?"]),
            ],
            QROLE,
        ),
        L(
            "Les questions oui / non : le verbe en tête",
            R(
                "Pour une question fermée (réponse oui ou non), le verbe conjugué passe en 1re place.",
                [
                    "Du hast Zeit. → Hast du Zeit?",
                    "Avec un verbe en deux morceaux, seule la partie conjuguée passe devant : Kannst du morgen kommen? Habt ihr gut geschlafen?",
                    "Pour dire oui à une question négative, on répond doch : Kommst du nicht? – Doch!",
                ],
                [["Hast du Zeit?", "Tu as le temps ?"], ["Kommst du morgen mit?", "Tu viens avec nous demain ?"]],
            ),
            [
                S("Hast du Zeit?", "Tu as le temps ?", ["hast", "du", "Zeit"], focus=("hast", QV, "Le verbe passe en 1re place : question fermée."), blank=("hast", "haben", ["hat", "habe"])),
                S("Kommst du morgen mit?", "Tu viens avec nous demain ?", ["kommst", "du", "morgen", "mit"], focus=("mit", QO, "Mit, la particule de mitkommen, reste à la fin."), blank=("kommst", "mitkommen", ["kommt", "komme"]), meaning=["Tu es venu avec nous hier ?", "Tu viens nous chercher demain ?"]),
                S("Kannst du mir helfen?", "Tu peux m'aider ?", ["kannst", "du", "mir", "helfen"], focus=("du", QS, "Du, le sujet, suit le verbe."), blank=("kannst", "können", ["kann", "könnt"])),
                S("Ist das dein Auto?", "C'est ta voiture ?", ["ist", "das", "dein Auto"], focus=("ist", QV, "Le verbe ouvre la question."), blank=("ist", "sein", ["bist", "sind"]), meaning=["C'est ma voiture.", "Où est ta voiture ?"]),
                S("Habt ihr gut geschlafen?", "Vous avez bien dormi ?", ["habt", "ihr", "gut", "geschlafen"], focus=("geschlafen", QO, "Le participe reste à la fin, même dans une question."), blank=("habt", "haben", ["hat", "haben"])),
                S("Wohnt deine Schwester noch in Paris?", "Ta sœur habite encore à Paris ?", ["wohnt", "deine Schwester", "noch", "in Paris"], focus=("deine Schwester", QS, "Deine Schwester, le sujet, suit le verbe."), blank=("wohnt", "wohnen", ["wohnst", "wohnen"])),
                S("Wo ist der Bahnhof?", "Où est la gare ?", ["wo", "ist", "der Bahnhof"], focus=("wo", QW, "Avec un mot interrogatif, c'est lui qui prend la 1re place."), blank=("ist", "sein", ["sind", "bist"])),
            ],
            QROLE,
        ),
        L(
            "L'impératif : le verbe en tête aussi",
            R(
                "Pour donner un ordre ou un conseil, le verbe prend la 1re place.",
                [
                    "du : Komm! Nimm den Bus! (sans -st, sans du).",
                    "ihr : Kommt! ; Sie : Kommen Sie bitte!",
                    "Les verbes où e devient i ou ie (du nimmst, du liest) gardent ce changement : Nimm! Gib! Iss! Lies!",
                    "La particule reste à la fin : Mach die Tür zu!",
                ],
                [["Nimm den Bus!", "Prends le bus !"], ["Kommen Sie bitte herein!", "Entrez, s'il vous plaît !"]],
            ),
            [
                S("Komm bitte schnell!", "Viens vite, s'il te plaît !", ["komm", "bitte", "schnell"], focus=("komm", DU, "Komm, sans -st et sans du."), blank=("komm", "kommen", ["kommst", "kommt"])),
                S("Nimm den Bus!", "Prends le bus !", ["nimm", "den Bus"], focus=("nimm", DU, "Nehmen garde le i : nimm."), blank=("nimm", "nehmen", ["nehm", "nimmst"])),
                S("Kommen Sie bitte herein!", "Entrez, s'il vous plaît !", ["kommen", "Sie", "bitte", "herein"], focus=("kommen", SIE, "Kommen Sie : le verbe, puis Sie."), blank=("kommen", "hereinkommen", ["kommt", "komm"])),
                S("Macht bitte die Tür zu!", "Fermez la porte, s'il vous plaît, les enfants !", ["macht", "bitte", "die Tür", "zu"], focus=("macht", IHR, "Macht, sans ihr : on parle à plusieurs personnes qu'on tutoie."), blank=("macht", "zumachen", ["machen", "mach"])),
                S("Iss nicht so schnell!", "Ne mange pas si vite !", ["iss", "nicht", "so schnell"], focus=("iss", DU, "Essen garde le i : iss."), blank=("iss", "essen", ["ess", "isst"])),
                S("Rufen Sie mich morgen an!", "Appelez-moi demain !", ["rufen", "Sie", "mich", "morgen", "an"], focus=("rufen", SIE, "Rufen Sie : la forme polie."), blank=("rufen", "anrufen", ["ruft", "ruf"])),
                S("Wartet hier auf mich!", "Attendez-moi ici, vous deux !", ["wartet", "hier", "auf mich"], focus=("wartet", IHR, "Wartet, sans ihr : à plusieurs personnes qu'on tutoie."), blank=("wartet", "warten", ["wart", "warten"])),
            ],
            {"prompt": "À qui parle-t-on ?", "options": [DU, IHR, SIE]},
        ),
    ],
}

# ---------------------------------------------------------------- Unit 3: the verb in two pieces
V1 = "le verbe conjugué, en 2e place"
V2 = "la 2e partie du verbe, à la fin"
MID = "le milieu de la phrase"
TWO = {"prompt": "Quel est le rôle du groupe surligné ?", "options": [V1, V2, MID]}
FRAME = "Les deux ordres sont corrects : le verbe conjugué reste 2e, l'autre partie ferme la phrase."

unit3 = {
    "title": "La phrase en deux morceaux",
    "level": "A2",
    "hint": "Le verbe conjugué en 2e place, l'autre partie tout à la fin : la « parenthèse » allemande. Pour comprendre, il faut attendre la fin.",
    "lessons": [
        L(
            "Avec un verbe de modalité",
            R(
                "können, müssen, wollen, dürfen, sollen, möchten sont conjugués en 2e place ; l'autre verbe va à l'infinitif tout à la fin.",
                [
                    "Ich muss heute lange arbeiten.",
                    "Tout le reste se met entre les deux : c'est la « parenthèse » allemande.",
                    "Le français garde les deux verbes ensemble (je dois travailler) ; l'allemand les écarte.",
                ],
                [["Ich muss heute lange arbeiten.", "Aujourd'hui, je dois travailler longtemps."], ["Hier darf man nicht rauchen.", "Ici, on n'a pas le droit de fumer."]],
            ),
            [
                S("Ich muss heute lange arbeiten.", "Aujourd'hui, je dois travailler longtemps.", ["ich", "muss", "heute", "lange", "arbeiten"], ["Heute muss ich lange arbeiten."], ("arbeiten", V2, "L'infinitif ferme la phrase."), ("muss", "müssen", ["musst", "müssen"]), FRAME, meaning=["Hier, j'ai dû travailler longtemps.", "Aujourd'hui, je veux travailler longtemps."]),
                S("Kannst du mir morgen dein Auto leihen?", "Tu peux me prêter ta voiture demain ?", ["kannst", "du", "mir", "morgen", "dein Auto", "leihen"], ["Kannst du mir dein Auto morgen leihen?"], focus=("leihen", V2, "L'infinitif ferme la question."), blank=("kannst", "können", ["kann", "könnt"]), meaning=["Je peux te prêter ma voiture demain ?", "Tu peux me vendre ta voiture demain ?"]),
                S("Wir wollen im Sommer nach Norwegen fahren.", "Nous voulons aller en Norvège cet été.", ["wir", "wollen", "im Sommer", "nach Norwegen", "fahren"], ["Im Sommer wollen wir nach Norwegen fahren."], ("nach Norwegen", MID, "Nach Norwegen est au milieu, entre les deux verbes."), ("wollen", "wollen", ["will", "wollt"]), FRAME),
                S("Hier darf man nicht rauchen.", "Ici, on n'a pas le droit de fumer.", ["hier", "darf", "man", "nicht", "rauchen"], ["Man darf hier nicht rauchen."], ("darf", V1, "Darf, conjugué, reste 2e."), ("darf", "dürfen", ["darfst", "dürfen"]), FRAME, meaning=["Ici, on doit fumer dehors.", "Ici, on peut fumer."]),
                S("Du sollst deine Oma anrufen.", "Tu dois appeler ta grand-mère (on te le demande).", ["du", "sollst", "deine Oma", "anrufen"], focus=("anrufen", V2, "Anrufen reste entier, à la fin."), blank=("sollst", "sollen", ["soll", "sollt"])),
                S("Ich möchte gern einen Kaffee trinken.", "Je voudrais bien boire un café.", ["ich", "möchte", "gern", "einen Kaffee", "trinken"], focus=("einen Kaffee", MID, "Einen Kaffee est au milieu."), blank=("möchte", "möchten", ["möchtest", "mochte"])),
                S("Am Montag kann meine Mutter die Kinder abholen.", "Lundi, ma mère peut aller chercher les enfants.", ["am Montag", "kann", "meine Mutter", "die Kinder", "abholen"], ["Meine Mutter kann am Montag die Kinder abholen."], ("kann", V1, "Kann reste 2e, même après am Montag."), ("kann", "können", ["kannst", "können"]), FRAME, meaning=["Lundi, les enfants peuvent aller chercher ma mère.", "Lundi, ma mère doit aller chercher les enfants."]),
            ],
            TWO,
        ),
        L(
            "Avec le Perfekt",
            R(
                "Au Perfekt, haben ou sein est en 2e place, le participe à la fin : la même parenthèse.",
                [
                    "Plus le milieu est long, plus le participe est loin : Ich habe gestern mit meinem Bruder Fußball gespielt.",
                    "Pour comprendre, attends la fin : c'est le participe qui dit ce qui s'est passé.",
                ],
                [["Ich habe gestern mit meinem Bruder Fußball gespielt.", "Hier, j'ai joué au foot avec mon frère."], ["Habt ihr die Kinder schon abgeholt?", "Vous êtes déjà allés chercher les enfants ?"]],
            ),
            [
                S("Ich habe gestern mit meinem Bruder Fußball gespielt.", "Hier, j'ai joué au foot avec mon frère.", ["ich", "habe", "gestern", "mit meinem Bruder", "Fußball", "gespielt"], ["Gestern habe ich mit meinem Bruder Fußball gespielt."], ("gespielt", V2, "Le participe attend la toute fin."), ("gespielt", "spielen", ["spielt", "gespielen"]), FRAME, meaning=["Hier, mon frère a joué au foot sans moi.", "Hier, j'ai regardé le foot avec mon frère."]),
                S("Sie ist letzte Woche mit dem Zug nach Rom gefahren.", "La semaine dernière, elle est allée à Rome en train.", ["sie", "ist", "letzte Woche", "mit dem Zug", "nach Rom", "gefahren"], ["Letzte Woche ist sie mit dem Zug nach Rom gefahren."], ("mit dem Zug", MID, "Mit dem Zug est au milieu."), ("ist", HS, ["hat"]), FRAME, meaning=["La semaine prochaine, elle va à Rome en train.", "La semaine dernière, elle est revenue de Rome en train."]),
                S("Hast du den Brief schon gelesen?", "Tu as déjà lu la lettre ?", ["hast", "du", "den Brief", "schon", "gelesen"], ["Hast du schon den Brief gelesen?"], ("gelesen", V2, "Le participe ferme la question."), ("gelesen", "lesen", ["gelest", "las"]), "Les deux sont corrects : schon peut venir avant ou après den Brief."),
                S("Wir haben im Urlaub sehr gut gegessen.", "Pendant les vacances, nous avons très bien mangé.", ["wir", "haben", "im Urlaub", "sehr gut", "gegessen"], ["Im Urlaub haben wir sehr gut gegessen."], ("haben", V1, "Haben, conjugué, est en 2e place."), ("gegessen", "essen", ["geesst", "aßen"]), FRAME),
                S("Mein Bruder hat mir zum Geburtstag ein Fahrrad geschenkt.", "Mon frère m'a offert un vélo pour mon anniversaire.", ["mein Bruder", "hat", "mir", "zum Geburtstag", "ein Fahrrad", "geschenkt"], ["Zum Geburtstag hat mir mein Bruder ein Fahrrad geschenkt.", "Mein Bruder hat mir ein Fahrrad zum Geburtstag geschenkt."], ("zum Geburtstag", MID, "Zum Geburtstag est au milieu."), ("geschenkt", "schenken", ["schenkt", "geschenken"]), FRAME, meaning=["J'ai offert un vélo à mon frère pour son anniversaire.", "Mon frère m'a prêté un vélo pour mon anniversaire."]),
                S("Gestern Abend sind wir sehr spät nach Hause gekommen.", "Hier soir, nous sommes rentrés très tard.", ["gestern Abend", "sind", "wir", "sehr spät", "nach Hause", "gekommen"], ["Wir sind gestern Abend sehr spät nach Hause gekommen."], ("gekommen", V2, "Le participe ferme la phrase."), ("sind", HS, ["haben"]), FRAME),
                S("Habt ihr die Kinder schon abgeholt?", "Vous êtes déjà allés chercher les enfants ?", ["habt", "ihr", "die Kinder", "schon", "abgeholt"], ["Habt ihr schon die Kinder abgeholt?"], ("abgeholt", V2, "Le participe ferme la question."), ("abgeholt", "abholen", ["geabholt", "abgeholen"]), "Les deux sont corrects : schon peut venir avant ou après die Kinder."),
            ],
            TWO,
        ),
        L(
            "Avec un verbe séparable",
            R(
                "Au présent, la particule d'un verbe séparable part à la fin : aufstehen → Ich stehe um sieben Uhr auf.",
                [
                    "Le verbe conjugué est en 2e place ; la particule ferme la parenthèse.",
                    "Pour comprendre, attends la particule : Ich stehe… auf (je me lève), Ich rufe… an (j'appelle).",
                    "Avec un verbe de modalité, le verbe reste entier à la fin : Ich muss früh aufstehen.",
                ],
                [["Ich stehe jeden Tag um sieben Uhr auf.", "Je me lève tous les jours à sept heures."], ["Der Film fängt um acht Uhr an.", "Le film commence à huit heures."]],
            ),
            [
                S("Ich stehe jeden Tag um sieben Uhr auf.", "Je me lève tous les jours à sept heures.", ["ich", "stehe", "jeden Tag", "um sieben Uhr", "auf"], ["Jeden Tag stehe ich um sieben Uhr auf."], ("auf", V2, "La particule de aufstehen ferme la phrase."), ("stehe", "aufstehen", ["steht", "stehst"]), FRAME),
                S("Der Film fängt um acht Uhr an.", "Le film commence à huit heures.", ["der Film", "fängt", "um acht Uhr", "an"], ["Um acht Uhr fängt der Film an."], ("an", V2, "La particule de anfangen ferme la phrase."), ("fängt", "anfangen", ["fängst", "fangt"]), FRAME),
                S("Kaufst du heute für uns ein?", "Tu fais les courses pour nous aujourd'hui ?", ["kaufst", "du", "heute", "für uns", "ein"], focus=("ein", V2, "Ein, la particule de einkaufen, ferme la question."), blank=("kaufst", "einkaufen", ["kauft", "kaufe"]), meaning=["Tu nous invites aujourd'hui ?", "Tu as fait les courses pour nous aujourd'hui ?"]),
                S("Am Wochenende räume ich mein Zimmer auf.", "Ce week-end, je range ma chambre.", ["am Wochenende", "räume", "ich", "mein Zimmer", "auf"], ["Ich räume am Wochenende mein Zimmer auf."], ("mein Zimmer", MID, "Mein Zimmer est au milieu."), ("räume", "aufräumen", ["räumst", "räumt"]), FRAME),
                S("Ich muss morgen sehr früh aufstehen.", "Demain, je dois me lever très tôt.", ["ich", "muss", "morgen", "sehr früh", "aufstehen"], ["Morgen muss ich sehr früh aufstehen."], ("aufstehen", V2, "Avec un verbe de modalité, le verbe séparable reste entier à la fin."), why_order=FRAME),
                S("Der Zug kommt pünktlich in Hamburg an.", "Le train arrive à l'heure à Hambourg.", ["der Zug", "kommt", "pünktlich", "in Hamburg", "an"], focus=("kommt", V1, "Kommt est en 2e place ; an attend la fin."), blank=("kommt", "ankommen", ["kommen", "kommst"]), meaning=["Le train part à l'heure de Hambourg.", "Le train arrive en retard à Hambourg."]),
                S("Mach bitte das Licht aus!", "Éteins la lumière, s'il te plaît !", ["mach", "bitte", "das Licht", "aus"], focus=("aus", V2, "Aus ferme la phrase, même à l'impératif."), blank=("mach", "ausmachen", ["machst", "macht"])),
            ],
            TWO,
        ),
        L(
            "Avec werden : le futur",
            R(
                "Au futur, werden est en 2e place et l'infinitif à la fin : Ich werde dich anrufen.",
                [
                    "C'est la même parenthèse qu'avec un verbe de modalité.",
                    "werden seul veut dire « devenir » : Unsere Kinder werden schnell groß. Avec un infinitif à la fin, c'est le futur.",
                ],
                [["Ich werde dich morgen anrufen.", "Je t'appellerai demain."], ["Wir werden nächstes Jahr ein Haus kaufen.", "L'année prochaine, nous achèterons une maison."]],
            ),
            [
                S("Ich werde dich morgen anrufen.", "Je t'appellerai demain.", ["ich", "werde", "dich", "morgen", "anrufen"], ["Morgen werde ich dich anrufen."], ("anrufen", V2, "L'infinitif ferme la phrase."), ("werde", "werden", ["wird", "wirst"]), FRAME, ["Ich rufe dich morgen an.", "Morgen rufe ich dich an."]),
                S("Es wird heute Abend regnen.", "Il va pleuvoir ce soir.", ["es", "wird", "heute Abend", "regnen"], ["Heute Abend wird es regnen."], ("regnen", V2, "L'infinitif ferme la phrase."), ("wird", "werden", ["werdet", "wirst"]), FRAME, ["Es regnet heute Abend.", "Heute Abend regnet es."]),
                S("Unsere Kinder werden schnell groß.", "Nos enfants grandissent vite.", ["unsere Kinder", "werden", "schnell", "groß"], focus=("werden", V1, "Werden seul veut dire « devenir » : il n'y a pas d'infinitif à la fin."), blank=("werden", "werden", ["wird", "werdet"])),
                S("Wir werden nächstes Jahr ein Haus kaufen.", "L'année prochaine, nous achèterons une maison.", ["wir", "werden", "nächstes Jahr", "ein Haus", "kaufen"], ["Nächstes Jahr werden wir ein Haus kaufen."], ("ein Haus", MID, "Ein Haus est au milieu."), ("werden", "werden", ["wird", "werdet"]), FRAME, ["Wir kaufen nächstes Jahr ein Haus.", "Nächstes Jahr kaufen wir ein Haus."], ["L'année dernière, nous avons acheté une maison.", "L'année prochaine, nous vendrons notre maison."]),
                S("Wirst du mich vom Bahnhof abholen?", "Tu viendras me chercher à la gare ?", ["wirst", "du", "mich", "vom Bahnhof", "abholen"], focus=("abholen", V2, "L'infinitif ferme la question."), blank=("wirst", "werden", ["wird", "werdet"]), alt=["Holst du mich vom Bahnhof ab?"]),
                S("Der Arzt wird gleich kommen.", "Le médecin va arriver tout de suite.", ["der Arzt", "wird", "gleich", "kommen"], focus=("wird", V1, "Wird, conjugué, est en 2e place."), blank=("wird", "werden", ["werdet", "wirst"]), alt=["Der Arzt kommt gleich."]),
                S("Wann werdet ihr endlich eure Zimmer aufräumen?", "Quand allez-vous enfin ranger vos chambres ?", ["wann", "werdet", "ihr", "endlich", "eure Zimmer", "aufräumen"], ["Wann werdet ihr eure Zimmer endlich aufräumen?"], focus=("eure Zimmer", MID, "Eure Zimmer est au milieu."), blank=("werdet", "werden", ["werden", "wird"]), alt=["Wann räumt ihr endlich eure Zimmer auf?"]),
            ],
            TWO,
        ),
        L(
            "Tout ensemble : attendre la fin de la phrase",
            R(
                "Dans une longue phrase allemande, ce qui donne le sens arrive souvent à la fin : le participe, l'infinitif ou la particule.",
                [
                    "Pour comprendre, repère d'abord le verbe en 2e place, puis va chercher la fin.",
                    "Ich habe meinen Schlüssel gestern im Büro… vergessen ? gefunden ? Seul le dernier mot le dit.",
                    "Pour parler, construis la parenthèse : le verbe conjugué, le milieu, puis la fin.",
                ],
                [["Ich habe meinen Schlüssel gestern im Büro vergessen.", "Hier, j'ai oublié ma clé au bureau."], ["Wir müssen vor der Reise noch unsere Pässe abholen.", "Avant le voyage, nous devons encore aller chercher nos passeports."]],
            ),
            [
                S("Ich habe meinen Schlüssel gestern im Büro vergessen.", "Hier, j'ai oublié ma clé au bureau.", ["ich", "habe", "meinen Schlüssel", "gestern", "im Büro", "vergessen"], ["Gestern habe ich meinen Schlüssel im Büro vergessen.", "Ich habe gestern meinen Schlüssel im Büro vergessen."], ("vergessen", V2, "Le dernier mot donne le sens : oublier."), ("vergessen", "vergessen", ["vergaß", "gevergessen"]), FRAME, meaning=["Hier, j'ai retrouvé ma clé au bureau.", "Hier, j'ai laissé ma clé à la maison."]),
                S("Kannst du heute nach der Arbeit die Kinder von der Schule abholen?", "Tu peux aller chercher les enfants à l'école aujourd'hui après le travail ?", ["kannst", "du", "heute", "nach der Arbeit", "die Kinder", "von der Schule", "abholen"], focus=("abholen", V2, "Abholen ferme la question : aller chercher."), blank=("kannst", "können", ["kann", "könnt"]), meaning=["Tu peux emmener les enfants à l'école aujourd'hui après le travail ?", "Les enfants peuvent venir te chercher au travail aujourd'hui ?"]),
                S("Meine Eltern sind am Freitag mit dem Auto zu meiner Tante gefahren.", "Vendredi, mes parents sont allés chez ma tante en voiture.", ["meine Eltern", "sind", "am Freitag", "mit dem Auto", "zu meiner Tante", "gefahren"], ["Am Freitag sind meine Eltern mit dem Auto zu meiner Tante gefahren."], ("zu meiner Tante", MID, "Zu meiner Tante est au milieu."), ("sind", HS, ["haben"]), FRAME, meaning=["Vendredi, ma tante est venue chez mes parents en voiture.", "Vendredi, mes parents vont aller chez ma tante en voiture."]),
                S("Heute Abend sehe ich mir mit meinen Freunden das Spiel im Fernsehen an.", "Ce soir, je regarde le match à la télé avec mes amis.", ["heute Abend", "sehe", "ich", "mir", "mit meinen Freunden", "das Spiel", "im Fernsehen", "an"], ["Ich sehe mir heute Abend mit meinen Freunden das Spiel im Fernsehen an."], ("an", V2, "An ferme la phrase : sich etwas ansehen, regarder."), ("sehe", "ansehen", ["siehst", "sieht"]), FRAME, meaning=["Ce soir, je joue au foot avec mes amis.", "Ce soir, mes amis regardent le match sans moi."]),
                S("Wir müssen vor der Reise noch unsere Pässe abholen.", "Avant le voyage, nous devons encore aller chercher nos passeports.", ["wir", "müssen", "vor der Reise", "noch", "unsere Pässe", "abholen"], ["Vor der Reise müssen wir noch unsere Pässe abholen."], ("müssen", V1, "Müssen, conjugué, est en 2e place."), ("müssen", "müssen", ["muss", "müsst"]), FRAME, meaning=["Avant le voyage, nous avons perdu nos passeports.", "Après le voyage, nous devons rendre nos passeports."]),
                S("Hat dir Paul gestern die Fotos vom Urlaub gezeigt?", "Paul t'a montré les photos des vacances hier ?", ["hat", "dir", "Paul", "gestern", "die Fotos vom Urlaub", "gezeigt"], ["Hat Paul dir gestern die Fotos vom Urlaub gezeigt?"], ("gezeigt", V2, "Le participe ferme la question : montrer."), ("gezeigt", "zeigen", ["zeigte", "gezeigen"]), "Les deux sont corrects : le pronom dir passe souvent devant Paul.", meaning=["Tu as montré les photos des vacances à Paul hier ?", "Paul t'a envoyé les photos des vacances hier ?"]),
                S("Ich werde dir morgen beim Umzug helfen.", "Je t'aiderai demain pour le déménagement.", ["ich", "werde", "dir", "morgen", "beim Umzug", "helfen"], ["Morgen werde ich dir beim Umzug helfen."], ("beim Umzug", MID, "Beim Umzug est au milieu."), ("werde", "werden", ["wird", "wirst"]), FRAME, ["Ich helfe dir morgen beim Umzug.", "Morgen helfe ich dir beim Umzug."], ["Tu m'aideras demain pour le déménagement.", "Je t'ai aidé hier pour le déménagement."]),
            ],
            TWO,
        ),
    ],
}

# ---------------------------------------------------------------- Unit 4: nicht
ALL = "toute la phrase"
ONE = "un seul mot ou groupe"
KEIN = "kein : un nom sans article ou avec ein"
NICHT = "nicht : un verbe, un adjectif, un nom avec der, die, das, mein…"

unit4 = {
    "title": "La place de nicht",
    "level": "A2",
    "hint": "nicht va le plus loin possible pour nier toute la phrase ; juste devant un mot, il ne nie que lui.",
    "lessons": [
        L(
            "nicht à la fin, ou avant la 2e partie",
            R(
                "Pour nier toute la phrase, nicht va le plus loin possible : à la fin, ou juste avant la 2e partie du verbe.",
                [
                    "Ich kenne den Mann nicht.",
                    "Ich kann heute nicht kommen. Ich habe ihn nicht gesehen. Sie ruft mich nicht an.",
                    "nicht vient aussi avant un adjectif ou un lieu lié au verbe : Das ist nicht teuer. Wir fahren nicht nach Spanien.",
                ],
                [["Ich kenne den Mann nicht.", "Je ne connais pas cet homme."], ["Ich kann heute nicht kommen.", "Je ne peux pas venir aujourd'hui."]],
            ),
            [
                S("Ich kenne den Mann nicht.", "Je ne connais pas cet homme.", ["ich", "kenne", "den Mann", "nicht"], ["Den Mann kenne ich nicht."], focus=("nicht", ALL, "À la fin : nicht nie toute la phrase."), meaning=["Je connais cet homme.", "Cet homme ne me connaît pas."]),
                S("Ich kann heute nicht kommen.", "Je ne peux pas venir aujourd'hui.", ["ich", "kann", "heute", "nicht", "kommen"], ["Heute kann ich nicht kommen."], ("nicht", ALL, "Nicht vient juste avant la 2e partie : kommen."), why_order=FRAME),
                S("Wir haben den Film nicht gesehen.", "Nous n'avons pas vu le film.", ["wir", "haben", "den Film", "nicht", "gesehen"], ["Den Film haben wir nicht gesehen."], ("nicht", ALL, "Nicht vient juste avant le participe."), why_order=FRAME, meaning=["Nous avons vu le film.", "Le film ne nous a pas plu."]),
                S("Sie ruft mich nicht an.", "Elle ne m'appelle pas.", ["sie", "ruft", "mich", "nicht", "an"], focus=("nicht", ALL, "Nicht se place avant la particule an.")),
                S("Das Essen ist nicht teuer.", "Le repas n'est pas cher.", ["das Essen", "ist", "nicht", "teuer"], focus=("nicht", ALL, "Avant un adjectif lié à sein : nicht teuer.")),
                S("Wir fahren dieses Jahr nicht nach Spanien.", "Cette année, nous n'allons pas en Espagne.", ["wir", "fahren", "dieses Jahr", "nicht", "nach Spanien"], ["Dieses Jahr fahren wir nicht nach Spanien."], ("nicht", ALL, "Avant le lieu lié au verbe : nicht nach Spanien."), why_order=SECOND),
                S("Warum hast du mich nicht angerufen?", "Pourquoi ne m'as-tu pas appelé ?", ["warum", "hast", "du", "mich", "nicht", "angerufen"], focus=("nicht", ALL, "Nicht vient juste avant le participe.")),
            ],
            {"prompt": "Que nie nicht ici ?", "options": [ALL, ONE]},
        ),
        L(
            "nicht devant un seul mot : nicht heute, sondern morgen",
            R(
                "Placé juste devant un mot, nicht ne nie que lui. Souvent, sondern donne ensuite la bonne information.",
                [
                    "Ich komme nicht heute, sondern morgen.",
                    "Nicht ich habe das gesagt, sondern Paul.",
                    "Comparer : Ich komme heute nicht (je ne viens pas) et Ich komme nicht heute (je viens, mais pas aujourd'hui).",
                ],
                [["Ich komme nicht heute, sondern morgen.", "Je ne viens pas aujourd'hui, mais demain."], ["Ich komme heute nicht.", "Aujourd'hui, je ne viens pas."]],
            ),
            [
                S("Ich komme nicht heute, sondern morgen.", "Je ne viens pas aujourd'hui, mais demain.", ["ich", "komme", "nicht heute", "sondern morgen"], focus=("nicht", ONE, "Juste devant heute : nicht ne nie que le jour."), meaning=["Je ne viens ni aujourd'hui ni demain.", "Je viens aujourd'hui et demain."]),
                S("Ich komme heute nicht.", "Aujourd'hui, je ne viens pas.", ["ich", "komme", "heute", "nicht"], ["Heute komme ich nicht."], ("nicht", ALL, "À la fin : nicht nie toute la phrase."), why_order=SECOND, meaning=["Je ne viens pas aujourd'hui, mais demain.", "Je viens aujourd'hui."]),
                S("Nicht ich habe das gesagt, sondern Paul.", "Ce n'est pas moi qui ai dit ça, c'est Paul.", ["nicht ich", "habe", "das", "gesagt", "sondern Paul"], ["Das habe nicht ich gesagt, sondern Paul."], focus=("nicht", ONE, "Nicht ich : seul le sujet est nié."), meaning=["Je n'ai pas dit ça à Paul.", "Ni Paul ni moi n'avons dit ça."]),
                S("Wir fahren nicht mit dem Auto, sondern mit dem Zug.", "Nous n'y allons pas en voiture, mais en train.", ["wir", "fahren", "nicht mit dem Auto", "sondern mit dem Zug"], focus=("nicht", ONE, "Seul le moyen de transport est nié."), meaning=["Nous n'y allons ni en voiture ni en train.", "Nous y allons en voiture, pas en train."]),
                S("Er hat nicht den roten, sondern den blauen Pullover gekauft.", "Il n'a pas acheté le pull rouge, mais le bleu.", ["er", "hat", "nicht den roten", "sondern den blauen Pullover", "gekauft"], focus=("nicht", ONE, "Seule la couleur est niée : il a bien acheté un pull."), meaning=["Il a acheté le pull rouge et le bleu.", "Il n'a acheté aucun pull."]),
                S("Er hat den Pullover nicht gekauft.", "Il n'a pas acheté le pull.", ["er", "hat", "den Pullover", "nicht", "gekauft"], ["Den Pullover hat er nicht gekauft."], focus=("nicht", ALL, "Avant le participe : nicht nie l'achat lui-même."), meaning=["Il a acheté le pull.", "Il n'a pas acheté le pull rouge, mais le bleu."]),
                S("Das Konzert ist nicht am Samstag, sondern am Sonntag.", "Le concert n'est pas samedi, mais dimanche.", ["das Konzert", "ist", "nicht am Samstag", "sondern am Sonntag"], focus=("nicht", ONE, "Seul le jour est nié : le concert a bien lieu.")),
            ],
            {"prompt": "Que nie nicht ici ?", "options": [ALL, ONE]},
        ),
        L(
            "nicht ou kein ?",
            R(
                "kein nie un nom sans article ou avec ein ; nicht nie tout le reste.",
                [
                    "kein : Ich habe kein Auto. Er trinkt keinen Kaffee.",
                    "nicht : un verbe, un adjectif, un nom avec der, die, das ou mein, dein… : Ich finde das Auto nicht. Das ist nicht mein Handy.",
                    "kein prend les terminaisons de ein : keinen Hunger, keine Zeit, kein Geld.",
                ],
                [["Ich habe kein Auto.", "Je n'ai pas de voiture."], ["Ich finde das Auto nicht.", "Je ne trouve pas la voiture."]],
            ),
            [
                S("Ich habe kein Auto.", "Je n'ai pas de voiture.", ["ich", "habe", "kein Auto"], focus=("kein", KEIN, "Ein Auto devient kein Auto."), blank=("kein Auto", "ein Auto", ["keine Auto", "keinen Auto"])),
                S("Ich finde das Auto nicht.", "Je ne trouve pas la voiture.", ["ich", "finde", "das Auto", "nicht"], focus=("nicht", NICHT, "Das Auto, avec das : nicht.")),
                S("Er trinkt keinen Kaffee.", "Il ne boit pas de café.", ["er", "trinkt", "keinen Kaffee"], focus=("keinen", KEIN, "Kaffee sans article : kein, ici keinen (masculin, accusatif)."), blank=("keinen Kaffee", "Kaffee", ["nicht Kaffee", "kein Kaffee"])),
                S("Wir haben heute keine Zeit.", "Aujourd'hui, nous n'avons pas le temps.", ["wir", "haben", "heute", "keine Zeit"], ["Heute haben wir keine Zeit."], ("keine", KEIN, "Zeit sans article : keine Zeit."), ("keine Zeit", "Zeit", ["nicht Zeit", "keinen Zeit"]), SECOND),
                S("Das ist nicht mein Handy.", "Ce n'est pas mon portable.", ["das", "ist", "nicht", "mein Handy"], focus=("nicht", NICHT, "Mein Handy a un possessif : nicht.")),
                S("Sie hat keine Geschwister.", "Elle n'a pas de frères et sœurs.", ["sie", "hat", "keine Geschwister"], focus=("keine", KEIN, "Geschwister sans article : keine."), blank=("keine Geschwister", "Geschwister", ["nicht Geschwister", "keinen Geschwister"])),
                S("Ich verstehe dich nicht.", "Je ne te comprends pas.", ["ich", "verstehe", "dich", "nicht"], focus=("nicht", NICHT, "On nie un verbe : nicht.")),
                S("Hast du keinen Hunger?", "Tu n'as pas faim ?", ["hast", "du", "keinen Hunger"], focus=("keinen", KEIN, "Hunger sans article : keinen Hunger."), blank=("keinen Hunger", "Hunger", ["nicht Hunger", "kein Hunger"])),
            ],
            {"prompt": "Pourquoi nicht ou kein ici ?", "options": [KEIN, NICHT]},
        ),
    ],
}

# ---------------------------------------------------------------- Unit 5: joining two sentences
C1 = "la 1re proposition"
LINK = "le mot qui relie"
C2 = "la 2e proposition"
CLAUSES = {"prompt": "Quel est le rôle du groupe surligné ?", "options": [C1, LINK, C2]}
ABER = "aber : une opposition"
SONDERN = "sondern : on corrige, après une négation"
CAUSE = "la cause : pourquoi ?"
EFFECT = "ce qui se passe"

unit5 = {
    "title": "Relier deux phrases : und, aber, denn",
    "level": "A2",
    "hint": "und, oder, aber, sondern et denn relient deux phrases sans rien changer à leur ordre.",
    "lessons": [
        L(
            "und, oder : l'ordre ne change pas",
            R(
                "und, oder, aber, denn et sondern relient deux phrases sans changer leur ordre : après eux, la phrase reste normale.",
                [
                    "Ich bin müde und gehe ins Bett.",
                    "Si le sujet est le même, on peut ne pas le répéter : Sie trinkt Tee und liest die Zeitung.",
                    "Ces mots ne comptent pas comme 1re place : …und morgen habe ich frei.",
                ],
                [["Ich bin müde und gehe ins Bett.", "Je suis fatigué et je vais me coucher."], ["Heute arbeite ich und morgen habe ich frei.", "Aujourd'hui je travaille, et demain je suis libre."]],
            ),
            [
                S("Ich bin müde und gehe ins Bett.", "Je suis fatigué et je vais me coucher.", ["ich", "bin", "müde", "und", "gehe", "ins Bett"], focus=("und", LINK, "Und relie les deux phrases."), alt=["Ich bin müde, und ich gehe ins Bett.", "Ich bin müde und ich gehe ins Bett."], combine=(["Ich bin müde.", "Ich gehe ins Bett."], "und")),
                S("Mein Bruder spielt Gitarre und meine Schwester singt.", "Mon frère joue de la guitare et ma sœur chante.", ["mein Bruder", "spielt", "Gitarre", "und", "meine Schwester", "singt"], focus=("meine Schwester singt", C2, "Après und, une 2e phrase complète."), meaning=["Mon frère joue de la guitare et chante avec ma sœur.", "Ma sœur joue de la guitare et mon frère chante."], combine=(["Mein Bruder spielt Gitarre.", "Meine Schwester singt."], "und")),
                S("Kommst du mit oder bleibst du zu Hause?", "Tu viens avec nous ou tu restes à la maison ?", ["kommst", "du", "mit", "oder", "bleibst", "du", "zu Hause"], focus=("oder", LINK, "Oder relie les deux questions."), combine=(["Kommst du mit?", "Bleibst du zu Hause?"], "oder")),
                S("Wir essen zu Hause oder wir gehen ins Restaurant.", "Nous mangeons à la maison ou nous allons au restaurant.", ["wir", "essen", "zu Hause", "oder", "wir", "gehen", "ins Restaurant"], focus=("wir essen zu Hause", C1, "La 1re proposition, avant oder."), alt=["Wir essen zu Hause oder gehen ins Restaurant."], combine=(["Wir essen zu Hause.", "Wir gehen ins Restaurant."], "oder")),
                S("Heute arbeite ich und morgen habe ich frei.", "Aujourd'hui je travaille, et demain je suis libre.", ["heute", "arbeite", "ich", "und", "morgen", "habe", "ich", "frei"], ["Ich arbeite heute und morgen habe ich frei.", "Heute arbeite ich und ich habe morgen frei.", "Ich arbeite heute und ich habe morgen frei."], focus=("morgen habe ich frei", C2, "Après und, une phrase normale : morgen en 1re place, habe en 2e."), meaning=["Aujourd'hui et demain, je travaille.", "Aujourd'hui je suis libre, et demain je travaille."], why_order="Tous corrects : de chaque côté de und, le verbe reste en 2e position.", combine=(["Heute arbeite ich.", "Morgen habe ich frei."], "und")),
                S("Sie trinkt Tee und liest die Zeitung.", "Elle boit du thé et lit le journal.", ["sie", "trinkt", "Tee", "und", "liest", "die Zeitung"], focus=("liest die Zeitung", C2, "Même sujet : on ne répète pas sie."), alt=["Sie trinkt Tee und sie liest die Zeitung."], combine=(["Sie trinkt Tee.", "Sie liest die Zeitung."], "und")),
                S("Ich nehme den Bus oder ich fahre mit dem Fahrrad.", "Je prends le bus ou j'y vais à vélo.", ["ich", "nehme", "den Bus", "oder", "ich", "fahre", "mit dem Fahrrad"], focus=("oder", LINK, "Oder relie les deux possibilités."), alt=["Ich nehme den Bus oder fahre mit dem Fahrrad."], combine=(["Ich nehme den Bus.", "Ich fahre mit dem Fahrrad."], "oder")),
            ],
            CLAUSES,
        ),
        L(
            "aber et sondern : mais",
            R(
                "L'allemand a deux « mais ».",
                [
                    "aber : une opposition : Das Hotel ist alt, aber sehr schön.",
                    "sondern : « mais au contraire », seulement après une négation : Er ist nicht alt, sondern jung.",
                    "Après les deux, l'ordre reste normal : Ich möchte kommen, aber ich habe keine Zeit.",
                    "Une virgule avant aber et sondern.",
                ],
                [["Ich möchte kommen, aber ich habe keine Zeit.", "J'aimerais venir, mais je n'ai pas le temps."], ["Er ist nicht alt, sondern jung.", "Il n'est pas vieux, mais jeune."]],
            ),
            [
                S("Ich möchte kommen, aber ich habe keine Zeit.", "J'aimerais venir, mais je n'ai pas le temps.", ["ich", "möchte", "kommen", "aber", "ich", "habe", "keine Zeit"], focus=("aber", ABER, "Une opposition : aber."), blank=("aber", "mais", ["sondern", "denn"]), meaning=["Je viendrai quand j'aurai le temps.", "J'aimerais venir parce que j'ai le temps."], combine=(["Ich möchte kommen.", "Ich habe keine Zeit."], "aber")),
                S("Er ist nicht alt, sondern jung.", "Il n'est pas vieux, mais jeune.", ["er", "ist", "nicht", "alt", "sondern", "jung"], focus=("sondern", SONDERN, "Après nicht, on corrige : sondern."), blank=("sondern", "mais", ["aber", "oder"])),
                S("Das Hotel ist alt, aber sehr schön.", "L'hôtel est vieux, mais très beau.", ["das Hotel", "ist", "alt", "aber", "sehr schön"], focus=("aber", ABER, "Pas de négation à corriger : aber."), blank=("aber", "mais", ["sondern", "und"])),
                S("Wir fahren nicht nach Italien, sondern nach Spanien.", "Nous n'allons pas en Italie, mais en Espagne.", ["wir", "fahren", "nicht", "nach Italien", "sondern", "nach Spanien"], focus=("sondern", SONDERN, "Après nicht, on corrige : sondern."), blank=("sondern", "mais", ["aber", "denn"]), meaning=["Nous allons en Italie, puis en Espagne.", "Nous n'allons ni en Italie ni en Espagne."]),
                S("Ich habe ihn angerufen, aber er war nicht zu Hause.", "Je l'ai appelé, mais il n'était pas chez lui.", ["ich", "habe", "ihn", "angerufen", "aber", "er", "war", "nicht", "zu Hause"], focus=("aber", ABER, "Une opposition : aber."), blank=("aber", "mais", ["sondern", "oder"]), meaning=["Il m'a appelé, mais je n'étais pas chez moi.", "Je l'ai appelé parce qu'il n'était pas chez lui."], combine=(["Ich habe ihn angerufen.", "Er war nicht zu Hause."], "aber")),
                S("Sie trinkt keinen Kaffee, sondern Tee.", "Elle ne boit pas de café, mais du thé.", ["sie", "trinkt", "keinen Kaffee", "sondern", "Tee"], focus=("sondern", SONDERN, "Après kein aussi, on corrige avec sondern."), blank=("sondern", "mais", ["aber", "und"])),
                S("Das Essen war teuer, aber es hat gut geschmeckt.", "Le repas était cher, mais il était bon.", ["das Essen", "war", "teuer", "aber", "es", "hat", "gut", "geschmeckt"], focus=("aber", ABER, "Une opposition : aber."), blank=("aber", "mais", ["sondern", "denn"]), combine=(["Das Essen war teuer.", "Es hat gut geschmeckt."], "aber")),
            ],
            {"prompt": "aber ou sondern : pourquoi ?", "options": [ABER, SONDERN]},
        ),
        L(
            "denn : car, sans changer l'ordre",
            R(
                "denn veut dire « car ». Après denn, l'ordre reste normal : Ich bleibe zu Hause, denn ich bin krank.",
                [
                    "denn n'ouvre pas la phrase : la cause vient après.",
                    "Bientôt, weil dira la même chose, mais enverra le verbe à la fin : …, weil ich krank bin.",
                    "Une virgule avant denn.",
                ],
                [["Ich bleibe zu Hause, denn ich bin krank.", "Je reste à la maison, car je suis malade."], ["Wir nehmen ein Taxi, denn es regnet.", "Nous prenons un taxi, car il pleut."]],
            ),
            [
                S("Ich bleibe zu Hause, denn ich bin krank.", "Je reste à la maison, car je suis malade.", ["ich", "bleibe", "zu Hause", "denn", "ich", "bin", "krank"], focus=("ich bin krank", CAUSE, "Après denn : la cause."), blank=("denn", "car", ["weil", "aber"]), meaning=["Je suis malade parce que je reste à la maison.", "Je reste à la maison, mais je ne suis pas malade."], combine=(["Ich bleibe zu Hause.", "Ich bin krank."], "denn")),
                S("Wir nehmen ein Taxi, denn es regnet.", "Nous prenons un taxi, car il pleut.", ["wir", "nehmen", "ein Taxi", "denn", "es", "regnet"], focus=("wir nehmen ein Taxi", EFFECT, "Avant denn : ce qui se passe."), blank=("denn", "car", ["weil", "oder"]), meaning=["Il pleut parce que nous prenons un taxi.", "Nous prenons un taxi chaque fois qu'il pleut."], combine=(["Wir nehmen ein Taxi.", "Es regnet."], "denn")),
                S("Sie lernt Deutsch, denn sie will in Berlin studieren.", "Elle apprend l'allemand, car elle veut étudier à Berlin.", ["sie", "lernt", "Deutsch", "denn", "sie", "will", "in Berlin", "studieren"], focus=("sie will in Berlin studieren", CAUSE, "Après denn : la cause, dans l'ordre normal."), meaning=["Elle étudie à Berlin, donc elle apprend l'allemand.", "Elle apprend l'allemand à Berlin."], combine=(["Sie lernt Deutsch.", "Sie will in Berlin studieren."], "denn")),
                S("Ich gehe früh schlafen, denn morgen muss ich früh aufstehen.", "Je me couche tôt, car demain je dois me lever tôt.", ["ich", "gehe", "früh", "schlafen", "denn", "morgen", "muss", "ich", "früh", "aufstehen"], ["Ich gehe früh schlafen, denn ich muss morgen früh aufstehen."], focus=("morgen muss ich früh aufstehen", CAUSE, "Après denn, une phrase normale : morgen 1er, muss 2e."), combine=(["Ich gehe früh schlafen.", "Morgen muss ich früh aufstehen."], "denn")),
                S("Er ist glücklich, denn er hat eine neue Stelle gefunden.", "Il est heureux, car il a trouvé un nouveau poste.", ["er", "ist", "glücklich", "denn", "er", "hat", "eine neue Stelle", "gefunden"], focus=("er ist glücklich", EFFECT, "Avant denn : ce qui se passe."), meaning=["Il a trouvé un nouveau poste parce qu'il est heureux.", "Il est heureux, mais il cherche un nouveau poste."], combine=(["Er ist glücklich.", "Er hat eine neue Stelle gefunden."], "denn")),
                S("Nimm einen Schirm mit, denn es wird regnen.", "Prends un parapluie, car il va pleuvoir.", ["nimm", "einen Schirm", "mit", "denn", "es", "wird", "regnen"], focus=("es wird regnen", CAUSE, "Après denn : la cause."), combine=(["Nimm einen Schirm mit!", "Es wird regnen."], "denn")),
                S("Wir können nicht kommen, denn unser Auto ist kaputt.", "Nous ne pouvons pas venir, car notre voiture est en panne.", ["wir", "können", "nicht", "kommen", "denn", "unser Auto", "ist", "kaputt"], focus=("unser Auto ist kaputt", CAUSE, "Après denn : la cause."), meaning=["Notre voiture est en panne parce que nous ne venons pas.", "Nous venons, même si notre voiture est en panne."], combine=(["Wir können nicht kommen.", "Unser Auto ist kaputt."], "denn")),
            ],
            {"prompt": "Que dit le groupe surligné ?", "options": [CAUSE, EFFECT]},
        ),
    ],
}

# ---------------------------------------------------------------- Unit 6: the subordinate clause, verb at the end
MAIN = "la principale"
SUBC = "la subordonnée"
OPENER = "le mot qui ouvre la subordonnée"
VEND = "le verbe de la subordonnée, à la fin"
SUB = {"prompt": "Quel est le rôle du groupe surligné ?", "options": [MAIN, SUBC, OPENER, VEND]}
OB = "ob : est-ce que… ?"
WENN = "wenn : à condition que"
BECAUSE = "la cause (weil)"
DESPITE = "un obstacle, malgré lequel… (obwohl)"
WHY_OR_DESPITE = "parce que ? bien que ?"

unit6 = {
    "title": "La subordonnée : le verbe à la fin",
    "level": "A2",
    "hint": "weil, dass, wenn, ob, obwohl ouvrent une subordonnée : le verbe conjugué part tout à la fin.",
    "lessons": [
        L(
            "weil : le verbe part à la fin",
            R(
                "weil veut dire « parce que ». Il ouvre une subordonnée, et le verbe conjugué part tout à la fin.",
                [
                    "Ich bleibe zu Hause, weil es regnet.",
                    "Comparer : …, denn es regnet (ordre normal) et …, weil es regnet (verbe à la fin).",
                    "Le sujet suit en général juste weil : weil ich, weil mein Bruder…",
                    "Avec deux verbes, le conjugué passe tout au bout : …, weil sie in Wien arbeiten will.",
                    "Toujours une virgule avant weil.",
                ],
                [["Ich bleibe zu Hause, weil es regnet.", "Je reste à la maison parce qu'il pleut."], ["Sie lernt Deutsch, weil sie in Wien arbeiten will.", "Elle apprend l'allemand parce qu'elle veut travailler à Vienne."]],
            ),
            [
                S("Ich bleibe zu Hause, weil es regnet.", "Je reste à la maison parce qu'il pleut.", ["ich", "bleibe", "zu Hause", "weil", "es", "regnet"], focus=("regnet", VEND, "Après weil, le verbe part à la fin."), blank=("regnet", "regnen", ["regnen", "regnest"]), why_order="Les deux ordres sont corrects : si la subordonnée ouvre la phrase, le verbe de la principale vient juste après la virgule.", alt=["Weil es regnet, bleibe ich zu Hause."], meaning=["Il pleut parce que je reste à la maison.", "Je reste à la maison, mais il ne pleut pas."], combine=(["Ich bleibe zu Hause.", "Es regnet."], "weil")),
                S("Sie lernt Deutsch, weil sie in Wien arbeiten will.", "Elle apprend l'allemand parce qu'elle veut travailler à Vienne.", ["sie", "lernt", "Deutsch", "weil", "sie", "in Wien", "arbeiten", "will"], focus=("will", VEND, "Le verbe de modalité conjugué passe tout à la fin, après l'infinitif."), blank=("will", "wollen", ["willst", "wollt"]), why_order="Les deux ordres sont corrects : si la subordonnée ouvre la phrase, le verbe de la principale vient juste après la virgule.", alt=["Weil sie in Wien arbeiten will, lernt sie Deutsch."], combine=(["Sie lernt Deutsch.", "Sie will in Wien arbeiten."], "weil")),
                S("Wir nehmen ein Taxi, weil der Bus nicht kommt.", "Nous prenons un taxi parce que le bus ne vient pas.", ["wir", "nehmen", "ein Taxi", "weil", "der Bus", "nicht", "kommt"], focus=("weil der Bus nicht kommt", SUBC, "De weil jusqu'au verbe : la subordonnée."), blank=("kommt", "kommen", ["kommen", "kommst"]), why_order="Les deux ordres sont corrects : si la subordonnée ouvre la phrase, le verbe de la principale vient juste après la virgule.", alt=["Weil der Bus nicht kommt, nehmen wir ein Taxi."], meaning=["Le bus ne vient pas parce que nous prenons un taxi.", "Nous prenons le bus parce qu'il n'y a pas de taxi."], combine=(["Wir nehmen ein Taxi.", "Der Bus kommt nicht."], "weil")),
                S("Er ist müde, weil er schlecht geschlafen hat.", "Il est fatigué parce qu'il a mal dormi.", ["er", "ist", "müde", "weil", "er", "schlecht", "geschlafen", "hat"], focus=("hat", VEND, "Au Perfekt, hat passe après le participe, tout à la fin."), blank=("geschlafen", "schlafen", ["geschlaft", "schlief"]), why_order="Les deux ordres sont corrects : si la subordonnée ouvre la phrase, le verbe de la principale vient juste après la virgule.", alt=["Weil er schlecht geschlafen hat, ist er müde."], combine=(["Er ist müde.", "Er hat schlecht geschlafen."], "weil")),
                S("Ich rufe dich an, weil ich eine Frage habe.", "Je t'appelle parce que j'ai une question.", ["ich", "rufe", "dich", "an", "weil", "ich", "eine Frage", "habe"], focus=("ich rufe dich an", MAIN, "Avant weil : la principale, dans l'ordre normal."), blank=("habe", "haben", ["hat", "hast"]), why_order="Les deux ordres sont corrects : si la subordonnée ouvre la phrase, le verbe de la principale vient juste après la virgule.", alt=["Weil ich eine Frage habe, rufe ich dich an."], meaning=["Tu m'appelles parce que tu as une question.", "Je t'appelle parce que tu as une question."], combine=(["Ich rufe dich an.", "Ich habe eine Frage."], "weil")),
                S("Die Kinder sind glücklich, weil heute die Ferien beginnen.", "Les enfants sont heureux parce que les vacances commencent aujourd'hui.", ["die Kinder", "sind", "glücklich", "weil", "heute", "die Ferien", "beginnen"], focus=("weil", OPENER, "Weil ouvre la subordonnée."), blank=("weil", "parce que", ["denn", "obwohl"]), why_order="Les deux ordres sont corrects : si la subordonnée ouvre la phrase, le verbe de la principale vient juste après la virgule.", alt=["Weil heute die Ferien beginnen, sind die Kinder glücklich.", "Die Kinder sind glücklich, weil die Ferien heute beginnen."], combine=(["Die Kinder sind glücklich.", "Heute beginnen die Ferien."], "weil")),
                S("Ich kaufe kein Auto, weil es zu teuer ist.", "Je n'achète pas de voiture parce que c'est trop cher.", ["ich", "kaufe", "kein Auto", "weil", "es", "zu teuer", "ist"], focus=("ist", VEND, "Après weil, le verbe part à la fin."), blank=("ist", "sein", ["sind", "bist"]), why_order="Les deux ordres sont corrects : si la subordonnée ouvre la phrase, le verbe de la principale vient juste après la virgule.", alt=["Weil es zu teuer ist, kaufe ich kein Auto."], meaning=["J'achète une voiture parce qu'elle n'est pas chère.", "La voiture est trop chère, mais je l'achète."], combine=(["Ich kaufe kein Auto.", "Es ist zu teuer."], "weil")),
            ],
            SUB,
        ),
        L(
            "dass : rapporter ce qu'on dit ou pense",
            R(
                "dass veut dire « que ». Après ich glaube, ich weiß, er sagt, es ist schön…, il ouvre une subordonnée : verbe à la fin.",
                [
                    "Ich glaube, dass er recht hat.",
                    "das (le, ce) et dass (que) se prononcent pareil : dass prend deux s.",
                    "Après glauben, wissen, sagen, hoffen…, on peut aussi enlever dass ; l'ordre redevient normal : Ich glaube, er hat recht.",
                    "Un verbe séparable reste entier à la fin : …, dass Paul umzieht.",
                ],
                [["Ich glaube, dass er recht hat.", "Je crois qu'il a raison."], ["Weißt du, dass Paul umzieht?", "Tu sais que Paul déménage ?"]],
            ),
            [
                S("Ich glaube, dass er recht hat.", "Je crois qu'il a raison.", ["ich", "glaube", "dass", "er", "recht", "hat"], focus=("dass", OPENER, "Dass ouvre la subordonnée."), blank=("hat", "haben", ["habe", "hast"]), alt=["Ich glaube, er hat recht."], combine=(["Ich glaube es.", "Er hat recht."], "dass")),
                S("Sie sagt, dass sie morgen kommt.", "Elle dit qu'elle vient demain.", ["sie", "sagt", "dass", "sie", "morgen", "kommt"], focus=("kommt", VEND, "Après dass, le verbe part à la fin."), blank=("kommt", "kommen", ["kommen", "komme"]), alt=["Sie sagt, sie kommt morgen."], meaning=["Elle dit qu'elle est venue hier.", "Je dis qu'elle vient demain."]),
                S("Weißt du, dass Paul umzieht?", "Tu sais que Paul déménage ?", ["weißt", "du", "dass", "Paul", "umzieht"], focus=("umzieht", VEND, "Dans la subordonnée, le verbe séparable reste entier à la fin : umzieht."), blank=("umzieht", "umziehen", ["zieht um", "umziehst"]), meaning=["Tu sais où Paul habite ?", "Tu sais que Paul a déménagé ?"]),
                S("Es ist schön, dass du da bist.", "C'est bien que tu sois là.", ["es", "ist", "schön", "dass", "du", "da", "bist"], focus=("dass du da bist", SUBC, "De dass jusqu'au verbe : la subordonnée."), blank=("bist", "sein", ["seist", "sind"])),
                S("Ich hoffe, dass das Wetter morgen gut ist.", "J'espère qu'il fera beau demain.", ["ich", "hoffe", "dass", "das Wetter", "morgen", "gut", "ist"], focus=("dass", OPENER, "Dass (que) ouvre la subordonnée ; das Wetter, avec un seul s, c'est l'article."), blank=("dass", "que", ["das", "weil"]), alt=["Ich hoffe, das Wetter ist morgen gut."]),
                S("Er hat mir gesagt, dass er keine Zeit hat.", "Il m'a dit qu'il n'avait pas le temps.", ["er", "hat", "mir", "gesagt", "dass", "er", "keine Zeit", "hat"], focus=("er hat mir gesagt", MAIN, "Avant dass : la principale."), meaning=["Je lui ai dit qu'il n'avait pas le temps.", "Il m'a dit qu'il aurait le temps."], alt=["Er hat mir gesagt, er hat keine Zeit."]),
                S("Ich finde es gut, dass ihr zusammen lernt.", "Je trouve bien que vous appreniez ensemble.", ["ich", "finde", "es", "gut", "dass", "ihr", "zusammen", "lernt"], focus=("lernt", VEND, "Après dass, le verbe part à la fin."), blank=("lernt", "lernen", ["lernen", "lernst"])),
            ],
            SUB,
        ),
        L(
            "wenn : si, quand",
            R(
                "wenn veut dire « si » (une condition) ou « quand » (chaque fois que, ou dans le futur). Le verbe part à la fin.",
                [
                    "Ruf mich an, wenn du Zeit hast.",
                    "Pour une condition, c'est wenn, jamais ob.",
                    "wenn ouvre très souvent la phrase ; la principale commence alors par son verbe : Wenn du Zeit hast, ruf mich an. On s'y entraînera beaucoup dans l'unité suivante.",
                ],
                [["Ruf mich an, wenn du Zeit hast.", "Appelle-moi si tu as le temps."], ["Der Hund bellt, wenn jemand klingelt.", "Le chien aboie quand quelqu'un sonne."]],
            ),
            [
                S("Ruf mich an, wenn du Zeit hast.", "Appelle-moi si tu as le temps.", ["ruf", "mich", "an", "wenn", "du", "Zeit", "hast"], focus=("hast", VEND, "Après wenn, le verbe part à la fin."), blank=("hast", "haben", ["hat", "habt"]), why_order="Les deux ordres sont corrects : si la subordonnée ouvre la phrase, le verbe de la principale vient juste après la virgule.", alt=["Wenn du Zeit hast, ruf mich an."], meaning=["Appelle-moi quand tu auras fini.", "Je t'appelle si j'ai le temps."], combine=(["Ruf mich an!", "Du hast Zeit."], "wenn")),
                S("Wir gehen spazieren, wenn die Sonne scheint.", "Nous allons nous promener quand le soleil brille.", ["wir", "gehen", "spazieren", "wenn", "die Sonne", "scheint"], focus=("wenn die Sonne scheint", SUBC, "De wenn jusqu'au verbe : la subordonnée."), blank=("scheint", "scheinen", ["scheinen", "scheinst"]), why_order="Les deux ordres sont corrects : si la subordonnée ouvre la phrase, le verbe de la principale vient juste après la virgule.", alt=["Wenn die Sonne scheint, gehen wir spazieren."], combine=(["Wir gehen spazieren.", "Die Sonne scheint."], "wenn")),
                S("Ich trinke Kaffee, wenn ich müde bin.", "Je bois du café quand je suis fatigué.", ["ich", "trinke", "Kaffee", "wenn", "ich", "müde", "bin"], focus=("ich trinke Kaffee", MAIN, "Avant wenn : la principale."), blank=("bin", "sein", ["ist", "bist"]), why_order="Les deux ordres sont corrects : si la subordonnée ouvre la phrase, le verbe de la principale vient juste après la virgule.", alt=["Wenn ich müde bin, trinke ich Kaffee."], meaning=["Je suis fatigué quand je bois du café.", "Je ne bois pas de café quand je suis fatigué."], combine=(["Ich trinke Kaffee.", "Ich bin müde."], "wenn")),
                S("Du kannst bei uns schlafen, wenn du willst.", "Tu peux dormir chez nous si tu veux.", ["du", "kannst", "bei uns", "schlafen", "wenn", "du", "willst"], focus=("willst", VEND, "Après wenn, le verbe part à la fin."), blank=("willst", "wollen", ["will", "wollt"]), why_order="Les deux ordres sont corrects : si la subordonnée ouvre la phrase, le verbe de la principale vient juste après la virgule.", alt=["Wenn du willst, kannst du bei uns schlafen."]),
                S("Sag mir Bescheid, wenn du angekommen bist.", "Préviens-moi quand tu seras arrivé.", ["sag", "mir", "Bescheid", "wenn", "du", "angekommen", "bist"], focus=("bist", VEND, "Au Perfekt : le participe, puis bist tout à la fin."), blank=("bist", HS, ["hast"]), why_order="Les deux ordres sont corrects : si la subordonnée ouvre la phrase, le verbe de la principale vient juste après la virgule.", alt=["Wenn du angekommen bist, sag mir Bescheid."], meaning=["Préviens-moi avant de partir.", "Je te préviens quand je serai arrivé."]),
                S("Der Hund bellt, wenn jemand klingelt.", "Le chien aboie quand quelqu'un sonne.", ["der Hund", "bellt", "wenn", "jemand", "klingelt"], focus=("wenn", OPENER, "Wenn ouvre la subordonnée."), blank=("klingelt", "klingeln", ["klingeln", "klingelst"]), why_order="Les deux ordres sont corrects : si la subordonnée ouvre la phrase, le verbe de la principale vient juste après la virgule.", alt=["Wenn jemand klingelt, bellt der Hund."], meaning=["Quelqu'un sonne quand le chien aboie.", "Le chien aboie si personne ne sonne."], combine=(["Der Hund bellt.", "Jemand klingelt."], "wenn")),
                S("Ich komme gern mit, wenn ich nicht arbeiten muss.", "Je viens volontiers si je ne dois pas travailler.", ["ich", "komme", "gern", "mit", "wenn", "ich", "nicht", "arbeiten", "muss"], focus=("muss", VEND, "Le verbe de modalité conjugué passe tout à la fin."), blank=("muss", "müssen", ["musst", "müssen"]), why_order="Les deux ordres sont corrects : si la subordonnée ouvre la phrase, le verbe de la principale vient juste après la virgule.", alt=["Wenn ich nicht arbeiten muss, komme ich gern mit."], combine=(["Ich komme gern mit.", "Ich muss nicht arbeiten."], "wenn")),
            ],
            SUB,
        ),
        L(
            "ob : si, dans une question indirecte",
            R(
                "ob veut dire « si » dans une question indirecte : je ne sais pas si…, il demande si…",
                [
                    "Ich weiß nicht, ob er kommt.",
                    "wenn = si (une condition) ; ob = si (est-ce que ?). Le truc : si on peut dire « est-ce que », c'est ob.",
                    "Verbe à la fin, comme après dass et weil.",
                ],
                [["Ich weiß nicht, ob er kommt.", "Je ne sais pas s'il vient."], ["Es gibt Brot, wenn du Hunger hast.", "Il y a du pain si tu as faim."]],
            ),
            [
                S("Ich weiß nicht, ob er kommt.", "Je ne sais pas s'il vient.", ["ich", "weiß", "nicht", "ob", "er", "kommt"], focus=("ob", OB, "Est-ce qu'il vient ? Je ne sais pas : ob."), blank=("ob", "si", ["wenn", "dass"]), meaning=["Je sais qu'il ne vient pas.", "Je ne sais pas quand il vient."], combine=(["Ich weiß es nicht.", "Kommt er?"], "ob")),
                S("Er fragt, ob wir Hunger haben.", "Il demande si nous avons faim.", ["er", "fragt", "ob", "wir", "Hunger", "haben"], focus=("ob", OB, "Avez-vous faim ? : une question rapportée, donc ob."), blank=("ob", "si", ["wenn", "weil"])),
                S("Es gibt Brot, wenn du Hunger hast.", "Il y a du pain si tu as faim.", ["es", "gibt", "Brot", "wenn", "du", "Hunger", "hast"], focus=("wenn", WENN, "Une condition : wenn."), blank=("wenn", "si", ["ob", "dass"]), why_order="Les deux ordres sont corrects : si la subordonnée ouvre la phrase, le verbe de la principale vient juste après la virgule.", alt=["Wenn du Hunger hast, gibt es Brot."]),
                S("Kannst du mir sagen, ob der Zug Verspätung hat?", "Tu peux me dire si le train a du retard ?", ["kannst", "du", "mir", "sagen", "ob", "der Zug", "Verspätung", "hat"], focus=("ob", OB, "Est-ce que le train a du retard ? : ob."), blank=("ob", "si", ["wenn", "dass"]), meaning=["Tu peux me dire quand le train arrive ?", "Tu peux me dire pourquoi le train a du retard ?"], combine=(["Kannst du mir das sagen?", "Hat der Zug Verspätung?"], "ob")),
                S("Ich frage mich, ob sie mich noch kennt.", "Je me demande si elle me connaît encore.", ["ich", "frage", "mich", "ob", "sie", "mich", "noch", "kennt"], focus=("ob", OB, "Je me demande : est-ce qu'elle me connaît ? ob."), blank=("ob", "si", ["wenn", "weil"])),
                S("Wir fahren morgen ans Meer, wenn das Wetter schön ist.", "Demain, nous allons à la mer s'il fait beau.", ["wir", "fahren", "morgen", "ans Meer", "wenn", "das Wetter", "schön", "ist"], ["Morgen fahren wir ans Meer, wenn das Wetter schön ist."], ("wenn", WENN, "Une condition : wenn."), ("wenn", "si", ["ob", "dass"]), "Les deux sont corrects : dans la principale, le verbe reste 2e.", ["Wenn das Wetter schön ist, fahren wir morgen ans Meer."]),
                S("Weißt du, ob das Museum heute geöffnet ist?", "Tu sais si le musée est ouvert aujourd'hui ?", ["weißt", "du", "ob", "das Museum", "heute", "geöffnet", "ist"], focus=("ob", OB, "Est-ce que le musée est ouvert ? : ob."), blank=("ob", "si", ["wenn", "dass"]), combine=(["Weißt du es?", "Ist das Museum heute geöffnet?"], "ob")),
            ],
            {"prompt": "Quel « si » ?", "options": [OB, WENN]},
        ),
        L(
            "obwohl : bien que",
            R(
                "obwohl veut dire « bien que, même si » : une chose arrive malgré l'autre.",
                [
                    "Er geht spazieren, obwohl es regnet.",
                    "Pas de subjonctif comme en français : le verbe allemand reste normal, mais à la fin.",
                    "Comparer weil (la cause) et obwohl (malgré).",
                ],
                [["Er geht spazieren, obwohl es regnet.", "Il va se promener bien qu'il pleuve."], ["Sie bleibt zu Hause, weil sie krank ist.", "Elle reste à la maison parce qu'elle est malade."]],
            ),
            [
                S("Er geht spazieren, obwohl es regnet.", "Il va se promener bien qu'il pleuve.", ["er", "geht", "spazieren", "obwohl", "es", "regnet"], focus=("obwohl", DESPITE, "La pluie ne l'arrête pas : obwohl."), blank=("obwohl", WHY_OR_DESPITE, ["weil", "wenn"]), why_order="Les deux ordres sont corrects : si la subordonnée ouvre la phrase, le verbe de la principale vient juste après la virgule.", alt=["Obwohl es regnet, geht er spazieren."], meaning=["Il ne va pas se promener parce qu'il pleut.", "Il va se promener parce qu'il pleut."], combine=(["Er geht spazieren.", "Es regnet."], "obwohl")),
                S("Sie bleibt zu Hause, weil sie krank ist.", "Elle reste à la maison parce qu'elle est malade.", ["sie", "bleibt", "zu Hause", "weil", "sie", "krank", "ist"], focus=("weil", BECAUSE, "La maladie est la cause : weil."), blank=("weil", WHY_OR_DESPITE, ["obwohl", "ob"]), why_order="Les deux ordres sont corrects : si la subordonnée ouvre la phrase, le verbe de la principale vient juste après la virgule.", alt=["Weil sie krank ist, bleibt sie zu Hause."], combine=(["Sie bleibt zu Hause.", "Sie ist krank."], "weil")),
                S("Sie arbeitet, obwohl sie krank ist.", "Elle travaille bien qu'elle soit malade.", ["sie", "arbeitet", "obwohl", "sie", "krank", "ist"], focus=("obwohl", DESPITE, "Malade, et pourtant elle travaille : obwohl."), blank=("obwohl", WHY_OR_DESPITE, ["weil", "ob"]), why_order="Les deux ordres sont corrects : si la subordonnée ouvre la phrase, le verbe de la principale vient juste après la virgule.", alt=["Obwohl sie krank ist, arbeitet sie."], meaning=["Elle travaille parce qu'elle est malade.", "Elle ne travaille pas, car elle est malade."], combine=(["Sie arbeitet.", "Sie ist krank."], "obwohl")),
                S("Wir sind glücklich, obwohl wir wenig Geld haben.", "Nous sommes heureux bien que nous ayons peu d'argent.", ["wir", "sind", "glücklich", "obwohl", "wir", "wenig Geld", "haben"], focus=("obwohl", DESPITE, "Peu d'argent, et pourtant heureux : obwohl."), blank=("obwohl", WHY_OR_DESPITE, ["weil", "dass"]), why_order="Les deux ordres sont corrects : si la subordonnée ouvre la phrase, le verbe de la principale vient juste après la virgule.", alt=["Obwohl wir wenig Geld haben, sind wir glücklich."], combine=(["Wir sind glücklich.", "Wir haben wenig Geld."], "obwohl")),
                S("Ich esse den Kuchen, obwohl ich keinen Hunger habe.", "Je mange le gâteau bien que je n'aie pas faim.", ["ich", "esse", "den Kuchen", "obwohl", "ich", "keinen Hunger", "habe"], focus=("obwohl", DESPITE, "Pas faim, et pourtant je mange : obwohl."), blank=("obwohl", WHY_OR_DESPITE, ["weil", "ob"]), why_order="Les deux ordres sont corrects : si la subordonnée ouvre la phrase, le verbe de la principale vient juste après la virgule.", alt=["Obwohl ich keinen Hunger habe, esse ich den Kuchen."], meaning=["Je mange le gâteau parce que j'ai faim.", "Je ne mange pas le gâteau, car je n'ai pas faim."]),
                S("Er kauft das Auto, weil es billig ist.", "Il achète la voiture parce qu'elle n'est pas chère.", ["er", "kauft", "das Auto", "weil", "es", "billig", "ist"], focus=("weil", BECAUSE, "Le prix est la cause : weil."), blank=("weil", WHY_OR_DESPITE, ["obwohl", "ob"]), why_order="Les deux ordres sont corrects : si la subordonnée ouvre la phrase, le verbe de la principale vient juste après la virgule.", alt=["Weil es billig ist, kauft er das Auto."], meaning=["Il achète la voiture bien qu'elle soit chère.", "Il n'achète pas la voiture, car elle est chère."]),
                S("Der Film war gut, obwohl er sehr lang war.", "Le film était bien, même s'il était très long.", ["der Film", "war", "gut", "obwohl", "er", "sehr lang", "war"], focus=("obwohl", DESPITE, "Long, et pourtant bien : obwohl."), blank=("obwohl", WHY_OR_DESPITE, ["weil", "dass"]), why_order="Les deux ordres sont corrects : si la subordonnée ouvre la phrase, le verbe de la principale vient juste après la virgule.", alt=["Obwohl er sehr lang war, war der Film gut."], combine=(["Der Film war gut.", "Er war sehr lang."], "obwohl")),
            ],
            {"prompt": "Que dit la subordonnée ?", "options": [BECAUSE, DESPITE]},
        ),
    ],
}

TRACK = make_track(
    "de-phrase",
    "Phrases complexes",
    "De la phrase simple aux longues phrases : la place du verbe, les questions, nicht, puis relier et emboîter les propositions. Construire et comprendre.",
    [unit1, unit2, unit3, unit4, unit5, unit6],
)
