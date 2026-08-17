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
        <div className="text-center" style={{ marginBottom: '3.5rem' }}>
          <div className="section-badge" style={{ background: 'rgba(250, 248, 245, 0.15)', borderColor: 'rgba(250, 248, 245, 0.3)', color: '#FAF8F5' }}>
            <Activity className="w-4 h-4 text-[#FAF8F5]" />
            Continuous Micro-Nutrient Delivery
          </div>
          <h2 className="section-title" style={{ color: '#FAF8F5' }}>
            How Veelana Restores Your Hair
          </h2>
          <p className="section-subtitle" style={{ color: 'rgba(250, 248, 245, 0.85)' }}>
            Witness the biological interaction when cold-pressed herbal oil impacts dormant scalp follicles.
          </p>
        </div>

        <div className="science-grid">
          
          {/* Left SVG Interactive Animation Container */}
          <div className="science-card">
            
            {/* Status Pill */}
            <div style={{
              background: 'rgba(250, 248, 245, 0.15)',
              padding: '0.45rem 1.1rem',
              borderRadius: '9999px',
              border: '1px solid rgba(250, 248, 245, 0.3)',
              fontSize: '0.78rem',
              color: '#FAF8F5',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontWeight: '600',
              marginBottom: '1rem'
            }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#8DAA63' }}></span>
              Live Follicle Simulation
            </div>

            {/* SVG Canvas */}
            <div className="svg-animation-canvas" style={{ width: '100%', maxWidth: '340px', height: '260px' }}>
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
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="step-card"
              >
                <div className="step-num">
                  {idx + 1}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 'bold', color: '#FAF8F5' }}>
                      {step.title}
                    </h3>
                    <span style={{ fontSize: '0.72rem', color: '#3A4828', background: '#EAEFE4', padding: '0.2rem 0.65rem', borderRadius: '9999px', fontFamily: 'sans-serif', fontWeight: 'bold' }}>
                      {step.benefit}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.88rem', color: 'rgba(250, 248, 245, 0.85)', marginTop: '0.25rem', fontWeight: '300' }}>
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
