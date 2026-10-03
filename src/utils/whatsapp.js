import { getCmsSettings } from '../services/cmsService';

/**
 * Universal WhatsApp Link Helper
 * Dynamically retrieves phone number from CMS settings so changes in Admin Dashboard
 * instantly reflect across all WhatsApp buttons site-wide.
 */
export function getWhatsAppUrl(customMessage = '') {
  let phone = '923061041609';
  try {
    const settings = getCmsSettings()?.siteSettings;
    if (settings?.whatsappPhone) {
      phone = settings.whatsappPhone.replace(/[^0-9]/g, '');
    }
  } catch (e) {
    // fallback to default
  }

  const defaultText = 'Hi Veelana Team, I want to order the Herbal Hair Care Oil';
  const rawText = customMessage || defaultText;
  
  // Handle already encoded strings vs raw text
  const text = typeof rawText === 'string' && rawText.includes('%20')
    ? rawText
    : encodeURIComponent(rawText);

  return `https://api.whatsapp.com/send?phone=${phone}&text=${text}`;
}
