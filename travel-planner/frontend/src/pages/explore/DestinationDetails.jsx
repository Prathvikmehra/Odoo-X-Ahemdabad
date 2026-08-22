import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTravel } from '../../context/TravelContext';
import { Button, Eyebrow } from '../../components/common/Button';
import { MapPin, Calendar, Clock, Star, Plus, ArrowLeft, Check } from 'lucide-react';

export default function DestinationDetails() {
  const { city } = useParams();
  const navigate = useNavigate();
  const { regionalSelections, curatedActivities, trips, addSectionToTrip } = useTravel();

  const [selectedTripId, setSelectedTripId] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [datesText, setDatesText] = useState('3 Nights');
  const [budgetValue, setBudgetValue] = useState(25000);

  // Find city info from regional selections or fallback
  const normalizedCity = city ? city.charAt(0).toUpperCase() + city.slice(1).toLowerCase() : 'Kyoto';
  const cityInfo = regionalSelections.find(c => c.name.toLowerCase() === normalizedCity.toLowerCase()) || {
    name: normalizedCity,
    region: "World Destination",
    photo: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80",
    tag: "Cultural Sanctuary",
    tripCount: "840 planned"
  };

  // Find activities for this city
  const cityActivities = curatedActivities.filter(a => a.city.toLowerCase() === normalizedCity.toLowerCase());

  const handleAddStop = () => {
    if (!selectedTripId) return;
    addSectionToTrip(selectedTripId, {
      city: cityInfo.name,
      allocatedBudget: Number(budgetValue),
      dates: datesText,
      notes: `Curated stop in ${cityInfo.name}.`
    });
    setShowAddModal(false);
    navigate(`/trips/${selectedTripId}/itinerary-builder`);
  };

  return (
    <div className="bg-[#fcf9f3] min-h-screen pb-24">
      {/* Editorial Header Hero */}
      <div className="relative w-full h-[60vh] min-h-[400px]">
        <img 
          src={cityInfo.photo} 
          alt={cityInfo.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        
        {/* Back Button */}
        <button 
          onClick={() => navigate('/explore')}
          className="absolute top-6 left-6 p-3 bg-white/90 text-[#1c1c18] rounded-full hover:bg-white transition-all shadow-md cursor-pointer flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-16 text-white max-w-[1440px] mx-auto w-full">
          <Eyebrow color="text-[#9af1f5]">{cityInfo.tag}</Eyebrow>
          <h1 className="display-headline text-5xl md:text-8xl font-bold tracking-tight mt-2">
            {cityInfo.name}
          </h1>
          <p className="text-white/80 text-sm md:text-base mt-2 flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-[#9af1f5]" /> {cityInfo.region} · {cityInfo.tripCount}
          </p>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-16 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left 2 Cols: Content & Activities */}
        <div className="lg:col-span-2 space-y-12">
          {/* Editorial Description */}
          <div className="space-y-4">
            <Eyebrow color="text-[#00696d]">About the City</Eyebrow>
            <p className="text-lg text-[#1c1c18] font-serif leading-relaxed">
              {cityInfo.name} embodies the intersection of deep historical roots and breathtaking scenery. 
              From the peaceful morning air of local temples or canals to the bustling local food stalls that come alive at twilight, 
              this destination represents the soul of its region. Perfect for travelers seeking a slower, more intentional pace of discovery.
            </p>
          </div>

          {/* Seeded Activities / Must Sees */}
          <div className="space-y-6">
            <Eyebrow color="text-[#00696d]">Must-See Experiences</Eyebrow>
            <div className="space-y-4">
              {cityActivities.length === 0 ? (
                <div className="bg-[#f9f5ed] border border-[#e6e3dc] rounded-2xl p-6 text-center text-sm text-[#76777d]">
                  No curated experiences listed yet. Add custom stops via Itinerary Builder.
                </div>
              ) : cityActivities.map(act => (
                <div key={act.id} className="bg-white rounded-2xl border border-[#e6e3dc] p-4 flex flex-col sm:flex-row gap-4 hover:shadow-md transition-shadow group">
                  <div className="w-full sm:w-32 h-24 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={act.image} alt={act.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="px-2 py-0.5 bg-[#9af1f5]/25 text-[#00696d] text-[9px] font-bold rounded-full uppercase tracking-wider">{act.category}</span>
                        <span className="text-[10px] text-[#76777d]">{act.duration}</span>
                      </div>
                      <h3 className="text-sm font-semibold text-[#1c1c18]">{act.title}</h3>
                      <p className="text-xs text-[#46464c] mt-1 line-clamp-1">{act.description}</p>
                    </div>
                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#fcf9f3]">
                      <span className="text-xs font-bold text-[#00696d]">{act.cost}</span>
                      <span className="text-xs text-[#76777d] flex items-center gap-0.5"><Star className="w-3.5 h-3.5 text-[#dbc3a8] fill-current" /> {act.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Sidebar & Action */}
        <div className="space-y-6">
          <div className="bg-[#f9f5ed] border border-[#e6e3dc] rounded-3xl p-6 space-y-6">
            <h3 className="text-lg font-bold text-[#1c1c18] tracking-tight">Add to Journey</h3>
            <p className="text-xs text-[#46464c] leading-relaxed">
              Include {cityInfo.name} as a stop on one of your planned trips to start building an active day-by-day itinerary.
            </p>

            <Button variant="primary" size="lg" icon={Plus} className="w-full justify-center" onClick={() => setShowAddModal(true)}>
              Add {cityInfo.name} to Trip
            </Button>
          </div>

          {/* Travel Info Stamp */}
          <div className="bg-white border border-[#e6e3dc] rounded-3xl p-6 space-y-4">
            <span className="eyebrow-label text-[#76777d] block text-center pb-2 border-b border-[#e6e3dc]">Travel Stamp</span>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <p className="text-[#76777d]">Best Season</p>
                <p className="font-semibold text-[#1c1c18]">Spring / Autumn</p>
              </div>
              <div>
                <p className="text-[#76777d]">Average Cost</p>
                <p className="font-semibold text-[#1c1c18]">Medium-High</p>
              </div>
              <div>
                <p className="text-[#76777d]">Ideal Duration</p>
                <p className="font-semibold text-[#1c1c18]">3 - 5 Days</p>
              </div>
              <div>
                <p className="text-[#76777d]">Local Currency</p>
                <p className="font-semibold text-[#1c1c18]">INR / Regional</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add stop Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-[#1c1c18]/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#fcf9f3] rounded-[36px] border border-[#e6e3dc] p-8 max-w-md w-full shadow-2xl space-y-6">
            <div>
              <Eyebrow color="text-[#00696d]">Add Stop</Eyebrow>
              <h3 className="text-xl font-bold text-[#1c1c18] mt-1">Add {cityInfo.name} to Trip</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-[#76777d] uppercase tracking-wider block mb-1">Select Journey</label>
                <select
                  value={selectedTripId}
                  onChange={(e) => setSelectedTripId(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-[#e6e3dc] rounded-full text-xs text-[#1c1c18] focus:outline-none"
                >
                  <option value="">-- Choose Trip --</option>
                  {trips.map(t => <option key={t.id} value={t.id}>{t.title}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-[#76777d] uppercase tracking-wider block mb-1">Duration</label>
                  <input 
                    type="text"
                    value={datesText}
                    onChange={(e) => setDatesText(e.target.value)}
                    className="w-full px-4 py-2 bg-white border border-[#e6e3dc] rounded-full text-xs text-[#1c1c18] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-[#76777d] uppercase tracking-wider block mb-1">Budget Allocation</label>
                  <input 
                    type="number"
                    value={budgetValue}
                    onChange={(e) => setBudgetValue(e.target.value)}
                    className="w-full px-4 py-2 bg-white border border-[#e6e3dc] rounded-full text-xs text-[#1c1c18] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Button variant="secondary" size="md" className="flex-1 justify-center" onClick={() => setShowAddModal(false)}>
                Cancel
              </Button>
              <Button 
                variant="primary" 
                size="md" 
                className="flex-1 justify-center" 
                disabled={!selectedTripId}
                onClick={handleAddStop}
              >
                Add Stop
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
