import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ScienceAnimation from './components/ScienceAnimation';
import ValueGrid from './components/ValueGrid';
import ProductShowcase from './components/ProductShowcase';
import IngredientsGrid from './components/IngredientsGrid';
import BlogSection from './components/BlogSection';
import HowToUse from './components/HowToUse';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import FloatingHairCanvas from './components/FloatingHairCanvas';
import AdminPanelModal from './components/AdminPanelModal';

export default function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Global Keyboard Shortcut: Press Shift + A anywhere on site to open Admin CMS
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setIsAdminOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2A361E] font-sans selection:bg-[#4F5D38] selection:text-[#FAF8F5] relative">
      {/* Corner Attached Flowing Real Hair Physics Canvas */}
      <FloatingHairCanvas />

      {/* 1. Header & Navigation */}
      <Navbar />

      <main>
        {/* 2. Hero Section with Falling Ingredients Canvas Overlay */}
        <Hero />

        {/* 3. Live Animated Feature Section (The Science of Roots) */}
        <ScienceAnimation />

        {/* 4. "Why Veelana" Value Proposition Grid */}
        <ValueGrid />

        {/* 5. Dynamic Product Showcase (Managed via CMS Admin) */}
        <ProductShowcase />

        {/* 6. 25+ Herbs Ingredients Cards */}
        <IngredientsGrid />

        {/* 7. Hair Care Knowledge & SEO Blog Section */}
        <BlogSection />

        {/* 8. How to Use (4-Step Routine) */}
        <HowToUse />

        {/* 9. Reviews & Testimonials Carousel */}
        <Testimonials />
      </main>

      {/* 10. Contact, Location & Order Footer */}
      <Footer onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* 11. Global Floating WhatsApp CTA */}
      <FloatingWhatsApp />

      {/* 12. Dynamic Product CMS Admin Panel Modal */}
      <AdminPanelModal isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
    </div>
  );
}
