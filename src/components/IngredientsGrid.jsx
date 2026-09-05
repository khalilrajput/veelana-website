import React, { useState, useMemo, useRef } from 'react';
import { Leaf, Sparkles, X, Search, ChevronLeft, ChevronRight, Maximize2, ShoppingBag, LayoutGrid, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const INGREDIENTS_DATA = [
  {
    id: 1,
    name: 'Indian Gooseberry (Amla)',
    category: 'Fruits & Berries',
    image: '/assets/ingredients/amla_gooseberry.webp',
    keyBenefit: 'Strengthens hair roots & prevents premature greying'
  },
  {
    id: 2,
    name: 'Brahmi',
    category: 'Herbal Leaves',
    image: '/assets/ingredients/brahmi.webp',
    keyBenefit: 'Calms scalp & reduces hair thinning'
  },
  {
    id: 3,
    name: 'Rosemary',
    category: 'Herbal Leaves',
    image: '/assets/ingredients/rosemary.webp',
    keyBenefit: 'Stimulates follicles & boosts natural volume'
  },
  {
    id: 4,
    name: 'Shikakai',
    category: 'Roots & Pods',
    image: '/assets/ingredients/shikakai.webp',
    keyBenefit: 'Cleanses scalp naturally while preserving moisture'
  },
  {
    id: 5,
    name: 'Nigella Seeds (Kalonji)',
    category: 'Seeds & Kernels',
    image: '/assets/ingredients/kalonji_nigella.webp',
    keyBenefit: 'Reduces hair fall & anchors weak roots'
  },
  {
    id: 6,
    name: 'Fenugreek Seeds (Methi)',
    category: 'Seeds & Kernels',
    image: '/assets/ingredients/fenugreek_seeds.webp',
    keyBenefit: 'Nourishes scalp & combats severe hair fall'
  },
  {
    id: 7,
    name: 'Neem Oil',
    category: 'Cold-Pressed Oils',
    image: '/assets/ingredients/neem_oil.webp',
    keyBenefit: 'Soothes scalp & reduces dandruff naturally'
  },
  {
    id: 8,
    name: 'Neem Leaves',
    category: 'Herbal Leaves',
    image: '/assets/ingredients/neem_leaves.webp',
    keyBenefit: 'Purifies scalp & supports cleaner follicle health'
  },
  {
    id: 9,
    name: 'Curry Leaves',
    category: 'Herbal Leaves',
    image: '/assets/ingredients/curry_leaves.webp',
    keyBenefit: 'Strengthens roots & stimulates healthy hair growth'
  },
  {
    id: 10,
    name: 'Hibiscus Flowers',
    category: 'Floral & Extracts',
    image: '/assets/ingredients/hibiscus_flowers.webp',
    keyBenefit: 'Makes hair thicker, softer & naturally shinier'
  },
  {
    id: 11,
    name: 'Rose Petals',
    category: 'Floral & Extracts',
    image: '/assets/ingredients/rose_petals.webp',
    keyBenefit: 'Nourishes & soothes dry, irritated scalp'
  },
  {
    id: 12,
    name: 'Mustard Oil',
    category: 'Cold-Pressed Oils',
    image: '/assets/ingredients/mustard_oil.webp',
    keyBenefit: 'Stimulates scalp & supports natural hair growth'
  },
  {
    id: 13,
    name: 'Castor Oil',
    category: 'Cold-Pressed Oils',
    image: '/assets/ingredients/castor_oil.webp',
    keyBenefit: 'Promotes thicker, fuller-looking hairline edges'
  },
  {
    id: 14,
    name: 'Coconut Oil',
    category: 'Cold-Pressed Oils',
    image: '/assets/ingredients/coconut_oil.webp',
    keyBenefit: 'Deeply moisturizes scalp & prevents protein loss'
  },
  {
    id: 15,
    name: 'Sesame Oil',
    category: 'Cold-Pressed Oils',
    image: '/assets/ingredients/sesame_oil.webp',
    keyBenefit: 'Deeply nourishes roots with essential fatty acids'
  },
  {
    id: 16,
    name: 'Coriander Oil',
    category: 'Cold-Pressed Oils',
    image: '/assets/ingredients/coriander_oil.webp',
    keyBenefit: 'Nourishes scalp for softer, smoother strands'
  },
  {
    id: 17,
    name: 'Pomegranate Peels',
    category: 'Fruits & Berries',
    image: '/assets/ingredients/pomegranate_peels.webp',
    keyBenefit: 'Antioxidant defense that shields against environmental stress'
  },
  {
    id: 18,
    name: 'Spikenard (Jatamansi)',
    category: 'Roots & Pods',
    image: '/assets/ingredients/spikenard.webp',
    keyBenefit: 'Soothes scalp & supports healthy hair growth cycle'
  },
  {
    id: 19,
    name: 'Soap Nuts (Reetha)',
    category: 'Roots & Pods',
    image: '/assets/ingredients/soap_nuts.webp',
    keyBenefit: 'Gently cleanses scalp & removes natural buildup'
  },
  {
    id: 20,
    name: 'Henna Leaves',
    category: 'Herbal Leaves',
    image: '/assets/ingredients/henna_leaves.webp',
    keyBenefit: 'Conditions hair naturally & strengthens every strand'
  },
  {
    id: 21,
    name: 'Bay Leaves',
    category: 'Herbal Leaves',
    image: '/assets/ingredients/bay_leaves.webp',
    keyBenefit: 'Strengthens hair roots & prevents brittle breakage'
  },
  {
    id: 22,
    name: 'Thyme',
    category: 'Herbal Leaves',
    image: '/assets/ingredients/thyme.webp',
    keyBenefit: 'Maintains healthy scalp freshness & follicle vigour'
  },
  {
    id: 23,
    name: 'Vitamin E',
    category: 'Floral & Extracts',
    image: '/assets/ingredients/vitamin_e.webp',
    keyBenefit: 'Nourishes scalp & repairs dry, damaged cuticles'
  },
  {
    id: 24,
    name: 'Alkanet Roots (Ratanjot)',
    category: 'Roots & Pods',
    image: '/assets/ingredients/alkanet_roots.webp',
    keyBenefit: 'Strengthens strands & helps prevent premature greying'
  },
  {
    id: 25,
    name: 'Poppy Seeds (Khashkhaas)',
    category: 'Seeds & Kernels',
    image: '/assets/ingredients/poppy_seeds.webp',
    keyBenefit: 'Promotes healthy growth & adds softness and shine'
  },
  {
    id: 26,
    name: 'Onion Peels',
    category: 'Roots & Pods',
    image: '/assets/ingredients/onion_peels.webp',
    keyBenefit: 'Rich in organic sulfur to stimulate active follicles'
  }
];

const CATEGORIES = [
  'All 26 Herbs',
  'Cold-Pressed Oils',
  'Herbal Leaves',
  'Seeds & Kernels',
  'Roots & Pods',
  'Floral & Extracts',
  'Fruits & Berries'
];

export default function IngredientsGrid({ onOpenOrder }) {
  const [activeCategory, setActiveCategory] = useState('All 26 Herbs');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [viewMode, setViewMode] = useState('carousel'); // 'carousel' or 'grid'
  const sliderRef = useRef(null);

  const filteredIngredients = useMemo(() => {
    return INGREDIENTS_DATA.filter(item => {
      const matchesCat = activeCategory === 'All 26 Herbs' || item.category === activeCategory;
      const matchesSearch = !searchQuery.trim() ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.keyBenefit.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const scrollSlider = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleNext = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev + 1) % filteredIngredients.length);
  };

  const handlePrev = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev - 1 + filteredIngredients.length) % filteredIngredients.length);
  };

  return (
    <section id="ingredients" className="ingredients-section" style={{ overflow: 'hidden' }}>
      <div className="container" style={{ maxWidth: '1360px', margin: '0 auto', padding: '0 1.25rem' }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#EAEFE4', border: '1px solid rgba(79, 93, 56, 0.2)', padding: '5px 18px', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 'bold', color: '#1B2E1E', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 'var(--space-default)' }}>
            <Leaf style={{ width: '15px', height: '15px', color: '#D4AF37' }} />
            26 Complete Cold-Pressed Botanicals
          </div>
          
          <h2 className="section-title">
            The 26 Pure Herbs of Veelana
          </h2>
          
          <p className="section-subtitle">
            Every bottle is infused with all 26 raw botanical leaves, cold-pressed oils, organic seeds, and Ayurvedic roots. Swipe or click to inspect any herb.
          </p>
        </div>

        {/* COMPACT LUXURY SPOTLIGHT BANNER */}
        <div
          style={{
            background: 'linear-gradient(135deg, #1B2E1E 0%, #122115 100%)',
            borderRadius: '20px',
            padding: '1.75rem 2rem',
            marginBottom: '2.5rem',
            border: '1.5px solid rgba(212, 175, 55, 0.35)',
            boxShadow: '0 15px 40px rgba(27, 46, 30, 0.18)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem',
          }}
        >
          <div style={{ flex: '1 1 320px', maxWidth: '540px' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 'bold', color: '#D4AF37', textTransform: 'uppercase', letterSpacing: '1.5px', display: 'block', marginBottom: '0.25rem' }}>
              ✦ MASTER ARTISAN FORMULA ✦
            </span>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 'bold', color: '#FAF8F5', margin: '0 0 0.4rem' }}>
              26 Raw Herbs Infused Around Pure Oils
            </h3>
            <p style={{ fontSize: '0.86rem', color: '#C8D6C0', margin: 0, lineHeight: 1.5 }}>
              Handcrafted in Punjab with traditional slow cold-pressing. Zero mineral oil, zero silicones, zero artificial perfumes.
            </p>
          </div>

          <div
            onClick={() => setSelectedIndex(0)}
            style={{
              width: '180px',
              height: '110px',
              borderRadius: '14px',
              overflow: 'hidden',
              border: '1.5px solid rgba(212, 175, 55, 0.4)',
              boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
              cursor: 'pointer',
              flexShrink: 0,
              background: '#0B160E',
            }}
            title="Click to view full master formulation poster"
          >
            <img
              src="/assets/ingredients/hero_25_herbs_poster.webp"
              alt="Veelana 26 Herbs Poster"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>

        {/* CONTROLS BAR: CATEGORIES + VIEW TOGGLE + SEARCH */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '0.85rem',
            marginBottom: '1.75rem',
            background: '#FFFFFF',
            padding: '0.85rem 1.25rem',
            borderRadius: '16px',
            border: '1px solid rgba(79, 93, 56, 0.15)',
            boxShadow: '0 3px 15px rgba(0,0,0,0.03)',
          }}
        >
          {/* Category Filter Tabs */}
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            {CATEGORIES.map(cat => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: '0.45rem 0.95rem',
                    borderRadius: '999px',
                    fontSize: '0.78rem',
                    fontWeight: '700',
                    border: isActive ? '1.5px solid #1B2E1E' : '1px solid #E2DED5',
                    background: isActive ? '#1B2E1E' : '#FAF8F5',
                    color: isActive ? '#FAF8F5' : '#3E4D34',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Right Tools: View Toggle & Search */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            {/* View Mode Switcher */}
            <div style={{ display: 'flex', background: '#F4F1EA', padding: '3px', borderRadius: '10px', border: '1px solid #E0DCD3' }}>
              <button
                onClick={() => setViewMode('carousel')}
                style={{
                  padding: '5px 10px',
                  borderRadius: '8px',
                  border: 'none',
                  background: viewMode === 'carousel' ? '#1B2E1E' : 'transparent',
                  color: viewMode === 'carousel' ? '#FAF8F5' : '#5A6B53',
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
                title="Smooth Slider Mode (Easy & Clean)"
              >
                <SlidersHorizontal style={{ width: '13px', height: '13px' }} />
                <span>Slider</span>
              </button>
              <button
                onClick={() => setViewMode('grid')}
                style={{
                  padding: '5px 10px',
                  borderRadius: '8px',
                  border: 'none',
                  background: viewMode === 'grid' ? '#1B2E1E' : 'transparent',
                  color: viewMode === 'grid' ? '#FAF8F5' : '#5A6B53',
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
                title="All Cards Grid Mode"
              >
                <LayoutGrid style={{ width: '13px', height: '13px' }} />
                <span>Grid</span>
              </button>
            </div>

            {/* Quick Search */}
            <div style={{ position: 'relative', width: '220px' }}>
              <Search style={{ position: 'absolute', left: '11px', top: '9px', width: '14px', height: '14px', color: '#73836E' }} />
              <input
                type="text"
                placeholder="Find herb..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.45rem 0.75rem 0.45rem 2.1rem',
                  fontSize: '0.82rem',
                  borderRadius: '999px',
                  border: '1px solid #D6D0C2',
                  background: '#FAF8F5',
                  outline: 'none',
                }}
              />
            </div>
          </div>
        </div>

        {/* CAROUSEL SLIDER VIEW (PREMIUM & ZERO DRAGGING) */}
        {viewMode === 'carousel' ? (
          <div style={{ position: 'relative', width: '100%', maxWidth: '100%', overflow: 'hidden' }}>
            {/* Slider Navigation Arrows */}
            <button
              onClick={() => scrollSlider('left')}
              className="carousel-arrow-btn"
              style={{
                position: 'absolute',
                left: '4px',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 10,
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: '#1B2E1E',
                color: '#FAF8F5',
                border: '1.5px solid rgba(212, 175, 55, 0.6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 6px 20px rgba(0,0,0,0.25)',
              }}
              title="Previous Herbs"
            >
              <ChevronLeft style={{ width: '22px', height: '22px' }} />
            </button>

            <button
              onClick={() => scrollSlider('right')}
              className="carousel-arrow-btn"
              style={{
                position: 'absolute',
                right: '4px',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 10,
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: '#1B2E1E',
                color: '#FAF8F5',
                border: '1.5px solid rgba(212, 175, 55, 0.6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 6px 20px rgba(0,0,0,0.25)',
              }}
              title="Next Herbs"
            >
              <ChevronRight style={{ width: '22px', height: '22px' }} />
            </button>

            {/* Scrollable Track */}
            <div
              ref={sliderRef}
              style={{
                display: 'flex',
                gap: '1.25rem',
                overflowX: 'auto',
                scrollSnapType: 'x mandatory',
                padding: '0.5rem 0.25rem 1.5rem',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                width: '100%',
                maxWidth: '100%',
                minWidth: 0,
                WebkitOverflowScrolling: 'touch',
              }}
            >
              {filteredIngredients.map((item, idx) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedIndex(idx)}
                  style={{
                    flex: '0 0 280px',
                    scrollSnapAlign: 'start',
                    background: '#FFFFFF',
                    borderRadius: '16px',
                    border: '1.5px solid rgba(79, 93, 56, 0.16)',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.04)',
                    transition: 'all 0.25s ease',
                    position: 'relative',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#1B2E1E';
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 12px 30px rgba(27, 46, 30, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(79, 93, 56, 0.16)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.04)';
                  }}
                >
                  {/* Clean Graphic Image Only */}
                  <div style={{ width: '100%', aspectRatio: '4 / 3', background: '#FFFFFF', position: 'relative' }}>
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '0.5rem' }}
                    />
                    {/* Minimal index tag */}
                    <span style={{ position: 'absolute', top: '8px', left: '8px', fontSize: '0.65rem', fontWeight: '800', background: '#1B2E1E', color: '#FAF8F5', padding: '2px 7px', borderRadius: '999px' }}>
                      #{String(item.id).padStart(2, '0')}
                    </span>
                    <span style={{ position: 'absolute', bottom: '8px', right: '8px', background: 'rgba(27, 46, 30, 0.75)', color: '#FAF8F5', padding: '3px 8px', borderRadius: '6px', fontSize: '0.65rem', fontWeight: 'bold', backdropFilter: 'blur(4px)' }}>
                      🔍 Zoom
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Slider Hint */}
            <div style={{ textAlign: 'center', marginTop: '0.25rem', fontSize: '0.78rem', color: '#73836E' }}>
              <span>← Swipe or click arrows to view all 26 herbs • Click any card for high-resolution zoom →</span>
            </div>
          </div>
        ) : (
          /* COMPACT GRID VIEW (TIGHT & CLEAN) */
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: '1.25rem',
            }}
          >
            {filteredIngredients.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => setSelectedIndex(idx)}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '16px',
                  border: '1.5px solid rgba(79, 93, 56, 0.16)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.04)',
                  transition: 'all 0.25s ease',
                  position: 'relative',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#1B2E1E';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 25px rgba(27, 46, 30, 0.14)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(79, 93, 56, 0.16)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.04)';
                }}
              >
                <div style={{ width: '100%', aspectRatio: '4 / 3', background: '#FFFFFF', position: 'relative' }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '0.5rem' }}
                  />
                  <span style={{ position: 'absolute', top: '8px', left: '8px', fontSize: '0.65rem', fontWeight: '800', background: '#1B2E1E', color: '#FAF8F5', padding: '2px 7px', borderRadius: '999px' }}>
                    #{String(item.id).padStart(2, '0')}
                  </span>
                  <span style={{ position: 'absolute', bottom: '8px', right: '8px', background: 'rgba(27, 46, 30, 0.75)', color: '#FAF8F5', padding: '3px 8px', borderRadius: '6px', fontSize: '0.65rem', fontWeight: 'bold', backdropFilter: 'blur(4px)' }}>
                    🔍 Zoom
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* FULLSCREEN HIGH-RES LIGHTBOX MODAL */}
        <AnimatePresence>
          {selectedIndex !== null && (
            <div
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 999999,
                background: 'rgba(12, 22, 14, 0.9)',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1.25rem',
              }}
              onClick={() => setSelectedIndex(null)}
            >
              <motion.div
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.92, opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '24px',
                  maxWidth: '720px',
                  width: '100%',
                  overflow: 'hidden',
                  boxShadow: '0 30px 70px rgba(0,0,0,0.5)',
                  border: '2px solid #D4AF37',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedIndex(null)}
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: '#1B2E1E',
                    color: '#FAF8F5',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    zIndex: 10,
                  }}
                  aria-label="Close Preview"
                >
                  <X style={{ width: '20px', height: '20px' }} />
                </button>

                {/* Lightbox Large Image Display */}
                <div
                  style={{
                    width: '100%',
                    maxHeight: '520px',
                    background: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    padding: '1.5rem',
                  }}
                >
                  <img
                    src={filteredIngredients[selectedIndex]?.image}
                    alt={filteredIngredients[selectedIndex]?.name}
                    style={{
                      maxHeight: '460px',
                      maxWidth: '100%',
                      objectFit: 'contain',
                    }}
                  />

                  {/* Previous / Next Arrow Controls */}
                  <button
                    onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                    style={{
                      position: 'absolute',
                      left: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      background: 'rgba(27, 46, 30, 0.88)',
                      color: '#FAF8F5',
                      border: '1px solid rgba(212, 175, 55, 0.5)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <ChevronLeft style={{ width: '22px', height: '22px' }} />
                  </button>

                  <button
                    onClick={(e) => { e.stopPropagation(); handleNext(); }}
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      background: 'rgba(27, 46, 30, 0.88)',
                      color: '#FAF8F5',
                      border: '1px solid rgba(212, 175, 55, 0.5)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <ChevronRight style={{ width: '22px', height: '22px' }} />
                  </button>
                </div>

                {/* Modal Bottom Detail & Action */}
                <div style={{ background: '#FAF8F5', padding: '1.25rem 2rem', borderTop: '1px solid #ECE7DD', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <span style={{ fontSize: '0.72rem', fontWeight: 'bold', color: '#73836E', textTransform: 'uppercase', letterSpacing: '1px' }}>
                      Herb #{filteredIngredients[selectedIndex]?.id} • {filteredIngredients[selectedIndex]?.category}
                    </span>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 'bold', color: '#1B2E1E', margin: '2px 0 0' }}>
                      {filteredIngredients[selectedIndex]?.name}
                    </h3>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedIndex(null);
                      if (onOpenOrder) onOpenOrder('200ml');
                    }}
                    className="btn-olive"
                    style={{
                      padding: '0.7rem 1.4rem',
                      fontSize: '0.85rem',
                      fontWeight: 'bold',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <ShoppingBag style={{ width: '15px', height: '15px' }} />
                    <span>Order Veelana Oil (Rs. 1,899)</span>
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
