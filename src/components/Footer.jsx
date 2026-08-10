import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone, Globe, MessageCircle, ArrowUp } from 'lucide-react';

export default function Footer({ onOpenAdmin }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          
          {/* Brand Info */}
          <div>
            <div style={{ display: 'flex', items: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <img
                src="/assets/official_png_logo.png"
                alt="Veelana Logo"
                style={{ height: '38px', width: 'auto', filter: 'brightness(0) invert(1)', flexShrink: 0 }}
              />
              <div>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 'bold', color: '#FAF8F5', margin: 0 }}>VEELANA</h4>
                <p style={{ fontSize: '0.6rem', color: '#D4AF37', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 'bold', margin: 0 }}>HERBAL HAIR CARE</p>
              </div>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'rgba(250, 248, 245, 0.8)', lineHeight: 1.6, maxWidth: '320px', marginBottom: '1rem' }}>
              Handcrafted in Khanewal City using 25+ cold-pressed herbs. Pure, cruelty-free, paraben-free, and mineral-oil free root elixir.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <a
                href="https://wa.me/923061041609"
                target="_blank"
                rel="noopener noreferrer"
                style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.25)', color: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                aria-label="WhatsApp Direct"
              >
                <MessageCircle style={{ width: '16px', height: '16px' }} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-title">PAGES & NAVIGATION</h4>
            <ul className="footer-links">
              <li><Link to="/" style={{ color: 'rgba(250, 248, 245, 0.85)' }}>Home Page</Link></li>
              <li><Link to="/products" style={{ color: 'rgba(250, 248, 245, 0.85)' }}>Products (100ml & 250ml)</Link></li>
              <li><Link to="/why-veelana" style={{ color: 'rgba(250, 248, 245, 0.85)' }}>Why Veelana (5 Commitments)</Link></li>
              <li><Link to="/ingredients" style={{ color: 'rgba(250, 248, 245, 0.85)' }}>25+ Cold-Pressed Herbs</Link></li>
              <li><Link to="/how-to-use" style={{ color: 'rgba(250, 248, 245, 0.85)' }}>How to Use (4 Steps)</Link></li>
              <li><Link to="/reviews" style={{ color: 'rgba(250, 248, 245, 0.85)' }}>Customer Reviews</Link></li>
              <li><Link to="/contact" style={{ color: 'rgba(250, 248, 245, 0.85)' }}>Contact & Origin</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="footer-title">ORIGIN & DIRECT CONTACT</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.85rem', color: 'rgba(250, 248, 245, 0.85)', listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                <MapPin style={{ width: '16px', height: '16px', color: '#D4AF37', flexShrink: 0, marginTop: '2px' }} />
                <span>Khanewal City, Postal Code 58150, Punjab, Pakistan</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Phone style={{ width: '16px', height: '16px', color: '#25D366', flexShrink: 0 }} />
                <a href="https://wa.me/923061041609" style={{ color: '#25D366', fontFamily: 'monospace', fontWeight: 'bold' }}>
                  +92 306 1041609
                </a>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Mail style={{ width: '16px', height: '16px', color: '#D4AF37', flexShrink: 0 }} />
                <a href="mailto:info@veelana.online" style={{ color: '#FAF8F5', textDecoration: 'underline' }}>
                  info@veelana.online
                </a>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Globe style={{ width: '16px', height: '16px', color: '#D4AF37', flexShrink: 0 }} />
                <a href="https://veelana.online" style={{ color: '#FAF8F5', textDecoration: 'underline' }}>
                  veelana.online
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright & Admin CMS Trigger */}
        <div style={{ paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: 'rgba(250, 248, 245, 0.65)', flexWrap: 'wrap', gap: '1rem' }}>
          <p>© {new Date().getFullYear()} Veelana Herbal Hair Care (veelana.online). All Rights Reserved. Crafted in Khanewal, Pakistan.</p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                style={{ color: '#D4AF37', fontWeight: 'bold', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.75rem' }}
              >
                🔐 Store Admin CMS
              </button>
            )}

            <button
              onClick={scrollToTop}
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#FAF8F5', fontWeight: 'bold', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.75rem' }}
            >
              <span>Back to Top</span>
              <ArrowUp style={{ width: '14px', height: '14px' }} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
