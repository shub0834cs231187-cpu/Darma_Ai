import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import StatisticsSection from '../components/StatisticsSection';
import TestimonialsSection from '../components/TestimonialsSection';
import PricingSection from '../components/PricingSection';
import FAQSection from '../components/FAQSection';
import NewsletterSection from '../components/NewsletterSection';
import ContactSection from '../components/ContactSection';
import SkinChatbot from '../components/SkinChatbot';

export default function HomePage() {
  const [isSkinChatOpen, setIsSkinChatOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-dark-900">
      <Navbar />
      <HeroSection onOpenSkinChat={() => setIsSkinChatOpen(true)} />
      <FeaturesSection onOpenSkinChat={() => setIsSkinChatOpen(true)} />
      <StatisticsSection />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <NewsletterSection />
      <ContactSection />
      <Footer />
      <SkinChatbot isOpen={isSkinChatOpen} onClose={() => setIsSkinChatOpen(false)} />
    </div>
  );
}
