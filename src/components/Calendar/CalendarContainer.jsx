import React, { useState, useEffect } from 'react';
import HeroBanner from './HeroBanner';
import SpiralBinding from './SpiralBinding';
import MonthHeader from './MonthHeader';
import DateGrid from './DateGrid';
import DateNoteEditor from '../Notes/DateNoteEditor';
import ThemeToggle from './ThemeToggle';
import TodayButton from './TodayButton';
import ExportMenu from './ExportMenu';
import { getTodayString } from '@/utils/dateUtils';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';

export const CalendarContainer = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [dateNotes, setDateNotes] = useState({});
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Load from localStorage on mount
  useEffect(() => {
    const savedNotes = localStorage.getItem('calendar-date-notes');
    const savedTheme = localStorage.getItem('calendar-theme');
    
    if (savedNotes) {
      try {
        setDateNotes(JSON.parse(savedNotes));
      } catch (e) {
        console.error('Failed to load notes:', e);
      }
    }
    
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);
  
  // Save notes to localStorage
  useEffect(() => {
    localStorage.setItem('calendar-date-notes', JSON.stringify(dateNotes));
  }, [dateNotes]);
  
  // Save theme preference
  useEffect(() => {
    localStorage.setItem('calendar-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);
  
  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger if user is typing in textarea
      if (e.target.tagName === 'TEXTAREA') return;
      
      if (e.key === 'ArrowLeft') {
        handlePrevMonth();
      } else if (e.key === 'ArrowRight') {
        handleNextMonth();
      } else if (e.key === 'Escape') {
        setStartDate(null);
        setEndDate(null);
      } else if (e.key === 't' || e.key === 'T') {
        handleGoToToday();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentMonth, currentYear]);
  
  const handlePrevMonth = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
    
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };
  
  const handleNextMonth = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
    
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
      } else if (dateString < startDate) {
        setEndDate(startDate);
        setStartDate(dateString);
      } else {
        // Same date clicked
        setEndDate(dateString);
      }
    }
  };
  
  const handleSaveNote = (noteKey, noteText) => {
    if (noteText.trim()) {
      setDateNotes(prev => ({
        ...prev,
        [noteKey]: noteText
      }));
      toast.success('Note saved successfully!', {
        description: 'Your note has been saved to local storage',
        duration: 2000
      });
    } else {
      handleDeleteNote(noteKey);
    }
  };
  
  const handleDeleteNote = (noteKey) => {
    setDateNotes(prev => {
      const newNotes = { ...prev };
      delete newNotes[noteKey];
      return newNotes;
    });
    toast.success('Note deleted', {
      duration: 2000
    });
  };
  
  const handleCloseNote = () => {
    setStartDate(null);
    setEndDate(null);
  };
  
  const handleToggleTheme = () => {
    setIsDarkMode(prev => {
      const newValue = !prev;
      if (newValue) {
        document.documentElement.classList.add('dark');
        toast.success('Dark mode enabled', { duration: 1500 });
      } else {
        document.documentElement.classList.remove('dark');
        toast.success('Light mode enabled', { duration: 1500 });
      }
      return newValue;
    });
  };
  
  const handleGoToToday = () => {
    const today = new Date();
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
    setStartDate(null);
    setEndDate(null);
    toast.success('Jumped to today', { duration: 1500 });
  };
  
  const handleExportJSON = () => {
    const exportData = {
      notes: dateNotes,
      exportDate: new Date().toISOString(),
      version: '2.0'
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `calendar-notes-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    
    toast.success('Calendar exported!', {
      description: 'Downloaded as JSON file',
      duration: 2000
    });
  };
  
  const handlePrint = () => {
    window.print();
  };
  
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-900 transition-colors duration-300" data-testid="calendar-container">
      <Toaster position="top-center" richColors />
      
      {/* Theme Toggle */}
      <ThemeToggle isDark={isDarkMode} onToggle={handleToggleTheme} />
      
      {/* Hero Banner */}
      <HeroBanner month={currentMonth} year={currentYear} />
      
      {/* Spiral Binding */}
      <SpiralBinding isDark={isDarkMode} />
      
      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Notes Section - Left on desktop, bottom on mobile */}
          <div className="lg:col-span-4 order-2 lg:order-1">
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6 h-full min-h-[400px] sm:min-h-[600px] transition-all duration-300 shadow-lg">
              <DateNoteEditor
                selectedDates={{ startDate, endDate }}
                notes={dateNotes}
                onSave={handleSaveNote}
                onDelete={handleDeleteNote}
                onClose={handleCloseNote}
              />
            </div>
          </div>
          
          {/* Calendar Grid - Right on desktop, top on mobile */}
          <div className={`lg:col-span-8 order-1 lg:order-2 transition-opacity duration-300 ${isAnimating ? 'opacity-50' : 'opacity-100'}`}>
            <div className="flex items-center justify-between mb-6 sm:mb-8 flex-wrap gap-4">
              <MonthHeader
                month={currentMonth}
                year={currentYear}
                onPrevMonth={handlePrevMonth}
                onNextMonth={handleNextMonth}
              />
              <div className="flex gap-2">
                <TodayButton onClick={handleGoToToday} />
                <ExportMenu onExportJSON={handleExportJSON} onPrint={handlePrint} />
              </div>
            </div>
            <DateGrid
              month={currentMonth}
              year={currentYear}
              startDate={startDate}
              endDate={endDate}
              onDateClick={handleDateClick}
              dateNotes={dateNotes}
            />
            
            {/* Keyboard shortcuts hint */}
            <div className="mt-4 text-xs text-slate-500 dark:text-slate-400 text-center" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Keyboard: ←/→ navigate months | T jump to today | ESC clear selection
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarContainer;