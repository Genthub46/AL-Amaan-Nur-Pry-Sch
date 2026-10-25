'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import {
  getClasses,
  getSubjects,
  getStudents,
  getScores,
  getCharacters,
  getActiveSession,
  saveScoreRecord,
  bulkSaveScores,
  saveCharacterAssessment,
  updateClassPublishStatus,
  getPublishStatuses,
} from '@/lib/storage';
import { IslamicPattern } from '@/components/IslamicPattern';
import { exportClassScoreTemplate, parseClassScoreExcel, ParsedScoreRow } from '@/lib/excelUtils';
import Link from 'next/link';
import {
  INITIAL_CLASSES,
  INITIAL_SUBJECTS,
  INITIAL_STUDENTS,
} from '@/lib/mockData';
import { calculateGrade } from '@/lib/gradingEngine';
import { ClassArm, Subject, Student, ScoreRecord, CharacterAssessment, TermId } from '@/types';
import {
  BookOpen,
  Download,
  Upload,
  Save,
  CheckCircle,
  AlertTriangle,
  FileSpreadsheet,
  Send,
  Star,
  Users,
} from 'lucide-react';

export default function TeacherPortalPage() {
  const [classes, setClasses] = useState<ClassArm[]>(INITIAL_CLASSES);
  const [subjects, setSubjects] = useState<Subject[]>(INITIAL_SUBJECTS);
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [selectedClassId, setSelectedClassId] = useState<string>('basic-4');
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('sub-math');
  const [selectedTerm, setSelectedTerm] = useState<TermId>('FIRST');
  const [activeTab, setActiveTab] = useState<'scores' | 'character' | 'excel'>('scores');

  // Form State for Live Score Grid: studentId -> { ca1, ca2, ca3, exam, remark }
  const [localScores, setLocalScores] = useState<
    Record<string, { ca1: number; ca2: number; ca3: number; exam: number; remark: string }>
  >({});

  // Character assessment form state: studentId -> CharacterAssessment
  const [localCharacters, setLocalCharacters] = useState<Record<string, CharacterAssessment>>({});

  // Excel Upload state
  const [parsedExcelRows, setParsedExcelRows] = useState<ParsedScoreRow[]>([]);
  const [excelUploadError, setExcelUploadError] = useState<string | null>(null);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  const session = getActiveSession();

  // Load and sync data
  useEffect(() => {
    const cls = getClasses();
    const subs = getSubjects();
    const stds = getStudents();
    const allScores = getScores();
    const allChars = getCharacters();

    setClasses(cls);
    setSubjects(subs);
    setStudents(stds);

    // Filter students in selected class
    const classStudents = stds.filter((s) => s.classId === selectedClassId);

    // Initialize local scores map
    const scoreMap: Record<string, { ca1: number; ca2: number; ca3: number; exam: number; remark: string }> = {};
    classStudents.forEach((std) => {
      const existing = allScores.find(
        (s) =>
          s.studentId === std.id &&
          s.subjectId === selectedSubjectId &&
          s.sessionId === session.id &&
          s.termId === selectedTerm
      );
      scoreMap[std.id] = {
        ca1: existing ? existing.ca1 : 0,
        ca2: existing ? existing.ca2 : 0,
        ca3: existing ? existing.ca3 : 0,
        exam: existing ? existing.exam : 0,
        remark: existing ? existing.remark : '',
      };
    });
    setLocalScores(scoreMap);

    // Initialize local characters map
    const charMap: Record<string, CharacterAssessment> = {};
    classStudents.forEach((std) => {
      const existing = allChars.find(
        (c) => c.studentId === std.id && c.sessionId === session.id && c.termId === selectedTerm
      );
      if (existing) {
        charMap[std.id] = existing;
      } else {
        charMap[std.id] = {
          id: `char-${std.id}-${session.id}-${selectedTerm}`,
          studentId: std.id,
          sessionId: session.id,
          termId: selectedTerm,
          classId: selectedClassId,
          quranSurahMemorized: 'Surah An-Naba',
          tajweedRating: 4,
          salahAttendance: 5,
          islamicMannerisms: 5,
          adhkarProgress: 'Daily Morning & Evening Adhkar',
          punctuality: 5,
          neatness: 5,
          handwriting: 4,
          attentiveness: 4,
          politeness: 5,
          sports: 4,
          timesSchoolOpened: 118,
          timesPresent: 115,
          timesAbsent: 3,
          teacherRemark: 'Good progress in both Western academics and Islamic studies.',
          headTeacherRemark: 'Satisfactory performance. Keep striving for excellence.',
          promotionStatus: selectedTerm === 'THIRD' ? 'PROMOTED' : 'N/A',
        };
      }
    });
    setLocalCharacters(charMap);
  }, [selectedClassId, selectedSubjectId, selectedTerm]);

  const currentClass = classes.find((c) => c.id === selectedClassId);
  const currentSubject = subjects.find((s) => s.id === selectedSubjectId);
  const classStudents = students.filter((s) => s.classId === selectedClassId);

  // Handle score input changes with validation
  const handleScoreChange = (
    studentId: string,
    field: 'ca1' | 'ca2' | 'ca3' | 'exam' | 'remark',
    val: string | number
  ) => {
    setLocalScores((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [field]: field === 'remark' ? val : Number(val) || 0,
      },
    }));
  };

  // Save all live spreadsheet scores
  const handleSaveAllScores = () => {
    classStudents.forEach((std) => {
      const entry = localScores[std.id];
      if (entry) {
        saveScoreRecord(
          std.id,
          selectedSubjectId,
          session.id,
          selectedTerm,
          selectedClassId,
          entry.ca1,
          entry.ca2,
          entry.ca3,
          entry.exam,
          entry.remark
        );
      }
    });

    setSaveSuccessMsg(`Scores for ${currentSubject?.name} in ${currentClass?.name} saved successfully!`);
    setTimeout(() => setSaveSuccessMsg(null), 4000);
  };

  // Save character and Tahfeez traits
  const handleSaveCharacters = () => {
    Object.values(localCharacters).forEach((item) => {
      saveCharacterAssessment(item);
    });
    setSaveSuccessMsg(`Character and Tahfeez ratings for ${currentClass?.name} saved successfully!`);
    setTimeout(() => setSaveSuccessMsg(null), 4000);
  };

  // Export Excel Template
  const handleExportTemplate = () => {
    if (!currentSubject || !currentClass) return;
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

  // Parse Uploaded Excel
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setExcelUploadError(null);
      const result = await parseClassScoreExcel(file, classStudents);
      setParsedExcelRows(result.rows);
      if (result.hasErrors) {
        setExcelUploadError('Some rows have validation issues. Please review below.');
      }
    } catch (err: unknown) {
      setExcelUploadError('Failed to parse Excel file. Please ensure it follows the downloaded template.');
    }
  };

  // Commit Parsed Excel Rows
  const handleCommitExcelScores = () => {
    const validRows = parsedExcelRows.filter((r) => r.isValid);
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
    setSaveSuccessMsg(`Successfully imported ${validRows.length} score records from Excel!`);
    setParsedExcelRows([]);
    setTimeout(() => setSaveSuccessMsg(null), 4000);

    // Refresh local scores state
    const updated = { ...localScores };
    validRows.forEach((r) => {
      const matched = classStudents.find((s) => s.admissionNo.toLowerCase() === r.admissionNo.toLowerCase());
      if (matched) {
        updated[matched.id] = {
          ca1: r.ca1,
          ca2: r.ca2,
          ca3: r.ca3,
          exam: r.exam,
          remark: r.remark,
        };
      }
    });
    setLocalScores(updated);
  };

  // Submit to Headteacher
  const handleSubmitForApproval = () => {
    updateClassPublishStatus(selectedClassId, session.id, selectedTerm, 'SUBMITTED');
    alert(`Class results for ${currentClass?.name} submitted to Headteacher for vetting!`);
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
              <BookOpen className="w-4 h-4" />
              <span>Teacher Academic Suite</span>
            </div>
            <h1 className="text-2xl font-black tracking-tight">Teacher Management Dashboard</h1>
            <p className="text-xs text-slate-300 mt-0.5">
              Dual Entry: Live Web Grid &amp; Excel Bulk Upload • CA 60% + Exam 40% Formula
            </p>
          </div>

          <button
            onClick={handleSubmitForApproval}
            className="flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-school-950 font-bold text-xs rounded-xl shadow-md transition-all active:scale-95"
          >
            <Send className="w-4 h-4" />
            Submit Class Scores to Headteacher
          </button>
        </div>

        {/* Sub-Nav */}
        <div className="max-w-7xl mx-auto mt-4 pt-4 border-t border-school-800 flex items-center gap-4 text-xs font-semibold relative z-10">
          <Link href="/teacher" className="text-white border-b-2 border-amber-400 pb-1 font-bold">
            Dashboard
          </Link>
          <Link href="/teacher/scores" className="text-slate-300 hover:text-white transition-colors pb-1">
            Live Score Grid (with Comment Bank)
          </Link>
          <Link href="/teacher/excel" className="text-slate-300 hover:text-white transition-colors pb-1">
            Excel Bulk Upload
          </Link>
          <Link href="/teacher/character" className="text-slate-300 hover:text-white transition-colors pb-1">
            Tahfeez &amp; Psychomotor
          </Link>
        </div>
      </div>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Success Alert */}
        {saveSuccessMsg && (
          <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-4 text-xs font-semibold text-emerald-900 flex items-center gap-2 animate-fade-in">
            <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <span>{saveSuccessMsg}</span>
          </div>
        )}

        {/* Filter & Selection Bar */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Class Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Select Class:</label>
            <select
              value={selectedClassId}
              onChange={(e) => setSelectedClassId(e.target.value)}
              className="w-full text-xs font-semibold bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:ring-2 focus:ring-school-600 focus:outline-none"
            >
              {classes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.section})
                </option>
              ))}
            </select>
          </div>

          {/* Subject Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Select Subject:</label>
            <select
              value={selectedSubjectId}
              onChange={(e) => setSelectedSubjectId(e.target.value)}
              className="w-full text-xs font-semibold bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:ring-2 focus:ring-school-600 focus:outline-none"
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

          {/* Term Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Term:</label>
            <div className="flex rounded-lg bg-slate-100 p-1">
              {(['FIRST', 'SECOND', 'THIRD'] as TermId[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedTerm(t)}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all ${
                    selectedTerm === t ? 'bg-school-800 text-white shadow-sm' : 'text-slate-600'
                  }`}
                >
                  {t === 'FIRST' ? '1st' : t === 'SECOND' ? '2nd' : '3rd'} Term
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-slate-200 gap-2">
          <button
            onClick={() => setActiveTab('scores')}
            className={`pb-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'scores'
                ? 'border-school-800 text-school-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" />
            Live Score Grid (Web)
          </button>

          <button
            onClick={() => setActiveTab('excel')}
            className={`pb-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'excel'
                ? 'border-school-800 text-school-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Upload className="w-4 h-4" />
            Excel Bulk Upload / Template
          </button>

          <button
            onClick={() => setActiveTab('character')}
            className={`pb-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'character'
                ? 'border-school-800 text-school-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Star className="w-4 h-4 text-emerald-600" />
            Tahfeez & Psychomotor Ratings
          </button>
        </div>

        {/* TAB 1: LIVE SCORE GRID */}
        {activeTab === 'scores' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-bold text-sm text-slate-900">
                  {currentSubject?.name} — {currentClass?.name}
                </h3>
                <p className="text-[11px] text-slate-500">
                  Max Bounds: CA1 (20) • CA2 (20) • CA3 (20) • Exam (40). Instant grade calculation.
                </p>
              </div>

              <button
                onClick={handleSaveAllScores}
                className="flex items-center gap-1.5 px-4 py-2 bg-school-800 hover:bg-school-900 text-white rounded-xl text-xs font-bold shadow transition-all active:scale-95"
              >
                <Save className="w-4 h-4" />
                Save All Scores
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-school-900 text-white font-bold text-[11px] uppercase tracking-wider text-center">
                    <th className="py-2.5 px-3 text-left w-10">#</th>
                    <th className="py-2.5 px-3 text-left w-24">Adm No</th>
                    <th className="py-2.5 px-4 text-left w-52">Student Full Name</th>
                    <th className="py-2.5 px-2 w-20 bg-school-800">CA 1 (20)</th>
                    <th className="py-2.5 px-2 w-20 bg-school-800">CA 2 (20)</th>
                    <th className="py-2.5 px-2 w-20 bg-school-800">CA 3 (20)</th>
                    <th className="py-2.5 px-2 w-24 bg-school-700">Exam (40)</th>
                    <th className="py-2.5 px-2 w-20 bg-amber-600 text-white">Total</th>
                    <th className="py-2.5 px-2 w-16">Grade</th>
                    <th className="py-2.5 px-3 text-left">Teacher Remark</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {classStudents.map((std, idx) => {
                    const row = localScores[std.id] || { ca1: 0, ca2: 0, ca3: 0, exam: 0, remark: '' };
                    const total = row.ca1 + row.ca2 + row.ca3 + row.exam;
                    const { grade } = calculateGrade(total);

                    const ca1Invalid = row.ca1 > 20 || row.ca1 < 0;
                    const ca2Invalid = row.ca2 > 20 || row.ca2 < 0;
                    const ca3Invalid = row.ca3 > 20 || row.ca3 < 0;
                    const examInvalid = row.exam > 40 || row.exam < 0;

                    return (
                      <tr key={std.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                        <td className="py-2 px-3 text-slate-400 font-mono text-center">{idx + 1}</td>
                        <td className="py-2 px-3 font-mono text-[11px] font-semibold text-slate-600">
                          {std.admissionNo}
                        </td>
                        <td className="py-2 px-4 font-bold text-slate-900">{std.fullName}</td>

                        {/* CA1 */}
                        <td className="py-2 px-1 text-center">
                          <input
                            type="number"
                            min="0"
                            max="20"
                            value={row.ca1 === 0 ? '' : row.ca1}
                            onChange={(e) => handleScoreChange(std.id, 'ca1', e.target.value)}
                            placeholder="0"
                            className={`w-16 px-2 py-1 text-center font-mono font-bold rounded border text-xs focus:outline-none focus:ring-1 focus:ring-school-600 ${
                              ca1Invalid ? 'border-rose-500 bg-rose-50 text-rose-700' : 'border-slate-300'
                            }`}
                          />
                        </td>

                        {/* CA2 */}
                        <td className="py-2 px-1 text-center">
                          <input
                            type="number"
                            min="0"
                            max="20"
                            value={row.ca2 === 0 ? '' : row.ca2}
                            onChange={(e) => handleScoreChange(std.id, 'ca2', e.target.value)}
                            placeholder="0"
                            className={`w-16 px-2 py-1 text-center font-mono font-bold rounded border text-xs focus:outline-none focus:ring-1 focus:ring-school-600 ${
                              ca2Invalid ? 'border-rose-500 bg-rose-50 text-rose-700' : 'border-slate-300'
                            }`}
                          />
                        </td>

                        {/* CA3 */}
                        <td className="py-2 px-1 text-center">
                          <input
                            type="number"
                            min="0"
                            max="20"
                            value={row.ca3 === 0 ? '' : row.ca3}
                            onChange={(e) => handleScoreChange(std.id, 'ca3', e.target.value)}
                            placeholder="0"
                            className={`w-16 px-2 py-1 text-center font-mono font-bold rounded border text-xs focus:outline-none focus:ring-1 focus:ring-school-600 ${
                              ca3Invalid ? 'border-rose-500 bg-rose-50 text-rose-700' : 'border-slate-300'
                            }`}
                          />
                        </td>

                        {/* Exam */}
                        <td className="py-2 px-1 text-center">
                          <input
                            type="number"
                            min="0"
                            max="40"
                            value={row.exam === 0 ? '' : row.exam}
                            onChange={(e) => handleScoreChange(std.id, 'exam', e.target.value)}
                            placeholder="0"
                            className={`w-18 px-2 py-1 text-center font-mono font-black text-school-900 rounded border text-xs focus:outline-none focus:ring-1 focus:ring-school-600 ${
                              examInvalid ? 'border-rose-500 bg-rose-50 text-rose-700' : 'border-slate-300'
                            }`}
                          />
                        </td>

                        {/* Total */}
                        <td className="py-2 px-2 text-center font-mono font-black text-sm text-school-950 bg-amber-50">
                          {total}
                        </td>

                        {/* Grade */}
                        <td className="py-2 px-2 text-center font-bold">
                          <span
                            className={`inline-block w-6 py-0.5 rounded text-[11px] ${
                              grade === 'A'
                                ? 'bg-emerald-600 text-white'
                                : grade === 'B'
                                ? 'bg-blue-600 text-white'
                                : grade === 'C'
                                ? 'bg-amber-600 text-white'
                                : 'bg-rose-600 text-white'
                            }`}
                          >
                            {grade}
                          </span>
                        </td>

                        {/* Remark */}
                        <td className="py-2 px-3">
                          <input
                            type="text"
                            value={row.remark}
                            onChange={(e) => handleScoreChange(std.id, 'remark', e.target.value)}
                            placeholder="e.g. Excellent recitation"
                            className="w-full px-2 py-1 text-xs border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-school-600"
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: EXCEL BULK UPLOAD & TEMPLATE */}
        {activeTab === 'excel' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
            <div>
              <h3 className="font-bold text-base text-slate-900">Excel Spreadsheet Bulk Scoring</h3>
              <p className="text-xs text-slate-500 mt-1">
                Download a pre-populated Excel template with your pupils&apos; names and IDs, fill it in offline, and upload it back.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Step 1: Download */}
              <div className="border border-school-200 rounded-xl p-5 bg-school-50/50 space-y-3">
                <span className="text-xs font-bold text-school-800 uppercase block">Step 1: Download Template</span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Generates an `.xlsx` workbook populated with all {classStudents.length} pupils in {currentClass?.name}.
                </p>
                <button
                  onClick={handleExportTemplate}
                  className="flex items-center gap-2 px-4 py-2.5 bg-school-800 hover:bg-school-900 text-white rounded-xl text-xs font-bold shadow transition-all"
                >
                  <Download className="w-4 h-4 text-school-300" />
                  Download Score Sheet (.xlsx)
                </button>
              </div>

              {/* Step 2: Upload */}
              <div className="border border-slate-200 rounded-xl p-5 bg-slate-50 space-y-3">
                <span className="text-xs font-bold text-slate-700 uppercase block">Step 2: Upload Completed File</span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Select your updated Excel file. The system will validate all scores before importing.
                </p>
                <input
                  type="file"
                  accept=".xlsx, .xls"
                  onChange={handleFileUpload}
                  className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-school-800 file:text-white hover:file:bg-school-900 cursor-pointer"
                />
              </div>
            </div>

            {/* Error Message */}
            {excelUploadError && (
              <div className="bg-rose-50 border border-rose-300 rounded-xl p-4 text-xs text-rose-800 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                <span>{excelUploadError}</span>
              </div>
            )}

            {/* Preview of Parsed Excel Rows */}
            {parsedExcelRows.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900 uppercase">
                    Preview of Imported Scores ({parsedExcelRows.length} rows)
                  </h4>
                  <button
                    onClick={handleCommitExcelScores}
                    className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow transition-all"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Confirm & Save Scores
                  </button>
                </div>

                <div className="border border-slate-200 rounded-xl overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-100 text-slate-700 font-bold text-[11px] uppercase">
                        <th className="p-2">Adm No</th>
                        <th className="p-2">Name</th>
                        <th className="p-2 text-center">CA1 (20)</th>
                        <th className="p-2 text-center">CA2 (20)</th>
                        <th className="p-2 text-center">CA3 (20)</th>
                        <th className="p-2 text-center">Exam (40)</th>
                        <th className="p-2 text-center">Total</th>
                        <th className="p-2 text-center">Grade</th>
                        <th className="p-2">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {parsedExcelRows.map((r, idx) => (
                        <tr key={idx} className={r.isValid ? 'bg-white' : 'bg-rose-50 text-rose-900'}>
                          <td className="p-2 font-mono text-[11px]">{r.admissionNo}</td>
                          <td className="p-2 font-medium">{r.studentName}</td>
                          <td className="p-2 text-center font-mono">{r.ca1}</td>
                          <td className="p-2 text-center font-mono">{r.ca2}</td>
                          <td className="p-2 text-center font-mono">{r.ca3}</td>
                          <td className="p-2 text-center font-mono">{r.exam}</td>
                          <td className="p-2 text-center font-mono font-bold">{r.total}</td>
                          <td className="p-2 text-center font-bold">{r.grade}</td>
                          <td className="p-2">
                            {r.isValid ? (
                              <span className="text-emerald-600 font-bold text-[10px]">Valid</span>
                            ) : (
                              <span className="text-rose-600 font-bold text-[10px]">{r.error}</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: TAHFEEZ & CHARACTER TRAITS */}
        {activeTab === 'character' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-slate-900">
                  Tahfeez, Islamic Conduct & Psychomotor Skills
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Class Teacher evaluation of Islamic morals (Akhlaaq), Salah, and affective domains.
                </p>
              </div>

              <button
                onClick={handleSaveCharacters}
                className="flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow transition-all"
              >
                <Save className="w-4 h-4" />
                Save Character Ratings
              </button>
            </div>

            <div className="space-y-6">
              {classStudents.map((std) => {
                const char = localCharacters[std.id] || {
                  quranSurahMemorized: '',
                  tajweedRating: 5,
                  salahAttendance: 5,
                  islamicMannerisms: 5,
                  adhkarProgress: '',
                  punctuality: 5,
                  neatness: 5,
                  handwriting: 4,
                  attentiveness: 5,
                  politeness: 5,
                  sports: 4,
                  teacherRemark: '',
                  timesSchoolOpened: 118,
                  timesPresent: 115,
                  timesAbsent: 3,
                };

                const updateField = (field: string, val: unknown) => {
                  setLocalCharacters((prev) => ({
                    ...prev,
                    [std.id]: {
                      ...prev[std.id],
                      [field]: val,
                    },
                  }));
                };

                return (
                  <div key={std.id} className="border border-slate-200 rounded-xl p-4 bg-slate-50/60 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                      <span className="font-bold text-school-900 text-sm">
                        {std.fullName} <span className="font-mono text-xs text-slate-500">({std.admissionNo})</span>
                      </span>
                      <span className="text-xs text-slate-500 font-medium">Class: {std.className}</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      {/* Islamic Section */}
                      <div className="space-y-2.5 bg-emerald-50/60 p-3 rounded-lg border border-emerald-200">
                        <span className="font-bold text-emerald-950 block uppercase text-[10px]">
                          Quran & Islamic Evaluation
                        </span>
                        <div>
                          <label className="block text-slate-600 mb-0.5">Surah/Portion Memorized:</label>
                          <input
                            type="text"
                            value={char.quranSurahMemorized}
                            onChange={(e) => updateField('quranSurahMemorized', e.target.value)}
                            placeholder="e.g. Surah Al-Mulk, An-Naba"
                            className="w-full px-2 py-1 border border-slate-300 rounded text-xs bg-white"
                          />
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <div>
                            <label className="block text-slate-600 mb-0.5">Tajweed (1-5):</label>
                            <input
                              type="number"
                              min="1"
                              max="5"
                              value={char.tajweedRating}
                              onChange={(e) => updateField('tajweedRating', Number(e.target.value))}
                              className="w-full px-2 py-1 border border-slate-300 rounded text-xs bg-white text-center font-bold"
                            />
                          </div>
                          <div>
                            <label className="block text-slate-600 mb-0.5">Salah (1-5):</label>
                            <input
                              type="number"
                              min="1"
                              max="5"
                              value={char.salahAttendance}
                              onChange={(e) => updateField('salahAttendance', Number(e.target.value))}
                              className="w-full px-2 py-1 border border-slate-300 rounded text-xs bg-white text-center font-bold"
                            />
                          </div>
                          <div>
                            <label className="block text-slate-600 mb-0.5">Adab (1-5):</label>
                            <input
                              type="number"
                              min="1"
                              max="5"
                              value={char.islamicMannerisms}
                              onChange={(e) => updateField('islamicMannerisms', Number(e.target.value))}
                              className="w-full px-2 py-1 border border-slate-300 rounded text-xs bg-white text-center font-bold"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Affective & Remarks */}
                      <div className="space-y-2.5 bg-white p-3 rounded-lg border border-slate-200">
                        <span className="font-bold text-slate-700 block uppercase text-[10px]">
                          Affective Traits & Teacher Remark
                        </span>
                        <div className="grid grid-cols-3 gap-2">
                          <div>
                            <label className="block text-slate-600 mb-0.5">Neatness (1-5):</label>
                            <input
                              type="number"
                              min="1"
                              max="5"
                              value={char.neatness}
                              onChange={(e) => updateField('neatness', Number(e.target.value))}
                              className="w-full px-2 py-1 border border-slate-300 rounded text-xs text-center font-bold"
                            />
                          </div>
                          <div>
                            <label className="block text-slate-600 mb-0.5">Handwriting (1-5):</label>
                            <input
                              type="number"
                              min="1"
                              max="5"
                              value={char.handwriting}
                              onChange={(e) => updateField('handwriting', Number(e.target.value))}
                              className="w-full px-2 py-1 border border-slate-300 rounded text-xs text-center font-bold"
                            />
                          </div>
                          <div>
                            <label className="block text-slate-600 mb-0.5">Punctuality (1-5):</label>
                            <input
                              type="number"
                              min="1"
                              max="5"
                              value={char.punctuality}
                              onChange={(e) => updateField('punctuality', Number(e.target.value))}
                              className="w-full px-2 py-1 border border-slate-300 rounded text-xs text-center font-bold"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-slate-600 mb-0.5">Class Teacher&apos;s Remark:</label>
                          <input
                            type="text"
                            value={char.teacherRemark}
                            onChange={(e) => updateField('teacherRemark', e.target.value)}
                            placeholder="e.g. A dedicated and morally upright pupil."
                            className="w-full px-2 py-1 border border-slate-300 rounded text-xs"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
