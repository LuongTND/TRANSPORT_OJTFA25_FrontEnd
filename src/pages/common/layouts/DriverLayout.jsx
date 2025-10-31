import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { removeAuthToken } from '../../../utils/mockAuth';


const nav = [
  { to: '/driver', text: 'Dashboard' },
  { to: '/driver/my-trips', text: 'Chuyến của tôi' },
  { to: '/driver/manage-bookings', text: 'Quản lý đặt chỗ' },
  { to: '/driver/earnings', text: 'Thu nhập' },
  { to: '/driver/my-vehicles', text: 'Xe của tôi' },
];

const DriverLayout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      removeAuthToken();
      localStorage.removeItem('user_info');
    } finally {
      navigate('/login');
    }
  };
  return (
    <div className="min-h-screen flex flex-col bg-green-50">
      <header className="bg-green-700 text-white flex items-center px-4 py-3 gap-6">
        <div className="text-xl font-extrabold tracking-wide">TÀI XẾ</div>
        <nav className="flex gap-4 flex-1">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={
                pathname.startsWith(item.to)
                  ? 'border-b-2 border-white py-1 font-bold'
                  : 'hover:text-green-200 py-1 transition-colors'
              }
            >{item.text}</Link>
          ))}
        </nav>
        <button onClick={handleLogout} className="text-green-100 hover:text-white font-semibold ml-auto">Đăng xuất</button>
      </header>
      <div className="flex-1 max-w-5xl mx-auto w-full px-4 py-6">
        <Outlet />
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default DriverLayout;
