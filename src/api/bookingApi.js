import axiosClient from './axiosClient';

const bookingApi = {
  getBookings: async (params) => {
    const response = await axiosClient.get('/bookings', { params });
    return response.data;
  },

  getBookingById: async (bookingId) => {
    const response = await axiosClient.get(`/bookings/${bookingId}`);
    return response.data;
  },

  createBooking: async (payload) => {
    const response = await axiosClient.post('/bookings', payload);
    return response.data;
  },

  updateBooking: async (bookingId, payload) => {
    const response = await axiosClient.put(`/bookings/${bookingId}`, payload);
    return response.data;
  },

  deleteBooking: async (bookingId) => {
    const response = await axiosClient.delete(`/bookings/${bookingId}`);
    return response.data;
  }
};

export default bookingApi;
