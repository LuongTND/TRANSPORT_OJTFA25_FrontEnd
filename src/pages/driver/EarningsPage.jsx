import React from 'react';
const stats = { month: '8,400,000đ', today: '350,000đ' };
const history = [
  { id: 1, date: '2025-10-09', content: 'Chuyến HN-ĐN', amount: '1,200,000đ' },
  { id: 2, date: '2025-10-05', content: 'Chuyến ĐN-SG', amount: '2,000,000đ' }
];
const EarningsPage = () => (
  <div>
    <h1 className="text-xl font-bold text-green-800 mb-4">Doanh thu của tôi</h1>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-green-100 border-l-8 border-green-600 rounded shadow p-4 font-bold">
        Tháng: <span className="text-green-800 text-lg">{stats.month}</span>
      </div>
      <div className="bg-green-100 border-l-8 border-green-600 rounded shadow p-4 font-bold">
        Hôm nay: <span className="text-green-800 text-lg">{stats.today}</span>
      </div>
    </div>
    <div className="bg-white rounded shadow p-6 mb-8">
      <div className="font-semibold text-green-800 mb-2">Biểu đồ doanh thu (mock)</div>
      <div className="h-36 flex justify-center items-center text-green-400">(chart đơn giản - mock)</div>
    </div>
    <div className="bg-white rounded shadow p-6">
      <div className="font-semibold text-green-700 mb-2">Lịch sử thanh toán về tài xế</div>
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-green-100 text-green-800"><th>Ngày</th><th>Nội dung</th><th>Số tiền</th></tr>
        </thead>
        <tbody>
          {history.map(h=>(
            <tr key={h.id} className="border-b last:border-0">
              <td>{h.date}</td><td>{h.content}</td><td className="text-green-700 font-semibold">{h.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
export default EarningsPage;
