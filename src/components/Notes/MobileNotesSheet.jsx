import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import DateNoteEditor from './DateNoteEditor';

const MobileNotesSheet = ({ isOpen, onClose, selectedDates, notes, onSave, onDelete, onCloseNote }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 z-50 sheet-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            data-testid="mobile-sheet-overlay"
          />

          {/* Sheet */}
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl glass-strong shadow-2xl max-h-[70vh] flex flex-col"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            data-testid="mobile-notes-sheet"
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-slate-300 dark:bg-slate-600" />
            </div>

            {/* Close button */}
            <div className="flex justify-between items-center px-5 pb-2">
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Notes
              </span>
              <button
                onClick={onClose}
                data-testid="mobile-sheet-close-btn"
                className="p-1.5 rounded-lg hover:bg-slate-200/60 dark:hover:bg-slate-700/60 transition-colors"
              >
                <X className="w-4 h-4 text-slate-500" strokeWidth={2} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-5 pb-6 custom-scrollbar" style={{ minHeight: '250px' }}>
              <DateNoteEditor
                selectedDates={selectedDates}
                notes={notes}
                onSave={onSave}
                onDelete={onDelete}
                onClose={onCloseNote}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileNotesSheet;
