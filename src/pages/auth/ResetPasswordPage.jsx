import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ResetPasswordPage = () => {
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md border border-green-100">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <span className="text-3xl">🔒</span>
          </div>
          <h2 className="text-3xl font-extrabold mb-2 text-green-900">Đổi mật khẩu mới</h2>
          <p className="text-gray-600">Nhập mã xác nhận và mật khẩu mới của bạn</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 text-sm p-3 rounded-lg mb-4">
            {success}
          </div>
        )}

        <form className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Mã xác nhận</label>
            <input
              type="text"
              placeholder="Nhập mã 6 số"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
              value={code}
              onChange={e => setCode(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Mật khẩu mới</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Xác nhận mật khẩu mới</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
            />
          </div>

          <button 
            type="button" 
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg mt-2 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Đổi mật khẩu
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <Link to="/login" className="text-green-700 font-bold hover:text-green-800 hover:underline inline-flex items-center gap-1">
            <span>←</span> Quay lại đăng nhập
          </Link>
        </div>

        {/* Additional Help */}
        <div className="mt-6 pt-6 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-500">
            Mã xác nhận đã được gửi đến email của bạn.
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Không nhận được mã?{' '}
            <Link to="/forgot-password" className="text-green-600 hover:underline font-medium">Gửi lại mã</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;