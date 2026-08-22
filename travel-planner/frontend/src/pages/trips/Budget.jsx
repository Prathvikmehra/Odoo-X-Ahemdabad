import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTravel } from '../../context/TravelContext';
import { Button, Eyebrow } from '../../components/common/Button';
import { Trash2, Plus, ChevronDown, ChevronUp, Wallet, TrendingUp, AlertTriangle, Award } from 'lucide-react';

export default function Budget() {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const { getTripById, addExpense, deleteExpense } = useTravel();
  const trip = getTripById(tripId);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newExp, setNewExp] = useState({ title: '', amount: '', category: 'General', date: new Date().toISOString().split('T')[0] });

  if (!trip) {
    return (
      <div className="max-w-[1440px] mx-auto px-5 md:px-16 py-20 text-center">
        <h2 className="text-2xl font-bold">Trip not found</h2>
        <Button variant="primary" className="mt-6" onClick={() => navigate('/trips')}>Back to Trips</Button>
      </div>
    );
  }

  const expenses = trip.expenses || [];
  const spent = expenses.reduce((s, e) => s + e.amount, 0);
  const remaining = trip.totalBudget - spent;
  const days = Math.max(1, Math.ceil((new Date(trip.endDate) - new Date(trip.startDate)) / 86400000));
  const dailyAvg = Math.round(spent / days);
  const pct = Math.round((spent / (trip.totalBudget || 1)) * 100);

  // Group expenses by category
  const categories = ['Accommodation', 'Transport', 'Activities', 'Meals', 'General'];
  const catColors = { Accommodation: '#1c1c18', Transport: '#00696d', Activities: '#dbc3a8', Meals: '#46464c', General: '#76777d' };
  const byCategory = categories.map(cat => {
    const items = expenses.filter(e => e.category === cat);
    const total = items.reduce((s, e) => s + e.amount, 0);
    return { cat, items, total, pct: spent > 0 ? Math.round((total / spent) * 100) : 0 };
  }).filter(c => c.total > 0);

  // Donut chart SVG math
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  let cumulativeOffset = 0;
  const donutSegments = byCategory.map(c => {
    const segLength = (c.pct / 100) * circumference;
    const offset = cumulativeOffset;
    cumulativeOffset += segLength;
    return { ...c, segLength, offset };
  });

  // Insights
  const biggestExpense = expenses.length > 0 ? expenses.reduce((a, b) => a.amount > b.amount ? a : b) : null;
  const topCategory = byCategory.length > 0 ? byCategory.reduce((a, b) => a.total > b.total ? a : b) : null;
  const healthStatus = pct < 80 ? 'On Track' : pct < 100 ? 'Nearing Limit' : 'Over Budget';
  const healthColor = pct < 80 ? 'text-[#00696d] bg-[#e0fbfb]' : pct < 100 ? 'text-[#261908] bg-[#dbc3a8]/30' : 'text-red-600 bg-red-50';

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!newExp.title || !newExp.amount) return;
    addExpense(tripId, newExp);
    setNewExp({ title: '', amount: '', category: 'General', date: new Date().toISOString().split('T')[0] });
    setShowAddForm(false);
  };

  return (
    <div className="max-w-[1440px] mx-auto px-5 md:px-16 py-10">
      {/* Header */}
      <div className="mb-10">
        <Eyebrow color="text-[#00696d]" className="mb-2">Trip Budget</Eyebrow>
        <h1 className="display-headline text-3xl md:text-4xl font-bold text-[#1c1c18]">{trip.title}</h1>
      </div>

      {/* Big Cost Display */}
      <div className="bg-white rounded-[36px] border border-[#e6e3dc] p-8 md:p-12 mb-8 text-center">
        <Eyebrow className="mb-3">What Will This Journey Cost?</Eyebrow>
        <h2 className="display-headline text-5xl md:text-7xl font-bold text-[#1c1c18]">
          ₹{trip.totalBudget?.toLocaleString('en-IN')}
        </h2>

        {/* Progress Bar */}
        <div className="max-w-md mx-auto mt-6">
          <div className="flex items-center justify-between text-xs text-[#76777d] mb-2">
            <span>₹{spent.toLocaleString('en-IN')} spent</span>
            <span>{pct}%</span>
          </div>
          <div className="w-full h-3 bg-[#e6e3dc] rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700 ${pct > 100 ? 'bg-red-500' : pct > 80 ? 'bg-[#dbc3a8]' : 'bg-[#00696d]'}`}
              style={{ width: `${Math.min(100, pct)}%` }}
            />
          </div>
        </div>

        {/* Stat Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
          <span className="px-4 py-2 bg-[#f6f2e9] rounded-full text-xs font-medium text-[#1c1c18]">Spent: ₹{spent.toLocaleString('en-IN')}</span>
          <span className="px-4 py-2 bg-[#e0fbfb] rounded-full text-xs font-medium text-[#00696d]">Remaining: ₹{remaining.toLocaleString('en-IN')}</span>
          <span className="px-4 py-2 bg-[#f6f2e9] rounded-full text-xs font-medium text-[#1c1c18]">Daily Avg: ₹{dailyAvg.toLocaleString('en-IN')}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Donut Chart */}
        <div className="bg-white rounded-3xl border border-[#e6e3dc] p-8">
          <Eyebrow className="mb-6">Cost Breakdown</Eyebrow>
          <div className="flex flex-col items-center">
            <svg width="200" height="200" viewBox="0 0 200 200">
              {donutSegments.map((seg, i) => (
                <circle
                  key={seg.cat}
                  cx="100"
                  cy="100"
                  r={radius}
                  fill="none"
                  stroke={catColors[seg.cat]}
                  strokeWidth="24"
                  strokeDasharray={`${seg.segLength} ${circumference - seg.segLength}`}
                  strokeDashoffset={-seg.offset}
                  strokeLinecap="round"
                  transform="rotate(-90 100 100)"
                  className="transition-all duration-700"
                />
              ))}
              <text x="100" y="95" textAnchor="middle" className="fill-[#1c1c18] text-lg font-bold" style={{ fontSize: '18px', fontWeight: 700 }}>
                ₹{spent.toLocaleString('en-IN')}
              </text>
              <text x="100" y="115" textAnchor="middle" className="fill-[#76777d]" style={{ fontSize: '11px' }}>
                Total Spent
              </text>
            </svg>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-3 mt-6 w-full">
              {byCategory.map(c => (
                <div key={c.cat} className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: catColors[c.cat] }} />
                  <div className="text-xs">
                    <span className="font-medium text-[#1c1c18]">{c.cat}</span>
                    <span className="text-[#76777d] ml-1">₹{c.total.toLocaleString('en-IN')} ({c.pct}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Expense List */}
        <div className="bg-white rounded-3xl border border-[#e6e3dc] p-6">
          <div className="flex items-center justify-between mb-4">
            <Eyebrow>Expense Ledger</Eyebrow>
            <Button variant="tealLight" size="sm" icon={showAddForm ? ChevronUp : Plus} onClick={() => setShowAddForm(!showAddForm)}>
              {showAddForm ? 'Close' : 'Log Expense'}
            </Button>
          </div>

          {/* Add Expense Form */}
          {showAddForm && (
            <form onSubmit={handleAddExpense} className="bg-[#fcf9f3] rounded-2xl p-4 mb-4 space-y-3">
              <input
                type="text"
                value={newExp.title}
                onChange={(e) => setNewExp({ ...newExp, title: e.target.value })}
                placeholder="Expense title"
                className="w-full px-4 py-2 bg-white border border-[#e6e3dc] rounded-full text-sm focus:outline-none focus:border-[#1c1c18]"
                required
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  value={newExp.amount}
                  onChange={(e) => setNewExp({ ...newExp, amount: e.target.value })}
                  placeholder="Amount (₹)"
                  className="px-4 py-2 bg-white border border-[#e6e3dc] rounded-full text-sm focus:outline-none focus:border-[#1c1c18]"
                  required
                />
                <select
                  value={newExp.category}
                  onChange={(e) => setNewExp({ ...newExp, category: e.target.value })}
                  className="px-4 py-2 bg-white border border-[#e6e3dc] rounded-full text-sm focus:outline-none focus:border-[#1c1c18] cursor-pointer"
                >
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <input
                type="date"
                value={newExp.date}
                onChange={(e) => setNewExp({ ...newExp, date: e.target.value })}
                className="w-full px-4 py-2 bg-white border border-[#e6e3dc] rounded-full text-sm focus:outline-none focus:border-[#1c1c18]"
              />
              <Button type="submit" variant="primary" size="sm" className="w-full justify-center">Log Expense</Button>
            </form>
          )}

          {/* Expense Rows */}
          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {expenses.length === 0 ? (
              <p className="text-sm text-[#76777d] text-center py-8">No expenses logged yet.</p>
            ) : expenses.map(exp => (
              <div key={exp.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#fcf9f3] transition-colors group">
                <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: catColors[exp.category] || '#76777d' }} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#1c1c18] truncate">{exp.title}</p>
                  <p className="text-[10px] text-[#76777d]">{exp.category} · {exp.date} · {exp.paidBy}</p>
                </div>
                <span className="text-sm font-semibold text-[#1c1c18] flex-shrink-0">₹{exp.amount.toLocaleString('en-IN')}</span>
                <button
                  onClick={() => deleteExpense(tripId, exp.id)}
                  className="p-1.5 rounded-full hover:bg-red-50 text-[#c6c6cc] hover:text-red-600 opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Insight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
        <div className="bg-white rounded-2xl border border-[#e6e3dc] p-6">
          <Award className="w-5 h-5 text-[#dbc3a8] mb-2" />
          <Eyebrow className="mb-1">Biggest Expense</Eyebrow>
          <p className="text-sm font-semibold text-[#1c1c18]">{biggestExpense?.title || 'N/A'}</p>
          <p className="text-lg font-bold text-[#1c1c18] mt-1">{biggestExpense ? `₹${biggestExpense.amount.toLocaleString('en-IN')}` : '–'}</p>
        </div>
        <div className="bg-white rounded-2xl border border-[#e6e3dc] p-6">
          <TrendingUp className="w-5 h-5 text-[#00696d] mb-2" />
          <Eyebrow className="mb-1">Top Category</Eyebrow>
          <p className="text-sm font-semibold text-[#1c1c18]">{topCategory?.cat || 'N/A'}</p>
          <p className="text-lg font-bold text-[#1c1c18] mt-1">{topCategory ? `₹${topCategory.total.toLocaleString('en-IN')} (${topCategory.pct}%)` : '–'}</p>
        </div>
        <div className="bg-white rounded-2xl border border-[#e6e3dc] p-6">
          <AlertTriangle className="w-5 h-5 text-[#46464c] mb-2" />
          <Eyebrow className="mb-1">Budget Health</Eyebrow>
          <span className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-semibold ${healthColor}`}>{healthStatus}</span>
          <p className="text-lg font-bold text-[#1c1c18] mt-1">{pct}% used</p>
        </div>
      </div>
    </div>
  );
}
