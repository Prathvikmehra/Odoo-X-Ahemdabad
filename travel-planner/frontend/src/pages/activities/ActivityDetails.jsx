import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTravel } from '../../context/TravelContext';
import { Button, Eyebrow } from '../../components/common/Button';
import { MapPin, Clock, Star, ArrowLeft, Plus, Calendar, Compass } from 'lucide-react';

export default function ActivityDetails() {
  const { activityId } = useParams();
  const navigate = useNavigate();
  const { curatedActivities, trips, addActivityToTrip } = useTravel();

  const [selectedTripId, setSelectedTripId] = useState('');
  const [selectedStopId, setSelectedStopId] = useState('');
  const [dayNumber, setDayNumber] = useState(1);
  const [activityTime, setActivityTime] = useState('10:00 AM');
  const [showAddModal, setShowAddModal] = useState(false);

  // Find activity details
  const activity = curatedActivities.find(a => a.id === activityId) || curatedActivities[0];

  const selectedTrip = trips.find(t => t.id === selectedTripId);
  const stops = selectedTrip?.sections || [];

  const handleAddActivity = () => {
    if (!selectedTripId || !selectedStopId) return;
    
    addActivityToTrip(selectedTripId, selectedStopId, Number(dayNumber), {
      title: activity.title,
      category: activity.category,
      duration: activity.duration,
      cost: activity.priceNum,
      location: activity.city,
      description: activity.description,
      image: activity.image,
      time: activityTime
    });

    setShowAddModal(false);
    navigate(`/trips/${selectedTripId}/itinerary`);
  };

  return (
    <div className="bg-[#fcf9f3] min-h-screen pb-24">
      {/* Back Header */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-16 py-6">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-xs font-semibold text-[#46464c] hover:text-[#1c1c18] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Explore
        </button>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-16 grid grid-cols-1 lg:grid-cols-2 gap-12 mt-6">
        
        {/* Left Column: Big Image Composition */}
        <div className="space-y-4">
          <div className="h-[400px] md:h-[500px] rounded-[36px] overflow-hidden shadow-sm border border-[#e6e3dc]">
            <img 
              src={activity.image} 
              alt={activity.title} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex items-center justify-between text-xs text-[#76777d] px-2">
            <span>Seeded Activity Reference: {activity.id}</span>
            <span>Photo via Unsplash</span>
          </div>
        </div>

        {/* Right Column: Details & Adding */}
        <div className="flex flex-col justify-between space-y-8">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-[#9af1f5]/25 text-[#00696d] text-xs font-bold rounded-full uppercase tracking-wider">
                {activity.category}
              </span>
              <span className="text-xs text-[#76777d] flex items-center gap-0.5">
                <Star className="w-3.5 h-3.5 text-[#dbc3a8] fill-current" /> {activity.rating} ({activity.reviews} reviews)
              </span>
            </div>

            <h1 className="display-headline text-3xl md:text-5xl font-bold text-[#1c1c18] leading-tight">
              {activity.title}
            </h1>

            <div className="flex items-center gap-1.5 text-sm text-[#46464c]">
              <MapPin className="w-4 h-4 text-[#c6c6cc]" />
              <span>{activity.city}, {activity.country}</span>
            </div>

            <p className="text-base text-[#46464c] leading-relaxed font-serif">
              {activity.description}
            </p>

            {/* Quick Details Grid */}
            <div className="grid grid-cols-2 gap-4 py-4 border-y border-[#e6e3dc]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#f6f2e9] flex items-center justify-center text-[#1c1c18]">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] text-[#76777d] uppercase tracking-wider font-semibold">Duration</p>
                  <p className="text-sm font-bold text-[#1c1c18]">{activity.duration}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#f6f2e9] flex items-center justify-center text-[#00696d]">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] text-[#76777d] uppercase tracking-wider font-semibold">Estimated Cost</p>
                  <p className="text-sm font-bold text-[#1c1c18]">{activity.cost}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <Button variant="primary" size="lg" icon={Plus} className="w-full sm:w-auto justify-center" onClick={() => setShowAddModal(true)}>
              Add to Trip Itinerary
            </Button>
          </div>
        </div>

      </div>

      {/* Add activity Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-[#1c1c18]/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#fcf9f3] rounded-[36px] border border-[#e6e3dc] p-8 max-w-md w-full shadow-2xl space-y-6 animate-in fade-in zoom-in-95 duration-200">
            <div>
              <Eyebrow color="text-[#00696d]">Add to Itinerary</Eyebrow>
              <h3 className="text-xl font-bold text-[#1c1c18] mt-1">Select Stop & Day</h3>
              <p className="text-xs text-[#76777d] mt-1">Add "{activity.title}" to one of your active destinations.</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-[#76777d] uppercase tracking-wider block mb-1">Select Journey</label>
                <select
                  value={selectedTripId}
                  onChange={(e) => { setSelectedTripId(e.target.value); setSelectedStopId(''); }}
                  className="w-full px-4 py-2.5 bg-white border border-[#e6e3dc] rounded-full text-xs text-[#1c1c18] focus:outline-none"
                >
                  <option value="">-- Choose Trip --</option>
                  {trips.map(t => <option key={t.id} value={t.id}>{t.title}</option>)}
                </select>
              </div>

              {selectedTripId && (
                <>
                  <div>
                    <label className="text-[10px] font-bold text-[#76777d] uppercase tracking-wider block mb-1">Select Stop / City</label>
                    <select
                      value={selectedStopId}
                      onChange={(e) => setSelectedStopId(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white border border-[#e6e3dc] rounded-full text-xs text-[#1c1c18] focus:outline-none"
                    >
                      <option value="">-- Choose City Stop --</option>
                      {stops.map(s => <option key={s.id} value={s.id}>{s.city}</option>)}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-bold text-[#76777d] uppercase tracking-wider block mb-1">Day Number</label>
                      <input 
                        type="number"
                        min="1"
                        max="20"
                        value={dayNumber}
                        onChange={(e) => setDayNumber(e.target.value)}
                        className="w-full px-4 py-2 bg-white border border-[#e6e3dc] rounded-full text-xs text-[#1c1c18] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-[#76777d] uppercase tracking-wider block mb-1">Time</label>
                      <input 
                        type="text"
                        value={activityTime}
                        onChange={(e) => setActivityTime(e.target.value)}
                        className="w-full px-4 py-2 bg-white border border-[#e6e3dc] rounded-full text-xs text-[#1c1c18] focus:outline-none"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="flex gap-3 pt-2">
              <Button variant="secondary" size="md" className="flex-1 justify-center" onClick={() => setShowAddModal(false)}>
                Cancel
              </Button>
              <Button 
                variant="primary" 
                size="md" 
                className="flex-1 justify-center" 
                disabled={!selectedTripId || !selectedStopId}
                onClick={handleAddActivity}
              >
                Add Activity
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
