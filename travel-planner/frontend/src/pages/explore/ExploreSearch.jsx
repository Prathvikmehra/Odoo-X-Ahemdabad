import { useState } from 'react';
import { useTravel } from '../../context/TravelContext';
import { Button, Eyebrow, Chip } from '../../components/common/Button';
import { HeaderFilterBar } from '../../components/common/HeaderFilterBar';
import { Star, Clock, MapPin, Plus, Heart, Bookmark } from 'lucide-react';

export default function ExploreSearch() {
  const { curatedActivities, savedActivityIds, toggleSaveActivity } = useTravel();
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeSort, setActiveSort] = useState('rating');
  const [activeChip, setActiveChip] = useState('All');

  const categories = ['All', 'Culture', 'Adventure', 'Dining', 'Nature', 'Relaxation', 'Sightseeing'];

  const filtered = curatedActivities
    .filter(a => a.title.toLowerCase().includes(search.toLowerCase()) || a.city.toLowerCase().includes(search.toLowerCase()))
    .filter(a => {
      const cat = activeChip !== 'All' ? activeChip : (activeFilter !== 'all' ? activeFilter : null);
      return !cat || a.category === cat;
    })
    .sort((a, b) => {
      if (activeSort === 'cost_low') return a.priceNum - b.priceNum;
      if (activeSort === 'cost_high') return b.priceNum - a.priceNum;
      return b.rating - a.rating;
    });

  return (
    <div className="max-w-[1440px] mx-auto px-5 md:px-16 py-10">
      {/* Header */}
      <div className="mb-6">
        <Eyebrow color="text-[#00696d]" className="mb-2">Discover & Explore</Eyebrow>
        <h1 className="display-headline text-4xl md:text-5xl font-bold text-[#1c1c18]">Find your next experience</h1>
        <p className="text-sm text-[#46464c] mt-2 max-w-xl">Curated activities, cultural landmarks, hidden gems, and unforgettable dining across the globe.</p>
      </div>

      <HeaderFilterBar
        searchValue={search}
        onSearchChange={setSearch}
        placeholder="Search activities, cities, cuisines..."
        filterOptions={[
          { value: 'Culture', label: 'Culture' },
          { value: 'Adventure', label: 'Adventure' },
          { value: 'Dining', label: 'Dining' },
          { value: 'Nature', label: 'Nature' },
          { value: 'Relaxation', label: 'Relaxation' }
        ]}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        sortOptions={[
          { value: 'rating', label: 'Top Rated' },
          { value: 'cost_low', label: 'Price: Low → High' },
          { value: 'cost_high', label: 'Price: High → Low' }
        ]}
        activeSort={activeSort}
        onSortChange={setActiveSort}
      />

      {/* Category Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mt-4 scrollbar-none">
        {categories.map(cat => (
          <Chip key={cat} active={activeChip === cat} onClick={() => { setActiveChip(cat); setActiveFilter('all'); }}>
            {cat}
          </Chip>
        ))}
      </div>

      {/* Results Grid */}
      {filtered.length === 0 ? (
        <div className="bg-[#f6f2e9] rounded-3xl p-12 text-center mt-8">
          <h3 className="text-xl font-bold text-[#1c1c18]">No experiences found</h3>
          <p className="text-sm text-[#46464c] mt-2">Try adjusting your filters or search terms.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {filtered.map(activity => {
            const isSaved = savedActivityIds.includes(activity.id);
            return (
              <div key={activity.id} className="bg-white rounded-2xl border border-[#e6e3dc] overflow-hidden group hover:shadow-lg transition-shadow duration-500">
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={activity.image}
                    alt={activity.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  {/* Category Badge */}
                  <span className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm text-[10px] font-semibold rounded-full text-[#1c1c18]">
                    {activity.category}
                  </span>
                  {/* Save Button */}
                  <button
                    onClick={() => toggleSaveActivity(activity.id)}
                    className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-colors cursor-pointer ${isSaved ? 'bg-[#00696d] text-white' : 'bg-white/90 text-[#46464c] hover:text-[#00696d]'}`}
                  >
                    <Bookmark className="w-4 h-4" fill={isSaved ? 'currentColor' : 'none'} />
                  </button>
                  {/* Cost */}
                  <span className="absolute bottom-3 right-3 px-3 py-1 bg-[#1c1c18]/80 text-white text-xs font-semibold rounded-full">
                    {activity.cost}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-sm font-bold text-[#1c1c18] line-clamp-2 leading-snug">{activity.title}</h3>
                  <div className="flex items-center gap-2 mt-1.5 text-xs text-[#76777d]">
                    <MapPin className="w-3 h-3" />
                    <span>{activity.city}, {activity.country}</span>
                  </div>

                  <p className="text-xs text-[#46464c] mt-2 line-clamp-2 leading-relaxed">{activity.description}</p>

                  <div className="flex items-center gap-3 mt-3 text-xs text-[#76777d]">
                    <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-[#dbc3a8] fill-current" /><span className="font-semibold text-[#1c1c18]">{activity.rating}</span> ({activity.reviews})</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{activity.duration}</span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {activity.tags.map((tag, i) => (
                      <span key={i} className="px-2 py-0.5 bg-[#f6f2e9] text-[#46464c] text-[10px] font-medium rounded-full">{tag}</span>
                    ))}
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#e6e3dc]">
                    <Button variant="tealLight" size="sm" icon={Plus} className="w-full justify-center">
                      Add to Trip
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
