import React, { useState } from "react";

const mockVehicles = [
  { id: 1, license: "51A-123.45", type: "Giường nằm", seat: 44, driver: "Tài 1" },
  { id: 2, license: "29S-555.12", type: "Limousine", seat: 11, driver: "Tài 2" },
  { id: 3, license: "36B-666.66", type: "Ghế ngồi", seat: 29, driver: "Tài 3" },
];

const VehiclesPage = () => {
  const [q, setQ] = useState("");
  const filtered = mockVehicles.filter(v => (
    v.license.toLowerCase().includes(q.toLowerCase()) || v.type.toLowerCase().includes(q.toLowerCase())
  ));
  return (
    <div>
      <h1 className="text-xl font-bold text-green-800 mb-4">Quản lý xe khách</h1>
      <div className="mb-4 flex gap-2">
        <input className="input input-bordered w-56" placeholder="Biển số, loại xe..." value={q} onChange={e=>setQ(e.target.value)} />
        <button className="btn btn-success">Lọc</button>
      </div>
      <div className="bg-white rounded shadow">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-green-100 text-green-800">
              <th className="py-2">Biển số</th><th>Loại</th><th>Số ghế</th><th>Tài xế chính</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(v=>(
              <tr key={v.id} className="border-b last:border-none">
                <td className="py-2">{v.license}</td>
                <td>{v.type}</td>
                <td>{v.seat}</td>
                <td>{v.driver}</td>
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

export default VehiclesPage;
