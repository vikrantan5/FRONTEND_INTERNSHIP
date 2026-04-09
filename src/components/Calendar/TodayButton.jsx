import React from 'react';
import { Calendar } from 'lucide-react';

export const TodayButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      data-testid="today-btn"
      className="flex items-center gap-2 px-4 py-2 bg-[#0EA5E9] text-white rounded-lg hover:bg-[#0284C7] transition-colors shadow-md"
    >
      <Calendar className="w-4 h-4" strokeWidth={2} />
      <span className="text-sm font-medium" style={{ fontFamily: 'Manrope, sans-serif' }}>Today</span>
    </button>
  );
};

export default TodayButton; 