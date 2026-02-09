import React, { useState, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Menu, X, ChevronDown, Home } from 'lucide-react';
import { doctors, getDoctorBySlug } from '@/data/doctors';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageToggle from './LanguageToggle';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDoctorsDropdownOpen, setIsDoctorsDropdownOpen] = useState(false);
  const location = useLocation();
  const { slug } = useParams<{ slug: string }>();
  const { language, t } = useLanguage();

  // Get current doctor if on doctor profile page
  const currentDoctor = slug ? getDoctorBySlug(slug) : null;
  const isProfilePage = !!currentDoctor;

  // Handle smooth scroll to section or navigate with scroll to top
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      if (href === '#top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
      setIsMobileMenuOpen(false);
    }
    // For regular links (non-hash), let React Router handle navigation
    // The scroll-to-top is handled in each page component
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Navigation items for doctor profile page
  const doctorNavItems = [
    { id: 'about', label_en: 'About', label_bn: 'সম্পর্কে', href: '#about' },
    { id: 'services', label_en: 'Specialties', label_bn: 'বিশেষত্ব', href: '#services' },
    { id: 'locations', label_en: 'Chamber', label_bn: 'চেম্বার', href: '#locations' },
  ];

  // Other doctors (excluding current)
  const otherDoctors = isProfilePage
    ? doctors.filter((d) => d.slug !== currentDoctor?.slug)
    : doctors;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'glass-menu shadow-md py-2'
          : 'bg-transparent py-3'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo / Doctor Branding */}
          <Link
            to={isProfilePage ? `/doctor/${currentDoctor.slug}` : '/'}
            onClick={(e) => {
              if (isProfilePage) {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex items-center gap-2.5"
          >
            {/* Medical Icon */}
            <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-4 h-4 md:w-5 md:h-5 text-primary-foreground"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </div>

            {/* Title */}
            <div className="hidden sm:block">
              {isProfilePage ? (
                <>
                  <p className={`text-sm font-bold text-foreground leading-tight ${language === 'bn' ? 'font-bangla' : ''}`}>
                    {language === 'en' ? currentDoctor.name_en : currentDoctor.name_bn}
                  </p>
                  <p className={`text-[10px] text-muted-foreground uppercase tracking-widest font-medium ${language === 'bn' ? 'font-bangla tracking-normal' : ''}`}>
                    {language === 'en' ? currentDoctor.specialist_en.toUpperCase() : currentDoctor.specialist_bn}
                  </p>
                </>
              ) : (
                <>
                  <p className={`text-sm font-bold text-foreground leading-tight ${language === 'bn' ? 'font-bangla' : ''}`}>
                    {t('Doctor Directory', 'ডাক্তার ডিরেক্টরি')}
                  </p>
                  <p className={`text-[10px] text-muted-foreground uppercase tracking-widest font-medium ${language === 'bn' ? 'font-bangla tracking-normal' : ''}`}>
                    {t('MEDICAL SPECIALISTS', 'মেডিকেল বিশেষজ্ঞ')}
                  </p>
                </>
              )}
            </div>
          </Link>

          {/* Desktop Navigation - Glass morphic menu items */}
          <nav className="hidden lg:flex items-center gap-1">
            {isProfilePage ? (
              // Doctor profile navigation
              <>
                {/* Home Link */}
                <Link
                  to="/"
                  className={`glass-menu-item px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary rounded-lg transition-all duration-200 inline-flex items-center gap-1.5 ${language === 'bn' ? 'font-bangla' : ''}`}
                >
                  <Home className="w-4 h-4" />
                  {t('Home', 'হোম')}
                </Link>

                {/* Page Sections */}
                {doctorNavItems.map((item) => (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`glass-menu-item px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary rounded-lg transition-all duration-200 ${language === 'bn' ? 'font-bangla' : ''}`}
                  >
                    {language === 'en' ? item.label_en : item.label_bn}
                  </a>
                ))}

                {/* Other Doctors Dropdown */}
                {otherDoctors.length > 0 && (
                  <div className="relative">
                    <button
                      onClick={() => setIsDoctorsDropdownOpen(!isDoctorsDropdownOpen)}
                      onBlur={() => setTimeout(() => setIsDoctorsDropdownOpen(false), 150)}
                      className={`glass-menu-item px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary rounded-lg transition-all duration-200 inline-flex items-center gap-1 ${language === 'bn' ? 'font-bangla' : ''}`}
                    >
                      {t('Other Doctors', 'অন্যান্য ডাক্তার')}
                      <ChevronDown className={`w-4 h-4 transition-transform ${isDoctorsDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isDoctorsDropdownOpen && (
                      <div className="absolute top-full right-0 mt-1 w-60 glass-menu rounded-xl shadow-xl py-2 animate-fade-in z-50">
                        {otherDoctors.map((doctor) => (
                          <Link
                            key={doctor.id}
                            to={`/doctor/${doctor.slug}`}
                            className={`block px-4 py-2.5 text-sm hover:bg-primary/5 hover:text-primary transition-colors ${language === 'bn' ? 'font-bangla' : ''}`}
                          >
                            <span className="font-medium">
                              {language === 'en' ? doctor.name_en : doctor.name_bn}
                            </span>
                            <span className="block text-xs text-muted-foreground mt-0.5">
                              {language === 'en' ? doctor.specialist_en : doctor.specialist_bn}
                            </span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </>
            ) : (
              // Home page navigation - NO Book Appointment button
              <>
                <Link
                  to="/"
                  className={`glass-menu-item px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    location.pathname === '/'
                      ? 'text-primary bg-primary/10'
                      : 'text-foreground/80 hover:text-primary'
                  }`}
                >
                  {t('Home', 'হোম')}
                </Link>

                {/* Doctors Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsDoctorsDropdownOpen(!isDoctorsDropdownOpen)}
                    onBlur={() => setTimeout(() => setIsDoctorsDropdownOpen(false), 150)}
                    className={`glass-menu-item px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary rounded-lg transition-all duration-200 inline-flex items-center gap-1 ${language === 'bn' ? 'font-bangla' : ''}`}
                  >
                    {t('Our Doctors', 'আমাদের ডাক্তার')}
                    <ChevronDown className={`w-4 h-4 transition-transform ${isDoctorsDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isDoctorsDropdownOpen && (
                    <div className="absolute top-full left-0 mt-1 w-60 glass-menu rounded-xl shadow-xl py-2 animate-fade-in z-50">
                      {doctors.map((doctor) => (
                        <Link
                          key={doctor.id}
                          to={`/doctor/${doctor.slug}`}
                          className={`block px-4 py-2.5 text-sm hover:bg-primary/5 hover:text-primary transition-colors ${language === 'bn' ? 'font-bangla' : ''}`}
                        >
                          <span className="font-medium">
                            {language === 'en' ? doctor.name_en : doctor.name_bn}
                          </span>
                          <span className="block text-xs text-muted-foreground mt-0.5">
                            {language === 'en' ? doctor.specialist_en : doctor.specialist_bn}
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Language Toggle */}
            <div className="ml-2">
              <LanguageToggle />
            </div>

            {/* Book Appointment Button - Only on doctor profile pages */}
            {isProfilePage && (
              <a
                href="#booking"
                onClick={(e) => handleNavClick(e, '#booking')}
                className={`ml-2 btn-primary-gradient px-4 py-2 text-sm rounded-full font-medium whitespace-nowrap ${language === 'bn' ? 'font-bangla' : ''}`}
              >
                {t('Book Appointment', 'অ্যাপয়েন্টমেন্ট')}
              </a>
            )}
          </nav>

          {/* Mobile Controls */}
          <div className="flex items-center gap-2 lg:hidden">
            <LanguageToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-foreground hover:bg-muted rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu - Glass morphic */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-3 pb-4 border-t border-border/50 pt-4 animate-fade-in">
            <nav className="flex flex-col gap-1">
              {isProfilePage ? (
                // Doctor profile mobile nav
                <>
                  {/* Home Link */}
                  <Link
                    to="/"
                    className={`glass-menu-item px-4 py-2.5 rounded-lg text-sm font-medium text-foreground hover:text-primary transition-all inline-flex items-center gap-2 ${language === 'bn' ? 'font-bangla' : ''}`}
                  >
                    <Home className="w-4 h-4" />
                    {t('Home', 'হোম')}
                  </Link>

                  {/* Page Sections */}
                  {doctorNavItems.map((item) => (
                    <a
                      key={item.id}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className={`glass-menu-item px-4 py-2.5 rounded-lg text-sm font-medium text-foreground hover:text-primary transition-all ${language === 'bn' ? 'font-bangla' : ''}`}
                    >
                      {language === 'en' ? item.label_en : item.label_bn}
                    </a>
                  ))}

                  {/* Other Doctors */}
                  {otherDoctors.length > 0 && (
                    <div className="px-4 py-2 mt-2 border-t border-border/50 pt-4">
                      <p className={`text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 ${language === 'bn' ? 'font-bangla tracking-normal' : ''}`}>
                        {t('Other Doctors', 'অন্যান্য ডাক্তার')}
                      </p>
                      {otherDoctors.map((doctor) => (
                        <Link
                          key={doctor.id}
                          to={`/doctor/${doctor.slug}`}
                          className={`block py-2 text-sm text-foreground hover:text-primary transition-colors ${language === 'bn' ? 'font-bangla' : ''}`}
                        >
                          {language === 'en' ? doctor.name_en : doctor.name_bn}
                        </Link>
                      ))}
                    </div>
                  )}

                  {/* Book Appointment Mobile */}
                  <a
                    href="#booking"
                    onClick={(e) => {
                      handleNavClick(e, '#booking');
                      setIsMobileMenuOpen(false);
                    }}
                    className={`mx-4 mt-3 btn-primary-gradient px-5 py-2.5 rounded-full text-sm font-medium text-center ${language === 'bn' ? 'font-bangla' : ''}`}
                  >
                    {t('Book Appointment', 'অ্যাপয়েন্টমেন্ট')}
                  </a>
                </>
              ) : (
                // Home page mobile nav
                <>
                  <Link
                    to="/"
                    className={`glass-menu-item px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      location.pathname === '/'
                        ? 'bg-primary/10 text-primary'
                        : 'text-foreground hover:text-primary'
                    } ${language === 'bn' ? 'font-bangla' : ''}`}
                  >
                    {t('Home', 'হোম')}
                  </Link>

                  {/* Doctors List */}
                  <div className="px-4 py-2">
                    <p className={`text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 ${language === 'bn' ? 'font-bangla tracking-normal' : ''}`}>
                      {t('Our Doctors', 'আমাদের ডাক্তার')}
                    </p>
                    {doctors.map((doctor) => (
                      <Link
                        key={doctor.id}
                        to={`/doctor/${doctor.slug}`}
                        className={`block py-2 text-sm text-foreground hover:text-primary transition-colors ${language === 'bn' ? 'font-bangla' : ''}`}
                      >
                        {language === 'en' ? doctor.name_en : doctor.name_bn}
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
