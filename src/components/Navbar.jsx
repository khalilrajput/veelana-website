import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, ShoppingBag, Package, ChevronRight, PhoneCall, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Navbar({ onOpenOrder }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [announcementIdx, setAnnouncementIdx] = useState(0);
  const { totalItemsCount, setIsCartOpen } = useCart();

  const announcements = [
    { text: '🌿 100% Organic & Cold-Pressed Herbal Hair Care • Pure Botanical Extract' },
    { text: '🚚 Cash on Delivery Across Pakistan • Free Shipping on Rs. 3,000+' },
    { text: '🎁 Use Coupon SAVE10 for 10% Off Your Order Today!' },
    { text: '💬 WhatsApp Direct Support & Dispatch: +92 306 1041609' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setAnnouncementIdx((prev) => (prev + 1) % announcements.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Track Order', path: '/track-order' },
    { name: 'Why Veelana', path: '/why-veelana' },
    { name: '25+ Herbs', path: '/ingredients' },
    { name: 'How to Use', path: '/how-to-use' },
    { name: 'About Us', path: '/about' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 1000, width: '100%' }}>
      {/* Top Announcement Bar - Rotating */}
      <div className="top-bar">
        <span className="top-bar-text">
          {announcements[announcementIdx].text}
        </span>
      </div>

      {/* Main Glass Nav */}
      <nav className="glass-nav">
        <div className="container nav-container">
          {/* Brand Logo */}
          <Link to="/" className="nav-brand">
            <img
              src="/assets/official_png_logo.webp"
              alt="Veelana Official Olive Logo"
              className="nav-brand-img"
              style={{
                height: '38px',
                width: 'auto',
                maxWidth: '90px',
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

          {/* CTA, Shopping Cart & Mobile Toggle */}
          <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
            {/* Shopping Cart Trigger Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Open Shopping Cart"
              className="nav-cart-btn"
              style={{
                position: 'relative',
                background: '#FAF8F5',
                border: '1px solid rgba(79, 93, 56, 0.25)',
                borderRadius: '50%',
                width: '42px',
                height: '42px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#1B2E1E',
                transition: 'all 0.2s',
              }}
            >
              <ShoppingBag style={{ width: '18px', height: '18px' }} />
              {totalItemsCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-3px',
                    right: '-3px',
                    background: '#2D6A4F',
                    color: '#FAF8F5',
                    fontSize: '0.7rem',
                    fontWeight: '800',
                    borderRadius: '999px',
                    minWidth: '18px',
                    height: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0 4px',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                  }}
                >
                  {totalItemsCount}
                </span>
              )}
            </button>

            {/* Quick Buy CTA */}
            <button
              onClick={() => onOpenOrder ? onOpenOrder('200ml') : setIsCartOpen(true)}
              className="btn-olive desktop-nav-cta"
              style={{ alignItems: 'center', gap: '0.5rem', padding: '0.55rem 1.25rem', fontSize: '0.82rem', cursor: 'pointer', minHeight: '42px' }}
            >
              <span>Order Now</span>
            </button>

            {/* Mobile Burger Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-menu-btn"
              aria-label="Toggle Mobile Menu"
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem', minHeight: '44px', minWidth: '44px' }}
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
                fontSize: '0.95rem',
                fontWeight: '700',
                padding: '0.75rem 1rem',
                borderRadius: '12px',
                background: isActive ? '#1B2E1E' : '#FFFFFF',
                color: isActive ? '#FFFFFF' : '#121E14',
                border: '1px solid rgba(0,0,0,0.06)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                minHeight: '48px'
              })}
            >
              <span>{link.name}</span>
              <ChevronRight style={{ width: '16px', height: '16px', opacity: 0.6 }} />
            </NavLink>
          ))}

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              setIsCartOpen(true);
            }}
            className="btn-olive"
            style={{ marginTop: '0.75rem', width: '100%', padding: '0.85rem', justifyContent: 'center', background: '#4F5D38', color: '#FAF8F5', borderColor: '#4F5D38', minHeight: '48px', cursor: 'pointer' }}
          >
            <ShoppingBag style={{ width: '18px', height: '18px' }} />
            <span>View Shopping Cart ({totalItemsCount})</span>
          </button>
        </div>
      )}
    </header>
  );
}
