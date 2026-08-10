import React from 'react';
import { MapPin, Mail, Phone, Globe, MessageCircle, ArrowUp } from 'lucide-react';

export default function Footer({ onOpenAdmin }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="footer">
      <div className="container">
        <div className="footer-grid">
          
          {/* Brand Info with Olive Vector Logo Mask */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.25rem' }}>
              <div style={{
                width: '46px',
                height: '46px',
                backgroundColor: '#FAF8F5',
                WebkitMaskImage: 'url(/assets/white_vector_logo.png)',
                maskImage: 'url(/assets/white_vector_logo.png)',
                WebkitMaskSize: 'contain',
                maskSize: 'contain',
                WebkitMaskRepeat: 'no-repeat',
                maskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
                maskPosition: 'center',
                flexShrink: 0
              }} />
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 'bold', letterSpacing: '2px', color: '#FAF8F5' }}>
                VEELANA
              </span>
            </div>
            
            <p style={{ fontSize: '0.88rem', color: 'rgba(250, 248, 245, 0.8)', fontWeight: '300', lineHeight: 1.6, maxWidth: '340px' }}>
              Veelana is a luxury botanical hair care brand dedicated to restoring scalp vitality using ancient cold-pressed herbal formulations. Free from Parabens, Sulphates, and Mineral Oils.
            </p>

            <div style={{ marginTop: '1.25rem', display: 'flex', gap: '0.75rem' }}>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(250, 248, 245, 0.25)', color: '#FAF8F5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                aria-label="Facebook Page"
              >
                <svg style={{ width: '16px', height: '16px', fill: 'currentColor' }} viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="https://wa.me/923061041609"
                target="_blank"
                rel="noopener noreferrer"
                style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(250, 248, 245, 0.25)', color: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                aria-label="WhatsApp Direct"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-title">
              Navigation
            </h4>
            <ul className="footer-links">
              <li><a href="#home">Home Page</a></li>
              <li><a href="#science">The Science of Roots</a></li>
              <li><a href="#why-veelana">Why Veelana</a></li>
              <li><a href="#products">Products (100ml & 250ml)</a></li>
              <li><a href="#ingredients">25+ Cold-Pressed Herbs</a></li>
              <li><a href="#blog">Hair Care Blog</a></li>
              <li><a href="#how-to-use">How to Use (4 Steps)</a></li>
            </ul>
          </div>

          {/* Business & Location Details */}
          <div>
            <h4 className="footer-title">
              Origin & Direct Contact
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.88rem', color: 'rgba(250, 248, 245, 0.85)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <MapPin className="w-4 h-4 shrink-0" style={{ marginTop: '0.2rem', color: '#FAF8F5' }} />
                <div>
                  <strong style={{ display: 'block', color: '#FAF8F5' }}>Origin & Address:</strong>
                  <span>Khanewal City, Postal Code 58150, Punjab, Pakistan</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Mail className="w-4 h-4 shrink-0" style={{ color: '#FAF8F5' }} />
                <div>
                  <strong style={{ display: 'block', color: '#FAF8F5' }}>Email:</strong>
                  <a href="mailto:info@veelana.online" style={{ color: '#FAF8F5', textDecoration: 'underline' }}>
                    info@veelana.online
                  </a>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Phone className="w-4 h-4 text-[#25D366] shrink-0" />
                <div>
                  <strong style={{ display: 'block', color: '#FAF8F5' }}>WhatsApp / Phone:</strong>
                  <a href="https://wa.me/923061041609" style={{ color: '#25D366', fontFamily: 'monospace', fontWeight: 'bold' }}>
                    +92 306 1041609
                  </a>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Globe className="w-4 h-4 shrink-0" style={{ color: '#FAF8F5' }} />
                <div>
                  <strong style={{ display: 'block', color: '#FAF8F5' }}>Official Website:</strong>
                  <a href="https://veelana.online" style={{ color: '#FAF8F5', textDecoration: 'underline' }}>
                    veelana.online
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright & Admin CMS Trigger */}
        <div style={{ paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: 'rgba(250, 248, 245, 0.65)', flexWrap: 'wrap', gap: '1rem', borderTop: '1px solid rgba(250,248,245,0.1)' }}>
          <p>© {new Date().getFullYear()} Veelana Herbal Hair Care (veelana.online). All Rights Reserved. Crafted in Khanewal, Pakistan.</p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                style={{ color: '#D4AF37', fontWeight: 'bold', fontSize: '0.75rem', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                🔐 Store Admin CMS
              </button>
            )}

            <button
              onClick={scrollToTop}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#FAF8F5', fontWeight: 'bold', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <span>Back to Top</span>
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
