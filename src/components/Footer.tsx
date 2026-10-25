import React from 'react';
import Link from 'next/link';
import { SchoolLogo } from './SchoolLogo';
import { IslamicPattern } from './IslamicPattern';
import { MapPin, Phone, Mail, Award, BookOpen, Clock, HeartHandshake } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-school-950 text-slate-300 pt-16 pb-8 border-t border-school-900 relative overflow-hidden no-print">
      {/* Subtle Islamic Geometric Background */}
      <IslamicPattern variant="subtle" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Column 1: School Identity */}
          <div className="space-y-4">
            <SchoolLogo size={52} showText={true} variant="dark" />
            <p className="text-sm text-slate-400 leading-relaxed">
              Al-Amaanah Nursery & Primary School in Ado-Ekiti integrates sound Islamic learning and Western academic excellence to nurture confident, pious, and visionary young scholars.
            </p>
            <div className="pt-1">
              <span className="inline-block bg-school-900/90 border border-amber-500/30 text-amber-300 text-xs px-3.5 py-1.5 rounded-full font-medium">
                Knowledge and Piety • Al-’Ilm wat-Taqwa
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-school-400" />
              School Sections
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-amber-300 transition-colors">
                  Home Page
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-amber-300 transition-colors">
                  About & Leadership Welcome
                </Link>
              </li>
              <li>
                <Link href="/academics" className="hover:text-amber-300 transition-colors">
                  Academics & Tahfeez Program
                </Link>
              </li>
              <li>
                <Link href="/admissions" className="hover:text-amber-300 transition-colors">
                  Online Admission Application
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-300 transition-colors">
                  Contact, Location & Fees
                </Link>
              </li>
              <li>
                <Link href="/student" className="hover:text-amber-300 transition-colors">
                  Parent & Pupil Result Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: School Contacts */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-4 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-school-400" />
              Location & Hours
            </h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>64 Falana Street, Ado - Ikere Road, Ado Ekiti, Ekiti State, Nigeria</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>+234 706 538 3463, 0816 175 1723</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>Monday – Friday: 7:30 AM – 3:00 PM</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>admin@al-amaanahschool.edu.ng</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Official Bank Details */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-4 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              Official Tuition Accounts
            </h4>
            <div className="bg-school-900/90 border border-school-800 rounded-xl p-4 text-xs space-y-2 text-slate-300">
              <p className="text-slate-400">For school fees & termly levies:</p>
              <div>
                <span className="text-slate-400 block text-[11px]">Bank:</span>
                <span className="font-semibold text-white">Jaiz Bank / First Bank</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Account Number:</span>
                <span className="font-mono text-amber-300 font-bold tracking-wider text-sm">0012345678</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Account Name:</span>
                <span className="font-semibold text-white">Al-Amaanah Nur & Pry School</span>
              </div>
              <p className="text-[11px] text-emerald-400 pt-1">
                * Forward transfer receipt to the Bursar for portal clearance.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-school-900 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} AL-Amaanah Nursery & Primary School, Ado-Ekiti. All rights reserved.</p>
          <div className="flex items-center gap-2 font-arabic text-amber-400/90 text-sm">
            <span>رَبِّ زِدْنِي عِلْمًا</span>
            <span className="text-xs text-slate-500 font-sans">• My Lord, Increase Me in Knowledge</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
