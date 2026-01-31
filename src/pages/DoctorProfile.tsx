import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { getDoctorBySlug } from '@/data/doctors';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  ArrowLeft,
  Phone,
  MapPin,
  Clock,
  Calendar,
  MessageCircle,
  ExternalLink,
  Award,
  CheckCircle,
} from 'lucide-react';

// Specialty icons mapping
const getSpecialtyIcon = (iconName: string) => {
  const icons: Record<string, React.ReactNode> = {
    gallbladder: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <ellipse cx="12" cy="12" rx="6" ry="8" />
        <path d="M12 4c0 0 -2 4 -2 8s2 8 2 8" />
      </svg>
    ),
    liver: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path d="M4 12c0 -4 4 -8 8 -8s8 4 8 8 -4 8 -8 8 -8 -4 -8 -8z" />
        <path d="M8 12h8" />
        <path d="M12 8v8" />
      </svg>
    ),
    bileduct: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path d="M12 4v16" />
        <path d="M8 8l4 -4 4 4" />
        <path d="M8 16l4 4 4 -4" />
      </svg>
    ),
    pancreas: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path d="M4 12h16" />
        <ellipse cx="8" cy="12" rx="3" ry="4" />
        <ellipse cx="16" cy="12" rx="3" ry="4" />
      </svg>
    ),
    hernia: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <circle cx="12" cy="12" r="8" />
        <path d="M12 8v8" />
        <path d="M8 12h8" />
      </svg>
    ),
    appendix: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path d="M12 4c0 0 0 8 0 12" />
        <path d="M12 16c0 2 2 4 4 4" />
      </svg>
    ),
    heart: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    ),
    ecg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    pacemaker: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <rect x="6" y="4" width="12" height="16" rx="2" />
        <path d="M10 10h4" />
        <path d="M12 8v4" />
      </svg>
    ),
  };
  return icons[iconName] || icons.heart;
};

