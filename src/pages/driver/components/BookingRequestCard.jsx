import React from 'react';

const BookingRequestCard = ({ request, onAccept, onReject }) => (
  <div className="bg-white rounded-xl shadow-md p-5 border-l-8 border-green-600 flex flex-col gap-1 mb-4">
    <div className="flex justify-between items-center mb-1">
      <span className="text-green-700 font-bold">Khách: {request.user}</span>
      <span className="text-gray-400 text-xs">Mã: {request.id}</span>
    </div>
    <div className="flex gap-3 items-center mb-1">
      <span className="text-green-800 font-semibold">{request.route}</span>
      <span className="bg-green-50 text-green-800 rounded px-2 py-1 text-xs">Ghế: {request.seat}</span>
    </div>
    <div className="flex gap-4 text-sm mb-2">
      <span>Thời gian: <strong>{request.time}</strong></span>
      <span>Trạng thái: <span className={request.status==="Chờ xác nhận"?'text-yellow-700':request.status==="Đã nhận"?'text-green-700':'text-gray-400'}>{request.status}</span></span>
    </div>
    <div className="flex gap-2 mt-2">
      {request.status === 'Chờ xác nhận' && <>
        <button className="btn btn-success btn-xs" onClick={onAccept}>Nhận khách</button>
        <button className="btn btn-outline-error btn-xs" onClick={onReject}>Từ chối</button>
      </>}
      {request.status === 'Đã nhận' && <span className="text-green-700 font-semibold">Đã nhận chuyến</span>}
      {request.status === 'Đã hủy' && <span className="text-gray-400 italic">Đã từ chối</span>}
    </div>
  </div>
);

// Example mock data usage:
// <BookingRequestCard request={{id:123, user:"Lê Văn D", route:"Hà Nội-SG", seat:'B12', time:'09:30 15/10', status:'Chờ xác nhận'}} />

export default BookingRequestCard;
