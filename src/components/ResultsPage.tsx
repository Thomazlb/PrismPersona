import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileDown, BarChart2, Sparkles } from 'lucide-react';
import { loadResults, exportResultsAsJson } from '@/utils/scoring';
import { PersonalityResult, archetypes } from '@/types/personality';
import RadarChart from './RadarChart';
import TraitBars from './TraitBars';
import PrismCard from './PrismCard';
import PersonalityDescription from './PersonalityDescription';
import ZodiacCard from './ZodiacCard';
import { getZodiacSign } from '@/data/astrologicalSigns';
import { motion } from 'framer-motion';

const ResultsPage: React.FC = () => {
  const [results, setResults] = useState<PersonalityResult | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Load results from localStorage
    const savedResults = loadResults();
    if (savedResults) {
      setResults(savedResults);
    }
    setLoading(false);
  }, []);

  // If results not available, show a message and option to take the quiz
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="h-12 w-12 rounded-full border-2 border-primary border-t-transparent animate-spin mb-4"></div>
          <p>Chargement de vos résultats...</p>
        </motion.div>
      </div>
    );
  }

  if (!results) {
    return (
      <motion.div 
        className="text-center py-16 max-w-lg mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-display font-bold mb-4">Aucun résultat disponible</h2>
        <p className="text-muted-foreground mb-8">
          Vous n'avez pas encore effectué le test de personnalité PrismPersona, ou vos résultats ne sont plus disponibles.
        </p>
        <Button 
          onClick={() => navigate('/')} 
          size="lg"
          className="hover:scale-105 transition-transform"
        >
          Commencer le test
        </Button>
      </motion.div>
    );
  }

  const { dimensionScores, facetScores, percentiles, dominantDimension, shadowTrait, archetype: archetypeId, secondaryDimension } = results;
  const archetype = archetypes.find(a => a.id === archetypeId);
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="max-w-3xl mx-auto px-4 py-8"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={item}>
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')} 
          className="mb-8 flex items-center gap-2 hover:-translate-x-1 transition-transform"
        >
          <ArrowLeft className="w-4 h-4" /> Retour à l'accueil
        </Button>
      </motion.div>
      
      <motion.div 
        className="text-center mb-12"
        variants={item}
      >
        <motion.h1 
          className="text-4xl font-display font-bold mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Votre profil de personnalité
        </motion.h1>
        <motion.p 
          className="text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Basé sur le modèle scientifique des Big Five
        </motion.p>
      </motion.div>
      
      {/* Archetype Section */}
      <motion.section 
        className="prism-section"
        variants={item}
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl font-display font-semibold">Votre archétype</h2>
          <motion.h3 
            className="text-3xl font-display font-bold mt-2 mb-4 text-primary"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5, type: "spring" }}
          >
            {archetype?.name}
          </motion.h3>
          <motion.p 
            className="max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            {archetype?.description}
          </motion.p>
        </div>
      </motion.section>

      {/* Radar Chart */}
      <motion.section 
        className="prism-section rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-gradient-to-br from-muted/30 to-muted/10"
        variants={item}
      >
        <h2 className="text-2xl font-display font-semibold text-center mb-8">Votre profil en un coup d'œil</h2>
        <RadarChart data={percentiles.dimensions} />
      </motion.section>
      
      {/* Description personnalisée détaillée */}
      <motion.section
        className="prism-section"
        variants={item}
      >
        <PersonalityDescription result={results} />
      </motion.section>
      
      {/* Trait Bars */}
      <motion.section 
        className="prism-section"
        variants={item}
      >
        <TraitBars 
          dimensionScores={dimensionScores} 
          facetScores={facetScores} 
        />
      </motion.section>
      
      {/* Prism Card */}
      <motion.section 
        className="prism-section"
        variants={item}
      >
        <PrismCard result={results} />
      </motion.section>
      
      {/* Correspondance Astrologique - NOUVELLE SECTION */}
      <motion.section 
        className="prism-section"
        variants={item}
      >
        <h2 className="text-2xl font-display font-semibold mb-6 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" /> Correspondance Astrologique
        </h2>
        <p className="text-muted-foreground mb-6">
          Si votre profil de personnalité était traduit dans le langage des astres, voici le signe qui vous correspondrait le mieux. Cette correspondance est basée sur les similitudes entre vos traits dominants et les caractéristiques traditionnellement associées aux signes du zodiaque.
        </p>
        <ZodiacCard zodiacInfo={getZodiacSign(dominantDimension, secondaryDimension)} />
      </motion.section>
      
      {/* Export & Retake */}
      <motion.section 
        className="prism-section border-t pt-8 mt-8"
        variants={item}
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-display font-semibold mb-2">Exportez vos données</h3>
            <p className="text-muted-foreground">Sauvegardez vos résultats pour y revenir plus tard</p>
          </div>
          
          <div className="flex gap-3">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" onClick={() => exportResultsAsJson(results)} className="flex items-center gap-2">
                <FileDown className="w-4 h-4" /> Exporter JSON
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button onClick={() => navigate('/')} className="flex items-center gap-2">
                <BarChart2 className="w-4 h-4" /> Refaire le test
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default ResultsPage;
