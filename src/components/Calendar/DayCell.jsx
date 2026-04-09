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
    let classes = 'relative min-h-[80px] sm:min-h-[100px] lg:min-h-[120px] border border-slate-200 dark:border-slate-700 p-2 cursor-pointer transition-all duration-200';
    
    if (!day.isCurrentMonth) {
      classes += ' bg-slate-50 dark:bg-slate-900/50';
    } else {
      classes += ' bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/50';
    }
    
    if (isStart || isEnd) {
      classes += ' bg-[#0EA5E9] hover:bg-[#0284C7] scale-[1.02]';
    } else if (isInRange) {
      classes += ' bg-[#E0F2FE] dark:bg-[#0EA5E9]/20';
    }
    
    return classes;
  };
  
  const getDateClassName = () => {
    let classes = 'inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 text-sm sm:text-base font-medium rounded transition-all';
    
    if (isStart || isEnd) {
      classes += ' text-white';
    } else if (!day.isCurrentMonth) {
      classes += ' text-slate-400 dark:text-slate-600';
    } else {
      classes += ' text-slate-900 dark:text-slate-100';
    }
    
    if (isToday && !isStart && !isEnd) {
      classes += ' ring-2 ring-[#38BDF8] dark:ring-[#0EA5E9]';
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
        {/* Date number */}
        <div className="flex justify-end">
          <span className={getDateClassName()} style={{ fontFamily: 'Manrope, sans-serif' }}>
            {day.date}
          </span>
        </div>
        
        {/* Holiday indicator */}
        {holiday && day.isCurrentMonth && (
          <div className="mt-1 text-xs text-center" title={holiday.name}>
            {holiday.emoji}
          </div>
        )}
        
        {/* Notes indicator */}
        {hasNotes && day.isCurrentMonth && !isStart && !isEnd && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#0EA5E9] dark:bg-[#38BDF8]" data-testid="note-indicator" />
          </div>
        )}
      </div>
    </div>
  );
};

export default DayCell;