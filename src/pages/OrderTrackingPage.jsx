import React, { useState } from 'react';
import { Search, Package, Truck, CheckCircle2, Clock, MapPin, Phone, MessageCircle, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { findOrder, getOrders } from '../services/orderService';
import { getWhatsAppUrl } from '../utils/whatsapp';

export default function OrderTrackingPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searched, setSearched] = useState(false);
  const [foundOrder, setFoundOrder] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    const result = findOrder(searchQuery);
    setFoundOrder(result);
    setSearched(true);
  };

  const loadSampleOrder = () => {
    const orders = getOrders();
    if (orders.length > 0) {
      setFoundOrder(orders[0]);
      setSearchQuery(orders[0].id);
      setSearched(true);
    } else {
      // Dummy demo order
      setFoundOrder({
        id: 'VLN-84920',
        createdAt: new Date().toISOString(),
        fullName: 'Muhammad Bilal',
        phone: '0306 1041609',
        city: 'Lahore',
        address: 'House #14, Street 3, DHA Phase 5',
        status: 'Dispatched',
        totalPrice: 'Rs. 1,899',
        paymentMethod: 'COD',
        trackingNumber: 'TRX-849201PK',
        courierPartner: 'Trax / Leopard Logistics Express',
        items: [
          { name: 'Veelana 200ml Bottle', quantity: 1, price: 1899 }
        ]
      });
      setSearchQuery('VLN-84920');
      setSearched(true);
    }
  };

  // Status step calculations
  const getStatusStep = (status) => {
    switch ((status || '').toLowerCase()) {
      case 'pending': return 1;
      case 'confirmed': return 2;
      case 'dispatched': return 3;
      case 'delivered': return 4;
      default: return 1;
    }
  };

  const currentStep = foundOrder ? getStatusStep(foundOrder.status) : 1;

  const steps = [
    { num: 1, title: 'Order Placed', desc: 'Registered in Production Hub' },
    { num: 2, title: 'COD Confirmed', desc: 'Quality checked & packed' },
    { num: 3, title: 'Dispatched', desc: 'Handed to Courier Partner' },
    { num: 4, title: 'Delivered', desc: 'Arrived at your doorstep' },
  ];

  return (
    <div style={{ minHeight: '80vh', padding: '3rem 1rem 5rem', background: '#FAF8F5' }}>
      <div className="container" style={{ maxWidth: '780px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#EAEFE4', color: '#3A4828', padding: '6px 16px', borderRadius: '999px', fontSize: '0.82rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>
            <Package style={{ width: '15px', height: '15px' }} />
            Nationwide Dispatch Tracking
          </span>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: 'bold', color: '#1B2E1E', margin: '0.75rem 0 0.5rem' }}>
            Track Your Veelana Order
          </h1>
          <p style={{ fontSize: '1rem', color: '#5F7057', maxWidth: '520px', margin: '0 auto' }}>
            Enter your Order ID (e.g. <code style={{ background: '#E8E3D7', padding: '2px 6px', borderRadius: '4px', color: '#1B2E1E' }}>VLN-XXXXX</code>) or the WhatsApp number you used during checkout.
          </p>
        </div>

        {/* Search Input Box */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '16px',
            padding: '1.25rem',
            boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
            border: '1px solid rgba(79, 93, 56, 0.15)',
            marginBottom: '2rem',
          }}
        >
          <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', flex: '1 1 260px' }}>
              <Search style={{ position: 'absolute', left: '14px', top: '14px', width: '18px', height: '18px', color: '#73836E' }} />
              <input
                type="text"
                placeholder="Enter Order ID or WhatsApp Number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem 0.75rem 2.6rem',
                  fontSize: '0.95rem',
                  borderRadius: '10px',
                  border: '1px solid #D6D0C2',
                  background: '#FAF8F5',
                  outline: 'none',
                }}
              />
            </div>

            <button
              type="submit"
              className="btn-olive"
              style={{
                padding: '0.75rem 1.75rem',
                fontSize: '0.95rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                borderRadius: '10px',
                flexShrink: 0,
              }}
            >
              <span>Track Now</span>
              <ArrowRight style={{ width: '16px', height: '16px' }} />
            </button>
          </form>

          {/* Quick Demo Lookup Helper */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.85rem', fontSize: '0.78rem', color: '#788970' }}>
            <span>Need instant demo?</span>
            <button
              onClick={loadSampleOrder}
              style={{ background: 'none', border: 'none', color: '#4F5D38', textDecoration: 'underline', cursor: 'pointer', fontWeight: 'bold' }}
            >
              Load Most Recent / Sample Order
            </button>
          </div>
        </div>

        {/* Tracking Results Card */}
        {searched && (
          <div>
            {foundOrder ? (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '16px',
                  border: '1px solid rgba(79, 93, 56, 0.15)',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
                  overflow: 'hidden',
                }}
              >
                {/* Header of Order Card */}
                <div style={{ padding: '1.25rem 1.5rem', background: '#1B2E1E', color: '#FFFFFF', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: '#A0B195', textTransform: 'uppercase', letterSpacing: '1px' }}>
                      ORDER REFERENCE
                    </span>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: '2px 0 0' }}>
                      #{foundOrder.id}
                    </h3>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '4px 12px',
                        borderRadius: '999px',
                        fontSize: '0.8rem',
                        fontWeight: 'bold',
                        background: foundOrder.status === 'Delivered' ? '#2D6A4F' : '#4F5D38',
                        color: '#FAF8F5',
                      }}
                    >
                      {foundOrder.status ? foundOrder.status.toUpperCase() : 'PENDING'}
                    </span>
                    <span style={{ display: 'block', fontSize: '0.72rem', color: '#CCD6C5', marginTop: '3px' }}>
                      {new Date(foundOrder.createdAt).toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                </div>

                {/* Progress Steps Visualizer */}
                <div style={{ padding: '2rem 1.5rem', borderBottom: '1px solid rgba(79, 93, 56, 0.1)' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', position: 'relative' }}>
                    {steps.map((step) => {
                      const isComplete = currentStep >= step.num;
                      const isCurrent = currentStep === step.num;

                      return (
                        <div key={step.num} style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
                          <div
                            style={{
                              width: '38px',
                              height: '38px',
                              borderRadius: '50%',
                              background: isComplete ? '#2D6A4F' : '#E8E4DA',
                              color: isComplete ? '#FFFFFF' : '#7A8C74',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              margin: '0 auto 0.5rem',
                              fontWeight: 'bold',
                              fontSize: '0.9rem',
                              border: isCurrent ? '3px solid #8FA876' : 'none',
                            }}
                          >
                            {isComplete && step.num < currentStep ? (
                              <CheckCircle2 style={{ width: '20px', height: '20px' }} />
                            ) : (
                              step.num
                            )}
                          </div>
                          <h4 style={{ fontSize: '0.82rem', fontWeight: 'bold', color: isComplete ? '#1B2E1E' : '#8A9984', margin: '0 0 2px' }}>
                            {step.title}
                          </h4>
                          <span style={{ fontSize: '0.7rem', color: '#73836E', display: 'block', lineHeight: 1.2 }}>
                            {step.desc}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Detailed Information Rows */}
                <div style={{ padding: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
                  {/* Customer & Address */}
                  <div>
                    <h5 style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: '#73836E', letterSpacing: '0.8px', marginBottom: '0.5rem' }}>
                      Delivery Details
                    </h5>
                    <div style={{ fontSize: '0.88rem', color: '#2A361E', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                      <strong>{foundOrder.fullName}</strong>
                      <span style={{ color: '#5A6B53' }}>{foundOrder.address}</span>
                      <span style={{ fontWeight: '600' }}>{foundOrder.city}, Pakistan</span>
                      <span style={{ color: '#5A6B53' }}>Phone: {foundOrder.phone}</span>
                    </div>
                  </div>

                  {/* Courier & Payment Info */}
                  <div>
                    <h5 style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: '#73836E', letterSpacing: '0.8px', marginBottom: '0.5rem' }}>
                      Dispatch & Logistics
                    </h5>
                    <div style={{ fontSize: '0.88rem', color: '#2A361E', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                      <div>
                        <strong>Courier:</strong> {foundOrder.courierPartner || 'Trax Express Logistics'}
                      </div>
                      <div>
                        <strong>Tracking Ref:</strong> <code style={{ background: '#EFECE4', padding: '1px 5px', borderRadius: '4px' }}>{foundOrder.trackingNumber || 'Pending'}</code>
                      </div>
                      <div>
                        <strong>Payment:</strong> {foundOrder.paymentMethod || 'Cash on Delivery'}
                      </div>
                      <div>
                        <strong>Total:</strong> <strong style={{ color: '#1B2E1E' }}>{foundOrder.totalPrice || `Rs. ${foundOrder.totalAmount}`}</strong>
                      </div>
                    </div>
                  </div>
                </div>

                {/* WhatsApp Help CTA footer */}
                <div style={{ background: '#F8F6F0', padding: '1.25rem 1.5rem', borderTop: '1px solid rgba(79, 93, 56, 0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <ShieldCheck style={{ width: '20px', height: '20px', color: '#4F5D38' }} />
                    <span style={{ fontSize: '0.82rem', color: '#4F5D38' }}>
                      Have questions regarding dispatch or delivery time?
                    </span>
                  </div>

                  <a
                    href={getWhatsAppUrl(`Hi Veelana Team, I want to check my order status for Order #${foundOrder.id} (${foundOrder.fullName})`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-olive"
                    style={{
                      background: '#25D366',
                      borderColor: '#25D366',
                      padding: '0.55rem 1.25rem',
                      fontSize: '0.82rem',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                    }}
                  >
                    <MessageCircle style={{ width: '16px', height: '16px' }} />
                    <span>WhatsApp Support</span>
                  </a>
                </div>
              </motion.div>
            ) : (
              <div
                style={{
                  background: '#FFFFFF',
                  borderRadius: '16px',
                  padding: '2.5rem 1.5rem',
                  textAlign: 'center',
                  border: '1px solid rgba(79, 93, 56, 0.15)',
                }}
              >
                <AlertCircle style={{ width: '40px', height: '40px', color: '#D97706', margin: '0 auto 1rem' }} />
                <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#1B2E1E', marginBottom: '0.35rem' }}>
                  No Order Found for "{searchQuery}"
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#6A7B52', maxWidth: '420px', margin: '0 auto 1.5rem' }}>
                  Please check that you typed the full Order ID (e.g. VLN-12345) or the phone number without spaces.
                </p>
                <a
                  href={getWhatsAppUrl(`Hi Veelana Support, I could not find my order with query "${searchQuery}". Please assist me.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-olive"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.65rem 1.5rem', fontSize: '0.85rem' }}
                >
                  <MessageCircle style={{ width: '16px', height: '16px' }} />
                  <span>Ask Support on WhatsApp</span>
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
