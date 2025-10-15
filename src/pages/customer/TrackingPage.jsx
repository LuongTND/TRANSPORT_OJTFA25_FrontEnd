import React from 'react';
const step = [
  { label: 'Chờ xuất phát', done: true },
  { label: 'Đang chạy', done: true },
  { label: 'Đến trạm', done: false },
  { label: 'Hoàn thành', done: false }
];
const TrackingPage = () => (
  <div>
    <h1 className="text-xl font-bold text-green-800 mb-4">Theo dõi trạng thái chuyến đi</h1>
    <div className="bg-white rounded shadow p-6 mb-6">
      <div className="flex gap-8 mb-3">
        <span>Xe: <span className="font-bold text-green-700">29S-555.12</span></span>
        <span>Từ <span className="font-semibold">Hà Nội</span> đến <span className="font-semibold">Sài Gòn</span></span>
      </div>
      <div className="my-3">
        <div className="font-semibold">Tiến trình chuyến đi:</div>
        <div className="flex gap-6 mt-2 items-center">
          {step.map((s,i)=>(
            <React.Fragment key={i}>
              <span className={s.done?'text-green-700 font-medium':'text-gray-400'}>{s.label}</span>
              {i<step.length-1 && <span className={s.done?'text-green-600':'text-gray-300'}>→</span>}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
    <div className="bg-green-50 rounded shadow p-8 flex flex-col items-center text-gray-500">
      <span>MAP (placeholder)</span>
      <div className="w-72 h-48 bg-gray-300 rounded mt-3 flex items-center justify-center text-2xl">Bản đồ</div>
      <div className="text-green-600 mt-2 font-bold">Chuyến đang chạy</div>
    </div>
  </div>
)
export default TrackingPage;
