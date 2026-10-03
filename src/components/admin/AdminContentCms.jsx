import React, { useState } from 'react';
import { Save, Sparkles, MessageCircle, Truck, Phone, Mail, Globe, MapPin, Image as ImageIcon, Flame, Plus, Trash2, CheckCircle2, RotateCcw } from 'lucide-react';
import { getCmsSettings, saveCmsSettings } from '../../services/cmsService';

export default function AdminContentCms({ showNotification }) {
  const [activeSection, setActiveSection] = useState('hero'); // 'hero', 'announcements', 'flash', 'identity'
  const [cmsData, setCmsData] = useState(() => getCmsSettings());
  const [newAnnouncement, setNewAnnouncement] = useState('');

  const { siteSettings, heroContent, announcements, flashSaleBanner } = cmsData;

  const handleHeroChange = (field, val) => {
    setCmsData(prev => ({
      ...prev,
      heroContent: { ...prev.heroContent, [field]: val }
    }));
  };

  const handleSiteChange = (field, val) => {
    setCmsData(prev => ({
      ...prev,
      siteSettings: { ...prev.siteSettings, [field]: val }
    }));
  };

  const handleTrustSpecChange = (idx, val) => {
    const specs = [...(heroContent.trustSpecs || [])];
    specs[idx] = val;
    handleHeroChange('trustSpecs', specs);
  };

  const handleAddAnnouncement = (e) => {
    e.preventDefault();
    if (!newAnnouncement.trim()) return;
    const updated = [...announcements, newAnnouncement.trim()];
    setCmsData(prev => ({ ...prev, announcements: updated }));
    setNewAnnouncement('');
  };

  const handleRemoveAnnouncement = (index) => {
    const updated = announcements.filter((_, i) => i !== index);
    setCmsData(prev => ({ ...prev, announcements: updated }));
  };

  const handleAnnouncementTextChange = (index, val) => {
    const updated = [...announcements];
    updated[index] = val;
    setCmsData(prev => ({ ...prev, announcements: updated }));
  };

  const handleFlashChange = (field, val) => {
    setCmsData(prev => ({
      ...prev,
      flashSaleBanner: { ...prev.flashSaleBanner, [field]: val }
    }));
  };

  const handleSaveAll = () => {
    const success = saveCmsSettings(cmsData);
    if (success) {
      if (showNotification) showNotification('✨ All website text & settings published live!');
    } else {
      alert('Could not save settings.');
    }
  };

  return (
    <div style={{ background: '#FFFFFF', borderRadius: '20px', padding: '1.75rem', border: '1px solid #ECE7DD', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid #ECE7DD', paddingBottom: '1.25rem', marginBottom: '1.5rem' }}>
        <div>
          <span style={{ fontSize: '0.72rem', color: '#6A7B52', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: '800' }}>
            WORDPRESS-STYLE SITE CUSTOMIZER
          </span>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: '800', color: '#1B2E1E', margin: '2px 0 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles style={{ width: '22px', height: '22px', color: '#B38E2A' }} />
            <span>Website Pages & Text Editor</span>
          </h2>
          <p style={{ fontSize: '0.82rem', color: '#6B7280', margin: '4px 0 0' }}>
            Edit headlines, notices, prices, WhatsApp number, and banners in real time without touching any code.
          </p>
        </div>

        <button
          onClick={handleSaveAll}
          style={{
            padding: '0.75rem 1.5rem',
            background: '#047857',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '10px',
            fontSize: '0.9rem',
            fontWeight: '800',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 4px 14px rgba(4, 120, 87, 0.25)'
          }}
        >
          <Save style={{ width: '18px', height: '18px' }} />
          <span>Publish Changes Live</span>
        </button>
      </div>

      {/* Sub-tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid #E5E7EB', paddingBottom: '0.75rem', marginBottom: '1.5rem', overflowX: 'auto' }}>
        {[
          { id: 'hero', label: '🌟 Hero Header & Top Banner' },
          { id: 'announcements', label: '📢 Rotating Top Announcement' },
          { id: 'flash', label: '🔥 Flash Sale Urgency Notice' },
          { id: 'identity', label: '🏢 WhatsApp, Phone & Contacts' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id)}
            style={{
              padding: '0.55rem 1rem',
              borderRadius: '8px',
              border: 'none',
              background: activeSection === tab.id ? '#1B2E1E' : '#FAF8F5',
              color: activeSection === tab.id ? '#FAF8F5' : '#4B5563',
              fontSize: '0.82rem',
              fontWeight: '700',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 1. HERO SECTION EDITOR */}
      {activeSection === 'hero' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#1B2E1E', display: 'block', marginBottom: '4px' }}>
                Top Badge Text
              </label>
              <input
                type="text"
                value={heroContent.badgeText || ''}
                onChange={(e) => handleHeroChange('badgeText', e.target.value)}
                style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
                placeholder="e.g. Pure Botanical Root Elixir"
              />
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#1B2E1E', display: 'block', marginBottom: '4px' }}>
                Headline Highlight Word
              </label>
              <input
                type="text"
                value={heroContent.headlineHighlight || ''}
                onChange={(e) => handleHeroChange('headlineHighlight', e.target.value)}
                style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
                placeholder="e.g. Roots"
              />
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#1B2E1E', display: 'block', marginBottom: '4px' }}>
              Main Headline (First Part)
            </label>
            <input
              type="text"
              value={heroContent.headlinePart1 || ''}
              onChange={(e) => handleHeroChange('headlinePart1', e.target.value)}
              style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
              placeholder="e.g. Beauty Begins at the"
            />
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#1B2E1E', display: 'block', marginBottom: '4px' }}>
              Hero Subtitle / Description Paragraph
            </label>
            <textarea
              rows={3}
              value={heroContent.subtitle || ''}
              onChange={(e) => handleHeroChange('subtitle', e.target.value)}
              style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem', fontFamily: 'inherit' }}
            />
          </div>

          {/* Hero Image Selector & Preview */}
          <div style={{ background: '#FAF8F5', padding: '1rem', borderRadius: '12px', border: '1px solid #E2DDCF' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#1B2E1E', display: 'block', marginBottom: '6px' }}>
              Hero Product Image URL / Path
            </label>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ width: '70px', height: '70px', borderRadius: '8px', background: '#FFFFFF', border: '1px solid #CBD5E1', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <img src={heroContent.image || '/assets/real_250ml_single.webp'} alt="Hero" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
              </div>
              <input
                type="text"
                value={heroContent.image || ''}
                onChange={(e) => handleHeroChange('image', e.target.value)}
                style={{ flex: 1, padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                placeholder="Paste Image URL from Media Library or /assets/..."
              />
            </div>
          </div>

          {/* CTA Buttons */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#1B2E1E', display: 'block', marginBottom: '4px' }}>
                Primary Button Text (Main Bottle)
              </label>
              <input
                type="text"
                value={heroContent.cta1Text || ''}
                onChange={(e) => handleHeroChange('cta1Text', e.target.value)}
                style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
                placeholder="Get 200ml Pack — Rs. 1,899"
              />
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#1B2E1E', display: 'block', marginBottom: '4px' }}>
                Secondary Button Text (Trial Bottle)
              </label>
              <input
                type="text"
                value={heroContent.cta2Text || ''}
                onChange={(e) => handleHeroChange('cta2Text', e.target.value)}
                style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
                placeholder="Get 100ml Trial — Rs. 999"
              />
            </div>
          </div>

          {/* Trust Guarantee Microcopy */}
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#1B2E1E', display: 'block', marginBottom: '4px' }}>
              Trust Guarantee Line (Under CTA)
            </label>
            <input
              type="text"
              value={heroContent.microcopy || ''}
              onChange={(e) => handleHeroChange('microcopy', e.target.value)}
              style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
            />
          </div>

          {/* 4 Trust Specs */}
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#1B2E1E', display: 'block', marginBottom: '6px' }}>
              4 Trust Highlights Bullets
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}>
              {(heroContent.trustSpecs || []).map((spec, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 style={{ width: '16px', height: '16px', color: '#047857', flexShrink: 0 }} />
                  <input
                    type="text"
                    value={spec}
                    onChange={(e) => handleTrustSpecChange(i, e.target.value)}
                    style={{ width: '100%', padding: '0.5rem 0.75rem', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.82rem' }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. ANNOUNCEMENTS */}
      {activeSection === 'announcements' && (
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: '800', color: '#1B2E1E', margin: '0 0 0.5rem' }}>
            Rotating Top Announcement Ticker Messages
          </h3>
          <p style={{ fontSize: '0.82rem', color: '#6B7280', margin: '0 0 1.25rem' }}>
            These messages rotate continuously at the very top of the website every 4 seconds.
          </p>

          <form onSubmit={handleAddAnnouncement} style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Write a new ticker announcement (e.g. 🎁 Free Delivery on all orders this weekend!)..."
              value={newAnnouncement}
              onChange={(e) => setNewAnnouncement(e.target.value)}
              style={{ flex: 1, minWidth: '280px', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
            />
            <button
              type="submit"
              style={{ padding: '0.65rem 1.25rem', background: '#1B2E1E', color: '#FAF8F5', border: 'none', borderRadius: '8px', fontWeight: '700', fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <Plus style={{ width: '15px', height: '15px' }} />
              <span>Add Message</span>
            </button>
          </form>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {announcements.map((text, idx) => (
              <div
                key={idx}
                style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', background: '#FAF8F5', borderRadius: '10px', border: '1px solid #E2DDCF' }}
              >
                <span style={{ fontSize: '0.8rem', fontWeight: '800', color: '#6A7B52', width: '24px' }}>
                  #{idx + 1}
                </span>
                <input
                  type="text"
                  value={text}
                  onChange={(e) => handleAnnouncementTextChange(idx, e.target.value)}
                  style={{ flex: 1, padding: '0.5rem 0.75rem', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveAnnouncement(idx)}
                  style={{ padding: '6px 10px', background: '#FEE2E2', color: '#DC2626', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                  title="Remove message"
                >
                  <Trash2 style={{ width: '14px', height: '14px' }} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. FLASH SALE BANNER */}
      {activeSection === 'flash' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: '#FAF8F5', borderRadius: '12px', border: '1px solid #E2DDCF' }}>
            <div>
              <strong style={{ fontSize: '0.95rem', color: '#1B2E1E', display: 'block' }}>
                Show Yellow Flash Sale Banner
              </strong>
              <span style={{ fontSize: '0.78rem', color: '#6B7280' }}>
                Shows the highlighted urgency discount box right above the product selection.
              </span>
            </div>

            <label style={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer', gap: '8px' }}>
              <input
                type="checkbox"
                checked={flashSaleBanner.enabled !== false}
                onChange={(e) => handleFlashChange('enabled', e.target.checked)}
                style={{ width: '20px', height: '20px', accentColor: '#1B2E1E', cursor: 'pointer' }}
              />
              <span style={{ fontSize: '0.85rem', fontWeight: '700', color: flashSaleBanner.enabled !== false ? '#047857' : '#9CA3AF' }}>
                {flashSaleBanner.enabled !== false ? 'ENABLED' : 'HIDDEN'}
              </span>
            </label>
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#1B2E1E', display: 'block', marginBottom: '4px' }}>
              Flash Sale Banner Text
            </label>
            <textarea
              rows={3}
              value={flashSaleBanner.text || ''}
              onChange={(e) => handleFlashChange('text', e.target.value)}
              style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem', fontFamily: 'inherit' }}
              placeholder="e.g. Exclusive 200ml Discount Offer: 1 Bottle for Rs. 1,899 | 2 Bottles for Rs. 3,499 (Free Delivery)!"
            />
          </div>
        </div>
      )}

      {/* 4. BUSINESS & CONTACT IDENTITY */}
      {activeSection === 'identity' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#1B2E1E', display: 'block', marginBottom: '4px' }}>
                Brand Name
              </label>
              <input
                type="text"
                value={siteSettings.brandName || ''}
                onChange={(e) => handleSiteChange('brandName', e.target.value)}
                style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#1B2E1E', display: 'block', marginBottom: '4px' }}>
                Brand Subtitle / Tagline
              </label>
              <input
                type="text"
                value={siteSettings.brandSubtitle || ''}
                onChange={(e) => handleSiteChange('brandSubtitle', e.target.value)}
                style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#1B2E1E', display: 'block', marginBottom: '4px' }}>
                WhatsApp Direct Number (With Country Code 92...)
              </label>
              <input
                type="text"
                value={siteSettings.whatsappPhone || ''}
                onChange={(e) => handleSiteChange('whatsappPhone', e.target.value)}
                style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
                placeholder="923061041609"
              />
              <span style={{ fontSize: '0.72rem', color: '#6B7280' }}>All WhatsApp chat buttons will use this number.</span>
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#1B2E1E', display: 'block', marginBottom: '4px' }}>
                WhatsApp Display Format (For footer/nav)
              </label>
              <input
                type="text"
                value={siteSettings.whatsappDisplay || ''}
                onChange={(e) => handleSiteChange('whatsappDisplay', e.target.value)}
                style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
                placeholder="+92 306 1041609"
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#1B2E1E', display: 'block', marginBottom: '4px' }}>
                Customer Service Email
              </label>
              <input
                type="email"
                value={siteSettings.contactEmail || ''}
                onChange={(e) => handleSiteChange('contactEmail', e.target.value)}
                style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#1B2E1E', display: 'block', marginBottom: '4px' }}>
                Physical Origin / Address
              </label>
              <input
                type="text"
                value={siteSettings.contactAddress || ''}
                onChange={(e) => handleSiteChange('contactAddress', e.target.value)}
                style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#1B2E1E', display: 'block', marginBottom: '4px' }}>
                Standard Courier Delivery Fee (Rs.)
              </label>
              <input
                type="number"
                value={siteSettings.shippingFee || 199}
                onChange={(e) => handleSiteChange('shippingFee', parseInt(e.target.value, 10) || 0)}
                style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#1B2E1E', display: 'block', marginBottom: '4px' }}>
                Free Delivery Threshold Amount (Rs.)
              </label>
              <input
                type="number"
                value={siteSettings.freeShippingThreshold || 3000}
                onChange={(e) => handleSiteChange('freeShippingThreshold', parseInt(e.target.value, 10) || 0)}
                style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#1B2E1E', display: 'block', marginBottom: '4px' }}>
                Instagram Profile URL
              </label>
              <input
                type="url"
                value={siteSettings.socialInstagram || ''}
                onChange={(e) => handleSiteChange('socialInstagram', e.target.value)}
                style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#1B2E1E', display: 'block', marginBottom: '4px' }}>
                Facebook Page URL
              </label>
              <input
                type="url"
                value={siteSettings.socialFacebook || ''}
                onChange={(e) => handleSiteChange('socialFacebook', e.target.value)}
                style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Bottom Save Action */}
      <div style={{ marginTop: '2rem', paddingTop: '1.25rem', borderTop: '1px solid #ECE7DD', display: 'flex', justifyContent: 'flex-end' }}>
        <button
          onClick={handleSaveAll}
          style={{
            padding: '0.75rem 2rem',
            background: '#047857',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '10px',
            fontSize: '0.95rem',
            fontWeight: '800',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 4px 14px rgba(4, 120, 87, 0.25)'
          }}
        >
          <Save style={{ width: '18px', height: '18px' }} />
          <span>Save & Apply Live Changes</span>
        </button>
      </div>
    </div>
  );
}
