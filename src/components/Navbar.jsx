import React, { useState } from 'react';
import { Menu, X, MapPin, Leaf, PhoneCall } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Science', href: '#science' },
    { name: 'Why Veelana', href: '#why-veelana' },
    { name: 'Products', href: '#products' },
    { name: 'Ingredients', href: '#ingredients' },
    { name: 'Blog', href: '#blog' },
    { name: 'How to Use', href: '#how-to-use' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 1000, width: '100%' }}>
      {/* Top Bar Badge */}
      <div className="top-bar">
        <span className="flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5" />
          📍 Crafted in Khanewal City, Punjab, Pakistan
        </span>
        <span style={{ opacity: 0.4 }}>|</span>
        <span className="flex items-center gap-1">
          <Leaf className="w-3.5 h-3.5" />
          🌿 100% Vegan, Organic & Cold-Pressed
        </span>
      </div>

      {/* Main Glass Nav */}
      <nav className="glass-nav">
        <div className="container nav-container">
          {/* Brand Logo with Official Olive Vector PNG */}
          <a href="#home" className="nav-brand">
            <img
              src="/assets/official_png_logo.png"
              alt="Veelana Official Olive Vector Logo"
              style={{
                height: '46px',
                width: 'auto',
                maxWidth: '120px',
                objectFit: 'contain',
                mixBlendMode: 'multiply',
                flexShrink: 0
              }}
            />
            <div className="brand-text-box">
              <span className="brand-title" style={{ color: '#3A4828' }}>VEELANA</span>
              <span className="brand-subtitle" style={{ color: '#4F5D38' }}>HERBAL HAIR CARE</span>
            </div>
          </a>

          {/* Desktop Links */}
          <ul className="nav-links">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href} className="nav-link" style={{ color: '#2A361E' }}>
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-3" style={{ flexShrink: 0 }}>
            <a
              href="https://wa.me/923061041609"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-olive"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Order on WhatsApp</span>
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-menu-btn"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="nav-link"
              style={{ fontSize: '1.1rem', padding: '0.5rem 0', borderBottom: '1px solid rgba(79, 93, 56, 0.15)', color: '#3A4828' }}
            >
              {link.name}
            </a>
          ))}
          <a
            href="https://wa.me/923061041609"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-olive"
            style={{ marginTop: '1rem', width: '100%' }}
          >
            Order on WhatsApp (+92 306 1041609)
          </a>
        </div>
      )}
    </header>
  );
}
