"""The German « tenses in use » track: present of strong verbs, Perfekt, future, Präteritum, Plusquamperfekt,
Konjunktiv II and I, then mixed stories. The verbs are the common ones of the « Verbes » tab."""
from phrase_kit import L, R, S, T, make_track

HS = "haben ou sein"
CONJ = "quand ? avant ? après ?"

# Tenses, asked in several lessons.
PRES, PERF, PRAET, PLUSQ = "présent", "Perfekt", "Präteritum", "plus-que-parfait"
TENSE3 = {"prompt": "Quel temps ?", "options": [PRES, PERF, PRAET]}

# ---------------------------------------------------------------- Unit 1: the present of strong verbs
CH_A = "oui : a devient ä (ou au, äu)"
CH_E = "oui : e devient i"
CH_IE = "oui : e devient ie"
APART = "un verbe à part"
SAME = "non : la voyelle ne change pas"

unit1 = {
    "title": "Le présent des verbes forts",
    "level": "A1",
    "hint": "Les verbes qui changent de voyelle au présent, mais seulement avec du et er / sie / es : du fährst, er liest.",
    "lessons": [
        L(
            "a devient ä : fahren, schlafen, laufen",
            R(
                "Certains verbes forts changent leur voyelle au présent, mais seulement avec du et avec er, sie, es.",
                [
                    "a devient ä : ich fahre, du fährst, er fährt.",
                    "Avec ich, wir, ihr et sie (pluriel), la voyelle ne change pas : wir fahren, ihr fahrt.",
                    "au devient äu de la même façon : laufen, du läufst, sie läuft.",
                    "Verbes fréquents : fahren, schlafen, tragen, waschen, fallen, halten, lassen, laufen.",
                ],
                [["Du fährst morgen nach Berlin.", "Demain, tu vas à Berlin."], ["Wir fahren heute mit dem Zug.", "Aujourd'hui, nous prenons le train."]],
                [T(["", "fahren", "schlafen", "laufen"], [["ich", "fahre", "schlafe", "laufe"], ["du", "fährst", "schläfst", "läufst"], ["er / sie / es", "fährt", "schläft", "läuft"], ["wir", "fahren", "schlafen", "laufen"], ["ihr", "fahrt", "schlaft", "lauft"], ["sie / Sie", "fahren", "schlafen", "laufen"]])],
            ),
            [
                S("Du fährst morgen nach Berlin.", "Demain, tu vas à Berlin.", ["du", "fährst", "morgen", "nach Berlin"], ["Morgen fährst du nach Berlin."], ("fährst", CH_A, "Avec du, a devient ä : du fährst."), ("fährst", "fahren", ["fährt", "fahrst"]), "Les deux ordres sont corrects : le verbe reste en 2e position."),
                S("Wir fahren heute mit dem Zug.", "Aujourd'hui, nous prenons le train.", ["wir", "fahren", "heute", "mit dem Zug"], ["Heute fahren wir mit dem Zug."], ("fahren", SAME, "Avec wir, pas de changement : wir fahren."), ("fahren", "fahren", ["fährt", "fährst"]), "Les deux ordres sont corrects : le verbe reste en 2e position."),
                S("Das Baby schläft schon.", "Le bébé dort déjà.", ["das Baby", "schläft", "schon"], focus=("schläft", CH_A, "Avec es (das Baby), a devient ä : es schläft."), blank=("schläft", "schlafen", ["schläfst", "schlaft"])),
                S("Trägst du heute eine Jacke?", "Tu portes une veste aujourd'hui ?", ["trägst", "du", "heute", "eine Jacke"], focus=("trägst", CH_A, "Avec du, a devient ä : du trägst."), blank=("trägst", "tragen", ["trägt", "tragst"])),
                S("Am Wochenende schlafen wir lange.", "Le week-end, nous faisons la grasse matinée.", ["am Wochenende", "schlafen", "wir", "lange"], ["Wir schlafen am Wochenende lange."], ("schlafen", SAME, "Avec wir, pas de changement : wir schlafen."), ("schlafen", "schlafen", ["schläft", "schläfst"]), "Les deux ordres sont corrects : le verbe reste en 2e position."),
                S("Mein Vater wäscht das Auto.", "Mon père lave la voiture.", ["mein Vater", "wäscht", "das Auto"], focus=("wäscht", CH_A, "Avec er (mein Vater), a devient ä : er wäscht."), blank=("wäscht", "waschen", ["wäschst", "wascht"])),
                S("Jeden Morgen läuft sie fünf Kilometer.", "Chaque matin, elle court cinq kilomètres.", ["jeden Morgen", "läuft", "sie", "fünf Kilometer"], ["Sie läuft jeden Morgen fünf Kilometer."], ("läuft", CH_A, "au devient äu, comme a devient ä : sie läuft."), ("läuft", "laufen", ["läufst", "lauft"]), "Les deux ordres sont corrects : le verbe reste en 2e position."),
                S("Ihr fahrt zu schnell.", "Vous roulez trop vite.", ["ihr", "fahrt", "zu schnell"], focus=("fahrt", SAME, "Avec ihr, pas de changement : ihr fahrt."), blank=("fahrt", "fahren", ["fahren", "fährt"])),
            ],
            {"prompt": "La voyelle change-t-elle ici ?", "options": [CH_A, SAME]},
        ),
        L(
            "e devient i : geben, nehmen, essen, sprechen",
            R(
                "D'autres verbes forts changent e en i, toujours avec du et avec er, sie, es.",
                [
                    "ich gebe, du gibst, er gibt ; ich spreche, du sprichst, sie spricht.",
                    "nehmen change aussi ses consonnes : du nimmst, er nimmt.",
                    "essen : du isst, er isst (on n'écrit pas trois s).",
                    "Verbes fréquents : geben, nehmen, essen, sprechen, helfen, treffen, vergessen, werfen.",
                    "Avec ich et au pluriel, rien ne change : ich treffe, wir essen.",
                ],
                [["Er gibt mir das Buch.", "Il me donne le livre."], ["Nimmst du den Bus?", "Tu prends le bus ?"]],
                [T(["", "geben", "nehmen", "essen"], [["ich", "gebe", "nehme", "esse"], ["du", "gibst", "nimmst", "isst"], ["er / sie / es", "gibt", "nimmt", "isst"], ["wir", "geben", "nehmen", "essen"], ["ihr", "gebt", "nehmt", "esst"], ["sie / Sie", "geben", "nehmen", "essen"]])],
            ),
            [
                S("Er gibt mir das Buch.", "Il me donne le livre.", ["er", "gibt", "mir", "das Buch"], focus=("gibt", CH_E, "Avec er, e devient i : er gibt."), blank=("gibt", "geben", ["gebt", "gibst"])),
                S("Nimmst du den Bus?", "Tu prends le bus ?", ["nimmst", "du", "den Bus"], focus=("nimmst", CH_E, "Avec du, e devient i, et h devient m : du nimmst."), blank=("nimmst", "nehmen", ["nehmst", "nimmt"])),
                S("Wir essen um sieben Uhr.", "Nous mangeons à sept heures.", ["wir", "essen", "um sieben Uhr"], ["Um sieben Uhr essen wir."], ("essen", SAME, "Avec wir, pas de changement : wir essen."), ("essen", "essen", ["isst", "esst"]), "Les deux ordres sont corrects : le verbe reste en 2e position."),
                S("Sie spricht sehr gut Deutsch.", "Elle parle très bien allemand.", ["sie", "spricht", "sehr gut", "Deutsch"], focus=("spricht", CH_E, "Avec sie (elle), e devient i : sie spricht."), blank=("spricht", "sprechen", ["sprecht", "sprichst"])),
                S("Heute hilft mein Bruder in der Küche.", "Aujourd'hui, mon frère aide à la cuisine.", ["heute", "hilft", "mein Bruder", "in der Küche"], ["Mein Bruder hilft heute in der Küche."], ("hilft", CH_E, "Avec er (mein Bruder), e devient i : er hilft."), ("hilft", "helfen", ["helft", "hilfst"]), "Les deux ordres sont corrects : le verbe reste en 2e position."),
                S("Isst du kein Fleisch?", "Tu ne manges pas de viande ?", ["isst", "du", "kein Fleisch"], focus=("isst", CH_E, "Avec du, e devient i : du isst."), blank=("isst", "essen", ["esst", "essen"])),
                S("Ich treffe Paul am Bahnhof.", "Je retrouve Paul à la gare.", ["ich", "treffe", "Paul", "am Bahnhof"], focus=("treffe", SAME, "Avec ich, pas de changement : ich treffe."), blank=("treffe", "treffen", ["trifft", "triffe"])),
                S("Er vergisst immer seinen Schlüssel.", "Il oublie toujours sa clé.", ["er", "vergisst", "immer", "seinen Schlüssel"], focus=("vergisst", CH_E, "Avec er, e devient i : er vergisst."), blank=("vergisst", "vergessen", ["vergesst", "vergisse"])),
            ],
            {"prompt": "La voyelle change-t-elle ici ?", "options": [CH_E, SAME]},
        ),
        L(
            "e devient ie : lesen, sehen, empfehlen",
            R(
                "Quelques verbes changent e en ie (et non en i) : lesen, sehen, empfehlen, stehlen.",
                [
                    "ich lese, du liest, er liest : après s, du prend seulement -t.",
                    "ich sehe, du siehst, sie sieht.",
                    "Pour savoir si c'est i ou ie, il faut apprendre le verbe : geben → gibt, mais sehen → sieht.",
                ],
                [["Er liest jeden Abend die Zeitung.", "Il lit le journal tous les soirs."], ["Siehst du das Schiff?", "Tu vois le bateau ?"]],
                [T(["", "lesen", "sehen", "empfehlen"], [["ich", "lese", "sehe", "empfehle"], ["du", "liest", "siehst", "empfiehlst"], ["er / sie / es", "liest", "sieht", "empfiehlt"], ["wir", "lesen", "sehen", "empfehlen"]])],
            ),
            [
                S("Er liest jeden Abend die Zeitung.", "Il lit le journal tous les soirs.", ["er", "liest", "jeden Abend", "die Zeitung"], ["Jeden Abend liest er die Zeitung."], ("liest", CH_IE, "Lesen : e devient ie, er liest."), ("liest", "lesen", ["lest", "liesst"]), "Les deux ordres sont corrects : le verbe reste en 2e position."),
                S("Siehst du das Schiff?", "Tu vois le bateau ?", ["siehst", "du", "das Schiff"], focus=("siehst", CH_IE, "Sehen : e devient ie, du siehst."), blank=("siehst", "sehen", ["sehst", "sieht"])),
                S("Meine Oma sieht schlecht.", "Ma grand-mère voit mal.", ["meine Oma", "sieht", "schlecht"], focus=("sieht", CH_IE, "Avec sie (meine Oma), e devient ie : sie sieht."), blank=("sieht", "sehen", ["seht", "siehst"])),
                S("Was empfiehlst du mir?", "Qu'est-ce que tu me conseilles ?", ["was", "empfiehlst", "du", "mir"], focus=("empfiehlst", CH_IE, "Empfehlen : e devient ie, du empfiehlst."), blank=("empfiehlst", "empfehlen", ["empfehlst", "empfiehlt"])),
                S("Heute Abend sehen wir einen Film.", "Ce soir, nous regardons un film.", ["heute Abend", "sehen", "wir", "einen Film"], ["Wir sehen heute Abend einen Film."], ("sehen", SAME, "Avec wir, pas de changement : wir sehen."), ("sehen", "sehen", ["sieht", "siehst"]), "Les deux ordres sont corrects : le verbe reste en 2e position."),
                S("Sie gibt ihm ihre Nummer.", "Elle lui donne son numéro.", ["sie", "gibt", "ihm", "ihre Nummer"], focus=("gibt", CH_E, "Geben : e devient i (pas ie), sie gibt."), blank=("gibt", "geben", ["gebt", "giebt"])),
                S("Der Kellner empfiehlt den Fisch.", "Le serveur recommande le poisson.", ["der Kellner", "empfiehlt", "den Fisch"], focus=("empfiehlt", CH_IE, "Avec er (der Kellner), e devient ie : er empfiehlt."), blank=("empfiehlt", "empfehlen", ["empfehlt", "empfiehlst"])),
                S("Du sprichst zu leise.", "Tu parles trop bas.", ["du", "sprichst", "zu leise"], focus=("sprichst", CH_E, "Sprechen : e devient i (pas ie), du sprichst."), blank=("sprichst", "sprechen", ["sprechst", "spricht"])),
            ],
            {"prompt": "La voyelle change-t-elle ici ?", "options": [CH_E, CH_IE, SAME]},
        ),
        L(
            "Les verbes à part : haben, werden, wissen, sein",
            R(
                "Quatre verbes très fréquents ont leurs propres formes : on les apprend tels quels.",
                [
                    "haben : du hast, er hat (le b disparaît).",
                    "werden : du wirst, er wird.",
                    "wissen : ich weiß, du weißt, er weiß (pas de -t avec ich et er).",
                    "sein : ich bin, du bist, er ist, wir sind, ihr seid, sie sind.",
                ],
                [["Hast du Zeit?", "Tu as le temps ?"], ["Er weiß die Antwort nicht.", "Il ne connaît pas la réponse."]],
                [T(["", "haben", "werden", "wissen", "sein"], [["ich", "habe", "werde", "weiß", "bin"], ["du", "hast", "wirst", "weißt", "bist"], ["er / sie / es", "hat", "wird", "weiß", "ist"], ["wir", "haben", "werden", "wissen", "sind"], ["ihr", "habt", "werdet", "wisst", "seid"], ["sie / Sie", "haben", "werden", "wissen", "sind"]])],
            ),
            [
                S("Hast du Zeit?", "Tu as le temps ?", ["hast", "du", "Zeit"], focus=("hast", APART, "Haben est à part : du hast, sans b."), blank=("hast", "haben", ["habst", "hat"])),
                S("Er weiß die Antwort nicht.", "Il ne connaît pas la réponse.", ["er", "weiß", "die Antwort", "nicht"], focus=("weiß", APART, "Wissen est à part : er weiß, sans -t."), blank=("weiß", "wissen", ["weißt", "wisst"])),
                S("Es wird kalt.", "Il commence à faire froid.", ["es", "wird", "kalt"], focus=("wird", APART, "Werden est à part : es wird."), blank=("wird", "werden", ["werdet", "wirst"])),
                S("Im Winter fällt viel Schnee.", "En hiver, il tombe beaucoup de neige.", ["im Winter", "fällt", "viel Schnee"], focus=("fällt", CH_A, "Fallen : a devient ä, es fällt."), blank=("fällt", "fallen", ["fällst", "fallt"])),
                S("Ihr seid sehr nett.", "Vous êtes très gentils.", ["ihr", "seid", "sehr nett"], focus=("seid", APART, "Sein est à part : ihr seid (à ne pas confondre avec seit, « depuis »)."), blank=("seid", "sein", ["sind", "seit"])),
                S("Nimmt sie den Zug oder das Auto?", "Elle prend le train ou la voiture ?", ["nimmt", "sie", "den Zug", "oder", "das Auto"], focus=("nimmt", CH_E, "Nehmen : e devient i, sie nimmt."), blank=("nimmt", "nehmen", ["nehmt", "nimmst"])),
                S("Wir wissen es schon.", "Nous le savons déjà.", ["wir", "wissen", "es", "schon"], focus=("wissen", APART, "Wissen est à part, mais avec wir il garde la forme de l'infinitif : wir wissen."), blank=("wissen", "wissen", ["weiß", "wisst"])),
                S("Wirst du müde?", "Tu commences à être fatigué ?", ["wirst", "du", "müde"], focus=("wirst", APART, "Werden est à part : du wirst."), blank=("wirst", "werden", ["wird", "werdest"])),
            ],
            {"prompt": "La voyelle change-t-elle ici ?", "options": [CH_A, CH_E, APART, SAME]},
        ),
    ],
}

# ---------------------------------------------------------------- Unit 2: the Perfekt
AUX = "haben ou sein conjugué, en 2e position"
PART = "le participe, à la fin"
OTHER = "autre chose : qui, quoi, quand…"
ROLE = {"prompt": "Quel est le rôle du mot surligné ?", "options": [AUX, PART, OTHER]}
END = "Les deux ordres sont corrects : haben ou sein reste en 2e position, le participe à la fin."

REG = "régulier : ge-…-t"
IRR = "irrégulier : ge-…-en"
MIX = "mixte : ge-…-t avec une autre voyelle"

MOVE = "sein : un déplacement"
STATE = "sein : un changement d'état"
SPECIAL = "sein : à retenir (sein, bleiben, passieren)"
HABEN = "haben : le cas général"

GE_START = "au début : ge-…"
GE_MID = "au milieu : particule + ge + verbe"
NO_GE = "pas de ge-"
GE = {"prompt": "Où est le ge- du participe ?", "options": [GE_START, GE_MID, NO_GE]}

AUX_SUB = "haben ou sein conjugué"
PART_SUB = "le participe"
OPEN = "le mot qui ouvre la subordonnée"

