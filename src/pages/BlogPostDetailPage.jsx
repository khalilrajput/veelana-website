import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { BLOG_POSTS } from '../data/blogPosts';
import { Calendar, Clock, UserCheck, ArrowLeft, MessageCircle, Sparkles, ChevronRight, ArrowRight } from 'lucide-react';

export default function BlogPostDetailPage() {
  const { id } = useParams();
  const post = BLOG_POSTS.find((p) => p.id === id) || BLOG_POSTS[0];

  const relatedPosts = BLOG_POSTS.filter((p) => p.id !== post.id).slice(0, 3);

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(`Read this article: "${post.title}" on Veelana Herbal Hair Care:\nhttps://www.veelana.online/blog/${post.id}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <article style={{ minHeight: '100vh', backgroundColor: '#FAF8F5', paddingBottom: '6rem' }}>
      {/* Dynamic SEO Meta */}
      <title>{`${post.title} | Veelana Botanical Library`}</title>
      <meta name="description" content={post.snippet} />
      <meta property="og:title" content={post.title} />
      <meta property="og:description" content={post.snippet} />
      <meta property="og:url" content={`https://www.veelana.online/blog/${post.id}`} />
      <meta property="og:type" content="article" />
      <meta property="og:image" content={`https://www.veelana.online${post.image || '/assets/real_full_set_boxes.webp'}`} />
      <meta name="twitter:title" content={post.title} />
      <meta name="twitter:description" content={post.snippet} />
      <link rel="canonical" href={`https://www.veelana.online/blog/${post.id}`} />

      {/* Header Banner */}
      <header style={{
        background: 'linear-gradient(180deg, #18281B 0%, #1B2E1E 50%, #253D2A 100%)',
        color: '#FFFFFF',
        padding: '3rem 1.25rem 5rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '820px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          {/* Breadcrumbs */}
          <nav style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.75rem',
            color: '#A0B195',
            marginBottom: '1.25rem',
            flexWrap: 'wrap'
          }}>
            <Link to="/" style={{ color: '#D4DDD2' }}>Home</Link>
            <ChevronRight style={{ width: '12px', height: '12px', opacity: 0.6 }} />
            <Link to="/blog" style={{ color: '#D4DDD2' }}>Blog</Link>
            <ChevronRight style={{ width: '12px', height: '12px', opacity: 0.6 }} />
            <span style={{ color: '#D4AF37', fontWeight: '700' }}>{post.category}</span>
          </nav>

          {/* Category Pill */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '4px 12px',
            borderRadius: '999px',
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            color: '#D4AF37',
            fontSize: '0.72rem',
            fontWeight: '800',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginBottom: '1rem'
          }}>
            <Sparkles style={{ width: '13px', height: '13px' }} />
            <span>{post.category}</span>
          </div>

          {/* Headline */}
          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: '700',
            color: '#FAF8F5',
            lineHeight: 1.2,
            margin: '0 0 1.25rem'
          }}>
            {post.title}
          </h1>

          {/* Metadata Row */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.25rem',
            fontSize: '0.78rem',
            color: '#D2DDD0',
            paddingTop: '1rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.15)',
            flexWrap: 'wrap'
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontWeight: '700', color: '#FFFFFF' }}>
              <UserCheck style={{ width: '15px', height: '15px', color: '#D4AF37' }} />
              {post.author}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Calendar style={{ width: '14px', height: '14px', color: '#D4AF37' }} />
              {post.date}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Clock style={{ width: '14px', height: '14px', color: '#D4AF37' }} />
              {post.readTime}
            </span>
          </div>
        </div>
      </header>

      {/* Main Article Container */}
      <div style={{ maxWidth: '820px', margin: '-2.5rem auto 0', padding: '0 1.25rem', position: 'relative', zIndex: 10 }}>
        
        {/* Featured Image */}
        <div style={{
          borderRadius: '24px',
          overflow: 'hidden',
          border: '1px solid #ECE7DD',
          boxShadow: '0 12px 35px rgba(0,0,0,0.08)',
          background: '#FFFFFF',
          marginBottom: '2rem',
          maxHeight: '440px'
        }}>
          <img
            src={post.image}
            alt={post.title}
            style={{ width: '100%', height: '100%', maxHeight: '440px', objectFit: 'cover', display: 'block' }}
          />
        </div>

        {/* Lead Excerpt */}
        <div style={{
          background: '#FFFFFF',
          borderRadius: '18px',
          padding: '1.5rem 1.75rem',
          borderLeft: '4px solid #2D6A4F',
          border: '1px solid #ECE7DD',
          borderLeftWidth: '4px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
          marginBottom: '2rem',
          fontSize: '1.05rem',
          color: '#2A361E',
          fontStyle: 'italic',
          lineHeight: 1.65,
          fontFamily: 'var(--font-heading)'
        }}>
          "{post.snippet}"
        </div>

        {/* Article Body */}
        <div style={{
          background: '#FFFFFF',
          borderRadius: '24px',
          padding: '2.5rem 2rem',
          border: '1px solid #ECE7DD',
          boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
          color: '#1B2E1E'
        }}>
          <div
            style={{
              fontSize: '0.95rem',
              lineHeight: 1.75,
              color: '#3A4833'
            }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Keywords Strip */}
          {post.keywords && post.keywords.length > 0 && (
            <div style={{
              marginTop: '2.5rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid #ECE7DD',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              flexWrap: 'wrap'
            }}>
              <span style={{ fontSize: '0.72rem', fontWeight: '800', color: '#6A7B52', textTransform: 'uppercase', letterSpacing: '1px', marginRight: '4px' }}>
                Keywords:
              </span>
              {post.keywords.map((kw, i) => (
                <span
                  key={i}
                  style={{
                    padding: '3px 10px',
                    borderRadius: '999px',
                    background: '#FAF8F5',
                    border: '1px solid #E2DDCF',
                    fontSize: '0.75rem',
                    color: '#4F5E52',
                    fontWeight: '600'
                  }}
                >
                  #{kw}
                </span>
              ))}
            </div>
          )}

          {/* Social Share & Action Callout */}
          <div style={{
            marginTop: '2rem',
            padding: '1.5rem',
            borderRadius: '16px',
            background: '#FAF8F5',
            border: '1px solid #ECE7DD',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div>
              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: '700', color: '#1B2E1E', margin: '0 0 0.25rem' }}>
                Share this knowledge with family or friends
              </h4>
              <p style={{ fontSize: '0.78rem', color: '#6A7B52', margin: 0 }}>
                Help others discover clean, cold-pressed botanical hair care.
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={handleShareWhatsApp}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '0.65rem 1.25rem',
                  borderRadius: '10px',
                  background: '#25D366',
                  color: '#FFFFFF',
                  fontWeight: '700',
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(37, 211, 102, 0.25)'
                }}
              >
                <MessageCircle style={{ width: '16px', height: '16px' }} />
                <span>Share via WhatsApp</span>
              </button>

              <Link
                to="/products"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '0.65rem 1.25rem',
                  borderRadius: '10px',
                  background: '#1B2E1E',
                  color: '#FAF8F5',
                  fontWeight: '700',
                  fontSize: '0.8rem',
                  textDecoration: 'none'
                }}
              >
                <span>Shop Veelana Oil</span>
                <ArrowRight style={{ width: '15px', height: '15px', color: '#D4AF37' }} />
              </Link>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div style={{ marginTop: '2rem' }}>
          <Link
            to="/blog"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.82rem',
              fontWeight: '700',
              color: '#1B2E1E',
              textDecoration: 'none'
            }}
          >
            <ArrowLeft style={{ width: '16px', height: '16px' }} />
            <span>Back to All Articles</span>
          </Link>
        </div>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <div style={{ marginTop: '3.5rem' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid #ECE7DD',
              paddingBottom: '0.75rem',
              marginBottom: '1.5rem'
            }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: '700', color: '#1B2E1E', margin: 0 }}>
                Related Botanical Guides
              </h3>
              <Link to="/blog" style={{ fontSize: '0.78rem', fontWeight: '700', color: '#2D6A4F', textDecoration: 'none' }}>
                View All &rarr;
              </Link>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1.25rem'
            }}>
              {relatedPosts.map((rel) => (
                <Link
                  key={rel.id}
                  to={`/blog/${rel.id}`}
                  style={{
                    background: '#FFFFFF',
                    borderRadius: '16px',
                    border: '1px solid #ECE7DD',
                    overflow: 'hidden',
                    textDecoration: 'none',
                    color: 'inherit',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
                  }}
                >
                  <div>
                    <div style={{ height: '150px', overflow: 'hidden', background: '#F5F2EB' }}>
                      <img src={rel.image} alt={rel.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ padding: '1rem' }}>
                      <span style={{
                        display: 'inline-block',
                        fontSize: '0.65rem',
                        fontWeight: '800',
                        color: '#D4AF37',
                        background: '#1B2E1E',
                        padding: '2px 8px',
                        borderRadius: '999px',
                        textTransform: 'uppercase',
                        marginBottom: '0.5rem'
                      }}>
                        {rel.category}
                      </span>
                      <h4 style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.05rem',
                        fontWeight: '700',
                        color: '#1B2E1E',
                        lineHeight: 1.3,
                        margin: 0
                      }}>
                        {rel.title}
                      </h4>
                    </div>
                  </div>
                  <div style={{
                    padding: '0.75rem 1rem',
                    borderTop: '1px solid #F0ECE4',
                    fontSize: '0.72rem',
                    color: '#6A7B52',
                    display: 'flex',
                    justifyContent: 'space-between'
                  }}>
                    <span>{rel.readTime}</span>
                    <span style={{ fontWeight: '700', color: '#1B2E1E' }}>Read &rarr;</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </article>
  );
}
