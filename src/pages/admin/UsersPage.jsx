import React, { useState } from "react";

const mockUsers = [
  { id: 1, name: "Nguyễn Văn A", email: "a@gmail.com", phone: "0123456789", role: "Khách", status: "active" },
  { id: 2, name: "Trần Thị B", email: "b@gmail.com", phone: "0167890123", role: "Tài xế", status: "active" },
  { id: 3, name: "Lê Văn D", email: "d@gmail.com", phone: "0912345678", role: "Khách", status: "blocked" },
  { id: 4, name: "Phạm Thị E", email: "e@gmail.com", phone: "0923456789", role: "Tài xế", status: "active" },
  { id: 5, name: "Admin C", email: "admin@gmail.com", phone: "0981123123", role: "Admin", status: "active" },
];

const UsersPage = () => {
  const [q, setQ] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newRole, setNewRole] = useState("");
  
  // Form data cho thêm user mới
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "Khách"
  });

  const [formErrors, setFormErrors] = useState({});
  
  const filtered = mockUsers.filter(u => {
    const matchSearch = 
      u.name.toLowerCase().includes(q.toLowerCase()) ||
      u.email.toLowerCase().includes(q.toLowerCase()) ||
      u.phone.includes(q);
    
    const matchRole = selectedRole === "all" || u.role === selectedRole;
    
    return matchSearch && matchRole;
  });

  const getRoleBadgeColor = (role) => {
    switch(role) {
      case "Admin": return "bg-red-100 text-red-700";
      case "Tài xế": return "bg-blue-100 text-blue-700";
      case "Khách": return "bg-green-100 text-green-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusBadge = (status) => {
    return status === "active" 
      ? <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">Hoạt động</span>
      : <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-700">Bị khóa</span>;
  };

  const handleOpenRoleModal = (user) => {
    setSelectedUser(user);
    setNewRole(user.role);
    setShowRoleModal(true);
  };

  const handleUpdateRole = () => {
    console.log(`Cập nhật role cho user ${selectedUser.id} thành ${newRole}`);
    alert(`Đã cập nhật vai trò của ${selectedUser.name} thành ${newRole}`);
    setShowRoleModal(false);
  };

  const handleDeleteUser = (user) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa người dùng "${user.name}"?\n\nHành động này không thể hoàn tác!`)) {
      console.log(`Xóa user ${user.id}`);
      alert(`Đã xóa người dùng ${user.name}`);
    }
  };

  const handleOpenAddModal = () => {
    setNewUser({
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      role: "Khách"
    });
    setFormErrors({});
    setShowAddModal(true);
  };

  const validateForm = () => {
    const errors = {};
    
    if (!newUser.name.trim()) {
      errors.name = "Vui lòng nhập họ tên";
    }
    
    if (!newUser.email.trim()) {
      errors.email = "Vui lòng nhập email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newUser.email)) {
      errors.email = "Email không hợp lệ";
    }
    
    if (!newUser.phone.trim()) {
      errors.phone = "Vui lòng nhập số điện thoại";
    } else if (!/^(84|0[3|5|7|8|9])+([0-9]{8})$/.test(newUser.phone)) {
      errors.phone = "Số điện thoại không hợp lệ";
    }
    
    if (!newUser.password) {
      errors.password = "Vui lòng nhập mật khẩu";
    } else if (newUser.password.length < 6) {
      errors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }
    
    if (newUser.password !== newUser.confirmPassword) {
      errors.confirmPassword = "Mật khẩu xác nhận không khớp";
    }
    
    return errors;
  };

  const handleAddUser = () => {
    const errors = validateForm();
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    // TODO: Call API to add user
    console.log("Thêm user mới:", newUser);
    alert(`Đã thêm người dùng ${newUser.name} với vai trò ${newUser.role}`);
    setShowAddModal(false);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-green-800 mb-2">Quản lý người dùng</h1>
        <p className="text-gray-600">Quản lý tài khoản và phân quyền người dùng trong hệ thống</p>
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Box */}
          <div className="flex-1">
            <div className="relative">
              <input
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Tìm kiếm theo tên, email hoặc số điện thoại..."
                value={q}
                onChange={e => setQ(e.target.value)}
              />
              <svg className="absolute left-3 top-3 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Role Filter */}
          <div className="md:w-48">
            <select 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={selectedRole}
              onChange={e => setSelectedRole(e.target.value)}
            >
              <option value="all">Tất cả vai trò</option>
              <option value="Khách">Khách hàng</option>
              <option value="Tài xế">Tài xế</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          {/* Add User Button */}
          <button 
            onClick={handleOpenAddModal}
            className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors duration-200 flex items-center gap-2"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Thêm người dùng
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-green-500">
          <div className="text-sm text-gray-600 mb-1">Tổng người dùng</div>
          <div className="text-2xl font-bold text-gray-800">{mockUsers.length}</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-blue-500">
          <div className="text-sm text-gray-600 mb-1">Khách hàng</div>
          <div className="text-2xl font-bold text-gray-800">{mockUsers.filter(u => u.role === "Khách").length}</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-purple-500">
          <div className="text-sm text-gray-600 mb-1">Tài xế</div>
          <div className="text-2xl font-bold text-gray-800">{mockUsers.filter(u => u.role === "Tài xế").length}</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-red-500">
          <div className="text-sm text-gray-600 mb-1">Bị khóa</div>
          <div className="text-2xl font-bold text-gray-800">{mockUsers.filter(u => u.status === "blocked").length}</div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-green-50 border-b border-green-100">
                <th className="px-6 py-4 text-left text-xs font-semibold text-green-800 uppercase tracking-wider">
                  Người dùng
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-green-800 uppercase tracking-wider">
                  Liên hệ
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-green-800 uppercase tracking-wider">
                  Vai trò
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-green-800 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-green-800 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filtered.length > 0 ? (
                filtered.map(u => (
                  <tr key={u.id} className="hover:bg-gray-50 transition-colors duration-150">
                    {/* User Info */}
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-semibold">
                          {u.name.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-semibold text-gray-900">{u.name}</div>
                          <div className="text-xs text-gray-500">ID: {u.id}</div>
                        </div>
                      </div>
                    </td>
                    
                    {/* Contact */}
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{u.email}</div>
                      <div className="text-sm text-gray-500">{u.phone}</div>
                    </td>
                    
                    {/* Role */}
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getRoleBadgeColor(u.role)}`}>
                        {u.role}
                      </span>
                    </td>
                    
                    {/* Status */}
                    <td className="px-6 py-4">
                      {getStatusBadge(u.status)}
                    </td>
                    
                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-3">
                        {u.role !== "Admin" && (
                          <button 
                            onClick={() => handleOpenRoleModal(u)}
                            className="px-4 py-2 text-purple-600 hover:bg-purple-50 border border-purple-300 rounded-lg transition-colors duration-150 font-medium text-sm flex items-center gap-2"
                            title="Phân quyền"
                          >
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                            Phân quyền
                          </button>
                        )}
                        
                        {u.role !== "Admin" ? (
                          <button 
                            onClick={() => handleDeleteUser(u)}
                            className="px-4 py-2 text-red-600 hover:bg-red-50 border border-red-300 rounded-lg transition-colors duration-150 font-medium text-sm flex items-center gap-2"
                            title="Xóa người dùng"
                          >
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Xóa
                          </button>
                        ) : (
                          <span className="px-4 py-2 text-gray-400 text-sm italic">
                            Không thể thao tác
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-500">
                      <svg className="h-12 w-12 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                      </svg>
                      <p className="text-sm font-medium">Không tìm thấy người dùng nào</p>
                      <p className="text-xs mt-1">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filtered.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Hiển thị <span className="font-semibold text-gray-900">{filtered.length}</span> / <span className="font-semibold text-gray-900">{mockUsers.length}</span> người dùng
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-150">
                Trước
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors duration-150">
                1
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-150">
                2
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-150">
                Sau
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Thêm người dùng mới</h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form className="space-y-4">
              {/* Họ tên */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Họ và tên <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${formErrors.name ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Nguyễn Văn A"
                  value={newUser.name}
                  onChange={e => setNewUser({...newUser, name: e.target.value})}
                />
                {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${formErrors.email ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="example@email.com"
                  value={newUser.email}
                  onChange={e => setNewUser({...newUser, email: e.target.value})}
                />
                {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
              </div>

              {/* Số điện thoại */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Số điện thoại <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${formErrors.phone ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="0912345678"
                  value={newUser.phone}
                  onChange={e => setNewUser({...newUser, phone: e.target.value})}
                />
                {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
              </div>

              {/* Vai trò */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Vai trò <span className="text-red-500">*</span>
                </label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={newUser.role}
                  onChange={e => setNewUser({...newUser, role: e.target.value})}
                >
                  <option value="Khách">Khách hàng</option>
                  <option value="Tài xế">Tài xế</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>

              {/* Mật khẩu */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Mật khẩu <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${formErrors.password ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="••••••••"
                  value={newUser.password}
                  onChange={e => setNewUser({...newUser, password: e.target.value})}
                />
                {formErrors.password && <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>}
              </div>

              {/* Xác nhận mật khẩu */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Xác nhận mật khẩu <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${formErrors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="••••••••"
                  value={newUser.confirmPassword}
                  onChange={e => setNewUser({...newUser, confirmPassword: e.target.value})}
                />
                {formErrors.confirmPassword && <p className="text-red-500 text-xs mt-1">{formErrors.confirmPassword}</p>}
              </div>

              {/* Info box */}
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex gap-2">
                  <svg className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="text-xs text-blue-800">
                    Người dùng mới sẽ nhận được email thông báo với thông tin đăng nhập.
                  </div>
                </div>
              </div>
            </form>

            <div className="flex gap-3 mt-6">
              <button 
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition-colors duration-150"
              >
                Hủy
              </button>
              <button 
                onClick={handleAddUser}
                className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors duration-150"
              >
                Thêm người dùng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Role Assignment Modal */}
      {showRoleModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Phân quyền người dùng</h3>
              <button 
                onClick={() => setShowRoleModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-semibold text-lg">
                  {selectedUser.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{selectedUser.name}</div>
                  <div className="text-sm text-gray-500">{selectedUser.email}</div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="text-sm text-gray-600 mb-1">Vai trò hiện tại:</div>
                <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${getRoleBadgeColor(selectedUser.role)}`}>
                  {selectedUser.role}
                </span>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Chọn vai trò mới:
                </label>
                <select 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={newRole}
                  onChange={e => setNewRole(e.target.value)}
                >
                  <option value="Khách">Khách hàng</option>
                  <option value="Tài xế">Tài xế</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>

              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex gap-2">
                  <svg className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div className="text-xs text-yellow-800">
                    <strong>Lưu ý:</strong> Thay đổi vai trò sẽ ảnh hưởng đến quyền truy cập của người dùng trong hệ thống.
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => setShowRoleModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition-colors duration-150"
              >
                Hủy
              </button>
              <button 
                onClick={handleUpdateRole}
                className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors duration-150"
              >
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersPage;