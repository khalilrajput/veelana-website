import React from 'react';
import { MessageCircle } from 'lucide-react';
import { getWhatsAppUrl } from '../utils/whatsapp';

export default function FloatingWhatsApp() {
  return (
    <a
      href={getWhatsAppUrl('Hi, I have a question about Veelana Herbal Hair Oil')}
      target="_blank"
      rel="noopener noreferrer"
      className="floating-whatsapp"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle style={{ width: '28px', height: '28px', fill: 'currentColor' }} />
    </a>
  );
}
