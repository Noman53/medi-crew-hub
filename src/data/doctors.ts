/**
 * ============================================================================
 * DOCTOR CMS DATA - CENTRALIZED CONFIGURATION
 * ============================================================================
 * 
 * This file is the SINGLE SOURCE OF TRUTH for all doctor data.
 * Adding/removing doctors here automatically updates the entire application:
 * - Home page directory
 * - Navigation dropdowns
 * - Individual doctor profile pages
 * - Booking calendars with custom off-days
 * - Floating contact buttons
 * 
 * ============================================================================
 * HOW TO ADD A NEW DOCTOR:
 * ============================================================================
 * 1. Import the doctor's photo at the bottom of the imports section
 * 2. Copy an existing doctor object from the `doctors` array
 * 3. Update all fields with the new doctor's information
 * 4. The doctor will automatically appear everywhere in the app
 * 
 * ============================================================================
 * HOW TO CUSTOMIZE PER-DOCTOR SETTINGS:
 * ============================================================================
 * 
 * BOOKING OFF-DAYS (closed_days):
 * - 0 = Sunday, 1 = Monday, 2 = Tuesday, 3 = Wednesday
 * - 4 = Thursday, 5 = Friday, 6 = Saturday
 * - Example: [5] means Friday is closed
 * - Example: [5, 6] means Friday and Saturday are closed
 * 
 * TIME SLOTS:
 * - Define custom time slots per doctor in booking_config.time_slots
 * - Each slot needs: value (24h format), label_en, label_bn
 * 
 * CHAMBER/LOCATION:
 * - Each doctor has their own chamber info in the `chamber` object
 * - Update name, address, visiting hours, closed days, and map URL
 * 
 * CONTACT INFO (Floating Button):
 * - phone: Phone number for calls
 * - whatsapp: WhatsApp number (with country code)
 * - These appear in the floating contact icons on doctor profiles
 * 
 * ============================================================================
 */

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface Doctor {
  id: string;
  slug: string;                    // URL-friendly identifier (e.g., "dr-john-doe")
  name_bn: string;                 // Name in Bengali
  name_en: string;                 // Name in English
  title_bn: string;                // Title/Position in Bengali
  title_en: string;                // Title/Position in English
  institution_bn: string;          // Institution in Bengali
  institution_en: string;          // Institution in English
  specialist_bn: string;           // Specialty in Bengali
  specialist_en: string;           // Specialty in English
  photo: string;                   // Photo path (import at bottom)
  bio_bn: string;                  // Biography in Bengali
  bio_en: string;                  // Biography in English
  qualifications: string[];        // List of degrees/qualifications
  specialties: Specialty[];        // List of specialties/services
  
  // ⚡ CHAMBER SETTINGS - Customize location per doctor
  chamber: Chamber;
  
  // ⚡ CONTACT INFO - Appears in floating contact icons
  contact: Contact;
  
  hero_tagline_bn: string;
  hero_tagline_en: string;
  hero_description_bn: string;
  hero_description_en: string;
  badges: Badge[];
  
  // ⚡ BOOKING SETTINGS - Customize calendar/form per doctor
  booking_config: BookingConfig;
}

export interface Specialty {
  id: string;
  name_bn: string;
  name_en: string;
  description_bn: string;
  description_en: string;
  icon: string;  // Icon name (see DoctorProfile.tsx for available icons)
}

/**
 * CHAMBER CONFIGURATION
 * ---------------------
 * Each doctor can have a different chamber location.
 * The map_url should be a Google Maps directions link.
 */
export interface Chamber {
  name_bn: string;                 // Hospital/Clinic name in Bengali
  name_en: string;                 // Hospital/Clinic name in English
  address_bn: string;              // Full address in Bengali
  address_en: string;              // Full address in English
  visiting_hours_bn: string;       // e.g., "সন্ধ্যা ৬টা থেকে রাত ৯টা"
  visiting_hours_en: string;       // e.g., "6pm to 9pm"
  closed_day_bn: string;           // e.g., "শুক্রবার বন্ধ"
  closed_day_en: string;           // e.g., "Closed: Friday"
  map_url: string;                 // Google Maps directions URL
}

/**
 * CONTACT CONFIGURATION
 * ---------------------
 * These numbers appear in the floating contact icons on doctor profiles.
 * Include country code for WhatsApp (e.g., +8801234567890)
 */
export interface Contact {
  phone: string;                   // Phone number for calls
  whatsapp: string;                // WhatsApp number (with country code, no +)
  email?: string;                  // Optional email address
}

export interface Badge {
  text: string;
  icon?: string;
}

