import React from 'react';
import { Leaf, ShieldCheck, Droplet, Sparkles, HeartHandshake, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ValueGrid() {
  const valueProps = [
    {
      title: '26 Raw Botanical Herbs',
      desc: 'Formulated with 26 cold-pressed botanicals including Amla, Bhringraj, Brahmi, Neem, and Rosemary.',
      icon: Leaf,
      badge: '100% Pure',
      detail: '72-Hour Slow Cold Extraction'
    },
    {
      title: 'Zero Mineral Oil / Paraffin',
      desc: 'No heavy petroleum by-products or silicones that choke scalp pores and weigh down fine strands.',
      icon: Droplet,
      badge: 'Clean Formula',
      detail: '100% Breathable Follicles'
    },
    {
      title: 'Paraben & Sulphate Free',
      desc: 'Zero harmful synthetic preservatives or detergents that disrupt scalp pH and cause irritation.',
      icon: ShieldCheck,
      badge: 'Zero Toxins',
      detail: 'Dermatologically Safe Standard'
    },
    {
      title: 'Non-Greasy Fast Absorption',
      desc: 'Micro-penetrating cold-pressed formula that absorbs deeply into roots without sticky residue.',
      icon: Sparkles,
      badge: 'Feather-Light',
      detail: 'Effortless Wash & Daily Feel'
    },
    {
      title: '100% Vegan & Cruelty-Free',
      desc: 'Purely plant-derived, never tested on animals, and ethically harvested across pristine Punjab farms.',
      icon: HeartHandshake,
      badge: 'Ethical Standard',
      detail: 'Ethically Sourced Botanicals'
    },
    {
      title: 'Active Root Stimulation',
      desc: 'Stimulates blood circulation, reactivates weak follicles, and helps reduce daily shedding naturally.',
      icon: CheckCircle2,
      badge: 'Proven Care',
      detail: 'Visible Change in 21–30 Days'
    }
  ];

  return (
    <section id="why-veelana" className="why-section">
      <div className="container" style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 1rem' }}>
        
        {/* Compact Refined Header */}
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 2.25rem' }}>
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
            marginBottom: '0.65rem'
          }}>
            <Sparkles className="w-3.5 h-3.5 text-[#B38E2A]" />
            <span>Clean Botanical Purity</span>
          </div>

          <h2 className="section-title">
            Why Choose Veelana Herbal Hair Oil?
          </h2>

          <p className="section-subtitle">
            We strictly enforce a clean beauty promise. Handcrafted with 26 raw cold-pressed botanicals, zero artificial fillers, and zero harmful chemicals.
          </p>
        </div>

        {/* Symmetrical 6-Card Compact Grid */}
        <div className="value-grid">
          {valueProps.map((prop, index) => {
            const Icon = prop.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="value-card"
              >
                <div>
                  {/* Top Bar: Icon & Pill Badge */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '0.85rem'
                  }}>
                    <div className="value-icon">
                      <Icon className="w-5 h-5" />
                    </div>

                    <span style={{
                      fontSize: '0.68rem',
                      fontWeight: '700',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      color: '#B38E2A',
                      background: '#FAF6EC',
                      padding: '0.2rem 0.55rem',
                      borderRadius: '6px',
                      border: '1px solid rgba(212, 175, 55, 0.25)'
                    }}>
                      {prop.badge}
                    </span>
                  </div>

                  <h3 className="value-title">
                    {prop.title}
                  </h3>

                  <p className="value-desc">
                    {prop.desc}
                  </p>
                </div>

                {/* Bottom Trust Feature */}
                <div style={{
                  paddingTop: '0.65rem',
                  borderTop: '1px solid rgba(79, 93, 56, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  fontSize: '0.74rem',
                  fontWeight: '600',
                  color: '#2D4A27'
                }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#D4AF37', flexShrink: 0 }}></span>
                  <span>{prop.detail}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
