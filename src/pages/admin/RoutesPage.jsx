import React, { useState } from "react";

const mockRoutes = [
  { id: 1001, from: "Hà Nội", to: "Sài Gòn", distance: "1700km"},
  { id: 1002, from: "Huế", to: "Nha Trang", distance: "700km"},
  { id: 1003, from: "Cần Thơ", to: "Đà Nẵng", distance: "1400km"}
];

const RoutesPage = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const filtered = mockRoutes.filter(r =>
    (!from || r.from === from) && (!to || r.to === to)
  );
  return (
    <div>
      <h1 className="text-xl font-bold text-green-800 mb-4">Quản lý tuyến xe</h1>
      <div className="mb-4 flex gap-2 items-center">
        <input className="input input-bordered w-40" placeholder="Điểm đi" value={from} onChange={e=>setFrom(e.target.value)} />
        <input className="input input-bordered w-40" placeholder="Điểm đến" value={to} onChange={e=>setTo(e.target.value)} />
        <button className="btn btn-success">Lọc</button>
      </div>
      <div className="bg-white rounded shadow">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-green-100 text-green-800">
              <th className="py-2">Tuyến</th><th>Khoảng cách</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(r => (
              <tr key={r.id} className="border-b last:border-none">
                <td className="py-2">{r.from} - {r.to}</td>
                <td>{r.distance}</td>
                <td>
                  <button className="btn btn-xs btn-success mr-2">Xem</button>
                  <button className="btn btn-xs btn-outline-success mr-2">Sửa</button>
                  <button className="btn btn-xs btn-outline-error">Xóa</button>
                </td>
              </tr>))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RoutesPage;
