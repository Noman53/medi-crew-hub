import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronLeft, ChevronRight, Calendar, Clock, User, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookingConfig, defaultFormFields, defaultTimeSlots } from '@/data/doctors';

interface BookingWizardProps {
  doctorName: string;
  bookingConfig: BookingConfig;
}

const BookingWizard: React.FC<BookingWizardProps> = ({ doctorName, bookingConfig }) => {
  const { language, t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});

  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Use doctor's custom config or defaults
  const timeSlots = bookingConfig?.time_slots || defaultTimeSlots;
  const formFields = bookingConfig?.form_fields || defaultFormFields;
  const closedDays = bookingConfig?.closed_days || [5]; // Default Friday

  const monthNames = language === 'en'
    ? ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    : ['জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'];

  const dayNames = language === 'en'
    ? ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
    : ['রবি', 'সোম', 'মঙ্গল', 'বুধ', 'বৃহঃ', 'শুক্র', 'শনি'];

  const steps = [
    { num: 1, label_en: 'Date', label_bn: 'তারিখ', icon: Calendar },
    { num: 2, label_en: 'Time', label_bn: 'সময়', icon: Clock },
    { num: 3, label_en: 'Details', label_bn: 'বিবরণ', icon: User },
  ];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  // Dynamic closed day check based on doctor's config
  const isDateDisabled = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) return true;
    // Check if day of week is in closed_days array
    if (closedDays.includes(date.getDay())) return true;
    return false;
  };

  const isSameDay = (day: number) => {
    if (!selectedDate) return false;
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentMonth.getMonth() &&
      selectedDate.getFullYear() === currentMonth.getFullYear()
    );
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const handleDateSelect = (day: number) => {
    if (!isDateDisabled(day)) {
      setSelectedDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day));
    }
  };

  const handleSubmit = () => {
    alert(t(
      `Booking request sent! ${doctorName}'s team will contact you soon.`,
      `বুকিং অনুরোধ পাঠানো হয়েছে! ${doctorName} এর টিম শীঘ্রই আপনার সাথে যোগাযোগ করবে।`
    ));
    setCurrentStep(1);
    setSelectedDate(null);
    setSelectedTime(null);
    setFormData({});
  };

  const canProceed = () => {
    if (currentStep === 1) return selectedDate !== null;
    if (currentStep === 2) return selectedTime !== null;
    if (currentStep === 3) {
      // Check all required fields
      return formFields
        .filter(f => f.required)
        .every(f => formData[f.id]?.trim());
    }
    return false;
  };

  // Split form fields into two columns
  const leftFields = formFields.filter((_, i) => i % 2 === 0);
  const rightFields = formFields.filter((_, i) => i % 2 === 1);

  return (
    <div className="max-w-xl mx-auto">
      {/* Steps indicator */}
      <div className="flex justify-center items-center gap-3 sm:gap-4 mb-6">
        {steps.map((step, index) => (
          <React.Fragment key={step.num}>
            <div className="flex flex-col items-center gap-1.5">
              <motion.div
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                  currentStep > step.num
                    ? 'bg-primary text-primary-foreground'
                    : currentStep === step.num
                    ? 'bg-primary text-primary-foreground ring-4 ring-primary/20'
                    : 'bg-muted text-muted-foreground'
                }`}
                animate={{ scale: currentStep === step.num ? 1.1 : 1 }}
              >
                {currentStep > step.num ? <Check className="w-4 h-4" /> : step.num}
              </motion.div>
              <span className={`text-xs font-medium ${currentStep >= step.num ? 'text-foreground' : 'text-muted-foreground'} ${language === 'bn' ? 'font-bangla' : ''}`}>
                {language === 'en' ? step.label_en : step.label_bn}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className={`w-8 sm:w-12 h-0.5 ${currentStep > step.num ? 'bg-primary' : 'bg-muted'} transition-colors duration-300`} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Step content */}
      <div className="card-elevated p-4 sm:p-6 min-h-[360px]">
        <AnimatePresence mode="wait">
          {/* Step 1: Date Selection */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Month navigation with arrows */}
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={handlePrevMonth}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
                  aria-label={t('Previous month', 'আগের মাস')}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <h3 className={`text-base sm:text-lg font-bold ${language === 'bn' ? 'font-bangla' : ''}`}>
                  {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </h3>
                <button
                  onClick={handleNextMonth}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
                  aria-label={t('Next month', 'পরের মাস')}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Day headers */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {dayNames.map((day) => (
                  <div key={day} className={`text-center text-xs font-medium text-muted-foreground py-1.5 ${language === 'bn' ? 'font-bangla' : ''}`}>
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar grid */}
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: getFirstDayOfMonth(currentMonth) }).map((_, i) => (
                  <div key={`empty-${i}`} className="aspect-square" />
                ))}
                {Array.from({ length: getDaysInMonth(currentMonth) }).map((_, i) => {
                  const day = i + 1;
                  const disabled = isDateDisabled(day);
                  const selected = isSameDay(day);
                  const isClosedDay = closedDays.includes(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day).getDay());

                  return (
                    <button
                      key={day}
                      onClick={() => handleDateSelect(day)}
                      disabled={disabled}
                      className={`aspect-square rounded-lg flex items-center justify-center text-sm font-medium transition-all duration-200
                        ${selected ? 'bg-primary text-primary-foreground scale-105' : ''}
                        ${isClosedDay && !selected ? 'text-destructive/50' : ''}
                        ${disabled && !isClosedDay ? 'text-muted-foreground/40' : ''}
                        ${!disabled && !selected ? 'hover:bg-primary/10 text-foreground cursor-pointer' : ''}
                        ${disabled ? 'cursor-not-allowed' : ''}
                      `}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Step 2: Time Selection */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="text-center mb-4">
                <p className={`text-xs text-muted-foreground ${language === 'bn' ? 'font-bangla' : ''}`}>
                  {t('Selected Date:', 'নির্বাচিত তারিখ:')}
                </p>
                <p className={`text-base font-bold ${language === 'bn' ? 'font-bangla' : ''}`}>
                  {selectedDate?.toLocaleDateString(language === 'bn' ? 'bn-BD' : 'en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>

              <p className={`text-xs text-muted-foreground mb-3 ${language === 'bn' ? 'font-bangla' : ''}`}>
                {t('Choose a time slot:', 'একটি সময় বেছে নিন:')}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {timeSlots.map((slot) => (
                  <motion.button
                    key={slot.value}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedTime(slot.value)}
                    className={`p-3 rounded-xl border-2 font-medium transition-all duration-200 text-sm
                      ${selectedTime === slot.value
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border hover:border-primary/50 text-foreground'
                      }
                    `}
                  >
                    {language === 'en' ? slot.label_en : slot.label_bn}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 3: Contact Details - 2 column layout */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="text-center mb-4">
                <p className={`text-xs text-muted-foreground ${language === 'bn' ? 'font-bangla' : ''}`}>
                  {selectedDate?.toLocaleDateString(language === 'bn' ? 'bn-BD' : 'en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                  })} • {timeSlots.find(s => s.value === selectedTime)?.[language === 'en' ? 'label_en' : 'label_bn']}
                </p>
              </div>

              {/* Two column form layout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {formFields.map((field) => (
                  <div key={field.id} className={field.type === 'textarea' ? 'sm:col-span-2' : ''}>
                    <label className={`block text-xs font-medium mb-1.5 ${language === 'bn' ? 'font-bangla' : ''}`}>
                      {language === 'en' ? field.label_en : field.label_bn}
                      {field.required && <span className="text-destructive ml-0.5">*</span>}
                    </label>
                    {field.type === 'textarea' ? (
                      <textarea
                        value={formData[field.id] || ''}
                        onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
                        placeholder={language === 'en' ? field.placeholder_en : field.placeholder_bn}
                        rows={2}
                        className={`w-full px-3 py-2.5 rounded-xl border border-border bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none text-sm ${language === 'bn' ? 'font-bangla' : ''}`}
                      />
                    ) : (
                      <input
                        type={field.type}
                        value={formData[field.id] || ''}
                        onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
                        placeholder={language === 'en' ? field.placeholder_en : field.placeholder_bn}
                        className={`w-full px-3 py-2.5 rounded-xl border border-border bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm ${language === 'bn' ? 'font-bangla' : ''}`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between mt-5">
        <button
          onClick={() => setCurrentStep(currentStep - 1)}
          disabled={currentStep === 1}
          className={`px-4 sm:px-5 py-2.5 rounded-full font-medium border-2 border-border text-muted-foreground hover:border-primary hover:text-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm ${language === 'bn' ? 'font-bangla' : ''}`}
        >
          <ChevronLeft className="w-4 h-4 inline mr-1" />
          {t('Back', 'পেছনে')}
        </button>

        {currentStep < 3 ? (
          <button
            onClick={() => setCurrentStep(currentStep + 1)}
            disabled={!canProceed()}
            className={`btn-primary-gradient px-4 sm:px-5 py-2.5 rounded-full font-medium disabled:opacity-50 disabled:cursor-not-allowed text-sm ${language === 'bn' ? 'font-bangla' : ''}`}
          >
            {t('Next', 'পরবর্তী')}
            <ChevronRight className="w-4 h-4 inline ml-1" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={!canProceed()}
            className={`btn-primary-gradient px-5 sm:px-6 py-2.5 rounded-full font-medium disabled:opacity-50 disabled:cursor-not-allowed text-sm ${language === 'bn' ? 'font-bangla' : ''}`}
          >
            {t('Confirm Booking', 'বুকিং নিশ্চিত করুন')}
          </button>
        )}
      </div>
    </div>
  );
};

export default BookingWizard;
