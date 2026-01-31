import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { doctors } from '@/data/doctors';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageToggle from './LanguageToggle';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDoctorsDropdownOpen, setIsDoctorsDropdownOpen] = useState(false);
  const location = useLocation();
  const { language, t } = useLanguage();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/', label_en: 'Home', label_bn: 'হোম' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-6 h-6 text-primary-foreground"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </div>
            <div className="hidden sm:block">
              <p className={`text-lg font-bold text-foreground ${language === 'bn' ? 'font-bangla' : ''}`}>
                {t('Doctor Directory', 'ডাক্তার ডিরেক্টরি')}
              </p>
              <p className={`text-xs text-muted-foreground uppercase tracking-wider ${language === 'bn' ? 'font-bangla' : ''}`}>
                {t('Medical Specialists', 'মেডিকেল বিশেষজ্ঞ')}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive(item.path) ? 'text-primary' : 'text-foreground'
                } ${language === 'bn' ? 'font-bangla' : ''}`}
              >
                {language === 'en' ? item.label_en : item.label_bn}
              </Link>
            ))}

            {/* Doctors Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDoctorsDropdownOpen(!isDoctorsDropdownOpen)}
                onBlur={() => setTimeout(() => setIsDoctorsDropdownOpen(false), 200)}
                className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary ${language === 'bn' ? 'font-bangla' : ''}`}
              >
                {t('Doctors', 'ডাক্তার')}
                <ChevronDown className={`w-4 h-4 transition-transform ${isDoctorsDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isDoctorsDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 py-2 bg-card rounded-xl shadow-lg border border-border animate-fade-in-up">
                  {doctors.map((doctor) => (
                    <Link
                      key={doctor.id}
                      to={`/doctor/${doctor.slug}`}
                      className={`block px-4 py-3 hover:bg-secondary transition-colors ${language === 'bn' ? 'font-bangla' : ''}`}
                    >
                      <p className="font-medium text-foreground">
                        {language === 'en' ? doctor.name_en : doctor.name_bn}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {language === 'en' ? doctor.specialist_en : doctor.specialist_bn}
                      </p>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <LanguageToggle />

            <Link
              to="/#booking"
              className="btn-primary-gradient px-5 py-2.5 rounded-full text-sm font-medium"
            >
              {t('Book Appointment', 'অ্যাপয়েন্টমেন্ট বুক করুন')}
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 md:hidden">
            <LanguageToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-foreground"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in-up">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-secondary'
                  } ${language === 'bn' ? 'font-bangla' : ''}`}
                >
                  {language === 'en' ? item.label_en : item.label_bn}
                </Link>
              ))}

              {/* Mobile Doctors List */}
              <div className="px-4 py-2">
                <p className={`text-xs font-medium text-muted-foreground uppercase mb-2 ${language === 'bn' ? 'font-bangla' : ''}`}>
                  {t('Our Doctors', 'আমাদের ডাক্তার')}
                </p>
                {doctors.map((doctor) => (
                  <Link
                    key={doctor.id}
                    to={`/doctor/${doctor.slug}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block py-2 text-sm text-foreground hover:text-primary ${language === 'bn' ? 'font-bangla' : ''}`}
                  >
                    {language === 'en' ? doctor.name_en : doctor.name_bn}
                  </Link>
                ))}
              </div>

              <Link
                to="/#booking"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`mx-4 btn-primary-gradient px-5 py-3 rounded-full text-sm font-medium text-center ${language === 'bn' ? 'font-bangla' : ''}`}
              >
                {t('Book Appointment', 'অ্যাপয়েন্টমেন্ট বুক করুন')}
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
