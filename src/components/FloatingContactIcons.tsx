import React, { useState } from 'react';
import { Phone, MessageCircle, HeadphonesIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

interface FloatingContactIconsProps {
  phone: string;
  whatsapp: string;
}

const FloatingContactIcons: React.FC<FloatingContactIconsProps> = ({ phone, whatsapp }) => {
  const { t } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="fixed right-4 bottom-6 md:right-6 md:bottom-8 z-50 flex flex-col-reverse items-center gap-3"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Toggle Button */}
      <motion.div
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-xl cursor-pointer"
        style={{
          boxShadow: '0 4px 20px hsl(174 72% 40% / 0.4)',
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={t('Contact options', 'যোগাযোগের বিকল্প')}
      >
        <HeadphonesIcon className="w-7 h-7" />
        {/* Pulse ring animation */}
        <span className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
      </motion.div>

      <AnimatePresence>
        {isHovered && (
          <>
            {/* Phone Call Button */}
            <motion.a
              initial={{ opacity: 0, scale: 0.5, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: 10 }}
              transition={{ duration: 0.2 }}
              href={`tel:${phone}`}
              className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-110 transition-transform duration-300"
              style={{
                boxShadow: '0 4px 15px hsl(174 72% 40% / 0.4)',
              }}
              aria-label={t('Call Now', 'এখনই কল করুন')}
            >
              <Phone className="w-5 h-5" />
              <span className="absolute right-full mr-3 px-3 py-1.5 rounded-lg bg-foreground text-background text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg">
                {t('Call Now', 'এখনই কল করুন')}
              </span>
            </motion.a>

            {/* WhatsApp Button */}
            <motion.a
              initial={{ opacity: 0, scale: 0.5, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: 10 }}
              transition={{ duration: 0.2, delay: 0.05 }}
              href={`https://wa.me/${whatsapp.replace(/\+/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-center w-12 h-12 rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
              style={{
                backgroundColor: '#25D366',
                boxShadow: '0 4px 15px rgba(37, 211, 102, 0.4)',
              }}
              aria-label={t('Chat on WhatsApp', 'হোয়াটসঅ্যাপে চ্যাট করুন')}
            >
              <MessageCircle className="w-5 h-5 text-white fill-white" />
              <span className="absolute right-full mr-3 px-3 py-1.5 rounded-lg bg-foreground text-background text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg">
                {t('WhatsApp', 'হোয়াটসঅ্যাপ')}
              </span>
            </motion.a>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingContactIcons;
