import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { tripService } from '../../services/tripService';
import { communityService } from '../../services/communityService';
import { useAuth } from '../../context/AuthContext';
import {
  Compass,
  Copy,
  Share2,
  CheckCircle,
  Calendar,
  MapPin,
  Clock,
  Sparkles,
  ArrowRight,
  Heart,
  Globe
} from 'lucide-react';
import Eyebrow from '../../components/common/Eyebrow';
import Modal from '../../components/common/Modal';

export default function SharedTrip() {
  const { token } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [copiedTripMsg, setCopiedTripMsg] = useState(false);

  useEffect(() => {
    loadPublicTrip();
  }, [token]);

  const loadPublicTrip = async () => {
    try {
      setLoading(true);
      // Try backend endpoint first
      try {
        const data = await tripService.getPublicTrip(token);
        if (data) {
          setTrip(data);
          return;
        }
      } catch (err) {
        console.warn('Backend public trip not found by token, trying curated database...', err);
      }

      // Fallback to curated community journey
      const curated = await communityService.getTripByToken(token);
      if (curated) {
        setTrip({
          name: curated.title,
          description: curated.description,
          cover_image: curated.coverImage,
          start_date: '2026-04-02',
          end_date: '2026-04-14',
          stops: curated.chapters?.map((chap, idx) => ({
            id: idx + 1,
            city_name: chap.city,
            country: 'Japan',
            headline: chap.headline,
            description: chap.description,
            image_url: chap.image,
            highlights: chap.highlights,
            activities: chap.highlights?.map((h, hIdx) => ({
              id: hIdx + 1,
              name: h,
              type: 'Experience',
              duration_hours: 2,
              start_time: '09:00 AM',
              cost: 1500,
            })),
          })),
        });
      }
    } catch (err) {
      console.error('Error fetching public trip:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleCopyThisTrip = async () => {
    if (!user) {
      navigate('/signup');
      return;
    }
    try {
      await tripService.createTrip({
        name: `Copy of ${trip.name}`,
        description: trip.description || 'Imported from GlobeTrotter shared story.',
        cover_image: trip.cover_image,
        start_date: trip.start_date || null,
        end_date: trip.end_date || null,
      });
      setCopiedTripMsg(true);
      setTimeout(() => {
        setCopiedTripMsg(false);
        navigate('/trips');
      }, 1500);
    } catch (err) {
      console.error('Failed to clone trip:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fcf9f3] flex flex-col justify-center items-center py-20">
        <div className="w-8 h-8 border-2 border-ink border-t-transparent rounded-full animate-spin mb-3" />
        <p className="text-xs font-mono uppercase tracking-wider text-ink-muted">Opening shared travel journal...</p>
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="min-h-screen bg-[#fcf9f3] flex flex-col justify-center items-center px-4">
        <div className="bg-white rounded-4xl p-10 text-center border border-black/5 shadow-soft max-w-md">
          <Compass className="w-12 h-12 text-teal mx-auto mb-3" />
          <h3 className="font-display text-2xl font-bold text-ink">Journey Not Found</h3>
          <p className="text-xs text-ink-secondary mt-1 mb-6">
            This public itinerary link may have been made private or deleted.
          </p>
          <Link
            to="/community"
            className="px-6 py-3 rounded-full bg-ink text-white text-xs font-bold"
          >
            Explore Public Journeys
          </Link>
        </div>
      </div>
    );
  }

  const stops = trip.stops || [];
  const totalDays = trip.start_date && trip.end_date
    ? Math.max(1, Math.round((new Date(trip.end_date) - new Date(trip.start_date)) / (1000 * 60 * 60 * 24)))
    : stops.length * 3;

  const totalCostEstimate = 67000 + (stops.length * 28000);

  return (
    <div className="min-h-screen bg-[#fcf9f3] text-ink antialiased">
      {/* 1. Full-Screen Photo Hero */}
      <section className="relative min-h-[85vh] flex flex-col justify-between p-6 sm:p-12 lg:p-20 text-white overflow-hidden">
        <img
          src={trip.cover_image || 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1800&auto=format&fit=crop&q=80'}
          alt={trip.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 photo-overlay" />

        {/* Top Floating Bar */}
        <div className="relative z-10 flex items-center justify-between max-w-[1440px] mx-auto w-full">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-full bg-white text-ink flex items-center justify-center font-serif font-bold text-sm">
              G
            </div>
            <span className="font-display font-bold text-lg text-white tracking-tight">
              GlobeTrotter
            </span>
          </Link>

          {/* Social share & Copy Trip */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyShareLink}
              className="px-4 py-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              {copied ? <CheckCircle className="w-3.5 h-3.5 text-[#9af1f5]" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? 'Link Copied' : 'Share'}</span>
            </button>
            <button
              onClick={handleCopyThisTrip}
              className="px-5 py-2 rounded-full bg-white text-ink hover:bg-white/90 text-xs font-bold tracking-wide shadow-md transition-all flex items-center gap-1.5"
            >
              <Copy className="w-3.5 h-3.5 text-teal" />
              <span>{copiedTripMsg ? 'Imported to Your Journal!' : 'Copy this Trip'}</span>
            </button>
          </div>
        </div>

        {/* Hero Headline & Eyebrow */}
        <div className="relative z-10 max-w-4xl mx-auto w-full text-center space-y-4 my-auto py-12">
          <Eyebrow color="text-[#9af1f5]">
            CURATED TRAVEL JOURNAL • PUBLIC STORY
          </Eyebrow>
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight-display text-white drop-shadow-md leading-[1.08]">
            {trip.name}
          </h1>
          <p className="text-base sm:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed font-light">
            {trip.description || 'A complete multi-city itinerary exploring culture, landscapes, culinary traditions, and hidden trails.'}
          </p>
        </div>

        {/* Hero Bottom Strip */}
        <div className="relative z-10 max-w-[1440px] mx-auto w-full flex items-center justify-between border-t border-white/20 pt-4 text-xs font-mono tracking-wider text-white/80">
          <span>{stops.length} CITIES</span>
          <span>{totalDays} DAYS EXPEDITION</span>
          <span>READ TIME ~ 6 MIN</span>
        </div>
      </section>

      {/* 2. Chapter-by-Chapter Breakdown (Alternating Image-Left / Image-Right Layout) */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-16 py-16 sm:py-24 space-y-24">
        {stops.map((stop, idx) => {
          const isEven = idx % 2 === 0;
          const chapterNum = (idx + 1).toString().padStart(2, '0');
          const stopImage =
            stop.image_url ||
            (idx === 0
              ? 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=1000&auto=format&fit=crop&q=80'
              : idx === 1
              ? 'https://images.unsplash.com/photo-1528164344705-475426879c0d?w=1000&auto=format&fit=crop&q=80'
              : 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1000&auto=format&fit=crop&q=80');

          return (
            <div key={stop.id || idx} className="space-y-12">
              <div
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center ${
                  isEven ? '' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Photo Column */}
                <div className={`lg:col-span-6 ${isEven ? 'order-1' : 'order-1 lg:order-2'}`}>
                  <div className="group relative rounded-4xl sm:rounded-5xl overflow-hidden aspect-[4/3] shadow-soft hover:shadow-float transition-all">
                    <img
                      src={stopImage}
                      alt={stop.city_name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-ink text-xs font-mono font-bold uppercase">
                        {stop.city_name}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Text Content Column */}
                <div className={`lg:col-span-6 space-y-4 ${isEven ? 'order-2' : 'order-2 lg:order-1'}`}>
                  <Eyebrow color="text-teal">CHAPTER {chapterNum}</Eyebrow>
                  <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-ink leading-tight">
                    {stop.headline || `Wandering the Ancient Streets of ${stop.city_name}`}
                  </h2>
                  <p className="text-sm sm:text-base text-ink-secondary leading-relaxed font-light">
                    {stop.description || `Delve into the historic districts, tasting unmissable local delicacies, and witnessing dawn light over iconic landmarks in ${stop.city_name}.`}
                  </p>

                  {/* Bulleted Highlights */}
                  <div className="pt-2 space-y-2.5">
                    <span className="text-xs font-mono uppercase font-bold text-ink-muted block">
                      Chapter Highlights
                    </span>
                    <ul className="space-y-2">
                      {(stop.highlights || [
                        `Morning walking tour across ${stop.city_name} cultural heritage quarter`,
                        `Sampling authentic regional culinary specialties and local markets`,
                        `Sunset vantage point overlooking panoramic cityscapes`,
                      ]).map((item, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-3 text-xs sm:text-sm text-ink">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal shrink-0 mt-2" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Full-bleed Photo Transition Banner Between Chapters */}
              {idx < stops.length - 1 && (
                <div className="relative rounded-4xl overflow-hidden min-h-[200px] p-8 sm:p-12 flex items-center justify-between text-white my-16 shadow-soft">
                  <img
                    src="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=1400&auto=format&fit=crop&q=80"
                    alt="Scenic transition"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-ink/75" />
                  <div className="relative z-10 max-w-lg">
                    <Eyebrow color="text-[#9af1f5] mb-1">TRANSITION</Eyebrow>
                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
                      From {stop.city_name} to {stops[idx + 1].city_name}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/80 mt-1 font-light">
                      High-speed rail journey through shifting mountains and coastal valleys.
                    </p>
                  </div>
                  <ArrowRight className="relative z-10 w-8 h-8 text-[#9af1f5] hidden sm:block" />
                </div>
              )}
            </div>
          );
        })}
      </section>

      {/* 3. "Journey in Numbers" Stat Section (Days / Cities / Total Cost) */}
      <section className="bg-white border-y border-black/5 py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 text-center space-y-10">
          <div>
            <Eyebrow color="text-teal">THE EXPEDITION METRICS</Eyebrow>
            <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-ink mt-1">
              Journey in Numbers
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            <div className="p-8 rounded-4xl bg-[#fcf9f3] border border-black/5">
              <Eyebrow color="text-ink-muted">TOTAL DURATION</Eyebrow>
              <div className="font-display text-5xl sm:text-6xl font-bold text-ink tracking-tight-display mt-2">
                {totalDays}
              </div>
              <p className="text-xs text-ink-secondary mt-1">Days of unscripted exploration</p>
            </div>

            <div className="p-8 rounded-4xl bg-[#fcf9f3] border border-black/5">
              <Eyebrow color="text-teal">CITIES VISITED</Eyebrow>
              <div className="font-display text-5xl sm:text-6xl font-bold text-teal tracking-tight-display mt-2">
                {stops.length}
              </div>
              <p className="text-xs text-ink-secondary mt-1">Unique regional hubs</p>
            </div>

            <div className="p-8 rounded-4xl bg-ink text-white shadow-float">
              <Eyebrow color="text-[#9af1f5]">APPROXIMATE BUDGET</Eyebrow>
              <div className="font-display text-4xl sm:text-5xl font-bold text-white tracking-tight-display mt-2">
                ₹{totalCostEstimate.toLocaleString('en-IN')}
              </div>
              <p className="text-xs text-white/70 mt-1">Inclusive of stay, rail, & dining</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Closing "Plan your own journey" CTA Section */}
      <section className="max-w-4xl mx-auto px-5 sm:px-8 py-20 text-center space-y-6">
        <div className="w-14 h-14 rounded-full bg-ink text-white flex items-center justify-center mx-auto text-xl font-serif font-bold shadow-md">
          G
        </div>
        <h2 className="font-display text-3xl sm:text-5xl font-bold text-ink tracking-tight">
          Ready to author your own story?
        </h2>
        <p className="text-sm sm:text-base text-ink-secondary max-w-md mx-auto leading-relaxed">
          Create day-by-day itineraries, track your budget in real time, and share your personal travel journal with the world.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={handleCopyThisTrip}
            className="px-8 py-4 rounded-full bg-ink hover:bg-black text-white text-sm font-bold tracking-wide shadow-sm hover:shadow-md transition-all flex items-center gap-2"
          >
            <Copy className="w-4 h-4 text-[#9af1f5]" />
            <span>Copy This Itinerary</span>
          </button>
          <Link
            to="/signup"
            className="px-8 py-4 rounded-full border border-black/10 hover:bg-black/5 text-ink text-sm font-semibold transition-all"
          >
            Create Free Account
          </Link>
        </div>
      </section>
    </div>
  );
}
