import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Question } from '@/types/personality';
import { questions as allQuestions } from '@/data/questions';
import { processResponses, saveResults } from '@/utils/scoring';
import { toast } from "sonner";
import { useNavigate } from 'react-router-dom';

type QuizContextType = {
  questions: Question[];
  answers: Record<number, number>;
  progress: number;
  isComplete: boolean;
  selectAnswer: (questionId: number, answer: number) => void;
  startQuiz: () => void;
  resetQuiz: () => void;
  submitQuiz: () => void;
};

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};

const STORAGE_KEY = 'prismPersona_progress';

type QuizProviderProps = {
  children: React.ReactNode;
};

export const QuizProvider: React.FC<QuizProviderProps> = ({ children }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isComplete, setIsComplete] = useState<boolean>(false);
  
  // Nous ne pouvons pas utiliser useNavigate directement ici car il doit être utilisé à l'intérieur
  // du composant qui appelle submitQuiz. Nous allons gérer cela différemment.

  // Load questions and saved progress
  useEffect(() => {
    setQuestions(allQuestions);

    // Try to load saved progress from localStorage
    try {
      const savedProgress = localStorage.getItem(STORAGE_KEY);
      if (savedProgress) {
        const { answers: savedAnswers } = JSON.parse(savedProgress);
        setAnswers(savedAnswers || {});
      }
    } catch (error) {
      console.error('Failed to load saved progress:', error);
    }
  }, []);

  // Calculate progress based on answered questions
  const progress = questions.length > 0
    ? (Object.keys(answers).length / questions.length) * 100
    : 0;

  // Save progress to localStorage whenever answers change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        answers,
        timestamp: Date.now()
      }));
    } catch (error) {
      console.error('Failed to save progress:', error);
    }
  }, [answers]);

  const startQuiz = useCallback(() => {
    setAnswers({});
    setIsComplete(false);
  }, []);

  const resetQuiz = useCallback(() => {
    setAnswers({});
    setIsComplete(false);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const selectAnswer = useCallback((questionId: number, answer: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  }, []);

  const submitQuiz = useCallback(() => {
    // Check if we have enough answers
    const answeredQuestions = Object.keys(answers).length;
    if (answeredQuestions < questions.length * 0.8) {
      toast.error(`Veuillez répondre à au moins 80% des questions (${Math.ceil(questions.length * 0.8)} sur ${questions.length})`);
      return;
    }

    // Process responses to generate personality profile
    const results = processResponses(answers, questions);
    
    // Save results to localStorage
    saveResults(results);
    
    // Show completion message
    toast.success("Test terminé ! Vos résultats sont prêts.");
    
    // Set complete flag
    setIsComplete(true);
    
    // Clear the quiz progress since the test is complete
    localStorage.removeItem(STORAGE_KEY);
    
    // Au lieu de rediriger directement ici, nous utiliserons un effet
  }, [answers, questions]);

  // Value object that will be passed to context consumers
  const value: QuizContextType = {
    questions,
    answers,
    progress,
    isComplete,
    selectAnswer,
    startQuiz,
    resetQuiz,
    submitQuiz
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};
