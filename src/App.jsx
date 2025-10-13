import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
export default function App() {
  return (
    <Router>
      <Routes>
        {/* Trang trước khi đăng nhập */}
      
  

        {/* Trang admin */}
        <Route path="/admin" element={<Admin />} />

        {/* Dashboard sau khi đăng nhập */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

// Placeholder components
const Signup = () => <div>Trang đăng ký</div>;
const Dashboard = () => <div>Dashboard</div>;
const Admin = () => <div>Trang quản trị viên</div>;
