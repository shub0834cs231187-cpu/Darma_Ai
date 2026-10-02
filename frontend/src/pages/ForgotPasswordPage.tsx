import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import Input from '../components/Input';
import Alert from '../components/Alert';
import { authAPI } from '../services/api';

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [otp, setOtp] = React.useState('');
  const [step, setStep] = React.useState<'email' | 'otp'>('email');
  const [isLoading, setIsLoading] = React.useState(false);
  const [alert, setAlert] = React.useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await authAPI.forgotPassword(email);
      setAlert({
        type: 'success',
        message: response.data.message || 'A verification code has been sent.',
      });
      setStep('otp');
    } catch (error: any) {
      setAlert({
        type: 'error',
        message: error.response?.data?.detail || 'Unable to send reset instructions. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await authAPI.verifyPasswordResetOtp(email, otp);
      sessionStorage.setItem('passwordResetToken', response.data.reset_token);
      navigate('/reset-password');
    } catch (error: any) {
      setAlert({
        type: 'error',
        message: error.response?.data?.detail || 'Unable to verify the code. Please try again.',
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
              {step === 'email' ? 'Forgot Password?' : 'Verify Your Email'}
            </h1>
            <p className="text-dark-600 dark:text-dark-400">
              {step === 'email'
                ? 'Enter the email address you used to create your account.'
                : `Enter the six-digit code sent to ${email}.`}
            </p>
          </div>

          <form onSubmit={step === 'email' ? handleEmailSubmit : handleOtpSubmit} className="space-y-6">
            {alert && (
              <Alert
                type={alert.type}
                message={alert.message}
                onClose={() => setAlert(null)}
              />
            )}

            {step === 'email' ? (
              <Input
                label="Email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            ) : (
              <Input
                label="Verification Code"
                name="otp"
                inputMode="numeric"
                pattern="[0-9]{6}"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="Enter the 6-digit code"
                required
              />
            )}

            <Button
              type="submit"
              size="lg"
              className="w-full"
              isLoading={isLoading}
            >
              {step === 'email' ? 'Send Verification Code' : 'Verify Code'}
            </Button>

            {step === 'otp' && (
              <button
                type="button"
                onClick={() => {
                  setStep('email');
                  setOtp('');
                  setAlert(null);
                }}
                className="w-full text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
              >
                Use a different email address
              </button>
            )}

            <p className="text-center text-dark-600 dark:text-dark-400">
              Remember your password?{' '}
              <a
                href="/login"
                className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-semibold"
              >
                Sign in
              </a>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
