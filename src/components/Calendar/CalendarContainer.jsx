import React, { useState, useEffect } from 'react';
import HeroBanner from './HeroBanner';
import SpiralBinding from './SpiralBinding';
import MonthHeader from './MonthHeader';
import DateGrid from './DateGrid';
import NotesSection from '../Notes/NotesSection';

export const CalendarContainer = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [monthlyNotes, setMonthlyNotes] = useState({});
  
  // Load from localStorage on mount
  useEffect(() => {
    const savedNotes = localStorage.getItem('calendar-notes');
    if (savedNotes) {
      try {
        setMonthlyNotes(JSON.parse(savedNotes));
      } catch (e) {
        console.error('Failed to load notes:', e);
      }
    }
  }, []);
  
  // Save notes to localStorage
  useEffect(() => {
    localStorage.setItem('calendar-notes', JSON.stringify(monthlyNotes));
  }, [monthlyNotes]);
  
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };
  
  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };
  
  const handleDateClick = (dateString) => {
    if (!startDate || (startDate && endDate)) {
      // First click or reset
      setStartDate(dateString);
      setEndDate(null);
    } else {
      // Second click
      if (dateString > startDate) {
        setEndDate(dateString);
      } else {
        // If clicked date is before start, make it the new start
        setEndDate(startDate);
        setStartDate(dateString);
      }
    }
  };
  
  const handleNotesChange = (notes) => {
    const key = `${currentYear}-${currentMonth}`;
    setMonthlyNotes(prev => ({
      ...prev,
      [key]: notes
    }));
  };
  
  const currentNotes = monthlyNotes[`${currentYear}-${currentMonth}`] || '';
  
  return (
    <div className="min-h-screen bg-[#F8FAFC]" data-testid="calendar-container">
      {/* Hero Banner */}
      <HeroBanner month={currentMonth} year={currentYear} />
      
      {/* Spiral Binding */}
      <SpiralBinding />
      
      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Notes Section - Left on desktop, bottom on mobile */}
          <div className="lg:col-span-4 order-2 lg:order-1">
            <NotesSection
              month={currentMonth}
              year={currentYear}
              notes={currentNotes}
              onNotesChange={handleNotesChange}
            />
          </div>
          
          {/* Calendar Grid - Right on desktop, top on mobile */}
          <div className="lg:col-span-8 order-1 lg:order-2">
            <MonthHeader
              month={currentMonth}
              year={currentYear}
              onPrevMonth={handlePrevMonth}
              onNextMonth={handleNextMonth}
            />
            <DateGrid
              month={currentMonth}
              year={currentYear}
              startDate={startDate}
              endDate={endDate}
              onDateClick={handleDateClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarContainer;