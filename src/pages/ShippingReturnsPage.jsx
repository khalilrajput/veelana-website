import React from 'react';
import { Truck, RotateCcw, ShieldCheck, MessageCircle } from 'lucide-react';
import { getWhatsAppUrl } from '../utils/whatsapp';

export default function ShippingReturnsPage({ onOpenOrder }) {
  return (
    <div className="py-12 bg-[#FAF8F5] min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="section-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EAEFE4] border border-[#1B2E1E]/20 text-[#1B2E1E] text-xs font-bold uppercase tracking-wider mb-3">
            <Truck className="w-4 h-4 text-[#D4AF37]" />
            Shipping & Return Policy
          </div>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-[#121E14]">
            Delivery Timelines & Exchange Policy
          </h1>
          <p className="text-sm md:text-base text-[#4F5E52] max-w-2xl mx-auto mt-3">
            Transparent shipping terms across Pakistan and simple, reliable order support.
          </p>
        </div>

        {/* 2 Column Policy Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          
          {/* Shipping Policy Card */}
          <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#EAEFE4] text-[#1B2E1E] flex items-center justify-center shrink-0">
                <Truck className="w-5 h-5 text-[#4F5D38]" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#121E14]">Shipping Terms</h3>
            </div>

            <ul className="space-y-4 text-xs md:text-sm text-[#4F5E52] leading-relaxed">
              <li className="flex items-start gap-2.5">
                <span className="font-bold text-[#121E14]">•</span>
                <span><strong>Origin:</strong> All fresh batches are packaged and shipped directly from our dedicated production hub in <strong>Punjab, Pakistan</strong>.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="font-bold text-[#121E14]">•</span>
                <span><strong>Timeline:</strong> Delivery takes <strong>2 to 3 working days</strong> across major Pakistan cities (Lahore, Karachi, Islamabad, Rawalpindi, Multan, Faisalabad, Peshawar, Quetta).</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="font-bold text-[#121E14]">•</span>
                <span><strong>Cash on Delivery (COD):</strong> Supported for all orders. You pay in cash directly to the courier agent upon arrival.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="font-bold text-[#121E14]">•</span>
                <span><strong>Tracking:</strong> Once dispatched, courier tracking numbers are sent via WhatsApp.</span>
              </li>
            </ul>
          </div>

          {/* Returns & Exchange Policy Card */}
          <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#EAEFE4] text-[#1B2E1E] flex items-center justify-center shrink-0">
                <RotateCcw className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#121E14]">7-Day Return & Exchange</h3>
            </div>

            <ul className="space-y-4 text-xs md:text-sm text-[#4F5E52] leading-relaxed">
              <li className="flex items-start gap-2.5">
                <span className="font-bold text-[#121E14]">•</span>
                <span><strong>Damaged / Leaking Bottle:</strong> If your product arrives damaged or leaking during transit, notify us on WhatsApp within <strong>7 days</strong> for a free replacement.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="font-bold text-[#121E14]">•</span>
                <span><strong>Wrong Item Received:</strong> If an incorrect bottle size was delivered, we will dispatch the correct bottle immediately at zero extra shipping charge.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="font-bold text-[#121E14]">•</span>
                <span><strong>Support Channel:</strong> Simply message us at <strong>+92 306 1041609</strong> with your Order ID and parcel photo.</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Direct WhatsApp Callout */}
        <div className="bg-[#1B2E1E] text-white rounded-3xl p-8 shadow-xl text-center space-y-4">
          <ShieldCheck className="w-8 h-8 text-[#D4AF37] mx-auto" />
          <h3 className="font-serif text-2xl font-bold">Need Help With an Active Order?</h3>
          <p className="text-xs md:text-sm text-gray-300 max-w-lg mx-auto">
            Contact our customer support desk on WhatsApp for immediate dispatch confirmation or tracking updates.
          </p>
          <a
            href={getWhatsAppUrl('Hi Veelana Team, I need help with shipping/order status')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#25D366] text-[#121E14] font-bold rounded-2xl text-xs uppercase tracking-wider shadow-lg hover:bg-white transition"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Chat Directly on WhatsApp (+92 306 1041609)</span>
          </a>
        </div>

      </div>
    </div>
  );
}
