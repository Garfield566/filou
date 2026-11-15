"""The English « tenses in use » track: present simple or continuous, past simple or continuous, present perfect or
past (the trap for French speakers), present perfect continuous (« depuis »), past perfect, the future, used to,
past modals, then mixed stories. Present perfect is written « has », never « 's », so that the grader can tell it from
« is »; contracted forms are still accepted when translating."""
from phrase_kit import L, R, S, T, make_track  # noqa: F401

SECOND = "Les deux ordres sont corrects."
SUB_FIRST = "Les deux ordres sont corrects ; quand la subordonnée vient en premier, on met une virgule."

# ---------------------------------------------------------------- Unit 1: present simple or continuous
HABIT = "une habitude"
LASTING = "une situation durable ou une vérité"
PS = "présent simple : habitude, vérité, horaire"
PC = "présent continu : en ce moment"
STATE = "un verbe d'état : présent simple, même maintenant"
ACTION = "une action en cours : -ing"
DODOES = "do / does"

unit1 = {
    "title": "Présent simple ou continu",
    "level": "A1",
    "hint": "Le français dit « je lis » dans les deux cas ; l'anglais distingue I read (d'habitude) et I'm reading (en ce moment).",
    "lessons": [
        L(
            "Le présent simple : habitudes et vérités",
            R(
                "Pour ce qu'on fait d'habitude, ou ce qui est toujours vrai : le présent simple.",
                [
                    "Avec he, she, it, on ajoute -s : she works, he goes, it rains (-es après -o, -sh, -ch, -s, -x).",
                    "Questions et négations avec do / does : Do you work? She doesn't work.",
                    "Après does et doesn't, plus de -s : Does she work?",
                    "Mots fréquents : always, usually, often, sometimes, never, every day.",
                ],
                [["She works in a hospital.", "Elle travaille dans un hôpital."], ["Do you often go to the cinema?", "Tu vas souvent au cinéma ?"]],
            ),
            [
                S("She works in a hospital.", "Elle travaille dans un hôpital.", ["she", "works", "in a hospital"], focus=("works", LASTING, "Son métier : une situation durable."), blank=("works", "work", ["work", "workes"])),
                S("We usually have breakfast at seven.", "D'habitude, nous prenons le petit-déjeuner à sept heures.", ["we", "usually", "have", "breakfast", "at seven"], ["Usually we have breakfast at seven."], focus=("have", HABIT, "Usually : une habitude."), blank=("have", "have", ["has", "are having"])),
                S("Water boils at 100 degrees.", "L'eau bout à 100 degrés.", ["water", "boils", "at 100 degrees"], focus=("boils", LASTING, "Une chose toujours vraie."), blank=("boils", "boil", ["boil", "boiles"])),
                S("My brother never eats meat.", "Mon frère ne mange jamais de viande.", ["my brother", "never", "eats", "meat"], focus=("eats", HABIT, "Never : une habitude."), blank=("eats", "eat", ["eat", "is eating"])),
                S("Do you often go to the cinema?", "Tu vas souvent au cinéma ?", ["do", "you", "often", "go", "to the cinema"], ["Do you go to the cinema often?"], focus=("go", HABIT, "Often : une habitude."), blank=("do", DODOES, ["does", "are"]), alt=["Do you often go to the movies?"]),
                S("The shop opens at nine.", "Le magasin ouvre à neuf heures.", ["the shop", "opens", "at nine"], focus=("opens", LASTING, "Un horaire fixe."), blank=("opens", "open", ["open", "opening"])),
                S("He always forgets his keys.", "Il oublie toujours ses clés.", ["he", "always", "forgets", "his keys"], focus=("forgets", HABIT, "Always : une habitude."), blank=("forgets", "forget", ["forget", "forgot"])),
                S("Does your sister live in London?", "Ta sœur habite à Londres ?", ["does", "your sister", "live", "in London"], focus=("live", LASTING, "Où elle habite : une situation durable. Après does, live sans -s."), blank=("does", DODOES, ["do", "is"])),
            ],
            {"prompt": "Pourquoi le présent simple ?", "options": [HABIT, LASTING]},
        ),
        L(
            "Le présent continu : en ce moment",
            R(
                "Pour ce qui se passe en ce moment, ou une situation temporaire : be + verbe en -ing.",
                [
                    "I'm reading, she's working, they're playing.",
                    "Mots fréquents : now, right now, at the moment, today, this week, Look!, Listen!",
                    "Le français dit « je lis » dans les deux cas ; l'anglais distingue : I read (d'habitude) et I'm reading (maintenant).",
                ],
                [["I'm reading a good book at the moment.", "En ce moment, je lis un bon livre."], ["Look! It's raining.", "Regarde ! Il pleut."]],
            ),
            [
                S("I'm reading a good book at the moment.", "En ce moment, je lis un bon livre.", ["I'm reading", "a good book", "at the moment"], ["At the moment I'm reading a good book."], ("I'm reading", PC, "At the moment : en ce moment."), ("I'm reading", "read", ["I read", "I reading"]), SECOND),
                S("Look! It's raining.", "Regarde ! Il pleut.", ["look", "it's raining"], focus=("It's raining", PC, "Look! : ça se passe sous nos yeux."), blank=("it's raining", "rain", ["it rains", "it raining"])),
                S("She usually walks to work, but today she's taking the bus.", "D'habitude elle va au travail à pied, mais aujourd'hui elle prend le bus.", ["she", "usually", "walks", "to work", "but", "today", "she's taking", "the bus"], focus=("she's taking", PC, "Today, pour une fois : continu."), blank=("she's taking", "take", ["she takes", "she take"]), meaning=["Elle va toujours au travail en bus.", "Aujourd'hui, elle va au travail à pied."]),
                S("What are you doing?", "Qu'est-ce que tu es en train de faire ?", ["what", "are", "you", "doing"], focus=("doing", PC, "En train de : continu."), blank=("are", "be", ["do", "is"])),
                S("My parents live in Lyon.", "Mes parents habitent à Lyon.", ["my parents", "live", "in Lyon"], focus=("live", PS, "Où ils habitent : une situation durable."), blank=("live", "live", ["lives", "living"])),
                S("We're staying with friends this week.", "Cette semaine, nous logeons chez des amis.", ["we're staying", "with friends", "this week"], ["This week we're staying with friends."], ("we're staying", PC, "Une situation temporaire : cette semaine."), ("we're staying", "stay", ["we stay", "we staying"]), SECOND),
                S("He plays tennis every Saturday.", "Il joue au tennis tous les samedis.", ["he", "plays", "tennis", "every Saturday"], ["Every Saturday he plays tennis."], ("plays", PS, "Every Saturday : une habitude."), ("plays", "play", ["is playing", "play"]), SECOND),
                S("Listen! Someone is knocking at the door.", "Écoute ! Quelqu'un frappe à la porte.", ["listen", "someone", "is knocking", "at the door"], focus=("is knocking", PC, "Listen! : ça se passe maintenant."), blank=("is knocking", "knock", ["knocks", "knock"]), alt=["Listen! Someone is knocking on the door."]),
            ],
            {"prompt": "Présent simple ou continu ?", "options": [PS, PC]},
        ),
        L(
            "Les verbes d'état : I know, jamais I'm knowing",
            R(
                "Certains verbes décrivent un état, pas une action : ils restent au présent simple, même maintenant.",
                [
                    "know, understand, believe, remember, like, love, hate, want, need, prefer, belong, seem, mean.",
                    "I know the answer (jamais I'm knowing).",
                    "Certains changent de sens : I think it's good (un avis) / I'm thinking about it (je réfléchis) ; I have a car (posséder) / I'm having lunch (une action).",
                ],
                [["I know the answer.", "Je connais la réponse."], ["We're having lunch.", "Nous sommes en train de déjeuner."]],
            ),
            [
                S("I know the answer.", "Je connais la réponse.", ["I", "know", "the answer"], focus=("know", STATE, "Know est un verbe d'état."), blank=("know", "know", ["am knowing", "knows"])),
                S("Do you understand me?", "Tu me comprends ?", ["do", "you", "understand", "me"], focus=("understand", STATE, "Understand est un verbe d'état."), blank=("understand", "understand", ["understanding", "understands"])),
                S("She wants a new phone.", "Elle veut un nouveau téléphone.", ["she", "wants", "a new phone"], focus=("wants", STATE, "Want est un verbe d'état."), blank=("wants", "want", ["is wanting", "want"])),
                S("I think this film is great.", "Je trouve que ce film est génial.", ["I", "think", "this film", "is great"], focus=("think", STATE, "Think = avoir un avis : verbe d'état."), blank=("think", "think", ["am thinking", "thinks"])),
                S("At the moment I'm thinking about my holidays.", "En ce moment, je pense à mes vacances.", ["at the moment", "I'm thinking", "about my holidays"], ["I'm thinking about my holidays at the moment."], ("I'm thinking", ACTION, "Think about = penser à : une activité en cours."), ("I'm thinking", "think", ["I think", "I thinking"]), SECOND, alt=["I'm thinking about my vacation at the moment.", "At the moment I'm thinking about my vacation."]),
                S("We're having lunch. Can I call you back?", "Nous sommes en train de déjeuner, je peux te rappeler ?", ["we're having", "lunch", "can", "I", "call", "you", "back"], focus=("we're having", ACTION, "Have lunch = déjeuner, une action : -ing possible."), blank=("we're having", "have", ["we have", "we having"])),
                S("This bag belongs to my sister.", "Ce sac appartient à ma sœur.", ["this bag", "belongs", "to my sister"], focus=("belongs", STATE, "Belong est un verbe d'état."), blank=("belongs", "belong", ["is belonging", "belong"])),
                S("He needs help right now.", "Il a besoin d'aide, là, maintenant.", ["he", "needs", "help", "right now"], ["Right now he needs help."], focus=("needs", STATE, "Même maintenant, need reste au présent simple."), blank=("needs", "need", ["is needing", "need"])),
            ],
            {"prompt": "Pourquoi cette forme ?", "options": [STATE, ACTION]},
        ),
        L(
            "Choisir : simple ou continu ?",
            R(
                "Les deux présents ensemble.",
                [
                    "Présent simple : habitudes, vérités, horaires, verbes d'état.",
                    "Présent continu : en ce moment, une situation temporaire, un changement en cours (It's getting colder).",
                    "Les mots-signaux aident : usually, every day → simple ; now, at the moment, this week → continu.",
                ],
                [["It's getting colder every day.", "Il fait de plus en plus froid chaque jour."], ["This week I'm working from home.", "Cette semaine, je travaille à la maison."]],
            ),
            [
                S("It's getting colder every day.", "Il fait de plus en plus froid chaque jour.", ["it's getting", "colder", "every day"], focus=("It's getting", PC, "Un changement en cours : continu, même avec every day."), blank=("it's getting", "get", ["it get", "it getting"])),
                S("I don't usually drink coffee, but today I'm having one.", "D'habitude je ne bois pas de café, mais aujourd'hui j'en prends un.", ["I", "don't", "usually", "drink", "coffee", "but", "today", "I'm having", "one"], focus=("I'm having", PC, "Today, pour une fois : continu."), blank=("I'm having", "have", ["I have", "I having"]), meaning=["Je bois du café tous les jours.", "Aujourd'hui, je ne bois pas de café."], alt=["I don't usually drink coffee, but today I'm drinking one."]),
                S("The train leaves at half past six.", "Le train part à six heures et demie.", ["the train", "leaves", "at half past six"], focus=("leaves", PS, "Un horaire : présent simple."), blank=("leaves", "leave", ["leave", "leaving"]), alt=["The train leaves at six thirty."]),
                S("Why are you laughing?", "Pourquoi tu ris ?", ["why", "are", "you", "laughing"], focus=("laughing", PC, "Maintenant : continu."), blank=("laughing", "laugh", ["laugh", "laughs"])),
                S("My grandmother speaks four languages.", "Ma grand-mère parle quatre langues.", ["my grandmother", "speaks", "four languages"], focus=("speaks", PS, "Ce qu'elle sait faire : une situation durable."), blank=("speaks", "speak", ["is speaking", "speak"]), meaning=["Ma grand-mère est en train de parler quatre langues.", "Ma grand-mère apprend quatre langues."]),
                S("Be quiet! The baby is sleeping.", "Silence, le bébé dort.", ["be quiet", "the baby", "is sleeping"], focus=("is sleeping", PC, "Maintenant : continu."), blank=("is sleeping", "sleep", ["sleeps", "sleep"]), alt=["Quiet! The baby is sleeping.", "Be quiet, the baby is asleep."]),
                S("How often do you see your cousins?", "À quelle fréquence vois-tu tes cousins ?", ["how often", "do", "you", "see", "your cousins"], focus=("see", PS, "How often : une habitude."), blank=("do", "do / be", ["are", "does"])),
                S("This week I'm working from home.", "Cette semaine, je travaille à la maison.", ["this week", "I'm working", "from home"], ["I'm working from home this week."], ("I'm working", PC, "Cette semaine seulement : une situation temporaire."), ("I'm working", "work", ["I work", "I working"]), SECOND, alt=["I'm working at home this week.", "This week I'm working at home."]),
            ],
            {"prompt": "Présent simple ou continu ?", "options": [PS, PC]},
        ),
    ],
}

# ---------------------------------------------------------------- Unit 2: past simple or continuous
REG = "régulier : -ed"
IRR = "irrégulier : une forme à apprendre"
DIDQ = "did : une question"
DIDN = "didn't : une négation"
BASE = "le verbe à la base, après did"
SUBJQ = "pas de did : la question porte sur le sujet"
PAST = "prétérit simple : une action finie"
PASTC = "prétérit continu : en cours à ce moment-là"
LONG = "l'action longue, en cours (continu)"
SHORT = "l'action courte qui l'interrompt (simple)"

