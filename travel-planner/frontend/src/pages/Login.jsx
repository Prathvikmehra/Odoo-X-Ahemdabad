import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed');
    }
  };

  return (
    <div className="bg-surface text-ink-charcoal min-h-screen flex flex-col md:flex-row antialiased">
      {/* Left Side: Cinematic Image */}
      <div className="hidden md:flex md:w-1/2 relative bg-surface-container-high h-screen overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://lh3.googleusercontent.com/aida-public/AB6AXuDJ4Ii77Z8zQ7KRsTTSLwKbRN5vlkyoUzPstJpvPlI0N8GrQjc0Fhgu07Q_YvNK2m9f-5IdHg5XxRS-0UQzIE7dk_jkCLRaxjTJ8Lb3KSblWWx3fU5tBw0vJcNYrUNeHEPoUsvAKgaKGc3JmGLe9AsxvpFfgCZSYklCFdnuOcUzPnz_6zqhBJIYfZ3WK5NYscJ7y29AX01zrmGvS5ljz2azz_hi3CvSv2ta-hfQRQKD7SGGmEOfqMQvAg)',
          }}
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-section-lg left-margin-desktop right-margin-desktop z-10 text-warm-ivory">
          <h1 className="font-section-heading text-section-heading leading-tight mb-6">
            Every journey<br />begins somewhere.
          </h1>
          <div className="flex items-center gap-4">
            <span className="font-label-stamp text-label-stamp tracking-widest uppercase border border-warm-ivory/50 rounded-full px-4 py-1 backdrop-blur-sm">
              Inspiration
            </span>
          </div>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="w-full md:w-1/2 min-h-screen flex flex-col justify-center px-margin-mobile md:px-margin-desktop py-section-lg bg-surface relative">
        <div className="w-full max-w-md mx-auto">
          {/* Logo */}
          <div className="mb-12 md:mb-16">
            <img
              alt="GlobeTrotter Logo"
              className="h-16 w-auto object-contain"
              src="https://lh3.googleusercontent.com/aida/AEtjO1X7TLD730otf3yW4OZ6kqdCSzVszY2z3o-_9wWL1w1Di6XjKayQoZM3VoY-h2CeYXRrvH4tKVimXW3QICJZ1DnfzVM45oDITVbUp3lpoF5QMJpSKyrf75I0oHCq8YhzPsS0YE0l8WgW1S7xSa4jmdt58cZkdty3Q0SgbzOOeQBFdvgk13MKuuuQs33iGuGXf3o--OZB6-jONL_a5ihtkp46ssIV_2hW9n9FxqOfK6Epttlo7atvuPjuyeka"
            />
          </div>

          <div className="mb-12">
            <h2 className="font-section-heading-mobile md:font-section-heading text-section-heading-mobile md:text-section-heading mb-4 text-ink-charcoal">
              Welcome back
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Please enter your details to access your curated itineraries.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {error && (
              <div className="text-error font-body-md text-body-md">{error}</div>
            )}
            <div className="relative group">
              <label
                htmlFor="email"
                className="block font-label-caps text-label-caps text-on-surface-variant mb-2 transition-colors group-focus-within:text-terracotta"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="editorial-input w-full font-body-lg text-body-lg text-ink-charcoal placeholder-tertiary-fixed-dim"
                placeholder="nomad@globetrotter.com"
              />
            </div>

            <div className="relative group">
              <label
                htmlFor="password"
                className="block font-label-caps text-label-caps text-on-surface-variant mb-2 transition-colors group-focus-within:text-terracotta"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="editorial-input w-full font-body-lg text-body-lg text-ink-charcoal placeholder-tertiary-fixed-dim"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center justify-between pt-4">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="h-4 w-4 rounded-sm border-ink-charcoal text-terracotta focus:ring-terracotta bg-transparent"
                />
                <label htmlFor="remember-me" className="ml-3 block font-body-md text-body-md text-on-surface-variant">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-body-md text-body-md text-deep-teal hover:text-terracotta transition-colors">
                  Forgot password?
                </a>
              </div>
            </div>

            <div className="pt-8">
              <button
                type="submit"
                className="w-full flex justify-center py-4 px-8 border border-transparent rounded-lg shadow-sm font-label-caps text-label-caps text-warm-ivory bg-terracotta hover:bg-primary-container focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-terracotta transition-all duration-300 hover:scale-[1.02]"
              >
                Sign In
              </button>
            </div>

            <div className="mt-8 text-center border-t border-deep-teal/10 pt-8">
              <p className="font-body-md text-body-md text-on-surface-variant">
                Don't have an account?
                <Link to="/register" className="editorial-link text-ink-charcoal ml-2">
                  Create account
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}