import React, { useState } from 'react';
import { MapPin, Phone, Mail, Globe, MessageCircle, Clock, ShieldCheck, Send, Sparkles, User, HelpCircle, CheckCircle2 } from 'lucide-react';
import { getWhatsAppUrl } from '../utils/whatsapp';

const InstagramIcon = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const FacebookIcon = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const TikTokIcon = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-5.2-1.74 2.89 2.89 0 0 1 2.31-1.48V8.9a6.34 6.34 0 0 0-5.1 2.05 6.34 6.34 0 0 0 8.93 8.93 6.34 6.34 0 0 0 6.06-6.32V8.29a8.2 8.2 0 0 0 4.77 1.52V6.36a4.85 4.85 0 0 1-4.55-2.02v2.35z"/>
  </svg>
);

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    topic: 'Hair Fall Consultation',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    const messageText = `🌿 *NEW VEELANA WEBSITE INQUIRY*
--------------------------------
👤 *Name:* ${formData.name}
📞 *Phone:* ${formData.phone}
📌 *Topic:* ${formData.topic}
📝 *Message:* ${formData.message || 'No additional details.'}
--------------------------------
Please reply with guidance!`;

    const waLink = `https://wa.me/923061041609?text=${encodeURIComponent(messageText)}`;
    window.open(waLink, '_blank');
    setSubmitted(true);
  };

  return (
    <div style={{ minHeight: '85vh', padding: '3.5rem 1rem 6rem', background: '#FAF8F5' }}>
      <div className="container" style={{ maxWidth: '1080px', margin: '0 auto' }}>
        
        {/* Page Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="section-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#EAEFE4', color: '#3A4828', padding: '6px 16px', borderRadius: '999px', fontSize: '0.82rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.75rem' }}>
            <MessageCircle style={{ width: '15px', height: '15px', color: '#25D366' }} />
            <span>Official Client Desk</span>
          </div>

          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.8rem', fontWeight: 'bold', color: '#1B2E1E', margin: '0 0 0.75rem', lineHeight: 1.2 }}>
            Get in Touch with Veelana
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#5F7057', maxWidth: '620px', margin: '0 auto', lineHeight: 1.5 }}>
            Have a question regarding hair routine, ingredients, or order dispatch? Our specialists are available 6 days a week.
          </p>
        </div>

        {/* 2-Column Luxury Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', alignItems: 'stretch' }}>
          
          {/* Left Column: Direct Contact & Info Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            
            {/* Primary WhatsApp Card */}
            <div
              style={{
                background: 'linear-gradient(135deg, #1B2E1E 0%, #2A3E2E 100%)',
                color: '#FAF8F5',
                borderRadius: '20px',
                padding: '1.75rem',
                boxShadow: '0 10px 30px rgba(27, 46, 30, 0.15)',
                border: '1px solid rgba(255,255,255,0.1)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#A0B195', fontWeight: 'bold' }}>
                    FASTEST RESPONSE CHANNEL
                  </span>
                  <span style={{ background: '#25D366', color: '#FFFFFF', fontSize: '0.7rem', fontWeight: '800', padding: '3px 10px', borderRadius: '999px' }}>
                    ONLINE NOW
                  </span>
                </div>

                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 'bold', color: '#FFFFFF', margin: '0 0 0.5rem' }}>
                  WhatsApp Direct Support
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#D2DDD0', lineHeight: 1.5, margin: '0 0 1.25rem' }}>
                  Chat directly with our herbal consultants for personalized dosage guidance or urgent tracking inquiries.
                </p>
              </div>

              <a
                href={getWhatsAppUrl('Hi Veelana Team, I would like to consult about my hair type and placing an order.')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-olive"
                style={{
                  background: '#25D366',
                  borderColor: '#25D366',
                  color: '#FFFFFF',
                  padding: '0.9rem 1.25rem',
                  fontSize: '0.95rem',
                  fontWeight: 'bold',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.6rem',
                  borderRadius: '12px',
                  boxShadow: '0 4px 15px rgba(37, 211, 102, 0.3)',
                }}
              >
                <MessageCircle style={{ width: '20px', height: '20px' }} />
                <span>Chat on WhatsApp (+92 306 1041609)</span>
              </a>
            </div>

            {/* Contact Details Grid */}
            <div
              style={{
                background: '#FFFFFF',
                borderRadius: '20px',
                padding: '1.75rem',
                border: '1px solid rgba(79, 93, 56, 0.15)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
              }}
            >
              <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#1B2E1E', margin: 0, paddingBottom: '0.75rem', borderBottom: '1px solid #EFECE4' }}>
                Contact & Logistics Channels
              </h4>

              {/* Phone */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#EAEFE4', color: '#2D6A4F', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Phone style={{ width: '18px', height: '18px' }} />
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#73836E', fontWeight: '600', textTransform: 'uppercase', display: 'block' }}>Call & WhatsApp Hotline</span>
                  <a href="https://wa.me/923061041609" style={{ fontSize: '0.95rem', fontWeight: '800', color: '#1B2E1E', textDecoration: 'none' }}>
                    +92 306 1041609
                  </a>
                </div>
              </div>

              {/* Email */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#EAEFE4', color: '#4F5D38', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Mail style={{ width: '18px', height: '18px' }} />
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#73836E', fontWeight: '600', textTransform: 'uppercase', display: 'block' }}>Official Email</span>
                  <a href="mailto:veelanaofficial@gmail.com" style={{ fontSize: '0.95rem', fontWeight: '700', color: '#1B2E1E', textDecoration: 'underline' }}>
                    veelanaofficial@gmail.com
                  </a>
                </div>
              </div>

              {/* Origin */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#EAEFE4', color: '#705436', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <MapPin style={{ width: '18px', height: '18px' }} />
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#73836E', fontWeight: '600', textTransform: 'uppercase', display: 'block' }}>Logistics & Fulfillment</span>
                  <span style={{ fontSize: '0.9rem', color: '#2A361E', fontWeight: '600' }}>
                    Punjab, Pakistan (Nationwide COD Express Dispatch)
                  </span>
                </div>
              </div>

              {/* Hours */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#EAEFE4', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Clock style={{ width: '18px', height: '18px' }} />
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#73836E', fontWeight: '600', textTransform: 'uppercase', display: 'block' }}>Customer Desk Hours</span>
                  <span style={{ fontSize: '0.88rem', color: '#2A361E' }}>
                    Mon - Sat: 9:00 AM – 9:00 PM PKT
                  </span>
                </div>
              </div>
            </div>

            {/* Social Channels Bar */}
            <div
              style={{
                background: '#FFFFFF',
                borderRadius: '20px',
                padding: '1.25rem 1.75rem',
                border: '1px solid rgba(79, 93, 56, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem',
              }}
            >
              <span style={{ fontSize: '0.82rem', fontWeight: '700', color: '#2A361E' }}>
                Official Social Profiles:
              </span>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <a
                  href="https://www.facebook.com/profile.php?id=61592935558371"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#F0F5ED', color: '#1877F2', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(79, 93, 56, 0.15)' }}
                  title="Official Facebook"
                >
                  <FacebookIcon size={18} />
                </a>
                <a
                  href="https://instagram.com/veelanaofficial"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#F0F5ED', color: '#E1306C', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(79, 93, 56, 0.15)' }}
                  title="Official Instagram"
                >
                  <InstagramIcon size={18} />
                </a>
                <a
                  href="https://tiktok.com/@veelanaofficial"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#F0F5ED', color: '#121E14', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(79, 93, 56, 0.15)' }}
                  title="Official TikTok"
                >
                  <TikTokIcon size={18} />
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Consultation & Message Form */}
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '20px',
              padding: '2rem',
              border: '1px solid rgba(79, 93, 56, 0.15)',
              boxShadow: '0 8px 30px rgba(0,0,0,0.04)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#4F5D38', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '0.35rem' }}>
                DIRECT ASSISTANCE FORM
              </span>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.85rem', fontWeight: 'bold', color: '#1B2E1E', margin: '0 0 0.5rem' }}>
                Send Us a Message
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#6A7B52', margin: '0 0 1.5rem', lineHeight: 1.45 }}>
                Fill out the form below to receive immediate consultation or customized order assistance via WhatsApp.
              </p>

              {submitted ? (
                <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                  <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#EAEFE4', color: '#2D6A4F', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                    <CheckCircle2 style={{ width: '32px', height: '32px' }} />
                  </div>
                  <h4 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1B2E1E', marginBottom: '0.5rem' }}>
                    Message Sent to WhatsApp!
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: '#5A6B53', maxWidth: '320px', margin: '0 auto 1.5rem' }}>
                    Our representative will review your inquiry and respond shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    style={{ background: '#4F5D38', color: '#FAF8F5', border: 'none', padding: '0.65rem 1.5rem', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {/* Full Name */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#2A361E', marginBottom: '0.35rem' }}>
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ayesha Khan"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        fontSize: '0.9rem',
                        borderRadius: '10px',
                        border: '1px solid #D6D0C2',
                        background: '#FAF8F5',
                        outline: 'none',
                      }}
                    />
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#2A361E', marginBottom: '0.35rem' }}>
                      Active WhatsApp Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 0300 1234567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        fontSize: '0.9rem',
                        borderRadius: '10px',
                        border: '1px solid #D6D0C2',
                        background: '#FAF8F5',
                        outline: 'none',
                      }}
                    />
                  </div>

                  {/* Inquiry Topic */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#2A361E', marginBottom: '0.35rem' }}>
                      Inquiry Topic
                    </label>
                    <select
                      value={formData.topic}
                      onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        fontSize: '0.9rem',
                        borderRadius: '10px',
                        border: '1px solid #D6D0C2',
                        background: '#FAF8F5',
                        outline: 'none',
                        color: '#1B2E1E',
                      }}
                    >
                      <option value="Hair Fall Consultation">Hair Fall & Thinning Consultation</option>
                      <option value="Dandruff & Scalp Itch">Dandruff & Dry Scalp Care</option>
                      <option value="Order Tracking Query">Existing Order Tracking Status</option>
                      <option value="Wholesale / Bulk Orders">Bulk / Family Pack Inquiries</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#2A361E', marginBottom: '0.35rem' }}>
                      Message or Specific Scalp Details (Optional)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Describe your hair type or any questions..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        fontSize: '0.9rem',
                        borderRadius: '10px',
                        border: '1px solid #D6D0C2',
                        background: '#FAF8F5',
                        outline: 'none',
                        resize: 'none',
                      }}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="btn-olive"
                    style={{
                      width: '100%',
                      padding: '0.95rem',
                      fontSize: '0.95rem',
                      fontWeight: 'bold',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      borderRadius: '12px',
                      marginTop: '0.5rem',
                    }}
                  >
                    <Send style={{ width: '18px', height: '18px' }} />
                    <span>Send Inquiry to WhatsApp Support</span>
                  </button>
                </form>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: '#73836E', marginTop: '1.25rem', justifyContent: 'center' }}>
              <ShieldCheck style={{ width: '14px', height: '14px', color: '#2D6A4F' }} />
              <span>Your contact information is strictly protected and never shared.</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
