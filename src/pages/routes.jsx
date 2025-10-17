import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './common/LandingPage';
import LoginPage from './auth/LoginPage';
import RegisterPage from './auth/RegisterPage';
import ForgotPasswordPage from './auth/ForgotPasswordPage';
import ResetPasswordPage from './auth/ResetPasswordPage';
import MainLayout from './common/layouts/MainLayout';
import DriverLayout from './common/layouts/DriverLayout';
import AdminLayout from './common/layouts/AdminLayout';
import NotFoundPage from './common/NotFoundPage';
// Customer pages
import HomePage from './customer/HomePage';
import BookingPage from './customer/BookingPage';
import MyBookingsPage from './customer/MyBookingsPage';
import PaymentPage from './customer/PaymentPage';
import TrackingPage from './customer/TrackingPage';
import RatingPage from './customer/RatingPage';
import SearchTripPage from './customer/SearchTripPage';
import TripDetailPage from './customer/TripDetailPage';
// Driver pages
import DriverDashboard from './driver/DriverDashboard';
import MyTripsPage from './driver/MyTripsPage';
import ManageBookingsPage from './driver/ManageBookingsPage';
import EarningsPage from './driver/EarningsPage';
import MyVehiclesPage from './driver/MyVehiclesPage';
// Admin pages
import AdminDashboard from './admin/AdminDashboard';
import UsersPage from './admin/UsersPage';
import BookingsPage from './admin/BookingsPage';
import RoutesPage from './admin/RoutesPage';
import TripsPage from './admin/TripsPage';
import VehiclesPage from './admin/VehiclesPage';
import PromotionsPage from './admin/PromotionsPage';
import ReportsPage from './admin/ReportsPage';
import SettingsPage from './admin/SettingsPage';

// Fake auth (mock role/user)
const fakeAuth = {
  isAuth: true,
  role: 'admin', // 'driver' | 'admin'
};

function Guard({ children, role }) {
  if (!fakeAuth.isAuth) return <Navigate to="/login" />;
  if (role && fakeAuth.role !== role) return <Navigate to="/" />;
  return children;
}
export default function AllRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* AUTH PAGES */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        {/* CUSTOMER */}
        <Route element={<MainLayout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/search" element={<SearchTripPage />} />
          <Route path="/my-bookings" element={<Guard><MyBookingsPage /></Guard>} />
          <Route path="/booking" element={<Guard><BookingPage /></Guard>} />
          <Route path="/payment" element={<Guard><PaymentPage /></Guard>} />
          <Route path="/tracking" element={<Guard><TrackingPage /></Guard>} />
          <Route path="/rating" element={<Guard><RatingPage /></Guard>} />
          <Route path="/trip-detail" element={<SearchTripPage />} />
        </Route>

        {/* DRIVER */}
        <Route path="/driver" element={<Guard role='driver'><DriverLayout /></Guard>}>
          <Route index element={<DriverDashboard />} />
          <Route path="my-trips" element={<MyTripsPage />} />
          <Route path="manage-bookings" element={<ManageBookingsPage />} />
          <Route path="earnings" element={<EarningsPage />} />
          <Route path="my-vehicles" element={<MyVehiclesPage />} />
        </Route>

        {/* ADMIN */}
        <Route path="/admin" element={<Guard role='admin'><AdminLayout /></Guard>}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="bookings" element={<BookingsPage />} />
          <Route path="routes" element={<RoutesPage />} />
          <Route path="trips" element={<TripsPage />} />
          <Route path="vehicles" element={<VehiclesPage />} />
          <Route path="promotions" element={<PromotionsPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}