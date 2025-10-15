import React, { useState } from 'react';
const PaymentPage = () => {
  const [status] = useState('Chờ thanh toán'); //'Đã thanh toán'
  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-xl font-bold text-green-800 mb-4">Thanh toán vé</h1>
      <div className="bg-white rounded shadow p-6 text-center">
        <div className="text-lg">Số tiền cần thanh toán:</div>
        <div className="text-3xl font-bold text-green-700 mb-4">1.700.000đ</div>
        {status==='Chờ thanh toán'?<>
          <div className="mb-2">Vui lòng quét QR để thanh toán</div>
          <div className="bg-green-50 inline-block p-5 rounded mb-3"><div className="w-28 h-28 bg-gray-300 rounded-sm flex items-center justify-center text-gray-400">QR</div></div>
          <div className="text-yellow-700 mb-2">Chờ xác nhận thanh toán...</div>
        </>:
        <div className="text-green-700 font-bold">Đã thanh toán thành công!</div>}
        <button className="btn btn-success w-full mt-4">Về lịch sử vé</button>
      </div>
    </div>
  );
};
export default PaymentPage;
