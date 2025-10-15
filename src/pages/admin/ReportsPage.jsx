import React, { useState } from "react";

const ReportsPage = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  return (
    <div>
      <h1 className="text-xl font-bold text-green-800 mb-4">Báo cáo & thống kê</h1>
      <div className="mb-4 flex gap-2">
        <input type="date" className="input input-bordered" value={from} onChange={e=>setFrom(e.target.value)} />
        <input type="date" className="input input-bordered" value={to} onChange={e=>setTo(e.target.value)} />
        <button className="btn btn-success">Lọc</button>
      </div>
      <div className="bg-white mb-6 rounded shadow p-6">
        <div className="font-semibold text-green-800 mb-2">Biểu đồ doanh thu/đơn mock</div>
        <div className="h-44 flex items-center justify-center text-green-400">(Biểu đồ cột - mock dữ liệu...)</div>
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
