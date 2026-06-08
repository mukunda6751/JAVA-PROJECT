import { useState, useEffect } from 'react';
import API from '../api/axios';

export default function MyTrainBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cancellingId, setCancellingId] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await API.get('/train-bookings/my');
      setBookings(res.data);
    } catch (err) {
      setError('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;
    setCancellingId(id);
    try {
      await API.put(`/train-bookings/${id}/cancel`);
      fetchBookings();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to cancel booking');
    } finally {
      setCancellingId(null);
    }
  };

  const formatDate = (dt) => {
    if (!dt) return '';
    return new Date(dt).toLocaleString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="page-container animate-fade-in">
      <div className="mb-8">
        <h1 className="page-title mb-2">🎫 My Train Bookings</h1>
        <p className="text-dark-400">Manage your train reservations</p>
      </div>

      {error && (
        <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center animate-slide-down">
          {error}
        </div>
      )}

      {bookings.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🎫</div>
          <h3 className="text-xl font-semibold text-dark-300 mb-2">No bookings yet</h3>
          <p className="text-dark-500">Search for trains and book your first ticket!</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Train</th>
                <th>Route</th>
                <th>Passenger</th>
                <th>Seats</th>
                <th>Total</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id}>
                  <td>
                    <div className="font-medium text-white">{b.train?.name}</div>
                    <div className="text-xs text-dark-400">#{b.train?.trainNumber}</div>
                  </td>
                  <td className="text-dark-300">{b.train?.source} → {b.train?.destination}</td>
                  <td>
                    <div className="text-dark-200">{b.passengerName}</div>
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
                  <td>
                    {b.status === 'CONFIRMED' && (
                      <button onClick={() => handleCancel(b.id)} disabled={cancellingId === b.id}
                              className="btn-danger text-xs py-1.5 px-3 disabled:opacity-50">
                        {cancellingId === b.id ? 'Cancelling...' : 'Cancel'}
                      </button>
                    )}
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
