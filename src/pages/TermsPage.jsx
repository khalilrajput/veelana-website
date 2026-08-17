import React from 'react';
import { Scale } from 'lucide-react';

export default function TermsPage() {
  return (
    <div style={{ minHeight: '80vh', padding: '3.5rem 1.5rem 5rem', background: '#FAF8F5' }}>
      <div className="container" style={{ maxWidth: '820px', margin: '0 auto', background: '#FFFFFF', padding: '2.5rem', borderRadius: '16px', border: '1px solid rgba(79, 93, 56, 0.15)', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: '#4F5D38', marginBottom: '0.5rem' }}>
          <Scale style={{ width: '22px', height: '22px' }} />
          <span style={{ fontSize: '0.85rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Terms & Conditions
          </span>
        </div>

        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', fontWeight: 'bold', color: '#1B2E1E', marginBottom: '1rem' }}>
          Terms of Service — Veelana Herbal Care
        </h1>

        <p style={{ color: '#6A7B52', fontSize: '0.9rem', marginBottom: '2rem' }}>
          Effective: 2026 • Punjab, Pakistan
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', color: '#334024', fontSize: '0.92rem', lineHeight: 1.65 }}>
          <section>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#1B2E1E', marginBottom: '0.5rem' }}>
              1. Ordering & Cash on Delivery (COD) Policy
            </h2>
            <p>
              By placing an order on Veelana.online, you agree to receive the order at your designated delivery address. Since all shipments are dispatched via courier Cash on Delivery (COD) across Pakistan, we request customers to ensure an active contact number is provided for rider coordination.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#1B2E1E', marginBottom: '0.5rem' }}>
              2. 7-Day Quality & Damage Guarantee
            </h2>
            <p>
              If your parcel arrives broken, leaked, or damaged during transit, notify us within 7 days on WhatsApp (+92 306 1041609) with a photo of the parcel. We will dispatch a 100% free replacement bottle immediately with zero questions asked.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#1B2E1E', marginBottom: '0.5rem' }}>
              3. Herbal Usage & Patch Testing
            </h2>
            <p>
              Veelana is a 100% organic, cold-pressed botanical infusion consisting of 25+ herbs (including Amla, Bhringraj, Shikakai, Rosemary, and Mustard seed extracts). While free from harmful chemicals, parabens, and mineral oils, individuals with extreme botanical allergies should perform a 24-hour skin patch test before full application.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#1B2E1E', marginBottom: '0.5rem' }}>
              4. Direct Customer Support
            </h2>
            <p>
              For any queries regarding order status, usage routine, or batch formulation, contact our production support directly at <strong>+92 306 1041609</strong>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
