import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RatingDisplay from '../common/components/RatingDisplay';

const RatingPage = () => {
  const [star, setStar] = useState(0);
  const [text, setText] = useState('');
  const [sent, setSent] = useState(false);
  const [hoveredStar, setHoveredStar] = useState(0);
  const navigate = useNavigate();

  // Mock booking data
  const bookingData = {
    bookingId: '#12345',
    route: 'Sân bay Đà Nẵng - Mỹ Khê',
    date: '15/10/2025',
    driver: 'Nguyễn Văn A',
    vehicle: 'Xe 7 chỗ - 51A-12345',
    driverRating: 4.5,
    driverTotalReviews: 23
  };

  const starLabels = {
    1: 'Rất tệ',
    2: 'Tệ',
    3: 'Trung bình',
    4: 'Tốt',
    5: 'Xuất sắc'
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!star || !text.trim()) {
      alert('Vui lòng chọn số sao và nhập đánh giá');
      return;
    }
    
    // TODO: Call API to submit rating
    console.log('Submit rating:', { star, text, bookingId: bookingData.bookingId });
    setSent(true);
  };

  const handleGoBack = () => {
    navigate('/my-bookings');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button 
            onClick={handleGoBack}
            className="mb-4 text-green-600 hover:text-green-700 font-medium flex items-center gap-2"
          >
            ← Quay lại
          </button>
          <h1 className="text-3xl font-bold text-green-800 mb-2">Đánh giá chuyến đi</h1>
          <p className="text-gray-600">Chia sẻ trải nghiệm của bạn để giúp chúng tôi cải thiện dịch vụ</p>
        </div>

        {/* Booking Info Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border-l-4 border-green-500">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Thông tin chuyến đi</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Mã chuyến:</span>
              <span className="font-semibold text-green-700">{bookingData.bookingId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tuyến:</span>
              <span className="font-semibold">{bookingData.route}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Ngày:</span>
              <span className="font-semibold">{bookingData.date}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Tài xế:</span>
              <div className="flex items-center gap-2">
                <span className="font-semibold">{bookingData.driver}</span>
                {bookingData.driverRating && (
                  <RatingDisplay 
                    rating={bookingData.driverRating} 
                    totalReviews={bookingData.driverTotalReviews}
                    size="sm"
                  />
                )}
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Phương tiện:</span>
              <span className="font-semibold">{bookingData.vehicle}</span>
            </div>
          </div>
        </div>

        {/* Rating Form or Success Message */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          {sent ? (
            <div className="text-center py-8">
              {/* Success Animation */}
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4 animate-bounce">
                  <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-green-700 mb-2">Cảm ơn bạn đã đánh giá!</h3>
                <p className="text-gray-600 mb-4">Đánh giá của bạn rất quan trọng để chúng tôi cải thiện dịch vụ</p>
                
                {/* Review Summary */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 text-left">
                  <div className="flex items-center justify-center gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map(s => (
                      <span key={s} className="text-3xl text-yellow-500">
                        {s <= star ? '★' : '☆'}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-700 text-center italic">"{text}"</p>
                </div>
              </div>

              <div className="space-y-3">
                <button 
                  onClick={handleGoBack}
                  className="w-full py-3 px-6 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
                >
                  Xem lịch sử chuyến đi
                </button>
                <button 
                  onClick={() => navigate('/home')}
                  className="w-full py-3 px-6 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold transition-colors"
                >
                  Về trang chủ
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Star Rating */}
              <div>
                <label className="block text-lg font-bold text-gray-900 mb-3">
                  Bạn đánh giá chuyến đi này như thế nào?
                </label>
                <div className="flex flex-col items-center gap-3">
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map(s => (
                      <button
                        key={s}
                        type="button"
                        className={`text-5xl transition-all duration-200 transform hover:scale-110 ${
                          (hoveredStar || star) >= s ? 'text-yellow-500' : 'text-gray-300'
                        }`}
                        onClick={() => setStar(s)}
                        onMouseEnter={() => setHoveredStar(s)}
                        onMouseLeave={() => setHoveredStar(0)}
                        title={starLabels[s]}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                  {(hoveredStar || star) > 0 && (
                    <div className="text-lg font-semibold text-green-700 animate-fade-in">
                      {starLabels[hoveredStar || star]}
                    </div>
                  )}
                </div>
              </div>

              {/* Comment Section */}
              <div>
                <label className="block text-lg font-bold text-gray-900 mb-2">
                  Chia sẻ trải nghiệm của bạn
                </label>
                <textarea
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                  placeholder="Hãy chia sẻ chi tiết về trải nghiệm của bạn: thái độ tài xế, chất lượng xe, độ an toàn..."
                  rows="5"
                  value={text}
                  onChange={e => setText(e.target.value)}
                  maxLength={500}
                />
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-gray-500">Tối thiểu 10 ký tự</span>
                  <span className="text-xs text-gray-500">{text.length}/500</span>
                </div>
              </div>

              {/* Rating Categories (Optional) */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <h3 className="font-semibold text-gray-900 text-sm">Đánh giá chi tiết (tùy chọn)</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Thái độ tài xế:</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map(s => (
                        <span key={s} className="text-xs text-gray-400 cursor-pointer hover:text-yellow-500">★</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Chất lượng xe:</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map(s => (
                        <span key={s} className="text-xs text-gray-400 cursor-pointer hover:text-yellow-500">★</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Độ an toàn:</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map(s => (
                        <span key={s} className="text-xs text-gray-400 cursor-pointer hover:text-yellow-500">★</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Đúng giờ:</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map(s => (
                        <span key={s} className="text-xs text-gray-400 cursor-pointer hover:text-yellow-500">★</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Info Box */}
              {star > 0 && text.trim().length < 10 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <p className="text-sm text-yellow-800">
                      Vui lòng nhập ít nhất 10 ký tự để gửi đánh giá
                    </p>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={handleGoBack}
                  className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold transition-colors"
                >
                  Bỏ qua
                </button>
                <button
                  type="submit"
                  className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                    star > 0 && text.trim().length >= 10
                      ? 'bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  disabled={!star || text.trim().length < 10}
                >
                  Gửi đánh giá
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Privacy Notice */}
        {!sent && (
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              Đánh giá của bạn sẽ được công khai và giúp khách hàng khác có thêm thông tin về dịch vụ
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RatingPage;