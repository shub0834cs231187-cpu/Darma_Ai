import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
import Button from '../components/Button';
import Skeleton from '../components/Skeleton';
import { analysisAPI, recommendationAPI } from '../services/api';
import { useAuthStore } from '../services/store';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Activity, TrendingUp, Heart, AlertCircle } from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuthStore();
  const [analyses, setAnalyses] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await analysisAPI.getAnalysisHistory();
        setAnalyses(response.data.items);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const recentAnalysis = analyses[0];
  const chartData = analyses.slice(0, 7).reverse().map((analysis, index) => ({
    date: `Day ${index + 1}`,
    score: analysis.skin_score,
  }));

  const normalizeScore = (value: number) => {
    const numericValue = Number(value) || 0;
    return Math.min(10, Math.max(0, numericValue));
  };

  const getScoreStyle = (value: number, isInverted = false) => {
    const score = normalizeScore(value);
    const isGood = isInverted ? score <= 3 : score >= 7;
    const isAverage = isInverted ? score <= 6 : score >= 5;

    if (isGood) {
      return {
        text: 'text-green-600 dark:text-green-400',
        bar: 'bg-gradient-to-r from-green-500 to-emerald-500',
      };
    }

    if (isAverage) {
      return {
        text: 'text-yellow-600 dark:text-yellow-400',
        bar: 'bg-gradient-to-r from-yellow-500 to-orange-500',
      };
    }

    return {
      text: 'text-red-600 dark:text-red-400',
      bar: 'bg-gradient-to-r from-red-500 to-rose-500',
    };
  };

  return (
    <div className="min-h-screen bg-background dark:bg-dark-900">
      <Navbar />
      <div className="pt-20 pb-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold text-dark-900 dark:text-background mb-2">
              Welcome back, {user?.first_name}!
            </h1>
            <p className="text-dark-600 dark:text-dark-400">
              Track your skin health journey
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid md:grid-cols-4 gap-6 mb-8"
          >
            {[
              { label: 'Analyses', value: analyses.length, icon: Activity },
              { label: 'Avg Score', value: analyses.length > 0 ? Math.round(analyses.reduce((a, b) => a + b.skin_score, 0) / analyses.length) : 0, icon: TrendingUp },
              { label: 'Current Status', value: recentAnalysis?.skin_type || 'Pending', icon: Heart },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-dark-600 dark:text-dark-400 text-sm mb-1">
                        {stat.label}
                      </p>
                      <p className="text-3xl font-bold text-dark-900 dark:text-background">
                        {loading ? <Skeleton className="h-8 w-12" /> : stat.value}
                      </p>
                    </div>
                    <Icon className="w-8 h-8 text-primary-600 opacity-20" />
                  </div>
                </Card>
              );
            })}
          </motion.div>

          {/* Recent Analysis */}
          {recentAnalysis && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid md:grid-cols-2 gap-8 mb-8"
            >
              {/* Scores */}
              <Card className="p-8">
                <h2 className="text-xl font-bold text-dark-900 dark:text-background mb-6">
                  Latest Analysis Scores
                </h2>
                <div className="space-y-6">
                  {[
                    { label: 'Skin Score', value: recentAnalysis.skin_score },
                    { label: 'Hydration', value: recentAnalysis.hydration_score },
                    { label: 'Acne Level', value: recentAnalysis.acne_score, isInverted: true },
                    { label: 'Risk Score', value: recentAnalysis.risk_score, isInverted: true },
                  ].map((score, index) => {
                    const normalizedScore = normalizeScore(score.value);
                    const scoreStyle = getScoreStyle(score.value, score.isInverted);
                    const progressValue = score.isInverted ? (10 - normalizedScore) * 10 : normalizedScore * 10;

                    return (
                      <div key={index}>
                        <div className="flex justify-between mb-2">
                          <span className="text-dark-700 dark:text-dark-300">{score.label}</span>
                          <span className={`font-bold ${scoreStyle.text}`}>{normalizedScore}/10</span>
                        </div>
                        <div className="w-full bg-dark-200 dark:bg-dark-700 rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-2 rounded-full ${scoreStyle.bar}`}
                            style={{ width: `${progressValue}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>

              {/* Chart */}
              <Card className="p-8">
                <h2 className="text-xl font-bold text-dark-900 dark:text-background mb-6">
                  Skin Score Trend
                </h2>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="date" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="#6c63ff"
                      strokeWidth={2}
                      dot={{ fill: '#6c63ff' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </motion.div>
          )}

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="text-xl font-bold text-dark-900 dark:text-background mb-4">
              Quick Actions
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-8 text-center cursor-pointer hover:shadow-glow transition" onClick={() => window.location.href = '/skin-analysis'}>
                <Activity className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                <h3 className="font-bold text-dark-900 dark:text-background mb-2">New Analysis</h3>
                <p className="text-sm text-dark-600 dark:text-dark-400">Upload and analyze your skin</p>
              </Card>
              <Card className="p-8 text-center cursor-pointer hover:shadow-glow transition" onClick={() => window.location.href = '/product-analyzer'}>
                <TrendingUp className="w-12 h-12 text-secondary-600 mx-auto mb-4" />
                <h3 className="font-bold text-dark-900 dark:text-background mb-2">Product Analyzer</h3>
                <p className="text-sm text-dark-600 dark:text-dark-400">Check product ingredients</p>
              </Card>
              <Card className="p-8 text-center cursor-pointer hover:shadow-glow transition" onClick={() => window.location.href = '/recommendations'}>
                <Heart className="w-12 h-12 text-red-600 mx-auto mb-4" />
                <h3 className="font-bold text-dark-900 dark:text-background mb-2">Recommendations</h3>
                <p className="text-sm text-dark-600 dark:text-dark-400">Get personalized routines</p>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
