'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ReportCardA4 } from '@/components/ReportCardA4';
import { FeeNoticeModal } from '@/components/FeeNoticeModal';
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
  INITIAL_STUDENTS,
  INITIAL_SESSIONS,
} from '@/lib/mockData';
import { DEFAULT_SCHOOL_PROFILE } from '@/lib/constants';
import {
  ArrowLeft,
  GraduationCap,
  Users,
  LineChart,
  Printer,
  Calendar,
  Lock,
} from 'lucide-react';

export default function StudentReportCardPage() {
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [selectedStudentId, setSelectedStudentId] = useState<string>('std-1');
  const [selectedTerm, setSelectedTerm] = useState<TermId>('FIRST');
  const [profile, setProfile] = useState(DEFAULT_SCHOOL_PROFILE);
  const [session, setSession] = useState(INITIAL_SESSIONS[0]);

  useEffect(() => {
    setStudents(getStudents());
    setProfile(getSchoolProfile());
    setSession(getActiveSession());
  }, []);

  const currentStudent = students.find((s) => s.id === selectedStudentId) || students[0];
  const familySiblings = currentStudent
    ? students.filter((s) => s.familyId === currentStudent.familyId)
    : [];

  const handleInstantClearFee = () => {
    if (!currentStudent) return;
    updateStudentFeeStatus(currentStudent.id, 'CLEARED');
    setStudents(getStudents());
  };

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

      {/* Top Breadcrumb & Controls Bar */}
      <div className="bg-school-900 text-white py-4 px-4 sm:px-6 lg:px-8 border-b border-school-800 no-print">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/student"
              className="p-2 rounded-lg bg-school-800 text-slate-300 hover:text-white hover:bg-school-700 transition-all flex items-center gap-1.5 text-xs font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Dashboard</span>
            </Link>
            <div>
              <span className="text-[10px] text-amber-300 uppercase font-bold tracking-wider">
                Official Report Card View
              </span>
              <h1 className="text-xl font-black">
                {currentStudent.fullName} ({currentStudent.className})
              </h1>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Sibling Switcher */}
            {familySiblings.length > 1 && (
              <div className="flex items-center gap-2 bg-school-950/80 px-3 py-1.5 rounded-lg border border-school-700 text-xs">
                <Users className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-slate-400">Sibling:</span>
                {familySiblings.map((sibling) => (
                  <button
                    key={sibling.id}
                    onClick={() => setSelectedStudentId(sibling.id)}
                    className={`px-2 py-0.5 rounded text-xs font-bold transition-all ${
                      sibling.id === currentStudent.id
                        ? 'bg-amber-500 text-school-950'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    {sibling.fullName.split(' ')[0]}
                  </button>
                ))}
              </div>
            )}

            {/* Term Selector */}
            <div className="flex bg-school-800 rounded-lg p-0.5 text-xs">
              {(['FIRST', 'SECOND', 'THIRD'] as TermId[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedTerm(t)}
                  className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
                    selectedTerm === t ? 'bg-white text-school-900 shadow-sm' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {t === 'FIRST' ? '1st' : t === 'SECOND' ? '2nd' : '3rd'} Term
                </button>
              ))}
            </div>

            <Link
              href="/student/history"
              className="px-3 py-1.5 rounded-lg bg-school-800 text-amber-300 hover:bg-school-700 text-xs font-semibold flex items-center gap-1.5 border border-school-700"
            >
              <LineChart className="w-3.5 h-3.5" />
              <span>Multi-Term History</span>
            </Link>
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isFeeCleared ? (
          <FeeNoticeModal
            student={currentStudent}
            profile={profile}
            onClearDemo={handleInstantClearFee}
          />
        ) : !isPublished ? (
          <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-8 text-center max-w-xl mx-auto shadow-md space-y-3">
            <Lock className="w-10 h-10 text-amber-600 mx-auto" />
            <h3 className="text-base font-bold text-amber-900">
              Terminal Results for {currentStudent.className} Are Awaiting Headteacher Publishing
            </h3>
            <p className="text-xs text-amber-800">
              Subject scores are being finalized by Mrs. Anat Sobulo&apos;s academic board. Once published, the official report sheet will appear here immediately.
            </p>
          </div>
        ) : (
          <ReportCardA4 result={computedResult} profile={profile} showPrintButton={true} />
        )}
      </main>

      <Footer />
    </div>
  );
}
