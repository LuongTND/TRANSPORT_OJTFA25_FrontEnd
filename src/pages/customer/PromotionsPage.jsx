import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PromotionsPage = () => {
  const [selectedPromo, setSelectedPromo] = useState(null);
  const [copiedCode, setCopiedCode] = useState('');
  const navigate = useNavigate();

  // Mock promotions data
  const promotions = [
    {
      id: 1,
      code: 'WELCOME2024',
      title: 'Chào mừng thành viên mới',
      description: 'Giảm 20% cho chuyến đi đầu tiên',
      discount: '20%',
      type: 'Percent',
      minOrder: 100000,
      maxDiscount: 50000,
      expiryDate: '31/12/2024',
      status: 'active',
      usageCount: 128,
      maxUsage: 1000,
      conditions: [
        'Áp dụng cho khách hàng mới',
        'Đơn hàng tối thiểu 100.000đ',
        'Giảm tối đa 50.000đ'
      ]
    },
    {
      id: 2,
      code: 'FLASH50K',
      title: 'Flash Sale - Giảm 50K',
      description: 'Giảm ngay 50.000đ cho tất cả chuyến đi',
      discount: '50.000đ',
      type: 'Amount',
      minOrder: 200000,
      maxDiscount: 50000,
      expiryDate: '15/11/2024',
      status: 'active',
      usageCount: 456,
      maxUsage: 500,
      conditions: [
        'Áp dụng cho tất cả khách hàng',
        'Đơn hàng tối thiểu 200.000đ',
        'Số lượng có hạn'
      ]
    },
    {
      id: 3,
      code: 'WEEKEND30',
      title: 'Cuối tuần vui vẻ',
      description: 'Giảm 30% cho chuyến đi cuối tuần',
      discount: '30%',
      type: 'Percent',
      minOrder: 150000,
      maxDiscount: 100000,
      expiryDate: '30/11/2024',
      status: 'active',
      usageCount: 89,
      maxUsage: 200,
      conditions: [
        'Chỉ áp dụng thứ 7, chủ nhật',
        'Đơn hàng tối thiểu 150.000đ',
        'Giảm tối đa 100.000đ'
      ]
    },
    {
      id: 4,
      code: 'STUDENT15',
      title: 'Ưu đãi sinh viên',
      description: 'Giảm 15% dành riêng cho sinh viên',
      discount: '15%',
      type: 'Percent',
      minOrder: 50000,
      maxDiscount: 30000,
      expiryDate: '31/12/2024',
      status: 'active',
      usageCount: 234,
      maxUsage: 500,
      conditions: [
        'Cần xác minh thẻ sinh viên',
        'Đơn hàng tối thiểu 50.000đ',
        'Giảm tối đa 30.000đ'
      ]
    },
    {
      id: 5,
      code: 'HOLIDAY2024',
      title: 'Lễ hội cuối năm',
      description: 'Giảm 100.000đ cho chuyến đi xa',
      discount: '100.000đ',
      type: 'Amount',
      minOrder: 500000,
      maxDiscount: 100000,
      expiryDate: '05/01/2025',
      status: 'active',
      usageCount: 45,
      maxUsage: 100,
      conditions: [
        'Áp dụng cho chuyến đi > 50km',
        'Đơn hàng tối thiểu 500.000đ',
        'Không áp dụng cùng mã khác'
      ]
    },
    {
      id: 6,
      code: 'SAVE10K',
      title: 'Tiết kiệm hàng ngày',
      description: 'Giảm 10.000đ mỗi chuyến',
      discount: '10.000đ',
      type: 'Amount',
      minOrder: 50000,
      maxDiscount: 10000,
      expiryDate: '31/10/2024',
      status: 'expired',
      usageCount: 1000,
      maxUsage: 1000,
      conditions: [
        'Áp dụng mọi chuyến đi',
        'Đơn hàng tối thiểu 50.000đ',
        'Đã hết hạn'
      ]
    }
  ];

  const activePromotions = promotions.filter(p => p.status === 'active');
  const expiredPromotions = promotions.filter(p => p.status === 'expired');

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(''), 2000);
  };

  const handleUsePromo = (promo) => {
    // TODO: Save promo to localStorage or state management
    localStorage.setItem('selectedPromo', JSON.stringify(promo));
    navigate('/customer/search', { state: { promoCode: promo.code } });
  };

  const getDiscountBadgeColor = (type) => {
    return type === 'Percent' ? 'bg-purple-100 text-purple-700' : 'bg-orange-100 text-orange-700';
  };

  const getProgressPercentage = (usageCount, maxUsage) => {
    return (usageCount / maxUsage) * 100;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-green-800 mb-2">🎁 Khuyến mãi dành cho bạn</h1>
          <p className="text-gray-600">Tiết kiệm chi phí với các mã giảm giá hấp dẫn</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-green-500">
            <div className="text-sm text-gray-600 mb-1">Khuyến mãi khả dụng</div>
            <div className="text-2xl font-bold text-gray-800">{activePromotions.length}</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-blue-500">
            <div className="text-sm text-gray-600 mb-1">Tiết kiệm tối đa</div>
            <div className="text-2xl font-bold text-gray-800">100.000đ</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-purple-500">
            <div className="text-sm text-gray-600 mb-1">Đã sử dụng</div>
            <div className="text-2xl font-bold text-gray-800">5 mã</div>
          </div>
        </div>

        {/* Active Promotions */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">🔥 Đang diễn ra</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activePromotions.map((promo) => (
              <div
                key={promo.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border-2 border-transparent hover:border-green-500"
              >
                {/* Header với gradient */}
                <div className="bg-gradient-to-r from-green-500 to-blue-500 p-4 text-white">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-1">{promo.title}</h3>
                      <p className="text-sm opacity-90">{promo.description}</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-bold ${getDiscountBadgeColor(promo.type)} bg-white`}>
                      {promo.discount}
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="p-4">
                  {/* Code Section */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between bg-gray-50 border-2 border-dashed border-green-400 rounded-lg p-3">
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Mã giảm giá</div>
                        <div className="font-mono font-bold text-green-700 text-lg">{promo.code}</div>
                      </div>
                      <button
                        onClick={() => handleCopyCode(promo.code)}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-semibold transition-colors"
                      >
                        {copiedCode === promo.code ? '✓ Đã copy' : 'Copy'}
                      </button>
                    </div>
                  </div>

                  {/* Conditions */}
                  <div className="mb-4">
                    <div className="text-xs font-semibold text-gray-700 mb-2">Điều kiện:</div>
                    <ul className="space-y-1">
                      {promo.conditions.map((condition, idx) => (
                        <li key={idx} className="text-xs text-gray-600 flex items-start gap-2">
                          <svg className="w-3 h-3 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          {condition}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Đã sử dụng</span>
                      <span>{promo.usageCount}/{promo.maxUsage}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${getProgressPercentage(promo.usageCount, promo.maxUsage)}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Footer */}.
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="text-xs text-gray-500">
                      HSD: <span className="font-semibold text-gray-700">{promo.expiryDate}</span>
                    </div>
                    <button
                      onClick={() => handleUsePromo(promo)}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-semibold transition-colors flex items-center gap-1"
                    >
                      Dùng ngay
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Expired Promotions */}
        {expiredPromotions.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">⏰ Đã hết hạn</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {expiredPromotions.map((promo) => (
                <div
                  key={promo.id}
                  className="bg-gray-100 rounded-xl shadow-sm overflow-hidden opacity-60"
                >
                  <div className="bg-gray-400 p-4 text-white">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-1">{promo.title}</h3>
                        <p className="text-sm opacity-90">{promo.description}</p>
                      </div>
                      <div className="px-3 py-1 rounded-full text-xs font-bold bg-white text-gray-600">
                        {promo.discount}
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="bg-gray-200 border-2 border-dashed border-gray-400 rounded-lg p-3 text-center">
                      <div className="text-xs text-gray-500 mb-1">Mã giảm giá</div>
                      <div className="font-mono font-bold text-gray-500 text-lg line-through">{promo.code}</div>
                      <div className="text-xs text-red-600 font-semibold mt-2">Đã hết hạn</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* How to use section */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">📝 Cách sử dụng mã giảm giá</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">1️⃣</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Chọn mã</h3>
              <p className="text-xs text-gray-600">Copy mã giảm giá phù hợp</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">2️⃣</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Đặt vé</h3>
              <p className="text-xs text-gray-600">Chọn chuyến đi và ghế ngồi</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">3️⃣</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Nhập mã</h3>
              <p className="text-xs text-gray-600">Dán mã vào ô khuyến mãi</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">4️⃣</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Tiết kiệm</h3>
              <p className="text-xs text-gray-600">Nhận giảm giá ngay lập tức</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionsPage;