'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { IslamicPattern } from '@/components/IslamicPattern';
import {
  getStudents,
  updateStudentFeeStatus,
  getSchoolProfile,
} from '@/lib/storage';
import { Student, FeeStatus } from '@/types';
import { INITIAL_STUDENTS } from '@/lib/mockData';
import { DRAFT_FEES_SCHEDULE, DEFAULT_SCHOOL_PROFILE } from '@/lib/constants';
import {
  DollarSign,
  Search,
  Filter,
  CheckCircle,
  AlertCircle,
  Landmark,
  Save,
  ArrowLeft,
  Users,
} from 'lucide-react';

export default function AdminFeesPage() {
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [profile, setProfile] = useState(DEFAULT_SCHOOL_PROFILE);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    setStudents(getStudents());
    setProfile(getSchoolProfile());
  }, []);

  const handleToggleFeeStatus = (studentId: string, newStatus: FeeStatus) => {
    updateStudentFeeStatus(studentId, newStatus);
    setStudents(getStudents());
    setSuccessMsg(`Pupil fee status updated to ${newStatus}`);
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.fullName.toLowerCase().includes(search.toLowerCase()) ||
      s.admissionNo.toLowerCase().includes(search.toLowerCase()) ||
      s.className.toLowerCase().includes(search.toLowerCase()) ||
      s.parentName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || s.feeStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const clearedCount = students.filter((s) => s.feeStatus === 'CLEARED').length;
  const pendingCount = students.filter((s) => s.feeStatus === 'PENDING').length;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar activePage="admin" />

      {/* Top Banner */}
      <div className="bg-school-900 text-white py-6 px-4 sm:px-6 lg:px-8 border-b border-school-800 relative overflow-hidden">
        <IslamicPattern variant="gold" />
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-xs text-amber-300 font-semibold uppercase tracking-wider mb-1">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              <span>Bursary &amp; Accounts Control</span>
            </div>
            <h1 className="text-2xl font-black tracking-tight">Fee Clearance Gatekeeper &amp; Ledger</h1>
            <p className="text-xs text-slate-300 mt-0.5">
              Control report card access. Uncleared pupils receive polite payment notices with official bank details upon login.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-3 py-1.5 rounded-lg font-bold">
              Cleared: {clearedCount}
            </span>
            <span className="bg-rose-500/20 text-rose-300 border border-rose-400/30 px-3 py-1.5 rounded-lg font-bold">
              Pending: {pendingCount}
            </span>
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
          <Link href="/admin/approvals" className="text-slate-300 hover:text-white transition-colors pb-1 flex-shrink-0">
            Result Approvals
          </Link>
          <Link href="/admin/fees" className="text-white border-b-2 border-amber-400 pb-1 font-bold flex-shrink-0">
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

        {/* Financial Schedule Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase">Creche Fee Schedule</span>
              <div className="text-xl font-black text-school-900 mt-0.5">₦{DRAFT_FEES_SCHEDULE.creche.amount.toLocaleString()}</div>
              <span className="text-[10px] text-slate-500">Per Term tuition</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
              ₦
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase">Nursery 1–3 Schedule</span>
              <div className="text-xl font-black text-school-900 mt-0.5">₦{DRAFT_FEES_SCHEDULE.nursery.amount.toLocaleString()}</div>
              <span className="text-[10px] text-slate-500">Per Term tuition</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
              ₦
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase">Basic 1–6 Schedule</span>
              <div className="text-xl font-black text-school-900 mt-0.5">₦{DRAFT_FEES_SCHEDULE.primary.amount.toLocaleString()}</div>
              <span className="text-[10px] text-slate-500">Per Term tuition</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              ₦
            </div>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search pupil name, admission number, or class..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-school-600 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs font-bold text-slate-500 uppercase">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-bold"
            >
              <option value="ALL">All Pupils</option>
              <option value="CLEARED">Cleared Only</option>
              <option value="PENDING">Pending Only</option>
              <option value="PARTIAL">Partial Only</option>
            </select>
          </div>
        </div>

        {/* Student Fee Roster Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900">
              Pupil Clearance Roster ({filteredStudents.length} Students)
            </h3>
            <span className="text-xs text-slate-500 font-mono">
              Account: {profile.bankDetails.bankName} ({profile.bankDetails.accountNumber})
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-school-900 text-white font-bold text-[11px] uppercase tracking-wider">
                  <th className="p-3">Adm No</th>
                  <th className="p-3">Pupil Full Name</th>
                  <th className="p-3">Class</th>
                  <th className="p-3">Parent Details</th>
                  <th className="p-3">Balance Owed</th>
                  <th className="p-3">Current Status</th>
                  <th className="p-3 text-center">Toggle Clearance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredStudents.map((std) => (
                  <tr key={std.id} className="hover:bg-slate-50/70">
                    <td className="p-3 font-mono font-semibold text-slate-600">{std.admissionNo}</td>
                    <td className="p-3 font-bold text-slate-900">{std.fullName}</td>
                    <td className="p-3 font-semibold text-slate-700">{std.className}</td>
                    <td className="p-3 text-[11px]">
                      <span className="font-semibold text-slate-800 block">{std.parentName}</span>
                      <span className="font-mono text-slate-500">{std.parentPhone}</span>
                    </td>
                    <td className="p-3 font-mono font-bold text-rose-700">
                      {std.amountOwed ? `₦${std.amountOwed.toLocaleString()}` : '₦0'}
                    </td>
                    <td className="p-3">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                          std.feeStatus === 'CLEARED'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : std.feeStatus === 'PARTIAL'
                            ? 'bg-amber-100 text-amber-800 border border-amber-300'
                            : 'bg-rose-100 text-rose-800 border border-rose-300'
                        }`}
                      >
                        {std.feeStatus}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <div className="inline-flex rounded-xl border border-slate-200 bg-white p-0.5 shadow-sm">
                        <button
                          onClick={() => handleToggleFeeStatus(std.id, 'CLEARED')}
                          className={`px-3 py-1 text-[10px] font-bold rounded-lg transition-all ${
                            std.feeStatus === 'CLEARED'
                              ? 'bg-emerald-600 text-white shadow-sm'
                              : 'text-slate-600 hover:text-emerald-700'
                          }`}
                        >
                          Clear
                        </button>
                        <button
                          onClick={() => handleToggleFeeStatus(std.id, 'PENDING')}
                          className={`px-3 py-1 text-[10px] font-bold rounded-lg transition-all ${
                            std.feeStatus === 'PENDING'
                              ? 'bg-rose-600 text-white shadow-sm'
                              : 'text-slate-600 hover:text-rose-700'
                          }`}
                        >
                          Lock (Pending)
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
