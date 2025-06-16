import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { appData, validateAnswer } from '@/lib/calculator';
import { UserAnswers, Question } from '@/types/calculator';
import { useTouchGestures } from '@/hooks/use-touch-gestures';

interface AssessmentScreenProps {
  onComplete: (answers: UserAnswers) => void;
  onBack: () => void;
  initialAnswers?: UserAnswers;
  initialQuestionIndex?: number;
}

export function AssessmentScreen({ 
  onComplete, 
  onBack, 
  initialAnswers = {}, 
  initialQuestionIndex = 0 
}: AssessmentScreenProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(initialQuestionIndex);
  const [userAnswers, setUserAnswers] = useState<UserAnswers>(initialAnswers);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const currentQuestion = appData.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / appData.questions.length) * 100;

  useTouchGestures({
    onSwipeLeft: () => {
      if (currentQuestionIndex < appData.questions.length - 1) {
        nextQuestion();
      }
    },
    onSwipeRight: () => {
      if (currentQuestionIndex > 0) {
        previousQuestion();
      }
    }
  });

  const validateCurrentQuestion = (): boolean => {
    const value = userAnswers[currentQuestion.field];
    
    // Handle different value types for validation
    let validationValue: string | number = '';
    if (Array.isArray(value)) {
      validationValue = value.join(',');
    } else if (typeof value === 'number') {
      validationValue = value;
    } else {
      validationValue = value as string || '';
    }
    
    const validation = validateAnswer(currentQuestion.field, validationValue);
    
    if (!validation.isValid) {
      setError(validation.error || 'Please provide a valid answer');
      return false;
    }
    
    setError('');
    return true;
  };

  const nextQuestion = () => {
    if (!validateCurrentQuestion()) return;
    
    if (currentQuestionIndex < appData.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setError('');
    } else {
      setIsLoading(true);
      setTimeout(() => {
        onComplete(userAnswers);
      }, 1500);
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setError('');
    } else {
      onBack();
    }
  };

  const handleAnswerChange = (field: string, value: string) => {
    setUserAnswers(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const renderQuestionInput = (question: Question) => {
    switch (question.type) {
      case 'number':
        return (
          <div className="space-y-4">
            <div className="relative mobile-input-focus transition-transform duration-200">
              <Input
                type="number"
                inputMode="numeric"
                pattern="[0-9]*"
                className={`w-full p-4 text-2xl font-semibold border-2 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-primary transition-all duration-200 ${
                  error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
                placeholder={question.placeholder}
                value={userAnswers[question.field] || ''}
                onChange={(e) => handleAnswerChange(question.field, e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    nextQuestion();
                  }
                }}
                autoFocus={false}
              />
              {question.unit && (
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 font-medium">
                  {question.unit}
                </div>
              )}
            </div>
            
            {/* Submit Button for Number Inputs */}
            <div className="flex justify-center mt-6">
              <Button
                onClick={nextQuestion}
                disabled={!userAnswers[question.field]}
                className="bg-primary hover:bg-primary/90 active:bg-primary/95 text-white px-12 py-4 rounded-full font-medium material-button mobile-button-active flex items-center justify-center touch-action-manipulation min-h-[56px] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg transform transition-all duration-150"
              >
                {currentQuestionIndex === appData.questions.length - 1 ? (
                  <>
                    <span className="material-icons mr-2 text-xl">calculate</span>
                    Calculate Results
                  </>
                ) : (
                  <>
                    <span className="material-icons mr-2 text-xl">chevron_right</span>
                    Continue
                  </>
                )}
              </Button>
            </div>
          </div>
        );

      case 'text':
        return (
          <div className="space-y-4">
            <div className="relative">
              <Input
                type="text"
                className={`w-full p-4 text-2xl font-semibold border-2 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-primary transition-all duration-200 ${
                  error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
                placeholder={question.placeholder}
                value={userAnswers[question.field] || ''}
                onChange={(e) => handleAnswerChange(question.field, e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    nextQuestion();
                  }
                }}
              />
            </div>
            
            {/* Submit Button for Text Inputs */}
            <div className="flex justify-center mt-6">
              <Button
                onClick={nextQuestion}
                disabled={!userAnswers[question.field]}
                className="bg-primary hover:bg-primary/90 active:bg-primary/95 text-white px-12 py-4 rounded-full font-medium material-button mobile-button-active flex items-center justify-center touch-action-manipulation min-h-[56px] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg transform transition-all duration-150"
              >
                {currentQuestionIndex === appData.questions.length - 1 ? (
                  <>
                    <span className="material-icons mr-2">calculate</span>
                    Calculate Results
                  </>
                ) : (
                  <>
                    <span className="material-icons mr-2">chevron_right</span>
                    Continue
                  </>
                )}
              </Button>
            </div>
          </div>
        );

      case 'checkbox':
        return (
          <div className="space-y-4">
            <div className="space-y-3">
              {question.options?.map((option, index) => {
                const currentAnswers = Array.isArray(userAnswers[question.field]) 
                  ? userAnswers[question.field] as string[]
                  : [];
                const isSelected = currentAnswers.includes(option.value);
                
                return (
                  <motion.div
                    key={option.value}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative cursor-pointer touch-action-manipulation min-h-[48px]"
                    onClick={() => {
                      let newAnswers = [...currentAnswers];
                      
                      if (option.value === 'none') {
                        // If "none" is selected, clear all others
                        newAnswers = isSelected ? [] : ['none'];
                      } else {
                        // Remove "none" if other options are selected
                        newAnswers = newAnswers.filter(a => a !== 'none');
                        
                        if (isSelected) {
                          newAnswers = newAnswers.filter(a => a !== option.value);
                        } else {
                          newAnswers.push(option.value);
                        }
                      }
                      
                      handleAnswerChange(question.field, newAnswers.join(','));
                      setUserAnswers(prev => ({ ...prev, [question.field]: newAnswers }));
                    }}
                  >
                    <div className={`flex items-center p-3 rounded-lg border-2 transition-all duration-200 ${
                      isSelected 
                        ? 'border-primary bg-primary/5 dark:bg-primary/10' 
                        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 hover:border-primary/50'
                    }`}>
                      <div className="flex-1">
                        <div className={`font-semibold text-lg ${
                          isSelected ? 'text-primary' : 'text-gray-900 dark:text-white'
                        }`}>
                          {option.label}
                        </div>
                        {option.description && (
                          <div className="text-gray-600 dark:text-gray-300 mt-1">
                            {option.description}
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                          isSelected 
                            ? 'border-primary bg-primary' 
                            : 'border-gray-300 dark:border-gray-600'
                        }`}>
                          {isSelected && <span className="material-icons text-white text-sm">check</span>}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            
            {/* Submit Button for Checkbox Inputs */}
            <div className="flex justify-center mt-6">
              <Button
                onClick={nextQuestion}
                disabled={(() => {
                  const value = userAnswers[question.field];
                  if (!value) return true;
                  if (Array.isArray(value)) return value.length === 0;
                  return false;
                })()}
                className="bg-primary hover:bg-primary/90 active:bg-primary/95 text-white px-12 py-4 rounded-full font-medium material-button mobile-button-active flex items-center justify-center touch-action-manipulation min-h-[56px] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg transform transition-all duration-150"
              >
                {currentQuestionIndex === appData.questions.length - 1 ? (
                  <>
                    <span className="material-icons mr-2 text-xl">calculate</span>
                    Calculate Results
                  </>
                ) : (
                  <>
                    <span className="material-icons mr-2 text-xl">chevron_right</span>
                    Continue
                  </>
                )}
              </Button>
            </div>
          </div>
        );

      case 'select':
        return (
          <div className="space-y-4">
            <div className="relative">
              <select
                className={`w-full p-4 text-2xl font-semibold border-2 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-primary transition-all duration-200 appearance-none ${
                  error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
                value={userAnswers[question.field] || ''}
                onChange={(e) => handleAnswerChange(question.field, e.target.value)}
              >
                <option value="">Select an option...</option>
                {appData.countries?.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <span className="material-icons text-gray-400">expand_more</span>
              </div>
            </div>
            
            {/* Submit Button for Select Inputs */}
            <div className="flex justify-center mt-6">
              <Button
                onClick={nextQuestion}
                disabled={!userAnswers[question.field]}
                className="bg-primary hover:bg-primary/90 active:bg-primary/95 text-white px-12 py-4 rounded-full font-medium material-button mobile-button-active flex items-center justify-center touch-action-manipulation min-h-[56px] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg transform transition-all duration-150"
              >
                {currentQuestionIndex === appData.questions.length - 1 ? (
                  <>
                    <span className="material-icons mr-2 text-xl">calculate</span>
                    Calculate Results
                  </>
                ) : (
                  <>
                    <span className="material-icons mr-2 text-xl">chevron_right</span>
                    Continue
                  </>
                )}
              </Button>
            </div>
          </div>
        );

      case 'radio':
        return (
          <div className="space-y-3">
            {question.options?.map((option, index) => {
              const isSelected = userAnswers[question.field] === option.value;
              
              return (
                <motion.div
                  key={option.value}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative cursor-pointer touch-action-manipulation min-h-[48px]"
                  onClick={() => {
                    handleAnswerChange(question.field, option.value);
                  }}
                >
                  <div className={`flex items-center p-3 rounded-lg border-2 transition-all duration-200 ${
                    isSelected 
                      ? 'border-primary bg-primary/5 dark:bg-primary/10' 
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 hover:border-primary/50'
                  }`}>
                    {option.icon && (
                      <span className={`material-icons mr-4 text-2xl ${
                        isSelected ? 'text-primary' : 'text-gray-400'
                      }`}>
                        {option.icon}
                      </span>
                    )}
                    <div className="flex-1">
                      <div className={`font-semibold text-lg ${
                        isSelected ? 'text-primary' : 'text-gray-900 dark:text-white'
                      }`}>
                        {option.label}
                      </div>
                      {option.description && (
                        <div className="text-gray-600 dark:text-gray-300 mt-1">
                          {option.description}
                        </div>
                      )}
                    </div>
                    <div className="ml-4">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        isSelected 
                          ? 'border-primary bg-primary' 
                          : 'border-gray-300 dark:border-gray-600'
                      }`}>
                        {isSelected && <div className="w-2 h-2 bg-white rounded-full"></div>}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
            
            {/* Submit Button for Radio Inputs */}
            <div className="flex justify-center mt-6">
              <Button
                onClick={nextQuestion}
                disabled={!userAnswers[question.field]}
                className="bg-primary hover:bg-primary/90 active:bg-primary/95 text-white px-12 py-4 rounded-full font-medium material-button mobile-button-active flex items-center justify-center touch-action-manipulation min-h-[56px] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg transform transition-all duration-150"
              >
                {currentQuestionIndex === appData.questions.length - 1 ? (
                  <>
                    <span className="material-icons mr-2 text-xl">calculate</span>
                    Calculate Results
                  </>
                ) : (
                  <>
                    <span className="material-icons mr-2 text-xl">chevron_right</span>
                    Continue
                  </>
                )}
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center card-elevated">
          <div className="animate-spin w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Processing your results...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-background">
      {/* Progress Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 no-print">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              onClick={previousQuestion}
              disabled={currentQuestionIndex === 0}
              className="flex items-center text-primary hover:text-primary/80 disabled:opacity-50 disabled:cursor-not-allowed touch-action-manipulation min-h-[48px]"
            >
              <span className="material-icons mr-1">chevron_left</span>
              Previous
            </Button>
            
            <div className="text-center">
              <div className="text-sm text-gray-500 dark:text-gray-400">Question</div>
              <div className="text-lg font-semibold">
                {currentQuestionIndex + 1} of {appData.questions.length}
              </div>
            </div>
            
            <Button
              variant="ghost"
              onClick={nextQuestion}
              className="flex items-center text-primary hover:text-primary/80 touch-action-manipulation min-h-[48px]"
            >
              {currentQuestionIndex === appData.questions.length - 1 ? 'Calculate' : 'Next'}
              <span className="material-icons ml-1">
                {currentQuestionIndex === appData.questions.length - 1 ? 'calculate' : 'chevron_right'}
              </span>
            </Button>
          </div>
          
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Question Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-2xl card-elevated"
          >
            <div className="p-8">
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                  {currentQuestion.question}
                </h2>
                {currentQuestion.description && (
                  <p className="text-gray-600 dark:text-gray-300 text-lg">
                    {currentQuestion.description}
                  </p>
                )}
              </div>
              
              <div className="mb-6">
                {renderQuestionInput(currentQuestion)}
              </div>
              
              {/* Validation Message */}
              {currentQuestion.validation && !error && (
                <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                  <span className="material-icons text-sm mr-1">info</span>
                  {currentQuestion.validation}
                </div>
              )}
              
              {/* Error Message */}
              {error && (
                <div className="text-red-600 dark:text-red-400 text-sm flex items-center">
                  <span className="material-icons text-sm mr-1">error</span>
                  {error}
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
        
        {/* Swipe Indicator for Mobile */}
        <div className="flex justify-center mt-6 md:hidden">
          <div className="flex space-x-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className={`h-2 rounded-full ${
                  i === 1 ? 'w-6 bg-primary' : 'w-2 bg-gray-300 dark:bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
