import React from 'react';
import { Link } from 'react-router-dom';
import SearchBox from './components/SearchBox';
import TripCard from './components/TripCard';

const customerName = 'Nguyễn Văn A';
const upcomingTrips = [
  { id: 101, from: 'Quận 3', to: 'Quận 5', date: '15/10', time: '14:30', seat: 'B1', vehicle: '4 chỗ (carpool)', type: 'nội thành', carpool: true, passengers: 2, maxPassengers: 3, status: 'Đang ghép' },
  { id: 102, from: 'Hà Nội', to: 'Hải Phòng', date: '16/10', time: '07:00', seat: 'A2', vehicle: 'Giường nằm', type: 'liên tỉnh', carpool: false, status: 'Đã thanh toán' },
];
const trips = [
  { id: 1, from: 'Quận 8', to: 'Quận 1', time: '19:00 15/10', price: 60000, vehicle: 'Carpool 4 chỗ', seats: 1, type: 'nội thành', carpool: true, passengers: 1, maxPassengers: 3, status: 'Đang ghép' },
  { id: 2, from: 'Hà Nội', to: 'Vinh', time: '07:30 16/10', price: 220000, vehicle: 'Xe khách Cabin', seats: 14, type: 'liên tỉnh', carpool: false },
  { id: 3, from: 'Quận 7', to: 'Quận 2', time: '17:00 15/10', price: 70000, vehicle: 'Carpool 4 chỗ', seats: 0, type: 'nội thành', carpool: true, passengers: 3, maxPassengers: 3, status: 'Đã đủ ghép' },
  { id: 4, from: 'Huế', to: 'Đà Nẵng', time: '18:30 19/10', price: 135000, vehicle: 'Ghế ngồi', seats: 12, type: 'liên tỉnh', carpool: false },
];

const HomePage = () => (
  <div className="max-w-6xl mx-auto py-8 px-3">
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-1">Xin chào, {customerName} 👋</h2>
        <div className="text-gray-600">Chúc bạn một ngày vui vẻ và di chuyển an toàn cùng RideBooking!</div>
      </div>
      <div className="flex gap-3">
        <Link to="/booking" className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-semibold shadow">Đặt vé mới</Link>
        <Link to="/search" className="bg-white border border-green-600 text-green-700 px-4 py-2 rounded-lg font-semibold hover:bg-green-50">Tìm chuyến</Link>
      </div>
    </div>
    <section className="mb-10">
      <SearchBox />
    </section>
    <section className="mb-12">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-green-800">Chuyến đã đặt sắp đi</h3>
        <Link to="/my-bookings" className="text-green-700 hover:underline text-sm">Xem tất cả</Link>
      </div>
      {upcomingTrips.length ? (
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-xl shadow text-sm">
            <thead className="bg-green-100 text-green-800">
              <tr>
                <th className="p-2">Tuyến</th><th>Ngày</th><th>Giờ</th><th>Ghế</th><th>Xe</th><th>Loại</th><th>Ghép chuyến</th><th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {upcomingTrips.map(t => (
                <tr key={t.id} className="border-b last:border-0">
                  <td className="p-2">{t.from} → {t.to}</td>
                  <td>{t.date}</td>
                  <td>{t.time}</td>
                  <td>{t.seat}</td>
                  <td>{t.vehicle}</td>
                  <td><span className={`px-2 py-1 rounded text-xs ${t.type==='nội thành'?'bg-blue-50 text-blue-700':'bg-indigo-100 text-indigo-600'}`}>{t.type}</span></td>
                  <td>{t.type==='nội thành' ? (t.carpool?`Ghép chuyến (${t.passengers}/${t.maxPassengers})`:'Chuyến riêng'):'-'}</td>
                  <td>
                    <span className={
                      t.status === 'Sắp đi' ? 'text-green-600' :
                      t.status === 'Chờ thanh toán' ? 'text-yellow-600' :
                      'text-gray-400'
                    }>
                      {t.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-gray-500 italic">Bạn chưa có chuyến nào sắp đi.</div>
      )}
    </section>
    <section>
      <h3 className="text-green-800 text-lg font-semibold mb-4">Gợi ý chuyến hot</h3>
      <div className="grid md:grid-cols-3 gap-6">
        {trips.map(t => <TripCard key={t.id} trip={t} />)}
      </div>
    </section>
    <section className="mt-14 bg-green-50 border-l-4 border-green-600 px-8 py-7 rounded-xl flex items-center gap-4 shadow-md">
      <span className="text-3xl mr-2">🎉</span>
      <span className="text-green-800 font-semibold">Siêu ưu đãi tháng 10: Giảm <span className="text-red-600">50%</span> chuyến đầu - Đặt ngay, ưu tiên vé đẹp!</span>
      <Link to="/promotions" className="ml-auto bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 font-semibold">Xem chi tiết</Link>
    </section>
  </div>
);

export default HomePage;
