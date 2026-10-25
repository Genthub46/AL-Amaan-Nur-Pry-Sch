'use client';

import React from 'react';
import { ComputedStudentResult, SchoolProfile } from '@/types';
import { SchoolLogo } from './SchoolLogo';
import { formatOrdinal } from '@/lib/gradingEngine';
import { RATING_DESCRIPTIONS } from '@/lib/constants';
import { CheckCircle2, Star, Printer } from 'lucide-react';

interface ReportCardA4Props {
  result: ComputedStudentResult;
  profile: SchoolProfile;
  showPrintButton?: boolean;
}

export const ReportCardA4: React.FC<ReportCardA4Props> = ({
  result,
  profile,
  showPrintButton = true,
}) => {
  const { student, session, term, scores, character, totalMarksObtained, totalMarksPossible, overallPercentage, classPosition, totalStudentsInClass, overallGrade } = result;

  const handlePrint = () => {
    window.print();
  };

  const termNames: Record<string, string> = {
    FIRST: 'FIRST TERM',
    SECOND: 'SECOND TERM',
    THIRD: 'THIRD TERM (PROMOTIONAL)',
  };

  return (
    <div className="w-full max-w-[850px] mx-auto">
      {/* Print Trigger Button */}
      {showPrintButton && (
        <div className="no-print flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-6">
          <div className="flex items-center gap-3">
            <span className="p-2 bg-school-50 text-school-700 rounded-lg">
              <Printer className="w-5 h-5" />
            </span>
            <div>
              <h4 className="text-sm font-bold text-slate-800">Print or Save Official Report Card</h4>
              <p className="text-xs text-slate-500">Formatted to standard A4 size for official documentation and framing.</p>
            </div>
          </div>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-2.5 bg-school-800 hover:bg-school-900 text-white rounded-lg text-sm font-semibold transition-all shadow-md active:scale-95"
          >
            <Printer className="w-4 h-4" />
            Print / Save as PDF
          </button>
        </div>
      )}

      {/* Official A4 Sheet */}
      <div className="report-card-container bg-white text-slate-900 border-2 border-school-900 rounded-2xl shadow-xl p-8 relative overflow-hidden font-sans">
        {/* Subtle Watermark in background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
          <SchoolLogo size={550} variant="print" />
        </div>

        {/* Top Bismillah Header */}
        <div className="text-center mb-2">
          <span className="font-arabic text-school-900 text-xl font-bold tracking-wide">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </span>
        </div>

        {/* Header Block with School Crest */}
        <div className="flex items-center justify-between border-b-2 border-school-900 pb-4 mb-4">
          <SchoolLogo size={80} variant="print" />

          <div className="text-center flex-1 px-4">
            <h1 className="text-2xl font-black text-school-900 tracking-tight leading-tight uppercase">
              {profile.name}
            </h1>
            <p className="text-xs font-bold text-amber-700 uppercase tracking-widest mt-0.5">
              {profile.subName}
            </p>
            <p className="text-xs italic text-slate-600 font-medium mt-0.5">
              &quot;{profile.motto}&quot;
            </p>
            <p className="text-[11px] text-slate-600 mt-1">
              {profile.address}, {profile.city}, {profile.state}. • Tel: {profile.phone1}
            </p>
            <div className="inline-block bg-school-900 text-white font-extrabold text-xs px-4 py-1 rounded-full uppercase tracking-wider mt-2">
              Continuous Assessment & Terminal Report Sheet
            </div>
          </div>

          {/* Student Passport Box */}
          <div className="w-20 h-24 border-2 border-dashed border-school-800 rounded-lg flex flex-col items-center justify-center bg-slate-50 text-[10px] text-slate-400 font-medium text-center p-1">
            <div className="w-8 h-8 rounded-full bg-slate-200 mb-1 flex items-center justify-center text-slate-500 font-bold text-xs">
              {student.fullName.charAt(0)}
            </div>
            <span>Passport Photo</span>
          </div>
        </div>

        {/* Student Bio Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-school-50/70 border border-school-200 rounded-xl p-3 text-xs mb-4">
          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-bold">Pupil&apos;s Name</span>
            <span className="font-bold text-school-950 text-sm">{student.fullName}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-bold">Admission Number</span>
            <span className="font-mono font-bold text-school-800">{student.admissionNo}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-bold">Class</span>
            <span className="font-bold text-slate-800">{student.className}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-bold">Gender</span>
            <span className="font-semibold text-slate-800">{student.gender}</span>
          </div>

          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-bold">Academic Session</span>
            <span className="font-semibold text-slate-800">{session.name}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-bold">Term</span>
            <span className="font-bold text-school-800">{termNames[term]}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-bold">Times School Opened</span>
            <span className="font-semibold text-slate-800">{character.timesSchoolOpened} days</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-bold">Attendance Record</span>
            <span className="font-semibold text-slate-800">
              Present: {character.timesPresent} | Absent: {character.timesAbsent}
            </span>
          </div>
        </div>

        {/* Unified Scores Table (Western + Islamic) */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1.5">
            <h3 className="text-xs font-black uppercase text-school-900 tracking-wider">
              Academic & Quranic Evaluation (Combined Breakdown)
            </h3>
            <span className="text-[11px] text-slate-500 italic">
              Formula: CA1 (20) + CA2 (20) + CA3 (20) + Exam (40) = 100 Marks
            </span>
          </div>

          <div className="border border-school-900 rounded-lg overflow-hidden">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-school-900 text-white font-bold text-[11px] uppercase tracking-wider text-center">
                  <th className="py-1.5 px-2 text-left w-6">#</th>
                  <th className="py-1.5 px-3 text-left">Subject</th>
                  <th className="py-1.5 px-1.5 w-16">Type</th>
                  <th className="py-1.5 px-1 w-12 bg-school-800">CA 1 (20)</th>
                  <th className="py-1.5 px-1 w-12 bg-school-800">CA 2 (20)</th>
                  <th className="py-1.5 px-1 w-12 bg-school-800">CA 3 (20)</th>
                  <th className="py-1.5 px-1 w-12 bg-school-700">Exam (40)</th>
                  <th className="py-1.5 px-1.5 w-14 bg-amber-600 text-white">Total (100)</th>
                  <th className="py-1.5 px-1 w-10">Grade</th>
                  <th className="py-1.5 px-2 text-left">Remark</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {scores.map((row, index) => {
                  const isIslamic = row.subject.category === 'ISLAMIC';
                  return (
                    <tr
                      key={row.subject.id}
                      className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'}
                    >
                      <td className="py-1 px-2 font-mono text-[10px] text-slate-400 text-center">{index + 1}</td>
                      <td className="py-1 px-3 font-semibold text-slate-800">
                        {row.subject.name}
                      </td>
                      <td className="py-1 px-1.5 text-center">
                        <span
                          className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                            isIslamic
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {isIslamic ? 'ISLAMIC' : 'WESTERN'}
                        </span>
                      </td>
                      <td className="py-1 px-1 text-center font-mono font-medium">{row.score.ca1}</td>
                      <td className="py-1 px-1 text-center font-mono font-medium">{row.score.ca2}</td>
                      <td className="py-1 px-1 text-center font-mono font-medium">{row.score.ca3}</td>
                      <td className="py-1 px-1 text-center font-mono font-semibold text-school-900">{row.score.exam}</td>
                      <td className="py-1 px-1.5 text-center font-mono font-black text-sm text-school-950 bg-amber-50">
                        {row.score.total}
                      </td>
                      <td className="py-1 px-1 text-center font-bold">
                        <span
                          className={`inline-block w-6 py-0.5 text-center rounded text-[11px] ${
                            row.score.grade === 'A'
                              ? 'bg-emerald-600 text-white'
                              : row.score.grade === 'B'
                              ? 'bg-blue-600 text-white'
                              : row.score.grade === 'C'
                              ? 'bg-amber-600 text-white'
                              : 'bg-rose-600 text-white'
                          }`}
                        >
                          {row.score.grade}
                        </span>
                      </td>
                      <td className="py-1 px-2 text-slate-600 italic text-[11px]">{row.score.remark}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Cognitive Aggregate Summary */}
        <div className="grid grid-cols-4 gap-2 bg-school-900 text-white rounded-xl p-3 text-center mb-4 text-xs">
          <div>
            <span className="text-slate-300 block text-[10px] uppercase">Total Marks</span>
            <span className="font-mono font-bold text-base text-amber-300">
              {totalMarksObtained} <span className="text-xs text-slate-300">/ {totalMarksPossible}</span>
            </span>
          </div>
          <div>
            <span className="text-slate-300 block text-[10px] uppercase">Overall Average</span>
            <span className="font-mono font-black text-base text-white">{overallPercentage}%</span>
          </div>
          <div>
            <span className="text-slate-300 block text-[10px] uppercase">Class Position</span>
            <span className="font-bold text-base text-amber-400">
              {formatOrdinal(classPosition)}{' '}
              <span className="text-[10px] font-normal text-slate-300">out of {totalStudentsInClass}</span>
            </span>
          </div>
          <div>
            <span className="text-slate-300 block text-[10px] uppercase">Terminal Verdict</span>
            <span className="font-bold text-base text-emerald-300">Grade {overallGrade}</span>
          </div>
        </div>

        {/* Islamic Tahfeez & Character Domain vs Psychomotor Domain */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-xs">
          {/* Islamic Character, Salah & Tahfeez */}
          <div className="border border-emerald-700/60 rounded-xl p-3 bg-emerald-50/40">
            <h4 className="font-bold text-emerald-950 text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 text-emerald-700 fill-emerald-700" />
              Tahfeez & Islamic Moral Development (Akhlaaq)
            </h4>
            <div className="space-y-1.5 text-slate-700">
              <div className="flex justify-between items-center border-b border-emerald-200/60 pb-1">
                <span className="font-medium text-slate-600">Surah / Portion Memorized:</span>
                <span className="font-bold text-emerald-950 text-right">{character.quranSurahMemorized}</span>
              </div>
              <div className="flex justify-between items-center border-b border-emerald-200/60 pb-1">
                <span className="font-medium text-slate-600">Tajweed & Fluency:</span>
                <span className="font-bold text-emerald-900">{RATING_DESCRIPTIONS[character.tajweedRating] || '5 - Excellent'}</span>
              </div>
              <div className="flex justify-between items-center border-b border-emerald-200/60 pb-1">
                <span className="font-medium text-slate-600">Salah Observance at School:</span>
                <span className="font-bold text-emerald-900">{RATING_DESCRIPTIONS[character.salahAttendance] || '5 - Regular'}</span>
              </div>
              <div className="flex justify-between items-center border-b border-emerald-200/60 pb-1">
                <span className="font-medium text-slate-600">Islamic Etiquette (Adab & Salaam):</span>
                <span className="font-bold text-emerald-900">{RATING_DESCRIPTIONS[character.islamicMannerisms] || '5 - Exemplary'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium text-slate-600">Daily Du&apos;as & Hadith:</span>
                <span className="font-semibold text-slate-800 text-right text-[11px]">{character.adhkarProgress}</span>
              </div>
            </div>
          </div>

          {/* Affective & Psychomotor Traits */}
          <div className="border border-school-200 rounded-xl p-3 bg-slate-50/60">
            <h4 className="font-bold text-school-900 text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-school-700" />
              Affective & Psychomotor Skills (1 - 5 Scale)
            </h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-slate-700">
              <div className="flex justify-between border-b border-slate-200 pb-0.5">
                <span>Punctuality:</span>
                <span className="font-bold text-school-900">{character.punctuality}/5</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-0.5">
                <span>Neatness:</span>
                <span className="font-bold text-school-900">{character.neatness}/5</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-0.5">
                <span>Handwriting:</span>
                <span className="font-bold text-school-900">{character.handwriting}/5</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-0.5">
                <span>Attentiveness:</span>
                <span className="font-bold text-school-900">{character.attentiveness}/5</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-0.5">
                <span>Politeness:</span>
                <span className="font-bold text-school-900">{character.politeness}/5</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-0.5">
                <span>Games & Sports:</span>
                <span className="font-bold text-school-900">{character.sports}/5</span>
              </div>
            </div>
            <div className="text-[10px] text-slate-500 mt-2 italic text-center">
              Rating Key: 5 = Excellent | 4 = Very Good | 3 = Good | 2 = Fair | 1 = Poor
            </div>
          </div>
        </div>

        {/* Remarks & Signatures Block */}
        <div className="border-t border-slate-300 pt-3 space-y-2.5 text-xs mb-4">
          <div className="flex items-start gap-2">
            <span className="font-bold text-slate-700 w-36 flex-shrink-0">Class Teacher&apos;s Remark:</span>
            <span className="italic text-slate-800 flex-1 border-b border-dotted border-slate-400 pb-0.5">
              &quot;{character.teacherRemark}&quot;
            </span>
          </div>

          <div className="flex items-start gap-2">
            <span className="font-bold text-slate-700 w-36 flex-shrink-0">Headteacher&apos;s Remark:</span>
            <span className="italic text-slate-800 flex-1 border-b border-dotted border-slate-400 pb-0.5 font-medium">
              &quot;{character.headTeacherRemark}&quot;
            </span>
          </div>

          {/* Promotion verdict if 3rd Term */}
          {term === 'THIRD' && (
            <div className="flex items-center gap-2 bg-amber-50 border border-amber-300 p-2 rounded-lg">
              <span className="font-bold text-amber-900">Annual Promotional Status:</span>
              <span className="font-black text-amber-950 uppercase tracking-wider">
                {character.promotionStatus === 'PROMOTED'
                  ? 'PROMOTED TO NEXT CLASS WITH DISTINCTION'
                  : character.promotionStatus || 'PROMOTED'}
              </span>
            </div>
          )}

          {/* Signatures & Seal */}
          <div className="grid grid-cols-3 gap-6 pt-4 text-center">
            <div>
              <div className="h-9 border-b border-slate-800 flex items-center justify-center font-serif text-sm italic text-school-900">
                A. R. Adebayo (TRCN)
              </div>
              <span className="text-[10px] font-semibold text-slate-600 uppercase block mt-1">Class Teacher&apos;s Sign</span>
            </div>

            <div className="flex flex-col items-center justify-center">
              <div className="w-14 h-14 rounded-full border-2 border-school-900 flex flex-col items-center justify-center text-[7px] font-bold text-school-900 uppercase leading-tight rotate-[-12deg]">
                <span>Al-Amaanah</span>
                <span>★ SEAL ★</span>
                <span>Ado-Ekiti</span>
              </div>
              <span className="text-[9px] text-slate-400 mt-1 uppercase">Official Stamp</span>
            </div>

            <div>
              <div className="h-9 border-b border-slate-800 flex items-center justify-center font-serif text-sm italic text-school-900">
                Ustadh M. A. Bello
              </div>
              <span className="text-[10px] font-semibold text-slate-600 uppercase block mt-1">Headteacher&apos;s Sign & Date</span>
            </div>
          </div>
        </div>

        {/* Term Dates & Next Session Notice */}
        <div className="bg-school-50 border border-school-200 rounded-lg p-2.5 text-center text-[11px] text-slate-700 flex flex-wrap justify-around gap-2">
          <div>
            <span className="text-slate-500 font-medium">Term Vacation: </span>
            <span className="font-bold text-slate-900">{session.vacationDate}</span>
          </div>
          <div className="text-slate-300">•</div>
          <div>
            <span className="text-slate-500 font-medium">Next Term Resumption: </span>
            <span className="font-bold text-school-800">{session.nextTermResumptionDate}</span>
          </div>
          <div className="text-slate-300">•</div>
          <div>
            <span className="text-slate-500 font-medium">Next Term Fees Due: </span>
            <span className="font-bold text-rose-700">{session.feesDeadline}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
