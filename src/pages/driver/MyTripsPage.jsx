import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import TripStatusUpdater from './components/TripStatusUpdater';

const mockTrips = [
  { id: 1, route: "Hà Nội - Đà Nẵng", time: "07:00 15/10", status: "Đang chạy" },
  { id: 2, route: "Huế - Sài Gòn", time: "16:00 17/10", status: "Sắp tới" },
  { id: 3, route: "Nha Trang - Hà Nội", time: "19:15 23/10", status: "Hoàn thành" },
];
const statusColor = s => s==="Hoàn thành"?"text-green-700":s==="Đang chạy"?"text-yellow-900":'text-blue-700';
const MyTripsPage = () => {
  const [st, setSt] = useState("");
  const [trips, setTrips] = useState(mockTrips);
  const navigate = useNavigate();

  const filtered = st ? trips.filter(t=>t.status===st) : trips;

  const updateTripStatus = (id, status) => {
    setTrips(prev => prev.map(t => t.id===id ? { ...t, status } : t));
  };

  return (
    <div>
      <h1 className="text-xl font-bold text-green-800 mb-4">Chuyến xe của tôi</h1>
      <div className="mb-4 flex gap-2 items-center">
        <select className="input input-bordered" value={st} onChange={e=>setSt(e.target.value)}>
          <option value="">Tất cả trạng thái</option>
          <option>Đang chạy</option>
          <option>Sắp tới</option>
          <option>Hoàn thành</option>
        </select>
        <button className="btn btn-success">Lọc</button>
      </div>
      <div className="bg-white rounded shadow">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-green-100 text-green-800">
              <th className="py-2">Tuyến</th><th>Thời gian</th><th>Trạng thái</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(t=>(
              <tr key={t.id} className="border-b last:border-none">
                <td className="py-2">{t.route}</td>
                <td>{t.time}</td>
                <td><span className={statusColor(t.status)+" font-medium"}>{t.status}</span></td>
                <td>
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                      <button className="btn btn-xs btn-success" onClick={()=>navigate(`/tracking?tripId=${t.id}`)}>Theo dõi</button>
                      {t.status!=="Hoàn thành" && (
                        <button className="btn btn-xs btn-outline-success" onClick={()=>updateTripStatus(t.id, 'Hoàn thành')}>Hoàn thành</button>
                      )}
                    </div>
                    <TripStatusUpdater status={t.status} onUpdate={(s)=>updateTripStatus(t.id, s)} />
                  </div>
                </td>
              </tr>))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyTripsPage;
