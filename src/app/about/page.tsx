'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { IslamicPattern } from '@/components/IslamicPattern';
import { SchoolLogo } from '@/components/SchoolLogo';
import {
  BookOpen,
  Award,
  Star,
  CheckCircle,
  Users,
  Compass,
  ArrowRight,
  GraduationCap,
  Sparkles,
  Quote,
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar activePage="about" />

      {/* Hero Banner with Subtle Islamic Design */}
      <section className="relative overflow-hidden bg-gradient-to-b from-school-900 via-school-800 to-school-950 text-white py-16 px-4 sm:px-6 lg:px-8">
        <IslamicPattern variant="gold" />
        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-school-700/60 border border-amber-400/30 text-amber-300 text-xs font-semibold">
            <span className="font-arabic text-sm">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</span>
            <span>•</span>
            <span>About AL-Amaanah</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight uppercase">
            Nurturing Knowledge & Piety
          </h1>
          <p className="text-sm sm:text-base text-amber-300 font-bold uppercase tracking-widest">
            Al-’Ilm wat-Taqwa • Ado-Ekiti, Nigeria
          </p>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Founded on the noble aspiration of delivering standard Western academic education firmly rooted in Islamic values, Quranic recitation, and sound character.
          </p>
        </div>
      </section>

      {/* Leadership Messages: Proprietor & Headteacher */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold text-school-800 bg-school-100/80 px-3 py-1 rounded-full uppercase tracking-wider">
            School Leadership
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-school-950 mt-2">
            Welcome from the School Leaders
          </h2>
          <IslamicPattern variant="divider" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Proprietor's Address */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-md relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-bl-full pointer-events-none opacity-50" />
            <div className="space-y-4 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-lg border border-amber-300">
                  OA
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base">Mr. Olanipekun Abdul-Hakeem</h3>
                  <p className="text-xs text-amber-700 font-semibold uppercase tracking-wider">Proprietor</p>
                </div>
              </div>

              <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-3 italic">
                <p>
                  &quot;Assalamu Alaykum wa Rahmatullahi wa Barakatuh. When we envisioned AL-Amaanah Nursery & Primary School in Ado-Ekiti, our deep commitment was to provide an environment where parents never have to compromise between sound Western academic learning and deep, authentic Islamic values.&quot;
                </p>
                <p>
                  &quot;Our motto, <strong>Knowledge and Piety</strong>, reflects our conviction that true intellectual brilliance achieves its purpose only when illuminated by moral piety, love for the Holy Quran, and practical devotion to Allah.&quot;
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 mt-6 flex items-center justify-between text-xs text-slate-500">
              <span>Al-Amaanah Directorate</span>
              <span className="font-serif italic font-semibold text-school-900">O. Abdul-Hakeem</span>
            </div>
          </div>

          {/* Headteacher's Address */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-md relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-32 h-32 bg-school-50 rounded-bl-full pointer-events-none opacity-50" />
            <div className="space-y-4 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-school-100 text-school-900 flex items-center justify-center font-bold text-lg border border-school-300">
                  AS
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base">Mrs. Anat Sobulo</h3>
                  <p className="text-xs text-school-700 font-semibold uppercase tracking-wider">Headteacher / Head of School</p>
                </div>
              </div>

              <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-3 italic">
                <p>
                  &quot;Welcome to AL-Amaanah! In our classrooms, every child is embraced as a unique trust (Amaanah). Our instructional methodology is child-centered, encouraging our pupils from Creche to Primary 6 to think critically, communicate articulately, and read with synthetic phonics fluency.&quot;
                </p>
                <p>
                  &quot;Alongside Mathematics, STEM, and literacy, our pupils memorize the Holy Quran with correct Tajweed rules and practice daily congregational Zuhr prayer in school, grounding them in noble character.&quot;
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 mt-6 flex items-center justify-between text-xs text-slate-500">
              <span>Academic Office</span>
              <span className="font-serif italic font-semibold text-school-900">Anat Sobulo</span>
            </div>
          </div>
        </div>
      </section>

      {/* Core Pillars: Knowledge & Piety */}
      <section className="bg-school-900 text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <IslamicPattern variant="gold" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Our Core Foundation</h2>
            <p className="text-amber-300 text-xs sm:text-sm uppercase tracking-widest mt-1 font-semibold">
              The Two Pillars of AL-Amaanah Education
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-school-950/80 border border-school-800 rounded-3xl p-8 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-school-800 text-amber-300 flex items-center justify-center font-bold">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">1. Knowledge (Al-’Ilm)</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Empowering children with rigorous scientific inquiry, mathematical prowess, English verbal reasoning, computer skills, and creative arts that prepare them to excel in national and international examinations.
              </p>
            </div>

            <div className="bg-school-950/80 border border-school-800 rounded-3xl p-8 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-900/60 text-emerald-300 flex items-center justify-center font-bold">
                <Star className="w-6 h-6 fill-emerald-300" />
              </div>
              <h3 className="text-xl font-bold text-white">2. Piety (At-Taqwa)</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Instilling consciousness of Allah in everyday actions, truthful speech, respectful treatment of parents and elders, modesty in dressing, and daily dedication to the Sunnah of Prophet Muhammad (ﷺ).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Location & Operating Hours */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-school-950">Visit Our Campus in Ado-Ekiti</h2>
        <p className="text-slate-600 text-sm max-w-xl mx-auto">
          Located in a serene and secure neighborhood easily accessible along the Ado - Ikere Road.
        </p>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm max-w-lg mx-auto text-left space-y-3 text-xs sm:text-sm">
          <div className="flex items-start gap-3">
            <span className="font-bold text-school-900 w-28">Campus Address:</span>
            <span className="text-slate-700">64 Falana Street, Ado - Ikere Road, Ado Ekiti, Ekiti State</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="font-bold text-school-900 w-28">Opening Hours:</span>
            <span className="text-slate-700 font-semibold text-emerald-800">Monday to Friday: 7:30 AM – 3:00 PM</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="font-bold text-school-900 w-28">Phone Inquiries:</span>
            <span className="text-slate-700 font-mono">+234 706 538 3463, 0816 175 1723</span>
          </div>
        </div>

        <div className="pt-4 flex justify-center gap-3">
          <Link
            href="/admissions"
            className="px-6 py-3 rounded-xl bg-school-800 hover:bg-school-900 text-white font-bold text-xs sm:text-sm shadow-md transition-all"
          >
            Apply for Admission
          </Link>
          <Link
            href="/contact"
            className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs sm:text-sm transition-all"
          >
            Contact School
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
