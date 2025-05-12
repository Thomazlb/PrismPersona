import { Dimension } from "@/types/personality";

export type ZodiacSign = 
  | "Bélier"
  | "Taureau"
  | "Gémeaux"
  | "Cancer"
  | "Lion"
  | "Vierge"
  | "Balance"
  | "Scorpion"
  | "Sagittaire"
  | "Capricorne"
  | "Verseau"
  | "Poissons";

export interface ZodiacInfo {
  name: ZodiacSign;
  dates: string;
  symbol: string; // Symbole Unicode du signe astrologique
  unicodeSymbol: string; // Caractère Unicode du signe
  description: string;
  traits: string[];
  element: "Feu" | "Terre" | "Air" | "Eau";
}

// Mapping entre combinaisons de traits dominants et signes du zodiaque
export const dimensionToZodiac: Record<Dimension, Record<Dimension, ZodiacSign>> = {
  "Ouverture": {
    "Ouverture": "Verseau", // Double Ouverture -> Innovateur, visionnaire
    "Conscienciosité": "Sagittaire", // Explorateur organisé
    "Extraversion": "Gémeaux", // Curieux et sociable
    "Agréabilité": "Poissons", // Créatif et empathique
    "Névrosisme": "Balance", // Cherche l'harmonie intellectuelle
  },
  "Conscienciosité": {
    "Ouverture": "Sagittaire", // Organisé mais aventurier
    "Conscienciosité": "Capricorne", // Double méthode, ambition
    "Extraversion": "Lion", // Planificateur charismatique
    "Agréabilité": "Taureau", // Structure et stabilité
    "Névrosisme": "Vierge", // Perfectionniste anxieux
  },
  "Extraversion": {
    "Ouverture": "Gémeaux", // Social et curieux
    "Conscienciosité": "Lion", // Leader organisé
    "Extraversion": "Bélier", // Double énergie, initiative
    "Agréabilité": "Balance", // Social et harmonieux
    "Névrosisme": "Scorpion", // Intense émotionnellement
  },
  "Agréabilité": {
    "Ouverture": "Poissons", // Empathique et imaginatif
    "Conscienciosité": "Taureau", // Fiable et attentionné
    "Extraversion": "Balance", // Diplomatique et sociable
    "Agréabilité": "Cancer", // Double empathie, protection
    "Névrosisme": "Poissons", // Sensible et intuitif
  },
  "Névrosisme": {
    "Ouverture": "Balance", // Sensible mais cherche l'harmonie
    "Conscienciosité": "Vierge", // Anxiété canalisée en méthode
    "Extraversion": "Scorpion", // Intensité émotionnelle
    "Agréabilité": "Poissons", // Émotions et empathie
    "Névrosisme": "Cancer", // Double sensibilité émotionnelle
  }
};

// Fonction pour obtenir le signe correspondant
export const getZodiacSign = (
  primaryDimension: Dimension,
  secondaryDimension: Dimension
): ZodiacInfo => {
  const signName = dimensionToZodiac[primaryDimension][secondaryDimension];
  return zodiacSigns[signName];
};

