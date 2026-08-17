const ORDERS_STORAGE_KEY = 'veelana_customer_orders_v1';

// Save new order to local storage
export function createOrder(orderData) {
  try {
    const existing = getOrders();
    const orderId = orderData.id || `VLN-${Math.floor(10000 + Math.random() * 90000)}`;
    const timestamp = new Date().toISOString();
    
    const newOrder = {
      id: orderId,
      createdAt: timestamp,
      status: 'Pending', // Pending, Confirmed, Shipped, Delivered, Cancelled
      trackingNumber: `TRX-${Math.floor(100000 + Math.random() * 900000)}PK`,
      courierPartner: 'Trax / Leopard Logistics Express',
      ...orderData
    };

    const updatedOrders = [newOrder, ...existing];
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updatedOrders));
    
    // Dispatch custom event for real-time updates across the app
    window.dispatchEvent(new Event('veelana_orders_updated'));
    return newOrder;
  } catch (e) {
    console.error('Failed to save order to localStorage', e);
    return null;
  }
}

// Get all orders from localStorage
export function getOrders() {
  try {
    const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    console.error('Failed to read orders from localStorage', e);
  }
  return [];
}

// Find single order by ID or Phone
export function findOrder(query) {
  if (!query) return null;
  const clean = query.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
  const orders = getOrders();
  
  return orders.find(order => {
    const matchId = (order.id || '').toLowerCase().replace(/[^a-z0-9]/g, '').includes(clean);
    const matchPhone = (order.phone || '').replace(/[^0-9]/g, '').includes(clean);
    return matchId || matchPhone;
  }) || null;
}

// Update order status
export function updateOrderStatus(orderId, newStatus, trackingNotes = '') {
  try {
    const orders = getOrders();
    const updated = orders.map(order => 
      order.id === orderId 
        ? { 
            ...order, 
            status: newStatus, 
            updatedAt: new Date().toISOString(),
            trackingNotes: trackingNotes || order.trackingNotes 
          } 
        : order
    );
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('veelana_orders_updated'));
    return updated;
  } catch (e) {
    console.error('Failed to update order status', e);
    return [];
  }
}

// Clear all orders
export function clearOrders() {
  try {
    localStorage.removeItem(ORDERS_STORAGE_KEY);
    window.dispatchEvent(new Event('veelana_orders_updated'));
    return [];
  } catch (e) {
    console.error('Failed to clear orders', e);
    return [];
  }
}

// Format WhatsApp Order Message (Supports Single Product & Multi-Item Cart)
export function formatWhatsAppOrderMessage(order) {
  let itemsBreakdown = '';
  
  if (order.items && Array.isArray(order.items) && order.items.length > 0) {
    itemsBreakdown = order.items
      .map((item, idx) => `   ${idx + 1}. ${item.name} (${item.subtitle || ''}) x ${item.quantity} = Rs. ${(item.price * item.quantity).toLocaleString()}`)
      .join('\n');
  } else {
    itemsBreakdown = `   1. ${order.productName || 'Veelana Hair Oil'} (${order.bottleSize || '200ml'}) x ${order.quantity || 1} = ${order.totalPrice || 'Rs. 1,899'}`;
  }

  const text = `📦 *NEW VEELANA ORDER #${order.id}*
--------------------------------
👤 *Customer Name:* ${order.fullName}
📞 *Phone / WhatsApp:* ${order.phone}
📍 *Delivery Address:* ${order.address}
🏙️ *City:* ${order.city}

🛒 *ORDER ITEMS:*
${itemsBreakdown}

${order.couponCode ? `🏷️ *Coupon Applied:* ${order.couponCode} (-Rs. ${order.discountAmount || 0})\n` : ''}💰 *Total Payable:* ${order.totalPrice || `Rs. ${order.totalAmount}`}
💳 *Payment Method:* ${order.paymentMethod} (Cash on Delivery)
${order.notes ? `📝 *Special Instructions:* ${order.notes}\n` : ''}--------------------------------
*Tracking Ref:* ${order.trackingNumber || 'Pending Assignment'}
Please confirm my order for express packing & nationwide courier dispatch!`;

  return `https://wa.me/923061041609?text=${encodeURIComponent(text)}`;
}

// Format Email Mailto Body Backup
export function formatEmailOrderMailto(order) {
  const subject = `New Veelana Order #${order.id} - ${order.fullName}`;
  const body = `New Order Placed on Veelana.online

Order ID: #${order.id}
Date: ${new Date(order.createdAt).toLocaleString()}
Customer Name: ${order.fullName}
Phone: ${order.phone}
City: ${order.city}
Address: ${order.address}

Items:
${order.items ? order.items.map(i => `- ${i.name} x ${i.quantity} (Rs. ${i.price * i.quantity})`).join('\n') : `${order.productName} (${order.bottleSize}) x ${order.quantity}`}

Total Amount: ${order.totalPrice || order.totalAmount}
Payment Method: ${order.paymentMethod}
Notes: ${order.notes || 'None'}
`;

  return `mailto:veelanaofficial@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
