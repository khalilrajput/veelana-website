import React, { useState, useEffect } from 'react';
import { X, Package, Trash2, CheckCircle, RefreshCw, Phone, Download, MapPin, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getOrders, updateOrderStatus, clearOrders } from '../services/orderService';

export default function OrderManagementModal({ isOpen, onClose }) {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    if (isOpen) {
      setOrders(getOrders());
    }
  }, [isOpen]);

  useEffect(() => {
    const handleOrdersUpdated = () => {
      setOrders(getOrders());
    };
    window.addEventListener('veelana_orders_updated', handleOrdersUpdated);
    return () => window.removeEventListener('veelana_orders_updated', handleOrdersUpdated);
  }, []);

  if (!isOpen) return null;

  const handleStatusChange = (orderId, newStatus) => {
    const updated = updateOrderStatus(orderId, newStatus);
    setOrders(updated);
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all order history?')) {
      clearOrders();
      setOrders([]);
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = 
      order.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.phone.includes(searchTerm) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.city.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const exportCSV = () => {
    if (orders.length === 0) return;
    const headers = ['Order ID', 'Date', 'Customer Name', 'Phone', 'Address', 'City', 'Product', 'Quantity', 'Total Price', 'Payment Method', 'Status', 'Notes'];
    const rows = orders.map(o => [
      o.id,
      new Date(o.createdAt).toLocaleString(),
      `"${o.fullName}"`,
      `"${o.phone}"`,
      `"${o.address}"`,
      `"${o.city}"`,
      `"${o.productName}"`,
      o.quantity,
      `"${o.totalPrice}"`,
      `"${o.paymentMethod}"`,
      o.status,
      `"${o.notes || ''}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `veelana_orders_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AnimatePresence>
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2500,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(18, 30, 20, 0.8)',
        backdropFilter: 'blur(6px)',
        padding: '1rem',
        overflowY: 'auto'
      }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          style={{
            backgroundColor: '#FAF8F5',
            borderRadius: '20px',
            border: '1px solid rgba(79, 93, 56, 0.2)',
            boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
            width: '100%',
            maxWidth: '900px',
            maxHeight: '88vh',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}
        >
          {/* Header */}
          <div style={{ backgroundColor: '#1B2E1E', color: '#FAF8F5', padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Package style={{ width: '22px', height: '22px', color: '#D4AF37' }} />
              <div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 'bold', margin: 0, color: '#FAF8F5' }}>
                  Veelana Order Management System
                </h3>
                <span style={{ fontSize: '0.7rem', color: '#D4AF37' }}>
                  Total Orders: {orders.length}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <button
                onClick={exportCSV}
                style={{ background: 'rgba(255,255,255,0.1)', color: '#FAF8F5', border: '1px solid rgba(255,255,255,0.2)', padding: '0.4rem 0.8rem', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
              >
                <Download style={{ width: '14px', height: '14px' }} />
                <span>Export CSV</span>
              </button>
              <button
                onClick={onClose}
                style={{ background: 'none', border: 'none', color: '#FAF8F5', cursor: 'pointer' }}
              >
                <X style={{ width: '22px', height: '22px' }} />
              </button>
            </div>
          </div>

          {/* Controls Bar */}
          <div style={{ padding: '1rem 1.5rem', backgroundColor: '#FFFFFF', borderBottom: '1px solid #E5E5E5', display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
            {/* Search */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#FAF8F5', padding: '0.4rem 0.8rem', borderRadius: '10px', border: '1px solid #E0E0E0', flex: 1, maxWidth: '320px' }}>
              <Search style={{ width: '16px', height: '16px', color: '#888' }} />
              <input
                type="text"
                placeholder="Search name, phone, city, order ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '0.8rem', width: '100%' }}
              />
            </div>

            {/* Filter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.78rem' }}>
              <span style={{ fontWeight: 'bold', color: '#4F5E52' }}>Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{ padding: '0.35rem 0.75rem', borderRadius: '8px', border: '1px solid #D0D0D0', outline: 'none', fontSize: '0.78rem', background: '#FFFFFF', fontWeight: 'bold' }}
              >
                <option value="all">All Statuses ({orders.length})</option>
                <option value="Pending">Pending</option>
                <option value="Dispatched">Dispatched</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {/* Orders List Body */}
          <div style={{ padding: '1.5rem', overflowY: 'auto', flex: 1 }}>
            {filteredOrders.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#888' }}>
                <Package style={{ width: '48px', height: '48px', margin: '0 auto 1rem', opacity: 0.4 }} />
                <p style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>No customer orders found.</p>
                <span style={{ fontSize: '0.78rem' }}>Orders submitted via the checkout form will automatically appear here.</span>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {filteredProductsList(filteredOrders, handleStatusChange)}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

function filteredProductsList(orders, handleStatusChange) {
  return orders.map((order) => (
    <div
      key={order.id}
      style={{
        background: '#FFFFFF',
        border: '1px solid rgba(79, 93, 56, 0.15)',
        borderRadius: '16px',
        padding: '1.25rem',
        boxShadow: '0 4px 15px rgba(0,0,0,0.03)'
      }}
    >
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', borderBottom: '1px solid #F0F0F0', paddingBottom: '0.75rem', marginBottom: '0.75rem' }}>
        <div>
          <span style={{ fontSize: '0.7rem', background: '#1B2E1E', color: '#FAF8F5', padding: '0.2rem 0.6rem', borderRadius: '6px', fontWeight: 'bold', marginRight: '0.5rem' }}>
            #{order.id}
          </span>
          <strong style={{ fontSize: '1rem', color: '#121E14' }}>{order.fullName}</strong>
          <span style={{ fontSize: '0.75rem', color: '#888', marginLeft: '0.5rem' }}>
            ({new Date(order.createdAt).toLocaleDateString()})
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <select
            value={order.status}
            onChange={(e) => handleStatusChange(order.id, e.target.value)}
            style={{
              padding: '0.25rem 0.6rem',
              borderRadius: '8px',
              fontSize: '0.75rem',
              fontWeight: 'bold',
              border: 'none',
              background: order.status === 'Delivered' ? '#D1FAE5' : order.status === 'Dispatched' ? '#DBEAFE' : '#FEF3C7',
              color: order.status === 'Delivered' ? '#065F46' : order.status === 'Dispatched' ? '#1E40AF' : '#92400E',
              cursor: 'pointer'
            }}
          >
            <option value="Pending">Pending</option>
            <option value="Dispatched">Dispatched</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', fontSize: '0.8rem' }}>
        <div>
          <span style={{ color: '#888', display: 'block', fontSize: '0.72rem' }}>Product</span>
          <strong>{order.productName} ({order.bottleSize}) x{order.quantity}</strong>
          <span style={{ display: 'block', color: '#1B2E1E', fontWeight: '800', marginTop: '0.15rem' }}>{order.totalPrice}</span>
        </div>

        <div>
          <span style={{ color: '#888', display: 'block', fontSize: '0.72rem' }}>Phone & Address</span>
          <a href={`https://wa.me/${order.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" style={{ color: '#25D366', fontWeight: 'bold', textDecoration: 'underline' }}>
            {order.phone}
          </a>
          <span style={{ display: 'block', color: '#4F5E52', marginTop: '0.15rem' }}>{order.address}, {order.city}</span>
        </div>

        <div>
          <span style={{ color: '#888', display: 'block', fontSize: '0.72rem' }}>Payment Method</span>
          <span style={{ fontWeight: '700', color: '#121E14' }}>{order.paymentMethod}</span>
          {order.notes && <span style={{ display: 'block', color: '#777', fontStyle: 'italic', fontSize: '0.72rem', marginTop: '0.2rem' }}>Note: {order.notes}</span>}
        </div>
      </div>
    </div>
  ));
}
