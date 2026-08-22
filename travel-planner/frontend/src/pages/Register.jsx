import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      await register(fullName, email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.detail || 'Registration failed');
    }
  };

  return (
    <div className="bg-warm-ivory text-ink-charcoal antialiased selection:bg-terracotta selection:text-warm-ivory">
      <main className="flex min-h-screen w-full">
        {/* Left Side: Full-bleed imagery */}
        <section className="hidden lg:flex lg:w-1/2 relative bg-surface-container-high overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                'url(https://lh3.googleusercontent.com/aida-public/AB6AXuByaJXL4x9Q-N-EH3p7ztY253AEK-7rJxmO4hCY78raOm0R-iSkxyHMifa_gO2b08SaD-2XFEKWNOGBID3UHwNvdUhBev-9b0G4onnAEj4SXAgHL2nXxhHBxFzswOmJVjAZplChemyEkAyNLrj4D5yHlYO0qa2QEdzG8L1FmvnZblLkx2UQAgmePWC8TBUB8NaP7WDar5R1Fod-pLS5a6wHb-9INpsL7R9hBpSTYnrw9x4DDpCoFkhp5w)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-charcoal/80 via-ink-charcoal/20 to-transparent" />
          <div className="relative z-10 flex flex-col justify-end p-margin-desktop h-full w-full max-w-2xl">
            <h1 className="font-section-heading text-section-heading text-warm-ivory text-balance">
              Sophisticated<br />Exploration.
            </h1>
            <p className="font-body-lg text-body-lg text-warm-ivory/90 mt-8 max-w-md">
              Curated narratives for the discerning traveler.
            </p>
          </div>
        </section>

        {/* Right Side: Form Content */}
        <section className="w-full lg:w-1/2 flex flex-col justify-center px-margin-mobile lg:px-[120px] py-section-lg relative">
          <div className="absolute top-margin-mobile lg:top-margin-desktop left-margin-mobile lg:left-[120px]">
            <Link to="/" className="font-section-heading-mobile text-section-heading-mobile text-primary italic tracking-tight">
              GlobeTrotter
            </Link>
          </div>
          <div className="max-w-md w-full mx-auto lg:mx-0 mt-16 lg:mt-0">
            <h2 className="font-section-heading-mobile text-section-heading-mobile lg:font-section-heading lg:text-section-heading text-ink-charcoal mb-12">
              Begin your journey.
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-10">
              {error && <div className="text-error font-body-md text-body-md">{error}</div>}
              <div className="relative flex flex-col-reverse">
                <input
                  id="full-name"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="editorial-input font-body-lg text-body-lg peer"
                  placeholder=" "
                />
                <label
                  htmlFor="full-name"
                  className="font-label-caps text-label-caps text-ink-charcoal/60 peer-focus:text-terracotta transition-colors mb-2"
                >
                  Full Name
                </label>
              </div>
              <div className="relative flex flex-col-reverse">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="editorial-input font-body-lg text-body-lg peer"
                  placeholder=" "
                />
                <label
                  htmlFor="email"
                  className="font-label-caps text-label-caps text-ink-charcoal/60 peer-focus:text-terracotta transition-colors mb-2"
                >
                  Email Address
                </label>
              </div>
              <div className="relative flex flex-col-reverse">
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="editorial-input font-body-lg text-body-lg peer"
                  placeholder=" "
                />
                <label
                  htmlFor="password"
                  className="font-label-caps text-label-caps text-ink-charcoal/60 peer-focus:text-terracotta transition-colors mb-2"
                >
                  Password
                </label>
              </div>
              <div className="relative flex flex-col-reverse">
                <input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="editorial-input font-body-lg text-body-lg peer"
                  placeholder=" "
                />
                <label
                  htmlFor="confirm-password"
                  className="font-label-caps text-label-caps text-ink-charcoal/60 peer-focus:text-terracotta transition-colors mb-2"
                >
                  Confirm Password
                </label>
              </div>
              <div className="mt-8 flex flex-col gap-6 items-start">
                <button
                  type="submit"
                  className="bg-terracotta text-warm-ivory py-4 px-10 rounded-DEFAULT font-label-caps text-label-caps hover:bg-primary transition-colors duration-300 w-full sm:w-auto shadow-sm"
                >
                  Create Account
                </button>
                <div className="mt-4">
                  <span className="font-body-md text-body-md text-ink-charcoal/60">
                    Already have an account?{' '}
                  </span>
                  <Link to="/login" className="editorial-link text-ink-charcoal ml-2">
                    Login
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}