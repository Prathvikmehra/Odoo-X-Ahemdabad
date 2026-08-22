import { Routes, Route } from 'react-router-dom';
import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';
import Dashboard from '../pages/dashboard/Dashboard';
import CreateTrip from '../pages/trips/CreateTrip';
import TripDetails from '../pages/trips/TripDetails';
import Itinerary from '../pages/trips/Itinerary';
import Budget from '../pages/trips/Budget';
import SharedTrip from '../pages/public/SharedTrip';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/trips/new" element={<CreateTrip />} />
      <Route path="/trips/:tripId" element={<TripDetails />} />
      <Route path="/trips/:tripId/itinerary" element={<Itinerary />} />
      <Route path="/trips/:tripId/budget" element={<Budget />} />
      <Route path="/shared/:token" element={<SharedTrip />} />
    </Routes>
  );
}
