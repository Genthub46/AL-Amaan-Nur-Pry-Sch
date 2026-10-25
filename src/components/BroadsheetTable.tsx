'use client';

import React from 'react';
import { Student, Subject, ScoreRecord, AcademicSession, TermId } from '@/types';
import { calculateGrade, formatOrdinal } from '@/lib/gradingEngine';
import { Printer, Download, BookOpen } from 'lucide-react';
import * as XLSX from 'xlsx';

interface BroadsheetTableProps {
  classNameString: string;
  session: AcademicSession;
  term: TermId;
  students: Student[];
  subjects: Subject[];
  scores: ScoreRecord[];
}

export const BroadsheetTable: React.FC<BroadsheetTableProps> = ({
  classNameString,
  session,
  term,
  students,
  subjects,
  scores,
}) => {
  // Compute per-student totals
  const studentMetrics = students.map((std) => {
    const stdScores = subjects.map((sub) => {
      const rec = scores.find(
        (s) => s.studentId === std.id && s.subjectId === sub.id && s.sessionId === session.id && s.termId === term
      );
      const total = rec ? rec.total : 0;
      return { subjectId: sub.id, total, rec };
    });

    const grandTotal = stdScores.reduce((sum, item) => sum + item.total, 0);
    const maxPossible = subjects.length * 100;
    const average = maxPossible > 0 ? (grandTotal / maxPossible) * 100 : 0;

    return {
      student: std,
      scoresMap: new Map(stdScores.map((i) => [i.subjectId, i.total])),
      grandTotal,
      average: Number(average.toFixed(1)),
      rank: 0,
    };
  });

  // Calculate ranks
  studentMetrics.sort((a, b) => b.grandTotal - a.grandTotal);
  studentMetrics.forEach((item, index) => {
    item.rank = index + 1;
  });

  // Export Broadsheet to Excel
  const handleExportExcel = () => {
    const data = studentMetrics.map((item, idx) => {
      const row: Record<string, string | number> = {
        'S/N': idx + 1,
        'Admission No': item.student.admissionNo,
        'Student Name': item.student.fullName,
        'Gender': item.student.gender,
      };

      subjects.forEach((sub) => {
        row[`${sub.code} (100)`] = item.scoresMap.get(sub.id) ?? 0;
      });

      row['Grand Total'] = item.grandTotal;
      row['Average %'] = item.average;
      row['Grade'] = calculateGrade(item.average).grade;
      row['Position'] = item.rank;

      return row;
    });

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Broadsheet');
    XLSX.writeFile(
      workbook,
      `AL_Amaanah_${classNameString}_Broadsheet_${session.name.replace('/', '_')}_${term}.xlsx`
    );
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Top Toolbar */}
      <div className="p-4 sm:p-6 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-school-700" />
            <h3 className="font-bold text-base text-slate-900">
              Master Composite Broadsheet — {classNameString}
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Academic Session {session.name} • {term} Term • {students.length} Enrolled Pupils
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 rounded-lg text-xs font-semibold shadow-sm transition-all"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            Print Broadsheet
          </button>
          <button
            onClick={handleExportExcel}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-school-800 hover:bg-school-900 text-white rounded-lg text-xs font-semibold shadow-sm transition-all"
          >
            <Download className="w-3.5 h-3.5 text-school-200" />
            Export to Excel (.xlsx)
          </button>
        </div>
      </div>

      {/* Broadsheet Grid */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-school-900 text-white font-bold text-[11px] uppercase tracking-wider text-center">
              <th className="py-2 px-2 text-left w-10">Pos</th>
              <th className="py-2 px-3 text-left w-24">Adm No</th>
              <th className="py-2 px-4 text-left w-48">Student Full Name</th>
              <th className="py-2 px-2 w-12">Sex</th>
              {subjects.map((sub) => (
                <th
                  key={sub.id}
                  title={sub.name}
                  className={`py-2 px-2 w-16 ${
                    sub.category === 'ISLAMIC' ? 'bg-emerald-800 text-emerald-100' : 'bg-school-800 text-slate-100'
                  }`}
                >
                  {sub.code}
                </th>
              ))}
              <th className="py-2 px-2 w-16 bg-amber-600 text-white">Total</th>
              <th className="py-2 px-2 w-16 bg-school-950 text-white">Avg %</th>
              <th className="py-2 px-2 w-12">Grd</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {studentMetrics.map((item, idx) => (
              <tr
                key={item.student.id}
                className={idx % 2 === 0 ? 'bg-white hover:bg-school-50/50' : 'bg-slate-50/70 hover:bg-school-50/50'}
              >
                <td className="py-2 px-2 text-center font-bold text-school-800">
                  {formatOrdinal(item.rank)}
                </td>
                <td className="py-2 px-3 font-mono text-[11px] text-slate-600">
                  {item.student.admissionNo}
                </td>
                <td className="py-2 px-4 font-semibold text-slate-900">
                  {item.student.fullName}
                </td>
                <td className="py-2 px-2 text-center text-slate-500 font-medium">
                  {item.student.gender === 'Male' ? 'M' : 'F'}
                </td>

                {subjects.map((sub) => {
                  const score = item.scoresMap.get(sub.id) ?? 0;
                  return (
                    <td
                      key={sub.id}
                      className={`py-2 px-2 text-center font-mono font-medium ${
                        score >= 75
                          ? 'text-emerald-700 font-bold'
                          : score < 40
                          ? 'text-rose-600 font-bold'
                          : 'text-slate-700'
                      }`}
                    >
                      {score > 0 ? score : '-'}
                    </td>
                  );
                })}

                <td className="py-2 px-2 text-center font-mono font-bold text-school-950 bg-amber-50">
                  {item.grandTotal}
                </td>
                <td className="py-2 px-2 text-center font-mono font-black text-school-900">
                  {item.average}%
                </td>
                <td className="py-2 px-2 text-center font-bold">
                  <span
                    className={`inline-block px-1.5 py-0.5 rounded text-[10px] ${
                      calculateGrade(item.average).grade === 'A'
                        ? 'bg-emerald-100 text-emerald-800'
                        : calculateGrade(item.average).grade === 'B'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {calculateGrade(item.average).grade}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
