import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useThemeStore } from './services/store';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import SkinAnalysisPage from './pages/SkinAnalysisPage';
import ProductAnalyzerPage from './pages/ProductAnalyzerPage';
import RecommendationsPage from './pages/RecommendationsPage';
import BlogPage from './pages/BlogPage';
import BlogDetailPage from './pages/BlogDetailPage';
import AdminDashboard from './pages/AdminDashboard';
import NotFoundPage from './pages/NotFoundPage';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';

function App() {
  const { isDark } = useThemeStore();

  React.useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/skin-analysis" element={<SkinAnalysisPage />} />
          <Route path="/product-analyzer" element={<ProductAnalyzerPage />} />
          <Route path="/recommendations" element={<RecommendationsPage />} />
        </Route>

        {/* Public Pages */}
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogDetailPage />} />

        {/* Admin Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
