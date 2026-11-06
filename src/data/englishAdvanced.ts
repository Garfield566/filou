import type { Unit } from '../types';
import { choose, complete, dialogue, grammar, line, order, q, s, spot, transform, vocab, w } from './build';

const PASSIVE = 'Mets à la voix passive';
const REPORT = 'Rapporte cette phrase';
const REWRITE = 'Reformule en commençant comme indiqué';

export const englishAdvancedUnits: Unit[] = [
  {
    id: 'en-b1-stories',
    title: 'Raconter une histoire',
    description: 'Organiser un récit au passé, dire ce qui a changé',
    level: 'B1',
    tip: {
      title: 'Situer les événements dans le temps',
      points: [
        'Le past perfect marque ce qui s\'est passé avant un autre moment du passé.',
        'Used to décrit une habitude passée qui n\'existe plus.',
        'La voix passive met l\'accent sur l\'action plutôt que sur son auteur.',
      ],
      examples: [
        ['When I arrived, the train had left.', 'Quand je suis arrivé, le train était parti.'],
        ['I used to live in Rome.', 'J\'habitais à Rome avant.'],
        ['The bridge was built in 1900.', 'Le pont a été construit en 1900.'],
      ],
    },
    lessons: [
      vocab(
        'en-b1-stories-story',
        'Le fil du récit',
        [
          w('suddenly', 'soudain'),
          w('meanwhile', 'pendant ce temps'),
          w('eventually', 'finalement'),
          w('at first', "d'abord"),
          w('in the end', 'à la fin'),
          w('unfortunately', 'malheureusement'),
          w('luckily', 'heureusement', 'fortunately'),
          w('actually', 'en fait'),
        ],
        [
          s('Suddenly, the lights went out.', 'Soudain, les lumières se sont éteintes.'),
          s('At first, I did not recognise her.', "D'abord, je ne l'ai pas reconnue."),
          s('Eventually, they found a solution.', 'Ils ont fini par trouver une solution.'),
          s('Luckily, nobody was hurt.', "Heureusement, personne n'a été blessé."),
          s('Actually, I have never met him.', 'En fait, je ne l\'ai jamais rencontré.'),
          s('In the end, we stayed at home.', 'À la fin, nous sommes restés à la maison.'),
        ],
      ),
      vocab(
        'en-b1-stories-feelings',
        'Les émotions',
        [
          w('proud', 'fier'),
          w('embarrassed', 'gêné'),
          w('relieved', 'soulagé'),
          w('disappointed', 'déçu'),
          w('worried', 'inquiet'),
          w('excited', 'enthousiaste'),
          w('jealous', 'jaloux'),
          w('grateful', 'reconnaissant'),
        ],
        [
          s('I am very proud of you.', 'Je suis très fier de toi.'),
          s('She was embarrassed by the question.', 'La question l\'a gênée.'),
          s('We were relieved to see him.', 'Nous étions soulagés de le voir.'),
          s('He seemed disappointed with the result.', 'Il semblait déçu du résultat.'),
          s('I am worried about the exam.', "Je m'inquiète pour l'examen."),
          s('I am grateful for your help.', 'Je te suis reconnaissant de ton aide.'),
        ],
      ),
      grammar('en-g-past-perfect', 'Le past perfect', 'B1', {
        intro: 'Il équivaut souvent au plus-que-parfait : une action antérieure à un autre moment du passé.',
        points: [
          'Forme : had + participe passé, à toutes les personnes.',
          'Il s\'associe souvent à when, before, after, by the time.',
          'Sans lui, deux actions au prétérit se suivent dans l\'ordre du récit.',
          'Contraction : I\'d, she\'d. Attention, \'d peut aussi être would.',
        ],
        tables: [
          {
            headers: ['Phrase', 'Sens'],
            rows: [
              ['When I arrived, she left.', 'Elle part après mon arrivée.'],
              ['When I arrived, she had left.', 'Elle était déjà partie.'],
            ],
          },
        ],
        examples: [
          ['I had never seen the sea before.', 'Je n\'avais jamais vu la mer auparavant.'],
          ['By the time we arrived, the film had started.', 'Quand nous sommes arrivés, le film avait commencé.'],
        ],
        questions: [
          choose('When I got home, she ___ to bed.', 'had gone', ['has gone', 'goes'], 'Quand je suis rentré, elle était allée se coucher.', 'L\'action précède « got home ».'),
          choose('I ___ never seen snow before that trip.', 'had', ['have', 'was'], 'Je n\'avais jamais vu de neige avant ce voyage.', 'Before that trip situe dans le passé : had.'),
          complete('By the time we arrived, the film ___ (start).', ['had started'], 'Quand nous sommes arrivés, le film avait commencé.', 'By the time appelle ici le past perfect.'),
          complete('He was tired because he ___ (work) all day.', ['had worked'], 'Il était fatigué car il avait travaillé toute la journée.', 'La cause est antérieure.'),
          transform('Mets au past perfect', 'She finished her work.', ['She had finished her work'], 'Elle avait fini son travail.', 'Had + participe.'),
          spot('After he had eaten, he went out.', ['After he has eaten, he went out.', 'After he had ate, he went out.'], 'Had + participe : eaten.'),
        ],
      }),
      grammar('en-g-used-to', 'Used to et would', 'B1', {
        intro: 'Used to exprime ce qui était vrai autrefois et ne l\'est plus.',
        points: [
          'Forme : used to + base, à toutes les personnes.',
          'Négation et question : did not use to, did you use to.',
          'Would peut décrire une action répétée, mais jamais un état : I would walk, pas I would live.',
          'À distinguer de be used to + -ing, « avoir l\'habitude de ».',
        ],
        tables: [
          {
            headers: ['Forme', 'Sens'],
            rows: [
              ['I used to smoke.', 'Je fumais avant.'],
              ['I am used to working late.', 'J\'ai l\'habitude de travailler tard.'],
              ['I got used to it.', 'Je m\'y suis habitué.'],
            ],
          },
        ],
        examples: [
          ['We used to live in Lyon.', 'Nous habitions à Lyon autrefois.'],
          ['I am used to getting up early.', 'J\'ai l\'habitude de me lever tôt.'],
        ],
        questions: [
          choose('I ___ to play tennis, but I stopped.', 'used', ['use', 'am used'], 'Je jouais au tennis, mais j\'ai arrêté.', 'Habitude révolue : used to.'),
          choose('Did you ___ to live here?', 'use', ['used', 'using'], 'Habitais-tu ici avant ?', 'Après did, on écrit use.'),
          choose('I am used to ___ early.', 'getting up', ['get up', 'got up'], 'J\'ai l\'habitude de me lever tôt.', 'Be used to est suivi de -ing.'),
          choose('When I was a child, we ___ in a small house.', 'used to live', ['would live', 'were living'], 'Enfant, nous habitions une petite maison.', 'Un état : pas de would.'),
          transform('Exprime la même idée avec used to', 'He smoked before, but not now.', ['He used to smoke'], 'Il fumait avant.', 'Used to résume le changement.'),
          spot('She did not use to like coffee.', ['She did not used to like coffee.', 'She not used to like coffee.'], 'Après did not : use.'),
        ],
      }),
      grammar('en-g-passive', 'La voix passive', 'B1', {
        intro: 'Le sujet subit l\'action. On l\'utilise quand l\'auteur est inconnu ou sans intérêt.',
        points: [
          'Forme : be au temps voulu + participe passé.',
          'L\'auteur s\'introduit avec by, s\'il est utile.',
          'Le français préfère souvent « on » : English is spoken here, « on parle anglais ici ».',
        ],
        tables: [
          {
            headers: ['Temps', 'Exemple'],
            rows: [
              ['Présent', 'The room is cleaned.'],
              ['Prétérit', 'The room was cleaned.'],
              ['Present perfect', 'The room has been cleaned.'],
              ['Futur', 'The room will be cleaned.'],
              ['Modal', 'The room must be cleaned.'],
            ],
          },
        ],
        examples: [
          ['English is spoken here.', 'On parle anglais ici.'],
          ['The bridge was built in 1900.', 'Le pont a été construit en 1900.'],
        ],
        questions: [
          choose('This book ___ written in 1990.', 'was', ['is', 'has'], 'Ce livre a été écrit en 1990.', 'Date passée : was + participe.'),
          choose('The results will be ___ tomorrow.', 'published', ['publish', 'publishing'], 'Les résultats seront publiés demain.', 'Be + participe.'),
          transform(PASSIVE, 'They clean the office every day.', ['The office is cleaned every day'], 'Le bureau est nettoyé tous les jours.', 'L\'objet devient sujet.'),
          transform(PASSIVE, 'Someone stole my bike.', ['My bike was stolen'], 'On m\'a volé mon vélo.', 'Stole devient was stolen, sans auteur.'),
          complete('The letter has ___ sent.', ['been'], 'La lettre a été envoyée.', 'Has been + participe.'),
          spot('The meeting has been cancelled.', ['The meeting has cancelled.', 'The meeting is been cancelled.'], 'Have been + participe.'),
        ],
      }),
      dialogue(
        'en-b1-stories-dialogue',
        'Un voyage mouvementé',
        'Anna raconte à Tom son retour de vacances.',
        [
          line('Tom', 'You look exhausted. What happened?', 'Tu as l\'air épuisée. Que s\'est-il passé ?'),
          line('Anna', 'When I reached the airport, my flight had already left.', 'Quand je suis arrivée à l\'aéroport, mon vol était déjà parti.'),
          line('Tom', 'Oh no! Had you checked the time?', 'Oh non ! Avais-tu vérifié l\'heure ?'),
          line('Anna', 'I had, but the schedule had been changed.', 'Oui, mais l\'horaire avait été changé.'),
          line('Tom', 'I used to travel a lot, and that happened to me too.', 'Je voyageais beaucoup avant, et ça m\'est arrivé aussi.'),
          line('Anna', 'Luckily, I was given a seat on the next flight.', 'Heureusement, on m\'a donné une place sur le vol suivant.'),
          line('Tom', 'You must have been so relieved.', 'Tu as dû être tellement soulagée.'),
        ],
        [
          q('Pourquoi Anna a-t-elle raté son vol ?', "L'horaire avait été changé", 'Elle s\'était trompée de jour', 'Son taxi était en retard'),
          q('Qu\'a obtenu Anna ?', 'Une place sur le vol suivant', 'Un remboursement', 'Une nuit d\'hôtel'),
        ],
      ),
    ],
  },
  {
    id: 'en-b1-reported',
    title: 'Rapporter et préciser',
    description: 'Dire ce que quelqu\'un a dit, décrire avec précision',
    level: 'B1',
    tip: {
      title: 'Des phrases mieux construites',
      points: [
        'Au discours rapporté, le temps recule souvent d\'un cran.',
        'Les relatives précisent de qui ou de quoi on parle.',
        'Une question indirecte garde l\'ordre sujet + verbe.',
      ],
      examples: [
        ['She said that she was tired.', 'Elle a dit qu\'elle était fatiguée.'],
        ['The man who called is my boss.', 'L\'homme qui a appelé est mon patron.'],
        ['Do you know where he lives?', 'Sais-tu où il habite ?'],
      ],
    },
    lessons: [
      vocab(
        'en-b1-reported-media',
        'Les médias',
        [
          w('headline', 'gros titre'),
          w('article', 'article'),
          w('journalist', 'journaliste'),
          w('rumour', 'rumeur', 'rumor'),
          w('survey', 'sondage'),
          w('broadcast', 'émission'),
          w('source', 'source'),
          w('claim', 'affirmation'),
        ],
        [
          s('I read an interesting article yesterday.', "J'ai lu un article intéressant hier."),
          s('The headline was misleading.', 'Le gros titre était trompeur.'),
          s('There is a rumour about the company.', "Il y a une rumeur sur l'entreprise."),
          s('The survey shows a clear trend.', 'Le sondage montre une tendance nette.'),
          s('The journalist protected her source.', 'La journaliste a protégé sa source.'),
          s('This claim has not been proved.', "Cette affirmation n'a pas été prouvée."),
        ],
      ),
      vocab(
        'en-b1-reported-society',
        'La société',
        [
          w('government', 'gouvernement'),
          w('law', 'loi'),
          w('election', 'élection'),
          w('tax', 'impôt'),
          w('crime', 'criminalité'),
          w('unemployment', 'chômage'),
          w('rights', 'droits'),
          w('community', 'communauté'),
        ],
        [
          s('The government changed the law.', 'Le gouvernement a changé la loi.'),
          s('Who won the election?', "Qui a gagné l'élection ?"),
          s('Taxes are going up next year.', "Les impôts augmentent l'année prochaine."),
          s('Unemployment has fallen this year.', 'Le chômage a baissé cette année.'),
          s('Everyone has the same rights.', 'Tout le monde a les mêmes droits.'),
          s('Crime is a serious problem here.', 'La criminalité est un grave problème ici.'),
        ],
      ),
      grammar('en-g-reported', 'Le discours rapporté', 'B1', {
        intro: 'Quand le verbe introducteur est au passé, le temps de la phrase recule.',
        points: [
          'Présent devient prétérit, prétérit devient past perfect, will devient would, can devient could.',
          'Say s\'emploie sans complément, tell avec une personne : she told me.',
          'Les mots de temps changent : tomorrow devient the next day, here devient there.',
          'Ordre : told me that he was busy.',
        ],
        tables: [
          {
            headers: ['Paroles', 'Rapporté'],
            rows: [
              ['"I am tired."', 'She said she was tired.'],
              ['"I saw him."', 'She said she had seen him.'],
              ['"I will call."', 'She said she would call.'],
              ['"I can help."', 'She said she could help.'],
            ],
          },
        ],
        examples: [
          ['He told me that he was busy.', 'Il m\'a dit qu\'il était occupé.'],
          ['She said she would come.', 'Elle a dit qu\'elle viendrait.'],
        ],
        questions: [
          transform(REPORT, '"I am busy," he said.', ['He said he was busy', 'He said that he was busy'], 'Il a dit qu\'il était occupé.', 'Am devient was.'),
          transform(REPORT, '"I will call you," she said to me.', ['She told me she would call me', 'She told me that she would call me', 'She said she would call me'], 'Elle m\'a dit qu\'elle m\'appellerait.', 'Will devient would.'),
          transform(REPORT, '"We saw the film," they said.', ['They said they had seen the film', 'They said that they had seen the film'], 'Ils ont dit qu\'ils avaient vu le film.', 'Saw devient had seen.'),
          choose('She ___ me that she was leaving.', 'told', ['said', 'spoke'], 'Elle m\'a dit qu\'elle partait.', 'Tell est suivi de la personne.'),
          choose('He ___ that he could help.', 'said', ['told', 'told to'], 'Il a dit qu\'il pouvait aider.', 'Say sans complément de personne.'),
          spot('She told me she was tired.', ['She said me she was tired.', 'She told to me she was tired.'], 'Tell + personne, sans to.'),
        ],
      }),
      grammar('en-g-relatives', 'Les propositions relatives', 'B1', {
        intro: 'Who, which, that, whose et where relient deux idées.',
        points: [
          'Who pour une personne, which pour une chose, that pour les deux.',
          'Whose exprime la possession, where le lieu.',
          'Quand le relatif est complément, on peut l\'omettre : the book I read.',
          'Entre virgules, la relative ajoute une information : that y est interdit.',
        ],
        tables: [
          {
            headers: ['Mot', 'Emploi', 'Exemple'],
            rows: [
              ['who', 'personne', 'the man who called'],
              ['which', 'chose', 'the book which I read'],
              ['whose', 'possession', 'the girl whose father works here'],
              ['where', 'lieu', 'the town where I live'],
            ],
          },
        ],
        examples: [
          ['This is the woman who helped me.', 'Voici la femme qui m\'a aidé.'],
          ['That is the house where I was born.', 'C\'est la maison où je suis né.'],
        ],
        questions: [
          choose('The man ___ called you is my boss.', 'who', ['which', 'whose'], 'L\'homme qui t\'a appelé est mon patron.', 'Une personne : who.'),
          choose('This is the book ___ I told you about.', 'which', ['who', 'where'], 'Voici le livre dont je t\'ai parlé.', 'Une chose : which.'),
          choose('She has a friend ___ brother is famous.', 'whose', ['who', 'which'], 'Elle a une amie dont le frère est célèbre.', 'Possession : whose.'),
          choose('This is the town ___ I grew up.', 'where', ['which', 'who'], 'C\'est la ville où j\'ai grandi.', 'Lieu : where.'),
          order('Le film que nous avons vu était excellent.', 'The film we saw was excellent', ['who', 'it'], 'Le relatif complément s\'omet, sans reprendre it.'),
          spot('Paris, which I love, is expensive.', ['Paris, that I love, is expensive.', 'Paris, who I love, is expensive.'], 'Après une virgule, that est interdit.'),
        ],
      }),
      grammar('en-g-indirect-questions', 'Les questions indirectes', 'B1', {
        intro: 'Dans une question indirecte, on perd l\'inversion et le do.',
        points: [
          'Where is he? devient Do you know where he is?',
          'Question fermée : on utilise if ou whether.',
          'C\'est une forme polie : Could you tell me where the station is?',
          'Au passé : She asked me where I lived.',
        ],
        tables: [
          {
            headers: ['Directe', 'Indirecte'],
            rows: [
              ['Where does he live?', 'Do you know where he lives?'],
              ['Is she here?', 'I wonder if she is here.'],
              ['What time is it?', 'Could you tell me what time it is?'],
            ],
          },
        ],
        examples: [
          ['Could you tell me where the bank is?', 'Pourriez-vous me dire où est la banque ?'],
          ['She asked me if I was happy.', 'Elle m\'a demandé si j\'étais heureux.'],
        ],
        questions: [
          choose('Do you know where ___?', 'he lives', ['does he live', 'lives he'], 'Sais-tu où il habite ?', 'Ordre sujet + verbe, sans does.'),
          choose('Could you tell me what time ___?', 'it is', ['is it', 'does it'], 'Pourriez-vous me dire l\'heure ?', 'Pas d\'inversion.'),
          choose('I wonder ___ she will come.', 'if', ['that', 'what'], 'Je me demande si elle viendra.', 'Question fermée : if.'),
          transform('Commence par : Do you know', 'Where is the station?', ['Do you know where the station is?'], 'Sais-tu où est la gare ?', 'Is passe après le sujet.'),
          transform('Commence par : She asked me', 'Where do you work?', ['She asked me where I worked'], 'Elle m\'a demandé où je travaillais.', 'Sans do, et le temps recule.'),
          spot('I do not know what he wants.', ['I do not know what does he want.', 'I do not know what wants he.'], 'Pas de does dans une question indirecte.'),
        ],
      }),
      dialogue(
        'en-b1-reported-dialogue',
        'La rumeur',
        'Anna et Tom discutent d\'une nouvelle à leur travail.',
        [
          line('Anna', 'Did you hear the rumour that is going around?', 'As-tu entendu la rumeur qui circule ?'),
          line('Tom', 'No, what did people say?', 'Non, qu\'ont dit les gens ?'),
          line('Anna', 'Paul told me the company was going to close the Berlin office.', 'Paul m\'a dit que l\'entreprise allait fermer le bureau de Berlin.'),
          line('Tom', 'Who told him that?', 'Qui lui a dit ça ?'),
          line('Anna', 'A journalist who writes for the local paper.', 'Une journaliste qui écrit pour le journal local.'),
          line('Tom', 'Do you know if it has been confirmed?', 'Sais-tu si ça a été confirmé ?'),
          line('Anna', 'Not yet. The boss said she would explain everything on Friday.', 'Pas encore. La patronne a dit qu\'elle expliquerait tout vendredi.'),
        ],
        [
          q('Selon la rumeur, que va-t-il se passer ?', 'Le bureau de Berlin va fermer', 'Paul va partir', 'Les salaires vont augmenter'),
          q('Quand la patronne s\'expliquera-t-elle ?', 'Vendredi', 'Demain', 'Le mois prochain'),
        ],
      ),
    ],
  },
  {
    id: 'en-b2-hypothesis',
    title: 'Et si...',
    description: 'Imaginer un autre passé, exprimer un regret, déduire',
    level: 'B2',
    tip: {
      title: 'Parler de ce qui n\'a pas eu lieu',
      points: [
        'L\'anglais utilise le passé pour marquer l\'irréel.',
        'If I had known, I would have come : les deux parties sont au passé irréel.',
        'Must have, can\'t have et might have expriment une déduction sur le passé.',
      ],
      examples: [
        ['If I had known, I would have come.', 'Si j\'avais su, je serais venu.'],
        ['I wish I had more time.', 'J\'aimerais avoir plus de temps.'],
        ['She must have forgotten.', 'Elle a dû oublier.'],
      ],
    },
    lessons: [
      vocab(
        'en-b2-hypothesis-choices',
        'Choix et conséquences',
        [
          w('regret', 'regret'),
          w('consequence', 'conséquence'),
          w('opportunity', 'occasion'),
          w('mistake', 'erreur'),
          w('outcome', 'résultat'),
          w('to hesitate', 'hésiter', 'hesitate'),
          w('to afford', 'avoir les moyens de', 'afford'),
          w('to avoid', 'éviter', 'avoid'),
        ],
        [
          s('I have no regrets about leaving.', 'Je ne regrette pas d\'être parti.'),
          s('You must accept the consequences.', 'Tu dois accepter les conséquences.'),
          s('It was a great opportunity.', "C'était une belle occasion."),
          s('We cannot afford a new car.', "Nous n'avons pas les moyens d'acheter une voiture neuve."),
          s('Do not hesitate to call me.', "N'hésite pas à m'appeler."),
          s('I try to avoid driving at night.', "J'essaie d'éviter de conduire la nuit."),
        ],
      ),
      vocab(
        'en-b2-hypothesis-money',
        "L'argent",
        [
          w('loan', 'prêt'),
          w('debt', 'dette'),
          w('mortgage', 'crédit immobilier'),
          w('investment', 'investissement'),
          w('budget', 'budget'),
          w('savings', 'économies'),
          w('income', 'revenu'),
          w('rent', 'loyer'),
        ],
        [
          s('We took out a loan to buy the house.', 'Nous avons contracté un prêt pour acheter la maison.'),
          s('He is deeply in debt.', 'Il est très endetté.'),
          s('The rent has gone up again.', 'Le loyer a encore augmenté.'),
          s('She spent all her savings.', 'Elle a dépensé toutes ses économies.'),
          s('It was a risky investment.', "C'était un investissement risqué."),
          s('We have to stick to the budget.', 'Nous devons respecter le budget.'),
        ],
      ),
      grammar('en-g-third-conditional', 'Le conditionnel passé', 'B2', {
        intro: 'Il imagine un passé différent de ce qui s\'est produit.',
        points: [
          'Forme : if + past perfect, would have + participe.',
          'Could have et might have nuancent la conséquence.',
          'Sans if, en style soutenu : Had I known, I would have come.',
          'Conditionnel mixte : if I had studied, I would be a doctor now.',
        ],
        tables: [
          {
            headers: ['Type', 'Exemple'],
            rows: [
              ['Passé irréel', 'If it had rained, we would have stayed.'],
              ['Mixte', 'If I had saved, I would be rich now.'],
              ['Soutenu', 'Had it rained, we would have stayed.'],
            ],
          },
        ],
        examples: [
          ['If she had asked, I would have helped.', 'Si elle avait demandé, j\'aurais aidé.'],
          ['If I had taken the job, I would live in Tokyo now.', 'Si j\'avais accepté le poste, je vivrais à Tokyo maintenant.'],
        ],
        questions: [
          choose('If I had known, I ___ you.', 'would have told', ['would tell', 'had told'], 'Si j\'avais su, je te l\'aurais dit.', 'Would have + participe.'),
          choose('If she ___ earlier, she would have caught the train.', 'had left', ['left', 'would have left'], 'Si elle était partie plus tôt, elle aurait attrapé le train.', 'Après if : past perfect.'),
          complete('If we had saved money, we ___ (can) have bought it.', ['could'], 'Si nous avions économisé, nous aurions pu l\'acheter.', 'Could have : possibilité.'),
          choose('If I had studied medicine, I ___ a doctor now.', 'would be', ['would have been', 'had been'], 'Si j\'avais étudié la médecine, je serais médecin maintenant.', 'Conséquence présente : would be.'),
          transform('Exprime le regret avec If', 'I did not know, so I did not come.', ['If I had known, I would have come'], 'Si j\'avais su, je serais venu.', 'On inverse la réalité.'),
          order('Si j\'avais su, je serais resté.', 'Had I known I would have stayed', ['if', 'did'], 'Inversion sans if.'),
        ],
      }),
      grammar('en-g-wish', 'Wish et if only', 'B2', {
        intro: 'Ils expriment un souhait ou un regret, avec un temps décalé vers le passé.',
        points: [
          'Situation présente à changer : wish + prétérit.',
          'Regret sur le passé : wish + past perfect.',
          'Agacement ou souhait pour l\'avenir : wish + would.',
          'Would rather + prétérit quand le sujet change : I would rather you stayed.',
        ],
        tables: [
          {
            headers: ['Sens', 'Forme', 'Exemple'],
            rows: [
              ['Présent', 'wish + prétérit', 'I wish I had a car.'],
              ['Passé', 'wish + past perfect', 'I wish I had studied.'],
              ['Agacement', 'wish + would', 'I wish you would stop.'],
            ],
          },
        ],
        examples: [
          ['I wish I lived near the sea.', 'J\'aimerais vivre près de la mer.'],
          ['If only I had listened to you.', 'Si seulement je t\'avais écouté.'],
        ],
        questions: [
          choose('I wish I ___ more time.', 'had', ['have', 'will have'], 'J\'aimerais avoir plus de temps.', 'Souhait sur le présent : prétérit.'),
          choose('I wish I ___ harder at school.', 'had worked', ['worked', 'would work'], 'Je regrette de ne pas avoir plus travaillé à l\'école.', 'Regret sur le passé : past perfect.'),
          choose('I wish you ___ making that noise.', 'would stop', ['stop', 'had stopped'], 'J\'aimerais que tu arrêtes ce bruit.', 'Agacement : would.'),
          complete('If only I ___ (listen) to you yesterday.', ['had listened'], 'Si seulement je t\'avais écouté hier.', 'Regret passé.'),
          transform('Exprime le regret avec I wish', 'I do not speak Spanish.', ['I wish I spoke Spanish'], 'J\'aimerais parler espagnol.', 'Prétérit pour le présent.'),
          choose('I would rather you ___ here.', 'stayed', ['stay', 'will stay'], 'Je préférerais que tu restes ici.', 'Would rather + autre sujet : prétérit.'),
        ],
      }),
      grammar('en-g-deduction', 'La déduction', 'B2', {
        intro: 'Les modaux expriment le degré de certitude.',
        points: [
          'Must : presque sûr que oui. Can\'t : presque sûr que non.',
          'May, might et could : c\'est possible.',
          'Au passé : modal + have + participe.',
          'Attention, must not n\'exprime pas la déduction négative.',
        ],
        tables: [
          {
            headers: ['Certitude', 'Présent', 'Passé'],
            rows: [
              ['Sûr que oui', 'He must be tired.', 'He must have been tired.'],
              ['Possible', 'He might be tired.', 'He might have been tired.'],
              ['Sûr que non', 'He can\'t be tired.', 'He can\'t have been tired.'],
            ],
          },
        ],
        examples: [
          ['She must have missed the train.', 'Elle a dû rater le train.'],
          ['He cannot have said that.', 'Il n\'a pas pu dire cela.'],
        ],
        questions: [
          choose('He has been working all day. He ___ be tired.', 'must', ['can\'t', 'should not'], 'Il a travaillé toute la journée. Il doit être fatigué.', 'Déduction positive : must.'),
          choose('She just ate. She ___ be hungry.', 'cannot', ['must not', 'must'], 'Elle vient de manger. Elle ne peut pas avoir faim.', 'Déduction négative : cannot.'),
          choose('She ___ have missed the train, I am not sure.', 'might', ['must', 'can'], 'Elle a peut-être raté le train, je ne suis pas sûr.', 'Possibilité : might.'),
          complete('The lights are off. They must ___ left.', ['have'], 'Les lumières sont éteintes. Ils ont dû partir.', 'Must have + participe.'),
          complete('He cannot have ___ (say) that.', ['said'], 'Il n\'a pas pu dire cela.', 'Have + participe.'),
          spot('You must have been very tired.', ['You must been very tired.', 'You must to have been very tired.'], 'Must have + participe.'),
        ],
      }),
      dialogue(
        'en-b2-hypothesis-dialogue',
        'Le poste à Tokyo',
        'Tom se demande s\'il a fait le bon choix.',
        [
          line('Tom', 'I sometimes wish I had accepted that job in Tokyo.', 'J\'aimerais parfois avoir accepté ce poste à Tokyo.'),
          line('Anna', 'You must have had a good reason to refuse.', 'Tu as dû avoir une bonne raison de refuser.'),
          line('Tom', 'I was afraid. If I had gone, I would be earning twice as much now.', 'J\'avais peur. Si j\'y étais allé, je gagnerais deux fois plus maintenant.'),
          line('Anna', 'Maybe, but you would not have met your wife.', 'Peut-être, mais tu n\'aurais pas rencontré ta femme.'),
          line('Tom', 'That is true. I could not afford this flat, though.', 'C\'est vrai. Mais je n\'aurais pas les moyens de ce logement autrement.'),
          line('Anna', 'If only we knew how things would have turned out!', 'Si seulement nous savions comment les choses auraient tourné !'),
        ],
        [
          q('Pourquoi Tom a-t-il refusé le poste ?', 'Il avait peur', 'Le salaire était trop bas', 'Sa femme a refusé'),
          q('Selon Anna, qu\'aurait-il manqué ?', 'La rencontre avec sa femme', 'Un meilleur salaire', 'Une promotion'),
        ],
      ),
    ],
  },
  {
    id: 'en-b2-work',
    title: 'Le monde professionnel',
    description: 'Parler de carrière et utiliser les verbes à particule',
    level: 'B2',
    tip: {
      title: 'Des tournures plus naturelles',
      points: [
        'Have something done indique qu\'on fait faire quelque chose.',
        'Certains verbes demandent -ing, d\'autres to, et le sens peut changer.',
        'Les verbes à particule sont partout à l\'oral : give up, find out.',
      ],
      examples: [
        ['I had my car repaired.', 'J\'ai fait réparer ma voiture.'],
        ['I stopped smoking.', 'J\'ai arrêté de fumer.'],
        ['It is said that he is rich.', 'On dit qu\'il est riche.'],
      ],
    },
    lessons: [
      vocab(
        'en-b2-work-career',
        'La carrière',
        [
          w('deadline', 'date limite'),
          w('to negotiate', 'négocier', 'negotiate'),
          w('to hire', 'embaucher', 'hire'),
          w('to resign', 'démissionner', 'resign'),
          w('promotion', 'promotion'),
          w('skills', 'compétences'),
          w('workload', 'charge de travail'),
          w('feedback', 'retour'),
        ],
        [
          s('We are going to miss the deadline.', 'Nous allons rater la date limite.'),
          s('She decided to resign last month.', 'Elle a décidé de démissionner le mois dernier.'),
          s('He got a promotion after two years.', 'Il a obtenu une promotion au bout de deux ans.'),
          s('They hired three new engineers.', 'Ils ont embauché trois nouveaux ingénieurs.'),
          s('My workload is too heavy.', 'Ma charge de travail est trop lourde.'),
          s('I would appreciate your feedback.', "J'apprécierais d'avoir ton retour."),
        ],
      ),
      vocab(
        'en-b2-work-phrasal',
        'Les verbes à particule',
        [
          w('to carry on', 'continuer', 'carry on'),
          w('to give up', 'abandonner', 'give up'),
          w('to look forward to', 'avoir hâte de', 'look forward to'),
          w('to put off', 'reporter', 'put off'),
          w('to turn down', 'refuser', 'turn down'),
          w('to find out', 'découvrir', 'find out'),
          w('to set up', 'créer, monter', 'set up'),
          w('to run out of', 'manquer de', 'run out of'),
        ],
        [
          s('Do not give up now.', 'N\'abandonne pas maintenant.'),
          s('I look forward to meeting you.', "J'ai hâte de vous rencontrer."),
          s('They put off the meeting until Monday.', 'Ils ont reporté la réunion à lundi.'),
          s('She turned down the offer.', "Elle a refusé l'offre."),
          s('We ran out of time.', 'Nous avons manqué de temps.'),
          s('He set up his own company.', 'Il a créé sa propre entreprise.'),
        ],
      ),
      grammar('en-g-causative', 'Faire faire : have et get', 'B2', {
        intro: 'Pour dire qu\'on confie une tâche à quelqu\'un, l\'anglais utilise have + objet + participe.',
        points: [
          'I had my hair cut : quelqu\'un m\'a coupé les cheveux.',
          'Get est plus familier : I got my car washed.',
          'Avec une personne : have someone do, get someone to do.',
          'Sens négatif possible : she had her bag stolen.',
        ],
        tables: [
          {
            headers: ['Forme', 'Exemple'],
            rows: [
              ['have + objet + participe', 'I had my car repaired.'],
              ['get + objet + participe', 'I got my car repaired.'],
              ['have + personne + base', 'I had him fix it.'],
              ['get + personne + to + base', 'I got him to fix it.'],
            ],
          },
        ],
        examples: [
          ['I am having my flat painted.', 'Je fais repeindre mon appartement.'],
          ['She had her phone stolen.', 'Elle s\'est fait voler son téléphone.'],
        ],
        questions: [
          choose('I had my hair ___ yesterday.', 'cut', ['cutting', 'to cut'], 'Je me suis fait couper les cheveux hier.', 'Have + objet + participe.'),
          choose('We are having the kitchen ___.', 'painted', ['paint', 'painting'], 'Nous faisons repeindre la cuisine.', 'Participe passé.'),
          choose('I got him ___ the car.', 'to fix', ['fix', 'fixed'], 'Je lui ai fait réparer la voiture.', 'Get + personne + to.'),
          transform('Dis que tu le fais faire', 'A mechanic repaired my car.', ['I had my car repaired', 'I got my car repaired'], 'J\'ai fait réparer ma voiture.', 'Have + objet + participe.'),
          complete('She had her bag ___ (steal).', ['stolen'], 'Elle s\'est fait voler son sac.', 'Participe de steal.'),
          spot('I need to have my eyes tested.', ['I need to have tested my eyes.', 'I need to have my eyes test.'], 'L\'objet se place avant le participe.'),
        ],
      }),
      grammar('en-g-gerund-infinitive', 'Verbe + -ing ou to', 'B2', {
        intro: 'Le verbe qui précède décide de la forme, et parfois du sens.',
        points: [
          'Avec -ing : enjoy, avoid, finish, mind, suggest, keep.',
          'Avec to : want, decide, hope, refuse, promise, manage.',
          'Après une préposition : toujours -ing.',
          'Stop, remember, forget et try changent de sens selon la forme.',
        ],
        tables: [
          {
            headers: ['Verbe', '+ -ing', '+ to'],
            rows: [
              ['stop', 'cesser de faire', 's\'arrêter pour faire'],
              ['remember', 'se souvenir d\'avoir fait', 'penser à faire'],
              ['try', 'essayer pour voir', 'tenter avec effort'],
            ],
          },
        ],
        examples: [
          ['I stopped smoking.', 'J\'ai arrêté de fumer.'],
          ['I stopped to smoke.', 'Je me suis arrêté pour fumer.'],
        ],
        questions: [
          choose('I enjoy ___ in the morning.', 'running', ['to run', 'run'], 'J\'aime courir le matin.', 'Enjoy + -ing.'),
          choose('She refused ___ the contract.', 'to sign', ['signing', 'sign'], 'Elle a refusé de signer le contrat.', 'Refuse + to.'),
          choose('He is good at ___ languages.', 'learning', ['to learn', 'learn'], 'Il est doué pour apprendre les langues.', 'Après at : -ing.'),
          choose('Remember ___ the door when you leave.', 'to lock', ['locking', 'lock'], 'Pense à fermer la porte en partant.', 'Une chose à faire : to.'),
          choose('I remember ___ him at the party.', 'seeing', ['to see', 'see'], 'Je me souviens de l\'avoir vu à la fête.', 'Un souvenir : -ing.'),
          complete('I look forward to ___ (hear) from you.', ['hearing'], 'J\'attends de tes nouvelles avec impatience.', 'To est ici une préposition.'),
        ],
      }),
      grammar('en-g-passive-reporting', 'On dit que...', 'B2', {
        intro: 'Le style journalistique évite « on » grâce à deux constructions passives.',
        points: [
          'It is said that he is rich.',
          'He is said to be rich : même sens, plus soutenu.',
          'Verbes concernés : say, believe, think, expect, report, know.',
          'Pour un fait passé : he is said to have left.',
        ],
        tables: [
          {
            headers: ['Forme', 'Exemple'],
            rows: [
              ['It is + participe + that', 'It is believed that she left.'],
              ['Sujet + be + participe + to', 'She is believed to have left.'],
            ],
          },
        ],
        examples: [
          ['It is believed that the fire started at night.', 'On pense que le feu a commencé la nuit.'],
          ['He is said to be very rich.', 'On dit qu\'il est très riche.'],
        ],
        questions: [
          choose('It ___ said that the company is in trouble.', 'is', ['has', 'does'], 'On dit que l\'entreprise est en difficulté.', 'It is said.'),
          choose('She is believed ___ left the country.', 'to have', ['having', 'to'], 'On pense qu\'elle a quitté le pays.', 'Fait passé : to have + participe.'),
          transform(REWRITE, 'People say that he is rich. (He is said...)', ['He is said to be rich'], 'On dit qu\'il est riche.', 'He is said to + base.'),
          transform(REWRITE, 'People think that she has left. (She is thought...)', ['She is thought to have left'], 'On pense qu\'elle est partie.', 'To have + participe.'),
          complete('The minister is expected ___ resign.', ['to'], 'On s\'attend à ce que le ministre démissionne.', 'Expected to.'),
          spot('He is known to be honest.', ['He is known being honest.', 'It is known him to be honest.'], 'Is known to be.'),
        ],
      }),
      dialogue(
        'en-b2-work-dialogue',
        'La négociation',
        'Anna négocie avec son patron.',
        [
          line('Anna', 'Thanks for seeing me. I would like to talk about my workload.', 'Merci de me recevoir. J\'aimerais parler de ma charge de travail.'),
          line('Boss', 'Of course. Is it the new project?', 'Bien sûr. Est-ce le nouveau projet ?'),
          line('Anna', 'Yes. We keep running out of time, and I have had to put off other tasks.', 'Oui. Nous manquons sans cesse de temps, et j\'ai dû reporter d\'autres tâches.'),
          line('Boss', 'I see. We are planning to hire someone in June.', 'Je vois. Nous prévoyons d\'embaucher quelqu\'un en juin.'),
          line('Anna', 'That would help. I also remember discussing a promotion.', 'Cela aiderait. Je me souviens aussi que nous avions parlé d\'une promotion.'),
          line('Boss', 'You are right. Your feedback has been excellent, so let us look at that.', 'Vous avez raison. Vos retours sont excellents, regardons cela.'),
        ],
        [
          q('Quel est le problème d\'Anna ?', 'Sa charge de travail', 'Son salaire', 'Un collègue'),
          q('Que prévoit le patron en juin ?', 'D\'embaucher quelqu\'un', 'De fermer le projet', 'De partir'),
        ],
      ),
    ],
  },
  {
    id: 'en-b2-argue',
    title: 'Argumenter',
    description: 'Défendre un point de vue, se projeter loin dans l\'avenir',
    level: 'B2',
    tip: {
      title: 'Structurer une argumentation',
      points: [
        'Les connecteurs de contraste ont chacun leur syntaxe.',
        'Le futur antérieur place une action comme terminée à un moment futur.',
        'Despite est suivi d\'un nom ou d\'un -ing, although d\'une proposition.',
      ],
      examples: [
        ['Despite the rain, we went out.', 'Malgré la pluie, nous sommes sortis.'],
        ['By 2030, we will have finished.', 'D\'ici 2030, nous aurons fini.'],
        ['It is cheap; however, it is slow.', 'C\'est bon marché ; cependant, c\'est lent.'],
      ],
    },
    lessons: [
      vocab(
        'en-b2-argue-linkers',
        'Les connecteurs',
        [
          w('however', 'cependant'),
          w('therefore', 'par conséquent'),
          w('moreover', 'de plus'),
          w('despite', 'malgré', 'in spite of'),
          w('whereas', 'tandis que'),
          w('nevertheless', 'néanmoins'),
          w('furthermore', 'en outre'),
          w('otherwise', 'sinon'),
        ],
        [
          s('It is expensive; however, it is worth it.', "C'est cher ; cependant, cela en vaut la peine."),
          s('He was ill; therefore, he stayed at home.', 'Il était malade ; par conséquent, il est resté chez lui.'),
          s('Despite the cost, we bought it.', "Malgré le coût, nous l'avons acheté."),
          s('She likes tea, whereas I prefer coffee.', 'Elle aime le thé, tandis que je préfère le café.'),
          s('Hurry up, otherwise we will be late.', 'Dépêche-toi, sinon nous serons en retard.'),
          s('The plan is risky; nevertheless, we will try.', 'Le plan est risqué ; néanmoins, nous essaierons.'),
        ],
      ),
      vocab(
        'en-b2-argue-planet',
        "L'environnement",
        [
          w('climate change', 'changement climatique'),
          w('pollution', 'pollution'),
          w('renewable energy', 'énergie renouvelable'),
          w('waste', 'déchets'),
          w('shortage', 'pénurie'),
          w('sustainable', 'durable'),
          w('threat', 'menace'),
          w('to reduce', 'réduire', 'reduce'),
        ],
        [
          s('Climate change affects everyone.', 'Le changement climatique touche tout le monde.'),
          s('We need to reduce our waste.', 'Nous devons réduire nos déchets.'),
          s('There is a water shortage in the region.', "Il y a une pénurie d'eau dans la région."),
          s('Pollution is a threat to health.', 'La pollution est une menace pour la santé.'),
          s('Is this model really sustainable?', 'Ce modèle est-il vraiment durable ?'),
          s('Renewable energy is getting cheaper.', "L'énergie renouvelable devient moins chère."),
        ],
      ),
      grammar('en-g-future-perfect', 'Futur antérieur et futur continu', 'B2', {
        intro: 'Deux futurs servent à se situer précisément dans l\'avenir.',
        points: [
          'Futur continu : will be + -ing, une action en cours à un moment futur.',
          'Futur antérieur : will have + participe, une action achevée avant un moment futur.',
          'By introduit l\'échéance : by Friday, by 2030.',
        ],
        tables: [
          {
            headers: ['Temps', 'Exemple', 'Sens'],
            rows: [
              ['Futur continu', 'I will be working at ten.', 'Je serai en train de travailler.'],
              ['Futur antérieur', 'I will have finished by ten.', 'J\'aurai fini.'],
            ],
          },
        ],
        examples: [
          ['This time tomorrow, I will be flying to Rome.', 'Demain à cette heure, je serai dans l\'avion pour Rome.'],
          ['By 2030, we will have reduced our waste.', 'D\'ici 2030, nous aurons réduit nos déchets.'],
        ],
        questions: [
          choose('By Friday, I ___ the report.', 'will have finished', ['will finish', 'am finishing'], 'D\'ici vendredi, j\'aurai fini le rapport.', 'By + échéance : futur antérieur.'),
          choose('This time tomorrow, we ___ on the beach.', 'will be lying', ['will lie', 'will have lain'], 'Demain à cette heure, nous serons allongés sur la plage.', 'Action en cours : futur continu.'),
          complete('By next year, she ___ (graduate).', ['will have graduated'], 'L\'année prochaine, elle aura obtenu son diplôme.', 'Will have + participe.'),
          complete('At ten o\'clock, I ___ (work).', ['will be working'], 'À dix heures, je serai en train de travailler.', 'Will be + -ing.'),
          choose('By 2030, scientists will ___ a solution.', 'have found', ['find', 'be find'], 'D\'ici 2030, les scientifiques auront trouvé une solution.', 'Will have + participe.'),
          spot('I will have left by the time you arrive.', ['I will have left by the time you will arrive.', 'I will leave by the time you will arrived.'], 'Après by the time, on met le présent.'),
        ],
      }),
      grammar('en-g-contrast', 'Exprimer le contraste', 'B2', {
        intro: 'Ces mots ont un sens proche, mais pas la même construction.',
        points: [
          'Although + sujet + verbe : although it rained.',
          'Despite ou in spite of + nom ou -ing : despite the rain.',
          'However commence une nouvelle phrase ou suit un point-virgule.',
          'Despite the fact that permet d\'utiliser une proposition.',
        ],
        tables: [
          {
            headers: ['Mot', 'Suivi de', 'Exemple'],
            rows: [
              ['although', 'proposition', 'Although it rained, we went.'],
              ['despite', 'nom ou -ing', 'Despite the rain, we went.'],
              ['in spite of', 'nom ou -ing', 'In spite of being ill, he came.'],
              ['however', 'nouvelle phrase', 'It rained. However, we went.'],
            ],
          },
        ],
        examples: [
          ['Despite being tired, she finished.', 'Malgré sa fatigue, elle a terminé.'],
          ['Although he was tired, he finished.', 'Bien qu\'il fût fatigué, il a terminé.'],
        ],
        questions: [
          choose('___ the rain, we went for a walk.', 'Despite', ['Although', 'However'], 'Malgré la pluie, nous sommes allés nous promener.', 'Devant un nom : despite.'),
          choose('___ it was raining, we went out.', 'Although', ['Despite', 'In spite of'], 'Bien qu\'il pleuve, nous sommes sortis.', 'Devant une proposition : although.'),
          choose('In spite of ___ tired, she finished.', 'being', ['she was', 'be'], 'Malgré sa fatigue, elle a terminé.', 'In spite of + -ing.'),
          transform(REWRITE, 'Although he was ill, he went to work. (Despite...)', ['Despite being ill, he went to work', 'Despite his illness, he went to work', 'Despite the fact that he was ill, he went to work'], 'Malgré sa maladie, il est allé travailler.', 'Despite + -ing.'),
          complete('It is expensive. ___, it is worth it.', ['However'], 'C\'est cher. Cependant, cela en vaut la peine.', 'Nouvelle phrase : however.'),
          spot('Despite the fact that it was late, we stayed.', ['Despite it was late, we stayed.', 'Despite of it was late, we stayed.'], 'Despite the fact that + proposition.'),
        ],
      }),
      grammar('en-g-mixed-relatives', 'Alléger ses phrases', 'B2', {
        intro: 'Un anglais fluide raccourcit les relatives et enchaîne les idées avec des participes.',
        points: [
          'Une relative active peut devenir -ing : the man sitting there.',
          'Une relative passive peut devenir un participe : the car stolen yesterday.',
          'Which peut reprendre toute une idée : he passed, which surprised me.',
          'Préposition en fin de phrase à l\'oral : the man I spoke to.',
        ],
        tables: [
          {
            headers: ['Longue', 'Courte'],
            rows: [
              ['the man who is sitting there', 'the man sitting there'],
              ['the car that was stolen', 'the car stolen'],
              ['the person to whom I spoke', 'the person I spoke to'],
            ],
          },
        ],
        examples: [
          ['The woman talking to Tom is my sister.', 'La femme qui parle à Tom est ma sœur.'],
          ['He passed the exam, which surprised everyone.', 'Il a réussi l\'examen, ce qui a surpris tout le monde.'],
        ],
        questions: [
          choose('The man ___ next to Anna is her father.', 'sitting', ['sat', 'sits'], 'L\'homme assis à côté d\'Anna est son père.', 'Relative active réduite : -ing.'),
          choose('The products ___ in this factory are excellent.', 'made', ['making', 'make'], 'Les produits fabriqués dans cette usine sont excellents.', 'Sens passif : participe.'),
          choose('He arrived late, ___ annoyed everyone.', 'which', ['that', 'what'], 'Il est arrivé en retard, ce qui a agacé tout le monde.', 'Which reprend toute la phrase.'),
          transform('Raccourcis la relative', 'The man who is talking is my boss.', ['The man talking is my boss'], 'L\'homme qui parle est mon patron.', 'On retire who is.'),
          transform('Raccourcis la relative', 'The car that was stolen was found.', ['The car stolen was found'], 'La voiture volée a été retrouvée.', 'On retire that was.'),
          spot('She is the person I spoke to.', ['She is the person I spoke to her.', 'She is the person which I spoke to.'], 'Pas de pronom repris à la fin.'),
        ],
      }),
      dialogue(
        'en-b2-argue-dialogue',
        'Un débat',
        'Anna et Tom débattent de la voiture en ville.',
        [
          line('Tom', 'I think cars should be banned from city centres.', 'Je pense qu\'il faudrait interdire les voitures dans les centres-villes.'),
          line('Anna', 'Although I agree in principle, shops would suffer.', 'Bien que je sois d\'accord sur le principe, les commerces en souffriraient.'),
          line('Tom', 'Despite that, pollution is a serious threat to health.', 'Malgré cela, la pollution est une grave menace pour la santé.'),
          line('Anna', 'True. However, public transport is not ready yet.', 'C\'est vrai. Cependant, les transports publics ne sont pas encore prêts.'),
          line('Tom', 'By 2030, the city will have built three new lines.', 'D\'ici 2030, la ville aura construit trois nouvelles lignes.'),
          line('Anna', 'Then we should wait; otherwise, people will simply be angry.', 'Alors il faudrait attendre ; sinon, les gens seront simplement en colère.'),
        ],
        [
          q('Que craint Anna ?', 'Que les commerces souffrent', 'Que le bus soit cher', 'Que Tom déménage'),
          q('Que propose finalement Anna ?', "D'attendre les nouvelles lignes", 'De ne rien interdire', 'De construire des parkings'),
        ],
      ),
    ],
  },
  {
    id: 'en-c1-style',
    title: 'Un style soutenu',
    description: 'Mettre en relief, écrire avec élégance',
    level: 'C1',
    tip: {
      title: 'Déplacer l\'accent',
      points: [
        'À ce niveau, l\'ordre des mots devient un outil de style.',
        'L\'inversion après une négation donne de la force.',
        'Les phrases clivées isolent l\'information importante.',
      ],
      examples: [
        ['Never have I seen such a mess.', 'Jamais je n\'ai vu un tel désordre.'],
        ['What I need is a holiday.', 'Ce dont j\'ai besoin, c\'est de vacances.'],
        ['Having finished, she left.', 'Ayant terminé, elle est partie.'],
      ],
    },
    lessons: [
      vocab(
        'en-c1-style-verbs',
        'Verbes de registre soutenu',
        [
          w('to acknowledge', 'reconnaître', 'acknowledge'),
          w('to undermine', 'saper', 'undermine'),
          w('to enhance', 'améliorer', 'enhance'),
          w('to convey', 'transmettre', 'convey'),
          w('to emphasise', 'souligner', 'emphasize', 'emphasise', 'to emphasize'),
          w('to overcome', 'surmonter', 'overcome'),
          w('to assess', 'évaluer', 'assess'),
          w('to comply with', 'se conformer à', 'comply with'),
        ],
        [
          s('She acknowledged her mistake.', 'Elle a reconnu son erreur.'),
          s('These rumours undermine our work.', 'Ces rumeurs sapent notre travail.'),
          s('This report conveys a clear message.', 'Ce rapport transmet un message clair.'),
          s('We must assess the risks carefully.', 'Nous devons évaluer les risques avec soin.'),
          s('They overcame many obstacles.', 'Ils ont surmonté de nombreux obstacles.'),
          s('All staff must comply with the rules.', 'Tout le personnel doit se conformer aux règles.'),
        ],
      ),
      vocab(
        'en-c1-style-adjectives',
        'Adjectifs précis',
        [
          w('reliable', 'fiable'),
          w('thorough', 'approfondi'),
          w('ambiguous', 'ambigu'),
          w('relevant', 'pertinent'),
          w('widespread', 'répandu'),
          w('inevitable', 'inévitable'),
          w('subtle', 'subtil'),
          w('compelling', 'convaincant'),
        ],
        [
          s('This source is not reliable.', "Cette source n'est pas fiable."),
          s('They carried out a thorough review.', 'Ils ont mené un examen approfondi.'),
          s('The wording is deliberately ambiguous.', 'La formulation est délibérément ambiguë.'),
          s('That point is not relevant here.', "Ce point n'est pas pertinent ici."),
          s('This view is widespread among experts.', 'Ce point de vue est répandu parmi les experts.'),
          s('She made a compelling argument.', 'Elle a présenté un argument convaincant.'),
        ],
      ),
      grammar('en-g-inversion', "L'inversion", 'C1', {
        intro: 'Après un mot négatif ou restrictif placé en tête, le sujet et l\'auxiliaire s\'inversent.',
        points: [
          'Mots concernés : never, rarely, seldom, hardly, not only, no sooner, under no circumstances.',
          'Sans auxiliaire, on ajoute do, does ou did.',
          'Not until et only when inversent dans la proposition principale.',
          'Ce registre est écrit ou très formel.',
        ],
        tables: [
          {
            headers: ['Normal', 'Inversé'],
            rows: [
              ['I have never seen this.', 'Never have I seen this.'],
              ['He rarely speaks.', 'Rarely does he speak.'],
              ['She not only sang, but danced.', 'Not only did she sing, but she danced.'],
              ['I had hardly sat down when...', 'Hardly had I sat down when...'],
            ],
          },
        ],
        examples: [
          ['Rarely have we seen such results.', 'Nous avons rarement vu de tels résultats.'],
          ['Not only did he lie, but he also stole.', 'Non seulement il a menti, mais il a aussi volé.'],
        ],
        questions: [
          choose('Never ___ such a beautiful place.', 'have I seen', ['I have seen', 'I saw'], 'Jamais je n\'ai vu un si bel endroit.', 'Never en tête : inversion.'),
          choose('Rarely ___ he speak in public.', 'does', ['do', 'is'], 'Il parle rarement en public.', 'Sans auxiliaire : does.'),
          choose('Not only ___ late, but he also forgot the keys.', 'was he', ['he was', 'he is'], 'Non seulement il était en retard, mais il a aussi oublié les clés.', 'Not only en tête : inversion.'),
          transform(REWRITE, 'I have never heard such nonsense. (Never...)', ['Never have I heard such nonsense'], 'Jamais je n\'ai entendu pareille sottise.', 'Have passe devant I.'),
          transform(REWRITE, 'She rarely makes mistakes. (Rarely...)', ['Rarely does she make mistakes'], 'Elle fait rarement des erreurs.', 'Does + base.'),
          complete('Hardly ___ I sat down when the phone rang.', ['had'], 'À peine m\'étais-je assis que le téléphone a sonné.', 'Hardly + had.'),
        ],
      }),
      grammar('en-g-cleft', 'Les phrases clivées', 'C1', {
        intro: 'Elles mettent en avant un élément, comme « c\'est... qui » en français.',
        points: [
          'It-cleft : It was Tom who called.',
          'What-cleft : What I need is sleep.',
          'All I want is : tout ce que je veux, c\'est.',
          'The reason why et the place where fonctionnent de la même façon.',
        ],
        tables: [
          {
            headers: ['Neutre', 'Clivée'],
            rows: [
              ['Tom broke the window.', 'It was Tom who broke the window.'],
              ['I need a holiday.', 'What I need is a holiday.'],
              ['I want peace.', 'All I want is peace.'],
            ],
          },
        ],
        examples: [
          ['It was in Paris that we met.', 'C\'est à Paris que nous nous sommes rencontrés.'],
          ['What surprised me was his reaction.', 'Ce qui m\'a surpris, c\'est sa réaction.'],
        ],
        questions: [
          choose('___ was Anna who found the solution.', 'It', ['This', 'What'], 'C\'est Anna qui a trouvé la solution.', 'It was + élément + who.'),
          choose('___ I really need is a break.', 'What', ['That', 'Which'], 'Ce dont j\'ai vraiment besoin, c\'est d\'une pause.', 'What-cleft.'),
          transform(REWRITE, 'Tom called you. (It was...)', ['It was Tom who called you', 'It was Tom that called you'], 'C\'est Tom qui t\'a appelé.', 'It was + Tom + who.'),
          transform(REWRITE, 'I want a quiet life. (What...)', ['What I want is a quiet life'], 'Ce que je veux, c\'est une vie tranquille.', 'What + sujet + verbe + is.'),
          complete('It was in 2010 ___ we moved here.', ['that'], 'C\'est en 2010 que nous avons emménagé ici.', 'It was + date + that.'),
          spot('All I want is to rest.', ['All what I want is to rest.', 'All I want it is to rest.'], 'All sans what.'),
        ],
      }),
      grammar('en-g-participle-clauses', 'Les propositions participes', 'C1', {
        intro: 'Elles condensent deux phrases en une, surtout à l\'écrit.',
        points: [
          'Actions simultanées : Walking home, I met Tom.',
          'Antériorité : Having finished, she left.',
          'Sens passif : Built in 1900, the bridge is famous.',
          'Le sujet doit être le même dans les deux parties.',
        ],
        tables: [
          {
            headers: ['Forme', 'Exemple'],
            rows: [
              ['-ing', 'Knowing the risk, he refused.'],
              ['having + participe', 'Having read it, I agree.'],
              ['participe', 'Written in haste, it is full of errors.'],
              ['not + -ing', 'Not knowing the way, I stopped.'],
            ],
          },
        ],
        examples: [
          ['Having read the report, I disagree.', 'Après avoir lu le rapport, je ne suis pas d\'accord.'],
          ['Built in 1900, the bridge is still in use.', 'Construit en 1900, le pont est toujours utilisé.'],
        ],
        questions: [
          choose('___ the report, she called the director.', 'Having read', ['Had read', 'Read having'], 'Après avoir lu le rapport, elle a appelé le directeur.', 'Antériorité : having + participe.'),
          choose('___ in 1900, the bridge is still in use.', 'Built', ['Building', 'Having building'], 'Construit en 1900, le pont est toujours utilisé.', 'Sens passif : participe.'),
          choose('___ the way, I asked a stranger.', 'Not knowing', ['Knowing not', 'Not known'], 'Ne connaissant pas le chemin, j\'ai demandé à un inconnu.', 'Not se place devant.'),
          transform('Condense avec un participe', 'She finished her work and left.', ['Having finished her work, she left'], 'Après avoir terminé, elle est partie.', 'Having + participe.'),
          transform('Condense avec un participe', 'Because I felt tired, I went to bed.', ['Feeling tired, I went to bed'], 'Me sentant fatigué, je suis allé me coucher.', 'On supprime because et le sujet.'),
          spot('Walking down the street, I saw an old friend.', ['Walking down the street, an old friend was seen.', 'Walking down the street, a friend saw by me.'], 'Le sujet doit être celui qui marche.'),
        ],
      }),
      dialogue(
        'en-c1-style-dialogue',
        'Le rapport',
        'Deux collègues discutent d\'un rapport délicat.',
        [
          line('Anna', 'Having read the report, I must say I find the conclusions rather ambiguous.', 'Après avoir lu le rapport, je dois dire que je trouve les conclusions plutôt ambiguës.'),
          line('Tom', 'What concerns me is the lack of reliable data.', 'Ce qui m\'inquiète, c\'est le manque de données fiables.'),
          line('Anna', 'Indeed. Rarely have I seen so many unsupported claims.', 'En effet. J\'ai rarement vu autant d\'affirmations non étayées.'),
          line('Tom', 'It was the board that insisted on publishing it so quickly.', 'C\'est le conseil qui a insisté pour le publier si vite.'),
          line('Anna', 'That undermines the credibility of the whole project.', 'Cela sape la crédibilité de tout le projet.'),
          line('Tom', 'Not only that, but it may well fail to comply with the regulations.', 'Non seulement cela, mais il pourrait bien ne pas respecter la réglementation.'),
        ],
        [
          q('Qu\'est-ce qui inquiète Tom ?', 'Le manque de données fiables', 'Le coût du projet', 'Le retard'),
          q('Qui a poussé à publier vite ?', 'Le conseil', 'Anna', 'Les journalistes'),
        ],
      ),
    ],
  },
  {
    id: 'en-c1-academic',
    title: 'Écrire et nuancer',
    description: 'Le langage universitaire et professionnel',
    level: 'C1',
    tip: {
      title: 'Le ton académique',
      points: [
        'L\'écrit formel préfère les noms aux verbes.',
        'Un auteur prudent évite les affirmations absolues.',
        'Certaines collocations sont figées : on tire une conclusion, on ne la fait pas.',
      ],
      examples: [
        ['The results suggest a clear link.', 'Les résultats suggèrent un lien net.'],
        ['There has been a rapid increase in prices.', 'Les prix ont rapidement augmenté.'],
        ['I suggest that he be informed.', 'Je suggère qu\'il soit informé.'],
      ],
    },
    lessons: [
      vocab(
        'en-c1-academic-nouns',
        'Le vocabulaire de l\'analyse',
        [
          w('evidence', 'preuves'),
          w('assumption', 'hypothèse, présupposé'),
          w('trend', 'tendance'),
          w('framework', 'cadre'),
          w('drawback', 'inconvénient'),
          w('implication', 'conséquence implicite'),
          w('approach', 'approche'),
          w('bias', 'biais'),
        ],
        [
          s('There is no evidence to support this.', "Aucune preuve n'étaye cela."),
          s('This is based on a false assumption.', 'Cela repose sur un présupposé erroné.'),
          s('The trend is likely to continue.', 'La tendance devrait se poursuivre.'),
          s('The main drawback is the cost.', 'Le principal inconvénient est le coût.'),
          s('We need a different approach.', "Il nous faut une approche différente."),
          s('The study may contain some bias.', 'L\'étude peut comporter un certain biais.'),
        ],
      ),
      vocab(
        'en-c1-academic-collocations',
        'Les collocations',
        [
          w('to draw a conclusion', 'tirer une conclusion', 'draw a conclusion'),
          w('to raise awareness', 'sensibiliser', 'raise awareness'),
          w('to bear in mind', 'garder à l\'esprit', 'bear in mind'),
          w('to take into account', 'prendre en compte', 'take into account'),
          w('to make a point', 'faire valoir un argument', 'make a point'),
          w('to reach an agreement', 'parvenir à un accord', 'reach an agreement'),
          w('to meet a need', 'répondre à un besoin', 'meet a need'),
          w('to play a role', 'jouer un rôle', 'play a role'),
        ],
        [
          s('It is too early to draw a conclusion.', 'Il est trop tôt pour tirer une conclusion.'),
          s('The campaign aims to raise awareness.', 'La campagne vise à sensibiliser le public.'),
          s('Bear in mind that this is only a draft.', "Garde à l'esprit que ce n'est qu'un brouillon."),
          s('We must take costs into account.', 'Nous devons prendre les coûts en compte.'),
          s('Both sides reached an agreement.', 'Les deux parties sont parvenues à un accord.'),
          s('Education plays a key role.', "L'éducation joue un rôle clé."),
        ],
      ),
      grammar('en-g-nominalisation', 'La nominalisation', 'C1', {
        intro: 'Transformer un verbe en nom rend un texte plus dense et plus formel.',
        points: [
          'Prices increased rapidly devient a rapid increase in prices.',
          'L\'adverbe devient un adjectif.',
          'Attention aux prépositions : increase in, reason for, effect on, solution to.',
        ],
        tables: [
          {
            headers: ['Verbe', 'Nom', 'Préposition'],
            rows: [
              ['increase', 'an increase', 'in'],
              ['affect', 'an effect', 'on'],
              ['solve', 'a solution', 'to'],
              ['explain', 'an explanation', 'for'],
              ['need', 'a need', 'for'],
            ],
          },
        ],
        examples: [
          ['There has been a sharp rise in demand.', 'La demande a fortement augmenté.'],
          ['The decision had a major effect on sales.', 'La décision a eu un effet majeur sur les ventes.'],
        ],
        questions: [
          choose('There has been a sharp increase ___ prices.', 'in', ['of', 'on'], 'Les prix ont fortement augmenté.', 'Increase in.'),
          choose('This had a major effect ___ sales.', 'on', ['in', 'to'], 'Cela a eu un effet majeur sur les ventes.', 'Effect on.'),
          choose('We found a solution ___ the problem.', 'to', ['of', 'for'], 'Nous avons trouvé une solution au problème.', 'Solution to.'),
          transform('Nominalise', 'Prices rose rapidly.', ['There was a rapid rise in prices'], 'Les prix ont rapidement augmenté.', 'Rapidly devient rapid.'),
          transform('Nominalise', 'The company grew significantly.', ['There was significant growth in the company', 'The company saw significant growth'], 'L\'entreprise a beaucoup grandi.', 'Grow devient growth.'),
          complete('There is no explanation ___ this result.', ['for'], 'Ce résultat n\'a pas d\'explication.', 'Explanation for.'),
        ],
      }),
      grammar('en-g-hedging', 'Nuancer son propos', 'C1', {
        intro: 'L\'écrit anglais valorise la prudence : on suggère plus qu\'on n\'affirme.',
        points: [
          'Verbes prudents : seem, appear, tend to, suggest.',
          'Modaux : may, might, could.',
          'Adverbes : arguably, relatively, largely, somewhat.',
          'Formules : it would appear that, to some extent.',
        ],
        tables: [
          {
            headers: ['Affirmation', 'Version nuancée'],
            rows: [
              ['This proves that...', 'This suggests that...'],
              ['People prefer...', 'People tend to prefer...'],
              ['It is the best.', 'It is arguably the best.'],
            ],
          },
        ],
        examples: [
          ['The results appear to confirm this view.', 'Les résultats semblent confirmer ce point de vue.'],
          ['This may, to some extent, explain the drop.', 'Cela peut, dans une certaine mesure, expliquer la baisse.'],
        ],
        questions: [
          choose('The data ___ that the method works.', 'suggest', ['prove surely', 'are saying'], 'Les données suggèrent que la méthode fonctionne.', 'Suggest est prudent.'),
          choose('Young people ___ to use this app more.', 'tend', ['are', 'do'], 'Les jeunes ont tendance à davantage utiliser cette appli.', 'Tend to.'),
          choose('It is ___ the most important novel of the decade.', 'arguably', ['arguing', 'argue'], 'C\'est sans doute le roman le plus important de la décennie.', 'Arguably nuance l\'affirmation.'),
          choose('This explains the drop ___ some extent.', 'to', ['at', 'in'], 'Cela explique la baisse dans une certaine mesure.', 'To some extent.'),
          transform('Rends la phrase plus prudente avec appear', 'The policy has failed.', ['The policy appears to have failed'], 'La politique semble avoir échoué.', 'Appear + to have + participe.'),
          complete('It would ___ that the data are incomplete.', ['appear', 'seem'], 'Il semblerait que les données soient incomplètes.', 'It would appear that.'),
        ],
      }),
      grammar('en-g-subjunctive', 'Le subjonctif anglais', 'C1', {
        intro: 'Rare mais bien vivant à l\'écrit formel, surtout après une recommandation.',
        points: [
          'Après suggest, recommend, insist, demand : verbe à la base, sans -s.',
          'I suggest that he leave. Be reste be : that she be informed.',
          'Tournure plus courante : suggest that he should leave.',
          'It is essential that et it is vital that suivent la même règle.',
        ],
        tables: [
          {
            headers: ['Forme', 'Exemple'],
            rows: [
              ['Subjonctif', 'We recommend that she apply.'],
              ['Avec should', 'We recommend that she should apply.'],
              ['Be', 'It is vital that he be told.'],
            ],
          },
        ],
        examples: [
          ['They insisted that he resign.', 'Ils ont exigé qu\'il démissionne.'],
          ['It is essential that she be present.', 'Il est essentiel qu\'elle soit présente.'],
        ],
        questions: [
          choose('I suggest that he ___ a doctor.', 'see', ['sees', 'saw'], 'Je suggère qu\'il voie un médecin.', 'Base, sans -s.'),
          choose('It is vital that she ___ informed.', 'be', ['is', 'was'], 'Il est vital qu\'elle soit informée.', 'Be reste à la base.'),
          choose('They demanded that the minister ___.', 'resign', ['resigns', 'resigned'], 'Ils ont exigé que le ministre démissionne.', 'Demand + base.'),
          complete('We recommend that she ___ (apply) early.', ['apply'], 'Nous recommandons qu\'elle postule tôt.', 'Base sans -s.'),
          transform('Utilise should', 'I suggest that he leave.', ['I suggest that he should leave', 'I suggest he should leave'], 'Je suggère qu\'il parte.', 'Should + base.'),
          spot('The board insisted that he be replaced.', ['The board insisted that he was replaced by.', 'The board insisted that he is replaced.'], 'Insist that + be.'),
        ],
      }),
      dialogue(
        'en-c1-academic-dialogue',
        'La soutenance',
        'Anna présente les résultats de son étude.',
        [
          line('Anna', 'Our findings suggest that remote work tends to increase productivity.', 'Nos résultats suggèrent que le télétravail tend à accroître la productivité.'),
          line('Professor', 'Is that a fair conclusion to draw from such a small sample?', 'Est-ce une conclusion légitime à tirer d\'un si petit échantillon ?'),
          line('Anna', 'To some extent, yes, although I acknowledge a possible bias.', 'Dans une certaine mesure, oui, bien que je reconnaisse un biais possible.'),
          line('Professor', 'What was the main drawback of your approach?', 'Quel était le principal inconvénient de votre approche ?'),
          line('Anna', 'The data were self-reported, which must be taken into account.', 'Les données étaient autodéclarées, ce qui doit être pris en compte.'),
          line('Professor', 'I would recommend that you repeat the study on a larger scale.', 'Je vous recommande de refaire l\'étude à plus grande échelle.'),
        ],
        [
          q('Que suggèrent les résultats ?', 'Le télétravail améliore la productivité', 'Le télétravail réduit les salaires', 'Les bureaux sont trop chers'),
          q('Que recommande le professeur ?', 'Refaire l\'étude à plus grande échelle', 'Abandonner le sujet', 'Publier tout de suite'),
        ],
      ),
    ],
  },
  {
    id: 'en-c2-nuance',
    title: 'Nuance et registre',
    description: 'Les expressions imagées et les mots les plus précis',
    level: 'C2',
    tip: {
      title: 'Parler comme un natif cultivé',
      points: [
        'Au niveau C2, on choisit le mot juste selon le registre.',
        'Un natif évite les répétitions grâce à l\'ellipse et à la substitution.',
        'Les modaux au passé expriment reproches et soulagement.',
      ],
      examples: [
        ['You need not have worried.', 'Tu n\'avais pas besoin de t\'inquiéter.'],
        ['She does know the answer.', 'Elle connaît bel et bien la réponse.'],
        ['I hope so, but I doubt it.', 'Je l\'espère, mais j\'en doute.'],
      ],
    },
    lessons: [
      vocab(
        'en-c2-nuance-idioms',
        'Expressions idiomatiques',
        [
          w('a blessing in disguise', 'un mal pour un bien'),
          w('to bite the bullet', 'serrer les dents', 'bite the bullet'),
          w('the last straw', 'la goutte d\'eau'),
          w('to sit on the fence', 'ne pas prendre parti', 'sit on the fence'),
          w('to call it a day', 'en rester là', 'call it a day'),
          w('to beat around the bush', 'tourner autour du pot', 'beat around the bush'),
          w('a long shot', 'un pari risqué'),
          w('to get cold feet', 'se dégonfler', 'get cold feet'),
        ],
        [
          s('Losing that job was a blessing in disguise.', 'Perdre cet emploi a été un mal pour un bien.'),
          s('We just have to bite the bullet.', 'Il faut simplement serrer les dents.'),
          s('His last remark was the last straw.', "Sa dernière remarque a été la goutte d'eau."),
          s('Stop sitting on the fence and decide.', 'Cesse de ménager la chèvre et le chou et décide.'),
          s('Let us call it a day.', 'Restons-en là pour aujourd\'hui.'),
          s('He got cold feet before the wedding.', 'Il s\'est dégonflé avant le mariage.'),
        ],
      ),
      vocab(
        'en-c2-nuance-precise',
        'Les mots rares',
        [
          w('ubiquitous', 'omniprésent'),
          w('to exacerbate', 'aggraver', 'exacerbate'),
          w('ephemeral', 'éphémère'),
          w('pragmatic', 'pragmatique'),
          w('to mitigate', 'atténuer', 'mitigate'),
          w('nuanced', 'nuancé'),
          w('to scrutinise', 'examiner minutieusement', 'scrutinize', 'scrutinise', 'to scrutinize'),
          w('resilient', 'résilient'),
        ],
        [
          s('Smartphones have become ubiquitous.', 'Les smartphones sont devenus omniprésents.'),
          s('The crisis exacerbated existing tensions.', 'La crise a aggravé les tensions existantes.'),
          s('Fame is often ephemeral.', 'La célébrité est souvent éphémère.'),
          s('We must mitigate the risks.', 'Nous devons atténuer les risques.'),
          s('She offered a nuanced analysis.', 'Elle a proposé une analyse nuancée.'),
          s('The economy proved remarkably resilient.', "L'économie s'est montrée remarquablement résiliente."),
        ],
      ),
      grammar('en-g-past-modals', 'Les modaux du reproche', 'C2', {
        intro: 'Au passé, les modaux expriment des nuances que le français rend par des tournures longues.',
        points: [
          'Should have : un reproche ou un regret.',
          'Needn\'t have : c\'était fait, mais inutile.',
          'Did not need to : ce n\'était pas nécessaire, et on ne sait pas si c\'était fait.',
          'Could have : possibilité non réalisée, ou reproche.',
        ],
        tables: [
          {
            headers: ['Forme', 'Sens'],
            rows: [
              ['You should have called.', 'Tu aurais dû appeler.'],
              ['You needn\'t have called.', 'Tu as appelé, c\'était inutile.'],
              ['You didn\'t need to call.', 'Tu n\'avais pas à appeler.'],
              ['You could have called!', 'Tu aurais pu appeler !'],
            ],
          },
        ],
        examples: [
          ['You need not have brought a gift.', 'Il ne fallait pas apporter de cadeau.'],
          ['She should have known better.', 'Elle aurait dû être plus raisonnable.'],
        ],
        questions: [
          choose('You ___ have told me earlier!', 'should', ['must', 'need'], 'Tu aurais dû me le dire plus tôt !', 'Reproche : should have.'),
          choose('I bought the tickets, but I ___ have: they were free.', 'need not', ['must not', 'should'], 'J\'ai acheté les billets, mais c\'était inutile : ils étaient gratuits.', 'Fait mais inutile : need not have.'),
          choose('We ___ to book: the restaurant was empty, so we just walked in.', 'did not need', ['need not', 'should not'], 'Pas besoin de réserver : le restaurant était vide.', 'Pas nécessaire, donc pas fait.'),
          complete('You ___ have hurt yourself!', ['could', 'might'], 'Tu aurais pu te blesser !', 'Possibilité non réalisée.'),
          choose('She ___ have left already; her coat is still here.', 'cannot', ['must', 'should'], 'Elle ne peut pas être déjà partie ; son manteau est encore là.', 'Déduction négative.'),
          spot('You should have listened to me.', ['You should listened to me.', 'You should have listen to me.'], 'Should have + participe.'),
        ],
      }),
      grammar('en-g-ellipsis', 'Ellipse et substitution', 'C2', {
        intro: 'Un anglais naturel évite de se répéter.',
        points: [
          'Reprise par auxiliaire : Have you finished? I have.',
          'So et not remplacent une proposition : I think so, I hope not.',
          'One remplace un nom : the red one.',
          'So do I et neither do I marquent l\'accord.',
        ],
        tables: [
          {
            headers: ['Répétitif', 'Naturel'],
            rows: [
              ['I think that it is true.', 'I think so.'],
              ['I hope that it will not rain.', 'I hope not.'],
              ['I like the red car.', 'I like the red one.'],
              ['I am tired and I am tired too.', 'So am I.'],
            ],
          },
        ],
        examples: [
          ['Is she coming? I am afraid not.', 'Vient-elle ? J\'ai bien peur que non.'],
          ['He can swim, and so can she.', 'Il sait nager, et elle aussi.'],
        ],
        questions: [
          choose('Will it rain? I hope ___.', 'not', ['no', 'don\'t'], 'Va-t-il pleuvoir ? J\'espère que non.', 'I hope not.'),
          choose('Do you think she knows? I think ___.', 'so', ['it', 'that'], 'Crois-tu qu\'elle sache ? Je pense que oui.', 'I think so.'),
          choose('I love jazz. ___ do I.', 'So', ['Too', 'Also'], 'J\'adore le jazz. Moi aussi.', 'So + auxiliaire + sujet.'),
          choose('I do not smoke. ___ do I.', 'Neither', ['So', 'Either'], 'Je ne fume pas. Moi non plus.', 'Accord négatif : neither.'),
          complete('Which coat do you want? The black ___.', ['one'], 'Quel manteau veux-tu ? Le noir.', 'One remplace le nom.'),
          spot('She can drive, and so can he.', ['She can drive, and so he can.', 'She can drive, and he can so.'], 'So + auxiliaire + sujet.'),
        ],
      }),
      grammar('en-g-emphasis', "L'insistance", 'C2', {
        intro: 'L\'anglais dispose de plusieurs moyens de renforcer un propos.',
        points: [
          'Do emphatique : I do understand.',
          'Such + nom, so + adjectif : such a mess, so messy.',
          'So... that et such... that : la conséquence.',
          'The very, the only thing : le mot même.',
        ],
        tables: [
          {
            headers: ['Forme', 'Exemple'],
            rows: [
              ['do + base', 'She does care.'],
              ['such a + nom', 'It was such a shock.'],
              ['so + adjectif', 'It was so shocking.'],
              ['so + adjectif + that', 'It was so hot that we left.'],
            ],
          },
        ],
        examples: [
          ['I do apologise for the delay.', 'Je vous prie vraiment de m\'excuser pour ce retard.'],
          ['It was such a good film that I saw it twice.', 'C\'était un si bon film que je l\'ai vu deux fois.'],
        ],
        questions: [
          choose('It was ___ a surprise.', 'such', ['so', 'very'], 'Ce fut une telle surprise.', 'Such + a + nom.'),
          choose('She was ___ tired that she fell asleep.', 'so', ['such', 'too'], 'Elle était si fatiguée qu\'elle s\'est endormie.', 'So + adjectif.'),
          choose('I ___ understand your concern.', 'do', ['am', 'have'], 'Je comprends vraiment ton inquiétude.', 'Do emphatique.'),
          transform('Insiste avec do', 'She cares about you.', ['She does care about you'], 'Elle tient vraiment à toi.', 'Does + base.'),
          transform(REWRITE, 'It was so good that I ate it all. (It was such...)', ['It was such good food that I ate it all', 'It was such a good meal that I ate it all'], 'C\'était si bon que j\'ai tout mangé.', 'Such + nom.'),
          spot('He did tell me, but I forgot.', ['He did told me, but I forgot.', 'He did telling me, but I forgot.'], 'Did + base.'),
        ],
      }),
      dialogue(
        'en-c2-nuance-dialogue',
        'La démission',
        'Deux amis reviennent sur une décision difficile.',
        [
          line('Tom', 'I do wish you had told me before you resigned.', 'J\'aurais vraiment aimé que tu me le dises avant de démissionner.'),
          line('Anna', 'I should have, I know, but I was afraid of getting cold feet.', 'J\'aurais dû, je sais, mais j\'avais peur de me dégonfler.'),
          line('Tom', 'You needn\'t have worried. I would have supported you.', 'Tu n\'avais pas à t\'inquiéter. Je t\'aurais soutenue.'),
          line('Anna', 'The new contract was the last straw, to be honest.', 'Le nouveau contrat a été la goutte d\'eau, pour être honnête.'),
          line('Tom', 'Who knows, it may turn out to be a blessing in disguise.', 'Qui sait, ce sera peut-être un mal pour un bien.'),
          line('Anna', 'I hope so. It was such a difficult decision.', 'Je l\'espère. C\'était une décision si difficile.'),
        ],
        [
          q('Que reproche Tom à Anna ?', 'De ne pas lui en avoir parlé', 'D\'avoir signé le contrat', 'D\'être partie en vacances'),
          q('Qu\'est-ce qui a décidé Anna ?', 'Le nouveau contrat', 'Une dispute avec Tom', 'Une offre à l\'étranger'),
        ],
      ),
    ],
  },
  {
    id: 'en-c2-rhetoric',
    title: 'Convaincre avec art',
    description: 'Rhétorique, faux amis et hypothèses raffinées',
    level: 'C2',
    tip: {
      title: 'La maîtrise des pièges',
      points: [
        'Les faux amis trahissent les francophones même à haut niveau.',
        'Le passé irréel apparaît après it is time, as if, would rather.',
        'Les corrélatifs structurent un argument : the more... the more.',
      ],
      examples: [
        ['It is time we left.', 'Il est temps que nous partions.'],
        ['The more I read, the less I know.', 'Plus je lis, moins j\'en sais.'],
        ['He talks as if he knew everything.', 'Il parle comme s\'il savait tout.'],
      ],
    },
    lessons: [
      vocab(
        'en-c2-rhetoric-false-friends',
        'Les faux amis',
        [
          w('sensible', 'raisonnable'),
          w('library', 'bibliothèque'),
          w('to attend', 'assister à', 'attend'),
          w('to pretend', 'faire semblant', 'pretend'),
          w('deception', 'tromperie'),
          w('to assist', 'aider', 'assist'),
          w('actual', 'réel'),
          w('sympathetic', 'compatissant'),
        ],
        [
          s('That seems a sensible decision.', 'Cela semble une décision raisonnable.'),
          s('She attended the conference in Vienna.', 'Elle a assisté à la conférence à Vienne.'),
          s('He pretended not to hear.', 'Il a fait semblant de ne pas entendre.'),
          s('The actual cost was much higher.', 'Le coût réel était bien plus élevé.'),
          s('They were sympathetic to our situation.', 'Ils se sont montrés compréhensifs envers notre situation.'),
          s('Can I assist you with your luggage?', 'Puis-je vous aider avec vos bagages ?'),
        ],
      ),
      vocab(
        'en-c2-rhetoric-speech',
        'Le verbe du débat',
        [
          w('to advocate', 'prôner', 'advocate'),
          w('to refute', 'réfuter', 'refute'),
          w('to concede', 'concéder', 'concede'),
          w('to allege', 'alléguer', 'allege'),
          w('to imply', 'sous-entendre', 'imply'),
          w('to infer', 'déduire', 'infer'),
          w('to dismiss', 'écarter', 'dismiss'),
          w('to reiterate', 'réaffirmer', 'reiterate'),
        ],
        [
          s('She advocates stricter controls.', 'Elle prône des contrôles plus stricts.'),
          s('He refuted the accusation.', "Il a réfuté l'accusation."),
          s('I concede that you have a point.', 'Je concède que tu as raison sur ce point.'),
          s('What are you implying?', 'Que sous-entends-tu ?'),
          s('The judge dismissed the claim.', 'Le juge a écarté la demande.'),
          s('Let me reiterate our position.', 'Permettez-moi de réaffirmer notre position.'),
        ],
      ),
      grammar('en-g-unreal-past', 'Le passé irréel', 'C2', {
        intro: 'Certaines expressions exigent un prétérit pour parler du présent.',
        points: [
          'It is time, it is high time + prétérit : it is time we left.',
          'As if et as though + prétérit : il parle comme s\'il savait.',
          'Suppose, supposing, imagine + prétérit.',
          'Were remplace was en style soutenu : if I were you.',
        ],
        tables: [
          {
            headers: ['Tournure', 'Exemple'],
            rows: [
              ['it is time', 'It is time you went.'],
              ['as if', 'She acts as if she owned the place.'],
              ['suppose', 'Suppose you lost your job.'],
              ['if I were', 'If I were you, I would accept.'],
            ],
          },
        ],
        examples: [
          ['It is high time we made a decision.', 'Il est grand temps que nous prenions une décision.'],
          ['If I were you, I would accept.', 'À ta place, j\'accepterais.'],
        ],
        questions: [
          choose('It is time we ___.', 'left', ['leave', 'will leave'], 'Il est temps que nous partions.', 'It is time + prétérit.'),
          choose('He talks as if he ___ everything.', 'knew', ['knows', 'will know'], 'Il parle comme s\'il savait tout.', 'As if + prétérit irréel.'),
          choose('If I ___ you, I would accept.', 'were', ['am', 'be'], 'À ta place, j\'accepterais.', 'If I were.'),
          choose('Suppose you ___ your job. What would you do?', 'lost', ['lose', 'will lose'], 'Imagine que tu perdes ton emploi. Que ferais-tu ?', 'Suppose + prétérit.'),
          complete('It is high time you ___ (find) a solution.', ['found'], 'Il est grand temps que tu trouves une solution.', 'Prétérit après high time.'),
          spot('She looks as though she had seen a ghost.', ['She looks as though she sees a ghost yesterday.', 'She looks as though she will see a ghost.'], 'As though + past perfect pour un fait antérieur.'),
        ],
      }),
      grammar('en-g-correlatives', 'Les corrélatifs', 'C2', {
        intro: 'Ces paires de mots donnent du rythme à une phrase.',
        points: [
          'The more... the more : plus... plus.',
          'Not only... but also, either... or, neither... nor, both... and.',
          'No sooner... than, hardly... when.',
          'Les deux membres doivent avoir la même structure.',
        ],
        tables: [
          {
            headers: ['Forme', 'Exemple'],
            rows: [
              ['the more, the more', 'The more you practise, the better you get.'],
              ['neither, nor', 'He neither called nor wrote.'],
              ['no sooner, than', 'No sooner had I left than it rained.'],
              ['both, and', 'She speaks both German and Italian.'],
            ],
          },
        ],
        examples: [
          ['The more I read, the less I know.', 'Plus je lis, moins j\'en sais.'],
          ['No sooner had we arrived than it started to rain.', 'À peine étions-nous arrivés qu\'il s\'est mis à pleuvoir.'],
        ],
        questions: [
          choose('___ you practise, the better you get.', 'The more', ['More', 'The most'], 'Plus tu t\'entraînes, plus tu progresses.', 'The more... the better.'),
          choose('He ___ called nor wrote.', 'neither', ['either', 'both'], 'Il n\'a ni appelé ni écrit.', 'Neither... nor.'),
          choose('No sooner had I left ___ it started to rain.', 'than', ['when', 'then'], 'À peine étais-je parti qu\'il s\'est mis à pleuvoir.', 'No sooner... than.'),
          complete('She speaks ___ German and Italian.', ['both'], 'Elle parle allemand et italien.', 'Both... and.'),
          transform(REWRITE, 'I read more and I know less. (The more...)', ['The more I read, the less I know'], 'Plus je lis, moins j\'en sais.', 'The more... the less.'),
          spot('The sooner we start, the better.', ['Sooner we start, better.', 'The soonest we start, the best.'], 'The + comparatif des deux côtés.'),
        ],
      }),
      grammar('en-g-formal-reporting', 'Verbes de discours nuancés', 'C2', {
        intro: 'Remplacer say par un verbe précis change le sens d\'une citation.',
        points: [
          'Admit + -ing ou that : reconnaître.',
          'Deny + -ing : nier. Accuse of + -ing : accuser.',
          'Urge, warn et advise + objet + to.',
          'Claim prend ses distances : l\'auteur ne garantit pas le fait.',
        ],
        tables: [
          {
            headers: ['Verbe', 'Construction', 'Exemple'],
            rows: [
              ['admit', '+ -ing', 'He admitted lying.'],
              ['deny', '+ -ing', 'She denied taking it.'],
              ['accuse', 'of + -ing', 'They accused him of lying.'],
              ['urge', 'objet + to', 'They urged her to leave.'],
              ['claim', 'to + base', 'He claims to be a doctor.'],
            ],
          },
        ],
        examples: [
          ['He denied having seen her.', 'Il a nié l\'avoir vue.'],
          ['They urged the government to act.', 'Ils ont exhorté le gouvernement à agir.'],
        ],
        questions: [
          choose('He denied ___ the money.', 'taking', ['to take', 'take'], 'Il a nié avoir pris l\'argent.', 'Deny + -ing.'),
          choose('They accused her ___ lying.', 'of', ['for', 'to'], 'Ils l\'ont accusée de mentir.', 'Accuse of.'),
          choose('She urged him ___ a lawyer.', 'to see', ['seeing', 'see'], 'Elle l\'a exhorté à voir un avocat.', 'Urge + objet + to.'),
          transform(REPORT, '"I did not steal it," he said. (He denied...)', ['He denied stealing it', 'He denied having stolen it'], 'Il a nié l\'avoir volé.', 'Deny + -ing.'),
          transform(REPORT, '"You should see a doctor," she told me. (She advised...)', ['She advised me to see a doctor'], 'Elle m\'a conseillé de voir un médecin.', 'Advise + objet + to.'),
          complete('He claims ___ be an expert.', ['to'], 'Il prétend être expert.', 'Claim to + base.'),
        ],
      }),
      dialogue(
        'en-c2-rhetoric-dialogue',
        'Le débat public',
        'Une journaliste interroge un élu.',
        [
          line('Journalist', 'Minister, you have been accused of misleading the public.', 'Monsieur le ministre, on vous accuse d\'avoir trompé le public.'),
          line('Minister', 'I categorically deny having done so, and I refute these allegations.', 'Je nie catégoriquement l\'avoir fait, et je réfute ces allégations.'),
          line('Journalist', 'Yet the actual figures imply otherwise.', 'Pourtant, les chiffres réels laissent entendre le contraire.'),
          line('Minister', 'I concede that mistakes were made, but the more we study them, the clearer the picture becomes.', 'Je concède que des erreurs ont été commises, mais plus nous les étudions, plus la situation s\'éclaircit.'),
          line('Journalist', 'Is it not time you stepped down?', 'N\'est-il pas temps que vous démissionniez ?'),
          line('Minister', 'Let me reiterate: I will neither resign nor apologise for doing my job.', 'Je le répète : je ne démissionnerai ni ne m\'excuserai d\'avoir fait mon travail.'),
        ],
        [
          q('Que reconnaît le ministre ?', 'Que des erreurs ont été commises', 'Qu\'il a menti', 'Qu\'il va démissionner'),
          q('Que refuse le ministre ?', 'De démissionner et de s\'excuser', 'De répondre aux questions', 'De publier les chiffres'),
        ],
      ),
    ],
  },
];