unit2 = {
    "title": "Le Perfekt",
    "level": "A2",
    "hint": "Le passé de la conversation : haben ou sein en 2e position, le participe tout à la fin.",
    "lessons": [
        L(
            "haben + participe à la fin",
            R(
                "Pour raconter ce qui s'est passé, à l'oral, on utilise le Perfekt : haben conjugué en 2e position, le participe tout à la fin.",
                [
                    "Participe des verbes réguliers : ge + radical + t : machen → gemacht, spielen → gespielt.",
                    "Radical en -t ou en -d : ge…-et : arbeiten → gearbeitet.",
                    "Le participe ne change jamais : ich habe gespielt, sie hat gespielt.",
                    "Tout le reste se place entre les deux : Ich habe gestern mit Paul Tennis gespielt.",
                ],
                [["Ich habe gestern Fußball gespielt.", "Hier, j'ai joué au foot."], ["Sie hat den ganzen Tag gearbeitet.", "Elle a travaillé toute la journée."]],
            ),
            [
                S("Ich habe gestern Fußball gespielt.", "Hier, j'ai joué au foot.", ["ich", "habe", "gestern", "Fußball", "gespielt"], ["Gestern habe ich Fußball gespielt."], ("gespielt", PART, "Le participe va tout à la fin : gespielt."), ("gespielt", "spielen", ["spielt", "gespielen"]), END),
                S("Wir haben eine Pizza gekauft.", "Nous avons acheté une pizza.", ["wir", "haben", "eine Pizza", "gekauft"], focus=("haben", AUX, "Haben, conjugué avec wir, est en 2e position."), blank=("gekauft", "kaufen", ["kauft", "gekaufen"])),
                S("Hast du schon die Hausaufgaben gemacht?", "Tu as déjà fait tes devoirs ?", ["hast", "du", "schon", "die Hausaufgaben", "gemacht"], ["Hast du die Hausaufgaben schon gemacht?"], focus=("die Hausaufgaben", OTHER, "Die Hausaufgaben : ce qu'on a fait, entre haben et le participe."), blank=("gemacht", "machen", ["macht", "gemachen"])),
                S("Sie hat den ganzen Tag gearbeitet.", "Elle a travaillé toute la journée.", ["sie", "hat", "den ganzen Tag", "gearbeitet"], ["Den ganzen Tag hat sie gearbeitet."], ("gearbeitet", PART, "Radical en -t : ge-arbeit-et, à la fin."), ("gearbeitet", "arbeiten", ["arbeitet", "gearbeiten"]), END),
                S("Am Samstag haben wir lange gefrühstückt.", "Samedi, nous avons pris un long petit-déjeuner.", ["am Samstag", "haben", "wir", "lange", "gefrühstückt"], ["Wir haben am Samstag lange gefrühstückt."], ("haben", AUX, "Am Samstag en tête : haben reste en 2e position, wir passe après."), ("gefrühstückt", "frühstücken", ["frühstückt", "gefrühstücken"]), END),
                S("Paul hat mir eine Nachricht geschickt.", "Paul m'a envoyé un message.", ["Paul", "hat", "mir", "eine Nachricht", "geschickt"], focus=("geschickt", PART, "Schicken → geschickt, à la fin."), blank=("geschickt", "schicken", ["schickt", "geschicken"])),
                S("Was hast du am Wochenende gemacht?", "Qu'est-ce que tu as fait ce week-end ?", ["was", "hast", "du", "am Wochenende", "gemacht"], focus=("hast", AUX, "Hast, en 2e position après was."), blank=("hast", "haben", ["hat", "habst"])),
                S("Meine Eltern haben ein Haus gemietet.", "Mes parents ont loué une maison.", ["meine Eltern", "haben", "ein Haus", "gemietet"], focus=("ein Haus", OTHER, "Ein Haus : ce qu'ils ont loué."), blank=("gemietet", "mieten", ["mietet", "gemieten"])),
            ],
            ROLE,
        ),
        L(
            "Les participes irréguliers : ge-…-en",
            R(
                "Les verbes forts font leur participe en ge-…-en, souvent avec une autre voyelle.",
                [
                    "sehen → gesehen, schreiben → geschrieben, trinken → getrunken, finden → gefunden, sprechen → gesprochen.",
                    "La voyelle peut changer : on l'apprend avec le verbe. C'est la 3e forme de l'onglet Verbes.",
                    "Quelques verbes sont mixtes : ge-…-t, avec une autre voyelle : bringen → gebracht, denken → gedacht, wissen → gewusst.",
                ],
                [["Ich habe den Film schon gesehen.", "J'ai déjà vu le film."], ["Sie hat mir ein Geschenk gebracht.", "Elle m'a apporté un cadeau."]],
            ),
            [
                S("Ich habe den Film schon gesehen.", "J'ai déjà vu le film.", ["ich", "habe", "den Film", "schon", "gesehen"], ["Den Film habe ich schon gesehen."], ("gesehen", IRR, "Sehen → gesehen : ge-…-en."), ("gesehen", "sehen", ["gesieht", "gesehet"]), "Les deux sont corrects ; on commence par « den Film » quand on vient d'en parler."),
                S("Er hat einen Brief geschrieben.", "Il a écrit une lettre.", ["er", "hat", "einen Brief", "geschrieben"], focus=("geschrieben", IRR, "Schreiben → geschrieben : ge-…-en, ei devient ie."), blank=("geschrieben", "schreiben", ["geschreibt", "geschreiben"])),
                S("Wir haben zu viel Kaffee getrunken.", "Nous avons bu trop de café.", ["wir", "haben", "zu viel Kaffee", "getrunken"], focus=("getrunken", IRR, "Trinken → getrunken : i devient u."), blank=("getrunken", "trinken", ["getrinkt", "getrinken"])),
                S("Hast du deinen Schlüssel gefunden?", "Tu as trouvé ta clé ?", ["hast", "du", "deinen Schlüssel", "gefunden"], focus=("gefunden", IRR, "Finden → gefunden : i devient u."), blank=("gefunden", "finden", ["gefindet", "gefinden"])),
                S("Sie hat mir ein Geschenk gebracht.", "Elle m'a apporté un cadeau.", ["sie", "hat", "mir", "ein Geschenk", "gebracht"], focus=("gebracht", MIX, "Bringen → gebracht : -t comme un verbe régulier, mais la voyelle change."), blank=("gebracht", "bringen", ["gebringt", "gebrungen"])),
                S("Gestern haben wir im Restaurant gegessen.", "Hier, nous avons mangé au restaurant.", ["gestern", "haben", "wir", "im Restaurant", "gegessen"], ["Wir haben gestern im Restaurant gegessen."], ("gegessen", IRR, "Essen → gegessen : ge-…-en, avec un g ajouté."), ("gegessen", "essen", ["geesst", "geessen"]), END),
                S("Ich habe an dich gedacht.", "J'ai pensé à toi.", ["ich", "habe", "an dich", "gedacht"], focus=("gedacht", MIX, "Denken → gedacht : -t, mais e devient a."), blank=("gedacht", "denken", ["gedenkt", "gedunken"])),
                S("Der Lehrer hat mit meinen Eltern gesprochen.", "Le professeur a parlé avec mes parents.", ["der Lehrer", "hat", "mit meinen Eltern", "gesprochen"], focus=("gesprochen", IRR, "Sprechen → gesprochen : e devient o."), blank=("gesprochen", "sprechen", ["gesprecht", "gesprechen"])),
                S("Ich habe das nicht gewusst.", "Je ne le savais pas.", ["ich", "habe", "das", "nicht", "gewusst"], focus=("gewusst", MIX, "Wissen → gewusst : -t, mais i devient u."), blank=("gewusst", "wissen", ["gewisst", "gewissen"]), alt=["Das habe ich nicht gewusst.", "Ich wusste das nicht.", "Das wusste ich nicht."]),
                S("Wir haben den ganzen Abend gelacht.", "Nous avons ri toute la soirée.", ["wir", "haben", "den ganzen Abend", "gelacht"], focus=("gelacht", REG, "Lachen est régulier : gelacht."), blank=("gelacht", "lachen", ["gelachen", "lacht"])),
            ],
            {"prompt": "Comment ce participe est-il formé ?", "options": [REG, IRR, MIX]},
        ),
        L(
            "Avec sein : se déplacer, changer d'état",
            R(
                "Certains verbes font leur Perfekt avec sein au lieu de haben.",
                [
                    "Les déplacements d'un lieu à un autre : gehen, kommen, fahren, fliegen, laufen : Ich bin nach Hause gegangen.",
                    "Les changements d'état : aufstehen, einschlafen, aufwachen, werden, sterben : Er ist krank geworden.",
                    "Trois verbes à retenir : sein (ist gewesen), bleiben (ist geblieben), passieren (ist passiert).",
                    "Tous les autres prennent haben, même schlafen, essen ou arbeiten. (Dans le sud et en Autriche, stehen, sitzen et liegen prennent aussi sein.)",
                ],
                [["Ich bin nach Hause gegangen.", "Je suis rentré à la maison."], ["Er hat lange geschlafen.", "Il a dormi longtemps."]],
            ),
            [
                S("Ich bin nach Hause gegangen.", "Je suis rentré à la maison.", ["ich", "bin", "nach Hause", "gegangen"], focus=("gegangen", MOVE, "On va d'un lieu à un autre : sein."), blank=("bin", HS, ["habe"]), alt=["Ich ging nach Hause."]),
                S("Wir sind nach Spanien geflogen.", "Nous sommes allés en Espagne en avion.", ["wir", "sind", "nach Spanien", "geflogen"], focus=("geflogen", MOVE, "Fliegen : un déplacement, donc sein."), blank=("sind", HS, ["haben"]), alt=["Wir flogen nach Spanien."]),
                S("Er hat lange geschlafen.", "Il a dormi longtemps.", ["er", "hat", "lange", "geschlafen"], focus=("geschlafen", HABEN, "Schlafen n'est ni un déplacement ni un changement d'état : haben."), blank=("hat", HS, ["ist"]), alt=["Er schlief lange."]),
                S("Gestern ist sie um sechs Uhr aufgestanden.", "Hier, elle s'est levée à six heures.", ["gestern", "ist", "sie", "um sechs Uhr", "aufgestanden"], ["Sie ist gestern um sechs Uhr aufgestanden."], ("aufgestanden", STATE, "On passe de couché à debout : un changement d'état."), ("ist", HS, ["hat"]), END),
                S("Wo bist du gewesen?", "Où étais-tu ?", ["wo", "bist", "du", "gewesen"], focus=("gewesen", SPECIAL, "Sein se conjugue avec sein : ich bin gewesen."), blank=("bist", HS, ["hast"]), alt=["Wo warst du?"]),
                S("Wir sind zu Hause geblieben.", "Nous sommes restés à la maison.", ["wir", "sind", "zu Hause", "geblieben"], focus=("geblieben", SPECIAL, "Bleiben prend sein, comme en français « rester »."), blank=("sind", HS, ["haben"]), alt=["Wir blieben zu Hause."]),
                S("Was ist passiert?", "Qu'est-ce qui s'est passé ?", ["was", "ist", "passiert"], focus=("passiert", SPECIAL, "Passieren prend sein : es ist passiert."), blank=("ist", HS, ["hat"])),
                S("Die Kinder haben im Garten gespielt.", "Les enfants ont joué dans le jardin.", ["die Kinder", "haben", "im Garten", "gespielt"], focus=("gespielt", HABEN, "Jouer dans le jardin n'est pas aller quelque part : haben."), blank=("haben", HS, ["sind"])),
                S("Mein Opa ist im Winter krank geworden.", "Mon grand-père est tombé malade pendant l'hiver.", ["mein Opa", "ist", "im Winter", "krank", "geworden"], ["Im Winter ist mein Opa krank geworden."], ("geworden", STATE, "Werden : on change d'état, donc sein."), ("ist", HS, ["hat"]), END),
                S("Bist du mit dem Fahrrad gekommen?", "Tu es venu à vélo ?", ["bist", "du", "mit dem Fahrrad", "gekommen"], focus=("gekommen", MOVE, "Kommen : un déplacement, donc sein."), blank=("bist", HS, ["hast"])),
            ],
            {"prompt": "Pourquoi haben ou sein ici ?", "options": [MOVE, STATE, SPECIAL, HABEN]},
        ),
        L(
            "Les verbes séparables : ge au milieu",
            R(
                "Avec les verbes séparables, ge- se place entre la particule et le verbe.",
                [
                    "anrufen → angerufen, einkaufen → eingekauft, mitbringen → mitgebracht, fernsehen → ferngesehen.",
                    "Le tout s'écrit en un seul mot, à la fin de la phrase.",
                    "La particule porte l'accent : ANgerufen, EINgekauft.",
                    "haben ou sein : même règle que pour le verbe simple : ankommen → ist angekommen.",
                ],
                [["Ich habe dich gestern angerufen.", "Je t'ai appelé hier."], ["Der Zug ist pünktlich angekommen.", "Le train est arrivé à l'heure."]],
            ),
            [
                S("Ich habe dich gestern angerufen.", "Je t'ai appelé hier.", ["ich", "habe", "dich", "gestern", "angerufen"], ["Gestern habe ich dich angerufen."], ("angerufen", GE_MID, "An-ge-rufen : ge- entre la particule et le verbe."), ("angerufen", "anrufen", ["geanrufen", "angeruft"]), END),
                S("Wir haben im Supermarkt eingekauft.", "Nous avons fait les courses au supermarché.", ["wir", "haben", "im Supermarkt", "eingekauft"], focus=("eingekauft", GE_MID, "Ein-ge-kauft : ge- au milieu."), blank=("eingekauft", "einkaufen", ["geeinkauft", "eingekaufen"])),
                S("Sie hat einen Kuchen mitgebracht.", "Elle a apporté un gâteau.", ["sie", "hat", "einen Kuchen", "mitgebracht"], focus=("mitgebracht", GE_MID, "Mit-ge-bracht : ge- au milieu."), blank=("mitgebracht", "mitbringen", ["gemitbracht", "mitgebringt"])),
                S("Die Kinder haben zu lange ferngesehen.", "Les enfants ont regardé la télé trop longtemps.", ["die Kinder", "haben", "zu lange", "ferngesehen"], focus=("ferngesehen", GE_MID, "Fern-ge-sehen : ge- au milieu."), blank=("ferngesehen", "fernsehen", ["gefernsehen", "ferngesieht"])),
                S("Der Zug ist pünktlich angekommen.", "Le train est arrivé à l'heure.", ["der Zug", "ist", "pünktlich", "angekommen"], focus=("angekommen", GE_MID, "An-ge-kommen, avec sein comme kommen."), blank=("angekommen", "ankommen", ["geankommen", "angekommt"])),
                S("Wann hast du das Fenster aufgemacht?", "Quand as-tu ouvert la fenêtre ?", ["wann", "hast", "du", "das Fenster", "aufgemacht"], focus=("aufgemacht", GE_MID, "Auf-ge-macht : ge- au milieu."), blank=("aufgemacht", "aufmachen", ["geaufmacht", "aufgemachen"])),
                S("Er hat den ganzen Abend gelesen.", "Il a lu toute la soirée.", ["er", "hat", "den ganzen Abend", "gelesen"], focus=("gelesen", GE_START, "Lesen n'a pas de particule : ge- au début."), blank=("gelesen", "lesen", ["gelest", "geliest"])),
                S("Ich bin um sieben Uhr aufgewacht.", "Je me suis réveillé à sept heures.", ["ich", "bin", "um sieben Uhr", "aufgewacht"], ["Um sieben Uhr bin ich aufgewacht."], ("aufgewacht", GE_MID, "Auf-ge-wacht : ge- au milieu."), ("aufgewacht", "aufwachen", ["geaufwacht", "aufgewachen"]), END),
            ],
            GE,
        ),
        L(
            "Sans ge- : -ieren, be-, ver-, er-…",
            R(
                "Deux familles de verbes n'ont pas de ge- au participe.",
                [
                    "Les verbes en -ieren : studieren → studiert, telefonieren → telefoniert, reparieren → repariert.",
                    "Les verbes qui commencent par be-, ver-, er-, ent-, emp-, zer-, ge-, miss- : besuchen → besucht, verstehen → verstanden, erzählen → erzählt.",
                    "Ces préfixes ne se séparent jamais et ne portent pas l'accent : verSTEhen.",
                    "Parfois, le participe a la même forme que l'infinitif : bekommen → bekommen, vergessen → vergessen.",
                ],
                [["Ich habe dich nicht verstanden.", "Je ne t'ai pas compris."], ["Sie hat in Berlin studiert.", "Elle a fait ses études à Berlin."]],
            ),
            [
                S("Ich habe dich nicht verstanden.", "Je ne t'ai pas compris.", ["ich", "habe", "dich", "nicht", "verstanden"], focus=("verstanden", NO_GE, "Ver- : pas de ge-, verstanden."), blank=("verstanden", "verstehen", ["geverstanden", "verstehtet"]), alt=["Ich verstand dich nicht."]),
                S("Sie hat in Berlin studiert.", "Elle a fait ses études à Berlin.", ["sie", "hat", "in Berlin", "studiert"], focus=("studiert", NO_GE, "Verbe en -ieren : pas de ge-, studiert."), blank=("studiert", "studieren", ["gestudiert", "studieret"])),
                S("Wir haben unsere Freunde besucht.", "Nous avons rendu visite à nos amis.", ["wir", "haben", "unsere Freunde", "besucht"], focus=("besucht", NO_GE, "Be- : pas de ge-, besucht."), blank=("besucht", "besuchen", ["gebesucht", "besuchen"])),
                S("Hast du die Waschmaschine repariert?", "Tu as réparé la machine à laver ?", ["hast", "du", "die Waschmaschine", "repariert"], focus=("repariert", NO_GE, "Verbe en -ieren : repariert."), blank=("repariert", "reparieren", ["gerepariert", "reparierte"])),
                S("Opa hat uns eine Geschichte erzählt.", "Papi nous a raconté une histoire.", ["Opa", "hat", "uns", "eine Geschichte", "erzählt"], focus=("erzählt", NO_GE, "Er- : pas de ge-, erzählt."), blank=("erzählt", "erzählen", ["geerzählt", "erzählen"])),
                S("Zum Geburtstag habe ich ein Fahrrad bekommen.", "Pour mon anniversaire, j'ai reçu un vélo.", ["zum Geburtstag", "habe", "ich", "ein Fahrrad", "bekommen"], ["Ich habe zum Geburtstag ein Fahrrad bekommen."], ("bekommen", NO_GE, "Be- : pas de ge- ; ici, le participe ressemble à l'infinitif."), ("bekommen", "bekommen", ["gebekommen", "bekommt"]), END),
                S("Ich habe meine Tasche im Bus vergessen.", "J'ai oublié mon sac dans le bus.", ["ich", "habe", "meine Tasche", "im Bus", "vergessen"], focus=("vergessen", NO_GE, "Ver- : pas de ge-, vergessen."), blank=("vergessen", "vergessen", ["gevergessen", "vergesst"]), alt=["Ich vergaß meine Tasche im Bus."]),
                S("Er hat eine Stunde telefoniert.", "Il a téléphoné pendant une heure.", ["er", "hat", "eine Stunde", "telefoniert"], focus=("telefoniert", NO_GE, "Verbe en -ieren : telefoniert."), blank=("telefoniert", "telefonieren", ["getelefoniert", "telefonieret"])),
                S("Ich habe die Tür zugemacht.", "J'ai fermé la porte.", ["ich", "habe", "die Tür", "zugemacht"], focus=("zugemacht", GE_MID, "Zumachen est séparable : zu-ge-macht."), blank=("zugemacht", "zumachen", ["gezumacht", "zugemachen"])),
            ],
            GE,
        ),
        L(
            "Le Perfekt dans une subordonnée",
            R(
                "Dans une subordonnée (weil, dass, ob, wann…), le verbe conjugué part tout à la fin, après le participe.",
                [
                    "Ich bin müde, weil ich schlecht geschlafen habe.",
                    "La fin de la subordonnée : d'abord le participe, puis haben ou sein : …dass er gekommen ist.",
                    "Une virgule sépare toujours la subordonnée de la principale.",
                    "Si la subordonnée ouvre la phrase, la principale commence par son verbe : Weil es geregnet hat, sind wir zu Hause geblieben.",
                ],
                [["Ich bin müde, weil ich schlecht geschlafen habe.", "Je suis fatigué parce que j'ai mal dormi."], ["Weil es geregnet hat, sind wir zu Hause geblieben.", "Comme il a plu, nous sommes restés à la maison."]],
            ),
            [
                S("Ich bin müde, weil ich schlecht geschlafen habe.", "Je suis fatigué parce que j'ai mal dormi.", ["ich", "bin", "müde", "weil", "ich", "schlecht", "geschlafen", "habe"], ["Weil ich schlecht geschlafen habe, bin ich müde."], ("habe", AUX_SUB, "Dans la subordonnée, habe passe tout à la fin, après le participe."), ("geschlafen", "schlafen", ["schlief", "geschlaft"]), "Les deux sont corrects. Quand la subordonnée ouvre la phrase, la principale commence par son verbe : bin ich müde."),
                S("Er sagt, dass er den Bus verpasst hat.", "Il dit qu'il a raté le bus.", ["er", "sagt", "dass", "er", "den Bus", "verpasst", "hat"], focus=("dass", OPEN, "Dass ouvre la subordonnée : le verbe conjugué part à la fin."), blank=("hat", HS, ["ist"])),
                S("Weil es geregnet hat, sind wir zu Hause geblieben.", "Comme il a plu, nous sommes restés à la maison.", ["weil", "es", "geregnet", "hat", "sind", "wir", "zu Hause", "geblieben"], ["Wir sind zu Hause geblieben, weil es geregnet hat."], ("sind", AUX_SUB, "La subordonnée occupe la 1re place : la principale commence par son verbe, sind."), ("geregnet", "regnen", ["geregnen", "regnet"]), "Les deux sont corrects. On met la cause en tête quand on veut d'abord l'expliquer."),
                S("Ich weiß nicht, ob sie schon angekommen ist.", "Je ne sais pas si elle est déjà arrivée.", ["ich", "weiß", "nicht", "ob", "sie", "schon", "angekommen", "ist"], focus=("angekommen", PART_SUB, "Le participe vient juste avant ist, à la fin."), blank=("ist", HS, ["hat"])),
                S("Sie ist glücklich, weil sie die Prüfung bestanden hat.", "Elle est heureuse parce qu'elle a réussi l'examen.", ["sie", "ist", "glücklich", "weil", "sie", "die Prüfung", "bestanden", "hat"], ["Weil sie die Prüfung bestanden hat, ist sie glücklich."], ("weil", OPEN, "Weil ouvre la subordonnée : hat part à la fin."), ("bestanden", "bestehen", ["gebestanden", "bestand"]), "Les deux sont corrects. Quand la subordonnée ouvre la phrase, la principale commence par son verbe : ist sie glücklich."),
                S("Weißt du, wann der Film angefangen hat?", "Tu sais quand le film a commencé ?", ["weißt", "du", "wann", "der Film", "angefangen", "hat"], focus=("wann", OPEN, "Wann ouvre ici une question indirecte : le verbe va à la fin."), blank=("angefangen", "anfangen", ["geanfangen", "angefangt"])),
                S("Es tut mir leid, dass ich so spät gekommen bin.", "Je suis désolé d'être arrivé si tard.", ["es", "tut", "mir", "leid", "dass", "ich", "so spät", "gekommen", "bin"], focus=("bin", AUX_SUB, "Dans la subordonnée, bin passe à la fin, après gekommen."), blank=("bin", HS, ["habe"])),
            ],
            {"prompt": "Quel est le rôle du mot surligné ?", "options": [AUX_SUB, PART_SUB, OPEN]},
        ),
    ],
}

