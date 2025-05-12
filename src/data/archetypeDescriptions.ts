import { Dimension, PersonalityResult, facets } from "../types/personality";

// Types pour les descriptions d'archétypes

export type IntensityLevel = 'low' | 'moderate' | 'high' | 'extreme';

export interface ArchetypeDescription {
  // Descriptions basées sur l'intensité du trait dominant
  intensityVariations: Record<IntensityLevel, string>;
  
  // Description principale par palier d'intensité
  coreVariations: Record<IntensityLevel, string>;
  
  // Descriptions basées sur les combinaisons avec d'autres dimensions (trait secondaire)
  combinationVariations: Record<Dimension, string>;
  
  // Descriptions des forces par palier d'intensité
  strengthsVariations: Record<IntensityLevel, string>;
  
  // Descriptions des défis par palier d'intensité
  challengesVariations: Record<IntensityLevel, string>;
  
  // Description de l'approche relationnelle par palier d'intensité
  relationshipsVariations: Record<IntensityLevel, string>;
  
  // Description de l'approche professionnelle par palier d'intensité
  careerVariations: Record<IntensityLevel, string>;
  
  // Conseils par palier d'intensité
  growthTipsVariations: Record<IntensityLevel, string>;
}

// Mapping d'intensité basé sur les percentiles
export function getIntensityLevel(percentile: number): IntensityLevel {
  if (percentile >= 90) return 'extreme';
  if (percentile >= 70) return 'high';
  if (percentile >= 50) return 'moderate';
  return 'low';
}

// Helper to map percentile to label
export function getLevelName(percentile: number): string {
  if (percentile < 10) return 'très faible';
  if (percentile < 30) return 'faible';
  if (percentile < 50) return 'modéré';
  if (percentile < 70) return 'bon';
  if (percentile < 90) return 'élevé';
  if (percentile < 95) return 'très élevé';
  if (percentile < 99) return 'exceptionnel';
  return 'extrême';
}

// Template helper
function applyTemplate(template: string, data: Record<string, string | number>) {
  return template.replace(/{{\s*(\w+)\s*}}/g, (_, key) => String(data[key] ?? ''));
}

// Templates dynamiques pour l'intro selon percentile
const intensityTemplates: Array<{ max: number; template: string }> = [
  { max: 10, template: "Votre niveau de {{dimension}} est très faible." },
  { max: 30, template: "Votre niveau de {{dimension}} est faible." },
  { max: 50, template: "Votre niveau de {{dimension}} est modéré-bas." },
  { max: 70, template: "Votre niveau de {{dimension}} est modéré-haut." },
  { max: 90, template: "Votre niveau de {{dimension}} est élevé." },
  { max: 95, template: "Votre niveau de {{dimension}} est très élevé." },
  { max: 99, template: "Votre niveau de {{dimension}} est exceptionnel." },
  { max: 100, template: "Votre niveau de {{dimension}} est extrême." }
];

// Fonction pour générer une description complète et personnalisée
export function generatePersonalizedDescription(result: PersonalityResult): string {
  const { 
    dominantDimension, 
    secondaryDimension,
    percentiles
  } = result;
  
  // Récupérer les descriptions correspondantes
  const archetypeDesc = archetypeDescriptions[dominantDimension];
  
  // Dynamic intro via template
  const pct = percentiles.dimensions[dominantDimension];
  const tmpl = intensityTemplates.find(t => pct < t.max)?.template || "Vous êtes dans le {{percentile}}ᵉ percentile pour {{dimension}}.";
  let fullDescription = applyTemplate(tmpl, { dimension: dominantDimension, percentile: pct }) + "\n\n";
  
  // Description principale dynamique selon intensité
  const intensityLevel = getIntensityLevel(pct);
  fullDescription += archetypeDesc.coreVariations[intensityLevel] + "\n\n";
  
  // Influence du trait secondaire avec nuance selon son intensité
  fullDescription += `**Influence de ${secondaryDimension}**: ${archetypeDesc.combinationVariations[secondaryDimension]}`;
  const secPct = percentiles.dimensions[secondaryDimension];
  const secLevel = getLevelName(secPct);
  fullDescription += ` Votre niveau de ${secondaryDimension} est ${secLevel}, ce qui ${secLevel === 'faible' ? 'offre un contraste équilibrant votre trait dominant' : 'renforce l\'influence de votre trait secondaire sur votre profil'}.` + "\n\n";
  
  // Forces dynamiques selon intensité
  fullDescription += `**Vos forces (${intensityLevel})**: ${archetypeDesc.strengthsVariations[intensityLevel]}` + "\n\n";
  
  // Défis dynamiques selon intensité
  fullDescription += `**Vos défis (${intensityLevel})**: ${archetypeDesc.challengesVariations[intensityLevel]}` + "\n\n";
  
  // Facet-level insights
  const topFacets = Object.entries(percentiles.facets)
    .sort(([,a],[,b]) => b - a)
    .slice(0,3);
  const facetLines = topFacets.map(([id, pct]) => {
    const name = facets[id]?.name || id;
    return `${name} (${Math.round(pct)}%)`;
  });
  fullDescription += `**Facettes clés**: ${facetLines.join(', ')}` + "\n\n";
  
  // Shadow trait
  fullDescription += `**Trait d'ombre**: Votre tendance secondaire est ${result.shadowTrait}, qui peut modérer ou renforcer votre profil selon le contexte.` + "\n\n";
  
  // Self-reflection questions
  fullDescription += `**Questions pour vous :\n- Comment pourriez-vous tirer parti de votre ${dominantDimension} élevée dans votre quotidien ?\n- De quelle manière pouvez-vous équilibrer votre ${dominantDimension} avec d'autres traits pour atteindre vos objectifs ?` + "\n\n";
  
  // Relations dynamiques selon intensité
  fullDescription += `**Dans vos relations (${intensityLevel})**: ${archetypeDesc.relationshipsVariations[intensityLevel]}` + "\n\n";
  
  // Carrière dynamique selon intensité
  fullDescription += `**Vie professionnelle (${intensityLevel})**: ${archetypeDesc.careerVariations[intensityLevel]}` + "\n\n";
  
  // Conseils dynamiques selon intensité
  fullDescription += `**Conseils**: ${archetypeDesc.growthTipsVariations[intensityLevel]}` + "\n\n";
  
  return fullDescription;
}

