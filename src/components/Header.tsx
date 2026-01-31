import React, { useState, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { doctors, getDoctorBySlug } from '@/data/doctors';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageToggle from './LanguageToggle';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { slug } = useParams<{ slug: string }>();
  const { language, t } = useLanguage();

  // Get current doctor if on doctor profile page
  const currentDoctor = slug ? getDoctorBySlug(slug) : null;
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation items for doctor profile page
  const doctorNavItems = [
    { id: 'home', label_en: 'Home', label_bn: 'হোম', href: '#' },
    { id: 'about', label_en: 'About', label_bn: 'সম্পর্কে', href: '#about' },
    { id: 'services', label_en: 'Specialties', label_bn: 'বিশেষত্ব', href: '#services' },
    { id: 'locations', label_en: 'Chamber', label_bn: 'চেম্বার', href: '#locations' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      if (href === '#') {
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

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo / Doctor Name */}
          <Link to={currentDoctor ? `/doctor/${currentDoctor.slug}` : '/'} className="flex items-center gap-3">
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
              {currentDoctor ? (
                <>
                  <p className={`text-lg font-bold text-foreground ${language === 'bn' ? 'font-bangla' : ''}`}>
                    {language === 'en' ? currentDoctor.name_en : currentDoctor.name_bn}
                  </p>
                  <p className={`text-xs text-muted-foreground uppercase tracking-wider ${language === 'bn' ? 'font-bangla' : ''}`}>
                    {language === 'en' ? currentDoctor.specialist_en.toUpperCase() : currentDoctor.specialist_bn}
                  </p>
                </>
              ) : (
                <>
                  <p className={`text-lg font-bold text-foreground ${language === 'bn' ? 'font-bangla' : ''}`}>
                    {t('Doctor Directory', 'ডাক্তার ডিরেক্টরি')}
                  </p>
                  <p className={`text-xs text-muted-foreground uppercase tracking-wider ${language === 'bn' ? 'font-bangla' : ''}`}>
                    {t('Medical Specialists', 'মেডিকেল বিশেষজ্ঞ')}
                  </p>
                </>
              )}
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {currentDoctor ? (
              // Doctor profile navigation
              <>
                {doctorNavItems.map((item) => (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`text-sm font-medium transition-colors hover:text-primary text-foreground ${language === 'bn' ? 'font-bangla' : ''}`}
                  >
                    {language === 'en' ? item.label_en : item.label_bn}
                  </a>
                ))}
              </>
            ) : (
              // Home page navigation
              <>
                <Link
                  to="/"
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    location.pathname === '/' ? 'text-primary' : 'text-foreground'
                  }`}
                >
                  {t('Home', 'হোম')}
                </Link>
                
                {/* Quick access to first doctor for demo */}
                {doctors.length > 0 && (
                  <Link
                    to={`/doctor/${doctors[0].slug}`}
                    className="text-sm font-medium transition-colors hover:text-primary text-foreground"
                  >
                    {t('Our Doctors', 'আমাদের ডাক্তার')}
                  </Link>
                )}
              </>
            )}

            <LanguageToggle />

            <a
              href={currentDoctor ? '#booking' : '/'}
              onClick={(e) => currentDoctor && handleNavClick(e, '#booking')}
              className={`btn-primary-gradient px-5 py-2.5 rounded-full text-sm font-medium ${language === 'bn' ? 'font-bangla' : ''}`}
            >
              {t('Book Appointment', 'অ্যাপয়েন্টমেন্ট বুক করুন')}
            </a>
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
          <div className="md:hidden py-4 border-t border-border animate-fade-in bg-background/95 backdrop-blur-lg">
            <nav className="flex flex-col gap-2">
              {currentDoctor ? (
                // Doctor profile mobile nav
                <>
                  {doctorNavItems.map((item) => (
                    <a
                      key={item.id}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors text-foreground hover:bg-secondary ${language === 'bn' ? 'font-bangla' : ''}`}
                    >
                      {language === 'en' ? item.label_en : item.label_bn}
                    </a>
                  ))}
                </>
              ) : (
                // Home page mobile nav
                <>
                  <Link
                    to="/"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      location.pathname === '/'
                        ? 'bg-primary text-primary-foreground'
                        : 'text-foreground hover:bg-secondary'
                    } ${language === 'bn' ? 'font-bangla' : ''}`}
                  >
                    {t('Home', 'হোম')}
                  </Link>
                  
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
                </>
              )}

              <a
                href={currentDoctor ? '#booking' : '/'}
                onClick={(e) => {
                  if (currentDoctor) handleNavClick(e, '#booking');
                  setIsMobileMenuOpen(false);
                }}
                className={`mx-4 mt-2 btn-primary-gradient px-5 py-3 rounded-full text-sm font-medium text-center ${language === 'bn' ? 'font-bangla' : ''}`}
              >
                {t('Book Appointment', 'অ্যাপয়েন্টমেন্ট বুক করুন')}
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
