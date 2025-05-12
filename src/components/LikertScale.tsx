import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

type LikertScaleProps = {
  value: number | null;
  onChange: (value: number) => void;
  maxValue?: number;
  labels?: {
    min: string;
    max: string;
  };
  previousValue?: number | null; // Pour afficher l'ancienne réponse en mode "refaire le test"
  isRetaking?: boolean; // Indique si on est en mode "refaire le test"
};

const LikertScale: React.FC<LikertScaleProps> = ({
  value,
  onChange,
  maxValue = 7,
  labels = { min: "Pas du tout d'accord", max: "Tout à fait d'accord" },
  previousValue = null,
  isRetaking = false
}) => {
  // Track previous value for animations
  const [prevValue, setPrevValue] = useState<number | null>(value);
  
  // Update previous value when current value changes
  useEffect(() => {
    // Use a small timeout to let the animation finish
    const timer = setTimeout(() => {
      setPrevValue(value);
    }, 300);
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div className="w-full my-8 select-none">
      <div className="flex justify-between text-sm text-muted-foreground mb-3">
        <span>{labels.min}</span>
        <span>{labels.max}</span>
      </div>
      <div className="grid grid-cols-7 gap-1 sm:gap-2 w-full">
        {Array.from({ length: maxValue }).map((_, index) => {
          const optionValue = index + 1;
          const isActive = value === optionValue;
          const wasPreviouslySelected = previousValue === optionValue && isRetaking;
          const neutralValue = Math.ceil(maxValue / 2);
          
          // Déterminer la couleur basée sur la position relative au centre
          let baseColor: string;
          if (optionValue === neutralValue) {
            baseColor = '#9CA3AF'; // Gris neutre
          } else if (optionValue < neutralValue) {
            // Dégradé de rouge pour le désaccord
            const intensity = (neutralValue - optionValue) / (neutralValue - 1);
            // Rouge plus intense pour un désaccord plus fort
            baseColor = `rgba(239, 68, 68, ${0.5 + intensity * 0.5})`;
          } else {
            // Dégradé de vert pour l'accord
            const intensity = (optionValue - neutralValue) / (maxValue - neutralValue);
            // Vert plus intense pour un accord plus fort
            baseColor = `rgba(16, 185, 129, ${0.5 + intensity * 0.5})`;
          }
          
          return (
            <motion.div
              key={optionValue}
              className="relative flex justify-center"
            >
              {/* Si c'est une valeur précédente en mode refaire, on affiche un indicateur */}
              {wasPreviouslySelected && (
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-dashed opacity-40 dark:opacity-30"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 0.4 }}
                />
              )}
              
              <motion.button
                type="button"
                onClick={() => onChange(optionValue)}
                className={cn(
                  "likert-option rounded-full flex items-center justify-center text-xs md:text-sm transition-all",
                  "w-8 h-8 md:w-10 md:h-10 md:max-w-10 md:max-h-10", // Taille réduite sur desktop
                  isActive ? "text-white font-medium z-10" : "text-gray-800 dark:text-gray-200"
                )}
                aria-label={`Option ${optionValue} sur ${maxValue}`}
                style={{ 
                  backgroundColor: isActive ? baseColor : wasPreviouslySelected ? 'rgba(150, 150, 150, 0.2)' : 'rgba(150, 150, 150, 0.1)'
                }}
                whileTap={{ scale: 0.95 }}
                animate={{ 
                  scale: isActive ? 1.1 : wasPreviouslySelected ? 0.95 : 1,
                  backgroundColor: isActive ? baseColor : wasPreviouslySelected ? 'rgba(150, 150, 150, 0.2)' : 'rgba(150, 150, 150, 0.1)',
                  boxShadow: isActive ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none'
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 500, 
                  damping: 30 
                }}
              >
                {optionValue}
              </motion.button>
              
              {/* Animation de sélection */}
              <AnimatePresence mode="wait">
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-transparent"
                    initial={{ scale: 1.5, opacity: 0 }}
                    animate={{ scale: 1.1, opacity: 1 }}
                    exit={{ scale: 1.5, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div 
                      className="absolute inset-0 rounded-full"
                      style={{ backgroundColor: baseColor, opacity: 0.2 }}
                      animate={{ 
                        scale: [1.1, 1.1, 1.1],
                        opacity: [0.2, 0.2, 0.2]
                      }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 2,
                        repeatType: "reverse"
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default LikertScale;
