import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import driverApi from "../../api/driverApi";
import { getUserInfo } from "../../utils/mockAuth";

const DriverDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [driver, setDriver] = useState({ name: "", vehicle: "" });
  const [stats, setStats] = useState([
    { label: "Tổng chuyến", value: 0 },
    { label: "Hôm nay", value: 0 },
    { label: "Doanh thu tháng", value: "0đ" },
  ]);
  const [upcoming, setUpcoming] = useState([]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");
      const USE_MOCK = true;
      try {
        const user = getUserInfo();
        const driverId = user?.id || 1;
        if (!USE_MOCK) {
          const res = await driverApi.getDriverDashboard(driverId);
          const d = res?.data || res;
          setDriver({ name: d.name, vehicle: d.vehicle });
          setStats(d.stats || stats);
          setUpcoming(d.upcoming || []);
        } else {
          setDriver({ name: "Nguyễn Văn B", vehicle: "29S-555.12" });
          setStats([
            { label: "Tổng chuyến", value: 148 },
            { label: "Hôm nay", value: 2 },
            { label: "Doanh thu tháng", value: "8,400,000đ" },
          ]);
          setUpcoming([
            { id: 11, route: "Sân bay - Mỹ Khê", time: "12:20 14/10", status: "Sắp chạy" },
            { id: 17, route: "Cầu Rồng - Bà Nà Hills", time: "15:30 14/10", status: "Đang nhận khách" },
          ]);
        }
      } catch (err) {
        setError("Không tải được dữ liệu dashboard");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-green-700 mb-1">
            Xin chào, Tài xế {driver.name} 👋
          </h2>
          <p className="text-gray-600">
            Xe phụ trách: <span className="font-semibold text-gray-900">{driver.vehicle || 'Đang cập nhật'}</span>
          </p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => navigate('/driver/manage-bookings')}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg font-semibold shadow transition-colors"
          >
            Yêu cầu đặt chỗ
          </button>
          <button 
            onClick={() => navigate('/driver/my-trips')}
            className="bg-white border-2 border-green-600 text-green-700 px-5 py-2 rounded-lg font-semibold hover:bg-green-50 transition-colors"
          >
            Chuyến của tôi
          </button>
        </div>
      </div>

      {/* Top stats */}
      <section className="mb-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <div key={i} className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
              <div className="text-sm text-gray-600 mb-1">{s.label}</div>
              <div className="text-2xl font-bold text-gray-900">{s.value}</div>
            </div>
          ))}
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500">
            <div className="text-sm text-gray-600 mb-1">Yêu cầu mới</div>
            <div className="text-2xl font-bold text-yellow-600">3</div>
            <button 
              className="mt-3 text-sm text-green-600 hover:text-green-700 font-semibold"
              onClick={() => navigate('/driver/manage-bookings')}
            >
              Xem yêu cầu →
            </button>
          </div>
        </div>
      </section>

      {/* Revenue chart */}
      <section className="mb-10">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">Biểu đồ doanh thu</h3>
            <Link to="/driver/earnings" className="text-green-600 hover:text-green-700 font-semibold text-sm">
              Xem chi tiết
            </Link>
          </div>
          <div className="h-36 flex justify-center items-center bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border-2 border-dashed border-green-200">
            <span className="text-gray-400 italic">(Biểu đồ doanh thu sẽ hiển thị tại đây)</span>
          </div>
        </div>
      </section>

      {/* Two columns: upcoming trips and quick actions */}
      <section className="mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upcoming trips */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">Chuyến sắp tới</h3>
                <Link to="/driver/my-trips" className="text-green-600 hover:text-green-700 font-semibold text-sm">
                  Xem tất cả
                </Link>
              </div>
              {upcoming.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-green-100 text-green-800">
                      <tr>
                        <th className="p-3 text-left font-semibold">Tuyến</th>
                        <th className="p-3 text-center font-semibold">Thời gian</th>
                        <th className="p-3 text-center font-semibold">Trạng thái</th>
                      </tr>
                    </thead>
                    <tbody>
                      {upcoming.map((u, idx) => (
                        <tr key={u.id} className={`border-b last:border-0 ${idx % 2 === 0 ? 'bg-white' : 'bg-green-50'} hover:bg-green-100 transition-colors`}>
                          <td className="p-3 font-semibold text-gray-900">{u.route}</td>
                          <td className="p-3 text-center text-gray-700">{u.time}</td>
                          <td className="p-3 text-center">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                              u.status === 'Sắp chạy' ? 'bg-blue-100 text-blue-700' :
                              u.status === 'Đang nhận khách' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-green-100 text-green-700'
                            }`}>
                              {u.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-gray-500 italic p-4 bg-gray-50 rounded-lg text-center">
                  Chưa có chuyến sắp tới
                </div>
              )}
            </div>
          </div>

          {/* Quick actions and vehicle status */}
          <div className="space-y-6">
            {/* Quick actions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Thao tác nhanh</h3>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  className="p-3 bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg text-sm font-semibold text-green-700 transition-colors"
                  onClick={() => navigate('/driver/manage-bookings')}
                >
                  Nhận khách
                </button>
                <button 
                  className="p-3 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg text-sm font-semibold text-blue-700 transition-colors"
                  onClick={() => navigate('/driver/my-trips')}
                >
                  Cập nhật TT
                </button>
                <button 
                  className="p-3 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg text-sm font-semibold text-purple-700 transition-colors"
                  onClick={() => navigate('/driver/earnings')}
                >
                  Doanh thu
                </button>
                <button 
                  className="p-3 bg-orange-50 hover:bg-orange-100 border border-orange-200 rounded-lg text-sm font-semibold text-orange-700 transition-colors"
                  onClick={() => navigate('/driver/my-vehicles')}
                >
                  Xe của tôi
                </button>
              </div>
            </div>

            {/* Vehicle status */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Trạng thái phương tiện</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span className="text-sm text-gray-700 font-medium">Bảo dưỡng</span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                    Không cần
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span className="text-sm text-gray-700 font-medium">Giấy tờ</span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                    Hợp lệ
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Promotion banner */}
      <section className="bg-green-50 border-l-4 border-green-600 px-8 py-7 rounded-xl flex flex-col sm:flex-row items-center gap-4 shadow">
        <span className="text-3xl">🎯</span>
        <span className="text-green-900 font-semibold text-center sm:text-left flex-1">
          Hoàn thành <span className="text-red-600 font-bold">20 chuyến</span> trong tuần - Nhận thưởng <span className="text-green-600 font-bold">500.000đ</span>!
        </span>
        <button 
          onClick={() => navigate('/driver/earnings')}
          className="sm:ml-auto bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 font-semibold transition-colors flex-shrink-0"
        >
          Xem tiến độ
        </button>
      </section>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}
    </div>
  );
};

export default DriverDashboard;