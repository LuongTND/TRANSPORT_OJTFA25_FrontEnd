import React, { useState } from "react";

const mockBookings = [
  // Tuyến 1: Thanh Khê → Hải Châu (4 chỗ - Ghép chuyến)
  { id: "B001", user: "Nguyễn Văn A", phone: "0912345678", from: "Thanh Khê", to: "Hải Châu", time: "2025-10-15 08:00", carType: "4 chỗ", bookingType: "ghép", status: "Chờ ghép", price: 50000, driver: "Trần Văn D", vehicle: "43A-123.45" },
  { id: "B002", user: "Phạm Thị B", phone: "0987654321", from: "Thanh Khê", to: "Hải Châu", time: "2025-10-15 08:05", carType: "4 chỗ", bookingType: "ghép", status: "Chờ ghép", price: 50000, driver: "Trần Văn D", vehicle: "43A-123.45" },
  { id: "B003", user: "Trần Minh C", phone: "0911223344", from: "Thanh Khê", to: "Hải Châu", time: "2025-10-15 08:10", carType: "4 chỗ", bookingType: "ghép", status: "Đang chạy", price: 50000, driver: "Trần Văn D", vehicle: "43A-123.45" },
  { id: "B004", user: "Lê Hoàng D", phone: "0933445566", from: "Thanh Khê", to: "Hải Châu", time: "2025-10-15 08:35", carType: "4 chỗ", bookingType: "ghép", status: "Đang chạy", price: 50000, driver: "Trần Văn D", vehicle: "43A-123.45" },

  // Tuyến 2: Sơn Trà → Hải Châu (7 chỗ - Ghép chuyến)
  { id: "B005", user: "Phan Thị E", phone: "0977555333", from: "Sơn Trà", to: "Hải Châu", time: "2025-10-15 10:00", carType: "7 chỗ", bookingType: "ghép", status: "Đang chạy", price: 70000, driver: "Lý Thị F", vehicle: "43B-234.56" },

  // Tuyến 3: Sơn Trà → Thanh Khê (4 chỗ - Ghép chuyến)
  { id: "B006", user: "Đặng Văn F", phone: "0922334455", from: "Sơn Trà", to: "Thanh Khê", time: "2025-10-16 14:00", carType: "4 chỗ", bookingType: "ghép", status: "Chờ ghép", price: 45000, driver: "Nguyễn Văn K", vehicle: "43C-456.78" },
  { id: "B007", user: "Ngô Quỳnh G", phone: "0966778899", from: "Sơn Trà", to: "Thanh Khê", time: "2025-10-16 14:05", carType: "4 chỗ", bookingType: "ghép", status: "Chờ ghép", price: 45000, driver: "Nguyễn Văn K", vehicle: "43C-456.78" },
  { id: "B008", user: "Hồ Anh H", phone: "0944556677", from: "Sơn Trà", to: "Thanh Khê", time: "2025-10-16 14:10", carType: "4 chỗ", bookingType: "ghép", status: "Đang chạy", price: 45000, driver: "Nguyễn Văn K", vehicle: "43C-456.78" },

  // Tuyến 4: Cẩm Lệ → Sơn Trà (4 chỗ - Nguyên chuyến 1 mình)
  { id: "B009", user: "Bùi Văn K", phone: "0765432109", from: "Cẩm Lệ", to: "Sơn Trà", time: "2025-10-17 16:00", carType: "4 chỗ", bookingType: "nguyên", status: "Chưa chạy", price: 60000, driver: "Phạm Văn L", vehicle: "43D-555.11" },

  // Tuyến 5: Liên Chiểu → Hải Châu (7 chỗ - Nguyên chuyến)
  { id: "B010", user: "Vũ Văn M", phone: "0855554444", from: "Liên Chiểu", to: "Hải Châu", time: "2025-10-18 12:43", carType: "7 chỗ", bookingType: "nguyên", status: "Đang chạy", price: 75000, driver: "Võ Thị N", vehicle: "43E-789.22" },

   // Tuyến 6: Ngũ Hành Sơn → Thanh Khê (4 chỗ - Ghép chuyến)
  { id: "B011", user: "Đinh Hương L", phone: "0877776666", from: "Ngũ Hành Sơn", to: "Thanh Khê", time: "2025-10-19 09:00", carType: "4 chỗ", bookingType: "ghép", status: "Chờ ghép", price: 48000, driver: "Hoàng Văn O", vehicle: "43F-111.99" },
  { id: "B012", user: "Nguyễn N N", phone: "0888884444", from: "Ngũ Hành Sơn", to: "Thanh Khê", time: "2025-10-19 09:05", carType: "4 chỗ", bookingType: "ghép", status: "Chờ ghép", price: 48000, driver: "Hoàng Văn O", vehicle: "43F-111.99" },
];

