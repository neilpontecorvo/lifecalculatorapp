import { useState, useEffect } from 'react';
import { WelcomeScreen } from './WelcomeScreen';
import { AssessmentScreen } from './AssessmentScreen';
import { ResultsScreen } from './ResultsScreen';
import { ThemeToggle } from './ui/theme-toggle';
import { calculateLifeExpectancy } from '@/lib/calculator';
import { saveProgress, loadSavedProgress, saveResults, clearProgress } from '@/lib/storage';
import { UserAnswers, CalculationResults } from '@/types/calculator';

type Screen = 'welcome' | 'assessment' | 'results';

export function LifeExpectancyCalculator() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [userAnswers, setUserAnswers] = useState<UserAnswers>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [results, setResults] = useState<CalculationResults | null>(null);

  useEffect(() => {
    // Try to load saved progress
    const savedProgress = loadSavedProgress();
    if (savedProgress) {
      setUserAnswers(savedProgress.userAnswers);
      setCurrentQuestionIndex(savedProgress.currentQuestionIndex);
      // Optionally show a notification about restored progress
    }
  }, []);

  const handleStartAssessment = () => {
    setCurrentScreen('assessment');
  };

  const handleAssessmentComplete = (answers: UserAnswers) => {
    setUserAnswers(answers);
    const calculatedResults = calculateLifeExpectancy(answers);
    setResults(calculatedResults);
    saveResults(calculatedResults, answers);
    clearProgress(); // Clear progress since assessment is complete
    setCurrentScreen('results');
  };

  const handleBackToWelcome = () => {
    setCurrentScreen('welcome');
  };

  const handleRestart = () => {
    if (confirm('Are you sure you want to start a new assessment? This will clear your current results.')) {
      setUserAnswers({});
      setCurrentQuestionIndex(0);
      setResults(null);
      clearProgress();
      setCurrentScreen('welcome');
    }
  };

  // Save progress whenever answers change
  useEffect(() => {
    if (currentScreen === 'assessment' && Object.keys(userAnswers).length > 0) {
      saveProgress(currentQuestionIndex, userAnswers);
    }
  }, [userAnswers, currentQuestionIndex, currentScreen]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ThemeToggle />
      
      {currentScreen === 'welcome' && (
        <WelcomeScreen onStartAssessment={handleStartAssessment} />
      )}
      
      {currentScreen === 'assessment' && (
        <AssessmentScreen
          onComplete={handleAssessmentComplete}
          onBack={handleBackToWelcome}
          initialAnswers={userAnswers}
          initialQuestionIndex={currentQuestionIndex}
        />
      )}
      
      {currentScreen === 'results' && results && (
        <ResultsScreen
          results={results}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}
