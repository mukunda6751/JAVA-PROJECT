import { useState, useEffect } from 'react';
import API from '../../api/axios';

const EMPTY_FORM = {
  busNumber: '', name: '', source: '', destination: '',
  departureTime: '', arrivalTime: '', totalSeats: '',
  availableSeats: '', pricePerSeat: '', type: 'AC',
  operatorName: '', status: 'ACTIVE'
};

export default function ManageBuses() {
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => { fetchBuses(); }, []);

  const fetchBuses = async () => {
    try {
      const res = await API.get('/buses');
      setBuses(res.data);
    } catch (err) {
      setError('Failed to load buses');
    } finally { setLoading(false); }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const resetForm = () => {
    setForm({ ...EMPTY_FORM });
    setEditing(null);
    setShowForm(false);
    setError('');
  };

  const handleEdit = (bus) => {
    setForm({
      busNumber: bus.busNumber,
      name: bus.name,
      source: bus.source,
      destination: bus.destination,
      departureTime: bus.departureTime ? bus.departureTime.slice(0, 16) : '',
      arrivalTime: bus.arrivalTime ? bus.arrivalTime.slice(0, 16) : '',
      totalSeats: bus.totalSeats,
      availableSeats: bus.availableSeats,
      pricePerSeat: bus.pricePerSeat,
      type: bus.type,
      operatorName: bus.operatorName,
      status: bus.status
    });
    setEditing(bus.id);
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
        await API.put(`/buses/${editing}`, payload);
        setSuccess('Bus updated successfully!');
      } else {
        await API.post('/buses', payload);
        setSuccess('Bus added successfully!');
      }
      fetchBuses();
      resetForm();
    } catch (err) {
      setError(err.response?.data?.message || 'Operation failed');
    } finally { setSubmitting(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this bus?')) return;
    try {
      await API.delete(`/buses/${id}`);
      setSuccess('Bus deleted successfully!');
      fetchBuses();
    } catch (err) {
      setError(err.response?.data?.message || 'Delete failed');
    }
  };

  const formatDateTime = (dt) => {
    if (!dt) return '';
    return new Date(dt).toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', hour12: true });
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
    </div>;
  }

  return (
    <div className="page-container animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="page-title mb-2">🚌 Manage Buses</h1>
          <p className="text-dark-400">{buses.length} buses in system</p>
        </div>
        <button onClick={() => { resetForm(); setShowForm(!showForm); }}
                className={showForm ? 'btn-secondary' : 'btn-primary'}>
          {showForm ? 'Cancel' : '+ Add Bus'}
        </button>
      </div>

      {error && <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center">{error}</div>}
      {success && <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-sm text-center">{success}</div>}

      {showForm && (
        <div className="glass-card p-6 mb-8 animate-slide-down">
          <h2 className="text-lg font-bold text-white mb-4">{editing ? 'Edit Bus' : 'Add New Bus'}</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div><label className="input-label">Bus Number</label>
              <input name="busNumber" type="text" required value={form.busNumber} onChange={handleChange} className="input-field" placeholder="BUS001" /></div>
            <div><label className="input-label">Name</label>
              <input name="name" type="text" required value={form.name} onChange={handleChange} className="input-field" placeholder="Express Bus" /></div>
            <div><label className="input-label">Operator</label>
              <input name="operatorName" type="text" required value={form.operatorName} onChange={handleChange} className="input-field" placeholder="Travels Inc." /></div>
            <div><label className="input-label">Source</label>
              <input name="source" type="text" required value={form.source} onChange={handleChange} className="input-field" placeholder="Delhi" /></div>
            <div><label className="input-label">Destination</label>
              <input name="destination" type="text" required value={form.destination} onChange={handleChange} className="input-field" placeholder="Mumbai" /></div>
            <div><label className="input-label">Type</label>
              <select name="type" value={form.type} onChange={handleChange} className="input-field">
                <option value="AC">AC</option>
                <option value="NON_AC">NON AC</option>
                <option value="SLEEPER">SLEEPER</option>
                <option value="SEMI_SLEEPER">SEMI SLEEPER</option>
              </select></div>
            <div><label className="input-label">Departure Time</label>
              <input name="departureTime" type="datetime-local" required value={form.departureTime} onChange={handleChange} className="input-field" /></div>
            <div><label className="input-label">Arrival Time</label>
              <input name="arrivalTime" type="datetime-local" required value={form.arrivalTime} onChange={handleChange} className="input-field" /></div>
            <div><label className="input-label">Status</label>
              <select name="status" value={form.status} onChange={handleChange} className="input-field">
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
                <option value="CANCELLED">Cancelled</option>
              </select></div>
            <div><label className="input-label">Total Seats</label>
              <input name="totalSeats" type="number" required min="1" value={form.totalSeats} onChange={handleChange} className="input-field" /></div>
            <div><label className="input-label">Available Seats</label>
              <input name="availableSeats" type="number" required min="0" value={form.availableSeats} onChange={handleChange} className="input-field" /></div>
            <div><label className="input-label">Price per Seat (₹)</label>
              <input name="pricePerSeat" type="number" required min="1" step="0.01" value={form.pricePerSeat} onChange={handleChange} className="input-field" /></div>
            <div className="sm:col-span-2 lg:col-span-3 flex gap-3 pt-2">
              <button type="submit" disabled={submitting} className="btn-primary disabled:opacity-50">
                {submitting ? 'Saving...' : (editing ? 'Update Bus' : 'Add Bus')}
              </button>
              <button type="button" onClick={resetForm} className="btn-secondary">Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Bus</th>
              <th>Route</th>
              <th>Schedule</th>
              <th>Type</th>
              <th>Seats</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {buses.map((bus) => (
              <tr key={bus.id}>
                <td>
                  <div className="font-medium text-white">{bus.name}</div>
                  <div className="text-xs text-dark-400">{bus.busNumber} • {bus.operatorName}</div>
                </td>
                <td className="text-dark-300">{bus.source} → {bus.destination}</td>
                <td className="text-xs text-dark-300">
                  <div>{formatDateTime(bus.departureTime)}</div>
                  <div className="text-dark-500">to {formatDateTime(bus.arrivalTime)}</div>
                </td>
                <td><span className="status-badge bg-dark-700 text-dark-300 border border-dark-600">{bus.type?.replace('_', ' ')}</span></td>
                <td className="text-dark-300">{bus.availableSeats}/{bus.totalSeats}</td>
                <td className="text-white font-medium">₹{bus.pricePerSeat}</td>
                <td><span className={bus.status === 'ACTIVE' ? 'status-active' : 'status-cancelled'}>{bus.status}</span></td>
                <td>
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(bus)} className="btn-secondary text-xs py-1.5 px-3">Edit</button>
                    <button onClick={() => handleDelete(bus.id)} className="btn-danger text-xs py-1.5 px-3">Delete</button>
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
