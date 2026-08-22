import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Compass, 
  Calendar, 
  MapPin, 
  Sparkles, 
  Image as ImageIcon, 
  Plus, 
  Check, 
  ArrowRight, 
  Clock, 
  Star, 
  IndianRupee,
  Layers,
  Info
} from 'lucide-react';
import { Button, Eyebrow, Chip } from '../../components/common/Button';
import { useTravel } from '../../context/TravelContext';

const PRESET_COVERS = [
  {
    name: "Kyoto Autumn",
    url: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1600&q=85"
  },
  {
    name: "Amalfi Coast",
    url: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1600&q=85"
  },
  {
    name: "Iceland Aurora",
    url: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=1600&q=85"
  },
  {
    name: "Tokyo Alleys",
    url: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1600&q=80"
  },
  {
    name: "Udaipur Palace",
    url: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1600&q=85"
  },
  {
    name: "Barcelona Gothic",
    url: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=1600&q=80"
  }
];

export default function CreateTrip() {
  const navigate = useNavigate();
  const { addTrip, curatedActivities = [], showToast } = useTravel();

  // Form State
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [endDate, setEndDate] = useState(() => {
    const nextWeek = new Date(Date.now() + 7 * 86400000);
    return nextWeek.toISOString().split('T')[0];
  });
  const [destinations, setDestinations] = useState('');
  const [notes, setNotes] = useState('');
  const [totalBudget, setTotalBudget] = useState('120000');
  const [coverImage, setCoverImage] = useState(PRESET_COVERS[0].url);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Toggle activity selection
  const handleToggleActivity = (activity) => {
    const isAlreadySelected = selectedActivities.some(a => a.id === activity.id);
    if (isAlreadySelected) {
      setSelectedActivities(prev => prev.filter(a => a.id !== activity.id));
      showToast?.(`Removed "${activity.title}" from selections.`);
    } else {
      setSelectedActivities(prev => [...prev, activity]);
      
      // Auto-append city to destinations if not already there
      if (activity.city) {
        const currentDestList = destinations
          .split(',')
          .map(d => d.trim())
          .filter(Boolean);
        
        if (!currentDestList.some(d => d.toLowerCase() === activity.city.toLowerCase())) {
          const updated = currentDestList.length > 0 ? `${destinations}, ${activity.city}` : activity.city;
          setDestinations(updated);
        }
      }
      showToast?.(`Added "${activity.title}" to journey blueprint.`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      showToast?.("Please enter a title for your journey.");
      return;
    }

    setIsSubmitting(true);

    const destinationList = destinations
      .split(',')
      .map(d => d.trim())
      .filter(Boolean);

    // Build curated sections based on destinations
    const finalDestinations = destinationList.length > 0 ? destinationList : ["Kyoto"];
    const perSectionBudget = Math.round((Number(totalBudget) || 100000) / finalDestinations.length);

    const sections = finalDestinations.map((city, idx) => {
      // Find activities matching this city or distribute
      const cityActivities = selectedActivities.filter(
        act => act.city?.toLowerCase() === city.toLowerCase()
      );
      const remainingActivities = idx === 0 
        ? selectedActivities.filter(act => !finalDestinations.some(d => d.toLowerCase() === act.city?.toLowerCase()))
        : [];
      const combinedCityActivities = [...cityActivities, ...remainingActivities];

      return {
        id: `sec_${Date.now()}_${idx}`,
        city: city,
        country: "World",
        dates: `${startDate} – ${endDate}`,
        allocatedBudget: perSectionBudget,
        coverImage: coverImage || PRESET_COVERS[0].url,
        notes: notes || `Exploration itinerary for ${city}.`,
        days: combinedCityActivities.length > 0 ? combinedCityActivities.map((act, actIdx) => ({
          dayNumber: actIdx + 1,
          title: `Day ${actIdx + 1}: ${act.title}`,
          date: `Day ${actIdx + 1}`,
          activities: [
            {
              id: `act_${Date.now()}_${actIdx}`,
              time: "10:00 AM",
              title: act.title,
              category: act.category || "Sightseeing",
              duration: act.duration || "2 hours",
              cost: Number(act.priceNum) || 0,
              location: act.city || city,
              description: act.description || "",
              image: act.image || coverImage
            }
          ]
        })) : []
      };
    });

    const newTrip = addTrip({
      title: title.trim(),
      subtitle: notes.trim() ? notes.trim().slice(0, 140) + (notes.length > 140 ? '...' : '') : "A bespoke journey awaiting exploration.",
      startDate: startDate || new Date().toISOString().split('T')[0],
      endDate: endDate || new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
      coverImage: coverImage.trim() || PRESET_COVERS[0].url,
      totalBudget: Number(totalBudget) || 100000,
      destinations: finalDestinations,
      summary: notes.trim() || `Bespoke travel plan across ${finalDestinations.join(', ')}.`,
      sections: sections
    });

    if (newTrip && newTrip.id) {
      navigate(`/trips/${newTrip.id}`);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#fcf9f3] py-12 md:py-16">
      <div className="max-w-[1440px] mx-auto px-5 md:px-16">
        
        {/* 1. Page Header */}
        <div className="max-w-3xl mb-10 md:mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#00696d]" />
            <Eyebrow color="text-[#00696d]">NEW JOURNEY</Eyebrow>
          </div>
          <h1 className="display-headline text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#1c1c18] mb-4">
            Plan your next adventure
          </h1>
          <p className="text-base md:text-lg text-[#46464c] leading-relaxed font-light">
            Draft your route, calibrate your financial blueprint, and weave curated cultural experiences into a timeless travel journal.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          
          {/* 2. Creation Form Column (Form Card) */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-[36px] p-8 md:p-12 border border-[#e6e3dc] shadow-sm">
              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* Trip Name */}
                <div>
                  <label htmlFor="tripName" className="block text-xs font-semibold uppercase tracking-[0.1em] text-[#1c1c18] mb-2.5">
                    Trip Name <span className="text-[#00696d]">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#76777d]">
                      <Compass className="w-5 h-5 text-[#00696d]" />
                    </div>
                    <input
                      id="tripName"
                      type="text"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Autumn in Kyoto & Tokyo"
                      className="w-full pl-12 pr-5 py-3.5 bg-[#fcf9f3]/50 hover:bg-[#fcf9f3] focus:bg-white text-[#1c1c18] text-sm md:text-base rounded-full border border-[#e6e3dc] focus:border-[#1c1c18] focus:ring-1 focus:ring-[#1c1c18] transition-all outline-none placeholder:text-[#76777d]/70"
                    />
                  </div>
                </div>

                {/* 2-Column Grid: Dates */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="startDate" className="block text-xs font-semibold uppercase tracking-[0.1em] text-[#1c1c18] mb-2.5">
                      Start Date
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#76777d]">
                        <Calendar className="w-4 h-4 text-[#76777d]" />
                      </div>
                      <input
                        id="startDate"
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full pl-11 pr-5 py-3.5 bg-[#fcf9f3]/50 hover:bg-[#fcf9f3] focus:bg-white text-[#1c1c18] text-sm rounded-full border border-[#e6e3dc] focus:border-[#1c1c18] focus:ring-1 focus:ring-[#1c1c18] transition-all outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="endDate" className="block text-xs font-semibold uppercase tracking-[0.1em] text-[#1c1c18] mb-2.5">
                      End Date
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#76777d]">
                        <Calendar className="w-4 h-4 text-[#76777d]" />
                      </div>
                      <input
                        id="endDate"
                        type="date"
                        value={endDate}
                        min={startDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full pl-11 pr-5 py-3.5 bg-[#fcf9f3]/50 hover:bg-[#fcf9f3] focus:bg-white text-[#1c1c18] text-sm rounded-full border border-[#e6e3dc] focus:border-[#1c1c18] focus:ring-1 focus:ring-[#1c1c18] transition-all outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Destinations Input */}
                <div>
                  <label htmlFor="destinations" className="block text-xs font-semibold uppercase tracking-[0.1em] text-[#1c1c18] mb-2.5">
                    Destinations <span className="text-xs font-normal text-[#76777d] lowercase">(comma-separated)</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#76777d]">
                      <MapPin className="w-5 h-5 text-[#00696d]" />
                    </div>
                    <input
                      id="destinations"
                      type="text"
                      value={destinations}
                      onChange={(e) => setDestinations(e.target.value)}
                      placeholder="e.g. Tokyo, Hakone, Kyoto"
                      className="w-full pl-12 pr-5 py-3.5 bg-[#fcf9f3]/50 hover:bg-[#fcf9f3] focus:bg-white text-[#1c1c18] text-sm rounded-full border border-[#e6e3dc] focus:border-[#1c1c18] focus:ring-1 focus:ring-[#1c1c18] transition-all outline-none placeholder:text-[#76777d]/70"
                    />
                  </div>
                  <p className="text-xs text-[#76777d] mt-2 flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-[#00696d]" />
                    <span>Each destination will automatically form an editable section in your itinerary.</span>
                  </p>
                </div>

                {/* Description / Journal Notes Textarea */}
                <div>
                  <label htmlFor="notes" className="block text-xs font-semibold uppercase tracking-[0.1em] text-[#1c1c18] mb-2.5">
                    Journal Vision & Exploration Notes
                  </label>
                  <textarea
                    id="notes"
                    rows={4}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Describe your intent, theme (e.g. brutalist architecture, quiet tea gardens), or key wishes for this expedition..."
                    className="w-full p-4 bg-[#fcf9f3]/50 hover:bg-[#fcf9f3] focus:bg-white text-[#1c1c18] text-sm rounded-2xl border border-[#e6e3dc] focus:border-[#1c1c18] focus:ring-1 focus:ring-[#1c1c18] transition-all outline-none placeholder:text-[#76777d]/70 resize-y"
                  />
                </div>

                {/* Total Budget */}
                <div>
                  <label htmlFor="budget" className="block text-xs font-semibold uppercase tracking-[0.1em] text-[#1c1c18] mb-2.5">
                    Total Estimated Budget (₹ INR)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#1c1c18] font-bold">
                      <IndianRupee className="w-4 h-4 text-[#00696d]" />
                    </div>
                    <input
                      id="budget"
                      type="number"
                      min="0"
                      step="5000"
                      value={totalBudget}
                      onChange={(e) => setTotalBudget(e.target.value)}
                      placeholder="120000"
                      className="w-full pl-11 pr-5 py-3.5 bg-[#fcf9f3]/50 hover:bg-[#fcf9f3] focus:bg-white text-[#1c1c18] text-sm font-medium rounded-full border border-[#e6e3dc] focus:border-[#1c1c18] focus:ring-1 focus:ring-[#1c1c18] transition-all outline-none"
                    />
                  </div>
                </div>

                {/* Cover Photo URL & Presets */}
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <label htmlFor="coverImage" className="block text-xs font-semibold uppercase tracking-[0.1em] text-[#1c1c18]">
                      Cover Photo URL
                    </label>
                    <span className="text-[11px] text-[#76777d]">Unsplash or high-res URL</span>
                  </div>
                  <div className="relative mb-3">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#76777d]">
                      <ImageIcon className="w-4 h-4 text-[#76777d]" />
                    </div>
                    <input
                      id="coverImage"
                      type="url"
                      value={coverImage}
                      onChange={(e) => setCoverImage(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full pl-11 pr-5 py-3.5 bg-[#fcf9f3]/50 hover:bg-[#fcf9f3] focus:bg-white text-[#1c1c18] text-xs md:text-sm rounded-full border border-[#e6e3dc] focus:border-[#1c1c18] focus:ring-1 focus:ring-[#1c1c18] transition-all outline-none placeholder:text-[#76777d]/70 font-mono"
                    />
                  </div>

                  {/* Preset quick selection */}
                  <div>
                    <span className="text-[11px] font-medium text-[#76777d] mb-2 block">Quick Curated Presets:</span>
                    <div className="flex flex-wrap gap-2">
                      {PRESET_COVERS.map((preset) => (
                        <button
                          key={preset.name}
                          type="button"
                          onClick={() => setCoverImage(preset.url)}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                            coverImage === preset.url
                              ? "bg-[#00696d] text-white shadow-xs"
                              : "bg-[#f9f5ed] border border-[#e6e3dc] text-[#46464c] hover:border-[#1c1c18] hover:text-[#1c1c18]"
                          }`}
                        >
                          {preset.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Live Preview Card */}
                {coverImage && (
                  <div className="pt-2">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold uppercase tracking-[0.1em] text-[#1c1c18]">
                        Live Journal Cover Preview
                      </span>
                      <span className="text-[11px] text-[#00696d] font-medium flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" /> Dynamic
                      </span>
                    </div>

                    <div className="relative w-full h-[200px] rounded-2xl overflow-hidden shadow-md border border-[#e6e3dc] group">
                      <img
                        src={coverImage}
                        alt="Trip Cover Preview"
                        onError={(e) => {
                          e.target.src = PRESET_COVERS[0].url;
                        }}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none" />
                      
                      <div className="absolute bottom-4 left-5 right-5 text-white">
                        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                          <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[10px] uppercase font-semibold tracking-wider text-[#9af1f5] border border-white/20">
                            Upcoming Expedition
                          </span>
                          {destinations && (
                            <span className="px-2.5 py-0.5 rounded-full bg-black/40 backdrop-blur-md text-[10px] font-medium text-white/90">
                              {destinations.split(',').map(d => d.trim()).filter(Boolean).join(' • ')}
                            </span>
                          )}
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white drop-shadow-sm truncate">
                          {title || "Untitled Expedition"}
                        </h3>
                        <p className="text-xs text-white/80 font-light mt-0.5">
                          {startDate} &mdash; {endDate} &bull; ₹{Number(totalBudget || 0).toLocaleString('en-IN')}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Submit button */}
                <div className="pt-4 hairline-t">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={isSubmitting}
                    icon={ArrowRight}
                    iconPosition="right"
                    className="w-full justify-center shadow-md hover:shadow-xl py-4"
                  >
                    {isSubmitting ? "Generating Expedition..." : "Create Journey"}
                  </Button>
                </div>

              </form>
            </div>
          </div>

          {/* Side Info / Summary Panel */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Editorial Quick Guide Card */}
            <div className="bg-[#f9f5ed] rounded-[32px] p-7 md:p-8 border border-[#e6e3dc] space-y-5">
              <div className="w-10 h-10 rounded-full bg-[#1c1c18] text-[#9af1f5] flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#1c1c18] tracking-tight mb-2">
                  The GlobeTrotter Way
                </h3>
                <p className="text-xs md:text-sm text-[#46464c] leading-relaxed">
                  Every journey created becomes an editable multi-destination chapter book. You can attach day-by-day itineraries, track shared split expenses, and fork community insights.
                </p>
              </div>

              <div className="space-y-3 pt-2 hairline-t">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#e0fbfb] text-[#00696d] flex items-center justify-center text-xs font-bold mt-0.5 shrink-0">
                    1
                  </div>
                  <p className="text-xs text-[#46464c]">
                    <strong className="text-[#1c1c18]">Multi-stop structure:</strong> Separate cities into distinct chapters with dedicated notes and budgets.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#e0fbfb] text-[#00696d] flex items-center justify-center text-xs font-bold mt-0.5 shrink-0">
                    2
                  </div>
                  <p className="text-xs text-[#46464c]">
                    <strong className="text-[#1c1c18]">Curated experiences:</strong> Pick from suggested moments below to pre-fill your schedule.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#e0fbfb] text-[#00696d] flex items-center justify-center text-xs font-bold mt-0.5 shrink-0">
                    3
                  </div>
                  <p className="text-xs text-[#46464c]">
                    <strong className="text-[#1c1c18]">Real-time balance:</strong> Log expenses on the go and track actuals against your ₹{Number(totalBudget || 0).toLocaleString('en-IN')} target.
                  </p>
                </div>
              </div>
            </div>

            {/* Selected Experiences Counter Card */}
            {selectedActivities.length > 0 && (
              <div className="bg-white rounded-[28px] p-6 border border-[#00696d]/30 shadow-sm bg-gradient-to-br from-white to-[#e0fbfb]/30">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold uppercase tracking-[0.1em] text-[#00696d]">
                    Selected Experiences
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#00696d] text-white text-xs font-bold">
                    {selectedActivities.length}
                  </span>
                </div>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {selectedActivities.map((act) => (
                    <div key={act.id} className="flex items-center justify-between text-xs py-1.5 border-b border-[#e6e3dc]/60">
                      <span className="font-medium text-[#1c1c18] truncate max-w-[180px]">{act.title}</span>
                      <span className="text-[#00696d] font-semibold">{act.cost}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

        {/* 3. Suggested Places Grid */}
        <div className="mt-20 md:mt-24 pt-12 hairline-t">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#00696d]" />
                <Eyebrow color="text-[#00696d]">SUGGESTED EXPERIENCES</Eyebrow>
              </div>
              <h2 className="display-headline text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-[#1c1c18]">
                Curated moments to inspire your itinerary
              </h2>
              <p className="text-sm md:text-base text-[#46464c] mt-1 font-light">
                Handpicked culinary stops, historical walks, and scenic trails. Click &ldquo;+ Add&rdquo; to integrate them directly into your new trip plan.
              </p>
            </div>
            
            <div className="text-xs font-medium text-[#76777d] shrink-0">
              Showing {curatedActivities.length} editorial selections
            </div>
          </div>

          {/* Grid of curated activities: 3-col on desktop, 1 on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {curatedActivities.map((activity) => {
              const isSelected = selectedActivities.some(a => a.id === activity.id);

              return (
                <div
                  key={activity.id}
                  className={`bg-white rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col group hover:shadow-xl ${
                    isSelected ? "border-[#00696d] ring-2 ring-[#00696d]/20" : "border-[#e6e3dc]"
                  }`}
                >
                  {/* Photo with hover zoom */}
                  <div className="relative h-56 overflow-hidden bg-[#f3ede2]">
                    <img
                      src={activity.image}
                      alt={activity.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Top tags */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                      <span className="px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-white/90 backdrop-blur-md text-[#1c1c18] shadow-xs">
                        {activity.category}
                      </span>
                      {activity.rating && (
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-black/60 backdrop-blur-md text-[#fcf9f3] flex items-center gap-1">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          <span>{activity.rating}</span>
                        </span>
                      )}
                    </div>

                    {/* Bottom overlay in image */}
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <div className="flex items-center gap-2 text-xs text-[#9af1f5] font-medium mb-1">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{activity.city}, {activity.country}</span>
                      </div>
                      <h4 className="text-base font-bold text-white tracking-tight leading-snug line-clamp-1">
                        {activity.title}
                      </h4>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <p className="text-xs text-[#46464c] line-clamp-2 leading-relaxed font-light mb-3">
                        {activity.description}
                      </p>

                      <div className="flex items-center gap-3 text-xs text-[#76777d] pt-1">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-[#00696d]" />
                          <span>{activity.duration}</span>
                        </span>
                        <span>&bull;</span>
                        <span className="font-semibold text-[#1c1c18]">
                          {activity.cost}
                        </span>
                      </div>
                    </div>

                    {/* Card Action */}
                    <div className="pt-3 hairline-t flex items-center justify-between gap-2">
                      <div className="flex flex-wrap gap-1">
                        {activity.tags?.slice(0, 2).map(tag => (
                          <span key={tag} className="text-[10px] px-2 py-0.5 rounded-md bg-[#f6f2e9] text-[#76777d]">
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <Button
                        size="sm"
                        variant={isSelected ? "teal" : "ghost"}
                        icon={isSelected ? Check : Plus}
                        onClick={() => handleToggleActivity(activity)}
                        className={isSelected ? "shadow-xs" : "hover:bg-[#00696d]/10 hover:text-[#00696d]"}
                      >
                        {isSelected ? "Added" : "Add"}
                      </Button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </div>
  );
}
