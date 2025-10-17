// src/api/promotionApi.js
import axiosClient from './axiosClient';

const promotionApi = {
  // === PROMOTION APIs ===
  
  // Lấy danh sách khuyến mãi
  getPromotions: async (params) => {
    // params: { status: 'active'|'expired', userId }
    const response = await axiosClient.get('/promotions', { params });
    return response;
  },

  // Lấy chi tiết khuyến mãi
  getPromotionById: async (promotionId) => {
    const response = await axiosClient.get(`/promotions/${promotionId}`);
    return response;
  },

  // Kiểm tra mã khuyến mãi hợp lệ
  validatePromotionCode: async (code, payload) => {
    // payload: { userId, bookingAmount }
    const response = await axiosClient.post(`/promotions/validate/${code}`, payload);
    return response;
  },

  // Áp dụng mã khuyến mãi
  applyPromotion: async (payload) => {
    // payload: { promotionId, userId, bookingId }
    const response = await axiosClient.post('/promotions/apply', payload);
    return response;
  },

  // Tạo khuyến mãi mới (admin)
  createPromotion: async (payload) => {
    // payload: { code, discountType: 'Percent'|'Amount', value, expiryDate, maxUsage }
    const response = await axiosClient.post('/promotions', payload);
    return response;
  },

  // Cập nhật khuyến mãi (admin)
  updatePromotion: async (promotionId, payload) => {
    const response = await axiosClient.put(`/promotions/${promotionId}`, payload);
    return response;
  },

  // Xóa khuyến mãi (admin)
  deletePromotion: async (promotionId) => {
    const response = await axiosClient.delete(`/promotions/${promotionId}`);
    return response;
  },

  // Lấy lịch sử sử dụng khuyến mãi
  getPromotionUsage: async (params) => {
    // params: { promotionId, userId }
    const response = await axiosClient.get('/promotions/usage', { params });
    return response;
  },

  // Lấy khuyến mãi của user
  getUserPromotions: async (userId) => {
    const response = await axiosClient.get(`/users/${userId}/promotions`);
    return response;
  },

  // === PRICING RULES APIs ===
  
  // Lấy danh sách quy tắc giá
  getPricingRules: async (params) => {
    // params: { routeId, vehicleTypeId }
    const response = await axiosClient.get('/pricing-rules', { params });
    return response;
  },

  // Tính giá cho chuyến đi
  calculatePrice: async (payload) => {
    // payload: { routeId, vehicleTypeId, bookingType: 'Shared'|'Private', seatCount }
    const response = await axiosClient.post('/pricing-rules/calculate', payload);
    return response;
  },

  // Tạo quy tắc giá mới (admin)
  createPricingRule: async (payload) => {
    // payload: { routeId, vehicleTypeId, basePrice, pricePerKM }
    const response = await axiosClient.post('/pricing-rules', payload);
    return response;
  },

  // Cập nhật quy tắc giá (admin)
  updatePricingRule: async (ruleId, payload) => {
    const response = await axiosClient.put(`/pricing-rules/${ruleId}`, payload);
    return response;
  },

  // Xóa quy tắc giá (admin)
  deletePricingRule: async (ruleId) => {
    const response = await axiosClient.delete(`/pricing-rules/${ruleId}`);
    return response;
  },

  // Lấy giá theo tuyến và loại xe
  getPriceByRouteAndVehicle: async (routeId, vehicleTypeId) => {
    const response = await axiosClient.get(`/pricing-rules/route/${routeId}/vehicle-type/${vehicleTypeId}`);
    return response;
  }
};

export default promotionApi;