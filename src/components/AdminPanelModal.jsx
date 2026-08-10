import React, { useState, useEffect } from 'react';
import { X, Plus, Edit, Trash2, ShieldCheck, Download, Upload, RefreshCw, CheckCircle, Package } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getProducts, addProduct, updateProduct, deleteProduct, resetToDefaults, exportProductsJSON, importProductsJSON } from '../services/productService';

export default function AdminPanelModal({ isOpen, onClose }) {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [activeTab, setActiveTab] = useState('products'); // 'products', 'add', 'export'
  const [jsonInput, setJsonInput] = useState('');
  const [statusMsg, setStatusMsg] = useState('');

  // Form State for Add / Edit
  const [formData, setFormData] = useState({
    name: '',
    subtitle: '',
    price: '',
    originalPrice: '',
    badge: '',
    image: '',
    featuresText: '',
    popular: false,
    inStock: true,
  });

  useEffect(() => {
    if (isOpen) {
      setProducts(getProducts());
    }
  }, [isOpen]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'veelana123' || password === 'admin' || password === '1234') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Incorrect Admin Password. (Default: veelana123)');
    }
  };

  const startAddNew = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      subtitle: '',
      price: 'Rs. 1,990',
      originalPrice: 'Rs. 2,490',
      badge: 'New Herbal Release',
      image: '/assets/real_250ml_single.jpg',
      featuresText: '100% Cold-Pressed Herbal Formula\n25+ Ayurvedic Herb Infusion\nParaben, Sulphate & Mineral Oil Free\nFast WhatsApp Dispatch Across Pakistan',
      popular: false,
      inStock: true,
    });
    setActiveTab('form');
  };

  const startEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      subtitle: product.subtitle || '',
      price: product.price || '',
      originalPrice: product.originalPrice || '',
      badge: product.badge || '',
      image: product.image || '',
      featuresText: Array.isArray(product.features) ? product.features.join('\n') : '',
      popular: !!product.popular,
      inStock: product.inStock !== false,
    });
    setActiveTab('form');
  };

  const handleSaveForm = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price) {
      alert('Product Name and Price are required.');
      return;
    }

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        ...formData,
        features: formData.featuresText.split('\n').filter(Boolean),
      });
      showStatus('Product updated successfully!');
    } else {
      addProduct({
        ...formData,
        features: formData.featuresText.split('\n').filter(Boolean),
      });
      showStatus('New Product added to store!');
    }

    setProducts(getProducts());
    setActiveTab('products');
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      deleteProduct(id);
      setProducts(getProducts());
      showStatus('Product removed.');
    }
  };

  const handleReset = () => {
    if (window.confirm('Reset catalog back to original default 100ml and 250ml bottles?')) {
      resetToDefaults();
      setProducts(getProducts());
      showStatus('Catalog reset to defaults.');
    }
  };

  const handleExport = () => {
    const jsonStr = exportProductsJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `veelana_catalog_${Date.now()}.json`;
    a.click();
    showStatus('Catalog JSON downloaded!');
  };

  const handleImport = () => {
    if (!jsonInput.trim()) return;
    const success = importProductsJSON(jsonInput);
    if (success) {
      setProducts(getProducts());
      showStatus('Catalog imported successfully!');
      setJsonInput('');
      setActiveTab('products');
    } else {
      alert('Invalid JSON format. Please check your data.');
    }
  };

  const showStatus = (msg) => {
    setStatusMsg(msg);
    setTimeout(() => setStatusMsg(''), 3500);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-[#FAF8F5] border border-[#1B2E1E]/20 rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden my-8"
        >
          {/* Header */}
          <div className="bg-[#1B2E1E] text-[#FDFBF7] px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Package className="w-5 h-5 text-[#D4AF37]" />
              <div>
                <h3 className="font-serif text-lg font-bold">Veelana Store Management CMS</h3>
                <p className="text-xs text-[#EAEFE4]/80">Add, Edit & Manage Products Live</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-[#FDFBF7]/80 hover:text-white hover:bg-white/10 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Login View */}
          {!isAuthenticated ? (
            <div className="p-8 text-center max-w-md mx-auto">
              <ShieldCheck className="w-12 h-12 text-[#1B2E1E] mx-auto mb-3" />
              <h4 className="font-serif text-xl font-bold text-[#121E14]">Admin Security Check</h4>
              <p className="text-xs text-[#4F5E52] mt-1 mb-6">
                Enter your store management password to access the CMS product editor. (Default: <strong>veelana123</strong>)
              </p>

              <form onSubmit={handleLogin} className="space-y-4">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Admin Password..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-[#1B2E1E] bg-white text-sm"
                  autoFocus
                />
                {authError && <p className="text-xs text-red-600 font-semibold">{authError}</p>}
                <button
                  type="submit"
                  className="w-full py-3 bg-[#1B2E1E] text-white rounded-xl font-semibold text-sm hover:bg-[#3A4828] transition shadow-md"
                >
                  Unlock Admin CMS Panel
                </button>
              </form>
            </div>
          ) : (
            /* Authenticated CMS Dashboard */
            <div className="p-6">
              {/* Notification Banner */}
              {statusMsg && (
                <div className="mb-4 px-4 py-2 bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-semibold rounded-lg flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>{statusMsg}</span>
                </div>
              )}

              {/* Navigation Tabs */}
              <div className="flex flex-wrap items-center justify-between border-b border-gray-200 pb-3 mb-6 gap-2">
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveTab('products')}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
                      activeTab === 'products'
                        ? 'bg-[#1B2E1E] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    All Products ({products.length})
                  </button>
                  <button
                    onClick={startAddNew}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                      activeTab === 'form' && !editingProduct
                        ? 'bg-[#1B2E1E] text-white'
                        : 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
                    }`}
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add New Product
                  </button>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleExport}
                    className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-semibold flex items-center gap-1"
                    title="Export JSON Backup"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Export Catalog
                  </button>
                  <button
                    onClick={() => setActiveTab('json')}
                    className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-semibold flex items-center gap-1"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    Import JSON
                  </button>
                  <button
                    onClick={handleReset}
                    className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg text-xs font-semibold flex items-center gap-1"
                    title="Reset to original 100ml and 250ml"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Reset
                  </button>
                </div>
              </div>

              {/* TAB 1: ALL PRODUCTS LIST */}
              {activeTab === 'products' && (
                <div className="space-y-4 max-h-[450px] overflow-y-auto pr-1">
                  {products.map((prod) => (
                    <div
                      key={prod.id}
                      className="p-4 bg-white rounded-xl border border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm"
                    >
                      <div className="flex items-center gap-4 w-full md:w-auto">
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="w-14 h-14 object-cover rounded-lg border border-gray-100 shrink-0"
                          onError={(e) => { e.target.src = '/assets/real_100ml_double.jpg'; }}
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <h5 className="font-serif font-bold text-base text-[#121E14]">{prod.name}</h5>
                            {prod.popular && (
                              <span className="px-2 py-0.5 bg-[#D4AF37]/20 text-[#3A4828] text-[10px] font-bold rounded-full uppercase">
                                Popular
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-500">{prod.subtitle}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs font-bold text-[#1B2E1E]">{prod.price}</span>
                            {prod.originalPrice && (
                              <span className="text-xs text-gray-400 line-through">{prod.originalPrice}</span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                        <button
                          onClick={() => startEdit(prod)}
                          className="px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg text-xs font-semibold flex items-center gap-1"
                        >
                          <Edit className="w-3.5 h-3.5" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(prod.id, prod.name)}
                          className="px-3 py-1.5 bg-red-50 text-red-700 hover:bg-red-100 rounded-lg text-xs font-semibold flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 2: ADD / EDIT FORM */}
              {activeTab === 'form' && (
                <form onSubmit={handleSaveForm} className="space-y-4 max-h-[480px] overflow-y-auto pr-1">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Product Name *</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Veelana 500ml Family Bottle"
                        className="w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:border-[#1B2E1E]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Subtitle / Tagline</label>
                      <input
                        type="text"
                        value={formData.subtitle}
                        onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                        placeholder="e.g. Mega Value Pack"
                        className="w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:border-[#1B2E1E]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Selling Price *</label>
                      <input
                        type="text"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        placeholder="e.g. Rs. 4,990"
                        className="w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:border-[#1B2E1E]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Original Price (Slash Price)</label>
                      <input
                        type="text"
                        value={formData.originalPrice}
                        onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                        placeholder="e.g. Rs. 6,200"
                        className="w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:border-[#1B2E1E]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Badge Text</label>
                      <input
                        type="text"
                        value={formData.badge}
                        onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                        placeholder="e.g. Best Value for Families"
                        className="w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:border-[#1B2E1E]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Product Image Path / URL</label>
                      <input
                        type="text"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        placeholder="e.g. /assets/real_250ml_single.jpg"
                        className="w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:border-[#1B2E1E]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Key Features (One feature per line)
                    </label>
                    <textarea
                      rows={4}
                      value={formData.featuresText}
                      onChange={(e) => setFormData({ ...formData, featuresText: e.target.value })}
                      placeholder={"500ml Extra Volume\nIdeal for full family use\n25+ Herbal extract infusion\nFree Shipping across Pakistan"}
                      className="w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:border-[#1B2E1E]"
                    />
                  </div>

                  <div className="flex items-center gap-6 pt-2">
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-gray-700">
                      <input
                        type="checkbox"
                        checked={formData.popular}
                        onChange={(e) => setFormData({ ...formData, popular: e.target.checked })}
                        className="rounded text-[#1B2E1E]"
                      />
                      Mark as "Most Popular" Card
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-gray-700">
                      <input
                        type="checkbox"
                        checked={formData.inStock}
                        onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                        className="rounded text-[#1B2E1E]"
                      />
                      In Stock
                    </label>
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t">
                    <button
                      type="button"
                      onClick={() => setActiveTab('products')}
                      className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg text-xs font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-[#1B2E1E] text-white rounded-lg text-xs font-bold hover:bg-[#3A4828] transition shadow"
                    >
                      {editingProduct ? 'Save Product Changes' : 'Publish New Product'}
                    </button>
                  </div>
                </form>
              )}

              {/* TAB 3: IMPORT JSON */}
              {activeTab === 'json' && (
                <div className="space-y-4">
                  <p className="text-xs text-gray-600">
                    Paste a valid Veelana catalog JSON string to update your product list in bulk.
                  </p>
                  <textarea
                    rows={8}
                    value={jsonInput}
                    onChange={(e) => setJsonInput(e.target.value)}
                    placeholder='[ { "id": "custom1", "name": "Veelana Serum", ... } ]'
                    className="w-full p-3 font-mono text-xs border rounded-xl focus:outline-none focus:border-[#1B2E1E]"
                  />
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => setActiveTab('products')}
                      className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg text-xs font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleImport}
                      className="px-6 py-2 bg-[#1B2E1E] text-white rounded-lg text-xs font-bold hover:bg-[#3A4828] transition"
                    >
                      Import & Apply JSON
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
