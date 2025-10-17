import axiosClient from './axiosClient';

const userApi = {
  // === USER APIs ===
  
  // Lấy thông tin user hiện tại
  getCurrentUser: async () => {
    const response = await axiosClient.get('/users/me');
    return response;
  },

  // Lấy thông tin user theo ID
  getUserById: async (userId) => {
    const response = await axiosClient.get(`/users/${userId}`);
    return response;
  },

  // Cập nhật thông tin user
  updateUser: async (userId, payload) => {
    // payload: { fullName, phone, address }
    const response = await axiosClient.put(`/users/${userId}`, payload);
    return response;
  },

  // Đổi mật khẩu
  changePassword: async (payload) => {
    // payload: { currentPassword, newPassword, confirmPassword }
    const response = await axiosClient.post('/users/change-password', payload);
    return response;
  },

  // Upload avatar
  uploadAvatar: async (file) => {
    const formData = new FormData();
    formData.append('avatar', file);
    const response = await axiosClient.post('/users/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  },

  // Xóa user (admin)
  deleteUser: async (userId) => {
    const response = await axiosClient.delete(`/users/${userId}`);
    return response;
  },

  // === USER MANAGEMENT (Admin) ===
  
  // Lấy danh sách users
  getUsers: async (params) => {
    // params: { role, search, page, limit }
    const response = await axiosClient.get('/users', { params });
    return response;
  },

  // Tạo user mới (admin)
  createUser: async (payload) => {
    // payload: { fullName, email, phone, password, role }
    const response = await axiosClient.post('/users', payload);
    return response;
  },

  // Cập nhật role user (admin)
  updateUserRole: async (userId, roleId) => {
    const response = await axiosClient.patch(`/users/${userId}/role`, { roleId });
    return response;
  },

  // Khóa/Mở khóa user (admin)
  toggleUserStatus: async (userId, payload) => {
    // payload: { isActive: true|false }
    const response = await axiosClient.patch(`/users/${userId}/status`, payload);
    return response;
  },

  // === ROLE APIs ===
  
  // Lấy danh sách roles
  getRoles: async () => {
    const response = await axiosClient.get('/roles');
    return response;
  },

  // Tạo role mới (admin)
  createRole: async (payload) => {
    // payload: { roleName, permissions }
    const response = await axiosClient.post('/roles', payload);
    return response;
  },

  // Cập nhật role (admin)
  updateRole: async (roleId, payload) => {
    const response = await axiosClient.put(`/roles/${roleId}`, payload);
    return response;
  },

  // Xóa role (admin)
  deleteRole: async (roleId) => {
    const response = await axiosClient.delete(`/roles/${roleId}`);
    return response;
  },

  // Gán role cho user
  assignRoleToUser: async (payload) => {
    // payload: { userId, roleId }
    const response = await axiosClient.post('/user-roles', payload);
    return response;
  },

  // Xóa role của user
  removeRoleFromUser: async (userRoleId) => {
    const response = await axiosClient.delete(`/user-roles/${userRoleId}`);
    return response;
  },

  // === NOTIFICATION APIs ===
  
  // Lấy danh sách thông báo của user
  getUserNotifications: async (userId, params) => {
    // params: { isRead, page, limit }
    const response = await axiosClient.get(`/users/${userId}/notifications`, { params });
    return response;
  },

  // Đánh dấu đã đọc thông báo
  markNotificationAsRead: async (notificationId) => {
    const response = await axiosClient.patch(`/notifications/${notificationId}/read`);
    return response;
  },

  // Đánh dấu tất cả đã đọc
  markAllNotificationsAsRead: async (userId) => {
    const response = await axiosClient.patch(`/users/${userId}/notifications/read-all`);
    return response;
  },

  // Xóa thông báo
  deleteNotification: async (notificationId) => {
    const response = await axiosClient.delete(`/notifications/${notificationId}`);
    return response;
  },

  // Tạo thông báo mới (admin/system)
  createNotification: async (payload) => {
    // payload: { userId, title, message, type }
    const response = await axiosClient.post('/notifications', payload);
    return response;
  }
};

export default userApi;