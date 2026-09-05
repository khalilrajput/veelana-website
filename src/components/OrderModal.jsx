import React, { useState, useEffect } from 'react';
import { X, CheckCircle, ShoppingBag, Truck, ShieldCheck, MessageCircle, CreditCard, Send, MapPin, Phone, User, Copy, Check, Clock, PackageCheck, AlertTriangle, Building, Navigation } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { createOrder, formatWhatsAppOrderMessage, formatEmailOrderMailto } from '../services/orderService';
import { normalizePakistanPhone } from '../services/firebase';
import { useCart } from '../context/CartContext';

const PAKISTAN_PROVINCES = [
  { id: 'Punjab', name: 'Punjab (Express 1-2 Days)', eta: '1-2 Working Days' },
  { id: 'Islamabad', name: 'Islamabad / Rawalpindi (1-2 Days)', eta: '1-2 Working Days' },
  { id: 'Sindh', name: 'Sindh (2-3 Days)', eta: '2-3 Working Days' },
  { id: 'KPK', name: 'Khyber Pakhtunkhwa - KPK (2-3 Days)', eta: '2-3 Working Days' },
  { id: 'Balochistan', name: 'Balochistan (3-4 Days)', eta: '3-4 Working Days' },
  { id: 'AJK', name: 'Azad Kashmir - AJK (2-3 Days)', eta: '2-3 Working Days' },
  { id: 'GB', name: 'Gilgit-Baltistan (3-4 Days)', eta: '3-4 Working Days' },
];

const POPULAR_CITIES = [
  'Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Faisalabad', 
  'Multan', 'Peshawar', 'Gujranwala', 'Sialkot', 'Hyderabad', 
  'Quetta', 'Bahawalpur', 'Sargodha', 'Abbottabad', 'Gujrat',
  'Sheikhupura', 'Jhelum', 'Rahim Yar Khan', 'Sahiwal', 'Mardan'
];

