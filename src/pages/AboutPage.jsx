import React from 'react';
import { Leaf, ShieldCheck, Heart, Sparkles, ArrowRight } from 'lucide-react';
import { getWhatsAppUrl } from '../utils/whatsapp';

export default function AboutPage({ onOpenOrder }) {
  return (
    <div className="py-12 bg-[#FAF8F5] min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="section-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EAEFE4] border border-[#1B2E1E]/20 text-[#1B2E1E] text-xs font-bold uppercase tracking-wider mb-3">
            <Leaf className="w-4 h-4 text-[#D4AF37]" />
            Botanical Heritage & Craftsmanship
          </div>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-[#121E14]">
            Our Story: Handcrafted Botanical Excellence
          </h1>
          <p className="text-sm md:text-base text-[#4F5E52] max-w-2xl mx-auto mt-3">
            Preserving traditional 72-hour slow cold-pressed herbal extraction methods passed down through generations in Punjab.
          </p>
        </div>

        {/* Hero Visual Card */}
        <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm mb-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#121E14]">
              Born Out of Necessity & Organic Purity
            </h2>
            <p className="text-xs md:text-sm text-[#4F5E52] leading-relaxed">
              Commercial hair care products in Pakistan are heavily reliant on mineral oils (liquid paraffin) and artificial fragrances. These synthetic fillers form an occlusive barrier over the scalp, suffocating hair follicles and accelerating hair fall.
            </p>
            <p className="text-xs md:text-sm text-[#4F5E52] leading-relaxed">
              Veelana was founded in <strong>Punjab, Pakistan</strong> to offer a 100% clean, unadulterated botanical solution. We source 25+ fresh herbs directly from fertile local soils and cold-press them without thermal destruction.
            </p>
          </div>

          <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-inner bg-[#FAF8F5] max-h-80 flex items-center justify-center p-4">
            <img
              src="/assets/real_full_set_boxes.webp"
              alt="Veelana Official Product Boxes and Bottles"
              className="max-h-full max-w-full object-contain"
              loading="lazy"
            />
          </div>
        </div>

        {/* 3 Brand Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm text-center">
            <div className="w-12 h-12 rounded-xl bg-[#EAEFE4] text-[#1B2E1E] flex items-center justify-center mx-auto mb-4">
              <Leaf className="w-6 h-6 text-[#4F5D38]" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#121E14] mb-1">25+ Cold-Pressed Herbs</h3>
            <p className="text-xs text-[#5F6C50]">Slow maceration preserves Vitamin C, ricinoleic acid, and key botanical lipids.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm text-center">
            <div className="w-12 h-12 rounded-xl bg-[#EAEFE4] text-[#1B2E1E] flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#121E14] mb-1">0% Mineral Oils & Parabens</h3>
            <p className="text-xs text-[#5F6C50]">Strictly free from paraffin, synthetic dyes, sulphates, and chemical preservatives.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm text-center">
            <div className="w-12 h-12 rounded-xl bg-[#EAEFE4] text-[#1B2E1E] flex items-center justify-center mx-auto mb-4">
              <Heart className="w-6 h-6 text-[#25D366]" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#121E14] mb-1">Fresh Batch Production</h3>
            <p className="text-xs text-[#5F6C50]">Crafted in small, fresh batches and dispatched directly to your doorstep across Pakistan.</p>
          </div>
        </div>

        {/* CTA Card */}
        <div className="bg-[#1B2E1E] text-white rounded-3xl p-8 shadow-xl text-center space-y-4">
          <Sparkles className="w-8 h-8 text-[#D4AF37] mx-auto" />
          <h2 className="font-serif text-2xl md:text-3xl font-bold">Experience Fresh Batch Herbal Nourishment</h2>
          <p className="text-xs md:text-sm text-gray-300 max-w-lg mx-auto">
            Try Veelana Hair Care Oil today. Available in 100ml Trial Size (Rs. 999) and 200ml Value Pack (Rs. 1,899).
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => onOpenOrder ? onOpenOrder('200ml') : window.open(getWhatsAppUrl('Hi Veelana Team, I want to order from About page'), '_blank')}
              className="px-8 py-3.5 bg-[#D4AF37] hover:bg-[#B89628] text-[#121E14] font-bold rounded-2xl text-xs uppercase tracking-wider transition shadow-lg flex items-center gap-2"
            >
              <span>Order Now — Rs. 1,899</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
