import type { Unit } from '../types';
import { arrange, choice, listen, pairs, write } from './helpers';

export const englishUnits: Unit[] = [
  {
    id: 'basics',
    title: 'Premiers pas',
    description: 'Saluer, se présenter, parler de ses proches',
    lessons: [
      {
        id: 'basics-greetings',
        title: 'Salutations',
        exercises: [
          pairs(['hello', 'bonjour'], ['goodbye', 'au revoir'], ['thank you', 'merci'], ['please', "s'il te plaît"]),
          choice('Comment dit-on « bonjour » ?', 'Hello', ['Goodbye', 'Thanks']),
          choice('Que veut dire « Goodbye » ?', 'Au revoir', ['Merci', 'Bonjour']),
          arrange('Merci beaucoup !', 'Thank you very much', ['please', 'hello']),
          write('Bonjour !', 'hello', 'hi'),
          listen('Good morning'),
        ],
      },
      {
        id: 'basics-intro',
        title: 'Se présenter',
        exercises: [
          pairs(['I', 'je'], ['you', 'tu'], ['he', 'il'], ['she', 'elle']),
          choice('Comment dit-on « je suis Léa » ?', 'I am Léa', ['You are Léa', 'She is Léa']),
          arrange("Je m'appelle Tom.", 'My name is Tom', ['your', 'am']),
          arrange("Comment t'appelles-tu ?", 'What is your name', ['my', 'are']),
          write('Je suis français.', 'I am French', "I'm French"),
          listen('Nice to meet you'),
        ],
      },
      {
        id: 'basics-family',
        title: 'La famille',
        exercises: [
          pairs(['mother', 'mère'], ['father', 'père'], ['sister', 'sœur'], ['brother', 'frère']),
          choice('Que veut dire « my son » ?', 'mon fils', ['ma fille', 'mon frère']),
          arrange('Elle est ma sœur.', 'She is my sister', ['he', 'brother']),
          write("J'ai un frère.", 'I have a brother', "I've got a brother"),
          choice('Comment dit-on « ma fille » ?', 'my daughter', ['my son', 'my mother']),
          listen('This is my family'),
        ],
      },
    ],
  },
  {
    id: 'cafe',
    title: 'Au café',
    description: 'Commander, demander, payer',
    lessons: [
      {
        id: 'cafe-drinks',
        title: 'Boissons',
        exercises: [
          pairs(['water', 'eau'], ['coffee', 'café'], ['tea', 'thé'], ['milk', 'lait']),
          choice("Comment dit-on « un jus d'orange » ?", 'an orange juice', ['an orange tea', 'a milk orange']),
          arrange('Je voudrais un café.', 'I would like a coffee', ['tea', 'you']),
          write("Un verre d'eau, s'il vous plaît.", 'a glass of water please'),
          choice('Que veut dire « without sugar » ?', 'sans sucre', ['avec du sucre', 'plus de sucre']),
          listen('A cup of tea please'),
        ],
      },
      {
        id: 'cafe-order',
        title: 'Commander',
        exercises: [
          pairs(['bread', 'pain'], ['cheese', 'fromage'], ['cake', 'gâteau'], ['egg', 'œuf']),
          choice('Le serveur dit « Are you ready to order? ». Il demande si…', 'tu es prêt à commander', ['tu as déjà payé', 'tu veux partir']),
          arrange("Qu'est-ce que vous recommandez ?", 'What do you recommend', ['is', 'order']),
          write('Je prends le gâteau.', "I'll have the cake", 'I will have the cake', 'I take the cake'),
          arrange("J'ai faim.", 'I am hungry', ['have', 'thirsty']),
          listen('Can I have the menu please'),
        ],
      },
      {
        id: 'cafe-pay',
        title: "L'addition",
        exercises: [
          pairs(['one', 'un'], ['two', 'deux'], ['five', 'cinq'], ['ten', 'dix']),
          choice("Comment demander l'addition ?", 'Can I have the bill please?', ['Can I have the door please?', 'Is the bill good?']),
          arrange('Combien ça coûte ?', 'How much is it', ['many', 'who']),
          write('Trois euros.', 'three euros'),
          choice('Que veut dire « Keep the change » ?', 'Gardez la monnaie', ['Changez de table', 'Rendez la monnaie']),
          listen('Do you take cards'),
        ],
      },
    ],
  },
  {
    id: 'travel',
    title: 'En voyage',
    description: "Se déplacer, trouver son chemin, arriver à l'hôtel",
    lessons: [
      {
        id: 'travel-transport',
        title: 'Transports',
        exercises: [
          pairs(['car', 'voiture'], ['plane', 'avion'], ['boat', 'bateau'], ['ticket', 'billet']),
          choice('Comment dit-on « la gare » ?', 'the train station', ['the airport', 'the bus stop']),
          arrange('Je vais à Londres en train.', 'I am going to London by train', ['plane', 'from']),
          write('Un billet pour Londres.', 'a ticket to London', 'one ticket to London', 'a ticket for London'),
          choice('Que veut dire « The flight is delayed » ?', 'Le vol est retardé', ['Le vol est annulé', 'Le vol est complet']),
          listen('When does the next train leave'),
        ],
      },
      {
        id: 'travel-directions',
        title: 'Trouver son chemin',
        exercises: [
          pairs(['left', 'gauche'], ['right', 'droite'], ['straight on', 'tout droit'], ['behind', 'derrière']),
          choice("Comment dit-on « excusez-moi » pour aborder quelqu'un ?", 'Excuse me', ['Thank you', 'Goodbye']),
          arrange('Où sont les toilettes ?', 'Where are the toilets', ['is', 'who']),
          arrange('Tournez à gauche.', 'Turn left', ['right', 'go']),
          write('Je suis perdu.', 'I am lost', "I'm lost"),
          listen('Is it far from here'),
        ],
      },
      {
        id: 'travel-hotel',
        title: "À l'hôtel",
        exercises: [
          pairs(['room', 'chambre'], ['key', 'clé'], ['bed', 'lit'], ['night', 'nuit']),
          choice("Comment dit-on « j'ai une réservation » ?", 'I have a reservation', ['I want a reservation', 'You have a reservation']),
          arrange('Pour deux nuits.', 'For two nights', ['days', 'at']),
          write('À quelle heure est le petit-déjeuner ?', 'what time is breakfast', 'when is breakfast', 'at what time is breakfast'),
          choice('Que veut dire « The room is ready » ?', 'La chambre est prête', ['La chambre est libre demain', 'La chambre est petite']),
          listen('Could I have another key please'),
        ],
      },
    ],
  },
];

