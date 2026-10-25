'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { IslamicPattern } from '@/components/IslamicPattern';
import {
  BookOpen,
  Award,
  Star,
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Check,
} from 'lucide-react';

export default function AcademicsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar activePage="academics" />

      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-school-900 via-school-800 to-school-950 text-white py-16 px-4 sm:px-6 lg:px-8">
        <IslamicPattern variant="gold" />
        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-school-700/60 border border-amber-400/30 text-amber-300 text-xs font-semibold">
            <span className="font-arabic text-sm">رَبِّ زِدْنِي عِلْمًا</span>
            <span>•</span>
            <span>Dual Curriculum Framework</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight uppercase">
            Integrated Academic Excellence & Tahfeez
          </h1>
          <p className="text-sm sm:text-base text-amber-300 font-bold uppercase tracking-widest">
            Western Literacy & STEM • Holy Quran Memorization & Arabic Fluency
          </p>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            A balanced curriculum where Western sciences and Islamic studies enrich each other. Every subject is computed into the student&apos;s unified terminal broadsheet.
          </p>
        </div>
      </section>

      {/* 100-Mark Continuous Assessment Standard */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-school-800 bg-school-100 px-3 py-1 rounded-full uppercase tracking-wider">
            Evaluation Formula
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-school-950 mt-2">
            The Continuous Assessment (CA) System
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            Every subject follows our structured 100-mark evaluation with 3 continuous assessments before the terminal examination:
          </p>
          <IslamicPattern variant="divider" />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-2xl border border-school-200 shadow-sm text-center relative overflow-hidden">
            <div className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">1st Assessment</div>
            <div className="text-3xl font-black text-school-800 mt-1 font-mono">20 M</div>
            <div className="h-1 w-10 bg-school-600 mx-auto my-2 rounded-full" />
            <p className="text-xs text-slate-600 font-medium">Mid-Term Written Test & Take-Home Assignment</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-school-200 shadow-sm text-center relative overflow-hidden">
            <div className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">2nd Assessment</div>
            <div className="text-3xl font-black text-school-800 mt-1 font-mono">20 M</div>
            <div className="h-1 w-10 bg-school-600 mx-auto my-2 rounded-full" />
            <p className="text-xs text-slate-600 font-medium">Quizzes, Oral Recitation & Classroom Project</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-school-200 shadow-sm text-center relative overflow-hidden">
            <div className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">3rd Assessment</div>
            <div className="text-3xl font-black text-school-800 mt-1 font-mono">20 M</div>
            <div className="h-1 w-10 bg-school-600 mx-auto my-2 rounded-full" />
            <p className="text-xs text-slate-600 font-medium">Classwork, Practical Demonstrations & Attendance</p>
          </div>

          <div className="bg-gradient-to-br from-school-900 to-school-950 text-white p-6 rounded-2xl border border-school-800 shadow-sm text-center relative overflow-hidden">
            <div className="text-[10px] font-extrabold uppercase text-amber-300 tracking-wider">Terminal Exam</div>
            <div className="text-3xl font-black text-white mt-1 font-mono">40 M</div>
            <div className="h-1 w-10 bg-amber-400 mx-auto my-2 rounded-full" />
            <p className="text-xs text-slate-300 font-medium">Comprehensive End-of-Term Examination</p>
          </div>
        </div>

        <div className="mt-6 bg-school-50 border border-school-200 rounded-2xl p-4 text-center text-xs text-slate-700 font-medium">
          Total Score = <strong>CA 1 (20) + CA 2 (20) + CA 3 (20) + Exam (40) = 100 Marks</strong> per subject.
        </div>
      </section>

      {/* Two Streams: Western Academic & Islamic Tahfeez */}
      <section className="bg-slate-100 py-16 px-4 sm:px-6 lg:px-8 border-y border-slate-200">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-school-950">
              The Dual Curriculum Streams
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Comprehensive course subjects taught by specialized educators at 64 Falana Street, Ado-Ekiti:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Western Stream */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-slate-900">Western Academic Stream</h3>
                  <span className="text-xs text-slate-500 font-semibold uppercase">Nigerian & British Foundations</span>
                </div>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span><strong>English Studies:</strong> Synthetic Phonics, Reading Comprehension, Grammar, and Vocabulary Development.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Mathematics & Quantitative Reasoning:</strong> Numeracy, Problem Solving, Geometry, and Mental Arithmetic.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Basic Science & Technology:</strong> ICT / Computer literacy, Hands-on Experiments, and Environmental Science.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Social Studies & Civic Education:</strong> Good Citizenship, Nigerian History, and Moral Responsibilities.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Agricultural Science & Home Economics:</strong> Practical gardening, nutrition, and home hygiene.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Physical & Health Education (PHE) & CCA:</strong> Sports, motor coordination, drawing, and cultural arts.</span>
                </li>
              </ul>
            </div>

            {/* Islamic & Tahfeez Stream */}
            <div className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-school-950 text-white rounded-3xl p-8 shadow-sm space-y-5 relative overflow-hidden">
              <IslamicPattern variant="gold" />
              <div className="relative z-10 space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-800 text-amber-300 flex items-center justify-center font-bold">
                    <Star className="w-5 h-5 fill-amber-300" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-lg text-white">Islamic Studies & Tahfeez Stream</h3>
                    <span className="text-xs text-amber-300 font-semibold uppercase">Quran, Arabic & Akhlaaq</span>
                  </div>
                </div>

                <ul className="space-y-3 text-xs sm:text-sm text-emerald-100">
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Holy Quran & Tahfeez:</strong> Progressive daily memorization with verified Tajweed rules from short Surahs to Juz &apos;Amma.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Arabic Language (Lughatul Arabiyyah):</strong> Reading, Arabic handwriting, daily conversational vocabulary, and grammar.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Islamic Religious Studies (IRS):</strong> Tawheed (Monotheism), Fiqh of Taharah and Salah, Seerah of the Prophet (ﷺ), and Prophetic Hadiths.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Congregational Salah (Salat uz-Zuhr):</strong> Daily practical observance in school, teaching punctuality and humility.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Daily Masnoon Adhkar:</strong> Morning and evening supplications, eating and sleeping Du&apos;as memorized by heart.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tahfeez Progression Roadmap */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-school-950">
            Quranic Tahfeez Roadmap
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            Structured stages of memorization from Creche to Primary graduation:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md">Stage 1: Nursery 1 – 3</span>
            <h4 className="font-bold text-sm text-slate-900 mt-2">Foundational Recitation</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Arabic alphabet identification, Makharij articulation, Surah Al-Fatihah, and Surahs An-Nas to Al-Fil with morning/eating Du&apos;as.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <span className="text-xs font-bold text-school-700 bg-school-50 px-2.5 py-1 rounded-md">Stage 2: Basic 1 – 3</span>
            <h4 className="font-bold text-sm text-slate-900 mt-2">Juz &apos;Amma Acceleration</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Surah Al-Humazah to Surah An-Naba, Tajweed rules (Noon Sakinah, Meem Sakinah, Madd), and 15 daily Prophetic Hadiths.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">Stage 3: Basic 4 – 6</span>
            <h4 className="font-bold text-sm text-slate-900 mt-2">Retention & Juz Tabarak</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Consolidation of Juz &apos;Amma, memorization of Surah Al-Mulk to Surah Al-Qalam, fluent Quranic reading, and Walimah preparation.
            </p>
          </div>
        </div>

        <div className="pt-4 text-center">
          <Link
            href="/admissions"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-school-800 hover:bg-school-900 text-white font-bold text-xs sm:text-sm shadow-md transition-all"
          >
            Enroll in AL-Amaanah Today
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
