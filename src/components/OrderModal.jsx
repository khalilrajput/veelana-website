import React, { useState, useEffect } from 'react';
import { X, CheckCircle, ShoppingBag, Truck, ShieldCheck, MessageCircle, CreditCard, Send, MapPin, Phone, User, Copy, Check, Clock, PackageCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { createOrder, formatWhatsAppOrderMessage, formatEmailOrderMailto } from '../services/orderService';
import { useCart } from '../context/CartContext';

export default function OrderModal({ isOpen, onClose, initialProduct = null }) {
  const { cartItems, clearCart, coupon, discountAmount, shippingFee, finalTotal, subtotal } = useCart();

  const [paymentMethod, setPaymentMethod] = useState('COD'); // 'COD', 'JazzCash', 'EasyPaisa'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedOrder, setSubmittedOrder] = useState(null);
  const [copiedId, setCopiedId] = useState(false);

  // Form Fields
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: 'Lahore',
    notes: ''
  });

  const [formError, setFormError] = useState('');

  // Determine items to checkout: If initialProduct is passed as single item and cart is empty, or if user is ordering cart
  const isDirectSingleItem = initialProduct && (!cartItems || cartItems.length === 0);

  const getDirectProduct = () => {
    if (initialProduct === '100ml') {
      return { id: '100ml', name: 'Veelana 100ml Bottle', subtitle: 'Handy / Starter Size', price: 999, originalPrice: 'Rs. 1,490' };
    }
    if (initialProduct === 'twin-pack-200ml') {
      return { id: 'twin-pack-200ml', name: 'Veelana Twin Pack (2x 200ml)', subtitle: '5-Month Growth Treatment', price: 3499, originalPrice: 'Rs. 4,900' };
    }
    if (initialProduct === 'family-pack') {
      return { id: 'family-pack', name: 'Family Hair Rescue Bundle', subtitle: '200ml + 100ml Kit', price: 2699, originalPrice: 'Rs. 3,940' };
    }
    return { id: '200ml', name: 'Veelana 200ml Bottle', subtitle: 'Value Pack (Recommended)', price: 1899, originalPrice: 'Rs. 2,450' };
  };

  const checkoutItems = isDirectSingleItem 
    ? [{ ...getDirectProduct(), quantity: 1, image: '/assets/real_250ml_single.webp' }]
    : (cartItems.length > 0 ? cartItems : [{ ...getDirectProduct(), quantity: 1, image: '/assets/real_250ml_single.webp' }]);

  const currentSubtotal = isDirectSingleItem 
    ? getDirectProduct().price 
    : subtotal;

  const currentShipping = isDirectSingleItem 
    ? (currentSubtotal >= 3000 ? 0 : 199) 
    : shippingFee;

  const currentDiscount = isDirectSingleItem ? 0 : discountAmount;
  const currentTotal = isDirectSingleItem 
    ? currentSubtotal + currentShipping 
    : finalTotal;

  useEffect(() => {
    if (isOpen) {
      setSubmittedOrder(null);
      setFormError('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    if (!formData.fullName.trim()) {
      setFormError('Please enter your full name.');
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      setFormError('Please enter a valid WhatsApp mobile number (e.g. 0306 1041609).');
      return;
    }
    if (!formData.address.trim()) {
      setFormError('Please enter your complete street address & house number.');
      return;
    }

    setIsSubmitting(true);
    setFormError('');

    try {
      const orderPayload = {
        fullName: formData.fullName.trim(),
        phone: formData.phone.trim(),
        city: formData.city.trim(),
        address: formData.address.trim(),
        notes: formData.notes.trim(),
        paymentMethod,
        items: checkoutItems,
        subtotal: currentSubtotal,
        shippingFee: currentShipping,
        discountAmount: currentDiscount,
        couponCode: coupon?.code || '',
        totalAmount: currentTotal,
        totalPrice: `Rs. ${currentTotal.toLocaleString()}`,
      };

      const saved = createOrder(orderPayload);
      if (saved) {
        setSubmittedOrder(saved);
        clearCart();
        
        // Trigger celebratory confetti
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#4F5D38', '#8A9A86', '#D4AF37', '#1B2E1E']
          });
        } catch (err) {
          // graceful fallback
        }
      } else {
        setFormError('Failed to record order. Please try direct WhatsApp.');
      }
    } catch (err) {
      console.error(err);
      setFormError('An error occurred. Please contact us on WhatsApp directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyOrderId = (id) => {
    navigator.clipboard.writeText(id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
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
        overflowY: 'auto',
      }}
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(18, 30, 20, 0.72)',
          backdropFilter: 'blur(5px)',
        }}
      />

      {/* Modal Container */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 15 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '560px',
          background: '#FAF8F5',
          borderRadius: '20px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.25)',
          overflow: 'hidden',
          zIndex: 100000,
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Modal Top Header */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            background: '#1B2E1E',
            color: '#FAF8F5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#A0B195', fontWeight: 'bold' }}>
              VEELANA OFFICIAL STORE • PAKISTAN
            </span>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 'bold', color: '#FFFFFF', margin: 0 }}>
              {submittedOrder ? 'Order Placed Successfully!' : 'Express Delivery Checkout'}
            </h3>
          </div>

          <button
            onClick={onClose}
            aria-label="Close Modal"
            style={{
              background: 'rgba(255,255,255,0.12)',
              border: 'none',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FAF8F5',
              cursor: 'pointer',
            }}
          >
            <X style={{ width: '20px', height: '20px' }} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
          {submittedOrder ? (
            /* SUCCESS CONFIRMATION SCREEN */
            <div style={{ textAlign: 'center', padding: '0.5rem 0' }}>
              <div
                style={{
                  width: '68px',
                  height: '68px',
                  borderRadius: '50%',
                  background: '#EAEFE4',
                  color: '#2D6A4F',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.25rem',
                }}
              >
                <CheckCircle style={{ width: '40px', height: '40px' }} />
              </div>

              <span style={{ background: '#EAEFE4', color: '#2D6A4F', padding: '4px 12px', borderRadius: '999px', fontSize: '0.78rem', fontWeight: 'bold' }}>
                STATUS: PENDING COD CONFIRMATION
              </span>

              <h4 style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#1B2E1E', margin: '0.85rem 0 0.35rem' }}>
                Thank You, {submittedOrder.fullName}!
              </h4>
              
              <p style={{ fontSize: '0.88rem', color: '#52634C', maxWidth: '420px', margin: '0 auto 1.25rem', lineHeight: 1.5 }}>
                Your order is registered. To ensure fast dispatch and avoid fake bookings, please confirm on WhatsApp.
              </p>

              {/* Order Reference Card */}
              <div
                style={{
                  background: '#FFFFFF',
                  borderRadius: '12px',
                  border: '1px solid rgba(79, 93, 56, 0.15)',
                  padding: '1rem',
                  marginBottom: '1.5rem',
                  textAlign: 'left',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ECE8DE', paddingBottom: '0.65rem', marginBottom: '0.65rem' }}>
                  <span style={{ fontSize: '0.8rem', color: '#73836E', fontWeight: '600' }}>Order Tracking ID:</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <strong style={{ fontSize: '0.95rem', color: '#1B2E1E' }}>#{submittedOrder.id}</strong>
                    <button
                      onClick={() => handleCopyOrderId(submittedOrder.id)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#4F5D38', padding: '2px' }}
                      title="Copy Order ID"
                    >
                      {copiedId ? <Check style={{ width: '16px', height: '16px', color: '#2D6A4F' }} /> : <Copy style={{ width: '16px', height: '16px' }} />}
                    </button>
                  </div>
                </div>

                <div style={{ fontSize: '0.82rem', color: '#4F5D38', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  <div><strong>Delivery To:</strong> {submittedOrder.address}, {submittedOrder.city}</div>
                  <div><strong>WhatsApp:</strong> {submittedOrder.phone}</div>
                  <div><strong>Total Amount:</strong> <span style={{ color: '#1B2E1E', fontWeight: '800' }}>{submittedOrder.totalPrice}</span> ({submittedOrder.paymentMethod})</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <a
                  href={formatWhatsAppOrderMessage(submittedOrder)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-olive"
                  style={{
                    background: '#25D366',
                    borderColor: '#25D366',
                    color: '#FFFFFF',
                    padding: '0.95rem',
                    fontSize: '0.95rem',
                    fontWeight: 'bold',
                    justifyContent: 'center',
                    borderRadius: '10px',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                >
                  <MessageCircle style={{ width: '20px', height: '20px' }} />
                  <span>Send Confirmation on WhatsApp</span>
                </a>

                <button
                  onClick={onClose}
                  style={{
                    background: '#EAEFE4',
                    color: '#2A361E',
                    border: 'none',
                    padding: '0.75rem',
                    borderRadius: '10px',
                    fontSize: '0.85rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                  }}
                >
                  Done & Continue Browsing
                </button>
              </div>
            </div>
          ) : (
            /* CHECKOUT FORM */
            <form onSubmit={handleSubmitOrder}>
              {/* Order Items Summary Box */}
              <div
                style={{
                  background: '#FFFFFF',
                  borderRadius: '12px',
                  border: '1px solid rgba(79, 93, 56, 0.15)',
                  padding: '0.95rem 1.15rem',
                  marginBottom: '1.25rem',
                }}
              >
                <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#6A7B52', textTransform: 'uppercase', letterSpacing: '0.8px', display: 'block', marginBottom: '0.5rem' }}>
                  Items in this order:
                </span>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {checkoutItems.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
                      <span style={{ color: '#1B2E1E', fontWeight: '600' }}>
                        {item.name} <span style={{ color: '#6A7B52' }}>x{item.quantity}</span>
                      </span>
                      <strong style={{ color: '#1B2E1E' }}>
                        Rs. {(item.price * item.quantity).toLocaleString()}
                      </strong>
                    </div>
                  ))}
                </div>

                <div
                  style={{
                    borderTop: '1px dashed #E0DCD3',
                    marginTop: '0.65rem',
                    paddingTop: '0.65rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '0.95rem',
                  }}
                >
                  <span style={{ fontWeight: '700', color: '#2A361E' }}>Total Payable (COD):</span>
                  <span style={{ fontSize: '1.15rem', fontWeight: '800', color: '#1B2E1E' }}>
                    Rs. {currentTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Form Input Fields */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {/* Full Name */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#2A361E', marginBottom: '0.3rem' }}>
                    Your Full Name *
                  </label>
                  <div style={{ position: 'relative' }}>
                    <User style={{ position: 'absolute', left: '12px', top: '11px', width: '16px', height: '16px', color: '#7A8C74' }} />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Muhammad Bilal"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.75rem 0.65rem 2.3rem',
                        fontSize: '0.88rem',
                        borderRadius: '8px',
                        border: '1px solid #D1CAC0',
                        background: '#FFFFFF',
                        outline: 'none',
                      }}
                    />
                  </div>
                </div>

                {/* Phone / WhatsApp */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#2A361E', marginBottom: '0.3rem' }}>
                    Active WhatsApp / Mobile Number *
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Phone style={{ position: 'absolute', left: '12px', top: '11px', width: '16px', height: '16px', color: '#7A8C74' }} />
                    <input
                      type="tel"
                      required
                      placeholder="0300 1234567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.75rem 0.65rem 2.3rem',
                        fontSize: '0.88rem',
                        borderRadius: '8px',
                        border: '1px solid #D1CAC0',
                        background: '#FFFFFF',
                        outline: 'none',
                      }}
                    />
                  </div>
                  <span style={{ fontSize: '0.72rem', color: '#6A7B52', marginTop: '2px', display: 'block' }}>
                    Courier rider will call/WhatsApp you on this number for delivery.
                  </span>
                </div>

                {/* City */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#2A361E', marginBottom: '0.3rem' }}>
                    City *
                  </label>
                  <div style={{ position: 'relative' }}>
                    <MapPin style={{ position: 'absolute', left: '12px', top: '11px', width: '16px', height: '16px', color: '#7A8C74' }} />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Lahore, Karachi, Islamabad, Faisalabad..."
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.75rem 0.65rem 2.3rem',
                        fontSize: '0.88rem',
                        borderRadius: '8px',
                        border: '1px solid #D1CAC0',
                        background: '#FFFFFF',
                        outline: 'none',
                      }}
                    />
                  </div>
                </div>

                {/* Complete Street Address */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#2A361E', marginBottom: '0.3rem' }}>
                    Complete Delivery Address (House/Street/Area) *
                  </label>
                  <textarea
                    required
                    rows={2}
                    placeholder="House #, Street name, Sector/Mohallah, Landmark..."
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.75rem',
                      fontSize: '0.88rem',
                      borderRadius: '8px',
                      border: '1px solid #D1CAC0',
                      background: '#FFFFFF',
                      outline: 'none',
                      resize: 'none',
                    }}
                  />
                </div>

                {/* Payment Method Selector */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#2A361E', marginBottom: '0.35rem' }}>
                    Select Payment Method
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('COD')}
                      style={{
                        padding: '0.65rem',
                        borderRadius: '8px',
                        border: paymentMethod === 'COD' ? '2px solid #2D6A4F' : '1px solid #D1CAC0',
                        background: paymentMethod === 'COD' ? '#EBF5E9' : '#FFFFFF',
                        color: paymentMethod === 'COD' ? '#2D6A4F' : '#334024',
                        fontWeight: '700',
                        fontSize: '0.82rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                      }}
                    >
                      <Truck style={{ width: '15px', height: '15px' }} />
                      <span>Cash on Delivery (COD)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('JazzCash / EasyPaisa')}
                      style={{
                        padding: '0.65rem',
                        borderRadius: '8px',
                        border: paymentMethod !== 'COD' ? '2px solid #2D6A4F' : '1px solid #D1CAC0',
                        background: paymentMethod !== 'COD' ? '#EBF5E9' : '#FFFFFF',
                        color: paymentMethod !== 'COD' ? '#2D6A4F' : '#334024',
                        fontWeight: '700',
                        fontSize: '0.82rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                      }}
                    >
                      <CreditCard style={{ width: '15px', height: '15px' }} />
                      <span>JazzCash / EasyPaisa</span>
                    </button>
                  </div>
                </div>

                {/* Anti-Fake Order / Return Loss Notice */}
                <div
                  style={{
                    background: '#F5F1E6',
                    border: '1px solid #DCD4C0',
                    borderRadius: '8px',
                    padding: '0.65rem 0.85rem',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.5rem',
                  }}
                >
                  <ShieldCheck style={{ width: '18px', height: '18px', color: '#4F5D38', flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ fontSize: '0.74rem', color: '#4E5A44', lineHeight: 1.4 }}>
                    <strong>100% Satisfaction Guarantee:</strong> Fresh cold-pressed oil dispatched within 24 hours. You only pay the courier rider upon package arrival.
                  </span>
                </div>

                {formError && (
                  <div style={{ color: '#B91C1C', fontSize: '0.8rem', fontWeight: '700', textAlign: 'center' }}>
                    {formError}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-olive"
                  style={{
                    width: '100%',
                    padding: '0.95rem',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    justifyContent: 'center',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    borderRadius: '10px',
                    marginTop: '0.35rem',
                  }}
                >
                  <PackageCheck style={{ width: '20px', height: '20px' }} />
                  <span>{isSubmitting ? 'Confirming Order...' : `Confirm Order — Rs. ${currentTotal.toLocaleString()}`}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
