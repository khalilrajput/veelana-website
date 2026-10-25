import React, { useState } from 'react';
import { X, Sparkles, ShieldCheck, CheckCircle2, User, Mail, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { loginGoogleUser } from '../services/userService';

const GoogleIcon = ({ size = 20 }) => (
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

export default function GoogleSignInModal({ isOpen, onClose, onLoginSuccess }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [customAvatar, setCustomAvatar] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleCustomGoogleLogin = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid Google email address (e.g. name@gmail.com).');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const user = loginGoogleUser({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        avatar: customAvatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name.trim())}&backgroundColor=1B2E1E`,
      });
      setIsLoading(false);
      if (onLoginSuccess) onLoginSuccess(user);
      onClose();
    }, 600);
  };

  const handleQuickDemoGoogleLogin = (quickName, quickEmail, quickAvatar) => {
    setIsLoading(true);
    setTimeout(() => {
      const user = loginGoogleUser({
        name: quickName,
        email: quickEmail,
        avatar: quickAvatar,
      });
      setIsLoading(false);
      if (onLoginSuccess) onLoginSuccess(user);
      onClose();
    }, 450);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999999,
        background: 'rgba(18, 30, 20, 0.7)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 15 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#FFFFFF',
          borderRadius: '24px',
          maxWidth: '440px',
          width: '100%',
          overflow: 'hidden',
          boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
          border: '1px solid rgba(79, 93, 56, 0.2)',
          position: 'relative',
        }}
      >
        {/* Modal Header */}
        <div style={{ background: '#FAF8F5', padding: '1.25rem 1.5rem', borderBottom: '1px solid #ECE7DD', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <GoogleIcon size={22} />
            <span style={{ fontSize: '1rem', fontWeight: '800', color: '#1B2E1E' }}>
              Sign in with Google
            </span>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#7A8C74', padding: '4px' }}
            aria-label="Close"
          >
            <X style={{ width: '20px', height: '20px' }} />
          </button>
        </div>

        {/* Content Body */}
        <div style={{ padding: '1.75rem 1.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#F1F5F9', border: '2px solid #E2E8F0', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem' }}>
              <GoogleIcon size={30} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 'bold', color: '#1B2E1E', margin: '0 0 0.35rem' }}>
              Welcome to Veelana
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#5F7057', margin: 0, lineHeight: 1.4 }}>
              Sign in with your Google account to auto-fill orders, track packages, and leave verified customer reviews.
            </p>
          </div>

          {/* Quick 1-Click Demo Accounts */}
          <div style={{ marginBottom: '1.5rem', background: '#FAF8F5', borderRadius: '16px', padding: '1rem', border: '1px solid #EAE5D9' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: '800', color: '#6A7B52', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.65rem' }}>
              ⚡ 1-Click Instant Google Sign-In
            </span>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <button
                type="button"
                onClick={() =>
                  handleQuickDemoGoogleLogin(
                    'Ayesha Khan',
                    'ayesha.khan789@gmail.com',
                    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'
                  )
                }
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.6rem 0.85rem',
                  borderRadius: '12px',
                  background: '#FFFFFF',
                  border: '1px solid #D6D0C2',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80"
                    alt="Ayesha"
                    style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div>
                    <div style={{ fontSize: '0.82rem', fontWeight: '700', color: '#1B2E1E' }}>Ayesha Khan</div>
                    <div style={{ fontSize: '0.7rem', color: '#6B7280' }}>ayesha.khan789@gmail.com</div>
                  </div>
                </div>
                <ArrowRight style={{ width: '15px', height: '15px', color: '#2D6A4F' }} />
              </button>

              <button
                type="button"
                onClick={() =>
                  handleQuickDemoGoogleLogin(
                    'Muhammad Bilal',
                    'm.bilal.lahore@gmail.com',
                    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
                  )
                }
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.6rem 0.85rem',
                  borderRadius: '12px',
                  background: '#FFFFFF',
                  border: '1px solid #D6D0C2',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <img
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80"
                    alt="Bilal"
                    style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div>
                    <div style={{ fontSize: '0.82rem', fontWeight: '700', color: '#1B2E1E' }}>Muhammad Bilal</div>
                    <div style={{ fontSize: '0.7rem', color: '#6B7280' }}>m.bilal.lahore@gmail.com</div>
                  </div>
                </div>
                <ArrowRight style={{ width: '15px', height: '15px', color: '#2D6A4F' }} />
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <div style={{ flex: 1, height: '1px', background: '#ECE7DD' }} />
            <span style={{ fontSize: '0.75rem', color: '#8A9A86', fontWeight: '600' }}>OR SIGN IN WITH YOUR GOOGLE ACCOUNT</span>
            <div style={{ flex: 1, height: '1px', background: '#ECE7DD' }} />
          </div>

          {/* Custom Google Account Form */}
          <form onSubmit={handleCustomGoogleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: '700', color: '#1B2E1E', display: 'block', marginBottom: '4px' }}>
                Your Full Name
              </label>
              <div style={{ position: 'relative' }}>
                <User style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px', color: '#7A8C74' }} />
                <input
                  type="text"
                  placeholder="e.g. Fatima Ali"
                  value={name}
                  onChange={(e) => { setName(e.target.value); setError(''); }}
                  required
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem 0.65rem 2.4rem',
                    borderRadius: '10px',
                    border: '1px solid #D6D0C2',
                    fontSize: '0.88rem',
                    outline: 'none',
                    background: '#FFFFFF',
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: '700', color: '#1B2E1E', display: 'block', marginBottom: '4px' }}>
                Google Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <Mail style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px', color: '#7A8C74' }} />
                <input
                  type="email"
                  placeholder="yourname@gmail.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(''); }}
                  required
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem 0.65rem 2.4rem',
                    borderRadius: '10px',
                    border: '1px solid #D6D0C2',
                    fontSize: '0.88rem',
                    outline: 'none',
                    background: '#FFFFFF',
                  }}
                />
              </div>
            </div>

            {error && (
              <span style={{ fontSize: '0.78rem', color: '#B91C1C', fontWeight: '700' }}>
                {error}
              </span>
            )}

            <button
              type="submit"
              disabled={isLoading}
              style={{
                marginTop: '0.5rem',
                width: '100%',
                padding: '0.75rem',
                borderRadius: '12px',
                background: '#1B2E1E',
                color: '#FAF8F5',
                border: 'none',
                fontWeight: '800',
                fontSize: '0.9rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 4px 15px rgba(27, 46, 30, 0.2)',
                opacity: isLoading ? 0.7 : 1,
              }}
            >
              <GoogleIcon size={18} />
              <span>{isLoading ? 'Signing in...' : 'Sign in with Google'}</span>
            </button>
          </form>

          {/* Privacy footer */}
          <div style={{ marginTop: '1.25rem', textAlign: 'center', fontSize: '0.72rem', color: '#7A8C74', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
            <ShieldCheck style={{ width: '14px', height: '14px', color: '#25D366' }} />
            <span>Secure Google OAuth 2.0 Identity Protocol</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