unit2 = {
    "title": "Prétérit simple ou continu",
    "level": "A2",
    "hint": "Le prétérit pour une action finie, le continu pour ce qui était en cours : I was cooking when the phone rang.",
    "lessons": [
        L(
            "Le prétérit : une action finie",
            R(
                "Pour une action terminée à un moment passé (yesterday, last week, in 2010, ago) : le prétérit.",
                [
                    "Verbes réguliers : -ed : worked, played, stopped.",
                    "Verbes irréguliers : la 2e forme de l'onglet Verbes : go → went, see → saw, buy → bought.",
                    "Même forme pour toutes les personnes : I went, she went.",
                ],
                [["We visited Rome last summer.", "L'été dernier, nous avons visité Rome."], ["I saw Tom yesterday.", "J'ai vu Tom hier."]],
            ),
            [
                S("We visited Rome last summer.", "L'été dernier, nous avons visité Rome.", ["we", "visited", "Rome", "last summer"], ["Last summer we visited Rome."], ("visited", REG, "Visit → visited."), ("visited", "visit", ["visit", "have visited"]), SECOND),
                S("I saw Tom yesterday.", "J'ai vu Tom hier.", ["I", "saw", "Tom", "yesterday"], ["Yesterday I saw Tom."], ("saw", IRR, "See → saw."), ("saw", "see", ["seed", "have seen"]), SECOND),
                S("She bought a new car two weeks ago.", "Elle a acheté une nouvelle voiture il y a deux semaines.", ["she", "bought", "a new car", "two weeks ago"], focus=("bought", IRR, "Buy → bought."), blank=("bought", "buy", ["buyed", "has bought"])),
                S("They stopped at a café.", "Ils se sont arrêtés dans un café.", ["they", "stopped", "at a café"], focus=("stopped", REG, "Stop → stopped : on double le p."), blank=("stopped", "stop", ["stoped", "stop"])),
                S("He went to bed early last night.", "Hier soir, il s'est couché tôt.", ["he", "went", "to bed", "early", "last night"], ["Last night he went to bed early."], ("went", IRR, "Go → went."), ("went", "go", ["goed", "has gone"]), SECOND),
                S("My parents met in 1995.", "Mes parents se sont rencontrés en 1995.", ["my parents", "met", "in 1995"], focus=("met", IRR, "Meet → met."), blank=("met", "meet", ["meeted", "have met"])),
                S("I studied German at school.", "J'ai étudié l'allemand à l'école.", ["I", "studied", "German", "at school"], focus=("studied", REG, "Study → studied : y devient i."), blank=("studied", "study", ["studyed", "study"])),
                S("We ate pizza and watched a film.", "Nous avons mangé une pizza et regardé un film.", ["we", "ate", "pizza", "and", "watched", "a film"], focus=("ate", IRR, "Eat → ate."), blank=("watched", "watch", ["watch", "watchd"]), alt=["We ate a pizza and watched a film.", "We ate pizza and watched a movie.", "We ate a pizza and watched a movie."]),
            ],
            {"prompt": "Ce verbe est-il régulier ou irrégulier ?", "options": [REG, IRR]},
        ),
        L(
            "did : questions et négations",
            R(
                "Au prétérit, questions et négations se font avec did, et le verbe revient à la base.",
                [
                    "Did you see him? I didn't see him (jamais didn't saw).",
                    "Avec un mot interrogatif : Where did you go? What did she say?",
                    "Quand la question porte sur le sujet, pas de did : Who called you? (qui t'a appelé ?)",
                ],
                [["Did you see the match?", "Tu as vu le match ?"], ["Who called you last night?", "Qui t'a appelé hier soir ?"]],
            ),
            [
                S("Did you see the match?", "Tu as vu le match ?", ["did", "you", "see", "the match"], focus=("see", BASE, "Après did, le verbe revient à la base : see, pas saw."), blank=("see", "see", ["saw", "seen"]), alt=["Have you seen the match?", "Did you see the game?"]),
                S("I didn't understand the question.", "Je n'ai pas compris la question.", ["I", "didn't", "understand", "the question"], focus=("didn't", DIDN, "Didn't : la négation au prétérit."), blank=("understand", "understand", ["understood", "understands"])),
                S("Where did you go on holiday?", "Où es-tu allé en vacances ?", ["where", "did", "you", "go", "on holiday"], focus=("did", DIDQ, "Did : la question au prétérit."), blank=("go", "go", ["went", "gone"]), alt=["Where did you go on vacation?"]),
                S("Who called you last night?", "Qui t'a appelé hier soir ?", ["who", "called", "you", "last night"], focus=("called", SUBJQ, "Who est le sujet (qui a appelé ?) : pas de did."), blank=("called", "call", ["did call", "call"]), meaning=["Qui as-tu appelé hier soir ?", "Pourquoi t'a-t-il appelé hier soir ?"]),
                S("Who did you call last night?", "Qui as-tu appelé hier soir ?", ["who", "did", "you", "call", "last night"], focus=("did", DIDQ, "Who est ici le complément (tu as appelé qui ?) : on garde did."), blank=("call", "call", ["called", "calls"]), meaning=["Qui t'a appelé hier soir ?", "Quand as-tu appelé hier soir ?"]),
                S("She didn't come to the party.", "Elle n'est pas venue à la fête.", ["she", "didn't", "come", "to the party"], focus=("didn't", DIDN, "Didn't : la négation au prétérit."), blank=("come", "come", ["came", "comes"])),
                S("What did he say?", "Qu'est-ce qu'il a dit ?", ["what", "did", "he", "say"], focus=("say", BASE, "Après did : say, pas said."), blank=("say", "say", ["said", "says"])),
                S("We didn't have time.", "Nous n'avons pas eu le temps.", ["we", "didn't", "have", "time"], focus=("have", BASE, "Didn't have, jamais didn't had."), blank=("have", "have", ["had", "has"]), alt=["We didn't have the time.", "We haven't had time."]),
            ],
            {"prompt": "Pourquoi cette forme ?", "options": [DIDQ, DIDN, BASE, SUBJQ]},
        ),
        L(
            "Le prétérit continu : was / were + -ing",
            R(
                "Pour une action en cours à un moment du passé : was / were + -ing.",
                [
                    "At eight o'clock I was having dinner : à huit heures, j'étais en train de dîner.",
                    "I / he / she / it was ; you / we / they were.",
                    "Il sert souvent de décor : It was raining, people were waiting…",
                ],
                [["At eight o'clock I was having dinner.", "À huit heures, j'étais en train de dîner."], ["What were you doing at midnight?", "Qu'est-ce que tu faisais à minuit ?"]],
            ),
            [
                S("At eight o'clock I was having dinner.", "À huit heures, j'étais en train de dîner.", ["at eight o'clock", "I", "was having", "dinner"], ["I was having dinner at eight o'clock."], ("was having", PASTC, "En cours à huit heures : continu."), ("was having", "have", ["had", "were having"]), SECOND),
                S("It was raining when we left.", "Il pleuvait quand nous sommes partis.", ["it", "was raining", "when", "we", "left"], ["When we left it was raining."], ("was raining", PASTC, "Le décor : il pleuvait."), ("was raining", "rain", ["rained", "were raining"]), SUB_FIRST),
                S("They were playing football in the park.", "Ils étaient en train de jouer au foot dans le parc.", ["they", "were playing", "football", "in the park"], focus=("were playing", PASTC, "En train de : continu."), blank=("were playing", "play", ["was playing", "played"]), alt=["They were playing soccer in the park."]),
                S("What were you doing at midnight?", "Qu'est-ce que tu faisais à minuit ?", ["what", "were", "you", "doing", "at midnight"], focus=("doing", PASTC, "En cours à minuit : continu."), blank=("were", "be", ["was", "did"])),
                S("She finished her homework and went out.", "Elle a fini ses devoirs et elle est sortie.", ["she", "finished", "her homework", "and", "went out"], focus=("finished", PAST, "Deux actions finies, l'une après l'autre."), blank=("went out", "go out", ["was going out", "goes out"])),
                S("We were sleeping, so we didn't hear the phone.", "Nous dormions, donc nous n'avons pas entendu le téléphone.", ["we", "were sleeping", "so", "we", "didn't hear", "the phone"], focus=("were sleeping", PASTC, "En cours quand le téléphone a sonné : continu."), blank=("were sleeping", "sleep", ["was sleeping", "sleeped"]), alt=["We were asleep, so we didn't hear the phone."]),
                S("I called you three times yesterday.", "Je t'ai appelé trois fois hier.", ["I", "called", "you", "three times", "yesterday"], ["Yesterday I called you three times."], focus=("called", PAST, "Des actions finies, comptées : prétérit simple."), blank=("called", "call", ["was calling", "call"])),
            ],
            {"prompt": "Prétérit simple ou continu ?", "options": [PAST, PASTC]},
        ),
        L(
            "while et when : deux actions dans le passé",
            R(
                "Une action longue (continu) est interrompue par une action courte (simple).",
                [
                    "I was cooking when the phone rang.",
                    "while + continu : pendant que : While I was cooking, the phone rang.",
                    "when + simple : au moment où : When she saw the spider, she screamed.",
                    "Deux actions longues en même temps : deux continus : While I was cooking, he was watching TV.",
                ],
                [["I was cooking when the phone rang.", "J'étais en train de cuisiner quand le téléphone a sonné."], ["While my brother was reading, I was watching TV.", "Pendant que mon frère lisait, je regardais la télé."]],
            ),
            [
                S("I was cooking when the phone rang.", "J'étais en train de cuisiner quand le téléphone a sonné.", ["I", "was cooking", "when", "the phone", "rang"], ["When the phone rang I was cooking."], ("rang", SHORT, "Le téléphone interrompt la cuisine."), ("rang", "ring", ["was ringing", "ringed"]), SUB_FIRST, meaning=["J'ai fait la cuisine après le coup de téléphone.", "Je téléphonais pendant que je cuisinais."]),
                S("While I was walking home, I met an old friend.", "Pendant que je rentrais à pied, j'ai rencontré un vieil ami.", ["while", "I", "was walking", "home", "I", "met", "an old friend"], ["I met an old friend while I was walking home."], ("was walking", LONG, "La marche dure ; la rencontre la coupe."), ("met", "meet", ["was meeting", "meeted"]), SUB_FIRST),
                S("She fell while she was skiing.", "Elle est tombée pendant qu'elle skiait.", ["she", "fell", "while", "she", "was skiing"], ["While she was skiing she fell."], ("fell", SHORT, "La chute interrompt le ski."), ("was skiing", "ski", ["skied", "were skiing"]), SUB_FIRST),
                S("When I arrived, everybody was dancing.", "Quand je suis arrivé, tout le monde dansait.", ["when", "I", "arrived", "everybody", "was dancing"], ["Everybody was dancing when I arrived."], ("was dancing", LONG, "Ils dansaient déjà à mon arrivée."), ("arrived", "arrive", ["was arriving", "arrive"]), SUB_FIRST, meaning=["Quand je suis arrivé, tout le monde s'est mis à danser.", "Tout le monde est arrivé pendant que je dansais."]),
                S("While my brother was reading, I was watching TV.", "Pendant que mon frère lisait, je regardais la télé.", ["while", "my brother", "was reading", "I", "was watching", "TV"], ["I was watching TV while my brother was reading."], ("was watching", LONG, "Deux actions longues en même temps : deux continus."), ("was watching", "watch", ["watched", "were watching"]), SUB_FIRST),
                S("The lights went out while we were eating.", "Les lumières se sont éteintes pendant que nous mangions.", ["the lights", "went out", "while", "we", "were eating"], ["While we were eating the lights went out."], ("went out", SHORT, "La panne interrompt le repas."), ("were eating", "eat", ["ate", "was eating"]), SUB_FIRST),
                S("When she saw the spider, she screamed.", "Quand elle a vu l'araignée, elle a crié.", ["when", "she", "saw", "the spider", "she", "screamed"], ["She screamed when she saw the spider."], None, ("saw", "see", ["was seeing", "seen"]), SUB_FIRST),
            ],
            {"prompt": "Quel est le rôle du verbe surligné ?", "options": [LONG, SHORT]},
        ),
    ],
}

# ---------------------------------------------------------------- Unit 3: present perfect or past simple
REGP = "régulier : -ed"
IRRP = "irrégulier : la 3e forme à apprendre"
PP = "present perfect : un lien avec maintenant"
PT = "prétérit : un moment passé terminé"
JUST = "just : vient de"
ALREADY = "already : déjà"
YET = "yet : déjà ? / pas encore"
SINCE = "since : un point de départ"
FOR = "for : une durée"
NEWS = "present perfect : la nouvelle, le résultat"
DETAIL = "prétérit : les détails, quand et comment"
HAVEHAS = "have / has"

