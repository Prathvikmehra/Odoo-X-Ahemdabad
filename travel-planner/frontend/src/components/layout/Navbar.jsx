import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Compass, Plus, Menu, X, User, Calendar, MapPin, Sparkles, PieChart, ShieldCheck, LogOut, ChevronDown, BookOpen } from 'lucide-react';
import { useTravel } from '../../context/TravelContext';
import { Button } from '../common/Button';

export function Navbar() {
  const { user } = useTravel();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { name: "Dashboard", path: "/dashboard", icon: Compass },
    { name: "My Trips", path: "/trips", icon: MapPin },
    { name: "Explore", path: "/explore", icon: Sparkles },
    { name: "Calendar", path: "/calendar", icon: Calendar },
    { name: "Community", path: "/community", icon: BookOpen },
    { name: "Analytics", path: "/admin", icon: PieChart },
  ];

  const isActive = (path) => {
    if (path === '/dashboard' && (location.pathname === '/' || location.pathname === '/dashboard')) return true;
    if (path === '/trips' && location.pathname.startsWith('/trips') && location.pathname !== '/trips/new') return true;
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#fcf9f3]/90 backdrop-blur-md hairline-b transition-all duration-300">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between gap-6">
        
        {/* Brand Logo */}
        <Link to="/dashboard" className="flex items-center gap-3 group select-none">
          <div className="w-10 h-10 rounded-full bg-[#1c1c18] flex items-center justify-center text-[#fcf9f3] group-hover:scale-105 transition-transform duration-300 shadow-xs">
            <Compass className="w-5 h-5 text-[#9af1f5]" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-[#1c1c18] leading-none group-hover:text-[#00696d] transition-colors">
              GlobeTrotter
            </span>
            <span className="text-[10px] font-medium tracking-[0.14em] uppercase text-[#76777d] mt-1">
              Travel Journal
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-white/70 border border-[#e6e3dc] p-1.5 rounded-full shadow-2xs">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 flex items-center gap-1.5 ${
                  active
                    ? "bg-[#1c1c18] text-[#fcf9f3] shadow-xs"
                    : "text-[#46464c] hover:text-[#1c1c18] hover:bg-[#f6f2e9]"
                }`}
              >
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Actions: Plan a trip + Profile Avatar */}
        <div className="flex items-center gap-3">
          <Button
            size="sm"
            variant="primary"
            icon={Plus}
            onClick={() => navigate('/trips/new')}
            className="hidden sm:inline-flex"
          >
            Plan a Trip
          </Button>

          {/* User Profile Menu */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-2 p-1 pl-1.5 pr-2 rounded-full border border-[#e6e3dc] bg-white hover:border-[#1c1c18] transition-all cursor-pointer shadow-2xs"
            >
              <img
                src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"}
                alt={user?.name}
                className="w-7 h-7 rounded-full object-cover"
              />
              <span className="hidden md:inline-block text-xs font-medium text-[#1c1c18] max-w-[90px] truncate">
                {user?.name?.split(' ')[0]}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-[#76777d]" />
            </button>

            {/* Profile Dropdown */}
            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white border border-[#e6e3dc] rounded-2xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-4 py-3 border-b border-[#e6e3dc]">
                  <p className="text-xs text-[#76777d]">Signed in as</p>
                  <p className="text-sm font-semibold text-[#1c1c18] truncate">{user?.name}</p>
                  <p className="text-xs text-[#76777d] truncate">{user?.email}</p>
                </div>

                <div className="py-1">
                  <Link
                    to="/profile"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="w-full px-4 py-2 text-xs text-[#46464c] hover:text-[#1c1c18] hover:bg-[#f6f2e9] flex items-center gap-2.5 transition-colors"
                  >
                    <User className="w-4 h-4 text-[#76777d]" />
                    <span>Traveler Profile & Settings</span>
                  </Link>
                  <Link
                    to="/trips"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="w-full px-4 py-2 text-xs text-[#46464c] hover:text-[#1c1c18] hover:bg-[#f6f2e9] flex items-center gap-2.5 transition-colors"
                  >
                    <MapPin className="w-4 h-4 text-[#76777d]" />
                    <span>My Journeys</span>
                  </Link>
                  <Link
                    to="/admin"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="w-full px-4 py-2 text-xs text-[#46464c] hover:text-[#1c1c18] hover:bg-[#f6f2e9] flex items-center gap-2.5 transition-colors"
                  >
                    <ShieldCheck className="w-4 h-4 text-[#76777d]" />
                    <span>Admin & Analytics Panel</span>
                  </Link>
                </div>

                <div className="pt-1 border-t border-[#e6e3dc]">
                  <Link
                    to="/login"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="w-full px-4 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2.5 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full border border-[#e6e3dc] bg-white text-[#1c1c18] hover:border-[#1c1c18]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#fcf9f3] hairline-b px-6 py-6 space-y-4">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`p-3 rounded-2xl text-xs font-medium flex items-center gap-2 border ${
                    active
                      ? "bg-[#1c1c18] text-[#fcf9f3] border-[#1c1c18]"
                      : "bg-white text-[#46464c] border-[#e6e3dc]"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>

          <div className="pt-2">
            <Button
              variant="primary"
              className="w-full justify-center"
              icon={Plus}
              onClick={() => {
                setMobileMenuOpen(false);
                navigate('/trips/new');
              }}
            >
              Plan a Trip
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
