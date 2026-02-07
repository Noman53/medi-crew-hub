import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { getDoctorBySlug } from '@/data/doctors';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Phone,
  MapPin,
  Clock,
  Calendar,
  MessageCircle,
  ExternalLink,
  Award,
  CheckCircle,
  Stethoscope,
} from 'lucide-react';
import { motion } from 'framer-motion';
import FloatingContactIcons from '@/components/FloatingContactIcons';
import BookingWizard from '@/components/BookingWizard';

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
  return icons[iconName] || icons.ecg;
};

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0, 0, 0.2, 1] as const },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const DoctorProfile: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { language, t } = useLanguage();

  const doctor = getDoctorBySlug(slug || '');

  if (!doctor) {
    return <Navigate to="/" replace />;
  }

  // Build Google Maps embed URL from address
  const mapEmbedQuery = encodeURIComponent(
    language === 'en' ? `${doctor.chamber.name_en}, ${doctor.chamber.address_en}` : `${doctor.chamber.name_en}, ${doctor.chamber.address_en}`
  );

  return (
    <div className="min-h-screen bg-background" id="top">
      {/* Floating Contact Icons */}
      <FloatingContactIcons phone={doctor.contact.phone} whatsapp={doctor.contact.whatsapp} />

      {/* Hero Section - Image RIGHT, content LEFT */}
      <section className="relative hero-gradient overflow-hidden min-h-[85vh] flex items-center">
        <div className="container mx-auto px-4 py-16 md:py-20 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <motion.div
              className="space-y-6 order-2 lg:order-1"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              {/* Title Badge */}
              <motion.div variants={fadeInUp} custom={0} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                <span className="w-2 h-2 rounded-full bg-primary" />
                <span className={`text-sm font-medium text-primary uppercase tracking-wider ${language === 'bn' ? 'font-bangla tracking-normal' : ''}`}>
                  {language === 'en' ? doctor.title_en : doctor.title_bn}
                </span>
              </motion.div>

              {/* Main Heading */}
              <motion.h1 variants={fadeInUp} custom={1} className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight ${language === 'bn' ? 'font-bangla' : ''}`}>
                <span className="text-foreground">{t('Expert Care for', 'বিশেষজ্ঞ যত্ন')} </span>
                <br />
                <span className="text-gradient">
                  {language === 'en'
                    ? doctor.hero_tagline_en.replace('Expert Care for ', '')
                    : doctor.hero_tagline_bn.replace('বিশেষজ্ঞ যত্ন ', '')}
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p variants={fadeInUp} custom={2} className={`text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed ${language === 'bn' ? 'font-bangla' : ''}`}>
                {language === 'en' ? doctor.hero_description_en : doctor.hero_description_bn}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div variants={fadeInUp} custom={3} className="flex flex-wrap gap-4 pt-2">
                <a
                  href="#booking"
                  className={`btn-primary-gradient px-6 sm:px-7 py-3 sm:py-3.5 rounded-full font-medium inline-flex items-center gap-2 text-sm sm:text-base ${language === 'bn' ? 'font-bangla' : ''}`}
                >
                  <Calendar className="w-5 h-5" />
                  {t('Book Consultation', 'পরামর্শ বুক করুন')}
                </a>
                <a
                  href="#services"
                  className={`px-6 sm:px-7 py-3 sm:py-3.5 rounded-full font-medium border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 inline-flex items-center gap-2 text-sm sm:text-base ${language === 'bn' ? 'font-bangla' : ''}`}
                >
                  {t('View Specialties', 'বিশেষত্ব দেখুন')}
                </a>
              </motion.div>

              {/* Badges */}
              <motion.div variants={fadeInUp} custom={4} className="flex flex-wrap gap-x-6 gap-y-3 pt-4">
                {doctor.badges.map((badge, index) => (
                  <div key={index} className="flex items-center gap-2 text-muted-foreground">
                    <Award className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium">{badge.text}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Content - Doctor Image (properly sized) */}
            <motion.div
              className="relative flex justify-center lg:justify-end order-1 lg:order-2"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              {/* Decorative blur circle */}
              <div className="absolute w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-primary/20 to-accent/10 blur-3xl -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

              {/* Doctor Image Container */}
              <div className="relative">
                {/* Main Image - constrained size */}
                <div className="w-52 h-52 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl float-animation">
                  <img
                    src={doctor.photo}
                    alt={language === 'en' ? doctor.name_en : doctor.name_bn}
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                {/* Info Card - Floating */}
                <motion.div
                  className="absolute -bottom-2 -right-2 sm:bottom-2 sm:-right-4 md:bottom-6 md:-right-6 glass rounded-xl p-3 sm:p-4 shadow-xl max-w-[180px] sm:max-w-[200px]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="flex-1 min-w-0">
                      <p className={`font-bold text-foreground text-xs sm:text-sm leading-tight ${language === 'bn' ? 'font-bangla' : ''}`}>
                        {language === 'en' ? doctor.name_en : doctor.name_bn}
                      </p>
                      <p className={`text-[10px] sm:text-xs text-primary mt-0.5 leading-tight ${language === 'bn' ? 'font-bangla' : ''}`}>
                        {language === 'en' ? doctor.title_en : doctor.title_bn}
                      </p>
                      <p className={`text-[10px] sm:text-xs text-muted-foreground mt-0.5 leading-tight ${language === 'bn' ? 'font-bangla' : ''}`}>
                        {language === 'en' ? doctor.institution_en : doctor.institution_bn}
                      </p>
                    </div>
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                      <Stethoscope className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" />
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
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
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeInUp}
          >
            <h2 className={`text-3xl md:text-4xl font-bold ${language === 'bn' ? 'font-bangla' : ''}`}>
              {t(`Why Choose Dr. ${doctor.name_en.split(' ').pop()}?`, `কেন ডাঃ ${doctor.name_bn.split(' ').pop()} বেছে নেবেন?`)}
            </h2>
            <p className={`text-muted-foreground mt-4 max-w-2xl mx-auto ${language === 'bn' ? 'font-bangla' : ''}`}>
              {t('Modern surgical care with advanced techniques and patient-centric approach.', 'উন্নত কৌশল এবং রোগী-কেন্দ্রিক পদ্ধতির সাথে আধুনিক অস্ত্রোপচার যত্ন।')}
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-6 lg:gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
          >
            {[
              {
                title_en: 'Advanced Surgery',
                title_bn: 'উন্নত সার্জারি',
                desc_en: 'Specialized in Hepatobiliary surgery for complex liver and bile duct disorders.',
                desc_bn: 'জটিল লিভার এবং পিত্তনালীর ব্যাধির জন্য হেপাটোবিলিয়ারি সার্জারিতে বিশেষজ্ঞ।',
              },
              {
                title_en: 'Minimally Invasive',
                title_bn: 'ন্যূনতম আক্রমণাত্মক',
                desc_en: 'Laparoscopic techniques ensuring smaller incisions, less pain, and quicker recovery.',
                desc_bn: 'ল্যাপারোস্কপিক কৌশল ছোট ছেদ, কম ব্যথা এবং দ্রুত পুনরুদ্ধার নিশ্চিত করে।',
              },
              {
                title_en: 'Patient-Centric',
                title_bn: 'রোগী-কেন্দ্রিক',
                desc_en: `Providing compassionate consultations at ${doctor.chamber.name_en}.`,
                desc_bn: `${doctor.chamber.name_bn}-এ সহানুভূতিশীল পরামর্শ প্রদান।`,
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                custom={index}
                className="card-elevated p-6 lg:p-8 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="specialty-icon mb-5 text-primary group-hover:scale-110 transition-transform duration-300">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </div>
                <h3 className={`text-xl font-bold mb-3 ${language === 'bn' ? 'font-bangla' : ''}`}>
                  {language === 'en' ? item.title_en : item.title_bn}
                </h3>
                <p className={`text-muted-foreground leading-relaxed ${language === 'bn' ? 'font-bangla' : ''}`}>
                  {language === 'en' ? item.desc_en : item.desc_bn}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Doctor Section */}
      <section className="py-16 md:py-24 bg-secondary/30" id="about">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
            >
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl max-w-md mx-auto lg:max-w-none">
                <img
                  src={doctor.photo}
                  alt={language === 'en' ? doctor.name_en : doctor.name_bn}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/10 rounded-2xl -z-10" />
            </motion.div>

            {/* Content */}
            <motion.div
              className="space-y-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={staggerContainer}
            >
              <motion.span variants={fadeInUp} className={`text-sm font-medium text-primary uppercase tracking-wider ${language === 'bn' ? 'font-bangla tracking-normal' : ''}`}>
                {t('Meet Your Surgeon', 'আপনার সার্জনের সাথে পরিচিত হন')}
              </motion.span>

              <motion.h2 variants={fadeInUp} className={`text-3xl md:text-4xl font-bold ${language === 'bn' ? 'font-bangla' : ''}`}>
                {language === 'en' ? doctor.name_en : doctor.name_bn}
              </motion.h2>

              <motion.p variants={fadeInUp} className={`text-lg text-primary font-medium ${language === 'bn' ? 'font-bangla' : ''}`}>
                {language === 'en' ? doctor.title_en : doctor.title_bn}
              </motion.p>

              <motion.p variants={fadeInUp} className={`text-muted-foreground ${language === 'bn' ? 'font-bangla' : ''}`}>
                {language === 'en' ? doctor.institution_en : doctor.institution_bn}
              </motion.p>

              <motion.p variants={fadeInUp} className={`text-muted-foreground leading-relaxed ${language === 'bn' ? 'font-bangla' : ''}`}>
                <strong className="text-foreground">
                  {language === 'en' ? doctor.name_en : doctor.name_bn}
                </strong>{' '}
                {language === 'en' ? doctor.bio_en : doctor.bio_bn}
              </motion.p>

              {/* Qualifications */}
              <motion.div variants={fadeInUp} className="pt-2">
                <h3 className={`text-lg font-bold mb-4 ${language === 'bn' ? 'font-bangla' : ''}`}>
                  {t('Qualifications & Degrees', 'যোগ্যতা ও ডিগ্রি')}
                </h3>
                <ul className="space-y-3">
                  {doctor.qualifications.map((qual, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-foreground font-medium">{qual}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.a
                variants={fadeInUp}
                href="#locations"
                className={`inline-flex items-center gap-2 btn-primary-gradient px-7 py-3.5 rounded-full font-medium ${language === 'bn' ? 'font-bangla' : ''}`}
              >
                {t(`Visit Chamber at ${doctor.chamber.name_en}`, `${doctor.chamber.name_bn}-এ চেম্বারে যান`)}
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Specialties Section */}
      <section className="py-16 md:py-24 bg-background" id="services">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeInUp}
          >
            <span className={`text-sm font-medium text-primary uppercase tracking-wider ${language === 'bn' ? 'font-bangla tracking-normal' : ''}`}>
              {t('Expertise', 'দক্ষতা')}
            </span>
            <h2 className={`text-3xl md:text-4xl font-bold mt-2 ${language === 'bn' ? 'font-bangla' : ''}`}>
              {t('Specialized Treatments', 'বিশেষ চিকিৎসা')}
            </h2>
            <p className={`text-muted-foreground mt-4 max-w-2xl mx-auto ${language === 'bn' ? 'font-bangla' : ''}`}>
              {t(
                'Comprehensive surgical solutions for gastrointestinal and hepatobiliary conditions.',
                'গ্যাস্ট্রোইনটেস্টাইনাল এবং হেপাটোবিলিয়ারি অবস্থার জন্য ব্যাপক অস্ত্রোপচার সমাধান।'
              )}
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
          >
            {doctor.specialties.map((specialty) => (
              <motion.div
                key={specialty.id}
                variants={fadeInUp}
                className="card-elevated p-6 lg:p-8 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="specialty-icon mb-5 text-primary group-hover:scale-110 transition-transform duration-300">
                  {getSpecialtyIcon(specialty.icon)}
                </div>
                <h3 className={`text-xl font-bold mb-3 ${language === 'bn' ? 'font-bangla' : ''}`}>
                  {language === 'en' ? specialty.name_en : specialty.name_bn}
                </h3>
                <p className={`text-muted-foreground leading-relaxed ${language === 'bn' ? 'font-bangla' : ''}`}>
                  {language === 'en' ? specialty.description_en : specialty.description_bn}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Chamber/Location Section with Google Map */}
      <section className="py-16 md:py-24 bg-secondary/30" id="locations">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeInUp}
          >
            <span className={`text-sm font-medium text-primary uppercase tracking-wider ${language === 'bn' ? 'font-bangla tracking-normal' : ''}`}>
              {t('Chamber', 'চেম্বার')}
            </span>
            <h2 className={`text-3xl md:text-4xl font-bold mt-2 ${language === 'bn' ? 'font-bangla' : ''}`}>
              {t(`Visit Dr. ${doctor.name_en.split(' ').pop()}`, `ডাঃ ${doctor.name_bn.split(' ').pop()} কে দেখুন`)}
            </h2>
            <p className={`text-muted-foreground mt-4 ${language === 'bn' ? 'font-bangla' : ''}`}>
              {t(`Book your consultation at ${doctor.chamber.name_en}.`, `${doctor.chamber.name_bn}-এ আপনার পরামর্শ বুক করুন।`)}
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              className="grid lg:grid-cols-2 gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={staggerContainer}
            >
              {/* Chamber Info Card */}
              <motion.div variants={fadeInUp} className="card-elevated p-6 sm:p-8 flex flex-col">
                <h3 className={`text-xl font-bold mb-6 ${language === 'bn' ? 'font-bangla' : ''}`}>
                  {language === 'en' ? doctor.chamber.name_en : doctor.chamber.name_bn}
                </h3>

                <div className="space-y-5 flex-1">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className={`font-semibold text-foreground ${language === 'bn' ? 'font-bangla' : ''}`}>
                        {t('Address', 'ঠিকানা')}
                      </p>
                      <p className={`text-sm text-muted-foreground mt-1 ${language === 'bn' ? 'font-bangla' : ''}`}>
                        {language === 'en' ? doctor.chamber.address_en : doctor.chamber.address_bn}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className={`font-semibold text-foreground ${language === 'bn' ? 'font-bangla' : ''}`}>
                        {t('Visiting Hour', 'পরিদর্শনের সময়')}
                      </p>
                      <p className={`text-sm text-muted-foreground mt-1 ${language === 'bn' ? 'font-bangla' : ''}`}>
                        {language === 'en' ? doctor.chamber.visiting_hours_en : doctor.chamber.visiting_hours_bn}{' '}
                        ({language === 'en' ? doctor.chamber.closed_day_en : doctor.chamber.closed_day_bn})
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className={`font-semibold text-foreground ${language === 'bn' ? 'font-bangla' : ''}`}>
                        {t('Appointment', 'অ্যাপয়েন্টমেন্ট')}
                      </p>
                      <a href={`tel:${doctor.contact.phone}`} className="text-primary hover:underline font-medium text-sm mt-1 block">
                        {doctor.contact.phone}
                      </a>
                    </div>
                  </div>
                </div>

                <a
                  href={doctor.chamber.map_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-6 w-full btn-primary-gradient px-6 py-3.5 rounded-full font-medium inline-flex items-center justify-center gap-2 ${language === 'bn' ? 'font-bangla' : ''}`}
                >
                  <ExternalLink className="w-5 h-5" />
                  {t('Get Directions', 'দিকনির্দেশনা পান')}
                </a>
              </motion.div>

              {/* Google Map Embed */}
              <motion.div variants={fadeInUp} className="card-elevated overflow-hidden min-h-[300px] lg:min-h-0">
                <iframe
                  title={`${doctor.chamber.name_en} Location`}
                  src={`https://www.google.com/maps?q=${mapEmbedQuery}&output=embed`}
                  className="w-full h-full min-h-[300px] lg:min-h-[400px]"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="py-16 md:py-24 bg-background" id="booking">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeInUp}
          >
            <span className={`text-sm font-medium text-primary uppercase tracking-wider ${language === 'bn' ? 'font-bangla tracking-normal' : ''}`}>
              {t('Appointments', 'অ্যাপয়েন্টমেন্ট')}
            </span>
            <h2 className={`text-3xl md:text-4xl font-bold mt-2 ${language === 'bn' ? 'font-bangla' : ''}`}>
              {t('Book Your Consultation', 'আপনার পরামর্শ বুক করুন')}
            </h2>
            <p className={`text-muted-foreground mt-4 ${language === 'bn' ? 'font-bangla' : ''}`}>
              {t('Simple 3-step process. Team will contact you to confirm.', 'সহজ ৩-ধাপ প্রক্রিয়া। টিম নিশ্চিত করতে আপনার সাথে যোগাযোগ করবে।')}
            </p>
          </motion.div>

          <BookingWizard
            doctorName={language === 'en' ? doctor.name_en : doctor.name_bn}
            closedDay={doctor.chamber.closed_day_en}
          />

          {/* Quick Contact Buttons */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <a
              href={`tel:${doctor.contact.phone}`}
              className={`flex-1 btn-primary-gradient px-6 py-3.5 rounded-full font-medium inline-flex items-center justify-center gap-2 ${language === 'bn' ? 'font-bangla' : ''}`}
            >
              <Phone className="w-5 h-5" />
              {t('Call Now', 'এখনই কল করুন')}
            </a>
            <a
              href={`https://wa.me/${doctor.contact.whatsapp.replace(/\+/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex-1 px-6 py-3.5 rounded-full font-medium border-2 border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all duration-300 inline-flex items-center justify-center gap-2 ${language === 'bn' ? 'font-bangla' : ''}`}
            >
              <MessageCircle className="w-5 h-5" />
              {t('WhatsApp', 'হোয়াটসঅ্যাপ')}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DoctorProfile;
