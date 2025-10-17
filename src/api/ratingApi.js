import axiosClient from './axiosClient';

const ratingApi = {
  // === RATING APIs ===
  
  // Tạo đánh giá mới
  createRating: async (payload) => {
    // payload: { bookingId, score: 1-5, comment }
    const response = await axiosClient.post('/ratings', payload);
    return response;
  },

  // Lấy đánh giá theo booking
  getRatingByBooking: async (bookingId) => {
    const response = await axiosClient.get(`/bookings/${bookingId}/rating`);
    return response;
  },

  // Lấy danh sách đánh giá
  getRatings: async (params) => {
    // params: { tripId, driverId, minScore, maxScore }
    const response = await axiosClient.get('/ratings', { params });
    return response;
  },

  // Lấy đánh giá của tài xế
  getDriverRatings: async (driverId, params) => {
    const response = await axiosClient.get(`/drivers/${driverId}/ratings`, { params });
    return response;
  },

  // Lấy điểm trung bình của tài xế
  getDriverAverageRating: async (driverId) => {
    const response = await axiosClient.get(`/drivers/${driverId}/rating-average`);
    return response;
  },

  // Cập nhật đánh giá
  updateRating: async (ratingId, payload) => {
    const response = await axiosClient.put(`/ratings/${ratingId}`, payload);
    return response;
  },

  // Xóa đánh giá
  deleteRating: async (ratingId) => {
    const response = await axiosClient.delete(`/ratings/${ratingId}`);
    return response;
  },

  // === FEEDBACK / COMPLAINT APIs ===
  
  // Tạo phản hồi/khiếu nại
  createFeedback: async (payload) => {
    // payload: { userId, tripId, content, type: 'Feedback'|'Complaint' }
    const response = await axiosClient.post('/feedbacks', payload);
    return response;
  },

  // Lấy danh sách feedback
  getFeedbacks: async (params) => {
    // params: { userId, tripId, status: 'Open'|'In Progress'|'Resolved', type }
    const response = await axiosClient.get('/feedbacks', { params });
    return response;
  },

  // Lấy chi tiết feedback
  getFeedbackById: async (feedbackId) => {
    const response = await axiosClient.get(`/feedbacks/${feedbackId}`);
    return response;
  },

  // Cập nhật trạng thái feedback (admin)
  updateFeedbackStatus: async (feedbackId, payload) => {
    // payload: { status: 'In Progress'|'Resolved', note }
    const response = await axiosClient.patch(`/feedbacks/${feedbackId}/status`, payload);
    return response;
  },

  // Xóa feedback
  deleteFeedback: async (feedbackId) => {
    const response = await axiosClient.delete(`/feedbacks/${feedbackId}`);
    return response;
  },

  // === SUPPORT TICKET APIs ===
  
  // Tạo ticket hỗ trợ
  createSupportTicket: async (payload) => {
    // payload: { userId, subject, description, priority: 'Low'|'Medium'|'High' }
    const response = await axiosClient.post('/support-tickets', payload);
    return response;
  },

  // Lấy danh sách ticket
  getSupportTickets: async (params) => {
    // params: { userId, status: 'Open'|'Assigned'|'Closed', priority }
    const response = await axiosClient.get('/support-tickets', { params });
    return response;
  },

  // Lấy chi tiết ticket
  getSupportTicketById: async (ticketId) => {
    const response = await axiosClient.get(`/support-tickets/${ticketId}`);
    return response;
  },

  // Cập nhật trạng thái ticket (admin)
  updateSupportTicketStatus: async (ticketId, payload) => {
    // payload: { status, assignedTo, note }
    const response = await axiosClient.patch(`/support-tickets/${ticketId}/status`, payload);
    return response;
  },

  // Gán ticket cho admin (admin)
  assignSupportTicket: async (ticketId, adminId) => {
    const response = await axiosClient.patch(`/support-tickets/${ticketId}/assign`, { assignedTo: adminId });
    return response;
  },

  // Thêm comment vào ticket
  addTicketComment: async (ticketId, payload) => {
    // payload: { userId, comment }
    const response = await axiosClient.post(`/support-tickets/${ticketId}/comments`, payload);
    return response;
  },

  // Đóng ticket
  closeSupportTicket: async (ticketId, payload) => {
    // payload: { note }
    const response = await axiosClient.post(`/support-tickets/${ticketId}/close`, payload);
    return response;
  }
};

export default ratingApi;