import React from 'react';
import { Leaf, ShieldCheck, Droplet, Sparkles, HeartHandshake } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ValueGrid() {
  const valueProps = [
    {
      title: '25+ Herbal Ingredients',
      desc: 'Formulated with 25 cold-pressed herbs including Amla, Bhringraj, Brahmi, Neem, and Rosemary.',
      icon: Leaf,
      badge: '100% Pure'
    },
    {
      title: 'Paraben Free',
      desc: 'Zero harmful synthetic preservatives that disrupt natural scalp hormone balance.',
      icon: ShieldCheck,
      badge: 'Zero Toxins'
    },
    {
      title: 'Sulphate Free',
      desc: 'Free from aggressive chemical detergents that strip away essential hair moisture.',
      icon: Droplet,
      badge: 'Gentle Care'
    },
    {
      title: 'Mineral Oil Free',
      desc: 'No heavy petroleum byproducts that clog pores or weigh down fine strands.',
      icon: Sparkles,
      badge: 'Clean Formula'
    },
    {
      title: '100% Vegan & Cruelty-Free',
      desc: 'Entirely plant-derived, never tested on animals, ethically harvested in Punjab.',
      icon: HeartHandshake,
      badge: 'Ethical Standard'
    }
  ];

  return (
    <section id="why-veelana" className="why-section">
      <div className="container">
        
        <div className="text-center">
          <div className="section-badge" style={{ background: 'rgba(27, 46, 30, 0.1)', color: '#1B2E1E', borderColor: 'rgba(27, 46, 30, 0.2)' }}>
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            Clean Botanical Purity
          </div>
          <h2 className="section-title" style={{ color: '#121E14' }}>
            Why Choose Veelana Herbal Hair Oil?
          </h2>
          <p className="section-subtitle" style={{ color: '#4F5E52' }}>
            We strictly enforce a clean beauty promise. No artificial fillers, no harmful chemicals.
          </p>
        </div>

        {/* 5 Cards Grid */}
        <div className="value-grid">
          {valueProps.map((prop, index) => {
            const Icon = prop.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="value-card"
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <div className="value-icon">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span style={{ fontSize: '0.7rem', fontWeight: 'bold', color: '#D4AF37', background: '#1B2E1E', padding: '0.25rem 0.75rem', borderRadius: '9999px', textTransform: 'uppercase' }}>
                      {prop.badge}
                    </span>
                  </div>

                  <h3 className="value-title" style={{ color: '#121E14' }}>
                    {prop.title}
                  </h3>
                  <p className="value-desc">
                    {prop.desc}
                  </p>
                </div>

                <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid rgba(27, 46, 30, 0.1)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', fontWeight: 'bold', color: '#1B2E1E' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#D4AF37' }}></span>
                  <span>Veelana Quality Assured</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