/**
 * BOOKING CONFIGURATION
 * ---------------------
 * Customize the booking calendar and form for each doctor.
 * 
 * closed_days: Array of day numbers that are closed
 *   - 0 = Sunday, 1 = Monday, 2 = Tuesday, 3 = Wednesday
 *   - 4 = Thursday, 5 = Friday, 6 = Saturday
 *   - Example: [5] = Friday closed
 *   - Example: [5, 6] = Friday and Saturday closed
 *   - Example: [0, 6] = Sunday and Saturday closed
 * 
 * time_slots: Available appointment times
 *   - Use 24-hour format for value (e.g., "18:00" for 6 PM)
 * 
 * form_fields: Fields shown in the booking form
 *   - Use defaultFormFields or customize per doctor
 */
export interface BookingConfig {
  closed_days: number[];           // Days calendar should disable (0-6)
  time_slots: TimeSlot[];          // Available appointment times
  form_fields: FormField[];        // Booking form fields
}

export interface TimeSlot {
  value: string;                   // 24h format: "18:00"
  label_en: string;                // Display: "6:00 PM"
  label_bn: string;                // Display: "সন্ধ্যা ৬:০০"
}

export interface FormField {
  id: string;
  type: 'text' | 'tel' | 'email' | 'textarea' | 'number';
  label_en: string;
  label_bn: string;
  placeholder_en: string;
  placeholder_bn: string;
  required: boolean;
}

// ============================================================================
// DEFAULT CONFIGURATIONS (Use these as templates)
// ============================================================================

/**
 * DEFAULT TIME SLOTS
 * Use this for evening appointments (6 PM - 8:30 PM)
 * Or create custom time slots for each doctor
 */
export const defaultTimeSlots: TimeSlot[] = [
  { value: '18:00', label_en: '6:00 PM', label_bn: 'সন্ধ্যা ৬:০০' },
  { value: '18:30', label_en: '6:30 PM', label_bn: 'সন্ধ্যা ৬:৩০' },
  { value: '19:00', label_en: '7:00 PM', label_bn: 'সন্ধ্যা ৭:০০' },
  { value: '19:30', label_en: '7:30 PM', label_bn: 'সন্ধ্যা ৭:৩০' },
  { value: '20:00', label_en: '8:00 PM', label_bn: 'রাত ৮:০০' },
  { value: '20:30', label_en: '8:30 PM', label_bn: 'রাত ৮:৩০' },
];

/**
 * AFTERNOON TIME SLOTS EXAMPLE
 * Use this for afternoon appointments (4 PM - 7:30 PM)
 */
export const afternoonTimeSlots: TimeSlot[] = [
  { value: '16:00', label_en: '4:00 PM', label_bn: 'বিকাল ৪:০০' },
  { value: '16:30', label_en: '4:30 PM', label_bn: 'বিকাল ৪:৩০' },
  { value: '17:00', label_en: '5:00 PM', label_bn: 'বিকাল ৫:০০' },
  { value: '17:30', label_en: '5:30 PM', label_bn: 'বিকাল ৫:৩০' },
  { value: '18:00', label_en: '6:00 PM', label_bn: 'সন্ধ্যা ৬:০০' },
  { value: '18:30', label_en: '6:30 PM', label_bn: 'সন্ধ্যা ৬:৩০' },
  { value: '19:00', label_en: '7:00 PM', label_bn: 'সন্ধ্যা ৭:০০' },
  { value: '19:30', label_en: '7:30 PM', label_bn: 'সন্ধ্যা ৭:৩০' },
];

/**
 * DEFAULT FORM FIELDS
 * Standard booking form with name, phone, age, email, reason
 */
export const defaultFormFields: FormField[] = [
  {
    id: 'name',
    type: 'text',
    label_en: 'Full Name',
    label_bn: 'পূর্ণ নাম',
    placeholder_en: 'Enter your full name',
    placeholder_bn: 'আপনার পূর্ণ নাম লিখুন',
    required: true,
  },
  {
    id: 'phone',
    type: 'tel',
    label_en: 'Phone Number',
    label_bn: 'ফোন নম্বর',
    placeholder_en: '01XXX-XXXXXX',
    placeholder_bn: '০১XXX-XXXXXX',
    required: true,
  },
  {
    id: 'age',
    type: 'number',
    label_en: 'Age',
    label_bn: 'বয়স',
    placeholder_en: 'Your age',
    placeholder_bn: 'আপনার বয়স',
    required: false,
  },
  {
    id: 'email',
    type: 'email',
    label_en: 'Email (Optional)',
    label_bn: 'ইমেইল (ঐচ্ছিক)',
    placeholder_en: 'your@email.com',
    placeholder_bn: 'your@email.com',
    required: false,
  },
  {
    id: 'reason',
    type: 'textarea',
    label_en: 'Reason for Visit',
    label_bn: 'পরিদর্শনের কারণ',
    placeholder_en: 'Brief description of your concern...',
    placeholder_bn: 'আপনার সমস্যার সংক্ষিপ্ত বিবরণ...',
    required: false,
  },
];

