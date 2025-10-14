import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from './components/Footer';

// carousel
const slides = [
  {
    image: '/gps-tracking-and-real-time-location-on-mobile-app.jpg',
    title: 'Đặt xe thông minh',
    desc: 'Công nghệ AI giúp tìm tài xế nhanh nhất',
    highlight: 'Chỉ 30 giây'
  },
  {
    image: '/luxury-car-service-with-professional-driver.jpg',
    title: 'Tiện lợi & An toàn',
    desc: 'Mạng lưới tài xế phủ khắp, nhiều loại xe lựa chọn',
    highlight: '24/7 Phục vụ'
  },
  {
    image: '/modern-ride-sharing-app-with-cars-and-smartphones.jpg',
    title: 'Hiện đại & Đa nền tảng',
    desc: 'Ứng dụng di động dễ thao tác, đa tính năng',
    highlight: 'iOS & Android'
  }
];

const features = [
  {
    icon: <span className="text-5xl"><i className="fa-solid fa-clock"></i></span>,
    title: 'Nhanh chóng',
    desc: 'Đặt xe chỉ trong vài giây. Tài xế sẽ đến đón bạn trong thời gian ngắn nhất.',
    color: 'green'
  },
  {
    icon: <span className="text-5xl"><i className="fa-solid fa-shield"></i></span>,
    title: 'An toàn',
    desc: 'Tất cả tài xế đều xác minh, có bảo hiểm. Theo dõi chuyến đi real-time.',
    color: 'blue'
  },
  {
    icon: <span className="text-5xl"><i className="fa-solid fa-dollar-sign"></i></span>,
    title: 'Giá cả hợp lý',
    desc: 'Giá minh bạch, không phát sinh phí ẩn. Nhiều khuyến mãi hấp dẫn.',
    color: 'yellow'
  },
];

const stats = [
  { value: '1M+', label: 'Khách hàng tin tưởng', icon: '👥' },
  { value: '50K+', label: 'Tài xế đối tác', icon: '🚗' },
  { value: '10M+', label: 'Chuyến đi thành công', icon: '✅' },
  { value: '4.9', label: 'Đánh giá trung bình', icon: '⭐' },
];

const services = [
  {
    icon: '🚗',
    name: 'RideBooking Go',
    desc: 'Di chuyển hàng ngày tiết kiệm',
    price: 'Từ 5,000đ/km'
  },
  {
    icon: '🚙',
    name: 'RideBooking Plus',
    desc: 'Xe 4-7 chỗ cao cấp, thoải mái',
    price: 'Từ 8,000đ/km'
  },
  {
    icon: '🏍️',
    name: 'RideBooking Bike',
    desc: 'Xe máy nhanh chóng, linh hoạt',
    price: 'Từ 3,000đ/km'
  },
  {
    icon: '📦',
    name: 'RideBooking Delivery',
    desc: 'Giao hàng tận nơi, an toàn',
    price: 'Từ 15,000đ'
  }
];

const testimonials = [
  {
    name: 'Nguyễn Văn A',
    role: 'Khách hàng thường xuyên',
    avatar: '👨‍💼',
    comment: 'Dịch vụ tuyệt vời! Tài xế lịch sự, xe sạch sẽ. Tôi đã sử dụng hơn 100 chuyến.',
    rating: 5
  },
  {
    name: 'Trần Thị B',
    role: 'Người dùng mới',
    avatar: '👩‍💻',
    comment: 'Ứng dụng dễ dùng, đặt xe nhanh chóng. Giá cả rất hợp lý so với chất lượng.',
    rating: 5
  },
  {
    name: 'Lê Văn C',
    role: 'Tài xế đối tác',
    avatar: '👨‍✈️',
    comment: 'Thu nhập ổn định, hỗ trợ tốt. Tôi đã tăng thu nhập 40% kể từ khi gia nhập.',
    rating: 5
  },
  {
    name: 'Phạm Minh D',
    role: 'Doanh nhân',
    avatar: '👔',
    comment: 'Chuyên nghiệp, đúng giờ. Tôi luôn tin tưởng RideBooking cho các cuộc họp quan trọng.',
    rating: 5
  },
  {
    name: 'Hoàng Thị E',
    role: 'Sinh viên',
    avatar: '👩‍🎓',
    comment: 'Giá sinh viên rất tốt, giúp tôi tiết kiệm nhiều chi phí đi lại hàng ngày.',
    rating: 5
  },
  {
    name: 'Đỗ Văn F',
    role: 'Freelancer',
    avatar: '💻',
    comment: 'Đặt xe qua app siêu nhanh, tài xế nhiệt tình. Chất lượng dịch vụ vượt mong đợi!',
    rating: 5
  }
];

