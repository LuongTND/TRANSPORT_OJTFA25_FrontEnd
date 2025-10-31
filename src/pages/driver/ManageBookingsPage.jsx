import React, { useState } from 'react';
import BookingRequestCard from './components/BookingRequestCard';
import driverApi from '../../api/driverApi';

const data = [
  { id: 1, user: 'Trần Hữu D', route: 'Hà Nội - Nghệ An', seat: 'B4', time: '14:30 15/10', status: 'Chờ xác nhận' },
  { id: 2, user: 'Nguyễn Vị E', route: 'Đà Nẵng - SG', seat: 'A16', time: '20:00 15/10', status: 'Đã nhận' },
  { id: 3, user: 'Phạm Quỳnh', route: 'ĐN - Huế', seat: 'C12', time: '22:20 18/10', status: 'Đã hủy' },
];

const ManageBookingsPage = () => {
  const [requests, setRequests] = useState(data);

  const updateStatus = (id, st) => setRequests(prev => (
    prev.map(r=>r.id===id ? {...r, status:st} : r)
  ));

  const handleAccept = async (id) => {
    try {
      // await driverApi.acceptBooking(id); // TODO: implement on backend
      updateStatus(id, 'Đã nhận');
    } catch (e) {
      console.error('Accept booking failed', e);
      alert('Không thể nhận chuyến, thử lại sau');
    }
  };

  const handleReject = async (id) => {
    try {
      // await driverApi.rejectBooking(id); // TODO: implement on backend
      updateStatus(id, 'Đã hủy');
    } catch (e) {
      console.error('Reject booking failed', e);
      alert('Không thể từ chối, thử lại sau');
    }
  };
  return (
    <div>
      <h1 className="text-xl font-bold text-green-800 mb-4">Quản lý yêu cầu đặt vé</h1>
      {requests.map(r => (
        <BookingRequestCard key={r.id} request={r}
          onAccept={()=>handleAccept(r.id)}
          onReject={()=>handleReject(r.id)}
        />
      ))}
      {requests.length === 0 && <div className="text-gray-400 mt-8">Chưa có yêu cầu nào...</div>}
    </div>
  );
};
export default ManageBookingsPage;
