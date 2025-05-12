import { Question } from "../types/personality";

// Full set of questions for the personality test
export const questions: Question[] = [
  {
    id: 1,
    text: "J'aime explorer des idées nouvelles et originales.",
    dimension: "Ouverture",
    facet: "imagination",
    reverse: false,
    weight: 1.0
  },
  {
    id: 2,
    text: "Je préfère m'en tenir à des concepts concrets et familiers.",
    dimension: "Ouverture",
    facet: "imagination",
    reverse: true,
    weight: 1.0
  },
  {
    id: 3,
    text: "Je passe souvent du temps à rêver éveillé.",
    dimension: "Ouverture",
    facet: "imagination",
    reverse: false,
    weight: 1.0
  },
  {
    id: 4,
    text: "Je trouve rarement des applications pratiques aux idées abstraites.",
    dimension: "Ouverture",
    facet: "imagination",
    reverse: true,
    weight: 1.0
  },
  {
    id: 5, 
    text: "La musique ou l'art me touchent profondément.",
    dimension: "Ouverture",
    facet: "interets_artistiques",
    reverse: false,
    weight: 1.0
  },
  {
    id: 6,
    text: "Les galeries d'art m'ennuient rapidement.",
    dimension: "Ouverture",
    facet: "interets_artistiques",
    reverse: true,
    weight: 1.0
  },
  {
    id: 7,
    text: "J'apprécie d'admirer la beauté dans les petites choses.",
    dimension: "Ouverture",
    facet: "interets_artistiques",
    reverse: false,
    weight: 1.0
  },
  {
    id: 8,
    text: "Je prête peu d'attention à l'esthétique qui m'entoure.",
    dimension: "Ouverture",
    facet: "interets_artistiques",
    reverse: true,
    weight: 1.0
  },
  {
    id: 9,
    text: "Je suis sensible aux émotions subtiles des films ou chansons.",
    dimension: "Ouverture",
    facet: "emotivite",
    reverse: false,
    weight: 1.0
  },
  {
    id: 10,
    text: "Je reste généralement indifférent aux œuvres chargées d'émotion.",
    dimension: "Ouverture",
    facet: "emotivite",
    reverse: true,
    weight: 1.0
  },
  {
    id: 11,
    text: "Je vis les expériences intenses avec beaucoup d'émotion.",
    dimension: "Ouverture",
    facet: "emotivite",
    reverse: false,
    weight: 1.0
  },
  {
    id: 12,
    text: "Je trouve exagéré d'exprimer ses états d'âme.",
    dimension: "Ouverture",
    facet: "emotivite",
    reverse: true,
    weight: 1.0
  },
  {
    id: 13,
    text: "J'adore sortir de ma zone de confort pour découvrir de nouveaux endroits.",
    dimension: "Ouverture",
    facet: "gout_aventure",
    reverse: false,
    weight: 1.0
  },
  {
    id: 14,
    text: "Je préfère la routine à l'inconnu.",
    dimension: "Ouverture",
    facet: "gout_aventure",
    reverse: true,
    weight: 1.0
  },
  {
    id: 15,
    text: "Essayer des cuisines exotiques me passionne.",
    dimension: "Ouverture",
    facet: "gout_aventure",
    reverse: false,
    weight: 1.0
  },
  {
    id: 16,
    text: "Je me méfie des activités qui changent mes habitudes.",
    dimension: "Ouverture",
    facet: "gout_aventure",
    reverse: true,
    weight: 1.0
  },
  {
    id: 17,
    text: "J'aime débattre de questions théoriques complexes.",
    dimension: "Ouverture",
    facet: "intellect",
    reverse: false,
    weight: 1.0
  },
  {
    id: 18,
    text: "Les discussions abstraites me fatiguent.",
    dimension: "Ouverture",
    facet: "intellect",
    reverse: true,
    weight: 1.0
  },
  {
    id: 19,
    text: "Je prends plaisir à résoudre des énigmes difficiles.",
    dimension: "Ouverture",
    facet: "intellect",
    reverse: false,
    weight: 1.0
  },
  {
    id: 20,
    text: "Je préfère éviter les sujets trop techniques.",
    dimension: "Ouverture",
    facet: "intellect",
    reverse: true,
    weight: 1.0
  },
  {
    id: 21,
    text: "Je pense qu'il faut remettre en question les traditions rigides.",
    dimension: "Ouverture",
    facet: "liberalisme",
    reverse: false,
    weight: 1.0
  },
  {
    id: 22,
    text: "Les règles établies sont là pour être suivies, pas discutées.",
    dimension: "Ouverture",
    facet: "liberalisme",
    reverse: true,
    weight: 1.0
  },
  {
    id: 23,
    text: "Je suis ouvert à des modes de vie très différents du mien.",
    dimension: "Ouverture",
    facet: "liberalisme",
    reverse: false,
    weight: 1.0
  },
  {
    id: 24,
    text: "Je trouve souvent que les changements sociaux vont trop loin.",
    dimension: "Ouverture",
    facet: "liberalisme",
    reverse: true,
    weight: 1.0
  },
  {
    id: 25,
    text: "Je me sens capable de gérer efficacement la plupart des défis.",
    dimension: "Conscienciosité",
    facet: "auto_efficacite",
    reverse: false,
    weight: 1.0
  },
  {
    id: 26,
    text: "Je doute souvent de ma capacité à mener les tâches à bien.",
    dimension: "Conscienciosité",
    facet: "auto_efficacite",
    reverse: true,
    weight: 1.0
  },
  {
    id: 27,
    text: "Je m'organise pour atteindre mes objectifs.",
    dimension: "Conscienciosité",
    facet: "auto_efficacite",
    reverse: false,
    weight: 1.0
  },
  {
    id: 28,
    text: "Je me sens facilement dépassé par les responsabilités.",
    dimension: "Conscienciosité",
    facet: "auto_efficacite",
    reverse: true,
    weight: 1.0
  },
  {
    id: 29,
    text: "J'aime garder mon espace de travail parfaitement rangé.",
    dimension: "Conscienciosité",
    facet: "ordre",
    reverse: false,
    weight: 1.0
  },
  {
    id: 30,
    text: "Le désordre ne me dérange pas vraiment.",
    dimension: "Conscienciosité",
    facet: "ordre",
    reverse: true,
    weight: 1.0
  },
  {
    id: 31,
    text: "Je classe mes fichiers ou objets de façon méthodique.",
    dimension: "Conscienciosité",
    facet: "ordre",
    reverse: false,
    weight: 1.0
  },
  {
    id: 32,
    text: "Je laisse souvent traîner mes affaires.",
    dimension: "Conscienciosité",
    facet: "ordre",
    reverse: true,
    weight: 1.0
  },
  {
    id: 33,
    text: "Je me sens moralement obligé de tenir mes promesses.",
    dimension: "Conscienciosité",
    facet: "sens_devoir",
    reverse: false,
    weight: 1.0
  },
  {
    id: 34,
    text: "Il m'arrive de ne pas tenir parole si ce n'est pas important.",
    dimension: "Conscienciosité",
    facet: "sens_devoir",
    reverse: true,
    weight: 1.0
  },
  {
    id: 35,
    text: "Je prends mes engagements au sérieux.",
    dimension: "Conscienciosité",
    facet: "sens_devoir",
    reverse: false,
    weight: 1.0
  },
  {
    id: 36,
    text: "Les règles sont parfois faites pour être contournées.",
    dimension: "Conscienciosité",
    facet: "sens_devoir",
    reverse: true,
    weight: 1.0
  },
  {
    id: 37,
    text: "Je vise constamment des objectifs ambitieux.",
    dimension: "Conscienciosité",
    facet: "accomplissement",
    reverse: false,
    weight: 1.0
  },
  {
    id: 38,
    text: "Je ne me fixe pas de cibles exigeantes.",
    dimension: "Conscienciosité",
    facet: "accomplissement",
    reverse: true,
    weight: 1.0
  },
  {
    id: 39,
    text: "La réussite me motive à travailler dur.",
    dimension: "Conscienciosité",
    facet: "accomplissement",
    reverse: false,
    weight: 1.0
  },
  {
    id: 40,
    text: "Je me contente facilement du minimum.",
    dimension: "Conscienciosité",
    facet: "accomplissement",
    reverse: true,
    weight: 1.0
  },
  {
    id: 41,
    text: "Je termine les tâches même quand elles sont ennuyeuses.",
    dimension: "Conscienciosité",
    facet: "autodiscipline",
    reverse: false,
    weight: 1.0
  },
  {
    id: 42,
    text: "Je procrastine fréquemment.",
    dimension: "Conscienciosité",
    facet: "autodiscipline",
    reverse: true,
    weight: 1.0
  },
  {
    id: 43,
    text: "Je respecte les échéances que je me fixe.",
    dimension: "Conscienciosité",
    facet: "autodiscipline",
    reverse: false,
    weight: 1.0
  },
  {
    id: 44,
    text: "Je me laisse distraire au moindre prétexte.",
    dimension: "Conscienciosité",
    facet: "autodiscipline",
    reverse: true,
    weight: 1.0
  },
  {
    id: 45,
    text: "Je réfléchis longuement avant de prendre une décision importante.",
    dimension: "Conscienciosité",
    facet: "prudence",
    reverse: false,
    weight: 1.0
  },
  {
    id: 46,
    text: "Je prends des décisions sur un coup de tête.",
    dimension: "Conscienciosité",
    facet: "prudence",
    reverse: true,
    weight: 1.0
  },
  {
    id: 47,
    text: "J'évalue les risques avant d'agir.",
    dimension: "Conscienciosité",
    facet: "prudence",
    reverse: false,
    weight: 1.0
  },
  {
    id: 48,
    text: "Je fonce d'abord, je réfléchis après.",
    dimension: "Conscienciosité",
    facet: "prudence",
    reverse: true,
    weight: 1.0
  },
  {
    id: 49,
    text: "Je me montre naturellement chaleureux avec les nouvelles personnes.",
    dimension: "Extraversion",
    facet: "chaleur",
    reverse: false,
    weight: 1.0
  },
  {
    id: 50,
    text: "Je garde mes distances avec la plupart des gens.",
    dimension: "Extraversion",
    facet: "chaleur",
    reverse: true,
    weight: 1.0
  },
  {
    id: 51,
    text: "On me trouve facilement accessible.",
    dimension: "Extraversion",
    facet: "chaleur",
    reverse: false,
    weight: 1.0
  },
  {
    id: 52,
    text: "J'ai du mal à créer une connexion avec des inconnus.",
    dimension: "Extraversion",
    facet: "chaleur",
    reverse: true,
    weight: 1.0
  },
  {
    id: 53,
    text: "J'apprécie les fêtes où je rencontre beaucoup de monde.",
    dimension: "Extraversion",
    facet: "sociabilite",
    reverse: false,
    weight: 1.0
  },
  {
    id: 54,
    text: "Les grands rassemblements me mettent mal à l'aise.",
    dimension: "Extraversion",
    facet: "sociabilite",
    reverse: true,
    weight: 1.0
  },
  {
    id: 55,
    text: "Je recharge mon énergie au contact d'autrui.",
    dimension: "Extraversion",
    facet: "sociabilite",
    reverse: false,
    weight: 1.0
  },
  {
    id: 56,
    text: "Passer du temps seul me suffit largement.",
    dimension: "Extraversion",
    facet: "sociabilite",
    reverse: true,
    weight: 1.0
  },
  {
    id: 57,
    text: "Je prends la parole pour défendre mes idées.",
    dimension: "Extraversion",
    facet: "assertivite",
    reverse: false,
    weight: 1.0
  },
  {
    id: 58,
    text: "Je laisse souvent les autres décider à ma place.",
    dimension: "Extraversion",
    facet: "assertivite",
    reverse: true,
    weight: 1.0
  },
  {
    id: 59,
    text: "Je dirige volontiers une discussion de groupe.",
    dimension: "Extraversion",
    facet: "assertivite",
    reverse: false,
    weight: 1.0
  },
  {
    id: 60,
    text: "Je préfère ne pas être au centre de l'attention.",
    dimension: "Extraversion",
    facet: "assertivite",
    reverse: true,
    weight: 1.0
  },
  {
    id: 61,
    text: "Je suis constamment en mouvement, physiquement ou mentalement.",
    dimension: "Extraversion",
    facet: "niveau_activite",
    reverse: false,
    weight: 1.0
  },
  {
    id: 62,
    text: "Je mène un rythme plutôt calme et posé.",
    dimension: "Extraversion",
    facet: "niveau_activite",
    reverse: true,
    weight: 1.0
  },
  {
    id: 63,
    text: "J'aime avoir plusieurs projets en parallèle.",
    dimension: "Extraversion",
    facet: "niveau_activite",
    reverse: false,
    weight: 1.0
  },
  {
    id: 64,
    text: "Je n'aime pas être pressé ou débordé.",
    dimension: "Extraversion",
    facet: "niveau_activite",
    reverse: true,
    weight: 1.0
  },
  {
    id: 65,
    text: "Les activités fortes en adrénaline m'attirent.",
    dimension: "Extraversion",
    facet: "recherche_sensations",
    reverse: false,
    weight: 1.0
  },
  {
    id: 66,
    text: "Je fuis les sensations fortes.",
    dimension: "Extraversion",
    facet: "recherche_sensations",
    reverse: true,
    weight: 1.0
  },
  {
    id: 67,
    text: "Je cherche des expériences nouvelles et palpitantes.",
    dimension: "Extraversion",
    facet: "recherche_sensations",
    reverse: false,
    weight: 1.0
  },
  {
    id: 68,
    text: "Je préfère la sécurité à l'excitation.",
    dimension: "Extraversion",
    facet: "recherche_sensations",
    reverse: true,
    weight: 1.0
  },
  {
    id: 69,
    text: "Je communique facilement ma bonne humeur.",
    dimension: "Extraversion",
    facet: "joie",
    reverse: false,
    weight: 1.0
  },
  {
    id: 70,
    text: "On me trouve rarement enthousiaste.",
    dimension: "Extraversion",
    facet: "joie",
    reverse: true,
    weight: 1.0
  },
  {
    id: 71,
    text: "Je ris et souris souvent.",
    dimension: "Extraversion",
    facet: "joie",
    reverse: false,
    weight: 1.0
  },
  {
    id: 72,
    text: "J'exprime peu mes émotions positives.",
    dimension: "Extraversion",
    facet: "joie",
    reverse: true,
    weight: 1.0
  },
  {
    id: 73,
    text: "Je suppose d'emblée que les autres sont honnêtes.",
    dimension: "Agréabilité",
    facet: "confiance",
    reverse: false,
    weight: 1.0
  },
  {
    id: 74,
    text: "Je me méfie systématiquement des intentions des gens.",
    dimension: "Agréabilité",
    facet: "confiance",
    reverse: true,
    weight: 1.0
  },
  {
    id: 75,
    text: "Je pense que la plupart des gens méritent le bénéfice du doute.",
    dimension: "Agréabilité",
    facet: "confiance",
    reverse: false,
    weight: 1.0
  },
  {
    id: 76,
    text: "Il vaut mieux rester sur ses gardes avec tout le monde.",
    dimension: "Agréabilité",
    facet: "confiance",
    reverse: true,
    weight: 1.0
  },
  {
    id: 77,
    text: "Je dis ce que je pense, même si cela me désavantage.",
    dimension: "Agréabilité",
    facet: "droiture",
    reverse: false,
    weight: 1.0
  },
  {
    id: 78,
    text: "Je peux enjoliver la vérité pour éviter des problèmes.",
    dimension: "Agréabilité",
    facet: "droiture",
    reverse: true,
    weight: 1.0
  },
  {
    id: 79,
    text: "L'honnêteté est une valeur non négociable pour moi.",
    dimension: "Agréabilité",
    facet: "droiture",
    reverse: false,
    weight: 1.0
  },
  {
    id: 80,
    text: "Mentir est parfois nécessaire pour avancer.",
    dimension: "Agréabilité",
    facet: "droiture",
    reverse: true,
    weight: 1.0
  },
  {
    id: 81,
    text: "Aider les autres me procure une grande satisfaction.",
    dimension: "Agréabilité",
    facet: "altruisme",
    reverse: false,
    weight: 1.0
  },
  {
    id: 82,
    text: "Je préfère d'abord penser à mes propres besoins.",
    dimension: "Agréabilité",
    facet: "altruisme",
    reverse: true,
    weight: 1.0
  },
  {
    id: 83,
    text: "Je consacre du temps à des causes sans attendre de retour.",
    dimension: "Agréabilité",
    facet: "altruisme",
    reverse: false,
    weight: 1.0
  },
  {
    id: 84,
    text: "Je n'ai pas le temps de rendre service gratuitement.",
    dimension: "Agréabilité",
    facet: "altruisme",
    reverse: true,
    weight: 1.0
  },
  {
    id: 85,
    text: "Je cherche des solutions qui satisfont tout le monde.",
    dimension: "Agréabilité",
    facet: "cooperation",
    reverse: false,
    weight: 1.0
  },
  {
    id: 86,
    text: "Je n'hésite pas à imposer mon point de vue.",
    dimension: "Agréabilité",
    facet: "cooperation",
    reverse: true,
    weight: 1.0
  },
  {
    id: 87,
    text: "Je cède volontiers pour maintenir l'harmonie.",
    dimension: "Agréabilité",
    facet: "cooperation",
    reverse: false,
    weight: 1.0
  },
  {
    id: 88,
    text: "Je tiens à gagner chaque désaccord.",
    dimension: "Agréabilité",
    facet: "cooperation",
    reverse: true,
    weight: 1.0
  },
  {
    id: 89,
    text: "Je parle peu de mes réussites.",
    dimension: "Agréabilité",
    facet: "modestie",
    reverse: false,
    weight: 1.0
  },
  {
    id: 90,
    text: "J'aime que l'on sache quand j'ai réussi quelque chose.",
    dimension: "Agréabilité",
    facet: "modestie",
    reverse: true,
    weight: 1.0
  },
  {
    id: 91,
    text: "Je ressens de la gêne quand on me complimente.",
    dimension: "Agréabilité",
    facet: "modestie",
    reverse: false,
    weight: 1.0
  },
  {
    id: 92,
    text: "Je me vends avec assurance.",
    dimension: "Agréabilité",
    facet: "modestie",
    reverse: true,
    weight: 1.0
  },
  {
    id: 93,
    text: "Je suis touché par la détresse des autres.",
    dimension: "Agréabilité",
    facet: "empathie",
    reverse: false,
    weight: 1.0
  },
  {
    id: 94,
    text: "Les problèmes des autres me laissent souvent indifférent.",
    dimension: "Agréabilité",
    facet: "empathie",
    reverse: true,
    weight: 1.0
  },
  {
    id: 95,
    text: "Je peux comprendre facilement ce que ressent quelqu'un.",
    dimension: "Agréabilité",
    facet: "empathie",
    reverse: false,
    weight: 1.0
  },
  {
    id: 96,
    text: "Je trouve difficile de me mettre à la place des gens.",
    dimension: "Agréabilité",
    facet: "empathie",
    reverse: true,
    weight: 1.0
  },
  {
    id: 97,
    text: "Je m'inquiète facilement pour de petites choses.",
    dimension: "Névrosisme",
    facet: "anxiete",
    reverse: false,
    weight: 1.0
  },
  {
    id: 98,
    text: "Je reste calme même sous pression.",
    dimension: "Névrosisme",
    facet: "anxiete",
    reverse: true,
    weight: 1.0
  },
  {
    id: 99,
    text: "Je m'emporte quand on me manque de respect.",
    dimension: "Névrosisme",
    facet: "colere",
    reverse: false,
    weight: 1.0
  },
  {
    id: 100,
    text: "Je garde mon sang-froid même provoqué.",
    dimension: "Névrosisme",
    facet: "colere",
    reverse: true,
    weight: 1.0
  },
  {
    id: 101,
    text: "La frustration me met rapidement en colère.",
    dimension: "Névrosisme",
    facet: "colere",
    reverse: false,
    weight: 1.0
  },
  {
    id: 102,
    text: "Je suis difficile à irriter.",
    dimension: "Névrosisme",
    facet: "colere",
    reverse: true,
    weight: 1.0
  },
  {
    id: 103,
    text: "Je me sens parfois abattu sans raison apparente.",
    dimension: "Névrosisme",
    facet: "depression",
    reverse: false,
    weight: 1.0
  },
  {
    id: 104,
    text: "Je garde toujours un moral stable.",
    dimension: "Névrosisme",
    facet: "depression",
    reverse: true,
    weight: 1.0
  },
  {
    id: 105,
    text: "Il m'arrive de perdre l'envie de faire des choses.",
    dimension: "Névrosisme",
    facet: "depression",
    reverse: false,
    weight: 1.0
  },
  {
    id: 106,
    text: "Je suis rarement mélancolique.",
    dimension: "Névrosisme",
    facet: "depression",
    reverse: true,
    weight: 1.0
  },
  {
    id: 107,
    text: "Je crains d'être jugé négativement en public.",
    dimension: "Névrosisme",
    facet: "embarras_social",
    reverse: false,
    weight: 1.0
  },
  {
    id: 108,
    text: "Je me sens à l'aise quelles que soient les circonstances sociales.",
    dimension: "Névrosisme",
    facet: "embarras_social",
    reverse: true,
    weight: 1.0
  },
  {
    id: 109,
    text: "Je repense longtemps aux faux pas que je peux commettre.",
    dimension: "Névrosisme",
    facet: "embarras_social",
    reverse: false,
    weight: 1.0
  },
  {
    id: 110,
    text: "Je ne me soucie pas du regard des autres.",
    dimension: "Névrosisme",
    facet: "embarras_social",
    reverse: true,
    weight: 1.0
  },
  {
    id: 111,
    text: "Je cède facilement aux tentations alimentaires ou autres.",
    dimension: "Névrosisme",
    facet: "immoderation",
    reverse: false,
    weight: 1.0
  },
  {
    id: 112,
    text: "Je maîtrise toujours mes envies.",
    dimension: "Névrosisme",
    facet: "immoderation",
    reverse: true,
    weight: 1.0
  },
  {
    id: 113,
    text: "Je dépense parfois impulsivement.",
    dimension: "Névrosisme",
    facet: "immoderation",
    reverse: false,
    weight: 1.0
  },
  {
    id: 114,
    text: "Je sais résister aux achats impulsifs.",
    dimension: "Névrosisme",
    facet: "immoderation",
    reverse: true,
    weight: 1.0
  },
  {
    id: 115,
    text: "En situation de crise, je me sens vite dépassé.",
    dimension: "Névrosisme",
    facet: "vulnerabilite",
    reverse: false,
    weight: 1.0
  },
  {
    id: 116,
    text: "Je gère bien les situations d'urgence.",
    dimension: "Névrosisme",
    facet: "vulnerabilite",
    reverse: true,
    weight: 1.0
  },
  {
    id: 117,
    text: "Je panique sous la pression forte.",
    dimension: "Névrosisme",
    facet: "vulnerabilite",
    reverse: false,
    weight: 1.0
  },
  {
    id: 118,
    text: "Je reste organisé même quand tout va mal.",
    dimension: "Névrosisme",
    facet: "vulnerabilite",
    reverse: true,
    weight: 1.0
  },
  {
    id: 119,
    text: "Je me fais souvent du souci pour l'avenir.",
    dimension: "Névrosisme",
    facet: "anxiete",
    reverse: false,
    weight: 1.0
  },
  {
    id: 120,
    text: "Il m'est rare de me sentir nerveux.",
    dimension: "Névrosisme",
    facet: "anxiete",
    reverse: true,
    weight: 1.0
  }
];
