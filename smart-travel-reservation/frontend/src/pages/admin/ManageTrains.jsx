import { useState, useEffect } from 'react';
import API from '../../api/axios';

const EMPTY_FORM = {
  trainNumber: '', name: '', source: '', destination: '',
  departureTime: '', arrivalTime: '', totalSeats: '',
  availableSeats: '', pricePerSeat: '', trainClass: 'SLEEPER',
  status: 'ACTIVE'
};

export default function ManageTrains() {
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => { fetchTrains(); }, []);

  const fetchTrains = async () => {
    try {
      const res = await API.get('/trains');
      setTrains(res.data);
    } catch (err) {
      setError('Failed to load trains');
    } finally { setLoading(false); }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const resetForm = () => {
    setForm({ ...EMPTY_FORM });
    setEditing(null);
    setShowForm(false);
    setError('');
  };

  const handleEdit = (train) => {
    setForm({
      trainNumber: train.trainNumber,
      name: train.name,
      source: train.source,
      destination: train.destination,
      departureTime: train.departureTime ? train.departureTime.slice(0, 16) : '',
      arrivalTime: train.arrivalTime ? train.arrivalTime.slice(0, 16) : '',
      totalSeats: train.totalSeats,
      availableSeats: train.availableSeats,
      pricePerSeat: train.pricePerSeat,
      trainClass: train.trainClass,
      status: train.status
    });
    setEditing(train.id);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSubmitting(true);

    const payload = {
      ...form,
      totalSeats: parseInt(form.totalSeats),
      availableSeats: parseInt(form.availableSeats),
      pricePerSeat: parseFloat(form.pricePerSeat)
    };

    try {
      if (editing) {
        await API.put(`/trains/${editing}`, payload);
        setSuccess('Train updated successfully!');
      } else {
        await API.post('/trains', payload);
        setSuccess('Train added successfully!');
      }
      fetchTrains();
      resetForm();
    } catch (err) {
      setError(err.response?.data?.message || 'Operation failed');
    } finally { setSubmitting(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this train?')) return;
    try {
      await API.delete(`/trains/${id}`);
      setSuccess('Train deleted successfully!');
      fetchTrains();
    } catch (err) {
      setError(err.response?.data?.message || 'Delete failed');
    }
  };

  const formatDateTime = (dt) => {
    if (!dt) return '';
    return new Date(dt).toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', hour12: true });
  };

  const formatClass = (c) => c ? c.replace(/_/g, ' ') : '';

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
    </div>;
  }

  return (
    <div className="page-container animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="page-title mb-2">🚆 Manage Trains</h1>
          <p className="text-dark-400">{trains.length} trains in system</p>
        </div>
        <button onClick={() => { resetForm(); setShowForm(!showForm); }}
                className={showForm ? 'btn-secondary' : 'btn-primary'}>
          {showForm ? 'Cancel' : '+ Add Train'}
        </button>
      </div>

      {error && <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center">{error}</div>}
      {success && <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-sm text-center">{success}</div>}

      {showForm && (
        <div className="glass-card p-6 mb-8 animate-slide-down">
          <h2 className="text-lg font-bold text-white mb-4">{editing ? 'Edit Train' : 'Add New Train'}</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div><label className="input-label">Train Number</label>
              <input name="trainNumber" type="text" required value={form.trainNumber} onChange={handleChange} className="input-field" placeholder="12952" /></div>
            <div><label className="input-label">Name</label>
              <input name="name" type="text" required value={form.name} onChange={handleChange} className="input-field" placeholder="Rajdhani Express" /></div>
            <div><label className="input-label">Class</label>
              <select name="trainClass" value={form.trainClass} onChange={handleChange} className="input-field">
                <option value="SLEEPER">Sleeper</option>
                <option value="AC_3_TIER">AC 3 Tier</option>
                <option value="AC_2_TIER">AC 2 Tier</option>
                <option value="FIRST_CLASS">First Class</option>
              </select></div>
            <div><label className="input-label">Source</label>
              <input name="source" type="text" required value={form.source} onChange={handleChange} className="input-field" placeholder="Delhi" /></div>
            <div><label className="input-label">Destination</label>
              <input name="destination" type="text" required value={form.destination} onChange={handleChange} className="input-field" placeholder="Mumbai" /></div>
            <div><label className="input-label">Status</label>
              <select name="status" value={form.status} onChange={handleChange} className="input-field">
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
                <option value="CANCELLED">Cancelled</option>
              </select></div>
            <div><label className="input-label">Departure Time</label>
              <input name="departureTime" type="datetime-local" required value={form.departureTime} onChange={handleChange} className="input-field" /></div>
            <div><label className="input-label">Arrival Time</label>
              <input name="arrivalTime" type="datetime-local" required value={form.arrivalTime} onChange={handleChange} className="input-field" /></div>
            <div><label className="input-label">Price per Seat (₹)</label>
              <input name="pricePerSeat" type="number" required min="1" step="0.01" value={form.pricePerSeat} onChange={handleChange} className="input-field" /></div>
            <div><label className="input-label">Total Seats</label>
              <input name="totalSeats" type="number" required min="1" value={form.totalSeats} onChange={handleChange} className="input-field" /></div>
            <div><label className="input-label">Available Seats</label>
              <input name="availableSeats" type="number" required min="0" value={form.availableSeats} onChange={handleChange} className="input-field" /></div>
            <div className="flex items-end">
              <div className="flex gap-3 w-full">
                <button type="submit" disabled={submitting} className="btn-primary flex-1 disabled:opacity-50">
                  {submitting ? 'Saving...' : (editing ? 'Update' : 'Add Train')}
                </button>
                <button type="button" onClick={resetForm} className="btn-secondary">Cancel</button>
              </div>
            </div>
          </form>
        </div>
      )}

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Train</th>
              <th>Route</th>
              <th>Schedule</th>
              <th>Class</th>
              <th>Seats</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {trains.map((train) => (
              <tr key={train.id}>
                <td>
                  <div className="font-medium text-white">{train.name}</div>
                  <div className="text-xs text-dark-400">#{train.trainNumber}</div>
                </td>
                <td className="text-dark-300">{train.source} → {train.destination}</td>
                <td className="text-xs text-dark-300">
                  <div>{formatDateTime(train.departureTime)}</div>
                  <div className="text-dark-500">to {formatDateTime(train.arrivalTime)}</div>
                </td>
                <td><span className="status-badge bg-dark-700 text-dark-300 border border-dark-600">{formatClass(train.trainClass)}</span></td>
                <td className="text-dark-300">{train.availableSeats}/{train.totalSeats}</td>
                <td className="text-white font-medium">₹{train.pricePerSeat}</td>
                <td><span className={train.status === 'ACTIVE' ? 'status-active' : 'status-cancelled'}>{train.status}</span></td>
                <td>
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(train)} className="btn-secondary text-xs py-1.5 px-3">Edit</button>
                    <button onClick={() => handleDelete(train.id)} className="btn-danger text-xs py-1.5 px-3">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