unit3 = {
    "title": "Present perfect ou prétérit",
    "level": "A2",
    "hint": "Le piège n° 1 : le français dit « j'ai vu » dans les deux cas. L'anglais choisit selon le lien avec maintenant.",
    "lessons": [
        L(
            "have + participe : former le present perfect",
            R(
                "have / has + participe passé : I have seen, she has finished.",
                [
                    "Contracté : I've, you've, we've, they've ; he's, she's (attention : he's peut aussi vouloir dire he is).",
                    "Participe : -ed pour les verbes réguliers, la 3e forme pour les irréguliers : seen, gone, done, written.",
                    "Négation : haven't / hasn't. Question : Have you…? Has she…?",
                ],
                [["She has never seen the sea.", "Elle n'a jamais vu la mer."], ["Have you ever been to Japan?", "Es-tu déjà allé au Japon ?"]],
            ),
            [
                S("I've just finished my work.", "Je viens de finir mon travail.", ["I've", "just", "finished", "my work"], focus=("finished", REGP, "Finish → finished."), blank=("finished", "finish", ["finish", "finishing"]), alt=["I just finished my work."]),
                S("She has never seen the sea.", "Elle n'a jamais vu la mer.", ["she", "has", "never", "seen", "the sea"], focus=("seen", IRRP, "See → saw → seen."), blank=("seen", "see", ["saw", "seed"])),
                S("We have lived here since 2015.", "Nous habitons ici depuis 2015.", ["we", "have", "lived", "here", "since 2015"], focus=("lived", REGP, "Live → lived."), blank=("lived", "live", ["live", "lives"]), alt=["We have been living here since 2015."]),
                S("Have you ever been to Japan?", "Es-tu déjà allé au Japon ?", ["have", "you", "ever", "been", "to Japan"], focus=("been", IRRP, "Be → was → been."), blank=("been", "be", ["went", "was"]), alt=["Have you been to Japan?", "Did you ever go to Japan?"]),
                S("He hasn't written to me yet.", "Il ne m'a pas encore écrit.", ["he", "hasn't", "written", "to me", "yet"], focus=("written", IRRP, "Write → wrote → written."), blank=("written", "write", ["wrote", "writed"]), alt=["He hasn't written me yet."]),
                S("They've already eaten.", "Ils ont déjà mangé.", ["they've", "already", "eaten"], focus=("eaten", IRRP, "Eat → ate → eaten."), blank=("eaten", "eat", ["ate", "eated"]), alt=["They already ate."]),
                S("Has your sister passed her driving test?", "Ta sœur a réussi son permis, ça y est ?", ["has", "your sister", "passed", "her driving test"], focus=("passed", REGP, "Pass → passed."), blank=("has", HAVEHAS, ["have", "is"]), alt=["Did your sister pass her driving test?"]),
                S("I've lost my keys.", "J'ai perdu mes clés (je ne les ai plus).", ["I've", "lost", "my keys"], focus=("lost", IRRP, "Lose → lost → lost."), blank=("lost", "lose", ["losed", "lose"]), alt=["I lost my keys."]),
            ],
            {"prompt": "Ce participe est-il régulier ?", "options": [REGP, IRRP]},
        ),
        L(
            "L'expérience : ever, never",
            R(
                "Pour parler d'une expérience dans sa vie, sans dire quand : le present perfect.",
                [
                    "Have you ever eaten sushi? I've never been to Canada.",
                    "Dès qu'on dit quand, on passe au prétérit : I went to Canada in 2019.",
                    "been to = être allé (et revenu) ; gone to = parti là-bas (pas encore revenu).",
                ],
                [["Have you ever eaten sushi?", "As-tu déjà mangé des sushis ?"], ["I went to Canada in 2019.", "Je suis allé au Canada en 2019."]],
            ),
            [
                S("Have you ever eaten sushi?", "As-tu déjà mangé des sushis ?", ["have", "you", "ever", "eaten", "sushi"], focus=("eaten", PP, "Une expérience, sans dire quand."), blank=("eaten", "eat", ["ate", "eat"]), alt=["Did you ever eat sushi?"]),
                S("I've never been to Canada.", "Je ne suis jamais allé au Canada.", ["I've", "never", "been", "to Canada"], focus=("been", PP, "Never : une expérience de vie."), blank=("been", "be", ["was", "went"])),
                S("I went to Canada in 2019.", "Je suis allé au Canada en 2019.", ["I", "went", "to Canada", "in 2019"], ["In 2019 I went to Canada."], ("went", PT, "In 2019 : un moment précis, donc prétérit."), ("went", "go", ["have been", "have gone"]), SECOND),
                S("She has visited many countries.", "Elle a visité beaucoup de pays (dans sa vie).", ["she", "has visited", "many countries"], focus=("has visited", PP, "Dans sa vie, sans dire quand."), blank=("has visited", "visit", ["visited", "is visiting"])),
                S("Did you like the film last night?", "Le film d'hier soir t'a plu ?", ["did", "you", "like", "the film", "last night"], focus=("did", PT, "Last night : un moment terminé."), blank=("like", "like", ["liked", "have liked"]), alt=["Did you like the movie last night?"]),
                S("My father has never flown.", "Mon père n'a jamais pris l'avion.", ["my father", "has", "never", "flown"], focus=("flown", PP, "Never : une expérience de vie."), blank=("flown", "fly", ["flew", "flied"]), alt=["My father has never taken a plane.", "My father has never been on a plane."]),
                S("Tom has gone to London. He's coming back on Monday.", "Tom est parti à Londres. Il rentre lundi.", ["Tom", "has gone", "to London", "he's coming back", "on Monday"], focus=("has gone", PP, "Gone to : il est là-bas, pas encore revenu."), blank=("has gone", "go", ["has been", "has went"]), alt=["Tom went to London. He's coming back on Monday."]),
                S("We saw that film when it came out.", "Nous avons vu ce film à sa sortie.", ["we", "saw", "that film", "when", "it", "came out"], focus=("saw", PT, "When it came out : un moment passé précis."), blank=("saw", "see", ["have seen", "seen"]), alt=["We saw that movie when it came out."]),
            ],
            {"prompt": "Present perfect ou prétérit ?", "options": [PP, PT]},
        ),
        L(
            "Le résultat : just, already, yet",
            R(
                "Une action passée dont le résultat compte maintenant : le present perfect.",
                [
                    "just = venir de : I've just arrived.",
                    "already = déjà, dans une phrase affirmative : She has already left.",
                    "yet = déjà ? dans une question, pas encore dans une négation ; il se met à la fin : Have you finished yet? I haven't finished yet.",
                    "En anglais américain, on entend aussi le prétérit avec just et already (I just arrived) : il est accepté à la traduction.",
                ],
                [["I've just arrived at the station.", "Je viens d'arriver à la gare."], ["I haven't read the book yet.", "Je n'ai pas encore lu le livre."]],
            ),
            [
                S("I've just arrived at the station.", "Je viens d'arriver à la gare.", ["I've", "just", "arrived", "at the station"], focus=("just", JUST, "Just : venir de."), blank=("arrived", "arrive", ["arrive", "arriving"]), alt=["I just arrived at the station."]),
                S("She has already left.", "Elle est déjà partie.", ["she", "has", "already", "left"], focus=("already", ALREADY, "Already : déjà."), blank=("left", "leave", ["leaved", "leave"]), alt=["She already left."]),
                S("Have you finished your homework yet?", "Tu as déjà fini tes devoirs ?", ["have", "you", "finished", "your homework", "yet"], focus=("yet", YET, "Yet en fin de question : déjà ?"), blank=("finished", "finish", ["finish", "finishing"]), alt=["Have you already finished your homework?", "Did you finish your homework yet?"]),
                S("I haven't read the book yet.", "Je n'ai pas encore lu le livre.", ["I", "haven't", "read", "the book", "yet"], focus=("yet", YET, "Yet dans une négation : pas encore."), blank=("read", "read", ["readed", "reading"]), alt=["I didn't read the book yet."]),
                S("We've already booked the hotel.", "Nous avons déjà réservé l'hôtel.", ["we've", "already", "booked", "the hotel"], focus=("already", ALREADY, "Already : déjà."), blank=("booked", "book", ["book", "booking"]), alt=["We already booked the hotel."]),
                S("The film has just started.", "Le film vient de commencer.", ["the film", "has", "just", "started"], focus=("just", JUST, "Just : venir de."), blank=("started", "start", ["start", "starting"]), alt=["The movie has just started.", "The film just started."]),
                S("Has the postman come yet?", "Le facteur est-il déjà passé ?", ["has", "the postman", "come", "yet"], focus=("yet", YET, "Yet en fin de question : déjà ?"), blank=("come", "come", ["came", "comed"]), alt=["Has the postman been yet?", "Has the mailman come yet?", "Did the mailman come yet?"]),
            ],
            {"prompt": "Que veut dire le mot surligné ?", "options": [JUST, ALREADY, YET]},
        ),
        L(
            "since et for : depuis",
            R(
                "Pour une situation qui a commencé dans le passé et dure encore : le present perfect, jamais le présent comme en français.",
                [
                    "Je vis ici depuis 2015 → I've lived here since 2015 (jamais I live here since…).",
                    "since + un point de départ : since Monday, since 2015, since I was a child.",
                    "for + une durée : for three years, for a week, for ages.",
                    "How long have you…? = depuis combien de temps… ?",
                ],
                [["I've lived here since 2015.", "J'habite ici depuis 2015."], ["She has worked here for three years.", "Elle travaille ici depuis trois ans."]],
            ),
            [
                S("I've lived here since 2015.", "J'habite ici depuis 2015.", ["I've", "lived", "here", "since", "2015"], focus=("since", SINCE, "2015 : un point de départ."), blank=("since", "depuis", ["for", "from"]), meaning=["J'ai habité ici en 2015.", "J'habite ici depuis quinze ans."], alt=["I've been living here since 2015."]),
                S("She has worked here for three years.", "Elle travaille ici depuis trois ans.", ["she", "has worked", "here", "for", "three years"], focus=("for", FOR, "Trois ans : une durée."), blank=("for", "depuis", ["since", "during"]), meaning=["Elle a travaillé ici pendant trois ans, puis elle est partie.", "Elle va travailler ici pendant trois ans."], alt=["She has been working here for three years."]),
                S("We have known each other since we were children.", "Nous nous connaissons depuis l'enfance.", ["we", "have known", "each other", "since", "we were children"], focus=("since", SINCE, "Since we were children : un point de départ."), blank=("since", "depuis", ["for", "when"]), alt=["We have known each other since childhood."]),
                S("How long have you been married?", "Depuis combien de temps es-tu marié ?", ["how long", "have", "you", "been", "married"], blank=("have", HAVEHAS, ["are", "has"])),
                S("I haven't seen him for ages.", "Je ne l'ai pas vu depuis une éternité.", ["I", "haven't", "seen", "him", "for", "ages"], focus=("for", FOR, "Ages : une durée."), blank=("for", "depuis", ["since", "from"]), alt=["I haven't seen him in ages."]),
                S("It has been cold since Monday.", "Il fait froid depuis lundi.", ["it", "has been", "cold", "since", "Monday"], focus=("since", SINCE, "Monday : un point de départ."), blank=("since", "depuis", ["for", "from"])),
                S("My brother has had his car for a month.", "Mon frère a sa voiture depuis un mois.", ["my brother", "has had", "his car", "for", "a month"], focus=("for", FOR, "Un mois : une durée."), blank=("has had", "have", ["has", "had"]), meaning=["Mon frère a eu sa voiture pendant un mois.", "Mon frère achètera sa voiture dans un mois."]),
                S("They have been friends since school.", "Ils sont amis depuis l'école.", ["they", "have been", "friends", "since", "school"], focus=("since", SINCE, "School : un point de départ."), blank=("have been", "be", ["are", "were"])),
            ],
            {"prompt": "since ou for ?", "options": [SINCE, FOR]},
        ),
        L(
            "Un moment terminé : yesterday, ago → prétérit",
            R(
                "Dès qu'on dit quand l'action a eu lieu, dans un temps terminé, c'est le prétérit.",
                [
                    "yesterday, last week, two days ago, in 2010, when I was a child → prétérit.",
                    "Faux : I have seen him yesterday. Juste : I saw him yesterday.",
                    "Les questions avec when sont au prétérit : When did you arrive?",
                ],
                [["I saw him yesterday.", "Je l'ai vu hier."], ["I've seen this film three times.", "J'ai vu ce film trois fois (dans ma vie)."]],
            ),
            [
                S("I saw him yesterday.", "Je l'ai vu hier.", ["I", "saw", "him", "yesterday"], ["Yesterday I saw him."], ("saw", PT, "Yesterday : un moment terminé."), ("saw", "see", ["have seen", "seen"]), SECOND),
                S("When did you arrive?", "Quand es-tu arrivé ?", ["when", "did", "you", "arrive"], focus=("did", PT, "When : on demande un moment précis, donc prétérit."), blank=("did", "do", ["have", "has"])),
                S("She left two hours ago.", "Elle est partie il y a deux heures.", ["she", "left", "two hours ago"], focus=("left", PT, "Ago : un moment passé précis."), blank=("left", "leave", ["has left", "leaved"])),
                S("I've seen this film three times.", "J'ai vu ce film trois fois (dans ma vie).", ["I've", "seen", "this film", "three times"], focus=("seen", PP, "Une expérience, sans dire quand."), blank=("seen", "see", ["saw", "seed"]), alt=["I've seen this movie three times."]),
                S("We moved to Paris in 2018.", "Nous avons emménagé à Paris en 2018.", ["we", "moved", "to Paris", "in 2018"], ["In 2018 we moved to Paris."], ("moved", PT, "In 2018 : un moment précis."), ("moved", "move", ["have moved", "move"]), SECOND),
                S("Have you met my wife?", "As-tu déjà rencontré ma femme ?", ["have", "you", "met", "my wife"], focus=("met", PP, "Une expérience, sans dire quand."), blank=("met", "meet", ["meeted", "meet"]), alt=["Have you ever met my wife?", "Have you already met my wife?"]),
                S("When I was a child, I lived in Spain.", "Quand j'étais enfant, j'habitais en Espagne.", ["when", "I", "was", "a child", "I", "lived", "in Spain"], ["I lived in Spain when I was a child."], ("lived", PT, "L'enfance est finie : prétérit."), ("lived", "live", ["have lived", "live"]), SUB_FIRST, meaning=["J'habite en Espagne depuis mon enfance.", "Quand j'étais enfant, je voulais vivre en Espagne."], alt=["When I was a child, I used to live in Spain."]),
                S("I've lived in Spain for ten years.", "J'habite en Espagne depuis dix ans.", ["I've", "lived", "in Spain", "for ten years"], focus=("lived", PP, "Ça dure encore : present perfect."), blank=("lived", "live", ["live", "living"]), meaning=["J'ai habité en Espagne pendant dix ans (c'est fini).", "J'habiterai en Espagne pendant dix ans."], alt=["I've been living in Spain for ten years."]),
            ],
            {"prompt": "Present perfect ou prétérit ?", "options": [PP, PT]},
        ),
        L(
            "Annoncer une nouvelle, puis raconter",
            R(
                "On annonce une nouvelle au present perfect, puis on donne les détails au prétérit.",
                [
                    "I've broken my arm! – How did it happen? – I fell off my bike.",
                    "La 1re phrase dit le résultat ; dès qu'on raconte (quand, comment), on passe au prétérit.",
                    "Dans les médias : The president has resigned. He announced it this morning.",
                ],
                [["I've broken my arm!", "Je me suis cassé le bras !"], ["I fell off my bike on Sunday.", "Je suis tombé de vélo dimanche."]],
            ),
            [
                S("I've broken my arm!", "Je me suis cassé le bras !", ["I've", "broken", "my arm"], focus=("broken", NEWS, "La nouvelle : le bras est cassé maintenant."), blank=("broken", "break", ["broke", "breaked"]), alt=["I broke my arm!"]),
                S("I fell off my bike on Sunday.", "Je suis tombé de vélo dimanche.", ["I", "fell off", "my bike", "on Sunday"], ["On Sunday I fell off my bike."], ("fell off", DETAIL, "Le détail : quand, comment."), ("fell off", "fall off", ["have fallen off", "falled off"]), SECOND),
                S("The president has resigned.", "Le président a démissionné.", ["the president", "has", "resigned"], focus=("resigned", NEWS, "La nouvelle, sans dire quand."), blank=("has", HAVEHAS, ["have", "did"]), alt=["The president resigned."]),
                S("He announced it at nine o'clock this morning.", "Il l'a annoncé ce matin à neuf heures.", ["he", "announced", "it", "at nine o'clock", "this morning"], focus=("announced", DETAIL, "À neuf heures : un moment précis."), blank=("announced", "announce", ["has announced", "announce"])),
                S("Someone has stolen my bike!", "On m'a volé mon vélo !", ["someone", "has stolen", "my bike"], focus=("has stolen", NEWS, "La nouvelle : le vélo n'est plus là."), blank=("has stolen", "steal", ["has stealed", "is stealing"]), alt=["My bike has been stolen!", "My bike was stolen!", "Someone stole my bike!"]),
                S("When did it happen?", "Quand est-ce que c'est arrivé ?", ["when", "did", "it", "happen"], focus=("did", DETAIL, "When : on demande un détail, donc prétérit."), blank=("happen", "happen", ["happened", "has happened"])),
                S("Our team has won the cup! They scored in the last minute.", "Notre équipe a gagné la coupe ! Elle a marqué à la dernière minute.", ["our team", "has won", "the cup", "they", "scored", "in the last minute"], focus=("scored", DETAIL, "Le détail : à la dernière minute."), blank=("scored", "score", ["have scored", "score"]), meaning=["Notre équipe a perdu la coupe à la dernière minute.", "Notre équipe va jouer la finale de la coupe."]),
            ],
            {"prompt": "Pourquoi ce temps ?", "options": [NEWS, DETAIL]},
        ),
        L(
            "Mélange : present perfect ou prétérit ?",
            R(
                "Les deux temps ensemble.",
                [
                    "Present perfect : un lien avec maintenant : une expérience (ever, never), un résultat (just, already, yet), une durée jusqu'à maintenant (since, for), une nouvelle.",
                    "Prétérit : un moment passé terminé (yesterday, ago, in 2010, when…), un récit.",
                    "Une période pas encore finie (today, this year) : present perfect.",
                ],
                [["I've known her for years.", "Je la connais depuis des années."], ["I met her ten years ago.", "Je l'ai rencontrée il y a dix ans."]],
            ),
            [
                S("I've known her for years.", "Je la connais depuis des années.", ["I've", "known", "her", "for years"], focus=("known", PP, "Ça dure encore : present perfect."), blank=("known", "know", ["knew", "knowed"])),
                S("I met her ten years ago.", "Je l'ai rencontrée il y a dix ans.", ["I", "met", "her", "ten years ago"], focus=("met", PT, "Ago : un moment précis."), blank=("met", "meet", ["have met", "meeted"])),
                S("Have you ever tried Indian food?", "As-tu déjà goûté la cuisine indienne ?", ["have", "you", "ever", "tried", "Indian food"], focus=("tried", PP, "Ever : une expérience."), blank=("tried", "try", ["tryed", "try"])),
                S("Last weekend we went to the mountains.", "Le week-end dernier, nous sommes allés à la montagne.", ["last weekend", "we", "went", "to the mountains"], ["We went to the mountains last weekend."], ("went", PT, "Last weekend : un moment terminé."), ("went", "go", ["have gone", "have been"]), SECOND),
                S("Prices have gone up a lot this year.", "Les prix ont beaucoup augmenté cette année.", ["prices", "have", "gone up", "a lot", "this year"], focus=("gone up", PP, "This year : la période n'est pas finie."), blank=("gone up", "go up", ["went up", "goed up"]), alt=["Prices have risen a lot this year.", "Prices went up a lot this year."]),
                S("Did you sleep well?", "Tu as bien dormi ?", ["did", "you", "sleep", "well"], focus=("sleep", PT, "La nuit est finie : prétérit."), blank=("sleep", "sleep", ["slept", "sleeped"])),
                S("He has worked for this company since he left school.", "Il travaille pour cette entreprise depuis qu'il a quitté l'école.", ["he", "has worked", "for this company", "since", "he", "left", "school"], focus=("left", PT, "Quitter l'école : un moment terminé."), blank=("has worked", "work", ["worked", "works"]), meaning=["Il a travaillé pour cette entreprise avant de quitter l'école.", "Il a quitté l'entreprise quand il a fini l'école."], alt=["He has been working for this company since he left school."]),
            ],
            {"prompt": "Present perfect ou prétérit ?", "options": [PP, PT]},
        ),
    ],
}

