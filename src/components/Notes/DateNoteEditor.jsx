import React, { useState } from 'react';
import { X, Save, Trash2 } from 'lucide-react';
import { getMonthName } from '@/utils/dateUtils';

export const DateNoteEditor = ({ selectedDates, notes, onSave, onDelete, onClose }) => {
  const { startDate, endDate } = selectedDates;
  const noteKey = startDate && endDate ? `${startDate}_${endDate}` : startDate;
  const [noteText, setNoteText] = useState(notes[noteKey] || '');
  
  if (!startDate) {
    return (
      <div className="w-full h-full flex items-center justify-center" data-testid="no-date-selected">
        <div className="text-center text-slate-500 dark:text-slate-400">
          <p className="text-lg" style={{ fontFamily: 'Manrope, sans-serif' }}>Select a date or date range to add notes</p>
          <p className="text-sm mt-2">Click once for single date, twice for range</p>
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
  
  const handleSave = () => {
    onSave(noteKey, noteText);
  };
  
  const handleDelete = () => {
    onDelete(noteKey);
    setNoteText('');
  };
  
  return (
    <div className="w-full h-full flex flex-col" data-testid="date-note-editor">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-200 dark:border-slate-700">
        <h3 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-slate-100" style={{ fontFamily: 'Cabinet Grotesk, sans-serif' }}>
          {formatDateRange()}
        </h3>
        <button
          onClick={onClose}
          data-testid="close-note-btn"
          className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors"
        >
          <X className="w-5 h-5 text-slate-600 dark:text-slate-400" strokeWidth={1.5} />
        </button>
      </div>
      
      {/* Note input */}
      <textarea
        data-testid="date-note-input"
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
        placeholder="Write your notes here..."
        className="flex-1 p-4 bg-[#FFFEF7] dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] text-slate-700 dark:text-slate-300"
        style={{
          fontFamily: 'Manrope, sans-serif',
          backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, rgba(226, 232, 240, 0.5) 31px, rgba(226, 232, 240, 0.5) 32px)',
          lineHeight: '32px'
        }}
      />
      
      {/* Actions */}
      <div className="flex gap-3 mt-4">
        <button
          onClick={handleSave}
          data-testid="save-note-btn"
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#0EA5E9] text-white rounded-lg hover:bg-[#0284C7] transition-colors"
        >
          <Save className="w-4 h-4" strokeWidth={2} />
          <span className="font-medium" style={{ fontFamily: 'Manrope, sans-serif' }}>Save Note</span>
        </button>
        
        {notes[noteKey] && (
          <button
            onClick={handleDelete}
            data-testid="delete-note-btn"
            className="px-4 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            <Trash2 className="w-4 h-4" strokeWidth={2} />
          </button>
        )}
      </div>
    </div>
  );
};

export default DateNoteEditor;