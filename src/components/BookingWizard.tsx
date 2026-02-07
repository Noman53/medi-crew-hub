import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronLeft, ChevronRight, Calendar, Clock, User, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface BookingWizardProps {
  doctorName: string;
  closedDay: string;
}

const BookingWizard: React.FC<BookingWizardProps> = ({ doctorName, closedDay }) => {
  const { language, t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    problem: '',
  });

  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthNames = language === 'en'
    ? ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    : ['জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'];

  const dayNames = language === 'en'
    ? ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
    : ['রবি', 'সোম', 'মঙ্গল', 'বুধ', 'বৃহঃ', 'শুক্র', 'শনি'];

  const timeSlots = [
    { value: '18:00', label_en: '6:00 PM', label_bn: 'সন্ধ্যা ৬:০০' },
    { value: '18:30', label_en: '6:30 PM', label_bn: 'সন্ধ্যা ৬:৩০' },
    { value: '19:00', label_en: '7:00 PM', label_bn: 'সন্ধ্যা ৭:০০' },
    { value: '19:30', label_en: '7:30 PM', label_bn: 'সন্ধ্যা ৭:৩০' },
    { value: '20:00', label_en: '8:00 PM', label_bn: 'রাত ৮:০০' },
    { value: '20:30', label_en: '8:30 PM', label_bn: 'রাত ৮:৩০' },
  ];

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

  const isDateDisabled = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) return true;
    if (closedDay.toLowerCase().includes('friday') && date.getDay() === 5) return true;
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
    setFormData({ name: '', phone: '', problem: '' });
  };

  const canProceed = () => {
    if (currentStep === 1) return selectedDate !== null;
    if (currentStep === 2) return selectedTime !== null;
    if (currentStep === 3) return formData.name.trim() !== '' && formData.phone.trim() !== '';
    return false;
  };

  return (
    <div className="max-w-lg mx-auto">
      {/* Steps indicator */}
      <div className="flex justify-center items-center gap-4 mb-8">
        {steps.map((step, index) => (
          <React.Fragment key={step.num}>
            <div className="flex flex-col items-center gap-2">
              <motion.div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                  currentStep > step.num
                    ? 'bg-primary text-primary-foreground'
                    : currentStep === step.num
                    ? 'bg-primary text-primary-foreground ring-4 ring-primary/20'
                    : 'bg-muted text-muted-foreground'
                }`}
                animate={{ scale: currentStep === step.num ? 1.1 : 1 }}
              >
                {currentStep > step.num ? <Check className="w-5 h-5" /> : step.num}
              </motion.div>
              <span className={`text-xs font-medium ${currentStep >= step.num ? 'text-foreground' : 'text-muted-foreground'} ${language === 'bn' ? 'font-bangla' : ''}`}>
                {language === 'en' ? step.label_en : step.label_bn}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className={`w-12 h-0.5 ${currentStep > step.num ? 'bg-primary' : 'bg-muted'} transition-colors duration-300`} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Step content */}
      <div className="card-elevated p-6 min-h-[400px]">
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
              {/* Month navigation - ARROWS ONLY */}
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={handlePrevMonth}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
                  aria-label={t('Previous month', 'আগের মাস')}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <h3 className={`text-lg font-bold ${language === 'bn' ? 'font-bangla' : ''}`}>
                  {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </h3>
                <button
                  onClick={handleNextMonth}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
                  aria-label={t('Next month', 'পরের মাস')}
                >
                  <ChevronRight className="w-5 h-5" />
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
                {Array.from({ length: getFirstDayOfMonth(currentMonth) }).map((_, i) => (
                  <div key={`empty-${i}`} className="aspect-square" />
                ))}
                {Array.from({ length: getDaysInMonth(currentMonth) }).map((_, i) => {
                  const day = i + 1;
                  const disabled = isDateDisabled(day);
                  const selected = isSameDay(day);
                  const isFriday = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day).getDay() === 5;

                  return (
                    <button
                      key={day}
                      onClick={() => handleDateSelect(day)}
                      disabled={disabled}
                      className={`aspect-square rounded-lg flex items-center justify-center text-sm font-medium transition-all duration-200
                        ${selected ? 'bg-primary text-primary-foreground scale-105' : ''}
                        ${isFriday && !selected ? 'text-destructive/50' : ''}
                        ${disabled && !isFriday ? 'text-muted-foreground/40' : ''}
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
              <div className="text-center mb-6">
                <p className={`text-sm text-muted-foreground ${language === 'bn' ? 'font-bangla' : ''}`}>
                  {t('Selected Date:', 'নির্বাচিত তারিখ:')}
                </p>
                <p className={`text-lg font-bold ${language === 'bn' ? 'font-bangla' : ''}`}>
                  {selectedDate?.toLocaleDateString(language === 'bn' ? 'bn-BD' : 'en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>

              <p className={`text-sm text-muted-foreground mb-4 ${language === 'bn' ? 'font-bangla' : ''}`}>
                {t('Choose a time slot:', 'একটি সময় বেছে নিন:')}
              </p>

              <div className="grid grid-cols-2 gap-3">
                {timeSlots.map((slot) => (
                  <motion.button
                    key={slot.value}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedTime(slot.value)}
                    className={`p-4 rounded-xl border-2 font-medium transition-all duration-200
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

          {/* Step 3: Contact Details */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="text-center mb-6">
                <p className={`text-sm text-muted-foreground ${language === 'bn' ? 'font-bangla' : ''}`}>
                  {selectedDate?.toLocaleDateString(language === 'bn' ? 'bn-BD' : 'en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                  })} • {timeSlots.find(s => s.value === selectedTime)?.[language === 'en' ? 'label_en' : 'label_bn']}
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${language === 'bn' ? 'font-bangla' : ''}`}>
                    {t('Full Name', 'পূর্ণ নাম')} <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={t('Enter your name', 'আপনার নাম লিখুন')}
                    className={`w-full px-4 py-3 rounded-xl border border-border bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all ${language === 'bn' ? 'font-bangla' : ''}`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${language === 'bn' ? 'font-bangla' : ''}`}>
                    {t('Phone Number', 'ফোন নম্বর')} <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder={t('01XXX-XXXXXX', '০১XXX-XXXXXX')}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${language === 'bn' ? 'font-bangla' : ''}`}>
                    {t('Describe your problem (optional)', 'আপনার সমস্যা বর্ণনা করুন (ঐচ্ছিক)')}
                  </label>
                  <textarea
                    value={formData.problem}
                    onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                    placeholder={t('Brief description...', 'সংক্ষিপ্ত বিবরণ...')}
                    rows={3}
                    className={`w-full px-4 py-3 rounded-xl border border-border bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none ${language === 'bn' ? 'font-bangla' : ''}`}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={() => setCurrentStep(currentStep - 1)}
          disabled={currentStep === 1}
          className={`px-6 py-3 rounded-full font-medium border-2 border-border text-muted-foreground hover:border-primary hover:text-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed ${language === 'bn' ? 'font-bangla' : ''}`}
        >
          <ChevronLeft className="w-5 h-5 inline mr-1" />
          {t('Back', 'পেছনে')}
        </button>

        {currentStep < 3 ? (
          <button
            onClick={() => setCurrentStep(currentStep + 1)}
            disabled={!canProceed()}
            className={`btn-primary-gradient px-6 py-3 rounded-full font-medium disabled:opacity-50 disabled:cursor-not-allowed ${language === 'bn' ? 'font-bangla' : ''}`}
          >
            {t('Next', 'পরবর্তী')}
            <ChevronRight className="w-5 h-5 inline ml-1" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={!canProceed()}
            className={`btn-primary-gradient px-8 py-3 rounded-full font-medium disabled:opacity-50 disabled:cursor-not-allowed ${language === 'bn' ? 'font-bangla' : ''}`}
          >
            {t('Confirm Booking', 'বুকিং নিশ্চিত করুন')}
          </button>
        )}
      </div>
    </div>
  );
};

export default BookingWizard;
