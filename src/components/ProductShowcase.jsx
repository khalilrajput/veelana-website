import React, { useState, useEffect } from 'react';
import { MessageCircle, Check, Sparkles, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { getProducts } from '../services/productService';
import { getWhatsAppUrl } from '../utils/whatsapp';

export default function ProductShowcase() {
  const [selectedSize, setSelectedSize] = useState('all'); // 'all', or specific product id
  const [products, setProducts] = useState(getProducts());

  useEffect(() => {
    const handleProductsUpdated = () => {
      setProducts(getProducts());
    };
    window.addEventListener('veelana_products_updated', handleProductsUpdated);
    return () => window.removeEventListener('veelana_products_updated', handleProductsUpdated);
  }, []);

  const filteredProducts = selectedSize === 'all' 
    ? products 
    : products.filter(p => p.id === selectedSize || p.name.toLowerCase().includes(selectedSize.toLowerCase()));

  return (
    <section id="products" className="products-section">
      <div className="container">
        
        {/* Section Title */}
        <div className="text-center">
          <div className="section-badge">
            <Sparkles className="w-4 h-4 text-[#4F5D38]" />
            Choose Your Hair Care Size
          </div>
          <h2 className="section-title">
            Select Your Veelana Experience
          </h2>
          <p className="section-subtitle">
            Order directly via WhatsApp for fast delivery across Pakistan right from our origin in Khanewal City.
          </p>

          {/* Real Duo Showcase Banner Photo */}
          <div style={{ maxWidth: '680px', margin: '2rem auto 1rem', borderRadius: '20px', overflow: 'hidden', border: '1.5px solid rgba(79, 93, 56, 0.2)', boxShadow: '0 15px 35px rgba(79, 93, 56, 0.1)' }}>
            <img
              src="/assets/real_250ml_and_100ml.jpg"
              alt="Real Veelana 250ml and 100ml Bottle Duo"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>

          {/* Interactive Filter / Size Toggle Switch */}
          <div className="size-toggle-box">
            <button
              onClick={() => setSelectedSize('all')}
              className={`size-btn ${selectedSize === 'all' ? 'active' : ''}`}
            >
              Show All Sizes
            </button>
            {products.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedSize(p.id)}
                className={`size-btn ${selectedSize === p.id ? 'active' : ''}`}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div 
          className="products-grid" 
          style={{ 
            gridTemplateColumns: filteredProducts.length > 1 ? 'repeat(auto-fit, minmax(320px, 1fr))' : '1fr', 
            maxWidth: filteredProducts.length > 1 ? '1080px' : '520px',
            margin: '0 auto'
          }}
        >
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`product-card ${product.popular ? 'popular' : ''}`}
            >
              {/* Most Popular Badge */}
              {product.popular && (
                <div className="popular-badge">
                  <Star className="w-3.5 h-3.5 fill-current inline mr-1" />
                  Most Popular Choice
                </div>
              )}

              <div>
                {/* Header */}
                <div className="text-center" style={{ borderBottom: '1px solid rgba(79, 93, 56, 0.15)', paddingBottom: '1.5rem' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 'bold', color: '#4F5D38', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '0.25rem' }}>
                    {product.subtitle}
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', fontWeight: 'bold', color: '#3A4828' }}>
                    {product.name}
                  </h3>
                  
                  {/* Price Tag Display */}
                  {product.price && (
                    <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '1.5rem', fontWeight: '800', color: '#1B2E1E' }}>{product.price}</span>
                      {product.originalPrice && (
                        <span style={{ fontSize: '1rem', color: '#8A9A86', textDecoration: 'line-through' }}>{product.originalPrice}</span>
                      )}
                    </div>
                  )}

                  {/* Clean Olive Tinted Badge Block */}
                  {product.badge && (
                    <div style={{
                      display: 'inline-block',
                      background: '#EAEFE4',
                      color: '#3A4828',
                      fontSize: '0.78rem',
                      fontWeight: '700',
                      padding: '0.35rem 1rem',
                      borderRadius: '9999px',
                      marginTop: '0.75rem',
                      border: '1px solid rgba(79, 93, 56, 0.25)'
                    }}>
                      {product.badge}
                    </div>
                  )}
                </div>

                {/* Real Product Image Box */}
                <div className="product-img-box">
                  <img
                    src={product.image}
                    alt={product.name}
                    onError={(e) => { e.target.src = '/assets/real_100ml_double.jpg'; }}
                  />
                </div>

                {/* Feature Bullet List */}
                <ul className="feature-list">
                  {product.features && product.features.map((feat, idx) => (
                    <li key={idx} className="feature-item">
                      <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#EAEFE4', color: '#3A4828', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Direct WhatsApp Order Button */}
              <a
                href={getWhatsAppUrl(`Hi, I want to order the ${product.name}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-olive"
                style={{ width: '100%', padding: '1rem' }}
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Order {product.name} on WhatsApp</span>
              </a>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