# ---------------------------------------------------------------- Unit 3: talking about the future
NOW = "maintenant ou d'habitude"
FUT = "le futur : un mot de temps le montre"
PROMISE = "une promesse ou une décision"
FORECAST = "une prévision"
GUESS = "une supposition (wohl)"
SECOND = "Les deux ordres sont corrects : le verbe reste en 2e position."

unit3 = {
    "title": "Parler du futur",
    "level": "A2",
    "hint": "En allemand, le présent suffit souvent ; werden sert à promettre, prévoir ou supposer.",
    "lessons": [
        L(
            "Le présent pour parler du futur",
            R(
                "En allemand, on parle surtout du futur avec le présent et un mot de temps.",
                [
                    "Morgen fahre ich nach Köln : demain, je vais à Cologne.",
                    "Les mots de temps : morgen, übermorgen, nächste Woche, am Wochenende, bald, später, diesen Sommer.",
                    "Là où le français dit « je vais faire », l'allemand dit souvent « ich mache ».",
                    "Le mot de temps peut ouvrir la phrase : le verbe reste en 2e position.",
                ],
                [["Morgen fahre ich nach Köln.", "Demain, je vais à Cologne."], ["Ich rufe dich später an.", "Je t'appelle plus tard."]],
            ),
            [
                S("Morgen fahre ich nach Köln.", "Demain, je vais à Cologne.", ["morgen", "fahre", "ich", "nach Köln"], ["Ich fahre morgen nach Köln."], ("fahre", FUT, "Morgen montre le futur : le présent suffit."), ("fahre", "fahren", ["fährst", "fährt"]), SECOND, ["Morgen werde ich nach Köln fahren.", "Ich werde morgen nach Köln fahren."]),
                S("Nächste Woche besuchen wir unsere Tante.", "La semaine prochaine, nous allons rendre visite à notre tante.", ["nächste Woche", "besuchen", "wir", "unsere Tante"], ["Wir besuchen nächste Woche unsere Tante."], ("besuchen", FUT, "Nächste Woche montre le futur."), ("besuchen", "besuchen", ["besucht", "besuchst"]), SECOND, ["Nächste Woche werden wir unsere Tante besuchen.", "Wir werden nächste Woche unsere Tante besuchen."]),
                S("Ich trinke jeden Morgen einen Tee.", "Je bois un thé tous les matins.", ["ich", "trinke", "jeden Morgen", "einen Tee"], ["Jeden Morgen trinke ich einen Tee."], ("trinke", NOW, "Jeden Morgen : une habitude, pas le futur."), ("trinke", "trinken", ["trinkt", "trinkst"]), SECOND),
                S("Diesen Sommer fliegen wir nach Italien.", "Cet été, nous allons en Italie en avion.", ["diesen Sommer", "fliegen", "wir", "nach Italien"], ["Wir fliegen diesen Sommer nach Italien."], ("fliegen", FUT, "Diesen Sommer : l'été qui vient."), ("fliegen", "fliegen", ["fliegt", "fliegst"]), SECOND, ["Diesen Sommer werden wir nach Italien fliegen.", "Wir werden diesen Sommer nach Italien fliegen."]),
                S("Ich rufe dich später an.", "Je t'appelle plus tard.", ["ich", "rufe", "dich", "später", "an"], ["Später rufe ich dich an."], ("rufe", FUT, "Später montre le futur."), ("rufe", "anrufen", ["rufst", "ruft"]), "Les deux sont corrects ; la particule « an » reste à la fin.", alt=["Ich werde dich später anrufen.", "Später werde ich dich anrufen."]),
                S("Was machst du nächstes Wochenende?", "Qu'est-ce que tu fais le week-end prochain ?", ["was", "machst", "du", "nächstes Wochenende"], focus=("machst", FUT, "Am Wochenende : le week-end qui vient."), blank=("machst", "machen", ["macht", "machen"])),
                S("Jetzt regnet es.", "Maintenant, il pleut.", ["jetzt", "regnet", "es"], ["Es regnet jetzt."], ("regnet", NOW, "Jetzt : maintenant."), ("regnet", "regnen", ["regnen", "regnete"]), SECOND),
                S("Bald hat meine Schwester Geburtstag.", "Bientôt, c'est l'anniversaire de ma sœur.", ["bald", "hat", "meine Schwester", "Geburtstag"], ["Meine Schwester hat bald Geburtstag."], ("hat", FUT, "Bald montre le futur."), ("hat", "haben", ["habt", "hast"]), SECOND),
            ],
            {"prompt": "Ce verbe parle de quand ?", "options": [NOW, FUT]},
        ),
        L(
            "werden + infinitif : promettre, prévoir, supposer",
            R(
                "Le futur avec werden existe aussi : werden conjugué en 2e position, l'infinitif à la fin.",
                [
                    "ich werde, du wirst, er wird, wir werden, ihr werdet, sie werden.",
                    "On l'emploie pour une promesse ou une décision ferme : Ich werde dir helfen.",
                    "Pour une prévision : Morgen wird es schneien.",
                    "Avec wohl, pour une supposition sur le présent : Er wird wohl im Büro sein (il doit être au bureau).",
                    "Sans insistance, le présent avec un mot de temps reste plus courant.",
                ],
                [["Ich werde dir helfen.", "Je vais t'aider."], ["Er wird wohl im Büro sein.", "Il doit être au bureau."]],
            ),
            [
                S("Ich werde dir helfen.", "Je vais t'aider.", ["ich", "werde", "dir", "helfen"], focus=("werde", PROMISE, "Une promesse : ich werde dir helfen."), blank=("werde", "werden", ["wird", "werdest"]), alt=["Ich helfe dir."]),
                S("Morgen wird es schneien.", "Demain, il va neiger.", ["morgen", "wird", "es", "schneien"], ["Es wird morgen schneien."], ("wird", FORECAST, "La météo : une prévision."), ("wird", "werden", ["werdet", "wirst"]), SECOND, ["Morgen schneit es.", "Es schneit morgen."]),
                S("Er wird wohl im Büro sein.", "Il doit être au bureau.", ["er", "wird", "wohl", "im Büro", "sein"], focus=("wird", GUESS, "Wohl : on suppose, on n'est pas sûr."), blank=("wird", "werden", ["werde", "wirst"]), alt=["Er ist wohl im Büro."]),
                S("Wir werden das nie vergessen.", "Nous ne l'oublierons jamais.", ["wir", "werden", "das", "nie", "vergessen"], focus=("werden", PROMISE, "Une décision ferme : nous ne l'oublierons jamais."), blank=("werden", "werden", ["wird", "werdet"]), alt=["Wir vergessen das nie."]),
                S("Du wirst die Prüfung bestimmt bestehen.", "Tu vas sûrement réussir l'examen.", ["du", "wirst", "die Prüfung", "bestimmt", "bestehen"], ["Du wirst bestimmt die Prüfung bestehen.", "Bestimmt wirst du die Prüfung bestehen."], focus=("wirst", FORECAST, "Bestimmt : on prévoit ce qui va se passer."), blank=("wirst", "werden", ["wird", "werdest"]), alt=["Du bestehst die Prüfung bestimmt.", "Du bestehst bestimmt die Prüfung."]),
                S("Die Kinder werden wohl schon schlafen.", "Les enfants doivent déjà dormir.", ["die Kinder", "werden", "wohl", "schon", "schlafen"], focus=("werden", GUESS, "Wohl : une supposition sur maintenant."), blank=("werden", "werden", ["wird", "werdet"])),
                S("Ich werde nie wieder rauchen.", "Je ne fumerai plus jamais.", ["ich", "werde", "nie wieder", "rauchen"], focus=("werde", PROMISE, "Une décision ferme."), blank=("werde", "werden", ["wirst", "wird"]), alt=["Ich rauche nie wieder."]),
                S("Im Jahr 2050 werden mehr Menschen in Städten leben.", "En 2050, plus de gens vivront en ville.", ["im Jahr 2050", "werden", "mehr Menschen", "in Städten", "leben"], ["Mehr Menschen werden im Jahr 2050 in Städten leben."], ("werden", FORECAST, "Une prévision sur l'avenir."), ("werden", "werden", ["wird", "werdet"]), SECOND),
            ],
            {"prompt": "Que dit ce futur ?", "options": [PROMISE, FORECAST, GUESS]},
        ),
    ],
}

# ---------------------------------------------------------------- Unit 4: the Präteritum
STRONG = "fort : la voyelle change, sans -te"
WEAK = "régulier : -te"
MIXED = "mixte : la voyelle change, avec -te"

