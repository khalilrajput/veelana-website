import React from 'react';
import { ShoppingBag, Sparkles, CheckCircle2, ShieldCheck, Truck, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { getWhatsAppUrl } from '../utils/whatsapp';

export default function Hero({ onOpenOrder }) {
  const trustSpecs = [
    '25+ Cold-Pressed Herbs',
    'Paraben & Sulphate Free',
    'Mineral Oil Free',
    '100% Organic & Vegan',
  ];

  return (
    <section id="home" className="hero-section" style={{ padding: '2.5rem 0' }}>
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
              <span>Pure Botanical Root Elixir</span>
            </div>

            {/* Main Headline */}
            <h1 className="hero-title">
              Healthy Hair Starts at the <span>Roots</span>
            </h1>

            {/* Sub-headline */}
            <p className="hero-subtitle">
              Nourish your scalp with <strong>25+ cold-pressed herbs</strong>. Formulated to revive dormant follicles, eliminate hair fall, and boost rich natural volume. Direct fresh artisan batch dispatch across Pakistan.
            </p>

            {/* CTAs */}
            <div className="hero-buttons">
              <button
                onClick={() => onOpenOrder ? onOpenOrder('200ml') : window.open(getWhatsAppUrl('Hi Veelana Team, I want to order the 200ml Bottle'), '_blank')}
                className="btn-olive"
                style={{ cursor: 'pointer', padding: '0.85rem 1.5rem', minHeight: '48px' }}
              >
                <ShoppingBag style={{ width: '18px', height: '18px' }} />
                <span>Get 200ml Pack — Rs. 1,899</span>
              </button>

              <button
                onClick={() => onOpenOrder ? onOpenOrder('100ml') : window.open(getWhatsAppUrl('Hi Veelana Team, I want to order the 100ml Bottle'), '_blank')}
                className="btn-outline-olive"
                style={{ cursor: 'pointer', padding: '0.85rem 1.5rem', minHeight: '48px' }}
              >
                <span>Get 100ml Trial — Rs. 999</span>
              </button>
            </div>

            {/* Micro-copy under CTA */}
            <div style={{ marginTop: '0.75rem', fontSize: '0.75rem', color: '#4F5E52', display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
              <ShieldCheck style={{ width: '14px', height: '14px', color: '#25D366' }} />
              <span>Cash on Delivery Across Pakistan • Fresh Cold-Pressed Batches • 7-Day Exchange Support</span>
            </div>

            {/* Key Trust Specs 2-Column Grid on Mobile */}
            <div className="trust-specs-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.6rem', marginTop: '1.25rem' }}>
              {trustSpecs.map((spec, i) => (
                <div key={i} className="trust-spec-item" style={{ fontSize: '0.78rem' }}>
                  <CheckCircle2 style={{ width: '15px', height: '15px', color: '#3A4828', flexShrink: 0 }} />
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
            <div className="hero-graphic-card luxury-img-frame" style={{ maxHeight: '420px', overflow: 'hidden', borderRadius: '24px', position: 'relative' }}>
              <img
                src="/assets/real_250ml_single.webp"
                alt="Veelana Real Clear Bottle with Black Flip Cap"
                style={{ width: '100%', height: '420px', objectFit: 'cover', display: 'block' }}
                loading="eager"
              />

              {/* Official Seal Badge */}
              <div style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'rgba(234, 239, 228, 0.92)',
                backdropFilter: 'blur(8px)',
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
                  src="/assets/official_png_logo.webp"
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

        {/* Phase 3 Trust Bar Under Hero */}
        <div style={{
          marginTop: '2.5rem',
          padding: '1.25rem 1.5rem',
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          border: '1px solid rgba(79, 93, 56, 0.15)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.25rem',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#EAEFE4', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Truck style={{ width: '20px', height: '20px', color: '#4F5D38' }} />
            </div>
            <div>
              <strong style={{ display: 'block', fontSize: '0.85rem', color: '#121E14' }}>Cash on Delivery</strong>
              <span style={{ fontSize: '0.75rem', color: '#5F6C50' }}>Pay when parcel arrives anywhere in Pakistan</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#EAEFE4', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Clock style={{ width: '20px', height: '20px', color: '#D4AF37' }} />
            </div>
            <div>
              <strong style={{ display: 'block', fontSize: '0.85rem', color: '#121E14' }}>2-3 Days Express Dispatch</strong>
              <span style={{ fontSize: '0.75rem', color: '#5F6C50' }}>Directly shipped across all cities in Pakistan</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#EAEFE4', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <ShieldCheck style={{ width: '20px', height: '20px', color: '#25D366' }} />
            </div>
            <div>
              <strong style={{ display: 'block', fontSize: '0.85rem', color: '#121E14' }}>100% Organic Formula</strong>
              <span style={{ fontSize: '0.75rem', color: '#5F6C50' }}>0% Mineral Oils, Sulphates & Parabens</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
