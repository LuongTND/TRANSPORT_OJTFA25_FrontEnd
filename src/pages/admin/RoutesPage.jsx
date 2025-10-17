import React, { useState } from "react";

const mockRoutes = [
  { id: 1001, from: "Thanh Khê", to: "Hải Châu", distance: "10 km", status: "Hoạt động"},
  { id: 1002, from: "Sơn Trà", to: "Hải Châu", distance: "7 km", status: "Hoạt động"},
  { id: 1003, from: "Cẩm Lệ", to: "Ngũ Hành Sơn", distance: "14 km", status: "Dừng"},
  { id: 1004, from: "Thanh Khê", to: "Hải Châu", distance: "8 km", status: "Hoạt động"},
  { id: 1005, from: "Sơn Trà", to: "Thanh Khê", distance: "12 km", status: "Hoạt động"},
];

const RoutesPage = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [status, setStatus] = useState("");

  const filtered = mockRoutes.filter(r =>
    (!from || r.from.toLowerCase().includes(from.toLowerCase())) && 
    (!to || r.to.toLowerCase().includes(to.toLowerCase())) &&
    (!status || r.status === status)
  );

  const handleReset = () => {
    setFrom("");
    setTo("");
    setStatus("");
  };

  const stats = {
    total: mockRoutes.length,
    active: mockRoutes.filter(r => r.status === "Hoạt động").length,
    inactive: mockRoutes.filter(r => r.status === "Dừng").length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Quản lý Tuyến Xe</h1>
          <p className="text-slate-600 text-sm">Theo dõi và quản lý các tuyến đường</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border-t-4 border-blue-500">
            <p className="text-slate-600 text-sm font-medium mb-2">Tổng Tuyến</p>
            <p className="text-3xl font-bold text-slate-900">{stats.total}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border-t-4 border-green-500">
            <p className="text-slate-600 text-sm font-medium mb-2">Hoạt Động</p>
            <p className="text-3xl font-bold text-green-700">{stats.active}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border-t-4 border-slate-400">
            <p className="text-slate-600 text-sm font-medium mb-2">Dừng</p>
            <p className="text-3xl font-bold text-slate-500">{stats.inactive}</p>
          </div>
        </div>

        {/* Filter */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h3 className="text-sm font-bold text-slate-900 mb-4">Bộ Lọc</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 mb-2 block">Điểm Đi</label>
              <input 
                type="text"
                placeholder="Nhập địa điểm đi..."
                className="input input-bordered input-sm w-full bg-white text-slate-900"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 mb-2 block">Điểm Đến</label>
              <input 
                type="text"
                placeholder="Nhập địa điểm đến..."
                className="input input-bordered input-sm w-full bg-white text-slate-900"
                value={to}
                onChange={(e) => setTo(e.target.value)}
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 mb-2 block">Trạng Thái</label>
              <select 
                className="select select-bordered select-sm w-full bg-white text-slate-900"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">Tất cả trạng thái</option>
                <option>Hoạt động</option>
                <option>Dừng</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-200">
            <button 
              onClick={handleReset}
              className="btn btn-sm btn-outline text-slate-700 border-slate-300 hover:bg-slate-100"
            >
              Xóa Bộ Lọc
            </button>
            <span className="text-sm text-slate-600">
              Kết quả: <span className="font-bold text-blue-600">{filtered.length}</span> tuyến
            </span>
            <button className="btn btn-sm btn-primary">
              Tìm Kiếm
            </button>
          </div>
        </div>

        {/* Routes Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
                <th className="py-4 px-6 text-left text-sm font-semibold text-slate-900">Tuyến Đường</th>
                <th className="py-4 px-6 text-left text-sm font-semibold text-slate-900">Khoảng Cách</th>
                <th className="py-4 px-6 text-left text-sm font-semibold text-slate-900">Trạng Thái</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r, idx) => (
                <tr 
                  key={r.id} 
                  className={`border-b border-slate-100 hover:bg-blue-50 transition ${
                    idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'
                  }`}
                >
                  <td className="py-4 px-6 font-semibold text-slate-900">{r.from} → {r.to}</td>
                  <td className="py-4 px-6 text-slate-700">{r.distance}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-block px-3 py-1.5 rounded-full text-xs font-semibold ${
                      r.status === "Hoạt động" 
                        ? "bg-green-100 text-green-700" 
                        : "bg-slate-200 text-slate-700"
                    }`}>
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-slate-500 text-lg">Không tìm thấy tuyến nào</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoutesPage;