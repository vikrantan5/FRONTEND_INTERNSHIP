import React from 'react';
import { DayCell } from './DayCell';
import { generateCalendarGrid } from '@/utils/dateUtils';

const DAYS_OF_WEEK = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

export const DateGrid = ({ month, year, startDate, endDate, onDateClick }) => {
  const calendarDays = generateCalendarGrid(year, month);
  
  return (
    <div className="w-full" data-testid="date-grid">
      {/* Days of week header */}
      <div className="grid grid-cols-7 mb-1">
        {DAYS_OF_WEEK.map((day, index) => (
          <div
            key={day}
            className={`text-center py-3 text-xs sm:text-sm font-medium tracking-[0.2em] ${index >= 5 ? 'text-[#0EA5E9]' : 'text-slate-600'}`}
            style={{ fontFamily: 'Manrope, sans-serif' }}
          >
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar grid */}
      <div className="grid grid-cols-7 border-l border-t border-slate-200">
        {calendarDays.map((day, index) => (
          <DayCell
            key={`${day.dateString}-${index}`}
            day={day}
            startDate={startDate}
            endDate={endDate}
            onDateClick={onDateClick}
          />
        ))}
      </div>
    </div>
  );
};

export default DateGrid;