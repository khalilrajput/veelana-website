import React, { useState, useEffect } from 'react';
import { ShieldCheck, Cookie } from 'lucide-react';
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
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        background: '#1B2E1E',
        color: '#FAF8F5',
        padding: '0.85rem 1.25rem',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        boxShadow: '0 -4px 20px rgba(0,0,0,0.15)',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flex: '1 1 300px' }}>
          <Cookie style={{ width: '20px', height: '20px', color: '#D4AF37', flexShrink: 0 }} />
          <p style={{ fontSize: '0.8rem', color: '#D9E2D5', margin: 0, lineHeight: 1.4 }}>
            We use cookies to enhance your shopping experience and manage your cart. By browsing Veelana, you agree to our{' '}
            <Link to="/privacy-policy" style={{ color: '#FAF8F5', textDecoration: 'underline' }}>
              Privacy Policy
            </Link>.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <button
            onClick={handleAccept}
            style={{
              background: '#4F5D38',
              color: '#FAF8F5',
              border: 'none',
              borderRadius: '6px',
              padding: '0.45rem 1.15rem',
              fontSize: '0.8rem',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            Accept & Continue
          </button>
        </div>
      </div>
    </div>
  );
}
