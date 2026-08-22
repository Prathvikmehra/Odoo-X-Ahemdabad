import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, title, children, maxWidth = 'max-w-lg' }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink/50 backdrop-blur-sm transition-opacity animate-in fade-in"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div
        className={`relative bg-[#fcf9f3] w-full ${maxWidth} rounded-4xl p-6 sm:p-8 border border-black/10 shadow-modal z-10 animate-in zoom-in-95 duration-200`}
      >
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-black/5">
          <h3 className="font-display text-xl font-bold text-ink">{title}</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full border border-black/10 hover:bg-black/5 text-ink-muted hover:text-ink transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