# ---------------------------------------------------------------- Unit 4: present perfect continuous
PPC = "une action qui dure jusqu'à maintenant : been + -ing"
PPS_STATE = "un verbe d'état : present perfect simple"
NOW_ONLY = "maintenant seulement : présent continu"
ACT = "l'activité, sa durée : been + -ing"
RES = "le résultat, une quantité : present perfect simple"
AGO = "ago : il y a (prétérit)"

unit4 = {
    "title": "Le present perfect continu",
    "level": "B1",
    "hint": "Le « depuis » français : I've been waiting for an hour, j'attends depuis une heure.",
    "lessons": [
        L(
            "have been + -ing : depuis combien de temps",
            R(
                "Pour une action qui dure depuis un moment et continue : have / has been + -ing.",
                [
                    "I've been waiting for an hour : j'attends depuis une heure.",
                    "How long have you been learning English?",
                    "Avec les verbes d'état, on garde le present perfect simple : I've known him for years.",
                ],
                [["I've been waiting for an hour.", "J'attends depuis une heure."], ["How long have you been learning English?", "Depuis combien de temps apprends-tu l'anglais ?"]],
            ),
            [
                S("I've been waiting for an hour.", "J'attends depuis une heure.", ["I've", "been waiting", "for an hour"], focus=("been waiting", PPC, "Ça dure depuis une heure, et ça continue."), blank=("been waiting", "wait", ["wait", "waiting"]), meaning=["J'ai attendu une heure (c'est fini).", "J'attendrai une heure."]),
                S("How long have you been learning English?", "Depuis combien de temps apprends-tu l'anglais ?", ["how long", "have", "you", "been learning", "English"], focus=("been learning", PPC, "Ça dure encore : been + -ing."), blank=("been learning", "learn", ["learn", "learning"])),
                S("It has been raining all morning.", "Il pleut depuis ce matin.", ["it", "has", "been raining", "all morning"], focus=("been raining", PPC, "La pluie dure toute la matinée."), blank=("been raining", "rain", ["rain", "raining"]), alt=["It has been raining since this morning."]),
                S("I've known him for ten years.", "Je le connais depuis dix ans.", ["I've", "known", "him", "for ten years"], focus=("known", PPS_STATE, "Know est un verbe d'état : pas de -ing."), blank=("known", "know", ["been knowing", "knew"])),
                S("She has been working here since March.", "Elle travaille ici depuis mars.", ["she", "has", "been working", "here", "since March"], focus=("been working", PPC, "Ça dure depuis mars."), blank=("been working", "work", ["work", "works"]), alt=["She has worked here since March."]),
                S("We're waiting for the bus.", "Nous attendons le bus.", ["we're waiting", "for the bus"], focus=("We're waiting", NOW_ONLY, "Pas de durée : juste maintenant."), blank=("we're waiting", "wait", ["we wait", "we waiting"])),
                S("They have been living in Berlin for two years.", "Ils vivent à Berlin depuis deux ans.", ["they", "have", "been living", "in Berlin", "for two years"], focus=("been living", PPC, "Ça dure depuis deux ans."), blank=("been living", "live", ["live", "been lived"]), alt=["They have lived in Berlin for two years."]),
            ],
            {"prompt": "Pourquoi cette forme ?", "options": [PPC, PPS_STATE, NOW_ONLY]},
        ),
        L(
            "L'activité ou le résultat ?",
            R(
                "Le continu insiste sur l'activité et sa durée ; le simple, sur le résultat ou la quantité.",
                [
                    "I've been painting the kitchen : j'ai passé du temps à peindre (et j'ai de la peinture partout).",
                    "I've painted the kitchen : c'est fini, voilà le résultat.",
                    "Avec un nombre ou une quantité : le simple : I've written three emails.",
                ],
                [["I've been painting the kitchen.", "J'ai passé du temps à peindre la cuisine."], ["She has written three emails this morning.", "Elle a écrit trois e-mails ce matin."]],
            ),
            [
                S("I've been painting the kitchen.", "J'ai passé du temps à peindre la cuisine.", ["I've", "been painting", "the kitchen"], focus=("been painting", ACT, "On parle de l'activité."), blank=("been painting", "paint", ["paint", "painting"])),
                S("I've painted the kitchen. It looks great!", "J'ai peint la cuisine. Elle est superbe !", ["I've", "painted", "the kitchen", "it", "looks", "great"], focus=("painted", RES, "C'est fini : voilà le résultat."), blank=("painted", "paint", ["paint", "painting"])),
                S("She has written three emails this morning.", "Elle a écrit trois e-mails ce matin.", ["she", "has", "written", "three emails", "this morning"], focus=("written", RES, "Un nombre : le simple."), blank=("written", "write", ["wrote", "been writing"]), alt=["She wrote three emails this morning."]),
                S("I'm tired because I've been running.", "Je suis fatigué parce que j'ai couru.", ["I'm", "tired", "because", "I've", "been running"], focus=("been running", ACT, "On voit les traces de l'activité : la fatigue."), blank=("been running", "run", ["ran", "running"]), alt=["I'm tired because I ran."]),
                S("We've visited five museums this week.", "Nous avons visité cinq musées cette semaine.", ["we've", "visited", "five museums", "this week"], focus=("visited", RES, "Un nombre : le simple."), blank=("visited", "visit", ["visit", "been visit"])),
                S("You're wet! Have you been swimming?", "Tu es mouillé ! Tu as nagé ?", ["you're", "wet", "have", "you", "been swimming"], focus=("been swimming", ACT, "On voit les traces de l'activité."), blank=("been swimming", "swim", ["swam", "swimming"])),
                S("He has read the whole book.", "Il a lu tout le livre.", ["he", "has", "read", "the whole book"], focus=("read", RES, "C'est fini : le livre entier."), blank=("read", "read", ["been reading", "readed"]), alt=["He read the whole book."]),
            ],
            {"prompt": "L'activité ou le résultat ?", "options": [ACT, RES]},
        ),
        L(
            "Le « depuis » français : récapitulatif",
            R(
                "« Je fais quelque chose depuis… » ne se dit jamais au présent en anglais.",
                [
                    "Une action : I've been working here for two years.",
                    "Un état : I've had this car since 2020.",
                    "La question : How long have you been waiting?",
                    "ago = il y a, avec le prétérit ; for et since = depuis, avec le present perfect.",
                ],
                [["I've had this car since 2020.", "J'ai cette voiture depuis 2020."], ["I bought this car three years ago.", "J'ai acheté cette voiture il y a trois ans."]],
            ),
            [
                S("I've had this car since 2020.", "J'ai cette voiture depuis 2020.", ["I've", "had", "this car", "since 2020"], focus=("had", PPS_STATE, "Have = posséder : un état."), blank=("had", "have", ["have", "been having"])),
                S("I bought this car three years ago.", "J'ai acheté cette voiture il y a trois ans.", ["I", "bought", "this car", "three years ago"], ["Three years ago I bought this car."], ("bought", AGO, "Ago : il y a, donc prétérit."), ("bought", "buy", ["have bought", "buyed"]), SECOND),
                S("How long have you been waiting?", "Depuis combien de temps attends-tu ?", ["how long", "have", "you", "been waiting"], focus=("been waiting", PPC, "Ça dure encore."), blank=("been waiting", "wait", ["wait", "waiting"])),
                S("She has been playing the piano since she was six.", "Elle joue du piano depuis l'âge de six ans.", ["she", "has", "been playing", "the piano", "since", "she", "was", "six"], focus=("been playing", PPC, "Ça dure depuis ses six ans."), blank=("been playing", "play", ["play", "playing"]), meaning=["Elle a joué du piano jusqu'à six ans.", "Elle a commencé le piano il y a six ans."], alt=["She has played the piano since she was six."]),
                S("We've been friends for twenty years.", "Nous sommes amis depuis vingt ans.", ["we've", "been", "friends", "for twenty years"], focus=("been", PPS_STATE, "Be est un verbe d'état."), blank=("been", "be", ["are", "were"])),
                S("They arrived an hour ago.", "Ils sont arrivés il y a une heure.", ["they", "arrived", "an hour ago"], focus=("arrived", AGO, "Ago : prétérit."), blank=("arrived", "arrive", ["have arrived", "arrive"])),
                S("I've been looking for my glasses all morning.", "Je cherche mes lunettes depuis ce matin.", ["I've", "been looking for", "my glasses", "all morning"], focus=("been looking for", PPC, "Ça dure toute la matinée."), blank=("been looking for", "look for", ["look for", "looking for"]), alt=["I've been looking for my glasses since this morning."]),
            ],
            {"prompt": "Pourquoi cette forme ?", "options": [PPC, PPS_STATE, AGO]},
        ),
    ],
}

# ---------------------------------------------------------------- Unit 5: past perfect
PAST_A = "prétérit : au moment raconté"
PPF = "past perfect : avant ce moment"
AFTER = "after : après que"
BEFORE = "before : avant que"
BYTIME = "by the time : au moment où (c'était déjà fait)"
LINK = "après ? avant ? au moment où ?"
STORY = "prétérit : l'histoire avance"
SCENE = "prétérit continu : le décor"
BACK = "past perfect : un retour en arrière"

