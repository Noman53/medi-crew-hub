import React, { useState, useMemo } from 'react';
import { doctors } from '@/data/doctors';
import { useLanguage } from '@/contexts/LanguageContext';
import DoctorCard from '@/components/DoctorCard';
import SearchBar from '@/components/SearchBar';
import { Stethoscope, Users, Award, Clock, Heart, Shield, Star } from 'lucide-react';
import { motion } from 'framer-motion';

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

const Home: React.FC = () => {
  const { language, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const filteredDoctors = useMemo(() => {
    let result = [...doctors];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter((doctor) => {
        const name = language === 'bn' ? doctor.name_bn : doctor.name_en;
        const specialist = language === 'bn' ? doctor.specialist_bn : doctor.specialist_en;
        return name.toLowerCase().includes(query) || specialist.toLowerCase().includes(query);
      });
    }

    result.sort((a, b) => {
      if (sortBy === 'name') {
        const nameA = language === 'bn' ? a.name_bn : a.name_en;
        const nameB = language === 'bn' ? b.name_bn : b.name_en;
        return nameA.localeCompare(nameB);
      } else if (sortBy === 'specialist') {
        const specA = language === 'bn' ? a.specialist_bn : a.specialist_en;
        const specB = language === 'bn' ? b.specialist_bn : b.specialist_en;
        return specA.localeCompare(specB);
      }
      return 0;
    });

    return result;
  }, [doctors, searchQuery, sortBy, language]);

  const stats = [
    { icon: Stethoscope, value: doctors.length.toString(), label_en: 'Expert Doctors', label_bn: 'বিশেষজ্ঞ ডাক্তার' },
    { icon: Users, value: '10,000+', label_en: 'Happy Patients', label_bn: 'সন্তুষ্ট রোগী' },
    { icon: Award, value: '15+', label_en: 'Years Experience', label_bn: 'বছরের অভিজ্ঞতা' },
    { icon: Clock, value: '24/7', label_en: 'Support Available', label_bn: 'সাপোর্ট উপলব্ধ' },
  ];

  const features = [
    {
      icon: Heart,
      title_en: 'Expert Care',
      title_bn: 'বিশেষজ্ঞ যত্ন',
      desc_en: 'Highly qualified doctors with years of experience',
      desc_bn: 'বছরের অভিজ্ঞতা সহ উচ্চ যোগ্যতাসম্পন্ন ডাক্তার',
    },
    {
      icon: Shield,
      title_en: 'Trusted Service',
      title_bn: 'বিশ্বস্ত সেবা',
      desc_en: 'Your health and privacy are our top priority',
      desc_bn: 'আপনার স্বাস্থ্য এবং গোপনীয়তা আমাদের শীর্ষ অগ্রাধিকার',
    },
    {
      icon: Star,
      title_en: 'Easy Booking',
      title_bn: 'সহজ বুকিং',
      desc_en: 'Quick and simple appointment scheduling',
      desc_bn: 'দ্রুত এবং সহজ অ্যাপয়েন্টমেন্ট শিডিউলিং',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section - Enhanced Modern Design */}
      <section className="relative hero-gradient overflow-hidden min-h-[70vh] md:min-h-[80vh] flex items-center">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="0.5" fill="currentColor" className="text-primary/20" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>

        {/* Decorative Blobs */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className={`text-xs sm:text-sm font-medium text-primary ${language === 'bn' ? 'font-bangla' : ''}`}>
                {t('Trusted Medical Directory', 'বিশ্বস্ত মেডিকেল ডিরেক্টরি')}
              </span>
            </motion.div>

            <motion.h1 variants={fadeInUp} className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight ${language === 'bn' ? 'font-bangla' : ''}`}>
              <span className="text-foreground">{t('Find Your', 'আপনার')} </span>
              <span className="text-gradient">{t('Expert Doctor', 'বিশেষজ্ঞ ডাক্তার')}</span>
              <br />
              <span className="text-foreground">{t('Today', 'খুঁজুন আজই')}</span>
            </motion.h1>

            <motion.p variants={fadeInUp} className={`text-sm sm:text-base md:text-lg text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed ${language === 'bn' ? 'font-bangla' : ''}`}>
              {t(
                'Connect with Bangladesh\'s finest medical specialists. Book appointments with experienced doctors across multiple specialties.',
                'বাংলাদেশের সেরা চিকিৎসা বিশেষজ্ঞদের সাথে সংযুক্ত হন। বিভিন্ন বিশেষত্বে অভিজ্ঞ ডাক্তারদের সাথে অ্যাপয়েন্টমেন্ট বুক করুন।'
              )}
            </motion.p>

            <motion.div variants={fadeInUp}>
              <SearchBar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                sortBy={sortBy}
                onSortChange={setSortBy}
              />
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 md:h-20">
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.11,140.83,94.17,208.18,70.28,287.43,41.73,321.39,56.44,321.39,56.44Z"
              className="fill-background"
            />
          </svg>
        </div>
      </section>

      {/* Features Section - NEW */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={staggerContainer}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="flex items-start gap-4 p-5 sm:p-6 rounded-2xl bg-card border border-border hover:shadow-lg hover:border-primary/20 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className={`font-bold text-foreground text-base sm:text-lg ${language === 'bn' ? 'font-bangla' : ''}`}>
                    {language === 'en' ? feature.title_en : feature.title_bn}
                  </h3>
                  <p className={`text-sm text-muted-foreground mt-1 ${language === 'bn' ? 'font-bangla' : ''}`}>
                    {language === 'en' ? feature.desc_en : feature.desc_bn}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={staggerContainer}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="text-center p-4 sm:p-6 lg:p-8 rounded-2xl bg-card border border-border hover:shadow-lg transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-primary/10 text-primary mb-3 sm:mb-4">
                  <stat.icon className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">{stat.value}</p>
                <p className={`text-xs sm:text-sm text-muted-foreground mt-1 ${language === 'bn' ? 'font-bangla' : ''}`}>
                  {language === 'en' ? stat.label_en : stat.label_bn}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="py-16 md:py-24 bg-background" id="doctors">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeInUp}
          >
            <span className={`text-xs sm:text-sm font-medium text-primary uppercase tracking-wider ${language === 'bn' ? 'font-bangla tracking-normal' : ''}`}>
              {t('Our Specialists', 'আমাদের বিশেষজ্ঞগণ')}
            </span>
            <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold mt-2 ${language === 'bn' ? 'font-bangla' : ''}`}>
              {t('Meet Our Expert Doctors', 'আমাদের বিশেষজ্ঞ ডাক্তারদের সাথে পরিচিত হন')}
            </h2>
            <p className={`text-muted-foreground mt-4 max-w-2xl mx-auto text-sm sm:text-base ${language === 'bn' ? 'font-bangla' : ''}`}>
              {t(
                'Choose from our team of highly qualified medical professionals dedicated to your health.',
                'আপনার স্বাস্থ্যের জন্য নিবেদিত আমাদের উচ্চ যোগ্যতাসম্পন্ন চিকিৎসা পেশাদারদের দল থেকে বেছে নিন।'
              )}
            </p>
          </motion.div>

          {filteredDoctors.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={staggerContainer}
            >
              {filteredDoctors.map((doctor) => (
                <motion.div key={doctor.id} variants={fadeInUp}>
                  <DoctorCard doctor={doctor} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-16">
              <p className={`text-lg text-muted-foreground ${language === 'bn' ? 'font-bangla' : ''}`}>
                {t('No doctors found matching your search.', 'আপনার অনুসন্ধানের সাথে মেলে এমন কোনো ডাক্তার পাওয়া যায়নি।')}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 hero-gradient">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeInUp} className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-5 ${language === 'bn' ? 'font-bangla' : ''}`}>
              {t('Ready to Book Your Appointment?', 'আপনার অ্যাপয়েন্টমেন্ট বুক করতে প্রস্তুত?')}
            </motion.h2>
            <motion.p variants={fadeInUp} className={`text-base sm:text-lg text-muted-foreground mb-8 ${language === 'bn' ? 'font-bangla' : ''}`}>
              {t(
                'Select a doctor from our directory and schedule your consultation today.',
                'আমাদের ডিরেক্টরি থেকে একজন ডাক্তার নির্বাচন করুন এবং আজই আপনার পরামর্শ সিডিউল করুন।'
              )}
            </motion.p>
            <motion.a
              variants={fadeInUp}
              href="#doctors"
              className={`btn-primary-gradient px-8 sm:px-10 py-3 sm:py-4 rounded-full text-base sm:text-lg font-medium inline-block ${language === 'bn' ? 'font-bangla' : ''}`}
            >
              {t('Browse All Doctors', 'সব ডাক্তার ব্রাউজ করুন')}
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
