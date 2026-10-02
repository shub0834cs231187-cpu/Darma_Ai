import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Microscope, Pill, TrendingUp, Target, type LucideIcon } from 'lucide-react';
import Card from './Card';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: 'chat';
  path?: string;
}

const features: Feature[] = [
  {
    icon: Microscope,
    title: 'AI Skin Analysis',
    description: 'Advanced image recognition to analyze your skin condition in seconds.',
    action: 'chat',
  },
  {
    icon: Pill,
    title: 'Product Analyzer',
    description: 'Check product ingredients for compatibility with your skin type.',
    path: '/product-analyzer',
  },
  {
    icon: TrendingUp,
    title: 'Trend Tracking',
    description: 'Monitor your skin health improvements over time with charts.',
    path: '/trend-tracking',
  },
  {
    icon: Target,
    title: 'Personalized Routines',
    description: 'Get custom morning and night skincare routines.',
    path: '/recommendations',
  },
];

interface FeaturesSectionProps {
  onOpenSkinChat: () => void;
}

export default function FeaturesSection({ onOpenSkinChat }: FeaturesSectionProps) {
  const navigate = useNavigate();

  return (
    <section id="features" className="py-20 px-4 md:px-8 bg-white dark:bg-dark-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-dark-900 dark:text-background mb-4">
            Powerful Features
          </h2>
          <p className="text-xl text-dark-600 dark:text-dark-300 max-w-3xl mx-auto">
            Everything you need for comprehensive skin analysis and personalized skincare recommendations.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full p-6 text-center">
                  <button
                    type="button"
                    onClick={() => feature.action === 'chat' ? onOpenSkinChat() : navigate(feature.path!)}
                    className="w-full cursor-pointer"
                  >
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-dark-900 dark:text-background">
                    {feature.title}
                  </h3>
                  <p className="text-dark-600 dark:text-dark-400 text-sm">
                    {feature.description}
                  </p>
                  </button>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
