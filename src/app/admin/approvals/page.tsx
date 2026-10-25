'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { IslamicPattern } from '@/components/IslamicPattern';
import {
  getClasses,
  getStudents,
  getActiveSession,
  getPublishStatuses,
  updateClassPublishStatus,
} from '@/lib/storage';
import { ClassArm, Student, TermId, ResultStatus } from '@/types';
import { INITIAL_CLASSES, INITIAL_STUDENTS, INITIAL_PUBLISH_STATUSES } from '@/lib/mockData';
import {
  Lock,
  Unlock,
  CheckCircle,
  Clock,
  ShieldCheck,
  FileText,
  AlertTriangle,
} from 'lucide-react';

export default function AdminApprovalsPage() {
  const [classes, setClasses] = useState<ClassArm[]>(INITIAL_CLASSES);
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [publishStatuses, setPublishStatuses] = useState(INITIAL_PUBLISH_STATUSES);
  const [selectedTerm, setSelectedTerm] = useState<TermId>('FIRST');
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const session = getActiveSession();

  useEffect(() => {
    setClasses(getClasses());
    setStudents(getStudents());
    setPublishStatuses(getPublishStatuses());
  }, []);

  const handleUpdateStatus = (classId: string, status: ResultStatus) => {
    updateClassPublishStatus(classId, session.id, selectedTerm, status);
    setPublishStatuses(getPublishStatuses());
    setSuccessMsg(`Status updated to ${status}`);
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar activePage="admin" />

      {/* Top Banner */}
      <div className="bg-school-900 text-white py-6 px-4 sm:px-6 lg:px-8 border-b border-school-800 relative overflow-hidden">
        <IslamicPattern variant="gold" />
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-xs text-amber-300 font-semibold uppercase tracking-wider mb-1">
              <Lock className="w-4 h-4 text-amber-400" />
              <span>Academic Integrity &amp; Publishing</span>
            </div>
            <h1 className="text-2xl font-black tracking-tight">Class Result Approval &amp; Publishing</h1>
            <p className="text-xs text-slate-300 mt-0.5">
              Only classes marked as <strong>PUBLISHED</strong> are visible to cleared parents on their portals.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-school-950/80 px-3 py-1.5 rounded-xl border border-school-700 text-xs">
            <span className="text-slate-400 font-bold uppercase">Term:</span>
            <select
              value={selectedTerm}
              onChange={(e) => setSelectedTerm(e.target.value as TermId)}
              className="bg-transparent text-amber-300 font-bold focus:outline-none"
            >
              <option value="FIRST" className="text-slate-900">1st Term</option>
              <option value="SECOND" className="text-slate-900">2nd Term</option>
              <option value="THIRD" className="text-slate-900">3rd Term</option>
            </select>
          </div>
        </div>

        {/* Sub-Nav */}
        <div className="max-w-7xl mx-auto mt-4 pt-4 border-t border-school-800 flex items-center gap-5 text-xs font-semibold relative z-10 overflow-x-auto">
          <Link href="/admin" className="text-slate-300 hover:text-white transition-colors pb-1 flex-shrink-0">
            Overview
          </Link>
          <Link href="/admin/admissions" className="text-slate-300 hover:text-white transition-colors pb-1 flex-shrink-0">
            Admissions Desk
          </Link>
          <Link href="/admin/approvals" className="text-white border-b-2 border-amber-400 pb-1 font-bold flex-shrink-0">
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

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {successMsg && (
          <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-4 text-xs font-semibold text-emerald-900 flex items-center gap-2 animate-fade-in">
            <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((cls) => {
            const statusRecord = publishStatuses.find(
              (p) => p.classId === cls.id && p.sessionId === session.id && p.termId === selectedTerm
            );
            const currentStatus = statusRecord ? statusRecord.status : 'DRAFT';
            const stdCount = students.filter((s) => s.classId === cls.id).length;

            return (
              <div
                key={cls.id}
                className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all space-y-4"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-extrabold text-base text-slate-900">{cls.name}</h3>
                    <span className="text-xs text-slate-500 font-medium">
                      {cls.section} Section • {stdCount} Pupils
                    </span>
                  </div>
                  <span
                    className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full ${
                      currentStatus === 'PUBLISHED'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : currentStatus === 'SUBMITTED'
                        ? 'bg-amber-100 text-amber-800 border border-amber-300'
                        : currentStatus === 'APPROVED'
                        ? 'bg-blue-100 text-blue-800 border border-blue-300'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {currentStatus}
                  </span>
                </div>

                <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded-2xl space-y-1">
                  <div className="flex justify-between">
                    <span>Session:</span>
                    <strong className="font-mono">{session.name}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Term:</span>
                    <strong className="font-mono">{selectedTerm} Term</strong>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-2">
                  {currentStatus !== 'PUBLISHED' ? (
                    <button
                      onClick={() => handleUpdateStatus(cls.id, 'PUBLISHED')}
                      className="flex-1 py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow transition-all"
                    >
                      Publish Results
                    </button>
                  ) : (
                    <button
                      onClick={() => handleUpdateStatus(cls.id, 'DRAFT')}
                      className="flex-1 py-2 px-3 bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 rounded-xl text-xs font-bold transition-all"
                    >
                      Unpublish / Lock
                    </button>
                  )}

                  <Link
                    href={`/admin/broadsheet?classId=${cls.id}`}
                    className="py-2 px-3 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-semibold"
                  >
                    Broadsheet
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
