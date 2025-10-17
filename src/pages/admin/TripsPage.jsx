import React, { useState } from "react";

const trips = [
  // Liên tỉnh
  { id: 1, type: "liên tỉnh", route: "Hà Nội - Đà Nẵng", time: "2025-10-15 08:00", vehicle: "51A-123.45", carType: "Giường nằm", seats: 44, booked: 41, driver: "Nguyễn Văn T", status: "Chưa chạy" },
  // Nội thành ghép xe
  { id: 2, type: "nội thành", route: "Q1 - Q7", time: "2025-10-16 15:30", vehicle: "30A-356.86", carType: "Ô tô", seats: 4, booked: 2, driver: "Nguyễn Văn D", status: "Đang ghép", passengers: [
    { name: "Khách 1", phone: "012345" },
    { name: "Khách 2", phone: "098765" },
  ]},
  { id: 3, type: "liên tỉnh", route: "Huế - Sài Gòn", time: "2025-10-16 17:00", vehicle: "73B-456.78", carType: "Giường nằm", seats: 44, booked: 44, driver: "Phạm Văn B", status: "Đang chạy" },
  { id: 4, type: "nội thành", route: "Hoàn Kiếm - Cầu Giấy", time: "2025-10-20 09:00", vehicle: "30H-555.11", carType: "Ô tô", seats: 5, booked: 5, driver: "Lê Thị V", status: "Hoàn thành", passengers: [
    { name: "Trần Văn E", phone: "065432" },
    { name: "Phạm Hà Q", phone: "098111" },
    { name: "Bùi M Y", phone: "093543" },
    { name: "Vũ Văn Đ", phone: "033543" },
    { name: "Ngô T T", phone: "080545" },
  ]}
];
const color = s => s === "Hoàn thành" ? "text-green-700" : s === "Đang chạy" ? "text-blue-700" : s === "Đang ghép" ? "text-yellow-700" : 'text-gray-500';

const TripsPage = () => {
  const [st, setSt] = useState("");
  const [show, setShow] = useState(null);
  const filtered = st ? trips.filter(t => t.status === st) : trips;
  return (
    <div>
      <h1 className="text-xl font-bold text-green-800 mb-4">Quản lý chuyến xe</h1>
      <div className="mb-4 flex gap-2 items-center">
        <select className="input input-bordered" value={st} onChange={e => setSt(e.target.value)}>
          <option value="">Tất cả trạng thái</option>
          <option>Chưa chạy</option>
          <option>Đang chạy</option>
          <option>Hoàn thành</option>
          <option>Đang ghép</option>
        </select>
        <button className="btn btn-success">Lọc</button>
      </div>
      <div className="bg-white rounded shadow">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-green-100 text-green-800">
              <th className="py-2">Tuyến</th>
              <th>Loại chuyến</th>
              <th>Loại xe</th>
              <th>Thời gian</th>
              <th>Xe</th>
              <th>Tài xế</th>
              <th>Số ghế</th>
              <th>Số khách đã ghép</th>
              <th>Trạng thái</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(t => (
              <tr key={t.id} className="border-b last:border-none">
                <td className="py-2">{t.route}</td>
                <td>
                  {t.type === 'nội thành' ? <span className="bg-yellow-100 text-yellow-800 rounded px-2 text-xs">Nội thành (ghép xe)</span>
                    : <span className="bg-green-100 text-green-800 rounded px-2 text-xs">Liên tỉnh</span>}
                </td>
                <td>{t.carType}</td>
                <td>{t.time}</td>
                <td>{t.vehicle}</td>
                <td>{t.driver}</td>
                <td>{t.seats}</td>
                <td>{t.booked || (t.passengers ? t.passengers.length : 0)}/{t.seats}</td>
                <td><span className={color(t.status) + " font-medium"}>{t.status}</span></td>
                <td>
                  {t.type === 'nội thành' ? (
                    <button className="btn btn-xs btn-success mr-2" onClick={() => setShow(t)}>Xem</button>
                  ) : (
                    <button className="btn btn-xs btn-success mr-2" disabled>---</button>
                  )}
                  <button className="btn btn-xs btn-outline-success mr-2">Sửa</button>
                  <button className="btn btn-xs btn-outline-error">Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {show && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-xs w-full p-6 relative">
            <button className="absolute top-2 right-3 text-xl" onClick={() => setShow(null)}>✕</button>
            <h3 className="font-bold text-green-800 mb-2 text-center">Danh sách ghép xe</h3>
            <ul className="mb-2">
              {show.passengers && show.passengers.length > 0 ? show.passengers.map((p, i) => (
                <li key={i} className="py-1 border-b last:border-none text-gray-800 flex justify-between"><span>{p.name}</span> <span className="text-sm text-gray-500">{p.phone}</span></li>
              )) : <li className="text-gray-400 italic">Chưa có khách nào ghép</li>}
            </ul>
            <div className="mt-4 flex gap-2">
              <button className="btn btn-success flex-1" onClick={() => setShow(null)}>Đóng</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TripsPage;
