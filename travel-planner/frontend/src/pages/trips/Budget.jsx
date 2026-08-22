import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { expenseService } from '../../services/expenseService';
import { tripService } from '../../services/tripService';
import {
  DollarSign,
  Plus,
  Trash2,
  PieChart,
  ArrowRight,
  TrendingUp,
  CreditCard,
  CheckCircle,
  Tag,
  Clock,
  Sparkles
} from 'lucide-react';
import Eyebrow from '../../components/common/Eyebrow';
import Modal from '../../components/common/Modal';

export default function Budget() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [budgetSummary, setBudgetSummary] = useState({ total: 0, categories: {} });
  const [loading, setLoading] = useState(true);

  // New Expense Modal
  const [expenseModal, setExpenseModal] = useState(false);
  const [expenseForm, setExpenseForm] = useState({
    amount: '',
    category: 'Accommodation',
    description: '',
  });

  const categoriesList = [
    'Accommodation',
    'Transport',
    'Activities',
    'Food & Dining',
    'Shopping',
    'Miscellaneous'
  ];

  const categoryColors = {
    Accommodation: '#00696d', // Teal
    Transport: '#1c1c18',    // Dark ink
    Activities: '#dbc3a8',   // Sand
    'Food & Dining': '#e07a5f', // Terracotta
    Shopping: '#3d405b',     // Slate
    Miscellaneous: '#81b29a', // Sage
  };

  useEffect(() => {
    loadBudgetData();
  }, [tripId]);

  const loadBudgetData = async () => {
    try {
      setLoading(true);
      const [tripData, expData, bData] = await Promise.all([
        tripService.getTripById(tripId),
        expenseService.getExpenses(tripId),
        expenseService.getBudget(tripId),
      ]);
      setTrip(tripData);
      setExpenses(Array.isArray(expData) ? expData : []);
      setBudgetSummary(bData || { total: 0, categories: {} });
    } catch (err) {
      console.error('Error loading budget details:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateExpense = async (e) => {
    e.preventDefault();
    try {
      await expenseService.createExpense(tripId, {
        amount: parseFloat(expenseForm.amount),
        category: expenseForm.category,
        description: expenseForm.description || '',
      });
      setExpenseModal(false);
      setExpenseForm({ amount: '', category: 'Accommodation', description: '' });
      loadBudgetData();
    } catch (err) {
      console.error('Error creating expense:', err);
    }
  };

  const handleDeleteExpense = async (id) => {
    try {
      await expenseService.deleteExpense(id);
      loadBudgetData();
    } catch (err) {
      console.error('Error deleting expense:', err);
    }
  };

  // Find biggest expense
  const biggestExpense = expenses.length > 0
    ? [...expenses].sort((a, b) => parseFloat(b.amount) - parseFloat(a.amount))[0]
    : null;

  const totalCost = budgetSummary.total || 0;
  const categoriesMap = budgetSummary.categories || {};

  // Build visual progress bars
  const categoryKeys = Object.keys(categoriesMap);
  let cumulativePercent = 0;

  const donutSlices = categoryKeys.map((cat) => {
    const amount = categoriesMap[cat] || 0;
    const percent = totalCost > 0 ? (amount / totalCost) * 100 : 0;
    const startAngle = (cumulativePercent / 100) * 360;
    cumulativePercent += percent;
    const endAngle = (cumulativePercent / 100) * 360;
    return {
      cat,
      amount,
      percent,
      color: categoryColors[cat] || '#76777d',
      startAngle,
      endAngle,
    };
  });

  if (loading) {
    return (
      <div className="py-24 text-center">
        <div className="w-8 h-8 border-2 border-ink border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-xs font-mono uppercase tracking-wider text-ink-muted">Calculating journey budget...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-black/5 pb-6">
        <div>
          <Eyebrow color="text-teal">FINANCIAL JOURNAL & LEDGER</Eyebrow>
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-ink mt-1">
            Trip Budget & Cost Breakdown
          </h1>
          <p className="text-xs sm:text-sm text-ink-secondary mt-1">
            {trip?.name || 'Journey Expenses'} — real-time category distribution & itemized log.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to={`/trips/${tripId}/itinerary`}
            className="px-4 py-2.5 rounded-full border border-black/10 hover:bg-black/5 text-xs font-semibold text-ink transition-all"
          >
            ← View Itinerary
          </Link>
          <button
            onClick={() => setExpenseModal(true)}
            className="px-5 py-2.5 rounded-full bg-ink hover:bg-black text-white text-xs font-semibold flex items-center gap-2 shadow-sm transition-all"
          >
            <Plus className="w-4 h-4 text-[#9af1f5]" />
            <span>Log Expense</span>
          </button>
        </div>
      </div>

      {/* 1. Big Display-Size Total Cost Figure at Top */}
      <div className="bg-white rounded-4xl sm:rounded-5xl p-8 sm:p-12 border border-black/5 shadow-soft relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-2 text-center md:text-left">
          <Eyebrow color="text-teal">WHAT WILL THIS JOURNEY COST?</Eyebrow>
          <div className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-ink tracking-tight-display">
            ₹{parseFloat(totalCost).toLocaleString('en-IN')}
          </div>
          <p className="text-xs sm:text-sm text-ink-secondary max-w-sm">
            Total recorded across all accommodation, transportation, dining, and activities.
          </p>
        </div>

        {/* Small Stat Pills */}
        <div className="flex flex-col sm:flex-row md:flex-col gap-3 w-full md:w-auto">
          <div className="p-4 bg-[#fcf9f3] rounded-2xl border border-black/5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-ink text-white flex items-center justify-center font-bold text-xs">
              <TrendingUp className="w-4 h-4 text-[#9af1f5]" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase text-ink-muted block">Biggest Expense</span>
              <span className="font-display font-bold text-xs sm:text-sm text-ink">
                {biggestExpense ? `${biggestExpense.description || biggestExpense.category} (₹${parseFloat(biggestExpense.amount).toLocaleString('en-IN')})` : 'None logged'}
              </span>
            </div>
          </div>

          <div className="p-4 bg-[#fcf9f3] rounded-2xl border border-black/5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-sand text-ink flex items-center justify-center font-bold text-xs">
              <Tag className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase text-ink-muted block">Items Recorded</span>
              <span className="font-display font-bold text-xs sm:text-sm text-ink">
                {expenses.length} distinct entries
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Visual Breakdown & Checklist Side-by-Side Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Progress distribution visualizer */}
        <div className="lg:col-span-5 bg-white rounded-4xl p-6 sm:p-8 border border-black/5 shadow-soft flex flex-col justify-between">
          <div>
            <Eyebrow color="text-teal">EXPENSE ALLOCATION</Eyebrow>
            <h3 className="font-display text-xl font-bold text-ink mt-1 mb-6">Category Distribution</h3>
          </div>

          {totalCost === 0 ? (
            <div className="py-12 text-center text-ink-muted text-xs">
              No expenses recorded yet. Click "Log Expense" to visualize category distribution.
            </div>
          ) : (
            <div className="space-y-6">
              <div className="h-4 rounded-full bg-black/5 flex overflow-hidden shadow-inner">
                {donutSlices.map((slice) => (
                  <div
                    key={slice.cat}
                    style={{
                      width: `${slice.percent}%`,
                      backgroundColor: slice.color,
                    }}
                    title={`${slice.cat}: ₹${slice.amount.toLocaleString('en-IN')} (${slice.percent.toFixed(1)}%)`}
                    className="h-full transition-all"
                  />
                ))}
              </div>

              {/* Category Legend list */}
              <div className="space-y-2.5">
                {donutSlices.map((slice) => (
                  <div key={slice.cat} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: slice.color }}
                      />
                      <span className="text-ink font-medium">{slice.cat}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-ink font-bold">₹{parseFloat(slice.amount).toLocaleString('en-IN')}</span>
                      <span className="text-ink-muted font-mono text-[10px]">({slice.percent.toFixed(0)}%)</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 3. Checklist-style Itemized Expenses Panel */}
        <div className="lg:col-span-7 bg-white rounded-4xl p-6 sm:p-8 border border-black/5 shadow-soft space-y-4">
          <div className="flex items-center justify-between border-b border-black/5 pb-4">
            <div>
              <Eyebrow color="text-ink-muted">ITEMIZED EXPENSES</Eyebrow>
              <h3 className="font-display text-xl font-bold text-ink">Ledger Checklist</h3>
            </div>
            <span className="text-xs font-mono font-semibold text-teal">
              {expenses.length} Records
            </span>
          </div>

          {expenses.length === 0 ? (
            <div className="py-12 text-center text-ink-muted text-xs">
              No transactions entered yet. Add flight tickets, hotel reservations, dinners, or activity passes.
            </div>
          ) : (
            <div className="space-y-2.5 max-h-[440px] overflow-y-auto pr-1">
              {expenses.map((exp) => (
                <div
                  key={exp.id}
                  className="flex items-center justify-between p-4 bg-[#fcf9f3]/80 rounded-2xl border border-black/5 hover:bg-[#fcf9f3] transition-all group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: categoryColors[exp.category] || '#76777d' }}
                    />
                    <div className="min-w-0">
                      <h5 className="font-display font-bold text-xs sm:text-sm text-ink truncate">
                        {exp.description || exp.category}
                      </h5>
                      <span className="text-[10px] font-mono uppercase text-ink-muted">
                        {exp.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <span className="font-display font-bold text-sm text-ink">
                      ₹{parseFloat(exp.amount).toLocaleString('en-IN')}
                    </span>
                    <button
                      onClick={() => handleDeleteExpense(exp.id)}
                      className="p-1.5 rounded-full hover:bg-red-50 text-ink-muted hover:text-red-600 transition-all opacity-0 group-hover:opacity-100"
                      title="Delete Entry"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Log Expense Modal */}
      <Modal
        isOpen={expenseModal}
        onClose={() => setExpenseModal(false)}
        title="Record Expense Item"
      >
        <form onSubmit={handleCreateExpense} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1 font-mono">
              Amount (₹) *
            </label>
            <input
              type="number"
              step="any"
              required
              min="0"
              value={expenseForm.amount}
              onChange={(e) => setExpenseForm({ ...expenseForm, amount: e.target.value })}
              placeholder="e.g. 4500"
              className="w-full px-4 py-3 bg-white border border-black/10 rounded-full text-xs text-ink focus:outline-none focus:ring-2 focus:ring-teal/30 font-display font-bold text-base"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1 font-mono">
              Category
            </label>
            <select
              value={expenseForm.category}
              onChange={(e) => setExpenseForm({ ...expenseForm, category: e.target.value })}
              className="w-full px-4 py-3 bg-white border border-black/10 rounded-full text-xs text-ink focus:outline-none focus:ring-2 focus:ring-teal/30"
            >
              {categoriesList.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1 font-mono">
              Description / Notes
            </label>
            <input
              type="text"
              value={expenseForm.description}
              onChange={(e) => setExpenseForm({ ...expenseForm, description: e.target.value })}
              placeholder="e.g. Shinkansen Bullet Train Tokyo to Kyoto"
              className="w-full px-4 py-3 bg-white border border-black/10 rounded-full text-xs text-ink focus:outline-none focus:ring-2 focus:ring-teal/30"
            />
          </div>

          <div className="pt-3">
            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-ink hover:bg-black text-white text-xs font-semibold tracking-wide"
            >
              Add to Journey Budget
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
