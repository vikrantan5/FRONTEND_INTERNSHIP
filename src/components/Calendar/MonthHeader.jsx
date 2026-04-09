import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getMonthName } from '@/utils/dateUtils';

export const MonthHeader = ({ month, year, onPrevMonth, onNextMonth, isFlipping }) => {
  return (
    <div className="flex items-center gap-3" data-testid="month-header">
      <button
        onClick={onPrevMonth}
        disabled={isFlipping}
        data-testid="prev-month-btn"
        className="p-1.5 sm:p-2 rounded-xl glass hover:bg-sky-50 dark:hover:bg-sky-900/20 transition-all active:scale-90 disabled:opacity-50 shadow-sm"
        aria-label="Previous month"
      >
        <ChevronLeft className="w-5 h-5 text-slate-700 dark:text-slate-300" strokeWidth={2} />
      </button>

      <h2
        className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 select-none"
        style={{ fontFamily: 'Cabinet Grotesk, sans-serif' }}
      >
        {getMonthName(month)} {year}
      </h2>

      <button
        onClick={onNextMonth}
        disabled={isFlipping}
        data-testid="next-month-btn"
        className="p-1.5 sm:p-2 rounded-xl glass hover:bg-sky-50 dark:hover:bg-sky-900/20 transition-all active:scale-90 disabled:opacity-50 shadow-sm"
        aria-label="Next month"
      >
        <ChevronRight className="w-5 h-5 text-slate-700 dark:text-slate-300" strokeWidth={2} />
      </button>
    </div>
  );
};

export default MonthHeader;
