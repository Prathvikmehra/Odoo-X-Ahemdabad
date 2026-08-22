import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { activityService } from '../../services/activityService';
import { tripService } from '../../services/tripService';
import { stopService } from '../../services/stopService';
import FilterBar from '../../components/common/FilterBar';
import Eyebrow from '../../components/common/Eyebrow';
import Modal from '../../components/common/Modal';
import {
  Compass,
  MapPin,
  Clock,
  DollarSign,
  Plus,
  Check,
  Sparkles,
  SlidersHorizontal,
  Search
} from 'lucide-react';

export default function Explore() {
  const [searchParams] = useSearchParams();
  const initialCity = searchParams.get('city') || '';

  const [searchQuery, setSearchQuery] = useState(initialCity);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Recommended');
  const [groupBy, setGroupBy] = useState('None');

  const [activities, setActivities] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);

  // Add to Trip Modal
  const [selectedActivityForTrip, setSelectedActivityForTrip] = useState(null);
  const [userTrips, setUserTrips] = useState([]);
  const [userStops, setUserStops] = useState([]);
  const [selectedTripId, setSelectedTripId] = useState('');
  const [selectedStopId, setSelectedStopId] = useState('');
  const [addingSuccess, setAddingSuccess] = useState(false);

  // Fallback curated seed activities
  const SEED_CATALOG = [
    {
      id: 'act-1',
      name: 'Senso-ji Temple Dawn Stroll',
      city: 'Tokyo',
      country: 'Japan',
      type: 'Culture',
      cost: 0,
      duration_hours: 1.5,
      start_time: '06:30',
      image_url: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=600&auto=format&fit=crop&q=80',
      description: 'Experience Tokyo’s oldest Buddhist temple in tranquil morning serenity before crowds arrive.'
    },
    {
      id: 'act-2',
      name: 'Tsukiji Outer Market Tasting Tour',
      city: 'Tokyo',
      country: 'Japan',
      type: 'Culinary',
      cost: 4500,
      duration_hours: 2.5,
      start_time: '08:30',
      image_url: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=600&auto=format&fit=crop&q=80',
      description: 'Sample freshly torched wagyu skewers, tamagoyaki omelettes, and premium matcha soft serve.'
    },
    {
      id: 'act-3',
      name: 'Arashiyama Bamboo Grove & Monkey Park',
      city: 'Kyoto',
      country: 'Japan',
      type: 'Nature',
      cost: 600,
      duration_hours: 3.0,
      start_time: '07:30',
      image_url: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&auto=format&fit=crop&q=80',
      description: 'Towering stalks of green bamboo whispering in the breeze, followed by panoramic mountain views.'
    },
    {
      id: 'act-4',
      name: 'Fushimi Inari Sunset Summit Trek',
      city: 'Kyoto',
      country: 'Japan',
      type: 'Adventure',
      cost: 0,
      duration_hours: 2.0,
      start_time: '17:00',
      image_url: 'https://images.unsplash.com/photo-1478436127897-769e00d2c715?w=600&auto=format&fit=crop&q=80',
      description: 'Walk through thousands of vermilion torii shrine gates as lanterns glow against the night sky.'
    },
    {
      id: 'act-5',
      name: 'Path of the Gods Panoramic Ridge',
      city: 'Positano',
      country: 'Italy',
      type: 'Adventure',
      cost: 0,
      duration_hours: 4.0,
      start_time: '08:00',
      image_url: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=600&auto=format&fit=crop&q=80',
      description: 'Legendary clifftop trail suspended 500 meters above the shimmering cobalt sea.'
    },
    {
      id: 'act-6',
      name: 'Capri Blue Grotto Rowboat Tour',
      city: 'Capri',
      country: 'Italy',
      type: 'Nature',
      cost: 3200,
      duration_hours: 2.0,
      start_time: '10:30',
      image_url: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=600&auto=format&fit=crop&q=80',
      description: 'Slip into a natural sea cave illuminated with otherworldly neon sapphire reflections.'
    },
    {
      id: 'act-7',
      name: 'Sky Lagoon Geothermal Ocean Soak',
      city: 'Reykjavik',
      country: 'Iceland',
      type: 'Relaxation',
      cost: 7500,
      duration_hours: 2.5,
      start_time: '16:00',
      image_url: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=600&auto=format&fit=crop&q=80',
      description: '7-step Nordic ritual in an oceanside infinity thermal lagoon overlooking dramatic fjords.'
    },
    {
      id: 'act-8',
      name: 'Diamond Beach & Glacier Lagoon',
      city: 'Vik',
      country: 'Iceland',
      type: 'Nature',
      cost: 1500,
      duration_hours: 3.0,
      start_time: '13:00',
      image_url: 'https://images.unsplash.com/photo-1476610182048-b716b8518aae?w=600&auto=format&fit=crop&q=80',
      description: 'Icebergs glistening like giant raw gems strewn across jet-black volcanic sand.'
    }
  ];

  const categories = ['All', 'Culture', 'Culinary', 'Adventure', 'Nature', 'Relaxation'];

  useEffect(() => {
    loadCatalog();
  }, [searchQuery]);

  const loadCatalog = async () => {
    try {
      setLoading(true);
      const [citiesRes, actRes] = await Promise.allSettled([
        activityService.getCities(),
        activityService.searchActivities({ q: searchQuery }),
      ]);

      if (citiesRes.status === 'fulfilled' && Array.isArray(citiesRes.value)) {
        setCities(citiesRes.value);
      }

      if (actRes.status === 'fulfilled' && Array.isArray(actRes.value) && actRes.value.length > 0) {
        setActivities(actRes.value);
      } else {
        // Fallback to rich curated catalog
        setActivities(SEED_CATALOG);
      }
    } catch (err) {
      console.error('Error fetching activities:', err);
      setActivities(SEED_CATALOG);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAddModal = async (activity) => {
    setSelectedActivityForTrip(activity);
    setAddingSuccess(false);
    try {
      const trips = await tripService.getAllTrips();
      setUserTrips(trips || []);
      if (trips.length > 0) {
        setSelectedTripId(trips[0].id);
        const stops = await stopService.getStops(trips[0].id);
        setUserStops(stops || []);
        if (stops.length > 0) setSelectedStopId(stops[0].id);
      }
    } catch (err) {
      console.error('Error loading user trips for modal:', err);
    }
  };

  const handleTripSelectChange = async (tripId) => {
    setSelectedTripId(tripId);
    try {
      const stops = await stopService.getStops(tripId);
      setUserStops(stops || []);
      if (stops.length > 0) setSelectedStopId(stops[0].id);
      else setSelectedStopId('');
    } catch (err) {
      console.error('Error loading stops for trip:', err);
    }
  };

  const handleAddActivityToStop = async () => {
    if (!selectedStopId || !selectedActivityForTrip) return;
    try {
      await activityService.createActivity(selectedStopId, {
        name: selectedActivityForTrip.name,
        type: selectedActivityForTrip.type || 'Sightseeing',
        cost: selectedActivityForTrip.cost || 0,
        duration_hours: selectedActivityForTrip.duration_hours || 2,
        start_time: selectedActivityForTrip.start_time || '10:00',
        description: selectedActivityForTrip.description || '',
        image_url: selectedActivityForTrip.image_url || '',
      });
      setAddingSuccess(true);
      setTimeout(() => {
        setSelectedActivityForTrip(null);
        setAddingSuccess(false);
      }, 1500);
    } catch (err) {
      console.error('Error adding activity to stop:', err);
    }
  };

  // Filter and sort activities
  const filteredActivities = activities.filter((act) => {
    const matchesSearch =
      act.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (act.city && act.city.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (act.description && act.description.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCat = selectedCategory === 'All' || act.type === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const sortedActivities = [...filteredActivities].sort((a, b) => {
    if (sortBy === 'Cost: Low to High') return (a.cost || 0) - (b.cost || 0);
    if (sortBy === 'Cost: High to Low') return (b.cost || 0) - (a.cost || 0);
    if (sortBy === 'Duration') return (a.duration_hours || 0) - (b.duration_hours || 0);
    return 0;
  });

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="border-b border-black/5 pb-6">
        <Eyebrow color="text-teal">CURATED DESTINATIONS & EXPERIENCES</Eyebrow>
        <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-ink mt-1">
          City & Activity Discovery
        </h1>
        <p className="text-sm sm:text-base text-ink-secondary mt-1">
          Explore iconic landmarks, culinary hotspots, and secret trails across the globe.
        </p>
      </div>

      {/* Cross-cutting Header Pattern: Search bar + Group/Filter/Sort */}
      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search cities, activities, or travel styles..."
        activeFilter={selectedCategory}
        onFilterChange={setSelectedCategory}
        filterOptions={categories}
        sortBy={sortBy}
        onSortChange={setSortBy}
        sortOptions={['Recommended', 'Cost: Low to High', 'Cost: High to Low', 'Duration']}
        showGroupBy={false}
      />

      {/* Results List as clean cards */}
      {loading ? (
        <div className="py-20 text-center text-ink-muted">
          <div className="w-8 h-8 border-2 border-ink border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs font-mono uppercase tracking-wider">Searching global destinations...</p>
        </div>
      ) : sortedActivities.length === 0 ? (
        <div className="bg-white rounded-4xl p-12 text-center border border-black/5 shadow-soft max-w-lg mx-auto">
          <Sparkles className="w-10 h-10 text-teal mx-auto mb-2" />
          <h3 className="font-display text-xl font-bold text-ink">No experiences found</h3>
          <p className="text-xs text-ink-secondary mt-1 mb-4">
            Try adjusting your search terms or selecting a different category filter.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="px-5 py-2.5 rounded-full bg-ink text-white text-xs font-semibold"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedActivities.map((act) => (
            <div
              key={act.id}
              className="group bg-white rounded-3xl overflow-hidden border border-black/5 shadow-soft hover:shadow-float transition-all duration-300 flex flex-col justify-between"
            >
              {/* Photo Header */}
              <div className="relative h-48 overflow-hidden bg-sand/20">
                <img
                  src={act.image_url || 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=600&auto=format&fit=crop&q=80'}
                  alt={act.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-ink text-[10px] font-bold uppercase font-mono shadow-sm">
                    {act.type}
                  </span>
                </div>
                {act.city && (
                  <div className="absolute bottom-3 left-3">
                    <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-medium flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#9af1f5]" />
                      {act.city}
                    </span>
                  </div>
                )}
              </div>

              {/* Card Details */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-lg font-bold text-ink group-hover:text-teal transition-colors leading-snug">
                    {act.name}
                  </h3>
                  <p className="text-xs text-ink-secondary line-clamp-2 mt-1.5 leading-relaxed font-light">
                    {act.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-black/5 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-mono uppercase text-ink-muted block">Estimated</span>
                    <span className="font-display font-bold text-sm text-ink">
                      {act.cost > 0 ? `₹${parseFloat(act.cost).toLocaleString('en-IN')}` : 'Free Access'}
                    </span>
                  </div>

                  <button
                    onClick={() => handleOpenAddModal(act)}
                    className="px-4 py-2 rounded-full bg-ink hover:bg-black text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all hover:scale-105"
                  >
                    <Plus className="w-3.5 h-3.5 text-[#9af1f5]" />
                    <span>Add to Trip</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Activity to Trip Modal */}
      {selectedActivityForTrip && (
        <Modal
          isOpen={Boolean(selectedActivityForTrip)}
          onClose={() => setSelectedActivityForTrip(null)}
          title={`Add "${selectedActivityForTrip.name}" to Journey`}
        >
          {addingSuccess ? (
            <div className="py-6 text-center text-emerald-700 space-y-2">
              <Check className="w-10 h-10 mx-auto text-emerald-500" />
              <p className="text-sm font-bold">Activity scheduled in your itinerary!</p>
            </div>
          ) : userTrips.length === 0 ? (
            <div className="py-6 text-center text-ink-secondary space-y-4">
              <p className="text-xs">You don't have any trips created yet.</p>
              <button
                onClick={() => (window.location.href = '/trips/new')}
                className="px-5 py-2.5 rounded-full bg-ink text-white text-xs font-semibold"
              >
                Create a Trip First
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1 font-mono">
                  Select Trip
                </label>
                <select
                  value={selectedTripId}
                  onChange={(e) => handleTripSelectChange(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-black/10 rounded-full text-xs text-ink focus:outline-none focus:ring-2 focus:ring-teal/30"
                >
                  {userTrips.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1 font-mono">
                  Select City Section / Stop
                </label>
                {userStops.length === 0 ? (
                  <p className="text-xs text-red-500 py-2">
                    This trip has no city stops yet. Open the itinerary builder to add stops.
                  </p>
                ) : (
                  <select
                    value={selectedStopId}
                    onChange={(e) => setSelectedStopId(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-black/10 rounded-full text-xs text-ink focus:outline-none focus:ring-2 focus:ring-teal/30"
                  >
                    {userStops.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.city_name} ({s.country || 'Stop'})
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <div className="pt-3">
                <button
                  onClick={handleAddActivityToStop}
                  disabled={!selectedStopId}
                  className="w-full py-3.5 rounded-full bg-ink hover:bg-black text-white text-xs font-semibold tracking-wide disabled:opacity-50"
                >
                  Confirm & Attach to Timeline
                </button>
              </div>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}
