import React from "react";
const Footer = () => (
  <footer className="bg-green-900 text-white py-16 mt-14">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        <div>
          <div className="flex items-center space-x-2 mb-6">
            <span className="text-emerald-400 text-3xl"><i className="fa-solid fa-car-side"></i></span>
            <h3 className="text-2xl font-bold text-white">RideBooking</h3>
          </div>
          <p className="text-gray-400 mb-6 text-base leading-relaxed">
            Nền tảng đặt xe hiện đại. Kết nối khách hàng, tài xế dễ dàng – chuyên nghiệp trên toàn quốc.
          </p>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-white mb-6">Dịch vụ</h4>
          <div className="space-y-4">
            <a href="/booking" className="block text-gray-400 hover:text-emerald-400 transition-colors">Đặt xe</a>
            <a href="/driver" className="block text-gray-400 hover:text-emerald-400 transition-colors">Trở thành tài xế</a>
            <a href="/search" className="block text-gray-400 hover:text-emerald-400 transition-colors">Tra cứu chuyến đi</a>
            <a href="/promotions" className="block text-gray-400 hover:text-emerald-400 transition-colors">Khuyến mãi</a>
          </div>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-white mb-6">Hỗ trợ</h4>
          <div className="space-y-4">
            <a href="/help" className="block text-gray-400 hover:text-emerald-400 transition-colors">Trung tâm trợ giúp</a>
            <a href="/contact" className="block text-gray-400 hover:text-emerald-400 transition-colors">Liên hệ</a>
            <a href="/faq" className="block text-gray-400 hover:text-emerald-400 transition-colors">Câu hỏi thường gặp</a>
            <a href="/feedback" className="block text-gray-400 hover:text-emerald-400 transition-colors">Góp ý hệ thống</a>
          </div>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-white mb-6">Liên hệ</h4>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-gray-400">
              <i className="fa-solid fa-phone text-emerald-400"></i>
              <span>0369 876 543</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-400">
              <i className="fa-solid fa-envelope text-emerald-400"></i>
              <span>support@ridebooking.vn</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-400">
              <i className="fa-solid fa-globe text-emerald-400"></i>
              <span>www.ridebooking.vn</span>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-green-800 mt-12 pt-8">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p className="text-gray-400 text-sm">
            © 2025 RideBooking Digi. Tất cả quyền được bảo lưu.
          </p>
          <div className="flex space-x-6">
            <a href="/privacy" className="text-gray-400 hover:text-emerald-400 text-sm transition-colors">Chính sách bảo mật</a>
            <a href="/terms" className="text-gray-400 hover:text-emerald-400 text-sm transition-colors">Điều khoản sử dụng</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
);
export default Footer;
