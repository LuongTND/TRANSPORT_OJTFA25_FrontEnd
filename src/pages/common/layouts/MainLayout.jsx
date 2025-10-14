import React, { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const navLinks = [
  { to: "/home", text: "Trang chủ", icon: "🏠" },
  { to: "/search", text: "Tìm chuyến", icon: "🔍" },
  { to: "/booking", text: "Đặt vé", icon: "🚌" },
  { to: "/my-bookings", text: "Lịch sử vé", icon: "📑" },
  { to: "/promotions", text: "Ưu đãi", icon: "🎁" },
];

const isLoggedIn = true; // mock logic đã đăng nhập

const MainLayout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  function handleLogout() {
    navigate("/");
  }
  return (
    <div className="bg-green-50 min-h-screen flex">
      {/* SIDEBAR full height */}
      <aside
        className={
          `bg-green-700 text-white flex flex-col w-64 h-screen z-40 shadow-[4px_0_32px_-8px_rgba(22,101,52,0.15)]
          fixed md:static top-0 left-0
          transition-transform duration-300
          ${open ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0`
        }
        style={{ minHeight: '100vh' }}
      >
        <div className="flex items-center gap-3 px-6 h-20 font-extrabold text-2xl tracking-tight border-b border-green-800 bg-green-800 select-none">
          <span className="text-emerald-200 text-2xl"><i className="fa-solid fa-car-side"></i></span>
          <span className="font-extrabold tracking-widest text-xl">RideBooking</span>
        </div>
        <nav className="flex flex-col py-6 gap-2 flex-1">
          {navLinks.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center px-7 py-3 font-medium gap-3 rounded-l-none hover:bg-green-600 transition text-base
                ${pathname.startsWith(item.to) ? 'bg-green-900 font-bold shadow-lg' : ''}`}
              onClick={() => setOpen(false)}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="hidden md:inline">{item.text}</span>
            </Link>
          ))}
        </nav>
        <div className="mt-auto pb-6 px-7">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="block w-full py-3 text-center font-bold rounded-lg bg-white text-green-700 hover:bg-green-100 transition"
            >Đăng xuất</button>
          ) : (
            <Link
              to="/login"
              className="block w-full py-3 text-center font-bold rounded-lg bg-white text-green-700 hover:bg-green-100 transition"
              onClick={()=>setOpen(false)}
            >Đăng nhập</Link>
          )}
        </div>
      </aside>

      {/* Overlay mobile (bấm ngoài là đóng sidebar) */}
      {open && (
        <div className="fixed inset-0 z-30 bg-black/30 md:hidden" onClick={() => setOpen(false)} />
      )}
      {/* Hamburger button mobile */}
      <button
        className="fixed md:hidden z-50 top-4 left-4 bg-green-700 text-white p-3 rounded-full shadow-lg hover:bg-green-800 transition"
        style={{ pointerEvents: open ? 'none' : 'auto' }}
        aria-label="Mở menu"
        onClick={() => setOpen(true)}
      >
        <svg width="1.5em" height="1.5em" viewBox="0 0 24 24" fill="none" className="inline"><path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
      </button>

      {/* Content */}
      <div className="flex-1 min-h-screen flex flex-col md:ml-64">
        <div className="w-full max-w-5xl mx-auto py-6 px-2 md:px-8 flex-1">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;