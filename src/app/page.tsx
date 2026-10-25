'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SchoolLogo } from '@/components/SchoolLogo';
import { IslamicPattern } from '@/components/IslamicPattern';
import {
  BookOpen,
  Award,
  GraduationCap,
  ShieldCheck,
  CheckCircle,
  Calendar,
  Sparkles,
  ArrowRight,
  HeartHandshake,
  Star,
  Users,
  Compass,
  MapPin,
  Phone,
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar activePage="home" />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-school-900 via-school-800 to-school-950 text-white pt-16 pb-24 px-4 sm:px-6 lg:px-8">
        {/* Subtle Islamic Geometric Pattern */}
        <IslamicPattern variant="gold" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col items-center text-center space-y-6 max-w-4xl mx-auto">
            {/* Top Islamic Banner */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-school-700/60 border border-amber-400/30 text-amber-300 text-xs sm:text-sm font-medium">
              <span className="font-arabic text-base">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</span>
              <span className="text-white">•</span>
              <span>Ado - Ikere Road, Ado-Ekiti</span>
            </div>

            {/* School Crest Centerpiece */}
            <div className="pt-2">
              <SchoolLogo size={96} variant="dark" />
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight uppercase">
              AL-AMAANAH <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-white to-amber-200">
                Nursery &amp; Primary School
              </span>
            </h1>

            <p className="text-sm sm:text-base text-amber-300 font-bold uppercase tracking-widest">
              Knowledge and Piety • Al-’Ilm wat-Taqwa
            </p>

            <p className="text-sm sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              64 Falana Street, Ado - Ikere Road, Ado Ekiti. Private nursery and primary education integrating sound Islamic values, Quranic Tahfeez, and Western academic excellence.
            </p>

            {/* CTA Portal Buttons */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4 w-full">
              <Link
                href="/admissions"
                className="flex items-center gap-2.5 px-6 py-3.5 bg-amber-500 hover:bg-amber-600 text-school-950 rounded-xl text-sm sm:text-base font-extrabold shadow-lg transition-all hover:scale-105 active:scale-95"
              >
                <Sparkles className="w-5 h-5 text-school-900" />
                Apply for Admission
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>

              <Link
                href="/student"
                className="flex items-center gap-2.5 px-6 py-3.5 bg-school-700/90 hover:bg-school-700 text-white border border-school-500 rounded-xl text-sm sm:text-base font-bold transition-all shadow hover:bg-school-600"
              >
                <GraduationCap className="w-5 h-5 text-amber-300" />
                Check Result / Parent Portal
              </Link>

              <Link
                href="/about"
                className="flex items-center gap-2 px-5 py-3.5 bg-white/10 hover:bg-white/20 text-slate-200 border border-white/20 rounded-xl text-sm sm:text-base font-semibold transition-all"
              >
                <BookOpen className="w-5 h-5 text-school-300" />
                About Leadership
              </Link>

              <Link
                href="/teacher"
                className="flex items-center gap-2 px-5 py-3.5 bg-white/10 hover:bg-white/20 text-slate-200 border border-white/20 rounded-xl text-sm sm:text-base font-semibold transition-all"
              >
                <BookOpen className="w-5 h-5 text-school-300" />
                Teacher Score Entry
              </Link>

              <Link
                href="/admin"
                className="flex items-center gap-2 px-5 py-3.5 bg-school-900/90 hover:bg-school-950 text-slate-200 border border-school-700 rounded-xl text-sm sm:text-base font-semibold transition-all"
              >
                <ShieldCheck className="w-5 h-5 text-amber-400" />
                Admin Suite
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats Banner */}
      <section className="bg-white border-b border-slate-200 shadow-sm py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="border-r border-slate-100 last:border-0">
              <div className="text-2xl sm:text-3xl font-black text-school-900">100%</div>
              <div className="text-xs text-slate-500 font-semibold uppercase mt-1">Dual Curriculum Integration</div>
            </div>
            <div className="border-r border-slate-100 last:border-0">
              <div className="text-2xl sm:text-3xl font-black text-emerald-700">Juz &apos;Amma</div>
              <div className="text-xs text-slate-500 font-semibold uppercase mt-1">Tahfeez by Primary 4</div>
            </div>
            <div className="border-r border-slate-100 last:border-0">
              <div className="text-2xl sm:text-3xl font-black text-amber-600">3 Terms</div>
              <div className="text-xs text-slate-500 font-semibold uppercase mt-1">Continuous Assessment (CA1-3)</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-school-800">Ado-Ekiti</div>
              <div className="text-xs text-slate-500 font-semibold uppercase mt-1">Secure, Serene Environment</div>
            </div>
          </div>
        </div>
      </section>

      {/* Dual Curriculum Pillars */}
      <section id="curriculum" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-school-700 bg-school-50 px-3.5 py-1.5 rounded-full border border-school-200 uppercase tracking-wider">
            Our Educational Model
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-school-900 mt-3 tracking-tight">
            Western Academic Excellence Integrated with Divine Islamic Guidance
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-4 leading-relaxed">
            At AL-Amaanah, we do not treat Western subjects and Islamic studies as separate worlds. Both are evaluated, graded, and computed together to foster holistic Muslim scholars.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Western Academic Stream */}
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-md hover:shadow-xl transition-all">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-6">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Western Academic Foundation</h3>
            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
              Standard Nigerian and British curricula delivered by certified, passionate educators.
            </p>
            <ul className="space-y-3 text-sm text-slate-700">
              <li className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span><strong>Mathematics & Quantitative Reasoning:</strong> Problem-solving and mental agility.</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span><strong>English Studies & Synthetic Phonics:</strong> Early reading fluency from Nursery.</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span><strong>Basic Science & Technology:</strong> Hands-on experiments and computer literacy.</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span><strong>Social Studies, Agricultural Science & Civic Values:</strong> Community responsibility.</span>
              </li>
            </ul>
          </div>

          {/* Islamic & Quranic Stream */}
          <div className="bg-gradient-to-br from-emerald-900 to-school-950 text-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all">
            <div className="w-12 h-12 rounded-xl bg-emerald-800 text-amber-300 flex items-center justify-center mb-6">
              <Star className="w-6 h-6 fill-amber-300" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Islamic Studies & Tahfeez Program</h3>
            <p className="text-sm text-emerald-100 mb-6 leading-relaxed">
              Nurturing hearts with the words of Allah, the Sunnah, and exemplary Prophetic manners.
            </p>
            <ul className="space-y-3 text-sm text-emerald-100">
              <li className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span><strong>Holy Quran Memorization (Tahfeez):</strong> Structured progression from Surah An-Nas to Juz &apos;Amma.</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span><strong>Tajweed & Phonetics:</strong> Correct Makharij (articulation points) and melody.</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span><strong>Arabic Language (Lughatul Arabiyyah):</strong> Reading, writing, and vocabulary.</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span><strong>Akhlaaq & Daily Salah:</strong> Practicing congregational Zuhr prayer in school daily.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Continuous Assessment & Grading Standard */}
      <section className="bg-school-50 py-16 px-4 sm:px-6 lg:px-8 border-y border-school-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-school-950 tracking-tight">
              Continuous Assessment & Terminal Grading
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Every subject follows our rigorous 100-mark evaluation breakdown with continuous feedback:
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="bg-white p-5 rounded-xl border border-school-200 text-center shadow-sm">
              <span className="text-xs font-bold text-slate-400 uppercase">1st Assessment</span>
              <div className="text-2xl font-black text-school-800 mt-1">20 Marks</div>
              <p className="text-[11px] text-slate-500 mt-1">Mid-term test & assignments</p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-school-200 text-center shadow-sm">
              <span className="text-xs font-bold text-slate-400 uppercase">2nd Assessment</span>
              <div className="text-2xl font-black text-school-800 mt-1">20 Marks</div>
              <p className="text-[11px] text-slate-500 mt-1">Projects, quizzes & recitation</p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-school-200 text-center shadow-sm">
              <span className="text-xs font-bold text-slate-400 uppercase">3rd Assessment</span>
              <div className="text-2xl font-black text-school-800 mt-1">20 Marks</div>
              <p className="text-[11px] text-slate-500 mt-1">Classwork & practicals</p>
            </div>
            <div className="bg-school-900 text-white p-5 rounded-xl border border-school-800 text-center shadow-sm">
              <span className="text-xs font-bold text-amber-300 uppercase">Terminal Exam</span>
              <div className="text-2xl font-black text-white mt-1">40 Marks</div>
              <p className="text-[11px] text-slate-300 mt-1">Comprehensive end-of-term examination</p>
            </div>
          </div>
        </div>
      </section>

      {/* Academic Calendar & Resumption */}
      <section id="calendar" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-school-900 to-school-800 rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-school-700 text-amber-300 text-xs font-semibold">
              <Calendar className="w-3.5 h-3.5" />
              Academic Session 2024/2025 Notice
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Term Resumption & Vacation Dates
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Parents are kindly reminded that terminal results are available on the portal. Please ensure all school fee clearances are completed prior to the fees deadline.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="bg-school-950/60 p-3 rounded-lg border border-school-700">
                <span className="text-slate-400 block text-[10px] uppercase">Term Vacation</span>
                <span className="font-bold text-white text-sm">Dec 13, 2024</span>
              </div>
              <div className="bg-school-950/60 p-3 rounded-lg border border-school-700">
                <span className="text-slate-400 block text-[10px] uppercase">Next Resumption</span>
                <span className="font-bold text-amber-300 text-sm">Jan 13, 2025</span>
              </div>
              <div className="bg-school-950/60 p-3 rounded-lg border border-school-700">
                <span className="text-slate-400 block text-[10px] uppercase">Fees Deadline</span>
                <span className="font-bold text-rose-300 text-sm">Jan 20, 2025</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto">
            <Link
              href="/student"
              className="flex items-center justify-center gap-2 px-6 py-3.5 bg-amber-500 hover:bg-amber-600 text-school-950 rounded-xl font-bold text-sm shadow-md transition-all text-center"
            >
              <GraduationCap className="w-4 h-4" />
              Check Pupil Result
            </Link>
            <a
              href="#contact"
              className="flex items-center justify-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold text-sm transition-all text-center border border-white/20"
            >
              Contact Bursary Office
            </a>
          </div>
        </div>
      </section>

      {/* Location & Admissions Inquiries */}
      <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="text-xs font-bold text-school-700 bg-school-50 px-3.5 py-1.5 rounded-full border border-school-200 uppercase tracking-wider">
              Admissions & Visits
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-school-900 mt-3 tracking-tight">
              Enroll Your Child at AL-Amaanah School, Ado-Ekiti
            </h2>
            <p className="text-sm text-slate-600 mt-4 leading-relaxed">
              Admission is ongoing for Creche, Nursery 1–3, and Basic 1–6. Give your child the gift of academic brilliance anchored on authentic Islamic character.
            </p>
            <div className="mt-6 space-y-3 text-sm text-slate-700">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-school-100 text-school-700 flex items-center justify-center flex-shrink-0">
                  📍
                </div>
                <span>64 Falana Street, Ado - Ikere Road, Ado Ekiti, Ekiti State</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                  📞
                </div>
                <span>+234 706 538 3463 • 0816 175 1723</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0">
                  ✉️
                </div>
                <span>admin@al-amaanahschool.edu.ng</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-md">
            <h3 className="text-base font-bold text-slate-900 mb-1">Quick Portal Launcher</h3>
            <p className="text-xs text-slate-500 mb-6">Select your portal access gateway below:</p>

            <div className="space-y-3">
              <Link
                href="/student"
                className="flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:border-school-600 hover:bg-school-50/50 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-school-100 text-school-800 flex items-center justify-center font-bold">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-school-700">
                      Parent & Pupil Portal
                    </h4>
                    <p className="text-xs text-slate-500">View terminal result, Tahfeez progress & print A4 card</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-school-700 group-hover:translate-x-1 transition-all" />
              </Link>

              <Link
                href="/teacher"
                className="flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:border-slate-600 hover:bg-slate-50 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center font-bold">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Teacher Portal</h4>
                    <p className="text-xs text-slate-500">Live score grid, Excel import/export & broadsheet</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-all" />
              </Link>

              <Link
                href="/admin"
                className="flex items-center justify-between p-4 rounded-xl border border-amber-200 bg-amber-50/40 hover:bg-amber-50 hover:border-amber-400 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-amber-950">Administrative Suite</h4>
                    <p className="text-xs text-amber-800/80">Fee clearances, approval workflow, batch print</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-amber-700 group-hover:translate-x-1 transition-all" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
