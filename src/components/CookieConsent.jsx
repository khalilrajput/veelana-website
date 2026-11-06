import React, { useState, useEffect } from 'react';
import { Cookie } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CookieConsent() {
  const [accepted, setAccepted] = useState(true);

  useEffect(() => {
    const isConsentGiven = localStorage.getItem('veelana_cookie_consent_v1');
    if (!isConsentGiven) {
      setAccepted(false);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('veelana_cookie_consent_v1', 'true');
    setAccepted(true);
  };

  if (accepted) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '16px',
        left: '16px',
        maxWidth: '360px',
        zIndex: 9999,
        background: 'rgba(27, 46, 30, 0.96)',
        backdropFilter: 'blur(10px)',
        color: '#FAF8F5',
        padding: '0.85rem 1rem',
        borderRadius: '16px',
        border: '1px solid rgba(255,255,255,0.15)',
        boxShadow: '0 12px 35px rgba(0,0,0,0.3)',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
          <Cookie style={{ width: '18px', height: '18px', color: '#D4AF37', flexShrink: 0, marginTop: '2px' }} />
          <p style={{ fontSize: '0.75rem', color: '#D9E2D5', margin: 0, lineHeight: 1.45 }}>
            We use cookies to enhance your shopping experience and save your cart. By browsing Veelana, you agree to our{' '}
            <Link to="/privacy-policy" style={{ color: '#D4AF37', textDecoration: 'underline' }}>
              Privacy Policy
            </Link>.
          </p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
          <button
            onClick={handleAccept}
            style={{
              padding: '0.45rem 1rem',
              borderRadius: '8px',
              background: '#D4AF37',
              color: '#121E14',
              border: 'none',
              fontSize: '0.75rem',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}
          >
            Accept &amp; Continue
          </button>
        </div>
      </div>
    </div>
  );
}
