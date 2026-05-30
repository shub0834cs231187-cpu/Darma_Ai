import React from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import BrandLogo from './BrandLogo';

export default function Footer() {
  return (
    <footer className="bg-dark-900 text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <BrandLogo />
              <span className="text-xl font-bold">DermaAI</span>
            </div>
            <p className="text-dark-400 text-sm">
              AI-powered skin analysis and personalized skincare recommendations for everyone.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-sm text-dark-400">
              <li><a href="#features" className="hover:text-primary-400 transition">Features</a></li>
              <li><a href="#pricing" className="hover:text-primary-400 transition">Pricing</a></li>
              <li><a href="/blog" className="hover:text-primary-400 transition">Blog</a></li>
              <li><a href="#" className="hover:text-primary-400 transition">Security</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-dark-400">
              <li><a href="#about" className="hover:text-primary-400 transition">About</a></li>
              <li><a href="#" className="hover:text-primary-400 transition">Careers</a></li>
              <li><a href="#" className="hover:text-primary-400 transition">Contact</a></li>
              <li><a href="#" className="hover:text-primary-400 transition">Privacy</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-dark-400">
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-primary-400" />
                <span>hello@dermaai.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-primary-400" />
                <span>+1 (555) 000-0000</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-primary-400" />
                <span>San Francisco, CA</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-dark-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-dark-400">
          <p>&copy; 2024 DermaAI. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-primary-400 transition">Terms</a>
            <a href="#" className="hover:text-primary-400 transition">Privacy</a>
            <a href="#" className="hover:text-primary-400 transition">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
