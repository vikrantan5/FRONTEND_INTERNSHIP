import React from 'react';

const MONTH_LABELS = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];

export const MonthDots = ({ currentMonth }) => {
  return (
    <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-3" data-testid="month-dots">
      {MONTH_LABELS.map((label, i) => (
        <div
          key={i}
          className={`flex items-center justify-center rounded-full transition-all duration-300 ${
            i === currentMonth
              ? 'w-6 h-6 sm:w-7 sm:h-7 bg-sky-500 text-white text-[9px] sm:text-[10px] font-bold shadow-md shadow-sky-500/30'
              : 'w-4 h-4 sm:w-5 sm:h-5 bg-slate-200/80 dark:bg-slate-700/60 text-slate-400 dark:text-slate-500 text-[8px] sm:text-[9px] font-medium hover:bg-slate-300 dark:hover:bg-slate-600'
          }`}
          data-testid={`month-dot-${i}`}
          style={{ fontFamily: 'Outfit, sans-serif' }}
        >
          {label}
        </div>
      ))}
    </div>
  );
};

export default MonthDots;
