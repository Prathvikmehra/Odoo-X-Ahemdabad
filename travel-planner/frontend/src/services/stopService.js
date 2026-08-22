import { api } from './api';

export const stopService = {
  async getStops(tripId) {
    const response = await api.get(`/stops/trips/${tripId}/stops`);
    return response.data;
  },

  async createStop(tripId, data) {
    const response = await api.post(`/stops/trips/${tripId}/stops`, data);
    return response.data;
  },

  async updateStop(stopId, data) {
    const response = await api.put(`/stops/${stopId}`, data);
    return response.data;
  },

  async deleteStop(stopId) {
    const response = await api.delete(`/stops/${stopId}`);
    return response.data;
  }
};
