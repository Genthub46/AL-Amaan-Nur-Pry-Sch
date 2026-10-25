'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { IslamicPattern } from '@/components/IslamicPattern';
import {
  getClasses,
  getStudents,
  getCharacters,
  getActiveSession,
  saveCharacterAssessment,
} from '@/lib/storage';
import { ClassArm, Student, CharacterAssessment, TermId } from '@/types';
import {
  INITIAL_CLASSES,
  INITIAL_STUDENTS,
} from '@/lib/mockData';
import {
  Star,
  Save,
  CheckCircle,
  FileSpreadsheet,
  Upload,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';

export default function TeacherCharacterPage() {
  const [classes, setClasses] = useState<ClassArm[]>(INITIAL_CLASSES);
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [selectedClassId, setSelectedClassId] = useState<string>('basic-4');
  const [selectedTerm, setSelectedTerm] = useState<TermId>('FIRST');

  const [localChars, setLocalChars] = useState<Record<string, CharacterAssessment>>({});
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const session = getActiveSession();

  useEffect(() => {
    const cls = getClasses();
    const stds = getStudents();
    const allChars = getCharacters();

    setClasses(cls);
    setStudents(stds);

    const classStudents = stds.filter((s) => s.classId === selectedClassId);
    const map: Record<string, CharacterAssessment> = {};

    classStudents.forEach((std) => {
      const existing = allChars.find(
        (c) => c.studentId === std.id && c.sessionId === session.id && c.termId === selectedTerm
      );
      if (existing) {
        map[std.id] = existing;
      } else {
        map[std.id] = {
          id: `char-${std.id}-${session.id}-${selectedTerm}`,
          studentId: std.id,
          sessionId: session.id,
          termId: selectedTerm,
          classId: selectedClassId,
          quranSurahMemorized: 'Surah An-Naba',
          tajweedRating: 5,
          salahAttendance: 5,
          islamicMannerisms: 5,
          adhkarProgress: 'Morning and Evening Adhkar mastered',
          punctuality: 5,
          neatness: 5,
          handwriting: 4,
          attentiveness: 4,
          politeness: 5,
          sports: 4,
          timesSchoolOpened: 118,
          timesPresent: 115,
          timesAbsent: 3,
          teacherRemark: 'Good progress in Western academics and Islamic values.',
          headTeacherRemark: 'Commendable performance.',
          promotionStatus: selectedTerm === 'THIRD' ? 'PROMOTED' : 'N/A',
        };
      }
    });

    setLocalChars(map);
  }, [selectedClassId, selectedTerm]);

  const currentClass = classes.find((c) => c.id === selectedClassId) || classes[0];
  const classStudents = students.filter((s) => s.classId === selectedClassId);

  const updateField = (studentId: string, field: string, val: unknown) => {
    setLocalChars((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [field]: val,
      },
    }));
  };

  const handleSaveAll = () => {
    Object.values(localChars).forEach((item) => {
      saveCharacterAssessment(item);
    });
    setSuccessMsg(`Character, Tahfeez & psychomotor ratings for ${currentClass.name} saved successfully!`);
    setTimeout(() => setSuccessMsg(null), 4000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar activePage="teacher" />

      {/* Top Banner */}
      <div className="bg-school-900 text-white py-6 px-4 sm:px-6 lg:px-8 border-b border-school-800 relative overflow-hidden">
        <IslamicPattern variant="gold" />
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-xs text-amber-300 font-semibold uppercase tracking-wider mb-1">
              <Star className="w-4 h-4 text-emerald-400 fill-emerald-400" />
              <span>Teacher Academic Suite</span>
            </div>
            <h1 className="text-2xl font-black tracking-tight">Tahfeez &amp; Psychomotor Evaluation</h1>
            <p className="text-xs text-slate-300 mt-0.5">
              Grade Holy Quran memorization, Tajweed fluency, congregational Salah, and 1–5 affective behavioral skills
            </p>
          </div>

          <button
            onClick={handleSaveAll}
            className="flex items-center gap-1.5 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all active:scale-95"
          >
            <Save className="w-4 h-4" />
            Save Character Ratings
          </button>
        </div>

        {/* Sub-Nav */}
        <div className="max-w-7xl mx-auto mt-4 pt-4 border-t border-school-800 flex items-center gap-4 text-xs font-semibold relative z-10">
          <Link href="/teacher" className="text-slate-300 hover:text-white transition-colors pb-1">
            Dashboard
          </Link>
          <Link href="/teacher/scores" className="text-slate-300 hover:text-white transition-colors pb-1">
            Live Score Grid
          </Link>
          <Link href="/teacher/excel" className="text-slate-300 hover:text-white transition-colors pb-1">
            Excel Bulk Upload
          </Link>
          <Link href="/teacher/character" className="text-white border-b-2 border-amber-400 pb-1 font-bold">
            Tahfeez &amp; Psychomotor
          </Link>
        </div>
      </div>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {successMsg && (
          <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-4 text-xs font-semibold text-emerald-900 flex items-center gap-2 animate-fade-in">
            <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Controls */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <label className="text-xs font-bold text-slate-500 uppercase">Class:</label>
            <select
              value={selectedClassId}
              onChange={(e) => setSelectedClassId(e.target.value)}
              className="text-xs font-bold bg-slate-50 border border-slate-300 rounded-xl px-3 py-2"
            >
              {classes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.section})
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs font-bold text-slate-500 uppercase">Term:</label>
            <div className="flex rounded-xl bg-slate-100 p-1">
              {(['FIRST', 'SECOND', 'THIRD'] as TermId[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedTerm(t)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                    selectedTerm === t ? 'bg-school-800 text-white shadow-sm' : 'text-slate-600'
                  }`}
                >
                  {t === 'FIRST' ? '1st' : t === 'SECOND' ? '2nd' : '3rd'} Term
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Pupil Character Cards */}
        <div className="space-y-6">
          {classStudents.map((std) => {
            const char = localChars[std.id] || {
              quranSurahMemorized: '',
              tajweedRating: 5,
              salahAttendance: 5,
              islamicMannerisms: 5,
              adhkarProgress: '',
              punctuality: 5,
              neatness: 5,
              handwriting: 4,
              attentiveness: 4,
              politeness: 5,
              sports: 4,
              teacherRemark: '',
            };

            return (
              <div key={std.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="font-extrabold text-base text-school-950">
                      {std.fullName}
                    </h3>
                    <span className="font-mono text-xs text-slate-500">{std.admissionNo} • {std.className}</span>
                  </div>
                  <span className="text-xs bg-school-50 text-school-800 px-3 py-1 rounded-full font-bold">
                    Affective &amp; Tahfeez Record
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                  {/* Islamic Domain */}
                  <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200 space-y-3">
                    <span className="font-bold text-emerald-950 uppercase text-[10px] block">
                      Quran &amp; Islamic Conduct (Akhlaaq)
                    </span>
                    <div>
                      <label className="block text-slate-600 font-semibold mb-1">Surah / Portion Memorized:</label>
                      <input
                        type="text"
                        value={char.quranSurahMemorized}
                        onChange={(e) => updateField(std.id, 'quranSurahMemorized', e.target.value)}
                        placeholder="e.g. Surah An-Naba, An-Nazi'at"
                        className="w-full px-3 py-1.5 border border-slate-300 rounded-xl bg-white"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="block text-slate-600 font-medium mb-1">Tajweed (1-5):</label>
                        <input
                          type="number"
                          min="1"
                          max="5"
                          value={char.tajweedRating}
                          onChange={(e) => updateField(std.id, 'tajweedRating', Number(e.target.value))}
                          className="w-full px-2 py-1.5 border border-slate-300 rounded-xl text-center font-bold bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-600 font-medium mb-1">Salah (1-5):</label>
                        <input
                          type="number"
                          min="1"
                          max="5"
                          value={char.salahAttendance}
                          onChange={(e) => updateField(std.id, 'salahAttendance', Number(e.target.value))}
                          className="w-full px-2 py-1.5 border border-slate-300 rounded-xl text-center font-bold bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-600 font-medium mb-1">Adab (1-5):</label>
                        <input
                          type="number"
                          min="1"
                          max="5"
                          value={char.islamicMannerisms}
                          onChange={(e) => updateField(std.id, 'islamicMannerisms', Number(e.target.value))}
                          className="w-full px-2 py-1.5 border border-slate-300 rounded-xl text-center font-bold bg-white"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-slate-600 font-semibold mb-1">Daily Adhkar Progress:</label>
                      <input
                        type="text"
                        value={char.adhkarProgress}
                        onChange={(e) => updateField(std.id, 'adhkarProgress', e.target.value)}
                        placeholder="e.g. Morning and evening Du'as mastered"
                        className="w-full px-3 py-1.5 border border-slate-300 rounded-xl bg-white"
                      />
                    </div>
                  </div>

                  {/* Psychomotor Skills */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <span className="font-bold text-slate-700 uppercase text-[10px] block">
                      Psychomotor Skills (1 - 5 Scale)
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="block text-slate-600 font-medium mb-1">Neatness:</label>
                        <input
                          type="number"
                          min="1"
                          max="5"
                          value={char.neatness}
                          onChange={(e) => updateField(std.id, 'neatness', Number(e.target.value))}
                          className="w-full px-2 py-1.5 border border-slate-300 rounded-xl text-center font-bold bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-600 font-medium mb-1">Handwriting:</label>
                        <input
                          type="number"
                          min="1"
                          max="5"
                          value={char.handwriting}
                          onChange={(e) => updateField(std.id, 'handwriting', Number(e.target.value))}
                          className="w-full px-2 py-1.5 border border-slate-300 rounded-xl text-center font-bold bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-600 font-medium mb-1">Punctuality:</label>
                        <input
                          type="number"
                          min="1"
                          max="5"
                          value={char.punctuality}
                          onChange={(e) => updateField(std.id, 'punctuality', Number(e.target.value))}
                          className="w-full px-2 py-1.5 border border-slate-300 rounded-xl text-center font-bold bg-white"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-slate-600 font-semibold mb-1">Class Teacher&apos;s Remark:</label>
                      <input
                        type="text"
                        value={char.teacherRemark}
                        onChange={(e) => updateField(std.id, 'teacherRemark', e.target.value)}
                        placeholder="e.g. A polite, enthusiastic and dedicated scholar."
                        className="w-full px-3 py-1.5 border border-slate-300 rounded-xl bg-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
