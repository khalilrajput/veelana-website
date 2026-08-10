import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { BLOG_POSTS } from '../data/blogPosts';
import { Calendar, Clock, UserCheck, ArrowLeft, Share2, MessageCircle } from 'lucide-react';

export default function BlogPostDetailPage() {
  const { id } = useParams();
  const post = BLOG_POSTS.find((p) => p.id === id) || BLOG_POSTS[0];

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(`Read this article: "${post.title}" on Veelana Herbal Hair Care: https://veelana.online/blog/${post.id}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <article className="py-12 bg-[#FAF8F5] min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back button */}
        <Link to="/blog" className="inline-flex items-center gap-2 text-xs font-bold text-[#1B2E1E] hover:text-[#D4AF37] transition mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to All Articles
        </Link>

        {/* Category & Title */}
        <div className="mb-6">
          <span className="px-3 py-1 bg-[#1B2E1E] text-white text-[11px] font-bold rounded-full uppercase tracking-wider inline-block mb-3">
            {post.category}
          </span>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-[#121E14] leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-xs text-[#4F5E52] mt-4 border-b border-gray-200 pb-6">
            <span className="flex items-center gap-1.5 font-semibold text-[#1B2E1E]">
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

        {/* Featured Image */}
        <div className="rounded-3xl overflow-hidden border border-gray-200 shadow-md mb-8 max-h-[450px]">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Body Content */}
        <div
          className="bg-white rounded-3xl p-6 md:p-10 border border-gray-100 shadow-sm text-[#1B2E1E] text-base leading-relaxed space-y-4 font-sans"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Share & Order Callout */}
        <div className="mt-8 p-6 bg-[#EAEFE4] border border-[#1B2E1E]/20 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-serif font-bold text-lg text-[#121E14]">Found this article helpful?</h4>
            <p className="text-xs text-[#4F5E52]">Share it with friends or family looking for organic hair care remedies.</p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={handleShareWhatsApp}
              className="px-4 py-2.5 bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-emerald-800 transition w-full md:w-auto"
            >
              <Share2 className="w-4 h-4" />
              Share on WhatsApp
            </button>
            <Link
              to="/products"
              className="btn-olive px-5 py-2.5 text-xs font-bold text-center w-full md:w-auto shrink-0"
            >
              Shop Veelana Oil
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
