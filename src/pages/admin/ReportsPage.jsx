import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const ReportsPage = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  // Mock data for charts
  const revenueData = [
    { month: 'T1', revenue: 45000000, bookings: 120 },
    { month: 'T2', revenue: 52000000, bookings: 135 },
    { month: 'T3', revenue: 48000000, bookings: 128 },
    { month: 'T4', revenue: 61000000, bookings: 155 },
    { month: 'T5', revenue: 58000000, bookings: 148 },
    { month: 'T6', revenue: 67000000, bookings: 170 },
  ];

  const routeData = [
    { name: 'Hà Nội - Sài Gòn', value: 35, color: '#10b981' },
    { name: 'Huế - Đà Nẵng', value: 25, color: '#059669' },
    { name: 'Nha Trang - Hà Nội', value: 20, color: '#047857' },
    { name: 'Cần Thơ - Sài Gòn', value: 15, color: '#065f46' },
    { name: 'Khác', value: 5, color: '#064e3b' },
  ];

  return (
    <div>
      <h1 className="text-xl font-bold text-green-800 mb-4">Báo cáo & thống kê</h1>
      <div className="mb-4 flex gap-2">
        <input type="date" className="input input-bordered" value={from} onChange={e=>setFrom(e.target.value)} />
        <input type="date" className="input input-bordered" value={to} onChange={e=>setTo(e.target.value)} />
        <button className="btn btn-success">Lọc</button>
      </div>
      {/* Revenue Chart */}
      <div className="bg-white mb-6 rounded shadow p-6">
        <div className="font-semibold text-green-800 mb-4">Biểu đồ doanh thu & số đơn theo tháng</div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip formatter={(value, name) => [name === 'revenue' ? `${value.toLocaleString()}đ` : value, name === 'revenue' ? 'Doanh thu' : 'Số đơn']} />
            <Legend />
            <Bar yAxisId="left" dataKey="revenue" fill="#10b981" name="Doanh thu" />
            <Bar yAxisId="right" dataKey="bookings" fill="#059669" name="Số đơn" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Route Distribution Chart */}
      <div className="bg-white mb-6 rounded shadow p-6">
        <div className="font-semibold text-green-800 mb-4">Phân bố tuyến đường phổ biến</div>
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={routeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
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
          <div className="flex-1 flex flex-col justify-center">
            <div className="space-y-2">
              {routeData.map((route, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: route.color }}></div>
                  <span className="text-sm">{route.name}: {route.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Trend Chart */}
      <div className="bg-white mb-6 rounded shadow p-6">
        <div className="font-semibold text-green-800 mb-4">Xu hướng doanh thu 6 tháng gần đây</div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => [`${value.toLocaleString()}đ`, 'Doanh thu']} />
            <Legend />
            <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} name="Doanh thu" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-white rounded shadow p-6">
        <div className="font-semibold text-green-800 mb-2">Lịch sử xuất báo cáo</div>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-green-100 text-green-800">
              <th className="py-2">File</th><th>Thời gian</th><th>Người xuất</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2">baocao_1010.xlsx</td>
              <td>2025-10-13 10:15</td>
              <td>AdminC</td>
              <td><button className="btn btn-xs btn-success">Tải xuống</button></td>
            </tr>
            <tr>
              <td className="py-2">bc_quy3.pdf</td>
              <td>2025-08-01 14:03</td>
              <td>AdminB</td>
              <td><button className="btn btn-xs btn-success">Tải xuống</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportsPage;
