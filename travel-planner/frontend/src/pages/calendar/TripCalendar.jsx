import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { tripService } from '../../services/tripService';
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  List,
  MapPin,
  Clock,
  Plus,
  ArrowRight
} from 'lucide-react';
import Eyebrow from '../../components/common/Eyebrow';

export default function TripCalendar() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('calendar'); // 'calendar' or 'list'

  const tripAccentColors = [
    { bg: 'bg-[#e0f7f8]', border: 'border-[#9af1f5]', text: 'text-[#00696d]' }, // Teal
    { bg: 'bg-[#f5ede4]', border: 'border-[#dbc3a8]', text: 'text-[#261908]' }, // Sand
    { bg: 'bg-[#fde2e4]', border: 'border-[#fbb1bd]', text: 'text-[#8b1e3f]' }, // Rose
    { bg: 'bg-[#e2ece9]', border: 'border-[#bcd3c7]', text: 'text-[#2b593f]' }, // Sage
    { bg: 'bg-[#ede7f6]', border: 'border-[#d1c4e9]', text: 'text-[#4a148c]' }, // Lavender
  ];

  useEffect(() => {
    loadTrips();
  }, []);

  const loadTrips = async () => {
    try {
      setLoading(true);
      const data = await tripService.getAllTrips();
      setTrips(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error loading trips for calendar:', err);
    } finally {
      setLoading(false);
    }
  };

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  // Build calendar matrix
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay(); // 0 = Sun

  const calendarDays = [];
  // Leading blank days
  for (let i = 0; i < firstDayOfWeek; i++) {
    calendarDays.push(null);
  }
  // Days of current month
  for (let d = 1; d <= daysInMonth; d++) {
    calendarDays.push(new Date(currentYear, currentMonth, d));
  }

  // Check if a date falls within a trip range
  const getTripsForDate = (date) => {
    if (!date) return [];
    return trips.filter((t) => {
      if (!t.start_date) return false;
      const start = new Date(t.start_date);
      const end = t.end_date ? new Date(t.end_date) : start;
      const check = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      const s = new Date(start.getFullYear(), start.getMonth(), start.getDate());
      const e = new Date(end.getFullYear(), end.getMonth(), end.getDate());
      return check >= s && check <= e;
    });
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-black/5 pb-6">
        <div>
          <Eyebrow color="text-teal">TEMPORAL TIMELINE</Eyebrow>
          <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-ink mt-1">
            Trip Calendar
          </h1>
          <p className="text-sm sm:text-base text-ink-secondary mt-1">
            Visual month overview of your multi-city journeys and date spans.
          </p>
        </div>

        {/* View mode toggle + Today button */}
        <div className="flex items-center gap-2">
          <div className="flex items-center p-1 bg-white border border-black/10 rounded-full">
            <button
              onClick={() => setViewMode('calendar')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                viewMode === 'calendar' ? 'bg-ink text-white shadow-sm' : 'text-ink-secondary hover:text-ink'
              }`}
            >
              <CalendarIcon className="w-3.5 h-3.5" />
              <span>Calendar</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                viewMode === 'list' ? 'bg-ink text-white shadow-sm' : 'text-ink-secondary hover:text-ink'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>List View</span>
            </button>
          </div>

          <Link
            to="/trips/new"
            className="p-2.5 rounded-full bg-ink text-white hover:bg-black transition-all"
            title="Plan Trip"
          >
            <Plus className="w-4 h-4 text-[#9af1f5]" />
          </Link>
        </div>
      </div>

      {/* Calendar Navigation Bar */}
      <div className="flex items-center justify-between bg-white rounded-3xl p-4 sm:p-5 border border-black/5 shadow-soft">
        <div className="flex items-center gap-3">
          <h2 className="font-display text-xl sm:text-2xl font-bold text-ink">
            {monthNames[currentMonth]} {currentYear}
          </h2>
          <button
            onClick={handleToday}
            className="px-3 py-1 rounded-full border border-black/10 hover:bg-black/5 text-[11px] font-mono font-semibold text-ink-secondary transition-all"
          >
            Current Month
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevMonth}
            className="p-2 rounded-full border border-black/10 hover:bg-black/5 text-ink transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNextMonth}
            className="p-2 rounded-full border border-black/10 hover:bg-black/5 text-ink transition-all"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Calendar Grid Mode */}
      {viewMode === 'calendar' ? (
        <div className="bg-white rounded-4xl p-6 sm:p-8 border border-black/5 shadow-soft overflow-hidden">
          {/* Day of Week Headers */}
          <div className="grid grid-cols-7 gap-2 pb-4 text-center border-b border-black/5">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <span key={day} className="text-xs font-mono font-bold uppercase text-ink-muted">
                {day}
              </span>
            ))}
          </div>

          {/* Calendar Cells Matrix */}
          <div className="grid grid-cols-7 gap-2 pt-3">
            {calendarDays.map((date, idx) => {
              if (!date) {
                return <div key={`empty-${idx}`} className="h-24 sm:h-32 rounded-2xl bg-transparent" />;
              }

              const dayTrips = getTripsForDate(date);
              const isToday =
                date.getDate() === new Date().getDate() &&
                date.getMonth() === new Date().getMonth() &&
                date.getFullYear() === new Date().getFullYear();

              return (
                <div
                  key={date.toISOString()}
                  className={`h-24 sm:h-32 rounded-2xl p-2 sm:p-2.5 border transition-all flex flex-col justify-between ${
                    isToday
                      ? 'bg-[#fcf9f3] border-teal/40 ring-1 ring-teal/30'
                      : 'bg-white border-black/5 hover:border-black/15'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-mono font-bold w-6 h-6 rounded-full flex items-center justify-center ${
                        isToday ? 'bg-ink text-white' : 'text-ink'
                      }`}
                    >
                      {date.getDate()}
                    </span>
                  </div>

                  {/* Trip Pills spanning date */}
                  <div className="space-y-1 overflow-y-auto max-h-16 sm:max-h-20 scrollbar-none">
                    {dayTrips.map((trip, tripIndex) => {
                      const color = tripAccentColors[tripIndex % tripAccentColors.length];
                      return (
                        <Link
                          key={trip.id}
                          to={`/trips/${trip.id}/itinerary`}
                          className={`block px-2 py-0.5 rounded-lg border text-[10px] sm:text-[11px] font-semibold truncate ${color.bg} ${color.border} ${color.text} hover:opacity-80 transition-opacity`}
                          title={trip.name}
                        >
                          {trip.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* List Mode */
        <div className="bg-white rounded-4xl p-6 sm:p-8 border border-black/5 shadow-soft space-y-4">
          <Eyebrow color="text-teal">CHRONOLOGICAL ITINERARY SCHEDULE</Eyebrow>
          {trips.length === 0 ? (
            <p className="text-xs text-ink-muted py-6">No scheduled trips found.</p>
          ) : (
            <div className="space-y-3">
              {trips.map((trip, idx) => {
                const color = tripAccentColors[idx % tripAccentColors.length];
                return (
                  <div
                    key={trip.id}
                    className={`p-5 rounded-3xl border flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 ${color.bg} ${color.border}`}
                  >
                    <div>
                      <span className={`text-[10px] font-mono uppercase font-bold tracking-wider ${color.text}`}>
                        {trip.start_date ? new Date(trip.start_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Flexible'}
                        {trip.end_date ? ` — ${new Date(trip.end_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}` : ''}
                      </span>
                      <h4 className="font-display font-bold text-lg text-ink mt-0.5">{trip.name}</h4>
                      <p className="text-xs text-ink-secondary line-clamp-1">{trip.description}</p>
                    </div>

                    <Link
                      to={`/trips/${trip.id}/itinerary`}
                      className="px-4 py-2 rounded-full bg-ink text-white hover:bg-black text-xs font-semibold self-start sm:self-auto transition-all flex items-center gap-1.5"
                    >
                      <span>Open Timeline</span>
                      <ArrowRight className="w-3 h-3 text-[#9af1f5]" />
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
