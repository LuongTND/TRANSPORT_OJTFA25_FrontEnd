import React, { useState } from "react";

const mockVehicles = [
  { id: 1, license: "51A-123.45", type: "Sedan 4 chỗ", brand: "Toyota Vios", color: "Trắng", driver: "Nguyễn Văn Tài", phone: "0905123456", status: "busy", mode: "shared", route: "Hải Châu → Sơn Trà", location: "Cầu Rồng", passengers: 3 },
  { id: 2, license: "29S-555.12", type: "SUV 7 chỗ", brand: "Toyota Fortuner", color: "Đen", driver: "Trần Minh Đức", phone: "0912345678", status: "available", mode: "private", route: "", location: "Sân bay ĐN", passengers: 0 },
  { id: 3, license: "36B-666.66", type: "Sedan 4 chỗ", brand: "Mazda 3", color: "Xanh", driver: "Lê Hoàng Nam", phone: "0909876543", status: "offline", mode: "shared", route: "", location: "Thanh Khê", passengers: 0 },
  { id: 4, license: "92C-888.99", type: "SUV 7 chỗ", brand: "Ford Everest", color: "Bạc", driver: "Phạm Văn Hùng", phone: "0938765432", status: "busy", mode: "private", route: "Ngũ Hành Sơn → Hội An", location: "Cầu Trần Thị Lý", passengers: 4 },
  { id: 5, license: "43T-777.88", type: "Sedan 4 chỗ", brand: "Hyundai Accent", color: "Đỏ", driver: "Võ Thành Long", phone: "0901234567", status: "busy", mode: "shared", route: "Liên Chiểu → Hải Châu", location: "Ngã 3 Hoàng Diệu", passengers: 2 },
  { id: 6, license: "30H-999.11", type: "SUV 7 chỗ", brand: "Mitsubishi Xpander", color: "Trắng", driver: "Đặng Minh Tuấn", phone: "0907654321", status: "available", mode: "private", route: "", location: "Bãi đỗ Lotte", passengers: 0 },
];

