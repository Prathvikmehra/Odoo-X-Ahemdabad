import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';
import Dashboard from '../pages/dashboard/Dashboard';
import CreateTrip from '../pages/trips/CreateTrip';
import TripDetails from '../pages/trips/TripDetails';
import Itinerary from '../pages/trips/Itinerary';
import ItineraryBuilder from '../pages/trips/ItineraryBuilder';
import Budget from '../pages/trips/Budget';
import ShareTrip from '../pages/trips/ShareTrip';
import Explore from '../pages/explore/Explore';
import DestinationDetails from '../pages/explore/DestinationDetails';
import ActivityDetails from '../pages/activities/ActivityDetails';
import TripCalendar from '../pages/calendar/TripCalendar';
import Community from '../pages/community/Community';
import Account from '../pages/account/Account';
import SharedTrip from '../pages/public/SharedTrip';
import AdminDashboard from '../pages/admin/AdminDashboard';
import TripList from '../pages/trips/TripList';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      
      {/* Trips routes */}
      <Route path="/trips" element={<TripList />} />
      <Route path="/trips/new" element={<CreateTrip />} />
      <Route path="/trips/:tripId" element={<TripDetails />} />
      <Route path="/trips/:tripId/itinerary-builder" element={<ItineraryBuilder />} />
      <Route path="/trips/:tripId/itinerary" element={<Itinerary />} />
      <Route path="/trips/:tripId/budget" element={<Budget />} />
      <Route path="/trips/:tripId/share" element={<ShareTrip />} />
      
      {/* Explore & search routes */}
      <Route path="/explore" element={<Explore />} />
      <Route path="/explore/:city" element={<DestinationDetails />} />
      <Route path="/activities/:activityId" element={<ActivityDetails />} />
      
      {/* Other desk utilities */}
      <Route path="/calendar" element={<TripCalendar />} />
      <Route path="/community" element={<Community />} />
      <Route path="/profile" element={<Account />} />
      <Route path="/account" element={<Account />} />
      <Route path="/admin" element={<AdminDashboard />} />
      
      {/* Public routes */}
      <Route path="/shared/:token" element={<SharedTrip />} />

      {/* Fallback to dashboard */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