// ============================================================================
// DOCTOR PHOTOS - Import all doctor images here
// ============================================================================
import drMuhsinImg from '@/assets/doctors/dr-muhsin.jpg';
import drFatimaImg from '@/assets/doctors/dr-fatima.jpg';
import drKarimImg from '@/assets/doctors/dr-karim.jpg';
import drNazneenImg from '@/assets/doctors/dr-nazneen.jpg';
import drHossainImg from '@/assets/doctors/dr-hossain.jpg';

// ============================================================================
// DOCTORS DATA - Add/Edit/Remove doctors here
// ============================================================================

export const doctors: Doctor[] = [
  /**
   * ========================================
   * DOCTOR 1: Dr. Syed Md. Muhsin
   * ========================================
   * Specialty: General, Laparoscopic & Hepatobiliary Surgeon
   * Chamber: Surgiscope Hospital, Chattogram
   * Off Day: Friday (5)
   */
  {
    id: "1",
    slug: "dr-syed-md-muhsin",  // URL: /doctor/dr-syed-md-muhsin
    
    // Basic Information
    name_bn: "ডা. সৈয়দ মোঃ মুহসিন",
    name_en: "Dr. Syed Md. Muhsin",
    title_bn: "সার্জারি বিভাগের সহযোগী অধ্যাপক",
    title_en: "Associate Professor of Surgery",
    institution_bn: "চট্টগ্রাম মেডিকেল কলেজ ও হাসপাতাল",
    institution_en: "Chittagong Medical College & Hospital",
    specialist_bn: "জেনারেল, ল্যাপারোস্কপিক ও হেপাটোবিলিয়ারি সার্জন",
    specialist_en: "General, Laparoscopic & Hepatobiliary Surgeon",
    
    // Photo - Import at the top and reference here
    photo: drMuhsinImg,
    
    // Biography
    bio_bn: "ডা. সৈয়দ মোঃ মুহসিন চট্টগ্রামের একজন দক্ষ জেনারেল, ল্যাপারোস্কপিক ও হেপাটোবিলিয়ারি সার্জন। তিনি পিত্তথলির রোগ, লিভার টিউমার, পিত্তনালীর সমস্যা, অগ্ন্যাশয়ের রোগ এবং হার্নিয়া মেরামত ও এপেন্ডেক্টমির মতো রুটিন পদ্ধতিতে বিশেষজ্ঞ।",
    bio_en: "Dr. Syed Md. Muhsin is a highly skilled General, Laparoscopic, and Hepatobiliary surgeon in Chattogram. He specializes in gallbladder diseases, liver tumors, bile duct disorders, pancreatic diseases, and routine procedures like hernia repair and appendectomies.",
    
    // Qualifications (shown with checkmarks)
    qualifications: ["MBBS, MCPS, MS", "FCPS (Hepatobiliary)", "FRCS (Hon.), FACS", "FMAS Fellowship"],
    
    // Hero Section Content
    hero_tagline_bn: "লিভার ও পেটের স্বাস্থ্যের জন্য বিশেষজ্ঞ যত্ন",
    hero_tagline_en: "Expert Care for Liver & Abdominal Health",
    hero_description_bn: "ডা. সৈয়দ মোঃ মুহসিন জেনারেল, ল্যাপারোস্কপিক এবং হেপাটোবিলিয়ারি সার্জারিতে বিশেষ যত্ন প্রদান করেন। পিত্তথলি, লিভার এবং অগ্ন্যাশয়ের জটিল অবস্থার নিখুঁত চিকিৎসা।",
    hero_description_en: "Dr. Syed Md. Muhsin provides specialized care in General, Laparoscopic, and Hepatobiliary surgery. Treating complex conditions of the gallbladder, liver, and pancreas with precision.",
    
    // Badges shown in hero
    badges: [
      { text: "FRCS (Hon.)" },
      { text: "FACS (Hon.)" },
      { text: "Hepatobiliary Specialist" },
    ],
    
    // Specialties/Services
    specialties: [
      {
        id: "gallbladder",
        name_bn: "পিত্তথলি",
        name_en: "Gallbladder",
        description_bn: "উন্নত ল্যাপারোস্কপিক কৌশল ব্যবহার করে পিত্তপাথর এবং প্রদাহের চিকিৎসা।",
        description_en: "Treatment for gallstones and inflammation using advanced laparoscopic techniques.",
        icon: "gallbladder",
      },
      {
        id: "liver",
        name_bn: "লিভার টিউমার",
        name_en: "Liver Tumors",
        description_bn: "টিউমার এবং সিস্ট সহ জটিল লিভার অবস্থার অস্ত্রোপচার ব্যবস্থাপনা।",
        description_en: "Surgical management of complex liver conditions including tumors and cysts.",
        icon: "liver",
      },
      {
        id: "bileduct",
        name_bn: "পিত্তনালী",
        name_en: "Bile Duct",
        description_bn: "পিত্তনালীতে বাধা, পাথর এবং সংকীর্ণতার জন্য বিশেষজ্ঞ অস্ত্রোপচার যত্ন।",
        description_en: "Expert surgical care for obstructions, stones, and strictures in the bile ducts.",
        icon: "bileduct",
      },
      {
        id: "pancreas",
        name_bn: "অগ্ন্যাশয়",
        name_en: "Pancreas",
        description_bn: "প্যানক্রিয়াটাইটিস এবং অগ্ন্যাশয়ের মাসের জন্য বিশেষ হস্তক্ষেপ।",
        description_en: "Specialized interventions for pancreatitis and pancreatic masses.",
        icon: "pancreas",
      },
      {
        id: "hernia",
        name_bn: "হার্নিয়া মেরামত",
        name_en: "Hernia Repair",
        description_bn: "ইনগুইনাল, আম্বিলিক্যাল এবং ইনসিশনাল হার্নিয়ার উন্নত মেরামত।",
        description_en: "Advanced repair for inguinal, umbilical, and incisional hernias.",
        icon: "hernia",
      },
      {
        id: "appendix",
        name_bn: "এপেন্ডিসাইটিস",
        name_en: "Appendicitis",
        description_bn: "ফেটে যাওয়া এবং জটিলতা প্রতিরোধে এপেন্ডিক্সের জরুরি অস্ত্রোপচার অপসারণ।",
        description_en: "Urgent surgical removal of the appendix to prevent rupture and complications.",
        icon: "appendix",
      },
    ],
    
    // ⚡ CHAMBER SETTINGS
    // Customize the hospital/clinic location for this doctor
    chamber: {
      name_bn: "সার্জিস্কোপ হাসপাতাল, চট্টগ্রাম",
      name_en: "Surgiscope Hospital, Chattogram",
      address_bn: "ইউনিট ২, ৪৪৫/৪৬৬, কাটালগঞ্জ, চকবাজার, চট্টগ্রাম – ৪২০৩",
      address_en: "Unit 2, 445/466, Katalgonj, Chawkbazar, Chattogram – 4203",
      visiting_hours_bn: "সন্ধ্যা ৬টা থেকে রাত ৯টা",
      visiting_hours_en: "6pm to 9pm",
      closed_day_bn: "শুক্রবার বন্ধ",
      closed_day_en: "Closed: Friday",
      // Google Maps directions link - Update with actual location
      map_url: "https://www.google.com/maps/dir/?api=1&destination=Surgiscope+Hospital+Chattogram",
    },
    
    // ⚡ CONTACT INFO (Floating Button)
    // These numbers appear in the floating contact icons
    contact: {
      phone: "+8801711946412",      // For phone calls
      whatsapp: "+8801711946412",   // For WhatsApp (include country code)
    },
    
    // ⚡ BOOKING CONFIGURATION
    booking_config: {
      // OFF DAYS: 0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat
      closed_days: [5],  // Friday is closed
      
      // TIME SLOTS: Use defaultTimeSlots or create custom array
      time_slots: defaultTimeSlots,
      
      // FORM FIELDS: Use defaultFormFields or customize
      form_fields: defaultFormFields,
    },
  },
  
  /**
   * ========================================
   * DOCTOR 2: Dr. Fatima Rahman
   * ========================================
   * Specialty: Interventional Cardiologist
   * Chamber: Labaid Cardiac Hospital, Dhaka
   * Off Day: Saturday (6)
   */
  {
    id: "2",
    slug: "dr-fatima-rahman",  // URL: /doctor/dr-fatima-rahman
    
    // Basic Information
    name_bn: "ডা. ফাতিমা রহমান",
    name_en: "Dr. Fatima Rahman",
    title_bn: "কার্ডিওলজি বিভাগের সহযোগী অধ্যাপক",
    title_en: "Associate Professor of Cardiology",
    institution_bn: "ঢাকা মেডিকেল কলেজ ও হাসপাতাল",
    institution_en: "Dhaka Medical College & Hospital",
    specialist_bn: "ইন্টারভেনশনাল কার্ডিওলজিস্ট",
    specialist_en: "Interventional Cardiologist",
    
    // Photo - TODO: Replace with actual photo
    photo: drFatimaImg,
    
    // Biography
    bio_bn: "ডা. ফাতিমা রহমান একজন অভিজ্ঞ কার্ডিওলজিস্ট যিনি হৃদরোগ নির্ণয় ও চিকিৎসায় বিশেষজ্ঞ। তিনি এনজিওপ্লাস্টি, স্টেন্ট স্থাপন এবং হৃদযন্ত্রের জটিল পদ্ধতিতে দক্ষ।",
    bio_en: "Dr. Fatima Rahman is an experienced cardiologist specializing in heart disease diagnosis and treatment. She is skilled in angioplasty, stent placement, and complex cardiac procedures.",
    
    qualifications: ["MBBS, MD (Cardiology)", "FRCP (UK)", "Fellowship in Interventional Cardiology"],
    
    hero_tagline_bn: "আপনার হৃদয়ের সুস্বাস্থ্যের জন্য",
    hero_tagline_en: "For Your Heart's Health",
    hero_description_bn: "ডা. ফাতিমা রহমান হৃদরোগের আধুনিক চিকিৎসা এবং প্রতিরোধমূলক যত্ন প্রদান করেন। সর্বাধুনিক প্রযুক্তি দিয়ে আপনার হৃদয়কে সুস্থ রাখুন।",
    hero_description_en: "Dr. Fatima Rahman provides modern cardiac treatment and preventive care. Keep your heart healthy with state-of-the-art technology.",
    
    badges: [
      { text: "FRCP (UK)" },
      { text: "Interventional Cardiologist" },
    ],
    
    specialties: [
      {
        id: "angioplasty",
        name_bn: "এনজিওপ্লাস্টি",
        name_en: "Angioplasty",
        description_bn: "ব্লকড ধমনী খোলার জন্য আধুনিক বেলুন এনজিওপ্লাস্টি পদ্ধতি।",
        description_en: "Modern balloon angioplasty procedures to open blocked arteries.",
        icon: "heart",
      },
      {
        id: "echocardiography",
        name_bn: "ইকোকার্ডিওগ্রাফি",
        name_en: "Echocardiography",
        description_bn: "হৃদযন্ত্রের গঠন ও কার্যকারিতা মূল্যায়নের জন্য আল্ট্রাসাউন্ড পরীক্ষা।",
        description_en: "Ultrasound examination to assess heart structure and function.",
        icon: "ecg",
      },
      {
        id: "pacemaker",
        name_bn: "পেসমেকার",
        name_en: "Pacemaker",
        description_bn: "হৃদস্পন্দন নিয়ন্ত্রণের জন্য পেসমেকার স্থাপন।",
        description_en: "Pacemaker implantation for heart rhythm control.",
        icon: "pacemaker",
      },
    ],
    
    // ⚡ CHAMBER SETTINGS (Different from Dr. Muhsin)
    chamber: {
      name_bn: "ল্যাবএইড কার্ডিয়াক হাসপাতাল, ঢাকা",
      name_en: "Labaid Cardiac Hospital, Dhaka",
      address_bn: "বাড়ি ৬, রোড ৪, ধানমন্ডি, ঢাকা - ১২০৫",
      address_en: "House 6, Road 4, Dhanmondi, Dhaka - 1205",
      visiting_hours_bn: "বিকাল ৪টা থেকে রাত ৮টা",
      visiting_hours_en: "4pm to 8pm",
      closed_day_bn: "শনিবার বন্ধ",
      closed_day_en: "Closed: Saturday",
      map_url: "https://www.google.com/maps/dir/?api=1&destination=Labaid+Cardiac+Hospital+Dhaka",
    },
    
    // ⚡ CONTACT INFO (Different phone numbers)
    contact: {
      phone: "+8801712345678",
      whatsapp: "+8801712345678",
    },
    
    // ⚡ BOOKING CONFIGURATION (Different off day and time slots)
    booking_config: {
      // Saturday is closed (different from Dr. Muhsin who has Friday closed)
      closed_days: [6],
      
      // Afternoon time slots (different from Dr. Muhsin's evening slots)
      time_slots: afternoonTimeSlots,
      
      form_fields: defaultFormFields,
    },
  },

  /**
   * ========================================
   * DOCTOR 3: Dr. Abdul Karim
   * ========================================
   * Specialty: Orthopedic Surgeon
   * Chamber: National Institute of Traumatology, Dhaka
   * Off Day: Sunday (0)
   */
  {
    id: "3",
    slug: "dr-abdul-karim",
    name_bn: "ডা. আব্দুল করিম",
    name_en: "Dr. Abdul Karim",
    title_bn: "অর্থোপেডিক সার্জারি বিভাগের অধ্যাপক",
    title_en: "Professor of Orthopedic Surgery",
    institution_bn: "জাতীয় ট্রমাটোলজি ও অর্থোপেডিক পুনর্বাসন ইনস্টিটিউট",
    institution_en: "National Institute of Traumatology & Orthopedic Rehabilitation",
    specialist_bn: "অর্থোপেডিক ও স্পাইন সার্জন",
    specialist_en: "Orthopedic & Spine Surgeon",
    photo: drKarimImg,
    bio_bn: "ডা. আব্দুল করিম একজন অভিজ্ঞ অর্থোপেডিক সার্জন যিনি হাড় ও জয়েন্টের চিকিৎসায় বিশেষজ্ঞ। তিনি মেরুদণ্ড, হাঁটু ও কোমরের জটিল সার্জারিতে দক্ষ।",
    bio_en: "Dr. Abdul Karim is an experienced orthopedic surgeon specializing in bone and joint treatment. He is skilled in complex spine, knee, and hip surgeries.",
    qualifications: ["MBBS, MS (Orthopedics)", "Fellow AO Spine", "FRCS (Edinburgh)", "FICS"],
    hero_tagline_bn: "হাড় ও জয়েন্টের সুস্বাস্থ্যের জন্য",
    hero_tagline_en: "Bone & Joint Health",
    hero_description_bn: "ডা. আব্দুল করিম অর্থোপেডিক সার্জারিতে আধুনিক চিকিৎসা প্রদান করেন। মেরুদণ্ড, হাঁটু এবং কোমরের সমস্যার সুচিকিৎসা।",
    hero_description_en: "Dr. Abdul Karim provides modern orthopedic surgical care. Expert treatment for spine, knee, and hip conditions.",
    badges: [{ text: "FRCS (Edinburgh)" }, { text: "AO Spine Fellow" }, { text: "Spine Specialist" }],
    specialties: [
      { id: "spine", name_bn: "মেরুদণ্ড", name_en: "Spine Surgery", description_bn: "মেরুদণ্ডের জটিল অবস্থার অস্ত্রোপচার চিকিৎসা।", description_en: "Surgical treatment for complex spinal conditions.", icon: "bone" },
      { id: "knee", name_bn: "হাঁটু প্রতিস্থাপন", name_en: "Knee Replacement", description_bn: "আর্থ্রাইটিসের জন্য টোটাল নি রিপ্লেসমেন্ট।", description_en: "Total knee replacement for arthritis.", icon: "bone" },
      { id: "trauma", name_bn: "ট্রমা কেয়ার", name_en: "Trauma Care", description_bn: "ফ্র্যাকচার ও আঘাতের জরুরি অস্ত্রোপচার।", description_en: "Emergency surgery for fractures and injuries.", icon: "appendix" },
    ],
    chamber: {
      name_bn: "ইবনে সিনা হাসপাতাল, ঢাকা",
      name_en: "Ibn Sina Hospital, Dhaka",
      address_bn: "বাড়ি ৪৮, রোড ৯/এ, ধানমন্ডি, ঢাকা - ১২০৯",
      address_en: "House 48, Road 9/A, Dhanmondi, Dhaka - 1209",
      visiting_hours_bn: "বিকাল ৫টা থেকে রাত ৮টা",
      visiting_hours_en: "5pm to 8pm",
      closed_day_bn: "রবিবার বন্ধ",
      closed_day_en: "Closed: Sunday",
      map_url: "https://www.google.com/maps/dir/?api=1&destination=Ibn+Sina+Hospital+Dhaka",
    },
    contact: { phone: "+8801819876543", whatsapp: "+8801819876543" },
    booking_config: {
      closed_days: [0], // Sunday closed
      time_slots: defaultTimeSlots,
      form_fields: defaultFormFields,
    },
  },

  /**
   * ========================================
   * DOCTOR 4: Dr. Nazneen Akter
   * ========================================
   * Specialty: Gynecology & Obstetrics
   * Chamber: Evercare Hospital, Dhaka
   * Off Day: Thursday (4)
   */
  {
    id: "4",
    slug: "dr-nazneen-akter",
    name_bn: "ডা. নাজনীন আক্তার",
    name_en: "Dr. Nazneen Akter",
    title_bn: "গাইনি ও অবস বিভাগের সহযোগী অধ্যাপক",
    title_en: "Associate Professor of Gynecology & Obstetrics",
    institution_bn: "এভারকেয়ার হাসপাতাল, ঢাকা",
    institution_en: "Evercare Hospital, Dhaka",
    specialist_bn: "গাইনি ও প্রসূতি বিশেষজ্ঞ",
    specialist_en: "Gynecology & Obstetrics Specialist",
    photo: drNazneenImg,
    bio_bn: "ডা. নাজনীন আক্তার মহিলাদের স্বাস্থ্য সেবায় নিবেদিত একজন অভিজ্ঞ গাইনি বিশেষজ্ঞ। তিনি উচ্চ ঝুঁকিপূর্ণ গর্ভাবস্থা এবং ল্যাপারোস্কপিক গাইনি সার্জারিতে দক্ষ।",
    bio_en: "Dr. Nazneen Akter is an experienced gynecologist dedicated to women's health. She specializes in high-risk pregnancies and laparoscopic gynecological surgery.",
    qualifications: ["MBBS, FCPS (Gynae)", "MS (Obs & Gynae)", "Fellowship in Reproductive Medicine"],
    hero_tagline_bn: "মহিলাদের সুস্বাস্থ্যের জন্য",
    hero_tagline_en: "Women's Health & Wellness",
    hero_description_bn: "ডা. নাজনীন আক্তার মহিলাদের সম্পূর্ণ স্বাস্থ্য সেবা প্রদান করেন। গর্ভাবস্থা, প্রসব এবং গাইনি সমস্যার আধুনিক চিকিৎসা।",
    hero_description_en: "Dr. Nazneen Akter provides comprehensive women's health care. Modern treatment for pregnancy, delivery, and gynecological conditions.",
    badges: [{ text: "FCPS (Gynae)" }, { text: "Reproductive Medicine" }],
    specialties: [
      { id: "pregnancy", name_bn: "উচ্চ ঝুঁকি গর্ভাবস্থা", name_en: "High-Risk Pregnancy", description_bn: "জটিল গর্ভাবস্থার বিশেষজ্ঞ ব্যবস্থাপনা।", description_en: "Specialized management of complex pregnancies.", icon: "heart" },
      { id: "laparoscopy", name_bn: "ল্যাপারোস্কপি", name_en: "Laparoscopy", description_bn: "ন্যূনতম আক্রমণাত্মক গাইনি সার্জারি।", description_en: "Minimally invasive gynecological surgery.", icon: "ecg" },
      { id: "fertility", name_bn: "বন্ধ্যাত্ব চিকিৎসা", name_en: "Fertility Treatment", description_bn: "বন্ধ্যাত্বের আধুনিক চিকিৎসা।", description_en: "Modern fertility treatment options.", icon: "heart" },
    ],
    chamber: {
      name_bn: "এভারকেয়ার হাসপাতাল, ঢাকা",
      name_en: "Evercare Hospital, Dhaka",
      address_bn: "প্লট ৮১, ব্লক ই, বশুন্ধরা, ঢাকা - ১২২৯",
      address_en: "Plot 81, Block E, Bashundhara, Dhaka - 1229",
      visiting_hours_bn: "সকাল ১০টা থেকে দুপুর ১টা",
      visiting_hours_en: "10am to 1pm",
      closed_day_bn: "বৃহস্পতিবার বন্ধ",
      closed_day_en: "Closed: Thursday",
      map_url: "https://www.google.com/maps/dir/?api=1&destination=Evercare+Hospital+Dhaka",
    },
    contact: { phone: "+8801755432100", whatsapp: "+8801755432100" },
    booking_config: {
      closed_days: [4], // Thursday closed
      time_slots: afternoonTimeSlots,
      form_fields: defaultFormFields,
    },
  },

  /**
   * ========================================
   * DOCTOR 5: Dr. Md. Rafiqul Hossain
   * ========================================
   * Specialty: Neurologist
   * Chamber: Square Hospital, Dhaka
   * Off Day: Tuesday (2)
   */
  {
    id: "5",
    slug: "dr-rafiqul-hossain",
    name_bn: "ডা. মো. রফিকুল হোসেন",
    name_en: "Dr. Md. Rafiqul Hossain",
    title_bn: "নিউরোলজি বিভাগের অধ্যাপক",
    title_en: "Professor of Neurology",
    institution_bn: "স্কয়ার হাসপাতাল, ঢাকা",
    institution_en: "Square Hospital, Dhaka",
    specialist_bn: "নিউরোলজিস্ট ও স্ট্রোক বিশেষজ্ঞ",
    specialist_en: "Neurologist & Stroke Specialist",
    photo: drHossainImg,
    bio_bn: "ডা. মো. রফিকুল হোসেন একজন প্রখ্যাত নিউরোলজিস্ট। তিনি স্ট্রোক, মৃগী, মাথাব্যথা এবং স্নায়ুতন্ত্রের জটিল রোগের চিকিৎসায় বিশেষজ্ঞ।",
    bio_en: "Dr. Md. Rafiqul Hossain is a renowned neurologist. He specializes in stroke, epilepsy, headache, and complex nervous system disorders.",
    qualifications: ["MBBS, MD (Neurology)", "MRCP (UK)", "Fellow of Neurology (USA)", "FACP"],
    hero_tagline_bn: "স্নায়ু স্বাস্থ্যের জন্য বিশেষজ্ঞ যত্ন",
    hero_tagline_en: "Expert Neurological Care",
    hero_description_bn: "ডা. রফিকুল হোসেন স্নায়ুতন্ত্রের আধুনিক চিকিৎসা প্রদান করেন। স্ট্রোক, মৃগী এবং মাথাব্যথার সুচিকিৎসা।",
    hero_description_en: "Dr. Rafiqul Hossain provides modern neurological treatment. Expert care for stroke, epilepsy, and headache disorders.",
    badges: [{ text: "MRCP (UK)" }, { text: "FACP" }, { text: "Stroke Specialist" }],
    specialties: [
      { id: "stroke", name_bn: "স্ট্রোক", name_en: "Stroke Treatment", description_bn: "স্ট্রোকের জরুরি ও পুনর্বাসন চিকিৎসা।", description_en: "Emergency and rehabilitation stroke care.", icon: "ecg" },
      { id: "epilepsy", name_bn: "মৃগী রোগ", name_en: "Epilepsy", description_bn: "মৃগী রোগের আধুনিক ওষুধ ও ব্যবস্থাপনা।", description_en: "Modern medication and management for epilepsy.", icon: "ecg" },
      { id: "headache", name_bn: "মাথাব্যথা", name_en: "Headache Disorders", description_bn: "মাইগ্রেন ও দীর্ঘস্থায়ী মাথাব্যথার চিকিৎসা।", description_en: "Treatment for migraine and chronic headache.", icon: "ecg" },
    ],
    chamber: {
      name_bn: "স্কয়ার হাসপাতাল, ঢাকা",
      name_en: "Square Hospital, Dhaka",
      address_bn: "১৮/এফ, বীর উত্তম কাজী নুরুজ্জামান সড়ক, পশ্চিম পান্থপথ, ঢাকা - ১২০৫",
      address_en: "18/F, Bir Uttam Qazi Nuruzzaman Sarak, West Panthapath, Dhaka - 1205",
      visiting_hours_bn: "সন্ধ্যা ৬টা থেকে রাত ৯টা",
      visiting_hours_en: "6pm to 9pm",
      closed_day_bn: "মঙ্গলবার বন্ধ",
      closed_day_en: "Closed: Tuesday",
      map_url: "https://www.google.com/maps/dir/?api=1&destination=Square+Hospital+Dhaka",
    },
    contact: { phone: "+8801911223344", whatsapp: "+8801911223344" },
    booking_config: {
      closed_days: [2], // Tuesday closed
      time_slots: defaultTimeSlots,
      form_fields: defaultFormFields,
    },
  },
];

// ============================================================================
// HELPER FUNCTIONS - Used throughout the app
// ============================================================================

/**
 * Get a doctor by their URL slug
 * @param slug - The URL-friendly doctor identifier
 * @returns The doctor object or undefined
 */
export const getDoctorBySlug = (slug: string): Doctor | undefined => {
  return doctors.find((doctor) => doctor.slug === slug);
};

/**
 * Get all doctor slugs (for routing)
 * @returns Array of all doctor slugs
 */
export const getAllDoctorSlugs = (): string[] => {
  return doctors.map((doctor) => doctor.slug);
};

/**
 * Search doctors by name or specialty
 * @param query - Search query string
 * @param lang - Language ('en' or 'bn')
 * @returns Filtered array of doctors
 */
export const searchDoctors = (query: string, lang: 'en' | 'bn' = 'en'): Doctor[] => {
  const searchTerm = query.toLowerCase();
  return doctors.filter((doctor) => {
    const name = lang === 'bn' ? doctor.name_bn : doctor.name_en;
    const specialist = lang === 'bn' ? doctor.specialist_bn : doctor.specialist_en;
    return (
      name.toLowerCase().includes(searchTerm) ||
      specialist.toLowerCase().includes(searchTerm)
    );
  });
};
