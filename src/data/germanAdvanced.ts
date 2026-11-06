import type { Unit } from '../types';
import { choose, complete, dialogue, grammar, line, order, q, s, spot, transform, vocab, w } from './build';

const PASSIVE = 'Mets au passif';
const PLUPERFECT = 'Mets au Plusquamperfekt';
const REPORTED = 'Rapporte avec le Konjunktiv I';

export const germanAdvancedUnits: Unit[] = [
  {
    id: 'de-b1-narrate',
    title: 'Raconter une histoire',
    description: 'Le récit écrit, l\'antériorité, les émotions',
    level: 'B1',
    tip: {
      title: 'Le passé du récit',
      points: [
        'À l\'écrit, on raconte au Präteritum, à l\'oral au Perfekt.',
        'Le Plusquamperfekt marque ce qui a eu lieu avant un autre moment du passé.',
        'Nachdem appelle un décalage de temps entre les deux parties.',
      ],
      examples: [
        ['Er ging nach Hause.', 'Il rentra à la maison.'],
        ['Der Zug war schon abgefahren.', 'Le train était déjà parti.'],
        ['Nachdem er gegessen hatte, ging er.', 'Après avoir mangé, il partit.'],
      ],
    },
    lessons: [
      vocab(
        'de-b1-narrate-story',
        'Le fil du récit',
        [
          w('plötzlich', 'soudain'),
          w('zuerst', "d'abord"),
          w('schließlich', 'finalement'),
          w('inzwischen', 'entre-temps'),
          w('leider', 'malheureusement'),
          w('zum Glück', 'heureusement'),
          w('eigentlich', 'en fait'),
          w('wahrscheinlich', 'probablement'),
        ],
        [
          s('Plötzlich ging das Licht aus.', "Soudain, la lumière s'est éteinte."),
          s('Zuerst habe ich sie nicht erkannt.', "D'abord, je ne l'ai pas reconnue."),
          s('Schließlich haben wir eine Lösung gefunden.', 'Finalement, nous avons trouvé une solution.'),
          s('Zum Glück wurde niemand verletzt.', "Heureusement, personne n'a été blessé."),
          s('Leider kann ich nicht kommen.', 'Malheureusement, je ne peux pas venir.'),
          s('Eigentlich wollte ich zu Hause bleiben.', 'En fait, je voulais rester à la maison.'),
        ],
      ),
      vocab(
        'de-b1-narrate-feelings',
        'Les émotions',
        [
          w('stolz', 'fier'),
          w('enttäuscht', 'déçu'),
          w('erleichtert', 'soulagé'),
          w('besorgt', 'inquiet'),
          w('neidisch', 'jaloux'),
          w('dankbar', 'reconnaissant'),
          w('peinlich', 'gênant'),
          w('aufgeregt', 'excité, nerveux'),
        ],
        [
          s('Ich bin sehr stolz auf dich.', 'Je suis très fier de toi.'),
          s('Er war vom Ergebnis enttäuscht.', 'Il était déçu du résultat.'),
          s('Wir waren erleichtert, ihn zu sehen.', 'Nous étions soulagés de le voir.'),
          s('Ich bin dir sehr dankbar.', 'Je te suis très reconnaissant.'),
          s('Das war mir sehr peinlich.', "Cela m'a beaucoup gêné."),
          s('Sie ist vor der Prüfung aufgeregt.', "Elle est nerveuse avant l'examen."),
        ],
      ),
      grammar('de-g-narrative-preterite', 'Le Präteritum du récit', 'B1', {
        intro: 'Dans un texte écrit, tous les verbes passent au Präteritum.',
        points: [
          'Verbes faibles : radical + -te. Machen donne machte.',
          'Verbes forts : voyelle changée, sans -te. Gehen donne ging.',
          'Verbes mixtes : les deux à la fois. Denken donne dachte, wissen donne wusste.',
          'Le carnet Conjugaison entraîne ce temps.',
        ],
        tables: [
          {
            headers: ['Infinitif', 'Präteritum', 'Type'],
            rows: [
              ['sagen', 'sagte', 'faible'],
              ['gehen', 'ging', 'fort'],
              ['kommen', 'kam', 'fort'],
              ['sehen', 'sah', 'fort'],
              ['nehmen', 'nahm', 'fort'],
              ['denken', 'dachte', 'mixte'],
              ['wissen', 'wusste', 'mixte'],
            ],
          },
        ],
        examples: [
          ['Sie kam spät nach Hause.', 'Elle rentra tard à la maison.'],
          ['Er wusste die Antwort nicht.', 'Il ne connaissait pas la réponse.'],
        ],
        questions: [
          choose('Gestern ___ er nach Berlin.', 'fuhr', ['fahrte', 'fährt'], 'Hier, il est allé à Berlin.', 'Fahren est fort : fuhr.'),
          choose('Sie ___ den Bus.', 'nahm', ['nehmte', 'nimmt'], 'Elle prit le bus.', 'Nehmen est fort : nahm.'),
          choose('Ich ___ an dich.', 'dachte', ['denkte', 'dacht'], 'Je pensais à toi.', 'Denken est mixte : dachte.'),
          complete('Er ___ (sagen) nichts.', ['sagte'], 'Il ne dit rien.', 'Verbe faible : -te.'),
          complete('Wir ___ (sehen) einen Film.', ['sahen'], 'Nous vîmes un film.', 'Sehen donne sahen.'),
          complete('Sie ___ (wissen) alles.', ['wusste'], 'Elle savait tout.', 'Verbe mixte.'),
        ],
      }),
      grammar('de-g-pluperfect', 'Le Plusquamperfekt', 'B1', {
        intro: 'Il équivaut au plus-que-parfait français : une action antérieure à un moment passé.',
        points: [
          'Forme : hatte ou war + participe.',
          'Le choix de l\'auxiliaire suit les règles du Perfekt.',
          'Après nachdem : Plusquamperfekt, puis Präteritum.',
        ],
        tables: [
          {
            headers: ['Sujet', 'Avec haben', 'Avec sein'],
            rows: [
              ['ich', 'hatte gegessen', 'war gegangen'],
              ['du', 'hattest gegessen', 'warst gegangen'],
              ['er, sie', 'hatte gegessen', 'war gegangen'],
              ['wir', 'hatten gegessen', 'waren gegangen'],
            ],
          },
        ],
        examples: [
          ['Als ich ankam, war er schon gegangen.', 'Quand je suis arrivé, il était déjà parti.'],
          ['Nachdem wir gegessen hatten, gingen wir spazieren.', 'Après avoir mangé, nous sommes allés nous promener.'],
        ],
        questions: [
          choose('Als ich ankam, ___ der Zug schon abgefahren.', 'war', ['hatte', 'ist'], 'Quand je suis arrivé, le train était déjà parti.', 'Abfahren prend sein.'),
          choose('Ich ___ schon gegessen.', 'hatte', ['war', 'habe'], 'J\'avais déjà mangé.', 'Essen prend haben.'),
          choose('Nachdem er gearbeitet ___, ging er nach Hause.', 'hatte', ['hat', 'war'], 'Après avoir travaillé, il rentra.', 'Nachdem : Plusquamperfekt.'),
          transform(PLUPERFECT, 'Sie hat den Brief geschrieben.', ['Sie hatte den Brief geschrieben'], 'Elle avait écrit la lettre.', 'Hat devient hatte.'),
          transform(PLUPERFECT, 'Wir sind nach Hause gegangen.', ['Wir waren nach Hause gegangen'], 'Nous étions rentrés à la maison.', 'Sind devient waren.'),
          spot('Nachdem sie angekommen war, rief sie an.', ['Nachdem sie ankam, rief sie an.', 'Nachdem sie angekommen hatte, rief sie an.'], 'Ankommen prend sein, au Plusquamperfekt.'),
        ],
      }),
      grammar('de-g-prepositional-verbs', 'Les verbes à préposition', 'B1', {
        intro: 'Beaucoup de verbes imposent une préposition et un cas, à apprendre avec eux.',
        points: [
          'warten auf + accusatif, denken an + accusatif, sich interessieren für + accusatif.',
          'sprechen mit + datif, träumen von + datif, sich freuen über + accusatif.',
          'Pour une chose : wo + préposition, da + préposition. Worauf wartest du? Darauf.',
          'Pour une personne : préposition + pronom. Auf wen wartest du? Auf ihn.',
        ],
        tables: [
          {
            headers: ['Verbe', 'Préposition', 'Exemple'],
            rows: [
              ['warten', 'auf + acc.', 'Ich warte auf den Bus.'],
              ['denken', 'an + acc.', 'Ich denke an dich.'],
              ['sich interessieren', 'für + acc.', 'Ich interessiere mich für Kunst.'],
              ['träumen', 'von + dat.', 'Ich träume von einem Haus.'],
              ['sprechen', 'mit + dat.', 'Ich spreche mit dem Chef.'],
            ],
          },
        ],
        examples: [
          ['Worauf wartest du?', 'Qu\'attends-tu ?'],
          ['Ich interessiere mich für Musik.', 'Je m\'intéresse à la musique.'],
        ],
        questions: [
          choose('Ich warte ___ den Bus.', 'auf', ['für', 'an'], 'J\'attends le bus.', 'Warten auf.'),
          choose('Sie denkt oft ___ ihre Familie.', 'an', ['auf', 'von'], 'Elle pense souvent à sa famille.', 'Denken an.'),
          choose('Ich interessiere mich ___ Politik.', 'für', ['an', 'mit'], 'Je m\'intéresse à la politique.', 'Sich interessieren für.'),
          choose('___ wartest du?', 'Worauf', ['Was', 'Auf was für'], 'Qu\'attends-tu ?', 'Wo + auf, avec un r de liaison.'),
          complete('Ich träume ___ einem Haus am Meer.', ['von'], 'Je rêve d\'une maison au bord de la mer.', 'Träumen von.'),
          complete('Wartest du auf den Bus? Ja, ich warte ___.', ['darauf'], 'Attends-tu le bus ? Oui, je l\'attends.', 'Da + auf reprend une chose.'),
        ],
      }),
      dialogue(
        'de-b1-narrate-dialogue',
        'Un voyage mouvementé',
        'Lena raconte à Max son retour de vacances.',
        [
          line('Max', 'Du siehst müde aus. Was ist passiert?', 'Tu as l\'air fatiguée. Que s\'est-il passé ?'),
          line('Lena', 'Als ich am Flughafen ankam, war mein Flug schon gestartet.', 'Quand je suis arrivée à l\'aéroport, mon vol avait déjà décollé.'),
          line('Max', 'Oh nein! Hattest du die Zeit nicht geprüft?', 'Oh non ! N\'avais-tu pas vérifié l\'heure ?'),
          line('Lena', 'Doch, aber der Flugplan war geändert worden.', 'Si, mais l\'horaire avait été changé.'),
          line('Max', 'Das ist mir auch schon passiert. Worauf hast du dann gewartet?', 'Ça m\'est déjà arrivé aussi. Qu\'as-tu attendu ensuite ?'),
          line('Lena', 'Auf den nächsten Flug. Zum Glück bekam ich einen Platz.', 'Le vol suivant. Heureusement, j\'ai eu une place.'),
          line('Max', 'Da warst du sicher sehr erleichtert.', 'Tu as dû être très soulagée.'),
        ],
        [
          q('Pourquoi Lena a-t-elle raté son vol ?', "L'horaire avait été changé", 'Elle s\'était trompée de jour', 'Son taxi était en retard'),
          q('Qu\'a obtenu Lena ?', 'Une place sur le vol suivant', 'Un remboursement', 'Une nuit d\'hôtel'),
        ],
      ),
    ],
  },
  {
    id: 'de-b1-passive',
    title: 'Décrire la société',
    description: 'Le passif, les relatives, le génitif',
    level: 'B1',
    tip: {
      title: 'Des phrases plus construites',
      points: [
        'Le passif se forme avec werden, et non avec sein.',
        'Les relatives ont le verbe à la fin et s\'accordent en genre et en cas.',
        'Le génitif marque la possession, surtout à l\'écrit.',
      ],
      examples: [
        ['Das Haus wird gebaut.', 'La maison est en construction.'],
        ['Der Mann, der dort steht, ist mein Chef.', 'L\'homme qui se tient là est mon patron.'],
        ['Das ist das Auto meines Vaters.', 'C\'est la voiture de mon père.'],
      ],
    },
    lessons: [
      vocab(
        'de-b1-passive-society',
        'La société',
        [
          w('die Regierung', 'gouvernement'),
          w('das Gesetz', 'loi'),
          w('die Steuer', 'impôt'),
          w('die Arbeitslosigkeit', 'chômage'),
          w('das Recht', 'droit'),
          w('die Gesellschaft', 'société'),
          w('der Bürger', 'citoyen'),
          w('die Partei', 'parti'),
        ],
        [
          s('Die Regierung hat das Gesetz geändert.', 'Le gouvernement a changé la loi.'),
          s('Die Steuern steigen nächstes Jahr.', "Les impôts augmentent l'année prochaine."),
          s('Die Arbeitslosigkeit ist gesunken.', 'Le chômage a baissé.'),
          s('Jeder Bürger hat das Recht zu wählen.', 'Chaque citoyen a le droit de voter.'),
          s('Welche Partei hat gewonnen?', 'Quel parti a gagné ?'),
          s('Unsere Gesellschaft verändert sich.', 'Notre société change.'),
        ],
      ),
      vocab(
        'de-b1-passive-media',
        'Les médias',
        [
          w('die Zeitung', 'journal'),
          w('der Artikel', 'article'),
          w('der Journalist', 'journaliste'),
          w('das Gerücht', 'rumeur'),
          w('die Umfrage', 'sondage'),
          w('die Sendung', 'émission'),
          w('die Quelle', 'source'),
          w('die Schlagzeile', 'gros titre'),
        ],
        [
          s('Ich habe gestern einen interessanten Artikel gelesen.', "J'ai lu un article intéressant hier."),
          s('Die Schlagzeile war irreführend.', 'Le gros titre était trompeur.'),
          s('Es gibt ein Gerücht über die Firma.', "Il y a une rumeur sur l'entreprise."),
          s('Die Umfrage zeigt ein klares Ergebnis.', 'Le sondage montre un résultat clair.'),
          s('Die Journalistin schützt ihre Quelle.', 'La journaliste protège sa source.'),
          s('Diese Sendung läuft jeden Abend.', 'Cette émission passe tous les soirs.'),
        ],
      ),
      grammar('de-g-passive', 'Le passif', 'B1', {
        intro: 'Le passif met l\'accent sur l\'action. Il se forme avec werden et le participe.',
        points: [
          'Présent : wird gebaut. Präteritum : wurde gebaut. Perfekt : ist gebaut worden.',
          'L\'auteur s\'introduit avec von + datif.',
          'Il traduit souvent notre « on » : Hier wird Deutsch gesprochen.',
          'Attention : au passif parfait, worden remplace geworden.',
        ],
        tables: [
          {
            headers: ['Temps', 'Exemple'],
            rows: [
              ['Präsens', 'Die Tür wird geöffnet.'],
              ['Präteritum', 'Die Tür wurde geöffnet.'],
              ['Perfekt', 'Die Tür ist geöffnet worden.'],
              ['Avec modal', 'Die Tür muss geöffnet werden.'],
            ],
          },
        ],
        examples: [
          ['Hier wird Deutsch gesprochen.', 'Ici, on parle allemand.'],
          ['Die Brücke wurde 1900 gebaut.', 'Le pont a été construit en 1900.'],
        ],
        questions: [
          choose('Das Haus ___ gerade gebaut.', 'wird', ['ist', 'hat'], 'La maison est en construction.', 'Passif présent : wird.'),
          choose('Die Brücke ___ 1900 gebaut.', 'wurde', ['war', 'hat'], 'Le pont a été construit en 1900.', 'Passif prétérit : wurde.'),
          choose('Das Fenster ist geöffnet ___.', 'worden', ['geworden', 'werden'], 'La fenêtre a été ouverte.', 'Passif parfait : worden.'),
          transform(PASSIVE, 'Man repariert das Auto.', ['Das Auto wird repariert'], 'La voiture est réparée.', 'L\'objet devient sujet.'),
          transform(PASSIVE, 'Man baute das Haus 1950.', ['Das Haus wurde 1950 gebaut'], 'La maison a été construite en 1950.', 'Wurde + participe à la fin.'),
          complete('Der Brief wurde ___ meiner Schwester geschrieben.', ['von'], 'La lettre a été écrite par ma sœur.', 'L\'auteur avec von.'),
        ],
      }),
      grammar('de-g-relative', 'Les propositions relatives', 'B1', {
        intro: 'Le pronom relatif reprend le genre du nom, et son cas dépend de la relative.',
        points: [
          'Les pronoms ressemblent aux articles : der, die, das.',
          'Le verbe conjugué va à la fin, après une virgule obligatoire.',
          'Au datif pluriel : denen. Au génitif : dessen, deren.',
          'Une préposition se place avant le pronom : der Freund, mit dem ich spreche.',
        ],
        tables: [
          {
            headers: ['', 'Masculin', 'Féminin', 'Neutre', 'Pluriel'],
            rows: [
              ['Nominatif', 'der', 'die', 'das', 'die'],
              ['Accusatif', 'den', 'die', 'das', 'die'],
              ['Datif', 'dem', 'der', 'dem', 'denen'],
            ],
          },
        ],
        examples: [
          ['Das ist der Mann, den ich kenne.', 'C\'est l\'homme que je connais.'],
          ['Die Frau, mit der ich arbeite, ist nett.', 'La femme avec qui je travaille est gentille.'],
        ],
        questions: [
          choose('Der Mann, ___ dort steht, ist mein Chef.', 'der', ['den', 'dem'], 'L\'homme qui se tient là est mon patron.', 'Sujet de la relative : der.'),
          choose('Der Film, ___ ich gesehen habe, war gut.', 'den', ['der', 'das'], 'Le film que j\'ai vu était bon.', 'Objet, masculin : den.'),
          choose('Die Frau, ___ ich helfe, ist alt.', 'der', ['die', 'dem'], 'La femme que j\'aide est âgée.', 'Helfen + datif, féminin : der.'),
          choose('Die Kinder, mit ___ ich spiele, sind nett.', 'denen', ['den', 'die'], 'Les enfants avec qui je joue sont gentils.', 'Datif pluriel : denen.'),
          complete('Das Buch, ___ auf dem Tisch liegt, ist neu.', ['das'], 'Le livre qui est sur la table est neuf.', 'Neutre, sujet : das.'),
          spot('Das ist die Stadt, in der ich wohne.', ['Das ist die Stadt, in der ich wohne dort.', 'Das ist die Stadt, in der wohne ich.'], 'Le verbe se place à la fin.'),
        ],
      }),
      grammar('de-g-genitive', 'Le génitif', 'B1', {
        intro: 'Il exprime la possession et suit certaines prépositions.',
        points: [
          'Masculin et neutre : des, avec -s ou -es sur le nom. Das Auto des Mannes.',
          'Féminin et pluriel : der. Die Tasche der Frau.',
          'Prépositions : wegen, trotz, während, innerhalb, außerhalb.',
          'À l\'oral, on remplace souvent par von + datif.',
        ],
        tables: [
          {
            headers: ['', 'Défini', 'Indéfini', 'Exemple'],
            rows: [
              ['Masculin', 'des', 'eines', 'des Vaters'],
              ['Féminin', 'der', 'einer', 'der Mutter'],
              ['Neutre', 'des', 'eines', 'des Kindes'],
              ['Pluriel', 'der', '—', 'der Kinder'],
            ],
          },
        ],
        examples: [
          ['Das ist das Auto meines Vaters.', 'C\'est la voiture de mon père.'],
          ['Wegen des Regens bleiben wir hier.', 'À cause de la pluie, nous restons ici.'],
        ],
        questions: [
          choose('Das ist das Haus ___ Lehrers.', 'des', ['der', 'dem'], 'C\'est la maison du professeur.', 'Masculin : des, et -s sur le nom.'),
          choose('Das ist die Tasche ___ Frau.', 'der', ['des', 'die'], 'C\'est le sac de la femme.', 'Féminin : der.'),
          choose('Wegen ___ Wetters bleiben wir zu Hause.', 'des', ['dem', 'das'], 'À cause du temps, nous restons à la maison.', 'Wegen + génitif.'),
          choose('Trotz ___ Kälte gehen wir spazieren.', 'der', ['die', 'den'], 'Malgré le froid, nous allons nous promener.', 'Trotz + génitif, Kälte est féminin.'),
          complete('Das ist das Auto ___ Vaters.', ['meines'], 'C\'est la voiture de mon père.', 'Mein au génitif masculin.'),
          complete('Das Ende ___ Films war gut.', ['des'], 'La fin du film était bonne.', 'Film est masculin : des Films.'),
        ],
      }),
      dialogue(
        'de-b1-passive-dialogue',
        'La rumeur',
        'Lena et Max discutent d\'une nouvelle à leur travail.',
        [
          line('Lena', 'Hast du das Gerücht gehört, das gerade erzählt wird?', 'As-tu entendu la rumeur qui circule ?'),
          line('Max', 'Nein, worum geht es?', 'Non, de quoi s\'agit-il ?'),
          line('Lena', 'Das Büro in Berlin soll geschlossen werden.', 'Le bureau de Berlin devrait être fermé.'),
          line('Max', 'Wer hat das gesagt?', 'Qui a dit cela ?'),
          line('Lena', 'Eine Journalistin, die für die Lokalzeitung schreibt.', 'Une journaliste qui écrit pour le journal local.'),
          line('Max', 'Wurde das schon bestätigt?', 'Cela a-t-il déjà été confirmé ?'),
          line('Lena', 'Noch nicht. Wegen der Gerüchte erklärt die Chefin am Freitag alles.', 'Pas encore. À cause des rumeurs, la patronne expliquera tout vendredi.'),
        ],
        [
          q('Selon la rumeur, que va-t-il se passer ?', 'Le bureau de Berlin va fermer', 'Max va partir', 'Les salaires vont augmenter'),
          q('Quand la patronne s\'expliquera-t-elle ?', 'Vendredi', 'Demain', 'Le mois prochain'),
        ],
      ),
    ],
  },
  {
    id: 'de-b1-purpose',
    title: 'Études et objectifs',
    description: 'Exprimer un but, une intention, une manière de faire',
    level: 'B1',
    tip: {
      title: 'L\'infinitif avec zu',
      points: [
        'Après beaucoup de verbes et d\'adjectifs, l\'infinitif est précédé de zu.',
        'Avec un verbe séparable, zu se glisse à l\'intérieur : aufzustehen.',
        'Pour un but, um ... zu si le sujet est le même, sinon damit.',
      ],
      examples: [
        ['Ich versuche, früh aufzustehen.', 'J\'essaie de me lever tôt.'],
        ['Ich lerne Deutsch, um in Berlin zu arbeiten.', 'J\'apprends l\'allemand pour travailler à Berlin.'],
        ['Ich erkläre es, damit du es verstehst.', 'Je l\'explique pour que tu comprennes.'],
      ],
    },
    lessons: [
      vocab(
        'de-b1-purpose-studies',
        'Les études',
        [
          w('die Ausbildung', 'formation professionnelle'),
          w('das Studium', 'études'),
          w('die Universität', 'université'),
          w('der Abschluss', 'diplôme'),
          w('das Praktikum', 'stage'),
          w('die Bewerbung', 'candidature'),
          w('der Kurs', 'cours'),
          w('das Zeugnis', 'bulletin, certificat'),
        ],
        [
          s('Sie macht eine Ausbildung zur Krankenschwester.', 'Elle suit une formation d\'infirmière.'),
          s('Nach dem Studium möchte ich reisen.', 'Après mes études, je voudrais voyager.'),
          s('Er hat einen guten Abschluss.', 'Il a un bon diplôme.'),
          s('Ich mache ein Praktikum in Berlin.', 'Je fais un stage à Berlin.'),
          s('Meine Bewerbung wurde angenommen.', 'Ma candidature a été acceptée.'),
          s('Der Kurs beginnt im September.', 'Le cours commence en septembre.'),
        ],
      ),
      vocab(
        'de-b1-purpose-verbs',
        'Les verbes d\'intention',
        [
          w('versuchen', 'essayer'),
          w('vergessen', 'oublier'),
          w('hoffen', 'espérer'),
          w('planen', 'prévoir'),
          w('beginnen', 'commencer'),
          w('aufhören', 'arrêter'),
          w('vorhaben', 'avoir l\'intention de'),
          w('sich entscheiden', 'se décider'),
        ],
        [
          s('Ich versuche, weniger Kaffee zu trinken.', "J'essaie de boire moins de café."),
          s('Vergiss nicht, mich anzurufen.', "N'oublie pas de m'appeler."),
          s('Ich hoffe, dich bald zu sehen.', "J'espère te voir bientôt."),
          s('Es hat aufgehört zu regnen.', 'Il a cessé de pleuvoir.'),
          s('Was hast du heute vor?', "Qu'as-tu prévu aujourd'hui ?"),
          s('Sie hat sich für den Job entschieden.', 'Elle a choisi le poste.'),
        ],
      ),
      grammar('de-g-zu-infinitive', "L'infinitif avec zu", 'B1', {
        intro: 'Le groupe infinitif se place après la virgule, avec zu juste avant le verbe.',
        points: [
          'Après versuchen, vergessen, hoffen, beginnen, Lust haben, Zeit haben.',
          'Après es ist + adjectif : Es ist schwer, Deutsch zu lernen.',
          'Pas de zu après les modaux, ni après gehen, bleiben, hören, sehen.',
          'Verbe séparable : anzurufen, aufzustehen.',
        ],
        tables: [
          {
            headers: ['Sans zu', 'Avec zu'],
            rows: [
              ['Ich kann schwimmen.', 'Ich versuche zu schwimmen.'],
              ['Ich gehe schwimmen.', 'Ich habe Lust zu schwimmen.'],
              ['Ich muss aufstehen.', 'Ich vergesse aufzustehen.'],
            ],
          },
        ],
        examples: [
          ['Es ist wichtig, regelmäßig zu üben.', 'Il est important de s\'entraîner régulièrement.'],
          ['Hast du Lust, ins Kino zu gehen?', 'As-tu envie d\'aller au cinéma ?'],
        ],
        questions: [
          choose('Ich habe keine Zeit, ___.', 'zu kochen', ['kochen', 'kochen zu'], 'Je n\'ai pas le temps de cuisiner.', 'Zeit haben + zu.'),
          choose('Ich kann heute ___.', 'kommen', ['zu kommen', 'gekommen'], 'Je peux venir aujourd\'hui.', 'Pas de zu après un modal.'),
          choose('Vergiss nicht, mich ___.', 'anzurufen', ['zu anrufen', 'anrufen'], 'N\'oublie pas de m\'appeler.', 'Zu se glisse dans le verbe séparable.'),
          complete('Es ist schwer, Deutsch ___ lernen.', ['zu'], 'Il est difficile d\'apprendre l\'allemand.', 'Es ist + adjectif + zu.'),
          complete('Ich versuche, früh ___ (aufstehen).', ['aufzustehen'], 'J\'essaie de me lever tôt.', 'Auf + zu + stehen.'),
          spot('Ich habe Lust, ins Kino zu gehen.', ['Ich habe Lust, zu gehen ins Kino.', 'Ich habe Lust, ins Kino gehen.'], 'Zu + infinitif à la fin.'),
        ],
      }),
      grammar('de-g-um-zu', 'Um ... zu et damit', 'B1', {
        intro: 'Les deux expriment le but, mais la structure dépend du sujet.',
        points: [
          'Même sujet : um ... zu + infinitif.',
          'Sujets différents : damit + verbe à la fin.',
          'Ohne ... zu : sans faire. Statt ... zu : au lieu de faire.',
        ],
        tables: [
          {
            headers: ['Forme', 'Exemple'],
            rows: [
              ['um ... zu', 'Ich lerne, um die Prüfung zu bestehen.'],
              ['damit', 'Ich erkläre es, damit du es verstehst.'],
              ['ohne ... zu', 'Er ging, ohne etwas zu sagen.'],
              ['statt ... zu', 'Er spielt, statt zu arbeiten.'],
            ],
          },
        ],
        examples: [
          ['Sie spart, um ein Auto zu kaufen.', 'Elle économise pour acheter une voiture.'],
          ['Er ging, ohne etwas zu sagen.', 'Il est parti sans rien dire.'],
        ],
        questions: [
          choose('Ich lerne Deutsch, ___ in Berlin zu arbeiten.', 'um', ['damit', 'weil'], 'J\'apprends l\'allemand pour travailler à Berlin.', 'Même sujet : um ... zu.'),
          choose('Ich spreche langsam, ___ du mich verstehst.', 'damit', ['um', 'ohne'], 'Je parle lentement pour que tu me comprennes.', 'Sujets différents : damit.'),
          choose('Er ging, ___ etwas zu sagen.', 'ohne', ['damit', 'weil'], 'Il est parti sans rien dire.', 'Ohne ... zu.'),
          transform('Exprime le but avec um ... zu', 'Ich spare. Ich will ein Auto kaufen.', ['Ich spare, um ein Auto zu kaufen'], 'J\'économise pour acheter une voiture.', 'Um en début, zu + infinitif à la fin.'),
          order('Il regarde la télé au lieu de travailler.', 'Er sieht fern statt zu arbeiten', ['um', 'arbeitet'], 'Statt ... zu.'),
          spot('Ich rufe an, damit du es weißt.', ['Ich rufe an, um du es weißt.', 'Ich rufe an, damit weißt du es.'], 'Damit, avec le verbe à la fin.'),
        ],
      }),
      grammar('de-g-indirect-questions', 'Les questions indirectes', 'B1', {
        intro: 'Après wissen, fragen ou können Sie mir sagen, le verbe passe à la fin.',
        points: [
          'Question en W : on garde le mot en W. Ich weiß nicht, wo er wohnt.',
          'Question fermée : on utilise ob.',
          'C\'est la forme polie : Können Sie mir sagen, wo der Bahnhof ist?',
        ],
        tables: [
          {
            headers: ['Directe', 'Indirecte'],
            rows: [
              ['Wo wohnt er?', 'Ich weiß nicht, wo er wohnt.'],
              ['Kommt sie?', 'Ich weiß nicht, ob sie kommt.'],
              ['Wann fährt der Zug?', 'Wissen Sie, wann der Zug fährt?'],
            ],
          },
        ],
        examples: [
          ['Können Sie mir sagen, wo der Bahnhof ist?', 'Pouvez-vous me dire où est la gare ?'],
          ['Ich frage mich, ob das stimmt.', 'Je me demande si c\'est vrai.'],
        ],
        questions: [
          choose('Weißt du, wo er ___?', 'wohnt', ['wohnen', 'wohnt er'], 'Sais-tu où il habite ?', 'Le verbe à la fin.'),
          choose('Ich weiß nicht, ___ sie kommt.', 'ob', ['wenn', 'dass'], 'Je ne sais pas si elle vient.', 'Question fermée : ob.'),
          transform('Commence par : Ich weiß nicht', 'Wann kommt der Bus?', ['Ich weiß nicht, wann der Bus kommt'], 'Je ne sais pas quand le bus arrive.', 'Kommt va à la fin.'),
          transform('Commence par : Können Sie mir sagen', 'Wo ist die Bank?', ['Können Sie mir sagen, wo die Bank ist?'], 'Pouvez-vous me dire où est la banque ?', 'Ist va à la fin.'),
          complete('Ich frage mich, ___ das stimmt.', ['ob'], 'Je me demande si c\'est vrai.', 'Si : ob.'),
          spot('Wissen Sie, wann der Zug abfährt?', ['Wissen Sie, wann fährt der Zug ab?', 'Wissen Sie, wann der Zug fährt ab?'], 'Le séparable se ressoude à la fin.'),
        ],
      }),
      dialogue(
        'de-b1-purpose-dialogue',
        'Les projets d\'études',
        'Lena conseille Max sur son avenir.',
        [
          line('Lena', 'Was hast du nach dem Abschluss vor?', 'Que comptes-tu faire après ton diplôme ?'),
          line('Max', 'Ich versuche, ein Praktikum in Wien zu finden.', 'J\'essaie de trouver un stage à Vienne.'),
          line('Lena', 'Warum gerade in Wien?', 'Pourquoi à Vienne justement ?'),
          line('Max', 'Um mein Deutsch zu verbessern und neue Leute kennenzulernen.', 'Pour améliorer mon allemand et rencontrer de nouvelles personnes.'),
          line('Lena', 'Hast du deine Bewerbung schon geschickt?', 'As-tu déjà envoyé ta candidature ?'),
          line('Max', 'Noch nicht. Ich weiß nicht, ob mein Zeugnis gut genug ist.', 'Pas encore. Je ne sais pas si mon bulletin est assez bon.'),
          line('Lena', 'Schick mir alles, damit ich es lesen kann.', 'Envoie-moi tout pour que je puisse le lire.'),
        ],
        [
          q('Pourquoi Max veut-il aller à Vienne ?', 'Pour améliorer son allemand', 'Pour rejoindre sa famille', 'Pour un meilleur salaire'),
          q('Que propose Lena ?', 'De relire sa candidature', 'De l\'accompagner', 'De lui trouver un stage'),
        ],
      ),
    ],
  },
  {
    id: 'de-b2-reported',
    title: 'Rapporter et imaginer',
    description: 'Le Konjunktiv I, le passif avec modal, les regrets',
    level: 'B2',
    tip: {
      title: 'Prendre ses distances',
      points: [
        'Le Konjunktiv I rapporte les paroles d\'autrui, surtout dans la presse.',
        'Le Konjunktiv II passé exprime ce qui n\'a pas eu lieu.',
        'Le passif se combine aux modaux : muss gemacht werden.',
      ],
      examples: [
        ['Er sagte, er sei krank.', 'Il a dit qu\'il était malade.'],
        ['Wenn ich das gewusst hätte, wäre ich gekommen.', 'Si j\'avais su, je serais venu.'],
        ['Das Problem muss gelöst werden.', 'Le problème doit être résolu.'],
      ],
    },
    lessons: [
      vocab(
        'de-b2-reported-verbs',
        'Les verbes du discours',
        [
          w('behaupten', 'affirmer'),
          w('berichten', 'rapporter'),
          w('erklären', 'expliquer'),
          w('vermuten', 'supposer'),
          w('bestätigen', 'confirmer'),
          w('bestreiten', 'contester'),
          w('mitteilen', 'communiquer'),
          w('betonen', 'souligner'),
        ],
        [
          s('Er behauptet, das Geld nicht genommen zu haben.', "Il affirme ne pas avoir pris l'argent."),
          s('Die Zeitung berichtet über den Fall.', "Le journal rend compte de l'affaire."),
          s('Das kann ich nicht bestätigen.', 'Je ne peux pas le confirmer.'),
          s('Sie bestreitet alle Vorwürfe.', 'Elle conteste toutes les accusations.'),
          s('Die Firma teilte das Ergebnis mit.', "L'entreprise a communiqué le résultat."),
          s('Der Minister betonte die Bedeutung der Reform.', "Le ministre a souligné l'importance de la réforme."),
        ],
      ),
      vocab(
        'de-b2-reported-money',
        "L'argent",
        [
          w('der Kredit', 'prêt'),
          w('die Schulden', 'dettes'),
          w('die Miete', 'loyer'),
          w('die Ersparnisse', 'économies'),
          w('das Einkommen', 'revenu'),
          w('die Investition', 'investissement'),
          w('die Versicherung', 'assurance'),
          w('das Konto', 'compte'),
        ],
        [
          s('Wir haben einen Kredit aufgenommen.', 'Nous avons contracté un prêt.'),
          s('Er hat hohe Schulden.', 'Il a de grosses dettes.'),
          s('Die Miete ist wieder gestiegen.', 'Le loyer a encore augmenté.'),
          s('Sie hat alle ihre Ersparnisse ausgegeben.', 'Elle a dépensé toutes ses économies.'),
          s('Das war eine riskante Investition.', "C'était un investissement risqué."),
          s('Ich möchte ein Konto eröffnen.', 'Je voudrais ouvrir un compte.'),
        ],
      ),
      grammar('de-g-konjunktiv-1', 'Le Konjunktiv I', 'B2', {
        intro: 'Il signale qu\'on rapporte des propos sans les prendre à son compte.',
        points: [
          'Forme : radical de l\'infinitif + -e. Er komme, er habe, er gehe.',
          'Sein est irrégulier : er sei, sie seien.',
          'Il s\'utilise surtout à la 3e personne.',
          'Si la forme est identique à l\'indicatif, on passe au Konjunktiv II.',
        ],
        tables: [
          {
            headers: ['Infinitif', 'Indicatif', 'Konjunktiv I'],
            rows: [
              ['sein', 'er ist', 'er sei'],
              ['haben', 'er hat', 'er habe'],
              ['kommen', 'er kommt', 'er komme'],
              ['können', 'er kann', 'er könne'],
              ['werden', 'er wird', 'er werde'],
            ],
          },
        ],
        examples: [
          ['Der Minister sagte, er sei nicht informiert.', 'Le ministre a dit qu\'il n\'était pas informé.'],
          ['Sie erklärte, sie habe keine Zeit.', 'Elle a expliqué qu\'elle n\'avait pas le temps.'],
        ],
        questions: [
          choose('Er sagte, er ___ krank.', 'sei', ['ist', 'wäre gewesen'], 'Il a dit qu\'il était malade.', 'Sein au Konjunktiv I : sei.'),
          choose('Sie erklärte, sie ___ keine Zeit.', 'habe', ['hat', 'hatte'], 'Elle a expliqué qu\'elle n\'avait pas le temps.', 'Haben : habe.'),
          choose('Der Sprecher sagte, die Firma ___ wachsen.', 'werde', ['wird', 'wurde'], 'Le porte-parole a dit que l\'entreprise allait croître.', 'Werden : werde.'),
          transform(REPORTED, 'Er sagte: "Ich komme morgen."', ['Er sagte, er komme morgen'], 'Il a dit qu\'il viendrait demain.', 'Kommt devient komme.'),
          transform(REPORTED, 'Sie sagte: "Ich kann nicht helfen."', ['Sie sagte, sie könne nicht helfen'], 'Elle a dit qu\'elle ne pouvait pas aider.', 'Kann devient könne.'),
          complete('Die Polizei teilte mit, der Täter ___ geflohen.', ['sei'], 'La police a indiqué que l\'auteur s\'était enfui.', 'Passé rapporté : sei + participe.'),
        ],
      }),
      grammar('de-g-passive-modal', 'Le passif avec modal', 'B2', {
        intro: 'Le modal se conjugue, le participe et werden vont à la fin.',
        points: [
          'Présent : Das muss gemacht werden.',
          'Passé : Das musste gemacht werden.',
          'Passif d\'état : sein + participe, le résultat. Die Tür ist geöffnet.',
          'Alternatives : sich lassen + infinitif, sein + zu + infinitif.',
        ],
        tables: [
          {
            headers: ['Forme', 'Exemple', 'Sens'],
            rows: [
              ['modal + passif', 'Das kann repariert werden.', 'Cela peut être réparé.'],
              ['lässt sich', 'Das lässt sich reparieren.', 'Cela se répare.'],
              ['ist zu', 'Das ist zu reparieren.', 'Cela doit, ou peut, être réparé.'],
            ],
          },
        ],
        examples: [
          ['Das Problem muss schnell gelöst werden.', 'Le problème doit être résolu rapidement.'],
          ['Das lässt sich leicht erklären.', 'Cela s\'explique facilement.'],
        ],
        questions: [
          choose('Das Problem muss gelöst ___.', 'werden', ['worden', 'wird'], 'Le problème doit être résolu.', 'Modal + participe + werden.'),
          choose('Die Rechnung ___ bezahlt werden.', 'muss', ['müssen', 'wird'], 'La facture doit être payée.', 'Le modal s\'accorde avec le sujet.'),
          choose('Das Fenster ist ___.', 'geöffnet', ['öffnen', 'geöffnet worden werden'], 'La fenêtre est ouverte.', 'Passif d\'état.'),
          transform('Mets au passif avec müssen', 'Man muss das Auto reparieren.', ['Das Auto muss repariert werden'], 'La voiture doit être réparée.', 'Participe + werden à la fin.'),
          transform('Exprime avec sich lassen', 'Das kann man leicht erklären.', ['Das lässt sich leicht erklären'], 'Cela s\'explique facilement.', 'Lässt sich + infinitif.'),
          complete('Der Vertrag konnte nicht unterschrieben ___.', ['werden'], 'Le contrat n\'a pas pu être signé.', 'Werden à la fin.'),
        ],
      }),
      grammar('de-g-konjunktiv-2-past', 'Le Konjunktiv II passé', 'B2', {
        intro: 'Il imagine ce qui aurait pu se passer et exprime le regret.',
        points: [
          'Forme : hätte ou wäre + participe.',
          'Le choix suit celui du Perfekt.',
          'Avec modal : hätte + infinitif + modal. Ich hätte kommen können.',
          'Sans wenn, le verbe vient en tête : Hätte ich das gewusst, ...',
        ],
        tables: [
          {
            headers: ['Forme', 'Exemple'],
            rows: [
              ['hätte + participe', 'Ich hätte dir geholfen.'],
              ['wäre + participe', 'Ich wäre gekommen.'],
              ['avec modal', 'Ich hätte kommen können.'],
              ['sans wenn', 'Hätte ich Zeit gehabt, ...'],
            ],
          },
        ],
        examples: [
          ['Wenn ich das gewusst hätte, wäre ich gekommen.', 'Si j\'avais su, je serais venu.'],
          ['Du hättest mich anrufen sollen.', 'Tu aurais dû m\'appeler.'],
        ],
        questions: [
          choose('Wenn ich Zeit gehabt hätte, ___ ich gekommen.', 'wäre', ['hätte', 'war'], 'Si j\'avais eu le temps, je serais venu.', 'Kommen prend sein.'),
          choose('Ich ___ dir geholfen.', 'hätte', ['wäre', 'hatte'], 'Je t\'aurais aidé.', 'Helfen prend haben.'),
          choose('Du hättest mich anrufen ___.', 'sollen', ['gesollt', 'sollst'], 'Tu aurais dû m\'appeler.', 'Double infinitif avec modal.'),
          transform('Exprime le regret sans wenn', 'Wenn ich das gewusst hätte, wäre ich gekommen.', ['Hätte ich das gewusst, wäre ich gekommen'], 'Si j\'avais su, je serais venu.', 'Le verbe prend la place de wenn.'),
          complete('Wenn wir früher gegangen ___, hätten wir den Zug bekommen.', ['wären'], 'Si nous étions partis plus tôt, nous aurions eu le train.', 'Gehen prend sein.'),
          spot('Ich hätte das nicht tun sollen.', ['Ich hätte das nicht getan gesollt.', 'Ich wäre das nicht tun sollen.'], 'Hätte + infinitif + sollen.'),
        ],
      }),
      dialogue(
        'de-b2-reported-dialogue',
        'Le poste à Zurich',
        'Max se demande s\'il a fait le bon choix.',
        [
          line('Max', 'Hätte ich damals den Job in Zürich angenommen, würde ich jetzt viel mehr verdienen.', 'Si j\'avais accepté le poste à Zurich à l\'époque, je gagnerais bien plus maintenant.'),
          line('Lena', 'Vielleicht, aber du hättest deine Frau nicht kennengelernt.', 'Peut-être, mais tu n\'aurais pas rencontré ta femme.'),
          line('Max', 'Das stimmt. Mein Chef sagte damals, die Stelle sei sehr sicher.', 'C\'est vrai. Mon patron disait à l\'époque que le poste était très sûr.'),
          line('Lena', 'Und was ist aus der Firma geworden?', 'Et qu\'est devenue l\'entreprise ?'),
          line('Max', 'Laut Zeitung musste sie letztes Jahr verkauft werden.', 'D\'après le journal, elle a dû être vendue l\'an dernier.'),
          line('Lena', 'Siehst du? Du hättest also vielleicht gar nichts gewonnen.', 'Tu vois ? Tu n\'aurais donc peut-être rien gagné.'),
        ],
        [
          q('Que regrette Max ?', 'De ne pas avoir accepté le poste', 'D\'avoir déménagé', 'D\'avoir quitté sa femme'),
          q('Qu\'est-il arrivé à l\'entreprise ?', 'Elle a été vendue', 'Elle a doublé de taille', 'Elle a déménagé'),
        ],
      ),
    ],
  },
  {
    id: 'de-b2-argue',
    title: 'Argumenter',
    description: 'Connecteurs, nominalisation, environnement',
    level: 'B2',
    tip: {
      title: 'Structurer sa pensée',
      points: [
        'Les connecteurs doubles donnent de la rigueur à un texte.',
        'L\'écrit préfère les groupes nominaux aux subordonnées.',
        'Wegen, trotz et während appellent le génitif.',
      ],
      examples: [
        ['Je mehr ich lese, desto weniger weiß ich.', 'Plus je lis, moins j\'en sais.'],
        ['Wegen des Regens blieben wir zu Hause.', 'À cause de la pluie, nous sommes restés à la maison.'],
        ['Sie spricht nicht nur Deutsch, sondern auch Italienisch.', 'Elle parle non seulement allemand, mais aussi italien.'],
      ],
    },
    lessons: [
      vocab(
        'de-b2-argue-linkers',
        'Les connecteurs',
        [
          w('außerdem', 'en outre'),
          w('jedoch', 'cependant'),
          w('dennoch', 'néanmoins'),
          w('folglich', 'par conséquent'),
          w('stattdessen', 'à la place'),
          w('andernfalls', 'sinon'),
          w('hingegen', 'en revanche'),
          w('insgesamt', 'dans l\'ensemble'),
        ],
        [
          s('Es ist teuer, jedoch lohnt es sich.', 'C\'est cher, cependant cela en vaut la peine.'),
          s('Außerdem fehlt uns die Zeit.', 'En outre, nous manquons de temps.'),
          s('Er war krank, dennoch kam er zur Arbeit.', 'Il était malade, néanmoins il est venu travailler.'),
          s('Beeil dich, andernfalls kommen wir zu spät.', 'Dépêche-toi, sinon nous serons en retard.'),
          s('Ich trinke Tee, sie hingegen trinkt Kaffee.', 'Je bois du thé, elle en revanche boit du café.'),
          s('Insgesamt war das Projekt ein Erfolg.', "Dans l'ensemble, le projet a été un succès."),
        ],
      ),
      vocab(
        'de-b2-argue-planet',
        "L'environnement",
        [
          w('der Klimawandel', 'changement climatique'),
          w('die Umwelt', 'environnement'),
          w('die Verschmutzung', 'pollution'),
          w('der Müll', 'déchets'),
          w('die erneuerbare Energie', 'énergie renouvelable'),
          w('nachhaltig', 'durable'),
          w('die Gefahr', 'danger'),
          w('verringern', 'réduire'),
        ],
        [
          s('Der Klimawandel betrifft uns alle.', 'Le changement climatique nous concerne tous.'),
          s('Wir müssen unseren Müll verringern.', 'Nous devons réduire nos déchets.'),
          s('Die Verschmutzung ist eine Gefahr für die Gesundheit.', 'La pollution est un danger pour la santé.'),
          s('Ist dieses Modell wirklich nachhaltig?', 'Ce modèle est-il vraiment durable ?'),
          s('Erneuerbare Energie wird immer billiger.', "L'énergie renouvelable devient de moins en moins chère."),
          s('Wir müssen die Umwelt schützen.', "Nous devons protéger l'environnement."),
        ],
      ),
      grammar('de-g-double-connectors', 'Les connecteurs doubles', 'B2', {
        intro: 'Ils relient deux éléments de manière symétrique.',
        points: [
          'Nicht nur ... sondern auch : non seulement ... mais aussi.',
          'Sowohl ... als auch : aussi bien ... que.',
          'Entweder ... oder : soit ... soit. Weder ... noch : ni ... ni.',
          'Je ... desto : plus ... plus. Je + verbe à la fin, desto + verbe en deuxième position.',
          'Zwar ... aber : certes ... mais.',
        ],
        tables: [
          {
            headers: ['Connecteur', 'Exemple'],
            rows: [
              ['nicht nur ... sondern auch', 'Er ist nicht nur klug, sondern auch nett.'],
              ['sowohl ... als auch', 'Sie spricht sowohl Deutsch als auch Englisch.'],
              ['weder ... noch', 'Ich trinke weder Kaffee noch Tee.'],
              ['je ... desto', 'Je länger ich warte, desto nervöser werde ich.'],
              ['zwar ... aber', 'Es ist zwar teuer, aber gut.'],
            ],
          },
        ],
        examples: [
          ['Je mehr ich übe, desto besser werde ich.', 'Plus je m\'entraîne, plus je progresse.'],
          ['Ich trinke weder Kaffee noch Tee.', 'Je ne bois ni café ni thé.'],
        ],
        questions: [
          choose('Er ist nicht nur klug, ___ auch nett.', 'sondern', ['aber', 'oder'], 'Il est non seulement intelligent, mais aussi gentil.', 'Nicht nur ... sondern auch.'),
          choose('Ich trinke ___ Kaffee noch Tee.', 'weder', ['entweder', 'sowohl'], 'Je ne bois ni café ni thé.', 'Weder ... noch.'),
          choose('Du kannst ___ hier bleiben oder mitkommen.', 'entweder', ['weder', 'sowohl'], 'Tu peux soit rester ici, soit venir.', 'Entweder ... oder.'),
          choose('Je mehr ich übe, ___ besser werde ich.', 'desto', ['als', 'wie'], 'Plus je m\'entraîne, plus je progresse.', 'Je ... desto.'),
          complete('Sie spricht sowohl Deutsch ___ auch Englisch.', ['als'], 'Elle parle aussi bien allemand qu\'anglais.', 'Sowohl ... als auch.'),
          spot('Je länger ich warte, desto nervöser werde ich.', ['Je länger warte ich, desto nervöser ich werde.', 'Je länger ich warte, desto ich nervöser werde.'], 'Verbe final après je, puis verbe juste après l\'adjectif.'),
        ],
      }),
      grammar('de-g-nominalisation', 'La nominalisation', 'B2', {
        intro: 'L\'allemand écrit transforme les subordonnées en groupes nominaux.',
        points: [
          'Weil es regnete devient wegen des Regens.',
          'Obwohl es kalt war devient trotz der Kälte.',
          'Während wir arbeiteten devient während der Arbeit.',
          'Les infinitifs deviennent des noms neutres : das Lernen.',
        ],
        tables: [
          {
            headers: ['Subordonnée', 'Groupe nominal'],
            rows: [
              ['weil es regnet', 'wegen des Regens'],
              ['obwohl es kalt ist', 'trotz der Kälte'],
              ['als er ankam', 'bei seiner Ankunft'],
              ['bevor wir essen', 'vor dem Essen'],
            ],
          },
        ],
        examples: [
          ['Trotz der Kälte gingen wir spazieren.', 'Malgré le froid, nous sommes allés nous promener.'],
          ['Bei seiner Ankunft war niemand da.', 'À son arrivée, il n\'y avait personne.'],
        ],
        questions: [
          choose('___ des Regens blieben wir zu Hause.', 'Wegen', ['Trotz', 'Bei'], 'À cause de la pluie, nous sommes restés à la maison.', 'Cause : wegen.'),
          choose('___ der Kälte gingen wir spazieren.', 'Trotz', ['Wegen', 'Seit'], 'Malgré le froid, nous sommes allés nous promener.', 'Opposition : trotz.'),
          choose('___ seiner Ankunft war niemand da.', 'Bei', ['Wegen', 'Trotz'], 'À son arrivée, il n\'y avait personne.', 'Moment : bei.'),
          transform('Nominalise avec wegen', 'Weil es regnete, blieben wir zu Hause.', ['Wegen des Regens blieben wir zu Hause'], 'À cause de la pluie, nous sommes restés à la maison.', 'Regen, au génitif masculin.'),
          transform('Nominalise avec trotz', 'Obwohl es kalt war, gingen wir aus.', ['Trotz der Kälte gingen wir aus'], 'Malgré le froid, nous sommes sortis.', 'Kälte est féminin.'),
          complete('Das ___ (lernen) einer Sprache braucht Zeit.', ['Lernen'], 'Apprendre une langue prend du temps.', 'Infinitif nominalisé, avec majuscule.'),
        ],
      }),
      grammar('de-g-suppositions', 'Exprimer une supposition', 'B2', {
        intro: 'Les modaux et le futur expriment le degré de certitude.',
        points: [
          'Muss : presque certain. Kann : possible. Dürfte : probable.',
          'Kann nicht : impossible.',
          'Werden + wohl exprime une supposition présente : Er wird wohl krank sein.',
          'Passé : modal + participe + haben ou sein. Er muss gegangen sein.',
        ],
        tables: [
          {
            headers: ['Certitude', 'Exemple'],
            rows: [
              ['Presque sûr', 'Er muss krank sein.'],
              ['Probable', 'Er dürfte krank sein.'],
              ['Possible', 'Er könnte krank sein.'],
              ['Impossible', 'Er kann nicht krank sein.'],
              ['Supposition', 'Er wird wohl krank sein.'],
            ],
          },
        ],
        examples: [
          ['Sie muss den Zug verpasst haben.', 'Elle a dû rater le train.'],
          ['Er wird wohl noch im Büro sein.', 'Il doit être encore au bureau.'],
        ],
        questions: [
          choose('Das Licht ist an. Er ___ zu Hause sein.', 'muss', ['soll', 'darf nicht'], 'La lumière est allumée. Il doit être à la maison.', 'Quasi-certitude : muss.'),
          choose('Er hat gerade gegessen. Er ___ keinen Hunger haben.', 'kann', ['muss', 'soll'], 'Il vient de manger. Il ne peut pas avoir faim.', 'Impossibilité : kann nicht, ici kann + kein.'),
          choose('Sie ist nicht da. Sie ___ wohl krank sein.', 'wird', ['ist', 'hat'], 'Elle n\'est pas là. Elle doit être malade.', 'Supposition : wird wohl.'),
          complete('Er ist nicht gekommen. Er muss den Zug verpasst ___.', ['haben'], 'Il n\'est pas venu. Il a dû rater le train.', 'Participe + haben.'),
          complete('Sie ist weg. Sie muss schon gegangen ___.', ['sein'], 'Elle n\'est plus là. Elle a dû partir.', 'Participe + sein.'),
          spot('Er könnte recht haben.', ['Er könnte recht hat.', 'Er könnte hat recht.'], 'Modal + infinitif.'),
        ],
      }),
      dialogue(
        'de-b2-argue-dialogue',
        'Un débat',
        'Lena et Max débattent de la voiture en ville.',
        [
          line('Max', 'Ich finde, Autos sollten aus der Innenstadt verbannt werden.', 'Je trouve que les voitures devraient être bannies du centre-ville.'),
          line('Lena', 'Das klingt zwar gut, aber die Geschäfte würden darunter leiden.', 'Cela semble bien, certes, mais les commerces en souffriraient.'),
          line('Max', 'Trotzdem ist die Verschmutzung eine große Gefahr.', 'Malgré cela, la pollution est un grand danger.'),
          line('Lena', 'Das stimmt, jedoch ist der öffentliche Verkehr noch nicht bereit.', 'C\'est vrai, cependant les transports publics ne sont pas encore prêts.'),
          line('Max', 'Je mehr Linien gebaut werden, desto weniger Autos braucht man.', 'Plus on construit de lignes, moins on a besoin de voitures.'),
          line('Lena', 'Dann sollten wir warten, andernfalls werden die Leute nur wütend.', 'Alors il faudrait attendre, sinon les gens seront juste en colère.'),
        ],
        [
          q('Que craint Lena ?', 'Que les commerces souffrent', 'Que le bus soit cher', 'Que Max déménage'),
          q('Que propose finalement Lena ?', "D'attendre de meilleurs transports", 'De ne rien interdire', 'De construire des parkings'),
        ],
      ),
    ],
  },
  {
    id: 'de-b2-style',
    title: 'Le monde professionnel',
    description: 'Le style soutenu et les expressions figées',
    level: 'B2',
    tip: {
      title: 'L\'allemand soutenu',
      points: [
        'Le participe placé devant un nom remplace une relative.',
        'Les expressions verbe + nom donnent un ton formel.',
        'Certains noms masculins prennent -n à tous les cas sauf le nominatif.',
      ],
      examples: [
        ['Der schlafende Hund bellt nicht.', 'Le chien qui dort n\'aboie pas.'],
        ['Wir müssen eine Entscheidung treffen.', 'Nous devons prendre une décision.'],
        ['Ich kenne den Kollegen.', 'Je connais le collègue.'],
      ],
    },
    lessons: [
      vocab(
        'de-b2-style-career',
        'La carrière',
        [
          w('die Frist', 'date limite'),
          w('verhandeln', 'négocier'),
          w('einstellen', 'embaucher'),
          w('kündigen', 'démissionner, licencier'),
          w('die Beförderung', 'promotion'),
          w('die Fähigkeit', 'compétence'),
          w('der Aufwand', 'charge, effort'),
          w('die Rückmeldung', 'retour'),
        ],
        [
          s('Wir werden die Frist verpassen.', 'Nous allons rater la date limite.'),
          s('Sie hat letzten Monat gekündigt.', 'Elle a démissionné le mois dernier.'),
          s('Er bekam nach zwei Jahren eine Beförderung.', 'Il a obtenu une promotion au bout de deux ans.'),
          s('Sie haben drei neue Ingenieure eingestellt.', 'Ils ont embauché trois nouveaux ingénieurs.'),
          s('Der Aufwand ist zu groß.', "L'effort est trop important."),
          s('Ich freue mich über Ihre Rückmeldung.', 'Votre retour me fera plaisir.'),
        ],
      ),
      vocab(
        'de-b2-style-expressions',
        'Les expressions figées',
        [
          w('eine Entscheidung treffen', 'prendre une décision'),
          w('in Frage stellen', 'remettre en question'),
          w('zur Verfügung stehen', 'être à disposition'),
          w('Bescheid sagen', 'prévenir'),
          w('eine Rolle spielen', 'jouer un rôle'),
          w('Rücksicht nehmen', 'tenir compte, ménager'),
          w('in Betracht ziehen', 'envisager'),
          w('zum Ausdruck bringen', 'exprimer'),
        ],
        [
          s('Wir müssen heute eine Entscheidung treffen.', "Nous devons prendre une décision aujourd'hui."),
          s('Niemand stellt das in Frage.', 'Personne ne remet cela en question.'),
          s('Ich stehe Ihnen gern zur Verfügung.', 'Je suis volontiers à votre disposition.'),
          s('Sag mir bitte Bescheid.', 'Préviens-moi, s\'il te plaît.'),
          s('Geld spielt keine Rolle.', "L'argent ne joue aucun rôle."),
          s('Wir ziehen alle Möglichkeiten in Betracht.', 'Nous envisageons toutes les possibilités.'),
        ],
      ),
      grammar('de-g-participial', 'Les participes adjectifs', 'B2', {
        intro: 'Devant un nom, un participe se décline comme un adjectif et remplace une relative.',
        points: [
          'Participe présent, sens actif : der schlafende Hund (der Hund, der schläft).',
          'Participe passé, sens passif : das gekaufte Auto (das Auto, das gekauft wurde).',
          'Des compléments peuvent s\'insérer : der von mir geschriebene Brief.',
          'Ce style est typique des textes écrits et administratifs.',
        ],
        tables: [
          {
            headers: ['Relative', 'Participe'],
            rows: [
              ['das Kind, das lacht', 'das lachende Kind'],
              ['der Brief, der geschrieben wurde', 'der geschriebene Brief'],
              ['die Preise, die steigen', 'die steigenden Preise'],
            ],
          },
        ],
        examples: [
          ['Die steigenden Preise sind ein Problem.', 'La hausse des prix est un problème.'],
          ['Das gestern gekaufte Buch ist gut.', 'Le livre acheté hier est bon.'],
        ],
        questions: [
          choose('Das ___ Kind heißt Tom.', 'lachende', ['gelachte', 'lachen'], 'L\'enfant qui rit s\'appelle Tom.', 'Sens actif : participe présent.'),
          choose('Das ___ Auto war teuer.', 'gekaufte', ['kaufende', 'kaufte'], 'La voiture achetée était chère.', 'Sens passif : participe passé.'),
          choose('Die ___ Preise machen uns Sorgen.', 'steigenden', ['gestiegen', 'steigend'], 'La hausse des prix nous inquiète.', 'Participe décliné au pluriel.'),
          transform('Remplace la relative par un participe', 'der Hund, der schläft', ['der schlafende Hund'], 'le chien qui dort', 'Participe présent décliné.'),
          transform('Remplace la relative par un participe', 'das Buch, das gelesen wurde', ['das gelesene Buch'], 'le livre lu', 'Participe passé décliné.'),
          complete('Der von mir ___ (schreiben) Brief ist lang.', ['geschriebene'], 'La lettre que j\'ai écrite est longue.', 'Participe passé décliné.'),
        ],
      }),
      grammar('de-g-n-declension', 'La n-Deklination', 'B2', {
        intro: 'Un petit groupe de noms masculins prend -n ou -en à tous les cas sauf le nominatif.',
        points: [
          'Noms de personnes en -e : der Kollege, der Junge, der Kunde.',
          'Noms en -ist, -ent, -ant : der Journalist, der Student.',
          'Quelques autres : der Herr, der Mensch, der Nachbar.',
          'Ils s\'accordent donc après den, dem, des.',
        ],
        tables: [
          {
            headers: ['Cas', 'Kollege', 'Student', 'Herr'],
            rows: [
              ['Nominatif', 'der Kollege', 'der Student', 'der Herr'],
              ['Accusatif', 'den Kollegen', 'den Studenten', 'den Herrn'],
              ['Datif', 'dem Kollegen', 'dem Studenten', 'dem Herrn'],
              ['Génitif', 'des Kollegen', 'des Studenten', 'des Herrn'],
            ],
          },
        ],
        examples: [
          ['Ich kenne den neuen Kollegen.', 'Je connais le nouveau collègue.'],
          ['Sie spricht mit dem Studenten.', 'Elle parle avec l\'étudiant.'],
        ],
        questions: [
          choose('Ich kenne den ___.', 'Kollegen', ['Kollege', 'Kolleges'], 'Je connais le collègue.', 'Accusatif : -n.'),
          choose('Sie spricht mit dem ___.', 'Studenten', ['Student', 'Studente'], 'Elle parle avec l\'étudiant.', 'Datif : -en.'),
          choose('Das ist das Auto des ___.', 'Nachbarn', ['Nachbars', 'Nachbar'], 'C\'est la voiture du voisin.', 'Génitif : -n.'),
          complete('Ich habe den ___ (Journalist) gesehen.', ['Journalisten'], 'J\'ai vu le journaliste.', 'Noms en -ist : -en.'),
          complete('Können Sie dem ___ (Kunde) helfen?', ['Kunden'], 'Pouvez-vous aider le client ?', 'Noms en -e : -n.'),
          spot('Ich frage den Herrn.', ['Ich frage den Herr.', 'Ich frage der Herr.'], 'Herr devient Herrn à l\'accusatif.'),
        ],
      }),
      grammar('de-g-formal-connect', 'Les subordonnées avancées', 'B2', {
        intro: 'Quelques conjonctions permettent de nuancer le temps et la condition.',
        points: [
          'Während : pendant que, ou tandis que.',
          'Bevor, nachdem, sobald, solange : situent dans le temps.',
          'Falls : au cas où. Indem : en faisant, pour le moyen.',
          'So dass : si bien que.',
        ],
        tables: [
          {
            headers: ['Conjonction', 'Sens', 'Exemple'],
            rows: [
              ['sobald', 'dès que', 'Sobald ich ankomme, rufe ich an.'],
              ['falls', 'au cas où', 'Falls es regnet, bleibe ich hier.'],
              ['indem', 'en faisant', 'Ich lerne, indem ich lese.'],
              ['so dass', 'si bien que', 'Es regnete, so dass wir blieben.'],
            ],
          },
        ],
        examples: [
          ['Sobald ich Zeit habe, rufe ich dich an.', 'Dès que j\'ai le temps, je t\'appelle.'],
          ['Man lernt eine Sprache, indem man viel spricht.', 'On apprend une langue en parlant beaucoup.'],
        ],
        questions: [
          choose('___ ich ankomme, rufe ich dich an.', 'Sobald', ['Indem', 'Obwohl'], 'Dès que j\'arrive, je t\'appelle.', 'Immédiatement après : sobald.'),
          choose('___ es regnet, bleiben wir zu Hause.', 'Falls', ['Bevor', 'Indem'], 'Au cas où il pleuvrait, nous restons à la maison.', 'Condition : falls.'),
          choose('Man lernt, ___ man übt.', 'indem', ['falls', 'sobald'], 'On apprend en s\'entraînant.', 'Moyen : indem.'),
          choose('Es regnete stark, ___ wir zu Hause blieben.', 'so dass', ['indem', 'bevor'], 'Il pleuvait fort, si bien que nous sommes restés à la maison.', 'Conséquence : so dass.'),
          complete('___ wir essen, waschen wir die Hände.', ['Bevor'], 'Avant de manger, nous nous lavons les mains.', 'Antériorité : bevor.'),
          spot('Sobald ich fertig bin, gehe ich.', ['Sobald ich bin fertig, gehe ich.', 'Sobald ich fertig bin, ich gehe.'], 'Verbe final, puis verbe principal en tête.'),
        ],
      }),
      dialogue(
        'de-b2-style-dialogue',
        'La négociation',
        'Lena négocie avec sa cheffe.',
        [
          line('Lena', 'Danke, dass Sie Zeit haben. Ich möchte über meinen Aufwand sprechen.', 'Merci de me recevoir. Je voudrais parler de ma charge de travail.'),
          line('Chefin', 'Gern. Geht es um das neue Projekt?', 'Volontiers. S\'agit-il du nouveau projet ?'),
          line('Lena', 'Ja. Wegen der kurzen Fristen musste ich andere Aufgaben verschieben.', 'Oui. À cause des délais courts, j\'ai dû reporter d\'autres tâches.'),
          line('Chefin', 'Das verstehe ich. Wir ziehen in Betracht, einen neuen Kollegen einzustellen.', 'Je comprends. Nous envisageons d\'embaucher un nouveau collègue.'),
          line('Lena', 'Das würde helfen. Wir hatten auch über eine Beförderung gesprochen.', 'Cela aiderait. Nous avions aussi parlé d\'une promotion.'),
          line('Chefin', 'Richtig. Sobald das Projekt beendet ist, treffen wir eine Entscheidung.', 'C\'est vrai. Dès que le projet sera terminé, nous prendrons une décision.'),
        ],
        [
          q('Quel est le problème de Lena ?', 'Sa charge de travail', 'Son salaire', 'Un collègue'),
          q('Quand la décision sera-t-elle prise ?', 'À la fin du projet', 'Demain', 'L\'an prochain'),
        ],
      ),
    ],
  },
];
