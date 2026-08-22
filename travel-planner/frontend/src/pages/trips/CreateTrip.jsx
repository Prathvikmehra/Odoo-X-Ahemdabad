import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { tripService } from '../../services/tripService';
import { stopService } from '../../services/stopService';
import { activityService } from '../../services/activityService';
import {
  Compass,
  Calendar,
  MapPin,
  Image as ImageIcon,
  Sparkles,
  ArrowRight,
  Plus,
  Check,
  Globe
} from 'lucide-react';
import Eyebrow from '../../components/common/Eyebrow';

export default function CreateTrip() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    start_date: '',
    end_date: '',
    description: '',
    cover_image: '',
    destination: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [cities, setCities] = useState([]);

  // Curated cover options for fast visual selection
  const curatedCovers = [
    { title: 'Tokyo Neon & Temple', url: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1600&auto=format&fit=crop&q=80' },
    { title: 'Amalfi Coast Terraces', url: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1600&auto=format&fit=crop&q=80' },
    { title: 'Iceland Aurora & Glaciers', url: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=1600&auto=format&fit=crop&q=80' },
    { title: 'Swiss Alpine Lakes', url: 'https://images.unsplash.com/photo-1515488764276-beab7607c1e6?w=1600&auto=format&fit=crop&q=80' },
    { title: 'Santorini Blue Domes', url: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1600&auto=format&fit=crop&q=80' },
    { title: 'Kyoto Bamboo Forest', url: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=1600&auto=format&fit=crop&q=80' },
  ];

  // Suggested Places / Activities Photo Tiles
  const suggestedPlaces = [
    {
      title: 'Senso-ji Sunrise Stroll',
      city: 'Tokyo, Japan',
      image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=500&auto=format&fit=crop&q=80',
      type: 'Culture',
      desc: 'Historic Buddhist temple with sacred smoke pavilions and bustling morning market stalls.'
    },
    {
      title: 'Positano Coastal Cliff Cruise',
      city: 'Amalfi, Italy',
      image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=500&auto=format&fit=crop&q=80',
      type: 'Adventure',
      desc: 'Wooden speedboat charter navigating cobalt lagoons, sea grottos, and pastel cliff villages.'
    },
    {
      title: 'Diamond Beach Glacier Walk',
      city: 'Vik, Iceland',
      image: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=500&auto=format&fit=crop&q=80',
      type: 'Nature',
      desc: 'Glacial ice crystals washed ashore on pitch-black volcanic sand under vast Arctic skies.'
    },
    {
      title: 'Lauterbrunnen Valley Falls',
      city: 'Interlaken, Switzerland',
      image: 'https://images.unsplash.com/photo-1515488764276-beab7607c1e6?w=500&auto=format&fit=crop&q=80',
      type: 'Scenic',
      desc: '72 roaring waterfalls cascading over sheer limestone cliffs surrounded by snow-capped peaks.'
    }
  ];

  useEffect(() => {
    activityService.getCities().then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        setCities(data);
      } else {
        setCities([
          { id: 1, name: 'Tokyo', country: 'Japan' },
          { id: 2, name: 'Kyoto', country: 'Japan' },
          { id: 3, name: 'Rome', country: 'Italy' },
          { id: 4, name: 'Florence', country: 'Italy' },
          { id: 5, name: 'Reykjavik', country: 'Iceland' },
          { id: 6, name: 'Paris', country: 'France' },
        ]);
      }
    }).catch(() => {
      setCities([
        { id: 1, name: 'Tokyo', country: 'Japan' },
        { id: 2, name: 'Kyoto', country: 'Japan' },
        { id: 3, name: 'Rome', country: 'Italy' },
        { id: 4, name: 'Florence', country: 'Italy' },
        { id: 5, name: 'Reykjavik', country: 'Iceland' },
        { id: 6, name: 'Paris', country: 'France' },
      ]);
    });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectCover = (url) => {
    setFormData({ ...formData, cover_image: url });
  };

  const handleSelectDestination = (cityName) => {
    setFormData({
      ...formData,
      destination: cityName,
      name: formData.name || `The ${cityName} Journey`,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const payload = {
        name: formData.name,
        start_date: formData.start_date || null,
        end_date: formData.end_date || null,
        description: formData.description,
        cover_image: formData.cover_image || curatedCovers[0].url,
      };

      const newTrip = await tripService.createTrip(payload);

      // If initial destination was selected, auto-create the first stop
      if (formData.destination && newTrip.id) {
        const matchingCity = cities.find(c => c.name.toLowerCase() === formData.destination.toLowerCase());
        await stopService.createStop(newTrip.id, {
          city_name: formData.destination,
          country: matchingCity ? matchingCity.country : 'Global',
          start_date: formData.start_date || null,
          end_date: formData.end_date || null,
          stop_order: 1,
        }).catch(err => console.warn('Could not auto-add stop', err));
      }

      navigate(`/trips/${newTrip.id}/edit`);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to create journey. Please check your inputs.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* Header */}
      <div className="border-b border-black/5 pb-6">
        <Eyebrow color="text-teal">NEW JOURNEY BLUEPRINT</Eyebrow>
        <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-ink mt-1">
          Plan a New Journey
        </h1>
        <p className="text-sm sm:text-base text-ink-secondary mt-1 max-w-xl">
          Set up your journey essentials, pick your initial destination stop, and choose a cinematic cover photograph.
        </p>
      </div>

      {/* Main Creation Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-4xl p-8 sm:p-12 border border-black/5 shadow-soft space-y-8">
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-xs font-medium">
            {error}
          </div>
        )}

        {/* 1. Trip Name */}
        <div>
          <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-2 font-mono">
            Journey Title *
          </label>
          <input
            type="text"
            required
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Autumn in the Japanese Alps & Kyoto"
            className="w-full px-6 py-4 bg-[#fcf9f3]/60 border border-black/10 rounded-full text-base sm:text-lg text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition-all font-display font-medium"
          />
        </div>

        {/* 2. Destination Picker (Dropdown + Quick Pills) */}
        <div>
          <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-2 font-mono">
            Primary Destination / Starting City
          </label>
          <div className="relative mb-3">
            <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted" />
            <input
              type="text"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              placeholder="Type or pick a city (e.g. Tokyo, Rome, Zurich)..."
              className="w-full pl-12 pr-6 py-3.5 bg-[#fcf9f3]/60 border border-black/10 rounded-full text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition-all"
            />
          </div>

          {/* Quick city suggestions */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] text-ink-muted font-mono">POPULAR:</span>
            {cities.slice(0, 6).map((c) => (
              <button
                key={c.id || c.name}
                type="button"
                onClick={() => handleSelectDestination(c.name)}
                className={`px-3 py-1 rounded-full text-xs transition-all ${
                  formData.destination === c.name
                    ? 'bg-ink text-white shadow-sm'
                    : 'bg-[#fcf9f3] text-ink-secondary hover:bg-black/5 border border-black/5'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Date Range (Start & End Date) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-2 font-mono">
              Start Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted" />
              <input
                type="date"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
                className="w-full pl-12 pr-6 py-3.5 bg-[#fcf9f3]/60 border border-black/10 rounded-full text-sm text-ink focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-2 font-mono">
              End Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted" />
              <input
                type="date"
                name="end_date"
                value={formData.end_date}
                onChange={handleChange}
                className="w-full pl-12 pr-6 py-3.5 bg-[#fcf9f3]/60 border border-black/10 rounded-full text-sm text-ink focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition-all"
              />
            </div>
          </div>
        </div>

        {/* 4. Description Textarea */}
        <div>
          <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-2 font-mono">
            Journey Journal Overview & Notes
          </label>
          <textarea
            name="description"
            rows="3"
            value={formData.description}
            onChange={handleChange}
            placeholder="Write a short summary about the purpose of this trip, companions, themes, or unmissable goals..."
            className="w-full p-5 bg-[#fcf9f3]/60 border border-black/10 rounded-3xl text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition-all resize-none leading-relaxed"
          />
        </div>

        {/* 5. Cover Photo Upload / Selection */}
        <div>
          <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-2 font-mono">
            Cover Photograph
          </label>
          <div className="relative mb-4">
            <ImageIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted" />
            <input
              type="url"
              name="cover_image"
              value={formData.cover_image}
              onChange={handleChange}
              placeholder="Paste a direct image URL (https://images.unsplash.com/...)"
              className="w-full pl-12 pr-6 py-3.5 bg-[#fcf9f3]/60 border border-black/10 rounded-full text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition-all"
            />
          </div>

          {/* Preset Photo Curations */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {curatedCovers.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectCover(item.url)}
                className={`group relative rounded-2xl overflow-hidden aspect-[4/3] border-2 transition-all ${
                  formData.cover_image === item.url
                    ? 'border-ink ring-2 ring-teal/50 scale-105'
                    : 'border-transparent opacity-80 hover:opacity-100 hover:scale-102'
                }`}
              >
                <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
                {formData.cover_image === item.url && (
                  <div className="absolute inset-0 bg-ink/40 flex items-center justify-center text-white">
                    <Check className="w-5 h-5 text-[#9af1f5]" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4 border-t border-black/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-ink-muted">
            You will be redirected to add modular city stops and timeline activities next.
          </p>
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-ink hover:bg-black text-white font-semibold text-sm tracking-wide shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading ? (
              <span>Crafting Journey...</span>
            ) : (
              <>
                <span>Save & Build Itinerary</span>
                <ArrowRight className="w-4 h-4 text-[#9af1f5]" />
              </>
            )}
          </button>
        </div>
      </form>

      {/* Suggested Places / Activities Grid as Photo Tiles below the form */}
      <section className="space-y-4 pt-6">
        <div>
          <Eyebrow color="text-teal">CURATED EXPERIENCES TO INSPIRE</Eyebrow>
          <h2 className="font-display text-2xl font-bold text-ink">Suggested Places & Activities</h2>
          <p className="text-xs text-ink-secondary mt-0.5">Explore ideas you can attach directly to your itinerary stops.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {suggestedPlaces.map((place, idx) => (
            <div
              key={idx}
              className="group bg-white rounded-3xl overflow-hidden border border-black/5 shadow-soft hover:shadow-float transition-all flex flex-col justify-between"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={place.image}
                  alt={place.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-3 right-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-sm text-ink text-[10px] font-bold">
                    {place.type}
                  </span>
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono text-teal uppercase font-semibold">{place.city}</span>
                  <h4 className="font-display font-bold text-sm text-ink leading-tight mt-0.5">{place.title}</h4>
                  <p className="text-xs text-ink-muted line-clamp-2 mt-1">{place.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
