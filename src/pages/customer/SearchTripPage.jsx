import React, { useState } from 'react';
import TripCard from './components/TripCard';
import SearchBox from './components/SearchBox';

const DATA = [
  { id: 1, from: 'Thanh Khê', to: 'Hải Châu', time: '07:00 20/10', price: 45000, vehicle: '4 chỗ', seats: 2, type: 'nội thành', carpool: true, passengers: 2, maxPassengers: 4, status: 'Đang ghép' },
  { id: 2, from: 'Thanh Khê', to: 'Hải Châu', time: '20:00 20/10', price: 50000, vehicle: '7 chỗ', seats: 3, type: 'nội thành', carpool: true, passengers: 4, maxPassengers: 7, status: 'Đang ghép' },
  { id: 3, from: 'Sơn Trà', to: 'Liên Chiểu', time: '08:30 21/10', price: 40000, vehicle: '4 chỗ', seats: 1, type: 'nội thành', carpool: true, passengers: 3, maxPassengers: 4, status: 'Đã đủ ghép' },
  { id: 4, from: 'Cẩm Lệ', to: 'Thanh Khê', time: '14:00 21/10', price: 35000, vehicle: '4 chỗ', seats: 2, type: 'nội thành', carpool: true, passengers: 1, maxPassengers: 4, status: 'Đang ghép' },
  { id: 5, from: 'Hoàn Kiếm', to: 'Cầu Giấy', time: '10:30 20/10', price: 48000, vehicle: '7 chỗ', seats: 1, type: 'nội thành', carpool: true, passengers: 5, maxPassengers: 7, status: 'Đang ghép' },
  { id: 6, from: 'Thanh Xuân', to: 'Hải Châu', time: '15:45 21/10', price: 55000, vehicle: '4 chỗ', seats: 0, type: 'nội thành', carpool: true, passengers: 4, maxPassengers: 4, status: 'Đã đủ ghép' },
];

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