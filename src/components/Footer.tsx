import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Linkedin, Twitter } from 'lucide-react';
import { doctors, getDoctorBySlug } from '@/data/doctors';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer: React.FC = () => {
  const { language, t } = useLanguage();
  const { slug } = useParams<{ slug: string }>();
  
  // Get current doctor if on doctor profile page
  const currentDoctor = slug ? getDoctorBySlug(slug) : null;

  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand / Doctor Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
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
              <div>
                {currentDoctor ? (
                  <>
                    <p className={`text-lg font-bold text-background ${language === 'bn' ? 'font-bangla' : ''}`}>
                      {language === 'en' ? currentDoctor.name_en : currentDoctor.name_bn}
                    </p>
                    <p className={`text-xs text-background/60 ${language === 'bn' ? 'font-bangla' : ''}`}>
                      {language === 'en' ? currentDoctor.specialist_en : currentDoctor.specialist_bn}
                    </p>
                  </>
                ) : (
                  <p className={`text-lg font-bold text-background ${language === 'bn' ? 'font-bangla' : ''}`}>
                    {t('Doctor Directory', 'ডাক্তার ডিরেক্টরি')}
                  </p>
                )}
              </div>
            </div>
            <p className={`text-sm text-background/70 leading-relaxed ${language === 'bn' ? 'font-bangla' : ''}`}>
              {currentDoctor
                ? (language === 'en' ? currentDoctor.bio_en.slice(0, 150) + '...' : currentDoctor.bio_bn.slice(0, 150) + '...')
                : t(
                    'Connecting patients with the best medical specialists in Bangladesh.',
                    'বাংলাদেশের সেরা চিকিৎসা বিশেষজ্ঞদের সাথে রোগীদের সংযুক্ত করা।'
                  )
              }
            </p>
            <div className="flex gap-3 pt-2">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className={`text-sm font-semibold uppercase tracking-wider mb-4 text-background ${language === 'bn' ? 'font-bangla tracking-normal' : ''}`}>
              {t('Quick Links', 'দ্রুত লিঙ্ক')}
            </h4>
            <ul className="space-y-2.5">
              {currentDoctor ? (
                // Doctor page links
                <>
                  <li>
                    <a
                      href="#top"
                      onClick={(e) => {
                        e.preventDefault();
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={`text-sm text-background/70 hover:text-primary transition-colors ${language === 'bn' ? 'font-bangla' : ''}`}
                    >
                      {t('Home', 'হোম')}
                    </a>
                  </li>
                  <li>
                    <a href="#about" className={`text-sm text-background/70 hover:text-primary transition-colors ${language === 'bn' ? 'font-bangla' : ''}`}>
                      {t('About', 'সম্পর্কে')}
                    </a>
                  </li>
                  <li>
                    <a href="#services" className={`text-sm text-background/70 hover:text-primary transition-colors ${language === 'bn' ? 'font-bangla' : ''}`}>
                      {t('Specialties', 'বিশেষত্ব')}
                    </a>
                  </li>
                  <li>
                    <a href="#locations" className={`text-sm text-background/70 hover:text-primary transition-colors ${language === 'bn' ? 'font-bangla' : ''}`}>
                      {t('Chamber', 'চেম্বার')}
                    </a>
                  </li>
                  <li>
                    <a href="#booking" className={`text-sm text-background/70 hover:text-primary transition-colors ${language === 'bn' ? 'font-bangla' : ''}`}>
                      {t('Book Appointment', 'অ্যাপয়েন্টমেন্ট')}
                    </a>
                  </li>
                </>
              ) : (
                // Home page links
                <>
                  <li>
                    <Link to="/" className={`text-sm text-background/70 hover:text-primary transition-colors ${language === 'bn' ? 'font-bangla' : ''}`}>
                      {t('Home', 'হোম')}
                    </Link>
                  </li>
                  <li>
                    <a href="#doctors" className={`text-sm text-background/70 hover:text-primary transition-colors ${language === 'bn' ? 'font-bangla' : ''}`}>
                      {t('Our Doctors', 'আমাদের ডাক্তার')}
                    </a>
                  </li>
                  <li>
                    <a href="#" className={`text-sm text-background/70 hover:text-primary transition-colors ${language === 'bn' ? 'font-bangla' : ''}`}>
                      {t('About Us', 'আমাদের সম্পর্কে')}
                    </a>
                  </li>
                  <li>
                    <a href="#" className={`text-sm text-background/70 hover:text-primary transition-colors ${language === 'bn' ? 'font-bangla' : ''}`}>
                      {t('Contact', 'যোগাযোগ')}
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Our Doctors */}
          <div>
            <h4 className={`text-sm font-semibold uppercase tracking-wider mb-4 text-background ${language === 'bn' ? 'font-bangla tracking-normal' : ''}`}>
              {t('Our Doctors', 'আমাদের ডাক্তার')}
            </h4>
            <ul className="space-y-2.5">
              {doctors.slice(0, 5).map((doctor) => (
                <li key={doctor.id}>
                  <Link
                    to={`/doctor/${doctor.slug}`}
                    className={`text-sm text-background/70 hover:text-primary transition-colors ${language === 'bn' ? 'font-bangla' : ''}`}
                  >
                    {language === 'en' ? doctor.name_en : doctor.name_bn}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className={`text-sm font-semibold uppercase tracking-wider mb-4 text-background ${language === 'bn' ? 'font-bangla tracking-normal' : ''}`}>
              {t('Contact', 'যোগাযোগ')}
            </h4>
            <ul className="space-y-3">
              {currentDoctor ? (
                // Doctor-specific contact
                <>
                  <li className="flex items-start gap-3">
                    <Phone className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                    <a href={`tel:${currentDoctor.contact.phone}`} className="text-sm text-background/70 hover:text-primary transition-colors">
                      {currentDoctor.contact.phone}
                    </a>
                  </li>
                  <li className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                    <span className={`text-sm text-background/70 ${language === 'bn' ? 'font-bangla' : ''}`}>
                      {language === 'en' ? currentDoctor.chamber.address_en : currentDoctor.chamber.address_bn}
                    </span>
                  </li>
                </>
              ) : (
                // Generic contact
                <>
                  <li className="flex items-start gap-3">
                    <Phone className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                    <span className="text-sm text-background/70">+880 1234 567890</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Mail className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                    <span className="text-sm text-background/70">info@doctordirectory.com</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                    <span className={`text-sm text-background/70 ${language === 'bn' ? 'font-bangla' : ''}`}>
                      {t('Dhaka, Bangladesh', 'ঢাকা, বাংলাদেশ')}
                    </span>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-background/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className={`text-sm text-background/50 ${language === 'bn' ? 'font-bangla' : ''}`}>
              © {new Date().getFullYear()}{' '}
              {currentDoctor
                ? (language === 'en' ? currentDoctor.name_en : currentDoctor.name_bn)
                : t('Doctor Directory', 'ডাক্তার ডিরেক্টরি')
              }. {t('All rights reserved.', 'সর্বস্বত্ব সংরক্ষিত।')}
            </p>
            <div className="flex gap-6">
              <a href="#" className={`text-sm text-background/50 hover:text-primary transition-colors ${language === 'bn' ? 'font-bangla' : ''}`}>
                {t('Privacy Policy', 'গোপনীয়তা নীতি')}
              </a>
              <a href="#" className={`text-sm text-background/50 hover:text-primary transition-colors ${language === 'bn' ? 'font-bangla' : ''}`}>
                {t('Terms of Service', 'সেবার শর্তাবলী')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
