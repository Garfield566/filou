# Mots outils : inventaire à valider

Ce document liste les mots fréquents à plusieurs usages, et pour chacun ses usages. **Rien n'est encore en exercice** :
les exercices seront écrits seulement après ta validation de cette liste.

| Langue | Mots gardés | Usages | Groupes à départager | Mots écartés |
| --- | --- | --- | --- | --- |
| Anglais | 50 | 175 | 8 | 47 |
| Allemand | 51 | 150 | 5 | 60 |

**Comment la liste a été faite.**
1. Un script (`scripts/usages/candidates.py`) a pris les 300 mots les plus fréquents de chaque langue (wordfreq) et gardé
   ceux qui ont au moins deux sens grammaticaux dans le Wiktionnaire, plus tes 30 mots imposés (et *weil*, pour le groupe
   *denn / weil / da*).
2. Deux agents ont rédigé les usages : libellé, explication, schéma, deux exemples traduits, niveau. Ils ont écarté les mots
   sans intérêt ici (articles, pronoms simples, noms), avec une raison.
3. Les exemples sont **provisoires** : rédigés à la main pour cette relecture. Ceux des exercices viendront de Tatoeba,
   classés par usage, comme prévu.

**Ce que tu peux faire en relisant.**
- Retirer ou ajouter un mot, fusionner ou séparer deux usages.
- Remplir la colonne « référence grammaire » (`grammarRef` dans `src/data/usages/<langue>.json`) : elle est vide exprès.

**Ajout après validation (7 novembre 2026).** *when* : usage « quand, lorsque (moment passé ou habituel) » (`time`), le plus courant, absent de la première liste. Il a été repéré pendant le classement des phrases Tatoeba.

**Limites.** Relecture faite par des agents IA, pas par un natif ni un enseignant. Les niveaux sont approximatifs.

Fichiers : `src/data/usages/en.json` et `src/data/usages/de.json`.

# Anglais

## Inventaire des mots outils — anglais

50 mots gardés (14 imposés), 175 usages, 47 mots écartés. À valider avant la création des exercices. Le champ « grammarRef » est laissé vide.

### Mots gardés

#### as (imposé) — rang 18 — conjonction, préposition, adverbe

| mot | usage | libellé | schéma | exemple | traduction | niveau |
|---|---|---|---|---|---|---|
| as | `time` | au moment où (temps) | as + sujet + verbe | Just as I was leaving the house, the phone rang. | Juste au moment où je quittais la maison, le téléphone a sonné. | B1 |
| | | | | As we walked into the room, everyone stopped talking. | Au moment où nous sommes entrés dans la pièce, tout le monde s'est tu. | |
| as | `cause` | comme, puisque (cause) | as + sujet + verbe, proposition principale | As it was raining, we decided to stay at home. | Comme il pleuvait, nous avons décidé de rester à la maison. | B1 |
| | | | | We took a taxi as we were already late for dinner. | Nous avons pris un taxi, car nous étions déjà en retard pour le dîner. | |
| as | `role` | en tant que, comme (fonction réelle) | as + (a/an) + nom | She works as a nurse in a large hospital in Leeds. | Elle travaille comme infirmière dans un grand hôpital de Leeds. | B1 |
| | | | | As your manager, I have to remind you of the rules. | En tant que responsable, je dois vous rappeler les règles. | |
| as | `comparison` | aussi… que (égalité) | as + adjectif/adverbe + as | My brother is as tall as my father now. | Mon frère est maintenant aussi grand que mon père. | B1 |
| | | | | She doesn't speak English as well as her sister does. | Elle ne parle pas anglais aussi bien que sa sœur. | |
| as | `manner` | comme (manière, + proposition) | as + sujet + verbe | Do it exactly as I showed you yesterday, please. | Fais-le exactement comme je te l'ai montré hier, s'il te plaît. | B2 |
| | | | | As you know, the meeting has been moved to Friday. | Comme vous le savez, la réunion a été déplacée à vendredi. | |
| as | `progression` | à mesure que | as + sujet + verbe (changement) | As she grew older, she became more patient with people. | À mesure qu'elle vieillissait, elle devenait plus patiente avec les gens. | B2 |
| | | | | Prices go up as demand increases during the summer months. | Les prix augmentent à mesure que la demande croît pendant les mois d'été. | |

- `time` (conj) : Introduit une action simultanée à une autre, souvent une action en cours (prétérit progressif).
- `cause` (conj) : Donne une cause connue ou évidente, souvent en tête de phrase. Plus soutenu que « because ».
- `role` (prep) : Indique un rôle, une fonction ou un statut que l'on a réellement. Ne pas confondre avec « like » (ressemblance).
- `comparison` (adv) : Comparatif d'égalité ; à la forme négative, « not as… as » signifie « pas aussi… que ».
- `manner` (conj) : « Comme » suivi d'un sujet et d'un verbe, en anglais soigné : de la manière dont, ainsi que.
- `progression` (conj) : Deux évolutions progressent ensemble ; souvent avec des comparatifs ou des verbes de changement.

#### like (imposé) — rang 42 — verbe, préposition, conjonction

| mot | usage | libellé | schéma | exemple | traduction | niveau |
|---|---|---|---|---|---|---|
| like | `verb` | aimer, apprécier (verbe) | like + nom / -ing / to + verbe ; would like | I really like walking along the river on Sunday mornings. | J'aime beaucoup me promener le long de la rivière le dimanche matin. | A2 |
| | | | | Would you like another cup of tea before you go? | Voulez-vous une autre tasse de thé avant de partir ? | |
| like | `similarity` | comme, semblable à (ressemblance) | like + nom / pronom | She looks just like her mother when she laughs. | Elle ressemble exactement à sa mère quand elle rit. | B1 |
| | | | | He swims like a fish, even in very cold water. | Il nage comme un poisson, même dans l'eau très froide. | |
| like | `what_like` | comment est… ? (description) | what + be + sujet + like? | What was the weather like during your holiday in Spain? | Quel temps a-t-il fait pendant tes vacances en Espagne ? | B1 |
| | | | | What is your new boss like? Is she friendly? | Comment est ta nouvelle patronne ? Elle est sympa ? | |
| like | `example` | comme, tel que (exemple) | nom + like + exemples | I love citrus fruits like oranges, lemons and grapefruit. | J'adore les agrumes, comme les oranges, les citrons et les pamplemousses. | B1 |
| | | | | Big cities like London and Paris are very expensive to live in. | Les grandes villes comme Londres et Paris coûtent très cher à habiter. | |
| like | `conj` | comme, comme si (+ proposition, familier) | like + sujet + verbe ; look/seem like + proposition | It looks like it's going to rain this afternoon. | On dirait qu'il va pleuvoir cet après-midi. | B2 |
| | | | | Nobody makes pasta like my grandmother used to. | Personne ne fait les pâtes comme ma grand-mère les faisait. | |

- `verb` (verb) : Verbe d'appréciation ; « would like » sert à exprimer poliment un souhait.
- `similarity` (prep) : Compare à quelque chose qu'on n'est pas : ressemblance, et non fonction réelle (voir « as »).
- `what_like` (prep) : « What is X like? » demande une description (caractère, aspect), pas ce que X aime.
- `example` (prep) : Introduit des exemples ; équivaut à « such as », plus soutenu.
- `conj` (conj) : Suivi d'un sujet et d'un verbe, « like » remplace « as » ou « as if » à l'oral ; à éviter dans un écrit soigné.

#### since (imposé) — rang 175 — préposition, conjonction, adverbe

| mot | usage | libellé | schéma | exemple | traduction | niveau |
|---|---|---|---|---|---|---|
| since | `time_point` | depuis (point de départ) | present perfect + since + date / événement / proposition | I have lived in this little town since 2015. | J'habite dans cette petite ville depuis 2015. | B1 |
| | | | | She hasn't called me since she moved to Canada. | Elle ne m'a pas appelé depuis qu'elle est partie au Canada. | |
| since | `cause` | puisque, étant donné que (cause) | since + sujet + verbe, proposition principale | Since you're here, you can help me with the dishes. | Puisque tu es là, tu peux m'aider à faire la vaisselle. | B1 |
| | | | | Since nobody answered, I left a message on the machine. | Comme personne ne répondait, j'ai laissé un message sur le répondeur. | |
| since | `adverb` | depuis (depuis lors, en fin de phrase) | … since / ever since / since then | He left in May and we haven't seen him since. | Il est parti en mai et nous ne l'avons pas revu depuis. | B2 |
| | | | | They met at university and have been friends ever since. | Ils se sont rencontrés à la fac et sont amis depuis. | |

- `time_point` (prep/conj) : Indique le point de départ d'une situation qui dure encore ; le verbe principal est au present perfect, pas au présent comme en français.
- `cause` (conj) : Donne une raison connue de l'interlocuteur, comme « as ». Aucun lien avec le temps.
- `adverb` (adv) : Employé seul, souvent en fin de phrase ou dans « ever since » : depuis ce moment-là.

#### for (imposé) — rang 9 — préposition, conjonction

| mot | usage | libellé | schéma | exemple | traduction | niveau |
|---|---|---|---|---|---|---|
| for | `duration` | pendant, depuis (durée) | for + durée | We stayed in Rome for two weeks last summer. | Nous sommes restés à Rome pendant deux semaines l'été dernier. | B1 |
| | | | | I've been waiting for you for over an hour! | Je t'attends depuis plus d'une heure ! | |
| for | `purpose` | pour (destinataire, usage) | for + nom / pronom ; what… for? | I bought these flowers for my mother's birthday. | J'ai acheté ces fleurs pour l'anniversaire de ma mère. | A2 |
| | | | | What do you usually use this old wooden box for? | À quoi te sert d'habitude cette vieille boîte en bois ? | |
| for | `for_to` | pour que (for + qqn + to) | for + objet + to + base verbale | It's too late for the children to go out now. | Il est trop tard pour que les enfants sortent maintenant. | B2 |
| | | | | The plan is for everyone to meet at the station. | Le plan, c'est que tout le monde se retrouve à la gare. | |
| for | `cause` | car (littéraire) | proposition, for + sujet + verbe | She said nothing, for she was afraid of his anger. | Elle ne dit rien, car elle avait peur de sa colère. | C1 |
| | | | | We hurried home, for the storm was getting closer. | Nous nous sommes dépêchés de rentrer, car l'orage approchait. | |

- `duration` (prep) : Indique une durée. Avec le present perfect, il traduit « depuis » + durée ; avec un temps passé, « pendant ».
- `purpose` (prep) : Indique à qui ou à quoi une chose est destinée. Pour un but exprimé par un verbe, on emploie plutôt « to + verbe ».
- `for_to` (prep) : Construction sans équivalent en français : « for + personne + to + verbe » remplace une subordonnée au subjonctif.
- `cause` (conj) : Conjonction de cause, soutenue ou littéraire, toujours après la proposition principale.

#### still (imposé) — rang 127 — adverbe, adjectif

| mot | usage | libellé | schéma | exemple | traduction | niveau |
|---|---|---|---|---|---|---|
| still | `continuation` | encore, toujours (continuité) | sujet + still + verbe ; be + still | Are you still working at the same bank? | Tu travailles toujours à la même banque ? | B1 |
| | | | | It was midnight and the kids were still awake. | Il était minuit et les enfants étaient encore réveillés. | |
| still | `concession` | pourtant, quand même | Still, + phrase ; but + sujet + still + verbe | The hotel was expensive. Still, it was worth every penny. | L'hôtel était cher. Pourtant, il valait chaque centime. | B2 |
| | | | | He trained hard but he still lost the final match. | Il s'est beaucoup entraîné, mais il a quand même perdu la finale. | |
| still | `motionless` | immobile, calme (adjectif) | be / keep / stand / sit + still | Please keep still while I take your photo. | Ne bouge pas, s'il te plaît, pendant que je prends ta photo. | B1 |
| | | | | The lake was perfectly still early in the morning. | Le lac était parfaitement calme tôt le matin. | |
| still | `comparative` | encore (+ comparatif) | still + comparatif / comparatif + still | The first test was hard, but the second was harder still. | Le premier test était difficile, mais le second l'était encore plus. | C1 |
| | | | | We need still more volunteers for the weekend event. | Il nous faut encore plus de bénévoles pour l'événement du week-end. | |

- `continuation` (adv) : Une situation passée continue au moment considéré. À la forme négative, il souligne l'impatience (« still haven't »).
- `concession` (adv) : Introduit un fait qui se maintient malgré ce qui précède ; en tête de phrase ou avant le verbe.
- `motionless` (adj) : Adjectif : sans mouvement, sans bruit. « Still water » désigne aussi l'eau plate.
- `comparative` (adv) : Renforce un comparatif, comme « even », dans un registre plus soutenu.

#### yet (imposé) — rang 269 — adverbe, conjonction

| mot | usage | libellé | schéma | exemple | traduction | niveau |
|---|---|---|---|---|---|---|
| yet | `not_yet` | pas encore (négation) | not + … + yet | I'm sorry, I haven't finished my homework yet. | Désolé, je n'ai pas encore fini mes devoirs. | B1 |
| | | | | The results aren't available yet, so please be patient. | Les résultats ne sont pas encore disponibles, alors soyez patients. | |
| yet | `question` | déjà ? (question neutre) | have + sujet + participe + … + yet? | Have you booked the tickets for the concert yet? | As-tu déjà réservé les billets pour le concert ? | B1 |
| | | | | Has the new manager arrived at the office yet? | Le nouveau directeur est-il déjà arrivé au bureau ? | |
| yet | `contrast` | et pourtant, mais (conjonction) | proposition, yet + proposition ; adjectif + yet + adjectif | The task was simple, yet nobody managed to finish it. | La tâche était simple, et pourtant personne n'a réussi à la terminer. | B2 |
| | | | | She is young yet surprisingly wise for her age. | Elle est jeune, mais étonnamment sage pour son âge. | |
| yet | `superlative` | jusqu'ici (+ superlatif) | superlatif + nom + yet | In my opinion, this is their best album yet. | À mon avis, c'est leur meilleur album jusqu'à présent. | B2 |
| | | | | It was the hottest day of the year yet. | C'était le jour le plus chaud de l'année jusqu'ici. | |
| yet | `again` | encore (yet again, yet another) | yet again / yet another + nom | The train was late yet again this morning. | Le train était encore une fois en retard ce matin. | B2 |
| | | | | They've announced yet another increase in electricity prices. | Ils ont annoncé une énième hausse des prix de l'électricité. | |

- `not_yet` (adv) : Dans une phrase négative, l'action attendue n'a pas eu lieu ; « yet » se place en fin de phrase.
- `question` (adv) : Dans une question, demande si l'action attendue a eu lieu, sans surprise (contrairement à « already »).
- `contrast` (conj) : Relie deux idées opposées ; plus fort et plus soutenu que « but ».
- `superlative` (adv) : Après un superlatif, signifie « jusqu'à présent ».
- `again` (adv) : Souligne une répétition, souvent avec agacement.

#### even (imposé) — rang 108 — adverbe, adjectif

| mot | usage | libellé | schéma | exemple | traduction | niveau |
|---|---|---|---|---|---|---|
| even | `emphasis` | même (renforcement) | even + mot mis en relief ; not even | Even my grandmother knows how to use a smartphone now. | Même ma grand-mère sait utiliser un smartphone maintenant. | B1 |
| | | | | He didn't even say goodbye when he left the party. | Il n'a même pas dit au revoir quand il a quitté la fête. | |
| even | `comparative` | encore (+ comparatif) | even + comparatif | The second film was even better than the first one. | Le deuxième film était encore meilleur que le premier. | B1 |
| | | | | It's even colder today than it was yesterday. | Il fait encore plus froid aujourd'hui qu'hier. | |
| even | `even_if` | même si (hypothèse) | even if + proposition | I'll go for a run even if it rains tomorrow. | J'irai courir même s'il pleut demain. | B1 |
| | | | | Even if you leave now, you won't catch the train. | Même si tu pars maintenant, tu n'auras pas le train. | |
| even | `even_though` | alors que, bien que (fait réel) | even though + proposition | Even though he was tired, he finished the report. | Même s'il était fatigué, il a fini le rapport. | B2 |
| | | | | She went to work even though she had a fever. | Elle est allée travailler alors qu'elle avait de la fièvre. | |
| even | `adjective` | pair ; égal, régulier (adjectif) | an even number ; be even | Two, four and six are all even numbers. | Deux, quatre et six sont tous des nombres pairs. | B2 |
| | | | | The two teams were fairly even throughout the match. | Les deux équipes étaient assez à égalité pendant tout le match. | |

- `emphasis` (adv) : Met en relief un élément surprenant ; se place avant le mot visé ou avant le verbe.
- `comparative` (adv) : Renforce un comparatif : « encore plus ».
- `even_if` (conj) : Introduit une hypothèse qui ne change rien à la conclusion.
- `even_though` (conj) : Introduit un fait réel qui contraste avec la principale ; plus fort que « although ».
- `adjective` (adj) : Adjectif : nombre pair, surface plane, ou scores à égalité.

#### so (imposé) — rang 33 — adverbe, conjonction

| mot | usage | libellé | schéma | exemple | traduction | niveau |
|---|---|---|---|---|---|---|
| so | `degree` | si, tellement (intensité) | so + adjectif/adverbe (+ that…) | The film was so boring that I fell asleep. | Le film était tellement ennuyeux que je me suis endormi. | B1 |
| | | | | Thank you so much for helping me with the move. | Merci beaucoup de m'avoir aidé pour le déménagement. | |
| so | `result` | donc, alors (conséquence) | proposition, so + proposition | It was getting late, so we decided to go home. | Il se faisait tard, donc nous avons décidé de rentrer. | B1 |
| | | | | The shop was closed, so I bought bread at the station. | La boutique était fermée, alors j'ai acheté du pain à la gare. | |
| so | `purpose` | pour que, afin de (but) | so (that) + sujet + can/could/would + verbe | Speak louder so that everyone at the back can hear you. | Parle plus fort pour que tout le monde au fond puisse t'entendre. | B2 |
| | | | | I left early so I wouldn't miss the first train. | Je suis parti tôt pour ne pas rater le premier train. | |
| so | `substitute` | que oui, le (reprise : I think so) | think / hope / suppose + so ; I don't think so | Is it going to rain tomorrow? I hope not, but I think so. | Il va pleuvoir demain ? J'espère que non, mais je crois que oui. | B1 |
| | | | | Will the shop be open on Sunday? I don't think so. | La boutique sera-t-elle ouverte dimanche ? Je ne crois pas. | |
| so | `so_do_i` | moi aussi (so + auxiliaire + sujet) | so + auxiliaire + sujet | I love Italian food. – So do I, especially pizza. | J'adore la cuisine italienne. – Moi aussi, surtout la pizza. | B1 |
| | | | | She was tired after the trip, and so was her husband. | Elle était fatiguée après le voyage, et son mari aussi. | |

- `degree` (adv) : Intensifie un adjectif ou un adverbe ; souvent suivi de « that » pour la conséquence.
- `result` (conj) : Introduit la conséquence de ce qui précède.
- `purpose` (conj) : « So (that) » exprime un but, généralement avec un modal (can, could, would).
- `substitute` (adv) : Remplace une proposition déjà dite après des verbes d'opinion ; la négation se fait sur le verbe.
- `so_do_i` (adv) : Reprend une affirmation pour dire qu'elle s'applique aussi à un autre, avec inversion de l'auxiliaire.

#### that (imposé) — rang 10 — déterminant, pronom, conjonction, adverbe

| mot | usage | libellé | schéma | exemple | traduction | niveau |
|---|---|---|---|---|---|---|
| that | `demonstrative` | ce…-là, cela (démonstratif) | that + nom ; that + verbe | Can you pass me that book on the top shelf? | Tu peux me passer ce livre-là sur l'étagère du haut ? | A2 |
| | | | | That was the best meal I've had in years. | C'était le meilleur repas que j'aie mangé depuis des années. | |
| that | `relative` | qui, que (relatif) | nom + that + proposition | The car that she bought last year has already broken down. | La voiture qu'elle a achetée l'an dernier est déjà tombée en panne. | B1 |
| | | | | Is this the train that goes to the airport? | Est-ce que c'est le train qui va à l'aéroport ? | |
| that | `complementizer` | que (après un verbe) | verbe + (that) + proposition | I think that you should apologise to your sister. | Je pense que tu devrais t'excuser auprès de ta sœur. | B1 |
| | | | | She told me that the meeting had been cancelled. | Elle m'a dit que la réunion avait été annulée. | |
| that | `degree` | si, aussi (intensité, familier) | (not) that + adjectif | To be honest, the exam wasn't that difficult after all. | Pour être honnête, l'examen n'était pas si difficile que ça. | B2 |
| | | | | I didn't know the city was that big. | Je ne savais pas que la ville était aussi grande. | |

