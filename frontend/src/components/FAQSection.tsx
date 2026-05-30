import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Card from './Card';

const faqs = [
  {
    question: 'How accurate is the AI skin analysis?',
    answer: 'Our AI model has been trained on over 100,000 skin images with 98% accuracy compared to professional dermatologists. However, it\'s not a substitute for professional medical advice.',
  },
  {
    question: 'Can I use this for acne-prone skin?',
    answer: 'Absolutely! DermaAI specializes in identifying acne-prone skin types and recommending suitable products and routines specifically designed to help manage acne.',
  },
  {
    question: 'How often should I update my analysis?',
    answer: 'We recommend taking a new analysis every 4-6 weeks to track your skin\'s progress and adjust recommendations based on seasonal changes or product effectiveness.',
  },
  {
    question: 'Is my data private and secure?',
    answer: 'Yes, we use enterprise-grade encryption and comply with GDPR and HIPAA regulations. Your photos and data are never shared with third parties.',
  },
  {
    question: 'Can I cancel my subscription anytime?',
    answer: 'Yes, you can cancel your subscription anytime without any penalties. Pro and Premium plans come with a 14-day money-back guarantee.',
  },
  {
    question: 'Do you offer refunds?',
    answer: 'We offer a 14-day money-back guarantee for all paid plans. If you\'re not satisfied, we\'ll refund your money with no questions asked.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  return (
    <section id="faq" className="py-20 px-4 md:px-8 bg-background dark:bg-dark-900">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-dark-900 dark:text-background mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-dark-600 dark:text-dark-300">
            Everything you need to know about DermaAI.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <Card
                className="cursor-pointer overflow-hidden"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <div className="p-6 flex justify-between items-center hover:bg-dark-50 dark:hover:bg-dark-800/50 transition">
                  <h3 className="font-semibold text-dark-900 dark:text-background pr-4">
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown className="w-6 h-6 text-primary-600" />
                  </motion.div>
                </div>

                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: openIndex === index ? 'auto' : 0,
                    opacity: openIndex === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden border-t border-dark-200 dark:border-dark-700"
                >
                  <p className="p-6 text-dark-700 dark:text-dark-300 leading-relaxed">
                    {faq.answer}
                  </p>
                </motion.div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
