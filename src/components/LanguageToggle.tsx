import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-0.5 p-1 rounded-full bg-muted/50 border border-border">
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 ${
          language === 'en'
            ? 'bg-primary text-primary-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground'
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('bn')}
        className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 font-bangla ${
          language === 'bn'
            ? 'bg-primary text-primary-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground'
        }`}
        aria-label="Switch to Bengali"
      >
        বাংলা
      </button>
    </div>
  );
};

export default LanguageToggle;
