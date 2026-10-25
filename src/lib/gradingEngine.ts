import { ScoreRecord, Student, Subject, CharacterAssessment, ComputedStudentResult, AcademicSession, TermId } from '@/types';
import { GRADING_SCALE } from './constants';

export function calculateGrade(total: number): { grade: 'A' | 'B' | 'C' | 'D' | 'F'; remark: string } {
  const boundedTotal = Math.max(0, Math.min(100, Math.round(total)));
  for (const item of GRADING_SCALE) {
    if (boundedTotal >= item.min && boundedTotal <= item.max) {
      return { grade: item.grade, remark: item.remark };
    }
  }
  return { grade: 'F', remark: 'Fail' };
}

export function computeStudentResult(
  student: Student,
  session: AcademicSession,
  termId: TermId,
  allStudentsInClass: Student[],
  allSubjects: Subject[],
  allScores: ScoreRecord[],
  allCharacters: CharacterAssessment[]
): ComputedStudentResult {
  // Filter scores for this student, session, and term
  const studentScores = allScores.filter(
    (s) => s.studentId === student.id && s.sessionId === session.id && s.termId === termId
  );

  const scoreRows = allSubjects
    .filter((sub) => sub.applicableClasses.includes(student.classId))
    .map((subject) => {
      const existing = studentScores.find((s) => s.subjectId === subject.id);
      const ca1 = existing ? Number(existing.ca1) || 0 : 0;
      const ca2 = existing ? Number(existing.ca2) || 0 : 0;
      const ca3 = existing ? Number(existing.ca3) || 0 : 0;
      const exam = existing ? Number(existing.exam) || 0 : 0;
      const total = ca1 + ca2 + ca3 + exam;
      const { grade, remark } = calculateGrade(total);

      const record: ScoreRecord = existing || {
        id: `${student.id}-${subject.id}-${session.id}-${termId}`,
        studentId: student.id,
        subjectId: subject.id,
        sessionId: session.id,
        termId,
        classId: student.classId,
        ca1,
        ca2,
        ca3,
        exam,
        total,
        grade,
        remark,
      };

      return {
        subject,
        score: {
          ...record,
          total,
          grade,
          remark: existing?.remark || remark,
        },
      };
    });

  // Calculate totals
  const totalMarksObtained = scoreRows.reduce((sum, item) => sum + item.score.total, 0);
  const totalMarksPossible = scoreRows.length * 100;
  const overallPercentage = totalMarksPossible > 0 ? (totalMarksObtained / totalMarksPossible) * 100 : 0;

  // Compute position within class
  const classStudents = allStudentsInClass.filter((s) => s.classId === student.classId);
  const classTotals = classStudents.map((peer) => {
    const peerScores = allScores.filter(
      (s) => s.studentId === peer.id && s.sessionId === session.id && s.termId === termId
    );
    const peerSum = peerScores.reduce((sum, s) => sum + (Number(s.total) || 0), 0);
    return { studentId: peer.id, sum: peerSum };
  });

  // Sort descending by total score
  classTotals.sort((a, b) => b.sum - a.sum);
  const positionIndex = classTotals.findIndex((item) => item.studentId === student.id);
  const classPosition = positionIndex >= 0 ? positionIndex + 1 : 1;

  // Character Assessment
  const character = allCharacters.find(
    (c) => c.studentId === student.id && c.sessionId === session.id && c.termId === termId
  ) || {
    id: `char-${student.id}-${session.id}-${termId}`,
    studentId: student.id,
    sessionId: session.id,
    termId,
    classId: student.classId,
    quranSurahMemorized: 'Surah An-Naba (Verses 1-40)',
    tajweedRating: 4,
    salahAttendance: 5,
    islamicMannerisms: 5,
    adhkarProgress: 'Morning and Evening Adhkar and Daily Duas mastered',
    punctuality: 5,
    neatness: 5,
    handwriting: 4,
    attentiveness: 4,
    politeness: 5,
    sports: 4,
    timesSchoolOpened: 115,
    timesPresent: 112,
    timesAbsent: 3,
    teacherRemark: 'An active, intelligent and well-mannered pupil. Shows keen interest in Tahfeez and Mathematics.',
    headTeacherRemark: 'Commendable result. A shining example of Islamic character and academic diligence.',
    promotionStatus: termId === 'THIRD' ? 'PROMOTED' : 'N/A',
  };

  const westernCount = scoreRows.filter((r) => r.subject.category === 'WESTERN').length;
  const islamicCount = scoreRows.filter((r) => r.subject.category === 'ISLAMIC').length;

  return {
    student,
    session,
    term: termId,
    scores: scoreRows,
    character,
    totalMarksObtained,
    totalMarksPossible,
    overallPercentage: Number(overallPercentage.toFixed(1)),
    classPosition,
    totalStudentsInClass: classStudents.length,
    overallGrade: calculateGrade(overallPercentage).grade,
    westernCount,
    islamicCount,
  };
}

export function formatOrdinal(n: number): string {
  const pr = new Intl.PluralRules('en-US', { type: 'ordinal' });
  const suffixes: Record<string, string> = {
    one: 'st',
    two: 'nd',
    few: 'rd',
    other: 'th',
  };
  return `${n}${suffixes[pr.select(n)]}`;
}
