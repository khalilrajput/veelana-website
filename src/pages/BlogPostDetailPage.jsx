import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { BLOG_POSTS } from '../data/blogPosts';
import { Calendar, Clock, UserCheck, ArrowLeft, Share2, MessageCircle, Sparkles, ChevronRight, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BlogPostDetailPage() {
  const { id } = useParams();
  const post = BLOG_POSTS.find((p) => p.id === id) || BLOG_POSTS[0];

  // Related posts (excluding current one)
  const relatedPosts = BLOG_POSTS.filter((p) => p.id !== post.id).slice(0, 3);

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(`Read this article: "${post.title}" on Veelana Herbal Hair Care:\nhttps://www.veelana.online/blog/${post.id}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <article className="min-h-screen bg-[#FAF8F5] pb-24">
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

      {/* Hero Header */}
      <header className="relative bg-gradient-to-b from-[#18281B] via-[#1B2E1E] to-[#253D2A] text-white pt-14 pb-24 px-4 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#4F5D38]/20 blur-3xl rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-[#A0B195] mb-6 flex-wrap">
            <Link to="/" className="hover:text-white transition">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            <Link to="/blog" className="hover:text-white transition">Blog</Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            <span className="text-[#D4AF37] truncate max-w-[200px] sm:max-w-xs">{post.category}</span>
          </nav>

          {/* Category Pill */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[#D4AF37] text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{post.category}</span>
          </div>

          {/* Main Title */}
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold tracking-tight text-[#FAF8F5] leading-tight mb-6">
            {post.title}
          </h1>

          {/* Metadata Row */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-[#D2DDD0] pt-4 border-t border-white/15">
            <span className="flex items-center gap-1.5 font-semibold text-white">
              <UserCheck className="w-4 h-4 text-[#D4AF37]" />
              {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#D4AF37]" />
              {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#D4AF37]" />
              {post.readTime}
            </span>
          </div>
        </div>
      </header>

      {/* Main Article Body Container */}
      <div className="max-w-4xl mx-auto px-4 -mt-14 relative z-20">
        
        {/* Featured Hero Banner Image */}
        <div className="rounded-3xl overflow-hidden border border-[#ECE7DD] shadow-xl bg-white mb-10 max-h-[460px] relative">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover max-h-[460px]"
          />
        </div>

        {/* Lead Excerpt Blockquote */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border-l-4 border-[#2D6A4F] border-[#ECE7DD] shadow-sm mb-10 text-base sm:text-lg text-[#2A361E] italic leading-relaxed font-serif">
          "{post.snippet}"
        </div>

        {/* Formatted Article Content */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 md:p-12 border border-[#ECE7DD] shadow-sm text-[#1B2E1E]">
          <div
            className="prose prose-stone max-w-none text-[#2A361E] leading-relaxed text-sm sm:text-base space-y-5
              [&>h2]:font-serif [&>h2]:text-2xl [&>h2]:sm:text-3xl [&>h2]:font-bold [&>h2]:text-[#1B2E1E] [&>h2]:mt-8 [&>h2]:mb-4 [&>h2]:border-b [&>h2]:border-[#ECE7DD] [&>h2]:pb-2
              [&>h3]:font-serif [&>h3]:text-xl [&>h3]:sm:text-2xl [&>h3]:font-bold [&>h3]:text-[#2D6A4F] [&>h3]:mt-6 [&>h3]:mb-3
              [&>p]:text-[#4A5543] [&>p]:leading-relaxed [&>p]:mb-4
              [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-2 [&>ul]:text-[#4A5543] [&>ul]:my-4
              [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:space-y-2.5 [&>ol]:text-[#4A5543] [&>ol]:my-4
              [&>li>strong]:text-[#1B2E1E]
              [&>div]:rounded-2xl"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Keywords Tag Strip */}
          {post.keywords && post.keywords.length > 0 && (
            <div className="mt-10 pt-6 border-t border-[#ECE7DD] flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-[#6A7B52] uppercase tracking-wider mr-2">Keywords:</span>
              {post.keywords.map((kw, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#E2DDCF] text-xs font-medium text-[#4F5E52]"
                >
                  #{kw}
                </span>
              ))}
            </div>
          )}

          {/* Social Share & Action Bar */}
          <div className="mt-10 p-6 rounded-2xl bg-[#FAF8F5] border border-[#ECE7DD] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <h4 className="font-serif font-bold text-base text-[#1B2E1E]">Share this knowledge with family or friends</h4>
              <p className="text-xs text-[#6A7B52] mt-0.5">Help others learn about clean, cold-pressed organic hair care.</p>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={handleShareWhatsApp}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366] text-white text-xs font-bold hover:bg-[#20BA5A] transition shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Share via WhatsApp</span>
              </button>

              <Link
                to="/products"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#1B2E1E] text-white text-xs font-bold hover:bg-[#2D6A4F] transition shadow-md shrink-0"
              >
                <span>Shop Veelana Oil</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
              </Link>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-8 text-center sm:text-left">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#1B2E1E] hover:text-[#2D6A4F] transition"
          >
            <ArrowLeft className="w-4 h-4" /> Back to All Articles
          </Link>
        </div>

        {/* Related Articles Section */}
        {relatedPosts.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-6 pb-2 border-b border-[#ECE7DD]">
              <h3 className="font-serif text-2xl font-bold text-[#1B2E1E]">Related Botanical Guides</h3>
              <Link to="/blog" className="text-xs font-bold text-[#2D6A4F] hover:underline flex items-center gap-1">
                View All <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((rel) => (
                <Link
                  key={rel.id}
                  to={`/blog/${rel.id}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-[#ECE7DD] hover:border-[#1B2E1E]/30 shadow-sm hover:shadow-md transition flex flex-col justify-between"
                >
                  <div>
                    <div className="h-40 overflow-hidden bg-[#FAF8F5]">
                      <img
                        src={rel.image}
                        alt={rel.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4">
                      <span className="text-[10px] font-bold text-[#D4AF37] bg-[#1B2E1E] px-2.5 py-0.5 rounded-full uppercase tracking-wider inline-block mb-2">
                        {rel.category}
                      </span>
                      <h4 className="font-serif text-base font-bold text-[#1B2E1E] group-hover:text-[#2D6A4F] transition-colors leading-snug line-clamp-2">
                        {rel.title}
                      </h4>
                    </div>
                  </div>
                  <div className="p-4 pt-0 text-[11px] text-[#6A7B52] flex items-center justify-between">
                    <span>{rel.readTime}</span>
                    <span className="text-xs font-bold text-[#1B2E1E] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      Read <ArrowRight className="w-3 h-3" />
                    </span>
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
