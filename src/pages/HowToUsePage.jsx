import React from 'react';
import HowToUse from '../components/HowToUse';
import { Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HowToUsePage() {
  return (
    <div className="py-12 bg-[#FAF8F5]">
      <div className="container mx-auto px-4 max-w-5xl text-center mb-8">
        <div className="section-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EAEFE4] border border-[#1B2E1E]/20 text-[#1B2E1E] text-xs font-bold uppercase tracking-wider mb-3">
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          Optimal Hair Oiling Ritual
        </div>
        <h1 className="font-serif text-3xl md:text-5xl font-bold text-[#121E14]">
          4 Easy Steps to Maximum Follicle Growth
        </h1>
        <p className="text-sm md:text-base text-[#4F5E52] max-w-2xl mx-auto mt-3">
          Follow our authentic botanical oiling routine 3 times per week to nourish your roots and stop hair fall.
        </p>
      </div>

      <HowToUse />

      <div className="container mx-auto px-4 max-w-3xl text-center py-8">
        <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm">
          <h3 className="font-serif text-xl font-bold text-[#121E14] mb-2">Pro Scalp Tip</h3>
          <p className="text-xs md:text-sm text-[#4F5E52] mb-6">
            For maximum absorption, warm 10-15ml of Veelana oil between your palms before applying, and massage in circular upward motions for 5 minutes.
          </p>
          <Link to="/products" className="btn-olive inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold">
            Order Your Bottle Now <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
