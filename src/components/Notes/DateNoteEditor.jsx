import React, { useState, useEffect } from 'react';
import { X, Save, Trash2 } from 'lucide-react';
import { getMonthName } from '@/utils/dateUtils';

export const DateNoteEditor = ({ selectedDates, notes, onSave, onDelete, onClose }) => {
  const { startDate, endDate } = selectedDates;
  const noteKey = startDate && endDate ? `${startDate}_${endDate}` : startDate;
  const [noteText, setNoteText] = useState('');

  useEffect(() => {
    setNoteText(noteKey ? (notes[noteKey] || '') : '');
  }, [noteKey, notes]);

  if (!startDate) {
    return (
      <div className="w-full h-full flex items-center justify-center" data-testid="no-date-selected">
        <div className="text-center text-slate-400 dark:text-slate-500 px-4">
          <div className="w-10 h-10 mx-auto mb-3 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-300 dark:text-slate-600"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
          </div>
          <p className="text-sm font-medium" style={{ fontFamily: 'Outfit, sans-serif' }}>Select a date to add notes</p>
          <p className="text-xs mt-1 text-slate-300 dark:text-slate-600">Click once for single, twice for range</p>
        </div>
      </div>
    );
  }

  const formatDateRange = () => {
    if (!startDate) return '';
    const start = new Date(startDate);
    const startMonth = getMonthName(start.getMonth());
    const startDay = start.getDate();
    if (!endDate || startDate === endDate) {
      return `${startMonth} ${startDay}, ${start.getFullYear()}`;
    }
    const end = new Date(endDate);
    const endMonth = getMonthName(end.getMonth());
    const endDay = end.getDate();
    if (start.getMonth() === end.getMonth()) {
      return `${startMonth} ${startDay}-${endDay}, ${start.getFullYear()}`;
    }
    return `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${start.getFullYear()}`;
  };

  return (
    <div className="w-full h-full flex flex-col" data-testid="date-note-editor">
      <div className="flex items-center justify-between mb-3 pb-3 border-b border-slate-200/60 dark:border-slate-700/40">
        <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 truncate" style={{ fontFamily: 'Cabinet Grotesk, sans-serif' }}>
          {formatDateRange()}
        </h3>
        <button
          onClick={onClose}
          data-testid="close-note-btn"
          className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors flex-shrink-0"
        >
          <X className="w-4 h-4 text-slate-400" strokeWidth={2} />
        </button>
      </div>

      <textarea
        data-testid="date-note-input"
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
        placeholder="Write your notes here..."
        className="flex-1 p-3 bg-amber-50/50 dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-700/30 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-sky-400/50 text-sm text-slate-700 dark:text-slate-300 custom-scrollbar"
        style={{
          fontFamily: 'Outfit, sans-serif',
          backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, rgba(226,232,240,0.3) 27px, rgba(226,232,240,0.3) 28px)',
          lineHeight: '28px',
        }}
      />

      <div className="flex gap-2 mt-3">
        <button
          onClick={() => onSave(noteKey, noteText)}
          data-testid="save-note-btn"
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-sky-500 text-white rounded-xl hover:bg-sky-600 transition-all active:scale-[0.97] text-sm font-semibold shadow-md shadow-sky-500/20"
          style={{ fontFamily: 'Outfit, sans-serif' }}
        >
          <Save className="w-3.5 h-3.5" strokeWidth={2.5} />
          Save
        </button>

        {notes[noteKey] && (
          <button
            onClick={() => { onDelete(noteKey); setNoteText(''); }}
            data-testid="delete-note-btn"
            className="px-3 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all active:scale-[0.97] shadow-md shadow-red-500/20"
          >
            <Trash2 className="w-3.5 h-3.5" strokeWidth={2.5} />
          </button>
        )}
      </div>
    </div>
  );
};

export default DateNoteEditor;
