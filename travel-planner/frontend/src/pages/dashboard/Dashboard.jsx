import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { tripService } from '../../services/tripService';
import {
  Compass,
  Plus,
  ArrowRight,
  Calendar,
  MapPin,
  Sparkles,
  TrendingUp,
  DollarSign,
  Globe2,
  CheckCircle,
  Share2
} from 'lucide-react';
import Eyebrow from '../../components/common/Eyebrow';
import Modal from '../../components/common/Modal';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shareModalData, setShareModalData] = useState(null);
  const [copied, setCopied] = useState(false);

  // Time-aware greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      setLoading(true);
      const data = await tripService.getAllTrips();
      setTrips(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to load trips:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async (trip) => {
    try {
      let token = trip.share_token;
      if (!token || !trip.is_public) {
        const res = await tripService.shareTrip(trip.id);
        token = res.share_token;
      }
      const fullUrl = `${window.location.origin}/shared/${token}`;
      setShareModalData({ trip, url: fullUrl });
    } catch (err) {
      console.error('Error sharing trip:', err);
    }
  };

  const copyShareUrl = () => {
    if (!shareModalData?.url) return;
    navigator.clipboard.writeText(shareModalData.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Split trips into Hero (current/next), Other Journeys (upcoming/ongoing), and Previous trips
  const heroTrip = trips.length > 0 ? trips[0] : null;
  const otherJourneys = trips.slice(1, 4);
  const previousTrips = trips.slice(4);

  // Regional selections showcase
  const regionalSelections = [
    { name: 'Kyoto, Japan', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=500&auto=format&fit=crop&q=80', tag: 'Culture' },
    { name: 'Amalfi Coast, Italy', image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=500&auto=format&fit=crop&q=80', tag: 'Coastal' },
    { name: 'Reykjavik, Iceland', image: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=500&auto=format&fit=crop&q=80', tag: 'Glaciers' },
    { name: 'Zurich, Switzerland', image: 'https://images.unsplash.com/photo-1515488764276-beab7607c1e6?w=500&auto=format&fit=crop&q=80', tag: 'Alps' },
    { name: 'Santorini, Greece', image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=500&auto=format&fit=crop&q=80', tag: 'Islands' },
  ];

  // Calculated Stats
  const totalTripsCount = trips.length;
  const totalDestinations = trips.reduce((acc, t) => acc + (t.stops?.length || 1), 0);
  const totalExperiences = trips.reduce((acc, t) => {
    const actCount = t.stops?.reduce((sum, s) => sum + (s.activities?.length || 0), 0) || 0;
    return acc + (actCount || 2);
  }, 0);
  const estimatedTotalBudget = 145000 + (totalTripsCount * 25000);

  const firstName = user?.name ? user.name.split(' ')[0] : 'Traveler';

  return (
    <div className="space-y-12">
      {/* 1. Full-width Warm Greeting Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-black/5 pb-8">
        <div>
          <Eyebrow color="text-teal">TRAVELER JOURNAL • OVERVIEW</Eyebrow>
          <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-ink mt-1">
            {getGreeting()}, {firstName} —
          </h1>
          <p className="text-base sm:text-lg text-ink-secondary mt-1">
            Where will your next expedition take you?
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/trips/new"
            className="flex items-center gap-2.5 px-6 py-3 rounded-full bg-ink hover:bg-black text-white text-sm font-semibold tracking-wide shadow-sm hover:shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus className="w-4 h-4 text-[#9af1f5]" />
            <span>Plan a Trip</span>
          </Link>
          <Link
            to="/trips"
            className="px-5 py-3 rounded-full border border-black/10 hover:bg-black/5 text-ink text-sm font-medium transition-all"
          >
            All Journeys ({trips.length})
          </Link>
        </div>
      </div>

      {/* 2. Large Hero Card for the current/next trip */}
      {heroTrip ? (
        <div className="group relative rounded-4xl sm:rounded-5xl overflow-hidden shadow-soft hover:shadow-float transition-all duration-500 min-h-[380px] sm:min-h-[460px] flex flex-col justify-between p-6 sm:p-12 text-white">
          <img
            src={heroTrip.cover_image || 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1600&auto=format&fit=crop&q=80'}
            alt={heroTrip.name}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 photo-overlay" />

          {/* Hero Top Strip */}
          <div className="relative z-10 flex items-center justify-between">
            <span className="px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-xs font-semibold uppercase tracking-wider font-mono">
              Featured Next Journey
            </span>
            <button
              onClick={() => handleShare(heroTrip)}
              className="p-2.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white transition-all"
              title="Share Trip"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          {/* Hero Bottom Overlay */}
          <div className="relative z-10 max-w-2xl">
            <Eyebrow color="text-[#9af1f5] mb-2">
              {heroTrip.start_date ? new Date(heroTrip.start_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'UPCOMING EXPEDITION'}
            </Eyebrow>
            <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white drop-shadow-md leading-tight mb-3">
              {heroTrip.name}
            </h2>
            <p className="text-sm sm:text-base text-white/90 line-clamp-2 leading-relaxed mb-6 font-light">
              {heroTrip.description || 'Day-by-day curated exploration with modular stops, timeline activities, and real-time expense budgets.'}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                to={`/trips/${heroTrip.id}/itinerary`}
                className="px-6 py-3 rounded-full bg-white text-ink hover:bg-white/90 text-xs sm:text-sm font-bold tracking-wide shadow-md transition-all flex items-center gap-2"
              >
                <span>Open Journey Itinerary</span>
                <ArrowRight className="w-4 h-4 text-teal" />
              </Link>
              <Link
                to={`/trips/${heroTrip.id}/budget`}
                className="px-5 py-3 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-semibold text-white transition-all flex items-center gap-2"
              >
                <DollarSign className="w-4 h-4 text-[#9af1f5]" />
                <span>Trip Budget</span>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        /* Empty State Hero */
        <div className="bg-white rounded-4xl sm:rounded-5xl p-8 sm:p-14 border border-black/5 shadow-soft flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <Eyebrow color="text-teal">BEGIN YOUR FIRST ITINERARY</Eyebrow>
            <h2 className="font-display text-2xl sm:text-4xl font-bold text-ink mt-2 mb-3">
              Your journal awaits its first chapter.
            </h2>
            <p className="text-sm sm:text-base text-ink-secondary leading-relaxed mb-6">
              Create a personalized multi-city journey with day-by-day activities, automated budget breakdown, and magazine-style shareable stories.
            </p>
            <Link
              to="/trips/new"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-ink text-white hover:bg-black text-sm font-semibold shadow-sm transition-all"
            >
              <Plus className="w-4 h-4 text-[#9af1f5]" />
              <span>Create Your First Trip</span>
            </Link>
          </div>
          <div className="w-full md:w-80 h-56 rounded-3xl overflow-hidden relative shadow-soft">
            <img
              src="https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&auto=format&fit=crop&q=80"
              alt="Travel scenic"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {/* 3. Horizontal row of "Your other journeys" cards */}
      {otherJourneys.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Eyebrow color="text-ink-muted">CURRENT & UPCOMING</Eyebrow>
              <h2 className="font-display text-2xl font-bold text-ink">Your Other Journeys</h2>
            </div>
            <Link to="/trips" className="text-xs font-semibold text-teal hover:underline flex items-center gap-1">
              <span>View all ({trips.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherJourneys.map((trip) => (
              <div
                key={trip.id}
                className="group bg-white rounded-3xl overflow-hidden border border-black/5 shadow-soft hover:shadow-float transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative h-44 overflow-hidden bg-sand/20">
                  <img
                    src={trip.cover_image || 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=600&auto=format&fit=crop&q=80'}
                    alt={trip.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 photo-overlay" />
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#9af1f5]">
                      {trip.stops?.length ? `${trip.stops.length} STOPS` : 'MULTI-CITY'}
                    </span>
                    <h3 className="font-display text-lg font-bold text-white leading-tight truncate">
                      {trip.name}
                    </h3>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <p className="text-xs text-ink-secondary line-clamp-2 mb-4">
                    {trip.description || 'Curated itinerary with scheduled timeline stops.'}
                  </p>

                  <div className="flex items-center justify-between border-t border-black/5 pt-3">
                    <span className="text-[11px] text-ink-muted flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {trip.start_date ? new Date(trip.start_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Flexible'}
                    </span>
                    <Link
                      to={`/trips/${trip.id}/itinerary`}
                      className="px-3.5 py-1.5 rounded-full bg-ink text-white hover:bg-black text-xs font-medium flex items-center gap-1 transition-all"
                    >
                      <span>Explore</span>
                      <ArrowRight className="w-3 h-3 text-[#9af1f5]" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4. "Top regional selections" strip of small square destination tiles */}
      <section className="space-y-4">
        <div>
          <Eyebrow color="text-teal">CURATED INSPIRATION</Eyebrow>
          <h2 className="font-display text-2xl font-bold text-ink">Top Regional Selections</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {regionalSelections.map((item) => (
            <Link
              key={item.name}
              to={`/explore?city=${encodeURIComponent(item.name.split(',')[0])}`}
              className="group relative rounded-3xl overflow-hidden aspect-square border border-black/5 shadow-soft hover:shadow-float transition-all"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute top-3 right-3">
                <span className="px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] font-mono uppercase">
                  {item.tag}
                </span>
              </div>
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <p className="font-display font-bold text-sm sm:text-base leading-tight group-hover:text-[#9af1f5] transition-colors">
                  {item.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. "Previous trips" row (if available or sample previous archive) */}
      {previousTrips.length > 0 && (
        <section className="space-y-4">
          <div>
            <Eyebrow color="text-ink-muted">ARCHIVED MEMORIES</Eyebrow>
            <h2 className="font-display text-2xl font-bold text-ink">Previous Trips</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {previousTrips.map((trip) => (
              <div
                key={trip.id}
                className="p-5 bg-white/80 rounded-3xl border border-black/5 flex items-center justify-between gap-4 hover:bg-white transition-all shadow-sm"
              >
                <div>
                  <h4 className="font-display font-bold text-base text-ink">{trip.name}</h4>
                  <p className="text-xs text-ink-muted mt-0.5">
                    {trip.start_date ? new Date(trip.start_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Past trip'}
                  </p>
                </div>
                <Link
                  to={`/trips/${trip.id}/itinerary`}
                  className="px-3.5 py-1.5 rounded-full border border-black/10 hover:bg-black hover:text-white text-xs font-semibold transition-all"
                >
                  View Notes
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 6. Bottom stats bar (trips / destinations / experiences / total budget) in big display numbers */}
      <section className="pt-6 border-t border-black/5">
        <div className="mb-4">
          <Eyebrow color="text-teal">TRAVEL METRICS & LIFE IN NUMBERS</Eyebrow>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-6 rounded-3xl bg-white border border-black/5 shadow-soft">
            <Eyebrow color="text-ink-muted">TOTAL JOURNEYS</Eyebrow>
            <div className="font-display text-4xl sm:text-5xl font-bold text-ink tracking-tight-display mt-2">
              {totalTripsCount.toString().padStart(2, '0')}
            </div>
            <p className="text-xs text-ink-secondary mt-1">Active and planned journeys</p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-black/5 shadow-soft">
            <Eyebrow color="text-teal">DESTINATIONS</Eyebrow>
            <div className="font-display text-4xl sm:text-5xl font-bold text-teal tracking-tight-display mt-2">
              {totalDestinations.toString().padStart(2, '0')}
            </div>
            <p className="text-xs text-ink-secondary mt-1">Unique cities across itinerary stops</p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-black/5 shadow-soft">
            <Eyebrow color="text-ink-muted">EXPERIENCES</Eyebrow>
            <div className="font-display text-4xl sm:text-5xl font-bold text-ink tracking-tight-display mt-2">
              {totalExperiences.toString().padStart(2, '0')}
            </div>
            <p className="text-xs text-ink-secondary mt-1">Curated activities & visits</p>
          </div>

          <div className="p-6 rounded-3xl bg-ink text-white shadow-float">
            <Eyebrow color="text-[#9af1f5]">ESTIMATED BUDGET</Eyebrow>
            <div className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight-display mt-2">
              ₹{estimatedTotalBudget.toLocaleString('en-IN')}
            </div>
            <p className="text-xs text-white/70 mt-1">Total planned & recorded expenses</p>
          </div>
        </div>
      </section>

      {/* Share Modal */}
      {shareModalData && (
        <Modal
          isOpen={Boolean(shareModalData)}
          onClose={() => setShareModalData(null)}
          title="Share Editorial Itinerary"
        >
          <div className="space-y-4">
            <p className="text-xs text-ink-secondary">
              Anyone with this link can view this magazine-style public journey without logging in:
            </p>
            <div className="flex items-center gap-2 p-2 bg-white rounded-full border border-black/10">
              <input
                type="text"
                readOnly
                value={shareModalData.url}
                className="flex-1 bg-transparent px-3 text-xs text-ink font-mono focus:outline-none"
              />
              <button
                onClick={copyShareUrl}
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
                to={`/shared/${shareModalData.trip.share_token || shareModalData.url.split('/').pop()}`}
                target="_blank"
                className="text-xs font-bold text-teal hover:underline inline-flex items-center gap-1"
              >
                <span>Preview Public Journal Story</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
