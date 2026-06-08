import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../../api/axios';

export default function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await API.get('/admin/dashboard');
      setSummary(res.data);
    } catch (err) {
      console.error('Failed to load dashboard', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const cards = [
    { label: 'Total Buses', value: summary?.totalBuses || 0, icon: '🚌', gradient: 'from-amber-500 to-orange-600', link: '/admin/buses' },
    { label: 'Total Trains', value: summary?.totalTrains || 0, icon: '🚆', gradient: 'from-cyan-500 to-blue-600', link: '/admin/trains' },
    { label: 'Bus Bookings', value: summary?.totalBusBookings || 0, icon: '🎫', gradient: 'from-emerald-500 to-emerald-600', link: '/admin/bus-bookings' },
    { label: 'Train Bookings', value: summary?.totalTrainBookings || 0, icon: '🎟️', gradient: 'from-purple-500 to-purple-600', link: '/admin/train-bookings' },
  ];

  return (
    <div className="page-container animate-fade-in">
      <div className="mb-8">
        <h1 className="page-title mb-2">📊 Admin Dashboard</h1>
        <p className="text-dark-400">Overview of your travel reservation system</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {cards.map((card, index) => (
          <Link key={index} to={card.link} className="glass-card-hover p-6 animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-br ${card.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                <span className="text-xl">{card.icon}</span>
              </div>
              <svg className="w-5 h-5 text-dark-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-white mb-1">{card.value}</p>
            <p className="text-sm text-dark-400">{card.label}</p>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="glass-card p-6">
        <h2 className="text-lg font-bold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <Link to="/admin/buses" className="flex items-center gap-3 p-4 rounded-xl bg-dark-800/50 border border-dark-700/30 hover:border-primary-500/30 transition-all group">
            <span className="text-2xl">🚌</span>
            <div>
              <p className="font-medium text-white group-hover:text-primary-400 transition-colors">Manage Buses</p>
              <p className="text-xs text-dark-400">Add, edit, or remove buses</p>
            </div>
          </Link>
          <Link to="/admin/trains" className="flex items-center gap-3 p-4 rounded-xl bg-dark-800/50 border border-dark-700/30 hover:border-primary-500/30 transition-all group">
            <span className="text-2xl">🚆</span>
            <div>
              <p className="font-medium text-white group-hover:text-primary-400 transition-colors">Manage Trains</p>
              <p className="text-xs text-dark-400">Add, edit, or remove trains</p>
            </div>
          </Link>
          <Link to="/admin/logs" className="flex items-center gap-3 p-4 rounded-xl bg-dark-800/50 border border-dark-700/30 hover:border-primary-500/30 transition-all group">
            <span className="text-2xl">📋</span>
            <div>
              <p className="font-medium text-white group-hover:text-primary-400 transition-colors">Activity Logs</p>
              <p className="text-xs text-dark-400">View admin action history</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