export default function OrderModal({ isOpen, onClose, initialProduct = null }) {
  const { cartItems, clearCart, coupon, discountAmount, shippingFee, finalTotal, subtotal } = useCart();

  const [paymentMethod, setPaymentMethod] = useState('COD'); // 'COD', 'JazzCash', 'EasyPaisa'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedOrder, setSubmittedOrder] = useState(null);
  const [copiedId, setCopiedId] = useState(false);

  // Form Fields - Pakistan Specific Smart Address System
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    province: 'Punjab',
    city: 'Lahore',
    area: '',
    houseStreet: '',
    landmark: '',
    notes: ''
  });

  const [phoneValidation, setPhoneValidation] = useState({ isValid: true, display: '' });
  const [formError, setFormError] = useState('');

  // Determine items to checkout
  const isDirectSingleItem = initialProduct && (!cartItems || cartItems.length === 0);

  const getDirectProduct = () => {
    if (initialProduct === '100ml') {
      return { id: '100ml', name: 'Veelana 100ml Bottle', subtitle: 'Standard Starter Pack', price: 999, originalPrice: '' };
    }
    if (initialProduct === 'twin-pack-200ml') {
      return { id: 'twin-pack-200ml', name: 'Veelana Twin Pack (2x 200ml)', subtitle: 'Special Offer: 2 Bottles for Rs. 3,499', price: 3499, originalPrice: 'Rs. 4,900' };
    }
    if (initialProduct === 'family-pack') {
      return { id: 'family-pack', name: 'Family Hair Rescue Bundle', subtitle: '200ml + 100ml Kit', price: 2699, originalPrice: '' };
    }
    return { id: '200ml', name: 'Veelana 200ml Bottle', subtitle: 'Special Offer: 1 Bottle for Rs. 1,899', price: 1899, originalPrice: 'Rs. 2,450' };
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

  // Selected Province ETA calculation
  const selectedProvinceMeta = PAKISTAN_PROVINCES.find(p => p.id === formData.province) || PAKISTAN_PROVINCES[0];

  useEffect(() => {
    if (isOpen) {
      setSubmittedOrder(null);
      setFormError('');
    }
  }, [isOpen]);

  const handlePhoneChange = (val) => {
    setFormData(prev => ({ ...prev, phone: val }));
    const result = normalizePakistanPhone(val);
    setPhoneValidation(result);
  };

  if (!isOpen) return null;

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    if (!formData.fullName.trim()) {
      setFormError('Please enter your full name.');
      return;
    }

    const phoneCheck = normalizePakistanPhone(formData.phone);
    if (!formData.phone.trim() || !phoneCheck.isValid) {
      setFormError('Please enter a valid 11-digit Pakistani mobile number (e.g. 0300 1234567 or 0306 1041609).');
      return;
    }

    if (!formData.city.trim()) {
      setFormError('Please select or enter your city.');
      return;
    }

    if (!formData.houseStreet.trim() && !formData.area.trim()) {
      setFormError('Please enter your House/Street and Area/Society name.');
      return;
    }

    setIsSubmitting(true);
    setFormError('');

    try {
      const orderPayload = {
        fullName: formData.fullName.trim(),
        phone: formData.phone.trim(),
        province: formData.province,
        city: formData.city.trim(),
        area: formData.area.trim(),
        houseStreet: formData.houseStreet.trim(),
        landmark: formData.landmark.trim(),
        notes: formData.notes.trim(),
        paymentMethod,
        items: checkoutItems,
        subtotal: currentSubtotal,
        shippingFee: currentShipping,
        discountAmount: currentDiscount,
        couponCode: coupon?.code || '',
        totalAmount: currentTotal,
        totalPrice: `Rs. ${currentTotal.toLocaleString()}`,
        eta: selectedProvinceMeta.eta,
      };

      const saved = createOrder(orderPayload);
      if (saved) {
        setSubmittedOrder(saved);
        clearCart();
        
        // Trigger celebration confetti
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#4F5D38', '#8A9A86', '#D4AF37', '#1B2E1E']
          });
        } catch (err) {
          // fallback
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

  const copyOrderId = () => {
    if (!submittedOrder) return;
    navigator.clipboard.writeText(submittedOrder.id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2500);
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
          maxWidth: '580px',
          background: '#FAF8F5',
          borderRadius: '20px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.25)',
          overflow: 'hidden',
          zIndex: 100000,
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Modal Top Header */}
        <div
          style={{
            padding: '1.15rem 1.5rem',
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
              {submittedOrder ? 'Order Placed Successfully!' : 'Express Delivery Checkout (COD)'}
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
                <PackageCheck style={{ width: '38px', height: '38px' }} />
              </div>

              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 'bold', color: '#1B2E1E', margin: '0 0 0.4rem' }}>
                Shukriya, {submittedOrder.fullName}!
              </h4>
              <p style={{ fontSize: '0.88rem', color: '#5A6B53', maxWidth: '420px', margin: '0 auto 1.5rem', lineHeight: '1.5' }}>
                Aapka order receive ho chuka hai. Hamari team parcel pack kar ke express courier ke zariye rawana karegi.
              </p>

              {/* Order Details Card */}
              <div
                style={{
                  background: '#FFFFFF',
                  borderRadius: '16px',
                  border: '1px solid rgba(79, 93, 56, 0.18)',
                  padding: '1.25rem',
                  textAlign: 'left',
                  marginBottom: '1.5rem',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ECE7DD', paddingBottom: '0.75rem', marginBottom: '0.75rem' }}>
                  <div>
                    <span style={{ fontSize: '0.72rem', color: '#73836E', textTransform: 'uppercase', fontWeight: 'bold' }}>Order Reference</span>
                    <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#1B2E1E' }}>#{submittedOrder.id}</div>
                  </div>
                  <button
                    onClick={copyOrderId}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '0.75rem',
                      background: '#FAF8F5',
                      border: '1px solid #D6D0C2',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      color: '#2A361E',
                    }}
                  >
                    {copiedId ? <Check style={{ width: '13px', height: '13px', color: '#2D6A4F' }} /> : <Copy style={{ width: '13px', height: '13px' }} />}
                    <span>{copiedId ? 'Copied!' : 'Copy ID'}</span>
                  </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.82rem', marginBottom: '0.75rem' }}>
                  <div>
                    <span style={{ color: '#73836E', display: 'block' }}>Payment Method:</span>
                    <strong style={{ color: '#1B2E1E' }}>Cash on Delivery (COD)</strong>
                  </div>
                  <div>
                    <span style={{ color: '#73836E', display: 'block' }}>Total Amount:</span>
                    <strong style={{ color: '#1B2E1E', fontSize: '0.95rem' }}>{submittedOrder.totalPrice || `Rs. ${submittedOrder.totalAmount}`}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#73836E', display: 'block' }}>Delivery Destination:</span>
                    <strong style={{ color: '#1B2E1E' }}>{submittedOrder.city}, {submittedOrder.province || 'Pakistan'}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#73836E', display: 'block' }}>Estimated Arrival:</span>
                    <strong style={{ color: '#2D6A4F' }}>{submittedOrder.eta || '2-3 Working Days'}</strong>
                  </div>
                </div>

                <div style={{ fontSize: '0.78rem', color: '#5A6B53', background: '#FAF8F5', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid #ECE7DD' }}>
                  <strong>Delivery Address:</strong> {submittedOrder.address}
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
                    width: '100%',
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
                  borderRadius: '14px',
                  border: '1px solid rgba(79, 93, 56, 0.15)',
                  padding: '0.95rem 1.15rem',
                  marginBottom: '1.25rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#6A7B52', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                    Order Summary:
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#2D6A4F', fontWeight: 'bold', background: '#ECFDF5', padding: '2px 8px', borderRadius: '4px' }}>
                    🚚 {selectedProvinceMeta.eta}
                  </span>
                </div>
                
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
                  <span style={{ fontWeight: '700', color: '#2A361E' }}>Total Payable (Cash on Delivery):</span>
                  <span style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1B2E1E' }}>
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
                      onChange={(e) => handlePhoneChange(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.75rem 0.65rem 2.3rem',
                        fontSize: '0.88rem',
                        borderRadius: '8px',
                        border: phoneValidation.isValid ? '1px solid #D1CAC0' : '1px solid #EF4444',
                        background: '#FFFFFF',
                        outline: 'none',
                      }}
                    />
                  </div>
                  <span style={{ fontSize: '0.72rem', color: '#6A7B52', marginTop: '2px', display: 'block' }}>
                    Courier rider will call you on this number before delivery.
                  </span>
                </div>

                {/* Province & City Row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  {/* Province Selector */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#2A361E', marginBottom: '0.3rem' }}>
                      Province / Region *
                    </label>
                    <select
                      value={formData.province}
                      onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.75rem',
                        fontSize: '0.85rem',
                        borderRadius: '8px',
                        border: '1px solid #D1CAC0',
                        background: '#FFFFFF',
                        outline: 'none',
                        fontWeight: '600',
                      }}
                    >
                      {PAKISTAN_PROVINCES.map((p) => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* City Selector / Input */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#2A361E', marginBottom: '0.3rem' }}>
                      City *
                    </label>
                    <input
                      type="text"
                      list="pakistan-cities"
                      required
                      placeholder="e.g. Lahore, Karachi, Rawalpindi"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.75rem',
                        fontSize: '0.85rem',
                        borderRadius: '8px',
                        border: '1px solid #D1CAC0',
                        background: '#FFFFFF',
                        outline: 'none',
                      }}
                    />
                    <datalist id="pakistan-cities">
                      {POPULAR_CITIES.map(c => (
                        <option key={c} value={c} />
                      ))}
                    </datalist>
                  </div>
                </div>

                {/* Area & Society */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#2A361E', marginBottom: '0.3rem' }}>
                    Area / Town / Sector / Society *
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Building style={{ position: 'absolute', left: '12px', top: '11px', width: '16px', height: '16px', color: '#7A8C74' }} />
                    <input
                      type="text"
                      required
                      placeholder="e.g. DHA Phase 5, Gulberg III, Model Town, F-10"
                      value={formData.area}
                      onChange={(e) => setFormData({ ...formData, area: e.target.value })}
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

                {/* House & Street */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#2A361E', marginBottom: '0.3rem' }}>
                    House / Flat No. & Street Details *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. House # 14-B, Street # 6, Lane 2"
                    value={formData.houseStreet}
                    onChange={(e) => setFormData({ ...formData, houseStreet: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.75rem',
                      fontSize: '0.88rem',
                      borderRadius: '8px',
                      border: '1px solid #D1CAC0',
                      background: '#FFFFFF',
                      outline: 'none',
                    }}
                  />
                </div>

                {/* Famous Nearest Landmark (Vital for 95%+ COD Delivery Success) */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#2A361E', marginBottom: '0.3rem' }}>
                    Nearest Famous Landmark (Masjid, Chowk, Market) *
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Navigation style={{ position: 'absolute', left: '12px', top: '11px', width: '16px', height: '16px', color: '#7A8C74' }} />
                    <input
                      type="text"
                      placeholder="e.g. Near Bilal Masjid / Opposite Shell Pump / Main Chowk"
                      value={formData.landmark}
                      onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
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
                    Helps the courier rider locate your house without delivery delays.
                  </span>
                </div>

                {/* Payment Option Selector */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#2A361E', marginBottom: '0.3rem' }}>
                    Payment Method
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('COD')}
                      style={{
                        padding: '0.65rem 0.75rem',
                        borderRadius: '8px',
                        border: paymentMethod === 'COD' ? '2px solid #1B2E1E' : '1px solid #D1CAC0',
                        background: paymentMethod === 'COD' ? '#EAEFE4' : '#FFFFFF',
                        color: '#1B2E1E',
                        fontWeight: '700',
                        fontSize: '0.82rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                      }}
                    >
                      <Truck style={{ width: '16px', height: '16px' }} />
                      <span>Cash on Delivery</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('JazzCash / EasyPaisa')}
                      style={{
                        padding: '0.65rem 0.75rem',
                        borderRadius: '8px',
                        border: paymentMethod === 'JazzCash / EasyPaisa' ? '2px solid #1B2E1E' : '1px solid #D1CAC0',
                        background: paymentMethod === 'JazzCash / EasyPaisa' ? '#EAEFE4' : '#FFFFFF',
                        color: '#1B2E1E',
                        fontWeight: '700',
                        fontSize: '0.82rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                      }}
                    >
                      <CreditCard style={{ width: '16px', height: '16px' }} />
                      <span>JazzCash / EasyPaisa</span>
                    </button>
                  </div>
                </div>

                {/* Delivery Notes */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#2A361E', marginBottom: '0.3rem' }}>
                    Special Delivery Instructions (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Please call before arriving or deliver after 2 PM"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.55rem 0.75rem',
                      fontSize: '0.82rem',
                      borderRadius: '8px',
                      border: '1px solid #D1CAC0',
                      background: '#FFFFFF',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              {/* Error Message */}
              {formError && (
                <div style={{ marginTop: '0.75rem', padding: '0.6rem 0.85rem', borderRadius: '8px', background: '#FEE2E2', border: '1px solid #FCA5A5', color: '#B91C1C', fontSize: '0.82rem', fontWeight: '600' }}>
                  {formError}
                </div>
              )}

              {/* Anti-Fake COD Disclaimer */}
              <div style={{ marginTop: '1rem', padding: '0.6rem 0.85rem', background: '#F0ECE4', borderRadius: '8px', fontSize: '0.75rem', color: '#5A6B53', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ShieldCheck style={{ width: '16px', height: '16px', color: '#2D6A4F', flexShrink: 0 }} />
                <span>100% Guaranteed fresh botanical oil. Pay cash to the courier rider upon delivery.</span>
              </div>

              {/* Submit Order Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-olive"
                style={{
                  width: '100%',
                  padding: '0.95rem',
                  fontSize: '0.95rem',
                  fontWeight: 'bold',
                  justifyContent: 'center',
                  borderRadius: '10px',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  marginTop: '1rem',
                  opacity: isSubmitting ? 0.7 : 1,
                  boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
                }}
              >
                <span>{isSubmitting ? 'Processing Order...' : `Confirm Order (Rs. ${currentTotal.toLocaleString()} COD)`}</span>
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
