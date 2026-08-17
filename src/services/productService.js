const STORAGE_KEY = 'veelana_products_cms_v2';

export const DEFAULT_PRODUCTS = [
  {
    id: '100ml',
    name: 'Veelana 100ml Bottle',
    subtitle: 'Handy / Starter Size',
    badge: 'Ideal Daily Nourishment',
    price: 'Rs. 999',
    priceNum: 999,
    originalPrice: 'Rs. 1,490',
    image: '/assets/real_100ml_double.webp',
    category: 'bottles',
    features: [
      '100ml Cold-Pressed Herbal Oil',
      'Handy & Travel-Friendly Bottle',
      'Ideal for 3-4 Weeks Daily Routine',
      '25+ Herbal Extract Infusion',
      'Paraben, Sulphate & Mineral Oil Free',
      'Free WhatsApp Consultation'
    ],
    waMessage: 'Hi,%20I%20want%20to%20order%20the%20Veelana%20100ml%20bottle',
    popular: false,
    inStock: true,
  },
  {
    id: '200ml',
    name: 'Veelana 200ml Bottle',
    subtitle: 'Value Pack (Most Popular)',
    badge: 'Best Value for Long-Term Growth Routine',
    price: 'Rs. 1,899',
    priceNum: 1899,
    originalPrice: 'Rs. 2,450',
    image: '/assets/real_250ml_single.webp',
    category: 'bottles',
    features: [
      '200ml Extra Volume Bottle',
      'Best Value for 2-3 Months Routine',
      'Deep Follicle Restoration Cycle',
      '25+ Herbal Extract Infusion',
      'Paraben, Sulphate & Mineral Oil Free',
      'Priority Dispatch & WhatsApp Support'
    ],
    waMessage: 'Hi,%20I%20want%20to%20order%20the%20Veelana%20200ml%20bottle',
    popular: true,
    inStock: true,
  },
  {
    id: 'twin-pack-200ml',
    name: 'Veelana Twin Pack (2x 200ml)',
    subtitle: 'Ultimate 5-Month Growth Treatment',
    badge: 'SAVE RS. 500 + FREE DELIVERY',
    price: 'Rs. 3,499',
    priceNum: 3499,
    originalPrice: 'Rs. 4,900',
    image: '/assets/real_250ml_single.webp',
    category: 'bundles',
    features: [
      '2 Full Bottles of 200ml (400ml Total)',
      'Complete 5-Month Continuous Regrowth Course',
      'FREE Nationwide Express Courier Delivery',
      'Save Rs. 500 Extra on Bundle Pricing',
      'VIP Priority Customer Support on WhatsApp'
    ],
    waMessage: 'Hi,%20I%20want%20to%20order%20the%20Veelana%20Twin%20Pack%20(2x%20200ml)',
    popular: false,
    inStock: true,
  },
  {
    id: 'family-pack',
    name: 'Family Hair Rescue Bundle (200ml + 100ml)',
    subtitle: 'Complete Household Hair Care',
    badge: 'BEST FOR FAMILIES',
    price: 'Rs. 2,699',
    priceNum: 2699,
    originalPrice: 'Rs. 3,940',
    image: '/assets/real_100ml_double.webp',
    category: 'bundles',
    features: [
      '1x 200ml Master Bottle + 1x 100ml Travel Bottle',
      'Covers Both Men & Women Daily Nourishment',
      'Controls Dandruff & Hair Fall in 14 Days',
      'Natural Amla, Shikakai, Bhringraj & Rosemary Infused',
      'Free WhatsApp Usage Guidance'
    ],
    waMessage: 'Hi,%20I%20want%20to%20order%20the%20Family%20Hair%20Rescue%20Bundle',
    popular: false,
    inStock: true,
  }
];

// Helper to format numeric prices
function formatPrice(val) {
  if (typeof val === 'number') return `Rs. ${val.toLocaleString()}`;
  const str = String(val || '').trim();
  if (str.startsWith('Rs.')) return str;
  const num = parseInt(str.replace(/[^0-9]/g, ''), 10);
  return isNaN(num) ? 'Rs. 999' : `Rs. ${num.toLocaleString()}`;
}

function parsePriceNum(val) {
  if (typeof val === 'number') return val;
  const num = parseInt(String(val || '').replace(/[^0-9]/g, ''), 10);
  return isNaN(num) ? 999 : num;
}

