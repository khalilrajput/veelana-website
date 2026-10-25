import React from 'react';
import ProductShowcase from '../components/ProductShowcase';
import { ShoppingBag, ShieldCheck } from 'lucide-react';

export default function ProductsPage({ onOpenOrder }) {
  return (
    <div className="py-12 bg-[#FAF8F5]">
      <title>Buy Veelana Hair Oil Online | 100ml Rs.999 &amp; 200ml Rs.1899 | Free COD Pakistan</title>
      <meta name="description" content="Shop Veelana cold-pressed herbal hair oil. Choose 100ml starter (Rs.999) or 200ml value pack (Rs.1899). Nationwide Cash on Delivery. Paraben-free, vegan hair growth oil." />
      <meta property="og:title" content="Buy Veelana Hair Oil Online | 100ml Rs.999 & 200ml Rs.1899 | Free COD Pakistan" />
      <meta property="og:description" content="Shop Veelana cold-pressed herbal hair oil. Choose 100ml starter (Rs.999) or 200ml value pack (Rs.1899). Nationwide Cash on Delivery. Paraben-free, vegan hair growth oil." />
      <meta property="og:url" content="https://www.veelana.online/products" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://www.veelana.online/assets/real_full_set_boxes.webp" />
      <meta name="twitter:title" content="Buy Veelana Hair Oil Online | 100ml Rs.999 & 200ml Rs.1899 | Free COD Pakistan" />
      <meta name="twitter:description" content="Shop Veelana cold-pressed herbal hair oil. Choose 100ml starter (Rs.999) or 200ml value pack (Rs.1899). Nationwide Cash on Delivery. Paraben-free, vegan hair growth oil." />
      <link rel="canonical" href="https://www.veelana.online/products" />
      <div className="container mx-auto px-4 max-w-5xl text-center mb-8">
        <div className="section-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EAEFE4] border border-[#1B2E1E]/20 text-[#1B2E1E] text-xs font-bold uppercase tracking-wider mb-3">
          <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
          Official Product Catalog
        </div>
        <h1 className="font-serif text-3xl md:text-5xl font-bold text-[#121E14]">
          Choose Your Veelana Experience
        </h1>
        <p className="text-sm md:text-base text-[#4F5E52] max-w-2xl mx-auto mt-3">
          Direct WhatsApp ordering with priority dispatch across Pakistan. Handcrafted in small fresh batches.
        </p>
      </div>

      <ProductShowcase onOpenOrder={onOpenOrder} />
    </div>
  );
}

