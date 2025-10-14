import React from 'react';

const TripStatusUpdater = ({ status, onUpdate }) => {
  const statusOptions = ['Chờ xuất phát', 'Đang chạy', 'Đã hoàn thành', 'Đã hủy'];
  const color = s => s==="Chờ xuất phát" ? 'bg-green-50 text-green-800' : s==="Đang chạy" ? 'bg-yellow-100 text-yellow-900' : s==="Đã hoàn thành" ? 'bg-green-700 text-white' : 'bg-gray-400 text-white';
  return (
    <div className="bg-white rounded-xl shadow-md p-5 flex flex-col gap-2 items-start mb-4 border-green-300 border-l-4">
      <div className="font-bold text-green-700 mb-1">Trạng thái chuyến đi:</div>
      <div className={`px-3 py-2 rounded font-semibold text-sm mb-2 ${color(status)}`}>{status}</div>
      <div className="flex gap-2">
        {statusOptions.filter(s=>s!==status).map(opt => (
          <button key={opt}
            onClick={()=>onUpdate(opt)}
            className="btn btn-xs btn-outline-success"
          >Chuyển trạng thái: {opt}</button>
        ))}
      </div>
      {status === 'Đang chạy' && (
        <div className="text-yellow-700 mt-2">Cảnh báo: Đảm bảo an toàn chạy tuyến!</div>
      )}
    </div>
  );
};

// Example mock usage:
// <TripStatusUpdater status="Đang chạy" onUpdate={s=>console.log('Update to', s)}/>

export default TripStatusUpdater;
