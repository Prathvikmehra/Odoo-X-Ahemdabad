import { useState } from 'react';
import { useTravel } from '../../context/TravelContext';
import { Button, Eyebrow } from '../../components/common/Button';
import { MapPin, Mail, Phone, Globe, Compass, Award, ShieldAlert, Heart, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Account() {
  const { user, setUser, trips, showToast } = useTravel();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('info');

  // Form states
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [city, setCity] = useState(user?.city || '');
  const [country, setCountry] = useState(user?.country || '');
  const [bio, setBio] = useState(user?.bio || '');

  // Preference states
  const [currency, setCurrency] = useState(user?.preferences?.currency || 'INR (₹)');
  const [language, setLanguage] = useState(user?.preferences?.language || 'English (UK)');
  const [travelPace, setTravelPace] = useState(user?.preferences?.travelPace || 'Slow & Immersive');
  const [dietary, setDietary] = useState(user?.preferences?.dietary || '');

  const handleSaveInfo = (e) => {
    e.preventDefault();
    setUser(prev => ({
      ...prev,
      name,
      email,
      phone,
      city,
      country,
      bio
    }));
    showToast("Profile information saved.");
  };

  const handleSavePrefs = (e) => {
    e.preventDefault();
    setUser(prev => ({
      ...prev,
      preferences: {
        currency,
        language,
        travelPace,
        dietary
      }
    }));
    showToast("Travel preferences updated.");
  };

  const handleDeactivate = (e) => {
    e.preventDefault();
    const conf = window.confirm("Are you sure you want to deactivate your GlobeTrotter account? This action is permanent.");
    if (conf) {
      showToast("Account deactivated.");
      navigate('/login');
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto px-5 md:px-16 py-10 space-y-10">
      
      {/* Profile Hero Header */}
      <div className="bg-[#f6f2e9] rounded-[36px] p-8 md:p-12 border border-[#e6e3dc] flex flex-col md:flex-row gap-8 items-center justify-between">
        <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
          <div className="relative group">
            <img 
              src={user?.avatar} 
              alt={user?.name} 
              className="w-28 h-28 rounded-full object-cover ring-4 ring-white shadow-lg transition-transform duration-500 group-hover:scale-105" 
            />
            <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
              Change
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h2 className="text-3xl font-bold text-[#1c1c18] tracking-tight">{user?.name}</h2>
              <span className="px-3 py-0.5 bg-[#9af1f5]/30 text-[#00696d] text-[10px] font-bold rounded-full uppercase tracking-wider">
                {user?.role}
              </span>
            </div>
            <p className="text-sm text-[#46464c] max-w-md">{user?.bio}</p>
            <p className="text-xs text-[#76777d] flex items-center justify-center sm:justify-start gap-1">
              <MapPin className="w-3.5 h-3.5" /> {user?.city}, {user?.country} · Member since {user?.joinedDate}
            </p>
          </div>
        </div>

        {/* Travel Badges Row */}
        <div className="flex flex-wrap gap-2 justify-center">
          <span className="px-3 py-1 bg-white border border-[#e6e3dc] text-[10px] font-semibold text-[#1c1c18] rounded-full uppercase tracking-wider flex items-center gap-1">
            <Award className="w-3 h-3 text-[#dbc3a8]" /> Globe Wanderer
          </span>
          <span className="px-3 py-1 bg-white border border-[#e6e3dc] text-[10px] font-semibold text-[#1c1c18] rounded-full uppercase tracking-wider flex items-center gap-1">
            <Heart className="w-3 h-3 text-red-400" /> Culture Seeker
          </span>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border border-[#e6e3dc] p-5 rounded-2xl text-center">
          <p className="text-3xl font-bold text-[#1c1c18]">{user?.stats?.tripsCount}</p>
          <Eyebrow className="mt-1">Journeys</Eyebrow>
        </div>
        <div className="bg-white border border-[#e6e3dc] p-5 rounded-2xl text-center">
          <p className="text-3xl font-bold text-[#1c1c18]">{user?.stats?.countriesVisited}</p>
          <Eyebrow className="mt-1">Countries</Eyebrow>
        </div>
        <div className="bg-white border border-[#e6e3dc] p-5 rounded-2xl text-center">
          <p className="text-3xl font-bold text-[#1c1c18]">{user?.stats?.citiesExplored}</p>
          <Eyebrow className="mt-1">Cities</Eyebrow>
        </div>
        <div className="bg-white border border-[#e6e3dc] p-5 rounded-2xl text-center">
          <p className="text-3xl font-bold text-[#1c1c18]">{user?.stats?.communityForks}</p>
          <Eyebrow className="mt-1">Story Forks</Eyebrow>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 border-b border-[#e6e3dc] pb-2 overflow-x-auto scrollbar-none">
        <button 
          onClick={() => setActiveTab('info')}
          className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider border-b-2 cursor-pointer transition-colors ${activeTab === 'info' ? 'border-[#1c1c18] text-[#1c1c18]' : 'border-transparent text-[#76777d] hover:text-[#1c1c18]'}`}
        >
          Personal Info
        </button>
        <button 
          onClick={() => setActiveTab('trips')}
          className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider border-b-2 cursor-pointer transition-colors ${activeTab === 'trips' ? 'border-[#1c1c18] text-[#1c1c18]' : 'border-transparent text-[#76777d] hover:text-[#1c1c18]'}`}
        >
          My Journeys
        </button>
        <button 
          onClick={() => setActiveTab('prefs')}
          className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider border-b-2 cursor-pointer transition-colors ${activeTab === 'prefs' ? 'border-[#1c1c18] text-[#1c1c18]' : 'border-transparent text-[#76777d] hover:text-[#1c1c18]'}`}
        >
          Preferences
        </button>
      </div>

      {/* Personal Info Tab */}
      {activeTab === 'info' && (
        <form onSubmit={handleSaveInfo} className="bg-white border border-[#e6e3dc] rounded-3xl p-6 md:p-8 space-y-6">
          <Eyebrow color="text-[#00696d]">Traveler Details</Eyebrow>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-[#76777d] uppercase tracking-wider block mb-1">Full Name</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 bg-[#fcf9f3] border border-[#e6e3dc] rounded-full text-xs text-[#1c1c18] focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-[#76777d] uppercase tracking-wider block mb-1">Email Address</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-[#fcf9f3] border border-[#e6e3dc] rounded-full text-xs text-[#1c1c18] focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-[#76777d] uppercase tracking-wider block mb-1">Phone Number</label>
              <input 
                type="text" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2 bg-[#fcf9f3] border border-[#e6e3dc] rounded-full text-xs text-[#1c1c18] focus:outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] font-bold text-[#76777d] uppercase tracking-wider block mb-1">City</label>
                <input 
                  type="text" 
                  value={city} 
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-4 py-2 bg-[#fcf9f3] border border-[#e6e3dc] rounded-full text-xs text-[#1c1c18] focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-[#76777d] uppercase tracking-wider block mb-1">Country</label>
                <input 
                  type="text" 
                  value={country} 
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full px-4 py-2 bg-[#fcf9f3] border border-[#e6e3dc] rounded-full text-xs text-[#1c1c18] focus:outline-none"
                />
              </div>
            </div>
          </div>
          <div>
            <label className="text-[10px] font-bold text-[#76777d] uppercase tracking-wider block mb-1">Traveler Bio</label>
            <textarea 
              value={bio} 
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              className="w-full px-4 py-2.5 bg-[#fcf9f3] border border-[#e6e3dc] rounded-xl text-xs text-[#1c1c18] focus:outline-none resize-none"
            />
          </div>
          <Button type="submit" variant="primary">Save Changes</Button>
        </form>
      )}

      {/* My Journeys Tab */}
      {activeTab === 'trips' && (
        <div className="space-y-6">
          <Eyebrow color="text-[#00696d]">Active & Saved Trips</Eyebrow>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {trips.slice(0, 4).map(trip => (
              <div key={trip.id} className="bg-white border border-[#e6e3dc] rounded-2xl p-4 flex gap-4 hover:shadow-md transition-shadow">
                <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-[#f6f2e9]">
                  <img src={trip.coverImage} alt={trip.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-[#1c1c18] line-clamp-1">{trip.title}</h3>
                    <p className="text-[10px] text-[#76777d] flex items-center gap-1 mt-1">
                      <Calendar className="w-3 h-3" /> {trip.startDate}
                    </p>
                  </div>
                  <button 
                    onClick={() => navigate(`/trips/${trip.id}`)}
                    className="text-xs font-semibold text-[#00696d] hover:underline flex items-center gap-0.5 cursor-pointer self-start"
                  >
                    Open Passport
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Preferences Tab */}
      {activeTab === 'prefs' && (
        <form onSubmit={handleSavePrefs} className="bg-white border border-[#e6e3dc] rounded-3xl p-6 md:p-8 space-y-6">
          <Eyebrow color="text-[#00696d]">Travel Styles & Formats</Eyebrow>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-[#76777d] uppercase tracking-wider block mb-1">Preferred Currency</label>
              <select 
                value={currency} 
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full px-4 py-2 bg-[#fcf9f3] border border-[#e6e3dc] rounded-full text-xs text-[#1c1c18] focus:outline-none"
              >
                <option value="INR (₹)">INR (₹)</option>
                <option value="USD ($)">USD ($)</option>
                <option value="EUR (€)">EUR (€)</option>
                <option value="JPY (¥)">JPY (¥)</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-[#76777d] uppercase tracking-wider block mb-1">Language</label>
              <select 
                value={language} 
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-4 py-2 bg-[#fcf9f3] border border-[#e6e3dc] rounded-full text-xs text-[#1c1c18] focus:outline-none"
              >
                <option value="English (UK)">English (UK)</option>
                <option value="English (US)">English (US)</option>
                <option value="Japanese">Japanese</option>
                <option value="Spanish">Spanish</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-[#76777d] uppercase tracking-wider block mb-1">Travel Pace</label>
              <select 
                value={travelPace} 
                onChange={(e) => setTravelPace(e.target.value)}
                className="w-full px-4 py-2 bg-[#fcf9f3] border border-[#e6e3dc] rounded-full text-xs text-[#1c1c18] focus:outline-none"
              >
                <option value="Slow & Immersive">Slow & Immersive</option>
                <option value="Moderate Explorer">Moderate Explorer</option>
                <option value="Fast & Compact">Fast & Compact</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-[#76777d] uppercase tracking-wider block mb-1">Dietary Preferences</label>
              <input 
                type="text" 
                value={dietary} 
                onChange={(e) => setDietary(e.target.value)}
                placeholder="e.g. Vegetarian, Gluten Free, Matcha Lover"
                className="w-full px-4 py-2 bg-[#fcf9f3] border border-[#e6e3dc] rounded-full text-xs text-[#1c1c18] focus:outline-none"
              />
            </div>
          </div>
          <Button type="submit" variant="primary">Update Preferences</Button>
        </form>
      )}

      {/* Danger Zone */}
      <div className="pt-6 border-t border-[#e6e3dc]">
        <div className="bg-red-50/50 border border-red-200/60 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-red-800 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-red-600" /> Account Termination
            </h4>
            <p className="text-xs text-[#76777d]">Permanently delete your travel journals, custom itineraries, and logged budgets.</p>
          </div>
          <button onClick={handleDeactivate} className="text-xs font-bold text-red-600 hover:underline cursor-pointer">
            Deactivate Account
          </button>
        </div>
      </div>

    </div>
  );
}
