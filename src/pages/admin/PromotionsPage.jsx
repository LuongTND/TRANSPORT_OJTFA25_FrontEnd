import React, { useState } from "react";

const mockPromos = [
  { id: 1, code: "SALE50", type: "%", value: 50, active: true },
  { id: 2, code: "300K", type: "VND", value: 300000, active: false },
];

const PromotionsPage = () => {
  const [q, setQ] = useState("");
  const filtered = mockPromos.filter(p=>(p.code.toLowerCase().includes(q.toLowerCase())));
  return (
    <div>
      <h1 className="text-xl font-bold text-green-800 mb-4">Quản lý khuyến mãi</h1>
      <div className="mb-4 flex gap-2 items-center">
        <input className="input input-bordered w-44" placeholder="Mã, loại..." value={q} onChange={e=>setQ(e.target.value)} />
        <button className="btn btn-success">Lọc</button>
      </div>
      <div className="bg-white rounded shadow">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-green-100 text-green-800">
              <th className="py-2">Mã</th><th>Loại</th><th>Giá trị</th><th>Trạng thái</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p=>(
              <tr key={p.id} className="border-b last:border-none">
                <td className="py-2">{p.code}</td>
                <td>{p.type}</td>
                <td>{p.type==='%'? p.value+'%' : p.value.toLocaleString()+"đ"}</td>
                <td><span className={p.active ? "text-green-700 font-medium" : "text-gray-400 italic"}>{p.active?"Kích hoạt":"Tạm dừng"}</span></td>
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

export default PromotionsPage;
