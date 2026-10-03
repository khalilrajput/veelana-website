import React, { useState } from 'react';
import { HelpCircle, Plus, Edit, Trash2, Save, X, Sparkles } from 'lucide-react';
import { getCmsFaqs, addCmsFaq, updateCmsFaq, deleteCmsFaq } from '../../services/cmsService';

export default function AdminFaqManager({ showNotification }) {
  const [faqs, setFaqs] = useState(() => getCmsFaqs());
  const [editingFaq, setEditingFaq] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState('all');

  const [formData, setFormData] = useState({
    q: '',
    a: '',
    category: 'usage'
  });

  const handleStartAdd = () => {
    setEditingFaq(null);
    setFormData({ q: '', a: '', category: 'usage' });
    setIsFormOpen(true);
  };

  const handleStartEdit = (faq) => {
    setEditingFaq(faq);
    setFormData({
      q: faq.q || '',
      a: faq.a || '',
      category: faq.category || 'usage'
    });
    setIsFormOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.q.trim() || !formData.a.trim()) {
      alert('Please fill out both question and answer.');
      return;
    }

    if (editingFaq) {
      const updated = updateCmsFaq(editingFaq.id, formData);
      setFaqs(updated);
      if (showNotification) showNotification('✅ FAQ updated successfully!');
    } else {
      const updated = addCmsFaq(formData);
      setFaqs(updated);
      if (showNotification) showNotification('🎉 New FAQ added to knowledge base!');
    }

    setIsFormOpen(false);
    setEditingFaq(null);
  };

  const handleDelete = (id, question) => {
    if (window.confirm(`Delete question: "${question.slice(0, 40)}..."?`)) {
      const updated = deleteCmsFaq(id);
      setFaqs(updated);
      if (showNotification) showNotification('🗑️ FAQ deleted.');
    }
  };

  const filtered = faqs.filter(f => filterCategory === 'all' || f.category === filterCategory);

  return (
    <div style={{ background: '#FFFFFF', borderRadius: '20px', padding: '1.75rem', border: '1px solid #ECE7DD', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid #ECE7DD', paddingBottom: '1.25rem', marginBottom: '1.5rem' }}>
        <div>
          <span style={{ fontSize: '0.72rem', color: '#6A7B52', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: '800' }}>
            HELP DESK & KNOWLEDGE BASE CMS
          </span>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: '800', color: '#1B2E1E', margin: '2px 0 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <HelpCircle style={{ width: '22px', height: '22px', color: '#4F5D38' }} />
            <span>Frequently Asked Questions ({faqs.length})</span>
          </h2>
          <p style={{ fontSize: '0.82rem', color: '#6B7280', margin: '4px 0 0' }}>
            Add, update, or remove answers about hair oil application, ingredients, delivery, and payments.
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
          <span>Add New FAQ</span>
        </button>
      </div>

      {/* Form Modal / Drawer */}
      {isFormOpen && (
        <div style={{ background: '#FAF8F3', borderRadius: '16px', padding: '1.5rem', border: '1px solid #E2DDCF', marginBottom: '1.75rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#1B2E1E', margin: 0 }}>
              {editingFaq ? 'Edit FAQ' : 'Add New FAQ'}
            </h3>
            <button
              onClick={() => setIsFormOpen(false)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6B7280' }}
            >
              <X style={{ width: '20px', height: '20px' }} />
            </button>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#1B2E1E', display: 'block', marginBottom: '4px' }}>
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                style={{ width: '100%', maxWidth: '300px', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem', background: '#FFFFFF' }}
              >
                <option value="usage">Usage & Routine</option>
                <option value="formula">Formula & Safety</option>
                <option value="shipping">Shipping & Delivery</option>
                <option value="orders">Payment & Orders</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#1B2E1E', display: 'block', marginBottom: '4px' }}>
                Question
              </label>
              <input
                type="text"
                placeholder="e.g. Can men use Veelana Oil for beard growth?"
                value={formData.q}
                onChange={(e) => setFormData({ ...formData, q: e.target.value })}
                required
                style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#1B2E1E', display: 'block', marginBottom: '4px' }}>
                Answer
              </label>
              <textarea
                rows={4}
                placeholder="Detailed helpful answer..."
                value={formData.a}
                onChange={(e) => setFormData({ ...formData, a: e.target.value })}
                required
                style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem', fontFamily: 'inherit' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
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
                <span>{editingFaq ? 'Save FAQ' : 'Add FAQ'}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Category Filter */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
        {[
          { id: 'all', label: 'All FAQs' },
          { id: 'usage', label: 'Usage & Routine' },
          { id: 'formula', label: 'Formula & Safety' },
          { id: 'shipping', label: 'Shipping & Delivery' },
          { id: 'orders', label: 'Orders & Payments' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterCategory(tab.id)}
            style={{
              padding: '0.4rem 0.85rem',
              borderRadius: '6px',
              border: '1px solid #CBD5E1',
              background: filterCategory === tab.id ? '#1B2E1E' : '#FFFFFF',
              color: filterCategory === tab.id ? '#FFFFFF' : '#4B5563',
              fontSize: '0.78rem',
              fontWeight: '700',
              cursor: 'pointer'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* FAQs List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filtered.map((faq) => (
          <div
            key={faq.id}
            style={{
              background: '#FAF8F5',
              borderRadius: '12px',
              border: '1px solid #E2DDCF',
              padding: '1.15rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
              <div>
                <span style={{
                  fontSize: '0.68rem',
                  fontWeight: '800',
                  textTransform: 'uppercase',
                  color: '#047857',
                  background: 'rgba(4, 120, 87, 0.1)',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  display: 'inline-block',
                  marginBottom: '4px'
                }}>
                  {faq.category || 'General'}
                </span>
                <h4 style={{ fontSize: '0.95rem', fontWeight: '800', color: '#1B2E1E', margin: '2px 0 0' }}>
                  {faq.q}
                </h4>
              </div>

              <div style={{ display: 'flex', gap: '0.4rem', flexShrink: 0 }}>
                <button
                  onClick={() => handleStartEdit(faq)}
                  style={{ padding: '5px 8px', background: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', fontWeight: '700' }}
                >
                  <Edit style={{ width: '12px', height: '12px' }} />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(faq.id, faq.q)}
                  style={{ padding: '5px 7px', background: '#FEE2E2', color: '#DC2626', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                >
                  <Trash2 style={{ width: '13px', height: '13px' }} />
                </button>
              </div>
            </div>

            <p style={{ fontSize: '0.85rem', color: '#4B5563', margin: 0, lineHeight: 1.5 }}>
              {faq.a}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
