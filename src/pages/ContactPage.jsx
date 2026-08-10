import React from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import { getWhatsAppUrl } from '../utils/whatsapp';

export default function ContactPage() {
  return (
    <div className="py-12 bg-[#FAF8F5] min-h-screen">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-12">
          <div className="section-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EAEFE4] border border-[#1B2E1E]/20 text-[#1B2E1E] text-xs font-bold uppercase tracking-wider mb-3">
            <MapPin className="w-4 h-4 text-[#D4AF37]" />
            Khanewal Origin & Customer Support
          </div>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-[#121E14]">
            Get in Touch with Veelana
          </h1>
          <p className="text-sm md:text-base text-[#4F5E52] max-w-2xl mx-auto mt-3">
            Have questions about your hair type or placing an order? Our customer team in Khanewal is ready to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Contact Details Card */}
          <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm space-y-6">
            <h3 className="font-serif text-2xl font-bold text-[#121E14]">Contact Information</h3>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl bg-[#EAEFE4] text-[#1B2E1E] flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <div>
                <strong className="block text-sm font-bold text-[#121E14]">Origin & Address</strong>
                <p className="text-xs text-[#4F5E52] mt-0.5">Khanewal City, Postal Code 58150, Punjab, Pakistan</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl bg-[#EAEFE4] text-[#1B2E1E] flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-[#25D366]" />
              </div>
              <div>
                <strong className="block text-sm font-bold text-[#121E14]">WhatsApp Support & Orders</strong>
                <a href={getWhatsAppUrl('Hi Veelana Team, I have a question about ordering')} className="text-xs font-bold text-[#25D366] hover:underline mt-0.5 block" target="_blank" rel="noopener noreferrer">
                  +92 306 1041609
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl bg-[#EAEFE4] text-[#1B2E1E] flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <div>
                <strong className="block text-sm font-bold text-[#121E14]">Email Address</strong>
                <a href="mailto:info@veelana.online" className="text-xs text-[#4F5E52] hover:underline mt-0.5 block">
                  info@veelana.online
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl bg-[#EAEFE4] text-[#1B2E1E] flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <div>
                <strong className="block text-sm font-bold text-[#121E14]">Operating Hours</strong>
                <p className="text-xs text-[#4F5E52] mt-0.5">Monday – Saturday: 9:00 AM – 9:00 PM PKT</p>
              </div>
            </div>
          </div>

          {/* Direct WhatsApp Callout Card */}
          <div className="bg-[#1B2E1E] text-white rounded-3xl p-8 shadow-xl flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#25D366]/20 text-[#25D366] flex items-center justify-center mb-6">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-bold mb-3">Fast WhatsApp Dispatch</h3>
              <p className="text-xs md:text-sm text-gray-300 leading-relaxed mb-6">
                Place your order directly via WhatsApp for instant confirmation, fast delivery tracking across Pakistan, and custom advice for severe hair fall.
              </p>
            </div>

            <a
              href={getWhatsAppUrl('Hi Veelana Team, I want to place an order')}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 bg-[#25D366] text-[#121E14] font-bold rounded-2xl text-center text-sm flex items-center justify-center gap-2 hover:bg-white transition shadow-lg"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>Chat Directly on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
