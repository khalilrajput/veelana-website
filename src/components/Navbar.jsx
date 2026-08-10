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
    <header style={{ position: 'sticky', top: 0, zIndex: 1000, width: '100%' }}>
      {/* Top Bar Badge */}
      <div className="top-bar">
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
          <MapPin style={{ width: '14px', height: '14px', color: '#D4AF37' }} />
          📍 Khanewal City, Punjab, Pakistan
        </span>
        <span style={{ opacity: 0.4 }}>|</span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
          <Leaf style={{ width: '14px', height: '14px', color: '#D4AF37' }} />
          🌿 100% Organic & Cold-Pressed
        </span>
      </div>

      {/* Main Glass Nav */}
      <nav className="glass-nav">
        <div className="container nav-container">
          {/* Brand Logo */}
          <Link to="/" className="nav-brand">
            <img
              src="/assets/official_png_logo.png"
              alt="Veelana Official Olive Logo"
              style={{
                height: '42px',
                width: 'auto',
                maxWidth: '110px',
                objectFit: 'contain',
                mixBlendMode: 'multiply',
                flexShrink: 0
              }}
            />
            <div className="brand-text-box">
              <span className="brand-title">VEELANA</span>
              <span className="brand-subtitle">HERBAL HAIR CARE</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <ul className="nav-links">
            {navLinks.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `nav-link ${isActive ? 'active' : ''}`
                  }
                  style={({ isActive }) => ({
                    color: isActive ? '#1B2E1E' : '#4F5E52',
                    borderBottom: isActive ? '2px solid #1B2E1E' : 'none',
                    fontWeight: isActive ? '700' : '600',
                    paddingBottom: '4px'
                  })}
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* CTA & Mobile Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
            <a
              href="https://wa.me/923061041609"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-olive"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.55rem 1.25rem', fontSize: '0.8rem' }}
            >
              <PhoneCall style={{ width: '14px', height: '14px' }} />
              <span>Order WhatsApp</span>
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-menu-btn"
              aria-label="Toggle Mobile Menu"
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.35rem' }}
            >
              {mobileMenuOpen ? <X style={{ width: '24px', height: '24px' }} /> : <Menu style={{ width: '24px', height: '24px' }} />}
            </button>
          </div>
        </div>
      </nav>

      {/* LUXURY MOBILE NAVIGATION DRAWER */}
      {mobileMenuOpen && (
        <div className="mobile-drawer" style={{ background: '#FAF8F5', borderBottom: '2px solid #1B2E1E', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className="nav-link"
              style={({ isActive }) => ({
                fontSize: '1rem',
                fontWeight: '700',
                padding: '0.75rem 1rem',
                borderRadius: '12px',
                background: isActive ? '#1B2E1E' : '#FFFFFF',
                color: isActive ? '#FFFFFF' : '#121E14',
                border: '1px solid rgba(0,0,0,0.06)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              })}
            >
              <span>{link.name}</span>
              <ChevronRight style={{ width: '16px', height: '16px', opacity: 0.6 }} />
            </NavLink>
          ))}

          <a
            href="https://wa.me/923061041609?text=Hi%20Veelana%20Team%2C%20I%20want%20to%20order"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-olive"
            style={{ marginTop: '0.75rem', width: '100%', padding: '0.85rem', justifyContent: 'center', background: '#25D366', color: '#121E14', borderColor: '#25D366' }}
          >
            <MessageCircle style={{ width: '18px', height: '18px', fill: 'currentColor' }} />
            <span>Order Directly on WhatsApp (+92 306 1041609)</span>
          </a>
        </div>
      )}
    </header>
  );
}
