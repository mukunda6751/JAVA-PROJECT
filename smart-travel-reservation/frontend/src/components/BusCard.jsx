import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function BusCard({ bus }) {
  const { isAuthenticated } = useAuth();

  const formatDateTime = (dt) => {
    if (!dt) return '';
    const date = new Date(dt);
    return date.toLocaleString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit', hour12: true
    });
  };

  const getBusTypeColor = (type) => {
    switch (type) {
      case 'AC': return 'bg-blue-500/15 text-blue-400 border-blue-500/20';
      case 'NON_AC': return 'bg-amber-500/15 text-amber-400 border-amber-500/20';
      case 'SLEEPER': return 'bg-purple-500/15 text-purple-400 border-purple-500/20';
      case 'SEMI_SLEEPER': return 'bg-teal-500/15 text-teal-400 border-teal-500/20';
      default: return 'bg-dark-600/15 text-dark-400 border-dark-500/20';
    }
  };

  return (
    <div className="glass-card-hover p-5 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-lg">🚌</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">{bus.name}</h3>
              <p className="text-xs text-dark-400">{bus.busNumber} • {bus.operatorName}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 mb-3">
            <div className="text-center">
              <p className="text-sm font-semibold text-white">{bus.source}</p>
              <p className="text-xs text-dark-400">{formatDateTime(bus.departureTime)}</p>
            </div>
            <div className="flex-1 flex items-center gap-1 px-2">
              <div className="h-px flex-1 bg-gradient-to-r from-dark-600 to-primary-500"></div>
              <svg className="w-4 h-4 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              <div className="h-px flex-1 bg-gradient-to-r from-primary-500 to-dark-600"></div>
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-white">{bus.destination}</p>
              <p className="text-xs text-dark-400">{formatDateTime(bus.arrivalTime)}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className={`status-badge border ${getBusTypeColor(bus.type)}`}>
              {bus.type?.replace('_', ' ')}
            </span>
            <span className="status-badge bg-dark-700 text-dark-300 border border-dark-600">
              {bus.availableSeats} seats left
            </span>
          </div>
        </div>

        <div className="flex flex-col items-end gap-3 sm:min-w-[140px]">
          <div className="text-right">
            <p className="text-2xl font-bold gradient-text">₹{bus.pricePerSeat?.toLocaleString()}</p>
            <p className="text-xs text-dark-400">per seat</p>
          </div>
          {isAuthenticated() ? (
            <Link to={`/buses/book/${bus.id}`} className="btn-primary text-sm py-2 px-5 w-full text-center">
              Book Now
            </Link>
          ) : (
            <Link to="/login" className="btn-secondary text-sm py-2 px-5 w-full text-center">
              Login to Book
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
