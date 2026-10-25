'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { IslamicPattern } from '@/components/IslamicPattern';
import { ReportCardA4 } from '@/components/ReportCardA4';
import {
  getClasses,
  getSubjects,
  getStudents,
  getScores,
  getCharacters,
  getActiveSession,
  getSchoolProfile,
} from '@/lib/storage';
import { computeStudentResult } from '@/lib/gradingEngine';
import { ClassArm, Subject, Student, TermId } from '@/types';
import { INITIAL_CLASSES, INITIAL_SUBJECTS, INITIAL_STUDENTS } from '@/lib/mockData';
import { DEFAULT_SCHOOL_PROFILE } from '@/lib/constants';
import {
  Printer,
  Calendar,
  Sparkles,
} from 'lucide-react';

export default function AdminBatchPrintPage() {
  const [classes, setClasses] = useState<ClassArm[]>(INITIAL_CLASSES);
  const [subjects, setSubjects] = useState<Subject[]>(INITIAL_SUBJECTS);
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [selectedClassId, setSelectedClassId] = useState<string>('basic-4');
  const [selectedTerm, setSelectedTerm] = useState<TermId>('FIRST');
  const [profile, setProfile] = useState(DEFAULT_SCHOOL_PROFILE);

  const session = getActiveSession();

  useEffect(() => {
    setClasses(getClasses());
    setSubjects(getSubjects());
    setStudents(getStudents());
    setProfile(getSchoolProfile());
  }, []);

  const currentClass = classes.find((c) => c.id === selectedClassId) || classes[0];
  const classStudents = students.filter((s) => s.classId === selectedClassId);
  const allScores = getScores();
  const allCharacters = getCharacters();

  return (
    <div className="flex flex-col min-h-screen bg-slate-100/70">
      <Navbar activePage="admin" />

      {/* Top Banner */}
      <div className="bg-school-900 text-white py-6 px-4 sm:px-6 lg:px-8 border-b border-school-800 no-print relative overflow-hidden">
        <IslamicPattern variant="gold" />
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-xs text-amber-300 font-semibold uppercase tracking-wider mb-1">
              <Printer className="w-4 h-4 text-purple-400" />
              <span>Speech &amp; Prize-Giving Day Printing</span>
            </div>
            <h1 className="text-2xl font-black tracking-tight">Batch Report Card Generator</h1>
            <p className="text-xs text-slate-300 mt-0.5">
              Generates all {classStudents.length} official A4 report cards for {currentClass.name} with standard print page breaks
            </p>
          </div>

          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-school-950 font-bold text-xs rounded-xl shadow transition-all active:scale-95"
          >
            <Printer className="w-4 h-4" />
            Print All {classStudents.length} Report Cards
          </button>
        </div>

        {/* Sub-Nav */}
        <div className="max-w-7xl mx-auto mt-4 pt-4 border-t border-school-800 flex items-center gap-5 text-xs font-semibold relative z-10 overflow-x-auto">
          <Link href="/admin" className="text-slate-300 hover:text-white transition-colors pb-1 flex-shrink-0">
            Overview
          </Link>
          <Link href="/admin/admissions" className="text-slate-300 hover:text-white transition-colors pb-1 flex-shrink-0">
            Admissions Desk
          </Link>
          <Link href="/admin/approvals" className="text-slate-300 hover:text-white transition-colors pb-1 flex-shrink-0">
            Result Approvals
          </Link>
          <Link href="/admin/fees" className="text-slate-300 hover:text-white transition-colors pb-1 flex-shrink-0">
            Fee Clearance Gate
          </Link>
          <Link href="/admin/broadsheet" className="text-slate-300 hover:text-white transition-colors pb-1 flex-shrink-0">
            Broadsheet Matrix
          </Link>
          <Link href="/admin/batch-print" className="text-white border-b-2 border-amber-400 pb-1 font-bold flex-shrink-0">
            Batch A4 Print
          </Link>
          <Link href="/admin/settings" className="text-slate-300 hover:text-white transition-colors pb-1 flex-shrink-0">
            Settings &amp; Profile
          </Link>
        </div>
      </div>

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Class and Term Selector */}
        <div className="no-print bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-500 uppercase">Select Class:</span>
            <select
              value={selectedClassId}
              onChange={(e) => setSelectedClassId(e.target.value)}
              className="text-xs font-bold bg-slate-50 border border-slate-300 rounded-xl px-3 py-2"
            >
              {classes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 uppercase">Term:</span>
            <div className="flex rounded-xl bg-slate-100 p-1">
              {(['FIRST', 'SECOND', 'THIRD'] as TermId[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedTerm(t)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                    selectedTerm === t ? 'bg-school-800 text-white shadow-sm' : 'text-slate-600'
                  }`}
                >
                  {t === 'FIRST' ? '1st' : t === 'SECOND' ? '2nd' : '3rd'} Term
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Sequential A4 Cards */}
        <div className="space-y-12">
          {classStudents.map((std) => {
            const comp = computeStudentResult(
              std,
              session,
              selectedTerm,
              classStudents,
              subjects,
              allScores,
              allCharacters
            );
            return (
              <div key={std.id} className="page-break-after">
                <ReportCardA4 result={comp} profile={profile} showPrintButton={false} />
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
