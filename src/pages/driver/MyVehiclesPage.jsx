import React from 'react';
const vehicles = [
  { id: 1, license: '29S-555.12', type: 'Limousine', seat: 11, status: 'Đang hoạt động' },
  { id: 2, license: '73B-111.88', type: 'Giường nằm', seat: 38, status: 'Bảo trì' },
];
const MyVehiclesPage = () => (
  <div>
    <h1 className="text-xl font-bold text-green-800 mb-4">Xe của tôi</h1>
    <div className="bg-white rounded shadow">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-green-100 text-green-800">
            <th className="py-2">Biển số</th><th>Loại xe</th><th>Ghế</th><th>Trạng thái</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map(v=>(
            <tr key={v.id} className="border-b last:border-0">
              <td className="py-2">{v.license}</td>
              <td>{v.type}</td>
              <td>{v.seat}</td>
              <td><span className={v.status==="Đang hoạt động" ? 'text-green-700' : 'text-yellow-900'}>{v.status}</span></td>
              <td><button className="btn btn-xs btn-outline-success" onClick={()=>alert('Chức năng sửa xe (placeholder)')}>Sửa</button></td>
            </tr>))}
        </tbody>
      </table>
    </div>
  </div>
);
export default MyVehiclesPage;
