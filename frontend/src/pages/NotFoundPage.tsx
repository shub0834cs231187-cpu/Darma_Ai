import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/Button';
import { ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-background dark:bg-dark-900 flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-9xl font-bold text-primary-600 mb-4">404</h1>
          <h2 className="text-4xl font-bold text-dark-900 dark:text-background mb-4">
            Page Not Found
          </h2>
          <p className="text-dark-600 dark:text-dark-400 text-lg mb-8 max-w-md mx-auto">
            Sorry, the page you're looking for doesn't exist. Let's get you back on track.
          </p>
          <Button
            onClick={() => window.location.href = '/'}
            className="inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Button>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
