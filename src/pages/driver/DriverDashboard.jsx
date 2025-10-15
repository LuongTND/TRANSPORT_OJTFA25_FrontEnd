import React from "react";

const driver = { name: "Nguyễn Văn B", vehicle: "29S-555.12" };
const stats = [
  { label: "Tổng chuyến", value: 148 },
  { label: "Hôm nay", value: 2 },
  { label: "Doanh thu tháng", value: "8,400,000đ" },
];
const upcoming = [
  { id: 11, route: "Hà Nội - Huế", time: "12:20 14/10", status: "Sắp chạy" },
  { id: 17, route: "Huế - Đà Nẵng", time: "15:30 14/10", status: "Đang nhận khách" }
];

const DriverDashboard = () => (
  <div>
    <h1 className="text-2xl font-bold text-green-800 mb-4">Chào tài xế {driver.name}</h1>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {stats.map((s,i)=>(
        <div key={i} className="bg-green-100 border-l-8 border-green-500 rounded shadow p-6 flex flex-col items-start">
          <div className="text-green-700 font-semibold text-sm mb-1">{s.label}</div>
          <div className="text-2xl font-bold">{s.value}</div>
        </div>
      ))}
    </div>
    <div className="bg-white rounded shadow p-6 mb-8">
      <div className="font-semibold text-green-800 mb-2">Biểu đồ doanh thu (mock)</div>
      <div className="h-36 flex justify-center items-center text-green-400">(Chart đường/area - …)</div>
    </div>
    <div className="bg-white rounded shadow p-6">
      <div className="font-semibold text-green-700 mb-2">Chuyến sắp tới</div>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-green-800 border-b"><th>Chuyến</th><th>Thời gian</th><th>Trạng thái</th></tr>
        </thead>
        <tbody>
          {upcoming.map(u=>(
            <tr key={u.id} className="border-b last:border-0">
              <td className="py-2">{u.route}</td>
              <td>{u.time}</td>
              <td><span className="text-green-700 font-medium">{u.status}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)
export default DriverDashboard;
