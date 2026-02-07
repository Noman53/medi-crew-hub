import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { doctors } from '@/data/doctors';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchChange,
}) => {
  const { language, t } = useLanguage();
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter doctors based on search query for suggestions
  const suggestions = searchQuery.length > 0
    ? doctors.filter((doctor) => {
        const name = language === 'bn' ? doctor.name_bn : doctor.name_en;
        const specialist = language === 'bn' ? doctor.specialist_bn : doctor.specialist_en;
        const query = searchQuery.toLowerCase();
        return name.toLowerCase().includes(query) || specialist.toLowerCase().includes(query);
      })
    : doctors.slice(0, 4); // Show first 4 doctors when input is focused but empty

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFocus = () => {
    setIsFocused(true);
    setShowSuggestions(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    // Delay hiding suggestions to allow click on suggestion
    setTimeout(() => setShowSuggestions(false), 200);
  };

  const clearSearch = () => {
    onSearchChange('');
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl mx-auto">
      {/* Search Input Container */}
      <div
        className={`relative flex items-center bg-card rounded-2xl border-2 transition-all duration-300 shadow-lg ${
          isFocused
            ? 'border-primary ring-4 ring-primary/10'
            : 'border-border hover:border-primary/50'
        }`}
      >
        <Search className="absolute left-5 w-5 h-5 text-primary" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={t(
            'Search doctors by name or specialty...',
            'নাম বা বিশেষত্ব দিয়ে ডাক্তার খুঁজুন...'
          )}
          className={`w-full pl-14 pr-12 py-4 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none text-base ${
            language === 'bn' ? 'font-bangla' : ''
          }`}
        />
        {searchQuery && (
          <button
            onClick={clearSearch}
            className="absolute right-5 p-1 rounded-full hover:bg-muted transition-colors"
            aria-label="Clear search"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      <AnimatePresence>
        {showSuggestions && (isFocused || searchQuery) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-card rounded-xl border border-border shadow-xl overflow-hidden z-50"
          >
            {suggestions.length > 0 ? (
              <div className="py-2">
                <p className={`px-4 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider ${language === 'bn' ? 'font-bangla' : ''}`}>
                  {searchQuery
                    ? t('Search Results', 'অনুসন্ধানের ফলাফল')
                    : t('Popular Doctors', 'জনপ্রিয় ডাক্তার')}
                </p>
                {suggestions.map((doctor) => (
                  <Link
                    key={doctor.id}
                    to={`/doctor/${doctor.slug}`}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-primary/5 transition-colors group"
                    onClick={() => {
                      setShowSuggestions(false);
                      onSearchChange('');
                    }}
                  >
                    <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border-2 border-primary/20">
                      <img
                        src={doctor.photo}
                        alt={language === 'en' ? doctor.name_en : doctor.name_bn}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`font-medium text-foreground group-hover:text-primary transition-colors truncate ${language === 'bn' ? 'font-bangla' : ''}`}>
                        {language === 'en' ? doctor.name_en : doctor.name_bn}
                      </p>
                      <p className={`text-xs text-muted-foreground truncate ${language === 'bn' ? 'font-bangla' : ''}`}>
                        {language === 'en' ? doctor.specialist_en : doctor.specialist_bn}
                      </p>
                    </div>
                    <span className="text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      {t('View →', 'দেখুন →')}
                    </span>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center">
                <p className={`text-muted-foreground ${language === 'bn' ? 'font-bangla' : ''}`}>
                  {t('No doctors found', 'কোনো ডাক্তার পাওয়া যায়নি')}
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
