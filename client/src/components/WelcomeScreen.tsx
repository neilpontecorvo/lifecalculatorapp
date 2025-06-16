import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface WelcomeScreenProps {
  onStartAssessment: () => void;
}

export function WelcomeScreen({ onStartAssessment }: WelcomeScreenProps) {
  return (
    <section className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-900 dark:to-green-900">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <span className="material-icons text-3xl text-white">favorite</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Life Expectancy Calculator
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Discover your personalized life expectancy with our comprehensive 13-question assessment based on scientific research and validated risk factors.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {[
            {
              icon: 'assessment',
              title: 'Comprehensive Assessment',
              description: '10 carefully selected questions covering lifestyle, health, and demographic factors',
              delay: 0
            },
            {
              icon: 'science',
              title: 'Scientific Accuracy',
              description: 'Based on Cox proportional hazards model with validated risk coefficients',
              delay: 0.1
            },
            {
              icon: 'insights',
              title: 'Personalized Results',
              description: 'Detailed analysis with confidence intervals and health recommendations',
              delay: 0.2
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: feature.delay }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 card-elevated"
            >
              <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="material-icons text-primary">{feature.icon}</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="space-y-6"
        >
          <Button
            onClick={onStartAssessment}
            className="bg-primary hover:bg-primary/90 text-white px-12 py-4 rounded-full text-lg font-medium shadow-lg material-button transform hover:scale-105 transition-all duration-200 touch-action-manipulation min-h-[48px]"
            size="lg"
          >
            <span className="material-icons mr-2">play_arrow</span>
            Begin Assessment
          </Button>
          
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-2xl mx-auto flex items-center justify-center">
            <span className="material-icons text-sm mr-1">info</span>
            This calculator provides estimates for educational purposes only and should not replace professional medical advice.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
