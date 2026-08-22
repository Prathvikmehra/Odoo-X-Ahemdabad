import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { tripService } from '../../services/tripService';
import { stopService } from '../../services/stopService';
import { activityService } from '../../services/activityService';
import {
  MapPin,
  Calendar,
  DollarSign,
  Plus,
  Trash2,
  MoveUp,
  MoveDown,
  ArrowRight,
  Clock,
  Check,
  ChevronDown,
  ChevronUp,
  Image as ImageIcon
} from 'lucide-react';
import Eyebrow from '../../components/common/Eyebrow';
import Modal from '../../components/common/Modal';

export default function ItineraryBuilder() {
  const { tripId } = useParams();
  const navigate = useNavigate();

  const [trip, setTrip] = useState(null);
  const [stops, setStops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // New Stop Modal
  const [newStopModal, setNewStopModal] = useState(false);
  const [newStopData, setNewStopData] = useState({
    city_name: '',
    country: '',
    start_date: '',
    end_date: '',
  });

  // Activity Modal per Stop
  const [activeStopForActivity, setActiveStopForActivity] = useState(null);
  const [activityFormData, setActivityFormData] = useState({
    name: '',
    type: 'Sightseeing',
    cost: '',
    duration_hours: '',
    start_time: '09:00',
    description: '',
    image_url: '',
  });

  useEffect(() => {
    loadTripAndStops();
  }, [tripId]);

  const loadTripAndStops = async () => {
    try {
      setLoading(true);
      const tripData = await tripService.getTripById(tripId);
      setTrip(tripData);

      const stopsData = await stopService.getStops(tripId);
      setStops(Array.isArray(stopsData) ? stopsData : []);
    } catch (err) {
      console.error('Error loading itinerary builder:', err);
    } finally {
      setLoading(false);
    }
  };

  // Add Stop
  const handleAddStop = async (e) => {
    e.preventDefault();
    try {
      const order = stops.length + 1;
      const created = await stopService.createStop(tripId, {
        ...newStopData,
        stop_order: order,
      });
      setStops([...stops, { ...created, activities: [] }]);
      setNewStopModal(false);
      setNewStopData({ city_name: '', country: '', start_date: '', end_date: '' });
    } catch (err) {
      console.error('Error adding stop:', err);
    }
  };

  // Delete Stop
  const handleDeleteStop = async (stopId) => {
    if (!window.confirm('Delete this stop and its attached activities?')) return;
    try {
      await stopService.deleteStop(stopId);
      setStops(stops.filter((s) => s.id !== stopId));
    } catch (err) {
      console.error('Error deleting stop:', err);
    }
  };

  // Update Stop local field or persist
  const handleUpdateStopField = async (stopId, field, value) => {
    const updated = stops.map((s) => (s.id === stopId ? { ...s, [field]: value } : s));
    setStops(updated);

    const targetStop = updated.find((s) => s.id === stopId);
    if (targetStop) {
      try {
        await stopService.updateStop(stopId, {
          city_name: targetStop.city_name,
          country: targetStop.country,
          start_date: targetStop.start_date || null,
          end_date: targetStop.end_date || null,
          stop_order: targetStop.stop_order || 1,
        });
      } catch (err) {
        console.warn('Could not auto-save stop update:', err);
      }
    }
  };

  // Add Activity to Stop
  const handleAddActivity = async (e) => {
    e.preventDefault();
    if (!activeStopForActivity) return;

    try {
      const payload = {
        name: activityFormData.name,
        type: activityFormData.type,
        cost: activityFormData.cost ? parseFloat(activityFormData.cost) : 0,
        duration_hours: activityFormData.duration_hours ? parseFloat(activityFormData.duration_hours) : 1,
        start_time: activityFormData.start_time || '09:00',
        description: activityFormData.description,
        image_url: activityFormData.image_url || 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=600&auto=format&fit=crop&q=80',
      };

      const created = await activityService.createActivity(activeStopForActivity.id, payload);

      setStops(
        stops.map((s) =>
          s.id === activeStopForActivity.id
            ? { ...s, activities: [...(s.activities || []), created] }
            : s
        )
      );

      setActiveStopForActivity(null);
      setActivityFormData({
        name: '',
        type: 'Sightseeing',
        cost: '',
        duration_hours: '',
        start_time: '09:00',
        description: '',
        image_url: '',
      });
    } catch (err) {
      console.error('Error creating activity:', err);
    }
  };

  const handleDeleteActivity = async (stopId, activityId) => {
    try {
      await activityService.deleteActivity(activityId);
      setStops(
        stops.map((s) =>
          s.id === stopId
            ? { ...s, activities: s.activities.filter((a) => a.id !== activityId) }
            : s
        )
      );
    } catch (err) {
      console.error('Error deleting activity:', err);
    }
  };

  // Reorder stops
  const handleMoveStop = (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= stops.length) return;

    const reordered = [...stops];
    const temp = reordered[index];
    reordered[index] = reordered[targetIndex];
    reordered[targetIndex] = temp;

    setStops(reordered);
  };

  if (loading) {
    return (
      <div className="py-24 text-center">
        <div className="w-8 h-8 border-2 border-ink border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-xs font-mono uppercase tracking-wider text-ink-muted">Loading journey structure...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-black/5 pb-6">
        <div>
          <Eyebrow color="text-teal">MODULAR ITINERARY BUILDER</Eyebrow>
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-ink mt-1">
            {trip?.name || 'Journey Itinerary Builder'}
          </h1>
          <p className="text-xs sm:text-sm text-ink-secondary mt-1">
            Build day-by-day city stops, set stay durations, and schedule activities.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to={`/trips/${tripId}/itinerary`}
            className="px-5 py-2.5 rounded-full bg-ink text-white hover:bg-black text-xs font-semibold flex items-center gap-2 shadow-sm transition-all"
          >
            <span>View Timeline</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#9af1f5]" />
          </Link>
          <Link
            to={`/trips/${tripId}/budget`}
            className="px-4 py-2.5 rounded-full border border-black/10 hover:bg-black/5 text-xs font-semibold text-ink transition-all"
          >
            Budget Breakdown
          </Link>
        </div>
      </div>

      {/* Vertical Stack of Section Cards (One per City/Stop) */}
      <div className="space-y-6">
        {stops.length === 0 ? (
          <div className="bg-white rounded-4xl p-10 text-center border border-black/5 shadow-soft">
            <MapPin className="w-10 h-10 text-teal mx-auto mb-2" />
            <h3 className="font-display text-xl font-bold text-ink">No City Stops Added Yet</h3>
            <p className="text-xs text-ink-secondary mt-1 mb-6">
              Add your first destination stop (e.g. Tokyo, Kyoto, Amalfi) to start organizing days and activities.
            </p>
            <button
              onClick={() => setNewStopModal(true)}
              className="px-6 py-3 rounded-full bg-ink text-white text-xs font-semibold inline-flex items-center gap-2 hover:bg-black transition-all"
            >
              <Plus className="w-4 h-4 text-[#9af1f5]" />
              <span>Add Your First Section</span>
            </button>
          </div>
        ) : (
          stops.map((stop, idx) => (
            <div
              key={stop.id}
              className="bg-white rounded-4xl p-6 sm:p-8 border border-black/5 shadow-soft space-y-6 relative group transition-all"
            >
              {/* Section Header Strip */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/5 pb-4">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-ink text-white text-xs font-mono font-bold flex items-center justify-center">
                    {(idx + 1).toString().padStart(2, '0')}
                  </span>
                  <div>
                    <Eyebrow color="text-teal">CITY SECTION {idx + 1}</Eyebrow>
                    <h3 className="font-display text-2xl font-bold text-ink flex items-center gap-2">
                      <span>{stop.city_name}</span>
                      {stop.country && <span className="text-xs font-normal text-ink-muted">({stop.country})</span>}
                    </h3>
                  </div>
                </div>

                {/* Reorder and Delete actions */}
                <div className="flex items-center gap-1 self-end sm:self-auto">
                  <button
                    disabled={idx === 0}
                    onClick={() => handleMoveStop(idx, -1)}
                    className="p-2 rounded-full border border-black/10 hover:bg-black/5 text-ink-muted hover:text-ink disabled:opacity-30"
                    title="Move Up"
                  >
                    <MoveUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    disabled={idx === stops.length - 1}
                    onClick={() => handleMoveStop(idx, 1)}
                    className="p-2 rounded-full border border-black/10 hover:bg-black/5 text-ink-muted hover:text-ink disabled:opacity-30"
                    title="Move Down"
                  >
                    <MoveDown className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeleteStop(stop.id)}
                    className="p-2 rounded-full border border-black/10 hover:bg-red-50 hover:border-red-200 text-ink-muted hover:text-red-600 ml-2"
                    title="Delete Stop"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Stop Details Grid: City name, Dates, Budget */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-ink-muted uppercase font-mono mb-1">
                    City Name
                  </label>
                  <input
                    type="text"
                    value={stop.city_name}
                    onChange={(e) => handleUpdateStopField(stop.id, 'city_name', e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#fcf9f3]/60 border border-black/10 rounded-full text-xs text-ink focus:outline-none focus:ring-2 focus:ring-teal/30 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-ink-muted uppercase font-mono mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={stop.start_date ? stop.start_date.split('T')[0] : ''}
                    onChange={(e) => handleUpdateStopField(stop.id, 'start_date', e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#fcf9f3]/60 border border-black/10 rounded-full text-xs text-ink focus:outline-none focus:ring-2 focus:ring-teal/30"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-ink-muted uppercase font-mono mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={stop.end_date ? stop.end_date.split('T')[0] : ''}
                    onChange={(e) => handleUpdateStopField(stop.id, 'end_date', e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#fcf9f3]/60 border border-black/10 rounded-full text-xs text-ink focus:outline-none focus:ring-2 focus:ring-teal/30"
                  />
                </div>
              </div>

              {/* Activities Attached to this City Section */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-ink uppercase tracking-wider font-mono">
                    Planned Activities ({stop.activities?.length || 0})
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveStopForActivity(stop)}
                    className="px-3 py-1.5 rounded-full bg-teal-soft text-teal hover:bg-teal/20 text-xs font-semibold flex items-center gap-1 transition-all"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Activity</span>
                  </button>
                </div>

                {(!stop.activities || stop.activities.length === 0) ? (
                  <div className="p-4 bg-[#fcf9f3]/70 rounded-2xl border border-dashed border-black/10 text-xs text-ink-muted text-center">
                    No activities scheduled for {stop.city_name} yet. Click "+ Add Activity" above.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {stop.activities.map((act) => (
                      <div
                        key={act.id}
                        className="flex items-center justify-between p-3.5 bg-[#fcf9f3]/80 rounded-2xl border border-black/5 hover:bg-[#fcf9f3] transition-all"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          {act.image_url && (
                            <img
                              src={act.image_url}
                              alt={act.name}
                              className="w-10 h-10 rounded-xl object-cover shrink-0"
                            />
                          )}
                          <div className="min-w-0">
                            <h5 className="font-display font-bold text-xs sm:text-sm text-ink truncate">
                              {act.name}
                            </h5>
                            <div className="flex items-center gap-3 text-[11px] text-ink-muted mt-0.5">
                              <span className="text-teal font-medium">{act.type}</span>
                              <span>• {act.start_time || '09:00'}</span>
                              <span>• {act.duration_hours || 1} hrs</span>
                              {act.cost > 0 && <span>• ₹{parseFloat(act.cost).toLocaleString('en-IN')}</span>}
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => handleDeleteActivity(stop.id, act.id)}
                          className="p-1.5 rounded-full hover:bg-red-50 text-ink-muted hover:text-red-600 transition-all shrink-0 ml-2"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))
        )}

        {/* "+ Add another Section" pill button */}
        <div className="pt-4 text-center">
          <button
            onClick={() => setNewStopModal(true)}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white hover:bg-[#fcf9f3] border-2 border-dashed border-black/20 hover:border-black/40 text-ink text-sm font-semibold inline-flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <Plus className="w-4 h-4 text-teal" />
            <span>+ Add Another City Section</span>
          </button>
        </div>
      </div>

      {/* Add New Stop Modal */}
      <Modal
        isOpen={newStopModal}
        onClose={() => setNewStopModal(false)}
        title="Add City Section / Stop"
      >
        <form onSubmit={handleAddStop} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1 font-mono">
              City Name *
            </label>
            <input
              type="text"
              required
              value={newStopData.city_name}
              onChange={(e) => setNewStopData({ ...newStopData, city_name: e.target.value })}
              placeholder="e.g. Kyoto, Positano, Zurich"
              className="w-full px-4 py-3 bg-white border border-black/10 rounded-full text-xs text-ink focus:outline-none focus:ring-2 focus:ring-teal/30"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1 font-mono">
              Country
            </label>
            <input
              type="text"
              value={newStopData.country}
              onChange={(e) => setNewStopData({ ...newStopData, country: e.target.value })}
              placeholder="e.g. Japan, Italy, Switzerland"
              className="w-full px-4 py-3 bg-white border border-black/10 rounded-full text-xs text-ink focus:outline-none focus:ring-2 focus:ring-teal/30"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1 font-mono">
                Start Date
              </label>
              <input
                type="date"
                value={newStopData.start_date}
                onChange={(e) => setNewStopData({ ...newStopData, start_date: e.target.value })}
                className="w-full px-4 py-2.5 bg-white border border-black/10 rounded-full text-xs text-ink focus:outline-none focus:ring-2 focus:ring-teal/30"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1 font-mono">
                End Date
              </label>
              <input
                type="date"
                value={newStopData.end_date}
                onChange={(e) => setNewStopData({ ...newStopData, end_date: e.target.value })}
                className="w-full px-4 py-2.5 bg-white border border-black/10 rounded-full text-xs text-ink focus:outline-none focus:ring-2 focus:ring-teal/30"
              />
            </div>
          </div>

          <div className="pt-3">
            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-ink hover:bg-black text-white text-xs font-semibold tracking-wide"
            >
              Add Section to Trip
            </button>
          </div>
        </form>
      </Modal>

      {/* Add Activity Modal */}
      {activeStopForActivity && (
        <Modal
          isOpen={Boolean(activeStopForActivity)}
          onClose={() => setActiveStopForActivity(null)}
          title={`Add Activity in ${activeStopForActivity.city_name}`}
        >
          <form onSubmit={handleAddActivity} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1 font-mono">
                Activity Title *
              </label>
              <input
                type="text"
                required
                value={activityFormData.name}
                onChange={(e) => setActivityFormData({ ...activityFormData, name: e.target.value })}
                placeholder="e.g. Bamboo Forest Sunrise Walk"
                className="w-full px-4 py-3 bg-white border border-black/10 rounded-full text-xs text-ink focus:outline-none focus:ring-2 focus:ring-teal/30"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1 font-mono">
                  Category
                </label>
                <select
                  value={activityFormData.type}
                  onChange={(e) => setActivityFormData({ ...activityFormData, type: e.target.value })}
                  className="w-full px-4 py-2.5 bg-white border border-black/10 rounded-full text-xs text-ink focus:outline-none focus:ring-2 focus:ring-teal/30"
                >
                  <option value="Sightseeing">Sightseeing</option>
                  <option value="Food & Dining">Food & Dining</option>
                  <option value="Adventure">Adventure</option>
                  <option value="Culture">Culture</option>
                  <option value="Relaxation">Relaxation</option>
                  <option value="Transport">Transport</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1 font-mono">
                  Estimated Cost (₹)
                </label>
                <input
                  type="number"
                  min="0"
                  step="50"
                  value={activityFormData.cost}
                  onChange={(e) => setActivityFormData({ ...activityFormData, cost: e.target.value })}
                  placeholder="e.g. 1500"
                  className="w-full px-4 py-2.5 bg-white border border-black/10 rounded-full text-xs text-ink focus:outline-none focus:ring-2 focus:ring-teal/30"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1 font-mono">
                  Start Time
                </label>
                <input
                  type="text"
                  value={activityFormData.start_time}
                  onChange={(e) => setActivityFormData({ ...activityFormData, start_time: e.target.value })}
                  placeholder="09:00 AM"
                  className="w-full px-4 py-2.5 bg-white border border-black/10 rounded-full text-xs text-ink focus:outline-none focus:ring-2 focus:ring-teal/30"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1 font-mono">
                  Duration (hours)
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={activityFormData.duration_hours}
                  onChange={(e) => setActivityFormData({ ...activityFormData, duration_hours: e.target.value })}
                  placeholder="2.5"
                  className="w-full px-4 py-2.5 bg-white border border-black/10 rounded-full text-xs text-ink focus:outline-none focus:ring-2 focus:ring-teal/30"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1 font-mono">
                Image URL (Optional)
              </label>
              <input
                type="url"
                value={activityFormData.image_url}
                onChange={(e) => setActivityFormData({ ...activityFormData, image_url: e.target.value })}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-4 py-2.5 bg-white border border-black/10 rounded-full text-xs text-ink focus:outline-none focus:ring-2 focus:ring-teal/30"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1 font-mono">
                Notes & Highlights
              </label>
              <textarea
                rows="2"
                value={activityFormData.description}
                onChange={(e) => setActivityFormData({ ...activityFormData, description: e.target.value })}
                placeholder="Tips, ticket info, meeting location..."
                className="w-full p-3 bg-white border border-black/10 rounded-2xl text-xs text-ink focus:outline-none focus:ring-2 focus:ring-teal/30 resize-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-ink hover:bg-black text-white text-xs font-semibold tracking-wide"
              >
                Add Activity to Timeline
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