const DoctorProfile: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { language, t } = useLanguage();
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  const doctor = getDoctorBySlug(slug || '');

  if (!doctor) {
    return <Navigate to="/" replace />;
  }

  // Generate calendar days for current month
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  
  const monthNames = language === 'en' 
    ? ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    : ['জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'];

  const dayNames = language === 'en'
    ? ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
    : ['রবি', 'সোম', 'মঙ্গল', 'বুধ', 'বৃহঃ', 'শুক্র', 'শনি'];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative hero-gradient overflow-hidden">
        {/* Back Button */}
        <div className="container mx-auto px-4 pt-6">
          <Link
            to="/"
            className={`inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors ${language === 'bn' ? 'font-bangla' : ''}`}
          >
            <ArrowLeft className="w-4 h-4" />
            {t('Back to Doctors', 'ডাক্তার তালিকায় ফিরে যান')}
          </Link>
        </div>

        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6 animate-fade-in-up">
              {/* Title Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className={`text-sm font-medium text-primary uppercase tracking-wider ${language === 'bn' ? 'font-bangla' : ''}`}>
                  {language === 'en' ? doctor.title_en : doctor.title_bn}
                </span>
              </div>

              {/* Main Heading */}
              <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-tight ${language === 'bn' ? 'font-bangla' : ''}`}>
                <span className="text-foreground">{t('Expert Care for', 'বিশেষজ্ঞ যত্ন')} </span>
                <br />
                <span className="text-gradient">
                  {language === 'en' ? doctor.hero_tagline_en.replace('Expert Care for ', '') : doctor.hero_tagline_bn.replace('বিশেষজ্ঞ যত্ন ', '')}
                </span>
              </h1>

              {/* Description */}
              <p className={`text-lg text-muted-foreground max-w-xl ${language === 'bn' ? 'font-bangla' : ''}`}>
                {language === 'en' ? doctor.hero_description_en : doctor.hero_description_bn}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <a
                  href="#booking"
                  className={`btn-primary-gradient px-6 py-3 rounded-full font-medium inline-flex items-center gap-2 ${language === 'bn' ? 'font-bangla' : ''}`}
                >
                  <Calendar className="w-5 h-5" />
                  {t('Book Consultation', 'পরামর্শ বুক করুন')}
                </a>
                <a
                  href="#services"
                  className={`px-6 py-3 rounded-full font-medium border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors inline-flex items-center gap-2 ${language === 'bn' ? 'font-bangla' : ''}`}
                >
                  {t('View Specialties', 'বিশেষত্ব দেখুন')}
                </a>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-4 pt-4">
                {doctor.badges.map((badge, index) => (
                  <div key={index} className="flex items-center gap-2 text-muted-foreground">
                    <Award className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium">{badge.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content - Doctor Image */}
            <div className="relative flex justify-center animate-slide-in-right">
              {/* Decorative Circle */}
              <div className="absolute w-80 h-80 md:w-96 md:h-96 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 blur-3xl" />
              
              {/* Doctor Image */}
              <div className="relative">
                <div className="w-72 h-72 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl float-animation">
                  <img
                    src={doctor.photo}
                    alt={language === 'en' ? doctor.name_en : doctor.name_bn}
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                {/* Info Card */}
                <div className="absolute -bottom-4 -right-4 md:bottom-4 md:right-0 glass rounded-xl p-4 shadow-lg max-w-[200px]">
                  <p className={`font-bold text-foreground ${language === 'bn' ? 'font-bangla' : ''}`}>
                    {language === 'en' ? doctor.name_en : doctor.name_bn}
                  </p>
                  <p className={`text-xs text-primary ${language === 'bn' ? 'font-bangla' : ''}`}>
                    {language === 'en' ? doctor.title_en : doctor.title_bn}
                  </p>
                  <p className={`text-xs text-muted-foreground ${language === 'bn' ? 'font-bangla' : ''}`}>
                    {language === 'en' ? doctor.institution_en : doctor.institution_bn}
                  </p>
                  <div className="mt-2 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="wave-divider">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 md:h-24">
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.11,140.83,94.17,208.18,70.28,287.43,41.73,321.39,56.44,321.39,56.44Z"
              className="fill-background"
            />
          </svg>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold ${language === 'bn' ? 'font-bangla' : ''}`}>
              {t(`Why Choose ${doctor.name_en.split(' ').pop()}?`, `কেন ${doctor.name_bn.split(' ').pop()} বেছে নেবেন?`)}
            </h2>
            <p className={`text-muted-foreground mt-3 max-w-2xl mx-auto ${language === 'bn' ? 'font-bangla' : ''}`}>
              {t('Modern surgical care with advanced techniques and patient-centric approach.', 'উন্নত কৌশল এবং রোগী-কেন্দ্রিক পদ্ধতির সাথে আধুনিক অস্ত্রোপচার যত্ন।')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title_en: 'Advanced Surgery',
                title_bn: 'উন্নত সার্জারি',
                desc_en: 'Specialized in Hepatobiliary surgery for complex liver and bile duct disorders.',
                desc_bn: 'জটিল লিভার এবং পিত্তনালীর ব্যাধির জন্য হেপাটোবিলিয়ারি সার্জারিতে বিশেষজ্ঞ।',
                icon: 'surgery',
              },
              {
                title_en: 'Minimally Invasive',
                title_bn: 'ন্যূনতম আক্রমণাত্মক',
                desc_en: 'Laparoscopic techniques ensuring smaller incisions, less pain, and quicker recovery.',
                desc_bn: 'ল্যাপারোস্কপিক কৌশল ছোট ছেদ, কম ব্যথা এবং দ্রুত পুনরুদ্ধার নিশ্চিত করে।',
                icon: 'minimally',
              },
              {
                title_en: 'Patient-Centric',
                title_bn: 'রোগী-কেন্দ্রিক',
                desc_en: `Providing compassionate consultations at ${doctor.chamber.name_en}.`,
                desc_bn: `${doctor.chamber.name_bn}-এ সহানুভূতিশীল পরামর্শ প্রদান।`,
                icon: 'patient',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="card-elevated p-6 hover:shadow-xl transition-shadow"
              >
                <div className="specialty-icon mb-4 text-primary">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </div>
                <h3 className={`text-xl font-bold mb-2 ${language === 'bn' ? 'font-bangla' : ''}`}>
                  {language === 'en' ? item.title_en : item.title_bn}
                </h3>
                <p className={`text-muted-foreground ${language === 'bn' ? 'font-bangla' : ''}`}>
                  {language === 'en' ? item.desc_en : item.desc_bn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Doctor Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={doctor.photo}
                  alt={language === 'en' ? doctor.name_en : doctor.name_bn}
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>

            {/* Content */}
            <div className="space-y-6">
              <span className={`text-sm font-medium text-primary uppercase tracking-wider ${language === 'bn' ? 'font-bangla' : ''}`}>
                {t('Meet Your Surgeon', 'আপনার সার্জনের সাথে পরিচিত হন')}
              </span>

              <h2 className={`text-3xl md:text-4xl font-bold ${language === 'bn' ? 'font-bangla' : ''}`}>
                {language === 'en' ? doctor.name_en : doctor.name_bn}
              </h2>

              <p className={`text-lg text-primary ${language === 'bn' ? 'font-bangla' : ''}`}>
                {language === 'en' ? doctor.title_en : doctor.title_bn}
              </p>

              <p className={`text-muted-foreground ${language === 'bn' ? 'font-bangla' : ''}`}>
                {language === 'en' ? doctor.institution_en : doctor.institution_bn}
              </p>

              <p className={`text-muted-foreground leading-relaxed ${language === 'bn' ? 'font-bangla' : ''}`}>
                <strong className="text-foreground">
                  {language === 'en' ? doctor.name_en : doctor.name_bn}
                </strong>{' '}
                {language === 'en' ? doctor.bio_en : doctor.bio_bn}
              </p>

              {/* Qualifications */}
              <div>
                <h3 className={`text-lg font-bold mb-3 ${language === 'bn' ? 'font-bangla' : ''}`}>
                  {t('Qualifications & Degrees', 'যোগ্যতা ও ডিগ্রি')}
                </h3>
                <ul className="space-y-2">
                  {doctor.qualifications.map((qual, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-foreground">{qual}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href="#locations"
                className={`inline-flex items-center gap-2 btn-primary-gradient px-6 py-3 rounded-full font-medium ${language === 'bn' ? 'font-bangla' : ''}`}
              >
                {t(`Visit Chamber at ${doctor.chamber.name_en}`, `${doctor.chamber.name_bn}-এ চেম্বারে যান`)}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Specialties Section */}
      <section className="py-16 md:py-24 bg-background" id="services">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className={`text-sm font-medium text-primary uppercase tracking-wider ${language === 'bn' ? 'font-bangla' : ''}`}>
              {t('Expertise', 'দক্ষতা')}
            </span>
            <h2 className={`text-3xl md:text-4xl font-bold mt-2 ${language === 'bn' ? 'font-bangla' : ''}`}>
              {t('Specialized Treatments', 'বিশেষ চিকিৎসা')}
            </h2>
            <p className={`text-muted-foreground mt-3 max-w-2xl mx-auto ${language === 'bn' ? 'font-bangla' : ''}`}>
              {t(
                'Comprehensive surgical solutions for gastrointestinal and hepatobiliary conditions.',
                'গ্যাস্ট্রোইনটেস্টাইনাল এবং হেপাটোবিলিয়ারি অবস্থার জন্য ব্যাপক অস্ত্রোপচার সমাধান।'
              )}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctor.specialties.map((specialty) => (
              <div
                key={specialty.id}
                className="card-elevated p-6 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="specialty-icon mb-4 text-primary group-hover:scale-110 transition-transform">
                  {getSpecialtyIcon(specialty.icon)}
                </div>
                <h3 className={`text-xl font-bold mb-2 ${language === 'bn' ? 'font-bangla' : ''}`}>
                  {language === 'en' ? specialty.name_en : specialty.name_bn}
                </h3>
                <p className={`text-muted-foreground ${language === 'bn' ? 'font-bangla' : ''}`}>
                  {language === 'en' ? specialty.description_en : specialty.description_bn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chamber/Location Section */}
      <section className="py-16 md:py-24 bg-secondary/30" id="locations">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className={`text-sm font-medium text-primary uppercase tracking-wider ${language === 'bn' ? 'font-bangla' : ''}`}>
              {t('Chamber', 'চেম্বার')}
            </span>
            <h2 className={`text-3xl md:text-4xl font-bold mt-2 ${language === 'bn' ? 'font-bangla' : ''}`}>
              {t(`Visit ${doctor.name_en.split(' ').pop()}`, `${doctor.name_bn.split(' ').pop()} কে দেখুন`)}
            </h2>
            <p className={`text-muted-foreground mt-3 ${language === 'bn' ? 'font-bangla' : ''}`}>
              {t(`Book your consultation at ${doctor.chamber.name_en}.`, `${doctor.chamber.name_bn}-এ আপনার পরামর্শ বুক করুন।`)}
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="card-elevated p-8">
              <h3 className={`text-xl font-bold mb-6 ${language === 'bn' ? 'font-bangla' : ''}`}>
                {language === 'en' ? doctor.chamber.name_en : doctor.chamber.name_bn}
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className={`font-medium text-foreground ${language === 'bn' ? 'font-bangla' : ''}`}>
                      {t('Address', 'ঠিকানা')}
                    </p>
                    <p className={`text-muted-foreground ${language === 'bn' ? 'font-bangla' : ''}`}>
                      {language === 'en' ? doctor.chamber.address_en : doctor.chamber.address_bn}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className={`font-medium text-foreground ${language === 'bn' ? 'font-bangla' : ''}`}>
                      {t('Visiting Hour', 'পরিদর্শনের সময়')}
                    </p>
                    <p className={`text-muted-foreground ${language === 'bn' ? 'font-bangla' : ''}`}>
                      {language === 'en' ? doctor.chamber.visiting_hours_en : doctor.chamber.visiting_hours_bn}{' '}
                      ({language === 'en' ? doctor.chamber.closed_day_en : doctor.chamber.closed_day_bn})
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className={`font-medium text-foreground ${language === 'bn' ? 'font-bangla' : ''}`}>
                      {t('Appointment', 'অ্যাপয়েন্টমেন্ট')}
                    </p>
                    <a href={`tel:${doctor.contact.phone}`} className="text-primary hover:underline">
                      {doctor.contact.phone}
                    </a>
                  </div>
                </div>
              </div>

              <a
                href={doctor.chamber.map_url}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-6 w-full btn-primary-gradient px-6 py-3 rounded-full font-medium inline-flex items-center justify-center gap-2 ${language === 'bn' ? 'font-bangla' : ''}`}
              >
                <ExternalLink className="w-5 h-5" />
                {t('Get Directions', 'দিকনির্দেশনা পান')}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="py-16 md:py-24 bg-background" id="booking">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className={`text-sm font-medium text-primary uppercase tracking-wider ${language === 'bn' ? 'font-bangla' : ''}`}>
              {t('Appointments', 'অ্যাপয়েন্টমেন্ট')}
            </span>
            <h2 className={`text-3xl md:text-4xl font-bold mt-2 ${language === 'bn' ? 'font-bangla' : ''}`}>
              {t('Book Your Consultation', 'আপনার পরামর্শ বুক করুন')}
            </h2>
            <p className={`text-muted-foreground mt-3 ${language === 'bn' ? 'font-bangla' : ''}`}>
              {t('Simple 3-step process. Team will contact you to confirm.', 'সহজ ৩-ধাপ প্রক্রিয়া। টিম নিশ্চিত করতে আপনার সাথে যোগাযোগ করবে।')}
            </p>
          </div>

          {/* Steps */}
          <div className="flex justify-center gap-8 mb-8">
            {[
              { num: '1', label_en: 'Date', label_bn: 'তারিখ' },
              { num: '2', label_en: 'Time', label_bn: 'সময়' },
              { num: '3', label_en: 'Details', label_bn: 'বিবরণ' },
            ].map((step, index) => (
              <div key={step.num} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  index === 0 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  {step.num}
                </div>
                <span className={`text-sm font-medium ${index === 0 ? 'text-foreground' : 'text-muted-foreground'} ${language === 'bn' ? 'font-bangla' : ''}`}>
                  {language === 'en' ? step.label_en : step.label_bn}
                </span>
              </div>
            ))}
          </div>

          {/* Calendar */}
          <div className="max-w-md mx-auto">
            <div className="card-elevated p-6">
              <div className="flex items-center justify-between mb-4">
                <button className="text-muted-foreground hover:text-foreground transition-colors">
                  ← {t('previous month', 'আগের মাস')}
                </button>
                <h3 className={`text-lg font-bold ${language === 'bn' ? 'font-bangla' : ''}`}>
                  {monthNames[currentMonth]} {currentYear}
                </h3>
                <button className="text-muted-foreground hover:text-foreground transition-colors">
                  {t('next month', 'পরের মাস')} →
                </button>
              </div>

              {/* Day headers */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {dayNames.map((day) => (
                  <div key={day} className={`text-center text-xs font-medium text-muted-foreground py-2 ${language === 'bn' ? 'font-bangla' : ''}`}>
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar grid */}
              <div className="grid grid-cols-7 gap-1">
                {/* Empty cells for days before the first of the month */}
                {Array.from({ length: firstDayOfMonth }).map((_, index) => (
                  <div key={`empty-${index}`} className="aspect-square" />
                ))}
                
                {/* Actual days */}
                {Array.from({ length: daysInMonth }).map((_, index) => {
                  const day = index + 1;
                  const isFriday = (firstDayOfMonth + index) % 7 === 5;
                  const isPast = day < today.getDate();
                  
                  return (
                    <button
                      key={day}
                      onClick={() => !isFriday && !isPast && setSelectedDate(day)}
                      disabled={isFriday || isPast}
                      className={`aspect-square rounded-lg flex items-center justify-center text-sm font-medium transition-all
                        ${selectedDate === day ? 'bg-primary text-primary-foreground' : ''}
                        ${isFriday ? 'text-destructive/50 cursor-not-allowed' : ''}
                        ${isPast ? 'text-muted-foreground/50 cursor-not-allowed' : ''}
                        ${!isFriday && !isPast && selectedDate !== day ? 'hover:bg-primary/10 text-foreground' : ''}
                      `}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Contact Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <a
                href={`tel:${doctor.contact.phone}`}
                className={`flex-1 btn-primary-gradient px-6 py-3 rounded-full font-medium inline-flex items-center justify-center gap-2 ${language === 'bn' ? 'font-bangla' : ''}`}
              >
                <Phone className="w-5 h-5" />
                {t('Call Now', 'এখনই কল করুন')}
              </a>
              <a
                href={`https://wa.me/${doctor.contact.whatsapp.replace(/\+/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex-1 px-6 py-3 rounded-full font-medium border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors inline-flex items-center justify-center gap-2 ${language === 'bn' ? 'font-bangla' : ''}`}
              >
                <MessageCircle className="w-5 h-5" />
                {t('WhatsApp', 'হোয়াটসঅ্যাপ')}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DoctorProfile;
