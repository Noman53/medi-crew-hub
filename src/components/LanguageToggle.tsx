import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1 p-1 rounded-full bg-secondary/50 border border-border">
      <button
        onClick={() => setLanguage('en')}
        className={`lang-toggle ${language === 'en' ? 'active' : ''}`}
        aria-label="Switch to English"
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('bn')}
        className={`lang-toggle font-bangla ${language === 'bn' ? 'active' : ''}`}
        aria-label="Switch to Bengali"
      >
        বাংলা
      </button>
    </div>
  );
};

export default LanguageToggle;
