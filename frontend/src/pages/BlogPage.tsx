import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
import Skeleton from '../components/Skeleton';
import { blogAPI } from '../services/api';
import { Link } from 'react-router-dom';
import { formatDate } from '../utils/helpers';
import { Search } from 'lucide-react';

export default function BlogPage() {
  const [blogs, setBlogs] = React.useState<any[]>([]);
  const [categories, setCategories] = React.useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const [blogsRes, categoriesRes] = await Promise.all([
          blogAPI.getBlogs(1, 12, selectedCategory || undefined),
          blogAPI.getBlogCategories(),
        ]);
        setBlogs(blogsRes.data.items);
        setCategories(categoriesRes.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-background dark:bg-dark-900">
      <Navbar />
      <div className="pt-20 pb-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-dark-900 dark:text-background mb-2">
              Skincare Blog
            </h1>
            <p className="text-dark-600 dark:text-dark-400">
              Expert tips, trends, and insights for healthy skin
            </p>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-wrap gap-2 mb-8"
          >
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                !selectedCategory
                  ? 'bg-primary-600 text-white'
                  : 'bg-dark-100 dark:bg-dark-800 text-dark-900 dark:text-background hover:bg-dark-200 dark:hover:bg-dark-700'
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  selectedCategory === category
                    ? 'bg-primary-600 text-white'
                    : 'bg-dark-100 dark:bg-dark-800 text-dark-900 dark:text-background hover:bg-dark-200 dark:hover:bg-dark-700'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* Articles Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid md:grid-cols-3 gap-8"
          >
            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-80" />
                ))
              : blogs.map((blog, index) => (
                  <motion.div
                    key={blog.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Link to={`/blog/${blog.slug}`}>
                      <Card className="h-full overflow-hidden hover:shadow-glow transition">
                        <img
                          src={blog.image_url}
                          alt={blog.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-semibold text-primary-600 bg-primary-100 dark:bg-primary-900/30 px-2 py-1 rounded-full">
                              {blog.category}
                            </span>
                            <span className="text-xs text-dark-600 dark:text-dark-400">
                              {formatDate(blog.published_at)}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-dark-900 dark:text-background mb-2 line-clamp-2">
                            {blog.title}
                          </h3>
                          <p className="text-dark-600 dark:text-dark-400 text-sm line-clamp-3">
                            {blog.excerpt}
                          </p>
                          <div className="mt-4 flex items-center justify-between text-sm text-dark-600 dark:text-dark-400">
                            <span>By {blog.author}</span>
                            <span>{blog.views} views</span>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
