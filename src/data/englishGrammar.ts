import type { GrammarLesson, Unit } from '../types';
import { choose, complete, dialogue, grammar, line, order, q, s, spot, transform, vocab, w } from './build';

const NEGATIVE = 'Mets à la forme négative';
const QUESTION = 'Pose la question';
const PAST = 'Mets au prétérit';

export const englishGrammar: Record<string, GrammarLesson[]> = {
  'en-meet': [
    grammar('en-g-be', 'Le verbe to be', 'A1', {
      intro: '« To be » veut dire « être ». C\'est le verbe le plus utilisé de l\'anglais.',
      points: [
        'Sa forme dépend du sujet : am, is ou are.',
        'À l\'oral, on contracte : I\'m, you\'re, he\'s, she\'s, we\'re, they\'re.',
      ],
      tables: [
        {
          headers: ['Sujet', 'Forme', 'Contraction'],
          rows: [
            ['I', 'am', "I'm"],
            ['you', 'are', "you're"],
            ['he, she, it', 'is', "he's, she's, it's"],
            ['we', 'are', "we're"],
            ['they', 'are', "they're"],
          ],
        },
      ],
      examples: [
        ['I am a student.', 'Je suis étudiant.'],
        ['They are from London.', 'Ils viennent de Londres.'],
      ],
      questions: [
        choose('I ___ a student.', 'am', ['is', 'are'], 'Je suis étudiant.', 'Avec I, c\'est toujours am.'),
        choose('She ___ from Germany.', 'is', ['am', 'are'], 'Elle vient d\'Allemagne.', 'He, she et it prennent is.'),
        choose('We ___ friends.', 'are', ['is', 'am'], 'Nous sommes amis.', 'We, you et they prennent are.'),
        complete('They ___ English.', ['are'], 'Ils sont anglais.', 'They prend are.'),
        complete('He ___ my brother.', ['is'], 'Il est mon frère.', 'He prend is.'),
        order('Tu es mon ami.', 'You are my friend', ['is', 'am'], 'Le sujet, puis le verbe, puis le reste.'),
      ],
    }),
    grammar('en-g-be-negative', 'To be : négation et questions', 'A1', {
      intro: 'Avec to be, pas besoin de « do » : tout se fait avec le verbe lui-même.',
      points: [
        'Négation : on ajoute not après le verbe. I am not, she is not, we are not.',
        'Contractions : isn\'t et aren\'t. Attention, « amn\'t » n\'existe pas : on dit I\'m not.',
        'Question : on inverse le sujet et le verbe. You are devient Are you ?',
      ],
      tables: [
        {
          headers: ['Forme', 'Exemple'],
          rows: [
            ['Affirmation', 'She is French.'],
            ['Négation', 'She is not French.'],
            ['Question', 'Is she French?'],
          ],
        },
      ],
      examples: [
        ["I'm not English.", 'Je ne suis pas anglais.'],
        ['Are you a student?', 'Es-tu étudiant ?'],
      ],
      questions: [
        transform(NEGATIVE, 'I am French.', ['I am not French'], 'Je ne suis pas français.', 'On place not après le verbe.'),
        transform(NEGATIVE, 'She is a teacher.', ['She is not a teacher'], 'Elle n\'est pas professeure.', 'Is not, ou isn\'t en abrégé.'),
        transform(QUESTION, 'You are a student.', ['Are you a student?'], 'Es-tu étudiant ?', 'Le verbe passe devant le sujet.'),
        choose('___ he from London?', 'Is', ['Are', 'Am'], 'Vient-il de Londres ?', 'He prend is, ici en tête de question.'),
        spot('Where are you from?', ['Where you are from?', 'Where is you from?'], 'Après le mot interrogatif, le verbe vient avant le sujet.'),
        order("Elle n'est pas anglaise.", 'She is not English', ['are', 'do'], 'Not se place juste après is.'),
      ],
    }),
  ],
  'en-family': [
    grammar('en-g-have', 'Have et les possessifs', 'A1', {
      intro: '« Have » veut dire « avoir ». Il devient « has » avec he, she et it.',
      points: [
        'Le possessif s\'accorde avec le possesseur, pas avec l\'objet. C\'est le grand piège pour un francophone.',
        'Anna et son frère : her brother. Tom et sa femme : his wife.',
        'Le possessif ne change jamais au pluriel : my friends.',
      ],
      tables: [
        {
          headers: ['Sujet', 'Have', 'Possessif'],
          rows: [
            ['I', 'have', 'my'],
            ['you', 'have', 'your'],
            ['he', 'has', 'his'],
            ['she', 'has', 'her'],
            ['we', 'have', 'our'],
            ['they', 'have', 'their'],
          ],
        },
      ],
      examples: [
        ['She has a brother.', 'Elle a un frère.'],
        ['Tom loves his wife.', 'Tom aime sa femme.'],
      ],
      questions: [
        choose('She ___ two sons.', 'has', ['have', 'is'], 'Elle a deux fils.', 'She prend has.'),
        choose('I ___ a sister.', 'have', ['has', 'am'], 'J\'ai une sœur.', 'I prend have.'),
        choose('Anna is my friend. ___ brother is a doctor.', 'Her', ['His', 'My'], 'Anna est mon amie. Son frère est médecin.', 'Le possesseur est Anna, une femme : her.'),
        choose('Tom is here with ___ wife.', 'his', ['her', 'your'], 'Tom est ici avec sa femme.', 'Le possesseur est Tom : his, même si « wife » est féminin.'),
        complete('We ___ three children.', ['have'], 'Nous avons trois enfants.', 'We prend have.'),
        order('Elle a une fille.', 'She has a daughter', ['have', 'is'], 'On garde has après she.'),
      ],
    }),
    grammar('en-g-articles', 'Articles et pluriel', 'A1', {
      intro: 'A et an veulent dire « un » ou « une », the veut dire « le », « la » ou « les ».',
      points: [
        'A devant un son de consonne, an devant un son de voyelle : a teacher, an engineer.',
        'Devant un métier, l\'article est obligatoire : she is a doctor.',
        'Le pluriel se fait avec -s : one book, two books.',
        'Pluriels irréguliers à retenir : child devient children, man devient men, woman devient women.',
      ],
      tables: [
        {
          headers: ['Singulier', 'Pluriel'],
          rows: [
            ['a book', 'two books'],
            ['a bus', 'two buses'],
            ['a child', 'two children'],
            ['a woman', 'two women'],
          ],
        },
      ],
      examples: [
        ['He is an engineer.', 'Il est ingénieur.'],
        ['We have two children.', 'Nous avons deux enfants.'],
      ],
      questions: [
        choose('I have ___ apple.', 'an', ['a', 'the'], 'J\'ai une pomme.', 'Apple commence par un son de voyelle.'),
        choose('He is ___ engineer.', 'an', ['a', 'the'], 'Il est ingénieur.', 'Métier avec article, et son de voyelle : an.'),
        choose('She is ___ doctor.', 'a', ['an', 'the'], 'Elle est médecin.', 'Doctor commence par un son de consonne.'),
        complete('I have two ___ (book).', ['books'], 'J\'ai deux livres.', 'Pluriel régulier avec -s.'),
        complete('We have three ___ (child).', ['children'], 'Nous avons trois enfants.', 'Child a un pluriel irrégulier.'),
        spot('My father is a teacher.', ['My father is teacher.', 'My father is an teacher.'], 'Il faut l\'article devant un métier, et a devant teacher.'),
      ],
    }),
  ],
  'en-cafe': [
    grammar('en-g-some-any', 'Some, any, much, many', 'A1', {
      intro: 'Ces petits mots remplacent « du », « de la », « des » et « beaucoup de ».',
      points: [
        'Some s\'utilise dans une phrase affirmative : I would like some water.',
        'Any s\'utilise dans une question ou une négation : Do you have any milk?',
        'Many va avec ce qui se compte, much avec ce qui ne se compte pas.',
        'How much sert aussi à demander un prix.',
      ],
      tables: [
        {
          headers: ['Mot', 'Emploi', 'Exemple'],
          rows: [
            ['some', 'affirmation', 'some bread'],
            ['any', 'question, négation', 'any bread?'],
            ['many', 'dénombrable', 'many eggs'],
            ['much', 'non dénombrable', 'much water'],
          ],
        },
      ],
      examples: [
        ['I would like some bread.', 'Je voudrais du pain.'],
        ['We do not have any milk.', 'Nous n\'avons pas de lait.'],
      ],
      questions: [
        choose('I would like ___ water.', 'some', ['any', 'many'], 'Je voudrais de l\'eau.', 'Phrase affirmative : some.'),
        choose('Do you have ___ milk?', 'any', ['many', 'a'], 'Avez-vous du lait ?', 'Question : any.'),
        choose('There is not ___ sugar.', 'any', ['some', 'many'], 'Il n\'y a pas de sucre.', 'Négation : any.'),
        choose('How ___ coffees do you drink?', 'many', ['much', 'some'], 'Combien de cafés bois-tu ?', 'Les cafés se comptent : many.'),
        choose('How ___ is this cake?', 'much', ['many', 'any'], 'Combien coûte ce gâteau ?', 'Pour un prix, on dit how much.'),
        complete('We do not have ___ bread.', ['any'], 'Nous n\'avons pas de pain.', 'Négation : any.'),
      ],
    }),
    grammar('en-g-this-that', 'This, that, these, those', 'A1', {
      intro: 'Ces mots veulent dire « ce », « cette », « ces », selon la distance et le nombre.',
      points: [
        'This et these désignent ce qui est proche.',
        'That et those désignent ce qui est loin.',
        'Ils s\'accordent en nombre, contrairement à my ou the.',
      ],
      tables: [
        {
          headers: ['', 'Proche', 'Loin'],
          rows: [
            ['Singulier', 'this', 'that'],
            ['Pluriel', 'these', 'those'],
          ],
        },
      ],
      examples: [
        ['This coffee is very good.', 'Ce café est très bon.'],
        ['Those shoes are expensive.', 'Ces chaussures-là sont chères.'],
      ],
      questions: [
        choose('___ coffee here is very good.', 'This', ['Those', 'These'], 'Ce café est très bon.', 'Singulier et proche : this.'),
        choose('___ shoes over there are expensive.', 'Those', ['This', 'That'], 'Ces chaussures-là sont chères.', 'Pluriel et loin : those.'),
        choose('___ are my friends.', 'These', ['This', 'That'], 'Ce sont mes amis.', 'Pluriel et proche : these.'),
        complete('How much is ___ cake over there?', ['that'], 'Combien coûte ce gâteau là-bas ?', 'Singulier et loin : that.'),
        complete('I like ___ shoes here.', ['these'], 'J\'aime ces chaussures-ci.', 'Pluriel et proche : these.'),
        spot('This cake is good.', ['These cake is good.', 'This cakes are good.'], 'Cake est au singulier, donc this et is.'),
      ],
    }),
  ],
  'en-day': [
    grammar('en-g-present-simple', 'Le présent simple', 'A1', {
      intro: 'Il sert à parler des habitudes et des vérités générales.',
      points: [
        'Le verbe garde sa forme de base, sauf avec he, she et it : il prend -s.',
        'Après o, s, ch, sh et x, on ajoute -es : goes, watches.',
        'Consonne + y devient -ies : study, studies.',
        'Always, usually et never se placent avant le verbe.',
      ],
      tables: [
        {
          headers: ['Base', 'He, she, it'],
          rows: [
            ['work', 'works'],
            ['go', 'goes'],
            ['watch', 'watches'],
            ['study', 'studies'],
          ],
        },
      ],
      examples: [
        ['She works in an office.', 'Elle travaille dans un bureau.'],
        ['He always eats at noon.', 'Il mange toujours à midi.'],
      ],
      questions: [
        choose('She ___ in an office.', 'works', ['work', 'working'], 'Elle travaille dans un bureau.', 'Avec she, on ajoute -s.'),
        choose('I ___ coffee every morning.', 'drink', ['drinks', 'drinking'], 'Je bois du café tous les matins.', 'Avec I, pas de -s.'),
        complete('He ___ (go) to school by bus.', ['goes'], 'Il va à l\'école en bus.', 'Go devient goes.'),
        complete('My sister ___ (study) German.', ['studies'], 'Ma sœur étudie l\'allemand.', 'Le y devient ies.'),
        complete('Tom ___ (watch) TV in the evening.', ['watches'], 'Tom regarde la télé le soir.', 'Après ch, on ajoute -es.'),
        spot('He always eats at noon.', ['He eats always at noon.', 'Always he eat at noon.'], 'Always se place juste avant le verbe.'),
      ],
    }),
    grammar('en-g-do-does', 'Do et does', 'A1', {
      intro: 'Au présent simple, questions et négations se forment avec do ou does.',
      points: [
        'Question : Do you work? Does she work?',
        'Négation : I do not work, she does not work.',
        'Après do ou does, le verbe reprend sa forme de base, sans -s.',
      ],
      tables: [
        {
          headers: ['Sujet', 'Question', 'Négation'],
          rows: [
            ['I, you, we, they', 'Do you work?', 'You do not work.'],
            ['he, she, it', 'Does she work?', 'She does not work.'],
          ],
        },
      ],
      examples: [
        ['Does she live in Paris?', 'Habite-t-elle à Paris ?'],
        ["I don't like fish.", 'Je n\'aime pas le poisson.'],
      ],
      questions: [
        choose('___ you work on Sunday?', 'Do', ['Does', 'Are'], 'Travailles-tu le dimanche ?', 'Avec you : do.'),
        choose('___ she live in Paris?', 'Does', ['Do', 'Is'], 'Habite-t-elle à Paris ?', 'Avec she : does.'),
        transform(NEGATIVE, 'I like tea.', ['I do not like tea'], 'Je n\'aime pas le thé.', 'On ajoute do not devant le verbe.'),
        transform(NEGATIVE, 'He works here.', ['He does not work here'], 'Il ne travaille pas ici.', 'Le -s passe sur does : works devient work.'),
        transform(QUESTION, 'She speaks English.', ['Does she speak English?'], 'Parle-t-elle anglais ?', 'Le -s passe sur does : speaks devient speak.'),
        spot('She does not like fish.', ['She does not likes fish.', 'She not likes fish.'], 'Après does not, le verbe reste à la base.'),
      ],
    }),
  ],
  'en-town': [
    grammar('en-g-there-is', 'There is, there are', 'A1', {
      intro: '« Il y a » se dit there is au singulier et there are au pluriel.',
      points: [
        'Question : on inverse. Is there a bank? Are there any shops?',
        'Négation : there is not a bank, there are not any shops.',
        'On peut aussi dire there is no bank, there are no shops.',
      ],
      tables: [
        {
          headers: ['', 'Singulier', 'Pluriel'],
          rows: [
            ['Affirmation', 'There is a park.', 'There are two parks.'],
            ['Négation', 'There is not a park.', 'There are not any parks.'],
            ['Question', 'Is there a park?', 'Are there any parks?'],
          ],
        },
      ],
      examples: [
        ['There are two banks here.', 'Il y a deux banques ici.'],
        ['Is there a pharmacy here?', 'Y a-t-il une pharmacie ici ?'],
      ],
      questions: [
        choose('There ___ a bank near here.', 'is', ['are', 'be'], 'Il y a une banque près d\'ici.', 'Singulier : there is.'),
        choose('There ___ two parks in this city.', 'are', ['is', 'am'], 'Il y a deux parcs dans cette ville.', 'Pluriel : there are.'),
        transform(QUESTION, 'There is a pharmacy here.', ['Is there a pharmacy here?'], 'Y a-t-il une pharmacie ici ?', 'Is passe devant there.'),
        transform(NEGATIVE, 'There are shops here.', ['There are not any shops here', 'There are no shops here'], 'Il n\'y a pas de magasins ici.', 'Not any, ou no.'),
        complete('___ there a bus to the airport?', ['Is'], 'Y a-t-il un bus pour l\'aéroport ?', 'Un bus, donc singulier.'),
        order('Il y a une gare ici.', 'There is a station here', ['are', 'have'], 'On ne dit jamais « it has » pour « il y a ».'),
      ],
    }),
    grammar('en-g-continuous', 'Le présent continu', 'A1', {
      intro: 'Il décrit ce qui se passe en ce moment. Il n\'a pas d\'équivalent direct en français.',
      points: [
        'Forme : be + verbe en -ing. I am working, « je suis en train de travailler ».',
        'Un e final tombe : make devient making.',
        'Une consonne finale se double parfois : stop devient stopping.',
        'Négation et question suivent les règles de be.',
      ],
      tables: [
        {
          headers: ['Forme', 'Exemple'],
          rows: [
            ['Affirmation', 'She is reading.'],
            ['Négation', 'She is not reading.'],
            ['Question', 'Is she reading?'],
          ],
        },
      ],
      examples: [
        ['I am reading a book.', 'Je lis un livre en ce moment.'],
        ['They are not sleeping.', 'Ils ne dorment pas.'],
      ],
      questions: [
        choose('I ___ reading a book now.', 'am', ['is', 'do'], 'Je lis un livre en ce moment.', 'Be, accordé avec I, puis -ing.'),
        choose('She is ___ to the station.', 'going', ['go', 'goes'], 'Elle va à la gare.', 'Après be, le verbe prend -ing.'),
        complete('They ___ (eat) now.', ['are eating'], 'Ils mangent en ce moment.', 'Are + eating.'),
        complete('He ___ (work) today.', ['is working'], 'Il travaille aujourd\'hui.', 'Is + working.'),
        transform(NEGATIVE, 'We are sleeping.', ['We are not sleeping'], 'Nous ne dormons pas.', 'Not se place après be.'),
        transform(QUESTION, 'You are waiting.', ['Are you waiting?'], 'Attends-tu ?', 'Be passe devant le sujet.'),
      ],
    }),
  ],
  'en-travel': [
    grammar('en-g-can-must', 'Can et must', 'A1', {
      intro: 'Can exprime la capacité ou la permission, must l\'obligation.',
      points: [
        'Ils ne changent jamais : pas de -s avec he ou she.',
        'Le verbe suivant reste à la base, sans to : she can swim.',
        'Négation : cannot, ou can\'t. Question : Can you help me?',
        'Must not exprime une interdiction.',
      ],
      tables: [
        {
          headers: ['Forme', 'Exemple'],
          rows: [
            ['Affirmation', 'She can drive.'],
            ['Négation', 'She cannot drive.'],
            ['Question', 'Can she drive?'],
            ['Obligation', 'You must stop.'],
          ],
        },
      ],
      examples: [
        ['I can speak English.', 'Je sais parler anglais.'],
        ['You must show your passport.', 'Tu dois montrer ton passeport.'],
      ],
      questions: [
        choose('I ___ swim.', 'can', ['cans', 'to can'], 'Je sais nager.', 'Can ne change jamais.'),
        choose('She can ___ German.', 'speak', ['speaks', 'to speak'], 'Elle sait parler allemand.', 'Après can, verbe à la base sans to.'),
        transform(NEGATIVE, 'He can drive.', ['He cannot drive'], 'Il ne sait pas conduire.', 'Cannot en un seul mot, ou can\'t.'),
        transform(QUESTION, 'You can help me.', ['Can you help me?'], 'Peux-tu m\'aider ?', 'Can passe devant le sujet, sans do.'),
        choose('You ___ show your passport.', 'must', ['musts', 'can to'], 'Tu dois montrer ton passeport.', 'Must ne prend jamais de -s.'),
        spot('You must stop here.', ['You must to stop here.', 'You musts stop here.'], 'Après must, pas de to.'),
      ],
    }),
    grammar('en-g-simple-continuous', 'Présent simple ou continu ?', 'A2', {
      intro: 'Le français n\'a qu\'un présent, l\'anglais en a deux. Le choix dépend du sens.',
      points: [
        'Présent simple : habitude, vérité générale. Mots repères : every day, usually, always.',
        'Présent continu : action en cours. Mots repères : now, today, look!, listen!',
        'Certains verbes d\'état restent au simple : like, want, know.',
      ],
      tables: [
        {
          headers: ['Présent simple', 'Présent continu'],
          rows: [
            ['I work every day.', 'I am working now.'],
            ['She drinks tea.', 'She is drinking tea.'],
          ],
        },
      ],
      examples: [
        ['I usually work at eight.', 'Je travaille habituellement à huit heures.'],
        ['Look, it is raining!', 'Regarde, il pleut !'],
      ],
      questions: [
        choose('I usually ___ at eight.', 'work', ['am working', 'works'], 'Je travaille habituellement à huit heures.', 'Usually indique une habitude.'),
        choose('Look! It ___.', 'is raining', ['rains', 'rain'], 'Regarde ! Il pleut.', 'Look! indique une action en cours.'),
        choose('She ___ tea every day.', 'drinks', ['is drinking', 'drink'], 'Elle boit du thé tous les jours.', 'Every day indique une habitude.'),
        choose('Be quiet, I ___ on the phone.', 'am speaking', ['speak', 'speaks'], 'Silence, je suis au téléphone.', 'L\'action se déroule maintenant.'),
        complete('Tom is in the kitchen. He ___ (cook) now.', ['is cooking'], 'Tom est dans la cuisine. Il cuisine en ce moment.', 'Now demande le continu.'),
        complete('We ___ (go) to the gym every Monday.', ['go'], 'Nous allons à la salle tous les lundis.', 'Every Monday demande le simple.'),
      ],
    }),
  ],
};

