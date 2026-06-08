import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import BusSearch from './pages/BusSearch';
import TrainSearch from './pages/TrainSearch';
import BusBookingForm from './pages/BusBookingForm';
import TrainBookingForm from './pages/TrainBookingForm';
import MyBusBookings from './pages/MyBusBookings';
import MyTrainBookings from './pages/MyTrainBookings';

import Dashboard from './pages/admin/Dashboard';
import ManageBuses from './pages/admin/ManageBuses';
import ManageTrains from './pages/admin/ManageTrains';
import AllBusBookings from './pages/admin/AllBusBookings';
import AllTrainBookings from './pages/admin/AllTrainBookings';
import ActivityLogs from './pages/admin/ActivityLogs';

function App() {
  return (
    <div className="min-h-screen bg-dark-900">
      <Navbar />
      <main className="pt-16">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/buses/search" element={<BusSearch />} />
          <Route path="/trains/search" element={<TrainSearch />} />

          {/* Protected User Routes */}
          <Route path="/buses/book/:id" element={
            <ProtectedRoute><BusBookingForm /></ProtectedRoute>
          } />
          <Route path="/trains/book/:id" element={
            <ProtectedRoute><TrainBookingForm /></ProtectedRoute>
          } />
          <Route path="/my-bus-bookings" element={
            <ProtectedRoute><MyBusBookings /></ProtectedRoute>
          } />
          <Route path="/my-train-bookings" element={
            <ProtectedRoute><MyTrainBookings /></ProtectedRoute>
          } />

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={
            <AdminRoute><Dashboard /></AdminRoute>
          } />
          <Route path="/admin/buses" element={
            <AdminRoute><ManageBuses /></AdminRoute>
          } />
          <Route path="/admin/trains" element={
            <AdminRoute><ManageTrains /></AdminRoute>
          } />
          <Route path="/admin/bus-bookings" element={
            <AdminRoute><AllBusBookings /></AdminRoute>
          } />
          <Route path="/admin/train-bookings" element={
            <AdminRoute><AllTrainBookings /></AdminRoute>
          } />
          <Route path="/admin/logs" element={
            <AdminRoute><ActivityLogs /></AdminRoute>
          } />
        </Routes>
      </main>
    </div>
  );
}

export default App;
