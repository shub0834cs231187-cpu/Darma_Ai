import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, Shield, Zap } from 'lucide-react';
import Button from './Button';

interface HeroSectionProps {
  onOpenSkinChat: () => void;
}

export default function HeroSection({ onOpenSkinChat }: HeroSectionProps) {
  return (
    <section className="min-h-screen flex items-center justify-center pt-20 px-4 md:px-8 bg-gradient-to-br from-background via-background to-primary-50 dark:to-dark-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      <div className="absolute top-40 right-10 w-72 h-72 bg-secondary-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <button
              type="button"
              onClick={onOpenSkinChat}
              className="inline-block mb-6 px-4 py-2 bg-primary-100 dark:bg-primary-900/30 rounded-full border border-primary-200 dark:border-primary-700 transition hover:bg-primary-200 dark:hover:bg-primary-900/50"
            >
              <span className="flex items-center gap-2 text-primary-700 dark:text-primary-300 text-sm font-semibold">
                <Sparkles className="w-4 h-4" />
                AI-Powered Skin Analysis
              </span>
            </button>

            <h1 className="text-5xl md:text-6xl font-bold text-dark-900 dark:text-background mb-6 leading-tight">
              Your Personal
              <span className="text-transparent bg-clip-text bg-gradient-aurora"> AI Dermatologist</span>
            </h1>

            <p className="text-lg text-dark-600 dark:text-dark-300 mb-8 leading-relaxed">
              Get instant AI-powered skin analysis, personalized product recommendations, and expert skincare advice. Transform your beauty routine with cutting-edge technology.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={onOpenSkinChat}
              >
                Start AI Chat
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => window.location.href = '#features'}
              >
                Learn More
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-12 pt-8 border-t border-dark-200 dark:border-dark-700">
              <div>
                <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">50K+</p>
                <p className="text-sm text-dark-600 dark:text-dark-400">Users Analyzed</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">98%</p>
                <p className="text-sm text-dark-600 dark:text-dark-400">Accuracy Rate</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">24/7</p>
                <p className="text-sm text-dark-600 dark:text-dark-400">Available</p>
              </div>
            </div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-gradient-primary p-1">
              <div className="w-full h-full bg-dark-900 rounded-xl flex items-center justify-center relative overflow-hidden">
                <img
                  src="/hero-skin-analysis-girl.png"
                  alt="AI skin analysis portrait"
                  className="absolute inset-0 h-full w-full object-cover"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-dark-900/10 via-transparent to-dark-900/55" />

                {/* Face Scanner Circle */}
                <svg className="absolute left-1/2 top-[42%] w-[56%] h-[56%] -translate-x-1/2 -translate-y-1/2 text-primary-400" viewBox="0 0 200 200" fill="none">
                  <defs>
                    <linearGradient id="scannerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgba(147, 51, 234, 0.85)" />
                      <stop offset="100%" stopColor="rgba(0, 180, 216, 0.85)" />
                    </linearGradient>
                  </defs>
                  
                  {/* Outer scanning circle */}
                  <motion.circle
                    cx="100"
                    cy="100"
                    r="90"
                    stroke="url(#scannerGradient)"
                    strokeWidth="2.5"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    style={{ transformOrigin: "100px 100px" }}
                  />
                  
                  {/* Horizontal scan line */}
                  <motion.line
                    x1="20"
                    y1="100"
                    x2="180"
                    y2="100"
                    stroke="rgba(0, 180, 216, 0.95)"
                    strokeWidth="2"
                    animate={{ y: [-40, 40] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  
                  {/* Face outline */}
                  <ellipse cx="100" cy="100" rx="43" ry="59" stroke="rgba(255, 255, 255, 0.65)" strokeWidth="1.5" />
                  
                  {/* Corner brackets */}
                  <g stroke="rgba(255, 255, 255, 0.9)" strokeWidth="2.5">
                    <path d="M 30 30 L 40 30 L 40 40" fill="none" />
                    <path d="M 160 30 L 170 30 L 170 40" fill="none" />
                    <path d="M 30 170 L 40 170 L 40 160" fill="none" />
                    <path d="M 160 170 L 170 170 L 170 160" fill="none" />
                  </g>
                </svg>

                {/* Scan progress bars */}
                <motion.div
                  className="absolute bottom-16 w-32 h-1 bg-white/25 rounded-full overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary-500 to-secondary-500"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>

                <p className="absolute bottom-8 text-background text-sm font-medium drop-shadow">Analyzing Skin...</p>
              </div>
            </div>

            {/* Floating Cards */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -left-12 -bottom-12 bg-white dark:bg-dark-800 rounded-lg shadow-lg p-4 w-48 border border-primary-100 dark:border-dark-700"
            >
              <div className="flex items-center gap-3 mb-3">
                <TrendingUp className="w-5 h-5 text-primary-600" />
                <span className="font-semibold text-sm">Skin Score</span>
              </div>
              <p className="text-2xl font-bold text-dark-900 dark:text-background">8.7/10</p>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 3, delay: 0.5, repeat: Infinity }}
              className="absolute -right-12 top-1/2 bg-white dark:bg-dark-800 rounded-lg shadow-lg p-4 w-48 border border-secondary-100 dark:border-dark-700"
            >
              <div className="flex items-center gap-3 mb-3">
                <Shield className="w-5 h-5 text-secondary-600" />
                <span className="font-semibold text-sm">Health Status</span>
              </div>
              <p className="text-green-600 font-semibold">Excellent</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
