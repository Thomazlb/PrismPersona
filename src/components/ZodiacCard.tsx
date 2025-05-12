import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ZodiacInfo } from '@/data/astrologicalSigns';
import { cn } from '@/lib/utils';

interface ZodiacCardProps {
  zodiacInfo: ZodiacInfo;
}

const ZodiacCard: React.FC<ZodiacCardProps> = ({ zodiacInfo }) => {
  const { name, dates, unicodeSymbol, description, traits, element } = zodiacInfo;
  
  // Créer un motif de constellation cohérent pour chaque signe du zodiaque
  const generateConstellation = (name: string) => {
    // Utiliser le nom comme graine pour que chaque signe ait son propre motif constant
    let seed = 0;
    for (let i = 0; i < name.length; i++) {
      seed += name.charCodeAt(i);
    }
    
    // Fonction simple de génération pseudo-aléatoire
    const random = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
    
    // Générer des points pour la constellation spécifique à ce signe
    const points = [];
    const mainPoints = [];
    
    // Créer des points principaux pour former la figure de la constellation
    for (let i = 0; i < 8; i++) {
      mainPoints.push({
        x: 15 + random() * 70, // Garder les points plus vers le centre
        y: 15 + random() * 70,
      });
    }
    
    // Créer les connections entre les points principaux
    // Au lieu de simplement connecter séquentiellement, créer une forme plus intéressante
    const connections = [];
    
    // Créer une forme de base qui relie tous les points séquentiellement
    for (let i = 0; i < mainPoints.length - 1; i++) {
      connections.push({
        start: i,
        end: i + 1
      });
    }
    
    // Ajouter quelques connections supplémentaires basées sur le nom (pour diversifier les formes)
    const connectionCount = Math.min(3, Math.floor(name.length / 3));
    for (let i = 0; i < connectionCount; i++) {
      const start = Math.floor(random() * mainPoints.length);
      let end = Math.floor(random() * mainPoints.length);
      // Éviter de connecter un point à lui-même
      while (end === start) {
        end = Math.floor(random() * mainPoints.length);
      }
      connections.push({ start, end });
    }
    
    // Créer des étoiles de fond aléatoires
    for (let i = 0; i < 60; i++) {
      points.push({
        x: random() * 100,
        y: random() * 100,
        size: random() * 1.5 + 0.5,
        opacity: random() * 0.6 + 0.2
      });
    }
    
    // Dessiner les étoiles de fond
    const backgroundStars = points.map((point, i) => (
      <div 
        key={`bg-star-${i}`}
        className="absolute rounded-full bg-white"
        style={{
          left: `${point.x}%`,
          top: `${point.y}%`,
          width: `${point.size}px`,
          height: `${point.size}px`,
          opacity: point.opacity,
          boxShadow: `0 0 ${point.size * 2}px rgba(255, 255, 255, ${point.opacity})`
        }}
      />
    ));
    
    // Dessiner les étoiles principales
    const mainStars = mainPoints.map((point, i) => (
      <div 
        key={`main-star-${i}`}
        className="absolute rounded-full bg-white"
        style={{
          left: `${point.x}%`,
          top: `${point.y}%`,
          width: `3px`,
          height: `3px`,
          opacity: 0.9,
          boxShadow: `0 0 6px 2px rgba(255, 255, 255, 0.7), 0 0 10px rgba(255, 255, 255, 0.5)`
        }}
      />
    ));
    
    // Renvoyer les étoiles de fond et principales (sans lignes de connexion)
    return [...backgroundStars, ...mainStars];
  };

  return (
    <Card className="relative overflow-hidden bg-black border-none shadow-xl">
      {/* Overlay de constellation */}
      <div className="absolute inset-0 overflow-hidden">
        {generateConstellation(name)}
      </div>
      
      <div className="relative z-10 p-8">
        <div className="flex flex-col items-center text-center mb-6 relative">
          {/* Halo lumineux derrière le symbole */}
          <div 
            className="absolute rounded-full"
            style={{
              width: '120px',
              height: '120px',
              background: 'radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, transparent 70%)',
              filter: 'blur(10px)',
            }}
          />
          
          {/* Symbole astrologique */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            className="text-7xl font-serif mb-4 relative text-amber-200"
            style={{ 
              textShadow: '0 0 10px rgba(255, 215, 0, 0.5), 0 0 20px rgba(255, 215, 0, 0.3)',
            }}
          >
            {unicodeSymbol}
          </motion.div>
          
          {/* Infos du signe */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold font-display text-white tracking-wide mb-1">
              {name}
            </h2>
            
            <p className="text-gray-300 mb-2 opacity-90">{dates}</p>
            
            <div className="inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm">
              <span className="text-gray-300 text-sm">Élément: {element}</span>
            </div>
          </motion.div>
        </div>
        
        {/* Description */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mb-8"
        >
          <p className="text-gray-200 leading-relaxed text-center max-w-2xl mx-auto mb-6">
            {description}
          </p>
        </motion.div>
        
        {/* Traits */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="flex flex-wrap gap-2 justify-center"
        >
          {traits.map((trait, index) => (
            <motion.div
              key={trait}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <Badge className="font-medium border-none bg-white/10 backdrop-blur-sm text-gray-200 hover:bg-white/20">
                {trait}
              </Badge>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Card>
  );
};

export default ZodiacCard;