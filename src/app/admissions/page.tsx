'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { IslamicPattern } from '@/components/IslamicPattern';
import { SchoolLogo } from '@/components/SchoolLogo';
import { submitAdmissionApplication } from '@/lib/storage';
import { AdmissionApplication } from '@/types';
import { DRAFT_FEES_SCHEDULE } from '@/lib/constants';
import {
  GraduationCap,
  CheckCircle2,
  Printer,
  Calendar,
  Phone,
  MapPin,
  Clock,
  Sparkles,
  FileText,
  User,
  HeartHandshake,
} from 'lucide-react';

export default function AdmissionsPage() {
  const [submittedApp, setSubmittedApp] = useState<AdmissionApplication | null>(null);

  // Form State
  const [childFullName, setChildFullName] = useState('');
  const [gender, setGender] = useState<'Male' | 'Female'>('Male');
  const [dob, setDob] = useState('');
  const [classApplyingFor, setClassApplyingFor] = useState('Nursery 1');
  const [parentFullName, setParentFullName] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [parentEmail, setParentEmail] = useState('');
  const [residentialAddress, setResidentialAddress] = useState('');
  const [previousSchool, setPreviousSchool] = useState('');
  const [medicalNotes, setMedicalNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const referenceNo = `AMA-ADM-2026-${randomSuffix}`;
    const id = `adm-${Date.now()}`;
    const submittedAt = new Date().toISOString().split('T')[0];

    const newApp: AdmissionApplication = {
      id,
      referenceNo,
      childFullName,
      gender,
      dob,
      classApplyingFor,
      parentFullName,
      parentPhone,
      parentEmail,
      residentialAddress,
      previousSchool,
      medicalNotes,
      status: 'SUBMITTED',
      submittedAt,
    };

    submitAdmissionApplication(newApp);
    setSubmittedApp(newApp);
  };

  const handlePrintSlip = () => {
    window.print();
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar activePage="admissions" />

      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-school-900 via-school-800 to-school-950 text-white py-16 px-4 sm:px-6 lg:px-8 no-print">
        <IslamicPattern variant="gold" />
        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-school-700/60 border border-amber-400/30 text-amber-300 text-xs font-semibold">
            <span className="font-arabic text-sm">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</span>
            <span>•</span>
            <span>Admissions 2024 / 2025 &amp; 2025 / 2026</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight uppercase">
            Enroll Your Child at AL-Amaanah
          </h1>
          <p className="text-sm sm:text-base text-amber-300 font-bold uppercase tracking-widest">
            Creche • Nursery 1 – 3 • Basic 1 – 6
          </p>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Begin your child&apos;s journey of foundational Western academic brilliance and authentic Quranic Tahfeez in Ado-Ekiti. Complete the online admission application below.
          </p>
        </div>
      </section>

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {submittedApp ? (
          /* SUCCESS SLIP VIEW (PRINTABLE) */
          <div className="space-y-6">
            <div className="no-print bg-emerald-50 border border-emerald-300 rounded-2xl p-6 text-center text-emerald-950 space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h2 className="text-xl font-extrabold text-emerald-900">Application Submitted Successfully!</h2>
              <p className="text-xs text-emerald-800">
                Your admission application has been registered with the School Admissions Office. Please print or save the official application slip below for the entrance assessment.
              </p>
              <div className="pt-2">
                <button
                  onClick={handlePrintSlip}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-school-800 hover:bg-school-900 text-white rounded-xl text-xs font-bold shadow transition-all"
                >
                  <Printer className="w-4 h-4" />
                  Print Official Application Slip
                </button>
              </div>
            </div>

            {/* Official Application Slip */}
            <div className="report-card-container bg-white border-2 border-school-900 rounded-2xl p-8 shadow-xl space-y-6 relative overflow-hidden font-sans">
              <IslamicPattern variant="subtle" />

              <div className="border-b-2 border-school-900 pb-4 text-center relative z-10">
                <div className="flex justify-center mb-2">
                  <SchoolLogo size={70} variant="print" />
                </div>
                <h2 className="text-xl font-black text-school-900 uppercase">
                  AL-AMAANAH NURSERY &amp; PRIMARY SCHOOL
                </h2>
                <p className="text-xs font-bold text-amber-800 uppercase tracking-widest">
                  Knowledge and Piety (Al-’Ilm wat-Taqwa)
                </p>
                <p className="text-[11px] text-slate-600">
                  64 Falana Street, Ado - Ikere Road, Ado Ekiti, Ekiti State • Tel: +234 706 538 3463, 0816 175 1723
                </p>
                <div className="inline-block bg-school-900 text-white text-xs font-extrabold px-4 py-1 rounded-full uppercase tracking-wider mt-3">
                  Official Provisional Admission Application Slip
                </div>
              </div>

              {/* Reference Banner */}
              <div className="bg-school-50 border border-school-200 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Application Tracking Reference</span>
                  <span className="font-mono font-black text-base text-school-900">{submittedApp.referenceNo}</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Submission Date</span>
                  <span className="font-bold text-slate-800">{submittedApp.submittedAt}</span>
                </div>
              </div>

              {/* Child & Parent Details Grid */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="border border-slate-200 rounded-xl p-4 space-y-2 bg-slate-50/50">
                  <h4 className="font-bold text-school-900 uppercase text-[11px] border-b border-slate-200 pb-1">
                    Child Bio-Data
                  </h4>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Full Name:</span>
                    <span className="font-bold text-slate-900">{submittedApp.childFullName}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-slate-500 block text-[10px]">Gender:</span>
                      <span className="font-semibold text-slate-800">{submittedApp.gender}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">Date of Birth:</span>
                      <span className="font-semibold text-slate-800">{submittedApp.dob}</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Class Applied For:</span>
                    <span className="font-bold text-school-800">{submittedApp.classApplyingFor}</span>
                  </div>
                </div>

                <div className="border border-slate-200 rounded-xl p-4 space-y-2 bg-slate-50/50">
                  <h4 className="font-bold text-school-900 uppercase text-[11px] border-b border-slate-200 pb-1">
                    Parent / Guardian Contact
                  </h4>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Parent Name:</span>
                    <span className="font-bold text-slate-900">{submittedApp.parentFullName}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Telephone:</span>
                    <span className="font-mono font-bold text-slate-800">{submittedApp.parentPhone}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Residential Address:</span>
                    <span className="font-medium text-slate-800 text-[11px]">{submittedApp.residentialAddress}</span>
                  </div>
                </div>
              </div>

              {/* Instructions for Assessment */}
              <div className="border border-amber-300 bg-amber-50/60 rounded-xl p-4 text-xs text-amber-950 space-y-2">
                <h4 className="font-bold uppercase text-[11px] flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-700" />
                  Next Steps: Entrance Screening &amp; Assessment
                </h4>
                <p className="leading-relaxed">
                  Please bring this slip along with <strong>2 passport photographs</strong> and the child&apos;s <strong>birth certificate</strong> to AL-Amaanah School premises at <strong>64 Falana Street, Ado - Ikere Road, Ado Ekiti</strong> for the diagnostic placement interview (Mondays to Fridays, 8:00 AM – 2:00 PM).
                </p>
              </div>

              <div className="border-t border-slate-300 pt-4 flex justify-between items-center text-xs text-slate-500">
                <span>Directorate of Admissions • Mrs. Anat Sobulo</span>
                <span className="italic">School Stamp Placeholder</span>
              </div>
            </div>

            <div className="text-center pt-4 no-print">
              <button
                onClick={() => setSubmittedApp(null)}
                className="text-xs text-school-800 hover:underline font-semibold"
              >
                ← Submit another application
              </button>
            </div>
          </div>
        ) : (
          /* APPLICATION FORM */
          <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-8 sm:p-10 space-y-8">
            <div className="border-b border-slate-200 pb-4">
              <h2 className="text-2xl font-black text-school-950 tracking-tight">
                Online Admission Application Form
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Please complete all fields carefully. The Admissions Office reviews all applications within 24–48 hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* SECTION 1: CHILD DETAILS */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-school-900 font-bold text-sm">
                  <User className="w-4 h-4 text-school-700" />
                  <span>Section 1: Child&apos;s Information</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="sm:col-span-2">
                    <label className="block text-slate-700 font-bold mb-1">
                      Child&apos;s Full Name (Surname First) *
                    </label>
                    <input
                      type="text"
                      required
                      value={childFullName}
                      onChange={(e) => setChildFullName(e.target.value)}
                      placeholder="e.g. Adeleke Zayd Abdul-Rahman"
                      className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-school-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Gender *</label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value as 'Male' | 'Female')}
                      className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl bg-slate-50 font-medium"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Date of Birth *</label>
                    <input
                      type="date"
                      required
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl bg-slate-50 font-medium"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-slate-700 font-bold mb-1">Class Applying For *</label>
                    <select
                      value={classApplyingFor}
                      onChange={(e) => setClassApplyingFor(e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl bg-slate-50 font-bold text-school-900"
                    >
                      <optgroup label="Early Years">
                        <option value="Creche / Playgroup">Creche / Playgroup (6 months – 2 years)</option>
                        <option value="Nursery 1">Nursery 1 (3 years)</option>
                        <option value="Nursery 2">Nursery 2 (4 years)</option>
                        <option value="Nursery 3">Nursery 3 (5 years)</option>
                      </optgroup>
                      <optgroup label="Primary School">
                        <option value="Basic 1">Basic 1 (Primary 1)</option>
                        <option value="Basic 2">Basic 2 (Primary 2)</option>
                        <option value="Basic 3">Basic 3 (Primary 3)</option>
                        <option value="Basic 4">Basic 4 (Primary 4)</option>
                        <option value="Basic 5">Basic 5 (Primary 5)</option>
                        <option value="Basic 6">Basic 6 (Primary 6)</option>
                      </optgroup>
                    </select>
                  </div>
                </div>
              </div>

              {/* SECTION 2: PARENT DETAILS */}
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <div className="flex items-center gap-2 text-school-900 font-bold text-sm">
                  <HeartHandshake className="w-4 h-4 text-school-700" />
                  <span>Section 2: Parent / Guardian Details</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Parent / Guardian Full Name *</label>
                    <input
                      type="text"
                      required
                      value={parentFullName}
                      onChange={(e) => setParentFullName(e.target.value)}
                      placeholder="e.g. Alhaji Ibrahim Adeleke"
                      className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-school-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Active Telephone Number *</label>
                    <input
                      type="tel"
                      required
                      value={parentPhone}
                      onChange={(e) => setParentPhone(e.target.value)}
                      placeholder="e.g. 0803 123 4567"
                      className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl font-mono focus:ring-2 focus:ring-school-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Email Address</label>
                    <input
                      type="email"
                      value={parentEmail}
                      onChange={(e) => setParentEmail(e.target.value)}
                      placeholder="e.g. parent@example.com"
                      className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-school-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Residential Address in Ado-Ekiti *</label>
                    <input
                      type="text"
                      required
                      value={residentialAddress}
                      onChange={(e) => setResidentialAddress(e.target.value)}
                      placeholder="e.g. Behind Housing Estate, Ado-Ekiti"
                      className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-school-600 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 3: ACADEMIC & HEALTH BACKGROUND */}
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <div className="flex items-center gap-2 text-school-900 font-bold text-sm">
                  <FileText className="w-4 h-4 text-school-700" />
                  <span>Section 3: Academic Background &amp; Health</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Previous School Attended (If Any)</label>
                    <input
                      type="text"
                      value={previousSchool}
                      onChange={(e) => setPreviousSchool(e.target.value)}
                      placeholder="e.g. Al-Furqan Nursery School, Ado-Ekiti"
                      className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Special Medical Notes or Allergies</label>
                    <input
                      type="text"
                      value={medicalNotes}
                      onChange={(e) => setMedicalNotes(e.target.value)}
                      placeholder="e.g. None / Asthma inhaler required"
                      className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-[11px] text-slate-500">
                  By submitting, you affirm that the information provided is correct and verifiable.
                </p>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 bg-school-800 hover:bg-school-900 text-white rounded-xl text-xs sm:text-sm font-bold shadow-lg transition-all active:scale-95"
                >
                  Submit Application &amp; Generate Slip
                </button>
              </div>
            </form>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
