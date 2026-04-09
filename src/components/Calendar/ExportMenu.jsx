import React from 'react';
import { Download, Printer } from 'lucide-react';

export const ExportMenu = ({ onExportJSON, onPrint }) => {
  return (
    <div className="flex gap-1.5" data-testid="export-menu">
      <button
        onClick={onExportJSON}
        data-testid="export-json-btn"
        className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium glass text-slate-600 dark:text-slate-300 rounded-xl hover:bg-slate-100/80 dark:hover:bg-slate-700/50 transition-all active:scale-95 shadow-sm"
        title="Export calendar data"
        style={{ fontFamily: 'Outfit, sans-serif' }}
      >
        <Download className="w-3.5 h-3.5" strokeWidth={2} />
        <span className="hidden sm:inline">Export</span>
      </button>

      <button
        onClick={onPrint}
        data-testid="print-btn"
        className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium glass text-slate-600 dark:text-slate-300 rounded-xl hover:bg-slate-100/80 dark:hover:bg-slate-700/50 transition-all active:scale-95 shadow-sm"
        title="Print calendar"
        style={{ fontFamily: 'Outfit, sans-serif' }}
      >
        <Printer className="w-3.5 h-3.5" strokeWidth={2} />
        <span className="hidden sm:inline">Print</span>
      </button>
    </div>
  );
};

export default ExportMenu;
