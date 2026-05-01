import React from 'react';

export const Logo: React.FC<{ className?: string; showText?: boolean }> = ({ className, showText = true }) => {
  return (
    <div className={`flex items-center gap-2 ${className ?? ''}`}>
      <img
        src="/Logo.png"
        alt="Oportuniza logo"
        className="w-10 h-10 object-contain"
      />
      {showText && <span className="text-2xl font-bold text-brand-blue-depth tracking-tight">Oportuniza</span>}
    </div>
  );
};
