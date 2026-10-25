import React, { useState } from 'react';
import { Star, MessageCircle, Plus, Edit, Trash2, CheckCircle2, Image as ImageIcon, Save, X, Sparkles, Filter, Search, Eye, EyeOff, ShieldCheck, User } from 'lucide-react';
import { getCmsReviews, addCmsReview, updateCmsReview, deleteCmsReview } from '../../services/cmsService';
import { decrementUserReviewCount } from '../../services/userService';


const GoogleIcon = ({ size = 14 }) => (
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

export default function AdminReviewsManager({ showNotification }) {
  const [reviews, setReviews] = useState(() => getCmsReviews());
  const [editingReview, setEditingReview] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [filterType, setFilterType] = useState('all'); // 'all', 'customer', 'admin'
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState({
    customerName: '',
    location: '',
    bottlePurchased: '200ml Master Bottle',
    rating: 5,
    quote: '',
    highlight: '',
    image: '/assets/reviews/review_hair_thickening.jpeg',
    verified: true,
    status: 'approved',
  });

  const handleStartAdd = () => {
    setEditingReview(null);
    setFormData({
      customerName: '',
      location: '',
      bottlePurchased: '200ml Master Bottle',
      rating: 5,
      quote: '',
      highlight: '',
      image: '/assets/reviews/review_hair_thickening.jpeg',
      verified: true,
      status: 'approved',
    });
    setIsFormOpen(true);
  };

  const handleStartEdit = (rev) => {
    setEditingReview(rev);
    setFormData({
      customerName: rev.customerName || '',
      location: rev.location || '',
      bottlePurchased: rev.bottlePurchased || '200ml Master Bottle',
      rating: rev.rating || 5,
      quote: rev.quote || '',
      highlight: rev.highlight || '',
      image: rev.image || '',
      verified: rev.verified !== false,
      status: rev.status || 'approved',
    });
    setIsFormOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.customerName.trim() || !formData.quote.trim()) {
      alert('Please provide customer name and review text.');
      return;
    }

    if (editingReview) {
      const updated = updateCmsReview(editingReview.id, formData);
      setReviews(updated);
      if (showNotification) showNotification(`✅ Review for "${formData.customerName}" updated!`);
    } else {
      const updated = addCmsReview(formData);
      setReviews(updated);
      if (showNotification) showNotification(`🎉 New review from "${formData.customerName}" added!`);
    }

    setIsFormOpen(false);
    setEditingReview(null);
  };

  const handleDelete = (id, name, userEmail) => {
    if (window.confirm(`Are you sure you want to remove this review from "${name || 'this customer'}"? It will be deleted from the site.`)) {
      const updated = deleteCmsReview(id);
      if (userEmail) {
        decrementUserReviewCount(userEmail);
      }
      setReviews(updated);
      if (showNotification) showNotification('🗑️ Review successfully removed from website.');
    }
  };


  const handleToggleStatus = (rev) => {
    const newStatus = rev.status === 'hidden' ? 'approved' : 'hidden';
    const updated = updateCmsReview(rev.id, { status: newStatus });
    setReviews(updated);
    if (showNotification) {
      showNotification(newStatus === 'approved' ? '👁️ Review is now visible on site' : '🙈 Review hidden from site');
    }
  };

  // Filter & Search logic
  const filteredReviews = reviews.filter((r) => {
    // Type filter
    if (filterType === 'customer' && !r.isCustomerSubmitted) return false;
    if (filterType === 'admin' && r.isCustomerSubmitted) return false;

    // Search filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      const matchName = (r.customerName || '').toLowerCase().includes(term);
      const matchLoc = (r.location || '').toLowerCase().includes(term);
      const matchQuote = (r.quote || '').toLowerCase().includes(term);
      const matchHighlight = (r.highlight || '').toLowerCase().includes(term);
      return matchName || matchLoc || matchQuote || matchHighlight;
    }
    return true;
  });

  const totalCount = reviews.length;
  const customerSubmissionsCount = reviews.filter(r => r.isCustomerSubmitted).length;
  const fiveStarCount = reviews.filter(r => (r.rating || 5) === 5).length;

  return (
    <div style={{ background: '#FFFFFF', borderRadius: '20px', padding: '1.75rem', border: '1px solid #ECE7DD', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
      
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid #ECE7DD', paddingBottom: '1.25rem', marginBottom: '1.5rem' }}>
        <div>
          <span style={{ fontSize: '0.72rem', color: '#6A7B52', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: '800' }}>
            CUSTOMER REVIEWS & SOCIAL PROOF CMS
          </span>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: '800', color: '#1B2E1E', margin: '2px 0 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MessageCircle style={{ width: '22px', height: '22px', color: '#25D366' }} />
            <span>Customer Reviews Moderation ({totalCount})</span>
          </h2>
          <p style={{ fontSize: '0.82rem', color: '#6B7280', margin: '4px 0 0' }}>
            Manage customer reviews submitted through the website, WhatsApp proof screenshots, and moderate/remove reviews.
          </p>
        </div>

        <button
          onClick={handleStartAdd}
          style={{
            padding: '0.65rem 1.25rem',
            background: '#1B2E1E',
            color: '#FAF8F5',
            border: 'none',
            borderRadius: '10px',
            fontSize: '0.85rem',
            fontWeight: '700',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 4px 12px rgba(27, 46, 30, 0.15)'
          }}
        >
          <Plus style={{ width: '16px', height: '16px', color: '#D4AF37' }} />
          <span>Add Custom Review</span>
        </button>
      </div>

      {/* Metrics Quick Strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ background: '#FAF8F5', border: '1px solid #EAE5D9', borderRadius: '12px', padding: '1rem' }}>
          <span style={{ fontSize: '0.75rem', color: '#6A7B52', fontWeight: '700', textTransform: 'uppercase' }}>Total Reviews</span>
          <div style={{ fontSize: '1.6rem', fontWeight: '800', color: '#1B2E1E', marginTop: '2px' }}>{totalCount}</div>
        </div>

        <div style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '12px', padding: '1rem' }}>
          <span style={{ fontSize: '0.75rem', color: '#047857', fontWeight: '700', textTransform: 'uppercase' }}>Customer Submitted</span>
          <div style={{ fontSize: '1.6rem', fontWeight: '800', color: '#065F46', marginTop: '2px' }}>{customerSubmissionsCount}</div>
        </div>

        <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: '12px', padding: '1rem' }}>
          <span style={{ fontSize: '0.75rem', color: '#B45309', fontWeight: '700', textTransform: 'uppercase' }}>5-Star Ratings</span>
          <div style={{ fontSize: '1.6rem', fontWeight: '800', color: '#92400E', marginTop: '2px' }}>{fiveStarCount}</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
        
        {/* Filter Buttons */}
        <div style={{ display: 'flex', gap: '0.5rem', background: '#FAF8F5', padding: '4px', borderRadius: '10px', border: '1px solid #ECE7DD' }}>
          <button
            onClick={() => setFilterType('all')}
            style={{
              padding: '5px 12px',
              borderRadius: '7px',
              border: 'none',
              fontSize: '0.78rem',
              fontWeight: '700',
              cursor: 'pointer',
              background: filterType === 'all' ? '#1B2E1E' : 'transparent',
              color: filterType === 'all' ? '#FAF8F5' : '#4A5543',
            }}
          >
            All Reviews ({reviews.length})
          </button>

          <button
            onClick={() => setFilterType('customer')}
            style={{
              padding: '5px 12px',
              borderRadius: '7px',
              border: 'none',
              fontSize: '0.78rem',
              fontWeight: '700',
              cursor: 'pointer',
              background: filterType === 'customer' ? '#1B2E1E' : 'transparent',
              color: filterType === 'customer' ? '#FAF8F5' : '#4A5543',
            }}
          >
            Customer Submissions ({customerSubmissionsCount})
          </button>

          <button
            onClick={() => setFilterType('admin')}
            style={{
              padding: '5px 12px',
              borderRadius: '7px',
              border: 'none',
              fontSize: '0.78rem',
              fontWeight: '700',
              cursor: 'pointer',
              background: filterType === 'admin' ? '#1B2E1E' : 'transparent',
              color: filterType === 'admin' ? '#FAF8F5' : '#4A5543',
            }}
          >
            WhatsApp Proofs ({totalCount - customerSubmissionsCount})
          </button>
        </div>

        {/* Search Input */}
        <div style={{ position: 'relative', minWidth: '240px' }}>
          <Search style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', width: '15px', height: '15px', color: '#7A8C74' }} />
          <input
            type="text"
            placeholder="Search reviews by name or text..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem 0.75rem 0.5rem 2rem',
              fontSize: '0.82rem',
              borderRadius: '8px',
              border: '1px solid #D6D0C2',
              outline: 'none',
              background: '#FFFFFF',
            }}
          />
        </div>

      </div>

      {/* Form Modal / Panel */}
      {isFormOpen && (
        <div style={{ background: '#FAF8F3', borderRadius: '16px', padding: '1.5rem', border: '1px solid #E2DDCF', marginBottom: '1.75rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#1B2E1E', margin: 0 }}>
              {editingReview ? 'Edit Review' : 'Add New Customer Review'}
            </h3>
            <button
              onClick={() => setIsFormOpen(false)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6B7280' }}
            >
              <X style={{ width: '20px', height: '20px' }} />
            </button>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#1B2E1E', display: 'block', marginBottom: '4px' }}>
                  Customer Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sana K."
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  required
                  style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#1B2E1E', display: 'block', marginBottom: '4px' }}>
                  City / Location
                </label>
                <input
                  type="text"
                  placeholder="e.g. Lahore, Punjab"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#1B2E1E', display: 'block', marginBottom: '4px' }}>
                  Bottle / Package Used
                </label>
                <input
                  type="text"
                  placeholder="e.g. 200ml Master Bottle"
                  value={formData.bottlePurchased}
                  onChange={(e) => setFormData({ ...formData, bottlePurchased: e.target.value })}
                  style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#1B2E1E', display: 'block', marginBottom: '4px' }}>
                Key Result Highlight Badge
              </label>
              <input
                type="text"
                placeholder="e.g. Hair Fall Stopped in 14 Days"
                value={formData.highlight}
                onChange={(e) => setFormData({ ...formData, highlight: e.target.value })}
                style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#1B2E1E', display: 'block', marginBottom: '4px' }}>
                Review Quote / Feedback Message
              </label>
              <textarea
                rows={3}
                placeholder="Customer's exact words..."
                value={formData.quote}
                onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                required
                style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem', fontFamily: 'inherit' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', alignItems: 'center' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#1B2E1E', display: 'block', marginBottom: '4px' }}>
                  Screenshot / Image URL
                </label>
                <input
                  type="text"
                  placeholder="Paste image path or URL from Media Library"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#1B2E1E', display: 'block', marginBottom: '4px' }}>
                  Star Rating (1 to 5)
                </label>
                <select
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value, 10) })}
                  style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem', background: '#FFFFFF' }}
                >
                  <option value={5}>⭐⭐⭐⭐⭐ 5 Stars</option>
                  <option value={4}>⭐⭐⭐⭐ 4 Stars</option>
                  <option value={3}>⭐⭐⭐ 3 Stars</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                style={{ padding: '0.6rem 1.25rem', background: '#E2DDCF', color: '#333333', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                type="submit"
                style={{ padding: '0.6rem 1.5rem', background: '#047857', color: '#FFFFFF', border: 'none', borderRadius: '8px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <Save style={{ width: '15px', height: '15px' }} />
                <span>{editingReview ? 'Update Review' : 'Save & Publish Review'}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Reviews List Grid */}
      {filteredReviews.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem 1rem', background: '#FAF8F5', borderRadius: '16px', border: '1px dashed #D6D0C2' }}>
          <MessageCircle style={{ width: '36px', height: '36px', color: '#8A9A86', margin: '0 auto 0.75rem' }} />
          <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#1B2E1E', margin: '0 0 0.25rem' }}>No reviews found</h4>
          <p style={{ fontSize: '0.82rem', color: '#6A7B52', margin: 0 }}>Try clearing your search query or switching filters.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {filteredReviews.map((rev) => {
            const isHidden = rev.status === 'hidden';

            return (
              <div
                key={rev.id}
                style={{
                  background: isHidden ? '#F9FAFB' : '#FAF8F5',
                  borderRadius: '16px',
                  border: isHidden ? '1px dashed #D1D5DB' : '1px solid #E2DDCF',
                  padding: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '1rem',
                  opacity: isHidden ? 0.75 : 1,
                  position: 'relative',
                }}
              >
                <div>
                  {/* Top user row */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.65rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {rev.image ? (
                        <img
                          src={rev.image}
                          alt={rev.customerName}
                          style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '1px solid #D1D5DB' }}
                          onError={(e) => {
                            e.currentTarget.src = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(rev.customerName || 'V')}&backgroundColor=1B2E1E`;
                          }}
                        />
                      ) : (
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#1B2E1E', color: '#FAF8F5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                          {(rev.customerName || 'V')[0]}
                        </div>
                      )}

                      <div>
                        <h4 style={{ fontSize: '0.95rem', fontWeight: '800', color: '#1B2E1E', margin: 0 }}>
                          {rev.customerName}
                        </h4>
                        <span style={{ fontSize: '0.75rem', color: '#6A7B52', display: 'block' }}>
                          📍 {rev.location || 'Pakistan'} • {rev.bottlePurchased}
                        </span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '2px', color: '#EAB308' }}>
                      {[...Array(rev.rating || 5)].map((_, i) => (
                        <Star key={i} style={{ width: '14px', height: '14px', fill: 'currentColor' }} />
                      ))}
                    </div>
                  </div>

                  {/* Badges strip */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', marginBottom: '0.65rem' }}>
                    {rev.isCustomerSubmitted ? (
                      <span style={{ background: '#ECFDF5', color: '#047857', fontSize: '0.68rem', fontWeight: '800', padding: '2px 8px', borderRadius: '999px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <GoogleIcon size={12} />
                        <span>Customer Submitted</span>
                      </span>
                    ) : (
                      <span style={{ background: '#EAEFE4', color: '#1B2E1E', fontSize: '0.68rem', fontWeight: '800', padding: '2px 8px', borderRadius: '999px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <MessageCircle style={{ width: '12px', height: '12px', color: '#25D366' }} />
                        <span>WhatsApp Chat Proof</span>
                      </span>
                    )}

                    {isHidden && (
                      <span style={{ background: '#FEE2E2', color: '#DC2626', fontSize: '0.68rem', fontWeight: '800', padding: '2px 8px', borderRadius: '999px' }}>
                        Hidden from Site
                      </span>
                    )}
                  </div>

                  {rev.highlight && (
                    <div style={{ fontSize: '0.85rem', fontWeight: '800', color: '#1B2E1E', marginBottom: '0.35rem' }}>
                      ✨ "{rev.highlight}"
                    </div>
                  )}

                  <p style={{ fontSize: '0.82rem', color: '#374151', fontStyle: 'italic', margin: 0, lineHeight: 1.5 }}>
                    "{rev.quote}"
                  </p>

                  {rev.userEmail && (
                    <span style={{ fontSize: '0.7rem', color: '#6B7280', display: 'block', marginTop: '0.5rem' }}>
                      ✉️ {rev.userEmail}
                    </span>
                  )}
                </div>

                {/* Bottom Actions: Edit, Hide/Show, and Remove */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #ECE7DD', paddingTop: '0.75rem', marginTop: '0.25rem' }}>
                  
                  {/* Visibility toggle */}
                  <button
                    onClick={() => handleToggleStatus(rev)}
                    style={{
                      padding: '5px 9px',
                      background: isHidden ? '#ECFDF5' : '#F3F4F6',
                      border: '1px solid #D1D5DB',
                      borderRadius: '6px',
                      fontSize: '0.72rem',
                      fontWeight: '700',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      color: isHidden ? '#047857' : '#4B5563',
                    }}
                    title={isHidden ? 'Publish on website' : 'Hide from website'}
                  >
                    {isHidden ? <Eye style={{ width: '13px', height: '13px' }} /> : <EyeOff style={{ width: '13px', height: '13px' }} />}
                    <span>{isHidden ? 'Show on Site' : 'Hide'}</span>
                  </button>

                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => handleStartEdit(rev)}
                      style={{ padding: '5px 10px', background: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                      <Edit style={{ width: '12px', height: '12px' }} />
                      <span>Edit</span>
                    </button>

                    {/* RED REMOVE BUTTON AS REQUESTED BY USER */}
                    <button
                      onClick={() => handleDelete(rev.id, rev.customerName, rev.userEmail)}
                      style={{
                        padding: '5px 10px',
                        background: '#DC2626',
                        color: '#FFFFFF',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '0.75rem',
                        fontWeight: '800',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        boxShadow: '0 2px 5px rgba(220, 38, 38, 0.25)',
                      }}
                      title="Remove and permanently delete this review from website"
                    >
                      <Trash2 style={{ width: '13px', height: '13px' }} />
                      <span>Remove</span>
                    </button>

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
