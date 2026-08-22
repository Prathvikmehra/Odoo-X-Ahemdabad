import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Compass, Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';
import Eyebrow from '../../components/common/Eyebrow';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.detail || 'Invalid email or password. Please try again.');
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
        <Eyebrow color="text-teal">TRAVELER AUTHENTICATION</Eyebrow>
        <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-ink mt-1">
          Welcome back to the journal.
        </h1>
        <p className="text-sm text-ink-secondary mt-2 max-w-sm mx-auto">
          Sign in to access your curated itineraries, trip expenses, and personal stories.
        </p>
      </div>

      {/* Centered Login Card */}
      <div className="w-full max-w-md bg-white rounded-4xl p-8 sm:p-10 border border-black/5 shadow-soft">
        {/* Circular Avatar Placeholder */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-[#fcf9f3] border-2 border-black/5 flex items-center justify-center overflow-hidden shadow-inner">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
              alt="Avatar placeholder"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50/80 border border-red-200/80 rounded-2xl flex items-center gap-3 text-red-700 text-xs font-medium animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1.5 font-mono">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-3 bg-[#fcf9f3]/60 border border-black/10 rounded-full text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3.5 px-6 rounded-full bg-ink hover:bg-black text-white font-semibold text-sm tracking-wide shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading ? (
              <span>Signing In...</span>
            ) : (
              <>
                <span>Sign In to GlobeTrotter</span>
                <ArrowRight className="w-4 h-4 text-[#9af1f5]" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-black/5 text-center">
          <p className="text-xs text-ink-secondary">
            Don't have an account yet?{' '}
            <Link
              to="/signup"
              className="font-bold text-ink hover:text-teal underline underline-offset-4 transition-colors"
            >
              Create Traveler Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
