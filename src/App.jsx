import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import AdminPanelModal from './components/AdminPanelModal';

// Dedicated Page Views
import HomePage from './pages/HomePage';
import SciencePage from './pages/SciencePage';
import WhyVeelanaPage from './pages/WhyVeelanaPage';
import ProductsPage from './pages/ProductsPage';
import IngredientsPage from './pages/IngredientsPage';
import HowToUsePage from './pages/HowToUsePage';
import ReviewsPage from './pages/ReviewsPage';
import ContactPage from './pages/ContactPage';

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
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-[#FAF8F5] text-[#2A361E] font-sans selection:bg-[#4F5D38] selection:text-[#FAF8F5] relative flex flex-col justify-between overflow-x-hidden">
        
        {/* 1. Header & Navigation */}
        <Navbar />

        {/* 2. Multi-Page Client-Side Routes */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/science" element={<SciencePage />} />
            <Route path="/why-veelana" element={<WhyVeelanaPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/ingredients" element={<IngredientsPage />} />
            <Route path="/how-to-use" element={<HowToUsePage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            {/* Fallback route */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>

        {/* 3. Global Footer */}
        <Footer onOpenAdmin={() => setIsAdminOpen(true)} />

        {/* 4. Global Floating WhatsApp CTA */}
        <FloatingWhatsApp />

        {/* 5. Store Admin CMS Modal */}
        <AdminPanelModal isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
      </div>
    </Router>
  );
}
