import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import Alert from '../components/Alert';
import Skeleton from '../components/Skeleton';
import { productAPI } from '../services/api';
import { Search } from 'lucide-react';

export default function ProductAnalyzerPage() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [products, setProducts] = React.useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [alert, setAlert] = React.useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    try {
      const response = await productAPI.searchProducts(searchQuery);
      setProducts(response.data.items);
      if (response.data.items.length === 0) {
        setAlert({ type: 'info', message: 'No products found' });
      }
    } catch (error) {
      setAlert({ type: 'error', message: 'Search failed. Try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background dark:bg-dark-900">
      <Navbar />
      <div className="pt-20 pb-12 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-dark-900 dark:text-background mb-2">
              Product Analyzer
            </h1>
            <p className="text-dark-600 dark:text-dark-400">
              Search and analyze skincare product ingredients
            </p>
          </motion.div>

          {/* Search */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            onSubmit={handleSearch}
            className="mb-8"
          >
            <div className="flex gap-2">
              <Input
                placeholder="Search for a product..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              <Button size="lg" isLoading={isLoading} type="submit">
                <Search className="w-5 h-5" />
              </Button>
            </div>
          </motion.form>

          {alert && (
            <Alert
              type={alert.type}
              message={alert.message}
              onClose={() => setAlert(null)}
            />
          )}

          {/* Results */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Products List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="md:col-span-1 space-y-4"
            >
              {isLoading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-24" />
                ))
              ) : products.length > 0 ? (
                products.map((product) => (
                  <Card
                    key={product.id}
                    className={`p-4 cursor-pointer transition ${
                      selectedProduct?.id === product.id
                        ? 'ring-2 ring-primary-600'
                        : ''
                    }`}
                    onClick={() => setSelectedProduct(product)}
                  >
                    <p className="font-semibold text-dark-900 dark:text-background">
                      {product.name}
                    </p>
                    <p className="text-sm text-dark-600 dark:text-dark-400">
                      {product.brand}
                    </p>
                  </Card>
                ))
              ) : (
                <p className="text-dark-600 dark:text-dark-400 text-center py-8">
                  Search for a product to get started
                </p>
              )}
            </motion.div>

            {/* Product Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="md:col-span-2"
            >
              {selectedProduct ? (
                <Card className="p-8 space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-dark-900 dark:text-background mb-2">
                      {selectedProduct.name}
                    </h2>
                    <p className="text-dark-600 dark:text-dark-400 mb-4">
                      {selectedProduct.brand}
                    </p>
                    <p className="text-dark-700 dark:text-dark-300">
                      {selectedProduct.description}
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-bold text-dark-900 dark:text-background mb-4">
                        Safe Ingredients ✓
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProduct.safe_ingredients?.map((ing: string) => (
                          <span
                            key={ing}
                            className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-xs font-medium"
                          >
                            {ing}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-bold text-dark-900 dark:text-background mb-4">
                        Risk Ingredients ⚠
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProduct.acne_triggers?.map((ing: string) => (
                          <span
                            key={ing}
                            className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full text-xs font-medium"
                          >
                            {ing}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-dark-600 dark:text-dark-400 mb-2">
                      Comedogenic Score
                    </p>
                    <div className="w-full bg-dark-200 dark:bg-dark-700 rounded-full h-3">
                      <div
                        className="h-3 rounded-full bg-gradient-primary"
                        style={{
                          width: `${(selectedProduct.comedogenic_score / 5) * 100}%`,
                        }}
                      />
                    </div>
                    <p className="text-xs text-dark-600 dark:text-dark-400 mt-1">
                      {selectedProduct.comedogenic_score} / 5
                    </p>
                  </div>

                  <Button className="w-full">
                    View Full Details
                  </Button>
                </Card>
              ) : (
                <Card className="p-8 text-center">
                  <p className="text-dark-600 dark:text-dark-400">
                    Select a product to view details
                  </p>
                </Card>
              )}
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
