import React from 'react';
import BlogSection from '../components/BlogSection';
import { BookOpen } from 'lucide-react';

export default function BlogPage() {
  return (
    <div className="py-12 bg-[#FAF8F5]">
      <title>Hair Care & Scalp Health Articles | Veelana Botanical Blog</title>
      <meta name="description" content="Read expert guides on natural hair growth, 25+ cold-pressed herbs, anti-hair-fall routines, and scalp care tips from the Veelana botanical research team." />
      <meta property="og:title" content="Hair Care & Scalp Health Articles | Veelana Botanical Blog" />
      <meta property="og:description" content="Read expert guides on natural hair growth, 25+ cold-pressed herbs, anti-hair-fall routines, and scalp care tips from the Veelana botanical research team." />
      <meta property="og:url" content="https://www.veelana.online/blog" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://www.veelana.online/assets/real_full_set_boxes.webp" />
      <meta name="twitter:title" content="Hair Care & Scalp Health Articles | Veelana Botanical Blog" />
      <meta name="twitter:description" content="Read expert guides on natural hair growth, 25+ cold-pressed herbs, anti-hair-fall routines, and scalp care tips." />
      <link rel="canonical" href="https://www.veelana.online/blog" />
      <BlogSection />
    </div>
  );
}
