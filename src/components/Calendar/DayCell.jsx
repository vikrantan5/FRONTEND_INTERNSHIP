import React from 'react';
import { isSameDate, isDateInRange, getTodayString } from '@/utils/dateUtils';

export const DayCell = ({ day, startDate, endDate, onDateClick }) => {
  const isStart = isSameDate(day.dateString, startDate);
  const isEnd = isSameDate(day.dateString, endDate);
  const isInRange = isDateInRange(day.dateString, startDate, endDate);
  const isToday = isSameDate(day.dateString, getTodayString());
  
  const getCellClassName = () => {
    let classes = 'relative min-h-[80px] sm:min-h-[100px] lg:min-h-[120px] border border-slate-200 p-2 cursor-pointer transition-colors';
    
    if (!day.isCurrentMonth) {
      classes += ' bg-slate-50';
    } else {
      classes += ' bg-white hover:bg-slate-50';
    }
    
    if (isStart || isEnd) {
      classes += ' bg-[#0EA5E9] hover:bg-[#0284C7]';
    } else if (isInRange) {
      classes += ' bg-[#E0F2FE]';
    }
    
    return classes;
  };
  
  const getDateClassName = () => {
    let classes = 'inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 text-sm sm:text-base font-medium rounded';
    
    if (isStart || isEnd) {
      classes += ' text-white';
    } else if (!day.isCurrentMonth) {
      classes += ' text-slate-400';
    } else {
      classes += ' text-slate-900';
    }
    
    if (isToday && !isStart && !isEnd) {
      classes += ' ring-2 ring-[#38BDF8]';
    }
    
    return classes;
  };
  
  return (
    <div
      onClick={() => onDateClick(day.dateString)}
      data-testid={`date-cell-${day.dateString}`}
      className={getCellClassName()}
    >
      <div className="flex justify-end">
        <span className={getDateClassName()} style={{ fontFamily: 'Manrope, sans-serif' }}>
          {day.date}
        </span>
      </div>
    </div>
  );
};

export default DayCell;