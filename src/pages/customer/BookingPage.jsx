import React, { useState } from 'react';
import SeatMap from './components/SeatMap';

const trip = {
  from: 'Hà Nội', to: 'Sài Gòn', time: '07:00 15/10', vehicle: 'Limousine', price: 850000, seats: 11
};

const BookingPage = () => {
  const [selected, setSelected] = useState([]);
  const [step, setStep] = useState(1);
  const handleSelect = seat => setSelected(sel => sel.includes(seat) ? sel.filter(s=>s!==seat) : [...sel, seat]);
  return (
    <div>
      <h1 className="text-xl font-bold text-green-800 mb-4">Đặt vé chuyến: {trip.from} → {trip.to}</h1>
      <div className="bg-white rounded shadow mb-6 p-4">
        <span className="font-semibold text-green-700">Xe: {trip.vehicle} </span>&nbsp;|&nbsp;
        <span className="text-gray-600">Giờ: {trip.time} </span>&nbsp;|&nbsp;
        <span className="text-green-700 font-bold">Giá: {trip.price.toLocaleString()}đ</span>
      </div>
      {step === 1 && (
        <div>
          <div className="mb-3 font-bold flex items-center justify-between">
            <span>Chọn ghế</span> <span className="text-green-700">{selected.length}/2 ghế</span>
          </div>
          <SeatMap selected={selected} onSelect={handleSelect} max={2} />
          <button className="btn btn-success mt-5" disabled={!selected.length} onClick={()=>setStep(2)}>
            Tiếp tục</button>
        </div>
      )}
      {step === 2 && (
        <form className="space-y-4 max-w-md mx-auto">
          <div className="font-semibold text-green-700">Xác nhận thông tin đặt vé</div>
          <input className="input input-bordered w-full" placeholder="Họ tên" required />
          <input className="input input-bordered w-full" placeholder="Số điện thoại" required />
          <input className="input input-bordered w-full" placeholder="Email" required />
          <div className="font-semibold">Ghế đã chọn: <span className="text-green-700">{selected.join(', ')}</span></div>
          <button className="btn btn-success w-full">Xác nhận đặt vé</button>
        </form>
      )}
    </div>
  );
};
export default BookingPage;
