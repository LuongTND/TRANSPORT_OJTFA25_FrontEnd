import React, { useState } from 'react';

const SettingsPage = () => {
  const [showPwd, setShowPwd] = useState(false);
  return (
    <div>
      <h1 className="text-xl font-bold text-green-800 mb-6">Cài đặt hệ thống</h1>
      <div className="bg-white rounded shadow p-6 mb-10">
        <div className="font-semibold text-green-700 mb-2">Chức năng bật/tắt (mock)</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>Hiện tính năng khuyến mãi <input type="checkbox" className="ml-2" defaultChecked /></div>
          <div>Hiện thống kê <input type="checkbox" className="ml-2" /></div>
        </div>
      </div>
      <div className="bg-white rounded shadow p-6 w-full max-w-lg">
        <div className="font-semibold text-green-700 mb-3">Đổi mật khẩu admin</div>
        <form className="flex flex-col gap-4">
          <input type="password" placeholder="Mật khẩu hiện tại" className="input input-bordered" />
          <input type={showPwd ? "text" : "password"} placeholder="Mật khẩu mới" className="input input-bordered" />
          <input type={showPwd ? "text" : "password"} placeholder="Xác nhận mật khẩu mới" className="input input-bordered" />
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={showPwd} onChange={()=>setShowPwd(s=>!s)} />
            Hiện mật khẩu
          </label>
          <button className="btn btn-success w-max">Đổi mật khẩu</button>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;
