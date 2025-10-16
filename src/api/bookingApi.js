import axiosClient from './axiosClient';

const bookingApi = {
  getBookings: async (params) => {
    const response = await axiosClient.get('/bookings', { params });
    return response; // axiosClient đã trả thẳng data
  },

  getBookingById: async (bookingId) => {
    const response = await axiosClient.get(`/bookings/${bookingId}`);
    return response; // trả thẳng data
  },

  createBooking: async (payload) => {
    const response = await axiosClient.post('/bookings', payload);
    return response; // trả thẳng data
  },

  updateBooking: async (bookingId, payload) => {
    const response = await axiosClient.put(`/bookings/${bookingId}`, payload);
    return response; // trả thẳng data
  },

  deleteBooking: async (bookingId) => {
    const response = await axiosClient.delete(`/bookings/${bookingId}`);
    return response; // trả thẳng data
  }
};

export default bookingApi;
