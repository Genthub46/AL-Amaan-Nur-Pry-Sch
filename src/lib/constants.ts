import { SchoolProfile, CommentBankItem } from '@/types';

export const DEFAULT_SCHOOL_PROFILE: SchoolProfile = {
  name: "AL-AMAANAH NURSERY & PRIMARY SCHOOL",
  subName: "Center for Academic Excellence & Quranic Tahfeez",
  motto: "Knowledge and Piety (Al-’Ilm wat-Taqwa)",
  address: "64 Falana Street, Ado - Ikere Road",
  city: "Ado-Ekiti",
  state: "Ekiti State",
  country: "Nigeria",
  email: "admin@al-amaanahschool.edu.ng",
  phone1: "+234 706 538 3463",
  phone2: "+234 816 175 1723",
  foundedYear: "2016",
  proprietorName: "Mr. Olanipekun Abdul-Hakeem",
  headTeacherName: "Mrs. Anat Sobulo",
  headTeacherTitle: "Headteacher / Head of School",
  openingHours: "Monday – Friday, 7:30 AM – 3:00 PM",
  bankDetails: {
    bankName: "Jaiz Bank / First Bank of Nigeria",
    accountNumber: "0012345678",
    accountName: "Al-Amaanah Nursery & Primary School Ado-Ekiti",
  },
};

export const DRAFT_FEES_SCHEDULE = {
  creche: { name: 'Creche / Playgroup', amount: 35000, uniformBooks: 15000 },
  nursery: { name: 'Nursery 1 – 3', amount: 42000, uniformBooks: 18000 },
  primary: { name: 'Basic / Primary 1 – 6', amount: 48000, uniformBooks: 22000 },
};

export const GRADING_SCALE = [
  { min: 75, max: 100, grade: 'A', remark: 'Excellent', color: 'text-emerald-700 bg-emerald-50' },
  { min: 65, max: 74, grade: 'B', remark: 'Very Good', color: 'text-blue-700 bg-blue-50' },
  { min: 50, max: 64, grade: 'C', remark: 'Good', color: 'text-amber-700 bg-amber-50' },
  { min: 40, max: 49, grade: 'D', remark: 'Pass / Fair', color: 'text-orange-700 bg-orange-50' },
  { min: 0, max: 39, grade: 'F', remark: 'Fail / Needs Help', color: 'text-rose-700 bg-rose-50' },
] as const;

export const RATING_DESCRIPTIONS: Record<number, string> = {
  5: '5 - Excellent',
  4: '4 - Very Good',
  3: '3 - Good / Satisfactory',
  2: '2 - Fair / Needs Improvement',
  1: '1 - Poor',
};

export const SMART_COMMENT_BANK: CommentBankItem[] = [
  // Academic Excellence
  {
    id: 'exc-1',
    category: 'EXCELLENCE',
    text: 'An exceptionally brilliant and diligent scholar. Demonstrates mastery across Western and Islamic studies.',
  },
  {
    id: 'exc-2',
    category: 'EXCELLENCE',
    text: 'Consistently outstanding performance with remarkable intellectual sharpness and keen participation.',
  },
  {
    id: 'exc-3',
    category: 'EXCELLENCE',
    text: 'A model pupil who combines exemplary academics with humility and deep focus.',
  },

  // Islamic Character & Tahfeez (Akhlaaq)
  {
    id: 'isl-1',
    category: 'ISLAMIC_CHARACTER',
    text: 'Exemplifies noble Islamic piety (Taqwa), respects peers and teachers, and shows beautiful devotion to Salah.',
  },
  {
    id: 'isl-2',
    category: 'ISLAMIC_CHARACTER',
    text: 'Commendable dedication to Holy Quran memorization with fluent Tajweed and polite Sunnah etiquette.',
  },
  {
    id: 'isl-3',
    category: 'ISLAMIC_CHARACTER',
    text: 'Well-mannered, humble, and observant of Islamic greetings (Salaam) and morning Adhkar.',
  },

  // Steady Progress & Growth
  {
    id: 'prg-1',
    category: 'PROGRESS',
    text: 'Has shown commendable improvement this term. With continued consistency, higher heights await.',
  },
  {
    id: 'prg-2',
    category: 'PROGRESS',
    text: 'Good progress in numeracy and literacy. Steady advancement in Arabic alphabet recitation.',
  },

  // Constructive Encouragement
  {
    id: 'enc-1',
    category: 'ENCOURAGEMENT',
    text: 'Possesses immense potential; encouraged to dedicate more time to handwriting and mathematics revision.',
  },
  {
    id: 'enc-2',
    category: 'ENCOURAGEMENT',
    text: 'Capable of better results with greater classroom attentiveness and daily homework completion.',
  },
];
