// Veelana Central CMS Service (WordPress-style dynamic store management)
const CMS_STORAGE_KEY = 'veelana_site_cms_v1';
const MEDIA_STORAGE_KEY = 'veelana_media_library_v1';
const REVIEWS_STORAGE_KEY = 'veelana_cms_reviews_v1';
const FAQS_STORAGE_KEY = 'veelana_cms_faqs_v1';

export const DEFAULT_SITE_SETTINGS = {
  brandName: 'VEELANA',
  brandSubtitle: 'HERBAL HAIR CARE',
  brandLogo: '/assets/official_png_logo.webp',
  whatsappPhone: '923061041609',
  whatsappDisplay: '+92 306 1041609',
  contactEmail: 'veelanaofficial@gmail.com',
  contactAddress: 'Punjab, Pakistan (Nationwide COD Courier Delivery)',
  shippingFee: 199,
  freeShippingThreshold: 3000,
  currency: 'Rs.',
  socialInstagram: 'https://www.instagram.com/veelaan.official?utm_source=qr&igsi=bWl1dTFta3l4cGI1',
  socialFacebook: 'https://www.facebook.com/profile.php?id=61592935558371',
};

export const DEFAULT_HERO_CONTENT = {
  badgeText: 'Pure Botanical Root Elixir',
  headlinePart1: 'Beauty Begins at the',
  headlineHighlight: 'Roots',
  subtitle: 'Nourish your scalp with 26 cold-pressed herbs. Formulated to revive dormant follicles, eliminate hair fall, and boost rich natural volume. Direct fresh artisan batch dispatch across Pakistan.',
  image: '/assets/real_250ml_single.webp',
  cta1Text: 'Get 200ml Pack — Rs. 1,899',
  cta1Size: '200ml',
  cta2Text: 'Get 100ml Trial — Rs. 999',
  cta2Size: '100ml',
  microcopy: 'Cash on Delivery Across Pakistan • Fresh Cold-Pressed Batches • 7-Day Exchange Support',
  trustSpecs: [
    '25+ Cold-Pressed Herbs',
    'Paraben & Sulphate Free',
    'Mineral Oil Free',
    '100% Organic & Vegan'
  ]
};

export const DEFAULT_ANNOUNCEMENTS = [
  '🌿 100% Organic & Cold-Pressed Herbal Hair Care • Pure Botanical Extract',
  '🚚 Cash on Delivery Across Pakistan • Free Shipping on Rs. 3,000+',
  '🎁 Use Coupon SAVE10 for 10% Off Your Order Today!',
  '💬 WhatsApp Direct Support & Dispatch: +92 306 1041609'
];

export const DEFAULT_FLASH_BANNER = {
  enabled: true,
  text: 'Exclusive 200ml Discount Offer: 1 Bottle for Rs. 1,899 | 2 Bottles for Rs. 3,499 (Free Delivery)!'
};

export const DEFAULT_MEDIA = [
  { id: 'img_1', name: '200ml Master Bottle', url: '/assets/real_250ml_single.webp', isPreset: true },
  { id: 'img_2', name: '100ml Starter Bottle', url: '/assets/real_100ml_double.webp', isPreset: true },
  { id: 'img_3', name: 'Twin Pack (2x 200ml)', url: '/assets/real_250ml_and_100ml.webp', isPreset: true },
  { id: 'img_4', name: 'Full Set Boxes & Packaging', url: '/assets/real_full_set_boxes.webp', isPreset: true },
  { id: 'img_5', name: 'Veelana Official Logo', url: '/assets/official_png_logo.webp', isPreset: true },
  { id: 'img_6', name: 'Review Umerkot Sindh', url: '/assets/reviews/review_umerkot_sindh.jpeg', isPreset: true },
  { id: 'img_7', name: 'Review Hair Thickening', url: '/assets/reviews/review_hair_thickening.jpeg', isPreset: true },
  { id: 'img_8', name: 'Review Baby Hair Turkey', url: '/assets/reviews/review_baby_hair_turkey.jpeg', isPreset: true },
  { id: 'img_9', name: 'Review Stronger Hair', url: '/assets/reviews/review_stronger_hair.jpeg', isPreset: true },
  { id: 'img_10', name: 'Review Repeat Order 200ml', url: '/assets/reviews/review_repeat_order_200ml.jpeg', isPreset: true },
];

