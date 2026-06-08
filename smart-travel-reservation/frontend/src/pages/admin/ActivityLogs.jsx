import { useState, useEffect } from 'react';
import API from '../../api/axios';

export default function ActivityLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const res = await API.get('/admin/logs');
      setLogs(res.data);
    } catch (err) {
      setError('Failed to load activity logs');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dt) => {
    if (!dt) return '';
    return new Date(dt).toLocaleString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
    });
  };

  const getActionColor = (action) => {
    switch (action) {
      case 'ADD': return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20';
      case 'UPDATE': return 'bg-blue-500/15 text-blue-400 border-blue-500/20';
      case 'DELETE': return 'bg-red-500/15 text-red-400 border-red-500/20';
      default: return 'bg-dark-600/15 text-dark-400 border-dark-500/20';
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
    </div>;
  }

  return (
    <div className="page-container animate-fade-in">
      <div className="mb-8">
        <h1 className="page-title mb-2">📋 Activity Logs</h1>
        <p className="text-dark-400">Admin action history • {logs.length} entries</p>
      </div>

      {error && <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center">{error}</div>}

      {logs.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-xl font-semibold text-dark-300">No activity yet</h3>
          <p className="text-dark-500">Admin actions will appear here</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Admin</th>
                <th>Action</th>
                <th>Entity</th>
                <th>Entity ID</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id}>
                  <td className="text-dark-300 text-xs whitespace-nowrap">{formatDate(log.timestamp)}</td>
                  <td>
                    <div className="text-white text-sm">{log.admin?.name}</div>
                    <div className="text-xs text-dark-400">{log.admin?.email}</div>
                  </td>
                  <td>
                    <span className={`status-badge border ${getActionColor(log.action)}`}>
                      {log.action}
                    </span>
                  </td>
                  <td>
                    <span className="status-badge bg-dark-700 text-dark-300 border border-dark-600">
                      {log.entityType}
                    </span>
                  </td>
                  <td className="text-dark-400">#{log.entityId}</td>
                  <td className="text-dark-200 text-sm max-w-xs truncate">{log.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
