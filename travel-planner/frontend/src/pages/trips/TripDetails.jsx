import React from 'react';
import { useParams, Navigate } from 'react-router-dom';

export default function TripDetails() {
  const { tripId } = useParams();
  return <Navigate to={`/trips/${tripId}/itinerary`} replace />;
}
