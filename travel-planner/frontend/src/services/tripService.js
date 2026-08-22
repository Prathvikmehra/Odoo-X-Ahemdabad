import { api } from './api';

export const tripService = {
  async getTrips() {
    const response = await api.get('/trips/');
    return response.data; // Raw array List[TripOut]
  },

  async getTrip(id) {
    const response = await api.get(`/trips/${id}`);
    return response.data;
  },

  async createTrip(data) {
    const response = await api.post('/trips/', data);
    return response.data;
  },

  async updateTrip(id, data) {
    const response = await api.put(`/trips/${id}`, data);
    return response.data;
  },

  async deleteTrip(id) {
    const response = await api.delete(`/trips/${id}`);
    return response.data; // 204 No Content
  },
};
