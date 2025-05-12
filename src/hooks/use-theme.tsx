import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

export function useTheme() {
  // État local pour suivre le thème actuel
  const [theme, setTheme] = useState<Theme>(() => {
    // Vérifier la préférence enregistrée dans localStorage
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedTheme = window.localStorage.getItem('theme') as Theme;
      if (storedTheme) {
        return storedTheme;
      }

      // Vérifier la préférence système
      const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return userPrefersDark ? 'dark' : 'light';
    }
    return 'light';
  });

  // Appliquer le thème à l'élément HTML
  useEffect(() => {
    const root = window.document.documentElement;
    
    // Supprimer les classes précédentes
    root.classList.remove('light', 'dark');
    
    // Ajouter la nouvelle classe
    root.classList.add(theme);
    
    // Enregistrer dans localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Fonction pour basculer entre les thèmes
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return { theme, toggleTheme };
}