// Données complètes sur les signes
export const zodiacSigns: Record<ZodiacSign, ZodiacInfo> = {
  "Bélier": {
    name: "Bélier",
    dates: "21 mars - 19 avril",
    element: "Feu",
    symbol: "M12,2 L4,10 L10,10 L10,18 L14,18 L14,10 L20,10 Z",
    unicodeSymbol: "♈",
    description: "Tel le Bélier impétueux, vous abordez la vie avec une énergie sans pareille et une volonté de relever tous les défis. Votre dynamisme naturel combiné à votre goût prononcé pour l'initiative fait de vous un véritable catalyseur social. Vous êtes à l'aise pour prendre les commandes et avancer avec détermination vers vos objectifs.",
    traits: ["Dynamique", "Audacieux", "Spontané", "Leader", "Direct"]
  },
  "Taureau": {
    name: "Taureau",
    dates: "20 avril - 20 mai",
    element: "Terre",
    symbol: "M9,6 A6,6 0 1,0 21,6 A6,6 0 1,0 9,6 M9,18 A6,6 0 1,0 21,18 A6,6 0 1,0 9,18",
    unicodeSymbol: "♉",
    description: "À l'image du Taureau patient et déterminé, vous privilégiez la stabilité et la fiabilité dans tous les aspects de votre vie. Votre solide sens de l'organisation se marie parfaitement avec votre nature bienveillante. Cette combinaison fait de vous un pilier sur lequel votre entourage peut compter, tant pour votre efficacité que pour votre soutien émotionnel constant.",
    traits: ["Persévérant", "Fiable", "Patient", "Pratique", "Loyal"]
  },
  "Gémeaux": {
    name: "Gémeaux",
    dates: "21 mai - 20 juin",
    element: "Air",
    symbol: "M6,3 L18,3 M6,3 L6,21 M18,3 L18,21",
    unicodeSymbol: "♊",
    description: "Tel le signe dual des Gémeaux, vous possédez une curiosité intellectuelle insatiable couplée à un talent naturel pour la communication. Votre esprit vif est constamment en quête de nouvelles perspectives et votre sociabilité vous permet de partager facilement vos découvertes. Cette combinaison fait de vous un ambassadeur d'idées rayonnant d'enthousiasme.",
    traits: ["Curieux", "Adaptable", "Communicatif", "Vif d'esprit", "Sociable"]
  },
  "Cancer": {
    name: "Cancer",
    dates: "21 juin - 22 juillet", 
    element: "Eau",
    symbol: "M8,16 A8,12 0 1,0 24,16 A8,12 0 1,0 8,16",
    unicodeSymbol: "♋",
    description: "À l'image du Cancer protecteur, vous possédez une sensibilité émotionnelle profonde et une nature particulièrement intuitive. Votre grande empathie naturelle est renforcée par votre attention aux signaux subtils de votre entourage. Cette combinaison fait de vous un gardien émotionnel, créant des espaces de sécurité où chacun peut exprimer ses sentiments authentiques.",
    traits: ["Protecteur", "Intuitif", "Émotif", "Attaché à ses racines", "Empathique"]
  },
  "Lion": {
    name: "Lion",
    dates: "23 juillet - 22 août",
    element: "Feu",
    symbol: "M8,11 C8,8 10,6 12,6 C14,6 16,8 16,11 C16,14 13,15 12,16 M12,18 L12,20",
    unicodeSymbol: "♌",
    description: "Tel le Lion majestueux, vous rayonnez d'un charisme naturel tout en démontrant une capacité remarquable à orchestrer votre environnement. Votre leadership inné s'appuie sur une organisation méthodique qui impressionne votre entourage. Cette alliance entre magnétisme personnel et rigueur fait de vous un chef de file capable d'inspirer tout en maintenant une discipline exemplaire.",
    traits: ["Charismatique", "Leader", "Ambitieux", "Organisé", "Créatif"]
  },
  "Vierge": {
    name: "Vierge",
    dates: "23 août - 22 septembre",
    element: "Terre",
    symbol: "M12,5 L12,15 M9,8 L15,8 M17,15 C17,12 15,10 12,10 C9,10 7,12 7,15 C7,18 9,20 12,20",
    unicodeSymbol: "♍",
    description: "À l'image de la Vierge méticuleuse, vous approchez chaque situation avec une analyse fine et une recherche constante de perfectionnement. Votre sensibilité aux détails est renforcée par une vigilance émotionnelle qui vous permet d'anticiper les problèmes potentiels. Cette combinaison fait de vous un perfectionniste attentif, capable d'améliorer systématiquement votre environnement tout en restant lucide sur les risques.",
    traits: ["Méthodique", "Analytique", "Perfectionniste", "Attentif aux détails", "Prévoyant"]
  },
  "Balance": {
    name: "Balance",
    dates: "23 septembre - 22 octobre",
    element: "Air",
    symbol: "M6,12 L18,12 M6,16 L18,16",
    unicodeSymbol: "♎",
    description: "Telle la Balance harmonieuse, vous recherchez constamment l'équilibre dans toutes les dimensions de votre vie. Votre talent diplomatique naturel est enrichi par une ouverture d'esprit qui vous permet de considérer différentes perspectives. Cette combinaison fait de vous un médiateur éclairé, capable d'établir des ponts entre des idées divergentes tout en maintenant des relations paisibles.",
    traits: ["Diplomatique", "Équilibré", "Sociable", "Juste", "Esthète"]
  },
  "Scorpion": {
    name: "Scorpion",
    dates: "23 octobre - 21 novembre",
    element: "Eau",
    symbol: "M12,3 C15,9 18,9 21,9 C21,12 15,12 12,21 C9,12 3,12 3,9 C6,9 9,9 12,3",
    unicodeSymbol: "♏",
    description: "Tel le Scorpion intense, vous vivez vos interactions sociales avec une profondeur émotionnelle remarquable. Votre magnétisme naturel est intensifié par une sensibilité aiguë qui vous permet de percevoir les motivations cachées. Cette combinaison fait de vous un être magnétique et complexe, capable de transformations personnelles significatives et d'influencer puissamment votre entourage.",
    traits: ["Intense", "Passionné", "Perspicace", "Magnétique", "Déterminé"]
  },
  "Sagittaire": {
    name: "Sagittaire",
    dates: "22 novembre - 21 décembre",
    element: "Feu",
    symbol: "M8,6 L16,14 M16,6 L8,14 M12,14 L12,20",
    unicodeSymbol: "♐",
    description: "À l'image du Sagittaire voyageur, vous abordez la vie comme une aventure perpétuelle guidée par une curiosité insatiable. Votre soif de découverte est structurée par une organisation solide qui vous permet d'explorer efficacement de nouveaux horizons. Cette combinaison fait de vous un explorateur méthodique, capable d'élargir vos perspectives tout en gardant le cap sur vos objectifs d'expansion personnelle.",
    traits: ["Aventurier", "Optimiste", "Philosophe", "Épris de liberté", "Sincère"]
  },
  "Capricorne": {
    name: "Capricorne",
    dates: "22 décembre - 19 janvier",
    element: "Terre",
    symbol: "M10,3 L16,9 M16,3 L16,15 C13,19 10,19 7,15",
    unicodeSymbol: "♑",
    description: "Tel le Capricorne ambitieux, vous abordez chaque projet avec une discipline exemplaire et une vision à long terme remarquable. Votre détermination méthodique se reflète dans votre aptitude à structurer minutieusement votre chemin vers la réussite. Cette double rigueur fait de vous un bâtisseur infatigable, capable de concrétiser des ambitions considérables grâce à votre patience et votre organisation stratégique.",
    traits: ["Discipliné", "Ambitieux", "Réaliste", "Responsable", "Patient"]
  },
  "Verseau": {
    name: "Verseau",
    dates: "20 janvier - 18 février",
    element: "Air",
    symbol: "M6,6 C10,11 14,11 18,6 M6,12 C10,17 14,17 18,12",
    unicodeSymbol: "♒",
    description: "À l'image du Verseau visionnaire, vous abordez le monde avec un regard novateur et une soif insatiable d'originalité. Votre esprit avant-gardiste est doublement renforcé par votre ouverture intellectuelle exceptionnelle. Cette combinaison fait de vous un pionnier des idées, capable d'envisager des concepts révolutionnaires et de tisser des liens entre des domaines apparemment sans rapport pour créer de nouvelles synthèses.",
    traits: ["Innovateur", "Indépendant", "Original", "Humaniste", "Visionnaire"]
  },
  "Poissons": {
    name: "Poissons",
    dates: "19 février - 20 mars",
    element: "Eau",
    symbol: "M6,9 C8,7 10,7 12,9 C14,7 16,7 18,9 M6,14 C8,12 10,12 12,14 C14,12 16,12 18,14",
    unicodeSymbol: "♓",
    description: "Tel le signe double des Poissons, vous naviguez dans le monde avec une sensibilité émotionnelle profonde doublée d'une empathie naturelle exceptionnelle. Votre intuition subtile est enrichie par votre capacité à vous connecter authentiquement aux autres. Cette combinaison fait de vous un guide compassionnel, capable de percevoir les besoins non exprimés et d'offrir un soutien émotionnel adapté avec une générosité désintéressée.",
    traits: ["Intuitif", "Empathique", "Imaginatif", "Spirituel", "Compatissant"]
  }
};