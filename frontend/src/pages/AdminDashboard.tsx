import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
import Button from '../components/Button';
import { motion } from 'framer-motion';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-background dark:bg-dark-900">
      <Navbar />
      <div className="pt-20 pb-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-dark-900 dark:text-background mb-4">
              Admin Dashboard
            </h1>
            <p className="text-dark-600 dark:text-dark-400 mb-8">
              Manage users, products, and content
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-8">
                <h3 className="text-2xl font-bold text-dark-900 dark:text-background mb-4">
                  Analytics
                </h3>
                <p className="text-dark-600 dark:text-dark-400 mb-6">
                  View platform statistics and insights
                </p>
                <Button onClick={() => window.location.href = '/admin/analytics'}>
                  View Analytics
                </Button>
              </Card>

              <Card className="p-8">
                <h3 className="text-2xl font-bold text-dark-900 dark:text-background mb-4">
                  Users
                </h3>
                <p className="text-dark-600 dark:text-dark-400 mb-6">
                  Manage user accounts and subscriptions
                </p>
                <Button onClick={() => window.location.href = '/admin/users'}>
                  Manage Users
                </Button>
              </Card>

              <Card className="p-8">
                <h3 className="text-2xl font-bold text-dark-900 dark:text-background mb-4">
                  Products
                </h3>
                <p className="text-dark-600 dark:text-dark-400 mb-6">
                  Add and manage skincare products
                </p>
                <Button onClick={() => window.location.href = '/admin/products'}>
                  Manage Products
                </Button>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
