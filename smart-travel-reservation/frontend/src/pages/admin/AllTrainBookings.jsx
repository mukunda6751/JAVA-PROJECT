import { useState, useEffect } from 'react';
import API from '../../api/axios';

export default function AllTrainBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await API.get('/admin/train-bookings');
      setBookings(res.data);
    } catch (err) {
      setError('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dt) => {
    if (!dt) return '';
    return new Date(dt).toLocaleString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit', hour12: true
    });
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
    </div>;
  }

  return (
    <div className="page-container animate-fade-in">
      <div className="mb-8">
        <h1 className="page-title mb-2">🎟️ All Train Bookings</h1>
        <p className="text-dark-400">{bookings.length} total bookings</p>
      </div>

      {error && <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center">{error}</div>}

      {bookings.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">📭</div>
          <h3 className="text-xl font-semibold text-dark-300">No train bookings yet</h3>
        </div>
      ) : (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Train</th>
                <th>Route</th>
                <th>Passenger</th>
                <th>Seats</th>
                <th>Total</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id}>
                  <td className="text-dark-400">#{b.id}</td>
                  <td>
                    <div className="text-white text-sm">{b.user?.name}</div>
                    <div className="text-xs text-dark-400">{b.user?.email}</div>
                  </td>
                  <td>
                    <div className="font-medium text-white">{b.train?.name}</div>
                    <div className="text-xs text-dark-400">#{b.train?.trainNumber}</div>
                  </td>
                  <td className="text-dark-300 text-sm">{b.train?.source} → {b.train?.destination}</td>
                  <td>
                    <div className="text-dark-200 text-sm">{b.passengerName}</div>
                    <div className="text-xs text-dark-400">{b.passengerAge}y, {b.passengerGender}</div>
                  </td>
                  <td className="text-dark-200 font-medium">{b.seatsBooked}</td>
                  <td className="text-white font-bold">₹{b.totalPrice?.toLocaleString()}</td>
                  <td className="text-dark-300 text-xs">{formatDate(b.bookingDate)}</td>
                  <td>
                    <span className={b.status === 'CONFIRMED' ? 'status-confirmed' : 'status-cancelled'}>
                      {b.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
