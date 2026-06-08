import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { isAuthenticated, isAdmin } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-950 via-dark-900 to-dark-950"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/10 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/10 rounded-full filter blur-3xl animate-pulse-slow animation-delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-600/5 rounded-full filter blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
          <div className="text-center animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-500/10 border border-primary-500/20 rounded-full text-primary-400 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-primary-400 rounded-full animate-pulse"></span>
              Trusted by 10,000+ travelers
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-tight mb-6">
              Travel Smarter,
              <br />
              <span className="bg-gradient-to-r from-primary-400 via-cyan-400 to-primary-400 bg-clip-text text-transparent">
                Book Faster
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-dark-300 max-w-2xl mx-auto mb-10 leading-relaxed">
              Search and book bus & train tickets instantly. Compare routes, check
              availability, and secure your seats with our seamless reservation system.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/buses/search" className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold py-4 px-8 rounded-2xl shadow-2xl shadow-amber-500/25 hover:shadow-amber-500/40 transition-all duration-300 hover:-translate-y-0.5 text-lg">
                <span className="text-2xl">🚌</span>
                Search Buses
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>

              <Link to="/trains/search" className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-4 px-8 rounded-2xl shadow-2xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 hover:-translate-y-0.5 text-lg">
                <span className="text-2xl">🚆</span>
                Search Trains
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Why Choose SmartTravel?</h2>
            <p className="text-dark-400 text-lg max-w-xl mx-auto">Everything you need for hassle-free travel booking, all in one place.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: '🔍',
                title: 'Smart Search',
                description: 'Find the best buses and trains by route and date. Compare prices and availability at a glance.',
                gradient: 'from-primary-500 to-primary-600'
              },
              {
                icon: '⚡',
                title: 'Instant Booking',
                description: 'Book your tickets in seconds. Our streamlined process ensures a smooth reservation experience.',
                gradient: 'from-amber-500 to-orange-600'
              },
              {
                icon: '🛡️',
                title: 'Secure Payments',
                description: 'Your data is protected with bank-grade encryption. Book with complete peace of mind.',
                gradient: 'from-emerald-500 to-emerald-600'
              },
              {
                icon: '📱',
                title: 'Mobile Friendly',
                description: 'Book on any device. Our responsive design works perfectly on phones, tablets, and desktops.',
                gradient: 'from-cyan-500 to-blue-600'
              },
              {
                icon: '🔄',
                title: 'Easy Cancellation',
                description: 'Changed your plans? Cancel bookings with a single click and get instant seat restoration.',
                gradient: 'from-red-500 to-pink-600'
              },
              {
                icon: '👤',
                title: 'Personal Dashboard',
                description: 'Track all your bookings in one place. View history, manage trips, and stay organized.',
                gradient: 'from-purple-500 to-purple-600'
              }
            ].map((feature, index) => (
              <div key={index} className="glass-card-hover p-6 animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                <div className={`w-12 h-12 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center shadow-lg mb-4`}>
                  <span className="text-xl">{feature.icon}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-dark-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass-card p-10 lg:p-14 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 via-cyan-500 to-primary-500"></div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Start Your Journey?</h2>
            <p className="text-dark-300 text-lg mb-8 max-w-lg mx-auto">
              Create your free account today and start booking bus and train tickets with ease.
            </p>
            {!isAuthenticated() && (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/register" className="btn-primary text-lg py-3 px-8">Create Free Account</Link>
                <Link to="/login" className="btn-secondary text-lg py-3 px-8">Sign In</Link>
              </div>
            )}
            {isAuthenticated() && isAdmin() && (
              <Link to="/admin/dashboard" className="btn-primary text-lg py-3 px-8">Go to Dashboard</Link>
            )}
            {isAuthenticated() && !isAdmin() && (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/buses/search" className="btn-primary text-lg py-3 px-8">🚌 Book a Bus</Link>
                <Link to="/trains/search" className="btn-primary text-lg py-3 px-8">🚆 Book a Train</Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-dark-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-dark-500 text-sm">© 2026 SmartTravel Reservation System. Built for college project demo.</p>
        </div>
      </footer>
    </div>
  );
}
