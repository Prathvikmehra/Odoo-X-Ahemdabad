import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { tripService } from '../../services/tripService';
import TripCard from '../../components/trips/TripCard';

export default function Dashboard() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchTrips = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await tripService.getTrips();
      setTrips(data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to load trips');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  const handleDeleteTrip = async (tripId) => {
    setError('');
    try {
      await tripService.deleteTrip(tripId);
      // Confirmed removal: only update state after API returns HTTP 204
      setTrips((prevTrips) => prevTrips.filter((t) => t.id !== tripId));
    } catch (err) {
      const detail = err.response?.data?.detail || 'Failed to delete trip. Please try again.';
      setError(detail);
      throw err;
    }
  };

  return (
    <div className="space-y-6">
      {/* Dashboard Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Trips</h1>
          <p className="text-sm text-gray-600 mt-1">Manage and organize your travel itineraries</p>
        </div>
        <Link
          to="/trips/new"
          className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
        >
          + Create New Trip
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 text-red-700 text-sm rounded">
          {error}
        </div>
      )}

      {/* Loading Skeleton */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 h-80 animate-pulse p-4 flex flex-col justify-between">
              <div className="bg-gray-200 h-40 rounded-md w-full mb-4"></div>
              <div className="space-y-2">
                <div className="bg-gray-200 h-5 rounded w-3/4"></div>
                <div className="bg-gray-200 h-4 rounded w-1/2"></div>
              </div>
              <div className="bg-gray-200 h-8 rounded w-full mt-4"></div>
            </div>
          ))}
        </div>
      ) : trips.length === 0 ? (
        /* Empty State CTA */
        <div className="bg-white rounded-xl border-2 border-dashed border-gray-300 p-12 text-center my-8">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <h3 className="mt-2 text-base font-semibold text-gray-900">No trips planned yet</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by creating your first travel itinerary.</p>
          <div className="mt-6">
            <Link
              to="/trips/new"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              + Create Your First Trip
            </Link>
          </div>
        </div>
      ) : (
        /* Trips Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map((trip) => (
            <TripCard key={trip.id} trip={trip} onDelete={handleDeleteTrip} />
          ))}
        </div>
      )}
    </div>
  );
}
