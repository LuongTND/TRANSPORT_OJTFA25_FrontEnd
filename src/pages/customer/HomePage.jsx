import React from 'react';
import { Link } from 'react-router-dom';
import SearchBox from './components/SearchBox';
import TripCard from './components/TripCard';

const customerName = 'Nguyễn Văn A';
const upcomingTrips = [
  { id: 101, from: 'Thanh Khê', to: 'Hải Châu', date: '20/10', time: '14:30', seat: 'B1', vehicle: '4 chỗ', type: 'nội thành', carpool: true, passengers: 2, maxPassengers: 3, status: 'Đang ghép' },
  { id: 102, from: 'Sơn Trà', to: 'Liên Chiểu', date: '21/10', time: '09:00', seat: 'A2', vehicle: '7 chỗ', type: 'nội thành', carpool: true, passengers: 3, maxPassengers: 7, status: 'Đã thanh toán' },
];

const trips = [
  { id: 1, from: 'Cẩm Lệ', to: 'Thanh Khê', time: '19:00 20/10', price: 45000, vehicle: 'Carpool 4 chỗ', seats: 1, type: 'nội thành', carpool: true, passengers: 1, maxPassengers: 3, status: 'Đang ghép' },
  { id: 2, from: 'Hải Châu', to: 'Ngũ Hành Sơn', time: '07:30 21/10', price: 50000, vehicle: 'Carpool 7 chỗ', seats: 2, type: 'nội thành', carpool: true, passengers: 2, maxPassengers: 7, status: 'Đang ghép' },
  { id: 3, from: 'Sơn Trà', to: 'Hải Châu', time: '17:00 20/10', price: 55000, vehicle: 'Carpool 4 chỗ', seats: 0, type: 'nội thành', carpool: true, passengers: 4, maxPassengers: 4, status: 'Đã đủ ghép' },
];

const HomePage = () => (
  <div className="max-w-6xl mx-auto py-8 px-4">
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
      <div>
        <h2 className="text-3xl font-bold text-green-700 mb-1">Xin chào, {customerName} 👋</h2>
        <p className="text-gray-600">Chúc bạn một ngày vui vẻ và di chuyển an toàn cùng RideBooking!</p>
      </div>
      <div className="flex gap-3">
        <Link to="/booking" className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg font-semibold shadow transition-colors">Đặt vé mới</Link>
        <Link to="/search" className="bg-white border-2 border-green-600 text-green-700 px-5 py-2 rounded-lg font-semibold hover:bg-green-50 transition-colors">Tìm chuyến</Link>
      </div>
    </div>

    <section className="mb-10">
      <SearchBox />
    </section>

    <section className="mb-12">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-bold text-gray-900">Chuyến đã đặt sắp đi</h3>
        <Link to="/my-bookings" className="text-green-600 hover:text-green-700 font-semibold text-sm">Xem tất cả</Link>
      </div>
      {upcomingTrips.length ? (
        <div className="overflow-x-auto rounded-xl shadow">
          <table className="w-full bg-white text-sm">
            <thead className="bg-green-100 text-green-800">
              <tr>
                <th className="p-3 text-left font-semibold">Tuyến</th>
                <th className="p-3 text-center font-semibold">Ngày</th>
                <th className="p-3 text-center font-semibold">Giờ</th>
                <th className="p-3 text-center font-semibold">Ghế</th>
                <th className="p-3 text-left font-semibold">Xe</th>
                <th className="p-3 text-center font-semibold">Loại</th>
                <th className="p-3 text-center font-semibold">Ghép chuyến</th>
                <th className="p-3 text-center font-semibold">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {upcomingTrips.map((t, idx) => (
                <tr key={t.id} className={`border-b last:border-0 ${idx % 2 === 0 ? 'bg-white' : 'bg-green-50'} hover:bg-green-100 transition-colors`}>
                  <td className="p-3 font-semibold text-gray-900">{t.from} → {t.to}</td>
                  <td className="p-3 text-center text-gray-700">{t.date}</td>
                  <td className="p-3 text-center text-gray-700">{t.time}</td>
                  <td className="p-3 text-center font-mono font-bold text-green-700">{t.seat}</td>
                  <td className="p-3 text-gray-700">{t.vehicle}</td>
                  <td className="p-3 text-center">
                    <span className={`px-2.5 py-1 rounded text-xs font-semibold ${t.type === 'nội thành' ? 'bg-blue-100 text-blue-700' : 'bg-indigo-100 text-indigo-700'}`}>
                      {t.type}
                    </span>
                  </td>
                  <td className="p-3 text-center text-gray-700">
                    {t.carpool ? `Ghép (${t.passengers}/${t.maxPassengers})` : '–'}
                  </td>
                  <td className="p-3 text-center">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      t.status === 'Đã thanh toán' ? 'bg-green-100 text-green-700' :
                      t.status === 'Đang ghép' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {t.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-gray-500 italic p-4 bg-gray-50 rounded-lg">Bạn chưa có chuyến nào sắp đi.</div>
      )}
    </section>

    <section className="mb-14">
      <h3 className="text-2xl font-bold text-gray-900 mb-4">Gợi ý chuyến hot</h3>
      <div className="grid md:grid-cols-3 gap-6">
        {trips.map(t => <TripCard key={t.id} trip={t} />)}
      </div>
    </section>

    <section className="bg-green-50 border-l-4 border-green-600 px-8 py-7 rounded-xl flex flex-col sm:flex-row items-center gap-4 shadow">
      <span className="text-3xl">🎉</span>
      <span className="text-green-900 font-semibold text-center sm:text-left flex-1">
        Siêu ưu đãi tháng 10: Giảm <span className="text-red-600 font-bold">50%</span> chuyến đầu - Đặt ngay, ưu tiên vé đẹp!
      </span>
      <Link to="/promotions" className="sm:ml-auto bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 font-semibold transition-colors flex-shrink-0">
        Xem chi tiết
      </Link>
    </section>
  </div>
);

export default HomePage;