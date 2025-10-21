import axiosClient from './axiosClient';
import { getMockTripSeats } from './mockTripSeats';

const tripApi = {
  // Tìm kiếm chuyến đi (cho khách hàng)
  searchTrips: async (params) => {
    // params: { fromCity, toCity, date, vehicleTypeId, bookingType }
    const response = await axiosClient.get('/trips/search', { params });
    return response;
  },

  // Lấy chi tiết chuyến đi
  getTripById: async (tripId) => {
    const response = await axiosClient.get(`/trips/${tripId}`);
    return response;
  },

  // Lấy danh sách ghế còn trống của chuyến
  getAvailableSeats: async (tripId) => {
    const response = await axiosClient.get(`/trips/${tripId}/seats`);
    return response;
  },

  // Lấy danh sách ghế từ API /tripseats (yêu cầu đề)
  // Theo database schema: TripSeats table với TripID, SeatNo, IsBooked
  getTripSeats: async (tripId) => {
     try {
      const response = await axiosClient.get('/tripseats', { params: { TripID: tripId } });
      return response;
    } catch (error) {
      // Fallback to mock data if API fails
      console.log('API failed, using mock data for tripId:', tripId);
      return await getMockTripSeats(tripId);
    }
  },

  // Tạo chuyến đi mới (cho tài xế/admin)
  createTrip: async (payload) => {
    // payload: { routeId, vehicleId, driverId, startTime, endTime }
    const response = await axiosClient.post('/trips', payload);
    return response;
  },

  // Cập nhật chuyến đi
  updateTrip: async (tripId, payload) => {
    const response = await axiosClient.put(`/trips/${tripId}`, payload);
    return response;
  },

  // Cập nhật trạng thái chuyến đi (cho tài xế)
  updateTripStatus: async (tripId, status) => {
    // status: Scheduled, Ongoing, Completed, Canceled
    const response = await axiosClient.patch(`/trips/${tripId}/status`, { status });
    return response;
  },

  // Lấy danh sách chuyến của tài xế
  getDriverTrips: async (driverId, params) => {
    // params: { status, date }
    const response = await axiosClient.get(`/drivers/${driverId}/trips`, { params });
    return response;
  },

  // Lấy danh sách khách trong chuyến (cho tài xế)
  getTripPassengers: async (tripId) => {
    const response = await axiosClient.get(`/trips/${tripId}/passengers`);
    return response;
  },

  // Hủy chuyến đi
  cancelTrip: async (tripId, reason) => {
    const response = await axiosClient.post(`/trips/${tripId}/cancel`, { reason });
    return response;
  },

  // === ROUTES APIs ===
  
  // Lấy danh sách tuyến đường
  getRoutes: async (params) => {
    const response = await axiosClient.get('/routes', { params });
    return response;
  },

  // Tạo tuyến đường mới
  createRoute: async (payload) => {
    // payload: { fromCity, toCity, distanceKM }
    const response = await axiosClient.post('/routes', payload);
    return response;
  },

  // Cập nhật tuyến đường
  updateRoute: async (routeId, payload) => {
    const response = await axiosClient.put(`/routes/${routeId}`, payload);
    return response;
  },

  // Xóa tuyến đường
  deleteRoute: async (routeId) => {
    const response = await axiosClient.delete(`/routes/${routeId}`);
    return response;
  }
};

export default tripApi;