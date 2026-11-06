export interface EnglishVerb {
  base: string;
  fr: string;
  third: string;
  past: string;
  participle: string;
  ing: string;
}

const en = (base: string, fr: string, third: string, past: string, participle: string, ing: string): EnglishVerb => ({
  base,
  fr,
  third,
  past,
  participle,
  ing,
});

export const englishVerbs: EnglishVerb[] = [
  en('be', 'être', 'is', 'was', 'been', 'being'),
  en('have', 'avoir', 'has', 'had', 'had', 'having'),
  en('do', 'faire', 'does', 'did', 'done', 'doing'),
  en('go', 'aller', 'goes', 'went', 'gone', 'going'),
  en('come', 'venir', 'comes', 'came', 'come', 'coming'),
  en('see', 'voir', 'sees', 'saw', 'seen', 'seeing'),
  en('eat', 'manger', 'eats', 'ate', 'eaten', 'eating'),
  en('drink', 'boire', 'drinks', 'drank', 'drunk', 'drinking'),
  en('take', 'prendre', 'takes', 'took', 'taken', 'taking'),
  en('make', 'fabriquer, faire', 'makes', 'made', 'made', 'making'),
  en('get', 'obtenir', 'gets', 'got', 'got', 'getting'),
  en('buy', 'acheter', 'buys', 'bought', 'bought', 'buying'),
  en('say', 'dire', 'says', 'said', 'said', 'saying'),
  en('write', 'écrire', 'writes', 'wrote', 'written', 'writing'),
  en('read', 'lire', 'reads', 'read', 'read', 'reading'),
  en('speak', 'parler', 'speaks', 'spoke', 'spoken', 'speaking'),
  en('work', 'travailler', 'works', 'worked', 'worked', 'working'),
  en('live', 'habiter', 'lives', 'lived', 'lived', 'living'),
  en('play', 'jouer', 'plays', 'played', 'played', 'playing'),
  en('study', 'étudier', 'studies', 'studied', 'studied', 'studying'),
  en('like', 'aimer', 'likes', 'liked', 'liked', 'liking'),
  en('want', 'vouloir', 'wants', 'wanted', 'wanted', 'wanting'),
  en('stop', 'arrêter', 'stops', 'stopped', 'stopped', 'stopping'),
  en('visit', 'visiter', 'visits', 'visited', 'visited', 'visiting'),
];

export interface GermanVerb {
  infinitive: string;
  fr: string;
  /** ich, du, er, wir, ihr, sie. */
  present: string[];
  /** First person of the Präteritum. */
  preterite: string;
  auxiliary: 'haben' | 'sein';
  participle: string;
}

const de = (
  infinitive: string,
  fr: string,
  present: string,
  preterite: string,
  auxiliary: GermanVerb['auxiliary'],
  participle: string,
): GermanVerb => ({ infinitive, fr, present: present.split(' '), preterite, auxiliary, participle });

export const germanVerbs: GermanVerb[] = [
  de('sein', 'être', 'bin bist ist sind seid sind', 'war', 'sein', 'gewesen'),
  de('haben', 'avoir', 'habe hast hat haben habt haben', 'hatte', 'haben', 'gehabt'),
  de('werden', 'devenir', 'werde wirst wird werden werdet werden', 'wurde', 'sein', 'geworden'),
  de('machen', 'faire', 'mache machst macht machen macht machen', 'machte', 'haben', 'gemacht'),
  de('arbeiten', 'travailler', 'arbeite arbeitest arbeitet arbeiten arbeitet arbeiten', 'arbeitete', 'haben', 'gearbeitet'),
  de('wohnen', 'habiter', 'wohne wohnst wohnt wohnen wohnt wohnen', 'wohnte', 'haben', 'gewohnt'),
  de('lernen', 'apprendre', 'lerne lernst lernt lernen lernt lernen', 'lernte', 'haben', 'gelernt'),
  de('spielen', 'jouer', 'spiele spielst spielt spielen spielt spielen', 'spielte', 'haben', 'gespielt'),
  de('kaufen', 'acheter', 'kaufe kaufst kauft kaufen kauft kaufen', 'kaufte', 'haben', 'gekauft'),
  de('gehen', 'aller', 'gehe gehst geht gehen geht gehen', 'ging', 'sein', 'gegangen'),
  de('kommen', 'venir', 'komme kommst kommt kommen kommt kommen', 'kam', 'sein', 'gekommen'),
  de('fahren', 'aller (en véhicule)', 'fahre fährst fährt fahren fahrt fahren', 'fuhr', 'sein', 'gefahren'),
  de('essen', 'manger', 'esse isst isst essen esst essen', 'aß', 'haben', 'gegessen'),
  de('trinken', 'boire', 'trinke trinkst trinkt trinken trinkt trinken', 'trank', 'haben', 'getrunken'),
  de('schlafen', 'dormir', 'schlafe schläfst schläft schlafen schlaft schlafen', 'schlief', 'haben', 'geschlafen'),
  de('lesen', 'lire', 'lese liest liest lesen lest lesen', 'las', 'haben', 'gelesen'),
  de('sprechen', 'parler', 'spreche sprichst spricht sprechen sprecht sprechen', 'sprach', 'haben', 'gesprochen'),
  de('sehen', 'voir', 'sehe siehst sieht sehen seht sehen', 'sah', 'haben', 'gesehen'),
  de('nehmen', 'prendre', 'nehme nimmst nimmt nehmen nehmt nehmen', 'nahm', 'haben', 'genommen'),
  de('schreiben', 'écrire', 'schreibe schreibst schreibt schreiben schreibt schreiben', 'schrieb', 'haben', 'geschrieben'),
  de('geben', 'donner', 'gebe gibst gibt geben gebt geben', 'gab', 'haben', 'gegeben'),
  de('finden', 'trouver', 'finde findest findet finden findet finden', 'fand', 'haben', 'gefunden'),
  de('können', 'pouvoir', 'kann kannst kann können könnt können', 'konnte', 'haben', 'gekonnt'),
  de('müssen', 'devoir', 'muss musst muss müssen müsst müssen', 'musste', 'haben', 'gemusst'),
];
