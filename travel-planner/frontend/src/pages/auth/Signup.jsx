import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Compass, ArrowRight, User, Mail, Phone, MapPin, Globe, Sparkles, Camera } from 'lucide-react';
import { useTravel } from '../../context/TravelContext';
import { Button, Eyebrow } from '../../components/common/Button';

export default function Signup() {
  const navigate = useNavigate();
  const { setUser, showToast } = useTravel();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    country: '',
    preferences: ''
  });

  const [avatarUrl] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      const fullName = `${formData.firstName} ${formData.lastName}`.trim() || 'Fellow Traveler';
      
      setUser(prev => ({
        ...prev,
        id: `user_${Date.now()}`,
        name: fullName,
        email: formData.email || 'traveler@globetrotter.io',
        phone: formData.phone || '+1 555-0199',
        city: formData.city || 'Kyoto',
        country: formData.country || 'Japan',
        bio: formData.preferences || 'Adventurous soul documenting journeys and discovering culture across continents.',
        avatar: avatarUrl,
        joinedDate: 'August 2026'
      }));

      showToast(`Welcome to GlobeTrotter, ${formData.firstName || 'Explorer'}! Your journal is ready.`);
      navigate('/dashboard');
    }, 450);
  };

  return (
    <div className="min-h-screen bg-[#fcf9f3] flex flex-col justify-between relative overflow-hidden py-10 px-5 md:px-8">
      
      {/* Subtle Background Ambience */}
      <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-[#9af1f5]/15 rounded-full blur-3xl pointer-events-none -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-[550px] h-[550px] bg-[#dbc3a8]/20 rounded-full blur-3xl pointer-events-none -ml-48 -mb-48" />

      {/* Brand Header */}
      <div className="max-w-[1440px] mx-auto w-full flex items-center justify-between z-10">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-full bg-[#1c1c18] flex items-center justify-center text-[#fcf9f3] group-hover:scale-105 transition-transform duration-300">
            <Compass className="w-5 h-5 text-[#9af1f5]" />
          </div>
          <span className="text-xl font-bold tracking-tight text-[#1c1c18]">
            GlobeTrotter
          </span>
        </Link>
        <Link to="/login" className="text-xs font-medium text-[#46464c] hover:text-[#1c1c18] transition-colors">
          Already have an account? <span className="underline font-semibold">Sign in</span>
        </Link>
      </div>

      {/* Centered Registration Card */}
      <div className="max-w-2xl w-full mx-auto my-8 z-10">
        <div className="bg-white/95 backdrop-blur-md border border-[#e6e3dc] rounded-[36px] p-7 md:p-10 shadow-xl relative">
          
          {/* Circular Avatar Placeholder */}
          <div className="flex flex-col items-center text-center mb-7">
            <div className="relative mb-3 group cursor-pointer">
              <img
                src={avatarUrl}
                alt="Traveler avatar placeholder"
                className="w-20 h-20 rounded-full object-cover ring-4 ring-[#f6f2e9] shadow-sm group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-[#00696d] border-2 border-white flex items-center justify-center shadow-sm">
                <Camera className="w-3 h-3 text-[#9af1f5]" />
              </span>
            </div>

            <Eyebrow color="text-[#00696d]">CREATE YOUR JOURNAL</Eyebrow>
            <h1 className="text-2xl md:text-3xl font-bold text-[#1c1c18] tracking-tight mt-1">
              Join GlobeTrotter
            </h1>
            <p className="text-xs text-[#76777d] mt-1.5 max-w-sm leading-relaxed">
              Begin documenting your journeys, budgeting multi-city expeditions, and sharing curated travel stories.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSignup} className="space-y-4">
            {/* 2-Column Grid: First Name & Last Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-semibold tracking-wider uppercase text-[#46464c] block mb-1.5 pl-1">
                  First Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#76777d] absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Alex"
                    className="w-full pl-11 pr-4 py-3 bg-[#fcf9f3] border border-[#e6e3dc] rounded-full text-sm text-[#1c1c18] placeholder-[#76777d] focus:outline-none focus:border-[#1c1c18] focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold tracking-wider uppercase text-[#46464c] block mb-1.5 pl-1">
                  Last Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#76777d] absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Mercer"
                    className="w-full pl-11 pr-4 py-3 bg-[#fcf9f3] border border-[#e6e3dc] rounded-full text-sm text-[#1c1c18] placeholder-[#76777d] focus:outline-none focus:border-[#1c1c18] focus:bg-white transition-all"
                  />
                </div>
              </div>
            </div>

            {/* 2-Column Grid: Email & Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-semibold tracking-wider uppercase text-[#46464c] block mb-1.5 pl-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#76777d] absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="alex.mercer@globetrotter.io"
                    className="w-full pl-11 pr-4 py-3 bg-[#fcf9f3] border border-[#e6e3dc] rounded-full text-sm text-[#1c1c18] placeholder-[#76777d] focus:outline-none focus:border-[#1c1c18] focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold tracking-wider uppercase text-[#46464c] block mb-1.5 pl-1">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-[#76777d] absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+44 7911 123456"
                    className="w-full pl-11 pr-4 py-3 bg-[#fcf9f3] border border-[#e6e3dc] rounded-full text-sm text-[#1c1c18] placeholder-[#76777d] focus:outline-none focus:border-[#1c1c18] focus:bg-white transition-all"
                  />
                </div>
              </div>
            </div>

            {/* 2-Column Grid: City & Country */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-semibold tracking-wider uppercase text-[#46464c] block mb-1.5 pl-1">
                  Home City
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-[#76777d] absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="London / Kyoto"
                    className="w-full pl-11 pr-4 py-3 bg-[#fcf9f3] border border-[#e6e3dc] rounded-full text-sm text-[#1c1c18] placeholder-[#76777d] focus:outline-none focus:border-[#1c1c18] focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold tracking-wider uppercase text-[#46464c] block mb-1.5 pl-1">
                  Country
                </label>
                <div className="relative">
                  <Globe className="w-4 h-4 text-[#76777d] absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="United Kingdom"
                    className="w-full pl-11 pr-4 py-3 bg-[#fcf9f3] border border-[#e6e3dc] rounded-full text-sm text-[#1c1c18] placeholder-[#76777d] focus:outline-none focus:border-[#1c1c18] focus:bg-white transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Travel Preferences & Additional Info Textarea */}
            <div>
              <label className="text-[11px] font-semibold tracking-wider uppercase text-[#46464c] block mb-1.5 pl-1">
                Travel Preferences & Additional Info
              </label>
              <textarea
                name="preferences"
                rows={3}
                value={formData.preferences}
                onChange={handleChange}
                placeholder="E.g., Slow paced traveler, interested in tea culture, modernist architecture, photography, pescatarian dining..."
                className="w-full p-4 bg-[#fcf9f3] border border-[#e6e3dc] rounded-2xl text-sm text-[#1c1c18] placeholder-[#76777d] focus:outline-none focus:border-[#1c1c18] focus:bg-white transition-all resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-3">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={loading}
                icon={ArrowRight}
                iconPosition="right"
                className="w-full justify-center shadow-md"
              >
                {loading ? "Creating Journal..." : "Create My Travel Journal"}
              </Button>
            </div>
          </form>
        </div>

        {/* Bottom Login Link */}
        <div className="text-center mt-6">
          <p className="text-xs text-[#46464c]">
            Already have an account?{" "}
            <Link to="/login" className="text-[#00696d] font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Footer copyright */}
      <div className="text-center text-xs text-[#76777d] z-10">
        © {new Date().getFullYear()} GlobeTrotter — Editorial Multi-City Planner
      </div>
    </div>
  );
}
