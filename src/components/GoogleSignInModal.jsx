import React, { useState, useEffect, useRef } from 'react';
import { X, Sparkles, ShieldCheck, CheckCircle2, AlertCircle, ArrowRight, Key } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { loginGoogleUser, getGoogleAuthConfig, saveGoogleAuthConfig } from '../services/userService';

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

// Decodes standard JWT ID token returned by official Google Sign-In
function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error('Failed to parse Google JWT', e);
    return null;
  }
}

export default function GoogleSignInModal({ isOpen, onClose, onLoginSuccess }) {
  const [googleConfig, setGoogleConfig] = useState(() => getGoogleAuthConfig());
  const [clientIdInput, setClientIdInput] = useState(googleConfig?.clientId || '');
  const [isEditingClientId, setIsEditingClientId] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const googleBtnContainerRef = useRef(null);

  // Initialize or re-render official Google Button when modal opens
  useEffect(() => {
    if (!isOpen) return;

    const currentConfig = getGoogleAuthConfig();
    setGoogleConfig(currentConfig);
    const clientId = currentConfig?.clientId?.trim();

    if (!clientId) {
      return;
    }

    let intervalId;
    const initGoogleGsi = () => {
      if (window.google?.accounts?.id && googleBtnContainerRef.current) {
        try {
          window.google.accounts.id.initialize({
            client_id: clientId,
            callback: handleGoogleCredentialResponse,
            auto_select: false,
            cancel_on_tap_outside: true,
          });

          googleBtnContainerRef.current.innerHTML = '';
          window.google.accounts.id.renderButton(googleBtnContainerRef.current, {
            theme: 'outline',
            size: 'large',
            type: 'standard',
            shape: 'pill',
            text: 'signin_with',
            logo_alignment: 'left',
            width: 280,
          });
        } catch (err) {
          console.error('Error rendering Google button', err);
        }
      }
    };

    // If script isn't loaded yet, check every 150ms
    if (!window.google?.accounts?.id) {
      intervalId = setInterval(() => {
        if (window.google?.accounts?.id) {
          clearInterval(intervalId);
          initGoogleGsi();
        }
      }, 150);
    } else {
      initGoogleGsi();
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isOpen, googleConfig?.clientId]);

  if (!isOpen) return null;

  // Called when user successfully signs in through Google Official Popup
  const handleGoogleCredentialResponse = (response) => {
    if (!response || !response.credential) {
      setError('Google sign-in could not be completed.');
      return;
    }

    setIsLoading(true);
    const profile = parseJwt(response.credential);

    if (profile && profile.email) {
      const authenticatedUser = loginGoogleUser({
        name: profile.name || profile.given_name || 'Google User',
        email: profile.email.toLowerCase(),
        avatar: profile.picture || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(profile.name || 'G')}&backgroundColor=1B2E1E`,
        provider: 'Google Official OAuth',
        googleId: profile.sub,
      });

      setIsLoading(false);
      if (onLoginSuccess) onLoginSuccess(authenticatedUser);
      onClose();
    } else {
      setIsLoading(false);
      setError('Unable to read profile from Google token.');
    }
  };

  const handleSaveClientId = (e) => {
    e.preventDefault();
    const cleanId = clientIdInput.trim();
    if (!cleanId) {
      setError('Please paste a valid Google Client ID.');
      return;
    }
    saveGoogleAuthConfig({ ...googleConfig, clientId: cleanId });
    setGoogleConfig({ ...googleConfig, clientId: cleanId });
    setIsEditingClientId(false);
    setError('');
  };

  const hasConfiguredClientId = Boolean(googleConfig?.clientId && googleConfig.clientId.trim().length > 10);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999999,
        background: 'rgba(18, 30, 20, 0.75)',
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
          maxWidth: '460px',
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
              Official Google Sign-In
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
            <p style={{ fontSize: '0.85rem', color: '#5F7057', margin: 0, lineHeight: 1.45 }}>
              Sign in with your genuine Google account to auto-fill orders, track deliveries, and leave verified customer reviews.
            </p>
          </div>

          {/* Genuine Google Button Container */}
          {hasConfiguredClientId && !isEditingClientId ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', margin: '1.5rem 0' }}>
              <div
                ref={googleBtnContainerRef}
                style={{
                  minHeight: '44px',
                  display: 'flex',
                  justifyContent: 'center',
                  width: '100%',
                }}
              />

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: '#047857', background: '#ECFDF5', padding: '6px 12px', borderRadius: '8px', border: '1px solid #A7F3D0' }}>
                <CheckCircle2 style={{ width: '15px', height: '15px' }} />
                <span>Connected to Official Google OAuth 2.0</span>
              </div>
            </div>
          ) : (
            /* Setup / Configuration Panel for Genuine Google Client ID */
            <div style={{ background: '#FAF8F5', borderRadius: '16px', padding: '1.25rem', border: '1px solid #E2DDCF', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
                <Key style={{ width: '18px', height: '18px', color: '#2D6A4F' }} />
                <span style={{ fontSize: '0.88rem', fontWeight: '800', color: '#1B2E1E' }}>
                  Connect Your Google Cloud Client ID
                </span>
              </div>

              <p style={{ fontSize: '0.78rem', color: '#5F7057', lineHeight: 1.5, margin: '0 0 0.85rem' }}>
                Asli Google popup chalane ke liye Google Cloud Console se free <strong>OAuth 2.0 Client ID</strong> yahan paste karein:
              </p>

              <form onSubmit={handleSaveClientId} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <input
                  type="text"
                  placeholder="e.g. 1234567890-abcdef.apps.googleusercontent.com"
                  value={clientIdInput}
                  onChange={(e) => {
                    setClientIdInput(e.target.value);
                    setError('');
                  }}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    borderRadius: '10px',
                    border: '1px solid #CBD5E1',
                    fontSize: '0.82rem',
                    outline: 'none',
                    background: '#FFFFFF',
                  }}
                />

                {error && (
                  <span style={{ fontSize: '0.75rem', color: '#B91C1C', fontWeight: '700' }}>
                    {error}
                  </span>
                )}

                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                  {hasConfiguredClientId && (
                    <button
                      type="button"
                      onClick={() => setIsEditingClientId(false)}
                      style={{
                        padding: '0.5rem 0.85rem',
                        background: '#E2DDCF',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '0.78rem',
                        fontWeight: '700',
                        cursor: 'pointer',
                        color: '#1B2E1E',
                      }}
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    type="submit"
                    style={{
                      padding: '0.55rem 1.1rem',
                      background: '#1B2E1E',
                      color: '#FAF8F5',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '0.82rem',
                      fontWeight: '800',
                      cursor: 'pointer',
                    }}
                  >
                    Save & Enable Google Login
                  </button>
                </div>
              </form>

              <div style={{ marginTop: '0.85rem', fontSize: '0.72rem', color: '#6A7B52', lineHeight: 1.4 }}>
                💡 <em>Steps:</em> Go to <strong>console.cloud.google.com</strong> &gt; APIs &amp; Services &gt; Credentials &gt; Create "OAuth client ID" (Web application) &gt; Add <code>https://www.veelana.online</code> in Authorized JavaScript origins.
              </div>
            </div>
          )}

          {hasConfiguredClientId && !isEditingClientId && (
            <div style={{ textAlign: 'center', marginTop: '0.75rem' }}>
              <button
                type="button"
                onClick={() => setIsEditingClientId(true)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#6A7B52',
                  fontSize: '0.75rem',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                }}
              >
                Change Google Client ID Settings
              </button>
            </div>
          )}

          {/* Privacy & Security Footer */}
          <div style={{ marginTop: '1.25rem', textAlign: 'center', fontSize: '0.72rem', color: '#7A8C74', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
            <ShieldCheck style={{ width: '14px', height: '14px', color: '#25D366' }} />
            <span>Official Google Identity Services (GIS) OAuth 2.0</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
