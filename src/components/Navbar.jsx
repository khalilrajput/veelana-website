import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, MapPin, Leaf, PhoneCall, ChevronRight, MessageCircle } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Why Veelana', path: '/why-veelana' },
    { name: '25+ Herbs', path: '/ingredients' },
    { name: 'How to Use', path: '/how-to-use' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full shadow-sm bg-[#FDFBF7]">
      {/* Top Bar Badge */}
      <div className="top-bar bg-[#1B2E1E] text-[#FDFBF7] py-1.5 px-4 text-[11px] font-semibold flex items-center justify-center gap-3 tracking-wide">
        <span className="flex items-center gap-1">
          <MapPin className="w-3 h-3 text-[#D4AF37]" />
          📍 Khanewal City, Punjab, Pakistan
        </span>
        <span className="opacity-40">|</span>
        <span className="flex items-center gap-1">
          <Leaf className="w-3 h-3 text-[#D4AF37]" />
          🌿 100% Organic & Cold-Pressed
        </span>
      </div>

      {/* Main Glass Nav */}
      <nav className="glass-nav border-b border-[#7A8B63]/20 bg-[#FAF8F5]/95 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="nav-brand flex items-center gap-2.5">
            <img
              src="/assets/official_png_logo.png"
              alt="Veelana Official Olive Logo"
              className="h-10 w-auto object-contain shrink-0"
              style={{ mixBlendMode: 'multiply' }}
            />
            <div className="brand-text-box">
              <span className="brand-title block text-lg font-serif font-bold text-[#1B2E1E] leading-none">VEELANA</span>
              <span className="brand-subtitle block text-[9px] font-bold text-[#4F5D38] uppercase tracking-widest mt-0.5">HERBAL HAIR CARE</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <ul className="hidden lg:flex items-center gap-6 text-xs font-bold uppercase tracking-wider">
            {navLinks.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `transition-colors py-1 ${
                      isActive
                        ? 'text-[#1B2E1E] border-b-2 border-[#1B2E1E] font-extrabold'
                        : 'text-[#4F5E52] hover:text-[#1B2E1E]'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="https://wa.me/923061041609"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-olive hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold shadow-sm"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Order WhatsApp</span>
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-[#1B2E1E] bg-[#EAEFE4] border border-[#1B2E1E]/20 hover:bg-[#1B2E1E] hover:text-white transition"
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* LUXURY MOBILE NAVIGATION DRAWER */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[88px] bg-[#FAF8F5] border-b-2 border-[#1B2E1E] shadow-2xl z-50 p-5 space-y-2 animate-in slide-in-from-top duration-300 max-h-[82vh] overflow-y-auto">
          <div className="grid grid-cols-1 gap-1.5">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between p-3 rounded-xl text-sm font-bold transition ${
                    isActive
                      ? 'bg-[#1B2E1E] text-white shadow-sm'
                      : 'bg-white text-[#121E14] hover:bg-[#EAEFE4] border border-gray-100'
                  }`
                }
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 opacity-60" />
              </NavLink>
            ))}
          </div>

          <a
            href="https://wa.me/923061041609?text=Hi%20Veelana%20Team%2C%20I%20want%20to%20order"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 bg-[#25D366] text-[#121E14] font-bold rounded-xl text-center text-sm flex items-center justify-center gap-2 shadow-md mt-4"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            <span>Order Directly on WhatsApp (+92 306 1041609)</span>
          </a>
        </div>
      )}
    </header>
  );
}
