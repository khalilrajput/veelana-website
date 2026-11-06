import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, Calendar, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { BLOG_POSTS } from '../data/blogPosts';

export default function BlogSection() {
  const displayPosts = BLOG_POSTS.slice(0, 3);

  return (
    <section id="blog" className="py-20 bg-[#FAF8F5] border-t border-[#ECE7DD] relative">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6 text-center md:text-left">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAEFE4] border border-[#1B2E1E]/15 text-[#1B2E1E] text-xs font-bold uppercase tracking-wider mb-3">
              <BookOpen className="w-4 h-4 text-[#D4AF37]" />
              <span>Hair Care Journal &amp; Science</span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#1B2E1E]">
              Botanical Insights &amp; Scalp Rituals
            </h2>
            <p className="text-sm md:text-base text-[#4F5E52] max-w-xl mt-2">
              Learn how cold-pressed herbs, Ayurvedic traditions, and clinical follicle nutrition solve hair fall naturally.
            </p>
          </div>

          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1B2E1E] text-white text-xs font-bold hover:bg-[#2D6A4F] transition shadow-md shrink-0 uppercase tracking-wider"
          >
            <span>Explore All Articles</span>
            <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
          </Link>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {displayPosts.map((post, idx) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden border border-[#ECE7DD] hover:border-[#1B2E1E]/30 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Post Thumbnail */}
                <Link to={`/blog/${post.id}`} className="block relative h-48 overflow-hidden bg-[#FAF8F5]">
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

                {/* Post Details */}
                <div className="p-5 sm:p-6">
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

                  <Link to={`/blog/${post.id}`} className="block">
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1B2E1E] group-hover:text-[#2D6A4F] transition-colors leading-snug line-clamp-2 mb-2">
                      {post.title}
                    </h3>
                  </Link>

                  <p className="text-xs sm:text-sm text-[#4F5E52] line-clamp-3 leading-relaxed mb-4">
                    {post.snippet}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-5 sm:p-6 pt-0">
                <div className="pt-3.5 border-t border-[#F2EFE8] flex items-center justify-between">
                  <span className="text-[11px] font-medium text-[#7A8C74] truncate max-w-[140px]">
                    {post.author}
                  </span>
                  <Link
                    to={`/blog/${post.id}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#1B2E1E] group-hover:text-[#2D6A4F] group-hover:translate-x-1 transition-all"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
}
