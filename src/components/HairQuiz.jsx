import React, { useState } from 'react';
import { Sparkles, CheckCircle2, ArrowRight, RotateCcw, ShoppingBag, MessageCircle, ShieldCheck, Heart, Star, Droplets } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { getWhatsAppUrl } from '../utils/whatsapp';

const QUIZ_STEPS = [
  {
    id: 'concern',
    question: 'What is your primary hair & scalp concern?',
    subtitle: 'Select the main challenge you want Veelana to resolve.',
    options: [
      { id: 'hairfall', label: 'Severe Hair Fall & Weak Roots', desc: 'Hair on pillow, shower drain & comb', badge: 'High Priority' },
      { id: 'regrowth', label: 'Thinning Crown & Receding Hairline', desc: 'Need active follicle reactivation & density', badge: 'Follicle Care' },
      { id: 'frizz', label: 'Extreme Dryness, Frizz & Split Ends', desc: 'Rough texture, lack of shine and volume', badge: 'Nourishment' },
      { id: 'dandruff', label: 'Dandruff, Flakes & Itchy Scalp', desc: 'Scalp irritation and buildup', badge: 'Scalp Detox' },
    ]
  },
  {
    id: 'scalp',
    question: 'How would you describe your natural scalp type?',
    subtitle: 'Helps determine optimal application frequency and oil dosage.',
    options: [
      { id: 'dry', label: 'Dry / Flaky Scalp', desc: 'Feels tight or itchy after washing', badge: 'Needs Deep Moisture' },
      { id: 'oily', label: 'Oily / Greasy Scalp', desc: 'Gets oily within 24 hours of washing', badge: 'Light Absorption' },
      { id: 'combination', label: 'Normal / Balanced Scalp', desc: 'Generally comfortable without extreme dryness or oil', badge: 'Standard Routine' },
      { id: 'sensitive', label: 'Sensitive Scalp', desc: 'Easily irritated by harsh commercial shampoos', badge: 'Gentle Botanical' },
    ]
  },
  {
    id: 'wash',
    question: 'How often do you wash your hair per week?',
    subtitle: 'We will align your oil massage routine with your wash days.',
    options: [
      { id: 'daily', label: 'Daily / 6-7 Times a Week', desc: 'Frequent wash routine', badge: 'Pre-Wash Ritual' },
      { id: 'alternate', label: '2 to 3 Times a Week', desc: 'Optimal natural haircare routine', badge: 'Recommended' },
      { id: 'weekly', label: 'Once a Week', desc: 'Low frequency wash', badge: 'Deep Overnight Pack' },
    ]
  },
  {
    id: 'treated',
    question: 'Has your hair been chemically treated, colored, or heat styled?',
    subtitle: 'Veelana is 100% free of mineral oils and safe for treated hair.',
    options: [
      { id: 'colored', label: 'Yes — Dyed, Bleached or Keratin Treated', desc: 'Needs protein protection and cuticle sealing', badge: 'Cuticle Repair' },
      { id: 'natural', label: 'No — 100% Natural / Virgin Hair', desc: 'Pure botanical nourishment', badge: 'Pure Growth' },
      { id: 'heat', label: 'Frequent Blow-Drying / Ironing', desc: 'Needs thermal recovery and moisture lock', badge: 'Heat Protection' },
    ]
  }
];

