import React, { useState, useEffect } from 'react';
import { X, Sparkles, Tag, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';

export default function ExitIntentModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const { applyCoupon, addToCart } = useCart();
  const [claimed, setClaimed] = useState(false);

  useEffect(() => {
    // Check if previously dismissed in session
    if (sessionStorage.getItem('veelana_exit_discount_shown')) {
      return;
    }

    const handleMouseLeave = (e) => {
      if (e.clientY <= 10 && !hasTriggered) {
        setIsOpen(true);
        setHasTriggered(true);
        sessionStorage.setItem('veelana_exit_discount_shown', 'true');
      }
    };

    // Mobile fallback: show after 45s if idle
    const mobileTimer = setTimeout(() => {
      if (!hasTriggered && !sessionStorage.getItem('veelana_exit_discount_shown')) {
        setIsOpen(true);
        setHasTriggered(true);
        sessionStorage.setItem('veelana_exit_discount_shown', 'true');
      }
    }, 45000);

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(mobileTimer);
    };
  }, [hasTriggered]);

  if (!isOpen) return null;

  const handleClaim = () => {
    applyCoupon('SAVE10');
    setClaimed(true);
    setTimeout(() => {
      setIsOpen(false);
      addToCart({
        id: '200ml',
        name: 'Veelana 200ml Bottle',
        subtitle: 'Value Pack (10% Discount Applied)',
        price: 1899,
        originalPrice: 'Rs. 2,450',
        image: '/assets/real_250ml_single.webp',
      });
    }, 800);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsOpen(false)}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(18, 30, 20, 0.7)',
          backdropFilter: 'blur(4px)',
        }}
      />

      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '460px',
          background: '#FAF8F5',
          borderRadius: '20px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.25)',
          overflow: 'hidden',
          zIndex: 100000,
          textAlign: 'center',
          padding: '2rem 1.75rem',
        }}
      >
        <button
          onClick={() => setIsOpen(false)}
          aria-label="Close"
          style={{
            position: 'absolute',
            top: '14px',
            right: '14px',
            background: '#EAE6DB',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#334024',
          }}
        >
          <X style={{ width: '18px', height: '18px' }} />
        </button>

        <div
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: '#EAEFE4',
            color: '#3A4828',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem',
          }}
        >
          <Sparkles style={{ width: '28px', height: '28px' }} />
        </div>

        <span style={{ fontSize: '0.78rem', fontWeight: 'bold', color: '#4F5D38', textTransform: 'uppercase', letterSpacing: '1.2px' }}>
          WAIT! SPECIAL LAUNCH OFFER
        </span>

        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.85rem', fontWeight: 'bold', color: '#1B2E1E', margin: '0.5rem 0 0.35rem' }}>
          Get 10% Off Today
        </h3>

        <p style={{ fontSize: '0.88rem', color: '#5A6B53', lineHeight: 1.5, marginBottom: '1.25rem' }}>
          Say goodbye to hair fall and thinning. Take an instant 10% discount on your entire order with code <strong style={{ color: '#1B2E1E' }}>SAVE10</strong>.
        </p>

        {/* Promo code badge */}
        <div
          style={{
            background: '#FFFFFF',
            border: '2px dashed #4F5D38',
            borderRadius: '12px',
            padding: '0.75rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1.5rem',
          }}
        >
          <Tag style={{ width: '18px', height: '18px', color: '#2D6A4F' }} />
          <span style={{ fontSize: '1.1rem', fontWeight: '800', letterSpacing: '2px', color: '#1B2E1E' }}>
            SAVE10
          </span>
        </div>

        <button
          onClick={handleClaim}
          className="btn-olive"
          style={{
            width: '100%',
            padding: '0.95rem',
            fontSize: '0.95rem',
            fontWeight: 'bold',
            justifyContent: 'center',
            cursor: 'pointer',
            borderRadius: '10px',
          }}
        >
          {claimed ? (
            <>
              <Check style={{ width: '18px', height: '18px' }} />
              <span>Coupon Applied! Opening Cart...</span>
            </>
          ) : (
            <>
              <span>Claim 10% Off & Add 200ml</span>
              <ArrowRight style={{ width: '18px', height: '18px' }} />
            </>
          )}
        </button>

        <button
          onClick={() => setIsOpen(false)}
          style={{
            background: 'none',
            border: 'none',
            marginTop: '0.75rem',
            fontSize: '0.78rem',
            color: '#8A9984',
            cursor: 'pointer',
            textDecoration: 'underline',
          }}
        >
          No thanks, I prefer paying full price
        </button>
      </motion.div>
    </div>
  );
}
