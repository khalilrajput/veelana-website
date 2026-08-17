import React, { useState } from 'react';
import { HelpCircle, ChevronDown, MessageCircle, ShieldCheck, Search, Sparkles, Truck, Check, Droplet, Clock } from 'lucide-react';
import { getWhatsAppUrl } from '../utils/whatsapp';

export default function FaqPage({ onOpenOrder }) {
  const [openIndex, setOpenIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const faqCategories = [
    { id: 'all', name: 'All FAQs' },
    { id: 'usage', name: 'Usage & Routine' },
    { id: 'formula', name: 'Formula & Safety' },
    { id: 'shipping', name: 'Shipping & Delivery' },
    { id: 'orders', name: 'Payment & Orders' },
  ];

  const faqs = [
    {
      category: 'usage',
      q: 'How quickly can I expect to see results with Veelana Hair Oil?',
      a: 'Most users notice a visible reduction in hair fall on their comb and pillow within 7 to 14 days of consistent application (3 times a week). For new hair growth along thin hairlines and crown density, best results appear around 4 to 6 weeks as dormant follicles awaken.'
    },
    {
      category: 'usage',
      q: 'How should I apply the oil for maximum follicle absorption?',
      a: 'Warm 10-15ml of Veelana oil between your palms and massage gently into your scalp using your fingertips for 5 minutes in upward circular motions. Leave overnight or for at least 2 hours before washing with a mild, sulphate-free shampoo.'
    },
    {
      category: 'usage',
      q: 'Can men use Veelana for beard growth and receding hairlines?',
      a: 'Yes! Veelana’s cold-pressed Amla, Bhringraj, and Rosemary infusion works equally well for men dealing with crown thinning, beard patchiness, or hairline recession. It delivers active nutrients straight to the dermal papilla cells.'
    },
    {
      category: 'formula',
      q: 'Is Veelana Hair Oil safe for colored or chemically treated hair?',
      a: 'Yes, 100%! Veelana contains zero harsh mineral oils, synthetic dyes, parabens, or sulphates. Its cold-pressed botanical lipids lock in natural moisture without stripping hair dye or keratin treatments.'
    },
    {
      category: 'formula',
      q: 'Does it leave a greasy or heavy residue after washing?',
      a: 'No. Because Veelana is made exclusively with lightweight, unrefined cold-pressed botanical oils (and 0% heavy liquid paraffin), it washes out effortlessly with standard shampoo leaving your hair light, voluminous, and soft.'
    },
    {
      category: 'formula',
      q: 'Is Veelana safe during pregnancy or breastfeeding?',
      a: 'Veelana is a 100% natural, plant-based topical formulation free from chemicals. However, if you have specific botanical sensitivities, we recommend consulting your physician and performing a simple 24-hour patch test on your inner arm.'
    },
    {
      category: 'shipping',
      q: 'How long does nationwide delivery take across Pakistan?',
      a: 'Orders placed before 2:00 PM are dispatched on the same working day. Delivery typically takes 2 to 3 business days across major cities in Pakistan (Lahore, Karachi, Islamabad, Rawalpindi, Multan, Faisalabad, Peshawar, Quetta, etc.).'
    },
    {
      category: 'shipping',
      q: 'Are shipping charges included or free?',
      a: 'We offer FREE Delivery across Pakistan on all orders above Rs. 3,000 (such as the Veelana Twin Pack 2x 200ml). For smaller orders, a standard courier delivery fee of Rs. 199 applies.'
    },
    {
      category: 'orders',
      q: 'What payment options are supported?',
      a: 'We provide Cash on Delivery (COD) across Pakistan so you can pay cash directly to the courier rider upon parcel arrival. We also support advance mobile transfers via JazzCash, EasyPaisa, and Online Bank Transfers.'
    },
    {
      category: 'orders',
      q: 'What is your 7-Day Return & Replacement Policy?',
      a: 'If your bottle arrives broken, leaked, or damaged in transit, simply send us a photo of the parcel on WhatsApp (+92 306 1041609) within 7 days. We will immediately dispatch a fresh replacement bottle with zero shipping fee.'
    },
    {
      category: 'orders',
      q: 'What is the difference between 100ml and 200ml bottles?',
      a: 'The 100ml Bottle (Rs. 999) is ideal for a 3-4 week starter trial or travel. The 200ml Bottle (Rs. 1,899) is our most popular Value Pack, providing 2-3 months of routine scalp nourishment. The Twin Pack (2x 200ml for Rs. 3,499) gives maximum savings plus Free Delivery.'
    }
  ];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = 
      faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.a.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{ minHeight: '85vh', padding: '3.5rem 1rem 6rem', background: '#FAF8F5' }}>
      <div className="container" style={{ maxWidth: '880px', margin: '0 auto' }}>
        
        {/* Page Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div className="section-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#EAEFE4', color: '#3A4828', padding: '6px 16px', borderRadius: '999px', fontSize: '0.82rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.75rem' }}>
            <HelpCircle style={{ width: '15px', height: '15px', color: '#4F5D38' }} />
            <span>Customer Knowledge Base</span>
          </div>

          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.8rem', fontWeight: 'bold', color: '#1B2E1E', margin: '0 0 0.75rem', lineHeight: 1.2 }}>
            Frequently Asked Questions
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#5F7057', maxWidth: '560px', margin: '0 auto', lineHeight: 1.5 }}>
            Clear, honest answers about our cold-pressed formula, hair routine, delivery timelines, and returns.
          </p>

          {/* FAQ Search Bar */}
          <div style={{ maxWidth: '520px', margin: '1.75rem auto 0', position: 'relative' }}>
            <Search style={{ position: 'absolute', left: '16px', top: '14px', width: '18px', height: '18px', color: '#73836E' }} />
            <input
              type="text"
              placeholder="Search questions (e.g. results, delivery, dandruff, ingredients)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem 0.75rem 2.75rem',
                fontSize: '0.9rem',
                borderRadius: '12px',
                border: '1px solid #D6D0C2',
                background: '#FFFFFF',
                outline: 'none',
                boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
              }}
            />
          </div>

          {/* Category Filter Pills */}
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1.5rem' }}>
            {faqCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  padding: '0.5rem 1.15rem',
                  borderRadius: '999px',
                  fontSize: '0.82rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  border: selectedCategory === cat.id ? '1px solid #1B2E1E' : '1px solid #D1CAC0',
                  background: selectedCategory === cat.id ? '#1B2E1E' : '#FFFFFF',
                  color: selectedCategory === cat.id ? '#FAF8F5' : '#334024',
                  transition: 'all 0.2s',
                }}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '3rem' }}>
          {filteredFaqs.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E5E1D8' }}>
              <HelpCircle style={{ width: '36px', height: '36px', color: '#8A9A86', margin: '0 auto 0.75rem' }} />
              <h3 style={{ fontSize: '1.15rem', fontWeight: 'bold', color: '#1B2E1E', margin: '0 0 0.35rem' }}>
                No matching questions found
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#6A7B52', margin: '0 0 1rem' }}>
                Try another search term or ask our support team directly on WhatsApp.
              </p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                style={{ background: '#4F5D38', color: '#FAF8F5', border: 'none', padding: '0.5rem 1.25rem', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.82rem' }}
              >
                View All FAQs
              </button>
            </div>
          ) : (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  style={{
                    background: '#FFFFFF',
                    borderRadius: '16px',
                    border: isOpen ? '1px solid rgba(79, 93, 56, 0.35)' : '1px solid rgba(79, 93, 56, 0.12)',
                    boxShadow: isOpen ? '0 6px 20px rgba(0,0,0,0.04)' : '0 2px 6px rgba(0,0,0,0.02)',
                    overflow: 'hidden',
                    transition: 'all 0.2s',
                  }}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                    style={{
                      width: '100%',
                      padding: '1.25rem 1.5rem',
                      textAlign: 'left',
                      background: 'none',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '1rem',
                      cursor: 'pointer',
                    }}
                  >
                    <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 'bold', color: '#1B2E1E', lineHeight: 1.3 }}>
                      {faq.q}
                    </span>
                    <div
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        background: isOpen ? '#1B2E1E' : '#EAEFE4',
                        color: isOpen ? '#FFFFFF' : '#3A4828',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.25s',
                      }}
                    >
                      <ChevronDown style={{ width: '16px', height: '16px' }} />
                    </div>
                  </button>

                  {isOpen && (
                    <div
                      style={{
                        padding: '0 1.5rem 1.25rem',
                        fontSize: '0.92rem',
                        color: '#4F5E52',
                        lineHeight: 1.6,
                        borderTop: '1px solid #F2EFE8',
                        paddingTop: '1rem',
                      }}
                    >
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* WhatsApp Consultation Banner */}
        <div
          style={{
            background: 'linear-gradient(135deg, #1B2E1E 0%, #2A3E2E 100%)',
            color: '#FFFFFF',
            borderRadius: '24px',
            padding: '2.5rem 2rem',
            textAlign: 'center',
            boxShadow: '0 12px 35px rgba(27, 46, 30, 0.15)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.12)',
              color: '#D4AF37',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem',
            }}
          >
            <ShieldCheck style={{ width: '28px', height: '28px' }} />
          </div>

          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.85rem', fontWeight: 'bold', color: '#FFFFFF', margin: '0 0 0.5rem' }}>
            Still Have Questions About Your Hair Type?
          </h3>
          <p style={{ fontSize: '0.95rem', color: '#D4DDD2', maxWidth: '520px', margin: '0 auto 1.75rem', lineHeight: 1.5 }}>
            Our botanical hair care specialists are available on WhatsApp for 1-on-1 personalized guidance.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <a
              href={getWhatsAppUrl('Hi Veelana Team, I have a specific question about my hair type and ingredients.')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-olive"
              style={{
                background: '#25D366',
                borderColor: '#25D366',
                color: '#FFFFFF',
                padding: '0.85rem 1.75rem',
                fontSize: '0.92rem',
                fontWeight: 'bold',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                borderRadius: '12px',
                boxShadow: '0 4px 15px rgba(37, 211, 102, 0.3)',
              }}
            >
              <MessageCircle style={{ width: '18px', height: '18px' }} />
              <span>Ask on WhatsApp (+92 306 1041609)</span>
            </a>

            <button
              onClick={() => onOpenOrder ? onOpenOrder('200ml') : null}
              style={{
                background: '#D4AF37',
                color: '#121E14',
                border: 'none',
                padding: '0.85rem 1.75rem',
                fontSize: '0.92rem',
                fontWeight: 'bold',
                borderRadius: '12px',
                cursor: 'pointer',
              }}
            >
              Order Now — Rs. 1,899
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
