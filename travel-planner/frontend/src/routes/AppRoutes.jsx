import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import MainLayout from '../components/layout/MainLayout';
import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';
import Dashboard from '../pages/dashboard/Dashboard';
import CreateTrip from '../pages/trips/CreateTrip';
import TripList from '../pages/trips/TripList';
import TripDetails from '../pages/trips/TripDetails';
import ItineraryBuilder from '../pages/trips/ItineraryBuilder';
import Itinerary from '../pages/trips/Itinerary';
import Budget from '../pages/trips/Budget';
import Explore from '../pages/explore/Explore';
import TripCalendar from '../pages/calendar/TripCalendar';
import Community from '../pages/community/Community';
import SharedTrip from '../pages/public/SharedTrip';
import Profile from '../pages/profile/Profile';
import AdminDashboard from '../pages/admin/AdminDashboard';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fcf9f3]">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-ink border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs font-mono uppercase tracking-widest text-ink-muted">Loading GlobeTrotter...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Public Share Story Route */}
      <Route path="/shared/:token" element={<SharedTrip />} />

      {/* Protected Routes inside MainLayout */}
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/trips" element={<TripList />} />
        <Route path="/trips/new" element={<CreateTrip />} />
        <Route path="/trips/:tripId" element={<TripDetails />} />
        <Route path="/trips/:tripId/edit" element={<ItineraryBuilder />} />
        <Route path="/trips/:tripId/itinerary" element={<Itinerary />} />
        <Route path="/trips/:tripId/budget" element={<Budget />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/calendar" element={<TripCalendar />} />
        <Route path="/community" element={<Community />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Route>

      {/* Fallback 404 Route */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
