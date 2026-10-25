import * as XLSX from 'xlsx';
import { Student, Subject, ScoreRecord, TermId } from '@/types';
import { calculateGrade } from './gradingEngine';

export interface ParsedScoreRow {
  admissionNo: string;
  studentName: string;
  ca1: number;
  ca2: number;
  ca3: number;
  exam: number;
  total: number;
  grade: string;
  remark: string;
  isValid: boolean;
  error?: string;
}

export function exportClassScoreTemplate(
  className: string,
  subject: Subject,
  sessionId: string,
  termId: TermId,
  students: Student[],
  existingScores: ScoreRecord[]
): void {
  const data = students.map((std, index) => {
    const existing = existingScores.find((s) => s.studentId === std.id && s.subjectId === subject.id);
    const ca1 = existing ? existing.ca1 : '';
    const ca2 = existing ? existing.ca2 : '';
    const ca3 = existing ? existing.ca3 : '';
    const exam = existing ? existing.exam : '';
    const total = existing ? existing.total : '';
    const remark = existing ? existing.remark : '';

    return {
      'S/N': index + 1,
      'Admission No': std.admissionNo,
      'Student Full Name': std.fullName,
      'CA 1 (Max 20)': ca1,
      'CA 2 (Max 20)': ca2,
      'CA 3 (Max 20)': ca3,
      'Exam (Max 40)': exam,
      'Total (Max 100)': total,
      'Teacher Remark': remark,
    };
  });

  const worksheet = XLSX.utils.json_to_sheet(data);

  // Set column widths
  worksheet['!cols'] = [
    { wch: 6 },
    { wch: 18 },
    { wch: 32 },
    { wch: 14 },
    { wch: 14 },
    { wch: 14 },
    { wch: 14 },
    { wch: 16 },
    { wch: 25 },
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Scores');

  const cleanSubject = subject.name.replace(/[^a-zA-Z0-9]/g, '_');
  const cleanClass = className.replace(/[^a-zA-Z0-9]/g, '_');
  const fileName = `AL_Amaanah_${cleanClass}_${cleanSubject}_${sessionId}_${termId}.xlsx`;

  XLSX.writeFile(workbook, fileName);
}

export async function parseClassScoreExcel(
  file: File,
  students: Student[]
): Promise<{ rows: ParsedScoreRow[]; hasErrors: boolean }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const buffer = e.target?.result;
        const workbook = XLSX.read(buffer, { type: 'binary' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const rawJson: Record<string, unknown>[] = XLSX.utils.sheet_to_json(worksheet);

        let hasErrors = false;
        const rows: ParsedScoreRow[] = rawJson.map((row) => {
          const admNo = String(row['Admission No'] || row['AdmissionNo'] || row['ADMISSION NO'] || '').trim();
          const studentName = String(row['Student Full Name'] || row['Student Name'] || row['Name'] || '').trim();

          const ca1Raw = row['CA 1 (Max 20)'] ?? row['CA 1'] ?? row['CA1'] ?? 0;
          const ca2Raw = row['CA 2 (Max 20)'] ?? row['CA 2'] ?? row['CA2'] ?? 0;
          const ca3Raw = row['CA 3 (Max 20)'] ?? row['CA 3'] ?? row['CA3'] ?? 0;
          const examRaw = row['Exam (Max 40)'] ?? row['Exam'] ?? row['EXAM'] ?? 0;
          const remark = String(row['Teacher Remark'] || row['Remark'] || '').trim();

          const ca1 = Number(ca1Raw) || 0;
          const ca2 = Number(ca2Raw) || 0;
          const ca3 = Number(ca3Raw) || 0;
          const exam = Number(examRaw) || 0;

          const matchedStudent = students.find(
            (s) => s.admissionNo.toLowerCase() === admNo.toLowerCase()
          );

          const errors: string[] = [];
          if (!admNo) {
            errors.push('Missing Admission No');
          } else if (!matchedStudent) {
            errors.push(`Admission No "${admNo}" not found in this class`);
          }

          if (ca1 < 0 || ca1 > 20) errors.push(`CA1 must be 0-20 (got ${ca1})`);
          if (ca2 < 0 || ca2 > 20) errors.push(`CA2 must be 0-20 (got ${ca2})`);
          if (ca3 < 0 || ca3 > 20) errors.push(`CA3 must be 0-20 (got ${ca3})`);
          if (exam < 0 || exam > 40) errors.push(`Exam must be 0-40 (got ${exam})`);

          const isValid = errors.length === 0;
          if (!isValid) hasErrors = true;

          const total = ca1 + ca2 + ca3 + exam;
          const { grade, remark: defaultRemark } = calculateGrade(total);

          return {
            admissionNo: admNo,
            studentName: matchedStudent?.fullName || studentName || 'Unknown Student',
            ca1,
            ca2,
            ca3,
            exam,
            total,
            grade,
            remark: remark || defaultRemark,
            isValid,
            error: errors.join(', '),
          };
        });

        resolve({ rows, hasErrors });
      } catch (err) {
        reject(err);
      }
    };

    reader.onerror = (err) => reject(err);
    reader.readAsBinaryString(file);
  });
}
