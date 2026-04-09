import React from 'react';
import { motion } from 'framer-motion';
import { DayCell } from './DayCell';
import { generateCalendarGrid } from '@/utils/dateUtils';

const DAYS_OF_WEEK = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

export const DateGrid = ({ month, year, startDate, endDate, onDateClick, dateNotes, flipDirection }) => {
  const calendarDays = generateCalendarGrid(year, month);

  const hasNotes = (dateString) => {
    if (dateNotes[dateString]) return true;
    for (const key in dateNotes) {
      if (key.includes('_')) {
        const [rangeStart, rangeEnd] = key.split('_');
        if (dateString >= rangeStart && dateString <= rangeEnd) return true;
      }
    }
    return false;
  };

  const flipVariants = {
    initial: {
      rotateY: flipDirection === 'next' ? 90 : -90,
      opacity: 0,
      transformOrigin: flipDirection === 'next' ? 'left center' : 'right center',
    },
    animate: {
      rotateY: 0,
      opacity: 1,
      transformOrigin: flipDirection === 'next' ? 'left center' : 'right center',
      transition: {
        rotateY: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
        opacity: { duration: 0.3 },
      },
    },
    exit: {
      rotateY: flipDirection === 'next' ? -90 : 90,
      opacity: 0,
      transformOrigin: flipDirection === 'next' ? 'right center' : 'left center',
      transition: {
        rotateY: { duration: 0.35, ease: [0.55, 0.06, 0.68, 0.19] },
        opacity: { duration: 0.25 },
      },
    },
  };

  return (
    <motion.div
      className="w-full"
      data-testid="date-grid"
      variants={flipVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ backfaceVisibility: 'hidden' }}
    >
      {/* Days of week header */}
      <div className="grid grid-cols-7 mb-1">
        {DAYS_OF_WEEK.map((day, index) => (
          <div
            key={day}
            className={`text-center py-1.5 text-[10px] sm:text-xs font-semibold tracking-[0.15em] transition-colors ${
              index >= 5 ? 'text-sky-500 dark:text-sky-400' : 'text-slate-500 dark:text-slate-400'
            }`}
            style={{ fontFamily: 'Outfit, sans-serif' }}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 glass-strong rounded-2xl overflow-hidden shadow-xl shadow-slate-200/40 dark:shadow-black/30">
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
    </motion.div>
  );
};

export default DateGrid;
