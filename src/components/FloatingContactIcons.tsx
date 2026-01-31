import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface FloatingContactIconsProps {
  phone: string;
  whatsapp: string;
}

const FloatingContactIcons: React.FC<FloatingContactIconsProps> = ({ phone, whatsapp }) => {
  const { t } = useLanguage();

  return (
    <div className="fixed right-4 bottom-4 md:right-6 md:bottom-6 z-50 flex flex-col gap-3">
      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${whatsapp.replace(/\+/g, '')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:scale-110 transition-all duration-300 animate-pulse-glow"
        aria-label={t('Chat on WhatsApp', 'হোয়াটসঅ্যাপে চ্যাট করুন')}
        style={{ animationDelay: '0.5s' }}
      >
        <MessageCircle className="w-7 h-7 fill-current" />
        
        {/* Tooltip */}
        <span className="absolute right-full mr-3 px-3 py-2 rounded-lg bg-foreground text-background text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          {t('Chat on WhatsApp', 'হোয়াটসঅ্যাপে চ্যাট করুন')}
        </span>
      </a>

      {/* Phone Call Button */}
      <a
        href={`tel:${phone}`}
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-110 transition-all duration-300 animate-pulse-glow"
        aria-label={t('Call Now', 'এখনই কল করুন')}
      >
        <Phone className="w-7 h-7" />
        
        {/* Tooltip */}
        <span className="absolute right-full mr-3 px-3 py-2 rounded-lg bg-foreground text-background text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          {t('Call Now', 'এখনই কল করুন')}
        </span>
      </a>
    </div>
  );
};

export default FloatingContactIcons;
