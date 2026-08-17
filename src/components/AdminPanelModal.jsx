import React, { useState, useEffect, useRef } from 'react';
import { X, Plus, Edit, Trash2, ShieldCheck, Download, Upload, RefreshCw, CheckCircle, Package, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getProducts, addProduct, updateProduct, deleteProduct, resetToDefaults, exportProductsJSON, importProductsJSON } from '../services/productService';

const PRESET_IMAGES = [
  { label: '200ml Bottle', path: '/assets/real_250ml_single.webp' },
  { label: '100ml Bottle', path: '/assets/real_100ml_double.webp' },
  { label: 'Family Bundle', path: '/assets/real_250ml_and_100ml.webp' },
  { label: 'Complete Set Boxes', path: '/assets/real_full_set_boxes.webp' },
];

export default function AdminPanelModal({ isOpen, onClose }) {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [activeTab, setActiveTab] = useState('products'); // 'products', 'form', 'export'
  const [jsonInput, setJsonInput] = useState('');
  const [statusMsg, setStatusMsg] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  // Form State for Add / Edit
  const [formData, setFormData] = useState({
    name: '',
    subtitle: '',
    price: 'Rs. 1,899',
    originalPrice: 'Rs. 2,450',
    category: 'bottles',
    badge: 'Popular Herbal Choice',
    image: '/assets/real_250ml_single.webp',
    featuresText: '100% Cold-Pressed Organic Formula\n25+ Ayurvedic Herb Infusion\nParaben, Sulphate & Mineral Oil Free\nFast Delivery Across Pakistan',
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
    const clean = password.trim();
    if (clean === 'veelana123' || clean === 'admin' || clean === '1234' || clean === 'admin123') {
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
      price: 'Rs. 1,899',
      originalPrice: 'Rs. 2,450',
      category: 'bottles',
      badge: 'New Herbal Release',
      image: '/assets/real_250ml_single.webp',
      featuresText: '100% Cold-Pressed Herbal Formula\n25+ Ayurvedic Herb Infusion\nParaben, Sulphate & Mineral Oil Free\nFast Cash on Delivery',
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
      category: product.category || 'bottles',
      badge: product.badge || '',
      image: product.image || '/assets/real_250ml_single.webp',
      featuresText: Array.isArray(product.features) ? product.features.join('\n') : (product.features || ''),
      popular: !!product.popular,
      inStock: product.inStock !== false,
    });
    setActiveTab('form');
  };

  // Direct Image File Upload Handler
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
        setFormData((prev) => ({ ...prev, image: compressedDataUrl }));
        setIsUploading(false);
        showStatus('📷 Image uploaded & optimized!');
      };
      img.onerror = () => {
        setIsUploading(false);
        alert('Failed to load image.');
      };
      img.src = uploadEvent.target.result;
    };
    reader.readAsDataURL(file);
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
    if (window.confirm('Reset catalog back to original default 4 bottles and bundles?')) {
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
                <p className="text-xs text-[#EAEFE4]/80">Add, Edit & Upload Images Live</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-[#FDFBF7]/80 hover:text-white hover:bg-white/10 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6">
            {!isAuthenticated ? (
              /* Password Form */
              <form onSubmit={handleLogin} className="max-w-xs mx-auto py-8 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#1B2E1E] text-[#D4AF37] flex items-center justify-center mx-auto mb-2">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-xl font-bold text-[#121E14]">Store Admin Access</h4>
                <p className="text-xs text-gray-500">Enter your store password to manage products.</p>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Password (default: veelana123)"
                  className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-xl focus:outline-none focus:border-[#1B2E1E] text-center"
                  autoFocus
                />
                {authError && <p className="text-xs text-red-600 font-semibold">{authError}</p>}
                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#1B2E1E] text-[#FAF8F5] font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-[#2D4532] transition"
                >
                  Unlock CMS
                </button>
              </form>
            ) : (
              /* Authenticated CMS View */
              <div className="space-y-6">
                {/* Navigation Tabs */}
                <div className="flex items-center justify-between border-b border-gray-200 pb-3 flex-wrap gap-2">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setActiveTab('products')}
                      className={`px-4 py-1.5 rounded-lg text-xs font-bold transition ${
                        activeTab === 'products' ? 'bg-[#1B2E1E] text-[#FAF8F5]' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Product List ({products.length})
                    </button>
                    <button
                      onClick={startAddNew}
                      className={`px-4 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                        activeTab === 'form' && !editingProduct ? 'bg-[#1B2E1E] text-[#FAF8F5]' : 'bg-[#D4AF37]/20 text-[#3A4828] hover:bg-[#D4AF37]/30'
                      }`}
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add Product
                    </button>
                    <button
                      onClick={() => setActiveTab('export')}
                      className={`px-4 py-1.5 rounded-lg text-xs font-bold transition ${
                        activeTab === 'export' ? 'bg-[#1B2E1E] text-[#FAF8F5]' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Export / Backup
                    </button>
                  </div>

                  <button
                    onClick={handleReset}
                    className="text-xs text-gray-500 hover:text-red-600 flex items-center gap-1 font-semibold"
                    title="Restore original products"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Reset to Default
                  </button>
                </div>

                {/* Status Message Notification */}
                {statusMsg && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>{statusMsg}</span>
                  </div>
                )}

                {/* TAB 1: PRODUCT LIST */}
                {activeTab === 'products' && (
                  <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
                    {products.map((prod) => (
                      <div
                        key={prod.id}
                        className="p-4 bg-white rounded-xl border border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm"
                      >
                        <div className="flex items-center gap-4 w-full md:w-auto">
                          <img
                            src={prod.image}
                            alt={prod.name}
                            className="w-14 h-14 object-contain rounded-lg border border-gray-100 shrink-0 bg-[#FAF8F5] p-1"
                            onError={(e) => { e.target.src = '/assets/real_250ml_single.webp'; }}
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
                    {/* Image Upload Box */}
                    <div className="p-3.5 bg-gray-50 border border-dashed border-gray-300 rounded-xl space-y-3">
                      <label className="block text-xs font-bold text-gray-800">
                        Product Image (Upload from Computer or Choose Preset)
                      </label>

                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 bg-white border border-gray-200 rounded-lg p-1 flex items-center justify-center shrink-0 overflow-hidden">
                          <img
                            src={formData.image || '/assets/real_250ml_single.webp'}
                            alt="Preview"
                            className="max-h-full max-w-full object-contain"
                            onError={(e) => { e.target.src = '/assets/real_250ml_single.webp'; }}
                          />
                        </div>

                        <div className="flex-1">
                          <input
                            type="file"
                            ref={fileInputRef}
                            accept="image/png, image/jpeg, image/jpg, image/webp"
                            onChange={handleImageFileUpload}
                            className="hidden"
                          />
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={isUploading}
                            className="px-3 py-1.5 bg-[#1B2E1E] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-sm"
                          >
                            <Upload className="w-3.5 h-3.5 text-[#D4AF37]" />
                            <span>{isUploading ? 'Uploading...' : 'Upload Image File (PNG/JPG/WEBP)'}</span>
                          </button>
                        </div>
                      </div>

                      {/* Presets */}
                      <div className="flex items-center gap-1.5 flex-wrap pt-1">
                        <span className="text-[11px] text-gray-500 font-semibold">Presets:</span>
                        {PRESET_IMAGES.map((img) => (
                          <button
                            key={img.path}
                            type="button"
                            onClick={() => setFormData({ ...formData, image: img.path })}
                            className={`px-2 py-0.5 text-[11px] rounded font-medium border ${
                              formData.image === img.path ? 'bg-[#1B2E1E] text-white border-[#1B2E1E]' : 'bg-white text-gray-700 border-gray-200'
                            }`}
                          >
                            {img.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Product Name *</label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Veelana 200ml Master Bottle"
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
                          placeholder="e.g. 2-3 Months Regrowth Routine"
                          className="w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:border-[#1B2E1E]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Selling Price *</label>
                        <input
                          type="text"
                          value={formData.price}
                          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                          placeholder="e.g. Rs. 1,899"
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
                          placeholder="e.g. Rs. 2,450"
                          className="w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:border-[#1B2E1E]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Category</label>
                        <select
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          className="w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:border-[#1B2E1E]"
                        >
                          <option value="bottles">Individual Bottles</option>
                          <option value="bundles">Special Bundles & Twin Packs</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Badge Text</label>
                        <input
                          type="text"
                          value={formData.badge}
                          onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                          placeholder="e.g. BEST VALUE or 10% OFF"
                          className="w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:border-[#1B2E1E]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Key Features (One feature per line)
                      </label>
                      <textarea
                        rows={3}
                        value={formData.featuresText}
                        onChange={(e) => setFormData({ ...formData, featuresText: e.target.value })}
                        placeholder="25+ Pure Cold-Pressed Herbs&#10;100% Organic & Vegan&#10;Free Cash on Delivery"
                        className="w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:border-[#1B2E1E]"
                      />
                    </div>

                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2 text-xs font-semibold text-gray-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.popular}
                          onChange={(e) => setFormData({ ...formData, popular: e.target.checked })}
                          className="rounded text-[#1B2E1E]"
                        />
                        Highlight as "Most Popular"
                      </label>
                      <label className="flex items-center gap-2 text-xs font-semibold text-gray-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.inStock}
                          onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                          className="rounded text-[#1B2E1E]"
                        />
                        In Stock
                      </label>
                    </div>

                    <div className="pt-2 flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setActiveTab('products')}
                        className="px-4 py-2 bg-gray-100 text-gray-700 font-semibold text-xs rounded-xl hover:bg-gray-200"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 bg-[#1B2E1E] text-[#FAF8F5] font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-[#2D4532]"
                      >
                        {editingProduct ? 'Save Changes' : 'Create Product'}
                      </button>
                    </div>
                  </form>
                )}

                {/* TAB 3: EXPORT & IMPORT BACKUP */}
                {activeTab === 'export' && (
                  <div className="space-y-4">
                    <div className="p-4 bg-white rounded-xl border border-gray-200 space-y-3">
                      <h5 className="font-serif font-bold text-sm text-[#121E14]">Export Catalog Backup</h5>
                      <p className="text-xs text-gray-500">
                        Download your current live product catalog as a JSON file backup.
                      </p>
                      <button
                        onClick={handleExport}
                        className="px-4 py-2 bg-[#4F5D38] text-white rounded-lg text-xs font-bold flex items-center gap-1.5 hover:bg-[#3E4A2C]"
                      >
                        <Download className="w-3.5 h-3.5" />
                        Download Catalog JSON
                      </button>
                    </div>

                    <div className="p-4 bg-white rounded-xl border border-gray-200 space-y-3">
                      <h5 className="font-serif font-bold text-sm text-[#121E14]">Import Catalog from JSON</h5>
                      <textarea
                        rows={4}
                        value={jsonInput}
                        onChange={(e) => setJsonInput(e.target.value)}
                        placeholder="Paste valid JSON catalog array here..."
                        className="w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:border-[#1B2E1E] font-mono"
                      />
                      <button
                        onClick={handleImport}
                        className="px-4 py-2 bg-[#1B2E1E] text-white rounded-lg text-xs font-bold flex items-center gap-1.5 hover:bg-[#2D4532]"
                      >
                        <Upload className="w-3.5 h-3.5 text-[#D4AF37]" />
                        Restore Products from JSON
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
