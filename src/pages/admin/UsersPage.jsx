import React, { useState } from "react";

const mockUsers = [
  { id: 1, name: "Nguyễn Văn A", email: "a@gmail.com", phone: "0123456789", role: "Khách" },
  { id: 2, name: "Trần Thị B", email: "b@gmail.com", phone: "0167890123", role: "Tài xế" },
  { id: 3, name: "Admin C", email: "admin@gmail.com", phone: "0981123123", role: "Admin" },
];

const UsersPage = () => {
  const [q, setQ] = useState("");
  const filtered = mockUsers.filter(u => (
    u.name.toLowerCase().includes(q.toLowerCase()) ||
    u.email.toLowerCase().includes(q.toLowerCase()) ||
    u.phone.includes(q)
  ));
  return (
    <div>
      <h1 className="text-xl font-bold text-green-800 mb-4">Quản lý người dùng</h1>
      <div className="mb-4 flex gap-2">
        <input
          className="input input-bordered w-64"
          placeholder="Tìm tên, email hoặc SĐT..."
          value={q}
          onChange={e => setQ(e.target.value)}
        />
        <button className="btn btn-success">Tìm kiếm</button>
      </div>
      <div className="bg-white rounded shadow">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-green-100 text-green-800">
              <th className="py-2">Tên</th><th>Email</th><th>Điện thoại</th><th>Vai trò</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(u => (
              <tr key={u.id} className="border-b last:border-none">
                <td className="py-2">{u.name}</td>
                <td>{u.email}</td>
                <td>{u.phone}</td>
                <td>{u.role}</td>
                <td>
                  <button className="btn btn-xs btn-success mr-2">Xem</button>
                  <button className="btn btn-xs btn-outline-success mr-2">Sửa</button>
                  <button className="btn btn-xs btn-outline-error">Block</button>
                </td>
              </tr>))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersPage;
