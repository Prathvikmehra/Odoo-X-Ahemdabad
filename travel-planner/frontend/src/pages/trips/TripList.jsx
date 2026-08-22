import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTravel } from '../../context/TravelContext';
import { Button, Eyebrow, Chip } from '../../components/common/Button';
import { HeaderFilterBar } from '../../components/common/HeaderFilterBar';
import { Eye, Pencil, Trash2, MapPin, Calendar, Users, ArrowRight } from 'lucide-react';

export default function TripList() {
  const { trips, deleteTrip } = useTravel();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeSort, setActiveSort] = useState('date');

  const filtered = trips
    .filter(t => t.title.toLowerCase().includes(search.toLowerCase()))
    .filter(t => activeFilter === 'all' || t.status === activeFilter)
    .sort((a, b) => {
      if (activeSort === 'name') return a.title.localeCompare(b.title);
      if (activeSort === 'budget') return b.totalBudget - a.totalBudget;
      return new Date(b.startDate) - new Date(a.startDate);
    });

  const ongoing = filtered.filter(t => t.status === 'ongoing');
  const upcoming = filtered.filter(t => t.status === 'upcoming');
  const completed = filtered.filter(t => t.status === 'completed');

  const TripCard = ({ trip }) => (
    <div className="bg-white rounded-3xl border border-[#e6e3dc] overflow-hidden flex flex-col md:flex-row gap-0 group hover:shadow-lg transition-shadow duration-500">
      <div className="md:w-52 h-44 md:h-auto overflow-hidden flex-shrink-0">
        <img
          src={trip.coverImage}
          alt={trip.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="flex-1 p-5 md:p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-lg font-bold text-[#1c1c18] tracking-tight">{trip.title}</h3>
              <p className="text-xs text-[#46464c] mt-0.5 line-clamp-1">{trip.subtitle}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider flex-shrink-0 ${
              trip.status === 'ongoing' ? 'bg-[#9af1f5]/30 text-[#00696d]' :
              trip.status === 'upcoming' ? 'bg-[#dbc3a8]/30 text-[#261908]' :
              'bg-[#e6e3dc] text-[#46464c]'
            }`}>
              {trip.status}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-[#76777d]">
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{trip.startDate} → {trip.endDate}</span>
            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{trip.destinations?.length || 0} destinations</span>
            {trip.collaborators?.length > 0 && (
              <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{trip.collaborators.length} travelers</span>
            )}
          </div>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {trip.destinations?.slice(0, 4).map((d, i) => (
              <span key={i} className="px-2.5 py-0.5 bg-[#f6f2e9] text-[#46464c] text-[10px] font-medium rounded-full">{d}</span>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#e6e3dc]">
          <div className="text-xs text-[#76777d]">
            <span className="font-semibold text-[#1c1c18]">₹{trip.spentBudget?.toLocaleString('en-IN')}</span> / ₹{trip.totalBudget?.toLocaleString('en-IN')}
          </div>
          <div className="flex items-center gap-1">
            <button onClick={() => navigate(`/trips/${trip.id}`)} className="p-2 rounded-full hover:bg-[#f6f2e9] text-[#46464c] hover:text-[#1c1c18] transition-colors cursor-pointer" title="View">
              <Eye className="w-4 h-4" />
            </button>
            <button onClick={() => navigate(`/trips/${trip.id}/itinerary-builder`)} className="p-2 rounded-full hover:bg-[#f6f2e9] text-[#46464c] hover:text-[#1c1c18] transition-colors cursor-pointer" title="Edit">
              <Pencil className="w-4 h-4" />
            </button>
            <button onClick={() => deleteTrip(trip.id)} className="p-2 rounded-full hover:bg-red-50 text-[#46464c] hover:text-red-600 transition-colors cursor-pointer" title="Delete">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const Section = ({ title, items, emptyMessage }) => (
    <div className="mb-10">
      <div className="flex items-center gap-3 mb-4">
        <Eyebrow color="text-[#00696d]">{title}</Eyebrow>
        <span className="px-2 py-0.5 bg-[#9af1f5]/20 text-[#00696d] text-[10px] font-semibold rounded-full">{items.length}</span>
      </div>
      {items.length === 0 ? (
        <div className="bg-[#f6f2e9] rounded-2xl p-8 text-center text-sm text-[#76777d]">{emptyMessage}</div>
      ) : (
        <div className="space-y-4">
          {items.map(trip => <TripCard key={trip.id} trip={trip} />)}
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-[1440px] mx-auto px-5 md:px-16 py-10">
      <div className="mb-8">
        <Eyebrow className="mb-2">Your Collection</Eyebrow>
        <h1 className="display-headline text-4xl md:text-5xl font-bold text-[#1c1c18]">My Journeys</h1>
        <p className="text-sm text-[#46464c] mt-2 max-w-lg">Every trip planned, every destination explored — your complete travel library.</p>
      </div>

      <HeaderFilterBar
        searchValue={search}
        onSearchChange={setSearch}
        placeholder="Search your journeys..."
        filterOptions={[
          { value: 'ongoing', label: 'Ongoing' },
          { value: 'upcoming', label: 'Upcoming' },
          { value: 'completed', label: 'Completed' }
        ]}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        sortOptions={[
          { value: 'date', label: 'Date' },
          { value: 'name', label: 'Name' },
          { value: 'budget', label: 'Budget' }
        ]}
        activeSort={activeSort}
        onSortChange={setActiveSort}
      />

      <div className="mt-8">
        <Section title="Ongoing Journeys" items={ongoing} emptyMessage="No ongoing journeys right now." />
        <Section title="Upcoming Journeys" items={upcoming} emptyMessage="No upcoming trips planned yet." />
        <Section title="Completed Journeys" items={completed} emptyMessage="Your travel archive is empty." />
      </div>

      <div className="text-center mt-8">
        <Button variant="primary" size="lg" icon={ArrowRight} iconPosition="right" onClick={() => navigate('/trips/new')}>
          Plan a New Journey
        </Button>
      </div>
    </div>
  );
}
