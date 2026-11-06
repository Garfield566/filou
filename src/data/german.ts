import type { Unit } from '../types';
import { arrange, choice, listen, pairs, write } from './helpers';

export const germanUnits: Unit[] = [
  {
    id: 'de-basics',
    title: 'Premiers pas',
    description: 'Saluer, se présenter, parler de ses proches',
    lessons: [
      {
        id: 'de-basics-greetings',
        title: 'Salutations',
        exercises: [
          pairs(['hallo', 'salut'], ['tschüss', 'au revoir'], ['danke', 'merci'], ['bitte', "s'il te plaît"]),
          choice('Comment dit-on « bonjour » dans la journée ?', 'Guten Tag', ['Gute Nacht', 'Auf Wiedersehen']),
          choice('Que veut dire « Auf Wiedersehen » ?', 'Au revoir', ['Merci', 'Bonne nuit']),
          arrange('Merci beaucoup !', 'Vielen Dank', ['bitte', 'Tag']),
          write('Salut !', 'hallo', 'hi'),
          listen('Guten Morgen'),
        ],
      },
      {
        id: 'de-basics-intro',
        title: 'Se présenter',
        exercises: [
          pairs(['ich', 'je'], ['du', 'tu'], ['er', 'il'], ['sie', 'elle']),
          choice('Comment dit-on « je suis Léa » ?', 'Ich bin Léa', ['Du bist Léa', 'Sie ist Léa']),
          arrange("Je m'appelle Tom.", 'Ich heiße Tom', ['du', 'bist']),
          arrange("Comment t'appelles-tu ?", 'Wie heißt du', ['ich', 'bin']),
          write('Je suis français.', 'Ich bin Franzose', 'Ich bin Französin'),
          listen('Freut mich'),
        ],
      },
      {
        id: 'de-basics-family',
        title: 'La famille',
        exercises: [
          pairs(['Mutter', 'mère'], ['Vater', 'père'], ['Schwester', 'sœur'], ['Bruder', 'frère']),
          choice('Que veut dire « mein Sohn » ?', 'mon fils', ['ma fille', 'mon frère']),
          arrange('Elle est ma sœur.', 'Sie ist meine Schwester', ['er', 'Bruder']),
          write("J'ai un frère.", 'Ich habe einen Bruder'),
          choice('Comment dit-on « ma fille » ?', 'meine Tochter', ['mein Sohn', 'meine Mutter']),
          listen('Das ist meine Familie'),
        ],
      },
    ],
  },
  {
    id: 'de-cafe',
    title: 'Au café',
    description: 'Commander, demander, payer',
    lessons: [
      {
        id: 'de-cafe-drinks',
        title: 'Boissons',
        exercises: [
          pairs(['Wasser', 'eau'], ['Kaffee', 'café'], ['Tee', 'thé'], ['Milch', 'lait']),
          choice("Comment dit-on « un jus d'orange » ?", 'ein Orangensaft', ['ein Orangentee', 'eine Milch']),
          arrange('Je voudrais un café.', 'Ich möchte einen Kaffee', ['Tee', 'du']),
          write("Un verre d'eau, s'il vous plaît.", 'ein Glas Wasser bitte'),
          choice('Que veut dire « ohne Zucker » ?', 'sans sucre', ['avec du sucre', 'plus de sucre']),
          listen('Eine Tasse Tee bitte'),
        ],
      },
      {
        id: 'de-cafe-order',
        title: 'Commander',
        exercises: [
          pairs(['Brot', 'pain'], ['Käse', 'fromage'], ['Kuchen', 'gâteau'], ['Ei', 'œuf']),
          choice('Le serveur dit « Was möchten Sie bestellen? ». Il demande…', 'ce que tu veux commander', ['si tu as déjà payé', 'si tu veux partir']),
          arrange("Qu'est-ce que vous recommandez ?", 'Was empfehlen Sie', ['ist', 'ich']),
          write('Je prends le gâteau.', 'Ich nehme den Kuchen'),
          arrange("J'ai faim.", 'Ich habe Hunger', ['bin', 'Durst']),
          listen('Die Speisekarte bitte'),
        ],
      },
      {
        id: 'de-cafe-pay',
        title: "L'addition",
        exercises: [
          pairs(['eins', 'un'], ['zwei', 'deux'], ['fünf', 'cinq'], ['zehn', 'dix']),
          choice("Comment demander l'addition ?", 'Die Rechnung bitte', ['Die Tür bitte', 'Der Tisch bitte']),
          arrange('Combien ça coûte ?', 'Wie viel kostet das', ['wer', 'ist']),
          write('Trois euros.', 'drei Euro'),
          choice('Que veut dire « Stimmt so » au moment de payer ?', 'Gardez la monnaie', ['Changez de table', 'Rendez la monnaie']),
          listen('Kann ich mit Karte zahlen'),
        ],
      },
    ],
  },
  {
    id: 'de-travel',
    title: 'En voyage',
    description: "Se déplacer, trouver son chemin, arriver à l'hôtel",
    lessons: [
      {
        id: 'de-travel-transport',
        title: 'Transports',
        exercises: [
          pairs(['Auto', 'voiture'], ['Flugzeug', 'avion'], ['Schiff', 'bateau'], ['Fahrkarte', 'billet']),
          choice('Comment dit-on « la gare » ?', 'der Bahnhof', ['der Flughafen', 'die Bushaltestelle']),
          arrange('Je vais à Berlin en train.', 'Ich fahre mit dem Zug nach Berlin', ['Flugzeug', 'aus'], ['Ich fahre nach Berlin mit dem Zug']),
          write('Un billet pour Berlin.', 'eine Fahrkarte nach Berlin'),
          choice('Que veut dire « Der Flug hat Verspätung » ?', 'Le vol a du retard', ['Le vol est annulé', 'Le vol est complet']),
          listen('Wann fährt der nächste Zug'),
        ],
      },
      {
        id: 'de-travel-directions',
        title: 'Trouver son chemin',
        exercises: [
          pairs(['links', 'à gauche'], ['rechts', 'à droite'], ['geradeaus', 'tout droit'], ['hinter', 'derrière']),
          choice("Comment dit-on « excusez-moi » pour aborder quelqu'un ?", 'Entschuldigung', ['Danke', 'Tschüss']),
          arrange('Où sont les toilettes ?', 'Wo sind die Toiletten', ['ist', 'wer']),
          arrange('Tournez à gauche.', 'Biegen Sie links ab', ['rechts', 'gehen']),
          write('Où est la gare ?', 'Wo ist der Bahnhof'),
          listen('Ist es weit von hier'),
        ],
      },
      {
        id: 'de-travel-hotel',
        title: "À l'hôtel",
        exercises: [
          pairs(['Zimmer', 'chambre'], ['Schlüssel', 'clé'], ['Bett', 'lit'], ['Nacht', 'nuit']),
          choice("Comment dit-on « j'ai une réservation » ?", 'Ich habe eine Reservierung', ['Ich möchte eine Reservierung', 'Du hast eine Reservierung']),
          arrange('Pour deux nuits.', 'Für zwei Nächte', ['Tage', 'um']),
          write('À quelle heure est le petit-déjeuner ?', 'Wann gibt es Frühstück', 'Um wie viel Uhr gibt es Frühstück'),
          choice('Que veut dire « Das Zimmer ist fertig » ?', 'La chambre est prête', ['La chambre est libre demain', 'La chambre est petite']),
          listen('Könnte ich noch einen Schlüssel haben'),
        ],
      },
    ],
  },
];
