import React from 'react';
import { isSameDate, isDateInRange, getTodayString } from '@/utils/dateUtils';
import { getHoliday } from '@/utils/holidays';

export const DayCell = ({ day, startDate, endDate, onDateClick, hasNotes }) => {
  const isStart = isSameDate(day.dateString, startDate);
  const isEnd = isSameDate(day.dateString, endDate);
  const isInRange = isDateInRange(day.dateString, startDate, endDate);
  const isToday = isSameDate(day.dateString, getTodayString());
  const holiday = getHoliday(day.dateString);

  const getCellClassName = () => {
    let classes = 'relative h-[48px] sm:h-[52px] lg:h-[52px] border-[0.5px] border-slate-200/60 dark:border-slate-700/40 p-1 sm:p-1.5 cursor-pointer transition-all duration-150';

    if (!day.isCurrentMonth) {
      classes += ' bg-slate-50/40 dark:bg-slate-900/30';
    } else {
      classes += ' hover:bg-sky-50/60 dark:hover:bg-sky-900/10';
    }

    if (isStart || isEnd) {
      classes += ' !bg-sky-500 dark:!bg-sky-600 hover:!bg-sky-600 scale-[1.01] z-10';
    } else if (isInRange) {
      classes += ' !bg-sky-100/80 dark:!bg-sky-500/15';
    }

    return classes;
  };

  const getDateClassName = () => {
    let classes = 'inline-flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 text-xs sm:text-sm font-semibold rounded-lg transition-all';

    if (isStart || isEnd) {
      classes += ' text-white';
    } else if (!day.isCurrentMonth) {
      classes += ' text-slate-300 dark:text-slate-600';
    } else {
      classes += ' text-slate-800 dark:text-slate-200';
    }

    if (isToday && !isStart && !isEnd) {
      classes += ' ring-2 ring-sky-400 dark:ring-sky-500 bg-sky-50 dark:bg-sky-900/30';
    }

    return classes;
  };

  return (
    <div
      onClick={() => onDateClick(day.dateString)}
      data-testid={`date-cell-${day.dateString}`}
      className={getCellClassName()}
    >
      <div className="flex flex-col h-full">
        <div className="flex justify-end">
          <span className={getDateClassName()} style={{ fontFamily: 'Outfit, sans-serif' }}>
            {day.date}
          </span>
        </div>

        {holiday && day.isCurrentMonth && (
          <div className="mt-0.5 text-[9px] sm:text-[10px] text-center leading-none truncate" title={holiday.name}>
            {holiday.emoji}
          </div>
        )}

        {hasNotes && day.isCurrentMonth && !isStart && !isEnd && (
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2">
            <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-sky-500 dark:bg-sky-400" data-testid="note-indicator" />
          </div>
        )}
      </div>
    </div>
  );
};

export default DayCell;
