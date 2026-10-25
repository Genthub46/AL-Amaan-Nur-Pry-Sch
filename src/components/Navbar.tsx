'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SchoolLogo } from './SchoolLogo';
import { Menu, X, ShieldCheck, UserCheck, GraduationCap, RefreshCw, BookOpen, Sparkles } from 'lucide-react';
import { resetToDefaults } from '@/lib/storage';

interface NavbarProps {
  activePage?: 'home' | 'about' | 'academics' | 'admissions' | 'contact' | 'admin' | 'teacher' | 'student';
}

export const Navbar: React.FC<NavbarProps> = ({ activePage = 'home' }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleResetData = () => {
    if (confirm('Reset portal database to initial sample data? This will restore original scores, demo students and classes.')) {
      resetToDefaults();
      window.location.reload();
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-sm no-print">
      {/* Top Islamic Banner & Info Bar */}
      <div className="bg-school-900 text-white text-xs py-1.5 px-4 sm:px-6 lg:px-8 border-b border-school-800/60 relative overflow-hidden">
        {/* Subtle decorative shimmer */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/5 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto flex justify-between items-center relative z-10 gap-3">
          <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
            <span className="font-arabic text-amber-300 text-xs sm:text-sm tracking-wide">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</span>
            <span className="hidden md:inline text-amber-500/50 font-serif">۞</span>
            <span className="hidden md:inline text-slate-300 text-[11px] font-medium">Knowledge and Piety • Al-’Ilm wat-Taqwa</span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 text-[11px] text-slate-300 whitespace-nowrap flex-shrink-0">
            <span className="hidden lg:inline text-slate-300">📍 64 Falana St, Ado - Ikere Rd, Ado-Ekiti</span>
            <span className="hidden sm:inline text-slate-200 font-medium">📞 +234 706 538 3463</span>
            <button
              onClick={handleResetData}
              title="Reset demo data to initial state"
              className="flex items-center gap-1 text-amber-400 hover:text-amber-300 transition-colors pl-2 sm:border-l sm:border-school-700 sm:pl-3"
            >
              <RefreshCw className="w-3 h-3" />
              <span className="hidden sm:inline">Reset Demo</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 sm:h-20 gap-4">
        {/* School Logo */}
        <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
          <SchoolLogo size={44} showText={true} />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-8 text-sm font-semibold text-slate-600">
          <Link
            href="/"
            className={`whitespace-nowrap transition-colors hover:text-school-800 ${
              activePage === 'home' ? 'text-school-900 font-bold border-b-2 border-school-800 pb-1' : ''
            }`}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={`whitespace-nowrap transition-colors hover:text-school-800 ${
              activePage === 'about' ? 'text-school-900 font-bold border-b-2 border-school-800 pb-1' : ''
            }`}
          >
            About
          </Link>
          <Link
            href="/academics"
            className={`whitespace-nowrap transition-colors hover:text-school-800 ${
              activePage === 'academics' ? 'text-school-900 font-bold border-b-2 border-school-800 pb-1' : ''
            }`}
          >
            Academics
          </Link>
          <Link
            href="/admissions"
            className={`whitespace-nowrap transition-colors hover:text-school-800 inline-flex items-center gap-1.5 ${
              activePage === 'admissions' ? 'text-school-900 font-bold border-b-2 border-school-800 pb-1' : ''
            }`}
          >
            <span>Admissions</span>
            <span className="bg-amber-100 text-amber-800 text-[10px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider">
              Open
            </span>
          </Link>
          <Link
            href="/contact"
            className={`whitespace-nowrap transition-colors hover:text-school-800 ${
              activePage === 'contact' ? 'text-school-900 font-bold border-b-2 border-school-800 pb-1' : ''
            }`}
          >
            Contact &amp; Fees
          </Link>
        </nav>

        {/* Portal Access Buttons */}
        <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
          <Link
            href="/student"
            className={`h-9 px-3.5 inline-flex items-center gap-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all shadow-sm ${
              activePage === 'student'
                ? 'bg-school-800 text-white ring-2 ring-school-800 ring-offset-1'
                : 'bg-school-50 text-school-900 hover:bg-school-100 border border-school-200'
            }`}
          >
            <GraduationCap className="w-4 h-4 text-school-600 flex-shrink-0" />
            <span>Parent Portal</span>
          </Link>

          <Link
            href="/teacher"
            className={`h-9 px-3 inline-flex items-center gap-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all ${
              activePage === 'teacher'
                ? 'bg-school-800 text-white shadow-sm ring-2 ring-school-800 ring-offset-1'
                : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <UserCheck className="w-4 h-4 text-slate-500 flex-shrink-0" />
            <span>Teacher</span>
          </Link>

          <Link
            href="/admin"
            className={`h-9 px-3 inline-flex items-center gap-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all ${
              activePage === 'admin'
                ? 'bg-amber-600 text-white shadow-sm ring-2 ring-amber-600 ring-offset-1'
                : 'bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-200'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span>Admin</span>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-2 text-sm font-medium">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-slate-100"
            >
              Home
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-slate-100"
            >
              About &amp; Leadership
            </Link>
            <Link
              href="/academics"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-slate-100"
            >
              Academics &amp; Tahfeez
            </Link>
            <Link
              href="/admissions"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-slate-100 flex items-center justify-between"
            >
              <span>Admissions</span>
              <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full">Open</span>
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-slate-100"
            >
              Contact &amp; Fees
            </Link>
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <Link
              href="/student"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-school-800 text-white text-sm font-semibold"
            >
              <GraduationCap className="w-4 h-4" />
              Parent &amp; Pupil Result Portal
            </Link>
            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/teacher"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-slate-100 text-slate-800 text-xs font-semibold"
              >
                <UserCheck className="w-4 h-4" />
                Teacher Portal
              </Link>
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-amber-50 text-amber-900 border border-amber-200 text-xs font-semibold"
              >
                <ShieldCheck className="w-4 h-4" />
                Admin Suite
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