unit5 = {
    "title": "Le past perfect",
    "level": "B1",
    "hint": "had + participe : ce qui s'était passé avant un autre moment du passé.",
    "lessons": [
        L(
            "had + participe : avant le passé",
            R(
                "had + participe passé : ce qui s'était passé avant un autre moment du passé.",
                [
                    "When I arrived, the film had started : le film avait déjà commencé.",
                    "Comparer : When I arrived, the film started : il a commencé à mon arrivée.",
                    "had pour toutes les personnes ; contracté : I'd, she'd (I'd peut aussi vouloir dire I would).",
                ],
                [["When I arrived, the film had started.", "Quand je suis arrivé, le film avait commencé."], ["She had never seen snow before.", "Elle n'avait jamais vu de neige avant."]],
            ),
            [
                S("When I arrived, the film had started.", "Quand je suis arrivé, le film avait déjà commencé.", ["when", "I", "arrived", "the film", "had started"], ["The film had started when I arrived."], ("had started", PPF, "Le film a commencé avant mon arrivée."), ("had started", "start", ["started", "has started"]), SUB_FIRST, meaning=["Le film a commencé à mon arrivée.", "Je suis arrivé après la fin du film."], alt=["When I arrived, the film had already started.", "The film had already started when I arrived."]),
                S("When I arrived, the film started.", "Le film a commencé au moment où je suis arrivé.", ["when", "I", "arrived", "the film", "started"], ["The film started when I arrived."], ("started", PAST_A, "Le film commence au moment de mon arrivée."), ("started", "start", ["had started", "starts"]), SUB_FIRST, meaning=["Quand je suis arrivé, le film avait déjà commencé.", "Le film a commencé avant mon arrivée."]),
                S("She had never seen snow before.", "Elle n'avait jamais vu de neige avant.", ["she", "had", "never", "seen", "snow", "before"], focus=("seen", PPF, "Avant ce jour-là : past perfect."), blank=("had", "have", ["has", "was"])),
                S("We had already eaten, so we weren't hungry.", "Nous avions déjà mangé, donc nous n'avions pas faim.", ["we", "had", "already", "eaten", "so", "we", "weren't", "hungry"], focus=("eaten", PPF, "Le repas vient avant : past perfect."), blank=("eaten", "eat", ["ate", "eat"])),
                S("I recognised him because I had met him before.", "Je l'ai reconnu parce que je l'avais déjà rencontré.", ["I", "recognised", "him", "because", "I", "had met", "him", "before"], focus=("recognised", PAST_A, "Le moment raconté : je le reconnais."), blank=("had met", "meet", ["have met", "meeted"]), alt=["I recognised him because I had already met him.", "I recognized him because I had met him before."]),
                S("The train had left when we got to the station.", "Le train était parti quand nous sommes arrivés à la gare.", ["the train", "had left", "when", "we", "got", "to the station"], ["When we got to the station the train had left."], ("got", PAST_A, "Le moment raconté : notre arrivée."), ("had left", "leave", ["left", "has left"]), SUB_FIRST, alt=["The train had left when we arrived at the station.", "The train had already left when we got to the station."]),
                S("He was tired because he had worked all day.", "Il était fatigué parce qu'il avait travaillé toute la journée.", ["he", "was", "tired", "because", "he", "had worked", "all day"], focus=("had worked", PPF, "Le travail vient avant la fatigue."), blank=("had worked", "work", ["has worked", "works"]), alt=["He was tired because he had been working all day."]),
            ],
            {"prompt": "Prétérit ou past perfect ?", "options": [PAST_A, PPF]},
        ),
        L(
            "after, before, by the time",
            R(
                "Trois mots pour situer deux actions du passé.",
                [
                    "after + past perfect : After she had finished, she went home.",
                    "before : le prétérit suffit souvent : She called me before she left.",
                    "by the time = au moment où, c'était déjà fait : By the time we arrived, they had left.",
                    "Avec after et before, l'ordre est déjà clair : le prétérit est souvent possible aussi.",
                ],
                [["After she had finished her work, she went home.", "Après avoir fini son travail, elle est rentrée chez elle."], ["By the time we arrived, they had left.", "Quand nous sommes arrivés, ils étaient déjà partis."]],
            ),
            [
                S("After she had finished her work, she went home.", "Après avoir fini son travail, elle est rentrée chez elle.", ["after", "she", "had finished", "her work", "she", "went", "home"], ["She went home after she had finished her work."], ("after", AFTER, "D'abord le travail, puis la maison."), ("after", LINK, ["before", "by the time"]), SUB_FIRST, ["After finishing her work, she went home.", "After she finished her work, she went home.", "She went home after she finished her work."]),
                S("By the time we arrived, they had left.", "Quand nous sommes arrivés, ils étaient déjà partis.", ["by the time", "we", "arrived", "they", "had left"], ["They had left by the time we arrived."], ("by the time", BYTIME, "À notre arrivée, c'était déjà fait."), ("by the time", LINK, ["after", "while"]), SUB_FIRST, meaning=["Ils sont partis quand nous sommes arrivés.", "Nous sommes partis avant leur arrivée."], alt=["When we arrived, they had already left.", "By the time we arrived, they had already left."]),
                S("I brushed my teeth before I went to bed.", "Je me suis brossé les dents avant d'aller me coucher.", ["I", "brushed", "my teeth", "before", "I", "went", "to bed"], ["Before I went to bed I brushed my teeth."], ("before", BEFORE, "Les dents d'abord, puis le lit."), ("before", LINK, ["after", "by the time"]), SUB_FIRST, ["I had brushed my teeth before I went to bed.", "I brushed my teeth before going to bed."]),
                S("By the time the police came, the thief had escaped.", "Quand la police est arrivée, le voleur s'était déjà enfui.", ["by the time", "the police", "came", "the thief", "had escaped"], ["The thief had escaped by the time the police came."], ("by the time", BYTIME, "À l'arrivée de la police, c'était déjà fait."), ("had escaped", "escape", ["has escaped", "escapes"]), SUB_FIRST, alt=["When the police arrived, the thief had already escaped.", "By the time the police arrived, the thief had escaped."]),
                S("After we had walked for hours, we found a village.", "Après avoir marché pendant des heures, nous avons trouvé un village.", ["after", "we", "had walked", "for hours", "we", "found", "a village"], ["We found a village after we had walked for hours."], ("after", AFTER, "D'abord la marche, puis le village."), ("found", "find", ["had found", "finded"]), SUB_FIRST, ["After we walked for hours, we found a village.", "After walking for hours, we found a village."]),
                S("She called me before she left.", "Elle m'a appelé avant de partir.", ["she", "called", "me", "before", "she", "left"], ["Before she left she called me."], ("before", BEFORE, "L'appel d'abord, puis le départ."), ("called", "call", ["calls", "call"]), SUB_FIRST, alt=["She called me before leaving."]),
                S("By the time I woke up, everyone had gone out.", "Quand je me suis réveillé, tout le monde était déjà sorti.", ["by the time", "I", "woke up", "everyone", "had gone out"], ["Everyone had gone out by the time I woke up."], ("by the time", BYTIME, "À mon réveil, c'était déjà fait."), ("woke up", "wake up", ["wakes up", "waked up"]), SUB_FIRST, alt=["When I woke up, everyone had already gone out."]),
            ],
            {"prompt": "Que dit le mot surligné ?", "options": [AFTER, BEFORE, BYTIME]},
        ),
        L(
            "Raconter : trois temps ensemble",
            R(
                "Dans un récit, chaque temps a son rôle.",
                [
                    "Le prétérit fait avancer l'histoire : I opened the door.",
                    "Le prétérit continu pose le décor : It was raining.",
                    "Le past perfect revient en arrière : Someone had broken the window.",
                ],
                [["It was raining when I got home.", "Il pleuvait quand je suis rentré."], ["Someone had broken the window.", "Quelqu'un avait cassé la fenêtre."]],
            ),
            [
                S("It was raining when I got home.", "Il pleuvait quand je suis rentré.", ["it", "was raining", "when", "I", "got", "home"], ["When I got home it was raining."], ("was raining", SCENE, "Le décor."), ("got", "get", ["had got", "was getting"]), SUB_FIRST, alt=["It was raining when I came home."]),
                S("I opened the door and turned on the light.", "J'ai ouvert la porte et allumé la lumière.", ["I", "opened", "the door", "and", "turned on", "the light"], focus=("opened", STORY, "L'histoire avance."), blank=("turned on", "turn on", ["had turned on", "was turning on"]), alt=["I opened the door and turned the light on."]),
                S("Someone had broken the window.", "Quelqu'un avait cassé la fenêtre.", ["someone", "had broken", "the window"], focus=("had broken", BACK, "C'était arrivé avant."), blank=("had broken", "break", ["broke", "has broken"])),
                S("My neighbours were watching TV next door.", "Mes voisins regardaient la télé à côté.", ["my neighbours", "were watching", "TV", "next door"], focus=("were watching", SCENE, "Le décor."), blank=("were watching", "watch", ["watched", "had watched"])),
                S("They hadn't heard anything.", "Ils n'avaient rien entendu.", ["they", "hadn't heard", "anything"], focus=("hadn't heard", BACK, "Avant ce moment-là."), blank=("hadn't heard", "not hear", ["haven't heard", "didn't heard"])),
                S("I called the police and waited.", "J'ai appelé la police et j'ai attendu.", ["I", "called", "the police", "and", "waited"], focus=("called", STORY, "L'histoire avance."), blank=("waited", "wait", ["had waited", "wait"])),
                S("When the police arrived, the thief had disappeared.", "Quand la police est arrivée, le voleur avait disparu.", ["when", "the police", "arrived", "the thief", "had disappeared"], ["The thief had disappeared when the police arrived."], ("had disappeared", BACK, "Il avait disparu avant l'arrivée de la police."), ("had disappeared", "disappear", ["has disappeared", "disappears"]), SUB_FIRST, meaning=["Le voleur a disparu à l'arrivée de la police.", "La police est arrivée après avoir attrapé le voleur."]),
            ],
            {"prompt": "Quel rôle joue ce temps dans le récit ?", "options": [STORY, SCENE, BACK]},
        ),
    ],
}

# ---------------------------------------------------------------- Unit 6: the future
DECIDE = "une décision prise sur le moment"
PROMISE = "une promesse ou une offre"
PREDICT = "une prévision, un avis sur l'avenir"
PLAN = "going to : un projet décidé avant"
EVIDENT = "going to : on le voit venir"
WILL_NOW = "will : une décision sur le moment"
ARR = "présent continu : un rendez-vous fixé"
TIMETABLE = "présent simple : un horaire"
NOW_PC = "présent continu : maintenant"
WILL = "will : décision sur le moment, promesse, prévision"
GOING = "going to : projet, évidence"

