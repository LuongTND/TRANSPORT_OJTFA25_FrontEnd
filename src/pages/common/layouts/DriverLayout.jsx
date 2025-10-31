import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { removeAuthToken } from '../../../utils/mockAuth';

const nav = [
  { to: '/driver', text: 'Trang chủ', icon: '🏠' },
  { to: '/driver/my-trips', text: 'Chuyến của tôi', icon: '🚗' },
  { to: '/driver/manage-bookings', text: 'Quản lý đặt chỗ', icon: '🎫' },
  { to: '/driver/earnings', text: 'Thu nhập', icon: '💰' },
  { to: '/driver/my-vehicles', text: 'Xe của tôi', icon: '🚙' },
];

const DriverLayout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  const handleLogout = () => {
    try {
      removeAuthToken();
      localStorage.removeItem('user_info');
    } finally {
      navigate('/login');
    }
  };

  const isActive = (path) => {
    if (path === '/driver') {
      return pathname === '/driver' || pathname === '/driver/';
    }
    return pathname.startsWith(path);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside
        className={`
          bg-green-700 text-white flex flex-col min-h-screen z-40 shadow-[4px_0_32px_-8px_rgba(22,101,52,0.15)]
          fixed top-0 left-0
          transition-all duration-300
          ${open ? 'w-64' : 'w-16'}
        `}
      >
        {/* Header with Toggle */}
        <div className="flex items-center justify-between px-4 h-20 font-extrabold text-2xl tracking-tight border-b border-green-800 bg-green-800 select-none">
          <div className="flex items-center gap-3">
            <span className="text-emerald-200 text-2xl"><i className="fa-solid fa-car-side"></i></span>
            {open && <span className="font-extrabold tracking-widest text-xl">RideBooking</span>}
          </div>
          <button
            onClick={() => setOpen(!open)}
            className="text-white hover:bg-green-700 p-2 rounded-lg transition"
            aria-label="Toggle sidebar"
          >
            <svg width="1.2em" height="1.2em" viewBox="0 0 24 24" fill="none" className="inline">
              <path d={open ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col py-6 gap-2 flex-1 overflow-y-auto">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center px-4 py-3 font-medium gap-3 rounded-r-lg mx-2 hover:bg-green-600 transition text-base
                ${isActive(item.to) ? 'bg-green-900 font-bold shadow-lg' : ''}`}
              title={!open ? item.text : ''}
            >
              <span className="text-xl min-w-[1.5rem] text-center">{item.icon}</span>
              {open && <span>{item.text}</span>}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="mt-auto pb-6 px-4">
          <button
            onClick={handleLogout}
            className={`flex items-center justify-center w-full py-3 text-center font-bold rounded-lg bg-white text-green-700 hover:bg-green-100 transition ${!open && 'px-2'}`}
            title={!open ? 'Đăng xuất' : ''}
          >
            {open ? 'Đăng xuất' : '🚪'}
          </button>
        </div>
      </aside>

      {/* Content */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${open ? 'ml-64' : 'ml-16'}`}>
        <div className="w-full max-w-7xl mx-auto p-6 flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DriverLayout;