unit4 = {
    "title": "Le Präteritum",
    "level": "B1",
    "hint": "Le passé des récits écrits ; à l'oral, surtout pour sein, haben, les verbes de modalité et quelques verbes comme wissen ou es gibt.",
    "lessons": [
        L(
            "war et hatte : le passé de sein et haben",
            R(
                "Avec sein et haben, on dit presque toujours le Präteritum, même à l'oral : ich war, ich hatte.",
                [
                    "sein : ich war, du warst, er war, wir waren, ihr wart, sie waren.",
                    "haben : ich hatte, du hattest, er hatte, wir hatten, ihr hattet, sie hatten.",
                    "ich et er / sie / es ont la même forme, sans terminaison : ich war, er war.",
                    "« Ich bin gewesen » existe, mais « ich war » est plus courant.",
                ],
                [["Gestern war ich krank.", "Hier, j'étais malade."], ["Wir hatten keine Zeit.", "Nous n'avions pas le temps."]],
                [T(["", "sein", "haben"], [["ich", "war", "hatte"], ["du", "warst", "hattest"], ["er / sie / es", "war", "hatte"], ["wir", "waren", "hatten"], ["ihr", "wart", "hattet"], ["sie / Sie", "waren", "hatten"]])],
            ),
            [
                S("Gestern war ich krank.", "Hier, j'étais malade.", ["gestern", "war", "ich", "krank"], ["Ich war gestern krank."], ("war", PRAET, "War : le Präteritum de sein."), ("war", "sein", ["bin", "warst"]), SECOND, ["Gestern bin ich krank gewesen.", "Ich bin gestern krank gewesen."]),
                S("Wir hatten keine Zeit.", "Nous n'avions pas le temps.", ["wir", "hatten", "keine Zeit"], focus=("hatten", PRAET, "Hatten : le Präteritum de haben."), blank=("hatten", "haben", ["hatte", "hattet"]), alt=["Wir haben keine Zeit gehabt."]),
                S("Wo warst du am Wochenende?", "Où étais-tu ce week-end ?", ["wo", "warst", "du", "am Wochenende"], focus=("warst", PRAET, "Warst : sein au Präteritum, avec du."), blank=("warst", "sein", ["war", "wart"]), alt=["Wo bist du am Wochenende gewesen?"]),
                S("Das Wetter war sehr schön.", "Il a fait très beau.", ["das Wetter", "war", "sehr schön"], focus=("war", PRAET, "War : le Präteritum de sein."), blank=("war", "sein", ["waren", "warst"]), alt=["Das Wetter ist sehr schön gewesen."]),
                S("Hattest du einen schönen Urlaub?", "Tu as passé de bonnes vacances ?", ["hattest", "du", "einen schönen Urlaub"], focus=("hattest", PRAET, "Hattest : haben au Präteritum, avec du."), blank=("hattest", "haben", ["hattet", "hatte"]), alt=["Hast du einen schönen Urlaub gehabt?"]),
                S("Ich bin jetzt zu Hause.", "Je suis à la maison maintenant.", ["ich", "bin", "jetzt", "zu Hause"], ["Jetzt bin ich zu Hause."], ("bin", PRES, "Jetzt : maintenant, donc le présent."), ("bin", "sein", ["war", "bist"]), SECOND),
                S("Meine Eltern waren nicht da.", "Mes parents n'étaient pas là.", ["meine Eltern", "waren", "nicht", "da"], focus=("waren", PRAET, "Waren : sein au Präteritum, au pluriel."), blank=("waren", "sein", ["war", "wart"]), alt=["Meine Eltern sind nicht da gewesen."]),
                S("Ihr hattet Glück.", "Vous avez eu de la chance.", ["ihr", "hattet", "Glück"], focus=("hattet", PRAET, "Hattet : haben au Präteritum, avec ihr."), blank=("hattet", "haben", ["hattest", "hatten"]), alt=["Ihr habt Glück gehabt."]),
                S("Wir sind gestern ins Kino gegangen.", "Hier, nous sommes allés au cinéma.", ["wir", "sind", "gestern", "ins Kino", "gegangen"], ["Gestern sind wir ins Kino gegangen."], ("sind", PERF, "Sind + participe : c'est le Perfekt."), ("gegangen", "gehen", ["ging", "gegeht"]), END, alt=["Gestern gingen wir ins Kino.", "Wir gingen gestern ins Kino."]),
            ],
            TENSE3,
        ),
        L(
            "Les verbes de modalité au passé : konnte, musste, wollte",
            R(
                "Les verbes de modalité se disent aussi au Präteritum, à l'oral comme à l'écrit.",
                [
                    "können → konnte, müssen → musste, wollen → wollte, dürfen → durfte, sollen → sollte, mögen → mochte.",
                    "Plus d'Umlaut au passé : ich musste, ich konnte.",
                    "Terminaisons : ich konnte, du konntest, er konnte, wir konnten, ihr konntet, sie konnten.",
                    "L'infinitif reste à la fin : Ich musste lange warten.",
                ],
                [["Ich musste lange warten.", "J'ai dû attendre longtemps."], ["Als Kind konnte er nicht schwimmen.", "Enfant, il ne savait pas nager."]],
                [T(["", "können", "müssen", "wollen", "dürfen"], [["ich / er", "konnte", "musste", "wollte", "durfte"], ["du", "konntest", "musstest", "wolltest", "durftest"], ["wir / sie", "konnten", "mussten", "wollten", "durften"]])],
            ),
            [
                S("Ich musste lange warten.", "J'ai dû attendre longtemps.", ["ich", "musste", "lange", "warten"], focus=("musste", PRAET, "Musste : müssen au Präteritum, sans Umlaut."), blank=("musste", "müssen", ["musstest", "mussten"])),
                S("Als Kind konnte er nicht schwimmen.", "Enfant, il ne savait pas nager.", ["als Kind", "konnte", "er", "nicht", "schwimmen"], ["Er konnte als Kind nicht schwimmen."], ("konnte", PRAET, "Konnte : können au Präteritum."), ("konnte", "können", ["kann", "könnte"]), SECOND),
                S("Wir wollten ins Kino gehen.", "Nous voulions aller au cinéma.", ["wir", "wollten", "ins Kino", "gehen"], focus=("wollten", PRAET, "Wollten : wollen au Präteritum."), blank=("wollten", "wollen", ["wollte", "wolltet"])),
                S("Du darfst hier nicht parken.", "Tu n'as pas le droit de te garer ici.", ["du", "darfst", "hier", "nicht", "parken"], ["Hier darfst du nicht parken."], ("darfst", PRES, "Darfst : dürfen au présent."), ("darfst", "dürfen", ["dürfst", "darf"]), SECOND),
                S("Durftest du als Kind lange fernsehen?", "Tu avais le droit de regarder longtemps la télé quand tu étais petit ?", ["durftest", "du", "als Kind", "lange", "fernsehen"], focus=("durftest", PRAET, "Durftest : dürfen au Präteritum, sans Umlaut."), blank=("durftest", "dürfen", ["darfst", "durfte"])),
                S("Sie sollte um acht Uhr anrufen.", "Elle devait appeler à huit heures.", ["sie", "sollte", "um acht Uhr", "anrufen"], focus=("sollte", PRAET, "Sollte : sollen au Präteritum."), blank=("sollte", "sollen", ["solltest", "sollten"])),
                S("Als Kind mochte ich keinen Spinat.", "Enfant, je n'aimais pas les épinards.", ["als Kind", "mochte", "ich", "keinen Spinat"], ["Ich mochte als Kind keinen Spinat."], ("mochte", PRAET, "Mochte : mögen au Präteritum (möchte veut dire « je voudrais »)."), ("mochte", "mögen", ["mochtest", "möchte"]), SECOND, ["Als Kind habe ich keinen Spinat gemocht.", "Ich habe als Kind keinen Spinat gemocht."]),
                S("Kannst du mir helfen?", "Tu peux m'aider ?", ["kannst", "du", "mir", "helfen"], focus=("kannst", PRES, "Kannst : können au présent."), blank=("kannst", "können", ["könnst", "kann"])),
            ],
            {"prompt": "Quel temps ?", "options": [PRES, PRAET]},
        ),
        L(
            "Les verbes réguliers : -te",
            R(
                "Au Präteritum, les verbes réguliers prennent -te : machen → ich machte.",
                [
                    "ich machte, du machtest, er machte, wir machten, ihr machtet, sie machten.",
                    "Radical en -t ou en -d, ou consonne + m ou n (öffnen, atmen, rechnen) : -ete : arbeiten → er arbeitete, öffnen → sie öffnete.",
                    "À l'oral, on préfère le Perfekt (ich habe gemacht) ; le Präteritum se lit dans les récits, les livres et les journaux.",
                    "ich et er / sie / es ont la même forme : ich wohnte, er wohnte.",
                ],
                [["Damals wohnten wir in Hamburg.", "À l'époque, nous habitions à Hambourg."], ["Plötzlich klingelte das Telefon.", "Soudain, le téléphone sonna."]],
            ),
            [
                S("Damals wohnten wir in Hamburg.", "À l'époque, nous habitions à Hambourg.", ["damals", "wohnten", "wir", "in Hamburg"], ["Wir wohnten damals in Hamburg."], ("wohnten", PRAET, "Wohn-te-n : régulier au Präteritum."), ("wohnten", "wohnen", ["wohntet", "wohnte"]), SECOND, ["Damals haben wir in Hamburg gewohnt.", "Wir haben damals in Hamburg gewohnt."]),
                S("Der Mann öffnete langsam die Tür.", "L'homme ouvrit lentement la porte.", ["der Mann", "öffnete", "langsam", "die Tür"], focus=("öffnete", PRAET, "Öffn-ete : radical en -n après une consonne, d'où -ete."), blank=("öffnete", "öffnen", ["öffnetet", "öffente"]), alt=["Der Mann hat langsam die Tür geöffnet."]),
                S("Sie arbeitete zehn Jahre in einer Bank.", "Elle a travaillé dix ans dans une banque.", ["sie", "arbeitete", "zehn Jahre", "in einer Bank"], focus=("arbeitete", PRAET, "Arbeit-ete : radical en -t, d'où -ete."), blank=("arbeitete", "arbeiten", ["arbeitetest", "arbeitte"]), alt=["Sie hat zehn Jahre in einer Bank gearbeitet."]),
                S("Die Kinder spielten im Schnee.", "Les enfants jouaient dans la neige.", ["die Kinder", "spielten", "im Schnee"], focus=("spielten", PRAET, "Spiel-te-n : régulier au Präteritum."), blank=("spielten", "spielen", ["spieltet", "spielte"]), alt=["Die Kinder haben im Schnee gespielt."]),
                S("Ich habe das Fenster geöffnet.", "J'ai ouvert la fenêtre.", ["ich", "habe", "das Fenster", "geöffnet"], focus=("geöffnet", PERF, "Habe + participe : c'est le Perfekt."), blank=("geöffnet", "öffnen", ["öffnete", "geöffent"])),
                S("Plötzlich klingelte das Telefon.", "Soudain, le téléphone sonna.", ["plötzlich", "klingelte", "das Telefon"], ["Das Telefon klingelte plötzlich."], ("klingelte", PRAET, "Klingel-te : régulier au Präteritum."), ("klingelte", "klingeln", ["klingeltet", "klingten"]), SECOND, ["Plötzlich hat das Telefon geklingelt."]),
                S("Wir lernten jeden Tag zwei Stunden.", "Nous étudiions deux heures par jour.", ["wir", "lernten", "jeden Tag", "zwei Stunden"], focus=("lernten", PRAET, "Lern-te-n : régulier au Präteritum."), blank=("lernten", "lernen", ["lernte", "lerntet"]), alt=["Wir haben jeden Tag zwei Stunden gelernt."]),
                S("Sie lebt jetzt in Wien.", "Elle vit maintenant à Vienne.", ["sie", "lebt", "jetzt", "in Wien"], ["Jetzt lebt sie in Wien."], ("lebt", PRES, "Jetzt : le présent."), ("lebt", "leben", ["lebte", "leben"]), SECOND),
            ],
            TENSE3,
        ),
        L(
            "Les verbes forts : ging, kam, sah",
            R(
                "Les verbes forts changent de voyelle et ne prennent pas -te : gehen → ging, kommen → kam.",
                [
                    "ich ging, du gingst, er ging, wir gingen, ihr gingt, sie gingen.",
                    "Pas de terminaison avec ich et er / sie / es : ich kam, er kam.",
                    "C'est la 2e forme de l'onglet Verbes : gehen, ging, gegangen.",
                    "Les plus fréquents : ging, kam, sah, gab, nahm, fand, blieb, sprach, stand, fuhr, las, schrieb.",
                ],
                [["Er ging ohne ein Wort.", "Il partit sans un mot."], ["Sie sah aus dem Fenster.", "Elle regarda par la fenêtre."]],
            ),
            [
                S("Er ging ohne ein Wort.", "Il partit sans un mot.", ["er", "ging", "ohne ein Wort"], focus=("ging", STRONG, "Gehen → ging : la voyelle change, pas de -te."), blank=("ging", "gehen", ["gehte", "gang"]), alt=["Er ist ohne ein Wort gegangen."]),
                S("Am Abend kam ein Brief.", "Le soir, une lettre arriva.", ["am Abend", "kam", "ein Brief"], focus=("kam", STRONG, "Kommen → kam."), blank=("kam", "kommen", ["kommte", "kamm"]), alt=["Am Abend ist ein Brief gekommen."]),
                S("Sie sah aus dem Fenster.", "Elle regarda par la fenêtre.", ["sie", "sah", "aus dem Fenster"], focus=("sah", STRONG, "Sehen → sah."), blank=("sah", "sehen", ["sehte", "sahst"]), alt=["Sie hat aus dem Fenster gesehen."]),
                S("Wir fanden den Weg nicht.", "Nous ne trouvions pas le chemin.", ["wir", "fanden", "den Weg", "nicht"], focus=("fanden", STRONG, "Finden → fand, fanden."), blank=("fanden", "finden", ["findeten", "fand"]), alt=["Wir haben den Weg nicht gefunden."]),
                S("Der Junge nahm sein Fahrrad und fuhr los.", "Le garçon prit son vélo et partit.", ["der Junge", "nahm", "sein Fahrrad", "und", "fuhr", "los"], focus=("fuhr", STRONG, "Fahren → fuhr."), blank=("nahm", "nehmen", ["nehmte", "nahmst"]), alt=["Der Junge hat sein Fahrrad genommen und ist losgefahren."]),
                S("Die Frau wartete am Bahnhof.", "La femme attendait à la gare.", ["die Frau", "wartete", "am Bahnhof"], focus=("wartete", WEAK, "Warten est régulier : wart-ete."), blank=("wartete", "warten", ["wartetest", "wartte"]), alt=["Die Frau hat am Bahnhof gewartet."]),
                S("Lange blieb er still.", "Longtemps, il resta silencieux.", ["lange", "blieb", "er", "still"], ["Er blieb lange still."], ("blieb", STRONG, "Bleiben → blieb."), ("blieb", "bleiben", ["bleibte", "bliebt"]), SECOND, ["Er ist lange still geblieben."]),
                S("Sie schrieb jeden Tag in ihr Tagebuch.", "Elle écrivait chaque jour dans son journal.", ["sie", "schrieb", "jeden Tag", "in ihr Tagebuch"], focus=("schrieb", STRONG, "Schreiben → schrieb."), blank=("schrieb", "schreiben", ["schreibte", "schrieben"]), alt=["Sie hat jeden Tag in ihr Tagebuch geschrieben."]),
                S("Er las die Nachricht zweimal.", "Il lut le message deux fois.", ["er", "las", "die Nachricht", "zweimal"], focus=("las", STRONG, "Lesen → las."), blank=("las", "lesen", ["leste", "lasst"]), alt=["Er hat die Nachricht zweimal gelesen."]),
            ],
            {"prompt": "Ce Präteritum est-il fort ou régulier ?", "options": [STRONG, WEAK]},
        ),
        L(
            "Les verbes mixtes : dachte, brachte, wusste",
            R(
                "Quelques verbes changent de voyelle et prennent aussi -te : ce sont les verbes mixtes.",
                [
                    "denken → dachte, bringen → brachte, wissen → wusste, kennen → kannte, rennen → rannte, nennen → nannte.",
                    "Leur participe suit la même idée : gedacht, gebracht, gewusst, gekannt.",
                    "Dans un récit écrit, le passé se raconte en général au Präteritum.",
                ],
                [["Ich dachte an meine Mutter.", "Je pensais à ma mère."], ["Niemand wusste die Antwort.", "Personne ne connaissait la réponse."]],
            ),
            [
                S("Ich dachte an meine Mutter.", "Je pensais à ma mère.", ["ich", "dachte", "an meine Mutter"], focus=("dachte", MIXED, "Denken → dachte : e devient a, et -te."), blank=("dachte", "denken", ["denkte", "dacht"]), alt=["Ich habe an meine Mutter gedacht."]),
                S("Niemand wusste die Antwort.", "Personne ne connaissait la réponse.", ["niemand", "wusste", "die Antwort"], focus=("wusste", MIXED, "Wissen → wusste : i devient u, et -te."), blank=("wusste", "wissen", ["wisste", "weißte"]), alt=["Niemand hat die Antwort gewusst."]),
                S("Der Kellner brachte uns die Rechnung.", "Le serveur nous apporta l'addition.", ["der Kellner", "brachte", "uns", "die Rechnung"], focus=("brachte", MIXED, "Bringen → brachte."), blank=("brachte", "bringen", ["bringte", "brang"]), alt=["Der Kellner hat uns die Rechnung gebracht."]),
                S("Damals kannte ich niemanden in Berlin.", "À l'époque, je ne connaissais personne à Berlin.", ["damals", "kannte", "ich", "niemanden", "in Berlin"], ["Ich kannte damals niemanden in Berlin.", "Damals kannte ich in Berlin niemanden."], ("kannte", MIXED, "Kennen → kannte."), ("kannte", "kennen", ["kennte", "kann"]), SECOND, ["Damals habe ich niemanden in Berlin gekannt."]),
                S("Er rannte zum Bus.", "Il courut jusqu'au bus.", ["er", "rannte", "zum Bus"], focus=("rannte", MIXED, "Rennen → rannte."), blank=("rannte", "rennen", ["rennte", "rann"]), alt=["Er ist zum Bus gerannt."]),
                S("Sie trank einen Kaffee und las die Zeitung.", "Elle but un café et lut le journal.", ["sie", "trank", "einen Kaffee", "und", "las", "die Zeitung"], focus=("trank", STRONG, "Trinken → trank : verbe fort, pas de -te."), blank=("trank", "trinken", ["trinkte", "trunk"]), alt=["Sie hat einen Kaffee getrunken und die Zeitung gelesen."]),
                S("Wir kauften Brot und Käse.", "Nous avons acheté du pain et du fromage.", ["wir", "kauften", "Brot und Käse"], focus=("kauften", WEAK, "Kaufen est régulier : kauf-te-n."), blank=("kauften", "kaufen", ["kaufte", "kauftet"]), alt=["Wir haben Brot und Käse gekauft."]),
                S("Plötzlich stand ein Mann vor der Tür.", "Soudain, un homme se tenait devant la porte.", ["plötzlich", "stand", "ein Mann", "vor der Tür"], ["Ein Mann stand plötzlich vor der Tür."], ("stand", STRONG, "Stehen → stand : verbe fort."), ("stand", "stehen", ["stehte", "standet"]), SECOND, ["Plötzlich hat ein Mann vor der Tür gestanden.", "Plötzlich ist ein Mann vor der Tür gestanden."]),
            ],
            {"prompt": "Ce Präteritum est-il fort, régulier ou mixte ?", "options": [STRONG, WEAK, MIXED]},
        ),
    ],
}

# ---------------------------------------------------------------- Unit 5: Perfekt or Präteritum?
ORAL_PERF = "Perfekt : le cas général à l'oral"
ORAL_PRAET = "Präteritum : sein, haben ou un verbe de modalité"
WRITTEN = "dans un récit écrit"
SPOKEN = "dans une conversation"