// Read from LocalStorage or fallback to default products
export function getProducts() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Failed to read products from localStorage', e);
  }
  return DEFAULT_PRODUCTS;
}

// Save products list to LocalStorage
export function saveProducts(products) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    window.dispatchEvent(new CustomEvent('veelana_products_updated', { detail: products }));
    return true;
  } catch (e) {
    console.error('Failed to save products to localStorage', e);
    return false;
  }
}

// Add a new product to catalog
export function addProduct(newProduct) {
  const products = getProducts();
  const id = newProduct.id || `prod_${Date.now()}`;
  const priceNum = parsePriceNum(newProduct.price || newProduct.priceNum);
  const formattedPrice = formatPrice(newProduct.price || priceNum);
  
  let features = [];
  if (Array.isArray(newProduct.features)) {
    features = newProduct.features;
  } else if (typeof newProduct.features === 'string') {
    features = newProduct.features.split('\n').map(s => s.trim()).filter(Boolean);
  }
  if (features.length === 0) {
    features = [
      '100% Cold-Pressed Pure Formula',
      '25+ Herbal Extract Infusion',
      'Free from Parabens & Mineral Oils',
      'Cash on Delivery Across Pakistan'
    ];
  }

  const productToAdd = {
    ...newProduct,
    id,
    name: (newProduct.name || 'Veelana Herbal Care').trim(),
    subtitle: (newProduct.subtitle || 'Pure Botanical Care').trim(),
    price: formattedPrice,
    priceNum,
    originalPrice: newProduct.originalPrice ? formatPrice(newProduct.originalPrice) : '',
    image: newProduct.image || '/assets/real_250ml_single.webp',
    category: newProduct.category || 'bottles',
    badge: newProduct.badge || '',
    features,
    waMessage: encodeURIComponent(`Hi, I want to order the ${newProduct.name}`),
    popular: !!newProduct.popular,
    inStock: newProduct.inStock !== false,
  };

  const updated = [...products, productToAdd];
  saveProducts(updated);
  return updated;
}

// Update existing product
export function updateProduct(id, updatedFields) {
  const cleanId = typeof id === 'object' && id !== null ? (id.id || '') : id;
  const products = getProducts();
  const updated = products.map((p) => {
    if (p.id === cleanId) {
      const priceNum = updatedFields.price ? parsePriceNum(updatedFields.price) : p.priceNum;
      const formattedPrice = updatedFields.price ? formatPrice(updatedFields.price) : p.price;
      
      let processedFeatures = p.features;
      if (typeof updatedFields.features === 'string') {
        processedFeatures = updatedFields.features.split('\n').map(s => s.trim()).filter(Boolean);
      } else if (Array.isArray(updatedFields.features)) {
        processedFeatures = updatedFields.features;
      }

      return {
        ...p,
        ...updatedFields,
        id: p.id,
        price: formattedPrice,
        priceNum,
        originalPrice: updatedFields.originalPrice ? formatPrice(updatedFields.originalPrice) : (updatedFields.originalPrice === '' ? '' : p.originalPrice),
        image: updatedFields.image || p.image || '/assets/real_250ml_single.webp',
        features: processedFeatures,
        popular: updatedFields.popular !== undefined ? !!updatedFields.popular : p.popular,
        inStock: updatedFields.inStock !== undefined ? !!updatedFields.inStock : p.inStock,
      };
    }
    return p;
  });

  saveProducts(updated);
  return updated;
}

// Delete product
export function deleteProduct(id) {
  const cleanId = typeof id === 'object' && id !== null ? (id.id || '') : String(id || '');
  const products = getProducts();
  const updated = products.filter((p) => String(p.id) !== cleanId);
  saveProducts(updated);
  return updated;
}

// Reset products to default catalog
export function resetToDefaults() {
  saveProducts(DEFAULT_PRODUCTS);
  return DEFAULT_PRODUCTS;
}

// Export JSON backup string
export function exportProductsJSON() {
  const products = getProducts();
  return JSON.stringify(products, null, 2);
}

// Import JSON catalog string
export function importProductsJSON(jsonString) {
  try {
    const parsed = JSON.parse(jsonString);
    if (Array.isArray(parsed) && parsed.length > 0) {
      saveProducts(parsed);
      return true;
    }
  } catch (e) {
    console.error('Invalid JSON for product import', e);
  }
  return false;
}
