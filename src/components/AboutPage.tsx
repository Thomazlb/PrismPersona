
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AboutPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Button variant="ghost" onClick={() => navigate('/')} className="mb-8 flex items-center gap-2">
        <ArrowLeft className="w-4 h-4" /> Retour à l'accueil
      </Button>
      
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <h1 className="text-4xl font-display font-bold mb-6">Sources & Méthodologie</h1>
        
        <section className="mb-10">
          <h2 className="text-2xl font-display font-semibold">Le modèle des Big Five</h2>
          <p>
            PrismPersona s'appuie sur le modèle des Big Five (ou modèle à cinq facteurs), qui est aujourd'hui le modèle de personnalité le plus validé scientifiquement. Développé par des recherches approfondies en psychologie, ce modèle est utilisé dans des milliers d'études scientifiques et a démontré sa validité interculturelle.
          </p>
          <p>
            Contrairement aux tests basés sur des typologies rigides comme le MBTI, le modèle des Big Five considère que la personnalité est constituée de traits continus, où chacun se situe sur un spectre plutôt que dans des catégories distinctes.
          </p>
        </section>
        
        <section className="mb-10">
          <h2 className="text-2xl font-display font-semibold">Les cinq dimensions et trente facettes</h2>
          <p>
            Le modèle des Big Five mesure cinq grandes dimensions de personnalité:
          </p>
          <ul>
            <li><strong>Ouverture</strong> - Inclination vers de nouvelles expériences, créativité et curiosité intellectuelle</li>
            <li><strong>Conscienciosité</strong> - Tendance à l'organisation, la discipline et la réflexion avant l'action</li>
            <li><strong>Extraversion</strong> - Orientation vers le monde extérieur et les interactions sociales</li>
            <li><strong>Agréabilité</strong> - Tendance à la compassion, la coopération et la considération des autres</li>
            <li><strong>Névrosisme</strong> - Tendance à ressentir des émotions négatives comme l'anxiété ou la colère</li>
          </ul>
          <p>
            Chacune de ces dimensions comprend six facettes plus spécifiques, offrant une image plus nuancée de la personnalité.
          </p>
        </section>
        
        <section className="mb-10">
          <h2 className="text-2xl font-display font-semibold">Fiabilité et validité</h2>
          <p>
            Le questionnaire utilisé par PrismPersona s'inspire des échelles IPIP-NEO et HEXACO, adaptées pour ce format. Dans les études scientifiques, ces échelles montrent une grande cohérence interne avec des coefficients alpha de Cronbach généralement supérieurs à 0,80, reflétant une bonne fiabilité.
          </p>
          <p>
            Les méta-analyses récentes (2024) confirment que les traits mesurés par le modèle des Big Five sont prédictifs d'une grande variété de comportements et de résultats dans la vie quotidienne, professionnelle et relationnelle.
          </p>
        </section>
        
        <section className="mb-10">
          <h2 className="text-2xl font-display font-semibold">Calcul des scores</h2>
          <p>
            PrismPersona utilise une formule transparente pour le calcul des scores:
          </p>
          <pre>score_facette = moyenne(items de la facette)</pre>
          <pre>score_dimension = moyenne(facettes de la dimension)</pre>
          <p>
            Le test utilise des échelles de Likert à 7 points, permettant une granularité plus fine qu'une échelle à 5 points. Les scores bruts sont ensuite convertis en percentiles pour faciliter l'interprétation.
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-display font-semibold">Limites et considérations</h2>
          <p>
            Bien que scientifiquement fondé, PrismPersona présente certaines limites:
          </p>
          <ul>
            <li>L'auto-évaluation peut être influencée par des biais de perception de soi</li>
            <li>La personnalité n'est pas fixe et peut évoluer avec le temps</li>
            <li>Les traits mesurés ne représentent pas l'intégralité d'une personne</li>
            <li>PrismPersona n'est pas un outil de diagnostic clinique</li>
          </ul>
          <p>
            Ce test est conçu pour l'exploration personnelle et la réflexion, non pour remplacer l'évaluation professionnelle dans des contextes cliniques ou d'emploi.
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
