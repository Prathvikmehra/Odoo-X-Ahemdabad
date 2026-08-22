import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { tripService } from '../../services/tripService';
import { stopService } from '../../services/stopService';
import {
  Calendar,
  Clock,
  MapPin,
  DollarSign,
  Share2,
  Edit3,
  Sparkles,
  ArrowRight,
  Compass,
  CheckCircle,
  Plus
} from 'lucide-react';
import Eyebrow from '../../components/common/Eyebrow';
import Modal from '../../components/common/Modal';

export default function Itinerary() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);
  const [stops, setStops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeDay, setActiveDay] = useState('all');

  const [shareModal, setShareModal] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    loadData();
  }, [tripId]);

  const loadData = async () => {
    try {
      setLoading(true);
      const tripData = await tripService.getTripById(tripId);
      setTrip(tripData);

      const stopsData = await stopService.getStops(tripId);
      setStops(Array.isArray(stopsData) ? stopsData : []);
    } catch (err) {
      console.error('Error loading itinerary:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    try {
      let token = trip.share_token;
      if (!token || !trip.is_public) {
        const res = await tripService.shareTrip(tripId);
        token = res.share_token;
      }
      const fullUrl = `${window.location.origin}/shared/${token}`;
      setShareUrl(fullUrl);
      setShareModal(true);
    } catch (err) {
      console.error('Error sharing trip:', err);
    }
  };

  const copyShare = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Build sequential timeline days
  const allStops = stops || [];
  let dayCounter = 1;
  const stopsWithDays = allStops.map((stop, idx) => {
    const start = stop.start_date ? new Date(stop.start_date) : null;
    const end = stop.end_date ? new Date(stop.end_date) : null;
    const daysInStop = start && end ? Math.max(1, Math.round((end - start) / (1000 * 60 * 60 * 24))) : 2;

    const stopDays = [];
    for (let d = 0; d < daysInStop; d++) {
      stopDays.push({
        dayNumber: dayCounter++,
        label: `Day ${dayCounter - 1}`,
      });
    }

    return {
      ...stop,
      days: stopDays,
      chapterNumber: (idx + 1).toString().padStart(2, '0'),
    };
  });

  if (loading) {
    return (
      <div className="py-24 text-center">
        <div className="w-8 h-8 border-2 border-ink border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-xs font-mono uppercase tracking-wider text-ink-muted">Loading journey timeline...</p>
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="text-center py-20 bg-white rounded-4xl border border-black/5 p-8">
        <h3 className="font-display text-xl font-bold text-ink">Journey not found</h3>
        <Link to="/trips" className="mt-4 inline-block px-5 py-2.5 rounded-full bg-ink text-white text-xs font-semibold">
          Back to My Trips
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* Trip Hero Header */}
      <div className="relative rounded-4xl sm:rounded-5xl overflow-hidden min-h-[340px] p-6 sm:p-10 flex flex-col justify-between text-white shadow-soft">
        <img
          src={trip.cover_image || 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1600&auto=format&fit=crop&q=80'}
          alt={trip.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 photo-overlay" />

        {/* Top Controls */}
        <div className="relative z-10 flex items-center justify-between">
          <Link
            to="/trips"
            className="px-4 py-1.5 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/20 text-xs font-medium text-white transition-all"
          >
            ← All Journeys
          </Link>
          <div className="flex items-center gap-2">
            <Link
              to={`/trips/${tripId}/edit`}
              className="p-2.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white transition-all"
              title="Edit Stops"
            >
              <Edit3 className="w-4 h-4" />
            </Link>
            <button
              onClick={handleShare}
              className="px-4 py-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share Journal</span>
            </button>
          </div>
        </div>

        {/* Bottom Hero Text */}
        <div className="relative z-10 max-w-2xl">
          <Eyebrow color="text-[#9af1f5] mb-1">
            {trip.start_date ? `${new Date(trip.start_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${new Date(trip.end_date || trip.start_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}` : 'FLEXIBLE EXPEDITION'}
          </Eyebrow>
          <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white drop-shadow-sm leading-tight">
            {trip.name}
          </h1>
          <p className="text-xs sm:text-sm text-white/90 line-clamp-2 mt-2 font-light">
            {trip.description || 'Day-by-day vertical timeline with scheduled activities, departure transitions, and costs.'}
          </p>

          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/20 text-xs text-white/80">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#9af1f5]" />
              {stops.length} Cities Planned
            </span>
            <Link
              to={`/trips/${tripId}/budget`}
              className="text-[#9af1f5] hover:underline font-semibold flex items-center gap-1"
            >
              <DollarSign className="w-3.5 h-3.5" />
              View Trip Budget
            </Link>
          </div>
        </div>
      </div>

      {/* Day Filter Pills */}
      {stopsWithDays.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setActiveDay('all')}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              activeDay === 'all'
                ? 'bg-ink text-white shadow-sm'
                : 'bg-white text-ink-secondary hover:bg-black/5 border border-black/5'
            }`}
          >
            All Chapters & Days
          </button>
          {stopsWithDays.map((stop) => (
            <button
              key={stop.id}
              onClick={() => setActiveDay(stop.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                activeDay === stop.id
                  ? 'bg-ink text-white shadow-sm'
                  : 'bg-white text-ink-secondary hover:bg-black/5 border border-black/5'
              }`}
            >
              {stop.city_name}
            </button>
          ))}
        </div>
      )}

      {/* Chapter by Chapter Timeline */}
      {stops.length === 0 ? (
        <div className="bg-white rounded-4xl p-12 text-center border border-black/5 shadow-soft">
          <Compass className="w-10 h-10 text-teal mx-auto mb-2" />
          <h3 className="font-display text-xl font-bold text-ink">Itinerary is Empty</h3>
          <p className="text-xs text-ink-secondary mt-1 mb-6">
            Add modular city sections and schedule activities in the builder.
          </p>
          <Link
            to={`/trips/${tripId}/edit`}
            className="px-6 py-3 rounded-full bg-ink text-white text-xs font-semibold inline-flex items-center gap-2 hover:bg-black transition-all"
          >
            <Plus className="w-4 h-4 text-[#9af1f5]" />
            <span>Open Itinerary Builder</span>
          </Link>
        </div>
      ) : (
        <div className="space-y-12">
          {stopsWithDays
            .filter((stop) => activeDay === 'all' || activeDay === stop.id)
            .map((stop, stopIdx, filteredArr) => (
              <div key={stop.id} className="space-y-8">
                {/* Chapter Eyebrow & City Title */}
                <div className="border-b border-black/5 pb-3">
                  <Eyebrow color="text-teal">CHAPTER {stop.chapterNumber}</Eyebrow>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink mt-0.5 flex items-center justify-between">
                    <span>{stop.city_name}</span>
                    <span className="text-xs font-normal text-ink-muted">
                      {stop.start_date ? new Date(stop.start_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Day 1'}
                      {stop.end_date ? ` – ${new Date(stop.end_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}` : ''}
                    </span>
                  </h2>
                </div>

                {/* Day-by-Day Vertical Timeline */}
                <div className="relative pl-6 sm:pl-8 border-l-2 border-black/10 space-y-8 ml-3">
                  {(!stop.activities || stop.activities.length === 0) ? (
                    <div className="p-5 bg-white rounded-3xl border border-dashed border-black/10 text-xs text-ink-muted flex items-center justify-between">
                      <span>No activities scheduled in {stop.city_name}.</span>
                      <Link
                        to={`/trips/${tripId}/edit`}
                        className="font-semibold text-teal hover:underline flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add in Builder
                      </Link>
                    </div>
                  ) : (
                    stop.activities.map((act, actIdx) => (
                      <div key={act.id} className="relative group">
                        {/* Timeline Connector Dot */}
                        <div className="absolute -left-[31px] sm:-left-[39px] top-6 w-4 h-4 rounded-full bg-white border-4 border-ink group-hover:border-teal transition-colors" />

                        {/* Horizontal Activity Card */}
                        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-black/5 shadow-soft hover:shadow-float transition-all flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-5">
                          <div className="flex items-center gap-4 flex-1 min-w-0">
                            {act.image_url ? (
                              <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0">
                                <img
                                  src={act.image_url}
                                  alt={act.name}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                />
                              </div>
                            ) : (
                              <div className="w-20 h-20 rounded-2xl bg-sand/30 flex items-center justify-center shrink-0 text-ink">
                                <Sparkles className="w-6 h-6 text-teal" />
                              </div>
                            )}

                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="px-2 py-0.5 rounded-full bg-[#fcf9f3] text-teal text-[10px] font-semibold font-mono uppercase border border-black/5">
                                  {act.type}
                                </span>
                                <span className="text-xs text-ink-muted flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {act.start_time || '09:00 AM'} ({act.duration_hours || 1}h)
                                </span>
                              </div>

                              <h4 className="font-display font-bold text-base sm:text-lg text-ink truncate group-hover:text-teal transition-colors">
                                {act.name}
                              </h4>

                              {act.description && (
                                <p className="text-xs text-ink-secondary line-clamp-1 mt-0.5 font-light">
                                  {act.description}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Cost shown alongside activity */}
                          <div className="border-t sm:border-t-0 sm:border-l border-black/5 pt-3 sm:pt-0 sm:pl-5 flex items-center justify-between sm:flex-col sm:items-end shrink-0">
                            <span className="text-[10px] uppercase font-mono text-ink-muted">Cost</span>
                            <span className="font-display font-bold text-sm sm:text-base text-ink">
                              {act.cost > 0 ? `₹${parseFloat(act.cost).toLocaleString('en-IN')}` : 'Free'}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Magazine Chapter Transition Banner (between cities) */}
                {stopIdx < filteredArr.length - 1 && (
                  <div className="relative rounded-3xl overflow-hidden min-h-[160px] p-6 sm:p-8 flex items-center justify-between text-white my-8 shadow-soft">
                    <img
                      src="https://images.unsplash.com/photo-1476610182048-b716b8518aae?w=1200&auto=format&fit=crop&q=80"
                      alt="Transition scenic"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-ink/75 backdrop-blur-[2px]" />

                    <div className="relative z-10 max-w-md">
                      <Eyebrow color="text-[#9af1f5] mb-1">CHAPTER TRANSITION</Eyebrow>
                      <h4 className="font-display text-xl sm:text-2xl font-bold text-white">
                        Departing {stop.city_name} — Next: {filteredArr[stopIdx + 1].city_name}
                      </h4>
                      <p className="text-xs text-white/80 mt-1 font-light">
                        Pack bags, check train timetables, and prepare for the next chapter.
                      </p>
                    </div>

                    <div className="relative z-10 hidden sm:block">
                      <ArrowRight className="w-8 h-8 text-[#9af1f5]" />
                    </div>
                  </div>
                )}
              </div>
            ))}
        </div>
      )}

      {/* Share Modal */}
      <Modal
        isOpen={shareModal}
        onClose={() => setShareModal(false)}
        title="Share Journal Story"
      >
        <div className="space-y-4">
          <p className="text-xs text-ink-secondary">
            Send this read-only link to friends or fellow travelers:
          </p>
          <div className="flex items-center gap-2 p-2 bg-white rounded-full border border-black/10">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="flex-1 bg-transparent px-3 text-xs text-ink font-mono focus:outline-none"
            />
            <button
              onClick={copyShare}
              className="px-4 py-2 rounded-full bg-ink text-white hover:bg-black text-xs font-semibold shrink-0 transition-all flex items-center gap-1.5"
            >
              {copied ? (
                <>
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Copied!</span>
                </>
              ) : (
                <span>Copy Link</span>
              )}
            </button>
          </div>
          <div className="pt-2 text-center">
            <Link
              to={`/shared/${trip?.share_token || shareUrl.split('/').pop()}`}
              target="_blank"
              className="text-xs font-bold text-teal hover:underline inline-flex items-center gap-1"
            >
              <span>View Shared Page Preview</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </Modal>
    </div>
  );
}
