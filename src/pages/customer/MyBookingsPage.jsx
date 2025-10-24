import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserInfo } from '../../utils/mockAuth';
import bookingApi from '../../api/bookingApi';
import { getMockTrip } from '../../data/mockTrips';

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const navigate = useNavigate();

  // Mock booking data - trong thực tế sẽ load từ API
  const mockBookings = [
    {
      id: 1,
      tripId: 1,
      route: 'Đà Nẵng → Hội An',
      from: 'Đà Nẵng',
      to: 'Hội An',
      time: '07:00 15/10/2024',
      date: '2024-10-15',
      seat: 'A1,A2',
      seats: ['A1', 'A2'],
      price: 120000,
      totalPrice: 240000,
      status: 'Đã thanh toán',
      bookingType: 'seat_selection',
      vehicleInfo: 'Xe 16 chỗ - 51B-12345',
      driverInfo: 'Nguyễn Văn A',
      phone: '0901234567',
      createdAt: '2024-10-10T10:00:00Z',
      paymentMethod: 'Momo',
      canCancel: false,
      canRate: true,
      canTrack: false
    },
    {
      id: 2,
      tripId: 9,
      route: 'Đà Nẵng → Huế',
      from: 'Đà Nẵng',
      to: 'Huế',
      time: '16:00 18/10/2024',
      date: '2024-10-18',
      seat: 'B3',
      seats: ['B3'],
      price: 120000,
      totalPrice: 120000,
      status: 'Chờ thanh toán',
      bookingType: 'seat_selection',
      vehicleInfo: 'Xe 45 chỗ - 43A-67890',
      driverInfo: 'Trần Văn B',
      phone: '0907654321',
      createdAt: '2024-10-15T14:30:00Z',
      paymentMethod: 'VNPay',
      canCancel: true,
      canRate: false,
      canTrack: false
    },
    {
      id: 3,
      tripId: 5,
      route: 'Đà Nẵng → Quảng Nam',
      from: 'Đà Nẵng',
      to: 'Quảng Nam',
      time: '22:15 13/11/2024',
      date: '2024-11-13',
      seat: 'C2',
      seats: ['C2'],
      price: 150000,
      totalPrice: 150000,
      status: 'Đã hủy',
      bookingType: 'passenger_count',
      vehicleInfo: 'Xe 7 chỗ - 43C-11111',
      driverInfo: 'Lê Văn C',
      phone: '0909876543',
      createdAt: '2024-11-10T20:00:00Z',
      paymentMethod: 'ZaloPay',
      canCancel: false,
      canRate: false,
      canTrack: false
    }
  ];

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      setLoading(true);
      // TODO: Thay thế bằng API call thực tế
      // const response = await bookingApi.getMyBookings();
      // setBookings(response.data);
      
      // Sử dụng mock data
      setBookings(mockBookings);
    } catch (err) {
      setError('Không thể tải danh sách đặt vé');
      console.error('Error loading bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Đã thanh toán':
        return 'text-green-700 bg-green-100';
      case 'Chờ thanh toán':
        return 'text-yellow-700 bg-yellow-100';
      case 'Đã hủy':
        return 'text-red-700 bg-red-100';
      case 'Hoàn thành':
        return 'text-blue-700 bg-blue-100';
      default:
        return 'text-gray-700 bg-gray-100';
    }
  };

  const handleViewTicket = (booking) => {
    // Navigate to ticket detail or print ticket
    console.log('View ticket:', booking);
    alert(`Xem vé đặt chỗ ${booking.id}\nTuyến: ${booking.route}\nGhế: ${booking.seat}`);
  };

  const handleCancelBooking = async (bookingId) => {
    if (window.confirm('Bạn có chắc chắn muốn hủy vé này?')) {
      try {
        // TODO: Call API to cancel booking
        // await bookingApi.cancelBooking(bookingId);
        
        // Update local state
        setBookings(prev => prev.map(b => 
          b.id === bookingId 
            ? { ...b, status: 'Đã hủy', canCancel: false }
            : b
        ));
        
        alert('Đã hủy vé thành công!');
      } catch (err) {
        alert('Không thể hủy vé. Vui lòng thử lại!');
        console.error('Error canceling booking:', err);
      }
    }
  };

  const handleRateTrip = (booking) => {
    navigate(`/rating?bookingId=${booking.id}&tripId=${booking.tripId}`);
  };

  const handleTrackTrip = (booking) => {
    navigate(`/tracking?bookingId=${booking.id}&tripId=${booking.tripId}`);
  };

  const handlePayBooking = (booking) => {
    navigate(`/payment?bookingId=${booking.id}&amount=${booking.totalPrice}`);
  };

  const filteredBookings = statusFilter 
    ? bookings.filter(b => b.status === statusFilter)
    : bookings;

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto py-8 px-4">
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="loading loading-spinner loading-lg text-green-600"></div>
            <p className="mt-4 text-gray-600">Đang tải danh sách đặt vé...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Lịch sử đặt vé của tôi</h1>
        <p className="text-gray-600">Quản lý và theo dõi các chuyến đi đã đặt</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">Lọc theo trạng thái:</label>
            <select 
              className="select select-bordered select-sm"
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">Tất cả trạng thái</option>
              <option value="Chờ thanh toán">Chờ thanh toán</option>
              <option value="Đã thanh toán">Đã thanh toán</option>
              <option value="Hoàn thành">Hoàn thành</option>
              <option value="Đã hủy">Đã hủy</option>
            </select>
          </div>
          
          <div className="flex gap-2">
            <button 
              className="btn btn-sm btn-outline"
              onClick={() => setStatusFilter('')}
            >
              Xóa bộ lọc
            </button>
            <button 
              className="btn btn-sm btn-success"
              onClick={loadBookings}
            >
              Làm mới
            </button>
          </div>
        </div>
      </div>

      {/* Bookings List */}
      {error ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <div className="text-red-600 font-medium mb-2">Lỗi tải dữ liệu</div>
          <p className="text-red-500 text-sm mb-4">{error}</p>
          <button 
            className="btn btn-sm btn-outline btn-error"
            onClick={loadBookings}
          >
            Thử lại
          </button>
        </div>
      ) : filteredBookings.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-12 text-center">
          <div className="text-gray-400 text-6xl mb-4">🎫</div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">Chưa có vé nào</h3>
          <p className="text-gray-500 mb-6">Bạn chưa đặt vé nào. Hãy tìm chuyến đi phù hợp!</p>
          <button 
            className="btn btn-success"
            onClick={() => navigate('/')}
          >
            Tìm chuyến đi
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <div key={booking.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {/* Booking Header */}
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{booking.route}</h3>
                    <p className="text-sm text-gray-600">
                      {booking.time} • {booking.vehicleInfo}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                    <p className="text-sm text-gray-500 mt-1">
                      Mã đặt vé: #{booking.id}
                    </p>
                  </div>
                </div>
              </div>

              {/* Booking Details */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Trip Info */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Thông tin chuyến</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p><span className="font-medium">Từ:</span> {booking.from}</p>
                      <p><span className="font-medium">Đến:</span> {booking.to}</p>
                      <p><span className="font-medium">Ngày:</span> {booking.date}</p>
                      <p><span className="font-medium">Ghế:</span> {booking.seat}</p>
                    </div>
                  </div>

                  {/* Driver Info */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Tài xế</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p><span className="font-medium">Tên:</span> {booking.driverInfo}</p>
                      <p><span className="font-medium">SĐT:</span> {booking.phone}</p>
                    </div>
                  </div>

                  {/* Payment Info */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Thanh toán</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p><span className="font-medium">Giá vé:</span> {booking.price.toLocaleString()}đ</p>
                      <p><span className="font-medium">Tổng cộng:</span> {booking.totalPrice.toLocaleString()}đ</p>
                      <p><span className="font-medium">Phương thức:</span> {booking.paymentMethod}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Thao tác</h4>
                    <div className="space-y-2">
                      <button 
                        className="btn btn-sm btn-outline btn-success w-full"
                        onClick={() => handleViewTicket(booking)}
                      >
                        Xem vé
                      </button>
                      
                      {booking.canCancel && (
                        <button 
                          className="btn btn-sm btn-outline btn-error w-full"
                          onClick={() => handleCancelBooking(booking.id)}
                        >
                          Hủy vé
                        </button>
                      )}
                      
                      {booking.status === 'Chờ thanh toán' && (
                        <button 
                          className="btn btn-sm btn-success w-full"
                          onClick={() => handlePayBooking(booking)}
                        >
                          Thanh toán
                        </button>
                      )}
                      
                      {booking.canRate && (
                        <button 
                          className="btn btn-sm btn-outline btn-warning w-full"
                          onClick={() => handleRateTrip(booking)}
                        >
                          Đánh giá
                        </button>
                      )}
                      
                      {booking.canTrack && (
                        <button 
                          className="btn btn-sm btn-outline btn-info w-full"
                          onClick={() => handleTrackTrip(booking)}
                        >
                          Theo dõi
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookingsPage;
