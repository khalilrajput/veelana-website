import React, { useState } from 'react';
import { Check, Plus, ShoppingBag, Sparkles, ShieldCheck, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

const OIL_OPTIONS = [
  { 
    id: '200ml', 
    name: 'Veelana 200ml Master Bottle', 
    shortName: '200ml Single',
    badge: '⭐ Most Popular', 
    price: 1899, 
    originalPrice: 2450, 
    discount: 'Save Rs. 551',
    duration: '60-Day Regrowth', 
    image: '/assets/real_250ml_single.webp',
    default: true 
  },
  { 
    id: 'twin-pack-200ml', 
    name: 'Veelana Twin Pack (2x 200ml)', 
    shortName: '2x 200ml Twin Deal',
    badge: '🔥 Best Value', 
    price: 3499, 
    originalPrice: 4900, 
    discount: 'Save Rs. 1,401',
    duration: '120-Day Treatment', 
    image: '/assets/real_250ml_and_100ml.webp' 
  },
  { 
    id: '100ml', 
    name: 'Veelana 100ml Starter Bottle', 
    shortName: '100ml Starter',
    badge: 'Trial Pack', 
    price: 999, 
    originalPrice: 999, 
    discount: 'Standard Pack',
    duration: '30-Day Starter', 
    image: '/assets/real_100ml_double.webp' 
  },
];

const ADDONS = [
  {
    id: 'neem-comb',
    name: 'Neem Wood Detangler',
    desc: 'Anti-static scalp stimulation',
    bundlePrice: 199,
    retailPrice: 399,
    badge: '50% OFF',
    icon: '🪵',
    defaultSelected: true
  },
  {
    id: 'scalp-dropper',
    name: 'Scalp Application Dropper',
    desc: 'Precision direct root absorption',
    bundlePrice: 0,
    retailPrice: 199,
    badge: 'FREE GIFT',
    icon: '🧪',
    defaultSelected: true
  }
];

export default function RoutineBuilder({ onOpenOrder }) {
  const { addToCart, setIsCartOpen, clearCart } = useCart();
  const [selectedOil, setSelectedOil] = useState(OIL_OPTIONS[0]);
  const [selectedAddons, setSelectedAddons] = useState({
    'neem-comb': true,
    'scalp-dropper': true
  });

  const toggleAddon = (addonId) => {
    setSelectedAddons(prev => ({ ...prev, [addonId]: !prev[addonId] }));
  };

  // Calculate totals
  const oilPrice = selectedOil.price;
  const oilOriginal = selectedOil.originalPrice;

  let addonsPrice = 0;
  let addonsOriginal = 0;

  ADDONS.forEach(a => {
    if (selectedAddons[a.id]) {
      addonsPrice += a.bundlePrice;
      addonsOriginal += a.retailPrice;
    }
  });

  const totalBundlePrice = oilPrice + addonsPrice;
  const totalRetailPrice = oilOriginal + addonsOriginal;
  const totalSavings = totalRetailPrice - totalBundlePrice;

  // Add bundle to cart
  const handleAddBundleToCart = () => {
    addToCart({
      id: selectedOil.id,
      name: selectedOil.name,
      price: selectedOil.price,
      image: selectedOil.image,
      subtitle: selectedOil.shortName
    }, 1);

    ADDONS.forEach(a => {
      if (selectedAddons[a.id]) {
        addToCart({
          id: a.id,
          name: a.name,
          price: a.bundlePrice,
          image: selectedOil.image,
          subtitle: 'Bundle Accessory'
        }, 1);
      }
    });

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

    ADDONS.forEach(a => {
      if (selectedAddons[a.id]) {
        addToCart({
          id: a.id,
          name: a.name,
          price: a.bundlePrice,
          image: selectedOil.image,
          subtitle: 'Bundle Accessory'
        }, 1);
      }
    });

    if (onOpenOrder) {
      onOpenOrder('custom-bundle');
    } else {
      setIsCartOpen(true);
    }
  };

  return (
    <section id="routine-builder" className="builder-section">
      <div className="container" style={{ maxWidth: '1060px', margin: '0 auto', padding: '0 1rem' }}>
        
        {/* Compact Header */}
        <div style={{ textAlign: 'center', maxWidth: '620px', margin: '0 auto 2.25rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            padding: '0.3rem 0.9rem',
            borderRadius: '999px',
            background: 'rgba(79, 93, 56, 0.08)',
            border: '1px solid rgba(79, 93, 56, 0.18)',
            color: '#2D4A27',
            fontSize: '0.72rem',
            fontWeight: '700',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: '0.6rem'
          }}>
            <Sparkles className="w-3.5 h-3.5 text-[#B38E2A]" />
            <span>Custom Regrowth Bundle</span>
          </div>

          <h2 className="section-title">
            Build Your Complete Hair Routine
          </h2>

          <p className="section-subtitle">
            Select your preferred bottle size & add hair accessories with exclusive bundle discounts and free delivery.
          </p>
        </div>

        {/* Console Layout: 2 Columns */}
        <div className="builder-layout">
          
          {/* Left Column: Interactive Configuration Console */}
          <div className="builder-console-card">
            
            {/* Step 1: Oil Selection (3 Compact Cards) */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    background: '#1B2E1E',
                    color: '#FAF8F5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.72rem',
                    fontWeight: '800'
                  }}>1</span>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#1B2E1E', margin: 0 }}>
                    Select Core Herbal Oil
                  </h3>
                </div>
                <span style={{ fontSize: '0.72rem', color: '#6A7B52', fontWeight: '500' }}>
                  Pure 26 Raw Botanicals
                </span>
              </div>

              {/* 3 Oil Cards */}
              <div className="builder-oil-grid">
                {OIL_OPTIONS.map((oil) => {
                  const isSelected = selectedOil.id === oil.id;
                  return (
                    <div
                      key={oil.id}
                      onClick={() => setSelectedOil(oil)}
                      className={`builder-oil-card ${isSelected ? 'selected' : ''}`}
                    >
                      {/* Badge */}
                      <span style={{
                        position: 'absolute',
                        top: '-8px',
                        fontSize: '0.62rem',
                        fontWeight: '700',
                        color: isSelected ? '#FFFFFF' : '#6A531A',
                        background: isSelected ? '#1B2E1E' : '#F6EFCF',
                        border: '1px solid rgba(212, 175, 55, 0.3)',
                        padding: '0.1rem 0.5rem',
                        borderRadius: '999px',
                        whiteSpace: 'nowrap'
                      }}>
                        {oil.badge}
                      </span>

                      {/* Thumbnail */}
                      <div style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '8px',
                        background: '#FAF8F5',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: '0.4rem',
                        marginBottom: '0.4rem',
                        flexShrink: 0
                      }}>
                        <img
                          src={oil.image}
                          alt={oil.shortName}
                          style={{ width: '38px', height: '38px', objectFit: 'contain' }}
                          loading="lazy"
                        />
                      </div>

                      {/* Name & Duration */}
                      <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: '#1B2E1E', margin: '0 0 0.15rem' }}>
                        {oil.shortName}
                      </h4>
                      <span style={{ fontSize: '0.68rem', color: '#6B7280', marginBottom: '0.4rem' }}>
                        {oil.duration}
                      </span>

                      {/* Pricing */}
                      <div style={{ marginTop: 'auto', width: '100%', borderTop: '1px solid rgba(79, 93, 56, 0.08)', paddingTop: '0.4rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem' }}>
                          <strong style={{ fontSize: '0.92rem', color: '#1B2E1E', fontWeight: '800' }}>
                            Rs. {oil.price.toLocaleString()}
                          </strong>
                          {oil.originalPrice > oil.price && (
                            <span style={{ fontSize: '0.7rem', color: '#9CA3AF', textDecoration: 'line-through' }}>
                              {oil.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                        <span style={{ fontSize: '0.64rem', color: '#047857', fontWeight: '700', display: 'block', marginTop: '1px' }}>
                          {oil.discount}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Add Accessories (2 Compact Chips) */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    background: '#1B2E1E',
                    color: '#FAF8F5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.72rem',
                    fontWeight: '800'
                  }}>2</span>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#1B2E1E', margin: 0 }}>
                    Add Routine Essentials
                  </h3>
                </div>
                <span style={{ fontSize: '0.72rem', color: '#047857', fontWeight: '700' }}>
                  Special Bundle Price
                </span>
              </div>

              {/* 2 Accessories Cards */}
              <div className="builder-addon-grid">
                {ADDONS.map((addon) => {
                  const isChecked = !!selectedAddons[addon.id];
                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`builder-addon-card ${isChecked ? 'selected' : ''}`}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', minWidth: 0, flex: '1 1 auto' }}>
                        {/* Checkbox indicator */}
                        <div style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '6px',
                          background: isChecked ? '#1B2E1E' : '#FFFFFF',
                          border: isChecked ? 'none' : '1.5px solid #A0A09A',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#FFFFFF',
                          flexShrink: 0
                        }}>
                          {isChecked && <Check style={{ width: '13px', height: '13px' }} />}
                        </div>

                        <div style={{ minWidth: 0, flex: '1 1 auto' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', minWidth: 0 }}>
                            <span style={{ fontSize: '0.9rem', flexShrink: 0 }}>{addon.icon}</span>
                            <h4 style={{ fontSize: '0.82rem', fontWeight: '700', color: '#1B2E1E', margin: 0, whiteSpace: 'normal', wordBreak: 'break-word' }}>
                              {addon.name}
                            </h4>
                          </div>
                          <p style={{ fontSize: '0.7rem', color: '#6B7280', margin: '2px 0 0', lineHeight: 1.2 }}>
                            {addon.desc}
                          </p>
                        </div>
                      </div>

                      {/* Pricing Tag */}
                      <div style={{ textAlign: 'right', flexShrink: 0 }}>
                        <strong style={{ fontSize: '0.84rem', color: addon.bundlePrice === 0 ? '#047857' : '#1B2E1E', display: 'block', whiteSpace: 'nowrap' }}>
                          {addon.bundlePrice === 0 ? 'FREE' : `+Rs. ${addon.bundlePrice}`}
                        </strong>
                        <span style={{ fontSize: '0.66rem', color: '#047857', fontWeight: '700', whiteSpace: 'nowrap' }}>
                          {addon.badge}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Live Bundle Summary & Instant Checkout */}
          <div className="builder-summary-card">
            
            {/* Header with savings */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.85rem', borderBottom: '1px solid #ECE7DD', marginBottom: '1rem' }}>
              <div>
                <span style={{ fontSize: '0.68rem', color: '#6A7B52', textTransform: 'uppercase', fontWeight: '800', letterSpacing: '0.08em' }}>
                  YOUR CUSTOM KIT
                </span>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: '800', color: '#1B2E1E', margin: '1px 0 0' }}>
                  Regrowth Routine
                </h3>
              </div>

              <span style={{
                background: '#1B2E1E',
                color: '#E8CA65',
                fontSize: '0.7rem',
                fontWeight: '800',
                padding: '0.25rem 0.65rem',
                borderRadius: '999px',
                border: '1px solid rgba(212, 175, 55, 0.3)'
              }}>
                Save Rs. {totalSavings.toLocaleString()}
              </span>
            </div>

            {/* Line items breakdown */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', marginBottom: '1.1rem', fontSize: '0.82rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: '#1B2E1E', fontWeight: '600', minWidth: 0 }}>• {selectedOil.name}</span>
                <strong style={{ color: '#1B2E1E', flexShrink: 0 }}>Rs. {selectedOil.price.toLocaleString()}</strong>
              </div>

              {ADDONS.map(a => selectedAddons[a.id] ? (
                <div key={a.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem', color: '#4B5563' }}>
                  <span style={{ minWidth: 0 }}>• {a.name}</span>
                  <strong style={{ color: a.bundlePrice === 0 ? '#047857' : '#1B2E1E', flexShrink: 0 }}>
                    {a.bundlePrice === 0 ? 'FREE GIFT' : `Rs. ${a.bundlePrice}`}
                  </strong>
                </div>
              ) : null)}

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem', color: '#047857', fontWeight: '700' }}>
                <span>• Express COD Delivery</span>
                <span style={{ flexShrink: 0 }}>FREE</span>
              </div>
            </div>

            {/* Financial Summary Box */}
            <div style={{
              background: '#FAF8F3',
              borderRadius: '12px',
              padding: '0.85rem 1rem',
              border: '1px solid #E2DDCF',
              marginBottom: '1.1rem',
              boxSizing: 'border-box'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                <span style={{ fontSize: '0.78rem', color: '#6B7280' }}>Retail Value:</span>
                <span style={{ fontSize: '0.82rem', color: '#9CA3AF', textDecoration: 'line-through' }}>
                  Rs. {totalRetailPrice.toLocaleString()}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.92rem', fontWeight: '800', color: '#1B2E1E' }}>Bundle Total (COD):</span>
                <span style={{ fontSize: '1.35rem', fontWeight: '900', color: '#1B2E1E' }}>
                  Rs. {totalBundlePrice.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', width: '100%' }}>
              <button
                onClick={handleExpressOrder}
                style={{
                  width: '100%',
                  minHeight: '48px',
                  padding: '0.85rem 1rem',
                  background: '#1B2E1E',
                  color: '#FAF8F5',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.9375rem',
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
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#2D4A27';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#1B2E1E';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <span>Express Order Now (Cash on Delivery)</span>
                <ArrowRight className="w-4 h-4 text-[#D4AF37] shrink-0" />
              </button>

              <button
                onClick={handleAddBundleToCart}
                style={{
                  width: '100%',
                  minHeight: '48px',
                  padding: '0.75rem 1rem',
                  background: '#FFFFFF',
                  color: '#1B2E1E',
                  border: '1.5px solid rgba(79, 93, 56, 0.25)',
                  borderRadius: 'var(--radius-sm)',
                  fontWeight: '700',
                  fontSize: '0.9375rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.2s ease',
                  boxSizing: 'border-box',
                  textAlign: 'center'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#FAF8F3';
                  e.currentTarget.style.borderColor = '#1B2E1E';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#FFFFFF';
                  e.currentTarget.style.borderColor = 'rgba(79, 93, 56, 0.25)';
                }}
              >
                <ShoppingBag className="w-4 h-4 text-[#1B2E1E] shrink-0" />
                <span>Add Custom Kit to Cart</span>
              </button>
            </div>

            {/* Reassurance */}
            <div style={{ marginTop: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', fontSize: '0.72rem', color: '#6A7B52' }}>
              <ShieldCheck className="w-3.5 h-3.5 text-[#2D6A4F] shrink-0" />
              <span>7-Day Replacement • Free Nationwide Delivery</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
