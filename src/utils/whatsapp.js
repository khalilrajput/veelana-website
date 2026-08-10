/**
 * Universal WhatsApp Link Helper
 * Uses https://api.whatsapp.com/send?phone=... format which natively triggers
 * the WhatsApp Mobile App on Android & iOS without refreshing or blank page errors,
 * while seamlessly working on Desktop browsers & WhatsApp Web.
 */
export function getWhatsAppUrl(customMessage = '') {
  const phone = '923061041609';
  const defaultText = 'Hi Veelana Team, I want to order the Herbal Hair Care Oil';
  const rawText = customMessage || defaultText;
  
  // Handle already encoded strings vs raw text
  const text = typeof rawText === 'string' && rawText.includes('%20')
    ? rawText
    : encodeURIComponent(rawText);

  return `https://api.whatsapp.com/send?phone=${phone}&text=${text}`;
}
