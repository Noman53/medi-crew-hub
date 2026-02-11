import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Menu, X, ChevronDown, Home } from 'lucide-react';
import { doctors, getDoctorBySlug } from '@/data/doctors';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageToggle from './LanguageToggle';
import { ScrollArea } from '@/components/ui/scroll-area';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDoctorsDropdownOpen, setIsDoctorsDropdownOpen] = useState(false);
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();
  const { slug } = useParams<{ slug: string }>();
  const { language, t } = useLanguage();

  const currentDoctor = slug ? getDoctorBySlug(slug) : null;
  const isProfilePage = !!currentDoctor;

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
  };

  // Hover-based dropdown handlers
  const openDropdown = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setIsDoctorsDropdownOpen(true);
  };
  const closeDropdown = () => {
    dropdownTimeoutRef.current = setTimeout(() => setIsDoctorsDropdownOpen(false), 200);
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsDoctorsDropdownOpen(false);
  }, [location]);

  const doctorNavItems = [
    { id: 'about', label_en: 'About', label_bn: 'সম্পর্কে', href: '#about' },
    { id: 'services', label_en: 'Specialties', label_bn: 'বিশেষত্ব', href: '#services' },
    { id: 'locations', label_en: 'Chamber', label_bn: 'চেম্বার', href: '#locations' },
  ];

  const otherDoctors = isProfilePage
    ? doctors.filter((d) => d.slug !== currentDoctor?.slug)
    : doctors;

  // Shared dropdown content for desktop
  const renderDropdownContent = () => (
    <div
      className="absolute top-full right-0 mt-2 w-64 rounded-xl shadow-2xl py-2 z-50 bg-card border border-border/60 backdrop-blur-xl"
      onMouseEnter={openDropdown}
      onMouseLeave={closeDropdown}
    >
      {/* If more than 3 doctors, make scrollable */}
      {otherDoctors.length > 3 ? (
        <ScrollArea className="max-h-60">
          <div className="py-1">
            {otherDoctors.map((doctor) => (
              <Link
                key={doctor.id}
                to={`/doctor/${doctor.slug}`}
                className={`block px-4 py-2.5 text-sm hover:bg-primary/5 hover:text-primary transition-colors ${language === 'bn' ? 'font-bangla' : ''}`}
              >
                <span className="font-medium">{language === 'en' ? doctor.name_en : doctor.name_bn}</span>
                <span className="block text-xs text-muted-foreground mt-0.5">
                  {language === 'en' ? doctor.specialist_en : doctor.specialist_bn}
                </span>
              </Link>
            ))}
          </div>
        </ScrollArea>
      ) : (
        otherDoctors.map((doctor) => (
          <Link
            key={doctor.id}
            to={`/doctor/${doctor.slug}`}
            className={`block px-4 py-2.5 text-sm hover:bg-primary/5 hover:text-primary transition-colors ${language === 'bn' ? 'font-bangla' : ''}`}
          >
            <span className="font-medium">{language === 'en' ? doctor.name_en : doctor.name_bn}</span>
            <span className="block text-xs text-muted-foreground mt-0.5">
              {language === 'en' ? doctor.specialist_en : doctor.specialist_bn}
            </span>
          </Link>
        ))
      )}
    </div>
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-card/80 backdrop-blur-xl shadow-lg border-b border-border/30 py-2'
          : 'bg-transparent py-3'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to={isProfilePage ? `/doctor/${currentDoctor.slug}` : '/'}
            onClick={(e) => {
              if (isProfilePage) {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex items-center gap-2.5 flex-shrink-0"
          >
            <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 md:w-5 md:h-5 text-primary-foreground">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </div>
            <div className="hidden sm:block min-w-0">
              {isProfilePage ? (
                <>
                  <p className={`text-sm font-bold text-foreground leading-tight truncate ${language === 'bn' ? 'font-bangla' : ''}`}>
                    {language === 'en' ? currentDoctor.name_en : currentDoctor.name_bn}
                  </p>
                  <p className={`text-[10px] text-muted-foreground uppercase tracking-widest font-medium truncate max-w-[180px] md:max-w-[240px] ${language === 'bn' ? 'font-bangla tracking-normal' : ''}`}>
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

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {isProfilePage ? (
              <>
                <Link
                  to="/"
                  className={`px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200 inline-flex items-center gap-1.5 ${language === 'bn' ? 'font-bangla' : ''}`}
                >
                  <Home className="w-4 h-4" />
                  {t('Home', 'হোম')}
                </Link>

                {doctorNavItems.map((item) => (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200 ${language === 'bn' ? 'font-bangla' : ''}`}
                  >
                    {language === 'en' ? item.label_en : item.label_bn}
                  </a>
                ))}

                {/* Other Doctors Dropdown - hover-based */}
                {otherDoctors.length > 0 && (
                  <div
                    className="relative"
                    onMouseEnter={openDropdown}
                    onMouseLeave={closeDropdown}
                  >
                    <button
                      className={`px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200 inline-flex items-center gap-1 ${language === 'bn' ? 'font-bangla' : ''}`}
                    >
                      {t('Other Doctors', 'অন্যান্য ডাক্তার')}
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isDoctorsDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isDoctorsDropdownOpen && renderDropdownContent()}
                  </div>
                )}
              </>
            ) : (
              <>
                <Link
                  to="/"
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    location.pathname === '/'
                      ? 'text-primary bg-primary/10'
                      : 'text-foreground/80 hover:text-primary hover:bg-primary/5'
                  }`}
                >
                  {t('Home', 'হোম')}
                </Link>

                {/* Doctors Dropdown - hover-based */}
                <div
                  className="relative"
                  onMouseEnter={openDropdown}
                  onMouseLeave={closeDropdown}
                >
                  <button
                    className={`px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200 inline-flex items-center gap-1 ${language === 'bn' ? 'font-bangla' : ''}`}
                  >
                    {t('Our Doctors', 'আমাদের ডাক্তার')}
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isDoctorsDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isDoctorsDropdownOpen && renderDropdownContent()}
                </div>
              </>
            )}

            <div className="ml-2">
              <LanguageToggle />
            </div>

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

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-3 pb-4 border-t border-border/50 pt-4 animate-fade-in bg-card/95 backdrop-blur-xl rounded-b-xl -mx-4 px-4">
            <nav className="flex flex-col gap-1">
              {isProfilePage ? (
                <>
                  <Link
                    to="/"
                    className={`px-4 py-2.5 rounded-lg text-sm font-medium text-foreground hover:text-primary hover:bg-primary/5 transition-all inline-flex items-center gap-2 ${language === 'bn' ? 'font-bangla' : ''}`}
                  >
                    <Home className="w-4 h-4" />
                    {t('Home', 'হোম')}
                  </Link>

                  {doctorNavItems.map((item) => (
                    <a
                      key={item.id}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className={`px-4 py-2.5 rounded-lg text-sm font-medium text-foreground hover:text-primary hover:bg-primary/5 transition-all ${language === 'bn' ? 'font-bangla' : ''}`}
                    >
                      {language === 'en' ? item.label_en : item.label_bn}
                    </a>
                  ))}

                  {otherDoctors.length > 0 && (
                    <div className="px-4 py-2 mt-2 border-t border-border/50 pt-4">
                      <p className={`text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 ${language === 'bn' ? 'font-bangla tracking-normal' : ''}`}>
                        {t('Other Doctors', 'অন্যান্য ডাক্তার')}
                      </p>
                      <div className="max-h-40 overflow-y-auto space-y-0.5">
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
                    </div>
                  )}

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
                <>
                  <Link
                    to="/"
                    className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      location.pathname === '/'
                        ? 'bg-primary/10 text-primary'
                        : 'text-foreground hover:text-primary hover:bg-primary/5'
                    } ${language === 'bn' ? 'font-bangla' : ''}`}
                  >
                    {t('Home', 'হোম')}
                  </Link>

                  <div className="px-4 py-2">
                    <p className={`text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 ${language === 'bn' ? 'font-bangla tracking-normal' : ''}`}>
                      {t('Our Doctors', 'আমাদের ডাক্তার')}
                    </p>
                    <div className="max-h-40 overflow-y-auto space-y-0.5">
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
