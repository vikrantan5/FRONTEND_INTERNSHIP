import React from 'react';
import { DayCell } from './DayCell';
import { generateCalendarGrid } from '@/utils/dateUtils';

const DAYS_OF_WEEK = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

export const DateGrid = ({ month, year, startDate, endDate, onDateClick, dateNotes }) => {
  const calendarDays = generateCalendarGrid(year, month);
  
  const hasNotes = (dateString) => {
    // Check for single date note
    if (dateNotes[dateString]) return true;
    
    // Check if this date is part of any range note
    for (const key in dateNotes) {
      if (key.includes('_')) {
        const [rangeStart, rangeEnd] = key.split('_');
        if (dateString >= rangeStart && dateString <= rangeEnd) {
          return true;
        }
      }
    }
    
    return false;
  };
  
  return (
    <div className="w-full" data-testid="date-grid">
      {/* Days of week header */}
      <div className="grid grid-cols-7 mb-1">
        {DAYS_OF_WEEK.map((day, index) => (
          <div
            key={day}
            className={`text-center py-3 text-xs sm:text-sm font-medium tracking-[0.2em] transition-colors ${
              index >= 5 ? 'text-[#0EA5E9] dark:text-[#38BDF8]' : 'text-slate-600 dark:text-slate-400'
            }`}
            style={{ fontFamily: 'Manrope, sans-serif' }}
          >
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar grid */}
      <div className="grid grid-cols-7 border-l border-t border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden shadow-lg">
        {calendarDays.map((day, index) => (
          <DayCell
            key={`${day.dateString}-${index}`}
            day={day}
            startDate={startDate}
            endDate={endDate}
            onDateClick={onDateClick}
            hasNotes={hasNotes(day.dateString)}
          />
        ))}
      </div>
    </div>
  );
};

export default DateGrid;