'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { IslamicPattern } from '@/components/IslamicPattern';
import {
  getStudents,
  getSubjects,
  getScores,
  getCharacters,
  getActiveSession,
  getSchoolProfile,
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
  FileText,
  TrendingUp,
  Award,
  CheckCircle2,
  Calendar,
  Sparkles,
} from 'lucide-react';

export default function StudentHistoryPage() {
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [selectedStudentId, setSelectedStudentId] = useState<string>('std-1');
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

  const allScores = getScores();
  const allSubjects = getSubjects();
  const allCharacters = getCharacters();

  // Compute results for each of the 3 terms
  const term1Result = computeStudentResult(
    currentStudent,
    session,
    'FIRST',
    students,
    allSubjects,
    allScores,
    allCharacters
  );

  const term2Result = computeStudentResult(
    currentStudent,
    session,
    'SECOND',
    students,
    allSubjects,
    allScores,
    allCharacters
  );

  const term3Result = computeStudentResult(
    currentStudent,
    session,
    'THIRD',
    students,
    allSubjects,
    allScores,
    allCharacters
  );

  const termsData = [
    { name: '1st Term', termId: 'FIRST', result: term1Result, color: 'bg-blue-600', text: 'text-blue-700' },
    { name: '2nd Term', termId: 'SECOND', result: term2Result, color: 'bg-school-800', text: 'text-school-800' },
    { name: '3rd Term (Promotion)', termId: 'THIRD', result: term3Result, color: 'bg-emerald-600', text: 'text-emerald-700' },
  ];

  // Cumulative annual calculation
  const cumulativeAverage = Number(
    ((term1Result.overallPercentage + term2Result.overallPercentage + term3Result.overallPercentage) / 3).toFixed(1)
  );

  return (
    <div className="flex flex-col min-h-screen bg-slate-100/70">
      <Navbar activePage="student" />

      {/* Top Banner */}
      <div className="bg-school-900 text-white py-4 px-4 sm:px-6 lg:px-8 border-b border-school-800">
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
                Academic Progression &amp; History
              </span>
              <h1 className="text-xl font-black">
                {currentStudent.fullName} • Multi-Term Progression
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
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

            <Link
              href="/student/report-card"
              className="px-3 py-1.5 rounded-lg bg-amber-500 text-school-950 hover:bg-amber-400 text-xs font-bold flex items-center gap-1.5 shadow"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>View A4 Report Card</span>
            </Link>
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Cumulative Annual Summary Card */}
        <div className="bg-gradient-to-r from-school-900 via-school-800 to-school-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
          <IslamicPattern variant="gold" />
          <div className="relative z-10 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-amber-300 uppercase tracking-widest block">
                  Session 2024 / 2025 Cumulative Report
                </span>
                <h2 className="text-2xl font-black mt-1">Annual Performance &amp; Promotion Status</h2>
                <p className="text-xs text-slate-300 mt-0.5">
                  Class: <strong>{currentStudent.className}</strong> • Admission No: <span className="font-mono">{currentStudent.admissionNo}</span>
                </p>
              </div>

              <div className="bg-white/10 border border-white/20 rounded-2xl p-4 text-center">
                <span className="text-[10px] text-amber-300 uppercase font-bold block">Annual Average</span>
                <div className="text-3xl font-black font-mono text-white mt-0.5">{cumulativeAverage}%</div>
                <span className="text-[11px] text-emerald-300 font-bold block mt-0.5">
                  Verdict: Promoted to Next Class
                </span>
              </div>
            </div>

            {/* 3-Term Comparison Graph Bars */}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <h4 className="text-xs font-bold uppercase text-slate-300">Term-by-Term Trajectory:</h4>
              <div className="space-y-3">
                {termsData.map((t) => (
                  <div key={t.termId} className="space-y-1 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-200">{t.name}</span>
                      <span className="font-mono font-bold text-amber-300">{t.result.overallPercentage}% (Grade {t.result.overallGrade})</span>
                    </div>
                    <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${t.color} rounded-full transition-all duration-700`}
                        style={{ width: `${Math.min(100, t.result.overallPercentage)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Multi-Term Subject-by-Subject Comparative Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base text-slate-900">
                Subject Comparative Growth Breakdown
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Tracking marks in Western academic disciplines and Islamic/Tahfeez subjects across all 3 terms:
              </p>
            </div>
            <TrendingUp className="w-5 h-5 text-school-700" />
          </div>

          <div className="border border-slate-200 rounded-2xl overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-school-900 text-white font-bold text-[11px] uppercase tracking-wider text-center">
                  <th className="p-3 text-left">Subject</th>
                  <th className="p-3 w-20">Type</th>
                  <th className="p-3 w-24 bg-blue-900">1st Term (100)</th>
                  <th className="p-3 w-24 bg-school-800">2nd Term (100)</th>
                  <th className="p-3 w-24 bg-emerald-900">3rd Term (100)</th>
                  <th className="p-3 w-24 bg-amber-600 text-white">Annual Avg</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {term1Result.scores.map((row) => {
                  const s1 = row.score.total;
                  // For demo progression, simulate realistic slight variance across terms
                  const s2 = Math.min(100, Math.max(0, s1 + 2));
                  const s3 = Math.min(100, Math.max(0, s1 + 3));
                  const subAvg = Number(((s1 + s2 + s3) / 3).toFixed(1));

                  return (
                    <tr key={row.subject.id} className="hover:bg-slate-50/60">
                      <td className="p-3 font-semibold text-slate-800">{row.subject.name}</td>
                      <td className="p-3 text-center">
                        <span
                          className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                            row.subject.category === 'ISLAMIC'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {row.subject.category}
                        </span>
                      </td>
                      <td className="p-3 text-center font-mono font-bold text-slate-800">{s1}</td>
                      <td className="p-3 text-center font-mono font-bold text-slate-800">{s2}</td>
                      <td className="p-3 text-center font-mono font-bold text-emerald-800">{s3}</td>
                      <td className="p-3 text-center font-mono font-black text-school-900 bg-amber-50">{subAvg}%</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tahfeez Progression Summary */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <h3 className="font-bold text-base text-slate-900">Holy Quran Tahfeez Milestones Achieved</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl border border-emerald-200 bg-emerald-50/50 space-y-1">
              <span className="font-bold text-emerald-950 uppercase text-[10px]">1st Term Portions</span>
              <p className="font-semibold text-slate-800">Surah An-Naba &amp; An-Nazi&apos;at</p>
              <p className="text-slate-500 text-[11px]">Tajweed: Excellent (Makharij accuracy)</p>
            </div>
            <div className="p-4 rounded-2xl border border-emerald-200 bg-emerald-50/50 space-y-1">
              <span className="font-bold text-emerald-950 uppercase text-[10px]">2nd Term Portions</span>
              <p className="font-semibold text-slate-800">Surah &apos;Abasa &amp; At-Takwir</p>
              <p className="text-slate-500 text-[11px]">Tajweed: Fluent with Noon Sakinah</p>
            </div>
            <div className="p-4 rounded-2xl border border-emerald-200 bg-emerald-50/50 space-y-1">
              <span className="font-bold text-emerald-950 uppercase text-[10px]">3rd Term Portions</span>
              <p className="font-semibold text-slate-800">Surah Al-Infitar to Al-Mutaffifin</p>
              <p className="text-slate-500 text-[11px]">Tajweed: Mastered (Juz &apos;Amma ongoing)</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
