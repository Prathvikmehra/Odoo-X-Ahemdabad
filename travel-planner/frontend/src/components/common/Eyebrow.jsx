import React from 'react';

export default function Eyebrow({ children, className = '', color = 'text-ink-muted' }) {
  return (
    <span
      className={`inline-block text-[11px] font-semibold uppercase tracking-[0.14em] font-mono ${color} ${className}`}
    >
      {children}
    </span>
  );
}
