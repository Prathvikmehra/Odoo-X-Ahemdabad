import { api } from './api';

export const tripService = {
  async getAllTrips() {
    const response = await api.get('/trips/');
    return response.data;
  },

  async getTripById(id) {
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
    return response.data;
  },

  async shareTrip(id) {
    const response = await api.post(`/trips/${id}/share`);
    return response.data;
  },

  async getPublicTrip(token) {
    const response = await api.get(`/public/trips/${token}`);
    return response.data;
  }
};
