import React, { useState } from "react";

const mockPromos = [
  { 
    id: 1, 
    code: "SALE50", 
    title: "Giảm 50%",
    type: "Percent", 
    value: 50, 
    minOrder: 100000,
    maxDiscount: 50000,
    expiryDate: "31/12/2025",
    active: true 
  },
  { 
    id: 2, 
    code: "GIAM300K", 
    title: "Giảm 300K",
    type: "Amount", 
    value: 300000,
    minOrder: 500000,
    maxDiscount: 300000,
    expiryDate: "15/11/2025",
    active: false 
  },
  { 
    id: 3, 
    code: "WELCOME20", 
    title: "Chào mừng thành viên mới",
    type: "Percent", 
    value: 20,
    minOrder: 50000,
    maxDiscount: 30000,
    expiryDate: "11/11/2025",
    active: true 
  },
];

const PromotionsPage = () => {
  const [q, setQ] = useState("");
  const [promos, setPromos] = useState(mockPromos);
  const [showModal, setShowModal] = useState(false);
  const [editingPromo, setEditingPromo] = useState(null);
  const [formData, setFormData] = useState({
    code: "",
    title: "",
    type: "Percent",
    value: "",
    minOrder: "",
    maxDiscount: "",
    expiryDate: "",
    active: true
  });
  const [formErrors, setFormErrors] = useState({});

  const filtered = promos.filter(p => 
    p.code.toLowerCase().includes(q.toLowerCase()) ||
    p.title.toLowerCase().includes(q.toLowerCase())
  );

  const handleOpenAddModal = () => {
    setEditingPromo(null);
    setFormData({
      code: "",
      title: "",
      type: "Percent",
      value: "",
      minOrder: "",
      maxDiscount: "",
      expiryDate: "",
      active: true
    });
    setFormErrors({});
    setShowModal(true);
  };

  const handleOpenEditModal = (promo) => {
    setEditingPromo(promo);
    setFormData({
      code: promo.code,
      title: promo.title,
      type: promo.type,
      value: promo.value,
      minOrder: promo.minOrder,
      maxDiscount: promo.maxDiscount,
      expiryDate: promo.expiryDate,
      active: promo.active
    });
    setFormErrors({});
    setShowModal(true);
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.code.trim()) {
      errors.code = "Vui lòng nhập mã khuyến mãi";
    } else if (formData.code.length < 3) {
      errors.code = "Mã phải có ít nhất 3 ký tự";
    }
    
    if (!formData.title.trim()) {
      errors.title = "Vui lòng nhập tiêu đề";
    }
    
    if (!formData.value || formData.value <= 0) {
      errors.value = "Giá trị phải lớn hơn 0";
    }

    if (formData.type === "Percent" && formData.value > 100) {
      errors.value = "Giảm giá % không được vượt quá 100";
    }
    
    if (!formData.minOrder || formData.minOrder < 0) {
      errors.minOrder = "Đơn hàng tối thiểu không hợp lệ";
    }
    
    if (!formData.maxDiscount || formData.maxDiscount <= 0) {
      errors.maxDiscount = "Giảm tối đa phải lớn hơn 0";
    }
    
    if (!formData.expiryDate) {
      errors.expiryDate = "Vui lòng chọn ngày hết hạn";
    }
    
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    if (editingPromo) {
      // Update existing promo
      setPromos(promos.map(p => 
        p.id === editingPromo.id 
          ? { ...p, ...formData }
          : p
      ));
      alert(`Đã cập nhật mã ${formData.code}`);
    } else {
      // Add new promo
      const newPromo = {
        id: Math.max(...promos.map(p => p.id), 0) + 1,
        ...formData,
        value: Number(formData.value),
        minOrder: Number(formData.minOrder),
        maxDiscount: Number(formData.maxDiscount)
      };
      setPromos([...promos, newPromo]);
      alert(`Đã thêm mã ${formData.code}`);
    }
    
    setShowModal(false);
  };

  const handleDelete = (promo) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa mã "${promo.code}"?\n\nHành động này không thể hoàn tác!`)) {
      setPromos(promos.filter(p => p.id !== promo.id));
      alert(`Đã xóa mã ${promo.code}`);
    }
  };

  const handleToggleActive = (promo) => {
    setPromos(promos.map(p => 
      p.id === promo.id 
        ? { ...p, active: !p.active }
        : p
    ));
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-green-800 mb-2">Quản lý khuyến mãi</h1>
        <p className="text-gray-600">Tạo và quản lý các mã giảm giá cho khách hàng</p>
      </div>

      {/* Search & Add */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <input 
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Tìm theo mã hoặc tên khuyến mãi..." 
                value={q} 
                onChange={e => setQ(e.target.value)} 
              />
              <svg className="absolute left-3 top-3 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          
          <button 
            onClick={handleOpenAddModal}
            className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Tạo mã mới
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-green-500">
          <div className="text-sm text-gray-600 mb-1">Tổng mã khuyến mãi</div>
          <div className="text-2xl font-bold text-gray-800">{promos.length}</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-blue-500">
          <div className="text-sm text-gray-600 mb-1">Đang kích hoạt</div>
          <div className="text-2xl font-bold text-gray-800">{promos.filter(p => p.active).length}</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-red-500">
          <div className="text-sm text-gray-600 mb-1">Tạm dừng</div>
          <div className="text-2xl font-bold text-gray-800">{promos.filter(p => !p.active).length}</div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-green-50 border-b border-green-100">
                <th className="px-6 py-4 text-left text-xs font-semibold text-green-800 uppercase">Mã khuyến mãi</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-green-800 uppercase">Loại</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-green-800 uppercase">Giá trị</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-green-800 uppercase">Điều kiện</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-green-800 uppercase">Hết hạn</th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-green-800 uppercase">Trạng thái</th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-green-800 uppercase">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filtered.length > 0 ? (
                filtered.map((p, idx) => (
                  <tr key={p.id} className={`${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-green-50 transition-colors`}>
                    <td className="px-6 py-4">
                      <div className="font-mono font-bold text-green-700">{p.code}</div>
                      <div className="text-xs text-gray-500">{p.title}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        p.type === 'Percent' ? 'bg-purple-100 text-purple-700' : 'bg-orange-100 text-orange-700'
                      }`}>
                        {p.type === 'Percent' ? 'Phần trăm' : 'Số tiền'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-900">
                        {p.type === 'Percent' ? `${p.value}%` : `${p.value.toLocaleString()}đ`}
                      </div>
                      <div className="text-xs text-gray-500">Tối đa: {p.maxDiscount.toLocaleString()}đ</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-700">Đơn tối thiểu</div>
                      <div className="font-semibold text-gray-900">{p.minOrder.toLocaleString()}đ</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{p.expiryDate}</div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleToggleActive(p)}
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          p.active 
                            ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                        } transition-colors`}
                      >
                        {p.active ? 'Kích hoạt' : 'Tạm dừng'}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button 
                          onClick={() => handleOpenEditModal(p)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Sửa"
                        >
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        
                        <button 
                          onClick={() => handleDelete(p)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Xóa"
                        >
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                    Không tìm thấy mã khuyến mãi nào
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">
                {editingPromo ? 'Chỉnh sửa mã khuyến mãi' : 'Tạo mã khuyến mãi mới'}
              </h3>
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Mã khuyến mãi <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${formErrors.code ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="VD: SALE50"
                    value={formData.code}
                    onChange={e => setFormData({...formData, code: e.target.value.toUpperCase()})}
                  />
                  {formErrors.code && <p className="text-red-500 text-xs mt-1">{formErrors.code}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tiêu đề <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${formErrors.title ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="VD: Giảm 50%"
                    value={formData.title}
                    onChange={e => setFormData({...formData, title: e.target.value})}
                  />
                  {formErrors.title && <p className="text-red-500 text-xs mt-1">{formErrors.title}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Loại giảm giá <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={formData.type}
                    onChange={e => setFormData({...formData, type: e.target.value})}
                  >
                    <option value="Percent">Phần trăm (%)</option>
                    <option value="Amount">Số tiền (đ)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Giá trị {formData.type === 'Percent' ? '(%)' : '(đ)'} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${formErrors.value ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder={formData.type === 'Percent' ? 'VD: 50' : 'VD: 100000'}
                    value={formData.value}
                    onChange={e => setFormData({...formData, value: e.target.value})}
                  />
                  {formErrors.value && <p className="text-red-500 text-xs mt-1">{formErrors.value}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Đơn hàng tối thiểu (đ) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${formErrors.minOrder ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="VD: 100000"
                    value={formData.minOrder}
                    onChange={e => setFormData({...formData, minOrder: e.target.value})}
                  />
                  {formErrors.minOrder && <p className="text-red-500 text-xs mt-1">{formErrors.minOrder}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Giảm tối đa (đ) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${formErrors.maxDiscount ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="VD: 50000"
                    value={formData.maxDiscount}
                    onChange={e => setFormData({...formData, maxDiscount: e.target.value})}
                  />
                  {formErrors.maxDiscount && <p className="text-red-500 text-xs mt-1">{formErrors.maxDiscount}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Ngày hết hạn <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${formErrors.expiryDate ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="dd/mm/yyyy"
                    value={formData.expiryDate}
                    onChange={e => setFormData({...formData, expiryDate: e.target.value})}
                  />
                  {formErrors.expiryDate && <p className="text-red-500 text-xs mt-1">{formErrors.expiryDate}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Trạng thái
                  </label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={formData.active}
                    onChange={e => setFormData({...formData, active: e.target.value === 'true'})}
                  >
                    <option value="true">Kích hoạt</option>
                    <option value="false">Tạm dừng</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
                >
                  {editingPromo ? 'Cập nhật' : 'Tạo mã'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromotionsPage;