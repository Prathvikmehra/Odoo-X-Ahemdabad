import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { tripService } from '../../services/tripService';

export default function TripDetails() {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const data = await tripService.getTrip(tripId);
        setTrip(data);
      } catch (err) {
        setError(err.response?.data?.detail || 'Trip not found');
      } finally {
        setLoading(false);
      }
    };
    fetchTrip();
  }, [tripId]);

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete "${trip.name}"? This cannot be undone.`)) return;
    try {
      await tripService.deleteTrip(tripId);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to delete trip.');
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const tripDuration = (start, end) => {
    if (!start || !end) return null;
    const diff = Math.ceil((new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24));
    return diff + (diff === 1 ? ' day' : ' days');
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto animate-pulse space-y-6">
        <div className="bg-gray-200 h-64 rounded-xl w-full"></div>
        <div className="bg-gray-200 h-8 rounded w-1/2"></div>
        <div className="bg-gray-200 h-4 rounded w-1/3"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-lg">
          <p className="text-red-700 font-medium">{error}</p>
          <Link to="/dashboard" className="text-blue-600 text-sm mt-2 inline-block hover:underline">← Back to Dashboard</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Cover Banner */}
      <div className="h-64 w-full rounded-xl overflow-hidden relative bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
        {trip.cover_image && !imageError ? (
          <img
            src={trip.cover_image}
            alt={trip.name}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-center text-white">
            <svg className="w-16 h-16 mx-auto mb-2 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2h1.5a2.5 2.5 0 002.5-2.5V7a2 2 0 00-2-2h-1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-semibold uppercase tracking-wider opacity-80">Trip Cover</span>
          </div>
        )}
      </div>

      {/* Trip Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Link to="/dashboard" className="text-xs text-gray-500 hover:text-blue-600 transition">← Dashboard</Link>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">{trip.name}</h1>
            {trip.description && (
              <p className="text-gray-600 mt-2 text-sm leading-relaxed">{trip.description}</p>
            )}
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <button
              onClick={handleDelete}
              className="px-3 py-1.5 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md border border-red-200 transition"
            >
              Delete Trip
            </button>
          </div>
        </div>

        {/* Meta Stats */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-100">
          <div>
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</span>
            <p className="text-sm font-semibold text-gray-900 mt-0.5">{formatDate(trip.start_date)}</p>
          </div>
          <div>
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</span>
            <p className="text-sm font-semibold text-gray-900 mt-0.5">{formatDate(trip.end_date)}</p>
          </div>
          <div>
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</span>
            <p className="text-sm font-semibold text-gray-900 mt-0.5">{tripDuration(trip.start_date, trip.end_date) || '—'}</p>
          </div>
        </div>
      </div>

      {/* Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          to={`/trips/${tripId}/itinerary`}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-blue-300 transition group"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-700 transition">Itinerary</h3>
              <p className="text-xs text-gray-500 mt-0.5">Manage stops & activities</p>
            </div>
            <svg className="w-5 h-5 text-gray-400 ml-auto group-hover:text-blue-500 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>

        <Link
          to={`/trips/${tripId}/budget`}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-green-300 transition group"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 group-hover:text-green-700 transition">Budget</h3>
              <p className="text-xs text-gray-500 mt-0.5">Track expenses & spending</p>
            </div>
            <svg className="w-5 h-5 text-gray-400 ml-auto group-hover:text-green-500 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>
      </div>
    </div>
  );
}