unit5 = {
    "title": "Perfekt ou Präteritum ?",
    "level": "B1",
    "hint": "Les deux temps disent la même chose : on choisit selon le verbe et selon qu'on parle ou qu'on écrit.",
    "lessons": [
        L(
            "À l'oral : Perfekt, sauf sein, haben et les modaux",
            R(
                "Quand on raconte à l'oral, on choisit le temps selon le verbe.",
                [
                    "La plupart des verbes : Perfekt : Ich habe gestern Pizza gegessen.",
                    "sein, haben et les verbes de modalité : Präteritum : Ich war müde, ich musste arbeiten.",
                    "Dans une même phrase, on mélange donc les deux : Ich war müde und bin früh ins Bett gegangen.",
                    "Dans le sud (Bavière, Autriche, Suisse), on dit aussi « ich bin gewesen ».",
                ],
                [["Ich war müde und bin früh ins Bett gegangen.", "J'étais fatigué et je suis allé me coucher tôt."], ["Hast du gut geschlafen?", "Tu as bien dormi ?"]],
            ),
            [
                S("Ich war müde und bin früh ins Bett gegangen.", "J'étais fatigué et je suis allé me coucher tôt.", ["ich", "war", "müde", "und", "bin", "früh", "ins Bett", "gegangen"], focus=("war", ORAL_PRAET, "Sein : Präteritum, même à l'oral."), blank=("gegangen", "gehen", ["ging", "gegeht"]), alt=["Ich war müde und ging früh ins Bett."]),
                S("Gestern hatte ich Kopfschmerzen.", "Hier, j'avais mal à la tête.", ["gestern", "hatte", "ich", "Kopfschmerzen"], ["Ich hatte gestern Kopfschmerzen."], ("hatte", ORAL_PRAET, "Haben : Präteritum, même à l'oral."), ("hatte", "haben", ["hat", "hatten"]), SECOND, ["Gestern habe ich Kopfschmerzen gehabt.", "Ich habe gestern Kopfschmerzen gehabt."]),
                S("Wir haben im Urlaub viel fotografiert.", "Pendant les vacances, nous avons pris beaucoup de photos.", ["wir", "haben", "im Urlaub", "viel", "fotografiert"], ["Im Urlaub haben wir viel fotografiert."], ("fotografiert", ORAL_PERF, "Un verbe ordinaire : Perfekt à l'oral."), ("fotografiert", "fotografieren", ["fotografierten", "gefotografiert"]), END),
                S("Ich konnte nicht kommen, weil ich arbeiten musste.", "Je n'ai pas pu venir parce que je devais travailler.", ["ich", "konnte", "nicht", "kommen", "weil", "ich", "arbeiten", "musste"], ["Weil ich arbeiten musste, konnte ich nicht kommen."], ("konnte", ORAL_PRAET, "Können : un verbe de modalité, donc Präteritum."), ("musste", "müssen", ["musstest", "mussten"]), "Les deux sont corrects ; dans la subordonnée, musste va à la fin."),
                S("Hast du gut geschlafen?", "Tu as bien dormi ?", ["hast", "du", "gut", "geschlafen"], focus=("geschlafen", ORAL_PERF, "Schlafen : Perfekt à l'oral."), blank=("geschlafen", "schlafen", ["schlief", "geschlaft"])),
                S("Am Samstag waren wir im Zoo und haben Eis gegessen.", "Samedi, nous sommes allés au zoo et nous avons mangé une glace.", ["am Samstag", "waren", "wir", "im Zoo", "und", "haben", "Eis", "gegessen"], ["Wir waren am Samstag im Zoo und haben Eis gegessen."], focus=("waren", ORAL_PRAET, "Sein : Präteritum ; essen : Perfekt."), blank=("gegessen", "essen", ["aßen", "geesst"])),
                S("Er wollte mich anrufen, aber er hat meine Nummer verloren.", "Il voulait m'appeler, mais il a perdu mon numéro.", ["er", "wollte", "mich", "anrufen", "aber", "er", "hat", "meine Nummer", "verloren"], focus=("verloren", ORAL_PERF, "Verlieren : Perfekt à l'oral ; wollen reste au Präteritum."), blank=("wollte", "wollen", ["wollten", "wolltet"])),
            ],
            {"prompt": "Pourquoi ce temps ?", "options": [ORAL_PERF, ORAL_PRAET]},
        ),
        L(
            "À l'écrit : le récit au Präteritum",
            R(
                "Dans un roman, un conte ou un article, le récit se fait au Präteritum, pour tous les verbes.",
                [
                    "Es war einmal ein König… : il était une fois un roi…",
                    "Dans les journaux : Der Minister reiste gestern nach Paris.",
                    "Quand un personnage parle, entre guillemets, il revient souvent au Perfekt, comme à l'oral.",
                    "Là où le français écrit le passé simple ou l'imparfait, l'allemand écrit le Präteritum.",
                ],
                [["Es war einmal ein armer Müller.", "Il était une fois un pauvre meunier."], ["Der Minister reiste gestern nach Paris.", "Le ministre s'est rendu hier à Paris."]],
            ),
            [
                S("Es war einmal ein armer Müller.", "Il était une fois un pauvre meunier.", ["es", "war", "einmal", "ein armer Müller"], focus=("war", WRITTEN, "Le début typique des contes."), blank=("war", "sein", ["ist", "wäre"])),
                S("Der König rief seine Tochter.", "Le roi appela sa fille.", ["der König", "rief", "seine Tochter"], focus=("rief", WRITTEN, "Rufen au Präteritum : un récit."), blank=("rief", "rufen", ["rufte", "gerufen"]), alt=["Der König hat seine Tochter gerufen."]),
                S("Der Minister reiste gestern nach Paris.", "Le ministre s'est rendu hier à Paris.", ["der Minister", "reiste", "gestern", "nach Paris"], ["Gestern reiste der Minister nach Paris."], ("reiste", WRITTEN, "Un article de journal : Präteritum."), ("reiste", "reisen", ["riss", "gereist"]), SECOND, ["Der Minister ist gestern nach Paris gereist."]),
                S("Was hast du heute gemacht?", "Qu'est-ce que tu as fait aujourd'hui ?", ["was", "hast", "du", "heute", "gemacht"], focus=("gemacht", SPOKEN, "Une question à un proche : Perfekt."), blank=("gemacht", "machen", ["machte", "gemachen"])),
                S("Der Wolf lief in den Wald.", "Le loup s'enfuit dans la forêt.", ["der Wolf", "lief", "in den Wald"], focus=("lief", WRITTEN, "Laufen → lief : un récit."), blank=("lief", "laufen", ["laufte", "gelaufen"]), alt=["Der Wolf ist in den Wald gelaufen."]),
                S("Die Polizei fand das Auto am nächsten Tag.", "La police retrouva la voiture le lendemain.", ["die Polizei", "fand", "das Auto", "am nächsten Tag"], ["Am nächsten Tag fand die Polizei das Auto."], ("fand", WRITTEN, "Un fait divers : Präteritum."), ("fand", "finden", ["findete", "fund"]), SECOND, ["Die Polizei hat das Auto am nächsten Tag gefunden."]),
                S("Hast du schon gegessen?", "Tu as déjà mangé ?", ["hast", "du", "schon", "gegessen"], focus=("gegessen", SPOKEN, "Une question à table : Perfekt."), blank=("gegessen", "essen", ["aß", "geesst"])),
                S("Nach dem Essen gingen die Gäste nach Hause.", "Après le repas, les invités rentrèrent chez eux.", ["nach dem Essen", "gingen", "die Gäste", "nach Hause"], ["Die Gäste gingen nach dem Essen nach Hause."], ("gingen", WRITTEN, "Gehen → gingen : un récit."), ("gingen", "gehen", ["gehten", "gangen"]), SECOND, ["Nach dem Essen sind die Gäste nach Hause gegangen."]),
            ],
            {"prompt": "Où entend-on ou lit-on plutôt cette phrase ?", "options": [WRITTEN, SPOKEN]},
        ),
        L(
            "La même histoire, à l'oral et à l'écrit",
            R(
                "La même histoire se raconte au Perfekt à un ami, et au Präteritum dans un livre.",
                [
                    "À l'oral : Gestern bin ich in die Stadt gefahren.",
                    "À l'écrit : Am nächsten Morgen fuhr er in die Stadt.",
                    "Le sens est le même ; seul le registre change.",
                    "sein, haben et les verbes de modalité restent au Präteritum dans les deux cas.",
                ],
                [["Gestern bin ich in die Stadt gefahren.", "Hier, je suis allé en ville."], ["Am nächsten Morgen fuhr er in die Stadt.", "Le lendemain matin, il partit pour la ville."]],
            ),
            [
                S("Gestern bin ich in die Stadt gefahren.", "Hier, je suis allé en ville.", ["gestern", "bin", "ich", "in die Stadt", "gefahren"], ["Ich bin gestern in die Stadt gefahren."], ("gefahren", PERF, "Bin + participe : Perfekt, comme à l'oral."), ("bin", HS, ["habe"]), END, ["Gestern fuhr ich in die Stadt.", "Ich fuhr gestern in die Stadt."]),
                S("Am nächsten Morgen fuhr er in die Stadt.", "Le lendemain matin, il partit pour la ville.", ["am nächsten Morgen", "fuhr", "er", "in die Stadt"], ["Er fuhr am nächsten Morgen in die Stadt."], ("fuhr", PRAET, "Fuhr : Präteritum, comme dans un livre."), ("fuhr", "fahren", ["fahrte", "gefahren"]), SECOND, ["Am nächsten Morgen ist er in die Stadt gefahren."]),
                S("Ich habe meinen Freund im Park getroffen.", "J'ai retrouvé mon ami au parc.", ["ich", "habe", "meinen Freund", "im Park", "getroffen"], focus=("getroffen", PERF, "Habe + participe : Perfekt."), blank=("getroffen", "treffen", ["getrefft", "traf"]), alt=["Ich traf meinen Freund im Park."]),
                S("Sie traf ihren Bruder vor dem Kino.", "Elle retrouva son frère devant le cinéma.", ["sie", "traf", "ihren Bruder", "vor dem Kino"], focus=("traf", PRAET, "Traf : Präteritum de treffen."), blank=("traf", "treffen", ["treffte", "getroffen"]), alt=["Sie hat ihren Bruder vor dem Kino getroffen."]),
                S("Wir haben lange miteinander gesprochen.", "Nous avons longuement parlé ensemble.", ["wir", "haben", "lange", "miteinander", "gesprochen"], focus=("gesprochen", PERF, "Haben + participe : Perfekt."), blank=("gesprochen", "sprechen", ["gesprecht", "sprachen"]), alt=["Wir sprachen lange miteinander."]),
                S("Die beiden sprachen kein Wort.", "Aucun des deux ne dit un mot.", ["die beiden", "sprachen", "kein Wort"], focus=("sprachen", PRAET, "Sprachen : Präteritum de sprechen."), blank=("sprachen", "sprechen", ["sprechten", "sprichten"]), alt=["Die beiden haben kein Wort gesprochen."]),
                S("Danach sind wir zusammen essen gegangen.", "Ensuite, nous sommes allés manger ensemble.", ["danach", "sind", "wir", "zusammen", "essen", "gegangen"], ["Wir sind danach zusammen essen gegangen."], ("gegangen", PERF, "Sind + participe : Perfekt."), ("sind", HS, ["haben"]), END, ["Danach gingen wir zusammen essen.", "Wir gingen danach zusammen essen."]),
            ],
            {"prompt": "Quel temps ?", "options": [PERF, PRAET]},
        ),
    ],
}

# ---------------------------------------------------------------- Unit 6: the Plusquamperfekt
ALS = "quand : une fois, dans le passé"
WENN = "quand : chaque fois"
BEVOR = "avant que"
NACHDEM = "après que"

