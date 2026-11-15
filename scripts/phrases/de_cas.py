"""The German cases track (units 1 to 3 so far)."""
from phrase_kit import L, R, S, T, make_track  # noqa: F401

SUJ = "sujet : qui fait l'action"
VERBE = "l'action (le verbe)"
AUTRE = "autre chose : quand, où…"
COD = "complément direct : ce qui subit l'action"
COI = "complément indirect : à qui ?"
ROLE = "Quel rôle joue le groupe surligné ?"
M, F, N, P = "masculin (der)", "féminin (die)", "neutre (das)", "pluriel (die)"
GENDER = {"prompt": "Masculin, féminin, neutre ou pluriel ?", "options": [M, F, N, P]}
NOM, AKK = "nominatif : le sujet", "accusatif : le complément direct"
CASE = {"prompt": "Nominatif ou accusatif ?", "options": [NOM, AKK]}
VERB_SECOND = "Ces ordres sont tous corrects : le verbe conjugué reste toujours en 2e position."

units = [
    {
        "title": "Qui fait quoi ?",
        "level": "A1",
        "hint": "Avant les terminaisons, le rôle de chaque groupe : celui qui agit, ce qui subit l'action, à qui elle s'adresse.",
        "lessons": [
            L(
                "Le sujet : qui fait l'action",
                R(
                    "Dans une phrase, chaque groupe a un rôle. Le sujet est celui qui fait l'action.",
                    [
                        "On le trouve en demandant « qui est-ce qui… ? » : qui est-ce qui lit ? Die Frau.",
                        "Le verbe s'accorde avec lui : ich lese, die Frau liest.",
                        "Il n'est pas toujours en premier : « Heute liest die Frau ». Le verbe, lui, reste en 2e position.",
                        "En allemand, le sujet est au nominatif : la forme du dictionnaire (der, die, das, ein).",
                    ],
                    [["Die Frau liest ein Buch.", "La femme lit un livre."], ["Heute kocht mein Vater.", "Aujourd'hui, mon père cuisine."]],
                ),
                [
                    S("Die Frau liest ein Buch.", "La femme lit un livre.", ["die Frau", "liest", "ein Buch"], focus=("die Frau", SUJ, "Qui est-ce qui lit ? Die Frau : c'est le sujet.")),
                    S("Das Kind trinkt Milch.", "L'enfant boit du lait.", ["das Kind", "trinkt", "Milch"], focus=("das Kind", SUJ, "Qui est-ce qui boit ? Das Kind.")),
                    S("Heute kocht mein Vater.", "Aujourd'hui, mon père cuisine.", ["heute", "kocht", "mein Vater"], ["Mein Vater kocht heute."], ("mein Vater", SUJ, "Qui est-ce qui cuisine ? Mein Vater, même s'il vient après le verbe."), why_order=VERB_SECOND),
                    S("Die Kinder spielen im Garten.", "Les enfants jouent dans le jardin.", ["die Kinder", "spielen", "im Garten"], ["Im Garten spielen die Kinder."], ("im Garten", AUTRE, "Im Garten dit où : ce n'est ni le sujet ni l'action."), why_order=VERB_SECOND),
                    S("Morgen kommt meine Schwester.", "Demain, ma sœur arrive.", ["morgen", "kommt", "meine Schwester"], ["Meine Schwester kommt morgen."], ("meine Schwester", SUJ, "Qui est-ce qui vient ? Meine Schwester."), why_order=VERB_SECOND),
                    S("Anna schreibt eine E-Mail.", "Anna écrit un e-mail.", ["Anna", "schreibt", "eine E-Mail"], focus=("schreibt", VERBE, "Schreibt est le verbe : l'action d'écrire.")),
                    S("Der Zug fährt um acht Uhr.", "Le train part à huit heures.", ["der Zug", "fährt", "um acht Uhr"], ["Um acht Uhr fährt der Zug."], ("um acht Uhr", AUTRE, "Um acht Uhr dit quand."), why_order=VERB_SECOND),
                    S("Jetzt schläft das Baby.", "Maintenant, le bébé dort.", ["jetzt", "schläft", "das Baby"], ["Das Baby schläft jetzt."], ("das Baby", SUJ, "Qui est-ce qui dort ? Das Baby."), why_order=VERB_SECOND),
                ],
                {"prompt": ROLE, "options": [SUJ, VERBE, AUTRE]},
            ),
            L(
                "Le complément direct : ce qui subit l'action",
                R(
                    "Le complément direct répond à « qui ? » ou « quoi ? » posé après le verbe : die Frau liest… quoi ? Eine Zeitung.",
                    [
                        "En allemand, il se met à l'accusatif. Avec die, das et le pluriel, la forme ne change pas ; seul le masculin change (unité 3).",
                        "Certains verbes n'en ont pas : schlafen, kommen, gehen.",
                        "Parfois le français dit « à » mais pas l'allemand : « rendre visite à mamie » se dit « die Oma besuchen », sans préposition.",
                        "Quand le sujet et le complément ont la même forme (die… die…), on comprend en général le premier groupe comme sujet ; l'accord du verbe peut aussi aider.",
                    ],
                    [["Die Frau liest eine Zeitung.", "La femme lit un journal."], ["Wir besuchen die Oma.", "Nous rendons visite à mamie."]],
                ),
                [
                    S("Die Frau liest eine Zeitung.", "La femme lit un journal.", ["die Frau", "liest", "eine Zeitung"], focus=("eine Zeitung", COD, "Die Frau liest… quoi ? Eine Zeitung : complément direct.")),
                    S("Das Kind isst eine Banane.", "L'enfant mange une banane.", ["das Kind", "isst", "eine Banane"], focus=("das Kind", SUJ, "Qui est-ce qui mange ? Das Kind : le sujet.")),
                    S("Mein Bruder kauft ein Auto.", "Mon frère achète une voiture.", ["mein Bruder", "kauft", "ein Auto"], focus=("ein Auto", COD, "Mein Bruder kauft… quoi ? Ein Auto.")),
                    S("Wir sehen die Berge.", "Nous voyons les montagnes.", ["wir", "sehen", "die Berge"], focus=("die Berge", COD, "Wir sehen… quoi ? Die Berge.")),
                    S("Die Lehrerin fragt die Kinder.", "L'institutrice interroge les enfants.", ["die Lehrerin", "fragt", "die Kinder"], focus=("die Kinder", COD, "Die… die… : même forme. Ici, c'est l'ordre qui dit que l'institutrice interroge les enfants.")),
                    S("Am Abend hört Lisa Musik.", "Le soir, Lisa écoute de la musique.", ["am Abend", "hört", "Lisa", "Musik"], ["Lisa hört am Abend Musik."], ("Musik", COD, "Lisa hört… quoi ? Musik."), why_order=VERB_SECOND),
                    S("Die Katze trinkt das Wasser.", "Le chat boit l'eau.", ["die Katze", "trinkt", "das Wasser"], focus=("die Katze", SUJ, "Qui est-ce qui boit ? Die Katze.")),
                    S("Heute besuchen wir die Oma.", "Aujourd'hui, nous rendons visite à mamie.", ["heute", "besuchen", "wir", "die Oma"], ["Wir besuchen heute die Oma."], ("die Oma", COD, "Besuchen prend un complément direct : pas de « à » en allemand."), why_order=VERB_SECOND),
                ],
                {"prompt": ROLE, "options": [SUJ, COD]},
            ),
            L(
                "À qui ? Le complément indirect",
                R(
                    "Avec donner, montrer, offrir, expliquer…, il y a souvent un 3e rôle : la personne à qui l'on donne.",
                    [
                        "On le trouve avec « à qui ? » : Ich gebe dem Kind ein Buch. À qui ? Dem Kind.",
                        "En allemand, il est au datif : on le reconnaît à dem, der, den…-n, mir, dir. Les formes viendront à l'unité 5 ; ici, retiens le rôle.",
                        "Avec deux noms, la personne vient d'habitude avant la chose : dem Kind ein Buch.",
                    ],
                    [["Ich gebe dem Kind ein Buch.", "Je donne un livre à l'enfant."], ["Paul schenkt seiner Freundin eine Uhr.", "Paul offre une montre à son amie."]],
                ),
                [
                    S("Ich gebe dem Kind ein Buch.", "Je donne un livre à l'enfant.", ["ich", "gebe", "dem Kind", "ein Buch"], focus=("dem Kind", COI, "Je donne un livre à qui ? Dem Kind.")),
                    S("Die Mutter zeigt der Tochter ein Foto.", "La mère montre une photo à sa fille.", ["die Mutter", "zeigt", "der Tochter", "ein Foto"], focus=("ein Foto", COD, "Die Mutter zeigt… quoi ? Ein Foto.")),
                    S("Paul schenkt seiner Freundin eine Uhr.", "Paul offre une montre à son amie.", ["Paul", "schenkt", "seiner Freundin", "eine Uhr"], focus=("seiner Freundin", COI, "Paul offre une montre à qui ? Seiner Freundin.")),
                    S("Der Lehrer erklärt den Schülern die Regel.", "Le professeur explique la règle aux élèves.", ["der Lehrer", "erklärt", "den Schülern", "die Regel"], focus=("der Lehrer", SUJ, "Qui est-ce qui explique ? Der Lehrer.")),
                    S("Morgen bringe ich meiner Mutter Blumen.", "Demain, j'apporte des fleurs à ma mère.", ["morgen", "bringe", "ich", "meiner Mutter", "Blumen"], ["Ich bringe meiner Mutter morgen Blumen.", "Ich bringe morgen meiner Mutter Blumen."], ("meiner Mutter", COI, "J'apporte des fleurs à qui ? Meiner Mutter."), why_order=VERB_SECOND),
                    S("Wir schicken der Familie eine Karte.", "Nous envoyons une carte à la famille.", ["wir", "schicken", "der Familie", "eine Karte"], focus=("eine Karte", COD, "Wir schicken… quoi ? Eine Karte.")),
                    S("Das Kind gibt dem Hund Wasser.", "L'enfant donne de l'eau au chien.", ["das Kind", "gibt", "dem Hund", "Wasser"], focus=("dem Hund", COI, "L'enfant donne de l'eau à qui ? Dem Hund.")),
                    S("Die Kellnerin bringt dem Gast die Rechnung.", "La serveuse apporte l'addition au client.", ["die Kellnerin", "bringt", "dem Gast", "die Rechnung"], focus=("die Kellnerin", SUJ, "Qui est-ce qui apporte ? Die Kellnerin.")),
                ],
                {"prompt": ROLE, "options": [SUJ, COD, COI]},
            ),
            L(
                "Les trois rôles ensemble",
                R(
                    "En français, c'est surtout la place qui dit qui fait quoi. En allemand, ce sont surtout les articles : der, den, dem…",
                    [
                        "On peut donc déplacer les groupes sans changer qui fait quoi : « Heute gibt die Oma den Kindern Schokolade ». Seule l'insistance change, pas qui fait quoi.",
                        "Le verbe conjugué, lui, reste toujours en 2e position.",
                        "Le plus naturel : commencer par le sujet, ou par le moment (heute, morgen, am Sonntag).",
                    ],
                    [["Heute gibt die Oma den Kindern Schokolade.", "Aujourd'hui, mamie donne du chocolat aux enfants."], ["Ich zeige dir die Stadt.", "Je te montre la ville."]],
                ),
                [
                    S("Heute gibt die Oma den Kindern Schokolade.", "Aujourd'hui, mamie donne du chocolat aux enfants.", ["heute", "gibt", "die Oma", "den Kindern", "Schokolade"], ["Die Oma gibt den Kindern heute Schokolade.", "Die Oma gibt heute den Kindern Schokolade."], ("den Kindern", COI, "Mamie donne du chocolat à qui ? Den Kindern."), why_order=VERB_SECOND),
                    S("Der Vater kauft der Tochter ein Fahrrad.", "Le père achète un vélo à sa fille.", ["der Vater", "kauft", "der Tochter", "ein Fahrrad"], focus=("ein Fahrrad", COD, "Der Vater kauft… quoi ? Ein Fahrrad.")),
                    S("Ich zeige dir die Stadt.", "Je te montre la ville.", ["ich", "zeige", "dir", "die Stadt"], focus=("dir", COI, "Je montre la ville à qui ? À toi : dir.")),
                    S("Am Sonntag schreibt Tom seiner Oma eine Postkarte.", "Dimanche, Tom écrit une carte postale à sa grand-mère.", ["am Sonntag", "schreibt", "Tom", "seiner Oma", "eine Postkarte"], ["Tom schreibt seiner Oma am Sonntag eine Postkarte.", "Tom schreibt am Sonntag seiner Oma eine Postkarte."], ("Tom", SUJ, "Qui est-ce qui écrit ? Tom."), why_order=VERB_SECOND),
                    S("Die Ärztin gibt dem Patienten ein Medikament.", "La médecin donne un médicament au patient.", ["die Ärztin", "gibt", "dem Patienten", "ein Medikament"], focus=("ein Medikament", COD, "Die Ärztin gibt… quoi ? Ein Medikament.")),
                    S("Wir erzählen den Kindern eine Geschichte.", "Nous racontons une histoire aux enfants.", ["wir", "erzählen", "den Kindern", "eine Geschichte"], focus=("den Kindern", COI, "Nous racontons une histoire à qui ? Den Kindern.")),
                    S("Die Kinder malen ein Bild.", "Les enfants font un dessin.", ["die Kinder", "malen", "ein Bild"], focus=("die Kinder", SUJ, "Qui est-ce qui dessine ? Die Kinder.")),
                    S("Jetzt erklärt die Lehrerin der Klasse die Aufgabe.", "Maintenant, l'institutrice explique l'exercice à la classe.", ["jetzt", "erklärt", "die Lehrerin", "der Klasse", "die Aufgabe"], ["Die Lehrerin erklärt der Klasse jetzt die Aufgabe.", "Die Lehrerin erklärt jetzt der Klasse die Aufgabe."], ("der Klasse", COI, "À qui ? À la classe : « der » devant un nom féminin : ici, c'est le datif."), why_order=VERB_SECOND),
                ],
                {"prompt": ROLE, "options": [SUJ, COD, COI]},
            ),
        ],
    },
    {
        "title": "Le nominatif",
        "level": "A1",
        "hint": "La forme du sujet, celle du dictionnaire : der, die, das, ein, kein, et les pronoms ich, du, er…",
        "lessons": [
            L(
                "der, die, das",
                R(
                    "Le sujet est au nominatif : c'est la forme qu'on trouve dans le dictionnaire.",
                    [
                        "Apprends chaque nom avec son article : der Tisch, die Lampe, das Bett.",
                        "Le genre allemand ne suit pas le français : das Mädchen (la fille) est neutre, der Mond (la lune) masculin, die Sonne (le soleil) féminin.",
                        "Les diminutifs en -chen et -lein sont neutres : das Mädchen, das Brötchen. Attention, der Kuchen n'est pas un diminutif.",
                        "Les noms formés avec -ung, -heit, -keit sont féminins : die Zeitung, die Freiheit.",
                        "Au pluriel, toujours die.",
                    ],
                    [["Der Tisch ist neu.", "La table est neuve."], ["Das Mädchen heißt Lea.", "La fille s'appelle Lea."]],
                    [T(["", "masculin", "féminin", "neutre", "pluriel"], [["le, la, les", "der", "die", "das", "die"]], "Nominatif")],
                ),
                [
                    S("Der Tisch ist neu.", "La table est neuve.", ["der Tisch", "ist", "neu"], focus=("der Tisch", M, "Der Tisch est masculin, alors que « la table » est féminin."), blank=("der Tisch", "Tisch", ["die Tisch", "das Tisch"])),
                    S("Die Lampe ist kaputt.", "La lampe est cassée.", ["die Lampe", "ist", "kaputt"], focus=("die Lampe", F, "Die Lampe : féminin, comme en français."), blank=("die Lampe", "Lampe", ["der Lampe", "das Lampe"])),
                    S("Das Mädchen heißt Lea.", "La fille s'appelle Lea.", ["das Mädchen", "heißt", "Lea"], focus=("das Mädchen", N, "Les diminutifs en -chen sont neutres : das Mädchen."), blank=("das Mädchen", "Mädchen", ["die Mädchen", "der Mädchen"])),
                    S("Heute Nacht scheint der Mond.", "Cette nuit, la lune brille.", ["heute Nacht", "scheint", "der Mond"], ["Der Mond scheint heute Nacht."], ("der Mond", M, "Der Mond est masculin, « la lune » féminin."), ("der Mond", "Mond", ["die Mond", "das Mond"]), VERB_SECOND),
                    S("Die Kinder sind müde.", "Les enfants sont fatigués.", ["die Kinder", "sind", "müde"], focus=("die Kinder", P, "Au pluriel, toujours die."), blank=("die Kinder", "Kinder", ["der Kinder", "das Kinder"])),
                    S("Das Wetter ist schön.", "Il fait beau.", ["das Wetter", "ist", "schön"], focus=("das Wetter", N, "Das Wetter (le temps qu'il fait) est neutre."), blank=("das Wetter", "Wetter", ["der Wetter", "die Wetter"])),
                    S("Die Sonne ist warm.", "Le soleil est chaud.", ["die Sonne", "ist", "warm"], focus=("die Sonne", F, "Die Sonne est féminin, « le soleil » masculin."), blank=("die Sonne", "Sonne", ["der Sonne", "das Sonne"])),
                    S("Jetzt kommt der Bus.", "Le bus arrive maintenant.", ["jetzt", "kommt", "der Bus"], ["Der Bus kommt jetzt."], ("der Bus", M, "Der Bus : masculin."), ("der Bus", "Bus", ["die Bus", "das Bus"]), VERB_SECOND),
                ],
                GENDER,
            ),
            L(
                "ein, eine, kein",
                R(
                    "Ein veut dire « un, une » ; kein veut dire « pas de, aucun ». Ils suivent le genre du nom.",
                    [
                        "Masculin et neutre : ein, kein. Féminin : eine, keine.",
                        "Ein n'a pas de pluriel : « Das sind Äpfel » (ce sont des pommes). Au pluriel négatif : keine.",
                        "Après sein (être), le nom reste au nominatif : Das ist kein Problem. Comparer avec « es gibt », suivi de l'accusatif (unité 3).",
                        "Avec « ein », on présente souvent une information nouvelle, plutôt en fin de phrase : « Im Park spielt ein Kind ».",
                    ],
                    [["Im Park spielt ein Kind.", "Un enfant joue dans le parc."], ["Das ist kein Problem.", "Ce n'est pas un problème."]],
                    [T(["", "masculin", "féminin", "neutre", "pluriel"], [["un, une", "ein", "eine", "ein", "—"], ["pas de", "kein", "keine", "kein", "keine"]], "Nominatif")],
                ),
                [
                    S("Hier ist ein Supermarkt.", "Ici, il y a un supermarché.", ["hier", "ist", "ein Supermarkt"], focus=("ein Supermarkt", M, "Der Supermarkt : masculin, donc ein."), blank=("ein Supermarkt", "un Supermarkt", ["eine Supermarkt", "einen Supermarkt"])),
                    S("Da ist eine Apotheke.", "Là, il y a une pharmacie.", ["da", "ist", "eine Apotheke"], focus=("eine Apotheke", F, "Die Apotheke : féminin, donc eine."), blank=("eine Apotheke", "une Apotheke", ["ein Apotheke", "einen Apotheke"])),
                    S("Im Park spielt ein Kind.", "Un enfant joue dans le parc.", ["im Park", "spielt", "ein Kind"], ["Ein Kind spielt im Park."], ("ein Kind", N, "Das Kind : neutre, donc ein."), ("ein Kind", "un Kind", ["eine Kind", "einen Kind"]), "Les deux sont corrects, mais une information nouvelle (« un enfant ») va volontiers à la fin : Im Park spielt ein Kind."),
                    S("Das ist kein Problem.", "Ce n'est pas un problème.", ["das", "ist", "kein Problem"], focus=("kein Problem", N, "Das Problem : neutre, donc kein."), blank=("kein Problem", "pas de Problem", ["keine Problem", "keinen Problem"])),
                    S("Heute ist keine Schule.", "Aujourd'hui, il n'y a pas école.", ["heute", "ist", "keine Schule"], focus=("keine Schule", F, "Die Schule : féminin, donc keine."), blank=("keine Schule", "pas de Schule", ["kein Schule", "keinen Schule"])),
                    S("Ein Hund bellt.", "Un chien aboie.", ["ein Hund", "bellt"], focus=("ein Hund", M, "Der Hund : masculin, donc ein."), blank=("ein Hund", "un Hund", ["eine Hund", "einen Hund"])),
                    S("Das sind keine Äpfel.", "Ce ne sont pas des pommes.", ["das", "sind", "keine Äpfel"], focus=("keine Äpfel", P, "Au pluriel : keine."), blank=("keine Äpfel", "pas de Äpfel", ["kein Äpfel", "keinen Äpfel"])),
                    S("Jetzt kommt ein Taxi.", "Voilà un taxi qui arrive.", ["jetzt", "kommt", "ein Taxi"], ["Ein Taxi kommt jetzt."], ("ein Taxi", N, "Das Taxi : neutre, donc ein."), ("ein Taxi", "un Taxi", ["eine Taxi", "einen Taxi"]), "Les deux sont corrects ; l'information nouvelle, « ein Taxi », sonne plus naturelle à la fin."),
                ],
                GENDER,
            ),
            L(
                "Les pronoms sujets",
                R(
                    "Les pronoms sujets : ich, du, er, sie, es, wir, ihr, sie, et Sie (vouvoiement).",
                    [
                        "Er, sie et es remplacent aussi les choses, selon leur genre allemand : der Tisch → er, die Lampe → sie, das Auto → es.",
                        "Attention : die Zeitung (le journal) se remplace par sie, der Löffel (la cuillère) par er.",
                        "Le verbe s'accorde : ich komme, du kommst, er kommt, wir kommen, ihr kommt, sie kommen.",
                    ],
                    [["Der Tisch ist neu. Er ist schön.", "La table est neuve. Elle est belle."], ["Wo ist die Zeitung? Sie liegt hier.", "Où est le journal ? Il est ici."]],
                    [T(["je", "tu", "il", "elle", "(neutre)", "nous", "vous", "ils, elles", "vous (poli)"], [["ich", "du", "er", "sie", "es", "wir", "ihr", "sie", "Sie"]], "Nominatif")],
                ),
                [
                    S("Der Tisch ist neu.", "La table est neuve.", ["der Tisch", "ist", "neu"], focus=("der Tisch", "er", "Der Tisch est masculin : on le remplace par er, même si c'est une chose.")),
                    S("Die Lampe ist kaputt.", "La lampe est cassée.", ["die Lampe", "ist", "kaputt"], focus=("die Lampe", "sie", "Die Lampe est féminin : sie.")),
                    S("Das Auto ist schnell.", "La voiture est rapide.", ["das Auto", "ist", "schnell"], focus=("das Auto", "es", "Das Auto est neutre : es, alors que « la voiture » est féminin.")),
                    S("Die Tür ist offen.", "La porte est ouverte.", ["die Tür", "ist", "offen"], focus=("die Tür", "sie", "Die Tür est féminin : sie.")),
                    S("Er ist sehr alt.", "Il est très vieux (l'arbre).", ["er", "ist", "sehr alt"], blank=("er", "der Baum", ["sie", "es"])),
                    S("Sie liegt auf dem Tisch.", "Il est sur la table (le journal).", ["sie", "liegt", "auf dem Tisch"], blank=("sie", "die Zeitung", ["er", "es"])),
                    S("Heute kommen wir spät.", "Aujourd'hui, nous arrivons tard.", ["heute", "kommen", "wir", "spät"], ["Wir kommen heute spät."], blank=("wir", "nous", ["ihr", "sie"]), why_order=VERB_SECOND),
                    S("Ihr seid sehr nett.", "Vous êtes très gentils.", ["ihr", "seid", "sehr nett"], blank=("ihr", "vous, des amis", ["Sie", "wir"])),
                    S("Morgen fährt sie nach Berlin.", "Demain, elle part à Berlin (ma sœur).", ["morgen", "fährt", "sie", "nach Berlin"], ["Sie fährt morgen nach Berlin."], blank=("sie", "meine Schwester", ["er", "es"]), why_order=VERB_SECOND),
                ],
                {"prompt": "Quel pronom remplace le groupe surligné ?", "options": ["er", "sie", "es"]},
            ),
        ],
    },
    {
        "title": "L'accusatif",
        "level": "A1",
        "hint": "Le complément direct : seul le masculin change (der → den, ein → einen), et les pronoms (mich, dich, ihn…).",
        "lessons": [
            L(
                "der devient den",
                R(
                    "Le complément direct se met à l'accusatif. Bonne nouvelle : seul le masculin change.",
                    [
                        "der Hund → Ich sehe den Hund.",
                        "die, das et le pluriel ne changent pas : Ich sehe die Katze, das Haus, die Kinder.",
                        "Grâce à « den », on sait qui fait quoi même si l'ordre change : « Den Briefträger beißt der Hund » veut dire que le chien mord le facteur.",
                    ],
                    [["Ich sehe den Hund.", "Je vois le chien."], ["Der Hund beißt den Briefträger.", "Le chien mord le facteur."]],
                    [T(["", "masculin", "féminin", "neutre", "pluriel"], [["nominatif", "der", "die", "das", "die"], ["accusatif", "den", "die", "das", "die"]])],
                ),
                [
                    S("Ich sehe den Hund.", "Je vois le chien.", ["ich", "sehe", "den Hund"], focus=("den Hund", AKK, "Ich sehe… quoi ? Den Hund : complément direct masculin, donc den."), blank=("den Hund", "der Hund", ["der Hund", "dem Hund"])),
                    S("Der Mann trinkt den Kaffee.", "L'homme boit le café.", ["der Mann", "trinkt", "den Kaffee"], ["Den Kaffee trinkt der Mann."], ("der Mann", NOM, "Der Mann fait l'action : nominatif."), ("den Kaffee", "der Kaffee", ["der Kaffee", "dem Kaffee"]), "Les deux sont corrects : « den Kaffee » reste le complément. Le plus naturel commence par le sujet."),
                    S("Wir besuchen den Zoo.", "Nous visitons le zoo.", ["wir", "besuchen", "den Zoo"], focus=("wir", NOM, "Wir fait l'action : nominatif."), blank=("den Zoo", "der Zoo", ["der Zoo", "dem Zoo"])),
                    S("Die Frau sucht den Schlüssel.", "La femme cherche la clé.", ["die Frau", "sucht", "den Schlüssel"], focus=("den Schlüssel", AKK, "Der Schlüssel est masculin (« la clé » est féminin) : à l'accusatif, den Schlüssel."), blank=("den Schlüssel", "der Schlüssel", ["der Schlüssel", "dem Schlüssel"])),
                    S("Heute kaufe ich den Tisch.", "Aujourd'hui, j'achète la table.", ["heute", "kaufe", "ich", "den Tisch"], ["Ich kaufe heute den Tisch.", "Den Tisch kaufe ich heute."], ("ich", NOM, "Ich fait l'action : nominatif."), ("den Tisch", "der Tisch", ["der Tisch", "dem Tisch"]), VERB_SECOND),
                    S("Die Katze sieht die Maus.", "Le chat voit la souris.", ["die Katze", "sieht", "die Maus"], focus=("die Maus", AKK, "Die Maus est féminin : l'accusatif ne change rien, mais c'est bien le complément."), blank=("die Maus", "die Maus", ["den Maus", "der Maus"])),
                    S("Das Kind liest das Buch.", "L'enfant lit le livre.", ["das Kind", "liest", "das Buch"], focus=("das Buch", AKK, "Das Buch est neutre : pas de changement à l'accusatif."), blank=("das Buch", "das Buch", ["den Buch", "dem Buch"])),
                    S("Ich finde den Film super.", "Je trouve le film super.", ["ich", "finde", "den Film", "super"], ["Den Film finde ich super."], ("den Film", AKK, "Ich finde… quoi ? Den Film."), ("den Film", "der Film", ["der Film", "dem Film"]), "Les deux sont naturels : à l'oral, on commence souvent par ce dont on parle déjà, « Den Film finde ich super »."),
                    S("Der Hund beißt den Briefträger.", "Le chien mord le facteur.", ["der Hund", "beißt", "den Briefträger"], ["Den Briefträger beißt der Hund."], ("den Briefträger", AKK, "Den Briefträger : c'est lui qui est mordu."), ("den Briefträger", "der Briefträger", ["der Briefträger", "dem Briefträger"]), "« Den Briefträger beißt der Hund » veut toujours dire que le chien mord : « den » marque le complément, où qu'il soit."),
                ],
                CASE,
            ),
            L(
                "einen, keinen, meinen",
                R(
                    "Même règle pour ein, kein et les possessifs : seul le masculin change, il prend -en.",
                    [
                        "ein Bruder → Ich habe einen Bruder.",
                        "Les possessifs suivent kein : mein, dein, sein, ihr, unser, euer → meinen, deinen, seinen, ihren, unseren, euren (euer perd son e).",
                        "« Es gibt » (il y a) est toujours suivi de l'accusatif : Es gibt einen Park.",
                    ],
                    [["Ich habe einen Bruder.", "J'ai un frère."], ["Hier gibt es keinen Supermarkt.", "Ici, il n'y a pas de supermarché."]],
                    [T(["", "masculin", "féminin", "neutre", "pluriel"], [["nominatif", "ein / kein / mein", "eine / keine / meine", "ein / kein / mein", "— / keine / meine"], ["accusatif", "einen / keinen / meinen", "eine / keine / meine", "ein / kein / mein", "— / keine / meine"]])],
                ),
                [
                    S("Ich habe einen Bruder.", "J'ai un frère.", ["ich", "habe", "einen Bruder"], focus=("einen Bruder", AKK, "Ich habe… qui ? Einen Bruder : masculin, donc -en."), blank=("einen Bruder", "ein Bruder", ["ein Bruder", "einem Bruder"])),
                    S("Wir brauchen einen Tisch.", "Nous avons besoin d'une table.", ["wir", "brauchen", "einen Tisch"], focus=("einen Tisch", AKK, "Brauchen + accusatif : einen Tisch."), blank=("einen Tisch", "ein Tisch", ["ein Tisch", "einem Tisch"])),
                    S("Hier gibt es keinen Supermarkt.", "Ici, il n'y a pas de supermarché.", ["hier", "gibt", "es", "keinen Supermarkt"], ["Es gibt hier keinen Supermarkt."], ("keinen Supermarkt", AKK, "Es gibt est toujours suivi de l'accusatif : keinen Supermarkt."), ("keinen Supermarkt", "kein Supermarkt", ["kein Supermarkt", "keine Supermarkt"]), VERB_SECOND),
                    S("Sie hat eine Katze.", "Elle a un chat.", ["sie", "hat", "eine Katze"], focus=("eine Katze", AKK, "Die Katze est féminin : eine ne change pas."), blank=("eine Katze", "eine Katze", ["einen Katze", "ein Katze"])),
                    S("Paul sucht seinen Hund.", "Paul cherche son chien.", ["Paul", "sucht", "seinen Hund"], focus=("Paul", NOM, "Paul fait l'action : nominatif."), blank=("seinen Hund", "sein Hund", ["sein Hund", "seine Hund"])),
                    S("Morgen kaufe ich ein Fahrrad.", "Demain, j'achète un vélo.", ["morgen", "kaufe", "ich", "ein Fahrrad"], ["Ich kaufe morgen ein Fahrrad."], ("ein Fahrrad", AKK, "Das Fahrrad est neutre : ein ne change pas."), ("ein Fahrrad", "ein Fahrrad", ["einen Fahrrad", "eine Fahrrad"]), VERB_SECOND),
                    S("Ich trinke keinen Kaffee.", "Je ne bois pas de café.", ["ich", "trinke", "keinen Kaffee"], focus=("ich", NOM, "Ich fait l'action : nominatif."), blank=("keinen Kaffee", "kein Kaffee", ["kein Kaffee", "keine Kaffee"])),
                    S("Mein Freund kennt deinen Bruder.", "Mon ami connaît ton frère.", ["mein Freund", "kennt", "deinen Bruder"], focus=("mein Freund", NOM, "Mein Freund fait l'action : nominatif, sans -en."), blank=("deinen Bruder", "dein Bruder", ["dein Bruder", "deine Bruder"])),
                ],
                CASE,
            ),
            L(
                "mich, dich, ihn",
                R(
                    "Les pronoms aussi ont une forme d'accusatif.",
                    [
                        "Ceux qui changent : ich → mich, du → dich, er → ihn, wir → uns, ihr → euch. Sie, es et sie restent pareils.",
                        "Ihn remplace aussi une chose masculine : der Kuchen → Ich finde ihn lecker.",
                        "Le pronom complément se place tôt : juste après le verbe (ou après le sujet s'il est pronom), avant le moment : Ich sehe dich morgen. Morgen besucht uns der Opa.",
                    ],
                    [["Ich liebe dich.", "Je t'aime."], ["Der Kuchen? Ich finde ihn lecker.", "Le gâteau ? Je le trouve délicieux."]],
                    [T(["", "je", "tu", "il", "elle", "(neutre)", "nous", "vous", "ils", "vous (poli)"], [["nominatif", "ich", "du", "er", "sie", "es", "wir", "ihr", "sie", "Sie"], ["accusatif", "mich", "dich", "ihn", "sie", "es", "uns", "euch", "sie", "Sie"]])],
                ),
                [
                    S("Ich liebe dich.", "Je t'aime.", ["ich", "liebe", "dich"], focus=("dich", AKK, "Ich liebe… qui ? Dich : du à l'accusatif."), blank=("dich", "du", ["du", "dir"])),
                    S("Er besucht uns morgen.", "Il nous rend visite demain.", ["er", "besucht", "uns", "morgen"], ["Morgen besucht er uns."], ("er", NOM, "Er fait l'action : nominatif."), ("uns", "wir", ["wir", "unser"]), VERB_SECOND),
                    S("Ich finde ihn lecker.", "Je le trouve délicieux (le gâteau).", ["ich", "finde", "ihn", "lecker"], focus=("ihn", AKK, "Der Kuchen → ihn : masculin à l'accusatif."), blank=("ihn", "er, der Kuchen", ["er", "es"])),
                    S("Die Lehrerin fragt euch.", "L'institutrice vous interroge.", ["die Lehrerin", "fragt", "euch"], focus=("die Lehrerin", NOM, "Die Lehrerin fait l'action : nominatif."), blank=("euch", "ihr", ["ihr", "eure"])),
                    S("Wir sehen sie heute Abend.", "Nous la voyons ce soir (mamie).", ["wir", "sehen", "sie", "heute Abend"], ["Heute Abend sehen wir sie."], ("sie", AKK, "Wir sehen… qui ? Sie : au féminin, la forme ne change pas."), ("sie", "sie, die Oma", ["ihr", "ihn"]), VERB_SECOND),
                    S("Ich kaufe es heute.", "Je l'achète aujourd'hui (le livre).", ["ich", "kaufe", "es", "heute"], blank=("es", "es, das Buch", ["ihn", "sie"])),
                    S("Mein Vater versteht mich.", "Mon père me comprend.", ["mein Vater", "versteht", "mich"], focus=("mich", AKK, "Mein Vater versteht… qui ? Mich."), blank=("mich", "ich", ["ich", "mir"])),
                    S("Morgen treffen wir ihn.", "Demain, nous le retrouvons.", ["morgen", "treffen", "wir", "ihn"], ["Wir treffen ihn morgen."], ("wir", NOM, "Wir fait l'action : nominatif."), ("ihn", "er", ["er", "ihm"]), VERB_SECOND),
                ],
                CASE,
            ),
            L(
                "Les verbes qui veulent l'accusatif",
                R(
                    "La plupart des verbes avec un complément direct : haben, brauchen, kaufen, sehen, suchen, finden, lieben, nehmen, essen, trinken, lesen, möchten.",
                    [
                        "Attention, le français dit « à » mais pas l'allemand : besuchen (rendre visite à), fragen (demander à), anrufen (téléphoner à) veulent l'accusatif.",
                        "Es gibt (il y a) aussi : Es gibt einen Bahnhof.",
                        "Avec un verbe séparable, la particule part à la fin : Sie ruft den Arzt an.",
                    ],
                    [["Ich frage den Lehrer.", "Je demande au professeur."], ["Sie ruft den Arzt an.", "Elle appelle le médecin."]],
                ),
                [
                    S("Ich frage den Lehrer.", "Je demande au professeur.", ["ich", "frage", "den Lehrer"], focus=("den Lehrer", AKK, "Fragen + accusatif : en français « demander à quelqu'un », en allemand pas de « à »."), blank=("den Lehrer", "der Lehrer", ["dem Lehrer", "der Lehrer"])),
                    S("Wir besuchen unseren Opa.", "Nous rendons visite à notre grand-père.", ["wir", "besuchen", "unseren Opa"], focus=("unseren Opa", AKK, "Besuchen + accusatif : unseren Opa."), blank=("unseren Opa", "unser Opa", ["unserem Opa", "unser Opa"])),
                    S("Ich nehme den Bus.", "Je prends le bus.", ["ich", "nehme", "den Bus"], focus=("ich", NOM, "Ich fait l'action : nominatif."), blank=("den Bus", "der Bus", ["der Bus", "dem Bus"])),
                    S("Ich möchte einen Tee.", "Je voudrais un thé.", ["ich", "möchte", "einen Tee"], focus=("einen Tee", AKK, "Möchten + accusatif : einen Tee."), blank=("einen Tee", "ein Tee", ["ein Tee", "einem Tee"])),
                    S("In der Stadt gibt es einen Bahnhof.", "En ville, il y a une gare.", ["in der Stadt", "gibt", "es", "einen Bahnhof"], ["Es gibt in der Stadt einen Bahnhof."], ("einen Bahnhof", AKK, "Es gibt + accusatif : einen Bahnhof."), ("einen Bahnhof", "ein Bahnhof", ["ein Bahnhof", "einem Bahnhof"]), VERB_SECOND),
                    S("Am Montag ruft sie den Arzt an.", "Lundi, elle appelle le médecin.", ["am Montag", "ruft", "sie", "den Arzt", "an"], ["Sie ruft am Montag den Arzt an."], ("den Arzt", AKK, "Anrufen + accusatif : on appelle quelqu'un."), ("den Arzt", "der Arzt", ["dem Arzt", "der Arzt"]), "Les deux sont corrects ; la particule « an » reste à la fin."),
                    S("Das Kind isst einen Apfel.", "L'enfant mange une pomme.", ["das Kind", "isst", "einen Apfel"], focus=("das Kind", NOM, "Das Kind fait l'action : nominatif."), blank=("einen Apfel", "ein Apfel", ["ein Apfel", "einem Apfel"])),
                    S("Er liest den Brief.", "Il lit la lettre.", ["er", "liest", "den Brief"], focus=("den Brief", AKK, "Der Brief est masculin (« la lettre » est féminin) : den Brief."), blank=("den Brief", "der Brief", ["der Brief", "dem Brief"])),
                ],
                CASE,
            ),
            L(
                "Déplacer les groupes grâce à l'accusatif",
                R(
                    "Comme « den » montre le complément, on peut le mettre en tête : pour insister, ou parce qu'on parle déjà de lui.",
                    [
                        "Le verbe reste en 2e position ; le sujet passe juste après le verbe : Den Film kenne ich schon.",
                        "Le plus naturel reste de commencer par le sujet ou par le moment.",
                        "Avec deux groupes de même forme (die Frau, die Katze), on comprend en général le premier comme sujet : on le garde donc en premier.",
                    ],
                    [["Den Film kenne ich schon.", "Ce film, je le connais déjà."], ["Den Mann fragt die Frau.", "C'est l'homme que la femme interroge."]],
                ),
                [
                    S("Ich trinke den Kaffee ohne Zucker.", "Je prends le café sans sucre.", ["ich", "trinke", "den Kaffee", "ohne Zucker"], ["Den Kaffee trinke ich ohne Zucker.", "Ohne Zucker trinke ich den Kaffee."], ("den Kaffee", AKK, "Ich trinke… quoi ? Den Kaffee."), ("den Kaffee", "der Kaffee", ["der Kaffee", "dem Kaffee"]), "Les trois ordres sont corrects ; on commence par « den Kaffee » quand on parle déjà du café."),
                    S("Der Lehrer lobt den Schüler.", "Le professeur félicite l'élève.", ["der Lehrer", "lobt", "den Schüler"], ["Den Schüler lobt der Lehrer."], ("den Schüler", AKK, "Den Schüler : c'est lui qui est félicité."), ("den Schüler", "der Schüler", ["der Schüler", "dem Schüler"]), "Même sens dans les deux ordres : c'est le professeur qui félicite. Seuls « der » et « den » le disent."),
                    S("Ich kenne den Film schon.", "Je connais déjà le film.", ["ich", "kenne", "den Film", "schon"], ["Den Film kenne ich schon."], ("den Film", AKK, "Ich kenne… quoi ? Den Film."), ("den Film", "der Film", ["der Film", "dem Film"]), "Les deux sont naturels : « Den Film kenne ich schon » répond à quelqu'un qui vient de parler du film."),
                    S("Morgen besucht der Vater den Sohn.", "Demain, le père rend visite à son fils.", ["morgen", "besucht", "der Vater", "den Sohn"], ["Der Vater besucht morgen den Sohn."], ("der Vater", NOM, "Der Vater fait l'action : nominatif."), ("den Sohn", "der Sohn", ["der Sohn", "dem Sohn"]), VERB_SECOND),
                    S("Die Frau fragt den Mann.", "La femme interroge l'homme.", ["die Frau", "fragt", "den Mann"], ["Den Mann fragt die Frau."], ("die Frau", NOM, "Die Frau fait l'action : nominatif."), ("den Mann", "der Mann", ["der Mann", "dem Mann"]), "C'est toujours la femme qui pose la question : « den Mann » est le complément, où qu'il soit."),
                    S("Der Mann fragt die Frau.", "L'homme interroge la femme.", ["der Mann", "fragt", "die Frau"], focus=("die Frau", AKK, "Ici, die Frau ne change pas de forme ; c'est « der Mann », au nominatif et en premier, qui montre qui pose la question.")),
                    S("Wir haben auch einen Garten.", "Nous avons aussi un jardin.", ["wir", "haben", "auch", "einen Garten"], ["Einen Garten haben wir auch."], ("einen Garten", AKK, "Wir haben… quoi ? Einen Garten."), ("einen Garten", "ein Garten", ["ein Garten", "einem Garten"]), "Les deux sont corrects ; « Einen Garten haben wir auch » répond à « Ihr habt ja einen Balkon! » : « Ja, und einen Garten haben wir auch. »"),
                    S("Heute kauft meine Mutter einen Fernseher.", "Aujourd'hui, ma mère achète une télé.", ["heute", "kauft", "meine Mutter", "einen Fernseher"], ["Meine Mutter kauft heute einen Fernseher."], ("meine Mutter", NOM, "Meine Mutter fait l'action : nominatif."), ("einen Fernseher", "ein Fernseher", ["ein Fernseher", "einem Fernseher"]), VERB_SECOND),
                ],
                CASE,
            ),
        ],
    },
]

TRACK = make_track(
    "de-cas",
    "Les cas",
    "Nominatif, accusatif, datif, génitif : qui fait quoi dans la phrase, et comment l'allemand le montre.",
    units,
)
