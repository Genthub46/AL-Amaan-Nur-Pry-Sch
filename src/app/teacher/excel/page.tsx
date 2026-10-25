'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { IslamicPattern } from '@/components/IslamicPattern';
import {
  getClasses,
  getSubjects,
  getStudents,
  getScores,
  getActiveSession,
  bulkSaveScores,
} from '@/lib/storage';
import { exportClassScoreTemplate, parseClassScoreExcel, ParsedScoreRow } from '@/lib/excelUtils';
import { ClassArm, Subject, Student, ScoreRecord, TermId } from '@/types';
import {
  INITIAL_CLASSES,
  INITIAL_SUBJECTS,
  INITIAL_STUDENTS,
} from '@/lib/mockData';
import {
  Download,
  Upload,
  CheckCircle,
  AlertTriangle,
  FileSpreadsheet,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';

export default function TeacherExcelPage() {
  const [classes, setClasses] = useState<ClassArm[]>(INITIAL_CLASSES);
  const [subjects, setSubjects] = useState<Subject[]>(INITIAL_SUBJECTS);
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [selectedClassId, setSelectedClassId] = useState<string>('basic-4');
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('sub-math');
  const [selectedTerm, setSelectedTerm] = useState<TermId>('FIRST');

  const [parsedRows, setParsedRows] = useState<ParsedScoreRow[]>([]);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const session = getActiveSession();

  useEffect(() => {
    setClasses(getClasses());
    setSubjects(getSubjects());
    setStudents(getStudents());
  }, []);

  const currentClass = classes.find((c) => c.id === selectedClassId) || classes[0];
  const currentSubject = subjects.find((s) => s.id === selectedSubjectId) || subjects[0];
  const classStudents = students.filter((s) => s.classId === selectedClassId);

  const handleExportTemplate = () => {
    const allScores = getScores();
    exportClassScoreTemplate(
      currentClass.name,
      currentSubject,
      session.name,
      selectedTerm,
      classStudents,
      allScores
    );
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadError(null);
      const res = await parseClassScoreExcel(file, classStudents);
      setParsedRows(res.rows);
      if (res.hasErrors) {
        setUploadError('Some rows have validation issues. Review below.');
      }
    } catch (err: unknown) {
      setUploadError('Failed to parse Excel file. Ensure it matches the downloaded template.');
    }
  };

  const handleCommitScores = () => {
    const validRows = parsedRows.filter((r) => r.isValid);
    const newRecords: ScoreRecord[] = [];

    validRows.forEach((r) => {
      const matched = classStudents.find((s) => s.admissionNo.toLowerCase() === r.admissionNo.toLowerCase());
      if (matched) {
        const id = `${matched.id}-${selectedSubjectId}-${session.id}-${selectedTerm}`;
        newRecords.push({
          id,
          studentId: matched.id,
          subjectId: selectedSubjectId,
          sessionId: session.id,
          termId: selectedTerm,
          classId: selectedClassId,
          ca1: r.ca1,
          ca2: r.ca2,
          ca3: r.ca3,
          exam: r.exam,
          total: r.total,
          grade: r.grade as 'A' | 'B' | 'C' | 'D' | 'F',
          remark: r.remark,
        });
      }
    });

    bulkSaveScores(newRecords);
    setSuccessMsg(`Successfully committed ${validRows.length} score records from Excel!`);
    setParsedRows([]);
    setTimeout(() => setSuccessMsg(null), 4000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar activePage="teacher" />

      {/* Top Banner */}
      <div className="bg-school-900 text-white py-6 px-4 sm:px-6 lg:px-8 border-b border-school-800 relative overflow-hidden">
        <IslamicPattern variant="gold" />
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-xs text-amber-300 font-semibold uppercase tracking-wider mb-1">
              <Upload className="w-4 h-4" />
              <span>Teacher Academic Suite</span>
            </div>
            <h1 className="text-2xl font-black tracking-tight">Excel Spreadsheet Bulk Scoring</h1>
            <p className="text-xs text-slate-300 mt-0.5">
              Download pre-filled rosters (.xlsx), input marks offline, and upload back with instant validation
            </p>
          </div>
        </div>

        {/* Sub-Nav */}
        <div className="max-w-7xl mx-auto mt-4 pt-4 border-t border-school-800 flex items-center gap-4 text-xs font-semibold relative z-10">
          <Link href="/teacher" className="text-slate-300 hover:text-white transition-colors pb-1">
            Dashboard
          </Link>
          <Link href="/teacher/scores" className="text-slate-300 hover:text-white transition-colors pb-1">
            Live Score Grid
          </Link>
          <Link href="/teacher/excel" className="text-white border-b-2 border-amber-400 pb-1 font-bold">
            Excel Bulk Upload
          </Link>
          <Link href="/teacher/character" className="text-slate-300 hover:text-white transition-colors pb-1">
            Tahfeez &amp; Psychomotor
          </Link>
        </div>
      </div>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {successMsg && (
          <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-4 text-xs font-semibold text-emerald-900 flex items-center gap-2 animate-fade-in">
            <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Controls */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Class:</label>
            <select
              value={selectedClassId}
              onChange={(e) => setSelectedClassId(e.target.value)}
              className="w-full text-xs font-bold bg-slate-50 border border-slate-300 rounded-xl p-2.5"
            >
              {classes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.section})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Subject:</label>
            <select
              value={selectedSubjectId}
              onChange={(e) => setSelectedSubjectId(e.target.value)}
              className="w-full text-xs font-bold bg-slate-50 border border-slate-300 rounded-xl p-2.5"
            >
              {subjects
                .filter((s) => s.applicableClasses.includes(selectedClassId))
                .map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.category})
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Term:</label>
            <div className="flex rounded-xl bg-slate-100 p-1">
              {(['FIRST', 'SECOND', 'THIRD'] as TermId[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedTerm(t)}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                    selectedTerm === t ? 'bg-school-800 text-white shadow-sm' : 'text-slate-600'
                  }`}
                >
                  {t === 'FIRST' ? '1st' : t === 'SECOND' ? '2nd' : '3rd'} Term
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 2-Step Excel Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl border border-school-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-school-900 font-bold text-sm">
              <Download className="w-5 h-5 text-school-700" />
              <span>Step 1: Download Pre-filled Template</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Downloads an `.xlsx` spreadsheet populated with all {classStudents.length} pupils in {currentClass.name} for {currentSubject.name}.
            </p>
            <button
              onClick={handleExportTemplate}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-school-800 hover:bg-school-900 text-white rounded-xl text-xs font-bold shadow transition-all"
            >
              <Download className="w-4 h-4 text-amber-300" />
              Download Class Template (.xlsx)
            </button>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-school-900 font-bold text-sm">
              <Upload className="w-5 h-5 text-emerald-700" />
              <span>Step 2: Upload Completed File</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Upload your updated file. The engine validates CA1, CA2, CA3, Exam bounds, and student admission numbers.
            </p>
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileUpload}
              className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-school-800 file:text-white hover:file:bg-school-900 cursor-pointer"
            />
          </div>
        </div>

        {uploadError && (
          <div className="bg-rose-50 border border-rose-300 rounded-xl p-4 text-xs text-rose-800 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0" />
            <span>{uploadError}</span>
          </div>
        )}

        {/* Parsed Rows Preview */}
        {parsedRows.length > 0 && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-900 uppercase">
                Imported Scores Preview ({parsedRows.length} Rows)
              </h3>
              <button
                onClick={handleCommitScores}
                className="flex items-center gap-1.5 px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow transition-all"
              >
                <CheckCircle className="w-4 h-4" />
                Commit &amp; Save Scores
              </button>
            </div>

            <div className="border border-slate-200 rounded-2xl overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 font-bold text-[11px] uppercase">
                    <th className="p-3">Adm No</th>
                    <th className="p-3">Student Name</th>
                    <th className="p-3 text-center">CA1 (20)</th>
                    <th className="p-3 text-center">CA2 (20)</th>
                    <th className="p-3 text-center">CA3 (20)</th>
                    <th className="p-3 text-center">Exam (40)</th>
                    <th className="p-3 text-center">Total</th>
                    <th className="p-3 text-center">Grade</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {parsedRows.map((r, idx) => (
                    <tr key={idx} className={r.isValid ? 'bg-white' : 'bg-rose-50'}>
                      <td className="p-3 font-mono font-semibold">{r.admissionNo}</td>
                      <td className="p-3 font-bold">{r.studentName}</td>
                      <td className="p-3 text-center font-mono">{r.ca1}</td>
                      <td className="p-3 text-center font-mono">{r.ca2}</td>
                      <td className="p-3 text-center font-mono">{r.ca3}</td>
                      <td className="p-3 text-center font-mono font-bold">{r.exam}</td>
                      <td className="p-3 text-center font-mono font-black text-school-900 bg-amber-50">{r.total}</td>
                      <td className="p-3 text-center font-bold">{r.grade}</td>
                      <td className="p-3">
                        {r.isValid ? (
                          <span className="text-emerald-700 font-bold text-[10px]">Valid</span>
                        ) : (
                          <span className="text-rose-700 font-bold text-[10px]">{r.error}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
