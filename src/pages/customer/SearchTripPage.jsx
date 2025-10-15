import React, { useState } from 'react';
import TripCard from './components/TripCard';
const DATA = [
  { id: 1, from: 'Hà Nội', to: 'Sài Gòn', time: '07:00 15/10', price: 850000, vehicle: 'Limousine', seats: 5 },
  { id: 2, from: 'Hà Nội', to: 'Sài Gòn', time: '20:00 16/10', price: 870000, vehicle: 'Giường nằm', seats: 12 },
  { id: 3, from: 'Hà Nội', to: 'Huế', time: '08:30 18/10', price: 450000, vehicle: 'Ghế ngồi', seats: 29 },
];
const SearchTripPage = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const filtered = DATA.filter(t =>
    (!from || t.from === from) &&
    (!to || t.to === to) &&
    (!date || t.time.includes(date))
  );
  return (
    <div>
      <h1 className="text-xl font-bold text-green-800 mb-6">Kết quả tìm chuyến</h1>
      <div className="flex gap-2 mb-6">
        <input className="input input-bordered w-32" placeholder="Điểm đi" value={from} onChange={e=>setFrom(e.target.value)} />
        <input className="input input-bordered w-32" placeholder="Điểm đến" value={to} onChange={e=>setTo(e.target.value)} />
        <input className="input input-bordered w-36" placeholder="Ngày" value={date} onChange={e=>setDate(e.target.value)} />
        <button className="btn btn-success">Lọc</button>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {filtered.length ? filtered.map(trip=>(<TripCard trip={trip} key={trip.id} />)) : <div className="text-gray-400 mt-4">Không tìm thấy chuyến phù hợp.</div>}
      </div>
    </div>
  );
};
export default SearchTripPage;
