import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Compass,
  MapPin,
  Calendar,
  Users,
  Shield,
  Plus,
  LogOut,
  User,
  Menu,
  X,
  Bookmark
} from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: Compass },
    { name: 'My Trips', path: '/trips', icon: MapPin },
    { name: 'Explore', path: '/explore', icon: Bookmark },
    { name: 'Calendar', path: '/calendar', icon: Calendar },
    { name: 'Community', path: '/community', icon: Users },
    { name: 'Admin', path: '/admin', icon: Shield },
  ];

  const isActive = (path) => {
    if (path === '/dashboard') return location.pathname === '/dashboard';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#fcf9f3]/90 backdrop-blur-md border-b border-black/5">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-16 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/dashboard" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-ink text-white flex items-center justify-center font-serif font-bold text-lg group-hover:scale-105 transition-transform">
            G
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-xl tracking-tight text-ink">
              GlobeTrotter
            </span>
            <span className="text-[10px] uppercase font-mono tracking-widest text-ink-muted -mt-1">
              Curated Journeys
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-white/70 px-3 py-1.5 rounded-full border border-black/5 shadow-sm">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all ${
                  active
                    ? 'bg-ink text-white shadow-sm'
                    : 'text-ink-secondary hover:text-ink hover:bg-black/5'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${active ? 'text-[#9af1f5]' : 'text-ink-muted'}`} />
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions: Plan a Trip Pill + User Profile */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            to="/trips/new"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-ink text-white hover:bg-black text-xs font-semibold tracking-wide shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Plus className="w-4 h-4 text-[#9af1f5]" />
            <span>Plan a Trip</span>
          </Link>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="w-10 h-10 rounded-full bg-sand/30 hover:bg-sand/50 border border-black/10 flex items-center justify-center text-ink font-semibold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-teal/30"
              title={user?.name || 'User Profile'}
            >
              {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </button>

            {userDropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-56 bg-white rounded-3xl p-2 border border-black/10 shadow-modal z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                onClick={() => setUserDropdownOpen(false)}
              >
                <div className="px-4 py-3 border-b border-black/5 mb-1">
                  <div className="text-xs font-bold text-ink truncate">{user?.name || 'Traveler'}</div>
                  <div className="text-[11px] text-ink-muted truncate">{user?.email || 'traveler@globetrotter.io'}</div>
                </div>
                <Link
                  to="/profile"
                  className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-ink-secondary hover:text-ink hover:bg-[#fcf9f3] rounded-2xl transition-all"
                >
                  <User className="w-4 h-4 text-ink-muted" />
                  Profile & Preferences
                </Link>
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 rounded-2xl transition-all text-left"
                >
                  <LogOut className="w-4 h-4 text-red-500" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex sm:hidden items-center gap-2">
          <Link
            to="/trips/new"
            className="p-2.5 rounded-full bg-ink text-white"
          >
            <Plus className="w-4 h-4 text-[#9af1f5]" />
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-full border border-black/10 bg-white text-ink"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#fcf9f3] border-b border-black/10 px-5 py-4 space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium ${
                  active ? 'bg-ink text-white' : 'text-ink-secondary hover:bg-black/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                {link.name}
              </Link>
            );
          })}
          <div className="pt-2 border-t border-black/5 flex items-center justify-between">
            <Link
              to="/profile"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 text-xs font-medium text-ink"
            >
              <User className="w-4 h-4 text-ink-muted" />
              {user?.name || 'Profile'}
            </Link>
            <button
              onClick={logout}
              className="text-xs font-semibold text-red-600 flex items-center gap-1"
            >
              <LogOut className="w-3.5 h-3.5" /> Sign Out
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
