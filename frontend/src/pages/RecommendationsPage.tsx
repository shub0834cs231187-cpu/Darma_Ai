import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
import Skeleton from '../components/Skeleton';
import { recommendationAPI } from '../services/api';
import { Clock, Moon } from 'lucide-react';

export default function RecommendationsPage() {
  const [recommendations, setRecommendations] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await recommendationAPI.getRecommendations();
        setRecommendations(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  const renderRoutine = (routine: any[], title: string, icon: React.ReactNode) => (
    <Card className="p-8">
      <div className="flex items-center gap-3 mb-6">
        {icon}
        <h2 className="text-2xl font-bold text-dark-900 dark:text-background">
          {title}
        </h2>
      </div>

      <div className="space-y-4">
        {routine?.map((product, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex gap-4 p-4 bg-background dark:bg-dark-800 rounded-lg border border-primary-100 dark:border-dark-700"
          >
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold">
              {index + 1}
            </div>
            <div className="flex-1">
              <p className="font-semibold text-dark-900 dark:text-background">
                {product.product_name}
              </p>
              <p className="text-sm text-dark-600 dark:text-dark-400">
                {product.time}
              </p>
              <p className="text-sm text-dark-700 dark:text-dark-300 mt-1">
                {product.reason}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background dark:bg-dark-900">
      <Navbar />
      <div className="pt-20 pb-12 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-dark-900 dark:text-background mb-2">
              Personalized Recommendations
            </h1>
            <p className="text-dark-600 dark:text-dark-400">
              Custom skincare routines designed for your skin type
            </p>
          </motion.div>

          {isLoading ? (
            <div className="space-y-8">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-48" />
              ))}
            </div>
          ) : recommendations ? (
            <div className="space-y-8">
              {/* Morning Routine */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {renderRoutine(
                  recommendations.morning_routine,
                  'Morning Routine',
                  <Clock className="w-8 h-8 text-primary-600" />
                )}
              </motion.div>

              {/* Night Routine */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {renderRoutine(
                  recommendations.night_routine,
                  'Night Routine',
                  <Moon className="w-8 h-8 text-secondary-600" />
                )}
              </motion.div>

              {/* Weekly Routine */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {renderRoutine(
                  recommendations.weekly_routine,
                  'Weekly Routine',
                  <span className="text-2xl">📅</span>
                )}
              </motion.div>
            </div>
          ) : (
            <Card className="p-8 text-center">
              <p className="text-dark-600 dark:text-dark-400">
                No recommendations available. Complete a skin analysis first.
              </p>
            </Card>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