export const DEFAULT_REVIEWS = [
  {
    id: 'rev_1',
    customerName: 'Ayesha K.',
    location: 'Umerkot, Sindh',
    bottlePurchased: '200ml Master Bottle',
    rating: 5,
    quote: 'Mery baal repair ho rhy Hain 😍 mujhe yaqeen nhi ho rha k itni speed sy ye oil kaam kry ga. Shukriya Veelana..',
    highlight: 'Heat Damaged Hair Repaired in 4 Weeks',
    image: '/assets/reviews/review_umerkot_sindh.jpeg',
    verified: true,
  },
  {
    id: 'rev_2',
    customerName: 'Hassan R.',
    location: 'Rawalpindi / Islamabad',
    bottlePurchased: '100ml Starter Bottle',
    rating: 5,
    quote: 'Yr apke oil ny kamaal kr diya. Maine hair pehly sy zada moty hogye or zada b hogye.',
    highlight: 'Hair Became Noticeably Thicker & Denser',
    image: '/assets/reviews/review_hair_thickening.jpeg',
    verified: true,
  },
  {
    id: 'rev_3',
    customerName: 'Fatima B.',
    location: 'Lahore, Punjab',
    bottlePurchased: '200ml Bottle (Reordered 2 for Daughter)',
    rating: 5,
    quote: 'Alhamdulillah bohat acha result mila. Hair fall bhi kaafi kam ho gaya hai aur new baby hairs bhi aa rahe hain. 2 bottles aur bhej dein, maine apni beti ko Turkey bhejni hain.',
    highlight: 'Baby Hairs Sprouted + Repeat Order to Turkey',
    image: '/assets/reviews/review_baby_hair_turkey.jpeg',
    verified: true,
  },
  {
    id: 'rev_4',
    customerName: 'Zainab M.',
    location: 'Karachi, Sindh',
    bottlePurchased: '100ml Bottle',
    rating: 5,
    quote: 'Meri soch sy zada achha oil nikla ❤️ Mere thin hair wala masla almost khatam ho gaya hai. Baal pehle sy zyada strong aur healthy feel ho rahe hain. Thankyou Veelana! 👏',
    highlight: 'Thin Hair Problem Solved & Roots Strengthened',
    image: '/assets/reviews/review_stronger_hair.jpeg',
    verified: true,
  },
  {
    id: 'rev_5',
    customerName: 'Maryam S.',
    location: 'Lahore, Punjab',
    bottlePurchased: '200ml Twin Pack',
    rating: 5,
    quote: 'Main ne oil use kiya aur Alhamdulillah bohot acha result mila! Hair fall bohot kam ho gaya hai, new baby hairs bhi aana start ho gaye hain. 2 bottle aur bhej den meri beti ke liye...',
    highlight: 'New Baby Hair Growth & 100% Satisfaction',
    image: '/assets/reviews/review_repeat_order_200ml.jpeg',
    verified: true,
  }
];

