import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, TrendingUp } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
import Button from '../components/Button';
import Skeleton from '../components/Skeleton';
import { analysisAPI } from '../services/api';

export default function TrendTrackingPage() {
  const navigate = useNavigate();
  const [analyses, setAnalyses] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchAnalyses = async () => {
      try {
        const response = await analysisAPI.getAnalysisHistory(1, 20);
        setAnalyses(response.data.items || []);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalyses();
  }, []);

  const chartData = analyses.slice().reverse().map((analysis) => ({
    date: new Date(analysis.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
    score: Number(analysis.skin_score) || 0,
    hydration: Number(analysis.hydration_score) || 0,
  }));

  const averageScore = analyses.length
    ? Math.round(analyses.reduce((total, analysis) => total + (Number(analysis.skin_score) || 0), 0) / analyses.length)
    : 0;

  return (
    <div className="min-h-screen bg-background dark:bg-dark-900">
      <Navbar />
      <div className="pt-20 pb-12 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <h1 className="text-4xl font-bold text-dark-900 dark:text-background mb-2">
              Skin Trend Tracking
            </h1>
            <p className="text-dark-600 dark:text-dark-400">
              Review how your skin health changes across your analyses.
            </p>
          </motion.div>

          {isLoading ? (
            <div className="space-y-6">
              <Skeleton className="h-28" />
              <Skeleton className="h-80" />
            </div>
          ) : analyses.length === 0 ? (
            <Card className="p-10 text-center">
              <Activity className="w-10 h-10 text-primary-600 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-dark-900 dark:text-background mb-2">No analysis history yet</h2>
              <p className="text-dark-600 dark:text-dark-400 mb-6">
                Complete a skin analysis to begin tracking your results.
              </p>
              <Button onClick={() => navigate('/skin-analysis')}>Start Skin Analysis</Button>
            </Card>
          ) : (
            <div className="space-y-8">
              <div className="grid sm:grid-cols-2 gap-6">
                <Card className="p-6">
                  <p className="text-sm text-dark-600 dark:text-dark-400 mb-1">Total Analyses</p>
                  <p className="text-3xl font-bold text-dark-900 dark:text-background">{analyses.length}</p>
                </Card>
                <Card className="p-6">
                  <p className="text-sm text-dark-600 dark:text-dark-400 mb-1">Average Skin Score</p>
                  <p className="text-3xl font-bold text-dark-900 dark:text-background">{averageScore}/10</p>
                </Card>
              </div>

              <Card className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <TrendingUp className="w-6 h-6 text-primary-600" />
                  <h2 className="text-xl font-bold text-dark-900 dark:text-background">Skin Score and Hydration</h2>
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="date" stroke="#6b7280" />
                      <YAxis domain={[0, 10]} stroke="#6b7280" />
                      <Tooltip />
                      <Line type="monotone" dataKey="score" name="Skin score" stroke="#7c3aed" strokeWidth={3} />
                      <Line type="monotone" dataKey="hydration" name="Hydration" stroke="#0891b2" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
