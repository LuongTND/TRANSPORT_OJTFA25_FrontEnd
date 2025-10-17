import React, { useState } from "react";

const mockBookings = [
  { 
    id: "BK001", 
    user: "Nguyễn Văn A", 
    phone: "0912345678",
    from: "Thanh Khê",
    to: "Hải Châu", 
    distance: "8 km",
    date: "2025-10-20", 
    time: "14:00",
    status: "Chờ thanh toán",
    price: 50000,
    groupId: "GRP001"
  },
  { 
    id: "BK002", 
    user: "Phạm Thị B", 
    phone: "0987654321",
    from: "Thanh Khê",
    to: "Hải Châu", 
    distance: "8 km",
    date: "2025-10-20", 
    time: "14:05",
    status: "Chờ thanh toán",
    price: 50000,
    groupId: "GRP001"
  },
  { 
    id: "BK003", 
    user: "Trần Minh C", 
    phone: "0911223344",
    from: "Núi Thành",
    to: "Liên Chiểu", 
    distance: "5 km",
    date: "2025-10-20", 
    time: "15:30",
    status: "Đã thanh toán",
    price: 45000,
    groupId: "GRP002"
  },
  { 
    id: "BK004", 
    user: "Lê Hoàng D", 
    phone: "0933445566",
    from: "Núi Thành",
    to: "Liên Chiểu", 
    distance: "5 km",
    date: "2025-10-20", 
    time: "15:15",
    status: "Đã thanh toán",
    price: 45000,
    groupId: "GRP002"
  },
  { 
    id: "BK005", 
    user: "Võ Thị E", 
    phone: "0955667788",
    from: "Cẩm Lệ",
    to: "Liên Chiểu", 
    distance: "6 km",
    date: "2025-10-19", 
    time: "10:00",
    status: "Đã hủy",
    price: 55000,
    groupId: null,
    bookingType: "nguyên"
  },
  { 
    id: "BK006", 
    user: "Đặng Văn F", 
    phone: "0922334455",
    from: "Sơn Trà",
    to: "Thanh Khê", 
    distance: "12 km",
    date: "2025-10-21", 
    time: "08:00",
    status: "Chờ thanh toán",
    price: 65000,
    groupId: null,
    bookingType: "nguyên"
  },
  { 
    id: "BK007", 
    user: "Ngô Quỳnh G", 
    phone: "0966778899",
    from: "Thanh Khê",
    to: "Hải Châu", 
    distance: "7 km",
    date: "2025-10-20", 
    time: "16:45",
    status: "Đã thanh toán",
    price: 50000,
    groupId: "GRP003"
  },
  { 
    id: "BK008", 
    user: "Hồ Anh H", 
    phone: "0944556677",
    from: "Thanh Khê",
    to: "Hải Châu", 
    distance: "7 km",
    date: "2025-10-20", 
    time: "16:40",
    status: "Đã thanh toán",
    price: 50000,
    groupId: "GRP003"
  },
];

const statusConfig = {
  "Chờ thanh toán": { 
    bg: "bg-yellow-50", 
    borderColor: "border-l-4 border-yellow-400",
    badge: "badge badge-warning",
  },
  "Đã thanh toán": { 
    bg: "bg-green-50", 
    borderColor: "border-l-4 border-green-400",
    badge: "badge badge-success",
  },
  "Đã hủy": { 
    bg: "bg-gray-50", 
    borderColor: "border-l-4 border-gray-300",
    badge: "badge badge-ghost",
  },
};

