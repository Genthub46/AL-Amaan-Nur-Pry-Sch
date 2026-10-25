import React from 'react';

interface SchoolLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  variant?: 'light' | 'dark' | 'print';
}

export const SchoolLogo: React.FC<SchoolLogoProps> = ({
  className = '',
  size = 48,
  showText = false,
  variant = 'light',
}) => {
  const isDark = variant === 'dark';
  const isPrint = variant === 'print';

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        {/* Outer Shield / Seal */}
        <circle cx="50" cy="50" r="48" fill={isPrint ? "#FFFFFF" : isDark ? "#0F294A" : "#1E3A8A"} stroke="#D97706" strokeWidth="3" />
        <circle cx="50" cy="50" r="43" fill="none" stroke="#BFDBFE" strokeWidth="1" strokeDasharray="3 2" />

        {/* Crescent and Star */}
        <path
          d="M 50 18 A 12 12 0 1 0 50 38 A 9.5 9.5 0 1 1 50 20 Z"
          fill="#F59E0B"
        />
        <polygon
          points="58,25 60,29 64,29 61,32 62,36 58,33 54,36 55,32 52,29 56,29"
          fill="#F59E0B"
        />

        {/* Open Book of Knowledge (Holy Quran / Knowledge) */}
        <path
          d="M 22 62 C 32 58, 45 59, 50 63 C 55 59, 68 58, 78 62 L 78 78 C 68 74, 55 75, 50 79 C 45 75, 32 74, 22 78 Z"
          fill="#FFFFFF"
          stroke="#0F294A"
          strokeWidth="1.5"
        />
        {/* Spine */}
        <line x1="50" y1="63" x2="50" y2="79" stroke="#D97706" strokeWidth="2" />
        {/* Book lines / text suggestion */}
        <line x1="28" y1="66" x2="44" y2="64" stroke="#93C5FD" strokeWidth="1" />
        <line x1="28" y1="70" x2="44" y2="68" stroke="#93C5FD" strokeWidth="1" />
        <line x1="56" y1="64" x2="72" y2="66" stroke="#93C5FD" strokeWidth="1" />
        <line x1="56" y1="68" x2="72" y2="70" stroke="#93C5FD" strokeWidth="1" />

        {/* Radiating Light Rays */}
        <line x1="50" y1="44" x2="50" y2="52" stroke="#FDE68A" strokeWidth="2" strokeLinecap="round" />
        <line x1="42" y1="46" x2="46" y2="53" stroke="#FDE68A" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="58" y1="46" x2="54" y2="53" stroke="#FDE68A" strokeWidth="1.5" strokeLinecap="round" />

        {/* Laurel / Wreath Base */}
        <path
          d="M 20 78 C 30 88, 70 88, 80 78"
          stroke="#059669"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      {showText && (
        <div className="flex flex-col whitespace-nowrap leading-none">
          <span
            className={`font-black tracking-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            } ${size > 40 ? 'text-lg' : 'text-base'}`}
          >
            AL-AMAANAH
          </span>
          <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider mt-0.5">
            Nursery & Primary School
          </span>
          <span className="text-[10px] text-slate-400 font-medium mt-0.5">Ado-Ekiti, Nigeria</span>
        </div>
      )}
    </div>
  );
};
