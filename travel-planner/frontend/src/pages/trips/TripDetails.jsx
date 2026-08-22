import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTravel } from '../../context/TravelContext';
import { Button, Eyebrow, Chip } from '../../components/common/Button';
import { MapPin, Calendar, Wallet, Share2, Eye, Compass, Edit3, Grid, FileText, ArrowRight, Award, Trash2 } from 'lucide-react';

export default function TripDetails() {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const { getTripById, deleteTrip } = useTravel();
  const trip = getTripById(tripId);

  if (!trip) {
    return (
      <div className="max-w-[1440px] mx-auto px-5 md:px-16 py-20 text-center">
        <h2 className="text-2xl font-bold">Trip not found</h2>
        <Button variant="primary" className="mt-6" onClick={() => navigate('/trips')}>Back to Trips</Button>
      </div>
    );
  }

  // Calculate some numbers
  const totalDays = Math.max(1, Math.ceil((new Date(trip.endDate) - new Date(trip.startDate)) / 86400000) + 1);
  const spentPct = Math.min(100, Math.round((trip.spentBudget / (trip.totalBudget || 1)) * 100));

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this trip and all its itinerary contents?")) {
      deleteTrip(trip.id);
      navigate('/trips');
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto px-5 md:px-16 py-10 space-y-12">
      {/* Back link */}
      <button onClick={() => navigate('/trips')} className="text-xs font-semibold text-[#76777d] hover:text-[#1c1c18] transition-colors cursor-pointer flex items-center gap-1">
        ← Back to Trips
      </button>

      {/* Hero Overview Header */}
      <div className="relative w-full h-[380px] rounded-[36px] overflow-hidden border border-[#e6e3dc] shadow-xs">
        <img src={trip.coverImage} alt={trip.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="text-white space-y-2">
            <Eyebrow color="text-[#9af1f5]">Travel Passport</Eyebrow>
            <h1 className="display-headline text-3xl md:text-5xl font-bold">{trip.title}</h1>
            <p className="text-sm text-white/80 max-w-xl">{trip.subtitle}</p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-white/70 pt-2">
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {trip.startDate} to {trip.endDate} ({totalDays} days)</span>
              <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {trip.destinations?.join(' → ')}</span>
            </div>
          </div>

          {/* Quick Actions Row */}
          <div className="flex flex-wrap gap-2">
            <Link to={`/trips/${trip.id}/itinerary`}>
              <Button variant="teal" size="sm" icon={Eye}>Itinerary</Button>
            </Link>
            <Link to={`/trips/${trip.id}/itinerary-builder`}>
              <Button variant="secondary" className="bg-white/95 text-[#1c1c18] border-transparent hover:bg-white" size="sm" icon={Edit3}>Edit Stops</Button>
            </Link>
            <Link to={`/trips/${trip.id}/budget`}>
              <Button variant="secondary" className="bg-white/95 text-[#1c1c18] border-transparent hover:bg-white" size="sm" icon={Wallet}>Expenses</Button>
            </Link>
            <Link to={`/trips/${trip.id}/share`}>
              <Button variant="secondary" className="bg-white/95 text-[#1c1c18] border-transparent hover:bg-white" size="sm" icon={Share2}>Share</Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left Column (2 Cols): Journey Route, Passport Stamps */}
        <div className="lg:col-span-2 space-y-10">
          
          {/* Journey Route Map / Timeline */}
          <div className="bg-white border border-[#e6e3dc] rounded-3xl p-6 md:p-8 space-y-6">
            <Eyebrow color="text-[#00696d]">Journey Route</Eyebrow>
            
            <div className="relative pl-8 space-y-8">
              {/* Vertical Route Line */}
              <div className="absolute left-[9px] top-2 bottom-2 w-0.5 bg-dashed border-l border-[#00696d]/40" />

              {trip.sections?.map((stop, idx) => (
                <div key={stop.id} className="relative flex items-start gap-4">
                  <div className="absolute -left-10 top-0.5 w-5 h-5 rounded-full border-2 border-[#00696d] bg-white flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00696d]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-[#76777d] uppercase tracking-wider block">Stop {String(idx + 1).padStart(2, '0')}</span>
                    <h3 className="text-base font-bold text-[#1c1c18] mt-0.5">{stop.city}</h3>
                    <p className="text-xs text-[#46464c]">{stop.dates} · Allocated: ₹{stop.allocatedBudget?.toLocaleString('en-IN')}</p>
                    {stop.notes && <p className="text-xs text-[#76777d] italic mt-1 font-serif">"{stop.notes}"</p>}
                  </div>
                </div>
              ))}

              {(!trip.sections || trip.sections.length === 0) && (
                <p className="text-sm text-[#76777d] italic">Your journey is still a blank page. Start adding city stops.</p>
              )}
            </div>

            <Button variant="secondary" size="sm" icon={Plus} onClick={() => navigate(`/trips/${trip.id}/itinerary-builder`)}>
              Add Stop
            </Button>
          </div>

          {/* Passport Stamps Section */}
          <div className="bg-white border border-[#e6e3dc] rounded-3xl p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-[#e6e3dc] pb-4">
              <div>
                <Eyebrow color="text-[#00696d]">Traveler Credentials</Eyebrow>
                <h2 className="text-lg font-bold text-[#1c1c18] mt-1">Visa Stamps</h2>
              </div>
              <Compass className="w-6 h-6 text-[#c6c6cc]" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {trip.destinations?.map((dest, i) => (
                <div key={i} className="aspect-square rounded-full border-4 border-dashed border-[#dbc3a8] p-3 flex flex-col items-center justify-center text-center relative overflow-hidden bg-[#fbf9f4]/40 hover:scale-105 transition-transform">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 text-4xl font-extrabold uppercase font-serif">PASSPORT</div>
                  <span className="text-[10px] font-bold text-[#dbc3a8] uppercase tracking-[0.14em]">STAMP APPROVED</span>
                  <p className="text-sm font-extrabold text-[#261908] tracking-tight leading-tight uppercase font-serif my-1">{dest}</p>
                  <span className="text-[8px] text-[#76777d] uppercase">{trip.startDate.split('-')[0]}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Overview Card & Budget Health */}
        <div className="space-y-6">
          
          {/* Quick Stats overview */}
          <div className="bg-white border border-[#e6e3dc] rounded-3xl p-6 space-y-6">
            <h3 className="text-base font-bold text-[#1c1c18]">Journey in Numbers</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-[#fcf9f3]">
                <span className="text-xs text-[#76777d]">Total Duration</span>
                <span className="text-sm font-semibold text-[#1c1c18]">{totalDays} Days</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-[#fcf9f3]">
                <span className="text-xs text-[#76777d]">Stops Planned</span>
                <span className="text-sm font-semibold text-[#1c1c18]">{trip.sections?.length || 0} Cities</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-[#fcf9f3]">
                <span className="text-xs text-[#76777d]">Total Budget</span>
                <span className="text-sm font-semibold text-[#1c1c18]">₹{trip.totalBudget?.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-xs text-[#76777d]">Spent to Date</span>
                <span className="text-sm font-semibold text-[#00696d]">₹{trip.spentBudget?.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Spent progress bar */}
            <div>
              <div className="flex justify-between text-[10px] font-semibold text-[#76777d] mb-1.5">
                <span>BUDGET UTILIZED</span>
                <span>{spentPct}%</span>
              </div>
              <div className="w-full h-2 bg-[#e6e3dc] rounded-full overflow-hidden">
                <div className="h-full bg-[#00696d] rounded-full" style={{ width: `${spentPct}%` }} />
              </div>
            </div>

            <Button variant="secondary" className="w-full justify-center" onClick={() => navigate(`/trips/${trip.id}/budget`)}>
              Open Expense Ledger
            </Button>
          </div>

          {/* Danger zone actions */}
          <div className="bg-[#f9f5ed] border border-[#e6e3dc] rounded-3xl p-5 flex items-center justify-between">
            <span className="text-xs text-[#46464c] font-medium">Remove expedition</span>
            <button onClick={handleDelete} className="p-2 rounded-full hover:bg-red-50 text-red-600 transition-colors cursor-pointer" title="Delete Trip">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
