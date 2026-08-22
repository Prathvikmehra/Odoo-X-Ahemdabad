import { api } from './api';

export const expenseService = {
  async getExpenses(tripId) {
    const response = await api.get(`/trips/${tripId}/expenses`);
    return response.data;
  },

  async createExpense(tripId, data) {
    const response = await api.post(`/trips/${tripId}/expenses`, data);
    return response.data;
  },

  async getBudget(tripId) {
    const response = await api.get(`/trips/${tripId}/budget`);
    return response.data;
  },

  async deleteExpense(expenseId) {
    const response = await api.delete(`/expenses/${expenseId}`);
    return response.data;
  }
};
