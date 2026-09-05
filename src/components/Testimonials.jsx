import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, CheckCircle2, MessageCircle, ShieldCheck, Maximize2, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const REAL_REVIEWS = [
  {
    id: 1,
    location: 'Umerkot, Sindh',
    bottlePurchased: '200ml Master Bottle',
    concern: 'Heat Damage from Hair Dryer & Straightener',
    quote: 'Mery baal repair ho rhy Hain 😍 mujhe yaqeen nhi ho rha k itni speed sy ye oil kaam kry ga. Shukriya Veelana..',
    highlight: 'Heat Damaged Hair Repaired in 4 Weeks',
    image: '/assets/reviews/review_umerkot_sindh.jpeg',
    chatDate: '1 July – 3 August 2026',
    verified: true,
  },
  {
    id: 2,
    location: 'Rawalpindi / Islamabad',
    bottlePurchased: '100ml Starter Bottle',
    concern: 'Thinning Hair & Weak Density',
    quote: 'Yr apke oil ny kamaal kr diya. Maine hair pehly sy zada moty hogye or zada b hogye.',
    highlight: 'Hair Became Noticeably Thicker & Denser',
    image: '/assets/reviews/review_hair_thickening.jpeg',
    chatDate: '7 July – 5 August 2026',
    verified: true,
  },
  {
    id: 3,
    location: 'Lahore, Punjab',
    bottlePurchased: '200ml Bottle (Reordered 2 for Daughter in Turkey)',
    concern: 'Severe Hair Fall & Thinning',
    quote: 'Alhamdulillah bohat acha result mila. Hair fall bhi kaafi kam ho gaya hai aur new baby hairs bhi aa rahe hain. 2 bottles aur bhej dein, maine apni beti ko Turkey bhejni hain.',
    highlight: 'Baby Hairs Sprouted + Repeat Order to Turkey',
    image: '/assets/reviews/review_baby_hair_turkey.jpeg',
    chatDate: '29 June – 29 July 2026',
    verified: true,
  },
  {
    id: 4,
    location: 'Karachi, Sindh',
    bottlePurchased: '100ml Bottle',
    concern: 'Fine, Brittle & Thinning Hair',
    quote: 'Meri soch sy zada achha oil nikla ❤️ Mere thin hair wala masla almost khatam ho gaya hai. Baal pehle sy zyada strong aur healthy feel ho rahe hain. Thankyou Veelana! 👏',
    highlight: 'Thin Hair Problem Solved & Roots Strengthened',
    image: '/assets/reviews/review_stronger_hair.jpeg',
    chatDate: '29 July – 1 August 2026',
    verified: true,
  },
  {
    id: 5,
    location: 'Lahore, Punjab',
    bottlePurchased: '200ml Twin Pack',
    concern: 'Chronic Hair Shedding & Hairline',
    quote: 'Main ne oil use kiya aur Alhamdulillah bohot acha result mila! Hair fall bohot kam ho gaya hai, new baby hairs bhi aana start ho gaye hain. 2 bottle aur bhej den meri beti ke liye...',
    highlight: 'New Baby Hair Growth & 100% Satisfaction',
    image: '/assets/reviews/review_repeat_order_200ml.jpeg',
    chatDate: '29 June – 29 July 2026',
    verified: true,
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxImage, setLightboxImage] = useState(null);

  const prevReview = () => {
    setCurrentIndex((prev) => (prev === 0 ? REAL_REVIEWS.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % REAL_REVIEWS.length);
  };

  const activeReview = REAL_REVIEWS[currentIndex];

  return (
    <section id="reviews" className="reviews-section">
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#EAEFE4', border: '1px solid rgba(79, 93, 56, 0.2)', padding: '6px 18px', borderRadius: '999px', fontSize: '0.82rem', fontWeight: 'bold', color: '#1B2E1E', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 'var(--space-default)' }}>
            <MessageCircle style={{ width: '16px', height: '16px', color: '#25D366' }} />
            <span>100% Real Customer WhatsApp Proof</span>
          </div>

          <h2 className="section-title">
            Real Results. Real Pakistani Customers.
          </h2>
          
          <p className="section-subtitle">
            No fake testimonials. Read unedited WhatsApp chat conversations directly from customers across Lahore, Karachi, Rawalpindi, and Sindh who experienced genuine hair transformation with Veelana.
          </p>
        </div>

        {/* FEATURED REVIEW SPOTLIGHT CARD (2 COLUMNS: CHAT SCREENSHOT + VERIFIED DETAILS) */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '24px',
            border: '2px solid rgba(79, 93, 56, 0.18)',
            boxShadow: '0 16px 45px rgba(0,0,0,0.06)',
            padding: '2rem',
            marginBottom: '3.5rem',
            maxWidth: '1000px',
            margin: '0 auto 3.5rem',
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', alignItems: 'center' }}>
            
            {/* Left Column: Authentic WhatsApp Screenshot Frame */}
            <div
              onClick={() => setLightboxImage(activeReview.image)}
              style={{
                position: 'relative',
                background: '#ECE5DD',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
                border: '2px solid #D6D0C2',
                cursor: 'pointer',
                maxHeight: '440px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src={activeReview.image}
                alt={`Real WhatsApp review from ${activeReview.location}`}
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '440px',
                  objectFit: 'contain',
                  display: 'block',
                  transition: 'transform 0.3s ease',
                }}
              />

              {/* Click to expand overlay button */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '12px',
                  right: '12px',
                  background: 'rgba(27, 46, 30, 0.85)',
                  color: '#FAF8F5',
                  padding: '6px 12px',
                  borderRadius: '999px',
                  fontSize: '0.75rem',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  backdropFilter: 'blur(4px)',
                }}
              >
                <Maximize2 style={{ width: '13px', height: '13px' }} />
                <span>Tap to Zoom Chat</span>
              </div>
            </div>

            {/* Right Column: Verified Details & Quote */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              
              {/* Badge & Stars */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: '#ECFDF5', color: '#047857', padding: '4px 12px', borderRadius: '999px', fontSize: '0.78rem', fontWeight: 'bold' }}>
                  <CheckCircle2 style={{ width: '14px', height: '14px' }} />
                  <span>Verified Purchase • {activeReview.location}</span>
                </div>

                <div style={{ display: 'flex', gap: '3px' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} style={{ width: '18px', height: '18px', color: '#D4AF37', fill: '#D4AF37' }} />
                  ))}
                </div>
              </div>

              {/* Key Result Headline */}
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.65rem', fontWeight: 'bold', color: '#1B2E1E', margin: '0 0 0.75rem', lineHeight: 1.3 }}>
                "{activeReview.highlight}"
              </h3>

              {/* Real Customer Quote */}
              <div style={{ background: '#FAF8F5', borderLeft: '4px solid #25D366', padding: '1rem 1.25rem', borderRadius: '0 12px 12px 0', marginBottom: '1.25rem' }}>
                <p style={{ fontSize: '1rem', color: '#2A361E', fontStyle: 'italic', margin: 0, lineHeight: 1.6 }}>
                  "{activeReview.quote}"
                </p>
              </div>

              {/* Details breakdown */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.875rem', color: 'var(--color-text-muted)', borderTop: '1px solid #ECE7DD', paddingTop: '1rem', marginBottom: '1.5rem' }}>
                <div>
                  <strong style={{ color: '#1B2E1E' }}>• Hair Challenge:</strong> {activeReview.concern}
                </div>
                <div>
                  <strong style={{ color: '#1B2E1E' }}>• Bottle Used:</strong> {activeReview.bottlePurchased}
                </div>
                <div>
                  <strong style={{ color: '#1B2E1E' }}>• Chat Log Timeline:</strong> {activeReview.chatDate}
                </div>
              </div>

              {/* Slider Navigation Controls */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: '0.65rem' }}>
                  <button
                    onClick={prevReview}
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      background: '#1B2E1E',
                      color: '#FAF8F5',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    }}
                    title="Previous Verified Review"
                  >
                    <ChevronLeft style={{ width: '22px', height: '22px' }} />
                  </button>

                  <button
                    onClick={nextReview}
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      background: '#1B2E1E',
                      color: '#FAF8F5',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    }}
                    title="Next Verified Review"
                  >
                    <ChevronRight style={{ width: '22px', height: '22px' }} />
                  </button>
                </div>

                {/* Dots indicator */}
                <div style={{ display: 'flex', gap: '6px' }}>
                  {REAL_REVIEWS.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      style={{
                        height: '8px',
                        width: currentIndex === idx ? '28px' : '8px',
                        borderRadius: '999px',
                        background: currentIndex === idx ? '#1B2E1E' : '#D6D0C2',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                      }}
                      aria-label={`Go to review ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* THUMBNAIL GALLERY OF ALL 5 REVIEWS */}
        <div>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#3E4D34', textTransform: 'uppercase', letterSpacing: '1px' }}>
              All 5 Verified WhatsApp Conversations (Click to Zoom)
            </span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.25rem',
            }}
          >
            {REAL_REVIEWS.map((rev, index) => {
              const isCurrent = currentIndex === index;
              return (
                <div
                  key={rev.id}
                  onClick={() => {
                    setCurrentIndex(index);
                    setLightboxImage(rev.image);
                  }}
                  style={{
                    background: '#FFFFFF',
                    borderRadius: '16px',
                    border: isCurrent ? '2px solid #25D366' : '1px solid #D6D0C2',
                    padding: '0.75rem',
                    cursor: 'pointer',
                    boxShadow: isCurrent ? '0 8px 25px rgba(37, 211, 102, 0.2)' : '0 2px 10px rgba(0,0,0,0.04)',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ height: '190px', overflow: 'hidden', borderRadius: '10px', background: '#F0ECE4', marginBottom: '0.65rem' }}>
                    <img
                      src={rev.image}
                      alt={rev.location}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                    />
                  </div>

                  <div>
                    <span style={{ fontSize: '0.72rem', fontWeight: 'bold', color: '#047857', display: 'block' }}>
                      📍 {rev.location}
                    </span>
                    <strong style={{ fontSize: '0.82rem', color: '#1B2E1E', display: 'block', margin: '2px 0' }}>
                      {rev.highlight}
                    </strong>
                    <span style={{ fontSize: '0.7rem', color: '#8A9A86' }}>
                      {rev.bottlePurchased}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* LIGHTBOX POPUP MODAL FOR HIGH-RES INSPECTION */}
        <AnimatePresence>
          {lightboxImage && (
            <div
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 999999,
                background: 'rgba(12, 22, 14, 0.9)',
                backdropFilter: 'blur(8px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1rem',
              }}
              onClick={() => setLightboxImage(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '24px',
                  maxWidth: '560px',
                  width: '100%',
                  overflow: 'hidden',
                  position: 'relative',
                  boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
                  maxHeight: '92vh',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Modal Top Bar */}
                <div style={{ padding: '1rem 1.25rem', background: '#1B2E1E', color: '#FAF8F5', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <MessageCircle style={{ width: '18px', height: '18px', color: '#25D366' }} />
                    <span style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>
                      Verified WhatsApp Customer Feedback
                    </span>
                  </div>

                  <button
                    onClick={() => setLightboxImage(null)}
                    style={{ background: 'none', border: 'none', color: '#FAF8F5', cursor: 'pointer', padding: '4px' }}
                  >
                    <X style={{ width: '22px', height: '22px' }} />
                  </button>
                </div>

                {/* Image Container with Scrolling */}
                <div style={{ overflowY: 'auto', padding: '1rem', background: '#ECE5DD', display: 'flex', justifyContent: 'center' }}>
                  <img
                    src={lightboxImage}
                    alt="Verified WhatsApp Review Proof"
                    style={{
                      maxWidth: '100%',
                      height: 'auto',
                      borderRadius: '12px',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                    }}
                  />
                </div>

                {/* Modal Bottom Close */}
                <div style={{ padding: '0.85rem 1.25rem', background: '#FAF8F5', borderTop: '1px solid #ECE7DD', textAlign: 'center' }}>
                  <button
                    onClick={() => setLightboxImage(null)}
                    style={{
                      padding: '0.55rem 1.5rem',
                      background: '#1B2E1E',
                      color: '#FAF8F5',
                      border: 'none',
                      borderRadius: '8px',
                      fontWeight: 'bold',
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                    }}
                  >
                    Close Preview
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
