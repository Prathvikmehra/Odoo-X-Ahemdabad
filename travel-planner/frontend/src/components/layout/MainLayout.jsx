import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-[#fcf9f3] text-ink flex flex-col antialiased">
      <Navbar />
      <main className="flex-1 w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-16 py-8 md:py-12">
        <Outlet />
      </main>
      <footer className="border-t border-black/5 py-8 mt-12 bg-white/40">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-16 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink-muted">
          <div className="flex items-center gap-2">
            <span className="font-display font-semibold text-ink">GlobeTrotter</span>
            <span>— The Editorial Travel Platform</span>
          </div>
          <div>Crafted for thoughtful journeys across cities & continents.</div>
        </div>
      </footer>
    </div>
  );
}
