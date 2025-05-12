// Personality Dimension Types
export type Dimension = 'Ouverture' | 'Conscienciosité' | 'Extraversion' | 'Agréabilité' | 'Névrosisme';

export const dimensions: Dimension[] = [
  'Ouverture',
  'Conscienciosité',
  'Extraversion',
  'Agréabilité',
  'Névrosisme'
];

export const dimensionColors: Record<Dimension, {main: string, light: string}> = {
  'Ouverture': {main: 'trait-openness', light: 'trait-openness_light'},
  'Conscienciosité': {main: 'trait-conscientiousness', light: 'trait-conscientiousness_light'},
  'Extraversion': {main: 'trait-extraversion', light: 'trait-extraversion_light'},
  'Agréabilité': {main: 'trait-agreeableness', light: 'trait-agreeableness_light'},
  'Névrosisme': {main: 'trait-neuroticism', light: 'trait-neuroticism_light'}
};

export const dimensionHues: Record<Dimension, number> = {
  'Ouverture': 270, // Purple
  'Conscienciosité': 210, // Blue
  'Extraversion': 24, // Orange
  'Agréabilité': 160, // Green
  'Névrosisme': 350 // Red
};

// Illustrations: icônes minimalistes par dimension
export const dimensionIcons: Record<Dimension, string> = {
  'Ouverture': '🔮',
  'Conscienciosité': '📐',
  'Extraversion': '🎉',
  'Agréabilité': '🤝',
  'Névrosisme': '⚠️'
};

export const dimensionDescriptions: Record<Dimension, string> = {
  'Ouverture': "Tendance à apprécier les nouvelles idées, les expériences variées et les perspectives diverses.",
  'Conscienciosité': "Tendance à être organisé, discipliné, orienté vers les objectifs et attentif aux détails.",
  'Extraversion': "Tendance à rechercher la stimulation et l'interaction sociale, l'enthousiasme et l'énergie externe.",
  'Agréabilité': "Tendance à se préoccuper de l'harmonie sociale et à valoriser les relations positives avec les autres.",
  'Névrosisme': "Tendance à éprouver des émotions négatives comme l'anxiété, la colère ou la dépression."
};

// Facet Types
export type Facet = {
  id: string;
  name: string;
  dimension: Dimension;
  description: string;
};

export const facets: Record<string, Facet> = {
  "imagination": {
    id: "imagination",
    name: "Imagination",
    dimension: "Ouverture",
    description: "Ouverture mentale aux nouvelles idées et à la créativité."
  },
  "interets_artistiques": {
    id: "interets_artistiques",
    name: "Intérêts artistiques",
    dimension: "Ouverture",
    description: "Appréciation de l'art et de la beauté sous toutes ses formes."
  },
  "emotivite": {
    id: "emotivite",
    name: "Émotivité",
    dimension: "Ouverture",
    description: "Sensibilité et profondeur des expériences émotionnelles."
  },
  "gout_aventure": {
    id: "gout_aventure",
    name: "Goût de l'aventure",
    dimension: "Ouverture",
    description: "Désir d'explorer et de vivre de nouvelles expériences."
  },
  "intellect": {
    id: "intellect",
    name: "Intellect",
    dimension: "Ouverture",
    description: "Curiosité intellectuelle et intérêt pour les idées abstraites."
  },
  "liberalisme": {
    id: "liberalisme",
    name: "Libéralisme",
    dimension: "Ouverture",
    description: "Ouverture au changement, remise en question des autorités et traditions."
  },
  "auto_efficacite": {
    id: "auto_efficacite",
    name: "Auto‑efficacité",
    dimension: "Conscienciosité",
    description: "Confiance dans sa capacité à accomplir les tâches avec succès."
  },
  "ordre": {
    id: "ordre",
    name: "Ordre",
    dimension: "Conscienciosité",
    description: "Tendance à être organisé et méthodique."
  },
  "sens_devoir": {
    id: "sens_devoir",
    name: "Sens du devoir",
    dimension: "Conscienciosité",
    description: "Engagement à respecter les obligations morales et les responsabilités."
  },
  "accomplissement": {
    id: "accomplissement",
    name: "Recherche d'accomplissement",
    dimension: "Conscienciosité",
    description: "Aspiration à l'excellence et aux réalisations significatives."
  },
  "autodiscipline": {
    id: "autodiscipline",
    name: "Autodiscipline",
    dimension: "Conscienciosité",
    description: "Capacité à poursuivre ses objectifs malgré les distractions."
  },
  "prudence": {
    id: "prudence",
    name: "Prudence",
    dimension: "Conscienciosité",
    description: "Tendance à réfléchir avant d'agir et à considérer les conséquences."
  },
  "chaleur": {
    id: "chaleur",
    name: "Chaleur",
    dimension: "Extraversion",
    description: "Facilité à se montrer amical et à établir des connexions avec autrui."
  },
  "sociabilite": {
    id: "sociabilite",
    name: "Sociabilité",
    dimension: "Extraversion",
    description: "Appréciation des interactions en groupe et du contact social fréquent."
  },
  "assertivite": {
    id: "assertivite",
    name: "Assertivité",
    dimension: "Extraversion",
    description: "Tendance à s'affirmer, prendre la parole et assumer un rôle de leader."
  },
  "niveau_activite": {
    id: "niveau_activite",
    name: "Niveau d'activité",
    dimension: "Extraversion",
    description: "Énergie et rythme de vie dynamique."
  },
  "recherche_sensations": {
    id: "recherche_sensations",
    name: "Recherche de sensations",
    dimension: "Extraversion",
    description: "Attrait pour l'excitation et la stimulation."
  },
  "joie": {
    id: "joie",
    name: "Joie",
    dimension: "Extraversion",
    description: "Tendance à ressentir et exprimer des émotions positives."
  },
  "confiance": {
    id: "confiance",
    name: "Confiance",
    dimension: "Agréabilité",
    description: "Disposition à croire aux bonnes intentions des autres."
  },
  "droiture": {
    id: "droiture",
    name: "Droiture",
    dimension: "Agréabilité",
    description: "Sincérité et honnêteté dans les relations."
  },
  "altruisme": {
    id: "altruisme",
    name: "Altruisme",
    dimension: "Agréabilité",
    description: "Préoccupation active pour le bien-être des autres."
  },
  "cooperation": {
    id: "cooperation",
    name: "Coopération",
    dimension: "Agréabilité",
    description: "Volonté de compromis et d'harmonie dans les relations."
  },
  "modestie": {
    id: "modestie",
    name: "Modestie",
    dimension: "Agréabilité",
    description: "Tendance à la réserve concernant ses propres accomplissements."
  },
  "empathie": {
    id: "empathie",
    name: "Empathie",
    dimension: "Agréabilité",
    description: "Sensibilité aux sentiments et besoins des autres."
  },
  "anxiete": {
    id: "anxiete",
    name: "Anxiété",
    dimension: "Névrosisme",
    description: "Tendance à s'inquiéter et à anticiper les problèmes."
  },
  "colere": {
    id: "colere",
    name: "Colère",
    dimension: "Névrosisme",
    description: "Propension à ressentir de la frustration et de l'irritation."
  },
  "depression": {
    id: "depression",
    name: "Dépression",
    dimension: "Névrosisme",
    description: "Tendance à éprouver des sentiments de tristesse ou d'abattement."
  },
  "embarras_social": {
    id: "embarras_social",
    name: "Embarras social",
    dimension: "Névrosisme",
    description: "Inconfort et conscience de soi en situations sociales."
  },
  "immoderation": {
    id: "immoderation",
    name: "Immodération",
    dimension: "Névrosisme",
    description: "Difficulté à résister aux tentations et à contrôler ses impulsions."
  },
  "vulnerabilite": {
    id: "vulnerabilite",
    name: "Vulnérabilité",
    dimension: "Névrosisme",
    description: "Difficulté à gérer le stress et la pression."
  }
};

