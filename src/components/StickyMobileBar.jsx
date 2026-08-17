import React from 'react';
import { ShoppingBag, Package, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function StickyMobileBar({ onOpenOrder }) {
  const { totalItemsCount, setIsCartOpen } = useCart();

  return (
    <div
      className="md:hidden"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 900,
        backgroundColor: '#1B2E1E',
        color: '#FAF8F5',
        borderTop: '2px solid #4F5D38',
        padding: '0.6rem 1rem',
        boxShadow: '0 -10px 25px rgba(0,0,0,0.25)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '0.75rem'
      }}
    >
      <div>
        <span style={{ display: 'block', fontSize: '0.65rem', color: '#A0B195', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 'bold' }}>
          Pure Botanical Oil
        </span>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.35rem' }}>
          <span style={{ fontSize: '1.15rem', fontWeight: '800', color: '#FAF8F5' }}>From Rs. 999</span>
          <span style={{ fontSize: '0.7rem', color: 'rgba(250,248,245,0.6)', textDecoration: 'line-through' }}>Rs. 1,490</span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        {/* Mobile View Cart button */}
        <button
          onClick={() => setIsCartOpen(true)}
          style={{
            position: 'relative',
            background: 'rgba(255,255,255,0.1)',
            color: '#FAF8F5',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '10px',
            padding: '0.55rem 0.75rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
          aria-label="View Cart"
        >
          <ShoppingBag style={{ width: '18px', height: '18px' }} />
          {totalItemsCount > 0 && (
            <span
              style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                background: '#2D6A4F',
                color: '#FAF8F5',
                fontSize: '0.68rem',
                fontWeight: '800',
                borderRadius: '999px',
                minWidth: '16px',
                height: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 3px',
              }}
            >
              {totalItemsCount}
            </span>
          )}
        </button>

        {/* Order CTA */}
        <button
          onClick={() => onOpenOrder ? onOpenOrder('200ml') : setIsCartOpen(true)}
          style={{
            padding: '0.65rem 1.1rem',
            backgroundColor: '#4F5D38',
            color: '#FAF8F5',
            border: 'none',
            borderRadius: '10px',
            fontWeight: 'bold',
            fontSize: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.4rem',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
          }}
        >
          <span>Order Now</span>
        </button>
      </div>
    </div>
  );
}
