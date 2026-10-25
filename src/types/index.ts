export type SubjectCategory = 'WESTERN' | 'ISLAMIC';

export type TermId = 'FIRST' | 'SECOND' | 'THIRD';

export type FeeStatus = 'CLEARED' | 'PARTIAL' | 'PENDING';

export type ResultStatus = 'DRAFT' | 'SUBMITTED' | 'APPROVED' | 'PUBLISHED';

export interface SchoolProfile {
  name: string;
  subName: string;
  motto: string;
  address: string;
  city: string;
  state: string;
  country: string;
  email: string;
  phone1: string;
  phone2: string;
  foundedYear: string;
  proprietorName: string;
  headTeacherName: string;
  headTeacherTitle: string;
  openingHours: string;
  bankDetails: {
    bankName: string;
    accountNumber: string;
    accountName: string;
  };
}

export interface AcademicSession {
  id: string; // e.g., '2024-2025'
  name: string; // '2024/2025'
  activeTerm: TermId;
  resumptionDate: string; // e.g., 'January 12, 2026'
  vacationDate: string; // e.g., 'April 10, 2026'
  nextTermResumptionDate: string; // e.g., 'May 4, 2026'
  feesDeadline: string; // e.g., 'May 11, 2026'
}

export interface ClassArm {
  id: string; // 'nur-1', 'basic-4'
  name: string; // 'Nursery 1', 'Basic 4'
  section: 'NURSERY' | 'PRIMARY';
  capacity: number;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  category: SubjectCategory;
  applicableClasses: string[]; // class IDs
  maxCA1: number; // 20
  maxCA2: number; // 20
  maxCA3: number; // 20
  maxExam: number; // 40
}

export interface Student {
  id: string;
  admissionNo: string; // e.g., 'AMA/2024/012'
  fullName: string;
  gender: 'Male' | 'Female';
  classId: string;
  className: string;
  dob: string;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  familyId: string; // to link siblings for the family switcher!
  feeStatus: FeeStatus;
  amountOwed?: number;
  passportUrl?: string;
  pin: string; // for simple student/parent login
}

export interface ScoreRecord {
  id: string;
  studentId: string;
  subjectId: string;
  sessionId: string;
  termId: TermId;
  classId: string;
  ca1: number; // max 20
  ca2: number; // max 20
  ca3: number; // max 20
  exam: number; // max 40
  total: number; // max 100
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
  remark: string;
}

export interface CharacterAssessment {
  id: string;
  studentId: string;
  sessionId: string;
  termId: TermId;
  classId: string;
  // Islamic & Tahfeez
  quranSurahMemorized: string; // e.g., 'Surah An-Naba & An-Nazi'at'
  tajweedRating: number; // 1-5
  salahAttendance: number; // 1-5
  islamicMannerisms: number; // 1-5
  adhkarProgress: string; // e.g., 'Morning & Evening Du'as mastered'
  // Psychomotor & Affective
  punctuality: number; // 1-5
  neatness: number; // 1-5
  handwriting: number; // 1-5
  attentiveness: number; // 1-5
  politeness: number; // 1-5
  sports: number; // 1-5
  // Attendance & Remarks
  timesSchoolOpened: number;
  timesPresent: number;
  timesAbsent: number;
  teacherRemark: string;
  headTeacherRemark: string;
  promotionStatus?: 'PROMOTED' | 'PROMOTED_ON_TRIAL' | 'REPEAT' | 'N/A';
}

export interface ClassResultPublishStatus {
  classId: string;
  sessionId: string;
  termId: TermId;
  status: ResultStatus;
  lastUpdated: string;
}

export interface ComputedStudentResult {
  student: Student;
  session: AcademicSession;
  term: TermId;
  scores: {
    subject: Subject;
    score: ScoreRecord;
  }[];
  character: CharacterAssessment;
  totalMarksObtained: number;
  totalMarksPossible: number;
  overallPercentage: number;
  classPosition: number;
  totalStudentsInClass: number;
  overallGrade: string;
  westernCount: number;
  islamicCount: number;
}

export type AdmissionStatus = 'SUBMITTED' | 'UNDER_REVIEW' | 'APPROVED' | 'ADMITTED' | 'DECLINED';

export interface AdmissionApplication {
  id: string;
  referenceNo: string; // e.g. AMA-ADM-2026-0812
  childFullName: string;
  gender: 'Male' | 'Female';
  dob: string;
  classApplyingFor: string;
  parentFullName: string;
  parentPhone: string;
  parentEmail: string;
  residentialAddress: string;
  previousSchool?: string;
  medicalNotes?: string;
  status: AdmissionStatus;
  submittedAt: string;
  reviewedBy?: string;
  adminNotes?: string;
}

export interface CommentBankItem {
  id: string;
  category: 'EXCELLENCE' | 'ISLAMIC_CHARACTER' | 'PROGRESS' | 'ENCOURAGEMENT';
  text: string;
}

