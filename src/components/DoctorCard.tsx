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
      <div className="doctor-card bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300">
        {/* Circular Image Container */}
        <div className="flex justify-center pt-8 pb-4 bg-gradient-to-b from-primary/5 to-transparent">
           {/* Circular image - automatically adapts to any uploaded photo */}
           <div className="w-36 h-36 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-primary/15 shadow-lg group-hover:border-primary/30 transition-all duration-300 bg-secondary">
             <img
               src={doctor.photo}
               alt={language === 'en' ? doctor.name_en : doctor.name_bn}
               className="w-full h-full object-cover object-top"
             />
          </div>
        </div>

        {/* Card Content */}
        <div className="px-5 pb-6 text-center space-y-3">
          {/* Doctor Name & Title */}
          <div>
            <p className={`text-lg font-bold text-foreground leading-tight ${language === 'bn' ? 'font-bangla' : ''}`}>
              {language === 'en' ? doctor.name_en : doctor.name_bn}
            </p>
            <p className={`text-sm text-muted-foreground mt-1 ${language === 'bn' ? 'font-bangla' : ''}`}>
              {language === 'en' ? doctor.title_en : doctor.title_bn}
            </p>
          </div>

          {/* Specialist Badge */}
          <div className="flex justify-center">
            <div className="badge-teal text-xs">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
              <span className={language === 'bn' ? 'font-bangla' : ''}>
                {language === 'en' ? doctor.specialist_en : doctor.specialist_bn}
              </span>
            </div>
          </div>

          {/* Institution */}
          <p className={`text-sm text-muted-foreground line-clamp-2 ${language === 'bn' ? 'font-bangla' : ''}`}>
            {language === 'en' ? doctor.institution_en : doctor.institution_bn}
          </p>

          {/* View Profile Button */}
          <div className="pt-1">
            <span className={`inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all duration-300 ${language === 'bn' ? 'font-bangla' : ''}`}>
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
