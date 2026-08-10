import React, { useState } from 'react';
import { BookOpen, Clock, Calendar, ArrowRight, X, Share2, Sparkles, UserCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BLOG_POSTS } from '../data/blogPosts';

export default function BlogSection() {
  const [selectedPost, setSelectedPost] = useState(null);

  const handleShareWhatsApp = (post) => {
    const text = encodeURIComponent(`Read this helpful hair care article: "${post.title}" - https://veelana.online/#blog`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <section id="blog" className="py-20 bg-[#FAF8F5] border-b border-[#1B2E1E]/10 relative">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="section-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EAEFE4] border border-[#1B2E1E]/20 text-[#1B2E1E] text-xs font-bold uppercase tracking-wider mb-3">
            <BookOpen className="w-4 h-4 text-[#D4AF37]" />
            Hair Care Knowledge & Guides
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#121E14]">
            Botanical Insights & Scalp Science
          </h2>
          <p className="text-sm md:text-base text-[#4F5E52] max-w-2xl mx-auto mt-3">
            Discover expert advice on organic hair growth, cold-pressed herbs, and restoring root health naturally.
          </p>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {BLOG_POSTS.map((post, idx) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden border border-[#1B2E1E]/15 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer"
              onClick={() => setSelectedPost(post)}
            >
              {/* Post Thumbnail */}
              <div className="relative h-52 overflow-hidden bg-[#EAEFE4]">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-[#1B2E1E] text-[#FAF8F5] text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {post.category}
                </span>
              </div>

              {/* Post Details */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 text-xs text-[#4F5E52] mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-[#121E14] group-hover:text-[#3A4828] transition line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-xs md:text-sm text-[#4F5E52] mt-2 line-clamp-3 leading-relaxed">
                    {post.snippet}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#1B2E1E]">
                    {post.author}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[#3A4828] group-hover:translate-x-1 transition-transform">
                    Read Article <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

      </div>

      {/* FULL ARTICLE READING MODAL */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#FAF8F5] border border-[#1B2E1E]/20 rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden my-8 max-h-[90vh] flex flex-col"
            >
              {/* Modal Header */}
              <div className="bg-[#1B2E1E] text-[#FDFBF7] p-6 flex items-start justify-between relative">
                <div>
                  <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider block mb-1">
                    {selectedPost.category}
                  </span>
                  <h2 className="font-serif text-2xl md:text-3xl font-bold text-white pr-6">
                    {selectedPost.title}
                  </h2>
                  <div className="flex items-center gap-4 text-xs text-gray-300 mt-3">
                    <span className="flex items-center gap-1">
                      <UserCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                      {selectedPost.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {selectedPost.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {selectedPost.readTime}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition shrink-0"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 md:p-8 overflow-y-auto flex-1 text-[#1B2E1E] prose prose-stone max-w-none">
                <div className="mb-6 rounded-xl overflow-hidden max-h-72 border border-gray-200">
                  <img
                    src={selectedPost.image}
                    alt={selectedPost.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div 
                  className="text-sm md:text-base leading-relaxed space-y-4 font-sans text-gray-800"
                  dangerouslySetInnerHTML={{ __html: selectedPost.content }}
                />
              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-gray-100 border-t border-gray-200 flex items-center justify-between">
                <button
                  onClick={() => handleShareWhatsApp(selectedPost)}
                  className="px-4 py-2 bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-emerald-800 transition"
                >
                  <Share2 className="w-4 h-4" />
                  Share Article via WhatsApp
                </button>

                <button
                  onClick={() => setSelectedPost(null)}
                  className="px-5 py-2 bg-[#1B2E1E] text-white rounded-xl text-xs font-bold hover:bg-[#3A4828] transition"
                >
                  Close Article
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
