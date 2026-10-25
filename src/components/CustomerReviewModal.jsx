import React, { useState, useEffect } from 'react';
import { X, Star, Upload, Sparkles, CheckCircle2, ShieldCheck, Camera, MessageCircle, MapPin, User, Package, Edit, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { addCmsReview, updateCmsReview, deleteCmsReview } from '../services/cmsService';
import { getCurrentUser, incrementUserReviewCount, decrementUserReviewCount } from '../services/userService';

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

export default function CustomerReviewModal({ isOpen, onClose, onReviewSubmitted, onReviewDeleted, initialReview = null, existingUserReview = null }) {
  const [currentUser, setCurrentUser] = useState(() => getCurrentUser());
  const [isEditing, setIsEditing] = useState(false);
  const [reviewId, setReviewId] = useState(null);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [customerName, setCustomerName] = useState('');
  const [location, setLocation] = useState('');
  const [bottlePurchased, setBottlePurchased] = useState('200ml Master Bottle');
  const [highlight, setHighlight] = useState('');
  const [quote, setQuote] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successAction, setSuccessAction] = useState('submitted'); // 'submitted', 'updated', 'deleted'
  const [errorMessage, setErrorMessage] = useState('');
  const [lastSubmittedReview, setLastSubmittedReview] = useState(null);


  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);

    const targetReview = initialReview || existingUserReview;

    if (targetReview) {
      setIsEditing(true);
      setReviewId(targetReview.id);
      setRating(targetReview.rating || 5);
      setCustomerName(targetReview.customerName || (user ? user.name : ''));
      setLocation(targetReview.location || '');
      setBottlePurchased(targetReview.bottlePurchased || '200ml Master Bottle');
      setHighlight(targetReview.highlight || '');
      setQuote(targetReview.quote || '');
      setImagePreview(targetReview.image || '');
    } else {
      setIsEditing(false);
      setReviewId(null);
      setRating(5);
      setCustomerName(user ? user.name || '' : '');
      setLocation('');
      setBottlePurchased('200ml Master Bottle');
      setHighlight('');
      setQuote('');
      setImagePreview('');
    }
    setErrorMessage('');
    setIsSuccess(false);
  }, [isOpen, initialReview, existingUserReview]);

  if (!isOpen) return null;

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please select a valid image file (JPG, PNG, WEBP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxDim = 800;
        let { width, height } = img;
        if (width > height) {
          if (width > maxDim) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          }
        } else {
          if (height > maxDim) {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        const compressed = canvas.toDataURL('image/webp', 0.85);
        setImagePreview(compressed);
        setErrorMessage('');
      };
      img.src = uploadEvent.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleDeleteReview = () => {
    if (!reviewId) return;
    if (!window.confirm('Are you sure you want to delete your review? This cannot be undone.')) {
      return;
    }

    setIsSubmitting(true);
    try {
      deleteCmsReview(reviewId);

      const targetEmail = currentUser?.email || (initialReview?.userEmail) || (existingUserReview?.userEmail);
      if (targetEmail) {
        decrementUserReviewCount(targetEmail);
      }

      setSuccessAction('deleted');
      setIsSuccess(true);

      if (onReviewDeleted) {
        onReviewDeleted(reviewId);
      } else if (onReviewSubmitted) {
        onReviewSubmitted(null);
      }

      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 2000);
    } catch (err) {
      console.error(err);
      setErrorMessage('Failed to delete review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customerName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!quote.trim()) {
      setErrorMessage('Please share your hair oil experience / review.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const reviewPayload = {
        customerName: customerName.trim(),
        location: location.trim() || 'Pakistan',
        bottlePurchased: bottlePurchased,
        rating: rating || 5,
        highlight: highlight.trim() || (rating >= 4 ? 'Remarkable Results' : 'Customer Experience'),
        quote: quote.trim(),
        image: imagePreview || (currentUser ? currentUser.avatar : '/assets/reviews/review_stronger_hair.jpeg'),
        verified: true,
        isCustomerSubmitted: true,
        userEmail: currentUser?.email || (initialReview?.userEmail) || (existingUserReview?.userEmail) || '',
        userId: currentUser?.id || (initialReview?.userId) || (existingUserReview?.userId) || '',
        googleUser: !!currentUser,
        status: 'approved',
        updatedAt: new Date().toISOString(),
      };

      if (isEditing && reviewId) {
        // UPDATE EXISTING REVIEW
        updateCmsReview(reviewId, reviewPayload);
        setSuccessAction('updated');
        setLastSubmittedReview({ ...reviewPayload, id: reviewId });
        setIsSuccess(true);
        if (onReviewSubmitted) {
          onReviewSubmitted({ ...reviewPayload, id: reviewId });
        }
      } else {
        // PREVENT MULTIPLE REVIEWS: Check if customer already submitted one
        if (existingUserReview) {
          setErrorMessage('You have already submitted a review. You can edit your existing review instead.');
          setIsSubmitting(false);
          return;
        }

        reviewPayload.submittedAt = new Date().toISOString();
        const updatedList = addCmsReview(reviewPayload);
        const newlyCreated = updatedList[0];

        if (currentUser?.email) {
          incrementUserReviewCount(currentUser.email);
        }

        setSuccessAction('submitted');
        setLastSubmittedReview(newlyCreated);
        setIsSuccess(true);

        // Confetti celebration
        try {
          confetti({
            particleCount: 70,
            spread: 60,
            origin: { y: 0.6 },
            colors: ['#D4AF37', '#1B2E1E', '#25D366', '#8A9A86']
          });
        } catch (err) {}

        if (onReviewSubmitted) {
          onReviewSubmitted(newlyCreated);
        }
      }

    } catch (err) {
      console.error(err);
      setErrorMessage('Failed to save review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999999,
        background: 'rgba(18, 30, 20, 0.75)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        overflowY: 'auto',
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#FFFFFF',
          borderRadius: '24px',
          maxWidth: '540px',
          width: '100%',
          overflow: 'hidden',
          boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
          border: '1px solid rgba(79, 93, 56, 0.2)',
          position: 'relative',
          maxHeight: '94vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <div style={{ background: '#FAF8F5', padding: '1.25rem 1.5rem', borderBottom: '1px solid #ECE7DD', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#EAEFE4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Star style={{ width: '18px', height: '18px', color: '#D4AF37', fill: '#D4AF37' }} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#1B2E1E', margin: 0 }}>
                {isEditing ? 'Edit Your Review' : 'Write Customer Review'}
              </h3>
              <span style={{ fontSize: '0.72rem', color: '#6A7B52', fontWeight: '600' }}>
                {isEditing 
                  ? 'Update your experience, star rating, or photos' 
                  : 'Share your authentic hair transformation with Veelana (1 review per customer)'}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#7A8C74', padding: '4px' }}
          >
            <X style={{ width: '20px', height: '20px' }} />
          </button>
        </div>

        {/* Form Body */}
        <div style={{ padding: '1.5rem', overflowY: 'auto' }}>
          {isSuccess ? (
            <div style={{ textAlign: 'center', padding: '2.5rem 1rem' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: successAction === 'deleted' ? '#FEF2F2' : '#ECFDF5', border: `2px solid ${successAction === 'deleted' ? '#DC2626' : '#059669'}`, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                {successAction === 'deleted' ? (
                  <Trash2 style={{ width: '32px', height: '32px', color: '#DC2626' }} />
                ) : (
                  <CheckCircle2 style={{ width: '36px', height: '36px', color: '#059669' }} />
                )}
              </div>
              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 'bold', color: '#1B2E1E', margin: '0 0 0.5rem' }}>
                {successAction === 'deleted' 
                  ? 'Review Deleted' 
                  : successAction === 'updated' 
                  ? 'Review Successfully Updated!' 
                  : 'Thank You for Your Feedback!'}
              </h4>
              <p style={{ fontSize: '0.9rem', color: '#5F7057', maxWidth: '380px', margin: '0 auto 1.5rem', lineHeight: 1.5 }}>
                {successAction === 'deleted'
                  ? 'Your review has been permanently removed from the website.'
                  : successAction === 'updated'
                  ? 'Your updated feedback and rating are now live on the site.'
                  : 'Your review has been successfully submitted and added to the official Veelana social proof showcase.'}
              </p>

              {successAction !== 'deleted' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '320px', margin: '0 auto' }}>
                  <button
                    type="button"
                    onClick={() => {
                      const starsText = '⭐'.repeat(rating || 5);
                      const waMessage = `🌿 *CUSTOMER REVIEW FOR VEELANA*\n--------------------------------\n👤 *Name:* ${customerName}\n📍 *City:* ${location || 'Pakistan'}\n📦 *Bottle:* ${bottlePurchased}\n${starsText} (${rating}/5)\n✨ *Highlight:* ${highlight || 'Great result'}\n💬 *Review:* "${quote}"\n--------------------------------\nShared via veelana.online`;
                      window.open(`https://wa.me/923061041609?text=${encodeURIComponent(waMessage)}`, '_blank');
                    }}
                    style={{
                      background: '#25D366',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '0.75rem 1.25rem',
                      fontWeight: '700',
                      fontSize: '0.88rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      cursor: 'pointer',
                      boxShadow: '0 4px 15px rgba(37, 211, 102, 0.3)',
                    }}
                  >
                    <MessageCircle style={{ width: '18px', height: '18px' }} />
                    <span>Share to WhatsApp Official</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsSuccess(false);
                      onClose();
                    }}
                    style={{
                      background: '#1B2E1E',
                      color: '#FAF8F5',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '0.65rem 1.25rem',
                      fontWeight: '700',
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                    }}
                  >
                    Done & View Reviews
                  </button>
                </div>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
              
              {/* Google Verified Banner if Logged In */}
              {currentUser ? (
                <div style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '12px', padding: '0.65rem 0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div>
                      <div style={{ fontSize: '0.8rem', fontWeight: '700', color: '#065F46' }}>
                        Posting as {currentUser.name}
                      </div>
                      <div style={{ fontSize: '0.68rem', color: '#047857' }}>
                        {currentUser.email}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#047857', fontSize: '0.72rem', fontWeight: 'bold' }}>
                    <GoogleIcon size={14} />
                    <span>Verified</span>
                  </div>
                </div>
              ) : null}


              {/* Star Rating Picker */}
              <div style={{ textAlign: 'center', background: '#FAF8F5', borderRadius: '16px', padding: '1rem', border: '1px solid #ECE7DD' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#6A7B52', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.5rem' }}>
                  Your Overall Experience Rating
                </span>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', transition: 'transform 0.15s' }}
                    >
                      <Star
                        style={{
                          width: '32px',
                          height: '32px',
                          color: (hoverRating || rating) >= star ? '#D4AF37' : '#D1D5DB',
                          fill: (hoverRating || rating) >= star ? '#D4AF37' : 'none',
                        }}
                      />
                    </button>
                  ))}
                </div>
                <div style={{ fontSize: '0.82rem', fontWeight: '800', color: '#1B2E1E', marginTop: '4px' }}>
                  {rating === 5 && '⭐⭐⭐⭐⭐ Exceptional (5 / 5)'}
                  {rating === 4 && '⭐⭐⭐⭐ Very Good (4 / 5)'}
                  {rating === 3 && '⭐⭐⭐ Good (3 / 5)'}
                  {rating === 2 && '⭐⭐ Fair (2 / 5)'}
                  {rating === 1 && '⭐ Needs Improvement (1 / 5)'}
                </div>
              </div>

              {/* Name & City */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.85rem' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: '700', color: '#1B2E1E', display: 'block', marginBottom: '4px' }}>
                    Your Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Sana Malik"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                    style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '10px', border: '1px solid #D6D0C2', fontSize: '0.88rem', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: '700', color: '#1B2E1E', display: 'block', marginBottom: '4px' }}>
                    City / Location *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Lahore, Punjab"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                    style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '10px', border: '1px solid #D6D0C2', fontSize: '0.88rem', outline: 'none' }}
                  />
                </div>
              </div>

              {/* Bottle Used & Headline Highlight */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.85rem' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: '700', color: '#1B2E1E', display: 'block', marginBottom: '4px' }}>
                    Bottle / Pack Used
                  </label>
                  <select
                    value={bottlePurchased}
                    onChange={(e) => setBottlePurchased(e.target.value)}
                    style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '10px', border: '1px solid #D6D0C2', fontSize: '0.88rem', background: '#FFFFFF', outline: 'none' }}
                  >
                    <option value="200ml Master Bottle">200ml Master Bottle (Best Value)</option>
                    <option value="100ml Starter Bottle">100ml Starter Bottle</option>
                    <option value="Twin Pack (2x 200ml)">Twin Pack (2x 200ml Family)</option>
                    <option value="Family Bundle Pack">Family Hair Rescue Bundle</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: '700', color: '#1B2E1E', display: 'block', marginBottom: '4px' }}>
                    Headline / Key Result
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Hair fall stopped in 2 weeks!"
                    value={highlight}
                    onChange={(e) => setHighlight(e.target.value)}
                    style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '10px', border: '1px solid #D6D0C2', fontSize: '0.88rem', outline: 'none' }}
                  />
                </div>
              </div>

              {/* Review Text */}
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: '700', color: '#1B2E1E', display: 'block', marginBottom: '4px' }}>
                  Detailed Review & Experience *
                </label>
                <textarea
                  rows={3}
                  placeholder="How did Veelana help your hair? Share texture, fragrance, growth, or baby hairs..."
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  required
                  style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '10px', border: '1px solid #D6D0C2', fontSize: '0.88rem', outline: 'none', fontFamily: 'inherit' }}
                />
              </div>

              {/* Photo Upload */}
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: '700', color: '#1B2E1E', display: 'block', marginBottom: '4px' }}>
                  Attach Photo / WhatsApp Screenshot (Optional)
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <label
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '0.55rem 1rem',
                      borderRadius: '10px',
                      background: '#FAF8F5',
                      border: '1.5px dashed #B8C2B3',
                      cursor: 'pointer',
                      fontSize: '0.82rem',
                      fontWeight: '700',
                      color: '#1B2E1E',
                    }}
                  >
                    <Camera style={{ width: '16px', height: '16px', color: '#4F5D38' }} />
                    <span>Upload Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      style={{ display: 'none' }}
                    />
                  </label>

                  {imagePreview && (
                    <div style={{ position: 'relative', width: '48px', height: '48px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #D6D0C2' }}>
                      <img src={imagePreview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <button
                        type="button"
                        onClick={() => setImagePreview('')}
                        style={{ position: 'absolute', top: 2, right: 2, background: 'rgba(0,0,0,0.6)', color: '#fff', border: 'none', borderRadius: '50%', width: '16px', height: '16px', fontSize: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        ×
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {errorMessage && (
                <div style={{ fontSize: '0.78rem', color: '#B91C1C', fontWeight: 'bold' }}>
                  {errorMessage}
                </div>
              )}

              {/* Submit and Action Buttons */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginTop: '0.5rem' }}>
                {isEditing && reviewId ? (
                  <button
                    type="button"
                    onClick={handleDeleteReview}
                    disabled={isSubmitting}
                    style={{
                      padding: '0.65rem 1rem',
                      background: '#FEF2F2',
                      color: '#DC2626',
                      border: '1px solid #FCA5A5',
                      borderRadius: '10px',
                      fontWeight: '700',
                      fontSize: '0.82rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px'
                    }}
                  >
                    <Trash2 style={{ width: '14px', height: '14px' }} />
                    <span>Delete Review</span>
                  </button>
                ) : (
                  <div />
                )}

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button
                    type="button"
                    onClick={onClose}
                    style={{ padding: '0.65rem 1.25rem', background: '#F1ECE1', color: '#4A5543', border: 'none', borderRadius: '10px', fontWeight: '700', fontSize: '0.85rem', cursor: 'pointer' }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      padding: '0.65rem 1.6rem',
                      background: '#1B2E1E',
                      color: '#FAF8F5',
                      border: 'none',
                      borderRadius: '10px',
                      fontWeight: '800',
                      fontSize: '0.88rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      boxShadow: '0 4px 15px rgba(27, 46, 30, 0.2)',
                      opacity: isSubmitting ? 0.7 : 1,
                    }}
                  >
                    <Sparkles style={{ width: '16px', height: '16px', color: '#D4AF37' }} />
                    <span>{isSubmitting ? 'Saving...' : isEditing ? 'Update Review' : 'Post Customer Review'}</span>
                  </button>
                </div>
              </div>


            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
