import React, { useState, useEffect, useRef } from 'react';
import { Lock, Package, Trash2, CheckCircle, RefreshCw, Phone, Download, MapPin, Search, Edit, Plus, ShieldCheck, DollarSign, Truck, AlertCircle, MessageCircle, ExternalLink, Image as ImageIcon, Sparkles, RotateCcw, Upload, X, Check, KeyRound, Printer, FileText, TrendingUp, Calculator, AlertTriangle, Eye, ArrowUpRight, Copy } from 'lucide-react';
import { getOrders, updateOrderStatus, clearOrders } from '../services/orderService';
import { getProducts, addProduct, updateProduct, deleteProduct, resetToDefaults } from '../services/productService';

const PRESET_IMAGES = [
  { label: '200ml Bottle', path: '/assets/real_250ml_single.webp' },
  { label: '100ml Bottle', path: '/assets/real_100ml_double.webp' },
  { label: 'Family Bundle', path: '/assets/real_250ml_and_100ml.webp' },
  { label: 'Complete Set Boxes', path: '/assets/real_full_set_boxes.webp' },
];

const ADMIN_PWD_KEY = 'veelana_admin_custom_password_v1';
const EXPENSES_STORAGE_KEY = 'veelana_admin_expenses_v1';

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('veelana_admin_session') === 'true';
  });
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState('orders'); // 'orders', 'products', 'analytics', 'security'
  const [toastMessage, setToastMessage] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  // Selected Order for Printable Shipping Label / Invoice / History Modal
  const [printLabelOrder, setPrintLabelOrder] = useState(null);
  const [printInvoiceOrder, setPrintInvoiceOrder] = useState(null);
  const [viewHistoryOrder, setViewHistoryOrder] = useState(null);

  // Change Password Form State
  const [pwdForm, setPwdForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [pwdError, setPwdError] = useState('');
  const [pwdSuccess, setPwdSuccess] = useState('');

  // Orders State
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Expenses & Financial Calculation State
  const [financialSettings, setFinancialSettings] = useState(() => {
    try {
      const saved = localStorage.getItem(EXPENSES_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      cogsPercentage: 25, // 25% product manufacturing & oil cost
      packagingPerOrder: 120, // Rs. 120 bubble wrap + box + tape + flyers
      courierFeePerOrder: 199, // Rs. 199 average courier booking fee
      monthlyAdSpend: 15000, // Monthly Meta / TikTok Ad Budget
      miscellaneousExpenses: 5000 // Miscellaneous overhead
    };
  });

  // Products State
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productFormData, setProductFormData] = useState({
    name: '',
    subtitle: '',
    price: 'Rs. 1,899',
    originalPrice: 'Rs. 2,450',
    category: 'bottles',
    badge: 'Popular Herbal Choice',
    image: '/assets/real_250ml_single.webp',
    features: '100% Cold-Pressed Organic Herbal Oil\n25+ Potent Botanical Herbs\nParaben, Sulphate & Mineral Oil Free\nFree WhatsApp Consultation',
    popular: false,
    inStock: true
  });

  const showNotification = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const getStoredPassword = () => {
    return localStorage.getItem(ADMIN_PWD_KEY) || 'veelana123';
  };

  useEffect(() => {
    setOrders(getOrders());
    setProducts(getProducts());

    const handleOrdersUpdated = () => setOrders(getOrders());
    const handleProductsUpdated = (e) => {
      setProducts(e.detail || getProducts());
    };

    window.addEventListener('veelana_orders_updated', handleOrdersUpdated);
    window.addEventListener('veelana_products_updated', handleProductsUpdated);

    return () => {
      window.removeEventListener('veelana_orders_updated', handleOrdersUpdated);
      window.removeEventListener('veelana_products_updated', handleProductsUpdated);
    };
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const clean = password.trim();
    const currentValidPassword = getStoredPassword();

    if (clean === currentValidPassword) {
      setIsAuthenticated(true);
      sessionStorage.setItem('veelana_admin_session', 'true');
      setAuthError('');
      showNotification('👋 Welcome to Veelana Admin Hub!');
    } else {
      setAuthError('Incorrect Password. Please check and try again.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('veelana_admin_session');
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    setPwdError('');
    setPwdSuccess('');

    const currentSaved = getStoredPassword();
    if (pwdForm.currentPassword !== currentSaved) {
      setPwdError('Current password does not match.');
      return;
    }

    if (pwdForm.newPassword.length < 4) {
      setPwdError('New password must be at least 4 characters long.');
      return;
    }

    if (pwdForm.newPassword !== pwdForm.confirmPassword) {
      setPwdError('New password and confirmation do not match.');
      return;
    }

    localStorage.setItem(ADMIN_PWD_KEY, pwdForm.newPassword.trim());
    setPwdSuccess('Password changed successfully! Keep your new password safe.');
    setPwdForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    showNotification('🔒 Admin Password Updated!');
  };

  const handleStatusChange = (orderId, newStatus) => {
    const updated = updateOrderStatus(orderId, newStatus);
    setOrders(updated);
    showNotification(`Order #${orderId} status updated to ${newStatus}`);
  };

  const handleClearAllOrders = () => {
    if (window.confirm('Are you sure you want to permanently clear all stored orders?')) {
      clearOrders();
      setOrders([]);
      showNotification('All orders cleared.');
    }
  };

  const sendWhatsAppUpdate = (order) => {
    const text = `Salam ${order.fullName}! 🌿
This is an official update regarding your Veelana Order #${order.id}.
Status: *${(order.status || 'Confirmed').toUpperCase()}*
Tracking Ref: ${order.trackingNumber || 'Trax / Leopard Logistics Express'}
Total Amount: ${order.totalPrice || `Rs. ${order.totalAmount}`} (Cash on Delivery)
If you have any questions, reply to this message!`;

    const cleanPhone = (order.cleanPhone || order.phone).replace(/[^0-9]/g, '');
    const intPhone = cleanPhone.startsWith('0') ? `92${cleanPhone.slice(1)}` : cleanPhone;
    window.open(`https://wa.me/${intPhone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const exportCSV = () => {
    if (orders.length === 0) {
      alert('No orders to export.');
      return;
    }
    const headers = ['Order ID', 'Date', 'Customer Name', 'Phone', 'Address', 'City', 'Province', 'Landmark', 'Total Amount', 'Payment Method', 'Status', 'Risk Score', 'Notes'];
    const rows = orders.map((o) => [
      o.id,
      new Date(o.createdAt).toLocaleString(),
      `"${o.fullName}"`,
      `"${o.phone}"`,
      `"${o.address}"`,
      `"${o.city}"`,
      `"${o.province || 'Punjab'}"`,
      `"${o.landmark || ''}"`,
      `"${o.totalPrice || o.totalAmount}"`,
      `"${o.paymentMethod || 'COD'}"`,
      `"${o.status || 'Pending'}"`,
      `"${o.riskAssessment?.score || 50}/100"`,
      `"${o.notes || ''}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Veelana_Orders_Export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotification('Orders exported to CSV.');
  };

  // Direct Image File Upload Handler with Auto-Compression (PNG, JPG, WEBP)
  const handleImageFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (PNG, JPG, JPEG, or WEBP).');
      return;
    }

    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxDim = 800;
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
        
        const compressedDataUrl = canvas.toDataURL('image/webp', 0.88);
        setProductFormData((prev) => ({ ...prev, image: compressedDataUrl }));
        setIsUploading(false);
        showNotification('📷 Image uploaded & optimized successfully!');
      };
      img.onerror = () => {
        setIsUploading(false);
        alert('Failed to load image file.');
      };
      img.src = uploadEvent.target.result;
    };
    reader.readAsDataURL(file);
  };

  // Product CRUD
  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!productFormData.name.trim() || !productFormData.price.trim()) {
      alert('Please provide product name and price.');
      return;
    }

    if (editingProduct) {
      updateProduct(editingProduct.id, productFormData);
      showNotification(`✅ Product "${productFormData.name}" updated successfully!`);
    } else {
      addProduct(productFormData);
      showNotification(`🎉 New product "${productFormData.name}" added to store!`);
    }

    setEditingProduct(null);
    setProductFormData({
      name: '',
      subtitle: '',
      price: 'Rs. 1,899',
      originalPrice: 'Rs. 2,450',
      category: 'bottles',
      badge: '',
      image: '/assets/real_250ml_single.webp',
      features: '100% Cold-Pressed Organic Herbal Oil\n25+ Potent Botanical Herbs\nParaben, Sulphate & Mineral Oil Free\nFree WhatsApp Consultation',
      popular: false,
      inStock: true
    });
    setProducts(getProducts());
  };

  const handleEditProduct = (prod) => {
    setEditingProduct(prod);
    setProductFormData({
      name: prod.name || '',
      subtitle: prod.subtitle || '',
      price: prod.price || '',
      originalPrice: prod.originalPrice || '',
      category: prod.category || 'bottles',
      badge: prod.badge || '',
      image: prod.image || '/assets/real_250ml_single.webp',
      features: Array.isArray(prod.features) ? prod.features.join('\n') : (prod.features || ''),
      popular: !!prod.popular,
      inStock: prod.inStock !== false
    });
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const handleDeleteProduct = (productId, productName) => {
    if (window.confirm(`Are you sure you want to remove "${productName || 'this item'}" from the catalog?`)) {
      const updated = deleteProduct(productId);
      setProducts(updated);
      showNotification(`🗑️ Product removed from store catalog.`);
    }
  };

  const handleResetCatalog = () => {
    if (window.confirm('Reset catalog to the 4 official default Veelana bottles and bundles? This will restore initial prices and sizes.')) {
      const defaults = resetToDefaults();
      setProducts(defaults);
      showNotification('✨ Store catalog reset to factory default products.');
    }
  };

  // Metrics Calculations
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => (o.status || 'Pending').toLowerCase() === 'pending').length;
  const confirmedOrders = orders.filter((o) => (o.status || '').toLowerCase() === 'confirmed').length;
  const dispatchedOrders = orders.filter((o) => (o.status || '').toLowerCase() === 'dispatched').length;
  const deliveredOrders = orders.filter((o) => (o.status || '').toLowerCase() === 'delivered').length;
  
  const totalRevenue = orders.reduce((acc, o) => {
    const num = parseInt(String(o.totalPrice || o.totalAmount).replace(/[^0-9]/g, ''), 10) || 0;
    return acc + num;
  }, 0);

  // Financial Estimates
  const totalCOGS = Math.round(totalRevenue * (financialSettings.cogsPercentage / 100));
  const totalPackagingCost = totalOrders * financialSettings.packagingPerOrder;
  const totalCourierCost = totalOrders * financialSettings.courierFeePerOrder;
  const totalEstimatedCosts = totalCOGS + totalPackagingCost + totalCourierCost + financialSettings.monthlyAdSpend + financialSettings.miscellaneousExpenses;
  const estimatedNetProfit = totalRevenue - totalEstimatedCosts;

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      (order.fullName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (order.phone || '').includes(searchTerm) ||
      (order.id || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (order.city || '').toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || (order.status || 'Pending').toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  // PASSWORD LOGIN SCREEN (NO HINTS)
  if (!isAuthenticated) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem', background: '#FAF8F5' }}>
        <div
          style={{
            width: '100%',
            maxWidth: '420px',
            background: '#FFFFFF',
            borderRadius: '24px',
            padding: '2.5rem 2rem',
            boxShadow: '0 15px 40px rgba(0,0,0,0.08)',
            border: '1px solid rgba(79, 93, 56, 0.15)',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: '#1B2E1E',
              color: '#D4AF37',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem',
            }}
          >
            <Lock style={{ width: '28px', height: '28px' }} />
          </div>

          <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#4F5D38', textTransform: 'uppercase', letterSpacing: '1.2px' }}>
            RESTRICTED ACCESS
          </span>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.85rem', fontWeight: 'bold', color: '#1B2E1E', margin: '0.35rem 0 0.5rem' }}>
            Store Owner Portal
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#6A7B52', marginBottom: '1.75rem' }}>
            Enter your admin password to access live orders, profit reports, and product management.
          </p>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input
              type="password"
              placeholder="Enter Admin Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
              style={{
                width: '100%',
                padding: '0.85rem 1rem',
                fontSize: '0.95rem',
                borderRadius: '12px',
                border: '1px solid #D6D0C2',
                background: '#FAF8F5',
                outline: 'none',
                textAlign: 'center',
              }}
            />

            {authError && (
              <span style={{ fontSize: '0.8rem', color: '#B91C1C', fontWeight: 'bold' }}>
                {authError}
              </span>
            )}

            <button
              type="submit"
              className="btn-olive"
              style={{
                width: '100%',
                padding: '0.9rem',
                fontSize: '0.95rem',
                fontWeight: 'bold',
                justifyContent: 'center',
                cursor: 'pointer',
                borderRadius: '12px',
              }}
            >
              <span>Unlock Admin Dashboard</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  // AUTHENTICATED ADMIN DASHBOARD
  return (
    <div style={{ minHeight: '90vh', padding: '2.5rem 1rem 5rem', background: '#F4F1EA' }}>
      
      {/* Real-Time Toast Notification */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            zIndex: 99999,
            background: '#1B2E1E',
            color: '#FAF8F5',
            padding: '0.85rem 1.5rem',
            borderRadius: '12px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
            border: '1px solid #D4AF37',
            fontSize: '0.9rem',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <Sparkles style={{ width: '18px', height: '18px', color: '#D4AF37' }} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* PRINTABLE SHIPPING LABEL MODAL */}
      {printLabelOrder && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999999,
            background: 'rgba(18, 30, 20, 0.75)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            overflowY: 'auto',
          }}
          onClick={() => setPrintLabelOrder(null)}
        >
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '20px',
              padding: '1.75rem',
              maxWidth: '540px',
              width: '100%',
              boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
              border: '1px solid rgba(79, 93, 56, 0.2)',
              position: 'relative',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ECE7DD', paddingBottom: '0.85rem', marginBottom: '1.25rem' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 'bold', color: '#1B2E1E', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Printer style={{ width: '20px', height: '20px', color: '#4F5D38' }} />
                <span>Courier Shipping Label (Sticker)</span>
              </h3>
              <button
                onClick={() => setPrintLabelOrder(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: '#7A8C74' }}
              >
                <X style={{ width: '20px', height: '20px' }} />
              </button>
            </div>

            {/* Thermal Label Format Preview */}
            <div
              id="thermal-shipping-label"
              style={{
                border: '2px solid #000000',
                padding: '1rem',
                borderRadius: '8px',
                background: '#FFFFFF',
                color: '#000000',
                fontFamily: 'monospace',
                fontSize: '0.8rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #000000', paddingBottom: '0.5rem' }}>
                <div>
                  <div style={{ fontWeight: '900', fontSize: '1.1rem', letterSpacing: '0.5px' }}>VEELANA HERBAL CARE</div>
                  <div style={{ fontSize: '0.68rem', color: '#333333' }}>Pure Organic Hair Growth Oil • Pakistan</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: 'bold' }}>COD PARCEL</div>
                  <div style={{ fontWeight: '900', fontSize: '1.2rem', color: '#047857' }}>
                    {printLabelOrder.totalPrice || `Rs. ${printLabelOrder.totalAmount}`}
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', borderBottom: '1px solid #CCCCCC', paddingBottom: '0.5rem' }}>
                <div>
                  <span style={{ fontSize: '0.68rem', color: '#666666', display: 'block', textTransform: 'uppercase' }}>Order Ref</span>
                  <strong style={{ fontSize: '0.95rem' }}>#{printLabelOrder.id}</strong>
                </div>
                <div>
                  <span style={{ fontSize: '0.68rem', color: '#666666', display: 'block', textTransform: 'uppercase' }}>Booking Date</span>
                  <strong>{new Date(printLabelOrder.createdAt).toLocaleDateString('en-PK')}</strong>
                </div>
              </div>

              {/* Recipient Box */}
              <div style={{ background: '#F8F8F8', padding: '0.75rem', borderRadius: '6px', border: '1px solid #DDDDDD', display: 'flex', flexDirection: 'column', gap: '3px' }}>
                <span style={{ fontSize: '0.68rem', color: '#666666', fontWeight: 'bold', textTransform: 'uppercase', display: 'block' }}>
                  SHIP TO (CUSTOMER):
                </span>
                <div style={{ fontWeight: 'bold', fontSize: '0.95rem', color: '#000000' }}>{printLabelOrder.fullName}</div>
                <div style={{ fontWeight: 'bold', color: '#047857', fontSize: '0.9rem' }}>📞 {printLabelOrder.phone}</div>
                <div style={{ fontSize: '0.8rem', color: '#222222' }}>{printLabelOrder.address}</div>
                <div style={{ fontWeight: 'bold', fontSize: '0.82rem', textTransform: 'uppercase', color: '#000000', marginTop: '2px' }}>
                  🏙️ {printLabelOrder.city}, {printLabelOrder.province || 'Punjab'}
                </div>
                {printLabelOrder.landmark && (
                  <div style={{ fontSize: '0.75rem', color: '#78350F', background: '#FEF3C7', padding: '3px 6px', borderRadius: '4px', fontWeight: 'bold', marginTop: '3px' }}>
                    📌 Near: {printLabelOrder.landmark}
                  </div>
                )}
              </div>

              {/* Items List */}
              <div style={{ borderBottom: '1px solid #CCCCCC', paddingBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.68rem', color: '#666666', fontWeight: 'bold', display: 'block', textTransform: 'uppercase', marginBottom: '3px' }}>
                  PARCEL CONTENTS:
                </span>
                {printLabelOrder.items && Array.isArray(printLabelOrder.items) ? (
                  printLabelOrder.items.map((it, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem' }}>
                      <span>{it.name}</span>
                      <strong>x{it.quantity}</strong>
                    </div>
                  ))
                ) : (
                  <div style={{ fontSize: '0.78rem' }}>{printLabelOrder.productName || 'Veelana 200ml Bottle'} x {printLabelOrder.quantity || 1}</div>
                )}
              </div>

              {/* Barcode Mock */}
              <div style={{ textAlign: 'center', paddingTop: '4px' }}>
                <div style={{ height: '36px', background: '#000000', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', letterSpacing: '6px', fontFamily: 'monospace', fontSize: '0.85rem', fontWeight: 'bold' }}>
                  |||||||||||||||||||||||||||||
                </div>
                <span style={{ fontSize: '0.7rem', color: '#555555', fontWeight: 'bold', display: 'block', marginTop: '2px' }}>
                  {printLabelOrder.trackingNumber || `TRX-${printLabelOrder.id}PK`}
                </span>
              </div>
            </div>

            <div style={{ marginTop: '1.25rem', display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setPrintLabelOrder(null)}
                style={{ padding: '0.6rem 1.1rem', background: '#EAEFE4', color: '#2A361E', border: 'none', borderRadius: '8px', fontSize: '0.82rem', fontWeight: 'bold', cursor: 'pointer' }}
              >
                Close
              </button>
              <button
                onClick={() => window.print()}
                style={{ padding: '0.6rem 1.25rem', background: '#1B2E1E', color: '#FAF8F5', border: 'none', borderRadius: '8px', fontSize: '0.82rem', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <Printer style={{ width: '15px', height: '15px', color: '#D4AF37' }} />
                <span>Print Label</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PRINTABLE INVOICE MODAL */}
      {printInvoiceOrder && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999999,
            background: 'rgba(18, 30, 20, 0.75)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            overflowY: 'auto',
          }}
          onClick={() => setPrintInvoiceOrder(null)}
        >
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '20px',
              padding: '1.75rem',
              maxWidth: '580px',
              width: '100%',
              boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
              border: '1px solid rgba(79, 93, 56, 0.2)',
              position: 'relative',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ECE7DD', paddingBottom: '0.85rem', marginBottom: '1.25rem' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 'bold', color: '#1B2E1E', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FileText style={{ width: '20px', height: '20px', color: '#4F5D38' }} />
                <span>Official Customer Bill Invoice</span>
              </h3>
              <button
                onClick={() => setPrintInvoiceOrder(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: '#7A8C74' }}
              >
                <X style={{ width: '20px', height: '20px' }} />
              </button>
            </div>

            <div
              id="customer-bill-invoice"
              style={{
                padding: '1rem',
                background: '#FFFFFF',
                color: '#111827',
                fontSize: '0.82rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid #E5E7EB', paddingBottom: '0.75rem' }}>
                <div>
                  <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 'bold', color: '#1B2E1E', margin: 0 }}>
                    VEELANA HERBAL CARE
                  </h4>
                  <p style={{ color: '#6B7280', fontSize: '0.75rem', margin: '2px 0 0' }}>Direct Botanical Hair Revival • Pakistan</p>
                  <p style={{ color: '#6B7280', fontSize: '0.75rem', margin: '2px 0 0' }}>WhatsApp: +92 306 1041609 | veelanaofficial@gmail.com</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.95rem', fontWeight: 'bold', color: '#111827' }}>INVOICE #{printInvoiceOrder.id}</div>
                  <div style={{ color: '#6B7280', fontSize: '0.75rem' }}>Date: {new Date(printInvoiceOrder.createdAt).toLocaleDateString('en-PK')}</div>
                  <div style={{ display: 'inline-block', marginTop: '4px', padding: '2px 8px', background: '#ECFDF5', color: '#065F46', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 'bold' }}>
                    {printInvoiceOrder.status || 'Pending'}
                  </div>
                </div>
              </div>

              <div style={{ background: '#FAF8F5', padding: '0.85rem', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
                <span style={{ fontSize: '0.7rem', color: '#6B7280', textTransform: 'uppercase', fontWeight: 'bold', display: 'block', marginBottom: '2px' }}>
                  BILLED TO:
                </span>
                <div style={{ fontWeight: 'bold', fontSize: '0.95rem', color: '#111827' }}>{printInvoiceOrder.fullName}</div>
                <div style={{ color: '#047857', fontWeight: 'bold' }}>📞 {printInvoiceOrder.phone}</div>
                <div style={{ color: '#4B5563', fontSize: '0.8rem' }}>{printInvoiceOrder.address}</div>
                <div style={{ color: '#111827', fontWeight: 'bold', fontSize: '0.82rem', marginTop: '2px' }}>
                  {printInvoiceOrder.city}, {printInvoiceOrder.province || 'Pakistan'}
                </div>
              </div>

              {/* Items Table */}
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #E5E7EB', textAlign: 'left', fontSize: '0.75rem', color: '#6B7280', textTransform: 'uppercase' }}>
                    <th style={{ padding: '0.5rem 0' }}>Item Description</th>
                    <th style={{ padding: '0.5rem 0', textAlign: 'center' }}>Qty</th>
                    <th style={{ padding: '0.5rem 0', textAlign: 'right' }}>Price</th>
                    <th style={{ padding: '0.5rem 0', textAlign: 'right' }}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {printInvoiceOrder.items && Array.isArray(printInvoiceOrder.items) ? (
                    printInvoiceOrder.items.map((it, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid #F3F4F6' }}>
                        <td style={{ padding: '0.5rem 0', fontWeight: '500' }}>{it.name}</td>
                        <td style={{ padding: '0.5rem 0', textAlign: 'center' }}>{it.quantity}</td>
                        <td style={{ padding: '0.5rem 0', textAlign: 'right' }}>Rs. {it.price.toLocaleString()}</td>
                        <td style={{ padding: '0.5rem 0', textAlign: 'right', fontWeight: 'bold' }}>Rs. {(it.price * it.quantity).toLocaleString()}</td>
                      </tr>
                    ))
                  ) : (
                    <tr style={{ borderBottom: '1px solid #F3F4F6' }}>
                      <td style={{ padding: '0.5rem 0', fontWeight: '500' }}>{printInvoiceOrder.productName || 'Veelana 200ml Bottle'}</td>
                      <td style={{ padding: '0.5rem 0', textAlign: 'center' }}>{printInvoiceOrder.quantity || 1}</td>
                      <td style={{ padding: '0.5rem 0', textAlign: 'right' }}>{printInvoiceOrder.totalPrice || 'Rs. 1,899'}</td>
                      <td style={{ padding: '0.5rem 0', textAlign: 'right', fontWeight: 'bold' }}>{printInvoiceOrder.totalPrice || 'Rs. 1,899'}</td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* Summary */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '0.5rem' }}>
                <div style={{ width: '200px', display: 'flex', flexDirection: 'column', gap: '4px', textAlign: 'right', fontSize: '0.82rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#4B5563' }}>
                    <span>Subtotal:</span>
                    <span>Rs. {(printInvoiceOrder.subtotal || printInvoiceOrder.totalAmount).toLocaleString()}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#4B5563' }}>
                    <span>Delivery:</span>
                    <span>{printInvoiceOrder.shippingFee === 0 ? 'FREE' : `Rs. ${printInvoiceOrder.shippingFee || 0}`}</span>
                  </div>
                  {printInvoiceOrder.discountAmount > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#047857', fontWeight: 'bold' }}>
                      <span>Discount ({printInvoiceOrder.couponCode}):</span>
                      <span>-Rs. {printInvoiceOrder.discountAmount}</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', fontWeight: 'bold', color: '#111827', borderTop: '1px solid #E5E7EB', paddingTop: '4px', marginTop: '2px' }}>
                    <span>Total (COD):</span>
                    <span style={{ color: '#065F46' }}>{printInvoiceOrder.totalPrice || `Rs. ${printInvoiceOrder.totalAmount}`}</span>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '1.25rem', display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setPrintInvoiceOrder(null)}
                style={{ padding: '0.6rem 1.1rem', background: '#EAEFE4', color: '#2A361E', border: 'none', borderRadius: '8px', fontSize: '0.82rem', fontWeight: 'bold', cursor: 'pointer' }}
              >
                Close
              </button>
              <button
                onClick={() => window.print()}
                style={{ padding: '0.6rem 1.25rem', background: '#1B2E1E', color: '#FAF8F5', border: 'none', borderRadius: '8px', fontSize: '0.82rem', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <Printer style={{ width: '15px', height: '15px', color: '#D4AF37' }} />
                <span>Print Invoice</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STATUS HISTORY MODAL */}
      {viewHistoryOrder && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999999,
            background: 'rgba(18, 30, 20, 0.75)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            overflowY: 'auto',
          }}
          onClick={() => setViewHistoryOrder(null)}
        >
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '20px',
              padding: '1.75rem',
              maxWidth: '460px',
              width: '100%',
              boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
              border: '1px solid rgba(79, 93, 56, 0.2)',
              position: 'relative',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ECE7DD', paddingBottom: '0.85rem', marginBottom: '1.25rem' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 'bold', color: '#1B2E1E', margin: 0 }}>
                Status Audit Trail (#{viewHistoryOrder.id})
              </h3>
              <button
                onClick={() => setViewHistoryOrder(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: '#7A8C74' }}
              >
                <X style={{ width: '20px', height: '20px' }} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {viewHistoryOrder.statusHistory && viewHistoryOrder.statusHistory.length > 0 ? (
                viewHistoryOrder.statusHistory.map((hist, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.82rem' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#2D6A4F', marginTop: '4px', flexShrink: 0 }} />
                    <div>
                      <strong style={{ color: '#1B2E1E', display: 'block' }}>{hist.status}</strong>
                      <span style={{ fontSize: '0.72rem', color: '#73836E' }}>{new Date(hist.timestamp).toLocaleString('en-PK')}</span>
                      {hist.note && <p style={{ color: '#5A6B53', margin: '2px 0 0', fontSize: '0.78rem' }}>{hist.note}</p>}
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ fontSize: '0.82rem', color: '#73836E' }}>
                  Order recorded with status: {viewHistoryOrder.status || 'Pending'}
                </div>
              )}
            </div>

            <div style={{ marginTop: '1.25rem', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setViewHistoryOrder(null)}
                style={{ padding: '0.6rem 1.1rem', background: '#EAEFE4', color: '#2A361E', border: 'none', borderRadius: '8px', fontSize: '0.82rem', fontWeight: 'bold', cursor: 'pointer' }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container" style={{ maxWidth: '1240px', margin: '0 auto' }}>
        
        {/* Top Admin Header Bar */}
        <div
          style={{
            background: '#1B2E1E',
            color: '#FFFFFF',
            borderRadius: '20px',
            padding: '1.5rem 2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '2rem',
            boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
          }}
        >
          <div>
            <span style={{ fontSize: '0.75rem', color: '#A0B195', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 'bold' }}>
              VEELANA STORE MANAGEMENT HUB
            </span>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.85rem', fontWeight: 'bold', margin: '0.2rem 0 0', color: '#FFFFFF' }}>
              Admin Operations & Financial Dashboard
            </h1>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
            {/* Tab Switches */}
            <button
              onClick={() => setActiveTab('orders')}
              style={{
                padding: '0.6rem 1.1rem',
                borderRadius: '10px',
                border: 'none',
                background: activeTab === 'orders' ? '#D4AF37' : 'rgba(255,255,255,0.15)',
                color: activeTab === 'orders' ? '#121E14' : '#FFFFFF',
                fontWeight: 'bold',
                fontSize: '0.85rem',
                cursor: 'pointer',
              }}
            >
              Customer Orders ({orders.length})
            </button>

            <button
              onClick={() => setActiveTab('products')}
              style={{
                padding: '0.6rem 1.1rem',
                borderRadius: '10px',
                border: 'none',
                background: activeTab === 'products' ? '#D4AF37' : 'rgba(255,255,255,0.15)',
                color: activeTab === 'products' ? '#121E14' : '#FFFFFF',
                fontWeight: 'bold',
                fontSize: '0.85rem',
                cursor: 'pointer',
              }}
            >
              Product Catalog CMS ({products.length})
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              style={{
                padding: '0.6rem 1.1rem',
                borderRadius: '10px',
                border: 'none',
                background: activeTab === 'analytics' ? '#D4AF37' : 'rgba(255,255,255,0.15)',
                color: activeTab === 'analytics' ? '#121E14' : '#FFFFFF',
                fontWeight: 'bold',
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              <Calculator style={{ width: '14px', height: '14px' }} />
              <span>Profit & Expenses</span>
            </button>

            <button
              onClick={() => setActiveTab('security')}
              style={{
                padding: '0.6rem 1.1rem',
                borderRadius: '10px',
                border: 'none',
                background: activeTab === 'security' ? '#D4AF37' : 'rgba(255,255,255,0.15)',
                color: activeTab === 'security' ? '#121E14' : '#FFFFFF',
                fontWeight: 'bold',
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              <KeyRound style={{ width: '14px', height: '14px' }} />
              <span>Security</span>
            </button>

            <button
              onClick={handleLogout}
              style={{
                padding: '0.6rem 1rem',
                borderRadius: '10px',
                border: '1px solid rgba(255,255,255,0.25)',
                background: 'transparent',
                color: '#FAF8F5',
                fontWeight: 'bold',
                fontSize: '0.8rem',
                cursor: 'pointer',
              }}
            >
              Log Out
            </button>
          </div>
        </div>

        {/* METRICS ROW */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {/* Total Revenue */}
          <div style={{ background: '#FFFFFF', padding: '1.25rem', borderRadius: '16px', border: '1px solid rgba(79, 93, 56, 0.15)', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#73836E', textTransform: 'uppercase' }}>Gross Revenue</span>
            <h3 style={{ fontSize: '1.6rem', fontWeight: '800', color: '#1B2E1E', margin: '0.35rem 0 0' }}>
              Rs. {totalRevenue.toLocaleString()}
            </h3>
          </div>

          {/* Estimated Net Profit */}
          <div style={{ background: '#ECFDF5', padding: '1.25rem', borderRadius: '16px', border: '1px solid #A7F3D0', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#047857', textTransform: 'uppercase' }}>Est. Net Profit</span>
            <h3 style={{ fontSize: '1.6rem', fontWeight: '800', color: '#047857', margin: '0.35rem 0 0' }}>
              Rs. {Math.max(0, estimatedNetProfit).toLocaleString()}
            </h3>
          </div>

          {/* Total Bookings */}
          <div style={{ background: '#FFFFFF', padding: '1.25rem', borderRadius: '16px', border: '1px solid rgba(79, 93, 56, 0.15)', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#73836E', textTransform: 'uppercase' }}>Total Bookings</span>
            <h3 style={{ fontSize: '1.6rem', fontWeight: '800', color: '#1B2E1E', margin: '0.35rem 0 0' }}>
              {totalOrders}
            </h3>
          </div>

          {/* Pending COD Confirmation */}
          <div style={{ background: '#FFFBEB', padding: '1.25rem', borderRadius: '16px', border: '1px solid #FDE68A', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#B45309', textTransform: 'uppercase' }}>Pending COD Verify</span>
            <h3 style={{ fontSize: '1.6rem', fontWeight: '800', color: '#B45309', margin: '0.35rem 0 0' }}>
              {pendingOrders}
            </h3>
          </div>

          {/* Dispatched */}
          <div style={{ background: '#EFF6FF', padding: '1.25rem', borderRadius: '16px', border: '1px solid #BFDBFE', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#1D4ED8', textTransform: 'uppercase' }}>In Transit / Shipped</span>
            <h3 style={{ fontSize: '1.6rem', fontWeight: '800', color: '#1D4ED8', margin: '0.35rem 0 0' }}>
              {dispatchedOrders}
            </h3>
          </div>

          {/* Delivered */}
          <div style={{ background: '#FAF8F5', padding: '1.25rem', borderRadius: '16px', border: '1px solid #D6D0C2', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#5A6B53', textTransform: 'uppercase' }}>Delivered Parcels</span>
            <h3 style={{ fontSize: '1.6rem', fontWeight: '800', color: '#2A361E', margin: '0.35rem 0 0' }}>
              {deliveredOrders}
            </h3>
          </div>
        </div>

        {/* TAB 1: ORDERS DASHBOARD */}
        {activeTab === 'orders' && (
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '20px',
              border: '1px solid rgba(79, 93, 56, 0.15)',
              boxShadow: '0 4px 25px rgba(0,0,0,0.04)',
              overflow: 'hidden',
            }}
          >
            {/* Orders Controls Bar */}
            <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #ECE7DD', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', background: '#FAF8F5' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: '1 1 300px' }}>
                <div style={{ position: 'relative', width: '100%', maxWidth: '380px' }}>
                  <Search style={{ position: 'absolute', left: '12px', top: '11px', width: '16px', height: '16px', color: '#73836E' }} />
                  <input
                    type="text"
                    placeholder="Search by customer name, phone, city, or order ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.55rem 0.75rem 0.55rem 2.3rem',
                      fontSize: '0.85rem',
                      borderRadius: '8px',
                      border: '1px solid #D6D0C2',
                      background: '#FFFFFF',
                      outline: 'none',
                    }}
                  />
                </div>

                {/* Filter Selector */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  style={{
                    padding: '0.55rem 0.75rem',
                    fontSize: '0.85rem',
                    borderRadius: '8px',
                    border: '1px solid #D6D0C2',
                    background: '#FFFFFF',
                    outline: 'none',
                    fontWeight: '600',
                  }}
                >
                  <option value="all">All Statuses ({orders.length})</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="dispatched">Dispatched</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={exportCSV}
                  style={{
                    background: '#4F5D38',
                    color: '#FAF8F5',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.55rem 1rem',
                    fontSize: '0.82rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                  }}
                >
                  <Download style={{ width: '15px', height: '15px' }} />
                  <span>Export CSV</span>
                </button>

                <button
                  onClick={handleClearAllOrders}
                  style={{
                    background: '#FEE2E2',
                    color: '#B91C1C',
                    border: '1px solid #FCA5A5',
                    borderRadius: '8px',
                    padding: '0.55rem 0.85rem',
                    fontSize: '0.82rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <Trash2 style={{ width: '15px', height: '15px' }} />
                  <span>Clear All</span>
                </button>
              </div>
            </div>

            {/* Orders Table */}
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ background: '#FAF8F5', borderBottom: '2px solid #ECE7DD', color: '#5A6B53', textTransform: 'uppercase', fontSize: '0.72rem', letterSpacing: '0.8px' }}>
                    <th style={{ padding: '0.85rem 1rem' }}>Order Ref & Risk</th>
                    <th style={{ padding: '0.85rem 1rem' }}>Customer Details</th>
                    <th style={{ padding: '0.85rem 1rem' }}>Items Ordered</th>
                    <th style={{ padding: '0.85rem 1rem' }}>Total Payable</th>
                    <th style={{ padding: '0.85rem 1rem' }}>Live Status</th>
                    <th style={{ padding: '0.85rem 1rem', textAlign: 'center' }}>Courier & Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan="6" style={{ padding: '3rem 1rem', textAlign: 'center', color: '#73836E' }}>
                        No orders match your criteria. When customers place orders on website or cart, they appear here in real-time.
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((order) => (
                      <tr key={order.id} style={{ borderBottom: '1px solid #F0ECE4' }}>
                        {/* Order ID & COD Risk */}
                        <td style={{ padding: '1rem', verticalAlign: 'top' }}>
                          <div style={{ fontWeight: 'bold', color: '#1B2E1E', fontSize: '0.95rem' }}>
                            #{order.id}
                          </div>
                          <div style={{ color: '#5F7057', fontSize: '0.75rem', marginTop: '2px' }}>
                            {new Date(order.createdAt).toLocaleDateString('en-PK', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                          </div>

                          {/* COD RTO Risk Badge */}
                          {order.riskAssessment && (
                            <span
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '3px',
                                fontSize: '0.68rem',
                                fontWeight: 'bold',
                                color: order.riskAssessment.badgeColor,
                                background: order.riskAssessment.badgeBg,
                                padding: '2px 6px',
                                borderRadius: '4px',
                                marginTop: '4px',
                              }}
                            >
                              <ShieldCheck style={{ width: '11px', height: '11px' }} />
                              {order.riskAssessment.riskLevel} ({order.riskAssessment.score}/100)
                            </span>
                          )}
                        </td>

                        {/* Customer */}
                        <td style={{ padding: '1rem', verticalAlign: 'top', minWidth: '220px' }}>
                          <strong style={{ color: '#1B2E1E', display: 'block', fontSize: '0.9rem' }}>{order.fullName}</strong>
                          <span style={{ color: '#25D366', fontWeight: 'bold', display: 'block', fontSize: '0.82rem' }}>📞 {order.phone}</span>
                          <span style={{ color: '#5A6B53', fontSize: '0.78rem', display: 'block' }}>{order.address}</span>
                          <span style={{ color: '#1B2E1E', fontWeight: '600', fontSize: '0.75rem', display: 'block', marginTop: '2px' }}>
                            🏙️ {order.city} ({order.province || 'Punjab'})
                          </span>
                          {order.landmark && (
                            <span style={{ fontSize: '0.72rem', color: '#92400E', background: '#FEF3C7', padding: '1px 5px', borderRadius: '4px', display: 'inline-block', marginTop: '3px' }}>
                              📌 Near: {order.landmark}
                            </span>
                          )}
                        </td>

                        {/* Items */}
                        <td style={{ padding: '1rem', verticalAlign: 'top' }}>
                          {order.items && Array.isArray(order.items) && order.items.length > 0 ? (
                            order.items.map((it, idx) => (
                              <div key={idx} style={{ fontSize: '0.8rem', color: '#2A361E' }}>
                                • {it.name} <strong style={{ color: '#4F5D38' }}>x{it.quantity}</strong>
                              </div>
                            ))
                          ) : (
                            <span style={{ color: '#2A361E' }}>{order.productName || '200ml Bottle'} x {order.quantity || 1}</span>
                          )}
                        </td>

                        {/* Total */}
                        <td style={{ padding: '1rem', verticalAlign: 'top' }}>
                          <strong style={{ fontSize: '0.95rem', color: '#1B2E1E' }}>
                            {order.totalPrice || `Rs. ${order.totalAmount}`}
                          </strong>
                          <span style={{ display: 'block', fontSize: '0.72rem', color: '#73836E' }}>
                            {order.paymentMethod || 'COD'}
                          </span>
                        </td>

                        {/* Status Dropdown */}
                        <td style={{ padding: '1rem', verticalAlign: 'top' }}>
                          <select
                            value={order.status || 'Pending'}
                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                            style={{
                              padding: '0.4rem 0.6rem',
                              borderRadius: '6px',
                              fontSize: '0.78rem',
                              fontWeight: 'bold',
                              border: '1px solid #D6D0C2',
                              background:
                                order.status === 'Delivered' ? '#ECFDF5' :
                                order.status === 'Dispatched' ? '#EFF6FF' :
                                order.status === 'Confirmed' ? '#FEF3C7' : '#FAF8F5',
                              color:
                                order.status === 'Delivered' ? '#047857' :
                                order.status === 'Dispatched' ? '#1D4ED8' :
                                order.status === 'Confirmed' ? '#B45309' : '#334024',
                              outline: 'none',
                              cursor: 'pointer',
                            }}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Dispatched">Dispatched</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>

                          <button
                            onClick={() => setViewHistoryOrder(order)}
                            style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '0.7rem', color: '#6A7B52', background: 'none', border: 'none', cursor: 'pointer', marginTop: '4px' }}
                          >
                            <Eye style={{ width: '11px', height: '11px' }} />
                            <span>Audit Trail</span>
                          </button>
                        </td>

                        {/* Action Buttons: 1-Click Copy for Courier, WhatsApp Notify, Tracking Number */}
                        <td style={{ padding: '1rem', textAlign: 'center', verticalAlign: 'top', minWidth: '160px' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'center' }}>
                            {/* 1-Click Copy for Courier Portal (Trax / Leopard / PostEx) */}
                            <button
                              onClick={() => {
                                const courierText = `Name: ${order.fullName}\nPhone: ${order.phone}\nCity: ${order.city}\nAddress: ${order.address}${order.landmark ? ` (Near: ${order.landmark})` : ''}\nCOD Amount: ${String(order.totalPrice || order.totalAmount).replace(/[^0-9]/g, '')}\nOrder ID: ${order.id}`;
                                navigator.clipboard.writeText(courierText);
                                showNotification(`📋 Copied for Courier Portal! (#${order.id})`);
                              }}
                              title="Copy details formatted for Trax / Leopard / PostEx portal"
                              style={{
                                background: '#1B2E1E',
                                color: '#FAF8F5',
                                border: 'none',
                                borderRadius: '6px',
                                padding: '0.4rem 0.75rem',
                                fontSize: '0.75rem',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '5px',
                                width: '100%',
                                justifyContent: 'center',
                              }}
                            >
                              <Copy style={{ width: '12px', height: '12px', color: '#D4AF37' }} />
                              <span>Copy for Courier</span>
                            </button>

                            {/* WhatsApp Dispatch Notification */}
                            <button
                              onClick={() => sendWhatsAppUpdate(order)}
                              title="Send WhatsApp update to customer"
                              style={{
                                background: '#25D366',
                                color: '#FFFFFF',
                                border: 'none',
                                borderRadius: '6px',
                                padding: '0.4rem 0.75rem',
                                fontSize: '0.75rem',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                                width: '100%',
                                justifyContent: 'center',
                              }}
                            >
                              <MessageCircle style={{ width: '13px', height: '13px' }} />
                              <span>WhatsApp Notify</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCT CATALOG CMS */}
        {activeTab === 'products' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem' }}>
            
            {/* Left: Product List */}
            <div style={{ background: '#FFFFFF', borderRadius: '20px', padding: '1.75rem', border: '1px solid rgba(79, 93, 56, 0.15)', boxShadow: '0 4px 25px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid #ECE7DD', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1B2E1E', margin: 0 }}>
                    Live Products ({products.length})
                  </h3>
                  <span style={{ fontSize: '0.78rem', color: '#73836E' }}>All items visible in store and cart</span>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={handleResetCatalog}
                    style={{ background: '#FAF8F5', color: '#5A6B53', border: '1px solid #D6D0C2', borderRadius: '8px', padding: '0.4rem 0.75rem', fontSize: '0.78rem', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                    title="Reset to Factory Defaults"
                  >
                    <RotateCcw style={{ width: '13px', height: '13px' }} />
                    <span>Reset Defaults</span>
                  </button>

                  <button
                    onClick={() => {
                      setEditingProduct(null);
                      setProductFormData({
                        name: '',
                        subtitle: '',
                        price: 'Rs. 1,899',
                        originalPrice: 'Rs. 2,450',
                        category: 'bottles',
                        badge: 'New Arrival',
                        image: '/assets/real_250ml_single.webp',
                        features: '100% Cold-Pressed Organic Herbal Oil\n25+ Potent Botanical Herbs\nParaben, Sulphate & Mineral Oil Free\nFree WhatsApp Consultation',
                        popular: false,
                        inStock: true
                      });
                    }}
                    style={{ background: '#4F5D38', color: '#FAF8F5', border: 'none', borderRadius: '8px', padding: '0.4rem 0.85rem', fontSize: '0.8rem', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    <Plus style={{ width: '14px', height: '14px' }} />
                    <span>Add New</span>
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {products.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '2.5rem 1rem', color: '#73836E' }}>
                    <p>No products in store currently.</p>
                    <button
                      onClick={handleResetCatalog}
                      className="btn-olive"
                      style={{ padding: '0.6rem 1.25rem', fontSize: '0.85rem', margin: '0 auto' }}
                    >
                      Restore 4 Default Products
                    </button>
                  </div>
                ) : (
                  products.map((prod) => (
                    <div
                      key={prod.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.85rem',
                        background: '#FAF8F5',
                        borderRadius: '12px',
                        border: '1px solid rgba(79, 93, 56, 0.12)',
                        gap: '0.75rem',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: 0 }}>
                        <div style={{ width: '48px', height: '48px', borderRadius: '8px', background: '#FFFFFF', padding: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden' }}>
                          <img
                            src={prod.image}
                            alt={prod.name}
                            style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                            onError={(e) => { e.target.src = '/assets/real_250ml_single.webp'; }}
                          />
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <h4 style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#1B2E1E', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {prod.name}
                          </h4>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ fontSize: '0.82rem', color: '#4F5D38', fontWeight: '800' }}>{prod.price}</span>
                            {prod.originalPrice && (
                              <span style={{ fontSize: '0.75rem', color: '#8A9A86', textDecoration: 'line-through' }}>{prod.originalPrice}</span>
                            )}
                            <span style={{ fontSize: '0.7rem', background: prod.inStock !== false ? '#EBF5E9' : '#FEE2E2', color: prod.inStock !== false ? '#2D6A4F' : '#B91C1C', padding: '1px 6px', borderRadius: '4px', fontWeight: 'bold' }}>
                              {prod.inStock !== false ? 'In Stock' : 'Out of Stock'}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '0.4rem', flexShrink: 0 }}>
                        <button
                          onClick={() => handleEditProduct(prod)}
                          style={{ background: '#FFFFFF', border: '1px solid #D6D0C2', borderRadius: '6px', padding: '6px 9px', color: '#3A4828', cursor: 'pointer' }}
                          title="Edit Product"
                        >
                          <Edit style={{ width: '14px', height: '14px' }} />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(prod.id, prod.name)}
                          style={{ background: '#FEE2E2', border: '1px solid #FCA5A5', borderRadius: '6px', padding: '6px 9px', color: '#B91C1C', cursor: 'pointer' }}
                          title="Delete Product"
                        >
                          <Trash2 style={{ width: '14px', height: '14px' }} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Right: Add / Edit Form with Direct Image Upload */}
            <div style={{ background: '#FFFFFF', borderRadius: '20px', padding: '1.75rem', border: '1px solid rgba(79, 93, 56, 0.15)', boxShadow: '0 4px 25px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid #ECE7DD' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1B2E1E', margin: 0 }}>
                  {editingProduct ? `Edit: ${editingProduct.name}` : 'Add New Store Product'}
                </h3>
                {editingProduct && (
                  <button
                    onClick={() => {
                      setEditingProduct(null);
                      setProductFormData({
                        name: '',
                        subtitle: '',
                        price: 'Rs. 1,899',
                        originalPrice: 'Rs. 2,450',
                        category: 'bottles',
                        badge: '',
                        image: '/assets/real_250ml_single.webp',
                        features: '',
                        popular: false,
                        inStock: true
                      });
                    }}
                    style={{ background: '#FAF8F5', border: '1px solid #D6D0C2', borderRadius: '6px', padding: '3px 8px', fontSize: '0.75rem', color: '#5A6B53', cursor: 'pointer' }}
                  >
                    Cancel Edit
                  </button>
                )}
              </div>

              <form onSubmit={handleSaveProduct} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {/* Product Image Section (Upload from Device / Presets / URL) */}
                <div style={{ background: '#FAF8F5', padding: '1rem', borderRadius: '12px', border: '1px dashed rgba(79, 93, 56, 0.25)' }}>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 'bold', color: '#1B2E1E', marginBottom: '0.5rem' }}>
                    📸 Product Image (Upload PNG / JPG / WEBP or Choose Preset)
                  </label>

                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0.75rem' }}>
                    {/* Image Preview */}
                    <div style={{ width: '64px', height: '64px', borderRadius: '10px', background: '#FFFFFF', border: '1px solid #D6D0C2', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0, padding: '3px' }}>
                      <img
                        src={productFormData.image || '/assets/real_250ml_single.webp'}
                        alt="Product Preview"
                        style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                        onError={(e) => { e.target.src = '/assets/real_250ml_single.webp'; }}
                      />
                    </div>

                    <div style={{ flex: 1 }}>
                      {/* Hidden File Input */}
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/png, image/jpeg, image/jpg, image/webp"
                        onChange={handleImageFileUpload}
                        style={{ display: 'none' }}
                      />

                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploading}
                        style={{
                          background: '#1B2E1E',
                          color: '#FAF8F5',
                          border: 'none',
                          borderRadius: '8px',
                          padding: '0.55rem 1rem',
                          fontSize: '0.82rem',
                          fontWeight: 'bold',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                        }}
                      >
                        <Upload style={{ width: '14px', height: '14px', color: '#D4AF37' }} />
                        <span>{isUploading ? 'Compressing & Uploading...' : 'Upload Image from Computer / Phone'}</span>
                      </button>

                      <span style={{ display: 'block', fontSize: '0.72rem', color: '#73836E', marginTop: '4px' }}>
                        Supports .png, .jpg, .jpeg, .webp (Auto-optimized for web)
                      </span>
                    </div>
                  </div>

                  {/* Preset quick selectors */}
                  <div style={{ marginTop: '0.5rem' }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 'bold', color: '#5A6B53', display: 'block', marginBottom: '4px' }}>
                      Or choose from store default assets:
                    </span>
                    <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                      {PRESET_IMAGES.map((img) => (
                        <button
                          key={img.path}
                          type="button"
                          onClick={() => setProductFormData({ ...productFormData, image: img.path })}
                          style={{
                            fontSize: '0.72rem',
                            padding: '3px 8px',
                            borderRadius: '6px',
                            border: productFormData.image === img.path ? '1px solid #1B2E1E' : '1px solid #D6D0C2',
                            background: productFormData.image === img.path ? '#1B2E1E' : '#FFFFFF',
                            color: productFormData.image === img.path ? '#FAF8F5' : '#334024',
                            cursor: 'pointer',
                          }}
                        >
                          {img.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#2A361E', marginBottom: '0.25rem' }}>Product Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Veelana 200ml Master Bottle"
                    value={productFormData.name}
                    onChange={(e) => setProductFormData({ ...productFormData, name: e.target.value })}
                    style={{ width: '100%', padding: '0.6rem 0.75rem', fontSize: '0.85rem', borderRadius: '8px', border: '1px solid #D6D0C2', outline: 'none' }}
                  />
                </div>

                {/* Subtitle */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#2A361E', marginBottom: '0.25rem' }}>Subtitle / Short Tagline</label>
                  <input
                    type="text"
                    placeholder="e.g. 2-3 Months Continuous Regrowth Cycle"
                    value={productFormData.subtitle}
                    onChange={(e) => setProductFormData({ ...productFormData, subtitle: e.target.value })}
                    style={{ width: '100%', padding: '0.6rem 0.75rem', fontSize: '0.85rem', borderRadius: '8px', border: '1px solid #D6D0C2', outline: 'none' }}
                  />
                </div>

                {/* Prices */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#2A361E', marginBottom: '0.25rem' }}>Selling Price (PKR) *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 1899 or Rs. 1,899"
                      value={productFormData.price}
                      onChange={(e) => setProductFormData({ ...productFormData, price: e.target.value })}
                      style={{ width: '100%', padding: '0.6rem 0.75rem', fontSize: '0.85rem', borderRadius: '8px', border: '1px solid #D6D0C2', outline: 'none' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#2A361E', marginBottom: '0.25rem' }}>Original Price (Strikethrough)</label>
                    <input
                      type="text"
                      placeholder="e.g. 2450 or Rs. 2,450"
                      value={productFormData.originalPrice}
                      onChange={(e) => setProductFormData({ ...productFormData, originalPrice: e.target.value })}
                      style={{ width: '100%', padding: '0.6rem 0.75rem', fontSize: '0.85rem', borderRadius: '8px', border: '1px solid #D6D0C2', outline: 'none' }}
                    />
                  </div>
                </div>

                {/* Category & Badge */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#2A361E', marginBottom: '0.25rem' }}>Category</label>
                    <select
                      value={productFormData.category}
                      onChange={(e) => setProductFormData({ ...productFormData, category: e.target.value })}
                      style={{ width: '100%', padding: '0.6rem 0.75rem', fontSize: '0.85rem', borderRadius: '8px', border: '1px solid #D6D0C2', outline: 'none' }}
                    >
                      <option value="bottles">Individual Bottles</option>
                      <option value="bundles">Special Bundles & Twin Packs</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#2A361E', marginBottom: '0.25rem' }}>Badge Label</label>
                    <input
                      type="text"
                      placeholder="e.g. BEST VALUE or MOST POPULAR"
                      value={productFormData.badge}
                      onChange={(e) => setProductFormData({ ...productFormData, badge: e.target.value })}
                      style={{ width: '100%', padding: '0.6rem 0.75rem', fontSize: '0.85rem', borderRadius: '8px', border: '1px solid #D6D0C2', outline: 'none' }}
                    />
                  </div>
                </div>

                {/* Bullet Points */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#2A361E', marginBottom: '0.25rem' }}>Features & Bullet Points (1 per line)</label>
                  <textarea
                    rows={3}
                    placeholder="100% Cold-Pressed Organic Herbal Oil&#10;25+ Potent Botanical Herbs&#10;Free from Parabens & Mineral Oils"
                    value={productFormData.features}
                    onChange={(e) => setProductFormData({ ...productFormData, features: e.target.value })}
                    style={{ width: '100%', padding: '0.6rem 0.75rem', fontSize: '0.85rem', borderRadius: '8px', border: '1px solid #D6D0C2', outline: 'none' }}
                  />
                </div>

                {/* Checkboxes */}
                <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', marginTop: '0.25rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', fontWeight: '700', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={productFormData.popular}
                      onChange={(e) => setProductFormData({ ...productFormData, popular: e.target.checked })}
                    />
                    <span>Highlight as Popular</span>
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', fontWeight: '700', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={productFormData.inStock}
                      onChange={(e) => setProductFormData({ ...productFormData, inStock: e.target.checked })}
                    />
                    <span>In Stock</span>
                  </label>
                </div>

                {/* Save Button */}
                <button
                  type="submit"
                  className="btn-olive"
                  style={{ width: '100%', padding: '0.85rem', fontSize: '0.9rem', fontWeight: 'bold', justifyContent: 'center', cursor: 'pointer', borderRadius: '10px', marginTop: '0.5rem' }}
                >
                  <span>{editingProduct ? 'Save Product Changes' : 'Create & Publish Product'}</span>
                </button>
              </form>
            </div>

          </div>
        )}

        {/* TAB 3: PROFIT & FINANCIAL CALCULATOR */}
        {activeTab === 'analytics' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            
            {/* Left: Profit Summary Report */}
            <div style={{ background: '#FFFFFF', borderRadius: '20px', padding: '1.75rem', border: '1px solid rgba(79, 93, 56, 0.15)', boxShadow: '0 4px 25px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid #ECE7DD' }}>
                <TrendingUp style={{ width: '20px', height: '20px', color: '#047857' }} />
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1B2E1E', margin: 0 }}>
                  Real Profit & Unit Economics
                </h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.9rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.6rem 0.85rem', background: '#FAF8F5', borderRadius: '8px' }}>
                  <span className="font-semibold text-gray-700">Gross Sales Revenue:</span>
                  <strong className="text-gray-900">Rs. {totalRevenue.toLocaleString()}</strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.6rem 0.85rem', color: '#B91C1C' }}>
                  <span>Estimated Product Cost (COGS @ {financialSettings.cogsPercentage}%):</span>
                  <strong>- Rs. {totalCOGS.toLocaleString()}</strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.6rem 0.85rem', color: '#B91C1C' }}>
                  <span>Packaging Costs ({totalOrders} orders x Rs. {financialSettings.packagingPerOrder}):</span>
                  <strong>- Rs. {totalPackagingCost.toLocaleString()}</strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.6rem 0.85rem', color: '#B91C1C' }}>
                  <span>Courier & COD Charges ({totalOrders} orders x Rs. {financialSettings.courierFeePerOrder}):</span>
                  <strong>- Rs. {totalCourierCost.toLocaleString()}</strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.6rem 0.85rem', color: '#B91C1C' }}>
                  <span>Estimated Monthly Ad Spend (Meta/TikTok):</span>
                  <strong>- Rs. {financialSettings.monthlyAdSpend.toLocaleString()}</strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.6rem 0.85rem', color: '#B91C1C' }}>
                  <span>Miscellaneous Operational Overhead:</span>
                  <strong>- Rs. {financialSettings.miscellaneousExpenses.toLocaleString()}</strong>
                </div>

                <div style={{ borderTop: '2px solid #1B2E1E', paddingTop: '0.85rem', marginTop: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#ECFDF5', padding: '0.85rem', borderRadius: '10px' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: '#047857', fontWeight: 'bold', textTransform: 'uppercase' }}>Estimated Net Profit</span>
                    <div style={{ fontSize: '1.4rem', fontWeight: '900', color: '#047857' }}>
                      Rs. {Math.max(0, estimatedNetProfit).toLocaleString()}
                    </div>
                  </div>
                  <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#047857', background: '#A7F3D0', padding: '4px 10px', borderRadius: '6px' }}>
                    {totalRevenue > 0 ? `${Math.round((estimatedNetProfit / totalRevenue) * 100)}% Margin` : '0%'}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Cost & Expense Configuration */}
            <div style={{ background: '#FFFFFF', borderRadius: '20px', padding: '1.75rem', border: '1px solid rgba(79, 93, 56, 0.15)', boxShadow: '0 4px 25px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid #ECE7DD' }}>
                <Calculator style={{ width: '20px', height: '20px', color: '#4F5D38' }} />
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1B2E1E', margin: 0 }}>
                  Expense & Cost Settings
                </h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Product Manufacturing & Oil Cost (% of Price)
                  </label>
                  <input
                    type="number"
                    value={financialSettings.cogsPercentage}
                    onChange={(e) => {
                      const updated = { ...financialSettings, cogsPercentage: Number(e.target.value) };
                      setFinancialSettings(updated);
                      localStorage.setItem(EXPENSES_STORAGE_KEY, JSON.stringify(updated));
                    }}
                    className="w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:border-[#1B2E1E]"
                  />
                  <span className="text-[11px] text-gray-500 mt-1 block">Default: 25% (Herbal oil extraction, bottles, labels)</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Packaging & Box Cost Per Order (PKR)
                  </label>
                  <input
                    type="number"
                    value={financialSettings.packagingPerOrder}
                    onChange={(e) => {
                      const updated = { ...financialSettings, packagingPerOrder: Number(e.target.value) };
                      setFinancialSettings(updated);
                      localStorage.setItem(EXPENSES_STORAGE_KEY, JSON.stringify(updated));
                    }}
                    className="w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:border-[#1B2E1E]"
                  />
                  <span className="text-[11px] text-gray-500 mt-1 block">Flyers, bubble wrap, branded box, tape</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Courier / Trax Delivery Fee Per Order (PKR)
                  </label>
                  <input
                    type="number"
                    value={financialSettings.courierFeePerOrder}
                    onChange={(e) => {
                      const updated = { ...financialSettings, courierFeePerOrder: Number(e.target.value) };
                      setFinancialSettings(updated);
                      localStorage.setItem(EXPENSES_STORAGE_KEY, JSON.stringify(updated));
                    }}
                    className="w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:border-[#1B2E1E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Monthly Meta (Facebook / Instagram) & TikTok Ad Budget (PKR)
                  </label>
                  <input
                    type="number"
                    value={financialSettings.monthlyAdSpend}
                    onChange={(e) => {
                      const updated = { ...financialSettings, monthlyAdSpend: Number(e.target.value) };
                      setFinancialSettings(updated);
                      localStorage.setItem(EXPENSES_STORAGE_KEY, JSON.stringify(updated));
                    }}
                    className="w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:border-[#1B2E1E]"
                  />
                </div>
              </div>
            </div>

          </div>
        )}

        {/* TAB 4: CHANGE PASSWORD & SECURITY */}
        {activeTab === 'security' && (
          <div style={{ maxWidth: '520px', margin: '0 auto', background: '#FFFFFF', borderRadius: '20px', padding: '2rem', border: '1px solid rgba(79, 93, 56, 0.15)', boxShadow: '0 4px 25px rgba(0,0,0,0.04)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid #ECE7DD' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#EAEFE4', color: '#1B2E1E', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <KeyRound style={{ width: '18px', height: '18px' }} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#1B2E1E', margin: 0 }}>
                  Change Admin Password
                </h3>
                <span style={{ fontSize: '0.75rem', color: '#73836E' }}>Set a private secret password for your store</span>
              </div>
            </div>

            {pwdSuccess && (
              <div style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', color: '#047857', padding: '0.75rem 1rem', borderRadius: '10px', fontSize: '0.82rem', marginBottom: '1rem', fontWeight: '600' }}>
                {pwdSuccess}
              </div>
            )}

            {pwdError && (
              <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', color: '#B91C1C', padding: '0.75rem 1rem', borderRadius: '10px', fontSize: '0.82rem', marginBottom: '1rem', fontWeight: '600' }}>
                {pwdError}
              </div>
            )}

            <form onSubmit={handleChangePassword} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#2A361E', marginBottom: '0.35rem' }}>
                  Current Password *
                </label>
                <input
                  type="password"
                  required
                  placeholder="Enter your current password"
                  value={pwdForm.currentPassword}
                  onChange={(e) => setPwdForm({ ...pwdForm, currentPassword: e.target.value })}
                  style={{ width: '100%', padding: '0.7rem 0.85rem', fontSize: '0.88rem', borderRadius: '8px', border: '1px solid #D6D0C2', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#2A361E', marginBottom: '0.35rem' }}>
                  New Password *
                </label>
                <input
                  type="password"
                  required
                  placeholder="Enter new password (min. 4 characters)"
                  value={pwdForm.newPassword}
                  onChange={(e) => setPwdForm({ ...pwdForm, newPassword: e.target.value })}
                  style={{ width: '100%', padding: '0.7rem 0.85rem', fontSize: '0.88rem', borderRadius: '8px', border: '1px solid #D6D0C2', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#2A361E', marginBottom: '0.35rem' }}>
                  Confirm New Password *
                </label>
                <input
                  type="password"
                  required
                  placeholder="Re-enter new password"
                  value={pwdForm.confirmPassword}
                  onChange={(e) => setPwdForm({ ...pwdForm, confirmPassword: e.target.value })}
                  style={{ width: '100%', padding: '0.7rem 0.85rem', fontSize: '0.88rem', borderRadius: '8px', border: '1px solid #D6D0C2', outline: 'none' }}
                />
              </div>

              <button
                type="submit"
                className="btn-olive"
                style={{ width: '100%', padding: '0.85rem', fontSize: '0.9rem', fontWeight: 'bold', justifyContent: 'center', cursor: 'pointer', borderRadius: '10px', marginTop: '0.5rem' }}
              >
                <span>Save New Password</span>
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