const statusConfig = {
  "Chưa chạy": { bg: "bg-gray-50", borderColor: "border-l-4 border-gray-400", badge: "badge badge-ghost" },
  "Chờ ghép": { bg: "bg-yellow-50", borderColor: "border-l-4 border-yellow-400", badge: "badge badge-warning" },
  "Đang chạy": { bg: "bg-blue-50", borderColor: "border-l-4 border-blue-400", badge: "badge badge-info" },
  "Đang chạy - Nhận thêm": { bg: "bg-purple-50", borderColor: "border-l-4 border-purple-400", badge: "badge badge-secondary" },
  "Hoàn thành": { bg: "bg-green-50", borderColor: "border-l-4 border-green-400", badge: "badge badge-success" }
};

const TripsPage = () => {
  const [selectedStatus, setSelectedStatus] = useState("");
  const [expandedTrip, setExpandedTrip] = useState(null);

  // Group bookings by route + time window (15 min) = 1 trip (chỉ cho ghép chuyến)
  const groupedTrips = mockBookings.reduce((acc, booking) => {
    // Nguyên chuyến: tạo trip riêng cho mỗi booking
    if (booking.bookingType === "nguyên") {
      const tripKey = `nguyên|${booking.id}`;
      acc[tripKey] = {
        key: tripKey,
        from: booking.from,
        to: booking.to,
        date: booking.time.split(" ")[0],
        hour: booking.time.split(" ")[1].split(":")[0],
        carType: booking.carType,
        maxSeats: parseInt(booking.carType),
        bookings: [booking],
        tripStatus: booking.status,
        bookingType: "nguyên"
      };
    } else {
      // Ghép chuyến: group theo tuyến + giờ
      const hourKey = booking.time.split(" ")[1].split(":")[0];
      const tripKey = `ghép|${booking.from}→${booking.to}|${hourKey}`;

      if (!acc[tripKey]) {
        acc[tripKey] = {
          key: tripKey,
          from: booking.from,
          to: booking.to,
          date: booking.time.split(" ")[0],
          hour: hourKey,
          carType: booking.carType,
          maxSeats: parseInt(booking.carType),
          bookings: [],
          tripStatus: booking.status,
          bookingType: "ghép"
        };
      }
      acc[tripKey].bookings.push(booking);
      
      // Update trip status logic
      if (booking.status === "Đang chạy") {
        const currentBookings = acc[tripKey].bookings.length;
        if (currentBookings < parseInt(acc[tripKey].carType)) {
          acc[tripKey].tripStatus = "Đang chạy - Nhận thêm";
        } else {
          acc[tripKey].tripStatus = "Đang chạy";
        }
      } else if (booking.status === "Hoàn thành" && acc[tripKey].tripStatus !== "Đang chạy" && acc[tripKey].tripStatus !== "Đang chạy - Nhận thêm") {
        acc[tripKey].tripStatus = "Hoàn thành";
      }
    }
    return acc;
  }, {});

  const filtered = Object.values(groupedTrips).filter(trip => {
    return !selectedStatus || trip.tripStatus === selectedStatus;
  });

  const stats = {
    total: filtered.length,
    notStarted: filtered.filter(t => t.tripStatus === "Chưa chạy").length,
    waiting: filtered.filter(t => t.tripStatus === "Chờ ghép").length,
    running: filtered.filter(t => t.tripStatus === "Đang chạy").length,
    runningExtra: filtered.filter(t => t.tripStatus === "Đang chạy - Nhận thêm").length,
    completed: filtered.filter(t => t.tripStatus === "Hoàn thành").length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Quản lý Chuyến Xe</h1>
          <p className="text-slate-600 text-sm">Theo dõi và quản lý thông tin chuyến xe</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-4 border-t-4 border-blue-500">
            <p className="text-xs text-slate-600 font-medium mb-1">Tổng</p>
            <p className="text-2xl font-bold text-slate-900">{stats.total}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 border-t-4 border-gray-400">
            <p className="text-xs text-slate-600 font-medium mb-1">Chưa chạy</p>
            <p className="text-2xl font-bold text-slate-600">{stats.notStarted}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 border-t-4 border-yellow-500">
            <p className="text-xs text-slate-600 font-medium mb-1">Chờ ghép</p>
            <p className="text-2xl font-bold text-yellow-700">{stats.waiting}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 border-t-4 border-blue-600">
            <p className="text-xs text-slate-600 font-medium mb-1">Đang chạy</p>
            <p className="text-2xl font-bold text-blue-700">{stats.running}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 border-t-4 border-purple-500">
            <p className="text-xs text-slate-600 font-medium mb-1">Nhận thêm</p>
            <p className="text-2xl font-bold text-purple-700">{stats.runningExtra}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 border-t-4 border-green-500">
            <p className="text-xs text-slate-600 font-medium mb-1">Hoàn thành</p>
            <p className="text-2xl font-bold text-green-700">{stats.completed}</p>
          </div>
        </div>

        {/* Filter */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <label className="text-xs font-semibold text-slate-700 mb-3 block">Lọc Trạng Thái Chuyến</label>
          <div className="flex items-center gap-4">
            <select 
              className="select select-bordered select-sm max-w-xs bg-white text-slate-900"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="">Tất cả trạng thái</option>
              <option>Chưa chạy</option>
              <option>Chờ ghép</option>
              <option>Đang chạy</option>
              <option>Đang chạy - Nhận thêm</option>
              <option>Hoàn thành</option>
            </select>
            <button 
              onClick={() => setSelectedStatus("")}
              className="btn btn-sm btn-outline"
            >
              Xóa lọc
            </button>
            <span className="text-sm text-slate-600 ml-auto">
              Hiển thị: <span className="font-bold text-blue-600">{filtered.length}</span> chuyến
            </span>
          </div>
        </div>

        {/* Trips List */}
        <div className="space-y-4">
          {filtered.map(trip => {
            const config = statusConfig[trip.tripStatus];
            const booked = trip.bookings.length;
            const available = trip.maxSeats - booked;
            
            return (
              <div key={trip.key} className={`bg-white rounded-lg shadow-sm ${config.borderColor}`}>
                <div className="px-6 py-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-bold text-slate-900 text-lg">{trip.from} → {trip.to}</span>
                        <span className="badge badge-sm badge-outline">{trip.carType}</span>
                        {trip.bookingType === "nguyên" && <span className="badge badge-sm badge-primary">Nguyên chuyến</span>}
                        {trip.bookingType === "ghép" && <span className="badge badge-sm badge-info">Ghép chuyến</span>}
                      </div>
                    </div>
                    <button
                      onClick={() => setExpandedTrip(expandedTrip === trip.key ? null : trip.key)}
                      className="text-blue-600 font-bold text-xl hover:text-blue-800"
                    >
                      {expandedTrip === trip.key ? "▼" : "▶"}
                    </button>
                  </div>

                  {/* Main Info Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-sm bg-slate-50 p-4 rounded-lg">
                    <div>
                      <p className="text-xs text-slate-500 font-semibold mb-1">Thời gian</p>
                      <p className="font-semibold text-slate-900">{trip.date} {trip.hour}:00</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-semibold mb-1">Tài xế</p>
                      <p className="font-semibold text-slate-900">{trip.bookings[0]?.driver || "-"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-semibold mb-1">Biển số xe</p>
                      <p className="font-semibold text-slate-900">{trip.bookings[0]?.vehicle || "-"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-semibold mb-1">Khách / Chỗ</p>
                      <p className="font-semibold text-slate-900">{booked}/{trip.maxSeats}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-semibold mb-1">Giá / khách</p>
                      <p className="font-semibold text-green-600">{(trip.bookings[0]?.price || 0).toLocaleString()}đ</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-semibold mb-1">Trạng thái</p>
                      <span className={config.badge}>{trip.tripStatus}</span>
                    </div>
                  </div>
                </div>

                {/* Expanded View */}
                {expandedTrip === trip.key && (
                  <div className="border-t px-6 py-4 bg-slate-50">
                    <h4 className="text-sm font-bold text-slate-900 mb-4">
                      {trip.bookingType === "nguyên" ? "Khách hàng" : "Danh sách hành khách"} ({trip.bookings.length})
                    </h4>
                    <div className="space-y-3">
                      {trip.bookings.map((booking, idx) => (
                        <div key={booking.id} className="bg-white p-4 rounded-lg border border-slate-200">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-semibold text-slate-900">{idx + 1}. {booking.user}</p>
                              <p className="text-xs text-slate-600">📱 {booking.phone}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-xs text-slate-500">Giá vé</p>
                              <p className="font-bold text-green-600">{booking.price.toLocaleString()}đ</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Status Messages */}
                    <div className="mt-4 pt-4 border-t space-y-2">
                      {trip.bookingType === "nguyên" && (
                        <div className="p-3 bg-blue-100 text-blue-800 text-xs rounded-lg">
                          👤 Đặt nguyên chuyến riêng - Không ghép ai
                        </div>
                      )}
                      {trip.bookingType === "ghép" && available > 0 && trip.tripStatus === "Chờ ghép" && (
                        <div className="p-3 bg-yellow-100 text-yellow-800 text-xs rounded-lg">
                          ⏳ Còn {available} chỗ trống, chờ thêm khách ghép...
                        </div>
                      )}
                      {trip.bookingType === "ghép" && available > 0 && trip.tripStatus === "Đang chạy - Nhận thêm" && (
                        <div className="p-3 bg-purple-100 text-purple-800 text-xs rounded-lg">
                          🚗 Xe đang chạy, còn {available} chỗ - Nhận thêm khách ghép dọc đường
                        </div>
                      )}
                      {available === 0 && trip.tripStatus === "Đang chạy" && (
                        <div className="p-3 bg-blue-100 text-blue-800 text-xs rounded-lg">
                          ✓ Chuyến đầy, đang chạy
                        </div>
                      )}
                      {available === 0 && trip.tripStatus === "Chờ ghép" && (
                        <div className="p-3 bg-green-100 text-green-800 text-xs rounded-lg">
                          ✓ Chuyến đầy, sẵn sàng khởi hành
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <p className="text-slate-500 text-lg">Không tìm thấy chuyến nào</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TripsPage;