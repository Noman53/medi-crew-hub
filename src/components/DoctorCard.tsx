import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Doctor } from '@/data/doctors';
import { useLanguage } from '@/contexts/LanguageContext';

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  const { language, t } = useLanguage();

  return (
    <Link to={`/doctor/${doctor.slug}`} className="group block">
      <div className="doctor-card bg-card border border-border overflow-hidden">
        {/* Image Container */}
        <div className="relative overflow-hidden">
          <div className="aspect-[4/3] overflow-hidden">
            <img
              src={doctor.photo}
              alt={language === 'en' ? doctor.name_en : doctor.name_bn}
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent" />
          
          {/* Doctor Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 text-background">
            <p className={`text-lg font-bold leading-tight ${language === 'bn' ? 'font-bangla' : ''}`}>
              {language === 'en' ? doctor.name_en : doctor.name_bn}
            </p>
            <p className={`text-sm text-background/80 mt-0.5 ${language === 'bn' ? 'font-bangla' : ''}`}>
              {language === 'en' ? doctor.title_en : doctor.title_bn}
            </p>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-4 space-y-3">
          {/* Specialist Badge */}
          <div className="badge-teal text-xs">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
            <span className={language === 'bn' ? 'font-bangla' : ''}>
              {language === 'en' ? doctor.specialist_en : doctor.specialist_bn}
            </span>
          </div>

          {/* Institution */}
          <p className={`text-sm text-muted-foreground line-clamp-2 ${language === 'bn' ? 'font-bangla' : ''}`}>
            {language === 'en' ? doctor.institution_en : doctor.institution_bn}
          </p>

          {/* View Profile Button */}
          <div className="pt-2">
            <span className={`inline-flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all duration-300 ${language === 'bn' ? 'font-bangla' : ''}`}>
              {t('View Profile', 'প্রোফাইল দেখুন')}
              <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DoctorCard;
