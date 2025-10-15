import React, { useState } from "react";

const trips = [
  { id: 1, route: "Hà Nội - Đà Nẵng", time: "2025-10-15 08:00", vehicle: "51A-123.45", driver: "Nguyễn Văn T", status: "Chưa chạy" },
  { id: 2, route: "Huế - Sài Gòn", time: "2025-10-16 17:00", vehicle: "73B-456.78", driver: "Phạm Văn B", status: "Đang chạy" },
  { id: 3, route: "Nha Trang - Hà Nội", time: "2025-10-20 20:00", vehicle: "43S-789.12", driver: "Ngô Văn C", status: "Hoàn thành" },
];
const color = s => s==="Hoàn thành"?"text-green-700":s==="Đang chạy"?"text-blue-700":'text-gray-500';
const TripsPage = () => {
  const [st, setSt] = useState("");
  const filtered = st ? trips.filter(t=>t.status===st) : trips;
  return (
    <div>
      <h1 className="text-xl font-bold text-green-800 mb-4">Quản lý chuyến xe</h1>
      <div className="mb-4 flex gap-2 items-center">
        <select className="input input-bordered" value={st} onChange={e=>setSt(e.target.value)}>
            <option value="">Tất cả trạng thái</option>
            <option>Chưa chạy</option>
            <option>Đang chạy</option>
            <option>Hoàn thành</option>
        </select>
        <button className="btn btn-success">Lọc</button>
      </div>
      <div className="bg-white rounded shadow">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-green-100 text-green-800">
              <th className="py-2">Tuyến</th><th>Thời gian</th><th>Xe</th><th>Tài xế</th><th>Trạng thái</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(t=>(
              <tr key={t.id} className="border-b last:border-none">
                <td className="py-2">{t.route}</td>
                <td>{t.time}</td>
                <td>{t.vehicle}</td>
                <td>{t.driver}</td>
                <td><span className={color(t.status)+" font-medium"}>{t.status}</span></td>
                <td>
                  <button className="btn btn-xs btn-success mr-2">Xem</button>
                  <button className="btn btn-xs btn-outline-success mr-2">Sửa</button>
                  <button className="btn btn-xs btn-outline-error">Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TripsPage;
