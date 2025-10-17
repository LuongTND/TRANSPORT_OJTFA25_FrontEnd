import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../../api/authService';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authService.login({ email, password, role });
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
        setError('Đăng nhập thất bại. Vui lòng thử lại.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err?.response?.data?.message || 'Email hoặc mật khẩu không đúng');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md border border-green-100">
        <h2 className="text-3xl font-extrabold mb-2 text-center text-green-900">Đăng nhập</h2>
        <p className="text-center text-gray-600 mb-6">Chào mừng bạn quay trở lại!</p>
        
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

        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
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

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg mt-2 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="text-gray-500 text-sm font-medium">HOẶC</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Google Login Button */}
        <button
          className="w-full border-2 border-gray-300 text-gray-700 rounded-lg flex items-center justify-center gap-3 py-3 bg-white hover:bg-gray-50 hover:border-green-400 transition-all duration-200 font-semibold"
          type="button"
        >
          <svg width="20" height="20" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
          </svg>
          Đăng nhập với Google
        </button>
        
        <div className="mt-6 flex justify-between text-sm">
          <Link to="/forgot-password" className="text-green-600 hover:text-green-700 font-medium hover:underline">Quên mật khẩu?</Link>
          <Link to="/register" className="text-green-700 font-bold hover:text-green-800 hover:underline">Đăng ký tài khoản</Link>
        </div>

        {/* Additional Info */}
        <div className="mt-6 pt-6 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-500">
            Bằng việc đăng nhập, bạn đồng ý với{' '}
            <Link to="/terms" className="text-green-600 hover:underline">Điều khoản dịch vụ</Link>
            {' '}và{' '}
            <Link to="/privacy" className="text-green-600 hover:underline">Chính sách bảo mật</Link>
          </p>
        </div>
        </div>
    </div>
  );
};

export default LoginPage;