unit6 = {
    "title": "Le plus-que-parfait",
    "level": "B1",
    "hint": "Ce qui s'était passé avant un autre moment du passé, et les mots qui situent deux actions : als, wenn, bevor, nachdem.",
    "lessons": [
        L(
            "hatte ou war + participe : avant le passé",
            R(
                "Le plus-que-parfait (Plusquamperfekt) dit ce qui s'était passé avant un autre moment du passé.",
                [
                    "Il se forme comme le Perfekt, mais avec hatte ou war : Ich hatte gegessen, er war gegangen.",
                    "haben ou sein : même choix qu'au Perfekt.",
                    "On l'entend à l'oral comme on le lit à l'écrit.",
                    "Le participe reste à la fin.",
                ],
                [["Ich hatte schon gegessen.", "J'avais déjà mangé."], ["Der Zug war schon abgefahren.", "Le train était déjà parti."]],
            ),
            [
                S("Ich hatte schon gegessen.", "J'avais déjà mangé.", ["ich", "hatte", "schon", "gegessen"], focus=("hatte", PLUSQ, "Hatte + participe : plus-que-parfait."), blank=("hatte", HS, ["war"])),
                S("Der Zug war schon abgefahren.", "Le train était déjà parti.", ["der Zug", "war", "schon", "abgefahren"], focus=("war", PLUSQ, "War + participe : plus-que-parfait, avec sein comme fahren."), blank=("war", HS, ["hatte"])),
                S("Sie hatte ihren Schlüssel vergessen.", "Elle avait oublié sa clé.", ["sie", "hatte", "ihren Schlüssel", "vergessen"], focus=("hatte", PLUSQ, "Hatte + participe : plus-que-parfait."), blank=("vergessen", "vergessen", ["gevergessen", "vergaß"])),
                S("Wir waren noch nie in Rom gewesen.", "Nous n'étions encore jamais allés à Rome.", ["wir", "waren", "noch nie", "in Rom", "gewesen"], focus=("waren", PLUSQ, "Waren + gewesen : plus-que-parfait de sein."), blank=("waren", HS, ["hatten"])),
                S("Ich habe meinen Schlüssel vergessen.", "J'ai oublié ma clé.", ["ich", "habe", "meinen Schlüssel", "vergessen"], focus=("habe", PERF, "Habe + participe : c'est le Perfekt."), blank=("habe", HS, ["bin"])),
                S("Er hatte das Buch schon zweimal gelesen.", "Il avait déjà lu le livre deux fois.", ["er", "hatte", "das Buch", "schon", "zweimal", "gelesen"], focus=("hatte", PLUSQ, "Hatte + participe : plus-que-parfait."), blank=("gelesen", "lesen", ["las", "gelest"])),
                S("Als ich ankam, waren alle schon gegangen.", "Quand je suis arrivé, tout le monde était déjà parti.", ["als", "ich", "ankam", "waren", "alle", "schon", "gegangen"], ["Alle waren schon gegangen, als ich ankam."], ("ankam", PRAET, "Ankam : Präteritum de ankommen ; le départ des autres vient avant, au plus-que-parfait."), ("waren", HS, ["hatten"]), "Les deux sont corrects. Quand la subordonnée ouvre la phrase, la principale commence par son verbe : waren alle…"),
                S("Das Konzert hatte schon angefangen.", "Le concert avait déjà commencé.", ["das Konzert", "hatte", "schon", "angefangen"], focus=("hatte", PLUSQ, "Hatte + participe : plus-que-parfait."), blank=("hatte", HS, ["war"])),
            ],
            {"prompt": "Quel temps ?", "options": [PERF, PRAET, PLUSQ]},
        ),
        L(
            "nachdem : d'abord ceci, puis cela",
            R(
                "Après nachdem (après que), l'action est déjà finie : elle se met un temps « avant » la principale.",
                [
                    "Principale au passé → nachdem + plus-que-parfait : Nachdem er gegessen hatte, ging er schlafen.",
                    "Principale au présent → nachdem + Perfekt : Nachdem ich gefrühstückt habe, gehe ich zur Arbeit.",
                    "Le verbe conjugué part à la fin de la subordonnée : …gegessen hatte.",
                    "Si la subordonnée ouvre la phrase, la principale commence par son verbe : …, ging er schlafen.",
                ],
                [["Nachdem er gegessen hatte, ging er schlafen.", "Après avoir mangé, il est allé se coucher."], ["Nachdem ich gefrühstückt habe, gehe ich zur Arbeit.", "Après le petit-déjeuner, je vais au travail."]],
            ),
            [
                S("Nachdem er gegessen hatte, ging er schlafen.", "Après avoir mangé, il est allé se coucher.", ["nachdem", "er", "gegessen", "hatte", "ging", "er", "schlafen"], ["Er ging schlafen, nachdem er gegessen hatte."], ("hatte", PLUSQ, "La principale est au passé : nachdem prend le plus-que-parfait."), ("hatte", HS, ["war"]), "Les deux sont corrects. On commence par nachdem pour suivre l'ordre des actions.", ["Nachdem er gegessen hatte, ist er schlafen gegangen."]),
                S("Nachdem wir angekommen waren, riefen wir unsere Eltern an.", "Une fois arrivés, nous avons appelé nos parents.", ["nachdem", "wir", "angekommen", "waren", "riefen", "wir", "unsere Eltern", "an"], ["Wir riefen unsere Eltern an, nachdem wir angekommen waren."], ("waren", PLUSQ, "Ankommen prend sein : waren angekommen."), ("waren", HS, ["hatten"]), "Les deux sont corrects. On commence par nachdem pour suivre l'ordre des actions.", ["Nachdem wir angekommen waren, haben wir unsere Eltern angerufen."]),
                S("Nachdem sie die Prüfung bestanden hatte, feierte sie mit ihren Freunden.", "Après avoir réussi l'examen, elle a fait la fête avec ses amis.", ["nachdem", "sie", "die Prüfung", "bestanden", "hatte", "feierte", "sie", "mit ihren Freunden"], ["Sie feierte mit ihren Freunden, nachdem sie die Prüfung bestanden hatte."], ("feierte", PRAET, "La principale est au Präteritum : feierte."), ("hatte", HS, ["war"]), "Les deux sont corrects. On commence par nachdem pour suivre l'ordre des actions.", ["Nachdem sie die Prüfung bestanden hatte, hat sie mit ihren Freunden gefeiert."]),
                S("Nachdem ich gefrühstückt habe, gehe ich zur Arbeit.", "Après le petit-déjeuner, je vais au travail.", ["nachdem", "ich", "gefrühstückt", "habe", "gehe", "ich", "zur Arbeit"], ["Ich gehe zur Arbeit, nachdem ich gefrühstückt habe."], ("gehe", PRES, "La principale est au présent : nachdem prend le Perfekt."), ("habe", HS, ["hatte", "bin"]), "Les deux sont corrects. On commence par nachdem pour suivre l'ordre des actions."),
                S("Er rief mich an, nachdem er den Brief gelesen hatte.", "Il m'a appelé après avoir lu la lettre.", ["er", "rief", "mich", "an", "nachdem", "er", "den Brief", "gelesen", "hatte"], ["Nachdem er den Brief gelesen hatte, rief er mich an."], ("hatte", PLUSQ, "Hatte + gelesen : la lecture vient d'abord."), ("gelesen", "lesen", ["las", "gelest"]), "Les deux sont corrects ; avec nachdem en tête, la principale commence par son verbe : rief er mich an.", ["Er hat mich angerufen, nachdem er den Brief gelesen hatte."]),
                S("Nachdem die Gäste gegangen waren, räumten wir auf.", "Après le départ des invités, nous avons rangé.", ["nachdem", "die Gäste", "gegangen", "waren", "räumten", "wir", "auf"], ["Wir räumten auf, nachdem die Gäste gegangen waren."], ("räumten", PRAET, "La principale est au Präteritum : räumten… auf."), ("waren", HS, ["hatten"]), "Les deux sont corrects. On commence par nachdem pour suivre l'ordre des actions.", ["Nachdem die Gäste gegangen waren, haben wir aufgeräumt."]),
                S("Nachdem du gegessen hast, kannst du spielen.", "Quand tu auras mangé, tu pourras jouer.", ["nachdem", "du", "gegessen", "hast", "kannst", "du", "spielen"], ["Du kannst spielen, nachdem du gegessen hast."], ("hast", PERF, "La principale est au présent : nachdem prend le Perfekt."), ("hast", HS, ["hattest", "bist"]), "Les deux sont corrects. On commence par nachdem pour suivre l'ordre des actions."),
            ],
            {"prompt": "Quel temps ?", "options": [PRES, PERF, PRAET, PLUSQ]},
        ),
        L(
            "als, wenn, bevor, nachdem : situer deux actions",
            R(
                "Quatre mots pour situer deux actions l'une par rapport à l'autre. Tous envoient le verbe à la fin.",
                [
                    "als : quand, pour un seul moment du passé : Als ich ankam, regnete es.",
                    "wenn : quand, pour une habitude (chaque fois que), au passé comme au présent : Wenn wir Oma besuchten, backte sie einen Kuchen.",
                    "Au présent et au futur, wenn sert pour tout « quand », même pour une seule fois : Wenn ich ankomme, rufe ich an.",
                    "bevor : avant que ; pas de décalage, on garde le même temps que la principale : Bevor sie ging, schloss sie die Fenster.",
                    "nachdem : après que, avec le plus-que-parfait au passé.",
                ],
                [["Als ich ankam, regnete es.", "Quand je suis arrivé, il pleuvait."], ["Bevor sie ging, schloss sie alle Fenster.", "Avant de partir, elle ferma toutes les fenêtres."]],
            ),
            [
                S("Als ich ankam, regnete es.", "Quand je suis arrivé, il pleuvait.", ["als", "ich", "ankam", "regnete", "es"], ["Es regnete, als ich ankam."], ("als", ALS, "Un seul moment du passé : als."), ("als", CONJ, ["wenn", "nachdem"]), "Les deux sont corrects. Quand la subordonnée ouvre la phrase, la principale commence par son verbe : regnete es."),
                S("Wenn wir Oma besuchten, backte sie immer einen Kuchen.", "Chaque fois que nous rendions visite à mamie, elle faisait un gâteau.", ["wenn", "wir", "Oma", "besuchten", "backte", "sie", "immer", "einen Kuchen"], ["Sie backte immer einen Kuchen, wenn wir Oma besuchten."], ("wenn", WENN, "Une habitude du passé : wenn, pas als."), ("wenn", CONJ, ["als", "nachdem"]), "Les deux sont corrects. Quand la subordonnée ouvre la phrase, la principale commence par son verbe : backte sie…"),
                S("Bevor sie ging, schloss sie alle Fenster.", "Avant de partir, elle ferma toutes les fenêtres.", ["bevor", "sie", "ging", "schloss", "sie", "alle Fenster"], ["Sie schloss alle Fenster, bevor sie ging."], ("bevor", BEVOR, "Fermer les fenêtres vient avant de partir : bevor."), ("bevor", CONJ, ["nachdem", "seit"]), "Les deux sont corrects. Quand la subordonnée ouvre la phrase, la principale commence par son verbe : schloss sie…"),
                S("Nachdem er geduscht hatte, zog er sich an.", "Après s'être douché, il s'habilla.", ["nachdem", "er", "geduscht", "hatte", "zog", "er", "sich", "an"], ["Er zog sich an, nachdem er geduscht hatte."], ("nachdem", NACHDEM, "La douche vient d'abord : nachdem, avec le plus-que-parfait."), ("nachdem", CONJ, ["bevor", "seit"]), "Les deux sont corrects. On commence par nachdem pour suivre l'ordre des actions."),
                S("Als ich ein Kind war, wohnte ich in Lyon.", "Quand j'étais enfant, j'habitais à Lyon.", ["als", "ich", "ein Kind", "war", "wohnte", "ich", "in Lyon"], ["Ich wohnte in Lyon, als ich ein Kind war."], ("als", ALS, "Une seule période du passé, l'enfance : als."), ("als", CONJ, ["wenn", "nachdem"]), "Les deux sont corrects. Quand la subordonnée ouvre la phrase, la principale commence par son verbe : wohnte ich…", ["Als ich klein war, wohnte ich in Lyon.", "Als ich ein Kind war, habe ich in Lyon gewohnt."]),
                S("Ich war sehr glücklich, als ich die Nachricht bekam.", "J'ai été très heureux quand j'ai reçu la nouvelle.", ["ich", "war", "sehr glücklich", "als", "ich", "die Nachricht", "bekam"], ["Als ich die Nachricht bekam, war ich sehr glücklich."], ("als", ALS, "Un seul moment du passé : als."), ("als", CONJ, ["wenn", "nachdem"]), "Les deux sont corrects. Quand la subordonnée ouvre la phrase, la principale commence par son verbe : war ich…"),
                S("Bevor du gehst, mach bitte das Licht aus.", "Avant de partir, éteins la lumière, s'il te plaît.", ["bevor", "du", "gehst", "mach", "bitte", "das Licht", "aus"], ["Mach bitte das Licht aus, bevor du gehst."], ("bevor", BEVOR, "Éteindre vient avant de partir : bevor."), ("bevor", CONJ, ["nachdem", "als"]), "Les deux sont corrects ; à l'impératif, le verbe mach vient en tête de la principale."),
                S("Wenn es regnete, blieben wir immer zu Hause.", "Chaque fois qu'il pleuvait, nous restions à la maison.", ["wenn", "es", "regnete", "blieben", "wir", "immer", "zu Hause"], ["Wir blieben immer zu Hause, wenn es regnete."], ("wenn", WENN, "Chaque fois : wenn, même au passé."), ("wenn", CONJ, ["als", "nachdem"]), "Les deux sont corrects. Quand la subordonnée ouvre la phrase, la principale commence par son verbe : blieben wir…"),
            ],
            {"prompt": "Que dit le mot surligné ?", "options": [ALS, WENN, BEVOR, NACHDEM]},
        ),
    ],
}

# ---------------------------------------------------------------- Unit 7: Konjunktiv II
WISH = "un souhait"
POLITE = "une demande polie"
HYPO = "une hypothèse"
ADVICE = "un conseil"
FACT_PAST = "Präteritum : un fait passé"
K2 = "Konjunktiv II : imaginé ou poli"
REAL = "réel : wenn + indicatif"
IMAG = "imaginé : wenn + Konjunktiv II"
NOW_IM = "imaginé, maintenant : würde, wäre, hätte"
PAST_IM = "imaginé, dans le passé : hätte ou wäre + participe"
SUB_FIRST = "Les deux sont corrects. Quand la subordonnée ouvre la phrase, la principale commence par son verbe."

unit7 = {
    "title": "Le Konjunktiv II",
    "level": "B1",
    "hint": "Le conditionnel allemand : souhaiter, demander poliment, imaginer, regretter.",
    "lessons": [
        L(
            "würde + infinitif : ce qui se passerait",
            R(
                "Pour dire ce qu'on ferait (le conditionnel français), on utilise würde + infinitif.",
                [
                    "ich würde, du würdest, er würde, wir würden, ihr würdet, sie würden.",
                    "L'infinitif va à la fin : Ich würde gern nach Japan reisen.",
                    "Avec gern, c'est un souhait ; avec bitte, une demande polie ; avec an deiner Stelle, un conseil.",
                    "Attention à l'Umlaut : ich würde gehen (j'irais), mais ich wurde (Präteritum de werden : je devins).",
                ],
                [["Ich würde gern nach Japan reisen.", "J'aimerais bien voyager au Japon."], ["Würdest du mir bitte helfen?", "Tu pourrais m'aider, s'il te plaît ?"]],
            ),
            [
                S("Ich würde gern nach Japan reisen.", "J'aimerais bien voyager au Japon.", ["ich", "würde", "gern", "nach Japan", "reisen"], focus=("würde", WISH, "Würde + gern : un souhait."), blank=("würde", "werden", ["würdest", "wurde"])),
                S("Würdest du mir bitte helfen?", "Tu pourrais m'aider, s'il te plaît ?", ["würdest", "du", "mir", "bitte", "helfen"], focus=("würdest", POLITE, "Würdest du… bitte : une demande polie."), blank=("würdest", "werden", ["würde", "wurdest"]), alt=["Könntest du mir bitte helfen?"]),
                S("An deiner Stelle würde ich mehr schlafen.", "À ta place, je dormirais plus.", ["an deiner Stelle", "würde", "ich", "mehr", "schlafen"], ["Ich würde an deiner Stelle mehr schlafen."], ("würde", ADVICE, "An deiner Stelle : un conseil."), ("würde", "werden", ["würdest", "wird"]), SECOND),
                S("Wir würden gern am Meer wohnen.", "Nous aimerions bien habiter au bord de la mer.", ["wir", "würden", "gern", "am Meer", "wohnen"], focus=("würden", WISH, "Würden + gern : un souhait."), blank=("würden", "werden", ["würdet", "wurden"])),
                S("Ohne dich würde ich das nicht schaffen.", "Sans toi, je n'y arriverais pas.", ["ohne dich", "würde", "ich", "das", "nicht", "schaffen"], ["Ich würde das ohne dich nicht schaffen."], ("würde", HYPO, "Ohne dich : on imagine la situation sans toi."), ("würde", "werden", ["würdest", "wurde"]), SECOND),
                S("Würden Sie bitte das Fenster schließen?", "Pourriez-vous fermer la fenêtre, s'il vous plaît ?", ["würden", "Sie", "bitte", "das Fenster", "schließen"], focus=("würden", POLITE, "Würden Sie… bitte : très poli."), blank=("würden", "werden", ["würdet", "wurden"]), alt=["Könnten Sie bitte das Fenster schließen?"]),
                S("An deiner Stelle würde ich das nicht kaufen.", "À ta place, je ne l'achèterais pas.", ["an deiner Stelle", "würde", "ich", "das", "nicht", "kaufen"], ["Ich würde das an deiner Stelle nicht kaufen."], ("würde", ADVICE, "An deiner Stelle : un conseil."), ("würde", "werden", ["würdest", "wurde"]), SECOND),
                S("Mit mehr Zeit würden wir öfter kochen.", "Avec plus de temps, nous cuisinerions plus souvent.", ["mit mehr Zeit", "würden", "wir", "öfter", "kochen"], ["Wir würden mit mehr Zeit öfter kochen."], ("würden", HYPO, "Mit mehr Zeit : une situation imaginée."), ("würden", "werden", ["würdet", "wurden"]), SECOND),
            ],
            {"prompt": "Que dit la phrase ?", "options": [WISH, POLITE, HYPO, ADVICE]},
        ),
        L(
            "wäre, hätte, könnte : les formes courtes",
            R(
                "Pour sein, haben et les verbes de modalité, on n'utilise pas würde : ils ont leur propre forme.",
                [
                    "sein → wäre, haben → hätte : Das wäre schön. Ich hätte gern einen Kaffee.",
                    "können → könnte, müssen → müsste, dürfen → dürfte, mögen → möchte.",
                    "Ce sont les formes du Präteritum avec un Umlaut : war → wäre, hatte → hätte, konnte → könnte.",
                    "sollte et wollte n'ont pas d'Umlaut : c'est le sens qui dit si c'est un conseil ou un fait passé.",
                ],
                [["Das wäre wirklich schön.", "Ce serait vraiment bien."], ["Könntest du mich morgen abholen?", "Tu pourrais venir me chercher demain ?"]],
                [T(["", "Präteritum", "Konjunktiv II"], [["sein", "war", "wäre"], ["haben", "hatte", "hätte"], ["können", "konnte", "könnte"], ["müssen", "musste", "müsste"], ["dürfen", "durfte", "dürfte"], ["sollen", "sollte", "sollte"]])],
            ),
            [
                S("Das wäre wirklich schön.", "Ce serait vraiment bien.", ["das", "wäre", "wirklich", "schön"], focus=("wäre", K2, "Wäre : sein au Konjunktiv II, une chose imaginée."), blank=("wäre", "sein", ["ist", "war"])),
                S("Ich hätte gern einen Kaffee.", "Je voudrais un café.", ["ich", "hätte", "gern", "einen Kaffee"], focus=("hätte", K2, "Hätte gern : une commande polie."), blank=("hätte", "haben", ["habe", "hatte"]), alt=["Ich möchte einen Kaffee."]),
                S("Könntest du mich morgen abholen?", "Tu pourrais venir me chercher demain ?", ["könntest", "du", "mich", "morgen", "abholen"], focus=("könntest", K2, "Könntest : une demande polie."), blank=("könntest", "können", ["könntet", "konntest"])),
                S("Gestern konnte ich nicht kommen.", "Hier, je n'ai pas pu venir.", ["gestern", "konnte", "ich", "nicht", "kommen"], ["Ich konnte gestern nicht kommen."], ("konnte", FACT_PAST, "Konnte, sans Umlaut : un fait passé."), ("konnte", "können", ["kann", "könnte"]), SECOND),
                S("Du müsstest mehr Wasser trinken.", "Tu devrais boire plus d'eau.", ["du", "müsstest", "mehr Wasser", "trinken"], focus=("müsstest", K2, "Müsstest : un conseil."), blank=("müsstest", "müssen", ["müsstet", "musstest"]), alt=["Du solltest mehr Wasser trinken."]),
                S("Letztes Jahr hatten wir kein Auto.", "L'an dernier, nous n'avions pas de voiture.", ["letztes Jahr", "hatten", "wir", "kein Auto"], ["Wir hatten letztes Jahr kein Auto."], ("hatten", FACT_PAST, "Hatten, sans Umlaut : un fait passé."), ("hatten", "haben", ["haben", "hätten"]), SECOND),
                S("Dürfte ich kurz Ihr Telefon benutzen?", "Pourrais-je utiliser votre téléphone un instant ?", ["dürfte", "ich", "kurz", "Ihr Telefon", "benutzen"], focus=("dürfte", K2, "Dürfte ich… : une demande très polie."), blank=("dürfte", "dürfen", ["dürftest", "durfte"]), alt=["Könnte ich kurz Ihr Telefon benutzen?"]),
                S("Du solltest zum Arzt gehen.", "Tu devrais aller chez le médecin.", ["du", "solltest", "zum Arzt", "gehen"], focus=("solltest", K2, "Sollte n'a pas d'Umlaut ; ici, c'est un conseil, donc le Konjunktiv II."), blank=("solltest", "sollen", ["solltet", "sollest"])),
            ],
            {"prompt": "Präteritum ou Konjunktiv II ?", "options": [FACT_PAST, K2]},
        ),
        L(
            "Si… : wenn + Konjunktiv II",
            R(
                "Pour une hypothèse (si j'avais…, je ferais…), les deux parties sont au Konjunktiv II.",
                [
                    "Wenn ich Zeit hätte, würde ich dich besuchen.",
                    "Le français dit « si + imparfait, puis conditionnel » ; l'allemand met le Konjunktiv II des deux côtés.",
                    "Une vraie possibilité reste à l'indicatif : Wenn es morgen regnet, bleiben wir zu Hause.",
                    "Dans la subordonnée, le verbe va à la fin ; la principale qui suit commence par son verbe : …, würde ich dich besuchen.",
                ],
                [["Wenn ich Zeit hätte, würde ich dich besuchen.", "Si j'avais le temps, je te rendrais visite."], ["Wenn es morgen regnet, bleiben wir zu Hause.", "S'il pleut demain, nous restons à la maison."]],
            ),
            [
                S("Wenn ich Zeit hätte, würde ich dich besuchen.", "Si j'avais le temps, je te rendrais visite.", ["wenn", "ich", "Zeit", "hätte", "würde", "ich", "dich", "besuchen"], ["Ich würde dich besuchen, wenn ich Zeit hätte."], ("hätte", IMAG, "Je n'ai pas le temps : on imagine, donc hätte."), ("hätte", "haben", ["habe", "hatte"]), SUB_FIRST),
                S("Wenn ich Zeit habe, besuche ich dich.", "Quand j'ai le temps, je te rends visite.", ["wenn", "ich", "Zeit", "habe", "besuche", "ich", "dich"], ["Ich besuche dich, wenn ich Zeit habe."], ("habe", REAL, "Cela arrive vraiment : l'indicatif."), ("habe", "haben", ["hätte", "hat"]), SUB_FIRST),
                S("Wenn ich reich wäre, würde ich ein Haus am Meer kaufen.", "Si j'étais riche, j'achèterais une maison au bord de la mer.", ["wenn", "ich", "reich", "wäre", "würde", "ich", "ein Haus am Meer", "kaufen"], ["Ich würde ein Haus am Meer kaufen, wenn ich reich wäre."], ("wäre", IMAG, "Je ne suis pas riche : wäre."), ("wäre", "sein", ["bin", "war"]), SUB_FIRST),
                S("Wenn es morgen regnet, bleiben wir zu Hause.", "S'il pleut demain, nous restons à la maison.", ["wenn", "es", "morgen", "regnet", "bleiben", "wir", "zu Hause"], ["Wir bleiben zu Hause, wenn es morgen regnet."], ("regnet", REAL, "Une vraie possibilité : l'indicatif."), ("regnet", "regnen", ["regnete", "regnen"]), SUB_FIRST),
                S("Wenn du mehr üben würdest, könntest du besser spielen.", "Si tu t'entraînais plus, tu pourrais mieux jouer.", ["wenn", "du", "mehr", "üben", "würdest", "könntest", "du", "besser", "spielen"], ["Du könntest besser spielen, wenn du mehr üben würdest."], ("könntest", IMAG, "Tu ne t'entraînes pas assez : on imagine, donc könntest."), ("könntest", "können", ["kannst", "konntest"]), SUB_FIRST, ["Wenn du mehr üben würdest, würdest du besser spielen.", "Wenn du mehr übtest, könntest du besser spielen."]),
                S("Wenn ich du wäre, würde ich das Angebot annehmen.", "Si j'étais toi, j'accepterais l'offre.", ["wenn", "ich", "du", "wäre", "würde", "ich", "das Angebot", "annehmen"], ["Ich würde das Angebot annehmen, wenn ich du wäre."], ("wäre", IMAG, "Je ne suis pas toi : wäre."), ("wäre", "sein", ["bin", "bist"]), SUB_FIRST),
                S("Wenn der Bus kommt, steigen wir ein.", "Quand le bus arrive, nous montons.", ["wenn", "der Bus", "kommt", "steigen", "wir", "ein"], ["Wir steigen ein, wenn der Bus kommt."], ("kommt", REAL, "Le bus va vraiment arriver : l'indicatif."), ("kommt", "kommen", ["käme", "kam"]), SUB_FIRST),
                S("Ich wäre froh, wenn du mitkommen würdest.", "Je serais content si tu venais avec moi.", ["ich", "wäre", "froh", "wenn", "du", "mitkommen", "würdest"], ["Wenn du mitkommen würdest, wäre ich froh."], ("würdest", IMAG, "On imagine que tu viennes : une invitation polie, pas un fait."), ("wäre", "sein", ["bin", "war"]), SUB_FIRST),
            ],
            {"prompt": "Fait réel ou situation imaginée ?", "options": [REAL, IMAG]},
        ),
        L(
            "Le passé imaginé : hätte… gemacht, wäre… gekommen",
            R(
                "Pour dire ce qui aurait pu se passer, on utilise hätte ou wäre + participe.",
                [
                    "Ich hätte dich angerufen : je t'aurais appelé.",
                    "haben ou sein : même choix qu'au Perfekt : Er wäre gekommen.",
                    "Wenn ich das gewusst hätte, wäre ich gekommen : si j'avais su, je serais venu.",
                    "Avec un verbe de modalité, deux infinitifs à la fin : Du hättest mir das sagen können (tu aurais pu me le dire).",
                ],
                [["Ich hätte dich angerufen.", "Je t'aurais appelé."], ["Wenn ich das gewusst hätte, wäre ich gekommen.", "Si j'avais su, je serais venu."]],
            ),
            [
                S("Ich hätte dich angerufen.", "Je t'aurais appelé.", ["ich", "hätte", "dich", "angerufen"], focus=("angerufen", PAST_IM, "Hätte + participe : ce qui aurait pu se passer."), blank=("hätte", HS, ["wäre"])),
                S("Wenn ich das gewusst hätte, wäre ich gekommen.", "Si j'avais su, je serais venu.", ["wenn", "ich", "das", "gewusst", "hätte", "wäre", "ich", "gekommen"], ["Ich wäre gekommen, wenn ich das gewusst hätte."], ("gekommen", PAST_IM, "Wäre + gekommen : je ne suis pas venu, on l'imagine après coup."), ("gewusst", "wissen", ["gewisst", "wusste"]), SUB_FIRST),
                S("Wir wären fast zu spät gekommen.", "Nous avons failli arriver en retard.", ["wir", "wären", "fast", "zu spät", "gekommen"], focus=("gekommen", PAST_IM, "Wären + participe : cela a failli arriver."), blank=("wären", HS, ["hätten"])),
                S("Ich würde jetzt gern schlafen.", "J'aimerais bien dormir maintenant.", ["ich", "würde", "jetzt", "gern", "schlafen"], focus=("würde", NOW_IM, "Jetzt : un souhait pour maintenant."), blank=("würde", "werden", ["würdest", "wurde"])),
                S("Du hättest mir das sagen können.", "Tu aurais pu me le dire.", ["du", "hättest", "mir", "das", "sagen", "können"], focus=("hättest", PAST_IM, "Hättest + deux infinitifs : sagen können."), blank=("hättest", "haben", ["hättet", "wärest"])),
                S("Ohne deine Hilfe hätte ich es nicht geschafft.", "Sans ton aide, je n'y serais pas arrivé.", ["ohne deine Hilfe", "hätte", "ich", "es", "nicht", "geschafft"], ["Ich hätte es ohne deine Hilfe nicht geschafft."], ("geschafft", PAST_IM, "Hätte + participe : le passé imaginé. Schaffen (réussir) donne geschafft ; geschaffen vient de schaffen au sens de « créer »."), ("geschafft", "schaffen", ["schaffte", "geschaffen"]), SECOND),
                S("Wenn ich mehr Geld hätte, würde ich reisen.", "Si j'avais plus d'argent, je voyagerais.", ["wenn", "ich", "mehr Geld", "hätte", "würde", "ich", "reisen"], ["Ich würde reisen, wenn ich mehr Geld hätte."], ("hätte", NOW_IM, "Hätte seul, sans participe : imaginé, maintenant."), ("hätte", "haben", ["habe", "hatte"]), SUB_FIRST),
                S("Sie wäre gern länger geblieben.", "Elle serait bien restée plus longtemps.", ["sie", "wäre", "gern", "länger", "geblieben"], focus=("geblieben", PAST_IM, "Wäre + participe : un regret sur le passé."), blank=("wäre", HS, ["hätte"])),
            ],
            {"prompt": "Imaginé maintenant, ou dans le passé ?", "options": [NOW_IM, PAST_IM]},
        ),
    ],
}