const howItWorks = [
  {
    step: '1',
    icon: '📱',
    title: 'Tải ứng dụng',
    desc: 'Download RideBooking trên App Store hoặc Google Play'
  },
  {
    step: '2',
    icon: '📝',
    title: 'Đăng ký tài khoản',
    desc: 'Điền thông tin cơ bản và xác thực trong 2 phút'
  },
  {
    step: '3',
    icon: '📍',
    title: 'Chọn điểm đón',
    desc: 'Nhập địa chỉ hoặc chọn vị trí trên bản đồ'
  },
  {
    step: '4',
    icon: '🚗',
    title: 'Bắt đầu hành trình',
    desc: 'Tài xế đến đón và đưa bạn đến đích an toàn'
  }
];

const LandingPage = () => {
  const [slideIdx, setSlideIdx] = useState(0);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [testimonialOffset, setTestimonialOffset] = useState(0);
  const navigate = useNavigate();
  
  const slide = slides[slideIdx];
  const next = () => setSlideIdx(i => (i + 1) % slides.length);
  const prev = () => setSlideIdx(i => (i - 1 + slides.length) % slides.length);

  // Auto slide carousel
  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 5000);
    return () => clearInterval(interval);
  }, [slideIdx]);

  // Auto scroll testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialOffset(prev => (prev + 1) % testimonials.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const isLoggedIn = false;

  const handleProtectedClick = (e, path) => {
    e.preventDefault();
    if (!isLoggedIn) {
      setShowAuthModal(true);
    } else {
      navigate(path);
    }
  };

  const handleLoginRedirect = () => {
    setShowAuthModal(false);
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 to-white text-green-950">
      {/* HEADER */}
      <header className="flex items-center justify-between px-6 py-4 bg-white shadow-md sticky top-0 z-20 backdrop-blur-sm bg-white/95">
        <div className="flex items-center gap-2">
          <span className="text-green-600 text-2xl font-extrabold">
            <i className="fa-solid fa-car-side"></i> RideBooking
          </span>
        </div>
        <nav className="flex items-center gap-6">
          <a href="#services" className="hover:text-green-600 font-medium cursor-pointer transition">Dịch vụ</a>
          <a href="#how-it-works" className="hover:text-green-600 font-medium cursor-pointer transition">Cách dùng</a>
          <a href="#testimonials" className="hover:text-green-600 font-medium cursor-pointer transition">Đánh giá</a>
          <Link to="/login" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 font-semibold transition">
            Đăng nhập
          </Link>
        </nav>
      </header>
      
      {/* AUTH MODAL */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full border border-green-100 transform transition-all scale-100 animate-fade-in">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <span className="text-3xl">🔐</span>
              </div>
              <h3 className="text-2xl font-extrabold text-green-900 mb-2">Yêu cầu đăng nhập</h3>
              <p className="text-gray-600">Bạn cần đăng nhập để sử dụng tính năng này</p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowAuthModal(false)}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all"
              >
                Hủy
              </button>
              <button 
                onClick={handleLoginRedirect}
                className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-all shadow-md"
              >
                Đăng nhập
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CAROUSEL */}
      <div className="relative w-full h-[400px] md:h-[500px] lg:h-[550px] flex items-center justify-center overflow-hidden">
        <img src={slide.image} alt={slide.title} className="object-cover w-full h-full transition-all duration-500" />
        <div className="absolute inset-0 bg-gradient-to-br from-green-950/80 to-green-500/20 flex flex-col items-center justify-center text-white text-center p-6">
          <div className="bg-green-500/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4 border border-white/30">
            <span className="text-sm font-bold">{slide.highlight}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg animate-fade-in">{slide.title}</h1>
          <p className="text-lg md:text-2xl mb-8 font-semibold max-w-2xl">{slide.desc}</p>
          <div className="flex gap-4">
            <a href="#" onClick={(e) => handleProtectedClick(e, '/booking')} className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-4 rounded-lg font-bold transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
              Đặt xe ngay
            </a>
            <Link to="/register" className="bg-white text-green-600 border-2 border-white px-8 py-4 rounded-lg font-bold hover:bg-green-50 transition-all shadow-lg">
              Đăng ký miễn phí
            </Link>
          </div>
        </div>
        <button className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-green-900 text-3xl rounded-full w-12 h-12 flex items-center justify-center z-10 shadow-lg transition-all hover:scale-110" onClick={prev}>‹</button>
        <button className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-green-900 text-3xl rounded-full w-12 h-12 flex items-center justify-center z-10 shadow-lg transition-all hover:scale-110" onClick={next}>›</button>
        
        {/* Carousel Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, i) => (
            <button 
              key={i} 
              onClick={() => setSlideIdx(i)}
              className={`w-3 h-3 rounded-full transition-all ${i === slideIdx ? 'bg-white w-8' : 'bg-white/50'}`}
            />
          ))}
        </div>
      </div>

      {/* PROMO BANNER */}
      <div className="bg-gradient-to-r from-yellow-400 to-orange-400 py-4 px-6 text-center">
        <p className="text-gray-900 font-bold text-lg">
          🎉 Ưu đãi đặc biệt: Giảm 50% cho chuyến đi đầu tiên! 
          <Link to="/register" className="underline ml-2 hover:text-white transition">Đăng ký ngay →</Link>
        </p>
      </div>

      {/* SERVICES SECTION */}
      <section id="services" className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Dịch vụ của chúng tôi</h2>
          <p className="text-gray-600 text-xl">Đa dạng lựa chọn phù hợp mọi nhu cầu của bạn</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-lg border border-green-100 hover:shadow-2xl hover:scale-105 transition-all cursor-pointer group">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{service.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-green-900">{service.name}</h3>
              <p className="text-gray-600 mb-3 text-sm">{service.desc}</p>
              <p className="text-green-600 font-bold text-lg">{service.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-4">Tại sao chọn RideBooking?</h2>
        <p className="text-center text-gray-600 text-xl mb-12">Trải nghiệm di chuyển hoàn hảo với những tính năng vượt trội</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div key={i} className="bg-gradient-to-br from-white to-green-50 shadow-xl rounded-2xl p-8 flex flex-col items-center border-2 border-green-100 hover:border-green-300 transition-all hover:shadow-2xl transform hover:-translate-y-2">
              <div className="text-green-500 mb-4 transform hover:scale-110 transition-transform">{f.icon}</div>
              <h3 className="text-2xl font-bold mb-3 text-green-900">{f.title}</h3>
              <p className="text-center text-gray-700 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="bg-gradient-to-br from-green-50 to-green-100 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-green-900">Cách thức hoạt động</h2>
            <p className="text-gray-700 text-xl">Chỉ 4 bước đơn giản để bắt đầu</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {howItWorks.map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all">
                <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-xl mb-2 text-green-900">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-3xl p-12 shadow-2xl text-white">
          <h2 className="text-4xl font-extrabold text-center mb-12">Con số ấn tượng</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <div key={i} className="text-center transform hover:scale-110 transition-transform">
                <div className="text-5xl mb-3">{s.icon}</div>
                <div className="text-5xl font-black mb-2">{s.value}</div>
                <div className="text-green-100 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="bg-gradient-to-br from-white to-green-50 py-16 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-green-900">Khách hàng nói gì?</h2>
            <p className="text-gray-600 text-xl">Hàng nghìn đánh giá 5 sao từ người dùng</p>
          </div>
          <div className="relative">
            {/* Previous Button */}
            <button 
              onClick={() => setTestimonialOffset(prev => (prev - 1 + testimonials.length) % testimonials.length)}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-green-900 text-2xl rounded-full w-10 h-10 flex items-center justify-center shadow-lg transition-all hover:scale-110"
            >
              ‹
            </button>
            
            {/* Testimonials Container */}
            <div className="overflow-hidden mx-12">
              <div 
                className="flex gap-6 transition-transform duration-700 ease-in-out"
                style={{ 
                  transform: `translateX(-${testimonialOffset * (100 / 3 + 2)}%)`
                }}
              >
                {testimonials.map((t, i) => (
                  <div 
                    key={i} 
                    className="bg-white rounded-2xl p-6 shadow-lg border border-green-100 hover:shadow-2xl transition-all flex-shrink-0 min-w-[calc(33.333%-1rem)]"
                  >
                    <div className="flex items-center mb-4">
                      <div className="text-5xl mr-4">{t.avatar}</div>
                      <div>
                        <h4 className="font-bold text-lg text-green-900">{t.name}</h4>
                        <p className="text-sm text-gray-600">{t.role}</p>
                      </div>
                    </div>
                    <div className="flex mb-3">
                      {[...Array(t.rating)].map((_, idx) => (
                        <span key={idx} className="text-yellow-400 text-xl">⭐</span>
                      ))}
                    </div>
                    <p className="text-gray-700 italic">"{t.comment}"</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Next Button */}
            <button 
              onClick={() => setTestimonialOffset(prev => (prev + 1) % testimonials.length)}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-green-900 text-2xl rounded-full w-10 h-10 flex items-center justify-center shadow-lg transition-all hover:scale-110"
            >
              ›
            </button>

            {/* Navigation dots */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setTestimonialOffset(i)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    i === testimonialOffset ? 'bg-green-600 w-8' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DRIVER CTA */}
      <section className="bg-gradient-to-r from-green-700 to-green-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 text-white">
          <div className="text-6xl mb-6">🚗💰</div>
          <h2 className="text-4xl font-extrabold mb-4">Trở thành tài xế đối tác</h2>
          <p className="text-xl mb-8 text-green-100">Tăng thu nhập, làm việc linh hoạt. Hàng nghìn tài xế đã kiếm thêm 10-15 triệu/tháng</p>
          <div className="flex justify-center gap-4">
            <a href="#" onClick={(e) => handleProtectedClick(e, '/driver')} className="bg-white text-green-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-50 transition-all shadow-lg">
              Đăng ký làm tài xế
            </a>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/10 transition-all">
              Tìm hiểu thêm
            </button>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-gradient-to-r from-green-100 to-green-50 py-16">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="text-4xl font-extrabold mb-4 text-green-900">Bạn sẵn sàng trải nghiệm?</h2>
          <p className="mb-8 text-gray-700 text-lg">Tải ứng dụng ngay hôm nay và nhận ưu đãi đặc biệt cho chuyến đi đầu tiên!</p>
          <div className="flex justify-center gap-4 mb-8">
            <Link to="/register" className="bg-green-600 hover:bg-green-700 text-white text-lg px-10 py-4 rounded-lg font-bold transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
              Đăng ký ngay
            </Link>
            <a href="#" onClick={(e) => handleProtectedClick(e, '/booking')} className="border-2 border-green-700 bg-white text-green-700 px-10 py-4 rounded-lg font-bold text-lg hover:bg-green-50 transition-all shadow-lg">
              Đặt xe ngay
            </a>
          </div>
          <div className="flex justify-center gap-6">
            <a href="#" className="flex items-center gap-2 text-gray-700 hover:text-green-600 transition">
              <span className="text-3xl">📱</span>
              <div className="text-left">
                <div className="text-xs text-gray-500">Tải về trên</div>
                <div className="font-bold">App Store</div>
              </div>
            </a>
            <a href="#" className="flex items-center gap-2 text-gray-700 hover:text-green-600 transition">
              <span className="text-3xl">🤖</span>
              <div className="text-left">
                <div className="text-xs text-gray-500">Tải về trên</div>
                <div className="font-bold">Google Play</div>
              </div>
            </a>
      </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
