import React, { useState, useMemo } from 'react';
import { doctors } from '@/data/doctors';
import { useLanguage } from '@/contexts/LanguageContext';
import DoctorCard from '@/components/DoctorCard';
import SearchBar from '@/components/SearchBar';
import { Stethoscope, Users, Award, Clock } from 'lucide-react';

const Home: React.FC = () => {
  const { language, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');

  // Filter and sort doctors
  const filteredDoctors = useMemo(() => {
    let result = [...doctors];

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter((doctor) => {
        const name = language === 'bn' ? doctor.name_bn : doctor.name_en;
        const specialist = language === 'bn' ? doctor.specialist_bn : doctor.specialist_en;
        return name.toLowerCase().includes(query) || specialist.toLowerCase().includes(query);
      });
    }

    // Sort doctors
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
    {
      icon: Stethoscope,
      value: doctors.length.toString(),
      label_en: 'Expert Doctors',
      label_bn: 'বিশেষজ্ঞ ডাক্তার',
    },
    {
      icon: Users,
      value: '10,000+',
      label_en: 'Happy Patients',
      label_bn: 'সন্তুষ্ট রোগী',
    },
    {
      icon: Award,
      value: '15+',
      label_en: 'Years Experience',
      label_bn: 'বছরের অভিজ্ঞতা',
    },
    {
      icon: Clock,
      value: '24/7',
      label_en: 'Support Available',
      label_bn: 'সাপোর্ট উপলব্ধ',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative hero-gradient overflow-hidden">
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

        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 animate-fade-in-up">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className={`text-sm font-medium text-primary ${language === 'bn' ? 'font-bangla' : ''}`}>
                {t('Trusted Medical Directory', 'বিশ্বস্ত মেডিকেল ডিরেক্টরি')}
              </span>
            </div>

            {/* Main Heading */}
            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in-up ${language === 'bn' ? 'font-bangla' : ''}`}>
              <span className="text-foreground">{t('Find Your', 'আপনার')} </span>
              <span className="text-gradient">{t('Expert Doctor', 'বিশেষজ্ঞ ডাক্তার')}</span>
              <br />
              <span className="text-foreground">{t('Today', 'খুঁজুন আজই')}</span>
            </h1>

            {/* Subtitle */}
            <p className={`text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in-up delay-100 ${language === 'bn' ? 'font-bangla' : ''}`}>
              {t(
                'Connect with Bangladesh\'s finest medical specialists. Book appointments with experienced doctors across multiple specialties.',
                'বাংলাদেশের সেরা চিকিৎসা বিশেষজ্ঞদের সাথে সংযুক্ত হন। বিভিন্ন বিশেষত্বে অভিজ্ঞ ডাক্তারদের সাথে অ্যাপয়েন্টমেন্ট বুক করুন।'
              )}
            </p>

            {/* Search Bar */}
            <div className="animate-fade-in-up delay-200">
              <SearchBar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                sortBy={sortBy}
                onSortChange={setSortBy}
              />
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

      {/* Stats Section */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-2xl bg-card border border-border hover:shadow-lg transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4">
                  <stat.icon className="w-6 h-6" />
                </div>
                <p className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</p>
                <p className={`text-sm text-muted-foreground ${language === 'bn' ? 'font-bangla' : ''}`}>
                  {language === 'en' ? stat.label_en : stat.label_bn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="py-12 md:py-20 bg-background" id="doctors">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-12">
            <span className={`text-sm font-medium text-primary uppercase tracking-wider ${language === 'bn' ? 'font-bangla' : ''}`}>
              {t('Our Specialists', 'আমাদের বিশেষজ্ঞগণ')}
            </span>
            <h2 className={`text-3xl md:text-4xl font-bold mt-2 ${language === 'bn' ? 'font-bangla' : ''}`}>
              {t('Meet Our Expert Doctors', 'আমাদের বিশেষজ্ঞ ডাক্তারদের সাথে পরিচিত হন')}
            </h2>
            <p className={`text-muted-foreground mt-3 max-w-2xl mx-auto ${language === 'bn' ? 'font-bangla' : ''}`}>
              {t(
                'Choose from our team of highly qualified medical professionals dedicated to your health.',
                'আপনার স্বাস্থ্যের জন্য নিবেদিত আমাদের উচ্চ যোগ্যতাসম্পন্ন চিকিৎসা পেশাদারদের দল থেকে বেছে নিন।'
              )}
            </p>
          </div>

          {/* Doctors Grid */}
          {filteredDoctors.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {filteredDoctors.map((doctor, index) => (
                <div
                  key={doctor.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <DoctorCard doctor={doctor} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
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
          <div className="max-w-3xl mx-auto text-center">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${language === 'bn' ? 'font-bangla' : ''}`}>
              {t('Ready to Book Your Appointment?', 'আপনার অ্যাপয়েন্টমেন্ট বুক করতে প্রস্তুত?')}
            </h2>
            <p className={`text-lg text-muted-foreground mb-8 ${language === 'bn' ? 'font-bangla' : ''}`}>
              {t(
                'Select a doctor from our directory and schedule your consultation today.',
                'আমাদের ডিরেক্টরি থেকে একজন ডাক্তার নির্বাচন করুন এবং আজই আপনার পরামর্শ সিডিউল করুন।'
              )}
            </p>
            <button className={`btn-primary-gradient px-8 py-4 rounded-full text-lg font-medium ${language === 'bn' ? 'font-bangla' : ''}`}>
              {t('Browse All Doctors', 'সব ডাক্তার ব্রাউজ করুন')}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
