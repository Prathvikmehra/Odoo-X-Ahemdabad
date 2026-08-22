import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Compass, User, Mail, Lock, Phone, MapPin, Globe, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';
import Eyebrow from '../../components/common/Eyebrow';

export default function Signup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    city: '',
    country: '',
    additionalInfo: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const fullName = `${formData.firstName} ${formData.lastName}`.trim() || 'GlobeTrotter Traveler';

    try {
      await signup(fullName, formData.email, formData.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to create your traveler account. Email may already be in use.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcf9f3] flex flex-col justify-center items-center px-4 py-12">
      {/* Editorial Header */}
      <div className="text-center mb-8">
        <Link to="/" className="inline-flex items-center gap-2.5 mb-4 group">
          <div className="w-10 h-10 rounded-full bg-ink text-white flex items-center justify-center font-serif font-bold text-lg group-hover:scale-105 transition-transform">
            G
          </div>
          <span className="font-display font-bold text-2xl tracking-tight text-ink">
            GlobeTrotter
          </span>
        </Link>
        <Eyebrow color="text-teal">MEMBER REGISTRATION</Eyebrow>
        <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-ink mt-1">
          Begin your travel journal.
        </h1>
        <p className="text-sm text-ink-secondary mt-2 max-w-md mx-auto">
          Join our global community of thoughtful travelers planning multi-city itineraries and sharing unscripted adventures.
        </p>
      </div>

      {/* Centered Registration Card (2-Column Grid) */}
      <div className="w-full max-w-2xl bg-white rounded-4xl p-8 sm:p-12 border border-black/5 shadow-soft">
        {error && (
          <div className="mb-6 p-4 bg-red-50/80 border border-red-200/80 rounded-2xl flex items-center gap-3 text-red-700 text-xs font-medium animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* 2-Column Grid for Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1.5 font-mono">
                First Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted" />
                <input
                  type="text"
                  required
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Alex"
                  className="w-full pl-11 pr-4 py-3 bg-[#fcf9f3]/60 border border-black/10 rounded-full text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1.5 font-mono">
                Last Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted" />
                <input
                  type="text"
                  required
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Vance"
                  className="w-full pl-11 pr-4 py-3 bg-[#fcf9f3]/60 border border-black/10 rounded-full text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition-all"
                />
              </div>
            </div>
          </div>

          {/* 2-Column Grid for Email & Password */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1.5 font-mono">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted" />
                <input
                  type="email"
                  required
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="alex@traveler.com"
                  className="w-full pl-11 pr-4 py-3 bg-[#fcf9f3]/60 border border-black/10 rounded-full text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1.5 font-mono">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted" />
                <input
                  type="password"
                  required
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a strong password"
                  className="w-full pl-11 pr-4 py-3 bg-[#fcf9f3]/60 border border-black/10 rounded-full text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition-all"
                />
              </div>
            </div>
          </div>

          {/* 2-Column Grid for Phone, City, Country */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1.5 font-mono">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 019-283"
                  className="w-full pl-11 pr-4 py-3 bg-[#fcf9f3]/60 border border-black/10 rounded-full text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1.5 font-mono">
                City of Residence
              </label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted" />
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="San Francisco"
                  className="w-full pl-11 pr-4 py-3 bg-[#fcf9f3]/60 border border-black/10 rounded-full text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1.5 font-mono">
                Country
              </label>
              <div className="relative">
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted" />
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="United States"
                  className="w-full pl-11 pr-4 py-3 bg-[#fcf9f3]/60 border border-black/10 rounded-full text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition-all"
                />
              </div>
            </div>
          </div>

          {/* Larger Additional Info Textarea */}
          <div>
            <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1.5 font-mono flex items-center justify-between">
              <span>Travel Style & Additional Preferences</span>
              <span className="text-[10px] text-ink-muted lowercase font-normal">Optional</span>
            </label>
            <textarea
              name="additionalInfo"
              rows="3"
              value={formData.additionalInfo}
              onChange={handleChange}
              placeholder="Tell us about your favorite travel styles (e.g., boutique hotels, solo photography, culinary expeditions, rail journeys)..."
              className="w-full p-4 bg-[#fcf9f3]/60 border border-black/10 rounded-3xl text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition-all resize-none"
            />
          </div>

          {/* Pill Register Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 px-8 rounded-full bg-ink hover:bg-black text-white font-semibold text-sm tracking-wide shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-60 mt-4"
          >
            {loading ? (
              <span>Registering Traveler...</span>
            ) : (
              <>
                <span>Register & Open Journal</span>
                <ArrowRight className="w-4 h-4 text-[#9af1f5]" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-black/5 text-center">
          <p className="text-xs text-ink-secondary">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-bold text-ink hover:text-teal underline underline-offset-4 transition-colors"
            >
              Sign In Instead
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
