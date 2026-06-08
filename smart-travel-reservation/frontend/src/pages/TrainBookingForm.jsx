import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/axios';

export default function TrainBookingForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [train, setTrain] = useState(null);
  const [form, setForm] = useState({
    passengerName: '', passengerAge: '', passengerGender: 'Male', seatsBooked: 1
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchTrain();
  }, [id]);

  const fetchTrain = async () => {
    try {
      const res = await API.get(`/trains/${id}`);
      setTrain(res.data);
    } catch (err) {
      setError('Failed to load train details');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const totalPrice = train ? form.seatsBooked * train.pricePerSeat : 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSubmitting(true);

    try {
      await API.post('/train-bookings', {
        trainId: parseInt(id),
        passengerName: form.passengerName,
        passengerAge: parseInt(form.passengerAge),
        passengerGender: form.passengerGender,
        seatsBooked: parseInt(form.seatsBooked)
      });
      setSuccess('🎉 Booking confirmed successfully!');
      setTimeout(() => navigate('/my-train-bookings'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!train) {
    return (
      <div className="page-container text-center py-20">
        <div className="text-6xl mb-4">❌</div>
        <h2 className="text-2xl font-bold text-white">Train not found</h2>
      </div>
    );
  }

  return (
    <div className="page-container animate-fade-in">
      <div className="max-w-2xl mx-auto">
        <h1 className="page-title mb-6">🚆 Book Train Ticket</h1>

        {/* Train Info Card */}
        <div className="glass-card p-5 mb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
              <span className="text-lg">🚆</span>
            </div>
            <div>
              <h3 className="font-bold text-white">{train.name}</h3>
              <p className="text-xs text-dark-400">#{train.trainNumber}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
            <div><span className="text-dark-400">From:</span> <span className="text-white font-medium">{train.source}</span></div>
            <div><span className="text-dark-400">To:</span> <span className="text-white font-medium">{train.destination}</span></div>
            <div><span className="text-dark-400">Class:</span> <span className="text-white font-medium">{train.trainClass?.replace(/_/g, ' ')}</span></div>
            <div><span className="text-dark-400">Available:</span> <span className="text-emerald-400 font-medium">{train.availableSeats} seats</span></div>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center animate-slide-down">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-sm text-center animate-slide-down">
            {success}
          </div>
        )}

        {/* Booking Form */}
        <div className="glass-card p-6">
          <h2 className="text-lg font-bold text-white mb-4">Passenger Details</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="input-label" htmlFor="train-pname">Passenger Name</label>
              <input id="train-pname" name="passengerName" type="text" required value={form.passengerName}
                     onChange={handleChange} className="input-field" placeholder="Full name" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="input-label" htmlFor="train-page">Age</label>
                <input id="train-page" name="passengerAge" type="number" required min="1" max="120"
                       value={form.passengerAge} onChange={handleChange} className="input-field" placeholder="25" />
              </div>
              <div>
                <label className="input-label" htmlFor="train-pgender">Gender</label>
                <select id="train-pgender" name="passengerGender" value={form.passengerGender}
                        onChange={handleChange} className="input-field">
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="input-label" htmlFor="train-seats">Number of Seats</label>
              <input id="train-seats" name="seatsBooked" type="number" required min="1"
                     max={train.availableSeats} value={form.seatsBooked}
                     onChange={handleChange} className="input-field" />
            </div>

            {/* Price Summary */}
            <div className="p-4 bg-dark-800/50 rounded-xl border border-dark-700/50">
              <div className="flex justify-between items-center mb-2">
                <span className="text-dark-400">Price per seat</span>
                <span className="text-white font-medium">₹{train.pricePerSeat?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-dark-400">Seats</span>
                <span className="text-white font-medium">× {form.seatsBooked}</span>
              </div>
              <div className="border-t border-dark-700 pt-2 mt-2">
                <div className="flex justify-between items-center">
                  <span className="text-white font-bold">Total Price</span>
                  <span className="text-2xl font-bold gradient-text">₹{totalPrice.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <button type="submit" disabled={submitting || success}
                    className="w-full btn-primary py-3 text-base disabled:opacity-50 disabled:cursor-not-allowed">
              {submitting ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Processing...
                </span>
              ) : `Confirm Booking • ₹${totalPrice.toLocaleString()}`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
