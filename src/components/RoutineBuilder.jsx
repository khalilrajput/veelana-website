import React, { useState } from 'react';
import { Check, ShoppingBag, Sparkles, ShieldCheck, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

const OIL_OPTIONS = [
  { 
    id: '200ml', 
    name: 'Veelana 200ml Master Bottle', 
    shortName: '200ml Master Bottle',
    badge: '⭐ Most Popular', 
    price: 1899, 
    originalPrice: 2450, 
    discount: 'Save Rs. 551',
    duration: '60-Day Deep Regrowth Treatment', 
    description: 'Our signature artisan formulation. Formulated to awaken dormant follicles and stop hair fall at the roots.',
    image: '/assets/real_250ml_single.webp',
    default: true 
  },
  { 
    id: 'twin-pack-200ml', 
    name: 'Veelana Twin Pack (2x 200ml)', 
    shortName: '2x 200ml Twin Deal',
    badge: '🔥 Best Value Deal', 
    price: 3499, 
    originalPrice: 4900, 
    discount: 'Save Rs. 1,401',
    duration: '120-Day Complete Hair Transformation', 
    description: 'Two full 200ml bottles (400ml total) for continuous hair revival. Free nationwide express courier delivery included.',
    image: '/assets/real_250ml_and_100ml.webp' 
  },
  { 
    id: '100ml', 
    name: 'Veelana 100ml Starter Bottle', 
    shortName: '100ml Starter Pack',
    badge: 'Trial Pack', 
    price: 999, 
    originalPrice: 999, 
    discount: 'Standard Pack',
    duration: '30-Day Starter Routine', 
    description: 'Travel-friendly size to experience the pure cold-pressed herbal formula and reduce everyday shedding.',
    image: '/assets/real_100ml_double.webp' 
  },
];

const OIL_HIGHLIGHTS = [
  '26 Raw Cold-Pressed Botanicals Infusion',
  '100% Free from Parabens, Mineral Oils & Synthetic Fragrance',
  'Priority Dispatch & Fresh Handcrafted Artisan Batch',
  'Free WhatsApp Consultation with Hair Care Specialists'
];

export default function RoutineBuilder({ onOpenOrder }) {
  const { addToCart, setIsCartOpen, clearCart } = useCart();
  const [selectedOil, setSelectedOil] = useState(OIL_OPTIONS[0]);

  // Calculate totals
  const totalBottlePrice = selectedOil.price;
  const totalRetailPrice = selectedOil.originalPrice || selectedOil.price;
  const totalSavings = Math.max(0, totalRetailPrice - totalBottlePrice);

  // Add bottle to cart
  const handleAddToCart = () => {
    addToCart({
      id: selectedOil.id,
      name: selectedOil.name,
      price: selectedOil.price,
      image: selectedOil.image,
      subtitle: selectedOil.shortName
    }, 1);

    setIsCartOpen(true);
  };

  // Express 1-Click Buy Now
  const handleExpressOrder = () => {
    clearCart();
    addToCart({
      id: selectedOil.id,
      name: selectedOil.name,
      price: selectedOil.price,
      image: selectedOil.image,
      subtitle: selectedOil.shortName
    }, 1);

    if (onOpenOrder) {
      onOpenOrder(selectedOil.id);
    } else {
      setIsCartOpen(true);
    }
  };

  return (
    <section id="routine-builder" className="builder-section" style={{ padding: '4rem 0', background: '#F8F6F0' }}>
      <div className="container" style={{ maxWidth: '1060px', margin: '0 auto', padding: '0 1rem' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 2.5rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            padding: '0.35rem 0.95rem',
            borderRadius: '999px',
            background: 'rgba(79, 93, 56, 0.08)',
            border: '1px solid rgba(79, 93, 56, 0.18)',
            color: '#2D4A27',
            fontSize: '0.75rem',
            fontWeight: '700',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: '0.75rem'
          }}>
            <Sparkles className="w-3.5 h-3.5 text-[#B38E2A]" />
            <span>Select Your Pure Oil Regrowth Plan</span>
          </div>

          <h2 className="section-title" style={{ fontFamily: 'var(--font-heading)', fontSize: '2.1rem', color: '#1B2E1E', margin: '0 0 0.75rem' }}>
            Choose Your Veelana Oil Package
          </h2>

          <p className="section-subtitle" style={{ fontSize: '0.95rem', color: '#556549', lineHeight: 1.6 }}>
            100% pure cold-pressed herbal hair care oil. Select your desired bottle size and enjoy instant discounted bundle savings with Cash on Delivery across Pakistan.
          </p>
        </div>

        {/* 2 Columns Console Layout */}
        <div className="builder-layout" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', alignItems: 'start' }}>
          
          {/* Left Column: Interactive Oil Option Selector */}
          <div className="builder-console-card" style={{ background: '#FFFFFF', padding: '1.75rem', borderRadius: '20px', border: '1px solid #ECE7DD', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: '#1B2E1E',
                  color: '#FAF8F5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.78rem',
                  fontWeight: '800'
                }}>1</span>
                <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#1B2E1E', margin: 0 }}>
                  Select Bottle Size / Package
                </h3>
              </div>
              <span style={{ fontSize: '0.75rem', color: '#047857', fontWeight: '700' }}>
                Fresh Artisanal Batch
              </span>
            </div>

            {/* 3 Oil Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {OIL_OPTIONS.map((oil) => {
                const isSelected = selectedOil.id === oil.id;
                return (
                  <div
                    key={oil.id}
                    onClick={() => setSelectedOil(oil)}
                    style={{
                      border: isSelected ? '2px solid #1B2E1E' : '1px solid #E2DDCF',
                      background: isSelected ? '#FAF8F3' : '#FFFFFF',
                      borderRadius: '16px',
                      padding: '1.15rem',
                      cursor: 'pointer',
                      position: 'relative',
                      transition: 'all 0.2s ease',
                      boxShadow: isSelected ? '0 6px 20px rgba(27, 46, 30, 0.08)' : 'none',
                    }}
                  >
                    {/* Badge */}
                    <span style={{
                      position: 'absolute',
                      top: '-10px',
                      right: '16px',
                      fontSize: '0.68rem',
                      fontWeight: '800',
                      color: isSelected ? '#FFFFFF' : '#6A531A',
                      background: isSelected ? '#1B2E1E' : '#F6EFCF',
                      border: '1px solid rgba(212, 175, 55, 0.4)',
                      padding: '0.2rem 0.65rem',
                      borderRadius: '999px',
                      whiteSpace: 'nowrap'
                    }}>
                      {oil.badge}
                    </span>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      {/* Radio Selector */}
                      <div style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        border: isSelected ? '6px solid #1B2E1E' : '2px solid #CBD5E1',
                        background: '#FFFFFF',
                        flexShrink: 0
                      }} />

                      {/* Thumbnail */}
                      <div style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '10px',
                        background: '#FAF8F5',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        border: '1px solid #ECE7DD',
                        overflow: 'hidden',
                        padding: '4px'
                      }}>
                        <img
                          src={oil.image}
                          alt={oil.shortName}
                          style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                          loading="lazy"
                        />
                      </div>

                      {/* Info */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
                          <div>
                            <h4 style={{ fontSize: '0.95rem', fontWeight: '800', color: '#1B2E1E', margin: '0 0 2px' }}>
                              {oil.name}
                            </h4>
                            <span style={{ fontSize: '0.75rem', color: '#6A7B52', fontWeight: '600', display: 'block' }}>
                              {oil.duration}
                            </span>
                          </div>

                          <div style={{ textAlign: 'right', flexShrink: 0 }}>
                            <strong style={{ fontSize: '1.05rem', color: '#1B2E1E', fontWeight: '900', display: 'block' }}>
                              Rs. {oil.price.toLocaleString()}
                            </strong>
                            {oil.originalPrice > oil.price && (
                              <span style={{ fontSize: '0.72rem', color: '#9CA3AF', textDecoration: 'line-through' }}>
                                Rs. {oil.originalPrice.toLocaleString()}
                              </span>
                            )}
                          </div>
                        </div>

                        <p style={{ fontSize: '0.78rem', color: '#4A5568', margin: '0.45rem 0 0', lineHeight: 1.35 }}>
                          {oil.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quality assurance bullets */}
            <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid #ECE7DD' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#3A4828', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '0.65rem' }}>
                Every Bottle Includes:
              </span>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.5rem' }}>
                {OIL_HIGHLIGHTS.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.78rem', color: '#4B5563' }}>
                    <CheckCircle2 style={{ width: '14px', height: '14px', color: '#047857', flexShrink: 0 }} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Live Order Summary & Instant Checkout */}
          <div className="builder-summary-card" style={{ background: '#FFFFFF', padding: '1.75rem', borderRadius: '20px', border: '1px solid #ECE7DD', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
            
            {/* Header with savings */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.85rem', borderBottom: '1px solid #ECE7DD', marginBottom: '1rem' }}>
              <div>
                <span style={{ fontSize: '0.68rem', color: '#6A7B52', textTransform: 'uppercase', fontWeight: '800', letterSpacing: '0.08em' }}>
                  YOUR SELECTION
                </span>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: '800', color: '#1B2E1E', margin: '1px 0 0' }}>
                  Veelana Hair Regrowth Oil
                </h3>
              </div>

              {totalSavings > 0 && (
                <span style={{
                  background: '#1B2E1E',
                  color: '#E8CA65',
                  fontSize: '0.75rem',
                  fontWeight: '800',
                  padding: '0.3rem 0.75rem',
                  borderRadius: '999px',
                  border: '1px solid rgba(212, 175, 55, 0.3)'
                }}>
                  Save Rs. {totalSavings.toLocaleString()}
                </span>
              )}
            </div>

            {/* Selected Bottle Preview Card */}
            <div style={{ display: 'flex', gap: '0.85rem', padding: '0.85rem', background: '#FAF8F3', borderRadius: '12px', border: '1px solid #E2DDCF', marginBottom: '1.25rem' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '8px', background: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, padding: '4px', border: '1px solid #E2DDCF' }}>
                <img src={selectedOil.image} alt={selectedOil.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h4 style={{ fontSize: '0.92rem', fontWeight: '800', color: '#1B2E1E', margin: 0 }}>
                  {selectedOil.name}
                </h4>
                <span style={{ fontSize: '0.75rem', color: '#047857', fontWeight: '700', display: 'block', marginTop: '2px' }}>
                  {selectedOil.duration}
                </span>
                <span style={{ fontSize: '0.85rem', fontWeight: '800', color: '#1B2E1E', display: 'block', marginTop: '4px' }}>
                  Rs. {selectedOil.price.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Line items breakdown */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', marginBottom: '1.1rem', fontSize: '0.82rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem', color: '#4B5563' }}>
                <span>• 26 Cold-Pressed Botanical Infusion</span>
                <span style={{ color: '#047857', fontWeight: '700' }}>INCLUDED</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem', color: '#4B5563' }}>
                <span>• Free WhatsApp Usage Support</span>
                <span style={{ color: '#047857', fontWeight: '700' }}>INCLUDED</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem', color: '#047857', fontWeight: '700' }}>
                <span>• Nationwide Express COD Delivery</span>
                <span>{selectedOil.price >= 3000 ? 'FREE' : 'Rs. 199'}</span>
              </div>
            </div>

            {/* Financial Summary Box */}
            <div style={{
              background: '#F5F2EB',
              borderRadius: '12px',
              padding: '0.85rem 1rem',
              border: '1px solid #DDD7C7',
              marginBottom: '1.25rem',
              boxSizing: 'border-box'
            }}>
              {totalSavings > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <span style={{ fontSize: '0.78rem', color: '#6B7280' }}>Regular Value:</span>
                  <span style={{ fontSize: '0.82rem', color: '#9CA3AF', textDecoration: 'line-through' }}>
                    Rs. {totalRetailPrice.toLocaleString()}
                  </span>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.95rem', fontWeight: '800', color: '#1B2E1E' }}>Order Total (COD):</span>
                <span style={{ fontSize: '1.4rem', fontWeight: '900', color: '#1B2E1E' }}>
                  Rs. {totalBottlePrice.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%' }}>
              <button
                onClick={handleExpressOrder}
                style={{
                  width: '100%',
                  minHeight: '48px',
                  padding: '0.85rem 1rem',
                  background: '#1B2E1E',
                  color: '#FAF8F5',
                  border: '1px solid rgba(212, 175, 55, 0.4)',
                  borderRadius: '12px',
                  fontSize: '0.95rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 4px 14px rgba(27, 46, 30, 0.15)',
                  transition: 'all 0.2s ease',
                  boxSizing: 'border-box',
                  textAlign: 'center'
                }}
              >
                <span>Express Order Now (Cash on Delivery)</span>
                <ArrowRight className="w-4 h-4 text-[#D4AF37] shrink-0" />
              </button>

              <button
                onClick={handleAddToCart}
                style={{
                  width: '100%',
                  minHeight: '48px',
                  padding: '0.75rem 1rem',
                  background: '#FFFFFF',
                  color: '#1B2E1E',
                  border: '1.5px solid rgba(79, 93, 56, 0.3)',
                  borderRadius: '12px',
                  fontWeight: '700',
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.2s ease',
                  boxSizing: 'border-box',
                  textAlign: 'center'
                }}
              >
                <ShoppingBag className="w-4 h-4 text-[#1B2E1E] shrink-0" />
                <span>Add Bottle to Cart</span>
              </button>
            </div>

            {/* Reassurance */}
            <div style={{ marginTop: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', fontSize: '0.75rem', color: '#6A7B52' }}>
              <ShieldCheck className="w-3.5 h-3.5 text-[#2D6A4F] shrink-0" />
              <span>7-Day Replacement Guarantee • Fresh Artisan Batch</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
