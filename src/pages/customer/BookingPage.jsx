import React, { useEffect, useMemo, useState } from 'react';
import SeatMap from './components/SeatMap';
import tripApi from '../../api/tripApi';

const trip = {
  from: 'Hà Nội', to: 'Sài Gòn', time: '07:00 15/10', vehicle: 'Limousine', price: 850000, seats: 11
};

const BookingPage = () => {
  const [selected, setSelected] = useState([]);
  const [step, setStep] = useState(1);
  const [seats, setSeats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSelect = seat => setSelected(sel => sel.includes(seat) ? sel.filter(s=>s!==seat) : [...sel, seat]);

  const getTripIdFromUrl = () => {
    try {
      const url = new URL(window.location.href);
      return url.searchParams.get('tripId');
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const loadSeats = async () => {
      setLoading(true);
      setError('');
      try {
        const tripId = getTripIdFromUrl() || 'demo-trip-1';
        const res = await tripApi.getTripSeats(tripId);
        const data = Array.isArray(res?.data) ? res.data : Array.isArray(res) ? res : [];
        // Normalize theo database schema: ưu tiên SeatNo, IsBooked
        const normalized = data.map(s => ({ 
          seatNo: s.SeatNo || s.seatNo || s, 
          isBooked: !!(s.IsBooked ?? s.isBooked) 
        }));
        setSeats(normalized);
      } catch (e) {
        console.error(e);
        setError(e?.response?.data?.message || 'Không tải được sơ đồ ghế (đang hiển thị mẫu)');
        setSeats([]); // SeatMap sẽ dùng fallback layout
      } finally {
        setLoading(false);
      }
    };
    loadSeats();
  }, []);

  const canContinue = useMemo(() => selected.length > 0, [selected]);

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
          {error && (
            <div className="mb-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">{error}</div>
          )}
          {loading ? (
            <div className="text-center text-sm text-gray-600">Đang tải sơ đồ ghế...</div>
          ) : (
            <SeatMap seats={seats} selected={selected} onSelect={handleSelect} max={2} />
          )}
          <button className="btn btn-success mt-5" disabled={!canContinue} onClick={()=>setStep(2)}>
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
