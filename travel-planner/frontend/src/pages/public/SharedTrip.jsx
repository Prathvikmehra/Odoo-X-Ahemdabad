import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function SharedTrip() {
  const { token } = useParams();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const fetchSharedTrip = async () => {
      try {
        // Public endpoint — no auth token required
        const res = await axios.get(`/api/public/trips/${token}`);
        setTrip(res.data);
      } catch (err) {
        if (err.response?.status === 404) {
          setError('This shared trip link is invalid or has expired.');
        } else {
          setError('Failed to load shared trip. Please check the link and try again.');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchSharedTrip();
  }, [token]);

  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500 font-medium animate-pulse">Loading shared trip…</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
          </svg>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Trip Not Found</h2>
          <p className="text-sm text-gray-600">{error}</p>
          <a href="/" className="mt-6 inline-block text-sm text-blue-600 hover:underline">Go to Travel Planner</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Public Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-blue-600 font-bold text-lg">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2h1.5a2.5 2.5 0 002.5-2.5V7a2 2 0 00-2-2h-1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Travel Planner</span>
          </div>
          <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Shared Trip</span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Cover Banner */}
        <div className="h-56 w-full rounded-xl overflow-hidden relative bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
          {trip.cover_image && !imageError ? (
            <img
              src={trip.cover_image}
              alt={trip.name}
              onError={() => setImageError(true)}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-center text-white">
              <svg className="w-14 h-14 mx-auto mb-2 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2h1.5a2.5 2.5 0 002.5-2.5V7a2 2 0 00-2-2h-1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          )}
        </div>

        {/* Trip Info */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="mb-1">
            <span className="inline-block text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full mb-3">Shared Trip</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">{trip.name}</h1>
          {trip.description && (
            <p className="text-gray-600 mt-3 text-sm leading-relaxed">{trip.description}</p>
          )}

          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-100">
            <div>
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</span>
              <p className="text-sm font-semibold text-gray-900 mt-0.5">{formatDate(trip.start_date)}</p>
            </div>
            <div>
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</span>
              <p className="text-sm font-semibold text-gray-900 mt-0.5">{formatDate(trip.end_date)}</p>
            </div>
          </div>
        </div>

        {/* CTA to Sign Up */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white text-center">
          <h3 className="text-lg font-bold mb-1">Plan your own trip</h3>
          <p className="text-sm text-blue-100 mb-4">Join Travel Planner to create and share your own itineraries.</p>
          <a
            href="/signup"
            className="inline-block px-5 py-2 bg-white text-blue-700 font-semibold text-sm rounded-lg hover:bg-blue-50 transition"
          >
            Get Started Free
          </a>
        </div>
      </main>
    </div>
  );
}
