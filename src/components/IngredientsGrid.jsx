import React, { useState } from 'react';
import { Leaf, Sparkles, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function IngredientsGrid() {
  const [selectedIngredient, setSelectedIngredient] = useState(null);

  const ingredients = [
    {
      name: 'Amla (Indian Gooseberry)',
      category: 'Vitamin C & Follicle Booster',
      desc: 'Rich in antioxidants and natural Vitamin C to prevent premature greying and strengthen roots.',
      icon: '🌿'
    },
    {
      name: 'Bhringraj (King of Hair)',
      category: 'Hair Growth Activator',
      desc: 'Reactivates dormant hair follicles and increases micro-blood circulation to the scalp.',
      icon: '👑'
    },
    {
      name: 'Brahmi (Memory & Root Herb)',
      category: 'Scalp Calmer & Thickener',
      desc: 'Cools scalp inflammation, reduces hair fall triggered by stress, and thickens hair shafts.',
      icon: '🌱'
    },
    {
      name: 'Neem Extract',
      category: 'Anti-Dandruff & Purifier',
      desc: 'Potent natural anti-fungal and antibacterial shield preventing scalp flakes and itching.',
      icon: '🍃'
    },
    {
      name: 'Rosemary Oil',
      category: 'DHT Blocking Essential Oil',
      desc: 'Clinically shown to stimulate growth comparable to 2% minoxidil without chemicals.',
      icon: '🌾'
    },
    {
      name: 'Hibiscus Flower Extract',
      category: 'Natural Hair Conditioner',
      desc: 'Packed with amino acids to lock in moisture and impart brilliant biological shine.',
      icon: '🌺'
    },
    {
      name: 'Cold-Pressed Coconut Oil',
      category: 'Deep Penetration Lipid Base',
      desc: 'Deeply penetrates keratin layers to reduce protein loss from daily styling.',
      icon: '🥥'
    },
    {
      name: 'Sweet Almond Oil',
      category: 'Vitamin E Nourishment',
      desc: 'Softens coarse hair strands and repairs split ends with rich omega-9 fatty acids.',
      icon: '🥜'
    },
    {
      name: 'Black Sesame Seed Oil',
      category: 'UV & Heat Shield',
      desc: 'Traditional cold-pressed base that protects hair from environmental heat damage.',
      icon: '✨'
    },
    {
      name: 'Fenugreek (Methi)',
      category: 'Protein & Lecithin Source',
      desc: 'High protein content combats severe thinning and restores resilient scalp elasticity.',
      icon: '🍃'
    },
    {
      name: 'Pure Argan Oil',
      category: 'Liquid Gold Moisture',
      desc: 'Tames unruly frizz and seals cuticles for silky smooth, manageable hair texture.',
      icon: '💧'
    },
    {
      name: 'Pure Castor Oil',
      category: 'Ricinoleic Acid Anchor',
      desc: 'Thickens sparse hairline edges and locks roots firmly into the dermal layer.',
      icon: '🧴'
    }
  ];

  return (
    <section id="ingredients" className="ingredients-section">
      <div className="container">
        
        {/* Title */}
        <div className="text-center">
          <div className="section-badge" style={{ background: 'rgba(27, 46, 30, 0.1)', color: '#1B2E1E', borderColor: 'rgba(27, 46, 30, 0.2)' }}>
            <Leaf className="w-4 h-4 text-[#D4AF37]" />
            25+ Pure Cold-Pressed Herbs
          </div>
          <h2 className="section-title" style={{ color: '#121E14' }}>
            Harnessing Nature's Potent Botanical Elixirs
          </h2>
          <p className="section-subtitle" style={{ color: '#4F5E52' }}>
            Every bottle contains 25+ handpicked Ayurvedic & modern herbs infused over slow cold-pressing methods in Khanewal.
          </p>
        </div>

        {/* 12 Grid Cards */}
        <div className="ingredients-grid">
          {ingredients.map((ing, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.04 }}
              viewport={{ once: true }}
              onClick={() => setSelectedIngredient(ing)}
              className="ingredient-card"
            >
              <div className="ingredient-icon">{ing.icon}</div>
              <h3 className="ingredient-name">
                {ing.name}
              </h3>
              <span className="ingredient-cat">
                {ing.category}
              </span>
              <p className="ingredient-desc">
                {ing.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Modal detail */}
        <AnimatePresence>
          {selectedIngredient && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedIngredient(null)}
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 2000,
                background: 'rgba(15, 28, 17, 0.85)',
                backdropFilter: 'blur(8px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1rem'
              }}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                style={{
                  background: '#1B2E1E',
                  color: '#FDFBF7',
                  border: '2px solid #D4AF37',
                  padding: '2rem',
                  borderRadius: '24px',
                  maxWidth: '450px',
                  width: '100%',
                  position: 'relative',
                  boxShadow: '0 25px 50px rgba(0,0,0,0.5)'
                }}
              >
                <button
                  onClick={() => setSelectedIngredient(null)}
                  style={{ position: 'absolute', top: '1rem', right: '1rem', color: '#D4AF37' }}
                >
                  <X className="w-6 h-6" />
                </button>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{selectedIngredient.icon}</div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 'bold', color: '#FDFBF7', marginBottom: '0.25rem' }}>
                  {selectedIngredient.name}
                </h3>
                <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#D4AF37', textTransform: 'uppercase', display: 'block', marginBottom: '1rem', letterSpacing: '1px' }}>
                  {selectedIngredient.category}
                </span>
                <p style={{ fontSize: '0.9rem', color: 'rgba(253, 251, 247, 0.9)', lineHeight: 1.6, fontWeight: '300', marginBottom: '1.5rem' }}>
                  {selectedIngredient.desc}
                </p>
                <div style={{ padding: '0.75rem 1rem', borderRadius: '12px', background: '#0F1C11', border: '1px solid rgba(212, 175, 55, 0.3)', fontSize: '0.75rem', color: '#E6C265', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>Cold-Pressed Extraction Ensures Maximum Bio-Availability</span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
