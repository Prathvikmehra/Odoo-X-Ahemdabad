import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { tripService } from '../../services/tripService';
import TripCard from '../../components/trips/TripCard';
import FilterBar from '../../components/common/FilterBar';
import Eyebrow from '../../components/common/Eyebrow';
import Modal from '../../components/common/Modal';
import { Plus, Compass, Calendar, ArrowRight, CheckCircle, Share2, Layers } from 'lucide-react';

export default function TripList() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Date');
  const [groupBy, setGroupBy] = useState('Status');
  const [viewLayout, setViewLayout] = useState('rows'); // 'rows' or 'grid'

  const [shareModalData, setShareModalData] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    loadTrips();
  }, []);

  const loadTrips = async () => {
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

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to remove this journey from your journal?')) return;
    try {
      await tripService.deleteTrip(id);
      setTrips(trips.filter((t) => t.id !== id));
    } catch (err) {
      console.error('Failed to delete trip:', err);
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

  const getTripStatus = (start, end) => {
    if (!start) return 'Upcoming';
    const now = new Date();
    const startDate = new Date(start);
    const endDate = end ? new Date(end) : startDate;
    if (now >= startDate && now <= endDate) return 'Ongoing';
    if (now > endDate) return 'Completed';
    return 'Upcoming';
  };

  // Filter & Search Logic
  const filteredTrips = trips.filter((trip) => {
    const matchesSearch =
      trip.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (trip.description && trip.description.toLowerCase().includes(searchQuery.toLowerCase()));

    const status = getTripStatus(trip.start_date, trip.end_date);
    const matchesFilter = activeFilter === 'All' || status === activeFilter;

    return matchesSearch && matchesFilter;
  });

  // Sort logic
  const sortedTrips = [...filteredTrips].sort((a, b) => {
    if (sortBy === 'Name') return a.name.localeCompare(b.name);
    if (sortBy === 'Duration') {
      const aDays = a.start_date && a.end_date ? new Date(a.end_date) - new Date(a.start_date) : 0;
      const bDays = b.start_date && b.end_date ? new Date(b.end_date) - new Date(b.start_date) : 0;
      return bDays - aDays;
    }
    // Default by date
    return new Date(b.start_date || 0) - new Date(a.start_date || 0);
  });

  // Group into Ongoing, Upcoming, Completed
  const ongoingTrips = sortedTrips.filter((t) => getTripStatus(t.start_date, t.end_date) === 'Ongoing');
  const upcomingTrips = sortedTrips.filter((t) => getTripStatus(t.start_date, t.end_date) === 'Upcoming');
  const completedTrips = sortedTrips.filter((t) => getTripStatus(t.start_date, t.end_date) === 'Completed');

  return (
    <div className="space-y-10">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-black/5 pb-6">
        <div>
          <Eyebrow color="text-teal">MY EXPEDITION ARCHIVE</Eyebrow>
          <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-ink mt-1">
            My Journeys
          </h1>
          <p className="text-sm sm:text-base text-ink-secondary mt-1">
            Track all planned, active, and completed multi-city itineraries.
          </p>
        </div>

        <Link
          to="/trips/new"
          className="flex items-center gap-2.5 px-6 py-3 rounded-full bg-ink hover:bg-black text-white text-sm font-semibold tracking-wide shadow-sm hover:shadow-md transition-all self-start md:self-auto"
        >
          <Plus className="w-4 h-4 text-[#9af1f5]" />
          <span>Plan a Trip</span>
        </Link>
      </div>

      {/* Header Search & Filter Bar */}
      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search by trip name, destination notes..."
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        filterOptions={['All', 'Ongoing', 'Upcoming', 'Completed']}
        sortBy={sortBy}
        onSortChange={setSortBy}
        sortOptions={['Date', 'Name', 'Duration']}
        groupBy={groupBy}
        onGroupByChange={setGroupBy}
        groupByOptions={['Status', 'None']}
      />

      {/* Trip Sections */}
      {loading ? (
        <div className="py-20 text-center text-ink-muted">
          <div className="w-8 h-8 border-2 border-ink border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs font-mono uppercase tracking-wider">Loading your travel archives...</p>
        </div>
      ) : trips.length === 0 ? (
        <div className="bg-white rounded-4xl p-12 text-center border border-black/5 shadow-soft max-w-lg mx-auto">
          <Compass className="w-12 h-12 text-teal mx-auto mb-3" />
          <h3 className="font-display text-2xl font-bold text-ink">No trips recorded yet</h3>
          <p className="text-sm text-ink-secondary mt-1 mb-6">
            Begin mapping out your next adventure with modular stops and expenses.
          </p>
          <Link
            to="/trips/new"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-ink text-white hover:bg-black text-sm font-semibold"
          >
            <Plus className="w-4 h-4 text-[#9af1f5]" />
            <span>Plan Your First Trip</span>
          </Link>
        </div>
      ) : (
        <div className="space-y-12">
          {/* Section 1: Ongoing Journeys */}
          {(activeFilter === 'All' || activeFilter === 'Ongoing') && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <Eyebrow color="text-emerald-700">ONGOING EXPEDITIONS ({ongoingTrips.length})</Eyebrow>
              </div>

              {ongoingTrips.length === 0 ? (
                <div className="p-6 bg-white/40 rounded-3xl border border-dashed border-black/10 text-xs text-ink-muted">
                  No active journeys currently underway today.
                </div>
              ) : (
                <div className="space-y-4">
                  {ongoingTrips.map((trip) => (
                    <TripCard
                      key={trip.id}
                      trip={trip}
                      viewMode="row"
                      onDelete={handleDelete}
                      onShare={handleShare}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Section 2: Upcoming Journeys */}
          {(activeFilter === 'All' || activeFilter === 'Upcoming') && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-teal" />
                <Eyebrow color="text-teal">UPCOMING JOURNEYS ({upcomingTrips.length})</Eyebrow>
              </div>

              {upcomingTrips.length === 0 ? (
                <div className="p-6 bg-white/40 rounded-3xl border border-dashed border-black/10 text-xs text-ink-muted">
                  No upcoming journeys found for this filter.
                </div>
              ) : (
                <div className="space-y-4">
                  {upcomingTrips.map((trip) => (
                    <TripCard
                      key={trip.id}
                      trip={trip}
                      viewMode="row"
                      onDelete={handleDelete}
                      onShare={handleShare}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Section 3: Completed Journeys */}
          {(activeFilter === 'All' || activeFilter === 'Completed') && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-black/40" />
                <Eyebrow color="text-ink-muted">COMPLETED CHAPTERS ({completedTrips.length})</Eyebrow>
              </div>

              {completedTrips.length === 0 ? (
                <div className="p-6 bg-white/40 rounded-3xl border border-dashed border-black/10 text-xs text-ink-muted">
                  No completed journeys in this category.
                </div>
              ) : (
                <div className="space-y-4">
                  {completedTrips.map((trip) => (
                    <TripCard
                      key={trip.id}
                      trip={trip}
                      viewMode="row"
                      onDelete={handleDelete}
                      onShare={handleShare}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Share Modal */}
      {shareModalData && (
        <Modal
          isOpen={Boolean(shareModalData)}
          onClose={() => setShareModalData(null)}
          title="Share Trip Story"
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
