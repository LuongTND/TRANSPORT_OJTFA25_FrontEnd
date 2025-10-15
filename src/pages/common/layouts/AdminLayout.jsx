import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer";

const nav = [
  { to: "/admin", text: "Dashboard" },
  { to: "/admin/users", text: "Người dùng" },
  { to: "/admin/bookings", text: "Đơn đặt vé" },
  { to: "/admin/routes", text: "Tuyến xe" },
  { to: "/admin/trips", text: "Chuyến xe" },
  { to: "/admin/vehicles", text: "Xe khách" },
  { to: "/admin/promotions", text: "Khuyến mãi" },
  { to: "/admin/reports", text: "Báo cáo" },
  { to: "/admin/settings", text: "Cài đặt" },
];

const AdminLayout = () => {
  const { pathname } = useLocation();
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 flex flex-row">
        <aside className="w-52 bg-green-800 text-white flex flex-col py-6 px-2 gap-1 shadow-lg">
          <div className="text-2xl font-extrabold text-center mb-8 tracking-widest">ADMIN</div>
          {nav.map(i => (
            <Link
              to={i.to}
              className={
                pathname.startsWith(i.to)
                  ? "bg-green-700 font-bold rounded px-4 py-2 my-1"
                  : "rounded hover:bg-green-700 px-4 py-2 my-1 transition-colors"
              }
              key={i.to}
            >
              {i.text}
            </Link>
          ))}
        </aside>
        <div className="flex-1 flex flex-col">
          <header className="h-16 bg-white border-b flex items-center px-8 justify-end gap-2 shadow-sm">
            <Link to="/" className="text-green-700 font-semibold">Về trang khách</Link>
            <Link to="/login" className="px-3 py-1 rounded bg-green-600 text-white font-bold hover:bg-green-700">Đăng xuất</Link>
          </header>
          <main className="flex-1 bg-green-50 px-4 py-6 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default AdminLayout;
