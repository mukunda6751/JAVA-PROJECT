import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

export default function Navbar() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-900/80 backdrop-blur-xl border-b border-dark-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/25 group-hover:shadow-primary-500/40 transition-shadow">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </div>
            <span className="text-xl font-bold gradient-text">SmartTravel</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            <Link to="/buses/search" className="px-3 py-2 rounded-lg text-sm font-medium text-dark-300 hover:text-white hover:bg-dark-800 transition-all">
              🚌 Buses
            </Link>
            <Link to="/trains/search" className="px-3 py-2 rounded-lg text-sm font-medium text-dark-300 hover:text-white hover:bg-dark-800 transition-all">
              🚆 Trains
            </Link>

            {isAuthenticated() && !isAdmin() && (
              <>
                <Link to="/my-bus-bookings" className="px-3 py-2 rounded-lg text-sm font-medium text-dark-300 hover:text-white hover:bg-dark-800 transition-all">
                  My Bus Bookings
                </Link>
                <Link to="/my-train-bookings" className="px-3 py-2 rounded-lg text-sm font-medium text-dark-300 hover:text-white hover:bg-dark-800 transition-all">
                  My Train Bookings
                </Link>
              </>
            )}

            {isAdmin() && (
              <>
                <Link to="/admin/dashboard" className="px-3 py-2 rounded-lg text-sm font-medium text-dark-300 hover:text-white hover:bg-dark-800 transition-all">
                  Dashboard
                </Link>
                <div className="relative group">
                  <button className="px-3 py-2 rounded-lg text-sm font-medium text-dark-300 hover:text-white hover:bg-dark-800 transition-all">
                    Admin ▾
                  </button>
                  <div className="absolute top-full right-0 mt-1 w-48 bg-dark-800 border border-dark-700 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 animate-slide-down">
                    <Link to="/admin/buses" className="block px-4 py-2.5 text-sm text-dark-300 hover:text-white hover:bg-dark-700 first:rounded-t-xl">Manage Buses</Link>
                    <Link to="/admin/trains" className="block px-4 py-2.5 text-sm text-dark-300 hover:text-white hover:bg-dark-700">Manage Trains</Link>
                    <Link to="/admin/bus-bookings" className="block px-4 py-2.5 text-sm text-dark-300 hover:text-white hover:bg-dark-700">Bus Bookings</Link>
                    <Link to="/admin/train-bookings" className="block px-4 py-2.5 text-sm text-dark-300 hover:text-white hover:bg-dark-700">Train Bookings</Link>
                    <Link to="/admin/logs" className="block px-4 py-2.5 text-sm text-dark-300 hover:text-white hover:bg-dark-700 last:rounded-b-xl">Activity Logs</Link>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated() ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {user?.name?.charAt(0)?.toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-dark-200">{user?.name}</span>
                </div>
                <button onClick={handleLogout} className="btn-secondary text-sm py-2 px-4">
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="btn-secondary text-sm py-2 px-4">Login</Link>
                <Link to="/register" className="btn-primary text-sm py-2 px-4">Register</Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 text-dark-300 hover:text-white">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-dark-800/95 backdrop-blur-xl border-t border-dark-700 animate-slide-down">
          <div className="px-4 py-3 space-y-1">
            <Link to="/buses/search" onClick={() => setMobileOpen(false)} className="block px-3 py-2 rounded-lg text-dark-300 hover:text-white hover:bg-dark-700">🚌 Buses</Link>
            <Link to="/trains/search" onClick={() => setMobileOpen(false)} className="block px-3 py-2 rounded-lg text-dark-300 hover:text-white hover:bg-dark-700">🚆 Trains</Link>
            {isAuthenticated() && !isAdmin() && (
              <>
                <Link to="/my-bus-bookings" onClick={() => setMobileOpen(false)} className="block px-3 py-2 rounded-lg text-dark-300 hover:text-white hover:bg-dark-700">My Bus Bookings</Link>
                <Link to="/my-train-bookings" onClick={() => setMobileOpen(false)} className="block px-3 py-2 rounded-lg text-dark-300 hover:text-white hover:bg-dark-700">My Train Bookings</Link>
              </>
            )}
            {isAdmin() && (
              <>
                <Link to="/admin/dashboard" onClick={() => setMobileOpen(false)} className="block px-3 py-2 rounded-lg text-dark-300 hover:text-white hover:bg-dark-700">Dashboard</Link>
                <Link to="/admin/buses" onClick={() => setMobileOpen(false)} className="block px-3 py-2 rounded-lg text-dark-300 hover:text-white hover:bg-dark-700">Manage Buses</Link>
                <Link to="/admin/trains" onClick={() => setMobileOpen(false)} className="block px-3 py-2 rounded-lg text-dark-300 hover:text-white hover:bg-dark-700">Manage Trains</Link>
                <Link to="/admin/bus-bookings" onClick={() => setMobileOpen(false)} className="block px-3 py-2 rounded-lg text-dark-300 hover:text-white hover:bg-dark-700">All Bus Bookings</Link>
                <Link to="/admin/train-bookings" onClick={() => setMobileOpen(false)} className="block px-3 py-2 rounded-lg text-dark-300 hover:text-white hover:bg-dark-700">All Train Bookings</Link>
                <Link to="/admin/logs" onClick={() => setMobileOpen(false)} className="block px-3 py-2 rounded-lg text-dark-300 hover:text-white hover:bg-dark-700">Activity Logs</Link>
              </>
            )}
            <div className="pt-3 border-t border-dark-700">
              {isAuthenticated() ? (
                <button onClick={handleLogout} className="w-full btn-secondary text-sm py-2">Logout ({user?.name})</button>
              ) : (
                <div className="flex gap-2">
                  <Link to="/login" onClick={() => setMobileOpen(false)} className="flex-1 btn-secondary text-sm py-2 text-center">Login</Link>
                  <Link to="/register" onClick={() => setMobileOpen(false)} className="flex-1 btn-primary text-sm py-2 text-center">Register</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
