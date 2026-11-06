import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, Calendar, ArrowRight, Search, Sparkles, Filter, Leaf, ChevronRight, UserCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { BLOG_POSTS } from '../data/blogPosts';

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = useMemo(() => {
    const cats = ['All', ...new Set(BLOG_POSTS.map(p => p.category))];
    return cats;
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
    <div className="min-h-screen bg-[#FAF8F5] pb-24">
      {/* Dynamic SEO Meta */}
      <title>Hair Care & Scalp Health Journal | Veelana Botanical Library</title>
      <meta name="description" content="Explore clinical botanical research, Ayurvedic hair oiling rituals, and natural scalp care guides curated by Veelana Herbal Hair Care experts." />
      <meta property="og:title" content="Hair Care & Scalp Health Journal | Veelana Botanical Library" />
      <meta property="og:description" content="Explore clinical botanical research, Ayurvedic hair oiling rituals, and natural scalp care guides curated by Veelana Herbal Hair Care experts." />
      <meta property="og:url" content="https://www.veelana.online/blog" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://www.veelana.online/assets/real_full_set_boxes.webp" />
      <meta name="twitter:title" content="Hair Care & Scalp Health Journal | Veelana Botanical Library" />
      <meta name="twitter:description" content="Explore clinical botanical research, Ayurvedic hair oiling rituals, and natural scalp care guides." />
      <link rel="canonical" href="https://www.veelana.online/blog" />

      {/* Hero Header Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#18281B] via-[#1B2E1E] to-[#253D2A] text-white pt-16 pb-20 px-4">
        {/* Subtle Decorative Ambient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-80 bg-[#4F5D38]/20 blur-3xl rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10 text-center">
          {/* Breadcrumb */}
          <nav className="inline-flex items-center gap-2 text-xs text-[#A0B195] mb-6">
            <Link to="/" className="hover:text-white transition">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            <span className="text-[#D4AF37] font-semibold">Botanical Journal & Guides</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Veelana Botanical Journal</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#FAF8F5] leading-tight mb-5">
            Scalp Science, Herbal Wisdom &amp; Rituals
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-[#D2DDD0] max-w-2xl mx-auto leading-relaxed font-normal">
            Deep-dive articles on 25+ cold-pressed herbs, the biology of follicle restoration, and daily rituals for healthier, thicker hair.
          </p>

          {/* Interactive Search Bar */}
          <div className="mt-8 max-w-xl mx-auto relative">
            <Search className="w-5 h-5 text-[#8A9A86] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search articles by ingredient, symptom, or topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/95 backdrop-blur-md text-[#1B2E1E] placeholder:text-[#7A8C74] pl-12 pr-4 py-3.5 rounded-full border border-[#D6D0C2] focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/30 outline-none text-sm transition shadow-lg"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-[#6A7B52] hover:text-[#1B2E1E]"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-4 -mt-8 relative z-20">
        {/* Category Pills Navigation */}
        <div className="bg-white/90 backdrop-blur-md p-2 rounded-2xl border border-[#ECE7DD] shadow-md flex items-center justify-start sm:justify-center gap-2 overflow-x-auto no-scrollbar mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#1B2E1E] text-[#FAF8F5] shadow-sm'
                  : 'text-[#4F5E52] hover:bg-[#FAF8F5] hover:text-[#1B2E1E]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Post Hero Banner (Shows on initial load) */}
        {selectedCategory === 'All' && searchQuery === '' && featuredPost && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-14"
          >
            <div className="text-xs font-bold uppercase tracking-wider text-[#6A7B52] mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
              <span>Featured Cover Story</span>
            </div>

            <Link
              to={`/blog/${featuredPost.id}`}
              className="group block bg-white rounded-3xl overflow-hidden border border-[#E5E0D5] hover:border-[#1B2E1E]/40 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-center">
                {/* Visual */}
                <div className="lg:col-span-7 h-64 sm:h-80 lg:h-96 relative overflow-hidden bg-[#FAF8F5]">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent lg:hidden" />
                  <span className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-[#1B2E1E]/90 backdrop-blur-md text-[#D4AF37] text-xs font-bold uppercase tracking-wider">
                    {featuredPost.category}
                  </span>
                </div>

                {/* Content */}
                <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-4 text-xs text-[#6A7B52] mb-3">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                        {featuredPost.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                        {featuredPost.readTime}
                      </span>
                    </div>

                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1B2E1E] group-hover:text-[#3E4E2C] transition-colors leading-snug mb-3">
                      {featuredPost.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-[#4F5E52] leading-relaxed line-clamp-3 mb-6">
                      {featuredPost.snippet}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#ECE7DD] flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#1B2E1E] flex items-center gap-1.5">
                      <UserCheck className="w-4 h-4 text-[#2D6A4F]" />
                      {featuredPost.author}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1B2E1E] group-hover:text-[#2D6A4F] group-hover:translate-x-1 transition-all">
                      Read Full Article <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Section Title */}
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-[#ECE7DD]">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1B2E1E]">
            {searchQuery ? `Search Results (${filteredPosts.length})` : selectedCategory === 'All' ? 'Latest Clinical & Ritual Guides' : `${selectedCategory} (${filteredPosts.length})`}
          </h2>
          <span className="text-xs font-medium text-[#6A7B52]">
            {filteredPosts.length} {filteredPosts.length === 1 ? 'Article' : 'Articles'}
          </span>
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-[#ECE7DD] p-8">
            <Leaf className="w-12 h-12 text-[#8A9A86] mx-auto mb-4 stroke-1" />
            <h3 className="font-serif text-2xl font-bold text-[#1B2E1E] mb-2">No matching guides found</h3>
            <p className="text-sm text-[#5F7057] max-w-md mx-auto mb-6">
              We couldn't find any articles matching your search query. Try searching for "oil", "Amla", "massage", or reset filters.
            </p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="px-6 py-2.5 rounded-full bg-[#1B2E1E] text-white text-xs font-bold hover:bg-[#2D6A4F] transition shadow-md"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Grid Articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {gridPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="group bg-white rounded-2xl overflow-hidden border border-[#ECE7DD] hover:border-[#1B2E1E]/30 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Card Thumbnail */}
                <Link to={`/blog/${post.id}`} className="block relative h-52 overflow-hidden bg-[#FAF8F5]">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 bg-[#1B2E1E]/90 backdrop-blur-md text-[#FAF8F5] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {post.category}
                  </span>
                </Link>

                {/* Card Body */}
                <div className="p-5 sm:p-6">
                  {/* Meta Strip */}
                  <div className="flex items-center gap-3 text-[11px] text-[#6A7B52] mb-2.5">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#D4AF37]" />
                      {post.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#D4AF37]" />
                      {post.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <Link to={`/blog/${post.id}`} className="block">
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1B2E1E] group-hover:text-[#2D6A4F] transition-colors leading-snug line-clamp-2 mb-2">
                      {post.title}
                    </h3>
                  </Link>

                  {/* Snippet */}
                  <p className="text-xs sm:text-sm text-[#4F5E52] line-clamp-3 leading-relaxed mb-4">
                    {post.snippet}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-5 sm:p-6 pt-0">
                <div className="pt-3.5 border-t border-[#F2EFE8] flex items-center justify-between">
                  <span className="text-[11px] font-medium text-[#7A8C74] truncate max-w-[150px]">
                    {post.author}
                  </span>
                  <Link
                    to={`/blog/${post.id}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#1B2E1E] group-hover:text-[#2D6A4F] group-hover:translate-x-1 transition-all"
                  >
                    <span>Read</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Newsletter / Botanical Guide CTA Banner */}
        <div className="mt-20 bg-gradient-to-br from-[#1B2E1E] via-[#243B28] to-[#121E14] text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-white/10 relative overflow-hidden text-center sm:text-left">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#D4AF37] mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                Pure Artisan Batch Hair Care
              </span>
              <h3 className="font-serif text-2xl sm:text-4xl font-bold leading-tight mb-3">
                Experience 25+ Cold-Pressed Herbs on Your Scalp
              </h3>
              <p className="text-xs sm:text-sm text-[#D2DDD0] max-w-xl leading-relaxed">
                Formulated without mineral oils, artificial parabens, or sulphates. Crafted in small fresh batches in Punjab and delivered across Pakistan with Cash on Delivery.
              </p>
            </div>

            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#D4AF37] hover:bg-[#C29D26] text-[#121E14] font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-xl transition-all"
              >
                <span>Shop Veelana Oil</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
