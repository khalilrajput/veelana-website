import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/923061041609?text=Hi,%20I%20have%20a%20question%20about%20Veelana%20Herbal%20Hair%20Oil"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-[#121E14] p-4 rounded-full shadow-2xl whatsapp-pulse flex items-center justify-center group hover:scale-110 transition-transform duration-300"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-7 h-7 fill-current" />
      
      {/* Tooltip on Hover */}
      <span className="absolute right-16 bg-[#0F1C11] text-[#FDFBF7] text-xs font-semibold px-3 py-1.5 rounded-xl border border-[#D4AF37]/40 shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Order on WhatsApp (+92 306 1041609)
      </span>
    </a>
  );
}
