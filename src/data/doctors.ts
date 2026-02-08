// Centralized Doctor CMS Data
// Adding/removing doctors here automatically updates the entire application

export interface Doctor {
  id: string;
  slug: string;
  name_bn: string;
  name_en: string;
  title_bn: string;
  title_en: string;
  institution_bn: string;
  institution_en: string;
  specialist_bn: string;
  specialist_en: string;
  photo: string;
  bio_bn: string;
  bio_en: string;
  qualifications: string[];
  specialties: Specialty[];
  chamber: Chamber;
  contact: Contact;
  hero_tagline_bn: string;
  hero_tagline_en: string;
  hero_description_bn: string;
  hero_description_en: string;
  badges: Badge[];
  // Dynamic booking configuration per doctor
  booking_config: BookingConfig;
}

export interface Specialty {
  id: string;
  name_bn: string;
  name_en: string;
  description_bn: string;
  description_en: string;
  icon: string;
}

export interface Chamber {
  name_bn: string;
  name_en: string;
  address_bn: string;
  address_en: string;
  visiting_hours_bn: string;
  visiting_hours_en: string;
  closed_day_bn: string;
  closed_day_en: string;
  map_url: string;
}

export interface Contact {
  phone: string;
  whatsapp: string;
  email?: string;
}

export interface Badge {
  text: string;
  icon?: string;
}

// Dynamic booking configuration per doctor
export interface BookingConfig {
  // Days that are closed (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  closed_days: number[];
  // Time slots available for this doctor
  time_slots: TimeSlot[];
  // Custom booking form fields
  form_fields: FormField[];
}

