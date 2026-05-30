import React from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import Button from './Button';
import Input from './Input';
import Alert from './Alert';

export default function NewsletterSection() {
  const [email, setEmail] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [alert, setAlert] = React.useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setAlert({
        type: 'success',
        message: 'Successfully subscribed to our newsletter!',
      });
      setEmail('');
    } catch (error) {
      setAlert({
        type: 'error',
        message: 'Failed to subscribe. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-20 px-4 md:px-8 bg-white dark:bg-dark-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto"
      >
        <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Stay Updated
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Get skincare tips, product recommendations, and exclusive offers delivered to your inbox.
          </p>

          <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 border border-white/20"
              />
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
                isLoading={isLoading}
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </form>

          {alert && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4"
            >
              <Alert
                type={alert.type}
                message={alert.message}
                onClose={() => setAlert(null)}
              />
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
