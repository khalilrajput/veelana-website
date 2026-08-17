import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div style={{ minHeight: '80vh', padding: '3.5rem 1.5rem 5rem', background: '#FAF8F5' }}>
      <div className="container" style={{ maxWidth: '820px', margin: '0 auto', background: '#FFFFFF', padding: '2.5rem', borderRadius: '16px', border: '1px solid rgba(79, 93, 56, 0.15)', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: '#4F5D38', marginBottom: '0.5rem' }}>
          <ShieldCheck style={{ width: '22px', height: '22px' }} />
          <span style={{ fontSize: '0.85rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Legal & Compliance
          </span>
        </div>

        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', fontWeight: 'bold', color: '#1B2E1E', marginBottom: '1rem' }}>
          Privacy Policy — Veelana Herbal Care
        </h1>

        <p style={{ color: '#6A7B52', fontSize: '0.9rem', marginBottom: '2rem' }}>
          Last Updated: 2026 • Punjab, Pakistan
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', color: '#334024', fontSize: '0.92rem', lineHeight: 1.65 }}>
          <section>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#1B2E1E', marginBottom: '0.5rem' }}>
              1. Information We Collect
            </h2>
            <p>
              When you place an order on <strong>veelana.online</strong> or contact us via WhatsApp, we collect only the necessary information to process and deliver your shipment:
            </p>
            <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
              <li>Full Name</li>
              <li>Active WhatsApp / Mobile Phone Number</li>
              <li>Delivery Address, House/Street details, City, and Postal information</li>
              <li>Order item history and delivery preferences</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#1B2E1E', marginBottom: '0.5rem' }}>
              2. How We Use Your Information
            </h2>
            <p>
              Your contact details are strictly used to:
            </p>
            <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
              <li>Dispatch and fulfill your Cash on Delivery (COD) order through courier partners (Trax, Leopard, TCS).</li>
              <li>Send WhatsApp delivery tracking and confirmation updates.</li>
              <li>Provide personalized herbal hair routine consultations upon customer request.</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#1B2E1E', marginBottom: '0.5rem' }}>
              3. Data Security & Third-Party Sharing
            </h2>
            <p>
              We do <strong>not</strong> sell, rent, or trade your personal information to any third parties for advertising or unsolicited marketing. Your data is only shared with our logistics courier network strictly for the purpose of doorstep delivery.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#1B2E1E', marginBottom: '0.5rem' }}>
              4. Contact Our Privacy Officer
            </h2>
            <p>
              If you wish to update, modify, or delete your customer record from our dispatch system, please reach out to us:
            </p>
            <p style={{ marginTop: '0.5rem' }}>
              <strong>Official WhatsApp:</strong> +92 306 1041609<br />
              <strong>Email:</strong> veelanaofficial@gmail.com<br />
              <strong>Region:</strong> Punjab, Pakistan
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
