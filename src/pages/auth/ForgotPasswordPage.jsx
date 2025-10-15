import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md border border-green-100">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <span className="text-3xl">🔑</span>
          </div>
          <h2 className="text-3xl font-extrabold mb-2 text-green-900">Quên mật khẩu?</h2>
          <p className="text-gray-600">Nhập email của bạn để nhận mã khôi phục</p>
        </div>

        <form className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
            <input
              type="email"
              placeholder="example@email.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <button 
            type="button" 
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg mt-2 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Gửi mã lấy lại mật khẩu
          </button>
        </form>

        {msg && (
          <div className="mt-4 bg-green-50 border border-green-200 text-green-700 text-sm p-3 rounded-lg text-center font-medium">
            {msg}
          </div>
        )}

        <div className="mt-6 text-center text-sm">
          <Link to="/login" className="text-green-700 font-bold hover:text-green-800 hover:underline inline-flex items-center gap-1">
            <span>←</span> Quay lại đăng nhập
          </Link>
        </div>

        {/* Additional Help */}
        <div className="mt-6 pt-6 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-500">
            Bạn sẽ nhận được email với hướng dẫn khôi phục mật khẩu trong vài phút.
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Không nhận được email?{' '}
            <a href="#" className="text-green-600 hover:underline font-medium">Liên hệ hỗ trợ</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;