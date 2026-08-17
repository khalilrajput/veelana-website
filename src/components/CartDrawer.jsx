import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, Truck, ShieldCheck, Tag, ArrowRight, Sparkles, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart, FREE_SHIPPING_THRESHOLD } from '../context/CartContext';

export default function CartDrawer({ onCheckout }) {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    coupon,
    applyCoupon,
    removeCoupon,
    totalItemsCount,
    subtotal,
    discountAmount,
    shippingFee,
    isFreeShipping,
    finalTotal,
    amountToFreeShipping,
    freeShippingProgress,
    addToCart,
  } = useCart();

  const [couponCodeInput, setCouponCodeInput] = useState('');
  const [couponMsg, setCouponMsg] = useState({ text: '', isError: false });

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponCodeInput.trim()) return;
    const res = applyCoupon(couponCodeInput);
    if (res.success) {
      setCouponMsg({ text: res.message, isError: false });
      setCouponCodeInput('');
    } else {
      setCouponMsg({ text: res.message, isError: true });
    }
  };

  const handleAddUpsellComb = () => {
    addToCart({
      id: 'neem-comb',
      name: 'Organic Neem Wood Detangler Comb',
      subtitle: 'Static-Free Hair Growth Comb',
      price: 399,
      originalPrice: 'Rs. 650',
      image: '/assets/real_100ml_double.webp',
    });
  };

  const hasNeemComb = cartItems.some((item) => item.id === 'neem-comb');

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
      {/* Dark Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsCartOpen(false)}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(18, 30, 20, 0.65)',
          backdropFilter: 'blur(4px)',
        }}
      />

      {/* Slide-out Drawer Box */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 280 }}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '460px',
          height: '100%',
          background: '#FAF8F5',
          boxShadow: '-8px 0 32px rgba(0,0,0,0.18)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 10000,
        }}
      >
        {/* Drawer Header */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid rgba(79, 93, 56, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: '#FFFFFF',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: '#EAEFE4',
                color: '#3A4828',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ShoppingBag style={{ width: '18px', height: '18px' }} />
            </div>
            <div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 'bold', color: '#1B2E1E', margin: 0 }}>
                Shopping Cart
              </h3>
              <span style={{ fontSize: '0.8rem', color: '#667761', fontWeight: '500' }}>
                {totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'} in your bag
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            aria-label="Close Cart"
            style={{
              background: '#F0EFEA',
              border: 'none',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#334024',
            }}
          >
            <X style={{ width: '20px', height: '20px' }} />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div
          style={{
            padding: '0.85rem 1.5rem',
            background: isFreeShipping ? '#EBF5E9' : '#F4F1EB',
            borderBottom: '1px solid rgba(79, 93, 56, 0.1)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
            <Truck style={{ width: '16px', height: '16px', color: isFreeShipping ? '#2D6A4F' : '#6A7B52' }} />
            <span style={{ fontSize: '0.82rem', fontWeight: '700', color: isFreeShipping ? '#2D6A4F' : '#3A4828' }}>
              {isFreeShipping ? (
                '🎉 Congratulations! You unlocked FREE Delivery Across Pakistan!'
              ) : (
                <>
                  Add <strong>Rs. {amountToFreeShipping.toLocaleString()}</strong> more for <strong>FREE Delivery</strong>
                </>
              )}
            </span>
          </div>

          {/* Progress bar line */}
          <div
            style={{
              width: '100%',
              height: '6px',
              background: 'rgba(0,0,0,0.08)',
              borderRadius: '999px',
              overflow: 'hidden',
            }}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${freeShippingProgress}%` }}
              transition={{ duration: 0.5 }}
              style={{
                height: '100%',
                background: isFreeShipping ? '#2D6A4F' : '#4F5D38',
                borderRadius: '999px',
              }}
            />
          </div>
        </div>

        {/* Cart Content (Scrollable) */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3.5rem 1rem', color: '#7A8C74' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: '#EAEFE4',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.25rem',
                  color: '#4F5D38',
                }}
              >
                <ShoppingBag style={{ width: '32px', height: '32px' }} />
              </div>
              <h4 style={{ fontSize: '1.15rem', fontWeight: 'bold', color: '#2A361E', marginBottom: '0.4rem' }}>
                Your cart is empty
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#6A7B52', maxWidth: '280px', margin: '0 auto 1.5rem' }}>
                Restore and nourish your hair with 100% cold-pressed organic oil.
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  addToCart({
                    id: '200ml',
                    name: 'Veelana 200ml Bottle',
                    subtitle: 'Value Pack',
                    price: 1899,
                    originalPrice: 'Rs. 2,450',
                    image: '/assets/real_250ml_single.webp',
                  });
                }}
                className="btn-olive"
                style={{ padding: '0.75rem 1.5rem', fontSize: '0.88rem', margin: '0 auto' }}
              >
                Add 200ml Bottle (Rs. 1,899)
              </button>
            </div>
          ) : (
            <>
              {/* Items List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      display: 'flex',
                      gap: '0.85rem',
                      padding: '0.85rem',
                      background: '#FFFFFF',
                      borderRadius: '12px',
                      border: '1px solid rgba(79, 93, 56, 0.12)',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                    }}
                  >
                    {/* Item Thumbnail */}
                    <div
                      style={{
                        width: '65px',
                        height: '65px',
                        borderRadius: '8px',
                        background: '#F5F3ED',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        overflow: 'hidden',
                        padding: '4px',
                      }}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                        onError={(e) => { e.target.src = '/assets/real_100ml_double.webp'; }}
                      />
                    </div>

                    {/* Item Info & Actions */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                          <h4 style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#1B2E1E', margin: 0, lineHeight: 1.25 }}>
                            {item.name}
                          </h4>
                          {item.subtitle && (
                            <span style={{ fontSize: '0.75rem', color: '#6A7B52', display: 'block', marginTop: '2px' }}>
                              {item.subtitle}
                            </span>
                          )}
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          aria-label="Remove item"
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#A09E96',
                            cursor: 'pointer',
                            padding: '2px',
                            transition: 'color 0.2s',
                          }}
                          onMouseEnter={(e) => (e.target.style.color = '#B91C1C')}
                          onMouseLeave={(e) => (e.target.style.color = '#A09E96')}
                        >
                          <Trash2 style={{ width: '16px', height: '16px' }} />
                        </button>
                      </div>

                      {/* Quantity & Price Row */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                        {/* +/- Buttons */}
                        <div
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            border: '1px solid rgba(79, 93, 56, 0.2)',
                            borderRadius: '8px',
                            background: '#FAF8F5',
                            overflow: 'hidden',
                          }}
                        >
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            style={{
                              border: 'none',
                              background: 'none',
                              padding: '4px 8px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#3A4828',
                            }}
                          >
                            <Minus style={{ width: '12px', height: '12px' }} />
                          </button>
                          <span style={{ padding: '0 8px', fontSize: '0.85rem', fontWeight: '700', color: '#1B2E1E', minWidth: '24px', textAlign: 'center' }}>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            style={{
                              border: 'none',
                              background: 'none',
                              padding: '4px 8px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#3A4828',
                            }}
                          >
                            <Plus style={{ width: '12px', height: '12px' }} />
                          </button>
                        </div>

                        {/* Price */}
                        <div style={{ textAlign: 'right' }}>
                          <span style={{ fontSize: '0.95rem', fontWeight: '800', color: '#1B2E1E' }}>
                            Rs. {(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Upsell Comb Offer */}
              {!hasNeemComb && (
                <div
                  style={{
                    background: '#F4EFEB',
                    border: '1px dashed #A89F91',
                    borderRadius: '12px',
                    padding: '0.85rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '0.75rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '6px',
                        background: '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#705436',
                        fontSize: '18px',
                      }}
                    >
                      🌿
                    </div>
                    <div>
                      <span style={{ fontSize: '0.82rem', fontWeight: 'bold', color: '#2A361E', display: 'block' }}>
                        Add Organic Neem Comb
                      </span>
                      <span style={{ fontSize: '0.75rem', color: '#705436', fontWeight: '600' }}>
                        Special Offer: Rs. 399 <span style={{ textDecoration: 'line-through', color: '#A09E96' }}>Rs. 650</span>
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleAddUpsellComb}
                    style={{
                      background: '#4F5D38',
                      color: '#FAF8F5',
                      border: 'none',
                      padding: '5px 10px',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      fontWeight: '700',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <Plus style={{ width: '12px', height: '12px' }} />
                    Add
                  </button>
                </div>
              )}

              {/* Coupon Code Section */}
              <div
                style={{
                  background: '#FFFFFF',
                  borderRadius: '12px',
                  padding: '0.85rem',
                  border: '1px solid rgba(79, 93, 56, 0.12)',
                }}
              >
                {coupon ? (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Tag style={{ width: '16px', height: '16px', color: '#2D6A4F' }} />
                      <div>
                        <span style={{ fontSize: '0.82rem', fontWeight: '700', color: '#2D6A4F' }}>
                          {coupon.code} ({coupon.description})
                        </span>
                        <span style={{ fontSize: '0.75rem', color: '#6A7B52', display: 'block' }}>
                          Saved Rs. {discountAmount.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={removeCoupon}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#B91C1C',
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        cursor: 'pointer',
                      }}
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '0.5rem' }}>
                    <input
                      type="text"
                      placeholder="Discount Code (e.g. SAVE10)"
                      value={couponCodeInput}
                      onChange={(e) => setCouponCodeInput(e.target.value)}
                      style={{
                        flex: 1,
                        padding: '0.45rem 0.75rem',
                        fontSize: '0.82rem',
                        borderRadius: '6px',
                        border: '1px solid #D0C9BA',
                        background: '#FAF8F5',
                        outline: 'none',
                      }}
                    />
                    <button
                      type="submit"
                      style={{
                        background: '#3A4828',
                        color: '#FFFFFF',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '0.45rem 0.9rem',
                        fontSize: '0.8rem',
                        fontWeight: '700',
                        cursor: 'pointer',
                      }}
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponMsg.text && (
                  <span
                    style={{
                      fontSize: '0.75rem',
                      display: 'block',
                      marginTop: '0.4rem',
                      color: couponMsg.isError ? '#B91C1C' : '#2D6A4F',
                      fontWeight: '600',
                    }}
                  >
                    {couponMsg.text}
                  </span>
                )}
              </div>
            </>
          )}
        </div>

        {/* Drawer Footer (Summary & Checkout Button) */}
        {cartItems.length > 0 && (
          <div
            style={{
              padding: '1.25rem 1.5rem',
              background: '#FFFFFF',
              borderTop: '1px solid rgba(79, 93, 56, 0.15)',
              boxShadow: '0 -4px 16px rgba(0,0,0,0.04)',
            }}
          >
            {/* Price Calculations Breakdown */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1rem', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#5A6B53' }}>
                <span>Subtotal</span>
                <span>Rs. {subtotal.toLocaleString()}</span>
              </div>

              {discountAmount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#2D6A4F', fontWeight: '600' }}>
                  <span>Discount ({coupon?.code})</span>
                  <span>- Rs. {discountAmount.toLocaleString()}</span>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#5A6B53' }}>
                <span>Nationwide Shipping</span>
                <span>
                  {isFreeShipping ? (
                    <strong style={{ color: '#2D6A4F' }}>FREE</strong>
                  ) : (
                    `Rs. ${shippingFee.toLocaleString()}`
                  )}
                </span>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  color: '#1B2E1E',
                  fontSize: '1.15rem',
                  fontWeight: '800',
                  paddingTop: '0.5rem',
                  borderTop: '1px dashed rgba(79, 93, 56, 0.2)',
                  marginTop: '0.2rem',
                }}
              >
                <span>Total Amount</span>
                <span>Rs. {finalTotal.toLocaleString()}</span>
              </div>
            </div>

            {/* Checkout CTA Button */}
            <button
              onClick={() => {
                setIsCartOpen(false);
                if (onCheckout) onCheckout();
              }}
              className="btn-olive"
              style={{
                width: '100%',
                padding: '0.95rem',
                fontSize: '0.95rem',
                fontWeight: '700',
                justifyContent: 'center',
                cursor: 'pointer',
                borderRadius: '10px',
              }}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight style={{ width: '18px', height: '18px' }} />
            </button>

            {/* Trust Footnote */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginTop: '0.75rem', fontSize: '0.72rem', color: '#73836E' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                <ShieldCheck style={{ width: '13px', height: '13px', color: '#4F5D38' }} /> 100% Cold-Pressed
              </span>
              <span>•</span>
              <span>Cash on Delivery (COD)</span>
              <span>•</span>
              <span>7-Day Return</span>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
