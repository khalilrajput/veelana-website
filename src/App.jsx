import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import FloatingHairCanvas from './components/FloatingHairCanvas';
import StickyMobileBar from './components/StickyMobileBar';
import OrderModal from './components/OrderModal';
import OrderManagementModal from './components/OrderManagementModal';
import CartDrawer from './components/CartDrawer';
import RecentOrderToast from './components/RecentOrderToast';
import ExitIntentModal from './components/ExitIntentModal';
import CookieConsent from './components/CookieConsent';
import { CartProvider } from './context/CartContext';

// Dedicated Page Views
import HomePage from './pages/HomePage';
import SciencePage from './pages/SciencePage';
import WhyVeelanaPage from './pages/WhyVeelanaPage';
import ProductsPage from './pages/ProductsPage';
import IngredientsPage from './pages/IngredientsPage';
import HowToUsePage from './pages/HowToUsePage';
import ReviewsPage from './pages/ReviewsPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import FaqPage from './pages/FaqPage';
import ShippingReturnsPage from './pages/ShippingReturnsPage';
import OrderTrackingPage from './pages/OrderTrackingPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';
import AdminPage from './pages/AdminPage';

export default function App() {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedProductSize, setSelectedProductSize] = useState('200ml');
  const [isOrdersAdminOpen, setIsOrdersAdminOpen] = useState(false);

  const handleOpenOrder = (productSize = '200ml') => {
    setSelectedProductSize(productSize);
    setIsOrderModalOpen(true);
  };

  // Keyboard Shortcuts:
  // Press Shift + O anywhere to open Store Order Management Panel
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.shiftKey && (e.key === 'O' || e.key === 'o')) {
        e.preventDefault();
        setIsOrdersAdminOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-[#FAF8F5] text-[#2A361E] font-sans selection:bg-[#4F5D38] selection:text-[#FAF8F5] relative flex flex-col justify-between overflow-x-hidden">
          
          {/* Continuous Fluid Organic Hair Movement Canvas */}
          <FloatingHairCanvas />

          {/* 1. Header & Navigation */}
          <Navbar onOpenOrder={handleOpenOrder} />

          {/* 2. Multi-Page Client-Side Routes */}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage onOpenOrder={handleOpenOrder} />} />
              <Route path="/products" element={<ProductsPage onOpenOrder={handleOpenOrder} />} />
              <Route path="/track-order" element={<OrderTrackingPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/science" element={<SciencePage />} />
              <Route path="/why-veelana" element={<WhyVeelanaPage />} />
              <Route path="/ingredients" element={<IngredientsPage />} />
              <Route path="/how-to-use" element={<HowToUsePage />} />
              <Route path="/about" element={<AboutPage onOpenOrder={handleOpenOrder} />} />
              <Route path="/faq" element={<FaqPage onOpenOrder={handleOpenOrder} />} />
              <Route path="/shipping-returns" element={<ShippingReturnsPage onOpenOrder={handleOpenOrder} />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/reviews" element={<ReviewsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              {/* Fallback route */}
              <Route path="*" element={<HomePage onOpenOrder={handleOpenOrder} />} />
            </Routes>
          </main>

          {/* 3. Global Footer */}
          <Footer />

          {/* 4. Global Floating WhatsApp CTA */}
          <FloatingWhatsApp />

          {/* 5. Sticky Bottom Bar on Mobile */}
          <StickyMobileBar onOpenOrder={handleOpenOrder} />

          {/* 6. Slide-Out Cart Drawer */}
          <CartDrawer onCheckout={() => setIsOrderModalOpen(true)} />

          {/* 7. Customer Order Checkout Modal */}
          <OrderModal
            isOpen={isOrderModalOpen}
            onClose={() => setIsOrderModalOpen(false)}
            initialProduct={selectedProductSize}
          />

          {/* 8. Store Owner Order Management Panel (Secret Shift+O) */}
          <OrderManagementModal
            isOpen={isOrdersAdminOpen}
            onClose={() => setIsOrdersAdminOpen(false)}
          />

          {/* 9. Live Social Proof Purchase Notification */}
          <RecentOrderToast />

          {/* 10. Exit-Intent Discount Offer */}
          <ExitIntentModal />

          {/* 11. Cookie & Privacy Banner */}
          <CookieConsent />
        </div>
      </Router>
    </CartProvider>
  );
}