unit6 = {
    "title": "Parler du futur",
    "level": "A2",
    "hint": "will, going to, le présent continu ou le présent simple : quatre façons de parler du futur, selon ce qu'on veut dire.",
    "lessons": [
        L(
            "will : décider sur le moment, promettre",
            R(
                "will + verbe : une décision prise au moment où l'on parle, une promesse, une offre, une prévision.",
                [
                    "Someone is at the door. I'll open it.",
                    "I'll help you, I promise.",
                    "Négation : won't (= will not).",
                    "Après I think, I'm sure, probably : will : I think it will rain. (Après I hope, le présent est aussi courant : I hope it doesn't rain.)",
                ],
                [["I'll help you with your bags.", "Je vais t'aider avec tes sacs."], ["I think it will rain tomorrow.", "Je pense qu'il va pleuvoir demain."]],
            ),
            [
                S("Someone is at the door. I'll open it.", "Quelqu'un est à la porte. Je vais ouvrir.", ["someone", "is", "at the door", "I'll", "open", "it"], focus=("I'll", DECIDE, "Je décide au moment où on sonne."), blank=("open", "open", ["opening", "to open"])),
                S("I'll help you with your bags.", "Je vais t'aider avec tes sacs.", ["I'll", "help", "you", "with your bags"], focus=("I'll", PROMISE, "Une offre d'aide."), blank=("help", "help", ["to help", "helping"])),
                S("I think it will rain tomorrow.", "Je pense qu'il va pleuvoir demain.", ["I", "think", "it", "will rain", "tomorrow"], focus=("will rain", PREDICT, "I think : un avis sur l'avenir."), blank=("will rain", "rain", ["rains", "is raining"]), alt=["I think it's going to rain tomorrow."]),
                S("Don't worry, I won't tell anyone.", "Ne t'inquiète pas, je ne le dirai à personne.", ["don't worry", "I", "won't tell", "anyone"], focus=("won't tell", PROMISE, "Une promesse."), blank=("won't tell", "not tell", ["don't tell", "won't to tell"])),
                S("I'm hungry. I'll make a sandwich.", "J'ai faim. Je vais me faire un sandwich.", ["I'm", "hungry", "I'll", "make", "a sandwich"], focus=("I'll", DECIDE, "Je décide maintenant, parce que j'ai faim."), blank=("make", "make", ["making", "to make"]), alt=["I'm hungry. I'll make myself a sandwich."]),
                S("She will probably be late.", "Elle sera probablement en retard.", ["she", "will", "probably", "be", "late"], focus=("will", PREDICT, "Probably : une prévision."), blank=("be", "be", ["is", "being"])),
                S("I'll call you tonight, I promise.", "Je t'appelle ce soir, promis.", ["I'll", "call", "you", "tonight", "I promise"], ["I promise I'll call you tonight."], focus=("I'll", PROMISE, "I promise : une promesse."), blank=("call", "call", ["calling", "to call"])),
            ],
            {"prompt": "Que dit will ici ?", "options": [DECIDE, PROMISE, PREDICT]},
        ),
        L(
            "going to : un projet, une évidence",
            R(
                "be going to + verbe : un projet déjà décidé, ou ce qu'on voit venir.",
                [
                    "Un projet : I'm going to study medicine next year.",
                    "Une évidence : Look at those clouds! It's going to rain.",
                    "Comparer : I'll buy some milk (je décide maintenant) / I'm going to buy a car (c'est décidé depuis un moment).",
                ],
                [["I'm going to study medicine next year.", "L'an prochain, je vais faire des études de médecine."], ["Look at those clouds! It's going to rain.", "Regarde ces nuages ! Il va pleuvoir."]],
            ),
            [
                S("I'm going to study medicine next year.", "L'an prochain, je vais faire des études de médecine.", ["I'm going to", "study", "medicine", "next year"], ["Next year I'm going to study medicine."], ("I'm going to", PLAN, "C'est décidé depuis un moment."), ("study", "study", ["studying", "studied"]), SECOND),
                S("Look at those clouds! It's going to rain.", "Regarde ces nuages ! Il va pleuvoir.", ["look at", "those clouds", "it's going to", "rain"], focus=("going to", EVIDENT, "Les nuages : on le voit venir."), blank=("it's going to", "be going to", ["it goes to", "it's going"]), alt=["Look at these clouds! It's going to rain."]),
                S("We're going to buy a new car.", "Nous allons acheter une nouvelle voiture (c'est décidé).", ["we're going to", "buy", "a new car"], focus=("going to", PLAN, "C'est décidé."), blank=("we're going to", "be going to", ["we'll to", "we go to"])),
                S("Oh, there's no milk. I'll buy some.", "Oh, il n'y a plus de lait. Je vais en acheter.", ["oh", "there's", "no milk", "I'll", "buy", "some"], focus=("I'll", WILL_NOW, "Je le découvre et je décide tout de suite."), blank=("buy", "buy", ["buying", "to buy"]), alt=["Oh, there's no milk left. I'll buy some.", "Oh, there's no more milk. I'll buy some."]),
                S("Be careful! You're going to fall!", "Attention ! Tu vas tomber !", ["be careful", "you're going to", "fall"], focus=("going to", EVIDENT, "On le voit venir."), blank=("fall", "fall", ["falling", "fell"])),
                S("What are you going to do this weekend?", "Qu'est-ce que tu vas faire ce week-end ?", ["what", "are", "you", "going to", "do", "this weekend"], focus=("going to", PLAN, "On demande le projet."), blank=("do", "do", ["doing", "did"]), alt=["What are you doing this weekend?"]),
                S("She's going to have a baby.", "Elle va avoir un bébé.", ["she's going to", "have", "a baby"], focus=("going to", EVIDENT, "On le voit venir."), blank=("have", "have", ["having", "has"]), alt=["She's having a baby."]),
            ],
            {"prompt": "Pourquoi cette forme ?", "options": [PLAN, EVIDENT, WILL_NOW]},
        ),
        L(
            "Le présent continu : un rendez-vous fixé",
            R(
                "Pour un rendez-vous ou un arrangement déjà fixé avec quelqu'un : le présent continu.",
                [
                    "I'm meeting Anna at six. We're flying to Rome on Friday.",
                    "Toujours avec un moment futur (tonight, on Friday, next week) ; sinon, on comprend « maintenant ».",
                    "Le présent simple sert aux horaires : The train leaves at seven.",
                ],
                [["I'm meeting Anna at six.", "Je retrouve Anna à six heures."], ["The train leaves at seven.", "Le train part à sept heures."]],
            ),
            [
                S("I'm meeting Anna at six tonight.", "Je retrouve Anna à six heures ce soir.", ["I'm meeting", "Anna", "at six", "tonight"], focus=("I'm meeting", ARR, "Un rendez-vous fixé."), blank=("I'm meeting", "meet", ["I meeting", "I'll meeting"]), alt=["I'm going to meet Anna at six tonight."]),
                S("We're flying to Rome on Friday.", "Nous prenons l'avion pour Rome vendredi.", ["we're flying", "to Rome", "on Friday"], ["On Friday we're flying to Rome."], ("we're flying", ARR, "Le voyage est réservé."), ("we're flying", "fly", ["we'll flying", "we flying"]), SECOND, ["We're going to fly to Rome on Friday.", "We're leaving for Rome on Friday."]),
                S("The train leaves at seven.", "Le train part à sept heures.", ["the train", "leaves", "at seven"], focus=("leaves", TIMETABLE, "Un horaire."), blank=("leaves", "leave", ["leave", "leaving"])),
                S("What are you doing tonight?", "Qu'est-ce que tu fais ce soir ?", ["what", "are", "you", "doing", "tonight"], focus=("doing", ARR, "Tonight : on demande le programme."), blank=("doing", "do", ["do", "did"]), alt=["What are you going to do tonight?"]),
                S("Shh, the baby is sleeping.", "Chut, le bébé dort.", ["shh", "the baby", "is sleeping"], focus=("is sleeping", NOW_PC, "Pas de moment futur : maintenant."), blank=("is sleeping", "sleep", ["sleeps", "sleep"]), alt=["Shh, the baby's asleep."]),
                S("The film starts at half past eight.", "Le film commence à huit heures et demie.", ["the film", "starts", "at half past eight"], focus=("starts", TIMETABLE, "Un horaire."), blank=("starts", "start", ["start", "starting"])),
                S("My parents are coming for dinner on Sunday.", "Mes parents viennent dîner dimanche.", ["my parents", "are coming", "for dinner", "on Sunday"], ["On Sunday my parents are coming for dinner."], ("are coming", ARR, "C'est convenu avec eux."), ("are coming", "come", ["come", "comes"]), SECOND),
            ],
            {"prompt": "Pourquoi ce présent ?", "options": [ARR, TIMETABLE, NOW_PC]},
        ),
        L(
            "Choisir : will, going to ou présent continu ?",
            R(
                "Les trois futurs ensemble.",
                [
                    "will : décision sur le moment, promesse, offre, prévision.",
                    "going to : projet décidé avant, ou ce qu'on voit venir.",
                    "présent continu : un rendez-vous fixé avec quelqu'un.",
                ],
                [["I'm tired. I think I'll go to bed.", "Je suis fatigué. Je crois que je vais aller me coucher."], ["We're having a party on Saturday.", "On fait une fête samedi."]],
            ),
            [
                S("I'm tired. I think I'll go to bed.", "Je suis fatigué. Je crois que je vais aller me coucher.", ["I'm", "tired", "I", "think", "I'll", "go", "to bed"], focus=("I'll", WILL, "Je décide sur le moment."), blank=("go", "go", ["going", "to go"])),
                S("I'm seeing the dentist tomorrow morning.", "Je vais chez le dentiste demain matin (j'ai rendez-vous).", ["I'm seeing", "the dentist", "tomorrow morning"], focus=("I'm seeing", ARR, "Un rendez-vous."), blank=("I'm seeing", "see", ["I see", "I seeing"]), alt=["I'm going to the dentist tomorrow morning.", "I'm going to see the dentist tomorrow morning."]),
                S("He's going to sell his flat.", "Il va vendre son appartement (c'est décidé).", ["he's", "going to", "sell", "his flat"], focus=("going to", GOING, "C'est décidé."), blank=("sell", "sell", ["selling", "sold"])),
                S("Wait, I'll carry that for you.", "Attends, je vais te porter ça.", ["wait", "I'll", "carry", "that", "for you"], focus=("I'll", WILL, "Une offre, sur le moment."), blank=("carry", "carry", ["carrying", "to carry"])),
                S("Careful, the glass is going to fall!", "Attention, le verre va tomber !", ["careful", "the glass", "is going to", "fall"], focus=("going to", GOING, "On le voit venir."), blank=("is going to", "be going to", ["will to", "goes to"])),
                S("We're having a party on Saturday. Do you want to come?", "On fait une fête samedi. Tu veux venir ?", ["we're having", "a party", "on Saturday", "do", "you", "want", "to come"], focus=("we're having", ARR, "C'est organisé."), blank=("we're having", "have", ["we have", "we having"])),
                S("One day, people will live on Mars.", "Un jour, les gens vivront sur Mars.", ["one day", "people", "will live", "on Mars"], ["People will live on Mars one day."], ("will live", WILL, "Une prévision."), ("will live", "live", ["live", "are living"]), SECOND),
            ],
            {"prompt": "Quel futur, et pourquoi ?", "options": [WILL, GOING, ARR]},
        ),
    ],
}

# ---------------------------------------------------------------- Unit 7: used to, would, be used to
USED = "used to : avant, plus maintenant"
USUALLY = "usually : d'habitude, aujourd'hui"
ONCE = "prétérit : une seule fois"
WOULD_OK = "une action répétée : would ou used to"
STATE_ONLY = "un état : used to seulement"
BEUSED = "be used to : être habitué à"
GETUSED = "get used to : s'habituer à"

unit7 = {
    "title": "used to, would, be used to",
    "level": "B1",
    "hint": "Ce qu'on faisait avant (used to, would) et ce dont on a l'habitude (be used to) : trois sens à ne pas confondre.",
    "lessons": [
        L(
            "used to : avant, mais plus maintenant",
            R(
                "used to + verbe : une habitude ou un état du passé qui n'existe plus.",
                [
                    "I used to play the piano : avant, je jouais du piano (plus maintenant).",
                    "Négation et question : didn't use to, Did you use to…? (sans d).",
                    "Pas de présent : pour aujourd'hui, on dit usually.",
                ],
                [["I used to play the piano.", "Avant, je jouais du piano."], ["There used to be a cinema here.", "Avant, il y avait un cinéma ici."]],
            ),
            [
                S("I used to play the piano.", "Avant, je jouais du piano.", ["I", "used to", "play", "the piano"], focus=("used to", USED, "Avant, plus maintenant."), blank=("play", "play", ["played", "playing"])),
                S("We used to live in a small village.", "Avant, nous habitions dans un petit village.", ["we", "used to", "live", "in a small village"], focus=("used to", USED, "Avant, plus maintenant."), blank=("live", "live", ["living", "lived"])),
                S("She didn't use to like coffee.", "Avant, elle n'aimait pas le café.", ["she", "didn't", "use to", "like", "coffee"], focus=("use to", USED, "Après didn't : use to, sans d."), blank=("use to", "used to, après didn't", ["used to", "uses to"]), alt=["She never used to like coffee."]),
                S("Did you use to have long hair?", "Avant, tu avais les cheveux longs ?", ["did", "you", "use to", "have", "long hair"], focus=("use to", USED, "Après did : use to, sans d."), blank=("use to", "used to, après did", ["used to", "using to"])),
                S("I usually get up at seven.", "D'habitude, je me lève à sept heures.", ["I", "usually", "get up", "at seven"], focus=("usually", USUALLY, "Une habitude d'aujourd'hui."), blank=("get up", "get up", ["used to get up", "got up"]), meaning=["Avant, je me levais à sept heures.", "Hier, je me suis levé à sept heures."]),
                S("There used to be a cinema here.", "Avant, il y avait un cinéma ici.", ["there", "used to", "be", "a cinema", "here"], focus=("used to", USED, "Le cinéma n'existe plus."), blank=("be", "be", ["being", "was"]), meaning=["Il va y avoir un cinéma ici.", "Il y a un cinéma ici depuis longtemps."]),
                S("I went to Spain once.", "Je suis allé en Espagne une fois.", ["I", "went", "to Spain", "once"], focus=("went", ONCE, "Une seule fois : pas d'habitude, donc pas de used to."), blank=("went", "go", ["used to go", "have went"]), alt=["I've been to Spain once."]),
            ],
            {"prompt": "Que dit la phrase ?", "options": [USED, USUALLY, ONCE]},
        ),
        L(
            "would : les souvenirs d'habitudes",
            R(
                "would + verbe peut aussi raconter des habitudes du passé, surtout dans les souvenirs.",
                [
                    "Every summer we would go to the beach : chaque été, nous allions à la plage.",
                    "would seulement pour des actions répétées, pas pour des états : I used to have a dog (pas I would have a dog).",
                    "Dans un récit, on commence souvent par used to, puis on continue avec would.",
                ],
                [["Every summer we would go to the beach.", "Chaque été, nous allions à la plage."], ["I used to have a dog called Max.", "Avant, j'avais un chien qui s'appelait Max."]],
            ),
            [
                S("Every summer we would go to the beach.", "Chaque été, nous allions à la plage.", ["every summer", "we", "would", "go", "to the beach"], ["We would go to the beach every summer."], ("would", WOULD_OK, "Une action répétée chaque été."), ("go", "go", ["went", "going"]), SECOND, ["Every summer we used to go to the beach.", "Every summer we went to the beach."]),
                S("I used to have a dog called Max.", "Avant, j'avais un chien qui s'appelait Max.", ["I", "used to", "have", "a dog", "called Max"], focus=("used to", STATE_ONLY, "Avoir un chien : un état, donc used to, pas would."), blank=("used to", "use to", ["would", "was used to"]), alt=["I had a dog called Max."]),
                S("My grandfather would tell us stories every evening.", "Mon grand-père nous racontait des histoires tous les soirs.", ["my grandfather", "would", "tell", "us", "stories", "every evening"], focus=("would", WOULD_OK, "Une action répétée chaque soir."), blank=("tell", "tell", ["told", "telling"]), alt=["My grandfather used to tell us stories every evening."]),
                S("She used to be very shy.", "Avant, elle était très timide.", ["she", "used to", "be", "very shy"], focus=("used to", STATE_ONLY, "Être timide : un état."), blank=("used to", "use to", ["would", "uses to"])),
                S("On Sundays we would have lunch at my aunt's.", "Le dimanche, nous déjeunions chez ma tante.", ["on Sundays", "we", "would", "have lunch", "at my aunt's"], ["We would have lunch at my aunt's on Sundays."], ("would", WOULD_OK, "Une action répétée chaque dimanche."), ("have lunch", "have lunch", ["had lunch", "having lunch"]), SECOND, ["On Sundays we used to have lunch at my aunt's.", "On Sundays we had lunch at my aunt's."]),
                S("We used to live near the sea.", "Avant, nous habitions près de la mer.", ["we", "used to", "live", "near the sea"], focus=("used to", STATE_ONLY, "Habiter quelque part : un état."), blank=("used to", "use to", ["would", "are used to"])),
                S("He would always arrive late.", "Il arrivait toujours en retard.", ["he", "would", "always", "arrive", "late"], focus=("would", WOULD_OK, "Une action répétée."), blank=("arrive", "arrive", ["arrived", "arriving"]), alt=["He always used to arrive late.", "He always arrived late."]),
            ],
            {"prompt": "would possible ici ?", "options": [WOULD_OK, STATE_ONLY]},
        ),
        L(
            "be used to : avoir l'habitude de",
            R(
                "be used to + nom ou verbe en -ing : être habitué à.",
                [
                    "I'm used to the cold. She's used to getting up early.",
                    "get used to : s'habituer à : You'll get used to it.",
                    "Ne pas confondre : I used to work at night (avant, je travaillais de nuit) / I'm used to working at night (j'ai l'habitude).",
                ],
                [["I'm used to working at night.", "J'ai l'habitude de travailler de nuit."], ["I used to work at night.", "Avant, je travaillais de nuit."]],
            ),
            [
                S("I'm used to the cold.", "J'ai l'habitude du froid.", ["I'm", "used to", "the cold"], focus=("used to", BEUSED, "I'm used to : je suis habitué."), meaning=["Avant, j'avais froid.", "Je n'aime pas le froid."]),
                S("She's used to getting up early.", "Elle a l'habitude de se lever tôt.", ["she's", "used to", "getting up", "early"], focus=("used to", BEUSED, "She's used to + -ing."), blank=("getting up", "get up", ["get up", "got up"])),
                S("I used to work at night.", "Avant, je travaillais de nuit.", ["I", "used to", "work", "at night"], focus=("used to", USED, "Sans be : avant, plus maintenant."), blank=("work", "work", ["working", "worked"]), meaning=["J'ai l'habitude de travailler de nuit.", "Je vais travailler de nuit."]),
                S("I'm used to working at night.", "J'ai l'habitude de travailler de nuit.", ["I'm", "used to", "working", "at night"], focus=("used to", BEUSED, "Avec be : être habitué, suivi de -ing."), blank=("working", "work", ["work", "worked"]), meaning=["Avant, je travaillais de nuit.", "Je n'aime pas travailler de nuit."]),
                S("We're getting used to our new flat.", "Nous nous habituons à notre nouvel appartement.", ["we're", "getting used to", "our new flat"], focus=("getting used to", GETUSED, "Get used to : s'habituer, petit à petit.")),
                S("He isn't used to driving on the left.", "Il n'a pas l'habitude de conduire à gauche.", ["he", "isn't", "used to", "driving", "on the left"], focus=("used to", BEUSED, "Isn't used to : pas habitué."), blank=("driving", "drive", ["drive", "drove"])),
                S("You'll get used to it.", "Tu t'y habitueras.", ["you'll", "get used to", "it"], focus=("get used to", GETUSED, "Get used to : s'habituer.")),
            ],
            {"prompt": "Quel sens ?", "options": [USED, BEUSED, GETUSED]},
        ),
    ],
}

