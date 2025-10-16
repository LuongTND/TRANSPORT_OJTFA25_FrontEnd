import axiosClient from './axiosClient';

const adminApi = {
  // === DASHBOARD APIs ===
  
  // Lấy thống kê tổng quan (admin dashboard)
  getDashboardStats: async () => {
    const response = await axiosClient.get('/admin/dashboard/stats');
    return response;
  },

  // Lấy biểu đồ doanh thu
  getRevenueChart: async (params) => {
    // params: { startDate, endDate, groupBy: 'day'|'month'|'year' }
    const response = await axiosClient.get('/admin/dashboard/revenue-chart', { params });
    return response;
  },

  // Lấy biểu đồ chuyến đi
  getTripChart: async (params) => {
    // params: { startDate, endDate, groupBy }
    const response = await axiosClient.get('/admin/dashboard/trip-chart', { params });
    return response;
  },

  // Lấy hoạt động gần đây
  getRecentActivities: async (params) => {
    // params: { limit, type }
    const response = await axiosClient.get('/admin/dashboard/recent-activities', { params });
    return response;
  },

  // === REPORT APIs ===
  
  // Báo cáo doanh thu
  getRevenueReport: async (params) => {
    // params: { startDate, endDate, groupBy, companyId }
    const response = await axiosClient.get('/admin/reports/revenue', { params });
    return response;
  },

  // Báo cáo chuyến đi
  getTripReport: async (params) => {
    // params: { startDate, endDate, status, routeId, driverId }
    const response = await axiosClient.get('/admin/reports/trips', { params });
    return response;
  },

  // Báo cáo người dùng
  getUserReport: async (params) => {
    // params: { startDate, endDate, role }
    const response = await axiosClient.get('/admin/reports/users', { params });
    return response;
  },

  // Báo cáo booking
  getBookingReport: async (params) => {
    // params: { startDate, endDate, status, bookingType }
    const response = await axiosClient.get('/admin/reports/bookings', { params });
    return response;
  },

  // Báo cáo thanh toán
  getPaymentReport: async (params) => {
    // params: { startDate, endDate, method, status }
    const response = await axiosClient.get('/admin/reports/payments', { params });
    return response;
  },

  // Xuất báo cáo Excel
  exportReport: async (reportType, params) => {
    const response = await axiosClient.get(`/admin/reports/${reportType}/export`, {
      params,
      responseType: 'blob'
    });
    return response;
  },

  // === REVENUE SHARE APIs ===
  
  // Lấy danh sách chia doanh thu
  getRevenueShares: async (params) => {
    // params: { tripId, companyId, startDate, endDate }
    const response = await axiosClient.get('/admin/revenue-shares', { params });
    return response;
  },

  // Tạo chia doanh thu cho chuyến đi
  createRevenueShare: async (payload) => {
    // payload: { tripId, companyId, systemPercent, companyPercent, amountForSystem, amountForCompany }
    const response = await axiosClient.post('/admin/revenue-shares', payload);
    return response;
  },

  // Cập nhật tỷ lệ chia doanh thu
  updateRevenueShareRatio: async (payload) => {
    // payload: { systemPercent, companyPercent }
    const response = await axiosClient.put('/admin/revenue-shares/ratio', payload);
    return response;
  },

  // === SYSTEM MANAGEMENT ===
  
  // Lấy system logs
  getSystemLogs: async (params) => {
    // params: { userId, action, startDate, endDate, page, limit }
    const response = await axiosClient.get('/admin/system-logs', { params });
    return response;
  },

  // Lấy audit logs
  getAuditLogs: async (params) => {
    // params: { tableName, userId, action, startDate, endDate }
    const response = await axiosClient.get('/admin/audit-logs', { params });
    return response;
  },

  // Cấu hình hệ thống
  getSystemSettings: async () => {
    const response = await axiosClient.get('/admin/settings');
    return response;
  },

  // Cập nhật cấu hình hệ thống
  updateSystemSettings: async (payload) => {
    const response = await axiosClient.put('/admin/settings', payload);
    return response;
  },

  // === STATISTICS APIs ===
  
  // Thống kê tổng quan theo khoảng thời gian
  getStatsByDateRange: async (params) => {
    // params: { startDate, endDate }
    const response = await axiosClient.get('/admin/statistics', { params });
    return response;
  },

  // Thống kê theo tuyến đường
  getStatsByRoute: async (routeId, params) => {
    const response = await axiosClient.get(`/admin/statistics/routes/${routeId}`, { params });
    return response;
  },

  // Thống kê theo tài xế
  getStatsByDriver: async (driverId, params) => {
    const response = await axiosClient.get(`/admin/statistics/drivers/${driverId}`, { params });
    return response;
  },

  // Thống kê theo công ty
  getStatsByCompany: async (companyId, params) => {
    const response = await axiosClient.get(`/admin/statistics/companies/${companyId}`, { params });
    return response;
  },

  // Top tài xế (theo doanh thu, đánh giá)
  getTopDrivers: async (params) => {
    // params: { sortBy: 'revenue'|'rating', limit, startDate, endDate }
    const response = await axiosClient.get('/admin/statistics/top-drivers', { params });
    return response;
  },

  // Top tuyến đường phổ biến
  getTopRoutes: async (params) => {
    // params: { limit, startDate, endDate }
    const response = await axiosClient.get('/admin/statistics/top-routes', { params });
    return response;
  },

  // === APPROVAL MANAGEMENT ===
  
  // Lấy danh sách chờ duyệt
  getPendingApprovals: async (params) => {
    // params: { type: 'vehicle'|'driver'|'company', status }
    const response = await axiosClient.get('/admin/approvals/pending', { params });
    return response;
  },

  // Duyệt xe mới
  approveVehicle: async (vehicleId, payload) => {
    // payload: { status: 'Approved'|'Rejected', note }
    const response = await axiosClient.post(`/admin/vehicles/${vehicleId}/approve`, payload);
    return response;
  },

  // Duyệt tài xế mới
  approveDriver: async (driverId, payload) => {
    const response = await axiosClient.post(`/admin/drivers/${driverId}/approve`, payload);
    return response;
  },

  // Duyệt công ty vận tải
  approveCompany: async (companyId, payload) => {
    const response = await axiosClient.post(`/admin/companies/${companyId}/approve`, payload);
    return response;
  },

  // === NOTIFICATION MANAGEMENT ===
  
  // Gửi thông báo hàng loạt
  sendBulkNotification: async (payload) => {
    // payload: { userIds: [], title, message, type }
    const response = await axiosClient.post('/admin/notifications/bulk', payload);
    return response;
  },

  // Gửi thông báo theo role
  sendNotificationByRole: async (payload) => {
    // payload: { role: 'customer'|'driver'|'admin', title, message }
    const response = await axiosClient.post('/admin/notifications/by-role', payload);
    return response;
  }
};

export default adminApi;