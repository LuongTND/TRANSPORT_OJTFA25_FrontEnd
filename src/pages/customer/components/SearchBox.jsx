import React, { useState } from 'react';

const locations = [
  'Hà Nội',
  'Đà Nẵng',
  'Hải Phòng',
  'Nha Trang',
  'Huế',
  'Sài Gòn',
  'Cần Thơ',
];

const SearchBox = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  return (
    <div className="bg-white shadow rounded-lg p-6 flex flex-col md:flex-row items-center gap-4">
      <select
        value={from}
        onChange={e => setFrom(e.target.value)}
        className="input input-bordered w-full md:w-48"
      >
        <option value="">Điểm đi</option>
        {locations.map((l) => (
          <option key={l} value={l}>{l}</option>
        ))}
      </select>
      <span className="mx-1 font-bold text-lg hidden md:inline">→</span>
      <select
        value={to}
        onChange={e => setTo(e.target.value)}
        className="input input-bordered w-full md:w-48"
      >
        <option value="">Điểm đến</option>
        {locations.map((l) => (
          <option key={l} value={l}>{l}</option>
        ))}
      </select>
      <input
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
        className="input input-bordered w-full md:w-40"
      />
      <button className="btn btn-primary w-full md:w-auto">Tìm chuyến</button>
    </div>
  );
};

export default SearchBox;
