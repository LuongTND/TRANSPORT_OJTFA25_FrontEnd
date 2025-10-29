import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentPage = () => {
  const [status, setStatus] = useState('Chờ thanh toán'); // 'Chờ thanh toán' | 'Đã thanh toán' | 'Thất bại'
  const [selectedMethod, setSelectedMethod] = useState('bank'); // 'bank' | 'momo' | 'zalopay'
  const navigate = useNavigate();

  // 1 ảnh QR cố định duy nhất cho tất cả phương thức
  const qrCodeImage = '/public/qr-payment.jpg'; 

  // Mock booking data
  const bookingData = {
    bookingId: '#12345',
    route: 'Sân bay Đà Nẵng - Mỹ Khê',
    date: '15/10/2025',
    time: '08:00',
    seats: ['A2', 'A3'],
    amount: 100000
  };

  const paymentMethods = [
    { 
      id: 'bank', 
      name: 'Chuyển khoản Ngân hàng', 
      icon: '🏦',
      color: 'bg-blue-50 border-blue-300',
      activeColor: 'bg-blue-100 border-blue-500'
    },
    { 
      id: 'momo', 
      name: 'Ví MoMo', 
      icon: '💳',
      color: 'bg-pink-50 border-pink-300',
      activeColor: 'bg-pink-100 border-pink-500'
    },
    { 
      id: 'zalopay', 
      name: 'ZaloPay', 
      icon: '💰',
      color: 'bg-cyan-50 border-cyan-300',
      activeColor: 'bg-cyan-100 border-cyan-500'
    }
  ];

  const handlePaymentMethodChange = (methodId) => {
    setSelectedMethod(methodId);
    // Ảnh QR sẽ tự động thay đổi theo selectedMethod
  };

  const handleGoToHistory = () => {
    navigate('/customer/bookings');
  };

  const handleRetryPayment = () => {
    setStatus('Chờ thanh toán');
    // TODO: Call API to retry payment
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button 
            onClick={() => navigate(-1)}
            className="mb-4 text-green-600 hover:text-green-700 font-medium flex items-center gap-2"
          >
            ← Quay lại
          </button>
          <h1 className="text-3xl font-bold text-green-800 mb-2">Thanh toán vé xe</h1>
          <p className="text-gray-600">Hoàn tất thanh toán để xác nhận đặt vé của bạn</p>
        </div>

        {/* Booking Summary Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border-l-4 border-green-500">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Thông tin đặt vé</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Mã đặt vé:</span>
              <span className="font-semibold text-green-700">{bookingData.bookingId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tuyến:</span>
              <span className="font-semibold">{bookingData.route}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Thời gian:</span>
              <span className="font-semibold">{bookingData.time} - {bookingData.date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Ghế đã chọn:</span>
              <span className="font-semibold text-green-700">{bookingData.seats.join(', ')}</span>
            </div>
            <hr className="my-3" />
            <div className="flex justify-between text-lg">
              <span className="font-bold text-gray-900">Tổng tiền:</span>
              <span className="font-bold text-green-700 text-2xl">{bookingData.amount.toLocaleString()}đ</span>
            </div>
          </div>
        </div>

        {/* Payment Method Selection */}
        {status === 'Chờ thanh toán' && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Chọn phương thức thanh toán</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => handlePaymentMethodChange(method.id)}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                    selectedMethod === method.id ? method.activeColor : method.color
                  } hover:scale-105`}
                >
                  <div className="text-3xl mb-2">{method.icon}</div>
                  <div className="font-semibold text-gray-900">{method.name}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Payment Status Card */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          {status === 'Chờ thanh toán' && (
            <div className="text-center">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Quét mã QR để thanh toán</h3>
                <p className="text-gray-600">Vui lòng mở ứng dụng {paymentMethods.find(m => m.id === selectedMethod)?.name} và quét mã QR</p>
              </div>

              {/* QR Code Container - Hiển thị 1 ảnh QR duy nhất */}
              <div className="inline-block bg-white p-8 rounded-2xl mb-4 border-2 border-green-200 shadow-lg">
                <img 
                  src={qrCodeImage} 
                  alt="Mã QR thanh toán"
                  className="w-80 h-auto mx-auto rounded-lg"
                  onError={(e) => {
                    // Fallback nếu ảnh không tồn tại
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="w-80 h-80 bg-white rounded-lg flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-300 hidden">
                  <svg className="w-20 h-20 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                  </svg>
                  <div className="text-sm font-medium">Không tìm thấy ảnh QR</div>
                  <div className="text-xs mt-1">Đặt ảnh vào: public/images/qr-payment.png</div>
                </div>

                {/* Thông tin tài khoản */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="text-center space-y-1">
                    <p className="text-sm text-gray-600">Chủ tài khoản:</p>
                    <p className="font-bold text-gray-900">LE BAO CHAU</p>
                    <p className="text-sm text-gray-600">Số tài khoản:</p>
                    <p className="font-bold text-lg text-green-700">0372278710</p>
                    <p className="text-xs text-gray-500 mt-2">Quét mã hoặc chuyển khoản thủ công</p>
                  </div>
                </div>
              </div>

              {/* Waiting Status */}
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-yellow-600"></div>
                <span className="text-yellow-700 font-medium">Đang chờ xác nhận thanh toán...</span>
              </div>

              {/* Info Box */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="text-sm text-blue-800 text-left">
                    <p className="font-semibold mb-1">Lưu ý:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Vui lòng hoàn tất thanh toán trong 15 phút</li>
                      <li>Không tắt trang này cho đến khi thanh toán thành công</li>
                      <li>Bạn sẽ nhận email xác nhận sau khi thanh toán</li>
                    </ul>
                  </div>
                </div>
              </div>

              <button 
                onClick={handleGoToHistory}
                className="w-full py-3 px-6 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold transition-colors"
              >
                Hủy thanh toán
              </button>
            </div>
          )}

          {status === 'Đã thanh toán' && (
            <div className="text-center">
              {/* Success Animation */}
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
                  <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-green-700 mb-2">Thanh toán thành công!</h3>
                <p className="text-gray-600">Vé của bạn đã được xác nhận</p>
              </div>

              {/* Success Details */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Mã giao dịch:</span>
                    <span className="font-semibold text-gray-900">#TXN123456789</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Thời gian:</span>
                    <span className="font-semibold text-gray-900">{new Date().toLocaleString('vi-VN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phương thức:</span>
                    <span className="font-semibold text-gray-900">{paymentMethods.find(m => m.id === selectedMethod)?.name}</span>
                  </div>
                  <hr />
                  <div className="flex justify-between text-lg">
                    <span className="font-bold text-gray-900">Đã thanh toán:</span>
                    <span className="font-bold text-green-700">{bookingData.amount.toLocaleString()}đ</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button 
                  onClick={handleGoToHistory}
                  className="w-full py-3 px-6 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
                >
                  Xem chi tiết vé
                </button>
                <button 
                  onClick={() => navigate('/customer/dashboard')}
                  className="w-full py-3 px-6 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold transition-colors"
                >
                  Về trang chủ
                </button>
              </div>
            </div>
          )}

          {status === 'Thất bại' && (
            <div className="text-center">
              {/* Error Animation */}
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-4">
                  <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-red-700 mb-2">Thanh toán thất bại!</h3>
                <p className="text-gray-600">Đã xảy ra lỗi trong quá trình thanh toán</p>
              </div>

              {/* Error Details */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-red-800">
                  Lỗi: Không đủ số dư trong tài khoản hoặc giao dịch bị từ chối
                </p>
              </div>

              <div className="space-y-3">
                <button 
                  onClick={handleRetryPayment}
                  className="w-full py-3 px-6 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
                >
                  Thử lại
                </button>
                <button 
                  onClick={handleGoToHistory}
                  className="w-full py-3 px-6 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold transition-colors"
                >
                  Quay lại
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Support Section */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Cần hỗ trợ? Liên hệ{' '}
            <a href="tel:1900xxxx" className="text-green-600 hover:text-green-700 font-medium">
              1900 xxxx
            </a>
            {' '}hoặc{' '}
            <a href="mailto:support@example.com" className="text-green-600 hover:text-green-700 font-medium">
              support@example.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;