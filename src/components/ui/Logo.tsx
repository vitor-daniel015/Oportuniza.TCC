import React from 'react';

export const Logo: React.FC<{ className?: string, showText?: boolean }> = ({ className, showText = true }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative w-10 h-10 flex items-center justify-center">
        {/* Simple SVG approximation of the Oportuniza logo */}
        <svg viewBox="0 0 100 100" className="w-full h-full text-brand-blue-depth overflow-visible">
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="6" />
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#4DA25A', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#9ACE5F', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          <path d="M 50 20 L 50 80 M 35 35 L 50 20 L 65 35" stroke="url(#grad1)" strokeWidth="8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="50" cy="40" r="8" fill="currentColor" />
          <path d="M 30 70 L 40 70 M 32 60 L 42 60 M 34 50 L 44 50" stroke="currentColor" strokeWidth="3" />
        </svg>
      </div>
      {showText && <span className="text-2xl font-bold text-brand-blue-depth tracking-tight">Oportuniza</span>}
    </div>
  );
};
