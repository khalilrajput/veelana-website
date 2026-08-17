import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Testimonials() {
  const reviews = [
    {
      id: 1,
      name: 'Ayesha Khan',
      city: 'Lahore',
      rating: 5,
      bottle: '200ml Value Pack',
      text: 'Veelana completely saved my post-partum hair loss! Within 4 weeks of massaging my scalp twice a week, I noticed baby hair sprouting along my hairline. The natural herbal aroma is so comforting.',
      verified: true
    },
    {
      id: 2,
      name: 'Fatima Zaidi',
      city: 'Islamabad',
      rating: 5,
      bottle: '100ml Trial Size',
      text: 'I was skeptical because my scalp is very oily, but this oil is cold-pressed and absorbs so quickly. No greasiness at all! My hair feels twice as dense and incredibly soft.',
      verified: true
    },
    {
      id: 3,
      name: 'Muhammad Usman',
      city: 'Multan',
      rating: 5,
      bottle: '200ml Value Pack',
      text: 'Ordered online with express delivery to Multan. Received my 200ml bottle in pristine condition. My crown thinning has noticeably reduced. 100% genuine herbal quality!',
      verified: true
    },
    {
      id: 4,
      name: 'Zainab Bibi',
      city: 'Karachi',
      rating: 5,
      bottle: '200ml Value Pack',
      text: 'Free from chemical smell! You can literally see the pure rich botanical color. My split ends are gone and my long hair has never looked so glossy and healthy.',
      verified: true
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [reviews.length]);

  const prevReview = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  return (
    <section id="reviews" className="reviews-section">
      <div className="container">
        
        {/* Header */}
        <div className="text-center">
          <div className="section-badge" style={{ background: 'rgba(27, 46, 30, 0.1)', color: '#1B2E1E', borderColor: 'rgba(27, 46, 30, 0.2)' }}>
            <Star className="w-4 h-4 text-[#D4AF37] fill-current" />
            Verified Customer Feedback
          </div>
          <h2 className="section-title" style={{ color: '#121E14' }}>
            Loved by Thousands Across Pakistan
          </h2>
          <p className="section-subtitle" style={{ color: '#4F5E52' }}>
            Real stories from customers who transformed their hair health with Veelana.
          </p>
        </div>

        {/* Carousel Card Box */}
        <div style={{ maxWidth: '750px', margin: '2rem auto 0', position: 'relative' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={reviews[currentIndex].id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.5 }}
              className="review-box"
            >
              <Quote className="w-10 h-10 text-[#D4AF37]" style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
              
              {/* 5 Stars */}
              <div style={{ display: 'flex', justifyCenter: 'center', justifyContent: 'center', gap: '0.25rem', marginBottom: '1.25rem' }}>
                {[...Array(reviews[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-[#D4AF37] fill-current" />
                ))}
              </div>

              {/* Review Text */}
              <p className="review-quote">
                "{reviews[currentIndex].text}"
              </p>

              {/* Author details */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 'bold', color: '#121E14' }}>
                  {reviews[currentIndex].name}
                </h4>
                <span style={{ fontSize: '0.8rem', color: '#4F5E52', fontWeight: '500' }}>
                  {reviews[currentIndex].city}, Pakistan • Purchased {reviews[currentIndex].bottle}
                </span>

                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.72rem', color: '#25D366', background: '#1B2E1E', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontWeight: 'bold', marginTop: '0.75rem' }}>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Verified Buyer
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Slider Navigation Buttons */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
            <button
              onClick={prevReview}
              style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#1B2E1E', color: '#D4AF37', display: 'flex', alignItems: 'center', justifyCenter: 'center', justifyContent: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}
              aria-label="Previous Testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Pagination Dots */}
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  style={{
                    height: '10px',
                    borderRadius: '9999px',
                    width: currentIndex === idx ? '30px' : '10px',
                    background: currentIndex === idx ? '#D4AF37' : 'rgba(27, 46, 30, 0.3)',
                    transition: 'all 0.3s ease'
                  }}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextReview}
              style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#1B2E1E', color: '#D4AF37', display: 'flex', alignItems: 'center', justifyCenter: 'center', justifyContent: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}
              aria-label="Next Testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
