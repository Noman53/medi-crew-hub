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
    <div className="fixed right-4 bottom-20 md:right-6 md:bottom-6 z-50 flex flex-col gap-4">
      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${whatsapp.replace(/\+/g, '')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 rounded-full shadow-lg hover:scale-110 transition-all duration-300"
        style={{ 
          backgroundColor: '#25D366',
          boxShadow: '0 4px 20px rgba(37, 211, 102, 0.4)'
        }}
        aria-label={t('Chat on WhatsApp', 'হোয়াটসঅ্যাপে চ্যাট করুন')}
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full animate-ping opacity-30" style={{ backgroundColor: '#25D366' }} />
        
        <MessageCircle className="w-7 h-7 text-white fill-white" />
        
        {/* Tooltip */}
        <span className="absolute right-full mr-3 px-3 py-2 rounded-lg bg-foreground text-background text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg">
          {t('Chat on WhatsApp', 'হোয়াটসঅ্যাপে চ্যাট করুন')}
        </span>
      </a>

      {/* Phone Call Button */}
      <a
        href={`tel:${phone}`}
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-110 transition-all duration-300"
        style={{
          boxShadow: '0 4px 20px hsl(174 72% 40% / 0.4)'
        }}
        aria-label={t('Call Now', 'এখনই কল করুন')}
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-30" />
        
        <Phone className="w-7 h-7" />
        
        {/* Tooltip */}
        <span className="absolute right-full mr-3 px-3 py-2 rounded-lg bg-foreground text-background text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg">
          {t('Call Now', 'এখনই কল করুন')}
        </span>
      </a>
    </div>
  );
};

export default FloatingContactIcons;
