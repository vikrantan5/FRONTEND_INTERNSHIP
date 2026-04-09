import React from 'react';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle = ({ isDark, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      data-testid="theme-toggle-btn"
      className="fixed top-3 right-3 z-50 p-2.5 rounded-xl glass shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-amber-400" strokeWidth={2.5} />
      ) : (
        <Moon className="w-4 h-4 text-slate-600" strokeWidth={2.5} />
      )}
    </button>
  );
};

export default ThemeToggle;
