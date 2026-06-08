import { useState } from 'react';
import API from '../api/axios';
import TrainCard from '../components/TrainCard';

export default function TrainSearch() {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [trains, setTrains] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setSearched(true);

    try {
      const params = { source: source.trim(), destination: destination.trim() };
      if (date) params.date = date;
      const res = await API.get('/trains/search', { params });
      setTrains(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to search trains');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container animate-fade-in">
      <div className="mb-8">
        <h1 className="page-title mb-2">🚆 Search Trains</h1>
        <p className="text-dark-400">Find the perfect train for your journey</p>
      </div>

      <div className="glass-card p-6 mb-8">
        <form onSubmit={handleSearch} className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <label className="input-label" htmlFor="train-source">From</label>
            <input id="train-source" type="text" required value={source}
                   onChange={(e) => setSource(e.target.value)} className="input-field"
                   placeholder="e.g. Bangalore" />
          </div>
          <div className="flex-1">
            <label className="input-label" htmlFor="train-destination">To</label>
            <input id="train-destination" type="text" required value={destination}
                   onChange={(e) => setDestination(e.target.value)} className="input-field"
                   placeholder="e.g. Chennai" />
          </div>
          <div className="flex-1">
            <label className="input-label" htmlFor="train-date">Date (optional)</label>
            <input id="train-date" type="date" value={date}
                   onChange={(e) => setDate(e.target.value)} className="input-field" />
          </div>
          <div className="flex items-end">
            <button type="submit" disabled={loading} className="btn-primary w-full lg:w-auto py-3 px-8 disabled:opacity-50">
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Searching...
                </span>
              ) : 'Search'}
            </button>
          </div>
        </form>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-center animate-slide-down">
          {error}
        </div>
      )}

      {searched && !loading && trains.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-dark-300 mb-2">No trains found</h3>
          <p className="text-dark-500">Try different source, destination, or date.</p>
        </div>
      )}

      <div className="space-y-4">
        {trains.map((train) => (
          <TrainCard key={train.id} train={train} />
        ))}
      </div>
    </div>
  );
}
