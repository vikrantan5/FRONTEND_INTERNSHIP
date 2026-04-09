import React from 'react';
import { Calendar } from 'lucide-react';

export const TodayButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      data-testid="today-btn"
      className="flex items-center gap-1.5 px-3 py-1.5 bg-sky-500 text-white rounded-xl hover:bg-sky-600 transition-all active:scale-95 shadow-md shadow-sky-500/20 text-sm font-semibold"
      style={{ fontFamily: 'Outfit, sans-serif' }}
    >
      <Calendar className="w-3.5 h-3.5" strokeWidth={2.5} />
      Today
    </button>
  );
};

export default TodayButton;
