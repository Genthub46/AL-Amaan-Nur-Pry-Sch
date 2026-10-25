'use client';

import React, { useState } from 'react';
import { Student, SchoolProfile } from '@/types';
import { AlertCircle, Landmark, Upload, Phone, CheckCircle, ShieldAlert } from 'lucide-react';

interface FeeNoticeModalProps {
  student: Student;
  profile: SchoolProfile;
  onClearDemo?: () => void;
}

export const FeeNoticeModal: React.FC<FeeNoticeModalProps> = ({
  student,
  profile,
  onClearDemo,
}) => {
  const [reference, setReference] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitProof = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reference) return;
    setSubmitted(true);
  };

  return (
    <div className="bg-white border-2 border-amber-300 rounded-2xl shadow-xl overflow-hidden max-w-2xl mx-auto my-8">
      {/* Top Banner */}
      <div className="bg-amber-500 text-white px-6 py-4 flex items-center gap-3">
        <ShieldAlert className="w-7 h-7 flex-shrink-0" />
        <div>
          <h3 className="font-bold text-base">Term Fee Clearance Required</h3>
          <p className="text-xs text-amber-100">
            Terminal result access for {student.fullName} is awaiting financial clearance.
          </p>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Notice Explanation */}
        <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 text-xs text-amber-900 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold text-sm">Dear Esteemed Parent / Guardian,</p>
            <p className="leading-relaxed">
              We appreciate your partnership in nurturing <span className="font-bold">{student.fullName}</span> ({student.className}). In accordance with the school&apos;s financial policies, access to the comprehensive terminal report card and academic broadsheet requires fee clearance.
            </p>
            {student.amountOwed && (
              <p className="font-bold text-rose-700 pt-1 text-sm">
                Outstanding Balance: ₦{student.amountOwed.toLocaleString()}
              </p>
            )}
          </div>
        </div>

        {/* Official Bank Account Details */}
        <div className="border border-slate-200 rounded-xl p-5 bg-slate-50/80 space-y-3">
          <div className="flex items-center gap-2 text-school-900 font-bold text-sm">
            <Landmark className="w-4 h-4 text-school-700" />
            <span>AL-Amaanah Official Payment Accounts</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="bg-white p-3 rounded-lg border border-slate-200">
              <span className="text-slate-500 block text-[10px] uppercase">Bank Name</span>
              <span className="font-bold text-slate-800">{profile.bankDetails.bankName}</span>
            </div>
            <div className="bg-white p-3 rounded-lg border border-slate-200">
              <span className="text-slate-500 block text-[10px] uppercase">Account Number</span>
              <span className="font-mono font-bold text-school-700 text-sm tracking-wider">
                {profile.bankDetails.accountNumber}
              </span>
            </div>
            <div className="bg-white p-3 rounded-lg border border-slate-200">
              <span className="text-slate-500 block text-[10px] uppercase">Account Name</span>
              <span className="font-semibold text-slate-800 text-[11px] leading-tight">
                {profile.bankDetails.accountName}
              </span>
            </div>
          </div>
        </div>

        {/* Proof of Payment Submission */}
        {submitted ? (
          <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-4 text-center text-xs text-emerald-900 flex items-center justify-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
            <span>
              Thank you! Your payment reference <strong className="font-mono">{reference}</strong> has been logged. The School Bursar is verifying your transaction.
            </span>
          </div>
        ) : (
          <form onSubmit={handleSubmitProof} className="space-y-3">
            <label className="block text-xs font-semibold text-slate-700">
              Already made a bank transfer? Enter Bank Reference / Teller No:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                placeholder="e.g. TRF/GTB/20241214/001928"
                required
                className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-school-600"
              />
              <button
                type="submit"
                className="flex items-center gap-1.5 px-4 py-2 bg-school-800 hover:bg-school-900 text-white rounded-lg text-xs font-semibold transition-all shadow"
              >
                <Upload className="w-3.5 h-3.5" />
                Notify Bursar
              </button>
            </div>
          </form>
        )}

        {/* Help & Contact Options */}
        <div className="border-t border-slate-200 pt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-600 gap-3">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-emerald-600" />
            <span>School Bursary Direct Line: <strong>{profile.phone1}</strong></span>
          </div>

          {/* Quick Demo Bypass for Testing */}
          {onClearDemo && (
            <button
              onClick={onClearDemo}
              className="text-[11px] text-school-700 hover:text-school-900 underline font-medium"
            >
              (Demo: Instant Clear Fee Status)
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