- `demonstrative` (det/pron) : Désigne quelque chose d'éloigné dans l'espace ou le temps, ou ce qui vient d'être dit ; pluriel « those ».
- `relative` (pron) : Pronom relatif pour personnes ou choses, dans une relative déterminative ; omissible quand il est complément.
- `complementizer` (conj) : Introduit une complétive après un verbe ou un adjectif ; souvent omis à l'oral, jamais en français.
- `degree` (adv) : Devant un adjectif, surtout à la négative : « pas si… que ça ».

#### would (imposé) — rang 63 — auxiliaire modal

| mot | usage | libellé | schéma | exemple | traduction | niveau |
|---|---|---|---|---|---|---|
| would | `conditional` | conditionnel (-rais) | would + base verbale | I would buy a house by the sea if I were rich. | J'achèterais une maison au bord de la mer si j'étais riche. | B1 |
| | | | | It would be nice to see you again next week. | Ce serait bien de te revoir la semaine prochaine. | |
| would | `polite` | demande polie, souhait | Would you (mind)…? ; I would like… | Would you mind closing the window, please? It's cold. | Ça vous dérangerait de fermer la fenêtre, s'il vous plaît ? Il fait froid. | A2 |
| | | | | I would like a table for two near the window. | Je voudrais une table pour deux près de la fenêtre. | |
| would | `past_habit` | habitude passée (imparfait) | would + base verbale (contexte passé) | When I was a child, my father would read me stories. | Quand j'étais enfant, mon père me lisait des histoires. | B2 |
| | | | | Every summer we would spend a month at my aunt's farm. | Chaque été, nous passions un mois à la ferme de ma tante. | |
| would | `future_in_past` | futur dans le passé | verbe au passé + (that) + sujet + would + verbe | She said she would call me after the meeting. | Elle a dit qu'elle m'appellerait après la réunion. | B1 |
| | | | | I knew the plan would never work in real life. | Je savais que le plan ne marcherait jamais dans la réalité. | |
| would | `refusal` | refus obstiné (wouldn't) | sujet + wouldn't + base verbale | The car wouldn't start this morning, so I took the bus. | La voiture ne voulait pas démarrer ce matin, alors j'ai pris le bus. | B2 |
| | | | | I asked him several times, but he wouldn't tell me anything. | Je lui ai demandé plusieurs fois, mais il refusait de me dire quoi que ce soit. | |

- `conditional` (modal) : Forme le conditionnel, notamment dans la principale d'une phrase en « if » + prétérit.
- `polite` (modal) : Adoucit une demande ou un souhait ; « I'd like » = je voudrais.
- `past_habit` (modal) : Décrit une action répétée dans le passé, comme « used to », mais seulement pour des actions, pas des états.
- `future_in_past` (modal) : Concordance des temps : « will » devient « would » dans un récit ou au discours indirect.
- `refusal` (modal) : « Wouldn't » exprime qu'une personne ou une chose refusait de faire quelque chose.

#### get (imposé) — rang 61 — verbe

| mot | usage | libellé | schéma | exemple | traduction | niveau |
|---|---|---|---|---|---|---|
| get | `obtain` | obtenir, recevoir, acheter | get + nom | I got a letter from the bank this morning. | J'ai reçu une lettre de la banque ce matin. | A2 |
| | | | | Where did you get that lovely jacket? It suits you. | Où as-tu trouvé cette jolie veste ? Elle te va bien. | |
| get | `become` | devenir (changement d'état) | get + adjectif / comparatif | It gets dark very early here in winter. | Ici, il fait nuit très tôt en hiver. | B1 |
| | | | | Don't get angry, I was only joking with you. | Ne te fâche pas, je plaisantais seulement. | |
| get | `arrive` | arriver, se rendre (déplacement) | get + to + lieu / get home / get there | What time did you get home last night? | À quelle heure es-tu rentré hier soir ? | B1 |
| | | | | It takes about an hour to get to the airport. | Il faut environ une heure pour aller à l'aéroport. | |
| get | `causative` | faire faire (causatif) | get + objet + participe passé ; get + qqn + to + verbe | I need to get my hair cut before the wedding. | Je dois me faire couper les cheveux avant le mariage. | B2 |
| | | | | I finally got my brother to help me paint the kitchen. | J'ai enfin réussi à convaincre mon frère de m'aider à peindre la cuisine. | |
| get | `passive` | passif familier (get + participe) | get + participe passé | He got injured during the football match on Saturday. | Il s'est blessé pendant le match de foot samedi. | B2 |
| | | | | Our flight to Oslo got cancelled because of the snowstorm. | Notre vol pour Oslo a été annulé à cause de la tempête de neige. | |
| get | `understand` | comprendre, saisir (familier) | get + nom / what… | Sorry, I don't get the joke. Can you explain it? | Désolé, je ne comprends pas la blague. Tu peux l'expliquer ? | B2 |
| | | | | I didn't get what she said because of the noise. | Je n'ai pas saisi ce qu'elle a dit à cause du bruit. | |

- `obtain` (verb) : Avec un complément nom, « get » remplace de nombreux verbes précis selon le contexte.
- `become` (verb) : Suivi d'un adjectif, exprime un changement d'état ; se traduit souvent par un verbe pronominal.
- `arrive` (verb) : Suivi d'un lieu, indique l'arrivée ou le trajet ; « get home » sans préposition.
- `causative` (verb) : Faire réaliser une action par quelqu'un d'autre, ou persuader quelqu'un d'agir.
- `passive` (verb) : Remplace « be » au passif pour un événement soudain, souvent négatif.
- `understand` (verb) : À l'oral, « get » signifie comprendre une idée, une blague, une explication.

#### while (imposé) — rang 144 — conjonction, nom

| mot | usage | libellé | schéma | exemple | traduction | niveau |
|---|---|---|---|---|---|---|
| while | `simultaneity` | pendant que (simultanéité) | while + sujet + verbe (souvent -ing) | Someone stole my bag while I was waiting for the bus. | Quelqu'un m'a volé mon sac pendant que j'attendais le bus. | B1 |
| | | | | Can you watch the kids while I go to the shop? | Tu peux surveiller les enfants pendant que je vais au magasin ? | |
| while | `contrast` | alors que, tandis que (opposition) | while + proposition, proposition | While my sister loves sport, I prefer reading at home. | Alors que ma sœur adore le sport, moi je préfère lire à la maison. | B2 |
| | | | | Some people work best at night, while others need the morning. | Certains travaillent mieux la nuit, tandis que d'autres ont besoin du matin. | |
| while | `concession` | bien que, même si (concession) | While + proposition, proposition principale | While I understand your point, I can't agree with it. | Même si je comprends ton point de vue, je ne peux pas être d'accord. | C1 |
| | | | | While the hotel was comfortable, the service was rather slow. | Même si l'hôtel était confortable, le service était plutôt lent. | |
| while | `noun` | un moment (nom) | a while / for a while / after a while | Can you wait here for a while? I won't be long. | Tu peux attendre ici un moment ? Je n'en ai pas pour longtemps. | B1 |
| | | | | After a while, the baby finally stopped crying. | Au bout d'un moment, le bébé a enfin arrêté de pleurer. | |

- `simultaneity` (conj) : Deux actions se déroulent en même temps ; souvent avec une forme progressive.
- `contrast` (conj) : Oppose deux faits comparables, sans idée de temps.
- `concession` (conj) : En tête de phrase, reconnaît un point avant d'en avancer un autre ; registre soutenu.
- `noun` (noun) : Nom : une période de temps indéterminée.

#### though (imposé) — rang 298 — conjonction, adverbe

| mot | usage | libellé | schéma | exemple | traduction | niveau |
|---|---|---|---|---|---|---|
| though | `concession` | bien que, même si (conjonction) | (al)though + sujet + verbe | Though it was late, she kept working on her project. | Même s'il était tard, elle a continué à travailler sur son projet. | B1 |
| | | | | We enjoyed the trip, though the weather was terrible. | Nous avons apprécié le voyage, même si le temps était affreux. | |
| though | `adverb` | pourtant, cela dit (en fin de phrase) | phrase, though. | The food was cheap. It wasn't very good, though. | La nourriture n'était pas chère. Elle n'était pas très bonne, cela dit. | B2 |
| | | | | I'd love to come. I can't stay long, though. | J'adorerais venir. Je ne peux pas rester longtemps, par contre. | |
| though | `as_though` | comme si (as though) | as though + proposition | He looked as though he hadn't slept for days. | Il avait l'air de ne pas avoir dormi depuis des jours. | B2 |
| | | | | She talks as though she knows everything about cars. | Elle parle comme si elle savait tout sur les voitures. | |

- `concession` (conj) : Équivalent un peu plus familier de « although » : introduit un fait qui contraste avec la principale.
- `adverb` (adv) : Adverbe placé en fin de phrase, très courant à l'oral, pour nuancer ce qui précède.
- `as_though` (conj) : « As though » équivaut à « as if » : apparence ou comparaison imaginaire.

#### rather (imposé) — rang — — adverbe, préposition (rather than)

| mot | usage | libellé | schéma | exemple | traduction | niveau |
|---|---|---|---|---|---|---|
| rather | `degree` | plutôt, assez (intensité) | rather + adjectif / adverbe | The exam was rather difficult, but I think I passed. | L'examen était assez difficile, mais je crois que je l'ai réussi. | B1 |
| | | | | It's rather cold outside, so take a warm coat. | Il fait plutôt froid dehors, alors prends un manteau chaud. | |
| rather | `preference` | préférer (would rather) | would rather + base verbale (than…) ; would rather + sujet + prétérit | I'd rather stay at home tonight than go to the cinema. | Je préférerais rester à la maison ce soir plutôt qu'aller au cinéma. | B2 |
| | | | | I'd rather you didn't tell anyone about this yet. | Je préférerais que tu n'en parles encore à personne. | |
| rather | `instead` | plutôt que, au lieu de (rather than) | rather than + nom / base verbale / -ing | Let's walk rather than take the car, it's a nice day. | Marchons plutôt que de prendre la voiture, il fait beau. | B2 |
| | | | | She chose to study medicine rather than law. | Elle a choisi d'étudier la médecine plutôt que le droit. | |
| rather | `correction` | ou plutôt (correction) | …, or rather + correction | He's my cousin, or rather my cousin's husband. | C'est mon cousin, ou plutôt le mari de ma cousine. | C1 |
| | | | | We left on Monday, or rather very early on Tuesday. | Nous sommes partis lundi, ou plutôt très tôt mardi. | |

- `degree` (adv) : Modère ou renforce un adjectif ; souvent avec une nuance négative ou de surprise.
- `preference` (adv) : « Would rather » exprime une préférence ; avec un autre sujet, le verbe suivant est au prétérit.
- `instead` (prep) : « Rather than » présente une alternative écartée.
- `correction` (adv) : « Or rather » corrige ou précise ce qu'on vient de dire.

#### to — rang 2 — préposition, particule de l'infinitif

| mot | usage | libellé | schéma | exemple | traduction | niveau |
|---|---|---|---|---|---|---|
| to | `infinitive` | infinitif ; pour (but) | verbe + to + base verbale ; to + verbe (but) | I went to the bakery to buy some fresh bread. | Je suis allé à la boulangerie pour acheter du pain frais. | B1 |
| | | | | She decided to learn Spanish before her trip to Mexico. | Elle a décidé d'apprendre l'espagnol avant son voyage au Mexique. | |
| to | `direction` | à, vers (direction, destinataire) | to + lieu / personne | We're flying to Dublin on Friday morning for the weekend. | Nous prenons l'avion pour Dublin vendredi matin pour le week-end. | A2 |
| | | | | Give the keys to your brother when you leave. | Donne les clés à ton frère quand tu pars. | |
| to | `to_ing` | to + -ing (look forward to, be used to) | look forward to / be used to / object to + -ing | I'm looking forward to seeing you at the party. | J'ai hâte de te voir à la fête. | B2 |
| | | | | She's used to working late at the hospital. | Elle a l'habitude de travailler tard à l'hôpital. | |

- `infinitive` (particle) : Marque l'infinitif après un verbe, ou exprime un but (« pour »). Jamais « for + verbe ».
- `direction` (prep) : Indique la destination d'un mouvement ou le destinataire.
- `to_ing` (prep) : Dans certaines expressions, « to » est une préposition et se construit avec la forme en -ing, piège fréquent.

#### in — rang 6 — préposition, adverbe

| mot | usage | libellé | schéma | exemple | traduction | niveau |
|---|---|---|---|---|---|---|
| in | `place` | dans, à, en (lieu) | in + lieu | My keys are in the drawer next to the sink. | Mes clés sont dans le tiroir à côté de l'évier. | A2 |
| | | | | They have lived in Portugal for almost ten years. | Ils vivent au Portugal depuis presque dix ans. | |
| in | `within` | dans (délai à venir) | in + durée (futur) | The train leaves in ten minutes, so we need to hurry. | Le train part dans dix minutes, alors il faut se dépêcher. | B1 |
| | | | | I'll call you back in an hour or so. | Je te rappelle dans une heure environ. | |
| in | `period` | en, le (période : mois, année, partie de journée) | in + mois / année / saison / the morning | My birthday is in March, just before spring starts. | Mon anniversaire est en mars, juste avant le début du printemps. | A2 |
| | | | | I usually go jogging in the morning before work. | Je vais généralement courir le matin avant le travail. | |
| in | `adverb` | à l'intérieur, chez soi (adverbe) | be in / come in / stay in | Come in and sit down, the coffee is almost ready. | Entre et assieds-toi, le café est presque prêt. | B1 |
| | | | | Is Mr Patel in today, or is he working from home? | M. Patel est-il là aujourd'hui, ou est-ce qu'il télétravaille ? | |

- `place` (prep) : Intérieur d'un espace, d'une ville ou d'un pays ; se traduit par « dans », « à », « en » ou « au ».
- `within` (prep) : Avec une durée, indique quand une action future aura lieu (« dans dix minutes »), pas la durée de l'action.
- `period` (prep) : Situe dans une période : mois, année, saison, matin ou soir (mais « on » pour un jour, « at » pour une heure).
- `adverb` (adv) : Adverbe : être présent, entrer ou rester chez soi.

#### on — rang 13 — préposition, adverbe

| mot | usage | libellé | schéma | exemple | traduction | niveau |
|---|---|---|---|---|---|---|
| on | `surface` | sur (contact) | on + nom | Your phone is on the kitchen table, next to the fruit. | Ton téléphone est sur la table de la cuisine, à côté des fruits. | A2 |
| | | | | There's a beautiful painting on the wall of the hall. | Il y a un beau tableau sur le mur de l'entrée. | |
| on | `day` | le (jour, date) | on + jour / date | We usually go to the market on Saturday mornings. | Nous allons généralement au marché le samedi matin. | A2 |
| | | | | The concert takes place on the fifth of June. | Le concert a lieu le 5 juin. | |
| on | `topic` | sur, au sujet de | article / book / opinion + on + sujet | She wrote a long article on climate change in Africa. | Elle a écrit un long article sur le changement climatique en Afrique. | B2 |
| | | | | I'd like your opinion on my new business plan. | J'aimerais ton avis sur mon nouveau projet d'entreprise. | |
| on | `adverb` | allumé ; continuer (adverbe) | be on / go on / carry on | Don't stop, go on with your story, it's fascinating. | Ne t'arrête pas, continue ton histoire, elle est passionnante. | B1 |
| | | | | Who left the lights on in the bathroom all night? | Qui a laissé la lumière allumée dans la salle de bain toute la nuit ? | |

- `surface` (prep) : Contact avec une surface, y compris verticale (mur, écran).
- `day` (prep) : Devant un jour ou une date, là où le français met l'article ou rien.
- `topic` (prep) : Sujet d'un écrit, d'un avis, d'un débat ; plus spécialisé que « about ».
- `adverb` (adv) : Adverbe : appareil en marche, ou poursuite d'une action (go on, carry on).

#### by — rang 24 — préposition, adverbe

| mot | usage | libellé | schéma | exemple | traduction | niveau |
|---|---|---|---|---|---|---|
| by | `agent` | par (complément d'agent) | be + participe passé + by + agent | This bridge was designed by a famous Spanish architect. | Ce pont a été conçu par un célèbre architecte espagnol. | B1 |
| | | | | The window was broken by a ball from the playground. | La fenêtre a été cassée par un ballon venu de la cour. | |
| by | `deadline` | d'ici, au plus tard (échéance) | by + moment ; by the time + proposition | Please send me the report by Friday at the latest. | Envoyez-moi le rapport vendredi au plus tard, s'il vous plaît. | B2 |
| | | | | By the time we arrived, the film had already started. | Quand nous sommes arrivés, le film avait déjà commencé. | |
| by | `means` | en, par (moyen) | by + moyen ; by + -ing | We travelled across Europe by train last summer. | Nous avons traversé l'Europe en train l'été dernier. | B1 |
| | | | | You can improve your English by reading every day. | Tu peux améliorer ton anglais en lisant tous les jours. | |
| by | `near` | près de, au bord de | by + lieu / personne | We rented a small cottage by the sea in Cornwall. | Nous avons loué une petite maison au bord de la mer en Cornouailles. | B1 |
| | | | | Come and sit by me, there's plenty of room. | Viens t'asseoir à côté de moi, il y a plein de place. | |

- `agent` (prep) : Introduit l'auteur de l'action au passif.
- `deadline` (prep) : Fixe une limite dans le temps (≠ « until », qui indique une durée jusqu'à un point).
- `means` (prep) : Moyen de transport (sans article) ou manière d'obtenir un résultat (+ -ing = « en » + participe).
- `near` (prep) : Proximité immédiate.

#### but — rang 25 — conjonction, préposition

| mot | usage | libellé | schéma | exemple | traduction | niveau |
|---|---|---|---|---|---|---|
| but | `contrast` | mais | proposition, but + proposition | The flat is small but very bright and quiet. | L'appartement est petit mais très lumineux et calme. | A2 |
| | | | | I wanted to call you, but my phone battery was dead. | Je voulais t'appeler, mais mon téléphone n'avait plus de batterie. | |
| but | `except` | sauf, à part ; ne… que | everyone / nothing / anything + but + nom | Everyone but Tom came to the meeting this morning. | Tout le monde sauf Tom est venu à la réunion ce matin. | B2 |
| | | | | We had nothing but bread and cheese for dinner. | Nous n'avions que du pain et du fromage pour le dîner. | |

- `contrast` (conj) : Relie deux idées qui s'opposent.
- `except` (prep) : Après « all, everyone, nothing, anything… », signifie « sauf » ; « nothing but » = ne… que.

#### all — rang 32 — déterminant, pronom, adverbe

| mot | usage | libellé | schéma | exemple | traduction | niveau |
|---|---|---|---|---|---|---|
| all | `quantity` | tout, tous (totalité) | all (the) + nom ; all of + pronom | All the students passed the exam this year. | Tous les élèves ont réussi l'examen cette année. | A2 |
| | | | | She spent all her money on clothes and shoes. | Elle a dépensé tout son argent en vêtements et en chaussures. | |
| all | `all_that` | tout ce que, la seule chose | all (that) + sujet + verbe | All I want is a quiet evening at home. | Tout ce que je veux, c'est une soirée tranquille à la maison. | B2 |
| | | | | That's all we know about the accident for now. | C'est tout ce que nous savons sur l'accident pour l'instant. | |
| all | `adverb` | tout, complètement (adverbe) | all + adjectif / adverbe | He was all alone in the big empty house. | Il était tout seul dans la grande maison vide. | B1 |
| | | | | You're all wet! Did you forget your umbrella? | Tu es tout mouillé ! Tu as oublié ton parapluie ? | |

- `quantity` (det) : Totalité d'un groupe ou d'une quantité.
- `all_that` (pron) : « All » + proposition = tout ce que, avec souvent une idée de « seulement ». On ne dit pas « all what ».
- `adverb` (adv) : Adverbe d'intensité devant un adjectif ou un adverbe de lieu.

#### just — rang 41 — adverbe, adjectif

| mot | usage | libellé | schéma | exemple | traduction | niveau |
|---|---|---|---|---|---|---|
| just | `recent` | venir de (passé récent) | have + just + participe passé | I've just finished lunch, so I'm not hungry. | Je viens de finir de déjeuner, donc je n'ai pas faim. | B1 |
| | | | | The train has just left, we'll have to wait. | Le train vient de partir, il va falloir attendre. | |
| just | `only` | juste, seulement | just + verbe / nom | I just want to sleep for a few hours. | Je veux juste dormir quelques heures. | A2 |
| | | | | It's just a small scratch, don't worry about it. | Ce n'est qu'une petite égratignure, ne t'inquiète pas. | |
| just | `exactly` | exactement, juste (précision) | just + as / like / what / when / here | That's just what I needed after a long day. | C'est exactement ce qu'il me fallait après une longue journée. | B1 |
| | | | | The phone rang just as I was getting into the bath. | Le téléphone a sonné juste au moment où j'entrais dans le bain. | |
| just | `fair` | juste, équitable (adjectif) | a just + nom | The judge was known as a just and honest woman. | La juge était connue pour être une femme juste et honnête. | C1 |
| | | | | Everyone deserves a just reward for their hard work. | Chacun mérite une juste récompense pour son travail acharné. | |

- `recent` (adv) : Avec le present perfect (ou le prétérit en américain), indique une action très récente.
- `only` (adv) : Minimise : rien de plus que.
- `exactly` (adv) : Précise un moment, un lieu ou une chose.
- `fair` (adj) : Adjectif soutenu : conforme à la justice.

#### about — rang 43 — préposition, adverbe

| mot | usage | libellé | schéma | exemple | traduction | niveau |
|---|---|---|---|---|---|---|
| about | `topic` | au sujet de, de, sur | verbe / nom + about + sujet | We talked about our plans for the summer holidays. | Nous avons parlé de nos projets pour les vacances d'été. | A2 |
| | | | | What is the film about? Is it a comedy? | De quoi parle le film ? C'est une comédie ? | |
| about | `approx` | environ, à peu près | about + nombre / heure | It takes about twenty minutes to walk to the station. | Il faut environ vingt minutes pour aller à pied à la gare. | A2 |
| | | | | There were about fifty people at the wedding. | Il y avait à peu près cinquante personnes au mariage. | |
| about | `about_to` | être sur le point de | be about to + base verbale | Hurry up, the concert is just about to start! | Dépêche-toi, le concert est sur le point de commencer ! | B1 |
| | | | | I was about to call you when you knocked on the door. | J'allais t'appeler quand tu as frappé à la porte. | |

- `topic` (prep) : Indique le sujet dont on parle, pense ou lit.
- `approx` (adv) : Devant un nombre, une durée ou une heure : approximation.
- `about_to` (adj) : « Be about to » annonce une action imminente.

#### up — rang 44 — adverbe, préposition

| mot | usage | libellé | schéma | exemple | traduction | niveau |
|---|---|---|---|---|---|---|
| up | `direction` | vers le haut, en haut | verbe + up (+ nom) | We climbed up the hill to watch the sunset. | Nous avons grimpé la colline pour regarder le coucher du soleil. | A2 |
| | | | | Your bedroom is up the stairs, on the left. | Ta chambre est en haut de l'escalier, à gauche. | |
| up | `completion` | complètement (verbe à particule) | verbe + up | Please eat up your vegetables before you have dessert. | Finis tes légumes, s'il te plaît, avant de prendre ton dessert. | B1 |
| | | | | Somebody needs to clean up the kitchen after the party. | Quelqu'un doit ranger la cuisine après la fête. | |
| up | `awake` | debout, levé ; qu'est-ce qui se passe ? | be up ; what's up? | Are you still up? It's almost two in the morning! | Tu es encore debout ? Il est presque deux heures du matin ! | B1 |
| | | | | You look worried. What's up? Did something happen? | Tu as l'air inquiet. Qu'est-ce qui se passe ? Il est arrivé quelque chose ? | |

- `direction` (adv/prep) : Mouvement ou position vers le haut.
- `completion` (adv) : Après un verbe, « up » marque souvent l'achèvement ou la totalité.
- `awake` (adv) : « Be up » = être levé, pas couché ; « What's up? » = qu'est-ce qui ne va pas / quoi de neuf.

#### what — rang 46 — pronom, déterminant

| mot | usage | libellé | schéma | exemple | traduction | niveau |
|---|---|---|---|---|---|---|
| what | `question` | que, quoi, quel (interrogatif) | what + auxiliaire + sujet ? ; what + nom ? | What are you doing this weekend, anything special? | Qu'est-ce que tu fais ce week-end, quelque chose de spécial ? | A2 |
| | | | | What time does the museum open on Sunday mornings? | À quelle heure le musée ouvre-t-il le dimanche matin ? | |
| what | `relative` | ce que, ce qui (relatif) | verbe + what + proposition ; What + proposition + be… | I don't understand what you're trying to say. | Je ne comprends pas ce que tu essaies de dire. | B1 |
| | | | | What surprised me most was the price of the tickets. | Ce qui m'a le plus surpris, c'est le prix des billets. | |
| what | `exclamation` | quel ! (exclamatif) | what (a/an) + (adjectif) + nom ! | What a beautiful view from your balcony! I'm jealous. | Quelle belle vue depuis ton balcon ! Je suis jaloux. | B1 |
| | | | | What lovely weather we're having in London this week! | Quel temps magnifique nous avons à Londres cette semaine ! | |

- `question` (pron/det) : Interrogatif ouvert, pour une chose ou devant un nom.
- `relative` (pron) : Relatif sans antécédent : « what » = « ce que / ce qui ». Ne pas employer « which » ni « that » ici.
- `exclamation` (det) : Exclamation portant sur un nom ; « a/an » obligatoire devant un dénombrable singulier.

#### when — rang 48 — adverbe, conjonction

| mot | usage | libellé | schéma | exemple | traduction | niveau |
|---|---|---|---|---|---|---|
| when | `question` | quand ? (interrogatif) | when + auxiliaire + sujet + verbe ? | When did you last see your grandparents in Wales? | Quand as-tu vu tes grands-parents au pays de Galles pour la dernière fois ? | A2 |
| | | | | When does the next bus to the city centre leave? | Quand part le prochain bus pour le centre-ville ? | |
| when | `future_clause` | quand (+ présent à sens futur) | will + verbe … when + présent | I'll call you when I arrive at the hotel. | Je t'appellerai quand j'arriverai à l'hôtel. | B1 |
| | | | | When you finish your homework, you can watch TV. | Quand tu auras fini tes devoirs, tu pourras regarder la télé. | |
| when | `relative` | où (relatif de temps) | nom de temps + when + proposition | I remember the day when we first met in Paris. | Je me souviens du jour où nous nous sommes rencontrés à Paris. | B1 |
| | | | | Summer is the season when the town is full of tourists. | L'été est la saison où la ville est pleine de touristes. | |

- `question` (adv) : Interroge sur le moment.
- `future_clause` (conj) : Dans une subordonnée de temps, l'anglais emploie le présent là où le français met le futur.
- `relative` (adv) : Après un nom de temps, « when » traduit le « où » temporel français.

#### no — rang 51 — interjection, déterminant, adverbe

| mot | usage | libellé | schéma | exemple | traduction | niveau |
|---|---|---|---|---|---|---|
| no | `answer` | non (réponse) | No, + phrase | Do you want more coffee? No, thanks, I'm fine. | Tu veux encore du café ? Non merci, ça va. | A1 |
| | | | | No, I didn't take your charger, I promise you. | Non, je n'ai pas pris ton chargeur, je te le promets. | |
| no | `determiner` | aucun, pas de (déterminant) | no + nom | There's no milk left in the fridge, can you buy some? | Il n'y a plus de lait dans le frigo, tu peux en acheter ? | B1 |
| | | | | No student is allowed to leave before the bell rings. | Aucun élève n'a le droit de partir avant la sonnerie. | |
| no | `comparative` | ne… plus, pas plus (+ comparatif) | no + comparatif ; no longer | He no longer works for the company; he retired last year. | Il ne travaille plus pour l'entreprise ; il a pris sa retraite l'an dernier. | B2 |
| | | | | The new phone is no better than the old one. | Le nouveau téléphone n'est pas meilleur que l'ancien. | |

- `answer` (interj) : Réponse négative.
- `determiner` (det) : Déterminant négatif devant un nom, avec un verbe affirmatif (pas de double négation).
- `comparative` (adv) : Devant un comparatif ou « longer » : négation de degré.

#### there — rang 57 — pronom, adverbe

| mot | usage | libellé | schéma | exemple | traduction | niveau |
|---|---|---|---|---|---|---|
| there | `existential` | il y a (there is / there are) | there + be + nom | There are three good restaurants near our hotel. | Il y a trois bons restaurants près de notre hôtel. | A2 |
| | | | | There was a lot of traffic on the way home. | Il y avait beaucoup de circulation sur le chemin du retour. | |
| there | `place` | là, là-bas (lieu) | verbe + there ; over there | I left my bag over there, next to the door. | J'ai laissé mon sac là-bas, à côté de la porte. | A2 |
| | | | | We went to Japan in May and loved it there. | Nous sommes allés au Japon en mai et nous y avons adoré notre séjour. | |

- `existential` (pron) : Sujet grammatical de « be » pour présenter l'existence de quelque chose ; accord avec le nom qui suit.
- `place` (adv) : Adverbe de lieu ; souvent rendu par « y » ou omis en français.

#### which — rang 59 — pronom, déterminant

| mot | usage | libellé | schéma | exemple | traduction | niveau |
|---|---|---|---|---|---|---|
| which | `question` | lequel, quel (choix limité) | which + nom ? ; which of + nom pluriel ? | Which bus goes to the hospital, the 12 or the 15? | Quel bus va à l'hôpital, le 12 ou le 15 ? | A2 |
| | | | | Which of these two jackets do you prefer? | Laquelle de ces deux vestes préfères-tu ? | |
| which | `relative` | qui, que, lequel (relatif, choses) | nom + (,) which + proposition | The book which you lent me was really interesting. | Le livre que tu m'as prêté était vraiment intéressant. | B1 |
| | | | | We visited the castle, which was built in the twelfth century. | Nous avons visité le château, qui a été construit au XIIe siècle. | |
| which | `sentence` | ce qui, ce que (reprend toute la phrase) | proposition, which + verbe | He failed his driving test again, which really upset him. | Il a encore raté son permis, ce qui l'a vraiment contrarié. | B2 |
| | | | | She arrived two hours late, which nobody was happy about. | Elle est arrivée avec deux heures de retard, ce qui n'a plu à personne. | |

- `question` (det/pron) : Interrogatif de choix parmi un ensemble connu.
- `relative` (pron) : Relatif pour les choses ; obligatoire (à la place de « that ») après une virgule.
- `sentence` (pron) : Après une virgule, reprend toute la proposition précédente ; « what » est ici impossible.

#### some — rang 69 — déterminant, pronom, adverbe

| mot | usage | libellé | schéma | exemple | traduction | niveau |
|---|---|---|---|---|---|---|
| some | `quantity` | du, de la, des (quantité indéfinie) | some + nom indénombrable / pluriel | Would you like some tea or some juice with breakfast? | Voulez-vous du thé ou du jus avec le petit-déjeuner ? | A2 |
| | | | | I need to buy some eggs and some flour for the cake. | Je dois acheter des œufs et de la farine pour le gâteau. | |
| some | `certain` | certains (par opposition à d'autres) | some + nom (… others) ; some of + nom | Some people love winter, but others can't stand the cold. | Certaines personnes adorent l'hiver, mais d'autres ne supportent pas le froid. | B1 |
| | | | | Some of my colleagues work from home on Fridays. | Certains de mes collègues télétravaillent le vendredi. | |
| some | `unknown` | un certain, un… quelconque (singulier) | some + nom singulier | Some man at the door wants to talk to you. | Il y a un homme à la porte qui veut te parler. | B2 |
| | | | | She moved to some small village in the north of Scotland. | Elle s'est installée dans un petit village quelconque du nord de l'Écosse. | |
| some | `approx` | environ, quelque (+ nombre) | some + nombre | Some two hundred people attended the ceremony last night. | Quelque deux cents personnes ont assisté à la cérémonie hier soir. | C1 |
| | | | | The village lies some ten miles north of the city. | Le village se trouve à une quinzaine de kilomètres au nord de la ville. | |

- `quantity` (det) : Quantité indéterminée, surtout en phrase affirmative ou dans une offre.
- `certain` (det/pron) : Accentué, « some » désigne une partie d'un ensemble, souvent opposée à « others ».
- `unknown` (det) : Devant un singulier dénombrable : une personne ou chose inconnue ou peu importante.
- `approx` (adv) : Devant un nombre, registre soutenu : approximation.

#### any — rang 90 — déterminant, pronom, adverbe

| mot | usage | libellé | schéma | exemple | traduction | niveau |
|---|---|---|---|---|---|---|
| any | `negative_question` | de, du, des (question, négation) | any + nom (question / négation) | Do you have any brothers or sisters living nearby? | As-tu des frères ou des sœurs qui habitent près d'ici ? | A2 |
| | | | | We don't have any bread left for tomorrow's breakfast. | Il ne nous reste pas de pain pour le petit-déjeuner de demain. | |
| any | `free_choice` | n'importe quel (phrase affirmative) | any + nom (affirmatif) | You can take any seat you like, the room is empty. | Tu peux prendre n'importe quelle place, la salle est vide. | B1 |
| | | | | Any child can learn to swim with a good teacher. | N'importe quel enfant peut apprendre à nager avec un bon professeur. | |
| any | `comparative` | un peu, plus (+ comparatif) | any + comparatif (question / négation) | Is your mother feeling any better after the operation? | Ta mère se sent-elle un peu mieux après l'opération ? | B2 |
| | | | | I can't walk any faster, my feet are killing me. | Je ne peux pas marcher plus vite, j'ai affreusement mal aux pieds. | |

- `negative_question` (det) : Remplace « some » dans les questions et les phrases négatives.
- `free_choice` (det) : En phrase affirmative, « any » signifie « n'importe lequel, peu importe lequel ».
- `comparative` (adv) : Devant un comparatif, dans une question ou une négation.

#### now — rang 72 — adverbe, conjonction

| mot | usage | libellé | schéma | exemple | traduction | niveau |
|---|---|---|---|---|---|---|
| now | `moment` | maintenant | now (début ou fin de phrase) | I'm busy now, can I call you back later? | Je suis occupé maintenant, je peux te rappeler plus tard ? | A1 |
| | | | | She now lives in Berlin with her two children. | Elle vit maintenant à Berlin avec ses deux enfants. | |
| now | `now_that` | maintenant que | now (that) + proposition | Now that the kids have left, the house feels very quiet. | Maintenant que les enfants sont partis, la maison semble très calme. | B2 |
| | | | | Now you've finished school, what are you going to do? | Maintenant que tu as fini l'école, qu'est-ce que tu vas faire ? | |
| now | `discourse` | bon, alors, voyons (marqueur) | Now, + phrase | Now, let's move on to the next point on the agenda. | Bon, passons au point suivant de l'ordre du jour. | B2 |
| | | | | Now, where did I put my glasses this time? | Voyons, où ai-je mis mes lunettes cette fois-ci ? | |

- `moment` (adv) : Le moment présent.
- `now_that` (conj) : Conjonction : un changement récent explique la suite ; « that » est facultatif.
- `discourse` (adv) : En tête de phrase, attire l'attention ou change de sujet ; aucun sens temporel.

#### only — rang 79 — adverbe, adjectif, conjonction

| mot | usage | libellé | schéma | exemple | traduction | niveau |
|---|---|---|---|---|---|---|
| only | `adverb` | seulement, ne… que | only + verbe / nom / complément | I only have ten euros left until the end of the month. | Il ne me reste que dix euros jusqu'à la fin du mois. | A2 |
| | | | | The shop is only open in the morning on Sundays. | La boutique n'est ouverte que le matin le dimanche. | |
| only | `adjective` | seul, unique (adjectif) | the only + nom ; an only child | She was the only person who remembered my birthday. | C'était la seule personne à se souvenir de mon anniversaire. | B1 |
| | | | | He's an only child, so he has no brothers or sisters. | Il est fils unique, donc il n'a ni frère ni sœur. | |
| only | `conj` | seulement, sauf que (conjonction) | proposition, only + proposition | I'd love to help you, only I'm really busy this week. | J'adorerais t'aider, seulement je suis très occupé cette semaine. | C1 |
| | | | | The flat is lovely, only it's a bit far from work. | L'appartement est très joli, sauf qu'il est un peu loin du travail. | |
| only | `only_just` | de justesse ; pas plus tard que | only just + verbe ; only + repère de temps | We only just caught the last train home last night. | Nous avons attrapé le dernier train de justesse hier soir. | B2 |
| | | | | I saw her only yesterday and she seemed perfectly fine. | Je l'ai vue pas plus tard qu'hier et elle semblait aller très bien. | |

- `adverb` (adv) : Restreint ; sa place influence le sens et le français utilise souvent « ne… que ».
- `adjective` (adj) : Devant un nom, avec « the » ou « an only child » (enfant unique).
- `conj` (conj) : À l'oral, introduit une restriction qui contredit en partie ce qui précède.
- `only_just` (adv) : « Only just » = de justesse ou à l'instant ; « only yesterday » = pas plus tard qu'hier.

#### after — rang 80 — préposition, conjonction, adverbe

| mot | usage | libellé | schéma | exemple | traduction | niveau |
|---|---|---|---|---|---|---|
| after | `prep` | après (+ nom / -ing) | after + nom / -ing | After dinner, we went for a walk along the beach. | Après le dîner, nous sommes allés nous promener le long de la plage. | A2 |
| | | | | After finishing the report, she sent it to her boss. | Après avoir fini le rapport, elle l'a envoyé à sa patronne. | |
| after | `conj` | après que, une fois que (+ proposition) | after + sujet + verbe | Call me after you've spoken to the doctor, please. | Appelle-moi après avoir parlé au médecin, s'il te plaît. | B1 |
| | | | | After the guests had left, we cleaned the whole flat. | Après le départ des invités, nous avons nettoyé tout l'appartement. | |
| after | `phrasal` | d'après ; s'occuper de (expressions) | be named after + nom ; look after + nom | She was named after her grandmother on her father's side. | On lui a donné le prénom de sa grand-mère paternelle. | B2 |
| | | | | Who looks after your dog when you're on holiday? | Qui s'occupe de ton chien quand tu es en vacances ? | |

- `prep` (prep) : Suivi d'un nom ou d'un verbe en -ing (le français dit « après avoir… »).
- `conj` (conj) : Suivi d'une proposition ; présent ou present perfect à sens futur.
- `phrasal` (prep) : Dans « name after » (donner le nom de) et « look after » (s'occuper de), « after » perd son sens temporel.

#### over — rang 88 — préposition, adverbe

| mot | usage | libellé | schéma | exemple | traduction | niveau |
|---|---|---|---|---|---|---|
| over | `above` | au-dessus de, par-dessus | over + nom | A small plane flew over our house this morning. | Un petit avion a survolé notre maison ce matin. | B1 |
| | | | | The dog jumped over the fence and ran away. | Le chien a sauté par-dessus la clôture et s'est enfui. | |
| over | `more_than` | plus de (quantité) | over + nombre | Over a hundred people applied for the job. | Plus de cent personnes ont postulé pour ce poste. | B1 |
| | | | | The journey took over five hours because of the traffic. | Le trajet a pris plus de cinq heures à cause de la circulation. | |
| over | `finished` | fini, terminé (adverbe) | be over | The party was over by the time we arrived. | La fête était finie quand nous sommes arrivés. | B1 |
| | | | | I'm so glad the exams are finally over this year. | Je suis tellement content que les examens soient enfin terminés cette année. | |
| over | `during` | pendant, au cours de | over + période / repas | We can discuss the details over lunch tomorrow, if you like. | On peut discuter des détails pendant le déjeuner demain, si tu veux. | B2 |
| | | | | Prices have risen sharply over the last few years. | Les prix ont fortement augmenté au cours des dernières années. | |

- `above` (prep) : Position ou mouvement au-dessus de quelque chose ; se traduit souvent par un verbe (survoler, enjamber).
- `more_than` (prep) : Devant un nombre : plus de.
- `finished` (adv) : Après « be » : quelque chose est terminé.
- `during` (prep) : Durée pendant laquelle une chose se fait ou évolue.

#### then — rang 91 — adverbe

| mot | usage | libellé | schéma | exemple | traduction | niveau |
|---|---|---|---|---|---|---|
| then | `sequence` | puis, ensuite | first…, then… | First chop the onions, then fry them in a little oil. | Hache d'abord les oignons, puis fais-les revenir dans un peu d'huile. | A2 |
| | | | | We had lunch in town and then went to the museum. | Nous avons déjeuné en ville, puis nous sommes allés au musée. | |
| then | `at_that_time` | à l'époque, à ce moment-là | … then ; back then | I was living in Lyon then and didn't speak any English. | À l'époque, je vivais à Lyon et je ne parlais pas du tout anglais. | B1 |
| | | | | Call me on Thursday; I'll be free then. | Appelle-moi jeudi ; je serai libre à ce moment-là. | |
| then | `consequence` | alors, dans ce cas | if…, then… ; phrase, then. | If you're tired, then you should go to bed early. | Si tu es fatigué, alors tu devrais te coucher tôt. | B1 |
| | | | | You've already seen this film? Let's watch another one, then. | Tu as déjà vu ce film ? Regardons-en un autre, alors. | |

- `sequence` (adv) : Indique l'étape suivante d'une succession.
- `at_that_time` (adv) : Renvoie à un moment passé ou futur déjà mentionné.
- `consequence` (adv) : Tire une conclusion de ce qui vient d'être dit, souvent en fin de phrase ou après « if ».

#### back — rang 93 — adverbe, nom, verbe

| mot | usage | libellé | schéma | exemple | traduction | niveau |
|---|---|---|---|---|---|---|
| back | `return` | de retour, en retour (adverbe) | verbe + back | I'll be back in five minutes, don't go anywhere. | Je reviens dans cinq minutes, ne bouge pas. | A2 |
| | | | | Can you give me back the book I lent you? | Tu peux me rendre le livre que je t'ai prêté ? | |
| back | `noun` | le dos ; l'arrière, le fond (nom) | my back ; at the back of + nom | I've had a terrible pain in my back all week. | J'ai eu très mal au dos toute la semaine. | A2 |
| | | | | We sat at the back of the bus, near the window. | Nous nous sommes assis au fond du bus, près de la fenêtre. | |
| back | `verb` | soutenir ; reculer (verbe) | back + qqn ; back + véhicule + out | All my friends backed me when I decided to change jobs. | Tous mes amis m'ont soutenu quand j'ai décidé de changer de travail. | B2 |
| | | | | She slowly backed the car out of the garage. | Elle a lentement sorti la voiture du garage en marche arrière. | |

- `return` (adv) : Retour à un lieu ou à une personne ; correspond souvent au préfixe « re- » en français.
- `noun` (noun) : Nom : partie du corps ou partie arrière d'un lieu.
- `verb` (verb) : Verbe : appuyer quelqu'un, ou faire marche arrière.

#### much — rang 105 — déterminant, adverbe, pronom

| mot | usage | libellé | schéma | exemple | traduction | niveau |
|---|---|---|---|---|---|---|
| much | `quantity` | beaucoup de (indénombrable) | much + nom indénombrable ; how much…? | We don't have much time before the train leaves. | Nous n'avons pas beaucoup de temps avant le départ du train. | A2 |
| | | | | How much money did you spend on your holiday? | Combien d'argent as-tu dépensé pendant tes vacances ? | |
| much | `comparative` | bien, beaucoup (+ comparatif) | much + comparatif | The new flat is much bigger than the old one. | Le nouvel appartement est bien plus grand que l'ancien. | B1 |
| | | | | I feel much better after a good night's sleep. | Je me sens beaucoup mieux après une bonne nuit de sommeil. | |
| much | `verb` | beaucoup (avec un verbe) | verbe + (very) much ; not + verbe + much | Thank you very much for your kind invitation. | Merci beaucoup pour votre gentille invitation. | B1 |
| | | | | I don't go out much during the week anymore. | Je ne sors plus beaucoup en semaine. | |

- `quantity` (det) : Devant un indénombrable, surtout en question ou négation (« a lot of » à l'affirmative).
- `comparative` (adv) : Renforce un comparatif ; on ne dit pas « very bigger ».
- `verb` (adv) : Modifie un verbe, surtout dans « very much » ou à la négative.

#### right — rang 115 — adjectif, nom, adverbe

| mot | usage | libellé | schéma | exemple | traduction | niveau |
|---|---|---|---|---|---|---|
| right | `correct` | juste, bon ; avoir raison | be right ; the right + nom | You were right, the restaurant was closed on Mondays. | Tu avais raison, le restaurant était fermé le lundi. | A2 |
| | | | | Is this the right way to the station? | C'est bien le bon chemin pour aller à la gare ? | |
| right | `direction` | droite (direction) | turn right ; on the right | Turn right at the traffic lights, then go straight on. | Tourne à droite aux feux, puis continue tout droit. | A2 |
| | | | | The bank is on your right, opposite the church. | La banque est sur votre droite, en face de l'église. | |
| right | `exactly` | juste, tout de suite (renforcement) | right + préposition ; right now / right away | I'll be there right away, just give me two minutes. | J'arrive tout de suite, donne-moi juste deux minutes. | B1 |
| | | | | The keys were right in front of you on the table. | Les clés étaient juste devant toi sur la table. | |
| right | `noun` | droit (nom) | the right to + nom / verbe | Everyone has the right to a fair trial. | Tout le monde a droit à un procès équitable. | B2 |
| | | | | You have the right to remain silent, sir. | Vous avez le droit de garder le silence, monsieur. | |

- `correct` (adj) : Exact ou approprié ; « be right » = avoir raison (pas « have reason »).
- `direction` (adj/noun) : Le côté droit.
- `exactly` (adv) : Renforce une indication de lieu ou de temps.
- `noun` (noun) : Ce que la loi ou la morale autorise.

#### too — rang 121 — adverbe

| mot | usage | libellé | schéma | exemple | traduction | niveau |
|---|---|---|---|---|---|---|
| too | `excess` | trop (+ adjectif / adverbe) | too + adjectif / adverbe (+ to + verbe) | This coffee is too hot to drink right now. | Ce café est trop chaud pour être bu tout de suite. | A2 |
| | | | | You're driving too fast, please slow down a little. | Tu conduis trop vite, ralentis un peu s'il te plaît. | |
| too | `also` | aussi (en fin de phrase) | phrase + too | I love jazz, and my wife likes it too. | J'adore le jazz, et ma femme aime ça aussi. | A2 |
| | | | | Are you coming to the party on Saturday too? | Tu viens aussi à la fête samedi ? | |
| too | `too_much` | trop de (too much / too many) | too much + indénombrable ; too many + pluriel | There are too many cars in the city centre. | Il y a trop de voitures dans le centre-ville. | B1 |
| | | | | I ate too much cake at the party yesterday. | J'ai mangé trop de gâteau à la fête hier. | |

- `excess` (adv) : Excès qui empêche quelque chose ; ≠ « very » (simple intensité).
- `also` (adv) : Ajout, généralement en fin de phrase.
- `too_much` (det) : Excès de quantité : « much » pour l'indénombrable, « many » pour le pluriel.

#### before — rang 123 — préposition, conjonction, adverbe

| mot | usage | libellé | schéma | exemple | traduction | niveau |
|---|---|---|---|---|---|---|
| before | `prep` | avant (+ nom / -ing) | before + nom / -ing | Please wash your hands before eating your lunch, children. | Lavez-vous les mains avant de déjeuner, les enfants. | A2 |
| | | | | I always drink a coffee before work in the morning. | Je bois toujours un café avant le travail le matin. | |
| before | `conj` | avant que, avant de (+ proposition) | before + sujet + verbe | Call me before you leave the office tonight. | Appelle-moi avant de quitter le bureau ce soir. | B1 |
| | | | | We need to finish this before the boss comes back. | Nous devons finir ça avant que le patron revienne. | |
| before | `adverb` | déjà, auparavant (adverbe) | have / had + participe + … before | Have we met before? Your face looks familiar. | On s'est déjà rencontrés ? Votre visage me dit quelque chose. | B1 |
| | | | | I had never seen such a big crowd before. | Je n'avais jamais vu une foule aussi nombreuse auparavant. | |

- `prep` (prep) : Suivi d'un nom ou d'un verbe en -ing (le français dit « avant de… »).
- `conj` (conj) : Suivi d'une proposition à l'indicatif (présent à sens futur), là où le français met le subjonctif.
- `adverb` (adv) : En fin de phrase avec un parfait : à un moment antérieur.

#### ever — rang 204 — adverbe

| mot | usage | libellé | schéma | exemple | traduction | niveau |
|---|---|---|---|---|---|---|
| ever | `experience` | déjà ; jamais (expérience) | have + sujet + ever + participe ? ; superlatif + ever | Have you ever been to New York in winter? | Es-tu déjà allé à New York en hiver ? | B1 |
| | | | | This is the best pizza I have ever eaten in London. | C'est la meilleure pizza que j'aie jamais mangée à Londres. | |
| ever | `negative` | jamais (avec négation) | not / hardly / nothing + ever | We hardly ever go to the cinema these days. | Nous n'allons presque jamais au cinéma ces temps-ci. | B1 |
| | | | | Nothing ever happens in this quiet little village. | Il ne se passe jamais rien dans ce petit village tranquille. | |
| ever | `always` | depuis toujours, de plus en plus | ever since + repère ; ever + comparatif | Ever since the accident, she has been afraid of driving. | Depuis l'accident, elle a peur de conduire. | B2 |
| | | | | The streets are getting ever more crowded every summer. | Les rues sont de plus en plus bondées chaque été. | |

- `experience` (adv) : Dans une question, « déjà » ; après un superlatif, « jamais ».
- `negative` (adv) : Avec une négation ou « hardly », « ever » remplace « never » pour éviter la double négation.
- `always` (adv) : « Ever since » = depuis ; « ever + comparatif » = de plus en plus.

#### enough — rang 260 — déterminant, adverbe, pronom

| mot | usage | libellé | schéma | exemple | traduction | niveau |
|---|---|---|---|---|---|---|
| enough | `det` | assez de (+ nom) | enough + nom | We don't have enough chairs for all the guests. | Nous n'avons pas assez de chaises pour tous les invités. | A2 |
| | | | | Is there enough food for everyone at the table? | Y a-t-il assez à manger pour tout le monde à table ? | |
| enough | `adverb` | assez (après l'adjectif) | adjectif / adverbe + enough (+ to + verbe) | He isn't old enough to drive a car yet. | Il n'est pas encore assez âgé pour conduire. | B1 |
| | | | | You didn't run fast enough to catch the bus. | Tu n'as pas couru assez vite pour attraper le bus. | |
| enough | `pronoun` | assez ; ça suffit (pronom) | have had enough (of) ; that's enough | I've had enough of this noise, I'm going out. | J'en ai assez de ce bruit, je sors. | B1 |
| | | | | That's enough, children! Stop fighting and go to bed. | Ça suffit, les enfants ! Arrêtez de vous battre et allez vous coucher. | |

- `det` (det) : Placé avant le nom.
- `adverb` (adv) : Placé après l'adjectif ou l'adverbe, contrairement au français.
- `pronoun` (pron) : Employé seul : la quantité suffisante, ou l'exaspération.

#### once — rang 275 — adverbe, conjonction

| mot | usage | libellé | schéma | exemple | traduction | niveau |
|---|---|---|---|---|---|---|
| once | `one_time` | une fois (fréquence) | once + a / per + période | I go to the gym once a week, on Wednesdays. | Je vais à la salle de sport une fois par semaine, le mercredi. | A2 |
| | | | | I've only been to Scotland once, many years ago. | Je ne suis allé en Écosse qu'une seule fois, il y a de nombreuses années. | |
| once | `formerly` | autrefois, jadis | sujet + once + verbe au passé | This building was once a large textile factory. | Ce bâtiment était autrefois une grande usine textile. | B1 |
| | | | | She was once a famous singer in her country. | Elle était autrefois une chanteuse célèbre dans son pays. | |
| once | `conj` | une fois que, dès que | once + proposition | Once you've read the letter, please give it back. | Une fois que tu auras lu la lettre, rends-la-moi s'il te plaît. | B2 |
| | | | | Once the rain stops, we can go for a walk. | Dès que la pluie s'arrêtera, nous pourrons aller nous promener. | |
| once | `at_once` | tout de suite ; à la fois (at once) | at once | Come here at once, your dinner is getting cold! | Viens ici tout de suite, ton dîner refroidit ! | B2 |
| | | | | I can't do three things at once, I'm sorry. | Je ne peux pas faire trois choses à la fois, désolé. | |

- `one_time` (adv) : Une seule occurrence ; « once a week » = une fois par semaine.
- `formerly` (adv) : À une époque passée, mais plus maintenant.
- `conj` (conj) : Conjonction de temps ; présent à sens futur.
- `at_once` (adv) : « At once » = immédiatement, ou en même temps.

#### however — rang 237 — adverbe, conjonction

| mot | usage | libellé | schéma | exemple | traduction | niveau |
|---|---|---|---|---|---|---|
| however | `contrast` | cependant, toutefois | Phrase. However, phrase. ; phrase; however, phrase. | The hotel was lovely. However, the beach was quite dirty. | L'hôtel était charmant. Cependant, la plage était assez sale. | B1 |
| | | | | We wanted to stay longer; however, we had to leave. | Nous voulions rester plus longtemps ; toutefois, nous avons dû partir. | |
| however | `no_matter` | si… que, avoir beau ; de quelque façon que | however + adjectif / adverbe + proposition ; however + proposition | However hard I try, I can't remember his name. | J'ai beau essayer, je n'arrive pas à me souvenir de son nom. | B2 |
| | | | | You can decorate the room however you like. | Tu peux décorer la pièce comme tu veux. | |

- `contrast` (adv) : Connecteur d'opposition entre deux phrases, suivi d'une virgule ; ne relie pas deux propositions comme « but ».
- `no_matter` (adv) : Devant un adjectif ou un adverbe, ou seul : peu importe le degré ou la manière.

#### already — rang 253 — adverbe

| mot | usage | libellé | schéma | exemple | traduction | niveau |
|---|---|---|---|---|---|---|
| already | `affirmative` | déjà (plus tôt que prévu) | have + already + participe ; be + already | I've already seen this film twice this year. | J'ai déjà vu ce film deux fois cette année. | A2 |
| | | | | Is it already ten o'clock? Time goes so fast! | Il est déjà dix heures ? Le temps passe si vite ! | |
| already | `surprise` | déjà ? (surprise dans une question) | question + already ? | Are you leaving already? The party has just started! | Tu pars déjà ? La fête vient juste de commencer ! | B1 |
| | | | | Have you finished the whole book already? That was quick. | Tu as déjà fini tout le livre ? C'était rapide. | |

- `affirmative` (adv) : Dans une affirmation, l'action a eu lieu, parfois plus tôt que prévu.
- `surprise` (adv) : Dans une question, « already » marque la surprise, alors que « yet » est neutre.

#### far — rang 295 — adverbe, adjectif

| mot | usage | libellé | schéma | exemple | traduction | niveau |
|---|---|---|---|---|---|---|
| far | `distance` | loin | far (from) ; how far…? | How far is the airport from the city centre? | À quelle distance se trouve l'aéroport du centre-ville ? | A2 |
| | | | | We don't live far from the beach, about ten minutes. | Nous n'habitons pas loin de la plage, à environ dix minutes. | |
| far | `degree` | bien, beaucoup (+ comparatif, too) | far + comparatif ; far too + adjectif | This phone is far better than my old one. | Ce téléphone est bien meilleur que mon ancien. | B2 |
| | | | | It's far too expensive for a student like me. | C'est beaucoup trop cher pour un étudiant comme moi. | |
| far | `so_far` | jusqu'ici ; pour autant que | so far ; as far as + sujet + know / be concerned | So far, everything has gone according to plan. | Jusqu'ici, tout s'est déroulé comme prévu. | B1 |
| | | | | As far as I know, the meeting is still on. | Pour autant que je sache, la réunion est toujours maintenue. | |

- `distance` (adv) : Distance ; surtout en question et négation (« a long way » à l'affirmative).
- `degree` (adv) : Renforce un comparatif ou « too ».
- `so_far` (adv) : « So far » = jusqu'à présent ; « as far as » = dans la mesure où.

#### until — rang 223 — préposition, conjonction

| mot | usage | libellé | schéma | exemple | traduction | niveau |
|---|---|---|---|---|---|---|
| until | `prep` | jusqu'à (+ moment) | until + moment | The shop is open until eight o'clock on Fridays. | La boutique est ouverte jusqu'à vingt heures le vendredi. | A2 |
| | | | | I'll be in Spain until the end of the month. | Je serai en Espagne jusqu'à la fin du mois. | |
| until | `conj` | jusqu'à ce que (+ proposition) | until + sujet + verbe | Wait here until I come back with the car. | Attends ici jusqu'à ce que je revienne avec la voiture. | B1 |
| | | | | Keep stirring the sauce until it becomes thick. | Continue de remuer la sauce jusqu'à ce qu'elle épaississe. | |
| until | `not_until` | ne… que, pas avant (not until) | not + verbe + until + moment / proposition | The film doesn't start until nine, so we have time. | Le film ne commence qu'à neuf heures, donc on a le temps. | B2 |
| | | | | I didn't realise my mistake until I got home. | Je ne me suis rendu compte de mon erreur qu'en rentrant chez moi. | |

- `prep` (prep) : Durée jusqu'à un moment (≠ « by », échéance).
- `conj` (conj) : Suivi d'une proposition à l'indicatif, là où le français met le subjonctif.
- `not_until` (conj/prep) : « Not… until » signifie que l'action n'a lieu qu'à partir de ce moment.

#### both — rang 157 — déterminant, pronom, conjonction

| mot | usage | libellé | schéma | exemple | traduction | niveau |
|---|---|---|---|---|---|---|
| both | `det` | les deux (déterminant, pronom) | both (of) + (the / possessif) + nom pluriel | Both my parents are teachers at the same school. | Mes deux parents sont professeurs dans la même école. | A2 |
| | | | | I liked both of the films, but the second was better. | J'ai aimé les deux films, mais le second était meilleur. | |
| both | `both_and` | à la fois… et… | both X and Y | The job is both interesting and very well paid. | Le poste est à la fois intéressant et très bien payé. | B1 |
| | | | | Both children and adults will enjoy this film. | Ce film plaira aux enfants comme aux adultes. | |

- `det` (det/pron) : Désigne deux éléments ensemble ; pas d'article entre « both » et le possessif.
- `both_and` (conj) : Corrélation : deux éléments vrais en même temps.

#### if — rang 37 — conjonction

| mot | usage | libellé | schéma | exemple | traduction | niveau |
|---|---|---|---|---|---|---|
| if | `condition` | si (condition) | if + présent, will… ; if + prétérit, would… | If it rains tomorrow, we'll stay at home and watch films. | S'il pleut demain, nous resterons à la maison regarder des films. | B1 |
| | | | | If I had more time, I would learn to play the piano. | Si j'avais plus de temps, j'apprendrais à jouer du piano. | |
| if | `whether` | si (interrogation indirecte) | verbe + if + proposition | Can you tell me if the museum is open today? | Pouvez-vous me dire si le musée est ouvert aujourd'hui ? | B1 |
| | | | | I wonder if she remembered to lock the door. | Je me demande si elle a pensé à fermer la porte à clé. | |
| if | `concession` | quoique, bien que (if + adjectif) | adjectif, if + adjectif, nom | It was a good, if rather long, meeting this morning. | C'était une bonne réunion ce matin, quoiqu'un peu longue. | C1 |
| | | | | The plan is clever, if a little risky for us. | Le plan est astucieux, bien qu'un peu risqué pour nous. | |

- `condition` (conj) : Introduit une condition ; jamais de « will » ni de « would » dans la proposition en « if ».
- `whether` (conj) : Introduit une question indirecte (oui ou non), comme « whether » ; ici le futur est possible.
- `concession` (conj) : Entre virgules devant un adjectif : concession atténuée, registre soutenu.

#### how — rang 67 — adverbe

| mot | usage | libellé | schéma | exemple | traduction | niveau |
|---|---|---|---|---|---|---|
| how | `manner` | comment (manière) | how + auxiliaire + sujet ? ; how to + verbe | How did you get here so quickly from the station? | Comment es-tu arrivé ici si vite depuis la gare ? | A2 |
| | | | | Can you show me how to use this machine? | Tu peux me montrer comment utiliser cette machine ? | |
| how | `degree` | combien, quel (+ adjectif / adverbe) | how + adjectif / adverbe + … ? | How old is your daughter now? She's grown so much. | Quel âge a ta fille maintenant ? Elle a tellement grandi. | A2 |
| | | | | How long does it take to drive to Edinburgh? | Combien de temps faut-il pour aller à Édimbourg en voiture ? | |
| how | `exclamation` | comme, que ! (exclamatif) | how + adjectif / adverbe + (sujet + verbe) ! | How kind of you to bring me these flowers! | Comme c'est gentil à toi de m'apporter ces fleurs ! | B1 |
| | | | | How quickly the children grow up these days! | Comme les enfants grandissent vite de nos jours ! | |

- `manner` (adv) : Interroge sur la manière ou le moyen.
- `degree` (adv) : Devant un adjectif ou un adverbe, interroge sur le degré : âge, durée, distance…
- `exclamation` (adv) : Exclamation portant sur un adjectif ou un adverbe (≠ « what » + nom).

### Groupes à départager

| groupe | usages opposés | explication |
|---|---|---|
| as / like | `as:role` ↔ `like:similarity` | « as a teacher » = je suis réellement professeur (fonction) ; « like a teacher » = je ressemble à un professeur sans l'être. |
| as / like | `as:manner` ↔ `like:conj` | Devant sujet + verbe, l'anglais soigné emploie « as » (as I said) ; « like » (like I said) est familier. |
| as / like | `as:comparison` ↔ `like:similarity` | « as + adjectif + as » compare un degré (aussi grand que) ; « like + nom » compare une manière d'être ou d'agir. |
| since / for | `since:time_point` ↔ `for:duration` | Les deux traduisent « depuis » : « since » + point de départ (since 2015, since Monday), « for » + durée (for ten years, for two days). |
| since / for | `since:cause` ↔ `for:cause` | Tous deux expriment la cause : « since » (puisque) est courant et peut ouvrir la phrase ; « for » (car) est littéraire et vient toujours après la principale. |
| still / yet | `still:continuation` ↔ `yet:not_yet` | « still » = la situation continue (I still live here ; I still haven't finished, avec impatience) ; « yet » = l'attente n'est pas encore comblée (I haven't finished yet), en fin de phrase. |
| still / yet | `still:continuation` ↔ `yet:question` | « Are you still working? » = tu travailles toujours ? ; « Have you finished yet? » = as-tu déjà fini ? |
| still / yet | `still:concession` ↔ `yet:contrast` | Tous deux opposent deux idées : « still » est un adverbe (but he still lost ; Still, …), « yet » une conjonction qui relie deux propositions (simple, yet nobody…). |

### Mots écartés

| mot | rang | raison |
|---|---|---|
| the | 1 | Article défini : un seul usage grammatical utile ; le corrélatif « the more…, the more » relève d'une leçon de grammaire. |
| of | 4 | Préposition très fréquente mais sans ambiguïté majeure pour un francophone (« de »). |
| a | 5 | Article indéfini, trivial. |
| you | 11 | Pronom personnel simple. |
| it | 12 | Pronom personnel simple. |
| with | 14 | Préposition au sens stable (« avec »), peu de risque de confusion. |
| this | 15 | Démonstratif simple, sans usages réellement distincts. |
| at | 21 | Préposition de lieu et d'heure, mieux traitée dans une leçon in/on/at que comme mot à usages multiples. |
| he | 22 | Pronom personnel simple. |
| not | 23 | Négation ; un seul usage. |
| from | 26 | Préposition au sens stable (« de, depuis la provenance »). |
| his | 34 | Possessif simple. |
| they | 35 | Pronom personnel simple. |
| me | 36 | Pronom personnel simple. |
| one | 38 | Nombre et pronom de reprise ; usages peu ambigus pour un apprenant B1+. |
| who | 53 | Interrogatif et relatif au sens identique (« qui ») ; peu de risque de confusion. |
| their | 56 | Possessif simple. |
| her | 58 | Pronom et possessif ; distinction simple, sans enjeu de traduction. |
| she | 64 | Pronom personnel simple. |
| also | 70 | Un seul usage (« aussi ») ; le contraste avec « too » est traité sous « too ». |
| them | 71 | Pronom personnel simple. |
| its | 75 | Possessif simple. |
| than | 77 | Un seul usage pratique (« que » après un comparatif). |
| first | 81 | Ordinal et adverbe au sens transparent. |
| because | 97 | Un seul usage (cause) ; il sert de référence dans les contrastes avec « as » et « since ». |
| way | 101 | Nom (chemin, manière) : vocabulaire plutôt que mot outil. |
| 2 | 103 | Graphie abrégée de « to » (SMS), sans intérêt pédagogique. |
| very | 106 | Un seul usage d'intensif ; le piège « very » / « too » est traité sous « too ». |
| where | 107 | Interrogatif et relatif de lieu au sens stable (« où »). |
| here | 111 | Adverbe de lieu transparent (« ici »). |
| really | 113 | Adverbe d'intensité au sens transparent. |
| off | 124 | Particule de verbes à particule : relève du vocabulaire des phrasal verbs plutôt que d'usages grammaticaux distincts. |
| why | 125 | Interrogatif simple (« pourquoi »). |
| many | 131 | Déterminant simple ; « too many » est traité sous « too ». |
| those | 133 | Pluriel de « that » démonstratif, sans usage propre. |
| down | 137 | Particule de direction au sens transparent (phrasal verbs). |
| through | 139 | Préposition au sens assez stable (« à travers, par ») ; peu de contrastes grammaticaux. |
| home | 149 | Nom ou adverbe de lieu : vocabulaire, pas mot outil. |
| same | 155 | Adjectif au sens unique (« même, pareil »). |
| around | 165 | Préposition et adverbe proches de « about » (environ, autour) ; doublon peu utile. |
| under | 180 | Préposition au sens transparent (« sous »). |
| again | 189 | Un seul usage (« encore, de nouveau »). |
| next | 190 | Adjectif et adverbe au sens transparent (« prochain, ensuite »). |
| without | 193 | Préposition au sens stable (« sans ») ; seule difficulté, « without + -ing », relève de la grammaire générale. |
| against | 194 | Préposition au sens stable (« contre »). |
| please | 208 | Formule de politesse et verbe (« plaire ») sans enjeu grammatical. |
| second | 212 | Ordinal ou nom (seconde) : vocabulaire. |


# Allemand

## Inventaire des mots outils (allemand) — à valider

51 mots gardés, 150 usages, 60 mots écartés. Les mots imposés sont marqués « (imposé) ». Le champ grammarRef est vide pour l'instant.

### Mots gardés

| Mot | Usage | Libellé | Schéma | Exemple | Traduction | Niveau |
|---|---|---|---|---|---|---|
| **als** (imposé) | `time_past` | quand (fait unique du passé) | als + sujet + … + verbe conjugué | Als ich klein war, wohnten wir in Köln. | Quand j'étais petit, nous habitions à Cologne. | A2 |
|  |  |  |  | Als sie anrief, war ich gerade unter der Dusche. | Quand elle a appelé, j'étais justement sous la douche. |  |
|  | `comparison_unequal` | que (après un comparatif) | comparatif + als + élément comparé | Mein Bruder ist zwei Jahre älter als ich. | Mon frère a deux ans de plus que moi. | A2 |
|  |  |  |  | Heute ist es viel kälter als gestern. | Aujourd'hui, il fait beaucoup plus froid qu'hier. |  |
|  | `role` | en tant que, comme (fonction, rôle) | als + nom (sans article) | Sie arbeitet als Ärztin in einem großen Krankenhaus. | Elle travaille comme médecin dans un grand hôpital. | B1 |
|  |  |  |  | Als Kind habe ich viel Fußball gespielt. | Enfant, j'ai beaucoup joué au football. |  |
|  | `as_if` | comme si (als ob / als + verbe) | als ob + sujet + … + verbe au subj. II / als + verbe au subj. II + sujet … | Er tut so, als ob er nichts wüsste. | Il fait comme s'il ne savait rien. | B2 |
|  |  |  |  | Du siehst aus, als hättest du nicht geschlafen. | Tu as l'air de ne pas avoir dormi. |  |
| **wenn** (imposé) | `time_repeated` | quand, chaque fois que (répétition, présent, futur) | wenn + sujet + … + verbe conjugué | Wenn ich nach Hause komme, koche ich sofort. | Quand je rentre à la maison, je cuisine tout de suite. | A2 |
|  |  |  |  | Immer wenn es regnete, blieben wir drinnen. | Chaque fois qu'il pleuvait, nous restions à l'intérieur. |  |
|  | `condition` | si (condition) | wenn + sujet + … + verbe conjugué, verbe conjugué + sujet … | Wenn du Zeit hast, können wir ins Kino gehen. | Si tu as le temps, nous pouvons aller au cinéma. | A2 |
|  |  |  |  | Wenn ich reich wäre, würde ich viel reisen. | Si j'étais riche, je voyagerais beaucoup. |  |
|  | `wish` | si seulement (souhait irréel) | wenn + sujet + nur/doch + … + verbe au subj. II ! | Wenn ich nur mehr Zeit für meine Familie hätte! | Si seulement j'avais plus de temps pour ma famille ! | B2 |
|  |  |  |  | Wenn er doch endlich anrufen würde! | Si seulement il appelait enfin ! |  |
| **wie** (imposé) | `question_how` | comment, combien (question directe) | wie (+ adjectif) + verbe conjugué + sujet … ? | Wie kommst du morgen zur Arbeit? | Comment vas-tu au travail demain ? | A1 |
|  |  |  |  | Wie lange wohnst du schon in Berlin? | Depuis combien de temps habites-tu à Berlin ? |  |
|  | `indirect_how` | comment (question indirecte) | …, wie + sujet + … + verbe conjugué | Ich weiß nicht, wie diese Maschine funktioniert. | Je ne sais pas comment fonctionne cette machine. | A2 |
|  |  |  |  | Kannst du mir sagen, wie spät es ist? | Peux-tu me dire quelle heure il est ? |  |
|  | `comparison_equal` | aussi … que, comme (égalité, ressemblance) | so + adjectif + wie + élément comparé | Sie ist schon so groß wie ihre Mutter. | Elle est déjà aussi grande que sa mère. | A2 |
|  |  |  |  | Er spricht Deutsch fast wie ein Muttersprachler. | Il parle allemand presque comme un natif. |  |
| **doch** (imposé) | `answer_negative` | si (réponse à une question négative) | question négative ? – Doch, … | Hast du keinen Hunger? – Doch, ich habe großen Hunger. | Tu n'as pas faim ? – Si, j'ai très faim. | A2 |
|  |  |  |  | Du kommst nicht mit, oder? – Doch, natürlich! | Tu ne viens pas, n'est-ce pas ? – Si, bien sûr ! |  |
|  | `contrast` | pourtant, quand même, mais | …, doch + sujet + verbe … / sujet + verbe + doch + … | Es war sehr kalt, doch wir gingen schwimmen. | Il faisait très froid, pourtant nous sommes allés nager. | B1 |
|  |  |  |  | Ich wollte nicht kommen, aber dann bin ich doch gegangen. | Je ne voulais pas venir, mais finalement j'y suis quand même allé. |  |
|  | `modal_particle` | particule modale (insistance, invitation, reproche) | impératif + doch + … ! / sujet + verbe + doch + … | Komm doch heute Abend zu uns! | Viens donc chez nous ce soir ! | B1 |
|  |  |  |  | Das habe ich dir doch gestern schon gesagt. | Je te l'ai pourtant déjà dit hier. |  |
| **schon** (imposé) | `already` | déjà | sujet + verbe + schon + … | Danke, ich habe schon zu Mittag gegessen. | Merci, j'ai déjà déjeuné. | A2 |
|  |  |  |  | Bist du schon einmal in Wien gewesen? | Es-tu déjà allé à Vienne ? |  |
|  | `duration` | depuis (déjà) … (durée avec le présent) | sujet + verbe au présent + schon (+ seit) + durée | Ich lerne schon seit drei Jahren Deutsch. | J'apprends l'allemand depuis déjà trois ans. | A2 |
|  |  |  |  | Wir warten schon eine halbe Stunde auf dich. | Ça fait une demi-heure que nous t'attendons. |  |
|  | `modal_particle` | particule modale (rassurer, concéder) | sujet + verbe + schon + … (, aber …) | Keine Sorge, das schaffst du schon. | Ne t'inquiète pas, tu vas y arriver. | B1 |
|  |  |  |  | Das ist schon richtig, aber es ist zu teuer. | C'est vrai, certes, mais c'est trop cher. |  |
| **noch** (imposé) | `still` | encore, toujours (continuation) | sujet + verbe + noch + … | Wohnst du noch bei deinen Eltern in Hamburg? | Tu habites encore chez tes parents à Hambourg ? | A2 |
|  |  |  |  | Es ist zehn Uhr und er schläft noch. | Il est dix heures et il dort encore. |  |
|  | `additional` | encore (en plus) | noch + ein/mehr/etwas + nom / sujet + verbe + noch + … | Möchtest du noch ein Stück Kuchen? | Tu veux encore un morceau de gâteau ? | A2 |
|  |  |  |  | Ich muss noch schnell einkaufen gehen. | Je dois encore vite aller faire les courses. |  |
|  | `not_yet` | pas encore, jamais encore (noch nicht, noch nie) | noch + nicht / kein / nie | Der Zug ist noch nicht angekommen. | Le train n'est pas encore arrivé. | A2 |
|  |  |  |  | Ich war noch nie in Spanien. | Je ne suis encore jamais allé en Espagne. |  |
| **erst** (imposé) | `only_then` | seulement, pas avant (plus tard que prévu) | erst + indication de temps | Der Film beginnt erst um neun Uhr. | Le film ne commence qu'à neuf heures. | A2 |
|  |  |  |  | Er ist erst gestern Abend aus Rom zurückgekommen. | Il n'est rentré de Rome qu'hier soir. |  |
|  | `only_amount` | seulement (quantité encore faible, appelée à augmenter) | erst + nombre / quantité | Meine Tochter ist erst drei Jahre alt. | Ma fille n'a que trois ans. | B1 |
|  |  |  |  | Ich habe das Buch erst zur Hälfte gelesen. | Je n'ai lu que la moitié du livre pour l'instant. |  |
|  | `first` | d'abord (première étape) | erst + verbe + sujet …, dann + verbe + sujet … | Erst essen wir, dann gehen wir spazieren. | D'abord nous mangeons, ensuite nous allons nous promener. | A2 |
|  |  |  |  | Mach erst deine Hausaufgaben, dann darfst du spielen. | Fais d'abord tes devoirs, ensuite tu pourras jouer. |  |
| **da** (imposé) | `place` | là, ici, présent | da + sein / da + verbe + sujet … | Da kommt mein Bus, ich muss los. | Voilà mon bus, je dois y aller. | A1 |
|  |  |  |  | Ist Herr Müller heute nicht da? | M. Müller n'est pas là aujourd'hui ? |  |
|  | `time_then` | alors, à ce moment-là (récit) | …, da + verbe + sujet … | Wir saßen beim Essen, da klingelte das Telefon. | Nous étions à table quand le téléphone a sonné. | B1 |
|  |  |  |  | Da wusste ich, dass etwas nicht stimmte. | À ce moment-là, j'ai su que quelque chose n'allait pas. |  |
|  | `cause_known` | comme, puisque (cause connue) | da + sujet + … + verbe conjugué, verbe conjugué + sujet … | Da es regnet, bleiben wir heute zu Hause. | Comme il pleut, nous restons à la maison aujourd'hui. | B1 |
|  |  |  |  | Da du schon hier bist, kannst du mir helfen. | Puisque tu es déjà là, tu peux m'aider. |  |
| **denn** (imposé) | `cause_coord` | car | …, denn + sujet + verbe + … | Ich bleibe zu Hause, denn ich bin krank. | Je reste à la maison car je suis malade. | A2 |
|  |  |  |  | Wir nehmen ein Taxi, denn es ist schon spät. | Nous prenons un taxi car il est déjà tard. |  |
|  | `modal_particle` | particule des questions (« donc », curiosité) | (mot interrogatif) + verbe + sujet + denn + … ? | Was machst du denn so spät hier? | Qu'est-ce que tu fais donc ici si tard ? | B1 |
|  |  |  |  | Wo warst du denn die ganze Zeit? | Mais où étais-tu donc tout ce temps ? |  |
| **weil** (imposé) | `cause_sub` | parce que | …, weil + sujet + … + verbe conjugué | Ich bleibe zu Hause, weil ich krank bin. | Je reste à la maison parce que je suis malade. | A2 |
|  |  |  |  | Sie lernt Deutsch, weil sie in Wien arbeiten möchte. | Elle apprend l'allemand parce qu'elle voudrait travailler à Vienne. |  |
| **zu** (imposé) | `direction` | chez, à, vers (direction) | zu + datif | Morgen muss ich zum Arzt gehen. | Demain, je dois aller chez le médecin. | A2 |
|  |  |  |  | Kommst du heute Abend zu mir? | Tu viens chez moi ce soir ? |  |
|  | `infinitive` | de, à (+ infinitif) | …, (…) + zu + infinitif | Ich habe keine Lust, heute zu kochen. | Je n'ai pas envie de cuisiner aujourd'hui. | A2 |
|  |  |  |  | Vergiss nicht, vor dem Urlaub die Fenster zuzumachen. | N'oublie pas de fermer les fenêtres avant les vacances. |  |
|  | `too` | trop (+ adjectif) | zu + adjectif / adverbe | Der Kaffee ist noch zu heiß zum Trinken. | Le café est encore trop chaud pour être bu. | A2 |
|  |  |  |  | Du fährst viel zu schnell, pass auf! | Tu roules beaucoup trop vite, fais attention ! |  |
| **lassen** (imposé) | `let` | laisser (permettre) | sujet + lassen + COD + … + infinitif | Meine Eltern lassen mich nicht allein reisen. | Mes parents ne me laissent pas voyager seul. | A2 |
|  |  |  |  | Lass mich bitte zuerst meinen Satz beenden! | Laisse-moi d'abord finir ma phrase, s'il te plaît ! |  |
|  | `causative` | faire faire (par quelqu'un d'autre) | sujet + lassen + (sich) + COD + … + infinitif | Ich lasse mein Auto in der Werkstatt reparieren. | Je fais réparer ma voiture au garage. | B1 |
|  |  |  |  | Sie lässt sich morgen die Haare schneiden. | Elle se fait couper les cheveux demain. |  |
|  | `leave_stop` | laisser (quelque part), arrêter | sujet + lassen + COD (+ lieu) | Ich habe meinen Schirm im Zug gelassen. | J'ai laissé mon parapluie dans le train. | A2 |
|  |  |  |  | Lass das, du machst es nur noch schlimmer! | Arrête ça, tu ne fais qu'aggraver les choses ! |  |
|  | `lets_proposal` | allons… (proposition : lass uns) | lass/lasst uns + … + infinitif | Lass uns heute Abend eine Pizza bestellen! | Commandons une pizza ce soir ! | B1 |
|  |  |  |  | Lasst uns endlich anfangen, es ist schon spät. | Commençons enfin, il est déjà tard. |  |
| **werden** (imposé) | `become` | devenir | sujet + werden + adjectif / nom | Im Herbst werden die Tage kürzer. | En automne, les jours deviennent plus courts. | A2 |
|  |  |  |  | Meine kleine Schwester möchte später Ärztin werden. | Ma petite sœur veut devenir médecin plus tard. |  |
|  | `future` | futur (werden + infinitif) | sujet + werden + … + infinitif | Ich werde dich morgen früh anrufen. | Je t'appellerai demain matin. | A2 |
|  |  |  |  | Es wird heute Nachmittag bestimmt regnen. | Il va sûrement pleuvoir cet après-midi. |  |
|  | `passive` | passif (werden + participe passé) | sujet + werden + … + participe passé | Das Haus wurde im Jahr 1950 gebaut. | La maison a été construite en 1950. | B1 |
|  |  |  |  | In diesem Laden wird kein Bargeld akzeptiert. | Dans ce magasin, l'argent liquide n'est pas accepté. |  |
|  | `conditional` | conditionnel (würde + infinitif) | sujet + würde + … + infinitif | Ich würde gern ein Jahr im Ausland leben. | J'aimerais vivre un an à l'étranger. | B1 |
|  |  |  |  | Würden Sie bitte das Fenster schließen? | Pourriez-vous fermer la fenêtre, s'il vous plaît ? |  |
| **ob** (imposé) | `indirect_yesno` | si (question indirecte oui/non) | …, ob + sujet + … + verbe conjugué | Ich weiß nicht, ob er heute kommt. | Je ne sais pas s'il vient aujourd'hui. | A2 |
|  |  |  |  | Kannst du fragen, ob der Laden noch offen ist? | Peux-tu demander si le magasin est encore ouvert ? |  |
|  | `whether_or` | que … ou (peu importe) | ob … oder …, verbe conjugué + sujet … | Ob du willst oder nicht, wir fahren morgen. | Que tu le veuilles ou non, nous partons demain. | B2 |
|  |  |  |  | Ob arm oder reich, alle sind hier willkommen. | Riches ou pauvres, tous sont les bienvenus ici. |  |
| **ja** (imposé) | `yes` | oui | Ja, + phrase | Ja, ich komme gern mit ins Kino. | Oui, je viens volontiers au cinéma. | A1 |
|  |  |  |  | Ist das Restaurant heute offen? – Ja, bis zehn. | Le restaurant est ouvert aujourd'hui ? – Oui, jusqu'à dix heures. |  |
|  | `modal_particle_known` | particule modale (évidence partagée) | sujet + verbe + ja + … | Du weißt ja, dass ich keinen Fisch esse. | Tu sais bien que je ne mange pas de poisson. | B1 |
|  |  |  |  | Das ist ja gar kein Problem für mich. | Mais ce n'est pas du tout un problème pour moi. |  |
|  | `modal_particle_surprise` | particule modale (surprise) | sujet + verbe + ja + … ! | Du bist ja schon wieder zu Hause! | Mais tu es déjà rentré ! | B1 |
|  |  |  |  | Das ist ja eine tolle Überraschung! | Mais quelle belle surprise ! |  |
|  | `warning` | surtout (mise en garde, accentué) | impératif + ja + nicht/kein … ! | Komm ja nicht zu spät nach Hause! | Surtout, ne rentre pas trop tard ! | B2 |
|  |  |  |  | Sag ja niemandem etwas von unserem Plan! | Surtout, ne dis rien à personne de notre plan ! |  |
| **mal** (imposé) | `times` | fois (nombre de fois) | nombre + mal | Ich war schon dreimal in Berlin. | Je suis déjà allé trois fois à Berlin. | A2 |
|  |  |  |  | Ich habe dich zweimal angerufen, aber niemand ging ran. | Je t'ai appelé deux fois, mais personne n'a répondu. |  |
|  | `modal_particle` | particule modale (adoucit une demande) | impératif / question + mal + … | Kannst du mal kurz das Fenster aufmachen? | Tu peux ouvrir la fenêtre un instant ? | A2 |
|  |  |  |  | Schau mal, da drüben ist ein Reh! | Regarde, là-bas il y a un chevreuil ! |  |
|  | `sometime` | un jour, autrefois (moment indéfini) | sujet + verbe + mal + … | Wir sollten mal wieder ins Theater gehen. | Nous devrions retourner au théâtre un de ces jours. | B1 |
|  |  |  |  | Ich war mal Lehrer in einer kleinen Stadt. | J'ai été professeur autrefois dans une petite ville. |  |
| **eben** (imposé) | `just_now` | à l'instant, venir de | sujet + auxiliaire + eben + … + participe | Sie ist eben nach Hause gegangen. | Elle vient de rentrer chez elle. | B1 |
|  |  |  |  | Ich habe eben mit deiner Mutter telefoniert. | Je viens de téléphoner avec ta mère. |  |
|  | `flat` | plat, plan (adjectif) | eben / ein ebener … + nom | Die Landschaft hier im Norden ist ganz eben. | Le paysage ici dans le Nord est tout plat. | B1 |
|  |  |  |  | Wir suchen einen ebenen Platz für das Zelt. | Nous cherchons un endroit plat pour la tente. |  |
|  | `modal_particle` | particule modale (c'est comme ça, tant pis) | sujet + verbe + eben + … | Das ist eben so, da kann man nichts machen. | C'est comme ça, on n'y peut rien. | B2 |
|  |  |  |  | Dann nehmen wir eben den nächsten Zug. | Tant pis, nous prendrons le train suivant. |  |
|  | `agreement` | justement ! (approbation) | Eben! / Eben, … | Eben! Das sage ich doch die ganze Zeit. | Justement ! C'est ce que je dis depuis le début. | B1 |
|  |  |  |  | Aber das ist teuer. – Eben, deshalb kaufe ich es nicht. | Mais c'est cher. – Justement, c'est pour ça que je ne l'achète pas. |  |
| **in** | `location_dative` | dans, à (lieu sans mouvement, + datif) | in + datif (im = in dem) | Das Buch liegt in der Tasche. | Le livre est dans le sac. | A2 |
|  |  |  |  | Wir wohnen seit Jahren in einem kleinen Dorf. | Nous habitons depuis des années dans un petit village. |  |
|  | `direction_accusative` | dans, à, au (direction, + accusatif) | in + accusatif (ins = in das) | Ich lege das Buch in die Tasche. | Je mets le livre dans le sac. | A2 |
|  |  |  |  | Gehen wir heute Abend zusammen ins Kino? | On va au cinéma ensemble ce soir ? |  |
|  | `time` | dans (délai), en (mois, saison) | in + datif (temps) | Der Zug fährt in zehn Minuten ab. | Le train part dans dix minutes. | A2 |
|  |  |  |  | Im Sommer fahren wir immer an die See. | En été, nous allons toujours à la mer. |  |
| **von** | `origin` | de (provenance, point de départ) | von + datif | Ich komme gerade von der Arbeit. | Je rentre juste du travail. | A2 |
|  |  |  |  | Der Zug fährt von Berlin nach München. | Le train va de Berlin à Munich. |  |
|  | `possession` | de (appartenance, à la place du génitif) | nom + von + datif | Das ist das Auto von meinem Bruder. | C'est la voiture de mon frère. | A2 |
|  |  |  |  | Ein Freund von mir wohnt jetzt in Zürich. | Un ami à moi habite maintenant à Zurich. |  |
|  | `passive_agent` | par (complément d'agent du passif) | werden + … + von + datif + … + participe passé | Das Bild wurde von einem Kind gemalt. | Le tableau a été peint par un enfant. | B1 |
|  |  |  |  | Er wurde gestern von seinem Chef gelobt. | Il a été félicité hier par son chef. |  |
| **es** | `personal` | il, elle, le, la (nom neutre) | es = nom neutre déjà cité | Wo ist das Buch? Ich finde es nicht. | Où est le livre ? Je ne le trouve pas. | A1 |
|  |  |  |  | Das Kind ist müde, es will schlafen. | L'enfant est fatigué, il veut dormir. |  |
|  | `impersonal` | il impersonnel (météo, es gibt…) | es + verbe impersonnel | Heute Morgen hat es stark geregnet. | Ce matin, il a beaucoup plu. | A2 |
|  |  |  |  | In dieser Stadt gibt es viele Museen. | Dans cette ville, il y a beaucoup de musées. |  |
|  | `placeholder` | il, ça (annonce une subordonnée) | es + verbe + …, dass … / zu + infinitif | Es freut mich, dass du gekommen bist. | Ça me fait plaisir que tu sois venu. | B2 |
|  |  |  |  | Es ist wichtig, genug Wasser zu trinken. | Il est important de boire assez d'eau. |  |
| **auf** | `on_dative` | sur, à (position, + datif) | auf + datif | Das Handy liegt auf dem Tisch. | Le portable est sur la table. | A2 |
|  |  |  |  | Wir haben uns auf einer Party kennengelernt. | Nous nous sommes rencontrés à une fête. |  |
|  | `on_accusative` | sur, à (direction, + accusatif) | auf + accusatif | Stell die Vase bitte auf den Tisch. | Pose le vase sur la table, s'il te plaît. | A2 |
|  |  |  |  | Am Wochenende gehen wir auf den Markt. | Le week-end, nous allons au marché. |  |
|  | `verb_complement` | (complément de certains verbes : warten auf…) | verbe + auf + accusatif | Ich warte schon lange auf den Bus. | J'attends le bus depuis longtemps. | B1 |
|  |  |  |  | Wir freuen uns sehr auf die Ferien. | Nous attendons les vacances avec impatience. |  |
|  | `language` | en (langue : auf Deutsch) | auf + Deutsch / Englisch … | Wie sagt man das auf Deutsch? | Comment dit-on ça en allemand ? | A2 |
|  |  |  |  | Der Film läuft auf Englisch mit Untertiteln. | Le film passe en anglais avec des sous-titres. |  |
| **sie** | `she` | elle, la (3e personne du singulier) | sie + verbe (3e sg : -t) | Meine Schwester? Sie arbeitet in einer Bank. | Ma sœur ? Elle travaille dans une banque. | A1 |
|  |  |  |  | Die Tasche ist neu, ich habe sie gestern gekauft. | Le sac est neuf, je l'ai acheté hier. |  |
|  | `they` | ils, elles (3e personne du pluriel) | sie + verbe (pluriel : -en) | Meine Eltern? Sie wohnen jetzt in Spanien. | Mes parents ? Ils habitent maintenant en Espagne. | A1 |
|  |  |  |  | Die Kinder spielen draußen, sie sind sehr laut. | Les enfants jouent dehors, ils sont très bruyants. |  |
|  | `formal_you` | vous (politesse : Sie) | Sie + verbe (pluriel : -en) | Können Sie mir bitte kurz helfen, Frau Weber? | Pouvez-vous m'aider un instant, Madame Weber ? | A1 |
|  |  |  |  | Wie lange wohnen Sie schon hier? | Depuis combien de temps habitez-vous ici ? |  |
| **so** | `manner` | ainsi, comme ça | sujet + verbe + so + … | Ist das so richtig, oder muss ich es anders machen? | C'est bien comme ça, ou je dois faire autrement ? | A2 |
|  |  |  |  | So habe ich das noch nie gesehen. | Je n'avais jamais vu les choses ainsi. |  |
|  | `intensifier` | si, tellement | so + adjectif | Das Essen gestern Abend war so lecker! | Le repas d'hier soir était tellement bon ! | A2 |
|  |  |  |  | Warum bist du heute so müde? | Pourquoi es-tu si fatigué aujourd'hui ? |  |
|  | `comparison_equal` | aussi … que (so … wie) | so + adjectif + wie + élément comparé | Ich bin leider nicht so sportlich wie du. | Je ne suis malheureusement pas aussi sportif que toi. | A2 |
|  |  |  |  | Komm bitte so schnell wie möglich nach Hause! | Rentre aussi vite que possible, s'il te plaît ! |  |
|  | `consequence` | si bien que (sodass) | …, sodass + sujet + … + verbe conjugué | Es regnete stark, sodass wir zu Hause blieben. | Il pleuvait fort, si bien que nous sommes restés à la maison. | B1 |
|  |  |  |  | Der Bus kam spät, sodass ich den Zug verpasste. | Le bus est arrivé en retard, si bien que j'ai raté le train. |  |
| **aber** | `contrast` | mais | …, aber + sujet + verbe + … | Ich bin müde, aber ich muss noch arbeiten. | Je suis fatigué, mais je dois encore travailler. | A1 |
|  |  |  |  | Das Hotel ist klein, aber sehr gemütlich. | L'hôtel est petit, mais très confortable. |  |
|  | `modal_particle` | particule modale (étonnement, admiration) | sujet + verbe + aber + adjectif … ! | Du bist aber groß geworden seit letztem Jahr! | Qu'est-ce que tu as grandi depuis l'an dernier ! | B1 |
|  |  |  |  | Das ist aber ein schönes Geschenk! | Quel beau cadeau ! |  |
| **nach** | `direction_place` | à, en, vers (villes, pays, nach Hause) | nach + nom de lieu sans article | Ich fliege nächste Woche nach Spanien. | Je pars en Espagne en avion la semaine prochaine. | A2 |
|  |  |  |  | Wann gehst du heute nach Hause? | Quand rentres-tu à la maison aujourd'hui ? |  |
|  | `time_after` | après (temps) | nach + datif | Nach dem Essen trinken wir einen Kaffee. | Après le repas, nous buvons un café. | A2 |
|  |  |  |  | Es ist schon zehn nach acht, wir sind spät. | Il est déjà huit heures dix, nous sommes en retard. |  |
|  | `according` | selon, d'après | (nom au datif) + nach / nach + datif | Meiner Meinung nach ist das viel zu teuer. | À mon avis, c'est beaucoup trop cher. | B1 |
|  |  |  |  | Nach dem Wetterbericht soll es morgen schneien. | D'après la météo, il devrait neiger demain. |  |
| **nur** | `only` | seulement, ne … que (restriction) | nur + élément restreint | Ich habe nur zehn Euro dabei. | Je n'ai que dix euros sur moi. | A2 |
|  |  |  |  | Das Museum ist nur am Wochenende geöffnet. | Le musée n'est ouvert que le week-end. |  |
|  | `modal_particle` | particule modale (souhait, encouragement) | wenn + sujet + nur + … ! / impératif + nur + … | Wenn ich nur früher aufgestanden wäre! | Si seulement je m'étais levé plus tôt ! | B2 |
|  |  |  |  | Komm nur herein, die Tür ist offen! | Entre donc, la porte est ouverte ! |  |
| **was** | `question_what` | que, quoi, qu'est-ce que (question) | was + verbe + sujet … ? | Was machst du am Wochenende mit deinen Freunden? | Que fais-tu ce week-end avec tes amis ? | A1 |
|  |  |  |  | Was hast du gestern Abend gegessen? | Qu'as-tu mangé hier soir ? |  |
|  | `relative` | ce que, ce qui (relatif) | alles / nichts / phrase, was + … + verbe conjugué | Das ist alles, was ich weiß. | C'est tout ce que je sais. | B1 |
|  |  |  |  | Er hat den Job bekommen, was mich sehr freut. | Il a obtenu le poste, ce qui me réjouit beaucoup. |  |
|  | `something` | quelque chose (familier = etwas) | sujet + verbe + was + … | Möchtest du noch was zu trinken? | Tu veux encore quelque chose à boire ? | B1 |
|  |  |  |  | Ich muss dir was Wichtiges erzählen. | Je dois te raconter quelque chose d'important. |  |
| **um** | `clock_time` | à (heure précise) | um + heure | Der Kurs beginnt um halb neun. | Le cours commence à huit heures et demie. | A1 |
|  |  |  |  | Treffen wir uns um sieben am Bahnhof? | On se retrouve à sept heures à la gare ? |  |
|  | `around` | autour de (+ accusatif) | um + accusatif | Wir sitzen alle um den großen Tisch. | Nous sommes tous assis autour de la grande table. | A2 |
|  |  |  |  | Gehen Sie um die Ecke und dann links. | Tournez au coin, puis à gauche. |  |
|  | `purpose` | pour (um … zu + infinitif) | …, um + … + zu + infinitif | Ich lerne Deutsch, um in Berlin zu studieren. | J'apprends l'allemand pour étudier à Berlin. | B1 |
|  |  |  |  | Sie spart Geld, um ein Auto zu kaufen. | Elle économise pour acheter une voiture. |  |
|  | `verb_complement` | (complément : es geht um, sich kümmern um) | expression + um + accusatif | Worum geht es eigentlich in dem Film? | De quoi parle le film, au fait ? | B1 |
|  |  |  |  | Kannst du dich am Wochenende um die Katze kümmern? | Peux-tu t'occuper du chat ce week-end ? |  |
| **über** | `above` | au-dessus de, par-dessus (datif / accusatif) | über + datif (position) / accusatif (mouvement) | Die Lampe hängt direkt über dem Tisch. | La lampe est suspendue juste au-dessus de la table. | A2 |
|  |  |  |  | Wir sind mit dem Fahrrad über die Brücke gefahren. | Nous avons traversé le pont à vélo. |  |
|  | `about_topic` | sur, au sujet de | verbe / nom + über + accusatif | Wir haben lange über das Problem gesprochen. | Nous avons longuement parlé du problème. | A2 |
|  |  |  |  | Ich lese gerade ein Buch über die Geschichte Berlins. | Je lis en ce moment un livre sur l'histoire de Berlin. |  |
|  | `more_than` | plus de (quantité) | über + nombre | Das Konzert hat über zwei Stunden gedauert. | Le concert a duré plus de deux heures. | B1 |
|  |  |  |  | Über hundert Leute waren auf der Feier. | Plus de cent personnes étaient à la fête. |  |
|  | `via` | par, via | über + lieu / personne (accusatif) | Wir fahren über Frankfurt nach Köln. | Nous allons à Cologne en passant par Francfort. | B1 |
|  |  |  |  | Ich habe die Wohnung über einen Freund gefunden. | J'ai trouvé l'appartement par un ami. |  |
| **vor** | `in_front` | devant (datif / accusatif) | vor + datif (position) / accusatif (mouvement) | Das Taxi wartet schon vor dem Hotel. | Le taxi attend déjà devant l'hôtel. | A2 |
|  |  |  |  | Stell die Schuhe bitte vor die Tür. | Mets les chaussures devant la porte, s'il te plaît. |  |
|  | `before` | avant (temps) | vor + datif (temps) | Vor dem Frühstück gehe ich immer joggen. | Avant le petit-déjeuner, je vais toujours courir. | A2 |
|  |  |  |  | Es ist zehn vor neun, der Kurs beginnt gleich. | Il est neuf heures moins dix, le cours commence bientôt. |  |
|  | `ago` | il y a (durée écoulée) | vor + durée (datif) + verbe au passé | Ich habe ihn vor drei Jahren kennengelernt. | Je l'ai rencontré il y a trois ans. | A2 |
|  |  |  |  | Vor einer Woche war ich noch in Paris. | Il y a une semaine, j'étais encore à Paris. |  |
|  | `cause_emotion` | de (cause : Angst vor, vor Kälte) | nom / verbe + vor + datif | Mein Sohn hat Angst vor großen Hunden. | Mon fils a peur des gros chiens. | B1 |
|  |  |  |  | Nach dem Bad im See zitterte sie vor Kälte. | Après la baignade dans le lac, elle tremblait de froid. |  |
| **bis** | `until_prep` | jusqu'à (temps, lieu) | bis + heure / lieu / bis zu + datif | Das Geschäft ist bis 20 Uhr geöffnet. | Le magasin est ouvert jusqu'à 20 heures. | A2 |
|  |  |  |  | Fahren Sie bis zur nächsten Ampel. | Roulez jusqu'au prochain feu. |  |
|  | `until_conj` | jusqu'à ce que | …, bis + sujet + … + verbe conjugué | Wir warten hier, bis der Regen aufhört. | Nous attendons ici jusqu'à ce que la pluie s'arrête. | B1 |
|  |  |  |  | Bleib im Bett, bis du wieder gesund bist. | Reste au lit jusqu'à ce que tu sois guéri. |  |
|  | `farewell` | à (bis bald, bis morgen) | bis + moment ! | Tschüss, bis morgen in der Schule! | Salut, à demain à l'école ! | A1 |
|  |  |  |  | Bis später, ich rufe dich heute Abend an! | À plus tard, je t'appelle ce soir ! |  |
| **immer** | `always` | toujours (habitude) | sujet + verbe + immer + … | Am Sonntag frühstücken wir immer zusammen im Garten. | Le dimanche, nous prenons toujours le petit-déjeuner ensemble au jardin. | A2 |
|  |  |  |  | Er kommt immer zu spät zur Arbeit. | Il arrive toujours en retard au travail. |  |
|  | `still` | toujours, encore (immer noch) | immer noch / noch immer | Es regnet immer noch, wir bleiben drinnen. | Il pleut toujours, nous restons à l'intérieur. | B1 |
|  |  |  |  | Wartest du immer noch auf eine Antwort von ihm? | Tu attends toujours une réponse de sa part ? |  |
|  | `increasing` | de plus en plus (immer + comparatif) | immer + comparatif | Im November werden die Tage immer kürzer. | En novembre, les jours sont de plus en plus courts. | B1 |
|  |  |  |  | Dein Deutsch wird wirklich immer besser! | Ton allemand est vraiment de mieux en mieux ! |  |
| **also** | `consequence` | donc (faux ami) | …, also + verbe + sujet + … | Es ist spät, also gehe ich jetzt nach Hause. | Il est tard, donc je rentre maintenant. | A2 |
|  |  |  |  | Du hast Fieber, also bleibst du heute im Bett. | Tu as de la fièvre, donc tu restes au lit aujourd'hui. |  |
|  | `discourse` | bon, alors (marqueur de discours) | Also, … / Also gut, … | Also, wo waren wir stehen geblieben? | Bon, où en étions-nous ? | A2 |
|  |  |  |  | Also gut, dann treffen wir uns um acht. | Bon d'accord, alors on se retrouve à huit heures. |  |
| **ganz** | `whole` | entier, tout le (adjectif) | der/die/das ganze + nom | Ich habe den ganzen Tag gearbeitet. | J'ai travaillé toute la journée. | A2 |
|  |  |  |  | Die ganze Familie kommt zu Weihnachten. | Toute la famille vient à Noël. |  |
|  | `completely` | complètement, tout à fait | ganz + verbe / adjectif | Oh, das habe ich ganz vergessen, Entschuldigung! | Oh, j'ai complètement oublié, pardon ! | A2 |
|  |  |  |  | Bist du dir ganz sicher, dass er kommt? | Es-tu tout à fait sûr qu'il vient ? |  |
|  | `fairly` | assez, plutôt (atténuation) | ganz + adjectif (non accentué) | Der Film war ganz gut, aber nicht super. | Le film était plutôt bien, mais pas génial. | B1 |
|  |  |  |  | Das Hotel war ganz nett, nur etwas laut. | L'hôtel était assez sympa, juste un peu bruyant. |  |
| **damit** | `purpose` | pour que, afin que | …, damit + sujet + … + verbe conjugué | Ich spreche langsam, damit mich alle verstehen. | Je parle lentement pour que tout le monde me comprenne. | B1 |
|  |  |  |  | Nimm eine Jacke mit, damit du nicht frierst. | Prends une veste pour ne pas avoir froid. |  |
|  | `with_that` | avec cela, en (adverbe pronominal) | verbe + damit (= mit + chose) | Das ist ein altes Handy. Was machst du damit? | C'est un vieux portable. Qu'est-ce que tu en fais ? | B1 |
|  |  |  |  | Bist du damit einverstanden, dass wir später essen? | Es-tu d'accord pour qu'on mange plus tard ? |  |
| **einfach** | `simple` | simple, facile ; aller simple | einfach / ein einfacher … + nom | Die Prüfung war einfacher als gedacht. | L'examen était plus facile que prévu. | A2 |
|  |  |  |  | Ich hätte gern eine einfache Fahrt nach Bonn. | Je voudrais un aller simple pour Bonn. |  |
|  | `modal_particle` | tout simplement (particule) | sujet + verbe + einfach + … | Ich habe einfach keine Lust mehr. | Je n'ai tout simplement plus envie. | B1 |
|  |  |  |  | Ruf ihn doch einfach morgen früh an! | Appelle-le simplement demain matin ! |  |
| **etwas** | `something` | quelque chose | etwas (+ Adjectif-es) | Ich muss dir heute etwas Wichtiges sagen. | Je dois te dire quelque chose d'important aujourd'hui. | A2 |
|  |  |  |  | Hast du in letzter Zeit etwas von Anna gehört? | As-tu eu des nouvelles d'Anna récemment ? |  |
|  | `a_little` | un peu | etwas + adjectif / nom sans article | Ich bin heute Abend etwas müde. | Je suis un peu fatigué ce soir. | A2 |
|  |  |  |  | Kann ich bitte noch etwas Milch haben? | Est-ce que je peux avoir encore un peu de lait ? |  |
| **seit** | `since_prep` | depuis (+ datif, verbe au présent) | sujet + verbe au présent + seit + datif | Ich wohne seit 2020 in Leipzig. | J'habite à Leipzig depuis 2020. | A2 |
|  |  |  |  | Seit einer Woche ist sie krank. | Elle est malade depuis une semaine. |  |
|  | `since_conj` | depuis que | seit + sujet + … + verbe conjugué, verbe conjugué + sujet … | Seit er in Berlin wohnt, fährt er Fahrrad. | Depuis qu'il habite à Berlin, il fait du vélo. | B1 |
|  |  |  |  | Ich bin glücklicher, seit ich weniger arbeite. | Je suis plus heureux depuis que je travaille moins. |  |
| **selbst** | `oneself` | moi-même, soi-même (en personne) | sujet + verbe + … + selbst | Hast du den Kuchen selbst gebacken? | As-tu fait le gâteau toi-même ? | A2 |
|  |  |  |  | Das muss er am Ende selbst entscheiden. | Au bout du compte, c'est à lui de décider. |  |
|  | `even` | même (= sogar) | selbst + nom / groupe | Selbst mein Vater fand den Film lustig. | Même mon père a trouvé le film drôle. | B2 |
|  |  |  |  | Selbst im Sommer ist es hier oben kühl. | Même en été, il fait frais ici en altitude. |  |
| **wo** | `question_where` | où (lieu sans mouvement) | wo + verbe + sujet … ? | Wo ist hier die nächste Apotheke? | Où est la pharmacie la plus proche ? | A1 |
|  |  |  |  | Wo hast du deinen Schlüssel gelassen? | Où as-tu laissé ta clé ? |  |
|  | `relative` | où (relatif de lieu ou de temps) | nom, wo + sujet + … + verbe conjugué | Das ist das Café, wo wir uns kennengelernt haben. | C'est le café où nous nous sommes rencontrés. | B1 |
|  |  |  |  | An dem Tag, wo du kamst, hat es geschneit. | Le jour où tu es venu, il a neigé. |  |
| **dabei** | `with_present` | sur soi, de la partie (dabeihaben, dabei sein) | dabeihaben / dabei sein | Hast du deinen Ausweis und dein Ticket dabei? | As-tu ta carte d'identité et ton billet sur toi ? | B1 |
|  |  |  |  | Morgen spielen wir Fußball, bist du dabei? | Demain on joue au foot, tu es partant ? |  |
|  | `while_doing` | en même temps, en le faisant | sujet + verbe + dabei + … | Er kocht und hört dabei laut Musik. | Il cuisine en écoutant de la musique à fond. | B1 |
|  |  |  |  | Ich helfe dir gern dabei, die Wohnung zu streichen. | Je t'aide volontiers à peindre l'appartement. |  |
|  | `contrast` | alors que, pourtant | …, dabei + verbe + sujet + … | Er ist immer müde, dabei schläft er viel. | Il est toujours fatigué, alors qu'il dort beaucoup. | B2 |
|  |  |  |  | Sie hat nicht angerufen, dabei hatte sie es versprochen. | Elle n'a pas appelé, alors qu'elle l'avait promis. |  |
| **gerade** | `right_now` | en ce moment, être en train de | sujet + verbe au présent + gerade + … | Ich kann nicht, ich koche gerade. | Je ne peux pas, je suis en train de cuisiner. | A2 |
|  |  |  |  | Er telefoniert gerade mit seinem Chef. | Il est en train de téléphoner avec son chef. |  |
|  | `just_now` | venir de (à l'instant) | sujet + auxiliaire + gerade + … + participe | Sie ist gerade nach Hause gekommen. | Elle vient de rentrer à la maison. | A2 |
|  |  |  |  | Ich habe gerade eine Nachricht von dir bekommen. | Je viens de recevoir un message de toi. |  |
|  | `straight_even` | droit ; pair (adjectif) | gerade / eine gerade … + nom | Setz dich bitte gerade hin beim Essen! | Tiens-toi droit à table, s'il te plaît ! | B1 |
|  |  |  |  | Zwei, vier und sechs sind gerade Zahlen. | Deux, quatre et six sont des nombres pairs. |  |
|  | `precisely` | justement, précisément | gerade + élément mis en relief | Gerade heute habe ich keine Zeit. | C'est justement aujourd'hui que je n'ai pas le temps. | B2 |
|  |  |  |  | Das ist ja gerade das Problem bei diesem Plan. | C'est justement le problème de ce plan. |  |
| **wohl** | `probably` | sans doute, probablement (supposition) | sujet + verbe + wohl + … | Er ist wohl krank, er antwortet nicht. | Il est sans doute malade, il ne répond pas. | B1 |
|  |  |  |  | Das wird wohl noch eine Weile dauern. | Ça va sûrement encore prendre un moment. |  |
|  | `well_being` | bien (se sentir bien) | sich wohl fühlen / mir ist wohl | In meiner neuen Wohnung fühle ich mich sehr wohl. | Je me sens très bien dans mon nouvel appartement. | B1 |
|  |  |  |  | Mir ist heute nicht wohl, ich bleibe zu Hause. | Je ne me sens pas bien aujourd'hui, je reste à la maison. |  |
|  | `concession` | certes (wohl …, aber) | sujet + verbe + wohl + …, aber … | Das ist wohl wahr, aber es hilft uns nicht. | C'est sans doute vrai, mais ça ne nous aide pas. | B2 |
|  |  |  |  | Er hat wohl Talent, aber er übt zu wenig. | Il a certes du talent, mais il ne s'entraîne pas assez. |  |
| **vielleicht** | `perhaps` | peut-être | vielleicht + verbe + sujet + … | Vielleicht regnet es morgen, nimm einen Schirm mit. | Il va peut-être pleuvoir demain, prends un parapluie. | A2 |
|  |  |  |  | Kommst du mit? – Vielleicht, ich weiß noch nicht. | Tu viens ? – Peut-être, je ne sais pas encore. |  |
|  | `polite_request` | par hasard (question polie) | verbe + sujet + vielleicht + … ? | Können Sie mir vielleicht kurz helfen? | Pourriez-vous m'aider un instant, par hasard ? | B1 |
|  |  |  |  | Hast du vielleicht einen Stift für mich? | Tu n'aurais pas un stylo pour moi ? |  |
|  | `exclamation` | particule d'exclamation (vraiment, quel…) | sujet + verbe + vielleicht + … ! | Das war vielleicht ein langer Tag! | Quelle longue journée ! | B2 |
|  |  |  |  | Mensch, du bist heute vielleicht gut gelaunt! | Dis donc, qu'est-ce que tu es de bonne humeur aujourd'hui ! |  |
| **bitte** | `please` | s'il te plaît, s'il vous plaît | impératif + bitte + … / …, bitte | Einen Kaffee, bitte, mit etwas Milch. | Un café, s'il vous plaît, avec un peu de lait. | A1 |
|  |  |  |  | Mach bitte die Tür zu, es zieht. | Ferme la porte, s'il te plaît, il y a un courant d'air. |  |
|  | `you_are_welcome` | de rien, je vous en prie (après danke) | Danke! – Bitte (schön / gern geschehen). | Danke für die Hilfe! – Bitte, gern geschehen. | Merci pour l'aide ! – De rien, avec plaisir. | A1 |
|  |  |  |  | Vielen Dank! – Bitte schön, kein Problem. | Merci beaucoup ! – Je vous en prie, pas de problème. |  |
|  | `pardon` | pardon ? (faire répéter) | (Wie) bitte? | Wie bitte? Können Sie das noch mal wiederholen? | Pardon ? Pouvez-vous répéter encore une fois ? | A1 |
|  |  |  |  | Bitte? Ich habe dich leider nicht verstanden. | Pardon ? Je ne t'ai malheureusement pas compris. |  |
|  | `here_you_are` | tenez, voilà ; je vous en prie (offrir) | Bitte (sehr / schön), … | Hier ist Ihr Wechselgeld, bitte sehr. | Voici votre monnaie, tenez. | A2 |
|  |  |  |  | Bitte, nehmen Sie doch hier am Fenster Platz! | Je vous en prie, asseyez-vous ici près de la fenêtre ! |  |
| **während** | `during` | pendant (+ génitif) | während + génitif | Während des Films ist er eingeschlafen. | Il s'est endormi pendant le film. | B1 |
|  |  |  |  | Während der Ferien arbeite ich in einem Café. | Pendant les vacances, je travaille dans un café. |  |
|  | `while` | pendant que (simultanéité) | während + sujet + … + verbe conjugué | Während ich koche, deckst du den Tisch. | Pendant que je cuisine, tu mets la table. | B1 |
|  |  |  |  | Er hat angerufen, während du geschlafen hast. | Il a appelé pendant que tu dormais. |  |
|  | `whereas` | tandis que, alors que (opposition) | …, während + sujet + … + verbe conjugué | Ich mag Kaffee, während meine Frau nur Tee trinkt. | J'aime le café, tandis que ma femme ne boit que du thé. | B2 |
|  |  |  |  | Während er sehr ruhig ist, redet sie gern. | Alors qu'il est très calme, elle aime parler. |  |
| **etwa** | `approximately` | environ, à peu près | etwa + nombre | Die Fahrt dauert etwa zwei Stunden. | Le trajet dure environ deux heures. | A2 |
|  |  |  |  | In der Klasse sind etwa zwanzig Schüler. | Il y a environ vingt élèves dans la classe. |  |
|  | `surprise_question` | par hasard (question étonnée ou inquiète) | verbe + sujet + etwa + … ? | Bist du etwa schon müde, nach zehn Minuten? | Tu ne serais pas déjà fatigué, après dix minutes ? | B2 |
|  |  |  |  | Hast du etwa mein Fahrrad genommen? | Est-ce que par hasard tu aurais pris mon vélo ? |  |
| **gleich** | `same` | même, identique, pareil | der/die/das gleiche + nom / gleich + adjectif | Wir haben zufällig das gleiche Hemd gekauft. | Nous avons acheté la même chemise par hasard. | A2 |
|  |  |  |  | Alle Zimmer in diesem Hotel sind gleich groß. | Toutes les chambres de cet hôtel ont la même taille. |  |
|  | `right_away` | tout de suite, dans un instant | sujet + verbe + gleich + … | Warte kurz, ich bin gleich wieder da! | Attends, je reviens tout de suite ! | A2 |
|  |  |  |  | Der Film fängt gleich an, beeil dich! | Le film commence dans un instant, dépêche-toi ! |  |
|  | `right_next` | juste (à côté, au coin) | gleich + préposition de lieu | Die Bäckerei ist gleich um die Ecke. | La boulangerie est juste au coin de la rue. | B1 |
|  |  |  |  | Gleich neben dem Bahnhof gibt es ein Hotel. | Juste à côté de la gare, il y a un hôtel. |  |
|  | `modal_particle` | déjà ? (chercher une information oubliée) | mot interrogatif + verbe + sujet + (noch) gleich … ? | Entschuldigung, wie war noch gleich Ihr Name? | Pardon, quel était votre nom déjà ? | B2 |
|  |  |  |  | Wann fährt gleich der letzte Bus? | Il part à quelle heure déjà, le dernier bus ? |  |
| **eigentlich** | `actually` | en fait, à vrai dire | eigentlich + verbe + sujet … / sujet + verbe + eigentlich | Eigentlich wollte ich heute ins Kino gehen. | En fait, je voulais aller au cinéma aujourd'hui. | B1 |
|  |  |  |  | Das Hotel ist eigentlich gar nicht so schlecht. | L'hôtel n'est en fait pas si mal. |  |
|  | `modal_particle` | au fait (question) | mot interrogatif + verbe + sujet + eigentlich … ? | Wie spät ist es eigentlich jetzt in Tokio? | Au fait, quelle heure est-il à Tokyo ? | B1 |
|  |  |  |  | Wo wohnst du eigentlich jetzt, noch in Bonn? | Au fait, où habites-tu maintenant, toujours à Bonn ? |  |
|  | `real` | véritable, proprement dit (adjectif) | der/die/das eigentliche + nom | Das eigentliche Problem ist das fehlende Geld. | Le vrai problème, c'est le manque d'argent. | B2 |
|  |  |  |  | Der eigentliche Grund war ein ganz anderer. | La véritable raison était tout autre. |  |
| **zwar** | `concession` | certes … mais (zwar … aber) | sujet + verbe + zwar + …, aber … | Das Auto ist zwar alt, aber es fährt gut. | La voiture est certes vieille, mais elle roule bien. | B1 |
|  |  |  |  | Ich bin zwar müde, aber ich komme trotzdem mit. | Je suis fatigué, certes, mais je viens quand même. |  |
|  | `specification` | à savoir, plus précisément (und zwar) | …, und zwar + précision | Ich brauche deine Hilfe, und zwar sofort. | J'ai besoin de ton aide, et tout de suite. | B2 |
|  |  |  |  | Wir treffen uns bald, und zwar am Montag um zehn. | Nous nous voyons bientôt, plus précisément lundi à dix heures. |  |
| **allerdings** | `however` | toutefois, cependant (restriction) | …, allerdings + verbe + sujet … / sujet + verbe + allerdings … | Das Essen war gut, allerdings etwas teuer. | Le repas était bon, mais un peu cher toutefois. | B1 |
|  |  |  |  | Ich komme gern, allerdings erst nach acht Uhr. | Je viens volontiers, mais seulement après huit heures. |  |
|  | `certainly` | et comment, absolument (réponse) | – Allerdings! | Hast du das wirklich gewusst? – Allerdings! | Tu le savais vraiment ? – Absolument ! | B2 |
|  |  |  |  | War es kalt? – Allerdings, wir haben gefroren. | Il faisait froid ? – Et comment, nous avons gelé. |  |

#### Explications

- **als** (conjonction)
  - `time_past` — Introduit une subordonnée de temps pour un événement unique ou une période du passé. Verbe conjugué à la fin.
  - `comparison_unequal` — Après un comparatif (plus/moins … que), « que » se dit als, jamais wie.
  - `role` — Indique un rôle, une profession ou une qualité ; le nom qui suit est généralement sans article.
  - `as_if` — Compare à une situation irréelle, avec le subjonctif II. Avec als ob le verbe va à la fin ; avec als seul, le verbe suit directement als.
- **wenn** (conjonction)
  - `time_repeated` — Pour une action répétée (même au passé) ou un moment présent ou futur. Verbe conjugué à la fin.
  - `condition` — Pose une condition, réelle ou irréelle (avec le subjonctif II). Verbe à la fin. À ne pas confondre avec ob, le « si » de la question indirecte.
  - `wish` — Avec nur ou doch et le subjonctif II, exprime un regret ou un souhait irréalisable. Verbe à la fin.
- **wie** (adverbe interrogatif, conjonction)
  - `question_how` — Mot interrogatif : « comment », ou « combien / quel » devant un adjectif (wie alt, wie lange, wie viel).
  - `indirect_how` — Introduit une interrogative indirecte ; comme toute subordonnée, le verbe conjugué va à la fin.
  - `comparison_equal` — Comparaison d'égalité (so … wie) ou ressemblance. Après un comparatif, on emploie als et non wie.
- **doch** (adverbe, conjonction, particule modale)
  - `answer_negative` — Contredit une question ou une affirmation négative ; c'est le « si » français. Ja serait ici une erreur.
  - `contrast` — Marque une opposition à ce qu'on attendait. Comme conjonction (= aber) il ne change pas l'ordre des mots ; comme adverbe dans la phrase, il signifie « quand même ».
  - `modal_particle` — Non accentué : adoucit un impératif (« donc ») ou rappelle une évidence que l'autre devrait connaître (« pourtant »).
- **schon** (adverbe, particule modale)
  - `already` — Indique qu'une action a eu lieu, ou qu'un état est atteint, plus tôt que prévu. Contraire : noch nicht.
  - `duration` — Avec une durée et un verbe au présent, souligne que l'action dure depuis longtemps ; le français dit « ça fait … que » ou « depuis ».
  - `modal_particle` — Non accentué : rassure (« ça va aller ») ou concède un point avant un aber (« certes »).
- **noch** (adverbe, conjonction)
  - `still` — Une action ou un état continue au moment dont on parle.
  - `additional` — Ajoute une quantité ou une action supplémentaire : noch ein, noch mehr, noch etwas.
  - `not_yet` — Avec une négation : ce qui n'a pas (encore) eu lieu. Contraire : schon.
- **erst** (adverbe)
  - `only_then` — Indique qu'un événement arrive plus tard qu'on ne l'attendait : « ne … que », « seulement ». Ne pas le remplacer par nur.
  - `only_amount` — Avec un nombre : « ne … que pour l'instant », sous-entendu que cela va augmenter (âge, progression).
  - `first` — Première étape d'une suite, souvent suivie de dann (= zuerst). En tête, il entraîne l'inversion.
- **da** (adverbe, conjonction)
  - `place` — Adverbe de lieu : là où l'on montre, ou « être là » (présent).
  - `time_then` — Dans un récit, introduit l'événement qui survient ; en tête, il entraîne l'inversion (verbe en 2e position).
  - `cause_known` — Subordonnant de cause, souvent en tête de phrase, pour une raison déjà connue ou évidente. Verbe conjugué à la fin.
- **denn** (conjonction, particule modale)
  - `cause_coord` — Conjonction de coordination : elle ne compte pas comme une place, l'ordre reste sujet + verbe (verbe en 2e position). Toujours après la principale.
  - `modal_particle` — Dans une question, rend le ton plus naturel ou marque l'étonnement ; souvent intraduisible ou rendu par « donc ».
- **weil** (conjonction)
  - `cause_sub` — Subordonnant de cause qui répond à warum ; verbe conjugué à la fin. Sert de point de comparaison avec denn et da.
- **zu** (préposition, particule, adverbe)
  - `direction` — Préposition + datif : direction vers une personne, un bâtiment ou un événement (zum Arzt, zur Schule, zu mir).
  - `infinitive` — Devant l'infinitif après de nombreux verbes et expressions (versuchen, vergessen, Lust haben). L'infinitif avec zu se place à la fin ; avec un verbe à particule, zu s'insère au milieu (zuzumachen).
  - `too` — Devant un adjectif ou un adverbe : excès. Ne pas confondre avec sehr (très).
- **lassen** (verbe)
  - `let` — Laisser quelqu'un faire quelque chose ; l'infinitif se place à la fin, sans zu.
  - `causative` — Faire réaliser une action par un tiers, souvent un professionnel ; avec sich : « se faire … ». Infinitif à la fin.
  - `leave_stop` — Sans infinitif : laisser un objet quelque part, ou cesser une action (Lass das! = arrête).
  - `lets_proposal` — Lass uns / lasst uns + infinitif : proposition faite à un ou plusieurs interlocuteurs, comme l'impératif « -ons ».
- **werden** (verbe, auxiliaire)
  - `become` — Verbe plein : devenir, suivi d'un adjectif ou d'un nom au nominatif.
  - `future` — Auxiliaire du futur ; l'infinitif va à la fin. Exprime aussi souvent une supposition.
  - `passive` — Auxiliaire du passif ; le participe passé va à la fin. L'agent est introduit par von.
  - `conditional` — Au subjonctif II (würde), forme le conditionnel : souhait, hypothèse, demande polie. Infinitif à la fin.
- **ob** (conjonction)
  - `indirect_yesno` — Introduit une question indirecte sans mot interrogatif (réponse oui ou non) ; verbe à la fin. Ici on ne peut pas employer wenn.
  - `whether_or` — Ob … oder … : présente deux possibilités sans que cela change la suite. La principale qui suit garde verbe + sujet.
- **ja** (interjection, particule modale)
  - `yes` — Réponse affirmative à une question positive. À une question négative, on répond doch.
  - `modal_particle_known` — Non accentué : rappelle quelque chose que l'interlocuteur sait déjà (« tu sais bien », « mais »).
  - `modal_particle_surprise` — Dans une exclamation, exprime l'étonnement devant ce qu'on constate (« mais … ! »).
  - `warning` — Accentué dans un impératif : renforce un avertissement (« surtout ne … pas »).
- **mal** (adverbe, particule modale)
  - `times` — Après un nombre : « fois » (einmal, zweimal) ; aussi « fois » en calcul.
  - `modal_particle` — Forme courte de einmal : rend un impératif ou une demande plus léger (« un peu », « voir », « un instant »).
  - `sometime` — Forme courte de einmal : un moment indéterminé du passé (« autrefois ») ou de l'avenir (« un de ces jours »).
- **eben** (adverbe, adjectif, particule modale)
  - `just_now` — Indique qu'une action vient tout juste de se passer (= gerade).
  - `flat` — Adjectif : sans relief, plat (un terrain, une surface).
  - `modal_particle` — Non accentué : présente un fait comme évident et inévitable, ou une solution résignée (« voilà tout », « tant pis »).
  - `agreement` — Seul en réponse : approuve vivement ce que l'autre vient de dire (« justement », « exactement »).
- **in** (préposition)
  - `location_dative` — Préposition mixte : avec le datif pour la position (question wo?).
  - `direction_accusative` — Avec l'accusatif pour un déplacement vers l'intérieur (question wohin?).
  - `time` — Avec le datif pour le temps : délai à venir (« dans dix minutes ») ou période (im Sommer, im Mai).
- **von** (préposition)
  - `origin` — Préposition + datif : point de départ d'un mouvement ou d'une période (von … nach, von … bis).
  - `possession` — À l'oral, von + datif remplace souvent le génitif pour exprimer l'appartenance.
  - `passive_agent` — Dans une phrase au passif, introduit celui qui fait l'action.
- **es** (pronom)
  - `personal` — Pronom personnel qui reprend un nom neutre (das Kind, das Buch) ; le genre français peut être différent.
  - `impersonal` — Sujet grammatical sans référence réelle : météo, es gibt (il y a), es geht (ça va).
  - `placeholder` — Occupe la première place pour annoncer une subordonnée ou un infinitif placé plus loin ; il disparaît si celle-ci passe en tête.
- **auf** (préposition, adverbe)
  - `on_dative` — Préposition mixte : avec le datif pour une position sur une surface ou dans certains lieux (auf dem Markt, auf einer Party).
  - `on_accusative` — Avec l'accusatif pour un déplacement vers une surface ou un lieu (question wohin?).
  - `verb_complement` — Après des verbes ou adjectifs fixes (warten auf, sich freuen auf, stolz auf), suivi de l'accusatif ; la traduction française varie.
  - `language` — Auf + nom de langue : « en allemand, en anglais… ».
- **sie** (pronom)
  - `she` — Pronom féminin singulier, verbe à la 3e personne du singulier ; reprend aussi un nom féminin qui peut être masculin en français.
  - `they` — Pronom pluriel des trois genres ; verbe au pluriel (-en).
  - `formal_you` — Avec majuscule et verbe au pluriel : forme de politesse, pour une ou plusieurs personnes.
- **so** (adverbe, conjonction)
  - `manner` — Adverbe de manière : de cette façon.
  - `intensifier` — Devant un adjectif ou un adverbe : intensité.
  - `comparison_equal` — Comparaison d'égalité, toujours avec wie (jamais als).
  - `consequence` — Sodass (ou so dass) introduit une conséquence ; verbe conjugué à la fin.
- **aber** (conjonction, particule modale)
  - `contrast` — Conjonction de coordination : elle ne change pas l'ordre des mots (verbe en 2e position).
  - `modal_particle` — Non accentué dans une exclamation : souligne la surprise ou l'admiration (« qu'est-ce que… ! »).
- **nach** (préposition)
  - `direction_place` — Préposition + datif : direction vers une ville, un pays sans article, un point cardinal, ou nach Hause.
  - `time_after` — Postériorité dans le temps ; aussi pour l'heure (zehn nach acht).
  - `according` — Indique la source d'une opinion ou d'une information ; souvent placé après le nom (meiner Meinung nach).
- **nur** (adverbe, particule modale)
  - `only` — Restriction pure : rien de plus. Différent de erst, qui indique « pas avant » ou « pour l'instant ».
  - `modal_particle` — Dans un souhait irréel (wenn … nur) ou un impératif encourageant (« donc », « vas-y »).
- **was** (pronom interrogatif, pronom relatif, pronom indéfini)
  - `question_what` — Pronom interrogatif pour une chose.
  - `relative` — Pronom relatif après alles, nichts, etwas, das, un superlatif neutre, ou pour reprendre toute une phrase. Verbe à la fin.
  - `something` — À l'oral, was remplace souvent etwas.
- **um** (préposition, conjonction)
  - `clock_time` — Devant une heure précise. Pour un jour on dit am, pour un mois im.
  - `around` — Préposition + accusatif : autour de, ou contourner (um die Ecke).
  - `purpose` — But, quand le sujet est le même dans les deux parties ; zu + infinitif à la fin. Sinon on emploie damit.
  - `verb_complement` — Après certaines expressions fixes (es geht um = il s'agit de ; sich kümmern um = s'occuper de).
- **über** (préposition)
  - `above` — Préposition mixte : datif pour la position au-dessus, accusatif pour le passage par-dessus ou à travers.
  - `about_topic` — Avec l'accusatif, indique le thème dont on parle, lit, écrit (sprechen über, ein Buch über).
  - `more_than` — Devant un nombre : au-delà de.
  - `via` — Indique le lieu de passage ou l'intermédiaire.
- **vor** (préposition)
  - `in_front` — Préposition mixte : datif pour la position, accusatif pour le mouvement.
  - `before` — Antériorité dans le temps ; aussi pour l'heure (zehn vor neun).
  - `ago` — Vor + durée au datif : moment passé. Ne pas traduire mot à mot « il y a » par es gibt.
  - `cause_emotion` — Cause d'une émotion ou d'une réaction physique (Angst vor, zittern vor Kälte).
- **bis** (préposition, conjonction)
  - `until_prep` — Limite dans le temps ou l'espace ; avec un article, on ajoute souvent zu (bis zum, bis zur).
  - `until_conj` — Subordonnant de temps ; verbe conjugué à la fin (indicatif, contrairement au français).
  - `farewell` — Formule de salutation pour prendre congé jusqu'à la prochaine rencontre.
- **immer** (adverbe)
  - `always` — Action habituelle, à chaque fois.
  - `still` — Immer noch : la situation continue, souvent avec impatience. Le français « toujours » couvre les deux sens.
  - `increasing` — Devant un comparatif : progression.
- **also** (adverbe, particule)
  - `consequence` — Exprime une conséquence ; en tête de proposition il entraîne l'inversion. Faux ami : « aussi » se dit auch.
  - `discourse` — En début de phrase, sert à reprendre, conclure ou résumer (« bon », « alors »).
- **ganz** (adjectif, adverbe)
  - `whole` — Adjectif décliné : la totalité de quelque chose.
  - `completely` — Adverbe d'intensité maximale, souvent accentué.
  - `fairly` — Non accentué devant un adjectif positif (gut, nett), il atténue : « plutôt », « pas mal ». Piège : ganz gut n'est pas « très bien ».
- **damit** (conjonction, adverbe pronominal)
  - `purpose` — Subordonnée de but ; verbe conjugué à la fin. Si le sujet est le même, on préfère souvent um … zu.
  - `with_that` — Remplace mit + une chose déjà mentionnée (jamais une personne).
- **einfach** (adjectif, particule modale)
  - `simple` — Adjectif : sans difficulté, ou « simple » (eine einfache Fahrt = un aller simple).
  - `modal_particle` — Souligne qu'il n'y a pas d'autre explication, ou encourage à agir sans hésiter.
- **etwas** (pronom indéfini, adverbe)
  - `something` — Pronom indéfini ; suivi d'un adjectif substantivé avec majuscule (etwas Neues).
  - `a_little` — Devant un adjectif ou un nom non comptable : petite quantité ou degré faible.
- **seit** (préposition, conjonction)
  - `since_prep` — Action commencée dans le passé et qui dure encore : seit + datif, avec le verbe au présent (comme en français).
  - `since_conj` — Subordonnant de temps ; verbe conjugué à la fin.
- **selbst** (pronom, adverbe)
  - `oneself` — Placé après le mot qu'il renforce ou en fin de proposition : la personne elle-même, sans aide.
  - `even` — Placé avant le mot qu'il porte : « même », inclusion surprenante.
- **wo** (adverbe interrogatif, adverbe relatif)
  - `question_where` — Question sur le lieu où l'on est ; pour la direction on dit wohin, pour l'origine woher.
  - `relative` — Introduit une relative de lieu ou, à l'oral, de temps ; verbe à la fin.
- **dabei** (adverbe pronominal)
  - `with_present` — Avoir quelque chose sur soi, ou participer à quelque chose.
  - `while_doing` — Action simultanée, ou reprise de ce dont on parle (bei + cela).
  - `contrast` — En tête de proposition (avec inversion), oppose un fait à ce qui précède.
- **gerade** (adverbe, adjectif)
  - `right_now` — Action en cours au moment où l'on parle (l'allemand n'a pas de forme progressive).
  - `just_now` — Avec un temps du passé : l'action vient de se produire.
  - `straight_even` — Adjectif : sans courbe (droit), ou nombre pair.
  - `precisely` — Met en relief un élément, souvent de façon paradoxale.
- **wohl** (particule modale, adverbe)
  - `probably` — Exprime une supposition du locuteur, souvent avec le futur.
  - `well_being` — Bien-être : sich wohl fühlen, mir ist (nicht) wohl.
  - `concession` — Concède un point avant une objection introduite par aber.
- **vielleicht** (adverbe, particule modale)
  - `perhaps` — Possibilité ; en tête, il entraîne l'inversion (pas de « que » comme en français).
  - `polite_request` — Dans une question, rend la demande plus prudente et polie.
  - `exclamation` — Non accentué dans une exclamation : renforce l'intensité (« quel… ! », « qu'est-ce que… ! »).
- **bitte** (interjection, adverbe)
  - `please` — Formule de politesse dans une demande.
  - `you_are_welcome` — Réponse à un remerciement.
  - `pardon` — Wie bitte? ou Bitte? pour demander de répéter.
  - `here_you_are` — En tendant un objet ou en invitant quelqu'un à faire quelque chose.
- **während** (préposition, conjonction)
  - `during` — Préposition suivie du génitif (souvent du datif à l'oral).
  - `while` — Subordonnant : deux actions en même temps ; verbe conjugué à la fin.
  - `whereas` — Subordonnant d'opposition entre deux faits ; verbe à la fin.
- **etwa** (adverbe, particule modale)
  - `approximately` — Devant un nombre ou une quantité : approximation.
  - `surprise_question` — Dans une question fermée, exprime la surprise ou la crainte que la réponse soit oui.
- **gleich** (adjectif, adverbe, particule modale)
  - `same` — Adjectif : identique (das gleiche) ou de même valeur (gleich groß).
  - `right_away` — Moment très proche dans l'avenir.
  - `right_next` — Devant une indication de lieu : immédiatement, tout près.
  - `modal_particle` — Dans une question, signale qu'on a oublié une information qu'on connaissait (« déjà »).
- **eigentlich** (adverbe, particule modale, adjectif)
  - `actually` — Oppose la réalité ou l'intention initiale à ce qui se passe vraiment.
  - `modal_particle` — Dans une question, introduit un sujet nouveau ou marque la curiosité (« au fait »).
  - `real` — Adjectif épithète : le vrai, l'essentiel, par opposition à l'apparent.
- **zwar** (adverbe)
  - `concession` — Concède un point, toujours suivi d'une restriction avec aber.
  - `specification` — Und zwar précise ce qui vient d'être dit.
- **allerdings** (adverbe)
  - `however` — Apporte une restriction à ce qui précède ; peut se placer en tête (inversion) ou dans la phrase.
  - `certainly` — En réponse, confirme avec force (« absolument », « et comment »).

### Groupes à départager

| Mots | Usages opposés | Note |
|---|---|---|
| als / wenn / wie | `als:time_past`, `wenn:time_repeated`, `wie:question_how` | « Quand » : als pour un fait unique du passé, wenn pour une répétition ou le présent/futur ; wie n'est jamais temporel (« comment »). |
| als / wenn / wie | `als:comparison_unequal`, `wie:comparison_equal`, `wenn:condition` | Comparaison : als après un comparatif (plus … que), wie pour l'égalité (aussi … que) ; wenn ne compare jamais, il pose une condition (« si »). |
| denn / weil / da | `denn:cause_coord`, `weil:cause_sub`, `da:cause_known` | Trois façons de donner une cause : denn (car) garde le verbe en 2e position ; weil (parce que) et da (comme, puisque) rejettent le verbe à la fin ; da se met souvent en tête pour une cause déjà connue. |
| schon / noch / erst | `schon:already`, `noch:still`, `noch:not_yet`, `erst:only_then`, `erst:only_amount` | schon = déjà (plus tôt que prévu) ; noch = encore (ça continue) ou noch nicht (pas encore) ; erst = seulement, pas avant (plus tard que prévu ou quantité encore faible). |
| ob / wenn | `ob:indirect_yesno`, `wenn:condition` | Les deux se traduisent « si » : ob introduit une question indirecte (ich weiß nicht, ob…) ; wenn pose une condition (wenn du willst, …). Test : si on peut dire « est-ce que », c'est ob. |

### Mots écartés

| Mot | Raison |
|---|---|
| die | Article défini ; ses emplois de relatif et démonstratif relèvent du cours sur les déterminants et relatives. |
| der | Article défini ; même remarque que die. |
| und | Conjonction « et », un seul usage sans piège. |
| ich | Pronom personnel simple. |
| mit | « Avec » dans presque tous les cas. |
| ein | Article indéfini / numéral, traité en grammaire des déterminants. |
| für | « Pour » dans presque tous les cas. |
| im | Contraction de in dem (voir in). |
| sich | Pronom réfléchi : relève du cours sur les verbes pronominaux. |
| an | Préposition mixte proche de in et auf, déjà couverts ; à ajouter plus tard si besoin. |
| dass | Un seul usage (« que ») ; la confusion das/dass est orthographique. |
| bei | Usages (chez, près de, lors de) peu ambigus pour un francophone. |
| aus | Origine/matière, sens assez transparents. |
| wir | Pronom personnel simple. |
| oder | « Ou » ; l'emploi « …, oder ? » est trivial. |
| am | Contraction de an dem. |
| man | Pronom « on », un seul usage. |
| zum | Contraction de zu dem (voir zu). |
| dann | « Alors, ensuite » ; un sens principal. |
| durch | Sens (à travers, grâce à) assez transparents. |
| hier | Adverbe de lieu simple. |
| jetzt | « Maintenant », un seul usage. |
| wieder | « De nouveau », un seul usage. |
| sehr | « Très », adverbe d'intensité simple. |
| unter | Sens spatiaux et « parmi » assez transparents. |
| vom | Contraction de von dem (voir von). |
| gut | Adjectif/adverbe « bon, bien » sans piège grammatical. |
| gegen | « Contre » / « vers » (heure) : peu de confusion. |
| viel | Quantifieur simple (beaucoup). |
| ab | Surtout préfixe verbal ; « à partir de » transparent. |
| heute | « Aujourd'hui », un seul usage. |
| nun | Proche de jetzt ; l'emploi discursif est marginal à ce niveau. |
| wer | Pronom interrogatif « qui » ; les difficultés relèvent des cas (wen, wem). |
| seiner | Forme déclinée du possessif / pronom. |
| zwischen | « Entre », un seul sens. |
| ihrer | Forme déclinée du possessif / pronom. |
| warum | « Pourquoi », un seul usage. |
| weiter | « Plus loin / continuer », sens transparent. |
| wirklich | « Vraiment », adverbe simple. |
| dazu | Adverbe pronominal (zu + cela) ; le principe est couvert par damit et dabei. |
| dafür | Adverbe pronominal ; principe couvert par damit et dabei. |
| bereits | Synonyme soutenu de schon (déjà), un seul usage. |
| nie | « Jamais », un seul usage. |
| weg | « Parti, loin », surtout préfixe verbal. |
| wegen | « À cause de », un seul usage. |
| besser | Comparatif de gut, adjectif. |
| genau | « Exactement », sens simple. |
| gar | Surtout dans gar nicht / gar kein (intensif) ; le sens « cuit » est rare. |
| natürlich | « Naturel / bien sûr », sens transparents. |
| recht | Expressions figées (recht haben) plutôt qu'usages grammaticaux. |
| lange | « Longtemps », adverbe simple. |
| davon | Adverbe pronominal ; principe couvert par damit et dabei. |
| fast | « Presque », un seul usage. |
| richtig | Adjectif « juste, correct ». |
| zurück | « En retour », surtout préfixe verbal. |
| zusammen | « Ensemble », un seul usage. |
| darauf | Adverbe pronominal ; principe couvert par damit et dabei. |
| schön | Adjectif « beau » ; emploi intensif marginal. |
| sogar | « Même », un seul usage (comparé dans selbst). |
| später | « Plus tard », un seul usage. |

