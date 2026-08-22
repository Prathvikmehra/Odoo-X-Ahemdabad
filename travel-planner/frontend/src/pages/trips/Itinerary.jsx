import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTravel } from '../../context/TravelContext';
import { Button, Eyebrow, Chip } from '../../components/common/Button';
import { MapPin, Calendar, Clock, Wallet, ArrowRight, ChevronRight } from 'lucide-react';

export default function Itinerary() {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const { getTripById } = useTravel();
  const trip = getTripById(tripId);
  const [activeDay, setActiveDay] = useState('all');

  if (!trip) {
    return (
      <div className="max-w-[1440px] mx-auto px-5 md:px-16 py-20 text-center">
        <h2 className="text-2xl font-bold text-on-background">Trip not found</h2>
        <Button variant="primary" className="mt-6" onClick={() => navigate('/trips')}>Back to Trips</Button>
      </div>
    );
  }

  const allDays = (trip.sections || []).flatMap(s => (s.days || []).map(d => ({ ...d, sectionCity: s.city })));

  return (
    <div className="max-w-[1440px] mx-auto px-0 md:px-16 py-0 md:py-10">
      {/* Hero Banner */}
      <div className="relative w-full h-[340px] md:h-[420px] md:rounded-[36px] overflow-hidden">
        <img src={trip.coverImage} alt={trip.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <Eyebrow color="text-secondary" className="mb-2">Journey Itinerary</Eyebrow>
          <h1 className="display-headline text-3xl md:text-5xl font-bold text-white">{trip.title}</h1>
          <p className="text-sm text-white/80 mt-2 max-w-xl">{trip.subtitle}</p>
          <div className="flex flex-wrap items-center gap-4 mt-4 text-xs text-white/70">
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{trip.startDate} → {trip.endDate}</span>
            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{trip.destinations?.join(' · ')}</span>
          </div>
        </div>
      </div>

      <div className="px-5 md:px-0">
        {/* Day Tabs */}
        {allDays.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto py-6 scrollbar-none">
            <Chip active={activeDay === 'all'} onClick={() => setActiveDay('all')}>All Days</Chip>
            {allDays.map(day => (
              <Chip key={day.dayNumber} active={activeDay === day.dayNumber} onClick={() => setActiveDay(day.dayNumber)}>
                Day {day.dayNumber}
              </Chip>
            ))}
          </div>
        )}

        {/* Sections */}
        {(trip.sections || []).map((section, sIdx) => {
          const sectionDays = (section.days || []).filter(d => activeDay === 'all' || d.dayNumber === activeDay);
          if (activeDay !== 'all' && sectionDays.length === 0) return null;

          return (
            <div key={section.id}>
              {/* Section Header */}
              <div className="mt-10 mb-6">
                <Eyebrow color="text-secondary" className="mb-1">Chapter {String(sIdx + 1).padStart(2, '0')}</Eyebrow>
                <h2 className="text-2xl md:text-3xl font-bold text-on-background tracking-tight">{section.city}</h2>
                <div className="flex items-center gap-3 mt-2 text-xs text-muted">
                  <span>{section.dates}</span>
                  <span>·</span>
                  <span>₹{(section.allocatedBudget || 0).toLocaleString('en-IN')} budget</span>
                </div>
              </div>

              {/* Day Groups & Timeline */}
              {sectionDays.map(day => (
                <div key={day.dayNumber} className="mb-10">
                  {/* Day header */}
                  <div className="flex items-center gap-3 mb-5">
                    <span className="px-4 py-1.5 bg-on-background text-white text-xs font-semibold rounded-full">Day {day.dayNumber}</span>
                    <span className="text-sm font-medium text-on-background">{day.title}</span>
                    <span className="text-xs text-muted">{day.date}</span>
                  </div>

                  {/* Activity Timeline */}
                  <div className="relative pl-8 md:pl-12 space-y-4">
                    {/* Vertical line */}
                    <div className="absolute left-3 md:left-5 top-2 bottom-2 w-[2px] bg-[#e6e3dc]" />

                    {(day.activities || []).map((activity, aIdx) => (
                      <div key={activity.id} className="relative">
                        {/* Time badge on line */}
                        <div className="absolute -left-5 md:-left-7 top-4 w-6 h-6 rounded-full bg-on-background flex items-center justify-center z-10">
                          <div className="w-2 h-2 rounded-full bg-[#9af1f5]" />
                        </div>

                        {/* Activity Card */}
                        <div className="bg-surface-container-lowest rounded-2xl border border-surface-container-high p-4 flex flex-col sm:flex-row gap-4 hover:shadow-md transition-shadow duration-300">
                          {activity.image && (
                            <div className="w-full sm:w-24 h-32 sm:h-24 rounded-xl overflow-hidden flex-shrink-0">
                              <img src={activity.image} alt={activity.title} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                            </div>
                          )}
                          <div className="flex-1">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="px-2.5 py-0.5 bg-surface-container-high text-muted text-[10px] font-semibold rounded-full">{activity.time}</span>
                                  <span className="px-2.5 py-0.5 bg-[#9af1f5]/20 text-secondary text-[10px] font-semibold rounded-full">{activity.category}</span>
                                </div>
                                <h4 className="text-sm font-semibold text-on-background">{activity.title}</h4>
                              </div>
                              <span className="text-sm font-bold text-secondary flex-shrink-0">
                                {activity.cost > 0 ? `₹${activity.cost.toLocaleString('en-IN')}` : 'Free'}
                              </span>
                            </div>
                            <p className="text-xs text-muted mt-1 line-clamp-2">{activity.description}</p>
                            <div className="flex items-center gap-3 mt-2 text-[10px] text-muted">
                              <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{activity.duration}</span>
                              <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{activity.location}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Chapter Transition Banner */}
              {sIdx < (trip.sections || []).length - 1 && activeDay === 'all' && (
                <div className="relative w-full h-[200px] md:h-[260px] rounded-[36px] overflow-hidden my-10">
                  <img
                    src={trip.sections[sIdx + 1].coverImage}
                    alt={trip.sections[sIdx + 1].city}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
                  <div className="absolute inset-0 flex flex-col items-start justify-center p-8 md:p-12">
                    <Eyebrow color="text-secondary" className="mb-2">Next Chapter</Eyebrow>
                    <h3 className="display-headline text-2xl md:text-4xl font-bold text-white">
                      You're leaving {section.city}
                    </h3>
                    <div className="flex items-center gap-2 mt-3">
                      <span className="text-white/80 text-sm">Next:</span>
                      <span className="text-white font-semibold text-lg flex items-center gap-1">
                        {trip.sections[sIdx + 1].city} <ChevronRight className="w-5 h-5" />
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Empty state */}
        {allDays.length === 0 && (
          <div className="bg-surface-container-high rounded-3xl p-12 text-center mt-10">
            <h3 className="text-xl font-bold text-on-background">No itinerary details yet</h3>
            <p className="text-sm text-muted mt-2 mb-6">Start building your day-by-day plan in the Itinerary Builder.</p>
            <Button variant="primary" icon={ArrowRight} iconPosition="right" onClick={() => navigate(`/trips/${tripId}/itinerary-builder`)}>
              Open Itinerary Builder
            </Button>
          </div>
        )}

        {/* Bottom Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12 mb-8">
          <Button variant="primary" size="lg" icon={Wallet} onClick={() => navigate(`/trips/${tripId}/budget`)}>
            View Budget Breakdown
          </Button>
          <Button variant="secondary" size="lg" onClick={() => navigate(`/trips/${tripId}/itinerary-builder`)}>
            Edit Itinerary
          </Button>
        </div>
      </div>
    </div>
  );
}
