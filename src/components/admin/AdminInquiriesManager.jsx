import React, { useState, useEffect } from 'react';
import { Mail, MessageCircle, Phone, CheckCircle2, Clock, Trash2, Search, Download, ExternalLink, User, HelpCircle } from 'lucide-react';
import { getInquiries, updateInquiryStatus, deleteInquiry } from '../../services/inquiryService';

export default function AdminInquiriesManager({ showNotification }) {
  const [inquiries, setInquiries] = useState(() => getInquiries());
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'pending', 'resolved'

  useEffect(() => {
    const handleUpdate = () => {
      setInquiries(getInquiries());
    };
    window.addEventListener('veelana_inquiries_updated', handleUpdate);
    return () => window.removeEventListener('veelana_inquiries_updated', handleUpdate);
  }, []);

  const handleToggleStatus = (id, currentStatus) => {
    const nextStatus = currentStatus === 'resolved' ? 'pending' : 'resolved';
    const updated = updateInquiryStatus(id, nextStatus);
    setInquiries(updated);
    if (showNotification) {
      showNotification(nextStatus === 'resolved' ? '✅ Inquiry marked as resolved!' : '⏳ Inquiry marked as pending.');
    }
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete inquiry message from "${name || 'Customer'}"?`)) {
      const updated = deleteInquiry(id);
      setInquiries(updated);
      if (showNotification) showNotification('🗑️ Inquiry deleted.');
    }
  };

  const handleExportCSV = () => {
    if (!inquiries || inquiries.length === 0) {
      alert('No inquiries to export.');
      return;
    }

    const headers = ['ID', 'Date', 'Customer Name', 'Phone', 'Topic', 'Message', 'Status'];
    const rows = inquiries.map(i => [
      `"${i.id}"`,
      `"${i.createdAt || ''}"`,
      `"${i.name || ''}"`,
      `"${i.phone || ''}"`,
      `"${i.topic || ''}"`,
      `"${(i.message || '').replace(/"/g, '""')}"`,
      `"${i.status || 'pending'}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Veelana_Inquiries_Export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    if (showNotification) showNotification('📥 Inquiries exported to CSV!');
  };

  const filteredInquiries = inquiries.filter(i => {
    if (statusFilter !== 'all' && i.status !== statusFilter) return false;
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      const matchName = (i.name || '').toLowerCase().includes(term);
      const matchPhone = (i.phone || '').toLowerCase().includes(term);
      const matchTopic = (i.topic || '').toLowerCase().includes(term);
      const matchMsg = (i.message || '').toLowerCase().includes(term);
      return matchName || matchPhone || matchTopic || matchMsg;
    }
    return true;
  });

  const pendingCount = inquiries.filter(i => i.status === 'pending').length;

  return (
    <div style={{ background: '#FFFFFF', borderRadius: '20px', padding: '1.75rem', border: '1px solid #ECE7DD', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid #ECE7DD', paddingBottom: '1.25rem', marginBottom: '1.5rem' }}>
        <div>
          <span style={{ fontSize: '0.72rem', color: '#6A7B52', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: '800' }}>
            CLIENT COMMUNICATIONS & INBOX
          </span>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: '800', color: '#1B2E1E', margin: '2px 0 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Mail style={{ width: '22px', height: '22px', color: '#4F5D38' }} />
            <span>Customer Messages & Inquiries ({inquiries.length})</span>
          </h2>
          <p style={{ fontSize: '0.82rem', color: '#6B7280', margin: '4px 0 0' }}>
            Direct questions, routine queries, and consultation inquiries submitted through the Contact Help Desk.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          style={{
            padding: '0.6rem 1.15rem',
            background: '#1B2E1E',
            color: '#FAF8F5',
            border: 'none',
            borderRadius: '10px',
            fontSize: '0.82rem',
            fontWeight: '700',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 4px 12px rgba(27, 46, 30, 0.15)'
          }}
        >
          <Download style={{ width: '15px', height: '15px', color: '#D4AF37' }} />
          <span>Export Inquiries CSV</span>
        </button>
      </div>

      {/* Metrics & Filter Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
        
        <div style={{ display: 'flex', gap: '0.5rem', background: '#FAF8F5', padding: '4px', borderRadius: '10px', border: '1px solid #ECE7DD' }}>
          <button
            onClick={() => setStatusFilter('all')}
            style={{
              padding: '5px 12px',
              borderRadius: '7px',
              border: 'none',
              fontSize: '0.78rem',
              fontWeight: '700',
              cursor: 'pointer',
              background: statusFilter === 'all' ? '#1B2E1E' : 'transparent',
              color: statusFilter === 'all' ? '#FAF8F5' : '#4A5543',
            }}
          >
            All Messages ({inquiries.length})
          </button>

          <button
            onClick={() => setStatusFilter('pending')}
            style={{
              padding: '5px 12px',
              borderRadius: '7px',
              border: 'none',
              fontSize: '0.78rem',
              fontWeight: '700',
              cursor: 'pointer',
              background: statusFilter === 'pending' ? '#DC2626' : 'transparent',
              color: statusFilter === 'pending' ? '#FFFFFF' : '#4A5543',
            }}
          >
            Pending Action ({pendingCount})
          </button>

          <button
            onClick={() => setStatusFilter('resolved')}
            style={{
              padding: '5px 12px',
              borderRadius: '7px',
              border: 'none',
              fontSize: '0.78rem',
              fontWeight: '700',
              cursor: 'pointer',
              background: statusFilter === 'resolved' ? '#047857' : 'transparent',
              color: statusFilter === 'resolved' ? '#FFFFFF' : '#4A5543',
            }}
          >
            Resolved ({inquiries.length - pendingCount})
          </button>
        </div>

        {/* Search */}
        <div style={{ position: 'relative', minWidth: '240px' }}>
          <Search style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', width: '15px', height: '15px', color: '#7A8C74' }} />
          <input
            type="text"
            placeholder="Search inquiries..."
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

      {/* Messages Grid */}
      {filteredInquiries.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem 1rem', background: '#FAF8F5', borderRadius: '16px', border: '1px dashed #D6D0C2' }}>
          <Mail style={{ width: '36px', height: '36px', color: '#8A9A86', margin: '0 auto 0.75rem' }} />
          <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#1B2E1E', margin: '0 0 0.25rem' }}>No messages found</h4>
          <p style={{ fontSize: '0.82rem', color: '#6A7B52', margin: 0 }}>All customer inquiries are organized here.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {filteredInquiries.map((inq) => {
            const isResolved = inq.status === 'resolved';
            const cleanPhone = (inq.phone || '').replace(/[^0-9]/g, '');
            const replyMsg = `Assalam o Alaikum ${inq.name || 'Valued Customer'}, thank you for contacting Veelana Herbal Hair Care regarding your query: "${inq.topic}". How can we assist you today?`;
            const waLink = `https://wa.me/92${cleanPhone.startsWith('0') ? cleanPhone.slice(1) : cleanPhone}?text=${encodeURIComponent(replyMsg)}`;

            return (
              <div
                key={inq.id}
                style={{
                  background: isResolved ? '#FAF8F5' : '#FFFFFF',
                  borderRadius: '16px',
                  border: isResolved ? '1px solid #E2DDCF' : '1.5px solid #2D6A4F',
                  padding: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '1rem',
                  boxShadow: isResolved ? 'none' : '0 4px 15px rgba(45, 106, 79, 0.08)',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.65rem' }}>
                    <div>
                      <h4 style={{ fontSize: '1rem', fontWeight: '800', color: '#1B2E1E', margin: 0 }}>
                        {inq.name}
                      </h4>
                      <div style={{ fontSize: '0.78rem', color: '#4F5D38', fontWeight: '600', marginTop: '2px' }}>
                        📞 {inq.phone}
                      </div>
                    </div>

                    <span
                      style={{
                        padding: '3px 8px',
                        borderRadius: '999px',
                        fontSize: '0.68rem',
                        fontWeight: '800',
                        background: isResolved ? '#ECFDF5' : '#FEF2F2',
                        color: isResolved ? '#047857' : '#DC2626',
                        border: isResolved ? '1px solid #A7F3D0' : '1px solid #FECACA',
                      }}
                    >
                      {isResolved ? 'Resolved' : 'Needs Reply'}
                    </span>
                  </div>

                  <div style={{ display: 'inline-block', background: '#F1ECE1', color: '#1B2E1E', fontSize: '0.72rem', fontWeight: '700', padding: '2px 8px', borderRadius: '6px', marginBottom: '0.65rem' }}>
                    📌 {inq.topic}
                  </div>

                  <p style={{ fontSize: '0.85rem', color: '#2A361E', margin: '0 0 0.5rem', lineHeight: 1.5, background: '#FAF8F5', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ECE7DD' }}>
                    "{inq.message}"
                  </p>

                  <span style={{ fontSize: '0.7rem', color: '#7A8C74', display: 'block' }}>
                    🕒 Received: {inq.createdAt ? new Date(inq.createdAt).toLocaleString('en-PK', { dateStyle: 'medium', timeStyle: 'short' }) : 'Recent'}
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #ECE7DD', paddingTop: '0.75rem' }}>
                  
                  {/* WhatsApp Reply Button */}
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      padding: '6px 12px',
                      background: '#25D366',
                      color: '#FFFFFF',
                      borderRadius: '8px',
                      fontSize: '0.78rem',
                      fontWeight: '800',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      boxShadow: '0 2px 6px rgba(37, 211, 102, 0.3)',
                    }}
                  >
                    <MessageCircle style={{ width: '14px', height: '14px' }} />
                    <span>WhatsApp Reply</span>
                  </a>

                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => handleToggleStatus(inq.id, inq.status)}
                      style={{
                        padding: '6px 10px',
                        background: '#FFFFFF',
                        border: '1px solid #CBD5E1',
                        borderRadius: '8px',
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        color: isResolved ? '#6B7280' : '#047857',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                      title={isResolved ? 'Mark as Pending' : 'Mark as Done'}
                    >
                      <CheckCircle2 style={{ width: '14px', height: '14px' }} />
                      <span>{isResolved ? 'Reopen' : 'Mark Done'}</span>
                    </button>

                    <button
                      onClick={() => handleDelete(inq.id, inq.name)}
                      style={{
                        padding: '6px 8px',
                        background: '#FEE2E2',
                        border: 'none',
                        color: '#DC2626',
                        borderRadius: '8px',
                        cursor: 'pointer',
                      }}
                      title="Delete message"
                    >
                      <Trash2 style={{ width: '14px', height: '14px' }} />
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
