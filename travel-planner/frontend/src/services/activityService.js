import { api } from './api';

export const activityService = {
  async getActivities(stopId) {
    const response = await api.get(`/activities/stops/${stopId}/activities`);
    return response.data;
  },

  async createActivity(stopId, data) {
    const response = await api.post(`/activities/stops/${stopId}/activities`, data);
    return response.data;
  },

  async deleteActivity(activityId) {
    const response = await api.delete(`/activities/${activityId}`);
    return response.data;
  },

  async searchActivities({ city = '', q = '' } = {}) {
    const params = new URLSearchParams();
    if (city) params.append('city', city);
    if (q) params.append('q', q);
    const response = await api.get(`/activities/search?${params.toString()}`);
    return response.data;
  },

  async getCities() {
    const response = await api.get('/cities');
    return response.data;
  }
};
