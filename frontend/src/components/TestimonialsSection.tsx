import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import Card from './Card';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Beauty Enthusiast',
    content: 'DermaAI completely transformed my skincare routine. The analysis was accurate and the recommendations work!',
    rating: 5,
    image: 'https://i.pravatar.cc/150?img=1',
  },
  {
    name: 'Michael Chen',
    role: 'Dermatology Student',
    content: 'As someone studying dermatology, I\'m impressed by the accuracy of the AI analysis. Great tool!',
    rating: 5,
    image: 'https://i.pravatar.cc/150?img=2',
  },
  {
    name: 'Emma Wilson',
    role: 'Acne Sufferer',
    content: 'Finally found a product recommendation system that actually understands my skin. Life-changing!',
    rating: 5,
    image: 'https://i.pravatar.cc/150?img=3',
  },
  {
    name: 'James Rodriguez',
    role: 'Skincare Blogger',
    content: 'I recommend DermaAI to all my followers. It\'s the most advanced skin analysis tool available.',
    rating: 5,
    image: 'https://i.pravatar.cc/150?img=4',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 px-4 md:px-8 bg-background dark:bg-dark-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-dark-900 dark:text-background mb-4">
            Loved by Users
          </h2>
          <p className="text-xl text-dark-600 dark:text-dark-300 max-w-3xl mx-auto">
            See what our users are saying about their DermaAI experience.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full p-6">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="font-semibold text-dark-900 dark:text-background">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-dark-600 dark:text-dark-400">
                      {testimonial.role}
                    </p>
                  </div>
                </div>

                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="text-dark-700 dark:text-dark-300 text-sm leading-relaxed">
                  "{testimonial.content}"
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
