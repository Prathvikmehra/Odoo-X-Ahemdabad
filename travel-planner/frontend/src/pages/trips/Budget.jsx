import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../../services/api';
import { tripService } from '../../services/tripService';

const EXPENSE_CATEGORIES = ['Food', 'Transport', 'Accommodation', 'Activities', 'Shopping', 'Other'];

const CATEGORY_COLORS = {
  Food: 'bg-orange-100 text-orange-700 border-orange-200',
  Transport: 'bg-blue-100 text-blue-700 border-blue-200',
  Accommodation: 'bg-purple-100 text-purple-700 border-purple-200',
  Activities: 'bg-green-100 text-green-700 border-green-200',
  Shopping: 'bg-pink-100 text-pink-700 border-pink-200',
  Other: 'bg-gray-100 text-gray-700 border-gray-200',
};

export default function Budget() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [budgetSummary, setBudgetSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);

  // Form state
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const fetchData = async () => {
    try {
      const [tripData, expensesRes, budgetRes] = await Promise.all([
        tripService.getTrip(tripId),
        api.get(`/trips/${tripId}/expenses`),
        api.get(`/trips/${tripId}/budget`),
      ]);
      setTrip(tripData);
      setExpenses(expensesRes.data);
      setBudgetSummary(budgetRes.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to load budget data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [tripId]);

  const handleAddExpense = async (e) => {
    e.preventDefault();
    setFormError('');
    const parsedAmount = parseFloat(amount);
    if (!amount || isNaN(parsedAmount) || parsedAmount <= 0) {
      setFormError('Enter a valid positive amount');
      return;
    }
    setSubmitting(true);
    try {
      await api.post(`/trips/${tripId}/expenses`, {
        amount: parsedAmount,
        category,
        description: description || null,
      });
      setAmount('');
      setCategory('Food');
      setDescription('');
      setShowForm(false);
      // Refresh both expenses and budget summary
      await fetchData();
    } catch (err) {
      setFormError(err.response?.data?.detail || 'Failed to add expense');
    } finally {
      setSubmitting(false);
    }
  };

  const formatCurrency = (val) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val || 0);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto animate-pulse space-y-4">
        <div className="bg-gray-200 h-8 rounded w-1/3"></div>
        <div className="bg-gray-200 h-32 rounded-xl"></div>
        {[1,2,3].map(i => <div key={i} className="bg-gray-200 h-16 rounded-xl"></div>)}
      </div>
    );
  }

  const categoryBreakdown = budgetSummary?.categories || {};
  const total = budgetSummary?.total || 0;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-200 pb-5">
        <div>
          <Link to={`/trips/${tripId}`} className="text-xs text-gray-500 hover:text-blue-600 transition">← {trip?.name || 'Trip Details'}</Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-1">Budget</h1>
          <p className="text-sm text-gray-500 mt-0.5">Track your trip expenses</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-md shadow-sm transition"
        >
          + Add Expense
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 text-red-700 text-sm rounded">{error}</div>
      )}

      {/* Budget Summary Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-gray-900">Total Spent</h2>
          <span className="text-2xl font-bold text-gray-900">{formatCurrency(total)}</span>
        </div>

        {Object.keys(categoryBreakdown).length > 0 ? (
          <div className="space-y-2">
            {Object.entries(categoryBreakdown).map(([cat, amt]) => {
              const pct = total > 0 ? (amt / total) * 100 : 0;
              return (
                <div key={cat}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-gray-700">{cat}</span>
                    <span className="text-gray-600">{formatCurrency(amt)} ({pct.toFixed(0)}%)</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No expenses yet. Add your first expense to start tracking.</p>
        )}
      </div>

      {/* Add Expense Form */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-sm border border-green-200 p-5">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Add Expense</h2>
          {formError && <p className="text-red-600 text-sm mb-3">{formError}</p>}
          <form onSubmit={handleAddExpense} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount (USD) <span className="text-red-500">*</span></label>
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {EXPENSE_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  placeholder="e.g. Dinner at ramen shop"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50">Cancel</button>
              <button type="submit" disabled={submitting} className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md disabled:opacity-50">
                {submitting ? 'Adding...' : 'Add Expense'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Expense List */}
      {expenses.length === 0 ? (
        <div className="bg-white rounded-xl border-2 border-dashed border-gray-300 p-10 text-center">
          <svg className="mx-auto h-10 w-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-2 text-base font-semibold text-gray-900">No expenses recorded</h3>
          <p className="text-sm text-gray-500 mt-1">Start tracking your spending by adding an expense.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-700">All Expenses ({expenses.length})</h2>
          </div>
          <div className="divide-y divide-gray-50">
            {expenses.map((exp) => (
              <div key={exp.id} className="px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium border ${CATEGORY_COLORS[exp.category] || CATEGORY_COLORS.Other}`}>
                  {exp.category}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-800 truncate">{exp.description || '—'}</p>
                </div>
                <span className="text-sm font-semibold text-gray-900 flex-shrink-0">{formatCurrency(exp.amount)}</span>
              </div>
            ))}
          </div>
          <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
            <span className="text-sm font-medium text-gray-600">Total</span>
            <span className="text-base font-bold text-gray-900">{formatCurrency(total)}</span>
          </div>
        </div>
      )}
    </div>
  );
}
