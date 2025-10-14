import React, { useState } from 'react';
import BookingRequestCard from './components/BookingRequestCard';

const data = [
  { id: 1, user: 'Trần Hữu D', route: 'Hà Nội - Nghệ An', seat: 'B4', time: '14:30 15/10', status: 'Chờ xác nhận' },
  { id: 2, user: 'Nguyễn Vị E', route: 'Đà Nẵng - SG', seat: 'A16', time: '20:00 15/10', status: 'Đã nhận' },
  { id: 3, user: 'Phạm Quỳnh', route: 'ĐN - Huế', seat: 'C12', time: '22:20 18/10', status: 'Đã hủy' },
];

const ManageBookingsPage = () => {
  const [requests, setRequests] = useState(data);
  const updateStatus = (id, st) => setRequests(
    requests.map(r=>r.id===id ? {...r, status:st} : r)
  );
  return (
    <div>
      <h1 className="text-xl font-bold text-green-800 mb-4">Quản lý yêu cầu đặt vé</h1>
      {requests.map(r => (
        <BookingRequestCard key={r.id} request={r}
          onAccept={()=>updateStatus(r.id, 'Đã nhận')}
          onReject={()=>updateStatus(r.id, 'Đã hủy')}
        />
      ))}
      {requests.length === 0 && <div className="text-gray-400 mt-8">Chưa có yêu cầu nào...</div>}
    </div>
  );
};
export default ManageBookingsPage;
