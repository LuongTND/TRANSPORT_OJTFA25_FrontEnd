import React from 'react';
import { Link } from 'react-router-dom';
import SearchBox from './components/SearchBox';
import TripCard from './components/TripCard';
import { mockTripsArray } from '../../data/mockTrips';

const customerName = 'Nguyễn Văn A';
const upcomingTrips = [
  { id: 101, from: 'Thanh Khê', to: 'Hải Châu', date: '20/10', time: '14:30', seat: 'B1', vehicle: '4 chỗ', type: 'nội thành', carpool: true, passengers: 2, maxPassengers: 3, status: 'Đang ghép' },
  { id: 102, from: 'Sơn Trà', to: 'Liên Chiểu', date: '21/10', time: '09:00', seat: 'A2', vehicle: '7 chỗ', type: 'nội thành', carpool: true, passengers: 3, maxPassengers: 7, status: 'Đã thanh toán' },
];

// Chỉ hiển thị các tuyến nội thành (id 1-8)
const trips = mockTripsArray.filter(trip => trip.id <= 8);

const HomePage = () => (
  <div className="max-w-6xl mx-auto py-8 px-4">
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
      <div>
        <h2 className="text-3xl font-bold text-green-700 mb-1">Xin chào, {customerName} 👋</h2>
        <p className="text-gray-600">Di chuyển nội thành Đà Nẵng an toàn và tiết kiệm cùng RideBooking!</p>
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
      <h3 className="text-2xl font-bold text-gray-900 mb-4">Các tuyến nội thành Đà Nẵng</h3>
      <div className="grid md:grid-cols-3 gap-6">
        {trips.map(t => <TripCard key={t.id} trip={t} />)}
      </div>
    </section>

    {/* Section cho xe lớn - test chọn ghế */}
    <section className="mb-14">
      <h3 className="text-2xl font-bold text-gray-900 mb-4">Tuyến liên tỉnh - Xe lớn (Test chọn ghế)</h3>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-5 flex flex-col gap-2 border-l-8 border-blue-500">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-bold text-gray-900">Đà Nẵng → Huế</h4>
              <p className="text-gray-600 text-sm">08:00 - 22/10/2024</p>
              <p className="text-gray-500 text-xs">Xe khách 45 chỗ • 2 giờ 30 phút</p>
            </div>
            <span className="text-gray-400 text-xs">Còn 15 ghế</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xl font-extrabold text-blue-700">120.000đ</span>
            <Link 
              to="/booking?tripId=9" 
              className="btn btn-primary px-4 py-2 rounded font-semibold hover:bg-blue-700 transition-colors bg-blue-600 text-white"
            >
              Đặt vé
            </Link>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-5 flex flex-col gap-2 border-l-8 border-purple-500">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-bold text-gray-900">Đà Nẵng → Hội An</h4>
              <p className="text-gray-600 text-sm">09:30 - 22/10/2024</p>
              <p className="text-gray-500 text-xs">Xe khách 30 chỗ • 1 giờ 15 phút</p>
            </div>
            <span className="text-gray-400 text-xs">Còn 8 ghế</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xl font-extrabold text-purple-700">80.000đ</span>
            <Link 
              to="/booking?tripId=10" 
              className="btn btn-primary px-4 py-2 rounded font-semibold hover:bg-purple-700 transition-colors bg-purple-600 text-white"
            >
              Đặt vé
            </Link>
          </div>
        </div>
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