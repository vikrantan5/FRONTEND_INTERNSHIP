import React from 'react';
import { Download, Printer } from 'lucide-react';

export const ExportMenu = ({ onExportJSON, onPrint }) => {
  return (
    <div className="flex gap-2" data-testid="export-menu">
      <button
        onClick={onExportJSON}
        data-testid="export-json-btn"
        className="flex items-center gap-2 px-3 py-2 text-sm bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors"
        title="Export calendar data"
      >
        <Download className="w-4 h-4" strokeWidth={2} />
        <span className="hidden sm:inline" style={{ fontFamily: 'Manrope, sans-serif' }}>Export</span>
      </button>
      
      <button
        onClick={onPrint}
        data-testid="print-btn"
        className="flex items-center gap-2 px-3 py-2 text-sm bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors"
        title="Print calendar"
      >
        <Printer className="w-4 h-4" strokeWidth={2} />
        <span className="hidden sm:inline" style={{ fontFamily: 'Manrope, sans-serif' }}>Print</span>
      </button>
    </div>
  );
};

export default ExportMenu;