# ---------------------------------------------------------------- Unit 8: past modals
SHOULD = "should have : aurait dû"
NOW_SHOULD = "should : un conseil pour maintenant"
COULD = "could have : aurait pu"
COULDNT = "couldn't have : c'était impossible"
MUST = "must have : c'est sûrement arrivé"
CANT = "can't have : ce n'est sûrement pas arrivé"
HADTO = "had to : a été obligé"
MIGHT = "might / may have : c'est peut-être arrivé"

unit8 = {
    "title": "Les modaux au passé",
    "level": "B2",
    "hint": "should have, could have, must have, might have : regretter, reprocher, supposer ce qui s'est passé.",
    "lessons": [
        L(
            "should have : un regret, un reproche",
            R(
                "should have + participe : ce qu'on aurait dû faire, et qu'on n'a pas fait.",
                [
                    "I should have called you : j'aurais dû t'appeler.",
                    "shouldn't have : on n'aurait pas dû : You shouldn't have said that.",
                    "À l'oral : should've (et jamais should of).",
                ],
                [["I should have called you.", "J'aurais dû t'appeler."], ["You shouldn't have said that.", "Tu n'aurais pas dû dire ça."]],
            ),
            [
                S("I should have called you.", "J'aurais dû t'appeler.", ["I", "should have", "called", "you"], focus=("should have", SHOULD, "Un regret : je ne l'ai pas fait."), blank=("called", "call", ["call", "calling"])),
                S("You shouldn't have said that.", "Tu n'aurais pas dû dire ça.", ["you", "shouldn't have", "said", "that"], focus=("shouldn't have", SHOULD, "Un reproche : tu l'as dit."), blank=("said", "say", ["say", "sayed"])),
                S("We should have left earlier.", "Nous aurions dû partir plus tôt.", ["we", "should have", "left", "earlier"], focus=("should have", SHOULD, "Un regret."), blank=("left", "leave", ["leave", "leaved"]), meaning=["Nous sommes partis trop tôt.", "Nous devons partir plus tôt."]),
                S("She should have taken an umbrella.", "Elle aurait dû prendre un parapluie.", ["she", "should have", "taken", "an umbrella"], focus=("should have", SHOULD, "Elle ne l'a pas pris."), blank=("taken", "take", ["took", "take"])),
                S("You should call her.", "Tu devrais l'appeler.", ["you", "should", "call", "her"], focus=("should", NOW_SHOULD, "Sans have : un conseil pour maintenant."), blank=("call", "call", ["called", "calling"])),
                S("They shouldn't have eaten so much.", "Ils n'auraient pas dû manger autant.", ["they", "shouldn't have", "eaten", "so much"], focus=("shouldn't have", SHOULD, "Ils ont trop mangé."), blank=("eaten", "eat", ["ate", "eat"])),
                S("I should have studied more for the exam.", "J'aurais dû réviser davantage pour l'examen.", ["I", "should have", "studied", "more", "for the exam"], focus=("should have", SHOULD, "Un regret."), blank=("studied", "study", ["study", "studyed"]), meaning=["J'ai beaucoup révisé pour l'examen.", "Je dois réviser davantage pour l'examen."], alt=["I should have revised more for the exam."]),
            ],
            {"prompt": "Que dit should ici ?", "options": [SHOULD, NOW_SHOULD]},
        ),
        L(
            "could have : c'était possible",
            R(
                "could have + participe : quelque chose était possible, mais ne s'est pas produit.",
                [
                    "You could have told me! : tu aurais pu me le dire !",
                    "It could have been worse : ça aurait pu être pire.",
                    "couldn't have : c'était impossible : I couldn't have done it without you.",
                ],
                [["You could have told me!", "Tu aurais pu me le dire !"], ["I couldn't have done it without you.", "Je n'aurais pas pu le faire sans toi."]],
            ),
            [
                S("You could have told me!", "Tu aurais pu me le dire !", ["you", "could have", "told", "me"], focus=("could have", COULD, "C'était possible, tu ne l'as pas fait."), blank=("told", "tell", ["tell", "telled"])),
                S("It could have been worse.", "Ça aurait pu être pire.", ["it", "could have", "been", "worse"], focus=("could have", COULD, "Possible, mais ça n'est pas arrivé."), blank=("been", "be", ["be", "was"])),
                S("I couldn't have done it without you.", "Je n'aurais pas pu le faire sans toi.", ["I", "couldn't have", "done", "it", "without you"], focus=("couldn't have", COULDNT, "Sans toi, c'était impossible."), blank=("done", "do", ["did", "do"])),
                S("We could have won the match.", "Nous aurions pu gagner le match.", ["we", "could have", "won", "the match"], focus=("could have", COULD, "Possible, mais nous avons perdu."), blank=("won", "win", ["win", "winned"]), meaning=["Nous avons gagné le match.", "Nous aurions dû perdre le match."]),
                S("You should have asked for help.", "Tu aurais dû demander de l'aide.", ["you", "should have", "asked", "for help"], focus=("should have", SHOULD, "Un reproche : il fallait le faire."), blank=("asked", "ask", ["ask", "asking"])),
                S("He could have died in that accident.", "Il aurait pu mourir dans cet accident.", ["he", "could have", "died", "in that accident"], focus=("could have", COULD, "Possible, mais il a survécu."), blank=("died", "die", ["die", "dead"])),
                S("She couldn't have known the answer.", "Elle n'aurait pas pu connaître la réponse.", ["she", "couldn't have", "known", "the answer"], focus=("couldn't have", COULDNT, "C'était impossible pour elle."), blank=("known", "know", ["knew", "know"]), alt=["She can't have known the answer."]),
            ],
            {"prompt": "Que dit le modal ?", "options": [COULD, COULDNT, SHOULD]},
        ),
        L(
            "must have et can't have : une déduction sûre",
            R(
                "must have + participe : une déduction presque sûre sur le passé : « il a dû… ».",
                [
                    "The streets are wet. It must have rained.",
                    "can't have (ou couldn't have) : c'est sûrement faux : He can't have seen us, it was too dark.",
                    "Attention : « il a dû partir » peut vouloir dire « il a été obligé » (he had to leave) ou « il est sûrement parti » (he must have left).",
                ],
                [["The streets are wet. It must have rained.", "Les rues sont mouillées. Il a dû pleuvoir."], ["I had to leave early.", "J'ai été obligé de partir tôt."]],
            ),
            [
                S("The streets are wet. It must have rained.", "Les rues sont mouillées. Il a dû pleuvoir.", ["the streets", "are", "wet", "it", "must have", "rained"], focus=("must have", MUST, "Les rues mouillées : c'est sûrement arrivé."), blank=("rained", "rain", ["rain", "raining"])),
                S("He can't have seen us, it was too dark.", "Il n'a pas pu nous voir, il faisait trop sombre.", ["he", "can't have", "seen", "us", "it", "was", "too dark"], focus=("can't have", CANT, "Trop sombre : sûrement pas."), blank=("seen", "see", ["saw", "see"]), alt=["He couldn't have seen us, it was too dark."]),
                S("She must have forgotten our meeting.", "Elle a dû oublier notre rendez-vous.", ["she", "must have", "forgotten", "our meeting"], focus=("must have", MUST, "Une déduction : elle a sûrement oublié."), blank=("forgotten", "forget", ["forgot", "forget"]), meaning=["Elle a été obligée d'annuler notre rendez-vous.", "Elle n'a sûrement pas oublié notre rendez-vous."]),
                S("I had to leave early.", "J'ai été obligé de partir tôt.", ["I", "had to", "leave", "early"], focus=("had to", HADTO, "Une obligation, pas une déduction."), blank=("had to", "have to", ["must have", "must"]), meaning=["J'ai sûrement dû partir tôt (je ne m'en souviens pas).", "Je dois partir tôt."]),
                S("You must have been tired after the trip.", "Tu as dû être fatigué après le voyage.", ["you", "must have", "been", "tired", "after the trip"], focus=("must have", MUST, "Une déduction."), blank=("been", "be", ["be", "was"])),
                S("They can't have finished already!", "Ils ne peuvent pas avoir déjà fini !", ["they", "can't have", "finished", "already"], focus=("can't have", CANT, "Sûrement pas : c'est trop tôt."), blank=("finished", "finish", ["finish", "finishing"]), alt=["They couldn't have finished already!"]),
                S("He must have left; his coat isn't here.", "Il a dû partir : son manteau n'est plus là.", ["he", "must have", "left", "his coat", "isn't", "here"], focus=("must have", MUST, "Le manteau n'est plus là : une déduction."), blank=("left", "leave", ["leave", "leaved"]), alt=["He must have left; his coat isn't here anymore."]),
            ],
            {"prompt": "Que dit le modal ?", "options": [MUST, CANT, HADTO]},
        ),
        L(
            "might have, may have : peut-être",
            R(
                "might have / may have + participe : c'est peut-être arrivé, on n'est pas sûr.",
                [
                    "She might have missed the bus : elle a peut-être raté le bus.",
                    "might not have : peut-être pas.",
                    "Du plus probable au moins probable : must have (sûrement) > might / may have (peut-être) > can't have (sûrement pas).",
                ],
                [["She might have missed the bus.", "Elle a peut-être raté le bus."], ["They must have gone home.", "Ils sont sûrement rentrés chez eux."]],
            ),
            [
                S("She might have missed the bus.", "Elle a peut-être raté le bus.", ["she", "might have", "missed", "the bus"], focus=("might have", MIGHT, "Peut-être : on n'est pas sûr."), blank=("missed", "miss", ["miss", "missing"]), alt=["Maybe she missed the bus.", "She may have missed the bus."]),
                S("I may have left my phone at work.", "J'ai peut-être laissé mon téléphone au travail.", ["I", "may have", "left", "my phone", "at work"], focus=("may have", MIGHT, "Peut-être."), blank=("left", "leave", ["leave", "leaved"]), alt=["Maybe I left my phone at work.", "I might have left my phone at work."]),
                S("He might not have heard you.", "Il ne t'a peut-être pas entendu.", ["he", "might not have", "heard", "you"], focus=("might not have", MIGHT, "Peut-être pas."), blank=("heard", "hear", ["hear", "heared"]), meaning=["Il ne t'a sûrement pas entendu.", "Il aurait dû t'entendre."], alt=["Maybe he didn't hear you.", "He may not have heard you."]),
                S("They must have gone home.", "Ils sont sûrement rentrés chez eux.", ["they", "must have", "gone", "home"], focus=("must have", MUST, "Sûrement."), blank=("gone", "go", ["went", "go"])),
                S("You can't have lost it, I gave it to you a minute ago.", "Tu ne peux pas l'avoir perdu, je te l'ai donné il y a une minute.", ["you", "can't have", "lost", "it", "I", "gave", "it", "to you", "a minute ago"], focus=("can't have", CANT, "Sûrement pas : c'était il y a une minute."), blank=("lost", "lose", ["lose", "losed"]), alt=["You couldn't have lost it, I gave it to you a minute ago."]),
                S("We might have taken the wrong road.", "Nous nous sommes peut-être trompés de route.", ["we", "might have", "taken", "the wrong road"], focus=("might have", MIGHT, "Peut-être."), blank=("taken", "take", ["took", "take"]), alt=["Maybe we took the wrong road.", "We may have taken the wrong road."]),
                S("The letter may have arrived yesterday.", "La lettre est peut-être arrivée hier.", ["the letter", "may have", "arrived", "yesterday"], focus=("may have", MIGHT, "Peut-être."), blank=("arrived", "arrive", ["arrive", "arriving"]), alt=["Maybe the letter arrived yesterday.", "The letter might have arrived yesterday."]),
            ],
            {"prompt": "Quel degré de certitude ?", "options": [MUST, MIGHT, CANT]},
        ),
        L(
            "Mélange : regretter, supposer, reprocher",
            R(
                "Les modaux au passé ensemble : modal + have + participe.",
                [
                    "should have : aurait dû (regret, reproche).",
                    "could have : aurait pu (possible, pas arrivé).",
                    "must have : sûrement ; might have : peut-être ; can't have : sûrement pas.",
                ],
                [["You should have seen his face!", "Tu aurais dû voir sa tête !"], ["Someone must have taken my umbrella.", "Quelqu'un a dû prendre mon parapluie."]],
            ),
            [
                S("You should have seen his face!", "Tu aurais dû voir sa tête !", ["you", "should have", "seen", "his face"], focus=("should have", SHOULD, "Dommage que tu ne l'aies pas vu."), blank=("seen", "see", ["saw", "see"])),
                S("It could have been a disaster.", "Ça aurait pu être une catastrophe.", ["it", "could have", "been", "a disaster"], focus=("could have", COULD, "Possible, pas arrivé."), blank=("been", "be", ["be", "was"])),
                S("Someone must have taken my umbrella.", "Quelqu'un a dû prendre mon parapluie.", ["someone", "must have", "taken", "my umbrella"], focus=("must have", MUST, "Une déduction sûre."), blank=("taken", "take", ["took", "take"]), meaning=["Quelqu'un aurait dû prendre mon parapluie.", "Quelqu'un a peut-être pris mon parapluie."]),
                S("She might have gone to the gym.", "Elle est peut-être allée à la salle de sport.", ["she", "might have", "gone", "to the gym"], focus=("might have", MIGHT, "Peut-être."), blank=("gone", "go", ["went", "go"]), alt=["Maybe she went to the gym.", "She may have gone to the gym."]),
                S("He can't have written this, he doesn't speak French.", "Il n'a pas pu écrire ça, il ne parle pas français.", ["he", "can't have", "written", "this", "he", "doesn't speak", "French"], focus=("can't have", CANT, "Sûrement pas."), blank=("written", "write", ["wrote", "write"]), alt=["He couldn't have written this, he doesn't speak French."]),
                S("We shouldn't have bought such a big car.", "Nous n'aurions pas dû acheter une si grosse voiture.", ["we", "shouldn't have", "bought", "such a big car"], focus=("shouldn't have", SHOULD, "Un regret."), blank=("bought", "buy", ["buy", "buyed"])),
                S("You could have hurt yourself!", "Tu aurais pu te faire mal !", ["you", "could have", "hurt", "yourself"], focus=("could have", COULD, "Possible, pas arrivé."), blank=("hurt", "hurt", ["hurted", "hurting"]), meaning=["Tu t'es fait mal !", "Tu aurais dû te faire mal !"]),
            ],
            {"prompt": "Que dit le modal ?", "options": [SHOULD, COULD, MUST, MIGHT, CANT]},
        ),
    ],
}