export const DEFAULT_FAQS = [
  {
    id: 'faq_1',
    category: 'usage',
    q: 'How quickly can I expect to see results with Veelana Hair Oil?',
    a: 'Most users notice a visible reduction in hair fall within 7 to 14 days of consistent application (3 times a week). For new hair growth along thin hairlines and crown density, best results appear around 4 to 6 weeks as dormant follicles awaken.'
  },
  {
    id: 'faq_2',
    category: 'usage',
    q: 'How should I apply the oil for maximum follicle absorption?',
    a: 'Warm 10-15ml of Veelana oil between your palms and massage gently into your scalp using your fingertips for 5 minutes in upward circular motions. Leave overnight or for at least 2 hours before washing with a mild, sulphate-free shampoo.'
  },
  {
    id: 'faq_3',
    category: 'usage',
    q: 'Can men use Veelana for beard growth and receding hairlines?',
    a: 'Yes! Veelana’s cold-pressed Amla, Bhringraj, and Rosemary infusion works equally well for men dealing with crown thinning, beard patchiness, or hairline recession.'
  },
  {
    id: 'faq_4',
    category: 'formula',
    q: 'Is Veelana Hair Oil safe for colored or chemically treated hair?',
    a: 'Yes, 100%! Veelana contains zero harsh mineral oils, synthetic dyes, parabens, or sulphates. Its cold-pressed botanical lipids lock in natural moisture without stripping hair dye or keratin treatments.'
  },
  {
    id: 'faq_5',
    category: 'formula',
    q: 'Does it leave a greasy or heavy residue after washing?',
    a: 'No. Because Veelana is made exclusively with lightweight, unrefined cold-pressed botanical oils (and 0% heavy liquid paraffin), it washes out effortlessly with standard shampoo leaving your hair light, voluminous, and soft.'
  },
  {
    id: 'faq_6',
    category: 'shipping',
    q: 'How long does nationwide delivery take across Pakistan?',
    a: 'Orders placed before 2:00 PM are dispatched on the same working day. Delivery typically takes 2 to 3 business days across major cities in Pakistan (Lahore, Karachi, Islamabad, Rawalpindi, Multan, Faisalabad, Peshawar, Quetta, etc.).'
  },
  {
    id: 'faq_7',
    category: 'shipping',
    q: 'Are shipping charges included or free?',
    a: 'We offer FREE Delivery across Pakistan on all orders above Rs. 3,000 (such as the Veelana Twin Pack 2x 200ml). For smaller orders, a standard courier delivery fee of Rs. 199 applies.'
  }
];

function notifyCmsUpdate(detail) {
  try {
    window.dispatchEvent(new CustomEvent('veelana_cms_updated', { detail }));
  } catch (e) {
    console.error(e);
  }
}

// 1. SITE SETTINGS & HERO & ANNOUNCEMENTS & FLASH BANNER
export function getCmsSettings() {
  try {
    const raw = localStorage.getItem(CMS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        siteSettings: { ...DEFAULT_SITE_SETTINGS, ...(parsed.siteSettings || {}) },
        heroContent: { ...DEFAULT_HERO_CONTENT, ...(parsed.heroContent || {}) },
        announcements: Array.isArray(parsed.announcements) && parsed.announcements.length > 0 ? parsed.announcements : DEFAULT_ANNOUNCEMENTS,
        flashSaleBanner: { ...DEFAULT_FLASH_BANNER, ...(parsed.flashSaleBanner || {}) }
      };
    }
  } catch (e) {
    console.error('Failed to read CMS settings', e);
  }
  return {
    siteSettings: DEFAULT_SITE_SETTINGS,
    heroContent: DEFAULT_HERO_CONTENT,
    announcements: DEFAULT_ANNOUNCEMENTS,
    flashSaleBanner: DEFAULT_FLASH_BANNER
  };
}

export function saveCmsSettings(data) {
  try {
    const current = getCmsSettings();
    const updated = {
      siteSettings: { ...current.siteSettings, ...(data.siteSettings || {}) },
      heroContent: { ...current.heroContent, ...(data.heroContent || {}) },
      announcements: data.announcements || current.announcements,
      flashSaleBanner: { ...current.flashSaleBanner, ...(data.flashSaleBanner || {}) }
    };
    localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(updated));
    notifyCmsUpdate(updated);
    return true;
  } catch (e) {
    console.error('Failed to save CMS settings', e);
    return false;
  }
}

