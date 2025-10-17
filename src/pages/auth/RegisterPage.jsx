import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../../api/authService';

const RegisterPage = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [role, setRole] = useState("customer");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    
    // Validate frontend
    if (!fullname || !email || !phone || !password || !confirm) {
      setError("Vui lòng nhập đầy đủ tất cả các trường");
      return;
    }
    
    if (password !== confirm) {
      setError("Mật khẩu xác nhận không khớp");
      return;
    }

    setLoading(true);

    try {
      const response = await authService.register({ 
        fullname, 
        email, 
        phone, 
        password, 
        role 
      });
      
      const { token, user } = response.data || response;

      if (token && user) {
        // Lưu token và user info vào localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('authUser', JSON.stringify(user));

        // Redirect theo role
        if (user.role === 'admin') {
          navigate('/admin');
        } else if (user.role === 'driver') {
          navigate('/driver');
        } else {
          navigate('/');
        }
      } else {
        setError('Đăng ký thất bại. Vui lòng thử lại.');
      }
    } catch (err) {
      console.error('Register error:', err);
      setError(err?.response?.data?.message || 'Đăng ký thất bại. Email có thể đã tồn tại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md border border-green-100">
        <h2 className="text-3xl font-extrabold mb-2 text-center text-green-900">Đăng ký tài khoản</h2>
        <p className="text-center text-gray-600 mb-6">Tạo tài khoản để bắt đầu sử dụng RideBooking</p>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {/* Tab Role Selector */}
        <div className="mb-6">
          <div className="flex bg-green-50 rounded-xl p-1 gap-1">
            <button
              type="button"
              onClick={() => setRole('customer')}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
                role === 'customer'
                  ? 'bg-green-600 text-white shadow-md'
                  : 'text-green-700 hover:bg-green-100'
              }`}
            >
               Khách hàng
            </button>
            <button
              type="button"
              onClick={() => setRole('driver')}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
                role === 'driver'
                  ? 'bg-green-600 text-white shadow-md'
                  : 'text-green-700 hover:bg-green-100'
              }`}
            >
               Tài xế
            </button>
          </div>
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleRegister}>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Họ tên</label>
            <input
              type="text"
              placeholder="Nguyễn Văn A"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
              value={fullname}
              onChange={e => setFullname(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
            <input
              type="email"
              placeholder="example@email.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Số điện thoại</label>
            <input
              type="tel"
              placeholder="0912345678"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Mật khẩu</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Xác nhận mật khẩu</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg mt-2 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Đang đăng ký...' : 'Đăng ký'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <span className="text-gray-600">Đã có tài khoản? </span>
          <Link to="/login" className="text-green-700 font-bold hover:text-green-800 hover:underline">Đăng nhập ngay</Link>
        </div>

        {/* Additional Info */}
        <div className="mt-6 pt-6 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-500">
            Bằng việc đăng ký, bạn đồng ý với{' '}
            <Link to="/terms" className="text-green-600 hover:underline">Điều khoản dịch vụ</Link>
            {' '}và{' '}
            <Link to="/privacy" className="text-green-600 hover:underline">Chính sách bảo mật</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;