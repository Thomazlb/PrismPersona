import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { InfoIcon } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { createPortal } from "react-dom";

interface AnimatedTooltipProps {
  content: React.ReactNode;
  children?: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  color?: string;
  icon?: React.ReactNode;
  className?: string;
  iconClassName?: string;
  tooltipClassName?: string;
}

export const AnimatedTooltip = ({
  content,
  children,
  side = "top",
  color,
  icon = <InfoIcon className="h-4 w-4" />,
  className = "",
  iconClassName = "",
  tooltipClassName = "",
}: AnimatedTooltipProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const tooltipRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [arrowPosition, setArrowPosition] = useState({ left: '50%', top: 'auto', bottom: '-4px' });
  
  // Fonction pour calculer la position exacte du tooltip
  const calculatePosition = () => {
    if (!triggerRef.current || !tooltipRef.current) return;
    
    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Position par défaut - centré au-dessus de l'icône
    let top = triggerRect.top - tooltipRect.height - 8;
    let left = triggerRect.left + (triggerRect.width / 2) - (tooltipRect.width / 2);
    
    // Ajustement horizontal - ne pas dépasser les bords de l'écran
    if (left < 10) {
      left = 10;
    } else if (left + tooltipRect.width > viewportWidth - 10) {
      left = viewportWidth - tooltipRect.width - 10;
    }
    
    // Position de la flèche - elle doit pointer vers le milieu de l'icône
    const idealArrowLeft = triggerRect.left + (triggerRect.width / 2) - left;
    const arrowLeftPercent = (idealArrowLeft / tooltipRect.width) * 100;
    
    // S'assurer que la flèche reste dans les limites du tooltip (avec marge)
    const minArrowPercent = 10;
    const maxArrowPercent = 90;
    const clampedArrowPercent = Math.max(minArrowPercent, Math.min(maxArrowPercent, arrowLeftPercent));
    
    // Si le tooltip dépasse le haut de l'écran, l'afficher en dessous de l'icône
    let arrowTop = 'auto';
    let arrowBottom = '-4px';
    let arrowRotation = 'rotate(45deg)';
    
    if (top < 10) {
      top = triggerRect.bottom + 8;
      arrowTop = '-4px';
      arrowBottom = 'auto';
      arrowRotation = 'rotate(225deg)';
    }
    
    setTooltipPosition({ top, left });
    setArrowPosition({
      left: `${clampedArrowPercent}%`,
      top: arrowTop,
      bottom: arrowBottom,
    });
    
    // Mise à jour des styles du tooltip
    if (tooltipRef.current) {
      tooltipRef.current.style.transform = `none`; // Reset transform
      tooltipRef.current.style.maxHeight = `${Math.min(400, viewportHeight - 20)}px`;
    }
    
    // Mise à jour des styles de la flèche
    if (arrowRef.current) {
      arrowRef.current.style.transform = `translateX(-50%) ${arrowRotation}`;
    }
  };
  
  // Calculer la position lorsque le tooltip s'ouvre
  useEffect(() => {
    if (isOpen) {
      // Petit délai pour permettre au tooltip de s'afficher avant de calculer
      const timer = setTimeout(calculatePosition, 10);
      
      // Ajouter listener pour recalculer en cas de défilement ou redimensionnement
      window.addEventListener('resize', calculatePosition);
      window.addEventListener('scroll', calculatePosition, true);
      
      return () => {
        clearTimeout(timer);
        window.removeEventListener('resize', calculatePosition);
        window.removeEventListener('scroll', calculatePosition, true);
      };
    }
  }, [isOpen]);
  
  // Fermer le tooltip au clic en dehors
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (triggerRef.current && !triggerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const handleIconClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <div
      ref={triggerRef}
      className={cn(
        "relative inline-block",
        className
      )}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div
        className={cn(
          "transition-opacity hover:opacity-100 opacity-70 z-10",
          iconClassName
        )}
        style={{
          cursor: "help",
          color: color || "currentColor",
        }}
        role="button"
        tabIndex={0}
        aria-label="Afficher des informations"
        onClick={handleIconClick}
      >
        {children || icon}
      </div>

      {isOpen && typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          <motion.div
            ref={tooltipRef}
            className={cn(
              "fixed z-[999] p-3 px-4 rounded-lg text-sm shadow-lg border",
              isDark ? "bg-gray-900 border-gray-800 text-gray-100" : "bg-white border-gray-200 text-gray-800",
              tooltipClassName
            )}
            style={{
              boxShadow: `0 4px 14px 0 ${isDark ? "rgba(0, 0, 0, 0.3)" : "rgba(0, 0, 0, 0.1)"}`,
              ...(color ? { borderColor: `${color}50` } : {}),
              top: tooltipPosition.top,
              left: tooltipPosition.left,
              minWidth: "200px",
              maxWidth: "380px",
              width: "auto",
              maxHeight: "calc(80vh - 20px)",
              overflowY: "auto"
            }}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 400,
              duration: 0.2,
            }}
          >
            <div
              ref={arrowRef}
              className="tooltip-arrow absolute w-4 h-4 rounded-sm"
              style={{
                background: isDark ? "#111827" : "#ffffff",
                bottom: arrowPosition.bottom,
                top: arrowPosition.top,
                left: arrowPosition.left,
                boxShadow: isDark ? "0 1px 1px rgba(0, 0, 0, 0.3)" : "0 1px 1px rgba(0, 0, 0, 0.1)",
                transform: "translateX(-50%) rotate(45deg)",
                ...(color ? { background: color } : {}),
              }}
            />
            <div className={cn("relative z-10", color ? `text-${color}-800` : "")}>{content}</div>
          </motion.div>
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
};