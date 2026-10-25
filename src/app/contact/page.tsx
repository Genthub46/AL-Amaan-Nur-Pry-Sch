'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { IslamicPattern } from '@/components/IslamicPattern';
import { DRAFT_FEES_SCHEDULE } from '@/lib/constants';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Landmark,
  Award,
  Send,
  CheckCircle2,
} from 'lucide-react';

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar activePage="contact" />

      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-school-900 via-school-800 to-school-950 text-white py-16 px-4 sm:px-6 lg:px-8">
        <IslamicPattern variant="gold" />
        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-school-700/60 border border-amber-400/30 text-amber-300 text-xs font-semibold">
            <span className="font-arabic text-sm">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</span>
            <span>•</span>
            <span>Campus Location &amp; Bursary</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight uppercase">
            Contact &amp; Visit AL-Amaanah
          </h1>
          <p className="text-sm sm:text-base text-amber-300 font-bold uppercase tracking-widest">
            64 Falana Street, Ado - Ikere Road, Ado Ekiti
          </p>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            We are always delighted to welcome prospective parents and guardians to our serene campus for school tours, fee inquiries, and pupil admissions.
          </p>
        </div>
      </section>

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">
        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900">Campus Address</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              64 Falana Street, Ado - Ikere Road, Ado Ekiti, Ekiti State, Nigeria.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <Phone className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900">Telephone Lines</h3>
            <p className="text-xs text-slate-600 font-mono leading-relaxed">
              +234 706 538 3463 <br />
              0816 175 1723
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900">Opening Hours</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Monday to Friday: <br />
              <strong>7:30 AM – 3:00 PM</strong>
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900">Email Inquiries</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              admin@al-amaanahschool.edu.ng <br />
              bursary@al-amaanahschool.edu.ng
            </p>
          </div>
        </div>

        {/* Fees Schedule & Official Bank Accounts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Draft Fees Structure */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
            <div>
              <span className="text-xs font-bold text-school-800 bg-school-50 px-3 py-1 rounded-full uppercase tracking-wider">
                Financial Schedule
              </span>
              <h3 className="text-xl font-black text-school-950 mt-2">
                Draft Termly Tuition &amp; Levies
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Affordable, high-value primary education in Ado-Ekiti.
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{DRAFT_FEES_SCHEDULE.creche.name}</h4>
                  <span className="text-xs text-slate-500">Daycare &amp; early childhood grooming</span>
                </div>
                <div className="text-right">
                  <span className="text-base font-black text-school-900">₦{DRAFT_FEES_SCHEDULE.creche.amount.toLocaleString()}</span>
                  <span className="text-[10px] text-slate-400 block font-medium">/ Term</span>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{DRAFT_FEES_SCHEDULE.nursery.name}</h4>
                  <span className="text-xs text-slate-500">Synthetic Phonics, Numbers &amp; Tahfeez</span>
                </div>
                <div className="text-right">
                  <span className="text-base font-black text-school-900">₦{DRAFT_FEES_SCHEDULE.nursery.amount.toLocaleString()}</span>
                  <span className="text-[10px] text-slate-400 block font-medium">/ Term</span>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{DRAFT_FEES_SCHEDULE.primary.name}</h4>
                  <span className="text-xs text-slate-500">Integrated Western &amp; Quranic curriculum</span>
                </div>
                <div className="text-right">
                  <span className="text-base font-black text-school-900">₦{DRAFT_FEES_SCHEDULE.primary.amount.toLocaleString()}</span>
                  <span className="text-[10px] text-slate-400 block font-medium">/ Term</span>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 italic">
              * Note: Uniforms, books, and Islamic Hijab/Cap kits are billed separately upon admission.
            </p>
          </div>

          {/* Official Bank Account & Inquiry Form */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-school-900 to-school-950 text-white rounded-3xl p-8 shadow-md space-y-4 relative overflow-hidden">
              <IslamicPattern variant="gold" />
              <div className="relative z-10 space-y-3">
                <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
                  <Landmark className="w-5 h-5" />
                  <span>Official School Tuition Account</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  All fee payments, registration levies, and donations should be paid directly into the school&apos;s designated account:
                </p>

                <div className="bg-white/10 rounded-2xl p-4 space-y-2 border border-white/10 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-300">Bank Name:</span>
                    <span className="font-bold text-white">Jaiz Bank / First Bank</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Account Number:</span>
                    <span className="font-mono text-base font-black text-amber-300 tracking-wider">0012345678</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Account Name:</span>
                    <span className="font-bold text-white text-right">Al-Amaanah Nur &amp; Pry School</span>
                  </div>
                </div>

                <p className="text-[11px] text-amber-200/90 pt-1">
                  * Forward bank transfer evidence to the Bursar via WhatsApp or phone (+234 706 538 3463).
                </p>
              </div>
            </div>

            {/* Quick Inquiry Form */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-sm text-slate-900">Send an Inquiry to the School Office</h3>
              {sent ? (
                <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-4 text-xs text-emerald-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Thank you! Your message has been delivered to Mrs. Anat Sobulo&apos;s office. We will call you shortly.</span>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                  <div>
                    <label className="block text-slate-600 font-medium mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Alhaji Babatunde"
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-medium mb-1">Telephone Number *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 0803 123 4567"
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-medium mb-1">Message or Question</label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Inquiring about Nursery 2 admissions..."
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-school-800 hover:bg-school-900 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
