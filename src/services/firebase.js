// Free Google Firebase / Cloud Sync Integration Layer for Veelana
// $0 Cost Forever on Firebase Spark Free Plan (50k daily reads, 20k daily writes)

const FIREBASE_CONFIG_KEY = 'veelana_firebase_config_v1';

// Get user configured Firebase keys if available
export function getFirebaseConfig() {
  try {
    const saved = localStorage.getItem(FIREBASE_CONFIG_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error('Error reading firebase config', e);
  }
  return null;
}

// Save Firebase Config from Admin panel
export function saveFirebaseConfig(config) {
  try {
    localStorage.setItem(FIREBASE_CONFIG_KEY, JSON.stringify(config));
    return true;
  } catch (e) {
    console.error('Error saving firebase config', e);
    return false;
  }
}

// Phone Number Normalizer for Pakistani Carriers (Jazz, Telenor, Zong, Ufone, SCO)
export function normalizePakistanPhone(phoneStr) {
  if (!phoneStr) return { clean: '', international: '', display: '', isValid: false };
  
  // Strip all non-digit characters
  let digits = phoneStr.replace(/[^0-9]/g, '');

  // Handle leading 0092 or 92 or 0
  if (digits.startsWith('0092')) {
    digits = digits.slice(4);
  } else if (digits.startsWith('92')) {
    digits = digits.slice(2);
  } else if (digits.startsWith('0')) {
    digits = digits.slice(1);
  }

  // Pakistani mobile numbers are 10 digits (after stripping leading 0/92), or 10-11 digits
  const isValid = digits.length >= 9 && digits.length <= 11;
  const international = `+92${digits}`;
  const display = digits.length === 10 ? `0${digits.slice(0, 3)}-${digits.slice(3)}` : phoneStr;

  return {
    clean: digits,
    international,
    display,
    isValid
  };
}

// Calculate Pakistan COD Risk Score (0 = Very Safe, 100 = High Risk)
export function calculateCodRiskScore(orderData, existingOrders = []) {
  let score = 50; // baseline
  const reasons = [];

  const phoneInfo = normalizePakistanPhone(orderData.phone);
  if (!phoneInfo.isValid) {
    score += 35;
    reasons.push('Invalid or incomplete phone number');
  } else {
    score -= 20;
  }

  // Check landmark
  if (orderData.landmark && orderData.landmark.trim().length >= 3) {
    score -= 15;
    reasons.push('Nearest landmark provided (High delivery success)');
  } else {
    score += 15;
    reasons.push('No landmark specified');
  }

  // Address completeness
  const fullAddress = `${orderData.houseStreet || ''} ${orderData.area || ''} ${orderData.address || ''}`.trim();
  if (fullAddress.length >= 20) {
    score -= 15;
  } else {
    score += 20;
    reasons.push('Short or vague address details');
  }

  // Check duplicate recent orders from same phone
  if (phoneInfo.clean) {
    const duplicates = existingOrders.filter(o => {
      const p = normalizePakistanPhone(o.phone);
      return p.clean === phoneInfo.clean && (new Date() - new Date(o.createdAt)) < 86400000;
    });

    if (duplicates.length > 0) {
      score += 25;
      reasons.push(`Duplicate order detected (${duplicates.length} order in last 24h)`);
    }
  }

  // High order value COD risk
  const amount = parseInt(String(orderData.totalAmount || orderData.totalPrice || 0).replace(/[^0-9]/g, ''), 10);
  if (amount > 8000) {
    score += 15;
    reasons.push('High value COD order (> Rs. 8,000)');
  }

  // Normalize final score between 5 and 95
  const finalScore = Math.max(5, Math.min(95, score));
  
  let riskLevel = 'Low Risk';
  let badgeColor = '#047857'; // Green
  let badgeBg = '#ECFDF5';

  if (finalScore >= 65) {
    riskLevel = 'High Risk (Verify on WhatsApp)';
    badgeColor = '#B91C1C'; // Red
    badgeBg = '#FEF2F2';
  } else if (finalScore >= 40) {
    riskLevel = 'Medium Risk (Call/Confirm)';
    badgeColor = '#D97706'; // Amber
    badgeBg = '#FFFBEB';
  } else {
    riskLevel = 'Low Risk (Safe to Dispatch)';
    badgeColor = '#047857';
    badgeBg = '#ECFDF5';
  }

  return {
    score: finalScore,
    riskLevel,
    badgeColor,
    badgeBg,
    reasons
  };
}
