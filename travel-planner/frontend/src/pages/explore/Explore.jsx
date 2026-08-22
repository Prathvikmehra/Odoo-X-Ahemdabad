import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTravel } from '../../context/TravelContext';
import { Eyebrow, Button } from '../../components/common/Button';
import { Search, MapPin, Sparkles, BookOpen, Compass, ArrowRight } from 'lucide-react';

export default function Explore() {
  const navigate = useNavigate();
  const { regionalSelections, curatedActivities, communityStories } = useTravel();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?q=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate('/explore');
    }
  };

  const travelStyles = [
    { name: "Slow Immersive", desc: "Longer stays, local experiences, intentional pace", img: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=400&q=80" },
    { name: "Cultural Exploration", desc: "Temples, art galleries, history, food trails", img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=400&q=80" },
    { name: "Alpine Trekking", desc: "Mountain peaks, glacial lakes, nature escapes", img: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=400&q=80" }
  ];

  return (
    <div className="bg-[#fcf9f3] min-h-screen pb-24">
      
      {/* Editorial Search Hero */}
      <div className="relative w-full h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1600&q=80" 
            alt="Amalfi coastline" 
            className="w-full h-full object-cover scale-[1.03] animate-pulse duration-[8000ms]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-black/60" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-5 text-center text-white space-y-6">
          <Eyebrow color="text-secondary text-shadow">Where could we go?</Eyebrow>
          <h1 className="display-headline text-5xl md:text-8xl font-bold tracking-tight text-shadow leading-none">
            EXPLORE THE WORLD
          </h1>
          <p className="text-white/80 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Search destinations, regional sights, local culinary trails, or custom community itineraries.
          </p>

          {/* Search Box */}
          <form onSubmit={handleSearch} className="relative max-w-xl mx-auto mt-8">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search cities (Kyoto, Paris...), experiences..."
              className="w-full pl-14 pr-32 py-4 bg-surface-container-lowest/95 text-on-background border border-transparent rounded-full shadow-2xl focus:outline-none focus:bg-surface-container-lowest text-sm"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2.5 bg-on-background hover:bg-[#000000] text-white text-xs font-semibold rounded-full tracking-wide transition-all uppercase cursor-pointer"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-16 space-y-24 mt-20">
        
        {/* Popular Cities Rail */}
        <section className="space-y-6">
          <div className="flex items-end justify-between">
            <div>
              <Eyebrow>Selected Hubs</Eyebrow>
              <h2 className="text-2xl md:text-4xl font-bold text-on-background tracking-tight">Popular Cities</h2>
            </div>
            <button onClick={() => navigate('/explore')} className="text-secondary hover:underline flex items-center gap-1 text-xs font-semibold cursor-pointer">
              All Destinations <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          
          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-none snap-x">
            {regionalSelections?.map(city => (
              <div 
                key={city.id} 
                onClick={() => navigate(`/explore/${city.name.toLowerCase()}`)}
                className="relative min-w-[280px] h-[340px] rounded-3xl overflow-hidden cursor-pointer group shadow-sm border border-surface-container-high snap-start"
              >
                <img 
                  src={city.photo} 
                  alt={city.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <span className="px-2.5 py-0.5 bg-surface-container text-on-background text-[9px] font-bold rounded-full uppercase tracking-wider block w-max mb-2">
                    {city.tag}
                  </span>
                  <h3 className="text-xl font-bold tracking-tight leading-tight">{city.name}</h3>
                  <p className="text-white/70 text-xs mt-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-secondary" /> {city.region} · {city.tripCount}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Curated Experiences Rail */}
        <section className="space-y-6">
          <div className="flex items-end justify-between">
            <div>
              <Eyebrow>Experiences</Eyebrow>
              <h2 className="text-2xl md:text-4xl font-bold text-on-background tracking-tight">Curated Moments</h2>
            </div>
            <button onClick={() => navigate('/explore')} className="text-secondary hover:underline flex items-center gap-1 text-xs font-semibold cursor-pointer">
              All Activities <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {curatedActivities?.slice(0, 3).map(act => (
              <div key={act.id} className="bg-surface-container-lowest rounded-3xl border border-surface-container-high overflow-hidden group hover:shadow-lg transition-shadow duration-500 flex flex-col justify-between">
                <div className="relative h-48 overflow-hidden">
                  <img src={act.image} alt={act.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <span className="absolute top-3 left-3 px-3 py-1 bg-surface-container-lowest/90 text-[10px] font-semibold rounded-full text-on-background uppercase tracking-wider">{act.category}</span>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-on-background line-clamp-2">{act.title}</h3>
                    <p className="text-xs text-muted mt-1 flex items-center gap-1"><MapPin className="w-3 h-3" />{act.city}, {act.country}</p>
                    <p className="text-xs text-muted mt-2 line-clamp-2 leading-relaxed">{act.description}</p>
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-surface-container-high">
                    <span className="text-xs font-bold text-secondary">{act.cost}</span>
                    <button 
                      onClick={() => navigate(`/explore?q=${encodeURIComponent(act.city)}`)}
                      className="text-xs font-semibold text-on-background hover:text-secondary flex items-center gap-1 cursor-pointer"
                    >
                      Details <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Travel Styles */}
        <section className="space-y-6">
          <div>
            <Eyebrow>Travel Styles</Eyebrow>
            <h2 className="text-2xl md:text-4xl font-bold text-on-background tracking-tight">Intentional Journeys</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {travelStyles.map((style, idx) => (
              <div key={idx} className="relative h-[220px] rounded-3xl overflow-hidden group border border-surface-container-high cursor-pointer">
                <img src={style.img} alt={style.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <h3 className="text-lg font-bold">{style.name}</h3>
                  <p className="text-white/70 text-xs mt-1 leading-relaxed">{style.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Stories */}
        <section className="bg-surface-container border border-surface-container-high rounded-[36px] p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/2 space-y-4">
            <Eyebrow color="text-secondary">Featured Story</Eyebrow>
            <h2 className="display-headline text-3xl md:text-5xl font-bold text-on-background">The Quiet Japanese Autumn</h2>
            <p className="text-sm text-muted font-serif leading-relaxed">
              "A 10-day contemplative journal through ancient Kyoto temples, misty Hakone hot springs, and Shinjuku neon lanes."
            </p>
            <Button variant="primary" icon={ArrowRight} iconPosition="right" onClick={() => navigate('/shared/tokyo-kyoto-2026')}>
              Read Travel Journal
            </Button>
          </div>
          <div className="md:w-1/2 w-full h-[280px] md:h-[360px] rounded-2xl overflow-hidden shadow-md">
            <img 
              src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80" 
              alt="Kyoto pagoda" 
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
            />
          </div>
        </section>

      </div>
    </div>
  );
}

// Chevron helper
function ChevronRight({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}
