import React, { useState } from 'react';
import { Star, MessageCircle, Plus, Edit, Trash2, CheckCircle2, Image as ImageIcon, Save, X, Sparkles } from 'lucide-react';
import { getCmsReviews, addCmsReview, updateCmsReview, deleteCmsReview } from '../../services/cmsService';

export default function AdminReviewsManager({ showNotification }) {
  const [reviews, setReviews] = useState(() => getCmsReviews());
  const [editingReview, setEditingReview] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [formData, setFormData] = useState({
    customerName: '',
    location: '',
    bottlePurchased: '200ml Master Bottle',
    rating: 5,
    quote: '',
    highlight: '',
    image: '/assets/reviews/review_hair_thickening.jpeg',
    verified: true,
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

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete review from "${name || 'this customer'}"?`)) {
      const updated = deleteCmsReview(id);
      setReviews(updated);
      if (showNotification) showNotification('🗑️ Review deleted.');
    }
  };

  return (
    <div style={{ background: '#FFFFFF', borderRadius: '20px', padding: '1.75rem', border: '1px solid #ECE7DD', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid #ECE7DD', paddingBottom: '1.25rem', marginBottom: '1.5rem' }}>
        <div>
          <span style={{ fontSize: '0.72rem', color: '#6A7B52', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: '800' }}>
            SOCIAL PROOF & TESTIMONIALS CMS
          </span>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: '800', color: '#1B2E1E', margin: '2px 0 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MessageCircle style={{ width: '22px', height: '22px', color: '#25D366' }} />
            <span>Customer WhatsApp Reviews ({reviews.length})</span>
          </h2>
          <p style={{ fontSize: '0.82rem', color: '#6B7280', margin: '4px 0 0' }}>
            Manage the customer feedback cards and WhatsApp screenshot proof shown on the website.
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
          <span>Add New Review</span>
        </button>
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
                  Screenshot Image URL
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

      {/* Reviews List */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
        {reviews.map((rev) => (
          <div
            key={rev.id}
            style={{
              background: '#FAF8F5',
              borderRadius: '14px',
              border: '1px solid #E2DDCF',
              padding: '1.15rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '0.85rem'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: '800', color: '#1B2E1E', margin: 0 }}>
                    {rev.customerName}
                  </h4>
                  <span style={{ fontSize: '0.75rem', color: '#6A7B52', display: 'block' }}>
                    {rev.location} • {rev.bottlePurchased}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '2px', color: '#EAB308' }}>
                  {[...Array(rev.rating || 5)].map((_, i) => (
                    <Star key={i} style={{ width: '14px', height: '14px', fill: 'currentColor' }} />
                  ))}
                </div>
              </div>

              {rev.highlight && (
                <span style={{
                  display: 'inline-block',
                  background: 'rgba(4, 120, 87, 0.1)',
                  color: '#065F46',
                  fontSize: '0.72rem',
                  fontWeight: '700',
                  padding: '2px 8px',
                  borderRadius: '999px',
                  marginBottom: '0.5rem'
                }}>
                  {rev.highlight}
                </span>
              )}

              <p style={{ fontSize: '0.82rem', color: '#374151', fontStyle: 'italic', margin: '0 0 0.75rem', lineHeight: 1.4 }}>
                "{rev.quote}"
              </p>

              {rev.image && (
                <div style={{ height: '70px', width: '70px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #D1D5DB', background: '#FFFFFF' }}>
                  <img src={rev.image} alt={rev.customerName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', borderTop: '1px solid #ECE7DD', paddingTop: '0.65rem' }}>
              <button
                onClick={() => handleStartEdit(rev)}
                style={{ padding: '5px 10px', background: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                <Edit style={{ width: '12px', height: '12px' }} />
                <span>Edit</span>
              </button>
              <button
                onClick={() => handleDelete(rev.id, rev.customerName)}
                style={{ padding: '5px 8px', background: '#FEE2E2', border: 'none', color: '#DC2626', borderRadius: '6px', cursor: 'pointer' }}
                title="Delete review"
              >
                <Trash2 style={{ width: '13px', height: '13px' }} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
