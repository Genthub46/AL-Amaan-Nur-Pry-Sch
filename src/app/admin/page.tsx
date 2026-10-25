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
  getSchoolProfile,
  getPublishStatuses,
  getAdmissionApplications,
} from '@/lib/storage';
import { ClassArm, Subject, Student, TermId, SchoolProfile, AcademicSession, AdmissionApplication } from '@/types';
import {
  INITIAL_CLASSES,
  INITIAL_SUBJECTS,
  INITIAL_STUDENTS,
  INITIAL_SESSIONS,
  INITIAL_PUBLISH_STATUSES,
  INITIAL_ADMISSIONS,
} from '@/lib/mockData';
import { DEFAULT_SCHOOL_PROFILE } from '@/lib/constants';
import {
  ShieldCheck,
  Calendar,
  Lock,
  Unlock,
  CheckCircle,
  FileText,
  DollarSign,
  Printer,
  Users,
  Search,
  BookOpen,
  ArrowRight,
  UserCheck,
  Settings,
  Sparkles,
} from 'lucide-react';

export default function AdminPortalPage() {
  const [profile, setProfile] = useState<SchoolProfile>(DEFAULT_SCHOOL_PROFILE);
  const [session, setSession] = useState<AcademicSession>(INITIAL_SESSIONS[0]);
  const [classes, setClasses] = useState<ClassArm[]>(INITIAL_CLASSES);
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [publishStatuses, setPublishStatuses] = useState(INITIAL_PUBLISH_STATUSES);
  const [admissions, setAdmissions] = useState<AdmissionApplication[]>(INITIAL_ADMISSIONS);

  useEffect(() => {
    setProfile(getSchoolProfile());
    setSession(getActiveSession());
    setClasses(getClasses());
    setStudents(getStudents());
    setPublishStatuses(getPublishStatuses());
    setAdmissions(getAdmissionApplications());
  }, []);

  const clearedFeesCount = students.filter((s) => s.feeStatus === 'CLEARED').length;
  const publishedClassesCount = publishStatuses.filter((p) => p.status === 'PUBLISHED').length;
  const pendingAdmissionsCount = admissions.filter((a) => a.status === 'SUBMITTED' || a.status === 'UNDER_REVIEW').length;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar activePage="admin" />

      {/* Top Banner with Subtle Islamic Design */}
      <div className="bg-school-900 text-white py-6 px-4 sm:px-6 lg:px-8 border-b border-school-800 relative overflow-hidden">
        <IslamicPattern variant="gold" />
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-xs text-amber-300 font-semibold uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Headteacher &amp; Proprietor Executive Suite</span>
            </div>
            <h1 className="text-2xl font-black tracking-tight">Administrative Command Center</h1>
            <p className="text-xs text-slate-300 mt-0.5">
              Proprietor: <strong>{profile.proprietorName}</strong> • Headteacher: <strong>{profile.headTeacherName}</strong> • Session {session.name}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs bg-amber-500/20 text-amber-300 border border-amber-400/30 px-3 py-1.5 rounded-lg font-mono font-bold">
              Role: Super Administrator
            </span>
          </div>
        </div>

        {/* Sub-Nav */}
        <div className="max-w-7xl mx-auto mt-4 pt-4 border-t border-school-800 flex items-center gap-5 text-xs font-semibold relative z-10 overflow-x-auto">
          <Link href="/admin" className="text-white border-b-2 border-amber-400 pb-1 font-bold flex-shrink-0">
            Overview
          </Link>
          <Link href="/admin/admissions" className="text-slate-300 hover:text-white transition-colors pb-1 flex-shrink-0 flex items-center gap-1">
            <span>Admissions Desk</span>
            {pendingAdmissionsCount > 0 && (
              <span className="bg-amber-400 text-school-950 text-[10px] font-black px-1.5 py-0.2 rounded-full">
                {pendingAdmissionsCount}
              </span>
            )}
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
          <Link href="/admin/batch-print" className="text-slate-300 hover:text-white transition-colors pb-1 flex-shrink-0">
            Batch A4 Print
          </Link>
          <Link href="/admin/settings" className="text-slate-300 hover:text-white transition-colors pb-1 flex-shrink-0">
            Settings &amp; Profile
          </Link>
        </div>
      </div>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* KPI Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Total Pupils Enrolled</span>
            <div className="text-3xl font-black text-school-950 font-mono">{students.length}</div>
            <p className="text-xs text-slate-500 font-medium">Across {classes.length} Nursery &amp; Primary Arms</p>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Admissions In Queue</span>
            <div className="text-3xl font-black text-amber-600 font-mono">{admissions.length}</div>
            <p className="text-xs text-slate-500 font-medium">{pendingAdmissionsCount} Pending Headteacher Review</p>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Fee Clearance Rate</span>
            <div className="text-3xl font-black text-emerald-700 font-mono">
              {students.length > 0 ? Math.round((clearedCount(students) / students.length) * 100) : 0}%
            </div>
            <p className="text-xs text-slate-500 font-medium">{clearedCount(students)} of {students.length} Cleared</p>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Result Publishing</span>
            <div className="text-3xl font-black text-school-800 font-mono">
              {publishedClassesCount} <span className="text-sm font-normal text-slate-400">/ {classes.length}</span>
            </div>
            <p className="text-xs text-slate-500 font-medium">{publishedClassesCount} Classes Visible to Parents</p>
          </div>
        </div>

        {/* Dedicated Admin Section Launchpad Cards */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black text-school-950">Administrative Modules &amp; Sub-Pages</h2>
            <span className="text-xs text-slate-500">Every section has its dedicated management page</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Admissions Card */}
            <Link
              href="/admin/admissions"
              className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md hover:border-amber-400 transition-all space-y-3 group"
            >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
                  <UserCheck className="w-6 h-6" />
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-1 transition-all" />
              </div>
              <h3 className="text-base font-extrabold text-slate-900 group-hover:text-amber-700">
                Admissions Processing Desk
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Review prospective pupil applications submitted from the public portal, schedule entrance screening, and generate admission letters.
              </p>
              <div className="text-[11px] font-bold text-amber-800 pt-1">
                {admissions.length} Registered Candidate(s) →
              </div>
            </Link>

            {/* Fee Clearance Gatekeeper */}
            <Link
              href="/admin/fees"
              className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-400 transition-all space-y-3 group"
            >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold">
                  <DollarSign className="w-6 h-6" />
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
              </div>
              <h3 className="text-base font-extrabold text-slate-900 group-hover:text-emerald-700">
                Fee Clearance Gatekeeper &amp; Ledger
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Manage pupil financial statuses (Cleared, Pending, Partial). Locked pupils see friendly payment notices with school bank details.
              </p>
              <div className="text-[11px] font-bold text-emerald-800 pt-1">
                Manage All {students.length} Pupils →
              </div>
            </Link>

            {/* Result Approvals */}
            <Link
              href="/admin/approvals"
              className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md hover:border-school-400 transition-all space-y-3 group"
            >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-school-100 text-school-900 flex items-center justify-center font-bold">
                  <Lock className="w-6 h-6" />
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-school-700 group-hover:translate-x-1 transition-all" />
              </div>
              <h3 className="text-base font-extrabold text-slate-900 group-hover:text-school-700">
                Result Approval &amp; Publishing Switch
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Class-by-class control switch. Move results from Draft to Submitted, Approved, and Published for parents to access.
              </p>
              <div className="text-[11px] font-bold text-school-800 pt-1">
                {publishedClassesCount} of {classes.length} Classes Published →
              </div>
            </Link>

            {/* Broadsheet Matrix */}
            <Link
              href="/admin/broadsheet"
              className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-400 transition-all space-y-3 group"
            >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-900 flex items-center justify-center font-bold">
                  <FileText className="w-6 h-6" />
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-700 group-hover:translate-x-1 transition-all" />
              </div>
              <h3 className="text-base font-extrabold text-slate-900 group-hover:text-blue-700">
                Master Composite Broadsheet Matrix
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Multi-subject composite class tables, overall averages, ranking, and 1-click Excel export for staff appraisal meetings.
              </p>
              <div className="text-[11px] font-bold text-blue-800 pt-1">
                View &amp; Export Broadsheet →
              </div>
            </Link>

            {/* Batch A4 Print */}
            <Link
              href="/admin/batch-print"
              className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md hover:border-purple-400 transition-all space-y-3 group"
            >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-900 flex items-center justify-center font-bold">
                  <Printer className="w-6 h-6" />
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-purple-700 group-hover:translate-x-1 transition-all" />
              </div>
              <h3 className="text-base font-extrabold text-slate-900 group-hover:text-purple-700">
                Prize-Giving Day Batch Print
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Generate and print all official A4 report cards for an entire class at once, ready for binding and vacation speech day.
              </p>
              <div className="text-[11px] font-bold text-purple-800 pt-1">
                1-Click Batch Printing →
              </div>
            </Link>

            {/* Settings & Profile */}
            <Link
              href="/admin/settings"
              className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-400 transition-all space-y-3 group"
            >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-900 flex items-center justify-center font-bold">
                  <Settings className="w-6 h-6" />
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700 group-hover:translate-x-1 transition-all" />
              </div>
              <h3 className="text-base font-extrabold text-slate-900 group-hover:text-slate-800">
                Calendar &amp; Institutional Settings
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Configure term dates, vacation schedule, tuition fee deadlines, school motto, and official bank accounts.
              </p>
              <div className="text-[11px] font-bold text-slate-800 pt-1">
                Edit School Configuration →
              </div>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function clearedCount(students: Student[]) {
  return students.filter((s) => s.feeStatus === 'CLEARED').length;
}
