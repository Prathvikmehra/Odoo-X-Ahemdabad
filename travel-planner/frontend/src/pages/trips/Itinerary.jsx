import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../../services/api';
import { tripService } from '../../services/tripService';

const STOP_CATEGORIES = ['Hotel', 'Restaurant', 'Attraction', 'Transport', 'Activity', 'Other'];

export default function Itinerary() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);
  const [stops, setStops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);

  // New stop form state
  const [stopName, setStopName] = useState('');
  const [stopCategory, setStopCategory] = useState('Attraction');
  const [stopDate, setStopDate] = useState('');
  const [stopNotes, setStopNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tripData = await tripService.getTrip(tripId);
        setTrip(tripData);
        // stops endpoint is a stub: returns {msg: "get_stops"}
        // We'll store stops in local state only for this session (backend stub)
        const res = await api.get(`/trips/${tripId}/stops`);
        setStops(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        setError(err.response?.data?.detail || 'Failed to load itinerary');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [tripId]);

  const handleAddStop = async (e) => {
    e.preventDefault();
    setFormError('');
    if (!stopName.trim()) { setFormError('Stop name is required'); return; }
    setSubmitting(true);
    try {
      // Backend stops is a stub — we optimistically add to local UI state
      // When backend is implemented, replace with: await api.post(`/trips/${tripId}/stops`, {...})
      const newStop = {
        id: Date.now(),
        name: stopName,
        category: stopCategory,
        date: stopDate,
        notes: stopNotes,
        _local: true, // flag as locally added
      };
      setStops((prev) => [...prev, newStop]);
      setStopName('');
      setStopCategory('Attraction');
      setStopDate('');
      setStopNotes('');
      setShowForm(false);
    } catch (err) {
      setFormError('Failed to add stop.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleRemoveStop = (id) => {
    if (!window.confirm('Remove this stop?')) return;
    setStops((prev) => prev.filter((s) => s.id !== id));
  };

  const categoryColors = {
    Hotel: 'bg-purple-100 text-purple-700',
    Restaurant: 'bg-orange-100 text-orange-700',
    Attraction: 'bg-blue-100 text-blue-700',
    Transport: 'bg-gray-100 text-gray-700',
    Activity: 'bg-green-100 text-green-700',
    Other: 'bg-yellow-100 text-yellow-700',
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto animate-pulse space-y-4">
        <div className="bg-gray-200 h-8 rounded w-1/3"></div>
        {[1,2,3].map(i => <div key={i} className="bg-gray-200 h-20 rounded-xl"></div>)}
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-200 pb-5">
        <div>
          <Link to={`/trips/${tripId}`} className="text-xs text-gray-500 hover:text-blue-600 transition">← {trip?.name || 'Trip Details'}</Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-1">Itinerary</h1>
          <p className="text-sm text-gray-500 mt-0.5">Plan your stops and activities</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md shadow-sm transition"
        >
          + Add Stop
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 text-red-700 text-sm rounded">{error}</div>
      )}

      {/* Add Stop Form */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-sm border border-blue-200 p-5">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Add New Stop</h2>
          {formError && <p className="text-red-600 text-sm mb-3">{formError}</p>}
          <form onSubmit={handleAddStop} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stop Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. Tokyo Tower"
                  value={stopName}
                  onChange={(e) => setStopName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={stopCategory}
                  onChange={(e) => setStopCategory(e.target.value)}
                >
                  {STOP_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={stopDate}
                  onChange={(e) => setStopDate(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Optional notes..."
                  value={stopNotes}
                  onChange={(e) => setStopNotes(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50">Cancel</button>
              <button type="submit" disabled={submitting} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md disabled:opacity-50">
                {submitting ? 'Adding...' : 'Add Stop'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Stops List */}
      {stops.length === 0 ? (
        <div className="bg-white rounded-xl border-2 border-dashed border-gray-300 p-12 text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <h3 className="mt-2 text-base font-semibold text-gray-900">No stops yet</h3>
          <p className="text-sm text-gray-500 mt-1">Add your first stop to start building your itinerary.</p>
          <button onClick={() => setShowForm(true)} className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700">
            + Add First Stop
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {stops.map((stop, idx) => (
            <div key={stop.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex items-start gap-4 hover:shadow-md transition">
              {/* Step number */}
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
                {idx + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold text-gray-900 text-sm">{stop.name}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${categoryColors[stop.category] || 'bg-gray-100 text-gray-700'}`}>
                    {stop.category}
                  </span>
                  {stop._local && (
                    <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">Session only</span>
                  )}
                </div>
                {stop.date && <p className="text-xs text-gray-500 mt-1">{new Date(stop.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>}
                {stop.notes && <p className="text-xs text-gray-500 mt-1">{stop.notes}</p>}
              </div>
              <button
                onClick={() => handleRemoveStop(stop.id)}
                className="text-xs text-red-500 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded transition flex-shrink-0"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
