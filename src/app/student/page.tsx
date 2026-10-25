'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ReportCardA4 } from '@/components/ReportCardA4';
import { FeeNoticeModal } from '@/components/FeeNoticeModal';
import { IslamicPattern } from '@/components/IslamicPattern';
import Link from 'next/link';
import {
  INITIAL_STUDENTS,
  INITIAL_SESSIONS,
} from '@/lib/mockData';
import {
  DEFAULT_SCHOOL_PROFILE,
} from '@/lib/constants';
import {
  getStudents,
  getSubjects,
  getScores,
  getCharacters,
  getActiveSession,
  getSchoolProfile,
  updateStudentFeeStatus,
  isClassResultPublished,
} from '@/lib/storage';
import { computeStudentResult } from '@/lib/gradingEngine';
import { Student, TermId } from '@/types';
import {
  Users,
  GraduationCap,
  AlertTriangle,
  Star,
  CheckCircle2,
  Calendar,
  Lock,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

export default function StudentPortalPage() {
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [selectedStudentId, setSelectedStudentId] = useState<string>('std-1');
  const [selectedTerm, setSelectedTerm] = useState<TermId>('FIRST');
  const [activeTab, setActiveTab] = useState<'a4' | 'interactive'>('a4');
  const [profile, setProfile] = useState(DEFAULT_SCHOOL_PROFILE);
  const [session, setSession] = useState(INITIAL_SESSIONS[0]);

  useEffect(() => {
    setStudents(getStudents());
    setProfile(getSchoolProfile());
    setSession(getActiveSession());
  }, []);

  const currentStudent = students.find((s) => s.id === selectedStudentId) || students[0];

  // Find siblings in the same family for the Multi-Child Switcher
  const familySiblings = currentStudent
    ? students.filter((s) => s.familyId === currentStudent.familyId)
    : [];

  const handleInstantClearFee = () => {
    if (!currentStudent) return;
    updateStudentFeeStatus(currentStudent.id, 'CLEARED');
    setStudents(getStudents());
  };

  if (!currentStudent) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Navbar activePage="student" />
        <div className="flex-1 flex items-center justify-center p-8 text-center">
          <p className="text-slate-500">Loading student portal...</p>
        </div>
        <Footer />
      </div>
    );
  }

  // Compute results for this student
  const allScores = getScores();
  const allSubjects = getSubjects();
  const allCharacters = getCharacters();
  const computedResult = computeStudentResult(
    currentStudent,
    session,
    selectedTerm,
    students,
    allSubjects,
    allScores,
    allCharacters
  );

  const isFeeCleared = currentStudent.feeStatus === 'CLEARED';
  const isPublished = isClassResultPublished(currentStudent.classId, session.id, selectedTerm);

  return (
    <div className="flex flex-col min-h-screen bg-slate-100/70">
      <Navbar activePage="student" />

      {/* Top Portal Breadcrumb & Family Switcher Bar */}
      <div className="bg-school-900 text-white py-6 px-4 sm:px-6 lg:px-8 border-b border-school-800 no-print relative overflow-hidden">
        <IslamicPattern variant="gold" />
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-xs text-amber-300 font-semibold uppercase tracking-wider mb-1">
              <GraduationCap className="w-4 h-4" />
              <span>Parent & Pupil Academic Portal</span>
            </div>
            <h1 className="text-2xl font-black tracking-tight flex items-center gap-3">
              <span>{currentStudent.fullName}</span>
              <span className="text-xs font-mono font-medium px-2.5 py-0.5 rounded-full bg-school-800 text-slate-300 border border-school-700">
                {currentStudent.admissionNo}
              </span>
            </h1>
            <p className="text-xs text-slate-300 mt-0.5">
              Class: <strong>{currentStudent.className}</strong> • Parent: {currentStudent.parentName}
            </p>
          </div>

          {/* Sibling Switcher (Family Account) */}
          {familySiblings.length > 1 && (
            <div className="bg-school-950/80 border border-school-700/80 rounded-xl p-3 flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full md:w-auto">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <Users className="w-4 h-4 text-amber-400" />
                <span className="font-semibold text-white">Family Switcher:</span>
              </div>
              <div className="flex items-center gap-2">
                {familySiblings.map((sibling) => (
                  <button
                    key={sibling.id}
                    onClick={() => setSelectedStudentId(sibling.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      sibling.id === currentStudent.id
                        ? 'bg-amber-500 text-school-950 shadow-sm'
                        : 'bg-school-800 text-slate-300 hover:bg-school-700'
                    }`}
                  >
                    {sibling.fullName.split(' ')[0]} ({sibling.className})
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Dedicated Section Sub-Nav */}
        <div className="max-w-7xl mx-auto mt-4 pt-4 border-t border-school-800 flex items-center gap-4 text-xs font-semibold relative z-10">
          <Link
            href="/student"
            className="text-white border-b-2 border-amber-400 pb-1 font-bold"
          >
            Dashboard
          </Link>
          <Link
            href="/student/report-card"
            className="text-slate-300 hover:text-white transition-colors pb-1"
          >
            Official A4 Printable Report Card
          </Link>
          <Link
            href="/student/history"
            className="text-slate-300 hover:text-white transition-colors pb-1"
          >
            Multi-Term Progression Graph
          </Link>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Controls Toolbar (Term selector, quick test switcher) */}
        <div className="no-print bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-bold text-slate-500 uppercase">Select Term:</span>
            <div className="flex items-center rounded-lg bg-slate-100 p-1">
              {(['FIRST', 'SECOND', 'THIRD'] as TermId[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedTerm(t)}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                    selectedTerm === t
                      ? 'bg-school-800 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {t === 'FIRST' ? '1st Term' : t === 'SECOND' ? '2nd Term' : '3rd Term'}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Demo Student Switcher to test all personas */}
          <div className="flex items-center gap-2">
            <label className="text-xs font-semibold text-slate-500">Test Other Pupils:</label>
            <select
              value={selectedStudentId}
              onChange={(e) => setSelectedStudentId(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-school-600"
            >
              {students.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.fullName} ({s.className}) — {s.feeStatus}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* FEE CLEARANCE GATEKEEPER CHECK */}
        {!isFeeCleared ? (
          <FeeNoticeModal
            student={currentStudent}
            profile={profile}
            onClearDemo={handleInstantClearFee}
          />
        ) : !isPublished ? (
          /* RESULT UNPUBLISHED NOTICE */
          <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-8 text-center max-w-xl mx-auto shadow-md space-y-3">
            <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center mx-auto">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-amber-900">
              Terminal Results for {currentStudent.className} Are Being Vetted
            </h3>
            <p className="text-xs text-amber-800 leading-relaxed">
              Subject teachers and the Headteacher are currently finalizing continuous assessment computations and psychomotor evaluations. Results will be published shortly by the school administration.
            </p>
            <p className="text-[11px] text-slate-500">
              (Admin can publish this class in the Admin Suite &gt; Approval Workflow tab).
            </p>
          </div>
        ) : (
          /* CLEARED & PUBLISHED: FULL REPORT CARD DISPLAY */
          <div className="space-y-6">
            {/* View Mode Switcher */}
            <div className="no-print flex items-center justify-center gap-2">
              <button
                onClick={() => setActiveTab('a4')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
                  activeTab === 'a4'
                    ? 'bg-school-800 text-white'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                📄 Official A4 Printable Report Card
              </button>
              <button
                onClick={() => setActiveTab('interactive')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
                  activeTab === 'interactive'
                    ? 'bg-school-800 text-white'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                📊 Interactive Breakdown & Analytics
              </button>
            </div>

            {activeTab === 'a4' ? (
              /* A4 Printable Sheet */
              <ReportCardA4 result={computedResult} profile={profile} />
            ) : (
              /* Interactive Visual Dashboard */
              <div className="space-y-6 max-w-5xl mx-auto">
                {/* Metric Summary Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center">
                    <span className="text-[11px] font-bold text-slate-400 uppercase">Overall Average</span>
                    <div className="text-3xl font-black text-school-900 mt-1">
                      {computedResult.overallPercentage}%
                    </div>
                    <span className="text-xs text-emerald-600 font-semibold">Grade {computedResult.overallGrade}</span>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center">
                    <span className="text-[11px] font-bold text-slate-400 uppercase">Class Position</span>
                    <div className="text-3xl font-black text-amber-600 mt-1">
                      {computedResult.classPosition}
                      <span className="text-sm font-normal text-slate-400"> / {computedResult.totalStudentsInClass}</span>
                    </div>
                    <span className="text-xs text-slate-500">In {currentStudent.className}</span>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center">
                    <span className="text-[11px] font-bold text-slate-400 uppercase">Total Marks</span>
                    <div className="text-3xl font-black text-school-800 mt-1">
                      {computedResult.totalMarksObtained}
                    </div>
                    <span className="text-xs text-slate-400 font-mono">out of {computedResult.totalMarksPossible}</span>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center">
                    <span className="text-[11px] font-bold text-slate-400 uppercase">Attendance</span>
                    <div className="text-3xl font-black text-emerald-700 mt-1">
                      {computedResult.character.timesPresent}
                    </div>
                    <span className="text-xs text-slate-500">of {computedResult.character.timesSchoolOpened} days</span>
                  </div>
                </div>

                {/* Islamic & Tahfeez Spotlight */}
                <div className="bg-gradient-to-r from-emerald-900 to-school-950 text-white rounded-2xl p-6 shadow-md">
                  <div className="flex items-center gap-2 mb-3">
                    <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                    <h3 className="font-extrabold text-base text-amber-300 uppercase tracking-wider">
                      Tahfeez & Islamic Moral Character
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    <div className="bg-white/10 p-4 rounded-xl">
                      <span className="text-slate-300 block text-[10px] uppercase font-bold">Quran Memorized</span>
                      <span className="text-sm font-bold text-white mt-1 block">
                        {computedResult.character.quranSurahMemorized}
                      </span>
                    </div>
                    <div className="bg-white/10 p-4 rounded-xl">
                      <span className="text-slate-300 block text-[10px] uppercase font-bold">Tajweed & Fluency</span>
                      <span className="text-sm font-bold text-amber-300 mt-1 block">
                        Rating: {computedResult.character.tajweedRating}/5 (Excellent)
                      </span>
                    </div>
                    <div className="bg-white/10 p-4 rounded-xl">
                      <span className="text-slate-300 block text-[10px] uppercase font-bold">Salah Observance</span>
                      <span className="text-sm font-bold text-emerald-300 mt-1 block">
                        Rating: {computedResult.character.salahAttendance}/5 (Regular)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quick Subject Score Cards */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
                    Subject Performance List (CA 60% + Exam 40%)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {computedResult.scores.map((row) => (
                      <div
                        key={row.subject.id}
                        className="p-3 rounded-xl border border-slate-200 flex items-center justify-between hover:bg-slate-50 transition-all"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-800 text-xs">{row.subject.name}</span>
                            <span
                              className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                                row.subject.category === 'ISLAMIC'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-blue-100 text-blue-800'
                              }`}
                            >
                              {row.subject.category}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            CA1: {row.score.ca1} | CA2: {row.score.ca2} | CA3: {row.score.ca3} | Exam: {row.score.exam}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="text-base font-black text-school-900 block font-mono">
                            {row.score.total}
                          </span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                              row.score.grade === 'A'
                                ? 'bg-emerald-600 text-white'
                                : row.score.grade === 'B'
                                ? 'bg-blue-600 text-white'
                                : 'bg-amber-600 text-white'
                            }`}
                          >
                            {row.score.grade}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
