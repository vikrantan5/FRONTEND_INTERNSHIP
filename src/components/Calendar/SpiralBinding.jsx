import React from 'react';

export const SpiralBinding = ({ isDark }) => {
  const spirals = Array.from({ length: 14 });

  return (
    <div className="w-full py-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm flex justify-center items-center gap-3 sm:gap-5 transition-colors duration-300" data-testid="spiral-binding">
      {spirals.map((_, i) => (
        <div
          key={i}
          className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-colors duration-300 ${
            isDark ? 'bg-slate-600' : 'bg-slate-700'
          }`}
          style={{ boxShadow: 'inset 0 1.5px 3px rgba(0,0,0,0.35)' }}
        />
      ))}
    </div>
  );
};

export default SpiralBinding;