export interface TimeSlot {
  value: string;
  label_en: string;
  label_bn: string;
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

// Default time slots (can be customized per doctor)
export const defaultTimeSlots: TimeSlot[] = [
  { value: '18:00', label_en: '6:00 PM', label_bn: 'সন্ধ্যা ৬:০০' },
  { value: '18:30', label_en: '6:30 PM', label_bn: 'সন্ধ্যা ৬:৩০' },
  { value: '19:00', label_en: '7:00 PM', label_bn: 'সন্ধ্যা ৭:০০' },
  { value: '19:30', label_en: '7:30 PM', label_bn: 'সন্ধ্যা ৭:৩০' },
  { value: '20:00', label_en: '8:00 PM', label_bn: 'রাত ৮:০০' },
  { value: '20:30', label_en: '8:30 PM', label_bn: 'রাত ৮:৩০' },
];

// Default form fields for booking
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

// Import doctor images
import drMuhsinImg from '@/assets/doctors/dr-muhsin.jpg';

export const doctors: Doctor[] = [
  {
    id: "1",
    slug: "dr-syed-md-muhsin",
    name_bn: "ডা. সৈয়দ মোঃ মুহসিন",
    name_en: "Dr. Syed Md. Muhsin",
    title_bn: "সার্জারি বিভাগের সহযোগী অধ্যাপক",
    title_en: "Associate Professor of Surgery",
    institution_bn: "চট্টগ্রাম মেডিকেল কলেজ ও হাসপাতাল",
    institution_en: "Chittagong Medical College & Hospital",
    specialist_bn: "জেনারেল, ল্যাপারোস্কপিক ও হেপাটোবিলিয়ারি সার্জন",
    specialist_en: "General, Laparoscopic & Hepatobiliary Surgeon",
    photo: drMuhsinImg,
    bio_bn: "ডা. সৈয়দ মোঃ মুহসিন চট্টগ্রামের একজন দক্ষ জেনারেল, ল্যাপারোস্কপিক ও হেপাটোবিলিয়ারি সার্জন। তিনি পিত্তথলির রোগ, লিভার টিউমার, পিত্তনালীর সমস্যা, অগ্ন্যাশয়ের রোগ এবং হার্নিয়া মেরামত ও এপেন্ডেক্টমির মতো রুটিন পদ্ধতিতে বিশেষজ্ঞ।",
    bio_en: "Dr. Syed Md. Muhsin is a highly skilled General, Laparoscopic, and Hepatobiliary surgeon in Chattogram. He specializes in gallbladder diseases, liver tumors, bile duct disorders, pancreatic diseases, and routine procedures like hernia repair and appendectomies.",
    qualifications: ["MBBS, MCPS, MS", "FCPS (Hepatobiliary)", "FRCS (Hon.), FACS", "FMAS Fellowship"],
    hero_tagline_bn: "লিভার ও পেটের স্বাস্থ্যের জন্য বিশেষজ্ঞ যত্ন",
    hero_tagline_en: "Expert Care for Liver & Abdominal Health",
    hero_description_bn: "ডা. সৈয়দ মোঃ মুহসিন জেনারেল, ল্যাপারোস্কপিক এবং হেপাটোবিলিয়ারি সার্জারিতে বিশেষ যত্ন প্রদান করেন। পিত্তথলি, লিভার এবং অগ্ন্যাশয়ের জটিল অবস্থার নিখুঁত চিকিৎসা।",
    hero_description_en: "Dr. Syed Md. Muhsin provides specialized care in General, Laparoscopic, and Hepatobiliary surgery. Treating complex conditions of the gallbladder, liver, and pancreas with precision.",
    badges: [
      { text: "FRCS (Hon.)" },
      { text: "FACS (Hon.)" },
      { text: "Hepatobiliary Specialist" },
    ],
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
    chamber: {
      name_bn: "সার্জিস্কোপ হাসপাতাল, চট্টগ্রাম",
      name_en: "Surgiscope Hospital, Chattogram",
      address_bn: "ইউনিট ২, ৪৪৫/৪৬৬, কাটালগঞ্জ, চকবাজার, চট্টগ্রাম – ৪২০৩",
      address_en: "Unit 2, 445/466, Katalgonj, Chawkbazar, Chattogram – 4203",
      visiting_hours_bn: "সন্ধ্যা ৬টা থেকে রাত ৯টা",
      visiting_hours_en: "6pm to 9pm",
      closed_day_bn: "শুক্রবার বন্ধ",
      closed_day_en: "Closed: Friday",
      map_url: "https://www.google.com/maps/dir/?api=1&destination=Surgiscope+Hospital+Chattogram",
    },
    contact: {
      phone: "+8801711946412",
      whatsapp: "+8801711946412",
    },
    booking_config: {
      closed_days: [5], // Friday closed
      time_slots: defaultTimeSlots,
      form_fields: defaultFormFields,
    },
  },
  {
    id: "2",
    slug: "dr-fatima-rahman",
    name_bn: "ডা. ফাতিমা রহমান",
    name_en: "Dr. Fatima Rahman",
    title_bn: "কার্ডিওলজি বিভাগের সহযোগী অধ্যাপক",
    title_en: "Associate Professor of Cardiology",
    institution_bn: "ঢাকা মেডিকেল কলেজ ও হাসপাতাল",
    institution_en: "Dhaka Medical College & Hospital",
    specialist_bn: "ইন্টারভেনশনাল কার্ডিওলজিস্ট",
    specialist_en: "Interventional Cardiologist",
    photo: drMuhsinImg, // Using placeholder - replace with actual photo
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
    contact: {
      phone: "+8801712345678",
      whatsapp: "+8801712345678",
    },
    booking_config: {
      closed_days: [6], // Saturday closed (different from Dr. Muhsin)
      time_slots: [
        { value: '16:00', label_en: '4:00 PM', label_bn: 'বিকাল ৪:০০' },
        { value: '16:30', label_en: '4:30 PM', label_bn: 'বিকাল ৪:৩০' },
        { value: '17:00', label_en: '5:00 PM', label_bn: 'বিকাল ৫:০০' },
        { value: '17:30', label_en: '5:30 PM', label_bn: 'বিকাল ৫:৩০' },
        { value: '18:00', label_en: '6:00 PM', label_bn: 'সন্ধ্যা ৬:০০' },
        { value: '18:30', label_en: '6:30 PM', label_bn: 'সন্ধ্যা ৬:৩০' },
        { value: '19:00', label_en: '7:00 PM', label_bn: 'সন্ধ্যা ৭:০০' },
        { value: '19:30', label_en: '7:30 PM', label_bn: 'সন্ধ্যা ৭:৩০' },
      ],
      form_fields: defaultFormFields,
    },
  },
];

// Helper function to get doctor by slug
export const getDoctorBySlug = (slug: string): Doctor | undefined => {
  return doctors.find((doctor) => doctor.slug === slug);
};

// Helper function to get all doctor slugs for routing
export const getAllDoctorSlugs = (): string[] => {
  return doctors.map((doctor) => doctor.slug);
};

// Helper function to search doctors
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
