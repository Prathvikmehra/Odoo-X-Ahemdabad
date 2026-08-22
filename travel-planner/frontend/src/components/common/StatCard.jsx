import React from 'react';
import Eyebrow from './Eyebrow';

export default function StatCard({ label, value, subtext, icon: Icon, accent = false }) {
  return (
    <div
      className={`p-6 rounded-3xl transition-all ${
        accent
          ? 'bg-ink text-white shadow-float'
          : 'bg-white/80 border border-black/5 shadow-soft hover:shadow-md'
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <Eyebrow color={accent ? 'text-[#9af1f5]' : 'text-ink-muted'}>
          {label}
        </Eyebrow>
        {Icon && (
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              accent ? 'bg-white/10 text-[#9af1f5]' : 'bg-black/5 text-ink'
            }`}
          >
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>
      <div className="text-3xl sm:text-4xl font-bold tracking-tight-display font-display mb-1">
        {value}
      </div>
      {subtext && (
        <div
          className={`text-xs ${
            accent ? 'text-white/70' : 'text-ink-secondary'
          }`}
        >
          {subtext}
        </div>
      )}
    </div>
  );
}
