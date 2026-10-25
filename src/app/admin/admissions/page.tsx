'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { IslamicPattern } from '@/components/IslamicPattern';
import {
  getAdmissionApplications,
  updateAdmissionStatus,
} from '@/lib/storage';
import { AdmissionApplication, AdmissionStatus } from '@/types';
import {
  ShieldCheck,
  UserCheck,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Printer,
  FileText,
  Calendar,
  Phone,
  User,
  X,
  Sparkles,
} from 'lucide-react';

export default function AdminAdmissionsPage() {
  const [applications, setApplications] = useState<AdmissionApplication[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [selectedApp, setSelectedApp] = useState<AdmissionApplication | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    setApplications(getAdmissionApplications());
  }, []);

  const handleUpdateStatus = (appId: string, status: AdmissionStatus) => {
    updateAdmissionStatus(appId, status, 'Mrs. Anat Sobulo');
    setApplications(getAdmissionApplications());
    if (selectedApp && selectedApp.id === appId) {
      setSelectedApp({ ...selectedApp, status });
    }
    setSuccessMsg(`Application status updated to ${status}`);
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  const filteredApps = applications.filter((app) => {
    const matchesSearch =
      app.childFullName.toLowerCase().includes(search.toLowerCase()) ||
      app.referenceNo.toLowerCase().includes(search.toLowerCase()) ||
      app.parentFullName.toLowerCase().includes(search.toLowerCase()) ||
      app.classApplyingFor.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar activePage="admin" />

      {/* Top Banner */}
      <div className="bg-school-900 text-white py-6 px-4 sm:px-6 lg:px-8 border-b border-school-800 relative overflow-hidden">
        <IslamicPattern variant="gold" />
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-xs text-amber-300 font-semibold uppercase tracking-wider mb-1">
              <UserCheck className="w-4 h-4" />
              <span>Executive Admissions Desk</span>
            </div>
            <h1 className="text-2xl font-black tracking-tight">Prospective Student Admissions Queue</h1>
            <p className="text-xs text-slate-300 mt-0.5">
              Review and process applications submitted via the public admissions portal (/admissions)
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs bg-amber-500/20 text-amber-300 border border-amber-400/30 px-3 py-1.5 rounded-lg font-mono">
            <span>Total In Queue: {applications.length}</span>
          </div>
        </div>

        {/* Sub-Nav */}
        <div className="max-w-7xl mx-auto mt-4 pt-4 border-t border-school-800 flex items-center gap-5 text-xs font-semibold relative z-10 overflow-x-auto">
          <Link href="/admin" className="text-slate-300 hover:text-white transition-colors pb-1 flex-shrink-0">
            Overview
          </Link>
          <Link href="/admin/admissions" className="text-white border-b-2 border-amber-400 pb-1 font-bold flex-shrink-0">
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

        {/* Toolbar & Filters */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search by candidate name, ref no, or parent..."
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
              <option value="ALL">All Applications</option>
              <option value="SUBMITTED">Submitted (New)</option>
              <option value="UNDER_REVIEW">Under Review</option>
              <option value="APPROVED">Approved for Test</option>
              <option value="ADMITTED">Admitted</option>
              <option value="DECLINED">Declined</option>
            </select>
          </div>
        </div>

        {/* Applications Queue Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900">
              Registered Applications ({filteredApps.length})
            </h3>
            <span className="text-xs text-slate-500">Processed by Headteacher Mrs. Anat Sobulo</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-school-900 text-white font-bold text-[11px] uppercase tracking-wider">
                  <th className="p-3">Ref No</th>
                  <th className="p-3">Candidate Full Name</th>
                  <th className="p-3">Class Requested</th>
                  <th className="p-3">Parent Details</th>
                  <th className="p-3">Date Applied</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredApps.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50/70">
                    <td className="p-3 font-mono font-bold text-school-800">{app.referenceNo}</td>
                    <td className="p-3">
                      <span className="font-bold text-slate-900 block">{app.childFullName}</span>
                      <span className="text-[11px] text-slate-500">{app.gender} • DOB: {app.dob}</span>
                    </td>
                    <td className="p-3 font-semibold text-slate-800">{app.classApplyingFor}</td>
                    <td className="p-3">
                      <span className="font-medium text-slate-900 block">{app.parentFullName}</span>
                      <span className="font-mono text-[11px] text-slate-500">{app.parentPhone}</span>
                    </td>
                    <td className="p-3 text-slate-600 font-medium">{app.submittedAt}</td>
                    <td className="p-3">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                          app.status === 'APPROVED'
                            ? 'bg-blue-100 text-blue-800 border border-blue-300'
                            : app.status === 'ADMITTED'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : app.status === 'UNDER_REVIEW'
                            ? 'bg-amber-100 text-amber-800 border border-amber-300'
                            : app.status === 'DECLINED'
                            ? 'bg-rose-100 text-rose-800 border border-rose-300'
                            : 'bg-slate-100 text-slate-800 border border-slate-300'
                        }`}
                      >
                        {app.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => setSelectedApp(app)}
                        className="px-3 py-1.5 bg-school-800 hover:bg-school-900 text-white rounded-lg text-xs font-semibold shadow-sm transition-all"
                      >
                        Review
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* APPLICATION REVIEW MODAL */}
      {selectedApp && (
        <div className="fixed inset-0 bg-school-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-6 animate-scale-in">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <span className="font-mono text-xs text-amber-700 font-bold block">{selectedApp.referenceNo}</span>
                <h3 className="font-black text-lg text-slate-900">
                  {selectedApp.childFullName} — Admission Review
                </h3>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="text-slate-400 font-bold uppercase text-[10px] block">Candidate Bio</span>
                <p><strong>Gender:</strong> {selectedApp.gender}</p>
                <p><strong>Date of Birth:</strong> {selectedApp.dob}</p>
                <p><strong>Class Requested:</strong> <span className="font-bold text-school-900">{selectedApp.classApplyingFor}</span></p>
                <p><strong>Previous School:</strong> {selectedApp.previousSchool || 'None'}</p>
                <p><strong>Medical Notes:</strong> {selectedApp.medicalNotes || 'None'}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="text-slate-400 font-bold uppercase text-[10px] block">Parent Contact</span>
                <p><strong>Full Name:</strong> {selectedApp.parentFullName}</p>
                <p><strong>Telephone:</strong> <span className="font-mono">{selectedApp.parentPhone}</span></p>
                <p><strong>Email:</strong> {selectedApp.parentEmail || 'N/A'}</p>
                <p><strong>Address:</strong> {selectedApp.residentialAddress}</p>
                <p><strong>Submitted On:</strong> {selectedApp.submittedAt}</p>
              </div>
            </div>

            {/* Status Change Buttons */}
            <div className="space-y-2 border-t border-slate-200 pt-4">
              <span className="text-xs font-bold text-slate-600 block uppercase">
                Admissions Board Decision (Mrs. Anat Sobulo):
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleUpdateStatus(selectedApp.id, 'APPROVED')}
                  className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow transition-all"
                >
                  Approve for Entrance Screening
                </button>
                <button
                  onClick={() => handleUpdateStatus(selectedApp.id, 'ADMITTED')}
                  className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow transition-all"
                >
                  Admit Pupil to {selectedApp.classApplyingFor}
                </button>
                <button
                  onClick={() => handleUpdateStatus(selectedApp.id, 'UNDER_REVIEW')}
                  className="px-3 py-2 bg-amber-500 hover:bg-amber-600 text-school-950 rounded-xl text-xs font-bold shadow transition-all"
                >
                  Mark Under Review
                </button>
                <button
                  onClick={() => handleUpdateStatus(selectedApp.id, 'DECLINED')}
                  className="px-3 py-2 bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 rounded-xl text-xs font-semibold transition-all"
                >
                  Decline
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
