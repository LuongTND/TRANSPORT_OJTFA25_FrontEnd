import React from "react";

const stats = [
  { label: "Tổng đơn đặt vé", value: 1245 },
  { label: "Người dùng", value: 367 },
  { label: "Doanh thu hôm nay", value: "12,000,000đ" },
];
const recentBookings = [
  { id: 1, user: "Nguyễn Văn A", route: "Hà Nội → Sài Gòn", date: "2025-10-13", status: "Đã thanh toán" },
  { id: 2, user: "Trần Thị B", route: "Huế → Đà Nẵng", date: "2025-10-13", status: "Chưa thanh toán" },
  { id: 3, user: "Phạm Văn C", route: "Cần Thơ → Nha Trang", date: "2025-10-12", status: "Đã hủy" },
];

const AdminDashboard = () => (
  <div>
    <h1 className="text-2xl font-bold text-green-800 mb-6">Trang quản trị tổng quan</h1>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      {stats.map((s, idx) => (
        <div key={idx} className="bg-green-100 border-l-8 border-green-500 rounded shadow p-6 flex flex-col items-start">
          <span className="text-sm text-green-700 font-semibold mb-1">{s.label}</span>
          <span className="text-3xl font-extrabold text-green-800">{s.value}</span>
        </div>
      ))}
    </div>
    {/* Chart mock */}
    <div className="bg-white rounded shadow p-6 mb-8">
      <div className="text-green-700 font-bold mb-2">Biểu đồ đặt vé (mock)</div>
      <div className="h-40 flex items-center justify-center text-green-400 italic">(Biểu đồ đường... tích hợp sau)</div>
    </div>
    <div className="bg-white rounded shadow p-6">
      <div className="text-green-700 font-bold mb-3">Đơn đặt vé mới nhất</div>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left border-b">
            <th className="py-2">Khách hàng</th>
            <th>Tuyến xe</th>
            <th>Ngày</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {recentBookings.map(b => (
            <tr key={b.id} className="border-b last:border-0">
              <td className="py-2">{b.user}</td>
              <td>{b.route}</td>
              <td>{b.date}</td>
              <td>
                <span className={
                  b.status === 'Đã thanh toán' ? 'text-green-600 font-medium' :
                  b.status === 'Chưa thanh toán' ? 'text-yellow-700' :
                  'text-gray-400 italic'}>{b.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default AdminDashboard;
