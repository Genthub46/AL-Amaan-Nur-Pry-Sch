import React from 'react';

interface IslamicPatternProps {
  className?: string;
  variant?: 'subtle' | 'gold' | 'border' | 'divider';
}

/**
 * Tasteful, subtle Islamic geometric ornaments and dividers.
 * Designed to add authentic Islamic elegance without clutter or visual noise.
 */
export const IslamicPattern: React.FC<IslamicPatternProps> = ({
  className = '',
  variant = 'subtle',
}) => {
  if (variant === 'divider') {
    return (
      <div className={`flex items-center justify-center gap-3 my-6 text-amber-500/80 ${className}`}>
        <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent via-amber-400/50 to-amber-500/80" />
        <span className="text-sm font-arabic select-none text-amber-600">۞</span>
        <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent via-amber-400/50 to-amber-500/80" />
      </div>
    );
  }

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden select-none ${className}`}
      aria-hidden="true"
    >
      <svg
        className={`w-full h-full ${
          variant === 'gold' ? 'opacity-[0.05] text-amber-400' : 'opacity-[0.03] text-school-900'
        }`}
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <defs>
          <pattern
            id="islamic-star-pattern"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            {/* 8-point Islamic Star & Girih Interlace Motif */}
            <path
              d="M30 5 L35 20 L50 20 L38 30 L45 45 L30 35 L15 45 L22 30 L10 20 L25 20 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.75"
            />
            <circle cx="30" cy="30" r="14" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
            <path
              d="M0 0 L15 15 M60 0 L45 15 M0 60 L15 45 M60 60 L45 45"
              stroke="currentColor"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#islamic-star-pattern)" />
      </svg>
    </div>
  );
};
