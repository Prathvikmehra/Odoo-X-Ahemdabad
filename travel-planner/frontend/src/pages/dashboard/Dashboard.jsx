import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTravel } from '../../context/TravelContext';
import { Button, Eyebrow, Chip } from '../../components/common/Button';
import { 
  MapPin, 
  Calendar, 
  ArrowRight, 
  TrendingUp, 
  Compass, 
  Globe, 
  Sparkles, 
  Users 
} from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, trips, regionalSelections } = useTravel();

  // If data is loading or missing
  if (!user || !trips) {
    return <div className="p-16 text-center text-[#76777d]">Loading your travel desk...</div>;
  }

  // Find hero trip (ongoing or upcoming)
  const heroTrip = trips.find(t => t.status === 'ongoing') || trips.find(t => t.status === 'upcoming') || trips[0];
  
  // Other journeys
  const otherTrips = trips.filter(t => t.id !== heroTrip?.id && t.status !== 'completed');
  
  // Previous journeys
  const previousTrips = trips.filter(t => t.status === 'completed');

  // Format today's date
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  // Calculate days remaining or elapsed
  const calculateDaysInfo = (trip) => {
    if (!trip) return null;
    const start = new Date(trip.startDate);
    const end = new Date(trip.endDate);
    const now = new Date();
    
    if (trip.status === 'upcoming') {
      const diff = Math.ceil((start - now) / (1000 * 60 * 60 * 24));
      return `${diff} days until departure`;
    } else if (trip.status === 'ongoing') {
      const total = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      const current = Math.ceil((now - start) / (1000 * 60 * 60 * 24));
      return `Day ${current} of ${total}`;
    } else {
      return `Completed`;
    }
  };

  const getStatusChipProps = (status) => {
    switch(status) {
      case 'ongoing': return { variant: 'teal', label: 'Ongoing' };
      case 'upcoming': return { variant: 'secondary', label: 'Upcoming' }; // Using secondary since 'sand' isn't standard Button variant, might need custom styling or standard variant
      case 'completed': return { variant: 'ghost', label: 'Completed' };
      default: return { variant: 'ghost', label: status };
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <div className="relative min-h-screen bg-[#fcf9f3] pb-32">
      <div className="max-w-[1440px] mx-auto px-5 md:px-16 pt-12 space-y-16">
        
        {/* Section 1: Warm Greeting Header */}
        <section className="space-y-4">
          <div className="eyebrow-label text-[#76777d]">YOUR TRAVEL DESK</div>
          <h1 className="display-headline text-3xl md:text-5xl font-bold text-[#1c1c18] tracking-tight">
            Good morning, {user.name.split(' ')[0]} — where will you go next?
          </h1>
          <p className="text-[#46464c] text-lg">{today}</p>
        </section>

        {/* Section 2: Hero Trip Card */}
        {heroTrip && (
          <section>
            <div 
              className="relative w-full h-[400px] md:h-[480px] rounded-[36px] overflow-hidden cursor-pointer group shadow-sm"
              onClick={() => navigate(`/trips/${heroTrip.id}/itinerary`)}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${heroTrip.coverImage}?auto=format&fit=crop&w=1600&q=80)` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              
              <div className="absolute inset-0 p-8 md:p-12 flex flex-col md:flex-row justify-between items-start md:items-end z-10">
                
                <div className="text-white space-y-4 flex-1">
                  <div className="eyebrow-label text-white/80">
                    {heroTrip.status === 'ongoing' ? 'CURRENT JOURNEY' : 'NEXT JOURNEY'}
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold tracking-tight">{heroTrip.title}</h2>
                  <p className="text-white/90 text-lg max-w-xl">{heroTrip.subtitle || heroTrip.description}</p>
                  
                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium">
                      <Calendar size={16} />
                      {new Date(heroTrip.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - 
                      {new Date(heroTrip.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                    {heroTrip.destinations?.slice(0, 2).map((dest, i) => (
                      <div key={i} className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium">
                        <MapPin size={16} />
                        {dest.name}
                      </div>
                    ))}
                    {heroTrip.destinations?.length > 2 && (
                      <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium">
                        +{heroTrip.destinations.length - 2} more
                      </div>
                    )}
                  </div>
                </div>

                <div className="hidden md:flex flex-col items-end gap-6 min-w-[280px]">
                  <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 w-full">
                    <div className="text-white/80 text-sm mb-1">{calculateDaysInfo(heroTrip)}</div>
                    
                    <div className="mt-4">
                      <div className="flex justify-between text-white text-sm mb-2">
                        <span>Budget</span>
                        <span>{Math.round((heroTrip.spent / heroTrip.budget) * 100)}%</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <div 
                          className="bg-white rounded-full h-2" 
                          style={{ width: `${Math.min(100, (heroTrip.spent / heroTrip.budget) * 100)}%` }}
                        />
                      </div>
                    </div>

                    {heroTrip.collaborators?.length > 0 && (
                      <div className="mt-6 flex items-center justify-between">
                        <span className="text-white/80 text-sm">Travelers</span>
                        <div className="flex -space-x-3">
                          {heroTrip.collaborators.map((c, i) => (
                            <img 
                              key={i} 
                              src={c.avatar} 
                              alt={c.name} 
                              className="w-8 h-8 rounded-full border-2 border-transparent object-cover"
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 text-white font-medium hover:text-[#9af1f5] transition-colors cursor-pointer">
                    View full itinerary <ArrowRight size={20} />
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Section 3: Your Other Journeys */}
        {otherTrips.length > 0 && (
          <section className="space-y-6">
            <div className="eyebrow-label text-[#76777d]">YOUR OTHER JOURNEYS</div>
            <div className="flex overflow-x-auto gap-6 pb-6 snap-x hide-scrollbar">
              {otherTrips.map(trip => (
                <div 
                  key={trip.id}
                  onClick={() => navigate(`/trips/${trip.id}`)}
                  className="min-w-[300px] md:min-w-[360px] flex-shrink-0 bg-white rounded-3xl overflow-hidden cursor-pointer group shadow-sm border border-[#e6e3dc] snap-start flex flex-col h-[340px]"
                >
                  <div className="relative h-44 overflow-hidden">
                    <img 
                      src={`${trip.coverImage}?auto=format&fit=crop&w=600&q=80`} 
                      alt={trip.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      {trip.status === 'upcoming' ? (
                        <div className="bg-[#dbc3a8] text-[#261908] px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase">
                          Upcoming
                        </div>
                      ) : (
                        <div className="bg-[#9af1f5] text-[#00696d] px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase">
                          {trip.status}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1 justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-[#1c1c18] line-clamp-1">{trip.title}</h3>
                      <div className="flex items-center gap-2 text-[#76777d] mt-2 text-sm">
                        <Calendar size={14} />
                        {new Date(trip.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#46464c] text-sm mt-4">
                      <MapPin size={16} className="text-[#c6c6cc]" />
                      {trip.destinations?.length || 0} destinations
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section 4: Top Regional Selections */}
        {regionalSelections?.length > 0 && (
          <section className="space-y-6">
            <div className="eyebrow-label text-[#76777d] flex items-center justify-between">
              <span>TOP REGIONAL SELECTIONS</span>
              <button className="text-[#00696d] flex items-center gap-1 hover:underline text-sm font-medium normal-case">
                Explore all <ArrowRight size={14} />
              </button>
            </div>
            <div className="flex overflow-x-auto gap-4 pb-4 snap-x hide-scrollbar">
              {regionalSelections.map(region => (
                <div 
                  key={region.id}
                  className="relative w-[140px] h-[140px] flex-shrink-0 rounded-2xl overflow-hidden cursor-pointer group snap-start"
                >
                  <img 
                    src={`${region.image}?auto=format&fit=crop&w=300&q=80`} 
                    alt={region.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <div className="font-semibold text-sm leading-tight">{region.name}</div>
                    <div className="text-[10px] text-white/80 uppercase tracking-wider mt-0.5">{region.tag || 'Explore'}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section 5: Previous Journeys */}
        {previousTrips.length > 0 && (
          <section className="space-y-6">
            <div className="eyebrow-label text-[#76777d]">PREVIOUS JOURNEYS</div>
            <div className="flex overflow-x-auto gap-5 pb-6 snap-x hide-scrollbar">
              {previousTrips.map(trip => (
                <div 
                  key={trip.id}
                  onClick={() => navigate(`/trips/${trip.id}`)}
                  className="min-w-[260px] md:min-w-[300px] flex-shrink-0 bg-[#f9f5ed] rounded-3xl overflow-hidden cursor-pointer group border border-[#e6e3dc] snap-start"
                >
                  <div className="relative h-32 overflow-hidden bg-[#e6e3dc]">
                    {trip.coverImage ? (
                      <img 
                        src={`${trip.coverImage}?auto=format&fit=crop&w=500&q=80`} 
                        alt={trip.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#c6c6cc]">
                        <Globe size={32} />
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-[#46464c] line-clamp-1 group-hover:text-[#1c1c18] transition-colors">{trip.title}</h3>
                    <div className="text-[#76777d] text-sm mt-1">
                      {new Date(trip.endDate).getFullYear()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section 6: Journey Stats Bar */}
        {user.stats && (
          <section className="pt-12 border-t border-[#e6e3dc]">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              <div className="space-y-2">
                <div className="display-headline text-4xl md:text-5xl font-bold text-[#1c1c18]">
                  {user.stats.tripsCount || 0}
                </div>
                <div className="eyebrow-label text-[#76777d]">Journeys</div>
              </div>
              <div className="space-y-2">
                <div className="display-headline text-4xl md:text-5xl font-bold text-[#1c1c18]">
                  {user.stats.citiesExplored || 0}
                </div>
                <div className="eyebrow-label text-[#76777d]">Destinations</div>
              </div>
              <div className="space-y-2">
                <div className="display-headline text-4xl md:text-5xl font-bold text-[#1c1c18]">
                  {user.stats.experiencesCompleted || 0}
                </div>
                <div className="eyebrow-label text-[#76777d]">Experiences</div>
              </div>
              <div className="space-y-2">
                <div className="display-headline text-4xl md:text-5xl font-bold text-[#00696d]">
                  {formatCurrency(user.stats.totalPlanned || 0)}
                </div>
                <div className="eyebrow-label text-[#76777d]">Total Planned</div>
              </div>
            </div>
          </section>
        )}
      </div>

      {/* Section 7: Floating 'Plan a Trip' CTA */}
      <div className="fixed bottom-8 left-0 right-0 flex justify-center z-50 pointer-events-none">
        <div className="pointer-events-auto shadow-xl rounded-full">
          <Button 
            variant="primary" 
            size="lg" 
            className="rounded-full px-8 py-4 text-base font-medium shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
            onClick={() => navigate('/trips/new')}
          >
            <Sparkles size={18} className="mr-2" />
            Plan a New Journey
          </Button>
        </div>
      </div>
    </div>
  );
}
