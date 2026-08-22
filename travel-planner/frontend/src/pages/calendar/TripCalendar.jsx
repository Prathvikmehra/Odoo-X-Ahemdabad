import { useState } from 'react';
import { useTravel } from '../../context/TravelContext';
import { Eyebrow } from '../../components/common/Button';
import { ChevronLeft, ChevronRight, MapPin, Calendar } from 'lucide-react';

export default function TripCalendar() {
  const { trips } = useTravel();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('calendar');

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const today = new Date();
  const isToday = (day) => today.getFullYear() === year && today.getMonth() === month && today.getDate() === day;

  const statusColors = {
    ongoing: 'bg-[#9af1f5] text-[#00696d]',
    upcoming: 'bg-[#dbc3a8]/40 text-[#261908]',
    completed: 'bg-[#e6e3dc] text-[#46464c]'
  };

  const getTripsForDay = (day) => {
    const date = new Date(year, month, day);
    return trips.filter(t => {
      const start = new Date(t.startDate);
      const end = new Date(t.endDate);
      return date >= start && date <= end;
    });
  };

  // Build calendar grid cells
  const cells = [];
  for (let i = 0; i < firstDayOfWeek; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  // Trips this month
  const monthTrips = trips.filter(t => {
    const start = new Date(t.startDate);
    const end = new Date(t.endDate);
    const monthStart = new Date(year, month, 1);
    const monthEnd = new Date(year, month + 1, 0);
    return start <= monthEnd && end >= monthStart;
  });

  const totalTravelDays = monthTrips.reduce((acc, t) => {
    const start = new Date(Math.max(new Date(t.startDate), new Date(year, month, 1)));
    const end = new Date(Math.min(new Date(t.endDate), new Date(year, month + 1, 0)));
    return acc + Math.max(0, Math.ceil((end - start) / 86400000) + 1);
  }, 0);

  return (
    <div className="max-w-[1440px] mx-auto px-5 md:px-16 py-10">
      {/* Header */}
      <div className="mb-8">
        <Eyebrow color="text-[#00696d]" className="mb-2">Journey Calendar</Eyebrow>
        <h1 className="display-headline text-4xl md:text-5xl font-bold text-[#1c1c18]">Your Travel Timeline</h1>
      </div>

      {/* View Toggle + Month Nav */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2 bg-white border border-[#e6e3dc] rounded-full p-1">
          <button
            onClick={() => setViewMode('calendar')}
            className={`px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${viewMode === 'calendar' ? 'bg-[#1c1c18] text-white' : 'text-[#46464c] hover:bg-[#f6f2e9]'}`}
          >
            <Calendar className="w-3.5 h-3.5 inline mr-1.5" />Calendar
          </button>
          <button
            onClick={() => setViewMode('timeline')}
            className={`px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${viewMode === 'timeline' ? 'bg-[#1c1c18] text-white' : 'text-[#46464c] hover:bg-[#f6f2e9]'}`}
          >
            <MapPin className="w-3.5 h-3.5 inline mr-1.5" />Timeline
          </button>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={prevMonth} className="p-2 rounded-full border border-[#e6e3dc] hover:border-[#1c1c18] transition-colors cursor-pointer">
            <ChevronLeft className="w-4 h-4 text-[#1c1c18]" />
          </button>
          <span className="text-lg font-semibold text-[#1c1c18] min-w-[180px] text-center">{monthName}</span>
          <button onClick={nextMonth} className="p-2 rounded-full border border-[#e6e3dc] hover:border-[#1c1c18] transition-colors cursor-pointer">
            <ChevronRight className="w-4 h-4 text-[#1c1c18]" />
          </button>
        </div>
      </div>

      {/* Calendar View */}
      {viewMode === 'calendar' && (
        <div className="bg-white rounded-3xl border border-[#e6e3dc] p-4 md:p-6">
          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames.map(d => (
              <div key={d} className="text-center text-[10px] font-semibold tracking-[0.12em] uppercase text-[#76777d] py-2">{d}</div>
            ))}
          </div>

          {/* Day Cells */}
          <div className="grid grid-cols-7 gap-1">
            {cells.map((day, i) => {
              if (day === null) return <div key={`empty-${i}`} className="aspect-square" />;
              const dayTrips = getTripsForDay(day);
              return (
                <div
                  key={day}
                  className={`aspect-square p-1 rounded-xl border transition-colors relative ${
                    isToday(day) ? 'ring-2 ring-[#00696d] border-[#00696d]' : 'border-transparent hover:border-[#e6e3dc] hover:bg-[#fcf9f3]'
                  }`}
                >
                  <span className={`text-xs font-medium ${isToday(day) ? 'text-[#00696d]' : 'text-[#1c1c18]'}`}>{day}</span>
                  <div className="mt-0.5 space-y-0.5 overflow-hidden">
                    {dayTrips.slice(0, 2).map(t => (
                      <div
                        key={t.id}
                        className={`px-1 py-0.5 rounded text-[8px] font-medium truncate leading-tight ${statusColors[t.status]}`}
                        title={t.title}
                      >
                        {t.title.split(' ').slice(0, 2).join(' ')}
                      </div>
                    ))}
                    {dayTrips.length > 2 && (
                      <div className="text-[8px] text-[#76777d]">+{dayTrips.length - 2} more</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Timeline View */}
      {viewMode === 'timeline' && (
        <div className="space-y-4">
          {trips
            .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
            .map(trip => {
              const start = new Date(trip.startDate);
              const end = new Date(trip.endDate);
              const duration = Math.ceil((end - start) / 86400000) + 1;
              const maxDays = 30;
              const barWidth = Math.min(100, (duration / maxDays) * 100);

              return (
                <div key={trip.id} className="bg-white rounded-2xl border border-[#e6e3dc] p-5 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-[#1c1c18]">{trip.title}</h3>
                      <div className="flex items-center gap-3 text-xs text-[#76777d] mt-1">
                        <span>{trip.startDate} → {trip.endDate}</span>
                        <span>{duration} days</span>
                        <span>{trip.destinations?.length || 0} cities</span>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-semibold uppercase ${statusColors[trip.status]}`}>
                      {trip.status}
                    </span>
                  </div>
                  {/* Duration Bar */}
                  <div className="mt-3 w-full h-2.5 bg-[#f6f2e9] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        trip.status === 'ongoing' ? 'bg-[#00696d]' : trip.status === 'upcoming' ? 'bg-[#dbc3a8]' : 'bg-[#c6c6cc]'
                      }`}
                      style={{ width: `${barWidth}%` }}
                    />
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {trip.destinations?.map((d, i) => (
                      <span key={i} className="px-2 py-0.5 bg-[#f6f2e9] text-[#46464c] text-[10px] font-medium rounded-full">{d}</span>
                    ))}
                  </div>
                </div>
              );
            })}
        </div>
      )}

      {/* Month Summary */}
      <div className="grid grid-cols-3 gap-4 mt-8">
        <div className="bg-[#f6f2e9] rounded-2xl p-6 text-center">
          <span className="display-headline text-3xl font-bold text-[#1c1c18]">{monthTrips.length}</span>
          <Eyebrow className="mt-1">Trips This Month</Eyebrow>
        </div>
        <div className="bg-[#f6f2e9] rounded-2xl p-6 text-center">
          <span className="display-headline text-3xl font-bold text-[#1c1c18]">{totalTravelDays}</span>
          <Eyebrow className="mt-1">Days Traveling</Eyebrow>
        </div>
        <div className="bg-[#f6f2e9] rounded-2xl p-6 text-center">
          <span className="display-headline text-3xl font-bold text-[#1c1c18]">{new Set(monthTrips.flatMap(t => t.destinations || [])).size}</span>
          <Eyebrow className="mt-1">Destinations</Eyebrow>
        </div>
      </div>
    </div>
  );
}
