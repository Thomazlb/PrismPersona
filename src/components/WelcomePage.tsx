import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { loadResults } from '@/utils/scoring';
import { ArrowRight, BarChart2, Info, Shield, History } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logoImage from '../contexts/prismpersona.png';

const WelcomePage: React.FC = () => {
  const [hasExistingResults, setHasExistingResults] = useState(false);
  const [hasSavedProgress, setHasSavedProgress] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user has previous results
    const savedResults = loadResults();
    setHasExistingResults(!!savedResults);
    
    // Check if user has saved progress
    try {
      const savedProgress = localStorage.getItem('prismPersona_progress');
      if (savedProgress) {
        const { answers } = JSON.parse(savedProgress);
        setHasSavedProgress(Object.keys(answers).length > 0);
      }
    } catch (error) {
      console.error('Failed to check saved progress:', error);
    }
  }, []);

  const startQuiz = () => {
    navigate('/quiz');
  };

  const viewResults = () => {
    navigate('/results');
  };

  const continueQuiz = () => {
    navigate('/quiz');
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <img src={logoImage} alt="PrismPersona Logo" className="h-24 w-auto" />
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 leading-tight">
            Découvrez votre profil de personnalité unique avec{" "}
            <span className="text-primary">PrismPersona</span>
          </h1>
          
          <p className="text-xl mb-10 text-muted-foreground">
            Un test personnalisé basé sur le modèle scientifique des Big Five pour révéler les nuances de votre personnalité.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {hasSavedProgress ? (
              <Button onClick={continueQuiz} size="lg" className="flex items-center gap-2">
                <History className="w-4 h-4" /> Continuer le test
              </Button>
            ) : (
              <Button onClick={startQuiz} size="lg" className="flex items-center gap-2">
                Commencer le test <ArrowRight className="w-4 h-4" />
              </Button>
            )}
            
            {hasExistingResults && (
              <Button onClick={viewResults} variant="outline" size="lg" className="flex items-center gap-2">
                <BarChart2 className="w-4 h-4" /> Voir mes résultats
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-display font-bold text-center mb-12">
            Pourquoi PrismPersona?
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<BarChart2 className="w-6 h-6 text-primary" />}
              title="Scientifiquement validé"
              description="Basé sur le modèle des Big Five, reconnu par la recherche en psychologie moderne."
            />
            
            <FeatureCard 
              icon={<Shield className="w-6 h-6 text-primary" />}
              title="Vie privée respectée"
              description="Tout se passe dans votre navigateur, aucune donnée n'est stockée sur nos serveurs."
            />
            
            <FeatureCard 
              icon={<Info className="w-6 h-6 text-primary" />}
              title="Résultats détaillés"
              description="Découvrez vos traits dominants et leurs interactions avec une analyse nuancée."
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-center mb-12">
            Comment ça fonctionne
          </h2>
          
          <div className="space-y-8">
            <Step 
              number={1} 
              title="Répondez à 120 questions"
              description="Un test court mais efficace pour capturer l'essence de votre personnalité."
            />
            
            <Step 
              number={2} 
              title="Recevez votre analyse personnalisée"
              description="Visualisez vos traits, facettes et dimensions sur un graphique radar personnalisé."
            />
            
            <Step 
              number={3} 
              title="Découvrez votre archétype unique"
              description="Votre combinaison de traits détermine votre archétype de personnalité."
            />
            
            <Step 
              number={4} 
              title="Partagez votre carte Prisme"
              description="Téléchargez et partagez votre profil unique sur les réseaux sociaux."
            />
          </div>
          
          <div className="text-center mt-12">
            <Button onClick={startQuiz} size="lg" className="flex items-center mx-auto gap-2">
              Commencer le test <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="py-8 px-4 border-t">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-muted-foreground">
            © 2025 PrismPersona — Basé sur le modèle des Big Five et la recherche en psychologie moderne.
          </p>
        </div>
      </footer>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-card shadow-sm border rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-display font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

interface StepProps {
  number: number;
  title: string;
  description: string;
}

const Step: React.FC<StepProps> = ({ number, title, description }) => {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold">
        {number}
      </div>
      <div>
        <h3 className="text-xl font-display font-semibold mb-1">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default WelcomePage;
