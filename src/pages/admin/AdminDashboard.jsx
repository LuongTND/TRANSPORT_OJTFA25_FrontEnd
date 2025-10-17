import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

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
const chartData = [
  { day: 'T2', booking: 12, revenue: 3000000 },
  { day: 'T3', booking: 18, revenue: 5000000 },
  { day: 'T4', booking: 9,  revenue: 2200000 },
  { day: 'T5', booking: 26, revenue: 9000000 },
  { day: 'T6', booking: 14, revenue: 4200000 },
  { day: 'T7', booking: 20, revenue: 7000000 },
  { day: 'CN', booking: 8,  revenue: 1800000 },
];

const routeData = [
  { name: 'Hà Nội - Sài Gòn', value: 35, color: '#10b981' },
  { name: 'Huế - Đà Nẵng', value: 25, color: '#059669' },
  { name: 'Nha Trang - Hà Nội', value: 20, color: '#047857' },
  { name: 'Cần Thơ - Sài Gòn', value: 15, color: '#065f46' },
  { name: 'Khác', value: 5, color: '#064e3b' },
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
    {/* Charts Grid */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Revenue Chart */}
      <div className="bg-white rounded shadow p-6">
        <div className="text-green-700 font-bold mb-4">Doanh thu & số đơn trong tuần</div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip formatter={(value, name) => [name === 'revenue' ? `${value.toLocaleString()}đ` : value, name === 'revenue' ? 'Doanh thu' : 'Số đơn']} />
            <Legend />
            <Bar yAxisId="left" dataKey="revenue" fill="#10b981" name="Doanh thu" />
            <Bar yAxisId="right" dataKey="booking" fill="#059669" name="Số đơn" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Route Distribution Chart */}
      <div className="bg-white rounded shadow p-6">
        <div className="text-green-700 font-bold mb-4">Tuyến đường phổ biến</div>
        <div className="flex flex-col gap-4">
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={routeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={60}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {routeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-1">
            {routeData.map((route, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded" style={{ backgroundColor: route.color }}></div>
                <span>{route.name}: {route.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* Trend Chart */}
    <div className="bg-white rounded shadow p-6 mb-8">
      <div className="text-green-700 font-bold mb-4">Xu hướng doanh thu tuần</div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip formatter={(value) => [`${value.toLocaleString()}đ`, 'Doanh thu']} />
          <Legend />
          <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} name="Doanh thu" />
        </LineChart>
      </ResponsiveContainer>
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