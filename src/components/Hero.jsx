import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, ShoppingBag, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero() {
  const trustSpecs = [
    '25+ Cold-Pressed Herbs',
    'Paraben Free',
    'Sulphate Free',
    'Mineral Oil Free',
    '100% Vegan & Cruelty-Free',
  ];

  return (
    <section id="home" className="hero-section bg-[#FAF8F5] py-10 md:py-16 border-b border-[#1B2E1E]/10 relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          
          {/* Left Text Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAEFE4] border border-[#1B2E1E]/20 text-[#1B2E1E] text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>Pure Botanical Elixir from Khanewal</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#121E14] leading-[1.15] mb-4">
              Healthy Hair Starts at the <span className="text-[#3A4828] italic font-normal">Roots</span>
            </h1>

            {/* Sub-headline */}
            <p className="text-sm sm:text-base text-[#4F5E52] leading-relaxed mb-6 font-sans">
              Nourish your scalp with <strong>25+ cold-pressed herbs</strong>. Formulated to revive dormant follicles, eliminate hair fall, and boost rich natural volume. Free from Parabens, Sulphates, and Mineral Oils.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <a
                href="https://wa.me/923061041609?text=Hi%20Veelana%20Team%2C%20I%20want%20to%20order%20the%20Herbal%20Hair%20Oil"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-olive px-6 py-3.5 rounded-full font-bold text-sm flex items-center justify-center gap-2 shadow-md w-full sm:w-auto"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Order via WhatsApp</span>
              </a>

              <Link
                to="/products"
                className="btn-outline-olive px-6 py-3.5 rounded-full font-bold text-sm flex items-center justify-center gap-2 w-full sm:w-auto text-center"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Explore Sizes (100ml & 250ml)</span>
              </Link>
            </div>

            {/* Key Trust Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-4 border-t border-[#1B2E1E]/15">
              {trustSpecs.map((spec, i) => (
                <div key={i} className="flex items-center gap-1.5 text-xs font-semibold text-[#121E14]">
                  <CheckCircle2 className="w-4 h-4 text-[#3A4828] shrink-0" />
                  <span>{spec}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Product Graphic Showcase */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative"
          >
            <div className="rounded-3xl overflow-hidden border border-[#1B2E1E]/15 shadow-xl bg-white relative">
              <img
                src="/assets/real_full_set_boxes.jpg"
                alt="Veelana Official Product Bottles and Packaging Set"
                className="w-full h-auto object-cover block"
                loading="eager"
              />

              {/* Official Seal Badge */}
              <div className="absolute top-3 right-3 bg-[#EAEFE4] border border-[#1B2E1E]/20 px-3 py-1.5 rounded-2xl flex items-center gap-2 shadow-md">
                <img
                  src="/assets/official_png_logo.png"
                  alt="Veelana Official Seal"
                  className="h-8 w-auto object-contain shrink-0"
                  style={{ mixBlendMode: 'multiply' }}
                />
                <div>
                  <span className="block text-[11px] font-bold text-[#121E14]">MADE WITH 25+ HERBS</span>
                  <span className="block text-[9px] text-[#4F5D38] uppercase font-semibold">100% Cold-Pressed</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
