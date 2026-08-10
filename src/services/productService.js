const STORAGE_KEY = 'veelana_products_cms_v1';

export const DEFAULT_PRODUCTS = [
  {
    id: '100ml',
    name: 'Veelana 100ml Bottle',
    subtitle: 'Handy / Trial Size',
    badge: 'Ideal Daily Nourishment',
    price: 'Rs. 1,490',
    originalPrice: 'Rs. 1,850',
    image: '/assets/real_100ml_double.jpg',
    features: [
      '100ml Cold-Pressed Herbal Oil',
      'Handy & Travel-Friendly Bottle',
      'Ideal for 3-4 Weeks Daily Nourishment',
      '25+ Herbal Extract Infusion',
      'Paraben, Sulphate & Mineral Oil Free',
      'Free Direct WhatsApp Support'
    ],
    waMessage: 'Hi,%20I%20want%20to%20order%20the%20Veelana%20100ml%20bottle',
    popular: false,
    inStock: true,
  },
  {
    id: '250ml',
    name: 'Veelana 250ml Bottle',
    subtitle: 'Value Pack',
    badge: 'Best Value for Long-Term Growth Routine',
    price: 'Rs. 2,790',
    originalPrice: 'Rs. 3,450',
    image: '/assets/real_250ml_single.jpg',
    features: [
      '250ml Extra Volume Bottle',
      'Best Value for 2-3 Months Routine',
      'Deep Follicle Restoration Cycle',
      '25+ Herbal Extract Infusion',
      'Paraben, Sulphate & Mineral Oil Free',
      'Priority Dispatch & WhatsApp Support'
    ],
    waMessage: 'Hi,%20I%20want%20to%20order%20the%20Veelana%20250ml%20bottle',
    popular: true,
    inStock: true,
  }
];

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
    window.dispatchEvent(new Event('veelana_products_updated'));
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
  const productToAdd = {
    ...newProduct,
    id,
    features: Array.isArray(newProduct.features) 
      ? newProduct.features 
      : (newProduct.features || '').split('\n').filter(Boolean),
    waMessage: encodeURIComponent(`Hi, I want to order the ${newProduct.name}`),
    inStock: newProduct.inStock !== false,
  };
  const updated = [...products, productToAdd];
  saveProducts(updated);
  return updated;
}

// Update existing product
export function updateProduct(id, updatedFields) {
  const products = getProducts();
  const updated = products.map((p) => {
    if (p.id === id) {
      const processedFeatures = typeof updatedFields.features === 'string'
        ? updatedFields.features.split('\n').filter(Boolean)
        : (updatedFields.features || p.features);
      return { ...p, ...updatedFields, features: processedFeatures };
    }
    return p;
  });
  saveProducts(updated);
  return updated;
}

// Delete product
export function deleteProduct(id) {
  const products = getProducts();
  const updated = products.filter((p) => p.id !== id);
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
    if (Array.isArray(parsed)) {
      saveProducts(parsed);
      return true;
    }
  } catch (e) {
    console.error('Invalid JSON for product import', e);
  }
  return false;
}
