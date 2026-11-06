import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, Calendar, ArrowRight, Search, Sparkles, UserCheck, ChevronRight, Leaf } from 'lucide-react';
import { motion } from 'framer-motion';
import { BLOG_POSTS } from '../data/blogPosts';

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = useMemo(() => {
    return ['All', ...new Set(BLOG_POSTS.map(p => p.category))];
  }, []);

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter(post => {
      const matchesCat = selectedCategory === 'All' || post.category === selectedCategory;
      const matchesSearch = searchQuery === '' || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.snippet.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.keywords && post.keywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase())));
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const featuredPost = BLOG_POSTS[0];
  const gridPosts = selectedCategory === 'All' && searchQuery === '' 
    ? filteredPosts.slice(1) 
    : filteredPosts;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FAF8F5', paddingBottom: '5rem' }}>
      {/* Dynamic SEO Meta */}
      <title>Hair Care &amp; Scalp Health Journal | Veelana Botanical Library</title>
      <meta name="description" content="Explore clinical botanical research, Ayurvedic hair oiling rituals, and natural scalp care guides curated by Veelana Herbal Hair Care experts." />
      <meta property="og:title" content="Hair Care & Scalp Health Journal | Veelana Botanical Library" />
      <meta property="og:description" content="Explore clinical botanical research, Ayurvedic hair oiling rituals, and natural scalp care guides curated by Veelana Herbal Hair Care experts." />
      <meta property="og:url" content="https://www.veelana.online/blog" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://www.veelana.online/assets/real_full_set_boxes.webp" />
      <meta name="twitter:title" content="Hair Care & Scalp Health Journal | Veelana Botanical Library" />
      <meta name="twitter:description" content="Explore clinical botanical research, Ayurvedic hair oiling rituals, and natural scalp care guides." />
      <link rel="canonical" href="https://www.veelana.online/blog" />

      {/* Luxury Editorial Header Banner */}
      <section style={{
        background: 'linear-gradient(180deg, #18281B 0%, #1B2E1E 50%, #253D2A 100%)',
        color: '#FFFFFF',
        padding: '3.5rem 1.25rem 4rem',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center'
      }}>
        {/* Soft Ambient Gold Glow */}
        <div style={{
          position: 'absolute',
          top: '-60px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '500px',
          height: '250px',
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.2) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{ maxWidth: '820px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          {/* Breadcrumbs */}
          <nav style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.75rem',
            color: '#A0B195',
            marginBottom: '1.25rem'
          }}>
            <Link to="/" style={{ color: '#D4DDD2' }}>Home</Link>
            <ChevronRight style={{ width: '12px', height: '12px', opacity: 0.6 }} />
            <span style={{ color: '#D4AF37', fontWeight: '700' }}>Botanical Journal &amp; Guides</span>
          </nav>

          {/* Top Pill Badge */}
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '5px 14px',
              borderRadius: '999px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              color: '#D4AF37',
              fontSize: '0.72rem',
              fontWeight: '800',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              marginBottom: '1rem',
              backdropFilter: 'blur(8px)'
            }}>
              <Sparkles style={{ width: '14px', height: '14px' }} />
              <span>The Veelana Botanical Journal</span>
            </div>
          </div>

          {/* Headline */}
          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2rem, 4.5vw, 3.25rem)',
            fontWeight: '700',
            color: '#FAF8F5',
            lineHeight: 1.15,
            margin: '0 0 1rem'
          }}>
            Scalp Science, Herbal Wisdom &amp; Rituals
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: '0.95rem',
            color: '#D2DDD0',
            lineHeight: 1.6,
            maxWidth: '640px',
            margin: '0 auto 1.75rem'
          }}>
            Deep-dive articles on 25+ cold-pressed herbs, the biology of follicle restoration, and daily rituals for healthier, thicker hair.
          </p>

          {/* Search Bar Container */}
          <div style={{
            maxWidth: '520px',
            margin: '0 auto',
            position: 'relative',
            display: 'flex',
            alignItems: 'center'
          }}>
            <Search style={{
              position: 'absolute',
              left: '16px',
              width: '18px',
              height: '18px',
              color: '#6A7B52',
              pointerEvents: 'none'
            }} />
            <input
              type="text"
              placeholder="Search articles by ingredient, symptom, or topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.85rem 3rem 0.85rem 2.85rem',
                borderRadius: '999px',
                border: '1px solid #D6D0C2',
                background: '#FFFFFF',
                color: '#1B2E1E',
                fontSize: '0.88rem',
                outline: 'none',
                boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
              }}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: '16px',
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  color: '#6A7B52',
                  cursor: 'pointer'
                }}
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Main Body Content */}
      <div style={{ maxWidth: '1180px', margin: '-1.75rem auto 0', padding: '0 1.25rem', position: 'relative', zIndex: 10 }}>
        
        {/* Category Filter Pills Bar */}
        <div style={{
          background: '#FFFFFF',
          borderRadius: '16px',
          padding: '0.55rem',
          border: '1px solid #ECE7DD',
          boxShadow: '0 6px 20px rgba(0,0,0,0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          flexWrap: 'wrap',
          marginBottom: '2.5rem'
        }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '0.55rem 1.15rem',
                borderRadius: '12px',
                fontSize: '0.82rem',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.2s',
                background: selectedCategory === cat ? '#1B2E1E' : 'transparent',
                color: selectedCategory === cat ? '#FAF8F5' : '#4F5E52',
                border: selectedCategory === cat ? '1px solid #1B2E1E' : '1px solid transparent',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Cover Story (Visible on "All" when no search) */}
        {selectedCategory === 'All' && searchQuery === '' && featuredPost && (
          <div style={{ marginBottom: '3.5rem' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.72rem',
              fontWeight: '800',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              color: '#6A7B52',
              marginBottom: '0.75rem'
            }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#D4AF37' }}></span>
              <span>Featured Cover Story</span>
            </div>

            <Link
              to={`/blog/${featuredPost.id}`}
              style={{
                display: 'block',
                background: '#FFFFFF',
                borderRadius: '24px',
                border: '1px solid #ECE7DD',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                textDecoration: 'none',
                color: 'inherit',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}
            >
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                alignItems: 'center'
              }}>
                {/* Visual */}
                <div style={{ height: '360px', overflow: 'hidden', position: 'relative', background: '#F5F2EB' }}>
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                  <span style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem',
                    background: 'rgba(27, 46, 30, 0.92)',
                    color: '#D4AF37',
                    fontSize: '0.72rem',
                    fontWeight: '800',
                    padding: '4px 12px',
                    borderRadius: '999px',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}>
                    {featuredPost.category}
                  </span>
                </div>

                {/* Content */}
                <div style={{ padding: '2.25rem 2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.78rem', color: '#6A7B52', marginBottom: '0.75rem' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Calendar style={{ width: '14px', height: '14px', color: '#D4AF37' }} />
                        {featuredPost.date}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Clock style={{ width: '14px', height: '14px', color: '#D4AF37' }} />
                        {featuredPost.readTime}
                      </span>
                    </div>

                    <h2 style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.85rem',
                      fontWeight: '700',
                      color: '#1B2E1E',
                      lineHeight: 1.25,
                      margin: '0 0 0.85rem'
                    }}>
                      {featuredPost.title}
                    </h2>

                    <p style={{
                      fontSize: '0.9rem',
                      color: '#4F5E52',
                      lineHeight: 1.6,
                      margin: '0 0 1.5rem'
                    }}>
                      {featuredPost.snippet}
                    </p>
                  </div>

                  <div style={{
                    paddingTop: '1rem',
                    borderTop: '1px solid #F0ECE4',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <span style={{ fontSize: '0.78rem', fontWeight: '700', color: '#1B2E1E', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <UserCheck style={{ width: '15px', height: '15px', color: '#2D6A4F' }} />
                      {featuredPost.author}
                    </span>

                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      fontSize: '0.82rem',
                      fontWeight: '800',
                      color: '#1B2E1E'
                    }}>
                      <span>Read Full Article</span>
                      <ArrowRight style={{ width: '15px', height: '15px', color: '#D4AF37' }} />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Section Headline */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid #ECE7DD',
          paddingBottom: '0.75rem',
          marginBottom: '2rem'
        }}>
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.85rem',
            fontWeight: '700',
            color: '#1B2E1E',
            margin: 0
          }}>
            {searchQuery ? `Search Results (${filteredPosts.length})` : selectedCategory === 'All' ? 'Latest Clinical & Ritual Guides' : `${selectedCategory} (${filteredPosts.length})`}
          </h2>

          <span style={{ fontSize: '0.78rem', color: '#6A7B52', fontWeight: '600' }}>
            {filteredPosts.length} {filteredPosts.length === 1 ? 'Article' : 'Articles'}
          </span>
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div style={{
            background: '#FFFFFF',
            borderRadius: '24px',
            border: '1px solid #ECE7DD',
            padding: '4rem 1.5rem',
            textAlign: 'center'
          }}>
            <Leaf style={{ width: '48px', height: '48px', color: '#8A9A86', margin: '0 auto 1rem', strokeWidth: 1.5 }} />
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', color: '#1B2E1E', margin: '0 0 0.5rem' }}>
              No matching guides found
            </h3>
            <p style={{ fontSize: '0.88rem', color: '#5F7057', maxWidth: '420px', margin: '0 auto 1.5rem' }}>
              We couldn't find any articles matching your search query. Try searching for "oil", "Amla", "routine", or reset filters.
            </p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              style={{
                padding: '0.65rem 1.5rem',
                borderRadius: '999px',
                background: '#1B2E1E',
                color: '#FAF8F5',
                fontSize: '0.82rem',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* 3-Column Luxury Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1.75rem'
        }}>
          {gridPosts.map((post) => (
            <article
              key={post.id}
              style={{
                background: '#FFFFFF',
                borderRadius: '20px',
                border: '1px solid #ECE7DD',
                overflow: 'hidden',
                boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease'
              }}
            >
              <div>
                {/* Thumbnail */}
                <Link to={`/blog/${post.id}`} style={{ display: 'block', height: '210px', overflow: 'hidden', position: 'relative', background: '#F5F2EB' }}>
                  <img
                    src={post.image}
                    alt={post.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    loading="lazy"
                  />
                  <span style={{
                    position: 'absolute',
                    top: '0.75rem',
                    left: '0.75rem',
                    background: 'rgba(27, 46, 30, 0.9)',
                    color: '#FAF8F5',
                    fontSize: '0.68rem',
                    fontWeight: '800',
                    padding: '3px 10px',
                    borderRadius: '999px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.8px'
                  }}>
                    {post.category}
                  </span>
                </Link>

                {/* Details */}
                <div style={{ padding: '1.4rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.74rem', color: '#6A7B52', marginBottom: '0.65rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                      <Calendar style={{ width: '12px', height: '12px', color: '#D4AF37' }} />
                      {post.date}
                    </span>
                    <span>•</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                      <Clock style={{ width: '12px', height: '12px', color: '#D4AF37' }} />
                      {post.readTime}
                    </span>
                  </div>

                  <Link to={`/blog/${post.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <h3 style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.35rem',
                      fontWeight: '700',
                      color: '#1B2E1E',
                      lineHeight: 1.3,
                      margin: '0 0 0.65rem'
                    }}>
                      {post.title}
                    </h3>
                  </Link>

                  <p style={{
                    fontSize: '0.82rem',
                    color: '#4F5E52',
                    lineHeight: 1.55,
                    margin: 0
                  }}>
                    {post.snippet}
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div style={{
                padding: '1rem 1.4rem',
                borderTop: '1px solid #F0ECE4',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <span style={{ fontSize: '0.74rem', color: '#7A8C74', fontWeight: '600' }}>
                  {post.author}
                </span>

                <Link
                  to={`/blog/${post.id}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '0.78rem',
                    fontWeight: '800',
                    color: '#1B2E1E',
                    textDecoration: 'none'
                  }}
                >
                  <span>Read Article</span>
                  <ArrowRight style={{ width: '13px', height: '13px', color: '#2D6A4F' }} />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Botanical Callout Banner */}
        <div style={{
          marginTop: '4.5rem',
          background: 'linear-gradient(135deg, #1B2E1E 0%, #243B28 50%, #121E14 100%)',
          color: '#FFFFFF',
          borderRadius: '24px',
          padding: '2.75rem 2rem',
          boxShadow: '0 15px 40px rgba(0,0,0,0.15)',
          border: '1px solid rgba(255,255,255,0.1)',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '2rem'
        }}>
          <div style={{ maxWidth: '620px' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.72rem',
              fontWeight: '800',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              color: '#D4AF37',
              marginBottom: '0.65rem'
            }}>
              <Sparkles style={{ width: '14px', height: '14px' }} />
              Pure Artisan Batch Hair Care
            </span>
            <h3 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.85rem',
              fontWeight: '700',
              margin: '0 0 0.5rem',
              color: '#FAF8F5'
            }}>
              Experience 25+ Cold-Pressed Herbs on Your Scalp
            </h3>
            <p style={{ fontSize: '0.88rem', color: '#D2DDD0', lineHeight: 1.55, margin: 0 }}>
              Formulated without mineral oils, artificial parabens, or sulphates. Crafted in small fresh batches in Punjab and delivered across Pakistan with Cash on Delivery.
            </p>
          </div>

          <div>
            <Link
              to="/products"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '0.85rem 1.85rem',
                borderRadius: '999px',
                background: '#D4AF37',
                color: '#121E14',
                fontWeight: '800',
                fontSize: '0.82rem',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                textDecoration: 'none',
                boxShadow: '0 6px 20px rgba(212, 175, 55, 0.35)'
              }}
            >
              <span>Shop Veelana Oil</span>
              <ArrowRight style={{ width: '16px', height: '16px' }} />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
