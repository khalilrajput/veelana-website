import React, { useState, useEffect } from 'react';
import { ShoppingBag, Sparkles, CheckCircle2, ShieldCheck, Truck, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { getWhatsAppUrl } from '../utils/whatsapp';
import { getCmsSettings } from '../services/cmsService';

export default function Hero({ onOpenOrder }) {
  const [cms, setCms] = useState(() => getCmsSettings());

  useEffect(() => {
    const handleCmsUpdate = () => {
      setCms(getCmsSettings());
    };
    window.addEventListener('veelana_cms_updated', handleCmsUpdate);
    return () => window.removeEventListener('veelana_cms_updated', handleCmsUpdate);
  }, []);

  const hero = cms?.heroContent || {};
  const trustSpecs = hero.trustSpecs || [
    '25+ Cold-Pressed Herbs',
    'Paraben & Sulphate Free',
    'Mineral Oil Free',
    '100% Organic & Vegan',
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
              <span>{hero.badgeText || 'Pure Botanical Root Elixir'}</span>
            </div>

            {/* Main Headline */}
            <h1 className="hero-title">
              {hero.headlinePart1 || 'Beauty Begins at the'} <span>{hero.headlineHighlight || 'Roots'}</span>
            </h1>

            {/* Sub-headline */}
            <p className="hero-subtitle">
              {hero.subtitle || 'Nourish your scalp with 26 cold-pressed herbs. Formulated to revive dormant follicles, eliminate hair fall, and boost rich natural volume. Direct fresh artisan batch dispatch across Pakistan.'}
            </p>

            {/* CTAs */}
            <div className="hero-buttons">
              <button
                onClick={() => onOpenOrder ? onOpenOrder(hero.cta1Size || '200ml') : window.open(getWhatsAppUrl(`Hi Veelana Team, I want to order the ${hero.cta1Size || '200ml'} Bottle`), '_blank')}
                className="btn-olive"
              >
                <ShoppingBag style={{ width: '18px', height: '18px' }} />
                <span>{hero.cta1Text || 'Get 200ml Pack — Rs. 1,899'}</span>
              </button>

              <button
                onClick={() => onOpenOrder ? onOpenOrder(hero.cta2Size || '100ml') : window.open(getWhatsAppUrl(`Hi Veelana Team, I want to order the ${hero.cta2Size || '100ml'} Bottle`), '_blank')}
                className="btn-outline-olive"
              >
                <span>{hero.cta2Text || 'Get 100ml Trial — Rs. 999'}</span>
              </button>
            </div>

            {/* Micro-copy under CTA */}
            <div style={{ marginTop: '0.85rem', fontSize: '0.875rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
              <ShieldCheck style={{ width: '15px', height: '15px', color: '#25D366' }} />
              <span>{hero.microcopy || 'Cash on Delivery Across Pakistan • Fresh Cold-Pressed Batches • 7-Day Exchange Support'}</span>
            </div>

            {/* Key Trust Specs 2-Column Grid on Mobile */}
            <div className="trust-specs-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.65rem', marginTop: '1.25rem' }}>
              {trustSpecs.map((spec, i) => (
                <div key={i} className="trust-spec-item">
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
                src={hero.image || '/assets/real_250ml_single.webp'}
                alt="Veelana Herbal Hair Oil"
                style={{ width: '100%', height: '420px', objectFit: 'cover', display: 'block' }}
                loading="eager"
                onError={(e) => { e.currentTarget.src = '/assets/real_250ml_single.webp'; }}
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
                gap: '0.5rem',
                boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
              }}>
                <Sparkles style={{ width: '16px', height: '16px', color: '#B38E2A' }} />
                <div>
                  <div style={{ fontSize: '0.65rem', color: '#6A7B52', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: '800' }}>
                    100% PURE
                  </div>
                  <div style={{ fontSize: '0.85rem', fontWeight: '800', color: '#1B2E1E' }}>
                    26 Cold-Pressed Herbs
                  </div>
                </div>
              </div>

              {/* Bottom Proof Strip */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'linear-gradient(to top, rgba(27, 46, 30, 0.92), transparent)',
                padding: '1.25rem 1.25rem 1rem',
                color: '#FAF8F5',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end'
              }}>
                <div>
                  <span style={{ fontSize: '0.7rem', color: '#E8CA65', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: '700' }}>
                    HERBAL HAIR CARE
                  </span>
                  <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', margin: '2px 0 0', color: '#FAF8F5' }}>
                    Veelana Botanical Oil
                  </h4>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.65rem', color: '#D4DFC9', display: 'block' }}>Fresh Artisanal Batch</span>
                  <strong style={{ fontSize: '0.85rem', color: '#FFFFFF' }}>Handcrafted in Pakistan</strong>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
