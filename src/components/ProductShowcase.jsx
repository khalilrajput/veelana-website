import React, { useState, useEffect } from 'react';
import { ShoppingBag, Check, Sparkles, Star, Plus, Flame, ShieldCheck, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { getProducts } from '../services/productService';
import { useCart } from '../context/CartContext';

export default function ProductShowcase({ onOpenOrder }) {
  const [selectedCategory, setSelectedCategory] = useState('all'); // 'all', 'bottles', 'bundles'
  const [products, setProducts] = useState(getProducts());
  const { addToCart } = useCart();

  useEffect(() => {
    const handleProductsUpdated = () => {
      setProducts(getProducts());
    };
    window.addEventListener('veelana_products_updated', handleProductsUpdated);
    return () => window.removeEventListener('veelana_products_updated', handleProductsUpdated);
  }, []);

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter((p) => (p.category || 'bottles') === selectedCategory);

  return (
    <section id="products" className="products-section" style={{ padding: '4.5rem 0', background: '#FAF8F5' }}>
      <div className="container">
        
        {/* Section Title */}
        <div className="text-center" style={{ maxWidth: '720px', margin: '0 auto 2.5rem' }}>
          <div className="section-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#EAEFE4', color: '#3A4828', padding: '6px 16px', borderRadius: '999px', fontSize: '0.82rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.75rem' }}>
            <Sparkles style={{ width: '15px', height: '15px', color: '#4F5D38' }} />
            <span>Pure Botanical Formulations</span>
          </div>

          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: 'bold', color: '#1B2E1E', margin: '0 0 0.5rem' }}>
            Select Your Hair Care Solution
          </h2>
          <p style={{ fontSize: '1rem', color: '#5F7057', lineHeight: 1.5 }}>
            100% Pure Cold-Pressed Herbal Hair Care Oil. Freshly bottled & delivered via Cash on Delivery across Pakistan.
          </p>

          {/* Flash Sale Urgency Bar */}
          <div
            style={{
              background: '#FFF3CD',
              border: '1px solid #FFE69C',
              borderRadius: '12px',
              padding: '0.65rem 1rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginTop: '1rem',
              color: '#856404',
              fontSize: '0.85rem',
              fontWeight: '700',
            }}
          >
            <Flame style={{ width: '18px', height: '18px', color: '#D97706' }} />
            <span>Launch Offer: Free Delivery on Orders above Rs. 3,000 + 10% off with coupon <strong>SAVE10</strong></span>
          </div>

          {/* Category Toggle Switch */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '1.5rem' }}>
            <button
              onClick={() => setSelectedCategory('all')}
              style={{
                padding: '0.55rem 1.25rem',
                borderRadius: '999px',
                fontSize: '0.85rem',
                fontWeight: '700',
                cursor: 'pointer',
                border: '1px solid #4F5D38',
                background: selectedCategory === 'all' ? '#4F5D38' : '#FFFFFF',
                color: selectedCategory === 'all' ? '#FAF8F5' : '#334024',
              }}
            >
              All Products
            </button>
            <button
              onClick={() => setSelectedCategory('bottles')}
              style={{
                padding: '0.55rem 1.25rem',
                borderRadius: '999px',
                fontSize: '0.85rem',
                fontWeight: '700',
                cursor: 'pointer',
                border: '1px solid #4F5D38',
                background: selectedCategory === 'bottles' ? '#4F5D38' : '#FFFFFF',
                color: selectedCategory === 'bottles' ? '#FAF8F5' : '#334024',
              }}
            >
              Single Bottles (100ml & 200ml)
            </button>
            <button
              onClick={() => setSelectedCategory('bundles')}
              style={{
                padding: '0.55rem 1.25rem',
                borderRadius: '999px',
                fontSize: '0.85rem',
                fontWeight: '700',
                cursor: 'pointer',
                border: '1px solid #4F5D38',
                background: selectedCategory === 'bundles' ? '#4F5D38' : '#FFFFFF',
                color: selectedCategory === 'bundles' ? '#FAF8F5' : '#334024',
              }}
            >
              Special Bundles & Twin Packs
            </button>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div 
          style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.75rem',
            maxWidth: '1100px',
            margin: '0 auto'
          }}
        >
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                background: '#FFFFFF',
                borderRadius: '20px',
                border: product.popular ? '2px solid #4F5D38' : '1px solid rgba(79, 93, 56, 0.15)',
                boxShadow: product.popular ? '0 12px 35px rgba(79, 93, 56, 0.15)' : '0 4px 20px rgba(0,0,0,0.04)',
                padding: '1.75rem 1.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
              }}
            >
              {/* Badge */}
              {product.popular && (
                <div
                  style={{
                    position: 'absolute',
                    top: '-12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: '#2D6A4F',
                    color: '#FAF8F5',
                    fontSize: '0.72rem',
                    fontWeight: '800',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    padding: '4px 14px',
                    borderRadius: '999px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
                  }}
                >
                  <Star style={{ width: '12px', height: '12px', fill: 'currentColor' }} />
                  Most Popular Choice
                </div>
              )}

              <div>
                {/* Header */}
                <div style={{ textAlign: 'center', borderBottom: '1px solid rgba(79, 93, 56, 0.12)', paddingBottom: '1rem', marginTop: product.popular ? '0.5rem' : '0' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 'bold', color: '#4F5D38', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '0.25rem' }}>
                    {product.subtitle}
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.65rem', fontWeight: 'bold', color: '#1B2E1E', margin: 0 }}>
                    {product.name}
                  </h3>
                  
                  {/* Price Tag Display */}
                  <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '1.6rem', fontWeight: '800', color: '#1B2E1E' }}>{product.price}</span>
                    {product.originalPrice && (
                      <span style={{ fontSize: '0.95rem', color: '#8A9A86', textDecoration: 'line-through' }}>{product.originalPrice}</span>
                    )}
                  </div>
                </div>

                {/* Real Product Image Box */}
                <div
                  style={{
                    height: '180px',
                    margin: '1.25rem 0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#FAF8F5',
                    borderRadius: '12px',
                    padding: '0.75rem',
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                    onError={(e) => { e.target.src = '/assets/real_100ml_double.webp'; }}
                  />
                </div>

                {/* Stock Scarcity Indicator */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.74rem', color: '#B45309', background: '#FEF3C7', padding: '4px 8px', borderRadius: '6px', marginBottom: '1rem' }}>
                  <Clock style={{ width: '13px', height: '13px' }} />
                  <span>Only 8 bottles left at special discounted rate</span>
                </div>

                {/* Feature Bullet List */}
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  {product.features && product.features.map((feat, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.84rem', color: '#3A4828' }}>
                      <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#EAEFE4', color: '#2D6A4F', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                        <Check style={{ width: '12px', height: '12px' }} />
                      </div>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons: Add to Cart + Buy Now */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <button
                  onClick={() => addToCart(product, 1)}
                  className="btn-olive"
                  style={{ width: '100%', padding: '0.8rem', justifyContent: 'center', cursor: 'pointer', borderRadius: '10px', fontSize: '0.9rem' }}
                >
                  <ShoppingBag style={{ width: '16px', height: '16px' }} />
                  <span>Add to Cart</span>
                </button>

                <button
                  onClick={() => onOpenOrder ? onOpenOrder(product.id) : addToCart(product, 1)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: '#FAF8F5',
                    color: '#2A361E',
                    border: '1px solid rgba(79, 93, 56, 0.3)',
                    borderRadius: '10px',
                    fontSize: '0.85rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                  }}
                >
                  <span>Quick Buy Now</span>
                  <ArrowRight style={{ width: '14px', height: '14px' }} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
