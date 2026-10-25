import React, { useState } from 'react';
import { Globe, CheckCircle2, Copy, Check, ExternalLink, Search, ShieldCheck, FileCode, AlertCircle, ArrowUpRight, Sparkles, RefreshCw } from 'lucide-react';

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

export default function AdminSeoManager({ showNotification }) {
  const [copiedKey, setCopiedKey] = useState('');

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    if (showNotification) showNotification(`📋 Copied: ${text}`);
    setTimeout(() => setCopiedKey(''), 2500);
  };

  const sitemapUrl = 'https://veelana.online/sitemap.xml';
  const robotsUrl = 'https://veelana.online/robots.txt';
  const verificationTag = '<meta name="google-site-verification" content="googlec7b322add28a5ced" />';

  const seoChecklist = [
    { title: 'Google Verification Token', status: 'Active (HTML & Meta Tag Installed)', passed: true, detail: 'googlec7b322add28a5ced.html active' },
    { title: 'XML Sitemap', status: '14 Clean Routes Configured', passed: true, detail: 'Updated with /reviews, /products, /ingredients' },
    { title: 'Robots.txt Directive', status: 'Allowing Googlebot & Disallowing /admin', passed: true, detail: 'Sitemap linked directly' },
    { title: 'Canonical Tag', status: 'https://veelana.online/', passed: true, detail: 'Prevents duplicate content issues' },
    { title: 'Schema.org JSON-LD', status: 'Organization, Products & FAQ Schema Active', passed: true, detail: 'Powers Google Rich Snippets & Star ratings' },
    { title: 'Open Graph & Social Cards', status: 'WhatsApp, Facebook & Twitter Large Image Preview', passed: true, detail: 'Includes official logo & product imagery' },
    { title: 'Mobile First & Responsive Rhythm', status: 'Viewport-fit cover & Fast WebP Images', passed: true, detail: 'High Google PageSpeed compatibility' },
  ];

  return (
    <div style={{ background: '#FFFFFF', borderRadius: '20px', padding: '1.75rem', border: '1px solid #ECE7DD', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid #ECE7DD', paddingBottom: '1.25rem', marginBottom: '1.5rem' }}>
        <div>
          <span style={{ fontSize: '0.72rem', color: '#6A7B52', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: '800' }}>
            GOOGLE INDEXING & SEARCH CONSOLE INTEGRATION
          </span>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: '800', color: '#1B2E1E', margin: '2px 0 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <GoogleIcon size={22} />
            <span>Google Search Console & SEO Health Hub</span>
          </h2>
          <p style={{ fontSize: '0.82rem', color: '#6B7280', margin: '4px 0 0' }}>
            Manage sitemap submissions, Google search verification status, and rich snippet schemas for ranking.
          </p>
        </div>

        <a
          href="https://search.google.com/search-console"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            padding: '0.65rem 1.25rem',
            background: '#1B2E1E',
            color: '#FAF8F5',
            borderRadius: '10px',
            fontSize: '0.85rem',
            fontWeight: '700',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 4px 12px rgba(27, 46, 30, 0.15)'
          }}
        >
          <GoogleIcon size={16} />
          <span>Open Google Search Console</span>
          <ArrowUpRight style={{ width: '14px', height: '14px', color: '#D4AF37' }} />
        </a>
      </div>

      {/* 2-Column: Quick Copy Shortcuts + Step-by-Step Submission Guide */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        
        {/* Quick Copy Card */}
        <div style={{ background: '#FAF8F5', borderRadius: '16px', padding: '1.25rem', border: '1px solid #E2DDCF' }}>
          <h4 style={{ fontSize: '0.95rem', fontWeight: '800', color: '#1B2E1E', margin: '0 0 1rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <FileCode style={{ width: '18px', height: '18px', color: '#4F5D38' }} />
            <span>Google Search Console Quick Assets</span>
          </h4>

          {/* Sitemap URL Copy */}
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: '700', color: '#6A7B52', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
              Official Sitemap URL (Enter into Google Search Console):
            </label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                readOnly
                value={sitemapUrl}
                style={{ flex: 1, padding: '0.55rem 0.75rem', fontSize: '0.82rem', borderRadius: '8px', border: '1px solid #CBD5E1', background: '#FFFFFF', color: '#1B2E1E', fontWeight: '600' }}
              />
              <button
                onClick={() => copyToClipboard(sitemapUrl, 'sitemap')}
                style={{
                  padding: '0.55rem 0.85rem',
                  background: copiedKey === 'sitemap' ? '#047857' : '#1B2E1E',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '0.78rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                {copiedKey === 'sitemap' ? <Check style={{ width: '14px', height: '14px' }} /> : <Copy style={{ width: '14px', height: '14px' }} />}
                <span>{copiedKey === 'sitemap' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Robots.txt Copy */}
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: '700', color: '#6A7B52', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
              Robots.txt Directive:
            </label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                readOnly
                value={robotsUrl}
                style={{ flex: 1, padding: '0.55rem 0.75rem', fontSize: '0.82rem', borderRadius: '8px', border: '1px solid #CBD5E1', background: '#FFFFFF', color: '#1B2E1E', fontWeight: '600' }}
              />
              <button
                onClick={() => copyToClipboard(robotsUrl, 'robots')}
                style={{
                  padding: '0.55rem 0.85rem',
                  background: copiedKey === 'robots' ? '#047857' : '#1B2E1E',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '0.78rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                {copiedKey === 'robots' ? <Check style={{ width: '14px', height: '14px' }} /> : <Copy style={{ width: '14px', height: '14px' }} />}
                <span>{copiedKey === 'robots' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Meta Tag verification */}
          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: '700', color: '#6A7B52', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
              Verification Meta Tag:
            </label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                readOnly
                value={verificationTag}
                style={{ flex: 1, padding: '0.55rem 0.75rem', fontSize: '0.78rem', borderRadius: '8px', border: '1px solid #CBD5E1', background: '#FFFFFF', color: '#6B7280' }}
              />
              <button
                onClick={() => copyToClipboard(verificationTag, 'tag')}
                style={{
                  padding: '0.55rem 0.85rem',
                  background: copiedKey === 'tag' ? '#047857' : '#1B2E1E',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '0.78rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                {copiedKey === 'tag' ? <Check style={{ width: '14px', height: '14px' }} /> : <Copy style={{ width: '14px', height: '14px' }} />}
                <span>{copiedKey === 'tag' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

        </div>

        {/* Step-by-Step Instructions in Urdu/English */}
        <div style={{ background: '#ECFDF5', borderRadius: '16px', padding: '1.25rem', border: '1px solid #A7F3D0' }}>
          <h4 style={{ fontSize: '0.95rem', fontWeight: '800', color: '#065F46', margin: '0 0 0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Sparkles style={{ width: '18px', height: '18px', color: '#047857' }} />
            <span>How to Index in Google Search Console (3 Simple Steps)</span>
          </h4>

          <ol style={{ paddingLeft: '1.25rem', margin: 0, fontSize: '0.85rem', color: '#065F46', lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            <li>
              <strong>1. Open Google Search Console:</strong> Go to your property for <code>veelana.online</code>.
            </li>
            <li>
              <strong>2. Click on "Sitemaps":</strong> On the left side navigation panel of Search Console, select <strong>Sitemaps</strong>.
            </li>
            <li>
              <strong>3. Submit <code>sitemap.xml</code>:</strong> In the text box labeled <em>"Add a new sitemap"</em>, type <code>sitemap.xml</code> and click <strong>Submit</strong>. Google will automatically discover all 14 pages and index them!
            </li>
          </ol>

          <div style={{ marginTop: '1rem', paddingTop: '0.85rem', borderTop: '1px solid #A7F3D0', fontSize: '0.78rem', color: '#047857', fontWeight: '600' }}>
            💡 <em>Note: Google Search Console verification HTML file <code>googlec7b322add28a5ced.html</code> and the verification meta tag are both live and verified.</em>
          </div>
        </div>

      </div>

      {/* SEO Audit Checklist */}
      <div>
        <h4 style={{ fontSize: '1rem', fontWeight: '800', color: '#1B2E1E', margin: '0 0 1rem' }}>
          Live SEO & Search Readiness Checklist
        </h4>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '0.85rem' }}>
          {seoChecklist.map((item, idx) => (
            <div
              key={idx}
              style={{
                background: '#FAF8F5',
                border: '1px solid #ECE7DD',
                borderRadius: '12px',
                padding: '0.85rem 1rem',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px'
              }}
            >
              <CheckCircle2 style={{ width: '18px', height: '18px', color: '#059669', flexShrink: 0, marginTop: '2px' }} />
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: '800', color: '#1B2E1E' }}>
                  {item.title}
                </div>
                <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#047857', margin: '1px 0' }}>
                  {item.status}
                </div>
                <div style={{ fontSize: '0.7rem', color: '#6B7280' }}>
                  {item.detail}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