// Question Type
export type Question = {
  id: number;
  text: string;
  dimension: Dimension;
  facet: string;
  reverse: boolean;
  weight: number;
};

// Results Type
export type PersonalityResult = {
  dimensionScores: Record<Dimension, number>;
  facetScores: Record<string, number>;
  percentiles: {
    dimensions: Record<Dimension, number>;
    facets: Record<string, number>;
  };
  dominantDimension: Dimension;
  secondaryDimension: Dimension;
  shadowTrait: string;
  archetype: string;
  timestamp: number;
};

// Archetypes
export type Archetype = {
  id: string;
  name: string;
  primaryDimension: Dimension;
  description: string;
  adjectives: string[];
  strengths: string[];
  challenges: string[];
};

export const archetypes: Archetype[] = [
  {
    id: "explorer",
    name: "Explorateur Créatif",
    primaryDimension: "Ouverture",
    description: "Esprit libre à l'imagination foisonnante, tu cherches constamment à repousser les frontières de ta connaissance et de ton expérience.",
    adjectives: ["Innovant", "Curieux", "Visionnaire"],
    strengths: ["Création d'idées originales", "Adaptation au changement", "Appréciation des arts"],
    challenges: ["Parfois déconnecté des réalités pratiques", "Peut manquer de persévérance", "Tendance à trop théoriser"]
  },
  {
    id: "architect",
    name: "Architecte Méthodique",
    primaryDimension: "Conscienciosité",
    description: "Organisé et fiable, tu excelles à transformer des visions en plans concrets et à concrétiser tes objectifs avec persévérance.",
    adjectives: ["Structuré", "Persévérant", "Méticuleux"],
    strengths: ["Excellente organisation", "Fiabilité", "Accomplissement des objectifs"],
    challenges: ["Peut être rigide", "Perfectionnisme excessif", "Difficulté à s'adapter rapidement"]
  },
  {
    id: "catalyst",
    name: "Catalyseur Social",
    primaryDimension: "Extraversion",
    description: "Énergique et charismatique, tu animes naturellement ton entourage et crées des connexions significatives entre les personnes.",
    adjectives: ["Charismatique", "Énergique", "Expressif"],
    strengths: ["Communication efficace", "Leadership naturel", "Création d'ambiance positive"],
    challenges: ["Besoin constant de stimulation", "Peut dominer les conversations", "Impatience occasionnelle"]
  },
  {
    id: "diplomat",
    name: "Diplomate Bienveillant",
    primaryDimension: "Agréabilité",
    description: "Empathique et attentionné, tu crées l'harmonie autour de toi et valorises profondément les relations humaines authentiques.",
    adjectives: ["Empathique", "Coopératif", "Altruiste"],
    strengths: ["Résolution de conflits", "Création d'environnements harmonieux", "Soutien émotionnel"],
    challenges: ["Évitement des confrontations nécessaires", "Tendance à négliger ses propres besoins", "Difficulté à dire non"]
  },
  {
    id: "sentinel",
    name: "Sentinelle Vigilante",
    primaryDimension: "Névrosisme",
    description: "Intensément conscient des risques potentiels, tu anticipes les problèmes et ressens profondément les émotions qui t'entourent.",
    adjectives: ["Vigilant", "Sensible", "Perspicace"],
    strengths: ["Anticipation des problèmes", "Détection des nuances émotionnelles", "Réactivité aux situations"],
    challenges: ["Tendance à l'inquiétude excessive", "Réactions parfois disproportionnées", "Difficulté à se détendre"]
  }
];
