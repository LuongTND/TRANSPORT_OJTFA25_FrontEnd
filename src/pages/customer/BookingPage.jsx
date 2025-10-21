import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import SeatMap from './components/SeatMap';
import tripApi from '../../api/tripApi';
import { getUserInfo } from '../../utils/mockAuth';
import { getMockTrip } from '../../data/mockTrips';


const BookingPage = () => {
  const [selected, setSelected] = useState([]);
  const [step, setStep] = useState(1);
  const [seats, setSeats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Load trip data từ URL params
  const tripId = searchParams.get('tripId') || '1';
  const [trip, setTrip] = useState(() => getMockTrip(tripId));

  const handleSelect = seat => {
    setSelected(sel => sel.includes(seat) ? sel.filter(s=>s!==seat) : [...sel, seat]);
  };


  // Load user info khi component mount
  useEffect(() => {
    const currentUser = getUserInfo();
    if (currentUser) {
      setUserInfo(currentUser);
      // Tự động điền form với thông tin user
      setFormData({
        fullName: currentUser.fullName || '',
        phone: currentUser.phone || '',
        email: currentUser.email || currentUser.username + '@example.com',
        note: ''
      });
    }
  }, []);

  // Cập nhật trip khi URL thay đổi
  useEffect(() => {
    const newTripId = searchParams.get('tripId') || '1';
    const newTrip = getMockTrip(newTripId);
    setTrip(newTrip);
    console.log('Trip updated:', { tripId: newTripId, trip: newTrip });
  }, [searchParams]);

  useEffect(() => {
    const loadSeats = async () => {
      setLoading(true);
      setError('');
      try {
        // Load seat data from /api/tripseats
        const res = await tripApi.getTripSeats(tripId);
        const data = Array.isArray(res?.data) ? res.data : Array.isArray(res) ? res : [];
        
        // Normalize theo database schema: ưu tiên SeatNo, IsBooked
        const normalized = data.map(s => ({ 
          seatNo: s.SeatNo || s.seatNo || s, 
          isBooked: !!(s.IsBooked ?? s.isBooked) 
        }));
        
        setSeats(normalized);
      } catch (e) {
        console.error('Error loading seats:', e);
        setError(e?.response?.data?.message || 'Không tải được sơ đồ ghế (đang hiển thị mẫu)');
        setSeats([]); // SeatMap sẽ dùng fallback layout
      } finally {
        setLoading(false);
      }
    };
    loadSeats();
  }, [tripId]);

  // Xác định loại booking dựa trên loại xe
  const bookingType = useMemo(() => {
    const capacity = trip.seatCapacity || 16;
    // Chỉ xe khách lớn (30+ chỗ) mới cần chọn ghế cụ thể
    if (capacity >= 30) {
      return 'seat_selection';
    }
    // Xe nhỏ (4, 7, 16 chỗ) chỉ cần chọn số lượng hành khách
    return 'passenger_count';
  }, [trip.seatCapacity]);

  // Số lượng hành khách cho xe nhỏ
  const [passengerCount, setPassengerCount] = useState(1);
  
  // Thông tin user đã đăng nhập
  const [userInfo, setUserInfo] = useState(null);
  
  // Form data cho step 2
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    note: ''
  });

  const canContinue = useMemo(() => {
    if (bookingType === 'seat_selection') {
      return selected.length > 0;
    } else {
      return passengerCount > 0 && passengerCount <= (trip.seatCapacity || 4);
    }
  }, [selected.length, passengerCount, bookingType, trip.seatCapacity]);

  // Xác định có cần điền form thông tin không
  const needsFormInfo = useMemo(() => {
    const ticketCount = bookingType === 'seat_selection' ? selected.length : passengerCount;
    return ticketCount > 1; // Nếu đặt nhiều hơn 1 vé thì cần điền form
  }, [selected.length, passengerCount, bookingType]);

  const totalPrice = useMemo(() => {
    const count = bookingType === 'seat_selection' ? selected.length : passengerCount;
    return count * trip.price;
  }, [selected.length, passengerCount, bookingType, trip.price]);

  const handleContinue = () => {
    if (canContinue) {
      // Nếu đặt 1 vé và đã đăng nhập -> chuyển thẳng thanh toán
      if (!needsFormInfo && userInfo) {
        handleDirectPayment();
      } else {
        // Nếu đặt nhiều vé hoặc chưa đăng nhập -> điền form
        setStep(2);
      }
    }
  };

  const handleDirectPayment = () => {
    const ticketCount = bookingType === 'seat_selection' ? selected.length : passengerCount;
    console.log('Direct payment for 1 ticket:', {
      trip,
      selectedSeats: bookingType === 'seat_selection' ? selected : [],
      passengerCount: bookingType === 'passenger_count' ? passengerCount : 0,
      userInfo: userInfo,
      totalPrice
    });
    
    // Chuyển đến trang thanh toán
    alert(`Chuyển đến thanh toán cho ${ticketCount} vé. Tổng tiền: ${totalPrice.toLocaleString()}đ`);
    navigate('/payment');
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    } else {
      navigate(-1);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmitBooking = (e) => {
    e.preventDefault();
    // TODO: Submit booking to API
    console.log('Booking data:', {
      trip,
      selectedSeats: bookingType === 'seat_selection' ? selected : [],
      passengerCount: bookingType === 'passenger_count' ? passengerCount : 0,
      userInfo: formData,
      totalPrice
    });
    
    // Show success message
    alert('Đặt vé thành công! Bạn sẽ nhận được thông báo xác nhận qua email.');
    navigate('/my-bookings');
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="mb-6">
        <button 
          onClick={handleBack}
          className="mb-4 text-green-600 hover:text-green-700 font-medium flex items-center gap-2"
        >
          ← Quay lại
        </button>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Đặt vé chuyến: {trip.from} → {trip.to}
        </h1>
        <p className="text-gray-600">Chọn ghế và xác nhận thông tin để hoàn tất đặt vé</p>
      </div>

      {/* Trip Info Card */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border-l-4 border-green-500">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Thông tin chuyến</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Tuyến:</span>
                <span className="font-semibold text-green-700">{trip.route}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Thời gian:</span>
                <span className="font-semibold">{trip.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Phương tiện:</span>
                <span className="font-semibold">{trip.vehicleType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Thời gian di chuyển:</span>
                <span className="font-semibold">{trip.duration}</span>
              </div>
            </div>
          </div>
    <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Giá vé</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Giá mỗi ghế:</span>
                <span className="font-semibold">{trip.price.toLocaleString()}đ</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">
                  {bookingType === 'seat_selection' ? 'Số ghế đã chọn:' : 'Số hành khách:'}
                </span>
                <span className="font-semibold text-green-700">
                  {bookingType === 'seat_selection' ? selected.length : passengerCount}
                </span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between text-lg">
                <span className="font-bold text-gray-900">Tổng cộng:</span>
                <span className="font-bold text-green-700">{totalPrice.toLocaleString()}đ</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {step === 1 && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              {bookingType === 'seat_selection' ? 'Chọn ghế' : 'Chọn số lượng hành khách'}
            </h2>
            <div className="flex items-center justify-between">
              <p className="text-gray-600">
                {bookingType === 'seat_selection' 
                  ? 'Vui lòng chọn ghế mong muốn (tối đa 2 ghế)'
                  : `Vui lòng chọn số lượng hành khách (tối đa ${trip.seatCapacity || 4} người)`
                }
              </p>
              <div className="text-sm">
                <span className="text-gray-600">
                  {bookingType === 'seat_selection' ? 'Đã chọn:' : 'Số người:'}
                </span>
                <span className="ml-2 font-bold text-green-700">
                  {bookingType === 'seat_selection' 
                    ? `${selected.length}/2 ghế` 
                    : `${passengerCount}/${trip.seatCapacity || 4} người`
                  }
                </span>
              </div>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center">
                <span className="text-red-500 mr-2">⚠️</span>
                <span className="text-red-700 text-sm">{error}</span>
              </div>
            </div>
          )}

          {bookingType === 'seat_selection' ? (
            // Hiển thị sơ đồ ghế cho xe khách lớn
            loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                <p className="mt-4 text-gray-600">Đang tải sơ đồ ghế...</p>
              </div>
            ) : (
              <div className="flex justify-center mb-8">
                <SeatMap seats={seats} selected={selected} onSelect={handleSelect} max={2} />
              </div>
            )
          ) : (
            // Hiển thị chọn số lượng hành khách cho xe nhỏ
            <div className="flex justify-center mb-8">
              <div className="bg-gray-50 rounded-xl p-8 border-2 border-gray-200">
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">🚗</div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {trip.vehicleType || 'Xe riêng'}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Xe {trip.seatCapacity || 4} chỗ - Không cần chọn ghế cụ thể
                  </p>
                </div>
                
                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={() => setPassengerCount(Math.max(1, passengerCount - 1))}
                    className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-600 font-bold"
                    disabled={passengerCount <= 1}
                  >
                    -
                  </button>
                  
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-700">{passengerCount}</div>
                    <div className="text-sm text-gray-600">hành khách</div>
                  </div>
                  
                  <button
                    onClick={() => setPassengerCount(Math.min(trip.seatCapacity || 4, passengerCount + 1))}
                    className="w-10 h-10 rounded-full bg-green-600 hover:bg-green-700 flex items-center justify-center text-white font-bold"
                    disabled={passengerCount >= (trip.seatCapacity || 4)}
                  >
                    +
                  </button>
                </div>
                
                <div className="text-center mt-4 text-sm text-gray-500">
                  Tối đa {trip.seatCapacity || 4} người
                </div>
              </div>
            </div>
          )}

          {((bookingType === 'seat_selection' && selected.length > 0) || 
            (bookingType === 'passenger_count' && passengerCount > 0)) && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">
                {bookingType === 'seat_selection' ? 'Ghế đã chọn:' : 'Thông tin đặt vé:'}
              </h3>
              <div className="flex flex-wrap gap-2">
                {bookingType === 'seat_selection' ? (
                  selected.map(seat => (
                    <span key={seat} className="px-3 py-1 bg-green-600 text-white rounded-full text-sm font-medium">
                      {seat}
                    </span>
                  ))
                ) : (
                  <span className="px-3 py-1 bg-green-600 text-white rounded-full text-sm font-medium">
                    {passengerCount} hành khách
                  </span>
                )}
              </div>
              
              {/* Thông báo logic đặt vé */}
              {!needsFormInfo && userInfo && (
                <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-blue-600">ℹ️</span>
                    <span className="text-sm text-blue-800">
                      Đặt 1 vé 
                    </span>
                  </div>
                </div>
              )}
              
              {needsFormInfo && (
                <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-600">⚠️</span>
                    <span className="text-sm text-yellow-800">
                      Đặt nhiều vé - cần điền thông tin chi tiết cho từng hành khách
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="flex justify-end">
            <button 
              className={`px-8 py-3 rounded-lg font-semibold transition-colors ${
                canContinue 
                  ? 'bg-green-600 hover:bg-green-700 text-white' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              disabled={!canContinue} 
              onClick={handleContinue}
            >
              {!needsFormInfo && userInfo ? 'Thanh toán' : 'Tiếp tục'} ({totalPrice.toLocaleString()}đ)
            </button>
          </div>
        </div>
      )}
      {step === 2 && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Xác nhận thông tin đặt vé</h2>
            <p className="text-gray-600">Vui lòng kiểm tra và điền đầy đủ thông tin để hoàn tất đặt vé</p>
          </div>

          {/* User Info Display */}
          {userInfo ? (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center mb-2">
                <span className="text-blue-600 mr-2">👤</span>
                <h3 className="font-semibold text-blue-800">Thông tin đăng nhập</h3>
              </div>
              <p className="text-sm text-blue-700">
                Đang đăng nhập với tài khoản: <strong>{userInfo.fullName || userInfo.username}</strong>
              </p>
            </div>
          ) : (
            <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center mb-2">
                <span className="text-yellow-600 mr-2">⚠️</span>
                <h3 className="font-semibold text-yellow-800">Thông tin đặt vé</h3>
              </div>
              <p className="text-sm text-yellow-700">
                Bạn đã đăng nhập với tài khoản customer. Vui lòng điền thông tin bên dưới để hoàn tất đặt vé.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmitBooking} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Họ và tên *</label>
                <input 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" 
                  placeholder="Nhập họ và tên" 
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  required 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Số điện thoại *</label>
                <input 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" 
                  placeholder="Nhập số điện thoại" 
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  required 
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
              <input 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" 
                placeholder="Nhập email" 
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required 
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ghi chú (tùy chọn)</label>
              <textarea 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" 
                placeholder="Ghi chú thêm cho chuyến đi..."
                rows="3"
                value={formData.note}
                onChange={(e) => handleInputChange('note', e.target.value)}
              />
            </div>

            {/* Booking Summary */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Tóm tắt đặt vé</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Chuyến:</span>
                  <span className="font-medium">{trip.from} → {trip.to}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Thời gian:</span>
                  <span className="font-medium">{trip.time}</span>
                </div>
                {bookingType === 'seat_selection' ? (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Ghế đã chọn:</span>
                      <span className="font-medium text-green-700">{selected.join(', ')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Số ghế:</span>
                      <span className="font-medium">{selected.length} ghế</span>
                    </div>
                  </>
                ) : (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Số hành khách:</span>
                    <span className="font-medium text-green-700">{passengerCount} người</span>
                  </div>
                )}
                <hr className="my-2" />
                <div className="flex justify-between text-lg font-bold">
                  <span>Tổng cộng:</span>
                  <span className="text-green-700">{totalPrice.toLocaleString()}đ</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button 
                type="button"
                onClick={handleBack}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold transition-colors"
              >
                Quay lại
              </button>
              <button 
                type="submit"
                className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
              >
                Xác nhận đặt vé
              </button>
            </div>
        </form>
        </div>
      )}
    </div>
  );
};
export default BookingPage;
