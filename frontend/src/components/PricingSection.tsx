import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Button from './Button';
import Card from './Card';

const plans = [
  {
    name: 'Free',
    price: 0,
    description: 'Get started with basic features',
    features: [
      'Basic skin analysis',
      '1 analysis per month',
      'Product ingredient checker',
      'Basic recommendations',
      'Community access',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Pro',
    price: 99,
    description: 'For skincare enthusiasts',
    features: [
      'Unlimited skin analysis',
      'Advanced recommendations',
      'History tracking',
      'Priority support',
      'Export reports',
      'Custom routines',
    ],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Premium',
    price: 199,
    description: 'Full power of DermaAI',
    features: [
      'All Pro features',
      'AI dermatologist chat',
      'Prescription recommendations',
      'API access',
      'Team collaboration',
      'Custom branding',
    ],
    cta: 'Start Free Trial',
    popular: false,
  },
  {
    name: 'Enterprise',
    price: null,
    description: 'For businesses & clinics',
    features: [
      'All Premium features',
      'Custom integrations',
      'Dedicated support',
      'SLA guarantee',
      'White-label option',
      'Advanced analytics',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-20 px-4 md:px-8 bg-white dark:bg-dark-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-dark-900 dark:text-background mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-dark-600 dark:text-dark-300 max-w-3xl mx-auto">
            Choose the perfect plan for your skincare journey.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={plan.popular ? 'md:col-span-1 lg:scale-105' : ''}
            >
              <Card
                className={`p-8 h-full flex flex-col ${
                  plan.popular
                    ? 'ring-2 ring-primary-600 relative'
                    : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-primary-600 text-white text-sm font-semibold rounded-full">
                    Most Popular
                  </div>
                )}

                <h3 className="text-2xl font-bold text-dark-900 dark:text-background mb-2">
                  {plan.name}
                </h3>
                <p className="text-dark-600 dark:text-dark-400 text-sm mb-6">
                  {plan.description}
                </p>

                <div className="mb-6">
                  {plan.price !== null ? (
                    <>
                      <span className="text-4xl font-bold text-dark-900 dark:text-background">
                        ${plan.price}
                      </span>
                      <span className="text-dark-600 dark:text-dark-400">/month</span>
                    </>
                  ) : (
                    <p className="text-xl font-semibold text-primary-600">Custom pricing</p>
                  )}
                </div>

                <Button
                  className="w-full mb-8"
                  variant={plan.popular ? 'primary' : 'outline'}
                >
                  {plan.cta}
                </Button>

                <div className="space-y-4 flex-1">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-dark-700 dark:text-dark-300 text-sm">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
