import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTravel } from '../../context/TravelContext';
import { Button, Eyebrow } from '../../components/common/Button';
import { Plus, Trash2, MapPin, Calendar, Wallet, ArrowRight, GripVertical, FileText } from 'lucide-react';

export default function ItineraryBuilder() {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const { getTripById, addSectionToTrip, updateSection, deleteSection } = useTravel();
  const trip = getTripById(tripId);

  const [newCity, setNewCity] = useState('');
  const [newBudget, setNewBudget] = useState(30000);

  if (!trip) {
    return (
      <div className="max-w-[1440px] mx-auto px-5 md:px-16 py-20 text-center">
        <h2 className="text-2xl font-bold text-on-background">Trip not found</h2>
        <p className="text-sm text-muted mt-2">This journey doesn't exist in your collection.</p>
        <Button variant="primary" className="mt-6" onClick={() => navigate('/trips')}>Back to Trips</Button>
      </div>
    );
  }

  const handleAddSection = () => {
    addSectionToTrip(tripId, {
      city: newCity || 'New Destination',
      allocatedBudget: newBudget,
      notes: ''
    });
    setNewCity('');
    setNewBudget(30000);
  };

  const totalAllocated = (trip.sections || []).reduce((sum, s) => sum + (s.allocatedBudget || 0), 0);

  return (
    <div className="max-w-[1440px] mx-auto px-5 md:px-16 py-10">
      {/* Header */}
      <div className="mb-10">
        <Eyebrow color="text-secondary" className="mb-2">Itinerary Builder</Eyebrow>
        <h1 className="display-headline text-3xl md:text-5xl font-bold text-on-background">{trip.title}</h1>
        <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-muted">
          <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{trip.startDate} → {trip.endDate}</span>
          <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{trip.destinations?.length || 0} destinations</span>
          <span className="flex items-center gap-1"><Wallet className="w-3.5 h-3.5" />₹{totalAllocated.toLocaleString('en-IN')} allocated of ₹{trip.totalBudget?.toLocaleString('en-IN')}</span>
        </div>
      </div>

      {/* Budget Overview Bar */}
      <div className="bg-surface-container-lowest rounded-3xl border border-surface-container-high p-6 mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-muted">Budget Allocation</span>
          <span className="text-xs text-muted">{Math.round((totalAllocated / (trip.totalBudget || 1)) * 100)}% allocated</span>
        </div>
        <div className="w-full h-3 bg-surface-container-high rounded-full overflow-hidden">
          <div
            className="h-full bg-secondary rounded-full transition-all duration-500"
            style={{ width: `${Math.min(100, (totalAllocated / (trip.totalBudget || 1)) * 100)}%` }}
          />
        </div>
      </div>

      {/* Section Cards */}
      <div className="space-y-5">
        {(trip.sections || []).map((section, idx) => (
          <div key={section.id} className="bg-surface-container-lowest rounded-3xl border border-surface-container-high p-6 relative group hover:shadow-md transition-shadow duration-300">
            <div className="flex items-start gap-5">
              {/* Grip + Number */}
              <div className="flex flex-col items-center gap-2 pt-1">
                <GripVertical className="w-4 h-4 text-muted cursor-grab" />
                <Eyebrow color="text-secondary">Section {String(idx + 1).padStart(2, '0')}</Eyebrow>
              </div>

              {/* Cover Image */}
              <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 hidden sm:block">
                <img src={section.coverImage} alt={section.city} className="w-full h-full object-cover" />
              </div>

              {/* Content */}
              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[10px] font-semibold tracking-wider uppercase text-muted block mb-1">City / Destination</label>
                    <input
                      type="text"
                      value={section.city}
                      onChange={(e) => updateSection(tripId, section.id, { city: e.target.value })}
                      className="w-full px-4 py-2 bg-background border border-surface-container-high rounded-full text-sm text-on-background focus:outline-none focus:border-[#1c1c18] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-semibold tracking-wider uppercase text-muted block mb-1">Dates</label>
                    <input
                      type="text"
                      value={section.dates}
                      onChange={(e) => updateSection(tripId, section.id, { dates: e.target.value })}
                      className="w-full px-4 py-2 bg-background border border-surface-container-high rounded-full text-sm text-on-background focus:outline-none focus:border-[#1c1c18] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-semibold tracking-wider uppercase text-muted block mb-1">Budget (₹)</label>
                    <input
                      type="number"
                      value={section.allocatedBudget}
                      onChange={(e) => updateSection(tripId, section.id, { allocatedBudget: Number(e.target.value) })}
                      className="w-full px-4 py-2 bg-background border border-surface-container-high rounded-full text-sm text-on-background focus:outline-none focus:border-[#1c1c18] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-semibold tracking-wider uppercase text-muted block mb-1">Notes</label>
                  <textarea
                    value={section.notes || ''}
                    onChange={(e) => updateSection(tripId, section.id, { notes: e.target.value })}
                    rows={2}
                    placeholder="Key highlights, stay details, travel notes..."
                    className="w-full px-4 py-2.5 bg-background border border-surface-container-high rounded-xl text-sm text-on-background placeholder-[#76777d] focus:outline-none focus:border-[#1c1c18] transition-colors resize-none"
                  />
                </div>

                {/* Section budget bar */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                    <div className="h-full bg-[#dbc3a8] rounded-full" style={{ width: `${Math.min(100, ((section.allocatedBudget || 0) / (trip.totalBudget || 1)) * 100)}%` }} />
                  </div>
                  <span className="text-[10px] text-muted">{Math.round(((section.allocatedBudget || 0) / (trip.totalBudget || 1)) * 100)}%</span>
                </div>

                {/* Days preview */}
                {section.days?.length > 0 && (
                  <div className="text-xs text-muted">
                    {section.days.length} day(s) planned · {section.days.reduce((acc, d) => acc + (d.activities?.length || 0), 0)} activities
                  </div>
                )}
              </div>

              {/* Delete */}
              <button
                onClick={() => deleteSection(tripId, section.id)}
                className="p-2 rounded-full hover:bg-red-50 text-muted hover:text-red-600 transition-colors cursor-pointer opacity-0 group-hover:opacity-100"
                title="Remove section"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Section Card */}
      <div className="mt-6 border-2 border-dashed border-surface-container-high rounded-3xl p-8 text-center hover:border-[#00696d] transition-colors">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <input
            type="text"
            value={newCity}
            onChange={(e) => setNewCity(e.target.value)}
            placeholder="City name (e.g. Barcelona)"
            className="px-4 py-2.5 bg-surface-container-lowest border border-surface-container-high rounded-full text-sm w-full sm:w-64 focus:outline-none focus:border-[#1c1c18]"
          />
          <Button variant="secondary" icon={Plus} onClick={handleAddSection}>
            Add another Section
          </Button>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
        <Button variant="primary" size="lg" icon={ArrowRight} iconPosition="right" onClick={() => navigate(`/trips/${tripId}/itinerary`)}>
          View Full Itinerary
        </Button>
        <Button variant="secondary" size="lg" icon={Wallet} onClick={() => navigate(`/trips/${tripId}/budget`)}>
          View Budget
        </Button>
      </div>
    </div>
  );
}
