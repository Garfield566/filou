import type { GrammarLesson, Unit } from '../types';
import { choose, complete, dialogue, grammar, line, order, q, s, spot, transform, vocab, w } from './build';

const NEGATIVE = 'Mets à la forme négative';
const QUESTION = 'Pose la question';
const PERFEKT = 'Mets au Perfekt';

export const germanGrammar: Record<string, GrammarLesson[]> = {
  'de-meet': [
    grammar('de-g-sein', 'Le verbe sein', 'A1', {
      intro: '« Sein » veut dire « être ». Il est irrégulier et il faut le connaître par cœur.',
      points: [
        'Sie avec majuscule est le vouvoiement, et prend sind.',
        'sie sans majuscule veut dire « elle » (ist) ou « ils, elles » (sind).',
        'Pas d\'article devant une nationalité ou un métier : Ich bin Franzose.',
      ],
      tables: [
        {
          headers: ['Sujet', 'Sein'],
          rows: [
            ['ich', 'bin'],
            ['du', 'bist'],
            ['er, sie, es', 'ist'],
            ['wir', 'sind'],
            ['ihr', 'seid'],
            ['sie, Sie', 'sind'],
          ],
        },
      ],
      examples: [
        ['Ich bin Student.', 'Je suis étudiant.'],
        ['Wir sind Freunde.', 'Nous sommes amis.'],
      ],
      questions: [
        choose('Ich ___ Student.', 'bin', ['bist', 'ist'], 'Je suis étudiant.', 'Avec ich : bin.'),
        choose('Du ___ mein Freund.', 'bist', ['bin', 'sind'], 'Tu es mon ami.', 'Avec du : bist.'),
        choose('Sie ___ aus Deutschland.', 'ist', ['bin', 'seid'], 'Elle vient d\'Allemagne.', 'Sie, « elle », prend ist.'),
        complete('Wir ___ Freunde.', ['sind'], 'Nous sommes amis.', 'Avec wir : sind.'),
        complete('Ihr ___ aus Paris.', ['seid'], 'Vous venez de Paris.', 'Avec ihr : seid.'),
        order('Il est mon frère.', 'Er ist mein Bruder', ['bin', 'sind'], 'Sujet, verbe, puis complément.'),
      ],
    }),
    grammar('de-g-questions', 'Questions et négation', 'A1', {
      intro: 'L\'ordre des mots remplace le « est-ce que » français.',
      points: [
        'Question en W : le mot interrogatif, puis le verbe. Wo wohnst du?',
        'Question fermée : le verbe en tête. Wohnst du hier?',
        'Mots en W : wer (qui), was (quoi), wo (où), woher (d\'où), wie (comment), wann (quand), warum (pourquoi).',
        'La négation nicht se place après le verbe, souvent en fin de phrase.',
      ],
      tables: [
        {
          headers: ['Type', 'Exemple'],
          rows: [
            ['Affirmation', 'Du wohnst hier.'],
            ['Question fermée', 'Wohnst du hier?'],
            ['Question en W', 'Wo wohnst du?'],
            ['Négation', 'Du wohnst nicht hier.'],
          ],
        },
      ],
      examples: [
        ['Woher kommst du?', 'D\'où viens-tu ?'],
        ['Ich komme nicht.', 'Je ne viens pas.'],
      ],
      questions: [
        transform(QUESTION, 'Du kommst aus Paris.', ['Kommst du aus Paris?'], 'Viens-tu de Paris ?', 'Le verbe passe en tête.'),
        transform(QUESTION, 'Sie spricht Deutsch.', ['Spricht sie Deutsch?'], 'Parle-t-elle allemand ?', 'Le verbe passe en tête.'),
        choose('___ wohnst du?', 'Wo', ['Wer', 'Was'], 'Où habites-tu ?', 'Wo veut dire « où ».'),
        choose('___ heißt du?', 'Wie', ['Wo', 'Wer'], 'Comment t\'appelles-tu ?', 'Wie veut dire « comment ».'),
        transform(NEGATIVE, 'Ich komme.', ['Ich komme nicht'], 'Je ne viens pas.', 'Nicht après le verbe.'),
        spot('Woher kommst du?', ['Woher du kommst?', 'Kommst woher du?'], 'Le verbe vient juste après le mot en W.'),
      ],
    }),
  ],
  'de-family': [
    grammar('de-g-articles', 'Les trois genres', 'A1', {
      intro: 'Chaque nom est masculin, féminin ou neutre. Le genre français ne t\'aide pas.',
      points: [
        'L\'article défini : der, die, das. Au pluriel, toujours die.',
        'L\'article indéfini : ein pour der et das, eine pour die.',
        'Astuces : les noms en -ung, -heit, -keit sont féminins. Ceux en -chen sont neutres.',
        'Le pluriel varie beaucoup : apprends-le avec le nom.',
      ],
      tables: [
        {
          headers: ['Genre', 'Défini', 'Indéfini', 'Exemple'],
          rows: [
            ['Masculin', 'der', 'ein', 'der Vater'],
            ['Féminin', 'die', 'eine', 'die Mutter'],
            ['Neutre', 'das', 'ein', 'das Kind'],
            ['Pluriel', 'die', '—', 'die Kinder'],
          ],
        },
      ],
      examples: [
        ['Das ist ein Haus.', 'C\'est une maison.'],
        ['Die Zeitung ist hier.', 'Le journal est ici.'],
      ],
      questions: [
        choose('___ Vater ist hier.', 'Der', ['Die', 'Das'], 'Le père est ici.', 'Vater est masculin.'),
        choose('___ Mutter ist hier.', 'Die', ['Der', 'Das'], 'La mère est ici.', 'Mutter est féminin.'),
        choose('___ Haus ist groß.', 'Das', ['Der', 'Die'], 'La maison est grande.', 'Haus est neutre, malgré le français.'),
        choose('Das ist ___ Küche.', 'eine', ['ein', 'einen'], 'C\'est une cuisine.', 'Küche est féminin : eine.'),
        complete('Das ist ___ Tisch.', ['ein'], 'C\'est une table.', 'Tisch est masculin : ein.'),
        spot('Das Mädchen ist hier.', ['Die Mädchen ist hier.', 'Der Mädchen ist hier.'], 'Les noms en -chen sont neutres, même pour une fille.'),
      ],
    }),
    grammar('de-g-haben', 'Haben et les possessifs', 'A1', {
      intro: '« Haben » veut dire « avoir ». Les possessifs se comportent comme ein.',
      points: [
        'Le possessif dépend du possesseur : mein, dein, sein (à lui), ihr (à elle).',
        'Sa terminaison dépend du nom qui suit : mein Vater, meine Mutter.',
        'Comme en anglais, sein et ihr distinguent le sexe du possesseur.',
      ],
      tables: [
        {
          headers: ['Sujet', 'Haben', 'Possessif'],
          rows: [
            ['ich', 'habe', 'mein'],
            ['du', 'hast', 'dein'],
            ['er', 'hat', 'sein'],
            ['sie', 'hat', 'ihr'],
            ['wir', 'haben', 'unser'],
            ['ihr', 'habt', 'euer'],
            ['sie, Sie', 'haben', 'ihr, Ihr'],
          ],
        },
      ],
      examples: [
        ['Ich habe eine Tochter.', 'J\'ai une fille.'],
        ['Tom liebt seine Frau.', 'Tom aime sa femme.'],
      ],
      questions: [
        choose('Du ___ einen Bruder.', 'hast', ['habe', 'hat'], 'Tu as un frère.', 'Avec du : hast.'),
        choose('Er ___ zwei Kinder.', 'hat', ['hast', 'haben'], 'Il a deux enfants.', 'Avec er : hat.'),
        choose('Das ist ___ Mutter.', 'meine', ['mein', 'meinen'], 'Voici ma mère.', 'Mutter est féminin : meine.'),
        choose('Anna liebt ___ Bruder.', 'ihren', ['seinen', 'ihre'], 'Anna aime son frère.', 'Possesseur féminin : ihr-, et accusatif masculin : -en.'),
        complete('Wir ___ ein Haus.', ['haben'], 'Nous avons une maison.', 'Avec wir : haben.'),
        order('Mon père a une voiture.', 'Mein Vater hat ein Auto', ['haben', 'meine'], 'Vater est masculin : mein.'),
      ],
    }),
  ],
  'de-cafe': [
    grammar('de-g-accusative', "L'accusatif", 'A1', {
      intro: 'L\'allemand marque la fonction d\'un nom par son article. L\'accusatif indique le complément d\'objet.',
      points: [
        'Seul le masculin change : der devient den, ein devient einen.',
        'Le féminin, le neutre et le pluriel restent identiques.',
        'Beaucoup de verbes appellent l\'accusatif : haben, möchten, essen, trinken, kaufen, sehen.',
        'Il permet de déplacer les mots : Den Kaffee trinke ich.',
      ],
      tables: [
        {
          headers: ['', 'Sujet', 'Accusatif'],
          rows: [
            ['Masculin', 'der, ein', 'den, einen'],
            ['Féminin', 'die, eine', 'die, eine'],
            ['Neutre', 'das, ein', 'das, ein'],
            ['Pluriel', 'die', 'die'],
          ],
        },
      ],
      examples: [
        ['Ich trinke den Kaffee.', 'Je bois le café.'],
        ['Ich möchte einen Tee.', 'Je voudrais un thé.'],
      ],
      questions: [
        choose('Ich möchte ___ Kaffee.', 'einen', ['ein', 'eine'], 'Je voudrais un café.', 'Kaffee est masculin : einen à l\'accusatif.'),
        choose('Ich esse ___ Suppe.', 'eine', ['einen', 'ein'], 'Je mange une soupe.', 'Le féminin ne change pas.'),
        choose('Er trinkt ___ Bier.', 'ein', ['einen', 'eine'], 'Il boit une bière.', 'Bier est neutre : pas de changement.'),
        choose('Wir kaufen ___ Salat.', 'den', ['der', 'das'], 'Nous achetons la salade.', 'Der devient den à l\'accusatif.'),
        complete('Ich sehe ___ Bahnhof.', ['den'], 'Je vois la gare.', 'Bahnhof est masculin : den.'),
        order('Je prends le gâteau.', 'Ich nehme den Kuchen', ['der', 'nimmt'], 'Kuchen est complément d\'objet : den.'),
      ],
    }),
    grammar('de-g-kein', 'Kein ou nicht ?', 'A1', {
      intro: 'L\'allemand a deux négations, et le choix dépend de ce qu\'on nie.',
      points: [
        'Kein nie un nom sans article ou avec ein. Il se décline comme ein.',
        'Nicht nie un verbe, un adjectif ou un nom avec article défini.',
        'Ich habe ein Auto devient ich habe kein Auto.',
        'Das ist gut devient das ist nicht gut.',
      ],
      tables: [
        {
          headers: ['Affirmation', 'Négation'],
          rows: [
            ['Ich habe einen Bruder.', 'Ich habe keinen Bruder.'],
            ['Ich trinke Kaffee.', 'Ich trinke keinen Kaffee.'],
            ['Der Kaffee ist gut.', 'Der Kaffee ist nicht gut.'],
            ['Ich komme.', 'Ich komme nicht.'],
          ],
        },
      ],
      examples: [
        ['Ich habe keine Zeit.', 'Je n\'ai pas le temps.'],
        ['Das ist nicht teuer.', 'Ce n\'est pas cher.'],
      ],
      questions: [
        choose('Ich habe ___ Zeit.', 'keine', ['nicht', 'keinen'], 'Je n\'ai pas le temps.', 'Nom sans article : kein-, et Zeit est féminin.'),
        choose('Das ist ___ gut.', 'nicht', ['kein', 'keine'], 'Ce n\'est pas bon.', 'Un adjectif se nie avec nicht.'),
        choose('Ich esse ___ Fisch.', 'keinen', ['kein', 'nicht'], 'Je ne mange pas de poisson.', 'Fisch est masculin et accusatif : keinen.'),
        transform(NEGATIVE, 'Ich habe ein Auto.', ['Ich habe kein Auto'], 'Je n\'ai pas de voiture.', 'Ein devient kein.'),
        transform(NEGATIVE, 'Er arbeitet heute.', ['Er arbeitet heute nicht'], 'Il ne travaille pas aujourd\'hui.', 'Nicht se place en fin de phrase.'),
        complete('Wir haben ___ Kinder.', ['keine'], 'Nous n\'avons pas d\'enfants.', 'Pluriel : keine.'),
      ],
    }),
  ],
  'de-day': [
    grammar('de-g-present', 'Le présent', 'A1', {
      intro: 'On enlève -en à l\'infinitif et on ajoute une terminaison. Le présent traduit aussi notre « être en train de ».',
      points: [
        'Terminaisons : -e, -st, -t, -en, -t, -en.',
        'Si le radical finit par t ou d, on ajoute un e : du arbeitest, er arbeitet.',
        'Certains verbes changent de voyelle avec du et er : fahren, du fährst. Essen, du isst.',
      ],
      tables: [
        {
          title: 'Verbes réguliers et à changement de voyelle',
          headers: ['Sujet', 'wohnen', 'fahren', 'essen'],
          rows: [
            ['ich', 'wohne', 'fahre', 'esse'],
            ['du', 'wohnst', 'fährst', 'isst'],
            ['er, sie', 'wohnt', 'fährt', 'isst'],
            ['wir', 'wohnen', 'fahren', 'essen'],
            ['ihr', 'wohnt', 'fahrt', 'esst'],
            ['sie, Sie', 'wohnen', 'fahren', 'essen'],
          ],
        },
      ],
      examples: [
        ['Du arbeitest viel.', 'Tu travailles beaucoup.'],
        ['Er fährt nach Berlin.', 'Il va à Berlin.'],
      ],
      questions: [
        choose('Ich ___ in Paris.', 'wohne', ['wohnst', 'wohnt'], 'J\'habite à Paris.', 'Avec ich : -e.'),
        choose('Du ___ viel.', 'arbeitest', ['arbeitst', 'arbeite'], 'Tu travailles beaucoup.', 'Après t, on ajoute un e.'),
        complete('Er ___ (fahren) nach Berlin.', ['fährt'], 'Il va à Berlin.', 'A devient ä avec er.'),
        complete('Sie ___ (lesen) ein Buch.', ['liest'], 'Elle lit un livre.', 'E devient ie avec sie.'),
        complete('Wir ___ (spielen) Fußball.', ['spielen'], 'Nous jouons au football.', 'Avec wir : l\'infinitif.'),
        complete('Du ___ (essen) viel.', ['isst'], 'Tu manges beaucoup.', 'E devient i avec du.'),
      ],
    }),
    grammar('de-g-word-order', 'La place du verbe', 'A1', {
      intro: 'C\'est la règle la plus importante : le verbe conjugué est le deuxième élément de la phrase.',
      points: [
        'Le deuxième élément n\'est pas forcément le deuxième mot : Mein Vater arbeitet.',
        'Si la phrase commence par un autre mot que le sujet, le sujet passe après le verbe.',
        'Heute arbeite ich, et non heute ich arbeite.',
        'Ordre habituel des compléments : temps, puis manière, puis lieu.',
      ],
      tables: [
        {
          headers: ['Position 1', 'Verbe', 'Suite'],
          rows: [
            ['Ich', 'arbeite', 'heute.'],
            ['Heute', 'arbeite', 'ich.'],
            ['Am Montag', 'fahre', 'ich nach Berlin.'],
          ],
        },
      ],
      examples: [
        ['Heute arbeite ich.', 'Aujourd\'hui, je travaille.'],
        ['Am Montag fahre ich nach Berlin.', 'Lundi, je vais à Berlin.'],
      ],
      questions: [
        order('Aujourd\'hui, je travaille.', 'Heute arbeite ich', ['bin', 'du'], 'Heute occupe la position 1, le verbe reste deuxième.'),
        order('Demain, nous allons à Berlin.', 'Morgen fahren wir nach Berlin', ['sind', 'ich'], 'Le sujet passe après le verbe.'),
        transform('Commence la phrase par Heute', 'Ich lerne Deutsch.', ['Heute lerne ich Deutsch'], 'Aujourd\'hui, j\'apprends l\'allemand.', 'Le verbe reste en deuxième position.'),
        transform('Commence la phrase par Am Abend', 'Wir essen Fisch.', ['Am Abend essen wir Fisch'], 'Le soir, nous mangeons du poisson.', 'Am Abend compte pour un seul élément.'),
        spot('Heute gehe ich ins Kino.', ['Heute ich gehe ins Kino.', 'Heute ich ins Kino gehe.'], 'Le verbe doit être en deuxième position.'),
        spot('Mein Bruder arbeitet heute.', ['Mein Bruder heute arbeitet.', 'Arbeitet mein Bruder heute.'], 'Mein Bruder forme un seul élément.'),
      ],
    }),
  ],
  'de-town': [
    grammar('de-g-separable', 'Les verbes séparables', 'A1', {
      intro: 'Certains verbes se coupent en deux : le préfixe part à la fin de la phrase.',
      points: [
        'Aufstehen donne ich stehe um sieben Uhr auf.',
        'Préfixes séparables courants : auf, an, ab, aus, ein, mit, zu, zurück.',
        'À l\'infinitif, ils restent attachés : Ich will aufstehen.',
      ],
      tables: [
        {
          headers: ['Infinitif', 'Sens', 'Phrase'],
          rows: [
            ['aufstehen', 'se lever', 'Ich stehe früh auf.'],
            ['einkaufen', 'faire les courses', 'Ich kaufe heute ein.'],
            ['anrufen', 'téléphoner', 'Ich rufe dich an.'],
            ['abfahren', 'partir', 'Der Zug fährt um acht ab.'],
          ],
        },
      ],
      examples: [
        ['Ich rufe dich morgen an.', 'Je t\'appelle demain.'],
        ['Wir kaufen heute ein.', 'Nous faisons les courses aujourd\'hui.'],
      ],
      questions: [
        order('Je me lève à sept heures.', 'Ich stehe um sieben Uhr auf', ['aufstehe', 'bin'], 'Le préfixe auf va à la fin.'),
        order('Il m\'appelle demain.', 'Er ruft mich morgen an', ['anruft', 'ich'], 'Le préfixe an va à la fin.'),
        complete('Der Zug fährt um acht Uhr ___.', ['ab'], 'Le train part à huit heures.', 'Abfahren : le préfixe ab est à la fin.'),
        complete('Wir kaufen heute ___.', ['ein'], 'Nous faisons les courses aujourd\'hui.', 'Einkaufen : ein est à la fin.'),
        transform('Conjugue avec ich', 'aufstehen', ['Ich stehe auf'], 'Je me lève.', 'Le verbe se coupe.'),
        spot('Ich rufe dich heute an.', ['Ich anrufe dich heute.', 'Ich rufe an dich heute.'], 'Le préfixe se place tout à la fin.'),
      ],
    }),
    grammar('de-g-dative', 'Le datif', 'A2', {
      intro: 'Le datif indique le complément indirect, et il suit plusieurs prépositions fréquentes.',
      points: [
        'Der et das deviennent dem. Die devient der. Au pluriel, den avec un -n sur le nom.',
        'Toujours avec le datif : aus, bei, mit, nach, seit, von, zu.',
        'Contractions : zu dem devient zum, zu der devient zur, bei dem devient beim, von dem devient vom.',
        'Verbes avec datif : helfen, danken, gefallen.',
      ],
      tables: [
        {
          headers: ['', 'Sujet', 'Datif'],
          rows: [
            ['Masculin', 'der, ein', 'dem, einem'],
            ['Féminin', 'die, eine', 'der, einer'],
            ['Neutre', 'das, ein', 'dem, einem'],
            ['Pluriel', 'die', 'den'],
          ],
        },
      ],
      examples: [
        ['Ich fahre mit dem Zug.', 'Je voyage en train.'],
        ['Ich helfe der Frau.', 'J\'aide la femme.'],
      ],
      questions: [
        choose('Ich fahre mit ___ Bus.', 'dem', ['der', 'den'], 'Je voyage en bus.', 'Mit + datif, Bus est masculin : dem.'),
        choose('Sie wohnt bei ___ Mutter.', 'der', ['dem', 'die'], 'Elle habite chez sa mère.', 'Bei + datif, Mutter est féminin : der.'),
        choose('Ich komme aus ___ Schweiz.', 'der', ['die', 'dem'], 'Je viens de Suisse.', 'Aus + datif, Schweiz est féminin : der.'),
        choose('Er geht ___ Arzt.', 'zum', ['zur', 'zu'], 'Il va chez le médecin.', 'Zu + dem se contracte en zum.'),
        complete('Wir fahren mit ___ Auto.', ['dem'], 'Nous y allons en voiture.', 'Auto est neutre : dem.'),
        complete('Ich gehe ___ Schule.', ['zur'], 'Je vais à l\'école.', 'Zu + der se contracte en zur.'),
      ],
    }),
  ],
  'de-travel': [
    grammar('de-g-modals', 'Les verbes de modalité', 'A1', {
      intro: 'Ils expriment la capacité, l\'obligation ou la volonté, et envoient l\'infinitif à la fin.',
      points: [
        'Können : pouvoir. Müssen : devoir. Wollen : vouloir. Dürfen : avoir le droit. Möchten : aimerais.',
        'Ich et er ont la même forme, sans terminaison : ich kann, er kann.',
        'L\'infinitif va en dernière position : Ich kann heute nicht kommen.',
      ],
      tables: [
        {
          headers: ['Sujet', 'können', 'müssen', 'wollen'],
          rows: [
            ['ich', 'kann', 'muss', 'will'],
            ['du', 'kannst', 'musst', 'willst'],
            ['er, sie', 'kann', 'muss', 'will'],
            ['wir', 'können', 'müssen', 'wollen'],
            ['ihr', 'könnt', 'müsst', 'wollt'],
            ['sie, Sie', 'können', 'müssen', 'wollen'],
          ],
        },
      ],
      examples: [
        ['Ich kann Deutsch sprechen.', 'Je sais parler allemand.'],
        ['Wir müssen heute arbeiten.', 'Nous devons travailler aujourd\'hui.'],
      ],
      questions: [
        choose('Er ___ gut schwimmen.', 'kann', ['kannst', 'können'], 'Il sait bien nager.', 'Avec er, pas de terminaison.'),
        choose('Du ___ heute arbeiten.', 'musst', ['muss', 'müssen'], 'Tu dois travailler aujourd\'hui.', 'Avec du : musst.'),
        complete('Wir ___ (wollen) nach Berlin fahren.', ['wollen'], 'Nous voulons aller à Berlin.', 'Avec wir : infinitif du modal.'),
        order('Je ne peux pas venir aujourd\'hui.', 'Ich kann heute nicht kommen', ['bin', 'kommt'], 'L\'infinitif va à la toute fin.'),
        order('Peux-tu m\'aider ?', 'Kannst du mir helfen', ['bist', 'hilfst'], 'Le modal en tête, l\'infinitif à la fin.'),
        spot('Ich will Deutsch lernen.', ['Ich will lernen Deutsch.', 'Ich will Deutsch lernt.'], 'L\'infinitif se place à la fin, sans conjugaison.'),
      ],
    }),
    grammar('de-g-two-way', 'Où et vers où : datif ou accusatif', 'A2', {
      intro: 'Neuf prépositions changent de cas selon qu\'il y a déplacement ou non.',
      points: [
        'Wo ? (position) : datif. Ich bin in der Stadt.',
        'Wohin ? (déplacement) : accusatif. Ich gehe in die Stadt.',
        'Ces prépositions : in, an, auf, über, unter, vor, hinter, neben, zwischen.',
        'Contractions : in dem devient im, in das devient ins.',
      ],
      tables: [
        {
          headers: ['Question', 'Cas', 'Exemple'],
          rows: [
            ['Wo?', 'Datif', 'Ich bin im Park.'],
            ['Wohin?', 'Accusatif', 'Ich gehe in den Park.'],
          ],
        },
      ],
      examples: [
        ['Ich bin in der Stadt.', 'Je suis en ville.'],
        ['Ich gehe in die Stadt.', 'Je vais en ville.'],
      ],
      questions: [
        choose('Ich bin in ___ Stadt.', 'der', ['die', 'den'], 'Je suis en ville.', 'Position : datif.'),
        choose('Ich gehe in ___ Stadt.', 'die', ['der', 'dem'], 'Je vais en ville.', 'Déplacement : accusatif.'),
        choose('Wir sitzen in ___ Garten.', 'dem', ['den', 'der'], 'Nous sommes assis dans le jardin.', 'Position, masculin : dem.'),
        choose('Wir gehen in ___ Garten.', 'den', ['dem', 'der'], 'Nous allons dans le jardin.', 'Déplacement, masculin : den.'),
        complete('Heute gehe ich ___ Kino.', ['ins'], 'Aujourd\'hui, je vais au cinéma.', 'Déplacement, neutre : in das, soit ins.'),
        complete('Das Buch liegt ___ Tisch.', ['auf dem'], 'Le livre est sur la table.', 'Position, masculin : auf dem.'),
      ],
    }),
  ],
};

