import React, { useRef, useState } from 'react';
import { Dimension, dimensions, facets, dimensionColors, dimensionDescriptions } from '@/types/personality';
import { InfoIcon, ChevronDown, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useTheme } from '@/hooks/use-theme';
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimatedTooltip } from '@/components/ui/animated-tooltip';

interface TraitBarsProps {
  dimensionScores: Record<Dimension, number>;
  facetScores: Record<string, number>;
}

// Composant pour les barres de progression animées avec un meilleur contraste
const AnimatedBar = ({ 
  percentage, 
  colorClass, 
  isDark 
}: { 
  percentage: number, 
  colorClass: string,
  isDark: boolean 
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  // Extraction de la couleur réelle à partir de la classe colorClass
  const getColorFromClass = () => {
    if (colorClass.includes('purple')) return isDark ? '#9b67ff' : '#8B5CF6';
    if (colorClass.includes('blue')) return isDark ? '#38bdf8' : '#0EA5E9';
    if (colorClass.includes('orange')) return isDark ? '#fb923c' : '#F97316';
    if (colorClass.includes('green')) return isDark ? '#34d399' : '#10B981';
    if (colorClass.includes('red')) return isDark ? '#fb7185' : '#F43F5E';
    return isDark ? '#9b67ff' : '#8B5CF6'; // Default
  };
  
  return (
    <div ref={ref} className="bg-muted dark:bg-gray-700 rounded-full h-3 overflow-hidden shadow-inner relative">
      <motion.div 
        className="h-full rounded-full"
        style={{ 
          width: isInView ? `${percentage}%` : '0%',
          backgroundImage: `linear-gradient(90deg, ${getColorFromClass()}cc, ${getColorFromClass()})`,
          boxShadow: isDark ? 'inset 0 1px 0 rgba(255,255,255,0.15)' : 'inset 0 1px 0 rgba(255,255,255,0.5)'
        }}
        initial={{ width: '0%' }}
        animate={{ width: isInView ? `${percentage}%` : '0%' }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
      />
    </div>
  );
};

const TraitBars: React.FC<TraitBarsProps> = ({ dimensionScores, facetScores }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [expandedDimensions, setExpandedDimensions] = useState<Record<string, boolean>>({});

  const toggleDimension = (dimension: string) => {
    setExpandedDimensions(prev => ({
      ...prev,
      [dimension]: !prev[dimension]
    }));
  };

  return (
    <div className="space-y-8">
      <motion.h2 
        className="text-2xl font-display font-semibold"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Vos traits de personnalité
      </motion.h2>

      {/* Main dimensions */}
      <motion.div 
        className="space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-xl font-semibold mb-4">Grandes dimensions</h3>
        
        {dimensions.map((dimension, index) => {
          const score = dimensionScores[dimension] || 0;
          const percentage = Math.round(((score - 1) / 6) * 100); // Convert from 1-7 scale to percentage
          const colorClass = dimensionColors[dimension].main;
          const dimensionColor = (() => {
            switch(dimension) {
              case 'Ouverture': return isDark ? '#9b67ff' : '#8B5CF6';
              case 'Conscienciosité': return isDark ? '#38bdf8' : '#0EA5E9';
              case 'Extraversion': return isDark ? '#fb923c' : '#F97316';
              case 'Agréabilité': return isDark ? '#34d399' : '#10B981';
              case 'Névrosisme': return isDark ? '#fb7185' : '#F43F5E';
              default: return isDark ? '#9b67ff' : '#8B5CF6';
            }
          })();

          return (
            <motion.div 
              key={dimension} 
              className="mb-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="trait-label">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{dimension}</span>
                  <AnimatedTooltip 
                    content={dimensionDescriptions[dimension]}
                    color={dimensionColor}
                    iconClassName="h-4 w-4"
                    side="top"
                  >
                    <InfoIcon className="h-4 w-4" />
                  </AnimatedTooltip>
                </div>
                <motion.span 
                  className="font-semibold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  {percentage}%
                </motion.span>
              </div>
              
              <AnimatedBar percentage={percentage} colorClass={colorClass} isDark={isDark} />
            </motion.div>
          );
        })}
      </motion.div>

      {/* Facets grouped by dimension with expand/collapse functionality */}
      <div className="mt-10">
        <motion.h3 
          className="text-xl font-semibold mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          Facettes détaillées
        </motion.h3>

        <div className="space-y-4">
          {dimensions.map((dimension, dimIndex) => {
            const dimensionFacets = Object.values(facets)
              .filter(facet => facet.dimension === dimension);
            
            // Déterminer la couleur pour cette dimension
            const dimensionColor = (() => {
              switch(dimension) {
                case 'Ouverture': return isDark ? '#9b67ff' : '#8B5CF6';
                case 'Conscienciosité': return isDark ? '#38bdf8' : '#0EA5E9';
                case 'Extraversion': return isDark ? '#fb923c' : '#F97316';
                case 'Agréabilité': return isDark ? '#34d399' : '#10B981';
                case 'Névrosisme': return isDark ? '#fb7185' : '#F43F5E';
                default: return isDark ? '#9b67ff' : '#8B5CF6';
              }
            })();
            
            const isExpanded = !!expandedDimensions[dimension];
            
            return (
              <motion.div 
                key={dimension} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + dimIndex * 0.2 }}
              >
                {/* Dimension header card - SUPPRESSION DE LA BORDURE DE COULEUR */}
                <Card className="overflow-hidden">
                  <div 
                    className="p-6 flex items-center justify-between cursor-pointer"
                    onClick={() => toggleDimension(dimension)}
                  >
                    <div className="flex items-center gap-2">
                      <h4 className="font-display font-semibold text-lg">{dimension}</h4>
                      <AnimatedTooltip 
                        content={dimensionDescriptions[dimension]}
                        color={dimensionColor}
                        iconClassName="h-4 w-4"
                        side="top"
                      >
                        <InfoIcon className="h-4 w-4" />
                      </AnimatedTooltip>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge style={{ backgroundColor: dimensionColor }}>
                        {dimensionScores[dimension] ? Math.round(((dimensionScores[dimension] - 1) / 6) * 100) : 0}%
                      </Badge>
                      <button 
                        className="p-1 hover:bg-accent rounded-full transition-colors"
                        aria-label={isExpanded ? "Réduire les facettes" : "Développer les facettes"}
                      >
                        {isExpanded ? (
                          <ChevronDown className="h-5 w-5" />
                        ) : (
                          <ChevronRight className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>
                  
                  {/* Facettes qui apparaissent/disparaissent avec animation */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 grid gap-3 md:grid-cols-1 lg:grid-cols-1">
                          {dimensionFacets.map((facet, facetIndex) => {
                            const score = facetScores[facet.id] || 0;
                            const percentage = Math.round(((score - 1) / 6) * 100);
                            
                            return (
                              <motion.div 
                                key={facet.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.2, delay: 0.05 * facetIndex }}
                                className="relative z-10 group py-2 pl-3 pr-3 rounded-lg bg-background/50"
                              >
                                <div className="flex items-center justify-between gap-2 mb-2">
                                  <div className="flex items-center gap-2">
                                    <h5 className="font-medium text-sm">{facet.name}</h5>
                                    <div className="z-50">
                                      <AnimatedTooltip 
                                        content={facet.description}
                                        color={dimensionColor}
                                        iconClassName="h-3.5 w-3.5"
                                        side="top"
                                      >
                                        <InfoIcon className="h-3.5 w-3.5" />
                                      </AnimatedTooltip>
                                    </div>
                                  </div>
                                  <span className="text-xs font-semibold w-10 text-right px-2 py-1 rounded" 
                                    style={{ backgroundColor: `${dimensionColor}20`, color: isDark ? dimensionColor : dimensionColor }}>
                                    {percentage}%
                                  </span>
                                </div>
                                
                                <div className="h-2 bg-muted dark:bg-gray-700 rounded-full overflow-hidden shadow-inner">
                                  <motion.div 
                                    className="h-full"
                                    style={{ 
                                      width: `${percentage}%`,
                                      background: `linear-gradient(90deg, ${dimensionColor}80, ${dimensionColor})`,
                                      borderRadius: '9999px',
                                      boxShadow: isDark ? 'inset 0 1px 0 rgba(255,255,255,0.1)' : 'inset 0 1px 0 rgba(255,255,255,0.3)'
                                    }}
                                    initial={{ width: '0%' }}
                                    animate={{ width: `${percentage}%` }}
                                    transition={{ duration: 0.8 }}
                                  />
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TraitBars;
