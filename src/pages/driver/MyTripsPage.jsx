import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import TripStatusUpdater from './components/TripStatusUpdater';

const mockTrips = [
  { id: 1, route: "Hà Nội - Đà Nẵng", time: "07:00 15/10", status: "Đang chạy", passengers: 3, seats: 4 },
  { id: 2, route: "Huế - Sài Gòn", time: "16:00 17/10", status: "Sắp tới", passengers: 2, seats: 4 },
  { id: 3, route: "Nha Trang - Hà Nội", time: "19:15 23/10", status: "Hoàn thành", passengers: 4, seats: 4 },
];

const statusColor = s => s==="Hoàn thành"?"bg-green-100 text-green-700":s==="Đang chạy"?"bg-yellow-100 text-yellow-700":'bg-blue-100 text-blue-700';

const MyTripsPage = () => {
  const [st, setSt] = useState("");
  const [trips, setTrips] = useState(mockTrips);
  const navigate = useNavigate();

  const filtered = st ? trips.filter(t=>t.status===st) : trips;

  const updateTripStatus = (id, status) => {
    setTrips(prev => prev.map(t => t.id===id ? { ...t, status } : t));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-green-700 text-white p-4 md:p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Chuyến xe của tôi</h1>
          <p className="text-green-100 text-sm md:text-base">Quản lý và theo dõi các chuyến xe ghép</p>
        </div>
      </div>

      {/* Filter */}
      <div className="bg-white border-b p-4">
        <div className="max-w-6xl mx-auto flex gap-2">
          <select 
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm md:text-base"
            value={st} 
            onChange={e=>setSt(e.target.value)}
          >
            <option value="">Tất cả trạng thái</option>
            <option>Đang chạy</option>
            <option>Sắp tới</option>
            <option>Hoàn thành</option>
          </select>
          <button className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium text-sm md:text-base">
            Lọc
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto p-4 md:p-6">
        
        {/* Mobile View */}
        <div className="lg:hidden space-y-4">
          {filtered.map(t=>(
            <div key={t.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* Card Content */}
              <div className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-1">{t.route}</h3>
                    <p className="text-sm text-gray-600">{t.time}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor(t.status)}`}>
                    {t.status}
                  </span>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm text-gray-700">Ghép chỗ: <span className="font-semibold">{t.passengers}/{t.seats}</span></p>
                </div>

                {/* Buttons */}
                <div className="space-y-2">
                  <button 
                    className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg text-sm"
                    onClick={()=>navigate(`/tracking?tripId=${t.id}`)}
                  >
                    Theo dõi hành trình
                  </button>
                  
                  {t.status!=="Hoàn thành" && (
                    <button 
                      className="w-full py-3 border-2 border-green-600 text-green-700 hover:bg-green-50 font-medium rounded-lg text-sm"
                      onClick={()=>updateTripStatus(t.id, 'Hoàn thành')}
                    >
                      Hoàn thành chuyến
                    </button>
                  )}
                </div>
              </div>

              {/* Status Updater */}
              {t.status !== "Hoàn thành" && (
                <div className="border-t bg-gray-50 p-4">
                  <TripStatusUpdater status={t.status} onUpdate={(s)=>updateTripStatus(t.id, s)} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Desktop View */}
        <div className="hidden lg:block bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-green-700 text-white">
                <th className="py-4 px-6 text-left font-semibold">Tuyến đường</th>
                <th className="py-4 px-6 text-left font-semibold">Thời gian</th>
                <th className="py-4 px-6 text-left font-semibold">Ghép chỗ</th>
                <th className="py-4 px-6 text-left font-semibold">Trạng thái</th>
                <th className="py-4 px-6 text-left font-semibold">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(t=>(
                <tr key={t.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <span className="font-semibold text-gray-900">{t.route}</span>
                  </td>
                  <td className="py-4 px-6 text-gray-700">
                    {t.time}
                  </td>
                  <td className="py-4 px-6 text-gray-700">
                    {t.passengers}/{t.seats} chỗ
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${statusColor(t.status)}`}>
                      {t.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <button 
                          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg"
                          onClick={()=>navigate(`/tracking?tripId=${t.id}`)}
                        >
                          Theo dõi
                        </button>
                        {t.status!=="Hoàn thành" && (
                          <button 
                            className="px-4 py-2 border-2 border-green-600 text-green-700 hover:bg-green-50 text-sm font-medium rounded-lg"
                            onClick={()=>updateTripStatus(t.id, 'Hoàn thành')}
                          >
                            Hoàn thành
                          </button>
                        )}
                      </div>
                      {t.status !== "Hoàn thành" && (
                        <TripStatusUpdater status={t.status} onUpdate={(s)=>updateTripStatus(t.id, s)} />
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filtered.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="text-6xl mb-4">🚗</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Không có chuyến xe nào</h3>
            <p className="text-gray-500">Thử thay đổi bộ lọc để xem các chuyến xe khác</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTripsPage;