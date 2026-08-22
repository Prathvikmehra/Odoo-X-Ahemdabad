import React from 'react';
import { Compass, Heart, Globe, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-[#f6f2e9] hairline-t mt-24">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#1c1c18] flex items-center justify-center text-[#fcf9f3]">
                <Compass className="w-4 h-4 text-[#9af1f5]" />
              </div>
              <span className="text-lg font-bold tracking-tight text-[#1c1c18]">
                GlobeTrotter
              </span>
            </div>
            <p className="text-xs text-[#46464c] leading-relaxed">
              A personal, collaborative multi-city travel planning platform crafted with an editorial travel-journal aesthetic.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#76777d]">
              <Globe className="w-3.5 h-3.5 text-[#00696d]" />
              <span>Crafted for slow, intentional exploration</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <span className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[#1c1c18] block mb-4">
              Explore Journeys
            </span>
            <ul className="space-y-2.5 text-xs text-[#46464c]">
              <li><Link to="/dashboard" className="hover:text-[#00696d] transition-colors">Dashboard & Trends</Link></li>
              <li><Link to="/trips" className="hover:text-[#00696d] transition-colors">My Journeys</Link></li>
              <li><Link to="/explore" className="hover:text-[#00696d] transition-colors">Activity Directory</Link></li>
              <li><Link to="/community" className="hover:text-[#00696d] transition-colors">Community Stories</Link></li>
              <li><Link to="/calendar" className="hover:text-[#00696d] transition-colors">Calendar Schedule</Link></li>
            </ul>
          </div>

          {/* Editorial Chapters */}
          <div>
            <span className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[#1c1c18] block mb-4">
              Featured Guides
            </span>
            <ul className="space-y-2.5 text-xs text-[#46464c]">
              <li><Link to="/shared/tokyo-kyoto-2026" className="hover:text-[#00696d] transition-colors flex items-center gap-1">Quiet Japanese Autumn <ArrowUpRight className="w-3 h-3 text-[#76777d]" /></Link></li>
              <li><Link to="/shared/amalfi-coast-romance" className="hover:text-[#00696d] transition-colors flex items-center gap-1">Amalfi Cliffside Paths <ArrowUpRight className="w-3 h-3 text-[#76777d]" /></Link></li>
              <li><Link to="/shared/iceland-ring-road-expedition" className="hover:text-[#00696d] transition-colors flex items-center gap-1">Icelandic Ring Road <ArrowUpRight className="w-3 h-3 text-[#76777d]" /></Link></li>
              <li><Link to="/trips/new" className="hover:text-[#00696d] transition-colors">Create New Multi-City Trip</Link></li>
            </ul>
          </div>

          {/* Editorial Note */}
          <div className="bg-[#f9f5ed] p-6 rounded-3xl border border-[#e6e3dc] space-y-3">
            <span className="text-[10px] font-semibold tracking-[0.12em] uppercase text-[#00696d] block">
              Editorial Note
            </span>
            <p className="text-xs text-[#46464c] italic font-serif leading-relaxed">
              "We travel not to escape life, but for life not to escape us. Every city has a rhythm waiting to be heard."
            </p>
            <p className="text-[11px] text-[#76777d]">
              GlobeTrotter Editorial Desk
            </p>
          </div>

        </div>

        <div className="hairline-t mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#76777d] gap-4">
          <p>© {new Date().getFullYear()} GlobeTrotter. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/profile" className="hover:text-[#1c1c18]">Privacy & Preferences</Link>
            <Link to="/admin" className="hover:text-[#1c1c18]">Admin Console</Link>
            <span className="flex items-center gap-1">Made with <Heart className="w-3 h-3 text-red-500 fill-current" /> for travelers</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
