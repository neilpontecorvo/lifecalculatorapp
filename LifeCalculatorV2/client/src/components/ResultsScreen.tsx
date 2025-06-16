import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CalculationResults } from '@/types/calculator';
import { exportResults, shareResults } from '@/lib/storage';
import { useToast } from '@/hooks/use-toast';

interface ResultsScreenProps {
  results: CalculationResults;
  onRestart: () => void;
}

export function ResultsScreen({ results, onRestart }: ResultsScreenProps) {
  const [progressOffset, setProgressOffset] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    // Calculate progress based on remaining years (max 80 years)
    const maxYears = 80;
    const percentage = Math.min(100, Math.max(0, (results.remainingYears / maxYears) * 100));
    const circumference = 2 * Math.PI * 40; // r=40
    const offset = circumference - (percentage / 100) * circumference;
    
    // Start animation after component mounts
    setTimeout(() => {
      setProgressOffset(offset);
    }, 300);
  }, [results.remainingYears]);

  const handleExport = () => {
    exportResults(results);
    toast({
      title: "Results exported",
      description: "Your results have been downloaded successfully.",
    });
  };

  const handleShare = async () => {
    const success = await shareResults(results);
    if (success) {
      toast({
        title: "Results shared",
        description: "Your results have been shared successfully.",
      });
    } else {
      toast({
        title: "Share failed",
        description: "Unable to share results. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'red';
      case 'moderate':
        return 'yellow';
      default:
        return 'green';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'primary';
      case 'moderate':
        return 'secondary';
      default:
        return 'muted';
    }
  };

  return (
    <section className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="material-icons text-2xl text-white">analytics</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Your Life Expectancy Results
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Based on your comprehensive health assessment
          </p>
        </motion.div>

        {/* Main Results Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Primary Result Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 bg-gradient-to-br from-primary to-primary/80 text-white rounded-2xl p-8 card-elevated"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Remaining Life Expectancy</h3>
              <span className="material-icons text-primary-foreground/70">schedule</span>
            </div>
            <div className="text-5xl md:text-6xl font-bold mb-2">
              {results.remainingYears}
            </div>
            <p className="text-primary-foreground/80 text-lg">years remaining</p>
            
            {/* Circular Progress */}
            <div className="mt-6 flex justify-center">
              <div className="relative w-24 h-24">
                <svg className="w-24 h-24 transform -rotate-90">
                  <circle 
                    cx="48" 
                    cy="48" 
                    r="40" 
                    stroke="rgba(255,255,255,0.2)" 
                    strokeWidth="8" 
                    fill="none"
                  />
                  <circle 
                    cx="48" 
                    cy="48" 
                    r="40" 
                    stroke="white" 
                    strokeWidth="8" 
                    fill="none" 
                    strokeDasharray={2 * Math.PI * 40}
                    strokeDashoffset={progressOffset}
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                
              </div>
            </div>
          </motion.div>
          
          {/* Secondary Results */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 card-elevated"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Expected Age</h3>
              <span className="material-icons text-gray-400">cake</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {results.expectedAge}
            </div>
            <p className="text-gray-500 dark:text-gray-400">years old</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 card-elevated"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Remaining Heartbeats</h3>
              <span className="material-icons text-red-400 animate-pulse-gentle">favorite</span>
            </div>
            <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {results.remainingHeartbeats.toLocaleString()}
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">estimated beats</p>
          </motion.div>
        </div>

        {/* Confidence Range */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 card-elevated mb-8"
        >
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <span className="material-icons mr-2 text-primary">insights</span>
            Confidence Range
          </h3>
          <div className="flex items-center justify-between">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {results.confidenceLow}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Lower bound</div>
            </div>
            <div className="flex-1 mx-6">
              <div className="relative h-4 bg-gray-200 dark:bg-gray-700 rounded-full">
                <div 
                  className="absolute h-4 bg-gradient-to-r from-secondary to-primary rounded-full" 
                  style={{ width: '60%', left: '20%' }}
                />
                <div 
                  className="absolute w-3 h-3 bg-primary rounded-full top-0.5" 
                  style={{ left: '50%', transform: 'translateX(-50%)' }}
                />
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {results.confidenceHigh}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Upper bound</div>
            </div>
          </div>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
            ±15% confidence interval
          </p>
        </motion.div>

        {/* Risk Factors Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-8 card-elevated mb-8"
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <span className="material-icons mr-3 text-red-500">warning</span>
            Risk Factor Analysis
          </h2>
          <div className="space-y-4">
            {results.riskFactors.length === 0 ? (
              <div className="flex items-center p-4 bg-green-50 dark:bg-green-900/30 rounded-xl">
                <span className="material-icons text-green-600 dark:text-green-400 mr-3">
                  check_circle
                </span>
                <div>
                  <div className="font-semibold text-green-800 dark:text-green-200">
                    No Major Risk Factors
                  </div>
                  <div className="text-green-600 dark:text-green-300">
                    Your assessment shows no significant risk factors
                  </div>
                </div>
              </div>
            ) : (
              results.riskFactors.map((factor, index) => {
                const color = getSeverityColor(factor.severity);
                const icon = factor.severity === 'high' ? 'error' : 'warning';
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-center p-4 bg-${color}-50 dark:bg-${color}-900/30 rounded-xl`}
                  >
                    <span className={`material-icons text-${color}-600 dark:text-${color}-400 mr-3`}>
                      {icon}
                    </span>
                    <div className="flex-1">
                      <div className={`font-semibold text-${color}-800 dark:text-${color}-200`}>
                        {factor.factor}
                      </div>
                      <div className={`text-${color}-600 dark:text-${color}-300`}>
                        {factor.description}
                      </div>
                    </div>
                    <div className={`text-${color}-700 dark:text-${color}-300 font-medium`}>
                      {factor.impact}
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
        </motion.div>

        {/* Personalized Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-8 card-elevated mb-8"
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <span className="material-icons mr-3 text-secondary">lightbulb</span>
            Personalized Recommendations
          </h2>
          <div className="space-y-4">
            {results.recommendations.map((rec, index) => {
              const color = getPriorityColor(rec.priority);
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-start p-4 bg-${color}/5 dark:bg-${color}/10 rounded-xl`}
                >
                  <span className={`material-icons text-${color} mr-3 mt-1`}>
                    {rec.icon}
                  </span>
                  <div>
                    <div className={`font-semibold text-${color} mb-1`}>
                      {rec.title}
                    </div>
                    <div className="text-gray-600 dark:text-gray-300">
                      {rec.description}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center no-print"
        >
          <Button
            onClick={handleExport}
            className="bg-secondary hover:bg-secondary/90 text-white px-8 py-3 rounded-full font-medium material-button flex items-center justify-center touch-action-manipulation min-h-[48px]"
          >
            <span className="material-icons mr-2">download</span>
            Export Results
          </Button>
          
          <Button
            onClick={handleShare}
            className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full font-medium material-button flex items-center justify-center touch-action-manipulation min-h-[48px]"
          >
            <span className="material-icons mr-2">share</span>
            Share Results
          </Button>
          
          <Button
            onClick={onRestart}
            variant="outline"
            className="border-2 border-primary text-primary hover:bg-primary/5 px-8 py-3 rounded-full font-medium material-button flex items-center justify-center touch-action-manipulation min-h-[48px]"
          >
            <span className="material-icons mr-2">refresh</span>
            Calculate Again
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
