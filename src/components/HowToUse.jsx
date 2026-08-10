import React from 'react';
import { Droplet, Hand, Clock, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HowToUse() {
  const steps = [
    {
      step: '01',
      title: 'Targeted Scalp Application',
      desc: 'Section your hair into parts and apply a few drops of Veelana Herbal Hair Oil directly to your scalp using the dropper.',
      icon: Droplet,
      tip: 'Focus on sparse areas & temples'
    },
    {
      step: '02',
      title: '5-10 Mins Root Massage',
      desc: 'Use your fingertips to gently massage your roots in slow circular motions to stimulate blood flow and follicle oxygenation.',
      icon: Hand,
      tip: 'Warming oil in hands boosts absorption'
    },
    {
      step: '03',
      title: 'Overnight / 2 Hours Nourishment',
      desc: 'Allow the 25+ botanical herbs to deeply penetrate the scalp pores. Leave overnight or for a minimum of 2 hours.',
      icon: Clock,
      tip: 'Use a towel pillow guard for overnight care'
    },
    {
      step: '04',
      title: 'Gentle Mild Wash',
      desc: 'Wash off thoroughly with a mild sulphate-free shampoo to reveal silky, hydrated, non-greasy natural shine.',
      icon: Sparkles,
      tip: 'Repeat 3x weekly for optimal growth'
    }
  ];

  return (
    <section id="how-to-use" className="routine-section">
      <div className="container">
        
        {/* Header */}
        <div className="text-center">
          <div className="section-badge">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            Simple 4-Step Care Routine
          </div>
          <h2 className="section-title">
            How to Use Veelana for Maximum Hair Growth
          </h2>
          <p className="section-subtitle">
            Follow this simple ritual 3 times a week to transform dry, weak roots into strong, voluminous strands.
          </p>
        </div>

        {/* 4 Steps Timeline Grid */}
        <div className="routine-grid">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="routine-card"
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <span className="routine-step-num">
                      {item.step}
                    </span>
                    <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: '#0F1C11', border: '1px solid rgba(212, 175, 55, 0.3)', color: '#D4AF37', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 'bold', color: '#FDFBF7', marginBottom: '0.5rem' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '0.82rem', color: 'rgba(253, 251, 247, 0.8)', fontWeight: '300', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                    {item.desc}
                  </p>
                </div>

                {/* Pro Tip Box */}
                <div style={{ padding: '0.6rem 0.85rem', borderRadius: '12px', background: '#0F1C11', border: '1px solid rgba(212, 175, 55, 0.2)', fontSize: '0.72rem', color: '#E6C265', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                  <span>Pro Tip: {item.tip}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
