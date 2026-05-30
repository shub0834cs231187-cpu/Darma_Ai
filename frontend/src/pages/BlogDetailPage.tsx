import React from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
import Skeleton from '../components/Skeleton';
import { blogAPI } from '../services/api';
import { formatDate } from '../utils/helpers';

export default function BlogDetailPage() {
  const { slug } = useParams();
  const [blog, setBlog] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchBlog = async () => {
      try {
        if (slug) {
          const response = await blogAPI.getBlogDetail(slug);
          setBlog(response.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  return (
    <div className="min-h-screen bg-background dark:bg-dark-900">
      <Navbar />
      <div className="pt-20 pb-12 px-4 md:px-8">
        <div className="max-w-3xl mx-auto">
          {isLoading ? (
            <div className="space-y-8">
              <Skeleton className="h-96" />
              <Skeleton count={3} className="h-32" />
            </div>
          ) : blog ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <img
                src={blog.image_url}
                alt={blog.title}
                className="w-full h-96 object-cover rounded-2xl mb-8"
              />

              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm font-semibold text-primary-600 bg-primary-100 dark:bg-primary-900/30 px-3 py-1 rounded-full">
                  {blog.category}
                </span>
                <span className="text-sm text-dark-600 dark:text-dark-400">
                  {formatDate(blog.published_at)}
                </span>
                <span className="text-sm text-dark-600 dark:text-dark-400">
                  {blog.views} views
                </span>
              </div>

              <h1 className="text-5xl font-bold text-dark-900 dark:text-background mb-6">
                {blog.title}
              </h1>

              <div className="mb-6 p-4 bg-primary-50 dark:bg-primary-900/20 border-l-4 border-primary-600 rounded">
                <p className="text-dark-700 dark:text-dark-300 italic">
                  {blog.excerpt}
                </p>
              </div>

              <div className="flex items-center gap-4 mb-8 pb-8 border-b border-dark-200 dark:border-dark-700">
                <span className="font-semibold text-dark-900 dark:text-background">
                  By {blog.author}
                </span>
              </div>

              <div className="prose dark:prose-dark max-w-none">
                <div
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                  className="text-dark-800 dark:text-dark-200 leading-relaxed space-y-4"
                />
              </div>
            </motion.div>
          ) : (
            <Card className="p-8 text-center">
              <p className="text-dark-600 dark:text-dark-400">
                Blog post not found
              </p>
            </Card>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
