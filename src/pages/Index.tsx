
import React from 'react';
import WelcomePage from '../components/WelcomePage';
import { QuizProvider } from '@/contexts/QuizContext';

const Index = () => {
  return (
    <QuizProvider>
      <WelcomePage />
    </QuizProvider>
  );
};

export default Index;
