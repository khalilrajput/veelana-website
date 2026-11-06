import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingBag, ChevronRight, User, LogOut, Star, PackageCheck, ShieldCheck, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { getCmsSettings } from '../services/cmsService';
import { getCurrentUser, logoutCurrentUser } from '../services/userService';
import GoogleSignInModal from './GoogleSignInModal';

const GoogleIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.4 7.33 24 12 24z"
    />
    <path
      fill="#FBBC05"
      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.16 0 9.98 0 12s.45 3.84 1.24 5.42l4.04-3.15z"
    />
    <path
      fill="#EA4335"
      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.6 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
    />
  </svg>
);

export default function Navbar({ onOpenOrder }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [announcementIdx, setAnnouncementIdx] = useState(0);
  const { totalItemsCount, setIsCartOpen } = useCart();
  const [cms, setCms] = useState(() => getCmsSettings());
  const [currentUser, setCurrentUser] = useState(() => getCurrentUser());
  const [isGoogleModalOpen, setIsGoogleModalOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const moreRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleCmsUpdate = () => {
      setCms(getCmsSettings());
    };
    const handleUserUpdate = (e) => {
      setCurrentUser(e.detail || getCurrentUser());
    };

    window.addEventListener('veelana_cms_updated', handleCmsUpdate);
    window.addEventListener('veelana_user_changed', handleUserUpdate);

    return () => {
      window.removeEventListener('veelana_cms_updated', handleCmsUpdate);
      window.removeEventListener('veelana_user_changed', handleUserUpdate);
    };
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setUserDropdownOpen(false);
      }
      if (moreRef.current && !moreRef.current.contains(e.target)) {
        setMoreDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const announcements = cms?.announcements || [
    '🌿 100% Organic & Cold-Pressed Herbal Hair Care • Pure Botanical Extract'
  ];

  useEffect(() => {
    if (announcements.length === 0) return;
    const timer = setInterval(() => {
      setAnnouncementIdx((prev) => (prev + 1) % announcements.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [announcements.length]);

  // Primary desktop navigation links (curated to keep navbar clean and uncluttered)
  const primaryNavLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: '25+ Herbs', path: '/ingredients' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'Blog', path: '/blog' },
  ];

  // Secondary links placed inside an elegant "More" dropdown
  const secondaryNavLinks = [
    { name: 'How to Use Routine', path: '/how-to-use' },
    { name: 'Why Veelana Standard', path: '/why-veelana' },
    { name: 'Track Order', path: '/track-order' },
    { name: 'FAQs & Help', path: '/faq' },
    { name: 'Contact Support', path: '/contact' },
  ];

  // All links for mobile drawer
  const allNavLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products Catalog', path: '/products' },
    { name: '25+ Cold-Pressed Herbs', path: '/ingredients' },
    { name: 'Customer Reviews & Proof', path: '/reviews' },
    { name: 'Botanical Journal & Blog', path: '/blog' },
    { name: 'How to Use Routine', path: '/how-to-use' },
    { name: 'Why Veelana Standard', path: '/why-veelana' },
    { name: 'Track Order', path: '/track-order' },
    { name: 'FAQ & Help', path: '/faq' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleLogout = () => {
    logoutCurrentUser();
    setUserDropdownOpen(false);
  };

  return (
    <>
      <header style={{ position: 'sticky', top: 0, zIndex: 1000, width: '100%' }}>
        {/* Top Announcement Bar - Rotating */}
        <div className="top-bar">
          <span className="top-bar-text">
            {typeof announcements[announcementIdx] === 'object'
              ? announcements[announcementIdx]?.text
              : (announcements[announcementIdx] || '🌿 100% Organic & Cold-Pressed Herbal Hair Care')}
          </span>
        </div>

        {/* Main Glass Nav */}
        <nav className="glass-nav" style={{ padding: '0.65rem 0' }}>
          <div className="container nav-container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.25rem' }}>
            
            {/* Brand Logo */}
            <Link to="/" className="nav-brand" style={{ gap: '0.65rem' }}>
              <img
                src={cms?.siteSettings?.brandLogo || '/assets/official_png_logo.webp'}
                alt={cms?.siteSettings?.brandName || 'Veelana'}
                className="nav-brand-img"
                style={{
                  height: '34px',
                  width: 'auto',
                  maxWidth: '75px',
                  objectFit: 'contain',
                  mixBlendMode: 'multiply',
                  flexShrink: 0
                }}
                onError={(e) => { e.currentTarget.src = '/assets/official_png_logo.webp'; }}
              />
              <div className="brand-text-box">
                <span className="brand-title" style={{ fontSize: '1.45rem', letterSpacing: '1.5px' }}>
                  {cms?.siteSettings?.brandName || 'VEELANA'}
                </span>
                <span className="brand-subtitle" style={{ fontSize: '0.52rem', letterSpacing: '2px' }}>
                  {cms?.siteSettings?.brandSubtitle || 'HERBAL HAIR CARE'}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <ul className="nav-links" style={{ gap: '1.25rem' }}>
              {primaryNavLinks.map((link) => (
                <li key={link.name}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                    style={({ isActive }) => ({
                      color: isActive ? '#1B2E1E' : '#4F5E52',
                      borderBottom: isActive ? '2px solid #1B2E1E' : 'none',
                      fontWeight: isActive ? '700' : '600',
                      paddingBottom: '3px',
                      fontSize: '0.86rem',
                    })}
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}

              {/* More Dropdown */}
              <li style={{ position: 'relative' }} ref={moreRef}>
                <button
                  type="button"
                  onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '3px',
                    fontSize: '0.86rem',
                    fontWeight: '600',
                    color: '#4F5E52',
                    padding: '3px 0',
                  }}
                >
                  <span>More</span>
                  <ChevronDown style={{ width: '14px', height: '14px', opacity: 0.7 }} />
                </button>

                {moreDropdownOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 'calc(100% + 10px)',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: '#FFFFFF',
                      borderRadius: '16px',
                      boxShadow: '0 16px 40px rgba(0,0,0,0.12)',
                      border: '1px solid #ECE7DD',
                      padding: '0.5rem',
                      minWidth: '200px',
                      zIndex: 10002,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '2px',
                    }}
                  >
                    {secondaryNavLinks.map((sub) => (
                      <Link
                        key={sub.name}
                        to={sub.path}
                        onClick={() => setMoreDropdownOpen(false)}
                        style={{
                          padding: '0.6rem 0.85rem',
                          borderRadius: '10px',
                          fontSize: '0.82rem',
                          fontWeight: '600',
                          color: '#1B2E1E',
                          textDecoration: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          transition: 'background 0.2s',
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = '#FAF8F5'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                      >
                        <span>{sub.name}</span>
                        <ChevronRight style={{ width: '13px', height: '13px', opacity: 0.4 }} />
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            </ul>

            {/* CTA, User Auth, Shopping Cart & Mobile Toggle */}
            <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', flexShrink: 0 }}>
              
              {/* GOOGLE SIGN IN / USER PROFILE BUTTON */}
              {currentUser ? (
                <div style={{ position: 'relative' }} ref={dropdownRef}>
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      background: '#FAF8F5',
                      border: '1.5px solid #2D6A4F',
                      padding: '3px 10px 3px 4px',
                      borderRadius: '999px',
                      cursor: 'pointer',
                      fontSize: '0.78rem',
                      fontWeight: '700',
                      color: '#1B2E1E',
                      height: '38px',
                    }}
                    title={`Signed in as ${currentUser.name}`}
                  >
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      style={{ width: '26px', height: '26px', borderRadius: '50%', objectFit: 'cover' }}
                      onError={(e) => {
                        e.currentTarget.src = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(currentUser.name)}&backgroundColor=1B2E1E`;
                      }}
                    />
                    <span className="hidden sm:inline" style={{ maxWidth: '80px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {currentUser.name.split(' ')[0]}
                    </span>
                    <ChevronDown style={{ width: '12px', height: '12px', opacity: 0.6 }} />
                  </button>

                  {/* Profile Dropdown */}
                  {userDropdownOpen && (
                    <div
                      style={{
                        position: 'absolute',
                        right: 0,
                        top: 'calc(100% + 8px)',
                        width: '230px',
                        background: '#FFFFFF',
                        borderRadius: '16px',
                        boxShadow: '0 15px 35px rgba(0,0,0,0.15)',
                        border: '1px solid #ECE7DD',
                        padding: '0.75rem',
                        zIndex: 10001,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.4rem',
                      }}
                    >
                      <div style={{ padding: '0.5rem', borderBottom: '1px solid #F1ECE1', marginBottom: '0.25rem' }}>
                        <div style={{ fontSize: '0.85rem', fontWeight: '800', color: '#1B2E1E' }}>{currentUser.name}</div>
                        <div style={{ fontSize: '0.72rem', color: '#6B7280', overflow: 'hidden', textOverflow: 'ellipsis' }}>{currentUser.email}</div>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#ECFDF5', color: '#047857', fontSize: '0.68rem', fontWeight: 'bold', padding: '2px 6px', borderRadius: '4px', marginTop: '4px' }}>
                          <ShieldCheck style={{ width: '12px', height: '12px' }} />
                          <span>Google Verified</span>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          navigate('/track-order');
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '0.5rem 0.65rem',
                          borderRadius: '8px',
                          border: 'none',
                          background: 'none',
                          color: '#2A361E',
                          fontSize: '0.82rem',
                          fontWeight: '600',
                          cursor: 'pointer',
                          textAlign: 'left',
                        }}
                      >
                        <PackageCheck style={{ width: '15px', height: '15px', color: '#4F5D38' }} />
                        <span>Track My Orders</span>
                      </button>

                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          navigate('/reviews');
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '0.5rem 0.65rem',
                          borderRadius: '8px',
                          border: 'none',
                          background: 'none',
                          color: '#2A361E',
                          fontSize: '0.82rem',
                          fontWeight: '600',
                          cursor: 'pointer',
                          textAlign: 'left',
                        }}
                      >
                        <Star style={{ width: '15px', height: '15px', color: '#D4AF37' }} />
                        <span>Leave Customer Review</span>
                      </button>

                      <div style={{ height: '1px', background: '#F1ECE1', margin: '2px 0' }} />

                      <button
                        onClick={handleLogout}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '0.5rem 0.65rem',
                          borderRadius: '8px',
                          border: 'none',
                          background: '#FEF2F2',
                          color: '#DC2626',
                          fontSize: '0.82rem',
                          fontWeight: '700',
                          cursor: 'pointer',
                          textAlign: 'left',
                        }}
                      >
                        <LogOut style={{ width: '15px', height: '15px' }} />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setIsGoogleModalOpen(true)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: '#FFFFFF',
                    border: '1px solid #D6D0C2',
                    borderRadius: '999px',
                    padding: '0.42rem 0.75rem',
                    fontSize: '0.78rem',
                    fontWeight: '700',
                    color: '#1B2E1E',
                    cursor: 'pointer',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.03)',
                    height: '38px',
                    transition: 'all 0.2s',
                    whiteSpace: 'nowrap',
                  }}
                  title="Sign in with Google"
                >
                  <GoogleIcon size={15} />
                  <span>Sign In</span>
                </button>
              )}

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
                  width: '38px',
                  height: '38px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#1B2E1E',
                  transition: 'all 0.2s',
                  flexShrink: 0,
                }}
              >
                <ShoppingBag style={{ width: '17px', height: '17px' }} />
                {totalItemsCount > 0 && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '-3px',
                      right: '-3px',
                      background: '#2D6A4F',
                      color: '#FAF8F5',
                      fontSize: '0.68rem',
                      fontWeight: '800',
                      borderRadius: '999px',
                      minWidth: '17px',
                      height: '17px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '0 3px',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
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
                style={{
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.45rem 1.15rem',
                  fontSize: '0.78rem',
                  cursor: 'pointer',
                  minHeight: '38px',
                  height: '38px',
                  whiteSpace: 'nowrap',
                }}
              >
                <span>Order Now</span>
              </button>

              {/* Mobile Burger Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="mobile-menu-btn"
                aria-label="Toggle Mobile Menu"
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.4rem', minHeight: '38px', minWidth: '38px' }}
              >
                {mobileMenuOpen ? <X style={{ width: '22px', height: '22px' }} /> : <Menu style={{ width: '22px', height: '22px' }} />}
              </button>
            </div>
          </div>
        </nav>

        {/* LUXURY MOBILE NAVIGATION DRAWER */}
        {mobileMenuOpen && (
          <div className="mobile-drawer" style={{ background: '#FAF8F5', borderBottom: '2px solid #1B2E1E', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            
            {/* User status in mobile drawer */}
            {currentUser ? (
              <div style={{ background: '#FFFFFF', padding: '0.85rem 1rem', borderRadius: '12px', border: '1px solid #ECE7DD', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    style={{ width: '34px', height: '34px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: '800', color: '#1B2E1E' }}>{currentUser.name}</div>
                    <div style={{ fontSize: '0.7rem', color: '#6B7280' }}>{currentUser.email}</div>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  style={{ background: '#FEE2E2', border: 'none', color: '#DC2626', padding: '4px 8px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 'bold', cursor: 'pointer' }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsGoogleModalOpen(true);
                }}
                style={{
                  background: '#FFFFFF',
                  padding: '0.75rem 1rem',
                  borderRadius: '12px',
                  border: '1.5px solid #D6D0C2',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  fontSize: '0.88rem',
                  fontWeight: '700',
                  color: '#1B2E1E',
                  cursor: 'pointer',
                  marginBottom: '0.5rem',
                }}
              >
                <GoogleIcon size={18} />
                <span>Sign in with Google Account</span>
              </button>
            )}

            {allNavLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="nav-link"
                style={({ isActive }) => ({
                  fontSize: '0.92rem',
                  fontWeight: '700',
                  padding: '0.75rem 1rem',
                  borderRadius: '12px',
                  background: isActive ? '#1B2E1E' : '#FFFFFF',
                  color: isActive ? '#FFFFFF' : '#121E14',
                  border: '1px solid rgba(0,0,0,0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  minHeight: '44px'
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
              style={{ marginTop: '0.75rem', width: '100%', padding: '0.85rem', justifyContent: 'center', background: '#4F5D38', color: '#FAF8F5', borderColor: '#4F5D38', minHeight: '46px', cursor: 'pointer' }}
            >
              <ShoppingBag style={{ width: '18px', height: '18px' }} />
              <span>View Shopping Cart ({totalItemsCount})</span>
            </button>
          </div>
        )}
      </header>

      {/* Google Sign In Modal */}
      <GoogleSignInModal
        isOpen={isGoogleModalOpen}
        onClose={() => setIsGoogleModalOpen(false)}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
        }}
      />
    </>
  );
}
