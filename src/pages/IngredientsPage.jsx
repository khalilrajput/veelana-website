import React from 'react';
import IngredientsGrid from '../components/IngredientsGrid';
import { Leaf } from 'lucide-react';

export default function IngredientsPage() {
  return (
    <div className="py-12 bg-[#FAF8F5]">
      <title>25+ Pure Cold-Pressed Herbs &amp; Ingredients | Veelana Hair Oil Formula</title>
      <meta name="description" content="Discover 25+ organic cold-pressed herbs in Veelana: Amla, Bhringraj, Brahmi, Rosemary, Castor Oil, Fenugreek & more. Learn each herb's scalp benefits and clinical properties." />
      <meta property="og:title" content="25+ Pure Cold-Pressed Herbs & Ingredients | Veelana Hair Oil Formula" />
      <meta property="og:description" content="Discover 25+ organic cold-pressed herbs in Veelana: Amla, Bhringraj, Brahmi, Rosemary, Castor Oil, Fenugreek & more. Learn each herb's scalp benefits and clinical properties." />
      <meta property="og:url" content="https://www.veelana.online/ingredients" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://www.veelana.online/assets/real_full_set_boxes.webp" />
      <meta name="twitter:title" content="25+ Pure Cold-Pressed Herbs & Ingredients | Veelana Hair Oil Formula" />
      <meta name="twitter:description" content="Discover 25+ organic cold-pressed herbs in Veelana: Amla, Bhringraj, Brahmi, Rosemary, Castor Oil, Fenugreek & more. Learn each herb's scalp benefits and clinical properties." />
      <link rel="canonical" href="https://www.veelana.online/ingredients" />
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

