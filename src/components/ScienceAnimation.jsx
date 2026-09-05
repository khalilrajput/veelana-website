import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Sparkles } from 'lucide-react';

export default function ScienceAnimation() {
  const [animationCycle, setAnimationCycle] = useState(0);

  // Restart cycle key every 5 seconds for smooth reset loop
  useEffect(() => {
    const timer = setInterval(() => {
      setAnimationCycle((prev) => prev + 1);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const hairStrands = [
    { id: 1, path: "M 90,160 Q 80,110 75,40", delay: 0.8, color: "#3A4828" },
    { id: 2, path: "M 115,160 Q 110,95 105,30", delay: 0.95, color: "#4F5D38" },
    { id: 3, path: "M 140,160 Q 140,90 140,25", delay: 1.1, color: "#3A4828" },
    { id: 4, path: "M 165,160 Q 170,95 175,30", delay: 1.25, color: "#4F5D38" },
    { id: 5, path: "M 190,160 Q 200,110 205,40", delay: 1.4, color: "#3A4828" },
    { id: 6, path: "M 215,160 Q 230,120 235,50", delay: 1.55, color: "#4F5D38" }
  ];

  const restorationSteps = [
    {
      title: "Step 1: Scalp Penetration",
      desc: "Micro-droplets of cold-pressed oil seep into the follicle pore within minutes.",
      benefit: "Scalp Absorption"
    },
    {
      title: "Step 2: Follicle Activation",
      desc: "Scalp tissue absorbs vital bio-active nutrients, stimulating cellular circulation.",
      benefit: "Blood Circulation"
    },
    {
      title: "Step 3: Root Anchoring",
      desc: "Bhringraj, Amla, and Rosemary strengthen the keratin core of each hair strand.",
      benefit: "Keratin Strengthening"
    },
    {
      title: "Step 4: Density & Growth",
      desc: "Follicles anchor firmly into scalp tissue, producing dense, resilient natural hair.",
      benefit: "Follicle Revival"
    }
  ];

  return (
    <section id="science" className="science-section">
      <div className="container">
        
        {/* Heading */}
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 2.25rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            padding: '0.35rem 0.95rem',
            borderRadius: '999px',
            background: 'rgba(212, 175, 55, 0.12)',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            color: '#E8CA65',
            fontSize: '0.72rem',
            fontWeight: '700',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: '0.65rem'
          }}>
            <Activity className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Continuous Micro-Nutrient Delivery</span>
          </div>

          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2rem, 3.8vw, 2.75rem)',
            fontWeight: '700',
            color: '#FAF8F5',
            lineHeight: 1.08,
            marginBottom: 'var(--space-loose)'
          }}>
            How Veelana Restores Your Hair
          </h2>

          <p style={{
            fontSize: '1.0625rem',
            color: 'rgba(250, 248, 245, 0.88)',
            lineHeight: 1.6,
            maxWidth: '580px',
            margin: '0 auto',
            fontWeight: '400'
          }}>
            Witness the biological interaction when 26 cold-pressed botanicals penetrate deep to awaken dormant hair roots.
          </p>
        </div>

        <div className="science-grid">
          
          {/* Left SVG Interactive Animation Container */}
          <div className="science-card">
            
            {/* Status Pill */}
            <div style={{
              background: 'rgba(0, 0, 0, 0.45)',
              padding: '0.35rem 0.95rem',
              borderRadius: '9999px',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              fontSize: '0.74rem',
              color: '#E8CA65',
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              fontWeight: '700',
              marginBottom: '0.85rem'
            }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#10B981', boxShadow: '0 0 8px #10B981' }}></span>
              Live Follicle Simulation
            </div>

            {/* SVG Canvas */}
            <div className="svg-animation-canvas" style={{ width: '100%', maxWidth: '320px', height: '220px' }}>
              <svg key={animationCycle} width="100%" height="100%" viewBox="0 0 300 240">
                <defs>
                  {/* Glowing Amber Gradient for Drop */}
                  <radialGradient id="amberDropGradient" cx="30%" cy="30%" r="70%">
                    <stop offset="0%" stopColor="#FAF8F5" />
                    <stop offset="50%" stopColor="#8DAA63" />
                    <stop offset="100%" stopColor="#3A4828" />
                  </radialGradient>

                  {/* Scalp Gradient */}
                  <linearGradient id="scalpGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3A4828" />
                    <stop offset="50%" stopColor="#4F5D38" />
                    <stop offset="100%" stopColor="#3A4828" />
                  </linearGradient>

                  {/* Soft Glow Filter */}
                  <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="2.5" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* 1. Scalp Dermis Layer */}
                <path
                  d="M 20,190 Q 150,150 280,190 L 280,230 L 20,230 Z"
                  fill="url(#scalpGrad)"
                  stroke="#8DAA63"
                  strokeWidth="2"
                  strokeOpacity="0.6"
                />

                {/* Scalp Follicle Pores */}
                <circle cx="75" cy="172" r="3" fill="#8DAA63" opacity="0.6" />
                <circle cx="105" cy="165" r="3" fill="#8DAA63" opacity="0.6" />
                <circle cx="140" cy="163" r="4" fill="#8DAA63" opacity="0.8" />
                <circle cx="175" cy="165" r="3" fill="#8DAA63" opacity="0.6" />
                <circle cx="205" cy="172" r="3" fill="#8DAA63" opacity="0.6" />
                <circle cx="235" cy="180" r="3" fill="#8DAA63" opacity="0.6" />

                {/* 2. Oil Droplet Fall Animation */}
                <motion.g
                  initial={{ y: -30, opacity: 0 }}
                  animate={{
                    y: [ -30, 130, 130 ],
                    opacity: [ 0, 1, 0 ]
                  }}
                  transition={{
                    duration: 1.2,
                    times: [ 0, 0.8, 1 ],
                    ease: [0.55, 0.085, 0.68, 0.53]
                  }}
                >
                  <path
                    d="M 140,10 C 140,10 133,22 133,30 C 133,36 136,40 140,40 C 144,40 147,36 147,30 C 147,22 140,10 140,10 Z"
                    fill="url(#amberDropGradient)"
                    filter="url(#glow)"
                  />
                </motion.g>

                {/* 3. Scalp Impact Expanding Glowing Ripple Ring */}
                <motion.ellipse
                  cx="140"
                  cy="163"
                  rx="0"
                  ry="0"
                  fill="none"
                  stroke="#FAF8F5"
                  strokeWidth="2"
                  animate={{
                    rx: [0, 45, 65],
                    ry: [0, 12, 18],
                    opacity: [0, 0.9, 0]
                  }}
                  transition={{
                    duration: 1.4,
                    delay: 0.8,
                    ease: "easeOut"
                  }}
                />

                {/* Secondary Ripple Ring */}
                <motion.ellipse
                  cx="140"
                  cy="163"
                  rx="0"
                  ry="0"
                  fill="none"
                  stroke="#8DAA63"
                  strokeWidth="1.5"
                  animate={{
                    rx: [0, 55, 80],
                    ry: [0, 15, 22],
                    opacity: [0, 0.7, 0]
                  }}
                  transition={{
                    duration: 1.6,
                    delay: 0.95,
                    ease: "easeOut"
                  }}
                />

                {/* 4. Sequential SVG Hair Growth Strands */}
                {hairStrands.map((strand) => (
                  <motion.g key={strand.id}>
                    <motion.path
                      d={strand.path}
                      fill="none"
                      stroke={strand.color}
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{
                        pathLength: [0, 1],
                        opacity: [0, 1]
                      }}
                      transition={{
                        duration: 1.3,
                        delay: strand.delay,
                        ease: [0.34, 1.56, 0.64, 1]
                      }}
                    />
                    <motion.path
                      d={strand.path}
                      fill="none"
                      stroke="#FAF8F5"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{
                        duration: 1.3,
                        delay: strand.delay,
                        ease: [0.34, 1.56, 0.64, 1]
                      }}
                    />
                  </motion.g>
                ))}
              </svg>
            </div>

            {/* Bottom Caption */}
            <div style={{ marginTop: '1rem', textTransform: 'uppercase', fontSize: '0.72rem', color: '#FAF8F5', letterSpacing: '1px', fontWeight: 'bold' }}>
              <Sparkles className="w-3.5 h-3.5 inline mr-1" />
              Real Cold-Pressed Herbal Action
            </div>

          </div>

          {/* Right Explanatory Step List */}
          <div className="science-steps">
            {restorationSteps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                viewport={{ once: true }}
                className="step-card"
              >
                <div className="step-num">
                  0{idx + 1}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.4rem' }}>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.02rem', fontWeight: '700', color: '#FAF8F5', margin: 0 }}>
                      {step.title}
                    </h3>
                    <span style={{
                      fontSize: '0.65rem',
                      color: '#E8CA65',
                      background: 'rgba(212, 175, 55, 0.12)',
                      border: '1px solid rgba(212, 175, 55, 0.28)',
                      padding: '0.15rem 0.55rem',
                      borderRadius: '999px',
                      fontWeight: '700',
                      letterSpacing: '0.02em'
                    }}>
                      {step.benefit}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.875rem', color: 'rgba(250, 248, 245, 0.85)', margin: '0.35rem 0 0', lineHeight: 1.6, fontWeight: '400' }}>
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
