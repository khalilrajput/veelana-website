import React from 'react';
import { MessageCircle, ShoppingBag, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import FallingIngredientsCanvas from './FallingIngredientsCanvas';

export default function Hero() {
  const trustSpecs = [
    '25+ Cold-Pressed Herbs',
    'Paraben Free',
    'Sulphate Free',
    'Mineral Oil Free',
    '100% Vegan & Cruelty-Free',
  ];

  return (
    <section id="home" className="hero-section">
      {/* Decorative Parallax Falling Ingredients Canvas (Amla, Hibiscus, Almond, Coconut, Rosemary) */}
      <FallingIngredientsCanvas />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="hero-grid">
          
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Top Pill Badge */}
            <div className="section-badge">
              <Sparkles className="w-4 h-4 text-[#4F5D38]" />
              <span>Pure Botanical Elixir from Khanewal</span>
            </div>

            {/* Main Headline */}
            <h1 className="hero-title">
              Healthy Hair Starts at the <span>Roots</span>
            </h1>

            {/* Sub-headline */}
            <p className="hero-subtitle">
              Nourish your scalp with <strong>25+ cold-pressed herbs</strong>. Formulated to revive dormant follicles, eliminate hair loss, and boost rich natural volume. Free from Parabens, Sulphates, and Mineral Oils.
            </p>

            {/* Dual CTAs */}
            <div className="hero-buttons">
              <a
                href="https://wa.me/923061041609"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-olive"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Order via WhatsApp</span>
              </a>

              <a
                href="#products"
                className="btn-outline-olive"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Explore Sizes (100ml & 250ml)</span>
              </a>
            </div>

            {/* Key Specs Pills Grid */}
            <div className="trust-specs-grid">
              {trustSpecs.map((spec, i) => (
                <div key={i} className="trust-spec-item">
                  <CheckCircle2 className="w-4 h-4 text-[#4F5D38] shrink-0" />
                  <span>{spec}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Product Graphics Showcase - Real Veelana Product Photo */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            <div className="hero-graphic-card">
              <img
                src="/assets/real_full_set_boxes.jpg"
                alt="Veelana Official Real Product Bottles and Box Packaging Set"
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />

              {/* Floating Official Olive Vector Logo Seal Overlay */}
              <div style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: '#EAEFE4',
                border: '1.5px solid rgba(79, 93, 56, 0.3)',
                padding: '0.65rem 1.1rem',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                boxShadow: '0 8px 24px rgba(58, 72, 40, 0.15)',
                color: '#3A4828'
              }}>
                <img
                  src="/assets/official_png_logo.png"
                  alt="Veelana Official Seal"
                  style={{ height: '38px', width: 'auto', objectFit: 'contain', mixBlendMode: 'multiply' }}
                />
                <div style={{ textAlign: 'left' }}>
                  <span style={{ display: 'block', fontSize: '0.78rem', fontWeight: 'bold', color: '#3A4828' }}>MADE WITH 25+ HERBS</span>
                  <span style={{ display: 'block', fontSize: '0.65rem', color: '#4F5D38', textTransform: 'uppercase', fontWeight: '600' }}>100% Cold-Pressed Formula</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
