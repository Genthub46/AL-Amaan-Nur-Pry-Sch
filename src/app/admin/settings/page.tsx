'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { IslamicPattern } from '@/components/IslamicPattern';
import {
  getActiveSession,
  getSchoolProfile,
  updateSchoolProfile,
  updateSession,
} from '@/lib/storage';
import { SchoolProfile, AcademicSession, TermId } from '@/types';
import { DEFAULT_SCHOOL_PROFILE } from '@/lib/constants';
import { INITIAL_SESSIONS } from '@/lib/mockData';
import {
  Calendar,
  Save,
  CheckCircle,
  Building,
  Landmark,
  Clock,
  Sparkles,
} from 'lucide-react';

export default function AdminSettingsPage() {
  const [profile, setProfile] = useState<SchoolProfile>(DEFAULT_SCHOOL_PROFILE);
  const [session, setSession] = useState<AcademicSession>(INITIAL_SESSIONS[0]);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    setProfile(getSchoolProfile());
    setSession(getActiveSession());
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSession(session);
    updateSchoolProfile(profile);
    setSuccessMsg('Session calendar, term dates, and institutional profile saved successfully!');
    setTimeout(() => setSuccessMsg(null), 3500);
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
              <Calendar className="w-4 h-4" />
              <span>Institutional Settings</span>
            </div>
            <h1 className="text-2xl font-black tracking-tight">Academic Calendar &amp; School Profile</h1>
            <p className="text-xs text-slate-300 mt-0.5">
              Configure term resumption dates, vacation schedule, tuition deadlines, and institutional leadership credentials
            </p>
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
          <Link href="/admin/fees" className="text-slate-300 hover:text-white transition-colors pb-1 flex-shrink-0">
            Fee Clearance Gate
          </Link>
          <Link href="/admin/broadsheet" className="text-slate-300 hover:text-white transition-colors pb-1 flex-shrink-0">
            Broadsheet Matrix
          </Link>
          <Link href="/admin/batch-print" className="text-slate-300 hover:text-white transition-colors pb-1 flex-shrink-0">
            Batch A4 Print
          </Link>
          <Link href="/admin/settings" className="text-white border-b-2 border-amber-400 pb-1 font-bold flex-shrink-0">
            Settings &amp; Profile
          </Link>
        </div>
      </div>

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {successMsg && (
          <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-4 text-xs font-semibold text-emerald-900 flex items-center gap-2 animate-fade-in">
            <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          {/* Section 1: Term Dates & Session */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-5">
            <div className="flex items-center gap-2 text-school-900 font-bold text-sm border-b border-slate-100 pb-3">
              <Calendar className="w-4 h-4 text-school-700" />
              <span>Section 1: Academic Session &amp; Term Dates</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Academic Session Name *</label>
                <input
                  type="text"
                  required
                  value={session.name}
                  onChange={(e) => setSession({ ...session, name: e.target.value })}
                  placeholder="e.g. 2024/2025"
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl font-mono font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Active Term *</label>
                <select
                  value={session.activeTerm}
                  onChange={(e) => setSession({ ...session, activeTerm: e.target.value as TermId })}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl font-bold bg-slate-50"
                >
                  <option value="FIRST">First Term</option>
                  <option value="SECOND">Second Term</option>
                  <option value="THIRD">Third Term (Promotional)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Term Vacation Date *</label>
                <input
                  type="text"
                  required
                  value={session.vacationDate}
                  onChange={(e) => setSession({ ...session, vacationDate: e.target.value })}
                  placeholder="e.g. December 13, 2024"
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Next Term Resumption Date *</label>
                <input
                  type="text"
                  required
                  value={session.nextTermResumptionDate}
                  onChange={(e) => setSession({ ...session, nextTermResumptionDate: e.target.value })}
                  placeholder="e.g. January 13, 2025"
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl font-bold text-school-900"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Next Term Fees Deadline *</label>
                <input
                  type="text"
                  required
                  value={session.feesDeadline}
                  onChange={(e) => setSession({ ...session, feesDeadline: e.target.value })}
                  placeholder="e.g. January 20, 2025"
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl font-bold text-rose-700"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Institutional Leadership & Identity */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-5">
            <div className="flex items-center gap-2 text-school-900 font-bold text-sm border-b border-slate-100 pb-3">
              <Building className="w-4 h-4 text-school-700" />
              <span>Section 2: Institutional Leadership &amp; Contacts</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Proprietor Name</label>
                <input
                  type="text"
                  value={profile.proprietorName}
                  onChange={(e) => setProfile({ ...profile, proprietorName: e.target.value })}
                  placeholder="Mr. Olanipekun Abdul-Hakeem"
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl font-semibold"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Headteacher / Head of School</label>
                <input
                  type="text"
                  value={profile.headTeacherName}
                  onChange={(e) => setProfile({ ...profile, headTeacherName: e.target.value })}
                  placeholder="Mrs. Anat Sobulo"
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl font-semibold"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">School Motto</label>
                <input
                  type="text"
                  value={profile.motto}
                  onChange={(e) => setProfile({ ...profile, motto: e.target.value })}
                  placeholder="Knowledge and Piety (Al-’Ilm wat-Taqwa)"
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Campus Address</label>
                <input
                  type="text"
                  value={profile.address}
                  onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                  placeholder="64 Falana Street, Ado - Ikere Road"
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Phone Line 1</label>
                <input
                  type="tel"
                  value={profile.phone1}
                  onChange={(e) => setProfile({ ...profile, phone1: e.target.value })}
                  placeholder="+234 706 538 3463"
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Phone Line 2</label>
                <input
                  type="tel"
                  value={profile.phone2}
                  onChange={(e) => setProfile({ ...profile, phone2: e.target.value })}
                  placeholder="0816 175 1723"
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl font-mono"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Official Bank Account */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-5">
            <div className="flex items-center gap-2 text-school-900 font-bold text-sm border-b border-slate-100 pb-3">
              <Landmark className="w-4 h-4 text-school-700" />
              <span>Section 3: Official Tuition Payment Account</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Bank Name</label>
                <input
                  type="text"
                  value={profile.bankDetails.bankName}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      bankDetails: { ...profile.bankDetails, bankName: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Account Number</label>
                <input
                  type="text"
                  value={profile.bankDetails.accountNumber}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      bankDetails: { ...profile.bankDetails, accountNumber: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl font-mono font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Account Name</label>
                <input
                  type="text"
                  value={profile.bankDetails.accountName}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      bankDetails: { ...profile.bankDetails, accountName: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-8 py-3.5 bg-school-800 hover:bg-school-900 text-white rounded-xl text-xs font-bold shadow-lg transition-all flex items-center gap-2 active:scale-95"
            >
              <Save className="w-4 h-4" />
              Save All Institutional Settings
            </button>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}