// 2. MEDIA LIBRARY
export function getMediaLibrary() {
  try {
    const raw = localStorage.getItem(MEDIA_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Failed to read media library', e);
  }
  return DEFAULT_MEDIA;
}

export function saveMediaLibrary(mediaList) {
  try {
    localStorage.setItem(MEDIA_STORAGE_KEY, JSON.stringify(mediaList));
    notifyCmsUpdate({ mediaLibrary: mediaList });
    return true;
  } catch (e) {
    console.error('Failed to save media library', e);
    return false;
  }
}

export function addMediaItem(item) {
  const current = getMediaLibrary();
  const newItem = {
    id: `media_${Date.now()}`,
    name: item.name || 'Uploaded Image',
    url: item.url,
    createdAt: new Date().toISOString(),
    isPreset: false
  };
  const updated = [newItem, ...current];
  saveMediaLibrary(updated);
  return updated;
}

export function deleteMediaItem(id) {
  const current = getMediaLibrary();
  const updated = current.filter(m => m.id !== id);
  saveMediaLibrary(updated);
  return updated;
}

// 3. REVIEWS
export function getCmsReviews() {
  try {
    const raw = localStorage.getItem(REVIEWS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error(e);
  }
  return DEFAULT_REVIEWS;
}

export function saveCmsReviews(reviews) {
  try {
    localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(reviews));
    notifyCmsUpdate({ reviews });
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

export function addCmsReview(rev) {
  const current = getCmsReviews();
  const newRev = {
    ...rev,
    id: `rev_${Date.now()}`,
    verified: rev.verified !== false,
    rating: rev.rating || 5
  };
  const updated = [newRev, ...current];
  saveCmsReviews(updated);
  return updated;
}

export function updateCmsReview(id, updatedFields) {
  const current = getCmsReviews();
  const updated = current.map(r => r.id === id ? { ...r, ...updatedFields } : r);
  saveCmsReviews(updated);
  return updated;
}

export function deleteCmsReview(id) {
  const current = getCmsReviews();
  const updated = current.filter(r => r.id !== id);
  saveCmsReviews(updated);
  return updated;
}

// 4. FAQS
export function getCmsFaqs() {
  try {
    const raw = localStorage.getItem(FAQS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error(e);
  }
  return DEFAULT_FAQS;
}

export function saveCmsFaqs(faqs) {
  try {
    localStorage.setItem(FAQS_STORAGE_KEY, JSON.stringify(faqs));
    notifyCmsUpdate({ faqs });
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

export function addCmsFaq(faq) {
  const current = getCmsFaqs();
  const newFaq = {
    ...faq,
    id: `faq_${Date.now()}`
  };
  const updated = [...current, newFaq];
  saveCmsFaqs(updated);
  return updated;
}

export function updateCmsFaq(id, updatedFields) {
  const current = getCmsFaqs();
  const updated = current.map(f => f.id === id ? { ...f, ...updatedFields } : f);
  saveCmsFaqs(updated);
  return updated;
}

export function deleteCmsFaq(id) {
  const current = getCmsFaqs();
  const updated = current.filter(f => f.id !== id);
  saveCmsFaqs(updated);
  return updated;
}

// 5. BACKUP & RESTORE
export function exportEntireCmsBackup() {
  return JSON.stringify({
    settings: getCmsSettings(),
    media: getMediaLibrary(),
    reviews: getCmsReviews(),
    faqs: getCmsFaqs()
  }, null, 2);
}

export function importEntireCmsBackup(jsonString) {
  try {
    const parsed = JSON.parse(jsonString);
    if (parsed.settings) saveCmsSettings(parsed.settings);
    if (Array.isArray(parsed.media)) saveMediaLibrary(parsed.media);
    if (Array.isArray(parsed.reviews)) saveCmsReviews(parsed.reviews);
    if (Array.isArray(parsed.faqs)) saveCmsFaqs(parsed.faqs);
    return true;
  } catch (e) {
    console.error('Failed to import CMS backup', e);
    return false;
  }
}

export function resetEntireCmsToDefaults() {
  localStorage.removeItem(CMS_STORAGE_KEY);
  localStorage.removeItem(MEDIA_STORAGE_KEY);
  localStorage.removeItem(REVIEWS_STORAGE_KEY);
  localStorage.removeItem(FAQS_STORAGE_KEY);
  notifyCmsUpdate({
    siteSettings: DEFAULT_SITE_SETTINGS,
    heroContent: DEFAULT_HERO_CONTENT,
    announcements: DEFAULT_ANNOUNCEMENTS,
    flashSaleBanner: DEFAULT_FLASH_BANNER,
    mediaLibrary: DEFAULT_MEDIA,
    reviews: DEFAULT_REVIEWS,
    faqs: DEFAULT_FAQS
  });
  return true;
}
