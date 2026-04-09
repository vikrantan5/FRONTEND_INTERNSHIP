import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getMonthName } from '@/utils/dateUtils';

export const MonthHeader = ({ month, year, onPrevMonth, onNextMonth }) => {
  return (
    <div className="flex items-center gap-4" data-testid="month-header">
      <button
        onClick={onPrevMonth}
        data-testid="prev-month-btn"
        className="p-2 border border-slate-300 dark:border-slate-600 rounded hover:bg-slate-100 dark:hover:bg-slate-700 transition-all hover:scale-110"
        aria-label="Previous month"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-slate-700 dark:text-slate-300" strokeWidth={1.5} />
      </button>
      
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100" style={{ fontFamily: 'Cabinet Grotesk, sans-serif' }}>
        {getMonthName(month)} {year}
      </h2>
      
      <button
        onClick={onNextMonth}
        data-testid="next-month-btn"
        className="p-2 border border-slate-300 dark:border-slate-600 rounded hover:bg-slate-100 dark:hover:bg-slate-700 transition-all hover:scale-110"
        aria-label="Next month"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-slate-700 dark:text-slate-300" strokeWidth={1.5} />
      </button>
    </div>
  );
};

export default MonthHeader;