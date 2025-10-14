import React, { useState } from 'react';
const bookings = [
  { id: 1, route: 'Hà Nội - Sài Gòn', time: '07:00 15/10', seat: 'A1,A2', price: 1700000, status: 'Đã thanh toán' },
  { id: 2, route: 'Huế - Đà Nẵng', time: '16:00 18/10', seat: 'B3', price: 590000, status: 'Chờ thanh toán' },
  { id: 3, route: 'Nha Trang - Đà Nẵng', time: '22:15 13/11', seat: 'C2', price: 760000, status: 'Đã hủy' }
];
const color = s=>s==="Đã thanh toán"?'text-green-700':s==="Chờ thanh toán"?'text-yellow-700':'text-gray-400 italic';
const MyBookingsPage = () => {
  const [st, setSt] = useState("");
  const filtered = st ? bookings.filter(b=>b.status===st) : bookings;
  return (
    <div>
      <h1 className="text-xl font-bold text-green-800 mb-4">Lịch sử đặt vé của tôi</h1>
      <div className="mb-4 flex gap-2 items-center">
        <select className="input input-bordered" value={st} onChange={e=>setSt(e.target.value)}>
          <option value="">Tất cả trạng thái</option>
          <option>Đã thanh toán</option>
          <option>Chờ thanh toán</option>
          <option>Đã hủy</option>
        </select>
        <button className="btn btn-success">Lọc</button>
      </div>
      <div className="bg-white rounded shadow">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-green-100 text-green-800">
              <th className="py-2">Tuyến</th><th>Giờ</th><th>Ghế</th><th>Giá</th><th>Trạng thái</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(b=>(
              <tr key={b.id} className="border-b last:border-none">
                <td>{b.route}</td><td>{b.time}</td><td>{b.seat}</td><td>{b.price.toLocaleString()}đ</td>
                <td><span className={color(b.status)+" font-medium"}>{b.status}</span></td>
                <td>
                  <button className="btn btn-xs btn-success mr-2">Xem vé</button>
                  {b.status==='Chờ thanh toán' && <button className="btn btn-xs btn-outline-error">Hủy vé</button>}
                </td>
              </tr>))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default MyBookingsPage;
