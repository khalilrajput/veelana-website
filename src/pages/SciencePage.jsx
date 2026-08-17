import React from 'react';
import ScienceAnimation from '../components/ScienceAnimation';
import ValueGrid from '../components/ValueGrid';
import { Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SciencePage() {
  return (
    <div className="py-12 bg-[#FAF8F5]">
      <div className="container mx-auto px-4 max-w-5xl text-center mb-12">
        <div className="section-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EAEFE4] border border-[#1B2E1E]/20 text-[#1B2E1E] text-xs font-bold uppercase tracking-wider mb-3">
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          Dermal Papilla & Follicle Science
        </div>
        <h1 className="font-serif text-3xl md:text-5xl font-bold text-[#121E14]">
          The Biological Science of Scalp Restoration
        </h1>
        <p className="text-sm md:text-base text-[#4F5E52] max-w-2xl mx-auto mt-4 leading-relaxed">
          Learn how slow cold-pressing preserves vital unrefined lipids that penetrate deep into the hair shaft, restoring dormant follicles without synthetic mineral oils.
        </p>
      </div>

      <ScienceAnimation />
      <ValueGrid />

      <div className="container mx-auto px-4 max-w-4xl text-center py-12">
        <div className="p-8 rounded-3xl bg-[#1B2E1E] text-white shadow-xl">
          <h3 className="font-serif text-2xl md:text-3xl font-bold mb-3">Ready to Experience Follicle Revival?</h3>
          <p className="text-sm text-gray-300 mb-6 max-w-xl mx-auto">
            Choose your size today and experience 100% natural, cold-pressed botanical hair care crafted with botanical purity.
          </p>
          <Link to="/products" className="btn-olive bg-[#D4AF37] text-[#121E14] hover:bg-white inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold">
            Explore Products & Sizes <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