# ---------------------------------------------------------------- Unit 8: Konjunktiv I
FACT = "un fait : la phrase l'affirme"
REPORT = "des paroles rapportées : Konjunktiv I"
K1_OWN = "Konjunktiv I : sa forme se distingue du présent"
K2_SUB = "Konjunktiv II : le Konjunktiv I ressemblerait au présent"
REP_NOW = "au moment dont on parle"
REP_PAST = "avant : habe ou sei + participe"

unit8 = {
    "title": "Le Konjunktiv I",
    "level": "B2",
    "hint": "Le discours rapporté de la presse : er sagte, er sei zufrieden.",
    "lessons": [
        L(
            "Le discours rapporté : er sagt, er sei…",
            R(
                "Dans la presse, on rapporte les paroles de quelqu'un au Konjunktiv I : la phrase montre qu'on cite, sans prendre parti.",
                [
                    "sein : er sei, sie seien ; haben : er habe ; les autres verbes : radical + e : er komme, er wisse, er könne.",
                    "On le rencontre surtout à la 3e personne : Der Minister sagte, er sei zufrieden.",
                    "On peut garder ou enlever dass : Er sagt, er sei krank. / Er sagt, dass er krank sei.",
                    "À l'oral, on dit plutôt l'indicatif : Er sagt, er ist krank. Ici, on s'entraîne au registre de la presse, avec le Konjunktiv I.",
                ],
                [["Der Minister sagte, er sei zufrieden.", "Le ministre a déclaré qu'il était satisfait."], ["Er sagt, er komme morgen.", "Il dit qu'il viendra demain."]],
                [T(["", "sein", "haben", "kommen", "können"], [["er / sie / es", "sei", "habe", "komme", "könne"], ["sie (pluriel)", "seien", "(hätten)", "(kämen)", "(könnten)"]])],
            ),
            [
                S("Der Minister sagte, er sei zufrieden.", "Le ministre a déclaré qu'il était satisfait.", ["der Minister", "sagte", "er", "sei", "zufrieden"], focus=("sei", REPORT, "Sei : on rapporte ce que dit le ministre."), blank=("sei", "sein", ["seid", "sein"]), alt=["Der Minister sagte, dass er zufrieden sei.", "Der Minister sagte, er ist zufrieden."]),
                S("Die Polizei teilte mit, der Fahrer habe keinen Führerschein.", "La police a indiqué que le conducteur n'avait pas de permis.", ["die Polizei", "teilte", "mit", "der Fahrer", "habe", "keinen Führerschein"], focus=("habe", REPORT, "Habe : on rapporte ce que dit la police."), blank=("habe", "haben", ["haben", "habt"]), alt=["Die Polizei teilte mit, dass der Fahrer keinen Führerschein habe."]),
                S("Sie behauptet, sie wisse nichts davon.", "Elle affirme qu'elle n'en sait rien.", ["sie", "behauptet", "sie", "wisse", "nichts davon"], focus=("wisse", REPORT, "Wisse : c'est elle qui l'affirme, pas le journaliste."), blank=("wisse", "wissen", ["wisst", "wissen"]), alt=["Sie behauptet, dass sie nichts davon wisse.", "Sie behauptet, sie weiß nichts davon."]),
                S("Der Sprecher sagte, das Problem sei gelöst.", "Le porte-parole a dit que le problème était réglé.", ["der Sprecher", "sagte", "das Problem", "sei", "gelöst"], focus=("sei", REPORT, "Sei : on rapporte les paroles du porte-parole."), blank=("sei", "sein", ["seid", "sein"]), alt=["Der Sprecher sagte, dass das Problem gelöst sei."]),
                S("Der Präsident ist zufrieden.", "Le président est satisfait.", ["der Präsident", "ist", "zufrieden"], focus=("ist", FACT, "Ist : la phrase l'affirme elle-même."), blank=("ist", "sein", ["sei", "seie"])),
                S("Der Trainer erklärte, die Mannschaft könne noch gewinnen.", "L'entraîneur a expliqué que l'équipe pouvait encore gagner.", ["der Trainer", "erklärte", "die Mannschaft", "könne", "noch", "gewinnen"], focus=("könne", REPORT, "Könne : les paroles de l'entraîneur."), blank=("könne", "können", ["könnt", "können"]), alt=["Der Trainer erklärte, dass die Mannschaft noch gewinnen könne."]),
                S("Er sagt, er komme morgen.", "Il dit qu'il viendra demain.", ["er", "sagt", "er", "komme", "morgen"], focus=("komme", REPORT, "Komme : on rapporte ce qu'il dit."), blank=("komme", "kommen", ["kommst", "kommen"]), alt=["Er sagt, dass er morgen komme.", "Er sagt, er kommt morgen."]),
            ],
            {"prompt": "Que montre le verbe surligné ?", "options": [FACT, REPORT]},
        ),
        L(
            "Quand le Konjunktiv I ressemble au présent",
            R(
                "Avec ich, wir et sie (pluriel), le Konjunktiv I a souvent la même forme que le présent : on le remplace alors par le Konjunktiv II.",
                [
                    "sie haben (présent) = sie haben (Konjunktiv I) → on dit sie hätten : Sie sagten, sie hätten keine Zeit.",
                    "sie kommen = sie kommen → sie kämen, ou sie würden kommen.",
                    "sein reste toujours distinct : sie seien.",
                    "À la 3e personne du singulier, le Konjunktiv I se distingue presque toujours : er habe, er komme, sie arbeite.",
                ],
                [["Die Eltern sagten, sie hätten keine Zeit.", "Les parents ont dit qu'ils n'avaient pas le temps."], ["Die Schüler erklärten, sie seien müde.", "Les élèves ont expliqué qu'ils étaient fatigués."]],
            ),
            [
                S("Die Eltern sagten, sie hätten keine Zeit.", "Les parents ont dit qu'ils n'avaient pas le temps.", ["die Eltern", "sagten", "sie", "hätten", "keine Zeit"], focus=("hätten", K2_SUB, "Sie haben serait comme le présent : on prend hätten."), blank=("hätten", "haben", ["haben", "hatten"]), alt=["Die Eltern sagten, dass sie keine Zeit hätten."]),
                S("Die Schüler erklärten, sie seien müde.", "Les élèves ont expliqué qu'ils étaient fatigués.", ["die Schüler", "erklärten", "sie", "seien", "müde"], focus=("seien", K1_OWN, "Sein garde toujours sa forme : sie seien."), blank=("seien", "sein", ["seid", "sein"]), alt=["Die Schüler erklärten, dass sie müde seien."]),
                S("Die Firma teilte mit, sie habe Probleme.", "L'entreprise a indiqué qu'elle avait des problèmes.", ["die Firma", "teilte", "mit", "sie", "habe", "Probleme"], focus=("habe", K1_OWN, "Sie (l'entreprise) habe : distinct de sie hat."), blank=("habe", "haben", ["haben", "habt"]), alt=["Die Firma teilte mit, dass sie Probleme habe."]),
                S("Die Nachbarn meinten, sie kämen später.", "Les voisins ont dit qu'ils viendraient plus tard.", ["die Nachbarn", "meinten", "sie", "kämen", "später"], focus=("kämen", K2_SUB, "Sie kommen serait comme le présent : on prend kämen."), blank=("kämen", "kommen", ["kommen", "kamen"]), alt=["Die Nachbarn meinten, sie würden später kommen.", "Die Nachbarn meinten, dass sie später kämen."]),
                S("Der Arzt sagte, ich müsse mehr schlafen.", "Le médecin a dit que je devais dormir plus.", ["der Arzt", "sagte", "ich", "müsse", "mehr", "schlafen"], focus=("müsse", K1_OWN, "Ich müsse se distingue de ich muss."), blank=("müsse", "müssen", ["müssen", "müsst"]), alt=["Der Arzt sagte, dass ich mehr schlafen müsse."]),
                S("Die Kinder sagten, sie wüssten den Weg.", "Les enfants ont dit qu'ils connaissaient le chemin.", ["die Kinder", "sagten", "sie", "wüssten", "den Weg"], focus=("wüssten", K2_SUB, "Sie wissen serait comme le présent : on prend wüssten."), blank=("wüssten", "wissen", ["wissen", "wussten"]), alt=["Die Kinder sagten, dass sie den Weg wüssten."]),
                S("Sie sagt, sie arbeite heute zu Hause.", "Elle dit qu'elle travaille à la maison aujourd'hui.", ["sie", "sagt", "sie", "arbeite", "heute", "zu Hause"], focus=("arbeite", K1_OWN, "Sie arbeite se distingue de sie arbeitet."), blank=("arbeite", "arbeiten", ["arbeiten", "arbeitest"]), alt=["Sie sagt, dass sie heute zu Hause arbeite.", "Sie sagt, sie arbeitet heute zu Hause."]),
            ],
            {"prompt": "Pourquoi cette forme ?", "options": [K1_OWN, K2_SUB]},
        ),
        L(
            "Le passé rapporté : er habe… gesagt, sie sei… gegangen",
            R(
                "Pour rapporter un fait passé, on met habe ou sei avec le participe.",
                [
                    "Er sagte, er habe den Brief nicht gelesen.",
                    "Avec sein : Sie erklärte, sie sei nach Berlin gefahren.",
                    "haben ou sein : même choix qu'au Perfekt.",
                    "Au pluriel, hätten remplace haben : Sie sagten, sie hätten nichts gesehen.",
                ],
                [["Er sagte, er habe den Brief nicht gelesen.", "Il a dit qu'il n'avait pas lu la lettre."], ["Sie erklärte, sie sei nach Berlin gefahren.", "Elle a expliqué qu'elle était allée à Berlin."]],
            ),
            [
                S("Er sagte, er habe den Brief nicht gelesen.", "Il a dit qu'il n'avait pas lu la lettre.", ["er", "sagte", "er", "habe", "den Brief", "nicht", "gelesen"], focus=("gelesen", REP_PAST, "Habe + gelesen : la lecture (ou non) vient avant ce qu'il dit."), blank=("habe", HS, ["sei"]), alt=["Er sagte, dass er den Brief nicht gelesen habe."]),
                S("Sie erklärte, sie sei nach Berlin gefahren.", "Elle a expliqué qu'elle était allée à Berlin.", ["sie", "erklärte", "sie", "sei", "nach Berlin", "gefahren"], focus=("gefahren", REP_PAST, "Sei + gefahren : fahren prend sein."), blank=("sei", HS, ["habe"]), alt=["Sie erklärte, dass sie nach Berlin gefahren sei."]),
                S("Die Zeugen sagten, sie hätten nichts gesehen.", "Les témoins ont déclaré n'avoir rien vu.", ["die Zeugen", "sagten", "sie", "hätten", "nichts", "gesehen"], focus=("gesehen", REP_PAST, "Hätten + gesehen : ce qu'ils ont vu vient avant leur déclaration ; au pluriel, hätten remplace haben."), blank=("hätten", HS, ["wären", "seien"]), alt=["Die Zeugen sagten, dass sie nichts gesehen hätten."]),
                S("Der Minister sagte, er sei sehr optimistisch.", "Le ministre a dit qu'il était très optimiste.", ["der Minister", "sagte", "er", "sei", "sehr optimistisch"], focus=("sei", REP_NOW, "Sei seul : c'est son état au moment où il parle."), blank=("sei", "sein", ["seid", "sein"]), alt=["Der Minister sagte, dass er sehr optimistisch sei."]),
                S("Der Dieb behauptete, er sei die ganze Nacht zu Hause gewesen.", "Le voleur a affirmé qu'il était resté chez lui toute la nuit.", ["der Dieb", "behauptete", "er", "sei", "die ganze Nacht", "zu Hause", "gewesen"], focus=("gewesen", REP_PAST, "Sei + gewesen : la nuit vient avant ce qu'il affirme."), blank=("sei", HS, ["habe"]), alt=["Der Dieb behauptete, dass er die ganze Nacht zu Hause gewesen sei."]),
                S("Die Firma erklärte, sie habe keine Fehler gemacht.", "L'entreprise a déclaré n'avoir commis aucune erreur.", ["die Firma", "erklärte", "sie", "habe", "keine Fehler", "gemacht"], focus=("gemacht", REP_PAST, "Habe + gemacht : les erreurs viennent avant la déclaration."), blank=("habe", HS, ["sei"]), alt=["Die Firma erklärte, dass sie keine Fehler gemacht habe."]),
                S("Sie sagt, sie habe heute keine Zeit.", "Elle dit qu'elle n'a pas le temps aujourd'hui.", ["sie", "sagt", "sie", "habe", "heute", "keine Zeit"], focus=("habe", REP_NOW, "Habe seul : c'est aujourd'hui."), blank=("habe", "haben", ["haben", "habt"]), alt=["Sie sagt, dass sie heute keine Zeit habe.", "Sie sagt, sie hat heute keine Zeit."]),
            ],
            {"prompt": "Ce qui est rapporté se passe…", "options": [REP_NOW, REP_PAST]},
        ),
    ],
}

