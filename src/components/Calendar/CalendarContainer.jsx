import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import HeroBanner from './HeroBanner';
import SpiralBinding from './SpiralBinding';
import MonthHeader from './MonthHeader';
import DateGrid from './DateGrid';
import DateNoteEditor from '../Notes/DateNoteEditor';
import MobileNotesSheet from '../Notes/MobileNotesSheet';
import ThemeToggle from './ThemeToggle';
import TodayButton from './TodayButton';
import ExportMenu from './ExportMenu';
import MonthDots from './MonthDots';
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
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState('next');
  const [mobileNotesOpen, setMobileNotesOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const savedNotes = localStorage.getItem('calendar-date-notes');
    const savedTheme = localStorage.getItem('calendar-theme');
    if (savedNotes) {
      try { setDateNotes(JSON.parse(savedNotes)); } catch (e) { /* ignore */ }
    }
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('calendar-date-notes', JSON.stringify(dateNotes));
  }, [dateNotes]);

  useEffect(() => {
    localStorage.setItem('calendar-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const triggerFlip = useCallback((direction, callback) => {
    if (isFlipping) return;
    setFlipDirection(direction);
    setIsFlipping(true);
    setTimeout(() => {
      callback();
      setTimeout(() => setIsFlipping(false), 350);
    }, 50);
  }, [isFlipping]);

  const handlePrevMonth = useCallback(() => {
    triggerFlip('prev', () => {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(y => y - 1);
      } else {
        setCurrentMonth(m => m - 1);
      }
    });
  }, [currentMonth, triggerFlip]);

  const handleNextMonth = useCallback(() => {
    triggerFlip('next', () => {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(y => y + 1);
      } else {
        setCurrentMonth(m => m + 1);
      }
    });
  }, [currentMonth, triggerFlip]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT') return;
      if (e.key === 'ArrowLeft') handlePrevMonth();
      else if (e.key === 'ArrowRight') handleNextMonth();
      else if (e.key === 'Escape') { setStartDate(null); setEndDate(null); }
      else if (e.key === 't' || e.key === 'T') handleGoToToday();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrevMonth, handleNextMonth]);

  const handleDateClick = (dateString) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(dateString);
      setEndDate(null);
    } else {
      if (dateString > startDate) {
        setEndDate(dateString);
      } else if (dateString < startDate) {
        setEndDate(startDate);
        setStartDate(dateString);
      } else {
        setEndDate(dateString);
      }
    }
    if (isMobile) setMobileNotesOpen(true);
  };

  const handleSaveNote = (noteKey, noteText) => {
    if (noteText.trim()) {
      setDateNotes(prev => ({ ...prev, [noteKey]: noteText }));
      toast.success('Note saved!', { duration: 2000 });
    } else {
      handleDeleteNote(noteKey);
    }
  };

  const handleDeleteNote = (noteKey) => {
    setDateNotes(prev => {
      const n = { ...prev };
      delete n[noteKey];
      return n;
    });
    toast.success('Note deleted', { duration: 2000 });
  };

  const handleCloseNote = () => {
    setStartDate(null);
    setEndDate(null);
    setMobileNotesOpen(false);
  };

  const handleToggleTheme = () => {
    setIsDarkMode(prev => {
      const v = !prev;
      if (v) document.documentElement.classList.add('dark');
      else document.documentElement.classList.remove('dark');
      toast.success(v ? 'Dark mode' : 'Light mode', { duration: 1500 });
      return v;
    });
  };

  const handleGoToToday = () => {
    const t = new Date();
    setCurrentMonth(t.getMonth());
    setCurrentYear(t.getFullYear());
    setStartDate(null);
    setEndDate(null);
    toast.success('Jumped to today', { duration: 1500 });
  };

  const handleExportJSON = () => {
    const data = { notes: dateNotes, exportDate: new Date().toISOString(), version: '2.0' };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `calendar-notes-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success('Exported!', { duration: 2000 });
  };

  const handlePrint = () => window.print();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-500" data-testid="calendar-container">
      <Toaster position="top-center" richColors />
      <ThemeToggle isDark={isDarkMode} onToggle={handleToggleTheme} />

      {/* Hero Banner with AnimatePresence for smooth month transitions */}
      <AnimatePresence mode="wait">
        <HeroBanner key={`${currentMonth}-${currentYear}`} month={currentMonth} year={currentYear} />
      </AnimatePresence>

      <SpiralBinding isDark={isDarkMode} />

      {/* Main Content */}
         <div className="w-full max-w-[1400px] mx-auto px-3 sm:px-4 lg:px-6 py-2 lg:py-3">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5">

          {/* Notes Panel - Desktop only */}
          <div className="hidden lg:block lg:col-span-3 order-2 lg:order-1">
            <div className="glass-strong rounded-2xl p-4 shadow-xl shadow-slate-200/50 dark:shadow-black/20 h-full min-h-[320px] max-h-[calc(100vh-340px)] overflow-hidden flex flex-col" data-testid="notes-panel-desktop">
              <DateNoteEditor
                selectedDates={{ startDate, endDate }}
                notes={dateNotes}
                onSave={handleSaveNote}
                onDelete={handleDeleteNote}
                onClose={handleCloseNote}
              />
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="lg:col-span-9 order-1 lg:order-2">
            {/* Controls row */}
            <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
              <MonthHeader
                month={currentMonth}
                year={currentYear}
                onPrevMonth={handlePrevMonth}
                onNextMonth={handleNextMonth}
                isFlipping={isFlipping}
              />
              <div className="flex gap-2">
                <TodayButton onClick={handleGoToToday} />
                <ExportMenu onExportJSON={handleExportJSON} onPrint={handlePrint} />
              </div>
            </div>

            {/* Month dots navigation */}
            <MonthDots currentMonth={currentMonth} />

            {/* Calendar with page flip */}
            <div className="perspective-[1200px]" style={{ perspective: '1200px' }}>
              <AnimatePresence mode="wait" initial={false}>
                <DateGrid
                  key={`${currentMonth}-${currentYear}`}
                  month={currentMonth}
                  year={currentYear}
                  startDate={startDate}
                  endDate={endDate}
                  onDateClick={handleDateClick}
                  dateNotes={dateNotes}
                  flipDirection={flipDirection}
                />
              </AnimatePresence>
            </div>

            {/* Keyboard hints - desktop only */}
            <div className="hidden sm:block mt-2 text-[11px] text-slate-400 dark:text-slate-500 text-center font-medium tracking-wide" style={{ fontFamily: 'Outfit, sans-serif' }}>
              KEYBOARD: &larr;/&rarr; MONTHS &middot; T TODAY &middot; ESC CLEAR
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Notes Bottom Sheet */}
      {isMobile && (
        <MobileNotesSheet
          isOpen={mobileNotesOpen}
          onClose={() => setMobileNotesOpen(false)}
          selectedDates={{ startDate, endDate }}
          notes={dateNotes}
          onSave={handleSaveNote}
          onDelete={handleDeleteNote}
          onCloseNote={handleCloseNote}
        />
      )}

      {/* Mobile FAB to open notes */}
      {isMobile && startDate && !mobileNotesOpen && (
        <button
          onClick={() => setMobileNotesOpen(true)}
          data-testid="mobile-notes-fab"
          className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-sky-500 text-white shadow-lg shadow-sky-500/30 flex items-center justify-center hover:bg-sky-600 active:scale-95 transition-all"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z"/></svg>
        </button>
      )}
    </div>
  );
};

export default CalendarContainer;
