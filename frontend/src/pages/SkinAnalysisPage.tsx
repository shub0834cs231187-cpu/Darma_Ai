import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
import Button from '../components/Button';
import Alert from '../components/Alert';
import Skeleton from '../components/Skeleton';
import { analysisAPI } from '../services/api';
import { useAuthStore } from '../services/store';
import { Upload, Loader } from 'lucide-react';

export default function SkinAnalysisPage() {
  const { user } = useAuthStore();
  const [image, setImage] = React.useState<File | null>(null);
  const [preview, setPreview] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [alert, setAlert] = React.useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [analysis, setAnalysis] = React.useState<any>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const getScoreColor = (score: number, isInverted?: boolean) => {
    if (isInverted) {
      // For acne and risk (lower is better)
      if (score <= 3) return 'from-green-500 to-emerald-500';
      if (score <= 6) return 'from-yellow-500 to-orange-500';
      return 'from-red-500 to-rose-500';
    }
    // For hydration and skin score (higher is better)
    if (score >= 7) return 'from-green-500 to-emerald-500';
    if (score >= 5) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-rose-500';
  };

  const handleAnalyze = async () => {
    if (!image) return;
    setIsLoading(true);

    try {
      const uploadResponse = await analysisAPI.uploadImage(image);
      const analyzeResponse = await analysisAPI.analyzeImage(uploadResponse.data.image_url, user?.id || 'demo-user');
      
      // Simulate 3 second processing animation
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setAnalysis(analyzeResponse.data);
      setAlert({ type: 'success', message: 'Analysis completed!' });
    } catch (error: any) {
      setAlert({
        type: 'error',
        message: 'Analysis failed. Please try again.',
      });
      console.error('Analysis error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background dark:bg-dark-900">
      <Navbar />
      <div className="pt-20 pb-12 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-dark-900 dark:text-background mb-2">
              Skin Analysis
            </h1>
            <p className="text-dark-600 dark:text-dark-400">
              Upload a photo of your skin for instant AI analysis
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Upload Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="p-8 h-full">
                <h2 className="text-xl font-bold text-dark-900 dark:text-background mb-6">
                  Upload Image
                </h2>

                {!preview ? (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-primary-300 dark:border-primary-700 rounded-lg p-12 text-center cursor-pointer hover:border-primary-500 transition"
                  >
                    <Upload className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                    <p className="font-semibold text-dark-900 dark:text-background mb-2">
                      Click to upload
                    </p>
                    <p className="text-sm text-dark-600 dark:text-dark-400">
                      PNG, JPG up to 10MB
                    </p>
                  </div>
                ) : (
                  <div>
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full rounded-lg mb-4"
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setImage(null);
                        setPreview(null);
                        setAnalysis(null);
                      }}
                      className="w-full"
                    >
                      Choose Different Image
                    </Button>
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                />

                {preview && (
                  <Button
                    onClick={handleAnalyze}
                    isLoading={isLoading}
                    className="w-full mt-4"
                  >
                    Analyze Now
                  </Button>
                )}
              </Card>
            </motion.div>

            {/* Results Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="p-8 h-full">
                <h2 className="text-xl font-bold text-dark-900 dark:text-background mb-6">
                  Analysis Results
                </h2>

                {alert && (
                  <Alert
                    type={alert.type}
                    message={alert.message}
                    onClose={() => setAlert(null)}
                  />
                )}

                {isLoading ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      className="mb-6"
                    >
                      <div className="w-20 h-20 border-4 border-primary-200 dark:border-primary-800 border-t-primary-600 dark:border-t-primary-400 rounded-full" />
                    </motion.div>
                    <p className="text-dark-600 dark:text-dark-400 animate-pulse">
                      Analyzing your skin...
                    </p>
                  </div>
                ) : analysis ? (
                  <div className="space-y-6">
                    <div className="pb-4 border-b-2 border-primary-300 dark:border-primary-700">
                      <p className="text-sm text-dark-600 dark:text-dark-400 mb-2">Skin Type</p>
                      <p className="text-xl font-bold text-dark-900 dark:text-background capitalize">
                        {analysis.skin_type}
                      </p>
                    </div>

                    {/* Skin Score */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="p-4 rounded-lg"
                      style={{
                        borderBottom: `4px solid ${getScoreColor(analysis.skin_score).includes('green') ? '#10b981' : getScoreColor(analysis.skin_score).includes('yellow') ? '#f59e0b' : '#ef4444'}`
                      }}
                    >
                      <div className="flex justify-between mb-2">
                        <span className="text-dark-700 dark:text-dark-300 font-semibold">Skin Score</span>
                        <span className={`text-lg font-bold bg-gradient-to-r ${getScoreColor(analysis.skin_score)} bg-clip-text text-transparent`}>
                          {analysis.skin_score}/10
                        </span>
                      </div>
                      <div className="w-full bg-dark-200 dark:bg-dark-700 rounded-full h-2.5 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${analysis.skin_score * 10}%` }}
                          transition={{ delay: 0.5, duration: 1 }}
                          className={`h-2.5 rounded-full bg-gradient-to-r ${getScoreColor(analysis.skin_score)}`}
                        />
                      </div>
                    </motion.div>

                    {/* Hydration */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="p-4 rounded-lg"
                      style={{
                        borderBottom: `4px solid ${getScoreColor(analysis.hydration_score).includes('green') ? '#10b981' : getScoreColor(analysis.hydration_score).includes('yellow') ? '#f59e0b' : '#ef4444'}`
                      }}
                    >
                      <div className="flex justify-between mb-2">
                        <span className="text-dark-700 dark:text-dark-300 font-semibold">Hydration</span>
                        <span className={`text-lg font-bold bg-gradient-to-r ${getScoreColor(analysis.hydration_score)} bg-clip-text text-transparent`}>
                          {analysis.hydration_score}/10
                        </span>
                      </div>
                      <div className="w-full bg-dark-200 dark:bg-dark-700 rounded-full h-2.5 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${analysis.hydration_score * 10}%` }}
                          transition={{ delay: 0.7, duration: 1 }}
                          className={`h-2.5 rounded-full bg-gradient-to-r ${getScoreColor(analysis.hydration_score)}`}
                        />
                      </div>
                    </motion.div>

                    {/* Acne Level */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="p-4 rounded-lg"
                      style={{
                        borderBottom: `4px solid ${getScoreColor(analysis.acne_score, true).includes('green') ? '#10b981' : getScoreColor(analysis.acne_score, true).includes('yellow') ? '#f59e0b' : '#ef4444'}`
                      }}
                    >
                      <div className="flex justify-between mb-2">
                        <span className="text-dark-700 dark:text-dark-300 font-semibold">Acne Level</span>
                        <span className={`text-lg font-bold bg-gradient-to-r ${getScoreColor(analysis.acne_score, true)} bg-clip-text text-transparent`}>
                          {analysis.acne_score}/10
                        </span>
                      </div>
                      <div className="w-full bg-dark-200 dark:bg-dark-700 rounded-full h-2.5 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(10 - analysis.acne_score) * 10}%` }}
                          transition={{ delay: 0.9, duration: 1 }}
                          className={`h-2.5 rounded-full bg-gradient-to-r ${getScoreColor(analysis.acne_score, true)}`}
                        />
                      </div>
                    </motion.div>

                    {/* Risk Score */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="p-4 rounded-lg"
                      style={{
                        borderBottom: `4px solid ${getScoreColor(analysis.risk_score, true).includes('green') ? '#10b981' : getScoreColor(analysis.risk_score, true).includes('yellow') ? '#f59e0b' : '#ef4444'}`
                      }}
                    >
                      <div className="flex justify-between mb-2">
                        <span className="text-dark-700 dark:text-dark-300 font-semibold">Risk Score</span>
                        <span className={`text-lg font-bold bg-gradient-to-r ${getScoreColor(analysis.risk_score, true)} bg-clip-text text-transparent`}>
                          {analysis.risk_score}/10
                        </span>
                      </div>
                      <div className="w-full bg-dark-200 dark:bg-dark-700 rounded-full h-2.5 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(10 - analysis.risk_score) * 10}%` }}
                          transition={{ delay: 1.1, duration: 1 }}
                          className={`h-2.5 rounded-full bg-gradient-to-r ${getScoreColor(analysis.risk_score, true)}`}
                        />
                      </div>
                    </motion.div>

                    {analysis.conditions?.length > 0 && (
                      <div>
                        <p className="text-sm text-dark-600 dark:text-dark-400 mb-2">Conditions</p>
                        <div className="flex flex-wrap gap-2">
                          {analysis.conditions.map((condition: string) => (
                            <span
                              key={condition}
                              className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded-full text-xs font-medium"
                            >
                              {condition}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-dark-600 dark:text-dark-400 text-center py-8">
                    Upload and analyze an image to see results
                  </p>
                )}
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
