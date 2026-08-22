import React, { useState } from 'react';
import {
  Users,
  MapPin,
  TrendingUp,
  Activity,
  DollarSign,
  Shield,
  Search,
  ArrowUpRight,
  Sparkles,
  BarChart3,
  PieChart,
  LineChart
} from 'lucide-react';
import Eyebrow from '../../components/common/Eyebrow';
import StatCard from '../../components/common/StatCard';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('Overview'); // 'Overview', 'Manage Users', 'Popular Cities', 'Popular Activities', 'User Trends'

  const tabs = [
    'Overview',
    'Manage Users',
    'Popular Cities',
    'Popular Activities',
    'User Trends'
  ];

  // Mock Admin Metrics & Lists
  const mockUsers = [
    { id: 1, name: 'Sofia Chen', email: 'sofia@traveler.com', trips: 6, joined: 'Jan 2026', role: 'Curator' },
    { id: 2, name: 'Marco Rossi', email: 'marco@traveler.com', trips: 4, joined: 'Feb 2026', role: 'Member' },
    { id: 3, name: 'Elena Rostova', email: 'elena@traveler.com', trips: 8, joined: 'Dec 2025', role: 'Pro' },
    { id: 4, name: 'Alex Vance', email: 'alex@traveler.com', trips: 3, joined: 'Mar 2026', role: 'Member' },
    { id: 5, name: 'Liam Davies', email: 'liam@traveler.com', trips: 5, joined: 'Feb 2026', role: 'Member' },
  ];

  const popularCities = [
    { rank: '01', name: 'Tokyo', country: 'Japan', journeysCount: 142, growth: '+28%' },
    { rank: '02', name: 'Kyoto', country: 'Japan', journeysCount: 118, growth: '+19%' },
    { rank: '03', name: 'Positano', country: 'Italy', journeysCount: 94, growth: '+34%' },
    { rank: '04', name: 'Reykjavik', country: 'Iceland', journeysCount: 76, growth: '+12%' },
    { rank: '05', name: 'Zurich', country: 'Switzerland', journeysCount: 65, growth: '+8%' },
  ];

  const popularActivities = [
    { rank: '01', name: 'Senso-ji Dawn Stroll', city: 'Tokyo', category: 'Culture', bookmarks: 580 },
    { rank: '02', name: 'Blue Grotto Rowboat Cruise', city: 'Capri', category: 'Nature', bookmarks: 490 },
    { rank: '03', name: 'Arashiyama Bamboo Trail', city: 'Kyoto', category: 'Nature', bookmarks: 440 },
    { rank: '04', name: 'Path of the Gods Clifftop Trek', city: 'Positano', category: 'Adventure', bookmarks: 395 },
    { rank: '05', name: 'Sky Lagoon Geothermal Soak', city: 'Reykjavik', category: 'Relaxation', bookmarks: 360 },
  ];

  // Visual trend bar heights for the soft charts
  const monthlyTrends = [
    { month: 'Nov', signups: 120, journeys: 85, pct: 45 },
    { month: 'Dec', signups: 190, journeys: 140, pct: 70 },
    { month: 'Jan', signups: 240, journeys: 195, pct: 85 },
    { month: 'Feb', signups: 280, journeys: 230, pct: 95 },
    { month: 'Mar', signups: 320, journeys: 270, pct: 100 },
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-black/5 pb-6">
        <div>
          <Eyebrow color="text-teal">PLATFORM OPERATIONS & TELEMETRY</Eyebrow>
          <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-ink mt-1">
            Admin & Analytics Dashboard
          </h1>
          <p className="text-sm sm:text-base text-ink-secondary mt-1">
            Monitor platform health, user growth, top destinations, and itinerary trends.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-mono font-semibold self-start md:self-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>API & DATABASE HEALTHY</span>
        </div>
      </div>

      {/* Tab-Like Pill Buttons for Section Switch */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === tab
                ? 'bg-ink text-white shadow-sm'
                : 'bg-white text-ink-secondary hover:text-ink hover:bg-black/5 border border-black/5'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Layout Grid: Main Content + Sidebar Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-8 space-y-8">
          {/* Key Stat Cards Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatCard
              label="TOTAL TRAVELERS"
              value="1,428"
              subtext="+18% new travelers this month"
              icon={Users}
            />
            <StatCard
              label="ACTIVE EXPEDITIONS"
              value="384"
              subtext="89 underway right now"
              icon={TrendingUp}
              accent={true}
            />
            <StatCard
              label="CURATED DESTINATIONS"
              value="52"
              subtext="Across 18 countries"
              icon={MapPin}
            />
          </div>

          {/* TAB 1: OVERVIEW & CHARTS */}
          {(activeTab === 'Overview' || activeTab === 'User Trends') && (
            <div className="bg-white rounded-4xl p-6 sm:p-8 border border-black/5 shadow-soft space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Eyebrow color="text-teal">EXPEDITION & USER ACTIVITY</Eyebrow>
                  <h3 className="font-display text-xl font-bold text-ink mt-0.5">Platform Growth Trends</h3>
                </div>
                <span className="text-xs font-mono font-bold text-teal bg-teal-soft px-3 py-1 rounded-full">
                  Monthly Volume
                </span>
              </div>

              {/* Supporting Bar Chart in Soft Neutral + Teal Accent */}
              <div className="pt-6 pb-2">
                <div className="flex items-end justify-between gap-4 h-48 sm:h-56 px-4 border-b border-black/5">
                  {monthlyTrends.map((t) => (
                    <div key={t.month} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                      <div className="w-full flex items-end justify-center gap-1.5 h-full">
                        {/* Signups Bar */}
                        <div
                          style={{ height: `${t.pct * 0.85}%` }}
                          className="w-1/2 max-w-[28px] bg-sand rounded-t-lg transition-all group-hover:opacity-80"
                          title={`Signups: ${t.signups}`}
                        />
                        {/* Journeys Bar */}
                        <div
                          style={{ height: `${t.pct}%` }}
                          className="w-1/2 max-w-[28px] bg-teal rounded-t-lg transition-all group-hover:bg-[#004f52]"
                          title={`Journeys: ${t.journeys}`}
                        />
                      </div>
                      <span className="text-xs font-mono text-ink-muted">{t.month}</span>
                    </div>
                  ))}
                </div>

                {/* Chart Legend */}
                <div className="flex items-center justify-center gap-6 pt-4 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-sand" />
                    <span className="text-ink-secondary">New Signups</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-teal" />
                    <span className="text-ink-secondary">Journeys Built</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MANAGE USERS */}
          {(activeTab === 'Overview' || activeTab === 'Manage Users') && (
            <div className="bg-white rounded-4xl p-6 sm:p-8 border border-black/5 shadow-soft space-y-4">
              <div className="flex items-center justify-between border-b border-black/5 pb-4">
                <div>
                  <Eyebrow color="text-teal">DIRECTORY</Eyebrow>
                  <h3 className="font-display text-xl font-bold text-ink">Manage Travelers</h3>
                </div>
                <span className="text-xs font-mono text-ink-muted">Showing 5 of 1,428</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-black/5 text-ink-muted font-mono uppercase">
                      <th className="pb-3 font-semibold">Traveler</th>
                      <th className="pb-3 font-semibold">Tier</th>
                      <th className="pb-3 font-semibold">Journeys</th>
                      <th className="pb-3 font-semibold">Joined</th>
                      <th className="pb-3 font-semibold text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/5">
                    {mockUsers.map((u) => (
                      <tr key={u.id} className="hover:bg-[#fcf9f3] transition-colors">
                        <td className="py-3 font-medium text-ink">
                          <div>{u.name}</div>
                          <div className="text-[10px] text-ink-muted font-mono">{u.email}</div>
                        </td>
                        <td className="py-3">
                          <span className="px-2 py-0.5 rounded-full bg-[#fcf9f3] border border-black/5 text-[10px] font-mono">
                            {u.role}
                          </span>
                        </td>
                        <td className="py-3 font-bold">{u.trips}</td>
                        <td className="py-3 text-ink-muted">{u.joined}</td>
                        <td className="py-3 text-right">
                          <button className="text-teal font-semibold hover:underline">
                            Inspect
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: POPULAR CITIES */}
          {(activeTab === 'Popular Cities' || activeTab === 'Overview') && (
            <div className="bg-white rounded-4xl p-6 sm:p-8 border border-black/5 shadow-soft space-y-4">
              <div className="flex items-center justify-between border-b border-black/5 pb-4">
                <div>
                  <Eyebrow color="text-teal">GEO TELEMETRY</Eyebrow>
                  <h3 className="font-display text-xl font-bold text-ink">Top Visited Cities</h3>
                </div>
              </div>

              <div className="space-y-3">
                {popularCities.map((city) => (
                  <div
                    key={city.rank}
                    className="flex items-center justify-between p-4 bg-[#fcf9f3] rounded-2xl border border-black/5"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-full bg-ink text-white font-mono text-xs font-bold flex items-center justify-center">
                        {city.rank}
                      </span>
                      <div>
                        <h5 className="font-display font-bold text-sm text-ink">{city.name}</h5>
                        <span className="text-[10px] font-mono text-ink-muted">{city.country}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="font-display font-bold text-sm text-ink">
                        {city.journeysCount} journeys
                      </span>
                      <span className="text-xs font-mono font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                        {city.growth}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: POPULAR ACTIVITIES */}
          {activeTab === 'Popular Activities' && (
            <div className="bg-white rounded-4xl p-6 sm:p-8 border border-black/5 shadow-soft space-y-4">
              <div className="flex items-center justify-between border-b border-black/5 pb-4">
                <div>
                  <Eyebrow color="text-teal">EXPERIENCE ENGAGEMENT</Eyebrow>
                  <h3 className="font-display text-xl font-bold text-ink">Top Bookmarked Activities</h3>
                </div>
              </div>

              <div className="space-y-3">
                {popularActivities.map((act) => (
                  <div
                    key={act.rank}
                    className="flex items-center justify-between p-4 bg-[#fcf9f3] rounded-2xl border border-black/5"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-full bg-teal text-white font-mono text-xs font-bold flex items-center justify-center">
                        {act.rank}
                      </span>
                      <div>
                        <h5 className="font-display font-bold text-sm text-ink">{act.name}</h5>
                        <span className="text-[10px] font-mono text-ink-muted">
                          {act.city} • {act.category}
                        </span>
                      </div>
                    </div>

                    <div className="font-display font-bold text-sm text-ink">
                      {act.bookmarks} saves
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Summary of Key Metrics */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-4xl p-6 sm:p-8 border border-black/5 shadow-soft space-y-6">
            <div>
              <Eyebrow color="text-teal">SYSTEM STATUS</Eyebrow>
              <h4 className="font-display text-lg font-bold text-ink mt-0.5">Platform Summary</h4>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between py-2 border-b border-black/5">
                <span className="text-ink-muted">Uptime (30d)</span>
                <span className="font-mono font-bold text-ink">99.98%</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-black/5">
                <span className="text-ink-muted">Avg. Stops Per Journey</span>
                <span className="font-mono font-bold text-ink">3.4 Cities</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-black/5">
                <span className="text-ink-muted">Public Share Rate</span>
                <span className="font-mono font-bold text-teal">42%</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-black/5">
                <span className="text-ink-muted">Total Budget Logged</span>
                <span className="font-mono font-bold text-ink">₹84,20,000</span>
              </div>
            </div>

            {/* Quick action buttons */}
            <div className="pt-2 space-y-2">
              <button
                onClick={() => alert('Diagnostic test passed. All database connections active.')}
                className="w-full py-3 rounded-full bg-ink text-white text-xs font-bold hover:bg-black transition-all"
              >
                Run Health Diagnostics
              </button>
              <button
                onClick={() => alert('Cache cleared.')}
                className="w-full py-3 rounded-full border border-black/10 hover:bg-black/5 text-ink text-xs font-semibold transition-all"
              >
                Purge Exploration Cache
              </button>
            </div>
          </div>

          <div className="p-6 bg-ink text-white rounded-4xl shadow-float space-y-3">
            <Eyebrow color="text-[#9af1f5]">EDITORIAL DISPATCH</Eyebrow>
            <h4 className="font-display font-bold text-base text-white">Curator Mode Active</h4>
            <p className="text-xs text-white/80 leading-relaxed">
              New community submissions are automatically screened for high-resolution photography and valid chapter transitions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
