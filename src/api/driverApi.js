// src/api/driverApi.js
import axiosClient from './axiosClient';

const driverApi = {
  // === DRIVER APIs ===
  
  // Đăng ký làm tài xế
  registerDriver: async (payload) => {
    // payload: { licenseNumber, licenseExpiry, experienceYears }
    const response = await axiosClient.post('/drivers/register', payload);
    return response;
  },

  // Lấy thông tin tài xế
  getDriverProfile: async (driverId) => {
    const response = await axiosClient.get(`/drivers/${driverId}`);
    return response;
  },

  // Cập nhật thông tin tài xế
  updateDriverProfile: async (driverId, payload) => {
    const response = await axiosClient.put(`/drivers/${driverId}`, payload);
    return response;
  },

  // Lấy dashboard tài xế (tổng quan)
  getDriverDashboard: async (driverId) => {
    const response = await axiosClient.get(`/drivers/${driverId}/dashboard`);
    return response;
  },

  // Lấy doanh thu của tài xế
  getDriverEarnings: async (driverId, params) => {
    // params: { startDate, endDate, groupBy: 'day'|'month' }
    const response = await axiosClient.get(`/drivers/${driverId}/earnings`, { params });
    return response;
  },

  // === VEHICLE APIs ===
  
  // Đăng ký xe mới
  registerVehicle: async (payload) => {
    // payload: { companyId, typeId, plateNumber, seatCount, yearOfManufacture }
    const response = await axiosClient.post('/vehicles', payload);
    return response;
  },

  // Lấy danh sách xe
  getVehicles: async (params) => {
    // params: { companyId, typeId, status }
    const response = await axiosClient.get('/vehicles', { params });
    return response;
  },

  // Lấy chi tiết xe
  getVehicleById: async (vehicleId) => {
    const response = await axiosClient.get(`/vehicles/${vehicleId}`);
    return response;
  },

  // Cập nhật thông tin xe
  updateVehicle: async (vehicleId, payload) => {
    const response = await axiosClient.put(`/vehicles/${vehicleId}`, payload);
    return response;
  },

  // Xóa xe
  deleteVehicle: async (vehicleId) => {
    const response = await axiosClient.delete(`/vehicles/${vehicleId}`);
    return response;
  },

  // Lấy danh sách loại xe
  getVehicleTypes: async () => {
    const response = await axiosClient.get('/vehicle-types');
    return response;
  },

  // === COMPANY APIs ===
  
  // Đăng ký công ty vận tải
  registerCompany: async (payload) => {
    // payload: { name, address, phone, taxCode }
    const response = await axiosClient.post('/companies', payload);
    return response;
  },

  // Lấy danh sách công ty
  getCompanies: async (params) => {
    const response = await axiosClient.get('/companies', { params });
    return response;
  },

  // Lấy chi tiết công ty
  getCompanyById: async (companyId) => {
    const response = await axiosClient.get(`/companies/${companyId}`);
    return response;
  },

  // Cập nhật thông tin công ty
  updateCompany: async (companyId, payload) => {
    const response = await axiosClient.put(`/companies/${companyId}`, payload);
    return response;
  }
};

export default driverApi;