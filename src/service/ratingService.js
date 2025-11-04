import ratingApi from '../api/ratingApi';

const ratingService = {
  // Tạo đánh giá mới
  createRating: async (bookingId, score, comment) => {
    try {
      const payload = {
        bookingId,
        score,
        comment: comment.trim()
      };
      const response = await ratingApi.createRating(payload);
      return response.data;
    } catch (error) {
      console.error('Error creating rating:', error);
      throw error;
    }
  },

  // Lấy đánh giá theo booking
  getRatingByBooking: async (bookingId) => {
    try {
      const response = await ratingApi.getRatingByBooking(bookingId);
      return response.data;
    } catch (error) {
      console.error('Error getting rating by booking:', error);
      throw error;
    }
  },

  // Lấy danh sách đánh giá
  getRatings: async (params = {}) => {
    try {
      const response = await ratingApi.getRatings(params);
      return response.data;
    } catch (error) {
      console.error('Error getting ratings:', error);
      throw error;
    }
  },

  // Lấy đánh giá của tài xế
  getDriverRatings: async (driverId, params = {}) => {
    try {
      const response = await ratingApi.getDriverRatings(driverId, params);
      return response.data;
    } catch (error) {
      console.error('Error getting driver ratings:', error);
      throw error;
    }
  },

  // Lấy điểm trung bình của tài xế
  getDriverAverageRating: async (driverId) => {
    try {
      const response = await ratingApi.getDriverAverageRating(driverId);
      return response.data;
    } catch (error) {
      console.error('Error getting driver average rating:', error);
      // Trả về null nếu không có rating
      return null;
    }
  },

  // Tính toán rating trung bình từ danh sách ratings
  calculateAverageRating: (ratings) => {
    if (!ratings || ratings.length === 0) {
      return 0;
    }
    const sum = ratings.reduce((acc, rating) => acc + (rating.score || 0), 0);
    return (sum / ratings.length).toFixed(1);
  },

  // Format rating để hiển thị
  formatRating: (rating) => {
    if (!rating) return '0.0';
    return typeof rating === 'number' ? rating.toFixed(1) : parseFloat(rating).toFixed(1);
  }
};

export default ratingService;