const VehiclesPage = () => {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState({ status: "all", type: "all", mode: "all" });
  const [modal, setModal] = useState({ show: false, type: "", vehicle: null });

  const filtered = mockVehicles.filter(v => {
    const search = v.license.toLowerCase().includes(q.toLowerCase()) || v.driver.toLowerCase().includes(q.toLowerCase()) || v.brand.toLowerCase().includes(q.toLowerCase());
    const status = filter.status === "all" || v.status === filter.status;
    const type = filter.type === "all" || v.type === filter.type;
    const mode = filter.mode === "all" || v.mode === filter.mode;
    return search && status && type && mode;
  });

  const stats = {
    total: mockVehicles.length,
    busy: mockVehicles.filter(v => v.status === "busy").length,
    available: mockVehicles.filter(v => v.status === "available").length,
    offline: mockVehicles.filter(v => v.status === "offline").length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-white text-xl">
            🚗
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Quản lý Xe</h1>
            <p className="text-sm text-gray-600">Hệ thống xe</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-3 mb-5">
          <div className="bg-white rounded-lg border-2 border-green-200 p-3">
            <div className="text-2xl font-bold text-green-600">{stats.total}</div>
            <div className="text-xs text-gray-600">Tổng xe</div>
          </div>
          <div className="bg-white rounded-lg border-2 border-orange-200 p-3">
            <div className="text-2xl font-bold text-orange-600">{stats.busy}</div>
            <div className="text-xs text-gray-600">🚗 Đang chạy</div>
          </div>
          <div className="bg-white rounded-lg border-2 border-blue-200 p-3">
            <div className="text-2xl font-bold text-blue-600">{stats.available}</div>
            <div className="text-xs text-gray-600">✓ Sẵn sàng</div>
          </div>
          <div className="bg-white rounded-lg border-2 border-gray-200 p-3">
            <div className="text-2xl font-bold text-gray-600">{stats.offline}</div>
            <div className="text-xs text-gray-600">⚫ Offline</div>
          </div>
        </div>

        {/* Filter */}
        <div className="bg-white rounded-lg border-2 border-green-200 p-4 mb-5">
          <div className="flex gap-3 mb-3">
            <div className="flex-1 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
              <input
                type="text"
                placeholder="Tìm kiếm biển số, tài xế, xe..."
                className="w-full pl-9 pr-3 py-2 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none text-sm"
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select value={filter.status} onChange={(e) => setFilter({...filter, status: e.target.value})} className="px-3 py-1.5 border-2 border-gray-300 rounded-lg text-sm focus:border-green-500 focus:outline-none">
              <option value="all">Tất cả trạng thái</option>
              <option value="busy">🚗 Đang chạy</option>
              <option value="available">✓ Sẵn sàng</option>
              <option value="offline">⚫ Offline</option>
            </select>
            <select value={filter.type} onChange={(e) => setFilter({...filter, type: e.target.value})} className="px-3 py-1.5 border-2 border-gray-300 rounded-lg text-sm focus:border-green-500 focus:outline-none">
              <option value="all">Tất cả loại xe</option>
              <option value="Sedan 4 chỗ">Sedan 4 chỗ</option>
              <option value="SUV 7 chỗ">SUV 7 chỗ</option>
            </select>
            <select value={filter.mode} onChange={(e) => setFilter({...filter, mode: e.target.value})} className="px-3 py-1.5 border-2 border-gray-300 rounded-lg text-sm focus:border-green-500 focus:outline-none">
              <option value="all">Tất cả chế độ</option>
              <option value="shared">Ghép chuyến</option>
              <option value="private">Riêng</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg border-2 border-green-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
              <tr>
                <th className="text-left px-3 py-3 font-semibold">Xe & Tài xế</th>
                <th className="text-left px-3 py-3 font-semibold">Trạng thái</th>
                <th className="text-left px-3 py-3 font-semibold">Chuyến đi</th>
                <th className="text-center px-3 py-3 font-semibold">Vị trí</th>
                <th className="text-center px-3 py-3 font-semibold">Khách</th>
                <th className="text-center px-3 py-3 font-semibold">Xem chi tiết</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filtered.map((v, i) => (
                <tr key={v.id} className={`hover:bg-green-50 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center text-white">
                        🚗
                      </div>
                      <div>
                        <div className="font-mono font-bold text-gray-900">{v.license}</div>
                        <div className="text-xs text-gray-600">{v.brand} • {v.color}</div>
                        <div className="text-xs text-gray-900 font-medium">{v.driver}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${
                      v.status === 'busy' ? 'bg-orange-100 text-orange-800' :
                      v.status === 'available' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {v.status === 'busy' ? '🚗 Đang chạy' : v.status === 'available' ? '✓ Sẵn sàng' : '⚫ Offline'}
                    </span>
                    <br />
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${
                      v.mode === 'shared' ? 'bg-emerald-100 text-emerald-800' : 'bg-purple-100 text-purple-800'
                    }`}>
                      {v.mode === 'shared' ? '👥 Ghép' : '🚐 Riêng'}
                    </span>
                  </td>
                  <td className="px-3 py-3">{v.route || <span className="text-gray-400 text-xs">Chưa có chuyến</span>}</td>
                  <td className="px-3 py-3 text-center">{v.location}</td>
                  <td className="px-3 py-3 text-center">{v.status === "busy" ? `${v.passengers}/${v.type.includes('4') ? 4 : 7}` : "—"}</td>
                  <td className="px-3 py-3 text-center">
                    <button
                      onClick={() => setModal({ show: true, type: "view", vehicle: v })}
                      className="p-1.5 text-green-600 hover:bg-green-100 rounded"
                      title="Xem chi tiết"
                    >
                      👁️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-3 text-center text-sm text-gray-600">
          Hiển thị <span className="font-bold text-green-600">{filtered.length}</span>/{mockVehicles.length} xe
        </div>
      </div>

      {/* Modal chỉ còn loại “view” */}
      {modal.show && modal.type === "view" && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-5 py-3 rounded-t-xl">
              <h3 className="font-bold">📋 Chi tiết xe</h3>
            </div>
            <div className="p-5 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2 bg-gray-50 rounded p-3">
                  <div className="text-xs text-gray-600">Biển số</div>
                  <div className="font-mono font-bold text-lg text-green-600">{modal.vehicle?.license}</div>
                </div>
                <div className="bg-gray-50 rounded p-3">
                  <div className="text-xs text-gray-600">Loại xe</div>
                  <div className="font-semibold">{modal.vehicle?.type}</div>
                </div>
                <div className="bg-gray-50 rounded p-3">
                  <div className="text-xs text-gray-600">Hãng xe</div>
                  <div className="font-semibold">{modal.vehicle?.brand}</div>
                </div>
                <div className="bg-gray-50 rounded p-3">
                  <div className="text-xs text-gray-600">Màu xe</div>
                  <div className="font-semibold">{modal.vehicle?.color}</div>
                </div>
                <div className="bg-gray-50 rounded p-3">
                  <div className="text-xs text-gray-600">Trạng thái</div>
                  <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${
                    modal.vehicle?.status === 'busy' ? 'bg-orange-100 text-orange-800' :
                    modal.vehicle?.status === 'available' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {modal.vehicle?.status === 'busy' ? 'Đang chạy' : modal.vehicle?.status === 'available' ? 'Sẵn sàng' : 'Offline'}
                  </span>
                </div>
                <div className="col-span-2 bg-gray-50 rounded p-3">
                  <div className="text-xs text-gray-600">Tài xế</div>
                  <div className="font-semibold">{modal.vehicle?.driver}</div>
                  <div className="text-xs text-gray-600">{modal.vehicle?.phone}</div>
                </div>
                {modal.vehicle?.route && (
                  <div className="col-span-2 bg-gray-50 rounded p-3">
                    <div className="text-xs text-gray-600">Chuyến đi</div>
                    <div className="font-semibold">{modal.vehicle?.route}</div>
                  </div>
                )}
                <div className="col-span-2 bg-gray-50 rounded p-3">
                  <div className="text-xs text-gray-600">Vị trí</div>
                  <div className="font-semibold flex items-center gap-1">
                    <span>📍</span>
                    {modal.vehicle?.location}
                  </div>
                </div>
              </div>
              <button onClick={() => setModal({ show: false })} className="w-full px-4 py-2 bg-green-600 text-white rounded-lg text-sm">Đóng</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehiclesPage;
