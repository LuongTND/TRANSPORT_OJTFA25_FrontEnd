import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const nav = [
  { to: "/admin", text: "Trang chủ", icon: "📊" },
  { to: "/admin/users", text: "Người dùng", icon: "👥" },
  { to: "/admin/bookings", text: "Đơn đặt vé", icon: "🎫" },
  { to: "/admin/routes", text: "Tuyến xe", icon: "🛣️" },
  { to: "/admin/trips", text: "Chuyến xe", icon: "🚌" },
  { to: "/admin/vehicles", text: "Xe khách", icon: "🚐" },
  { to: "/admin/promotions", text: "Khuyến mãi", icon: "🎁" },
  { to: "/admin/reports", text: "Báo cáo", icon: "📈" },
  { to: "/admin/settings", text: "Cài đặt", icon: "⚙️" },
];

const AdminLayout = () => {
  const { pathname } = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 flex flex-row">
        {/* Sidebar */}
        <aside className={`bg-green-800 text-white flex flex-col shadow-[4px_0_24px_-8px_rgba(0,0,0,0.3)] h-screen fixed left-0 top-0 transition-all duration-300 z-40 ${sidebarOpen ? 'w-64' : 'w-16'}`}>
          {/* Logo/Brand with Toggle */}
          <div className="h-20 flex items-center justify-between px-4 border-b border-green-700 bg-green-900">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center text-2xl shadow-lg">
                🛡️
              </div>
              {sidebarOpen && (
                <div>
                  <div className="text-xl font-extrabold tracking-wider">ADMIN</div>
                  <div className="text-xs text-green-300">RideBooking</div>
                </div>
              )}
            </div>
            {/* Toggle button - luôn nằm trong sidebar */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-white hover:bg-green-700 p-2 rounded-lg transition-colors flex-shrink-0"
              aria-label="Toggle sidebar"
              title={sidebarOpen ? "Thu gọn sidebar" : "Mở rộng sidebar"}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="transition-transform">
                <path d={sidebarOpen ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 flex flex-col py-6 px-3 gap-1 overflow-y-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <style>{`
              nav::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            {nav.map(i => {
              const isActive = pathname === i.to || (i.to !== "/admin" && pathname.startsWith(i.to));
              return (
                <Link
                  to={i.to}
                  className={`
                    flex items-center gap-3 rounded-lg px-4 py-3 my-0.5 transition-all duration-200 group
                    ${isActive 
                      ? "bg-green-700 font-bold shadow-md border-l-4 border-green-400" 
                      : "hover:bg-green-700 hover:pl-5 font-medium text-green-100"
                    }
                  `}
                  key={i.to}
                  title={!sidebarOpen ? i.text : ''}
                >
                  <span className="text-xl min-w-[1.5rem] text-center">{i.icon}</span>
                  {sidebarOpen && <span className="text-sm">{i.text}</span>}
                  {isActive && sidebarOpen && (
                    <span className="ml-auto text-green-300">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M6 12l4-4-4-4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
                      </svg>
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Footer info */}
          <div className="px-4 py-4 border-t border-green-700 bg-green-900">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center font-bold text-sm">
                AD
              </div>
              {sidebarOpen && (
                <div className="flex-1">
                  <div className="text-sm font-semibold">Admin User</div>
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
          {/* Header */}
          <header className="h-16 bg-white border-b border-green-100 flex items-center px-8 justify-between shadow-sm sticky top-0 z-10">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold text-green-800">
                {nav.find(i => pathname === i.to || (i.to !== "/admin" && pathname.startsWith(i.to)))?.text || "Dashboard"}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <Link 
                to="/" 
                className="text-green-700 font-semibold hover:text-green-800 transition-colors flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-green-50"
              >
                <span>🏠</span>
                <span>Về trang khách</span>
              </Link>
              <Link 
                to="/login" 
                className="px-4 py-2 rounded-lg bg-green-600 text-white font-bold hover:bg-green-700 transition-all shadow-md hover:shadow-lg flex items-center gap-2"
              >
                <span>🚪</span>
                <span>Đăng xuất</span>
              </Link>
            </div>
          </header>

          {/* Main Content Area */}
          <main className="flex-1 bg-gradient-to-br from-green-50 to-emerald-50 px-6 py-8 overflow-y-auto">
            <div className="max-w-7xl mx-auto">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;