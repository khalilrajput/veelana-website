import React, { useState, useEffect } from 'react';
import { ShoppingBag, CheckCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const RECENT_PURCHASES = [
  { name: 'Ayesha K.', city: 'Lahore, Punjab', product: '200ml Value Pack', time: '3 mins ago' },
  { name: 'Bilal M.', city: 'Islamabad / Rawalpindi', product: 'Veelana Twin Pack (2x 200ml)', time: '8 mins ago' },
  { name: 'Dr. Fatima', city: 'Karachi, Sindh', product: '100ml Starter Bottle', time: '14 mins ago' },
  { name: 'Usman R.', city: 'Multan City', product: 'Family Hair Rescue Bundle', time: '21 mins ago' },
  { name: 'Zainab T.', city: 'Faisalabad', product: '200ml Value Pack', time: '27 mins ago' },
  { name: 'Hamza S.', city: 'Gujranwala, Punjab', product: '200ml Value Pack', time: '34 mins ago' },
  { name: 'Maryam A.', city: 'Peshawar, KPK', product: 'Veelana Twin Pack (2x 200ml)', time: '42 mins ago' },
  { name: 'Sadia N.', city: 'Sialkot', product: '100ml Starter Bottle', time: '55 mins ago' },
];

export default function RecentOrderToast() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (isDismissed) return;

    // Show after initial 4 seconds
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
    }, 4000);

    // Loop interval
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIdx((prev) => (prev + 1) % RECENT_PURCHASES.length);
        setIsVisible(true);
      }, 1000);
    }, 14000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [isDismissed]);

  if (isDismissed) return null;
  const current = RECENT_PURCHASES[currentIdx];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.35 }}
          style={{
            position: 'fixed',
            bottom: '80px',
            left: '20px',
            zIndex: 999,
            background: '#FFFFFF',
            borderRadius: '14px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
            border: '1px solid rgba(79, 93, 56, 0.18)',
            padding: '0.75rem 1rem',
            maxWidth: '320px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}
        >
          {/* Green Indicator Avatar */}
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: '#EAEFE4',
              color: '#3A4828',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <ShoppingBag style={{ width: '20px', height: '20px' }} />
          </div>

          {/* Details */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 'bold', color: '#1B2E1E' }}>
                {current.name}
              </span>
              <span style={{ fontSize: '0.72rem', color: '#73836E' }}>
                ({current.city})
              </span>
            </div>
            <div style={{ fontSize: '0.75rem', color: '#4F5D38', fontWeight: '600', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              Ordered: {current.product}
            </div>
            <span style={{ fontSize: '0.68rem', color: '#8A9984', display: 'flex', alignItems: 'center', gap: '3px', marginTop: '1px' }}>
              <CheckCircle style={{ width: '11px', height: '11px', color: '#2D6A4F' }} /> Verified Purchase • {current.time}
            </span>
          </div>

          {/* Close */}
          <button
            onClick={() => setIsDismissed(true)}
            aria-label="Dismiss Notification"
            style={{
              background: 'none',
              border: 'none',
              color: '#A0A09A',
              cursor: 'pointer',
              padding: '2px',
              alignSelf: 'flex-start',
            }}
          >
            <X style={{ width: '14px', height: '14px' }} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