// Descriptions détaillées pour chaque archétype
const archetypeDescriptions: Record<Dimension, ArchetypeDescription> = {
  // Descriptions pour "Ouverture"
  "Ouverture": {
    intensityVariations: {
      low: `Vous abordez le monde avec une curiosité mesurée, préférant la stabilité et les méthodes éprouvées à l’exploration ininterrompue. Vous appréciez les nouveautés lorsqu’elles s’inscrivent dans un cadre rassurant, ce qui vous permet de tester de nouvelles idées sans vous sentir submergé. Cette approche tempérée vous donne la force de rester concentré sur vos priorités tout en vous laissant la possibilité d’étendre progressivement votre horizon, en vous appuyant sur les repères déjà maîtrisés et confortables.`,
      moderate: `Votre ouverture se manifeste par un bon équilibre entre soif de découverte et besoin de sécurité. Vous êtes régulièrement attiré par de nouvelles expériences intellectuelles et culturelles, mais vous savez conserver vos routines et vos traditions qui vous stabilisent. Grâce à cette posture, vous êtes capable de renouveler vos perspectives sans perdre le fil de vos engagements, en enrichissant vos habitudes quotidiennes par des incursions mesurées dans l’inconnu.`,
      high: `Vous êtes naturellement porté vers l’inédit et l’expérimentation, cherchant activement à sortir de votre zone de confort. Votre esprit curieux s’épanouit lorsqu’il est confronté à des idées et des concepts variés, ce qui vous rend particulièrement adaptable et inspirant pour votre entourage. Vous excellez à combiner des influences multiples, à remettre en question les conventions et à proposer des solutions originales lorsque vous êtes mis au défi d’innover.`,
      extreme: `Votre ouverture d’esprit est une force visionnaire qui vous pousse sans cesse à explorer les frontières les plus ambitieuses de la pensée et de la créativité. Vous ne connaissez pas la peur de l’inconnu et vous chérissez chaque occasion d’assimiler des savoirs novateurs. Cette quête insatiable vous place souvent à l’avant-garde des tendances intellectuelles et culturelles, vous permettant d’apporter des contributions radicales et avant‑gardistes dans vos domaines de prédilection.`,
    },
    coreVariations: {
      low: `En tant qu’Explorateur Créatif en devenir, vous accueillez les nouvelles idées de manière prudente, préférant tester chaque concept dans un cadre familier avant de vous lancer pleinement. Cette posture vous offre un équilibre précieux entre innovation et sécurité, vous évitant de vous disperser dans un trop grand nombre de directions. Vous approfondissez quelques pistes soigneusement sélectionnées, garantissant une maîtrise fine de chaque projet créatif entrepris.`,
      moderate: `À un niveau modéré d’ouverture, votre curiosité vous incite régulièrement à élargir vos horizons, tout en conservant un ancrage dans vos habitudes rassurantes. Vous aimez découvrir de nouveaux champs intellectuels puis revenir à vos repères pour intégrer les enseignements tirés de ces explorations. Cette double dynamique vous permet de progresser et d’innover de manière réfléchie, en tirant le meilleur des deux mondes : nouveauté et stabilité.`,
      high: `Avec un haut degré d’ouverture, vous êtes un véritable pionnier de l’innovation, constamment en quête d’expériences inédites et de perspectives radicalement différentes. Vous multipliez les confrontations d’idées pour nourrir votre réflexion et stimuler votre créativité. Votre capacité d’adaptation et votre inspiration débordante font de vous une source d’idées neuves, capable de remettre en question les standards établis et d’initier des changements significatifs.`,
      extreme: `Votre profil extrême fait de vous un véritable architecte de la pensée novatrice : chaque nouvelle découverte alimente votre vision et vous pousse à créer des concepts avant‑gardistes. Vous naviguez avec aisance dans l’abstrait, explorant des territoires intellectuels jusqu’alors inexplorés. Votre approche audacieuse et votre capacité à synthétiser des idées divergentes vous permettent d’envisager des solutions radicales, dignes des plus grands visionnaires.`,
    },
    combinationVariations: {
      "Ouverture": `Lorsque l’ouverture est votre trait principal et secondaire, vous incarnez l’exploration pure sous toutes ses formes. Votre esprit insatiable cherche constamment de nouveaux défis, créant un cercle vertueux où chaque découverte alimente la curiosité suivante. Vous devenez un véritable catalyseur d’idées, capable de réinventer les normes existantes et d’inspirer votre entourage à repousser les limites du possible.`,
      "Conscienciosité": `Allier une grande ouverture à une forte conscience méthodique vous permet de transformer des idées audacieuses en réalisations concrètes. Vous planifiez vos prototypes créatifs avec rigueur, en respectant des délais et des processus clairs. Cette synergie entre imagination et discipline fait de vous un innovateur structuré, capable de donner vie à des concepts originaux dans un cadre organisé et efficace.`,
      "Extraversion": `Combiner ouverture et extraversion vous confère un talent exceptionnel pour partager vos inspirations et fédérer autour de vos projets. Votre enthousiasme communicatif attire des collaborateurs passionnés, prêts à explorer avec vous de nouveaux territoires créatifs. Vous créez des environnements dynamiques où le partage d’idées devient un moteur de progrès collectif.`,
      "Agréabilité": `Lorsque votre ouverture est tempérée par une grande empathie, la créativité prend une dimension profondément humaine. Vous concevez des innovations esthétiques et fonctionnelles en tenant compte des besoins et des émotions de votre public. Cette alliance vous permet de créer des expériences enrichissantes, favorisant le bien‑être social tout en repoussant les frontières de l’invention.`,
      "Névrosisme": `L’association d’une ouverture marquée et d’une sensibilité émotionnelle élevée enrichit votre créativité d’une dimension introspective. Vous captez les nuances affectives entourant chaque situation et les transformez en expressions artistiques chargées de sens. Votre intuition profonde guide votre exploration, donnant à vos idées une authenticité et une résonance émotionnelle uniques.`,
    },
    strengthsVariations: {
      low: `Avec un faible niveau d’ouverture, vous apportez une touche d’originalité mesurée au sein de pratiques éprouvées. Vous préférez améliorer et optimiser des solutions existantes plutôt que de partir à la recherche d’avenues totalement nouvelles. Cette approche vous rend fiable et performant, tout en vous autorisant quelques incursions créatives lorsque la situation l’exige.`,
      moderate: `Une ouverture modérée vous permet de mêler curiosité et pragmatisme : vous intégrez régulièrement de nouvelles idées à vos méthodes tout en gardant une base solide de connaissances déjà maîtrisées. Vous trouvez l’équilibre entre innovation et réalisme, offrant des solutions à la fois audacieuses et réalisables.`,
      high: `Avec un niveau élevé d’ouverture, vous puisez dans un large éventail d’influences pour élaborer des approches originales. Votre esprit inventif excelle à établir des analogies entre des domaines variés, ce qui vous permet de discerner des opportunités inédites et de proposer des idées surprenantes.`,
      extreme: `Votre créativité exceptionnelle se traduit par la génération d’idées radicalement novatrices, capables de transformer en profondeur les pratiques établies. Vous êtes un catalyseur de changement, explorant sans relâche des pistes disruptives pour révolutionner votre domaine et inspirer votre communauté.`,
    },
    challengesVariations: {
      low: `Avec un faible degré d’ouverture, vous pouvez parfois résister aux propositions nouvelles, par crainte de l’inconnu. Cela peut vous faire passer à côté d’opportunités de progrès ou vous maintenir dans des schémas familiers peu propices à l’innovation. Apprendre à accueillir l’incertitude vous aidera à surmonter cette hésitation initiale.`,
      moderate: `Une ouverture modérée peut vous conduire à entamer plusieurs projets parallèles sans nécessairement les mener à terme. Vous pourriez manquer de persévérance pour approfondir certaines idées lorsque l’investissement requis devient trop important. Se concentrer sur la priorisation et la finalisation de vos initiatives renforcera votre efficacité.`,
      high: `Votre enthousiasme pour la nouveauté peut parfois vous faire négliger les aspects pratiques et la rigueur nécessaire à la réalisation. Vous risquez d’être frustré par les contraintes organisationnelles et de laisser de côté des étapes essentielles pour concrétiser vos idées. Veiller à équilibrer exploration et structuration vous évitera la dispersion.`,
      extreme: `Une ouverture extrême peut engendrer une dispersion intense, multipliant les idées et projets sans parvenir à les achever. Vous risquez de vous épuiser à courir après la prochaine nouveauté, au détriment de la réalisation durable. Cultiver la discipline et définir des objectifs clairs vous permettra de canaliser votre potentiel créatif de manière plus productive.`,
    },
    relationshipsVariations: {
      low: `Dans vos relations, vous privilégiez la profondeur et l’intimité, en sélectionnant un cercle restreint de personnes partageant des intérêts communs. Vous appréciez les conversations structurées et réfléchies, qui vous offrent un sentiment de sécurité et de confiance.`,
      moderate: `Avec une ouverture modérée, vous enrichissez vos échanges en partageant vos découvertes et en accueillant celles des autres. Vous favorisez un dialogue équilibré, oscillant entre écoute attentive et partage inspiré, ce qui crée des interactions dynamiques et stimulantes.`,
      high: `Votre curiosité naturelle vous rend sociable et inspirant : vous initiez des discussions sur des sujets variés, suscitant l’intérêt et la participation de votre entourage. Vous créez un climat d’échange intellectuel et émotionnel, où chacun se sent libre d’explorer de nouvelles idées.`,
      extreme: `Votre ouverture exceptionnelle vous pousse à tisser des liens avec des personnes issues de milieux très différents. Vous développez des collaborations interculturelles et interdisciplinaires riches, ouvrant la porte à des synergies inédites et à une compréhension profonde des diversités humaines.`,
    },
    careerVariations: {
      low: `Dans votre carrière, vous excellez dans des rôles où l’innovation reste encadrée par des processus stables. Vous apportez une touche créative à des missions bien définies, ce qui vous rend fiable et original auprès de vos collègues et supérieurs.`,
      moderate: `Avec un niveau modéré d’ouverture, vous évoluez facilement dans des environnements mêlant tradition et innovation. Vous pouvez piloter des projets de recherche et développement tout en respectant les contraintes opérationnelles, assurant un équilibre entre imagination et réalisme.`,
      high: `Vous brillez dans des secteurs dynamiques et multidisciplinaires, tels que la conception de produits, le marketing créatif ou la recherche scientifique. Votre capacité à relier des disciplines variées est un atout majeur pour conduire des innovations marquantes.`,
      extreme: `Votre profil visionnaire s’épanouit dans les structures en rupture, comme les startups technologiques ou les laboratoires de recherche avancée. Vous êtes capable d’impulser des projets disruptifs et d’orienter les équipes vers des solutions inédites, contribuant à définir l’avenir de votre secteur.`,
    },
    growthTipsVariations: {
      low: `Pour stimuler progressivement votre curiosité, choisissez un nouveau sujet d’étude ou d’expérimentation chaque mois et consignez vos découvertes dans un journal. Cette routine vous aidera à renforcer votre confiance avant de vous lancer dans des défis plus ambitieux.`,
      moderate: `Alternez régulièrement entre différentes sources d’inspiration (livres, podcasts, conférences) puis appliquez ces idées dans un projet concret. La mise en pratique régulière consolidera votre agilité cognitive et votre capacité à innover tout en restant ancré dans le réel.`,
      high: `Organisez des sessions de brainstorming collaboratif pour valoriser votre créativité et bénéficier des perspectives complémentaires de vos pairs. Entrer en contact avec des spécialistes d’autres domaines vous permettra de transformer efficacement vos idées en réalisations tangibles.`,
      extreme: `Participez à des résidences d’innovation ou à des hackathons pour aborder des problématiques globales et tester vos capacités visionnaires. Documentez et partagez vos réflexions pour inspirer et guider d’autres créateurs dans la communauté, renforçant ainsi votre impact et votre réseau.`
    }
  },


  // Descriptions pour "Conscienciosité"
  "Conscienciosité": {
    intensityVariations: {
      low: `Vous êtes à l’aube de l’établissement de votre organisation personnelle, explorant différentes méthodes pour structurer votre quotidien. Dans cette phase d’initiation, vous tâtonnez, testant des outils variés tels que des listes de tâches manuscrites, des applications de gestion de projet ou des plannings hebdomadaires. Vous mesurez la satisfaction de voir des routines se mettre en place tout en restant libre de les ajuster selon vos besoins. Cette expérimentation vous permet de comprendre quelles pratiques vous conviennent le mieux et de développer progressivement un système que vous vous appropriez. Au final, vous construisez des fondations modulables, suffisamment solides pour soutenir vos objectifs sans vous enfermer dans des contraintes trop rigides.`,
      moderate: `Vous avez trouvé un rythme harmonieux entre discipline et flexibilité. Vos journées sont planifiées avec soin, de sorte que chaque tâche importante bénéficie d’un créneau dédié, mais vous vous laissez également la marge nécessaire pour réagir aux imprévus. Les échéances que vous vous imposez deviennent des jalons motivants, non des chaînes. Vous savez alterner entre moments de concentration intense et pauses bien méritées pour recharger votre énergie. Cette approche équilibrée vous permet de maintenir une productivité constante tout en préservant votre bien-être, vous rendant à la fois fiable et adaptable, capable de gérer efficacement vos priorités sans sacrifier votre sérénité.`,
      high: `Votre sens de l’organisation est devenu un véritable atout, reflétant une méthodologie rigoureuse que vous appliquez à chacun de vos projets. Vous élaborez des plannings détaillés, décomposant chaque objectif en étapes claires et mesurables. Vous anticipez les obstacles potentiels en construisant des plans de secours et en allouant des marges de temps pour les ajustements. Cette maîtrise de la planification vous donne une confiance indéfectible pour respecter les délais et maintenir une qualité de travail élevée. Votre entourage, qu’il soit professionnel ou personnel, vous reconnaît comme une référence de fiabilité et d’efficacité.`,
      extreme: `Votre niveau de discipline et de précision est exceptionnel, vous permettant de développer des systèmes d’organisation extrêmement complets qui optimisent chaque aspect de votre environnement. Vous documentez vos processus, créez des modèles reproductibles et n’hésitez pas à réévaluer constamment vos méthodes pour atteindre une efficacité maximale. Votre perfectionnisme méthodique se manifeste par la recherche incessante de l’amélioration continue, même pour les moindres détails. Cependant, vous savez reconnaître l’importance de déléguer certaines tâches pour préserver votre créativité et éviter l’épuisement. Grâce à cet arbitrage, vous transformez votre rigueur extrême en une force durable, capable de mener à bien des projets d’une complexité inégalée.`,
    },
    coreVariations: {
      low: `En tant qu’Architecte Méthodique en devenir, vous examinez attentivement les meilleures façons d’organiser votre temps et vos ressources. Vous testez différents outils et routines sans vous imposer de cadre rigide, cherchant avant tout à comprendre vos propres préférences et limites. Cette phase d’exploration vous permet de repérer rapidement les méthodes qui vous conviennent, tout en maintenant une attention constante à votre confort et à votre souplesse. Vous construisez ainsi un socle flexible sur lequel viendront se greffer des pratiques plus structurées à mesure que vous gagnerez en confiance.`,
      moderate: `Avec un niveau modéré de conscienciosité, vous avez développé une routine qui combine rigueur et souplesse. Vous planifiez vos journées en priorisant les tâches essentielles et vous respectez le plus souvent possible vos échéances. Cependant, vous restez ouvert aux ajustements de dernière minute quand des opportunités imprévues se présentent. Cette approche mesurée vous permet d’optimiser votre productivité tout en évitant le piège du perfectionnisme excessif. Vous vous assurez que chaque étape de votre travail bénéficie de l’attention nécessaire sans sacrifier votre créativité ni votre capacité d’adaptation.`,
      high: `À un haut degré de conscienciosité, votre organisation est devenue un véritable art. Vous concevez des plannings détaillés qui intègrent non seulement les tâches à accomplir, mais aussi des phases d’évaluation et d’amélioration continue. Vous anticipez chaque obstacle potentiel et élaborez des stratégies de mitigation avant même que les difficultés ne surviennent. Votre détermination et votre rigueur vous permettent de piloter des projets complexes avec une précision et une constance remarquables. Vous êtes perçu comme un pilier de fiabilité dans votre équipe, garantissant la qualité et la cohérence des livrables.`,
      extreme: `Votre profil extrême de conscienciosité fait de vous un maître incontesté de l’efficacité et de l’optimisation. Vous développez des procédures et des protocoles sophistiqués qui couvrent chaque aspect de vos activités, de la planification stratégique à l’exécution quotidienne. Vous réévaluez régulièrement ces systèmes pour en améliorer les performances, prenant soin de mesurer les résultats et d’ajuster les paramètres. Bien que votre rigueur puisse sembler intimidante pour certains, vous avez appris à reconnaître l’importance de déléguer les tâches secondaires pour préserver votre énergie. Cette maîtrise méthodologique vous place parmi les experts capables de mener à bien des projets d’une envergure et d’une complexité exceptionnelles.`,
    },
    combinationVariations: {
      "Ouverture": `Allier votre soif de découverte à une méthodologie rigoureuse fait de vous un innovateur structuré. Vous planifiez chaque étape de vos expérimentations, tout en laissant la place nécessaire à la créativité. Cette dualité vous permet de concrétiser des idées audacieuses dans un cadre sécurisé, maximisant ainsi vos chances de succès.`,
      "Conscienciosité": `Votre discipline se renforce progressivement, établissant une boucle vertueuse où chaque accomplissement alimente votre motivation. Vous consolidez vos méthodes pour créer des fondations robustes, vous rendant encore plus efficace à mesure que vous avancez.`,
      "Extraversion": `Votre sens de l’organisation combiné à votre énergie sociale vous transforme en chef de projet charismatique. Vous planifiez méticuleusement les tâches tout en mobilisant votre équipe grâce à votre enthousiasme et votre clarté d’objectifs.`,
      "Agréabilité": `Votre rigueur méthodologique teintée d’empathie vous permet de coordonner des équipes de manière humaine. Vous veillez au respect des délais tout en prenant en compte les besoins individuels, créant ainsi un climat de confiance propice à la performance collective.`,
      "Névrosisme": `Votre besoin de structure, atténué par une sensibilité émotionnelle, vous pousse à créer des environnements rassurants qui réduisent l’anxiété. Vous bâtissez des routines solides pour vous sentir en contrôle, tout en restant vigilant à ne pas vous enfermer dans une rigidité excessive.`
    },
    strengthsVariations: {
      low: `Vous démontrez un potentiel d’organisation prometteur, capable de poser les bases d’un cadre stable pour vos activités. Vous savez choisir les éléments essentiels à structurer sans vous perdre dans des détails superflus, ce qui fait de vous un collaborateur adaptable et créatif.`,
      moderate: `Votre sens de l’organisation vous permet de jongler avec plusieurs priorités sans perdre en efficacité. Vous répartissez judicieusement votre temps et vos ressources, garantissant une finition de qualité pour chaque tâche.`,
      high: `Vous excellez à anticiper les besoins et à planifier les actions nécessaires à la réussite d’un projet. Votre fiabilité et votre souci du détail en font un référent pour vos collègues.`,
      extreme: `Votre capacité à structurer des systèmes complexes vous distingue comme un expert en gestion de projet. Vous identifiez rapidement les leviers d’optimisation et mettez en place des processus avancés pour maintenir des standards d’excellence.`
    },
    challengesVariations: {
      low: `Vous pouvez éprouver des difficultés à maintenir la constance sur le long terme lorsqu’une routine n’est pas encore solidement ancrée. Les échéances lointaines peuvent perdre de leur sens, rendant la planification moins effective. Mettre en place des points de suivi réguliers vous aidera à renforcer votre discipline progressivement.`,
      moderate: `Votre attention au détail peut parfois vous retenir de passer à l’action rapide, vous faisant perdre de vue l’objectif principal. Apprendre à distinguer les priorités stratégiques des éléments secondaires vous permettra de gagner en fluidité décisionnelle.`,
      high: `Votre attachement aux plans établis peut entraver votre capacité d’adaptation face à l’imprévu, générant frustration et rigidité. Cultiver une attitude de flexibilité, même dans un cadre structuré, vous aidera à tirer parti des opportunités inattendues.`,
      extreme: `Votre perfectionnisme méthodologique peut conduire à l’épuisement mental si vous ne parvenez pas à déléguer. Votre exigence envers vous-même et les autres peut créer un climat de pression. Apprendre à lâcher prise et à faire confiance à vos collaborateurs vous permettra de préserver votre créativité et votre énergie.`
    },
    relationshipsVariations: {
      low: `Vous apportez une présence fiable et constante, inspirant confiance à vos proches sans pour autant envahir leur espace. Votre calme méthodique crée un sentiment de sécurité, invitant chacun à respecter l’équilibre entre autonomie et soutien.`,
      moderate: `Votre sens de l’organisation se manifeste dans la planification d’activités partagées, garantissant des moments de qualité sans stress. Vous savez coordonner les emplois du temps tout en tenant compte des besoins de chacun, favorisant la cohésion relationnelle.`,
      high: `Vous excellez à structurer les projets communs, de la simple sortie entre amis à la coordination d’événements plus complexes. Votre souci du détail et votre fiabilité renforcent la confiance mutuelle et la coopération.`,
      extreme: `Votre exigence élevée en matière d’organisation peut parfois être perçue comme trop directive. Il est essentiel d’adapter votre communication pour intégrer la spontanéité et la créativité de vos interlocuteurs, afin de maintenir des relations saines et épanouissantes.`
    },careerVariations: {
      low: `Vous trouvez votre place dans des rôles d'assistance ou de support administratif qui offrent un cadre clair et progressif, vous permettant de comprendre les processus avant de prendre des responsabilités étendues. Dans ces postes, vous développez votre sens de l'initiative tout en vous appuyant sur des structures établies. Vous apprenez à définir des priorités quotidiennes, ce qui renforce votre confiance en vos capacités organisationnelles et vous prépare à assumer des missions plus complexes à l'avenir.`,
      moderate: `Dans des fonctions de coordination de projet ou d'assistanat de direction, vous excellez en gérant efficacement plusieurs tâches simultanément. Vous planifiez vos activités avec rigueur et adaptez vos méthodes en fonction des besoins changeants de votre service. Votre capacité à anticiper les échéances et à optimiser les ressources vous rend indispensable pour garantir la fluidité opérationnelle et la satisfaction des parties prenantes.`,
      high: `Votre niveau élevé de conscienciosité vous destine naturellement à des postes de management opérationnel, de logistique ou d'assurance qualité où la rigueur est primordiale. Vous supervisez des équipes et déployez des protocoles détaillés pour garantir la conformité et la performance. Votre aptitude à concevoir des processus robustes fait de vous un référent pour maintenir des standards élevés dans l'organisation.`,
      extreme: `En tant qu'expert en gestion de programmes ou en contrôle des risques, vous concevez et pilotez des stratégies complètes pour atteindre l'excellence opérationnelle. Vous élaborez des procédures exhaustives, documentez chaque étape et formez les équipes à leur mise en œuvre. Votre perfectionnisme méthodique et votre souci du détail garantissent la pérennité et la qualité des démarches, faisant de vous un acteur clé dans les environnements à haute exigence.`,
    },
    growthTipsVariations: {
      low: `Pour solidifier votre organisation, commencez par fixer des objectifs simples chaque matin et notez les tâches à accomplir. Révisez votre liste le soir pour évaluer vos progrès et ajuster vos priorités. Cette routine renforce progressivement votre discipline tout en vous offrant un sentiment d'accomplissement quotidien.`,
      moderate: `Pour optimiser votre efficacité, utilisez des outils de gestion de tâches (listes, applications, tableaux Kanban) et adoptez la règle des 2 minutes pour éliminer rapidement les petites actions. Identifiez vos moments de productivité maximale et planifiez les tâches les plus exigeantes durant ces créneaux, tout en réservant des pauses régulières pour maintenir votre énergie.`,
      high: `Pour renforcer votre équilibre entre rigueur et flexibilité, planifiez des plages de créativité non structurées dans votre emploi du temps. Ces moments d'exploration libre vous aideront à renouveler vos perspectives et à éviter le surmenage. Combinez cela avec des revues hebdomadaires où vous évaluez vos processus et ajustez vos plans en fonction de vos apprentissages et de vos objectifs à long terme.`,
      extreme: `Pour prévenir l'épuisement dû au perfectionnisme, apprenez à déléguer efficacement, en identifiant les compétences de vos collaborateurs et en leur confiant des responsabilités claires. Intégrez régulièrement des activités de détente et de déconnexion, comme la méditation ou des loisirs créatifs, pour préserver votre créativité et votre motivation sur le long terme.`
    }
  },

  // Descriptions pour "Extraversion"
  "Extraversion": {
    intensityVariations: {
      low: `Vous manifestez une réserve naturelle dans vos interactions sociales, préférant la qualité des échanges à leur quantité. Vous accordez votre attention aux conversations qui vous touchent véritablement, créant ainsi des liens profonds avec un cercle restreint. Cette posture mesurée vous permet de préserver votre énergie intérieure tout en offrant votre présence authentique lorsque vous choisissez de vous engager.`,
      moderate: `Vous savez alterner habilement entre sociabilité et moments de retrait personnel. Vos journées comportent des plages de rencontres et d’échanges, équilibrées par des périodes de calme qui vous ressourcent. Ce juste milieu vous aide à maintenir une vie sociale active sans compromettre votre bien-être émotionnel, vous offrant à la fois dynamisme et repos nécessaires à votre équilibre.`,
      high: `Vous puisez votre énergie dans les interactions et les rassemblements, trouvant votre plein épanouissement au sein de groupes. Vous excellez à initier des conversations, à fédérer autour de projets collectifs et à insuffler un souffle positif à votre entourage. Votre enthousiasme communicationnel crée une atmosphère motivante et vous permet de stimuler la créativité et la collaboration au sein de votre réseau social.`,
      extreme: `Votre extraversion est spectaculaire : vous devenez instantanément le centre de l’attention et organisez les interactions comme un chef d’orchestre social. Vous vivez pleinement chaque rencontre, que ce soit lors d’interventions publiques, d’événements d’envergure ou de rassemblements informels. Cette intensité vous confère un charisme irrésistible, galvanisant les foules et inspirant vos pairs à vous suivre dans vos initiatives.`,
    },
    coreVariations: {
      low: `En tant que Catalyseur Social discret, vous privilégiez des échanges choisis et sincères. Vous engagez des conversations profondes avec quelques personnes de confiance, créant des liens durables sans être submergé par la dimension collective. Cette approche vous permet d’offrir une présence stabilisante et authentique, tout en respectant votre besoin de retrait pour recharger vos batteries.`,
      moderate: `À un niveau modéré d’extraversion, vous appréciez autant les réunions conviviales que les moments de solitude réparatrice. Vous participez volontiers à des événements et prenez plaisir à organiser des rencontres, tout en prévoyant des plages de ressourcement pour préserver votre énergie. Cette gestion équilibrée de votre sociabilité vous rend à la fois disponible et centré sur vos besoins personnels.`,
      high: `Avec un haut degré d’extraversion, vous tirez votre vitalité des échanges constants et des partages collectifs. Votre dynamisme se lit dans votre capacité à animer les discussions, à fédérer autour d’idées communes et à impulser un élan positif à vos équipes. Vous possédez un véritable talent pour créer une ambiance stimulante où la créativité et la coopération fleurissent naturellement.`,
      extreme: `Votre extraversion extrême vous élève au rang de leader social incontesté. Vous organisez et coordonnez des événements de grande ampleur avec aisance, captivant votre auditoire grâce à votre charisme et votre assurance. Chaque interaction devient une opportunité de connexion profonde, et vous savez mobiliser votre réseau pour concrétiser des projets ambitieux.`,
    },
    combinationVariations: {
      "Ouverture": `Votre extraversion alliée à une forte ouverture d’esprit fait de vous un explorateur de rencontres culturelles et intellectuelles. Vous partagez vos découvertes avec passion et recevez celles des autres avec un enthousiasme communicatif, créant ainsi un véritable réseau d’inspiration mutuelle.`,
      "Conscienciosité": `Votre dynamisme social, soutenu par une organisation structurée, vous transforme en leader opérationnel naturel. Vous planifiez et coordonnez les interactions de votre équipe avec rigueur, tout en maintenant une atmosphère conviviale et inclusive.`,
      "Extraversion": `Votre énergie sociale et votre charisme se renforcent mutuellement, vous conférant une influence remarquable au sein des groupes. Vous suscitez l’adhésion et mobilisez vos pairs avec aisance, devenant un moteur d’implication collective.`,
      "Agréabilité": `Votre sociabilité teintée d’empathie vous rend très apprécié de vos interlocuteurs. Vous savez écouter et comprendre les autres, adaptant votre enthousiasme pour soutenir chaque membre de votre réseau.`,
      "Névrosisme": `Votre extraversion combinée à une sensibilité émotionnelle élevée vous pousse à rechercher constamment la validation sociale. Vous pouvez ainsi ressentir plus intensément les hauts et les bas des interactions, nécessitant une attention particulière à votre équilibre intérieur.`
    },
    strengthsVariations: {
      low: `Votre réserve vous rend attentif aux détails émotionnels de vos interlocuteurs, favorisant des connexions profondes et sincères. Vous créez des environnements relationnels sûrs où chacun se sent entendu et valorisé.`,
      moderate: `Votre capacité à équilibrer prise de parole et écoute vous permet de motiver les autres tout en restant à l’écoute de leurs besoins. Vous facilitez la cohésion de groupe et encouragez un climat de collaboration serein.`,
      high: `Votre enthousiasme communicatif inspire et motive vos collègues. Vous savez stimuler la créativité collective et maintenir un haut niveau d’engagement au sein des équipes, faisant de vous un contributeur essentiel à la dynamique de groupe.`,
      extreme: `Votre magnétisme social exceptionnel vous permet de galvaniser de grands groupes et de transformer les interactions en moments de forte cohésion. Vous êtes un catalyseur d’énergie positive, capable de motiver les foules et de susciter l’engagement massif.`
    },
    challengesVariations: {
      low: `Votre besoin de retrait peut être interprété comme de la distance affective, même si cela reflète simplement votre besoin de calme. Expliquer à vos proches l’importance de ces pauses vous aidera à maintenir des relations équilibrées.`,
      moderate: `Trouver le juste équilibre entre interactions et repos peut parfois être un défi. Vous pouvez ressentir de la culpabilité en vous accordant des moments de solitude. Apprendre à valoriser ces instants de ressourcement est essentiel pour préserver votre énergie sur le long terme.`,
      high: `Votre désir constant d’échanges peut vous pousser à négliger votre besoin de réflexion personnelle, conduisant à une dispersion de votre attention. Planifier des périodes dédiées à l’introspection vous aidera à maintenir une vision claire de vos objectifs.`,
      extreme: `Votre extraversion extrême peut entraîner une fatigue sociale importante si vous ne ménagez pas de pauses régulières. Vous risquez de vivre un burn-out relationnel. Mettre en place des rituels de déconnexion vous permettra de récupérer et d’éviter l’épuisement émotionnel.`
    },
    relationshipsVariations: {
      low: `Dans vos relations, votre approche discrète favorise des échanges de qualité. Vous offrez une écoute attentive et créez un espace sécurisé pour partager, renforçant ainsi la confiance mutuelle.`,
      moderate: `Votre sociabilité mesurée vous permet de créer un cercle d’amis solides, où l’équilibre entre festivités partagées et moments plus calmes renforce la proximité et la compréhension mutuelle.`,
      high: `Vous excellez à organiser des rencontres conviviales et à maintenir un réseau diversifié. Votre enthousiasme rend chaque événement social riche en opportunités de partage et de croissance personnelle.`,
      extreme: `Votre présence dominante dans les cercles sociaux peut parfois éclipser les besoins des autres. Veiller à inviter et à valoriser activement chaque interlocuteur vous aidera à instaurer un climat plus inclusif.`
    },
    careerVariations: {
      low: `Vous brillez dans des rôles nécessitant une écoute fine et une communication ciblée, tels que le conseil individuel, la médiation ou le mentorat. Vous créez un environnement propice à l’épanouissement personnel de vos interlocuteurs.`,
      moderate: `Vos compétences relationnelles équilibrées vous rendent efficace dans le management d’équipe et la coordination de projets, où vous pouvez allier écoute et leadership pour atteindre des objectifs communs.`,
      high: `Votre charisme naturel et votre capacité à fédérer vous prédisposent à des métiers en relations publiques, événementiel ou vente, où votre enthousiasme génère des opportunités et renforce la cohésion des équipes.`,
      extreme: `Votre extraversion hors norme vous oriente vers des postes de direction ou de communication à haute visibilité, où vous utilisez votre magnétisme pour influencer et mobiliser les parties prenantes à grande échelle.`
    },
    growthTipsVariations: {
      low: `Pour développer votre aisance sociale, organisez progressivement des rencontres en petit groupe avant de vous engager dans des événements plus vastes. Cette progression graduelle renforcera votre confiance sans provoquer de surcharge émotionnelle.`,
      moderate: `Planifiez des moments de pause et de réflexion entre vos engagements sociaux pour vous ressourcer. Utilisez ces interludes pour évaluer vos interactions et préparer vos prochaines conversations avec clarté.`,
      high: `Pour canaliser votre énergie, impliquez-vous dans des projets structurés (ateliers, groupes de travail) qui offrent un cadre clair. Cela optimisera votre impact tout en évitant la dispersion de vos efforts.`,
      extreme: `Intégrez des pratiques de pleine conscience et des activités relaxantes (méditation, promenades en nature) dans votre routine quotidienne pour éviter l’épuisement social. Ces pauses vous permettront de maintenir votre vitalité et de préserver votre bien-être émotionnel.`
    }
  },

  // Descriptions pour "Agréabilité"
  "Agréabilité": {
    intensityVariations: {
      low: `Vous faites preuve de prudence dans vos relations, préférant observer avant de vous engager pleinement. Vous restez bienveillant tout en gardant une certaine réserve, ce qui vous permet de protéger votre cadre personnel. Cette distance mesurée vous aide à établir une confiance progressive et à éviter les malentendus, en vous assurant que chaque interaction compte réellement.`,
      moderate: `Vous trouvez un équilibre harmonieux entre générosité et affirmation de vos besoins. Vous offrez votre aide spontanée de manière réfléchie, tout en veillant à ne pas vous oublier dans le processus. Cette capacité à jauger vos limites renforce la qualité de vos relations, vous permettant d’être un soutien fiable et d’entretenir des échanges respectueux tant pour vous que pour les autres.`,
      high: `Votre empathie et votre coopération sont des atouts majeurs pour instaurer l’harmonie autour de vous. Vous savez écouter activement, percevoir les émotions subtiles de votre entourage et intervenir avec tact pour désamorcer les tensions. Votre présence apaisante et votre ouverture de cœur favorisent des collaborations sincères et durables, créant un climat de confiance et de soutien mutuel.`,
      extreme: `Votre compassion et votre altruisme sont exceptionnels, vous déployez une énergie considérable au service des autres. Vous anticipez les besoins émotionnels les plus fins et n’hésitez pas à vous dévouer intensément. Cependant, il est crucial de préserver vos propres limites pour éviter l’épuisement. Votre dévouement inspirant fait de vous un pilier dans votre communauté, mais veillez à pratiquer l’auto‑soin pour soutenir votre élan bienveillant.`,
    },
    coreVariations: {
      low: `En tant que Diplomate Bienveillant discret, vous préférez les échanges authentiques à petite échelle. Vous offrez un soutien réfléchi et ciblé, permettant à votre interlocuteur de se sentir compris sans être submergé. Cette approche mesurée nourrit la confiance mutuelle et consolide vos liens, tout en vous laissant la tranquillité nécessaire pour recharger vos batteries.`,
      moderate: `Avec une agrément modéré, vous créez un climat de bienveillance et d’entraide au quotidien. Vous écoutez activement les besoins de votre entourage et proposez votre aide de manière respectueuse. Ce dosage fin entre attention et affirmation de soi favorise des relations équilibrées, où chacun se sent valorisé et libre d’exprimer ses besoins.`,
      high: `En tant que Diplomate Bienveillant affirmé, vous excellez à identifier et désamorcer les tensions. Vous intervenez avec tact pour rétablir l’harmonie, encourageant la coopération entre personnes aux intérêts variés. Votre capacité à écouter et à comprendre les émotions de chacun fait de vous un médiateur naturel, capable de prévenir les conflits et de créer des synergies durables.`,
      extreme: `Votre altruisme exemplaire vous conduit à vous investir sans compter pour le bien-être d’autrui. Vous anticipez les besoins émotionnels les plus profonds et offrez un soutien constant. Pour préserver votre énergie, il est essentiel de définir des limites claires. Votre dévouement inspire profondément, mais nécessite un équilibre entre don de soi et auto‑préservation.`,
    },
    combinationVariations: {
      "Ouverture": `Lorsque votre curiosité rencontre votre empathie, vous imaginez des solutions innovantes en tenant compte de leur impact social. Vous créez des connexions durables en alliant créativité et bienveillance, faisant de vous un pionnier de l’innovation humaine.`,
      "Conscienciosité": `Allier rigueur et empathie vous rend exceptionnel dans la gestion de projets humains. Vous planifiez avec méthode tout en prenant soin des personnes concernées, assurant un suivi à la fois efficace et humain.`,
      "Extraversion": `Votre sociabilité énergique, tempérée par votre bienveillance, crée des environnements inclusifs où chacun se sent valorisé. Vous fédérez autour d’objectifs partagés sans laisser personne de côté, faisant de vous un leader inspirant.` ,
      "Agréabilité": `Votre altruisme, renforcé par votre ouverture, vous permet d’offrir un soutien intuitif tout en restant curieux des perspectives diverses. Vous tissez des liens profonds fondés sur la confiance mutuelle et la découverte partagée.`,
      "Névrosisme": `Une forte sensibilité émotionnelle combinée à votre altruisme peut conduire à l’épuisement si vous ne gérez pas vos limites. Pratiquer l’auto‑soin et poser des frontières claires vous aidera à maintenir votre élan empathique.`
    },
    strengthsVariations: {
      low: `Vous offrez un soutien discret mais précis, concentrant votre attention sur les besoins essentiels de vos proches. Cette approche évite l’ingérence tout en cultivant un climat de confiance et de respect mutuel.`,
      moderate: `Votre authenticité et votre sincérité créent des liens profonds. Vous donnez sans attendre en retour, renforçant la cohésion de votre entourage et tissant un réseau solide de relations bienveillantes.`,
      high: `Votre coopération et votre écoute active désamorcent les conflits avant qu’ils n’émergent. Vous facilitez la résolution des tensions et encouragez la collaboration, faisant de vous un moteur d’harmonie dans votre communauté.`,
      extreme: `Votre altruisme extrême fait de vous un véritable pilier pour ceux qui vous entourent. Vous investissez temps et énergie sans compter, créant un environnement de solidarité exemplaire et diffusant un sentiment de sécurité profonde.`
    },
    challengesVariations: {
      low: `Vous pouvez hésiter à offrir votre aide de peur de déranger, ce qui peut limiter votre engagement. Apprendre à proposer votre soutien, même lorsque cela semble inopportun, renforcera votre sentiment d’utilité et votre confiance en vous.`,
      moderate: `À un niveau modéré, vous avez parfois du mal à exprimer vos propres besoins, privilégiant ceux des autres. Fixer des limites claires et apprendre à dire non vous aidera à préserver votre énergie et à maintenir des relations équilibrées.`,
      high: `Votre désir d’harmonie peut vous pousser à éviter les conflits nécessaires. Vous risquez de minimiser vos droits pour préserver la paix, générant frustration et ressentiment. Apprendre à confronter avec assertivité est essentiel pour une relation saine.`,
      extreme: `Votre besoin extrême de plaire peut entraîner une exploitation émotionnelle et un épuisement. Vous donnez sans compter, négligeant parfois votre bien-être. Mettre en place des rituels d’auto‑soin et déléguer le soutien émotionnel vous aidera à éviter le burn‑out empathique.`,
    },
    relationshipsVariations: {
      low: `Vous privilégiez la sécurité et la constance dans vos relations, créant un cadre rassurant pour vous et vos proches. Vous construisez des liens sur la confiance mutuelle et la réciprocité modérée, favorisant des relations durables.`,
      moderate: `Vous êtes un partenaire loyal et attentionné, combinant soutien émotionnel fiable et expression équilibrée de vos besoins. Cette posture favorise une complicité solide et une communication transparente.`,
      high: `Vous excellez à anticiper les besoins affectifs de vos proches et à désamorcer les tensions. Votre présence empathique crée un climat d’entraide et de convivialité, renforçant la cohésion du groupe.`,
      extreme: `Votre dévouement peut parfois éclipser vos propres besoins, au point de vous oublier. Exprimer clairement vos limites et demander du soutien vous aidera à éviter l’épuisement dans des dynamiques à sens unique.`,
    },
    careerVariations: {
      low: `Vous performez dans des fonctions de soutien où votre discrétion et votre fiabilité font la différence, telles que l’assistance administrative ou l’accueil. Votre présence rassure et optimise le fonctionnement de l’équipe.`,
      moderate: `Vous vous épanouissez dans la médiation, le conseil ou le service social, combinant écoute attentive et solutions personnalisées pour accompagner efficacement les individus.`,
      high: `Vous êtes idéalement placé dans les secteurs du care, de la santé ou de l’éducation. Votre empathie et votre coopération contribuent à créer un environnement bienveillant propice au développement personnel et collectif.`,
      extreme: `Votre altruisme extrême fait de vous un candidat de choix pour des rôles d’accompagnement intensif, tels que travailleur social, infirmier en milieu sensible ou coach de vie. Votre engagement sans faille est un soutien indispensable pour les plus vulnérables.`,
    },
    growthTipsVariations: {
      low: `Pour gagner en assertivité, exprimez un petit besoin chaque jour, même s’il vous paraît mineur. Cette pratique renforcera progressivement votre confiance pour formuler des demandes plus importantes.`,
      moderate: `Apprenez à dire non avec respect lorsque vous sentez vos limites atteindre leur seuil. Prioriser vos propres besoins vous aidera à éviter l’éparpillement émotionnel et à préserver votre équilibre.`,
      high: `Entraînez-vous à formuler vos opinions avec clarté et bienveillance, en utilisant des techniques de communication non violente. Cela vous permettra de résoudre les conflits tout en maintenant l’harmonie recherchée.`,
      extreme: `Pour prévenir l’épuisement empathique, instaurez des rituels de déconnexion quotidienne (méditation, loisir créatif) et déléguez certaines tâches émotionnelles. Ces pauses vous aideront à maintenir votre vitalité et votre bien-être.`
    }
  },

  // Descriptions pour "Névrosisme"
  "Névrosisme": {
    intensityVariations: {
      low: `Vous maintenez une stabilité émotionnelle et gérez le stress de manière efficace, ce qui vous permet de rester serein même dans des situations imprévues. Votre résilience naturelle vous aide à traverser les défis sans perdre confiance en vos capacités. Vous abordez chaque moment avec lucidité et équilibre, inspirant souvent un climat de calme autour de vous.`,
      moderate: `Vous pouvez ressentir une anxiété modérée, mais vous la maîtrisez généralement grâce à des stratégies d’adaptation développées au fil du temps. Vous restez vigilant aux signaux de tension sans pour autant laisser vos émotions négatives dominer votre raisonnement. Cette capacité d’autorégulation vous permet de rebondir rapidement après les périodes de stress et de maintenir un niveau d’efficacité constant.`,
      high: `Vous êtes particulièrement sensible aux émotions négatives et vigilant face aux risques, ce qui vous rend attentif aux détails et aux signaux d’alerte. Cette sensibilité accrue vous permet d’anticiper les problèmes avant qu’ils ne se manifestent pleinement. Toutefois, il est essentiel de canaliser votre vigilance pour éviter de tomber dans la rumination et transformer votre force d’anticipation en source d’anxiété excessive.`,
      extreme: `Votre sensibilité émotionnelle est très marquée, amplifiant votre perception des menaces et générant une charge émotionnelle importante. Vous excellez à détecter les indices subtils de tensions, mais cette acuité peut également devenir épuisante si vous ne mettez pas en place une gestion active du stress. Adopter des pratiques régulières de relaxation et, si nécessaire, solliciter un soutien professionnel sont des moyens clés pour préserver votre équilibre sur le long terme.`,
    },
    coreVariations: {
      low: `En tant que Sentinelle Vigilante apaisée, vous gardez un œil attentif sur votre environnement sans laisser l’inquiétude prendre le dessus. Votre calme intérieur vous permet de prendre des décisions claires et confiantes, même face à des défis imprévus. Cette sérénité inspire souvent la confiance de votre entourage et contribue à instaurer un climat de stabilité autour de vous.`,
      moderate: `Avec une vigilance modérée, vous anticipez les risques de manière méthodique et élaborez des plans d’action mesurés. Vous reconnaissez les signaux d’alerte sans vous laisser submerger, en utilisant votre discernement pour hiérarchiser les priorités. Cette approche équilibrée vous aide à maintenir une performance stable et sereine dans vos projets quotidiens.`,
      high: `Votre sensibilité élevée fait de vous un expert pour détecter les nuances d’une situation. Vous anticipez efficacement les obstacles potentiels, ce qui vous permet de proposer des stratégies préventives adaptées. Cependant, veiller à ne pas tomber dans la paralysie par l’analyse est crucial pour transformer votre vigilance en un véritable atout opérationnel.`,
      extreme: `Votre vigilance extrême accentue votre perception des menaces, créant parfois une charge émotionnelle importante. Vous êtes capable de déceler des signaux subtils que d’autres pourraient ignorer, conférant une profondeur à votre analyse. Pour éviter l’épuisement, il est essentiel de vous accorder des moments de ressourcement et d’adopter des techniques de relaxation régulières.`,
    },
    combinationVariations: {
      "Ouverture": `Lorsque votre sensibilité émotionnelle s’allie à une forte ouverture d’esprit, vous explorez le monde avec une profondeur rare. Vous captez les détails invisibles et les intégrez dans des observations créatives, enrichissant votre compréhension tant sur le plan intellectuel qu’affectif. Cette alliance vous permet d’aborder les situations sous des angles innovants, en combinant intuition et curiosité.`,
      "Conscienciosité": `La combinaison d’une organisation rigoureuse et d’une sensibilité élevée peut susciter un besoin de contrôle renforcé. Vous élaborez des structures précises pour sécuriser votre environnement et anticiper les imprévus. Veillez toutefois à ne pas laisser ces routines devenir trop rigides pour préserver votre capacité d’adaptation face aux changements.`,
      "Extraversion": `Lorsque votre vigilance émotionnelle se mêle à une extraversion modérée ou élevée, vous cherchez souvent l’approbation et le soutien social. Partager vos inquiétudes avec votre entourage vous permet de soulager la tension intérieure. Gardez néanmoins à l’esprit l’importance de moments d’intimité pour recharger vos batteries et maintenir votre énergie.`,
      "Agréabilité": `Votre empathie, amplifiée par une haute sensibilité émotionnelle, vous rend très attentif aux besoins des autres. Vous offrez un soutien authentique tout en veillant à ne pas absorber leurs émotions négatives. Apprendre à filtrer les sentiments extérieurs devient crucial pour préserver votre propre harmonie intérieure.`,
      "Névrosisme": `Lorsque votre vigilance et votre sensibilité émotionnelle se combinent, vous développez une attention aiguë aux signaux d’alerte environnants. Vous pouvez utiliser cette force pour anticiper et prévenir les problèmes avant qu’ils ne s’aggravent. Veiller à réguler votre stress par des pratiques de relaxation régulières vous permettra de rester performant sans vous surcharger émotionnellement.`,
    },
    strengthsVariations: {
      low: `À un faible niveau de névrosisme, vous démontrez une stabilité émotionnelle remarquable. Vous gardez votre sang-froid même dans les contextes tendus, ce qui inspire confiance et respect autour de vous. Votre capacité à rester centré fait de vous un pilier de sérénité pour vos proches et collègues.`,
      moderate: `Avec un degré modéré de névrosisme, votre vigilance vous permet de détecter les signes précurseurs de stress et de réagir avant qu’ils ne deviennent problématiques. Vous ajustez vos plans d’action pour éviter les complications, renforçant ainsi votre efficacité globale. Cette réactivité vous confère un avantage certain dans la résolution proactive des défis.`,
      high: `Un haut niveau de névrosisme se traduit par une sensibilité accrue aux émotions négatives, mais aussi par une capacité à repérer les risques que d’autres pourraient négliger. Vous anticipez les difficultés potentielles et proposez des mesures préventives adaptées. Cette qualité est particulièrement précieuse dans les contextes de gestion de crise et d’assurance qualité.`,
      extreme: `Votre sensibilité extrême fait de vous un défenseur vigilant des détails et des signaux d’alerte. Vous détectez rapidement les dysfonctionnements et proposez des solutions pour en atténuer les impacts. En gestion de crise, votre acuité émotionnelle et votre sens de l’observation sont des atouts indispensables.`,
    },
    challengesVariations: {
      low: `Avec un faible niveau de névrosisme, vous pouvez parfois sous-estimer les signaux de danger, ce qui peut vous laisser pris au dépourvu. Apprendre à ralentir et à évaluer les situations avant d’agir vous aidera à renforcer votre sécurité. Développer une habitude de vérification des détails vous protègera contre les surprises indésirables.`,
      moderate: `À un degré modéré, vous traversez parfois des phases d’anxiété passagère que vous maîtrisez rapidement. Pour renforcer votre résilience, renforcer vos stratégies de régulation émotionnelle vous permettra d’éviter que ces pics de stress ne se répètent. Des exercices de respiration et de pleine conscience peuvent être particulièrement bénéfiques.`,
      high: `Un haut niveau de névrosisme peut entraîner des cycles de rumination et d’inquiétude excessive. Vous risquez de passer trop de temps à analyser des scénarios négatifs, au détriment de l’action. Intégrer des techniques de restructuration cognitive vous’aidera à rompre ces schémas et à focaliser votre énergie sur la résolution concrète des problèmes.`,
      extreme: `Votre anxiété extrême peut devenir paralysante, provoquant fatigue et difficultés de concentration. Dans ces moments, consulter un professionnel vous offrira un accompagnement adapté pour développer des outils de gestion du stress. La mise en place d’un suivi psychologique ou médical peut contribuer à prévenir l’épuisement émotionnel.`,
    },
    relationshipsVariations: {
      low: `Dans vos relations, votre calme naturel instaure un climat de confiance et de sécurité. Vous écoutez sans dramatisation et offrez un soutien fiable, rassurant ceux qui vous entourent. Cette présence apaisante renforce la qualité de vos liens et encourage l’expression authentique des émotions.`,
      moderate: `Avec un degré modéré, votre empathie vous permet de soutenir vos proches lors de moments difficiles, sans vous laisser submerger. Vous partagez vos ressentis avec justesse et maintenez un équilibre entre écoute et autodétermination. Cette posture équilibrée favorise des échanges sincères et enrichissants.`,
      high: `Un haut niveau de sensibilité vous rend particulièrement attentif aux états d’âme des autres. Vous savez offrir une oreille compréhensive et des gestes réconfortants, tout en préservant votre propre espace émotionnel. Veillez à ne pas absorber les émotions négatives de votre entourage pour préserver votre bien-être.`,
      extreme: `Votre sensibilité extrême requiert des relations stables et rassurantes pour vous sentir en sécurité. Vous avez besoin d’un entourage solide capable de vous soutenir sans exacerber votre anxiété. Exprimez clairement vos besoins et vos limites pour instaurer une dynamique relationnelle saine et durable.`,
    },
    careerVariations: {
      low: `Dans votre vie professionnelle, vous excellez dans des fonctions qui exigent calme et constance, comme la recherche, l’analyse de données ou la comptabilité. Vous maintenez une performance régulière sans être perturbé par le stress ambiant. Votre rigueur et votre sang-froid font de vous un collaborateur de confiance.`,
      moderate: `Avec un degré modéré de névrosisme, vous êtes compétent en évaluation des risques et gestion de projet. Votre capacité à anticiper les problèmes rend vos analyses particulièrement fiables. Vous contribuez à l’élaboration de plans de contingence efficaces, renforçant la résilience de votre organisation.`,
      high: `Un haut niveau de névrosisme vous oriente vers des métiers d’accompagnement, d’assurance qualité ou d’audit. Votre vigilance vous permet d’identifier rapidement les anomalies et de proposer des améliorations continues. Ces professions tirent parti de votre sens du détail et de votre capacité à prévenir les dysfonctionnements.`,
      extreme: `Votre sensibilité extrême s’épanouit dans des environnements très structurés et prévisibles, tels que la recherche clinique ou la conformité réglementaire. Vous y trouvez un cadre rassurant et valorisant, où votre rigueur et votre attention aux détails sont pleinement reconnues. Ce type de poste vous offre la stabilité nécessaire pour exprimer tout votre potentiel.`,
    },
    growthTipsVariations: {
      low: `Pour maintenir votre stabilité émotionnelle, intégrez quotidiennement de courts exercices de pleine conscience ou de respiration consciente. Ces pratiques, même de quelques minutes, renforceront progressivement votre résilience face aux imprévus. Elles vous aideront à conserver votre calme intérieur au quotidien.`,
      moderate: `Pour apaiser votre vigilance, utilisez régulièrement des techniques de relaxation comme la méditation guidée, le yoga ou la cohérence cardiaque. Ces outils vous permettront d’équilibrer votre attention sans nuire à votre concentration. Vous pourriez également tenir un journal des réussites pour recentrer votre esprit sur les aspects positifs.`,
      high: `Avec un haut niveau de sensibilité, mettez en place des stratégies de régulation émotionnelle telles que le journal de gratitude, la thérapie brève ou des exercices de respiration profonde. Ces pratiques vous aideront à canaliser votre anxiété et à renforcer votre sérénité. En les combinant à un soutien social régulier, vous augmenterez votre bien-être global.`,
      extreme: `Face à une anxiété extrême, il est recommandé de consulter un professionnel pour un accompagnement personnalisé. Les thérapies cognitivo-comportementales, les approches pharmacologiques ou les techniques de relaxation avancées peuvent vous offrir un soutien adapté. Associer ces méthodes à un réseau de soutien fiable contribuera à prévenir l'épuisement émotionnel.`
    }
  }
};