export default function HairQuiz({ onOpenOrder }) {
  const { addToCart, setIsCartOpen } = useCart();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  const handleSelectOption = (stepId, optionId) => {
    const updated = { ...answers, [stepId]: optionId };
    setAnswers(updated);

    if (currentStep < QUIZ_STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setAnswers({});
    setCurrentStep(0);
    setShowResult(false);
  };

  // Determine Personalized Product & Treatment Plan
  const getRecommendation = () => {
    const isHeavy = answers.concern === 'hairfall' || answers.concern === 'regrowth';
    
    if (isHeavy) {
      return {
        title: 'Intensive 90-Day Follicle Regrowth Protocol',
        bottleId: 'twin-pack-200ml',
        productName: 'Veelana Twin Pack (2x 200ml Regrowth Kit)',
        price: 'Rs. 3,499',
        originalPrice: 'Rs. 4,900',
        badge: 'Top Clinical Regrowth Match',
        image: '/assets/real_250ml_and_100ml.webp',
        frequency: 'Apply 3 times a week at night. Leave on for 6-8 hours before washing.',
        expectedTimeline: 'Noticeable reduction in hair fall within 10-14 days. New baby hair sprouts in 6-8 weeks.',
        keyHerbs: ['Bhringraj (Keshraj)', 'Amla Extract', 'Pure Rosemary Infusion', 'Black Seed (Kalonji)']
      };
    }

    return {
      title: 'Botanical Nourishment & Hair Fall Defense Plan',
      bottleId: '200ml',
      productName: 'Veelana 200ml Master Herbal Bottle',
      price: 'Rs. 1,899',
      originalPrice: 'Rs. 2,450',
      badge: 'Best Value for Your Hair Profile',
      image: '/assets/real_250ml_single.webp',
      frequency: 'Apply 2-3 times a week, 2 hours before bath or overnight.',
      expectedTimeline: 'Immediate frizz control & silky shine. Root strength improves within 2 weeks.',
      keyHerbs: ['Sweet Almond Oil', 'Shikakai', 'Brahmi', 'Cold-Pressed Castor Lipids']
    };
  };

  const rec = getRecommendation();

  return (
    <section id="hair-quiz">
      <div className="container" style={{ maxWidth: '760px', margin: '0 auto', padding: '0 1rem' }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            padding: '0.35rem 0.95rem',
            borderRadius: '999px',
            background: 'rgba(79, 93, 56, 0.08)',
            border: '1px solid rgba(79, 93, 56, 0.18)',
            color: '#2D4A27',
            fontSize: '0.72rem',
            fontWeight: '700',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: 'var(--space-default)'
          }}>
            <Sparkles className="w-3.5 h-3.5 text-[#B38E2A]" />
            <span>Personalized Hair Diagnosis</span>
          </div>

          <h2 className="section-title">
            Find Your Ideal Botanical Routine
          </h2>

          <p className="section-subtitle">
            Answer 4 quick questions to discover the exact herbs, application ritual, and bottle size tailored for your scalp.
          </p>
        </div>

        {/* Quiz Box */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '18px',
            padding: '1.4rem 1.4rem',
            border: '1px solid rgba(79, 93, 56, 0.14)',
            boxShadow: '0 4px 20px rgba(27, 46, 30, 0.04)',
            position: 'relative',
          }}
        >
          {!showResult ? (
            /* ACTIVE QUESTIONS */
            <div>
              {/* Progress Indicator */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.55rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {currentStep > 0 && (
                    <button
                      onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#6A7B52',
                        fontSize: '0.72rem',
                        fontWeight: '700',
                        cursor: 'pointer',
                        padding: '0 4px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '2px'
                      }}
                    >
                      ← Back
                    </button>
                  )}
                  <span style={{ fontSize: '0.72rem', fontWeight: '700', color: '#6A7B52', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    Question {currentStep + 1} of {QUIZ_STEPS.length}
                  </span>
                </div>
                <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#2D6A4F' }}>
                  {Math.round(((currentStep + 1) / QUIZ_STEPS.length) * 100)}% Complete
                </span>
              </div>

              {/* Progress Bar */}
              <div style={{ height: '4px', background: '#EAEFE4', borderRadius: '999px', overflow: 'hidden', marginBottom: '1.25rem' }}>
                <motion.div
                  style={{ height: '100%', background: 'linear-gradient(90deg, #1B2E1E, #4F5D38)', borderRadius: '999px' }}
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentStep + 1) / QUIZ_STEPS.length) * 100}%` }}
                  transition={{ duration: 0.35 }}
                />
              </div>

              {/* Question Text */}
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: '700', color: '#1B2E1E', margin: '0 0 0.25rem' }}>
                  {QUIZ_STEPS[currentStep].question}
                </h3>
                <p style={{ fontSize: '0.8rem', color: '#6B7280', margin: '0 0 1rem', lineHeight: 1.4 }}>
                  {QUIZ_STEPS[currentStep].subtitle}
                </p>

                {/* Options Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.75rem' }}>
                  {QUIZ_STEPS[currentStep].options.map((opt) => {
                    const isSelected = answers[QUIZ_STEPS[currentStep].id] === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => handleSelectOption(QUIZ_STEPS[currentStep].id, opt.id)}
                        style={{
                          textAlign: 'left',
                          padding: '0.85rem 1rem',
                          borderRadius: '12px',
                          border: isSelected ? '2px solid #1B2E1E' : '1.5px solid #E2DDCF',
                          background: isSelected ? '#FAF8F3' : '#FFFFFF',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          boxShadow: isSelected ? '0 4px 14px rgba(27, 46, 30, 0.08)' : 'none',
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                          <span style={{ fontSize: '0.66rem', fontWeight: '700', color: '#8A6D1C', background: '#FAF6EC', padding: '1px 6px', borderRadius: '4px', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
                            {opt.badge}
                          </span>
                          {isSelected && <CheckCircle2 style={{ width: '15px', height: '15px', color: '#2D6A4F' }} />}
                        </div>
                        <h4 style={{ fontSize: '0.88rem', fontWeight: '700', color: '#1B2E1E', margin: '0 0 0.15rem', lineHeight: 1.3 }}>
                          {opt.label}
                        </h4>
                        <p style={{ fontSize: '0.74rem', color: '#6B7280', margin: 0, lineHeight: 1.35 }}>
                          {opt.desc}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          ) : (
            /* RESULTS SCREEN */
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
            >
              <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#EAEFE4', color: '#2D6A4F', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.5rem' }}>
                  <CheckCircle2 style={{ width: '24px', height: '24px' }} />
                </div>
                <span style={{ fontSize: '0.7rem', fontWeight: '700', color: '#6A7B52', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  YOUR CUSTOM BOTANICAL PRESCRIPTION
                </span>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: '700', color: '#1B2E1E', margin: '0.2rem 0' }}>
                  {rec.title}
                </h3>
              </div>

              {/* Recommended Product Box */}
              <div
                style={{
                  background: '#FAF8F5',
                  borderRadius: '16px',
                  border: '1.5px solid rgba(79, 93, 56, 0.18)',
                  padding: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  marginBottom: '1.25rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                  <div style={{ width: '100px', height: '100px', borderRadius: '14px', background: '#FFFFFF', padding: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid #E0DCD3' }}>
                    <img
                      src={rec.image}
                      alt={rec.productName}
                      style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                    />
                  </div>

                  <div style={{ flex: 1, minWidth: '220px' }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 'bold', color: '#D4AF37', background: '#1B2E1E', padding: '3px 8px', borderRadius: '4px', textTransform: 'uppercase' }}>
                      {rec.badge}
                    </span>
                    <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 'bold', color: '#1B2E1E', margin: '0.35rem 0 0.25rem' }}>
                      {rec.productName}
                    </h4>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '1.15rem', fontWeight: '800', color: '#1B2E1E' }}>{rec.price}</span>
                      <span style={{ fontSize: '0.85rem', color: '#8A9A86', textDecoration: 'line-through' }}>{rec.originalPrice}</span>
                      <span style={{ fontSize: '0.75rem', color: '#047857', fontWeight: 'bold', background: '#ECFDF5', padding: '2px 6px', borderRadius: '4px' }}>
                        Free Nationwide COD Delivery
                      </span>
                    </div>
                  </div>
                </div>

                {/* Treatment Routine Details */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', borderTop: '1px solid #ECE7DD', paddingTop: '1.25rem', fontSize: '0.84rem' }}>
                  <div>
                    <strong style={{ color: '#1B2E1E', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
                      <Droplets style={{ width: '14px', height: '14px', color: '#4F5D38' }} /> Recommended Frequency:
                    </strong>
                    <p style={{ color: '#5A6B53', margin: 0, lineHeight: 1.4 }}>{rec.frequency}</p>
                  </div>

                  <div>
                    <strong style={{ color: '#1B2E1E', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
                      <Star style={{ width: '14px', height: '14px', color: '#D4AF37' }} /> Expected Results:
                    </strong>
                    <p style={{ color: '#5A6B53', margin: 0, lineHeight: 1.4 }}>{rec.expectedTimeline}</p>
                  </div>
                </div>

                {/* Key Targeted Herbs */}
                <div style={{ background: '#FFFFFF', padding: '0.85rem 1rem', borderRadius: '12px', border: '1px solid #E5E1D8' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 'bold', color: '#73836E', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                    Active Infusion for Your Scalp:
                  </span>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {rec.keyHerbs.map((h, i) => (
                      <span key={i} style={{ fontSize: '0.75rem', background: '#EAEFE4', color: '#2A361E', padding: '2px 8px', borderRadius: '999px', fontWeight: '600' }}>
                        🌿 {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <button
                  onClick={() => {
                    if (onOpenOrder) {
                      onOpenOrder(rec.bottleId);
                    } else {
                      addToCart({ id: rec.bottleId, name: rec.productName, price: parseInt(rec.price.replace(/[^0-9]/g, '')), image: rec.image }, 1);
                      setIsCartOpen(true);
                    }
                  }}
                  className="btn-olive"
                  style={{ flex: '1 1 240px', minHeight: '48px', padding: '0.85rem 1rem', fontSize: '0.9375rem', fontWeight: 'bold', justifyContent: 'center', cursor: 'pointer', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}
                >
                  <ShoppingBag style={{ width: '18px', height: '18px' }} />
                  <span>Order My Custom Routine (COD)</span>
                </button>

                <a
                  href={getWhatsAppUrl(`Hi Veelana, I took the Hair Quiz and my recommended plan is "${rec.title}". I would like a personalized consultation.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    flex: '1 1 200px',
                    minHeight: '48px',
                    padding: '0.85rem 1rem',
                    fontSize: '0.9375rem',
                    fontWeight: 'bold',
                    borderRadius: 'var(--radius-sm)',
                    border: '1.5px solid #25D366',
                    background: '#FFFFFF',
                    color: '#1B2E1E',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    textDecoration: 'none !important',
                    textAlign: 'center'
                  }}
                >
                  <MessageCircle style={{ width: '18px', height: '18px', color: '#25D366' }} />
                  <span>Discuss on WhatsApp</span>
                </a>

                <button
                  onClick={resetQuiz}
                  style={{
                    minHeight: '48px',
                    padding: '0.85rem 1.25rem',
                    background: '#EAEFE4',
                    color: '#2A361E',
                    border: 'none',
                    borderRadius: 'var(--radius-sm)',
                    fontWeight: 'bold',
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <RotateCcw style={{ width: '15px', height: '15px' }} />
                  <span>Retake</span>
                </button>
              </div>
            </motion.div>
          )}
        </div>

      </div>
    </section>
  );
}
