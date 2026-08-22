import { useState } from 'react';
import { adminAnalytics } from '../../data/mockData';
import { Eyebrow } from '../../components/common/Button';
import { Users, Compass, Wallet, Share2, TrendingUp, Star } from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('cities');
  const data = adminAnalytics;

  return (
    <div className="max-w-[1440px] mx-auto px-5 md:px-16 py-10 space-y-8">
      {/* Header */}
      <div>
        <Eyebrow color="text-[#00696d]" className="mb-2">Admin Console</Eyebrow>
        <h1 className="display-headline text-3xl md:text-5xl font-bold text-[#1c1c18]">Analytics & Insights</h1>
        <p className="text-xs text-[#76777d] mt-1">{data.growthRate}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-[#e6e3dc] p-6 rounded-2xl relative shadow-2xs">
          <Users className="w-5 h-5 text-[#dbc3a8] absolute top-5 right-5" />
          <p className="text-3xl font-extrabold text-[#1c1c18]">{data.totalUsers.toLocaleString()}</p>
          <Eyebrow className="mt-1">Total Users</Eyebrow>
        </div>
        <div className="bg-white border border-[#e6e3dc] p-6 rounded-2xl relative shadow-2xs">
          <Compass className="w-5 h-5 text-[#00696d] absolute top-5 right-5" />
          <p className="text-3xl font-extrabold text-[#1c1c18]">{data.activeTrips.toLocaleString()}</p>
          <Eyebrow className="mt-1">Active Trips</Eyebrow>
        </div>
        <div className="bg-white border border-[#e6e3dc] p-6 rounded-2xl relative shadow-2xs">
          <Wallet className="w-5 h-5 text-[#dbc3a8] absolute top-5 right-5" />
          <p className="text-3xl font-extrabold text-[#1c1c18]">{data.totalBudgetManaged}</p>
          <Eyebrow className="mt-1">Budget Managed</Eyebrow>
        </div>
        <div className="bg-white border border-[#e6e3dc] p-6 rounded-2xl relative shadow-2xs">
          <Share2 className="w-5 h-5 text-[#00696d] absolute top-5 right-5" />
          <p className="text-3xl font-extrabold text-[#1c1c18]">{data.communityShares.toLocaleString()}</p>
          <Eyebrow className="mt-1">Shared Stories</Eyebrow>
        </div>
      </div>

      {/* Selector Tabs */}
      <div className="flex gap-2 border-b border-[#e6e3dc] pb-2">
        <button 
          onClick={() => setActiveTab('cities')}
          className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider border-b-2 cursor-pointer transition-colors ${activeTab === 'cities' ? 'border-[#1c1c18] text-[#1c1c18]' : 'border-transparent text-[#76777d] hover:text-[#1c1c18]'}`}
        >
          Popular Cities
        </button>
        <button 
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider border-b-2 cursor-pointer transition-colors ${activeTab === 'users' ? 'border-[#1c1c18] text-[#1c1c18]' : 'border-transparent text-[#76777d] hover:text-[#1c1c18]'}`}
        >
          Recent Registrations
        </button>
      </div>

      {/* Popular Cities Chart */}
      {activeTab === 'cities' && (
        <div className="bg-white border border-[#e6e3dc] rounded-3xl p-6 md:p-8 space-y-6">
          <Eyebrow color="text-[#00696d]">Top Destinations</Eyebrow>
          
          <div className="space-y-4">
            {data.popularCities.map((city, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span className="text-[#1c1c18] flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: city.color }} />
                    {city.name}
                  </span>
                  <span className="text-[#76777d]">{city.count} trips planned ({city.percentage}%)</span>
                </div>
                <div className="w-full h-3 bg-[#fcf9f3] rounded-full overflow-hidden border border-[#e6e3dc]/50">
                  <div 
                    className="h-full rounded-full transition-all duration-700" 
                    style={{ width: `${city.percentage}%`, backgroundColor: city.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Users Table */}
      {activeTab === 'users' && (
        <div className="bg-white border border-[#e6e3dc] rounded-3xl overflow-hidden shadow-2xs">
          <div className="p-6 border-b border-[#e6e3dc]">
            <Eyebrow color="text-[#00696d]">Recent Users Ledger</Eyebrow>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#fcf9f3] border-b border-[#e6e3dc] text-[#76777d]">
                  <th className="p-4 uppercase font-semibold tracking-wider">Name</th>
                  <th className="p-4 uppercase font-semibold tracking-wider">Location</th>
                  <th className="p-4 uppercase font-semibold tracking-wider">Trips</th>
                  <th className="p-4 uppercase font-semibold tracking-wider">Registered</th>
                  <th className="p-4 uppercase font-semibold tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.recentRegistrations.map((user, idx) => (
                  <tr key={idx} className="border-b border-[#fcf9f3] hover:bg-[#fcf9f3]/40 transition-colors">
                    <td className="p-4 font-bold text-[#1c1c18]">
                      <div>{user.name}</div>
                      <div className="text-[10px] text-[#76777d] font-normal">{user.email}</div>
                    </td>
                    <td className="p-4 text-[#46464c]">{user.city}, {user.country}</td>
                    <td className="p-4 text-[#1c1c18] font-semibold">{user.trips}</td>
                    <td className="p-4 text-[#76777d]">{user.joined}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${user.status === 'Active' ? 'bg-[#e0fbfb] text-[#00696d]' : 'bg-[#f6f2e9] text-[#76777d]'}`}>
                        {user.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