const BookingsPage = () => {
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedRoute, setSelectedRoute] = useState("");
  const [expandedGroup, setExpandedGroup] = useState(null);
  
  const filtered = mockBookings.filter(b => {
    const statusMatch = !selectedStatus || b.status === selectedStatus;
    const dateMatch = !selectedDate || b.date === selectedDate;
    const routeMatch = !selectedRoute || 
      `${b.from} → ${b.to}`.toLowerCase().includes(selectedRoute.toLowerCase()) ||
      b.from.toLowerCase().includes(selectedRoute.toLowerCase()) ||
      b.to.toLowerCase().includes(selectedRoute.toLowerCase());
    return statusMatch && dateMatch && routeMatch;
  });

  // Group bookings that can be merged (same from/to, close time window)
  const groupedBookings = filtered.reduce((acc, booking) => {
    if (booking.groupId) {
      if (!acc[booking.groupId]) {
        acc[booking.groupId] = {
          from: booking.from,
          to: booking.to,
          distance: booking.distance,
          date: booking.date,
          timeRange: [booking.time, booking.time],
          totalPrice: 0,
          bookings: []
        };
      }
      acc[booking.groupId].bookings.push(booking);
      acc[booking.groupId].totalPrice += booking.price;
      if (booking.time < acc[booking.groupId].timeRange[0]) {
        acc[booking.groupId].timeRange[0] = booking.time;
      }
      if (booking.time > acc[booking.groupId].timeRange[1]) {
        acc[booking.groupId].timeRange[1] = booking.time;
      }
    }
    return acc;
  }, {});

  const soloBookings = filtered.filter(b => !b.groupId);

  const stats = {
    total: filtered.length,
    pending: filtered.filter(b => b.status === "Chờ thanh toán").length,
    completed: filtered.filter(b => b.status === "Đã thanh toán").length,
    cancelled: filtered.filter(b => b.status === "Đã hủy").length,
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Quản lý Đặt Vé</h1>
          <p className="text-gray-600">Theo dõi và quản lý các chuyến đi</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-600 font-medium mb-1">Tổng</p>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-yellow-600 font-medium mb-1">Chờ thanh toán</p>
            <p className="text-2xl font-bold text-yellow-700">{stats.pending}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-green-600 font-medium mb-1">Đã thanh toán</p>
            <p className="text-2xl font-bold text-green-700">{stats.completed}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-600 font-medium mb-1">Đã hủy</p>
            <p className="text-2xl font-bold text-gray-500">{stats.cancelled}</p>
          </div>
        </div>

        {/* Filter */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h3 className="text-sm font-bold text-gray-900 mb-4">Bộ Lọc</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Filter by Status */}
            <div>
              <label className="text-xs font-semibold text-gray-700 mb-2 block">Trạng thái</label>
              <select 
                className="select select-bordered select-sm w-full"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="">Tất cả trạng thái</option>
                <option>Chờ thanh toán</option>
                <option>Đã thanh toán</option>
                <option>Đã hủy</option>
              </select>
            </div>

            {/* Filter by Date */}
            <div>
              <label className="text-xs font-semibold text-gray-700 mb-2 block">Ngày đi</label>
              <input 
                type="date"
                className="input input-bordered input-sm w-full"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>

            {/* Filter by Route */}
            <div>
              <label className="text-xs font-semibold text-gray-700 mb-2 block">Tuyến đường</label>
              <input 
                type="text"
                placeholder="Nhập điểm đi/đến..."
                className="input input-bordered input-sm w-full"
                value={selectedRoute}
                onChange={(e) => setSelectedRoute(e.target.value)}
              />
            </div>
          </div>

          {/* Search & Reset Buttons */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t gap-2">
            <button 
              onClick={() => {
                setSelectedStatus("");
                setSelectedDate("");
                setSelectedRoute("");
              }}
              className="btn btn-sm btn-outline"
            >
              Xóa bộ lọc
            </button>
            <span className="text-sm text-gray-600">
              Kết quả: <span className="font-bold text-blue-600">{filtered.length}</span> booking
            </span>
            <button className="btn btn-sm btn-primary">
              Tìm kiếm
            </button>
          </div>
        </div>

        {/* Grouped Bookings - Ghép chuyến */}
        {Object.keys(groupedBookings).length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-500">Chuyến Ghép (Cùng tuyến đường)</h2>
            <div className="space-y-4">
              {Object.entries(groupedBookings).map(([groupId, group]) => (
                <div key={groupId} className={`bg-white rounded-lg shadow ${statusConfig[group.bookings[0].status].borderColor}`}>
                  <button
                    onClick={() => setExpandedGroup(expandedGroup === groupId ? null : groupId)}
                    className="w-full px-6 py-4 hover:bg-gray-50 transition text-left"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-gray-900 font-bold text-lg">{group.from} → {group.to}</span>
                          <span className="badge badge-sm badge-outline">{group.distance}</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>{group.date}</span>
                          <span>{group.timeRange[0]} - {group.timeRange[1]}</span>
                          <span className="badge badge-sm">{group.bookings.length} khách</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg text-gray-900">{group.totalPrice.toLocaleString()}đ</p>
                        <div className="text-blue-600 font-bold">
                          {expandedGroup === groupId ? "▼" : "▶"}
                        </div>
                      </div>
                    </div>
                  </button>

                  {expandedGroup === groupId && (
                    <div className="border-t px-6 py-4 bg-gray-50">
                      <div className="space-y-3">
                        {group.bookings.map((booking) => {
                          const config = statusConfig[booking.status];
                          return (
                            <div key={booking.id} className={`${config.bg} p-4 rounded-lg flex items-center justify-between`}>
                              <div className="flex-1">
                                <p className="font-semibold text-gray-900">{booking.user}</p>
                                <p className="text-xs text-gray-600">📱 {booking.phone}</p>
                              </div>
                              <div className="text-right">
                                <p className="font-bold text-gray-900">{booking.price.toLocaleString()}đ</p>
                                <span className={config.badge}>{booking.status}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Solo Bookings - Nguyên chuyến */}
        {soloBookings.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b-2 border-purple-500">Nguyên Chuyến </h2>
            <div className="space-y-3">
              {soloBookings.map((booking) => {
                const config = statusConfig[booking.status];
                return (
                  <div key={booking.id} className={`bg-white rounded-lg shadow ${config.borderColor} p-5 flex items-center justify-between`}>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <p className="font-bold text-gray-900 text-base">{booking.user}</p>
                        <p className="text-xs text-gray-600">📱 {booking.phone}</p>
                      </div>
                      <p className="font-semibold text-gray-800 mb-1">{booking.from} → {booking.to}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>{booking.date} {booking.time}</span>
                        <span>{booking.distance}</span>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900 mb-2">{booking.price.toLocaleString()}đ</p>
                      <span className={config.badge}>{booking.status}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-16 bg-white rounded-lg shadow">
            <p className="text-gray-500 text-lg">Không có dữ liệu</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingsPage;