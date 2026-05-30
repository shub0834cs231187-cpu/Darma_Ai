import React from 'react';
import { motion } from 'framer-motion';
import Card from './Card';

const stats = [
  { label: 'Users Analyzed', value: '50,000+' },
  { label: 'Accuracy Rate', value: '98%' },
  { label: 'Products in DB', value: '10,000+' },
  { label: 'Active Users', value: '15,000+' },
];

export default function StatisticsSection() {
  return (
    <section className="py-20 px-4 md:px-8 bg-gradient-to-r from-primary-600 to-secondary-600">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center text-white"
            >
              <motion.p
                className="text-4xl md:text-5xl font-bold mb-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                {stat.value}
              </motion.p>
              <p className="text-lg opacity-90">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