export const englishLaterUnits: Unit[] = [
  {
    id: 'en-past',
    title: 'Hier',
    description: 'Raconter ce qui s\'est passé',
    level: 'A2',
    tip: {
      title: 'Le prétérit',
      points: [
        'Le prétérit raconte un événement terminé, à un moment précis : yesterday, last week, in 2020.',
        'Il traduit le plus souvent notre passé composé : I worked, « j\'ai travaillé ».',
        'Sa forme est la même à toutes les personnes, sauf pour be.',
      ],
      examples: [
        ['I worked yesterday.', 'J\'ai travaillé hier.'],
        ['We went to London last year.', 'Nous sommes allés à Londres l\'année dernière.'],
        ['She was at home.', 'Elle était à la maison.'],
      ],
    },
    lessons: [
      vocab(
        'en-past-when',
        'Quand ?',
        [
          w('last night', 'hier soir'),
          w('last week', 'la semaine dernière'),
          w('last year', "l'année dernière"),
          w('ago', 'il y a'),
          w('then', 'ensuite'),
          w('before', 'avant'),
          w('after', 'après'),
          w('finally', 'finalement'),
        ],
        [
          s('I saw Tom last week.', "J'ai vu Tom la semaine dernière."),
          s('We arrived two days ago.', 'Nous sommes arrivés il y a deux jours.'),
          s('She called me last night.', "Elle m'a appelé hier soir."),
          s('I ate, then I went to bed.', 'J\'ai mangé, ensuite je suis allé me coucher.'),
          s('He left after dinner.', 'Il est parti après le dîner.'),
          s('We finally found the hotel.', "Nous avons finalement trouvé l'hôtel."),
        ],
      ),
      vocab(
        'en-past-memories',
        'Souvenirs',
        [
          w('holiday', 'vacances', 'vacation'),
          w('beach', 'plage'),
          w('mountain', 'montagne'),
          w('photo', 'photo', 'picture'),
          w('film', 'film', 'movie'),
          w('concert', 'concert'),
          w('party', 'fête'),
          w('trip', 'voyage'),
        ],
        [
          s('We went to the beach.', 'Nous sommes allés à la plage.'),
          s('I took a lot of photos.', "J'ai pris beaucoup de photos."),
          s('The film was very good.', 'Le film était très bon.'),
          s('Did you like the concert?', 'As-tu aimé le concert ?'),
          s('The party was great.', 'La fête était géniale.'),
          s('It was a long trip.', "C'était un long voyage."),
        ],
      ),
      grammar('en-g-past-be', 'Le prétérit de to be', 'A2', {
        intro: 'Au passé, be a deux formes : was et were.',
        points: [
          'I, he, she et it prennent was. You, we et they prennent were.',
          'Négation : was not, were not, ou wasn\'t, weren\'t.',
          'Question : on inverse. Were you at home?',
        ],
        tables: [
          {
            headers: ['Sujet', 'Forme', 'Négation'],
            rows: [
              ['I, he, she, it', 'was', "wasn't"],
              ['you, we, they', 'were', "weren't"],
            ],
          },
        ],
        examples: [
          ['I was at home yesterday.', 'J\'étais à la maison hier.'],
          ['Were you at the party?', 'Étais-tu à la fête ?'],
        ],
        questions: [
          choose('I ___ tired yesterday.', 'was', ['were', 'am'], 'J\'étais fatigué hier.', 'Avec I, au passé : was.'),
          choose('They ___ at the beach.', 'were', ['was', 'are'], 'Ils étaient à la plage.', 'Avec they, au passé : were.'),
          transform(PAST, 'She is at home.', ['She was at home'], 'Elle était à la maison.', 'Is devient was.'),
          transform(PAST, 'We are happy.', ['We were happy'], 'Nous étions heureux.', 'Are devient were.'),
          transform(NEGATIVE, 'It was expensive.', ['It was not expensive'], 'Ce n\'était pas cher.', 'Was not, ou wasn\'t.'),
          transform(QUESTION, 'You were at the party.', ['Were you at the party?'], 'Étais-tu à la fête ?', 'Were passe devant le sujet.'),
        ],
      }),
      grammar('en-g-past-regular', 'Les verbes réguliers au prétérit', 'A2', {
        intro: 'La majorité des verbes forment leur prétérit avec -ed, à toutes les personnes.',
        points: [
          'Work devient worked, play devient played.',
          'Un e final reçoit seulement -d : live devient lived.',
          'Consonne + y devient -ied : study devient studied.',
          'Une consonne finale peut doubler : stop devient stopped.',
        ],
        tables: [
          {
            headers: ['Base', 'Prétérit'],
            rows: [
              ['work', 'worked'],
              ['live', 'lived'],
              ['study', 'studied'],
              ['stop', 'stopped'],
            ],
          },
        ],
        examples: [
          ['I worked in London.', 'J\'ai travaillé à Londres.'],
          ['She studied German.', 'Elle a étudié l\'allemand.'],
        ],
        questions: [
          complete('I ___ (work) in London last year.', ['worked'], 'J\'ai travaillé à Londres l\'année dernière.', 'Work + ed.'),
          complete('She ___ (live) in Paris.', ['lived'], 'Elle a habité à Paris.', 'Live se termine par e : on ajoute -d.'),
          complete('We ___ (study) English.', ['studied'], 'Nous avons étudié l\'anglais.', 'Le y devient ied.'),
          complete('The bus ___ (stop) here.', ['stopped'], 'Le bus s\'est arrêté ici.', 'Le p est doublé.'),
          transform(PAST, 'They play football.', ['They played football'], 'Ils ont joué au football.', 'Play + ed.'),
          transform(PAST, 'He visits his mother.', ['He visited his mother'], 'Il a rendu visite à sa mère.', 'Le -s disparaît, on ajoute -ed.'),
        ],
      }),
      grammar('en-g-past-irregular', 'Les verbes irréguliers au prétérit', 'A2', {
        intro: 'Les verbes les plus courants sont irréguliers. Il faut les apprendre par cœur.',
        points: [
          'La forme ne change pas selon le sujet : I went, she went.',
          'L\'onglet Conjugaison du carnet permet de tous les travailler.',
        ],
        tables: [
          {
            headers: ['Base', 'Prétérit', 'Sens'],
            rows: [
              ['go', 'went', 'aller'],
              ['see', 'saw', 'voir'],
              ['eat', 'ate', 'manger'],
              ['take', 'took', 'prendre'],
              ['buy', 'bought', 'acheter'],
              ['have', 'had', 'avoir'],
              ['do', 'did', 'faire'],
              ['say', 'said', 'dire'],
            ],
          },
        ],
        examples: [
          ['We went to the beach.', 'Nous sommes allés à la plage.'],
          ['She bought a coat.', 'Elle a acheté un manteau.'],
        ],
        questions: [
          choose('We ___ to London last week.', 'went', ['goed', 'go'], 'Nous sommes allés à Londres la semaine dernière.', 'Go devient went.'),
          choose('I ___ Tom yesterday.', 'saw', ['seed', 'see'], 'J\'ai vu Tom hier.', 'See devient saw.'),
          complete('She ___ (buy) a coat.', ['bought'], 'Elle a acheté un manteau.', 'Buy devient bought.'),
          complete('He ___ (eat) a cake.', ['ate'], 'Il a mangé un gâteau.', 'Eat devient ate.'),
          transform(PAST, 'I take the train.', ['I took the train'], 'J\'ai pris le train.', 'Take devient took.'),
          transform(PAST, 'We have a good time.', ['We had a good time'], 'Nous avons passé un bon moment.', 'Have devient had.'),
        ],
      }),
      grammar('en-g-past-questions', 'Did : questions et négation au passé', 'A2', {
        intro: 'Au prétérit, questions et négations se forment avec did, à toutes les personnes.',
        points: [
          'Question : Did you see Tom?',
          'Négation : I did not see Tom, ou didn\'t.',
          'Après did, le verbe revient à la base : did you go, pas did you went.',
          'Exception : be n\'utilise jamais did.',
        ],
        tables: [
          {
            headers: ['Forme', 'Exemple'],
            rows: [
              ['Affirmation', 'She went home.'],
              ['Négation', 'She did not go home.'],
              ['Question', 'Did she go home?'],
            ],
          },
        ],
        examples: [
          ['Did you like the film?', 'As-tu aimé le film ?'],
          ["We didn't go to the party.", 'Nous ne sommes pas allés à la fête.'],
        ],
        questions: [
          choose('___ you see the film?', 'Did', ['Do', 'Was'], 'As-tu vu le film ?', 'Question au passé : did.'),
          choose('She did not ___ the bus.', 'take', ['took', 'takes'], 'Elle n\'a pas pris le bus.', 'Après did not, le verbe reste à la base.'),
          transform(NEGATIVE, 'I went to the concert.', ['I did not go to the concert'], 'Je ne suis pas allé au concert.', 'Went redevient go après did not.'),
          transform(NEGATIVE, 'He bought a car.', ['He did not buy a car'], 'Il n\'a pas acheté de voiture.', 'Bought redevient buy.'),
          transform(QUESTION, 'You liked the party.', ['Did you like the party?'], 'As-tu aimé la fête ?', 'Liked redevient like.'),
          spot('Did she go home?', ['Did she went home?', 'Went she home?'], 'Une seule marque du passé : did.'),
        ],
      }),
      dialogue(
        'en-past-dialogue',
        'Les vacances',
        'Tom raconte ses vacances à Anna.',
        [
          line('Anna', 'Hi Tom! Where were you last week?', 'Salut Tom ! Où étais-tu la semaine dernière ?'),
          line('Tom', 'I was on holiday in Scotland.', 'J\'étais en vacances en Écosse.'),
          line('Anna', 'Really? What did you do there?', 'Vraiment ? Qu\'as-tu fait là-bas ?'),
          line('Tom', 'We visited Edinburgh and we walked in the mountains.', 'Nous avons visité Édimbourg et marché dans les montagnes.'),
          line('Anna', 'Did you take any photos?', 'As-tu pris des photos ?'),
          line('Tom', 'Yes, but it rained a lot, and I lost my phone!', 'Oui, mais il a beaucoup plu, et j\'ai perdu mon téléphone !'),
          line('Anna', 'Oh no! Did you find it?', 'Oh non ! L\'as-tu retrouvé ?'),
          line('Tom', 'Yes, it was in my suitcase.', 'Oui, il était dans ma valise.'),
        ],
        [
          q('Où était Tom ?', 'En Écosse', 'En Allemagne', 'À Londres'),
          q('Où était son téléphone ?', 'Dans sa valise', 'À l\'hôtel', 'À la plage'),
        ],
      ),
    ],
  },
  {
    id: 'en-future',
    title: 'Demain',
    description: 'Parler de ses projets et prévoir',
    level: 'A2',
    tip: {
      title: 'Deux façons de parler du futur',
      points: [
        'Going to exprime un projet déjà décidé.',
        'Will exprime une décision prise sur le moment, une promesse ou une prévision.',
        'Le présent continu peut aussi désigner un rendez-vous fixé.',
      ],
      examples: [
        ['I am going to learn German.', 'Je vais apprendre l\'allemand.'],
        ['I will help you.', 'Je vais t\'aider.'],
        ['It will rain tomorrow.', 'Il pleuvra demain.'],
      ],
    },
    lessons: [
      vocab(
        'en-future-plans',
        'Les projets',
        [
          w('next week', 'la semaine prochaine'),
          w('next year', "l'année prochaine"),
          w('soon', 'bientôt'),
          w('later', 'plus tard'),
          w('plan', 'projet'),
          w('job', 'emploi'),
          w('exam', 'examen'),
          w('dream', 'rêve'),
        ],
        [
          s('I am going to change my job.', 'Je vais changer de travail.'),
          s('We will see you soon.', 'Nous te verrons bientôt.'),
          s('What are your plans for next week?', 'Quels sont tes projets pour la semaine prochaine ?'),
          s('I have an exam next year.', "J'ai un examen l'année prochaine."),
          s('I will call you later.', "Je t'appellerai plus tard."),
          s('My dream is to visit Canada.', 'Mon rêve est de visiter le Canada.'),
        ],
      ),
      vocab(
        'en-future-weather',
        'La météo',
        [
          w('rain', 'pluie'),
          w('sun', 'soleil'),
          w('snow', 'neige'),
          w('wind', 'vent'),
          w('cloud', 'nuage'),
          w('hot', 'chaud'),
          w('cold', 'froid'),
          w('warm', 'doux, tiède'),
        ],
        [
          s('It is very cold today.', 'Il fait très froid aujourd\'hui.'),
          s('It will rain tomorrow.', 'Il pleuvra demain.'),
          s('There is a lot of snow.', 'Il y a beaucoup de neige.'),
          s('The sun is shining.', 'Le soleil brille.'),
          s('It is going to be hot.', 'Il va faire chaud.'),
          s('There are many clouds.', 'Il y a beaucoup de nuages.'),
        ],
      ),
      grammar('en-g-going-to', 'Le futur avec going to', 'A2', {
        intro: 'Going to exprime une intention ou un projet décidé à l\'avance.',
        points: [
          'Forme : be + going to + verbe à la base.',
          'Il sert aussi à prévoir ce qui est visible : look at the clouds, it is going to rain.',
          'Négation et question suivent les règles de be.',
        ],
        tables: [
          {
            headers: ['Forme', 'Exemple'],
            rows: [
              ['Affirmation', 'I am going to travel.'],
              ['Négation', 'I am not going to travel.'],
              ['Question', 'Are you going to travel?'],
            ],
          },
        ],
        examples: [
          ['She is going to buy a car.', 'Elle va acheter une voiture.'],
          ['Are you going to come?', 'Vas-tu venir ?'],
        ],
        questions: [
          choose('I ___ going to study tonight.', 'am', ['is', 'will'], 'Je vais étudier ce soir.', 'Be s\'accorde avec I.'),
          choose('She is going to ___ a car.', 'buy', ['buys', 'bought'], 'Elle va acheter une voiture.', 'Après going to, verbe à la base.'),
          complete('We ___ going to visit Berlin.', ['are'], 'Nous allons visiter Berlin.', 'Are avec we.'),
          transform('Exprime un projet avec going to', 'I work tomorrow.', ['I am going to work tomorrow'], 'Je vais travailler demain.', 'Am going to + work.'),
          transform(NEGATIVE, 'He is going to come.', ['He is not going to come'], 'Il ne va pas venir.', 'Not après be.'),
          transform(QUESTION, 'You are going to stay.', ['Are you going to stay?'], 'Vas-tu rester ?', 'Be passe devant le sujet.'),
        ],
      }),
      grammar('en-g-will', 'Le futur avec will', 'A2', {
        intro: 'Will sert à prévoir, promettre ou décider sur le moment.',
        points: [
          'Forme : will + verbe à la base, à toutes les personnes.',
          'Contraction : I\'ll, you\'ll, she\'ll.',
          'Négation : will not, ou won\'t.',
        ],
        tables: [
          {
            headers: ['Forme', 'Exemple'],
            rows: [
              ['Affirmation', 'She will come.'],
              ['Négation', "She won't come."],
              ['Question', 'Will she come?'],
            ],
          },
        ],
        examples: [
          ['I will call you tomorrow.', 'Je t\'appellerai demain.'],
          ["It won't be easy.", 'Ce ne sera pas facile.'],
        ],
        questions: [
          choose('I ___ call you tomorrow.', 'will', ['am', 'do'], 'Je t\'appellerai demain.', 'Promesse : will.'),
          choose('She will ___ next week.', 'come', ['comes', 'to come'], 'Elle viendra la semaine prochaine.', 'Après will, verbe à la base.'),
          transform(NEGATIVE, 'It will rain.', ['It will not rain'], 'Il ne pleuvra pas.', 'Will not, ou won\'t.'),
          transform(QUESTION, 'You will help me.', ['Will you help me?'], 'M\'aideras-tu ?', 'Will passe devant le sujet.'),
          transform('Mets au futur avec will', 'We see Tom.', ['We will see Tom'], 'Nous verrons Tom.', 'Will + base.'),
          choose('The phone is ringing. I ___ answer it.', 'will', ['am going to', 'am'], 'Le téléphone sonne. Je vais répondre.', 'Décision prise sur le moment : will.'),
        ],
      }),
      dialogue(
        'en-future-dialogue',
        'Les projets d\'Anna',
        'Anna parle de son avenir avec Tom.',
        [
          line('Tom', 'What are you going to do next year?', 'Que vas-tu faire l\'année prochaine ?'),
          line('Anna', 'I am going to work in Berlin.', 'Je vais travailler à Berlin.'),
          line('Tom', 'Wow! Do you speak German?', 'Waouh ! Tu parles allemand ?'),
          line('Anna', 'A little. I am going to take lessons.', 'Un peu. Je vais prendre des cours.'),
          line('Tom', 'It will be cold there in winter.', 'Il fera froid là-bas en hiver.'),
          line('Anna', 'I know. I will buy a warm coat!', 'Je sais. J\'achèterai un manteau chaud !'),
          line('Tom', 'I will visit you, I promise.', 'Je viendrai te voir, je te le promets.'),
        ],
        [
          q('Où Anna va-t-elle travailler ?', 'À Berlin', 'À Londres', 'À Paris'),
          q('Que promet Tom ?', 'De lui rendre visite', 'De prendre des cours', 'D\'acheter un manteau'),
        ],
      ),
    ],
  },
  {
    id: 'en-experience',
    title: 'Mes expériences',
    description: 'Parler de son parcours et de ce qu\'on a déjà fait',
    level: 'A2',
    tip: {
      title: 'Le present perfect',
      points: [
        'Il relie le passé au présent : une expérience de vie, ou une situation qui dure encore.',
        'Il ne traduit pas toujours notre passé composé.',
        'C\'est le temps le plus difficile pour un francophone : le moment précis décide de tout.',
      ],
      examples: [
        ['I have been to London.', 'Je suis déjà allé à Londres.'],
        ['She has lived here for two years.', 'Elle habite ici depuis deux ans.'],
        ['We have never seen snow.', 'Nous n\'avons jamais vu de neige.'],
      ],
    },
    lessons: [
      vocab(
        'en-experience-words',
        'Déjà, jamais',
        [
          w('never', 'jamais'),
          w('ever', 'déjà (question)'),
          w('already', 'déjà'),
          w('yet', 'encore, déjà (fin de phrase)'),
          w('just', 'venir de'),
          w('since', 'depuis (un moment)'),
          w('for', 'depuis (une durée)'),
          w('recently', 'récemment'),
        ],
        [
          s('I have never been to Canada.', "Je ne suis jamais allé au Canada."),
          s('Have you ever eaten fish and chips?', 'As-tu déjà mangé du fish and chips ?'),
          s('She has already left.', 'Elle est déjà partie.'),
          s('I have not finished yet.', "Je n'ai pas encore fini."),
          s('We have just arrived.', 'Nous venons d\'arriver.'),
          s('I have lived here since March.', "J'habite ici depuis mars."),
        ],
      ),
      vocab(
        'en-experience-work',
        'Au travail',
        [
          w('boss', 'patron'),
          w('colleague', 'collègue'),
          w('meeting', 'réunion'),
          w('email', 'e-mail'),
          w('project', 'mission, dossier'),
          w('salary', 'salaire'),
          w('interview', 'entretien'),
          w('company', 'entreprise'),
        ],
        [
          s('I have a meeting at ten.', "J'ai une réunion à dix heures."),
          s('My boss is on holiday.', 'Mon patron est en vacances.'),
          s('I sent the email yesterday.', "J'ai envoyé l'e-mail hier."),
          s('She works for a big company.', 'Elle travaille pour une grande entreprise.'),
          s('I have an interview tomorrow.', "J'ai un entretien demain."),
          s('My colleagues are very nice.', 'Mes collègues sont très gentils.'),
        ],
      ),
      grammar('en-g-perfect', 'Le present perfect', 'A2', {
        intro: 'Forme : have ou has + participe passé.',
        points: [
          'Il sert à parler d\'une expérience, sans dire quand : I have seen this film.',
          'Le participe passé des verbes réguliers est identique au prétérit : worked.',
          'Beaucoup de verbes courants ont un participe irrégulier : seen, gone, done, eaten.',
        ],
        tables: [
          {
            headers: ['Base', 'Prétérit', 'Participe passé'],
            rows: [
              ['work', 'worked', 'worked'],
              ['go', 'went', 'gone'],
              ['see', 'saw', 'seen'],
              ['eat', 'ate', 'eaten'],
              ['do', 'did', 'done'],
              ['write', 'wrote', 'written'],
            ],
          },
        ],
        examples: [
          ['I have seen this film.', 'J\'ai déjà vu ce film.'],
          ['She has finished her work.', 'Elle a fini son travail.'],
        ],
        questions: [
          choose('I ___ seen this film.', 'have', ['has', 'am'], 'J\'ai vu ce film.', 'I prend have.'),
          choose('She ___ finished her work.', 'has', ['have', 'is'], 'Elle a fini son travail.', 'She prend has.'),
          complete('We have ___ (eat) here before.', ['eaten'], 'Nous avons déjà mangé ici.', 'Participe de eat : eaten.'),
          complete('He has ___ (write) a book.', ['written'], 'Il a écrit un livre.', 'Participe de write : written.'),
          transform(NEGATIVE, 'I have finished.', ['I have not finished'], 'Je n\'ai pas fini.', 'Not après have.'),
          transform(QUESTION, 'You have seen Tom.', ['Have you seen Tom?'], 'As-tu vu Tom ?', 'Have passe devant le sujet.'),
        ],
      }),
      grammar('en-g-perfect-past', 'Present perfect ou prétérit ?', 'A2', {
        intro: 'La question à se poser : le moment est-il précisé et terminé ?',
        points: [
          'Moment précis et terminé : prétérit. Yesterday, last week, in 2020, two days ago.',
          'Aucun moment précis, ou période pas terminée : present perfect. Ever, never, already, today.',
          'On peut enchaîner : I have been to London. I went there in 2020.',
        ],
        tables: [
          {
            headers: ['Prétérit', 'Present perfect'],
            rows: [
              ['I saw him yesterday.', 'I have seen him.'],
              ['She left last week.', 'She has already left.'],
            ],
          },
        ],
        examples: [
          ['I went to London in 2020.', 'Je suis allé à Londres en 2020.'],
          ['I have been to London.', 'Je suis déjà allé à Londres.'],
        ],
        questions: [
          choose('I ___ Tom yesterday.', 'saw', ['have seen', 'see'], 'J\'ai vu Tom hier.', 'Yesterday est un moment précis.'),
          choose('Have you ever ___ to Italy?', 'been', ['went', 'go'], 'Es-tu déjà allé en Italie ?', 'Ever appelle le present perfect.'),
          choose('She ___ to Paris in 2019.', 'went', ['has gone', 'goes'], 'Elle est allée à Paris en 2019.', 'In 2019 est un moment précis.'),
          choose('We ___ never eaten sushi.', 'have', ['did', 'were'], 'Nous n\'avons jamais mangé de sushis.', 'Never appelle le present perfect.'),
          complete('Two years ago, I ___ (live) in Rome.', ['lived'], 'Il y a deux ans, j\'habitais à Rome.', 'Ago appelle le prétérit.'),
          spot('I saw this film last week.', ['I have seen this film last week.', 'I have saw this film last week.'], 'Last week est précis : prétérit obligatoire.'),
        ],
      }),
      grammar('en-g-since-for', 'Since et for', 'A2', {
        intro: '« Depuis » se dit since ou for, avec le present perfect.',
        points: [
          'Le français utilise le présent, l\'anglais le present perfect : j\'habite ici depuis deux ans, I have lived here for two years.',
          'For + une durée : for two years, for a week.',
          'Since + un point de départ : since 2020, since Monday.',
        ],
        tables: [
          {
            headers: ['For (durée)', 'Since (point de départ)'],
            rows: [
              ['for two hours', 'since eight o\'clock'],
              ['for a week', 'since Monday'],
              ['for ten years', 'since 2015'],
            ],
          },
        ],
        examples: [
          ['I have lived here for two years.', 'J\'habite ici depuis deux ans.'],
          ['She has worked here since 2020.', 'Elle travaille ici depuis 2020.'],
        ],
        questions: [
          choose('I have lived here ___ two years.', 'for', ['since', 'ago'], 'J\'habite ici depuis deux ans.', 'Deux ans est une durée.'),
          choose('She has worked here ___ 2020.', 'since', ['for', 'ago'], 'Elle travaille ici depuis 2020.', '2020 est un point de départ.'),
          choose('We ___ here since Monday.', 'have been', ['are', 'were'], 'Nous sommes ici depuis lundi.', 'Avec since, present perfect, pas présent.'),
          complete('He has been sick ___ a week.', ['for'], 'Il est malade depuis une semaine.', 'Une semaine est une durée.'),
          complete('I have known Anna ___ January.', ['since'], 'Je connais Anna depuis janvier.', 'Janvier est un point de départ.'),
          spot('I have known her for ten years.', ['I know her since ten years.', 'I am knowing her for ten years.'], 'Depuis se traduit par have + participe, et une durée par for.'),
        ],
      }),
      dialogue(
        'en-experience-dialogue',
        "L'entretien",
        'Anna passe un entretien d\'embauche.',
        [
          line('Boss', 'Good morning, Anna. Have you worked in a big company before?', 'Bonjour, Anna. Avez-vous déjà travaillé dans une grande entreprise ?'),
          line('Anna', 'Yes, I have. I worked in London for two years.', 'Oui. J\'ai travaillé à Londres pendant deux ans.'),
          line('Boss', 'And what do you do now?', 'Et que faites-vous maintenant ?'),
          line('Anna', 'I have been a teacher since 2023.', 'Je suis professeure depuis 2023.'),
          line('Boss', 'Have you ever lived abroad?', 'Avez-vous déjà vécu à l\'étranger ?'),
          line('Anna', 'Yes, I lived in England when I was a student.', 'Oui, j\'ai vécu en Angleterre quand j\'étais étudiante.'),
          line('Boss', 'Very good. We will call you next week.', 'Très bien. Nous vous appellerons la semaine prochaine.'),
        ],
        [
          q('Combien de temps Anna a-t-elle travaillé à Londres ?', 'Deux ans', 'Dix ans', 'Six mois'),
          q('Que fait Anna depuis 2023 ?', 'Elle est professeure', 'Elle est étudiante', 'Elle est médecin'),
        ],
      ),
    ],
  },
  {
    id: 'en-explain',
    title: 'Raconter et convaincre',
    description: 'Comparer, donner son avis, relier ses idées',
    level: 'B1',
    tip: {
      title: 'Construire des phrases plus longues',
      points: [
        'Relie tes idées avec because, but, so, when et if.',
        'Pour comparer, -er ou more. Pour le plus haut degré, -est ou most.',
        'À ce niveau, le but est de nuancer, pas seulement de se faire comprendre.',
      ],
      examples: [
        ['I stayed at home because it was raining.', 'Je suis resté à la maison parce qu\'il pleuvait.'],
        ['If it rains, we will stay here.', 'S\'il pleut, nous resterons ici.'],
        ['This hotel is cheaper than that one.', 'Cet hôtel est moins cher que celui-là.'],
      ],
    },
    lessons: [
      vocab(
        'en-explain-opinion',
        'Donner son avis',
        [
          w('to think', 'penser', 'think'),
          w('to agree', 'être d\'accord', 'agree'),
          w('maybe', 'peut-être', 'perhaps'),
          w('because', 'parce que'),
          w('although', 'bien que'),
          w('important', 'important'),
          w('difficult', 'difficile', 'hard'),
          w('easy', 'facile'),
        ],
        [
          s('I think this is a good idea.', "Je pense que c'est une bonne idée."),
          s('I do not agree with you.', 'Je ne suis pas d\'accord avec toi.'),
          s('Maybe you are right.', 'Tu as peut-être raison.'),
          s('English is not difficult.', "L'anglais n'est pas difficile."),
          s('It is important to practise.', "Il est important de s'entraîner."),
          s('I like it because it is easy.', "Je l'aime parce que c'est facile."),
        ],
      ),
      vocab(
        'en-explain-world',
        'Le monde autour',
        [
          w('news', 'actualités'),
          w('life', 'vie'),
          w('people', 'gens'),
          w('world', 'monde'),
          w('problem', 'problème'),
          w('solution', 'solution'),
          w('reason', 'raison'),
          w('choice', 'choix'),
        ],
        [
          s('Did you see the news?', 'As-tu vu les actualités ?'),
          s('Life is short.', 'La vie est courte.'),
          s('People are very kind here.', 'Les gens sont très gentils ici.'),
          s('This is a big problem.', "C'est un gros problème."),
          s('We need a solution.', "Nous avons besoin d'une solution."),
          s('You have no choice.', "Tu n'as pas le choix."),
        ],
      ),
      grammar('en-g-compare', 'Comparatif et superlatif', 'A2', {
        intro: 'Les adjectifs courts prennent -er et -est, les longs more et most.',
        points: [
          'Court : cheap, cheaper, the cheapest.',
          'Long : expensive, more expensive, the most expensive.',
          'Le « que » de comparaison se dit than.',
          'Irréguliers : good, better, the best. Bad, worse, the worst.',
          'Égalité : as big as, « aussi grand que ».',
        ],
        tables: [
          {
            headers: ['Adjectif', 'Comparatif', 'Superlatif'],
            rows: [
              ['cheap', 'cheaper', 'the cheapest'],
              ['big', 'bigger', 'the biggest'],
              ['expensive', 'more expensive', 'the most expensive'],
              ['good', 'better', 'the best'],
              ['bad', 'worse', 'the worst'],
            ],
          },
        ],
        examples: [
          ['This hotel is cheaper than that one.', 'Cet hôtel est moins cher que celui-là.'],
          ['This is the best film of the year.', 'C\'est le meilleur film de l\'année.'],
        ],
        questions: [
          choose('London is ___ than Paris.', 'bigger', ['more big', 'biggest'], 'Londres est plus grande que Paris.', 'Adjectif court : -er, avec une consonne doublée.'),
          choose('This coat is ___ than that one.', 'more expensive', ['expensiver', 'most expensive'], 'Ce manteau est plus cher que celui-là.', 'Adjectif long : more.'),
          choose('This is the ___ film of the year.', 'best', ['better', 'goodest'], 'C\'est le meilleur film de l\'année.', 'Superlatif irrégulier de good.'),
          complete('Tom is taller ___ Paul.', ['than'], 'Tom est plus grand que Paul.', 'Que se dit than, pas that.'),
          complete('Today is ___ (bad) than yesterday.', ['worse'], 'Aujourd\'hui est pire qu\'hier.', 'Comparatif irrégulier de bad.'),
          order('Elle est aussi grande que moi.', 'She is as tall as me', ['than', 'more'], 'Égalité : as + adjectif + as.'),
        ],
      }),
      grammar('en-g-should', 'Should et have to', 'B1', {
        intro: 'Should donne un conseil, have to exprime une obligation extérieure.',
        points: [
          'Should ne change pas : she should rest.',
          'Have to se conjugue : I have to, she has to, I had to.',
          'Do not have to veut dire « ne pas être obligé de », pas « ne pas devoir ».',
          'Must not exprime une interdiction.',
          'May laisse la chose ouverte : we may come, nous viendrons peut-être. Cela n\'engage à rien.',
        ],
        tables: [
          {
            headers: ['Forme', 'Sens'],
            rows: [
              ['You should rest.', 'Tu devrais te reposer.'],
              ['You have to pay.', 'Tu dois payer.'],
              ['You do not have to pay.', 'Tu n\'es pas obligé de payer.'],
              ['You must not smoke.', 'Tu ne dois pas fumer.'],
            ],
          },
        ],
        examples: [
          ['You should see a doctor.', 'Tu devrais voir un médecin.'],
          ['I had to work yesterday.', 'J\'ai dû travailler hier.'],
        ],
        questions: [
          choose('You look tired. You ___ rest.', 'should', ['shoulds', 'have'], 'Tu as l\'air fatigué. Tu devrais te reposer.', 'Conseil : should, sans -s.'),
          choose('She ___ work on Sunday.', 'has to', ['have to', 'should to'], 'Elle doit travailler le dimanche.', 'Have to se conjugue : has to.'),
          choose('You ___ pay, it is free.', 'do not have to', ['must not', 'should'], 'Tu n\'es pas obligé de payer, c\'est gratuit.', 'Absence d\'obligation : do not have to.'),
          choose('You ___ smoke here, it is forbidden.', 'must not', ['do not have to', 'should'], 'Tu ne dois pas fumer ici, c\'est interdit.', 'Interdiction : must not.'),
          transform(PAST, 'I have to work.', ['I had to work'], 'J\'ai dû travailler.', 'Must n\'a pas de passé : on utilise had to.'),
          complete('You ___ see a doctor.', ['should'], 'Tu devrais voir un médecin.', 'Un conseil : should.'),
        ],
      }),
      grammar('en-g-past-continuous', 'Le prétérit continu', 'B1', {
        intro: 'Il décrit une action en cours à un moment du passé. Il correspond souvent à notre imparfait.',
        points: [
          'Forme : was ou were + verbe en -ing.',
          'Il sert de décor à un événement au prétérit : I was sleeping when the phone rang.',
          'When introduit l\'événement, while l\'action en cours.',
        ],
        tables: [
          {
            headers: ['Sujet', 'Forme'],
            rows: [
              ['I, he, she, it', 'was working'],
              ['you, we, they', 'were working'],
            ],
          },
        ],
        examples: [
          ['I was sleeping when the phone rang.', 'Je dormais quand le téléphone a sonné.'],
          ['It was raining all day.', 'Il a plu toute la journée.'],
        ],
        questions: [
          choose('I ___ sleeping when you called.', 'was', ['were', 'am'], 'Je dormais quand tu as appelé.', 'Avec I : was + -ing.'),
          choose('They were ___ dinner.', 'eating', ['eat', 'ate'], 'Ils étaient en train de dîner.', 'Après were : -ing.'),
          complete('She ___ (read) when I arrived.', ['was reading'], 'Elle lisait quand je suis arrivé.', 'Action en cours : was reading.'),
          complete('We ___ (walk) when it started to rain.', ['were walking'], 'Nous marchions quand il a commencé à pleuvoir.', 'Action en cours : were walking.'),
          choose('I was cooking when the phone ___.', 'rang', ['was ringing', 'rings'], 'Je cuisinais quand le téléphone a sonné.', 'Événement ponctuel : prétérit simple.'),
          spot('While I was walking, I saw Tom.', ['While I walked, I was seeing Tom.', 'While I am walking, I saw Tom.'], 'While pour l\'action en cours, prétérit pour l\'événement.'),
        ],
      }),
      grammar('en-g-conditional', 'If et le futur', 'B1', {
        intro: 'If exprime une condition possible. Attention : pas de will juste après if.',
        points: [
          'Forme : if + présent, puis will + verbe.',
          'If it rains, we will stay. Comme en français : s\'il pleut, nous resterons.',
          'Pour une hypothèse irréelle : if + prétérit, puis would. If I had money, I would travel.',
          'Would se contracte en \'d.',
          'Subject to… veut dire « sous réserve de » : une condition vague, qui n\'engage à rien.',
          'Would you… ? demande poliment : would you open the door?',
        ],
        tables: [
          {
            headers: ['Situation', 'Si...', 'Alors...'],
            rows: [
              ['Possible', 'If it rains,', 'we will stay.'],
              ['Imaginaire', 'If it rained,', 'we would stay.'],
            ],
          },
        ],
        examples: [
          ['If you study, you will pass the exam.', 'Si tu étudies, tu réussiras l\'examen.'],
          ['If I had time, I would help you.', 'Si j\'avais le temps, je t\'aiderais.'],
        ],
        questions: [
          choose('If it ___, we will stay at home.', 'rains', ['will rain', 'rained'], 'S\'il pleut, nous resterons à la maison.', 'Après if, on met le présent.'),
          choose('If you study, you ___ the exam.', 'will pass', ['pass will', 'would passed'], 'Si tu étudies, tu réussiras l\'examen.', 'La conséquence prend will.'),
          choose('If I had money, I ___ travel.', 'would', ['will', 'did'], 'Si j\'avais de l\'argent, je voyagerais.', 'Hypothèse irréelle : would.'),
          complete('If she ___ (come), I will be happy.', ['comes'], 'Si elle vient, je serai content.', 'Présent après if.'),
          complete('If I ___ (have) time, I would help you.', ['had'], 'Si j\'avais le temps, je t\'aiderais.', 'Prétérit pour une hypothèse.'),
          spot('I will call you if I see him.', ['I will call you if I will see him.', 'I call you if I will see him.'], 'Jamais de will juste après if.'),
        ],
      }),
      grammar('en-g-connectors', 'Relier ses idées', 'B1', {
        intro: 'Quelques mots suffisent à passer de phrases isolées à un vrai discours.',
        points: [
          'Because donne la cause, so la conséquence.',
          'But oppose deux idées, although les relie : bien que.',
          'When et before, after situent dans le temps.',
          'That peut relier deux phrases : I think that he is right. On l\'omet souvent.',
          'So that donne le but : pour que. Then marque la suite : puis, ensuite.',
        ],
        tables: [
          {
            headers: ['Mot', 'Sens', 'Exemple'],
            rows: [
              ['because', 'parce que', 'I stayed because it rained.'],
              ['so', 'donc', 'It rained, so I stayed.'],
              ['but', 'mais', 'It is small but nice.'],
              ['although', 'bien que', 'Although it rained, we went out.'],
              ['when', 'quand', 'Call me when you arrive.'],
            ],
          },
        ],
        examples: [
          ['It rained, so we stayed at home.', 'Il a plu, donc nous sommes restés à la maison.'],
          ['Although it was late, we went out.', 'Bien qu\'il fût tard, nous sommes sortis.'],
        ],
        questions: [
          choose('I stayed at home ___ I was sick.', 'because', ['so', 'but'], 'Je suis resté à la maison parce que j\'étais malade.', 'Cause : because.'),
          choose('I was sick, ___ I stayed at home.', 'so', ['because', 'although'], 'J\'étais malade, donc je suis resté à la maison.', 'Conséquence : so.'),
          choose('___ it was late, we went out.', 'Although', ['So', 'Because'], 'Bien qu\'il fût tard, nous sommes sortis.', 'Opposition : although.'),
          complete('The hotel is small ___ very nice.', ['but'], 'L\'hôtel est petit mais très agréable.', 'Opposition simple : but.'),
          complete('Call me ___ you arrive.', ['when'], 'Appelle-moi quand tu arrives.', 'Moment : when.'),
          order('Je pense qu\'il a raison.', 'I think that he is right', ['have', 'because'], 'On dit « être juste » : he is right.'),
        ],
      }),
      dialogue(
        'en-explain-dialogue',
        'Quelle ville choisir ?',
        'Anna et Tom choisissent où passer leurs vacances.',
        [
          line('Anna', 'I think we should go to Rome. It is cheaper than London.', 'Je pense que nous devrions aller à Rome. C\'est moins cher que Londres.'),
          line('Tom', 'Maybe, but Berlin is the most interesting city.', 'Peut-être, mais Berlin est la ville la plus intéressante.'),
          line('Anna', 'I do not agree. Rome has better food!', 'Je ne suis pas d\'accord. Rome a une meilleure cuisine !'),
          line('Tom', 'That is true. If we go in May, it will be warm.', 'C\'est vrai. Si nous y allons en mai, il fera doux.'),
          line('Anna', 'I was reading about a small hotel when you called.', 'Je lisais des informations sur un petit hôtel quand tu as appelé.'),
          line('Tom', 'Although I prefer Berlin, you are right. Let us choose Rome.', 'Bien que je préfère Berlin, tu as raison. Choisissons Rome.'),
        ],
        [
          q('Pourquoi Anna préfère-t-elle Rome ?', 'C\'est moins cher et on y mange mieux', 'Elle y a vécu', 'Il y fait froid'),
          q('Que décident-ils ?', 'D\'aller à Rome', 'D\'aller à Berlin', 'De rester à Londres'),
        ],
      ),
    ],
  },
];
