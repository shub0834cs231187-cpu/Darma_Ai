import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import Input from '../components/Input';
import Alert from '../components/Alert';
import { authAPI } from '../services/api';

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [alert, setAlert] = React.useState<{ type: 'success' | 'error'; message: string } | null>(null);

  React.useEffect(() => {
    if (!sessionStorage.getItem('passwordResetToken')) {
      navigate('/forgot-password', { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 8) {
      setAlert({ type: 'error', message: 'Your password must be at least 8 characters long.' });
      return;
    }

    if (password !== confirmPassword) {
      setAlert({ type: 'error', message: 'Passwords do not match.' });
      return;
    }

    const token = sessionStorage.getItem('passwordResetToken');
    if (!token) {
      navigate('/forgot-password', { replace: true });
      return;
    }

    setIsLoading(true);
    try {
      await authAPI.resetPassword(token, password);
      sessionStorage.removeItem('passwordResetToken');
      setAlert({ type: 'success', message: 'Password reset successfully. You can now sign in.' });
      setTimeout(() => navigate('/login'), 1000);
    } catch (error: any) {
      setAlert({
        type: 'error',
        message: error.response?.data?.detail || 'Unable to reset your password. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-dark-900">
      <Navbar />
      <div className="pt-20 pb-12 px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md mx-auto"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-dark-900 dark:text-background mb-2">
              Create New Password
            </h1>
            <p className="text-dark-600 dark:text-dark-400">
              Choose a new password for your DermaAI account.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {alert && (
              <Alert
                type={alert.type}
                message={alert.message}
                onClose={() => setAlert(null)}
              />
            )}

            <Input
              label="New Password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter a new password"
              minLength={8}
              required
            />

            <Input
              label="Confirm New Password"
              name="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your new password"
              minLength={8}
              required
            />

            <Button type="submit" size="lg" className="w-full" isLoading={isLoading}>
              Reset Password
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
