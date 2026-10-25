import React, { useState, useEffect } from 'react';
import { Users, Search, Download, Trash2, ShieldCheck, Mail, Calendar, PackageCheck, Star, ExternalLink, Settings, Save, AlertCircle } from 'lucide-react';
import { getRegisteredUsers, deleteRegisteredUser, getGoogleAuthConfig, saveGoogleAuthConfig } from '../../services/userService';

const GoogleIcon = ({ size = 16 }) => (
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

export default function AdminUsersManager({ showNotification }) {
  const [users, setUsers] = useState(() => getRegisteredUsers());
  const [searchTerm, setSearchTerm] = useState('');
  const [googleConfig, setGoogleConfig] = useState(() => getGoogleAuthConfig());
  const [clientIdInput, setClientIdInput] = useState(googleConfig.clientId || '');
  const [isConfigOpen, setIsConfigOpen] = useState(false);

  useEffect(() => {
    const handleUserUpdate = () => {
      setUsers(getRegisteredUsers());
    };
    window.addEventListener('veelana_user_changed', handleUserUpdate);
    return () => window.removeEventListener('veelana_user_changed', handleUserUpdate);
  }, []);

  const handleDeleteUser = (userId, userName) => {
    if (window.confirm(`Are you sure you want to delete user "${userName || 'this user'}"? All account records will be removed.`)) {
      const updated = deleteRegisteredUser(userId);
      setUsers(updated);
      if (showNotification) showNotification(`🗑️ User "${userName}" removed.`);
    }
  };

  const handleSaveGoogleConfig = (e) => {
    e.preventDefault();
    saveGoogleAuthConfig({ ...googleConfig, clientId: clientIdInput.trim() });
    if (showNotification) showNotification('✅ Google Auth settings updated!');
    setIsConfigOpen(false);
  };

  const handleExportCSV = () => {
    if (!users || users.length === 0) {
      alert('No users to export.');
      return;
    }

    const headers = ['User ID', 'Name', 'Email', 'Provider', 'Joined Date', 'Last Login', 'Orders Count', 'Reviews Count', 'Status'];
    const rows = users.map(u => [
      `"${u.id}"`,
      `"${u.name || ''}"`,
      `"${u.email || ''}"`,
      `"${u.provider || 'Google'}"`,
      `"${u.joinedAt || ''}"`,
      `"${u.lastLoginAt || ''}"`,
      `"${u.orderCount || 0}"`,
      `"${u.reviewCount || 0}"`,
      `"${u.status || 'Active'}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Veelana_Users_Export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    if (showNotification) showNotification('📥 Users list exported to CSV!');
  };

  const filteredUsers = users.filter(u => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    const matchName = (u.name || '').toLowerCase().includes(term);
    const matchEmail = (u.email || '').toLowerCase().includes(term);
    return matchName || matchEmail;
  });

  const totalOrdersLinked = users.reduce((acc, u) => acc + (u.orderCount || 0), 0);

  return (
    <div style={{ background: '#FFFFFF', borderRadius: '20px', padding: '1.75rem', border: '1px solid #ECE7DD', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid #ECE7DD', paddingBottom: '1.25rem', marginBottom: '1.5rem' }}>
        <div>
          <span style={{ fontSize: '0.72rem', color: '#6A7B52', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: '800' }}>
            CUSTOMER IDENTITIES & GOOGLE ACCOUNTS
          </span>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: '800', color: '#1B2E1E', margin: '2px 0 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <GoogleIcon size={22} />
            <span>Google Signed-In Users ({users.length})</span>
          </h2>
          <p style={{ fontSize: '0.82rem', color: '#6B7280', margin: '4px 0 0' }}>
            View and manage all customer accounts authenticated through Google on the Veelana website.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <button
            onClick={() => setIsConfigOpen(!isConfigOpen)}
            style={{
              padding: '0.6rem 1rem',
              background: '#F1ECE1',
              color: '#1B2E1E',
              border: 'none',
              borderRadius: '10px',
              fontSize: '0.82rem',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Settings style={{ width: '15px', height: '15px' }} />
            <span>Google API Setup</span>
          </button>

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
            <span>Export Users CSV</span>
          </button>
        </div>
      </div>

      {/* Google API Client Config Panel */}
      {isConfigOpen && (
        <div style={{ background: '#FAF8F5', border: '1px solid #D6D0C2', borderRadius: '14px', padding: '1.25rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
            <GoogleIcon size={18} />
            <h4 style={{ fontSize: '0.95rem', fontWeight: '800', color: '#1B2E1E', margin: 0 }}>
              Google Cloud Console OAuth 2.0 Credentials
            </h4>
          </div>
          <p style={{ fontSize: '0.8rem', color: '#5F7057', margin: '0 0 1rem', lineHeight: 1.4 }}>
            The website already provides seamless One-Click Google sign-in. If you have created a custom Google OAuth Client ID in your Google Cloud Console, paste it below to link your official Google App.
          </p>

          <form onSubmit={handleSaveGoogleConfig} style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="e.g. 1234567890-abcdefgh.apps.googleusercontent.com"
              value={clientIdInput}
              onChange={(e) => setClientIdInput(e.target.value)}
              style={{
                flex: 1,
                minWidth: '280px',
                padding: '0.6rem 0.85rem',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                fontSize: '0.85rem',
              }}
            />
            <button
              type="submit"
              style={{
                padding: '0.6rem 1.25rem',
                background: '#047857',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '8px',
                fontWeight: '700',
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Save style={{ width: '15px', height: '15px' }} />
              <span>Save Config</span>
            </button>
          </form>
        </div>
      )}

      {/* Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ background: '#FAF8F5', border: '1px solid #EAE5D9', borderRadius: '12px', padding: '1rem' }}>
          <span style={{ fontSize: '0.72rem', color: '#6A7B52', fontWeight: '700', textTransform: 'uppercase' }}>Total Registered Users</span>
          <div style={{ fontSize: '1.6rem', fontWeight: '800', color: '#1B2E1E', marginTop: '2px' }}>{users.length}</div>
        </div>

        <div style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '12px', padding: '1rem' }}>
          <span style={{ fontSize: '0.72rem', color: '#047857', fontWeight: '700', textTransform: 'uppercase' }}>Google Verified</span>
          <div style={{ fontSize: '1.6rem', fontWeight: '800', color: '#065F46', marginTop: '2px' }}>100%</div>
        </div>

        <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '12px', padding: '1rem' }}>
          <span style={{ fontSize: '0.72rem', color: '#1D4ED8', fontWeight: '700', textTransform: 'uppercase' }}>Orders Placed by Users</span>
          <div style={{ fontSize: '1.6rem', fontWeight: '800', color: '#1E40AF', marginTop: '2px' }}>{totalOrdersLinked}</div>
        </div>
      </div>

      {/* Search Input */}
      <div style={{ marginBottom: '1.25rem' }}>
        <div style={{ position: 'relative', maxWidth: '360px' }}>
          <Search style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px', color: '#7A8C74' }} />
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '0.55rem 0.85rem 0.55rem 2.2rem',
              fontSize: '0.85rem',
              borderRadius: '8px',
              border: '1px solid #D6D0C2',
              outline: 'none',
              background: '#FFFFFF',
            }}
          />
        </div>
      </div>

      {/* Users Table */}
      <div style={{ overflowX: 'auto', borderRadius: '12px', border: '1px solid #ECE7DD' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ background: '#FAF8F5', borderBottom: '1px solid #ECE7DD', color: '#1B2E1E', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              <th style={{ padding: '0.75rem 1rem' }}>User Profile</th>
              <th style={{ padding: '0.75rem 1rem' }}>Email Address</th>
              <th style={{ padding: '0.75rem 1rem' }}>Provider</th>
              <th style={{ padding: '0.75rem 1rem' }}>Joined Date</th>
              <th style={{ padding: '0.75rem 1rem' }}>Orders</th>
              <th style={{ padding: '0.75rem 1rem' }}>Reviews</th>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: '2.5rem', color: '#7A8C74' }}>
                  No users found matching "{searchTerm}".
                </td>
              </tr>
            ) : (
              filteredUsers.map((u) => (
                <tr key={u.id} style={{ borderBottom: '1px solid #F1ECE1', transition: 'background 0.15s' }}>
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <img
                        src={u.avatar}
                        alt={u.name}
                        style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover', border: '1.5px solid #2D6A4F' }}
                        onError={(e) => {
                          e.currentTarget.src = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(u.name || 'U')}&backgroundColor=1B2E1E`;
                        }}
                      />
                      <div>
                        <div style={{ fontWeight: '800', color: '#1B2E1E' }}>{u.name}</div>
                        <div style={{ fontSize: '0.72rem', color: '#6A7B52' }}>ID: {u.id}</div>
                      </div>
                    </div>
                  </td>

                  <td style={{ padding: '0.85rem 1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Mail style={{ width: '14px', height: '14px', color: '#7A8C74' }} />
                      <span style={{ fontWeight: '600', color: '#2A361E' }}>{u.email}</span>
                    </div>
                  </td>

                  <td style={{ padding: '0.85rem 1rem' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: '#ECFDF5', color: '#047857', fontSize: '0.72rem', fontWeight: '800', padding: '3px 8px', borderRadius: '999px' }}>
                      <GoogleIcon size={12} />
                      <span>Google</span>
                    </span>
                  </td>

                  <td style={{ padding: '0.85rem 1rem', color: '#4B5563', fontSize: '0.78rem' }}>
                    {u.joinedAt ? new Date(u.joinedAt).toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Recent'}
                  </td>

                  <td style={{ padding: '0.85rem 1rem' }}>
                    <span style={{ fontWeight: '800', color: u.orderCount > 0 ? '#047857' : '#6B7280' }}>
                      {u.orderCount || 0} Orders
                    </span>
                  </td>

                  <td style={{ padding: '0.85rem 1rem' }}>
                    <span style={{ fontWeight: '800', color: u.reviewCount > 0 ? '#B45309' : '#6B7280' }}>
                      {u.reviewCount || 0} Reviews
                    </span>
                  </td>

                  <td style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>
                    <button
                      onClick={() => handleDeleteUser(u.id, u.name)}
                      style={{
                        padding: '5px 8px',
                        background: '#FEE2E2',
                        border: 'none',
                        color: '#DC2626',
                        borderRadius: '6px',
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                      title="Delete User from Dashboard"
                    >
                      <Trash2 style={{ width: '13px', height: '13px' }} />
                      <span>Remove</span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}
