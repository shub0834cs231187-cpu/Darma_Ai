import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useAuthStore, useThemeStore } from '../services/store';
import BrandLogo from './BrandLogo';

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { user, logout } = useAuthStore();
  const { isDark, toggleTheme } = useThemeStore();

  return (
    <nav className="fixed top-0 w-full z-50 glass-effect dark:glass-dark border-b border-primary-200 dark:border-primary-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <BrandLogo />
            <span className="text-xl font-bold text-primary-600 dark:text-primary-400">DermaAI</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {user && (
              <>
                <Link to="/" className="text-dark-700 dark:text-dark-300 hover:text-primary-600 dark:hover:text-primary-400 transition">
                  Home
                </Link>
                <Link to="/dashboard" className="text-dark-700 dark:text-dark-300 hover:text-primary-600 dark:hover:text-primary-400 transition">
                  Dashboard
                </Link>
                <Link to="/skin-analysis" className="text-dark-700 dark:text-dark-300 hover:text-primary-600 dark:hover:text-primary-400 transition">
                  Analysis
                </Link>
                <Link to="/blog" className="text-dark-700 dark:text-dark-300 hover:text-primary-600 dark:hover:text-primary-400 transition">
                  Blog
                </Link>
              </>
            )}
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-dark-100 dark:hover:bg-dark-800 transition"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-primary-400" />
              ) : (
                <Moon className="w-5 h-5 text-primary-600" />
              )}
            </button>

            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-dark-600 dark:text-dark-400">
                  {user.first_name}
                </span>
                <button
                  onClick={() => {
                    logout();
                    window.location.href = '/';
                  }}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-dark-800 rounded-lg transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-dark-700 dark:text-dark-300"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-4">
            {user && (
              <>
                <Link to="/" className="block text-dark-700 dark:text-dark-300 hover:text-primary-600">
                  Home
                </Link>
                <Link to="/dashboard" className="block text-dark-700 dark:text-dark-300 hover:text-primary-600">
                  Dashboard
                </Link>
                <Link to="/skin-analysis" className="block text-dark-700 dark:text-dark-300 hover:text-primary-600">
                  Analysis
                </Link>
                <Link to="/blog" className="block text-dark-700 dark:text-dark-300 hover:text-primary-600">
                  Blog
                </Link>
              </>
            )}
            {!user && (
              <div className="flex flex-col space-y-2 pt-4 border-t border-dark-200 dark:border-dark-700">
                <Link
                  to="/login"
                  className="block text-center px-4 py-2 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-dark-800 rounded-lg"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block text-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
