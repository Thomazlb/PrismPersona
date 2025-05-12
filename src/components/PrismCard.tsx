import React, { useEffect, useRef } from 'react';
import { archetypes } from '@/types/personality';
import { Button } from '@/components/ui/button';
import { Download, Share2 } from 'lucide-react';
import { PersonalityResult } from '@/types/personality';
import { motion } from 'framer-motion';
import html2canvas from 'html2canvas';
import { useTheme } from '@/hooks/use-theme';
import { getZodiacSign } from '@/data/astrologicalSigns';

interface PrismCardProps {
  result: PersonalityResult;
}

const PrismCard: React.FC<PrismCardProps> = ({ result }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  const { dominantDimension, secondaryDimension, archetype: archetypeId } = result;
  const archetype = archetypes.find(a => a.id === archetypeId) || archetypes[0];
  const zodiac = getZodiacSign(dominantDimension, secondaryDimension);

  // Set card gradient based on dominant dimension
  useEffect(() => {
    if (cardRef.current) {
      const card = cardRef.current;
      let startColor = '';
      let endColor = '';
      
      switch(dominantDimension) {
        case 'Ouverture':
          startColor = '#D6BCFA';
          endColor = '#9b87f5';
          break;
        case 'Conscienciosité':
          startColor = '#D3E4FD';
          endColor = '#0EA5E9';
          break;
        case 'Extraversion':
          startColor = '#FDE1D3';
          endColor = '#F97316';
          break;
        case 'Agréabilité':
          startColor = '#F2FCE2';
          endColor = '#10B981';
          break;
        case 'Névrosisme':
          startColor = '#FFDEE2';
          endColor = '#F43F5E';
          break;
        default:
          startColor = '#D6BCFA';
          endColor = '#9b87f5';
      }
      
      card.style.setProperty('--card-gradient-start', startColor);
      card.style.setProperty('--card-gradient-end', endColor);
    }
  }, [dominantDimension]);

  // Calculer les couleurs de carte basées sur la dimension dominante
  const getCardColors = () => {
    switch(dominantDimension) {
      case 'Ouverture': return { 
        gradientStart: '#D6BCFA', 
        gradientEnd: '#9b87f5',
        textShadow: '0 2px 4px rgba(155, 135, 245, 0.3)'
      };
      case 'Conscienciosité': return { 
        gradientStart: '#D3E4FD', 
        gradientEnd: '#0EA5E9',
        textShadow: '0 2px 4px rgba(14, 165, 233, 0.3)'
      };
      case 'Extraversion': return { 
        gradientStart: '#FDE1D3', 
        gradientEnd: '#F97316',
        textShadow: '0 2px 4px rgba(249, 115, 22, 0.3)'
      };
      case 'Agréabilité': return { 
        gradientStart: '#F2FCE2', 
        gradientEnd: '#10B981',
        textShadow: '0 2px 4px rgba(16, 185, 129, 0.3)'
      };
      case 'Névrosisme': return { 
        gradientStart: '#FFDEE2', 
        gradientEnd: '#F43F5E',
        textShadow: '0 2px 4px rgba(244, 63, 94, 0.3)'
      };
      default: return { 
        gradientStart: '#D6BCFA', 
        gradientEnd: '#9b87f5',
        textShadow: '0 2px 4px rgba(155, 135, 245, 0.3)'
      };
    }
  };

  const { gradientStart, gradientEnd, textShadow } = getCardColors();

  return (
    <div className="my-10">
      <h2 className="text-2xl font-serif font-medium mb-6 text-gray-700 text-center">Votre Carte Prisme</h2>
      <div
        ref={cardRef}
        id="prism-card-export"
        className="origami-card rounded-lg mx-auto max-w-md bg-white p-6 shadow-md"
      >
        <div className="origami-content">
          {/* Ascendant astrologique en français */}
          <div className="text-center mb-4">
            <span className="text-sm font-serif text-gray-600">Ascendant astrologique : {zodiac.name}</span>
          </div>
          <div className="flex flex-col h-full justify-between">
            <div className="mb-4 text-left">
              <span className="text-sm font-serif text-gray-500 uppercase tracking-widest">PRISMPERSONA</span>
            </div>
            <div className="text-center py-4 z-10 relative">
              <h3 className="text-xl font-serif font-bold mb-1 text-gray-800">{archetype.name}</h3>
              <p className="text-sm text-gray-600 mb-4">Ascendant {secondaryDimension}</p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {archetype.adjectives.map((adj, i) => (
                  <span key={i} className="text-xs font-serif bg-gray-200 text-gray-800 px-3 py-1 rounded-md">{adj}</span>
                ))}
              </div>
            </div>
            <div className="text-right text-xs opacity-80 mt-4">{new Date().toLocaleDateString('fr-FR')}</div>
          </div>
        </div>
      </div>
      {/* Styles Origami */}
      <style>{`  
        .origami-card { position: relative; border: 1px solid #e5e7eb; overflow: hidden; }
        .origami-card::before { content: ''; position: absolute; top: 0; right: 0; width: 60px; height: 60px; background: #f3f4f6; clip-path: polygon(0 0, 100% 0, 0 100%); z-index: 0; }
        .origami-card > .origami-content { position: relative; z-index: 1; }
      `}</style>
    </div>
  );
};

export default PrismCard;
