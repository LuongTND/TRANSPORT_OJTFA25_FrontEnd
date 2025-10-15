import React from 'react';
const trip = {
  from: 'Hà Nội', to: 'Sài Gòn', time: '07:00 15/10', vehicle: 'Limousine', driver: 'Trần Văn E', seatsLeft: 6, price: 850000
};
const TripDetailPage = () => (
  <div className="max-w-2xl mx-auto">
    <h1 className="text-2xl font-bold text-green-800 mb-3">Chi tiết chuyến xe</h1>
    <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-4 mb-8">
      <div className="flex gap-6 items-center">
        <div className="min-w-[100px]">
          <div className="text-green-700 font-bold text-lg">{trip.from} → {trip.to}</div>
          <div className="text-gray-500 mt-1">{trip.time}</div>
        </div>
        <div className="flex-1">
          <div>Xe: <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-semibold">{trip.vehicle}</span></div>
          <div>Tài xế: <span className="font-semibold">{trip.driver}</span></div>
          <div>Còn lại: <span className="text-green-700 font-bold">{trip.seatsLeft}</span> ghế</div>
        </div>
        <div className="text-xl font-extrabold text-green-700">{trip.price.toLocaleString()}đ</div>
      </div>
      <a href="/booking" className="btn btn-success w-full mt-3">Đặt vé ngay</a>
    </div>
  </div>
)
export default TripDetailPage;
