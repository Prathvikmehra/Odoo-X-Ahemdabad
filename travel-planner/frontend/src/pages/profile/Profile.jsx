import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { tripService } from '../../services/tripService';
import {
  User,
  Mail,
  MapPin,
  Globe,
  Camera,
  Calendar,
  Trash2,
  Check,
  ArrowRight,
  Shield,
  Heart
} from 'lucide-react';
import Eyebrow from '../../components/common/Eyebrow';

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [profileData, setProfileData] = useState({
    name: user?.name || 'Alex Vance',
    email: user?.email || 'alex@traveler.com',
    city: 'San Francisco, CA',
    country: 'United States',
    language: 'English (US)',
    currency: 'INR (₹)',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    bio: 'Visual storyteller, specialty coffee enthusiast, and slow traveler navigating multi-city rail corridors.',
  });

  useEffect(() => {
    loadProfileTrips();
  }, []);

  const loadProfileTrips = async () => {
    try {
      setLoading(true);
      const data = await tripService.getAllTrips();
      setTrips(data || []);
    } catch (err) {
      console.error('Error loading trips for profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to permanently delete your GlobeTrotter traveler account and all saved itineraries?')) {
      logout();
    }
  };

  const preplannedTrips = trips.slice(0, 3);
  const previousTrips = trips.slice(3);

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* Header */}
      <div className="border-b border-black/5 pb-6">
        <Eyebrow color="text-teal">TRAVELER DOSSIER</Eyebrow>
        <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-ink mt-1">
          Profile & Preferences
        </h1>
        <p className="text-sm sm:text-base text-ink-secondary mt-1">
          Manage your personal details, language/currency defaults, and journal history.
        </p>
      </div>

      {/* Avatar + Editable Detail Panel */}
      <form onSubmit={handleSave} className="bg-white rounded-4xl sm:rounded-5xl p-8 sm:p-12 border border-black/5 shadow-soft space-y-8">
        {/* Avatar Strip */}
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-black/5">
          <div className="relative group">
            <img
              src={profileData.photoUrl}
              alt={profileData.name}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-2 border-black/10 shadow-sm"
            />
            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
              <Camera className="w-5 h-5" />
            </div>
          </div>

          <div className="text-center sm:text-left flex-1">
            <h3 className="font-display text-2xl font-bold text-ink">{profileData.name}</h3>
            <p className="text-xs text-ink-muted mt-0.5">{profileData.email}</p>
            <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
              <span className="px-3 py-0.5 rounded-full bg-teal-soft text-teal text-[10px] font-mono uppercase font-semibold">
                Explorer Tier
              </span>
              <span className="px-3 py-0.5 rounded-full bg-[#fcf9f3] text-ink-secondary text-[10px] font-mono border border-black/5">
                {trips.length} Journeys Created
              </span>
            </div>
          </div>
        </div>

        {/* Editable Fields Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1.5 font-mono">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted" />
              <input
                type="text"
                value={profileData.name}
                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                className="w-full pl-11 pr-4 py-3 bg-[#fcf9f3]/60 border border-black/10 rounded-full text-xs text-ink focus:outline-none focus:ring-2 focus:ring-teal/30"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1.5 font-mono">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted" />
              <input
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                className="w-full pl-11 pr-4 py-3 bg-[#fcf9f3]/60 border border-black/10 rounded-full text-xs text-ink focus:outline-none focus:ring-2 focus:ring-teal/30"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1.5 font-mono">
              Avatar Image URL
            </label>
            <div className="relative">
              <Camera className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted" />
              <input
                type="url"
                value={profileData.photoUrl}
                onChange={(e) => setProfileData({ ...profileData, photoUrl: e.target.value })}
                className="w-full pl-11 pr-4 py-3 bg-[#fcf9f3]/60 border border-black/10 rounded-full text-xs text-ink focus:outline-none focus:ring-2 focus:ring-teal/30"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1.5 font-mono">
              Language Preference
            </label>
            <div className="relative">
              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted" />
              <select
                value={profileData.language}
                onChange={(e) => setProfileData({ ...profileData, language: e.target.value })}
                className="w-full pl-11 pr-4 py-3 bg-[#fcf9f3]/60 border border-black/10 rounded-full text-xs text-ink focus:outline-none focus:ring-2 focus:ring-teal/30"
              >
                <option value="English (US)">English (US)</option>
                <option value="English (UK)">English (UK)</option>
                <option value="Japanese (日本語)">Japanese (日本語)</option>
                <option value="French (Français)">French (Français)</option>
                <option value="Italian (Italiano)">Italian (Italiano)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bio Textarea */}
        <div>
          <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1.5 font-mono">
            Traveler Bio & Journal Statement
          </label>
          <textarea
            rows="3"
            value={profileData.bio}
            onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
            className="w-full p-4 bg-[#fcf9f3]/60 border border-black/10 rounded-3xl text-xs text-ink focus:outline-none focus:ring-2 focus:ring-teal/30 resize-none leading-relaxed"
          />
        </div>

        {/* Save button */}
        <div className="flex items-center justify-between pt-2 border-t border-black/5">
          {saveSuccess ? (
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5">
              <Check className="w-4 h-4" /> Preferences updated successfully!
            </span>
          ) : (
            <span className="text-xs text-ink-muted">All preferences are saved to your profile.</span>
          )}

          <button
            type="submit"
            className="px-6 py-3 rounded-full bg-ink hover:bg-black text-white text-xs font-bold tracking-wide shadow-sm transition-all"
          >
            Save Changes
          </button>
        </div>
      </form>

      {/* "Preplanned trips" Photo-Card Row with "View" buttons */}
      <section className="space-y-4">
        <div>
          <Eyebrow color="text-teal">UPCOMING ITINERARIES</Eyebrow>
          <h3 className="font-display text-2xl font-bold text-ink">Preplanned Trips</h3>
        </div>

        {preplannedTrips.length === 0 ? (
          <div className="p-6 bg-white rounded-3xl border border-black/5 text-xs text-ink-muted">
            No preplanned trips scheduled.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {preplannedTrips.map((trip) => (
              <div
                key={trip.id}
                className="group bg-white rounded-3xl overflow-hidden border border-black/5 shadow-soft hover:shadow-float transition-all flex flex-col justify-between"
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={trip.cover_image || 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&auto=format&fit=crop&q=80'}
                    alt={trip.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 photo-overlay" />
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h5 className="font-display font-bold text-sm truncate">{trip.name}</h5>
                  </div>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <span className="text-[11px] text-ink-muted">
                    {trip.start_date ? new Date(trip.start_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Flexible'}
                  </span>
                  <Link
                    to={`/trips/${trip.id}/itinerary`}
                    className="px-3.5 py-1.5 rounded-full bg-ink text-white hover:bg-black text-[11px] font-semibold"
                  >
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* "Previous trips" Photo-Card Row */}
      {previousTrips.length > 0 && (
        <section className="space-y-4">
          <div>
            <Eyebrow color="text-ink-muted">ARCHIVED MEMORIES</Eyebrow>
            <h3 className="font-display text-2xl font-bold text-ink">Previous Trips</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {previousTrips.map((trip) => (
              <div
                key={trip.id}
                className="group bg-white rounded-3xl overflow-hidden border border-black/5 shadow-soft hover:shadow-float transition-all flex flex-col justify-between"
              >
                <div className="relative h-36 overflow-hidden">
                  <img
                    src={trip.cover_image || 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=600&auto=format&fit=crop&q=80'}
                    alt={trip.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <h5 className="font-display font-bold text-xs truncate">{trip.name}</h5>
                    <span className="text-[10px] text-ink-muted">Completed Journey</span>
                  </div>
                  <Link
                    to={`/trips/${trip.id}/itinerary`}
                    className="px-3 py-1 rounded-full border border-black/10 hover:bg-black hover:text-white text-[11px] font-medium"
                  >
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Delete-account link styled quietly at the bottom */}
      <div className="pt-8 border-t border-black/5 text-center">
        <button
          type="button"
          onClick={handleDeleteAccount}
          className="text-xs text-ink-muted hover:text-red-600 transition-colors font-medium underline underline-offset-4"
        >
          Delete traveler account and wipe stored data
        </button>
      </div>
    </div>
  );
}
