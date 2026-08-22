import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Compass, ArrowRight, Lock, Mail, Sparkles } from 'lucide-react';
import { useTravel } from '../../context/TravelContext';
import { Button, Eyebrow } from '../../components/common/Button';

export default function Login() {
  const navigate = useNavigate();
  const { setUser, showToast } = useTravel();
  const [email, setEmail] = useState('alex.mercer@globetrotter.io');
  const [password, setPassword] = useState('••••••••••••');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToast("Welcome back, Alex! Loading your journeys...");
      navigate('/dashboard');
    }, 400);
  };

  const handleQuickDemo = (role) => {
    if (role === 'alex') {
      setEmail('alex.mercer@globetrotter.io');
      showToast("Loaded Alex Mercer's traveler account.");
    }
  };

  return (
    <div className="min-h-screen bg-[#fcf9f3] flex flex-col justify-between relative overflow-hidden py-12 px-6">
      
      {/* Subtle Background Ambience */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#9af1f5]/15 rounded-full blur-3xl pointer-events-none -mr-40 -mt-40" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#dbc3a8]/20 rounded-full blur-3xl pointer-events-none -ml-40 -mb-40" />

      {/* Header Brand */}
      <div className="max-w-[1440px] mx-auto w-full flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-[#1c1c18] flex items-center justify-center text-[#fcf9f3]">
            <Compass className="w-5 h-5 text-[#9af1f5]" />
          </div>
          <span className="text-xl font-bold tracking-tight text-[#1c1c18]">
            GlobeTrotter
          </span>
        </Link>
        <Link to="/signup" className="text-xs font-medium text-[#46464c] hover:text-[#1c1c18] transition-colors">
          Need an account? <span className="underline font-semibold">Sign up</span>
        </Link>
      </div>

      {/* Centered Login Card */}
      <div className="max-w-md w-full mx-auto my-8">
        <div className="bg-white/90 backdrop-blur-md border border-[#e6e3dc] rounded-[36px] p-8 md:p-10 shadow-xl relative">
          
          {/* Avatar / Photo Placeholder */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="relative mb-4 group">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
                alt="Traveler avatar"
                className="w-20 h-20 rounded-full object-cover ring-4 ring-[#f6f2e9] shadow-sm group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-[#00696d] border-2 border-white flex items-center justify-center">
                <Sparkles className="w-2.5 h-2.5 text-[#9af1f5]" />
              </span>
            </div>

            <Eyebrow color="text-[#00696d]">Traveler Sign In</Eyebrow>
            <h1 className="text-2xl md:text-3xl font-bold text-[#1c1c18] tracking-tight mt-1">
              Welcome back
            </h1>
            <p className="text-xs text-[#76777d] mt-1 max-w-xs">
              Continue crafting your itineraries, budgets, and public journal entries.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-[11px] font-semibold tracking-wider uppercase text-[#46464c] block mb-1.5 pl-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#76777d] absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex.mercer@globetrotter.io"
                  className="w-full pl-11 pr-4 py-3 bg-[#fcf9f3] border border-[#e6e3dc] rounded-full text-sm text-[#1c1c18] placeholder-[#76777d] focus:outline-none focus:border-[#1c1c18] focus:bg-white transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5 pl-1 pr-1">
                <label className="text-[11px] font-semibold tracking-wider uppercase text-[#46464c]">
                  Password
                </label>
                <a href="#forgot" onClick={(e) => { e.preventDefault(); showToast("Password reset link sent to email."); }} className="text-xs text-[#00696d] hover:underline">
                  Forgot?
                </a>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#76777d] absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-11 pr-4 py-3 bg-[#fcf9f3] border border-[#e6e3dc] rounded-full text-sm text-[#1c1c18] placeholder-[#76777d] focus:outline-none focus:border-[#1c1c18] focus:bg-white transition-all"
                />
              </div>
            </div>

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
                {loading ? "Authenticating..." : "Sign In to Journeys"}
              </Button>
            </div>
          </form>

          {/* Quick Demo Switcher */}
          <div className="mt-8 pt-6 border-t border-[#e6e3dc] text-center">
            <p className="text-[11px] text-[#76777d] mb-2 font-medium">Quick Demo Access</p>
            <div className="flex justify-center gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemo('alex')}
                className="px-3 py-1 bg-[#f6f2e9] hover:bg-[#e6e3dc] text-[11px] font-medium text-[#1c1c18] rounded-full transition-colors cursor-pointer"
              >
                Alex Mercer (Default)
              </button>
              <button
                type="button"
                onClick={() => navigate('/admin')}
                className="px-3 py-1 bg-[#9af1f5]/25 hover:bg-[#9af1f5]/40 text-[11px] font-medium text-[#00696d] rounded-full transition-colors cursor-pointer"
              >
                Admin View
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Signup Link */}
        <div className="text-center mt-6">
          <p className="text-xs text-[#46464c]">
            Don't have a GlobeTrotter journal yet?{" "}
            <Link to="/signup" className="text-[#00696d] font-semibold hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>

      {/* Footer copyright */}
      <div className="text-center text-xs text-[#76777d]">
        © {new Date().getFullYear()} GlobeTrotter — Editorial Multi-City Planner
      </div>
    </div>
  );
}
