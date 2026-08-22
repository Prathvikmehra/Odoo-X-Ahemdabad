import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, DollarSign, Edit3, Trash2, Share2, ArrowRight } from 'lucide-react';
import Eyebrow from '../common/Eyebrow';

export default function TripCard({
  trip,
  onDelete,
  onShare,
  viewMode = 'grid' // 'grid' or 'row'
}) {
  const defaultImage = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&auto=format&fit=crop&q=80';
  const coverImage = trip.cover_image || defaultImage;

  // Format dates
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  const getTripStatus = (start, end) => {
    if (!start) return 'Upcoming';
    const now = new Date();
    const startDate = new Date(start);
    const endDate = end ? new Date(end) : startDate;
    if (now >= startDate && now <= endDate) return 'Ongoing';
    if (now > endDate) return 'Completed';
    return 'Upcoming';
  };

  const status = getTripStatus(trip.start_date, trip.end_date);
  const statusColors = {
    Ongoing: 'bg-emerald-500/90 text-white',
    Upcoming: 'bg-[#00696d] text-white',
    Completed: 'bg-black/60 text-white',
  };

  if (viewMode === 'row') {
    return (
      <div className="group bg-white rounded-3xl p-4 sm:p-5 border border-black/5 shadow-soft hover:shadow-float transition-all duration-300 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-5">
        <div className="flex items-center gap-4 sm:gap-6 flex-1 min-w-0">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shrink-0 relative">
            <img
              src={coverImage}
              alt={trip.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <span className={`absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase font-mono ${statusColors[status]}`}>
              {status}
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Eyebrow color="text-teal">{trip.stops?.length ? `${trip.stops.length} STOPS` : 'JOURNEY'}</Eyebrow>
              {trip.is_public && (
                <span className="px-2 py-0.5 rounded-full bg-teal-soft text-teal text-[10px] font-semibold">
                  Shared
                </span>
              )}
            </div>
            <h3 className="font-display text-lg sm:text-xl font-bold text-ink truncate group-hover:text-teal transition-colors">
              <Link to={`/trips/${trip.id}/itinerary`}>{trip.name}</Link>
            </h3>
            <p className="text-xs text-ink-secondary line-clamp-1 mt-0.5">
              {trip.description || 'No description provided.'}
            </p>
            <div className="flex items-center gap-4 text-xs text-ink-muted mt-2">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {formatDate(trip.start_date)} — {formatDate(trip.end_date)}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 border-t md:border-t-0 pt-3 md:pt-0 border-black/5 shrink-0">
          <Link
            to={`/trips/${trip.id}/itinerary`}
            className="px-4 py-2 rounded-full bg-ink text-white hover:bg-black text-xs font-semibold flex items-center gap-1.5 transition-all"
          >
            <span>View Timeline</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
          <Link
            to={`/trips/${trip.id}/edit`}
            className="p-2 rounded-full border border-black/10 hover:bg-black/5 text-ink-secondary hover:text-ink transition-all"
            title="Edit Itinerary"
          >
            <Edit3 className="w-4 h-4" />
          </Link>
          <Link
            to={`/trips/${trip.id}/budget`}
            className="p-2 rounded-full border border-black/10 hover:bg-black/5 text-ink-secondary hover:text-ink transition-all"
            title="Budget & Expenses"
          >
            <DollarSign className="w-4 h-4" />
          </Link>
          {onShare && (
            <button
              onClick={() => onShare(trip)}
              className="p-2 rounded-full border border-black/10 hover:bg-black/5 text-ink-secondary hover:text-ink transition-all"
              title="Share Trip"
            >
              <Share2 className="w-4 h-4" />
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(trip.id)}
              className="p-2 rounded-full border border-black/10 hover:bg-red-50 hover:border-red-200 text-ink-muted hover:text-red-600 transition-all"
              title="Delete Trip"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    );
  }

  // Grid Card Mode
  return (
    <div className="group relative bg-white rounded-3xl overflow-hidden border border-black/5 shadow-soft hover:shadow-float transition-all duration-300 flex flex-col">
      {/* Cover Image with gradient overlay */}
      <div className="relative h-56 w-full overflow-hidden bg-sand/20">
        <img
          src={coverImage}
          alt={trip.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 photo-overlay pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-auto">
          <span className={`px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase font-mono shadow-sm ${statusColors[status]}`}>
            {status}
          </span>
          {trip.is_public && (
            <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-teal text-[10px] font-bold shadow-sm">
              Public Story
            </span>
          )}
        </div>

        {/* Overlay Title */}
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <Eyebrow color="text-[#9af1f5] mb-1">
            {trip.stops?.length ? `${trip.stops.length} CITIES PLANNED` : 'MULTI-CITY EXPEDITION'}
          </Eyebrow>
          <h3 className="font-display text-xl font-bold tracking-tight text-white leading-snug drop-shadow-sm">
            {trip.name}
          </h3>
        </div>
      </div>

      {/* Body content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <p className="text-xs text-ink-secondary line-clamp-2 leading-relaxed mb-4">
            {trip.description || 'An inspiring journey planned with custom daily stops, curated activities, and budget tracking.'}
          </p>

          <div className="space-y-2 text-xs text-ink-muted border-t border-black/5 pt-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-teal" />
              <span>{formatDate(trip.start_date)} — {formatDate(trip.end_date)}</span>
            </div>
            {trip.stops && trip.stops.length > 0 && (
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-teal" />
                <span className="truncate">
                  {trip.stops.map((s) => s.city_name).join(' → ')}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="flex items-center justify-between gap-2 border-t border-black/5 pt-4 mt-4">
          <Link
            to={`/trips/${trip.id}/itinerary`}
            className="flex-1 text-center py-2.5 px-4 rounded-full bg-ink text-white hover:bg-black text-xs font-semibold transition-all shadow-sm flex items-center justify-center gap-1.5"
          >
            <span>View Itinerary</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
          
          <div className="flex items-center gap-1">
            <Link
              to={`/trips/${trip.id}/edit`}
              className="p-2.5 rounded-full border border-black/10 hover:bg-black/5 text-ink-secondary hover:text-ink transition-all"
              title="Edit Stops"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </Link>
            <Link
              to={`/trips/${trip.id}/budget`}
              className="p-2.5 rounded-full border border-black/10 hover:bg-black/5 text-ink-secondary hover:text-ink transition-all"
              title="Budget"
            >
              <DollarSign className="w-3.5 h-3.5" />
            </Link>
            {onShare && (
              <button
                onClick={() => onShare(trip)}
                className="p-2.5 rounded-full border border-black/10 hover:bg-black/5 text-ink-secondary hover:text-ink transition-all"
                title="Share Trip"
              >
                <Share2 className="w-3.5 h-3.5" />
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(trip.id)}
                className="p-2.5 rounded-full border border-black/10 hover:bg-red-50 text-ink-muted hover:text-red-600 transition-all"
                title="Delete Trip"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
