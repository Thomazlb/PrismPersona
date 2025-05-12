import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { motion } from 'framer-motion';
import { dimensions, dimensionColors } from '@/types/personality';
import { useTheme } from '@/hooks/use-theme';

interface DataPoint {
  [key: string]: number;
}

const RadarChart = ({ data, size = 300 }: { data: DataPoint, size?: number }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [activeDimension, setActiveDimension] = useState<string | null>(null);
  const { theme } = useTheme();
  const chartContainerRef = useRef<HTMLDivElement>(null);
  
  // Gestionnaire pour les clics en dehors du graphique
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (chartContainerRef.current && !chartContainerRef.current.contains(event.target as Node)) {
        setActiveDimension(null);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Effet principal pour dessiner et gérer le graphique
  useEffect(() => {
    if (!svgRef.current) return;
    
    // Nettoyer le SVG existant
    d3.select(svgRef.current).selectAll('*').remove();
    
    // Dimensions du graphique
    const width = size;
    const height = size;
    const margin = 40;
    const radius = (Math.min(width, height) - margin * 2) / 2;
    const center = { x: width / 2, y: height / 2 };
    
    // Créer le SVG
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${center.x}, ${center.y})`);
    
    // Angles pour chaque dimension
    const angles = {
      'Ouverture': 0,
      'Conscienciosité': Math.PI * 2 / 5,
      'Extraversion': Math.PI * 4 / 5,
      'Agréabilité': Math.PI * 6 / 5,
      'Névrosisme': Math.PI * 8 / 5
    };
    
    const angleScale = (dimension: string) => angles[dimension as keyof typeof angles] || 0;
    
    // Échelle pour convertir les valeurs en rayons
    const radiusScale = d3.scaleLinear()
      .domain([0, 100])
      .range([0, radius]);
    
    // Dessiner les cercles de fond
    const circles = [20, 40, 60, 80, 100];
    circles.forEach(value => {
      svg.append('circle')
        .attr('r', radiusScale(value))
        .attr('fill', 'none')
        .attr('stroke', theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)')
        .attr('stroke-width', 0.5)
        .attr('opacity', theme === 'dark' ? 0.3 : 0.2);
    });
    
    // Ajouter les axes radiaux du centre vers le bord
    dimensions.forEach(dimension => {
      const angle = angleScale(dimension);
      const x = Math.sin(angle) * radius;
      const y = -Math.cos(angle) * radius;
      
      svg.append('line')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', x)
        .attr('y2', y)
        .attr('stroke', theme === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)')
        .attr('stroke-width', 1)
        .attr('stroke-dasharray', '3,3');
    });
    
    // Ajouter les étiquettes aux axes
    dimensions.forEach(dimension => {
      const angle = angleScale(dimension);
      const x = Math.sin(angle) * (radius + 20);
      const y = -Math.cos(angle) * (radius + 20);
      
      const label = svg.append('g')
        .attr('transform', `translate(${x}, ${y})`)
        .attr('class', 'dimension-label cursor-pointer')
        .style('opacity', 0.8)
        .on('click', () => {
          setActiveDimension(dimension === activeDimension ? null : dimension);
        });
        
      // Cercle de fond pour le texte
      label.append('circle')
        .attr('r', 15)
        .attr('fill', theme === 'dark' ? 'rgba(30, 30, 30, 0.8)' : 'rgba(255, 255, 255, 0.8)')
        .attr('opacity', 0.6);
        
      // Texte de l'étiquette
      label.append('text')
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'middle')
        .attr('font-size', 12)
        .attr('font-weight', 'bold')
        .attr('fill', theme === 'dark' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)')
        .text(dimension);
    });
    
    // Créer le chemin du radar
    const radarLine = (points: [string, number][]) => {
      let pathData = "";
      points.forEach((point, i) => {
        const [dimension, value] = point;
        const angle = angleScale(dimension);
        const r = radiusScale(value);
        const x = Math.sin(angle) * r;
        const y = -Math.cos(angle) * r;
        
        if (i === 0) {
          pathData += `M ${x},${y} `;
        } else {
          pathData += `L ${x},${y} `;
        }
      });
      pathData += "Z"; // Fermer le chemin
      return pathData;
    };
    
    const dataPoints: [string, number][] = dimensions.map(dim => [dim, data[dim]]);
    
    // Dessiner le chemin du radar
    const mainPath = svg.append('path')
      .attr('d', radarLine(dataPoints))
      .attr('fill', theme === 'dark' ? 'rgba(139, 92, 246, 0.2)' : 'rgba(139, 92, 246, 0.3)')
      .attr('stroke', '#8B5CF6')
      .attr('stroke-width', 2)
      .attr('opacity', 0)
      .attr('class', 'dimension-path');
    
    // Ajouter les points de données et les lignes
    dimensions.forEach(dimension => {
      const value = data[dimension];
      const angle = angleScale(dimension);
      const x = Math.sin(angle) * radiusScale(value);
      const y = -Math.cos(angle) * radiusScale(value);
      const dimensionClass = `dimension-path-${dimension.toLowerCase().replace(/\s+/g, '-')}`;
      const lineClass = `line-${dimension.toLowerCase().replace(/\s+/g, '-')}`;
      
      // Ajouter une ligne du centre à chaque point de données
      svg.append('line')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', x)
        .attr('y2', y)
        .attr('stroke', theme === 'dark' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.3)')
        .attr('stroke-width', 1.5)
        .attr('opacity', 0.8)
        .attr('class', `dimension-line ${lineClass}`)
        .attr('data-dimension', dimension);
      
      // Ajouter les points de données
      const point = svg.append('g')
        .attr('class', `dimension-point ${dimensionClass}`)
        .attr('transform', `translate(${x}, ${y})`);
      
      // Point visible
      point.append('circle')
        .attr('r', 6)
        .attr('fill', getDimensionColor(dimension))
        .attr('stroke', theme === 'dark' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 1)')
        .attr('stroke-width', 1.5)
        .attr('opacity', 0.8);
        
      // Zone de détection pour les clics
      point.append('circle')
        .attr('r', 15)
        .attr('fill', 'transparent')
        .attr('class', 'hover-area')
        .on('click', () => {
          setActiveDimension(dimension === activeDimension ? null : dimension);
        });
    });
    
    // Animation d'apparition du radar
    mainPath.transition()
      .duration(1000)
      .attr('opacity', 0.8);
    
    // Nettoyage au démontage
    return () => {
      d3.select(svgRef.current).selectAll('.hover-area').on('click', null);
      d3.select(svgRef.current).selectAll('.dimension-label').on('click', null);
    };
  }, [size, theme, data]);
  
  // Effet pour gérer la mise en évidence de la dimension active
  useEffect(() => {
    if (!svgRef.current) return;
    
    const svg = d3.select(svgRef.current);
    
    // Réinitialiser toutes les lignes à leur état normal
    svg.selectAll('.dimension-line')
      .transition()
      .duration(200)
      .attr('stroke-width', 1.5)
      .attr('stroke', theme === 'dark' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.3)')
      .attr('opacity', 0.4);
    
    svg.selectAll('.dimension-point circle')
      .filter(function() {
        const element = this as Element;
        return !element.classList?.contains('hover-area');
      })
      .transition()
      .duration(200)
      .attr('r', 6)
      .attr('opacity', 0.4);
    
    // Si une dimension est active, la mettre en évidence
    if (activeDimension) {
      const dimensionClass = activeDimension.toLowerCase().replace(/\s+/g, '-');
      const lineClass = `.line-${dimensionClass}`;
      
      // Mettre en évidence la ligne active
      svg.select(lineClass)
        .transition()
        .duration(400)
        .attr('stroke-width', 3)
        .attr('stroke', getDimensionColor(activeDimension))
        .attr('opacity', 1);
      
      // Mettre en évidence le point actif
      svg.selectAll(`.dimension-path-${dimensionClass} circle`)
        .filter(function() {
          const element = this as Element;
          return !element.classList?.contains('hover-area');
        })
        .transition()
        .duration(400)
        .attr('r', 8)
        .attr('opacity', 1);
    } else {
      // Si aucune dimension n'est active, restaurer toutes les opacités
      svg.selectAll('.dimension-line')
        .transition()
        .duration(400)
        .attr('opacity', 0.8);
      
      svg.selectAll('.dimension-point circle')
        .filter(function() {
          const element = this as Element;
          return !element.classList?.contains('hover-area');
        })
        .transition()
        .duration(400)
        .attr('opacity', 0.8);
    }
  }, [activeDimension, theme]);
  
  // Fonction pour obtenir la couleur de chaque dimension
  function getDimensionColor(dimension: string): string {
    switch(dimension) {
      case 'Ouverture': return '#8B5CF6';
      case 'Conscienciosité': return '#0EA5E9';
      case 'Extraversion': return '#F97316';
      case 'Agréabilité': return '#10B981';
      case 'Névrosisme': return '#F43F5E';
      default: return '#8B5CF6';
    }
  }
  
  return (
    <motion.div 
      ref={chartContainerRef}
      className="radar-container relative"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <svg ref={svgRef} className="w-full h-full"></svg>
    </motion.div>
  );
};

export default RadarChart;
