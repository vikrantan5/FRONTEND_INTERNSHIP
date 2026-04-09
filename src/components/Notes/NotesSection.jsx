import React from 'react';
import { getMonthName } from '@/utils/dateUtils';

export const NotesSection = ({ month, year, notes, onNotesChange }) => {
  return (
    <div className="w-full h-full" data-testid="notes-section">
      <div className="bg-[#FFFEF7] border border-slate-200 rounded-lg p-6 h-full min-h-[400px] sm:min-h-[600px]">
        <h3 className="text-lg sm:text-xl font-semibold mb-4 text-slate-900" style={{ fontFamily: 'Cabinet Grotesk, sans-serif' }}>
          Notes - {getMonthName(month)} {year}
        </h3>
        
        <textarea
          data-testid="notes-input"
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
          placeholder="Write your notes here..."
          className="w-full h-[calc(100%-3rem)] p-4 bg-transparent border-0 resize-none focus:outline-none text-slate-700"
          style={{
            fontFamily: 'Manrope, sans-serif',
            backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, #E2E8F0 31px, #E2E8F0 32px)',
            lineHeight: '32px'
          }}
        />
      </div>
    </div>
  );
};

export default NotesSection;