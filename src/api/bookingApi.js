import axiosClient from './axiosClient';

const BOOKING_ENDPOINTS = {
  GET_MY_BOOKINGS: '/api/bookings/my',
  GET_BOOKING_DETAIL: '/api/bookings/:id',
  CANCEL_BOOKING: '/api/bookings/:id/cancel',
  CREATE_BOOKING: '/api/bookings',
  UPDATE_BOOKING: '/api/bookings/:id'
};

const bookingApi = {
  // Lấy danh sách đặt vé của user hiện tại
  getMyBookings: async () => {
    try {
      const response = await axiosClient.get(BOOKING_ENDPOINTS.GET_MY_BOOKINGS);
      return response;
    } catch (error) {
      console.error('Error getting my bookings:', error);
      throw error;
    }
  },

  // Lấy chi tiết một đặt vé
  getBookingDetail: async (bookingId) => {
    try {
      const response = await axiosClient.get(
        BOOKING_ENDPOINTS.GET_BOOKING_DETAIL.replace(':id', bookingId)
      );
      return response;
    } catch (error) {
      console.error('Error getting booking detail:', error);
      throw error;
    }
  },

  // Hủy đặt vé
  cancelBooking: async (bookingId) => {
    try {
      const response = await axiosClient.post(
        BOOKING_ENDPOINTS.CANCEL_BOOKING.replace(':id', bookingId)
      );
      return response;
    } catch (error) {
      console.error('Error canceling booking:', error);
      throw error;
    }
  },

  // Tạo đặt vé mới
  createBooking: async (bookingData) => {
    try {
      const response = await axiosClient.post(BOOKING_ENDPOINTS.CREATE_BOOKING, bookingData);
      return response;
    } catch (error) {
      console.error('Error creating booking:', error);
      throw error;
    }
  },

  // Cập nhật đặt vé
  updateBooking: async (bookingId, updateData) => {
    try {
      const response = await axiosClient.put(
        BOOKING_ENDPOINTS.UPDATE_BOOKING.replace(':id', bookingId),
        updateData
      );
      return response;
    } catch (error) {
      console.error('Error updating booking:', error);
      throw error;
    }
  }
};

export default bookingApi;