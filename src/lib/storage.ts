'use client';

import {
  SchoolProfile,
  AcademicSession,
  ClassArm,
  Subject,
  Student,
  ScoreRecord,
  CharacterAssessment,
  ClassResultPublishStatus,
  FeeStatus,
  ResultStatus,
  TermId,
  AdmissionApplication,
  AdmissionStatus,
} from '@/types';
import {
  DEFAULT_SCHOOL_PROFILE,
} from './constants';
import {
  INITIAL_SESSIONS,
  INITIAL_CLASSES,
  INITIAL_SUBJECTS,
  INITIAL_STUDENTS,
  INITIAL_SCORES,
  INITIAL_CHARACTERS,
  INITIAL_PUBLISH_STATUSES,
  INITIAL_ADMISSIONS,
} from './mockData';
import { calculateGrade } from './gradingEngine';

const STORAGE_KEYS = {
  PROFILE: 'al_amaanah_profile',
  SESSIONS: 'al_amaanah_sessions',
  CLASSES: 'al_amaanah_classes',
  SUBJECTS: 'al_amaanah_subjects',
  STUDENTS: 'al_amaanah_students',
  SCORES: 'al_amaanah_scores',
  CHARACTERS: 'al_amaanah_characters',
  PUBLISH_STATUS: 'al_amaanah_publish_status',
  ADMISSIONS: 'al_amaanah_admissions',
  CURRENT_USER: 'al_amaanah_current_user',
};

function getItem<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (e) {
    console.error(`Error reading ${key} from localStorage`, e);
    return defaultValue;
  }
}

function setItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error writing ${key} to localStorage`, e);
  }
}

export function getSchoolProfile(): SchoolProfile {
  return getItem<SchoolProfile>(STORAGE_KEYS.PROFILE, DEFAULT_SCHOOL_PROFILE);
}

export function updateSchoolProfile(profile: Partial<SchoolProfile>): SchoolProfile {
  const current = getSchoolProfile();
  const updated = { ...current, ...profile };
  setItem(STORAGE_KEYS.PROFILE, updated);
  return updated;
}

export function getAcademicSessions(): AcademicSession[] {
  return getItem<AcademicSession[]>(STORAGE_KEYS.SESSIONS, INITIAL_SESSIONS);
}

export function getActiveSession(): AcademicSession {
  const sessions = getAcademicSessions();
  return sessions[0] || INITIAL_SESSIONS[0];
}

export function updateSession(session: AcademicSession): void {
  const sessions = getAcademicSessions();
  const index = sessions.findIndex((s) => s.id === session.id);
  if (index >= 0) {
    sessions[index] = session;
  } else {
    sessions.push(session);
  }
  setItem(STORAGE_KEYS.SESSIONS, sessions);
}

export function getClasses(): ClassArm[] {
  return getItem<ClassArm[]>(STORAGE_KEYS.CLASSES, INITIAL_CLASSES);
}

export function getSubjects(): Subject[] {
  return getItem<Subject[]>(STORAGE_KEYS.SUBJECTS, INITIAL_SUBJECTS);
}

export function getStudents(): Student[] {
  return getItem<Student[]>(STORAGE_KEYS.STUDENTS, INITIAL_STUDENTS);
}

export function updateStudentFeeStatus(studentId: string, feeStatus: FeeStatus, amountOwed?: number): void {
  const students = getStudents();
  const index = students.findIndex((s) => s.id === studentId);
  if (index >= 0) {
    students[index].feeStatus = feeStatus;
    students[index].amountOwed = amountOwed !== undefined ? amountOwed : students[index].amountOwed;
    setItem(STORAGE_KEYS.STUDENTS, students);
  }
}

export function getScores(): ScoreRecord[] {
  return getItem<ScoreRecord[]>(STORAGE_KEYS.SCORES, INITIAL_SCORES);
}

export function saveScoreRecord(
  studentId: string,
  subjectId: string,
  sessionId: string,
  termId: TermId,
  classId: string,
  ca1: number,
  ca2: number,
  ca3: number,
  exam: number,
  remark?: string
): ScoreRecord {
  const scores = getScores();
  const boundedCa1 = Math.min(20, Math.max(0, Number(ca1) || 0));
  const boundedCa2 = Math.min(20, Math.max(0, Number(ca2) || 0));
  const boundedCa3 = Math.min(20, Math.max(0, Number(ca3) || 0));
  const boundedExam = Math.min(40, Math.max(0, Number(exam) || 0));
  const total = boundedCa1 + boundedCa2 + boundedCa3 + boundedExam;
  const { grade, remark: defaultRemark } = calculateGrade(total);

  const id = `${studentId}-${subjectId}-${sessionId}-${termId}`;
  const record: ScoreRecord = {
    id,
    studentId,
    subjectId,
    sessionId,
    termId,
    classId,
    ca1: boundedCa1,
    ca2: boundedCa2,
    ca3: boundedCa3,
    exam: boundedExam,
    total,
    grade,
    remark: remark || defaultRemark,
  };

  const existingIndex = scores.findIndex((s) => s.id === id);
  if (existingIndex >= 0) {
    scores[existingIndex] = record;
  } else {
    scores.push(record);
  }
  setItem(STORAGE_KEYS.SCORES, scores);
  return record;
}

export function bulkSaveScores(newScores: ScoreRecord[]): void {
  const scores = getScores();
  newScores.forEach((ns) => {
    const existingIndex = scores.findIndex((s) => s.id === ns.id);
    if (existingIndex >= 0) {
      scores[existingIndex] = ns;
    } else {
      scores.push(ns);
    }
  });
  setItem(STORAGE_KEYS.SCORES, scores);
}

export function getCharacters(): CharacterAssessment[] {
  return getItem<CharacterAssessment[]>(STORAGE_KEYS.CHARACTERS, INITIAL_CHARACTERS);
}

export function saveCharacterAssessment(assessment: CharacterAssessment): void {
  const characters = getCharacters();
  const index = characters.findIndex(
    (c) =>
      c.studentId === assessment.studentId &&
      c.sessionId === assessment.sessionId &&
      c.termId === assessment.termId
  );
  if (index >= 0) {
    characters[index] = assessment;
  } else {
    characters.push(assessment);
  }
  setItem(STORAGE_KEYS.CHARACTERS, characters);
}

export function getPublishStatuses(): ClassResultPublishStatus[] {
  return getItem<ClassResultPublishStatus[]>(STORAGE_KEYS.PUBLISH_STATUS, INITIAL_PUBLISH_STATUSES);
}

export function updateClassPublishStatus(
  classId: string,
  sessionId: string,
  termId: TermId,
  status: ResultStatus
): void {
  const statuses = getPublishStatuses();
  const index = statuses.findIndex(
    (s) => s.classId === classId && s.sessionId === sessionId && s.termId === termId
  );
  const now = new Date().toISOString().split('T')[0];
  if (index >= 0) {
    statuses[index].status = status;
    statuses[index].lastUpdated = now;
  } else {
    statuses.push({
      classId,
      sessionId,
      termId,
      status,
      lastUpdated: now,
    });
  }
  setItem(STORAGE_KEYS.PUBLISH_STATUS, statuses);
}

export function isClassResultPublished(classId: string, sessionId: string, termId: TermId): boolean {
  const statuses = getPublishStatuses();
  const record = statuses.find(
    (s) => s.classId === classId && s.sessionId === sessionId && s.termId === termId
  );
  return record?.status === 'PUBLISHED';
}

export function getAdmissionApplications(): AdmissionApplication[] {
  return getItem<AdmissionApplication[]>(STORAGE_KEYS.ADMISSIONS, INITIAL_ADMISSIONS);
}

export function submitAdmissionApplication(app: AdmissionApplication): AdmissionApplication {
  const apps = getAdmissionApplications();
  apps.unshift(app);
  setItem(STORAGE_KEYS.ADMISSIONS, apps);
  return app;
}

export function updateAdmissionStatus(
  appId: string,
  status: AdmissionStatus,
  reviewerName?: string,
  adminNotes?: string
): void {
  const apps = getAdmissionApplications();
  const index = apps.findIndex((a) => a.id === appId);
  if (index >= 0) {
    apps[index].status = status;
    if (reviewerName) apps[index].reviewedBy = reviewerName;
    if (adminNotes !== undefined) apps[index].adminNotes = adminNotes;
    setItem(STORAGE_KEYS.ADMISSIONS, apps);
  }
}

export function resetToDefaults(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEYS.PROFILE);
  localStorage.removeItem(STORAGE_KEYS.SESSIONS);
  localStorage.removeItem(STORAGE_KEYS.CLASSES);
  localStorage.removeItem(STORAGE_KEYS.SUBJECTS);
  localStorage.removeItem(STORAGE_KEYS.STUDENTS);
  localStorage.removeItem(STORAGE_KEYS.SCORES);
  localStorage.removeItem(STORAGE_KEYS.CHARACTERS);
  localStorage.removeItem(STORAGE_KEYS.PUBLISH_STATUS);
  localStorage.removeItem(STORAGE_KEYS.ADMISSIONS);
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
}
