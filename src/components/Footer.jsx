import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone, Globe, MessageCircle, ArrowUp, ShieldCheck, Truck, Lock } from 'lucide-react';

const InstagramIcon = ({ size = 16, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const FacebookIcon = ({ size = 16, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const TikTokIcon = ({ size = 16, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={style}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-5.2-1.74 2.89 2.89 0 0 1 2.31-1.48V8.9a6.34 6.34 0 0 0-5.1 2.05 6.34 6.34 0 0 0 8.93 8.93 6.34 6.34 0 0 0 6.06-6.32V8.29a8.2 8.2 0 0 0 4.77 1.52V6.36a4.85 4.85 0 0 1-4.55-2.02v2.35z"/>
  </svg>
);

export default function Footer({ onOpenAdmin }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer" style={{ background: '#121E14', color: '#FAF8F5', paddingTop: '3.5rem', paddingBottom: '2rem' }}>
      <div className="container">
        <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2.5rem', marginBottom: '2.5rem' }}>
          
          {/* Brand Info & Social Handles */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <img
                src="/assets/official_png_logo.webp"
                alt="Veelana Logo"
                style={{ height: '38px', width: 'auto', filter: 'brightness(0) invert(1)', flexShrink: 0 }}
              />
              <div>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 'bold', color: '#FAF8F5', margin: 0 }}>VEELANA</h4>
                <p style={{ fontSize: '0.6rem', color: '#A0B195', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 'bold', margin: 0 }}>HERBAL HAIR CARE</p>
              </div>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'rgba(250, 248, 245, 0.8)', lineHeight: 1.6, maxWidth: '320px', marginBottom: '1.25rem' }}>
              Handcrafted using 25+ cold-pressed herbs. 100% cruelty-free, paraben-free, and mineral-oil free root elixir.
            </p>
            
            {/* Social Handles Bar */}
            <div>
              <span style={{ display: 'block', fontSize: '0.72rem', color: '#A0B195', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                Follow Our Official Channels
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <a
                  href="https://www.instagram.com/veelaan.official?utm_source=qr&igsi=bWl1dTFta3l4cGI1"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#E1306C', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s' }}
                  title="Instagram @veelaan.official"
                  aria-label="Instagram @veelaan.official"
                >
                  <InstagramIcon size={16} />
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61592935558371"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#1877F2', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s' }}
                  title="Official Facebook Page"
                  aria-label="Official Facebook Page"
                >
                  <FacebookIcon size={16} />
                </a>
                <a
                  href="https://www.tiktok.com/@www.veelana.online?_r=1&_t=ZS-99STtqPMSfN"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#FAF8F5', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s' }}
                  title="TikTok @www.veelana.online"
                  aria-label="TikTok @www.veelana.online"
                >
                  <TikTokIcon size={16} />
                </a>
                <a
                  href="https://wa.me/923061041609"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(37, 211, 102, 0.4)', color: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s' }}
                  title="WhatsApp Direct"
                  aria-label="WhatsApp Direct"
                >
                  <MessageCircle style={{ width: '16px', height: '16px' }} />
                </a>
              </div>
            </div>
          </div>

          {/* Customer Service & Tracking */}
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#A0B195', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem' }}>
              CUSTOMER SERVICE & ORDERS
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', listStyle: 'none', padding: 0, margin: 0, fontSize: '0.88rem' }}>
              <li>
                <Link to="/track-order" style={{ color: '#FAF8F5', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Truck style={{ width: '16px', height: '16px', color: '#2D6A4F' }} />
                  <span>Track Live Order Status</span>
                </Link>
              </li>
              <li><Link to="/shipping-returns" style={{ color: 'rgba(250, 248, 245, 0.85)' }}>Shipping & Return Policy</Link></li>
              <li><Link to="/faq" style={{ color: 'rgba(250, 248, 245, 0.85)' }}>FAQ & Help Center</Link></li>
              <li><Link to="/privacy-policy" style={{ color: 'rgba(250, 248, 245, 0.85)' }}>Privacy Policy</Link></li>
              <li><Link to="/terms" style={{ color: 'rgba(250, 248, 245, 0.85)' }}>Terms of Service</Link></li>
              <li><Link to="/contact" style={{ color: 'rgba(250, 248, 245, 0.85)' }}>Customer Help Desk</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#A0B195', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem' }}>
              EXPLORE VEELANA
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', listStyle: 'none', padding: 0, margin: 0, fontSize: '0.88rem' }}>
              <li><Link to="/" style={{ color: 'rgba(250, 248, 245, 0.85)' }}>Home Page</Link></li>
              <li><Link to="/products" style={{ color: 'rgba(250, 248, 245, 0.85)' }}>Products & Bundle Offers</Link></li>
              <li><Link to="/why-veelana" style={{ color: 'rgba(250, 248, 245, 0.85)' }}>Why Choose Veelana</Link></li>
              <li><Link to="/ingredients" style={{ color: 'rgba(250, 248, 245, 0.85)' }}>25+ Cold-Pressed Herbs</Link></li>
              <li><Link to="/how-to-use" style={{ color: 'rgba(250, 248, 245, 0.85)' }}>How to Use Routine</Link></li>
              <li><Link to="/about" style={{ color: 'rgba(250, 248, 245, 0.85)' }}>Brand Heritage & Story</Link></li>
              <li><Link to="/reviews" style={{ color: 'rgba(250, 248, 245, 0.85)' }}>Customer Reviews</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#A0B195', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem' }}>
              ORIGIN & DIRECT CONTACT
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.85rem', color: 'rgba(250, 248, 245, 0.85)', listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                <MapPin style={{ width: '16px', height: '16px', color: '#A0B195', flexShrink: 0, marginTop: '2px' }} />
                <span>Punjab, Pakistan (Nationwide COD Courier Delivery)</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Phone style={{ width: '16px', height: '16px', color: '#A0B195', flexShrink: 0 }} />
                <a href="https://wa.me/923061041609" style={{ color: '#FAF8F5', fontWeight: 'bold' }}>
                  +92 306 1041609
                </a>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Mail style={{ width: '16px', height: '16px', color: '#A0B195', flexShrink: 0 }} />
                <a href="mailto:veelanaofficial@gmail.com" style={{ color: '#FAF8F5', textDecoration: 'underline' }}>
                  veelanaofficial@gmail.com
                </a>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Globe style={{ width: '16px', height: '16px', color: '#A0B195', flexShrink: 0 }} />
                <a href="https://veelana.online" style={{ color: '#FAF8F5', textDecoration: 'underline' }}>
                  veelana.online
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright & Back to Top */}
        <div style={{ paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: 'rgba(250, 248, 245, 0.65)', flexWrap: 'wrap', gap: '1rem' }}>
          <p>© {new Date().getFullYear()} Veelana Herbal Hair Care (veelana.online). All Rights Reserved. Crafted in Pakistan.</p>

          <button
            onClick={scrollToTop}
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#FAF8F5', fontWeight: 'bold', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.75rem' }}
          >
            <span>Back to Top</span>
            <ArrowUp style={{ width: '14px', height: '14px' }} />
          </button>
        </div>
      </div>
    </footer>
  );
}
