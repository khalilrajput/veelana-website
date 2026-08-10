import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone, Globe, MessageCircle, ArrowUp } from 'lucide-react';

export default function Footer({ onOpenAdmin }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer bg-[#121E14] text-[#FAF8F5] pt-12 pb-8 border-t border-[#D4AF37]/20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10 border-b border-[#FAF8F5]/15">
          
          {/* Brand Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/assets/official_png_logo.png"
                alt="Veelana Logo"
                className="h-10 w-auto filter brightness-0 invert shrink-0"
              />
              <div>
                <h4 className="font-serif text-2xl font-bold text-[#FAF8F5]">VEELANA</h4>
                <p className="text-[10px] text-[#D4AF37] tracking-widest uppercase font-bold">Herbal Hair Care</p>
              </div>
            </div>
            <p className="text-xs md:text-sm text-[#FAF8F5]/80 leading-relaxed max-w-sm mb-4">
              Handcrafted in Khanewal City using 25+ cold-pressed herbs. Pure, cruelty-free, paraben-free, and mineral-oil free root elixir.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/923061041609"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 border border-white/25 text-[#25D366] flex items-center justify-center hover:bg-white/20 transition"
                aria-label="WhatsApp Direct"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest mb-4">PAGES & NAVIGATION</h4>
            <ul className="flex flex-col gap-2.5 text-xs text-[#FAF8F5]/80 font-medium">
              <li><Link to="/" className="hover:text-white transition">Home Page</Link></li>
              <li><Link to="/products" className="hover:text-white transition">Products Catalog (100ml & 250ml)</Link></li>
              <li><Link to="/why-veelana" className="hover:text-white transition">Why Veelana (5 Commitments)</Link></li>
              <li><Link to="/ingredients" className="hover:text-white transition">25+ Cold-Pressed Herbs</Link></li>
              <li><Link to="/how-to-use" className="hover:text-white transition">How to Use (4 Steps)</Link></li>
              <li><Link to="/reviews" className="hover:text-white transition">Customer Reviews</Link></li>
              <li><Link to="/contact" className="hover:text-white transition">Contact & Origin</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest mb-4">ORIGIN & DIRECT CONTACT</h4>
            <ul className="flex flex-col gap-3 text-xs text-[#FAF8F5]/85">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>Khanewal City, Postal Code 58150, Punjab, Pakistan</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#25D366] shrink-0" />
                <a href="https://wa.me/923061041609" className="text-[#25D366] font-mono font-bold hover:underline">
                  +92 306 1041609
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <a href="mailto:info@veelana.online" className="underline hover:text-white">
                  info@veelana.online
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <a href="https://veelana.online" className="underline hover:text-white">
                  veelana.online
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright & Admin CMS Trigger */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#FAF8F5]/65 gap-3">
          <p>© {new Date().getFullYear()} Veelana Herbal Hair Care (veelana.online). All Rights Reserved. Crafted in Khanewal, Pakistan.</p>

          <div className="flex items-center gap-5">
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="text-[#D4AF37] font-bold underline hover:text-white transition"
              >
                🔐 Store Admin CMS
              </button>
            )}

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 font-bold text-white hover:text-[#D4AF37] transition"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
