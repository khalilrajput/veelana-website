import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, Trash2, Copy, Check, Plus, Search, ExternalLink, Sparkles, AlertCircle } from 'lucide-react';
import { getMediaLibrary, addMediaItem, deleteMediaItem } from '../../services/cmsService';

export default function AdminMediaManager({ onSelectImage, showNotification }) {
  const [media, setMedia] = useState(() => getMediaLibrary());
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all'); // 'all', 'preset', 'upload'
  const [copiedId, setCopiedId] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [urlName, setUrlName] = useState('');
  const [showUrlModal, setShowUrlModal] = useState(false);
  const fileInputRef = useRef(null);

  const handleCopyUrl = (item) => {
    navigator.clipboard.writeText(item.url);
    setCopiedId(item.id);
    if (showNotification) showNotification('📋 Image URL copied to clipboard!');
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (PNG, JPG, JPEG, WEBP, or SVG).');
      return;
    }

    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxDim = 900;
        let { width, height } = img;
        if (width > height) {
          if (width > maxDim) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          }
        } else {
          if (height > maxDim) {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        const compressedDataUrl = canvas.toDataURL('image/webp', 0.86);
        const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
        const updated = addMediaItem({
          name: cleanName,
          url: compressedDataUrl
        });
        setMedia(updated);
        setIsUploading(false);
        if (showNotification) showNotification(`📷 "${cleanName}" uploaded and optimized!`);
      };
      img.onerror = () => {
        setIsUploading(false);
        alert('Could not process this image file.');
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleAddByUrl = (e) => {
    e.preventDefault();
    if (!urlInput.trim()) return;
    const name = urlName.trim() || 'Linked Image';
    const updated = addMediaItem({
      name,
      url: urlInput.trim()
    });
    setMedia(updated);
    setUrlInput('');
    setUrlName('');
    setShowUrlModal(false);
    if (showNotification) showNotification(`🔗 Image added via URL!`);
  };

  const handleDelete = (item) => {
    if (item.isPreset) {
      alert('Built-in store assets cannot be deleted to avoid breaking design.');
      return;
    }
    if (window.confirm(`Are you sure you want to remove "${item.name}" from Media Library?`)) {
      const updated = deleteMediaItem(item.id);
      setMedia(updated);
      if (showNotification) showNotification('🗑️ Image deleted from Media Library.');
    }
  };

  const filtered = media.filter((m) => {
    const matchesSearch = (m.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (m.url || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' ||
                          (filterType === 'preset' && m.isPreset) ||
                          (filterType === 'upload' && !m.isPreset);
    return matchesSearch && matchesFilter;
  });

  return (
    <div style={{ background: '#FFFFFF', borderRadius: '20px', padding: '1.75rem', border: '1px solid #ECE7DD', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid #ECE7DD', paddingBottom: '1.25rem', marginBottom: '1.5rem' }}>
        <div>
          <span style={{ fontSize: '0.72rem', color: '#6A7B52', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: '800' }}>
            WORDPRESS-STYLE ASSET MANAGER
          </span>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: '800', color: '#1B2E1E', margin: '2px 0 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ImageIcon style={{ width: '22px', height: '22px', color: '#4F5D38' }} />
            <span>Store Media & Image Library</span>
          </h2>
          <p style={{ fontSize: '0.82rem', color: '#6B7280', margin: '4px 0 0' }}>
            Upload new photos from your phone/PC, copy URLs, and easily use them across products, hero banners, and customer reviews.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            style={{ display: 'none' }}
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            style={{
              padding: '0.65rem 1.2rem',
              background: '#1B2E1E',
              color: '#FAF8F5',
              border: 'none',
              borderRadius: '10px',
              fontSize: '0.85rem',
              fontWeight: '700',
              cursor: isUploading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 4px 12px rgba(27, 46, 30, 0.15)',
              opacity: isUploading ? 0.7 : 1
            }}
          >
            <Upload style={{ width: '15px', height: '15px', color: '#D4AF37' }} />
            <span>{isUploading ? 'Compressing & Uploading...' : 'Upload Image from Device'}</span>
          </button>

          <button
            onClick={() => setShowUrlModal(true)}
            style={{
              padding: '0.65rem 1.1rem',
              background: '#F4EFEB',
              color: '#2A361E',
              border: '1px solid #D6D0C2',
              borderRadius: '10px',
              fontSize: '0.85rem',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Plus style={{ width: '15px', height: '15px' }} />
            <span>Add by Web URL</span>
          </button>
        </div>
      </div>

      {/* URL Modal */}
      {showUrlModal && (
        <div style={{ background: '#FAF8F3', padding: '1.25rem', borderRadius: '14px', border: '1px solid #E2DDCF', marginBottom: '1.5rem' }}>
          <h4 style={{ fontSize: '0.92rem', fontWeight: '800', color: '#1B2E1E', margin: '0 0 0.75rem' }}>
            Add External Image Link
          </h4>
          <form onSubmit={handleAddByUrl} style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Image Name / Label (e.g. New Promo Banner)"
              value={urlName}
              onChange={(e) => setUrlName(e.target.value)}
              style={{ flex: '1 1 200px', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
            />
            <input
              type="url"
              placeholder="Paste direct Image URL (https://...)"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              required
              style={{ flex: '2 1 300px', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
            />
            <button
              type="submit"
              style={{ padding: '0.6rem 1.25rem', background: '#047857', color: '#FFFFFF', border: 'none', borderRadius: '8px', fontWeight: '700', fontSize: '0.85rem', cursor: 'pointer' }}
            >
              Add to Library
            </button>
            <button
              type="button"
              onClick={() => setShowUrlModal(false)}
              style={{ padding: '0.6rem 1rem', background: '#E2DDCF', color: '#333333', border: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '0.85rem', cursor: 'pointer' }}
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* Search and Filters */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ position: 'relative', width: '100%', maxWidth: '360px' }}>
          <Search style={{ position: 'absolute', left: '12px', top: '10px', width: '16px', height: '16px', color: '#9CA3AF' }} />
          <input
            type="text"
            placeholder="Search images by name or URL..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', padding: '0.55rem 0.85rem 0.55rem 2.25rem', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.82rem' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '0.4rem' }}>
          {[
            { id: 'all', label: `All (${media.length})` },
            { id: 'upload', label: `My Uploads (${media.filter(m => !m.isPreset).length})` },
            { id: 'preset', label: `Presets (${media.filter(m => m.isPreset).length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterType(tab.id)}
              style={{
                padding: '0.4rem 0.85rem',
                borderRadius: '6px',
                border: '1px solid #D1D5DB',
                background: filterType === tab.id ? '#1B2E1E' : '#FFFFFF',
                color: filterType === tab.id ? '#FFFFFF' : '#4B5563',
                fontSize: '0.78rem',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Images */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#6B7280' }}>
          <ImageIcon style={{ width: '40px', height: '40px', color: '#CBD5E1', margin: '0 auto 0.75rem' }} />
          <p style={{ margin: 0, fontWeight: '600' }}>No images match your search.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1.25rem' }}>
          {filtered.map((item) => {
            const isCopied = copiedId === item.id;
            return (
              <div
                key={item.id}
                style={{
                  background: '#FAF8F5',
                  borderRadius: '14px',
                  border: '1px solid #E2DDCF',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  position: 'relative',
                }}
              >
                {/* Thumbnail */}
                <div
                  style={{
                    height: '140px',
                    background: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '8px',
                    borderBottom: '1px solid #ECE7DD',
                    overflow: 'hidden'
                  }}
                >
                  <img
                    src={item.url}
                    alt={item.name}
                    style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                    loading="lazy"
                    onError={(e) => { e.currentTarget.src = '/assets/real_100ml_double.webp'; }}
                  />
                </div>

                {/* Badge */}
                <span style={{
                  position: 'absolute',
                  top: '8px',
                  left: '8px',
                  fontSize: '0.62rem',
                  fontWeight: '800',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  background: item.isPreset ? 'rgba(27, 46, 30, 0.85)' : '#047857',
                  color: '#FFFFFF'
                }}>
                  {item.isPreset ? 'STORE PRESET' : 'UPLOADED'}
                </span>

                {/* Info & Actions */}
                <div style={{ padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', flex: 1 }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: '700', color: '#1B2E1E', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={item.name}>
                    {item.name}
                  </div>

                  <div style={{ display: 'flex', gap: '0.35rem', marginTop: 'auto', paddingTop: '0.4rem' }}>
                    <button
                      onClick={() => handleCopyUrl(item)}
                      title="Copy Image URL"
                      style={{
                        flex: 1,
                        padding: '5px',
                        background: isCopied ? '#047857' : '#FFFFFF',
                        color: isCopied ? '#FFFFFF' : '#1B2E1E',
                        border: '1px solid #CBD5E1',
                        borderRadius: '6px',
                        fontSize: '0.72rem',
                        fontWeight: '700',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '4px'
                      }}
                    >
                      {isCopied ? <Check style={{ width: '12px', height: '12px' }} /> : <Copy style={{ width: '12px', height: '12px' }} />}
                      <span>{isCopied ? 'Copied' : 'Copy URL'}</span>
                    </button>

                    {onSelectImage && (
                      <button
                        onClick={() => onSelectImage(item.url)}
                        title="Select this image"
                        style={{
                          padding: '5px 8px',
                          background: '#1B2E1E',
                          color: '#FFFFFF',
                          border: 'none',
                          borderRadius: '6px',
                          fontSize: '0.72rem',
                          fontWeight: '700',
                          cursor: 'pointer'
                        }}
                      >
                        Select
                      </button>
                    )}

                    {!item.isPreset && (
                      <button
                        onClick={() => handleDelete(item)}
                        title="Delete image"
                        style={{
                          padding: '5px 7px',
                          background: '#FEE2E2',
                          color: '#DC2626',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer'
                        }}
                      >
                        <Trash2 style={{ width: '13px', height: '13px' }} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
