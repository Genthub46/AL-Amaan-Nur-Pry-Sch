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
  saveScoreRecord,
} from '@/lib/storage';
import { calculateGrade } from '@/lib/gradingEngine';
import { SMART_COMMENT_BANK } from '@/lib/constants';
import { ClassArm, Subject, Student, TermId } from '@/types';
import {
  INITIAL_CLASSES,
  INITIAL_SUBJECTS,
  INITIAL_STUDENTS,
} from '@/lib/mockData';
import {
  BookOpen,
  Save,
  CheckCircle,
  AlertTriangle,
  FileSpreadsheet,
  Upload,
  Star,
  Sparkles,
  ArrowLeft,
  X,
  MessageSquare,
} from 'lucide-react';

export default function TeacherScoresPage() {
  const [classes, setClasses] = useState<ClassArm[]>(INITIAL_CLASSES);
  const [subjects, setSubjects] = useState<Subject[]>(INITIAL_SUBJECTS);
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [selectedClassId, setSelectedClassId] = useState<string>('basic-4');
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('sub-math');
  const [selectedTerm, setSelectedTerm] = useState<TermId>('FIRST');

  // Score state: studentId -> { ca1, ca2, ca3, exam, remark }
  const [localScores, setLocalScores] = useState<
    Record<string, { ca1: number; ca2: number; ca3: number; exam: number; remark: string }>
  >({});

  // Smart Comment Bank Modal State
  const [commentModalStudentId, setCommentModalStudentId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  const session = getActiveSession();

  useEffect(() => {
    const cls = getClasses();
    const subs = getSubjects();
    const stds = getStudents();
    const allScores = getScores();

    setClasses(cls);
    setSubjects(subs);
    setStudents(stds);

    const classStudents = stds.filter((s) => s.classId === selectedClassId);
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
  }, [selectedClassId, selectedSubjectId, selectedTerm]);

  const currentClass = classes.find((c) => c.id === selectedClassId) || classes[0];
  const currentSubject = subjects.find((s) => s.id === selectedSubjectId) || subjects[0];
  const classStudents = students.filter((s) => s.classId === selectedClassId);

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

  const handleApplyComment = (text: string) => {
    if (!commentModalStudentId) return;
    handleScoreChange(commentModalStudentId, 'remark', text);
    setCommentModalStudentId(null);
  };

  const handleSaveAll = () => {
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

    setSaveSuccessMsg(`Continuous assessment scores for ${currentSubject.name} saved successfully!`);
    setTimeout(() => setSaveSuccessMsg(null), 4000);
  };

  const filteredComments = SMART_COMMENT_BANK.filter(
    (c) => selectedCategory === 'ALL' || c.category === selectedCategory
  );

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar activePage="teacher" />

      {/* Top Banner with Subtle Islamic Design */}
      <div className="bg-school-900 text-white py-6 px-4 sm:px-6 lg:px-8 border-b border-school-800 relative overflow-hidden">
        <IslamicPattern variant="gold" />
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-xs text-amber-300 font-semibold uppercase tracking-wider mb-1">
              <FileSpreadsheet className="w-4 h-4" />
              <span>Teacher Academic Suite</span>
            </div>
            <h1 className="text-2xl font-black tracking-tight">Live Score Entry Grid</h1>
            <p className="text-xs text-slate-300 mt-0.5">
              Enforcing CA1 (20) + CA2 (20) + CA3 (20) + Exam (40) = 100 Marks with Smart Comment Bank
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSaveAll}
              className="flex items-center gap-1.5 px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-school-950 font-bold text-xs rounded-xl shadow-md transition-all active:scale-95"
            >
              <Save className="w-4 h-4" />
              Save All Scores
            </button>
          </div>
        </div>

        {/* Sub-Nav */}
        <div className="max-w-7xl mx-auto mt-4 pt-4 border-t border-school-800 flex items-center gap-4 text-xs font-semibold relative z-10">
          <Link href="/teacher" className="text-slate-300 hover:text-white transition-colors pb-1">
            Dashboard
          </Link>
          <Link href="/teacher/scores" className="text-white border-b-2 border-amber-400 pb-1 font-bold">
            Live Score Grid
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
        {saveSuccessMsg && (
          <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-4 text-xs font-semibold text-emerald-900 flex items-center gap-2 animate-fade-in">
            <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <span>{saveSuccessMsg}</span>
          </div>
        )}

        {/* Filter Controls Bar */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Class:</label>
            <select
              value={selectedClassId}
              onChange={(e) => setSelectedClassId(e.target.value)}
              className="w-full text-xs font-bold bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900"
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
              className="w-full text-xs font-bold bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900"
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

        {/* Score Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-sm text-slate-900">
                {currentSubject.name} — {currentClass.name}
              </h3>
              <p className="text-[11px] text-slate-500">
                Max Bounds: CA1 (20) • CA2 (20) • CA3 (20) • Exam (40). Instant grade calculation.
              </p>
            </div>

            <span className="text-xs bg-amber-100 text-amber-900 px-3 py-1 rounded-full font-bold">
              {classStudents.length} Pupils Enrolled
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-school-900 text-white font-bold text-[11px] uppercase tracking-wider text-center">
                  <th className="py-3 px-3 text-left w-10">#</th>
                  <th className="py-3 px-3 text-left w-28">Adm No</th>
                  <th className="py-3 px-4 text-left w-52">Student Full Name</th>
                  <th className="py-3 px-2 w-20 bg-school-800">CA 1 (20)</th>
                  <th className="py-3 px-2 w-20 bg-school-800">CA 2 (20)</th>
                  <th className="py-3 px-2 w-20 bg-school-800">CA 3 (20)</th>
                  <th className="py-3 px-2 w-24 bg-school-700">Exam (40)</th>
                  <th className="py-3 px-2 w-20 bg-amber-600 text-white">Total</th>
                  <th className="py-3 px-2 w-16">Grade</th>
                  <th className="py-3 px-4 text-left">Teacher Remark</th>
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
                      <td className="py-2.5 px-3 text-slate-400 font-mono text-center">{idx + 1}</td>
                      <td className="py-2.5 px-3 font-mono text-[11px] font-semibold text-slate-600">
                        {std.admissionNo}
                      </td>
                      <td className="py-2.5 px-4 font-bold text-slate-900">{std.fullName}</td>

                      {/* CA1 */}
                      <td className="py-2.5 px-1 text-center">
                        <input
                          type="number"
                          min="0"
                          max="20"
                          value={row.ca1 === 0 ? '' : row.ca1}
                          onChange={(e) => handleScoreChange(std.id, 'ca1', e.target.value)}
                          placeholder="0"
                          className={`w-16 px-2 py-1 text-center font-mono font-bold rounded-lg border text-xs focus:outline-none focus:ring-1 focus:ring-school-600 ${
                            ca1Invalid ? 'border-rose-500 bg-rose-50 text-rose-700' : 'border-slate-300'
                          }`}
                        />
                      </td>

                      {/* CA2 */}
                      <td className="py-2.5 px-1 text-center">
                        <input
                          type="number"
                          min="0"
                          max="20"
                          value={row.ca2 === 0 ? '' : row.ca2}
                          onChange={(e) => handleScoreChange(std.id, 'ca2', e.target.value)}
                          placeholder="0"
                          className={`w-16 px-2 py-1 text-center font-mono font-bold rounded-lg border text-xs focus:outline-none focus:ring-1 focus:ring-school-600 ${
                            ca2Invalid ? 'border-rose-500 bg-rose-50 text-rose-700' : 'border-slate-300'
                          }`}
                        />
                      </td>

                      {/* CA3 */}
                      <td className="py-2.5 px-1 text-center">
                        <input
                          type="number"
                          min="0"
                          max="20"
                          value={row.ca3 === 0 ? '' : row.ca3}
                          onChange={(e) => handleScoreChange(std.id, 'ca3', e.target.value)}
                          placeholder="0"
                          className={`w-16 px-2 py-1 text-center font-mono font-bold rounded-lg border text-xs focus:outline-none focus:ring-1 focus:ring-school-600 ${
                            ca3Invalid ? 'border-rose-500 bg-rose-50 text-rose-700' : 'border-slate-300'
                          }`}
                        />
                      </td>

                      {/* Exam */}
                      <td className="py-2.5 px-1 text-center">
                        <input
                          type="number"
                          min="0"
                          max="40"
                          value={row.exam === 0 ? '' : row.exam}
                          onChange={(e) => handleScoreChange(std.id, 'exam', e.target.value)}
                          placeholder="0"
                          className={`w-18 px-2 py-1 text-center font-mono font-black text-school-900 rounded-lg border text-xs focus:outline-none focus:ring-1 focus:ring-school-600 ${
                            examInvalid ? 'border-rose-500 bg-rose-50 text-rose-700' : 'border-slate-300'
                          }`}
                        />
                      </td>

                      {/* Total */}
                      <td className="py-2.5 px-2 text-center font-mono font-black text-sm text-school-950 bg-amber-50">
                        {total}
                      </td>

                      {/* Grade */}
                      <td className="py-2.5 px-2 text-center font-bold">
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

                      {/* Remark with Smart Comment Bank trigger */}
                      <td className="py-2.5 px-3">
                        <div className="flex items-center gap-1.5">
                          <input
                            type="text"
                            value={row.remark}
                            onChange={(e) => handleScoreChange(std.id, 'remark', e.target.value)}
                            placeholder="Type or pick from bank..."
                            className="flex-1 px-2.5 py-1 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-school-600"
                          />
                          <button
                            type="button"
                            onClick={() => setCommentModalStudentId(std.id)}
                            title="Pick from Smart Comment Bank"
                            className="p-1 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 transition-colors flex-shrink-0"
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* SMART COMMENT BANK MODAL */}
      {commentModalStudentId && (
        <div className="fixed inset-0 bg-school-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl space-y-4 animate-scale-in">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <h3 className="font-extrabold text-sm text-slate-900">
                  Smart Comment Bank — 1-Click Remark
                </h3>
              </div>
              <button
                onClick={() => setCommentModalStudentId(null)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-1.5 text-xs font-semibold">
              <button
                onClick={() => setSelectedCategory('ALL')}
                className={`px-3 py-1 rounded-full transition-all ${
                  selectedCategory === 'ALL' ? 'bg-school-800 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                All Remarks
              </button>
              <button
                onClick={() => setSelectedCategory('EXCELLENCE')}
                className={`px-3 py-1 rounded-full transition-all ${
                  selectedCategory === 'EXCELLENCE' ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Academic Excellence
              </button>
              <button
                onClick={() => setSelectedCategory('ISLAMIC_CHARACTER')}
                className={`px-3 py-1 rounded-full transition-all ${
                  selectedCategory === 'ISLAMIC_CHARACTER' ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Islamic Conduct &amp; Tahfeez
              </button>
              <button
                onClick={() => setSelectedCategory('PROGRESS')}
                className={`px-3 py-1 rounded-full transition-all ${
                  selectedCategory === 'PROGRESS' ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Steady Progress
              </button>
              <button
                onClick={() => setSelectedCategory('ENCOURAGEMENT')}
                className={`px-3 py-1 rounded-full transition-all ${
                  selectedCategory === 'ENCOURAGEMENT' ? 'bg-purple-700 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Encouragement
              </button>
            </div>

            {/* Comment List */}
            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {filteredComments.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleApplyComment(item.text)}
                  className="w-full text-left p-3 rounded-xl border border-slate-200 hover:border-school-600 hover:bg-school-50/50 transition-all text-xs text-slate-700 leading-relaxed group"
                >
                  <span className="font-semibold text-slate-900 block group-hover:text-school-800">
                    &quot;{item.text}&quot;
                  </span>
                  <span className="text-[10px] text-amber-700 font-bold uppercase mt-1 block">
                    {item.category.replace('_', ' ')}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
