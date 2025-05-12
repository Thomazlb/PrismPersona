import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, ArrowLeft, Home, ChevronRight, ChevronLeft, Save, Trash2 } from 'lucide-react';
import LikertScale from './LikertScale';
import { useQuiz } from '@/contexts/QuizContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from './ui/pagination';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const QUESTIONS_PER_PAGE = 20;

const QuizPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const {
    questions,
    answers,
    progress,
    isComplete,
    selectAnswer,
    submitQuiz,
    resetQuiz
  } = useQuiz();

  const [currentPage, setCurrentPage] = useState(0);
  const [pageTransition, setPageTransition] = useState<'left' | 'right' | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [targetPage, setTargetPage] = useState(0);
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [scrolledPast, setScrolledPast] = useState(false);

  // Gérer le défilement pour afficher la barre de progression fixée
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setScrolledPast(scrollTop > 50); // Valeur plus petite pour que la barre se fixe plus rapidement
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Redirect to results if quiz is complete
  useEffect(() => {
    if (isComplete) {
      navigate('/results');
    }
  }, [isComplete, navigate]);

  // Calculate pagination
  const totalPages = Math.ceil(questions.length / QUESTIONS_PER_PAGE);
  const currentQuestions = questions.slice(
    currentPage * QUESTIONS_PER_PAGE, 
    (currentPage + 1) * QUESTIONS_PER_PAGE
  );

  // Navigation functions with improved animation handling
  const goToPage = (page: number) => {
    if (page === currentPage || isAnimating) return;
    
    setIsAnimating(true);
    setPageTransition(page > currentPage ? 'right' : 'left');
    setTargetPage(page);
    
    // Petit délai pour éviter de changer de page avant que l'animation ne commence
    // Ce qui cause l'effet saccadé
    setTimeout(() => {
      setCurrentPage(page);
      // Scroll en douceur après la fin de l'animation
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        // Réinitialiser l'état d'animation après la transition complète
        setTimeout(() => {
          setIsAnimating(false);
        }, 300);
      }, 200);
    }, 50);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages - 1 && !isAnimating) {
      goToPage(currentPage + 1);
    } else if (!isAnimating) {
      // Last page - vibrate device and animate button before submitting
      if (navigator.vibrate) {
        navigator.vibrate(100);
      }
      
      const unansweredCount = currentQuestions.filter(q => !answers[q.id]).length;
      if (unansweredCount > 0) {
        toast({
          title: "Questions non répondues",
          description: `Il reste ${unansweredCount} question(s) sans réponse sur cette page.`
        });
      } else {
        // Show submit confirmation
        submitQuiz();
      }
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 0 && !isAnimating) {
      goToPage(currentPage - 1);
    }
  };

  const handleReturnHome = () => {
    setShowExitDialog(true);
  };

  const handleContinueLater = () => {
    // Vibrate pattern for "going back" feedback
    if (navigator.vibrate) {
      navigator.vibrate([50, 50, 50]);
    }
    toast({
      title: "Progression sauvegardée",
      description: "Vous pourrez reprendre le test plus tard.",
      duration: 1000 // Notification disparaît après 1 seconde
    });
    navigate('/');
  };

  const handleResetAndExit = () => {
    // Vibrate pattern for "reset" feedback
    if (navigator.vibrate) {
      navigator.vibrate([100, 50, 100]);
    }
    resetQuiz();
    toast({
      title: "Progression réinitialisée",
      description: "Toutes les réponses ont été effacées.",
      duration: 1000 // Notification disparaît après 1 seconde
    });
    navigate('/');
  };

  // Handle answer selection with haptic feedback
  const handleSelectAnswer = (questionId: number, value: number) => {
    selectAnswer(questionId, value);
    
    // Provide haptic feedback when selecting an answer
    if (navigator.vibrate) {
      navigator.vibrate(20); // Light vibration
    }
  };

  const isLastPage = currentPage === totalPages - 1;

  // Animation variants with smoother transitions
  const pageVariants = {
    initial: (direction: 'left' | 'right' | null) => ({
      x: direction === 'right' ? 300 : direction === 'left' ? -300 : 0,
      opacity: 0,
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 250, damping: 25, restDelta: 0.01 },
        opacity: { duration: 0.3, ease: "easeInOut" }
      }
    },
    exit: (direction: 'left' | 'right' | null) => ({
      x: direction === 'right' ? -300 : direction === 'left' ? 300 : 0,
      opacity: 0,
      transition: {
        x: { type: "spring", stiffness: 250, damping: 25, restDelta: 0.01 },
        opacity: { duration: 0.3, ease: "easeInOut" }
      }
    })
  };

  return (
    <>
      <motion.div 
        className="max-w-3xl mx-auto px-4 py-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* En-tête avec bouton d'accueil et pourcentage */}
        <div 
          className={cn(
            "pt-2 pb-4 bg-background z-50 transition-all duration-300",
            scrolledPast ? "fixed top-0 left-0 right-0 shadow-md px-4" : "sticky top-0"
          )}
        >
          <div className={cn(
            "flex justify-between items-center mb-2",
            scrolledPast ? "max-w-3xl mx-auto" : ""
          )}>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleReturnHome}
              className="flex items-center gap-1 transition-all hover:scale-105"
            >
              <Home className="w-4 h-4" /> Accueil
            </Button>
            <span className="text-sm text-muted-foreground font-medium">
              {progress.toFixed(0)}% complété
            </span>
          </div>
          
          {/* Barre de progression (elle reste la même, mais se déplace avec l'en-tête) */}
          <div className="relative h-2 max-w-3xl mx-auto">
            <div className="absolute inset-0 bg-muted rounded-full"></div>
            <motion.div 
              className="absolute top-0 left-0 h-full bg-primary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ type: "spring", stiffness: 60, damping: 20 }}
              style={{ maxWidth: '100%' }}
            />
          </div>
        </div>

        {/* Contenu principal - ajout d'une marge supérieure si fixé */}
        <div className={cn(
          "relative", 
          scrolledPast ? "mt-16" : ""
        )}>
          <AnimatePresence mode="wait" custom={pageTransition}>
            <motion.div 
              key={currentPage}
              custom={pageTransition}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="my-8"
            >
              <div className="space-y-12">
                {currentQuestions.map((question, index) => (
                  <motion.div 
                    key={question.id} 
                    className="question-item"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.5 }}
                  >
                    <h2 className="text-xl font-medium mb-4">{question.text}</h2>
                    <LikertScale 
                      value={answers[question.id] || null} 
                      onChange={(value) => handleSelectAnswer(question.id, value)} 
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="py-4 border-t mt-8 sticky bottom-0 bg-background z-30">
            {/* Pagination avec un z-index plus élevé pour s'afficher par-dessus les autres éléments */}
            <div className="overflow-x-auto max-w-full mb-4">
              <Pagination>
                <PaginationContent>
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink 
                        isActive={currentPage === i}
                        onClick={() => goToPage(i)}
                        className="relative touch-manipulation"
                      >
                        {currentPage === i && (
                          <motion.div 
                            layoutId="activePage"
                            className="absolute inset-0 bg-primary rounded-md -z-10" 
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          />
                        )}
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                </PaginationContent>
              </Pagination>
            </div>
            
            {/* Navigation buttons */}
            <div className="flex justify-between">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="outline"
                  onClick={goToPrevPage}
                  disabled={currentPage === 0}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" /> Précédent
                </Button>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.98 }}
                className={isLastPage ? "relative overflow-hidden" : ""}
              >
                {isLastPage ? (
                  <Button 
                    onClick={submitQuiz}
                    className="flex items-center gap-2 relative z-10"
                  >
                    Voir mes résultats
                    <motion.div 
                      className="absolute inset-0 bg-green-500 -z-10"
                      initial={{ x: "-100%" }}
                      animate={{ x: 0 }}
                      transition={{ duration: 0.8, repeat: Infinity, repeatType: "mirror" }}
                    />
                  </Button>
                ) : (
                  <Button
                    onClick={goToNextPage}
                    className="flex items-center gap-2"
                  >
                    Suivant <ArrowRight className="w-4 h-4" />
                  </Button>
                )}
              </motion.div>
            </div>
          </div>

          {/* Mobile swipe indicators */}
          <div className="md:hidden flex justify-between items-center mt-6 text-muted-foreground text-sm">
            {currentPage > 0 && (
              <div className="flex items-center">
                <ChevronLeft className="w-4 h-4 mr-1" /> Glissez pour la page précédente
              </div>
            )}
            {currentPage < totalPages - 1 && (
              <div className="flex items-center ml-auto">
                Glissez pour la page suivante <ChevronRight className="w-4 h-4 ml-1" />
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Boîte de dialogue de confirmation personnalisée pour quitter le test */}
      <AlertDialog open={showExitDialog} onOpenChange={setShowExitDialog}>
        <AlertDialogContent className="max-w-[380px] rounded-lg"> {/* Coins arrondis */}
          <AlertDialogHeader>
            <AlertDialogTitle>Quitter le test ?</AlertDialogTitle>
            <AlertDialogDescription>
              Choisissez comment vous souhaitez quitter le test.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="grid grid-cols-1 gap-3 py-2">
            <Button 
              onClick={handleContinueLater} 
              className="flex items-center justify-start gap-2 w-full"
              variant="outline"
            >
              <Save className="w-4 h-4" /> 
              <div className="flex flex-col items-start text-left">
                <span className="font-medium">Continuer plus tard</span>
                <span className="text-xs text-muted-foreground">Vos réponses seront sauvegardées</span>
              </div>
            </Button>
            
            <Button 
              onClick={handleResetAndExit} 
              className="flex items-center justify-start gap-2 w-full"
              variant="outline"
              data-variant="destructive"
            >
              <Trash2 className="w-4 h-4" /> 
              <div className="flex flex-col items-start text-left">
                <span className="font-medium">Recommencer à zéro</span>
                <span className="text-xs text-muted-foreground">Toutes vos réponses seront effacées</span>
              </div>
            </Button>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

// Helper function pour la composition conditionnelle de classes
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

export default QuizPage;
