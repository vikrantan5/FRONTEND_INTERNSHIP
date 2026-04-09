import React from 'react';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle = ({ isDark, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      data-testid="theme-toggle-btn"
      className="fixed top-4 right-4 z-50 p-3 rounded-full bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 shadow-lg hover:shadow-xl transition-all hover:scale-110"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-yellow-500" strokeWidth={2} />
      ) : (
        <Moon className="w-5 h-5 text-slate-700" strokeWidth={2} />
      )}
    </button>
  );
};

export default ThemeToggle;