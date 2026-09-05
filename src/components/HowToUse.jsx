import React from 'react';
import { Droplet, Hand, Clock, Sparkles, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HowToUse({ onOpenOrder }) {
  const steps = [
    {
      num: '01',
      action: 'Apply',
      title: 'Targeted Scalp Drops',
      desc: 'Section your hair into parts and apply 3–5 drops of Veelana Oil directly to scalp using the precision dropper.',
      icon: Droplet,
      tip: 'Focus on hairline & thinning areas'
    },
    {
      num: '02',
      action: 'Massage',
      title: '5–10 Mins Circulation',
      desc: 'Gently massage roots in slow circular motions using fingertips to stimulate blood flow and follicle oxygenation.',
      icon: Hand,
      tip: 'Warm oil in hands for faster absorption'
    },
    {
      num: '03',
      action: 'Nourish',
      title: '2 Hours or Overnight',
      desc: 'Allow the 26 raw botanical herbs to deeply penetrate the scalp pores. Leave overnight or minimum 2 hours.',
      icon: Clock,
      tip: 'Wrap in a silk cap or towel overnight'
    },
    {
      num: '04',
      action: 'Rinse',
      title: 'Gentle Herbal Wash',
      desc: 'Wash off thoroughly with a mild sulphate-free shampoo to reveal silky, hydrated, non-greasy natural volume.',
      icon: Sparkles,
      tip: 'Repeat 3x weekly for visible regrowth'
    }
  ];

  return (
    <section id="how-to-use" className="routine-section">
      <div className="container" style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 1rem' }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 2.5rem' }}>
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
            marginBottom: '0.75rem'
          }}>
            <Sparkles className="w-3.5 h-3.5 text-[#B38E2A]" />
            <span>The Veelana 4-Step Ritual</span>
          </div>

          <h2 className="section-title">
            How to Use for Maximum Hair Growth
          </h2>

          <p className="section-subtitle">
            Follow this simple ritual 3 times a week to stimulate dormant follicles, reduce daily shedding, and lock in healthy gloss.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="routine-grid">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="routine-card"
              >
                <div>
                  {/* Top Bar: Step Number & Icon */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1.1rem',
                    paddingBottom: '0.75rem',
                    borderBottom: '1px solid rgba(79, 93, 56, 0.08)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span className="routine-step-num" style={{
                        color: '#1B2E1E',
                        fontSize: '1.25rem',
                        fontWeight: '800',
                        letterSpacing: '-0.02em'
                      }}>
                        {item.num}
                      </span>
                      <span style={{
                        fontSize: '0.68rem',
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        color: '#B38E2A',
                        background: '#FAF6EC',
                        padding: '0.15rem 0.5rem',
                        borderRadius: '6px',
                        border: '1px solid rgba(212, 175, 55, 0.25)'
                      }}>
                        {item.action}
                      </span>
                    </div>

                    <div style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '10px',
                      background: 'linear-gradient(135deg, #1B2E1E 0%, #2F4D33 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#E8CA65',
                      boxShadow: '0 2px 8px rgba(27, 46, 30, 0.15)'
                    }}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.08rem',
                    fontWeight: '700',
                    color: '#1B2E1E',
                    marginBottom: '0.45rem',
                    lineHeight: 1.3
                  }}>
                    {item.title}
                  </h3>

                  <p style={{
                    fontSize: '0.875rem',
                    color: 'var(--color-text-muted)',
                    lineHeight: 1.6,
                    marginBottom: '1.2rem',
                    minHeight: '44px'
                  }}>
                    {item.desc}
                  </p>
                </div>

                {/* Pro Tip Box */}
                <div style={{
                  padding: '0.5rem 0.65rem',
                  borderRadius: '8px',
                  background: '#F9F7F1',
                  border: '1px solid rgba(212, 175, 55, 0.22)',
                  fontSize: '0.72rem',
                  color: '#654C12',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontWeight: '500'
                }}>
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#B38E2A] shrink-0" />
                  <span style={{ lineHeight: 1.3 }}><strong>Tip:</strong> {item.tip}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Quick-Facts Banner & Action */}
        <div style={{
          marginTop: '2.5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.2rem'
        }}>
          {/* Trust Specs Strip */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.5rem',
            flexWrap: 'wrap',
            padding: '0.75rem 1.6rem',
            borderRadius: '999px',
            background: '#FFFFFF',
            border: '1px solid rgba(79, 93, 56, 0.12)',
            boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
            fontSize: '0.78rem',
            color: '#2D4A27'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Clock className="w-3.5 h-3.5 text-[#B38E2A]" />
              <span><strong>Routine:</strong> 3 Times a Week</span>
            </div>
            <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#D4AF37' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Sparkles className="w-3.5 h-3.5 text-[#B38E2A]" />
              <span><strong>Duration:</strong> 2 Hours / Overnight</span>
            </div>
            <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#D4AF37' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <ShieldCheck className="w-3.5 h-3.5 text-[#B38E2A]" />
              <span><strong>Visible Change:</strong> 3 to 4 Weeks</span>
            </div>
          </div>

          {/* Quick Order Trigger if onOpenOrder is present */}
          {onOpenOrder && (
            <button
              onClick={() => onOpenOrder({ name: 'Veelana Herbal Hair Oil (200ml)', size: '200ml', price: 1899 })}
              className="btn-olive"
              style={{
                minHeight: '48px',
                padding: '0.875rem 1.75rem',
                fontSize: '0.9375rem',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                borderRadius: 'var(--radius-full)',
                whiteSpace: 'nowrap'
              }}
            >
              <span>Start Routine with 200ml Bottle — Rs. 1,899</span>
              <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
            </button>
          )}
        </div>

      </div>
    </section>
  );
}
