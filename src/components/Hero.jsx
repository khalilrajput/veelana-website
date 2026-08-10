import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, ShoppingBag, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { getWhatsAppUrl } from '../utils/whatsapp';

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
      <div className="container">
        <div className="hero-grid">
          
          {/* Left Text Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Top Badge */}
            <div className="section-badge">
              <Sparkles style={{ width: '16px', height: '16px', color: '#D4AF37' }} />
              <span>Pure Botanical Elixir from Khanewal</span>
            </div>

            {/* Main Headline */}
            <h1 className="hero-title">
              Healthy Hair Starts at the <span>Roots</span>
            </h1>

            {/* Sub-headline */}
            <p className="hero-subtitle">
              Nourish your scalp with <strong>25+ cold-pressed herbs</strong>. Formulated to revive dormant follicles, eliminate hair fall, and boost rich natural volume. Free from Parabens, Sulphates, and Mineral Oils.
            </p>

            {/* CTAs */}
            <div className="hero-buttons">
              <a
                href={getWhatsAppUrl('Hi Veelana Team, I want to order the Herbal Hair Care Oil')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-olive"
              >
                <MessageCircle style={{ width: '18px', height: '18px', fill: 'currentColor' }} />
                <span>Order via WhatsApp</span>
              </a>

              <Link
                to="/products"
                className="btn-outline-olive"
              >
                <ShoppingBag style={{ width: '18px', height: '18px' }} />
                <span>Explore Sizes (100ml & 250ml)</span>
              </Link>
            </div>

            {/* Key Trust Specs Grid */}
            <div className="trust-specs-grid">
              {trustSpecs.map((spec, i) => (
                <div key={i} className="trust-spec-item">
                  <CheckCircle2 style={{ width: '16px', height: '16px', color: '#3A4828', flexShrink: 0 }} />
                  <span>{spec}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Product Graphic Showcase */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="hero-graphic-card">
              <img
                src="/assets/real_full_set_boxes.jpg"
                alt="Veelana Official Product Bottles and Packaging Set"
                style={{ width: '100%', height: 'auto', display: 'block' }}
                loading="eager"
              />

              {/* Official Seal Badge */}
              <div style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: '#EAEFE4',
                border: '1.5px solid rgba(79, 93, 56, 0.3)',
                padding: '0.6rem 1rem',
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
                  style={{ height: '34px', width: 'auto', objectFit: 'contain', mixBlendMode: 'multiply', flexShrink: 0 }}
                />
                <div style={{ textAlign: 'left' }}>
                  <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: '#3A4828' }}>MADE WITH 25+ HERBS</span>
                  <span style={{ display: 'block', fontSize: '0.65rem', color: '#4F5D38', textTransform: 'uppercase', fontWeight: '600' }}>100% Cold-Pressed</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
