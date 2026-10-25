// Customer Inquiries and Contact Messages Service for Veelana
const INQUIRIES_STORAGE_KEY = 'veelana_customer_inquiries_v1';

const DEFAULT_INQUIRIES = [
  {
    id: 'inq_101',
    name: 'Hamza Sheikh',
    phone: '03001234567',
    topic: 'Hair Fall Consultation',
    message: 'Salam, mujhe severe hair fall hai past 2 months se. Kya 200ml bottle sufficient hogi ya 2 bottles chahiye hongi?',
    createdAt: '2026-10-14T10:15:00Z',
    status: 'pending' // 'pending', 'resolved'
  },
  {
    id: 'inq_102',
    name: 'Maryam Tariq',
    phone: '03219876543',
    topic: 'Delivery Status & Tracking',
    message: 'Mera order Karachi kab tak deliver hoga? TCS ya Leopard courier se dispatch kiya hai?',
    createdAt: '2026-10-15T07:30:00Z',
    status: 'resolved'
  }
];

export function getInquiries() {
  try {
    const raw = localStorage.getItem(INQUIRIES_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error('Error reading inquiries', e);
  }
  try {
    localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(DEFAULT_INQUIRIES));
  } catch (e) {}
  return DEFAULT_INQUIRIES;
}

export function saveInquiry(inquiryData) {
  try {
    const current = getInquiries();
    const newInquiry = {
      ...inquiryData,
      id: `inq_${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'pending'
    };
    const updated = [newInquiry, ...current];
    localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(updated));
    try {
      window.dispatchEvent(new CustomEvent('veelana_inquiries_updated', { detail: updated }));
    } catch (e) {}
    return newInquiry;
  } catch (e) {
    console.error('Error saving inquiry', e);
    return null;
  }
}

export function updateInquiryStatus(id, newStatus) {
  try {
    const current = getInquiries();
    const updated = current.map(item => item.id === id ? { ...item, status: newStatus } : item);
    localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(updated));
    try {
      window.dispatchEvent(new CustomEvent('veelana_inquiries_updated', { detail: updated }));
    } catch (e) {}
    return updated;
  } catch (e) {
    console.error('Error updating inquiry status', e);
    return getInquiries();
  }
}

export function deleteInquiry(id) {
  try {
    const current = getInquiries();
    const updated = current.filter(item => item.id !== id);
    localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(updated));
    try {
      window.dispatchEvent(new CustomEvent('veelana_inquiries_updated', { detail: updated }));
    } catch (e) {}
    return updated;
  } catch (e) {
    console.error('Error deleting inquiry', e);
    return getInquiries();
  }
}