export const germanLaterUnits: Unit[] = [
  {
    id: 'de-past',
    title: 'Hier',
    description: "Raconter ce qui s'est passé",
    level: 'A2',
    tip: {
      title: 'Le passé en allemand',
      points: [
        'À l\'oral, on utilise presque toujours le Perfekt : ich habe gearbeitet.',
        'Le Präteritum s\'emploie surtout à l\'écrit, sauf pour sein, haben et les modaux.',
        'Le participe va à la fin de la phrase.',
      ],
      examples: [
        ['Ich habe gestern gearbeitet.', 'J\'ai travaillé hier.'],
        ['Wir sind nach Berlin gefahren.', 'Nous sommes allés à Berlin.'],
        ['Ich war zu Hause.', 'J\'étais à la maison.'],
      ],
    },
    lessons: [
      vocab(
        'de-past-when',
        'Quand ?',
        [
          w('gestern Abend', 'hier soir'),
          w('letzte Woche', 'la semaine dernière'),
          w('letztes Jahr', "l'année dernière"),
          w('damals', 'à cette époque'),
          w('dann', 'ensuite'),
          w('vorher', 'avant'),
          w('danach', 'après cela'),
          w('endlich', 'enfin'),
        ],
        [
          s('Ich habe Tom letzte Woche gesehen.', "J'ai vu Tom la semaine dernière."),
          s('Wir sind vor zwei Tagen angekommen.', 'Nous sommes arrivés il y a deux jours.'),
          s('Sie hat mich gestern Abend angerufen.', "Elle m'a appelé hier soir."),
          s('Ich habe gegessen und bin dann ins Bett gegangen.', 'J\'ai mangé, puis je suis allé me coucher.'),
          s('Er ist nach dem Essen gegangen.', 'Il est parti après le repas.'),
          s('Wir haben endlich das Hotel gefunden.', "Nous avons enfin trouvé l'hôtel."),
        ],
      ),
      vocab(
        'de-past-memories',
        'Souvenirs',
        [
          w('der Urlaub', 'vacances'),
          w('der Strand', 'plage'),
          w('der Berg', 'montagne'),
          w('das Foto', 'photo'),
          w('der Film', 'film'),
          w('das Konzert', 'concert'),
          w('die Party', 'fête'),
          w('die Reise', 'voyage'),
        ],
        [
          s('Wir sind an den Strand gegangen.', 'Nous sommes allés à la plage.'),
          s('Ich habe viele Fotos gemacht.', "J'ai pris beaucoup de photos."),
          s('Der Film war sehr gut.', 'Le film était très bon.'),
          s('Hat dir das Konzert gefallen?', "Le concert t'a plu ?"),
          s('Die Party war toll.', 'La fête était géniale.'),
          s('Es war eine lange Reise.', "C'était un long voyage."),
        ],
      ),
      grammar('de-g-perfekt-haben', 'Le Perfekt avec haben', 'A2', {
        intro: 'Le Perfekt est le passé de la conversation : haben conjugué, puis le participe à la fin.',
        points: [
          'Participe régulier : ge + radical + t. Machen donne gemacht.',
          'Radical en t ou d : -et. Arbeiten donne gearbeitet.',
          'Verbes en -ieren : pas de ge. Studieren donne studiert.',
          'Haben reste en deuxième position, le participe va en dernière.',
        ],
        tables: [
          {
            headers: ['Infinitif', 'Participe'],
            rows: [
              ['machen', 'gemacht'],
              ['kaufen', 'gekauft'],
              ['arbeiten', 'gearbeitet'],
              ['studieren', 'studiert'],
            ],
          },
        ],
        examples: [
          ['Ich habe gestern gearbeitet.', 'J\'ai travaillé hier.'],
          ['Wir haben ein Auto gekauft.', 'Nous avons acheté une voiture.'],
        ],
        questions: [
          choose('Ich ___ gestern gearbeitet.', 'habe', ['bin', 'hat'], 'J\'ai travaillé hier.', 'Arbeiten se conjugue avec haben.'),
          choose('Er hat ein Auto ___.', 'gekauft', ['kauft', 'gekaufen'], 'Il a acheté une voiture.', 'Ge + kauf + t.'),
          complete('Wir haben Fußball ___ (spielen).', ['gespielt'], 'Nous avons joué au football.', 'Ge + spiel + t.'),
          transform(PERFEKT, 'Ich mache die Arbeit.', ['Ich habe die Arbeit gemacht'], 'J\'ai fait le travail.', 'Haben, puis le participe à la fin.'),
          transform(PERFEKT, 'Sie lernt Deutsch.', ['Sie hat Deutsch gelernt'], 'Elle a appris l\'allemand.', 'Hat, puis gelernt à la fin.'),
          order('Hier, j\'ai acheté un manteau.', 'Gestern habe ich einen Mantel gekauft', ['bin', 'kaufe'], 'Verbe en deuxième position, participe à la fin.'),
        ],
      }),
      grammar('de-g-perfekt-sein', 'Le Perfekt avec sein', 'A2', {
        intro: 'Les verbes de déplacement ou de changement d\'état prennent sein, comme souvent en français.',
        points: [
          'Déplacement : gehen, fahren, kommen, fliegen.',
          'Changement d\'état : aufstehen, einschlafen, werden.',
          'Sein et bleiben prennent aussi sein : ich bin gewesen, ich bin geblieben.',
        ],
        tables: [
          {
            headers: ['Infinitif', 'Perfekt'],
            rows: [
              ['gehen', 'ich bin gegangen'],
              ['fahren', 'ich bin gefahren'],
              ['kommen', 'ich bin gekommen'],
              ['bleiben', 'ich bin geblieben'],
              ['sein', 'ich bin gewesen'],
            ],
          },
        ],
        examples: [
          ['Wir sind nach Berlin gefahren.', 'Nous sommes allés à Berlin.'],
          ['Sie ist zu Hause geblieben.', 'Elle est restée à la maison.'],
        ],
        questions: [
          choose('Ich ___ nach Hause gegangen.', 'bin', ['habe', 'ist'], 'Je suis rentré à la maison.', 'Déplacement : sein.'),
          choose('Wir ___ Kaffee getrunken.', 'haben', ['sind', 'seid'], 'Nous avons bu du café.', 'Pas de déplacement : haben.'),
          choose('Sie ___ nach Paris geflogen.', 'ist', ['hat', 'bist'], 'Elle est allée à Paris en avion.', 'Déplacement : sein.'),
          transform(PERFEKT, 'Er fährt nach Berlin.', ['Er ist nach Berlin gefahren'], 'Il est allé à Berlin.', 'Ist, puis gefahren à la fin.'),
          transform(PERFEKT, 'Wir kommen spät.', ['Wir sind spät gekommen'], 'Nous sommes arrivés tard.', 'Sind, puis gekommen.'),
          spot('Ich bin zu Hause geblieben.', ['Ich habe zu Hause geblieben.', 'Ich bin zu Hause bleiben.'], 'Bleiben se conjugue avec sein.'),
        ],
      }),
      grammar('de-g-participles', 'Les participes irréguliers', 'A2', {
        intro: 'Les verbes forts ont un participe en -en, souvent avec une voyelle différente.',
        points: [
          'Il faut les apprendre avec le verbe : l\'onglet Conjugaison du carnet les entraîne.',
          'Verbes séparables : ge se glisse au milieu. Aufstehen donne aufgestanden.',
          'Verbes en be-, ver-, er- : pas de ge. Verstehen donne verstanden.',
        ],
        tables: [
          {
            headers: ['Infinitif', 'Participe', 'Sens'],
            rows: [
              ['essen', 'gegessen', 'manger'],
              ['trinken', 'getrunken', 'boire'],
              ['sehen', 'gesehen', 'voir'],
              ['lesen', 'gelesen', 'lire'],
              ['schreiben', 'geschrieben', 'écrire'],
              ['sprechen', 'gesprochen', 'parler'],
              ['nehmen', 'genommen', 'prendre'],
              ['finden', 'gefunden', 'trouver'],
            ],
          },
        ],
        examples: [
          ['Ich habe ein Buch gelesen.', 'J\'ai lu un livre.'],
          ['Wir haben viel gegessen.', 'Nous avons beaucoup mangé.'],
        ],
        questions: [
          choose('Ich habe viel ___.', 'gegessen', ['geesst', 'gessen'], 'J\'ai beaucoup mangé.', 'Essen donne gegessen.'),
          choose('Er hat einen Film ___.', 'gesehen', ['gesieht', 'gesaht'], 'Il a vu un film.', 'Sehen donne gesehen.'),
          complete('Sie hat ein Buch ___ (lesen).', ['gelesen'], 'Elle a lu un livre.', 'Lesen donne gelesen.'),
          complete('Ich habe eine E-Mail ___ (schreiben).', ['geschrieben'], 'J\'ai écrit un e-mail.', 'Schreiben donne geschrieben.'),
          complete('Wir haben Deutsch ___ (sprechen).', ['gesprochen'], 'Nous avons parlé allemand.', 'Sprechen donne gesprochen.'),
          complete('Ich bin um sieben Uhr ___ (aufstehen).', ['aufgestanden'], 'Je me suis levé à sept heures.', 'Ge se glisse dans le verbe séparable.'),
        ],
      }),
      grammar('de-g-preterite', 'Le Präteritum', 'A2', {
        intro: 'À l\'oral, trois groupes de verbes préfèrent le Präteritum : sein, haben et les modaux.',
        points: [
          'Ich war est plus courant que ich bin gewesen.',
          'Ich hatte est plus courant que ich habe gehabt.',
          'Les modaux perdent leur tréma : ich konnte, ich musste.',
          'À ich et er, la forme est identique, sans terminaison.',
        ],
        tables: [
          {
            headers: ['Sujet', 'sein', 'haben', 'können'],
            rows: [
              ['ich', 'war', 'hatte', 'konnte'],
              ['du', 'warst', 'hattest', 'konntest'],
              ['er, sie', 'war', 'hatte', 'konnte'],
              ['wir', 'waren', 'hatten', 'konnten'],
              ['ihr', 'wart', 'hattet', 'konntet'],
              ['sie, Sie', 'waren', 'hatten', 'konnten'],
            ],
          },
        ],
        examples: [
          ['Ich war gestern zu Hause.', 'J\'étais à la maison hier.'],
          ['Wir hatten keine Zeit.', 'Nous n\'avions pas le temps.'],
        ],
        questions: [
          choose('Ich ___ gestern krank.', 'war', ['bin', 'hatte'], 'J\'étais malade hier.', 'Passé de sein : war.'),
          choose('Wir ___ keine Zeit.', 'hatten', ['waren', 'haben'], 'Nous n\'avions pas le temps.', 'Passé de haben : hatten.'),
          choose('Er ___ nicht kommen.', 'konnte', ['kann', 'konnten'], 'Il n\'a pas pu venir.', 'Passé de können : konnte.'),
          complete('Du ___ (sein) nicht da.', ['warst'], 'Tu n\'étais pas là.', 'War + st.'),
          complete('Ich ___ (müssen) arbeiten.', ['musste'], 'J\'ai dû travailler.', 'Müssen perd son tréma.'),
          complete('Sie ___ (haben) ein Auto.', ['hatte'], 'Elle avait une voiture.', 'Passé de haben.'),
        ],
      }),
      dialogue(
        'de-past-dialogue',
        'Les vacances',
        'Max raconte ses vacances à Lena.',
        [
          line('Lena', 'Hallo Max! Wo warst du letzte Woche?', 'Salut Max ! Où étais-tu la semaine dernière ?'),
          line('Max', 'Ich war im Urlaub in Österreich.', 'J\'étais en vacances en Autriche.'),
          line('Lena', 'Wirklich? Was hast du dort gemacht?', 'Vraiment ? Qu\'as-tu fait là-bas ?'),
          line('Max', 'Wir haben Wien besucht und sind in den Bergen gewandert.', 'Nous avons visité Vienne et fait de la randonnée en montagne.'),
          line('Lena', 'Hast du Fotos gemacht?', 'As-tu pris des photos ?'),
          line('Max', 'Ja, aber es hat viel geregnet und ich habe mein Handy verloren!', 'Oui, mais il a beaucoup plu et j\'ai perdu mon téléphone !'),
          line('Lena', 'Oh nein! Hast du es gefunden?', 'Oh non ! L\'as-tu retrouvé ?'),
          line('Max', 'Ja, es war in meinem Koffer.', 'Oui, il était dans ma valise.'),
        ],
        [
          q('Où était Max ?', 'En Autriche', 'En France', 'À Berlin'),
          q('Où était son téléphone ?', 'Dans sa valise', 'À l\'hôtel', 'À la plage'),
        ],
      ),
    ],
  },
  {
    id: 'de-future',
    title: 'Demain',
    description: 'Parler de ses projets et prévoir',
    level: 'A2',
    tip: {
      title: 'Parler du futur',
      points: [
        'Le plus souvent, l\'allemand utilise le présent avec un mot de temps : Morgen fahre ich nach Berlin.',
        'Werden + infinitif sert aux promesses et aux prévisions.',
        'L\'infinitif se place à la fin, comme avec les modaux.',
      ],
      examples: [
        ['Morgen fahre ich nach Berlin.', 'Demain, je vais à Berlin.'],
        ['Es wird morgen regnen.', 'Il pleuvra demain.'],
        ['Ich werde dir helfen.', 'Je t\'aiderai.'],
      ],
    },
    lessons: [
      vocab(
        'de-future-plans',
        'Les projets',
        [
          w('nächste Woche', 'la semaine prochaine'),
          w('nächstes Jahr', "l'année prochaine"),
          w('bald', 'bientôt'),
          w('später', 'plus tard'),
          w('der Plan', 'projet'),
          w('der Job', 'emploi'),
          w('die Prüfung', 'examen'),
          w('der Traum', 'rêve'),
        ],
        [
          s('Ich werde meinen Job wechseln.', 'Je vais changer de travail.'),
          s('Wir sehen uns bald.', 'Nous nous voyons bientôt.'),
          s('Was sind deine Pläne für nächste Woche?', 'Quels sont tes projets pour la semaine prochaine ?'),
          s('Ich habe nächstes Jahr eine Prüfung.', "J'ai un examen l'année prochaine."),
          s('Ich rufe dich später an.', "Je t'appelle plus tard."),
          s('Mein Traum ist, Kanada zu besuchen.', 'Mon rêve est de visiter le Canada.'),
        ],
      ),
      vocab(
        'de-future-weather',
        'La météo',
        [
          w('der Regen', 'pluie'),
          w('die Sonne', 'soleil'),
          w('der Schnee', 'neige'),
          w('der Wind', 'vent'),
          w('die Wolke', 'nuage'),
          w('heiß', 'chaud'),
          w('kalt', 'froid'),
          w('warm', 'doux, tiède'),
        ],
        [
          s('Es ist heute sehr kalt.', "Il fait très froid aujourd'hui."),
          s('Morgen wird es regnen.', 'Il pleuvra demain.', 'Es wird morgen regnen'),
          s('Es gibt viel Schnee.', 'Il y a beaucoup de neige.'),
          s('Die Sonne scheint.', 'Le soleil brille.'),
          s('Es wird heiß.', 'Il va faire chaud.'),
          s('Es gibt viele Wolken.', 'Il y a beaucoup de nuages.'),
        ],
      ),
      grammar('de-g-future', 'Le futur avec werden', 'A2', {
        intro: 'Werden conjugué en deuxième position, infinitif à la fin.',
        points: [
          'Werden est irrégulier : du wirst, er wird.',
          'Le présent suffit quand un mot indique le futur : Morgen arbeite ich.',
          'Werden s\'impose pour une promesse ou une prévision.',
        ],
        tables: [
          {
            headers: ['Sujet', 'werden', 'Exemple'],
            rows: [
              ['ich', 'werde', 'Ich werde kommen.'],
              ['du', 'wirst', 'Du wirst kommen.'],
              ['er, sie', 'wird', 'Er wird kommen.'],
              ['wir', 'werden', 'Wir werden kommen.'],
              ['ihr', 'werdet', 'Ihr werdet kommen.'],
              ['sie, Sie', 'werden', 'Sie werden kommen.'],
            ],
          },
        ],
        examples: [
          ['Ich werde dich anrufen.', 'Je t\'appellerai.'],
          ['Es wird morgen schneien.', 'Il neigera demain.'],
        ],
        questions: [
          choose('Ich ___ dich morgen anrufen.', 'werde', ['wird', 'werden'], 'Je t\'appellerai demain.', 'Avec ich : werde.'),
          choose('Du ___ das schaffen.', 'wirst', ['wird', 'werdet'], 'Tu y arriveras.', 'Avec du : wirst.'),
          complete('Es ___ morgen regnen.', ['wird'], 'Il pleuvra demain.', 'Avec es : wird.'),
          transform('Mets au futur avec werden', 'Wir kommen.', ['Wir werden kommen'], 'Nous viendrons.', 'Werden, puis l\'infinitif.'),
          order('Elle apprendra l\'allemand.', 'Sie wird Deutsch lernen', ['lernt', 'werden'], 'L\'infinitif va à la fin.'),
          spot('Ich werde morgen arbeiten.', ['Ich werde arbeiten morgen.', 'Ich wird morgen arbeiten.'], 'Werde avec ich, et l\'infinitif à la fin.'),
        ],
      }),
      grammar('de-g-reflexive', 'Les verbes réfléchis', 'A2', {
        intro: 'Comme en français, certains verbes se conjuguent avec un pronom : se laver, se lever.',
        points: [
          'Pronoms : mich, dich, sich, uns, euch, sich.',
          'Certains verbes sont réfléchis en allemand mais pas en français, et inversement.',
          'Exemples : sich freuen (se réjouir), sich waschen (se laver), sich treffen (se retrouver).',
          'Le pronom suit le verbe conjugué.',
        ],
        tables: [
          {
            headers: ['Sujet', 'Pronom', 'Exemple'],
            rows: [
              ['ich', 'mich', 'Ich freue mich.'],
              ['du', 'dich', 'Du freust dich.'],
              ['er, sie', 'sich', 'Er freut sich.'],
              ['wir', 'uns', 'Wir freuen uns.'],
              ['ihr', 'euch', 'Ihr freut euch.'],
              ['sie, Sie', 'sich', 'Sie freuen sich.'],
            ],
          },
        ],
        examples: [
          ['Ich freue mich auf den Urlaub.', 'Je me réjouis des vacances.'],
          ['Wir treffen uns morgen.', 'Nous nous retrouvons demain.'],
        ],
        questions: [
          choose('Ich freue ___ sehr.', 'mich', ['dich', 'sich'], 'Je me réjouis beaucoup.', 'Avec ich : mich.'),
          choose('Er wäscht ___.', 'sich', ['mich', 'uns'], 'Il se lave.', 'Avec er : sich.'),
          complete('Wir treffen ___ morgen.', ['uns'], 'Nous nous retrouvons demain.', 'Avec wir : uns.'),
          complete('Freust du ___?', ['dich'], 'Es-tu content ?', 'Avec du : dich.'),
          order('Je me réjouis des vacances.', 'Ich freue mich auf den Urlaub', ['dich', 'der'], 'Sich freuen auf + accusatif.'),
          spot('Sie freut sich sehr.', ['Sie freut mich sehr.', 'Sie sich freut sehr.'], 'Le pronom est sich, placé après le verbe.'),
        ],
      }),
      dialogue(
        'de-future-dialogue',
        'Les projets de Lena',
        'Lena parle de son avenir avec Max.',
        [
          line('Max', 'Was machst du nächstes Jahr?', 'Que fais-tu l\'année prochaine ?'),
          line('Lena', 'Ich werde in Wien arbeiten.', 'Je travaillerai à Vienne.'),
          line('Max', 'Toll! Hast du schon eine Wohnung?', 'Génial ! As-tu déjà un appartement ?'),
          line('Lena', 'Noch nicht, aber ich suche bald eine.', 'Pas encore, mais j\'en cherche une bientôt.'),
          line('Max', 'Dort wird es im Winter kalt.', 'Là-bas, il fera froid en hiver.'),
          line('Lena', 'Ich weiß. Ich werde einen warmen Mantel kaufen!', 'Je sais. J\'achèterai un manteau chaud !'),
          line('Max', 'Ich werde dich besuchen, versprochen.', 'Je viendrai te voir, c\'est promis.'),
        ],
        [
          q('Où Lena va-t-elle travailler ?', 'À Vienne', 'À Berlin', 'À Paris'),
          q('Que promet Max ?', 'De lui rendre visite', 'De chercher un appartement', 'D\'acheter un manteau'),
        ],
      ),
    ],
  },
  {
    id: 'de-experience',
    title: 'Mes expériences',
    description: "Décrire, comparer et parler de son parcours",
    level: 'A2',
    tip: {
      title: 'Décrire et comparer',
      points: [
        'Devant un nom, l\'adjectif prend une terminaison : der gute Kaffee, ein guter Kaffee.',
        'Pour comparer, on ajoute -er et on utilise als.',
        'Seit + datif + présent traduit « depuis » : Ich wohne seit zwei Jahren hier.',
      ],
      examples: [
        ['Ich wohne seit zwei Jahren hier.', 'J\'habite ici depuis deux ans.'],
        ['Berlin ist größer als München.', 'Berlin est plus grande que Munich.'],
        ['Das ist ein guter Film.', 'C\'est un bon film.'],
      ],
    },
    lessons: [
      vocab(
        'de-experience-words',
        'Déjà, jamais',
        [
          w('schon', 'déjà'),
          w('noch nie', 'jamais encore'),
          w('noch nicht', 'pas encore'),
          w('gerade', 'à l\'instant'),
          w('seit', 'depuis'),
          w('oft', 'souvent'),
          w('manchmal', 'parfois'),
          w('immer', 'toujours'),
        ],
        [
          s('Ich war noch nie in Kanada.', 'Je ne suis jamais allé au Canada.'),
          s('Warst du schon in Wien?', 'Es-tu déjà allé à Vienne ?'),
          s('Sie ist schon gegangen.', 'Elle est déjà partie.'),
          s('Ich bin noch nicht fertig.', "Je n'ai pas encore fini."),
          s('Wir sind gerade angekommen.', "Nous venons d'arriver."),
          s('Ich wohne seit März hier.', "J'habite ici depuis mars."),
        ],
      ),
      vocab(
        'de-experience-work',
        'Au travail',
        [
          w('der Chef', 'patron'),
          w('der Kollege', 'collègue'),
          w('die Besprechung', 'réunion'),
          w('die E-Mail', 'e-mail'),
          w('das Projekt', 'mission, dossier'),
          w('das Gehalt', 'salaire'),
          w('das Vorstellungsgespräch', 'entretien'),
          w('die Firma', 'entreprise'),
        ],
        [
          s('Ich habe um zehn Uhr eine Besprechung.', "J'ai une réunion à dix heures."),
          s('Mein Chef ist im Urlaub.', 'Mon patron est en vacances.'),
          s('Ich habe die E-Mail gestern geschickt.', "J'ai envoyé l'e-mail hier."),
          s('Sie arbeitet bei einer großen Firma.', 'Elle travaille dans une grande entreprise.'),
          s('Ich habe morgen ein Vorstellungsgespräch.', "J'ai un entretien demain."),
          s('Meine Kollegen sind sehr nett.', 'Mes collègues sont très gentils.'),
        ],
      ),
      grammar('de-g-adjectives', 'Les terminaisons des adjectifs', 'A2', {
        intro: 'Devant un nom, l\'adjectif se décline. Après sein, il reste invariable.',
        points: [
          'Der Mann ist gross : pas de terminaison après sein.',
          'Après der, die, das au nominatif singulier : -e.',
          'Après ein : l\'adjectif porte le genre. Ein großer Mann, eine große Stadt, ein großes Haus.',
          'À l\'accusatif masculin : einen großen Mann, den großen Mann.',
        ],
        tables: [
          {
            title: 'Au nominatif',
            headers: ['Genre', 'Avec der', 'Avec ein'],
            rows: [
              ['Masculin', 'der gute Film', 'ein guter Film'],
              ['Féminin', 'die gute Idee', 'eine gute Idee'],
              ['Neutre', 'das gute Buch', 'ein gutes Buch'],
            ],
          },
        ],
        examples: [
          ['Das ist ein guter Film.', 'C\'est un bon film.'],
          ['Ich kaufe einen warmen Mantel.', 'J\'achète un manteau chaud.'],
        ],
        questions: [
          choose('Das ist ein ___ Film.', 'guter', ['gute', 'gutes'], 'C\'est un bon film.', 'Ein ne montre pas le masculin : l\'adjectif prend -er.'),
          choose('Das ist ein ___ Buch.', 'gutes', ['guter', 'gute'], 'C\'est un bon livre.', 'Neutre avec ein : -es.'),
          choose('Das ist eine ___ Idee.', 'gute', ['guter', 'gutes'], 'C\'est une bonne idée.', 'Féminin : -e.'),
          choose('Der ___ Mann ist mein Vater.', 'große', ['großer', 'großes'], 'Le grand homme est mon père.', 'Der montre déjà le genre : -e.'),
          complete('Ich kaufe einen ___ (warm) Mantel.', ['warmen'], 'J\'achète un manteau chaud.', 'Accusatif masculin : -en.'),
          spot('Das Haus ist groß.', ['Das Haus ist großes.', 'Das Haus ist große.'], 'Après sein, l\'adjectif ne prend pas de terminaison.'),
        ],
      }),
      grammar('de-g-compare', 'Comparatif et superlatif', 'A2', {
        intro: 'Le comparatif ajoute -er, sans jamais utiliser mehr devant un adjectif.',
        points: [
          'Schnell, schneller, am schnellsten.',
          'Beaucoup d\'adjectifs courts prennent un tréma : groß, größer. Alt, älter.',
          'Le « que » de comparaison se dit als. L\'égalité : so groß wie.',
          'Irréguliers : gut, besser, am besten. Viel, mehr, am meisten. Gern, lieber, am liebsten.',
        ],
        tables: [
          {
            headers: ['Adjectif', 'Comparatif', 'Superlatif'],
            rows: [
              ['schnell', 'schneller', 'am schnellsten'],
              ['groß', 'größer', 'am größten'],
              ['alt', 'älter', 'am ältesten'],
              ['gut', 'besser', 'am besten'],
              ['viel', 'mehr', 'am meisten'],
            ],
          },
        ],
        examples: [
          ['Berlin ist größer als München.', 'Berlin est plus grande que Munich.'],
          ['Ich trinke lieber Tee.', 'Je préfère boire du thé.'],
        ],
        questions: [
          choose('Berlin ist ___ als München.', 'größer', ['mehr groß', 'großer'], 'Berlin est plus grande que Munich.', 'Groß prend un tréma au comparatif.'),
          choose('Mein Bruder ist ___ als ich.', 'älter', ['alter', 'mehr alt'], 'Mon frère est plus âgé que moi.', 'Alt devient älter.'),
          choose('Dieser Film ist ___.', 'am besten', ['am gutesten', 'mehr gut'], 'Ce film est le meilleur.', 'Superlatif irrégulier de gut.'),
          complete('Tom ist größer ___ Paul.', ['als'], 'Tom est plus grand que Paul.', 'Après un comparatif : als.'),
          complete('Anna ist so alt ___ ich.', ['wie'], 'Anna a le même âge que moi.', 'Égalité : so ... wie.'),
          complete('Ich trinke ___ (gern) Tee als Kaffee.', ['lieber'], 'Je préfère le thé au café.', 'Gern devient lieber.'),
        ],
      }),
      grammar('de-g-seit', 'Seit, vor et les dates', 'A2', {
        intro: '« Depuis » et « il y a » suivent des constructions différentes du français.',
        points: [
          'Seit + datif + présent : ce qui dure encore. Ich wohne seit zwei Jahren hier.',
          'Vor + datif + passé : un moment révolu. Ich bin vor zwei Jahren gekommen.',
          'Au datif pluriel, le nom prend -n : zwei Jahre, seit zwei Jahren.',
          'Am pour les jours, im pour les mois et saisons, um pour les heures.',
        ],
        tables: [
          {
            headers: ['Mot', 'Emploi', 'Exemple'],
            rows: [
              ['seit', 'depuis', 'seit zwei Jahren'],
              ['vor', 'il y a', 'vor zwei Jahren'],
              ['am', 'jour', 'am Montag'],
              ['im', 'mois, saison', 'im Mai'],
              ['um', 'heure', 'um acht Uhr'],
            ],
          },
        ],
        examples: [
          ['Ich lerne seit einem Jahr Deutsch.', 'J\'apprends l\'allemand depuis un an.'],
          ['Wir sind vor einer Woche angekommen.', 'Nous sommes arrivés il y a une semaine.'],
        ],
        questions: [
          choose('Ich wohne ___ zwei Jahren hier.', 'seit', ['vor', 'um'], 'J\'habite ici depuis deux ans.', 'Ce qui dure encore : seit.'),
          choose('Ich bin ___ zwei Tagen gekommen.', 'vor', ['seit', 'am'], 'Je suis arrivé il y a deux jours.', 'Moment révolu : vor.'),
          choose('Wir treffen uns ___ Montag.', 'am', ['im', 'um'], 'Nous nous voyons lundi.', 'Jour : am.'),
          choose('Das Konzert beginnt ___ acht Uhr.', 'um', ['am', 'im'], 'Le concert commence à huit heures.', 'Heure : um.'),
          complete('Ich habe ___ Mai Urlaub.', ['im'], 'J\'ai des vacances en mai.', 'Mois : im.'),
          spot('Ich lerne seit einem Jahr Deutsch.', ['Ich habe seit einem Jahr Deutsch gelernt.', 'Ich lerne seit ein Jahr Deutsch.'], 'Présent avec seit, et datif après seit.'),
        ],
      }),
      dialogue(
        'de-experience-dialogue',
        "L'entretien",
        'Lena passe un entretien d\'embauche.',
        [
          line('Chef', 'Guten Morgen, Frau Martin. Haben Sie schon bei einer großen Firma gearbeitet?', 'Bonjour, Madame Martin. Avez-vous déjà travaillé dans une grande entreprise ?'),
          line('Lena', 'Ja, ich habe zwei Jahre in Berlin gearbeitet.', 'Oui, j\'ai travaillé deux ans à Berlin.'),
          line('Chef', 'Und was machen Sie jetzt?', 'Et que faites-vous maintenant ?'),
          line('Lena', 'Ich bin seit 2023 Lehrerin.', 'Je suis professeure depuis 2023.'),
          line('Chef', 'Haben Sie schon im Ausland gelebt?', 'Avez-vous déjà vécu à l\'étranger ?'),
          line('Lena', 'Ja, ich war als Studentin in Österreich.', 'Oui, j\'étais en Autriche quand j\'étais étudiante.'),
          line('Chef', 'Sehr gut. Wir rufen Sie nächste Woche an.', 'Très bien. Nous vous appellerons la semaine prochaine.'),
        ],
        [
          q('Combien de temps Lena a-t-elle travaillé à Berlin ?', 'Deux ans', 'Dix ans', 'Six mois'),
          q('Que fait Lena depuis 2023 ?', 'Elle est professeure', 'Elle est étudiante', 'Elle est médecin'),
        ],
      ),
    ],
  },
  {
    id: 'de-explain',
    title: 'Raconter et convaincre',
    description: 'Relier ses idées, donner son avis, imaginer',
    level: 'B1',
    tip: {
      title: 'La subordonnée allemande',
      points: [
        'Dans une subordonnée, le verbe conjugué part à la toute fin.',
        'C\'est le deuxième grand principe de l\'ordre des mots, après la deuxième position.',
        'Une virgule sépare toujours la subordonnée de la principale.',
      ],
      examples: [
        ['Ich bleibe zu Hause, weil ich krank bin.', 'Je reste à la maison parce que je suis malade.'],
        ['Ich glaube, dass er recht hat.', 'Je crois qu\'il a raison.'],
        ['Wenn es regnet, bleiben wir hier.', 'S\'il pleut, nous restons ici.'],
      ],
    },
    lessons: [
      vocab(
        'de-explain-opinion',
        'Donner son avis',
        [
          w('denken', 'penser'),
          w('glauben', 'croire'),
          w('vielleicht', 'peut-être'),
          w('weil', 'parce que'),
          w('obwohl', 'bien que'),
          w('wichtig', 'important'),
          w('schwierig', 'difficile'),
          w('einfach', 'facile'),
        ],
        [
          s('Ich denke, das ist eine gute Idee.', "Je pense que c'est une bonne idée."),
          s('Das finde ich nicht.', 'Je ne trouve pas.'),
          s('Vielleicht hast du recht.', 'Tu as peut-être raison.'),
          s('Deutsch ist nicht so schwierig.', "L'allemand n'est pas si difficile."),
          s('Es ist wichtig zu üben.', "Il est important de s'entraîner."),
          s('Das ist ganz einfach.', "C'est très facile."),
        ],
      ),
      vocab(
        'de-explain-world',
        'Le monde autour',
        [
          w('die Nachrichten', 'actualités'),
          w('das Leben', 'vie'),
          w('die Leute', 'gens'),
          w('die Welt', 'monde'),
          w('das Problem', 'problème'),
          w('die Lösung', 'solution'),
          w('der Grund', 'raison'),
          w('die Wahl', 'choix'),
        ],
        [
          s('Hast du die Nachrichten gesehen?', 'As-tu vu les actualités ?'),
          s('Das Leben ist kurz.', 'La vie est courte.'),
          s('Die Leute sind hier sehr nett.', 'Les gens sont très gentils ici.'),
          s('Das ist ein großes Problem.', "C'est un gros problème."),
          s('Wir brauchen eine Lösung.', "Nous avons besoin d'une solution."),
          s('Du hast keine Wahl.', "Tu n'as pas le choix."),
        ],
      ),
      grammar('de-g-weil-dass', 'Les subordonnées avec weil et dass', 'A2', {
        intro: 'Après weil, dass, ob ou wenn, le verbe conjugué va à la fin.',
        points: [
          'Weil : parce que. Dass : que. Ob : si, dans une question indirecte.',
          'Ich bin krank devient weil ich krank bin.',
          'Verbe séparable : il se ressoude. Weil ich früh aufstehe.',
          'Une virgule est obligatoire.',
        ],
        tables: [
          {
            headers: ['Principale', 'Subordonnée'],
            rows: [
              ['Ich bleibe hier,', 'weil ich krank bin.'],
              ['Ich glaube,', 'dass er kommt.'],
              ['Ich weiß nicht,', 'ob sie da ist.'],
            ],
          },
        ],
        examples: [
          ['Ich lerne Deutsch, weil ich in Berlin arbeite.', 'J\'apprends l\'allemand parce que je travaille à Berlin.'],
          ['Ich weiß, dass du recht hast.', 'Je sais que tu as raison.'],
        ],
        questions: [
          order('Je reste ici parce que je suis malade.', 'Ich bleibe hier weil ich krank bin', ['ist', 'dass'], 'Après weil, le verbe va à la fin.'),
          order('Je crois qu\'il vient.', 'Ich glaube dass er kommt', ['weil', 'komme'], 'Après dass, le verbe va à la fin.'),
          choose('Ich komme nicht, weil ich keine Zeit ___.', 'habe', ['hat', 'haben'], 'Je ne viens pas parce que je n\'ai pas le temps.', 'Le verbe conjugué en dernière position.'),
          choose('Ich weiß nicht, ___ sie kommt.', 'ob', ['dass', 'weil'], 'Je ne sais pas si elle vient.', 'Question indirecte : ob.'),
          complete('Ich glaube, ___ du recht hast.', ['dass'], 'Je crois que tu as raison.', 'Dass introduit « que ».'),
          spot('Ich bin müde, weil ich viel arbeite.', ['Ich bin müde, weil ich arbeite viel.', 'Ich bin müde, weil arbeite ich viel.'], 'Arbeite doit être à la fin.'),
        ],
      }),
      grammar('de-g-wenn-als', 'Wenn, als et wann', 'B1', {
        intro: 'Le français a un seul « quand », l\'allemand en a trois.',
        points: [
          'Als : une seule fois dans le passé. Als ich jung war.',
          'Wenn : répétition, ou condition, ou futur. Wenn ich Zeit habe.',
          'Wann : uniquement dans les questions. Wann kommst du?',
          'Si la subordonnée vient d\'abord, le verbe principal suit directement la virgule.',
        ],
        tables: [
          {
            headers: ['Mot', 'Emploi', 'Exemple'],
            rows: [
              ['als', 'une fois, au passé', 'Als ich klein war, ...'],
              ['wenn', 'chaque fois, condition', 'Wenn es regnet, ...'],
              ['wann', 'question', 'Wann kommst du?'],
            ],
          },
        ],
        examples: [
          ['Als ich klein war, wohnte ich in Lyon.', 'Quand j\'étais petit, j\'habitais à Lyon.'],
          ['Wenn es regnet, bleiben wir zu Hause.', 'Quand il pleut, nous restons à la maison.'],
        ],
        questions: [
          choose('___ ich klein war, wohnte ich in Lyon.', 'Als', ['Wenn', 'Wann'], 'Quand j\'étais petit, j\'habitais à Lyon.', 'Une période unique du passé : als.'),
          choose('___ es regnet, bleiben wir zu Hause.', 'Wenn', ['Als', 'Wann'], 'Quand il pleut, nous restons à la maison.', 'Répétition : wenn.'),
          choose('___ kommst du nach Hause?', 'Wann', ['Wenn', 'Als'], 'Quand rentres-tu ?', 'Question : wann.'),
          complete('Ruf mich an, ___ du ankommst.', ['wenn'], 'Appelle-moi quand tu arrives.', 'Futur : wenn.'),
          order('S\'il pleut, nous restons ici.', 'Wenn es regnet bleiben wir hier', ['wann', 'sind'], 'Verbe à la fin de la subordonnée, puis verbe principal.'),
          spot('Als ich in Berlin war, habe ich Tom gesehen.', ['Wenn ich in Berlin war, habe ich Tom gesehen.', 'Als ich war in Berlin, habe ich Tom gesehen.'], 'Une fois dans le passé : als, avec le verbe à la fin.'),
        ],
      }),
      grammar('de-g-konjunktiv', 'Le Konjunktiv II', 'B1', {
        intro: 'C\'est l\'équivalent du conditionnel français, pour la politesse et les hypothèses.',
        points: [
          'Pour la plupart des verbes : würde + infinitif. Ich würde gern reisen.',
          'Sein et haben ont leur propre forme : ich wäre, ich hätte.',
          'Modaux : ich könnte, ich müsste.',
          'Hypothèse : Wenn ich Zeit hätte, würde ich kommen.',
        ],
        tables: [
          {
            headers: ['Sujet', 'würde', 'wäre', 'hätte'],
            rows: [
              ['ich', 'würde', 'wäre', 'hätte'],
              ['du', 'würdest', 'wärst', 'hättest'],
              ['er, sie', 'würde', 'wäre', 'hätte'],
              ['wir', 'würden', 'wären', 'hätten'],
            ],
          },
        ],
        examples: [
          ['Ich hätte gern einen Kaffee.', 'J\'aimerais un café.'],
          ['Wenn ich Zeit hätte, würde ich kommen.', 'Si j\'avais le temps, je viendrais.'],
        ],
        questions: [
          choose('Ich ___ gern nach Italien fahren.', 'würde', ['werde', 'wurde'], 'J\'aimerais aller en Italie.', 'Souhait : würde.'),
          choose('Ich ___ gern einen Tee.', 'hätte', ['hatte', 'habe'], 'J\'aimerais un thé.', 'Demande polie : hätte gern.'),
          choose('Wenn ich reich ___, würde ich reisen.', 'wäre', ['bin', 'war'], 'Si j\'étais riche, je voyagerais.', 'Hypothèse avec sein : wäre.'),
          complete('Wenn ich Zeit ___, würde ich kommen.', ['hätte'], 'Si j\'avais le temps, je viendrais.', 'Hypothèse avec haben : hätte.'),
          complete('___ du mir helfen?', ['Könntest'], 'Pourrais-tu m\'aider ?', 'Demande polie : könntest.'),
          order('À ta place, je resterais ici.', 'An deiner Stelle würde ich hier bleiben', ['werde', 'bleibe'], 'Würde en deuxième position, infinitif à la fin.'),
        ],
      }),
      grammar('de-g-connectors', 'Relier ses idées', 'B1', {
        intro: 'Certains mots gardent l\'ordre normal, d\'autres changent la place du verbe.',
        points: [
          'Und, aber, oder, denn : position 0, l\'ordre ne change pas.',
          'Weil, obwohl, dass, wenn : le verbe va à la fin.',
          'Deshalb, trotzdem, dann : ils occupent la position 1, le verbe suit.',
          'Denn et weil ont le même sens, mais pas le même ordre.',
        ],
        tables: [
          {
            headers: ['Type', 'Exemple'],
            rows: [
              ['denn', 'Ich bleibe hier, denn ich bin krank.'],
              ['weil', 'Ich bleibe hier, weil ich krank bin.'],
              ['deshalb', 'Ich bin krank, deshalb bleibe ich hier.'],
              ['obwohl', 'Ich gehe, obwohl ich krank bin.'],
            ],
          },
        ],
        examples: [
          ['Es regnet, deshalb bleiben wir hier.', 'Il pleut, c\'est pourquoi nous restons ici.'],
          ['Ich arbeite, obwohl ich müde bin.', 'Je travaille bien que je sois fatigué.'],
        ],
        questions: [
          choose('Es regnet, deshalb ___ wir hier.', 'bleiben', ['wir bleiben', 'bleibt'], 'Il pleut, c\'est pourquoi nous restons ici.', 'Deshalb occupe la position 1, le verbe suit.'),
          choose('Ich bleibe hier, denn ich ___ krank.', 'bin', ['krank bin', 'ist'], 'Je reste ici car je suis malade.', 'Denn ne change pas l\'ordre.'),
          choose('Ich gehe arbeiten, ___ ich krank bin.', 'obwohl', ['deshalb', 'denn'], 'Je vais travailler bien que je sois malade.', 'Opposition, verbe à la fin : obwohl.'),
          complete('Das Hotel ist klein, ___ sehr schön.', ['aber'], 'L\'hôtel est petit, mais très beau.', 'Opposition simple : aber.'),
          order('Il pleut, c\'est pourquoi je reste ici.', 'Es regnet deshalb bleibe ich hier', ['weil', 'bin'], 'Le verbe suit directement deshalb.'),
          spot('Ich bin müde, trotzdem arbeite ich.', ['Ich bin müde, trotzdem ich arbeite.', 'Ich bin müde, trotzdem ich arbeiten.'], 'Trotzdem occupe la position 1, le verbe suit.'),
        ],
      }),
      dialogue(
        'de-explain-dialogue',
        'Quelle ville choisir ?',
        'Lena et Max choisissent où passer leurs vacances.',
        [
          line('Lena', 'Ich denke, wir sollten nach Rom fahren, weil es billiger ist.', 'Je pense que nous devrions aller à Rome, parce que c\'est moins cher.'),
          line('Max', 'Vielleicht, aber Hamburg ist interessanter.', 'Peut-être, mais Hambourg est plus intéressante.'),
          line('Lena', 'Das finde ich nicht. In Rom isst man besser!', 'Je ne trouve pas. À Rome, on mange mieux !'),
          line('Max', 'Das stimmt. Wenn wir im Mai fahren, wird es warm sein.', 'C\'est vrai. Si nous y allons en mai, il fera doux.'),
          line('Lena', 'Als du angerufen hast, habe ich gerade ein Hotel gesucht.', 'Quand tu as appelé, j\'étais justement en train de chercher un hôtel.'),
          line('Max', 'Obwohl ich lieber nach Hamburg fahren würde, hast du recht. Also Rom!', 'Bien que je préfère aller à Hambourg, tu as raison. Alors Rome !'),
        ],
        [
          q('Pourquoi Lena préfère-t-elle Rome ?', 'C\'est moins cher et on y mange mieux', 'Elle y a vécu', 'Il y fait froid'),
          q('Que décident-ils ?', 'D\'aller à Rome', 'D\'aller à Hambourg', 'De rester à Berlin'),
        ],
      ),
    ],
  },
];
