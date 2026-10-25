import React from 'react';
import ValueGrid from '../components/ValueGrid';
import { ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function WhyVeelanaPage() {
  return (
    <div className="py-12 bg-[#FAF8F5]">
      <title>Why Choose Veelana | 0% Mineral Oil, 100% Organic Cold-Pressed Hair Care</title>
      <meta name="description" content="5 clean purity commitments: zero mineral oils, zero parabens, 100% cold-pressed extraction, 100% vegan & cruelty-free. See why Pakistani families trust Veelana." />
      <meta property="og:title" content="Why Choose Veelana | 0% Mineral Oil, 100% Organic Cold-Pressed Hair Care" />
      <meta property="og:description" content="5 clean purity commitments: zero mineral oils, zero parabens, 100% cold-pressed extraction, 100% vegan & cruelty-free. See why Pakistani families trust Veelana." />
      <meta property="og:url" content="https://www.veelana.online/why-veelana" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://www.veelana.online/assets/real_full_set_boxes.webp" />
      <meta name="twitter:title" content="Why Choose Veelana | 0% Mineral Oil, 100% Organic Cold-Pressed Hair Care" />
      <meta name="twitter:description" content="5 clean purity commitments: zero mineral oils, zero parabens, 100% cold-pressed extraction, 100% vegan & cruelty-free. See why Pakistani families trust Veelana." />
      <link rel="canonical" href="https://www.veelana.online/why-veelana" />
      <div className="container mx-auto px-4 max-w-5xl text-center mb-10">
        <div className="section-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EAEFE4] border border-[#1B2E1E]/20 text-[#1B2E1E] text-xs font-bold uppercase tracking-wider mb-3">
          <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
          5 Clean Purity Commitments
        </div>
        <h1 className="font-serif text-3xl md:text-5xl font-bold text-[#121E14]">
          Why Discerning Families Choose Veelana
        </h1>
        <p className="text-sm md:text-base text-[#4F5E52] max-w-2xl mx-auto mt-4 leading-relaxed">
          We reject cheap mineral oils, parabens, sulfates, and synthetic chemicals. Every drop of Veelana is 100% organic, vegan, and slow-pressed using traditional botanical heritage.
        </p>
      </div>

      <ValueGrid />

      <div className="container mx-auto px-4 max-w-4xl py-12">
        <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
          <h3 className="font-serif text-2xl font-bold text-[#121E14] mb-4 text-center">Our Pure Formulation Standard</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-[#4F5E52]">
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-gray-100 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#4F5D38] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-[#121E14]">0% Mineral Oil & Liquid Paraffin</strong>
                <span>Never clogs scalp pores or leaves toxic petroleum residue.</span>
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-gray-100 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#4F5D38] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-[#121E14]">0% Parabens & Phthalates</strong>
                <span>Free from hormone-disrupting artificial preservatives.</span>
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-gray-100 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#4F5D38] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-[#121E14]">100% Cold-Pressed Extraction</strong>
                <span>Nutrients are preserved without destructive industrial heat.</span>
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-gray-100 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#4F5D38] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-[#121E14]">100% Vegan & Cruelty-Free</strong>
                <span>Sourced responsibly from certified organic herbal growers in Punjab.</span>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link to="/products" className="btn-olive inline-flex items-center gap-2 px-8 py-3 rounded-full font-bold">
              Shop Veelana Hair Care <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

