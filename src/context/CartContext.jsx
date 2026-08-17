import React, { createContext, useContext, useState, useEffect } from 'react';

const CART_STORAGE_KEY = 'veelana_cart_items_v2';
const CartContext = createContext();

export const FREE_SHIPPING_THRESHOLD = 3000;
export const STANDARD_SHIPPING_FEE = 199;

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to load cart from localStorage', e);
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [coupon, setCoupon] = useState(null); // { code: 'VEELANA10', discountPercent: 10 }

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      } else {
        const priceNum = typeof product.price === 'number' 
          ? product.price 
          : parseInt(String(product.price).replace(/[^0-9]/g, ''), 10) || 999;

        const newItem = {
          id: product.id,
          name: product.name,
          subtitle: product.subtitle || '',
          price: priceNum,
          priceStr: `Rs. ${priceNum.toLocaleString()}`,
          originalPrice: product.originalPrice || '',
          image: product.image || '/assets/real_100ml_double.webp',
          quantity: Math.max(1, quantity),
        };
        return [...prevItems, newItem];
      }
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id, newQty) => {
    if (newQty <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
    );
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
    setCoupon(null);
  };

  const applyCoupon = (code) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'VEELANA10' || cleanCode === 'SAVE10') {
      setCoupon({ code: cleanCode, discountPercent: 10, description: '10% Launch Discount' });
      return { success: true, message: '10% Discount Applied!' };
    }
    if (cleanCode === 'VIP150' || cleanCode === 'VEELANA150') {
      setCoupon({ code: cleanCode, discountFixed: 150, description: 'VIP Rs. 150 Off' });
      return { success: true, message: 'Rs. 150 Discount Applied!' };
    }
    return { success: false, message: 'Invalid promo code. Try SAVE10' };
  };

  const removeCoupon = () => {
    setCoupon(null);
  };

  // Calculations
  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  
  let discountAmount = 0;
  if (coupon) {
    if (coupon.discountPercent) {
      discountAmount = Math.round((subtotal * coupon.discountPercent) / 100);
    } else if (coupon.discountFixed) {
      discountAmount = Math.min(coupon.discountFixed, subtotal);
    }
  }

  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingFee = cartItems.length === 0 ? 0 : (isFreeShipping ? 0 : STANDARD_SHIPPING_FEE);
  const finalTotal = Math.max(0, subtotal - discountAmount + shippingFee);
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShippingProgress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        coupon,
        applyCoupon,
        removeCoupon,
        totalItemsCount,
        subtotal,
        discountAmount,
        shippingFee,
        isFreeShipping,
        finalTotal,
        amountToFreeShipping,
        freeShippingProgress,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
