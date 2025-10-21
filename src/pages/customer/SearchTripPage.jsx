import React, { useState } from 'react';
import TripCard from './components/TripCard';
import SearchBox from './components/SearchBox';
import { mockTripsArray } from '../../data/mockTrips';

const DATA = mockTripsArray;

const SearchTripPage = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [sortBy, setSortBy] = useState('price-low');

  const filtered = DATA.filter(t =>
    (!from || t.from.toLowerCase().includes(from.toLowerCase())) &&
    (!to || t.to.toLowerCase().includes(to.toLowerCase())) &&
    (!date || t.time.includes(date))
  );

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'time') return a.time.localeCompare(b.time);
    return 0;
  });

  const handleReset = () => {
    setFrom('');
    setTo('');
    setDate('');
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Tìm kiếm chuyến xe</h1>
        <p className="text-gray-600">Khám phá hàng ngàn chuyến xe phù hợp với bạn</p>
      </div>

      {/* Search Box */}
      <section className="mb-8">
        <SearchBox />
      </section>

      {/* Results Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900">
          Kết quả tìm kiếm 
          <span className="text-green-600 ml-2">({sorted.length})</span>
        </h2>
        <div className="flex items-center gap-2">
          <label className="text-sm font-semibold text-gray-700">Sắp xếp:</label>
          <select 
            className="select select-bordered select-sm"
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
          >
            <option value="price-low">Giá thấp nhất</option>
            <option value="price-high">Giá cao nhất</option>
            <option value="time">Thời gian</option>
          </select>
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sorted.length > 0 ? (
          sorted.map(trip => (
            <TripCard key={trip.id} trip={trip} />
          ))
        ) : (
          <div className="col-span-full text-center py-16">
            <p className="text-gray-500 text-lg font-semibold mb-2">Không tìm thấy chuyến phù hợp</p>
            <p className="text-gray-400 mb-6">Thử thay đổi các tiêu chí tìm kiếm của bạn</p>
            <button 
              onClick={handleReset}
              className="btn btn-success"
            >
              Xóa bộ lọc
            </button>
          </div>
        )}
      </div>

      {/* Info Section */}
      {sorted.length > 0 && (
        <div className="mt-12 bg-green-50 rounded-lg p-6 border-l-4 border-green-600">
          <h3 className="text-lg font-bold text-gray-900 mb-2">Hỗ trợ khách hàng</h3>
          <p className="text-gray-600 mb-4">Nếu có bất kỳ câu hỏi nào hoặc cần hỗ trợ, vui lòng liên hệ với chúng tôi.</p>
          <button className="btn btn-success btn-outline btn-sm">Liên hệ hỗ trợ</button>
        </div>
      )}
    </div>
  );
};

export default SearchTripPage;