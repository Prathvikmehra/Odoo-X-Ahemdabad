import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { communityService } from '../../services/communityService';
import FilterBar from '../../components/common/FilterBar';
import Eyebrow from '../../components/common/Eyebrow';
import {
  Heart,
  Bookmark,
  Share2,
  MapPin,
  Calendar,
  DollarSign,
  ArrowRight,
  Sparkles,
  Users,
  Compass
} from 'lucide-react';

export default function Community() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Popular');

  const [likedTrips, setLikedTrips] = useState({});
  const [bookmarkedTrips, setBookmarkedTrips] = useState({});

  useEffect(() => {
    loadCommunityTrips();
  }, []);

  const loadCommunityTrips = async () => {
    try {
      setLoading(true);
      const data = await communityService.getCuratedTrips();
      setTrips(data || []);
    } catch (err) {
      console.error('Error loading community feed:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleLike = (id) => {
    setLikedTrips((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleToggleBookmark = (id) => {
    setBookmarkedTrips((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredTrips = trips.filter((t) => {
    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.author.name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      activeFilter === 'All' ||
      (t.tags && t.tags.includes(activeFilter));

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      {/* Header */}
      <div className="border-b border-black/5 pb-6">
        <Eyebrow color="text-teal">TRAVELER DISPATCHES & SHARED JOURNEYS</Eyebrow>
        <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-ink mt-1">
          GlobeTrotter Community
        </h1>
        <p className="text-sm sm:text-base text-ink-secondary mt-1">
          Read unscripted stories, explore verified multi-city itineraries, and copy blueprints to your journal.
        </p>
      </div>

      {/* Header Filter Bar */}
      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search community itineraries, authors, or styles..."
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        filterOptions={['All', 'Culture', 'Photography', 'Coastal', 'Adventure', 'Romance']}
        sortBy={sortBy}
        onSortChange={setSortBy}
        sortOptions={['Popular', 'Recent', 'Budget: High to Low']}
        showGroupBy={false}
      />

      {/* Vertical Feed of Shared-Trip Cards */}
      {loading ? (
        <div className="py-20 text-center text-ink-muted">
          <div className="w-8 h-8 border-2 border-ink border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs font-mono uppercase tracking-wider">Loading community dispatches...</p>
        </div>
      ) : (
        <div className="space-y-8">
          {filteredTrips.map((trip) => {
            const isLiked = likedTrips[trip.id];
            const isBookmarked = bookmarkedTrips[trip.id];
            const likeCount = trip.likes + (isLiked ? 1 : 0);

            return (
              <article
                key={trip.id}
                className="bg-white rounded-4xl sm:rounded-5xl overflow-hidden border border-black/5 shadow-soft hover:shadow-float transition-all duration-300 flex flex-col"
              >
                {/* Author Bar */}
                <div className="p-6 sm:p-8 flex items-center justify-between border-b border-black/5">
                  <div className="flex items-center gap-3.5">
                    <img
                      src={trip.author.avatar}
                      alt={trip.author.name}
                      className="w-12 h-12 rounded-full object-cover border border-black/10 shadow-sm"
                    />
                    <div>
                      <h4 className="font-display font-bold text-sm sm:text-base text-ink">
                        {trip.author.name}
                      </h4>
                      <span className="text-xs text-ink-muted font-mono">
                        {trip.author.handle}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {trip.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="hidden sm:inline-block px-3 py-1 rounded-full bg-[#fcf9f3] border border-black/5 text-ink-secondary text-[11px] font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Cinematic Hero Photo */}
                <div className="relative h-72 sm:h-96 w-full overflow-hidden group">
                  <img
                    src={trip.coverImage}
                    alt={trip.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 photo-overlay" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <Eyebrow color="text-[#9af1f5] mb-1">
                      {trip.days} DAYS • {trip.citiesCount} CITIES • {trip.currency}{trip.totalBudget.toLocaleString('en-IN')}
                    </Eyebrow>
                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight">
                      {trip.title}
                    </h3>
                  </div>
                </div>

                {/* Write-up & Highlights */}
                <div className="p-6 sm:p-8 space-y-6">
                  <p className="text-sm sm:text-base text-ink-secondary leading-relaxed font-light">
                    {trip.description}
                  </p>

                  {/* Chapter Highlights Strip */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    {trip.chapters?.map((chap) => (
                      <div
                        key={chap.chapterNumber}
                        className="p-4 bg-[#fcf9f3] rounded-2xl border border-black/5"
                      >
                        <span className="text-[10px] font-mono font-bold uppercase text-teal">
                          CHAPTER {chap.chapterNumber} • {chap.city}
                        </span>
                        <h5 className="font-display font-bold text-xs text-ink mt-0.5 truncate">
                          {chap.headline}
                        </h5>
                      </div>
                    ))}
                  </div>

                  {/* Footer Actions */}
                  <div className="pt-4 border-t border-black/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleToggleLike(trip.id)}
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold border transition-all ${
                          isLiked
                            ? 'bg-rose-50 border-rose-200 text-rose-600'
                            : 'bg-white border-black/10 text-ink-secondary hover:bg-black/5'
                        }`}
                      >
                        <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-600 text-rose-600' : ''}`} />
                        <span>{likeCount}</span>
                      </button>

                      <button
                        onClick={() => handleToggleBookmark(trip.id)}
                        className={`p-2 rounded-full border transition-all ${
                          isBookmarked
                            ? 'bg-teal-soft border-teal/30 text-teal'
                            : 'bg-white border-black/10 text-ink-secondary hover:bg-black/5'
                        }`}
                        title="Bookmark Story"
                      >
                        <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-teal text-teal' : ''}`} />
                      </button>
                    </div>

                    <Link
                      to={`/shared/${trip.token}`}
                      className="px-6 py-3 rounded-full bg-ink hover:bg-black text-white text-xs font-bold tracking-wide flex items-center gap-2 shadow-sm transition-all hover:scale-105"
                    >
                      <span>Read Magazine Story</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#9af1f5]" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
