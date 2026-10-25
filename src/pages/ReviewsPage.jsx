import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, MessageCircle, Plus, ShieldCheck, CheckCircle2, ChevronRight, ThumbsUp, Heart, Sparkles, Filter, Edit, Trash2 } from 'lucide-react';
import Testimonials from '../components/Testimonials';
import CustomerReviewModal from '../components/CustomerReviewModal';
import GoogleSignInModal from '../components/GoogleSignInModal';
import { getCmsReviews, getUserReview, deleteCmsReview } from '../services/cmsService';
import { getCurrentUser, decrementUserReviewCount } from '../services/userService';

const GoogleIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.4 7.33 24 12 24z"
    />
    <path
      fill="#FBBC05"
      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.16 0 9.98 0 12s.45 3.84 1.24 5.42l4.04-3.15z"
    />
    <path
      fill="#EA4335"
      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.6 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
    />
  </svg>
);

export default function ReviewsPage() {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [editingTargetReview, setEditingTargetReview] = useState(null);
  const [isGoogleModalOpen, setIsGoogleModalOpen] = useState(false);
  const [reviews, setReviews] = useState(() => getCmsReviews());
  const [currentUser, setCurrentUser] = useState(() => getCurrentUser());
  const [filterRating, setFilterRating] = useState('all');
  const [toastMessage, setToastMessage] = useState('');

  // Check if current user already has submitted a review (1 review per customer rule)
  const myReview = currentUser ? getUserReview(currentUser) : null;


  useEffect(() => {
    const handleCmsUpdate = () => {
      setReviews(getCmsReviews());
    };
    const handleUserUpdate = (e) => {
      setCurrentUser(e.detail || getCurrentUser());
    };

    window.addEventListener('veelana_cms_updated', handleCmsUpdate);
    window.addEventListener('veelana_user_changed', handleUserUpdate);

    return () => {
      window.removeEventListener('veelana_cms_updated', handleCmsUpdate);
      window.removeEventListener('veelana_user_changed', handleUserUpdate);
    };
  }, []);

  const totalReviewsCount = reviews.length;
  const fiveStarReviews = reviews.filter((r) => (r.rating || 5) === 5).length;
  const avgRating = totalReviewsCount > 0 
    ? (reviews.reduce((acc, r) => acc + (r.rating || 5), 0) / totalReviewsCount).toFixed(1)
    : '4.9';

  return (
    <div className="py-10 bg-[#FAF8F5] min-h-[85vh]">
      <title>Customer Reviews &amp; Real Results | Veelana Hair Oil Pakistan</title>
      <meta name="description" content="Read 100% authentic WhatsApp verified reviews from Veelana customers across Lahore, Karachi, Rawalpindi & Sindh. See real before/after hair transformation results. 4.9★ rating." />
      <meta property="og:title" content="Customer Reviews & Real Results | Veelana Hair Oil Pakistan" />
      <meta property="og:description" content="Read 100% authentic WhatsApp verified reviews from Veelana customers across Lahore, Karachi, Rawalpindi & Sindh. See real before/after hair transformation results. 4.9★ rating." />
      <meta property="og:url" content="https://www.veelana.online/reviews" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://www.veelana.online/assets/real_full_set_boxes.webp" />
      <meta name="twitter:title" content="Customer Reviews & Real Results | Veelana Hair Oil Pakistan" />
      <meta name="twitter:description" content="Read 100% authentic WhatsApp verified reviews from Veelana customers across Lahore, Karachi, Rawalpindi & Sindh. See real before/after hair transformation results. 4.9★ rating." />
      <link rel="canonical" href="https://www.veelana.online/reviews" />
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-[#6A7B52] mb-6">
          <Link to="/" className="hover:underline">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 opacity-50" />
          <span className="text-[#1B2E1E] font-bold">Customer Reviews & Proof</span>
        </nav>

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EAEFE4] border border-[#1B2E1E]/20 text-[#1B2E1E] text-xs font-bold uppercase tracking-wider mb-3">
            <Star className="w-4 h-4 text-[#D4AF37] fill-current" />
            Verified Pakistani Customer Feedback
          </div>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-[#121E14] leading-tight">
            Real Results from Real Customers
          </h1>
          <p className="text-sm md:text-base text-[#4F5E52] mt-3">
            Read unedited WhatsApp conversations and customer reviews from families across Lahore, Karachi, Rawalpindi, and Sindh who transformed their hair with Veelana.
          </p>
        </div>

        {/* Social Proof Stats Banner + Write Review Action Bar */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#ECE7DD] shadow-sm mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Left stats */}
          <div className="flex items-center gap-6 sm:gap-8 flex-wrap">
            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-1 text-[#D4AF37]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <div className="text-2xl font-bold text-[#1B2E1E] mt-1 font-serif">
                {avgRating} <span className="text-sm font-sans font-normal text-gray-500">out of 5.0</span>
              </div>
              <span className="text-xs text-[#6A7B52] font-semibold">
                Based on {totalReviewsCount}+ Verified Reviews
              </span>
            </div>

            <div className="hidden sm:block w-px h-12 bg-gray-200" />

            <div className="text-left space-y-1 text-xs text-[#4F5E52]">
              <div className="flex items-center gap-2 font-semibold text-[#1B2E1E]">
                <ShieldCheck className="w-4 h-4 text-[#25D366]" />
                100% Organic & Chemical Free Proof
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#25D366]" />
                {fiveStarReviews} Five-Star Experiences
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-[#E11D48]" />
                94% Reorder & Family Recommendation
              </div>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            {currentUser ? (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-xs font-bold text-[#065F46]">
                <img src={currentUser.avatar} alt={currentUser.name} className="w-5 h-5 rounded-full object-cover" />
                <span>{currentUser.name.split(' ')[0]}</span>
              </div>
            ) : (
              <button
                onClick={() => setIsGoogleModalOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-xs font-bold text-[#1B2E1E] hover:bg-gray-50 transition shadow-sm"
              >
                <GoogleIcon size={16} />
                <span>Sign In with Google</span>
              </button>
            )}

            {/* If user already submitted a review, enforce 1 review: show Edit & Delete instead of duplicate submit */}
            {myReview ? (
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => {
                    setEditingTargetReview(myReview);
                    setIsReviewModalOpen(true);
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#2D6A4F] text-white text-xs md:text-sm font-bold shadow-md hover:bg-[#1B2E1E] transition cursor-pointer"
                  title="You have already submitted a review. Click to edit your review."
                >
                  <Edit className="w-4 h-4 text-[#D4AF37]" />
                  <span>Edit My Review</span>
                </button>
                <button
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete your review?')) {
                      deleteCmsReview(myReview.id);
                      if (currentUser?.email) decrementUserReviewCount(currentUser.email);
                      setReviews(getCmsReviews());
                      setToastMessage('Your review was successfully removed.');
                      setTimeout(() => setToastMessage(''), 4000);
                    }
                  }}
                  className="p-3 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition border border-red-200"
                  title="Delete your review"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setEditingTargetReview(null);
                  setIsReviewModalOpen(true);
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#1B2E1E] text-white text-xs md:text-sm font-bold shadow-lg hover:bg-[#2A3E2E] transition cursor-pointer"
              >
                <Plus className="w-4 h-4 text-[#D4AF37]" />
                <span>Write a Customer Review</span>
              </button>
            )}
          </div>


        </div>

        {/* Toast Notification */}
        {toastMessage && (
          <div className="mb-6 p-4 rounded-xl bg-[#ECFDF5] border border-[#A7F3D0] text-[#065F46] text-xs md:text-sm font-bold flex items-center justify-between shadow-sm">
            <span>{toastMessage}</span>
            <button onClick={() => setToastMessage('')} className="text-[#065F46] hover:opacity-75 font-extrabold text-sm ml-4">✕</button>
          </div>
        )}

        {/* The Verified WhatsApp Chat Proof Showcase & Interactive Slider */}
        <Testimonials />

        {/* Customer Submitted Reviews Grid */}
        <div className="mt-16">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 pb-4 border-b border-[#ECE7DD]">
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#1B2E1E]">
                All Customer Testimonials ({reviews.length})
              </h2>
              <p className="text-xs text-[#6A7B52] mt-1">
                Authentic feedback shared by Veelana users across Pakistan (One review per customer)
              </p>
            </div>

            <div className="flex items-center gap-2">
              {myReview ? (
                <button
                  onClick={() => {
                    setEditingTargetReview(myReview);
                    setIsReviewModalOpen(true);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#EAEFE4] text-[#1B2E1E] text-xs font-bold hover:bg-[#DFE7D6] transition"
                >
                  <Edit className="w-3.5 h-3.5 text-[#2D6A4F]" />
                  <span>Edit My Review</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    setEditingTargetReview(null);
                    setIsReviewModalOpen(true);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#EAEFE4] text-[#1B2E1E] text-xs font-bold hover:bg-[#DFE7D6] transition"
                >
                  <Plus className="w-3.5 h-3.5 text-[#2D6A4F]" />
                  <span>Share Your Review</span>
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((rev) => {
              const isMyCard = currentUser && (
                (currentUser.email && rev.userEmail && currentUser.email.toLowerCase() === rev.userEmail.toLowerCase()) ||
                (currentUser.id && rev.userId === currentUser.id)
              );

              return (
                <div
                  key={rev.id}
                  className={`bg-white rounded-2xl p-6 border ${isMyCard ? 'border-[#2D6A4F] ring-2 ring-[#2D6A4F]/20' : 'border-[#ECE7DD]'} shadow-sm flex flex-col justify-between hover:shadow-md transition relative`}
                >
                  <div>
                    {/* Top user row */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        {rev.image ? (
                          <img
                            src={rev.image}
                            alt={rev.customerName}
                            className="w-11 h-11 rounded-full object-cover border border-gray-200"
                            onError={(e) => {
                              e.currentTarget.src = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(rev.customerName || 'V')}&backgroundColor=1B2E1E`;
                            }}
                          />
                        ) : (
                          <div className="w-11 h-11 rounded-full bg-[#1B2E1E] text-white flex items-center justify-center font-bold text-sm">
                            {(rev.customerName || 'V')[0]}
                          </div>
                        )}
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h4 className="font-bold text-sm text-[#1B2E1E]">
                              {rev.customerName || 'Verified Customer'}
                            </h4>
                            {isMyCard && (
                              <span className="text-[10px] bg-[#EAEFE4] text-[#1B2E1E] px-1.5 py-0.5 rounded font-bold">
                                You
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-[#6A7B52] block">
                            📍 {rev.location || 'Pakistan'}
                          </span>
                        </div>
                      </div>

                      <div className="flex text-[#D4AF37]">
                        {[...Array(rev.rating || 5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                    </div>

                    {/* Highlight pill */}
                    {rev.highlight && (
                      <div className="inline-block px-3 py-1 rounded-full bg-[#ECFDF5] text-[#065F46] text-xs font-bold mb-3">
                        ✨ {rev.highlight}
                      </div>
                    )}

                    {/* Quote */}
                    <p className="text-xs md:text-sm text-[#2A361E] italic leading-relaxed mb-4">
                      "{rev.quote}"
                    </p>
                  </div>

                  {/* Footer specs & Actions */}
                  <div>
                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                      <span className="font-medium text-[#4F5D38]">
                        📦 {rev.bottlePurchased || '200ml Bottle'}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[#047857] font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Verified
                      </span>
                    </div>

                    {/* Customer Edit/Delete buttons if this is their review or customer-submitted */}
                    {(isMyCard || rev.isCustomerSubmitted) && (
                      <div className="mt-3 pt-2 border-t border-dashed border-gray-200 flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setEditingTargetReview(rev);
                            setIsReviewModalOpen(true);
                          }}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold text-[#1B2E1E] bg-[#FAF8F5] border border-gray-200 hover:bg-gray-100 transition"
                          title="Edit this review"
                        >
                          <Edit className="w-3 h-3 text-[#2D6A4F]" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Are you sure you want to delete this review from ${rev.customerName}?`)) {
                              deleteCmsReview(rev.id);
                              if (rev.userEmail) decrementUserReviewCount(rev.userEmail);
                              setReviews(getCmsReviews());
                              setToastMessage('Review successfully deleted.');
                              setTimeout(() => setToastMessage(''), 4000);
                            }
                          }}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold text-red-600 bg-red-50 border border-red-200 hover:bg-red-100 transition"
                          title="Delete this review"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Delete</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Customer Review Submission & Edit Modal */}
      <CustomerReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => {
          setIsReviewModalOpen(false);
          setEditingTargetReview(null);
        }}
        initialReview={editingTargetReview}
        existingUserReview={myReview}
        onReviewSubmitted={(newRev) => {
          setReviews(getCmsReviews());
          setToastMessage(newRev ? (editingTargetReview ? 'Your review was updated successfully!' : 'Thank you! Your review has been published.') : 'Review updated.');
          setTimeout(() => setToastMessage(''), 4000);
        }}
        onReviewDeleted={(deletedId) => {
          setReviews(getCmsReviews());
          setToastMessage('Your review has been permanently removed.');
          setTimeout(() => setToastMessage(''), 4000);
        }}
      />

      {/* Google Sign In Modal */}
      <GoogleSignInModal
        isOpen={isGoogleModalOpen}
        onClose={() => setIsGoogleModalOpen(false)}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
        }}
      />
    </div>
  );
}


