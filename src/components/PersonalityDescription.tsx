import React from 'react';
import { PersonalityResult } from '@/types/personality';
import { generatePersonalizedDescription } from '@/data/archetypeDescriptions';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { dimensionHues } from '@/types/personality';

interface PersonalityDescriptionProps {
  result: PersonalityResult;
}

const PersonalityDescription: React.FC<PersonalityDescriptionProps> = ({ result }) => {
  // Génère la description personnalisée à partir des résultats
  const description = generatePersonalizedDescription(result);
  
  // Divise la description en paragraphes (séparés par des doubles sauts de ligne)
  const paragraphs = description.split('\n\n').filter(Boolean);

  // Extraire la première intro pour badge
  const [intro, ...otherParagraphs] = paragraphs;
  const pct = result.percentiles.dimensions[result.dominantDimension];
  // Calcul de la couleur dynamique HSL
  const hue = dimensionHues[result.dominantDimension];
  // lightness variant: de 90% (0 percentile) à 30% (100 percentile)
  const lightness = 90 - (pct / 100) * 60;
  const badgeColor = `hsl(${hue}, 70%, ${lightness}%)`;

  return (
    <motion.div
      className="my-10 max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <h2 className="text-2xl font-display font-semibold mb-6">Votre profil personnalisé</h2>
      
      <div className="bg-card border rounded-lg p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow">
        {/* Badge et intro dynamique */}
        <div className="flex items-center mb-6 space-x-4">
          <Badge style={{ backgroundColor: badgeColor, borderColor: badgeColor }}>{pct}ᵉ percentile</Badge>
          <p className="font-semibold">{intro}</p>
        </div>

        {otherParagraphs.map((paragraph, index) => {
          // Pour gérer le formatage du texte avec les titres en gras
          if (paragraph.startsWith('**')) {
            const parts = paragraph.split('**: ');
            const title = parts[0].replace('**', '');
            const content = parts[1];
            
            return (
              <motion.div 
                key={index} 
                className="mb-6 last:mb-0"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
              >
                <h3 className="text-lg font-semibold text-primary mb-2">{title}</h3>
                <p className="text-muted-foreground">{content}</p>
              </motion.div>
            );
          }
          
          // Paragraphes standard
          return (
            <motion.p 
              key={index} 
              className="mb-6 last:mb-0 leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
            >
              {paragraph}
            </motion.p>
          );
        })}
      </div>
    </motion.div>
  );
};

export default PersonalityDescription;