# ---------------------------------------------------------------- Unit 9: mixed stories
FUT_PRES = "présent à sens futur"
FUT_WERDEN = "futur avec werden"
K2_WISH = "Konjunktiv II : un souhait ou une hypothèse"
K1 = "Konjunktiv I : des paroles rapportées"

unit9 = {
    "title": "Récits mélangés",
    "level": "B2",
    "hint": "Tous les temps ensemble, dans des récits : choisir le bon temps selon le moment et selon qui parle.",
    "lessons": [
        L(
            "Raconter son week-end",
            R(
                "À l'oral, on mélange le Perfekt, le Präteritum de sein, haben et des modaux, et le présent.",
                [
                    "Ce qu'on a fait : Perfekt : Wir sind geschwommen.",
                    "Comment c'était, ce qu'on avait, ce qu'on devait : war, hatte, musste.",
                    "Ce qui est vrai maintenant, ou demain : le présent.",
                ],
                [["Am Samstag war ich mit Freunden am See.", "Samedi, j'étais au lac avec des amis."], ["Jetzt habe ich einen Sonnenbrand.", "Maintenant, j'ai un coup de soleil."]],
            ),
            [
                S("Am Samstag war ich mit Freunden am See.", "Samedi, j'étais au lac avec des amis.", ["am Samstag", "war", "ich", "mit Freunden", "am See"], ["Ich war am Samstag mit Freunden am See."], ("war", PRAET, "Sein : Präteritum, même à l'oral."), ("war", "sein", ["bin", "ist"]), SECOND, ["Am Samstag bin ich mit Freunden am See gewesen."]),
                S("Wir sind lange geschwommen und haben gegrillt.", "Nous avons nagé longtemps et fait un barbecue.", ["wir", "sind", "lange", "geschwommen", "und", "haben", "gegrillt"], focus=("geschwommen", PERF, "Ce qu'on a fait : Perfekt."), blank=("geschwommen", "schwimmen", ["geschwimmt", "schwammen"])),
                S("Leider hatte ich keine Sonnencreme dabei.", "Malheureusement, je n'avais pas de crème solaire sur moi.", ["leider", "hatte", "ich", "keine Sonnencreme", "dabei"], ["Ich hatte leider keine Sonnencreme dabei."], ("hatte", PRAET, "Haben : Präteritum, même à l'oral."), ("hatte", "haben", ["hattest", "hat"]), SECOND),
                S("Jetzt habe ich einen Sonnenbrand.", "Maintenant, j'ai un coup de soleil.", ["jetzt", "habe", "ich", "einen Sonnenbrand"], ["Ich habe jetzt einen Sonnenbrand."], ("habe", PRES, "Jetzt : le présent."), ("habe", "haben", ["hatte", "hat"]), SECOND),
                S("Am Sonntag habe ich nur geschlafen.", "Dimanche, je n'ai fait que dormir.", ["am Sonntag", "habe", "ich", "nur", "geschlafen"], ["Ich habe am Sonntag nur geschlafen."], ("geschlafen", PERF, "Ce qu'on a fait : Perfekt."), ("geschlafen", "schlafen", ["geschlaft", "schlief"]), END),
                S("Am Abend musste ich noch meine Tasche packen.", "Le soir, j'ai encore dû faire mon sac.", ["am Abend", "musste", "ich", "noch", "meine Tasche", "packen"], ["Ich musste am Abend noch meine Tasche packen."], ("musste", PRAET, "Un verbe de modalité : Präteritum, même à l'oral."), ("musste", "müssen", ["musst", "müsst"]), SECOND),
                S("Morgen fange ich wieder mit der Arbeit an.", "Demain, je reprends le travail.", ["morgen", "fange", "ich", "wieder", "mit der Arbeit", "an"], ["Ich fange morgen wieder mit der Arbeit an."], ("fange", PRES, "Morgen + présent : le futur proche."), ("fange", "anfangen", ["fängt", "fing"]), "Les deux sont corrects ; la particule « an » reste à la fin.", alt=["Morgen werde ich wieder mit der Arbeit anfangen."]),
            ],
            TENSE3,
        ),
        L(
            "Un conte",
            R(
                "Un conte se raconte au Präteritum ; ce qui s'était passé avant se met au plus-que-parfait.",
                [
                    "Le fil du récit : Präteritum : Eines Tages ging es zu seiner Großmutter.",
                    "Ce qui était arrivé avant : plus-que-parfait : Die Großmutter war krank geworden.",
                    "Les deux se mêlent souvent dans une même phrase, avec als ou nachdem.",
                ],
                [["Eines Tages ging es zu seiner Großmutter.", "Un jour, elle alla chez sa grand-mère."], ["Die Großmutter war krank geworden.", "La grand-mère était tombée malade."]],
            ),
            [
                S("Es war einmal ein Mädchen, das im Wald wohnte.", "Il était une fois une petite fille qui habitait dans la forêt.", ["es", "war", "einmal", "ein Mädchen", "das", "im Wald", "wohnte"], focus=("wohnte", PRAET, "Le fil du récit : Präteritum."), blank=("wohnte", "wohnen", ["wohnt", "gewohnt"])),
                S("Eines Tages ging es zu seiner Großmutter.", "Un jour, elle alla chez sa grand-mère.", ["eines Tages", "ging", "es", "zu seiner Großmutter"], ["Es ging eines Tages zu seiner Großmutter."], ("ging", PRAET, "Le fil du récit : Präteritum. Es, car das Mädchen est neutre."), ("ging", "gehen", ["geht", "gehte"]), SECOND, alt=["Eines Tages ging sie zu ihrer Großmutter.", "Sie ging eines Tages zu ihrer Großmutter."]),
                S("Die Großmutter war krank geworden.", "La grand-mère était tombée malade.", ["die Großmutter", "war", "krank", "geworden"], focus=("geworden", PLUSQ, "War + participe : arrivé avant le récit."), blank=("war", HS, ["hatte"])),
                S("Im Wald traf das Mädchen einen Wolf.", "Dans la forêt, la petite fille rencontra un loup.", ["im Wald", "traf", "das Mädchen", "einen Wolf"], ["Das Mädchen traf im Wald einen Wolf."], ("traf", PRAET, "Le fil du récit : Präteritum."), ("traf", "treffen", ["trifft", "treffte"]), SECOND),
                S("Der Wolf hatte seit Tagen nichts gegessen.", "Le loup n'avait rien mangé depuis des jours.", ["der Wolf", "hatte", "seit Tagen", "nichts", "gegessen"], focus=("gegessen", PLUSQ, "Hatte + participe : avant le récit."), blank=("hatte", HS, ["war"])),
                S("Als das Mädchen ankam, lag der Wolf schon im Bett.", "Quand la petite fille arriva, le loup était déjà au lit.", ["als", "das Mädchen", "ankam", "lag", "der Wolf", "schon", "im Bett"], ["Der Wolf lag schon im Bett, als das Mädchen ankam."], ("lag", PRAET, "Liegen → lag : Präteritum."), ("lag", "liegen", ["liegte", "liegt"]), SUB_FIRST),
                S("Nachdem der Jäger den Wolf gefunden hatte, befreite er die Großmutter.", "Après avoir trouvé le loup, le chasseur libéra la grand-mère.", ["nachdem", "der Jäger", "den Wolf", "gefunden", "hatte", "befreite", "er", "die Großmutter"], focus=("befreite", PRAET, "La suite du récit : Präteritum ; ce qui vient avant, au plus-que-parfait."), blank=("hatte", HS, ["war"])),
            ],
            {"prompt": "Quel temps ?", "options": [PRAET, PLUSQ]},
        ),
        L(
            "Projets et souhaits",
            R(
                "Pour parler de l'avenir, on choisit entre trois formes, selon qu'on est sûr, qu'on promet ou qu'on imagine.",
                [
                    "Un projet décidé : le présent et un mot de temps : Nächstes Jahr mache ich mein Abitur.",
                    "Une promesse, une décision ferme, une prévision : werden : Ich werde jeden Monat etwas sparen.",
                    "Un souhait ou une hypothèse : würde, wäre, hätte : Ich würde gern im Ausland leben.",
                ],
                [["Nächstes Jahr mache ich mein Abitur.", "L'année prochaine, je passe le bac."], ["Danach würde ich gern ein Jahr im Ausland verbringen.", "Ensuite, j'aimerais bien passer un an à l'étranger."]],
            ),
            [
                S("Nächstes Jahr mache ich mein Abitur.", "L'année prochaine, je passe le bac.", ["nächstes Jahr", "mache", "ich", "mein Abitur"], ["Ich mache nächstes Jahr mein Abitur."], ("mache", FUT_PRES, "Nächstes Jahr : un projet décidé, le présent suffit."), ("mache", "machen", ["machte", "macht"]), SECOND, ["Nächstes Jahr werde ich mein Abitur machen."]),
                S("Danach würde ich gern ein Jahr im Ausland verbringen.", "Ensuite, j'aimerais bien passer un an à l'étranger.", ["danach", "würde", "ich", "gern", "ein Jahr", "im Ausland", "verbringen"], ["Ich würde danach gern ein Jahr im Ausland verbringen."], ("würde", K2_WISH, "Würde gern : un souhait."), ("würde", "werden", ["würdest", "wurde"]), SECOND),
                S("Mein Vater wird mir sicher helfen.", "Mon père m'aidera sûrement.", ["mein Vater", "wird", "mir", "sicher", "helfen"], focus=("wird", FUT_WERDEN, "Sicher : une prévision, avec werden."), blank=("wird", "werden", ["werdet", "wirst"]), alt=["Mein Vater hilft mir sicher."]),
                S("Wenn ich genug Geld hätte, würde ich nach Kanada gehen.", "Si j'avais assez d'argent, j'irais au Canada.", ["wenn", "ich", "genug Geld", "hätte", "würde", "ich", "nach Kanada", "gehen"], ["Ich würde nach Kanada gehen, wenn ich genug Geld hätte."], ("hätte", K2_WISH, "Une hypothèse : hätte et würde."), ("hätte", "haben", ["habe", "hatte"]), SUB_FIRST),
                S("Diesen Sommer arbeite ich in einem Café.", "Cet été, je travaille dans un café.", ["diesen Sommer", "arbeite", "ich", "in einem Café"], ["Ich arbeite diesen Sommer in einem Café."], ("arbeite", FUT_PRES, "Diesen Sommer : l'été qui vient, au présent."), ("arbeite", "arbeiten", ["arbeitete", "arbeitet"]), SECOND, ["Diesen Sommer werde ich in einem Café arbeiten."]),
                S("Ich werde jeden Monat etwas sparen.", "Je vais mettre un peu d'argent de côté chaque mois.", ["ich", "werde", "jeden Monat", "etwas", "sparen"], focus=("werde", FUT_WERDEN, "Une décision ferme : werden."), blank=("werde", "werden", ["würde", "wird"])),
                S("Es wäre toll, wenn du mitkommen könntest.", "Ce serait génial si tu pouvais venir.", ["es", "wäre", "toll", "wenn", "du", "mitkommen", "könntest"], focus=("könntest", K2_WISH, "Un souhait : wäre et könntest."), blank=("wäre", "sein", ["ist", "war"])),
            ],
            {"prompt": "Quelle forme pour parler de l'avenir ?", "options": [FUT_PRES, FUT_WERDEN, K2_WISH]},
        ),
        L(
            "Un article de journal",
            R(
                "Un article raconte au Präteritum, recule dans le temps avec le plus-que-parfait, et rapporte les paroles au Konjunktiv I.",
                [
                    "Les faits : Präteritum : Am Montag brannte in Köln eine Lagerhalle.",
                    "Ce qui s'était passé avant : plus-que-parfait : Das Feuer hatte in der Nacht begonnen.",
                    "Ce que disent les témoins ou la police : Konjunktiv I : Ein Sprecher sagte, niemand sei verletzt.",
                    "Le résultat qui compte aujourd'hui : souvent le Perfekt : Die Feuerwehr hat den Brand gelöscht.",
                ],
                [["Am Montag brannte in Köln eine Lagerhalle.", "Lundi, un entrepôt a brûlé à Cologne."], ["Ein Sprecher sagte, niemand sei verletzt.", "Un porte-parole a déclaré que personne n'était blessé."]],
            ),
            [
                S("Am Montag brannte in Köln eine Lagerhalle.", "Lundi, un entrepôt a brûlé à Cologne.", ["am Montag", "brannte", "in Köln", "eine Lagerhalle"], ["In Köln brannte am Montag eine Lagerhalle."], ("brannte", PRAET, "Les faits : Präteritum."), ("brannte", "brennen", ["brennte", "brannt"]), "Les deux sont corrects : on met en tête le moment ou le lieu ; le verbe reste en 2e position."),
                S("Die Feuerwehr war schnell vor Ort.", "Les pompiers étaient rapidement sur place.", ["die Feuerwehr", "war", "schnell", "vor Ort"], focus=("war", PRAET, "Les faits : Präteritum."), blank=("war", "sein", ["warst", "waren"])),
                S("Ein Sprecher sagte, niemand sei verletzt.", "Un porte-parole a déclaré que personne n'était blessé.", ["ein Sprecher", "sagte", "niemand", "sei", "verletzt"], focus=("sei", K1, "Les paroles du porte-parole : Konjunktiv I."), blank=("sei", "sein", ["seid", "sein"]), alt=["Ein Sprecher sagte, dass niemand verletzt sei."]),
                S("Das Feuer hatte in der Nacht begonnen.", "Le feu avait commencé dans la nuit.", ["das Feuer", "hatte", "in der Nacht", "begonnen"], focus=("begonnen", PLUSQ, "Hatte + participe : avant les faits racontés."), blank=("hatte", HS, ["war"])),
                S("Die Polizei vermutet, ein Kabel sei die Ursache.", "La police pense qu'un câble est à l'origine de l'incendie.", ["die Polizei", "vermutet", "ein Kabel", "sei", "die Ursache"], focus=("sei", K1, "Ce que pense la police : Konjunktiv I."), blank=("sei", "sein", ["seid", "sein"]), alt=["Die Polizei vermutet, dass ein Kabel die Ursache sei."]),
                S("Ein Anwohner erzählte, er habe laute Geräusche gehört.", "Un riverain a raconté qu'il avait entendu de grands bruits.", ["ein Anwohner", "erzählte", "er", "habe", "laute Geräusche", "gehört"], focus=("habe", K1, "Les paroles du riverain : Konjunktiv I, au passé."), blank=("gehört", "hören", ["hörte", "gehörte"]), alt=["Ein Anwohner erzählte, dass er laute Geräusche gehört habe."]),
                S("Die Feuerwehr hat den Brand inzwischen gelöscht.", "Les pompiers ont entre-temps éteint l'incendie.", ["die Feuerwehr", "hat", "den Brand", "inzwischen", "gelöscht"], focus=("gelöscht", PERF, "Le résultat qui compte aujourd'hui : Perfekt."), blank=("gelöscht", "löschen", ["löschte", "gelöschen"])),
            ],
            {"prompt": "Quel temps, ou quel mode ?", "options": [PERF, PRAET, PLUSQ, K1]},
        ),
    ],
}

TRACK = make_track(
    "de-temps",
    "Les temps",
    "Le présent des verbes forts, le Perfekt, le futur, le Präteritum, le plus-que-parfait et les Konjunktiv, dans des phrases.",
    [unit1, unit2, unit3, unit4, unit5, unit6, unit7, unit8, unit9],
)
