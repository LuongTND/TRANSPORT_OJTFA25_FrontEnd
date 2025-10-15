import React, { useState } from "react";

const mockBookings = [
  { id: 101, user: "Nguyễn Văn A", route: "Hà Nội - Đà Nẵng", date: "2025-10-15", status: "Chờ thanh toán" },
  { id: 102, user: "Phạm Văn B", route: "Hải Phòng - Sài Gòn", date: "2025-10-16", status: "Đã thanh toán" },
  { id: 103, user: "Ngô Thị C", route: "Huế - Nha Trang", date: "2025-10-17", status: "Đã hủy" },
];

const statusColor = {
  "Chờ thanh toán": "text-yellow-600",
  "Đã thanh toán": "text-green-700",
  "Đã hủy": "text-gray-400 italic"
};

const BookingsPage = () => {
  const [status, setStatus] = useState("");
  const filtered = status ? mockBookings.filter(b => b.status === status) : mockBookings;
  return (
    <div>
      <h1 className="text-xl font-bold text-green-800 mb-4">Quản lý đặt vé</h1>
      <div className="mb-4 flex gap-2 items-center">
        <select className="input input-bordered" value={status} onChange={e=>setStatus(e.target.value)}>
            <option value="">Tất cả trạng thái</option>
            <option>Chờ thanh toán</option>
            <option>Đã thanh toán</option>
            <option>Đã hủy</option>
        </select>
        <button className="btn btn-success">Lọc</button>
      </div>
      <div className="bg-white rounded shadow">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-green-100 text-green-800">
              <th className="py-2">Khách hàng</th><th>Tuyến xe</th><th>Ngày</th><th>Trạng thái</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(b => (
              <tr key={b.id} className="border-b last:border-none">
                <td className="py-2">{b.user}</td>
                <td>{b.route}</td>
                <td>{b.date}</td>
                <td><span className={statusColor[b.status] + ' font-medium'}>{b.status}</span></td>
                <td>
                  <button className="btn btn-xs btn-success mr-2">Xem</button>
                  <button className="btn btn-xs btn-outline-success mr-2">Sửa</button>
                  <button className="btn btn-xs btn-outline-error">Hủy</button>
                </td>
              </tr>))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingsPage;
