import React from 'react';
import IngredientsGrid from '../components/IngredientsGrid';
import { Leaf } from 'lucide-react';

export default function IngredientsPage() {
  return (
    <div className="py-12 bg-[#FAF8F5]">
      <div className="container mx-auto px-4 max-w-5xl text-center mb-8">
        <div className="section-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EAEFE4] border border-[#1B2E1E]/20 text-[#1B2E1E] text-xs font-bold uppercase tracking-wider mb-3">
          <Leaf className="w-4 h-4 text-[#D4AF37]" />
          25+ Pure Cold-Pressed Herbs
        </div>
        <h1 className="font-serif text-3xl md:text-5xl font-bold text-[#121E14]">
          Harnessing Nature's Potent Botanical Elixirs
        </h1>
        <p className="text-sm md:text-base text-[#4F5E52] max-w-2xl mx-auto mt-3">
          Click any botanical herb below to discover its active compounds and clinical scalp benefits.
        </p>
      </div>

      <IngredientsGrid />
    </div>
  );
}