# ---------------------------------------------------------------- Unit 9: mixed stories
PAST9 = "prétérit"
PASTC9 = "prétérit continu"
PP9 = "present perfect"
PPF9 = "past perfect"
PS9 = "présent simple"
PC9 = "présent continu"

unit9 = {
    "title": "Récits mélangés",
    "level": "B1",
    "hint": "Tous les temps ensemble : raconter, décrire, annoncer, prévoir.",
    "lessons": [
        L(
            "Raconter ses vacances",
            R(
                "Un récit de vacances mélange plusieurs temps.",
                [
                    "Ce qui s'est passé : prétérit. Le décor : prétérit continu.",
                    "Ce qui s'était passé avant : past perfect.",
                    "Ce qui compte encore maintenant : present perfect.",
                ],
                [["Last summer we went to Greece.", "L'été dernier, nous sommes allés en Grèce."], ["We've decided to go back next year.", "Nous avons décidé d'y retourner l'an prochain."]],
            ),
            [
                S("Last summer we went to Greece.", "L'été dernier, nous sommes allés en Grèce.", ["last summer", "we", "went", "to Greece"], ["We went to Greece last summer."], ("went", PAST9, "Last summer : prétérit."), ("went", "go", ["have gone", "were going"]), SECOND),
                S("We had never been there before.", "Nous n'y étions jamais allés avant.", ["we", "had", "never", "been", "there", "before"], focus=("been", PPF9, "Avant ce voyage : past perfect."), blank=("been", "be", ["was", "gone"])),
                S("One day, while we were swimming, we saw a dolphin.", "Un jour, pendant que nous nagions, nous avons vu un dauphin.", ["one day", "while", "we", "were swimming", "we", "saw", "a dolphin"], ["One day we saw a dolphin while we were swimming.", "We saw a dolphin one day while we were swimming."], focus=("were swimming", PASTC9, "Le décor : nous nagions."), blank=("saw", "see", ["were seeing", "have seen"])),
                S("The hotel was lovely and the food was delicious.", "L'hôtel était charmant et la nourriture délicieuse.", ["the hotel", "was", "lovely", "and", "the food", "was", "delicious"], focus=("was", PAST9, "Une description du passé : prétérit."), alt=["The hotel was charming and the food was delicious."]),
                S("I've already looked at the photos a hundred times.", "J'ai déjà regardé les photos cent fois.", ["I've", "already", "looked at", "the photos", "a hundred times"], focus=("looked at", PP9, "Already, jusqu'à maintenant."), blank=("looked at", "look at", ["look at", "was looking at"])),
                S("We've decided to go back next year.", "Nous avons décidé d'y retourner l'an prochain.", ["we've", "decided", "to go back", "next year"], focus=("decided", PP9, "Une décision qui compte maintenant."), blank=("decided", "decide", ["decide", "deciding"])),
                S("When we got home, the cat had broken a vase.", "Quand nous sommes rentrés, le chat avait cassé un vase.", ["when", "we", "got", "home", "the cat", "had broken", "a vase"], ["The cat had broken a vase when we got home."], ("had broken", PPF9, "Avant notre retour."), ("had broken", "break", ["broke", "has broken"]), SUB_FIRST),
            ],
            {"prompt": "Quel temps ?", "options": [PAST9, PASTC9, PP9, PPF9]},
        ),
        L(
            "Une histoire",
            R(
                "Une histoire écrite : le décor au continu, les actions au prétérit, les retours en arrière au past perfect.",
                [
                    "Le décor : Snow was falling.",
                    "Les actions : Suddenly she heard a noise.",
                    "Le retour en arrière : Someone had followed her.",
                ],
                [["Snow was falling and the streets were empty.", "La neige tombait et les rues étaient vides."], ["Someone had followed her from the station.", "Quelqu'un l'avait suivie depuis la gare."]],
            ),
            [
                S("It was a cold winter evening.", "C'était une froide soirée d'hiver.", ["it", "was", "a cold winter evening"], focus=("was", PAST9, "Une description du passé.")),
                S("Snow was falling and the streets were empty.", "La neige tombait et les rues étaient vides.", ["snow", "was falling", "and", "the streets", "were", "empty"], focus=("was falling", PASTC9, "Le décor."), blank=("was falling", "fall", ["fell", "had fallen"])),
                S("Anna was walking home from work.", "Anna rentrait du travail à pied.", ["Anna", "was walking", "home", "from work"], focus=("was walking", PASTC9, "Le décor : une action en cours."), blank=("was walking", "walk", ["walked", "had walked"])),
                S("Suddenly she heard a noise behind her.", "Soudain, elle a entendu un bruit derrière elle.", ["suddenly", "she", "heard", "a noise", "behind her"], ["She suddenly heard a noise behind her."], focus=("heard", PAST9, "Suddenly : l'histoire avance."), blank=("heard", "hear", ["was hearing", "had heard"])),
                S("She turned around, but nobody was there.", "Elle s'est retournée, mais il n'y avait personne.", ["she", "turned around", "but", "nobody", "was", "there"], focus=("turned around", PAST9, "Une action."), blank=("turned around", "turn around", ["was turning around", "had turned around"]), alt=["She turned around, but there was nobody there."]),
                S("Someone had followed her from the station.", "Quelqu'un l'avait suivie depuis la gare.", ["someone", "had followed", "her", "from the station"], focus=("had followed", PPF9, "Un retour en arrière."), blank=("had followed", "follow", ["followed", "was following"]), alt=["Someone had been following her from the station."]),
                S("She started to run and didn't stop until she reached her door.", "Elle s'est mise à courir et ne s'est pas arrêtée avant d'atteindre sa porte.", ["she", "started", "to run", "and", "didn't stop", "until", "she", "reached", "her door"], focus=("reached", PAST9, "L'histoire avance."), blank=("reached", "reach", ["reaches", "was reaching"]), alt=["She started running and didn't stop until she reached her door."]),
            ],
            {"prompt": "Quel temps ?", "options": [PAST9, PASTC9, PPF9]},
        ),
        L(
            "Projets et prévisions",
            R(
                "Parler de l'avenir avec tous les futurs.",
                [
                    "Un rendez-vous ou un départ fixé : présent continu.",
                    "Un horaire : présent simple.",
                    "Un projet : going to. Une prévision, une promesse : will.",
                ],
                [["I'm leaving for Australia next month.", "Je pars pour l'Australie le mois prochain."], ["Don't worry, I'll write to you every week.", "Ne t'inquiète pas, je t'écrirai toutes les semaines."]],
            ),
            [
                S("I'm leaving for Australia next month.", "Je pars pour l'Australie le mois prochain.", ["I'm leaving", "for Australia", "next month"], ["Next month I'm leaving for Australia."], ("I'm leaving", ARR, "Le départ est fixé."), ("I'm leaving", "leave", ["I leaving", "I'll leaving"]), SECOND),
                S("My flight leaves at ten in the morning.", "Mon vol part à dix heures du matin.", ["my flight", "leaves", "at ten", "in the morning"], focus=("leaves", TIMETABLE, "Un horaire."), blank=("leaves", "leave", ["leave", "leaving"])),
                S("I'm going to work on a farm for a year.", "Je vais travailler dans une ferme pendant un an.", ["I'm going to", "work", "on a farm", "for a year"], focus=("going to", GOING, "Un projet."), blank=("work", "work", ["working", "worked"])),
                S("I think it will be an amazing experience.", "Je pense que ce sera une expérience incroyable.", ["I", "think", "it", "will be", "an amazing experience"], focus=("will be", WILL, "I think : une prévision."), blank=("will be", "be", ["is being", "be"]), alt=["I think it's going to be an amazing experience."]),
                S("My friends are having a goodbye party for me on Saturday.", "Mes amis organisent une fête d'adieu pour moi samedi.", ["my friends", "are having", "a goodbye party", "for me", "on Saturday"], focus=("are having", ARR, "C'est organisé."), blank=("are having", "have", ["have", "has"]), alt=["My friends are organising a goodbye party for me on Saturday.", "My friends are organizing a goodbye party for me on Saturday.", "My friends are throwing a goodbye party for me on Saturday."]),
                S("Don't worry, I'll write to you every week.", "Ne t'inquiète pas, je t'écrirai toutes les semaines.", ["don't worry", "I'll", "write", "to you", "every week"], focus=("I'll", WILL, "Une promesse."), blank=("write", "write", ["writing", "wrote"])),
                S("Look at all these bags! You're going to need a bigger suitcase.", "Regarde tous ces sacs ! Tu vas avoir besoin d'une plus grande valise.", ["look at", "all these bags", "you're going to", "need", "a bigger suitcase"], focus=("going to", GOING, "On le voit venir."), blank=("need", "need", ["needing", "needed"])),
            ],
            {"prompt": "Quel futur ?", "options": [WILL, GOING, ARR, TIMETABLE]},
        ),
        L(
            "Une conversation",
            R(
                "Dans une conversation, on passe sans cesse d'un temps à l'autre.",
                [
                    "Les nouvelles depuis la dernière fois : present perfect.",
                    "Ce qu'on fait en ce moment : présent continu ; ce qu'on fait en général : présent simple.",
                    "Quand c'est arrivé : prétérit.",
                ],
                [["Hi! I haven't seen you for ages!", "Salut ! Ça fait une éternité qu'on ne s'est pas vus !"], ["I started there two years ago.", "J'y ai commencé il y a deux ans."]],
            ),
            [
                S("Hi! I haven't seen you for ages!", "Salut ! Ça fait une éternité qu'on ne s'est pas vus !", ["hi", "I", "haven't seen", "you", "for ages"], focus=("haven't seen", PP9, "Depuis longtemps jusqu'à maintenant."), blank=("haven't seen", "not see", ["didn't see", "don't see"]), alt=["Hi! We haven't seen each other for ages!", "Hi! I haven't seen you in ages!"]),
                S("What are you doing these days?", "Qu'est-ce que tu fais en ce moment ?", ["what", "are", "you", "doing", "these days"], focus=("doing", PC9, "These days : la période actuelle."), blank=("doing", "do", ["do", "did"]), alt=["What are you doing at the moment?"]),
                S("I work in a bank now.", "Maintenant, je travaille dans une banque.", ["I", "work", "in a bank", "now"], ["Now I work in a bank."], focus=("work", PS9, "Son métier : une situation durable."), blank=("work", "work", ["works", "worked"])),
                S("I started there two years ago.", "J'y ai commencé il y a deux ans.", ["I", "started", "there", "two years ago"], focus=("started", PAST9, "Ago : prétérit."), blank=("started", "start", ["have started", "start"])),
                S("Have you moved house?", "Tu as déménagé ?", ["have", "you", "moved", "house"], focus=("moved", PP9, "Une nouvelle depuis la dernière fois."), blank=("moved", "move", ["move", "moving"]), alt=["Have you moved?"]),
                S("Yes, we bought a flat last spring.", "Oui, nous avons acheté un appartement au printemps dernier.", ["yes", "we", "bought", "a flat", "last spring"], focus=("bought", PAST9, "Last spring : prétérit."), blank=("bought", "buy", ["have bought", "buyed"]), alt=["Yes, we bought an apartment last spring."]),
                S("We're painting the living room this week.", "Cette semaine, nous peignons le salon.", ["we're painting", "the living room", "this week"], ["This week we're painting the living room."], ("we're painting", PC9, "Cette semaine : temporaire."), ("we're painting", "paint", ["we paint", "we painted"]), SECOND),
            ],
            {"prompt": "Quel temps ?", "options": [PS9, PC9, PP9, PAST9]},
        ),
    ],
}

TRACK = make_track(
    "en-temps",
    "Les temps",
    "Présent simple ou continu, prétérit, present perfect, le « depuis », le past perfect, le futur, used to et les modaux au passé, dans des phrases.",
    [unit1, unit2, unit3, unit4, unit5, unit6, unit7, unit8, unit9],
)
